console.log("hello from the adapter file")
const API = "http://localhost:3000"

const adapter = {
  getAllCats: function(){
    return fetch(`${API}/cats`)
    .then(res => res.json())
  },
  tipCat: function(id){
    return fetch(`${API}/cats/${id}`, {
      method: 'PATCH'
    })
    .then(res => res.json())
  },
  deleteCat: function(id){
    return fetch(`${API}/cats/${id}`, {
      method: "DELETE"
    })
    .then(res=> res.json())
  },
  addCat: function(target){
    const data = {
      name: target.name.value,
      description: target.description.value,
      actor: target.actor.value,
      image: target.image.value,
      team_name: target.teamName.value,
    }
    return fetch(`${API}/cats`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
  },
  editCat: function(target){
    const data = {
      name: target.name.value,
      description: target.description.value,
      actor: target.actor.value,
      image: target.image.value,
    }
    return fetch(`${API}/cats/${target.catId.value}`, {
      method: 'PATCH', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
  },
  getADog: function(){
    return fetch("https://dog.ceo/api/breeds/image/random")
    .then(resp => resp.json())
  }
}
