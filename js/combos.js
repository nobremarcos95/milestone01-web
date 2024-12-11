document.addEventListener("DOMContentLoaded", async function () {
    // Lista de combos para serem exibidos dinamicamente
    const placeholderImages = [
      { image: "images/combo1.svg" },
      { image: "images/combo2.svg" },
      { image: "images/combo3.svg" },
      { image: "images/combo4.svg" },
      { image: "images/combo5.svg" },
      { image: "images/combo6.svg" },
    ];

    const promise = await fetch('http://localhost:3000/list-combos', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const combos = await promise.json();

    const comboContainerWrapper = document.querySelector(".combo-container-wrapper");

    combos.forEach((combo, index) => {
      const comboContainer = document.createElement("div");
      comboContainer.classList.add("combo-container");
      comboContainer.setAttribute("data-name", combo.name);
      comboContainer.setAttribute("data-price", combo.price);

      const comboImage = document.createElement("img");
      const imgIndex = index >= placeholderImages.length ? 1 : index;
      comboImage.src = placeholderImages[imgIndex].image;
      comboImage.alt = combo.name;
      comboContainer.appendChild(comboImage);

      const comboBottom = document.createElement("div");
      comboBottom.classList.add("combo-container-bottom");

      const comboText = document.createElement("div");
      comboText.classList.add("combo-text");
      comboText.innerHTML = combo.description.join("<br>");
      comboBottom.appendChild(comboText);

      const addButton = document.createElement("img");
      addButton.src = "images/add-button.svg";
      addButton.alt = "add-button";
      addButton.classList.add("add-button"); // Adiciona a classe para identificar no cart.js
      comboBottom.appendChild(addButton);

      comboContainer.appendChild(comboBottom);

      const comboPrice = document.createElement("h3");
      comboPrice.textContent = `R$ ${combo.price}`;
      comboContainer.appendChild(comboPrice);

      comboContainerWrapper.appendChild(comboContainer);
    });
});
