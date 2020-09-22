console.log("button: ", button)
console.log("main image: ", mainImg)
const button = document.querySelector("button")
const mainImg = document.querySelector("#main-image")

function macavitoggle() {
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

button.addEventListener("click", macavitoggle)
