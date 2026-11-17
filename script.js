
document.addEventListener("DOMContentLoaded", () => {

  const welcome = document.getElementById("welcome");
  const calendar = document.getElementById("calendar");
  const openButton = document.getElementById("open-button");
  const calendarGrid = document.getElementById("calendar-grid");

  const giftModal = document.getElementById("gift-modal");
  const closeModal = document.getElementById("close-modal");
  const giftDate = document.getElementById("gift-date");
  const giftTitle = document.getElementById("gift-title");
  const giftContent = document.getElementById("gift-content");

  // PRIMER REGALO: TU CARTA
  const gifts = {
  
1: {
  title: "A letter for you",
  type: "image",

    content: "./Assets/carta-bienvenida.png"
  },
  2: {
    title: "A song that reminds me of you",
    type: "song",
 
content: "Cada vez que escucho esta canción pienso en ti. Me recuerda lo bonito que es estar enamorada, y más si es de ti."
  },
  3: {
    title: "A sweet treat for you",
    type: "voucher",
    content: "Vale por un postre de tu elección, invitado por mí. ♡"
  }
};



// MUSICA DE NAVIDAD
const christmasMusic = document.getElementById("christmas-music");
const musicToggle = document.getElementById("music-toggle");

christmasMusic.volume = 0.45;

function updateMusicButton() {
  musicToggle.textContent = christmasMusic.paused
    ? "♫ PLAY MUSIC"
    : "♫ PAUSE MUSIC";
}

musicToggle.addEventListener("click", () => {
  if (christmasMusic.paused) {
    christmasMusic.play().catch(() => {});
  } else {
    christmasMusic.pause();
  }
});

christmasMusic.addEventListener("play", updateMusicButton);
christmasMusic.addEventListener("pause", updateMusicButton);

  // ABRIR BIENVENIDA
  openButton.addEventListener("click", () => {musicToggle.hidden = false;
christmasMusic.play().catch(() => {
  updateMusicButton();
});

    if (welcome.classList.contains("opening")) {
      return;
    }

    welcome.classList.add("opening");
    openButton.disabled = true;

    setTimeout(() => {

      welcome.classList.add("hidden");
      calendar.classList.remove("hidden");

      createCalendar();
      window.scrollTo(0, 0);

    }, 1100);

  });

  // DESBLOQUEAR SEGÚN FECHA
 



const TEST_MODE = false; // Calendario listo para entregar

function isUnlocked(day) {
  if (TEST_MODE) return true;

  const today = new Date();
  const unlockDate = new Date(2026, 11, day);

  return today >= unlockDate;
}


  // CREAR LOS 24 REGALOS

  // RECORDAR LOS REGALOS QUE LUCÍA YA ABRIÓ

  const openedGifts = JSON.parse(
    localStorage.getItem("lucia-opened-gifts-test") || "[]"
  );

  function saveOpenedGift(day) {
    if (!openedGifts.includes(day)) {
      openedGifts.push(day);

      localStorage.setItem(
        "lucia-opened-gifts-test",
        JSON.stringify(openedGifts)
      );
    }
  }

  function createCalendar() {

    calendarGrid.innerHTML = "";

    for (let day = 1; day <= 24; day++) {

      const button = document.createElement("button");
      const unlocked = isUnlocked(day);

      button.className = "gift";

if (openedGifts.includes(day)) {
  button.classList.add("gift-opened");
}

      button.disabled = !unlocked;

      


button.innerHTML = `
  <span class="gift-number">${day}</span>

  <img
    src="./Assets/dia-${String(day).padStart(2, "0")}.png"
    alt=""
    class="gift-illustration ${day === 16 ? "bonnie-illustration" : ""}"
    draggable="false"
  >

  <span class="gift-status">
    ${unlocked ? "OPEN GIFT" : "COMING SOON"}
  </span>


<span class="gift-paper gift-paper-left" aria-hidden="true">
  <span class="gift-paper-content">
    <span class="gift-number">${day}</span>
    <img
      src="./Assets/dia-${String(day).padStart(2, "0")}.png"
      alt=""
      class="gift-illustration ${day === 16 ? "bonnie-illustration" : ""}"
      draggable="false"
    >
    <span class="gift-status">
      ${unlocked ? "OPEN GIFT" : "COMING SOON"}
    </span>
  </span>
</span>

<span class="gift-paper gift-paper-right" aria-hidden="true">
  <span class="gift-paper-content">
    <span class="gift-number">${day}</span>
    <img
      src="./Assets/dia-${String(day).padStart(2, "0")}.png"
      alt=""
      class="gift-illustration ${day === 16 ? "bonnie-illustration" : ""}"
      draggable="false"
    >
    <span class="gift-status">
      ${unlocked ? "OPEN GIFT" : "COMING SOON"}
    </span>
  </span>
</span>

`;




      if (unlocked) {
        button.addEventListener("click", () => openGift(day));
      }

      calendarGrid.appendChild(button);
    }
  }

  // ABRIR REGALO
  function openGift(day) {

    if (!isUnlocked(day)) return;



    const gift = gifts[day];

    giftDate.textContent =
      `DECEMBER ${String(day).padStart(2, "0")}`;

    giftContent.innerHTML = "";

    if (gift) {

      giftTitle.textContent = gift.title;

      if (gift.type === "image") {

        const img = document.createElement("img");
        img.src = gift.content;
        img.alt = gift.title;

        giftContent.appendChild(img);

      } else if (gift.type === "text") {

        const p = document.createElement("p");
        p.textContent = gift.content;

 
        giftContent.appendChild(p);

      } else if (gift.type === "song") {

        // Pausar Snowman al abrir el regalo musical


const vinylCover = document.createElement("div");
vinylCover.className = "vinyl-cover";

const coverText = document.createElement("div");
coverText.className = "vinyl-cover-text";

coverText.innerHTML = `
  <span class="vinyl-edition">THE LUCÍA EDITION · 2026</span>
  <h3>LOVE NEVER<br>FELT SO GOOD</h3>
  <p>MICHAEL JACKSON & JUSTIN TIMBERLAKE</p>
  <span class="vinyl-signature">For Lucía, from Mariana ♡</span>
`;

const vinyl = document.createElement("div");
vinyl.className = "vinyl-record";

vinylCover.appendChild(coverText);
vinylCover.appendChild(vinyl);
giftContent.appendChild(vinylCover);

        christmasMusic.pause();

        const dedication = document.createElement("p");
        dedication.textContent = gift.content;
        dedication.className = "song-dedication";

        giftContent.appendChild(dedication);

const spotifyPlayer = document.createElement("iframe");

spotifyPlayer.src = "https://open.spotify.com/embed/track/48td6xvpokdYwvbl3JIiXP";
spotifyPlayer.width = "100%";
spotifyPlayer.height = "152";
spotifyPlayer.style.border = "none";
spotifyPlayer.style.borderRadius = "12px";
spotifyPlayer.style.marginTop = "20px";
spotifyPlayer.allow = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
spotifyPlayer.loading = "lazy";
spotifyPlayer.title = "Love Never Felt So Good - Michael Jackson & Justin Timberlake";

giftContent.appendChild(spotifyPlayer);

giftContent.appendChild(spotifyPlayer);

      } else if (gift.type === "voucher") {

        const voucher = document.createElement("div");
        voucher.className = "sweet-voucher";

        voucher.innerHTML = `
          <div class="voucher-top">
            <span>MARIANA'S SWEET TREATS</span>
            <span>NO. 003</span>
          </div>


<div class="voucher-cake" aria-hidden="true">
  <div class="cake-cherry"></div>
  <div class="cake-top"></div>
  <div class="cake-bottom"></div>
  <div class="cake-plate"></div>
</div>

          <div class="voucher-label">A LITTLE SOMETHING SWEET</div>

          <h3>ONE SWEET<br>TREAT</h3>

          <p class="voucher-message"></p>

          <div class="voucher-bottom">
            <span>EXCLUSIVELY FOR LUCÍA</span>
            <span>NO EXPIRATION</span>
          </div>
        `;

        voucher.querySelector(".voucher-message").textContent =
          gift.content;

        giftContent.appendChild(voucher);

const saveVoucherButton = document.createElement("button");
saveVoucherButton.className = "save-voucher-button";
saveVoucherButton.textContent = "Save my sweet treat ♡";

saveVoucherButton.addEventListener("click", async () => {

  saveVoucherButton.disabled = true;
  saveVoucherButton.textContent = "Preparing your sweet treat... ♡";

  try {
    const canvas = await html2canvas(voucher, {
      backgroundColor: "#f4e9d5",
      scale: 2,
      useCORS: true
    });

    const image = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = image;
    link.download = "Vale-para-Lucia.png";

    document.body.appendChild(link);
    link.click();
    link.remove();

  } catch (error) {
    console.error("Error al guardar el vale:", error);
    alert("No se pudo guardar el vale. Inténtalo de nuevo.");
  } finally {
    saveVoucherButton.disabled = false;
    saveVoucherButton.textContent = "Save my sweet treat ♡";
  }

});

giftContent.appendChild(saveVoucherButton);

      }

    } else {



      giftTitle.textContent = "A little surprise";
      giftContent.innerHTML =
        "<p>Something special is waiting for you.</p>";

    }

   
const sticker = calendarGrid.querySelectorAll(".gift")[day - 1];

if (sticker && !sticker.classList.contains("gift-opened")) {
  sticker.classList.add("gift-tearing");


setTimeout(() => {
  sticker.classList.remove("gift-tearing");
  sticker.classList.add("gift-opened");

  saveOpenedGift(day);

  giftModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}, 850);

} else {
  giftModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

  }

  // CERRAR REGALO
  function hideGift() {
    giftModal.classList.add("hidden");
    document.body.style.overflow = "";
  }

  closeModal.addEventListener("click", hideGift);

  giftModal.addEventListener("click", (event) => {
    if (event.target === giftModal) hideGift();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") hideGift();
  });

});


/* CUENTA REGRESIVA PARA NAVIDAD */

function updateChristmasCountdown() {
  const countdown = document.getElementById("christmas-countdown");
  const timer = document.getElementById("countdown-timer");

  if (!countdown || !timer) return;

  const now = new Date();
  const christmasStart = new Date(2026, 11, 1, 0, 0, 0);
  const difference = christmasStart - now;

  if (difference <= 0) {
    countdown.style.display = "none";
    return;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);


timer.innerHTML = `
  <div class="countdown-unit">
    <span class="countdown-number">${days}</span>
    <span class="countdown-label">DAYS</span>
  </div>
  <div class="countdown-unit">
    <span class="countdown-number">${String(hours).padStart(2, "0")}</span>
    <span class="countdown-label">HOURS</span>
  </div>
  <div class="countdown-unit">
    <span class="countdown-number">${String(minutes).padStart(2, "0")}</span>
    <span class="countdown-label">MINUTES</span>
  </div>
  <div class="countdown-unit">
    <span class="countdown-number">${String(seconds).padStart(2, "0")}</span>
    <span class="countdown-label">SECONDS</span>
  </div>
`;

}

updateChristmasCountdown();
setInterval(updateChristmasCountdown, 1000);
