let dateInput = document.querySelector('.dateInput');
let textInput = document.querySelector('.textInput');
let addButton = document.querySelector('.addButton');
let listContainer = document.querySelector('.listContainer');

let storageData = JSON.parse(localStorage.getItem('listValues')) || [];

function renderTasks() {
    listContainer.innerHTML = '';

    storageData.forEach((task, index) => {
        let taskElement = document.createElement('div');
        taskElement.classList.add('taskContainer');
        taskElement.innerHTML = `
            <div class="listTextElem">${task.text}</div>
            <div class="listDateElem">${task.date}</div>
            <button class="deleteButton" data-index="${index}">Delete</button>
        `;

        taskElement.querySelector('.deleteButton').addEventListener('click', () => {
            deleteTask(index);
        });


        listContainer.appendChild(taskElement);
    });
}


function createTask() {
    let textInputValue = textInput.value.trim();
    let dateInputValue = dateInput.value;

    if (textInputValue === '' || dateInputValue === '') {
        alert('Please fill in both fields');
        return;
    }

    let newTask = {
        text: textInputValue,
        date: dateInputValue
    };

    storageData.push(newTask); 
    localStorage.setItem('listValues', JSON.stringify(storageData)); 

    renderTasks(); 
    textInput.value = ''; 
    dateInput.value = '';
}


function deleteTask(index) {
    storageData.splice(index, 1); 
    localStorage.setItem('listValues', JSON.stringify(storageData)); 
    renderTasks(); 
}

addButton.addEventListener('click', createTask);

renderTasks();