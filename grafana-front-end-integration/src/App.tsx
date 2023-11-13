import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  return (
    <div className="flex flex-col items-center gap-10">
      <div className="flex gap-5">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="text-5xl text-green-500">Vite + React</h1>
      <iframe
        src="http://localhost:3000/d/e9f9d352-b976-4454-a1bd-fab94c7de7a2/test-time-series?orgId=1&from=1699842966227&to=1699864566227&viewPanel=1"
        width="500"
        height="500"
      />
      <iframe
        src="http://localhost:3000/d/bea322d3-b935-479a-8ada-1b521448b3a7/test-gauge?orgId=1&from=1699843026772&to=1699864626772&viewPanel=1"
        width="500"
        height="500"
      />
    </div>
  );
}

export default App;
