import mysql from 'mysql';

const DBConnection = new Promise<mysql.Connection>((resolve,reject)=>{
    const connection = mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"1234",
        database:"uiComponent"
    })

    connection.connect((err) =>{
        if(err){
            console.log("Unable to connect to db error: ",err);
            reject(err);
            return
        }
        console.log("DB connected");
        resolve(connection)
    })
    
})

const Query =  async({db,query}:{db:mysql.Connection,query:string}) =>{
   return new Promise((resolve, reject) =>{
        db.query(query, (error, result) =>{
            if(error){
                reject(error)
                return
            }
            resolve(result)
        })
    })

}

export {DBConnection,Query}
