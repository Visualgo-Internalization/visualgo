var content = [];

$(document).ready(function() {
    //detect the language.
    var language = getLanguage();
    if (language != 'English')
        changeLanguage(language);

    $('#English').click(function() {
        changeLanguage("English");
    });
    $('#Vietnamese').click(function() {
        changeLanguage("Vietnamese");
    });
    $('#Chinese').click(function() {
        changeLanguage("Chinese");
    });
    $('#Indonesian').click(function() {
        changeLanguage("Indonesian");
    });
})

function getLanguage() {
    var currentLanguage;

    $.ajax({
        type: "POST",
        url: "php/server.php",
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
        url: "php/server.php",
        data: {
            action: "changeLanguage",
            language: language
        },
        success: function(data) {
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