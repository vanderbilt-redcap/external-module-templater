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
	$templateConstants = [
			"js_link" => APP_PATH_JS."base.js",
			"js_link2" => $module->getUrl('js/functions.js'),
			"css_link" => APP_PATH_CSS."jquery-ui-min.css",
			"css_link2" => APP_PATH_CSS."bootstrap.min.css",
			"hooks" => $module::getHookInfo()
	];
	## Checking if on newer version of REDCap that uses webpack for jquery and bootstrap
	if(!is_file(APP_PATH_DOCROOT."Resources/css/jquery-ui.min.css")) {
		$templateConstants["js_link"] = APP_PATH_WEBPACK."js/bundle.js";
		$templateConstants["css_link"] = APP_PATH_WEBPACK."css/bundle.css";
		$templateConstants["css_link2"] = false;
	}
    echo $twig->render("newModule.twig",$templateConstants);
}
