//add variables for selecting html elements in dom
const id = (name) => document.querySelector(name);

let searchIcon = id('.search-icon');
let cartIcon = id('.cart-icon');
let loginIcon = id('.login-icon');
let searchContainer = id('.search-container');
let cartContainer = id('.cart-container');
let cartItemsContainer = id('.cart-items');
let itemsContainer = id('.items-container');
let cartIconNum = id('.cart-icon-num');
let cartTotalContainer = id('.cart-total');
let cartCheckOutBtn = id('.cart-checkout-btn');
let loginContainer = id('.login');
let loginForm = id('.login-form');

let cartTotal = 0;
let itemsList=[];
let cartItems=[];


//main method to fetch items and render items
const mainApp = () =>{
  fetch("http://localhost:3000/items")
  .then((res)=>res.json())
  .then((e)=>e.forEach((el)=>{
    itemsList.push(el);
    renderItems(el)
  }));
}

//method to render items 
const renderItems = (items) =>{
    const item = document.createElement('div');
    item.classList.add('item');
    item.dataset.id=items.id;
    item.innerHTML = `
    <img src='${items.image}'>
    <p>${items.name}</p>
    <div class='item-bottom'>
      <p>Rs.${items.price}</p>
      <button class='add-cart-btn'>Add to cart</button>
    </div>
    `;
    itemsContainer.appendChild(item);
}

//add event listener for items to add to the cart
itemsContainer.addEventListener('click', (e)=>{
  let positionClick = e.target;
  if(positionClick.classList.contains('add-cart-btn')){
    let itemId = positionClick.parentElement.parentElement.dataset.id;
    addToCart(itemId);
  }
})

//method to get values of items(id and quantity) added to cart
const addToCart = (item_id) =>{
  let checkItemInCart = cartItems.findIndex((val)=> val.itemId == item_id);
  if(cartItems.length <= 0){
    cartItems = [{
      itemId: item_id,
      quantity: 1
    }]
  }else if(checkItemInCart < 0){
    cartItems.push({
      itemId: item_id,
      quantity: 1
    })
  }else{
    cartItems[checkItemInCart].quantity++;
  }
  renderCartItems();
}
cartItemsContainer.innerHTML = `<div class="cart-empty">Your Cart is empty!</div>`

//method to display items added to cart
const renderCartItems = () =>{
  let cartItemTotal=0;
  let totalQuantity = 0;
  cartTotal=0;
  if(cartItems.length == 0){
    cartItemsContainer.innerHTML = `<div class="cart-empty">Your Cart is empty!</div>`
  }else if(cartItems.length > 0){
    cartItemsContainer.innerHTML = '';
    cartItems.forEach((item)=>{
      totalQuantity += item.quantity;      
      let cartItem = document.createElement('div')
      cartItem.classList.add('cart-item');
      cartItem.dataset.id=item.itemId;
      let checkItem = itemsList.findIndex((val)=> val.id == item.itemId);
      let info = itemsList[checkItem];
      cartItemTotal = parseInt(info.price)*parseInt(item.quantity);
      cartItem.innerHTML = `
      <img src=${info.image}>
      <span class="cart-item-name">${info.name}</span>
      <span class="cart-item-price">Rs.${cartItemTotal}</span>
      <span class="cart-item-quantity">
        <span class="minus">-</span>
        <span class="quantity">${item.quantity}</span>
        <span class="plus">+</span>
      </span>
      `
      cartTotal += cartItemTotal;
      cartItemsContainer.appendChild(cartItem);
    })
    cartTotalContainer.innerHTML=`Total cost Rs. ${cartTotal}`;
  }
  cartIconNum.innerHTML = totalQuantity;
}

//add event listener to plus or minus event clicked
cartItemsContainer.addEventListener('click', (event)=>{
  let positionClick = event.target;
  if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
    let cartItemId = positionClick.parentElement.parentElement.dataset.id;
    let type = 'minus';
    if(positionClick.classList.contains('plus')){
      type = 'plus';
    }
    changeQuantity(cartItemId, type);
  }
})

//method to change quantity for plus and minus
const changeQuantity = (cartItemId, type) =>{
  let positionItemCheck = cartItems.findIndex((val)=> val.itemId == cartItemId);
  if(positionItemCheck >= 0){
    if(type == 'plus'){
      cartItems[positionItemCheck].quantity+=1; 
    }else if(type == 'minus'){
      let quantityValue = cartItems[positionItemCheck].quantity-1;
      if(quantityValue > 0){
        cartItems[positionItemCheck].quantity = quantityValue;
      }else{
        cartItems.splice(positionItemCheck,1);
      }
    }
  }
  renderCartItems();
  cartTotalContainer.innerHTML=`Total cost Rs. ${cartTotal}`;
}

//method to display search bar
const searchBarDisplay = () => {
    if(searchIcon.name=='search-outline'){
        searchContainer.style.display='flex';
        searchIcon.name='close-outline';
        searchIcon.style.border='1px solid red';
    }else{
        searchContainer.style.display='none';
        searchIcon.name='search-outline';
        searchIcon.style.border='none';
    }
}
//method to display cart details
const cartDisplay = () => {
  if(cartIcon.name=='cart-outline'){
    cartContainer.style.display='block';
    cartIcon.name='close-outline';
    cartIcon.style.border='1px solid red';
  }else{
    closeCart();
  }
}
const closeCart = ()=>{
  cartContainer.style.display='none';
  cartIcon.name='cart-outline';
  cartIcon.style.border='none';
}
//method to display login page
const loginDisplay = ()=>{
  if(loginIcon.name=='person-outline'){
    loginContainer.style.display='flex';
    loginIcon.name='close-outline';
    loginIcon.style.border='1px solid red';
  }else{
    closeLogin();
  }
}
const closeLogin = () =>{
  loginContainer.style.display='none';
  loginIcon.name='person-outline';
  loginIcon.style.border='none';
}
loginForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  closeLogin();
})


// slideshow
let slideIndex = 1;
showSlides(slideIndex);
function plusSlides(n) {
  showSlides(slideIndex += n);
}
function currentSlide(n) {
  showSlides(slideIndex = n);
}
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

//method to remove cart items after checkout
let checkOut = () =>{
  if(cartTotal==0){
    alert('Please add items to cart!!')
  }else{
    alert(`Order Placed!

Total bill Rs.${cartTotal}`);
  }
  closeCart();
  cartItems=[];
  console.log(cartItems)
  renderCartItems();
  cartTotalContainer.innerHTML=`Total cost Rs. ${cartTotal}`;
}
cartCheckOutBtn.addEventListener('click',checkOut);



mainApp();