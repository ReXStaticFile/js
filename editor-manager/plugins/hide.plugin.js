/*!
 * kl/editor-manager/plugins/hide.plugin.js
 * License https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode
 * Copyright 2020 Lukas Wieditz
 */

/*global console, jQuery, XF, setTimeout */
/*jshint loopfunc:true */

(function ($) {
	$.FE.DefineIcon('klHide', { NAME: 'eye-slash'});
	$.FE.DefineIcon('klHidePosts', { NAME: 'minus-circle'});
	$.FE.DefineIcon('klHideReply', { NAME: 'minus-octagon'});
	$.FE.DefineIcon('klHideThanks', { NAME: 'minus-hexagon'});
	$.FE.DefineIcon('klHideReplyThanks', { NAME: 'minus-square'});
	$.FE.DefineIcon('klHideMembers', { NAME: 'user-minus'});
	$.FE.DefineIcon('klHideDate', { NAME: 'stopwatch'});
	$.FE.DefineIcon('klHideGroup', { NAME: 'folder-minus'});

	$.FE.RegisterCommand('klEMHide', {
		title: 'Hide',
		icon: 'klHide',
		undo: true,
		focus: true,
		callback: function() {XF.EditorHelpers.wrapSelectionText(this,'[HIDE]','[/HIDE]',true);}
	});
	$.FE.RegisterCommand('klEMHidePosts', {
		title: 'Hide Posts',
		icon: 'klHidePosts',
		undo: true,
		focus: true,
		callback: function() {XF.EditorHelpers.wrapSelectionText(this,'[HIDEPOSTS]','[/HIDEPOSTS]',true);}
	});
	$.FE.RegisterCommand('klEMHideThanks', {
		title: 'Hide Thanks',
		icon: 'klHideThanks',
		undo: true,
		focus: true,
		callback: function() {XF.EditorHelpers.wrapSelectionText(this,'[HIDETHANKS]','[/HIDETHANKS]',true);}
	});
	$.FE.RegisterCommand('klEMHideReply', {
		title: 'Hide Reply',
		icon: 'klHideReply',
		undo: true,
		focus: true,
		callback: function() {XF.EditorHelpers.wrapSelectionText(this,'[HIDEREPLY]','[/HIDEREPLY]',true);}
	});
	$.FE.RegisterCommand('klEMHideReplyThanks', {
		title: 'Hide Reply Thanks',
		icon: 'klHideReplyThanks',
		undo: true,
		focus: true,
		callback: function() {XF.EditorHelpers.wrapSelectionText(this,'[HIDEREPLYTHANKS]','[/HIDEREPLYTHANKS]',true);}
	});
	$.FE.RegisterCommand('klEMHideMembers', {
		title: 'Hide Members',
		icon: 'klHideMembers',
		undo: true,
		focus: true,
		callback: function() {XF.EditorHelpers.wrapSelectionText(this,'[HIDEMEMBERS]','[/HIDEMEMBERS]',true);}
	});
	$.FE.RegisterCommand('klEMHideMembers', {
		title: 'Hide Group',
		icon: 'klHideGroup',
		undo: true,
		focus: true,
		callback: function() {XF.EditorHelpers.wrapSelectionText(this,'[HIDEGROUP=]','[/HIDEGROUP]',true);}
	});
	$.FE.RegisterCommand('klEMHideDate', {
		title: 'Hide Date',
		icon: 'klHideDate',
		undo: true,
		focus: true,
		callback: function() {XF.EditorHelpers.wrapSelectionText(this,'[HIDEDATE=]','[/HIDEDATE]',true);}
	});
})(jQuery);