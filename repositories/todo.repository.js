const {TodoRecord} = require("../records/todo.record");
const {todos} = require("../utils/client");
const {ObjectId} = require("mongodb");


class TodoRepository {
    static _checkRecords(record) {
        if(!(record instanceof TodoRecord)) {
            throw new Error('record must be an instanceof TodoRecord');
        }
    }
    static async insert(record) {
        TodoRepository._checkRecords(record);
        const {insertedId} = await todos.insertOne(record);
        record._id = insertedId;

        return insertedId;
    }
    static async delete(record) {
        TodoRepository._checkRecords(record);
        await todos.deleteOne({
            id: record._id,
        })
    }
    static async update(record) {
        await todos.replaceOne({
            _id: record._id,
        }, {
            title: String(record.title),
        });

    }
    static async find(id) {
        const item = await todos.findOne({_id: ObjectId(String(id))});
        return item === null ? null : new TodoRecord(item);
    }
    static async findAll() {
        return (await todos.find()).toArray();
    }

}


module.exports = {
    TodoRepository,
};