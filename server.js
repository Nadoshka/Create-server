const express = require ('express');
const fs = require ('fs');
const bodyParser = require ('body-parser');
const cors = require ('cors');
const path = require ('path');

const PORT = 5000;
const app = express();

app.use(cors())
app.use(bodyParser.json())
/**
 * app
 * ||
 * / fn(req, res)
 */
app.get('/user', (req, res) => {
    const {userId} = req.body;
    if(!userId || typeof userId !== 'string' || userId.length < 1 ) {
        res.status(400).json('invalid userId');
    }

    fs.readFile(path.join(process.cwd(), 'users.json'), (err, data) => {
        if (err) {
            res.status(500).text('Could not read database') 
        };
        const {users} = JSON.parse(data);
       const user = users.find(user => user.id === userId);
       if(user) {
           res.status(200).json(user);
       } else {
           res.status(404).json('user not found');
       }
    })
});

app.post('/user/create', (req, res) => {
    const {user} = req.body;
    if(!user.name || user.age ) {
        res.status(400).json('missing data');
    }
    if(typeof user.name !== string || typeof user.age !== number) {
        res.status(400).json('Invalid type');
    }
    
    fs.readFile(path.join(process.cwd(), 'users.json'), (err, data) => {
    if (err) {
        res.status(500).text('Could not read database') 
    };

    data.push(user);

    //look at the syntax what should the first argument be?
    fs.writeFile('users.json', data, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    })
    const {users} = JSON.parse(data);
})
})



app.listen(PORT, () => {
    console.log('Server is running at:', PORT )
});

