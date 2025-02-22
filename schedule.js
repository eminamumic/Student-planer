let scheduleDay = document.querySelector('#schedule-day')
let scheduleTime = document.querySelector('#schedule-time')
let scheduleSubject = document.querySelector('#schedule-subject')
let scheduleBtn = document.querySelector('#schedule-btn')
let scheduleTable = document.querySelector('#schedule-table')

// Dodaj zaglavlje ako ne postoji
if (!scheduleTable.querySelector('thead')) {
  let thead = document.createElement('thead')
  thead.innerHTML = `
      <tr>
        <th>Subject</th>
        <th>Day</th>
        <th>Time</th>
        <th>Action</th>
      </tr>
    `
  scheduleTable.appendChild(thead)
}

// Dodaj `tbody` ako ne postoji
let tbody = scheduleTable.querySelector('tbody')
if (!tbody) {
  tbody = document.createElement('tbody')
  scheduleTable.appendChild(tbody)
}

// Funkcija za dodavanje unosa u tabelu
function addScheduleToTable(subject, day, time) {
  let tr = document.createElement('tr')
  tr.innerHTML = `
      <td><span>${subject}</span></td>
      <td><span>${day}</span></td>
      <td><span>${time}</span></td>
      <td><button class="remove-schedule-btn">Remove</button></td>
    `
  tbody.appendChild(tr)

  // Dugme za brisanje iz tabele i localStorage-a
  let removeScheduleBtn = tr.querySelector('.remove-schedule-btn')
  removeScheduleBtn.addEventListener('click', () => {
    tr.remove()
    removeScheduleFromLocalStorage(subject, day, time)
  })
}

// Funkcija za čuvanje rasporeda u localStorage
function saveScheduleToLocalStorage() {
  let schedule = []

  // Dohvati sve redove iz tabele i spremi u niz
  document.querySelectorAll('#schedule-table tbody tr').forEach((tr) => {
    let columns = tr.querySelectorAll('td span')
    schedule.push({
      subject: columns[0].textContent,
      day: columns[1].textContent,
      time: columns[2].textContent,
    })
  })

  localStorage.setItem('schedule', JSON.stringify(schedule))
}

// Funkcija za učitavanje rasporeda iz localStorage
function loadSchedule() {
  let schedule = JSON.parse(localStorage.getItem('schedule')) || []

  // Očisti tabelu prije dodavanja
  tbody.innerHTML = ''

  schedule.forEach((entry) =>
    addScheduleToTable(entry.subject, entry.day, entry.time)
  )
}

// Funkcija za uklanjanje unosa iz localStorage
function removeScheduleFromLocalStorage(subject, day, time) {
  let schedule = JSON.parse(localStorage.getItem('schedule')) || []

  // Filtriraj niz i sačuvaj samo one koji nisu obrisani
  schedule = schedule.filter(
    (entry) =>
      !(entry.subject === subject && entry.day === day && entry.time === time)
  )
  localStorage.setItem('schedule', JSON.stringify(schedule))
}

// Dodavanje unosa na klik
scheduleBtn.addEventListener('click', (event) => {
  event.preventDefault()

  if (!scheduleSubject.value || !scheduleDay.value || !scheduleTime.value) {
    alert('Please fill in all fields!')
    return
  }

  // Dodaj unos u tabelu
  addScheduleToTable(
    scheduleSubject.value,
    scheduleDay.value,
    scheduleTime.value
  )

  // Sačuvaj u localStorage
  saveScheduleToLocalStorage()

  // Očisti input polja
  scheduleTime.value = ''
  scheduleDay.value = ''
  scheduleSubject.value = ''
})

// Učitaj sačuvane unose prilikom pokretanja stranice
loadSchedule()
