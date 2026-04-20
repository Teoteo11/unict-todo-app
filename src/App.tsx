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
