# Deploy su GitHub e Vercel

## Anteprima locale (già testata)

```bash
npm install
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000). Build statica: `npm run build` → output in `out/`.

---

## 1. Caricare il progetto su GitHub

### Crea il repository su GitHub

1. Vai su [github.com/new](https://github.com/new).
2. Nome repository (es. `italy-economic-dashboard`).
3. **Non** inizializzare con README, .gitignore o license (il repo esiste già in locale).
4. Clicca **Create repository**.

### Collega e pusha da terminale

Sostituisci `TUO-USERNAME` e `italy-economic-dashboard` con il tuo username e il nome del repo:

```bash
cd /Users/flavio.lombardi/Desktop/Italy-Economic-Dash

git remote add origin https://github.com/TUO-USERNAME/italy-economic-dashboard.git
git push -u origin main
```

Se usi SSH:

```bash
git remote add origin git@github.com:TUO-USERNAME/italy-economic-dashboard.git
git push -u origin main
```

Se GitHub chiede autenticazione, usa un Personal Access Token (HTTPS) o le tue chiavi SSH.

---

## 2. Deploy su Vercel

### Opzione A: Da dashboard Vercel (consigliata)

1. Vai su [vercel.com](https://vercel.com) e accedi (anche con account GitHub).
2. **Add New** → **Project**.
3. Importa il repository GitHub `italy-economic-dashboard` (autorizza Vercel su GitHub se richiesto).
4. Vercel rileva Next.js. Impostazioni consigliate:
   - **Framework Preset:** Next.js
   - **Build Command:** `npm run build`
   - **Output Directory:** `out` (per export statico)
   - **Install Command:** `npm install`
5. **Deploy**. Al termine avrai un URL tipo `https://italy-economic-dashboard-xxx.vercel.app`.

Ogni push su `main` farà un nuovo deploy automatico.

### Opzione B: Da terminale con Vercel CLI

```bash
npm i -g vercel
cd /Users/flavio.lombardi/Desktop/Italy-Economic-Dash
vercel
```

Segui il wizard (login, link al progetto o nuovo progetto). Per andare in produzione:

```bash
vercel --prod
```

---

## Riepilogo

| Step              | Azione                                      |
|-------------------|---------------------------------------------|
| 1. GitHub         | Crea repo → `git remote add origin` → `git push` |
| 2. Vercel         | Import da GitHub o `vercel` da CLI           |
| 3. Build su Vercel| `npm run build`, output `out`               |

Dopo il primo deploy, il sito sarà online e i successivi push su `main` verranno pubblicati in automatico.
