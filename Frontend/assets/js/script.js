/* ordering system start */
document.addEventListener("DOMContentLoaded", function () {
    const startorderbutton = document.getElementById("startorderbutton");
    const startorderwrapper = document.querySelector(".startorder-wrapper");
    const ordernumber = document.querySelector(".orderqueuenumber");
    const ordermode = document.querySelector(".ordermodeholder");
    const orderprompt = document.querySelector(".orderpromptholder");
    const ordertime = document.getElementById("ordertime");
    const orderlistcategories = document.querySelector(".orderlistcategories");
    const ordersysfooter = document.querySelector(".ordersysfooter-wrapper");
  
    startorderbutton.addEventListener("click", function () {
      const currentDate = getCurrentDate();
      ordertime.textContent = "Order drafted: " + currentDate;
  
      let num1 = parseInt(localStorage.getItem("orderNumber")) || 1;
      ordernumber.textContent = "Order #" + num1;
      localStorage.setItem("orderNumber", num1);
  
      startorderbutton.style.display = "none";
      startorderwrapper.style.display = "none";
      ordermode.style.display = "flex";
      orderprompt.style.display = "flex";
      orderlistcategories.style.display = "flex";
      ordersysfooter.style.display = "flex";
      document.querySelector(".item").style.display = "none";
    });
  });
  
  /* order mode selection */
  document.addEventListener("DOMContentLoaded", function () {
    const dineIn = document.getElementById("dine-in");
    const takeOut = document.getElementById("take-out");
    const delivery = document.getElementById("delivery");
  
    function setActive(button) {
      dineIn.classList.remove("active");
      takeOut.classList.remove("active");
      delivery.classList.remove("active");
  
      button.classList.add("active");
    }
  
    dineIn.addEventListener("click", function () {
      setActive(dineIn);
    });
  
    takeOut.addEventListener("click", function () {
      setActive(takeOut);
    });
  
    delivery.addEventListener("click", function () {
      setActive(delivery);
    });
  });
  
  /* item addition */
  const itemPrompter = document.getElementById("itemprompter");
  const itemQtyPrompter = document.getElementById("itemqtyprompter");
  const ordersList = document.querySelector(".orderslist");
  const errorEmpty = document.querySelector(".errorempty");
  const errorInvalidItemNumber = document.querySelector(
    ".errorinvaliditemnumber"
  );
  const errorInvalidItemQty = document.querySelector(".errorinvaliditemqty");
  
  // Item data
  const menu = {
    1: {
      name: "Classic Cheeseburger",
      img: "https://i.ibb.co/hVJg6xQ/burger-cheeseburger.png",
      price: 5
    },
    2: {
      name: "Mushroom Swiss Burger",
      img: "https://i.ibb.co/h9Sz6X5/burger-mushroom.png",
      price: 6
    },
    3: {
      name: "BBQ-Bacon Cheeseburger",
      img: "https://i.ibb.co/cT6hYv9/burger-bbq-bacon.png",
      price: 7.5
    },
    4: {
      name: "Jalapeno Blaze Burger",
      img: "https://i.ibb.co/Kw8sXMR/burger-jalapeno.png",
      price: 7
    },
    5: {
      name: "Angus Supreme Burger",
      img: "https://i.ibb.co/FV7LFL3/burger-angus.png",
      price: 9
    },
    6: {
      name: "Teriyaki Bliss Burger",
      img: "https://i.ibb.co/rvRghBm/burger-teriyaki.png",
      price: 7.5
    },
    7: {
      name: "Classic Fries",
      img: "https://i.ibb.co/dW5ST21/classic-fries-Photo-Room-png-Photo-Room.png",
      price: 2.5
    },
    8: {
      name: "Curly Fries",
      img: "https://i.ibb.co/v1W9yLZ/curly-fries-Photo-Room-png-Photo-Room.png",
      price: 3.55
    },
    9: {
      name: "Poutine Fries",
      img:
        "https://i.ibb.co/Ch3nn5P/loaded-or-poutine-fries-removebg-preview.png",
      price: 4.5
    },
    10: {
      name: "Sweet Potato Fries",
      img:
        "https://i.ibb.co/PW0jQCH/sweet-potato-fries-Photo-Room-png-Photo-Room.pnghttps://i.ibb.co/PW0jQCH/sweet-potato-fries-Photo-Room-png-Photo-Room.png",
      price: 4
    },
    11: {
      name: "Coca-Cola",
      img: "https://i.ibb.co/NNKvFqW/cocacola.png",
      price: 3
    },
    12: {
      name: "Sprite",
      img: "https://i.ibb.co/WWjkS5p/sprite.png",
      price: 3
    },
    13: {
      name: "Royal",
      img: "https://i.ibb.co/QFVQ8q7/royal.png",
      price: 1.5
    },
    14: {
      name: "Iced Tea",
      img: "https://i.ibb.co/4VRd3WH/iced-tea.png",
      price: 2.5
    },
    15: {
      name: "Lemon Juice",
      img: "https://i.ibb.co/N2SwZsy/lemonjuice.png",
      price: 2
    },
    16: {
      name: "Fruit Smoothie",
      img: "https://i.ibb.co/k8bnG6N/fruitsmoothie.png",
      price: 7
    }
  };
  
  // Add item and errors
  function resetPrompterStyles() {
    itemPrompter.classList.remove("error");
    itemQtyPrompter.classList.remove("error");
    errorEmpty.style.display = "none";
    errorInvalidItemNumber.style.display = "none";
    errorInvalidItemQty.style.display = "none";
  }
  
  function handleEmptyInput() {
    resetPrompterStyles(); // reset styles before checking
    if (itemPrompter.value.trim() === "" && itemQtyPrompter.value.trim() === "") {
      itemPrompter.classList.add("error");
      itemQtyPrompter.classList.add("error");
      errorEmpty.style.display = "flex";
      return true;
    }
  
    if (itemPrompter.value.trim() === "") {
      itemPrompter.classList.add("error");
      errorEmpty.style.display = "flex";
      return true;
    }
  
    if (itemQtyPrompter.value.trim() === "") {
      itemQtyPrompter.classList.add("error");
      errorEmpty.style.display = "flex";
      return true;
    }
  
    return false;
  }
  
  function handleInvalidInput() {
    const itemNum = parseInt(itemPrompter.value);
    const qty = parseInt(itemQtyPrompter.value);
  
    resetPrompterStyles(); // reset styles before checking
    if (qty <= 0 || qty > 20) {
      itemQtyPrompter.classList.add("error");
      errorInvalidItemQty.style.display = "flex";
      return true;
    }
  
    if (itemNum <= 0 || itemNum > 16) {
      itemPrompter.classList.add("error");
      errorInvalidItemNumber.style.display = "flex";
      return true;
    }
  
    return false; // both inputs are not empty
  }
  
  itemPrompter.addEventListener("input", resetPrompterStyles);
  itemQtyPrompter.addEventListener("input", resetPrompterStyles);
  
  itemPrompter.addEventListener("keydown", handleEnterKey);
  itemQtyPrompter.addEventListener("keydown", handleEnterKey);
  
  function handleEnterKey(e) {
    if (e.key === "Enter") {
      if (handleEmptyInput()) {
        return;
      }
  
      const itemNum = parseInt(itemPrompter.value);
      const qty = parseInt(itemQtyPrompter.value);
  
      if (menu[itemNum] && qty > 0 && qty <= 20 && itemNum > 0 && itemNum <= 16) {
        // Create item
        const item = createItem(itemNum, qty);
        ordersList.appendChild(item);
  
        itemPrompter.value = "";
        itemQtyPrompter.value = "";
  
        resetPrompterStyles();
  
        item.style.display = "flex";
        updatePrice(item);
        recalculateSubtotal();
      } else {
        handleInvalidInput();
        return;
      }
    }
  }
  
  let numberOfItems = 0;
  
  function createItem(itemNum, qty) {
    const { name, img, price } = menu[itemNum];
  
    const item = document.createElement("div");
    item.classList.add("item");
    numberOfItems++;
  
    const col1 = document.createElement("div");
    col1.classList.add("item-firstcolumn");
  
    const col2 = document.createElement("div");
    col2.classList.add("item-secondcolumn");
  
    const itemImg = document.createElement("img");
  
    if (
      name === "Coca-Cola" ||
      name === "Sprite" ||
      name === "Royal" ||
      name === "Iced Tea" ||
      name === "Lemon Juice"
    ) {
      itemImg.style.height = "80%";
      itemImg.style.width = "5%";
      itemImg.style.paddingLeft = "25px";
      itemImg.style.paddingRight = "25px";
      itemImg.style.paddingTop = "0";
      itemImg.style.paddingBottom = "0";
    } else {
      itemImg.style.width = "15%";
    }
  
    itemImg.src = img;
    itemImg.classList.add("item-image");
  
    const details = document.createElement("div");
    details.classList.add("item-details");
    details.innerHTML = `
      <div class="item-name">${name}</div>
      <div class="item-price">€${price}</div>
    `;
  
    details.style.width = "65%";
  
    // quantity & subtotal
    const qtyInput = document.createElement("input");
    qtyInput.type = "number";
    qtyInput.value = qty;
    qtyInput.classList.add("item-qty");
  
    qtyInput.addEventListener("input", (e) => {
      validateQuantity(qtyInput);
      recalculateSubtotal();
    });
  
    function validateQuantity(input) {
      let value = parseInt(input.value);
  
      if (isNaN(value)) {
        value = 1;
      }
  
      value = Math.min(Math.max(value, 1), 20);
  
      input.value = value;
  
      updatePrice(item);
    }
  
    const subtotal = document.createElement("div");
    subtotal.classList.add("item-qtypricesubtotal");
    subtotal.textContent = `€${qty * price}`;
  
    // notes & delete button
    const notes = document.createElement("input");
    notes.type = "text";
    notes.placeholder = "Item notes...";
    notes.classList.add("item-notes");
  
    const deleteBtn = document.createElement("div");
    deleteBtn.classList.add("delete-button");
    deleteBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
        </svg>
      `;
  
    // columns and its items are being built
    col1.appendChild(itemImg);
    col1.appendChild(details);
    col1.appendChild(qtyInput);
    col1.appendChild(subtotal);
  
    col2.appendChild(notes);
    col2.appendChild(deleteBtn);
  
    // built columns add to item
    item.appendChild(col1);
    item.appendChild(col2);
  
    return item;
  }
  
  // delete item
  ordersList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-button")) {
      const item = e.target.closest(".item");
      item.remove();
      recalculateSubtotal();
      numberOfItems--;
    }
  });
  
  // update price function
  function updatePrice(item) {
    const qty = parseInt(item.querySelector(".item-qty").value);
    const price = parseInt(
      item.querySelector(".item-price").textContent.slice(1)
    );
    const subtotal = qty * price;
    item.querySelector(".item-qtypricesubtotal").textContent = `€${subtotal}`;
  }
  
  /* subtotal, vat, and total calc */
  function recalculateSubtotal() {
    let newSubtotal = 0;
  
    // update the subtotal based on all the items
    document.querySelectorAll(".item").forEach((item) => {
      const qtyInput = item.querySelector(".item-qty");
      const priceDisplay = item.querySelector(".item-price");
  
      const qty = parseFloat(qtyInput.value) || 0;
      const price = parseFloat(priceDisplay.textContent.slice(1)) || 0;
  
      newSubtotal += qty * price;
    });
  
    subtotal = newSubtotal;
    updateSubtotal(subtotal);
  }
  
  // subtotal display update
  function updateSubtotal(subtotal) {
    document.querySelector(
      ".costsubtotal-calc"
    ).textContent = `€${subtotal.toFixed(2)}`;
  
    // VAT
    const vatRate = 0.12; // 12% cuz its philippines rate
    const vat = subtotal * vatRate;
    const total = subtotal + vat;
  
    // vat and total calculations and displayings
    document.querySelector(".vattax-calc").textContent = `€${vat.toFixed(2)}`;
    document.querySelector(".costtotal-calc").textContent = `€${total.toFixed(
      2
    )}`;
  }
  
  document.addEventListener("itemadded", recalculateSubtotal);
  document.addEventListener("itemremoved", recalculateSubtotal);
  
  recalculateSubtotal();
  
  /* submit order button alert messages */
  function submitOrder() {
    // order list gets checked if theres an item
    if (numberOfItems === 0) {
      window.alert(
        "Error: Order list is empty! At least 1 item must be added in the order list. Note that when finish typing in the prompts, please hit enter."
      );
    } else {
      let num1 = parseInt(localStorage.getItem("orderNumber")) || 1;
      ordernumber = num1++;
      localStorage.setItem("orderNumber", num1);
  
      window.alert("Order submitted successfully!");
    }
  }
  
  /* food category item window change */
  document.addEventListener("DOMContentLoaded", function () {
    const burgersCategory = document.getElementById("burgers");
    const friesCategory = document.getElementById("fries");
    const beverageCategory = document.getElementById("beverages");
    const burgerItemWindow = document.querySelector(".burger-itemwindow");
    const friesItemWindow = document.querySelector(".fries-itemwindow");
    const beverageItemWindow = document.querySelector(".beverage-itemwindow");
    burgersCategory.addEventListener("click", function () {
      burgerItemWindow.style.display = "flex";
      friesItemWindow.style.display = "none";
      beverageItemWindow.style.display = "none";
    });
    friesCategory.addEventListener("click", function () {
      burgerItemWindow.style.display = "none";
      friesItemWindow.style.display = "flex";
      beverageItemWindow.style.display = "none";
    });
    beverageCategory.addEventListener("click", function () {
      burgerItemWindow.style.display = "none";
      friesItemWindow.style.display = "none";
      beverageItemWindow.style.display = "flex";
    });
  });
  
  /* food category highlighting */
  document.addEventListener("DOMContentLoaded", function () {
    const foodCategories = document.querySelectorAll(".foodcategories div");
  
    foodCategories[0].classList.add("clicked");
  
    foodCategories.forEach((category) => {
      category.addEventListener("click", function () {
        foodCategories.forEach((c) => {
          c.classList.remove("clicked");
        });
        category.classList.add("clicked");
      });
    });
  });
  
  /* live date (timezone changes depending on your location) */
  function getCurrentDate() {
    const months = [
      "Jan.",
      "Feb.",
      "Mar.",
      "Apr.",
      "May",
      "Jun.",
      "Jul.",
      "Aug.",
      "Sep.",
      "Oct.",
      "Nov.",
      "Dec."
    ];
  
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
  
    const currentDate = new Date();
    const dayOfWeek = days[currentDate.getDay()];
    const month = months[currentDate.getMonth()];
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    const period = hours >= 12 ? "PM" : "AM";
  
    const formattedHours = hours % 12 || 12;
  
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
  
    const formattedDate = `${dayOfWeek}, ${month} ${day}, ${year}, ${formattedHours}:${formattedMinutes}:${formattedSeconds} ${period}`;
  
    return formattedDate;
  }
  
  function updateCurrentDate() {
    const currentDateElement = document.getElementById("currentDate");
    currentDateElement.textContent = getCurrentDate();
  }
  
  setInterval(updateCurrentDate, 1000);
  
  updateCurrentDate();
  
  /* Cheeseburger */
  var cheeseburgername = document.getElementById("cheeseburger-name");
  
  var cheeseburgerprice = document.getElementById("cheeseburger-price");
  
  var cheeseburgerdesc = document.getElementById("cheeseburger-desc");
  
  var cheeseburgerstocks = document.getElementById("cheeseburger-stocks");
  
  var cheeseburgernametxt = "Classic Cheeseburger";
  
  var cheeseburgerpricetxt = "5€";
  
  var cheeseburgerdesctxt =
    "The classic cheeseburger is a simple, cheap, and satisfying sandwich that features high-quality beef, topped with a slice of cheese, crispy lettuce, fresh tomato, onion, and ketchup. ";
  
  var cheeseburgerstockstxt = "Item available";
  
  cheeseburgername.innerHTML = "</p>" + cheeseburgernametxt;
  
  cheeseburgerprice.innerHTML = "</p>" + cheeseburgerpricetxt;
  
  cheeseburgerdesc.innerHTML = "</p>" + cheeseburgerdesctxt;
  
  cheeseburgerstocks.innerHTML = "</p>" + cheeseburgerstockstxt;
  
  /* Mushroom Burger */
  var mushroomname = document.getElementById("mushroom-name");
  
  var mushroomprice = document.getElementById("mushroom-price");
  
  var mushroomdesc = document.getElementById("mushroom-desc");
  
  var mushroomstocks = document.getElementById("mushroom-stocks");
  
  var mushroomnametxt = "Mushroom  Swiss Burger";
  
  var mushroompricetxt = "6€";
  
  var mushroomdesctxt =
    "The mushroom burger is a hearty and delicious sandwich that has pure vegetarian patty, topped with sautéed mushrooms, swiss cheese, lettuce, tomato, onion, and creamy sauce.";
  
  var mushroomstockstxt = "Item available";
  
  mushroomname.innerHTML = "</p>" + mushroomnametxt;
  
  mushroomprice.innerHTML = "</p>" + mushroompricetxt;
  
  mushroomdesc.innerHTML = "</p>" + mushroomdesctxt;
  
  mushroomstocks.innerHTML = "</p>" + mushroomstockstxt;
  
  /* BBQ-Bacon Cheeseburger */
  var bbqbaconname = document.getElementById("bbqbacon-name");
  
  var bbqbaconprice = document.getElementById("bbqbacon-price");
  
  var bbqbacondesc = document.getElementById("bbqbacon-desc");
  
  var bbqbaconstocks = document.getElementById("bbqbacon-stocks");
  
  var bbqbaconnametxt = "BBQ-Bacon Cheeseburger";
  
  var bbqbaconpricetxt = "7.5€";
  
  var bbqbacondesctxt =
    "The BBQ-Bacon cheeseburger is a smoky and savory sandwich that features high-quality beef, topped with crispy bacon, melted cheese, lettuce, tomato, onion, and a tangy bbq sauce.";
  
  var bbqbaconstockstxt = "Item available";
  
  bbqbaconname.innerHTML = "</p>" + bbqbaconnametxt;
  
  bbqbaconprice.innerHTML = "</p>" + bbqbaconpricetxt;
  
  bbqbacondesc.innerHTML = "</p>" + bbqbacondesctxt;
  
  bbqbaconstocks.innerHTML = "</p>" + bbqbaconstockstxt;
  
  /* Jalapeno Burger */
  var jalapenoname = document.getElementById("jalapeno-name");
  
  var jalapenoprice = document.getElementById("jalapeno-price");
  
  var jalapenodesc = document.getElementById("jalapeno-desc");
  
  var jalapenostocks = document.getElementById("jalapeno-stocks");
  
  var jalapenonametxt = "Jalapeño Blaze Burger";
  
  var jalapenopricetxt = "7€";
  
  var jalapenodesctxt =
    "The Jalapeño burger is a spicy, flavorful sandwich. It contains high-quality cow beef from grass-fed cattle, topped with sliced jalapeno peppers, cheese, lettuce, tomato, onion, and a zesty sauce.";
  
  var jalapenostockstxt = "Item available";
  
  jalapenoname.innerHTML = "</p>" + jalapenonametxt;
  
  jalapenoprice.innerHTML = "</p>" + jalapenopricetxt;
  
  jalapenodesc.innerHTML = "</p>" + jalapenodesctxt;
  
  jalapenostocks.innerHTML = "</p>" + jalapenostockstxt;
  
  /* Angus Burger */
  var angusname = document.getElementById("angus-name");
  
  var angusprice = document.getElementById("angus-price");
  
  var angusdesc = document.getElementById("angus-desc");
  
  var angusstocks = document.getElementById("angus-stocks");
  
  var angusnametxt = "Angus Supreme Burger";
  
  var anguspricetxt = "9€";
  
  var angusdesctxt =
    "The angus burger contains high-quality angus beef complemented with crisp lettuce, ripe tomato, sweet onion, cheese, and barbeque sauce, all sandwiched between two, round buns.";
  
  var angusstockstxt = "Item available";
  
  angusname.innerHTML = "</p>" + angusnametxt;
  
  angusprice.innerHTML = "</p>" + anguspricetxt;
  
  angusdesc.innerHTML = "</p>" + angusdesctxt;
  
  angusstocks.innerHTML = "</p>" + angusstockstxt;
  
  /* Teriyaki Burger */
  
  var teriyakiname = document.getElementById("teriyaki-name");
  
  var teriyakiprice = document.getElementById("teriyaki-price");
  
  var teriyakidesc = document.getElementById("teriyaki-desc");
  
  var teriyakistocks = document.getElementById("teriyaki-stocks");
  
  var teriyakinametxt = "Teriyaki Bliss Burger";
  
  var teriyakipricetxt = "7.5€";
  
  var teriyakidesctxt =
    "The teriyaki burger features high-quality cow beef from grass-fed cattle, enhanced by crunchy lettuce, pineapple, caramelized onion, cheese, and savory teriyaki sauce, all in tasty, round buns.";
  
  var teriyakistockstxt = "Item available";
  
  teriyakiname.innerHTML = "</p>" + teriyakinametxt;
  
  teriyakiprice.innerHTML = "</p>" + teriyakipricetxt;
  
  teriyakidesc.innerHTML = "</p>" + teriyakidesctxt;
  
  teriyakistocks.innerHTML = "</p>" + teriyakistockstxt;
  
  /* Fries */
  // Classic Fries
  var classicfriesname = document.getElementById("classic-fries-name");
  
  var classicfriesprice = document.getElementById("classic-fries-price");
  
  var classicfriesdesc = document.getElementById("classic-fries-desc");
  
  var classicfriesstocks = document.getElementById("classic-fries-stocks");
  
  var classicfriesnametxt = "Classic Fries";
  
  var classicfriespricetxt = "2.5€";
  
  var classicfriesdesctxt =
    "The classic fries are crispy and golden on the outside, soft and fluffy on the inside, and seasoned with just the right amount of salt. They are the perfect match to any burger, or a delicious snack on their own.";
  
  var classicfriesstockstxt = "Item available";
  
  classicfriesname.innerHTML = "</p>" + classicfriesnametxt;
  
  classicfriesprice.innerHTML = "</p>" + classicfriespricetxt;
  
  classicfriesdesc.innerHTML = "</p>" + classicfriesdesctxt;
  
  classicfriesstocks.innerHTML = "</p>" + classicfriesstockstxt;
  
  // Curly Fries
  var curlyfriesname = document.getElementById("curly-fries-name");
  
  var curlyfriesprice = document.getElementById("curly-fries-price");
  
  var curlyfriesdesc = document.getElementById("curly-fries-desc");
  
  var curlyfriesstocks = document.getElementById("curly-fries-stocks");
  
  var curlyfriesnametxt = "Curly Fries";
  
  var curlyfriespricetxt = "3.55€";
  
  var curlyfriesdesctxt =
    "Our curly fries are twisted and fun-shaped fries that are crunchy and curly on the outside, tender and tasty on the inside, and seasoned with a blend of spices that give them a kick.";
  
  var curlyfriesstockstxt = "Item available";
  
  curlyfriesname.innerHTML = "</p>" + curlyfriesnametxt;
  
  curlyfriesprice.innerHTML = "</p>" + curlyfriespricetxt;
  
  curlyfriesdesc.innerHTML = "</p>" + curlyfriesdesctxt;
  
  curlyfriesstocks.innerHTML = "</p>" + curlyfriesstockstxt;
  
  // poutine/Poutine Fries
  var poutinefriesname = document.getElementById("poutine-fries-name");
  
  var poutinefriesprice = document.getElementById("poutine-fries-price");
  
  var poutinefriesdesc = document.getElementById("poutine-fries-desc");
  
  var poutinefriesstocks = document.getElementById("poutine-fries-stocks");
  
  var poutinefriesnametxt = "Poutine Fries";
  
  var poutinefriespricetxt = "4.5€";
  
  var poutinefriesdesctxt =
    "This dish is popular in Canada. They are decadent and delicious fries that are topped with cheese curds, gravy, and other ingredients such as bacon, chicken, or green onions.";
  
  var poutinefriesstockstxt = "Item Available";
  
  poutinefriesname.innerHTML = "</p>" + poutinefriesnametxt;
  
  poutinefriesprice.innerHTML = "</p>" + poutinefriespricetxt;
  
  poutinefriesdesc.innerHTML = "</p>" + poutinefriesdesctxt;
  
  poutinefriesstocks.innerHTML = "</p>" + poutinefriesstockstxt;
  
  // Sweet Potato Fries
  var sweetpotatofriesname = document.getElementById("sweet-potato-fries-name");
  
  var sweetpotatofriesprice = document.getElementById("sweet-potato-fries-price");
  
  var sweetpotatofriesdesc = document.getElementById("sweet-potato-fries-desc");
  
  var sweetpotatofriesstocks = document.getElementById(
    "sweet-potato-fries-stocks"
  );
  
  var sweetpotatofriesnametxt = "Sweet Potato Fries";
  
  var sweetpotatofriespricetxt = "4€";
  
  var sweetpotatofriesdesctxt =
    "Our sweet potato fries are made from orange-fleshed sweet potatoes, which are rich in nutrients. They are baked until they are crispy and tender.";
  
  var sweetpotatofriesstockstxt = "Item available";
  
  sweetpotatofriesname.innerHTML = "</p>" + sweetpotatofriesnametxt;
  
  sweetpotatofriesprice.innerHTML = "</p>" + sweetpotatofriespricetxt;
  
  sweetpotatofriesdesc.innerHTML = "</p>" + sweetpotatofriesdesctxt;
  
  sweetpotatofriesstocks.innerHTML = "</p>" + sweetpotatofriesstockstxt;
  
  /* Drinks/Beverages */
  
  // Coca-Cola
  
  var cocacolaname = document.getElementById("coca-cola-name");
  
  var cocacolaprice = document.getElementById("coca-cola-price");
  
  var cocacoladesc = document.getElementById("coca-cola-desc");
  
  var cocacolastocks = document.getElementById("coca-cola-stocks");
  
  var cocacolanametxt = "Coca-Cola";
  
  var cocacolapricetxt = "3€";
  
  var cocacoladesctxt =
    "A carbonated soft drink that is made from coca leaves, kola nuts, sugar, and water. It has a sweet and refreshing taste and is one of the most popular beverages in the world.";
  
  var cocacolastockstxt = "Item available";
  
  cocacolaname.innerHTML = "</p>" + cocacolanametxt;
  
  cocacolaprice.innerHTML = "</p>" + cocacolapricetxt;
  
  cocacoladesc.innerHTML = "</p>" + cocacoladesctxt;
  
  cocacolastocks.innerHTML = "</p>" + cocacolastockstxt;
  
  // Sprite
  
  var spritename = document.getElementById("sprite-name");
  
  var spriteprice = document.getElementById("sprite-price");
  
  var spritedesc = document.getElementById("sprite-desc");
  
  var spritestocks = document.getElementById("sprite-stocks");
  
  var spritenametxt = "Sprite";
  
  var spritepricetxt = "3€";
  
  var spritedesctxt =
    "Also a carbonated soft drink, it is made from lemon and lime flavors, sugar, and water. It has a sour and fizzy taste and is also one of the most popular beverages in the world and in the Philippines.";
  
  var spritestockstxt = "Item available";
  
  spritename.innerHTML = "</p>" + spritenametxt;
  
  spriteprice.innerHTML = "</p>" + spritepricetxt;
  
  spritedesc.innerHTML = "</p>" + spritedesctxt;
  
  spritestocks.innerHTML = "</p>" + spritestockstxt;
  
  // Royal juice
  
  var royalname = document.getElementById("royal-name");
  
  var royalprice = document.getElementById("royal-price");
  
  var royaldesc = document.getElementById("royal-desc");
  
  var royalstocks = document.getElementById("royal-stocks");
  
  var royalnametxt = "Royal Juice";
  
  var royalpricetxt = "1.5€";
  
  var royaldesctxt =
    "Similar to Fanta but with different name, it is made from orange flavor, sugar, and water. It has a sweet and tangy taste and is one of the most popular beverages in the Philippines.";
  
  var royalstockstxt = "Item available";
  
  royalname.innerHTML = "</p>" + royalnametxt;
  
  royalprice.innerHTML = "</p>" + royalpricetxt;
  
  royaldesc.innerHTML = "</p>" + royaldesctxt;
  
  royalstocks.innerHTML = "</p>" + royalstockstxt;
  
  // Iced Tea
  
  var icedteaname = document.getElementById("iced-tea-name");
  
  var icedteaprice = document.getElementById("iced-tea-price");
  
  var icedteadesc = document.getElementById("iced-tea-desc");
  
  var icedteastocks = document.getElementById("iced-tea-stocks");
  
  var icedteanametxt = "Iced Tea";
  
  var icedteapricetxt = "2.57€";
  
  var icedteadesctxt =
    "Our iced tea is made from brewed tea leaves, sugar, and ice. It has a mild and refreshing taste and can be flavored with fruits. Like lemon juice, it also has nutrients that can provide health benefits.";
  
  var icedteastockstxt = "Item available";
  
  icedteaname.innerHTML = "</p>" + icedteanametxt;
  
  icedteaprice.innerHTML = "</p>" + icedteapricetxt;
  
  icedteadesc.innerHTML = "</p>" + icedteadesctxt;
  
  icedteastocks.innerHTML = "</p>" + icedteastockstxt;
  
  // Lemon Juice
  
  var lemonjuicename = document.getElementById("lemon-juice-name");
  
  var lemonjuiceprice = document.getElementById("lemon-juice-price");
  
  var lemonjuicedesc = document.getElementById("lemon-juice-desc");
  
  var lemonjuicestocks = document.getElementById("lemon-juice-stocks");
  
  var lemonjuicenametxt = "Lemon Juice";
  
  var lemonjuicepricetxt = "2€";
  
  var lemonjuicedesctxt =
    "Our lemon juice is made from squeezed lemons, sugar, and water. It has a sour and refreshing taste and is rich in vitamin C and antioxidants. It can help boost the immune system and prevent scury.";
  
  var lemonjuicestockstxt = "Item available";
  
  lemonjuicename.innerHTML = "</p>" + lemonjuicenametxt;
  
  lemonjuiceprice.innerHTML = "</p>" + lemonjuicepricetxt;
  
  lemonjuicedesc.innerHTML = "</p>" + lemonjuicedesctxt;
  
  lemonjuicestocks.innerHTML = "</p>" + lemonjuicestockstxt;
  
  // Fruit Smoothie
  
  var fruitsmoothiename = document.getElementById("fruit-smoothie-name");
  
  var fruitsmoothieprice = document.getElementById("fruit-smoothie-price");
  
  var fruitsmoothiedesc = document.getElementById("fruit-smoothie-desc");
  
  var fruitsmoothiestocks = document.getElementById("fruit-smoothie-stocks");
  
  var fruitsmoothienametxt = "Fruit Smoothie";
  
  var fruitsmoothiepricetxt = "7€";
  
  var fruitsmoothiedesctxt =
    "Our fruit smoothies are available in six refreshing flavors: <b> mango, banana, berry, pineapple, kiwi, watermelon </b>. You may choose any one of these by writing them in the item notes.";
  
  var fruitsmoothiestockstxt = "Item available";
  
  fruitsmoothiename.innerHTML = "</p>" + fruitsmoothienametxt;
  
  fruitsmoothieprice.innerHTML = "</p>" + fruitsmoothiepricetxt;
  
  fruitsmoothiedesc.innerHTML = "</p>" + fruitsmoothiedesctxt;
  
  fruitsmoothiestocks.innerHTML = "</p>" + fruitsmoothiestockstxt;
  