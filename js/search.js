const searchBar = document.querySelector('.searchBar form');
const searchBarInput = document.querySelector('.searchBar form input');
let searchQuery = JSON.parse(sessionStorage.getItem('searchResult')) || [];
let queryResult =[]


const search = (searchFor, productsList) => {
  searchFor = searchFor.toLowerCase();
  
  productsList.forEach((product) => {
    const productsArray = Object.values(product);
    productsArray.forEach(arrItem =>{
      if(typeof arrItem == 'string'){
        arrItem = arrItem.toLowerCase();
      }
      if(arrItem){
        if(Array.isArray(arrItem)){
          if(arrItem.includes(searchFor)) {
            queryResult.push(product);
          }
         
        } else if(arrItem === searchFor) {
          queryResult.push(product);
        }
        
      }
      
    })
    
  })
  console.log(searchBarInput.value);
  const query = JSON.stringify(queryResult);
  console.log(query);
  sessionStorage.setItem('searchResult', [query]);
  if(!window.location.pathname.includes('shop.html')){
    window.location.replace('./shop.html');
  }
  // document.querySelector('.gridItems').innerHTML ='';
  // renderProducts(searchQuery);
  

}

searchBar.addEventListener("submit", (event)=>{
     sessionStorage.removeItem('searchResult');
  event.preventDefault();
  search(searchBarInput.value,PRODUCTS);
  document.querySelector('.gridItems').innerHTML ='';
  setTimeout(() => {
    document.querySelector('.gridItems').innerHTML ='';
    let searchQuery = JSON.parse(sessionStorage.getItem('searchResult'));
    renderProducts(searchQuery);
  }, 100);
  // renderProducts(searchQuery);

})
searchBar.addEventListener("keyup", (event)=>{
  if(event.keyCode === 8){
    queryResult = [];
    sessionStorage.removeItem('searchResult');
  }
  
})


if(searchQuery.length !==0 && window.location.pathname.includes('shop.html')) {
 
  setTimeout(() => {
    document.querySelector('.gridItems').innerHTML ='';
    renderProducts(searchQuery);
    sessionStorage.removeItem('searchResult');
  }, 200);

  // renderProducts(searchQuery);
  console.log(searchQuery);
  

}
