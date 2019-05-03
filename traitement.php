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
    $requete->execute([$_POST['message'],$id=4,$index=1]);
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
    c.Id_Salle = ?
        ");
    $requete->execute([$index=1]);
    $user = $requete->fetchAll();
    $data = ["user"=> $user];
    echo json_encode($data);
}
