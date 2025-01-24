// Data de início do relacionamento
const startDate = new Date('2014-07-05T00:00:00'); // Ajuste para sua data de início
const targetDateReencontro = new Date('2025-06-01T00:00:00'); // Data do reencontro

// Função para atualizar o cronômetro de tempo desde o início
function updateCountdownInicio() {
    const now = new Date();
    const timeElapsed = now - startDate;

    // Calcular os dias totais
    const days = Math.floor(timeElapsed / (1000 * 60 * 60 * 24));

    // Calcular anos e meses
    const years = Math.floor(days / 365); // Considera que o ano tem 365 dias
    const months = Math.floor((days % 365) / 30); // Considera que o mês tem 30 dias

    // Calcular horas, minutos e segundos
    const hours = Math.floor((timeElapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeElapsed % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeElapsed % (1000 * 60)) / 1000);

    // Exibir os valores no HTML
    document.getElementById('days-inicio').textContent = days;
    document.getElementById('hours-inicio').textContent = hours;
    document.getElementById('minutes-inicio').textContent = minutes;
    document.getElementById('seconds-inicio').textContent = seconds;
    
    // Exibir anos e meses
    document.getElementById('years-inicio').textContent = years;
    document.getElementById('months-inicio').textContent = months;
}

// Chamar a função para atualizar o cronômetro a cada segundo
setInterval(updateCountdownInicio, 1000);


// Função para atualizar o cronômetro de contagem regressiva para o reencontro
function updateCountdownReencontro() {
    const now = new Date();
    const timeRemaining = targetDateReencontro - now;

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    document.getElementById('days-reencontro').textContent = days < 0 ? "00" : days;
    document.getElementById('hours-reencontro').textContent = hours < 0 ? "00" : hours;
    document.getElementById('minutes-reencontro').textContent = minutes < 0 ? "00" : minutes;
    document.getElementById('seconds-reencontro').textContent = seconds < 0 ? "00" : seconds;
}

// Atualiza os cronômetros a cada segundo
setInterval(updateCountdownInicio, 1000);
setInterval(updateCountdownReencontro, 1000);

// Inicializa os cronômetros
updateCountdownInicio();
updateCountdownReencontro();

document.addEventListener("DOMContentLoaded", () => {
    const carouselImages = document.querySelectorAll(".carousel-slide img");
    carouselImages.forEach(image => {
        image.addEventListener("click", () => {
            const fullImageSrc = image.getAttribute("data-full-image");
            modalImage.src = fullImageSrc;
            modal.style.display = "block";
            modal.setAttribute("aria-hidden", "false");
        });
    });
});

// Elementos do carrossel
const carouselTrack = document.querySelector(".carousel-track");
const carouselSlides = Array.from(carouselTrack.children);
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

// Elementos do modal
const modal = document.getElementById("image-modal");
const modalImage = document.getElementById("modal-image");
const closeModal = document.getElementById("close-modal");

// Elemento do carrossel principal (para ajustar o tamanho)
const carousel = document.querySelector(".carousel");

// Controle do índice atual
let currentIndex = 0;

// Atualizar a posição do carrossel
function updateCarousel(index) {
  const slideWidth = carouselSlides[0].getBoundingClientRect().width;
  const newTranslateX = -slideWidth * index;

  carouselTrack.style.transform = `translateX(${newTranslateX}px)`;
  adjustCarouselHeight(); // Ajustar a altura do carrossel
}

// Configuração inicial do carrossel (alinhamento das imagens)
carouselSlides.forEach((slide, index) => {
  slide.style.left = `${index * 100}%`;
});

// Ajustar a altura do carrossel dinamicamente
function adjustCarouselHeight() {
  const currentSlide = carouselSlides[currentIndex];
  const currentImage = currentSlide.querySelector("img");

  // Calcula a altura proporcional da imagem atual
  const imageHeight = currentImage.naturalHeight * (currentImage.width / currentImage.naturalWidth);

  // Ajusta a altura do box do carrossel
  carousel.style.height = `${imageHeight}px`;
}

// Navegar para a imagem anterior
prevButton.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + carouselSlides.length) % carouselSlides.length;
  updateCarousel(currentIndex);
});

// Navegar para a próxima imagem
nextButton.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % carouselSlides.length;
  updateCarousel(currentIndex);
});

// Abrir o modal com a imagem ampliada
carouselSlides.forEach((slide, index) => {
  const img = slide.querySelector("img");
  img.addEventListener("click", () => {
    currentIndex = index;
    modalImage.src = img.getAttribute("data-full-image");
    modal.style.display = "block";

    // Ajusta a altura do modal proporcionalmente à imagem
    adjustModalHeight();
  });
});

// Ajustar a altura do modal dinamicamente
function adjustModalHeight() {
  const imageHeight = modalImage.naturalHeight * (modalImage.width / modalImage.naturalWidth);
  modalImage.style.maxHeight = `${imageHeight}px`;
}

// Fechar o modal
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Fechar o modal ao clicar fora da imagem
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Ajustar a altura do carrossel ao carregar a página
window.addEventListener("load", () => {
  adjustCarouselHeight();
});

// Ajustar a altura do carrossel ao redimensionar a janela
window.addEventListener("resize", () => {
  adjustCarouselHeight();
});

// Função para gerar corações caindo
function generateFallingHearts() {
    const container = document.getElementById("falling-hearts-container");
    const numberOfHearts = 30; // Quantidade de corações que você quer gerar
    const heartSize = ['1.5rem', '2rem', '2.5rem']; // Diferentes tamanhos de corações para variação
    const delayTime = ['0s', '0.5s', '1s']; // Atraso na animação para criar variação
  
    for (let i = 0; i < numberOfHearts; i++) {
      const heart = document.createElement("span");
      heart.textContent = "❤️"; // O ícone de coração
      heart.classList.add("falling-heart");
  
      // Estiliza os corações com variação de tamanho e delay
      heart.style.left = `${Math.random() * 100}vw`; // Posição aleatória horizontal
      heart.style.animationDelay = `${Math.random() * 2}s`; // Atraso aleatório para a animação
      heart.style.fontSize = heartSize[Math.floor(Math.random() * heartSize.length)]; // Variação de tamanho
  
      container.appendChild(heart);
  
      // Remove o coração após a animação terminar (opcional, para evitar excesso de elementos na tela)
      setTimeout(() => {
        heart.remove();
      }, 3000); // A animação dura 3 segundos
    }
  }
  
  // Chama a função quando a página carrega
  window.addEventListener('load', generateFallingHearts);