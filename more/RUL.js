const db = require('./db');
db.setDbName('hao0');
module.exports = async function(req,res){
	res.send(JSON.stringify(await db.get({model:'users',schema:'users',where:{}})));
}