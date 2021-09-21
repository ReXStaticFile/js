/*!
 * kl/editor-manager/edit-font.js
 * License https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode
 * Copyright 2017 Lukas Wieditz
 */

/*global $, XF, setTimeout, jQuery, window, document */

(function ($, window, document, _undefined) {
	"use strict";

	$('body').on('change', 'input:radio[name="type"]', function () {
		if ($(this).is(':checked')) {
			if (!$('#container-' + $(this).val()).is(':visible')) {
				$('#container-upload, #container-web, #container-client').not('#container-' + $(this).val()).slideUp(100);
				$('#container-' + $(this).val()).slideDown(100);
			}
			setTimeout(function () { XF.layoutChange(); }, 100);
		}
	});

	$('body').on('change', 'select[name="web_service"]', function () {
		if (!$('#example-' + $(this).val()).is(':visible')) {
			$('#example-gfonts, #example-typekit, #example-webtype, #example-fonts').not('#example-' + $(this).val()).slideUp(100);
			$('#example-' + $(this).val()).slideDown(100);
		}
		setTimeout(function () { XF.layoutChange(); }, 100);
	});

}($, window, document));