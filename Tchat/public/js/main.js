$(function() {

    $(window).on('resize',function(){
        if (window.innerWidth > 578) $("#nav").addClass("flex-end");
        else $("#nav").removeClass("flex-end");
    });
    $(".card.bg-gray").hover(function () {
        $(this).addClass("bg-gray-hover");
    });
    $(".card.bg-gray").mouseleave(function () {
        $(this).removeClass("bg-gray-hover");
    });

    $(window).focus(function() {
	pseudo = localStorage['user'];
	document.title = "Bonjour " + pseudo + " - " + "IndieBaie";
    });
    $(window).blur(function() {
	document.title = "Reviens sur IndieBaie";
    });
});
