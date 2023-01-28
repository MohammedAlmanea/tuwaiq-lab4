import express, { Request, Response } from 'express';
import { People } from './types/people.type';
import { v4 as uuidv4 } from 'uuid';
import { grade } from './types/grade.type';

const app = express();
const port = 3000; 
app.use(express.json());

let people: People[] = [];
let grades: grade[] = [];


app.get('/people', (req:Request, res:Response) => {
    res.json(people);
});

app.post('/people', (req:Request, res:Response) => {
    const newPerson = req.body as People;
    newPerson.id = uuidv4();
    people.push(newPerson);
    res.json(people);
});

app.put('/people/:id', (req:Request, res:Response) => {
    const updatedPerson = req.body as People;
    const personId = req.params.id;

    people = people.filter(person => person.id!== personId);
    people.push(updatedPerson);
    res.json(people);
});

app.delete('/people/:id', (req:Request, res:Response) => {
    const personId = req.params.id;

    people = people.filter(person => person.id!== personId);
    res.json(people);
});







app.get('/people/grade', (req:Request, res:Response) => {
    res.json(grades);
})

app.post('/people/grade', (req:Request, res:Response) => {
    const newGrade = req.body as grade;
    grades.push(newGrade);
    res.json(grades);
});

app.put('/people/grade/:id', (req:Request, res:Response) => {
    const updatedGrade = req.body as grade;
    const gradeId = req.params.id;
    grades = grades.filter(grade => grade.id!== gradeId);
    grades.push(updatedGrade);
});

app.delete('/people/grade/:id', (req:Request, res:Response) => {
    const gradeId = req.params.id;
    grades = grades.filter(grade => grade.id!== gradeId);
    res.json(grades);
});








app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});