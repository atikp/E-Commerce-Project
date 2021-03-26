const fieldTohide = document.querySelectorAll(".fieldHeader");
const filterApplyBtn = document.querySelector(".applyFilters>button");

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
//filters

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
  // @TODO: create actual el structure
};

const renderProducts = (products) => {
  products.forEach((product) => {
    const productEl = createAProductEl(product);
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

    combinedFilters.forEach((filter) => {
      if (combinedAttributes.includes(filter)) {
        filteredProducts.push(product);
      }
    });
  });
  console.log(filteredProducts)
  renderProducts(filteredProducts);
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
});

const init = () => {
  setFilterHtml();
  renderProducts(PRODUCTS);
  setPriceRange(allFilters);
};

init();

// PRODUCTS.forEach((product) => {
//   prices.push(product.price);
//   prices.sort();

//   if (!collection.includes(product.type)) {
//     collection.push(product.type);
//   }

//   product.materials.forEach((material) => {
//     if (!materials.includes(material)) {
//       materials.push(material);
//     }
//   });
//   product.colors.forEach((color) => {
//     if (!colors.includes(color)) {
//       colors.push(color);
//     }
//   });
// });

// range slider

// let priceRangeInput = [...document.querySelectorAll(".priceRangeSlider input")];
// priceRangeInput.forEach((input) => {
//   input.min = Math.min(...prices);
//   input.max = Math.max(...prices);
// });

// const inputLeft = document.getElementById("priceRange-min");
// const inputRight = document.getElementById("priceRange-max");
// const thumbLeft = document.querySelector(".slider >.thumb.left");
// const thumbRight = document.querySelector(".slider >.thumb.right");
// const range = document.querySelector(".slider> .range");
// let thumbLeftValue;
// let thumbRightValue;

// const setLeftValue = () => {
//   const _this = inputLeft;
//   min = parseInt(_this.min);
//   max = parseInt(_this.max);

//   _this.value = Math.min(parseInt(_this.value), parseInt(inputRight.value) - 1);
//   let percent = ((_this.value - min) / (max - min)) * 100;

//   thumbLeft.style.left = percent + "%";
//   range.style.left = percent + "%";
//   // console.log(_this.value);

//   thumbLeftValue = document.querySelector(".thumbLeftValue");
//   thumbLeftValue.innerHTML = "$" + _this.value;
//   minPrice = _this.value;
// };
// setLeftValue();
// const setRightValue = () => {
//   const _this = inputRight;
//   min = parseInt(_this.min);
//   max = parseInt(_this.max);

//   _this.value = Math.max(parseInt(_this.value), parseInt(inputLeft.value));
//   let percent = ((_this.value - min) / (max - min)) * 100;

//   thumbRight.style.right = 100 - percent + "%";
//   range.style.right = 100 - percent + "%";
//   // console.log(_this.value);

//   thumbRightValue = document.querySelector(".thumbRightValue");
//   thumbRightValue.innerHTML = "$" + _this.value;
//   maxprice = _this.value;
// };
// setRightValue();

// inputLeft.addEventListener("input", setLeftValue);
// inputRight.addEventListener("input", setRightValue);

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
