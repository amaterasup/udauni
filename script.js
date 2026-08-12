var hariH = new Date("Aug 13, 2026 12:00:00");
const hitung_mundur = document.getElementsByClassName("hitung-mundur")[0];
fetchTime();
async function fetchTime() {
    try {
        // Fetch time from an API
        let response = await fetch("https://www.timeapi.io/api/timezone/zone?timeZone=Asia%2FJakarta");
        let data = await response.json();

        // Get current UTC time and offset
        console.log(data.currentLocalTime);
        let date = new Date(data.currentLocalTime);
        date = new Date();
        // Start the timer
        startTimer(date);

    } catch (error) {
        let date = new Date();
        startTimer(date);
        /*console.error("Error fetching time:", error);
        document.getElementsByClassName("hitung-mundur")[0].innerText = "Jaringan Hilang";
        document.getElementsByClassName("hitung-mundur")[0].style = "color:black;"*/
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

        hitung_mundur.innerHTML = cek(hari) + ' : ' + cek(jam) + ' : ' + cek(menit) + ' : ' + cek(detik);

        if (jangka <= 0) {
            hitung_mundur.innerHTML = "00 : 00 : 00 : 00";
            efek_ulang_tahun();
            return 0;
        }
    }
    if (UpdateTimer() == 0) {
        return;
    }
    setInterval(UpdateTimer(), 1000);
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
