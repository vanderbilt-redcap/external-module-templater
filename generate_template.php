<?php
namespace RedcapConHack\Templater;
/** @var Templater $module */

require_once(__DIR__."/vendor/autoload.php");

$loader = new \Twig_Loader_Filesystem(__DIR__."/templates/");
$twig = new \Twig_Environment($loader);

echo $twig->render("config.twig",["all_hooks" => $module::ALL_HOOKS]);