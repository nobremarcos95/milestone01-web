const items = document.querySelectorAll('.carousel-item');
const dots_1 = document.querySelectorAll('.dot');
let currentIndex_1 = 0;

const showItem = (index) => {
    items.forEach((item, i) => {
        // Remove as classes de posição
        item.classList.remove('active', 'prev', 'next');
        if (i === index) {
            item.classList.add('active');
        } else if (i === (index === 0 ? items.length - 1 : index - 1)) {
            item.classList.add('prev'); // Item anterior à esquerda
        } else if (i === (index === items.length - 1 ? 0 : index + 1)) {
            item.classList.add('next'); // Próximo item à direita
        }
    });
    dots_1.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
};

const autoSlide = () => {
    currentIndex_1 = (currentIndex_1 + 1) % items.length;
    showItem(currentIndex_1);
};

// Inicia o carrossel automático
setInterval(autoSlide, 3000); // Altera a cada 3 segundos

// Inicialização para mostrar o primeiro item
showItem(currentIndex_1);

// Adiciona evento de clique nos dots_1 para controle manual
dots_1.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex_1 = index;
        showItem(currentIndex_1);
    });
});


// Em breve
const track = document.querySelector('.foreground-images');
const leftArrow = document.querySelector('.arrow-left');
const rightArrow = document.querySelector('.arrow-right');
const dots = Array.from(document.querySelectorAll('.dot'));

const images = Array.from(track.children);
const imageGroup = 3; // Número de imagens visíveis em cada grupo
const maxIndex = Math.ceil(images.length / imageGroup); // Número máximo de slides
let currentIndex = 0;

// Função para mover o carrossel e atualizar os dots
const moveCarousel = (direction) => {
    if (direction === 'left') {
        currentIndex = (currentIndex === 0) ? maxIndex - 1 : currentIndex - 1; // Cíclico à esquerda
    } else if (direction === 'right') {
        currentIndex = (currentIndex === maxIndex - 1) ? 0 : currentIndex + 1; // Cíclico à direita
    }

    // Calcula o novo deslocamento do carrossel
    const newTransform = `translateX(-${currentIndex * 100}%)`;
    track.style.transform = newTransform;

    // Atualiza os dots
    updateDots();
};

// Função para atualizar os dots
const updateDots = () => {
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
};

// Adiciona eventos para as setas
leftArrow.addEventListener('click', () => moveCarousel('left'));
rightArrow.addEventListener('click', () => moveCarousel('right'));

// Inicializa o estado dos dots
updateDots();
