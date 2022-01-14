const {client} = require("./utils/client");
const {TodoRepository} = require("./repositories/todo.repository");

(async () => {
    try {
        // await TodoRepository.insert(todo);
        // console.log(todo);
        // console.log(await TodoRepository.findAll());
        const todo = await TodoRepository.find('61deb6a73c28c4e0435b78de');
        todo.title = "test blablabla";
        await TodoRepository.update(todo);
        console.log(await TodoRepository.find('61deb6a73c28c4e0435b78de'));
    } finally {
        await client.close();
    }
})();