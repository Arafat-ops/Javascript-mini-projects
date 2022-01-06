console.clear()
let main = document.querySelector(".note-main")
let display = document.querySelector(".display")
let textarea = document.querySelector("textarea")
let edit = document.querySelector(".edit")
let remove = document.querySelector(".delete")

edit.addEventListener("click", () => {
    display.classList.toggle("hide")
    textarea.classList.toggle("hide")
})
textarea.addEventListener("input", (event) => {
    const {
        value
    } = event.target
    let text = marked(value)
    display.innerHTML = text
    storeDataLs()
})

function storeDataLs() {
    let allText = document.querySelectorAll("textarea")
    let notes = []
    allText.forEach(x => {
        notes.push(x.value)
    })
    localStorage.setItem("notes", JSON.stringify(notes))
}

function getDataLs() {
    let text = JSON.parse(localStorage.getItem("notes"))
    return text
}
console.log(getDataLs());

window.addEventListener("load", () => {
    let notes = getDataLs()
    notes.forEach(x => {
        display.innerHTML = marked(x)
    })
    display.classList.remove("hide")
    textarea.classList.add("hide")
})