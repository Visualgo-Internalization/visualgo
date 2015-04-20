$(document).ready(function() {
    $.ajax({
        type: "POST",
        url: "php/admin-contributor.php",
        data: {
            action: "isAdmin"
        },
        success: function(data) {
            if (data == "") {
                $("#admin-menu").hide();
            } else {
                $("#admin-menu").show();
            }
        },
        async: false
    });

    $('#admin-save').click(function() {
        $.ajax({
            type: "POST",
            url: "php/admin-contributor.php",
            data: {
                action: "isAdmin"
            },
            success: function(data) {
                if (data == "") {
                    window.location = window.location.href;
                } else {
                    for (var index = 0; index <= 10000; index++) {
                        if ($('.'+index)[0]) {
                            $.ajax({
                                type: "POST",
                                url: "php/server.php",
                                data: {
                                    action: "saveNewData",
                                    id: index,
                                    content: $('.'+index).text()
                                },
                                success: function(data) {
                                },
                                async: false
                            });
                        }
                    }
                    alert("done");
                }
            },
            async: false
        }); 
    });
})