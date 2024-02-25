import { useState } from "react";
import "../styles/main.css";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";
import { Dispatch, SetStateAction } from "react";

/* 
  You'll want to expand this component (and others) for the sprints! Remember 
  that you can pass "props" as function arguments. If you need to handle state 
  at a higher level, just move up the hooks and pass the state/setter as a prop.
  
  This is a great top level component for the REPL. It's a good idea to have organize all components in a component folder.
  You don't need to do that for this gearup.
*/

export default function REPL() {
  // TODO: Add some kind of shared state that holds all the commands submitted.
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [inputHistory, setInputHistory] = useState<string[]>([]);
  const [modeSwitch, setModeSwitch] = useState<number[]>([]);
  // const setModeSwitch = useState<number[]>();
  // const [history, setHistory] = useState<[string, string]>(["", ""]);
  return (
    <div className="repl">
      {/*This is where your REPLHistory might go... You also may choose to add it within your REPLInput 
      component or somewhere else depending on your component organization. What are the pros and cons of each? */}
      {/* TODO: Update your REPLHistory and REPLInput to take in new shared state as props */}
      <REPLHistory
        commandHistory={commandHistory}
        inputHistory={inputHistory}
        modeSwitch={modeSwitch}
      />
      <hr></hr>
      <REPLInput
        commandHistory={commandHistory}
        setCommandHistory={setCommandHistory}
        inputHistory={inputHistory}
        setInputHistory={setInputHistory}
        modeSwitch={modeSwitch}
        setModeSwitch={setModeSwitch}
      />
    </div>
  );
}