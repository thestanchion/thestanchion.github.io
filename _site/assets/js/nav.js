/******************************************
// Primary Navigation
// Authors: Ash Robbins
// Created date: 31/01/2017
// Notes:
******************************************/
$(".c-nav-trigger").on("click", function() {
    var _this = $(this);

    if (_this.hasClass("active")) {
        $(this).removeClass("active");
        $(".c-nav").removeClass("open");
    } else {
        $(this).addClass("active");
        $(".c-nav").addClass("open");
    }
});
