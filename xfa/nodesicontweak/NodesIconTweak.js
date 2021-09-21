!function($, window, document, _undefined)
{
    "use strict";

    XF.Element.extend('number-box', {
        __backup: {
            'step': '_step'
        },

        step: function(dir)
        {
            this._step(dir);

            if (this.$target.parents().hasClass('fa_icon1'))
            {
                XFANodesIconTweak_updateFAIcon1Preview();
            }
            else if (this.$target.parents().hasClass('fa_icon1'))
            {
                XFANodesIconTweak_updateFAIcon2Preview();
            }
            else if (this.$target.parents().hasClass('srv_icon1'))
            {
                XFANodesIconTweak_updateSrvIconPreview('srv_icon1');
            }
            else if (this.$target.parents().hasClass('srv_icon2'))
            {
                XFANodesIconTweak_updateSrvIconPreview('srv_icon2');
            }
            else if (this.$target.parents().hasClass('sprite_icon1'))
            {
                XFANodesIconTweak_updateSpriteIconPreview('sprite_icon1');
            }
            else if (this.$target.parents().hasClass('sprite_icon2'))
            {
                XFANodesIconTweak_updateSpriteIconPreview('sprite_icon2');
            }
        }
    });

    // Perform initializations for icon1
    XFANodesIconTweak_initFA('fa_icon1', XFANodesIconTweak_updateFAIcon1Preview);
    XFANodesIconTweak_initSRV('srv_icon1');
    XFANodesIconTweak_initSprite('sprite_icon1');

    // Perform the same for Icon2 if necessary
    if ($("input[name='fa_icon2[layer_down]']").length)
    {
        XFANodesIconTweak_initFA('fa_icon2', XFANodesIconTweak_updateFAIcon2Preview);
        XFANodesIconTweak_initSRV('srv_icon2');
        XFANodesIconTweak_initSprite('sprite_icon2');
    }

    // CUI is specific as we have json load stuff
    //XFANodesIconTweak_initCUI();

    // Initalize type change handler
    XFANodesIconTweak_initTypeChangeHandler();
}
(jQuery, window, document);

// Initialisation of the FA part
function XFANodesIconTweak_initFA(name, callback)
{
    // Add on change event to transformation/animation selects and size input
    $('#' + name + '_layer_down_transform').change(callback);
    $('#' + name + '_layer_down_animate').change(callback);
    $('#' + name + '_layer_up_transform').change(callback);
    $('#' + name + '_layer_up_animate').change(callback);

    // Update preview FA
    window[callback];
}

// Initializion of the SRV part
function XFANodesIconTweak_initSRV(iType)
{
    // Handle the normal size icon
    $('#' + iType + '_list_srv > .nitIcon').on('click', function () {
        /* Get selected icon value and assign it to value */
        selectedIcon = $(this).attr('data-value');
        $('input[name="' + iType + '[icon]"]').val(selectedIcon);

        /* Set it as selected and deselect others */
        $('#' + iType + '_list_srv > .nitIcon.selected').removeClass('selected');
        $(this).addClass('selected');

        XFANodesIconTweak_updateSrvIconPreview(iType);
    });

    // Handle the small size icon
    $('#' + iType + '_small_list_srv > .nitIcon').on('click', function () {
        /* Get selected icon value and assign it to value */
        selectedIcon = $(this).attr('data-value');
        $('input[name="' + iType + '[small_icon]"]').val(selectedIcon);

        /* Set it as selected and deselect others */
        $('#' + iType + '_small_list_srv > .nitIcon.selected').removeClass('selected');
        $(this).addClass('selected');

        XFANodesIconTweak_updateSrvIconPreview(iType);
    });

    // Update preview SRV
    if ($('input[name="' + iType + '[icon]"]').val() || $('input[name="' + iType + '[small_icon]"]').val())
    {
        XFANodesIconTweak_updateSrvIconPreview(iType);
    }
}

// Initialization of the Sprite part
function XFANodesIconTweak_initSprite(iType)
{
    // Add on change event to all form elements for sprite
    $('input[name="' + iType + '[icon]"]').change(function() {
        XFANodesIconTweak_updateSpriteIconPreview(iType);
    });

    // Update preview sprite
    XFANodesIconTweak_updateSpriteIconPreview(iType);
}

// Initialization of the icon type handler
function XFANodesIconTweak_initTypeChangeHandler()
{
    // Add on change event to radio button to hide or not the font awesome part
    $("input[name='xfa_nit_type']").on('change', XFANodesIconTweak_handleTypeChange);

    // Update
    XFANodesIconTweak_handleTypeChange();
}

// Update the radio buttons type stuff
function XFANodesIconTweak_handleTypeChange()
{
    selectedVal = parseInt($("input[name='xfa_nit_type']:checked").val());

    switch(selectedVal)
    {
        case 1: // fa
            $(".xfaNitFa").removeClass('hiddenDiv');
            $(".xfaNitSrv").addClass('hiddenDiv');
            $(".xfaNitSprite").addClass('hiddenDiv');
            break;
        case 2: // srv
            $(".xfaNitFa").addClass('hiddenDiv');
            $(".xfaNitSrv").removeClass('hiddenDiv');
            $(".xfaNitSprite").addClass('hiddenDiv');
            break;
        case 3: // sprite
            $(".xfaNitFa").addClass('hiddenDiv');
            $(".xfaNitSrv").addClass('hiddenDiv');
            $(".xfaNitSprite").removeClass('hiddenDiv');
            break;
        case 4: // custom icon
            $(".xfaNitFa").addClass('hiddenDiv');
            $(".xfaNitSrv").addClass('hiddenDiv');
            $(".xfaNitSprite").addClass('hiddenDiv');
            break;
        default:
            $(".xfaNitFa").addClass('hiddenDiv');
            $(".xfaNitSrv").addClass('hiddenDiv');
            $(".xfaNitSprite").addClass('hiddenDiv');
            break;
    }
}

function XFANodesIconTweak_updateFAIcon1Preview()
{
    XFANodesIconTweak_updateFAIconPreview('fa_icon1');
}

function XFANodesIconTweak_updateFAIcon2Preview()
{
    XFANodesIconTweak_updateFAIconPreview('fa_icon2');
}

function XFANodesIconTweak_updateFAIconPreview(iType)
{
    $('#' + iType + '_preview').empty();

    if ($('input[name="' + iType + '[layer_up]"').val() != '')
    {
        // Create the span element for stacking with adequate classes
        var spanElt = $('<span></span>');
        spanElt.addClass('fa-stack');
        spanElt.css({'font-size':$('input[name="' + iType + '[size]"]').val() + 'px'});

        // Create layer down element for stacking with adequate classes
        var layerDnElt = $('<i></i>');
        layerDnElt.addClass('fa');
        layerDnElt.addClass('fa-stack-2x');
        layerDnElt.addClass('fa-fw');
        layerDnElt.addClass($('#' + iType + '_layer_down').val());
        layerDnElt.addClass($('#' + iType + '_layer_down_transform').val());
        layerDnElt.addClass($('#' + iType + '_layer_down_animate').val());
        layerDnElt.css({'color':$('input[name="' + iType + '[layer_down_color]"]').val()});

        layerDnElt.appendTo(spanElt);

        // Create layer up element for stacking with adequate classes
        var layerUpElt = $('<i></i>');
        layerUpElt.addClass('fa');
        layerUpElt.addClass('fa-stack-1x');
        layerUpElt.addClass('fa-fw');
        layerUpElt.addClass($('#' + iType + '_layer_up').val());
        layerUpElt.addClass($('#' + iType + '_layer_up_transform').val());
        layerUpElt.addClass($('#' + iType + '_layer_up_animate').val());
        layerUpElt.css({'color':$('input[name="' + iType + '[layer_up_color]"]').val()});

        layerUpElt.appendTo(spanElt);

        // Add the span to the result element
        spanElt.appendTo('#' + iType + '_preview');
    }
    else if ($('input[name="' + iType + '[layer_down]"').val() != '')
    {
        // Create layer down element with adequate classes
        var layerDnElt = $('<i></i>');
        layerDnElt.addClass('fa');
        layerDnElt.addClass('fa-fw');
        layerDnElt.addClass($('#' + iType + '_layer_down').val());
        layerDnElt.addClass($('#' + iType + '_layer_down_transform').val());
        layerDnElt.addClass($('#' + iType + '_layer_down_animate').val());
        layerDnElt.css({'color':$('input[name="' + iType + '[layer_down_color]"]').val()});
        layerDnElt.css({'font-size':$('input[name="' + iType + '[size]"]').val() + 'px'});

        // Add the span to the result element
        layerDnElt.appendTo('#' + iType + '_preview');
    }
}

function XFANodesIconTweak_updateSrvIconPreview(iType)
{
    if ($('input[name="' + iType + '[icon]"]').val())
    {
        preview_size = $('input[name="' + iType + '[size]"]').val();
        $('#' + iType + '_preview').html('<img src="' + $('#' + iType + '_preview').attr('data-preview-base-url') + $('input[name="' + iType + '[icon]"]').val() + '" style="width: ' + preview_size + 'px; height:  ' + preview_size + 'px;"/>');
    }
    else
    {
        $('#' + iType + '_preview').html('');
    }

    if ($('input[name="' + iType + '[small_icon]"]').val())
    {
        preview_size = $('input[name="' + iType + '[small_size]"]').val();
        $('#' + iType + '_small_preview').html('<img src="' + $('#' + iType + '_small_preview').attr('data-preview-base-url') + $('input[name="' + iType + '[small_icon]"]').val() + '" style="width: ' + preview_size + 'px; height:  ' + preview_size + 'px;"/>');
    }
    else
    {
        $('#' + iType + '_small_preview').html('');
    }
}

function XFANodesIconTweak_updateSpriteIconPreview(iType)
{
    $('#' + iType + '_preview').empty();

    /* If coordinates val empty, set it to 0 */
    if ($('input[name="' + iType + '[x]"]').val() == '')
    {
        $('input[name="' + iType + '[x]"]').val(0);
    }
    if ($('input[name="' + iType + '[y]"]').val() == '')
    {
        $('input[name="' + iType + '[y]"]').val(0);
    }

    var spanElt = $('<span></span>');
    spanElt.css({'background':'url(\'' + $('input[name="' + iType + '[icon]"]').val() + '\') no-repeat -' + $('input[name="' + iType + '[x]"]').val() + 'px -' + $('input[name="' + iType + '[y]"]').val() + 'px'});
    spanElt.css({'width':$('input[name="' + iType + '[size]"]').val() + 'px'});
    spanElt.css({'height':$('input[name="' + iType + '[size]"]').val() + 'px'});
    spanElt.css({'float':'left'});
    spanElt.appendTo('#' + iType + '_preview');
}