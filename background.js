const interceptedHt = [];
chrome.webRequest.onBeforeSendHeaders.addListener(
  (requestOrigin) => {
    if (requestOrigin.requestHeaders) {
      let defaultOrigin = "unknown";
      if (requestOrigin.initiator) {
        try {
          defaultOrigin = new URL(requestOrigin.initiator).origin;
        } catch (errorLog) {
          console.error("Error!", errorLog);
        }
      }
      let UniverseModel = {};
      requestOrigin.requestHeaders.forEach((requestData) => {
        if (requestData.name.toLowerCase() === "authorization") {
          UniverseModel.authorization = requestData.value;
        } else if (requestData.name.toLowerCase() === "x-custom-header") {
          UniverseModel["x-custom-header"] = requestData.value;
        } else if (requestData.name.toLowerCase() === "cookie") {
          UniverseModel.cookie = requestData.value;
        }
      });
      if (Object.keys(UniverseModel).length > 0) {
        const httpRequest = {
          topLevelUrl: defaultOrigin,
          iframeUrl: requestOrigin.url,
          method: requestOrigin.method,
          ...UniverseModel,
        };
        interceptedHt.length = 0;
        interceptedHt.push(httpRequest);
      }
    }
  },
  {
    urls: ["<all_urls>"],
  },
  ["requestHeaders"]
);
chrome.runtime.onMessage.addListener(
  (requestAction, interceptedHQ, resetInterceI) => {
    if (requestAction.action === "getRecordedRequests") {
      const resetIntersea = [...interceptedHt];
      interceptedHt.length = 0;
      resetInterceI(resetIntersea);
      return true;
    }
  }
);
