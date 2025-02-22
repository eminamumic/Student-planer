let scheduleDay = document.querySelector('#schedule-day')
let scheduleTime = document.querySelector('#schedule-time')
let scheduleSubject = document.querySelector('#schedule-subject')
let scheduleBtn = document.querySelector('#schedule-btn')
let scheduleTable = document.querySelector('#schedule-table')

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

scheduleBtn.addEventListener('click', () => {
  event.preventDefault()
  let tr = document.createElement('tr')

  tr.innerHTML = `<td>${scheduleSubject.value}</td>
      <td>${scheduleDay.value}</td>
      <td>${scheduleTime.value}</td>
      <td><button class="remove-schedule-btn">Remove</button></td>`
  scheduleTable.appendChild(tr)
  scheduleTime.value = ''
  scheduleDay.value = ''
  scheduleSubject.value = ''

  let removeScheduleBtn = tr.querySelector('.remove-schedule-btn')
  removeScheduleBtn.addEventListener('click', () => {
    tr.remove()
  })
})

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
      <th>Action</th>
    </tr>
  `
  subjectTable.appendChild(thead)
}

subjectBtn.addEventListener('click', (event) => {
  event.preventDefault()
  let tr = document.createElement('tr')

  tr.innerHTML = `<td>${subjectName.value}</td>
  <td>${subjectTeacher.value}</td>
  <td>${subjectClassroom.value}</td>
    <td><button class="remove-subject-btn">Remove</button></td>`
  subjectTable.appendChild(tr)
  subjectName.value = ''
  subjectTeacher.value = ''
  subjectClassroom.value = ''

  let removeSubjectBtn = tr.querySelector('.remove-subject-btn')
  removeSubjectBtn.addEventListener('click', () => {
    tr.remove()
  })
})
