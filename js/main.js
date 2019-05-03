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

$(document).ready(function(){
    $("#connect").click(testlogs);

});