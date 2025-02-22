let subjectName = document.querySelector('#subject-name')
let subjectTeacher = document.querySelector('#subject-teacher')
let subjectClassroom = document.querySelector('#subject-classroom')
let subjectBtn = document.querySelector('#subject-btn')
let subjectTable = document.querySelector('#subject-table')

// Dodajemo red za naslove tabele ako već ne postoji
if (!subjectTable.querySelector('thead')) {
  let thead = document.createElement('thead')
  thead.innerHTML = `
    <tr>
      <th>Naziv Predmeta</th>
      <th>Nastavnik</th>
      <th>Učionica</th>
      <th>Akcija</th>
    </tr>
  `
  subjectTable.appendChild(thead)
}

// Funkcija za spremanje predmeta u localStorage
function saveSubject() {
  let subjects = []

  // Prolazimo kroz svaki red tabele i čuvamo podatke
  document.querySelectorAll('#subject-table tbody tr').forEach((row) => {
    let cols = row.querySelectorAll('td')
    subjects.push({
      name: cols[0].textContent,
      teacher: cols[1].textContent,
      classroom: cols[2].textContent,
    })
  })

  localStorage.setItem('subject', JSON.stringify(subjects))
}

// Funkcija za učitavanje predmeta iz localStorage
function loadSubject() {
  let subjects = JSON.parse(localStorage.getItem('subject')) || []

  subjects.forEach((subject) => {
    addSubject(subject.name, subject.teacher, subject.classroom)
  })
}

// Funkcija za dodavanje predmeta u tabelu
function addSubject(name, teacher, classroom) {
  let tbody = subjectTable.querySelector('tbody')
  if (!tbody) {
    tbody = document.createElement('tbody')
    subjectTable.appendChild(tbody)
  }

  let tr = document.createElement('tr')
  tr.innerHTML = `
    <td>${name}</td>
    <td>${teacher}</td>
    <td>${classroom}</td>
    <td><button class="remove-subject-btn">Remove</button></td>
  `

  tbody.appendChild(tr)

  // Dodavanje funkcionalnosti za brisanje
  let removeSubjectBtn = tr.querySelector('.remove-subject-btn')
  removeSubjectBtn.addEventListener('click', () => {
    tr.remove()
    saveSubject() // Ažuriramo localStorage nakon brisanja
  })

  saveSubject() // Čuvamo u localStorage svaki put kada dodamo predmet
}

// Dodavanje predmeta nakon klika na dugme
subjectBtn.addEventListener('click', (event) => {
  event.preventDefault()

  addSubject(subjectName.value, subjectTeacher.value, subjectClassroom.value)

  // Resetujemo inpute nakon dodavanja
  subjectName.value = ''
  subjectTeacher.value = ''
  subjectClassroom.value = ''
})

// Učitavanje podataka pri pokretanju stranice
loadSubject()
