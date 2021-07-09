
let tasks = [];
let listElement = "";
let edit = true;

const formOnSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/todo",{
        name: e.target.task.value
    })
    allTodoData();
    document.querySelector("#form").reset();
};

const deleteTodo = (e) => {
    tasks.pop(e.target.textContent);
    if(tasks.length) {
        createTodoList();
    }
    else {
        listElement = "";
    }

    document.querySelector("#tasksList").innerHTML = listElement;
};

const createTodoList = (totalTodos) => {
    let listElement = "";
    // console.log(tasks)
    totalTodos.forEach((task) => {
        listElement += `<li onclick="">${task.name}</li>`;
    });
    document.querySelector("#tasksList").innerHTML = listElement;
};

const editTodo = (e) => {
    console.log("edit!!",e);
    console.log(e.previousElementSeblings)
};

const allTodoData = async() => {
    // console.log("body on loaded!");
    const data = await axios.get("/todo");
    const todoData = data.data.todos;
    createTodoList(todoData);
}