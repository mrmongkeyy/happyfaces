const db = require('./db');
module.exports = async function(req,res){
	const result = await db.get({model:req.query.id,schema:'general'});
	res.send(JSON.stringify(result[0].galery))
}