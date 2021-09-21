/*!
 * kl/editor-manager/google-font.js
 * License https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode
 * Copyright 2017 Lukas Wieditz
 */

/*global $, XF, setTimeout, jQuery, window, document */

(function ($, window, document, _undefined) {
	"use strict";
	$('body').on('change paste auto-complete:insert', '#editor_kl_em_gfont_title', function(event) {
		var font = $('#editor_kl_em_gfont_title').val(),
			fontStripped = font.replace(/[^A-Za-z0-9\+ ]/g, ''),
			fontEscaped = fontStripped.replace(' ', '+'),
			elem = $('#editor_kl_em_gfont_preview');

		elem.css('width', elem.innerWidth());
		textFit(elem);

		$('#editor_kl_em_gfont_preview').css('font-family', "'" + fontStripped + "'");
		$('head').append($('<link/>', {'rel': 'stylesheet', 'href':'https://fonts.googleapis.com/css2?family=' + fontEscaped}));
	});
}($, window, document));