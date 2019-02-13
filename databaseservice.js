

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
                connection.end();
                return resolve(results);
            }
        });
    });
}
    




function saveTask(taskDescription) {
    const connection = getDatabaseConnection();
    return new Promise(function(resolve, reject) {
        
        
        const postData ={
            Description:taskDescription,
            Completed:false,
            userId:2
        };
        
        
        connection.query ("INSERT INTO Tasks SET ? ", postData, function(error,results){
           
            if (error) {
                connection.destroy();
                return reject(error);
            } 
            else {
                connection.end();
                return resolve(results);
            }
        });
    })
};


//DELETE -me 
function deleteTask(taskId) {
    const connection = getDatabaseConnection();
    return new Promise(function(resolve, reject) {
        
        const deleteId = {
            TasksId:taskId
        }
    // Does this even need to be assigned to a variable? it needs to be TasksId, 
    //as this is what it is in the table column.  

    connection.query('DELETE FROM Tasks WHERE TasksId = ?',deleteId, function(error,results){
            if (error) {
                connection.destroy();
                return reject(error);
            } 
            else {
                connection.end();
                return resolve(results);
            }
        });
    })
}



//PUT/Update- me
function updateTask(taskId) {
    const connection = getDatabaseConnection();
    return new Promise(function(resolve, reject) {
        //wrap all in a promise 
        
        const updateTaskId ={
            TasksId:taskId,
        //? does this need declaring? 
         };
    
         connection.query("UPDATE Tasks SET Completed=True WHERE TasksId= ? ",updateTaskId, function(error,results){
           // Updates to true if TasksId matches the TasksId entered. Works in MySQl. 

            if (error) {
                connection.destroy();
                return reject(error);
            } 
            else {
                connection.end();
                return resolve(results);
            }
        });
    })
}

module.exports= {
    gettasks,
    saveTask,
    deleteTask,
    updateTask
}