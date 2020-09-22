console.log("INEFFABLE!")
const newCatForm = document.getElementById("new-cat-form")
const editCatForm = document.getElementById("edit-cat-form")
const body = document.querySelector("body")
const catsList = document.querySelector(".cats-list")

const catsArray = []

function init(){
  adapter.getAllCats().then(renderCats)
  appendEventListeners()
}

function appendEventListeners(){
  addSubmitEvent()
  addUpdateCatEvent()
}

function renderCats(cats){
  cats.forEach(renderCat)
}

function renderCat(cat){
  catsArray.push(cat)
  catsList.innerHTML += `
  <div data-id=${cat.id} id="cat-${cat.id}" class="cat-card">
  ${renderCatDivInnerHTML(cat)}
</div>`
}

function renderCatDivInnerHTML(cat){
  return `<img src=${cat.image}
  alt="${cat.name}">
  <p><strong>${cat.name}</strong></p>
  <p>${cat.description}</p>
  <p>Played by ${cat.actor}</p>
  <p class="tipPTag">${cat.actor} has $${cat.tips} in tips!</p>
  <div class="edit cat-button">Edit ${cat.name}.</div>
  <div class="tip cat-button">Tip ${cat.actor} $10.</div>
  <div class="delete cat-button">Vanish ${cat.name} to the barge in the Thames!</div>`
}

catsList.addEventListener("click", (e)=> {
  if (e.target.classList.contains("tip")){
    tipCat(e.target)
  }
  else if (e.target.classList.contains("delete")){
    deleteCat(e.target)
  }
  else if (e.target.classList.contains("edit")){
    showEditCatForm(e.target)
  }
})

function tipCat(target){
  const catCard = target.closest(".cat-card")
  const id = catCard.dataset.id
  adapter.tipCat(id)
  .then(cat => {
    catCard.querySelector(".tipPTag").innerText = `${cat.actor} has $${cat.tips} in tips!`
  })
}

function deleteCat(target){
  const catCard = target.closest(".cat-card")
  const id = catCard.dataset.id
  adapter.deleteCat(id)
  .then(() => catCard.remove())
}

function showEditCatForm(target){
  const catCard = target.closest(".cat-card")
  const id = catCard.dataset.id
  const cat = catsArray.find(item => item.id === parseInt(id))
  editCatForm.style.display = "block"
  editCatForm.name.value = cat.name
  editCatForm.description.innerText = cat.description
  editCatForm.actor.value = cat.actor
  editCatForm.image.value = cat.image
  editCatForm.teamName.value = cat.team_name
  editCatForm.catId.value = cat.id
}

function addUpdateCatEvent(){
  editCatForm.addEventListener("submit", (e) => {
    e.preventDefault()
    adapter.editCat(e.target).then(updateCat)
  })
}

function updateCat(cat){
  // get the card
  const catCard = document.getElementById(`cat-${cat.id}`)
  // update the values with the new values
  catCard.innerHTML = renderCatDivInnerHTML(cat)
  // hide the form
  editCatForm.style.display = "none"
  // update catsArray
  const arrIndex = catsArray.findIndex(item => item.id === parseInt(cat.id))
  catsArray[arrIndex] = cat
}

function addSubmitEvent(){
  newCatForm.addEventListener("submit", (e) => {
    e.preventDefault()
    adapter.addCat(e.target)
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

init()
// function renderCats(cats){
//   const catsList = document.createElement("div")
//   body.appendChild(catsList)
//   catsList.outerHTML = ''
//   cats.forEach(renderCat)
// }

// function renderCat(cat){
//   const catsList = document.querySelector(".cats-list")
//   const div = document.createElement("div")
//   div.classList.add("cat-card")
//   div.innerHTML = `
//     <img src="${cat.image}" alt=${cat.name}/>
//     <p><strong>${cat.name}</strong></p>
//     <p>${cat.description}</p>
//     <p>Played by ${cat.actor}</p>
//   `
//   const tip = document.createElement("p")
//   tip.innerText = `${cat.actor} has $${cat.tips} in tips!`

//   const tipButton = document.createElement("div")
//   tipButton.className = "tip cat-button"
//   tipButton.innerText = `Tip ${cat.actor} $10.`
//   tipButton.addEventListener("click", () => {
//     adapter.tipCat(cat.id)
//     .then((cat) => {
//       tip.innerText = `${cat.actor} has $${cat.tips} in tips!`
//     })
//   })

//   const deleteButton = document.createElement("div")
//   deleteButton.className = "delete cat-button"
//   deleteButton.innerText = `Vanish ${cat.name} to the barge in the Thames!`
//   deleteButton.addEventListener("click", () => {
//     adapter.deleteCat(cat.id)
//     .then(() => div.remove())
//   })
//   div.append(tip, tipButton, deleteButton)

//   catsList.appendChild(div)
// }




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
