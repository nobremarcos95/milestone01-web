document.addEventListener("DOMContentLoaded", function () {
    // Lista de combos para serem exibidos dinamicamente
    const combos = [
        { image: "images/combo1.svg", description: ["1 pipoca grande", "1 pipoca média", "1 refri"], price: "R$ 50,00" },
        { image: "images/combo2.svg", description: ["1 refri", "1 lanche", "1 doce"], price: "R$ 40,00" },
        { image: "images/combo3.svg", description: ["2 refris médios"], price: "R$ 30,00" },
        { image: "images/combo4.svg", description: ["2 refris", "2 lanches"], price: "R$ 50,00" },
        { image: "images/combo5.svg", description: ["1 pipoca gigante", "1 refri", "2 doces"], price: "R$ 60,00" },
        { image: "images/combo6.svg", description: ["1 refil de pipoca", "1 doce"], price: "R$ 65,00" }
    ];

    // Seleciona o contêiner onde os combos serão adicionados
    const comboContainerWrapper = document.querySelector(".combo-container-wrapper");

    // Função para criar cada combo dinamicamente
    combos.forEach(combo => {
        const comboContainer = document.createElement("div");
        comboContainer.classList.add("combo-container");

        // Imagem do combo
        const comboImage = document.createElement("img");
        comboImage.src = combo.image;
        comboImage.alt = `Combo ${combo.description.join(", ")}`;
        comboContainer.appendChild(comboImage);

        // Parte inferior do contêiner do combo
        const comboBottom = document.createElement("div");
        comboBottom.classList.add("combo-container-bottom");

        // Texto do combo
        const comboText = document.createElement("div");
        comboText.classList.add("combo-text");
        comboText.innerHTML = combo.description.join("<br>");
        comboBottom.appendChild(comboText);

        // Botão de adicionar
        const addButton = document.createElement("img");
        addButton.src = "images/add-button.svg";
        addButton.alt = "add-button";
        comboBottom.appendChild(addButton);

        // Adiciona a parte inferior ao contêiner do combo
        comboContainer.appendChild(comboBottom);

        // Preço do combo
        const comboPrice = document.createElement("h3");
        comboPrice.textContent = combo.price;
        comboContainer.appendChild(comboPrice);

        // Adiciona o combo completo ao contêiner principal
        comboContainerWrapper.appendChild(comboContainer);
    });
});
