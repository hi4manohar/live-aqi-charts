import { useState, useEffect } from "react";
import AqiChart from "./AqiChart";
import "./styles.css";

export default function App() {
  const [aqiData, setAqiData] = useState(null);
  const [cityLabels, setCityLabels] = useState([]);
  const [cityAqiLabelData, setCityAqiLabelData] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState([]);

  useEffect(() => {
    if (aqiData) {
      const labels = cityLabels;
      const labelData = [];
      const color = [];

      aqiData.forEach((data) => {
        const cityIndex = labels.indexOf(data.city);
        const aqiData = Number(data.aqi).toFixed(2);

        if (cityIndex === -1) {
          labels.push(data.city);
          labelData[labels.length] = aqiData;
        } else {
          labelData[cityIndex] = aqiData;
        }

        if (aqiData <= 50) {
          color.push("#55a84f");
        } else if (aqiData <= 100) {
          color.push("#a3c853");
        } else if (aqiData <= 200) {
          color.push("#fff833");
        } else if (aqiData <= 300) {
          color.push("#f29c33");
        } else if (aqiData <= 400) {
          color.push("#e93f33");
        } else if (aqiData <= 500) {
          color.push("#af2d24");
        } else {
          color.push("red");
        }
      });

      setCityLabels(labels);
      setCityAqiLabelData(labelData);
      setBackgroundColor(color);
    }
  }, [aqiData, cityLabels]);

  useEffect(() => {
    const conn = new WebSocket("wss://city-ws.herokuapp.com/", [
      "soap",
      "xmpp"
    ]);

    conn.onerror = (error) => {
      console.log("wserror", error);
    };

    conn.onmessage = function (e) {
      setAqiData(JSON.parse(e.data));
    };

    return () => {
      conn.close();
    };
  }, []);

  return (
    <div className="App">
      <h1>Live AQI Charts</h1>
      {aqiData ? (
        <AqiChart
          labels={cityLabels}
          aqidata={cityAqiLabelData}
          backgroundColor={backgroundColor}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
