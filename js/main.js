// import {PRODUCTS} from "./products.js"

let displayProducts = [];


PRODUCTS.forEach(product => {
  if(product.type == "Chair") {
    displayProducts.push(product)
  }



});

console.log (displayProducts);