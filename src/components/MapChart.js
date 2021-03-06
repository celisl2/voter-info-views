import React, { useState, useEffect } from "react";
import { geoCentroid } from "d3-geo";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation
} from "react-simple-maps";

import allStates from "../data/states.json";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const offsets = {
  VT: [50, -8],
  NH: [34, 2],
  MA: [30, -1],
  RI: [28, 2],
  CT: [35, 10],
  NJ: [34, 1],
  DE: [33, 0],
  MD: [47, 10],
  DC: [49, 21]
};

const MapChart = ({userClickedState}) => {
  const [currState, setCurrState] = useState(null);
  const [activeColor, setActivecolor] = useState("#b5e48c");
  const currentState = React.useRef(userClickedState);

  useEffect(() => {
    console.log("currState is: " + JSON.stringify(currState));
    if(currState){
      currentState.current = currState;
      userClickedState(currState);
    }
  }, [activeColor, currState, currentState]);

  return (
    <ComposableMap projection="geoAlbersUsa" width={1100} className="mapArea" id="map">
      <Geographies geography={geoUrl}>
        {({ geographies}) => (
          <>
            {geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                stroke="#FFF"
                geography={geo}
                fill={geo.properties.name === currState ? "#76c893" : "#b5e48c"}
                style={{
                  default: {
                      fill: geo.properties.name === currState ? "#76c893" : "#b5e48c",
                      outline: "none",
                      stroke: geo.properties.name === currState ? "#525053" : "",
                      strokeWidth: geo.properties.name === currState ? "1.6" : "1",
                      strokeOpacity: geo.properties.name === currState ? ".7" : "1",
                    },
                  pressed: {
                    fill: "#b5e48c",
                    outline: "none",
                    stroke: "#d9ed92"
                  }
                }}
                onClick={() => {
                  setCurrState(geo.properties.name)
                  setActivecolor("#76c893")
                  }}
              />
            ))}
            {geographies.map((geo) => {
              const centroid = geoCentroid(geo);
              const cur = allStates.find((s) => s.val === geo.id);
              return (
                <g key={geo.rsmKey + "-name"}>
                  {cur &&
                    centroid[0] > -160 &&
                    centroid[0] < -67 &&
                    (Object.keys(offsets).indexOf(cur.id) === -1 ? (
                      <Marker coordinates={centroid}>
                        <text y="2" fontSize={14} textAnchor="middle">
                          {cur.id}
                        </text>
                      </Marker>
                    ) : (
                      <Annotation
                        subject={centroid}
                        dx={offsets[cur.id][0]}
                        dy={offsets[cur.id][1]}
                      >
                        <text x={4} fontSize={14} alignmentBaseline="middle">
                          {cur.id}
                        </text>
                      </Annotation>
                    ))}
                </g>
              );
            })}
          </>
        )}
      </Geographies>
    </ComposableMap>
  );
};

export default MapChart;