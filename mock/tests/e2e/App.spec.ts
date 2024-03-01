import { expect, test } from "@playwright/test";

/**
  The general shapes of tests in Playwright Test are:
    1. Navigate to a URL
    2. Interact with the page
    3. Assert something about the page against your expectations
  Look for this pattern in the tests below!
 */

// If you needed to do something before every test case...
test.beforeEach(() => {
  // ... you'd put it here.
  // TODO: Is there something we need to do before every test case to avoid repeating code?
});

/**
 * Don't worry about the "async" yet. We'll cover it in more detail
 * for the next sprint. For now, just think about "await" as something
 * you put before parts of your test that might take time to run,
 * like any interaction with the page.
 */
test("on page load, i see a login button", async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  await expect(page.getByLabel("Login")).toBeVisible();
});

test("on page load, i dont see the input box until login", async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  await expect(page.getByLabel("Sign Out")).not.toBeVisible();
  await expect(page.getByLabel("Command input")).not.toBeVisible();

  // click the login button
  await page.getByLabel("Login").click();
  await expect(page.getByLabel("Sign Out")).toBeVisible();
  await expect(page.getByLabel("Command input")).toBeVisible();
});

test("after I type into the input box, its text changes", async ({ page }) => {
  // Step 1: Navigate to a URL
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();

  // Step 2: Interact with the page
  // Locate the element you are looking for
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("Awesome command");

  // Step 3: Assert something about the page
  // Assertions are done by using the expect() function
  const mock_input = `Awesome command`;
  await expect(page.getByLabel("Command input")).toHaveValue(mock_input);
});

//test that the output of view is the correct output (the contents of the HTML table is correct)
test("when I run load_file and then view, the correct html is displayed", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file data/songs/exampleCSV1");
  await page.getByLabel("Submit!").click();

  const firstHistory = await page.evaluate(() => {
    const currCHistory = document.querySelector(".repl-history");
    return currCHistory?.children[0].textContent;
  });

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByLabel("Submit!").click();

  const secondHistory = await page.evaluate(() => {
    const currCHistory = document.querySelector(".repl-history");
    return currCHistory?.children[1].textContent;
  });

  expect(firstHistory).toEqual("Output:File successfully loaded");
  expect(secondHistory).toEqual("Output:12345Thesongremainsthesame.");
});

//test that view produces the correct response when load_file has not been performed
test("when i run view before i load a file, the appropriate output is given", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByLabel("Submit!").click();
  const output = await page.evaluate(() => {
    const currCHistory = document.querySelector(".repl-history");
    return currCHistory?.children[0].textContent;
  });
  expect(output).toEqual(
    "Output:A file first needs to be loaded before performing view"
  );
});
//test that search produces the correct respond when load_file has not been performed
test("when i run search before i load a file, the appropropriate output is given", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 5 Tacos");
  await page.getByLabel("Submit!").click();
  const output = await page.evaluate(() => {
    const currCHistory = document.querySelector(".repl-history");
    return currCHistory?.children[0].textContent;
  });
  expect(output).toEqual(
    "Output:No file has been loaded. Please load a file before running search"
  );
});
//test that changing from brief to verbose produces the correct output
test("when i run mode to go from brief to verbose, the appropriate output is given", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByLabel("Submit!").click();
  const output = await page.evaluate(() => {
    const currCHistory = document.querySelector(".repl-history");
    return currCHistory?.children[0].textContent;
  });
  expect(output).toEqual(
    "Command: modeOutput:Mode successfully changed to: verbose"
  );
});
//test that changing from verbose to brief produces the correct output
test("when i run mode to go from verbose to brief, the appropriate output is given", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByLabel("Submit!").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByLabel("Submit!").click();
  const output = await page.evaluate(() => {
    const currCHistory = document.querySelector(".repl-history");
    return currCHistory?.children[1].textContent;
  });
  expect(output).toEqual("Output:Mode successfully changed to: brief");
});
//test what happens if no command is given but button is pressed
test("when no command is given and Submit button is clicked, the appropriate output is given", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("");
  await page.getByLabel("Submit!").click();
  const output = await page.evaluate(() => {
    const currCHistory = document.querySelector(".repl-history");
    return currCHistory?.children[0].textContent;
  });
  expect(output).toEqual("Output:No command was given, please try again");
});
//test if a command is not found
test("when I run a command that does not exist, the correct response is given", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("destroy my enemies");
  await page.getByLabel("Submit!").click();
  const output = await page.evaluate(() => {
    const currCHistory = document.querySelector(".repl-history");
    return currCHistory?.children[0].textContent;
  });

  expect(output).toEqual("Output:Command not found");
});
//test that if we're in brief only outputs are printed (not commands)
test("test that if we're in brief, only the outputs are printed and no commands are printed", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file data/songs/exampleCSV1");
  await page.getByLabel("Submit!").click();
  const output = await page.evaluate(() => {
    const currCHistory = document.querySelector(".repl-history");
    return currCHistory?.children[0].textContent;
  });

  expect(output).toEqual("Output:File successfully loaded");
});
//test that file not found is given when given invalid file path
test("when I run load_file on a file that does not exist, we should recieve an appropraite response", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file /data/koolbandz/deftones.csv");
  await page.getByLabel("Submit!").click();

  const output = await page.evaluate(() => {
    const currCHistory = document.querySelector(".repl-history");
    return currCHistory?.children[0].textContent;
  });

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByLabel("Submit!").click();

  const output2 = await page.evaluate(() => {
    const currCHistory = document.querySelector(".repl-history");
    return currCHistory?.children[1].textContent;
  });

  expect(output).toEqual("Output:Invalid filepath; please try again");
  expect(output2).toEqual(
    "Command: modeOutput:Mode successfully changed to: verbose"
  );
});
//test that the terminal clears after button is pressed
test("test that the terminal clears after button is pressed", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file data/songs/exampleCSV1");
  await page.getByLabel("Submit!").click();
  const mock_input = "";
  await expect(page.getByLabel("Command input")).toHaveValue(mock_input);
});
//test that if you log in, run a command, and log out, and then log back in, the list should be cleared
test("when I run a command, and log out, the output terminal is clear", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file /data/koolbandz/deftones.csv");
  await page.getByLabel("Submit!").click();

  const output = await page.evaluate(() => {
    const currCHistory = document.querySelector(".repl-history");
    return currCHistory?.children[0].textContent;
  });

  await page.getByLabel("Sign out").click();
  await expect(page.getByLabel("Login")).toBeVisible();
  await page.getByLabel("Login").click();

  expect(output).toEqual("Output:Invalid filepath; please try again");
});
// test that even if we run mode, ouput for a single command remains the same
test("when we run a command and then switch mode, the command output remains the same and does not get corrupted", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file data/songs/exampleCSV1");
  await page.getByLabel("Submit!").click();
  const output1 = await page.evaluate(() => {
    const currCHistory = document.querySelector(".repl-history");
    return currCHistory?.children[0].textContent;
  });
  expect(output1).toEqual("Output:File successfully loaded");
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByLabel("Submit!").click();
  const output2 = await page.evaluate(() => {
    const currCHistory = document.querySelector(".repl-history");
    return currCHistory?.children[1].textContent;
  });
  expect(output2).toEqual(
    "Command: modeOutput:Mode successfully changed to: verbose"
  );
});
