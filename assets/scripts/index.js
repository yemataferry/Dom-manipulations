// creating inputs and button

const boxes = document.getElementById('container')
const form = document.querySelector('form')

const name = document.createElement('input')
const age = document.createElement('input')
const submit = document.createElement('button')

name.type = 'text'
age.type = 'Number'

name.classList.add('noms')
age.classList.add('ages')
submit.classList.add('submits')

name.placeholder = 'Name'
age.placeholder = 'Age'
submit.innerHTML = 'Submit'

boxes.appendChild(name)
boxes.appendChild(age)
boxes.appendChild(submit)

const base = document.getElementById('database')
const table = document.createElement('table')

const Data = [
  { name: 'Jack Baroski', age: 28 },
  { name: 'Boris Mao', age: 20 },
  { name: 'Joe Dan', age: 30 },
  { name: 'Ferry Michaelson', age: 25 },
  { name: 'Ramy Sanchez', age: 19 }
]
console.log(Data)

// fxn creating the initials of each name

function initials (string) {
  let initial = string[0]
  for (let i = 0; i <= string.length - 1; i++) {
    if (string[i] === ' ') {
      initial += '.' + string[i + 1]
    }
  }
  return initial.toUpperCase()
}
// console.log(initials(Data))

function researchList (user) {
  // const btnId = user.split(' ').join('-')
  return `
  <tr> 
      <td>${initials(user.name)}</td>
      <td>${user.name} </td>
      <td>${user.age} </td>
      <td><button id="${user.name}" class="delete-btn">Delete</button></td>
  </tr>`
}

// displaying the headers so as to create it back anytime the page will be refresh

function displayList (Data) {
  base.innerHTML = `
    <tr>
        <th>Initials</th>
        <th>Name</th>
        <th>Age</th>
    </tr>
  `
  Data.forEach(function (user, i) {
    base.innerHTML += researchList(user)
  })
  userDelete()
}

// The research function

const research = (checkName, checkAge) => {
  const result = Data.filter((user) => {
    const researchName = checkName.toLowerCase()
    const userName = user.name.toLowerCase()

    if ((researchName && userName.includes(researchName)) || (checkAge && user.age === checkAge)) {
      return true
    }
  })
  return result
}

// noms.addEventListener('input', research(a, b))
// age.addEventListener('input', research(a, b))

displayList(Data)

// Applying the function to the submit button

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const nam = name.value
  const ag = parseInt(age.value)
  const res = research(nam, ag)
  console.log(nam, ag, res)
  displayList(res)
})

// Deleting fxn to delete desired user

function userDelete () {
  const deleteButtons = document.querySelectorAll('.delete-btn')
  
  deleteButtons.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      const userName = event.target.id

      const update = Data.filter((user) => {
        if (user.name !== userName) {
          return true
        }
      })
      console.log(update, userName)
      Data = update
      displayList(update)
    })
  })
}
userDelete()
