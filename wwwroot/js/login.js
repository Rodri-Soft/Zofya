$("#register-link").click(function (event) {
    $("#pills-register").addClass("show");
    $("#pills-register").addClass("active");

    $("#pills-login").removeClass("show");
    $("#pills-login").removeClass("active");
    
    $("#tab-register").addClass("active");    
    $("#tab-register").attr("aria-selected", "true");

    $("#tab-login").removeClass("active");    
    $("#tab-login").attr("aria-selected", "false");
})