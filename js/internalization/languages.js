$(document).ready(function() {
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


function changeLanguage(language) {
    $.ajax({
        type: "POST",
        url: "php/server.php",
        data: {
            action: "changeLanguage",
            language: language
        },
        success: function(data) {
            updateWholePage();
        }
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
    $.ajax({
        type: "POST",
        url: "php/server.php",
        data: {
            action: "getData",
            id: index
        },
        success: function(data){
            $('.'+index).html(data);
        }
    });
}
