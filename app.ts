#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

let todolist: string [] = [];
let conditions = true;

console.log(chalk.italic.bgBlueBright("\n\t Wellcome to kakashan - Todo-list Application\n\t"));

let main = async () => {
    while(conditions){
        let option = await inquirer.prompt([
            {
              name: "choice",
              type: "list",
              message: (chalk.italic.bgGreen("select an option you want to do:")),
              choices: ["Add Task", "Delete Task", "update Task", "view todo list","Exit"]
            }
        ]);
        if(option.choice === "Add Task"){
            await addTask()
        }
        else if(option.choice === "Delete Task"){
            await DeleteTask()
        }
        else if(option.choice === "update Task"){
            await updateTask()
        }
        else if(option.choice === "view todo list"){
            await viewTask()
        }
        else if(option.choice === "Exit"){
            conditions = false;
        }
    }
}
let addTask = async() => {
    let newTask = await inquirer.prompt([
        {
            name: "Task",
            type: "input",
            message: (chalk.italic.bgMagenta("Enter your new task:")),
        }
    ]);
    todolist.push(newTask.Task);
    console.log(chalk.italic.bgYellow(`\n${newTask.Task} task added successfully\n`));
}
let viewTask = () => {
    console.log("\n your todo list:\n");
    todolist.forEach((task,index)=>{
        console.log(`${index + 1}:${task}`)
    })
}
let DeleteTask = async () => {
    await viewTask()
    let taskindex = await inquirer.prompt([
        {
            name: "index",
            types: "number",
            message: (chalk.italic.bgRed("Enter the `index no.` you want to delete:")),
        }
    ]);
    let DeleteTask =todolist.splice(taskindex.index -1, 1)
    console.log (chalk.italic.bgRedBright(`\n${DeleteTask} task delete succesfully from todo list`))
}
let updateTask = async () => {
    await viewTask()
    let update_Task_index = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.italic.bgHex("Enter the `index` you want to update:")
        },
        {
            name: "new_task",
            type: "input",
            message: "Now Enter new task name:",
        }
    ]);
    todolist[update_Task_index.index - 1] = update_Task_index.new_task
    console.log(`\n Task at index no.${update_Task_index.index - 1}updated succesfully [For updated list check option: "view todo_list]\n`)
}
main();