const mongoose = require('mongoose');

// Data Structure of the Task document
const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'You must provide a name'],
        trim: true,
        maxlength: [20, 'Name must be less than 20 characters']
    },
    completed: {
        type: Boolean,
        default: false
    }
})

// mongoose.modelは、Mongooseライブラリの関数で、MongoDBのドキュメントを表すモデルを作成します。
module.exports = mongoose.model('Task', TaskSchema); // Export the Task model
