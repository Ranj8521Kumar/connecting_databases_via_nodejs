const {pool, connectPostgres} = require("./postgres");
const express = require('express');

const app = express();

app.use(express.json());

const port = 3000;

(async () => {
    await connectPostgres();

    app.get('/', async (req, res)=>{
        try{
            const {rows} = await pool.query('select * from users');
            res.status(200).json(rows);
        }catch(error){
            res.status(400).send({message:"users not found", error});
        }
    });

    app.post('/add-postgres', async (req, res)=>{
        try{
            const {name, age} = req.body;
            const result = await pool.query('Insert into users (name, age) values ($1, $2) returning *', [name, age]);
            res.status(201).send({message: "Data inserted in postgreSQl", result:result.rows[0]});

        }catch(error){
            res.status(500).send({message:"Error inserting data into postgreSQl", error});
        }
    });

    app.listen(port, ()=>{
        console.log(`Server listening on port ${port}`);
    });

})();