import type { Todo } from '../models/todo';
import initialData from '../db/todos.json';

// Note: todos.json is used only as an initial seed.
// The CRUD operations modify only mockDb in memory and do not write to the file.
// Simulated in-memory database (reset on page refresh)
let mockDb: Todo[] = [...initialData];

// Simulate network latency
const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// GET /todos — returns all todos
export async function getTodos(): Promise<Todo[]> {
  await delay(300);
  // defensive copy: the component does not mutate mockDb directly
  return [...mockDb];
}

// POST /todos — creates a new todo and adds it to the db
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

// PUT /todos/:id — partially updates an existing todo
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
