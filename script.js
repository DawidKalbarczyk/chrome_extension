document.getElementById("button-yes").addEventListener("click", () => {
    document.querySelector("h1").textContent = "You clicked Yes!";
    document.querySelectorAll(".p").forEach((element) => {
    const fontSize = parseInt(window.getComputedStyle(element).fontSize);
    element.style.fontSize = fontSize * 4 + "px";
});

});

