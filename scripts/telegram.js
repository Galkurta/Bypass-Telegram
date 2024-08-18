(function () {
  "use strict";

  // Helper functions for event binding and DOM manipulation
  function bindEvent(element, event, callback) {
    if (element.addEventListener) {
      element.addEventListener(event, callback, false);
    } else if (element.attachEvent) {
      element.attachEvent("on" + event, callback);
    }
  }

  function unbindEvent(element, event, callback) {
    if (element.removeEventListener) {
      element.removeEventListener(event, callback, false);
    } else if (element.detachEvent) {
      element.detachEvent("on" + event, callback);
    }
  }

  function matchesSelector(element, selector) {
    return (
      element.matches ||
      element.matchesSelector ||
      element.webkitMatchesSelector ||
      element.mozMatchesSelector ||
      element.msMatchesSelector ||
      element.oMatchesSelector
    ).call(element, selector);
  }

  // MutationObserver setup to monitor DOM changes
  function observeMutations(targetNode, callback, config) {
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config || { childList: true, subtree: true });
    return observer;
  }

  // Monitor specific DOM elements
  function monitorElement(selector, callback) {
    const targetNodes = document.querySelectorAll(selector);
    targetNodes.forEach((targetNode) => {
      observeMutations(targetNode, (mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === "childList") {
            callback(mutation.addedNodes);
          }
        });
      });
    });
  }

  // Example usage: monitoring changes in a specific iframe
  monitorElement("iframe", (addedNodes) => {
    addedNodes.forEach((node) => {
      if (matchesSelector(node, 'iframe[src*="tgWebApp"]')) {
        console.log("Telegram Web App iframe added:", node);
      }
    });
  });

  // Notify when a specific element is added or removed
  function notifyOnElement(selector, onAdded, onRemoved) {
    const observer = observeMutations(document.body, (mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (matchesSelector(node, selector)) {
            onAdded(node);
          }
        });
        mutation.removedNodes.forEach((node) => {
          if (matchesSelector(node, selector)) {
            onRemoved(node);
          }
        });
      });
    });

    return observer;
  }

  // Example: alert when an element with ID "telegram" is added or removed
  notifyOnElement(
    "#telegram",
    (node) => alert("Telegram element added: " + node.id),
    (node) => alert("Telegram element removed: " + node.id)
  );
})();
