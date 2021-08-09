import express, { request, response } from "express";
import ejs from "ejs";
import person from "./person.js"

const app = express()

app.engine('.html', ejs.__express);
app.use(express.json())
app.use(express.static('public'));
app.set('view engine', 'html');

app.get("/api/persons", person.list)
app.get("/api/persons/:id", person.view)
app.delete("/api/persons/:id", person.remove)
app.post("/api/persons", person.add)

app.get("/info", (request, response) => {
  response.render('info', { title: 'Info', fbPeople: person.getAll().length, reqTimestamp: new Date() })
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
