class MyBox extends THREE.Object3D {
	constructor(gui,titleGui) {
		super();	
	
		this.createGUI(gui,titleGui);
		
		var geomCilindro = new THREE.CylinderGeometry(10, 10, 30, 32);
		this.cilindro = new THREE.Mesh (geomCilindro, new THREE.MeshNormalMaterial({opacity:0.35,transparent:true}));
		this.cilindro.position.y = 15;
		this.add(this.cilindro);

		var geomBola = new THREE.SphereGeometry(1, 32, 32);
		this.bola = new THREE.Mesh(geomBola, new THREE.MeshPhongMaterial({color: 0xff0000})); 

		//this.add(this.bola);
		this.nodo = new THREE.Object3D();
		this.nodo.add(this.bola);
		this.add(this.nodo);

		this.tiempoInicial = Date.now();
		this.subiendo = true;

	}

	createGUI (gui,titleGui) {
		//Controles
		this.guiControls = new function () {
			this.radio = 15.0;
  		}

		var folder = gui.addFolder ("Cilindro");
		folder.add (this.guiControls, 'radio', 5.0, 30.0, 0.1).name ('Radio').listen();
	}
	  
	update () {
		// Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
		// Primero, el escalado
		// Segundo, la rotación en Z
		// Después, la rotación en Y
		// Luego, la rotación en X
		// Y por último la traslación

		var tiempoParcial = Date.now();
		var tiempoTranscurrido = (tiempoParcial - this.tiempoInicial) / 1000;

		console.log(tiempoTranscurrido);
		this.nodo.rotation.y += tiempoTranscurrido * 6.28319 / 4; 

		if (this.nodo.position.y >= this.cilindro.position.y * 2){
			this.subiendo = false;
		}else if (this.nodo.position.y <= 0){
			this.subiendo = true;
		}

		if (this.subiendo){
			this.nodo.position.y += 0.04;
		}else this.nodo.position.y -= 0.04;


		this.cilindro.geometry = new THREE.CylinderGeometry(this.guiControls.radio, this.guiControls.radio, 30, 32);
		this.bola.position.x = this.guiControls.radio;

		this.tiempoInicial = tiempoParcial;

		//this.bola.rotation.y += tiempoTranscurrido * 6,28319;

		}
	}