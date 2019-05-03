<?php 
include 'bdd.php';
include "creation.phtml";

if($_POST && $_GET){
    var_dump("ok");
    // je récupère le champ du formulaire, je le met en majuscule et le stock dans une variable.
    $nomSalle = strtoupper($_POST['inputIdRoom']);
    //je remplace les espcaces par des -
    $nomSalle = str_replace(" ","-",$nomSalle);
    echo($nomSalle);


    // si le champ du formulaire est vide au moment du submit
    if ($nomSalle == '' ){
        //J'affiche un message d'erreur
        echo("Erreur : Veuillez donner un nom à cette nouvelle discussion");
    //Sinon  
    } else {
        //je récupère les infos de la salle dans la base de données.
        $requete= $pdo->prepare("SELECT * FROM Salle WHERE NomSalle=?");
        $requete->execute([$nomSalle]);

        //on récupère les infos retournées par la BDD sous forme de tableau 
        $result = $requete->fetch();

        var_dump($result);
        
        //Si le résultat n'est pas un tableau vide
        if (empty($result) == true){
            var_dump($_GET['id']);
            //Je peux creer une nouvelle discussion
            $requete= $pdo->prepare("INSERT INTO Salle(Id_CreateurSalle,NomSalle) VALUES (?,?)");
            $requete->execute([$_GET['id'],$nomSalle]);


            //Je récupère l'Id de la nouvelle discussion
            $requete = $pdo->prepare("SELECT Id FROM Salle WHERE NomSalle=?");
            $requete->execute([$nomSalle]);
            $result = $requete->fetch();
            var_dump($result);


            //Redirection vers la page classe.php
            header("location: classe.php?id_Salle=".$_GET['id'].",id_User=".$result['Id']."");


        //Sinon, j'affiche un message d'erreur   
        } else {
            echo("Erreur : Cette discussion existe déjà, merci de lui donner un nouveau nom");
        }


    }
}

    //$_GET['id'];
