const express = require("express");

const { google } = require("googleapis");

const habitRouter = express();

habitRouter.get("/", async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "../credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // create client instance for authentication
  const client = await auth.getClient();

  // new instance of google sheets api
  const googleSheets = google.sheets({ version: "v4", auth: client });

  try {
    const getTable = await googleSheets.spreadsheets.values.get({
      spreadsheetId: "1ssle0g9ewqyDrR53MR1X9dP6Q2_n__XtEHgctLcCZFc",
      range: "Sheet1",
    });
    res.status(200).json(getTable.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = habitRouter;
