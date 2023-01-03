import { MongoClient } from "mongodb";
import { isNotEmittedStatement } from "typescript";

const uri = "mongodb://root:example@localhost:27017/?authMechanism=DEFAULT";
const client = new MongoClient(uri);

type Notes = {
    title: string;
    content: string;
    updateAt: Date;
    modifiedAt: Date;
    status: boolean
}

//CONNECT TO THE DATABASE
export async function connect() {
    try {
        await client.connect();
    }catch(error){
        console.table(error);
    }
}

//INSERT
export async function insert(Notes: Notes) {
    try {
        const database = client.db("NotaDB");
        const table = database.collection<Notes>("notes");

        const result = await table.insertOne(Notes);

    }catch(error){
        return error
    }

    return true;
}

//FIND 
export async function find(title:string, limit:number = 10) {
    
    try {
        
        const database = client.db("NotaDB"); 
        const table = database.collection<Notes>("notes");
        const notes = table.find({ title: title }).limit(limit).toArray()

        return notes;

    }catch(error){
        return error;
    }

}

//UPDATE
export async function updateOne(params: Notes) {
    try {
        const database = client.db("NotaDB");
        const table = database.collection<Notes>("notes");
        
        if(1){
            //UPDATE MANY
            // const result = await table.updateMany(params);
            
        }else{
            //UPDATE ONE
            // const result = await table.updateOne(params);
        }
        
    }catch(error){
        console.log(error);
    }
}

//DELETE
export async function remove(params: Notes) {
    try {
        const database = client.db("NotaDB");
        const table = database.collection<Notes>("notes");
        
        if(1){
            //DELETE ONE
            const result = await table.deleteMany(params);
        }else{
            //DELETE MANY
            const result = await table.deleteOne(params);
        }
        
    }catch(error){
        console.log(error);
    }
}

