const express = require("express");
const path = require("path");

const app = express();

// lmdb: https://www.npmjs.com/package/lmdb
const lmdb = require('lmdb');
const { get } = require("http");
let myDB = lmdb.open({
	path: '___my-db/post',
	// any options go here, we can turn on compression like this:
	compression: true,
});
function getData(key) {
    return myDB.get(key);
}
//*  test DB -----------------------------------------------------------------------------
async function testDB() {
    await myDB.put('LMDB_TEST_KEY_2', { content: 'some test content in LMDB_TEST_KEY_2' });
    const text = myDB.get('LMDB_TEST_KEY_2').content; // 'Hello, World!'
    console.log(`myDB.get('LMDB_TEST_KEY_2' =`, text);
}
testDB();
// test db ends ------------------------------------------------------------------ -----
//*/

app.get('/post-keys', function (req, res) {
    res.send(myDB.getKeys().asArray);
});

app.get('/posts', function (req, res) {
    let postKeys = myDB.getKeys().asArray;
    let posts = [];
    postKeys.forEach(key => {
        const returnData = getData(key);
        if (returnData) {
            posts.push(returnData);
        }
    });
    res.send(posts);
});

app.get('/post', function (req, res) {
    let jsonObject;
    if (req.query.key){
        if (req.query.key === '') {
            res.send({status:0, info:'key cannot be empty!'});
        } else {
            jsonObject = myDB.get(req.query.key);
            if(!jsonObject) {
                res.send({status:0, info:'key not found!'});
            } else {
                res.send({status:1, info:'found key '+ req.query.key, data: jsonObject});
            }
            
        }
    } else {
        res.send({status:0, info:'key cannot be undefined!'});
    }
});

app.post('/post', function (req, res) {
    if (req.query.key && req.query.key !== ''){
        const key = req.query.key;
        myDB.put(key, req.body).then((accept)=>{
            console.log('/atom POST accept = ', accept, ' ', req.body);
            res.send({status: 1, info: "Save successfuly."});
        }, reject =>{
            console.log('/atom POST reject = ', reject);
            res.send({status: 0, info: "Save Failed."});
        });
    }
});

app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")));

// app.get("/*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
// });
app.use(express.static('frontend'));

const port = process.env.PORT || 5555;
app.listen(port, () => console.log("Server running on port ", port , "..."));

