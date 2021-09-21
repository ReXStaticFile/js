var MJ = window.MJ || {};
MJ.Credits = window.MJ.Credits || {};

!function($, window, document, _undefined)
{
	"use strict";

	// ################################## EDITOR DIALOG ###########################################
	MJ.Credits.EditorDialogCharge = XF.extend(XF.EditorDialog, {
		_beforeShow: function (overlay)
		{
			$('#editor_mjc_credits_charge_title').val('');
		},

		_init: function (overlay)
		{
			$('#editor_mjc_credits_charge_form').submit(XF.proxy(this, 'submit'));
		},

		submit: function (e)
		{
			e.preventDefault();

			var ed = this.ed,
				overlay = this.overlay;

			ed.selection.restore();
			MJ.Credits.EditorHelpers.insertCharge(ed, $('#editor_mjc_credits_charge_title').val());

			overlay.hide();
		}
	});

	// ################################## EDITOR START ###########################################
	MJ.Credits.editorStart = {
		started: false,
		custom: [],

		startAll: function()
		{
			if (!MJ.Credits.editorStart.started)
			{
				MJ.Credits.editorStart.registerCommands();
				MJ.Credits.editorStart.registerDialogs();

				MJ.Credits.editorStart.started = true;
			}
		},

		registerCommands: function()
		{
			var custom;

			try
			{
				custom = $.parseJSON($('.js-editorCustom').first().html()) || {};
			}
			catch (e)
			{
				console.error(e);
				custom = {};
			}

			if (typeof custom.charge !== 'undefined')
			{
				$.FE.RegisterCommand('xfCustom_charge', {
					title: custom.charge.title,
					icon: 'xfCustom_charge',
					undo: true,
					focus: true,
					callback: function()
					{
						XF.EditorHelpers.loadDialog(this, 'mjcCreditsCharge');
					}
				});
			}
		},

		registerDialogs: function()
		{
			XF.EditorHelpers.dialogs.mjcCreditsCharge = new MJ.Credits.EditorDialogCharge('mjcCreditsCharge');
		}
	};

	// ################################## EDITOR HELPER ###########################################
	MJ.Credits.EditorHelpers = {
		insertCharge: function(ed, amount)
		{
			var open;
			if (amount)
			{
				open = '[CHARGE=' + amount + ']';
			}
			else
			{
				open = '[CHARGE]';
			}

			XF.EditorHelpers.wrapSelectionText(ed, open, '[/CHARGE]', true);
		}
	};

	$(document).one('editor:start', MJ.Credits.editorStart.startAll);
}
(jQuery, window, document);