document.getElementById("query_id").addEventListener("click", () => {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    (tabIds) => {
      chrome.scripting.executeScript({
        target: {
          tabId: tabIds[0].id,
        },
        files: ["getquery.js"],
      });
    }
  );
});

document.getElementById("user").addEventListener("click", () => {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    (targetTabId) => {
      chrome.scripting.executeScript({
        target: {
          tabId: targetTabId[0].id,
        },
        files: ["getuser.js"],
      });
    }
  );
});

document.getElementById("getiframe").addEventListener("click", () => {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    (tabId) => {
      chrome.scripting.executeScript({
        target: {
          tabId: tabId[0].id,
        },
        files: ["getiframe.js"],
      });
    }
  );
});

function showToast(message, type = "success") {
  const toastContainer = document.querySelector(".toast-container");
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  toastContainer.appendChild(toast);

  // Trigger reflow
  toast.offsetHeight;

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
    toast.addEventListener("transitionend", function () {
      toast.remove();
    });
  }, 2000);
}

chrome.runtime.onMessage.addListener(
  (fetchSearchBy, tabSearchID, tempFetchArg) => {
    var resultsDrop = document.getElementById("requestList");
    var inputElement = document.getElementById("requestListQuery");
    var inputQueryRef = document.getElementById("requestListUser");
    var processCrypto = document.getElementById("requestListIframe");
    resultsDrop.innerHTML = "";
    inputElement.innerHTML = "";
    inputQueryRef.innerHTML = "";
    processCrypto.innerHTML = "";

    if (fetchSearchBy.queryIdData) {
      showToast("Successfully retrieved Query_ID data", "success");
    } else if (fetchSearchBy.userData) {
      showToast("Successfully retrieved User data", "success");
    } else if (fetchSearchBy.iframeSrcs) {
      showToast("Successfully retrieved Iframe Source element", "success");
    } else if (fetchSearchBy.queryerror) {
      showToast(fetchSearchBy.queryerror, "error");
    } else if (fetchSearchBy.usererror) {
      showToast(fetchSearchBy.usererror, "error");
    } else if (fetchSearchBy.iframeerror) {
      showToast(fetchSearchBy.iframeerror, "error");
    }
  }
);
