let toDoInput = document.querySelector('#input-todo')
let toDobtn = document.querySelector('#todo-btn')
let toDoList = document.querySelector('#todo-list')
let toDoClearBtn = document.querySelector('#todo-clear-btn')

function addToDoItem(text, done = false) {
  let li = document.createElement('li')

  li.innerHTML = `📝 <span>${text}</span> 
      <button class="remove-btn">X</button> 
      <button class="done-btn">Done</button>`

  let itemText = li.querySelector('span')
  // Ako je zadatak već označen kao obavljen, postavi boju na zelenu.
  if (done) {
    itemText.style.textDecoration = 'line-through'
    itemText.style.opacity = '0.5'
  }

  let removeBtn = li.querySelector('.remove-btn')
  removeBtn.addEventListener('click', () => {
    li.remove()
    saveToDoList() // ažuriramo localStorage nakon brisanja
  })

  let doneBtn = li.querySelector('.done-btn')
  doneBtn.addEventListener('click', () => {
    itemText.style.textDecoration = 'line-through'
    itemText.style.opacity = '0.5'
    saveToDoList() // ažuriramo localStorage nakon označavanja kao gotov
  })

  toDoList.appendChild(li)
  saveToDoList() // spremamo novu listu
}

function saveToDoList() {
  let tasks = []
  let toDoListItems = toDoList.querySelectorAll('li')
  toDoListItems.forEach((item) => {
    let span = item.querySelector('span')
    tasks.push({
      tekst: span.textContent,
      done: span.style.textDecoration === 'line-through',
    })
  })
  localStorage.setItem('toDoLista', JSON.stringify(tasks))
}

function loadToDoList() {
  let lista = JSON.parse(localStorage.getItem('toDoLista')) || []
  lista.forEach((item) => {
    addToDoItem(item.tekst, item.done)
  })
}

toDobtn.addEventListener('click', () => {
  event.preventDefault()
  addToDoItem(toDoInput.value)
  toDoInput.value = ''
})

toDoClearBtn.addEventListener('click', () => {
  localStorage.clear()
  toDoList.innerHTML = ''
})

loadToDoList()
