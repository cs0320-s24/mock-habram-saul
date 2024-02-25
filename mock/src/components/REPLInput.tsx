import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";

interface REPLInputProps {
  // TODO: Fill this with desired props... Maybe something to keep track of the submitted commands
  commandHistory: string[];
  setCommandHistory: Dispatch<SetStateAction<string[]>>;
  inputHistory: string[];
  setInputHistory: Dispatch<SetStateAction<string[]>>;
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
  const [modeSwitch, setModeSwitch] = useState<number>(0);
  // const [count, setCount] = useState<number>(0);
  // const [history, setHistory] = useState<string>("");

  function handleVerboseSubmit(commandString: string) {
    if (commandString == "") {
      props.setCommandHistory([...props.commandHistory, commandString]);
      let message = "No command was given, please try again";
      props.setInputHistory([...props.inputHistory, message]);
    } else {
      let command = "";
      let input = "";
      for (let i = 0; i < commandString.length; i++) {
        if (commandString[i] == " ") {
          command = commandString.substring(0, i);
          props.setCommandHistory([...props.commandHistory, command]);
          input = commandString.substring(i + 1);
          props.setInputHistory([...props.inputHistory, input]);
        } else {
          command.concat(commandString[i]);
        }
      }
      if (!commandString.includes(" ")) {
        let input = "";
        props.setCommandHistory([...props.commandHistory, commandString]);
        props.setInputHistory([...props.inputHistory, input]);
      }
      // setCommandString("");
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
      props.setCommandHistory([...props.commandHistory, commandString]);
      let message = "No command was given, please try again";
      props.setInputHistory([...props.inputHistory, message]);
    } else {
      props.setCommandHistory([...props.commandHistory, command]);
      props.setInputHistory([...props.inputHistory, "Command Received"]);
      setCommandString("");
      let s = 0;
      props.setModeSwitch([...props.modeSwitch, s]);
    }
    if (!commandString.includes(" ")) {
      props.setCommandHistory([...props.commandHistory, commandString]);
      props.setInputHistory([...props.inputHistory, input]);
    }
    command = "";
    input = "";
  }

  /**
   * We suggest breaking down this component into smaller components, think about the individual pieces
   * of the REPL and how they connect to each other...
   */
  const currentMode =
    props.modeSwitch.length > 0
      ? props.modeSwitch[props.modeSwitch.length - 1]
      : 0; // Default to mode 0 if array is empty

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
          // use const with a useState in order to be able to effectively
          if (commandString.toLowerCase() == "mode") {
            if (props.modeSwitch.length > 0) {
              if (props.modeSwitch[props.modeSwitch.length - 1] === 0) {
                setModeSwitch(1);
              } else {
                setModeSwitch(0);
              }
            } else {
              props.setModeSwitch([...props.modeSwitch, 0]);
              setModeSwitch(0);
            }
          } else {
            if (modeSwitch == 1) {
              handleVerboseSubmit(commandString);
            } else {
              handleBriefSubmit(commandString);
            }
          }
          setCommandString("");

          // if (
          //   commandString.toLowerCase() == "mode" &&
          //   props.modeSwitch[props.modeSwitch.length - 1] == 0
          // ) {
          //   handleVerboseSubmit(commandString);
          // } else {
          //   handleBriefSubmit(commandString);
          // }
        }}
      >
        Submit!
      </button>

      {/* <button
        onClick={() => {
          if (commandString.toLowerCase() === "mode") {
            // Toggle between modes 0 and 1 when "mode" command is entered
            const newMode = currentMode === 0 ? 1 : 0;
            props.setModeSwitch([...props.modeSwitch, newMode]);
            // Optionally call a function based on the new mode
          } else {
            // Call the appropriate function based on the current mode
            if (currentMode === 0) {
              handleBriefSubmit(commandString);
            } else if (currentMode === 1) {
              handleVerboseSubmit(commandString);
            }
          }
          setCommandString(""); // Reset command string after handling
        }}
      >
        Submit!
      </button> */}
    </div>
  );
}
