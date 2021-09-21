var XFES = window.XFES || {};

!function($, window, document, _undefined)
{
	"use strict";

	XFES.SuggestedThreads = XF.Element.newHandler({
		options: {
			searchUrl: null,
			searchContainer: '< form | .js-suggestedThreadContainer',
			searchDisabler: '.js-suggestedThreadDisable',
			delay: 500,
			onBlur: true
		},

		enabled: true,

		$searchContainer: null,
		searchedTitle: '',
		timeout: null,

		init: function()
		{
			if (!this.options.searchUrl)
			{
				console.error('No search URL was provided: %o', this.$target);
				return;
			}

			var $searchContainer = XF.findRelativeIf(
				this.options.searchContainer,
				this.$target
			);
			if (!$searchContainer.length)
			{
				console.error('No search container was found: %o', this.$target);
				return;
			}
			this.$searchContainer = $searchContainer;

			$searchContainer.on('click', this.options.searchDisabler, XF.proxy(this, 'disable'));

			this.$target.on('keydown', XF.proxy(this, 'keydown'));

			if (this.options.delay)
			{
				this.$target.on('input', XF.proxy(this, 'debounceSearch'));
			}

			if (this.options.onBlur)
			{
				this.$target.on('blur', XF.proxy(this, 'performSearch'));
			}

			var $form = this.$target.closest('form');
			if ($form.length)
			{
				$form.on('reset', XF.proxy(this, 'hideSearchContainer'));
			}
		},

		enable: function()
		{
			this.enabled = true;
		},

		disable: function()
		{
			this.enabled = false;
			this.hideSearchContainer();
		},

		/**
		 * @param {Event} e
         */
		keydown: function(e)
		{
			if (e.key === 'Escape' && this.enabled)
			{
				this.disable();
				e.preventDefault();
				return false;
			}
		},

		debounceSearch: function()
		{
			if (this.timeout)
			{
				clearTimeout(this.timeout);
			}

			this.timeout = setTimeout(
				XF.proxy(this, 'performSearch'),
				this.options.delay
			);
		},

		performSearch: function()
		{
			if (this.timeout)
			{
				clearTimeout(this.timeout);
				this.timeout = null;
			}

			if (!this.enabled)
			{
				return;
			}

			var title = this.getInputTitle();
			if (title === this.searchedTitle)
			{
				return;
			}

			this.searchedTitle = title;

			if (title === '')
			{
				this.hideSearchContainer();
				return;
			}

			XF.ajax(
				'POST',
				this.options.searchUrl,
				{'title': title},
				XF.proxy(this, 'handleResponse'),
				{skipDefault: true}
			);
		},

		/**
		 * @param {Object} data
		 */
		handleResponse: function(data)
		{
			if (data.errors || data.exception)
			{
				this.hideSearchContainer();
				return;
			}

			if (data.title !== this.getInputTitle())
			{
				return;
			}

			if (data.resultCount === 0)
			{
				this.hideSearchContainer();
				return;
			}

			var self = this;
			XF.setupHtmlInsert(data.html, function($html)
			{
				self.showSearchContainer($html);
			});
		},

		/**
		 * @return {string}
		 */
		getInputTitle: function()
		{
			return $.trim(this.$target.val());
		},

		/**
		 * @param {jQuery} $html
		 */
		showSearchContainer: function($html)
		{
			var $searchContainer = this.$searchContainer;

			$searchContainer.html($html);
			XF.activate($searchContainer);

			if (!$searchContainer.is(':visible'))
			{
				$searchContainer.xfFadeDown(XF.config.speed.fast);
			}
		},

		hideSearchContainer: function()
		{
			var $searchContainer = this.$searchContainer;

			$searchContainer.xfFadeUp(XF.config.speed.fast, function()
			{
				$searchContainer.empty();
			});
		}
	});

	XF.Element.register('suggested-threads', 'XFES.SuggestedThreads');
}
(jQuery, window, document);
