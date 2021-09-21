var themehouse = themehouse || {};

themehouse.topics = themehouse.topics || {};

themehouse.topics.threadList = function() {
    var items = [];
    var eles = $('.structItem-topicList');
    for (var i = 0, len = eles.length; i < len; i++) {
        var ele = $(eles[i]);
        var innerEle = ele.find('.structItem-topicList__inner');
        if (innerEle.length) {
            innerEle.removeClass('th_topics__threadWrap--overflowing');
            items.push({
                ele: ele,
                innerEle: innerEle,
                width: ele.width(),
                innerWidth: innerEle.width(),
            });
        }
    }

    for (var i = 0, len = items.length; i < len; i++) {
        var item = items[i];
        if (item.innerWidth > item.width) {
            item.ele.addClass('th_topics__threadWrap--overflowing');
        }

        (function (ele) {
            ele.hover(function () {
                clearTimeout(themehouse.topics.threadListTimeout);
                themehouse.topics.threadListTimeout = setTimeout(function () {
                    ele.addClass('structItem-topicList__inner--showOverflow');
                }, 200);
            }, function () {
                clearTimeout(themehouse.topics.threadListTimeout);
                ele.removeClass('structItem-topicList__inner--showOverflow');
            });
        })(item.innerEle);
        item.innerEle.css('max-width', item.width + 'px');   
    }

    $('html').addClass('th_topics_threadListInit');
}

$(document).ready(function() {
    themehouse.topics.threadList();
});

$(document).on("ajax:complete", function () {
    themehouse.topics.threadList();
    window.setTimeout(function() {
        themehouse.topics.threadList();
    }, 1000);
});

$(window).on('resize', function(){
    themehouse.topics.threadList();
});