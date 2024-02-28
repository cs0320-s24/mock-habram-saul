import "../styles/main.css";

interface REPLHistoryProps {
  // TODO: Fill with some shared state tracking all the pushed commands
  commandHistory: { command: string; output: string }[];
  modeSwitch: string;
  //does not take in setHistory because ur not setting anything; you only want to display
}
// Example: Manual conversion for a simple table structure
// const convertTableStringToComponents = (tableString : string) => {
//   // Regular expressions to find table rows and cells
//   const rowRegex = /<tr>(.*?)<\/tr>/g;
//   const cellRegex = /<td>(.*?)<\/td>/g;

//   // Extracting rows from the table string
//   const rows = [...tableString.matchAll(rowRegex)].map((rowMatch) => {
//     // Extracting cells within the current row
//     const cells = [...rowMatch[1].matchAll(cellRegex)].map(
//       (cellMatch) => cellMatch[1]
//     );
//     // Creating table cells as JSX
//     const cellJsx = cells.map((cell, index) => <td key={index}>{cell}</td>);
//     return <tr key={rowMatch.index}>{cellJsx}</tr>;
//   });

//   // Returning the table as JSX
//   return <table>{rows}</table>;
// };

export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history">
      {/* This is where command history will go */}
      {/* TODO: To go through all the pushed commands... try the .map() function! */}
      {props.modeSwitch === "verbose"
        ? props.commandHistory.map((command, index) => {
            return (
              <div>
                <p>Command: {command.command}</p>
                <p>Output:</p>
                {command.output}
              </div>
            );
          })
        : props.commandHistory.map((command, index) => {
            return (
              <div>
                <p>Output:</p>
                {command.output}
              </div>
            );
          })}
    </div>
  );
}
