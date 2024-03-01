import "../styles/main.css";
/**Interface responsible for holding the state, which is used to display the appropriate behavior on the REPL history display
 * @interface REPLHistoryProps
 * @property {Array<{command: string; output: string}>} commandHistory-An array of commands and their corresponding output that represent the command history
 * @property {string} modeSwitch - A string to determine the mode of the history display. If set to "verbose", both command and output are displayed. Else, only the outputs are shown
 */
interface REPLHistoryProps {
  //shared state that tracks all of the pushed commands and their outputs
  commandHistory: { command: string; output: string }[];
  modeSwitch: string;
}
/**
 * Function responsible for displaying the list/history of commands and their outputs in the REPL interface. Depending on modeSwitch,
 * it will either display both commands and outputs or just ouputs. The implementation below uses 'dangerouslySetInnnerHTML' to properly recognize
 * Javascript syntax from an output string. It is only used if the output string itself starts with "<center", because if it does not, it
 * means it is just a regular output string and does not contain any HTML syntax.
 * @function REPLHistory
 * @param {REPLHistoryProps} props - The attributes provided to the REPL history component
 * @returns {JSX.Element} A JSX.Element that displays the history of executed commands and their results
 */
export function REPLHistory(props: REPLHistoryProps) {
  const createMarkup = (htmlString: string) => {
    return { __html: htmlString };
  };

  return (
    <div className="repl-history">
      {props.modeSwitch === "verbose"
        ? props.commandHistory.map((command, index) => (
            <div key={index}>
              <p>Command: {command.command}</p>
              <p>Output:</p>
              {command.output.startsWith("<center") ? (
                <div
                  className="repl-history-output"
                  dangerouslySetInnerHTML={createMarkup(command.output)}
                />
              ) : (
                command.output
              )}
            </div>
          ))
        : props.commandHistory.map((command, index) => (
            <div key={index}>
              <p>Output:</p>
              {command.output.startsWith("<center") ? (
                <div
                  className="repl-history-output"
                  dangerouslySetInnerHTML={createMarkup(command.output)}
                />
              ) : (
                command.output
              )}
            </div>
          ))}
    </div>
  );
}
