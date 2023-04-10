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
			background:teal;
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
						background:lightseagreen;
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
			background:lightseagreen;
			height:80%;
			align-items:center;
			display:flex;
			flex-direction:column;
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
					//find('#contentContainer').addChild(lastOne());
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
					callback(JSON.parse(data));
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
		parentad:'null',
		email:inputs[0].value,
		username:inputs[1].value,
		password:inputs[2].value,
		name:inputs[3].value,
		age:inputs[4].value,
		birthdate:inputs[5].value,
		birthplace:inputs[6].value,
		motto:inputs[7].value,
		message:inputs[8].value,
		hobbies:inputs[9].value,
		dreams:inputs[10].value,
		profile:find('#previewProfile').Buffer
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
				margin-top:10px;
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
						background:white;
						border-radius:50%;
					"
					>
						<img src=/profilepics?fn=${data.profile}
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
				float:left;
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
						border-radius:50%;
					"
					>
						<img src=${data.profile}
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
						<span>${data.email}</span>
					</div>
					<div class=bigfont>
						<span>@${data.username}</span>
					</div>
					<div class=normalfont>
						<span>${data.motto||'notquote'}</span>
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
			margin-top:10px;
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
				background:teal;
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
				this.parentNode.parentNode.find('#contentContainer').show('inline-block');
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
				background:teal;
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
				background:teal;
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
				background:teal;
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
				background:teal;
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
	let oldChilds = oldparent.children;
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
			overflow:auto;
		`,
		onadded(){
			const parent = this;
			el.style.width = '100%';
			el.querySelector('div').style.width = '100%';
			el.querySelector('div').style.height = '100%';
			el.querySelector('div').style.background = 'none';
			el.querySelector('div').style.flexDirection = 'column';
			el.querySelector('img').style.width = 'auto';
			el.querySelector('img').style.maxWidth = '90%';
			el.querySelector('img').style.height = 'auto';
			el.querySelector('img').style.position = 'static';
			el.querySelector('#label').style.position = 'static';
			el.onclick = function(){
				el.onclick = function(){
					fullScreenPhoto(this,this.parentElement);
				}
				el.style.width = 'auto';
				el.querySelector('div').style.width = '250px';
				el.querySelector('div').style.height = '250px';
				el.querySelector('div').style.background = 'white';
				el.querySelector('div').style.flexDirection = 'column';
				el.querySelector('img').style.width = '250px';
				el.querySelector('img').style.position = 'absolute'
				el.querySelector('img').style.maxWidth = '100%';
				el.querySelector('img').style.height = '250px';
				el.querySelector('#label').style.position = 'absolute';
				find('#lastOne').id = '';
				el.querySelector('div').id = 'lastOne';
				oldparent.appendChild(el);
				parent.remove();
			}
			this.appendChild(el);
		}
	}))
}

const loadphotos = function(data){
	const el = find('#photosItem');
	//handling 0 data.
	if(data.length==0){
		el.innerHTML = `
			<div
			style="
				background:white;
				padding:10px;
				margin-top:10px;
			"
			>No photos from this user.</div>
		`;
		return;
	}
	data.forEach((item,i)=>{
		el.innerHTML += `
			<div
			onclick=fullScreenPhoto(this,this.parentElement)
			style="
				margin:0 5px;
				cursor:pointer;
			"
			class=galerycard
			>
				<div
				style="
					width:250px;
					height:250px;
					position:relative;
					background:white;
					display:flex;
					justify-content:center;
					align-items:center;
					max-height:95%;
					margin-top:10px;
				"
				id=${(i===data.length-1)?'lastOne':''}
				>
					<img src=${item.data}
					style="
						width:250px;
						height:250px;
						object-fit:cover;
						position:absolute;
						background:white;
					"
					>
					<div
					style="
						padding:2.5%;
						text-align:left;
						position:absolute;
						background:white;
						width:95%;
					"
					id=label
					>
						<div class=bigfont>${item.caption}</div>
						<div>${item.date}</div>
					</div>
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
							background:white;
							padding:10px;
							display:inline-block;
							border-radius:50%;
							margin-top:10px;
						"
						>
							<img src=${data.profile}
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
						background:white;
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
					flex-wrap:wrap;
					width:100%;
					justify-content:center;
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
const boxBioProcess = function(data){
	let text = ``;
	for(field in data){
		if(field!='galery'){text += pieceOfBioBox(field,data['galery'].length)};
		if(field!='profile'){console.log(data[field]);text += pieceOfBioBox(field,data[field])};
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
			justify-content:space-around;
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
						hao0 app
					</span>
				`,
				style:`
					font-size:11px;
					display:flex;
					flex-direction:column;
					justify-content:space-around;
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
					<span style=cursor:pointer;font-size:20px;height:40px;display:flex;width:40px;align-items:center;justify-content:center;border-radius:50%;>
						<img src=/file?fn=user.png
						style="
							width:32px;
							height:32px;
							border-radius:50%;
						"
						id=userprofile
						>
					</span>
					<span id=logout style=margin-left:5px;cursor:pointer;font-size:20px;height:40px;display:none;width:40px;align-items:center;justify-content:center;border-radius:50%;>
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
			const eltoremove = this;
			const userId = this.user_id;
			const date = getTime();
			const fileName = `${this.user_id+date}.${files[0].type.split('/')[1]}`;
			//read that file, i will get the dataurl.
			const fs = new FileReader();
			fs.onload = function(){
				cOn.post({
					url:'/updateData',
					someSettings:[
						['setRequestHeader','content-type','application/json']
					],
					data:JSON.stringify({
						mode:'newphoto',
						caption,
						date:new Date().toLocaleString(),
						id:userId,
						fname:fileName,
						data:this.result
					}),
					onload(r){
						if(JSON.parse(r.target.responseText).valid){
							eltoremove.remove();
							find('#categoryElement #photos').click();
						}
					}
				})
			}
			fs.readAsDataURL(files[0]);
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
			overflow:auto;
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
						position:sticky;
						top:0;
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
							<input type=date>
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
						text-align:right;
					"
					>
						<div>Pilih Profile</div>
						<div>
							<button class=button id=cprofile>Pilih</button>
							<input type=file style=display:none; accept='image/*'>
						</div>
					</div>
					<div>
						<div
						style=text-align:center;
						>
							<img id=previewProfile
							style="
								max-width:150px;
								max-height:150px;
								object-fit:cover;
								display:none;
								margin-top:5px;
							"
							>
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
					this.handlepagebuttons(button.id,button);
				}
			})
		},
		handlepagebuttons(id,self){
			const parent = this;
			const events = {
				cprofile(){
					self.parentNode.querySelector('input').onchange = function(){
						const fs = new FileReader();
						fs.onload = function(){
							find('#previewProfile').Buffer = this.result;
							find('#previewProfile').src = this.result;
							showElement(find('#previewProfile'),'inline-block');
						}
						fs.readAsDataURL(this.files[0]);
					}
					self.parentNode.querySelector('input').click();
				},
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
					profileimg.src = r.profile;
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