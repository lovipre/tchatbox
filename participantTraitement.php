<?php 
include 'bdd.php';


//dans la bdd, je récupère toutes les discussions auxquelles participe l'utilisateur
$requete= $pdo->prepare("SELECT * FROM UserSalle WHERE Id_User=?");
$requete->execute([$_POST['userId']]);
$discussions= $requete->fetchall();

$idSalle=[];
$nomSalles=[];
//pour chaque ligne du tableau $discussions
for ($i=0;$i<count($discussions);$i++){
    //Je stock l'Id de la salle dans le tableau $idSalle
    array_push($idSalle,$discussions[$i]['Id_Salle'] );
}


//Si le tableau contient au moins une ligne 
if (count($idSalle)>=0){
    //pour chaque ligne, je fais une requete sql pour récupérer le nom de la salle correspondant à l'Id
    for($i=0;$i<count($idSalle);$i++){
        $requete= $pdo->prepare("SELECT NomSalle,Id FROM Salle WHERE Id=?");
        $requete->execute([$idSalle[$i]]);
        $nomSalle = $requete->fetch();
        array_push($nomSalles, $nomSalle);

    };
}

//je renvoie les résultats
echo json_encode($nomSalles);




