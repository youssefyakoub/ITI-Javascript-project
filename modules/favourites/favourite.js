import { handleUserState, renderNavLinks } from "../shared.js";

var ul = [
  {
    name: "Home",
    link: "../../index.html",
  },
  {
    name: "About",
    link: "#footer",
  },
  {
    name: "contact us",
    link: "#footer",
  },
  {
    name: "Categories",
    link: "../categories/categories.html",
  },
  {
    name: "new",
    link: "../../index.html#breakPointMainAndNewArrival",
  },
];

var list = document.getElementById("navLinks");

handleUserState();
renderNavLinks(list, ul);

list.style.cssText = `
    display: flex;
    align-items: center;
    justify-content: center;
    gap:70px;
    list-style:none ;

  `;

var apiData = JSON.parse(localStorage.getItem("apiData"));
var users = JSON.parse(localStorage.getItem("users"));
var currentUser =
  JSON.parse(sessionStorage.getItem("currentUser")) == null
    ? JSON.parse(localStorage.getItem("currentUser"))
    : JSON.parse(sessionStorage.getItem("currentUser"));

var cUser;
var favouriteBooksIds = [];
var favouriteBooks = [];

// Identify the current user
for (var i = 0; i < users.length; i++) {
  if (users[i].email === currentUser.email) {
    cUser = users[i];
  }
}

favouriteBooksIds = cUser.favBooks;

if (favouriteBooksIds && favouriteBooksIds.length > 0) {
  // Filter favorite books
  if (favouriteBooksIds != null) {
    for (var i = 0; i < apiData.length; i++) {
      for (var j = 0; j < favouriteBooksIds.length; j++) {
        if (apiData[i].id == favouriteBooksIds[j]) {
          favouriteBooks.push(apiData[i]);
        }
      }
    }
  }

  var favDiv = document.getElementById("favDiv");

  // Create favorite books display
  favouriteBooks.forEach((book, index) => {
    var item = document.createElement("section");
    item.classList = index % 2 === 0 ? "item item1" : "item item2";
    item.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    favDiv.appendChild(item);

    var imgDiv = document.createElement("section");
    imgDiv.id = "imgDiv";
    item.appendChild(imgDiv);

    var img = document.createElement("img");
    img.src = book.cover_image;
    imgDiv.appendChild(img);

    var itemInfo = document.createElement("section");
    itemInfo.id = "itemInfo";
    item.appendChild(itemInfo);

    var title = document.createElement("h2");
    title.innerText = book.title;
    title.id = "title";
    itemInfo.appendChild(title);

    var author = document.createElement("p");
    author.innerText = book.author;
    author.id = "author";
    itemInfo.appendChild(author);

    var description = document.createElement("p");
    description.innerText = book.description;
    description.id = "description";
    itemInfo.appendChild(description);

    var price = document.createElement("h3");
    price.innerText = "EGP " + book.price;
    price.id = "price";
    itemInfo.appendChild(price);

    // "Go to Item" button
    var goToItem = document.createElement("button");
    goToItem.innerText = "Go to Item";
    goToItem.id = "goToItem";
    goToItem.addEventListener("click", function () {
      console.log("clicked");
      window.location.href = "../product_page/product_page.html?id=" + book.id;
    });
    itemInfo.appendChild(goToItem);

    // Add delete icon
    var deleteIcon = document.createElement("i");
    deleteIcon.className = "fa-solid fa-trash delete-sicon";
    deleteIcon.style.cursor = "pointer";
    deleteIcon.style.color = "red";
    deleteIcon.style.fontSize = "20px";
    deleteIcon.style.marginLeft = "10px";

    deleteIcon.addEventListener("click", function () {
      item.style.opacity = "0";
      item.style.transform = "scale(0.9)";
      setTimeout(() => {
        item.remove();
        console.log(cUser);
        cUser.favBooks = cUser.favBooks.filter((val) => val != book.id);
        console.log(cUser.favBooks);
        users = users.map((user) => {
          if (user.email === cUser.email) {
            user.favBooks = cUser.favBooks;
          }
          return user;
        });
        localStorage.setItem("users", JSON.stringify(users));
        location.reload();
      }, 500);
    });

    item.appendChild(deleteIcon);
  });
} else {
  var container = document.getElementById("favDiv");
  var emptyMessage = document.createElement("div");
  emptyMessage.style.textAlign = "center";
  emptyMessage.style.fontSize = "24px";
  emptyMessage.style.marginTop = "250px";
  emptyMessage.style.marginBottom = "250px";
  emptyMessage.textContent = " No favorite books have been added yet .";
  container.appendChild(emptyMessage);
}

//back home function
function backHome() {
  window.location.href = "../../index.html";
}
