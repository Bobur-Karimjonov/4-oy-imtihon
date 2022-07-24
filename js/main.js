let elList = document.querySelector(".wrapper")
let elUsers = document.querySelector(".users")
let elPosts = document.querySelector(".posts")
let elComments = document.querySelector(".comments")
let elementUsersTemplate = document.querySelector(".users__template").content
let elPostsTemplate = document.querySelector(".posts__template").content;
const templateComments = document.querySelector( ".comments__template").content;
const lodirImg = document.querySelector(".wrapper__img");
let elementFrag = document.createDocumentFragment()

const Posts = [];

function renderTodo(arr,node){
  
  lodirImg.style.display = "none";
  arr.forEach(element =>{
    Posts.push(element.id)
    
    let newTemplate = elementUsersTemplate.cloneNode(true)
    newTemplate.querySelector(".users__subname").textContent = element.username
    newTemplate.querySelector(".users__name").textContent = element.name
    newTemplate.querySelector(".users__id").textContent = element.id
    newTemplate.querySelector(".users__street").textContent = element.address.street
    newTemplate.querySelector(".users__suite").textContent = element.address.suite
    newTemplate.querySelector(".users__city").textContent = element.address.city
    newTemplate.querySelector(".users__zipcode").textContent = element.address.zipcode
    newTemplate.querySelector(".users__company-name").textContent = element.company.name
    newTemplate.querySelector(".users__company-catchphrase").textContent = element.company.catchPhrase
    newTemplate.querySelector(".users__company-bs").textContent = element.company.bs
    newTemplate.querySelector(".users__phone").textContent = element.phone
    newTemplate.querySelector(".users__phone").href = `tel :${element.phone}`
    newTemplate.querySelector(".users__lat").textContent = "@geo"
    newTemplate.querySelector(".users__lat").href = `https://www.google.com/maps/place/${element.address.geo.lat},${element.address.geo.lng}`
    newTemplate.querySelector(".users__lng").textContent = "@website"
    newTemplate.querySelector(".users__lng").href = `https://${element.website}`
    newTemplate.querySelector(".users__email").textContent = element.email
    newTemplate.querySelector(".users__email").href = `mailto:${element.email}`
    newTemplate.querySelector(".users__item").dataset.id = element.id;
    
    elementFrag.appendChild(newTemplate)
  })
  
  node.appendChild(elementFrag)
}

const renderPosts = function(arr, node){
  node.innerHTML = "";
  
  const fragPosts = document.createDocumentFragment();
  lodirImg.style.display = "none"
  arr.forEach((elemen) => {
    Posts.push(elemen.id);
    // console.log(elemen);
    const templatePosts = elPostsTemplate.cloneNode(true);
    templatePosts.querySelector(".posts__title").textContent = elemen.title;
    templatePosts.querySelector(".posts__text").textContent = elemen.body;
    templatePosts.querySelector(".posts__item").dataset.id = elemen.id;
    
    fragPosts.appendChild(templatePosts);
  });
  
  node.appendChild(fragPosts);
  
};

const renderComments = (arr, element) => {
  element.innerHTML = "";
  const fragComments = document.createDocumentFragment();
  if (arr.length > 0) {
    lodirImg.style.display = "none";
    
    arr.forEach((e) => {
      const newTemplateComments = templateComments.cloneNode(true);
      newTemplateComments.querySelector(".comments__title").textContent = e.name;
      newTemplateComments.querySelector(".comments__link").textContent = e.email;
      newTemplateComments.querySelector(".comments__text").textContent = e.body;
      newTemplateComments.querySelector(".comments__link").href = `mailto:${e.email}`;
      
      fragComments.appendChild(newTemplateComments);
    });
  }
  element.appendChild(fragComments);
};
// one list async start
async function getUsers(){
  const res = await fetch(`https://jsonplaceholder.typicode.com/users`)
  const data = await res.json()
  renderTodo(data,elUsers)
}
getUsers()
// one list async end

// two list async start
async function getPosts(usersId){
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${usersId}`)
  const data = await res.json();
  // console.log(data);
  renderPosts(data, elPosts);
}
// two list async end

async function getComments(postId){
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}
    `);
    const data = await res.json();
    renderComments(data, elComments);
  };
  
  elUsers.addEventListener("click", (evt) => {
    elComments.innerHTML = ""
    if (evt.target.matches(".users__item")) {
      lodirImg.style.display = "block"
      const postsListItemId = evt.target.dataset.id - 0;
      Posts.forEach((postId) => {
        if (postsListItemId === postId) {
          getPosts(postId);
        }
      });
    }
  });
  
  
  elPosts.addEventListener("click", (evt) => {
    if (evt.target.matches(".posts__item")) {
      lodirImg.style.display = "flex";
      const postsListItemId = evt.target.dataset.id - 0;
      console.log(postsListItemId);
      Posts.forEach((postId) => {
        if (postsListItemId === postId) {
          getComments(postId);
        }
      });
    }
  });