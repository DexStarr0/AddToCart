class AddToCart {
  constructor() {
    const itemList = document.querySelector("#item-list");
    const form = document.querySelector("#form");
    // real-time listener
    // pulling data from firebase
    db.collection("MyCart")
      // .orderBy("purchageDetail.quantity")
      .onSnapshot((snapshot) => {
        let changes = snapshot.docChanges();
        changes.forEach((change) => {
          if (change.type == "added") {
            renderCart(change.doc);
          } else if (change.type == "removed") {
            let li = itemList.querySelector("[data-id=" + change.doc.id + "]");
            itemList.removeChild(li);
          }
        });
      });

    // create element & render to userinterface

    function renderCart(doc) {
      let li = document.createElement("li");
      let product = document.createElement("span");
      let quantity = document.createElement("span");
      let productType = document.createElement("span");
      let cross = document.createElement("div");

      li.setAttribute("data-id", doc.id);
      product.textContent =
        "Product Name : " + doc.data().purchageDetail.product;
      quantity.textContent = "Quantity : " + doc.data().purchageDetail.quantity;
      productType.textContent =
        "Type : " + doc.data().purchageDetail.productType;
      cross.textContent = "x";

      li.appendChild(product);
      li.appendChild(quantity);
      li.appendChild(productType);
      li.appendChild(cross);

      itemList.appendChild(li);

      // deleting data
      cross.addEventListener("click", (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute("data-id");
        db.collection("MyCart").doc(id).delete();
      });
    }
  }

  // add orders as a object to firebase
  addMore(purchageDetail) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    if (purchageDetail.quantity < 1 || purchageDetail.product == "") {
    } else {
      // add to firestore
      db.collection("MyCart").add({
        purchageDetail,
      });
    }
  }

  productName() {
    return this.product;
  }
  noQuantity() {
    return this.quantity;
  }
}

var a = new AddToCart();
function initilizeclass() {
  let order = {
    product: form.product.value,
    productType: "fruit",
    quantity: form.quantity.value,
  };
  // order is passed through crearting object
  a.addMore(order);

  // reset to form input
  form.product.value = "";
  form.quantity.value = "";

  // let proarr = [
  //   { product: "apple", productType: "fruit", quantity: 5 },
  //   { product: "orange", productType: "fruit", quantity: 2 },
  // ];
  // for (let i = 0; i < proarr.length; i++) {
  //   a.addMore(proarr[i]);
  // }
}

// updating records (console demo)
// db.collection('MyCart').doc('DOgwUvtEQbjZohQNIeMr').update({
//     product: 'mario world'
// });

// db.collection('MyCart').doc('DOgwUvtEQbjZohQNIeMr').update({
//     quantity: 'hong kong'
// });

// setting data
// db.collection('MyCart').doc('DOgwUvtEQbjZohQNIeMr').set({
//     quantity: 'hong kong'
// });
