import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";

interface REPLInputProps {
  cHistory: { command: string; output: string }[];
  setCHistory: Dispatch<SetStateAction<{ command: string; output: string }[]>>;
  cMode: string;
  setCMode: Dispatch<SetStateAction<string>>;
  commandMap: Map<string, Function>;
  setCommandMap: Dispatch<SetStateAction<Map<string, Function>>>;
}
// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props: REPLInputProps) {
  const [cString, setCString] = useState<string>("");
  const [prevFile, setPrevFile] = useState<string>("");
  const [hasFileBeenLoaded, setHasFileBeenLoaded] = useState<number>(0);
  props.commandMap.set("load_file", load_file);
  props.commandMap.set("view", view_file);
  props.commandMap.set("search", search);
  let dataMap = new Map();
  const exampleCSV1 = [
    [1, 2, 3, 4, 5],
    ["The", "song", "remains", "the", "same."],
  ];
  const exampleCSV2 = [
    [1, 2, 3, 4, 5],
    ["Japan", "is", "pretty", "hard", ":(."],
  ];
  const exampleCSV3 = [["Tacos", "Pizza", "Ice cream", "Donuts", "Soda"]];
  dataMap.set("data/songs/exampleCSV1", exampleCSV1);
  dataMap.set("data/songs/exampleCSV2", exampleCSV2);
  dataMap.set("data/foods/exampleCSV3", exampleCSV3);

  function runCommand(commandFunction: Function) {
    commandFunction();
  }

  function makeTableHTML(myArray: string[][]) {
    // var result = [];
    var finalString = "<center><table border =1>";
    for (var i = 0; i < myArray.length; i++) {
      finalString += "<tr>";
      for (var j = 0; j < myArray[i].length; j++) {
        finalString += "<td>" + myArray[i][j] + "</td>";
      }
      finalString += "</tr>";
    }
    finalString += "</table></center>";

    return finalString;
  }

  function modeCall() {
    let c = "mode";
    let newMode = "";
    let o = "Mode successfully changed to: ";
    if (props.cMode == "brief") {
      newMode = "verbose";
      props.setCMode(newMode);
    } else {
      newMode = "brief";
      props.setCMode(newMode);
    }

    props.setCHistory([...props.cHistory, { command: c, output: o + newMode }]);
  }

  function view_file() {
    let c = "view";
    if (prevFile == "") {
      let o = "A file first needs to be loaded before performing view";
      props.setCHistory([...props.cHistory, { command: c, output: o }]);
    } else {
      let o = makeTableHTML(dataMap.get(prevFile));
      props.setCHistory([...props.cHistory, { command: c, output: o }]);
    }
  }

  function load_file(input: string) {
    let lFile = 0;
    let pFile = "";
    let c = "load_file";

    if (!dataMap.has(input)) {
      let o = "Invalid filepath; please try again";
      props.setCHistory([...props.cHistory, { command: c, output: o }]);
    } else if (dataMap.has(input) && hasFileBeenLoaded === 0) {
      let o = "File successfully loaded";
      props.setCHistory([...props.cHistory, { command: c, output: o }]);
      pFile = input;
      setPrevFile(pFile);
      lFile = 1;
      setHasFileBeenLoaded(lFile);
    } else if (hasFileBeenLoaded == 1) {
      if (input === prevFile) {
        let o = "Desired file has already been loaded";
        props.setCHistory([...props.cHistory, { command: c, output: o }]);
      } else if (input === "") {
        let o = "In order to load a file, you must insert a filepath";
        props.setCHistory([...props.cHistory, { command: c, output: o }]);
      } else {
        let o = "Loaded file has been updated to " + input;
        pFile = input;
        setPrevFile(pFile);
        props.setCHistory([...props.cHistory, { command: c, output: o }]);
      }
    } else if (hasFileBeenLoaded == 0) {
      let o =
        "No file has been previously loaded! Please enter a filepath alongside the load_file command";
      props.setCHistory([...props.cHistory, { command: c, output: o }]);
    }
  }

  function handleSubmit(input: string) {
    let c = "";
    let v = [];
    // let d = "";
    // let b = [];

    if (input === "") {
      let o = "No command was given, please try again";
      props.setCHistory([...props.cHistory, { command: "", output: o }]);
    }
    let parts = input.split(/\s+/);
    c = parts[0];
    v = parts.slice(1);
    // c = input.substring(0, b[0]);
    // v = input.substring(b[0] + 1, b[1]);
    // d = input.substring(b[1] + 1, b[2]);

    // if (!input.includes(" ")) {
    //   c = input;
    // }
    // }
    if (props.commandMap.has(c)) {
      const func = props.commandMap.get(c)!; // Non-null assertion
      try {
        const output = func(...v); // Assuming func should be called with the arguments in v
        props.setCHistory([...props.cHistory, { command: c, output: output }]);
      } catch (error) {
        props.setCHistory([
          ...props.cHistory,
          {
            command: c,
            output: "Error executing command: " + c,
          },
        ]);
      }
    } else {
      let o = "Command does not exist. Please try again.";
      props.setCHistory([...props.cHistory, { command: "", output: o }]);
    }
    // let doesThisExist = props.commandMap.get(c);
    // runCommand(doesThisExist);

    // if (c === "view") {
    //   view_file();
    // } else if (c === "load_file") {
    //   load_file("data/songs/exampleCSV2");
    //   // } else if (c === "mode") {
    //   //   modeCall();
    //   // } else if (c === "search") {
    //   //   search(v, d);
    //   // }
    // }
  }

  function search(vS: string, dS: string) {
    let s = "search ";
    if (prevFile != "") {
      let o = makeTableHTML(dataMap.get(prevFile));
      props.setCHistory([
        ...props.cHistory,
        { command: s + vS + dS, output: o },
      ]);
    } else {
      let o =
        "No file has been loaded. Please load a file before running search";
      props.setCHistory([
        ...props.cHistory,
        { command: s + vS + dS, output: o },
      ]);
    }
  }

  /**
   * We suggest breaking down this component into smaller components, think about the individual pieces
   * of the REPL and how they connect to each other...
   */

  return (
    <div className="repl-input">
      {/* This is a comment within the JSX. Notice that it's a TypeScript comment wrapped in
            braces, so that React knows it should be interpreted as TypeScript */}
      {/* I opted to use this HTML tag; you don't need to. It structures multiple input fields
            into a single unit, which makes it easier for screenreaders to navigate. */}
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={cString}
          setValue={setCString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      {/* TODO WITH TA: Build a handleSubmit function that increments count and displays the text in the button */}
      {/* TODO: Currently this button just counts up, can we make it push the contents of the input box to the history?*/}
      <button
        onClick={() => {
          handleSubmit(cString);
        }}
      >
        Submit!
      </button>
    </div>
  );
}
