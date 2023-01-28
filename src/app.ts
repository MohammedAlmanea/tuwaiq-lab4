import express, { Request, Response } from 'express';
import { People } from './types/people.type';
import { v4 as uuidv4 } from 'uuid';
import { grade } from './types/grade.type';
import { task } from './types/task.type';

const app = express();
const port = 3000;
app.use(express.json());

let people: People[] = [];
let grades: grade[] = [];

app.get('/people', (req: Request, res: Response) => {
  res.json(people);
});

app.post('/people', (req: Request, res: Response) => {
  const newPerson = req.body as People;
  newPerson.id = uuidv4();
  people.push(newPerson);
  res.json(people);
});

app.put('/people/:id', (req: Request, res: Response) => {
  const updatedPerson = req.body as People;
  const personId = req.params.id;

  people = people.filter((person) => person.id !== personId);
  people.push(updatedPerson);
  res.json(people);
});

app.delete('/people/:id', (req: Request, res: Response) => {
  const personId = req.params.id;

  people = people.filter((person) => person.id !== personId);
  res.json(people);
});

app.get('/people/grade', (req: Request, res: Response) => {
  res.json(grades);
});

app.post('/people/grade', (req: Request, res: Response) => {
  const newGrade = req.body as grade;
  grades.push(newGrade);
  res.json(grades);
});

app.put('/people/grade/:id', (req: Request, res: Response) => {
  const updatedGrade = req.body as grade;
  const gradeId = req.params.id;
  grades = grades.filter((grade) => grade.id !== gradeId);
  grades.push(updatedGrade);
});

app.delete('/people/grade/:id', (req: Request, res: Response) => {
  const gradeId = req.params.id;
  grades = grades.filter((grade) => grade.id !== gradeId);
  res.json(grades);
});

let tasks: task[] = [];

// Create a new task
app.get('/tasks', (req: Request, res: Response) => {
  res.json(tasks);
});

// Display all tasks
app.post('/tasks', (req: Request, res: Response) => {
  const newTask = req.body as task;
  const newId = uuidv4();
  newTask.id = newId;
  tasks.push(newTask);
  res.json(tasks);
});

// Update a task
app.put('/tasks/:id', (req: Request, res: Response) => {
  const updatedTask = req.body as task;
  const newTasks = tasks.filter((task) => task.id !== updatedTask.id);
  newTasks.length !== tasks.length
    ? (tasks = newTasks)
    : res.json(`There is no task with id: ${updatedTask.id}`);
  tasks.push(updatedTask);
  res.json(tasks);
});

// Delete a task
app.delete('/tasks/:id', (req: Request, res: Response) => {
  const taskId = req.params.id as string;
  const newTasks = tasks.filter((task) => task.id !== taskId);
  newTasks.length !== tasks.length
    ? (tasks = newTasks)
    : res.json(`There is no task with id: ${taskId}`);
  res.json(tasks);
});

// Change the task status as done or not done
app.put('/tasks/status/:id', (req: Request, res: Response) => {
  const taskId = req.params.id as string;
  const status = req.body.status as string;
  // const neededTask = tasks.filter(task => task.id === taskId)[0];
  // tasks = tasks.filter(task => task.id!== taskId);
  // neededTask.status = status;
  // tasks.push(neededTask);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    res.json(`There is no task with id: ${taskId}`);
  }
  tasks[taskIndex].status = status;
  res.json(tasks);
});

// Search for a task by given title
app.get('/tasks/:title', (req: Request, res: Response) => {
  const taskTitle = req.params.title;
  const requestedTask = tasks.filter((task) => task.title === taskTitle);
  requestedTask.length > 0
    ? res.json(requestedTask)
    : res.json(`There is no task with title: ${taskTitle}`);
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
