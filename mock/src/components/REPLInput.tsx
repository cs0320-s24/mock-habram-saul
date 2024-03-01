import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";

/**
 * Interface responsible for holding the state that will be used to achieve the required functionalities
 * @interface REPLInputProps
 * @property {Array<{command: string; output: string}>} cHistory-An array for keeping track of commands and their corresponding outputs
 *@property {Array<{command: string; output: string}>} setCHistory-Used to update the command history state
 *@property {string} cMode-A string used to keep track of the mode
 *@property {string} setCMode-Used to update the cMode state
 *@property {Map<string, function>} commandMap-A map whose values are the command strings and its keys the functions
 @property {Map<string, function>} setCommandMap-Used to update the commandMap state
 */

interface REPLInputProps {
  cHistory: { command: string; output: string }[];
  setCHistory: Dispatch<SetStateAction<{ command: string; output: string }[]>>;
  cMode: string;
  setCMode: Dispatch<SetStateAction<string>>;
  commandMap: Map<string, Function>;
  setCommandMap: Dispatch<SetStateAction<Map<string, Function>>>;
}

/**
 * This function is responsible for managing and updated props
 * @param REPLInputProps: a shared state of props that allows REPLHistory and REPL to access the most
 * up-to-date information
 */

export function REPLInput(props: REPLInputProps) {
  const [cString, setCString] = useState<string>("");
  const [prevFile, setPrevFile] = useState<string>("");
  const [hasFileBeenLoaded, setHasFileBeenLoaded] = useState<number>(0);
  props.commandMap.set("load_file", load_file);
  props.commandMap.set("view", view_file);
  props.commandMap.set("search", search);
  props.commandMap.set("mode", modeCall);
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
  const exampleCSV4 = [
    [1, 2, 3, 4, 5],
    ["Japan", "is", "pretty", "hard", "."],
    ["Learn", "german", "instead", "you"],
    ["was", "bedeutet", "dieser", "satz"],
    ["du", "weibt", "nicht", "hundin"],
  ];
  dataMap.set("data/songs/exampleCSV1", exampleCSV1);
  dataMap.set("data/songs/exampleCSV2", exampleCSV2);
  dataMap.set("data/foods/exampleCSV3", exampleCSV3);
  dataMap.set("data/language/exampleCSV4", exampleCSV4);

  /**
   * This function is responsible for converting the contents of a "CSV" into an html table so that it can be
   * properly displayed within REPLHistory.
   * @param {Array<string>[][]} myArray: this parameter represents the contents of a parsed CSV,
   * which for our implementation will be a two dimensional array
   */

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

  /**
   * This function is responsible for updating the shared state prop cMode in order to reflect the desires of the
   * end user. This funciton will be called whenever the command string is equal to "mode." Takes in no params
   */

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

  /**
   * This function is responsible for displaying the contents of the loaded CSV file to the user. It gives an appropriate message if a file
   * has not been loaded in yet. It takes no params
   */

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

  /**
   * This function is responsible for updated the const hasFileBeenLoaded. This constant is used to facilitate
   * the calling of "loaded" CSV files and makes running the "view" command possible
   * @param   */

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
  /**This function is responsible for reading from the command terminal by parsing the string passed in by the user and breaking it up
   * into the command itself and its respective arguments. It then checks if the commandMap contains that particular command, and calls the
   * function, passing in the appropriate parameters if the function being called needs it. Otherwise, it will print the appropriate message
   * if the command is not found
   * @param {string} input: this represents the input to the command terminal within the Mock website. Within this function
   * it is parsed in order to seperate the command from any of its arguments, which are later passed ont
   * * */
  function handleSubmit(input: string) {
    let c = "";
    let v = [];
    let parts = input.split(/\s+/);
    c = parts[0];
    v = parts.slice(1);

    if (input === "" || input === " ") {
      let o = "No command was given, please try again";
      props.setCHistory([...props.cHistory, { command: "", output: o }]);
    } else if (props.commandMap.has(c)) {
      const func = props.commandMap.get(c)!;
      func(...v);
    } else {
      let o = "Command not found";
      props.setCHistory([...props.cHistory, { command: c, output: o }]);
    }
  }
  /**This function is responsible showing the row that matches the user's search request. It represents the output in the format of an HTML table
   * for ease of readeability. IIf no file has been loaded in first,  it will give the appropriate output.
   *  * @param {string} columnIdentifier: this represents the first parameter of the search command. It is the column identifier
   * * @param {string} value: this represents the second parameter of the search command. It is the value we would like to search for*/
  function search(columnIdentifier: string, value: string) {
    let s = "search ";
    if (prevFile != "") {
      let o = makeTableHTML(dataMap.get(prevFile));
      props.setCHistory([
        ...props.cHistory,
        { command: s + columnIdentifier + value, output: o },
      ]);
    } else {
      let o =
        "No file has been loaded. Please load a file before running search";
      props.setCHistory([
        ...props.cHistory,
        { command: s + columnIdentifier + value, output: o },
      ]);
    }
  }

  return (
    <div className="repl-input">
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={cString}
          setValue={setCString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      <button
        aria-label="Submit!"
        onClick={() => {
          handleSubmit(cString);
          setCString("");
        }}
      >
        Submit!
      </button>
    </div>
  );
}
