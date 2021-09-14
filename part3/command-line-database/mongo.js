const mongoose = require("mongoose")

if (process.argv.length < 3) {
    console.log("Please provide the password as an argument: node mongo.js <password>")
    process.exit(1)
}

const password = process.argv[2]

const url = 
    `mongodb+srv://fullstack:${password}@phonebook.dfbyw.mongodb.net/phonebook?retryWrites=true&w=majority`

 mongoose.connect(url)
 const personSchema = new mongoose.Schema({
     name: String,
     number: Number,
 })
 const Person= mongoose.model("Person", personSchema)
 if(process.argv.length===3){
     Person.find({}).then(result => {
         if(result.length==0){
             console.log("empty")
         }
         else{
            console.log("phonebook:")
            result.forEach(person => {
                console.log(`${person.name} ${person.number}`);
            })}
         mongoose.connection.close()
     })
 }
 else if(process.argv.length==5){
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })
    person.save().then(result => {
        console.log(`added ${person.name} number ${person.number} to phonebook`)
        mongoose.connection.close()
    })
}
else {
    console.log("No entry will be saved. Closing connection.")
    mongoose.connection.close()
}
