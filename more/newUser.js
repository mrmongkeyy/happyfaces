//const fs = require('fs');
const fs = require('@cyclic.sh/s3fs');
//use cyclic fs function.
let datafirst;
module.exports = function(data,callback){
	//working on users base.
	datafirst = data;
	fs.writeFile(`./more/private/db/users/${datafirst.validCode}.base`,JSON.stringify({
		NAME:datafirst.name,
		OLD:datafirst.old,
		BIRTHDATE:datafirst.birthdate,
		BIRTHPLACE:datafirst.birthplace,
		MOTO:datafirst.moto,
		MSG:datafirst.msg,
		HOBBIES:datafirst.hobbies,
		DREAMS:datafirst.dreams,
		picture:datafirst.picture
	}),(err)=>{
		//working on login base.
		if(err)throw err;
		fs.readFile(`./more/private/db/login/login.base`,(err,datafile)=>{
			if(err)throw err;
			datafile = JSON.parse(datafile.toString());
			datafile[datafirst.username] = {
				id:datafirst.validCode,
				password:datafirst.password
			}
			console.log(datafile);
			fs.writeFile(`./more/private/db/login/login.base`,JSON.stringify(datafile),(err)=>{
				if(err)throw err;
				//working on users base(loaded while date at first.)
				fs.readFile(`./more/private/db/users.base`,(err,datafile)=>{
					if(err)throw err;
					datafile = JSON.parse(datafile.toString());
					datafile.push({
						id:datafirst.validCode,
						username:datafirst.username,
						name:datafirst.name,
						picture:datafirst.picture,
						quote:datafirst.moto
					});
					fs.writeFile(`./more/private/db/users.base`,JSON.stringify(datafile),(err)=>{
						if(err)throw err;
						fs.writeFile(`./more/private/media/${datafirst.validCode}.base`,JSON.stringify([]),(err)=>{
							if(err)throw err;
						})
					})
				})
			})
		})
	})
	
	callback();
}
