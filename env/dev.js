const path = require('path');

module.exports = {
  dbUrl: "mongodb+srv://marc:Dfrvnzazoo22_Mb@cluster0.rhhgb.mongodb.net/twitter?retryWrites=true&w=majority",
  cert: path.join(__dirname, '../ssl/local.crt'),
  key: path.join(__dirname, '../ssl/local.key')
}