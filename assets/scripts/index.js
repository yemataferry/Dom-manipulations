// creating inputs and button

const boxes = document.getElementById('container')
const form = document.querySelector('form')

const name = document.createElement('input')
const age = document.createElement('input')
const submit = document.createElement('button')
const refresh = document.querySelector('.material-symbols-outlined')

name.type = 'text'
age.type = 'Number'

name.classList.add('noms')
age.classList.add('ages')
submit.classList.add('submits')

name.placeholder = 'Research Name'
age.placeholder = 'Research Age'
submit.innerHTML = 'Submit'

boxes.appendChild(name)
boxes.appendChild(age)
boxes.appendChild(submit)

const base = document.getElementById('database')
// const table = document.createElement('table')

let Data = [
  { name: 'Jack Baroski', age: 28 },
  { name: 'Ferry Michaelson', age: 25 },
  { name: 'Ramy Sanchez', age: 19 },
  { name: 'Jaff David', age: 19 },
  { name: 'Wah Vanessa', age: 23 },
  { name: 'Enow John', age: 28 },
  { name: 'Nora Solonko', age: 28 },
  { name: 'Hills Carter', age: 28 }
]
console.log(Data)

// Refresh

refresh.addEventListener('click', () => {
  window.location.reload()
  displayList(Data)
})

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
        <th>Delete</th>
    </tr>
  `

  if (Data.length > 0) {
    Data.forEach(function (user, i) {
      base.innerHTML += researchList(user, i)
    })

    userDelete()
  } else {
    base.innerHTML += `
      <tr>
          <td colspan="4" class="result">......No User With  these informations found..... </td>
      </tr>
    `
  }
}

// The research function

const research = (checkName, checkAge) => {
  const result = Data.filter((user) => {
    const researchName = checkName.toLowerCase()
    const userName = user.name.toLowerCase()

    if ((researchName && userName.includes(researchName)) || (checkAge && user.age === checkAge)) {
      return true
    }
    return false
  })
  return result
}

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
        return false
      })
      console.log(update, userName)
      Data = update
      displayList(update)
    })
  })
}
userDelete()
