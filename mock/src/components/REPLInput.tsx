import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";

interface REPLInputProps {
  // TODO: Fill this with desired props... Maybe something to keep track of the submitted commands
  commandHistory: { command: string; output: string }[];
  setCommandHistory: Dispatch<
    SetStateAction<{ command: string; output: string }[]>
  >;
  modeSwitch: number[];
  setModeSwitch: Dispatch<SetStateAction<number[]>>;
  // history: string[];
  // setHistory: Dispatch<SetStateAction<string[]>>;
}
// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props: REPLInputProps) {
  // Remember: let React manage state in your webapp.
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");
  const [previousFile, setPreviousFile] = useState<string>("");
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

  const [csvFormat, setCSVFormat] = useState<string>("");

  // const [count, setCount] = useState<number>(0);
  // const [history, setHistory] = useState<string>("");
  function reformat(csvContents: string[][]) {
    let csvTempFormat = "";
    let htmlTable = "<table>";

    // Assuming the first row contains headers
    htmlTable += "<tr>";
    for (let j = 0; j < csvContents[0].length; j++) {
      htmlTable += `<th>${csvContents[0][j]}</th>`;
    }
    htmlTable += "</tr>";

    for (let i = 1; i < csvContents.length; i++) {
      htmlTable += "<tr>";
      for (let j = 0; j < csvContents[i].length; j++) {
        if (j < csvContents[i].length - 1) {
          csvTempFormat += csvContents[i][j] + ",";
          htmlTable += `<td>${csvContents[i][j]}</td>`;
        } else {
          csvTempFormat += csvContents[i][j];
          htmlTable += `<td>${csvContents[i][j]}</td>`;
        }
      }
      htmlTable += "</tr>";
    }

    htmlTable += "</table>";

    // Wrap the table in a div
    let htmlOutput = `<div class="csv-table">${htmlTable}</div>`;

    // Optionally update the state with both CSV and HTML table formats
    props.setCommandHistory([
      ...props.commandHistory,
      { command: "view", output: htmlOutput }, // Use htmlOutput to include the div-wrapped table
    ]);
  }

  function view_file() {
    if (previousFile == "") {
      props.setCommandHistory([
        ...props.commandHistory,
        {
          command: "load_file",
          output: "A file first needs to be loaded before performing view",
        },
      ]);
    } else {
      reformat(dataMap.get(previousFile));
    }
  }

  function load_file(input: string) {
    let loadedFile = 0;
    let prevFile = "";
    if (dataMap.has(input) && hasFileBeenLoaded == 0) {
      props.setCommandHistory([
        ...props.commandHistory,
        { command: "load_file", output: "File successfully loaded" },
      ]);
      prevFile = input;
      setPreviousFile(prevFile);
      loadedFile = 1;
      setHasFileBeenLoaded(loadedFile);
    } else if (hasFileBeenLoaded == 1) {
      if (input === "") {
        props.setCommandHistory([
          ...props.commandHistory,
          { command: "load_file", output: "File has been already loaded" },
        ]);
      } else {
        prevFile = input;
        setPreviousFile(prevFile);
        props.setCommandHistory([
          ...props.commandHistory,
          {
            command: "load_file",
            output: "Loaded file has been updated to" + input,
          },
        ]);
      }
    } else if (!dataMap.has(input)) {
      props.setCommandHistory([
        ...props.commandHistory,
        { command: "load_file", output: "File not found. Try again." },
      ]);
    } else if (hasFileBeenLoaded == 0) {
      props.setCommandHistory([
        ...props.commandHistory,
        {
          command: "load_file",
          output: "File not previously loaded. Please enter a filepath.",
        },
      ]);
    }
  }

  function handleVerboseSubmit(commandString: string) {
    if (commandString == "") {
      let message = "No command was given, please try again";
      props.setCommandHistory([
        ...props.commandHistory,
        { command: "", output: message },
      ]);
    } else {
      let command = "";
      let input = "";
      for (let i = 0; i < commandString.length; i++) {
        if (commandString[i] == " ") {
          command = commandString.substring(0, i);
          input = commandString.substring(i + 1);
          props.setCommandHistory([
            ...props.commandHistory,
            { command: command, output: input },
          ]);
        } else {
          command.concat(commandString[i]);
        }
      }
      if (!commandString.includes(" ")) {
        let input = "";
        props.setCommandHistory([
          ...props.commandHistory,
          { command: command, output: input },
        ]);
      }
      if (command == "load_file") {
        load_file(input);
      }
      if (command == "view") {
        view_file();
      }
      command = "";
      input = "";
    }
    let s = 1;
    props.setModeSwitch([...props.modeSwitch, s]);
    setCommandString("");
  }

  function handleBriefSubmit(commandString: string) {
    let input = "";
    let command = commandString;
    if (commandString == "") {
      let message = "No command was given, please try again";
      props.setCommandHistory([
        ...props.commandHistory,
        { command: commandString, output: message },
      ]);
    } else {
      props.setCommandHistory([
        ...props.commandHistory,
        { command: command, output: "Command Received" },
      ]);
      setCommandString("");
      let s = 0;
      props.setModeSwitch([...props.modeSwitch, s]);
    }
    for (let i = 0; i < commandString.length; i++) {
      if (commandString[i] == " ") {
        command = commandString.substring(0, i);
        input = commandString.substring(i + 1);
        props.setCommandHistory([
          ...props.commandHistory,
          { command: command, output: input },
        ]);
      } else {
        command.concat(commandString[i]);
      }
    }
    if (!commandString.includes(" ")) {
      props.setCommandHistory([
        ...props.commandHistory,
        { command: commandString, output: input },
      ]);
    }
    if (command == "load_file") {
      load_file(input);
    }
    if (command == "view") {
      view_file();
    }
    command = "";
    input = "";
  }
  //we have to call search_file in the handlers
  function search_file(commandString: string) {
    let result: string[] = [];
    let toSearchBy = "";
    let searchWord = "";

    for (let i = 0; i < commandString.length; i++) {
      if (commandString[i] == " ") {
        toSearchBy = commandString.substring(0, i);
        searchWord = commandString.substring(i + 1);
      } else {
        toSearchBy.concat(commandString[i]);
      }
    }

    let csvArray = dataMap.get(previousFile);
    let index = 0;
    let formattedResult = "";
    if (typeof Number(toSearchBy) === "number") {
      for (let i = 0; i < csvArray.length; i++) {
        if (csvArray[i][Number(toSearchBy)] === searchWord) {
          result.push(csvArray[i]);
        }
      }
    } else {
      for (let i = 0; i < csvArray[0].length; i++) {
        if (csvArray[0][i] === toSearchBy) {
          index = i;
        }

        for (let i = 0; i < csvArray.length; i++) {
          if (csvArray[i][index] === searchWord) {
            result.push(csvArray[i]);
          }
        }
      }
    }

    for (let i = 0; i < result.length; i++) {
      for (let j = 0; j < result[i].length; j++) {
        formattedResult += result[i][j] + " ";
      }
    }

    props.setCommandHistory([
      ...props.commandHistory,
      { command: "search", output: formattedResult },
    ]);
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
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      {/* TODO WITH TA: Build a handleSubmit function that increments count and displays the text in the button */}
      {/* TODO: Currently this button just counts up, can we make it push the contents of the input box to the history?*/}
      <button
        onClick={() => {
          let tempModeSwitch;
          if (commandString.toLowerCase() == "mode") {
            if (props.modeSwitch.length > 0) {
              if (props.modeSwitch[props.modeSwitch.length - 1] == 0) {
                tempModeSwitch = 1;
              } else {
                tempModeSwitch = 0;
              }
            } else {
              tempModeSwitch = 0;
            }
            props.setModeSwitch([...props.modeSwitch, tempModeSwitch]);

            props.setCommandHistory([
              ...props.commandHistory,
              { command: "mode", output: "Mode switch successful" },
            ]);
          } else {
            if (props.modeSwitch[props.modeSwitch.length - 1] == 1) {
              handleVerboseSubmit(commandString);
            } else {
              handleBriefSubmit(commandString);
            }
          }
          setCommandString("");
        }}
      >
        Submit!
      </button>
    </div>
  );
}
