const serverless = require('serverless-http');
const express = require('express');
const app = express();

app.get('/tasks', function (request, response) {

  const username = request.query.username;

  const ListOfTasks= [ 
      {
          id:1,
          description:"Feed the Cat",
          completed:false
      
      },

      {
          id:2,
          description:"Buy Milk",
          completed:false    
      },
      {
          id:3,
          description:"Pay Window Cleaner",
          completed:false
      },
      {
          id:4,
          description:"Book Tickets",
          completed:false
      },
      {
          id:5,
          description: "Learn JS",
          completed: false
      }
  
    ];

  response.json(ListOfTasks);
})
app.delete('/tasks/:taskId', function (request, response){

const taskIdToBeDeleted = request.params.taskId;

let someResponse ={

    message: "You issued a delete request for ID : " + taskIdToBeDeleted
};
if(taskIdToBeDeleted > 5) {
  response.status(404);
  someResponse= {
    message :"The task ID " + taskIdToBeDeleted + " does not exist"
};

}

response.json(someResponse);
});


app.post('/tasks', function (request, response){

    const taskToBePosted = request.params.tasks;
    
    let someResponse ={
    
        message: "You issued a post request "
    
}

response.json(someResponse);

});


app.put('/tasks/:taskId', function (request, response){

    const tasktobePut = request.params.taskId;
    
    let someResponse ={
    
        message: "You issued an update request for task ID " + tasktobePut
    };
    
    
    response.json(someResponse);

    });


module.exports.handler = serverless(app);