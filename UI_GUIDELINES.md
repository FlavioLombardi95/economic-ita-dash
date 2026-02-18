# Linee guida UI - Data Journalism

## Riferimento layout

Ispirazione layout: [dash-economics.vercel.app](https://dash-economics.vercel.app/)  
Stile narrativo: Our World in Data

---

## Struttura pagina

### Sidebar sinistra (navigazione)

- **Header sidebar**: titolo dashboard (es. "Italy Economic Dashboard") + sottotitolo (es. "Dati dal 2000").
- **Voci di navigazione** verticali con icona + testo; una voce per capitolo della storyline (Capitolo 1–6) o per sezione.
- Voce **attiva** evidenziata: sfondo blu chiaro, testo blu.
- **Footer sidebar**: copyright e/o link alle fonti (es. "© 2024 · ISTAT, Eurostat").

### Area contenuto principale (destra)

- **Intestazione sezione**: titolo della sezione/capitolo in evidenza.
- **Metriche chiave** (opzionale): griglia 2x2 di card con icona, etichetta e valore (es. anni coperti, indicatori principali).
- **Contenuto**: titolo narrativo, breve spiegazione (2–4 righe), grafico grande.
- **Footer contenuto**: fonti e data aggiornamento dove utile.

---

## Hero / Prima sezione

- Headline narrativa: *"Com'è cambiata la vita economica di un italiano dal 2000?"*
- Sottotitolo descrittivo (una o due righe).

---

## Per ogni grafico

- Titolo narrativo
- Breve spiegazione (2–4 righe)
- Grafico grande
- Evidenziazione anni chiave: **2008**, **2012**, **2020**, **2022**

---

## Design

- **Font**: Inter (o sans-serif pulito e moderno).
- **Layout**: sidebar fissa a sinistra + area contenuto ampia a destra; molto spazio bianco.
- **Colori**: tema chiaro (bianco, grigi); blu come colore primario (link, stato attivo, pulsanti); accenti secondari (verde, viola, arancione) per icone o metriche.
- **Forme**: angoli arrotondati per card, pulsanti e voci di navigazione.
- **Icone**: stile outline, semplici e coerenti.
- Responsive; dark mode opzionale.

---

## Componenti richiesti

- **Sidebar**: navigazione con header, voci (icona + testo), stato attivo, footer.
- **ChartSection**: titolo, descrizione, grafico, anni evidenziati.
- **NarrativeBlock**: titolo narrativo + testo.
- **Card metriche**: icona + etichetta + valore (per KPI in griglia).
- **HighlightYear**: evidenziazione anni 2008, 2012, 2020, 2022.
- **Footer** con fonti (ISTAT, Eurostat).
