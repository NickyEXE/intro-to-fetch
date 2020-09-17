console.log("INEFFABLE!")
const newCatForm = document.getElementById("new-cat-form")

const body = document.querySelector("body")

function init(){
  adapter.getAllCats().then(renderCats)
  appendEventListeners()
}

function appendEventListeners(){
  addSubmitEvent()
}

function renderCats(cats){
  const catsList = document.createElement("div")
  body.appendChild(catsList)
  catsList.outerHTML = '<div class="cats-list">'
  cats.forEach(renderCat)
}

function renderCat(cat){
  const catsList = document.querySelector(".cats-list")
  const div = document.createElement("div")
  div.classList.add("cat-card")
  div.innerHTML = `
    <img src="${cat.image}" alt=${cat.name}/>
    <p><strong>${cat.name}</strong></p>
    <p>${cat.description}</p>
    <p>Played by ${cat.actor}</p>
  `
  const tip = document.createElement("p")
  tip.innerText = `${cat.actor} has $${cat.tips} in tips!`

  const tipButton = document.createElement("div")
  tipButton.className = "tip cat-button"
  tipButton.innerText = `Tip ${cat.actor} $10.`
  tipButton.addEventListener("click", () => {
    adapter.tipCat(cat.id)
    .then((cat) => {
      tip.innerText = `${cat.actor} has $${cat.tips} in tips!`
    })
  })

  const deleteButton = document.createElement("div")
  deleteButton.className = "delete cat-button"
  deleteButton.innerText = `Vanish ${cat.name} to the barge in the Thames!`
  deleteButton.addEventListener("click", () => {
    adapter.deleteCat(cat.id)
    .then(() => div.remove())
  })
  div.append(tip, tipButton, deleteButton)

  catsList.appendChild(div)
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
