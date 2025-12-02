
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        Tailwind funcionando 🚀
      </h1>

      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-sm text-center">
        <p className="text-gray-700 mb-4">Clicks: {count}</p>

        <button
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Aumentar
        </button>
      </div>

      <p className="mt-6 text-gray-500 text-sm">
        Editá <code className="font-mono">src/App.tsx</code> y guardá para probar HMR 🔥
      </p>
    </div>
  );
}

export default App;
