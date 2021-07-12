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

const createTag = ({tag,children}) => {
    const element = document.createElement(tag);
    const childrenList = children.map((child) => {
        const childElement = document.createElement(child.tag);
        if(child.text) {
            const childTextNode = document.createTextNode(child.text);
            childElement.appendChild(childTextNode);
        }
        if(child.events) {
            const keys = Object.keys(child.events);
            keys.forEach((key) => childElement.addEventListener(key,child.events[key]))
        }
        return childElement;
    })
    childrenList.forEach((child) => element.appendChild(child))
    return element;
} 


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