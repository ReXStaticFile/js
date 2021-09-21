/*!
* kl/editor-manager/base.js
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
	};

	$(document).on('editor:config', function(event, config, xfEditor) {
		var newConfig;
		
		// Add Link To Allowed Tags
		config.htmlAllowedTags.push('link');
		
		/* Load config overwrites */
		try {
			newConfig = $.parseJSON($('.js-klEditorConfig').first().html()) || {};
			copyProperties(config, newConfig);
			Object.assign(config, newConfig);
		} catch (e) {
			console.error(e);
		}
	});
}(jQuery, window, document));