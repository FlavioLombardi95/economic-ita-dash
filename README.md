# Italy Economic Status Dashboard

Dashboard di data journalism che racconta come è cambiata la condizione economica del cittadino medio italiano dal 2000 ad oggi. Ispirazione visiva: [Our World in Data](https://ourworldindata.org).

**Non è un SaaS.** È un progetto portfolio, deployabile in modo statico su Vercel.

---

## Descrizione

Il progetto presenta sei indicatori principali:

1. **Reddito disponibile reale pro capite** — potere d’acquisto nel tempo  
2. **Salari reali** — andamento dei salari deflazionati  
3. **Inflazione** — indice dei prezzi al consumo (variazione % annua)  
4. **Tasso di occupazione (15-64 anni)** — mercato del lavoro  
5. **Consumi reali delle famiglie** — spesa e fiducia  
6. **Rischio di povertà o esclusione sociale** — fragilità sociale  

Per ogni indicatore sono evidenziati gli anni **2008**, **2012**, **2020** e **2022** come riferimenti alle crisi (finanziaria, debito sovrano, COVID-19, shock inflattivo).

---

## Fonti dati

- **ISTAT** — Istituto Nazionale di Statistica  
- **Eurostat** — Ufficio statistico dell’Unione europea  

I dati sono acquisiti tramite script da API SDMX (ISTAT) e normalizzati in formato anno-valore.

---

## Metodologia

1. **Acquisizione**: lo script `scripts/updateData.ts` interroga endpoint ISTAT SDMX (configurabili).  
2. **Normalizzazione**: le risposte vengono convertite nello schema `[{ "year": number, "value": number }]`.  
3. **Versioning**: i file in `/data` e le risposte raw in `/data/raw` possono essere versionati su Git.  
4. **Build**: Next.js esegue un export statico; nessuna chiamata API a runtime.  

---

## Aggiornamento dati

Per aggiornare i dataset da fonti esterne:

```bash
npm run update-data
```

Lo script:

- effettua le richieste agli endpoint configurati in `scripts/updateData.ts`;
- salva le risposte grezze in `/data/raw`;
- normalizza e scrive i file in `/data` (income, wages, inflation, employment, consumption, poverty).

È necessario sostituire gli URL placeholder con i veri flussi SDMX ISTAT/Eurostat desiderati.

---

## Esecuzione in locale

```bash
npm install
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000).

---

## Build e deploy su Vercel

**Build statica:**

```bash
npm run build
```

L’output è in `/out`. Il progetto è pensato per **Vercel** (deploy automatico da Git).

1. Collega il repository a Vercel.  
2. Build command: `npm run build`.  
3. Output directory: `out`.  
4. Nessuna variabile d’ambiente obbligatoria per il funzionamento base.

---

## Struttura del progetto

```
/app                 — App Router Next.js (layout, page, stili)
/components          — Componenti UI riutilizzabili
  /charts            — LineChart, ChartSection, HighlightedReferenceLines
/data                — Dataset normalizzati (JSON)
  /raw               — Risposte grezze API (salvate dallo script)
/lib                 — Tipi TypeScript e metadati indicatori
/scripts             — updateData.ts per aggiornamento dati
/public              — Asset statici
```

- **TypeScript** in modalità strict, nessun `any`.  
- **Tailwind CSS** per lo stile.  
- **Recharts** per i grafici.  
- **Nessuna fetch lato client**: i dati provengono solo dai file in `/data`.

---

## Licenza

Progetto portfolio. Verificare le condizioni d’uso delle fonti ISTAT ed Eurostat per eventuali riusi dei dati.
