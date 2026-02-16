# Script updateData

## Obiettivo

Creare uno script TypeScript eseguibile manualmente:

npm run update-data

---

## Funzioni richieste

1. Chiamare API SDMX ISTAT
2. Estrarre serie storiche annuali
3. Normalizzare in formato standard
4. Salvare in /data
5. Salvare raw in /data/raw

---

## Regole tecniche

- Node 18+
- Usare fetch
- Gestire errori
- Log chiari in console
- Nessuna dipendenza pesante

---

## Output esempio

/data/income.json
/data/wages.json
