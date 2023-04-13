const express = require('express');
const app = express();
const Routes = require('./routes.js');
app.use(express.json());
app.use(express.urlencoded({extended:false}));
module.exports = {
	port:process.env.PORT,
	app,
	Routes,
	init(port){
		this.setRoutes();
		process.env.app = this.app;
		this.run(port);
	},
	run(port){
		if(!port && !this.port)port=3000;
		this.app.listen(this.port||port,()=>console.log('server running on ',this.port||port));
	},
	setRoutes(){
		this.Routes.forEach((r)=>{
			this.app[r.mM](r.url,(req,res)=>{r.response(req,res,this.app)});
		})
	}
}
