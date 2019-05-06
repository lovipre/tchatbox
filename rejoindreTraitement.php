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


echo json_encode([$result]);