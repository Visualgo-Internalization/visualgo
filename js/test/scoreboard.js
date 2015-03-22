// used by both controlpanel.js and scoreboard.js to populate and calculate statistics for scoreboard

var prevScoreboardData = {};
var scoreboardData = new Array();

function countTotalNumberOfQuestions(amountString) {
    var allAmounts = amountString.split(',');
    var amount = 0;
    for (var i = 0; i < allAmounts.length; i++) {
        amount += parseInt(allAmounts[i]);
    }
    return amount;
}

function createPublicScoreboard() {
    createScoreboard(true);
}

function createPrivateScoreboard() {
    createScoreboard(false);
}

function createScoreboard(isPublicTable) {
    var data = {mode: MODE_GET_PUBLIC_SCOREBOARD, testID: $('#scoreboard-test-selection').val()};
    if (!isPublicTable) {
        data = {mode: MODE_GET_SCOREBOARD, testID: $('#scoreboard-test-selection').val(), adminusername: adminuser, adminpassword: adminpw};
    }
    $.ajax({
        url: PHP_DOMAIN + "php/Test.php",
        data: data
    }).done(function(data) {
        if (isPublicTable) {
            $('#scoreboard-screen table').html('<tr><th width="5%">No.</th><th width="60%">Matric Number</th><th width="10%">Score</th><th width="15%">Time Taken</th><th width="10%"></th></tr>');
        } else {
            $('#scoreboard-screen table').html('<tr><th width="5%">No.</th><th width="20%">Matric Number</th><th width="40%">Student Name</th><th width="10%">Score</th><th width="15%">Time Taken</th><th width="10%"></th></tr>');
        }
        showLoadingScreen();
        var changedRows = new Array();
        data = JSON.parse(data);
        $('#scoreboard-screen table').show();
        var total = 0;
        var nParticipated = 0;
        var nFinishedTest = 0;
        var nStudents = data.length;

        for (var i = 0; i < nStudents; i++) {
            var no = i + 1;
            var matricNo = data[i].username;
            var stName = data[i].name;
            var score = data[i].grade;
            var outof = countTotalNumberOfQuestions(data[i].questionAmount);
            var min = Math.floor(data[i].timeTaken / 60);
            var sec = data[i].timeTaken % 60;
            var participated = data[i].attemptCount > 0;
            var finishedTest = (data[i].attemptCount > 0) && (data[i].timeTaken > 0);
            var isRowCreated = $('#scoreboard-student-' + no).length > 0;
            if (isPublicTable) {
                if (score >= (outof / 2)) {
                    if (isRowCreated) {
                        $('#scoreboard-student-' + no).html('<td>' + no + '</td><td>' + hideSome(matricNo) + '</td><td>' + score + '</td><td>' + min + 'm ' + sec + 's</td><td class="scoreboard-stats-col"></td>');
                    } else {
                        $('#scoreboard-screen table tr:last').after('<tr id="scoreboard-student-' + no + '"><td>' + no + '</td><td>' + hideSome(matricNo) + '</td><td>' + score + '</td><td>' + min + 'm ' + sec + 's</td><td class="scoreboard-stats-col"></td></tr>');
                    }
                }
            } else {
                if (isRowCreated) {
                    $('#scoreboard-student-' + no).html('<td>' + no + '</td><td>' + matricNo + '</td><td>' + stName + '</td><td>' + score + '</td><td>' + min + 'm ' + sec + 's</td><td class="scoreboard-stats-col"></td>');
                } else {
                    $('#scoreboard-screen table tr:last').after('<tr id="scoreboard-student-' + no + '"><td>' + no + '</td><td>' + matricNo + '</td><td>' + stName + '</td><td>' + score + '</td><td>' + min + 'm ' + sec + 's</td><td class="scoreboard-stats-col"></td></tr>');
                }
            }
            if (matricNo in prevScoreboardData) {
                var prevScore = prevScoreboardData[matricNo];
                if (prevScore != score) {
                    changedRows.push(no);
                }
            }
            prevScoreboardData[matricNo] = score;

            total += parseInt(score);

            if (participated) {
                nParticipated++;
            }
            if (finishedTest) {
                nFinishedTest++;
            }
        }
        $('#no-participants').text(nParticipated);
        $('#no-participating').text(nParticipated - nFinishedTest);
        calculateStatistics(total, nStudents, nFinishedTest, data);

        var highlightTime = changedRows.length * 2000;
        for (var row = 0; row < changedRows.length; row++) {
            $('#scoreboard-student-' + changedRows[row]).effect("highlight", {color: "#d9513c"}, highlightTime);
        }

        if (!isPublicTable) {
            if (nParticipated > 0) {
                $('#question-graph-viz').html('');
                populateQuestionGraph(data);
            } else {
                $('#question-graph-viz').html('No Question Data to show');
                $('#bell-curve-viz').html('No Data to show');
            }
        }
        scoreboardData = data;
        hideLoadingScreen();
    });
}

function calculateStatistics(total, nStudents, nParticipated, data) {
    //calculate average score
    var avg_only_participants = total / nParticipated;
    $('#avg-only-participants').html(avg_only_participants.toFixed(2));

    // calculate variance and stdev
    var totalSquaredDiffParticipants = 0;
    for (var i = 0; i < nStudents; i++) {
        var participated = data[i].attemptCount > 0;
        var score = data[i].grade;
        if (participated) {
            var diffFromMean = score - avg_only_participants;
            var diffFromMeanSq = Math.pow(diffFromMean, 2);
            totalSquaredDiffParticipants += diffFromMeanSq;
        }
    }
    var stdev_only_participants = Math.sqrt(totalSquaredDiffParticipants / nParticipated);
    $('#std-dev-only-participants').html(stdev_only_participants.toFixed(2));

    // calculate percentile
    var percentile_25 = percentile(25, nParticipated, data);
    var percentile_75 = percentile(75, nParticipated, data);
    var percentile_75_index = -1; // index of the student who has the closest grade <= 75th percentile
    var average_index = -1;
    var percentile_25_index = -1;
    var average_plus_std_dev = -1;
    var average_minus_std_dev = -1;

    for (var i = 0; i < nParticipated; i++) {
        var backgroundColour = "#2ebbd1";
        if (data[i].grade <= percentile_75) {
            if (percentile_75_index < 0) {
                percentile_75_index = i;
            }
            backgroundColour = "#6ccfdf";
        }
        if (data[i].grade <= avg_only_participants) {
            if (average_index < 0) {
                average_index = i;
            }
            backgroundColour = "#98dde9";
        }
        if (data[i].grade <= percentile_25) {
            if (percentile_25_index < 0) {
                percentile_25_index = i;
            }
            backgroundColour = "#b7e7f0";
        }
        if (data[i].grade <= (avg_only_participants + stdev_only_participants)) {
            if (average_plus_std_dev < 0) {
                average_plus_std_dev = i;
            }
        }
        if (data[i].grade <= (avg_only_participants - stdev_only_participants)) {
            if (average_minus_std_dev < 0) {
                average_minus_std_dev = i;
            }
        }
        $('#scoreboard-student-' + (i + 1)).css("background-color", backgroundColour);
    }

    $('#scoreboard-student-' + (average_plus_std_dev + 1) + ' .scoreboard-stats-col').text('~Avg+Stdev');
    $('#scoreboard-student-' + (average_minus_std_dev + 1) + ' .scoreboard-stats-col').text('~Avg-Stdev');
    $('#scoreboard-student-' + (percentile_25_index + 1) + ' .scoreboard-stats-col').text('~25%tile');
    $('#scoreboard-student-' + (percentile_75_index + 1) + ' .scoreboard-stats-col').text('~75%tile');
    $('#scoreboard-student-' + (average_index + 1) + ' .scoreboard-stats-col').text('~Average');
    $('#25th-percentile').text(percentile_25);
    $('#75th-percentile').text(percentile_75);
}

function percentile(percent, n, data) {
    if (n < 1) {
        return "NaN";
    }
    percent = 100 - percent;
    var index = (percent / 100) * n;
    var percentile;
    if (index % 1 != 0) { // if not whole number
        index = Math.ceil(index);
        percentile = data[index - 1].grade;
    } else {
        percentile = (parseInt(data[index - 1].grade) + parseInt(data[index].grade)) / 2;
    }
    return percentile;
}

function hideSome(str) {
    var length = Math.min(str.length, 2);
    if (isMatricNo(str)) {
        str = str.replaceAt(4, '*');
        str = str.replaceAt(7, '*');
    } else {
        while (length > 0) {
            var index = Math.floor(Math.random() * str.length);
            if (str.charAt(index) != '*') {
                str = str.replaceAt(index, '*');
                length--;
            }
        }
    }
    return str;
}

function isMatricNo(str) {
    return (str.length == 9); //can put more conditions
}

String.prototype.replaceAt = function(index, character) {
    return this.substr(0, index) + character + this.substr(index + character.length);
}