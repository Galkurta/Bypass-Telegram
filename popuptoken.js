function fetchOnClick() {
  let tempValue = "";
  let receivedToken = "";
  let tempChromeTOK = "";
  chrome.runtime.sendMessage(
    {
      action: "getTokenFromLocalStorage",
    },
    (formattedUser) => {
      if (formattedUser) {
        if (formattedUser.accessToken) {
          tempValue +=
            '<span style="color: red; font-size: 15px;">accessToken:</span> <span style="color: #00ab00;">' +
            formattedUser.accessToken +
            "</span><br>";
          tempChromeTOK = formattedUser.accessToken;
        }
        for (const [forEachExcept, currentKey] of Object.entries(
          formattedUser
        )) {
          if (forEachExcept !== "accessToken") {
            tempValue +=
              '<span style="color: red; font-size: 15px;">' +
              forEachExcept +
              ':</span> <span style="color: #00ab00;">' +
              currentKey +
              "</span><br>";
            tempChromeTOK = currentKey;
          }
        }
      }
      chrome.tabs.query(
        {
          active: true,
          currentWindow: true,
        },
        (fetchUserRecs) => {
          chrome.runtime.sendMessage(
            {
              action: "getRecordedRequests",
            },
            (tokenArray) => {
              if (tokenArray && tokenArray.length) {
                tokenArray.forEach((urlString) => {
                  receivedToken +=
                    '<span style="color: red; font-size: 15px;">URL:</span> <span style="color: blue;">' +
                    urlString.topLevelUrl +
                    '</span> - <span style="color: red; font-size: 15px;">Auth:</span> <span style="color: #00ab00;">' +
                    urlString.authorization +
                    "</span><br>";
                  if (urlString.authorization.startsWith("Bearer ")) {
                    tempChromeTOK = urlString.authorization.substring(7);
                  } else {
                    tempChromeTOK = urlString.authorization;
                  }
                });
              }
              const htmlUrls = document.getElementById("requestList");
              if (htmlUrls) {
                htmlUrls.innerHTML = "";
              }
              if (requestListQuery) {
                requestListQuery.innerHTML = "";
              }
              if (requestListUser) {
                requestListUser.innerHTML = "";
              }
              if (requestListIframe) {
                requestListIframe.innerHTML = "";
              }
              if (htmlUrls) {
                if (receivedToken) {
                  htmlUrls.innerHTML = receivedToken;
                } else if (tempValue) {
                  htmlUrls.innerHTML = tempValue;
                } else {
                  htmlUrls.innerHTML =
                    '<b><span style="color: red; font-size: 14px;">No Token found</span></b>';
                }
              }
              if (tempChromeTOK) {
                navigator.clipboard
                  .writeText(tempChromeTOK)
                  .then(() => {
                    Toastify({
                      text: "Token has been copied to Clipboard",
                      backgroundColor: "#00ab00",
                      className: "info",
                    }).showToast();
                  })
                  .catch((handleCopyIss) => {
                    Swal.fire({
                      icon: "error",
                      title: "Error",
                      text:
                        "Error copying Token to Clipboard: " + handleCopyIss,
                    });
                  });
              }
            }
          );
        }
      );
    }
  );
}
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("getAuth").addEventListener("click", fetchOnClick);
});
