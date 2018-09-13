<?php
namespace RedcapConHack\Templater;

class Templater extends \ExternalModules\AbstractExternalModule {
	function generateTemplateFromPost($twig) {
		// build $data array from $_POST array so Twig can render our files
		$hookInfo = self::getHookInfo();
		$data = [
			'className' => $_POST['className'],
			'namespace' => $_POST['namespace'],
			'description' => $_POST['moduleDescription'],
			'hooks' => [],
			'authors' => [],
			'projectLinks' => [],
			'controlCenterLinks' => [],
			'crons' => []
		];
		$data['initialVersion'] = empty($_POST['moduleInitVersion']) ? '0.1' : $_POST['moduleInitVersion'];
		preg_match_all('/[A-Z][a-z]+/', $data['className'], $matches);
		$dirName = empty($_POST['dirName']) ? join('_', array_map('strtolower', $matches[0])) . '_v' . $data['initialVersion'] : $_POST['dirName'];
		
		// authors
		$done = false;
		$i = 1;
		while (!$done) {
			if (isset($_POST["authorsName$i"])) {
				$data['authors'][$i] = [
					'name' => $_POST["authorsName$i"],
					'email' => $_POST["authorsEmail$i"],
					'org' => $_POST["authorsOrg$i"]
				];
			} else {
				$done = true;
			}
			$i++;
		}
		
		// hooks
		foreach ($hookInfo as $hook => $info) {
			if (isset($_POST[$hook])) {
				preg_match_all('/\w+\s\$\w+/', preg_replace('/<.?b>/', "", $info['DESCRIPTION']), $arguments);
				$data['hooks'][$hook] = $arguments[0];
			}
		}
		
		// links
		$done = false;
		$i = 1;
		while (!$done) {
			if (isset($_POST["linksName$i"])) {
				// add link to twig $data variable
				$link = [
					'name' => $_POST["linksName$i"],
					'url' => $_POST["linksUrl$i"],
					'icon' => $_POST["linksIcon$i"]
				];
				if (isset($_POST["linksNOAUTH$i"])) {
					$link['NOAUTH'] = true;
				}
				if (isset($_POST["linksControlCenterCheckbox$i"])) {
					array_push($data['controlCenterLinks'], $link);
				}
				if (isset($_POST["linksProjectCheckbox$i"])) {
					array_push($data['projectLinks'], $link);
				}
			} else {
				$done = true;
			}
			$i++;
		}
		
		// crons
		$done = false;
		$i = 1;
		while (!$done) {
			if (isset($_POST["cronsName$i"])) {
				$data['crons'][$i] = [
					'name' => $_POST["cronsName$i"],
					'desc' => $_POST["cronsDescription$i"],
					'method' => $_POST["cronsMethod$i"],
					'freq' => $_POST["cronsFrequency$i"],
					'max' => $_POST["cronsMaxRunTime$i"]
				];
			} else {
				$done = true;
			}
			$i++;
		}
		
		// // header('content-type: text/plain');
		// // echo $twig->render('config.twig', $data);
		// // exit;
		
		// render necessary files
		$classFile = $twig->render('class.twig', $data);
		$configFile = $twig->render('config.twig', $data);
		$readmeFile = $twig->render('README.twig', $data);
		
		// create zip file, open it, add files, close zip, and send
		$zip = new \ZipArchive();
		$file = tempnam(EDOC_PATH,"");
		$zip->open($file, \ZipArchive::CREATE);
		$zip->addFromString($data['className'] . '.php', $classFile);
		$zip->addFromString('config.json', $configFile);
		$zip->addFromString('README.md', $readmeFile);
		
		// add LICENSE?
		if (isset($_POST['includeLicense']) and isset($_POST['licenseText'])){
			$zip->addFromString('LICENSE', $_POST['licenseText']);
		}
		
		$zip->close();
		$zipFileName = $dirName . '.zip';
		header("Content-disposition: attachment; filename=$zipFileName");
		header('Content-type: application/zip');
		readfile($file);
		unlink($file);
	}
	
	public static function getHookInfo(){
		// Get array of Hook methods and their attributes
		return \PluginDocs::getPluginMethods(\PluginDocs::HOOKS_CLASS);
	}
}