const db = require('./nodb');
module.exports = async function(req,res){
	const datauser = req.query;
	if(Date.now()<=datauser.valid){
	  //get the data.
    db.openDb('regispos',()=>{
	    const target = db.JSONDATA[datauser.id];
	    db.openDb(datauser.id,()=>{
	      //adding one more thing.
	      target.media = [];
	      Object.assign(db.JSONDATA,target);
	      db.save(()=>{
	        db.openDb('regispos',()=>{
	          delete db.JSONDATA[datauser.id];
	          db.save(()=>{
	            db.openDb('userlist',()=>{
	              db.JSONDATA.push({
			            id:datauser.id,
			            email:target.email,
			            username:target.username,
			            password:target.password,
			            motto:target.motto,
			            profile:target.profile
		            });
		            db.save(()=>{
		              db.openDb('loginpos',()=>{
		                db.JSONDATA[target.username] = {
		                  email:target.email,
		                  password:target.password,
                      id:datauser.id
		                };
		                db.save(()=>{
		                  res.send(`
			                  <h4 style=font-family:monospace>Mohon Tunggu...</h4>
			                  <script>
				                  setTimeout(function(){
					                  location.href = '${(req.headers.host==='localhost:8080'?'http':'https')}://${req.headers.host}/verified';
				                  },1000)
			                  </script>`);
		                })   
		              })
		            })
	            })
	          });
	        })
	      });
	    })
	  });
	}else res.send(`
		<h4 style=font-family:monospace>Mohon Tunggu...</h4>
		<script>
			setTimeout(function(){
				location.href = '${(req.headers.host==='localhost:8080'?'http':'https')}://${req.headers.host}/invalidrequest';
			},1000)
		</script>
	`)
}
