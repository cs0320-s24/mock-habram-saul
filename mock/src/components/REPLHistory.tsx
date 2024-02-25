import "../styles/main.css";

interface REPLHistoryProps {
  // TODO: Fill with some shared state tracking all the pushed commands
  commandHistory: string[];
  inputHistory: string[];
  modeSwitch: number[];
  //does not take in setHistory because ur not setting anything; you only want to display
}
export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history">
      {/* This is where command history will go */}
      {/* TODO: To go through all the pushed commands... try the .map() function! */}
      {props.modeSwitch[props.modeSwitch.length - 1] == 1
        ? props.commandHistory.map((command, index) => {
            const input = props.inputHistory[index];
            return (
              <div>
                <p>Command: {command}</p>
                <p>Output: {input}</p>
              </div>
            );
          })
        : props.commandHistory.map((command, index) => {
            const input = props.inputHistory[index];
            return (
              <div>
                <p>Output: {input}</p>
              </div>
            );
          })}
    </div>
  );
}
