function GraphVisu(arg1, arg2, arg3, initNodes, initLinks) {
// toggle correct menu item
    var menu = (arg1 === false ? 1 : 0) * 2 + (arg2 === false ? 1 : 0) + 1;
    //alert(menu);
    $("#menu1").removeClass('selected-viz');
    $("#menu2").removeClass('selected-viz');
    $("#menu3").removeClass('selected-viz');
    $("#menu4").removeClass('selected-viz');
    $("#menu" + menu.toString()).toggleClass('selected-viz');
    var UNDIRECTED = arg1, UNWEIGHTED = arg2;
    var maxNumberVertex = 100;
    var grid = 20;
    var width = 960,
            height = 450,
            colors = d3.scale.category10();
    // clear stuff
    d3.select("#drawgraph #viz").selectAll('svg').remove();
    var svg = d3.select('#drawgraph #viz')
            .append('svg')
            .attr('width', width)
            .attr('height', height);
    var countNodeId = new Array(maxNumberVertex);
    for (var i = countNodeId.length; i >= 0; -- i)
        countNodeId[i] = 0;
    var nodes = [{id: 0, x: 100, y: 100},
        {id: 1, x: 200, y: 200},
        {id: 2, x: 300, y: 300}],
            lastNodeId = 3;
    var links;
    if (UNWEIGHTED === true)
    {
        links = [{source: nodes[0], target: nodes[1]},
            {source: nodes[1], target: nodes[2]}];
    }
    else
    {
        links = [{source: nodes[0], target: nodes[1], weight: 2},
            {source: nodes[1], target: nodes[2], weight: 2}];
    }

    if (initNodes == undefined || initLinks == undefined) {
        links = [];
        nodes = [];
    } else {
        nodes = initNodes;
        links = initLinks;
    }
    lastNodeId = 0;
    if (arg3 === "tree")
    {
        nodes = [{id: 0, x: 420, y: 80}, {id: 1, x: 200, y: 200}, {id: 2, x: 120, y: 300}, {id: 3, x: 200, y: 300}, {id: 4, x: 140, y: 380}, {id: 5, x: 240, y: 380}, {id: 6, x: 280, y: 300}, {id: 7, x: 600, y: 200}, {id: 8, x: 500, y: 360}, {id: 9, x: 700, y: 360}];
        links = [{source: {id: 0, x: 420, y: 80}, target: {id: 1, x: 200, y: 200}}, {source: {id: 1, x: 200, y: 200}, target: {id: 2, x: 120, y: 300}}, {source: {id: 1, x: 200, y: 200}, target: {id: 3, x: 200, y: 300}}, {source: {id: 3, x: 200, y: 300}, target: {id: 4, x: 140, y: 380}}, {source: {id: 3, x: 200, y: 300}, target: {id: 5, x: 240, y: 380}}, {source: {id: 1, x: 200, y: 200}, target: {id: 6, x: 280, y: 300}}, {source: {id: 0, x: 420, y: 80}, target: {id: 7, x: 600, y: 200}}, {source: {id: 7, x: 600, y: 200}, target: {id: 8, x: 500, y: 360}}, {source: {id: 7, x: 600, y: 200}, target: {id: 9, x: 700, y: 360}}];
    }

    if (arg3 === "star")
    {
        nodes = [{id: 0, x: 240, y: 160}, {id: 1, x: 560, y: 160}, {id: 2, x: 300, y: 320}, {id: 3, x: 400, y: 80}, {id: 4, x: 500, y: 320}];
        links = [{source: {id: 0, x: 240, y: 160}, target: {id: 1, x: 560, y: 160}}, {source: {id: 1, x: 560, y: 160}, target: {id: 2, x: 300, y: 320}}, {source: {id: 2, x: 300, y: 320}, target: {id: 3, x: 400, y: 80}}, {source: {id: 3, x: 400, y: 80}, target: {id: 4, x: 500, y: 320}}, {source: {id: 4, x: 500, y: 320}, target: {id: 0, x: 240, y: 160}}];
    }

    if (arg3 === "k5")
    {
        nodes = [{id: 0, x: 240, y: 160}, {id: 1, x: 560, y: 160}, {id: 2, x: 300, y: 320}, {id: 3, x: 400, y: 80}, {id: 4, x: 500, y: 320}];
        links = [{source: {id: 0, x: 240, y: 160}, target: {id: 1, x: 560, y: 160}}, {source: {id: 1, x: 560, y: 160}, target: {id: 2, x: 300, y: 320}}, {source: {id: 2, x: 300, y: 320}, target: {id: 3, x: 400, y: 80}}, {source: {id: 3, x: 400, y: 80}, target: {id: 4, x: 500, y: 320}}, {source: {id: 4, x: 500, y: 320}, target: {id: 0, x: 240, y: 160}}, {source: {id: 0, x: 240, y: 160}, target: {id: 3, x: 400, y: 80}}, {source: {id: 3, x: 400, y: 80}, target: {id: 1, x: 560, y: 160}}, {source: {id: 1, x: 560, y: 160}, target: {id: 4, x: 500, y: 320}}, {source: {id: 4, x: 500, y: 320}, target: {id: 2, x: 300, y: 320}}, {source: {id: 2, x: 300, y: 320}, target: {id: 0, x: 240, y: 160}}];
    }

    if (arg3 === "CP2.2")
    {
        nodes = [{id: 0, x: 280, y: 320}, {id: 1, x: 180, y: 220}, {id: 2, x: 360, y: 220}, {id: 3, x: 180, y: 100}, {id: 4, x: 360, y: 100}, {id: 5, x: 520, y: 100}, {id: 6, x: 520, y: 220}];
        links = [{source: {id: 0, x: 280, y: 320}, target: {id: 1, x: 180, y: 220}}, {source: {id: 1, x: 180, y: 220}, target: {id: 2, x: 360, y: 220}}, {source: {id: 3, x: 180, y: 100}, target: {id: 1, x: 180, y: 220}}, {source: {id: 3, x: 180, y: 100}, target: {id: 4, x: 360, y: 100}}, {source: {id: 4, x: 360, y: 100}, target: {id: 2, x: 360, y: 220}}, {source: {id: 4, x: 360, y: 100}, target: {id: 5, x: 520, y: 100}}, {source: {id: 5, x: 520, y: 100}, target: {id: 6, x: 520, y: 220}}, {source: {id: 2, x: 360, y: 220}, target: {id: 0, x: 280, y: 320}}];
    }

    if (arg3 === "CP4.2")
    {
        nodes = [{id: 0, x: 220, y: 100}, {id: 1, x: 220, y: 200}, {id: 2, x: 220, y: 300}, {id: 3, x: 220, y: 400}, {id: 4, x: 360, y: 100}, {id: 5, x: 360, y: 200}, {id: 6, x: 360, y: 400}, {id: 7, x: 500, y: 100}, {id: 8, x: 500, y: 200}, {id: 9, x: 500, y: 400}];
        links = [{source: {id: 0, x: 220, y: 100}, target: {id: 1, x: 220, y: 200}}, {source: {id: 1, x: 220, y: 200}, target: {id: 2, x: 220, y: 300}}, {source: {id: 0, x: 220, y: 100}, target: {id: 4, x: 360, y: 100}}, {source: {id: 4, x: 360, y: 100}, target: {id: 7, x: 500, y: 100}}, {source: {id: 5, x: 360, y: 200}, target: {id: 8, x: 500, y: 200}}, {source: {id: 4, x: 360, y: 100}, target: {id: 5, x: 360, y: 200}}, {source: {id: 5, x: 360, y: 200}, target: {id: 6, x: 360, y: 400}}, {source: {id: 7, x: 500, y: 100}, target: {id: 8, x: 500, y: 200}}, {source: {id: 8, x: 500, y: 200}, target: {id: 9, x: 500, y: 400}}, {source: {id: 2, x: 220, y: 300}, target: {id: 3, x: 220, y: 400}}, {source: {id: 3, x: 220, y: 400}, target: {id: 6, x: 360, y: 400}}, {source: {id: 6, x: 360, y: 400}, target: {id: 9, x: 500, y: 400}}];
    }

    if (arg3 === "CP4.5")
    {
        nodes = [{id: 0, x: 200, y: 100}, {id: 1, x: 400, y: 100}, {id: 2, x: 580, y: 100}, {id: 3, x: 200, y: 240}, {id: 4, x: 400, y: 240}, {id: 5, x: 580, y: 240}];
        links = [{source: {id: 0, x: 200, y: 100}, target: {id: 1, x: 400, y: 100}}, {source: {id: 1, x: 400, y: 100}, target: {id: 2, x: 580, y: 100}}, {source: {id: 1, x: 400, y: 100}, target: {id: 3, x: 200, y: 240}}, {source: {id: 1, x: 400, y: 100}, target: {id: 4, x: 400, y: 240}}, {source: {id: 4, x: 400, y: 240}, target: {id: 5, x: 580, y: 240}}, {source: {id: 1, x: 400, y: 100}, target: {id: 5, x: 580, y: 240}}];
    }

    if (arg3 === "CP4.8")
    {
        nodes = [{id: 0, x: 100, y: 100}, {id: 1, x: 260, y: 100}, {id: 2, x: 260, y: 240}, {id: 3, x: 400, y: 100}, {id: 4, x: 540, y: 100}, {id: 5, x: 680, y: 100}, {id: 6, x: 540, y: 240}, {id: 7, x: 680, y: 240}];
        links = [{source: {id: 0, x: 100, y: 100}, target: {id: 1, x: 260, y: 100}}, {source: {id: 1, x: 260, y: 100}, target: {id: 2, x: 260, y: 240}}, {source: {id: 1, x: 260, y: 100}, target: {id: 3, x: 400, y: 100}}, {source: {id: 2, x: 260, y: 240}, target: {id: 3, x: 400, y: 100}}, {source: {id: 3, x: 400, y: 100}, target: {id: 4, x: 540, y: 100}}, {source: {id: 4, x: 540, y: 100}, target: {id: 5, x: 680, y: 100}}, {source: {id: 5, x: 680, y: 100}, target: {id: 7, x: 680, y: 240}}, {source: {id: 7, x: 680, y: 240}, target: {id: 6, x: 540, y: 240}}, {source: {id: 6, x: 540, y: 240}, target: {id: 4, x: 540, y: 100}}];
    }
    if (arg3 === "CP2.5A")
    {
        nodes = [{id: 0, x: 100, y: 100}, {id: 1, x: 100, y: 200}, {id: 2, x: 100, y: 300}, {id: 3, x: 260, y: 100}, {id: 4, x: 260, y: 200}, {id: 5, x: 260, y: 300}, {id: 6, x: 420, y: 100}, {id: 7, x: 420, y: 200}, {id: 8, x: 420, y: 300}];
        links = [{source: {id: 0, x: 100, y: 100}, target: {id: 1, x: 100, y: 200}}, {source: {id: 1, x: 100, y: 200}, target: {id: 2, x: 100, y: 300}}, {source: {id: 2, x: 100, y: 300}, target: {id: 5, x: 260, y: 300}}, {source: {id: 5, x: 260, y: 300}, target: {id: 8, x: 420, y: 300}}, {source: {id: 8, x: 420, y: 300}, target: {id: 7, x: 420, y: 200}}, {source: {id: 7, x: 420, y: 200}, target: {id: 6, x: 420, y: 100}}];
    }

    if (arg3 === "CP2.5B")
    {
        nodes = [{id: 0, x: 100, y: 100}, {id: 1, x: 100, y: 200}, {id: 2, x: 100, y: 300}, {id: 3, x: 260, y: 100}, {id: 4, x: 260, y: 200}, {id: 5, x: 260, y: 300}, {id: 6, x: 420, y: 100}, {id: 7, x: 420, y: 200}, {id: 8, x: 420, y: 300}];
        links = [{source: {id: 0, x: 100, y: 100}, target: {id: 1, x: 100, y: 200}}, {source: {id: 1, x: 100, y: 200}, target: {id: 2, x: 100, y: 300}}, {source: {id: 2, x: 100, y: 300}, target: {id: 5, x: 260, y: 300}}, {source: {id: 5, x: 260, y: 300}, target: {id: 8, x: 420, y: 300}}, {source: {id: 8, x: 420, y: 300}, target: {id: 7, x: 420, y: 200}}, {source: {id: 7, x: 420, y: 200}, target: {id: 6, x: 420, y: 100}}, {source: {id: 3, x: 260, y: 100}, target: {id: 4, x: 260, y: 200}}, {source: {id: 4, x: 260, y: 200}, target: {id: 5, x: 260, y: 300}}, {source: {id: 1, x: 100, y: 200}, target: {id: 4, x: 260, y: 200}}, {source: {id: 0, x: 100, y: 100}, target: {id: 3, x: 260, y: 100}}];
    }

    if (arg3 === "CP2.5C")
    {
        nodes = [{id: 0, x: 100, y: 100}, {id: 1, x: 100, y: 200}, {id: 2, x: 100, y: 300}, {id: 3, x: 260, y: 100}, {id: 4, x: 260, y: 200}, {id: 5, x: 260, y: 300}, {id: 6, x: 420, y: 100}, {id: 7, x: 420, y: 200}, {id: 8, x: 420, y: 300}];
        links = [{source: {id: 0, x: 100, y: 100}, target: {id: 7, x: 420, y: 200}}, {source: {id: 0, x: 100, y: 100}, target: {id: 5, x: 260, y: 300}}, {source: {id: 3, x: 260, y: 100}, target: {id: 2, x: 100, y: 300}}, {source: {id: 3, x: 260, y: 100}, target: {id: 8, x: 420, y: 300}}, {source: {id: 6, x: 420, y: 100}, target: {id: 1, x: 100, y: 200}}, {source: {id: 6, x: 420, y: 100}, target: {id: 5, x: 260, y: 300}}, {source: {id: 1, x: 100, y: 200}, target: {id: 8, x: 420, y: 300}}, {source: {id: 7, x: 420, y: 200}, target: {id: 2, x: 100, y: 300}}];
    }

    if (arg3 === "DAG")
    {
        nodes = [{id: 0, x: 100, y: 100}, {id: 1, x: 220, y: 100}, {id: 2, x: 220, y: 220}, {id: 3, x: 340, y: 100}, {id: 4, x: 460, y: 100}, {id: 5, x: 600, y: 100}, {id: 6, x: 460, y: 220}, {id: 7, x: 600, y: 220}];
        links = [{source: {id: 0, x: 100, y: 100}, target: {id: 1, x: 220, y: 100}}, {source: {id: 1, x: 220, y: 100}, target: {id: 2, x: 220, y: 220}}, {source: {id: 7, x: 600, y: 220}, target: {id: 6, x: 460, y: 220}}, {source: {id: 2, x: 220, y: 220}, target: {id: 5, x: 600, y: 100}}, {source: {id: 3, x: 340, y: 100}, target: {id: 4, x: 460, y: 100}}, {source: {id: 1, x: 220, y: 100}, target: {id: 3, x: 340, y: 100}}, {source: {id: 2, x: 220, y: 220}, target: {id: 3, x: 340, y: 100}}];
    }

    if (arg3 === "MST")
    {
        nodes = [{id: 0, x: 100, y: 140}, {id: 1, x: 240, y: 40}, {id: 2, x: 360, y: 140}, {id: 3, x: 240, y: 240}, {id: 4, x: 100, y: 360}];
        links = [{source: {id: 0, x: 100, y: 140}, target: {id: 1, x: 240, y: 40}, weight: "4"}, {source: {id: 1, x: 240, y: 40}, target: {id: 2, x: 360, y: 140}, weight: 2}, {source: {id: 2, x: 360, y: 140}, target: {id: 3, x: 240, y: 240}, weight: "8"}, {source: {id: 3, x: 240, y: 240}, target: {id: 0, x: 100, y: 140}, weight: "6"}, {source: {id: 0, x: 100, y: 140}, target: {id: 2, x: 360, y: 140}, weight: "4"}, {source: {id: 3, x: 240, y: 240}, target: {id: 4, x: 100, y: 360}, weight: "9"}, {source: {id: 4, x: 100, y: 360}, target: {id: 0, x: 100, y: 140}, weight: "6"}];
    }

    if (arg3 === "Flow")
    {
        nodes = [{id: 0, x: 280, y: 100}, {id: 1, x: 580, y: 300}, {id: 2, x: 280, y: 300}, {id: 3, x: 580, y: 100}];
        links = [{source: {id: 0, x: 280, y: 100}, target: {id: 2, x: 280, y: 300}, weight: "70"}, {source: {id: 2, x: 280, y: 300}, target: {id: 0, x: 280, y: 100}, weight: "70"}, {source: {id: 0, x: 280, y: 100}, target: {id: 3, x: 580, y: 100}, weight: "30"}, {source: {id: 3, x: 580, y: 100}, target: {id: 0, x: 280, y: 100}, weight: "30"}, {source: {id: 2, x: 280, y: 300}, target: {id: 1, x: 580, y: 300}, weight: "25"}, {source: {id: 1, x: 580, y: 300}, target: {id: 2, x: 280, y: 300}, weight: "25"}, {source: {id: 3, x: 580, y: 100}, target: {id: 1, x: 580, y: 300}, weight: "70"}, {source: {id: 1, x: 580, y: 300}, target: {id: 3, x: 580, y: 100}, weight: "70"}, {source: {id: 3, x: 580, y: 100}, target: {id: 2, x: 280, y: 300}, weight: "5"}, {source: {id: 2, x: 280, y: 300}, target: {id: 3, x: 580, y: 100}, weight: "5"}];
    }

// magic function
    lastNodeId = nodes.length;
    for (var i = 0; i < nodes.length; i++)
        countNodeId[nodes[i].id]++;
    for (var i = 0; i < links.length; i++)
    {
        for (var j = 0; j < nodes.length; j++)
        {
            if (nodes[j].id === links[i].source.id)
                links[i].source = nodes[j];
            if (nodes[j].id === links[i].target.id)
                links[i].target = nodes[j];
        }
    }

// end of magic

    svg.append('svg:defs').append('svg:marker')
            .attr('id', 'end-arrow')
            .attr('viewBox', '0 -5 10 10')
            .attr('refX', 6)
            .attr('markerWidth', 3)
            .attr('markerHeight', 3)
            .attr('orient', 'auto')
            .append('svg:path')
            .attr('d', 'M0,-5L10,0L0,5')
            .attr('fill', '#000');
    var drag_line = svg.append('svg:path')
            .attr('class', 'link dragline hidden')
            .attr('d', 'M0,0L0,0');
    var path;
    var circle;
    var weight;
    var selected_node = null,
            selected_link = null,
            mousedown_link = null,
            mousedown_node = null,
            mouseup_node = null;
    function resetMouseVars()
    {
        mousedown_node = null;
        mouseup_node = null;
        mousedown_link = null;
    }


    function restart() {
        // redraw everything
        svg.selectAll('g').remove();
        path = svg.append('svg:g').selectAll('path'),
                circle = svg.append('svg:g').selectAll('g');
        weight = svg.append('svg:g').selectAll('text');
        circle = circle.data(nodes, function(d) {
            return d.id;
        });
        circle.selectAll('circle')
                .style('fill', function(d) {
                    return (d === selected_node) ? d3.rgb(colors(d.id)).brighter().toString() : colors(d.id);
                });
        var g = circle.enter().append('svg:g');
        g.append('svg:circle')
                .attr('class', 'node')
                .attr('r', 16)
                .attr('cx', function(d) {
                    return d.x;
                })
                .attr('cy', function(d) {
                    return d.y;
                })
                .style('fill', function(d) {
                    return (d === selected_node) ? d3.rgb(255, 138, 39) : d3.rgb(238, 238, 238);
                })
                //.style('fill', function(d) { return (d === selected_node) ? d3.rgb(colors(d.id)).brighter().toString() : colors(d.id); })
                //.style('stroke', function(d) { return d3.rgb(colors(d.id)).darker().toString(); })
                .on('mousedown', function(d) {
                    if (d3.event.ctrlKey)
                        return;
                    mousedown_node = d;
                    if (mousedown_node === selected_node)
                        selected_node = null;
                    else
                        selected_node = mousedown_node;
                    selected_link = null;
                    // reposition drag line
                    drag_line
                            .style('marker-end', 'url(#end-arrow)')
                            .classed('hidden', false)
                            .attr('d', 'M' + mousedown_node.x + ',' + mousedown_node.y + 'L' + mousedown_node.x + ',' + mousedown_node.y);
                    restart();
                })
                .on('mouseup', function(d) {
                    if (!mousedown_node)
                        return;
                    drag_line
                            .classed('hidden', true)
                            .style('marker-end', '');
                    // check for drag-to-self
                    mouseup_node = d;
                    if (mouseup_node === mousedown_node) {
                        resetMouseVars();
                        return;
                    }

                    var source, target, direction;
                    source = mousedown_node;
                    target = mouseup_node;
                    var link;
                    if (UNDIRECTED === false)
                    {
                        link = links.filter(function(l) {
                            return (l.source === source && l.target === target);
                        })[0];
                    }
                    else
                    {
                        link = links.filter(function(l) {
                            return (l.source === source && l.target === target) || (l.source === target && l.target === source);
                        })[0];
                    }


                    if (link) {

                    } else {
                        if (UNWEIGHTED === false)
                        {
                            var dist = parseInt(Math.sqrt(Math.pow(source.x - target.x, 2) + Math.pow(source.y - target.y, 2)) / 100 + 1);
                            link = {source: source, target: target, weight: dist};
                            links.push(link);
                        }
                        else
                        {
                            link = {source: source, target: target};
                            links.push(link);
                        }

                    }

                    // select new link
                    selected_link = link;
                    selected_node = null;
                    restart();
                })
                ;
        g.append('svg:text')
                .attr('x', function(d) {
                    return d.x;
                })
                .attr('y', function(d) {
                    return d.y + 16 / 3;
                })
                //.attr('y', function (d) { return 4; })
                .attr('class', 'id')
                .text(function(d) {
                    return d.id;
                });
        //circle.exit().remove();

        // drawing paths

        path = path.data(links);
        path.classed('selected', function(d) {
            return d === selected_link;
        });
        path.enter().append('svg:path')
                .attr('class', 'link')
                .classed('selected', function(d) {
                    return d === selected_link;
                })
                .style('marker-end', function(d) {
                    if (UNDIRECTED === false)
                        return 'url(#end-arrow)';
                })
                .attr('d', function(d)
                {
                    var deltaX = d.target.x - d.source.x,
                            deltaY = d.target.y - d.source.y,
                            dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY),
                            normX = deltaX / dist,
                            normY = deltaY / dist,
                            /*
                             sourcePadding = d.left ? 17 : 12,
                             targetPadding = d.right ? 17 : 12,
                             */
                            sourcePadding = 12;
                    targetPadding = 17;
                    if (UNDIRECTED === true)
                        targetPadding = 12;
                    sourceX = d.source.x + (sourcePadding * normX),
                            sourceY = d.source.y + (sourcePadding * normY),
                            targetX = d.target.x - (targetPadding * normX),
                            targetY = d.target.y - (targetPadding * normY);
                    if (UNDIRECTED === true)
                    {
                        return 'M' + sourceX + ',' + sourceY + 'L' + targetX + ',' + targetY;
                    }
                    // check if needs to draw curve or not ?
                    var link;
                    link = links.filter(function(l) {
                        return (l.source === d.target && l.target === d.source);
                    })[0];
                    if (link)
                    {
                        // need arrow
                        var type;
                        if (d.source.id < d.target.id)
                            type = 1;
                        else
                            type = 2;
                        // change final point of arrow

                        var finalX = arrowXY(sourceX, sourceY, targetX, targetY, type).x;
                        var finalY = arrowXY(sourceX, sourceY, targetX, targetY, type).y;
                        var beginX = arrowXY(targetX, targetY, sourceX, sourceY, type).x;
                        var beginY = arrowXY(targetX, targetY, sourceX, sourceY, type).y;
                        return 'M' + beginX + ',' + beginY + 'L' + finalX + ',' + finalY;
                    }
                    else
                    {
                        // no need
                        return 'M' + sourceX + ',' + sourceY + 'L' + targetX + ',' + targetY;
                    }
                    // end check

                })
                .on('mousedown', function(d) {
                    if (d3.event.ctrlKey)
                        return;
                    // select link
                    mousedown_link = d;
                    if (mousedown_link === selected_link)
                        selected_link = null;
                    else
                        selected_link = mousedown_link;
                    selected_node = null;
                    restart();
                })
                ;
        if (UNWEIGHTED === false)
        {
// start weight display
            weight = weight.data(links);
            weight.enter().append('svg:text')
                    .attr('class', 'weight')
                    .attr('x', function(d)
                    {
                        var type;
                        if (d.source.id < d.target.id)
                            type = 1;
                        else
                            type = 2;
                        var link;
                        link = links.filter(function(l) {
                            return (l.source === d.target && l.target === d.source);
                        })[0];
                        var curve = 0;
                        if (link)
                            curve = 2;
                        var x = weightXY(d.source.x, d.source.y, d.target.x, d.target.y, type, curve).x;
                        //console.log("X = " + x);
                        return x;
                    })
                    .attr('y', function(d)
                    {
                        var type;
                        if (d.source.id < d.target.id)
                            type = 1;
                        else
                            type = 2;
                        var link;
                        link = links.filter(function(l) {
                            return (l.source === d.target && l.target === d.source);
                        })[0];
                        var curve = 0;
                        if (link)
                            curve = 2;
                        var y = weightXY(d.source.x, d.source.y, d.target.x, d.target.y, type, curve).y;
                        //console.log("Y = " + y);
                        return y;
                    })
                    .text(function(d) {
                        return d.weight;
                    })
                    ;
        }

        var maxNodeId = -1;
        var countNode = nodes.length;
        var countEdge = links.length;
        var adjMat = [];
        for (var i = 0; i < nodes.length; i++)
            if (nodes[i].id > maxNodeId)
                maxNodeId = nodes[i].id;
        maxNodeId++;
        // adjacency matrix
        var validNode = new Array(maxNodeId);
        for (var i = 0; i < maxNodeId; i++)
            validNode[i] = false;
        for (var i = 0; i < nodes.length; i++)
            validNode[nodes[i].id] = true;
        for (var i = 0; i < maxNodeId; i++)
        {
            adjMat[i] = [];
            for (var j = 0; j < maxNodeId; j++)
                if (validNode[i] === true && validNode[j] === true)
                    adjMat[i][j] = "0";
                else
                    adjMat[i][j] = "x";
        }


        if (UNDIRECTED === true)
        {
            if (UNWEIGHTED === true)
            {
                for (var i = 0; i < links.length; i++)
                {
                    adjMat[links[i].source.id][links[i].target.id] = "1";
                    adjMat[links[i].target.id][links[i].source.id] = "1";
                }
            }
            else
            {
                for (var i = 0; i < links.length; i++)
                {
                    adjMat[links[i].source.id][links[i].target.id] = links[i].weight.toString();
                    adjMat[links[i].target.id][links[i].source.id] = links[i].weight.toString();
                }
            }
        }
        else
        {
            if (UNWEIGHTED === true)
            {
                for (var i = 0; i < links.length; i++)
                {
                    adjMat[links[i].source.id][links[i].target.id] = "1";
                }
            }
            else
            {
                for (var i = 0; i < links.length; i++)
                {
                    adjMat[links[i].source.id][links[i].target.id] = links[i].weight.toString();
                }
            }
        }

// test adjMat
//console.log("Adjacency Matrix");
        for (var i = 0; i < maxNodeId; i++)
        {
            var out = "";
            for (var j = 0; j < maxNodeId; j++)
                out = out + adjMat[i][j] + " ";
            //console.log(out);
        }

// output adjMat to html

        d3.select("#adj_matrix_table").selectAll('tr').remove();
        var table1 = d3.select("#adj_matrix_table").select('tbody');
        // top 
        var row = table1.append('tr');
        row.append('td').text(" ");
        for (var i = 0; i < maxNodeId; i++)
            row.append('td').text(i.toString()).attr('class', 'bold');
        for (var i = 0; i < maxNodeId; i++)
        {
            row = table1.append('tr');
            row.append('td').text(i.toString()).attr('class', 'bold');
            for (var j = 0; j < maxNodeId; j++)
                row.append('td').text(adjMat[i][j]);
        }

// adjacency list
        var AdjList = [];
        var adjList = [];
        for (var i = 0; i < maxNodeId; i++)
            adjList[i] = [];
        for (var i = 0; i < maxNodeId; i++)
            AdjList[i] = [];
        if (UNWEIGHTED === true)
        {
            for (var i = 0; i < links.length; i++)
            {
                adjList[links[i].source.id].push(links[i].target.id.toString());
                AdjList[links[i].source.id].push(links[i].target.id);
                if (UNDIRECTED === true)
                {
                    adjList[links[i].target.id].push(links[i].source.id.toString());
                    AdjList[links[i].target.id].push(links[i].source.id);
                }
            }
        }
        else
        {
            for (var i = 0; i < links.length; i++)
            {
                adjList[links[i].source.id].push("(" + links[i].weight.toString() + "," + links[i].target.id.toString() + ")");
                AdjList[links[i].source.id].push(links[i].target.id);
                if (UNDIRECTED === true)
                {
                    adjList[links[i].target.id].push("(" + links[i].weight.toString() + "," + links[i].source.id.toString() + ")");
                    AdjList[links[i].target.id].push(links[i].source.id);
                }
            }
        }

// test adjList
//console.log("Adjacency List");
        for (var i = 0; i < maxNodeId; i++)
        {
            var out = i.toString() + " : ";
            for (var j = 0; j < adjList[i].length; j++)
                out = out + adjList[i][j] + " ";
            //console.log(out);
        }

// output adjList to html

        d3.select("#adj_list_table").selectAll('tr').remove();
        var table2 = d3.select("#adj_list_table").select('tbody');
        for (var i = 0; i < maxNodeId; i++)
        {
            row = table2.append('tr');
            row.append('td').text(i.toString() + " : ").attr('class', 'bold');
            for (var j = 0; j < adjList[i].length; j++)
                row.append('td').text(adjList[i][j]);
        }

// edge list

//console.log("Edge List");
        for (var i = 0; i < links.length; i++)
        {
            var out = i.toString() + " : ";
            if (UNWEIGHTED === true)
            {
                out = out + links[i].source.id.toString() + " " + links[i].target.id.toString();
            }
            else
            {
                out = out + links[i].weight.toString() + " " + links[i].source.id.toString() + " " + links[i].target.id.toString();
            }

//console.log(out);
        }

// output edgeList to html

        d3.select("#edge_list_table").selectAll('tr').remove();
        var table3 = d3.select("#edge_list_table").select('tbody');
        for (var i = 0; i < links.length; i++)
        {
            row = table3.append('tr');
            row.append('td').text(i.toString() + " : ").attr('class', 'bold');
            if (UNWEIGHTED === true)
            {
                row.append('td').text(links[i].source.id.toString());
                row.append('td').text(links[i].target.id.toString());
            }
            else
            {
                row.append('td').text(links[i].weight.toString());
                row.append('td').text(links[i].source.id.toString());
                row.append('td').text(links[i].target.id.toString());
            }

        }

// json object

        var json = "{\"vl\":{";
        // process nodes

        for (var i = 0; i < nodes.length; i++)
        {
            var first = "\"" + i + "\":";
            var obj = new Object();
            obj.cx = nodes[i].x;
            obj.cy = nodes[i].y;
            obj.text = nodes[i].id.toString();
            obj.state = "default";
            var second = JSON.stringify(obj);
            json = json + first + second;
            if (i !== nodes.length - 1)
                json = json + ",";
        }

        var add = "},\"el\":{";
        json = json.concat(add);
        // process edges
        for (var i = 0; i < links.length; i++)
        {
            var first = "\"" + i + "\":";
            var obj = new Object();
            for (var j = 0; j < nodes.length; j++)
            {
                if (nodes[j].id == links[i].source.id)
                    obj.vertexA = j;
                if (nodes[j].id == links[i].target.id)
                    obj.vertexB = j;
            }

            obj.type = 0;
            if (UNDIRECTED === false)
                obj.type = 1;
            obj.weight = 0;
            if (UNWEIGHTED === false)
                obj.weight = links[i].weight;
            obj.state = "default";
            obj.displayWeight = false;
            if (UNWEIGHTED === false)
                obj.displayWeight = true;
            obj.animateHighlighed = false;
            var second = JSON.stringify(obj);
            json = json + first + second;
            if (i !== links.length - 1)
                json = json + ",";
        }

        add = "}}";
        json = json.concat(add);
        //console.log(json);

        JSONresult = json;
        // IsTree
        var IsTree = false;
        if (UNDIRECTED === true && countEdge === countNode - 1)
            IsTree = true;
        //console.log("IsTree : " + IsTree);

        if (IsTree === true)
            d3.select("#isTree").text(" : Yes");
        else
            d3.select("#isTree").text(" : No");
        // IsComplete
        var IsComplete = false;
        if (UNDIRECTED === true && countEdge === (countNode * (countNode - 1)) / 2)
            IsComplete = true;
        //console.log("IsComplete : " + IsComplete);

        if (IsComplete === true)
            d3.select("#isComplete").text(" : Yes");
        else
            d3.select("#isComplete").text(" : No");
        // IsBipartite

        var color = [];
        for (var i = 0; i < maxNodeId; i++)
            color[i] = -1;
        var IsBipartite = true;
        if (countNode === 0)
            IsBipartite = false;
        else
        {
            var q = [];
            q.push(nodes[0].id);
            while (q.length > 0)
            {
                var u = q.shift();
                for (var i = 0; i < adjList[u].length; i++)
                {
                    var v = adjList[u][i];
                    if (color[v] === -1)
                    {
                        color[v] = 1 - color[u];
                        q.push(v);
                    }
                    else if (color[v] === color[u])
                    {
                        IsBipartite = false;
                        break;
                    }
                }

                if (IsBipartite === false)
                    break;
            }
        }

//console.log("IsBipartite : " + IsBipartite);

        if (IsBipartite === true)
            d3.select("#isBipartite").text(" : Yes");
        else
            d3.select("#isBipartite").text(" : No");
        // IsDAG

        var IsDAG = true;
        if (UNDIRECTED === true)
            IsDAG = false;
        else
        {
            var visited = new Array(10, false);
            for (var i = 0; i < nodes.length; i++)
            {
                for (var j = 0; j < nodes.length; j++)
                    visited[j] = false;
                dfs(nodes[i].id, nodes[i].id);
                if (visited[nodes[i].id] === true)
                {
                    IsDAG = false;
                    break;
                }
            }

            function dfs(u, v)
            {
                if (u === v) {
                }
                else
                    visited[v] = true;
                for (var k = 0; k < AdjList[v].length; k++)
                    if (visited[AdjList[v][k]] === false)
                        dfs(v, AdjList[v][k]);
            }
        }

        if (IsDAG === true)
            d3.select("#isDAG").text(" : Yes");
        else
            d3.select("#isDAG").text(" : No");
        // testing nodes & links

        //console.log(JSON.stringify(nodes));
        //console.log(JSON.stringify(links));


    }


    function arrowXY(x1, y1, x2, y2, t)
    {

        var dist = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        //console.log(dist);

        if (x1 === x2)
        {
            if (t === 1)
                return {x: x2 - 4, y: y2};
            else
                return {x: x2 + 4, y: y2};
        }

        if (y1 === y2)
        {
            if (t === 1)
                return {x: x2, y: y2 - 4};
            else
                return {x: x2, y: y2 + 4};
        }

        var m1 = (y2 - y1) / (x2 - x1);
        //console.log(m1);
        var c1 = y1 - m1 * x1;
        //console.log(c1);
        var m2 = -1 / m1;
        //console.log(m2);
        var c2 = y2 - m2 * x2;
        //console.log(c2);
        var d = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        //console.log(d);

        var v = 4;
        d = d * d + v * v;
        var D = d;
        //console.log(D);
        var z1 = c2 - y1;
        var a = 1 + m2 * m2;
        var b = 2 * m2 * z1 - 2 * x1;
        var c = x1 * x1 + z1 * z1 - D;
        var delta = b * b - 4 * a * c;
        delta = Math.sqrt(delta);
        var x_1 = (-b + delta) / (2 * a);
        var y_1 = m2 * x_1 + c2;
        var x_2 = (-b - delta) / (2 * a);
        var y_2 = m2 * x_2 + c2;
        if (t === 2)
            return {x: x_1, y: y_1};
        else
            return {x: x_2, y: y_2};
    }

    function weightXY(x1, y1, x2, y2, t, curve)
    {
        var dist = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        //console.log(dist);
        var x2 = (x1 + x2) / 2;
        var y2 = (y1 + y2) / 2;
        if (x1 === x2)
        {
            if (t === 2)
                return {x: x2 + 16, y: y2};
            else
                return {x: x2 - 16, y: y2};
        }

        if (y1 === y2)
        {
            if (t === 2)
                return {x: x2, y: y2 + 16};
            else
                return {x: x2, y: y2 - 16};
        }
        var m1 = (y2 - y1) / (x2 - x1);
        //console.log(m1);
        var c1 = y1 - m1 * x1;
        //console.log(c1);
        var m2 = -1 / m1;
        //console.log(m2);
        var c2 = y2 - m2 * x2;
        //console.log(c2);
        var d = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        //console.log(d);

        var v = 16;
        if (curve === 1)
            v = 50;
        if (curve === 2)
            v = 18;
        /*
         */


        d = d * d + v * v;
        var D = d;
        //console.log(D);
        var z1 = c2 - y1;
        var a = 1 + m2 * m2;
        var b = 2 * m2 * z1 - 2 * x1;
        var c = x1 * x1 + z1 * z1 - D;
        var delta = b * b - 4 * a * c;
        delta = Math.sqrt(delta);
        var x_1 = (-b + delta) / (2 * a);
        var y_1 = m2 * x_1 + c2;
        var x_2 = (-b - delta) / (2 * a);
        var y_2 = m2 * x_2 + c2;
        if (t === 2)
            return {x: x_1, y: y_1};
        else
            return {x: x_2, y: y_2};
    }

    function mousedown() {
        svg.classed('active', true);
        if (d3.event.ctrlKey || mousedown_node || mousedown_link)
            return;
        // insert new node at point

        /*if (nodes.length === 10)
         {
         restart();
         svg.append('svg:g').append('svg:text')
         .attr('x',630)
         .attr('y',440)
         .text('You cannot have more than 10 vertices');
         
         return;
         }*/

        var point = d3.mouse(this),
                node = {id: lastNodeId};
        // find new last node ID
        countNodeId[lastNodeId]++;
        for (var i = 0; i < maxNumberVertex; i++)
            if (countNodeId[i] === 0)
            {
                lastNodeId = i;
                break;
            }
        node.x = point[0];
        node.y = point[1];
        node.x = parseInt(node.x) - parseInt(node.x) % grid;
        node.y = parseInt(node.y) - parseInt(node.y) % grid;
        nodes.push(node);
        restart();
    }

    function mousemove() {
        if (!mousedown_node)
            return;
        // update drag line
        drag_line.attr('d', 'M' + mousedown_node.x + ',' + mousedown_node.y + 'L' + d3.mouse(this)[0] + ',' + d3.mouse(this)[1]);
        restart();
    }

    function mouseup() {
        if (mousedown_node) {
// hide drag line
            drag_line
                    .classed('hidden', true)
            //.style('marker-end', '');
        }

// because :active only works in WebKit?
        svg.classed('active', false);
        // clear mouse event vars
        resetMouseVars();
    }

    function spliceLinksForNode(node) {
        var toSplice = links.filter(function(l) {
            return (l.source === node || l.target === node);
        });
        toSplice.map(function(l) {
            links.splice(links.indexOf(l), 1);
        });
    }
    var lastKeyDown = -1;
    var drag = d3.behavior.drag()
            .on("drag", function(d)
            {
                //console.log("dragging");

                var dragTarget = d3.select(this).select('circle');
                //console.log(this);

                var new_cx, new_cy;
                //console.log(d);

                dragTarget
                        .attr("cx", function()
                        {
                            //new_cx = d3.event.dx + parseInt(dragTarget.attr("cx"));
                            new_cx = d3.mouse($("svg")[0])[0];
                            return new_cx;
                        })
                        .attr("cy", function()
                        {
                            //new_cy = d3.event.dy + parseInt(dragTarget.attr("cy"));
                            new_cy = d3.mouse($("svg")[0])[1];
                            return new_cy;
                        });
                d.x = new_cx;
                d.y = new_cy;
                //console.log(d.x + " " + d.y);

                d.x = parseInt(d.x) - parseInt(d.x) % grid;
                d.y = parseInt(d.y) - parseInt(d.y) % grid;
                restart();
            });
    function keydown() {
        //d3.event.preventDefault();

        //if(lastKeyDown !== -1) return;
        lastKeyDown = d3.event.keyCode;
        // ctrl
        if (d3.event.keyCode === 17) {
            circle.call(drag);
            svg.classed('ctrl', true);
        }

        if (!selected_node && !selected_link)
            return;
        switch (d3.event.keyCode) {
            //case 8: // backspace
            case 46: // delete
                if (selected_node)
                {
                    nodes.splice(nodes.indexOf(selected_node), 1);
                    spliceLinksForNode(selected_node);
                    /* comment out this
                     countNodeId[selected_node.id] = 0;
                     
                     for (var i = 0; i < maxNumberVertex; i++)
                     if (countNodeId[i] === 0) 
                     {
                     lastNodeId = i;
                     break;
                     }
                     */

                    // new change : re-number vertex
                    for (var i = 0; i < nodes.length; i++)
                        if (nodes[i].id > selected_node.id)
                            nodes[i].id--;
                    for (var i = 0; i < maxNumberVertex; i++)
                        countNodeId[i] = 0;
                    for (var i = 0; i < nodes.length; i++)
                        countNodeId[nodes[i].id]++;
                    for (var i = 0; i < maxNumberVertex; i++)
                        if (countNodeId[i] === 0)
                        {
                            lastNodeId = i;
                            break;
                        }
                } else if (selected_link) {
                    links.splice(links.indexOf(selected_link), 1);
                }
                selected_link = null;
                selected_node = null;
                restart();
                break;
            case 13: //enter
                if (selected_link && UNWEIGHTED === false)
                {
                    while (true)
                    {
                        var newWeight = prompt("Enter new weight : ( <= 99)");
                        if (newWeight <= 99)
                            break;
                    }


                    var idx = links.indexOf(selected_link);
                    links[idx].weight = newWeight;
                }

                restart();
                break;
        }
    }

    function keyup() {
        lastKeyDown = -1;
        // ctrl
        if (d3.event.keyCode === 17) {
            circle
                    .on('mousedown.drag', null)
                    .on('touchstart.drag', null);
            svg.classed('ctrl', false);
        }
    }

    svg.on('mousedown', mousedown)
            .on('mousemove', mousemove)
            .on('mouseup', mouseup);
    d3.select(window)
            .on('keydown', keydown)
            .on('keyup', keyup);
    restart();
}