let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textareaInput = document.getElementById("textareaInput");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("addNew");

form.addEventListener("submit", (e) =>{
    e.preventDefault();
    formValidation();
});

let formValidation = () =>{
    if(textInput.value === ""){
        msg.innerHTML = "Task cannot be blank!";
    }else{
        msg.innerHTML = "";
        acceptData();
        add.setAttribute("data-bs-dismiss","modal");
        add.click();

        //Means fucntion once
        (() =>{
            add.setAttribute("data-bs-dismiss","");
        })()
    }
};

let data = [];

let acceptData = () =>{
    data.push({
        text: textInput.value,
        dueDate: dateInput.value,
        description: textareaInput.value,
    });
    // data["text"] = textInput.value;
    // data["dueDate"] = dateInput.value;
    // data["description"] = textareaInput.value;
    localStorage.setItem("data", JSON.stringify(data));

    console.log(data);
    createTasks();

}

let createTasks = () =>{
    tasks.innerHTML = "";    
    //Y is gonna start counting from 0 to how many the data we have.
    //X is individually target the object one by one. 
    data.map((x,y)=>{
        return (tasks.innerHTML += 
        `
        <div id="${y}">
            <span class="fw-bold">${x.text}</span>
            <span class="small text-secondary">${x.dueDate}</span>
            <p>${x.description}</p>

            <span class="options">
                <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fa-solid fa-pen-to-square"></i>
                <i onClick="deleteTask(this);createTasks()" class="fa-solid fa-trash-can"></i>
            </span>
        </div>
        `);
    });
   
    resetForm();
};


let deleteTask = (e) =>{
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
};

let editTask = (e) =>{
    let selectedTask = e.parentElement.parentElement;

    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textareaInput.value = selectedTask.children[2].innerHTML;

    deleteTask(e);

};

let resetForm = () =>{
    textInput.value = "";
    dateInput.value = "";
    textareaInput.value = "";
};

(()=>{
    data = JSON.parse(localStorage.getItem("data")) || [];
    console.log(data);
    createTasks();
})()