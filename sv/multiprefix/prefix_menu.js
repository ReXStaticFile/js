var SV = window.SV || {};
SV.MultiPrefix = SV.MultiPrefix || {};

// noinspection JSUnusedLocalSymbols
(function ($, window, document, _undefined)
{
    "use strict";

    $.extend(SV.MultiPrefix, {
        svMultiPrefixCounter: 1
    });

    $.fn.extend({
        multiPrefixSelectorUniqueId: function ()
        {
            var id = this.attr('id');
            if (!id)
            {
                id = 'js-SVMultiPrefixUniqueId' + SV.MultiPrefix.svMultiPrefixCounter;
                this.attr('id', id);
                this.attr('data-sv-multiprefix-unique', SV.MultiPrefix.svMultiPrefixCounter);
                SV.MultiPrefix.svMultiPrefixCounter++;
            }

            return id;
        }
    });

    SV.MultiPrefix.PrefixMenu = XF.Element.newHandler({
        options: {
            realInput: null
        },

        hiddenTarget: null,
        onChangeHack: null,
        init: function ()
        {
            var $input = this.$target;

            this.template = this.$target.parent().find('script[type="text/template"]').html();
            if (!this.template)
            {
                console.error('No prefix template could be found');
                this.template = '';
            }

            $input.on('config-update', $.proxy(this, 'initSelect2'));
            $input.on('select2:unselecting', function (e)
            {
                XF.MenuWatcher.preventDocClick();
            });
            $input.on('select2:unselect', function (e)
            {
                setTimeout(function ()
                {
                    XF.MenuWatcher.allowDocClick();
                }, 0);
            });

            var $overlay = $input.closest('.overlay-container');
            if ($overlay.length)
            {
                $overlay.on('overlay:hiding', function ()
                {
                    $input.select2('close');
                });
            }

            $input.trigger('config-update');
        },

        loadPrefixes: function ($input)
        {
            var prefixes = [];
            $input.find('option').each(function ()
            {
                var $opt = $(this);

                prefixes[$opt.attr('value')] = {
                    prefix_id: $opt.attr('value'),
                    title: $opt.text(),
                    css_class: $opt.attr('data-prefix-class')
                };
            });
            this.prefixes = prefixes;
        },

        initSelect2: function ()
        {
            var $input = this.$target;

            var config = {
                width: '100%',
                minimumSelectionLength: parseInt($input.data('min-tokens'), 10),
                maximumSelectionLength: parseInt($input.data('max-tokens'), 10),
                containerCssClass: 'input prefix--title',
                selectOnClose: false,
                placeholder: XF.phrase('sv_prefix_placeholder', null, "Prefix..."),
                disabled: $input.prop('disabled'),
                templateResult: $.proxy(this, 'renderPrefix'),
                templateSelection: $.proxy(this, 'renderPrefix'),
                dropdownParent: $input.parent(),
                debug: false
            };

            var values = $input.val();
            if (typeof values === 'string')
            {
                values = null; // single
            }
            var maxTokens = config.maximumSelectionLength;
            var tooManyItems = values && maxTokens && values.length > maxTokens;

            var fauxSingleMode = false;
            var $nonOption = $input.find('option[value="0"]');
            if (!tooManyItems && maxTokens === 1)
            {
                config.minimumSelectionLength = undefined;
                config.maximumSelectionLength = undefined;
                if (!$nonOption.length)
                {
                    $input.prepend($('<option value="0" data-prefix-class="label" />').text(XF.phrase('sv_multiprefix_none', null, "(None)")));
                }
                fauxSingleMode = true;

                // select2 behaves very differently for multi-mode vs single mode,
                // multi-mode doesn't allow single click switching, by storing in a hidden variable we can clear the select2 without clearing the text label, emulating this.
                var hiddenName = $input.attr('name');
                $input.attr('name', hiddenName + '_original');
                this.hiddenTarget = $('<input>').attr({
                    type: 'hidden',
                    name: hiddenName,
                    id: $input.attr('id') + '_hidden',
                }).insertAfter($input);
            }
            else
            {
                $nonOption.remove();
                $input.attr('multiple', 'multiple');
            }

            this.loadPrefixes($input);

            var addElements = true;
            $input.multiPrefixSelectorUniqueId();
            if ($input.data('select2'))
            {
                $input.select2('destroy');
            }
            var $element = $input.select2(config);

            if (this.onChangeHack)
            {
                $element.off('change', this.onChangeHack);
                this.onChangeHack = null;
            }
            if (fauxSingleMode)
            {
                // hack to allow single-select behaviour with multi-select UI
                var $hiddenTarget = this.hiddenTarget;
                this.onChangeHack = function (e) {
                    $hiddenTarget.val($element.val()).trigger('select2:select');
                    $hiddenTarget.trigger('change', e);
                    $element.val("");
                };
                $element.on('change', this.onChangeHack);
                this.onChangeHack();

                var api = $element.data('select2');
                this.$container = api.$container;
                this.$selection = api.$selection;

                api.on('results:message', function (params)
                {
                    this.dropdown._resizeDropdown();
                    this.dropdown._positionDropdown();
                });

                var autoFocus = $input.attr('autofocus');
                if (autoFocus)
                {
                    $element.select2('open');
                    api.$selection.addClass('is-focused');
                }

                var $overlay = $element.closest('.overlay-container');
                if ($overlay.length)
                {
                    $overlay.on('overlay:hiding', function ()
                    {
                        $element.select2('close');
                    });
                }
            }

            // signal too many items are selected
            if (tooManyItems)
            {
                $('.select2-search__field').click();
            }
        },

        renderPrefix: function (state)
        {
            if (!state.id || this.template === '')
            {
                return state.text;
            }

            return $(Mustache.render(this.template, {rich_prefix: this.prefixes[state.id]}));
        },
    });

    SV.MultiPrefix.PrefixLoader = XF.Element.newHandler({
        options: {
            listenTo: '',
            initUpdate: true,
            href: '',
            uniqueId: ''
        },

        init: function ()
        {
            if (!this.$target.is('select'))
            {
                console.error('Must trigger on select');
                return;
            }

            this.options.uniqueId = this.$target.multiPrefixSelectorUniqueId();

            if (this.options.href)
            {
                var $listenTo = this.options.listenTo ? XF.findRelativeIf(this.options.listenTo, this.$target) : $([]);
                if (!$listenTo.length)
                {
                    console.error('Cannot load prefixes dynamically as no element set to listen to for changes');
                }
                else
                {
                    $listenTo.on('change', $.proxy(this, 'loadPrefixes'));

                    if (this.options.initUpdate)
                    {
                        $listenTo.trigger('change');
                    }
                }
            }
        },

        loadPrefixes: function (e)
        {
            XF.ajax('POST', this.options.href, {
                val: $(e.target).val()
            }, $.proxy(this, 'loadSuccess'));
        },

        loadSuccess: function (data)
        {
            if (data.html)
            {
                var val;
                //TODO: need to find a way to get this work in a non-hackish way
                var id = 'js-SVMultiPrefixUniqueId' + (parseInt(this.$target.attr('data-sv-multiprefix-unique'), 10));
                var $select = $('#' + id);
                var $hiddenInput = $('#' + id + '_hidden');
                if ($hiddenInput.length)
                {
                    if ($select.data('select2'))
                    {
                        $select.select2('destroy');
                    }

                    // undo the faux single mode
                    $select.val($hiddenInput.val().split(','));
                    $select.attr('name', $hiddenInput.attr('name'));
                    $hiddenInput.remove();
                }
                val = $select.val();
                if (typeof val === 'string')
                {
                    val = [val];
                }

                XF.setupHtmlInsert(data.html, function ($html)
                {
                    $html.each(function ()
                    {
                        var $el = $(this).find('select');
                        if ($el.length)
                        {
                            $select.empty().append($el.children());
                            if (val)
                            {
                                $.each(val, function (index, value)
                                {
                                    $select.find('option[value="' + value + '"]').prop('selected', true);
                                });
                            }
                            else
                            {
                                $select.find('option').first().prop('checked', true);
                            }

                            var minTokens = $el.data('min-tokens'),
                                maxTokens = $el.data('max-tokens');

                            $select.data('min-tokens', minTokens)
                                .attr('data-max-tokens', maxTokens)
                                .data('max-tokens', maxTokens)
                                .attr('data-min-tokens', minTokens);

                            if ($select.find('option:selected').length > maxTokens)
                            {
                                // remove prefixes than allowed?
                            }

                            $select.trigger('config-update');

                            return false;
                        }
                    });
                    $html.empty();
                });
            }
        }
    });

    if (XF.QuickThread)
    {
        XF.Element.extend('quick-thread', {
            __backup: {
                'reset': 'svMultiPrefix_reset'
            },

            reset: function (e, onComplete)
            {
                $('select[name="prefix_id[]"]').val('').trigger('change');
                // noinspection Annotator
                this.svMultiPrefix_reset(e, onComplete);
            }
        });
    }

    XF.Element.register('sv-multi-prefix-loader', 'SV.MultiPrefix.PrefixLoader');
    XF.Element.register('sv-multi-prefix-menu', 'SV.MultiPrefix.PrefixMenu');
}(jQuery, window, document));