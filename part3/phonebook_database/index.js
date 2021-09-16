require("dotenv").config()
const Person = require("./models/person")
const express = require("express")
const app = express()
app.use(express.json())
const cors = require("cors")
app.use(cors())
const morgan = require("morgan")
app.use(express.static("build"))
morgan.token("response-data", function (req)
{
    return JSON.stringify(req.body)
})

app.use(morgan(":method :url :status :res[content-length] -:response-time ms :response-data"))

app.get("/api/persons", (request,response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})
app.get("/info", (request,response) => {
    const currentDate= new Date()
    Person.find({}).then(persons =>
        response.send(`Phonebook has info for ${persons.length} people <br>${currentDate}`)
    )
})
app.get("/api/persons/:id", (request, response) => {
    Person.findById(request.params.id)
        .then(person => {
            response.json(person)
            console.log(typeof person.number)
        })
})
app.delete("/api/persons/:id",(request,response,next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.post("/api/persons", (request,response, next) => {
    const body= request.body
    const person = new Person({
        name: body.name,
        number: body.number,
    })
    person.save().then(savedPerson => {
        response.json(savedPerson)
    }).catch(error => next(error))
})

app.put("/api/persons/:id", (request, response, next) => {
    const body = request.body
    const person={
        name: body.name,
        number: body.number
    }
    Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})
const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if(error.name ==="CastError") {
        return response.status(400).send({ error: "input is not a number" })
    } else if (error.name ==="ValidationError"){
        return(response.status(400).send({ error:error.message }))
    }
    next(error)
}
app.use(errorHandler)
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
