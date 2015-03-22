var gw = new GraphWidget();
$('svg').css('height', '350px');

//The following arrays use 1-based indexing. Index 0 is a dummy value.
var qnJSONArr = new Array();
var qnTextArr = new Array(); //of question text for each qn
var qnGraphArr = new Array(); //of JSON objects for each qn
var qnTypeArr = new Array(); //of each qn's input type, for UI display and answer recording
var qnParamsArr = new Array(); //empty when no params, array of key-val options for mcqs
var qnNoAnsArr = new Array(); //1 for allow no answer option, 0 otherwise
var ansArr = new Array(); //answers to be sent to server

var seed;
var topics = new Array();
var questionDifficulty;
var nQns; //total number of questions

var qnNo; //1-based
var nAnswered = 0;

function customAlert(msg) {
    $('#custom-alert p').html(msg);
    var m = -1 * ($('#custom-alert').outerHeight() / 2);
    $('#custom-alert').css('margin-top', m + 'px');
    $('#dark-overlay').fadeIn(function() {
        $('#custom-alert').fadeIn(function() {
            setTimeout(function() {
                $('#custom-alert').fadeOut(function() {
                    $('#dark-overlay').fadeOut();
                });
            }, 1000);
        });
    });
}

/*-------START TEST FUNCTIONS-------*/
function getNumberOfQns() {
    //how many questions?
    return 10;
}

function setUndoClearDisabled(setDisabled) {
    $('#undo-ans').css('background', surpriseColour);
    $('#clear-ans').css('background', surpriseColour);
    $('#undo-ans').attr('disabled', setDisabled);
    $('#clear-ans').attr('disabled', setDisabled);
}

function init() {
    //fill in dummy values for array index 0
    qnTextArr[0] = "Is this a dummy question?";
    qnGraphArr[0] = jQuery.parseJSON('{"vl":{},"el":{}}');
    qnTypeArr[0] = 0;
    qnParamsArr[0] = false;
    qnNoAnsArr[0] = DISALLOW_NO_ANS;
    for (var i = 0; i <= nQns; i++) {
        ansArr[i] = UNANSWERED;
    } //Initialise ansArr with all false - not answered yet
}

function prepareQnNav(n) { // n is the number of questions
    $('#question-nav').html("");
    $('#question-nav').append('<a id="prev-qn" style="margin-right: 20px; opacity: 1.0; cursor: pointer;">PREV QN</a>');
    for (var i = 0; i < n; i++) {
        $('#question-nav').append('<a class="qnno">' + (i + 1) + '</a>');
    }
    $('#question-nav').append('<a id="next-qn" style="margin-left: 20px; opacity: 1.0; cursor: pointer;">NEXT QN</a>');
    $('#question-nav .qnno').eq(0).addClass('selected');

    $('#question-nav .qnno').click(function() {
        $('#question-nav .qnno').removeClass('selected');
        $(this).addClass('selected');
        qnNo = parseInt($(this).html());
        showQn(qnNo);
    });
    $('#prev-qn').click(navigatePrevQn);
    $('#next-qn').click(navigateNextQn);
}

function navigatePrevQn() {
    if (qnNo > 1) {
        qnNo--;
        $('#question-nav .qnno').removeClass('selected');
        $('#question-nav .qnno').eq(qnNo - 1).addClass('selected'); //eq uses zero-indexing
        showQn(qnNo);
    }
}

function navigateNextQn() {
    if (qnNo < nQns) {
        qnNo++;
        $('#question-nav .qnno').removeClass('selected');
        $('#question-nav .qnno').eq(qnNo - 1).addClass('selected'); //eq uses zero-indexing
        showQn(qnNo);
    }
}

function showQn(q) { //q is qn no	
    $('#qn-no').html(q + ".");
    $('#qn-text p').html(qnTextArr[q]);
    gw.jumpToIteration(q, 1);
    showAnswerInterface(q);
    if (hasBeenAnswered(q)) {
        showRecordedAns(q);
        setUndoClearDisabled(false);
    } else {
        setUndoClearDisabled(true);
    }
}

/*-------ANSWER HANDLING FUNCTIONS-------*/
function hasBeenAnswered(q) {
    return !(ansArr[q] == UNANSWERED);
}

function setAns(q, ans) { //q is localQnNo
    if (!hasBeenAnswered(q)) {
        nAnswered++;
    }
    ansArr[q] = ans;
    checkComplete();
    
    $('#question-nav .qnno').eq(q - 1).addClass('answered');
    setUndoClearDisabled(false);
}

function clearAns(q) { //q is localQnNo
    if (hasBeenAnswered(q)) {
        nAnswered--;
    }
    $('#current-selection').html("").hide();
    ansArr[q] = UNANSWERED;
    checkComplete();

    setUndoClearDisabled(true);
}

function checkComplete() {
    if (nAnswered == nQns) {
        $('#submit-test').show();
    } else {
        $('#submit-test').hide();
    }
}

function submitBugReport() {
    function correctSVG() {
        var correctedSVG = d3.select("svg")
                .attr("version", 1.1)
                .attr("xmlns", "http://www.w3.org/2000/svg");
        correctedSVG.selectAll("circle").attr("y", null).attr("x", null).attr("width", null).attr("height", null);
        $("#svg").attr("xmlns:xlink", "http://www.w3.org/1999/xlink");
    }
    var bugReportMsg = '';
    if ($('#bug-report-msg').val() != 'Write a short message about bug...') {
        bugReportMsg = $('#bug-report-msg').val();
    }

    // get question graph image svg
    correctSVG();
    var svgHtml = $("#viz").html();
    svgHtml = svgHtml.substring(0, 4) + " xmlns:xlink='http://www.w3.org/1999/xlink'" + svgHtml.substring(4); // add xml namespace
    var imgsrc = 'data:image/svg+xml;base64,' + btoa(svgHtml);

    // transform SVG to png
    $('body').append('<canvas id="graph_canvas" width="900" height="500" style="display:none"></canvas>');
    var canvas = document.querySelector("canvas"), context = canvas.getContext("2d");
    var image = new Image;
    image.src = imgsrc;
    context.drawImage(image, 0, 0);
    var imgURL = canvas.toDataURL("image/png");
    $("#graph_canvas").remove();

    $.ajax({
        url: PHP_DOMAIN + "php/BugReport.php?mode=" + MODE_SUBMIT_BUG_REPORT,
        type: "POST",
        data: {qnTopic: qnJSONArr[qnNo].qTopic, qnType: qnJSONArr[qnNo].qType, imgURL: imgURL, seed: seed, qnParams: qnParamsArr[qnNo].toString(), questionDifficulty: questionDifficulty, qnNo: qnNo, topics: topics.toString(), qnGraph: JSON.stringify(qnGraphArr[qnNo]), qnText: qnTextArr[qnNo], nQns: nQns, ans: JSON.stringify(ansArr[qnNo]), anskey: JSON.stringify(anskeyArr[qnNo]), bugReportMsg: bugReportMsg}
    }).done(function() {
        $('#bug-report-msg').text('Write a short message about bug...');
    });
    $('#bug-report-form').fadeOut('fast');
    customAlert("Thank you for your input!");
}

function keypressed(event) {
    switch (event.keyCode) {
        case 37: // left
            navigatePrevQn();
            break;
        case 39: // right
            navigateNextQn();
            break;
    }
}

$(document).ready(function() {
    /*-------QUESTION TERMINOLOGIES-------*/
    for (var i = 0; i < definitionsArr.length; i++) {
        $('#question-terminologies ul').append('<li><b>'
                + definitionsArr[i][0] + ':</b> ' + definitionsArr[i][1] + '</li>');
    }
    /*-------BUTTONS CSS-------*/
    $('input[type=button], input[type=submit]').css('background', surpriseColour);
    $('input[type=button], input[type=submit]').hover(function() {
        $(this).css('background', 'black');
    }, function() {
        $(this).css('background', surpriseColour);
    });

    $('#bug-report-form input').click(submitBugReport);
    $('#bug-report-msg').click(function() {
        if ($(this).text() == 'Write a short message about bug...') {
            $(this).text('');
        }
    });

    /*-------ARROW KEY PRESS EVENT------*/
    window.addEventListener("keydown", keypressed, true);

    /*-------UNDO OR CLEAR INPUT-------*/
    $('#undo-ans').click(function() {
        var currAns = ansArr[qnNo];
        if (currAns.length <= 1) {
            $('#question-nav .qnno').eq(qnNo - 1).removeClass('answered');
            clearAns(qnNo);
            gw.jumpToIteration(qnNo, 1);
            showRecordedAns(qnNo);
        } else {
            currAns.pop();
            setAns(qnNo, currAns);
            gw.jumpToIteration(qnNo, 1);
            showRecordedAns(qnNo);
        }
        printCurrentSelection(qnNo);
    });

    $('#clear-ans').click(function() {
        $('#question-nav .qnno').eq(qnNo - 1).removeClass('answered');
        clearAns(qnNo);
        gw.jumpToIteration(qnNo, 1);
        showRecordedAns(qnNo);
        printCurrentSelection(qnNo);
    });

});
