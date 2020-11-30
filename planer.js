

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
        let tmp = $("#contact .tab-title").html();
        $("#contact .tab-title").html("<span style='color: blue;'>2 Anbieter gefunden! </span>" +tmp);
    }, 5000);
}
$('#Reparatur').bind('click', function(){
    doLastStep();
});

$('#wohnverhaeltnis').bind('click', function(){
    doLastStep();
});


