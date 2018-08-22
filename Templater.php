<?php
namespace RedcapConHack\Templater;

class Templater extends \ExternalModules\AbstractExternalModule{
    const ALL_HOOKS = [
        [ "hook_name" => "redcap_save_record","variables"=> ["project_id","record","event"]],
        ["hook_name" => "redcap_every_page_top", "variables" => ["project_id","record","event"]]
    ];
}