var actionsWidth = 150;
var statusCodetraceWidth = 410;

var isCreateOpen = false;
var isSamplesOpen = false;
var isBFSOpen = false;
var isDFSOpen = false;
var isSccOpen = false;
var isBipartiteOpen = false;
var isTopoOpen = false;
var is2satOpen = false;
var isDirectedChangeOpen = false;
var isBridgeOpen = false;

function openCreate() {
	if(!isCreateOpen) {
		$('.create').fadeIn('fast');
		isCreateOpen = true;
	}
}
function closeCreate() {
	if(isCreateOpen) {
		$('.create').fadeOut('fast');
		$('#create-err').html("");
		isCreateOpen = false;
	}
}
function openSamples() {
	if(!isSamplesOpen) {
		$('.samples').fadeIn('fast');
		isSamplesOpen = true;
	}
}
function closeSamples() {
	if(isSamplesOpen) {
		$('.samples').fadeOut('fast');
		$('#samples-err').html("");
		isSamplesOpen = false;
	}
}
function openDirectedChange() {
	if(!isDirectedChangeOpen) {
		$('.directedChange').fadeIn('fast');
		isDirectedChangeOpen = true;
	}
}
function closeDirectedChange() {
	if(isDirectedChangeOpen) {
		$('.directedChange').fadeOut('fast');
		$('#directedChange-err').html("");
		isDirectedChangeOpen = false;
	}
}
function openBFS() {
	if(!isBFSOpen) {
		$('.bfs').fadeIn('fast');
		isBFSOpen = true;
	}
}
function closeBFS() {
	if(isBFSOpen) {
		$('.bfs').fadeOut('fast');
		$('#bfs-err').html("");
		isBFSOpen = false;
	}
}
function openDFS() {
	if(!isDFSOpen) {
		$('.dfs').fadeIn('fast');
		isDFSOpen = true;
	}
}
function closeDFS() {
	if(isDFSOpen) {
		$('.dfs').fadeOut('fast');
		$('#dfs-err').html("");
		isDFSOpen = false;
	}
}
function openBridge() {
	if(!isBridgeOpen) {
		$('.bridge').fadeIn('fast');
		isBridgeOpen = true;
	}
}
function closeBridge() {
	if(isBridgeOpen) {
		$('.bridge').fadeOut('fast');
		$('#bridge-err').html("");
		isBridgeOpen = false;
	}
}
function openScc() {
	if(!isSccOpen) {
		$('.scc').fadeIn('fast');
		isSccOpen = true;
	}
}
function closeScc() {
	if(isSccOpen) {
		$('.scc').fadeOut('fast');
		$('#scc-err').html("");
		isSccOpen = false;
	}
}
function openBipartite() {
	if(!isBipartiteOpen) {
		$('.bipartite').fadeIn('fast');
		isBipartiteOpen = true;
	}
}
function closeBipartite() {
	if(isBipartiteOpen) {
		$('.bipartite').fadeOut('fast');
		$('#bipartite-err').html("");
		isBipartiteOpen = false;
	}
}
function openTopo() {
	if(!isTopoOpen) {
		$('.topo').fadeIn('fast');
		isTopoOpen = true;
	}
}
function closeTopo() {
	if(isTopoOpen) {
		$('.topo').fadeOut('fast');
		$('#topo-err').html("");
		isTopoOpen = false;
	}
}
function open2sat() {
	$('#twosat-v1').val(3);
    $('#twosat-v2').val(3);
	if(!is2satOpen) {
		$('.twosat').fadeIn('fast');
		is2satOpen = true;
	}
}
function close2sat() {
	if(is2satOpen) {
		$('.twosat').fadeOut('fast');
		$('#twosat-err').html("");
		is2satOpen = false;
	}
}

function hideEntireActionsPanel() {
	closeCreate();
	closeSamples();
	closeBFS();
	closeDFS();
	closeBridge();
	closeScc();
	closeBipartite();
	closeTopo();
	close2sat();
	closeDirectedChange();
	hideActionsPanel();
}

$( document ).ready(function() {
	$('#create').click(function() {
		openCreate();
		closeSamples();
		closeBFS();
		closeDFS();
		closeBridge();
		closeScc();
		closeBipartite();
		closeTopo();
		close2sat();
		closeDirectedChange();
	});

	$('#sample').click(function() {
		closeCreate();
		openSamples();
		closeBFS();
		closeDFS();
		closeBridge();
		closeScc();
		closeBipartite();
		closeTopo();
		close2sat();
		closeDirectedChange();
	});
	
	$('#bfs').click(function() {
		closeCreate();
		closeSamples();
		openBFS();
		closeDFS();
		closeBridge();
		closeScc();
		closeBipartite();
		closeTopo();
		close2sat();
		closeDirectedChange();
	});
	$('#dfs').click(function() {
		closeCreate();
		closeSamples();
		closeBFS();
		openDFS();
		closeBridge();
		closeScc();
		closeBipartite();
		closeTopo();
		close2sat();
		closeDirectedChange();
	});
	$('#bridge').click(function() {
		closeCreate();
		closeSamples();
		closeBFS();
		closeDFS();
		openBridge();
		closeScc();
		closeBipartite();
		closeTopo();
		close2sat();
		closeDirectedChange();
	});
	$('#scc').click(function() {
		closeCreate();
		closeSamples();
		closeBFS();
		closeDFS();
		closeBridge();
		openScc();
		closeBipartite();
		closeTopo();
		close2sat();
		closeDirectedChange();
	});

	$('#directedChange').click(function() {
		closeCreate();
		closeSamples();
		closeBFS();
		closeDFS();
		closeBridge();
		closeScc();
		closeBipartite();
		closeTopo();
		close2sat();
		openDirectedChange();
	});
	$('#bipartite').click(function() {
		closeCreate();
		closeSamples();
		closeBFS();
		closeDFS();
		closeBridge();
		closeScc();
		openBipartite();
		closeTopo();
		close2sat();
		closeDirectedChange();
	});
	$('#topo').click(function() {
		closeCreate();
		closeSamples();
		closeBFS();
		closeDFS();
		closeBridge();
		closeScc();
		closeBipartite();
		openTopo();
		close2sat();
		closeDirectedChange();
	});
	$('#twosat').click(function() {
		closeCreate();
		closeSamples();
		closeBFS();
		closeDFS();
		closeBridge();
		closeScc();
		closeBipartite();
		closeTopo();
		open2sat();
		closeDirectedChange();
	});
	
		
	//tutorial mode
	$('#sssp-tutorial-1 .tutorial-next').click(function() {
		showActionsPanel();
	});
	$('#sssp-tutorial-2 .tutorial-next').click(function() {
		hideEntireActionsPanel();
	});
	$('#sssp-tutorial-3 .tutorial-next').click(function() {
		showStatusPanel();
	});
	$('#sssp-tutorial-4 .tutorial-next').click(function() {
		hideStatusPanel();
		showCodetracePanel();
	});
	$('#sssp-tutorial-5 .tutorial-next').click(function() {
		hideCodetracePanel();
	});
});