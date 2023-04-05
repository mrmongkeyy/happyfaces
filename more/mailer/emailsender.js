const nodemailer = require('nodemailer');
const fs = require('fs');
let mailTransporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'mrmongkeyy@gmail.com',
		pass: 'qhsbzyqxrdlqdgpk'
	}
});
module.exports = function(data,onfine,onerror){
	const uniquepath = require('../unique.js')();
	let mailDetails = {
		from:'happyfaces.cyclic.app',
		to:data.email,
		subject:'HappyfaceVerification',
		text:'Just verify your email address!',
		html:`
			<div
			style="
				background:lightseagreen;
				width:100%;
			"
			>
				<div
				style="
					background:white;
					width:50%;
					margin:5% 15%;
					padding:5%;
				"
				>
					<h1>Email Verification.</h1>
					<div>
						Helloworld ${data.username}, welcome to <span style=font-weight:bold>happyfaces</span>.
						<br>Please confirm your registering account by clicking on 
						bottom bellow!
					</div>
					<div
					style="
						padding:10px;
						background:lightseagreen;
						color:white;
						cursor:pointer;
						margin-top:10px;
						width:auto;
						text-align:center;
					"
					><a style="
						color:white;
						text-decoration:none;
					"
					href=${data.origin}/verify?id=${data.email}&&validCode=${uniquepath}>Verify My Account</a></div>
				</div>
			</div>
		`
	};
	mailTransporter.sendMail(mailDetails, function(err, data) {
		if(err) {
			console.log(err);
			onerror();
		}else {
			onfine(uniquepath);
		}
	});
}

