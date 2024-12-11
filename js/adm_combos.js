// Seletores dos elementos relevantes
const comboChoice = document.getElementById('combos-choice');
const deleteButton = document.getElementById('delete-combo');
const comboDetails = document.querySelector('.combo-details');
const comboForm = document.getElementById('combo-form');
const saveButton = document.getElementById('save-combo');
const addComboButton = document.getElementById('add-combo');
const comboDatalist = document.getElementById('combos'); // Datalist para os combos

let combosData;

// Limpar o campo de seleção de combo ao carregar a página
window.addEventListener('load', async function () {
    comboChoice.value = ""; // Define o campo como vazio
});

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
async function updateDatalist() {
    comboDatalist.innerHTML = ""; // Limpar o datalist atual

    const promise = await fetch('http://localhost:3000/list-combos', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
    combosData = await promise.json();
    combosData.forEach((combo) => {
        const option = document.createElement('option');
        option.value = combo.name;
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
saveButton.addEventListener('click', async function () {
    const comboName = comboForm["combo-name"].value;
    const comboPrice = comboForm["combo-price"].value;
    const comboDescription = comboForm["combo-description"].value;

    if (comboName && comboPrice) {
        const data = {
            name: comboName,
            description: comboDescription.split(', '),
            price: comboPrice,
        };

        const promise = await fetch('http://localhost:3000/add-combo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const response = await promise.json();
        console.log('oi', response);
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
