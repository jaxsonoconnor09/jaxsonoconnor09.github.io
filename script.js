const hoverTip = document.querySelector("#hover-tip");
let defaultHoverColor = "#454545";

document.querySelectorAll("[data-hover-tip").forEach(elementWithHoverTip => {
    elementWithHoverTip.addEventListener("mouseover", (event) => {
        const x = event.clientX;
        const y = event.clientY;

        hoverTip.style.opacity = "1";
        hoverTip.style.top = `${y+15}px`;
        hoverTip.style.left = `${x+10}px`;
        hoverTip.innerText = elementWithHoverTip.getAttribute("data-hover-tip-value");

        if (!(elementWithHoverTip.getAttribute("data-hover-color") == "none")) {
            elementWithHoverTip.style.background = elementWithHoverTip.getAttribute("data-hover-color") == "default" ? defaultHoverColor : elementWithHoverTip.getAttribute("data-hover-color");
        }
    });
    elementWithHoverTip.addEventListener("mouseout", () => {
        hoverTip.style.opacity = "0";

        if (!(elementWithHoverTip.getAttribute("data-hover-color") == "none")) {
            elementWithHoverTip.style.background = "var(--panel)";
        }
    });
});