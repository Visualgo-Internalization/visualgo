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



    $(document).on('click', 'img.approve', function() {
                            
                            alert($(this).attr('class'));
                            var classList =$(this).attr('class').split(/\s+/);
                            alert(classList[1] + " " + classList[2] + " " + classList[3]);

                            $.ajax({
                                type: "POST",
                                url: "php/admin-contributor.php",
                                data: {
                                    action: "approveContribution",
                                    language: classList[1],
                                    contributor: classList[2],
                                    id: parseInt(classList[3])
                                    

                                },
                                success: function(data) {
                                    showTable(classList[1]);
                                    alert("success");
                                },
                                async: false
                            });


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

            // head.push("Approve");
            // head.push("Reject");

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
            content += "<th class='col-md-1' align='middle' style='text-align: center'>" + head[i] + "</th>";  
        } else {
            content += "<th align='middle' style='text-align: center'>" + head[i] + "</th>";   
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
            content += "<td style='text-align: center'>" + j + "</td>";
            for(var i = 1; i < arr.length; i++) {
                if (typeof arr[i][j] !== 'undefined') {
                    content += "<td style='text-align: center'>" + arr[i][j] + "<br>";
                    if (i > 1) {
                        content += "<img class='approve " + language + " " + head[i] + " " + j + "' src='img/approve.png' width='20' height='20' align='middle'>&nbsp&nbsp&nbsp";
                        content += "<img class='reject " + language + " " + head[i] + " " + j + "' src='img/reject.png' width='20' height='20' align='middle'>";
                        content += "</td>";
                    }
                    else {
                        content += "</td>";
                    }
                } else {
                    content += "<td></td>";
                }
            }
            // content += "<td>" + "<button type='submit' class='btn btn-primary'>Approve</button>" + "</td>";
            content += "</tr>";
        }
    }   
    content += "</tbody></table>";

    $("#table-area").html(content);
}
