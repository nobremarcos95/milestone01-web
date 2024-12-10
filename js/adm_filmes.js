// Função para lidar com o clique no botão "Editar Exibição"
document.querySelectorAll('.editar-btn').forEach(button => {
    button.addEventListener('click', () => {
        const filmeBloco = button.closest('.filme-bloco');

        // Expande o bloco e adiciona a classe para edição
        filmeBloco.classList.add('editando');

        // Oculta os elementos atuais do filme
        filmeBloco.querySelector('.conteudo-filme').style.display = 'none';

        // Cria os campos de edição dinâmicos
        const editContainer = document.createElement('div');
        editContainer.classList.add('edit-container');
        editContainer.innerHTML = `
            <label>
                Novo título: 
                <input type="text" class="novo-titulo" value="${filmeBloco.querySelector('.titulos').textContent}">
            </label>
            <label>
                Nova sinopse:
                <textarea class="nova-sinopse">${filmeBloco.querySelector('.descricao-filme').textContent.trim()}</textarea>
            </label>
            <label>
                Nova imagem (URL):
                <input type="text" class="nova-imagem" value="${filmeBloco.querySelector('.filme-img').src}">
            </label>
            <label>
                Novo preço:
                <input type="text" class="novo-preco" value="${filmeBloco.querySelector('.preco-filme').textContent.replace('R$ ', '').trim()}">
            </label>
            <button class="salvar-btn">Salvar</button>
        `;

        // Adiciona os campos ao bloco
        filmeBloco.appendChild(editContainer);

        // Função para lidar com o clique no botão "Salvar"
        editContainer.querySelector('.salvar-btn').addEventListener('click', () => {
            // Obtém os valores dos campos de edição
            const novoTitulo = editContainer.querySelector('.novo-titulo').value;
            const novaSinopse = editContainer.querySelector('.nova-sinopse').value;
            const novaImagem = editContainer.querySelector('.nova-imagem').value;
            const novoPreco = editContainer.querySelector('.novo-preco').value;

            // Atualiza os elementos originais com os novos valores
            filmeBloco.querySelector('.titulos').textContent = novoTitulo;
            filmeBloco.querySelector('.descricao-filme').textContent = novaSinopse;
            filmeBloco.querySelector('.filme-img').src = novaImagem;
            filmeBloco.querySelector('.preco-filme').textContent = `R$ ${novoPreco}`;

            // Remove o modo de edição
            editContainer.remove();
            filmeBloco.querySelector('.conteudo-filme').style.display = 'block';
            filmeBloco.classList.remove('editando');
        });
    });
});
