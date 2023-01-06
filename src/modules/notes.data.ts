import { MongoClient, ObjectId } from "mongodb";
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
export async function _connect() {
    try {
        await client.connect();
    }catch(error){
        console.table(error);
    }
}

//INSERT
export async function _insert(Notes: Notes) {
    try {
        const database = client.db("NotaDB");
        const table = database.collection<Notes>("notes");

        const result = await table.insertOne(Notes);

        return result;

    }catch(error){
        return error
    }

}

//UPDATE
export async function _update(_id:string, note:Notes) {
    try {
        const database = client.db("NotaDB");
        const table = database.collection<Notes>("notes");

        const result = await table.updateOne({'_id': new ObjectId((_id))}, note);

        return result;

    }catch(error){
        return error
    }

}

//DELETE
export async function _delete(_id:string) {
    try {
        const database = client.db("NotaDB");
        const table = database.collection<Notes>("notes");

        console.log(_id)

        const result = await table.deleteOne( { '_id' : new ObjectId((_id)) } );

        return result.acknowledged;

    }catch(error){
        return error
    }

}

//FIND 
export async function _find(title:string, limit:number = 10) {

    try {
        
        const database = client.db("NotaDB"); 
        const table = database.collection<Notes>("notes");

        const rExp = new RegExp(title, 'i');
        const notes = table.find({title: rExp }).limit(limit).toArray();

        return notes;

    }catch(error){
        return error;
    }

}