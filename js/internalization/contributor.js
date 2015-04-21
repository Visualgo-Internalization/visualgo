$(document).ready(function() {

    $('#page-wrapper') .css({'margin-top': '0', 'padding-top': (($('.navbar-fixed-top').height()) - 20 )+'px'});
    $(window).resize(function(){
        $('#page-wrapper') .css({'margin-top': '0', 'padding-top': (($('.navbar-fixed-top').height()) - 20 )+'px'});
    });


    $.ajax({
        type: "POST",
        url: "php/admin-contributor.php",
        data: {
            action: "isContributor"
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
        updateContribution();
        changeLanguage($(this).html());
        updateTranslationTable();
    });

    $(document).on('click', '.section', function() {
        updateContribution();
        var classList = $(this).attr('class').split(/\s+/);
        // classList.splice(0, 1);
        // classList.splice(classList.length - 1, 1);
        // var id = classList.join(" ");
        var id1 = classList[1];
        var id2 = classList[2];
        var id = id1 + " " + id2;
        var index = sections.indexOf(id);
        //changeSection($(this).html());
        
        updateTranslationTable(index);
    });

    $(document).on('click', '.btn-success', function() {

        var content = "<div class='alert alert-success alert-dismissable'>";
        content += "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>";
        content += "You translation has been saved!";
        content += "</div>";
        updateContribution();
        var classList = $(this).attr('class').split(/\s+/);
        classList.splice(0, 2);
        var id = classList.join(" ");
        // var id1 = classList[1];
        // var id2 = classList[2];
        // var id = id1 + " " + id2;
        var index = sections.indexOf(id);
        updateTranslationTable(index);
        $("#page-wrapper").prepend(content); 
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

    window.onbeforeunload = function(e) {
        updateContribution();
    };
});


function logouted() {
    $("#welcome-text").html("Hello, please login first to start your contribution!!");
    $("#login-button").show();
    $("#logout-button").hide();
    $("#username-topbar").hide();
    $("#translation-area").hide();
    
    $(".sidebar").hide();
    $("#page-wrapper").hide(); 
}

function logined(username) {
    $("#welcome-text").html("Welcome to VisuAlgo contribution page! <br>Please choose your language and start contributing.<br>Thanks for your contribution!!");
    $("#login-button").hide();
    $("#logout-button").show();
    $("#username-topbar").html("Hello, " + username);
    $(".jumbotron").hide();
    $("#page-wrapper").show();     
    showSections();
}

function showSections() {
    var content = "<li>";
        content += "<a href='#'><i class='fa fa-bar-chart-o fa-fw'></i> Sections<span class='fa arrow'></span></a>";
        content += "<ul class='nav nav-second-level'>";
        for (x = 0; x < sections.length; x++) {
            content += "<li><a class='section " + sections[x] +"' href='#'>" + sections[x] +"</a></li>";
        }
            
        content += "</ul>";
    content += "</li>";
    $("#side-menu").append(content);
}

function updateContribution() {
    var updatingContent = [];
    for(var i = 0; i <= 10000; i++) {
        if ($("#" + i).length && $("textarea#" + i).val() != "") {
            updatingContent.push([i, $("textarea#" + i).val()]);
        }
    }

    var language = getLanguage();
    $.ajax({
        type: "POST",
        url: "php/admin-contributor.php",
        data: {
            action: "updateContribution",
            language: language,
            data: JSON.stringify(updatingContent)
        },
        async: false
    });
}

function updateTranslationTable(index) {
    var language = getLanguage();
    $.ajax({
        type: "POST",
        url: "php/admin-contributor.php",
        data: {
            action: "getData",
            language: language
        },
        success: function(data) { 
            updateTranslationTables(JSON.parse(data), index);
        },
        async: false
    });
}

var sections = ["Graph Traversal", "Cycle Finding"];
var ranges = [[100, 399],[1100,1400]];

function updateTranslationTables(arr, index) {
    var sentence = [];
    var currentTranslation = [];
    var yourTranslation = [];
    var status = [];
    for(var i = 0; i < arr[0].length; i++) {
        sentence[arr[0][i][0]] = arr[0][i][1];
    }
    for(var i = 0; i < arr[1].length; i++) {
        currentTranslation[arr[1][i][0]] = arr[1][i][1];
    }
    for(var i = 0; i < arr[2].length; i++) {
        yourTranslation[arr[2][i][0]] = arr[2][i][1];
        status[arr[2][i][0]] = arr[2][i][2];
    }
    
    var content = "";
    for (var i = 0; i < 1; i++) {
        content += "<h2>"+sections[index];
        content += "<span style='float: right;'> <button type='button' class='btn btn-success " + sections[index] + "'>Save your translations</button> </span>" + "</h2>";
        content += "<table class='table table-hover table-striped table-condensed table-bordered'> \
            <thead> \
                <tr> \
                    <th class='col-md-1'> ID</th> \
                    <th class='col-md-3'>Content</th> \
                    <th class='col-md-3'>Current Translation</th> \
                    <th class='col-md-3'>Your Translation</th> \
                    <th class='col-md-2'>Status</th> \
                </tr> \
            </thead> \
            <tbody>"; 
        for (var j = ranges[index][0]; j <= ranges[index][1]; j++) {
            if (typeof sentence[j] !== 'undefined') {
                var curTranslation = typeof currentTranslation[j] !== 'undefined' ? currentTranslation[j] : "";
                var urTranslation = typeof yourTranslation[j] !== 'undefined' ? yourTranslation[j] : "";
                var color = "";
                content += "<tr>";
                content += "<td>" + j + "</td>";
                content += "<td>" + sentence[j] + "</td>";
                content += "<td>" + curTranslation + "</td>";
                content += "<td><textarea id='" + j + "'>"+urTranslation+"</textarea></td>";
                if(status[j] == 'Approved'){
                    color = "green";
                }else if(status[j] == "Rejected"){
                    color = "red";
                }else{
                    color = "black";
                }
                content += "<td><center><b style='color:"+ color +"'>"+ (status[j] != null ? status[j] : "") +"</b></center></td>";
                content += "</tr>";
            }
        }   
        content += "</tbody></table>";
    }
    $("#translation-area").html(content);
    $("#page-wrapper").html(content); 
}

function getLanguage() {
    var currentLanguage;
    $.ajax({
        type: "POST",
        url: "php/admin-contributor.php",
        data: {
            action: "getContributorLanguage",
        },
        success: function(data) {
            currentLanguage = data;
        }, 
        async: false
    });
    return currentLanguage;
}

function changeLanguage(language) {
    $.ajax({
        type: "POST",
        url: "php/admin-contributor.php",
        data: {
            action: "changeLanguage",
            language: language
        },
        success: function(data) {
        },
        async: false
    });
}