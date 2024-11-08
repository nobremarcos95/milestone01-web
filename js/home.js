




// EM BREVE: PRECISA AJUSTAR OS PONTOS! OU TIRA-LOS DE VEZ 
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
