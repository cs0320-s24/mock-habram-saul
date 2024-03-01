import { useState } from "react";
import "../styles/main.css";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";
import { Dispatch, SetStateAction } from "react";

/**
 * This function is responsible for passing shared state props to REPLHistory and REPLInput
 * @interface REPL
 * @property {command: string, output: string} cHistory: this prop serves to record the entire history of the
 * commands that were input into the command line. this information is stored in the form of a list of tuples
 * @property {Array<{command: string, output: string}>} setCHistory: this props serves to update the cHistory
 * @property {string} cMode: this prop serves to record the current mode of information we must diplay.
 * this information is stored in stored in the form of a string (either "brief" or "verbose")
 * @property {string} setCMode: this prop serves to update the cMode
 * @property {Map<string, function>} commandMap: this prop serve to store the event handlers that another
 * developer would like to be able to utilize when running Mock. this information is stored in a Map, which
 * stores string keys and has values of type function.
 * @property {Map<string, funtion>} setCommandMap: this prop serves to update the commandMap
 */

export default function REPL() {
  const [cHistory, setCHistory] = useState<
    { command: string; output: string }[]
  >([]);
  const [cMode, setCMode] = useState<string>("brief");
  const [commandMap, setCommandMap] = useState<Map<string, Function>>(
    new Map<string, Function>()
  );

  return (
    <div className="repl">
      {}
      {}
      <REPLHistory commandHistory={cHistory} modeSwitch={cMode} />
      <hr></hr>
      <REPLInput
        cHistory={cHistory}
        setCHistory={setCHistory}
        cMode={cMode}
        setCMode={setCMode}
        commandMap={commandMap}
        setCommandMap={setCommandMap}
      />
    </div>
  );
}
