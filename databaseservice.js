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
            Completed:"false",
            userId:"2"
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



function deleteTask(TasksId) {
    const connection = getDatabaseConnection();
    return new Promise(function(resolve, reject) {
        

    connection.query("DELETE FROM Tasks WHERE TasksId === TasksId"),TasksId, function(error,results){
            if (error) {
                connection.destroy();
                return reject(error);
            } 
            else {
                connection.end();
                return resolve(results);
            }
        };
    })
}





module.exports= {
    gettasks,
    saveTask,
    deleteTask
}
