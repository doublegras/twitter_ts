let menuContainer;

window.addEventListener('click', () => {
  menuContainer.innerHTML = '';
})

window.addEventListener('DOMContentLoaded', () => {
  menuContainer = document.querySelector('#search-menu-container');
  menuContainer.addEventListener('click', (e) => {
    e.stopPropagation() //empeche l'évenement de se propager et donc que le clique soit écouté par window
  })

  let searchInput = document.querySelector('#search-input');
  let ref;
  searchInput.addEventListener('input', (e) => {
    //Lorsqu'il n'y a pas d'événement input depuis 2000 ms alors le dernier setTimeout() déclenchera la requête
    const value = e.target.value;

    if (ref) {
      clearTimeout(ref);
    }

    ref = setTimeout(() => {
      axios.get('/user?search=' + value)
           .then((response) => {
             menuContainer.innerHTML = response.data;
           }).catch( e => console.log(e));
    }, 2000)
  })
})