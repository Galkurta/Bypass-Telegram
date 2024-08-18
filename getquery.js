(function () {
    var iframeElement = document.querySelector('iframe');
    if (iframeElement) {
      var src = decodeURIComponent(iframeElement.src);
      var query = src.split('#')[1] || '';
      var queryParams = query.split('tgWebAppData=')[1] || '';
      var paramsArray = queryParams.split('&');
      var paramsObj = {};
      paramsArray.forEach(param => {
        var [key, value] = param.split('=');
        if (key && value) {
          paramsObj[key] = value;
        }
      });
      var queryID = Object.keys(paramsObj).filter(key => !key.includes('tgWebApp')).map(key => `${key}=${paramsObj[key]}`).join('&');
      prompt('Get Query_ID successful:', queryID);
      var textarea = document.createElement('textarea');
      textarea.value = queryID;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      console.log('Successfully copied to Clipboard.');
    } else {
      alert('Failed to get Query ID');
    }
  })();
  