const usomApiString = 'https://www.usom.gov.tr/api/address/index?q=';
getCurrentHostName(window.location);

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
            }
            else {
                // reading response data with foreach
                responseJson.models.forEach(element => {
                    if (hostName == element.url) {
                        alert('THIS PAGE IS NOT SAFE. PLEASE OPEN ANTIMAL EXTENTION FOR DETAILS.');
                        return false;
                    }
                    else {
                    }
                });
            }

        });
}