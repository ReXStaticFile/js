$(function () {
    var th_topicsPageX = null;
    var th_topicsPageY = null;
    var th_topicsDragEle = null;

    $('body').on('mouseup', function (e) {
        th_topicsPageX = e.pageX - window.pageXOffset;
        th_topicsPageY = e.pageY - window.pageYOffset;
    });

    $('body').on('mousedown', function (e) {
        var ele = $(e.target);
        if (ele.hasClass('dd-item')) {
            th_topicsDragEle = ele;
        } else if (ele.closest('.dd-item').length) {
            th_topicsDragEle = ele.closest('.dd-item')
        } else {
            th_topicsDragEle = null;
        }
    });

    var th_topicsNestableSelector = $('.dd');
    var th_topicsInitNestable = function() {
        th_topicsNestableSelector.nestable({
            maxDepth: 2,
        }).off('change');
        th_topicsNestableSelector.nestable({
            maxDepth: 2,
        }).on('change', th_topicsUpdate);
    }

    var th_topicsUpdate = function(e) {
        if (typeof (e) !== 'undefined') {
            var upElement = $(document.elementFromPoint(th_topicsPageX, th_topicsPageY));
            var removeEle = false;
            if (upElement.length) {
                if (!upElement.hasClass('dd') && upElement.closest('.dd').length === 0) {
                    removeEle = true;
                }
            }

            if (removeEle && th_topicsDragEle !== null) {
                th_topicsDragEle.remove();
                th_topicsInitNestable();
            }
        }

        $('#value').val(JSON.stringify(th_topicsNestableSelector.nestable('serialize')));

        th_topicsRecount();
        $(window).trigger('resize');
    }

    var th_topicsRecount = function() {
        var widgetLimits = $('.topicsLayout').data('widget-limits') + '';
        var widgetLimitsArray = widgetLimits.split(',');
        var widgetLimitsArrayLength = widgetLimitsArray.length;

        var count = 0;
        $('.topicsLayout li').each(function() {
            count++;

            if (count === (parseInt($('input[name=options\\[thtopics_visibleFilterTopics\\]]').val()) + 1)) {
                $(this).addClass('topicsLayout--visibleFilterTopics');
            } else {
                if ($(this).hasClass('topicsLayout--visibleFilterTopics')) {
                    $(this).removeClass('topicsLayout--visibleFilterTopics');
                }
            }
            if (count === (parseInt($('input[name=options\\[thtopics_visibleFilterTopicsVertical\\]]').val()) + 1)) {
                $(this).addClass('topicsLayout--visibleFilterTopicsVertical');
            } else {
                if ($(this).hasClass('topicsLayout--visibleFilterTopicsVertical')) {
                    $(this).removeClass('topicsLayout--visibleFilterTopicsVertical');
                }
            }
            for (var i = 0; i < widgetLimitsArrayLength; i++) {
                if (count === (parseInt(widgetLimitsArray[i]) + 1)
                        && parseInt(widgetLimitsArray[i]) < parseInt($('input[name=options\\[thtopics_visibleFilterTopicsVertical\\]]').val())) {
                    $(this).addClass('topicsLayout--visibleFilterTopicsWidget');
                } else {
                    if ($(this).hasClass('topicsLayout--visibleFilterTopicsWidget')) {
                        $(this).removeClass('topicsLayout--visibleFilterTopicsWidget');
                    }
                }
            }
        });
    }

    var th_topicsInitRemovers = function() {
        $('.dd-list .dd-remove').click(function(e) {
            var $ele = $(e.target.closest('.dd-item'));
            $ele.remove();
            th_topicsInitNestable();
            th_topicsUpdate();
        });
    }

    $('.suspenser-list .dd-item span').click(function(e) {
        var clone = $(e.target.closest('.dd-item')).clone();
        clone.find('.fa').toggleClass('fa-plus fa-bars');
        clone.append($('<i class="fa fa-remove dd-remove"></i>'));
        th_topicsNestableSelector.find('> .dd-list').append(clone);
        window.setTimeout(function() {
            th_topicsInitRemovers();
            th_topicsInitNestable();
            th_topicsUpdate();
        }, 0)
    });

    $('input[name=options\\[thtopics_visibleFilterTopics\\]]').change(function() {
        th_topicsRecount();
    });

    $('input[name=options\\[thtopics_visibleFilterTopicsVertical\\]]').change(function() {
        th_topicsRecount();
    });

    th_topicsInitRemovers();
    th_topicsInitNestable();
    th_topicsRecount();
});
