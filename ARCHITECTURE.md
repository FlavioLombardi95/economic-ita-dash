# Architettura del progetto

## Flusso dati

ISTAT / Eurostat API
        ↓
scripts/updateData.ts
        ↓
Normalizzazione dati
        ↓
/data/*.json
        ↓
Next.js static build
        ↓
Deploy Vercel

---

## Cartelle

/app
/components
/components/charts
/data
/data/raw
/lib
/scripts
/public
/.cursor

---

## Regole

- Nessuna fetch runtime lato client
- I dati devono essere statici
- Ogni dataset deve avere formato coerente:

[
  {
    "year": 2000,
    "value": 123.4
  }
]
