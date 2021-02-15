class MyBox extends THREE.Object3D {
	constructor(gui,titleGui) {
		super();	
	
		this.createGUI(gui,titleGui);

		var geomTierra = new THREE.SphereGeometry(2, 32, 32);
		var textTierra = new THREE.TextureLoader().load( "../../imgs/tierra.jpg" );
		this.tierra = new THREE.Mesh(geomTierra, new THREE.MeshPhongMaterial({map: textTierra})); 
		this.add(this.tierra);

		var geomSat = new THREE.SphereGeometry(1.5, 32, 32);
		var geomSat2 = new THREE.SphereGeometry(1.5, 32, 32);
		var geomSat3 = new THREE.SphereGeometry(1.5, 32, 32);
		geomSat2.rotateY(-Math.PI/2);
		geomSat3.rotateY(Math.PI);
		
		var textSat = new THREE.TextureLoader().load( "../../imgs/cara.jpg" );
		
		this.sat1 = new THREE.Mesh(geomSat, new THREE.MeshPhongMaterial({map: textSat}));
		this.sat2 = new THREE.Mesh(geomSat2, new THREE.MeshPhongMaterial({map: textSat}));
		this.sat3 = new THREE.Mesh(geomSat3, new THREE.MeshPhongMaterial({map: textSat}));

		this.sat1.position.x = 10;
		this.sat2.position.x = 20;
		this.sat3.position.x = 30;

		this.nodo = new THREE.Object3D();
		this.add(this.nodo);
		this.nodo.add(this.tierra, this.sat1, this.sat2, this.sat3);
		this.tiempoInicial = Date.now();
	}

	createGUI (gui,titleGui) {
		//Controles
		this.guiControls = new function () {
  		}
	}
	  
	update (x, y, z) {
		var tiempoParcial = Date.now();
		var tiempoTranscurrido = (tiempoParcial - this.tiempoInicial) / 1000;

		this.nodo.rotation.y += tiempoTranscurrido * 1;
		this.sat1.rotation.y = -Math.PI;
		this.sat2.lookAt(x, y, z);
		this.sat3.rotation.y -= tiempoTranscurrido * 2;
		this.tiempoInicial = tiempoParcial;
		}
	}