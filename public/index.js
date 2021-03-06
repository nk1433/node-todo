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

const actions = {

    text: (element, text) => 
        element.appendChild(document.createTextNode(text)),

    events: (element, events) => 
        Object.keys(events).forEach((key) => element.addEventListener(key, events[key])),

    children: (element, children) => 
        children.forEach((child) => element.appendChild(htmlTree(child))),

    attr: (element, attr) => 
        Object.keys(attr).forEach((key) => element.setAttribute(key, attr[key])),
};

const keywords = Object.keys(actions)

const createTodoItem = (todo) => 
    htmlTree({
        tag:"li",
        attr: {
            class: "todo",
        },
        children:[
            {
                tag: "span",
                text: todo.name,
            },
            {
                tag: "button",
                text: "Delete",
                events: {
                    click: () => deleteTodo(todo)
                }
            },
            {
                tag: "button",
                text: "Edit",
                events: {
                    click: () => editTodo(todo)
                }
            },
        ]
    });


const createTodoList = (totalTodos) => {
    select("#tasksList").innerHTML = "";
    const totalList = totalTodos.map(createTodoItem).forEach((list) =>
     select("#tasksList").appendChild(list));
}

const fetchTodoData = async () => 
    createTodoList((await axios.get("/todo")).data.todos);

const editTodo = (todo) => {
    edit = todo.id;
    select("#submit").textContent = "Edit";
    select("#task").value = todo.name;
}

document.addEventListener("DOMContentLoaded",fetchTodoData());

