<?php 
include 'bdd.php';
if (empty($_POST) == false)
{
    $requete = $pdo->prepare("
    INSERT
    INTO
    `Contenu`(`Dialogue`,
    `Id_Auteur`,
    `Id_Salle`)
    VALUES(?, ?, ?)
    ");
    $requete->execute([$_POST['message'],$_POST['user'],$_POST['salle']]);
    $lastId = $pdo->lastInsertId();
    $requete = $pdo->prepare("
    SELECT
    u.Pseudo,
    c.Dialogue,
    c.Date,
    u.Id
    FROM
    `User` u
    INNER JOIN
    `Contenu` c ON c.Id_Auteur = u.Id
    WHERE
    c.Id_Salle = ? AND c.Id = ?
        ");
    $requete->execute([$_POST['salle'],$lastId]);
    $user = $requete->fetch();
    $data = ["user"=> $user, "mId"=>$lastId];
    echo json_encode($data);
}
