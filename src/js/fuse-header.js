(function () {
  $(function () {
    var undoBtn = document.querySelector('.header-undo-button');
    var redoBtn = document.querySelector('.header-redo-button');
    if (!undoBtn || !redoBtn) {
      return;
    }

    undoBtn.addEventListener('click', function () {
      pskl.app.historyService.undo();
    });
    redoBtn.addEventListener('click', function () {
      pskl.app.historyService.redo();
    });

    var update = function () {
      var hs = pskl.app && pskl.app.historyService;
      if (!hs) {
        return;
      }
      undoBtn.disabled = hs.currentIndex <= 0;
      redoBtn.disabled = hs.currentIndex >= hs.stateQueue.length - 1;
    };

    $.subscribe(Events.HISTORY_STATE_SAVED, update);
    $.subscribe(Events.HISTORY_STATE_LOADED, update);

    undoBtn.disabled = true;
    redoBtn.disabled = true;
  });
})();
