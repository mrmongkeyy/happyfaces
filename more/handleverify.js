const fs = require('fs');
const newUser = require('./newUser.js');
module.exports = function(req,res){
	const datauser = req.query;
	fs.readFile('./more/private/db/verificationantrees.base',(err,datafile)=>{
		if(err)throw err;
		datafile = JSON.parse(datafile.toString());
		if(datafile[datauser.id] && datafile[datauser.id].validCode===datauser.validCode){
			//i need to make sure that i have build the data first.
			newUser(datafile[datauser.id],()=>{
				delete datafile[datauser.id];
				fs.writeFile('./more/private/db/verificationantrees.base',JSON.stringify(datafile),(err)=>{
					if(err)throw err;
					res.send(`
						<h4 style=font-family:monospace>Mohon Tunggu...</h4>
						<script>
							setTimeout(function(){
								location.href = '${(req.headers.host==='localhost:8080'?'http':'https')}://${req.headers.host}/verified';
							},1000)
						</script>`);
				})	
			})
		}else res.send(`
			<h4 style=font-family:monospace>Mohon Tunggu...</h4>
			<script>
				setTimeout(function(){
					location.href = '${(req.headers.host==='localhost:8080'?'http':'https')}://${req.headers.host}/invalidrequest';
				},1000)
			</script>
		`)
	})
}