document.addEventListener("DOMContentLoaded", () => {
  const pages = document.querySelectorAll(".page");
  const nextButton = document.querySelector(".next");
  const backButton = document.querySelector(".back");
  const container = document.querySelector(".book");
  const rootStyles = document.documentElement.style;

  const size = pages.length / 2 - 1;
  console.log(size);

  let currentAncho = 0;
  let currentPage = -1;

  const rectangulo = container.getBoundingClientRect();
  const ancho = rectangulo.width;
  console.log(ancho);

  const result = size * ancho;
  console.log(result);

  nextButton.addEventListener("click", () => {
    if (currentAncho >= 0) {
      currentAncho = currentAncho + ancho;
      // rootStyles.setProperty("--slide-transform", `-${currentAncho}px`);
      currentPage += 2;
      console.log(currentPage);
      pages[currentPage].classList.add("rigth");
    }
    console.log(currentAncho);
  });

  backButton.addEventListener("click", () => {
    if (currentAncho >= ancho) {
      currentAncho = currentAncho - ancho;
      rootStyles.setProperty("--slide-transform", `-${currentAncho}px`);
      currentPage -= 2;
      console.log(currentPage);
    }
    console.log(currentAncho);
  });

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  pages.forEach((page) => {
    const randomColor = getRandomColor();
    page.style.backgroundColor = randomColor;
  });

  for (let i = 0; i < pages.length; i++) {
    pages[i].textContent = i + 1;
    pages[i].classList.add(`page${i + 1}`);
  }

  container.addEventListener("touchstart", function (e) {
    initialX = e.touches[0].clientX;
  });

  container.addEventListener("touchmove", function (e) {
    if (initialX === null) {
      return;
    }

    var currentX = e.touches[0].clientX;
    var diffX = initialX - currentX;

    if (diffX > 0) {
      currentAncho = currentAncho + ancho;
      rootStyles.setProperty("--slide-transform", `-${currentAncho}px`);
      console.log("Deslizado a la izquierda");
    } else {
      currentAncho = currentAncho - ancho;
      rootStyles.setProperty("--slide-transform", `-${currentAncho}px`);
      console.log("Deslizado a la derecha");
    }

    initialX = null;
  });
});
