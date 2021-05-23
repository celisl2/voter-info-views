import MapChart from './components/MapChart';
import ReactTooltip from "react-tooltip";
import { useState } from "react";
import './App.css';
import SideBar from './components/SideBar';
import Header from './components/Header';

function App() {
  const [content, setContent] = useState("");
  const [currentStateClicked, setCurrentStateClicked] = useState(null);

  return (
    <div className="App">
      <Header />
      
      <button className="pulseBtn">
      
      <span><a href="#map"><i class="gg-arrow-long-down"></i></a></span>
      </button>
      <MapChart setTooltipContent={setContent} userClickedState={setCurrentStateClicked} />
      <ReactTooltip>{content}</ReactTooltip>
      <SideBar currentState={currentStateClicked}/>
    </div>
  );
}

export default App;
