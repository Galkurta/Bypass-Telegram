(function () {
    var iframeElement = document.querySelector('iframe');
    if (iframeElement) {
      var src = decodeURIComponent(iframeElement.src);
      var user = src.split('#')[1] || '';
      var userParams = user.split('tgWebAppData=')[1] || '';
      var paramsArray = userParams.split('&');
      var paramsObj = {};
      paramsArray.forEach(param => {
        var [key, value] = param.split('=');
        if (key && value) {
          paramsObj[key] = value;
        }
      });
      var userID = paramsObj['user'];
      if (userID) {
        prompt('Get User= successful:', 'user=' + userID);
        var textarea = document.createElement('textarea');
        textarea.value = 'User ID: ' + userID;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        console.log('Successfully copied to Clipboard.');
      } else {
        alert('No user info found.');
      }
    } else {
      alert('Failed to get User ID');
    }
  })();
  