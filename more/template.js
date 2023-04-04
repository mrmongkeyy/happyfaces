module.exports = {
	make(config){
		return `
			<!doctype html>
			<html>
				<head>
					<title>happyfaces</title>
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
							justify-content:center;
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
						}
						.photocard{
							width:50%;
						}
						@media screen and (max-width:900px){
							#content{
								width:100%;
							}
							.responsiveWidth{
								width:90%;
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
	}
}