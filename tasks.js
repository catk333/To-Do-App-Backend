const serverless = require('serverless-http');
const express = require('express');
const app = express();
app.use(express.json());

const databaseService = require('./databaseservice');

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

app.delete('/tasks/:taskId', function (request, response){

const deleteTaskId = request.params.TasksId;
databaseService.deleteTask(deleteTaskId).then(function(results){

    response.json(results);

})
     .catch(function(error){
        response.status(500);
        response. json(error);

    });


});


app.post('/tasks', function (request,response){

    const taskDescription =request.body.taskDescription;
    databaseService.saveTask(taskDescription).then(function(results){

        response.json(results);
    })
    
    .catch (function(error){
        response.status(500);
        response. json(error);
    });


});


app.put('/tasks/:taskId', function (request, response){

    const tasktobePut = request.params.taskId;
    
    let someResponse ={
    
        message: "You issued an update request for task ID " + tasktobePut
    };
    
    
    response.json(someResponse);

    });


module.exports.handler = serverless(app);