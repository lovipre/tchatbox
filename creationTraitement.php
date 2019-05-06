<?php 
include 'bdd.php';



// je récupère le nom de la discussion, je le met en majuscule et le stock dans une variable.
$nomSalle = strtoupper($_POST['nomDiscussion']);
//je remplace les espcaces par des -
$nomSalle = str_replace(" ","-",$nomSalle);


//je récupère les infos de la salle dans la base de données.
$requete= $pdo->prepare("SELECT * FROM Salle WHERE NomSalle=?");
$requete->execute([$nomSalle]);
//je les stocke dans une variable sous forme de tableau 
$result = $requete->fetch();

//Si le résultat est un tableau vide (=pas de salle avec ce nom dans bdd)
if (empty($result) == true){

    //Je peux creer une nouvelle discussion
    $requete= $pdo->prepare("INSERT INTO Salle(Id_CreateurSalle,NomSalle) VALUES (?,?)");
    $requete->execute([$_POST['userId'],$nomSalle]);

    //Je récupère l'Id de la nouvelle discussion
    $requete = $pdo->prepare("SELECT Id FROM Salle WHERE NomSalle=?");
    $requete->execute([$nomSalle]);
    $result = $requete->fetch();
    

    //Redirection vers la page classe.php
    echo json_encode([$result['Id'],$_POST['userId']]);

    

//Sinon, j'affiche un message d'erreur
} else {
    echo json_encode(["erreur"]);
}




