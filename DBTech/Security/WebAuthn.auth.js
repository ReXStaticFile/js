var DBTech = window.DBTech || {};
DBTech.Security = DBTech.Security || {};
DBTech.Security.WebAuthn = DBTech.Security.WebAuthn || {};

!function($, window, document, _undefined)
{
	"use strict";

	// ################################## SECURITY KEY CLICK ###########################################

	DBTech.Security.WebAuthn.Auth = XF.Event.newHandler({
		eventNameSpace: 'DBTechSecurityWebAuthnAuthClick',

		options: {
			form: null,
			messageBlock: '.js-webAuthnMessage'
		},

		$publicKey: null,

		$message: null,
		$form: null,
		initDone: false,

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
			if (this.$publicKey.allowCredentials)
			{
				var $self = this;

				this.$publicKey.allowCredentials = this.$publicKey.allowCredentials.map(function (data)
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

			var $self = this;

			navigator.credentials.get({'publicKey': publicKey})
				.then(function (data)
				{
					const publicKeyCredential = {
						id: data.id,
						type: data.type,
						rawId: $self.arrayToBase64String(new Uint8Array(data.rawId)),
						response: {
							authenticatorData: $self.arrayToBase64String(new Uint8Array(data.response.authenticatorData)),
							clientDataJSON: $self.arrayToBase64String(new Uint8Array(data.response.clientDataJSON)),
							signature: $self.arrayToBase64String(new Uint8Array(data.response.signature)),
							userHandle: data.response.userHandle ? $self.arrayToBase64String(new Uint8Array(data.response.userHandle)) : null
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
			this.$target.hide();
			this.$message.html(XF.phrase('dbtech_security_touch_authenticator_to_login'));
		},

		displayError: function(error)
		{
			this.$target.show();
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

	XF.Event.register('click', 'dbtech-security-trigger-auth', 'DBTech.Security.WebAuthn.Auth');
}
(jQuery, window, document);