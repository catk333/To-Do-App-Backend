const serverless = require('serverless-http');
const express = require('express');
const app = express();

app.get('/tasks', function (request, response) {

  const username = request.query.username;

  const ListOfTasks= [ 
      {
      taskDescription: "Feed the Cat"
      },
      {
      taskDescription: "Buy Milk"    
      },
      {
      taskDescription: "Pay Window Cleaner"
      },
      {
      taskDescription: "Book Tickets"
      },
      {
      taskDescription: "Learn JS"
      }
  
    ];

  response.json(ListOfTasks);
})

module.exports.handler = serverless(app);