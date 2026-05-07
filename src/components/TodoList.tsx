import { useRef, useState } from 'react';
import type { Todo } from '../models/todo';
import TodoItem from './TodoItem';
import EmptyState from './EmptyState';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
  onReorder: (draggedId: number, targetId: number) => void;
}

function TodoList({ todos, onToggle, onRemove, onReorder }: TodoListProps) {
  const draggedId = useRef<number | null>(null);
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const [dragOverId, setDragOverId] = useState<number | null>(null);

  const handleDragStart = (id: number) => {
    draggedId.current = id;
    setDraggingId(id);
  };

  const handleDragOver = (e: React.DragEvent, id: number) => {
    e.preventDefault();
    if (draggedId.current !== id) setDragOverId(id);
  };

  const handleDrop = (targetId: number) => {
    if (draggedId.current !== null && draggedId.current !== targetId) {
      onReorder(draggedId.current, targetId);
    }
    setDraggingId(null);
    setDragOverId(null);
    draggedId.current = null;
  };

  const handleDragEnd = () => {
    setDraggingId(null);
    setDragOverId(null);
    draggedId.current = null;
  };

  if (todos.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="flex flex-col gap-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onRemove={onRemove}
          onDragStart={() => handleDragStart(todo.id)}
          onDragOver={(e) => handleDragOver(e, todo.id)}
          onDrop={() => handleDrop(todo.id)}
          onDragEnd={handleDragEnd}
          isDragging={draggingId === todo.id}
          isDragOver={dragOverId === todo.id}
        />
      ))}
    </div>
  );
}

export default TodoList;
