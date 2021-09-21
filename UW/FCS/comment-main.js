$('body').on('click', 'a.uw_fcs_post_comment', function(e) {
	e.preventDefault();
	var post_id = $(this).data("postid");
	$( ".uw_fcs_quick_comment.js-commentsTarget-"+post_id ).slideToggle( "slow" );
});
        
$('body').on('ajax-submit:response','.uw_comment_form_other', function(e, data)
{
    if (data.errors || data.exception)
    {
            return;
    }
    
    var elemnt = $(this).find('.uw_fcs_cmt_made');
    updateCount(elemnt);
});

$('body').on('ajax-submit:response','.uw_comment_form', function(e, data)
{
    if (data.errors || data.exception)
    {
            return;
    }
    
    var elemnt = $(this).find('.uw_fcs_cmt_made');
    updateCount(elemnt);
    elemnt.parents().closest('.uw_fcs_quick_comment').slideToggle( "slow" );
    elemnt.parent().parent().find('textarea').val('');
    elemnt.closest('.editorPlaceholder-editor.uw_comment').find('.fr-element.fr-view').text('');
    elemnt.closest('.uw_fcs_comment_section').find( ".uw_hidden" ).slideToggle( "slow" );
});

$('body').on('click', 'button.uw_fcs_cmt_cancel_btn', function(e) {
	$(this).parents().closest('.uw_fcs_quick_comment').slideToggle( "slow" );
});
	
function updateCount(elemnt)
{
		var countSection = elemnt.closest('.uw_fcs_comment_section').find('.uw-comment-count');
		countSection.removeClass('uw-hidden');
		countSectionCount = countSection.find('.comment-count');
		var commentCount = countSectionCount.data('count');
		commentCount = commentCount + 1;
		countSectionCount.text(commentCount);
		countSectionCount.data('count',commentCount);
		countSectionCount.attr('data-count',commentCount);
}
	
$('body').on('change', '.uw_fcs_inlineMod', function(e) {
	$(this).parents().closest('.comment').toggleClass('is-mod-selected');
});

$('body').on('click', 'a.menu-linkRow[data-mq-action="add"]', function(e) {
	e.preventDefault();
	var post_id = $(this).data("message-id");
	$('a.actionBar-action--mq[data-message-id="'+post_id+'"]').click();
});	
	
$('body').on('click', 'a.menu-linkRow[data-content="comment"]', function(e) {
	e.preventDefault();
	var post_id = $(this).data("postid");
	$( ".js-commentsTarget-"+post_id ).slideToggle( "slow" );
});

$('.uw_post_btn_margin').on('click', '.button', function(e) {
	e.preventDefault();
        XF.ajax('POST', $(this).data('url'), 
        function (data)
        {            
        }, 
        function (data)
        {
            var target = $('.uw_post_more'+data.post_id);
            
            XF.setupHtmlInsert(data.html, function($html, container, onComplete)
            {
                    $html.each(function()
                    {
                        var $message = $(this);
                        target.before($message);
                        XF.activate($message);                           
                    });
            });
            
            
            if(data.have_data == 0)
            {
                target.hide();
            }
            else
            {
                target.find('.uw_post_btn_margin .uw_load_more').attr('data-url',data.url);
                target.find('.uw_post_btn_margin .uw_expand_all').attr('data-url',data.expandurl);
                target.find('.uw_post_btn_margin .uw_load_more').removeData('url');
                target.find('.uw_post_btn_margin .uw_expand_all').removeData('url');
            }            
        }
        ), {skipDefaultSuccess: true};
});		
	
setTimeout(function(){ 
	
	$('.uw_fcs_inlineMod:checked').each(function(index){
		$(this).parents().closest('.comment').toggleClass('is-mod-selected');
	});
	
	$('.comment.is-mod-selected').each(function(i, obj) {
		$(obj).addClass('is-mod-selected');
	});
}, 3000);
