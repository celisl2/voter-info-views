import MapChart from './components/MapChart';
import ReactTooltip from "react-tooltip";
import { useState } from "react";
import './App.css';

function App() {
  const [content, setContent] = useState("");

  return (
    <div className="App">
      <MapChart setTooltipContent={setContent} />
      <ReactTooltip>{content}</ReactTooltip>
    </div>
  );
}

export default App;
