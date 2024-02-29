import "../styles/main.css";

interface REPLHistoryProps {
  // TODO: Fill with some shared state tracking all the pushed commands
  commandHistory: { command: string; output: string }[];
  modeSwitch: string;

  //does not take in setHistory because ur not setting anything; you only want to display
}
export function REPLHistory(props: REPLHistoryProps) {
  // Function to safely set HTML content
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
