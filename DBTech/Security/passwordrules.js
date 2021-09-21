var DBTech = window.DBTech || {};
DBTech.Security = DBTech.Security || {};

!function($, window, document, _undefined)
{
	"use strict";

	// ################################## PASSWORD RULES ###########################################
	DBTech.Security.PasswordRules = XF.Element.newHandler({

		options: {
			container: '< li | ul, ol, dl',
			controls: 'input, select, textarea, button, .js-attachmentUpload',
			rules: {},
			templateRules: '.js-passwordRules'
		},

		$container: null,

		$form: null,
		$input: null,

		init: function()
		{
			this.$container = XF.findRelativeIf(this.options.container, this.$target);

			if (!this.$container.length)
			{
				console.error('Could not find the disabler control container');
			}

			this.$input = this.$target;

			this.$input.parent().after($(this.options.templateRules).show());

			var $input = this.$target,
				$form = $input.closest('form');
			if ($form.length)
			{
				$form.on('reset', XF.proxy(this, 'formReset'));
			}

			$input.on('focus input', (XF.proxy(this, 'change')));

			// this ensures that nested disablers are disabled properly
			$input.on('control:enabled control:disabled', XF.proxy(this, 'recalculateAfter'));

			// this ensures that dependent editors are initialised properly as disabled if needed
			this.$container.one('editor:init', XF.proxy(this, 'recalculateAfter'));

			this.recalculate();
		},

		change: function()
		{
			this.recalculateAfter();
		},

		formReset: function(e)
		{
			this.recalculateAfter();
		},

		recalculateAfter: function()
		{
			var t = this;
			setTimeout(function()
			{
				t.recalculate();
			}, 0);
		},

		recalculate: function()
		{
			var $container = this.$container,
				$input = this.$target,
				$controls = $container.find(this.options.controls).not($input),
				$val = this.$target.val(),
				enable = true;

			$(this.options.templateRules).find('div > i').each(function()
			{
				var $obj = $(this);

				var rule = $obj.data('security-rule');
				if (!rule)
				{
					return true;
				}

				var matched = false;
				switch (rule)
				{
					case 'length':
						matched = $val.length >= $obj.data('param');
						break;

					case 'lowercase':
						matched = $val.match(/[a-z]+/) !== null;
						break;

					case 'uppercase':
						matched = $val.match(/[A-Z]+/) !== null;
						break;

					case 'numbers':
						matched = $val.match(/[0-9]+/) !== null;
						break;

					case 'symbols':
						matched = $val.match(/\W+/) !== null;
						break;

					default:
						matched = false;
				}

				if (matched)
				{
					$obj.removeClass('passwordRule--bad fa-times')
						.addClass('passwordRule--good fa-check');
				}
				else
				{
					$obj.removeClass('passwordRule--good fa-check')
						.addClass('passwordRule--bad fa-times');
				}

				enable = enable && matched;
			});

			if (enable)
			{
				$container
					.prop('disabled', false)
					.removeClass('is-disabled');

				$controls
					.prop('disabled', false)
					.removeClass('is-disabled')
					.each(function(i, ctrl)
					{
						var $ctrl = $(ctrl);

						if ($ctrl.is('select.is-readonly'))
						{
							// readonly has to be implemented through disabling so we can't undisable this
							$ctrl.prop('disabled', true);
						}
					})
					.trigger('control:enabled');
			}
			else
			{
				$container
					.prop('disabled', true)
					.addClass('is-disabled');

				$controls
					.prop('disabled', true)
					.addClass('is-disabled')
					.trigger('control:disabled')
					.each(function(i, ctrl)
					{
						var $ctrl = $(ctrl),
							disabledVal = $ctrl.data('disabled');

						if (disabledVal !== null && typeof(disabledVal) !== 'undefined')
						{
							$ctrl.val(disabledVal);
						}
					});
			}
		}
	});

	XF.Element.register('dbtech-security-password-rules', 'DBTech.Security.PasswordRules');
}
(jQuery, window, document);