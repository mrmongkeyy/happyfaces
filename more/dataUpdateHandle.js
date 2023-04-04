const fs = require('fs');
const path = require('path');
module.exports = function(req,res){
	req.on('data',(data)=>{
		data = JSON.parse(data);
		const handler = {
			afterUpload(){
				fs.readFile(`./more/private/media/${data.id}.base`,{root:path.join(__dirname)},(err,file)=>{
					if(err)throw err;
					file = JSON.parse(file.toString());
					file.push({
						caption:data.caption,
						fn:data.fname,
						date:data.date
					});
					fs.writeFile(`./more/private/media/${data.id}.base`,JSON.stringify(file),(err)=>{
						if(err)throw err;
						res.send('ok');
					})
				})
			},
			editBio(){

			}
		}
		handler[data.mode]();
	})
	
}