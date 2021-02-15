class MyBox extends THREE.Object3D {
	constructor(gui,titleGui) {
		super();	
	
		this.createGUI(gui,titleGui);
		
		//Bolas Verdes
		var vectorGeom = [];
		var vectorMesh = [];
		var geomVerdes = new THREE.SphereGeometry(1.5, 32, 32);
		geomVerdes.translate(30, 0, 0);

		for (var i = 0; i < 12; i++){
			vectorGeom[i] = geomVerdes.clone();
			geomVerdes.rotateY(Math.PI/6);

			vectorMesh[i] = new THREE.Mesh(vectorGeom[i], new THREE.MeshPhongMaterial({color:0x11e71e}));
			this.add(vectorMesh[i]);
		}
		//Bola Roja
		var geomRoja = new THREE.SphereGeometry(1.5, 32, 32);
		geomRoja.translate(27, 0, 0);
		this.bolaRoja = new THREE.Mesh(geomRoja, new THREE.MeshPhongMaterial({color:0xff0000}));
		this.add(this.bolaRoja);

		this.angulo = 0.0;
		this.tiempoInicial = Date.now();
		this.vel = 0.523599167;
	}

	createGUI (gui,titleGui) {
		this.guiControls = new function(){
			this.velocidad = 1.0;
		}
		var folder = gui.addFolder ("Velocidad");
		folder.add (this.guiControls, 'velocidad', -12.0, 12.0, 0.1).name ('Velocidad').listen();
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
		//console.log(this.guiControls.velocidad);
		if (this.guiControls.velocidad != 0){
			this.bolaRoja.rotation.y += tiempoTranscurrido * this.guiControls.velocidad * this.vel;
		}
		this.tiempoInicial = tiempoParcial;
		}
	}