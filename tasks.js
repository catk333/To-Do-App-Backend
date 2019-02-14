
const serverless = require('serverless-http');
const express = require('express');
const app = express();
app.use(express.json());

const databaseService = require('./databaseservice');




//GET- James 
app.get('/tasks', function (request, response) {

  databaseService.gettasks()
  .then(function(results){
    response.json(results);

})

.catch (function(error){

    response.status(500); 
    response.json(error);
});
  
 })



 
//DELETE-me 

app.delete('/tasks/:taskId', function (request, response){

const taskIdToBeDeleted = request.param.taskId;

 databaseService.deleteTask(taskIdToBeDeleted).then(function(results){

        response.json(results);
    })
    
    .catch (function(error){
        response.status(500);
        response. json(error);
    });



});


//POST- SAVE - James' Code
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

//  PUT/Update- me
app.put('/tasks/:taskId', function (request, response){

    const taskIdToBeUpdated = request.param.taskId;
    // params.taskId 
    databaseService.updateTask(taskIdToBeUpdated).then(function(results){

        response.json(results);
    })
    
    .catch (function(error){
        response.status(500);
        response. json(error);
    });



module.exports.handler = serverless(app);