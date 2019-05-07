<?php 
include 'bdd.php';

//Dans la bdd, je récupère tous les utilisateurs présents dans cette salle. 
$requete = $pdo->prepare("SELECT * FROM UserSalle WHERE Id_Salle=?");
$requete->execute([$_POST['salleId']]);
$participants= $requete->fetchall();


$idParticipant=[];
$nomParticipants=[];
//pour chaque ligne du tableau $participants
for ($i=0;$i<count($participants);$i++){
    //Je stock l'Id du participant dans le tableau $idParticipant
    array_push($idParticipant,$participants[$i]['Id_User'] );
}


//Si le tableau contient au moins une ligne 
if (count($idParticipant)>=0){
    //pour chaque ligne, je fais une requete sql pour récupérer le nom du participant correspondant à l'Id
    for($i=0;$i<count($idParticipant);$i++){
        $requete= $pdo->prepare("SELECT Pseudo FROM User WHERE Id=?");
        $requete->execute([$idParticipant[$i]]);
        $nomParticipant = $requete->fetch();
        array_push($nomParticipants, $nomParticipant);

    };
}
//je renvoie les résultats
echo json_encode($nomParticipants);