<?php
namespace {{ namespace }}\{{ classname }}

class {{ classname }} extends AbstractExternalModule {
{% for selected in selected_hooks %}
    public function {{ selected }}({% for var_name in all_hooks[selected].variables %}{{ var_name }}{% endfor %}) {

    }
{% endfor %}
}
