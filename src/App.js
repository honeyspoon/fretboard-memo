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

// TODO: get rid of this
function noteFromString(stringName) {
  return stringName.charAt(stringName.length - 1).toUpperCase();
}

function randomElemFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function randomKeyFromObject(object) {
  return randomElemFromArray(Object.keys(object));
}

function randomNote() {
  const string = randomKeyFromObject(notes);
  return randomElemFromArray(notes[string]);
}

function App() {
  const [expectedNote, setExpectedNote] = useState(randomNote());
  const [selectedNote, setSelectedNote] = useState();
  const [showNotes, setShowNotes] = useState(false);
  const [showStringNames, setShowStringNames] = useState(true);
  const [message, setMessage] = useState("");

  function changeExpectedNote() {
    const newNote = randomNote();
    setExpectedNote(newNote);
  }

  useEffect(() => {
    if (selectedNote) {
      if (selectedNote === expectedNote) {
        setSelectedNote(null);
        setMessage("nice 👍");
        setTimeout(() => {
          changeExpectedNote();
          setMessage("");
        }, 1000);
      } else {
        setMessage("bad 🙃");
      }
    }
  }, [selectedNote, expectedNote]);

  return (
    <div className="App">
      <header className="App-header">
        Fretboard memo
        {<div>{expectedNote}</div>}
        {selectedNote && <div>{selectedNote}</div>}
        {message}
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
            {Object.keys(notes)
              .reverse()
              .map((stringName) => (
                <li key={`string-${stringName}`}></li>
              ))}
          </ul>

          <ul className="open-notes">
            {Object.keys(notes)
              .reverse()
              .map((stringName) => (
                <li
                  key={`open_note_${stringName}`}
                  onClick={() => {
                    setSelectedNote(noteFromString(stringName));
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
      </header>
      <div>
        <button
          onClick={() => {
            setShowStringNames((show) => !show);
          }}
        >
          {showStringNames ? "hide string name" : "show string names"}
        </button>
        <button
          onClick={() => {
            setShowNotes((show) => !show);
          }}
        >
          {showNotes ? "hide notes" : "show notes"}
        </button>
      </div>
    </div>
  );
}

export default App;
