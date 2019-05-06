'use strict'
//au chargement de la page
$(document).ready(function(){
    //je mets un gestionnaire d'événement sur le boutton du formulaire
    $("#creation").click(creerSalle);
});

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
        $("#rejoindre").attr('href','index.php');
        //je change le texte du lien
        $("#rejoindre").html("S'identifier");

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
                },
                error: function(){
                    console.log('erreur');
                }
            });
        }
    }
}

