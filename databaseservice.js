
const mysql =require ("mysql");

function getDatabaseConnection() {
    return mysql.createConnection({
        host: process.env.RDS_HOST,
        user: process.env.RDS_USER,
        password: process.env.RDS_PASSWORD,
        database: process.env.RDS_DATABASE
    });
}

function gettasks() {
    const connection = getDatabaseConnection();
    return new Promise(function(resolve, reject) {
        connection.query("SELECT * FROM Tasks", function(error, results, fields) {
            if (error) {
                connection.destroy();
                return reject(error);
            } 
            else {
                connection.end(function() { 
                return resolve(results);
       
                });
            }
        });ß
    });
}
    


function saveTask(taskDescription)  {
    const connection = getDatabaseConnection();
    
    return new Promise(function(resolve, reject) {
        
        
        const postData = {
            taskDescription:taskDescription,
            Completed: false,
            userId: 1
        };
        
        
        connection.query ("INSERT INTO Tasks SET ? ", postData, function(error,results){
           
            if (error) {
                connection.destroy();
                return reject(error);
            } 
            else {
                connection.end(function(){
                return resolve(results);
                });
            }
        });
    })
}


function deleteTask(taskId) {
    const connection = getDatabaseConnection();
    return new Promise(function(resolve, reject) {
        
    connection.query('DELETE FROM Tasks WHERE TasksId = ?',[taskId], function(error,results){
            if (error) {
                connection.destroy();
                return reject(error);
            } 
            else {
                connection.end(function() {
                return resolve(results);
                 });
            }
        });
    });
}


function updateTask(taskId) {
    const connection = getDatabaseConnection();
    return new Promise(function(resolve, reject) {
        //wrap all in a promise 
        
         connection.query("UPDATE Tasks SET Completed=True WHERE TasksId= ? ",[taskId], function(error,results){
           // Updates to true if TasksId matches the TasksId entered. Works in MySQl. 

            if (error) {
                connection.destroy();
                return reject(error);
            } 
            else {
                connection.end( function(){
                return resolve(results);
                });
            }
    
        });
    });
}

module.exports= {
    gettasks,
    saveTask,
    deleteTask,
    updateTask
}