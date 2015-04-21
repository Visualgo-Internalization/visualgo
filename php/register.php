<?php 

session_start();
$db;
function setupDatabase() {
    global $db;
    require_once '../../../config.php'; 
    $db = new mysqli(db_host, db_uid, db_pwd, db_name);
    if ($db->connect_errno) {
        exit("Failed to connect to MySQL: (" . $db->connect_errno . ") " . $db->connect_error); 
    }
}

function cleanInput($input) {
 
  $search = array(
    '@<script[^>]*?>.*?</script>@si',   // Strip out javascript
    '@<[\/\!]*?[^<>]*?>@si',            // Strip out HTML tags
    '@<style[^>]*?>.*?</style>@siU',    // Strip style tags properly
    '@<![\s\S]*?--[ \t\n\r]*>@'         // Strip multi-line comments
  );
 
    $output = preg_replace($search, '', $input);
    return $output;
}

setupDatabase();
$first = $_POST["first_name"];
$last = $_POST["last_name"];
$email = $_POST["email"];
$pass = $_POST["password"];
///$pw = crypt($_POST["pw"], "CRYPT_MD5");
$lang = $_POST["language"];

$input  = cleanInput($first);
$first = $db->real_escape_string($input);

$input  = cleanInput($last);
$last = $db->real_escape_string($input);

$input  = cleanInput($email);
$email = $db->real_escape_string($input);

$input  = cleanInput($pass);
$pass = $db->real_escape_string($input);

if($first != null && $last != null && $email != null && $pass != null && $lang != null){
    $query = "insert into registration values ('".$first."', '".$last."', '".$email."', '".$lang."', '".$pass."')";
}
if($db->query($query)){
	echo "";
}

 ?>