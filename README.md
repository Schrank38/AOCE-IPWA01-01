# CO2-Emissions-Tracker (ClimateTransact NPO)

Eine responsive, clientseitige Webanwendung zur Visualisierung, Filterung und Sortierung von CO2-Emissionsdaten für eine fiktive Non-Profit-Organisation.

Erstellt als Fallstudie im Modul **IPWA01-01 – Programmierung von Webanwendungsoberflächen** an der IU Internationalen Hochschule.

## Tech Stack
* **HTML5:** Semantisches Markup
* **CSS3 & Framework:** CSS Flexbox, Bootstrap 5.3.0 (via CDN)
* **JavaScript:** Vanilla JS (ES6+)

## Funktionen & Technische Details
* **Semantische Struktur:** Nutzung von HTML5-Elementen (`header`, `nav`, `main`, `aside`, `section`, `footer`) zur sauberen Gliederung.
* **Responsive Design:** Mobile-First-Layout mit Flexbox und Bootstrap 5. Ein zentraler Breakpoint liegt bei `768px`; Tabellen bleiben auf Smartphones via `.table-responsive` horizontal scrollbar.
* **RTL-Unterstützung (Internationalisierung):** Das lokale Menü und der Hauptcontainer lassen sich zur Laufzeit zwischen LTR und RTL umschalten (`dir="ltr"` / `dir="rtl"`, CSS-Klasse `.rtl-layout`). Der Umschalt-Button wird barrierefrei über `aria-pressed` gesteuert.
* **Filterung & Sortierung:** Dynamische Suche nach Land oder Unternehmen sowie 6-fache Sortierung (nach Land, Unternehmen und Emissionswerten). Für deutsche Sonderzeichen wird `localeCompare` verwendet.
* **Barrierefreiheit (Accessibility):** Änderungen der Trefferanzahl nach dem Filtern werden Screenreadern über ein unsichtbares Element mit `aria-live="polite"` angekündigt.
* **XSS-Schutz:** Konsequenter Verzicht auf `innerHTML`. Die Ausgabe dynamischer Daten erfolgt ausschließlich über sichere DOM-Methoden (`createElement()`, `textContent`, `replaceChildren()`).

## Dateistruktur
* `index.html` – HTML-Struktur mit Bootstrap-Einbindung und ARIA-Attributen
* `styles.css` – Custom CSS für Flexbox-Layout und RTL-Anpassungen
* `script.js` – Filter-, Sortier-, RTL- und DOM-Logik
* `README.md` – Projektübersicht

## Ausführung
Es werden keine Build-Tools, Node.js oder Webserver benötigt. Die Datei `index.html` kann direkt im Browser geöffnet werden.

## Autor
Okan  
