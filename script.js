// Fiktive CO2-Emissionsdaten
const co2Data = [
    { country: "Deutschland", company: "EnergyCorp AG", emissions: 45.2 },
    { country: "USA", company: "Global Power Inc.", emissions: 120.8 },
    { country: "China", company: "Sino Energy Ltd.", emissions: 185.4 },
    { country: "Deutschland", company: "EcoSteel GmbH", emissions: 12.3 },
    { country: "Indien", company: "Bharat Coal Ltd.", emissions: 88.6 },
    { country: "Frankreich", company: "NuclearGreen SA", emissions: 15.7 },
    { country: "Japan", company: "Nippon Tech Corp", emissions: 54.1 }
];

// Rendern der Tabelle: Dynamische Inhalte werden ausschließlich als Textknoten eingefügt.
function renderTable() {
    const searchInput = document.getElementById("search-input").value;
    const sortValue = document.getElementById("sort-select").value;
    const tbody = document.querySelector("#co2-table tbody");
    const resultsStatus = document.getElementById("results-status");
    
    // Die Eingabe dient nur dem Vergleich und wird nie als HTML ausgegeben.
    const cleanFilter = searchInput.trim().toLocaleLowerCase("de");

    // Daten filtern
    let filteredData = co2Data.filter(item => {
        const countryMatch = item.country.toLocaleLowerCase("de").includes(cleanFilter);
        const companyMatch = item.company.toLocaleLowerCase("de").includes(cleanFilter);
        return countryMatch || companyMatch;
    });

    // Daten sortieren
    filteredData.sort((a, b) => {
        switch (sortValue) {
            case "country-asc":
                return a.country.localeCompare(b.country);
            case "country-desc":
                return b.country.localeCompare(a.country);
            case "company-asc":
                return a.company.localeCompare(b.company, "de", { sensitivity: "base" });
            case "company-desc":
                return b.company.localeCompare(a.company, "de", { sensitivity: "base" });
            case "emissions-asc":
                return a.emissions - b.emissions;
            case "emissions-desc":
                return b.emissions - a.emissions;
            default:
                return 0;
        }
    });

    // Tabelle sicher leeren, ohne HTML-Parser zu verwenden.
    tbody.replaceChildren();

    // Zeilen sicher über textContent einfügen (XSS-Schutz)
    filteredData.forEach(row => {
        const tr = document.createElement("tr");

        const tdCountry = document.createElement("td");
        tdCountry.textContent = row.country;

        const tdCompany = document.createElement("td");
        tdCompany.textContent = row.company;

        const tdEmissions = document.createElement("td");
        tdEmissions.textContent = row.emissions.toFixed(1) + " Mio. t";

        tr.appendChild(tdCountry);
        tr.appendChild(tdCompany);
        tr.appendChild(tdEmissions);
        tbody.appendChild(tr);
    });

    resultsStatus.textContent = `${filteredData.length} ${filteredData.length === 1 ? "Ergebnis" : "Ergebnisse"} angezeigt.`;
}

// Event Listener
document.addEventListener("DOMContentLoaded", () => {
    renderTable();

    document.getElementById("search-input").addEventListener("input", renderTable);
    document.getElementById("sort-select").addEventListener("change", renderTable);

    // LTR / RTL Umschalter für das lokale Menü
    const toggleBtn = document.getElementById("toggle-dir-btn");
    const localMenu = document.getElementById("local-menu");
    const mainContainer = document.querySelector(".main-container");

    toggleBtn.addEventListener("click", () => {
        const useRtl = localMenu.classList.contains("ltr");

        localMenu.classList.toggle("ltr", !useRtl);
        localMenu.classList.toggle("rtl", useRtl);
        localMenu.setAttribute("dir", useRtl ? "rtl" : "ltr");
        mainContainer.classList.toggle("rtl-layout", useRtl);
        toggleBtn.setAttribute("aria-pressed", String(useRtl));
        toggleBtn.textContent = useRtl ? "Schriftkultur: RTL / LTR" : "Schriftkultur: LTR / RTL";
    });
});
