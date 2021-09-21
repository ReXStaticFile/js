function renderNodeStylingForm() {
    var inheritStyling = $('input[name=inherit_styling]').is(':checked');
    var inheritGrid = $('input[name=inherit_grid]').is(':checked');

    if (inheritStyling) {
        $('.js-stylingOptions').hide();
    } else {
        $('.js-stylingOptions').show();
    }

    if (inheritGrid) {
        $('.js-gridOptions').hide();
    } else {
        $('.js-gridOptions').show();
    }
}

$('document').ready(function() {
    $('input[name=inherit_styling]').change(function() {
        renderNodeStylingForm();
    })
    $('input[name=inherit_grid]').change(function() {
        renderNodeStylingForm();
    })
});