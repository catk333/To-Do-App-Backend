const serverless = require('serverless-http');
const express = require('express');
const app = express();
app.use(express.json());

const databaseService = require('./databaseservice');




//GET- James 
app.get('/tasks', function (request, response) {

  databaseService.gettasks()
  .then(function(results){
//working ok
response.json(results);

})

.catch (function(error){
    //something went wrong when getting the task
    response.status(500); 
    response.json(error);
});
  
 })



 //DELETE-me 
app.delete('/tasks/:taskId', function (request, response){
// above is a pathway only - doesn't need to match the database column?

const deleteTaskId = request.params.TasksId;
// a params.TasksID , then this passed into the deleteTask function
databaseService.deleteTask(deleteTaskId)
// wrap in a promise
.then(function(results){

    response.json(results);
    
    })
    
    .catch(function(error){
        response.status(500);
        response. json(error);
    });

})


//POST- SAVE - James' Code
app.post('/tasks', function (request,response){

    const taskDescription =request.body.taskDescription;
// get this from the body.taskDescription then pass down to below.
    databaseService.saveTask(taskDescription).then(function(results){

        response.json(results);
    })
    
    .catch (function(error){
        response.status(500);
        response. json(error);
    });


});

//  PUT/Update- me
app.put('/tasks/:taskId', function (request, response){

    const taskToBeUpdated = request.params.TasksId;
    // params.TaskId 
    databaseService.updateTask(taskToBeUpdated).then(function(results){
      //working ok
      response.json(results);
      
      })
      
      .catch (function(error){
          //something went wrong when getting the task
          response.status(500); 
          response.json(error);
      });
        
       })


module.exports.handler = serverless(app);