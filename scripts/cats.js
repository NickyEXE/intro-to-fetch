console.log("INEFFABLE!")

const body = document.querySelector("body")
body.innerHTML += `<div class="cats-list"></div>`
const newCatForm = document.getElementById("new-cat-form")
const catsList = document.querySelector(".cats-list")

catAdapter.getCats().then(renderCats)

function renderCats(cats){
  cats.forEach(renderCat)
}

function renderCat(cat){
  catsList.innerHTML += createCatCardHTML(cat)
}

function createCatCardHTML(cat){
  return `
  <div class="cat-card"
    data-id=${cat.id}
    data-name="${cat.name}"
    data-description="${cat.description}"
    data-image="${cat.image}"
    data-actor="${cat.actor}"
    data-teamName="${cat.teamName}"
  >
    <img src=${cat.image} alt="${cat.name}">
    <p><strong>${cat.name}</strong></p>
    <p>${cat.description}</p>
    <p>Played by ${cat.actor}</p>
    <p class="tipPTag">${cat.actor} has $${cat.tips} in tips!</p>
    <div class="edit cat-button">Correct information about ${cat.name}.</div>
    <div class="tip cat-button">Tip ${cat.actor} $10.</div>
    <div class="delete cat-button">Vanish ${cat.name} to the barge in the Thames!</div>
  </div>
    `
}

catsList.addEventListener("click", (e) => {
  if (e.target.classList.contains("tip")){
    tipCat(e.target.closest(".cat-card"))
  }
  if (e.target.classList.contains("delete")){
    deleteCat(e.target.closest(".cat-card"))
  }
  if (e.target.classList.contains("edit")){
    editCat(e.target.closest(".cat-card"))
  }
})

function tipCat(catCard){
  const id = catCard.dataset.id
  catAdapter.tipCat(id)
  .then(cat => {
    catCard.querySelector(".tipPTag").innerText = `${cat.actor} has $${cat.tips} in tips!`
  })
}

function deleteCat(catCard){
  const id = catCard.dataset.id
  catAdapter.deleteCat(id).then(() => catCard.remove())
}

function editCat(catCard){
  const {name, description, image, actor, teamName, id} = catCard.dataset
  console.log(actor)
  console.log(catCard.dataset)
  document.querySelector("form").outerHTML = `
  <form id="edit-cat-form" data-id=${id}>
    <label for="name">Name:</label><br>
    <input type="text" name="name" value="${name}"><br>
    <label for="actor">Actor:</label><br>
    <input type="text" name="actor" value="${actor}"><br>
    <label for="description">Description:</label><br>
    <textarea name="description">${description}</textarea><br>
    <label for="image">Image:</label><br>
    <input type="text" value="${image}" name="image"><br>
    <label for="teamName">Team Name:</label><br>
    <input type="text" name="teamName" value="${teamName}"><br>
    <input type="submit" value="Add your Cat!">
    <br>
  </form>`
  document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault()
    updateCat(e.target)
    .then(cat => {
      catCard.outerHTML = createCatCardHTML(cat)
      setForm()
    })
  })
}


function setForm(){
  document.querySelector("form").outerHTML = `
  <form id="new-cat-form">
    <label for="name">Name:</label><br>
    <input type="text" name="name"><br>
    <label for="actor">Actor:</label><br>
    <input type="text" name="actor"><br>
    <label for="description">Description:</label><br>
    <textarea name="description"></textarea><br>
    <label for="image">Image:</label><br>
    <input type="text" name="image"><br>
    <label for="teamName">Team Name:</label><br>
    <input type="text" name="teamName"><br>
    <input type="submit" value="Add your Cat!">
    <br>
  </form>`
  const newCatForm = document.querySelector("form")
  newCatForm.addEventListener("submit", (e) => {
    e.preventDefault()
    catAdapter.newCat(e.target)
    .then(data => {
      if (data.errors) { alert(data.errors) }
      else {
        renderCat(data)
        newCatForm.reset()
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  })
}

setForm()

  // const div = document.createElement("div")
  // div.classList.add("cat-card")
  // div.innerHTML = `
  //   <img src="${cat.image}" alt=${cat.name}/>
  //   <p><strong>${cat.name}</strong></p>
  //   <p>${cat.description}</p>
  //   <p>Played by ${cat.actor}</p>
  // `
  // const tip = document.createElement("p")
  // tip.innerText = `${cat.actor} has $${cat.tips} in tips!`

  // const tipButton = document.createElement("div")
  // tipButton.className = "tip cat-button"
  // tipButton.innerText = `Tip ${cat.actor} $10.`
  // tipButton.addEventListener("click", () => {
  // fetch(`${API}/cats/${cat.id}`, {
  //   method: 'PATCH'
  // })
  // .then(res => res.json())
  // .then((cat) => {
  //   tip.innerText = `${cat.actor} has $${cat.tips} in tips!`
  // })
  // })

  // const deleteButton = document.createElement("div")
  // deleteButton.className = "delete cat-button"
  // deleteButton.innerText = `Vanish ${cat.name} to the barge in the Thames!`
  // deleteButton.addEventListener("click", () => {
    // fetch(`${API}/cats/${cat.id}`, {
    //   method: "DELETE"
    // })
    // .then(res=> res.json())
    // .then(() => div.remove())
  // })
  // div.append(tip, tipButton, deleteButton)

  // catsList.appendChild(div)

// newCatForm.addEventListener("submit", (e) => {
//   e.preventDefault()
//   data = {
//     name: newCatForm.name.value,
//     description: newCatForm.description.value,
//     actor: newCatForm.actor.value,
//     image: newCatForm.image.value,
//     team_name: newCatForm.teamName.value,
//   }
//   fetch(`${API}/cats`, {
//     method: 'POST', // or 'PUT'
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   })
//   .then(response => response.json())
//   .then(data => {
//     if (data.errors) { alert(data.errors) }
//     else {
//       renderCat(data)
//       newCatForm.reset()
//     }
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });
// })




// renderCats(cats)

// function renderCat(cat){
//   const catsList = document.querySelector(".cats-list")

//   const catCard = document.createElement("div")
//   catCard.classList.add("cat-card")

//   const img = document.createElement("img")
//   img.src = cat.image
//   img.alt = cat.name

//   const name = document.createElement("p")
//   name.innerText = cat.name
//   name.style.fontWeight = "bold"

//   const description = document.createElement("p")
//   description.innerText = cat.description

//   const actor = document.createElement("p")
//   actor.innerText = "Played by " + cat.actor

//   catsList.appendChild(catCard)
//   catCard.append(img, name, description, actor)
//   catElements.push(catCard)
// }
