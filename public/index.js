const select = document.querySelector.bind(document);
let edit;

const createTodoInDb = async (todoName) => {
    await axios.post("/todo",{
        name: todoName
    });
}

const updateTodoInDb = async (todoName) => {
    await axios.put(`/todo/${edit}`,{
        name: todoName
    })
};

const formOnSubmit = async () => {
    const todoName = select("#task").value;
    if(edit === undefined) {
        await createTodoInDb(todoName);
    }
    else {
        await updateTodoInDb(todoName,);
        edit = undefined;
        select("#submit").textContent = "Create";
    }
    fetchTodoData();
    select("#form").reset();
};

const deleteTodo = async (todoId) => {
    await axios.delete(`/todo/${todoId}`);
    fetchTodoData();
};

const createTodoItem = (todo) => `<li>
    <b id="id_${todo.id}">${todo.name}</b>
    <button onclick="editTodo(${todo.id})">Edit</button>
    <button onclick="deleteTodo(${todo.id})">Delete</button>
    </li>`;

const createTodoList = (totalTodos) => 
    select("#tasksList").innerHTML = totalTodos.map(createTodoItem).join(" ");

const fetchTodoData = async () => 
    createTodoList((await axios.get("/todo")).data.todos);

const editTodo = (todoId) => {
    edit = todoId;
    select("#submit").textContent = "Edit";
    select("#task").value = select(`#id_${todoId}`).textContent;
}

document.addEventListener("DOMContentLoaded",fetchTodoData());