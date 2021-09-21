
var themehouse = themehouse || {};

themehouse.topics = themehouse.topics || {};

themehouse.topics.getActiveForums = function(ele) {
    var container = (typeof (ele) === 'undefined') ? $(document) : ele.closest('.topic-filter-container');
    var nodeIds = [];
    var changeMade = false;

    var activeItems = container.find('.topic-filter-item--active:not(.isCategory).topic-filter-item--node');
    for (var i = 0, len = activeItems.length; i < len; i++) {
        var currentItem = $(activeItems[i]);
        var currentNodeId = currentItem.data('topic-id');
        if (nodeIds.indexOf(currentNodeId) === -1) {
            nodeIds.push(currentNodeId);
            if (themehouse.topics.lastSearchedForums.indexOf(currentNodeId) === -1) {
                changeMade = true;
            }
        }
    }

    if (themehouse.topics.lastSearchedForums.length !== nodeIds.length) {
        changeMade = true;
    }

    themehouse.topics.lastSearchedForums = nodeIds;

    return ({
        changeMade: changeMade,
        nodeIds: nodeIds,
    });
}

themehouse.topics.getActiveTopics = function(ele) {
    var container = (typeof (ele) === 'undefined') ? $(document) : ele.closest('.topic-filter-container');
    var topicIds = [];
    var changeMade = false;

    var activeItems = container.find('.topic-filter-item--active.topic-filter-item--thread');
    for (var i = 0, len = activeItems.length; i < len; i++) {
        var currentItem = $(activeItems[i]);
        var currentTopicId = currentItem.data('topic-id');
        if (topicIds.indexOf(currentTopicId) === -1) {
            topicIds.push(currentTopicId);
            if (themehouse.topics.lastSearchedTopics.indexOf(currentTopicId) === -1) {
                changeMade = true;
            }
        }
    }

    if (themehouse.topics.lastSearchedTopics.length !== topicIds.length) {
        changeMade = true;
    }

    themehouse.topics.lastSearchedTopics = topicIds;

    return ({
        changeMade: changeMade,
        topicIds: topicIds,
    });
}

themehouse.topics.fetchThreads = function(ele) {
    var $filterMenu;
    var $filterBarTrigger = $('.filterBar-menuTrigger');
    if (filterMenuId = $filterBarTrigger.attr('aria-controls')) {
        $filterMenu = $('#' + filterMenuId);
    } else {
        $filterMenu = $filterBarTrigger.siblings('[data-menu=menu]');
    }
    if (!$filterMenu.length) {
        return false;
    }
    $form = $filterMenu.find('form');

    var forumData = themehouse.topics.getActiveForums(ele);
    var nodeIds = forumData.nodeIds;

    var forumClearAlls = $('.th_topics__clearTopics__wrapper[data-topic-type=node]');
    if (forumClearAlls.length) {
        if (nodeIds.length >= 2) {
            forumClearAlls.addClass('thTopics__filterBar--activeFilter')
        } else {
            forumClearAlls.removeClass('thTopics__filterBar--activeFilter')
        }
    }

    var topicData = themehouse.topics.getActiveTopics(ele);
    var topicIds = topicData.topicIds;

    var topicClearAlls = $('.th_topics__clearTopics__wrapper[data-topic-type=thread]');
    if (topicClearAlls.length) {
        if (topicIds.length >= 2) {
            topicClearAlls.addClass('thTopics__filterBar--activeFilter')
        } else {
            topicClearAlls.removeClass('thTopics__filterBar--activeFilter')
        }
    }

    var changeMade = topicData.changeMade || forumData.changeMade;

    if (changeMade) {
        $filterBar = $filterBarTrigger.closest('.block-filterBar');
        $container = $filterBar.closest('.block-container');
        $container.siblings('.block-outer.block-outer--after').empty();
        $container.children(':not(.block-filterBar)').empty();
        $container.siblings('.block-outer:not(.block-outer--after)').css('visibility', 'hidden');
        if (this.xhr) {
            this.xhr.abort();
        }
        if ($form.length) {
            themehouse.topics.submitFilterForm($form, topicIds, nodeIds);
        }

        var href = $filterMenu.data('href');
        this.xhr = XF.ajax('get', href, {}, function (ret) {
            if (ret.status === 'ok') {
                var $form = $(ret.html.content).filter('form');
                themehouse.topics.submitFilterForm($form, topicIds, nodeIds);
            }
        });
    }
    return true;
}

themehouse.topics.submitFilterForm = function($form, topicIds, nodeIds) {
    var href = $form.attr('action');
    var formData = XF.getDefaultFormData($form);
    formData.append('topics', topicIds.join(','));
    formData.append('forums', nodeIds.join(','));

    var self = this;
    this.xhr = XF.ajax('post', href, formData, function (ret) {
        if (ret.redirect) {
            var href = ret.redirect;
            self.xhr = XF.ajax('post', href, {
                topics: topicIds.join(','),
                forums: nodeIds.join(','),
            }, function (ret) {
                if (ret.redirect) {
                    // do nothing
                } else {
                    if (ret.status === 'ok') {
                        themehouse.topics.setupHtmlInsert(ret, $container);
                        window.history.pushState(null, null, href);
                    }
                }
                return false;
            });
        } else {
            if (ret.status === 'ok') {
                themehouse.topics.setupHtmlInsert(ret, $filterBar);
                if (typeof (ret.href) !== 'undefined') {
                    themehouse.topics.pushState(ret, topicIds);
                }
            }
        }
        return false;
    }, {
        skipDefaultSuccess: true
    });
}

themehouse.topics.setupHtmlInsert = function(ret, $container) {
    XF.setupHtmlInsert(ret.html, function () {
        var $itemContent = $(ret.html.content);
        var $filterBarTrigger = $itemContent.find('.filterBar-menuTrigger');
        var $replaceContent = $filterBarTrigger.closest('.block');
        $container.closest('.block').replaceWith($replaceContent);
        XF.activate($replaceContent);
        themehouse.topics.initItemClicks();
    });
}

themehouse.topics.pushState = function(ret, topicIds) {
    if (topicIds.length === 0) {
        var href = ret.href;
        var splitHref = ret.href.split('&');
        if (splitHref.length === 2) {
            href = splitHref[0];
        }
        window.history.pushState(null, null, href);
    } else {
        window.history.pushState(null, null, ret.href);
    }
}

themehouse.topics.checkCategories = function() {
    $('.topic-filter-container .topic-filter-item.isCategory').each(function() {
        var $categoryFilterItem = $(this);
        var nodeId = $categoryFilterItem.data('topic-id');
        var $forums = $('.topic-filter-container .topic-filter-item:not(.isCategory)[data-parent-topic-id="' + nodeId + '"]');
        if ($forums.length) {
            if (themehouse.topics.isForumChildrenActive(nodeId)) {
                themehouse.topics.makeCategoryActive(nodeId);
            } else {
                themehouse.topics.makeCategoryInactive(nodeId);
            }
        }
    });
}

themehouse.topics.makeCategoryActive = function(nodeId) {
    $('.topic-filter-container .topic-filter-item.isCategory[data-topic-id="' + nodeId + '"]').addClass('topic-filter-item--active');
    var parentNodeId = $('.topic-filter-container .topic-filter-item.isCategory[data-topic-id="' + nodeId + '"]').data('parent-topic-id');
    if (parentNodeId) {
        if (themehouse.topics.isForumChildrenActive(parentNodeId)) {
            themehouse.topics.makeCategoryActive(parentNodeId);
        }
    }
}

themehouse.topics.makeCategoryInactive = function(nodeId) {
    $('.topic-filter-container .topic-filter-item.isCategory[data-topic-id="' + nodeId + '"]').removeClass('topic-filter-item--active');
    var parentNodeId = $('.topic-filter-container .topic-filter-item.isCategory[data-topic-id="' + nodeId + '"]').data('parent-topic-id');
    if (parentNodeId) {
        themehouse.topics.makeCategoryInactive(parentNodeId);
    }
}

themehouse.topics.isForumChildrenActive = function(parentNodeId) {
    var $nodes = $('.topic-filter-container .topic-filter-item:not(.isCategory)[data-parent-topic-id="' + parentNodeId + '"]');
    var $activeNodes = $('.topic-filter-container .topic-filter-item:not(.isCategory)[data-parent-topic-id="' + parentNodeId + '"].topic-filter-item--active');

    if ($nodes.length !== $activeNodes.length) {
        return false;
    }

    $nodes.each(function() {
        var $node = $(this);
        var nodeId = $node.data('topic-id');
        if (!themehouse.topics.isForumChildrenActive(nodeId)) {
            return false;
        }
    });

    return true;
}

themehouse.topics.nodeItemClick = function(e) {
    var targetEle = $(e.target);
    var $ele = targetEle.closest('.topic-filter-item');
    var nodeId = $ele.data('topic-id');
    var maxDepth = null;
    var $forumFilterContainer = targetEle.closest('.topic-filter-container');
    if ($forumFilterContainer.length) {
        maxDepth = $forumFilterContainer.data('max-depth');
    }

    if (!$ele.hasClass('isCategory') && $ele.hasClass('topic-filter-item--active')) {
        $('.topic-filter-container .topic-filter-item.topic-filter-item--node[data-topic-id="' + nodeId + '"], .block-filterBar .topic-filter-item.topic-filter-item--node[data-topic-id="' + nodeId + '"]').removeClass('topic-filter-item--active');
        if (maxDepth !== null && $ele.hasClass('thForum--depth-' + (maxDepth - 1))) {
            themehouse.topics.removeChildNodes(nodeId);
        }
    } else {
        if ($ele.hasClass('isCategory')  && $ele.hasClass('topic-filter-item--active')) {
            themehouse.topics.removeChildNodes(nodeId);
        } else {
            if (!$ele.hasClass('isCategory')) {
                $('.topic-filter-container .topic-filter-item.topic-filter-item--node[data-topic-id="' + nodeId + '"], .block-filterBar .topic-filter-item:not(.isCategory).topic-filter-item--node[data-topic-id="' + nodeId + '"]').addClass('topic-filter-item--active');
            }
            if ($ele.hasClass('isCategory') || (maxDepth !== null && $ele.hasClass('thForum--depth-' + (maxDepth - 1)))) {
                themehouse.topics.addChildNodes(nodeId);
            }
        }
    }

    themehouse.topics.checkCategories();
    if (themehouse.topics.fetchThreads()) {
        e.preventDefault();
        e.stopPropagation();
    }
}

themehouse.topics.removeChildNodes = function(parentNodeId) {
    var $nodes = $('.topic-filter-container .topic-filter-item.topic-filter-item--node[data-parent-topic-id="' + parentNodeId + '"]');

    var nodeIds = [];
    $nodes.each(function() {
        var $node = $(this);
        var nodeId = $node.data('topic-id');
        if (nodeIds.indexOf(nodeId) === -1) {
            nodeIds.push(nodeId);
        }
    });

    for (var i = 0, len = nodeIds.length; i < len; i++) {
        var nodeId = nodeIds[i];
        $('.topic-filter-container .topic-filter-item.topic-filter-item--node[data-topic-id="' + nodeId + '"], .block-filterBar .topic-filter-item.topic-filter-item--node[data-topic-id="' + nodeId + '"]').removeClass('topic-filter-item--active');
        themehouse.topics.removeChildNodes(nodeId);
    }
}

themehouse.topics.addChildNodes = function(parentNodeId) {
    var $nodes = $('.topic-filter-container .topic-filter-item.topic-filter-item--node[data-parent-topic-id="' + parentNodeId + '"]');

    var nodeIds = [];
    $nodes.each(function() {
        var $node = $(this);
        var nodeId = $node.data('topic-id');
        if (nodeIds.indexOf(nodeId) === -1) {
            nodeIds.push(nodeId);
        }
    });

    for (var i = 0, len = nodeIds.length; i < len; i++) {
        var nodeId = nodeIds[i];
        $('.topic-filter-container .topic-filter-item.topic-filter-item--node[data-topic-id="' + nodeId + '"], .block-filterBar .topic-filter-item:not(.isCategory).topic-filter-item--node[data-topic-id="' + nodeId + '"]').addClass('topic-filter-item--active');
        themehouse.topics.addChildNodes(nodeId);
    }
}

themehouse.topics.topicItemClick = function(e) {
    var targetEle = $(e.target);
    var ele = targetEle.closest('.topic-filter-item');
    var topicId = ele.data('topic-id');
    var protectedIds = [];
    var container = targetEle.closest('.topic-filter-container');
    var singleSelect = container.hasClass('topic-filter-disableMultiSelect');

    if (singleSelect) {
        var parentTopicId = ele.data('parent-topic-id');
        if (parentTopicId && protectedIds.indexOf(parentTopicId) === -1) {
            protectedIds.push(parentTopicId);
        }
    }

    if (ele.hasClass('topic-filter-item--active')) {
        $('.topic-filter-container .topic-filter-item.topic-filter-item--thread[data-parent-topic-id="' + topicId + '"]').removeClass('topic-filter-item--parentActive');
        if (singleSelect) {
            $('.topic-filter-container .topic-filter-item--active.topic-filter-item--thread, .block-filterBar .topic-filter-item--active.topic-filter-item--thread').removeClass('topic-filter-item--active');
        } else {
            $('.topic-filter-container .topic-filter-item--active.topic-filter-item--thread[data-topic-id="' + topicId + '"], .block-filterBar .topic-filter-item.topic-filter-item--active.topic-filter-item--thread[data-topic-id="' + topicId + '"]').removeClass('topic-filter-item--active');
        }
    } else {
        if (singleSelect) {
            $('.topic-filter-container .topic-filter-item--active.topic-filter-item--thread, .block-filterBar .topic-filter-item--active.topic-filter-item--thread').removeClass('topic-filter-item--active');
            $('.topic-filter-container .topic-filter-item--parentActive.topic-filter-item--thread').removeClass('topic-filter-item--parentActive');
        }

        $('.topic-filter-container .topic-filter-item.topic-filter-item--thread[data-topic-id="' + topicId + '"], .block-filterBar .topic-filter-item:not(.isCategory).topic-filter-item--thread[data-topic-id="' + topicId + '"]').addClass('topic-filter-item--active');
        $('.topic-filter-container .topic-filter-item.topic-filter-item--thread[data-parent-topic-id="' + topicId + '"]').addClass('topic-filter-item--parentActive');
    }

    for (var i = 0, len = protectedIds.length; i < len; i++) {
        var protectedId = protectedIds[i];
        $('.topic-filter-container .topic-filter-item.topic-filter-item--thread[data-topic-id="' + protectedId + '"], .block-filterBar .topic-filter-item:not(.isCategory).topic-filter-item--thread[data-topic-id="' + protectedId + '"]').addClass('topic-filter-item--active');
        $('.topic-filter-container .topic-filter-item.topic-filter-item--thread[data-parent-topic-id="' + protectedId + '"]').addClass('topic-filter-item--parentActive');
    }

    if (themehouse.topics.fetchThreads()) {
        e.preventDefault();
        e.stopPropagation();
    }
}

themehouse.topics.initItemClicks = function () {
    var nodeItems = $('.topic-filter-container .topic-filter-item.topic-filter-item--node, .block-filterBar .topic-filter-item.topic-filter-item--node');
    nodeItems.off('click');
    nodeItems.click(function (e) {
        themehouse.topics.nodeItemClick(e);
    });

    var topicItems = $('.topic-filter-container .topic-filter-item.topic-filter-item--thread, .block-filterBar .topic-filter-item.topic-filter-item--thread');
    topicItems.off('click');
    topicItems.click(function (e) {
        themehouse.topics.topicItemClick(e);
    });

    var threadForums = $('.structItem-topicsForumTitle a');
    threadForums.off('click');
    threadForums.click(function (e) {
        var ele = $(e.target);
        var nodeId = ele.data('topic-id');

        $('.topic-filter-container .topic-filter-item--active.topic-filter-item--node, .block-filterBar .topic-filter-item--active.topic-filter-item--node').removeClass('topic-filter-item--active');

        $('.topic-filter-container .topic-filter-item.topic-filter-item--node[data-topic-id="' + nodeId + '"], .block-filterBar .topic-filter-item:not(.isCategory).topic-filter-item--node[data-topic-id="' + nodeId + '"]').addClass('topic-filter-item--active');

        if (themehouse.topics.fetchThreads()) {
            e.preventDefault();
        }
        themehouse.topics.checkCategories();
    });

    var threadTopics = $('.structItem-topicList__inner .thTopic');
    threadTopics.off('click');
    threadTopics.click(function (e) {
        var ele = $(e.target).closest('.thTopic');
        var topicId = ele.data('topic-id');

        $('.topic-filter-container .topic-filter-item--active.topic-filter-item--thread, .block-filterBar .topic-filter-item--active.topic-filter-item--thread').removeClass('topic-filter-item--active');

        $('.topic-filter-container .topic-filter-item.topic-filter-item--thread[data-topic-id="' + topicId + '"], .block-filterBar .topic-filter-item:not(.isCategory).topic-filter-item--thread[data-topic-id="' + topicId + '"]').addClass('topic-filter-item--active');

        if (themehouse.topics.fetchThreads()) {
            e.preventDefault();
        }
    });

    var clearForums = $('[data-topic-type=node] .th_topics_clearTopics');
    clearForums.off('click');
    clearForums.click(function(e) {
        $('.topic-filter-container .topic-filter-item--active.topic-filter-item--node, .block-filterBar .topic-filter-item--active.topic-filter-item--node').removeClass('topic-filter-item--active');
        if (themehouse.topics.fetchThreads()) {
            e.preventDefault();
        }
        themehouse.topics.checkCategories();
    });

    var clearTopics = $('[data-topic-type=thread] .th_topics_clearTopics');
    clearTopics.off('click');
    clearTopics.click(function(e) {
        $('.topic-filter-container .topic-filter-item--active.topic-filter-item--thread, .block-filterBar .topic-filter-item--active.topic-filter-item--thread').removeClass('topic-filter-item--active');
        if (themehouse.topics.fetchThreads()) {
            e.preventDefault();
        }
        if (typeof (themehouse.topics.topicChooser) !== 'undefined') {
            themehouse.topics.topicChooser.unsetTopic();
        }
    });

    if (typeof (themehouse.topics.lastSearchedForums) === 'undefined') {
        themehouse.topics.lastSearchedForums = [];
        themehouse.topics.getActiveForums();
    }

    if (typeof (themehouse.topics.lastSearchedTopics) === 'undefined') {
        themehouse.topics.lastSearchedTopics = [];
        themehouse.topics.getActiveTopics();
    }
}

themehouse.topics.initWidgets = function () {
    var $threadWidgets = $('[data-widget-definition=thtopics_thread_filter]');
    $threadWidgets.each(function() {
        var $threadWidget = $(this);
        var topicType = $threadWidget.data('topicType');
        var $filters = $('.filterBar-filters .topic-filter-item[data-topic-type=' + topicType + ']');
        if (!$filters.length) {
            return;
        }
        var sideWidget = ($threadWidget.closest('.p-body-sidebar').length || $threadWidget.closest('.p-body-sideNav').length);
        if (sideWidget && !$threadWidget.data('style') || $threadWidget.data('style') === 'simple_vertical') {
            $threadWidget.addClass('block').addClass('topic-filter-simple');
            $threadWidget.find('.topic-filter-container').addClass('block-container');
            $threadWidget.find('.topic-filter-body').addClass('block-body');
            $threadWidget.find('.topic-filter-footer').addClass('block-footer');
            $threadWidget.find('.topic-filter-item').addClass('block-row');
            $('html').addClass('has-simpleverticaltopics');
        } else {
            $threadWidget.addClass('block');
            $threadWidget.find('.topic-filter-container').addClass('topic-filter-scroller');
            $body = $threadWidget.find('.topic-filter-body');
            $body.addClass('hScroller').attr('data-xf-init', 'h-scroller');
            $body.children('div').addClass('hScroller-scroll');
            $('html').addClass('has-horizontalscrollertopics');
            XF.activate($body);
        }
        var $threadTopics = $threadWidget.find('.topic-filter-item');
        $threadTopics.each(function() {
            var $threadTopic = $(this);
            var topicId = $threadTopic.data('topicId');
            var $filter = $filters.filter('[data-topic-id=' + topicId + ']');
            if ($filter.length) {
                $threadTopic.addClass($filter.attr("class"));
                var title = $filter.text().trim();
                $threadTopic.find('.thTopic--title').text(title);
                $threadTopic.css('display', '');
            } else {
                $threadTopic.remove();
            }
        });
        $threadWidget.show();
    });
}

themehouse.topics.initAll = function () {

    themehouse.topics.initWidgets();
    themehouse.topics.initItemClicks();
    themehouse.topics.checkCategories();

    var docEle = $(document);
    docEle.off('xf:layout');
    docEle.on('xf:layout', function() {
        var overlayTopics = $('.overlay-container.is-active .thTopicList');
        if (overlayTopics.length) {
            themehouse.topics.initAll();
        }
    });
};

if (document.readyState === 'complete') {
    themehouse.topics.initAll();
}

$(document).ready(themehouse.topics.initAll);