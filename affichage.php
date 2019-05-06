<?php 
include 'bdd.php';
if (empty($_POST) == false)
{
    $requete = $pdo->prepare("
    SELECT
    u.Pseudo,
    c.Dialogue,
    c.Date,
    u.Id,
    c.Id AS idMessage
    FROM
    `User` u
    INNER JOIN
    `Contenu` c ON c.Id_Auteur = u.Id
    WHERE
    c.Id_Salle = ? AND c.Id > ? AND u.Id != ?
        ");
    $requete->execute([$_POST['salle'],$_POST['idMess'],$_POST['user']]);
    $user = $requete->fetchAll();
    $data = ["user"=> $user];
    echo json_encode($data);
}