const db = require('./db');
module.exports = function(req,res){
	const data = req.body;
	const result = await db.set({model:{name:'regispos'},data});
	res.send(JSON.stringify({result}));
}
