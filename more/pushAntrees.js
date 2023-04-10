const db = require('./db');
db.setDbName('hao0');
module.exports = function(req,res){
	req.on('data',async (data)=>{
		data = JSON.parse(data.toString());
		const result = await db.set({model:{name:'regispos'},data});
		res.send(JSON.stringify({result}));
	})
}