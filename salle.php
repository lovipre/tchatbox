<?php 
include 'bdd.php';

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
$requete->execute([$_GET['id_Salle']]);
$tab = $requete->fetchAll();
var_dump($tab);
include 'salle.phtml';