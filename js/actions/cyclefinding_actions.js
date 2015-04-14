var actionsWidth = 150;
var statusCodetraceWidth = 410;

var isCreateOpen = false;

function openCreate() {
  if (!isCreateOpen) {
    $('.create').fadeIn('fast');
    isCreateOpen = true;
  }
}

function closeCreate() {
  if (isCreateOpen) {
    $('.create').fadeOut('fast');
    $('#create-err').html("");
    isCreateOpen = false;
  }
}

function hideEntireActionsPanel() {
  closeCreate();
  hideActionsPanel();
}

$(document).ready(function() {
  //action pullouts
  $('#create').click(function() {
    openCreate();
  });
	
  //tutorial mode
  $('#cyclefinding-tutorial-1 .tutorial-next').click(function() {
    showActionsPanel();
  });
  $('#cyclefinding-tutorial-2 .tutorial-next').click(function() {
    hideEntireActionsPanel();
  });
  $('#cyclefinding-tutorial-3 .tutorial-next').click(function() {
    showStatusPanel();
  });
  $('#cyclefinding-tutorial-4 .tutorial-next').click(function() {
    hideStatusPanel();
    showCodetracePanel();
  });
  $('#cyclefinding-tutorial-5 .tutorial-next').click(function() {
    hideCodetracePanel();
  });
});
