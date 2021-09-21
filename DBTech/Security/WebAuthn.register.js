var DBTech = window.DBTech || {};
DBTech.Security = DBTech.Security || {};
DBTech.Security.WebAuthn = DBTech.Security.WebAuthn || {};

!function($, window, document, _undefined)
{
	"use strict";

	// ################################## SECURITY KEY CLICK ###########################################

	DBTech.Security.WebAuthn.Register = XF.Event.newHandler({
		eventNameSpace: 'DBTechSecurityWebAuthnRegisterClick',

		options: {
			form: null,
			messageBlock: '.js-webAuthnError'
		},

		$publicKey: null,

		$message: null,
		$form: null,
		initDone: false,
		isPending: false,

		init: function()
		{
			var $target = this.$target,
				options = this.options;

			if (!publicKey)
			{
				console.error('PublicKey missing from the form');
				return;
			}

			if (options.form)
			{
				$target = XF.findRelativeIf(options.form, $target);
			}
			this.$form = $target.closest('form');

			this.$message = XF.findRelativeIf(options.messageBlock, $target);

			this.$publicKey = publicKey;
			this.initPublicKey();
		},

		initPublicKey: function()
		{
			if (this.initDone)
			{
				return;
			}

			this.$publicKey.challenge = Uint8Array.from(window.atob(this.base64url2base64(this.$publicKey.challenge)), function (c)
			{
				return c.charCodeAt(0);
			});
			this.$publicKey.user.id = Uint8Array.from(window.atob(this.$publicKey.user.id), function (c)
			{
				return c.charCodeAt(0);
			});
			if (this.$publicKey.excludeCredentials)
			{
				var $self = this;
				this.$publicKey.excludeCredentials = this.$publicKey.excludeCredentials.map(function (data)
				{
					data.id = Uint8Array.from(window.atob($self.base64url2base64(data.id)), function (c)
					{
						return c.charCodeAt(0);
					});
					return data;
				});
			}

			this.initDone = true;
		},

		click: function(e)
		{
			if (this.isPending)
			{
				return;
			}

			this.reset();

			if (location.protocol !== 'https:')
			{
				this.displayError(XF.phrase('dbtech_security_webauthn_requires_ssl'));
				return;
			}
			else if (typeof navigator.credentials === "undefined")
			{
				this.displayError(XF.phrase('dbtech_security_webauthn_browser_not_supported'));
				return;
			}

			if (!this.initDone)
			{
				return;
			}

			this.setPending();

			var $self = this;

			navigator.credentials.create({'publicKey': publicKey})
				.then(function (data)
				{
					const publicKeyCredential = {
						id: data.id,
						type: data.type,
						rawId: $self.arrayToBase64String(new Uint8Array(data.rawId)),
						response: {
							clientDataJSON: $self.arrayToBase64String(new Uint8Array(data.response.clientDataJSON)),
							attestationObject: $self.arrayToBase64String(new Uint8Array(data.response.attestationObject))
						}
					};

					var computedCredential = btoa(JSON.stringify(publicKeyCredential));

					$self.$form.find('[name="publicKeyCredential"]')
						.val(computedCredential)
					;

					$self.$form.submit();
				})
				.catch(function (error)
				{
					$self.displayError(error.message);
				});
		},

		reset: function()
		{
			this.isPending = false;
			this.$target.prop('disabled', false).removeClass('is-disabled');
			this.$message.html('');
		},

		setPending: function()
		{
			this.isPending = true;
			this.$target.prop('disabled', true).addClass('is-disabled');
		},

		displayError: function(error)
		{
			this.isPending = false;
			this.$target.prop('disabled', false).removeClass('is-disabled');
			this.$message.html(error);
		},

		arrayToBase64String: function(a)
		{
			return btoa(String.fromCharCode(...a));
		},

		base64url2base64: function(input)
		{
			// Replace non-url compatible chars with base64 standard chars
			input = input
				.replace(/-/g, '+')
				.replace(/_/g, '/');

			// Pad out with standard base64 required padding characters
			const pad = input.length % 4;
			if (pad)
			{
				if (pad === 1)
				{
					throw new Error('InvalidLengthError: Input base64url string is the wrong length to determine padding');
				}
				input += new Array(5 - pad).join('=');
			}

			return input;
		}
	});

	XF.Event.register('click', 'dbtech-security-register-key', 'DBTech.Security.WebAuthn.Register');
}
(jQuery, window, document);