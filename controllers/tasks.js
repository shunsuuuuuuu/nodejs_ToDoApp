const Task = require('../models/Task'); // Import the Task model. Task はスキーマの名前

const getAllTasks = async (req, res) => {
    const allTasks = await Task.find({});
    try {
        res.status(200).json(allTasks); // HTTPステータスコード200(成功)と共にJSON形式のレスポンスをクライアントに送信
    }
    catch (error) {
        res.status(500).json(error); // HTTPステータスコード500(サーバーエラー)と共にエラーメッセージをクライアントに送信
    }
}

const createTasks = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(200).json(createTasks); // HTTPステータスコード200(成功)と共にJSON形式のレスポンスをクライアントに送信
    }
    catch (error) {
        res.status(500).json(error); // HTTPステータスコード500(サーバーエラー)と共にエラーメッセージをクライアントに送信
    }
}

const getSingleTasks = async (req, res) => {
    try {
        const singleTask = await Task.findOne({_id:req.params.id}).exec();
        if (!singleTask) {
            return res.status(404).json({ message: `No task with id : ${req.params.id}` }); // HTTPステータスコード404(リソースが見つからない)と共にエラーメッセージをクライアントに送信
        }
        else {
            return res.status(200).json(singleTask); // HTTPステータスコード200(成功)と共にJSON形式のレスポンスをクライアントに送信
        }
    }
    catch (error) {
        res.status(500).json(error); // HTTPステータスコード500(サーバーエラー)と共にエラーメッセージをクライアントに送信
    }

}

const updateTasks = async (req, res) => {
    try {
        // exec()は、Mongooseのメソッドの1つで、クエリを実行して結果を返す。
        const updateTasks = await Task.findOneAndUpdate({_id:req.params.id}, req.body).exec();
        if (!updateTasks) {
            return res.status(404).json({ message: `No task with id : ${req.params.id}` }); // HTTPステータスコード404(リソースが見つからない)と共にエラーメッセージをクライアントに送信
        }
        else {
            updatedTask = await Task.findOne({_id:req.params.id}).exec();
            return res.status(200).json(updatedTask); // HTTPステータスコード200(成功)と共にJSON形式のレスポンスをクライアントに送信
        }
    }
    catch (error) {
        res.status(500).json(error); // HTTPステータスコード500(サーバーエラー)と共にエラーメッセージをクライアントに送信
    }
}

const deleteTask = async (req, res) => {
    try {
        const deleteTask = await Task.findOneAndDelete({_id:req.params.id});
        if (!deleteTask) {
            return res.status(404).json({ message: `No task with id : ${req.params.id}` }); // HTTPステータスコード404(リソースが見つからない)と共にエラーメッセージをクライアントに送信
        }
        else {
            return res.status(200).json({ message: `Task with id : ${req.params.id} is deleted` }); // HTTPステータスコード200(成功)と共にJSON形式のレスポンスをクライアントに送信
        }
    }
    catch (error) {
        res.status(500).json(error); // HTTPステータスコード500(サーバーエラー)と共にエラーメッセージをクライアントに送信
    }
}

module.exports = {
    getAllTasks,
    createTasks,
    getSingleTasks,
    updateTasks,
    deleteTask
}
