const textarea = document.body.querySelector("textarea");
const render = document.body.querySelector("div");

textarea.value = localStorage.getItem("text");
render.innerHTML = marked(localStorage.getItem("text"));
textarea.addEventListener("keyup", function (e) {
    localStorage.setItem("text", textarea.value);
    render.innerHTML = marked(textarea.value);
})