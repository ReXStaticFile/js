/** @param {jQuery} $ jQuery Object */
!function($, window, document) {
    "use strict";

    XF.ScheduleInput = XF.Element.newHandler({
        options: {
            minDate: null,
            maxDate: null,
            format: 'DD.MM.YYYY HH:mm',
            triggerFormat: 'Do MMMM YYYY HH:MM',
            step: 1,
            locale: 'en'
        },

        init: function () {
            this.$checkbox = this.$target.find('.js-scheduleCheckbox');
            this.$input = this.$target.find('.js-scheduleDate');
            this.$trigger = this.$target.find('.js-scheduleTrigger');
            this.$reset = this.$target.find('.js-scheduleReset');

            var self = this,
                config = {
                    defaultDate: moment().add(1, 'hours'),
                    minDate: this.options.minDate ? moment.unix(this.options.minDate) : false,
                    maxDate: this.options.maxDate ? moment.unix(this.options.maxDate) : false,
                    format: this.options.format,
                    stepping: this.options.step,
                    locale: this.options.locale,
                    widgetPositioning: {
                        horizontal: 'left',
                        vertical: 'auto'
                    }
                };

            this.picker = this.$input.datetimepicker(config)
                .on({
                    'dp.show': XF.proxy(this, 'onShow'),
                    'dp.hide': XF.proxy(this, 'onHide'),
                    'dp.change': XF.proxy(this, 'displayDate')
                })
                .data('DateTimePicker');

            this.$trigger.on('click', function() {
                self.picker.show();
            });

            this.$reset.on('click', function() {
                if (self.$target.hasClass('scheduled')) {
                    self.reset();
                } else {
                    self.picker.show();
                }
            });

            if (this.$input.closest('form')) {
                this.$input.closest('form').on('ajax-submit:response', function (e, data) {
                    if (! data.errors) {
                        self.reset();
                    }
                });
            }
        },

        reset: function () {
            this.$trigger.text(XF.phrase('bssp_now'));
            this.$checkbox.prop('checked', false);
            this.picker.clear();
            this.$input.val('');
            this.$target.removeClass('scheduled');
        },

        $widget: null,

        onShow: function (e) {
            var self = this;

            this.$widget = this.$input.closest('.js-scheduleInput')
                .find('.bootstrap-datetimepicker-widget')
                .data('menu-trigger', (function () {
                    let close = function () {
                        self.picker.hide();
                    };

                    return {
                        close: close
                    };
                })());

            setTimeout(function () {
                XF.MenuWatcher.onOpen(self.$widget);
            });

            this.displayDate(e);
        },

        onHide: function () {
            XF.MenuWatcher.onClose(this.$widget);
        },

        displayDate: function (e) {
            if (! e.date) {
                return;
            }

            this.$trigger.text(e.date.format(this.options.triggerFormat));
            this.$checkbox.prop('checked', true);
            this.$target.addClass('scheduled');
        }
    });

    XF.Element.register('schedule-input', 'XF.ScheduleInput');
}
(jQuery, window, document);