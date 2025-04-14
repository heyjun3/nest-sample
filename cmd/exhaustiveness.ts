type UnDoneTask = {
    type: 'undone';
    id: string;
    name: string;
}
type DoneTask = {
    type: 'done';
    id: string;
    name: string;
    doneAt: Date;
}
type SuperTask = {
    type: 'super';
    id: string;
    name: string;
}

type Task = UnDoneTask | DoneTask | SuperTask;

function exhaustivenessCheck(task: Task) {
    switch (task.type) {
        case 'undone':
            console.log(`Task ${task.id} is undone`);
            return;
        case 'done':
            console.log(`Task ${task.id} is done at ${task.doneAt}`);
            return;
        case 'super':
            console.log(`Task ${task.id} is super`);
            return;
        default:
            task satisfies never;
    }
}