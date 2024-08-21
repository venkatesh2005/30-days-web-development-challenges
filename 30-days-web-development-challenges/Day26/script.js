document.addEventListener("DOMContentLoaded", () => {
    const optionsButtons = document.querySelectorAll(".option-button");
    const advancedOptionButtons = document.querySelectorAll(".adv-option-button");
    const fontName = document.getElementById("fontName");
    const fontSize = document.getElementById("fontSize");
    const linkButton = document.getElementById("createLink");
    const removeHighlightButton = document.getElementById("removeHighlight");
    const colorInput = document.getElementById("colorInput");

    const sizes = [8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32];
    const fontList = ["Arial", "Verdana", "Times New Roman", "Garamond", "Georgia", "Courier New", "cursive"];

    fontList.forEach(font => {
        const option = document.createElement("option");
        option.value = font;
        option.textContent = font;
        fontName.appendChild(option);
    });

    sizes.forEach(size => {
        const option = document.createElement("option");
        option.value = size;
        option.textContent = size + "px";
        fontSize.appendChild(option);
    });

    fontSize.value = 8;

    const fontSizeMapping = {
        8: 1,
        10: 1,
        12: 2,
        14: 2,
        16: 3,
        18: 3,
        20: 4,
        22: 4,
        24: 5,
        26: 5,
        28: 6,
        30: 6,
        32: 7
    };

    function modifyText(command, value = null) {
        document.execCommand(command, false, value);
    }

    optionsButtons.forEach(button => {
        button.addEventListener("click", () => {
            modifyText(button.id);
        });
    });

    advancedOptionButtons.forEach(button => {
        button.addEventListener("change", () => {
            modifyText(button.id, button.value);
        });
    });

    fontName.addEventListener("change", () => {
        modifyText("fontName", fontName.value);
    });

    fontSize.addEventListener("change", () => {
        const selectedSize = parseInt(fontSize.value, 10);
        const execCommandSize = fontSizeMapping[selectedSize] || 3;
        modifyText("fontSize", execCommandSize);
    });

    colorInput.addEventListener("input", () => {
        modifyText("foreColor", colorInput.value);
    });

    linkButton.addEventListener('click', () => {
        const url = prompt("Enter a URL", "http://");
        if (url) {
            modifyText('createLink', url);
        }
    });

    removeHighlightButton.addEventListener("click", () => {
        modifyText("removeFormat");
    });
});
