function renderBiggerFont(fontSizeIncrement) {
    
    const list = ["p", "h1", "h2", "h3", "h4", "h5", "h6", "span", "a", "li", "div", "button", "label"];
    for (let i = 0; i < list.length; i++) {
        document.querySelectorAll(` ${list[i]}`).forEach(element => {
            element.style.fontSize = (parseInt(window.getComputedStyle(element).fontSize) + fontSizeIncrement) + "px";
        });
    }
}

function primeFontSize() {
    
    document.querySelectorAll(`p, h1, h2, h3, h4, h5, h6, span, a, li, div, button, label`).forEach((element) => {
        const tagName = element.tagName.toLowerCase();
        const fontSize = parseInt(window.getComputedStyle(element).fontSize);
        dict[tagName].push(fontSize);
    });
    return dict;
}

chrome.storage.local.get(["sliderValue", "isResizing"], (data) => {
    if (data.isResizing && data.sliderValue) {
        renderBiggerFont(parseInt(data.sliderValue));
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "renderBiggerFont") {
        renderBiggerFont(request.fontSizeIncrement);
        sendResponse({ status: "Czcionka zmieniona!" });
    }
});