/*!
* kl/editor-manager/extend.js
* License https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode
* Copyright 2017 Lukas Wieditz
*/

/*jslint browser: true, nomen: true*/
/*global jQuery, XF, console */

(function ($, window, document, _undefined) {
	"use strict";

	var copyProperties = function (to, from) {
		for (var key in from) {
			if (Object.prototype.hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}
	}
	
	$.FE.DefineIcon('xfKLEMiSpoiler', { NAME: 'eye-slash'});
	$.FE.RegisterCommand('xfKLEMiSpoiler', {
		title: 'Inline Spoiler',
		icon: 'xfKLEMiSpoiler',
		undo: true,
		focus: true,
		callback: function() {
			var ed = this,
				beforeShow = function(overlay) {
					var $title = $('#editor_spoiler_title').val('');
					setTimeout(function() {$title.autofocus();}, 0);
				},
				init = function(overlay) {
					$('#editor_spoiler_submit').click(function(e) {
						e.preventDefault();
						ed.selection.restore();
						XF.EditorHelpers.insertKLEMiSpoiler(ed, $('#editor_spoiler_title').val());
						overlay.hide();
					});
				};

			XF.EditorHelpers.loadDialog(ed, 'spoiler', init, beforeShow, true);
		}
	});

	$.FE.DefineIcon('klEMParseHtml', { NAME: 'code'});
	$.FE.RegisterCommand('klEMParseHtml', {
		title: 'HTML',
		icon: 'klEMParseHtml',
		undo: true,
		focus: true,
		callback: function() {
			XF.EditorHelpers.wrapSelectionText(this, '[PARSEHTML]', '[/PARSEHTML]', true);
		}
	});
	
	/* Additional Helpers */
	XF.EditorHelpers.insertKLEMiSpoiler = function(ed, title) {
		var open;
		if (title) {
			open = '[ISPOILER="' + title + '"]';
		}
		else {
			open = '[ISPOILER]';
		}

		XF.EditorHelpers.wrapSelectionText(ed, open, '[/ISPOILER]', true);
	};

	$(document).on('editor:config', function(event, config, xfEditor) {
		var newConfig,
			dropdowns;

		/* Load dropdowns */
		try {
			dropdowns = $.parseJSON($('.js-klEditorDropdowns').first().html()) || {};
		} catch (e) {
			console.error(e);
			dropdowns = [];
		}

		/* Load config overwrites */
		try {
			newConfig = $.parseJSON($('.js-klEditorConfig').first().html()) || {};
			copyProperties(config, newConfig);
			// Object.assign(config, newConfig);
			
		} catch (e) {
			console.error(e);
		}

		/* Register dropdowns */
		for(var i in dropdowns) {
			if(dropdowns[i].buttons.length) {
				(function(dropdown, name)
				 {
					$.FE.DefineIcon(name, { NAME: dropdown.icon });

					$.FE.RegisterCommand(name, {
						type: 'dropdown',
						title: dropdown.title,
						icon: name,
						undo: false,
						focus: true,
						id: i,
						html: function()
						{
							var o = '<ul class="fr-dropdown-list">',
								options = dropdown.buttons,
								c, info;
							for (var j in options)
							{
								c = options[j];
								info = $.FE.COMMANDS[c];
								o += '<li><a class="fr-command" data-cmd="' + c + '">' + this.icon.create(info.icon || c) + '&nbsp;&nbsp;' + this.language.translate(info.title) + '</a></li>';
							}
							o += '</ul>';

							return o;
						}
					});
				})(dropdowns[i], i);
			}
		}
	});

	$(document).on('editor:init', function(event, ed, xfEditor) {
		var newConfig;

		/* Load config overwrites */
		try {
			newConfig = $.parseJSON($('.js-klEditorConfig').first().html()) || {};
		} catch (e) {
			console.error(e);
			newConfig = {
				colorTypes: {color: true, bgcolor: false}
			};
		}
		
		/* Enable/Disable Color Swapper Toolbar */
		if(newConfig.colorTypes.bgcolor && newConfig.colorTypes.color) {
			ed.events.on('popups.show.colors.picker', function() {
				$(ed.popups.get('colors.picker')).find('.fr-colors-buttons').css('display', 'block');
			});
		}
		if(!newConfig.colorTypes.color) {
			ed.events.on('popups.show.colors.picker', function() {
				$(ed.popups.get('colors.picker')).find('.fr-colors-tab').toggleClass('fr-selected-tab');
				$(ed.popups.get('colors.picker')).find('.fr-color-set').toggle();
			});
		}

		/* Re-Enable Justify Alignment Button */
		ed.$tb.find('[data-cmd=align][data-param1=justify]').closest('li').css('display', 'block');
	});
}(jQuery, window, document));