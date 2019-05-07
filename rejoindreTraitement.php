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
$infosSalle = $requete->fetch();


//Je récupère les infos des participants dans userSalle
$requete= $pdo->prepare("SELECT * FROM UserSalle WHERE Id_Salle=?");
$requete->execute([$infosSalle['Id']]);
$infosParticipants = $requete->fetchAll();


//je vérifie si l'utilisateur participe déjà à la discussion
for ($i=0;$i<count($infosParticipants);$i++){
    
    //si le tableau contient l'id de l'utilisateur dans la colonne des participants
    if ($infosParticipants[$i]['Id_User'] == $_POST['userId']){
        //L'utilisateur est déjà présent dans la discussion
        $presenceParticipant = true;
        

    // sinon
    } else{
        $presenceParticipant = false;
    }
};
if($presenceParticipant == false){
    //Je l'ajoute en tant que participant à la discussion
    $requete= $pdo->prepare("INSERT INTO UserSalle(Id_Salle,Id_User) VALUES (?,?)");
    $requete->execute([$infosSalle['Id'],$_POST['userId']]); 
    
};

echo json_encode([$infosSalle]);






