!function($, window, document, _undefined)
{
    "use strict";

    XF.XFACheckAll = XF.Event.newHandler({
        eventNameSpace: 'XFACheckAll',
        options: {
            inputName: "",
            check: true
        },

        $checkboxes: null,

        init: function()
        {
            this.$checkboxes = $("input[name^='"  + this.options.inputName  + "']");
        },

        click: function(e)
        {
            if (this.$checkboxes)
            {
                this.$checkboxes.attr('checked', this.options.check);
            }

            e.preventDefault();
        }
    });

    XF.Event.register('click', 'XFACheckAll', 'XF.XFACheckAll');
}
(jQuery, window, document);