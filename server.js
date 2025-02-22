const express = require("express");
const path = require("path");
const timeUtil = require("./backend/time.util");

const app = express();
app.use(express.json());

// lmdb Docs: https://www.npmjs.com/package/lmdb
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
//*  insert few test data to DB -----------------------------------------------------------------------------
async function testDB(key) {
    await myDB.put(key, { 
        title:'title '+key, 
        content: 'some test content in '+key,
        modifiedDateTime: timeUtil.getCurrentISODateTime(),
        modifiedDateTimeEpoch: timeUtil.getCurrentEpochTime()
    });
    const text = myDB.get(key).content;
    console.log(`add test data: '${key}' =`, text);
}
myDB.remove(''); // remove item with ''(empty string) key
testDB('__POST__TEST_DB_KEY_p1');
testDB('__POST__TEST_DB_KEY_p2');
testDB('__POST__TEST_DB_KEY_p3');
testDB('__POST__TEST_DB_KEY_p4');
testDB('__POST__TEST_DB_KEY_p5');
testDB('__POST__TEST_DB_KEY_p6');
testDB('__POST__TEST_DB_KEY_p7');
testDB('__POST__TEST_DB_KEY_p8');
testDB('__POST__TEST_DB_KEY_p9');

// test db ends ------------------------------------------------------------------ -----
//*/

app.get('/post-keys', function (req, res) {
    res.send(myDB.getKeys().asArray);
});

app.get('/posts', function (req, res) {
    let postKeys = myDB.getKeys().asArray;
    let posts = [];
    if (req.query && req.query.prefix) {
        postKeys = postKeys.filter(str => str.startsWith(req.query.prefix));
    }
    postKeys.forEach(key => {
        const data = getData(key);
        if (data) {
            posts.push({ key, data });
        }
    });
    posts = timeUtil.sortObjectsByModifiedDateTimeEpoch(posts, 'dec');
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
        if (!req.body) {
            res.send({status: 0, info: "Save Failed. Empty body!"});
        } else {
            const objToSave = {
                ...req.body,
                modifiedDateTime: timeUtil.getCurrentISODateTime(),
                modifiedDateTimeEpoch: timeUtil.getCurrentEpochTime()
            }
            myDB.put(key, objToSave).then((accept)=>{
                console.log('/post POST accept = ', accept, ' ', objToSave);
                res.send({status: 1, info: "Save successfuly."});
            }, reject =>{
                console.log('/post POST reject = ', reject);
                res.send({status: 0, info: "Save Failed."});
            });
        }
        
    }
});

app.delete('/post', function (req, res) {
    if (req.query.key && req.query.key !== ''){
        const key = req.query.key;
        myDB.remove(key).then(
            (accept)=>{
                console.log('/post DELETE accept = ', accept, ' ', req.body);
                res.send({status: 1, info: `DELETE key ${key} successfuly.`});
            }, 
            reject =>{ 
                console.log('/post DELETE reject = ', reject);
                res.send({status: 0, info: `DELETE key ${key} failed.`});
            }
        );
    }
});

app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")));

app.use(express.static('frontend'));

const port = process.env.PORT || 5555;
app.listen(port, () => console.log("Server running on port ", port , "..."));

