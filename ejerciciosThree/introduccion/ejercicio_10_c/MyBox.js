class MyBox extends THREE.Object3D {
	constructor(gui,titleGui) {
		super();	
	
		this.createGUI(gui,titleGui);
		
		var geomCilindro = new THREE.CylinderGeometry(10, 10, 10, 32);
		this.cilindro = new THREE.Mesh (geomCilindro, new THREE.MeshNormalMaterial({opacity:0.35,transparent:true}));
		this.cilindro.position.y = 5;
		this.add(this.cilindro);

		var geomBola = new THREE.SphereGeometry(1, 32, 32);
		geomBola.translate(10, 5, 0);
		this.bola = new THREE.Mesh(geomBola, new THREE.MeshPhongMaterial({color: 0xff0000})); 

		this.nodoGirador = new THREE.Object3D();
		this.nodoGirador.add(this.bola);
		this.nodoEmpujador = new THREE.Object3D();
		this.nodoEmpujador.add(this.nodoGirador);
		this.add(this.nodoEmpujador);
		
		this.tiempoInicial = Date.now();
	}

	createGUI (gui,titleGui) {
		//Controles
		this.guiControls = new function () {
			this.aumento = 0.0;
  		}

		var folder = gui.addFolder ("Cilindro");
		folder.add (this.guiControls, 'aumento', 0.0, 30.0, 0.1).name ('Aumento Radio').listen();
	}
	  
	update () {

		var tiempoParcial = Date.now();
		var tiempoTranscurrido = (tiempoParcial - this.tiempoInicial) / 1000;

		this.nodoGirador.rotation.y += tiempoTranscurrido * 6.28319 / 4; 

		//this.cilindro.geometry = new THREE.CylinderGeometry(10, 10, 10, 32);
		this.cilindro.scale.setX((this.guiControls.aumento + 10) / 10);

		this.nodoEmpujador.position.x = Math.cos (this.nodoGirador.rotation.y) * this.guiControls.aumento;

		this.tiempoInicial = tiempoParcial;
		}
	}