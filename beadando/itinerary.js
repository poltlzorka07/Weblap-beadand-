// 1. URL paraméterek kiolvasása
const params = new URLSearchParams(window.location.search);

const destination = params.get("destination");
const startDate = params.get("start-date");
const endDate = params.get("end-date");
const budget = Number(params.get("budget"));
const style = params.get("tipus");  // <<< EZ FONTOS!

// 2. Utazás hossza (napok száma)
const d1 = new Date(startDate);
const d2 = new Date(endDate);
const diffMs = d2 - d1;
const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

// 3. Programok városonként és stílusonként
const programok = {
    "Róma": {
        varosnezes: [
            "Colosseum és Forum Romanum",
            "Vatikán és Szent Péter-bazilika",
            "Trevi-kút és Pantheon",
            "Spanyol lépcső és Via del Corso vásárlás",
            "Piazza Navona & Campo de’ Fiori"
        ],
        termeszet: [
            "Villa Borghese park",
            "Gianicolo domb kilátópont",
            "Tiberis folyóparti séta",
            "Appiai út parkos szakasz",
            "Trastevere kertjei"
        ],
        vegyes: [
            "Colosseum",
            "Villa Borghese park",
            "Vatikán",
            "Tiberis parti séta",
            "Trastevere esti programok"
        ]
    },

    "Párizs": {
        varosnezes: [
            "Eiffel-torony",
            "Louvre Múzeum",
            "Montmartre & Sacré-Coeur",
            "Notre-Dame & Szajna-part",
            "Versailles (beltér)"
        ],
        termeszet: [
            "Luxembourg-kert",
            "Tuileriák kertje",
            "Bois de Boulogne park",
            "Szajna-parti piknik",
            "Parc de la Villette"
        ],
        vegyes: [
            "Eiffel-torony",
            "Luxembourg-kert",
            "Montmartre",
            "Szajna-parti séta",
            "Piknik a Tuileriák kertjében"
        ]
    },

    "Barcelona": {
        varosnezes: [
            "Sagrada Família",
            "Park Güell (építészeti rész)",
            "Gótikus negyed",
            "Casa Batlló",
            "La Rambla"
        ],
        termeszet: [
            "Barceloneta strand",
            "Montjuïc domb",
            "Ciutadella park",
            "Tengerparti séta",
            "Montserrat (könnyű túra)"
        ],
        vegyes: [
            "Sagrada Família",
            "Barceloneta strand",
            "Park Güell",
            "Gótikus negyed",
            "Ciutadella park"
        ]
    },

    "London": {
        varosnezes: [
            "Big Ben & Parlament",
            "Tower of London",
            "British Museum",
            "London Eye",
            "Buckingham-palota"
        ],
        termeszet: [
            "Hyde Park",
            "Regent's Park",
            "Thames Riverside Walk",
            "Hampstead Heath",
            "Greenwich Park"
        ],
        vegyes: [
            "Big Ben",
            "Hyde Park",
            "British Museum",
            "Greenwich Park",
            "London Eye"
        ]
    }
};

// 4. A kiválasztott programlista (destination + style alapján)
const selectedPrograms = programok[destination][style];

// 5. Összefoglaló kitöltése
const tripDestinationEl = document.getElementById("trip-destination");
if (tripDestinationEl) {
    tripDestinationEl.textContent = destination;
}
document.getElementById("sum-start").textContent = startDate;
document.getElementById("sum-end").textContent = endDate;
document.getElementById("sum-days").textContent = days + " nap";

if (budget < 90 * days) {
    document.getElementById("sum-budget").textContent =
        budget + " EUR (az összeg nem elegendő, minimum javasolt: " + (90 * days) + " EUR)";
} else {
    document.getElementById("sum-budget").textContent = budget + " EUR";
}

// 6. Napi programkártyák létrehozása
const container = document.getElementById("itinerary-container");

for (let i = 0; i < days; i++) {
    const day = i + 1;

    // Ha elfogynak a programok, kezdje előlről
    const program = selectedPrograms[i % selectedPrograms.length];

    const card = document.createElement("div");
    card.classList.add("day-card");

    card.innerHTML = `
        <h2>${day}. nap</h2>
        <p>${program}</p>
    `;

    container.appendChild(card);
}