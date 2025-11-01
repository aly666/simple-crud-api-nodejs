import express from "express";
import { v4 as uuid } from "uuid";

const app = express();
app.use(express.json());

let employees = [];

// CREATE
app.post("/employees", (req, res) => {
  const employee = { id: uuid(), ...req.body };
  employees.push(employee);
  res.status(201).json(employee);
});

// READ ALL
app.get("/employees", (req, res) => {
  res.json(employees);
});

// READ BY ID
app.get("/employees/:id", (req, res) => {
  const employee = employees.find(e => e.id === req.params.id);
  if (!employee) return res.status(404).json({ message: "Not found" });
  res.json(employee);
});

// UPDATE
app.put("/employees/:id", (req, res) => {
  const index = employees.findIndex(e => e.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: "Not found" });

  employees[index] = { ...employees[index], ...req.body };
  res.json(employees[index]);
});

// DELETE
app.delete("/employees/:id", (req, res) => {
  const index = employees.findIndex(e => e.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: "Not found" });

  employees.splice(index, 1);
  res.json({ message: "Deleted" });
});

app.listen(3000, () => console.log("🚀 Server running at http://localhost:3000"));

