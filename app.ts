import * as db from './src/modules/databaseFunction';

import express, {Request, Response} from 'express';

const app = express()
const port = 3000

app.use(express.json());

app.get('/notes', async (req: Request, res: Response) => {

    let title:string = req.query.title as string;
    let limit:number = typeof req.query.limit === 'string' ?  parseInt(req.query.limit) : 20;

    const daddy  = await db.find(title, limit);
    
    res.status(200).send(daddy);
})

app.post('/notes', (req: Request, res: Response) => {
    db.insert(req.body);
    res.status(200).send('Success');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});

db.connect();
