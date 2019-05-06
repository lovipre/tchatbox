'use strict';

function testlogs(e){
    e.preventDefault();
    $.ajax({
        url: 'validation.php',
        method: 'post',
        data: {login: $('#inputLogin').val(), password: $('#inputPassword').val() }, 
        dataType: 'json', 
        success: function(data){
            if (data) 
            {
                if (data.validation == true)
                {
                    $('.form-access').attr('class','hide');
                    $('body').prepend('<p id="success">Connexion réussi</p>');
                    setTimeout(function(){
                        window.location.href = "creation.php?id="+data.id;
                    }, 3000); 
                    
                }
                else if (data.validation == false)
                {
                    $('#fail').text('Mauvais identifiants');
                    $('#fail').removeClass('hide');
                }  
              }
        }
    });
}
function inscription(e){
    e.preventDefault();
    $('#fail').addClass('hide');
    if ($('#inputPassword').val() == $('#cinputPassword').val())
    {
        $.ajax({
            url: 'validation.php',
            method: 'post',
            data: {login: $('#inputLogin').val(), testemail: $('#inputEmail').val()}, 
            dataType: 'json', 
            success: function(data){
                if (data) 
                {
                    if (data.result == true)
                    {
                        $('#fail').text('Un compte existe déjà avec cette adresse mail ou ce pseudo');
                        $('#fail').removeClass('hide');
                    }
                    else 
                    {
                        $.ajax({
                            url: 'validation.php',
                            method: 'post',
                            data: {login: $('#inputLogin').val(), email: $('#inputEmail').val(), password: $('#inputPassword').val(), cpassword: $('#cinputPassword').val() }, 
                            dataType: 'json', 
                            success: function(data){
                                if (data) 
                                {
                                    if (data.validation == false)
                                    {
                    
                                        $('.form-access').attr('class','hide');
                                        $('body').prepend('<p id="success">Inscritpion réussi</p>');
                                        setTimeout(function(){
                                            window.location.href = "creation.php?id="+data.id;
                                        }, 3000); 
                                    }
                                    else if (data.validation == true)
                                    {
                                        $('#fail').text('Ce compte existe déjà');
                                        $('#fail').removeClass('hide');
                                    }  
                                  }
                            }
                        });
                    }
                  }
            }
        });
        
    }
    else
    {
        $('<div class="alert alert-danger" role="alert">Les mots de passes ne correspondent pas</div>').insertAfter("h1");
    }
    
}
function $_GET(param) {
	var vars = {};
	window.location.href.replace( location.hash, '' ).replace( 
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);
	if ( param ) {
		return vars[param] ? vars[param] : null;	
	}
	return vars;
}
function sendMessage(e){
    e.preventDefault(); // on empêche le bouton d'envoyer le formulaire
    var message = $('#message').val();
    var salle = $_GET('id_Salle');
    var user = $_GET('id_User');

    if(message != ""){ // on vérifie que les variables ne sont pas vides
        $.ajax({
            url : "traitement.php", // on donne l'URL du fichier de traitement
            type : "POST", // la requête est de type POST
            data : {message: message, salle: salle, user: user },
            dataType: 'json', 
            success: function(data){
                if (data)
                {
                    if (data.user.Id == user)
                    {
                            $('#messages').append('<p class="gauche">'+data.user.Dialogue+'</p>');
                            $('#messages').append('<p class="gauche">Ecrit par '+data.user.Pseudo+' le '+data.user.Date+'</p>');
                            $('#messages').append('<input class="idMessage" name="idMessage" type="hidden" value="'+data.mId+'">');
                            $('#message').val("");
                            $("#messages").scrollTop(500);
                    }
                }
            }
        });
    }
}
function charger(){
    if ($("#messages input:last-of-type").length)
    {
        var idMess = $("#messages input:last-of-type").get(0).value;
    }
    else
    {
        var idMess = 0;
    }
    var salle = $_GET('id_Salle');
    var user = $_GET('id_User');
    $.ajax({
        url : "affichage.php", // on donne l'URL du fichier de traitement
        type : "POST", // la requête est de type POST
        data : {idMess: idMess, salle: salle, user: user},
        dataType: 'json', 
        success: function(data){
            if (data)
            {
    
                        for (var i = 0; i < data.user.length; i++)     
                        {
                            $('#messages').append('<p class="droite">'+data.user[i].Dialogue+'</p>');
                            $('#messages').append('<p class="droite">Ecrit par '+data.user[i].Pseudo+' le '+data.user[i].Date+'</p>');
                            $('#messages').append('<input class="idMessage" name="idMessage" type="hidden" value="'+data.user[i].idMessage+'">');
                        }     
            }
        }
    });
    
}
$(document).ready(function(){
    $("#connect").click(testlogs);
    $("#suscribe").click(inscription);
    $('#envoi').click(sendMessage);
    if (window.location.href.match('salle.php?') != null)
    {
        $("#messages").scrollTop(500);   
        setInterval(charger, 2000); 
    }
});


// <?php for($i = 0; $i<count($tab); $i++): ?></input>
//             <?php if($tab[$i]['Id'] == $_GET['id_User']): ?>
//                 <p class="gauche"><?= $tab[$i]['Dialogue'] ?></p>
//                 <p class="gauche">Ecrit par <?= $tab[$i]['Pseudo'] ?> le <?= $tab[$i]['Date'] ?></p>
//                 <input class="idMessage" name="idMessage" type="hidden" value="<?= $tab[$i]['mId'] ?>">
//             <?php else: ?>
//                 <p class="droite"><?= $tab[$i]['Dialogue'] ?></p>
//                 <p class="droite">Ecrit par <?= $tab[$i]['Pseudo'] ?> le <?= $tab[$i]['Date'] ?></p>
//                 <input class="idMessage" name="idMessage" type="hidden" value="<?= $tab[$i]['mId'] ?>">
//             <?php endif; ?>
//             <?php endfor; ?>