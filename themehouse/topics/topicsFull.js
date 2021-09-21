var themehouse = themehouse || {};

themehouse.topics = themehouse.topics || {};

themehouse.topics.initFull = function () {
    var fullItems = $(".thTopicList .thTopic--full");
    fullItems.off('click');
    fullItems.click(function (e) {
        var target = $(e.target);
        if (target.length && target[0].tagName.toLowerCase() !== 'a') {
            var wrapper = target.closest(".thTopic__outer");
            if (wrapper.length) {
                var anchor = wrapper.find("a:not([data-xf-click=overlay])");
                var checkbox = wrapper.find("input[type=checkbox]");
                if (checkbox.length) {
                    if (target[0].tagName.toLowerCase() !== 'i') {
                        wrapper.find("input[type=checkbox]").click();
                    }
                } else {
                    if (anchor.length && anchor.attr('href').length) {
                        if (target[0].tagName.toLowerCase() !== 'a' && target[0].tagName.toLowerCase() !== 'i') {
                            window.location = anchor.attr('href');
                        }
                    }
                }
            }
        }
    });
};

if (document.readyState === 'complete') {
    themehouse.topics.initFull();
}

$(document).ready(themehouse.topics.initFull);