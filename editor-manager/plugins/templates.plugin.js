/*!
* kl/editor-manager/plugins/templates.plugin.js
* License https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode
* Copyright 2020 Lukas Wieditz
*/

/*global console, jQuery, XF, setTimeout */
/*jshint loopfunc:true */

(function ($) {
    (function () {
        var templateGroups,
            category,
            content = '<ul class="fr-dropdown-list">';

        try {
            templateGroups = $.parseJSON($('.js-klEditorTemplates').first().html()) || {};
        } catch (e) {
            templateGroups = false;
        }

        console.log(templateGroups);

        if(!templateGroups.length) {
            return;
        }

        $.FE.DefineIcon('klTemplates', {NAME: 'clipboard'});
        $.FE.DefineIcon('klInsertTemplate', {NAME: 'file-alt'});

        /* Register Template Insert Commands */
        for (var i in templateGroups) {
            var templateGroup = templateGroups[i];

            if (!templateGroup.templates.length) {
                continue;
            }

            content += '<li class="klEMTemplateGroupTitle">' + templateGroup.title + '</li>';

            /* Register Template */
            for (var j in templateGroup.templates) {

                content += '<li><a class="fr-command" data-cmd="klInsertTemplate-' + i + '-' + j + '">' + '_ICO' + '&nbsp;&nbsp;' + templateGroup.templates[j].title + '</a></li>';

                (function (template, name) {
                    $.FE.RegisterCommand(name, {
                        undo: true,
                        focus: true,
                        icon: 'klTemplates',
                        callback: function () {
                            this.html.insert(template.content);
                        }
                    });
                })(templateGroup.templates[j], 'klInsertTemplate-' + i + '-' + j);
            }
        }

        content += '</ul>';


        (function (content) {
            /* Register Dropdown */
            $.FE.RegisterCommand('klTemplates', {
                type: 'dropdown',
                title: 'Templates',
                icon: 'klTemplates',
                undo: false,
                focus: true,
                html: function () {
                    return content.replace(/_ICO/g, this.icon.create('klInsertTemplate'));
                }
            });
        })(content);
    })();
})(jQuery);