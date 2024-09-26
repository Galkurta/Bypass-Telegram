chrome.runtime.onMessage.addListener(
    function (incomingMsg, messageId, messageID) {
      console.log("Received content message in script", incomingMsg);
      if (incomingMsg.action === "getSessionStorage") {
        const sessionData = JSON.stringify(sessionStorage);
        messageID({
          data: sessionData,
        });
      }
    },
  );
  chrome.runtime.onInstalled.addListener(() => {
    console.log("background.js is currently running");
  });
  