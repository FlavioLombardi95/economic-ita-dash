# Italy Economic Status Dashboard

Dashboard di data journalism sulla condizione economica del cittadino medio italiano dal 2000 ad oggi. Ispirazione: [Our World in Data](https://ourworldindata.org). **Progetto portfolio**, non SaaS; deploy statico su Vercel.

---

## Cosa fa

**6 indicatori**: Reddito reale pro capite, Salari reali, Inflazione, Occupazione 15-64, Consumi famiglie, Rischio povertà.  
**Fonti**: ISTAT, Eurostat (dati via script da API SDMX, normalizzati in JSON).

---

## Comandi

| Azione | Comando |
|--------|--------|
| Avvio locale | `npm install` → `npm run dev` → [localhost:3000](http://localhost:3000) |
| Aggiornare dati | `npm run update-data` (scrive in `/data` e `/data/raw`) |
| Build produzione | `npm run build` → output in `/out` |

**Deploy Vercel**: collega il repo, Build command `npm run build`, Output directory `out`. Nessuna env obbligatoria.

---

## Struttura

- **/app** — Next.js 14 App Router (layout, page, globals.css)
- **/components** — Sidebar, MobileNav, NarrativeBlock, MetricCard; **/charts** — LineChart, ChartSection
- **/data** — JSON normalizzati (income, wages, inflation, employment, consumption, poverty); **/data/raw** — risposte grezze API
- **/lib** — types.ts, indicators.ts, themes.ts
- **/scripts** — updateData.ts (sostituire URL con flussi SDMX reali)

**Stack**: Next.js 14, TypeScript strict, Tailwind, Recharts. Nessuna fetch a runtime; dati solo da file in `/data`. Dark mode supportato.

---

## Dati

Ogni file in `/data` è un array: `[{ "year": number, "value": number }]`. Anni interi, ordinati, nessun null. Range da 2000 in poi.

---

## Design (sintesi)

Layout: sidebar fissa a sinistra + contenuto a destra; MobileNav su mobile. Hero: *"Com'è cambiata la vita economica di un italiano dal 2000?"*. Per ogni indicatore: titolo narrativo, 2–4 righe, grafico. Font pulito (es. Inter), colori sobri, blu primario, responsive e dark mode.

---

## Licenza

Progetto portfolio. Rispettare condizioni d’uso ISTAT/Eurostat per riuso dati.
