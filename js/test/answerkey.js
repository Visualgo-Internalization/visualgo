var MODE = "ANSWER";
var studentid = "";
var studentpw = "";
var anskeyArr = [];
var explanationArr = [];

function getQns() {
    $.ajax({
        url: PHP_DOMAIN + "php/Test.php?mode=" + MODE_TEST_GENERATE_QUESTIONS,
        type: "POST",
        data: {username: studentid, password: studentpw, testID: $('#test-selection').val(), type: TEST_GENERATE_QUESTIONS_TYPE_ANSWER}
    }).done(function(data) {
        if (data != 0) {
            data = JSON.parse(data);
            nQns = data.length;
            init();
            for (var i = 1; i <= nQns; i++) {
                extractInfo(i, data[i - 1]);
            }
            getAns();
        } else {
            customAlert("The answer key is locked at the moment.");
        }
    });
}

function getAns() {
    $.ajax({
        url: PHP_DOMAIN + "php/Test.php?mode=" + MODE_TEST_GET_STUDENT_ANSWERS,
        type: "POST",
        data: {username: studentid, password: studentpw, testID: $('#test-selection').val()}
    }).done(function(stAnsData) {
        $.ajax({
            url: PHP_DOMAIN + "php/Test.php?mode=" + MODE_TEST_GET_ANSWERS,
            type: "POST",
            data: {username: studentid, password: studentpw, testID: $('#test-selection').val()}
        }).done(function(ansData) {
            var score = 0;

            //store into anskeyArr array
            ansData = JSON.parse(ansData);
            for (var i = 0; i < ansData.length; i++) {
                anskeyArr[i + 1] = ansData[i];
                if (ansData[i] == CORRECT)
                    score++;
            }

            //switch screens
            $('#question-nav').html("");
            prepareQnNav(nQns);
            $('#login-err').html("");
            $('#login-screen').fadeOut("fast");
            $('#test-screen').fadeIn("fast");
            $('#infoscore').html(score + "/" + ansData.length);

            //show first question
            gw.startAnimation(qnGraphArr); //start graph widget
            gw.pause();
            qnNo = 1; //start with qn 1
            showQn(qnNo);
        });

        stAnsData = JSON.parse(stAnsData);
        //store into anskeyArr array
        for (var i = 0; i < stAnsData.length; i++) {
            var raw = stAnsData[i];
            var proc;
            if (raw.length == 0) {
                proc = NO_ANSWER;
            } else if (raw[0] == UNANSWERED) {
                proc = UNANSWERED;
            } else {
                proc = new Array();
                if (isGraphInterface(qnTypeArr[i + 1])) {
                    var graphStateString = "";
                    for (var j = 0; j < raw.length; j++) {
                        graphStateString += raw[j] + ",";
                    }
                    graphStateString = graphStateString.replace(/,(\s+)?$/, ''); // remove last comma
                    var graphState = JSON.parse(graphStateString);
                    qnGraphArr[i + 1] = graphState;
                } else {
                    for (var j = 0; j < raw.length; j++) {
                        if (!isNaN(parseInt(raw[j]))) { //double negative, i.e. is a number
                            raw[j] = parseInt(raw[j]);
                        }
                        proc.push(raw[j]);
                    }
                }
                if (qnTypeArr[i + 1] == INTERFACE_MULT_E) {
                    //make into pairs so that answer interface displays correctly
                    var newProc = new Array();
                    for (var k = 0; k < proc.length; k += 2) {
                        newProc.push([proc[k], proc[k + 1]]);
                    }
                    proc = newProc;
                }
            }
            ansArr[i + 1] = proc;
        }
    });
}

function checkIsTestOpen() {
    $.ajax({//update timer
        url: PHP_DOMAIN + "php/Test.php",
        data: {mode: MODE_CHECK_TEST_OPEN}
    }).done(function(data) {
        data = JSON.parse(data);
        if (data.answerIsOpen == 0) {
            $('#test-status-error').show();
        } else {
            $('#login-screen').show();
        }
    });
}

function loadAllAvailableAnswers() {
    $.ajax({
        url: PHP_DOMAIN + "php/Test.php",
        data: {mode: MODE_GET_ALL_OPEN_ANSWERS}
    }).done(function(data) {
        data = JSON.parse(data);
        if (data.length == 0) {
            $('#test-selection').append($('<option />').val(-1).text('--'));
        }
        for (var i = 0; i < data.length; i++) {
            $('#test-selection').append($('<option />').val(data[i].testID).text(data[i].testID + ' - ' + data[i].testName));
            if (i == data.length - 1) {
                $('#test-selection').val(data[i].testID);
            }
        }
    });
}

$(document).ready(function() {
    $('#question-nav').css("background-color", surpriseColour);
    checkIsTestOpen();
    loadAllAvailableAnswers();
    /*-------LOG IN AUTHENTICATION-------*/
    $('#login-go').click(function(event) {
        event.preventDefault();
        studentid = $('#login-id').val();
        studentpw = $('#login-pw').val();
        //authentificate
        $.ajax({
            url: PHP_DOMAIN + "php/Test.php?mode=" + MODE_USER_ANSWER_LOGIN,
            type: "POST",
            data: {username: studentid, password: studentpw, testID: $('#test-selection').val()}
        }).done(function(passed) {
            passed = parseInt(passed);
            if (passed == 1) {
                getQns();
                $.ajax({//get name to display
                    url: PHP_DOMAIN + "php/Test.php?mode=" + MODE_TEST_GET_INFO,
                    type: "POST",
                    data: {username: studentid, password: studentpw, testID: $('#test-selection').val()}
                }).done(function(data) {
                    data = JSON.parse(data);
                    var studentname = data.name;
                    $('#student-name').html(studentname);
                });
            } else {
                $('#login-err').html("Incorrect username or password");
            }
        });
    });

});