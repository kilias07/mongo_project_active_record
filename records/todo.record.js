const {ObjectId} = require("mongodb");
const {todos} = require("../utils/client");

class TodoRecord {
    constructor(obj) {
        this._id = ObjectId(obj._id);
        this.title = obj.title;

        this._validate();
    }

    _validate() {
        if (this.title.length < 5) {
            throw new Error('Todo title should be at least 5 characters long');
        }
        if (this.title.length > 150) {
            throw new Error('Todo title should be at most 150 characters long');
        }
    }

    async insert() {
        const {insertedId} = await todos.insertOne({
            _id: this._id,
            title: String(this.title),
        });
        this._id = insertedId;

        return insertedId;
    }

    async delete() {
        await todos.deleteOne({
            id: this._id,
        })
    }

    async update() {
        await todos.replaceOne({
            _id: this._id,
        }, {
            title: String(this.title),
        });

    }

    static async find(id) {
        const item = await todos.findOne({_id: ObjectId(String(id))});
        return item === null ? null : new TodoRecord(item);
    }

    static async findAll() {
        return (await (await todos.find()).toArray()).map(object => new TodoRecord(object));
    }

    static async findAllWithCursor() {
        return todos.find();
    }
}

module.exports = {
    TodoRecord,
};
