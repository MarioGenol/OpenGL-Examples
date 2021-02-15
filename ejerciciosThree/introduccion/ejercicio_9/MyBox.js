class MyBox extends THREE.Object3D {
	constructor(gui,titleGui) {
		super();	
	
		this.createGUI(gui,titleGui);
		
		//Caja Verde Geometría
		this.cajaVerdeAltura = 3;
		this.cajaVerdeAnchura = 3; 
		var geomCajaVerde = new THREE.BoxGeometry(this.cajaVerdeAnchura, this.cajaVerdeAltura);

		//Caja Roja Geometría
		this.cajaRojaAltura = 8;
		this.cajaRojaAnchura = 3; 
		var geomCajaRoja = new THREE.BoxGeometry(this.cajaRojaAnchura, this.cajaRojaAltura);

		//Caja Arriba
		this.cajaArriba = new THREE.Mesh(geomCajaVerde, new THREE.MeshPhongMaterial({color:0x11e71e}));

		//Caja Medio
		this.cajaMedio = new THREE.Mesh(geomCajaRoja, new THREE.MeshPhongMaterial({color:0xee3107}));
		this.cajaMedio.position.y = -this.cajaRojaAltura/2 -this.cajaVerdeAltura/2;

		//Caja Abajo
		this.cajaAbajo = new THREE.Mesh(geomCajaVerde, new THREE.MeshPhongMaterial({color:0x11e71e}));
		this.cajaAbajo.position.y = 2*(-this.cajaVerdeAltura/2) - this.cajaRojaAltura*this.guiControls.escala;

		//Caja Independiente
		this.cajaIndepAltura = 6;
		this.cajaIndepAnchura = 1.5;

		var geomCajaIndep = new THREE.BoxGeometry(this.cajaIndepAnchura,this.cajaIndepAltura);
		geomCajaIndep.translate(0, -this.cajaIndepAltura/2, 1);
		this.cajaIndep = new THREE.Mesh(geomCajaIndep,new THREE.MeshPhongMaterial({color:0x6f6c6b}));

		this.nodoIndep = new THREE.Object3D();
		this.nodoIndep.position.y = -this.cajaVerdeAltura/2 ;
		this.nodoIndep.add(this.cajaIndep);

		this.add(this.cajaArriba);
		this.add(this.cajaMedio);
		this.add(this.cajaAbajo);
		this.add(this.nodoIndep);

		this.tiempoInicial = Date.now();

	}

	createGUI (gui,titleGui) {
		//Controles
		this.guiControls = new function () {
			this.escala = 1.0;
			this.rotacion = 0.0;

			this.escala2 = 1.0;
			this.posicion = 0;
			this.rotacion2 = 0.0;

			this.reset1 = function () {
				this.escala = 1.0;
				this.rotacion = 0.0;
			}
			this.reset2 = function () {
				this.escala2 = 1.0;
				this.rotacion2 = 0.0;
				this.posicion = 0;
			}
			this.animacion = false;
			this.animacion2 = false;
			this.velocidad = 0.0;
			this.velocidad2 = 0.0;

  		}

		var folder = gui.addFolder ("Péndulo grande");
		folder.add (this.guiControls, 'escala', 1.0, 2.0, 0.1).name ('Escala').listen();
		folder.add (this.guiControls, 'rotacion', -Math.PI/4, Math.PI/4, 0.01).name ('Rotación').listen();

		var folder2 = gui.addFolder ("Péndulo pequeño");
		folder2.add (this.guiControls, 'escala2', 1.0, 2.0, 0.1).name ('Escala').listen();
		folder2.add (this.guiControls, 'rotacion2', -Math.PI/4, Math.PI/4, 0.01).name ('Rotación').listen();
		folder2.add (this.guiControls, 'posicion', 0, 6, 0.01).name ('Posición').listen();

		var folder3 = gui.addFolder ("Animación");
		folder3.add(this.guiControls, 'animacion').name('Animacion').listen();
		folder3.add (this.guiControls, 'velocidad', 0.0, 2.0, 0.1 ).name ('Velocidad (rads/s)').listen();
		folder3.add(this.guiControls, 'animacion2').name('Animacion').listen();
		folder3.add (this.guiControls, 'velocidad2', 0.0, 2.0, 0.1 ).name ('Velocidad (rads/s)').listen();

	    folder.add (this.guiControls, 'reset1').name ('[ Reset ]');
	    folder2.add (this.guiControls, 'reset2').name ('[ Reset ]');


	}
	  
	update () {
		// Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
		// Primero, el escalado
		// Segundo, la rotación en Z
		// Después, la rotación en Y
		// Luego, la rotación en X
		// Y por último la traslación
		if (!this.guiControls.animacion && !this.guiControls.animacion2){
			this.cajaAbajo.position.y = -this.cajaVerdeAltura - this.cajaRojaAltura*this.guiControls.escala;
			this.cajaMedio.scale.y = this.guiControls.escala;
			this.cajaMedio.position.y = -(this.cajaRojaAltura*this.guiControls.escala/2)-this.cajaVerdeAltura/2;
			this.rotation.z = this.guiControls.rotacion;
			this.cajaIndep.rotation.z = this.guiControls.rotacion2;
			this.cajaIndep.scale.y = this.guiControls.escala2;
			this.nodoIndep.position.y = -this.cajaVerdeAltura/2 -(this.guiControls.posicion);
		}
		/*
		if (this.guiControls.animacion2){
			if (this.cajaIndep.rotation.z > 0.8){
				this.rot2 = -1;
			}else if (this.cajaIndep.rotation.z < -0.8){
				this.rot2 = 1;
			}
			this.cajaIndep.rotation.z += 0.01 * this.guiControls.velocidad2 * this.rot2 ;
		}
		else{
			this.cajaIndep.rotation.z = this.guiControls.rotacion2;
		}*/

		var tiempoParcial = Date.now();
		var tiempoTranscurrido = (tiempoParcial - this.tiempoInicial) / 1000;
		if (this.guiControls.animacion){
			if (this.rotation.z >= 0.79){
				this.derecha = false;
			}else if (this.rotation.z <= -0.79){
				this.derecha = true;
			}
			if (this.derecha){
				this.rotation.z += tiempoTranscurrido * this.guiControls.velocidad;
			}else this.rotation.z -= tiempoTranscurrido * this.guiControls.velocidad;
		}

		if (this.guiControls.animacion2){
			if (this.cajaIndep.rotation.z >= 0.79){
				this.derecha2 = false;
			}else if (this.cajaIndep.rotation.z <= -0.79){
				this.derecha2 = true;
			}
			if (this.derecha2){
				this.cajaIndep.rotation.z += tiempoTranscurrido * this.guiControls.velocidad2;
			}else this.cajaIndep.rotation.z -= tiempoTranscurrido * this.guiControls.velocidad2;
		}

		this.tiempoInicial = tiempoParcial;
		}
	}