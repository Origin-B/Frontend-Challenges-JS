
const dessertList = document.getElementById('dessert-list');
const activeOrderList = document.getElementById('order-active-list');
const confirmOrderList = document.getElementById('order-confirm-list');
const confirmBtn = document.getElementById('confirm-btn');
const startBtn = document.getElementById('start-btn');
const bielSec = document.getElementById('biel-sec');
let totalQuantity = document.getElementById('tq');
let totalPrice = document.querySelectorAll('.total');
let dataArr = [];
let cart = {};

  function createDessertCard(dataArr) {
    dataArr.forEach((e,i)=> {
      let {desktop: d, mobile: m, tablet: tab} = e.image;
      let product = document.createElement('article');
      product.className = 'group w-full max-w-[320px] flex flex-col gap-4'
      product.setAttribute('index',i);
      product.innerHTML = 
        `
        <div class="w-full relative flex flex-col">
          <img src="${m}" alt="${e.name} image"
            class="group-[.chosen]:outline-3 group-[.chosen]:outline-b-Red rounded-md w-full md:hidden">
          <img src="${tab}" alt="${e.name} image"
            class="group-[.chosen]:outline-3 group-[.chosen]:outline-b-Red rounded-md w-full hidden md:block lg:hidden">
          <img src="${d}" alt="${e.name} image"
            class="group-[.chosen]:outline-3 group-[.chosen]:outline-b-Red rounded-md w-full hidden lg:block">
          <button type="button" aria-label="click to add to cart"
            class="active-btn group-[.active]:hidden p-4 absolute bottom-0 translate-y-1/2 flex gap-2 justify-center rounded-full bg-b-Rose-50 border border-b-Rose-500 self-center font-semibold text-b-Rose-900 transition cursor-pointer hover:text-b-Red hover:border-b-Red">
            <img src="./images/icon-add-to-cart.svg" alt="add to cart icon">
            Add to cart
          </button>
          <div
            class="hidden group-[.active]:flex gap-2 justify-between items-center p-4 absolute bottom-0 translate-y-1/2 rounded-full bg-b-Red self-center w-1/2">
    
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 2" aria-label="click to decrement quantity" class="decrement w-5 h-5 p-1 flex justify-center items-center fill-b-Rose-50 border border-b-Rose-50 rounded-full hover:fill-b-Red cursor-pointer transition hover:bg-b-Rose-50">
                <path d="M0 .375h10v1.25H0V.375Z"/>
              </svg>
    
            <span class="text-b-Rose-50 q-${i}">1</span>
    
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" aria-label="click to increment quantity" class="increment w-5 h-5 p-1 flex justify-center items-center fill-b-Rose-50 border border-b-Rose-50 rounded-full hover:fill-b-Red cursor-pointer transition hover:bg-b-Rose-50">
                <path d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/>
              </svg>
            
          </div>
        </div>
        <div class="flex flex-col gap-2 py-4">
          <span class="text-b-Rose-500">
            ${e.category}
          </span>
          <h3 class="text-b-Rose-900 font-semibold text-sm">${e.name}</h3>
          <span class="text-b-Red font-semibold">$${e.price.toFixed(2)}</span>
        </div>
      `
    dessertList.append(product)
  });
}

async function returnData() {
  try {
    const data = await fetch('./data.json');
    dataArr = await data.json();
  } catch (error) {
    console.error('No Data Found');
  }
  createDessertCard(dataArr)
}
returnData()

function update() {
  activeOrderList.innerHTML = "";
  confirmOrderList.innerHTML = "";
  let tP = 0;
  let tQ = 0;
  for (const i in cart) {
    if (Object.prototype.hasOwnProperty.call(cart, i)) {
      let e = cart[i];
      let itemTP = e.price * e.quantity;
      let productContent = document.createElement('li');
      productContent.className = 'py-4 flex justify-between items-center';
      productContent.setAttribute('index',i);
      productContent.innerHTML =
      `
      <article class="flex flex-col gap-2">
        <h3 class="font-semibold text-b-Rose-900">${e.name}</h3>
        <p class="flex gap-4 text-lg">
          <span class="text-b-Red font-medium">x${e.quantity}</span>
          <span class="text-b-Rose-400">$${e.price.toFixed(2)}</span>
          <span class="text-b-Rose-500 font-semibold">$${itemTP.toFixed(2)}</span>
        </p>
        </article>
        <svg xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 10 10" aria-label="click to cancel the dessert type" 
        class="remove-btn w-5 h-5 p-1 md:w-8 md:h-8 md:p-2 fill-b-Rose-300 border border-b-Rose-300 rounded-full cursor-pointer hover:fill-b-Rose-900 hover:border-b-Rose-900">
          <path d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/>
        </svg>
        `
        activeOrderList.append(productContent);
        let confirmContent = document.createElement('li');
        confirmContent.className = 'w-full py-4 flex justify-between items-center gap-4 min-w-0';
        confirmContent.innerHTML = 
        `
        <div class="flex gap-3 items-center min-w-0 flex-1">
          <img src="${e.thumbnail}" alt="${e.name} image" class="w-12 h-12 rounded-md shrink-0">
          <article class="flex flex-col justify-center min-w-0 flex-1 gap-1">
            <h3 class="font-semibold text-b-Rose-900 text-sm truncate" title="${e.name}">${e.name}</h3>
            <p class="flex gap-2 text-sm">
                <span class="text-b-Red font-bold">x${e.quantity}</span>
                <span class="text-b-Rose-400">@ $${e.price.toFixed(2)}</span>
            </p>
          </article>
        </div>
        <p class="text-sm text-b-Rose-900 font-bold shrink-0">
          $${itemTP.toFixed(2)}
        </p>
        `;
        confirmOrderList.append(confirmContent);
        tP += e.price * e.quantity;
        tQ += e.quantity;
    }
  }
  if (tQ > 0) {
    totalQuantity.textContent = tQ;
    totalPrice.forEach( e => e.textContent = `${tP.toFixed(2)}`);
    bielSec.classList.add('active');
  }else{
    totalQuantity.textContent = 0;
    bielSec.classList.remove('active');
  }
}


dessertList.addEventListener('click',(e) => {
  let ele = e.target.closest('article');
  if (!ele) return;
  let i = ele.getAttribute('index');
  if(e.target.classList.contains('active-btn')){
    ele.classList.add('active');
    bielSec.classList.add('active');
    cart[i] = {
    thumbnail: dataArr[i].image.thumbnail,
    name: dataArr[i].name,
    price: dataArr[i].price,
    quantity: 1,
    };
    update();
  }else if(e.target.classList.contains('increment')){
    cart[i].quantity++;
    e.target.previousElementSibling.textContent = cart[i].quantity;
    update();
  }else if(e.target.classList.contains('decrement')){
    cart[i].quantity--;
    if (cart[i].quantity > 0) {
      e.target.nextElementSibling.textContent = cart[i].quantity;
    } else {
      e.target.nextElementSibling.textContent = 1;
      ele.classList.remove('active');
      delete cart[i];
      update();
    }
    update();
  }
})

bielSec.addEventListener('click',(e)=>{
  if (e.target.classList.contains('remove-btn')) {
    let i = e.target.parentElement.getAttribute('index');
    delete cart[i];
    update();
    document.querySelector(`article[index="${i}"]`).classList.remove('active');
    document.querySelector(`.q-${i}`).textContent = 1
  }else if (e.target === confirmBtn){
    bielSec.classList.add('confirm');
    for (const i in cart) { document.querySelector(`article[index="${i}"]`).classList.add('chosen') }
    window.scrollTo(0, 0);
    dessertList.classList.add('confirm')
    document.body.classList.add('overflow-hidden');
  }else if(e.target === startBtn) {
    location.reload();
  }
})

