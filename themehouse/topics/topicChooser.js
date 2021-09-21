var themehouse = themehouse || {};

themehouse.topics = themehouse.topics || {};

themehouse.topics.topicChooser = {
    init: function() {
        var topicId = parseInt($('input[name=topic_id]').val());

        if (topicId) {
            var $ele = $('.thTopicChooser .topic-filter-item[data-topic-id=' + topicId + ']:not([data-is-additional=1])');
            if (!$ele.length) {
                themehouse.topics.topicChooser.unsetTopic();
            }
            $('.thTopicChooser .thTopic--' + topicId).each(function () {
                $(this).data('position', $(this).prevAll().length);
                $(this).appendTo($(this).parent());
            });
        } else {
            var firstTopicId = parseInt($('.thTopicChooser .topic-filter-item:not([data-is-additional=1])').data('topicId'));
            $eles = $('.thTopicChooser .topic-filter-item:not([data-is-additional=1]):not([data-topic-id=' + firstTopicId + '])');
            if ($eles.length === 0) {
                themehouse.topics.topicChooser.setTopic(firstTopicId);
            }
        }
    },

    setTopic: function (topicId) {
        var $targetEle = $('.thTopicChooser .topic-filter-item[data-topic-id=' + topicId + ']:not([data-is-additional=1])');

        if ($targetEle.length) {
            $('input[name=topic_id]').val(topicId).trigger('change');

            $('.thTopicChooser .topic-filter-item[data-topic-id=' + topicId + ']').addClass('topic-filter-item--active');

            $('input[name=additional_topic_ids]').val(JSON.stringify([]));

            $chooser = $targetEle.closest('.thTopicChooser[data-max-topics=0]');
            if ($chooser.length) {
                $submit = $('.thTopicChooserSubmit button.button--primary');
                if ($submit.length) {
                    $submit.click();
                    return;
                }
            }

            $('.thTopic__createThreadBar__topics').each(function () {
                $createThreadBarTopic = $(this).find('.thTopic:first');
                $createThreadBarTopic.addClass("thTopic--" + topicId);
                $createThreadBarTopic.html($targetEle.find('.thTopic--title').html());
                $createThreadBarTopic.attr('data-topic-id', topicId);
            });
            $('.thTopic__createThreadBar').css('display', '');
            if (!$('body').hasClass('is-modalOpen')) {
                $('.thTopic__createThreadBar .th_allTopicsTrigger').click();
            }

            $('.formRow--thTopics').addClass('formRow--topicSelected');
            $('.thTopicChooser .topic-filter-item[data-topic-id=' + topicId + ']').addClass('topic-filter-item--hide');
            $('.thTopicChooser .topic-filter-item[data-topic-id=' + topicId + ']').each(function () {
                $(this).data('position', $(this).prevAll().length);
                $(this).appendTo($(this).parent());
            });

            $('.thTopicChooserSubmit').css('display', '');

            topicGroupId = $targetEle.data('topic-group-id');
            if (topicGroupId) {
                $noMultiSelect = $('.thTopicChooser[data-group-multi-select=1] .topic-filter-item[data-topic-group-id=' + topicGroupId + ']');
                $noMultiSelect.addClass('topic-filter-item--disabled');
            }
        }
    },

    unsetTopic: function() {
        var $topicIdInput = $('input[name=topic_id]');
        var topicId = $topicIdInput.val();

        $topicIdInput.val(0);
        if ($topicIdInput.data('triggerOnUnset')) {
            $topicIdInput.trigger('change');
        }

        $('.thTopic__createThreadBar').css('display', 'none');
        $('.thTopic__createThreadBar__topics').each(function () {
            $(this).find('.thTopic:not(:first)').remove();
            $createThreadBarTopic = $(this).find('.thTopic:first');
            $createThreadBarTopic.removeClass("thTopic--" + topicId);
            $createThreadBarTopic.html('');
        });

        $('.formRow--thTopics').removeClass('formRow--topicSelected');
        $('.thTopicChooser .topic-filter-item[data-topic-id=' + topicId + ']').removeClass('topic-filter-item--hide');
        $('.thTopicChooser .topic-filter-item[data-topic-id=' + topicId + ']').each(function () {
            $(this).siblings().eq($(this).data('position')).before($(this));
        });

        $('input[name=additional_topic_ids]').val(JSON.stringify([]));
        $('.topic-filter-item').removeClass('topic-filter-item--active');

        $('.thTopicChooserSubmit').css('display', 'none');

        $('.topic-filter-item').removeClass('topic-filter-item--disabled');
    },

    addAdditionalTopic: function(topicId) {
        var $targetEle = $('.thTopicChooser .topic-filter-item[data-topic-id=' + topicId + '][data-is-additional=1]');

        if ($targetEle.length && !$targetEle.hasClass('topic-filter-item--disabled')) {
            var additionalTopicIds = JSON.parse($('input[name=additional_topic_ids]').val()).length;
            var maximumTopics = $('.thTopicChooser[data-max-topics]').data('max-topics');

            if (additionalTopicIds < maximumTopics) {
                $('.thTopicChooser .topic-filter-item[data-topic-id=' + topicId + ']').addClass('topic-filter-item--active');

                themehouse.topics.topicChooser.refreshAdditionalTopicsInput();
                groupId = $('.topic-filter-item[data-topic-id=' + topicId + ']').data('topic-group-id');
                if (groupId > 0) {
                    themehouse.topics.topicChooser.checkMultiSelect(groupId);
                }

                var $firstCreateThreadBarTopics = $('.thTopic__createThreadBar__topics');
                $firstCreateThreadBarTopics.each(function() {
                    $createThreadBarTopic = $(this).find('.thTopic:first').clone();
                    $createThreadBarTopic.removeClass('thTopic--' + $('input[name=topic_id]').val());
                    $createThreadBarTopic.addClass('thTopic--' + topicId);
                    $createThreadBarTopic.attr('data-is-additional', 1);
                    $createThreadBarTopic.attr('data-topic-id', topicId);
                    $createThreadBarTopic.attr('data-xf-click', 'th_topicClick');
                    $createThreadBarTopic.removeAttr('data-href');
                    $createThreadBarTopic.removeAttr('data-node-id');
                    $createThreadBarTopic.html($targetEle.find('.thTopic--title').html());
                    $createThreadBarTopic.appendTo($(this));
                });
            } else {
                $('.formRow--topicSelected .block-rowMessage').addClass('block-rowMessage--error');
            }

            themehouse.topics.topicChooser.checkCreateThreadBarOverflow();
        }
    },

    removeAdditionalTopic: function(topicId) {
        $('.formRow--topicSelected .block-rowMessage').removeClass('block-rowMessage--error');

        $('.thTopicChooser .topic-filter-item[data-topic-id=' + topicId + ']').removeClass('topic-filter-item--active');

        $('.thTopic__createThreadBar__topics .thTopic--' + topicId).remove();

        themehouse.topics.topicChooser.refreshAdditionalTopicsInput();
        groupId = $('.topic-filter-item[data-topic-id=' + topicId + ']').data('topic-group-id');
        if (groupId > 0) {
            themehouse.topics.topicChooser.checkMultiSelect(groupId);
        }

        themehouse.topics.topicChooser.checkCreateThreadBarOverflow();
    },

    refreshAdditionalTopicsInput: function() {
        var $topicIdInput = $('input[name=topic_id]');
        var mainTopicId = parseInt($topicIdInput.val());
        var selectedAdditionalTopicIds = $('.thTopicChooser .topic-filter-item--active');
        var selectedAdditional = [];
        for (var i = 0, len = selectedAdditionalTopicIds.length; i < len; i++) {
            var selectedAdditionalTopic = selectedAdditionalTopicIds[i];
            var topicId = parseInt(selectedAdditionalTopic.dataset.topicId, 10);
            if (topicId !== mainTopicId && selectedAdditional.indexOf(topicId) === -1) {
                selectedAdditional.push(topicId);
            }
        }

        $('input[name=additional_topic_ids]').val(JSON.stringify(selectedAdditional));
    },

    checkMultiSelect: function(topicGroupId) {
        $('.thTopicChooser[data-group-multi-select]').each(function() {
            if (groupMultiSelect = $(this).data('group-multi-select')) {
                activeCount = $(this).find('.topic-filter-item--active[data-topic-group-id=' + topicGroupId + ']').length;
                if ($(this).find('.topic-filter-item--hide[data-topic-group-id=' + topicGroupId + ']').length) {
                    activeCount++;
                }
                if (activeCount >= groupMultiSelect) {
                    $(this).find('.topic-filter-item[data-topic-group-id=' + topicGroupId + ']:not(.topic-filter-item--active)').addClass('topic-filter-item--disabled');
                } else {
                    $(this).find('.topic-filter-item[data-topic-group-id=' + topicGroupId + ']').removeClass('topic-filter-item--disabled');
                }
            }
        });
    },

    checkCreateThreadBarOverflow: function() {
        var $firstCreateThreadBarTopics = $('.thTopic__createThreadBar__topics');
        $firstCreateThreadBarTopics.each(function() {
            $(this).find('.thTopic').css('display', '');
            $(this).parent().find('.thTopic__createThreadBar__topics--plus').html('');
            if ((this.offsetHeight < this.scrollHeight) || (this.offsetWidth < this.scrollWidth)) {
                $additionalTopics = $(this).find('.thTopic:not(:first)');
                $additionalTopics.css('display', 'none');
                $(this).parent().find('.thTopic__createThreadBar__topics--plus').html('(' + ($additionalTopics.length + 1) + ')');
            }
        });
    },
};

/** @param {jQuery} $ jQuery Object */
!function($, window, document, _undefined) {
    "use strict";

    XF.THTopicClick = XF.Click.newHandler({
        eventNameSpace: 'XFClickTopic',

        options: {
            topicId: null,
            isAdditional: null
        },

        init: function() {},

        click: function(e) {
            e.preventDefault();

            var topicChooser = themehouse.topics.topicChooser;
            var topicId = this.options.topicId;
            var isAdditional = this.options.isAdditional;

            var $targetEle = $(e.target).closest('.thTopic, .topic-filter-item');

            if (!isAdditional) {
                if ($targetEle.hasClass('thTopic')) {
                    themehouse.topics.topicChooser.unsetTopic(topicId);
                } else {
                    themehouse.topics.topicChooser.setTopic(topicId);
                }
            } else {
                if ($targetEle.hasClass('topic-filter-item--active') || $targetEle.hasClass('thTopic')) {
                    topicChooser.removeAdditionalTopic(topicId);
                } else {
                    topicChooser.addAdditionalTopic(topicId);
                }
            }
        }
    });

    XF.THTopicReset = XF.Click.newHandler({
        eventNameSpace: 'XFClickTopic',

        options: {},

        init: function() {},

        click: function() {
            themehouse.topics.topicChooser.unsetTopic();
        }
    });

    XF.THTopicChooser = XF.Click.newHandler({
        eventNameSpace: 'XFTopicChooser',

        options: {
            href: null,
            nodeId: null,
        },

        $form: null,
        loading: false,

        init: function()
        {
            this.$form = this.$target.closest('form');
        },

        click: function(e)
        {
            if (!this.options.href) {
                return;
            }

            e.preventDefault();

            if (this.loading) {
                return;
            }

            var draftHandler = XF.Element.getHandler(this.$form, 'draft');
            if (draftHandler) {
                draftHandler.triggerSave();
            }

            this.loading = true;

            var self = this;
            this.xhr = XF.ajax('post', this.options.href, { topic_id: '', draft_node_id: this.options.nodeId }, function (ret) {
                if (ret.status === 'ok') {
                    XF.setupHtmlInsert(ret.html, function($html, container, onComplete) {
                        self.$form.replaceWith($html);
                        XF.activate($html);
                    });
                }
            });
        }
    });

    XF.Click.register('th_topicClick', 'XF.THTopicClick');
    XF.Click.register('th_topicReset', 'XF.THTopicReset');
    XF.Click.register('th_topicChooser', 'XF.THTopicChooser');
}(jQuery, window, document);

if (document.readyState === 'complete') {
    themehouse.topics.topicChooser.init();
}

$(document).ready(themehouse.topics.topicChooser.init);

$(document.body).on('xf:layout', function () {
    themehouse.topics.topicChooser.init(); // quick thread
});

$( window ).resize(function() {
    themehouse.topics.topicChooser.checkCreateThreadBarOverflow();
});