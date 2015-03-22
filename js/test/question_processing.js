
function extractInfo(q, qnJSON) {
    qnJSONArr[q] = qnJSON;
    qnTextArr[q] = extractQnText(qnJSON.qWording, qnJSON.qParams);
    qnTypeArr[q] = extractQnType(qnJSON.aType, qnJSON.aAmt);
    qnParamsArr[q] = extractQnParams(qnJSON.aParams);
    qnNoAnsArr[q] = extractQnNoAns(qnJSON.allowNoAnswer);
    qnGraphArr[q] = extractQnGraph(qnJSON.graphState);
}

function extractQnText(wording, params) { //returns string
    toReturn = wording;
    var matches = toReturn.match(/\|[^|]+\|/g); //words between 2 pipes: |something|
    if (matches != null) {
        for (var i = 0; i < matches.length; i++) {
            var p = matches[i].replace(/\|/g, "");
            toReturn = toReturn.replace(matches[i], params[p]);
        }
    }
    for (var i = 0; i < definitionsArr.length; i++) {
        var regex = new RegExp("(?:[^-])" + definitionsArr[i][0], "i");
        var withTooltip = '<u title=\"' + definitionsArr[i][1] + '\">' + definitionsArr[i][0] + '</u>';
        if (regex.exec(toReturn) != null) {
            toReturn = toReturn.replace(definitionsArr[i][0], withTooltip);
        }
    }

    return toReturn;
}

function extractQnType(type, amt) {
    switch (type) {
        case ANSWER_TYPE_VERTEX:
            if (amt == ANSWER_AMT_ONE) {
                return INTERFACE_SINGLE_V;
            } else if (amt == ANSWER_AMT_MULTIPLE) {
                return INTERFACE_MULT_V;
            }
            break;
        case ANSWER_TYPE_EDGE:
            if (amt == ANSWER_AMT_ONE) {
                return INTERFACE_SINGLE_E;
            } else if (amt == ANSWER_AMT_MULTIPLE) {
                return INTERFACE_MULT_E;
            }
            break;
        case ANSWER_TYPE_MCQ:
            if (amt == ANSWER_AMT_MULTIPLE) {
                return INTERFACE_MCQ_MULT;
            } else {
                return INTERFACE_MCQ;
            }
            break;
        case ANSWER_TYPE_VERTEX_MCQ:
            if (amt == ANSWER_AMT_ONE) {
                return INTERFACE_SUBSET_SINGLE;
            } else if (amt == ANSWER_AMT_MULTIPLE) {
                return INTERFACE_SUBSET_MULT;
            }
        case ANSWER_TYPE_FILL_BLANKS:
            return INTERFACE_BLANK;
        case ANSWER_TYPE_GRAPH_DRAWING:
            if (amt == ANSWER_GRAPH_WEIGHTED_UNDIRECTED) {
                return INTERFACE_GRAPH_WEIGHTED_UNDIRECTED;
            } else if (amt == ANSWER_GRAPH_UNWEIGHTED_UNDIRECTED) {
                return INTERFACE_GRAPH_UNWEIGHTED_UNDIRECTED;
            } else if (amt == ANSWER_GRAPH_UNWEIGHTED_DIRECTED) {
                return INTERFACE_GRAPH_UNWEIGHTED_DIRECTED;
            } else if (amt == ANSWER_GRAPH_WEIGHTED_DIRECTED) {
                return INTERFACE_GRAPH_WEIGHTED_DIRECTED;
            } else {
                return INTERFACE_BLANK;
            }
        default: //nothing
    }
    //to add more
}

function extractQnParams(params) {
    var toReturn = new Array();
    for (var key in params) {
        toReturn.push([key, params[key]]);
    }
    return toReturn;
}

function extractQnNoAns(allowNoAns) {
    if (allowNoAns) {
        return ALLOW_NO_ANS;
    }
    else
        return DISALLOW_NO_ANS;
}

function extractQnGraph(graph) {
    var vList = graph.vl;
    var eList = graph.el;
    for (var key in vList) {
        var temp;
        var v = vList[key];
        temp = v.cxPercentage;
        v.cx = (temp / 100) * MAIN_SVG_WIDTH;
        temp = v.cyPercentage;
        v.cy = (temp / 100) * 400; //we use 400 instead of MAIN_SVG_WIDTH
    }
    return graph;
}