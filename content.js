(function () {
    console.log('Content script loaded');
  
    // Listener for messages from the background script or popup
    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
      console.log('Message received in content script:', message);
  
      // Check the action type
      if (message.action === 'getSessionStorage') {
        // Convert session storage data to JSON and send it as a response
        const sessionStorageData = JSON.stringify(sessionStorage);
        sendResponse({ 'data': sessionStorageData });
      }
    });
  })();
  