/*!
 * kl/editor-manager/templates.plugin.js
 * License https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode
 * Copyright 2017 Lukas Wieditz
 */

/*global console, jQuery, XF, setTimeout */
/*jshint loopfunc:true */

(function ($) {
	$.FE.DefineIcon('klHide', { NAME: 'thumbs-up'});

	$.FE.RegisterCommand('klEMHide', {
		title: 'Hide',
		icon: 'klHide',
		undo: true,
		focus: true,
		callback: function() {XF.EditorHelpers.wrapSelectionText(this,'[HIDE]','[/HIDE]',true);}
	});
	$.FE.RegisterCommand('klEMHidePosts', {
		title: 'Hide Posts',
		icon: 'klHide',
		undo: true,
		focus: true,
		callback: function() {XF.EditorHelpers.wrapSelectionText(this,'[HIDEPOSTS]','[/HIDEPOSTS]',true);}
	});
	$.FE.RegisterCommand('klEMHideThanks', {
		title: 'Hide Thanks',
		icon: 'klHide',
		undo: true,
		focus: true,
		callback: function() {XF.EditorHelpers.wrapSelectionText(this,'[HIDETHANKS]','[/HIDETHANKS]',true);}
	});
	$.FE.RegisterCommand('klEMHideReply', {
		title: 'Hide Reply',
		icon: 'klHide',
		undo: true,
		focus: true,
		callback: function() {XF.EditorHelpers.wrapSelectionText(this,'[HIDEREPLY]','[/HIDEREPLY]',true);}
	});
	$.FE.RegisterCommand('klEMHideReplyThanks', {
		title: 'Hide',
		icon: 'klHide',
		undo: true,
		focus: true,
		callback: function() {XF.EditorHelpers.wrapSelectionText(this,'[HIDEREPLYTHANKS]','[/HIDEREPLYTHANKS]',true);}
	});

	/* Register Dropdown */
	$.FE.RegisterCommand('klHideInsert', {
		type: 'dropdown',
		title: 'Hide',
		icon: 'klHide',
		undo: false,
		focus: true,
		html: function() {
			var o = '<ul class="fr-dropdown-list">' +
				'<li><a class="fr-command" data-cmd="klEMHide">' + this.icon.create('klHide') + '&nbsp;&nbsp;Hide</a></li>' +
				'<li><a class="fr-command" data-cmd="klEMHideReply">' + this.icon.create('klHide') + '&nbsp;&nbsp;Hide Reply</a></li>' +
				'<li><a class="fr-command" data-cmd="klEMHideThanks">' + this.icon.create('klHide') + '&nbsp;&nbsp;Hide Thanks</a></li>' +
				'<li><a class="fr-command" data-cmd="klEMHideReplyThanks">' + this.icon.create('klHide') + '&nbsp;&nbsp;Hide Reply Thanks</a></li>' +
				'<li><a class="fr-command" data-cmd="klEMHidePosts">' + this.icon.create('klHide') + '&nbsp;&nbsp;Hide Posts</a></li>'+
				'</ul>';

			return o;
		}
	});
})(jQuery);