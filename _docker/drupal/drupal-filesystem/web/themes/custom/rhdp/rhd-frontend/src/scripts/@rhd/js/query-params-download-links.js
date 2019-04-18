/*
 * Read url params and append to download-manager links
 */


app = window.app || {};

app.queryParamsDownloadLink = {};

//Read query params from passed url string, if none passed get window url params.
app.queryParamsDownloadLink.getUrlQueryParams = function(url) {
    var params = {};
	var parser = document.createElement('a');
	parser.href = url ? url : window.location.href;;
	var query = parser.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if(pair[0] !== "") {
            params[pair[0]] = decodeURIComponent(pair[1]);
        }
	}
	return params;
};

//serialize a JS object for appending to a url string
app.queryParamsDownloadLink.serialize = function(obj) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
};

//Returns a new url string from passed string including any window url params 
//(if same the url params are in the window url and the passed url window params override).
app.queryParamsDownloadLink.updateDownloadLink = function(theUrl) {
    if(!theUrl) {
        return
    }
    let returnValue = "";
    const downloadLinkParams = app.queryParamsDownloadLink.getUrlQueryParams(theUrl);
    const urlParams = app.queryParamsDownloadLink.getUrlQueryParams();
    const joinedObject = {...downloadLinkParams, ...urlParams };
    const serializeParams = app.queryParamsDownloadLink.serialize(joinedObject);

    if(theUrl.indexOf("?") === -1) {
        returnValue = theUrl + "?" + serializeParams;
    } else {
        splitUrl = theUrl.split("?");
        returnValue = splitUrl[0] + "?" + serializeParams;
    }
    return returnValue;
};

$(function() {
    var $downloadLinks = $('a[href*="/download-manager/"]');
    // check if we are on a page that needs this to run
    $downloadLinks.each( function() {
        const newDownloadLink = app.queryParamsDownloadLink.updateDownloadLink($(this).attr('href'));
        $(this).attr('href', newDownloadLink);
    });
});