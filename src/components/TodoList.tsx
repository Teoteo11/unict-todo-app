import type { Todo } from '../models/todo';
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
        // key  REQUIRED — must be unique and stable
        // DO NOT use the index as key: causes bugs with reordering and animations
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
