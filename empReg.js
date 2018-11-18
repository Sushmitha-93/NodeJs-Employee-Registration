let express = require('express')
let bodyParser = require('body-parser')
let mongodb = require('mongodb')

let myServer = express()
myServer.use(bodyParser.urlencoded({
    extended: false
}))

let mongoClient = mongodb.MongoClient;


let url = "mongodb://localhost:27017/employee"
let dbName = "employee"

let empno, name, company, action
var count, message

myServer.post("/", function(req, res) {
    console.log("QUERY STRING: ", req.body)

    empno = parseInt(req.body.empno)
    name = req.body.name
    company = req.body.company
    action = req.body.action

    //connect to Mongo client
    mongoClient.connect(url, function(err, client) {
        if (err) {
            console.log("Unable to connect: ", err)
        } else {
            console.log("Connected Successfully !!")

            const db = client.db(dbName);
            if (action == "Insert")
                insert();
            if (action == "Update")
                update();

            function insert() {
                db.collection('empDetails').insertOne({
                    empno: empno,
                    name: name,
                    company: company
                }, function(err, insertedRecs) {
                    count = insertedRecs.insertedCount;
                    res.send("<h1 aligh=center>Inserted " + count + " Successfully</h1>")
                    res.end()
                })
            }

            function update() {
                db.collection('empDetails').updateOne({
                    empno: empno
                }, {
                    $set: {
                        name: name,
                        company: company
                    }
                }, function(err, updatedRecs) {
                    count = updatedRecs.modifiedCount;
                    res.send("<h1 align=center>Updated " + count + " Successfully</h1>");
                    res.end();
                })
            }


            function display() {

            }


            client.close()
        }

    })
})


myServer.listen(8080, () => console.log("listening to 8080"))