import CopySymbol from "./assets/Symobol Of Copy .png";
import "./App.css";
import { useState, useCallback, useRef, useEffect } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllow, setNumberAllowe] = useState(false);
  const [SmallAlphabetAllow, SetSmallAlphabetAllow] = useState(false);
  const [CapitalAlphabetAllow, SetCapitalAlphabetAllow] = useState(false);
  const [uniqueAllow, setuniqueAllow] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "";
    if(SmallAlphabetAllow) str +="abcdefghijklmnopqrstuvwxyz";
    if(CapitalAlphabetAllow) str +="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numberAllow) str += "0123456789";
    if (uniqueAllow) str += "~!@#$%^&*({}[]\/";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllow, SmallAlphabetAllow, CapitalAlphabetAllow, uniqueAllow, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllow, SmallAlphabetAllow, CapitalAlphabetAllow, uniqueAllow, passwordGenerator]);
  let passwordref = useRef(null);
  let clicktocopy = useCallback(() => {
    passwordref.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);
  return (
    <>
      <div className="mainContainer">
        <div className="container1">
          <input
            type="text"
            value={password}
            placeholder="password"
            readOnly
            className="passwordInput"
            ref={passwordref}
          />{" "}
          <img
            className="copysymbol"
            src={CopySymbol}
            alt="copy button"
            onClick={clicktocopy}
          />
          {/* <div className="underline"></div> */}
        </div>
        <h2 className="headline">Customize your password</h2>
        <div className="container2">
          <div className="part1">
            <input
              type="number"
              value={length}
              className="lengthcount"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <input
              type="range"
              className="range"
              value={length}
              min={6}
              max={100}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
          </div>
          <div className="part2">
            <ul>
              <li>
                <label>
                  <input
                    type="checkbox"
                    defaultChecked={SmallAlphabetAllow}
                    onChange={() => {
                      SetSmallAlphabetAllow((prev) => !prev);
                    }}
                  />{" "}
                  Add Small Alphabet{" "}
                </label>
              </li>
              <li>
                <label>
                  <input
                    type="checkbox"
                    defaultChecked={CapitalAlphabetAllow}
                    onChange={() => {
                      SetCapitalAlphabetAllow((prev) => !prev);
                    }}
                  />{" "}
                  Add Capital Alphabet{" "}
                </label>
              </li>
              <li>
                <label>
                  <input
                    type="checkbox"
                    defaultChecked={numberAllow}
                    onChange={() => {
                      setNumberAllowe((prev) => !prev);
                    }}
                  />{" "}
                  Add Number
                </label>
              </li>
              <li>
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    defaultChecked={uniqueAllow}
                    onChange={() => {
                      setuniqueAllow((prev) => !prev);
                    }}
                  />{" "}
                  Add Unique Symbol{" "}
                </label>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
