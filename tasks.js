
const serverless = require('serverless-http');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());
const databaseService = require('./databaseservice');




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

    const taskIdToBeUpdated = request.param.taskId;
    // params.taskId 
    databaseService.updateTask(taskIdToBeUpdated).then(function(results){

        response.json(results);
    })
    
    .catch (function(error){
        response.status(500);
        response. json(error);
    });
});


module.exports.handler = serverless(app);