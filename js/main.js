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
function sendMessage(e){
    e.preventDefault(); // on empêche le bouton d'envoyer le formulaire
    var message = $('#message').val();
    if(message != ""){ // on vérifie que les variables ne sont pas vides
        $.ajax({
            url : "traitement.php", // on donne l'URL du fichier de traitement
            type : "POST", // la requête est de type POST
            data : {message: message },
            dataType: 'json', 
            success: function(data){
                if (data)
                {
                    console.log(data);
                    for(var i=0; i < data.user.length; i++)
                    {
                        if (data.user[i].Id == 4)
                        {
                            $('#messages').append('<p class="gauche">'+data.user[i].Dialogue+'</p>');
                            $('#messages').append('<p class="gauche">Ecrit par '+data.user[i].Pseudo+' le '+data.user[i].Date+'</p>');
                        }
                        else
                        {
                            $('#messages').append('<p class="droite">'+data.user[i].Dialogue+'</p>');
                            $('#messages').append('<p class="droite">Ecrit par '+data.user[i].Pseudo+' le '+data.user[i].Date+'</p>');
                        }
                    }
                }
            }
        });
    }
}

$(document).ready(function(){
    $("#connect").click(testlogs);
    $("#suscribe").click(inscription);
    $('#envoi').click(sendMessage);
});