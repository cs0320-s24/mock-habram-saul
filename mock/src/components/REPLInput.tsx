import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";

interface REPLInputProps {
  // TODO: Fill this with desired props... Maybe something to keep track of the submitted commands
  commandHistory: string[];
  setCommandHistory: Dispatch<SetStateAction<string[]>>;

  inputHistory: string[];
  setInputHistory: Dispatch<SetStateAction<string[]>>;
  // history: string[];
  // setHistory: Dispatch<SetStateAction<string[]>>;
}
// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props: REPLInputProps) {
  // Remember: let React manage state in your webapp.
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");
  // type combinedData = [string, string];
  const [count, setCount] = useState<number>(0);
  // const [history, setHistory] = useState<combinedData>(["", ""]);
  function handleSubmit(commandString: string) {
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
    if (commandString != " ") {
      props.setCommandHistory([...props.commandHistory, command]);
    }
    setCommandString("");
    command = "";
    input = "";
  }

  function handleSubmitVerbose(commandString: string) {
    props.setCommandHistory([...props.commandHistory, commandString]);
    setCommandString("");
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
      <button onClick={() => handleSubmit(commandString)}>Submit!</button>
    </div>
  );
}
