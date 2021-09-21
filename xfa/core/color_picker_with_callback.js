!function($, window, document, _undefined)
{
    "use strict";

    XF.XfaColorPicker = XF.extend(XF.ColorPicker, {
        __backup: {
            'updateBox': '_updateBox'
        },

        options: $.extend({}, XF.ColorPicker.prototype.options, {
            callback: null
        }),

        updateBox: function()
        {
            this._updateBox();

            var color = this.getInputColor();

            if (this.options.callback)
            {
                this.$target.val(color);
                window[this.options.callback]();
            }
            else
            {
                this.$target.val('');
            }
        }
    });

    XF.Element.register('xfa-color-picker', 'XF.XfaColorPicker');
}
(jQuery, window, document);