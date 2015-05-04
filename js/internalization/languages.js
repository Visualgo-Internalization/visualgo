var content = [];

$(document).ready(function() {
    //detect the language.
    var language = getLanguage();
    if (language != 'English')
        changeLanguage(language);

    $(document).on('click', '#English', function() {
        changeLanguage("English");
    });

    $(document).on('click', '#Vietnamese', function() {
        changeLanguage("Vietnamese");
    });

    $(document).on('click', '#Chinese', function() {
        changeLanguage("Chinese");
    });

    $(document).on('click', '#Indonesian', function() {
        changeLanguage("Indonesian");
    });

    // $('#English').click(function() {
    //     changeLanguage("English");
    // });
    // $('#Vietnamese').click(function() {
    //     changeLanguage("Vietnamese");
    // });
    // $('#Chinese').click(function() {
    //     changeLanguage("Chinese");
    // });
    // $('#Indonesian').click(function() {
    //     changeLanguage("Indonesian");
    // });


    $('#language-preferences').html(languagePreferences());

    $('#language-options').html(showLanguageOptions());

    $(document).on('click', '#trigger-language', function() {
    $('#dark-overlay').fadeIn(function() {
        $('#language-preferences').fadeIn();
    });
});

$(document).on('click', '#preference-save', function() {
    var languages = ["English", "Chinese", "Indonesian", "Vietnamese"];
    var showLanguages = [];
    var defaultLanguage = $("input:radio[name=defaultLanguage]:checked").val();
    for(var x = 0; x < languages.length; x++) {
        if($("#" + languages[x] + '-bar').prop('checked')) {
            showLanguages.push(languages[x]);
        }
    }
    localStorage.setItem("defaultLanguage", defaultLanguage);

    changeLanguage(defaultLanguage);

    localStorage["languagePreferences"] = JSON.stringify(showLanguages);

    $('.overlays').fadeOut(function() {
        $('#dark-overlay').fadeOut();
    });

    $('#language-options').html(showLanguageOptions());
});
})

function getLanguage() {
    var currentLanguage;

    // $.ajax({
    //     type: "POST",
    //     url: "php/server.php",
    //     data: {
    //         action: "getLanguage",
    //     },
    //     success: function(data) {
    //         currentLanguage = data;
    //     }, 
    //     async: false
    // });

    if(localStorage["defaultLanguage"] != undefined) {
        currentLanguage = localStorage["defaultLanguage"];        
    }
    else {
        currentLanguage = "English";
    }

    return currentLanguage;
}

function changeLanguage(language) {
    $.ajax({
        type: "POST",
        url: "php/server.php",
        data: {
            action: "changeLanguage",
            language: language
        },
        success: function(data) {
            localStorage["defaultLanguage"] = language;        
            content = JSON.parse(data);
            updateWholePage();
        },
        async: false
    });
}

function updateWholePage() {
    for (var index = 0; index <= 10000; index++) {
        if ($('.'+index)[0]) {
            updateData(index);
        }
    }
}

function updateData(index) {
    if (typeof content[index] !== 'undefined') {
        $('.'+index).html(content[index]);
    } else {
        $('.'+index).html(translateData(getEnglishTerm(index), index));
    }
}

function updateJSData(code, id, text) {
    $(code).html(getTranslatedHtml(id, text));
}

function getTranslatedHtml(id, text) {
    var htmlText;
    if (typeof content[id] !== 'undefined') {
        htmlText = content[id];
    } else {
        htmlText = translateData(text, id);
    }
    return "<span class='"+id+"'>"+htmlText+"</span>";
}

function getEnglishTerm(index) {
    var receivedData;
    $.ajax({
        type: "POST",
        url: "php/server.php",
        data: {
            action: "getEnglishTerm",
            id: index
        },
        success: function(data) {
            receivedData = data;
        },
        async: false
    })
    return receivedData;
}

function translateData(text, index) {
    var receivedData;
    $.ajax({
        type: "POST",
        url: "php/server.php",
        data: {
            action: "translateData",
            text: text,
            id: index
        },
        success: function(data) {
            receivedData = data;
        },
        async: false
    })
    return receivedData;
}

function languagePreferences() {
    var content = "<h4>Language Settings</h4><img class='close-overlay' src='img/cross_white.png' /><div class='content'>";
    content += "<p>Select the languages you want to see in the languages bar</p>";
    content += "<input type='checkbox' name='language' id='English-bar' value='English'>English<br>";
    content += "<input type='checkbox' name='language' id='Chinese-bar' value='Chinese'>Chinese<br>";
    content += "<input type='checkbox' name='language' id='Indonesian-bar' value='Indonesian'>Indonesian<br>";
    content += "<input type='checkbox' name='language' id='Vietnamese-bar' value='Vietnamese'>Vietnamese<br>";
    content += "<p>Select the default language</p>";
    content += "<input type='radio' name='defaultLanguage' id='English-default' value='English'>English<br>";
    content += "<input type='radio' name='defaultLanguage' id='Chinese-default' value='Chinese'>Chinese<br>";
    content += "<input type='radio' name='defaultLanguage' id='Indonesian-default' value='Indonesian'>Indonesian<br>";
    content += "<input type='radio' name='defaultLanguage' id='Vietnamese-default' value='Vietnamese'>Vietnamese<br>";
    content += "<input type='submit' id='preference-save' value='Save'>";
    content += "</div>";
    return content;
}

function showLanguageOptions() {
    var languagePreferences = JSON.parse(localStorage["languagePreferences"]);
    var content = "";
    if(languagePreferences.length == 0) {
        languagePreferences = ["English", "Chinese", "Indonesian", "Vietnamese"];
    }
    for(var x = 0; x < languagePreferences.length; x++) {
        content += "<div id='" + languagePreferences[x] + "' class='languages'>";
        content += "<p>" + languagePreferences[x] + "</p>";
        content += "</div>";
    }
    content += "<div id='trigger-language' class='languages'><p>Settings</p></div>";
    return content;
}

