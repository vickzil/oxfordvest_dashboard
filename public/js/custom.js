jQuery(document).ready(function($) {

    $(".toggle-password").click(function() {

        $(this).toggleClass("fa-eye fa-eye-slash");
        var input = $($(this).attr("toggle"));
        if (input.attr("type") == "password") {
            input.attr("type", "text");
        } else {
            input.attr("type", "password");
        }
    });

    if (document.querySelector(".menu_toggle")) {
        var menu_toggle = document.querySelector(".menu_toggle");

        menu_toggle.onclick = function() {
            document.body.classList.toggle("toggle_menu_active");
        };
    }







});