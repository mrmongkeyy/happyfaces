const db = require('./db');
module.exports = function(req,res){
	req.on('data',(data)=>{
		data = JSON.parse(data);
		const handler = {
			async newphoto(){
				const persondata = await db.get({model:data.id,schema:'general'});
				const togive = {
					caption:data.caption,
					fn:data.fname,
					date:data.date,
					data:data.data
				}
				persondata[0].galery.push(togive);
				const newgalery = persondata[0].galery;
				await db.updateone({model:data.id,schema:'general',where:{parentad:data.id},set:{galery:newgalery}});
				res.send(JSON.stringify({valid:true}));
			},
			editBio(){

			}
		}
		handler[data.mode]();
	})
	
}