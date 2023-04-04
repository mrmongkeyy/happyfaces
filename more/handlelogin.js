
const fs = require('fs');
module.exports = function(req,res){
	req.on('data',function(data){
		const dataout = JSON.parse(data.toString());
		fs.readFile('./more/private/db/login/login.base',(err,data)=>{
			if(err)throw err;
			const datain = JSON.parse(data.toString());
			const databack = {
				success:false,
				msg:'Login success'
			};
			if(datain[dataout.username]){
				//we in the step one.
				if(datain[dataout.username].password === dataout.password){
					databack.success = true;
					databack.id = datain[dataout.username].id;
				}else databack.msg = 'Password Invalid';
			}else databack.msg = 'Username Invalid';
			res.send(JSON.stringify(databack));
		})
	})
}