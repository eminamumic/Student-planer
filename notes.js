let notesTitle = document.querySelector('#notes-title')
let notesContent = document.querySelector('#notes-content')
let notesBtn = document.querySelector('#notes-btn')
let notesList = document.querySelector('#notes-list')
let notesClearBtn = document.querySelector('#notes-clear-btn')

function addNotes(title, text) {
  let div = document.createElement('div')
  div.innerHTML = `<h3>${title}</h3>
      <p>${text}</p>
      <button class="notes-remove-btn">Izbrisi</button>`

  let li = document.createElement('li')
  li.appendChild(div)
  notesList.appendChild(li)
  notesTitle.value = ''
  notesContent.value = ''

  let notesRemoveBtn = div.querySelector('.notes-remove-btn')
  notesRemoveBtn.addEventListener('click', () => {
    li.remove()
    saveNoteList()
  })
  saveNoteList()
}

function saveNoteList() {
  let notes = []
  let notesListLi = notesList.querySelectorAll('li')
  notesListLi.forEach((li) => {
    let title = li.querySelector('h3').textContent
    let text = li.querySelector('p').textContent
    notes.push({
      title: title,
      text: text,
    })
  })
  localStorage.setItem('notes', JSON.stringify(notes))
}

function loadNoteList() {
  let notes = JSON.parse(localStorage.getItem('notes')) || []
  notes.forEach((note) => {
    addNotes(note.title, note.text)
  })
}

notesBtn.addEventListener('click', () => {
  addNotes(notesTitle.value, notesContent.value)
})

notesClearBtn.addEventListener('click', () => {
  localStorage.clear()
  notesList.innerHTML = ''
})

loadNoteList()
