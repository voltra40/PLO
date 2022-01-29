const express = require('express');

const { google } = require('googleapis');

const habitRouter = express();

const months = {
  January: 0,
  Febuary: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
}

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

// allows automated google sheet selection based on month, assumes sheet has been created for specific month
const today = new Date();
const currentMonth = getKeyByValue(months, today.getMonth());

class Habit {
  constructor(habit) {
    this.habit = habit;
  }
};

// get data
habitRouter.get('/', async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: './credentials/credentials.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
  });

  // create client instance for authentication
  const client = await auth.getClient();

  // new instance of google sheets api
  const googleSheets = google.sheets({ version: 'v4', auth: client });

  try {
    const getTable = await googleSheets.spreadsheets.values.get({
      spreadsheetId: '1ssle0g9ewqyDrR53MR1X9dP6Q2_n__XtEHgctLcCZFc',
      range: currentMonth,
    });
    res.status(200).json(getTable.data);
  } catch (error) {
    res.status(500).json({ message: currentMonth });
  }
});

// add new habit to the table
habitRouter.post('/', async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: './credentials/credentials.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
  });
  const client = await auth.getClient();
  const googleSheets = google.sheets({ version: 'v4', auth: client });

  const habit = new Habit(req.body.habit);

  try {
    if (!habit) throw new Error('No habit identified');
    googleSheets.spreadsheets.values.append({
      spreadsheetId: '1ssle0g9ewqyDrR53MR1X9dP6Q2_n__XtEHgctLcCZFc',
      range: currentMonth + '!A:A',
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [[habit.habit, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
      },
    });
    res.status(200).json(habit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// update habit's completion (yes or no in sheets, 1 or 0 respectively)
habitRouter.put('/:id', async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: './credentials/credentials.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
  });
  const client = await auth.getClient();
  const googleSheets = google.sheets({ version: 'v4', auth: client });

  const { id } = req.params;
  const value = req.body;

  try {
    if (!id) throw new Error('No cell identified');
    if (!value) throw new ErrorEvent('no value detected');
    const response = googleSheets.spreadsheets.values.update({
      spreadsheetId: '1ssle0g9ewqyDrR53MR1X9dP6Q2_n__XtEHgctLcCZFc',
      range: currentMonth + '!' + id,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [[value.value]],
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = habitRouter;
