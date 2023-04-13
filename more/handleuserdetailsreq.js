const db = require('./nodb');
const remove = require('./objcleaner');
module.exports = async function(req,res){
	//let data = await db.get({model:req.query.id,schema:'general',where:{parentad:req.query.id}},true);
	db.openDb(req.query.id,()=>{
	  remove(db.JSONDATA,['parentad','password']);
  	res.send(JSON.stringify(db.JSONDATA));    
	})
}
