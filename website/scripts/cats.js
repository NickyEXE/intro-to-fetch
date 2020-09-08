console.log("INEFFABLE!")

const body = document.querySelector("body")

fetch("http://localhost:3000/cats")
  .then(res => res.json())
  .then(renderCats)

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
  catsList.appendChild(div)
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
