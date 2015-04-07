$(document).ready(function() {
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
}

function logined(username) {
    $("#welcome-text").html("Welcome to VisuAlgo contribution page! <br>Please choose your language and start contributing.<br>Thanks for your contribution!!");
    $("#login-button").hide();
    $("#logout-button").show();
    $("#username-topbar").html("Hello, " + username);
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

function updateTranslationTable() {
    var language = getLanguage();
    $.ajax({
        type: "POST",
        url: "php/admin-contributor.php",
        data: {
            action: "getData",
            language: language
        },
        success: function(data) { 
            updateTranslationTables(JSON.parse(data));
        },
        async: false
    });
}

var sections = ["Graph Traversal"];
var ranges = [[100, 399]];

function updateTranslationTables(arr) {
    var sentence = [];
    var currentTranslation = [];
    var yourTranslation = [];
    for(var i = 0; i < arr[0].length; i++) {
        sentence[arr[0][i][0]] = arr[0][i][1];
    }
    for(var i = 0; i < arr[1].length; i++) {
        currentTranslation[arr[1][i][0]] = arr[1][i][1];
    }
    for(var i = 0; i < arr[2].length; i++) {
        yourTranslation[arr[2][i][0]] = arr[2][i][1];
    }
    
    var content = "";
    for (var i = 0; i < sections.length; i++) {
        content += "<h2>"+sections[i]+"</h2>";
        content += "<table class='table table-hover table-striped table-condensed'> \
            <thead> \
                <tr> \
                    <th class='col-md-2'> ID</th> \
                    <th class='col-md-3'>Content</th> \
                    <th class='col-md-3'>Current Translation</th> \
                    <th class='col-md-4'>Your Translation</th> \
                </tr> \
            </thead> \
            <tbody>"; 
        for (var j = ranges[i][0]; j <= ranges[i][1]; j++) {
            if (typeof sentence[j] !== 'undefined') {
                var curTranslation = typeof currentTranslation[j] !== 'undefined' ? currentTranslation[j] : "";
                var urTranslation = typeof yourTranslation[j] !== 'undefined' ? yourTranslation[j] : "";
                content += "<tr>";
                content += "<td>" + j + "</td>";
                content += "<td>" + sentence[j] + "</td>";
                content += "<td>" + curTranslation + "</td>";
                content += "<td><textarea id='" + j + "'>"+urTranslation+"</textarea></td>";
                content += "</tr>";
            }
        }   
        content += "</tbody></table>";
    }
    $("#translation-area").html(content);
}

function getLanguage() {
    var currentLanguage;
    $.ajax({
        type: "POST",
        url: "php/admin-contributor.php",
        data: {
            action: "getLanguage",
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