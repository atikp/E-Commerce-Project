let selectImage =document.querySelector(".imgWrap>img")
let previousBtn = document.querySelector(".previous")
let nextBtn = document.querySelector(".next")
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

// selectImage.src = MAIN[3];
let i=0;
const carousel =() =>{
  interval =
  setInterval(() => {
    if(i<MAIN.length){
      selectImage.src = MAIN[i];
    } else if(i>=MAIN.length){
      i=0;
    }
    
    i++
    // console.log(i)
  }, 3000);
}
carousel();

previousBtn.addEventListener("click",()=>{
  clearInterval(interval);
  if(i>0){
    i-=1
    selectImage.src =MAIN[i];
    carousel()
  } else if(i==0) {
    i=MAIN.length-1;
    selectImage.src =MAIN[i];
    carousel()
  }
  
})

nextBtn.addEventListener("click",()=>{
  clearInterval(interval);
  if(i<MAIN.length-1){
    i+=1
    selectImage.src =MAIN[i];
    carousel()

  } else if(i>=MAIN.length-1) {
    i=0;
    selectImage.src =MAIN[i];
    carousel()
 
  }
  
})

displayCart();
