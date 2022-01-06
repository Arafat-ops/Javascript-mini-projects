// let notes = document.getElementById('note')
let addBtn = document.querySelector(".add")
addBtn.addEventListener("click", () => {
    addNote()
})
let getNodesLs = JSON.parse(localStorage.getItem("nodes"))
if (getNodesLs) {
    getNodesLs.forEach((note) => {
        addNote(note)
    })
    // addNote(getNodesLs)
}

function addNote(text = "") {

    let note_div = document.createElement("div")
    note_div.classList.add("notes")
    note_div.innerHTML = `
        
        <div class="note-tools">
        <button title="edit" class="edit"><i class="far fa-edit"></i></button>
        <button class="delete" title="delete"><i class="far fa-trash-alt"></i></button>
        </div>
        <div class="main display_none"></div>
        <textarea title="textarea"></textarea> `

    document.body.appendChild(note_div)

    let btnEdit = document.querySelector('.edit')
    let btnDelete = document.querySelector('.delete')


    let main = document.querySelector('.main')
    let textarea = document.querySelector('textarea')
    textarea.value = text
    main.innerHTML = marked(text)
    btnEdit.addEventListener('click', () => {
        textarea.classList.toggle('display_none')
        main.classList.toggle('block')
    })
    btnDelete.addEventListener("click", () => {
        note_div.remove()
        updateLs()
    })
    textarea.addEventListener("input", (e) => {
        const {
            value
        } = e.target;

        main.innerHTML = marked(value);
        updateLs()
    });

}

function updateLs() {
    let nodeText = document.querySelectorAll("textarea")
    let notes = []
    nodeText.forEach((text) => {
        notes.push(text.value)
    })
    localStorage.setItem("notes", JSON.stringify(notes))
}