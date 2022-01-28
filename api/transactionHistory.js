const express = require("express");

const { google } = require("googleapis");

const transactionRouter = express();

transactionRouter.get("/", async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "./credentials/credentials2.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // create client instance for authentication
  const client = await auth.getClient();

  // new instance of google sheets api
  const googleSheets = google.sheets({ version: "v4", auth: client });

  try {
    const getTable = await googleSheets.spreadsheets.values.get({
      spreadsheetId: "12vu7FyszT8bcVCUsJ5sm-czVS9yasItkr_XoLkV5NF0",
      range: "BTC Buy Audit File",
    });
    res.status(200).json(getTable.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = transactionRouter;