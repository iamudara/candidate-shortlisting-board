import { CandidateProvider } from "./presentation/context/CandidateContext";
import { Home } from "./presentation/pages/Home";
import "./App.css"; // Keep standard styles or remove? Better keep for resets if any, but default vite App.css is center-aligned.
// Let's assume we want to rely on Tailwind mostly.

function App() {
  return (
    <CandidateProvider>
      <Home />
    </CandidateProvider>
  );
}

export default App;
