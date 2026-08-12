var hariH = new Date("Aug 13, 2026 12:00:00");
const hitung_mundur = document.getElementsByClassName("hitung-mundur")[0];
fetchTime();
async function fetchTime() {
    try {
        // Fetch time from an API
        let response = await fetch("https://www.timeapi.io/api/timezone/zone?timeZone=Asia%2FJakarta");
        let data = await response.json();

        // Get current UTC time and offset
        let date = new Date(data.currentLocalTime);
        // date = new Date();
        // Start the timer
        startTimer(date);

    } catch (error) {
        // let date = new Date();
        // startTimer(date);
        console.error("Error fetching time:", error);
        document.getElementsByClassName("hitung-mundur")[0].innerText = "Uda | Uni Ngelag";
        document.getElementsByClassName("hitung-mundur")[0].style = "color:wheat;"
    }
}
function startTimer(waktu) {
    function UpdateTimer() {
        var time = new Date(waktu);
        var jangka = hariH - time;
        var hari = Math.floor(jangka / (1000 * 60 * 60 * 24));
        var jam = Math.floor((jangka % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var menit = Math.floor((jangka % (1000 * 60 * 60)) / (1000 * 60));
        var detik = Math.floor((jangka % (1000 * 60)) / 1000);

        hitung_mundur.innerHTML = "Wait Uda & Uni<br>" + cek(hari) + ' : ' + cek(jam) + ' : ' + cek(menit) + ' : ' + cek(detik);

        if (jangka <= 0) {
            hitung_mundur.innerHTML = "00 : 00 : 00 : 00";
            buka()
            return 0;
        }
    }
    setInterval(UpdateTimer(waktu), 1000);
    if (UpdateTimer() == 0) {
        return;
    }
    fetchTime();
}
function cek(angka) {
    if (angka < 10) {
        return '0' + angka;
    }
    else {
        return angka;
    }
}
function buka(){
    hitung_mundur.style.display = "none";
    document.querySelector("body").style.background = "#faf8f3";
    // document.querySelector("body").style.background = "#ffb700";
    document.getElementsByClassName("supp")[0].style.display = "block";
}
const allImages = document.querySelectorAll(
    ".gallery img, .memory img, .mentor-card img, .hero-photo"
);
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeButton = document.getElementById("close");
allImages.forEach(image => {
    image.addEventListener("click", () => {
        lightboxImage.src = image.src;
        lightbox.classList.add("active");
    });
});
closeButton.addEventListener("click", () => {
    lightbox.classList.remove("active");
});
lightbox.addEventListener("click", event => {
    if (event.target === lightbox) {
        lightbox.classList.remove("active");
    }
});
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        lightbox.classList.remove("active");
    }
});
const timelineItems = document.querySelectorAll(".timeline-item");
const timelineObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    timelineObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15
        }
    );
timelineItems.forEach(item => {
    timelineObserver.observe(item);
});

const memories = document.querySelectorAll(".memory");
const memoryObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = "fadeUp 0.8s ease forwards";
                    memoryObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1
        }
    );
memories.forEach(memory => {
    memory.style.opacity = "0";
    memoryObserver.observe(memory);
});
document.addEventListener("click", event => {
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement("div");
        particle.className = "particle";
        particle.innerHTML = Math.random() > 0.5 ? "✦" : "•";
        particle.style.left = event.clientX + (Math.random() * 50 - 25) + "px";
        particle.style.top = event.clientY + (Math.random() * 30 - 15) + "px";
        particle.style.color = Math.random() > 0.5 ? "#a52b25" : "#c9946c";
        particle.style.animationDuration = (2 + Math.random() * 2) + "s";
        document.body.appendChild(particle);
        setTimeout(() => {
            particle.remove();
        }, 4000);
    }
});
window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const heroGallery = document.querySelector(".hero-gallery");
    if (heroGallery && scrollY < window.innerHeight) {
        heroGallery.style.transform = `translateY(${scrollY * 0.12}px)`;
    }
});