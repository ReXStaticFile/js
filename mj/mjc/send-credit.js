/** @param {jQuery} $ jQuery Object */
!function($, window, document)
{
	"use strict";
	XF.MJCSendCredit = XF.Element.newHandler({

		options: {
		},

		init: function()
		{
			this.$target.find('.sendAmount').on('change', XF.proxy(this, 'getSummary'));
			this.$target.find('select').on('change', XF.proxy(this, 'getSummary'));
		},

		getSummary: function(e)
		{
			e.preventDefault();
			var self = this;
			XF.ajax(
				'post', XF.canonicalizeUrl('index.php?mjc-credits/send-credit-amount'),
				self.$target.serialize(),
				XF.proxy(self, 'handleAjax'),
				{skipDefaultSuccessError: true}
			);
		},

		handleAjax: function(data)
		{
			console.log(data.errors);
			if (data.errors || data.exception)
			{
				return;
			}

			var self = this;
			XF.setupHtmlInsert(data.html, function($html, container, onComplete)
			{
				self.$target.find('.mjc-summary dd').html($html);
				onComplete();
			});
		}
	});

	// ################################## --- ###########################################

	XF.Element.register('mjc-send-credit-form', 'XF.MJCSendCredit');
}
(jQuery, window, document);