// @author Wang Zi
// Floyd's Cycle-Finding Algorithm

var BACK_EDGE_CONST = 5000;

var Floyd = function() {
  var self = this;
  var graphWidget = new GraphWidget();
  var maxSize = 36;

  var valueRange = [0, 999];
  var vertexClassNumberCounter = 9;

  var internalList = {};
  internalList["root"] = null;

  var amountVertex = 0;

  var start = 0, mod = 0;
  var mu = 0, lambda = 0;
  var A = 0, B = 0, C = 0;
  var beforeCycle = 0;
  var startCycle = 0;

  this.getGraphWidget = function() { return graphWidget; }

  this.widgetRecalculatePosition = function() { recalculatePosition(); }

  this.getMod = function() { return mod; }
  this.getStart = function() { return start; }
   
  function f(x) { return (A*x*x + B*x + C) % mod; }

  function floydCycleFinding(x0) { // basically we want to visualize this short piece of code...
    var tortoise = f(x0), hare = f(f(x0));
    while (tortoise != hare) { tortoise = f(tortoise); hare = f(f(hare)); }
    mu = 0; hare = x0;
    while (tortoise != hare) { tortoise = f(tortoise); hare = f(hare); mu++; }
    lambda = 1; hare = f(tortoise);
    while (tortoise != hare) { hare = f(hare); lambda++; }
  }
  
  function prepare() {
    var initArr = new Array();
    initArr[0] = start;
    for (var i = 1; i < (mu+lambda); i++)
      initArr[i] = f(initArr[i-1]);

    if (mu >= 1) {
      beforeCycle = initArr[mu-1];
      startCycle = initArr[mu];
    }

    init(initArr);
    populatePseudocode();
    floydFind(initArr);
  }

  this.generateRandom = function(){
    A = 1; B = 0; C = -1; // so f(x) = (x^2 - 1) % mod;

    do {
      mod = Math.floor(Math.random() * 899) + 100; // [100 .. 999]
      start = Math.floor(Math.random() * 999); // [0..999]
      floydCycleFinding(start);
    }
    while (mu > 8 || lambda > 15); // not good enough for visualization, generate another one...

    prepare();
    return true;
  }

  this.generateUserDefined = function(inputArr) {
    A = parseInt(inputArr[0]);
    B = parseInt(inputArr[1]);
    C = parseInt(inputArr[2]);
    if (A == 0 && B == 0 && C == 0) {
      var htmlText = getTranslatedHtml(1201, "At least one of coefficient") +
                     " <b>A</b>, <b>B</b>, or <b>C</b> "+
                     getTranslatedHtml(1202, "must be non zero");
      $('#create-err').html(htmlText);
      return false;
    }
    mod = parseInt(inputArr[3]);
    if (mod < 10 || mod > 1000) {
      var htmlText = getTranslatedHtml(1203, "The value of") + 
                     " <b>M</b> " + getTranslatedHtml(1204, "must be between")
                     + " [10..1000]" ;
      $('#create-err').html(htmlText);
      return false;
    }
    start = parseInt(inputArr[4]);
    if (start < 0 || start >= mod) {
      var htmlText = getTranslatedHtml(1205, "The value of")
                     + "<b>x<sub>0</sub></b>" + getTranslatedHtml(1206, "must be between")
                     + "[0..<b>M</b>-1]," + getTranslatedHtml(1207, "in this case")
                     + "[0.." + (mod-1) + "]";
      $('#create-err').html(htmlText);
      return false;
    }
    floydCycleFinding(start);
    
    prepare();
    return true;
  }

  var tortoisePhase1 = internalList["root"];
  var tortoisePhase2 = internalList["root"];

  function floydFind(initArr) {
    var stateList = [];
    var tortoiseTraversed = {};
    var hareTraversed = {};
    var edgeTraversed = {};
    var initPoint = internalList["root"];
    var currentTortoise = internalList[initPoint]["rightChild"];
    var currentHare = internalList[currentTortoise]["rightChild"];
    var currentState = createState(internalList);
    var currentTortoiseClass;
    var currentHareClass;
    var key;

    currentState = createState(internalList, tortoiseTraversed, hareTraversed, edgeTraversed);
    currentTortoiseClass = internalList[currentTortoise]["vertexClassNumber"];
    currentState["vl"][currentTortoiseClass]["state"] = VERTEX_GREEN_FILL;
    currentHareClass = internalList[currentHare]["vertexClassNumber"];
    currentState["vl"][currentHareClass]["state"] = VERTEX_HIGHLIGHTED;
    currentState["status"] = getTranslatedHtml(1208, "Set tortoise and hare references")
                             + "<br>t=" + currentTortoise + " and h=" + currentHare;
    currentState["lineNo"] = 1;
    stateList.push(currentState);

    currentState = createState(internalList, tortoiseTraversed, hareTraversed, edgeTraversed);
    currentTortoiseClass = internalList[currentTortoise]["vertexClassNumber"];
    currentState["vl"][currentTortoiseClass]["state"] = VERTEX_GREEN_FILL;
    tortoiseTraversed[currentTortoise] = true;
    currentHareClass = internalList[currentHare]["vertexClassNumber"];
    currentState["vl"][currentHareClass]["state"] = VERTEX_HIGHLIGHTED;
    hareTraversed[currentHare] = true;
    currentState["status"] = getTranslatedHtml(1209, "Phase 1: Find")
                             + " k*&lambda; "
                             + getTranslatedHtml(1210, "by letting hare movex 2-times faster than tortoise")
                             + "<br>t=" + currentTortoise + " and h=" + currentHare;
    currentState["lineNo"] = 2;
    stateList.push(currentState);

    while (parseInt(currentHare) != parseInt(currentTortoise)) {
      currentState = createState(internalList, tortoiseTraversed, hareTraversed, edgeTraversed);
      currentTortoise = internalList[currentTortoise]["rightChild"];
      currentTortoiseClass = internalList[currentTortoise]["vertexClassNumber"];
      currentState["vl"][currentTortoiseClass]["state"] = VERTEX_GREEN_FILL;
      tortoiseTraversed[currentTortoise] = true;
      currentHare = internalList[internalList[currentHare]["rightChild"]]["rightChild"]; // move 2x
      currentHareClass = internalList[currentHare]["vertexClassNumber"];
      currentState["vl"][currentHareClass]["state"] = VERTEX_HIGHLIGHTED;
      hareTraversed[currentHare] = true;
      tortoiseParent = internalList[currentTortoise]["parent"];

/*
// edge highlight buggy at mu :(
      var edgeHighlighted = internalList[tortoiseParent]["vertexClassNumber"];
      edgeTraversed[edgeHighlighted] = true;
      currentState["el"][edgeHighlighted]["animateHighlighted"] = true;
      currentState["el"][edgeHighlighted]["state"] = EDGE_TRAVERSED;
*/
      if (parseInt(currentHare) != parseInt(currentTortoise))
        currentState["status"] = getTranslatedHtml(1211, "tortoise and hare pointers have not met") 
                                  + "(t=" + currentTortoise + " and h=" + currentHare + ")<br>"
                                  +getTranslatedHtml(1212, "tortoise moves one vertex forward, hare moves two vertices forward");
      else
        currentState["status"] = getTranslatedHtml(1213, "tortoise and hare pointers have just met")
                                 + "(t=" + currentTortoise + " and h=" + currentHare + ")<br>"
                                 + getTranslatedHtml(1214, "let's stop the first loop");
      currentState["lineNo"] = 2;
      stateList.push(currentState);
    }

    tortoisePhase1 = currentTortoise; 
    currentState = createState(internalList);
    currentState["vl"][currentHareClass]["state"] = VERTEX_HIGHLIGHTED; // highlight the meeting point
    currentState["status"] = getTranslatedHtml(1215, "Floyd's Cycle-Finding algorithm Phase 1 (finding")
                             + "k*&lambda;)" + getTranslatedHtml(1216, " is done")
                             + "<br>" + getTranslatedHtml(1217, "tortoise and hare meet at ") 
                             + parseInt(tortoisePhase1);
    currentState["lineNo"] = 0;
    stateList.push(currentState);

    hareTraversed = {};
    tortoiseTraversed = {};
    edgeTraversed = {};
    currentTortoise = tortoisePhase1;
    currentHare = internalList["root"];
    currentState = createState(internalList);
    var mu = 0;
    currentState = createState(internalList, tortoiseTraversed, hareTraversed, edgeTraversed);
    currentTortoiseClass = internalList[currentTortoise]["vertexClassNumber"];
    currentState["vl"][currentTortoiseClass]["state"] = VERTEX_GREEN_FILL;
    currentHareClass = internalList[currentHare]["vertexClassNumber"];
    currentState["vl"][currentHareClass]["state"] = VERTEX_HIGHLIGHTED;
    currentState["status"] = getTranslatedHtml(1218, "Set hare back to x")
                             + "<sub>0</sub><br>" 
                             + getTranslatedHtml(1219, "Let tortoise stays at phase 1 stopping point");
    currentState["lineNo"] = 3;
    stateList.push(currentState);

    currentState = createState(internalList, tortoiseTraversed, hareTraversed, edgeTraversed);
    currentTortoiseClass = internalList[currentTortoise]["vertexClassNumber"];
    currentState["vl"][currentTortoiseClass]["state"] = VERTEX_GREEN_FILL;
    tortoiseTraversed[currentTortoise] = true;
    currentHareClass = internalList[currentHare]["vertexClassNumber"];
    currentState["vl"][currentHareClass]["state"] = VERTEX_HIGHLIGHTED; 
    hareTraversed[currentHare] = true;
    currentState["status"] = getTranslatedHtml(1220, "Phase 2: After Phase 1, tortoise and hare are separated by")
                             + " k*&lambda; <br>" 
                             + getTranslatedHtml(1221, "Now both move at the same pace; When they meet again, we get") 
                             + "&mu;";
    currentState["lineNo"] = 4;
    stateList.push(currentState);

    while (parseInt(currentHare) != parseInt(currentTortoise)) {
      currentTortoise = internalList[currentTortoise]["rightChild"];
      currentHare = internalList[currentHare]["rightChild"];
      currentState = createState(internalList, tortoiseTraversed, hareTraversed, edgeTraversed);
      tortoiseParent = internalList[currentTortoise]["parent"];
      currentTortoiseClass = internalList[currentTortoise]["vertexClassNumber"];
      currentState["vl"][currentTortoiseClass]["state"] = VERTEX_GREEN_FILL;
      tortoiseTraversed[currentTortoise] = true;
      currentHareClass = internalList[currentHare]["vertexClassNumber"];
      hareTraversed[currentHare] = true;
      currentState["vl"][currentHareClass]["state"] = VERTEX_HIGHLIGHTED;
      if (parseInt(currentHare) != parseInt(currentTortoise))
        currentState["status"] = getTranslatedHtml(1222, "tortoise and hare pointers have not met")
                                 + "(t=" + currentTortoise + " and h=" + currentHare + ")<br>"
                                 + getTranslatedHtml(1223, "This time, both tortoise and hare move one vertex forward");
      else
        currentState["status"] = getTranslatedHtml(1224, "tortoise and hare pointers have just met") 
                                 + "(t=" + currentTortoise + " and h=" + currentHare + ")<br>"
                                 + getTranslatedHtml(1225, "let's stop the second loop");
      currentState["lineNo"] = 4;
      stateList.push(currentState);

      mu++;
    }

    tortoisePhase2 = currentTortoise;
    currentState = createState(internalList);
    currentState["vl"][currentHareClass]["state"] = VERTEX_HIGHLIGHTED; // highlight the meeting point
    currentState["status"] = getTranslatedHtml(1226, "Floyd's Cycle-Finding algorithm Phase 2 (finding")
                             + "&mu;) is done"
                             + "<br>&mu; = " + mu + ", " 
                             + getTranslatedHtml(1227, "that is, the values will cycle from x")
                             + "<sub>" + mu + "</sub>" 
                             + getTranslatedHtml(1228, "onwards");
    currentState["lineNo"] = 4;
    stateList.push(currentState);

    hareTraversed = {};
    tortoiseTraversed = {};
    edgeTraversed = {};
    currentTortoise = tortoisePhase2;
    currentHare = internalList[currentTortoise]["rightChild"];
    currentState = createState(internalList);
    var lambda = 1;
    currentState = createState(internalList, tortoiseTraversed, hareTraversed, edgeTraversed);
    currentTortoiseClass = internalList[currentTortoise]["vertexClassNumber"];
    currentState["vl"][currentTortoiseClass]["state"] = VERTEX_GREEN_FILL;
    currentHareClass = internalList[currentHare]["vertexClassNumber"];
    currentState["vl"][currentHareClass]["state"] = VERTEX_HIGHLIGHTED;
    currentState["status"] = getTranslatedHtml(1229, "Set hare to the next vertex after tortoise's phase 2 stopping point")
                             + "<br>" + getTranslatedHtml(1230, "Let tortoise stays at phase 2 stopping point");
    currentState["lineNo"] = 5;
    hareParent = internalList[currentHare]["parent"];
    stateList.push(currentState);

    currentState = createState(internalList, tortoiseTraversed, hareTraversed, edgeTraversed);
    currentTortoiseClass = internalList[currentTortoise]["vertexClassNumber"];
    currentState["vl"][currentTortoiseClass]["state"] = VERTEX_GREEN_FILL;
    currentHareClass = internalList[currentHare]["vertexClassNumber"];
    currentState["vl"][currentHareClass]["state"] = VERTEX_HIGHLIGHTED;
    tortoiseTraversed[currentTortoise] = true;
    hareTraversed[currentHare] = true;
    currentState["status"] = getTranslatedHtml(1231, "Phase 3: After Phase 2, tortoise is staying at &mu; and hare moves")
                             + "<br>" 
                             + getTranslatedHtml(1232, "When they meet again, we get the cycle-length &lambda;");
    currentState["lineNo"] = 6;
    var edgeHighlighted = internalList[hareParent]["vertexClassNumber"];
    edgeTraversed[edgeHighlighted] = true;
    currentState["el"][edgeHighlighted]["animateHighlighted"] = true;
    currentState["el"][edgeHighlighted]["state"] = EDGE_TRAVERSED;
    stateList.push(currentState);
        
    while (parseInt(currentHare) != parseInt(currentTortoise)) {
      currentHare = internalList[currentHare]["rightChild"];
      currentState = createState(internalList, tortoiseTraversed, hareTraversed, edgeTraversed);
      hareParent = internalList[currentHare]["parent"];
      currentTortoiseClass = internalList[currentTortoise]["vertexClassNumber"];
      currentState["vl"][currentTortoiseClass]["state"] = VERTEX_GREEN_FILL;
      hareTraversed[currentHare] = true;
      currentHareClass = internalList[currentHare]["vertexClassNumber"];
      currentState["vl"][currentHareClass]["state"] = VERTEX_HIGHLIGHTED;
      if (parseInt(currentHare) != parseInt(currentTortoise))
        currentState["status"] = getTranslatedHtml(1233, "tortoise and hare pointers have not met")
                                 + "(t=" + currentTortoise + " and h=" + currentHare + ")<br>"
                                 + getTranslatedHtml(1234, "This time, only hare moves one vertex forward")
                                 + "; &lambda; = " + lambda;
      else
        currentState["status"] = getTranslatedHtml(1235, "tortoise and hare pointers have just met")
                                 + "(t=" + currentTortoise + " and h=" + currentHare + ")<br>"
                                 + getTranslatedHtml(1236, "let's stop the third loop");
      currentState["lineNo"] = 6;
      // this time it is good to highlight the edges to show lambda :)
      var edgeHighlighted = internalList[hareParent]["vertexClassNumber"];
      edgeTraversed[edgeHighlighted] = true;
      currentState["el"][edgeHighlighted]["animateHighlighted"] = true;
      currentState["el"][edgeHighlighted]["state"] = EDGE_TRAVERSED;
      stateList.push(currentState);

      lambda++;
    }
 
    currentState = createState(internalList, tortoiseTraversed, hareTraversed, edgeTraversed);
    currentState["vl"][currentTortoiseClass]["state"] = VERTEX_GREEN_FILL; // I want mu is highlighted with green and lambda by the orange edges
    currentState["status"] = getTranslatedHtml(1237, "Floyd's Cycle-Finding algorithm Phase 3 (computing")
                             + " &lambda;)"
                             + getTranslatedHtml(1238, " is done") + "<br>&lambda; = " + lambda;
    currentState["lineNo"] = 6;
    stateList.push(currentState);

    currentState = createState(internalList, tortoiseTraversed, hareTraversed, edgeTraversed);
    currentState["vl"][currentTortoiseClass]["state"] = VERTEX_GREEN_FILL; // I want mu is highlighted with green and lambda by the orange edges
    currentState["status"] = getTranslatedHtml(1239, "The entire Floyd's Cycle-Finding algorithm is completed")
                            + "<br>&mu; = " + mu + " and &lambda; = " + lambda;
    currentState["lineNo"] = 7;
    stateList.push(currentState);

    graphWidget.startAnimation(stateList);
    populatePseudocode();
    return true;
  }    

  function clearScreen() {
    var key;
    //console.log('clearscreen internalList  -->  ', internalList);
    for (key in internalList) {
      if (key == "root") continue;
      graphWidget.removeEdge(internalList[key]["vertexClassNumber"]+BACK_EDGE_CONST);
      graphWidget.removeEdge(internalList[key]["vertexClassNumber"]);
    }
    graphWidget.removeEdge(-1);
    graphWidget.removeEdge(-2);

    for (key in internalList) {
      if (key == "root") continue;
      graphWidget.removeVertex(internalList[key]["vertexClassNumber"]);
    }

    internalList = {};
    internalList["root"] = null;
    amountVertex = 0;
  }

  function init(initArr) {
	var i;
	amountVertex = mu+lambda;
	clearScreen();

	var start = parseInt(initArr[mu]);
	var end = parseInt(initArr[initArr.length-1]);

    for (i = 0; i < initArr.length; i++) {
      var parentVertex = internalList["root"];
      var newVertex = parseInt(initArr[i]);

	  if (parentVertex == null) {
        internalList["root"] = parseInt(newVertex);
        internalList[newVertex] = {
	      "parent": null,
	      "leftChild": null,
	      "rightChild": null,
          "vertexClassNumber": amountVertex
        };
      }
      else if (i < initArr.length-1) {
        while(true){
          if (internalList[parentVertex]["rightChild"] == null) break;
          parentVertex = internalList[parentVertex]["rightChild"];
        }
        internalList[parentVertex]["rightChild"] = newVertex;
        internalList[newVertex] = {
          "parent": parentVertex,
          "leftChild": null,
          "rightChild": null,
          "vertexClassNumber": amountVertex
        }
      } 
      else {
      	while (true) {
          if (internalList[parentVertex]["rightChild"] == null) break;
          parentVertex = internalList[parentVertex]["rightChild"];
        }
        internalList[parentVertex]["rightChild"] = newVertex;
        internalList[newVertex] = {
          "parent": parentVertex,
          "leftChild":null,
          "rightChild": null,
          "vertexClassNumber": amountVertex
        }
        parentVertex = internalList[parentVertex]["rightChild"];

        internalList[parentVertex]["rightChild"] = start;
        if (lambda != 2)
          internalList[start]["parent"] = parentVertex;
      }
      amountVertex++;
    }

    recalculatePosition(internalList["root"]);

    for (key in internalList) {
      if (key == "root") continue;
	  graphWidget.addVertex(internalList[key]["cx"], internalList[key]["cy"], key, internalList[key]["vertexClassNumber"], true);
    }

    for (key in internalList) {
      if (key == "root") continue;
      if (mu != 0 && key == internalList["root"]) continue;
      var parentVertex = internalList[key]["parent"];
	      
      graphWidget.addEdge(internalList[parentVertex]["vertexClassNumber"], internalList[key]["vertexClassNumber"], internalList[parentVertex]["vertexClassNumber"], EDGE_TYPE_DE, 1, true);
      if (lambda == 2 && key == end)
        graphWidget.addEdge(internalList[key]["vertexClassNumber"], internalList[parentVertex]["vertexClassNumber"], internalList[parentVertex]["vertexClassNumber"]+BACK_EDGE_CONST, EDGE_TYPE_DE, 1, true);
 
      if (mu != 0 && lambda !=  2 && key == startCycle)
        graphWidget.addEdge(internalList[beforeCycle]["vertexClassNumber"], internalList[key]["vertexClassNumber"], -1, EDGE_TYPE_DE, 1, true);
    }
  }

  function createState(internalListObject, tortoiseTraversed, hareTraversed, edgeTraversed) {
    if (tortoiseTraversed == null || tortoiseTraversed == undefined || !(tortoiseTraversed instanceof Object))
      tortoiseTraversed = {};
    if (hareTraversed == null || hareTraversed == undefined || !(hareTraversed instanceof Object))
      hareTraversed = {};
    if (edgeTraversed == null || edgeTraversed == undefined || !(edgeTraversed instanceof Object))
      edgeTraversed = {};

    var state = {
      "vl":{},
      "el":{}
    };

    var key;
    var vertexClass;

    for (key in internalListObject){
      if (key != "root") {
        vertexClass = internalListObject[key]["vertexClassNumber"]

        state["vl"][vertexClass] = {};
        state["vl"][vertexClass]["cx"] = internalListObject[key]["cx"];
        state["vl"][vertexClass]["cy"] = internalListObject[key]["cy"];
        state["vl"][vertexClass]["text"] = key;  
        state["vl"][vertexClass]["state"] = VERTEX_DEFAULT;
        state["vl"][vertexClass]["extratext"] = vertexClass;
      }

      if (internalListObject[key]["rightChild"] == null) continue;

      parentChildEdgeId = internalListObject[key]["vertexClassNumber"];

      state["el"][parentChildEdgeId] = {};
      state["el"][parentChildEdgeId]["vertexA"] = internalListObject[key]["vertexClassNumber"];
      state["el"][parentChildEdgeId]["vertexB"] = internalListObject[internalListObject[key]["rightChild"]]["vertexClassNumber"];
      state["el"][parentChildEdgeId]["type"] = EDGE_TYPE_DE;
      state["el"][parentChildEdgeId]["weight"] = 1;
      state["el"][parentChildEdgeId]["state"] = EDGE_DEFAULT;
      state["el"][parentChildEdgeId]["animateHighlighted"] = false;
    }

    for (key in hareTraversed) {
      vertexClass = internalListObject[key]["vertexClassNumber"];
      state["vl"][vertexClass]["state"] = VERTEX_TRAVERSED;
    }

    for (key in tortoiseTraversed) {
      vertexClass = internalListObject[key]["vertexClassNumber"];
      state["vl"][vertexClass]["state"] = VERTEX_GREEN_OUTLINE;
    }

    for (key in edgeTraversed)
      state["el"][key]["state"] = EDGE_TRAVERSED;

    return state;
  }

  function recalculatePosition(currentVertex) {
    var x_ratio = 30, y_ratio = 35;
    if (mu < 6) {
      x_ratio = 40;
      y_ratio = 55;
    }
    if (mu != 0) {
      var first_x = 360 - mu*x_ratio;
      var first_y = 200 + mu*y_ratio;
      for (var i = 0; i < mu; i++) {
        internalList[currentVertex]["cx"] = first_x + i*x_ratio;
        internalList[currentVertex]["cy"] = first_y - i*y_ratio;
        currentVertex = internalList[currentVertex]["rightChild"];
      }
     
      var radius = 0;
      if (lambda <= 9)
        radius = lambda*15+5;
      else
        radius = 130;

      var centerx = 360+radius;
      var centery = 200;
      for (var i = 0; i < lambda; i++) {
        internalList[currentVertex]["cx"] = centerx - radius*Math.cos((i/lambda)*Math.PI*2);
        internalList[currentVertex]["cy"] = centery - radius*Math.sin((i/lambda)*Math.PI*2);
        currentVertex = internalList[currentVertex]["rightChild"];
      }  	
    }
    else {
      var radius_cir = lambda*15+5;
      var center_x = 450;
      var center_y = 280;
      for (var i = 0; i < lambda; i++) {
        internalList[currentVertex]["cx"] = center_x - radius_cir*Math.cos((i/lambda)*Math.PI*2);
        internalList[currentVertex]["cy"] = center_y - radius_cir*Math.sin((i/lambda)*Math.PI*2);
        currentVertex = internalList[currentVertex]["rightChild"];
      }  
    }
  }

  function populatePseudocode() {
    $('#code1').html('int t=f(x<sub>0</sub>), h=f(f(x<sub>0</sub>)); // t=tortoise, h=hare');
    $('#code2').html('<b>Phase 1:</b> while (t!=h) { t=f(t); h=f(f(h)); }');
    $('#code3').html('<b>Phase 2:</b> mu=0; h=x<sub>0</sub>;');
    $('#code4').html('&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspwhile (t!=h) { t=f(t); h=f(h); mu++; }');
    $('#code5').html('<b>Phase 3:</b> lambda=1; h=f(t);');
    $('#code6').html('&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspwhile (t!=h) { h=f(h); lambda++; }');
    $('#code7').html('return pair(mu, lambda);');
  }
}
