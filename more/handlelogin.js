const db = require('./nodb');
module.exports = function(req,res){
  const reqData = req.body;
	db.openDb('loginpos',()=>{
	  const personData = db.JSONDATA[reqData.username];
	  const databack = {
		  success:false,
		  msg:'Login success'
	  };
	  if(personData){
		  //we in the step one.
		  if(personData.password === reqData.password){
			  databack.success = true;
			  databack.id = personData.id;
		  }else databack.msg = 'Password Invalid';
	  }else databack.msg = 'Username Invalid';
	  res.send(JSON.stringify(databack));
	})
}
