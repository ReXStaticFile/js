(function ($, window, document, _undefined) {
    "use strict";

    XF.THSwitchPanes = XF.Element.newHandler({
        options: {
            panes: '.js-SwitchPanes > li',
            prevButton: '.js-SwitchTriggers > .js-PrevButton',
            nextButton: '.js-SwitchTriggers > .js-NextButton'
        },

        $panes: null,
        $paneCount: null,
        $prevButton: null,
        $nextButton: null,
        $activeTab: null,

        init: function () {
            var $container = this.$target,
                $panes, $paneCount, $prevButton, $nextButton, $activeTab;

            $panes = this.$panes = $container.find(this.options.panes);
            $paneCount = this.$paneCount = $panes.length;

            $prevButton = this.$prevButton = $container.find(this.options.prevButton);
            $nextButton = this.$nextButton = $container.find(this.options.nextButton);

            $activeTab = $panes.filter('.is-active')[0];
            if (!$activeTab) {
                $activeTab = $($panes[$panes.length - 1]).addClass('is-active');
            }
            else {
                $activeTab = $($activeTab);
            }

            $panes.not($activeTab).removeClass('is-active');
            this.$activeTab = $activeTab;

            $prevButton.on('click', XF.proxy(this, 'prevPane'));
            $nextButton.on('click', XF.proxy(this, 'nextPane'));
            this.switchButtonStates();
        },

        switchButtonStates: function() {
            if (!this.$activeTab.next().length) {
                this.$nextButton.addClass('button--disabled');
            }
            else {
                this.$nextButton.removeClass('button--disabled');
            }

            if (!this.$activeTab.prev().length) {
                this.$prevButton.addClass('button--disabled');
            }
            else {
                this.$prevButton.removeClass('button--disabled');
            }
        },

        prevPane: function () {
            var $activeTab = this.$activeTab,
                $button = this.$prevButton;

            if($button.hasClass('button--disabled')) {
                return;
            }

            $activeTab.removeClass('is-active');

            $activeTab = this.$activeTab = $activeTab.prev();
            $activeTab.addClass('is-active');

            this.switchButtonStates();
        },

        nextPane: function() {
            var $activeTab = this.$activeTab,
                $button = this.$nextButton;

            if($button.hasClass('button--disabled')) {
                return;
            }

            $activeTab.removeClass('is-active');

            $activeTab = this.$activeTab = $activeTab.next();
            $activeTab.addClass('is-active');

            this.switchButtonStates();
        }
    });

    XF.Element.register('th-switch-panes', 'XF.THSwitchPanes');

}(jQuery, window, document));