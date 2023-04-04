const sendmail = require('./mailer/emailsender.js');
const fs = require('fs');
module.exports = function(req,res){
	req.on('data',(data)=>{
		data = JSON.parse(data.toString());
		sendmail(data,(uniquepath)=>{
			fs.readFile('./more/private/db/verificationantrees.base',(err,datafile)=>{
				if(err)throw err;
				datafile = JSON.parse(datafile.toString());
				datafile[data.email] = Object.assign(data,{validCode:uniquepath});
				fs.writeFile('./more/private/db/verificationantrees.base',JSON.stringify(datafile),(err)=>{
					if(err)throw err;
					res.send(JSON.stringify({
						goVerify:true
					}))
				})
			})
		},
		()=>{
			res.send(JSON.stringify({
				goVerify:false
			}))
		});
	})
}