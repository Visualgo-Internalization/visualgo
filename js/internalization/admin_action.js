$(document).ready(function() {
    $('#admin-save').click(function() {
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
                    }
                });
            }
        }
    });
})