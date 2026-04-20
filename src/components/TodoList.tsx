import type { Todo } from '../models/todo';
import TodoItem from './TodoItem';
import EmptyState from './EmptyState';

interface TodoListProps {
  todos: Todo[];
}

function TodoList({ todos }: TodoListProps) {
  // Early return: early exit to handle the special case
  if (todos.length === 0) {
    return <EmptyState />;
  }

  // If we get here, the list has at least one element
  return (
    <div className="flex flex-col gap-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}

export default TodoList;
