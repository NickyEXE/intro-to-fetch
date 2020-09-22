class Cats {
  constructor(){
    this.init()
  }

  init(){
    this.render()
    Cat.all = []
    adapter.getAllCats().then(this.renderCats)
  }

  renderCats(cats){
    cats.forEach(cat => {
      const newCat = new Cat(cat)
      document.getElementById("cats-list").appendChild(newCat.card)
    })
  }

  render(){
    root.innerHTML = `
    <header><h1>Add a New Cat!</h1></header>
    <form id="new-cat-form">
      <label for="name">Name:</label><br>
      <input type="text" name="name"><br>
      <label for="actor">Actor:</label><br>
      <input type="text" name="actor"><br>
      <label for="description">Description:</label><br>
      <textarea name="description"></textarea><br>
      <label for="image">Image:</label><br>
      <input type="text" name="image"><br>
      <label for="image">Team Name:</label><br>
      <input type="text" name="teamName"><br>
      <input type="submit" value="Add your Cat!">
      <br>
    </form>
    <form id="edit-cat-form">
      <label for="name">Name:</label><br>
      <input type="text" name="name"><br>
      <label for="actor">Actor:</label><br>
      <input type="text" name="actor"><br>
      <label for="description">Description:</label><br>
      <textarea name="description"></textarea><br>
      <label for="image">Image:</label><br>
      <input type="text" name="image"><br>
      <label for="image">Team Name:</label><br>
      <input type="text" name="teamName"><br>
      <input type="hidden" name="catId">
      <input type="submit" value="Edit Your Cat!">
      <br>
    </form>
    <div id="cats-list">
    </div>
    `
  }
}
