const API = "http://localhost:3000"

const catAdapter = {
  getCats: () => {
    return fetch(`${API}/cats`)
    .then(res => res.json())
  },
  tipCat: (id) => {
    return fetch(`${API}/cats/${id}`, {
      method: 'PATCH'
    })
    .then(res => res.json())
  },
  deleteCat: (id) => {
    return fetch(`${API}/cats/${id}`, {
      method: "DELETE"
    })
    .then(res=> res.json())
  },
  newCat: (target) => {
    data = {
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
  updateCat: (target) => {
    const data = {
      name: target.name.value,
      description: target.description.value,
      actor: target.actor.value,
      image: target.image.value,
      team_name: target.teamName.value,
    }
    const id = target.dataset.id
    fetch(`${API}/cats/${id}`, {
      method: 'PATCH', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
  }
}
