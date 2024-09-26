(function () {
    var iframeArray = document.querySelectorAll("iframe");
    if (iframeArray.length > 0) {
      var iframeSrcList = [];
      iframeArray.forEach((iframeSrcUrls) => {
        try {
          var iframeSrc = iframeSrcUrls.getAttribute("src");
          iframeSrcList.push(iframeSrc);
        } catch (iframeLoadGlz) {
          console.error("Unable to access Iframe content", iframeLoadGlz);
          iframeSrcList.push("Can not access content");
        }
      });
      var iframeSources = document.createElement("textarea");
      iframeSources.value = iframeSrcList.join("\n");
      document.body.appendChild(iframeSources);
      iframeSources.select();
      document.execCommand("copy");
      document.body.removeChild(iframeSources);
      console.log("Iframe Source element has been copied to Clipboard");
      chrome.runtime.sendMessage({
        iframeSrcs: iframeSrcList,
      });
    } else {
      chrome.runtime.sendMessage({
        iframeerror: "Iframe Source element not found",
      });
    }
  })();
  