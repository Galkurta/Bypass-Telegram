document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('query_id').addEventListener('click', () => getInfo('query'));
    document.getElementById('user').addEventListener('click', () => getInfo('user'));
    document.getElementById('copyButton').addEventListener('click', copyToClipboard);
});

function getInfo(type) {
    chrome.tabs.query({ 'active': true, 'currentWindow': true }, tabs => {
        chrome.scripting.executeScript({
            target: { 'tabId': tabs[0].id },
            function: type === 'query' ? getQueryID : getUserID
        }, (results) => {
            if (chrome.runtime.lastError) {
                showOutput('Error: ' + chrome.runtime.lastError.message);
            } else if (results && results[0] && results[0].result) {
                showCustomDialog(`Get ${type === 'query' ? 'Query_ID' : 'User ID'} successful:`, results[0].result);
            } else {
                showOutput(`Failed to get ${type === 'query' ? 'Query_ID' : 'User ID'}.`);
            }
        });
    });
}

function getQueryID() {
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
        return queryID;
    }
    return null;
}

function getUserID() {
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
            return 'user=' + userID;
        }
    }
    return null;
}

function showCustomDialog(message, value) {
    document.getElementById('dialogMessage').textContent = message;
    document.getElementById('dialogInput').value = value;
    document.getElementById('customDialog').style.display = 'flex';

    document.getElementById('dialogOk').onclick = () => {
        document.getElementById('customDialog').style.display = 'none';
    };

    document.getElementById('dialogCancel').onclick = () => {
        document.getElementById('customDialog').style.display = 'none';
    };
}

function copyToClipboard() {
    var copyText = document.getElementById('dialogInput');
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand('copy');
    showOutput('Copied to clipboard!');
}

function showOutput(message) {
    document.getElementById('output').innerText = message;
}