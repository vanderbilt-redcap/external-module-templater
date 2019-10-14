<?php
namespace RedcapConHack\Templater;
/** @var Templater $module */

require_once(__DIR__."/vendor/autoload.php");

$loader = new \Twig_Loader_Filesystem(__DIR__."/templates/");
$twig = new \Twig_Environment($loader);

if ($_POST) {
	$module->generateTemplateFromPost($twig);
}
else {
?>

<script>
var timezone = "<?php echo date_default_timezone_get(); ?>";
var timestamp = "<?php echo date("Y-m-d H:i:s"); ?>";
</script>

<?php
    echo $twig->render("newModule.twig", [
			"js_link" => $module->getUrl('js/functions.js'),
			"hooks" => $module::getHookInfo()
		]
	);
}
