const sendmail = require('./mailer/emailsender.js');
const getOrigin = require('./getOrigin.js');
const nodb = require('./nodb');
const getUnique = require('./unique');
//db.newSchema({name:'userlist',schema:{}});
module.exports = function(req,res){
	const data = req.body;
	//const result = await db.set({model:'regispos',schema:'general',data},true);
	//let id = String(result._id);
	let id = getUnique();
	sendmail({
		email:data.email,
		origin:getOrigin(req),
		id,
		valid:Date.now()+36e+6
	},()=>{
	  nodb.openDb('regispos',()=>{
      nodb.JSONDATA;
      nodb.JSONDATA[id] = data;
	    nodb.save(()=>{res.send(JSON.stringify({goVerify:true}))});
	  });
	},
	async()=>{
		//once not success.
		//i will delete data that we just stored.
		//const result = await db.deleteone({model:'regispos',schema:'regispos',where:{_id:datauser.id}});
		//console.log(result);
		res.send(JSON.stringify({
			goVerify:false
		}))
	})
}
