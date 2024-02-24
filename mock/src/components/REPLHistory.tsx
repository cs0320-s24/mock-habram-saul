import "../styles/main.css";

interface REPLHistoryProps {
  // TODO: Fill with some shared state tracking all the pushed commands
  commandHistory: string[];
  // inputHistory: string[];
  //does not take in setHistory because ur not setting anything; you only want to display
}
export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history">
      {/* This is where command history will go */}
      {/* TODO: To go through all the pushed commands... try the .map() function! */}
      {props.commandHistory.map((command, index) => (
        <p>Command: {command}</p>
      ))}
      {/* {props.inputHistory.map((input, index) => (
        <p>Output: {input}</p>
      ))} */}
    </div>
  );
}
