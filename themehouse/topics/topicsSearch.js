var themehouse = themehouse || {};

themehouse.topics = themehouse.topics || {};

themehouse.topics.activateFilter = function () {
        $('.th_topicsSearch input').off('keyup');
        $('.th_topicsSearch input').on('keyup', function (e) {
            themehouse.topics.topicFilter(e);
        });

        $form = $('.th_topicsSearch').closest('form');
        $form.on('ajax-submit:before', function(e, data) {
            $form = $(e.target);
            $topicFilter = $form.find('.th_topicsSearch input');
            if ($topicFilter.is(":focus")) {
                data.preventSubmit = true;
            }
        });
    };
    
themehouse.topics.topicFilter = function (e) {
    var parent = $(e.target).closest('.formRow--thTopics, .th_topics, .th_topicList');
    var ele = parent.find('.th_topicsSearch input');
    var value = ele.val().toLowerCase();
    if (value.length !== 0) {
        parent.addClass('th_topicsSearch--filtered');
    } else if (parent.hasClass('th_topicsSearch--filtered')) {
        parent.removeClass('th_topicsSearch--filtered');
    }

    var changes = [];
    var visibleTitles = 0;

    var topics = parent.find('.topic-filter-item');
    for (var i = 0, len = topics.length; i < len; i++) {
        var topic = $(topics[i]);
        var title = topic.data('topic-title').toLowerCase();
        if (title.indexOf(value) !== -1) {
            if (!topic.hasClass('topic-filter-item--hide')) {
                visibleTitles++;
                if (topic.hasClass('th_topicsSearch--hide')) {
                    changes.push({
                        ele: topic,
                        change: 'remove',
                    });
                }
            }
        } else {
            if (!topic.hasClass('th_topicsSearch--hide')) {
                changes.push({
                    ele: topic,
                    change: 'add',
                });
            }
        }
    }

    var forums = parent.find('.forum-filter-item');
    for (var i = 0, len = forums.length; i < len; i++) {
        var forum = $(forums[i]);
        var title = forum.data('forum-title').toLowerCase();
        if (title.indexOf(value) !== -1) {
            if (!forum.hasClass('forum-filter-item--hide')) {
                visibleTitles++;
                if (forum.hasClass('th_topicsSearch--hide')) {
                    changes.push({
                        ele: forum,
                        change: 'remove',
                    });
                }
            }
        } else {
            if (!forum.hasClass('th_topicsSearch--hide')) {
                changes.push({
                    ele: forum,
                    change: 'add',
                });
            }
        }
    }

    for (var i = 0, len = changes.length; i < len; i++) {
        var change = changes[i];
        if (change.change === 'add') {
            change.ele.addClass('th_topicsSearch--hide');
        } else if (change.change === 'remove') {
            change.ele.removeClass('th_topicsSearch--hide');
        }
    }

    if (visibleTitles === 0) {
        parent.addClass('th_topics--noResults');
    } else {
        parent.removeClass('th_topics--noResults');
    }
};

if (document.readyState === 'complete') {
    themehouse.topics.activateFilter();
}

$(document).ready(themehouse.topics.activateFilter());

$(document.body).on('xf:layout', function () {
    themehouse.topics.activateFilter();
});