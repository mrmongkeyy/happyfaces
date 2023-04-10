const db = require('./db');
const remove = require('./objcleaner');
module.exports = async function(req,res){
	let data = await db.get({model:req.query.id,schema:'general',where:{parentad:req.query.id}},true);
	remove(data[0]._doc,['_id','parentad','password','__v']);
	res.send(JSON.stringify(data[0]));
}