const sendmail = require('./mailer/emailsender.js');
const getOrigin = require('./getOrigin.js');
const db = require('./db.js');
db.setDbName('hao0');
db.newSchema({name:'userlist',schema:{}});
module.exports = function(req,res){
	req.on('data',async(data)=>{
		data = JSON.parse(data.toString());
		const result = await db.set({model:'regispos',schema:'general',data},true);
		let id = String(result._id);
		sendmail({
			email:data.email,
			origin:getOrigin(req),
			id,
			valid:Date.now()+36e+6
		},()=>{
			res.send(JSON.stringify({result}));
		},
		async()=>{
			//once not success.
			//i will delete data that we just stored.
			const result = await db.deleteone({model:'regispos',schema:'regispos',where:{_id:datauser.id}});
			console.log(result);
			res.send(JSON.stringify({
				goVerify:false
			}))
		});
	})
}