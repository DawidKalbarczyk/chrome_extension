let sliderValue = parseInt(localStorage.getItem("sliderValue")) || 1;
let isResizing = parseInt(localStorage.getItem("isResizing")) || false;
let lastIncrement = 0;
let primalFontSize = [];
//Dodaj localstorage do przechowywania wartości pierwotnej czcionki dla każdego document.querySelectorAll(`p, h1, h2, h3, h4, h5, h6, span, a, li, div, button, label`).forEach((element) => {
//Nie działa dla innych stro niż testowana

document.getElementById("slider-id").value = sliderValue;
document.getElementById("slider-value").textContent = sliderValue;

function renderFunction() {
    chrome.sendMessage(tabs[0].id, {
        action: "primeFontSize"
    });
    if (lastIncrement === sliderValue) {
        return;
    } else {
        lastIncrement = sliderValue;
    }
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { 
            action: "renderBiggerFont",
            fontSizeIncrement: parseInt(sliderValue),
            
        }, (response) => {
            console.log("Response from content script:", response);
        });
    });
}
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { 
        action: "getSliderValue",
        fontSizeIncrement: parseInt(sliderValue) || 0
    }, (response) => {
        console.log("Response from content script:", response);
    });
});



document.getElementById("slider-id").addEventListener("input", (event) => {
    sliderValue = event.target.value;
    document.getElementById("slider-value").textContent = sliderValue;
    localStorage.setItem("sliderValue", sliderValue);
    chrome.storage.local.set({ sliderValue: parseInt(sliderValue) });
});


document.getElementById("button-yes").addEventListener("click", () => {
    document.querySelector("h1").textContent = "You clicked Yes!";
    localStorage.setItem("isResizing", true);
    chrome.storage.local.set({ isResizing: true, sliderValue: parseInt(sliderValue) });
    renderFunction();
});

document.getElementById("button-no").addEventListener("click", () => {
    document.querySelector("h1").textContent = "You clicked No!";
    localStorage.setItem("isResizing", false);
    renderFunction();
});