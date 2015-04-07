$(document).ready(function() {
    $.ajax({
        type: "POST",
        url: "php/admin-contributor.php",
        data: {
            action: "isAdmin"
        },
        success: function(data) {
            if (data == "") {
                logouted();
            } else {
                logined(data);
            }
        },
        async: false
    });

    // handlers
    $(".language").click(function(e) {
        showTable($(this).html());
    });

    $("#logout-button").click(function() {
        $.ajax({
            type: "POST",
            url: "php/admin-contributor.php",
            data: {
                action: "logout",
            },
            success: function(data) {
                logouted();
            },
            async: false
        });
    });

    $("#login-button").click(function() {
        window.location = 'login.html';
    });

    $("#contributor-button").click(function() {
        showContributorTable();
    });

    $("#new-contributor-button").click(function() {
        var username = prompt("Please enter the account name", "Username");
        var password = prompt("Please enter the password", "Username");
        if (username != null && password != null) {
            $.ajax({
                type: "POST",
                url: "php/admin-contributor.php",
                data: {
                    action: "newContributor",
                    id: username,
                    pw: password
                },
                success: function(data) {
                    showContributorTable();
                },
                async: false
            });
        }
    });

    window.onbeforeunload = function(e) {
        updateContribution();
    };
});


function logouted() {
    $("#login-button").show();
    $("#logout-button").hide();
    $("#username-topbar").hide();
    $("#translation-area").hide();
}

function logined(username) {
    $("#login-button").hide();
    $("#logout-button").show();
    $("#username-topbar").html("Hello, " + username);
}

function showContributorTable() {
    $.ajax({
        type: "POST",
        url: "php/admin-contributor.php",
        data: {
            action: "getContributors"
        }, success: function(data) {
            var arr = JSON.parse(data);
            generateContributorTable(arr);
        },  
        async: false
    });
}

function showTable(language) {
    var arr = [];
    var head = [];
    var currentCol = 1;

    head[0] = "ID";
    head[1] = "English";

    $.ajax({
        type: "POST",
        url: "php/admin-contributor.php",
        data: {
            action: "getAllTableOfThisLanguage",
            language: language,
        }, success: function(data) {
            var a = JSON.parse(data);
            
            arr[1] = [];
            for(var i = 0; i < a["?English"].length; i++) {
                arr[1][a["?English"][i][0]] = a["?English"][i][1];
            }
            for(var i = 0; i < a["?Contributors"].length; i++) {
                var contributor = a["?Contributors"][i];
                currentCol++;
                arr[currentCol] = [];
                head[currentCol] = contributor;

                for (var j = 0; j < a[contributor].length; j++) {
                    arr[currentCol][a[contributor][j][0]] = a[contributor][j][1];
                }
            }

            generateTable(language, head, arr);

        },  
        async: false
    });
}

function generateContributorTable(arr) {
    var content = "";
    content += "<h2>Contributors</h2>";
    content += "<table class='table table-hover table-striped table-condensed'><thead><tr>";
    content += "</tr></thead><tbody>"; 

    for (var j = 0; j < arr.length; j++) {
        content += "<tr>";
        content += "<td>" + arr[j] + "</td>";
        content += "</tr>";
    }
    content += "</tbody></table>";

    $("#table-area").html(content);
}

function generateTable(language, head, arr) {
    var content = "";
    content += "<h2>"+language+"</h2>";
    content += "<table class='table table-hover table-striped table-condensed'><thead><tr>";

    for(var i = 0; i < head.length; i++) {
        if (i == 0) {
            content += "<th class='col-md-1'>" + head[i] + "</th>";  
        } else {
            content += "<th>" + head[i] + "</th>";   
        }
    }
    content += "</tr></thead><tbody>"; 
    for (var j = 0; j < 10000; j++) {
        if (typeof arr[1][j] !== 'undefined') {

            var flag = true;
            for (var i = 2; i < arr.length; i++) {
                if (typeof arr[i][j] !== 'undefined') {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                continue;
            }

            content += "<tr>";
            content += "<td>" + j + "</td>";
            for(var i = 1; i < arr.length; i++) {
                if (typeof arr[i][j] !== 'undefined') {
                    content += "<td>" + arr[i][j] + "</td>";
                } else {
                    content += "<td></td>";
                }
            }
            content += "</tr>";
        }
    }   
    content += "</tbody></table>";

    $("#table-area").html(content);
}
