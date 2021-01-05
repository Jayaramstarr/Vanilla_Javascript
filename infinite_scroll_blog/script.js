const postsContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');


let limit = 4;
let page = 1;

const getPosts = async () => {
  
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);

  const data = await res.json();
  
  return data;
}

// Show posts in DOM
const showPosts = async () => {

  const posts = await getPosts();

  posts.forEach( post => {
    const postEl = document.createElement('div');
    postEl.classList.add('post');
    postEl.innerHTML = `
    <div class="number">${post.id}</div>
    <div class="post-info">
      <h2 class="post-title">${post.title}</h2>
      <p class="post-body">${post.body}</p>
    </div>
    `;
    postsContainer.appendChild(postEl);
  });
}


// Show loader
const showLoading = () => {

  loading.classList.add('show');
  setTimeout(() => {
    setTimeout(() => {
      ++page;
      showPosts();
    }, 300);
    loading.classList.remove('show');
  }, 1000);
}

// Filter posts by input
const filterPosts = (e) => {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll('.post');

  posts.forEach( post => {
    const title = post.querySelector('.post-title').innerText.toUpperCase();
    const body = post.querySelector('.post-body').innerText;

    if( title.indexOf(term) > -1 || body.indexOf(term) > -1 )
      post.style.display = 'flex';
    else
      post.style.display = 'none';
  });
}


// Show initial posts
showPosts();

// Event listeners
window.addEventListener('scroll', () => {

  const {scrollTop,scrollHeight,clientHeight} = document.documentElement;

  if( scrollTop+clientHeight >= scrollHeight -5 )
  {
    showLoading();
  }

});

filter.addEventListener('input', filterPosts);