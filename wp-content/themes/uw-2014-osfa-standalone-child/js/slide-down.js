$('.slide-down-switch.opener').click(function() {
    
    $(this).closest('.slide-down-container').toggleClass('closed');
    $(this).closest('.slide-down-container').find('.slide-down-content').animate(
    {
        "max-height":1000
    }, 
    1000,
    function() {$(this).css({"max-height": "none"}) } 
    )
});

$('.slide-down-switch.closer').click(function() {
    
    $(this).closest('.slide-down-container .slide-down-content').css({"max-height": 1000});
    $(this).closest('.slide-down-container').find('.slide-down-content').animate(
    {
        "max-height":0
    }, 
    600, 
    function() {$(this).closest('.slide-down-container').toggleClass('closed');})
});




