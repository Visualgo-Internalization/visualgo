const INTERFACE_SINGLE_V = 1;
const INTERFACE_SINGLE_E = 2;
const INTERFACE_MULT_V = 3;
const INTERFACE_MULT_E = 4;
const INTERFACE_MCQ = 5;
const INTERFACE_MCQ_MULT = 6;
const INTERFACE_SUBSET_SINGLE = 7;
const INTERFACE_SUBSET_MULT = 8;
const INTERFACE_BLANK = 9;
const INTERFACE_GRAPH_WEIGHTED_UNDIRECTED = 10;
const INTERFACE_GRAPH_UNWEIGHTED_UNDIRECTED = 11;
const INTERFACE_GRAPH_UNWEIGHTED_DIRECTED = 12;
const INTERFACE_GRAPH_WEIGHTED_DIRECTED = 13;
const ALLOW_NO_ANS = 1;
const DISALLOW_NO_ANS = 0;

function isGraphInterface(interface) {
    return (interface == INTERFACE_GRAPH_UNWEIGHTED_DIRECTED) || (interface == INTERFACE_GRAPH_WEIGHTED_UNDIRECTED) || (interface == INTERFACE_GRAPH_UNWEIGHTED_UNDIRECTED || (interface == INTERFACE_GRAPH_WEIGHTED_DIRECTED));
}
function showAnswerInterface(q) {
    //reset all unclickable
    $('#vertexText text, #vertex circle, #edge path').unbind('click').css('cursor', 'auto');
    $('#mcq').html("").hide();
//    $('.mcq-option .box').unbind('click').css('cursor', 'auto');
    $('#subset').html("").hide();
    $('#subset .faux-v').unbind('click').css('cursor', 'auto');
    $('#graph-drawing-input').hide();
    $('.number-input').hide().unbind('change').attr('readonly', false);
    $('#undo-ans').hide();
    $('#clear-ans').hide();
    $('#current-selection').html("").hide();
    if (MODE == "TRAINING") {
        switch (qnTypeArr[q]) {
            case INTERFACE_GRAPH_UNWEIGHTED_UNDIRECTED:
                $('#graph-drawing-input').show();
                $('#graph-drawing-input').click(function() {
                    drawGraph(true, true, qnGraphArr[q]);
                });
                break;
            case INTERFACE_GRAPH_WEIGHTED_UNDIRECTED:
                $('#graph-drawing-input').show();
                $('#graph-drawing-input').click(function() {
                    drawGraph(false, true, qnGraphArr[q]);
                });
                break;
            case INTERFACE_GRAPH_UNWEIGHTED_DIRECTED:
                $('#graph-drawing-input').show();
                $('#graph-drawing-input').click(function() {
                    drawGraph(true, false, qnGraphArr[q]);
                });
                break;
            case INTERFACE_GRAPH_WEIGHTED_DIRECTED:
                $('#graph-drawing-input').show();
                $('#graph-drawing-input').click(function() {
                    drawGraph(false, false, qnGraphArr[q]);
                });
                break;
            case INTERFACE_SINGLE_V:
                $('#vertexText text, #vertex circle').css('cursor', 'pointer');
                $('#vertexText text, #vertex circle').click(function() {
                    var vertexClass = $(this).attr('class');
                    //find vertex number
                    var vertexClassNo = parseInt(vertexClass.substr(1));
                    var vNo = parseInt(qnGraphArr[q].vl[vertexClassNo].text);
                    //mark as answered
                    $('#question-nav .qnno').eq(q - 1).addClass('answered');
                    setAns(q, vNo);
                    //highlight as answered
                    showRecordedAns(q);
                });
                break;
            case INTERFACE_SINGLE_E:
                $('#edge path').css('cursor', 'pointer');
                $('#edge path').click(function() {
                    var edgeID = $(this).attr('id');
                    //find vertices it joins
                    var edgeIDNo = parseInt(edgeID.substr(1));
                    var vertexA = parseInt(qnGraphArr[q].vl[qnGraphArr[q].el[edgeIDNo].vertexA].text);
                    var vertexB = parseInt(qnGraphArr[q].vl[qnGraphArr[q].el[edgeIDNo].vertexB].text);
                    //mark as answered
                    $('#question-nav .qnno').eq(q - 1).addClass('answered');
                    setAns(q, [vertexA, vertexB]);
                    //highlight as answered
                    showRecordedAns(q);
                });
                break;
            case INTERFACE_MULT_V:
                $('#vertexText text, #vertex circle').css('cursor', 'pointer');
                $('#undo-ans').show();
                $('#clear-ans').show();
                $('#vertexText text, #vertex circle').click(function() {
                    var vertexList = ansArr[q];
                    if (vertexList == UNANSWERED || vertexList == NO_ANSWER)
                        vertexList = new Array();
                    var vertexClass = $(this).attr('class');
                    //find vertex number
                    var vertexClassNo = parseInt(vertexClass.substr(1));
                    var vNo = parseInt(qnGraphArr[q].vl[vertexClassNo].text);
                    //mark as answered
                    $('#question-nav .qnno').eq(q - 1).addClass('answered');
                    if (vertexList.indexOf(vNo) == -1) {
                        vertexList.push(vNo);
                        setAns(q, vertexList);
                    }

                    //highlight as answered
                    showRecordedAns(q);
                });
                break;
            case INTERFACE_MULT_E:
                $('#edge path').css('cursor', 'pointer');
                $('#undo-ans').show();
                $('#clear-ans').show();
                $('#edge path').click(function() {
                    var edgeID = $(this).attr('id');
                    var edgeList = ansArr[q];
                    if (edgeList == UNANSWERED || edgeList == NO_ANSWER)
                        edgeList = new Array();
                    //find vertices it joins
                    var edgeIDNo = parseInt(edgeID.substr(1));
                    var vertexA = parseInt(qnGraphArr[q].vl[qnGraphArr[q].el[edgeIDNo].vertexA].text);
                    var vertexB = parseInt(qnGraphArr[q].vl[qnGraphArr[q].el[edgeIDNo].vertexB].text);
                    var newEdge = [vertexA, vertexB];
                    //mark as answered
                    $('#question-nav .qnno').eq(q - 1).addClass('answered');
                    if (!containsEdge(edgeList, newEdge)) {
                        edgeList.push(newEdge);
                        setAns(q, edgeList);
                    }

                    //highlight as answered
                    showRecordedAns(q);
                });
                break;
            case INTERFACE_MCQ:
                //display mcq options
                $('#mcq').show();
                for (var i = 0; i < qnParamsArr[q].length; i++) {
                    $("#mcq").append('<div class="mcq-option"><span class="circle"></span><span class="option">' + qnParamsArr[q][i][0] + '</span></div>');
                }

                //record answer
                $('.mcq-option .circle').click(function() {
                    //mark as answered
                    $('#question-nav .qnno').eq(q - 1).addClass('answered');
                    var optionText = $(this).next().html();
                    for (var i = 0; i < qnParamsArr[q].length; i++) {
                        if (qnParamsArr[q][i][0] == optionText) {
                            setAns(q, qnParamsArr[q][i][1]);
                            break;
                        }
                    }

                    //highlight as answered
                    $('.mcq-option .circle').css('background', '#ddd');
                    showRecordedAns(q);
                });
                break;
            case INTERFACE_MCQ_MULT:
                //display mcq options
                $('#mcq').show();
                for (var i = 0; i < qnParamsArr[q].length; i++) {
                    $("#mcq").append('<div class="mcq-option"><span class="box"></span><span class="option">' + qnParamsArr[q][i][0] + '</span></div>');
                }

                //record answer
                $('.mcq-option .box').click(function() {
                    var answerList = ansArr[q];
                    if (answerList == UNANSWERED || answerList == NO_ANSWER)
                        answerList = new Array();
                    //mark as answered
                    $('#question-nav .qnno').eq(q - 1).addClass('answered');
                    var optionText = $(this).next().html();
                    for (var i = 0; i < qnParamsArr[q].length; i++) {
                        if (qnParamsArr[q][i][0] == optionText) {
                            var answerIndex = answerList.indexOf(qnParamsArr[q][i][1]);
                            if (answerIndex == -1) {
                                answerList.push(qnParamsArr[q][i][1]);
                            } else {
                                answerList.splice(answerIndex, 1);
                            }
                            setAns(q, answerList);
                            break;
                        }
                    }

                    //highlight as answered
                    $('.mcq-option .box').css('background', '#ddd');
                    showRecordedAns(q);
                });
                break;
            case INTERFACE_SUBSET_SINGLE:
                $('#subset').show();
                for (var i = 0; i < qnParamsArr[q].length; i++) {
                    $("#subset").append('<span class="faux-v">' + qnParamsArr[q][i][0] + '</span>');
                }
                $('#subset .faux-v').css('cursor', 'pointer');
                //record answer
                $('#subset .faux-v').click(function() {
                    //mark as answered
                    $('#question-nav .qnno').eq(q - 1).addClass('answered');
                    var optionText = $(this).html();
                    for (var i = 0; i < qnParamsArr[q].length; i++) {
                        if (qnParamsArr[q][i][0] == optionText) {
                            setAns(q, qnParamsArr[q][i][1]);
                        }
                    }

                    //highlight as answered
                    showRecordedAns(q);
                });
                break;
            case INTERFACE_SUBSET_MULT:
                //display options
                $('#subset').show();
                for (var i = 0; i < qnParamsArr[q].length; i++) {
                    $("#subset").append('<span class="faux-v">' + qnParamsArr[q][i][0] + '</span>');
                }
                $('#subset .faux-v').css('cursor', 'pointer');
                $('#undo-ans').show();
                $('#clear-ans').show();
                //record answer
                $('#subset .faux-v').click(function() {
                    var vertexList = ansArr[q];
                    if (vertexList == UNANSWERED || vertexList == NO_ANSWER)
                        vertexList = new Array();
                    //mark as answered
                    $('#question-nav .qnno').eq(q - 1).addClass('answered');
                    var optionText = $(this).html();
                    var optionVal;
                    for (var i = 0; i < qnParamsArr[q].length; i++) {
                        if (qnParamsArr[q][i][0] == optionText) {
                            optionVal = qnParamsArr[q][i][1];
                        }
                    }
                    if (vertexList.indexOf(optionVal) == -1) {
                        vertexList.push(optionVal);
                        setAns(q, vertexList);
                    }

                    //highlight as answered
                    showRecordedAns(q);
                });
                break;
            case INTERFACE_BLANK:
                $('.number-input').show().val("");
                //limit input to numbers
                $('.number-input').change(function() {
                    var text = $(this).val().replace(/[^\0-9]/ig, "");
                    $(this).val(text);
                    if (text == "") { //unanswered
                        $('#question-nav .qnno').eq(q - 1).removeClass('answered');
                        clearAns(q);
                    } else { //mark as answered
                        $('#question-nav .qnno').eq(q - 1).addClass('answered');
                        $('.mcq-option .box').css('background', '#ddd');
                        setAns(q, parseInt(text));
                    }
                });
                break;
            default: //none
        }

        //check for no answer option
        if (qnNoAnsArr[q]) {
            $('#mcq').show();
            $("#mcq").append('<div class="mcq-option" id="no-answer"><span class="box"></span><span class="option">No answer</span></div>');
            $('.mcq-option .box').css('cursor', 'pointer');
            //record answer
            $('#no-answer .box').click(function() {
                if (ansArr[q] != NO_ANSWER) {
                    //mark as answered
                    $('#question-nav .qnno').eq(q - 1).addClass('answered');
                    setAns(q, NO_ANSWER);
                } else { //
                    //mark as unanswered
                    $('#question-nav .qnno').eq(q - 1).removeClass('answered');
                    clearAns(q);
                }
                $('.mcq-option .box').css('background', '#ddd');
                showRecordedAns(q);
                $('.number-input').val("");
            });
        }

    } else if (MODE == "ANSWER") {
        gw.jumpToIteration(q, 1);
        switch (qnTypeArr[q]) {
            case INTERFACE_MCQ:
                $('#mcq').show();
                for (var i = 0; i < qnParamsArr[q].length; i++) {
                    $("#mcq").append('<div class="mcq-option"><span class="circle"></span><span class="option">' + qnParamsArr[q][i][0] + '</span></div>');
                }
                break;
            case INTERFACE_MCQ_MULT:
                $('#mcq').show();
                for (var i = 0; i < qnParamsArr[q].length; i++) {
                    $("#mcq").append('<div class="mcq-option"><span class="box"></span><span class="option">' + qnParamsArr[q][i][0] + '</span></div>');
                }
                break;
            case INTERFACE_SUBSET_SINGLE:
            case INTERFACE_SUBSET_MULT:
                $('#subset').show();
                for (var i = 0; i < qnParamsArr[q].length; i++) {
                    $("#subset").append('<span class="faux-v">' + qnParamsArr[q][i][0] + '</span>');
                }
                break;
            case INTERFACE_BLANK:
                $('.number-input').show().val("").attr('readonly', 'readonly');
                break;
        }
        //check for no answer option
        if (qnNoAnsArr[q]) {
            $('#mcq').show();
            $("#mcq").append('<div class="mcq-option" id="no-answer"><span class="box"></span><span class="option">No answer</span></div>');
        }
        showRecordedAns(q);
    }
    positionViz();
}

function showRecordedAns(q) {
    var ans = ansArr[q].toString();
    //check for no answer option
    if (qnNoAnsArr[q]) {
        if (ans == NO_ANSWER) {
            $('#no-answer .box').css('background', surpriseColour);
            gw.jumpToIteration(qnNo, 1);
        } else {
            $('#no-answer .box').css('background', '#ddd');
        }
    }
    if (ans != UNANSWERED && ans != NO_ANSWER) {
        switch (qnTypeArr[q]) {
            case INTERFACE_SINGLE_V: //single vertex
                gw.jumpToIteration(qnNo, 1);
                var verticesToHighlight = getVClass(qnGraphArr[q], ans.split(","));
                setTimeout(function() {
                    for (var i = 0; i < verticesToHighlight.length; i++) {
                        colourCircle(verticesToHighlight[i]);
                    }
                }, 50);
                break;
            case INTERFACE_SINGLE_E: //single edge
                gw.jumpToIteration(qnNo, 1);
                var edgesToHighlight = getEID(qnGraphArr[q], ans.split(","));
                setTimeout(function() {
                    for (var i = 0; i < edgesToHighlight.length; i++) {
                        colourEdge(edgesToHighlight[i]);
                    }
                }, 50);
                break;
            case INTERFACE_MULT_V: //multiple vertices
                var verticesToHighlight = getVClass(qnGraphArr[q], ans.split(","));
                setTimeout(function() {
                    for (var i = 0; i < verticesToHighlight.length; i++) {
                        colourCircle(verticesToHighlight[i]);
                    }
                }, 50);
                printCurrentSelection(q);
                break;
            case INTERFACE_MULT_E: //multiple edges
                var edgesToHighlight = getEID(qnGraphArr[q], ans.split(","));
                setTimeout(function() {
                    for (var i = 0; i < edgesToHighlight.length; i++) {
                        colourEdge(edgesToHighlight[i]);
                    }
                }, 50);
                printCurrentSelection(q);
                break;
            case INTERFACE_MCQ: //MCQ
                var optionVal = parseInt(ans);
                var optionText = "";
                for (var i = 0; i < qnParamsArr[q].length; i++) {
                    if (qnParamsArr[q][i][1] == optionVal) {
                        optionText = qnParamsArr[q][i][0];
                    }
                }
                $('.mcq-option .option').each(function() {
                    if ($(this).html() == optionText) {
                        $(this).prev().css('background', surpriseColour);
                    }
                });
                break;
            case INTERFACE_MCQ_MULT:
                var optionsToHighlight = ansArr[q];
                var optionsText = new Array();
                for (var i = 0; i < qnParamsArr[q].length; i++) {
                    if (optionsToHighlight.indexOf(qnParamsArr[q][i][1]) != -1) {
                        optionsText.push(qnParamsArr[q][i][0]);
                    }
                }
                $('.mcq-option .option').each(function() {
                    if (optionsText.indexOf($(this).html()) != -1) {
                        $(this).prev().css('background', surpriseColour);
                    }
                });
                break;
            case INTERFACE_SUBSET_SINGLE:
                $('#subset .faux-v').css('background', '#eee').css('color', 'black').css('border', '3px solid black');
                var optionVal = parseInt(ans);
                var optionText = "";
                for (var i = 0; i < qnParamsArr[q].length; i++) {
                    if (qnParamsArr[q][i][1] == optionVal) {
                        optionText = qnParamsArr[q][i][0];
                        break;
                    }
                }
                $('#subset .faux-v').each(function() {
                    if ($(this).html() == optionText) {
                        $(this).css('background', surpriseColour).css('color', 'white').css('border', '3px solid ' + surpriseColour);
                    }
                });
                break;
            case INTERFACE_SUBSET_MULT:
                $('#subset .faux-v').css('background', '#eee').css('color', 'black').css('border', '3px solid black');
                var fauxVToHighlight = ans.split(",");
                for (var i = 0; i < fauxVToHighlight.length; i++) {
                    var optionVal = fauxVToHighlight[i];
                    var optionText = "";
                    for (var j = 0; j < qnParamsArr[q].length; j++) {
                        if (qnParamsArr[q][j][1] == optionVal) {
                            optionText = qnParamsArr[q][j][0];
                            break;
                        }
                    }
                    $('#subset .faux-v').each(function() {
                        if ($(this).html() == optionText) {
                            $(this).css('background', surpriseColour).css('color', 'white').css('border', '3px solid ' + surpriseColour);
                        }
                    });
                }
                printCurrentSelection(q);
                break;
            case INTERFACE_BLANK:
                if (ans == UNANSWERED) {
                    $('.number-input').val(ans);
                } else {
                    $('.number-input').val(parseInt(ans));
                }
                break;
            default: //nothing
        }
    }
    if (MODE == "ANSWER") {
        printCurrentSelection(q);
        $('.bug-report-button').click(function() {
            $('#dark-overlay').fadeIn(function() {
                $('#bug-report-form').fadeIn();
            });
        });
    }
}

function printCurrentSelection(q) {
    $('#current-selection').html("").hide().css('color', 'black');
    var thisList = ansArr[q];
    if (MODE == "TRAINING") {
        if (thisList == UNANSWERED || thisList == NO_ANSWER) { //no answer
            $('#current-selection').html("").hide();
        } else {
            switch (qnTypeArr[q]) {
                case INTERFACE_MULT_V:
                case INTERFACE_SUBSET_MULT:
                    $('#current-selection').html("Your answer is: &nbsp;&nbsp;<strong>" + thisList.join(" , ") + "</strong>").show();
                    break;
                case INTERFACE_MULT_E:
                    var temp = "";
                    for (var i = 0; i < thisList.length; i++) {
                        temp += "( " + thisList[i][0] + " , " + thisList[i][1] + " ) , ";
                    }
                    $('#current-selection').html("Your answer is: &nbsp;&nbsp;<strong>" + temp.slice(0, -3) + "</strong>").show();
                    break;
                default: //nothing
            }
        }
    } else if (MODE == "ANSWER") {
        //#current-selection
        if (thisList == UNANSWERED) {
            $('#current-selection').html("<strong>You did not answer this question.</strong>").css('color', '#df3939').show();
        } else {
            if (thisList != NO_ANSWER) {
                switch (qnTypeArr[q]) {

                    case INTERFACE_SINGLE_V:
                    case INTERFACE_SUBSET_SINGLE:
                        $('#current-selection').html("Your answer is: &nbsp;&nbsp;<strong>" + thisList + "</strong>").show();
                        break;
                    case INTERFACE_MULT_V:
                    case INTERFACE_SUBSET_MULT:
                        $('#current-selection').html("Your answer is: &nbsp;&nbsp;<strong>" + thisList.join(" , ") + "</strong>").show();
                        break;
                    case INTERFACE_SINGLE_E:
                        var temp = "( " + thisList[0] + " , " + thisList[1] + " )";
                        $('#current-selection').html("Your answer is: &nbsp;&nbsp;<strong>" + temp + "</strong>").show();
                        break;
                    case INTERFACE_MULT_E:
                        var temp = "";
                        for (var i = 0; i < thisList.length; i++) {
                            temp += "( " + thisList[i][0] + " , " + thisList[i][1] + " ) , ";
                        }
                        $('#current-selection').html("Your answer is: &nbsp;&nbsp;<strong>" + temp.slice(0, -3) + "</strong>").show();
                        break;
                    default: //nothing
                }
            }
        }
        //#ans-key
        $('#ans-key').html("").hide();
        var anskeyList = anskeyArr[q];
        var explanation = explanationArr[q];
        var isCorrect = checkCorrectness(anskeyArr[q]);
        if (isCorrect) {
            $('#ans-key').html("<span style='color: #52bc69'><strong>You answered this question correctly! :)</strong></span> <a class='bug-report-button' id='bug-report-button-" + q + "'>(Report Bug with Question)</a>").show();
            return;
        } else if (thisList != UNANSWERED) {
            $('#ans-key').html("<div style='color: #df3939; padding-bottom: 10px;'><strong>You answered this question wrongly.</strong></div>").show();
        }

        if ((anskeyList instanceof Array) && anskeyList.length == 0) {
            $('#ans-key').append("The correct answer is: &nbsp;&nbsp;<strong>No answer</strong> <a class='bug-report-button' id='bug-report-button-" + q + "'>(Report Bug with Question)</a>").show();
            return;
        }
        switch (qnTypeArr[q]) {
            case INTERFACE_SINGLE_V:
            case INTERFACE_SUBSET_SINGLE:
                $('#ans-key').append("The correct answer is: &nbsp;&nbsp;<strong>" + anskeyList + "</strong>").show();
                break;
            case INTERFACE_MULT_V:
            case INTERFACE_SUBSET_MULT:
                $('#ans-key').append("The correct answer is: &nbsp;&nbsp;<strong>" + anskeyList.join(" , ") + "</strong>").show();
                break;
            case INTERFACE_SINGLE_E:
                var temp = "( " + anskeyList[0] + " , " + anskeyList[1] + " )";
                $('#ans-key').append("The correct answer is: &nbsp;&nbsp;<strong>" + temp + "</strong>").show();
                break;
            case INTERFACE_MULT_E:
                var temp = "";
                for (var i = 0; i < anskeyList.length; i += 2) {
                    temp += "( " + anskeyList[i] + " , " + anskeyList[i + 1] + " ) , ";
                }
                $('#ans-key').append("The correct answer is: &nbsp;&nbsp;<strong>" + temp.slice(0, -3) + "</strong>").show();
                break;
            case INTERFACE_MCQ:
                $('#ans-key').append("The correct answer is: &nbsp;&nbsp;<strong>" + qnParamsArr[q][anskeyList][0] + "</strong>").show(); //must edit
                break;
            case INTERFACE_MCQ_MULT:
                var temp = "";
                for (var i = 0; i < anskeyList.length; i++) {
                    temp += "'" + qnParamsArr[q][anskeyList[i]][0] + "' , ";
                }
                $('#ans-key').append("The correct answer is: &nbsp;&nbsp;<strong>" + temp.slice(0, -3) + "</strong>").show(); //must edit
                break;
            case INTERFACE_BLANK:
                $('#ans-key').append("The correct answer is: &nbsp;&nbsp;<strong>" + anskeyList + "</strong>").show();
                break;
            default: //nothing
        }
        if (thisList != UNANSWERED && explanation.length > 0) {
            $('#ans-key').append("<div>" + explanation + "</div>");
        }
        // add bug report submission button
        $('#ans-key').append(' <a class="bug-report-button" id="bug-report-button-' + q + '">(Report Bug with Question)</a>');
    }
//positionViz();
}

//helper functions
function positionViz() {
    var topDist = 60 + $('#qn-text').height() + 60;
    $('#viz svg').css('top', topDist + 'px');
}

function getVClass(qraphJSON, vList) { //returns array
    var toReturn = new Array();
    for (var i = 0; i < vList.length; i++) { //for each number in the vertex list
        var thisJSONvl = qraphJSON.vl; //look for it in the vl in the JSON object
        for (var key in thisJSONvl) {
            if (parseInt(thisJSONvl[key].text) == vList[i]) { //if it is this vertex
                toReturn.push("v" + key);
            }
        }
    }
    return toReturn;
}

function getEID(graphJSON, eList) {
    var toReturn = new Array();
    for (var i = 0; i < eList.length; i += 2) { //for each pair of numbers in the edge list
        eListA = getVClass(graphJSON, [eList[i]])[0].substring(1);
        eListB = getVClass(graphJSON, [eList[i + 1]])[0].substring(1);
        var thisJSONel = graphJSON.el; //look for it in the el in the JSON object
        for (var key in thisJSONel) {
            if (parseInt(thisJSONel[key].vertexA) == eListA && parseInt(thisJSONel[key].vertexB) == eListB) { //if it is this edge
                toReturn.push("e" + key);
            }
        }
    }
    return toReturn;
}

function colourCircle(vertexClass) {
//add colour to the right one
    $('.' + vertexClass).each(function() {
        if ($(this).prop('tagName') == 'circle') { //paint both inner and outer circles surpriseColour
            $(this).attr('fill', surpriseColour);
            $(this).attr('stroke', surpriseColour);
        }
        if ($(this).prop('tagName') == 'text') { //paint text label white
            $(this).attr('fill', 'white');
        }
    });
}

function colourEdge(edgeID) {
    $('#' + edgeID).attr('stroke', surpriseColour);
    $('#' + edgeID).attr('stroke-width', "5");
}

function containsEdge(el, e) { //checks if e is inside el
    for (var i = 0; i < el.length; i++) {
        var currEdge = el[i];
        if (currEdge[0] == e[0] && currEdge[1] == e[1])
            return true;
    }
    return false;
}

function checkCorrectness(actualans) {
    return (actualans == CORRECT);
}