/*!
 * kl/editor-manager/layout.js
 * License https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode
 * Copyright 2017 Lukas Wieditz
 */

/*global $, XF, setTimeout, jQuery, window, document, console */

(function ($, window, document, _undefined) {
	"use strict";
	
	var noDelete = false;

	$(".ui-draggable-source .ui-draggable-element").draggable({
		cursor: "move",
		revert: "invalid",
		helper: "clone",
		connectToSortable: ".ui-droppable",
		start: function(event, ui) {
			noDelete = true;
		},
		stop: function(event, ui) {
			updateInput();
		}
	});

	$('.ui-droppable').sortable({
		revert: true,
		appendTo: document.body,
		placeholder: "placeholder fr-command fr-btn",
		out: function (event, ui) {
			$(ui.draggable).fadeOut(1000, function () {
				$(this).remove();
			});
		},
		stop: function(event, ui) {
			ui.item[0].style.cssText = '';
			updateInput();
		}
	}).droppable({greedy: true});

	$('body').droppable({
		drop: function ( event, ui ) {          
			if(!noDelete) {
				ui.draggable.remove();
				updateInput();
			}
			noDelete = false;
		}
	});

	function updateInput() {
		var value = {},
			values;
		$('.ui-sortable').each(function(index, element) {
			values = [];
			$(element).children().each(function(index, element) {
				if($(element).data('value')) {
					values.push($(element).data('value'));
				}
			});
			value[$(element).data('value')] = values;
		});
		
		console.log(value);
		
		$('#layoutValue').val(JSON.stringify(value));
	}

}($, window, document));