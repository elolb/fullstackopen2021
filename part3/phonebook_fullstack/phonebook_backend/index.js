const express = require("express")
const app = express()
app.use(express.json())
const cors = require('cors')
app.use(cors())
const morgan = require("morgan")
app.use(express.static('build'))
morgan.token('response-data', function (req, res)
 { 
    return JSON.stringify(req.body) 
 })

app.use(morgan(":method :url :status :res[content-length] -:response-time ms :response-data"))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
app.get("/api/persons", (request,response)=>{
    response.json(persons)
})
app.get("/info", (request,response)=>{
    const currentDate= new Date()
    response.send(`Phonebook has info for ${persons.length} people \n 
    ${currentDate}`)
})
app.get("/api/persons/:id", (request, response)=>{
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if(person){
        response.json(person)
    } else {
        response.status(404).end()
    }
})
app.delete("/api/persons/:id",(request,response)=>{
    const id = Number(request.params.id)
    persons = persons.filter(person=> person.id!==id)
    response.status(204).end()
})

app.post("/api/persons", (request,response)=>{
    const id = Math.floor(Math.random()*20000)
    const person= request.body
    if(!(person.name&&person.number)){
        return response.status(400).json({
            error:"name or number is missing"
        })
    }

    for(i=0; i<persons.length;i++){
        if(persons[i].name===person.name){
            return response.status(400).json({
                error:"name must be unique"
            })
        }
    }
    person.id=id
    persons = persons.concat(person)
    response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
