// @author Steven Halim
// modified by Jarvis
// Defines an SSSP object; keeps implementation of graph internally and interact with GraphWidget to display Bellman Ford's and Dijkstra's SSSP visualizations

// SSSP Example Constants
var SSSP_EXAMPLE_CP3_4_1 = 0;
var SSSP_EXAMPLE_CP3_4_3 = 1;
var SSSP_EXAMPLE_CP3_4_4 = 2;
var SSSP_EXAMPLE_CP3_4_9 = 3;
var SSSP_EXAMPLE_CP3_4_17 = 4;
var SSSP_EXAMPLE_CP3_4_18 = 5;
var SSSP_EXAMPLE_CP3_4_19 = 6;

var GraphTraversal = function(){
  var self = this;
  var graphWidget = new GraphWidget();

  var valueRange = [1, 100]; // Range of valid values of BST vertexes allowed

  /*
   *  Structure of internalAdjList: JS object with
   *  - key: vertex number
   *  - value: JS object with
   *           - key: the other vertex number that is connected by the edge
   *           - value: ID of the edge, NOT THE WEIGHT OF THE EDGE
   *
   *  The reason why the adjList didn't store edge weight is because it will be easier to create bugs
   *  on information consistency between the adjList and edgeList
   *
   *  Structure of internalEdgeList: JS object with
   *  - key: edge ID
   *  - value: JS object with the following keys:
   *           - vertexA
   *           - vertexB
   *           - weight
   */

  var internalAdjList = {};
  var internalEdgeList = {};
  var amountVertex = 0;
  var amountEdge = 0;

  this.getGraphWidget = function(){
    return graphWidget;
  }

  fixJSON = function()
  {
    amountVertex = 0;
    amountEdge = 0;
    for (var key in internalAdjList) ++amountVertex;
    for (var key in internalEdgeList) ++amountEdge;

    for (var key in internalEdgeList)
    {
      delete internalEdgeList[key]["type"];
      delete internalEdgeList[key]["displayWeight"];
      delete internalEdgeList[key]["animateHighlighed"];
      delete internalEdgeList[key]["state"];
      delete internalEdgeList[key]["weight"];
    }
    for (var key in internalAdjList)
    {
      internalAdjList[key]["text"] = +key;
      delete internalAdjList[key]["state"];
    }

  }

  takeJSON = function(graph)
  {
    if (graph == null) return;
    graph = JSON.parse(graph);
    internalAdjList = graph["vl"];
    internalEdgeList = graph["el"];
    fixJSON();
  }

  statusChecking = function()
  {
    updateJSData("#draw-status p", 200, "Please draw various kind of graph with varying properties to enhance our question bank.");
  }

  warnChecking = function()
  {
    var warn = "";
    if (amountVertex >= 10)
      warn += "Too much vertex on screen, consider drawing smaller graph. ";

    if (warn == "") {
      updateJSData("#draw-warn p", 201, "No Warning");
    } else {
      updateJSData("#draw-warn p", 202, warn);
    }
  }

  errorChecking = function()
  {
    var error = "";
    if (amountVertex == 0)
    {
      updateJSData("#draw-err p", 203, "Graph cannot be empty. ");
      return;
    }

    if (error == "") updateJSData("#draw-err p", 204, "No Error");
    else $("#draw-err p").html(error);
  }

  var intervalID;

  this.startLoop = function()
  {
    intervalID = setInterval(function()
    {
      takeJSON(JSONresult);
      warnChecking();
      errorChecking();
      statusChecking();
    },100);
  }

  this.stopLoop = function()
  {
    clearInterval(intervalID);
  }
  
  this.draw = function() 
  {
    if ($("#draw-err p").html() != "No Error") return false;
    if ($("#submit").is(':checked'))
      this.submit(JSONresult);
    if ($("#copy").is(':checked'))
    {
      window.prompt("Copy to clipboard:",JSONresult);
    }

    DIRECTED_GR = true; 
    OLD_POSITION = amountEdge;
//    console.log(DIRECTED_GR + ' ' + OLD_POSITION);

    graph = createState(internalAdjList,internalEdgeList);
    graphWidget.updateGraph(graph, 500);
    return true;
  }

  this.submit = function(graph)
  {
    console.log('test submit, graph traversal');

    $.ajax({
        url: PHP_DOMAIN + "php/Graph.php?mode=" + MODE_SUBMIT_GRAPH,
        type: "POST",
        data: {canvasWidth: 1000, canvasHeight: 500, graphTopics: 'Graph Traversal', graphState: graph, fbAccessToken: fbAccessToken},
        error: function(xhr, errorType, exception) { //Triggered if an error communicating with server
            var errorMessage = exception || xhr.statusText; //If exception null, then default to xhr.statusText
            alert("There was an error submitting your graph " + errorMessage);
        }
    }).done(function(data) {
        console.log(data);
    });

/*
    $.ajax({
                    url: "http://algorithmics.comp.nus.edu.sg/~onlinequiz/erinplayground/php/Graph.php?mode=" + MODE_SUBMIT_GRAPH + "&sessionID=" + $.cookie("sessionID"),
                    type: "POST",
                    data: {canvasWidth: 1000, canvasHeight: 500, graphTopics: 'Graph Traversal', graphState: graph},
                    error: function(xhr, errorType, exception) { //Triggered if an error communicating with server  
                        var errorMessage = exception || xhr.statusText; //If exception null, then default to xhr.statusText  

                        alert("There was an error submitting your graph " + errorMessage);
                    }
                }).done(function(data) {
                    console.log(data);
                });
*/
  }

  this.importjson = function()
  {
    var text = $("#samplejson-input").val();
    takeJSON(text);
    statusChecking();
    graph = createState(internalAdjList,internalEdgeList);
    graphWidget.updateGraph(graph, 500);
  }
    
  this.initRandom = function(graph) {
    internalAdjList = graph.internalAdjList;
    internalEdgeList = graph.internalEdgeList;
    amountVertex = internalAdjList.length;
    amountEdge = internalEdgeList.length;
    fixJSON();
    statusChecking();

    DIRECTED_GR = true; 
    OLD_POSITION = amountEdge;

    var newState = createState(internalAdjList, internalEdgeList);

    graphWidget.updateGraph(newState, 500);
  }

  this.bfs = function(sourceVertex) {
    for(var keyy in internalAdjList) 
      internalAdjList[keyy]["extratext"] = "";
    var key;
    var i;
    var notVisited = {};
    var vertexHighlighted = {}, edgeHighlighted = {}, vertexTraversed = {}, edgeTraversed = {}, vertexTraversing = {}, treeEdge = {}, backEdge = {}, forwardEdge = {}, crossEdge = {};;
    var stateList = [];
    var currentState;

    // error checks
    if (amountVertex == 0) { // no graph
      updateJSData('#bfs-err', 205, "There is no graph to run this on. Please select a sample graph first.");
      return false;
    }

    if (sourceVertex >= amountVertex) { // source vertex not in range
      updateJSData('#bfs-err', 206, "This vertex does not exist in the graph. Please select another source vertex.");
      return false;
    }

    var p = {};
    for (var i = 0; i < amountVertex; i++) 
      p[i] = -1;

    for (key in internalAdjList)
      internalAdjList[key]["state"] = VERTEX_DEFAULT;

    vertexHighlighted[sourceVertex] = true;
    currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                              treeEdge, backEdge, crossEdge, forwardEdge);
    currentState["status"] = getTranslatedHtml(207,'Start from source') + ' s = ' + sourceVertex + '<br>'
                            + getTranslatedHtml(208, 'Set') + ' d[' + sourceVertex + '] = 0';
    currentState["lineNo"] = 1;
    stateList.push(currentState);
    delete vertexHighlighted[sourceVertex];

    var q = [], EdgeProcessed = 0;;
    q.push(sourceVertex); p[sourceVertex] = -2;

    function is_parent(u, v) {
      while (v>=0) {
        if (u == v) return true;
        v = p[v];
      }
      return false;
    }

    while (q.length > 0) {
      delete vertexTraversing[q[0]];
      vertexHighlighted[q[0]] = true;
      currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                              treeEdge, backEdge, crossEdge, forwardEdge);
      currentState["status"] = getTranslatedHtml(209, 'The queue is now') +' {' + q + '}<br>'
                             + getTranslatedHtml(210, 'Exploring neighbors of vertex') + ' u = ' + q[0];
      currentState["lineNo"] = 2;
      stateList.push(currentState);

      var u = q.shift(); // front most item
      vertexTraversed[u] = true;

      var nei = [];
      for (var j = 0; j < amountEdge; j++) 
          if (u == internalEdgeList[j]["vertexA"]) 
              nei.push(j);
      nei.sort(function(a, b){return internalEdgeList[a]["vertexB"]-internalEdgeList[b]["vertexB"]});

      while(nei.length > 0) {
        var j = nei.shift();
        var vertexA = internalEdgeList[j]["vertexA"];
        var vertexB = internalEdgeList[j]["vertexB"];
        if (u == vertexA) {
          EdgeProcessed = EdgeProcessed + 1;
          var thisStatus = 'relax(' + vertexA + ',' + vertexB + '), #edge processed = ' + EdgeProcessed;
          if (backEdge[j] == null && crossEdge[j] == null) {
              edgeHighlighted[j] = true;
              for (var z = 0; z < amountEdge; z ++) 
                  if (internalEdgeList[z]["vertexA"] == vertexB && internalEdgeList[z]["vertexB"] == vertexA) 
                      edgeHighlighted[z] = true;
          }
          currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                              treeEdge, backEdge, crossEdge, forwardEdge);
          currentState["status"] = thisStatus;
          currentState["lineNo"] = [3,4];
          currentState["el"][j]["animateHighlighted"] = true;
          stateList.push(currentState);
          if (p[vertexB] == -1) {
              p[vertexB] = vertexA;
              thisStatus = thisStatus + '<br>' + vertexB + ' ' + getTranslatedHtml(211,'is free') + ', '
                          + getTranslatedHtml(212, 'we update') + ' p[' + vertexB + '] = ' + p[vertexB];
              q.push(vertexB);
              vertexTraversing[vertexB] = true;
          } else if (p[u] == vertexB) {
              thisStatus = thisStatus + '<br>' + getTranslatedHtml(212,'No change.');
          } else {
              thisStatus = thisStatus + '<br>'+vertexB+' '+getTranslatedHtml(213, 'is visited.');
              if (is_parent(vertexB, u)) {
                  thisStatus = thisStatus + getTranslatedHtml(214, 'This is a back edge.');
                  backEdge[j] = true;
                  for (var z = 0; z < amountEdge; z ++) 
                      if (internalEdgeList[z]["vertexA"] == vertexB && internalEdgeList[z]["vertexB"] == vertexA) 
                          backEdge[z] = true;
              } else {
                  thisStatus = thisStatus + getTranslatedHtml(215,'This is a cross edge.');
                  crossEdge[j] = true;
                  for (var z = 0; z < amountEdge; z ++) 
                      if (internalEdgeList[z]["vertexA"] == vertexB && internalEdgeList[z]["vertexB"] == vertexA) 
                          crossEdge[z] = true;
              }
              delete edgeHighlighted[j];
              for (var z = 0; z < amountEdge; z ++) 
                  if (internalEdgeList[z]["vertexA"] == vertexB && internalEdgeList[z]["vertexB"] == vertexA) 
                      delete edgeHighlighted[z];
          }
          currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                              treeEdge, backEdge, crossEdge, forwardEdge);
          currentState["status"] = thisStatus;
          currentState["lineNo"] = [3,4];
          stateList.push(currentState);
        }
      }
      delete vertexHighlighted[u];
    }
 
    currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                              treeEdge, backEdge, crossEdge, forwardEdge);
    currentState['status'] = getTranslatedHtml(216, 'BFS is completed. Orange edges create a BFS tree.')
                +'<br>'+getTranslatedHtml(217, 'Green, blue is cross, back edge respectively.');
    stateList.push(currentState);

    console.log(stateList);

    populatePseudocode(0);
    graphWidget.startAnimation(stateList);
    return true;
  }

  this.dfs = function(sourceVertex) {
    for(var keyy in internalAdjList) 
        internalAdjList[keyy]["extratext"] = "";
    var vertexHighlighted = {}, edgeHighlighted = {}, vertexTraversed = {}, edgeTraversed = {}, vertexTraversing = {}, treeEdge = {}, backEdge = {}, forwardEdge = {}, crossEdge = {};
    var stateList = [];
    var currentState;

    // error checks   
    if (amountVertex == 0) { // no graph
      updateJSData('#dfs-err', 218, "There is no graph to run this on. Please select a sample graph first.");
      return false;
    }

    if (sourceVertex >= amountVertex || sourceVertex < 0) { // source vertex not in range
      updateJSData('#dfs-err', 219, "This vertex does not exist in the graph. Please select another source vertex.");
      return false;
    } 

    var p = {}, low = {}, num = {}, Count = 0;
    for (var i = 0; i < amountVertex; i++){
      p[i] = -1;
    }
    p[sourceVertex] = -2;

    function is_parent(u, v) {
      while (v>=0) {
        if (u == v) return true;
        v = p[v];
      }
      return false
    }

    function dfsRecur(u) {
      vertexHighlighted[u] = true;
      currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                                 treeEdge, backEdge, crossEdge, forwardEdge);
      currentState["status"] = "DFS( " + u + " )";
      currentState["lineNo"] = 1;
      stateList.push(currentState);
      delete vertexHighlighted[u];
      
      vertexTraversing[u] = true;
      num[u] = low[u] = ++ Count;

      var nei = [];
      for (var j = 0; j < amountEdge; j++) 
          if (u == internalEdgeList[j]["vertexA"]) 
              nei.push(j);
      nei.sort(function(a, b){return internalEdgeList[a]["vertexB"]-internalEdgeList[b]["vertexB"]});

      while(nei.length > 0) {
        var j = nei.shift(); 
        var vertexA = internalEdgeList[j]["vertexA"];
        var vertexB = internalEdgeList[j]["vertexB"];
        if (!backEdge[j] && !crossEdge[j] && !forwardEdge[j]) {
            edgeHighlighted[j] = true;
            treeEdge[j] = true;
            for (var z = 0; z < amountEdge; z ++) 
                if (internalEdgeList[z]["vertexA"] == vertexB && internalEdgeList[z]["vertexB"] == vertexA) 
                    edgeHighlighted[z] = true, treeEdge[z] = true;
        }
        currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                                   treeEdge, backEdge, crossEdge, forwardEdge);
        currentState["status"] = getTranslatedHtml(220, "Try edge") + " " + u + " -> " + vertexB;
        currentState["lineNo"] = 2;
        currentState["el"][j]["animateHighlighted"] = true;
        stateList.push(currentState);

        if (p[vertexB] == -1) {
            vertexTraversing[vertexB] = true;
            currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                                       treeEdge, backEdge, crossEdge, forwardEdge);
            currentState["lineNo"] = [3,4]; 
            currentState["status"] = getTranslatedHtml(221, "Try edge") + " " + u + " -> " + vertexB + "<br>" + vertexB + " "
                                    + getTranslatedHtml(222, "hasn't been visited") + ", "
                                    + getTranslatedHtml(223, "we have a tree edge.");
            stateList.push(currentState);
            
            p[vertexB] = u;
            dfsRecur(vertexB);
            if (low[u] > low[vertexB]) low[u] = low[vertexB];
            for (var z = 0; z < amountEdge; z ++) 
                if (internalEdgeList[z]["vertexA"] == vertexB && internalEdgeList[z]["vertexB"] == vertexA)
                    delete edgeHighlighted[z];
            delete edgeHighlighted[j];
            currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                                       treeEdge, backEdge, crossEdge, forwardEdge);
            currentState["status"] = getTranslatedHtml(224, "Finish") + " DFS(" + vertexB + "), "
                                    +getTranslatedHtml(225, "back track")
                                    +"<br>DFS( " + u + " )";
            currentState["lineNo"] = 1;
            stateList.push(currentState);
        } else if (p[u] != vertexB && !backEdge[j] && !crossEdge[j] && !forwardEdge[j]) {
            if (low[u] > num[vertexB]) low[u] = num[vertexB];
            for (var z = 0; z < amountEdge; z ++) 
                if (z == j || (internalEdgeList[z]["vertexA"] == vertexB && internalEdgeList[z]["vertexB"] == vertexA)) {
                    if (!DIRECTED_GR) backEdge[z] = true;
                    else {
                        if (is_parent(vertexB, u)) backEdge[z] = true;
                        else if (is_parent(u, vertexB)) forwardEdge[z] = true;
                        else crossEdge[z] = true;
                    }
                }
            for (var z = 0; z < amountEdge; z ++) 
              if (internalEdgeList[z]["vertexA"] == vertexB && internalEdgeList[z]["vertexB"] == vertexA)
                delete edgeHighlighted[z];
            delete edgeHighlighted[j];  
            currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                                       treeEdge, backEdge, crossEdge, forwardEdge);
            var thisStatus = getTranslatedHtml(226, "Try edge") + " " + u + " -> " + vertexB + "<br>"
                            +getTranslatedHtml(227, "Vertex is visited") + " : " + vertexB;
            if (backEdge[j]) thisStatus = thisStatus + getTranslatedHtml(228,"We have a back edge.");
                else if (forwardEdge[j]) thisStatus = thisStatus + getTranslatedHtml(229, "We have a forward edge.");
                else thisStatus = thisStatus + getTranslatedHtml(230, "We have a cross edge.");
            currentState["status"] = thisStatus;
            currentState["lineNo"] = 5;
            stateList.push(currentState);
        } else {
            currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                                      treeEdge, backEdge, crossEdge, forwardEdge);
            currentState["status"] = getTranslatedHtml(231, "Try edge") + " " + u + " -> " + vertexB + "<br>"+vertexB+" "
                                   + getTranslatedHtml(232, "is visited") + ", " 
                                   + getTranslatedHtml(233, "no change.");
            currentState["lineNo"] = 5;
            stateList.push(currentState);
        }
      }
      vertexTraversed[u] = true;
      delete vertexTraversing[u];
    }
    dfsRecur(sourceVertex);

    currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                               treeEdge, backEdge, crossEdge, forwardEdge);
    currentState["status"] = getTranslatedHtml(234, "DFS is completed. Red edges create a DFS tree. Green, grey, blue is cross, forward, back edge respectively. Each blue edge creates a cycle.");
    currentState["lineNo"] = 0;
    stateList.push(currentState);
    
    console.log(stateList);
    populatePseudocode(4);
    graphWidget.startAnimation(stateList);
    return true;
  }
  
  this.bridge = function() {
      for(var keyy in internalAdjList) 
          internalAdjList[keyy]["extratext"] = "";
      var vertexHighlighted={}, edgeHighlighted={};
      var vertexTraversed={}, edgeTraversed={}, vertexTraversing={}, treeEdge={}, backEdge={}, forwardEdge={}
          crossEdge={}, hiddenEdge={}, Bridgess={}, articulationPoint={};
      var stateList = [];
      var currentState;

      //check error
      if (DIRECTED_GR) {
          updateJSData('#bridge-err', 235, "Please make the graph undirected");
          return false;
      }
      if (amountVertex == 0) { // no graph
          updateJSData('#bridge-err', 236, "There is no graph to run this on. Please select a sample graph first.");
          return false;
      }

      // main code
      var p = {}, stack = {}, stackNum = -1, Count = -1, low = {}, num = {}, lab = {}, labNum = 0;
      var ROOT, chilNum={};
      for(var i = 0; i < amountVertex; i ++) {
          p[i] = lab[i] = -1, chilNum[i] = 0;
          internalAdjList[i]["extratext"] = "N/A";
      }
      for(var i = 0; i < amountVertex; i ++)
          if (p[i] == -1) {
              currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                                   treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
              currentState["status"] = getTranslatedHtml(237, "Vertex hasn't been visited")
                                      + " :" + i + "<br>DfsCount = "+Count;
              currentState["lineNo"] = 1;
              stateList.push(currentState);
              p[i]--; ROOT = i; Tdfs(i);
          }

      function Tdfs(u) {
          stack[++stackNum] = u;
          num[u] = low[u] = ++Count;
          internalAdjList[u]["extratext"] = ""+num[u]+","+low[u];
          vertexTraversing[u] = true;
          vertexHighlighted[u] = true;
          currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                         treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
          currentState["status"] = "DFS("+u+")<br>DfsCount = "+Count;
          currentState["lineNo"] = 2;
          stateList.push(currentState);
          delete vertexHighlighted[u];

          var nei = [];
          for (var j = 0; j < amountEdge; j++) 
              if (u == internalEdgeList[j]["vertexA"]) 
                  nei.push(j);
          nei.sort(function(a, b){return internalEdgeList[a]["vertexB"]-internalEdgeList[b]["vertexB"]});

          while(nei.length > 0) {
              var j = nei.shift();
              var vertexA = internalEdgeList[j]["vertexA"];
              var vertexB = internalEdgeList[j]["vertexB"];
              if (lab[vertexB] == -1 && u == vertexA) {
                  edgeHighlighted[j] = true;
                  for (var z = 0; z < amountEdge; z ++) 
                      if (internalEdgeList[z]["vertexA"] == vertexB && internalEdgeList[z]["vertexB"] == vertexA) 
                          edgeHighlighted[z] = true;
                  currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                                 treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
                  currentState["status"] = getTranslatedHtml(239, "Try edge") + " " + vertexA + " -> " + vertexB + "<br>DfsCount = "+Count;
                  currentState["lineNo"] = 3;
                  currentState["el"][j]["animateHighlighted"] = true;
                  for(var key in Bridgess) {
                      currentState["el"][key]["state"] = EDGE_GREEN;
                      for (var z = 0; z < amountEdge; z ++) 
                          if (internalEdgeList[z]["vertexA"] == internalEdgeList[key]["vertexB"] 
                              && internalEdgeList[z]["vertexB"] == internalEdgeList[key]["vertexA"]) 
                              currentState["el"][z]["state"] = EDGE_GREEN;
                  }
                  for(var key in articulationPoint) 
                      currentState["vl"][key]["state"] = VERTEX_GREEN_OUTLINE;
                  stateList.push(currentState);

                  if (p[vertexB] == -1) {
                    vertexTraversing[vertexB] = true;
                      currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                                   treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
                      currentState["status"] = "" + vertexB + " "
                                          + getTranslatedHtml(240, "hasn't been visited") + "<br>DfsCount = "+Count;
                      currentState["lineNo"] = 4;
                      for(var key in Bridgess) {
                          currentState["el"][key]["state"] = EDGE_GREEN;
                          for (var z = 0; z < amountEdge; z ++) 
                              if (internalEdgeList[z]["vertexA"] == internalEdgeList[key]["vertexB"] 
                                  && internalEdgeList[z]["vertexB"] == internalEdgeList[key]["vertexA"]) 
                                  currentState["el"][z]["state"] = EDGE_GREEN;
                      }
                      for(var key in articulationPoint) 
                          currentState["vl"][key]["state"] = VERTEX_GREEN_OUTLINE;
                      stateList.push(currentState);                      

                      p[vertexB] = u;
                      Tdfs(vertexB); chilNum[u]++;
                      if (low[u] > low[vertexB]) low[u] = low[vertexB];
                      internalAdjList[u]["extratext"] = ""+num[u]+","+low[u];

                      currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                                   treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
                      currentState["status"] = getTranslatedHtml(241, "update") + " low["+u+"] "
                                              +getTranslatedHtml(242, "from") + " low["+vertexB+"]<br>DfsCount = "+Count;
                      currentState["lineNo"] = 5;
                      for(var key in Bridgess) {
                          currentState["el"][key]["state"] = EDGE_GREEN;
                          for (var z = 0; z < amountEdge; z ++) 
                              if (internalEdgeList[z]["vertexA"] == internalEdgeList[key]["vertexB"] 
                                  && internalEdgeList[z]["vertexB"] == internalEdgeList[key]["vertexA"]) 
                                  currentState["el"][z]["state"] = EDGE_GREEN;
                      }
                      for(var key in articulationPoint) 
                          currentState["vl"][key]["state"] = VERTEX_GREEN_OUTLINE;
                      stateList.push(currentState);                      

                      var thisStatus = "";
                      if (low[vertexB] >= num[u] && u!=ROOT) {
                          thisStatus=thisStatus+"low["+vertexB+"] >= num["+u+"], "+u+" "
                                      + getTranslatedHtml(243, "is not the root") + " => "+u+" " 
                                      + getTranslatedHtml(244, "is an articulation point") + ".<br>";
                          articulationPoint[u] = true;
                      } else if (low[vertexB] >= num[u] && u==ROOT) {
                          thisStatus=thisStatus+"low["+vertexB+"] >= num["+u+"], "+u+" "
                                  + getTranslatedHtml(245, "is the root") + " => " 
                                  + getTranslatedHtml(246, "no articulation point") + ".<br>";
                      } else 
                          thisStatus=thisStatus+"low["+vertexB+"] < num["+u+"] => "
                                      + getTranslatedHtml(247, "no articulation point") + ".<br>";

                      if (low[vertexB] > num[u]) {
                          thisStatus=thisStatus+"low["+vertexB+"] > num["+u+"] => "+u+"-"+vertexB+" "
                                    +getTranslatedHtml(248, "is a bridge") + ".";
                          Bridgess[j] = true;
                      } else 
                          thisStatus=thisStatus+"low["+vertexB+"] <= num["+u+"] => "+u+"-"+vertexB+" "
                                  + getTranslatedHtml(249, "is not a bridge") + ".";

                      currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                                   treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
                      currentState["status"] = thisStatus;
                      currentState["lineNo"] = 6;
                      for(var key in Bridgess) {
                          currentState["el"][key]["state"] = EDGE_GREEN;
                          for (var z = 0; z < amountEdge; z ++) 
                              if (internalEdgeList[z]["vertexA"] == internalEdgeList[key]["vertexB"] 
                                  && internalEdgeList[z]["vertexB"] == internalEdgeList[key]["vertexA"]) 
                                  currentState["el"][z]["state"] = EDGE_GREEN;
                      }
                      for(var key in articulationPoint) 
                          currentState["vl"][key]["state"] = VERTEX_GREEN_OUTLINE;
                      stateList.push(currentState);                      

                  } else if (vertexB!=p[u]){
                      if (low[u] > num[vertexB]) low[u] = num[vertexB];
                      internalAdjList[u]["extratext"] = ""+num[u]+","+low[u];
                      currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                                   treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
                      currentState["status"] = "" + vertexB + " "
                                      + getTranslatedHtml(250, "is visited") + ", "
                                      + getTranslatedHtml(251, "update") + " low["+u+"] "
                                      + getTranslatedHtml(252, "from") + " num["+vertexB+"]<br>DfsCount = "+Count;
                      currentState["lineNo"] = 7;
                      for(var key in Bridgess) {
                          currentState["el"][key]["state"] = EDGE_GREEN;
                          for (var z = 0; z < amountEdge; z ++) 
                              if (internalEdgeList[z]["vertexA"] == internalEdgeList[key]["vertexB"] 
                                  && internalEdgeList[z]["vertexB"] == internalEdgeList[key]["vertexA"]) 
                                  currentState["el"][z]["state"] = EDGE_GREEN;
                      }
                      for(var key in articulationPoint) 
                          currentState["vl"][key]["state"] = VERTEX_GREEN_OUTLINE;                      
                      stateList.push(currentState);
                  } else {
                      currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                                   treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
                      currentState["status"] = "" + vertexB + " "
                                  + getTranslatedHtml(253, "is the parent of") + " " + u + ", "
                                  + getTranslatedHtml(254, "ignore!") + "<br>DfsCount = "+Count;
                      currentState["lineNo"] = 7;
                      for(var key in Bridgess) {
                          currentState["el"][key]["state"] = EDGE_GREEN;
                          for (var z = 0; z < amountEdge; z ++) 
                              if (internalEdgeList[z]["vertexA"] == internalEdgeList[key]["vertexB"] 
                                  && internalEdgeList[z]["vertexB"] == internalEdgeList[key]["vertexA"]) 
                                  currentState["el"][z]["state"] = EDGE_GREEN;
                      }
                      for(var key in articulationPoint) 
                          currentState["vl"][key]["state"] = VERTEX_GREEN_OUTLINE;                      
                      stateList.push(currentState);
                  }
              }
          }
          delete vertexTraversing[u];
          vertexHighlighted[u] = true;
          vertexTraversed[u] = true;
          currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                         treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
          currentState["status"] = getTranslatedHtml(255, "Finish DFS") + "("+u+")," 
                                   + getTranslatedHtml(256, "back track") + ".<br>DfsCount = "+Count;
          if (u==ROOT && chilNum[u]>=2)  {
              currentState["status"] = getTranslatedHtml(257, "Finish DFS") +"("+u+"), "+u
                                       +getTranslatedHtml(258, " is the root and")+ u 
                                       +getTranslatedHtml (259, "has more than 1 childs")
                                       + "<br>"+ getTranslatedHtml(260, "Hence") + u
                                       +getTranslatedHtml(261, " is an articulation point.");
              articulationPoint[u] = true;
          }
          currentState["lineNo"] = 0;
          for(var key in Bridgess) {
              currentState["el"][key]["state"] = EDGE_GREEN;
              for (var z = 0; z < amountEdge; z ++) 
                  if (internalEdgeList[z]["vertexA"] == internalEdgeList[key]["vertexB"] 
                      && internalEdgeList[z]["vertexB"] == internalEdgeList[key]["vertexA"]) 
                      currentState["el"][z]["state"] = EDGE_GREEN;
          }
          for(var key in articulationPoint) 
              currentState["vl"][key]["state"] = VERTEX_GREEN_OUTLINE;
          currentState["vl"][u]["state"] = VERTEX_HIGHLIGHTED;
          stateList.push(currentState);
          delete vertexHighlighted[u];
      }
      
      currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                             treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
      currentState["status"] = getTranslatedHtml(262, "Finished.")
                               +"<br>"+ getTranslatedHtml(263, "Green ones are articulation points and bridges.");
      currentState["lineNo"] = 0;
      for(var key in Bridgess) {
          currentState["el"][key]["state"] = EDGE_GREEN;
          for (var z = 0; z < amountEdge; z ++) 
              if (internalEdgeList[z]["vertexA"] == internalEdgeList[key]["vertexB"] 
                  && internalEdgeList[z]["vertexB"] == internalEdgeList[key]["vertexA"]) 
                  currentState["el"][z]["state"] = EDGE_GREEN;
      }
      for(var key in articulationPoint) 
          currentState["vl"][key]["state"] = VERTEX_GREEN_OUTLINE;      
      stateList.push(currentState);

      console.log(stateList);
      populatePseudocode(1);
      graphWidget.startAnimation(stateList);
      for(var keyy in internalAdjList) 
          internalAdjList[keyy]["extratext"] = "";
      return true;
  }
  
  this.tarjan = function() {
      for(var keyy in internalAdjList) 
          internalAdjList[keyy]["extratext"] = "";
      var vertexHighlighted={}, edgeHighlighted={};
      var vertexTraversed={}, edgeTraversed={}, vertexTraversing={}, treeEdge={}, backEdge={}, forwardEdge={}
          crossEdge={}, hiddenEdge={};
      var stateList = [];
      var currentState;

      //check error
      if (!DIRECTED_GR) {
          updateJSData("scc-err", 264, "Please make the graph directed");
          return false;
      }
      if (amountVertex == 0) { // no graph
          updateJSData("scc-err", 265, "There is no graph to run this on. Please select a sample graph first.");
          return false;
      }

      // main code
      var p = {}, stack = {}, stackNum = -1, Count = 0, low = {}, num = {}, lab = {}, labNum = 0;
      for(var i = 0; i < amountVertex; i ++) {
          p[i] = lab[i] = -1
          internalAdjList[i]["extratext"] = "N/A";
      }
      for(var i = 0; i < amountVertex; i ++)
          if (p[i] == -1) {
              currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                                   treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
              currentState["status"] = getTranslatedHtml(266, "Vertex ") + i 
                                       + getTranslatedHtml(267, " hasn't been visited");
              currentState["lineNo"] = 1;
              stateList.push(currentState);
              p[i]--; Tdfs(i);
          }

      function getStack() {
          var status = "Stack = [";
          for (var i = 0; i < stackNum; i ++)
              status = status + stack[i] + ",";
          if (stackNum >= 0) status = status + stack[stackNum] + "]";
              else status = status + "]";
          return status;
      }
      function Tdfs(u) {
          stack[++stackNum] = u;
          num[u] = low[u] = ++Count;
          internalAdjList[u]["extratext"] = ""+num[u]+","+low[u];
          vertexTraversing[u] = true;
          vertexHighlighted[u] = true;
          currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                         treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
          currentState["status"] = getStack() + "<br>DFS("+u+")";
          currentState["lineNo"] = 2;
          stateList.push(currentState);
          delete vertexHighlighted[u];

          var nei = [];
          for (var j = 0; j < amountEdge; j++) 
              if (u == internalEdgeList[j]["vertexA"]) 
                  nei.push(j);
          nei.sort(function(a, b){return internalEdgeList[a]["vertexB"]-internalEdgeList[b]["vertexB"]});

          while(nei.length > 0) {
              var j = nei.shift();
              var vertexA = internalEdgeList[j]["vertexA"];
              var vertexB = internalEdgeList[j]["vertexB"];
              if (lab[vertexB] == -1 && u == vertexA) {
                  edgeTraversed[j] = true;
                  edgeHighlighted[j] = true;
                  currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                                 treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
                  currentState["status"] = getStack() + "<br>try edge " + vertexA + " -> " + vertexB;
                  currentState["lineNo"] = 3;
                  currentState["el"][j]["animateHighlighted"] = true;
                  stateList.push(currentState);

                  if (p[vertexB] == -1) {
                      currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                                   treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
                      currentState["status"] = getStack() + "<br>" + vertexB
                                               + getTranslatedHtml(268, " hasn't been visited");
                      currentState["lineNo"] = 4;
                      stateList.push(currentState);

                      p[vertexB] = u;
                      Tdfs(vertexB);
                      if (low[u] > low[vertexB]) low[u] = low[vertexB];
                  } else {
                      if (low[u] > num[vertexB]) low[u] = num[vertexB];
                  }
                  internalAdjList[u]["extratext"] = ""+num[u]+","+low[u];
                  currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                                 treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
                  currentState["status"] = getStack() + "<br>"+ getTranslatedHtml(269, "update") 
                                           + " low[" + u + "] " + getTranslatedHtml(270, "from") 
                                           + " num[" + vertexB + "] "
                                           + getTranslatedHtml(271, "and") + " low[" + vertexB + "]" ;
                  currentState["lineNo"] = 5;
                  stateList.push(currentState);
              }
          }

          delete vertexTraversing[u];
          vertexTraversed[u] = true;
          currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                                 treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
          currentState["status"] = getStack() + "<br>DFS from " + u + " " 
                                              + getTranslatedHtml(272, "is completed, check the condition");
          currentState["lineNo"] = [6, 7];
          stateList.push(currentState);
          if (low[u] == num[u]) {
              currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                             treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
              currentState["status"] = getStack() + "<br>low[" + u + "] == num[" + u + "]";
              currentState["lineNo"] = 6;
              stateList.push(currentState);
              var oldPos = stackNum;
              labNum ++;
              while (stack[stackNum] != u)
                  lab[stack[stackNum--]] = labNum;
              lab[stack[stackNum--]] = labNum;

              for (var i = stackNum+1; i <= oldPos; i ++)
                  vertexHighlighted[stack[i]] = true;
              currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                             treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
              currentState["status"] = getStack() + "<br>" 
                                        + getTranslatedHtml(273,"pop from stack until we get ") + u;
              currentState["lineNo"] = 7;
              stateList.push(currentState);
              for (var i = stackNum+1; i <= oldPos; i ++)
                  delete vertexHighlighted[stack[i]];

              for (var j=0; j < amountEdge; j ++) {
                  var vertexA = internalEdgeList[j]["vertexA"];
                  var vertexB = internalEdgeList[j]["vertexB"];
                  if (lab[vertexA] != lab[vertexB])
                      hiddenEdge[j] = true;
              }
              currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                             treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
              currentState["status"] = getStack() + "<br>"
                                        + getTranslatedHtml(274, "We get 1 strong component");
              currentState["lineNo"] = 7;
              stateList.push(currentState);
          }
      }
      
      currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                             treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
      currentState["status"] = getTranslatedHtml(275, "Finally we get ") + labNum 
                                + getTranslatedHtml(276, " strong components");
      currentState["lineNo"] = 1;
      stateList.push(currentState);

      console.log(stateList);
      populatePseudocode(5);
      graphWidget.startAnimation(stateList);
      for(var keyy in internalAdjList) 
          internalAdjList[keyy]["extratext"] = "";
      return true;
  }

  this.kosaraju = function() {
      for(var keyy in internalAdjList) 
          internalAdjList[keyy]["extratext"] = "";
      var vertexHighlighted={}, edgeHighlighted={};
      var vertexTraversed={}, edgeTraversed={}, vertexTraversing={}, treeEdge={}, backEdge={}, forwardEdge={}
          crossEdge={}, hiddenEdge={};
      var stateList = [];
      var currentState;

      //check error
      if (!DIRECTED_GR) {
          updateJSData("scc-err", 277, "Please make the graph directed");
          return false;
      }
      if (amountVertex == 0) { // no graph
          updateJSData("scc-err", 278, "There is no graph to run this on. Please select a sample graph first.");
          return false;
      }

      // main code
      var p = {}, stack = {}, stackNum = -1, Count = 0, low = {}, num = {}, lab = {}, labNum = 0;
      for(var i = 0; i < amountVertex; i ++)
          p[i] = lab[i] = -1
      for(var i = 0; i < amountVertex; i ++)
          if (p[i] == -1) {
              currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                                   treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
              currentState["status"] = getTranslatedHtml(279, "Vertex") + " " + i + " " 
                                        + getTranslatedHtml(280, "hasn't been visited");
              currentState["lineNo"] = 1;
              stateList.push(currentState);
              p[i]--; Tdfs(i);
          }

      vertexHighlighted={}, edgeHighlighted={};
      vertexTraversed={}, edgeTraversed={}, vertexTraversing={};      
      for (var j = 0; j < amountEdge; j ++) {
          var vertexA = internalEdgeList[j]["vertexA"];
          var vertexB = internalEdgeList[j]["vertexB"];
          internalEdgeList[j]["vertexA"] = vertexB;
          internalEdgeList[j]["vertexB"] = vertexA;
      }
      currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                                   treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
      currentState["status"] = getTranslatedHtml(281, "Transpose the graph");
      currentState["lineNo"] = 4;
      stateList.push(currentState);

      while (stackNum >= 0) {
          if (lab[stack[stackNum]] == -1) {
              labNum++; DFS2(stack[stackNum]);
              for (var j=0; j < amountEdge; j ++) {
                  var vertexA = internalEdgeList[j]["vertexA"];
                  var vertexB = internalEdgeList[j]["vertexB"];
                  if (lab[vertexA] != lab[vertexB])
                      hiddenEdge[j] = true;
              }

              currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                         treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
              currentState["status"] = getStack() + "<br>" 
                                       + getTranslatedHtml(282, "Finish DFS from ") + stack[stackNum] + ". "
                                       + getTranslatedHtml(283, "We get 1 strong component.");
              currentState["lineNo"] = 7;
              stateList.push(currentState);
          } else {
              currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                         treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
              currentState["status"] = getStack() + "<br>"+stack[stackNum]
                                       + getTranslatedHtml(284, " is visited, ignore");
              currentState["lineNo"] = 5;
              stateList.push(currentState);
          }
          stackNum--;
      }

      function getStack() {
          var status = "List = [";
          for (var i = stackNum; i >0; i --)
              status = status + stack[i] + ",";
          if (stackNum >= 0) status = status + stack[0] + "]";
              else status = status + "]";
          return status;
      }
      function Tdfs(u) {
          vertexTraversing[u] = true;
          vertexHighlighted[u] = true;
          currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                         treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
          currentState["status"] = getStack() + "<br>DFS("+u+")";
          currentState["lineNo"] = 1;
          stateList.push(currentState);
          delete vertexHighlighted[u];

          var nei = [];
          for (var j = 0; j < amountEdge; j++) 
              if (u == internalEdgeList[j]["vertexA"]) 
                  nei.push(j);
          nei.sort(function(a, b){return internalEdgeList[a]["vertexB"]-internalEdgeList[b]["vertexB"]});

          while(nei.length > 0) {
              var j = nei.shift();
              var vertexA = internalEdgeList[j]["vertexA"];
              var vertexB = internalEdgeList[j]["vertexB"];
              if (lab[vertexB] == -1 && u == vertexA) {
                  edgeTraversed[j] = true;
                  edgeHighlighted[j] = true;
                  currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                                 treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
                  currentState["el"][j]["animateHighlighted"]=true;
                  currentState["status"] = getStack() + "<br>"+ getTranslatedHtml(285, "try edge ") 
                                            + vertexA + " -> " + vertexB;
                  currentState["lineNo"] = 2;
                  stateList.push(currentState);

                  if (p[vertexB] == -1) {
                      currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                                   treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
                      currentState["status"] = getStack() + "<br>" + vertexB 
                                                + getTranslatedHtml(286, " hasn't been visited");
                      currentState["lineNo"] = 2;
                      stateList.push(currentState);

                      p[vertexB] = u;
                      Tdfs(vertexB);
                  }
              }
          }
          stack[++stackNum] = u;
          delete vertexTraversing[u];
          vertexTraversed[u] = true;
          currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                                 treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
          currentState["status"] = getStack() + "<br>"+ getTranslatedHtml(287, "DFS from ")
                                   + u + getTranslatedHtml(288, " is completed, add ") + u 
                                   + getTranslatedHtml(289, " to the list");
          currentState["lineNo"] = 3;
          stateList.push(currentState);
      }
      function DFS2(u) {
          lab[u] = labNum;
          vertexTraversing[u] = true;
          vertexHighlighted[u] = true;
          currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                         treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
          currentState["status"] = getStack() + "<br>DFS("+u+")";
          currentState["lineNo"] = 5;
          stateList.push(currentState);
          delete vertexHighlighted[u];

          var nei = [];
          for (var j = 0; j < amountEdge; j++) 
              if (u == internalEdgeList[j]["vertexA"]) 
                  nei.push(j);
          nei.sort(function(a, b){return internalEdgeList[a]["vertexB"]-internalEdgeList[b]["vertexB"]});

          while(nei.length > 0) {
              var j = nei.shift();
              var vertexA = internalEdgeList[j]["vertexA"];
              var vertexB = internalEdgeList[j]["vertexB"];
              if (hiddenEdge[j] == null) {
                  edgeTraversed[j] = true;
                  edgeHighlighted[j] = true;
                  currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                                 treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
                  currentState["el"][j]["animateHighlighted"]=true;
                  currentState["status"] = getStack() + "<br>try edge " + vertexA + " -> " + vertexB;
                  currentState["lineNo"] = 6;
                  stateList.push(currentState);

                  if (lab[vertexB] == -1) {
                      currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                                   treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
                      currentState["status"] = getStack() + "<br>" + vertexB + " hasn't been visited";
                      currentState["lineNo"] = 6;
                      stateList.push(currentState);

                      DFS2(vertexB);
                  } else {
                      currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                                   treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
                      currentState["status"] = getStack() + "<br>" + vertexB + " is visited";
                      currentState["lineNo"] = 6;
                      stateList.push(currentState);
                  }
              }
          }

          delete vertexTraversing[u];
          vertexTraversed[u] = true;
          currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                                 treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
          currentState["status"] = getStack() + "<br>DFS from " + u + " is completed, back to the parent";
          currentState["lineNo"] = 5;
          stateList.push(currentState);
      }
      
      for (var i = 0; i < amountEdge; i ++) {
          var vertexA = internalEdgeList[i]["vertexA"];
          var vertexB = internalEdgeList[i]["vertexB"];
          internalEdgeList[i]["vertexA"] = vertexB;
          internalEdgeList[i]["vertexB"] = vertexA;
      }
      currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                             treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
      currentState["status"] = "Transpose again. Finally we get " + labNum + " strong components";
      currentState["lineNo"] = 0;
      stateList.push(currentState);

      console.log(stateList);
      populatePseudocode(6);
      graphWidget.startAnimation(stateList);
      return true;    
  }

  this.bipartiteDfs = function() {
    for(var keyy in internalAdjList) 
        internalAdjList[keyy]["extratext"] = "";
    var key;
    var vertexHighlighted = {}, edgeHighlighted = {}, vertexTraversed = {}, edgeTraversed = {}, vertexTraversing = {};
    var stateList = [];
    var currentState;

    // error checks   
    if (amountVertex == 0) { // no graph
      $('#bipartite-err').html("There is no graph to run this on. Please select a sample graph first.");
      return false;
    }
    if (DIRECTED_GR) {
        $('#bipartite-err').html("Please make the graph undirected");
        return false;
    }

    var p = {}; 
    var flag = false;
    for (var i = 0; i < amountVertex; i++) p[i] = -1;
    for (var i = 0; i < amountVertex; i++) if (p[i] == -1) {
        vertexTraversed[i] = true;
        currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing);
        currentState["status"] = "Vertex "+i+" is unvisited";
        currentState["lineNo"] = 1;
        if (vertexTraversed[i] != null) currentState["vl"][i]["state"] = VERTEX_HIGHLIGHTED;
            else currentState["vl"][i]["state"] = VERTEX_BLUE_FILL;
        stateList.push(currentState);      
        p[i] = -2; dfsRecur(i);
        if (flag) break;
    }
    function dfsRecur(u) {
        if (flag) return;
        currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing);
        currentState["status"] = "DFS( " + u + " )";
        currentState["lineNo"] = 2;
        if (vertexTraversed[u] != null) currentState["vl"][u]["state"] = VERTEX_HIGHLIGHTED;
            else currentState["vl"][u]["state"] = VERTEX_BLUE_FILL;
        stateList.push(currentState);

        var nei = [];
        for (var j = 0; j < amountEdge; j++) 
            if (u == internalEdgeList[j]["vertexA"]) 
                nei.push(j);
        nei.sort(function(a, b){return internalEdgeList[a]["vertexB"]-internalEdgeList[b]["vertexB"]});

        while(nei.length > 0) {
          var j = nei.shift();
          if (edgeHighlighted[j] == null) {
            var vertexA = internalEdgeList[j]["vertexA"];
            var vertexB = internalEdgeList[j]["vertexB"];
            if (u == vertexA) {
                for (var z = 0; z < amountEdge; z ++) 
                    if (internalEdgeList[z]["vertexA"] == vertexB && internalEdgeList[z]["vertexB"] == vertexA) 
                        edgeHighlighted[z] = true;
                edgeHighlighted[j] = true;
                currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing);
                currentState["status"] = "Try edge " + u + " -> " + vertexB;
                currentState["el"][j]["animateHighlighted"]=true;
                currentState["lineNo"] = 3; 
                if (vertexTraversed[u] != null) currentState["vl"][u]["state"] = VERTEX_HIGHLIGHTED;
                    else currentState["vl"][u]["state"] = VERTEX_BLUE_FILL;                
                stateList.push(currentState);

                if (p[vertexB] == -1) {
                    if (vertexTraversed[u]==null) vertexTraversed[vertexB]=true;
                        else vertexTraversing[vertexB]=true;
                    p[vertexB] = u;
                    currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing);
                    currentState["status"] = "Try edge " + u + " -> " + vertexB;
                    currentState["lineNo"] = 4;
                    if (vertexTraversed[u] != null) currentState["vl"][u]["state"] = VERTEX_HIGHLIGHTED;
                        else currentState["vl"][u]["state"] = VERTEX_BLUE_FILL;    
                    stateList.push(currentState);
                    dfsRecur(vertexB);
                } else {
                    var cu=0, cv=0;
                    if (vertexTraversing[u]!=null) cu=1;
                    if (vertexTraversing[vertexB]!=null) cv=1;  
                    if (cu == cv) {
                        flag = true;
                        currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing);
                        currentState["status"] = "Vertex "+u+" and vertex "+vertexB+" have the same color";
                        currentState["lineNo"] = 5;
                        if (vertexTraversed[u] != null) currentState["vl"][u]["state"] = VERTEX_HIGHLIGHTED;
                            else currentState["vl"][u]["state"] = VERTEX_BLUE_FILL;
                        if (vertexTraversed[vertexB] != null) currentState["vl"][vertexB]["state"] = VERTEX_HIGHLIGHTED;
                            else currentState["vl"][vertexB]["state"] = VERTEX_BLUE_FILL;
                        stateList.push(currentState); 
                        break;
                    }
                }
                if (flag) break;
            }
            if (flag) break;
        }}
        if (flag) return;
        currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing);
        currentState["status"] = "Finish DFS("+u+")<br> Back to the parent";
        currentState["lineNo"] = 2;
        if (vertexTraversed[u] != null) currentState["vl"][u]["state"] = VERTEX_HIGHLIGHTED;
            else currentState["vl"][u]["state"] = VERTEX_BLUE_FILL;
        stateList.push(currentState); 
    }

    currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing);
    if (flag==false) currentState["status"] = "This is a bipartite graph!";
        else currentState["status"] = "This is NOT a bipartite graph!";
    currentState["lineNo"] = 0;
    if (flag==true) currentState["lineNo"] = 6; 
    stateList.push(currentState);

    
    console.log(stateList);
    populatePseudocode(8);
    graphWidget.startAnimation(stateList);
    return true;
  }

  this.bipartiteBfs = function() {
    for(var keyy in internalAdjList) 
      internalAdjList[keyy]["extratext"] = "";
    var key;
    var vertexHighlighted = {}, edgeHighlighted = {}, vertexTraversed = {}, edgeTraversed = {}, vertexTraversing = {};
    var stateList = [];
    var currentState;
    var flag = true;

    // error checks
    if (amountVertex == 0) { // no graph
      $('#bipartite-err').html("There is no graph to run this on. Please select a sample graph first.");
      return false;
    }
    if (DIRECTED_GR) {
        $('#bipartite-err').html("Please make the graph undirected");
        return false;
    }

    var p = {};
    for (var i = 0; i < amountVertex; i++) p[i] = -1;

    for (key in internalAdjList)
      internalAdjList[key]["state"] = VERTEX_DEFAULT;

    for (var s = 0; s < amountVertex; s ++) if (p[s] == -1) {
        p[s]=-2;
        vertexTraversed[s] = true;
        currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing);
        currentState["status"] = 'Vertex '+s+' is unvisited';
        currentState["lineNo"] = 1;
        if (vertexTraversed[s] != null) currentState["vl"][s]["state"] = VERTEX_HIGHLIGHTED;
            else currentState["vl"][s]["state"] = VERTEX_BLUE_FILL;
        stateList.push(currentState);

        var q = []; q.push(s);
        currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing);
        currentState["status"] = "Queue = ["+q+"]";
        currentState["lineNo"] = 2;
        stateList.push(currentState);

        while (q.length > 0) {
            var u = q.shift();

            currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing);
            currentState["status"] = "Queue = ["+q+"]<br>Extract "+u+" from queue";
            currentState["lineNo"] = 3;
            if (vertexTraversed[u] != null) currentState["vl"][u]["state"] = VERTEX_HIGHLIGHTED;
                else currentState["vl"][u]["state"] = VERTEX_BLUE_FILL;
            stateList.push(currentState);

            var nei = [];
            for (var j = 0; j < amountEdge; j++) 
                if (u == internalEdgeList[j]["vertexA"]) 
                    nei.push(j);
            nei.sort(function(a, b){return internalEdgeList[a]["vertexB"]-internalEdgeList[b]["vertexB"]});

            while(nei.length > 0) {
              var j = nei.shift(); 
              if (edgeHighlighted[j] == null) {
                var vertexA = internalEdgeList[j]["vertexA"];
                var vertexB = internalEdgeList[j]["vertexB"];
                if (u == vertexA) {
                    edgeHighlighted[j] = true;
                    for (var z = 0; z < amountEdge; z ++) 
                    if (internalEdgeList[z]["vertexA"] == vertexB && internalEdgeList[z]["vertexB"] == vertexA) 
                        edgeHighlighted[z] = true;
                    currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing);
                    currentState["el"][j]["animateHighlighted"] = true;
                    currentState["status"] = "Queue = ["+q+"]<br>Try edge "+vertexA+" -> "+vertexB;
                    currentState["lineNo"] = 4;
                    if (vertexTraversed[u] != null) currentState["vl"][u]["state"] = VERTEX_HIGHLIGHTED;
                        else currentState["vl"][u]["state"] = VERTEX_BLUE_FILL;
                    stateList.push(currentState);              

                    if (p[vertexB] == -1) {
                        p[vertexB] = vertexA;
                        q.push(vertexB);
                        if (vertexTraversed[u] != null) vertexTraversing[vertexB] = true;
                            else vertexTraversed[vertexB] = true;

                        currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing);
                        currentState["status"] = "Queue = ["+q+"]<br>"+vertexB+" is free, push "+vertexB+" to queue";
                        currentState["lineNo"] = 6;
                        if (vertexTraversed[u] != null) currentState["vl"][u]["state"] = VERTEX_HIGHLIGHTED;
                            else currentState["vl"][u]["state"] = VERTEX_BLUE_FILL;
                        stateList.push(currentState); 
                    } else {
                        var cu=0, cv=0;
                        if (vertexTraversing[u]!=null) cu=1;
                        if (vertexTraversing[vertexB]!=null) cv=1;  
                        if (cu == cv) {
                            flag = false;
                            currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing);
                            currentState["status"] = "Vertex "+u+" and vertex "+vertexB+" have the same color";
                            currentState["lineNo"] = 5;
                            if (vertexTraversed[u] != null) currentState["vl"][u]["state"] = VERTEX_HIGHLIGHTED;
                                else currentState["vl"][u]["state"] = VERTEX_BLUE_FILL;
                            if (vertexTraversed[vertexB] != null) currentState["vl"][vertexB]["state"] = VERTEX_HIGHLIGHTED;
                                else currentState["vl"][vertexB]["state"] = VERTEX_BLUE_FILL;
                            stateList.push(currentState); 
                            break;
                        }
                    } 
                    if (flag == false) break;
                }
                if (flag == false) break;
              }
              if (flag == false) break;
            }
            if (flag == false) break;
        }
        if (flag == false) break;
    }

    currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing);
    if (flag) currentState["status"] = "This is a bipartite graph!";
        else currentState["status"] = "This is NOT a bipartite graph!";
    currentState["lineNo"] = 0;
    stateList.push(currentState);

    console.log(stateList);

    populatePseudocode(7);
    graphWidget.startAnimation(stateList);
    return true;
  }

  this.toposortDfs = function() {
      for(var keyy in internalAdjList) 
          internalAdjList[keyy]["extratext"] = "";
      var vertexHighlighted={}, edgeHighlighted={};
      var vertexTraversed={}, edgeTraversed={}, vertexTraversing={}, treeEdge={}, backEdge={}, forwardEdge={}
          crossEdge={}, hiddenEdge={};
      var stateList = [];
      var currentState;
      var flag = true;

      //check error
      if (!DIRECTED_GR) {
          $('#topo-err').html("Please make the graph directed");
          return false;
      }
      if (amountVertex == 0) { // no graph
          $('#topo-err').html("There is no graph to run this on. Please select a sample graph first.");
          return false;
      }

      // main code
      var p = {}, stack = [], stackNum = -1;
      for(var i = 0; i < amountVertex; i ++)
          p[i] = -1
      for(var i = 0; i < amountVertex; i ++)
          if (p[i] == -1) {
              currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                                   treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
              currentState["status"] = "Vertex " + i + " hasn't been visited";
              currentState["lineNo"] = 1;
              stateList.push(currentState);
              p[i]--; Tdfs(i);
          }

      function Tdfs(u) {
          if (flag == false) return;
          vertexTraversing[u] = true;
          vertexHighlighted[u] = true;
          currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                         treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
          currentState["status"] = "DFS("+u+")";
          currentState["lineNo"] = 2;
          stateList.push(currentState);
          delete vertexHighlighted[u];

          var nei = [];
          for (var j = 0; j < amountEdge; j++) 
              if (u == internalEdgeList[j]["vertexA"]) 
                  nei.push(j);
          nei.sort(function(a, b){return internalEdgeList[a]["vertexB"]-internalEdgeList[b]["vertexB"]});

          while(nei.length > 0) {
              var j = nei.shift();
              var vertexA = internalEdgeList[j]["vertexA"];
              var vertexB = internalEdgeList[j]["vertexB"];
              if (u == vertexA) {
                  edgeTraversed[j] = true;
                  edgeHighlighted[j] = true;
                  currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                                 treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
                  currentState["el"][j]["animateHighlighted"] = true;
                  currentState["status"] = "try edge " + vertexA + " -> " + vertexB +"<br>List =["+stack+"]";
                  currentState["lineNo"] = 3;
                  stateList.push(currentState);

                  if (p[vertexB] == -1) {
                      currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                                   treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
                      currentState["status"] = "Vertex"+vertexB+" hasn't been visited<br>List =["+stack+"]";
                      currentState["lineNo"] = [4,5];
                      stateList.push(currentState);

                      p[vertexB] = u;
                      Tdfs(vertexB);
                  } else {
                      var k = u;
                      while (k!=-2) {
                          k = p[k];
                          if (k == vertexB) flag = false;
                      }
                      currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                                   treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
                      currentState["status"] = "Vertex"+vertexB+" has been visited<br>List =["+stack+"]";
                      currentState["lineNo"] = 6;
                      stateList.push(currentState);
                  }
              }
          }
          stack.push(u);
          delete vertexTraversing[u];
          vertexTraversed[u] = true;
          currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                                 treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
          currentState["status"] = "DFS from " + u + " is completed, add "+u+" to the list<br>List =["+stack+"]";
          currentState["lineNo"] = 7;
          stateList.push(currentState);
      }      
      if (flag==false) { // not DAG
          $('#topo-err').html("This is not a DAG graph.");
          return false;
      }
      vertexHighlighted={}, edgeHighlighted={};
      vertexTraversed={}, edgeTraversed={}, vertexTraversing={}, treeEdge={}, backEdge={}, forwardEdge={}
          crossEdge={}, hiddenEdge={};
      currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                             treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
      stack.reverse();
      currentState["status"] = "TopoSort is completed<br>List = ["+stack+"]";
      currentState["lineNo"] = 0;
      stateList.push(currentState);

      console.log(stateList);
      populatePseudocode(9);
      graphWidget.startAnimation(stateList);
      return true;    
  }

  this.toposortBfs = function() {
    var vertexHighlighted = {}, edgeHighlighted = {}, vertexTraversed = {}, edgeTraversed = {}, vertexTraversing = {}, treeEdge = {}, backEdge = {}, forwardEdge = {}, crossEdge = {}, hiddenEdge = {};
    var stateList = [];
    var currentState, key;

    // error checks
    if (amountVertex == 0) { // no graph
        $('#topo-err').html("There is no graph to run this on. Please select a sample graph first.");
        return false;
    }
    if (!DIRECTED_GR) {
        $('#topo-err').html("Please make the graph directed");
        return false;
    }

    var fr = {}, cc = {};
    for (var i = 0; i < amountVertex; i++) 
        fr[i] = true, cc[i] = 0;
    for (var j = 0; j < amountEdge; j ++)
        cc[internalEdgeList[j]["vertexB"]] ++;

    for (key in internalAdjList)
      internalAdjList[key]["state"] = VERTEX_DEFAULT,
      internalAdjList[key]["extratext"] = "";

    var q = [], EdgeProcessed = 0, Lis = [];
    for (var i = 0; i < amountVertex; i ++)
        if (cc[i] == 0) q.push(i), vertexHighlighted[i] = vertexTraversing[i] = true;
    currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                              treeEdge, backEdge, crossEdge, forwardEdge);
    currentState["status"] = "Queue = ["+q+"]"
    currentState["lineNo"] = 1;
    stateList.push(currentState);
    for (var i = 0; i < amountVertex; i ++)
        if (cc[i] == 0) delete vertexHighlighted[i];

    while (q.length > 0) {
      currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                              treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
      currentState["status"] = "Queue = ["+q+"]";
      currentState["lineNo"] = 2;
      stateList.push(currentState);

      var u = q.shift(); // front most item
      Lis.push(u);
      vertexHighlighted[u] = true;
      currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                              treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
      currentState["status"] = "Pop vertex "+u+" from queue and add to the list<br>List = ["+Lis+"]";
      currentState["lineNo"] = 3;
      stateList.push(currentState);

      var nei = [];
      for (var j = 0; j < amountEdge; j++) 
          if (u == internalEdgeList[j]["vertexA"]) 
              nei.push(j);
      nei.sort(function(a, b){return internalEdgeList[a]["vertexB"]-internalEdgeList[b]["vertexB"]});

      while(nei.length > 0) {
          var j = nei.shift();
          var vertexA = internalEdgeList[j]["vertexA"];
          var vertexB = internalEdgeList[j]["vertexB"];
          cc[vertexB] --;

          hiddenEdge[j] = true;
          var thisStatus = 'Queue = ['+q+']<br>Delete edge ' + vertexA + ' -> ' + vertexB;
          currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                              treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
          currentState["status"] = thisStatus;
          currentState["lineNo"] = [4,5];
          currentState["el"][j]["animateHighlighted"] = true;
          stateList.push(currentState);

          if (cc[vertexB] == 0) {
              q.push(vertexB);
              vertexTraversing[vertexB] = true;
              currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                              treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
              currentState["status"] = "Queue = ["+q+"]<br>"+vertexB+" now has no incoming edge, add to queue.";
              currentState["lineNo"] = 6;
              stateList.push(currentState);
          } else {
              currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                              treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
              currentState["status"] = "Queue = ["+q+"]<br>"+vertexB+" still has incoming edge, ignore.";
              currentState["lineNo"] = 6;
              stateList.push(currentState);
          }
      }
      delete vertexHighlighted[u];
      delete vertexTraversing[u];
      vertexTraversed[u] = true;
    }
  
    var thisStatus = "Kahn's algorithm is completed.<br>";
    var flag = true;
    for (var j = 0; j < amountEdge; j ++)
        if (hiddenEdge[j] == null) {
            flag = false;
            thisStatus += "Edge "+internalEdgeList[j]["vertexA"]+"->"+internalEdgeList[j]["vertexB"]+" hasn't been visited, the graph has cycle."
            break;
        }
    if (flag)
        thisStatus += "Topological order = ["+Lis+"]";
    currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                              treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
    currentState["lineNo"] = 7;
    currentState["status"] = thisStatus;
    stateList.push(currentState);

    console.log(stateList);

    populatePseudocode(3);
    graphWidget.startAnimation(stateList);
    return true;
  }

  this.twosat = function(numOfRows, numOfColumns) {
    var vertexHighlighted = {}, edgeHighlighted = {};
    var stateList = [];
    var currentState;
    var currentX = 0, currentY = -170;
    var centerX = 200, centerY = 200;
    DIRECTED_GR = true;
    numOfColumns *= 2;
    var blocked = new Array(numOfRows+1);
    for (var i = 0; i <= numOfRows; ++i) {
      blocked[i] = new Array(numOfColumns+1);
      for (var j = 0; j <= numOfColumns; ++j)
        blocked[i][j] = false;
    }

    if (numOfRows < 1 || numOfColumns < 1) { // no graph
      $('#twosat-err').html("Invalid size.");
      return false;
    }

    this.checkInputt = function(XX) {
      var cc = 0;
      for(var j = 1; j <= numOfColumns; j ++)
          if (blocked[XX][j]) cc++;
      return cc;
    }

    this.checkInput = function() {
      for(var i = 1; i<=numOfRows; i++) {
          var cc = 0;
          for(var j = 1; j <= numOfColumns; j ++)
              if (blocked[i][j]) cc++;
          if (cc!=2) return false;
      }
      return true;
    }

    this.changeState = function(rowIndex,columnIndex) {
      var temp = '#cell' + rowIndex + columnIndex;
      if (blocked[rowIndex][columnIndex]) {
        $(temp).attr("bgcolor","white");
        blocked[rowIndex][columnIndex] = false;
      } else {
        $(temp).attr("bgcolor","black");
        blocked[rowIndex][columnIndex] = true;
      }
      if (this.checkInputt(rowIndex) > 2) {
          $('#twosat-board-err').html("Row "+rowIndex+" has more than 2 black cells.")
                            .delay(1000)
                            .queue(function(n) {
                                $(this).html("");
                                n();
                            });
      }
    }

    this.createGraph = function() {
      internalAdjList = {};
      internalEdgeList = {};
      amountEdge = 0;
      amountVertex = numOfColumns;

      getvar = function(i) {
          return i%2==0 ? "-x"+(i/2+1) : "x"+(i+1)/2;
      }
      getOpp = function(i) {
          return i%2==0 ? i + 1 : i - 1;
      }

      for (var i = 1; i <= numOfColumns; ++i) {
        var angle = Math.acos(-1)*2/amountVertex;
        var x1 = currentX * Math.cos(angle) - currentY * Math.sin(angle);
        var y1 = currentX * Math.sin(angle) + currentY * Math.cos(angle);
        currentX=x1, currentY=y1;
        internalAdjList[i-1] = {
          "cx": currentX + centerX,
          "cy": currentY + centerY,
          "text": i-1,
          "extratext": i%2==0 ? "x"+i/2 : "-x"+(i+1)/2 
        }
      }

      currentState = createState(internalAdjList, internalEdgeList);
      currentState["status"] = "Create 2 vertices for each variable.";
      currentState["lineNo"] = 1;
      stateList.push(currentState);

      for (var i = 1; i <= numOfRows; ++i) {
        var a, b;
        for (var j = 0; j < numOfColumns; j++) 
            if (blocked[i][j+1]) a = j;
        for (var j = numOfColumns-1; j >= 0; j--) 
            if (blocked[i][j+1]) b = j; 
        var pos1=-1, pos2=-1;
        var flag = true;
        for (var j = 0; j < amountEdge; j++) if (internalEdgeList[j]["vertexA"]==getOpp(a) && internalEdgeList[j]["vertexB"]==b)
            flag = false, pos1 = j;
        if (flag && getOpp(a)!==b) {
            internalEdgeList[amountEdge++] =  {
              "vertexA": getOpp(a),
              "vertexB": b
            }
            pos1 = amountEdge-1;
        }

        flag = true;
        for (var j = 0; j < amountEdge; j++) if (internalEdgeList[j]["vertexA"]==getOpp(b) && internalEdgeList[j]["vertexB"]==a)
            flag = false, pos2 = j;
        if (flag && getOpp(b)!==a) {
            internalEdgeList[amountEdge++] =  {
              "vertexA": getOpp(b),
              "vertexB": a
            }
            pos2 = amountEdge-1;
        }

        currentState = createState(internalAdjList, internalEdgeList);
        currentState["status"] = "Clause = "+getvar(a)+" or "+getvar(b)
              +"<br>Create edge "+getvar(getOpp(a))+"->"+getvar(b)+" ("+getOpp(a)+"->"+b+") and "
              +getvar(getOpp(b))+"->"+getvar(a) + " ("+ getOpp(b)+"->"+a+")";
        currentState["lineNo"] = 2;
        if (pos1!=-1) currentState["el"][pos1]["animateHighlighted"] = true;
        if (pos2!=-1) currentState["el"][pos2]["animateHighlighted"] = true;
        stateList.push(currentState);        
      }
      return true;
    }

    this.runAlgo = function() {
      var vertexHighlighted={}, edgeHighlighted={};
      var vertexTraversed={}, edgeTraversed={}, vertexTraversing={}, treeEdge={}, backEdge={}, forwardEdge={}
          crossEdge={}, hiddenEdge={};
      var currentState;

      //check error
      if (!DIRECTED_GR) {
          $('#scc-err').html("Please make the graph directed");
          return false;
      }
      if (amountVertex == 0) { // no graph
          $('#scc-err').html("There is no graph to run this on. Please select a sample graph first.");
          return false;
      }

      // main code
      var p = {}, stack = {}, stackNum = -1, Count = 0, low = {}, num = {}, lab = {}, labNum = 0;
      for(var i = 0; i < amountVertex; i ++)
          p[i] = lab[i] = -1
      for(var i = 0; i < amountVertex; i ++)
          if (p[i] == -1) {
              currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                                   treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
              currentState["status"] = "Vertex " + i + " hasn't been visited";
              currentState["lineNo"] = 3;
              stateList.push(currentState);
              p[i]--; Tdfs(i);
          }

      vertexHighlighted={}, edgeHighlighted={};
      vertexTraversed={}, edgeTraversed={}, vertexTraversing={};      
      for (var j = 0; j < amountEdge; j ++) {
          var vertexA = internalEdgeList[j]["vertexA"];
          var vertexB = internalEdgeList[j]["vertexB"];
          internalEdgeList[j]["vertexA"] = vertexB;
          internalEdgeList[j]["vertexB"] = vertexA;
      }
      currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                                   treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
      currentState["status"] = "Transpose the graph";
      currentState["lineNo"] = 3;
      stateList.push(currentState);

      while (stackNum >= 0) {
          if (lab[stack[stackNum]] == -1) {
              labNum++; DFS2(stack[stackNum]);
              for (var j=0; j < amountEdge; j ++) {
                  var vertexA = internalEdgeList[j]["vertexA"];
                  var vertexB = internalEdgeList[j]["vertexB"];
                  if (lab[vertexA] != lab[vertexB]) {
                      hiddenEdge[j] = true;
                      for (var z = 0; z < amountEdge; z ++) 
                        if (internalEdgeList[z]["vertexA"] == vertexB && internalEdgeList[z]["vertexB"] == vertexA) 
                          hiddenEdge[z] = true;
                  }
              }

              for(var z = 0; z < amountVertex; z ++)
                  if (lab[z] == labNum) vertexHighlighted[z] = true;

              currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                         treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
              currentState["status"] = "Finish DFS from "+stack[stackNum]+". We get 1 strong component.<br> check the condition";
              currentState["lineNo"] = 4;
              stateList.push(currentState);

              var flag = -1;
              for(var z = 0; z < amountVertex; z+=2)
                  if (lab[z] == lab[z+1] && lab[z] == labNum) flag = z;
              if (flag == -1) {
                  currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                         treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
                  currentState["status"] = "No change.";
                  currentState["lineNo"] = 4;
                  stateList.push(currentState);
              } else {
                  currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                         treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
                  currentState["status"] = ""+getvar(flag)+" (vertex "+flag+") and "+getvar(flag+1)+" (vertex "+(flag+1)+") are in the same scc. <br>Not satisfiable!";
                  currentState["lineNo"] = 0;
                  stateList.push(currentState);
                  return true;
              }
              for(var z = 0; z < amountVertex; z ++)
                  if (lab[z] == labNum) delete vertexHighlighted[z];
          } else {
              currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                         treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
              currentState["status"] = getStack() + "<br>"+stack[stackNum]+" is visited, ignore";
              currentState["lineNo"] = 3;
              stateList.push(currentState);
          }
          stackNum--;
      }

      function getStack() {
          var status = "List = [";
          for (var i = stackNum; i >0; i --)
              status = status + stack[i] + ",";
          if (stackNum >= 0) status = status + stack[0] + "]";
              else status = status + "]";
          return status;
      }
      function Tdfs(u) {
          vertexTraversing[u] = true;
          vertexHighlighted[u] = true;
          currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                         treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
          currentState["status"] = getStack() + "<br>DFS("+u+")";
          currentState["lineNo"] = 3;
          stateList.push(currentState);
          delete vertexHighlighted[u];

          var nei = [];
          for (var j = 0; j < amountEdge; j++) 
              if (u == internalEdgeList[j]["vertexA"]) 
                  nei.push(j);
          nei.sort(function(a, b){return internalEdgeList[a]["vertexB"]-internalEdgeList[b]["vertexB"]});

          while(nei.length > 0) {
              var j = nei.shift();
              var vertexA = internalEdgeList[j]["vertexA"];
              var vertexB = internalEdgeList[j]["vertexB"];
              edgeHighlighted[j] = true;
              for (var z = 0; z < amountEdge; z ++) 
                  if (internalEdgeList[z]["vertexA"] == vertexB && internalEdgeList[z]["vertexB"] == vertexA) 
                      edgeHighlighted[z] = true;
              currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                             treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
              currentState["el"][j]["animateHighlighted"]=true;
              currentState["status"] = getStack() + "<br>try edge " + vertexA + " -> " + vertexB;
              currentState["lineNo"] = 3;
              stateList.push(currentState);
              if (lab[vertexB] == -1 && u == vertexA) {
                  if (p[vertexB] == -1) {
                      currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                                   treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
                      currentState["status"] = getStack() + "<br>" + vertexB + " hasn't been visited";
                      currentState["lineNo"] = 3;
                      stateList.push(currentState);

                      p[vertexB] = u;
                      Tdfs(vertexB);
                  }
              }
          }
          stack[++stackNum] = u;
          delete vertexTraversing[u];
          vertexTraversed[u] = true;
          currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                                 treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
          currentState["status"] = getStack() + "<br>DFS from " + u + " is completed, add "+u+" to the list";
          currentState["lineNo"] = 3;
          stateList.push(currentState);
      }
      function DFS2(u) {
          lab[u] = labNum;
          vertexTraversing[u] = true;
          vertexHighlighted[u] = true;
          currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                         treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
          currentState["status"] = getStack() + "<br>DFS("+u+")";
          currentState["lineNo"] = 3;
          stateList.push(currentState);
          delete vertexHighlighted[u];

          var nei = [];
          for (var j = 0; j < amountEdge; j++) 
              if (u == internalEdgeList[j]["vertexA"]) 
                  nei.push(j);
          nei.sort(function(a, b){return internalEdgeList[a]["vertexB"]-internalEdgeList[b]["vertexB"]});

          while(nei.length > 0) {
              var j = nei.shift();
              var vertexA = internalEdgeList[j]["vertexA"];
              var vertexB = internalEdgeList[j]["vertexB"];
              if (hiddenEdge[j] == null) {
                  edgeTraversed[j] = true;
                  edgeHighlighted[j] = true;
                  for (var z = 0; z < amountEdge; z ++) 
                      if (internalEdgeList[z]["vertexA"] == vertexB && internalEdgeList[z]["vertexB"] == vertexA) 
                          edgeHighlighted[z] = edgeTraversed[z] = true;
                  currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                                 treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
                  currentState["el"][j]["animateHighlighted"]=true;
                  currentState["status"] = getStack() + "<br>try edge " + vertexA + " -> " + vertexB;
                  currentState["lineNo"] = 3;
                  stateList.push(currentState);

                  if (lab[vertexB] == -1) {
                      currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                                   treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
                      currentState["status"] = getStack() + "<br>" + vertexB + " hasn't been visited";
                      currentState["lineNo"] = 3;
                      stateList.push(currentState);

                      DFS2(vertexB);
                  } else {
                      currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                                   treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
                      currentState["status"] = getStack() + "<br>" + vertexB + " is visited";
                      currentState["lineNo"] = 3;
                      stateList.push(currentState);
                  }
              }
          }

          delete vertexTraversing[u];
          vertexTraversed[u] = true;
          currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                                 treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
          currentState["status"] = getStack() + "<br>DFS from " + u + " is completed, back to the parent";
          currentState["lineNo"] = 3;
          stateList.push(currentState);
      }
      
      for (var i = 0; i < amountEdge; i ++) {
          var vertexA = internalEdgeList[i]["vertexA"];
          var vertexB = internalEdgeList[i]["vertexB"];
          internalEdgeList[i]["vertexA"] = vertexB;
          internalEdgeList[i]["vertexB"] = vertexA;
      }
      currentState = createState(internalAdjList, internalEdgeList, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing,
                             treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge);
      currentState["status"] = "SCC algorithm is completed.<br>The problem is satisfiable!!";
      currentState["lineNo"] = [5,6];
      stateList.push(currentState);
    }

    this.CloseBox = function () {
        $('.overlays').hide("slow");
        $('#dark-overlay').hide("slow");
        $('#rookattack-board').hide("slow");
    }

    this.inputExample1 = function() {
        numOfRows = 2;
        numOfColumns = 4;
        blocked = new Array(numOfRows+1);
        for (var i = 0; i <= numOfRows; ++i) {
            blocked[i] = new Array(numOfColumns+1);
            for (var j = 0; j <= numOfColumns; ++j)
                blocked[i][j] = false;
        }
        var toWrite = '<html>\n';
        toWrite += '<br>Click on any cell to toggle between black/white cell</br>\n';
        toWrite += '<br>Each black cell presents a clause. Each row should have exactly 2 black cells.</br>\n';
        toWrite += '<table border="1" id="board">'
        for (var j = 0; j <= numOfColumns; ++j)
          toWrite += '<col width="50">';

        toWrite += '<tr><td height="50" bgcolor="white" id="cell00"></td>';
        for(var j = 1; j <= numOfColumns; j++)
          if (j%2==1) toWrite += '<td height="50" bgcolor="white" id="cell'+0+j+'">-x'+(j+1)/2+'</td>';
          else toWrite += '<td height="50" bgcolor="white" id="cell'+0+j+'">x'+j/2+'</td>';
        toWrite += "</tr>"

        for (var i = 1; i <= numOfRows; ++i) {
          toWrite += '<tr>';
          toWrite += '<td height="50" bgcolor="white" id="cell00">'+i+'</td>';
          for (var j = 1; j <= numOfColumns; ++j)
            toWrite += '<td height="50" bgcolor="white" id="cell' + i + j + '" onclick=gtWidget.changeState('+i+','+j+')></td>';
          toWrite += '</tr>';
        }

        toWrite += '</table>\n';
        toWrite += '<button onclick=gtWidget.inputRandomized()>Randomized</button>';
        toWrite += '<button onclick=gtWidget.inputFinished()>Done</button>';
        toWrite += '<button onclick=gtWidget.inputExample1()>Example 1</button>';
        toWrite += '<button onclick=gtWidget.inputExample2()>Example 2</button>';
        toWrite += '<button onclick=gtWidget.CloseBox()>Close</button>';
        toWrite += '<div id="twosat-board-err" class="err"></div>';
        toWrite += '</html>\n';
        $('#twosat-board').html(toWrite);

        this.changeState(1, 1);
        this.changeState(1, 3);
        this.changeState(2, 2);
        this.changeState(2, 4);    
    }
    this.inputExample2 = function () {
        numOfRows = 4;
        numOfColumns = 6;
        blocked = new Array(numOfRows+1);
        for (var i = 0; i <= numOfRows; ++i) {
            blocked[i] = new Array(numOfColumns+1);
            for (var j = 0; j <= numOfColumns; ++j)
                blocked[i][j] = false;
        }
        var toWrite = '<html>\n';
        toWrite += '<br>Click on any cell to toggle between black/white cell</br>\n';
        toWrite += '<br>Each black cell presents a clause. Each row should have exactly 2 black cells.</br>\n';
        toWrite += '<table border="1" id="board">'
        for (var j = 0; j <= numOfColumns; ++j)
          toWrite += '<col width="50">';

        toWrite += '<tr><td height="50" bgcolor="white" id="cell00"></td>';
        for(var j = 1; j <= numOfColumns; j++)
          if (j%2==1) toWrite += '<td height="50" bgcolor="white" id="cell'+0+j+'">-x'+(j+1)/2+'</td>';
          else toWrite += '<td height="50" bgcolor="white" id="cell'+0+j+'">x'+j/2+'</td>';
        toWrite += "</tr>"

        for (var i = 1; i <= numOfRows; ++i) {
          toWrite += '<tr>';
          toWrite += '<td height="50" bgcolor="white" id="cell00">'+i+'</td>';
          for (var j = 1; j <= numOfColumns; ++j)
            toWrite += '<td height="50" bgcolor="white" id="cell' + i + j + '" onclick=gtWidget.changeState('+i+','+j+')></td>';
          toWrite += '</tr>';
        }

        toWrite += '</table>\n';
        toWrite += '<button onclick=gtWidget.inputRandomized()>Randomized</button>';
        toWrite += '<button onclick=gtWidget.inputFinished()>Done</button>';
        toWrite += '<button onclick=gtWidget.inputExample1()>Example 1</button>';
        toWrite += '<button onclick=gtWidget.inputExample2()>Example 2</button>';
        toWrite += '<button onclick=gtWidget.CloseBox()>Close</button>';
        toWrite += '<div id="twosat-board-err" class="err"></div>';
        toWrite += '</html>\n';
        $('#twosat-board').html(toWrite);

        this.changeState(1, 2);
        this.changeState(1, 4);
        this.changeState(2, 1);
        this.changeState(2, 4);
        this.changeState(3, 3);
        this.changeState(3, 6);
        this.changeState(4, 3);
        this.changeState(4, 5);       
    }
    this.inputFinished = function() {
      if (!this.checkInput()) {
          $('#twosat-board-err').html("Each row should have exactly 2 black cells.")
                            .delay(1000)
                            .queue(function(n) {
                                $(this).html("");
                                n();
                            });
          return false;
      }

      $('.overlays').hide("slow");
      $('#dark-overlay').hide("slow");
      $('#rookattack-board').hide("slow");
      this.createGraph();
      this.runAlgo();
      graphWidget.startAnimation(stateList);      
      $('#current-action').show();
      $('#current-action p').html("Modeling()");
      $('#progress-bar').slider( "option", "max", gw.getTotalIteration()-1);
      triggerRightPanels();
      populatePseudocode(2);
      isPlaying = true;
      return true;
    }

    this.inputRandomized = function() {
      var randNumMin = 1;
      var randNumMax = numOfColumns;
      for (var i = 1; i <= numOfRows; ++i) {
        for (var j = 1; j <= numOfColumns; ++j)
            if (blocked[i][j]) this.changeState(i, j);
        var a = (Math.floor(Math.random() * (randNumMax - randNumMin + 1)) + randNumMin);
        var b = (Math.floor(Math.random() * (randNumMax - randNumMin + 1)) + randNumMin);
        while (a==b) b = (Math.floor(Math.random() * (randNumMax - randNumMin + 1)) + randNumMin);
        this.changeState(i, a);
        this.changeState(i, b);
      }
    }

    $('#dark-overlay').show("slow");
    var toWrite = '<html>\n';
    toWrite += '<br>Click on any cell to toggle between black/white cell</br>\n';
    toWrite += '<br>Each black cell presents a clause. Each row should have exactly 2 black cells.</br>\n';
    toWrite += '<table border="1" id="board">'
    for (var j = 0; j <= numOfColumns; ++j)
      toWrite += '<col width="50">';

    toWrite += '<tr><td height="50" bgcolor="white" id="cell00"></td>';
    for(var j = 1; j <= numOfColumns; j++)
      if (j%2==1) toWrite += '<td height="50" bgcolor="white" id="cell'+0+j+'">-x'+(j+1)/2+'</td>';
      else toWrite += '<td height="50" bgcolor="white" id="cell'+0+j+'">x'+j/2+'</td>';
    toWrite += "</tr>"

    for (var i = 1; i <= numOfRows; ++i) {
      toWrite += '<tr>';
      toWrite += '<td height="50" bgcolor="white" id="cell00">'+i+'</td>';
      for (var j = 1; j <= numOfColumns; ++j)
        toWrite += '<td height="50" bgcolor="white" id="cell' + i + j + '" onclick=gtWidget.changeState('+i+','+j+')></td>';
      toWrite += '</tr>';
    }

    toWrite += '</table>\n';
    toWrite += '<button onclick=gtWidget.inputRandomized()>Randomized</button>';
    toWrite += '<button onclick=gtWidget.inputFinished()>Done</button>';
    toWrite += '<button onclick=gtWidget.inputExample1()>Example 1</button>';
    toWrite += '<button onclick=gtWidget.inputExample2()>Example 2</button>';
    toWrite += '<button onclick=gtWidget.CloseBox()>Close</button>';
    toWrite += '<div id="twosat-board-err" class="err"></div>';
    toWrite += '</html>\n';
    $('#twosat-board').html(toWrite);
    $('#twosat-board').show("slow");
  }

  var DIRECTED_GR;
  var OLD_POSITION;
  this.directedChange = function() {
    for(var keyy in internalAdjList) 
      internalAdjList[keyy]["extratext"] = "";
    if (DIRECTED_GR == true) {
        DIRECTED_GR = false;
        for (var i = 0; i < OLD_POSITION; i ++) {
            var ok = false;
            for (var j = 0; j < amountEdge; j ++) 
                if (internalEdgeList[i]["vertexA"] == internalEdgeList[j]["vertexB"]
                 && internalEdgeList[i]["vertexB"] == internalEdgeList[j]["vertexA"]) {
                    ok = true; break;
                }
            if (ok == false) 
                internalEdgeList[amountEdge++] = {
                  "vertexA":internalEdgeList[i]["vertexB"],
                  "vertexB":internalEdgeList[i]["vertexA"]
                }
        }
    } else {
        DIRECTED_GR = true;
        for (var i = OLD_POSITION; i < amountEdge; i ++)
            delete internalEdgeList[i]
        amountEdge = OLD_POSITION;
    }
    var newState = createState(internalAdjList, internalEdgeList);
    graphWidget.updateGraph(newState, 500);
    $('#directedChange-err').html("Successful")
                            .delay(1000)
                            .queue(function(n) {
                                $(this).html("");
                                n();
                            });
    return true;
  }

  this.examples = function(ssspExampleConstant) {
    internalAdjList = $.extend(true, {}, TEMPLATES[ssspExampleConstant][0]);
    internalEdgeList = $.extend(true, {}, TEMPLATES[ssspExampleConstant][1]);
    amountVertex = TEMPLATES[ssspExampleConstant][2];
    amountEdge = TEMPLATES[ssspExampleConstant][3];

    for(var keyy in internalAdjList) 
        internalAdjList[keyy]["extratext"] = "";
    var k = Object.keys(internalEdgeList).length;
    for (var i = amountEdge; i < k; i ++)
        delete internalEdgeList[i];
    k = Object.keys(internalAdjList).length;
    for (var i = amountVertex; i < k; i ++)
        delete internalAdjList[i];
    DIRECTED_GR = true; OLD_POSITION = amountEdge;

    var newState = createState(internalAdjList, internalEdgeList);
    graphWidget.updateGraph(newState, 500);
    return true;
  }

  /*
  //Temporary version
  this.initRandom = function(allowNegative) {
    var templateNo = Math.floor(Math.random()*7); //0-6
    internalAdjList = $.extend(true, {}, TEMPLATES[templateNo][0]);
    internalEdgeList = $.extend(true, {}, TEMPLATES[templateNo][1]);
    amountVertex = TEMPLATES[templateNo][2];
    amountEdge = TEMPLATES[templateNo][3];
    for(var keyy in internalAdjList) 
        internalAdjList[keyy]["extratext"] = "";
    //change edge weights
    var keys = Object.keys(internalEdgeList);
    var nVertices = Object.keys(internalAdjList).length/2;
    var nEdges = keys.length/2;

    //for graphs without bi-directional edges, randomly change edge directions
    if(templateNo == SSSP_EXAMPLE_CP3_4_17 || templateNo == SSSP_EXAMPLE_CP3_4_18) {
      for(var i=0; i<nEdges; i++) {
        var flipEdge = Math.floor(Math.random()*2); //0 or 1
        if(flipEdge == 1) {
          //then flip edge
          var origA = internalEdgeList[keys[i]]["vertexA"];
          var origB = internalEdgeList[keys[i]]["vertexB"];
          internalEdgeList[keys[i]]["vertexA"] = origB;
          internalEdgeList[keys[i]]["vertexB"] = origA;
          internalEdgeList[keys[i+nEdges]]["vertexA"] = origB+nVertices; //graph on right
          internalEdgeList[keys[i+nEdges]]["vertexB"] = origA+nVertices; //graph on right
          //correct vertex adj list also
          delete internalAdjList[origA][origB];
          delete internalAdjList[origA+nVertices][origB+nVertices]; //graph on right
          internalAdjList[origB][origA] = i;
          internalAdjList[origB+nVertices][origA+nVertices] = i+nEdges; //graph on right
        }
      }
    }

    var k = Object.keys(internalEdgeList).length;
    for (var i = amountEdge; i < k; i ++)
        delete internalEdgeList[i];
    k = Object.keys(internalAdjList).length;
    for (var i = amountVertex; i < k; i ++)
        delete internalAdjList[i];
    DIRECTED_GR = true; OLD_POSITION = amountEdge;

    var newState = createState(internalAdjList, internalEdgeList);
    graphWidget.updateGraph(newState, 500);
    return true;
  }

  */

  function createState(internalAdjListObject, internalEdgeListObject, vertexHighlighted, edgeHighlighted, vertexTraversed, edgeTraversed, vertexTraversing, treeEdge, backEdge, crossEdge, forwardEdge, hiddenEdge){
    if(vertexHighlighted == null) vertexHighlighted = {};
    if(edgeHighlighted == null) edgeHighlighted = {};
    if(vertexTraversed == null) vertexTraversed = {};
    if(edgeTraversed == null) edgeTraversed = {};
    if(vertexTraversing == null) vertexTraversing = {};
    if(treeEdge == null) treeEdge = {};
    if(backEdge == null) backEdge = {};
    if(crossEdge == null) crossEdge = {};
    if(forwardEdge == null) forwardEdge = {};
    if(hiddenEdge == null) hiddenEdge = {};
    var key;
    var state = {
      "vl":{},
      "el":{}
    };

    for(key in internalAdjListObject){
      state["vl"][key] = {};

      state["vl"][key]["cx"] = internalAdjListObject[key]["cx"];
      state["vl"][key]["cy"] = internalAdjListObject[key]["cy"];
      state["vl"][key]["text"] = internalAdjListObject[key]["text"];
      state["vl"][key]["extratext"] = internalAdjListObject[key]["extratext"];
      if (internalAdjListObject[key]["state"] == OBJ_HIDDEN)
        state["vl"][key]["state"] = OBJ_HIDDEN;
      else
        state["vl"][key]["state"] = VERTEX_DEFAULT;
    }

    for(key in internalEdgeListObject){
      state["el"][key] = {};

      state["el"][key]["vertexA"] = internalEdgeListObject[key]["vertexA"];
      state["el"][key]["vertexB"] = internalEdgeListObject[key]["vertexB"];
      if (DIRECTED_GR == false)
          state["el"][key]["type"] = EDGE_TYPE_UDE;
      else
          state["el"][key]["type"] = EDGE_TYPE_DE; // HOW TO MAKE THIS DIRECTED?
      state["el"][key]["weight"] = internalEdgeListObject[key]["weight"];
      if (internalEdgeListObject[key]["state"] == OBJ_HIDDEN)
        state["el"][key]["state"] = OBJ_HIDDEN;
      else
        state["el"][key]["state"] = EDGE_DEFAULT;
      state["el"][key]["displayWeight"] = false;
      state["el"][key]["animateHighlighted"] = false;
    }

    for(key in vertexTraversed){
      state["vl"][key]["state"] = VERTEX_TRAVERSED;
    }

    /*for(key in edgeTraversed){
      state["el"][key]["state"] = EDGE_TRAVERSED;
    }*/

    for(key in treeEdge){
      state["el"][key]["state"] = EDGE_RED;
    }
    for(key in backEdge){
      state["el"][key]["state"] = EDGE_BLUE;
    }
    for(key in crossEdge){
      state["el"][key]["state"] = EDGE_GREEN;
    }
    for(key in forwardEdge){
      state["el"][key]["state"] = EDGE_GREY;
    }
    for(key in vertexTraversing) {
      state["vl"][key]["state"] = VERTEX_BLUE_OUTLINE;
    }    
    for(key in vertexHighlighted){
      state["vl"][key]["state"] = VERTEX_HIGHLIGHTED;
    }
    for(key in edgeHighlighted){
      state["el"][key]["state"] = EDGE_HIGHLIGHTED;
    }
    for(key in hiddenEdge) {
      state["el"][key]["state"] = EDGE_GREY;
    }

    return state;
  }
  
  function populatePseudocode(act) {
    switch (act) {
      case 0: // BFS
        $('#code1').html('initSSSP');
        $('#code2').html('while the queue Q is not empty');
        $('#code3').html('&nbsp;&nbsp;for each neighbor v of u = Q.front()');
        $('#code4').html('&nbsp;&nbsp;&nbsp;&nbsp;relax(u, v)');
        $('#code5').html('');
        $('#code6').html('');
        $('#code7').html('');
        break;
      case 1: // articulation points and bridges
        $('#code1').html('try all vertex u, if u hasnt been visited, DFS(u)');
        $('#code2').html('DFS(u), initiate num[u]=low[u]=dfsCount');
        $('#code3').html('&nbsp;&nbsp;try all neighbor v of u');
        $('#code4').html('&nbsp;&nbsp;&nbsp;&nbsp;if v is free, DFS(v)');
        $('#code5').html('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;low[u]=min(low[u], low[v]);');
        $('#code6').html('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;check the condition;');
        $('#code7').html('&nbsp;&nbsp;&nbsp;&nbsp;else low[u]=min(low[u], num[v]);');
        break;
      case 2: // two-sat
        $('#code1').html('create graph, each variable create 2 vertices');
        $('#code2').html('for clause a or b, create edge -a -> b and -b -> a');
        $('#code3').html('run scc algorithm');
        $('#code4').html('&nbsp;&nbsp;for each scc found, check the condition');
        $('#code5').html('scc algorithm is completed');
        $('#code6').html('the problem is satisfiable.');
        $('#code7').html('');
        break;
      case 3: // toposort using BFS
        $('#code1').html('add vertices with no incoming edge to queue');
        $('#code2').html('while the queue is not empty');
        $('#code3').html('&nbsp;&nbsp;pop vertex u from queue, add u to the list');
        $('#code4').html('&nbsp;&nbsp;for each neighbor v of u');
        $('#code5').html('&nbsp;&nbsp;&nbsp;&nbsp;delete edge u->v');
        $('#code6').html('&nbsp;&nbsp;&nbsp;&nbsp;if v has no incoming edge, add v to queue');
        $('#code7').html("Check if there is some edge that hasn't been visited");
        break;
      case 4: // DFS
        $('#code1').html('DFS(u)');
        $('#code2').html('&nbsp;&nbsp;for each neighbor v of u');
        $('#code3').html('&nbsp;&nbsp;&nbsp;&nbsp;if v has not been visited');
        $('#code4').html('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DFS(v)');
        $('#code5').html('&nbsp;&nbsp;&nbsp;&nbsp;else skip v;');
        $('#code6').html('');
        $('#code7').html('');
        break
      case 5: // tarjan
        $('#code1').html('try all vertex u, if u hasnt been visited, DFS(u)');
        $('#code2').html('DFS(u), add u to stack, initiate num[u] and low[u]');
        $('#code3').html('&nbsp;&nbsp;try all neighbor v of u');
        $('#code4').html('&nbsp;&nbsp;&nbsp;&nbsp;if v is free, DFS(v)');
        $('#code5').html('&nbsp;&nbsp;&nbsp;&nbsp;update low[u]');
        $('#code6').html('&nbsp;&nbsp;if low[u]==num[u]');
        $('#code7').html('&nbsp;&nbsp;&nbsp;&nbsp;pop from stack until we get u;');
        break
      case 6: // kosaraju
        $('#code1').html('start DFS-ing from unvisited vertices, DFS(u)');
        $('#code2').html('&nbsp;&nbsp;try all free neighbor v of u, DFS(v)');
        $('#code3').html('&nbsp;&nbsp;finish DFS-ing u, add u to list');
        $('#code4').html('transpose the graph');
        $('#code5').html('DFS in order of the list, DFS(u)');
        $('#code6').html('&nbsp;&nbsp;try all free neighbor v of u, DFS(v)');
        $('#code7').html('Each time start a DFS, we get a strong component');
        break
      case 7: // bipartite BFS
        $('#code1').html('Try all unvisited vertex u of the graph');
        $('#code2').html('&nbsp;&nbsp;push u to the queue');
        $('#code3').html('&nbsp;&nbsp;while queue is not empty, u = Q.front()');
        $('#code4').html('&nbsp;&nbsp;&nbsp;&nbsp;for each neighbor v of u');
        $('#code5').html('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if u and v have the same color -> exit');
        $('#code6').html('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;assign another color to v, push v to queue');
        $('#code7').html('');
        break
      case 8: // bipartite DFS
        $('#code1').html('Try all unvisited vertex u of the graph');
        $('#code2').html('&nbsp;&nbsp;DFS(u)');
        $('#code3').html('&nbsp;&nbsp;&nbsp;&nbsp;for each neighbor v of u');
        $('#code4').html('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if v is free, visit v');
        $('#code5').html('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;else if u and v have the same color');
        $('#code6').html('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;not bipartite graph, exit.');
        $('#code7').html('');
        break
      case 9: // topo sort using DFS
        $('#code1').html('for each unvisited vertex u');
        $('#code2').html('DFS(u)');
        $('#code3').html('&nbsp;&nbsp;for each neighbor v of u');
        $('#code4').html('&nbsp;&nbsp;&nbsp;&nbsp;if v has not been visited');
        $('#code5').html('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DFS(v)');
        $('#code6').html('&nbsp;&nbsp;&nbsp;&nbsp;else skip v;');
        $('#code7').html('&nbsp;&nbsp;finish DFS(u), add u to the list');
        break
    }
  }
}
  
//SSSP sample graph templates
var TEMPLATES = new Array();
TEMPLATES[SSSP_EXAMPLE_CP3_4_1] = [
  {
    0:{"cx": 20,"cy": 40,"text": 0},
    1:{"cx": 120,"cy": 40,"text": 1},
    2:{"cx": 120,"cy": 140,"text": 2},
    3:{"cx": 220,"cy": 40,"text": 3},
    4:{"cx": 320,"cy": 40,"text": 4},
    5:{"cx": 420,"cy": 40,"text": 5},
    6:{"cx": 320,"cy": 140,"text": 6},
    7:{"cx": 220,"cy": 140,"text": 7},
    8:{"cx": 420,"cy": 140,"text": 8}
  },
  {
    0:{ "vertexA": 0,"vertexB": 1},
    1:{ "vertexA": 1,"vertexB": 2},
    2:{ "vertexA": 1,"vertexB": 3},
    3:{ "vertexA": 2,"vertexB": 3},
    4:{ "vertexA": 3,"vertexB": 4},
    5:{ "vertexA": 6,"vertexB": 7},
    6:{ "vertexA": 6,"vertexB": 8}
  },
  9,7
];
TEMPLATES[SSSP_EXAMPLE_CP3_4_3] = [
  {
    0:{
      "cx": 20,
      "cy": 20,
      "text": 0
    },
    1:{
      "cx": 90,
      "cy": 20,
      "text": 1
    },
    2:{
      "cx": 160,
      "cy": 20,
      "text": 2
    },
    3:{
      "cx": 230,
      "cy": 20,
      "text": 3
    },
    4:{
      "cx": 20,
      "cy": 90,
      "text": 4
    },
    5:{
      "cx": 90,
      "cy": 90,
      "text": 5
    },
    6:{
      "cx": 160,
      "cy": 90,
      "text": 6
    },
    7:{
      "cx": 230,
      "cy": 90,
      "text": 7
    },
    8:{
      "cx": 20,
      "cy": 160,
      "text": 8
    },
    9:{
      "cx": 20,
      "cy": 230,
      "text": 9
    },
    10:{
      "cx": 90,
      "cy": 230,
      "text": 10
    },
    11:{
      "cx": 160,
      "cy": 230,
      "text": 11
    },
    12:{
      "cx": 230,
      "cy": 230,
      "text": 12
    },
    13:{
      "cx": 420,
      "cy": 20,
      "text": 'Inf',
      "state": OBJ_HIDDEN
    },
    14:{
      "cx": 490,
      "cy": 20,
      "text": 'Inf',
      "state": OBJ_HIDDEN
    },
    15:{
      "cx": 560,
      "cy": 20,
      "text": 'Inf',
      "state": OBJ_HIDDEN
    },
    16:{
      "cx": 630,
      "cy": 20,
      "text": 'Inf',
      "state": OBJ_HIDDEN
    },
    17:{
      "cx": 420,
      "cy": 90,
      "text": 'Inf',
      "state": OBJ_HIDDEN
    },
    18:{
      "cx": 490,
      "cy": 90,
      "text": 'Inf',
      "state": OBJ_HIDDEN
    },
    19:{
      "cx": 560,
      "cy": 90,
      "text": 'Inf',
      "state": OBJ_HIDDEN
    },
    20:{
      "cx": 630,
      "cy": 90,
      "text": 'Inf',
      "state": OBJ_HIDDEN
    },
    21:{
      "cx": 420,
      "cy": 160,
      "text": 'Inf',
      "state": OBJ_HIDDEN
    },
    22:{
      "cx": 420,
      "cy": 230,
      "text": 'Inf',
      "state": OBJ_HIDDEN
    },
    23:{
      "cx": 490,
      "cy": 230,
      "text": 'Inf',
      "state": OBJ_HIDDEN
    },
    24:{
      "cx": 560,
      "cy": 230,
      "text": 'Inf',
      "state": OBJ_HIDDEN
          },
    25:{
      "cx": 630,
      "cy": 230,
      "text": 'Inf',
      "state": OBJ_HIDDEN
    }
  },
  {
          0:{
              "vertexA": 0,
              "vertexB": 1,
              "weight": 1
          },
          1:{
              "vertexA": 0,
              "vertexB": 4,
              "weight": 1
          },

          2:{
              "vertexA": 1,
              "vertexB": 0,
              "weight": 1
          },
          3:{
              "vertexA": 1,
              "vertexB": 2,
              "weight": 1
          },
          4:{
              "vertexA": 1,
              "vertexB": 5,
              "weight": 1
          },

          5:{
              "vertexA": 2,
              "vertexB": 1,
              "weight": 1
          },
          6:{
              "vertexA": 2,
              "vertexB": 3,
              "weight": 1
          },
          7:{
              "vertexA": 2,
              "vertexB": 6,
              "weight": 1
          },
          8:{
              "vertexA": 3,
              "vertexB": 2,
              "weight": 1
          },
          9:{
              "vertexA": 3,
              "vertexB": 7,
              "weight": 1
          },
          10:{
              "vertexA": 4,
              "vertexB": 0,
              "weight": 1
          },
          11:{
              "vertexA": 4,
              "vertexB": 8,
              "weight": 1
          },
          12:{
              "vertexA": 5,
              "vertexB": 1,
              "weight": 1
          },
          13:{
              "vertexA": 5,
              "vertexB": 6,
              "weight": 1
          },
          14:{
              "vertexA": 5,
              "vertexB": 10,
              "weight": 1
          },

          15:{
              "vertexA": 6,
              "vertexB": 2,
              "weight": 1
          },
          16:{
              "vertexA": 6,
              "vertexB": 5,
              "weight": 1
          },
          17:{
              "vertexA": 6,
              "vertexB": 11,
              "weight": 1
          },

          18:{
              "vertexA": 7,
              "vertexB": 3,
              "weight": 1
          },
          19:{
              "vertexA": 7,
              "vertexB": 12,
              "weight": 1
          },

          20:{
              "vertexA": 8,
              "vertexB": 4,
              "weight": 1
          },
          21:{
              "vertexA": 8,
              "vertexB": 9,
              "weight": 1
          },

          22:{
              "vertexA": 9,
              "vertexB": 8,
              "weight": 1
          },
          23:{
              "vertexA": 9,
              "vertexB": 10,
              "weight": 1
          },

          24:{
              "vertexA": 10,
              "vertexB": 5,
              "weight": 1
          },
          25:{
              "vertexA": 10,
              "vertexB": 9,
              "weight": 1
          },
          26:{
              "vertexA": 10,
              "vertexB": 11,
              "weight": 1
          },

          27:{
              "vertexA": 11,
              "vertexB": 6,
              "weight": 1
          },
          28:{
              "vertexA": 11,
              "vertexB": 10,
              "weight": 1
          },
          29:{
              "vertexA": 11,
              "vertexB": 12,
              "weight": 1
          },

          30:{
              "vertexA": 12,
              "vertexB": 7,
              "weight": 1
          },
          31:{
              "vertexA": 12,
              "vertexB": 11,
              "weight": 1
          },

          32:{
              "vertexA": 13,
              "vertexB": 14,
              "weight": 1,
              "state": OBJ_HIDDEN
          },
          33:{
              "vertexA": 13,
              "vertexB": 17,
              "weight": 1,
              "state": OBJ_HIDDEN
          },

          34:{
              "vertexA": 14,
              "vertexB": 13,
              "weight": 1,
              "state": OBJ_HIDDEN
          },
          35:{
              "vertexA": 14,
              "vertexB": 15,
              "weight": 1,
              "state": OBJ_HIDDEN
          },
          36:{
              "vertexA": 14,
              "vertexB": 18,
              "weight": 1,
              "state": OBJ_HIDDEN
          },

          37:{
              "vertexA": 15,
              "vertexB": 14,
              "weight": 1,
              "state": OBJ_HIDDEN
          },
          38:{
              "vertexA": 15,
              "vertexB": 16,
              "weight": 1,
              "state": OBJ_HIDDEN
          },
          39:{
              "vertexA": 15,
              "vertexB": 19,
              "weight": 1,
              "state": OBJ_HIDDEN
          },

          40:{
              "vertexA": 16,
              "vertexB": 15,
              "weight": 1,
              "state": OBJ_HIDDEN
          },
          41:{
              "vertexA": 16,
              "vertexB": 20,
              "weight": 1,
              "state": OBJ_HIDDEN
          },

          42:{
              "vertexA": 17,
              "vertexB": 13,
              "weight": 1,
              "state": OBJ_HIDDEN
          },
          43:{
              "vertexA": 17,
              "vertexB": 21,
              "weight": 1,
              "state": OBJ_HIDDEN
          },

          44:{
              "vertexA": 18,
              "vertexB": 14,
              "weight": 1,
              "state": OBJ_HIDDEN
          },
          45:{
              "vertexA": 18,
              "vertexB": 19,
              "weight": 1,
              "state": OBJ_HIDDEN
          },
          46:{
              "vertexA": 18,
              "vertexB": 23,
              "weight": 1,
              "state": OBJ_HIDDEN
          },

          47:{
              "vertexA": 19,
              "vertexB": 15,
              "weight": 1,
              "state": OBJ_HIDDEN
          },
          48:{
              "vertexA": 19,
              "vertexB": 18,
              "weight": 1,
              "state": OBJ_HIDDEN
          },
          49:{
              "vertexA": 19,
              "vertexB": 24,
              "weight": 1,
              "state": OBJ_HIDDEN
          },

          50:{
              "vertexA": 20,
              "vertexB": 16,
              "weight": 1,
              "state": OBJ_HIDDEN
          },
          51:{
              "vertexA": 20,
              "vertexB": 25,
              "weight": 1,
              "state": OBJ_HIDDEN
          },

          52:{
              "vertexA": 21,
              "vertexB": 17,
              "weight": 1,
              "state": OBJ_HIDDEN
          },
          53:{
              "vertexA": 21,
              "vertexB": 22,
              "weight": 1,
              "state": OBJ_HIDDEN
          },

          54:{
              "vertexA": 22,
              "vertexB": 21,
              "weight": 1,
              "state": OBJ_HIDDEN
          },
          55:{
              "vertexA": 22,
              "vertexB": 23,
              "weight": 1,
              "state": OBJ_HIDDEN
          },

          56:{
              "vertexA": 23,
              "vertexB": 18,
              "weight": 1,
              "state": OBJ_HIDDEN
          },
          57:{
              "vertexA": 23,
              "vertexB": 22,
              "weight": 1,
              "state": OBJ_HIDDEN
          },
          58:{
              "vertexA": 23,
              "vertexB": 24,
              "weight": 1,
              "state": OBJ_HIDDEN
          },

          59:{
              "vertexA": 24,
              "vertexB": 19,
              "weight": 1,
              "state": OBJ_HIDDEN
          },
          60:{
              "vertexA": 24,
              "vertexB": 23,
              "weight": 1,
              "state": OBJ_HIDDEN
          },
          61:{
              "vertexA": 24,
              "vertexB": 25,
              "weight": 1,
              "state": OBJ_HIDDEN
          },
          62:{
            "vertexA": 25,
            "vertexB": 20,
            "weight": 1,
            "state": OBJ_HIDDEN
          },
          63:{
            "vertexA": 25,
            "vertexB": 24,
            "weight": 1,
            "state": OBJ_HIDDEN
          }
  },
  13, 32
];
TEMPLATES[SSSP_EXAMPLE_CP3_4_4] = [
  {
    0:{"cx": 20,"cy": 40,"text": 0},
    1:{"cx": 120,"cy": 40,"text": 1},
    2:{"cx": 120,"cy": 140,"text": 2},
    3:{"cx": 220,"cy": 40,"text": 3},
    4:{"cx": 320,"cy": 40,"text": 4},
    5:{"cx": 420,"cy": 40,"text": 5},
    6:{"cx": 320,"cy": 140,"text": 6},
    7:{"cx": 420,"cy": 140,"text": 7},
  },
  {
    0:{ "vertexA": 0,"vertexB": 1},
    1:{ "vertexA": 0,"vertexB": 2},
    2:{ "vertexA": 1,"vertexB": 2},
    3:{ "vertexA": 1,"vertexB": 3},
    4:{ "vertexA": 2,"vertexB": 3},
    5:{ "vertexA": 2,"vertexB": 5},
    6:{ "vertexA": 3,"vertexB": 4},
    7:{ "vertexA": 7,"vertexB": 6}
  },
  8,8
];
TEMPLATES[SSSP_EXAMPLE_CP3_4_9] = [
  {
    0:{"cx": 20,"cy": 40,"text": 0},
    1:{"cx": 120,"cy": 40,"text": 1},
    2:{"cx": 120,"cy": 140,"text": 2},
    3:{"cx": 220,"cy": 40,"text": 3},
    4:{"cx": 320,"cy": 40,"text": 4},
    5:{"cx": 420,"cy": 40,"text": 5},
    6:{"cx": 320,"cy": 140,"text": 6},
    7:{"cx": 420,"cy": 140,"text": 7}
  },
  {
    0:{ "vertexA": 0,"vertexB": 1},
    1:{ "vertexA": 1,"vertexB": 3},
    2:{ "vertexA": 3,"vertexB": 2},
    3:{ "vertexA": 2,"vertexB": 1},
    4:{ "vertexA": 3,"vertexB": 4},
    5:{ "vertexA": 4,"vertexB": 5},
    6:{ "vertexA": 5,"vertexB": 7},
    7:{ "vertexA": 7,"vertexB": 6},
    8:{ "vertexA": 6,"vertexB": 4}
  },
  8,9
];
TEMPLATES[SSSP_EXAMPLE_CP3_4_18] = [
  {
          0:{
            "cx": 50,
            "cy": 125,
            "text": 0,
            1:0,
            2:3
          },
          1:{
            "cx": 150,
            "cy": 50,
            "text": 1,
            3:2
          },
          2:{
            "cx": 150,
            "cy": 200,
            "text": 2,
            3:4
          },
          3:{
            "cx": 250,
            "cy": 125,
            "text": 3,
            4:2
          },
          4:{
            "cx": 350,
            "cy": 125,
            "text": 4,
          },
          5:{
            "cx": 450,
            "cy": 125,
            "text": 'Inf',
            "state": OBJ_HIDDEN,
            6:5,
            7:8
          },
          6:{
            "cx": 550,
            "cy": 50,
            "text": 'Inf',
            "state": OBJ_HIDDEN,
            8:6
          },
          7:{
            "cx": 550,
            "cy": 200,
            "text": 'Inf',
            "state": OBJ_HIDDEN,
            8:9
          },
          8:{
            "cx": 650,
            "cy": 125,
            "text": 'Inf',
            "state": OBJ_HIDDEN,
            9:7
          },
          9:{
            "cx": 750,
            "cy": 125,
            "text": 'Inf',
            "state": OBJ_HIDDEN
          }
        },
        {
          0:{
              "vertexA": 0,
              "vertexB": 1,
              "weight": 1
          },
          1:{
              "vertexA": 1,
              "vertexB": 3,
              "weight": 2
          },
          2:{
              "vertexA": 3,
              "vertexB": 4,
              "weight": 3
          },
          3:{
              "vertexA": 0,
              "vertexB": 2,
              "weight": 10
          },
          4:{
              "vertexA": 2,
              "vertexB": 3,
              "weight": -10
          },
          5:{
              "vertexA": 5,
              "vertexB": 6,
              "weight": 1,
              "state": OBJ_HIDDEN
          },
          6:{
              "vertexA": 6,
              "vertexB": 8,
              "weight": 2,
              "state": OBJ_HIDDEN
          },
          7:{
              "vertexA": 8,
              "vertexB": 9,
              "weight": 3,
              "state": OBJ_HIDDEN
          },
          8:{
              "vertexA": 5,
              "vertexB": 7,
              "weight": 10,
              "state": OBJ_HIDDEN
          },
          9:{
              "vertexA": 7,
              "vertexB": 8,
              "weight": -10,
              "state": OBJ_HIDDEN
          }
        },
        5,5
];
TEMPLATES[SSSP_EXAMPLE_CP3_4_17] = [
  {
    0:{
      "cx": 210,
      "cy": 190,
      "text": 0,
      4:3
    },
    1:{
      "cx": 50,
      "cy": 50,
      "text": 1,
      3:1,
      4:0
    },
    2:{
      "cx": 170,
      "cy": 120,
      "text": 2,
      0:4,
      1:2,
      3:6
    },
    3:{
      "cx": 330,
      "cy": 50,
      "text": 3,
    4:5
    },
      4:{
      "cx": 240,
      "cy": 280,
      "text": 4,
    },
    5:{
      "cx": 610,
      "cy": 190,
      "text": 'Inf',
      "state": OBJ_HIDDEN,
      9:10
    },
    6:{
      "cx": 450,
      "cy": 50,
      "text": 'Inf',
      "state": OBJ_HIDDEN,
      8:8,
      9:7
    },
    7:{
      "cx": 570,
      "cy": 120,
      "text": 'Inf',
      "state": OBJ_HIDDEN,
      5:11,
      6:9,
      8:13
    },
    8:{
      "cx": 730,
      "cy": 50,
      "text": 'Inf',
      "state": OBJ_HIDDEN,
      9:12
    },
    9:{
      "cx": 640,
      "cy": 280,
      "text": 'Inf',
      "state": OBJ_HIDDEN
    }
  },
  {
          0:{
              "vertexA": 1,
              "vertexB": 4,
              "weight": 6
          },
          1:{
              "vertexA": 1,
              "vertexB": 3,
              "weight": 3
          },
          2:{
              "vertexA": 2,
              "vertexB": 1,
              "weight": 2
          },
          3:{
              "vertexA": 0,
              "vertexB": 4,
              "weight": 1
          },
          4:{
              "vertexA": 2,
              "vertexB": 0,
              "weight": 6
          },
          5:{
              "vertexA": 3,
              "vertexB": 4,
              "weight": 5
          },
          6:{
              "vertexA": 2,
              "vertexB": 3,
              "weight": 7
          },
          7:{
              "vertexA": 6,
              "vertexB": 9,
              "weight": 6,
              "state": OBJ_HIDDEN
          },
          8:{
              "vertexA": 6,
              "vertexB": 8,
              "weight": 3,
              "state": OBJ_HIDDEN
          },
          9:{
              "vertexA": 7,
              "vertexB": 6,
              "weight": 2,
              "state": OBJ_HIDDEN
          },
          10:{
              "vertexA": 5,
              "vertexB": 9,
              "weight": 1,
              "state": OBJ_HIDDEN
          },
          11:{
              "vertexA": 7,
              "vertexB": 5,
              "weight": 6,
              "state": OBJ_HIDDEN
          },
          12:{
              "vertexA": 8,
              "vertexB": 9,
              "weight": 5,
              "state": OBJ_HIDDEN
          },
          13:{
              "vertexA": 7,
              "vertexB": 8,
              "weight": 7,
              "state": OBJ_HIDDEN
    }
  },
  5,7
];
TEMPLATES[SSSP_EXAMPLE_CP3_4_19] = [
  {
          0:{
            "cx": 50,
            "cy": 50,
            "text": 0,
            1:0,
            4:4
          },
          1:{
            "cx": 150,
            "cy": 50,
            "text": 1,
            2:1
          },
          2:{
            "cx": 250,
            "cy": 50,
            "text": 2,
            1:2,
            3:3
          },
          3:{
            "cx": 350,
            "cy": 50,
            "text": 3
          },
          4:{
            "cx": 150,
            "cy": 125,
            "text": 4
          },
          5:{
            "cx": 450,
            "cy": 50,
            "text": 'Inf',
            "state": OBJ_HIDDEN,
            6:5,
            9:9
          },
          6:{
            "cx": 550,
            "cy": 50,
            "text": 'Inf',
            "state": OBJ_HIDDEN,
            7:6
          },
          7:{
            "cx": 650,
            "cy": 50,
            "text": 'Inf',
            "state": OBJ_HIDDEN,
            6:7,
            8:8
          },
          8:{
            "cx": 750,
            "cy": 50,
            "text": 'Inf',
            "state": OBJ_HIDDEN
          },
          9:{
            "cx": 550,
            "cy": 125,
            "text": 'Inf',
            "state": OBJ_HIDDEN
          }
        },
        {
          0:{
              "vertexA": 0,
              "vertexB": 1,
              "weight": 9
          },
          1:{
              "vertexA": 1,
              "vertexB": 2,
              "weight": 15
          },
          2:{
              "vertexA": 2,
              "vertexB": 1,
              "weight": -42
          },
          3:{
              "vertexA": 2,
              "vertexB": 3,
              "weight": 10
          },
          4:{
              "vertexA": 0,
              "vertexB": 4,
              "weight": -99
          },
          5:{
              "vertexA": 5,
              "vertexB": 6,
              "weight": 99,
              "state": OBJ_HIDDEN
          },
          6:{
              "vertexA": 6,
              "vertexB": 7,
              "weight": 15,
              "state": OBJ_HIDDEN
          },
          7:{
              "vertexA": 7,
              "vertexB": 6,
              "weight": -42,
              "state": OBJ_HIDDEN
          },
          8:{
              "vertexA": 7,
              "vertexB": 8,
              "weight": 10,
              "state": OBJ_HIDDEN
          },
          9:{
              "vertexA": 5,
              "vertexB": 9,
              "weight": -99,
              "state": OBJ_HIDDEN
          }
        },
        5,5
];

//4_17
