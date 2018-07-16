$(function () {
    var NAVPath = "nav.html";
    if (location.pathname.split('/').slice(-1)[0] == "index.html") {
        NAVPath = "html/nav.html";
    };
    $.get(NAVPath, function (data) { // add nav to page on load
        $("body").prepend(data);

        $('#navToggle').click(function () {
            $('#mainHeader nav').toggleClass('showNav'); //Toggles the navbar visibility
        });
    });

});
