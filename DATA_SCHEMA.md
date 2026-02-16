# Schema Dati

Tutti i dataset devono rispettare questo formato:

## Standard

[
  {
    "year": number,
    "value": number
  }
]

---

## Dataset previsti

income.json
wages.json
inflation.json
employment.json
consumption.json
poverty.json

---

## Regole

- Year deve essere integer
- Value deve essere number
- Nessun null
- Range minimo: 2000 → ultimo anno disponibile
- Ordinati per anno crescente
