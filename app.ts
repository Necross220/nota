import * as db from './src/modules/notes.data';

import express, {Request, Response} from 'express';

const app = express()
const port = 3001

type Notes = {
    title: string;
    content: string;
    updateAt: Date;
    modifiedAt: Date;
    status: boolean
}

app.use(express.json());

app.get('/notes', async (req: Request, res: Response) => {
    
    try{
        let title:string = req.query.title as string;
        let limit:number = typeof req.query.limit === 'string' ?  parseInt(req.query.limit) : 20;
        
        const result  = await db._find(title, limit);
        res.status(200).send(result);
    }catch(error){
        return error;
    }
});

app.post('/notes', (req: Request, res: Response) => {
    
    let note:Notes = req.body;
    let result = db._insert(note);
    
    res.status(200).send(result);
});

app.delete('/notes', (req: Request, res: Response) => {
    let result = db._delete(req.body);
    
    res.status(200).send(result);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});

db._connect();
