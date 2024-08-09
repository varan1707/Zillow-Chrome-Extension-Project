document.getElementById("open-maps").addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const url = tabs[0].url;
        const address = getAddressFromUrl(url);
        if (address) {
            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
            chrome.tabs.create({ url: mapsUrl });
        }
    });
});

document.getElementById("open-earth").addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const url = tabs[0].url;
        const address = getAddressFromUrl(url);
        if (address) {
            const earthUrl = `https://earth.google.com/web/search/${encodeURIComponent(address)}`;
            chrome.tabs.create({ url: earthUrl });
        }
    });
});

function getAddressFromUrl(url) {
    const regex = /\/homedetails\/([^/]+)\/[^/]+\/[^/]+/;
    const match = url.match(regex);
    if (match && match[1]) {
        return decodeURIComponent(match[1].replace(/-/g, ' '));
    }
    return null;
}