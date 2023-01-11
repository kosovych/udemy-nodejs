const express = require('express');

const app = express();

app.use('/users', (req, res, next) => {
  console.log(2);
  res.send('<img src="https://media.gettyimages.com/id/1239366739/photo/israel-ukraine-russia-conflict.jpg?s=1024x1024&w=gi&k=20&c=QVk-5UQyE4o5xsRN2EJ_VoV218zXKEju0Q3WiRU4low=" alt="">');
});

app.use('/', (req, res, next) => {
  console.log(1);
  res.send('<img src="https://media.gettyimages.com/id/1239550517/photo/solidarity-with-ukraine-protest-in-poland.jpg?s=612x612&w=gi&k=20&c=gCJubEA83q2bSZ4ucf-7s7rdDM_ZUMsHjfJag6NEtso=" alt="">');
});

app.listen(3000);
