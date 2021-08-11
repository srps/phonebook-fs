import express, { request, response } from "express";
import ejs from "ejs";
import person from "./person.js";
import morgan from "morgan";
import cors from "cors"

const app = express();

app.engine(".html", ejs.__express);
app.use(express.json());
app.use(express.static("build"));
app.use(cors())
app.set("view engine", "html");

// Logging request w/ body contents
morgan.token("tiny-body", (req, res) => ( JSON.stringify(req.body) ))
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :tiny-body"));

app.get("/api/persons", person.list);
app.get("/api/persons/:id", person.view);
app.delete("/api/persons/:id", person.remove);
app.post("/api/persons", person.add);

app.get("/info", (request, response) => {
  response.render("info", {
    title: "Info",
    fbPeople: person.getAll().length,
    reqTimestamp: new Date(),
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
