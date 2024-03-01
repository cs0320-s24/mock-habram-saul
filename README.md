# Mock README

# Project Details

Project Name: Mock
Team Members: Saul Lopez (slopezlu) and Habram Alcantar (halcanta)
Estimated Project Time Completion: 28 hours
Link: https://github.com/cs0320-s24/mock-habram-saul

# Design Choices

The classes that were used to achieve the required user story functionalities included REPL, REPLHistory, and REPLInput. REPLInput defined what should happen when the Submit button is pressed. It runs a function called handleSubmit that parses the commmand that was passed in by the user into the command and the parameters. It then uses this to check if that command exists within a map called CommandMap, which was implemented to achieve user story #6 functionality. We decided to use a map to satisfy user story #6 because it appeared easier and logical to use, as we understand the behavior of a map and can perform many operations with it. Inside of the handleSubmit function, we then call that function, which is implemented in the REPLInput class. All of the functions for the registered commands were created in this class. Once a function is called and the command history state, cHistory, is updated with the appropriate command and output, we then share this state with the REPLHistory class. This class is responsible for displaying our desired ouputs. We modified the code provided to us from the Gearup Session to accomodate for the switching of modes. In our REPLInput class, we implement the functionality for proper switching. In our REPLHistory, we just rewrite the code to properly display what we want: if in brief, we only want to display the output. If in verbose, we want to display both the command AND the output. Lastly, the REPL class reads the props of the REPLHistory and REPLInputclasses and creates our web application.

# Errors

There were no errors that we found when manually testing the web application and creating and running tests in App.spec. Therefore, the core functionality of our program works. However, whenever we ran tests, we noticed that tests labeled as "firefox" on the Playwright Test Report would never pass. We only focused our attention on fixing and passing tests labeled "chromium". We weren't sure if we also had to find a way to make the "firefox" tests pass too.

# Tests (habram)

In order to test our implementation, we created our test suite within the App.spec.ts file in the tests folder. In order to run these tests, you must initiate the server while in the mock folder (cd into mock and then run npm start). From there, you can run the test suite by running the terminal command npm run test. 

In order to determine that our implementation was fully functional, we created a number of tests. For instance, we emphasized testing on a chain of commands (i.e. how did output change when we ran load_file, view, and the loaded a new file, just to view it again) and also on changing modes (i.e. brief to verbose). Furthermore, we also wanted to test that our implementation of html tables was also correct, and could be viewed effectively. As such, we did have to rely on information that can be found on the internet, particularly Doğacan Bilgili's [article] (https://blog.logrocket.com/using-dangerouslysetinnerhtml-react-application/) titled *Using dangerouslySetInnerHTML in a React application*. This article was incredibly useful when it came to formatting our table, and thus lead to the success of our implementation. 

# Demo Commands
## When Wanting to Load A File
load_file data/CSVToBeLoaded

## When Wanting to View A File
load_file data/CSVToBeLoaded
view

load_file data/CSVWithOneColumn
view

## When Wanting to Search A File
load_file data/CSVToBeLoaded
search Race White

