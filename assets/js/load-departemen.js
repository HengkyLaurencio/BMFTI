import departemen from "../data/departemen.js";

const container = document.getElementById("departemen-container");

departemen.forEach((dept) => {
    const section = document.createElement("section");
    section.classList.add("section");

    // Judul dan deskripsi
    section.innerHTML = `
        <h2>${dept.nama}</h2>
        <p>${dept.deskripsi}</p>
        <div class="card-container"></div>
    `;

    const cardContainer = section.querySelector(".card-container");

    // Kepala dan Wakil Kepala Departemen (jika ada)
    if (dept.kadep) {
        cardContainer.innerHTML += `
            <div class="card">
                <img src="${dept.kadep.foto}" alt="${dept.kadep.nama}" class="card__image">
                <h3 class="card__name">${dept.kadep.nama}</h3>
                <p class="card__role">Kepala Departemen</p>
            </div>
        `;
    }
    if (dept.wakadep) {
        cardContainer.innerHTML += `
            <div class="card">
                <img src="${dept.wakadep.foto}" alt="${dept.wakadep.nama}" class="card__image">
                <h3 class="card__name">${dept.wakadep.nama}</h3>
                <p class="card__role">Wakil Kepala Departemen</p>
            </div>
        `;
    }

    // Anggota
    dept.anggota.forEach((anggota) => {
        cardContainer.innerHTML += `
            <div class="card">
                <img src="${anggota.foto}" alt="${anggota.nama}" class="card__image">
                <h3 class="card__name">${anggota.nama}</h3>
                <p class="card__role">${anggota.jabatan || "Anggota"}</p>
            </div>
        `;
    });

    container.appendChild(section);
});
