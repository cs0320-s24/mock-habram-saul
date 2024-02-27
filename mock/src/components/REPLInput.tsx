import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";

interface REPLInputProps {
  cHistory: {command: string; output: string}[];
  setCHistory: Dispatch<SetStateAction<{ command: string; output: string }[]>>;
  cMode : string; 
  setCMode: Dispatch<SetStateAction<string>>;
}

// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props: REPLInputProps) {
  const [cString, setCString] = useState<string>("");
  const [prevFile, setPrevFile] = useState<string>("");
  const [hasFileBeenLoaded, setHasFileBeenLoaded] = useState<number>(0);

  let dataMap = new Map();
  const exampleCSV1 = [
    [1, 2, 3, 4, 5],
    ["The", "song", "remains", "the", "same."],
  ];
  const exampleCSV2 = [
    [1, 2, 3, 4, 5],
    ["Japan", "is", "pretty", "hard", ":(."],
  ];
  dataMap.set("data/songs/exampleCSV1", exampleCSV1);
  dataMap.set("data/songs/exampleCSV2", exampleCSV2);

  function modeCall() {
    let c = "mode";
    let newMode = ""
    let o = "Mode successfully changed to: "
    if (props.cMode == "brief") {
      newMode = "verbose";
      props.setCMode(newMode);
    } else {
      newMode = "brief";
      props.setCMode(newMode);
    }

    props.setCHistory([...props.cHistory, {command: c, output: o + newMode}]);
  }

  function view_file() {
    let c = "view";
    if (prevFile == "") {
      let o = "A file first needs to be loaded before performing view";
      props.setCHistory([...props.cHistory,{command: c, output: o}]);
    } else {
      let o  = dataMap.get(prevFile).toString(); 
      props.setCHistory([...props.cHistory, {command: c, output: o}]);
    }
  }

  function load_file(input: string) {
    let lFile = 0;
    let pFile = "";
    let c = "load_file";

    if (!dataMap.has(input)) {
      let o = "Invalid filepath; please try again"
      props.setCHistory([...props.cHistory, {command: c, output: o}])
    } else if (dataMap.has(input) && hasFileBeenLoaded === 0) {
      let o = "File successfully loaded"; 
      props.setCHistory([...props.cHistory, {command: c, output: o}]);
      pFile = input;
      setPrevFile(pFile);
      lFile = 1;
      setHasFileBeenLoaded(lFile);
    } else if (hasFileBeenLoaded == 1) {
      if (input === prevFile) {
        let o = "Desired file has already been loaded";
        props.setCHistory([...props.cHistory, {command: c, output: o}]);
      } else if (input === "") {
        let o = "In order to load a file, you must insert a filepath";
        props.setCHistory([...props.cHistory, {command: c, output: o}]);
      } else {
        let o = "Loaded file has been updated to " + input;
        pFile = input;
        setPrevFile(pFile);
        props.setCHistory([...props.cHistory, {command: c, output: o}]);
      }
    } else if (hasFileBeenLoaded == 0) {
      let o = "No file has been previously loaded! Please enter a filepath alongside the load_file command";
      props.setCHistory([...props.cHistory, {command: c, output: o}]);
    }
  }

  function handleSubmit(input : string) {
    let c = "";
    let v = "";

    if (input === "") {
      let o = "No command was given, please try again";
      props.setCHistory([...props.cHistory, {command: "", output: o}]);
    } else {
      for (let i = 0; i < input.length; i++) {
        if (input[i] === " ") {
          c = input.substring(0, i);
          v = input.substring(i + 1);
          /**
           * Ideally, we will remove the remaining portion of this if-statement as we will utilize c
           * as the command that we will follow (i.e., view, load_file, etc...)
           */
          props.setCHistory([...props.cHistory, {command: c, output: v}]);
        }
      }
      if (!input.includes(" ")) {
        c = input; 
      }
    }

    if (c === "view") {
      view_file();
    } else if (c === "load_file") {
      load_file(v);
    } else if (c === "mode") {
      modeCall();
    }
  }

  //we have to call search_file in the handlers
  // function search_file(commandString: string) {
  //   let result: string[] = [];
  //   let toSearchBy = "";
  //   let searchWord = "";

  //   for (let i = 0; i < commandString.length; i++) {
  //     if (commandString[i] == " ") {
  //       toSearchBy = commandString.substring(0, i);
  //       searchWord = commandString.substring(i + 1);
  //     } else {
  //       toSearchBy.concat(commandString[i]);
  //     }
  //   }

  //   let csvArray = dataMap.get(previousFile);
  //   let index = 0;
  //   let formattedResult = "";
  //   if (typeof Number(toSearchBy) === "number") {
  //     for (let i = 0; i < csvArray.length; i++) {
  //       if (csvArray[i][Number(toSearchBy)] === searchWord) {
  //         result.push(csvArray[i]);
  //       }
  //     }
  //   } else {
  //     for (let i = 0; i < csvArray[0].length; i++) {
  //       if (csvArray[0][i] === toSearchBy) {
  //         index = i;
  //       }

  //       for (let i = 0; i < csvArray.length; i++) {
  //         if (csvArray[i][index] === searchWord) {
  //           result.push(csvArray[i]);
  //         }
  //       }
  //     }
  //   }

  //   for (let i = 0; i < result.length; i++) {
  //     for (let j = 0; j < result[i].length; j++) {
  //       formattedResult += result[i][j] + " ";
  //     }
  //   }

  //   props.setCommandHistory([
  //     ...props.commandHistory,
  //     { command: "search", output: formattedResult },
  //   ]);
  // }

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
        onClick= {() => {
          handleSubmit(cString);
        }}
      >
        Submit!
      </button>
    </div>
  );
}
