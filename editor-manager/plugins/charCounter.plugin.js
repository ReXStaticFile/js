/*!
 * froala_editor v3.2.3 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2020 Froala Labs
 * Modified to support Word Counter, 2020 Lukas Wieditz
 */

! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(require("froala-editor")) : "function" == typeof define && define.amd ? define(["froala-editor"], e) : e(t.FroalaEditor)
}(this, function(i) {
    "use strict";
    i = i && i.hasOwnProperty("default") ? i["default"] : i, Object.assign(i.DEFAULTS, {
        charCounterMax: -1,
        charCounterCount: !0,
        charCounterMode: 'letter'
    }), i.PLUGINS.charCounter = function(n) {
        var r, e = n.$,
            o = function o() {
                return (n.el.textContent || "").replace(/\u200B/g, "").length
            }, functions = {
                'letter': function () {
                    return (n.el.textContent || "").replace(/\u200B/g, "").length
                },
                'word': function () {
                    return n.el.textContent ? n.el.textContent.trim().replace(/\u200B/g, "").split(/\s+/).length : 0;
                }
            }

        function t(t) {
            if (n.opts.charCounterMax < 0) return !0;
            if (o() < n.opts.charCounterMax) return !0;
            var e = t.which;
            return !(!n.keys.ctrlKey(t) && n.keys.isCharacter(e) || e === i.KEYCODE.IME) || (t.preventDefault(), t.stopPropagation(), n.events.trigger("charCounter.exceeded"), !1)
        }

        function a(t) {
            return n.opts.charCounterMax < 0 ? t : e("<div>").html(t).text().length + o() <= n.opts.charCounterMax ? t : (n.events.trigger("charCounter.exceeded"), "")
        }

        function c() {
            if (n.opts.charCounterCount) {
                var t = functions[n.opts.charCounterMode]() + (0 < n.opts.charCounterMax ? "/" + n.opts.charCounterMax : "");
                r.text("".concat(n.language.translate(n.opts.charCounterMode === 'letter' ? "Characters" : "Words"), ": ").concat(t)), n.opts.toolbarBottom && r.css("margin-bottom", n.$tb.outerHeight(!0));
                var e = n.$wp.get(0).offsetWidth - n.$wp.get(0).clientWidth;
                0 <= e && ("rtl" == n.opts.direction ? r.css("margin-left", e) : r.css("margin-right", e))
            }
        }

        return {
            _init: function u() {
                return !!n.$wp && !!n.opts.charCounterCount && ((r = e(document.createElement("span")).attr("class", "fr-counter")).css("bottom", n.$wp.css("border-bottom-width")), n.$second_tb && n.$second_tb.append(r), n.events.on("keydown", t, !0), n.events.on("paste.afterCleanup", a), n.events.on("keyup contentChanged input", function() {
                    n.events.trigger("charCounter.update")
                }), n.events.on("charCounter.update", c), n.events.trigger("charCounter.update"), void n.events.on("destroy", function() {
                    e(n.o_win).off("resize.char".concat(n.id)), r.removeData().remove(), r = null
                }))
            },
            count: o
        }
    }
});