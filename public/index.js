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
        children.forEach((child) => element.appendChild(createTag(child))),
};

const keywords = Object.keys(actions)

const createTag = (props) => {
    const element = document.createElement(props.tag);
    Object.keys(props).filter((key) => keywords.indexOf(key) !== -1)
        .forEach((keyword) => actions[keyword](element,props[keyword]));

    return element;
};


const createTodoItem = (todo) => 
    createTag({
        tag:"li",
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

