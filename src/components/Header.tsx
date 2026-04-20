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
