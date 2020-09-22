class Home {

  constructor(){
    this.init()
  }

  init = () => {
    this.macavitoggle = false
    this.render()
    this.addMacavitoggle()
  }

  render = () => {
    root.innerHTML = `
      <header><h1>#1 Cats Unofficial Fanpage</h1></header>
      <main>
        <content>
          <img id="main-image" src="https://66.media.tumblr.com/71449669428a85307a1485966fd4e100/339a1b67e9516e33-27/s400x600/c9473bb15cbd3854997cb1631e53566acb9a50a2.gifv" alt="Munkustrap looking excited" />
        </content>
        <aside>
          <p>Hello and welcome to the greatest page on the internet!</p>
          <p>This is a fanpage for the greatest movie ever, Cats 2019!</p>
          <p>I'm Munkustrap and I'm going to show you how to become a Jellicle Cat!</p>
          <button id="macavitoggle" class="uninvited">Invite Macavity to the Jellicle Ball!</button>
        </aside>
      </main>
      <footer>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/SoCnxpqyjWY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </footer>
    `
  }

  addMacavitoggle = () => {
    document.getElementById("macavitoggle").addEventListener("click", this.toggleMacavity)
  }

  toggleMacavity = () => {
    const mainImg = document.querySelector("#main-image")
    if (mainImg.dataset.name === "Macavity"){
      mainImg.src = "https://66.media.tumblr.com/71449669428a85307a1485966fd4e100/339a1b67e9516e33-27/s400x600/c9473bb15cbd3854997cb1631e53566acb9a50a2.gifv"
      mainImg.alt = "Munkustrap"
      mainImg.dataset.name = "Munkustrap"
    }
    else {
      mainImg.dataset.name = "Macavity"
      mainImg.alt = "Macavity!"
      mainImg.src = "./assets/macavity.gif"
    }
  }
}
