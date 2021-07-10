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
    totalTodos.forEach((todo) => {
        listElement += `<li>
        <b id="id_${todo.id}">${todo.name}</b>
        <button onclick="editTodo(${todo.id})">Edit</button>
        <button onclick="deleteTodo(${todo.id})">Delete</button>
        </li>`;
    });
    document.querySelector("#tasksList").innerHTML = listElement;
};

const fetchTodoData = async () => {
    const data = await axios.get("/todo");
    const todoData = data.data.todos;
    createTodoList(todoData);
};

const editTodo = (todoId) => {
    document.querySelector("#task").value = document.querySelector(`#id_${todoId}`).textContent;
    document.querySelector("#submit").textContent = "Edit";
    document.querySelector("#form").setAttribute("onsubmit",`updateToDb(event,${todoId})`);
};

const updateToDb = (e,todoId) => {
    e.preventDefault();
    axios.put(`/todo/${todoId}`,{
        name: e.target.task.value
    })
    document.querySelector("#form").setAttribute("onsubmit",`formOnSubmit(event)`);
    document.querySelector("#submit").textContent = "Create";
    document.querySelector("#form").reset();
    fetchTodoData();
};