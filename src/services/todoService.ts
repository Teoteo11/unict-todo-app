import type { Todo } from '../models/todo';
import initialData from '../db/todos.json';

// Simulated in-memory database (reset on page refresh)
const mockDb: Todo[] = [...initialData];

// Simulate network latency
const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// GET /todos — returns all todos
export async function getTodos(): Promise<Todo[]> {
  await delay(300);
  // defensive copy: the component does not mutate mockDb directly
  return [...mockDb];
}
