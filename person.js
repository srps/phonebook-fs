let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const list = (req, res) => {
  res.json(persons);
};

const view = (req, res) => {
  const personId = Number(req.params.id);
  const person = persons.find((person) => person.id === personId);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
};

const remove = (req, res) => {
  const personId = Number(req.params.id);
  persons = persons.filter((person) => (person.id !== personId ? true : false));
  res.status(204).end();
};

const add = (req, res) => {
  const body = req.body;
  console.log(req.body);
  if (!(body.name && body.number)) {
    return res.status(400).json({
      error: "name and number are mandatory",
    });
  } else if (persons.find(person => person.name === body.name)) {
    return res.status(400).json({ error: `${body.name} already exists in the phonebook` })
  }
  const newPerson = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };
  persons = persons.concat(newPerson)
  res.status(200).end();
};

const generateId = () => {
  const generator = () => Math.round(Math.random() * 100000000000000);
  let newId = generator();
  while (persons.find((person) => person.id === newId)) {
    newId = generator();
  }
  return newId;
};

const getAll = () => persons;

export default { list, view, remove, add, getAll };
