// Seletores dos elementos relevantes
const comboChoice = document.getElementById('combos-choice');
const deleteButton = document.getElementById('delete-combo');
const comboDetails = document.querySelector('.combo-details');
const comboForm = document.getElementById('combo-form');
const saveButton = document.getElementById('save-combo');
const addComboButton = document.getElementById('add-combo');
const comboDatalist = document.getElementById('combos'); // Datalist para os combos

// Limpar o campo de seleção de combo ao carregar a página
window.addEventListener('load', function () {
    comboChoice.value = ""; // Define o campo como vazio
});

// Dados simulados para os combos existentes
const combosData = {
    "Combo 01": { name: "Combo 01", price: 15.99, description: "Pipoca pequena + refrigerante pequeno", image: "" },
    "Combo 02": { name: "Combo 02", price: 22.99, description: "Pipoca média + refrigerante médio", image: "" },
    "Combo 03": { name: "Combo 03", price: 29.99, description: "Pipoca grande + refrigerante grande", image: "" },
};

// Função para exibir os detalhes de um combo selecionado
function displayComboDetails(comboName) {
    const combo = combosData[comboName];

    if (combo) {
        // Preencher os campos do formulário com os dados do combo
        comboForm["combo-name"].value = combo.name;
        comboForm["combo-price"].value = combo.price;
        comboForm["combo-description"].value = combo.description;
        document.getElementById('combo-image').src = combo.image || "placeholder.png";

        // Tornar os detalhes visíveis
        comboDetails.style.display = 'block';

        // Mostrar o botão "Deletar"
        deleteButton.style.display = 'inline-block';
    }
}

// Função para atualizar o datalist com os combos existentes
function updateDatalist() {
    comboDatalist.innerHTML = ""; // Limpar o datalist atual
    Object.keys(combosData).forEach(comboName => {
        const option = document.createElement('option');
        option.value = comboName;
        comboDatalist.appendChild(option);
    });
}

// Atualizar a lista inicialmente
updateDatalist();

// Evento para quando um combo existente é selecionado
comboChoice.addEventListener('change', function () {
    const selectedCombo = comboChoice.value;

    if (combosData[selectedCombo]) {
        displayComboDetails(selectedCombo);
    } else {
        // Esconder os detalhes caso nenhum combo válido seja selecionado
        comboDetails.style.display = 'none';
    }
});

// Evento para adicionar um novo combo
addComboButton.addEventListener('click', function () {
    // Limpar o formulário
    comboForm.reset();
    document.getElementById('combo-image').src = "placeholder.png";

    // Exibir os detalhes do combo
    comboDetails.style.display = 'block';

    // Esconder o botão "Deletar" para novos combos
    deleteButton.style.display = 'none';
});

// Evento para salvar um combo (simulação)
saveButton.addEventListener('click', function () {
    const comboName = comboForm["combo-name"].value;
    const comboPrice = parseFloat(comboForm["combo-price"].value);
    const comboDescription = comboForm["combo-description"].value;

    if (comboName && !isNaN(comboPrice)) {
        combosData[comboName] = {
            name: comboName,
            price: comboPrice,
            description: comboDescription,
            image: document.getElementById('combo-image').src,
        };
        alert(`Combo "${comboName}" foi salvo com sucesso!`);

        // Atualizar o datalist
        updateDatalist();
    } else {
        alert("Por favor, preencha todos os campos obrigatórios.");
    }
});

// Evento para deletar um combo
deleteButton.addEventListener('click', function () {
    const comboName = comboForm["combo-name"].value;

    if (comboName && combosData[comboName]) {
        delete combosData[comboName];
        alert(`Combo "${comboName}" foi deletado!`);

        // Atualizar o datalist
        updateDatalist();

        // Esconder o formulário
        comboDetails.style.display = 'none';
        comboChoice.value = "";
    } else {
        alert("Erro ao tentar deletar o combo.");
    }
});
