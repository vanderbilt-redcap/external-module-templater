<?php
namespace RedcapConHack\Templater;
/** @var Templater $module */

require_once(__DIR__."/vendor/autoload.php");

$loader = new \Twig_Loader_Filesystem(__DIR__."/templates/");
$twig = new \Twig_Environment($loader);

if($_POST['generate'] == 1) {
    $parameters = ["selected_hooks" => $_POST['selected_hooks'],
        "links" => $_POST['links'],
        "all_hooks" => $module::ALL_HOOKS,
        "namespace" => $_POST['namespace'],
        "className" => $_POST['classname']];

    $configJson = $twig->render("configJson.twig", $parameters);
    $classFile = $twig->render("classFile.twig", $parameters);
    $otherFiles = $twig->render("otherFiles.twig",$parameters);

    $zipArchive = new \ZipArchive();
    $tmpFile = tempnam(EDOC_PATH,"");
    $zipArchive->open($tmpFile,\ZipArchive::CREATE);
    $zipArchive->addFromString("config.json", $configJson);
    $zipArchive->addFromString($_POST["classname"].".php", $classFile);
    $otherFiles = json_decode($otherFiles);
    foreach($otherFiles as $fileDetails) {
        $zipArchive->addFromString($fileDetails['file_name'],$fileDetails['file_string']);
    }

    $zipArchive->close();
    header("Content-disposition: attachment; fimename='module_template.zip'");
    header('Content-type: application/zip');
    readfile($tmpFile);
    unlink($tmpFile);
}
else {
    echo $twig->render("config.twig", ["all_hooks" => $module::ALL_HOOKS]);
}