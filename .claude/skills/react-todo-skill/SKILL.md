---
name: react-todo-skill
description: >
  Guida operativa per lavorare sul progetto Todo React + TypeScript + Tailwind.
  Usa questa skill ogni volta che lavori su componenti React, TypeScript,
  Tailwind CSS, servizi CRUD mock, modelli/interfacce, o qualsiasi modifica
  al progetto todo app. Attivala anche per: creare nuovi componenti, modificare
  componenti esistenti, estendere feature, aggiungere logica di stato, toccare
  i services, aggiornare i modelli in models/, o quando la richiesta menziona
  "componente React", "TypeScript", "Tailwind", "todo", "CRUD", "servizio mock".
  Se il task riguarda questo progetto in qualsiasi modo, consulta questa skill.
---

# React Todo — Skill Operativa

Questa skill definisce le regole che Claude deve seguire ogni volta che opera sul progetto Todo React. Ogni nuovo file, modifica o refactor deve rispettare le convenzioni qui descritte.

---

## Stack del progetto

- **React 19** — solo componenti funzionali
- **Vite** — bundler, nessuna configurazione custom richiesta
- **TypeScript** — `tsconfig` attivo, flag `strict` non abilitato esplicitamente
- **Tailwind CSS** — configurato tramite `tailwind.config.js`
- **CSS globale** — presente in `src/index.css` (non solo utility class pure)
- **Nessuna libreria UI esterna** — niente MUI, Chakra, Ant Design, ecc.
- **Servizio mock locale** — `src/services/todoService.ts` con seed da `src/db/todos.json` (non json-server, non `db.json` nella root)

---

## Struttura cartelle

```
src/
  components/  → Componenti React (un file per componente, PascalCase)
  services/    → Logica CRUD mock asincrona
  models/      → Modelli e interfacce TypeScript condivisi
  db/          → Seed JSON locale (todos.json)
```

Non esistono cartelle `hooks/` o `types/`. Non crearle a meno che l'utente lo chieda esplicitamente.

---

## Convenzioni — Componenti

- Usa esclusivamente **componenti funzionali**. Mai class components.
- **Un file per componente**, nome file in PascalCase (es. `TodoItem.tsx`, `TodoForm.tsx`).
- I componenti in `src/components/` usano **`export default`**.
- Le props si tipizzano con **interfaccia locale** nel file del componente (es. `TodoItemProps`, `HeaderProps`). Non usare il prefisso `I` (no `ITodoItemProps`).
- Mantieni il pattern architetturale esistente: componenti presentazionali composti e orchestrati da un container principale (`App`).

**Esempio di struttura componente:**

```tsx
interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  return (
    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
      {/* ... */}
    </div>
  );
};

export default TodoItem;
```

---

## Convenzioni — TypeScript

- **Vietato `any`**. Usa tipi concreti, `unknown` se necessario, o generics.
- Preferisci **`interface`** per le shape oggetto (coerente con i file esistenti).
- I tipi condivisi tra più file vanno in `src/models/`. I tipi usati in un solo file restano locali.
- Usa **tipi di ritorno espliciti** per le funzioni exported e per le funzioni async nei services.
- Non rinominare interfacce esistenti senza richiesta esplicita.

---

## Convenzioni — Styling

- Usa **classi utility Tailwind** nei componenti. Mai stile inline (`style={}`).
- Rispetta la palette colori già presente: `slate`, `indigo`, `emerald`. Non introdurre colori arbitrari.
- È consentito mantenere ed estendere `src/index.css` per styling globale di base.
- Mantieni coerenza visiva con i componenti già esistenti.

---

## Convenzioni — Stato e side effects

- Usa `useState` e `useEffect` dove necessario, sempre con **dependency array esplicito**.
- Per le operazioni CRUD, passa sempre attraverso `src/services/todoService.ts`. Non inserire logica dati direttamente nei componenti foglia.
- I services mantengono l'approccio **asincrono simulato** (delay + Promise). Nuovi metodi nel service devono seguire lo stesso pattern.

---

## Regole operative — SEMPRE

1. Prima di creare un nuovo componente, verifica se uno esistente può essere esteso o riusato.
2. Quando modifichi file esistenti, preserva naming, struttura e import non coinvolti dalla richiesta.
3. Allinea nuovi import/export ai pattern effettivi del progetto (controlla come sono fatti gli import nei file vicini).
4. Genera codice TypeScript completo e coerente con i modelli in `src/models/`.
5. Se una richiesta dell'utente è in conflitto con queste convenzioni, segnalalo esplicitamente prima di procedere.

## Regole operative — MAI

1. Non installare nuove dipendenze senza richiesta esplicita dell'utente.
2. Non usare `any`.
3. Non introdurre class components.
4. Non spostare file tra cartelle o cambiare convenzioni di export senza richiesta.
5. Non aggiungere logica, refactor o miglioramenti non richiesti.
