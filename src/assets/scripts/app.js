"use strict";

document.addEventListener("DOMContentLoaded", function () {
  fetch("assets/library/library.json")
      .then((response) => response.json())
      .then((data) => {
          displayBooks(data);
          setupFilters();
      })
      .catch((error) => console.error("Error fetching data:", error));
});

function displayBooks(books) {
  const bookContainer = document.querySelector(".book_container");

  const templateElement = document.getElementById("book-template");
  const bookTemplate = templateElement.innerHTML;

  books.forEach((book) => {
      const filledTemplate = fillTemplate(bookTemplate, book);
      const newBookElement = createBookElement(filledTemplate);
      bookContainer.appendChild(newBookElement);
  });
}

function fillTemplate(template, data) {
  return template.replace(/{{\s*(\w+)\s*}}/g, (match, key) => {
      return data[key] || match;
  });
}

function createBookElement(html) {
  const newBookDiv = document.createElement("div");
  newBookDiv.className = "book_item";

  newBookDiv.innerHTML = html;

  return newBookDiv;
}

function setupFilters() {
  const filterDropdown = document.getElementById("filterDropdown");

  filterDropdown.addEventListener("change", function () {
      const filterValue = this.value;
      filterBooks(filterValue);
  });
}


