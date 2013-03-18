var BASE_URL = "http://c39c1850b7e25fa720ae827abcd03e0449ec0c1c.cloudapp-preview2.appcelerator.com/";

function http_request(url, success, error, payload)
{
    var xhr = Ti.Network.createHTTPClient({
        onload : function (e) {
            try {
                Ti.API.info('Success: ' + url + ' response: ' + this.responseText);
                var bibles = JSON.parse(this.responseText);
                success && success(bibles);
            } catch (err) {
               Ti.API.error('Error ' + err.error + 'Message ' + err.message);
               error && error(err);
            }
        },
        onerror : function(e) {
            Ti.API.error('Error ' + e.error);
            error && error(e);
        },
        timeout : 10000
    });
    
    // http://rebar.orthlieb.com/quote.json/?version=asv&book=John&chapter=3&verse=16
    if (payload) {
        var values = [];        
        for (var key in payload) {
            values.push(key + '=' + payload[key]); 
        }            
        url = url + '?' + values.join('&');
    }
    
    xhr.open("GET", url);
    xhr.send();
}

function getVersions(success, error) {
    http_request(BASE_URL + 'versions.json', success, error);
}

function getQuote(payload, success, error) {
    http_request(BASE_URL + 'quote.json', success, error);
}

function BibleModel() {
}

BibleModel.prototype.getVersions = getVersions;
BibleModel.prototype.getQuote = getQuote;

module.exports = BibleModel;