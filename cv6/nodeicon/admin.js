! function ($, window, document, _undefined) {
    "use strict";

    XF.Element.extend("asset-upload", {
        __backup: {
            "ajaxResponse": "_afterAjaxResponseNodeIcon"
        },
        ajaxResponse: function (data) {
            this._afterAjaxResponseNodeIcon(data);
            if (data.path) {
                this.$path.css('background-image', 'url(' + data.path + ')');
            }
        }
    });

    XF.cv6NodeIcon = XF.Element.newHandler({

        options: {
            container: null
        },

        oldval: null,

        init: function () {
			if (this.options.container) {
			    this.$container = XF.findRelativeIf(this.options.container, this.$target);
			}
            else{
                console.log("No target Container defined!");
            }
            
            var self = this;
            this.$target.on('blur', XF.proxy(this, 'blur'))
                        .on('focus', XF.proxy(this, 'focus'));;
        },

        focus: function (e) {
            this.oldval = this.$target.val();
        },

        blur: function (e) {
            this.$container.removeClass(this.oldval).addClass(this.$target.val());
        }

    });

    XF.cv6NodeImage = XF.Element.newHandler({

        oldval: null,

        init: function () {
            this.$target.css('background-image', 'url(' + this.$target.val() + ')');
            var self = this;
            this.$target.on('blur', XF.proxy(this, 'blur'))
                .on('focus', XF.proxy(this, 'focus'));;
        },

        focus: function (e) {
            this.$target.css('background-image', 'url()');
            this.oldval = this.$target.val();
        },

        blur: function (e) {
            this.$target.css('background-image', 'url(' + this.$target.val() + ')');
        }

    });

    XF.cv6NodeIconToggle = XF.Element.newHandler({

        image: null,
        icon: null,

        init: function () {
            this.image = XF.findRelativeIf('.js-cv6-ni-image', this.$target);
            this.icon = XF.findRelativeIf('.js-cv6-ni-fa', this.$target);
            this.$target.on('change', XF.proxy(this, 'change'));
        },

        change: function (e) {
            console.log($("input[name='node[cv6_icon_type]']:checked").val());
            switch ($("input[name='node[cv6_icon_type]']:checked").val()) 
            {
                case "1":
                        this.icon.xfFadeDown(XF.config.speed.normal);
                        this.image.xfFadeUp(XF.config.speed.normal);
                        break;
                case "2":
                case "3":
                        this.icon.xfFadeUp(XF.config.speed.normal);
                        this.image.xfFadeDown(XF.config.speed.normal);
                        break;
                case "0":
                default:
                        this.icon.xfFadeUp(XF.config.speed.normal);
                        this.image.xfFadeUp(XF.config.speed.normal);
                        break;
            }
        }

    });

    XF.Element.register('cv6-node-icon', 'XF.cv6NodeIcon');
    XF.Element.register('cv6-node-image', 'XF.cv6NodeImage');
    XF.Element.register('cv6-node-icon-toggle', 'XF.cv6NodeIconToggle');
    
}(jQuery, window, document);