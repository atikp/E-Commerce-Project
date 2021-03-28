const getProduct = JSON.parse(sessionStorage.getItem('clickedItem'));

console.log("item:",getProduct);

const productWrap = document.querySelector('.productWrap');
console.log(productWrap);
const BuildItem = () =>{
  const createItem = document.createElement('main');
  createItem.classList.add('itemPage');
  createItem.id = getProduct.name;
  createItem.innerHTML = `
  <div class="imageDisplay">
        <div class="mainImg">
          <img src="${getProduct.img}" alt="">
        </div>
        <div class="thumbnails">
          <ul class="thumbImages">
            <p><</p>
            <li><img src="./img/productImages/sofa.png" alt=""></li>
            <li><img src="./img/productImages/sofa.png" alt=""></li>
            <li><img src="./img/productImages/sofa.png" alt=""></li>
            <li><img src="./img/productImages/sofa.png" alt=""></li>
            <p>></p>
          </ul>
            
        </div>
      </div>
      <div class="itemOptions">
        <h2 class="itemName">${getProduct.name}</h2>
        <p class="itemSubtext">${getProduct.description}</p>
        <p class="itemPrice">$${getProduct.price}</p>
        <p class="dispatchTime">DISPATCHED IN 2-4 WEEKS ONLY <span>4 LEFT</span></p>
        <div class="colors">

          <ul class="colorList">
            <li class="color" id="${getProduct.colors[0]}"></li>
            <li class="color" id="${getProduct.colors[1]}"></li>
            <li class="color" id="${getProduct.colors[2]}"></li>
            <li class="color" id="${getProduct.colors[3]}"></li>
          </ul>

        </div>

        <div class="details">
          
          <form class="form">
            <button type="submit" name="addToCart" id="addToCart">ADD TO BASKET</button>
          </form>

          <div class="collapse">
            <h3>DETAILS</h3>
            <p class="collapsible open"></p>
          </div>
          <ul class="detailsList">
            <li>
              <p>Dimensions: W:${getProduct.dimensions.w} cm H:${getProduct.dimensions.h} cm D:${getProduct.dimensions.d} cm</p>
            </li>
            <li>
              <p>Seat dimensions: W:${getProduct.seat_dimensions.w} cm H:${getProduct.seat_dimensions.h} cm D:${getProduct.seat_dimensions.d} cm</p>
            </li>
            <li>
              <p>Weight: ${getProduct.weight} kg</p>
            </li>
            <li>
              <p>Materials: ${getProduct.materials}</p>
            </li>
            <li>
              <p>Filling materials: ${getProduct.filling_materials}</p>
            </li>
            <li>
              <p>Comfort level: ${getProduct.comfort_level}</p>
            </li>
          </ul>

          
        </div>
       
      </div>
  
  
  
  
  `
  productWrap.appendChild(createItem);
}

BuildItem();