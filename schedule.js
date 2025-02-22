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

function saveSchedule() {
  let schedule = []
  let scheduleTabel = document.querySelectorAll('td')
  scheduleTabel.forEach((coloumn) => {})
}

scheduleBtn.addEventListener('click', () => {
  event.preventDefault()
  let tr = document.createElement('tr')

  tr.innerHTML = `<td><span>${scheduleSubject.value}</span></td>
      <td><span>${scheduleDay.value}>/span></td>
      <td><span>${scheduleTime.value}</span></td>
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
