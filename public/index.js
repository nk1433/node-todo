const select = document.querySelector.bind(document);
const create = document.createElement.bind(document);
const text = document.createElement.bind(document);
let edit;

const createTodoInDb = (todoName) =>
    axios.post("/todo",{
        name: todoName
    });

const updateTodoInDb =  (todoName) => 
    axios.put(`/todo/${edit}`,{
        name: todoName
    });

const formOnSubmit = async () => {
    const todoName = select("#task").value;
    if(edit === undefined) {
        await createTodoInDb(todoName);
    }
    else {
        await updateTodoInDb(todoName);
        edit = undefined;
        select("#submit").textContent = "Create";
    }
    fetchTodoData();
    select("#form").reset();
};

const deleteTodo = async (todo) => {
    await axios.delete(`/todo/${todo.id}`);
    fetchTodoData();
};

const createTag = (tag,text,children) => {
    const element = document.createElement(tag);
    if(text) {
        const textNode = document.createTextNode(text);
        element.appendChild(textNode);
    }
    if(children) {
        children.forEach((child) => element.appendChild(child))
    }
    return element
} 

const createEditingButton = (buttonName,todo) => {
    const button = createTag("button",buttonName)
    const action = buttonName === "Edit" ? editTodo : deleteTodo
    button.addEventListener("click",() => action(todo));

    return button
}

const createTodoItem = (todo) => 
    createTag("li",false,[
        createTag("span",todo.name),
        createEditingButton("Delete",todo),
        createEditingButton("Edit",todo)
    ]);


const createTodoList = (totalTodos) => {
    select("#tasksList").innerHTML = "";
    const totalList = totalTodos.map(createTodoItem).forEach((list) => select("#tasksList").appendChild(list));
}

const fetchTodoData = async () => 
    createTodoList((await axios.get("/todo")).data.todos);

const editTodo = (todo) => {
    edit = todo.id;
    select("#submit").textContent = "Edit";
    select("#task").value = todo.name;
}

document.addEventListener("DOMContentLoaded",fetchTodoData());