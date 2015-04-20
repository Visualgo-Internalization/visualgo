$(document).ready(function() {

    $('#page-wrapper') .css({'margin-top': '0', 'padding-top': (($('.navbar-fixed-top').height()) - 20 )+'px'});
    $(window).resize(function(){
        $('#page-wrapper') .css({'margin-top': '0', 'padding-top': (($('.navbar-fixed-top').height()) - 20 )+'px'});
    });

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

        $(document).on('click', 'img.delete-contributor', function() {
            var classList =$(this).attr('class').split(/\s+/);
            var username = classList[1];
            if (username != null) {
                $.ajax({
                    type: "POST",
                    url: "php/admin-contributor.php",
                    data: {
                        action: "deleteContributor",
                        id: username,
                    },
                    success: function(data) {
                        showContributorTable();
                    },
                    async: false
                });
            }

        });
    });

    $("#new-contributor-button").click(function() {


        var content = "<div class='col-lg-12'>";
        content += "<h1 class='page-header'>New Contributor</h1>";
        content += "</div>";
            
        content += "</div>";
        
        content += "<div class='row'>";
            content += "<div class='col-lg-12'>";
                content += "<div class='panel panel-default'>";
                    content += "<div class='panel-body'>";
                            content += "<form role='form'>";
                                content += "<div class='form-group'>";
                                    content += "<label>Contributor ID</label>";
                                    content += "<input type='text' class='form-control' id='contributor-id'>";
                                content += "</div>";
                                content += "<div class='form-group'>";
                                    content += "<label>Authentication Token</label>";
                                    content += "<input type='text' class='form-control' id='contributor-pass'>";
                                content += "</div>";
                                content += "<div class='form-group'>";
                                    content += "<label>Selects</label>";
                                    content += "<select class='form-control' id='contributor-lang'>";
                                        content += "<option>Vietnamese</option>";
                                        content += "<option>Chinese</option>";
                                        content += "<option>Indonesian</option>";
                                    content += "</select>";
                                content += "</div>";
                                content += "<button type='submit' class='btn btn-default' id='submit-contributor'>Create Contributor</button>";
                            content += "</form>";
                        content += "</div>";
                    content += "</div>";
                content += "</div>";
            content += "</div>";
            $("#page-wrapper").html(content);
        // var username = prompt("Please enter the account name", "Username");
        // var password = prompt("Please enter the password", "Username");

        
        $(document).on('click', '#submit-contributor', function() {
            var username = $("#contributor-id").val();
            var password = $("#contributor-pass").val();
            var language = $("#contributor-lang option:selected").text();
            if (username != null && password != null) {
                $.ajax({
                    type: "POST",
                    url: "php/admin-contributor.php",
                    data: {
                        action: "newContributor",
                        id: username,
                        pw: password,
                        lang: language
                    },
                    success: function(data) {
                        showContributorTable();
                    },
                    async: false
                });
            }

        });
    });



    $(document).on('click', 'img.approve', function() {
                            
                            
                            var classList =$(this).attr('class').split(/\s+/);
                            

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
                                },
                                async: false
                            });


                        });


    $(document).on('click', 'img.reject', function() {
                            
                            
                            var classList =$(this).attr('class').split(/\s+/);
                            

                            $.ajax({
                                type: "POST",
                                url: "php/admin-contributor.php",
                                data: {
                                    action: "rejectContribution",
                                    language: classList[1],
                                    contributor: classList[2],
                                    id: parseInt(classList[3])
                                    

                                },
                                success: function(data) {
                                    showTable(classList[1]);
                                },
                                async: false
                            });


                        });



    window.onbeforeunload = function(e) {
        updateContribution();
    };
});


function isLoggedIn() {
    $.ajax({
        type: "POST",
        url: "php/admin-contributor.php",
        data: {
            action: "isAdmin"
        },
        success: function(data) {
            if (data == "") {
                return false;
            } else {
                return true;
            }
        },
        async: false
    });
}

function logouted() {
    $("#login-button").show();
    $("#logout-button").hide();
    $("#username-topbar").hide();
    $("#translation-area").hide();

    $(".sidebar").hide();
    $("#page-wrapper").hide();
}

function logined(username) {
    $("#login-button").hide();
    $("#logout-button").show();
    $("#username-topbar").html(" Hello, " + username);
    $(".jumbotron").hide();
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
    content += "<table class='table table-hover table-striped table-condensed table-bordered'><thead><tr>";
    content += "<th style='text-align: center'> Contributor ID </th>";
    content += "<th style='text-align: center'> Delete Contributor </th>";
    content += "</tr></thead><tbody>"; 

    for (var j = 0; j < arr.length; j++) {
        content += "<tr>";
        content += "<td style='text-align: center'>" + arr[j] + "</td>";
        content += "<td style='text-align: center'><img class='delete-contributor " + arr[j] + "' src='img/reject.png' width='20' height='20' align='middle'></td>";
        content += "</tr>";
    }
    content += "</tbody></table>";

    $("#table-area").html(content);
    $("#page-wrapper").html(content);    
}

function generateTable(language, head, arr) {
    var content = "";
    content += "<h2>"+language+"</h2>";
    content += "<table class='table table-hover table-striped table-condensed table-bordered'><thead><tr>";

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
    $("#page-wrapper").html(content);
}
