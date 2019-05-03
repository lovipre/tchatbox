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

$(document).ready(function(){
    $("#connect").click(testlogs);
    $("#suscribe").click(inscription);

});