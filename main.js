const inpt = document.querySelector('#inpt')
const item = document.querySelector('.list-group')
const but = document.getElementById('but')
const formadd = document.getElementById('formadd')
const inpt2 = document.querySelector('#inpt2')


const formedit = document.getElementById('formedit')
const inptedit = document.getElementById('inptedit')
// const inptapp = document.getElementById('inptapp')
const modl = document.getElementById('modl')
const overly = document.getElementById('overly')
const x = document.getElementById('x')

let editItemId


let todos = JSON.parse(localStorage.getItem('list')) ? JSON.parse(localStorage.getItem('list')) : []

if (todos.length) showTodos()


function addlocal() {
    localStorage.setItem('list', JSON.stringify(todos))
   
}


function showTodos(){
   const todosi = JSON.parse(localStorage.getItem('list'))
   item.innerHTML =''
   todosi.forEach((el, i) => {

    item.innerHTML +=`<li  class="list-group-item list-group-item-primary d-flex justify-content-between ${el.completed == true ? 'completed' : ''}"> 
    
    <h1> ${el.text} </h1>
    
    <div class='d-flex'>
    
    <p class='add' onclick="minCompleted(${i})">-</p>

    <p class='add'">${el.text2}</p> 

    <p class='add' onclick="setCompleted(${i})">+</p>


    <span class="time">${el.time}</span>
    <i onclick=(deleteTodo(${i})) class="fa-solid fa-trash x"></i>
</div>
    
    </li>`
    
   });
}

function getTime(){
    const now = new Date()
    const date= now.getDate() < 10 ? '0' + now.getDate() : now.getDate()
    const month= now.getMonth() < 10 ? '0' + (now.getMonth() + 1) : now.getMonth()
    const year= now.getFullYear()

    const hour= now.getHours() < 10 ? '0' + now.getHours() : now.getHours()
    const minut= now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()

    return `${hour}:${minut},  ${date}.${month}.${year}`
    
}


function showError(where, err){
    document.getElementById(`${where}`).textContent = err

    setTimeout(() => {
    document.getElementById(`${where}`).textContent = ''

    }, 3000)
   }

but.addEventListener('click', (e)=>{
    e.preventDefault()
    let val = inpt.value.trim()
    let val2 = +inpt2.value.trim()
    formadd.reset()
    if(!val){
        showError('inptapp', 'error...')

    }else{
        // inptapp.innerHTML = ``
        todos.push({text: val, text2: val2, time: getTime(), completed: false})

        addlocal()
        showTodos()
           
}
    

})

function deleteTodo(id){
   const delTodos = todos.filter((item, i) =>{
    return i!==id
   })

   todos = delTodos

   addlocal()
   showTodos()
}

function setCompleted(id){
    const compledTodos = todos.map((itm, i) =>{
        console.log(itm);

if(id == i){
    return {...itm, text2: itm.text2 +1}
}else{ 
    return {...itm}

}
    })

    todos = compledTodos

   addlocal()
   showTodos()

}

function minCompleted(id){
    const compledTodos = todos.map((itm, i) =>{

if(id == i){
    return {...itm, text2: itm.text2 -1}
}else{ 
    return {...itm}

}
    })

    todos = compledTodos

   addlocal()
   showTodos()

}

formedit.addEventListener('submit', (e) =>{
    e.preventDefault()

    let valu = inptedit.value.trim()
    formedit.reset()
    if(!valu){
        showError('inptapp2', 'error...')

    }else{
        // inptapp.innerHTML = ``
        todos.splice(editItemId, 2, {text: valu, text2: val2, time: getTime(), completed: false})

        addlocal()
        showTodos()
        close()
           
}
})

function editTodo(id){   
    open()
   editItemId = id
}
 

function open(){
    modl.classList.remove('hidden')
    overly.classList.remove('hidden')
}

x.addEventListener('click', close)
overly.addEventListener('click', close)
document.addEventListener('keydown', (e) =>{
    if(e.which == 27){
        close()
    }
})
function close(){
    modl.classList.add('hidden')
    overly.classList.add('hidden')
}