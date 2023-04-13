const db = require('./nodb');
module.exports = async function(req,res){
	db.openDb(req.query.id,()=>{
	  res.send(JSON.stringify(db.JSONDATA.media));
	})
}
