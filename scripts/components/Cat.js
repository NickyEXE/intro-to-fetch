class Cat {

  static all = []

  constructor(cat){
    this.cat = cat
    this.card = this.createCard()
    this.constructor.all.push(this)
  }

  createCard = () => {
    const card = document.createElement("div")
    card.className = "cat-card"
    card.id = `cat-${this.cat.id}`
    card.innerHTML = this.renderInnerHTML()
    return card
  }

  renderInnerHTML = () => {
    // Destructuring!
    const {image, name, description, actor, tips} = this.cat
    return `<img src=${image}
    alt="${name}">
    <p><strong>${name}</strong></p>
    <p>${description}</p>
    <p>Played by ${actor}</p>
    <p class="tipPTag">${actor} has $${tips} in tips!</p>
    <div class="edit cat-button">Edit ${name}.</div>
    <div class="tip cat-button">Tip ${actor} $10.</div>
    <div class="delete cat-button">Vanish ${name} to the barge in the Thames!</div>`
  }

  static findCatById(id){
    return this.all.find(catInstance => catInstance.id === id)
  }

}
