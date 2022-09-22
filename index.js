const exp = require('constants');
const  express =require('express')

const Todos = require('./todo')

const app = express();
app.use(express.json());

const  PORT =3020;
const todos = new Todos()
app.get('/todos', (req,res)=>{
    return res.send({
        todos:todos.getTodos()
    })
})

app.post('/todo', (req,res)=>{
    try{
        const todo =req.body;
        const {task} =todo;
        console.log(task)
        todos.addTodos(task);
        return res.send("task has been added ")
    }catch(ex){
        console.log(ex)
        return res.status(500).send('internal server error ')
    }
})


app.delete('/todo/:id', (req,res)=>{
 let {id} =req.params;
 id =parseInt(id)
 try{
    todos.deleteTodo(id)
 }catch{
    return res.status(404).send('the todo is not exist')
 }
 return res.send('Deleted')
})


app.listen(3020, ()=>{
    console.log(`server is runnig at  port no. ${PORT}`)
})