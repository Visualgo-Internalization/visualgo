<?php    
    session_start();
    if (!isset($_SESSION["language"])) {
        $_SESSION["language"] = "English";
    }

    if (is_ajax()) {
        if (isset($_POST["action"]) && !empty($_POST["action"])) {
            $action = $_POST["action"];
            switch($action) { //Switch case for value of action
                case "changeLanguage": changeLanguage(); break;
                case "getLanguage": getLanguage(); break;
                case "saveNewData": newData(); break;
                case "getData": getData(); break;
            }
        }
    }

    function is_ajax() {
        return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
    }

    $db;
    function setupDatabase() {
        global $db;
        require_once '../../../config.php'; 
        $db = new mysqli(db_host, db_uid, db_pwd, db_name);
        if ($db->connect_errno) {
            exit("Failed to connect to MySQL: (" . $db->connect_errno . ") " . $db->connect_error); 
        }
    }

    function changeLanguage() {
        $_SESSION["language"] = $_POST["language"];
    }

    function getLanguage() {
        echo $_SESSION["language"];
    }

    function newData() {
        $tableName = $_SESSION["language"];
        $id = $_POST["id"];
        $content = $_POST["content"];

        updateDatabase($tableName, $id, $content);

        if ($tableName == "English") {
            updateOtherLanguages($id, $content);
        }
    }

    function updateOtherLanguages($id, $content) {
        $languages = array('Vietnamese' => 'vi', 'Chinese' => 'zh-CN', 'Indonesian' => 'id');
        foreach($languages as $tableName => $code) {
            $apiKey = 'AIzaSyABACKm561ZA0Z8B1UvwTjZIEoMp9UPDE4';
            $url = 'https://www.googleapis.com/language/translate/v2?key='.$apiKey.'&q='.rawurlencode($content).'&source=en&target='.$code;

            // for php 5.3
            $json = file_get_contents($url);
            $responseDecoded = json_decode($json,true);

            //  this is for php > 5.3
            // $handle = curl_init($url);
            // curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
            // $response = curl_exec($handle);                 
            // $responseDecoded = json_decode($response, true);
            // curl_close($handle);

            $newText = $responseDecoded['data']['translations'][0]['translatedText'];
            updateDatabase($tableName, $id, $newText);
        }
    }

    function updateDatabase($tableName, $id, $content) {
        global $db;
        setupDatabase();

        $query = "insert into ".$tableName." values (".$id.", '".$content."')";
        if (!($db -> query($query))) {
            $query = "update ".$tableName." set content='".$content."' where id=".$id;
            $db -> query($query);
        }
    }

    function getData() {
        global $db;
        setupDatabase();

        $tableName = $_SESSION["language"];
        $id = $_POST["id"];

        $query = "Select content from ".$tableName." where id=".$id;
        $row = mysqli_fetch_row($db -> query($query));
        echo $row[0];
    }
?>