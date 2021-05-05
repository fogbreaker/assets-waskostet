

let sucheHtml = '<div id="suche" style="display:none;"><p class="tab-title">Suche läuft...</p><fieldset class="pure-group"><img style="width: 800px; margin-left: -400px; left:50%;position: absolute;" alt="suche" src="https://assets.was-kostet.at/addresstool/images/suche.gif"></div>';

$('#contact').before(sucheHtml);


function doLastStep(){
    $('#contact').css('display', 'none');
    $('#suche').css('display','block');
    $('#prevBtn').css('display','none');
    $('#nextBtn').css('display','none');
    $('#progress').css('display','none');
    $('#submitBtn').css('display','none');
    $('#regForm').css('min-height','500px');

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

function getClickId() {
    try {
        var trackers = ga.getAll();
        var i, len;
        for (i = 0, len = trackers.length; i < len; i += 1) {
            if (trackers[i].get('trackingId') === "UA-170828926-1") {
                return trackers[i].get('clientId');
            }
        }
    } catch(e) {}
    return 'false';
}

$('#submitBtn').click(function(){

    var filled = false;
    pn_filled = !!$('#name').val();
    ln_filled = !!$('#nachname').val();
    ph_filled = !!$('#Tel').val();
    em_filled = !!$('#email').val();
    agb_filled = !!$('#agb').attr('checked');
    message = {
        "action":"Click",
        "resource":"submit",
        "label":"Angebote vergleichen",
        "pn_filled": pn_filled,
        "ln_filled": ln_filled,
        "ph_filled": ph_filled,
        "em_filled": em_filled,
        "agb_filled": agb_filled,
        "gcid": getClickId()
    };
    message = JSON.stringify(message);
    $.ajax({
        url: "https://assets.was-kostet.at/addresstool/report.php",
        type: "POST",
        data: "report=" + message,
        context: document.body
    }).done(function(response) {
        console.log("GCLID" + response);
    });
});


$(document).ready(function(){
    window.onerror = function (msg, url, lineNo, columnNo, error) {
        var string = msg.toLowerCase();
        var substring = "script error";
        if (string.indexOf(substring) > -1){
            $.ajax({
                url: "https://assets.was-kostet.at/addresstool/report.php",
                type: "POST",
                data: "error=Error kann nicht näher beschrieben werden. Das ist nicht gut." ,
                context: document.body
            }).done(function(response) {
                console.log("Non-Classifiable Error was reported! Response from server was: " + response);
            });
        } else {
            var message = [
                'Message: ' + msg,
                'URL: ' + url,
                'Line: ' + lineNo,
                'Column: ' + columnNo,
                'Error object: ' + error,
                'GCID:' +  getClickId()
            ];
            message = JSON.stringify(message);

            $.ajax({
                url: "https://assets.was-kostet.at/addresstool/report.php",
                type: "POST",
                data: "error=" + message,
                context: document.body
            }).done(function(response) {
                console.log("Error was reported! Response from server was: " + response);
            });
        }

        return false;
    };
});
