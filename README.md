# external_module_templater

Builds out external module template files for quick module generation

Instructions:
1. Download the repository and extract so the "external_module_templater_vx.x" folder is in the redcap/modules folder of your web server.
2. In Control Center > External Modules, enable "External Module Templater - vx.x"
3. Refresh the Control Center and click "Generate External Module Template" link at under "External Modules" header of the sidebar.
4. Fill out the form and click "Generate External Module Template" button at the bottom of the page.
5. Your browser should now download a .zip containing at minimum:
	* a PHP class/module file
	* a README.md file
	* a config.json file