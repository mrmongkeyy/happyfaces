const footer = function(){
	return makeElement('footer',{
		style:`
			background:white;
			height:10%;
			align-items:center;
			display:flex;
			font-size:11px;
			font-weight:bold;
		`,
		className:'footerSetting',
		onadded(){
			const leftside = makeElement('div',{
				className:'footerItems',
				innerHTML:`
					<img src=/file?fn=human.png
					style="
						width:16px;
						height:16px;
						margin-bottom:2px;
					"
					>
					<span>Siswa</span>
				`,
				style:`
					cursor:pointer;
					display:flex;
					flex-direction:column;
					justify-content:center;
					align-items:center;
					width:32px;
					height:32px;
					border-radius:50%;
					padding:5px;
					background:white;
					
				`,
			});
			const rightside = makeElement('div',{
				className:'footerItems',
				innerHTML:`
					<img src=/file?fn=group.png
					style="
						width:24px;
						height:24px;
					"
					>
					<span>Kelas</span>
				`,
				style:`
					cursor:pointer;
					display:flex;
					flex-direction:column;
					justify-content:center;
					align-items:center;
					width:32px;
					height:32px;
					border-radius:50%;
					padding:5px;
					background:white;

				`,
			});
			this.addChild(leftside);
			this.addChild(rightside);
		}
	});
}
const finder = function(){
	return makeElement('div',{
		style:`
			background:lightseagreen;
			height:50px;
			display:flex;
			justify-content:space-around;
			align-items:center;
		`,
		id:'finder',
		innerHTML:`
			<div>
				<span>
					<input
					style="
						padding:10px;
						border:none;
						outline:none;
					" placeholder="Telusuri..."
					>
				</span>
				<span>
					<button
					style="
						padding:10px;
						border:none;
						outline:none;
						background:lightsalmon;
						color:white;
						cursor:pointer;
					"
					>Cari</button>
				</span>
			</div>
		`,
	})
}
const content = function(){
	return makeElement('content',{
		style:`
			background:beige;
			height:80%;
			align-items:center;
			display:flex;
			flex-direction:column;
			padding:5px 0;
			justify-content:flex-start;
			overflow:auto;
		`,
		id:'content',
		onadded(){
			this.addChild(contentContainer());
			this.addChild(profilePage());
			this.addChild(loadUsersData());
			this.addChild(loginPanel());
		}
	});
}

const loadUsersData = function(){
	return makeElement('div',{
		style:`
			position:absolute;
			top:0;
			left:0;
			width:100%;
			background:RGB(0,0,0,0.5);
			height:100%;
			display:flex;
			justify-content:center;
			align-items:center;
		`,
		innerHTML:`
			<div
			style="
				padding:20px;
				background:white;
			"
			>
				Sedang memuat data.
			</div>
		`,
		onadded(){
			cOn.get({
				el:this,
				url:'/getuserlist',
				onload(r){
					const data = r.target.responseText;
					JSON.parse(data).forEach(data=>{
						find('#contentContainer').addChild(contentItem(data));
					})
					find('#contentContainer').addChild(lastOne());
					this.el.remove();
				}
			})
		}
	})
}

const load = function(onadded){
	return makeElement('div',{
		style:`
			position:absolute;
			top:0;
			left:0;
			width:100%;
			background:RGB(0,0,0,0.5);
			height:100%;
			display:flex;
			justify-content:center;
			align-items:center;
		`,
		innerHTML:`
			<div
			style="
				padding:20px;
				background:white;
			"
			>
				Sedang memuat data.
			</div>
		`,
		onadded
	})
}

const loadUserDetails = function(userid,callback){
	return makeElement('div',{
		style:`
			position:absolute;
			top:0;
			left:0;
			width:100%;
			background:RGB(0,0,0,0.5);
			height:100%;
			display:flex;
			justify-content:center;
			align-items:center;
		`,
		innerHTML:`
			<div
			style="
				padding:20px;
				background:white;
			"
			>
				Sedang memuat data.
			</div>
		`,
		onadded(){
			cOn.get({
				el:this,
				url:`/getuserdetail?id=${userid}`,
				onload(r){
					const data = r.target.responseText;
					callback(data);
					this.el.remove();
				}
			})
		}
	})
}
const loginprocess = function(inputs){
	const data = JSON.stringify({
		username:inputs[0].value,
		password:inputs[1].value
	});
	cOn.post({
		url:'/login',
		someSettings:[
			['setRequestHeader','content-type','application/json']
		],
		data,
		onload(r){
			processresponse(r,'login');
		}
	})
}
const regisprocess = function(inputs){
	const data = JSON.stringify({
		email:inputs[0].value,
		username:inputs[1].value,
		password:inputs[2].value,
		name:inputs[3].value,
		old:inputs[4].value,
		birthdate:inputs[5].value,
		birthplace:inputs[6].value,
		moto:inputs[7].value,
		msg:inputs[8].value,
		hobbies:inputs[9].value,
		dreams:inputs[10].value,
		picture:'user.png'
	});
	find('content').addChild(makeElement('div',{
		style:`
			background:RGB(0,0,0,0.5);
			position:absolute;
			top:0;
			left:0;
			width:100%;
			height:100%;
			display:flex;
			justify-content:center;
			align-items:center;
		`,
		innerHTML:`
			<div
			style="
				background:white;
				padding:10px;
			"
			>
				Memproses pendaftaran.
			</div>
		`,
		onadded(){
			const el = this;
			cOn.post({
				url:'/regis',
				someSettings:[
					['setRequestHeader','content-type','application/json']
				],
				data,
				onload(r){
					el.remove();
					if(JSON.parse(r.target.responseText).goVerify){
						find('#gologin').click();
						find('#requestpanel').innerHTML = 'Check Your Email Box,<br>To Verify Your Account';
					}
				}
			})
		}
	}))
	
}
const contentItem = function(data,classes=false){
	let div;
	if(classes){
		div = makeElement('div',{
			dataid:data.id,
			style:`
				cursor:pointer;
				min-height:90px;
				background:white;
				margin-bottom:10px;
				display:flex;
				justify-content:space-around;
				align-items:center;
				padding:10px;
			`,
			className:'responsiveWidth',
			innerHTML:`
				<div>
					<span
					style="
						display:flex;
						justify-content:center;
						align-items:center;
						padding:5px;
						background:beige;
						border-radius:50%;
					"
					>
						<img src=/profilepics?fn=${data.picture}
						style="
							width:64px;
							height:64px;
							border-radius:50%;
						"
						>
					</span>
				</div>
				<div
				style="
					width:66%;
					margin:0 2%;
				"
				>
					<div class=smallfont>
						<span>@${data.username}</span>
					</div>
					<div class=bigfont>
						<span>${data.name}</span>
					</div>
					<div class=normalfont>
						<span>${data.quote}</span>
					</div>
					<div class=smallfont>
						<span>23 poeples</span>
					</div>
				</div>
			`,
		});
	}else{
		div = makeElement('div',{
			dataid:data.id,
			style:`
				min-height:90px;
				background:white;
				margin-bottom:10px;
				display:flex;
				justify-content:space-around;
				align-items:center;
				cursor:pointer;
				padding:10px;
			`,
			className:'responsiveWidth',
			innerHTML:`
				<div
				style="
					width:30%;
					display:flex;
					justify-content:center;
				"
				>
					<span
					style="
						display:flex;
						justify-content:center;
						align-items:center;
						padding:5px;
						background:beige;
						border-radius:50%;
					"
					>
						<img src=/profilepics?fn=${data.picture}
						style="
							width:64px;
							height:64px;
							border-radius:50%;
						"
						>
					</span>
				</div>
				<div
				style="
					width:66%;
					margin:0 2%;
				"
				>
					<div class=smallfont>
						<span>@${data.username}</span>
					</div>
					<div class=bigfont>
						<span>${data.name}</span>
					</div>
					<div class=normalfont>
						<span>${data.quote}</span>
					</div>
				</div>
			`,
		})
	}
	div.classes = classes;
	div.onclick = function(){
		notSignedUserHandle(this);
		openprofilepage(this.dataid);
	}
	return div;
}
const openprofilepage = function(userid){
	find('#contentContainer').style.display = 'none';
	find('#profilePage').show('flex');
	find('#profilePage').dataid = userid;
	find('content').addChild(loadUserDetails(userid,profileHandleCategory));
}
const contentContainer = function(){
	return makeElement('div',{
		style:`
			width:100%;
			height:100%;
			display:flex;
			flex-direction:column;
			justify-content:flex-start;
			align-items:center;
		`,
		id:'contentContainer'
	})
}
const profilePage = function(){
	return makeElement('div',{
		style:`
			width:100%;
			height:100%;
			display:none;
			background:lightseagreen;
			flex-direction:column;
		`,
		id:'profilePage',
		onadded(){
			this.addChild(backSection());
			this.addChild(category());
			this.addChild(thingsProfile());
		}
	})
}
const thingsProfile = function(){
	return makeElement('div',{
		id:'thingsProfile',
		style:`
			width:100%;
			height:100%;
			overflow:auto;
			display:flex;
			flex-direction:column;
			justify-content:flex-start;
			align-items:center;
		`,
	})
}
const backSection = function(){
	return makeElement('div',{
		style:`
			padding:10px;
			color:white;
			height:35px;
		`,
		innerHTML:`
			<div
			style="
				padding:10px;
				float:left;
				background:lightsalmon;
				cursor:pointer;
			"
			>
				KEMBALI
			</div>
		`,
		onadded(){
			this.find('div').onclick = ()=>{
				this.parentNode.find('#thingsProfile').innerHTML = '';
				this.parentNode.hide();
				this.parentNode.parentNode.find('#contentContainer').show('flex');
			}
		}
	})
}
const category = function(){
	return makeElement('div',{
		id:'categoryElement',
		style:`
			background:lightskyblue;
			color:white;
			text-align:center;
			display:flex;
			justify-content:center;
			padding:10px 0;
		`,
		innerHTML:`
			<div
			style="
				padding:10px;
				float:left;
				background:lightsalmon;
				cursor:pointer;
			"
			id=bio
			>
				BIO
			</div>
			<div
			id=photos
			style="
				padding:10px;
				float:left;
				background:lightsalmon;
				cursor:pointer;
				margin:0 5px;
			"
			>
				GALERY
			</div>
			<div
			id=editBio
			style="
				padding:10px;
				float:left;
				background:lightsalmon;
				cursor:pointer;
				margin:0 5px;
			"
			>
				EDIT BIO
			</div>
			<div
			id=uploadPhoto
			style="
				padding:10px;
				float:left;
				background:lightsalmon;
				cursor:pointer;
			"
			>
				UPLOAD FOTO
			</div>
		`,
		onadded(){
			//handling not signin users.
			this.findall('div').forEach(div=>{
				div.onclick = function(){
					profileHandleCategory(null,this.id);
				}
			});
		}
	})
}
const notSignedUserHandle = function(el){
	const parent = find('#categoryElement');
	if(!find('header').data_id || find('header').data_id !== el.dataid){
		hideElement(parent.find('#editBio'));
		hideElement(parent.find('#uploadPhoto'));
		return true;
	}
	showElement(parent.find('#editBio'),'inline-block');
	showElement(parent.find('#uploadPhoto'),'inline-block');
}

const fullScreenPhoto = function(el,oldparent){
	find('content').addChild(makeElement('div',{
		style:`
			position:absolute;
			top:0;
			left:0;
			width:100%;
			height:100%;
			background:RGB(0,0,0,.5);
			display:flex;
			justify-content:center;
			align-items:center;
		`,
		onadded(){
			const parent = this;
			el.style.width = '100%';
			el.onclick = function(){
				el.style.width = '60%';
				el.onclick = function(){
					fullScreenPhoto(this,this.parentElement);
				}
				oldparent.appendChild(el);
				parent.remove();
			}
			this.appendChild(el);
		}
	}))
}

const loadphotos = function(data){
	const el = find('#photosItem');
	data.forEach(item=>{
		el.innerHTML += `
			<div
			onclick=fullScreenPhoto(this,this.parentElement)
			style="
				margin:10px;
				background:white;
				width:60%;
				cursor:pointer;
				padding:20px;
			"
			class=galerycard
			>
				<div
				style="
					text-align:center;
				"
				>
					<img src=/photos?fn=${item.fn}
					style="
						max-width:100%;
						height:auto;
					"
					>
				</div>
				<div>
					<div class=bigfont>${item.caption}</div>
					<div>${item.date}</div>
				</div>
			</div>
		`
	})
}
const profileHandleCategory = function(data,p='bio'){
	const event = {
		el:find('#thingsProfile'),
		bio(){
			this.sweep();
			if(!data){
				data = find('#profilePage').biodata;
			}
			this.el.addChild(makeElement('div',{
				id:'bioItems',
				style:`
					display:flex;
					justify-content:flex-start;
					flex-direction:column;
					align-items:center;
					width:100%;
				`,
				innerHTML:`
					<div>
						<span
						style="
							min-width:128px;
							min-height:128px;
							width:auto;
							height:auto;
							background:beige;
							padding:5px;
							display:inline-block;
							border-radius:50%;
							margin-top:10px;
						"
						>
							<img src=/profilepics?fn=${JSON.parse(data).picture}
							style="
								max-width:128px;
								max-height:128px;
								border-radius:50%;
							"	
							>
						</span>
					</div>
					<div
					style="
						min-width:70%;
						background:beige;
						min-height:100px;
						margin-top:10px;
						border-radius:10px;
						font-size:14px;
						margin-bottom:20px;
					"
					>
						${boxBioProcess(data)}
					</div>
					
				`,
				onadded(){
					find('#profilePage').biodata = data;
				}
			}))
		},
		photos(){
			this.sweep();
			this.el.addChild(makeElement('div',{
				id:'photosItem',
				style:`
					display:flex;
					flex-direction:column;
					width:100%;
					justify-content:center;
					align-items:center;
				`,
				onadded(){
					this.addChild(load(function(){
						cOn.get({
							el:this,
							url:`/loadphotos?id=${find('#profilePage').dataid}`,
							onload(r){
								this.el.remove();
								loadphotos(JSON.parse(r.target.responseText));
							}
						})
					}))
				}
			}))
		},
		editBio(){
			this.sweep();
			this.el.addChild(makeElement('div'),{
				id:'#bioEdit',
				innerHTML:`

				`
			})
		},
		uploadPhoto(){
			this.sweep();
			const display = (r)=>{
				this.el.addChild(makeElement('div',{
					id:'uploadPhoto',
					style:`
						width:90%;
						background:beige;
						display:flex;
						flex-direction:column;
						padding:10px 0;
						justify-content:center;
						align-items:center;
					`,
					innerHTML:`
						<div
						>
							<span
							style="
								display:inline-block;
								text-align:center;
							"
							>
								<img src=${r}
								style="
									max-width:90%;
									max-height:90%;
								"
								>
							</span>
						</div>
						<div
						style="
							width:100%;
						"
						>
							<span
							style="
								display:flex;
								width:96%;
								padding:2%;
								justify-content:space-between;
								flex-direction:column;
							"
							>
								<textarea placeholder=TULIS_SESUATU
								style="
									display:inline-block;
									outline:none;
									background:white;
									border:none;
									padding:10px;
									margin-bottom:10px;
								"
								spellcheck=false
								></textarea>
								<button
								style="
									background:lightsalmon;
									border:none;
									color:white;
									padding:10px;
									cursor:pointer;
								"
								>UPLOAD</button>
							</span>
						</div>
						
					`,
					onadded(){
						this.find('button').onclick = ()=>{
							uploadSectionStarted(fileInput.files,this.find('textarea').value);
						}
					}
				}))
			}
			const fileInput = makeElement('input',{
				type:'file',
				accept:'image/*',
				onchange(){
					readFile(this.files[0],'readAsDataURL',display);
				}
			})
			fileInput.click();
			console.log(fileInput);
		},
		sweep(){
			this.el.saveRemove('#photosItem');
			this.el.saveRemove('#bioItems');
			this.el.saveRemove('#bioEdit');
			this.el.saveRemove('#uploadPhoto');
		}
	}
	event[p]();
}
const boxBioProcess = function(data='{}'){
	let text = ``;
	data = JSON.parse(data);
	for(field in data){
		if(field!='picture')text += pieceOfBioBox(field,data[field]);
	}
	return text;
}
const pieceOfBioBox = function(field,value){
	return `
	<div
	style="
		width:92%;
		padding:4%;
		display:flex;
		justify-content:space-between;
	"
	>
		<div
		style="
			text-align:left;
		">
			<span>${field}</span>
		</div>
		<div
		style="
			text-align:right;
		"
		>
			<span>${value}</span>
		</div>
	</div>
	`
}
const header = function(){
	return makeElement('header',{
		style:`
			background:white;
			height:12%;
			align-items:center;
			display:flex;
		`,
		onadded(){
			const parent = this;
			const title = makeElement('div',{
				innerHTML:`
					<img src=/file?fn=happy-face.png
					style="
						width:32px;
						height:32px;
					"
					>
					<span style=cursor:pointer;>
						happyfaces
					</span>
				`,
				style:`
					font-size:11px;
					display:flex;
					flex-direction:column;
					justify-content:center;
					align-items:center;
				`
			});
			const login = makeElement('div',{
				style:`
					display:flex;
					justify-content:center;
					align-items:center;
				`,
				innerHTML:`
					<span style=cursor:pointer;font-size:20px;height:40px;display:flex;width:40px;align-items:center;justify-content:center;background:beige;border-radius:50%;>
						<img src=/file?fn=user.png
						style="
							width:32px;
							height:32px;
							border-radius:50%;
						"
						id=userprofile
						>
					</span>
					<span id=logout style=margin-left:5px;cursor:pointer;font-size:20px;height:40px;display:none;width:40px;align-items:center;justify-content:center;background:beige;border-radius:50%;>
						<img src=/file?fn=goout.png
						style="
							width:32px;
							height:32px;
							border-radius:50%;
						"
						>
					</span>
				`,
				onadded(){
					this.findall('span').forEach((span,i)=>{
						span.onclick = function(){
							if(i==0){
								if(!parent.data_id){
									find('content').addChild(loginPanel());
								}else openprofilepage(parent.data_id);
							}else location.reload();
						}
					})
					
				},
			})
			this.addChild(title);
			this.addChild(login);
		}
	});
}
const lastOne = function(){
	return makeElement('div',{
		style:`
			width:100%;
			text-align:center;
			padding-bottom:10px;
		`,
		innerHTML:`
			Tidak ada lagi...
		`
	})
}
const uploadSectionStarted = function(files,caption){
	//files, mean that is posiible for me update the code, and make new feature.
	find('main').addChild(makeElement('div',{
		style:`
			position:absolute;
			top:0;
			left:0;
			width:100%;
			height:100%;
			background:RGB(0,0,0,0.5);
			display:flex;
			justify-content:center;
			align-items:center;
		`,
		user_id:find('header').data_id,
		innerHTML:`
			<div
			style="
				background:white;
				padding:20px;
			"
			id=uploadingparent
			>
				<div
				style="
					margin-bottom:10px;
				"
				>
					<span>Mengupload file.</spa>
				</div>
				<div id=loadingdiv
				style="
					display:flex;
					justify-content:space-around;
				"
				>
					0%
				</div>
			</div>
		`,
		onadded(){
			const date = getTime();
			const fileName = `${this.user_id+date}.${files[0].type.split('/')[1]}`;
			uploadFile(files[0],1000,(r)=>{
				const progress = Math.floor((r/files[0].size)*100);
				this.find('#loadingdiv').innerHTML = progress+'%';
			},(r)=>{
				//file's uploaded. time to update the data.

				cOn.post({
					url:'/updateData',
					someSettings:[
						['setRequestHeader','content-type','application/json']
					],
					data:JSON.stringify({
						mode:'afterUpload',
						caption,
						date:new Date().toLocaleString(),
						id:this.user_id,
						fname:fileName
					}),
					onload(r){
						find('#categoryElement #photos').click();
					}
				})



				this.find('#uploadingparent').innerHTML = 'file uploaded.';
				setTimeout(()=>{
					this.remove();
				},1000);
			},{
				fname:fileName,
				caption
			})
		}
	}))
}
const loginPanel = function(){
	return makeElement('div',{
		id:'loginpanel',
		style:`
			background:RGB(0,0,0,0.5);
			position:absolute;
			top:0;
			left:0;
			width:100%;
			height:100%;
			display:flex;
			justify-content:center;
			align-items:flex-start;
		`,
		innerHTML:`
			<div
			style="
				background:lightseagreen;
				padding:20px;
			"
			>
				<div id=loginmode
				style="
				"
				>
					<div
					style="
						text-align:right;
					"
					>
						<span>LOGIN MODE</span>
					</div>
					<div>
						<div>Username</div>
						<div>
							<input>
						</div>
					</div>
					<div>
						<div>Password</div>
						<div>
							<input>
						</div>
						<div
						style="
							text-align:right;
						"
						>
							<span
							style="
								cursor:pointer;
							"
							id=passforgot class=button
							>lupa password.</span>
						</div>
					</div>
					<div>
						<button id=login class=button>Masuk</button>
					</div>
					<div
					style="
						text-align:right;
					"
					>
						<span
						style="
							cursor:pointer;
						"
						id=goregismode class=button
						>Buat akun</span>
					</div>
				</div>
				<div id=signinmode
				style="
					display:none;
				"
				>
					<div
					style="
						text-align:right;
					"
					>
						<span>SIGNIN MODE</span>
					</div>
					<div>
						<div>Email</div>
						<div>
							<input>
						</div>
					</div>
					<div>
						<div>Username</div>
						<div>
							<input>
						</div>
					</div>
					<div>
						<div>Password</div>
						<div>
							<input>
						</div>
					</div>
					<div>
						<div>Name</div>
						<div>
							<input>
						</div>
					</div>
					<div>
						<div>Old</div>
						<div>
							<input>
						</div>
					</div>
					<div>
						<div>Birthdate</div>
						<div>
							<input>
						</div>
					</div>
					<div>
						<div>Birthplace</div>
						<div>
							<input>
						</div>
					</div>
					<div>
						<div>Life Motto</div>
						<div>
							<input>
						</div>
					</div>
					<div>
						<div>Life Message</div>
						<div>
							<input>
						</div>
					</div>
					<div>
						<div>Hobbies</div>
						<div>
							<input>
						</div>
					</div>
					<div>
						<div>Dreams</div>
						<div>
							<input>
						</div>
					</div>
					<div
					style="
						margin-top:10px;
					"
					>
						<button id=register class=button>Daftar</button>
					</div>
					<div
					style="
						text-align:right;
					"
					>
						<span
						style="
							cursor:pointer;
						"
						id=gologin class=button
						>Punya akun</span>
					</div>
				</div>
				<div id=resetpassmode
				style="
					display:none;
				"
				>
					<div
					style="
						text-align:right;
					"
					>
						<span>RESET PASS MODE</span>
					</div>
					<div>
						<div>Email</div>
						<div>
							<input>
						</div>
					</div>
					<div
					style="
						margin-top:10px;
					"
					>
						<button id=resetpass class=button>Reset</button>
					</div>
					<div
					style="
						margin-top:10px;
					"
					>
						<span id=backtologin class=button
						style="
							cursor:pointer;
						"
						>back to login</span>
					</div>
				</div>
				<div
				style="
					margin-top:10px;
				"
				>
					<span
					style="
						cursor:pointer;
					"
					id="close" class=button
					>Tutup</span>
				</div>
				<div
				style="
					margin-top:10px;
				"
				>
					<span
					style="
						cursor:pointer;
						color:red;
						background:white;
						display:inline-block;
					"
					id="requestpanel"
					></span>
				</div>
			</div>
		`,
		state:'#loginmode',
		onadded(){
			this.findall('.button').forEach(button=>{
				button.onclick = ()=>{
					this.handlepagebuttons(button.id);
				}
			})
		},
		handlepagebuttons(id){
			const parent = this;
			const events = {
				passforgot(){
					this.go('#resetpassmode')
				},
				goregismode(){
					this.go('#signinmode')
				},
				login(){
					const inputs = parent.findall('#loginmode input');
					loginprocess(inputs);

				},
				close(){
					parent.remove();
				},
				backtologin(){
					this.go('#loginmode');
				},
				gologin(){
					this.go('#loginmode');
				},
				resetpass(){

				},
				register(){
					const inputs = parent.findall('#signinmode input');
					regisprocess(inputs);
				},
				go(id){
					showElement(parent.find(id),'inline-block');
					hideElement(parent.find(parent.state));
					parent.state = id;
				}
			}
			events[id]();
		}
	})
}
const processresponse = function(res,id){
	const callback = {
		res:JSON.parse(res.target.responseText),
		login(){
			if(this.res.success){
				find('header').data_id = this.res.id;
				find('#loginpanel').remove();
				find('content').addChild(loadUserDetails(this.res.id,function(r){
					const profileimg = find('#userprofile');
					profileimg.src = `/profilepics?fn=${JSON.parse(r).picture}`;
					profileimg.onload = function(){
						showElement(find('#logout'));
						notSignedUserHandle(find('#profilePage'));
					}
				}))
			}else{
				find('#requestpanel').innerHTML = this.res.msg;		
			}
		}
	}
	callback[id]();
}