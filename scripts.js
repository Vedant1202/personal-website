let currentIndex = 0;

function navigateTo(index) {
    const container = document.querySelector('.sections-container');
    currentIndex = index;
    container.style.transform = `translateX(-${index * 100}vw)`;
}
