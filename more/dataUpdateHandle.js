const db = require('./nodb');
module.exports = function(req,res){
	const data = req.body;
	const handler = {
	  handlingCaption(){
		  db.openDb(data.id,()=>{
		    db.JSONDATA['media'].push({
			    caption:data.caption,
			    fn:data.fname,
			    date:data.date,
			    fileType:data.fileType,
			    data:''
		    });
		    db.save(()=>{
		      res.send(JSON.stringify({valid:true,updateAntree:db.JSONDATA.media.length-1}));
		    })
		  })	
	  },
	  editBio(){

	  },
	  handlingFile(){
	    db.openDb(data.id,()=>{
	      db.JSONDATA.media[data.antrees].data += data.data;
	      db.save(()=>{
	        res.send('ok');
	      });
	    })
	  }
  }
  handler[data.mode]();
}
