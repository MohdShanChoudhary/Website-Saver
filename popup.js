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
const websiteList = document.getElementById("websiteList");

/* LOAD */

chrome.storage.local.get(["websites","categories"], res => {

  websites = res.websites || [];
  categories = res.categories || [];

  updateCategories();
  render(websites);

});

/* UI TOGGLE */

addBtn.onclick = () => {
  formBox.style.display =
    formBox.style.display === "block" ? "none" : "block";
};

filterBtn.onclick = () => {
  categoryBar.classList.toggle("hidden");
};

/* ADD CATEGORY */

newCategory.onchange = () => {

  const cat = newCategory.value.trim();

  if(!cat || categories.includes(cat)) return;

  categories.push(cat);

  saveStorage();
  updateCategories();

  newCategory.value = "";
};

/* SAVE WEBSITE */

saveBtn.onclick = () => {

  const name = nameInput.value;
  const url = urlInput.value;
  const category = categorySelect.value;

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
  render(websites);

  formBox.style.display = "none";

  nameInput.value = "";
  urlInput.value = "";
};

/* STORAGE */

function saveStorage() {

  chrome.storage.local.set({
    websites,
    categories
  });

}

/* CATEGORY UI */

function updateCategories() {

  categorySelect.innerHTML = "";
  categoryBar.innerHTML = `<div class="cat active" data-cat="all">All</div>`;

  categories.forEach(cat => {

    categorySelect.innerHTML += `<option>${cat}</option>`;

    categoryBar.innerHTML += `<div class="cat" data-cat="${cat}">${cat}</div>`;

  });

  document.querySelectorAll(".cat").forEach(btn => {

    btn.onclick = () => {

      document.querySelectorAll(".cat").forEach(c => c.classList.remove("active"));
      btn.classList.add("active");

      const type = btn.dataset.cat;

      if(type === "all") render(websites);
      else render(websites.filter(w => w.category === type));

    };

  });

}

/* RENDER UI */

function render(data) {

  websiteList.innerHTML = "";

  data.forEach(site => {

    const favicon =
      `https://www.google.com/s2/favicons?domain=${site.url}&sz=64`;

    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${favicon}">
      <a target="_blank" href="${site.url}">${site.name}</a>
      <span class="deleteBtn">✖</span>
    `;

    div.querySelector(".deleteBtn").onclick = () => {
      deleteSite(site.id);
    };

    websiteList.appendChild(div);

  });

}

/* DELETE FIXED */

function deleteSite(id) {

  websites = websites.filter(site => site.id !== id);

  chrome.storage.local.set({ websites }, () => {

    // ALWAYS re-render full list
    render(websites);

    // Reset category to ALL
    document.querySelectorAll(".cat").forEach(c => c.classList.remove("active"));
    document.querySelector('[data-cat="all"]').classList.add("active");

  });

}


});
