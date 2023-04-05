document.body.onload = function(){
	document.body.style.margin = '0';
	const main = makeElement('main',{
		style:`
			display:flex;
			width:100%;
			height:100%;
			background:teal;
			position:absolute;
			flex-direction:column;
			font-family:monospace;
			align-items:center;
		`,
		onadded(){
			this.addChild(header());
			this.addChild(finder());
			this.addChild(content());
			this.addChild(footer());
		}
	})
	document.body.addChild(main);
}
