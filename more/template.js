module.exports = {
	app(config){
		return `
			<!doctype html>
			<html>
				<head>
					<title>hao0, save your happy moment!</title>
					<meta name=viewport content=width=device-width,initial-scale=1>
					<style>
						#content{
							width:50%;
						}
						.bigfont{
							font-size:18px;
						}
						.smallfont{
							font-size:12px;
						}
						.normal-size:{
							font-size:13px;
						}
						.responsiveWidth{
							width:50%;
						}
						.footerSetting{
							justify-content:space-around;
							width:50%;
						}
						.footerItems{
							margin:0 5px;
						}
						#finder{
							width:50%;
						}
						header{
							width:50%;
							justify-content:space-between;
						}
						input{
							outline:none;
							background:white;
							border:none;
							padding:5px;
						}
						.photocard{
							width:50%;
						}
						.galerycard{
							max-width:50%;
						}
						button{
							background:white;
							border:none;
							padding:5px;
							cursor:pointer;
						}
						#contentContainer{
							display:inline-block;
						}
						#lastOne{
							margin-bottom:10px;
						}
						@media screen and (max-width:900px){
							#content{
								width:100%;
							}
							.responsiveWidth{
								width:100%;
							}
							.footerSetting{
								justify-content:space-around;
								width:100%;
							}
							.footerItems{
								margin:0;
							}
							#profilePage{
								position:absolute;
								top:0;
								left:0;	
							}
							#finder{
								width:100%;
								justify-content:space-around;
							}
							header{
								width:100%;
								justify-content:space-around;
							}
							.photocard{
								width:100%;
							}
							.galerycard{
								max-width:95%;
							}
						}
					</style>
					<link rel=icon href=file?fn=happy-face.png>
				</head>
				<body></body>
				<script src=/scripts?fn=infinity></script>
				<script src=/scripts?fn=components></script>
				<script src=/scripts?fn=flex></script>
			</html>
		`;
	},
	verified(){
		return `
			<!doctype html>
			<html>
				<head>
					<title>hao0, validation complete.</title>
					<meta name=viewport content=width=device-width,initial-scale=1>
					<link rel=icon href=file?fn=happy-face.png>
					<style>
						body{
							font-family:monospace;
						}
						#bound{
							position:absolute;width:100%;height:100%;top:0;left:0;display:flex;justify-content:center;align-items:center;
							background:RGB(0,0,0,0.5);
						}
						#container{
							padding:10px;
							background:white;
							text-align:center;
						}
						span{
							display:inline-block;
						}
					</style>
				</head>
				<body></body>
				<script src=/scripts?fn=infinity></script>
				<script>
					find('body').addChild(makeElement('div',{
						id:'bound',
						onadded(){
							let innerHTML = "<div><span style=font-size:20px;padding:10px;>Verifikasi Akun Berhasil!</span></div><div><span style=background:lightseagreen;padding:10px;color:white;cursor:pointer; id=button>Login</span></div>"
							this.addChild(makeElement('div',{
								id:'container',
								innerHTML,
								onadded(){
									this.find('#button').onclick = function(){
										location.href = location.origin;
									}
								}
							}))
						}
					}))
				</script>
			</html>
		`;
	},
	invalidpage(){
		return `
			<!doctype html>
			<html>
				<head>
					<title>hao0, invalid request</title>
					<meta name=viewport content=width=device-width,initial-scale=1>
					<link rel=icon href=file?fn=happy-face.png>
					<style>
						body{
							font-family:monospace;
						}
						#bound{
							position:absolute;width:100%;height:100%;top:0;left:0;display:flex;justify-content:center;align-items:center;
							background:RGB(0,0,0,0.5);
						}
						#container{
							padding:10px;
							background:white;
							text-align:center;
						}
						span{
							display:inline-block;
						}
					</style>
				</head>
				<body></body>
				<script src=/scripts?fn=infinity></script>
				<script>
					find('body').addChild(makeElement('div',{
						id:'bound',
						onadded(){
							let innerHTML = "<div><span style=font-size:20px;padding:10px;>Request Tidak Valid!</span></div><div><span style=background:lightseagreen;padding:10px;color:white;cursor:pointer; id=button>Kembali</span></div>"
							this.addChild(makeElement('div',{
								id:'container',
								innerHTML,
								onadded(){
									this.find('#button').onclick = function(){
										location.href = location.origin;
									}
								}
							}))
						}
					}))
				</script>
			</html>
		`;
	}
}