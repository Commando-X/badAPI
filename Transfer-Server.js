const express = require ('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

//Creds 
const users = [
    { username: 'admin', password: 'admin123'},
    { username: 'user1', password: 'password1'},
    { username: 'user2', password: 'password2'},

];

let accounts = [
    { id: 1, username: 'user1', balance:1000},
    { id: 2, username: 'user2', balance:5000},
    
];

app.use(bodyParser.json());

//User Auth
app.post('/login', (req, res) => {
    const { username, password } = 
    req.body;
    const user = users.find(user => user.username === username && user.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Invalid Credentials'});
    }
    return res.json ({ message: 'Login Successful', user});
});

//Money Transfer
app.post ( '/transfer', (req, res) => {
    const { from, to, amount } = req.body;

    //Search for accounts
    const fromAccount = accounts.find(acc => acc.username === from);
    const toAccount = accounts.find(acc => acc.username === to) ;

    if (!fromAccount || !toAccount) {
        return
    res.status(404).json({ message: 'Account not found'});
    }

    //Check Balance
    if (fromAccount.balance < amount) {
        return 
    res.status(400).json({ message: 'Insufficient Balance!' });
    }

    //Transfer Money
    fromAccount.balance -= amount;
    toAccount.balance += amount;

    return res.json({ message: 'Transfer successful'});
} );



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});