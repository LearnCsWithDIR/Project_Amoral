let popupView = document.getElementById("popup-view");
let overlay = document.getElementById("overlay");
let popupReport = document.querySelector(".popup-report");

var order;

function openView(button) {
  // Get the data attribute value from the clicked button
  const orderData = button.getAttribute("data-order");

  if (orderData) {
    // Parse the JSON data
    order = JSON.parse(orderData);
    //  console.log(order.mult_order);

    // Populate the "update-form" fields with the order data
    document.querySelector('.update-form input[name="order_id"]').value =
      order.order_id;

    document.querySelector(
      '.update-form input[name="cut_dispatch_date"]'
    ).value = order.cut_dispatch_date;

    document.querySelector(
      '.update-form input[name="sew_dispatch_date"]'
    ).value = order.sew_dispatch_date;

    popupView.classList.add("open-popup-view");
    overlay.classList.add("overlay-active");

    document.querySelector(".g-poup-btn").classList.remove("hide");

    // remove button when order is compleated
    if (order.status == "completed") {
      document.querySelector(".g-poup-btn").classList.add("hide");
    }

    color_order_status(order.status);

    // wrapper currently include all card div removing
    var cards_wrapper = document.getElementById("cards-wrapper");
    cards_wrapper.innerHTML = "";

    for (let index = 0; index < order.mult_order.length; index++) {
      addMaterialCardView(order.mult_order[index]);
    }
  }
}

function closeView() {
  popupView.classList.remove("open-popup-view");
  overlay.classList.remove("overlay-active");
}

var report_submit = document.getElementById("report-submit");
var popup = document.getElementById("gar-popup-report");
var report_overlay = document.getElementById("report-overlay");

function open_report() {
  if (report_overlay && popup) {
    popup.style.display = "block";
    report_overlay.style.display = "block";

    popup.classList.add("show");
  }
}

function hide_report() {
  if (report_overlay && popup) {
    // Remove show class to trigger the zoom-out animation
    popup.classList.remove("show");

    popup.style.opacity = "0";
    report_overlay.style.opacity = "0";

    setTimeout(function () {
      report_overlay.style.display = "none";
      report_overlay.style.opacity = "1";
      popup.style.display = "none";
      popup.style.opacity = "1";
    }, 1000);
  }
}

// check user report input data is valid or not
report_submit.addEventListener("click", function () {
  event.preventDefault();

  report_submit.disabled = true;

  var title = document.querySelector(".title");
  var description = document.getElementById("problem");
  var email = document.getElementById("email");

  var e_description = document.querySelector(".e-description");
  var e_title = document.querySelector(".e-title");

  var not_valid = false;

  // can't use < element
  const regex = /(?<!\b(?:let|var|const|\(|\w+\.)\s*)</g;

  if (title.value.trim() === "") {
    e_title.innerText = "Title is required.";
    not_valid = true;
  } else if (title.value.match(regex)) {
    e_title.innerText = "Invalid characters used. Try again";
    not_valid = true;
  } else {
    e_title.innerText = "";
    not_valid = false;
  }
  if (description.value.trim() === "") {
    e_description.innerText = "Problem is required.";
    not_valid = true;
  } else if (description.value.match(regex)) {
    e_description.innerText = "Invalid characters used. Try again";
    not_valid = true;
  } else {
    e_description.innerText = "";
    not_valid = false;
  }

  if (not_valid) {
    report_submit.disabled = false;

    return;
  }

  // not_valid is success with pass to the backend
  report_send(email.value, title.value, description.value);
});

function report_send(email, title, description) {
  var id = document.getElementById("id");

  data = {
    email: email,
    title: title,
    description: description,
    garment_id: id.value,
  };

  $.ajax({
    type: "POST",
    url: endpoint,
    data: data,
    cache: false,
    success: function (res) {
      try {
        // convet to the json type
        Jsondata = JSON.parse(res);

        if (Jsondata) {
          toastApply("Send Success", "Your problem reported...", 0);

          if (report_overlay && popup) {
            // Remove show class to trigger the zoom-out animation
            popup.classList.remove("show");

            popup.style.opacity = "0";
            report_overlay.style.opacity = "0";

            setTimeout(function () {
              report_overlay.style.display = "none";
              report_overlay.style.opacity = "1";
              popup.style.display = "none";
              popup.style.opacity = "1";
            }, 1000);
          }

          setTimeout(() => {
            location.reload();
          }, 4000);

          return;
        } else {
          toastApply("Send Failed", "Try again later...", 1);
          report_submit.disabled = false;

          // setTimeout(() => {
          //     location.reload();
          // }, 4000);

          return;
        }
      } catch (error) {}
    },
    error: function (xhr, status, error) {
      // return xhr;
    },
  });
}

var status_one = document.querySelector(".one");
var status_two = document.querySelector(".two");
var status_three = document.querySelector(".three");

var status_middle = document.querySelector(".middle");

var status_four = document.querySelector(".four");
var status_five = document.querySelector(".five");
var status_six = document.querySelector(".six");
var popup_status_btn = document.getElementById("popup-status-btn");

function color_order_status(status) {
  // console.log(status);

  status_one.classList.remove("active");
  status_two.classList.remove("active");
  status_three.classList.remove("active");

  status_middle.classList.remove("active");

  status_four.classList.remove("active");
  status_five.classList.remove("active");
  status_six.classList.remove("active");
  status_one.classList.remove("change-status");
  status_two.classList.remove("change-status");
  status_three.classList.remove("change-status");
  status_four.classList.remove("change-status");
  status_five.classList.remove("change-status");
  status_six.classList.remove("change-status");

  switch (status) {
    case "pending":
      status_one.classList.add("active");
      break;

    case "cutting":
      status_one.classList.add("active");
      status_two.classList.add("active");
      break;

    case "cut":
      status_one.classList.add("active");
      status_two.classList.add("active");
      status_three.classList.add("active");
      break;

    // middle process
    case "company-process":
      status_one.classList.add("active");
      status_two.classList.add("active");
      status_three.classList.add("active");
      status_middle.classList.add("active");
      // document.querySelector('.middle-text').innerHTML = "Company process end";
      break;
    case "company-process-end":
      status_one.classList.add("active");
      status_two.classList.add("active");
      status_three.classList.add("active");
      status_middle.classList.add("active");
      // document.querySelector('.middle-text').innerHTML = "Company process end";
      break;

    case "sewing":
      status_one.classList.add("active");
      status_two.classList.add("active");
      status_three.classList.add("active");
      status_four.classList.add("active");
      status_middle.classList.add("active");
      document.querySelector('.middle-text').innerHTML = "Company process end";

      break;
    case "sewed":
      status_one.classList.add("active");
      status_two.classList.add("active");
      status_three.classList.add("active");
      status_four.classList.add("active");
      status_five.classList.add("active");
      status_middle.classList.add("active");
      document.querySelector('.middle-text').innerHTML = "Company process end";

      break;
    case "completed":
      status_one.classList.add("active");
      status_two.classList.add("active");
      status_three.classList.add("active");
      status_four.classList.add("active");
      status_five.classList.add("active");
      status_six.classList.add("active");
      status_middle.classList.add("active");
      document.querySelector('.middle-text').innerHTML = "Company process end";

      break;
    default:
      break;
  }
}

var order_status = "";

document.getElementById("pending").addEventListener("click", function () {
  order_status = "pending";

  if (
    !status_one.classList.contains("change-status") &&
    popup_status_btn.innerHTML == "Update Status"
  ) {
    change_color_order_status(order_status);
    popup_status_btn.disabled = false;
  } else if (popup_status_btn.innerHTML == "Update Status") {
    popup_status_btn.disabled = true;
    remove_color_order_status(order_status);
    order_status = "";
  }
});

document.getElementById("cutting").addEventListener("click", function () {
  order_status = "cutting";

  if (
    !status_two.classList.contains("change-status") &&
    popup_status_btn.innerHTML == "Update Status"
  ) {
    change_color_order_status(order_status);
    popup_status_btn.disabled = false;
  } else if (popup_status_btn.innerHTML == "Update Status") {
    popup_status_btn.disabled = true;
    remove_color_order_status(order_status);
    order_status = "";
  }
});

document.getElementById("cut").addEventListener("click", function () {
  order_status = "cut";

  if (
    !status_three.classList.contains("change-status") &&
    popup_status_btn.innerHTML == "Update Status"
  ) {
    change_color_order_status(order_status);
    popup_status_btn.disabled = false;
  } else if (popup_status_btn.innerHTML == "Update Status") {
    popup_status_btn.disabled = true;
    remove_color_order_status(order_status);
    order_status = "";
  }
});

document.getElementById("sewing").addEventListener("click", function () {
  order_status = "sewing";

  if (
    !status_four.classList.contains("change-status") &&
    popup_status_btn.innerHTML == "Update Status" && 
    (order.status == "company-process-end" )
  ) {
    change_color_order_status(order_status);
    popup_status_btn.disabled = false;
  } else if (popup_status_btn.innerHTML == "Update Status") {
    popup_status_btn.disabled = true;
    remove_color_order_status(order_status);
    order_status = "";
  }
});

document.getElementById("sewed").addEventListener("click", function () {
  order_status = "sewed";

  if (
    !status_five.classList.contains("change-status") &&
    popup_status_btn.innerHTML == "Update Status" &&
   ( order.status == "company-process-end" || order.status == "sewing")
  ) {
    change_color_order_status(order_status);

    popup_status_btn.disabled = false;
  } else if (popup_status_btn.innerHTML == "Update Status") {
    popup_status_btn.disabled = true;
    remove_color_order_status(order_status);
    order_status = "";
  }
});

document.getElementById("completed").addEventListener("click", function () {
  order_status = "completed";

  if (
    !status_six.classList.contains("change-status") &&
    popup_status_btn.innerHTML == "Update Status" &&
    ( order.status == "company-process-end" || order.status == "sewing" || order.status == "sewed" )
  ) {
    change_color_order_status(order_status);
    popup_status_btn.disabled = false;
  } else if (popup_status_btn.innerHTML == "Update Status") {
    popup_status_btn.disabled = true;
    remove_color_order_status(order_status);
    order_status = "";
  }
});

function change_order_status(button = "", tap = "popup") {
  // console.log(order);

  if (tap == "table btn") {
    order_status = "";

    // Get the data attribute value from the clicked button
    const orderData = button.getAttribute("data-order");

    if (orderData) {
      // Parse the JSON data
      order = JSON.parse(orderData);

      switch (order.status) {
        case "pending":
          order_status = "cutting";
          break;
        case "cutting":
          order_status = "cut";
          break;
        // case "cut":
        //   order_status = "sewing";
        //   break;
        case "company-process-end":
          order_status = "sewing";
          break;
        case "sewing":
          order_status = "sewed";
          break;
        case "sewed":
          order_status = "success";
          break;
        default:
          break;
      }
    }
  }

  popup_status_btn.innerHTML =
    "<i class='bx bx-loader-circle bx-spin bx-flip-horizontal bx-sm'></i>";

  document.getElementById("table-status-btn").innerHTML =
    "<i class='bx bx-loader-circle bx-spin bx-flip-horizontal bx-xs'></i>";
  document.getElementById("table-status-btn").disabled = true;

  popup_status_btn.disabled = true;
  document.getElementById("popup-status-cancel-btn").disabled = true;

  data = {
    garment_order_id: order.garment_order_id,
    status: order_status,
    garment_id: order.garment_id,
    order_id: order.order_id,
  };

  $.ajax({
    type: "POST",
    url: change_status_endpoint,
    data: data,
    cache: false,
    success: function (res) {
      try {
        // convet to the json type
        Jsondata = JSON.parse(res);

        if (Jsondata.user) {
          toastApply(
            "Update Success",
            `${order.order_id} Order Status Updated...`,
            0
          );

          setTimeout(() => {
            document.getElementById("table-status-btn").innerHTML =
              "Update Status";
            location.reload();
          }, 4000);
          popup_status_btn.innerHTML = "Update Status";

          return;
        } else {
          popup_status_btn.innerHTML = "Update Status";
          document.getElementById("table-status-btn").innerHTML =
            "Update Status";

          toastApply("Update Failed", "Try again later...", 1);
          return;
        }
      } catch (error) {
        popup_status_btn.innerHTML = "Update Status";
        document.getElementById("table-status-btn").innerHTML = "Update Status";

        toastApply("Update Failed", "Try again later...", 1);
        return;
      }
    },
    error: function (xhr, status, error) {
      popup_status_btn.innerHTML = "Update Status";
      document.getElementById("table-status-btn").innerHTML = "Update Status";

      toastApply("Update Failed", "Try again later...", 1);
      return;
    },
  });
}

function addMaterialCardView(order) {
  // console.log(order);

  var cards_wrapper = document.getElementById("cards-wrapper");

  var newCard = document.createElement("div");
  newCard.className = "all-cards";

  newCard.innerHTML = `
  <div class="user-details material">

  <div class="input-box">

      <span class="details">Material </span>
      <input class="g-type" name="material" type="text" readonly value="${order.material_type}" />

      <span class="details">Sleeves </span>
      <input class="g-type" name="sleeves" type="text" readonly value="${order.type}" />

      <span class="details">Printing Type </span>
      <input class="" name="printing-type" type="text" readonly value="${order.printing_type}" />
  </div>
  <div>

      <div class="s-q">

          <div class="sizes">

              <span class="details">Sizes</span>
              <input class="size" type="text" readonly value="X-Small" />
          </div>
          <div class="sizes">

              <span class="details">Quantity</span>
              <input class="size" type="text" readonly value="${order.xs}" />

          </div>
      </div>
      <div class="s-q">
          <input class="size" type="text" readonly value="Small" />
          <input class="size" type="text" readonly  value="${order.small}"/>
      </div>
      <div class="s-q">
          <input class="size" type="text" readonly value="Medium" />
          <input class="size" type="text" readonly value="${order.medium}"/>
      </div>

      <div class="s-q">
          <input class="size" type="text" readonly value="Large" />
          <input class="size" type="text" readonly value="${order.large}"/>
      </div>
      <div class="s-q">
          <input class="size" type="text" readonly value="X-Large" />
          <input class="size" type="text" readonly value="${order.xl}"/>
      </div>
      <div class="s-q">
          <input class="size" type="text" readonly value="XX-Large" />
          <input class="size" type="text" readonly value="${order.xxl}"/>
      </div>
      <div class="s-q">
          <input class="size qty-total" type="text" readonly value="Total : " />
          <input class="size qty-total" type="text" readonly value="${order.qty}"/>
      </div>
  </div>
  <div></div>
  
</div>
<hr class="dotted">
    `;

  newCard.style.transition = "all 0.5s ease-in-out";

  cards_wrapper.appendChild(newCard);
  //countv++;
}

function change_color_order_status(status) {
  // console.log(status);

  status_one.classList.remove("change-status");
  status_two.classList.remove("change-status");
  status_three.classList.remove("change-status");
  status_four.classList.remove("change-status");
  status_five.classList.remove("change-status");
  status_six.classList.remove("change-status");

  switch (status) {
    case "pending":
      status_one.classList.add("change-status");
      break;
    case "cutting":
      status_one.classList.add("change-status");
      status_two.classList.add("change-status");
      break;
    case "cut":
      status_one.classList.add("change-status");
      status_two.classList.add("change-status");
      status_three.classList.add("change-status");
      break;
    case "sewing":
      status_one.classList.add("change-status");
      status_two.classList.add("change-status");
      status_three.classList.add("change-status");
      status_four.classList.add("change-status");
      break;
    case "sewed":
      status_one.classList.add("change-status");
      status_two.classList.add("change-status");
      status_three.classList.add("change-status");
      status_four.classList.add("change-status");
      status_five.classList.add("change-status");
      break;
    case "completed":
      status_one.classList.add("change-status");
      status_two.classList.add("change-status");
      status_three.classList.add("change-status");
      status_four.classList.add("change-status");
      status_five.classList.add("change-status");
      status_six.classList.add("change-status");
      break;
    default:
      break;
  }
}
function remove_color_order_status(status) {
  switch (status) {
    case "pending":
      status_two.classList.remove("change-status");
      status_three.classList.remove("change-status");
      status_four.classList.remove("change-status");
      status_five.classList.remove("change-status");
      status_six.classList.remove("change-status");
      break;
    case "cutting":
      status_two.classList.remove("change-status");
      status_three.classList.remove("change-status");
      status_four.classList.remove("change-status");
      status_five.classList.remove("change-status");
      status_six.classList.remove("change-status");
      break;
    case "cut":
      status_three.classList.remove("change-status");
      status_four.classList.remove("change-status");
      status_five.classList.remove("change-status");
      status_six.classList.remove("change-status");
      break;
    case "sewing":
      status_four.classList.remove("change-status");
      status_five.classList.remove("change-status");
      status_six.classList.remove("change-status");
      break;
    case "sewed":
      status_five.classList.remove("change-status");
      status_six.classList.remove("change-status");
      break;
    case "completed":
      status_six.classList.remove("change-status");
      break;
    default:
      break;
  }
}
