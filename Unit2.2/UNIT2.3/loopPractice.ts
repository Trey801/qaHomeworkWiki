var todos: Array<string> = [
    "Wash the Car",
    "Get groceries",
    "Go to the gym",
    "Eat Dinner"
]

for(let i = 0; i < todos.length; i++) {
    console.log(`Todos #${i + 1}: ${todos[i]}!`)
}

todos.forEach((todo) => {
    console.log(`You still need to ${todos}!`)
})