(function () {
    var firstIframe = document.querySelector("iframe");
    if (firstIframe) {
      var decodedSource = decodeURIComponent(firstIframe.src);
      var queryParam = decodedSource.split("#")[1] || "";
      var userDataFromI = queryParam.split("tgWebAppData=")[1] || "";
      var extractedUser = userDataFromI.split("&");
      var promiseResolv = {};
      extractedUser.forEach((keyValuePair) => {
        var [keyPriorToSpl, splitPairToTu] = keyValuePair.split("=");
        if (keyPriorToSpl && splitPairToTu) {
          promiseResolv[keyPriorToSpl] = splitPairToTu;
        }
      });
      var _extractedUser = Object.keys(promiseResolv)
        .filter((doesNotContai) => !doesNotContai.includes("tgWebApp"))
        .map(
          (dynamicSuffix) => dynamicSuffix + "=" + promiseResolv[dynamicSuffix],
        )
        .join("&");
      var __extractedUser = document.createElement("textarea");
      __extractedUser.value = _extractedUser;
      document.body.appendChild(__extractedUser);
      __extractedUser.select();
      document.execCommand("copy");
      document.body.removeChild(__extractedUser);
      console.log("Query_ID has been copied to Clipboard.");
      chrome.runtime.sendMessage({
        queryIdData: _extractedUser,
      });
    } else {
      chrome.runtime.sendMessage({
        queryerror: "Can't get query_id data",
      });
    }
  })();
  