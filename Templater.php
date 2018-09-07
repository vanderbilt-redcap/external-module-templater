<?php
namespace RedcapConHack\Templater;

class Templater extends \ExternalModules\AbstractExternalModule{
	public static function getHooks()
	{
		// Get array of Hook methods and their attributes
		$hooks = \PluginDocs::getPluginMethods(\PluginDocs::HOOKS_CLASS);
		
		return $hooks;
	}
}