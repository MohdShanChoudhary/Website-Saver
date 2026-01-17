# Website Saver Chrome Extension

Website Saver is a lightweight and easy-to-use Chrome Extension that allows users to save, organize, and manage their favorite websites in one place. Users can create custom categories, filter saved links, and delete unwanted entries easily.



<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/debf483e-1460-4731-851a-b3f01cdd5740" />
<img width="609" height="921" alt="Screenshot 2026-01-17 234825" src="https://github.com/user-attachments/assets/ed8df0d3-5167-47b6-8994-aa3680daf174" />


---

## Features

* Save unlimited websites
* Create custom categories
* Filter websites by category
* Automatically display website logos (favicons)
* Delete saved websites
* Permanent data storage using Chrome Storage
* Clean and simple user interface

---

## Project Folder Structure

Your project folder should be organized like this:

```
website-saver/
│
├── manifest.json
├── popup.html
├── popup.js
│
└── icon128.png
```

---

## Technologies Used

* HTML
* CSS
* JavaScript
* Chrome Extension API (Manifest V3)
* Chrome Storage API

---

## How To Install The Extension (Developer Mode)

Follow the steps below to install the extension locally:

1. Open Google Chrome
2. Open the Extensions page by visiting:

```
chrome://extensions
```

3. Enable **Developer Mode** (top-right corner)
4. Click **Load unpacked**
5. Select your project folder
6. The extension will be installed successfully

---

## How To Use

### Add Website

1. Click on the extension icon
2. Click **+ Add Website**
3. Enter the following details:

   * Website Name
   * Website URL
   * Category
4. Click **Save**

---

### Add Category

1. Enter a category name in the **New Category** field
2. The category will be added automatically
3. Use categories to organize and filter websites

---

### Filter Websites

1. Click the filter icon
2. Select a category
3. Only websites from the selected category will be displayed

---

### Delete Website

1. Click the delete (X) button next to a website
2. The website will be removed permanently

---

## Data Storage

This extension uses Chrome's local storage system:

```
chrome.storage.local
```

Your data:

* Will remain saved after browser restart
* Is stored locally on your device
* Works without internet connection

---

## Website Logo System

Website icons are automatically fetched using Google's favicon service:

```
https://www.google.com/s2/favicons
```

This provides fast and reliable logo loading.

---

## Permissions Used

| Permission | Purpose                   |
| ---------- | ------------------------- |
| storage    | Save websites permanently |

---

## Future Improvements

Possible upgrades for this project include:

* Search functionality
* Dark mode support
* One-click save current tab
* Export and backup feature
* Drag and drop reordering
* Cloud synchronization

---

## Developer Information

Created by: **SHAN**
Project Name: **Website Saver**

---


