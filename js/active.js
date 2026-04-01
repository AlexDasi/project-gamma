const circle = document.querySelector('.circle');
const arrow = document.querySelector('.arrow');

if (circle && arrow) {
  circle.addEventListener('mouseover', function () {
    arrow.classList.add('active');
  });

  circle.addEventListener('mouseout', function () {
    arrow.classList.remove('active');
  });
}

// Runtime debugger for the intermittent "mgt.clearMarks is not a function" error.
(function installMgtClearMarksDebugger() {
  if (window.__mgtClearMarksDebuggerInstalled) return;
  window.__mgtClearMarksDebuggerInstalled = true;

  function isTargetError(message) {
    if (!message) return false;
    const normalized = String(message).toLowerCase();
    return normalized.includes('mgt.clearmarks is not a function');
  }

  function buildSnapshot(errorLike, source, lineno, colno) {
    const mgt = window.mgt;
    return {
      time: new Date().toISOString(),
      message: errorLike && errorLike.message ? errorLike.message : String(errorLike || ''),
      source: source || null,
      line: typeof lineno === 'number' ? lineno : null,
      column: typeof colno === 'number' ? colno : null,
      stack: errorLike && errorLike.stack ? errorLike.stack : null,
      location: window.location.href,
      userAgent: navigator.userAgent,
      mgtType: typeof mgt,
      hasMgt: typeof mgt !== 'undefined',
      mgtKeys: mgt && typeof mgt === 'object' ? Object.keys(mgt).slice(0, 30) : null,
      hasClearMarks: !!(mgt && typeof mgt.clearMarks === 'function')
    };
  }

  function logSnapshot(snapshot) {
    window.__lastMgtClearMarksError = snapshot;

    if (!window.__mgtClearMarksErrorHistory) {
      window.__mgtClearMarksErrorHistory = [];
    }
    window.__mgtClearMarksErrorHistory.push(snapshot);

    console.group('MGT clearMarks debugger');
    console.error('Captured error snapshot:', snapshot);
    console.log('Hint: run window.__lastMgtClearMarksError in console for details.');
    console.groupEnd();
  }

  window.addEventListener('error', function onWindowError(event) {
    const message = event && event.message ? event.message : '';
    if (!isTargetError(message)) return;

    const snapshot = buildSnapshot(event.error || { message }, event.filename, event.lineno, event.colno);
    logSnapshot(snapshot);
  });

  window.addEventListener('unhandledrejection', function onUnhandledRejection(event) {
    const reason = event ? event.reason : null;
    const message = reason && reason.message ? reason.message : String(reason || '');
    if (!isTargetError(message)) return;

    const snapshot = buildSnapshot(reason || { message }, null, null, null);
    logSnapshot(snapshot);
  });
})();