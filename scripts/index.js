const root = document.getElementById("root")
new Home()
document.getElementById("menu-bar").addEventListener("click", router)

function router(e){
  switch(e.target.id){
    case "Home":
      new Home()
      break;
    case "Cosplay":
      new Cosplay()
      break;
  }
}
