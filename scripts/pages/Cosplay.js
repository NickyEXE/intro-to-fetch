class Cosplay {
  constructor(){
    this.init()
  }

  init = () => {
    this.renderHTML()
    document.getElementById("dog-button").addEventListener("click", this.addDog)
  }

  addDog = () => {
    adapter.getADog()
    .then(resp => {
      this.renderDog(resp.message)})
  }

  renderDog = (dogUrl) => {
    document.querySelector(".dogs").innerHTML += `<div><img src=${dogUrl} alt="DOG"/></div>`
  }

  renderHTML = () => {
    root.innerHTML = `
    <header><h1>Oops these are dogs</h1></header>
    <button id="dog-button">Add a Dog</button>
    <div class="dogs"></div>`
  }

}
