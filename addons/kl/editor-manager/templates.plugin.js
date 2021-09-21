/*!
 * kl/editor-manager/templates.plugin.js
 * License https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode
 * Copyright 2017 Lukas Wieditz
 */

/*global console, jQuery, XF, setTimeout */
/*jshint loopfunc:true */

(function ($) {
	var templates,
		category,
		content = '<ul class="fr-dropdown-list">';

	try {
		templates = $.parseJSON($('.js-klEditorTemplates').first().html()) || {};
	} catch (e) {
		templates = false;
	}

	$.FE.DefineIcon('klTemplates', { NAME: 'clipboard'});
	$.FE.DefineIcon('klInsertTemplate', { NAME: 'file-o'});
	
	/* Register Template Insert Commands */
	for (var i in templates) {
		content += '<li class="klEMTemplateSeparator"></li>';
		
		/* Register Template */
		for(var j in templates[i]) {
			content += '<li><a class="fr-command" data-cmd="klInsertTemplate-' + i + '-' + j + '">' + '_ICO' + '&nbsp;&nbsp;' + templates[i][j].title + '</a></li>';

			(function(template, name)
			 {
				$.FE.RegisterCommand(name, {
					undo: true,
					focus: true,
					icon: 'klTemplates',
					callback: function()
					{
						this.html.insert(template.content);
					}
				});
			})(templates[i][j], 'klInsertTemplate-' + i + '-' + j);
		}
	}
	
	content += '</ul>';

	
	(function(content) {
		/* Register Dropdown */
		$.FE.RegisterCommand('klTemplates', {
			type: 'dropdown',
			title: 'Templates',
			icon: 'klTemplates',
			undo: false,
			focus: true,
			html: function() {
				return content.replace(/_ICO/g, this.icon.create('klInsertTemplate'));
			}
		});
	})(content);
})(jQuery);