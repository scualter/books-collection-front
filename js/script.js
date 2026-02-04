const container = document.getElementById("container"),
      btnUsers = document.getElementById("getUsers"),
      btnBooks = document.getElementById("getBooks"),
      urlBooks = 'http://localhost:3100/books',
      urlUsers = 'http://localhost:3100/users';

      //peticion al servidor
const fetchData = async (url) => {
  try {
    const res = await fetch(url)
    if(!res.ok) throw new Error(`${res.status}`)
      return res.json();

  }catch(error) {
    console.error(error.message)
  }
}

//creamos elementos del dom
const createCard = (element) => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = element;
  container.appendChild(card);
}

//mostrar usuarios
const renderUsers = (users) => {
 container.innerHTML = ''; 

 users.forEach(({ apellidos, correo, coleccion, wishlist }) => {
  const arrColeccion = coleccion.map(libro => `<p class="coleccion">${libro}</p>`).join('');
  const arrWishlist = wishlist.map(whish => `<p class="coleccion">${whish}</p>`).join('');

  const template = `
    <h2>${apellidos}</h2>
    <p>Email: ${correo}</p>
    <p>Colección:</p>
    <p>${arrColeccion}</p>
    <p>whishlist:</p>
    <p>${arrWishlist}</p>
  `
  createCard(template);
 })
}

//mostramos libros
const renderBooks = (books) => {
  container.innerHTML = '';

  books.forEach(({ titulo, imagen, autor, fechaPublicacion }) => {
    const template = `
    <h2>${titulo}</h2>
    <img src="${imagen}" alt="${titulo}" />
    <p class="p">${autor}</p>
    <p class="p">${fechaPublicacion}</p>
    `
    createCard(template);
  }) 
}

//cargar funciones
const load = async (url) => {
  try {
    container.innerHTML = '';
    const data = await fetchData(url);
   
    if (url === urlBooks) {
      renderBooks(data)
    }

    if (url === urlUsers) {
      renderUsers(data)
    }

  }catch(error) {
    container.innerHTML = 'error no se pudieron cargar los datos'
  }
}

btnUsers.addEventListener('click', () => {
  load(urlUsers)
})

btnBooks.addEventListener('click', () => {
  load(urlBooks)
})
