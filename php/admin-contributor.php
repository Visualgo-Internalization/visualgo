<?php    
    session_start();
    if (!isset($_SESSION["id"])) {
        $_SESSION["id"] = null;
    }
    if (!isset($_SESSION["isAdmin"])) {
        $_SESSION["isAdmin"] = false;
    }
    if (!isset($_SESSION["isContributor"])) {
        $_SESSION["isContributor"] = false;
    }
    if (!isset($_SESSION["language"])) {
        $_SESSION["language"] = "Vietnamese";
    }

    if (is_ajax()) {
        if (isset($_POST["action"]) && !empty($_POST["action"])) {
            $action = $_POST["action"];
            switch($action) { //Switch case for value of action
                case "getData": getData(); break;
                case "updateData": updataData(); break;
                case "updateContribution": updateContribution(); break;
                case "updateContributor": updateContributor(); break;
                case "isAdmin": isAdmin(); break;
                case "isContributor": isContributor(); break;
                case "login": login(); break;
                case "logout": logout(); break;
                case "changeLanguage": changeLanguage(); break;
                case "getLanguage": getLanguage(); break;
                case "getAllTableOfThisLanguage": getTableOfLanguage(); break;
                case "getContributors": getContributors(); break;
                case "newContributor": newContributor(); break;
                case "approveContribution": approveContribution(); break;
                case "rejectContribution": rejectContribution(); break;
                
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

    function getLanguage() {
        echo $_SESSION["language"];
    }

    function changeLanguage() {
        $_SESSION["language"] = $_POST["language"];
    }

    function getUserId() {
        echo $_SESSION["id"];
    }

    function isAdmin() {
        if ($_SESSION["isAdmin"]) {
            echo $_SESSION["id"];
        } else {
            echo "";
        }
    }

    function isContributor() {
        if ($_SESSION["isContributor"]) {
            echo $_SESSION["id"];
        } else {
            echo "";
        }
    }

    function login() {
        $id = $_POST["id"];
        $pw = crypt($_POST["pw"], "CRYPT_MD5");

        if (checkUser("admin", $id, $pw)) {
            $_SESSION["isAdmin"] = true;
            $_SESSION["id"] = $id;
            echo "admin";
        } else if (checkUser("contributor", $id, $pw)) {
            $_SESSION["isContributor"] = true;
            $_SESSION["id"] = $id;
            echo "contributor";
        } else {
            echo $pw;
            echo "wrong UserName or Password";
        }
    }

    function logout() {
        $_SESSION["id"] = null;
        $_SESSION["isAdmin"] = false;
        $_SESSION["isContributor"] = false;
    }

    function checkUser($tableName, $id, $pw) {
        global $db;
        setupDatabase();
        $query = "select * from ".$tableName." where userName = '".$id."'";
        $res = $db->query($query);
        if ($res = $db->query($query)) {
            $row = mysqli_fetch_row($res);
            if (!is_null($row) && $row[1] == $pw) {
                return true;
            }
        }
        return false;
    }

    function newContributor() {
        global $db;
        setupDatabase();

        $id = $_POST["id"];
        $pw = crypt($_POST["pw"], "CRYPT_MD5");

        $query = "insert into contributor values ('".$id."', '".$pw."')";
        if ($db->query($query)) {
            $languages = array("Vietnamese", "Chinese", "Indonesian");

            for($i = 0; $i < 3; $i++) {
                $query = "create table ".$languages[$i]."_".$id." (id INT PRIMARY KEY, content VARCHAR(500))";
                $db->query($query);
            }
        } else {
        }
    }

    function updateContribution() {
        global $db;
        setupDatabase();

        $tableName = $_POST["language"]."_".$_SESSION["id"];
        $data = json_decode($_POST["data"]);
        for ($i = 0; $i < count($data); $i++) {
            updateDatabase($tableName, $data[$i][0], $data[$i][1]);
        }
    }

    function getContributors() {
        if (!$_SESSION["isAdmin"]) {
            return;
        }

        $result = array();
        $table = getTableFromDatabase("contributor");
        while ($row = mysqli_fetch_row($table)) {
            $result[] = $row[0];
        }
        echo json_encode($result);
    }

    function getData() {
        if (!$_SESSION["isAdmin"] && !$_SESSION["isContributor"]) {
            return;
        }

        $output = array();
        $tableName = array("English", $_POST["language"], $_POST["language"]."_".$_SESSION["id"]);

        for($i = 0; $i < 3; $i++) {
            $result = array();
            $table = getTableFromDatabase($tableName[$i]);
            while ($row = mysqli_fetch_row($table)) {
                $result[] = array($row[0], $row[1]);
            }
            $output[$i] = $result;
        }

        echo json_encode($output);
    }

    function getTableOfLanguage() {
        $result = array();
        $result["?Contributors"] = array();

        $language = $_POST["language"];
        $contributors = getTableFromDatabase("contributor");
        
        while ($row = mysqli_fetch_row($contributors)) {
            $tableName = $language."_".$row[0];
            $contribution = getTableFromDatabase($tableName);

            if (mysqli_num_rows($contribution) > 0)   {
                $result["?Contributors"][] = $row[0];

                $contributionArr = array();
                while ($row2 = mysqli_fetch_row($contribution)) {
                    $contributionArr[] = array($row2[0], $row2[1]);
                }

                $result[$row[0]] = $contributionArr;
            }
        }

        $result["?English"] = array();
        $englishTable = getTableFromDatabase("English");
        while($row = mysqli_fetch_row($englishTable)) {
            $result["?English"][] = array($row[0], $row[1]);
        }

        echo json_encode($result);
    }

    function getTableFromDatabase($tableName) {
        global $db;
        setupDatabase();

        $query = "Select * from ".$tableName;
        return $db -> query($query);
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

    function approveContribution() {
        global $db;
        setupDatabase();

        $tableName = $_POST["language"];
            $id = $_POST["id"];
            $contributor = $_POST["contributor"];

            $query = "Select content from ".$tableName."_".$contributor." where id=".$id;
            $row = mysqli_fetch_row($db -> query($query));
            $content = $row[0];

            $query = "update ".$tableName." set content='".$content."' where id=".$id;
            $db -> query($query);

            $query = "delete from ".$tableName."_".$contributor." where id=".$id;
            $db -> query($query);

        
        // if (isAdmin() != "") {
        //     $tableName = $_POST["language"];
        //     $id = $_POST["id"];
        //     $contributor = $_POST["contributor"];

        //     $query = "Select content from ".$tableName."_".$contributor." where id=".$id;
        //     $row = mysqli_fetch_row($db -> query($query));
        //     $content = $row[0];

        //     $query = "update ".$tableName." set content='".$content."' where id=".$id;
        //     $db -> query($query);


        // }
    }

    function rejectContribution() {
        global $db;
        setupDatabase();

        $tableName = $_POST["language"];
            $id = $_POST["id"];
            $contributor = $_POST["contributor"];

            $query = "delete from ".$tableName."_".$contributor." where id=".$id;
            $db -> query($query);
        
        // if (isAdmin() != "") {
        //     $tableName = $_POST["language"];
        //     $id = $_POST["id"];
        //     $contributor = $_POST["contributor"];

        //     $query = "delete from ".$tableName."_".$contributor." where id=".$id;
        //     $db -> query($query);


        // }
    }
?>