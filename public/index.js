const formOnSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/todo",{
        name: e.target.task.value
    });
    fetchTodoData();
    document.querySelector("#form").reset();
};

const deleteTodo = async (todoId) => {
    await axios.delete(`/todo/${todoId}`);
    fetchTodoData();
};

const createTodoList = (totalTodos) => {
    let listElement = "";
    totalTodos.forEach((task) => {
        listElement += `<li>
        <b>${task.name}</b>
        <button onclick="deleteTodo(${task.id})">Delete</button>
        </li>`;
    });
    document.querySelector("#tasksList").innerHTML = listElement;
};

const fetchTodoData = async () => {
    const data = await axios.get("/todo");
    const todoData = data.data.todos;
    createTodoList(todoData);
};