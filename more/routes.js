const view = require('./view.js');
const fm = require('./fileH.js');
const isAdmin = require('./isAdmin.js');
const ufile = require('./ufile.js');
const handleLogin = require('./handlelogin.js');
const dataUpdateHandle = require('./dataUpdateHandle.js');
const path = require('path');
const handleVerify = require('./handleverify.js');
const handleRequestUserList = require('./RUL.js');
const handleregis = require('./handleregis.js');
const handleUserDetailsReq = require('./handleuserdetailsreq.js');
const handleLoadPhotosReq = require('./loadPhotosHandlingReq');
module.exports = [
	{
		url:'/',
		mM:'get',
		response(req,res){
			view.go('app',req,res);
		}
	},
	{
		url:'/styles',
		mM:'get',
		response(req,res){
			fm.do(req,res);
		}
	},
	{
		url:'/scripts',
		mM:'get',
		response(req,res){
			fm.do(req,res);
		}
	},
	{
		url:'/file',
		mM:'get',
		response(req,res){
			fm.do(req,res);
		}
	},
	{
		url:'/upload',
		mM:'post',
		response(req,res){
			ufile.handle(req,res);
		}
	},
	{
		url:'/getuserlist',
		mM:'get',
		response(req,res){
			//connect to db, then send the data.
			handleRequestUserList(req,res);
		}
	},
	{
		url:'/profilepics',
		mM:'get',
		response(req,res){
			res.sendFile(`./private/profilepics/${req.query.fn}`,{root:path.join(__dirname)},(err)=>{
				if(err)throw err;
			})
		}
	},
	{
		url:'/getuserdetail',
		mM:'get',
		response(req,res){
			handleUserDetailsReq(req,res);
		}
	},
	{
		url:'/loadphotos',
		mM:'get',
		response(req,res){
			handleLoadPhotosReq(req,res);
		}
	},
	{
		url:'/photos',
		mM:'get',
		response(req,res){
			res.sendFile(`./private/media/photos/${req.query.fn}`,{root:path.join(__dirname)},(err)=>{
				if(err)throw err;
			})
		}
	},
	{
		url:'/login',
		mM:'post',
		response(req,res){
			handleLogin(req,res);
		}
	},
	{
		url:'/updateData',
		mM:'post',
		response(req,res){
			dataUpdateHandle(req,res);
		}
	},
	{
		url:'/regis',
		mM:'post',
		response(req,res){
			handleregis(req,res);
		}
	},
	{
		url:'/verify',
		mM:'get',
		response(req,res){
			handleVerify(req,res);
		}
	},
	{
		url:'/verified',
		mM:'get',
		response(req,res){
			view.go('verified',req,res);
		}
	},
	{
		url:'/invalidrequest',
		mM:'get',
		response(req,res){
			view.go('invalidpage',req,res);
		}
	}
];