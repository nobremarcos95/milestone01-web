document.addEventListener('DOMContentLoaded', () => {
  const cartCounter = document.querySelector('.cart-counter'); // Seleciona o contador

  // Função para carregar o carrinho do sessionStorage
  function loadCart() {
    let cart = sessionStorage.getItem('cart');
    if (cart) return JSON.parse(cart);
    return [];
  }

    // Função para salvar o carrinho no sessionStorage
    function saveCart(cart) {
      sessionStorage.setItem('cart', JSON.stringify(cart));
    }

    // Função para atualizar o contador de itens
    function updateCartCounter() {
      const cart = loadCart();
      const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
      cartCounter.textContent = itemCount; // Atualiza o texto do contador com a quantidade de itens
    }

    // Função para adicionar item ao carrinho
    function addToCart(combo) {
      let cart = loadCart();
      existingItemIndex = cart.findIndex(item => item.name === combo.name);

      if (existingItemIndex !== -1) {
        // Se existir, incrementar a quantidade
        cart[existingItemIndex].quantity += 1;
      } else {
        // Se não existir, adicionar ao carrinho com quantidade 1
        combo.quantity = 1;
        cart.push(combo);
      }
      saveCart(cart);
      updateCartCounter(); // Atualiza o contador após adicionar um item
      alert(`"${combo.name}" foi adicionado ao carrinho!`);
    }

    // Função para remover item do carrinho
    function removeFromCart(index) {
      let cart = loadCart();
      if (cart[index].quantity > 1) {
        // Se a quantidade for maior que 1, diminuir a quantidade
        cart[index].quantity -= 1;
      } else {
        // Se a quantidade for 1, remover o item do carrinho
        cart.splice(index, 1);
      }
      saveCart(cart);
      updateCartCounter();
    }

    // Selecionar todos os botões de adicionar
    const addButtons = document.querySelectorAll('.add-button');

    addButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Encontrar o elemento pai que contém os dados do combo
        const comboContainer = button.closest('.combo-container');
        const comboName = comboContainer.getAttribute('data-name');
        const comboPrice = comboContainer.getAttribute('data-price');
        const comboDescription = comboContainer.querySelector('.combo-text').innerText;

        const combo = {
          name: comboName,
          price: comboPrice,
          description: comboDescription
        };

        addToCart(combo);
      });
    });

    // Função para exibir o conteúdo do carrinho
    function displayCartContents() {
      const cart = loadCart();
      if (cart.length === 0) {
        return '<p>O carrinho está vazio.</p>';
      }

      let cartHTML = '<ul>';
        cart.forEach((item, index) => {
            cartHTML += `
                <li>
                  ${item.name} (x${item.quantity}) - R$ ${(item.price * item.quantity).toFixed(2)}
                  <button class="remove-button" data-index="${index}">Remover</button>
                </li>`;
        });
        cartHTML += '</ul>';
        return cartHTML;
    }

    // Manipular hover sobre o ícone do carrinho
    const cartIcon = document.querySelector('.cart-icon');

    // Criar um div para exibir o conteúdo do carrinho
    const cartContentsDiv = document.createElement('div');
    cartContentsDiv.classList.add('cart-contents');
    cartContentsDiv.style.display = 'none';
    cartContentsDiv.style.position = 'absolute';
    cartContentsDiv.style.top = '100%';
    cartContentsDiv.style.right = '0';
    cartContentsDiv.style.backgroundColor = '#fff';
    cartContentsDiv.style.border = '1px solid #ccc';
    cartContentsDiv.style.padding = '10px';
    cartContentsDiv.style.zIndex = '1000';

    // Adicionar o div ao cart-icon
    cartIcon.style.position = 'relative'; // Garantir que o cart-icon é o pai posicionado
    cartIcon.appendChild(cartContentsDiv);

    // Funções para mostrar e esconder o carrinho
    function showCart() {
        cartContentsDiv.innerHTML = displayCartContents();
        cartContentsDiv.style.display = 'block';
    }

    function hideCart() {
        cartContentsDiv.style.display = 'none';
    }

    // Mostrar o carrinho ao passar o mouse sobre o ícone ou o conteúdo do carrinho
    cartIcon.addEventListener('mouseenter', showCart);
    cartContentsDiv.addEventListener('mouseenter', showCart);

    // Esconder o carrinho ao sair do ícone e do conteúdo do carrinho
    cartIcon.addEventListener('mouseleave', hideCart);
    cartContentsDiv.addEventListener('mouseleave', hideCart);

    // Delegação de eventos para os botões de remoção
    cartContentsDiv.addEventListener('click', (event) => {
      if (event.target.classList.contains('remove-button')) {
        event.stopPropagation();
        const index = event.target.getAttribute('data-index');
        removeFromCart(index);

        // Atualizar o conteúdo do carrinho após a remoção
        cartContentsDiv.innerHTML = displayCartContents();
      }
    });
});
