const fieldTohide = document.querySelectorAll(".fieldHeader");
const filterApplyBtn = document.querySelector(".applyFilters>button");
let priceRangeInput = [...document.querySelectorAll(".priceRangeSlider input")];
const inputLeft = document.getElementById("priceRange-min");
const inputRight = document.getElementById("priceRange-max");
const thumbLeft = document.querySelector(".slider >.thumb.left");
const thumbRight = document.querySelector(".slider >.thumb.right");
const range = document.querySelector(".slider> .range");

let thumbLeftValue;
let thumbRightValue;
let minprice;
let maxprice;

const navMain = document.getElementsByClassName("nav")[0]
const bars = document.getElementsByClassName('bars')[0]
const individualBars = document.getElementsByClassName('bar')
const close = document.getElementsByClassName("close");


const openNav = () => {
  for(let i=0; i<individualBars.length; i++){
    individualBars[i].classList.toggle("change");
  };
  navMain.classList.toggle("open");
  // console.log(individualBars[0].getAttribute("display"), bars.classList,"open")
}

bars.addEventListener("click", openNav);

fieldTohide.forEach((field) => {
  field.addEventListener("click", () => {
    const collapsible = field.querySelector(".collapsible");
    collapsible.classList.toggle("open");
    const inputs = [...document.querySelectorAll("fieldset input")];
    inputs.forEach((input) => {
      if (input.parentElement.parentElement.classList.value === field.id) {
        // console.log(input.parentElement.parentElement.classList);

        input.parentElement.classList.toggle("hidden");
        input.classList.toggle("hidden");
      }
    });
  });
});


// set filters


const setAllFilters = () => {
  const prices = [];
  const colors = [];
  const collections = [];
  const materials = [];

  PRODUCTS.forEach((product) => {
    prices.push(product.price);
    colors.push(...product.colors);
    collections.push(product.type);
    materials.push(...product.materials);
  });

  return {
    prices: [Math.min(...prices), Math.max(...prices)],
    colors: [...new Set(colors)],
    collections: [...new Set(collections)],
    materials: [...new Set(materials)],
  };
};

const setInitialFilters = () => {
  return {
    prices: [],
    colors: [],
    collections: [],
    materials: [],
  };
};

const allFilters = setAllFilters();
let selectedFilters = setInitialFilters();

const createAProductEl = (product) => {

  const listItemWrap = document.createElement('div');

    const listItem = document.createElement('li');
    listItem.innerHTML =`<a>
    <div class="shopImgWrap">
      <img
        src="${product.img}"
        alt="${product.type}_Image"
      />
    </div>
    <div class="productDetails">
      <div class="productName">
        <h3>${product.name}</h3>
        <p>${product.type}</p>
      </div>
      <div class="cartCta">
        <h3>$${product.price}</h3>
        <img
          src="./img/Add to Cart Button.png"
          alt="addToCart"
        />
      </div>
    </div>
  </a>
    
    `;
    listItemWrap.appendChild(listItem);
    return listItem;

  // @TODO: create actual el structure
};

const renderProducts = (products) => {
  products.forEach((product) => {
    const productEl = createAProductEl(product);
    const gridItems = document.querySelector('.gridItems');
    gridItems.appendChild(productEl);
    // @TODO: append productEl to DOM
  });
};

const setFilterHtml = () => {
  Object.keys(allFilters).forEach((filterType) => {
    const collectionField = document.querySelector(`.${filterType}`);

    if (filterType !== "prices") {
      allFilters[filterType].forEach((filter) => {
        const collectionListItem = document.createElement("label");
        collectionListItem.htmlFor = filter;
        collectionListItem.innerHTML = `<input type="checkbox" id=${filter} name=${filter} /> ${filter}`;
        collectionField.appendChild(collectionListItem);
      });
    }
  });
};

const setPriceRange = (filters) => {
  // prices
  const minInput = document.querySelector("#priceRange-min");
  const maxInput = document.querySelector("#priceRange-max");

  minInput.min = filters.prices[0];
  minInput.max = filters.prices[1];
  maxInput.min = filters.prices[0];
  maxInput.max = filters.prices[1];
};

const renderFilteredProducts = (filters) => {
  let filteredProducts = [];
  const combinedFilters = [
    ...selectedFilters.colors,
    ...selectedFilters.collections,
    ...selectedFilters.materials,
  ];

  PRODUCTS.forEach((product) => {
    const combinedAttributes = [
      ...product.colors,
      product.type,
      ...product.materials,
    ];
    // console.log(combinedAttributes)
    combinedFilters.forEach((filter) => {
      if (combinedAttributes.includes(filter) && product.price >= minPrice && product.price <= maxPrice) {
        filteredProducts.push(product);
      }
    });
  });
  // console.log(filteredProducts)

  
  if (filteredProducts.length != 0){
    const uniqueFilteredArray = Array.from(new Set(filteredProducts))
    document.querySelector('.gridItems').innerHTML ='';
    renderProducts(uniqueFilteredArray);
  } else{
    document.querySelector('.gridItems').innerHTML ='';
    renderProducts(PRODUCTS);
  }
    
  
  
};

filterApplyBtn.addEventListener("click", (event) => {
  event.preventDefault();
  selectedFilters = setInitialFilters();

  const selectedFilterInputs = document.querySelectorAll(
    "fieldset input:checked"
  );
  selectedFilterInputs.forEach((input) => {
    const filterCategory = input.parentNode.parentNode.classList.value;
    const checkedInputName = input.name;

    selectedFilters[filterCategory].push(checkedInputName);
  });

  renderFilteredProducts(selectedFilters);
  console.log(selectedFilters)


  goToItem();
});

                                                            //initialization

const init = () => {
  setFilterHtml();
  renderProducts(PRODUCTS);
  setPriceRange(allFilters);



  
};

init();


// range slider



const setLeftValue = () => {
  const _this = inputLeft;
  //TODO change _this to inputLeft / inputRight respectively
  min = parseInt(_this.min);
  max = parseInt(_this.max);

  _this.value = Math.min(parseInt(_this.value), parseInt(inputRight.value) - 1);
  let percent = ((_this.value - min) / (max - min)) * 100;

  thumbLeft.style.left = percent + "%";
  range.style.left = percent + "%";
  // console.log(_this.value);

  thumbLeftValue = document.querySelector(".thumbLeftValue");
  thumbLeftValue.innerHTML = "$" + _this.value;
  minPrice = _this.value;
};
setLeftValue();
const setRightValue = () => {
  const _this = inputRight;
  min = parseInt(_this.min);
  max = parseInt(_this.max);

  _this.value = Math.max(parseInt(_this.value), parseInt(inputLeft.value));
  let percent = ((_this.value - min) / (max - min)) * 100;

  thumbRight.style.right = 100 - percent + "%";
  range.style.right = 100 - percent + "%";
  // console.log(_this.value);

  thumbRightValue = document.querySelector(".thumbRightValue");
  thumbRightValue.innerHTML = "$" + _this.value;
  maxPrice = _this.value;
};
setRightValue();

inputLeft.addEventListener("input", setLeftValue);
inputRight.addEventListener("input", setRightValue);

const goToItem = () =>{
  const anchors = [...document.querySelectorAll('.gridItems li a')];
  if (anchors.length){console.log('anchors')}
  for (const anchor of anchors){
    anchor.addEventListener("click" , ()=>{
      const productName = anchor.querySelector('.productName h3').innerHTML;
      console.log(productName);
      for(let i=0;i<PRODUCTS.length;i++){
        if(PRODUCTS[i].name === productName){
          productClicked = JSON.stringify(PRODUCTS[i]);
          sessionStorage.setItem('clickedItem', productClicked);
        }
      }
      window.location.assign('./item.html');
    })
  }
    
}

goToItem();
// const anchors = [...document.querySelectorAll('.gridItems li a')];
// if (anchors.length){console.log('anchors')}
// for (const anchor of anchors){
//   anchor.addEventListener("click" , ()=>{
//     const productName = anchor.querySelector('.productName h3').innerHTML;
//     console.log(productName);
//     for(let i=0;i<PRODUCTS.length;i++){
//       if(PRODUCTS[i].name === productName){
//         productClicked = JSON.stringify(PRODUCTS[i]);
//         sessionStorage.setItem('clickedItem', productClicked);
//       }
//     }
//     window.location.assign('./item.html');
//   })
// }
  
 








// //apply filters to product list

// let filters = {
//   colors: ["grey"],
//   priceMin: null,
//   priceMax: null,
//   collection: null,
//   materials: null,
// };
// const clearFilters = () => {
//   selectedFilters = {
//     colors: null,
//     priceMin: parseInt(minPrice),
//     priceMax: parseInt(maxprice),
//     collection: null,
//     materials: null,
//   };
// };

// filterApplyBtn.addEventListener("click", (event) => {
//   event.preventDefault();
//   clearFilters();

//   const fieldSets = [...document.querySelectorAll("fieldset input:checked")];

//   fieldSets.forEach((fieldset) => {
//     const field = fieldset.parentElement.parentElement.classList.value;
//     if (field in filters) {
//       filters[field] = [];
//     }
//   });
//   fieldSets.forEach((fieldSet) => {
//     const parentFilter = fieldSet.parentElement.parentElement.classList.value;
//     switch (parentFilter) {
//       case "color":
//         // filters.colors =[];
//         filters.colors.push(fieldSet.name);
//         break;
//       case "materials":
//         // filters.materials =[]
//         filters.materials.push(fieldSet.name);
//         break;
//       case "collection":
//         // filters.collection =[]
//         filters.collection.push(fieldSet.name);
//         break;
//     }
//   });

//   const filterProducts = (filters) => {
//     const filteredProducts = PRODUCTS.filter((product) => {
//       let hasFilterColor = true;
//       if (filters.colors && filters.colors.length) {
//         hasFilterColor = false;
//         for (let i = 0; i < product.colors.length; i++) {
//           if (filters.colors.includes(product.colors[i])) {
//             hasFilterColor = true;
//             break;
//           }
//         }
//       }

//       let isInCollection = true;
//       if (filters.collection && product.type !== filters.collection) {
//         isInCollection = false;
//       }

//       const isInPriceRange =
//         product.price >= filters.priceMin && product.price <= filters.priceMax;

//       console.log(
//         "color:" + hasFilterColor,
//         "collection:" + isInCollection,
//         "price:" + isInPriceRange
//       );

//       return hasFilterColor && isInCollection && isInPriceRange;
//     });

//     return filteredProducts;
//   };
//   const filteredProducts = filterProducts(filters);
//   console.log(filters);
//   console.log(filteredProducts);
// });

// const filterProducts = (filters) =>{
//   const filteredProducts = PRODUCTS.filter((product) => {
//     let hasFilterColor =false;
//     for(let i=0;i<product.colors.length;i++){
//       if(filters.colors.includes(product.colors[i])){
//         hasFilterColor =true;
//         break;
//       }
//     }
//     return hasFilterColor;
//   })

//   return filteredProducts;
// }

// const filteredProducts = filterProducts(filters);
// console.log(filters)
// console.log(filteredProducts);
