let websites = [];
let categories = [];

document.addEventListener("DOMContentLoaded", () => {

const addBtn = document.getElementById("addBtn");
const formBox = document.getElementById("formBox");
const saveBtn = document.getElementById("saveBtn");
const categorySelect = document.getElementById("categorySelect");
const categoryBar = document.getElementById("categoryBar");
const filterBtn = document.getElementById("filterBtn");
const newCategory = document.getElementById("newCategory");
const nameInput = document.getElementById("name");
const urlInput = document.getElementById("url");

/* LOAD DATA */

chrome.storage.local.get(["websites","categories"], (data) => {

  websites = data.websites || [];
  categories = data.categories || [];

  updateCategories();
  showWebsites(websites);

});

/* FILTER TOGGLE */

filterBtn.onclick = () => {
  categoryBar.classList.toggle("hidden");
};

/* FORM TOGGLE */

addBtn.onclick = () => {
  formBox.style.display =
    formBox.style.display === "block" ? "none" : "block";
};

/* ADD CATEGORY */

newCategory.onchange = () => {

  let cat = newCategory.value.trim();

  if(!cat || categories.includes(cat)) return;

  categories.push(cat);

  saveStorage();
  updateCategories();

  newCategory.value = "";
};

/* SAVE WEBSITE */

saveBtn.onclick = () => {

  let name = nameInput.value;
  let url = urlInput.value;
  let category = categorySelect.value;

  if(!name || !url || !category) {
    alert("Fill all fields");
    return;
  }

  websites.push({
    id: Date.now(),
    name,
    url,
    category
  });

  saveStorage();
  showWebsites(websites);

  formBox.style.display = "none";

  nameInput.value = "";
  urlInput.value = "";
};

/* SAVE STORAGE */

function saveStorage() {

  chrome.storage.local.set({
    websites,
    categories
  });

}

/* UPDATE CATEGORY */

function updateCategories() {

  categorySelect.innerHTML = "";
  categoryBar.innerHTML = `<div class="cat active" data-cat="all">All</div>`;

  categories.forEach(cat => {

    categorySelect.innerHTML += `<option>${cat}</option>`;

    categoryBar.innerHTML += `<div class="cat" data-cat="${cat}">${cat}</div>`;

  });

  attachCategoryEvents();
}

/* FILTER CLICK */

function attachCategoryEvents() {

  document.querySelectorAll(".cat").forEach(btn => {

    btn.onclick = () => {

      document.querySelectorAll(".cat").forEach(c => c.classList.remove("active"));

      btn.classList.add("active");

      let selected = btn.dataset.cat;

      if(selected === "all") {
        showWebsites(websites);
      } else {
        showWebsites(websites.filter(w => w.category === selected));
      }
    };

  });
}

/* SHOW WEBSITES */

function showWebsites(data) {

  let list = document.getElementById("websiteList");

  list.innerHTML = "";

  data.forEach(site => {

    let favicon =
      `https://www.google.com/s2/favicons?domain=${site.url}&sz=64`;

    list.innerHTML += `
      <div class="card">
        <img src="${favicon}">
        <a target="_blank" href="${site.url}">${site.name}</a>
        <span class="deleteBtn" onclick="deleteSite(${site.id})">✖</span>
      </div>
    `;

  });

}

/* DELETE WEBSITE */

window.deleteSite = function(id) {

  websites = websites.filter(site => site.id !== id);

  chrome.storage.local.set({ websites }, () => {
    showWebsites(websites);
  });

};

});
