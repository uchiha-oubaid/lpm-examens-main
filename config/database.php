
<?php
// Connexion à la base de données MySQL
$servername = "localhost";
$username = "root";      // Votre utilisateur MySQL
$password = "";          // Votre mot de passe MySQL
$database = "lpm_examens";

$conn = new mysqli($servername, $username, $password, $database);

// Vérification connexion
if ($conn->connect_error) {
    die("Connexion échouée : " . $conn->connect_error);
}

// Définir l'encodage en UTF-8
$conn->set_charset("utf8");
?>
