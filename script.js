document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     REVEAL ANIMATION
  ========================== */

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
      },
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("active");
    });
  }

  /* =========================
     BACK TO TOP
  ========================== */

  const topBtn = document.getElementById("topBtn");

  if (topBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        topBtn.classList.add("show");
      } else {
        topBtn.classList.remove("show");
      }
    });

    topBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  /* =========================
     MUSIC
  ========================== */

/* =========================
   MUSIC PLAYER
========================= */

const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const musicStatus = document.getElementById("musicStatus");

if (bgMusic && musicBtn) {

  musicBtn.addEventListener("click", async () => {

    try {

      if (bgMusic.paused) {

        await bgMusic.play();

        musicBtn.classList.add("playing");
        musicBtn.textContent = "❚❚";

        musicBtn.setAttribute(
          "aria-label",
          "Jeda musik"
        );

        if (musicStatus) {
          musicStatus.textContent = "NOW PLAYING";
        }

      } else {

        bgMusic.pause();

        musicBtn.classList.remove("playing");
        musicBtn.textContent = "♫";

        musicBtn.setAttribute(
          "aria-label",
          "Putar musik"
        );

        if (musicStatus) {
          musicStatus.textContent = "MUSIC PAUSED";
        }

      }

    } catch (error) {

      console.error("Musik gagal diputar:", error);

      if (musicStatus) {
        musicStatus.textContent = "MUSIC ERROR";
      }

    }

  });

}


  bgMusic.addEventListener("ended", () => {

    musicBtn.classList.remove("playing");

    if (musicPlayer) {
      musicPlayer.classList.remove("playing");
    }

    musicBtn.textContent = "♫";

    if (musicStatus) {
      musicStatus.textContent = "MUSIC OFF";
    }

  });


  bgMusic.addEventListener("error", () => {

    console.error(
      "File musik tidak ditemukan."
    );

    if (musicStatus) {
      musicStatus.textContent = "MUSIC ERROR";
    }

  });



  /* =========================
     MUSIC ERROR CHECK
  ========================== */

  bgMusic.addEventListener("error", () => {
    console.error("File musik tidak ditemukan atau tidak bisa dibaca.");
  });
});
