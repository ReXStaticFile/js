function showHideSection(sectionToShow, show) {
    if (show) {
        $('.ShowIf' + sectionToShow).show();
        $('.HideIf' + sectionToShow).hide();
    } else {
        $('.ShowIf' + sectionToShow).hide();
        $('.HideIf' + sectionToShow).show();
    }
}
function parseForm() {
    var recurringCampaign = $('#Recurring').is(':checked');
    var repeatUnit = $('#RepeatUnit').val();

    if (recurringCampaign) {
        showHideSection('Recurring', true);
    } else {
        showHideSection('Recurring', false);
    }

    switch(repeatUnit) {
        case 'daily':
            showHideSection('Daily', true);
            showHideSection('Weekly', false);
            showHideSection('Monthly', false);
            showHideSection('Yearly', false);
            break;
        case 'weekly':
            showHideSection('Daily', false);
            showHideSection('Weekly', true);
            showHideSection('Monthly', false);
            showHideSection('Yearly', false);
            break;
        case 'monthly':
            showHideSection('Daily', false);
            showHideSection('Weekly', false);
            showHideSection('Monthly', true);
            showHideSection('Yearly', false);
            break;
        case 'yearly':
            showHideSection('Daily', false);
            showHideSection('Weekly', false);
            showHideSection('Monthly', false);
            showHideSection('Yearly', true);
            break;
    }
}

$(document).ready(function() {
    parseForm();

    $('#Recurring').change(function() {
        parseForm();
    });

    $('#RepeatUnit').change(function() {
        parseForm();
    })
});