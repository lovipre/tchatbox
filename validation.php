<?php 
include 'bdd.php';
function hashPassword($password){
    /*
     * Génération du sel, nécessite l'extension PHP OpenSSL pour fonctionner.
     *
     * openssl_random_pseudo_bytes() va renvoyer n'importe quel type de caractères.
     * Or le chiffrement en blowfish nécessite un sel avec uniquement les caractères
     * a-z, A-Z ou 0-9.
     *
     * On utilise donc bin2hex() pour convertir en une chaîne hexadécimale le résultat,
     * qu'on tronque ensuite à 22 caractères pour être sûr d'obtenir la taille
     * nécessaire pour construire le sel du chiffrement en blowfish.
     */
    $salt = '$2y$11$' .substr(bin2hex(openssl_random_pseudo_bytes(32)), 0, 22); 
    // Voir la documentation de crypt() : http://devdocs.io/php/function.crypt
    return crypt($password, $salt);
}
function verifyPassword($password, $hashPassword){
    return crypt($password, $hashPassword) == $hashPassword;
}
if (array_key_exists('login', $_POST) && array_key_exists('password', $_POST) )
{
    $requete = $pdo->prepare("
    SELECT
    *
    FROM
    `User`
    WHERE
    `Pseudo` = ?  
        ");
    $requete->execute([$_POST['login']]);
    $user = $requete->fetch();

    if (empty($user))
    {
        $data = ["validation"=> false];
        if (array_key_exists('cpassword', $_POST))
        {
            
            $password = $_POST['password'];
            $hashPassword = hashPassword($password);
            $requete = $pdo->prepare("
            INSERT
            INTO
            `User`(`Pseudo`,`Email`,
            `Password`)
            VALUES(?,?,?)
                ");
            $requete->execute([$_POST['login'],$_POST['email'],$hashPassword]);
            $lastId = $pdo->lastInsertId();
            $data = ["validation"=> false, "id"=>$lastId];
        }
    }
    else
    {
        $password = $_POST['password'];
        $hashPassword = $user['Password'];        
        if (verifyPassword($password, $hashPassword) == true)
        {
            $data = ["validation"=> true,"id"=>$user['Id']];    
        }
        else
        {
                $data = ["validation"=> false];
        }         
    }
}
else
{
    $data = ["validation"=> false];
    
}
echo json_encode($data);