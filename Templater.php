<?php
namespace RedcapConHack\Templater;

class Templater extends \ExternalModules\AbstractExternalModule{
    const ALL_HOOKS = [
        "redcap_save_record" => ["variables"=> ["project_id","record","event"]],
        "redcap_every_page_top" => ["variables" => ["project_id","record","event"]]
    ];
}