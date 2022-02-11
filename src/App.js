import { useState, useEffect } from "react";
import "./App.css";

const letters = [
  "C",
  "C♯/D♭",
  "D",
  "D♯/E♭",
  "E",
  "F",
  "F♯/G♭",
  "G",
  "G♯/A♭",
  "A",
  "A♯/B♭",
  "B",
];

const positions = {};
letters.forEach((letter, i) => {
  positions[letter] = i;
});

function noteSeq(start, len) {
  const pos = positions[start];
  const a = arrayRotate(letters, -pos);

  const n = Math.floor(len / a.length);
  const r = len % a.length;
  return [].concat(...new Array(n).fill(null).map((_) => a), new Array(r));
}

function randomElemFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function randomKeyFromObject(object) {
  return randomElemFromArray(Object.keys(object));
}

function randomNote(notes) {
  const string = randomKeyFromObject(notes);
  return randomElemFromArray(notes[string]);
}

function reverse(arr, start, end) {
  while (start < end) {
    [arr[start], arr[end]] = [arr[end], arr[start]];
    start++;
    end--;
  }
}

function arrayRotate(a, k) {
  if (k < 0) {
    k = a.length + k;
  }
  k %= a.length;

  const nums = a.slice();

  reverse(nums, 0, nums.length - 1);
  reverse(nums, 0, k - 1);
  reverse(nums, k, nums.length - 1);

  return nums;
}

function App() {
  const [settings, setSettings] = useState({
    showStringNames: true,
    showNotes: false,
    allowOpenStrings: true,
    nbFrets: 13,
  });

  const notes = {
    low_e: noteSeq("E", settings.nbFrets),
    a: noteSeq("A", settings.nbFrets),
    d: noteSeq("D", settings.nbFrets),
    g: noteSeq("G", settings.nbFrets),
    b: noteSeq("B", settings.nbFrets),
    high_e: noteSeq("E", settings.nbFrets),
  };

  const [expectedNote, setExpectedNote] = useState(randomNote(notes));
  const [selectedNote, setSelectedNote] = useState();

  const [score, setScore] = useState({
    nbCorrect: 0,
    nbCorrectStreak: 0,
    nbInCorrect: 0,
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (selectedNote) {
      if (selectedNote === expectedNote) {
        setScore((s) => ({
          ...s,
          nbCorrect: s.nbCorrect + 1,
          nbCorrectStreak: s.nbCorrectStreak + 1,
        }));
        setSelectedNote(null);
        setMessage("nice 👍");
        setTimeout(() => {
          const newNote = randomNote(notes);
          setExpectedNote(newNote);
          setMessage("");
        }, 1000);
      } else {
        setScore((s) => ({
          ...s,
          nbInCorrect: s.nbInCorrect + 1,
          nbCorrectStreak: 0,
        }));
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
        <div>
          {score.nbCorrect}|{score.nbCorrectStreak}|{score.nbInCorrect}
        </div>
        <div className="guitar-neck">
          <div className="fret first"></div>

          {new Array(notes[Object.keys(notes)[0]].length - 1)
            .fill(null)
            .map((_, i) => (
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
              .map((stringName, i) => (
                <li
                  style={{
                    height: 1 + i,
                  }}
                  key={`string-${stringName}`}
                ></li>
              ))}
          </ul>

          <ul className="open-notes">
            {Object.keys(notes)
              .reverse()
              .map((stringName) => (
                <li
                  key={`open_note_${stringName}`}
                  style={{
                    cursor: settings.allowOpenStrings ? "pointer" : "default",
                    color: settings.allowOpenStrings ? "white" : "gray",
                  }}
                  onClick={() => {
                    if (!settings.allowOpenStrings) {
                      return;
                    }
                    setSelectedNote(notes[stringName][0]);
                  }}
                >
                  {settings.showStringNames && notes[stringName][0]}
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
                    {settings.showNotes && note.split("/")[0]}
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
                    {settings.showNotes && note.split("/")[0]}
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
                    {settings.showNotes && note.split("/")[0]}
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
                    {settings.showNotes && note.split("/")[0]}
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
                    {settings.showNotes && note.split("/")[0]}
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
                    {settings.showNotes && note.split("/")[0]}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <br></br>
        <div>
          <button
            onClick={() => {
              setSettings((settings) => ({
                ...settings,
                showStringNames: !settings.showStringNames,
              }));
            }}
          >
            {settings.showNotes ? "hide string name" : "show string names"}
          </button>
          <button
            onClick={() => {
              setSettings((settings) => ({
                ...settings,
                showNotes: !settings.showNotes,
              }));
            }}
          >
            {settings.showNotes ? "hide notes" : "show notes"}
          </button>
          <button
            onClick={() => {
              setSettings((settings) => ({
                ...settings,
                allowOpenStrings: !settings.allowOpenStrings,
              }));
            }}
          >
            {settings.allowOpenStrings
              ? "allow open strings"
              : "forbid open strings"}
          </button>
          <div>
            number of frets
            <button
              onClick={(_) => {
                setSettings((s) => ({ ...s, nbFrets: s.nbFrets - 1 }));
              }}
            >
              -
            </button>
            {settings.nbFrets}
            <button
              onClick={(_) => {
                setSettings((s) => ({ ...s, nbFrets: s.nbFrets + 1 }));
              }}
            >
              +
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

function FretBoard({}) {}

export default App;
