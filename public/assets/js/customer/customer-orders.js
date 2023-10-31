let popupView = document.getElementById("popup-view");
let overlay = document.getElementById("overlay");
let popupReport = document.querySelector(".popup-report");
let popupNew = document.querySelector(".popup-new");
const viewOrderBtns = document.querySelectorAll('.view-order-btn');
 

// viewOrderBtns.forEach(btn => {
//     btn.addEventListener('click', () => {
//         const orderId = btn.dataset.id;
//         fetch(`/orders/${orderId}`)
//             .then(response => response.json())
//             .then(data => {
//                 // Populate the popup with the order details
//                 orderDetails.innerHTML = `Material: ${data.material}<br>Quantity: ${data.quantity}`;
//                 orderPopup.style.display = 'block';
//             });
//     });
// });

function openView(button) {
  
    // Get the data attribute value from the clicked button
    const orderData = button.getAttribute("data-order");
    
    console.log(orderData);
  
    if (orderData) {
      // Parse the JSON data
      const order = JSON.parse(orderData);
      
      // Populate the "update-form" fields with the order data
      document.querySelector('.update-form input[name="order_id"]').value = order.order_id;
      
      document.querySelector('.update-form input[name="material"]').value = "Wetlook";
      
      document.querySelector('.update-form input[name="total_price"]').value = order.total_price;
      
      document.querySelector('.update-form input[name="dispatch_date"]').value = order.dispatch_date;
       
      document.querySelector('.update-form input[name="delivery_expected_on"]').value = "2021-09-18";
      
      document.querySelector('.update-form input[name="order_status"]').value = order.order_status;
      document.querySelector('.update-form input[name="user_id"]').value =order.user_id;
  
      
      // Show the "update-form" popup
      // document.querySelector(".popup-view").classList.add("open-popup-view");
      popupView.classList.add("open-popup-view");
      overlay.classList.add("overlay-active");
      
  }
  
  }
function closeView(){
    popupView.classList.remove("open-popup-view");
    overlay.classList.remove("overlay-active");
}	

function openReport(){
    popupReport.classList.add("open-popup-report");
    overlay.classList.add("overlay-active");
}
function closeReport(){
    popupReport.classList.remove("open-popup-report");
    overlay.classList.remove("overlay-active");
}

function openNew(){
    popupNew.classList.add("open-popup-new");
    overlay.classList.add("overlay-active");
}
function closeNew(){
    popupNew.classList.remove("open-popup-new");
    overlay.classList.remove("overlay-active");
}