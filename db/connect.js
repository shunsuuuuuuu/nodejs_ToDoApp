const mongoose = require('mongoose');

const conectDB = (url) => {
  return mongoose
  .connect(url)
  .then(() => { console.log('Connected to the database') }) // 接続できたらログを出力
  .catch((error) => { console.log(error) } // エラーが発生したらログを出力
  );
}

module.exports = conectDB;
