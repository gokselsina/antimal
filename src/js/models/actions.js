const usomApiString = 'https://www.usom.gov.tr/api/address/index?q=';

function getCurrentUrl() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        // since only one tab should be active and in the current window at once
        // the return variable should only have one entry
        var activeTab = tabs[0];
        var activeTabId = activeTab.id; // or do whatever you need
        getCurrentHostName(activeTab.url);
    });
}

function getCurrentHostName(url) {
    var urlString = new URL(url);
    var hostname = urlString.hostname; // for hostname to return 
    if (hostname.substring(0, 4) == 'www.') { // remove www. from hostname
        hostname = urlString.hostname.substring(4);
    }
    console.log(hostname);
    urlControlWithApi(usomApiString, hostname);
}

function urlControlWithApi(apiString, hostName) {
    fetch(apiString + hostName)
        .then(response => response.json())
        .then(data => {
            // Veri değişkene atanır
            const responseJson = data;
            if (responseJson.count == "0") {
                document.getElementById('urlstatus').innerHTML = hostName;
                document.getElementById('secstatus').innerHTML = ' IS SAFE';
            }
            else {
                // reading response data with foreach
                responseJson.models.forEach(element => {
                    if (hostName == element.url) {
                        alert("Antimal : DİKKAT!!! BULUNDUĞUNUZ WEB SAYFASI ('" + hostName + "') USOM SİSTEMİ ÜZERİNDE TEHLİKELİ OLARAK KAYITLIDIR.");
                        document.getElementById('urlstatus').innerHTML = hostName;
                        document.getElementById('secstatus').innerHTML = ' IS NOT SAFE';
                        return false;
                    }
                    else {
                        document.getElementById('urlstatus').innerHTML = hostName;
                        document.getElementById('secstatus').innerHTML = ' IS SAFE';
                    }
                });
            }
        });
}

function getDataCount() {
    fetch('https://www.usom.gov.tr/api/address/index')
        .then(response => response.json())
        .then(data => {
            // Veri değişkene atanır
            const responseJson = data;
            document.getElementById("dcountnumber").innerHTML = responseJson.totalCount;
        });
}

export { getCurrentUrl, getCurrentHostName, urlControlWithApi, getDataCount };