const db = require('./db.js');
db.setDbName('hao0');
module.exports = async function(req,res){
	const datauser = req.query;
	if(Date.now()<=datauser.valid){
		console.log(datauser.id);
		const suspect = await db.get({model:'regispos',schema:'general',where:{_id:datauser.id}});
		//i have to save this data, on login_info and also create this own id, models.
		console.log(suspect);
		const delete_ = await db.deleteone({model:'regispos',schema:'general',where:{_id:datauser.id}});
		console.log(delete_);
		const room = await db.set({model:datauser.id,schema:'general',data:{
			parentad:datauser.id,
			email:suspect[0].email,
			username:suspect[0].username,
			password:suspect[0].password,
			name:suspect[0].name,
			age:suspect[0].age,
			birthdate:suspect[0].birthdate,
			birthplace:suspect[0].birthplace,
			motto:suspect[0].motto,
			message:suspect[0].message,
			hobbies:suspect[0].hobbies,
			dreams:suspect[0].dreams,
			profile:suspect[0].profile,
			galery:[]
		}},true);
		console.log(room);
		const setNewUser = await await db.set({model:'users',schema:'users',data:{
			id:room.parentad,
			email:room.email,
			username:room.username,
			password:room.password,
			motto:room.motto,
			profile:room.profile
		}},true);
		console.log(setNewUser);
		res.send(`
			<h4 style=font-family:monospace>Mohon Tunggu...</h4>
			<script>
				setTimeout(function(){
					location.href = '${(req.headers.host==='localhost:8080'?'http':'https')}://${req.headers.host}/verified';
				},1000)
			</script>`);
	}else res.send(`
		<h4 style=font-family:monospace>Mohon Tunggu...</h4>
		<script>
			setTimeout(function(){
				location.href = '${(req.headers.host==='localhost:8080'?'http':'https')}://${req.headers.host}/invalidrequest';
			},1000)
		</script>
	`)
}