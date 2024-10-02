const inputTask = document.querySelector('#taskInput')
const formTask = document.querySelector('#taskForm')
const taskList = document.querySelector('#taskList')
const theme = document.querySelector('#theme')

loadTasks()

formTask.addEventListener('submit', (e) => {
    e.preventDefault()

    const task = inputTask.value

    if(task){
        taskList.append(createTask(task))

        storeTaskInLocalStorage(task)

        inputTask.value = ''
    }
})

taskList.addEventListener('click', (event) => {
    if(event.target.classList.contains('delete-btn')){
        deleteTask(event.target.parentElement.parentElement)
    }else if(event.target.classList.contains('edit-btn')){
        editTask(event.target.parentElement.parentElement)
    }
})

theme.addEventListener('click', () => {
    document.querySelector('html').classList.toggle('dark-mode')

    const theme = document.querySelector('html').classList.contains('dark-mode') ? 'dark' : 'light'

    localStorage.setItem('theme', theme)
})

function deleteTask (task){
    if(confirm("Are you sure you want to eliminate this Task?")){
        task.remove()
        updateLocalStorage()
    }
}

function editTask (task){
    const newTask = prompt("Edit task:", task.firstChild.textContent)
    if(newTask !== null){
        task.firstChild.textContent = newTask
        updateLocalStorage()
    }
}

function createTask (task){
    const div = document.createElement('div')
    const div2 = document.createElement('div')
    const li = document.createElement('li')

    div.className = 'mainDivList'
    div2.className = 'childDivList'

    li.textContent = task
    li.className = 'li'

    div2.append(createButton('edit', 'edit-btn'), createButton('delete', 'delete-btn'))

    div.append(li, div2)

    return div
}

function createButton(type, style){
    const btn = document.createElement('button')

    btn.textContent = type
    btn.className = style

    return btn
}

function storeTaskInLocalStorage(task){
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]")

    tasks.push(task)

    localStorage.setItem("tasks", JSON.stringify(tasks))
}

function loadTasks(){
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]")
    const theme = localStorage.getItem("theme")

    console.log(theme)

    if(theme === "dark"){
        document.querySelector('html').classList.add('dark-mode')
    }

    tasks.forEach(task => {
        taskList.appendChild(createTask(task))
    });
}

function updateLocalStorage(){
    const tasks = []
    
    Array.from(taskList.querySelectorAll("li")).map(tsk => {
        tasks.push(tsk.textContent)
    })

    localStorage.setItem("tasks", JSON.stringify(tasks))
}


