document.addEventListener("DOMContentLoaded", function () {
    // Lista de combos para serem exibidos dinamicamente
    const combos = [
        { image: "images/combo1.svg", name: "Combo 1", description: ["1 pipoca grande", "1 pipoca média", "1 refri"], price: "50.00" },
        { image: "images/combo2.svg", name: "Combo 2", description: ["1 refri", "1 lanche", "1 doce"], price: "40.00" },
        { image: "images/combo3.svg", name: "Combo 3", description: ["2 refris médios"], price: "30.00" },
        { image: "images/combo4.svg", name: "Combo 4", description: ["2 refris", "2 lanches"], price: "50.00" },
        { image: "images/combo5.svg", name: "Combo 5", description: ["1 pipoca gigante", "1 refri", "2 doces"], price: "60.00" },
        { image: "images/combo6.svg", name: "Combo 6", description: ["1 refil de pipoca", "1 doce"], price: "65.00" }
    ];

    const comboContainerWrapper = document.querySelector(".combo-container-wrapper");

    combos.forEach(combo => {
        const comboContainer = document.createElement("div");
        comboContainer.classList.add("combo-container");
        comboContainer.setAttribute("data-name", combo.name);
        comboContainer.setAttribute("data-price", combo.price);

        const comboImage = document.createElement("img");
        comboImage.src = combo.image;
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
