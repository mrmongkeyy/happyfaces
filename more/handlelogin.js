const db = require('./db');
module.exports = function(req,res){
	req.on('data',async function(data){
		const reqData = JSON.parse(data.toString());
		let personData = await db.get({model:'users',schema:'users',where:{username:reqData.username}},true);
		const databack = {
			success:false,
			msg:'Login success'
		};
		if(personData.length>0){
			//we in the step one.
			if(personData[0].password === reqData.password){
				databack.success = true;
				databack.id = personData[0].id;
			}else databack.msg = 'Password Invalid';
		}else databack.msg = 'Username Invalid';
		res.send(JSON.stringify(databack));
	})
}