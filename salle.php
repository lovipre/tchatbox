<?php 
include 'bdd.php';

$requete = $pdo->prepare("
SELECT
u.Pseudo,
c.Dialogue,
c.Date,
u.Id,
c.Id AS mId
FROM
`User` u
INNER JOIN
`Contenu` c ON c.Id_Auteur = u.Id
WHERE
c.Id_Salle = ?
ORDER BY 
c.Date
    ");
$requete->execute([$_GET['id_Salle']]);
$tab = $requete->fetchAll();

include 'salle.phtml';