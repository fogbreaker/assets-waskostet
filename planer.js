

let sucheHtml = '<div id="suche" style="display:none;"><p class="tab-title">Suche läuft...</p><fieldset class="pure-group"><img style="width: 800px; margin-left: -400px; left:50%;position: absolute;" alt="suche" src="https://assets.was-kostet.at/addresstool/images/suche.gif"></div>';

$('#contact').before(sucheHtml);

function doLastStep(){
    $('#contact').css('display', 'none');
    $('#suche').css('display','block');
    $('#prevBtn').css('display','none');
    $('#nextBtn').css('display','none');
    $('#progress').css('display','none');
    $('#submitBtn').css('display','none');

    setTimeout(function() {
        $('#suche').css('display','none');
        $('#submitBtn').fadeIn();
        $("#contact").fadeIn();

        $(".tab-title").html("<span style='color: blue;'>2 Anbieter gefunden! </span> Ihre Kontaktdaten");
    }, 5000);
}

document.getElementById("regForm").onkeypress = function (e) {
    var key = e.charCode || e.keyCode || 0;
    if (key === 13) {
        e.preventDefault();
        var ct = GetCurrentTab();
        console.log("GetCurrentTab: " + ct);
        if (ct !== "contact"){
            $('#nextBtn').click();
        }else{
            $('#submitBtn').click();
        }
        //Next();
    }
};
