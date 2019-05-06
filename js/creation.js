'use strict'
//au chargement de la page
$(document).ready(function(){
    //je mets un gestionnaire d'événement sur le boutton du formulaire
    $("#creation").click(creerSalle);
    $("#rejoindre").click(redirection);
    $("#boutonRejoindre").click(rejoindreSalle);
    $("#lienCreation").click(redirectionCreer);
});

function redirectionCreer(e){
    e.preventDefault();
    //je stock l'id dans une variable
    var userId = $_GET('id');

    //si l'url ne contient pas l'id de l'utilisateur
    if ( $_GET('id') == null ){
        //J'affiche un message d'erreur
        $("#errorMessage").html("Oups, <br> désolé, je ne vous ai pas reconnu...<br> il faut commencer par vous identifier");
        

    } else{
        //Je redirige vers la salle avec l'id correspondant
    window.location.replace("creation.php?id="+userId);
    }

}


function redirection(e){
    e.preventDefault();
    //je stock l'id dans une variable
    var userId = $_GET('id');

    //si l'url ne contient pas l'id de l'utilisateur
    if ( $_GET('id') == null ){
        //J'affiche un message d'erreur
        $("#errorMessage").html("Oups, <br> désolé, je ne vous ai pas reconnu...<br> il faut commencer par vous identifier");

    } else{
        //Je redirige vers la salle avec l'id correspondant
    window.location.replace("rejoindre.php?id="+userId);
    }
    
}


function rejoindreSalle(e){
    e.preventDefault();
    //je stock l'id dans une variable
    
        //je stock l'id dans une variable
        var userId = $_GET('id');
        //je recupere la valeur du champ du formulaire
        var nomDiscussion = $("#inputRoom").val();
        console.log(nomDiscussion);
        //si le champ est vide
        if (nomDiscussion==""){
            //j'affiche un message d'erreur
            $("#errorMessage").html("Erreur :<br> Veuillez saisir le nom de votre nouvelle discussion");

        } else { 
            //je fais un appel AJAX
            $.ajax({
                url: "rejoindreTraitement.php",//url de la page
                method: 'post',
                data: {nomDiscussion:nomDiscussion, userId:userId},
                dataType: 'json', 
                success: function(data){
                    console.log("ok");
                    console.log(data);
                    
                    //Je redirige vers l asalle avec l'id correspondant
                    window.location.replace("salle.php?id_Salle="+data[0]['Id']+"&id_User="+userId);
                    

                }
            });
        }
    
}


function creerSalle(e){
    //j'annule l'action par défaut du submit
    e.preventDefault();
    
    //si l'url ne contient pas l'id de l'utilisateur
    if ( $_GET('id') == null ){
        //J'affiche un message d'erreur
        $("#errorMessage").html("Oups, <br> désolé, je ne vous ai pas reconnu...<br> il faut commencer par vous identifier");
        //je cache l'input du formulaire
        $("#inputIdRoom").addClass("hide");
        //je cache le boutton du formulaire
        $("#creation").addClass("hide");
        //je modifie le lien pour rediriger vers la page de connexion
        $("#identifier").attr('href','index.php');
        //je change le texte du lien
        $("#identifier").html("S'identifier");
        //J'affiche le bouton s'identifier
        $("#identifier").removeClass("hide");
        //Je cache le bouton rejoindre discussion
        $("#rejoindre").addClass("hide");
        

    } else {
        //je stock l'id dans une variable
        var userId = $_GET('id');
        //je recupere la valeur du champ du formulaire
        var nomDiscussion = $("#inputIdRoom").val();
        console.log(nomDiscussion);
        //si le champ est vide
        if (nomDiscussion==""){
            //j'affiche un message d'erreur
            $("#errorMessage").html("Erreur :<br> Veuillez saisir le nom de votre nouvelle discussion");

        } else { 
            //je fais un appel AJAX
            $.ajax({
                url: "creationTraitement.php",//url de la page
                method: 'post',
                data: {nomDiscussion:nomDiscussion, userId:userId},
                dataType: 'json', 
                success: function(data){
                    console.log(data);
                    //Si data est différent de erreur
                    if (data != "erreur"){
                        //Je redirige vers la page salle.php
                        window.location.replace("salle.php?id_Salle="+data[0]+"&id_User="+data[1]);

                    } else {//sinon
                        // J'affiche un message d'erreur
                        $("#errorMessage").html("Erreur :<br> Cette discussion existe déjà. Saisissez un autre nom ou  cliquez sur rejoindre pour y accéder");
                    }
                },
                error: function(){
                    console.log('AJAX Erreur');
                }
            });
        }
    }
}


   