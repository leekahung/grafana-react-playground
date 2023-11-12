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
        src="http://localhost:3000/d-solo/b41b2535-5019-4ca9-9dd1-5774771c34c9/test-time-series?orgId=1&from=1699722370045&to=1699743970045&panelId=1"
        width="500"
        height="500"
      />
    </div>
  );
}

export default App;
