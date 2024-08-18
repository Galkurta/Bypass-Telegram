const recordedRequests = [];

chrome.webRequest.onBeforeSendHeaders.addListener(details => {
  const topLevelUrl = new URL(details.url).origin;
  const authHeader = details.requestHeaders.find(header => header.name.toLowerCase() === 'authorization');
  if (authHeader) {
    const request = {
      topLevelUrl: topLevelUrl,
      iframeUrl: details.initiator,
      method: details.method,
      authorization: authHeader.value,
      type: 'token'
    };
    const isRecorded = recordedRequests.some(req => req.authorization === request.authorization && req.topLevelUrl === request.topLevelUrl);
    if (!isRecorded) {
      recordedRequests.push(request);
      chrome.storage.local.set({ 'recordedRequests': recordedRequests });
      console.log('Recorded Authorization Header for iframe:', request);
    }
  }
}, { urls: ['<all_urls>'] }, ['requestHeaders']);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Received message:', message, sender);
  if (message.action === 'getRecordedRequests') {
    return chrome.storage.local.get('recordedRequests', data => {
      sendResponse(data.recordedRequests);
    }), true;
  }
});