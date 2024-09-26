(function () {
    var firstIframe = document.querySelector("iframe");
    if (firstIframe) {
      var decodedFirstI = decodeURIComponent(firstIframe.src);
      var hashFragment = decodedFirstI.split("#")[1] || "";
      var hashFragmentT = hashFragment.split("tgWebAppData=")[1] || "";
      if (hashFragmentT.length > 0) {
        var userId = hashFragmentT.split("user=")[1];
        if (userId) {
          var extractUserID = userId.split("&");
          var configParams = [
            "tgWebAppVersion",
            "tgWebAppPlatform",
            "tgWebAppThemeParams",
          ];
          var filteredUserR = extractUserID.filter((configParamTo) => {
            var [configKey] = configParamTo.split("=");
            return !configParams.includes(configKey);
          });
          var getConfigurat = "user=" + filteredUserR.join("&");
          var userOperation = document.createElement("textarea");
          userOperation.value = getConfigurat;
          document.body.appendChild(userOperation);
          userOperation.select();
          document.execCommand("copy");
          document.body.removeChild(userOperation);
          console.log("Copied user data into the clipboard");
          chrome.runtime.sendMessage({
            userData: getConfigurat,
          });
        } else {
          chrome.runtime.sendMessage({
            usererror: "User data is not found",
          });
        }
      } else {
        chrome.runtime.sendMessage({
          usererror: "No format",
        });
      }
    } else {
      chrome.runtime.sendMessage({
        usererror: "No format",
      });
    }
  })();
  