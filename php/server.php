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
                case "getEnglishTerm": getEnglishTerm(); break;
                case "translateData": translateData(); break;
                case "saveNewData": newData(); break;
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

        $result = array();
        $table = getTableFromDatabase($_SESSION["language"]);
        while ($row = mysqli_fetch_row($table)) {
            $result[$row[0]] = $row[1];
        }
        echo json_encode($result);
    }

    function getTableFromDatabase($tableName) {
        global $db;
        setupDatabase();

        $query = "Select * from ".$tableName;
        return $db -> query($query);
    }

    function getLanguage() {
        echo $_SESSION["language"];
    }

    function getEnglishTerm() {
        $id = $_POST["id"];
        return getContentFromDatabase("English", $id);
    }

    function newData() {
        $tableName = $_SESSION["language"];
        $id = $_POST["id"];
        $content = $_POST["content"];

        if ($tableName == "English" && $content != getContentFromDatabase($tableName, $id)) {
            updateOtherLanguages($id, $content);
        } 
        updateDatabase($tableName, $id, $content);
    }

    function updateOtherLanguages($id, $content) {
        $languages = array('Vietnamese' => 'vi', 'Chinese' => 'zh-CN', 'Indonesian' => 'id');
        foreach($languages as $tableName => $code) {
            $apiKey = 'AIzaSyABACKm561ZA0Z8B1UvwTjZIEoMp9UPDE4';
            $url = 'https://www.googleapis.com/language/translate/v2?key='.$apiKey.'&q='.rawurlencode($content).'&source=en&target='.$code;

            // for php 5.3
            $json = file_get_contents($url);
            $responseDecoded = json_decode($json,true);

            // this is for php > 5.3
            // $handle = curl_init($url);
            // curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
            // $response = curl_exec($handle);                 
            // $responseDecoded = json_decode($response, true);
            // curl_close($handle);

            $newText = $responseDecoded['data']['translations'][0]['translatedText'];
            updateDatabase($tableName, $id, $newText);
        }
    }

    function translateData() {
        $id = $_POST["id"];
        $content = $_POST["text"];

        if($_SESSION["isAdmin"]){
            $text = getContentFromDatabase("English", $id);
            if (is_null($text) || $content != $text) {
                updateOtherLanguages($id, $content);
                updateDatabase("English", $id, $content);
            }
        }

        $tableName = $_SESSION["language"];
        echo getContentFromDatabase($tableName, $id);
    }

    function getContentFromDatabase($tableName, $id) {
        global $db;
        setupDatabase();

        $query = "Select content from ".$tableName." where id=".$id;
        $row = mysqli_fetch_row($db -> query($query));
        if (is_null($row)) {
            return null;
        } else {
            return $row[0];
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
?>