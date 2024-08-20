const tagContainer = document.querySelector(".tag-container");
const input = document.querySelector(".tag-input");
const btnRemoveAll = document.querySelector("#removeAll");
const btnCopy = document.querySelector("#copy");
const tagNumb = document.querySelector(".tags-remaining");

let maxTags = 10;
let tags = [];

function updateTagCount() {
    tagNumb.innerText = maxTags - tags.length;
}

function createTag(tag) {
    const div = document.createElement("div");
    div.setAttribute("class", "tag");
    const span = document.createElement("span");
    span.innerHTML = tag;
    const icon = document.createElement("i");
    icon.className = "fas fa-times"; 
    icon.setAttribute("data-item", tag);
    div.appendChild(span);
    div.appendChild(icon);
    return div;
}

function reset() {
    const tagElements = document.querySelectorAll(".tag");
    tagElements.forEach((tag) => {
        tag.parentElement.removeChild(tag);
    });
}

btnRemoveAll.addEventListener("click", function () {
    tags = [];
    reset();
    updateTagCount();
});

function addTags() {
    reset();
    tags
        .slice()
        .reverse()
        .forEach((tag) => {
            tagContainer.prepend(createTag(tag));
        });
    updateTagCount();
}

input.addEventListener("keyup", function (event) {
    if (event.key === "Enter" || event.key === ",") {
        const data = input.value.trim();
        if (data.includes(",")) {
            const list_of_tags = data.split(",").map(tag => tag.trim()).filter(tag => tag);
            tags.push(...list_of_tags);
        } else if (data) {
            tags.push(data);
        }
        tags = [...new Set(tags)].slice(0, maxTags);
        input.value = "";
        addTags();
    }
});

document.addEventListener("click", function (e) {
    if (e.target.tagName === "I" && e.target.classList.contains("fa-times")) {
        const data = e.target.getAttribute("data-item");
        tags = tags.filter(tag => tag !== data);
        addTags();
    }
});

btnCopy.addEventListener("click", function () {
    if (tags.length) {
        navigator.clipboard
            .writeText(tags.join(", "))
            .then(() => {
                alert("Tags Copied to Clipboard!");
            })
            .catch((error) => {
                console.error("Failed to Copy", error);
            });
    }
});
