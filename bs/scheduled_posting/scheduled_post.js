/** @param {jQuery} $ jQuery Object */
!function($, window, document) {
    "use strict";

    XF.ScheduledPost = XF.Element.newHandler({
        options: {},

        ignore: false,

        init: function()
        {
            this.$lastDate = this.$target.hasClass('js-post') ? $('input[name="last_date"]') : this.$target.find('input[name="last_date"]');

            $(document).on('ajax-submit:response', '#' + this.$target.attr('id'), XF.proxy(this, 'submit'));
        },

        submit: function(e, data)
        {
            e.preventDefault();

            if (this.ignore)
            {
                return;
            }

            if (!data.errors)
            {
                var self = this;

                XF.setupHtmlInsert(data.html, function($html, container)
                {
                    if (!$html.hasClass('is-scheduled')) {
                        if (self.$lastDate.length && self.$lastDate.val() < data.post_date) {
                            self.$lastDate.val(data.post_date);
                        }

                        self.$target.removeClass('is-scheduled');
                        self.ignore = true;
                    }
                });
            }
        }
    });

    XF.Element.register('scheduled-post', 'XF.ScheduledPost');
}
(jQuery, window, document);