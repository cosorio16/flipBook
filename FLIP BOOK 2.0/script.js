document.addEventListener("DOMContentLoaded", () => {
  const sheets = document.querySelectorAll(".sheet");
  const pages = document.querySelectorAll(".page");
  const totalPages = pages.length;
  const totalSheets = sheets.length;
  const botones = document.querySelectorAll("button");

  let currentSheet = 0;
  let baseZIndex = 999;

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  pages.forEach((p) => {
    const color = getRandomColor();
    p.style.backgroundColor = color;
  });

  sheets.forEach((e, index) => {
    e.style.zIndex = totalSheets - index;
  });

  for (let i = 0; i < totalPages; i++) {
    pages[i].classList.add(`page${i + 1}`);
  }

  for (let i = 0; i < totalSheets; i++) {
    sheets[i].classList.add(`sheet${i + 1}`);
  }

  let desplazamientoDeshabilitado = false;

  botones[0].addEventListener("click", () => {
    if (!desplazamientoDeshabilitado && currentSheet < totalSheets) {
      desplazamientoDeshabilitado = true;
      sheets[currentSheet].classList.add("flip");
      setTimeout(() => {
        sheets[currentSheet].style.zIndex = 0;
        currentSheet++;
        desplazamientoDeshabilitado = false;
      }, 500);
    }
  });

  botones[1].addEventListener("click", () => {
    if (!desplazamientoDeshabilitado && currentSheet > 0) {
      desplazamientoDeshabilitado = true;
      currentSheet--;
      sheets[currentSheet].style.zIndex = baseZIndex++;
      sheets[currentSheet].classList.remove("flip");
      setTimeout(() => {
        desplazamientoDeshabilitado = false;
      }, 500);
    }
  });

  sheets.forEach((sh) => {
    sh.addEventListener("touchstart", function (e) {
      initialX = e.touches[0].clientX;
    });
  });

  sheets.forEach((pag) => {
    pag.addEventListener("touchmove", function (e) {
      if (initialX === null || desplazamientoDeshabilitado) {
        return;
      }

      var currentX = e.touches[0].clientX;
      var diffX = initialX - currentX;

      if (diffX > 0) {
        if (currentSheet < totalSheets) {
          desplazamientoDeshabilitado = true;
          sheets[currentSheet].classList.add("flip");
          setTimeout(() => {
            sheets[currentSheet].style.zIndex = 0;
            currentSheet++;

            desplazamientoDeshabilitado = false;
          }, 500);
        }
      } else {
        if (currentSheet > 0) {
          desplazamientoDeshabilitado = true;
          currentSheet--;
          sheets[currentSheet].style.zIndex = baseZIndex++;
          sheets[currentSheet].classList.remove("flip");
          setTimeout(() => {
            desplazamientoDeshabilitado = false;
          }, 500);
        }
      }

      initialX = null;
    });
  });
});
