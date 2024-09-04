const todoSymbol = Symbol('todo');

function findInstanceOf(element){
    //this will determine whether the element passed is
    //a todo item, note, 
    if(element[todoSymbol]){
        return 'todo';
    }
}

function createBucket (title){
    this.title = title;
    const bucketList = [];

    //element could be a todo List, notes or checklist
    const addToBucketList = (element)=>{

        switch(findInstanceOf(element)){
            case 'todo': console.log('Its a todo item');
        }
    }

    return { title, addToBucketList };
}

function createTodoItem(title,description,dueDate,priority){
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority

    return { [todoSymbol]:true, title,description,dueDate,priority };
}

let myBucket = createBucket('myBucket');
let myTodo = createTodoItem('myTodo','test','Nov,11','1');

myBucket.addToBucketList(myTodo);