import { useState } from "react";
import "./App.scss";
import { ReactComponent as Arrow } from "./arrow.svg";

function App() {
  const [colourBG, setColourBG] = useState("#FFFFFF");
  const [colourText, setColourText] = useState("#000000");

  function pickTextColorBasedOnBgColorAdvanced(bgColor, lightColor, darkColor) {
    const color = bgColor.charAt(0) === "#" ? bgColor.substring(1, 7) : bgColor;
    const r = parseInt(color.substring(0, 2), 16); // hexToR
    const g = parseInt(color.substring(2, 4), 16); // hexToG
    const b = parseInt(color.substring(4, 6), 16); // hexToB
    const uicolors = [r / 255, g / 255, b / 255];
    const c = uicolors.map((col) => {
      if (col <= 0.03928) {
        return col / 12.92;
      }
      return Math.pow((col + 0.055) / 1.055, 2.4);
    });
    const L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
    return L > 0.179 ? darkColor : lightColor;
  }
  function handleChangeColour(e) {
    setColourBG(e.target.value);
    setColourText(pickTextColorBasedOnBgColorAdvanced(e.target.value, "#FFFFFF", "#000000"));
  }

  return (
    <div className="App" style={{ backgroundColor: colourBG, color: colourText }}>
      <div className="arrow-box">
        <Arrow fill={colourText} className="arrow-box__arrow--top" />
        <Arrow fill={colourText} className="arrow-box__arrow--left" />
        <Arrow fill={colourText} className="arrow-box__arrow--right" />
        <Arrow fill={colourText} className="arrow-box__arrow--bottom" />
        <input
          type="color"
          onChange={handleChangeColour}
          defaultValue="#ffffff"
          className="bg"
          style={{ border: `4px solid ${colourText}` }}
        />
      </div>
      {colourText === "#FFFFFF" ? <p>A Lighter font goes with {colourBG}</p> : <p>A Darker font goes with {colourBG}</p>}
    </div>
  );
}

export default App;
