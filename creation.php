<?php 
include 'bdd.php';
include "creation.phtml";

// je récupère le champ du formulaire et le stock dans une variable.
$nomSalle = $_POST['inputIdRoom'];
echo($nomSalle);
// var_dump($_GET['id']);
// si le champ du formulaire est vide au moment du submit
if ($nomSalle == '' ){
    //J'affiche un message d'erreur
    echo("Erreur : Veuillez donner un nom à cette nouvelle discussion");
//Sinon je récupère les infos de la salle dans la base de données. 
} else {
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

    //Sinon, j'affiche un message d'erreur   
    } else {
        echo("Erreur : Cette discussion existe déjà, merci de lui donner un nouveau nom");
    }


}


//$_GET['id'];
