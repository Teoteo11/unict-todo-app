# 📋 Todo App — Istruzioni per Agente AI

## Contesto e Obiettivo

Questo documento contiene le istruzioni per costruire una **Todo App in React + TypeScript**, pensata per essere usata come materiale didattico durante una lezione introduttiva a React e TypeScript.

Il pubblico è composto da studenti che hanno già basi di **JavaScript** e **Laravel**, ma si approcciano per la prima volta a React e TypeScript.

### Obiettivo didattico
L'applicazione viene costruita **incrementalmente**, con ogni step che corrisponde a un **commit git autonomo e funzionante**. Questo permette al docente di:
- Eseguire `git checkout <nome-branch-o-tag>` per ogni commit
- Mostrare in tempo reale il risultato di ogni concetto spiegato
- Non dover scrivere codice live durante la lezione

---

## Stack Tecnologico

| Tecnologia | Dettagli |
|---|---|
| Framework | React 18+ |
| Linguaggio | TypeScript (template `react-ts` via Vite) |
| Styling | Tailwind CSS v3 |
| Bundler | Vite |
| Gestione pacchetti | npm |

---

## Design dell'Applicazione

L'app deve avere un'estetica **moderna, pulita e professionale**, con uno stile che richiami le interfacce productivity app (tipo Linear, Things 3, Todoist). In particolare:

- **Palette**: sfondo scuro/neutro con accenti vivaci (es. indigo o violet come colore primario)
- **Typography**: font sans-serif moderno (es. `DM Sans` o `Plus Jakarta Sans` da Google Fonts)
- **Layout**: centrato, max-width contenuto, generoso uso di whitespace
- **Componenti**: card con ombra sottile, checkbox stilizzate, transizioni fluide
- **Responsive**: funzionante su mobile, tablet e desktop
- **Interazioni**: animazioni leggere su aggiunta/rimozione item, hover states

---

## Convenzioni di Codice

- **Lingua**: tutti i nomi di variabili, funzioni, props, interfacce e tipi devono essere in **inglese**
- **TypeScript**: nessun uso di `any`. Usare `interface` per oggetti e props, `type` per union types
- **Commenti**: i commenti nel codice possono essere in italiano per fini didattici
- **Ogni commit** deve compilare senza errori TypeScript e girare correttamente con `npm run dev`

---

## Struttura dei Commit

Ogni commit deve essere **atomico**, **funzionante** e **taggato** con il numero progressivo.

---

## Step-by-Step per l'Agente

---

### COMMIT 01 — Inizializzazione Progetto React

**Tag git:** `01-project-setup`

**Obiettivo didattico:** Mostrare come si crea un progetto React con TypeScript usando Vite.

**Operazioni da eseguire:**

1. Creare il progetto con il comando:
   ```bash
   npm create vite@latest todo-app -- --template react-ts
   ```
2. Entrare nella cartella del progetto:
   ```bash
   cd todo-app
   ```
3. Installare le dipendenze:
   ```bash
   npm install
   ```
4. Pulire i file di default generati da Vite:
   - Svuotare `src/App.tsx` lasciando solo un componente funzionale minimale che renderizza `<h1>Todo App</h1>`
   - Svuotare `src/App.css`
   - Mantenere `src/main.tsx` e `index.html` invariati
   - Eliminare `src/assets/react.svg` e `public/vite.svg`

5. Il file `src/App.tsx` al termine deve essere:
   ```tsx
   function App() {
     return (
       <div>
         <h1>Todo App</h1>
       </div>
     );
   }

   export default App;
   ```

6. Fare il commit con messaggio: `01 - project setup`

---

### COMMIT 02 — Installazione e Configurazione Tailwind CSS

**Tag git:** `02-tailwind-setup`

**Obiettivo didattico:** Mostrare come si integra Tailwind CSS in un progetto Vite + React.

**Operazioni da eseguire:**

1. Installare Tailwind CSS e le sue dipendenze:
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

2. Configurare il file `tailwind.config.js` per includere tutti i file sorgente:
   ```js
   /** @type {import('tailwindcss').Config} */
   export default {
     content: [
       "./index.html",
       "./src/**/*.{js,ts,jsx,tsx}",
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   }
   ```

3. Sostituire il contenuto di `src/index.css` con le tre direttive Tailwind:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

4. Aggiungere il font `DM Sans` da Google Fonts nell'`index.html`:
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com" />
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
   <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
   ```

5. In `src/index.css`, aggiungere dopo le direttive Tailwind:
   ```css
   body {
     font-family: 'DM Sans', sans-serif;
     background-color: #0f172a;
     color: #f1f5f9;
   }
   ```

6. Aggiornare `src/App.tsx` con un layout base stilizzato in Tailwind:
   ```tsx
   function App() {
     return (
       <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
         <div className="w-full max-w-lg">
           <h1 className="text-3xl font-bold text-white mb-8 text-center">
             ✅ Todo App
           </h1>
         </div>
       </div>
     );
   }

   export default App;
   ```

7. Fare il commit con messaggio: `02 - tailwind setup`

---

### COMMIT 03 — Creazione di Componenti Funzionali

**Tag git:** `03-functional-components`

**Obiettivo didattico:** Introdurre i componenti funzionali React: cosa sono, le regole (nome maiuscolo, ritornano JSX, un solo root element), come si compongono.

**Operazioni da eseguire:**

1. Creare la cartella `src/components/`

2. Creare il file `src/components/Header.tsx`:
   ```tsx
   function Header() {
     return (
       <div className="text-center mb-10">
         <h1 className="text-4xl font-bold text-white tracking-tight">
           ✅ Todo App
         </h1>
         <p className="text-slate-400 mt-2 text-sm">
           Manage your daily tasks
         </p>
       </div>
     );
   }

   export default Header;
   ```

3. Creare il file `src/components/EmptyState.tsx`:
   ```tsx
   function EmptyState() {
     return (
       <div className="text-center py-16">
         <div className="text-5xl mb-4">🎉</div>
         <p className="text-slate-400 text-lg">No todos yet...</p>
         <p className="text-slate-500 text-sm mt-1">Add one above!</p>
       </div>
     );
   }

   export default EmptyState;
   ```

4. Aggiornare `src/App.tsx` per comporre i due componenti:
   ```tsx
   import Header from './components/Header';
   import EmptyState from './components/EmptyState';

   function App() {
     return (
       <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
         <div className="w-full max-w-lg">
           <Header />
           <EmptyState />
         </div>
       </div>
     );
   }

   export default App;
   ```

5. Fare il commit con messaggio: `03 - functional components`

---

### COMMIT 04 — Tipi TypeScript, Interface e Props

**Tag git:** `04-props-and-typescript`

**Obiettivo didattico:** Introdurre le Props (read-only, passate dal padre, tipizzate), le `interface` TypeScript per descrivere la "forma" di un oggetto, e come tipizzare le props di un componente.

**Operazioni da eseguire:**

1. Creare il file `src/types.ts` con la definizione del tipo `Todo`:
   ```ts
   export interface Todo {
     id: number;
     text: string;
     completed: boolean;
   }
   ```

2. Creare il file `src/components/TodoItem.tsx`. Il componente riceve un singolo `Todo` come prop e lo visualizza:
   ```tsx
   import { Todo } from '../types';

   interface TodoItemProps {
     todo: Todo;
   }

   function TodoItem({ todo }: TodoItemProps) {
     return (
       <div className="flex items-center gap-3 p-4 bg-slate-800 rounded-xl border border-slate-700 group">
         <input
           type="checkbox"
           checked={todo.completed}
           readOnly
           className="w-5 h-5 accent-indigo-500 cursor-pointer rounded"
         />
         <span
           className={`flex-1 text-sm font-medium transition-all ${
             todo.completed
               ? 'line-through text-slate-500'
               : 'text-slate-100'
           }`}
         >
           {todo.text}
         </span>
       </div>
     );
   }

   export default TodoItem;
   ```

3. Creare il file `src/components/TodoList.tsx`. Riceve un array di `Todo` come prop e mappa su `TodoItem`:
   ```tsx
   import { Todo } from '../types';
   import TodoItem from './TodoItem';
   import EmptyState from './EmptyState';

   interface TodoListProps {
     todos: Todo[];
   }

   function TodoList({ todos }: TodoListProps) {
     if (todos.length === 0) {
       return <EmptyState />;
     }

     return (
       <div className="flex flex-col gap-2">
         {todos.map((todo) => (
           <TodoItem key={todo.id} todo={todo} />
         ))}
       </div>
     );
   }

   export default TodoList;
   ```

4. Aggiornare `src/App.tsx` per utilizzare `TodoList` passando un array statico di `Todo` (nessuno stato ancora, solo dati hardcoded per mostrare le props):
   ```tsx
   import Header from './components/Header';
   import TodoList from './components/TodoList';
   import { Todo } from './types';

   const sampleTodos: Todo[] = [
     { id: 1, text: 'Study TypeScript', completed: false },
     { id: 2, text: 'Try React', completed: true },
   ];

   function App() {
     return (
       <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
         <div className="w-full max-w-lg">
           <Header />
           <TodoList todos={sampleTodos} />
         </div>
       </div>
     );
   }

   export default App;
   ```

5. Fare il commit con messaggio: `04 - props and typescript types`

---

### COMMIT 05 — useState: Stato Locale e Interattività

**Tag git:** `05-usestate`

**Obiettivo didattico:** Introdurre `useState`, il concetto di stato locale in React, la sintassi `[value, setter]`, e come il re-render avviene automaticamente al cambio di stato. Mostrare l'aggiunta di un todo tramite input controllato.

**Operazioni da eseguire:**

1. Creare il file `src/components/TodoForm.tsx`. Gestisce un input controllato e chiama una callback `onAdd` passata via props:
   ```tsx
   import { useState } from 'react';

   interface TodoFormProps {
     onAdd: (text: string) => void;
   }

   function TodoForm({ onAdd }: TodoFormProps) {
     const [inputValue, setInputValue] = useState<string>('');

     const handleSubmit = () => {
       if (!inputValue.trim()) return;
       onAdd(inputValue.trim());
       setInputValue('');
     };

     return (
       <div className="flex gap-2 mb-6">
         <input
           type="text"
           value={inputValue}
           onChange={(e) => setInputValue(e.target.value)}
           onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
           placeholder="Add a new todo..."
           className="flex-1 bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
         />
         <button
           onClick={handleSubmit}
           className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-3 rounded-xl text-sm transition-colors"
         >
           Add
         </button>
       </div>
     );
   }

   export default TodoForm;
   ```

2. Aggiornare `src/App.tsx` per introdurre `useState` e rendere l'app interattiva. Rimuovere i dati hardcoded:
   ```tsx
   import { useState } from 'react';
   import Header from './components/Header';
   import TodoList from './components/TodoList';
   import TodoForm from './components/TodoForm';
   import { Todo } from './types';

   function App() {
     // [valore corrente, funzione che aggiorna il valore e ri-renderizza]
     const [todos, setTodos] = useState<Todo[]>([]);

     const addTodo = (text: string) => {
       const newTodo: Todo = {
         id: Date.now(),
         text,
         completed: false,
       };
       setTodos([...todos, newTodo]);
     };

     return (
       <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
         <div className="w-full max-w-lg">
           <Header />
           <TodoForm onAdd={addTodo} />
           <TodoList todos={todos} />
         </div>
       </div>
     );
   }

   export default App;
   ```

3. Fare il commit con messaggio: `05 - useState`

---

### COMMIT 06 — Rendering Condizionale

**Tag git:** `06-conditional-rendering`

**Obiettivo didattico:** Mostrare i 3 pattern di rendering condizionale: operatore ternario `a ? b : c`, short-circuit `condition && <Element />`, e early return.

**Operazioni da eseguire:**

1. Aggiornare `src/components/TodoItem.tsx` per mostrare un badge "Done" con short-circuit `&&` e classi condizionali con ternario:
   ```tsx
   import { Todo } from '../types';

   interface TodoItemProps {
     todo: Todo;
   }

   function TodoItem({ todo }: TodoItemProps) {
     return (
       <div className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
         // Operatore ternario: applica stili diversi in base a completed
         todo.completed
           ? 'bg-slate-800/50 border-slate-700/50'
           : 'bg-slate-800 border-slate-700'
       }`}>
         <input
           type="checkbox"
           checked={todo.completed}
           readOnly
           className="w-5 h-5 accent-indigo-500 cursor-pointer"
         />
         <span className={`flex-1 text-sm font-medium ${
           todo.completed ? 'line-through text-slate-500' : 'text-slate-100'
         }`}>
           {todo.text}
         </span>

         {/* Short-circuit &&: mostra il badge SOLO se completed è true */}
         {todo.completed && (
           <span className="text-xs bg-emerald-900/50 text-emerald-400 px-2 py-1 rounded-full font-medium">
             ✓ Done
           </span>
         )}
       </div>
     );
   }

   export default TodoItem;
   ```

2. Rendere esplicito l'**early return** in `src/components/TodoList.tsx` con commento didattico:
   ```tsx
   import { Todo } from '../types';
   import TodoItem from './TodoItem';
   import EmptyState from './EmptyState';

   interface TodoListProps {
     todos: Todo[];
   }

   function TodoList({ todos }: TodoListProps) {
     // Early return: uscita anticipata per gestire il caso speciale
     if (todos.length === 0) {
       return <EmptyState />;
     }

     // Se arriviamo qui, la lista ha almeno un elemento
     return (
       <div className="flex flex-col gap-2">
         {todos.map((todo) => (
           <TodoItem key={todo.id} todo={todo} />
         ))}
       </div>
     );
   }

   export default TodoList;
   ```

3. Aggiornare `src/components/Header.tsx` per mostrare un contatore con short-circuit `&&`, ricevuto come prop opzionale:
   ```tsx
   interface HeaderProps {
     activeCount?: number;
   }

   function Header({ activeCount }: HeaderProps) {
     return (
       <div className="text-center mb-10">
         <h1 className="text-4xl font-bold text-white tracking-tight">
           ✅ Todo App
         </h1>
         <p className="text-slate-400 mt-2 text-sm">
           Manage your daily tasks
         </p>
         {/* Short-circuit &&: mostra il badge SOLO se activeCount è > 0 */}
         {activeCount !== undefined && activeCount > 0 && (
           <span className="inline-block mt-3 text-xs bg-indigo-900/50 text-indigo-400 px-3 py-1 rounded-full">
             {activeCount} {activeCount === 1 ? 'active task' : 'active tasks'}
           </span>
         )}
       </div>
     );
   }

   export default Header;
   ```

4. Aggiornare `src/App.tsx` per passare `activeCount` all'`Header`:
   ```tsx
   const activeCount = todos.filter((t) => !t.completed).length;
   // ...
   <Header activeCount={activeCount} />
   ```

5. Fare il commit con messaggio: `06 - conditional rendering`

---

### COMMIT 07 — Rendering di Liste e key

**Tag git:** `07-list-rendering-and-keys`

**Obiettivo didattico:** Approfondire il rendering di liste con `.map()`, il concetto di `key` (perché è obbligatoria, perché deve essere stabile e unica, perché NON usare l'indice). Aggiungere toggle e rimozione degli item.

**Operazioni da eseguire:**

1. Aggiornare `src/components/TodoItem.tsx` per ricevere le callback `onToggle` e `onRemove`:
   ```tsx
   import { Todo } from '../types';

   interface TodoItemProps {
     todo: Todo;
     onToggle: (id: number) => void;
     onRemove: (id: number) => void;
   }

   function TodoItem({ todo, onToggle, onRemove }: TodoItemProps) {
     return (
       <div className={`flex items-center gap-3 p-4 rounded-xl border group transition-all ${
         todo.completed
           ? 'bg-slate-800/50 border-slate-700/50'
           : 'bg-slate-800 border-slate-700'
       }`}>
         <input
           type="checkbox"
           checked={todo.completed}
           onChange={() => onToggle(todo.id)}
           className="w-5 h-5 accent-indigo-500 cursor-pointer"
         />
         <span className={`flex-1 text-sm font-medium ${
           todo.completed ? 'line-through text-slate-500' : 'text-slate-100'
         }`}>
           {todo.text}
         </span>
         {todo.completed && (
           <span className="text-xs bg-emerald-900/50 text-emerald-400 px-2 py-1 rounded-full font-medium">
             ✓ Done
           </span>
         )}
         <button
           onClick={() => onRemove(todo.id)}
           className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 transition-all text-lg leading-none"
           aria-label="Remove todo"
         >
           ×
         </button>
       </div>
     );
   }

   export default TodoItem;
   ```

2. Aggiornare `src/components/TodoList.tsx` per propagare le callback, con commento esplicito sulla `key`:
   ```tsx
   import { Todo } from '../types';
   import TodoItem from './TodoItem';
   import EmptyState from './EmptyState';

   interface TodoListProps {
     todos: Todo[];
     onToggle: (id: number) => void;
     onRemove: (id: number) => void;
   }

   function TodoList({ todos, onToggle, onRemove }: TodoListProps) {
     if (todos.length === 0) {
       return <EmptyState />;
     }

     return (
       <div className="flex flex-col gap-2">
         {todos.map((todo) => (
           // key è OBBLIGATORIA — deve essere unica e stabile
           // NON usare l'indice come key: causa bug con riordinamenti e animazioni
           <TodoItem
             key={todo.id}
             todo={todo}
             onToggle={onToggle}
             onRemove={onRemove}
           />
         ))}
       </div>
     );
   }

   export default TodoList;
   ```

3. Aggiornare `src/App.tsx` con le funzioni `toggleTodo` e `removeTodo`:
   ```tsx
   const toggleTodo = (id: number) => {
     setTodos(todos.map((t) =>
       t.id === id ? { ...t, completed: !t.completed } : t
     ));
   };

   const removeTodo = (id: number) => {
     setTodos(todos.filter((t) => t.id !== id));
   };

   // Nel JSX:
   <TodoList todos={todos} onToggle={toggleTodo} onRemove={removeTodo} />
   ```

4. Fare il commit con messaggio: `07 - list rendering and keys`

---

### COMMIT 08 — useEffect: Side Effects

**Tag git:** `08-useeffect`

**Obiettivo didattico:** Introdurre `useEffect`, spiegare la dependency array (`[]` solo al mount, `[dep]` quando dep cambia, nessun array ad ogni render). Caso pratico: aggiornare il titolo della pagina al variare dei todos.

**Operazioni da eseguire:**

1. Aggiornare `src/App.tsx` per usare `useEffect` con tutti e tre i casi della dependency array, commentati in modo didattico:
   ```tsx
   import { useState, useEffect } from 'react';
   import Header from './components/Header';
   import TodoList from './components/TodoList';
   import TodoForm from './components/TodoForm';
   import { Todo } from './types';

   function App() {
     const [todos, setTodos] = useState<Todo[]>([]);

     // Caso 1: nessun array — eseguito dopo OGNI render
     // useEffect(() => { console.log('render!'); });

     // Caso 2: array vuoto [] — eseguito UNA SOLA VOLTA al mount
     useEffect(() => {
       console.log('App mounted!');
     }, []);

     // Caso 3: [todos] — eseguito ogni volta che "todos" cambia
     useEffect(() => {
       const activeCount = todos.filter((t) => !t.completed).length;
       document.title = activeCount > 0 ? `(${activeCount}) Todo App` : 'Todo App';
     }, [todos]);

     const addTodo = (text: string) => {
       const newTodo: Todo = { id: Date.now(), text, completed: false };
       setTodos([...todos, newTodo]);
     };

     const toggleTodo = (id: number) => {
       setTodos(todos.map((t) =>
         t.id === id ? { ...t, completed: !t.completed } : t
       ));
     };

     const removeTodo = (id: number) => {
       setTodos(todos.filter((t) => t.id !== id));
     };

     const activeCount = todos.filter((t) => !t.completed).length;

     return (
       <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
         <div className="w-full max-w-lg">
           <Header activeCount={activeCount} />
           <TodoForm onAdd={addTodo} />
           <TodoList todos={todos} onToggle={toggleTodo} onRemove={removeTodo} />
         </div>
       </div>
     );
   }

   export default App;
   ```

2. Fare il commit con messaggio: `08 - useEffect`

---

### COMMIT 09 — Simulazione API con JSON locale: GET

**Tag git:** `09-mock-api-get`

**Obiettivo didattico:** Introdurre il pattern di separazione tra UI e logica di accesso ai dati tramite un **service layer**. Mostrare come simulare una chiamata `GET` asincrona usando un file JSON locale come "database" in memoria. Mostrare `useEffect` con `[]` come posto corretto per il fetch iniziale. Introdurre il `loading` state per gestire la UI durante operazioni asincrone.

**Operazioni da eseguire:**

1. Creare la cartella `src/db/` e il file `src/db/todos.json` (il "database" mock):
   ```json
   [
     { "id": 1, "text": "Study TypeScript", "completed": false },
     { "id": 2, "text": "Try React", "completed": true }
   ]
   ```

2. Creare la cartella `src/services/` e il file `src/services/todoService.ts`. In questo commit implementare solo `getTodos`:
   ```ts
   import { Todo } from '../types';
   import initialData from '../db/todos.json';

   // Simulazione del database in memoria (si resetta ad ogni refresh di pagina)
   let mockDb: Todo[] = [...initialData];

   // Simula la latenza di rete
   const delay = (ms: number): Promise<void> =>
     new Promise((resolve) => setTimeout(resolve, ms));

   // GET /todos — restituisce tutti i todos
   export async function getTodos(): Promise<Todo[]> {
     await delay(300);
     // Copia difensiva: il componente non muta direttamente mockDb
     return [...mockDb];
   }
   ```

3. Aggiornare `src/App.tsx` per usare `getTodos` dal service e gestire lo stato di `loading`:
   ```tsx
   import { useState, useEffect } from 'react';
   import Header from './components/Header';
   import TodoList from './components/TodoList';
   import TodoForm from './components/TodoForm';
   import { getTodos } from './services/todoService';
   import { Todo } from './types';

   function App() {
     const [todos, setTodos] = useState<Todo[]>([]);
     const [loading, setLoading] = useState<boolean>(true);

     // GET: carica i todos dal service al mount
     useEffect(() => {
       const loadTodos = async () => {
         const data = await getTodos();
         setTodos(data);
         setLoading(false);
       };
       loadTodos();
     }, []);

     const addTodo = (text: string) => {
       const newTodo: Todo = { id: Date.now(), text, completed: false };
       setTodos([...todos, newTodo]);
     };

     const toggleTodo = (id: number) => {
       setTodos(todos.map((t) =>
         t.id === id ? { ...t, completed: !t.completed } : t
       ));
     };

     const removeTodo = (id: number) => {
       setTodos(todos.filter((t) => t.id !== id));
     };

     const activeCount = todos.filter((t) => !t.completed).length;

     // Early return: mostra uno stato di caricamento mentre i dati arrivano
     if (loading) {
       return (
         <div className="min-h-screen bg-slate-900 flex items-center justify-center">
           <p className="text-slate-400 animate-pulse">Loading...</p>
         </div>
       );
     }

     return (
       <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
         <div className="w-full max-w-lg">
           <Header activeCount={activeCount} />
           <TodoForm onAdd={addTodo} />
           <TodoList todos={todos} onToggle={toggleTodo} onRemove={removeTodo} />
         </div>
       </div>
     );
   }

   export default App;
   ```

4. Fare il commit con messaggio: `09 - mock API GET`

---

### COMMIT 10 — Simulazione API: POST (Aggiunta)

**Tag git:** `10-mock-api-post`

**Obiettivo didattico:** Mostrare il pattern per operazioni di scrittura asincrone. La UI non manipola mai direttamente il "database": passa sempre attraverso il service. La funzione è `async` esattamente come lo sarebbe con una vera API REST. Introdurre `isSubmitting` per disabilitare la UI durante la chiamata.

**Operazioni da eseguire:**

1. Aggiungere la funzione `createTodo` in `src/services/todoService.ts`:
   ```ts
   // POST /todos — crea un nuovo todo e lo aggiunge al db
   export async function createTodo(text: string): Promise<Todo> {
     await delay(300);
     const newTodo: Todo = {
       id: Date.now(),
       text,
       completed: false,
     };
     mockDb = [...mockDb, newTodo];
     return newTodo;
   }
   ```

2. Aggiornare `src/components/TodoForm.tsx` per gestire il caso async con uno stato `isSubmitting`:
   ```tsx
   import { useState } from 'react';

   interface TodoFormProps {
     onAdd: (text: string) => Promise<void>;
   }

   function TodoForm({ onAdd }: TodoFormProps) {
     const [inputValue, setInputValue] = useState<string>('');
     const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

     const handleSubmit = async () => {
       if (!inputValue.trim() || isSubmitting) return;
       setIsSubmitting(true);
       await onAdd(inputValue.trim());
       setInputValue('');
       setIsSubmitting(false);
     };

     return (
       <div className="flex gap-2 mb-6">
         <input
           type="text"
           value={inputValue}
           onChange={(e) => setInputValue(e.target.value)}
           onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
           placeholder="Add a new todo..."
           disabled={isSubmitting}
           className="flex-1 bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition disabled:opacity-50"
         />
         <button
           onClick={handleSubmit}
           disabled={isSubmitting}
           className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-3 rounded-xl text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
         >
           {isSubmitting ? '...' : 'Add'}
         </button>
       </div>
     );
   }

   export default TodoForm;
   ```

3. Aggiornare `src/App.tsx` per usare `createTodo` nella funzione `addTodo` (ora `async`):
   ```tsx
   import { getTodos, createTodo } from './services/todoService';
   // ...

   const addTodo = async (text: string) => {
     // La UI chiama il service (come farebbe con fetch/axios verso una vera API)
     const newTodo = await createTodo(text);
     setTodos([...todos, newTodo]);
   };
   ```

4. Fare il commit con messaggio: `10 - mock API POST`

---

### COMMIT 11 — Simulazione API: PUT (Toggle)

**Tag git:** `11-mock-api-put`

**Obiettivo didattico:** Mostrare il pattern di update parziale con `Partial<Pick<T, K>>`. Introdurre la gestione degli errori con `throw new Error(...)` coerente con le API reali. Mostrare il pattern "leggi lo stato corrente → chiama il service → aggiorna la UI".

**Operazioni da eseguire:**

1. Aggiungere la funzione `updateTodo` in `src/services/todoService.ts`:
   ```ts
   // PUT /todos/:id — aggiorna parzialmente un todo esistente
   export async function updateTodo(
     id: number,
     patch: Partial<Pick<Todo, 'text' | 'completed'>>
   ): Promise<Todo> {
     await delay(300);
     const found = mockDb.find((t) => t.id === id);
     if (!found) throw new Error(`Todo with id ${id} not found`);

     const updated = { ...found, ...patch };
     mockDb = mockDb.map((t) => (t.id === id ? updated : t));
     return updated;
   }
   ```

2. Aggiornare `src/App.tsx` per usare `updateTodo` nella funzione `toggleTodo` (ora `async`):
   ```tsx
   import { getTodos, createTodo, updateTodo } from './services/todoService';
   // ...

   const toggleTodo = async (id: number) => {
     // Pattern: leggi lo stato corrente → calcola il nuovo valore → chiama il service
     const todo = todos.find((t) => t.id === id);
     if (!todo) return;

     const updated = await updateTodo(id, { completed: !todo.completed });
     setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
   };
   ```

3. Fare il commit con messaggio: `11 - mock API PUT`

---

### COMMIT 12 — Simulazione API: DELETE (Rimozione)

**Tag git:** `12-mock-api-delete`

**Obiettivo didattico:** Completare il CRUD con la rimozione. Mostrare come il service restituisce `Promise<void>` — nessun dato di ritorno, esattamente come una risposta HTTP `204 No Content`.

**Operazioni da eseguire:**

1. Aggiungere la funzione `deleteTodo` in `src/services/todoService.ts`:
   ```ts
   // DELETE /todos/:id — rimuove un todo dal db, ritorna void (come HTTP 204)
   export async function deleteTodo(id: number): Promise<void> {
     await delay(250);
     mockDb = mockDb.filter((t) => t.id !== id);
   }
   ```

2. Aggiornare `src/App.tsx` per usare `deleteTodo` nella funzione `removeTodo` (ora `async`):
   ```tsx
   import { getTodos, createTodo, updateTodo, deleteTodo } from './services/todoService';
   // ...

   const removeTodo = async (id: number) => {
     await deleteTodo(id);
     // Aggiorniamo la UI solo dopo che il service ha confermato la rimozione
     setTodos((prev) => prev.filter((t) => t.id !== id));
   };
   ```

3. Fare il commit con messaggio: `12 - mock API DELETE`

---

### COMMIT 13 — Rifinitura UI: Filtri e Statistiche

**Tag git:** `13-filters-and-stats`

**Obiettivo didattico:** Mettere insieme tutti i concetti visti in un'unica feature completa: stato derivato, rendering condizionale, liste filtrate, componenti composti. Mostrare come React scala con l'aumentare della complessità.

**Operazioni da eseguire:**

1. Creare `src/components/FilterBar.tsx` con tre filtri (All, Active, Completed):
   ```tsx
   export type FilterType = 'all' | 'active' | 'completed';

   interface FilterBarProps {
     activeFilter: FilterType;
     onFilterChange: (filter: FilterType) => void;
     total: number;
     active: number;
     completed: number;
   }

   function FilterBar({ activeFilter, onFilterChange, total, active, completed }: FilterBarProps) {
     const filters: { label: string; value: FilterType; count: number }[] = [
       { label: 'All', value: 'all', count: total },
       { label: 'Active', value: 'active', count: active },
       { label: 'Completed', value: 'completed', count: completed },
     ];

     return (
       <div className="flex gap-1 mb-4 bg-slate-800/50 p-1 rounded-xl border border-slate-700">
         {filters.map(({ label, value, count }) => (
           <button
             key={value}
             onClick={() => onFilterChange(value)}
             className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
               activeFilter === value
                 ? 'bg-indigo-600 text-white shadow'
                 : 'text-slate-400 hover:text-slate-200'
             }`}
           >
             {label}
             <span className={`text-xs px-1.5 py-0.5 rounded-full ${
               activeFilter === value
                 ? 'bg-indigo-500 text-white'
                 : 'bg-slate-700 text-slate-400'
             }`}>
               {count}
             </span>
           </button>
         ))}
       </div>
     );
   }

   export default FilterBar;
   ```

2. Aggiornare `src/App.tsx` con il CRUD completo via service e i filtri:
   ```tsx
   import { useState, useEffect } from 'react';
   import Header from './components/Header';
   import TodoList from './components/TodoList';
   import TodoForm from './components/TodoForm';
   import FilterBar, { FilterType } from './components/FilterBar';
   import { getTodos, createTodo, updateTodo, deleteTodo } from './services/todoService';
   import { Todo } from './types';

   function App() {
     const [todos, setTodos] = useState<Todo[]>([]);
     const [loading, setLoading] = useState<boolean>(true);
     const [filter, setFilter] = useState<FilterType>('all');

     useEffect(() => {
       const loadTodos = async () => {
         const data = await getTodos();
         setTodos(data);
         setLoading(false);
       };
       loadTodos();
     }, []);

     const addTodo = async (text: string) => {
       const newTodo = await createTodo(text);
       setTodos([...todos, newTodo]);
     };

     const toggleTodo = async (id: number) => {
       const todo = todos.find((t) => t.id === id);
       if (!todo) return;
       const updated = await updateTodo(id, { completed: !todo.completed });
       setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
     };

     const removeTodo = async (id: number) => {
       await deleteTodo(id);
       setTodos((prev) => prev.filter((t) => t.id !== id));
     };

     // Stato derivato: calcolato da todos, non salvato in useState separato
     const activeCount = todos.filter((t) => !t.completed).length;
     const completedCount = todos.filter((t) => t.completed).length;

     const filteredTodos = todos.filter((t) => {
       if (filter === 'active') return !t.completed;
       if (filter === 'completed') return t.completed;
       return true;
     });

     if (loading) {
       return (
         <div className="min-h-screen bg-slate-900 flex items-center justify-center">
           <p className="text-slate-400 animate-pulse">Loading...</p>
         </div>
       );
     }

     return (
       <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
         <div className="w-full max-w-lg">
           <Header activeCount={activeCount} />
           <TodoForm onAdd={addTodo} />
           <FilterBar
             activeFilter={filter}
             onFilterChange={setFilter}
             total={todos.length}
             active={activeCount}
             completed={completedCount}
           />
           <TodoList
             todos={filteredTodos}
             onToggle={toggleTodo}
             onRemove={removeTodo}
           />
         </div>
       </div>
     );
   }

   export default App;
   ```

3. Fare il commit con messaggio: `13 - filters and stats`

---

## Note Importanti per l'Agente

1. **Ogni commit deve essere funzionante**: prima di fare il commit, l'app deve compilare senza errori TypeScript e girare correttamente con `npm run dev`.

2. **Nessun `any` in TypeScript**: tipizzare sempre tutto correttamente. Usare `interface` per oggetti e props, `type` per union types.

3. **Nomi in inglese**: tutti i nomi di variabili, funzioni, props, interfacce e tipi devono essere in inglese (`text`, `completed`, `addTodo`, `toggleTodo`, `removeTodo`, ecc.).

4. **Struttura file finale** attesa al termine di tutti i commit:
   ```
   src/
   ├── components/
   │   ├── EmptyState.tsx
   │   ├── FilterBar.tsx
   │   ├── Header.tsx
   │   ├── TodoForm.tsx
   │   ├── TodoItem.tsx
   │   └── TodoList.tsx
   ├── db/
   │   └── todos.json
   ├── services/
   │   └── todoService.ts
   ├── types.ts
   ├── App.tsx
   ├── main.tsx
   └── index.css
   ```

5. **Tag git**: assicurarsi che ogni commit abbia un tag corrispondente (es. `git tag 09-mock-api-get`) così il docente può fare `git checkout <tag>` direttamente.

6. **Non usare librerie aggiuntive** oltre a React, TypeScript, Vite e Tailwind CSS. Nessun router, nessuno state manager esterno, nessun `axios`: l'obiettivo è far capire le basi di React puro.

7. **Commenti nel codice**: aggiungere commenti esplicativi (in italiano) nei punti chiave del codice, specialmente nei commit 05, 07, 08 e nei commit 09-12 dedicati alla simulazione API.

8. **Il service layer** (`todoService.ts`) deve essere costruito **incrementalmente** commit per commit: aggiungere solo la funzione pertinente allo step corrente, senza anticipare le funzioni dei commit successivi.
