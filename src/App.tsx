
import './App.css'
import GamePage from "./components/pages/GamePage.tsx";
import { GameProvider } from './contexts/GameContexts.tsx';

function App() {

  return (
    <GameProvider>
      <GamePage />
    </GameProvider>
  )
}

export default App
