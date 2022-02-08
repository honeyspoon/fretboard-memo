import { useState, useEffect } from "react";
import "./App.css";

const notes = {
  low_e: ["E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E"],
  a: ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A"],
  d: ["D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D"],
  g: ["G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G"],
  b: ["B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],
  high_e: [
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
    "C",
    "C#",
    "D",
    "D#",
    "E",
  ],
};

function noteFromString(stringName) {
  return stringName.charAt(stringName.length - 1).toUpperCase();
}

function randomFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}
function randomNote() {
  return randomFromArray(notes["a"]);
}

function App() {
  const [expectedNote, setExpectedNote] = useState(randomNote());
  const [selectedNote, setSelectedNote] = useState();
  const [showNotes, setShowNotes] = useState(false);
  const [showStringNames, setShowStringNames] = useState(true);

  function changeExpectedNote() {
    const newNote = randomNote();
    setExpectedNote(newNote);
  }

  useEffect(() => {
    if (selectedNote) {
      if (selectedNote === expectedNote) {
        console.log("good");
        changeExpectedNote();
      } else {
        console.log("bad");
      }
    }
  }, [selectedNote]);

  return (
    <div className="App">
      <header className="App-header">
        {<div>{expectedNote}</div>}
        {selectedNote && <div>{selectedNote}</div>}
        <div className="guitar-neck">
          <div className="fret first"></div>
          {new Array(Object.keys(notes).length - 1).fill(null).map((_, i) => (
            <div key={`fret-${i + 1}`} className="fret"></div>
          ))}

          <ul className="dots">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>

          <ul className="strings">
            {Object.keys(notes).map((stringName) => (
              <li key={`string-${stringName}`}></li>
            ))}
          </ul>

          <ul className="open-notes">
            {Object.keys(notes).map((stringName) => (
              <li
                key={`open_note_${stringName}`}
                onClick={() => {
                  setSelectedNote(stringName);
                }}
              >
                {showStringNames && noteFromString(stringName)}
              </li>
            ))}
          </ul>

          <div className="notes">
            <div className="mask low-e">
              <ul>
                {notes["low_e"].map((note, i) => (
                  <li
                    key={`low_e-${note}-${i}`}
                    note={note}
                    onClick={() => {
                      setSelectedNote(note);
                    }}
                  >
                    {showNotes && note}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mask a">
              <ul>
                {notes["a"].map((note, i) => (
                  <li
                    key={`a-${note}-${i}`}
                    note={note}
                    onClick={() => {
                      setSelectedNote(note);
                    }}
                  >
                    {showNotes && note}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mask d">
              <ul>
                {notes["d"].map((note, i) => (
                  <li
                    key={`d-${note}-${i}`}
                    note={note}
                    onClick={() => {
                      setSelectedNote(note);
                    }}
                  >
                    {showNotes && note}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mask g">
              <ul>
                {notes["g"].map((note, i) => (
                  <li
                    key={`g-${note}-${i}`}
                    note={note}
                    onClick={() => {
                      setSelectedNote(note);
                    }}
                  >
                    {showNotes && note}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mask b">
              <ul>
                {notes["b"].map((note, i) => (
                  <li
                    key={`b-${note}-${i}`}
                    note={note}
                    onClick={() => {
                      setSelectedNote(note);
                    }}
                  >
                    {showNotes && note}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mask high-e">
              <ul>
                {notes["high_e"].map((note, i) => (
                  <li
                    key={`high_e-${note}-${i}`}
                    note={note}
                    onClick={() => {
                      setSelectedNote(note);
                    }}
                  >
                    {showNotes && note}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div>
          <button onClick={() => setShowStringNames((show) => !show)}>
            {showStringNames ? "show string name" : "hide string names"}
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
