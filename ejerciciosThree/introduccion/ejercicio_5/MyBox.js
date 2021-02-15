class MyBox extends THREE.Object3D {
	constructor(gui,titleGui) {
		super();	
 
		// Se crea la parte de la interfaz que corresponde a la caja
		// Se crea primero porque otros métodos usan las variables que se definen para la interfaz
		this.createGUI(gui,titleGui);
		
		this.construirTaza();
		this.construirPieza();
		this.construirTuerca();
		
	}
  
	construirTaza(){
		//TAZA
		//Geometrías
		var geomCilindroExt = new THREE.CylinderGeometry( 10, 10, 20, 32 );
		var geomToro = new THREE.TorusGeometry( 5, 1, 16, 100 );
		geomToro.translate(-10, 0, 0);
		var geomCilindroInt = new THREE.CylinderGeometry( 9.5, 9.5, 20, 32 );
		geomCilindroInt.translate(0, 1, 0);
		//BSP
		var cilindro1bsp = new ThreeBSP(geomCilindroExt);
		var cilindro2bsp = new ThreeBSP(geomCilindroInt);
		var toro1bsp = new ThreeBSP(geomToro);
		//Operaciones
		var tazaParcial1 = cilindro1bsp.union(toro1bsp);
		var tazaFinal = tazaParcial1.subtract(cilindro2bsp);
		
		var taza = tazaFinal.toMesh(new THREE.MeshNormalMaterial());
		//taza.position.set(-40, 10, 10);
		taza.geometry.computeFaceNormals();
		taza.geometry.computeVertexNormals();
		this.nodoTaza = new THREE.Object3D();
		this.nodoTaza.position.x = -40;
		this.nodoTaza.position.y = 10;
		this.nodoTaza.position.z = 10;
		this.nodoTaza.add(taza);
		this.add(this.nodoTaza);
	}

	construirPieza(){
		//PIEZA

		//cajas
		var geomCaja = new THREE.Geometry();

		var geomCaja1 = new THREE.BoxGeometry(5, 5, 5);
		geomCaja1.translate(2.5, 2.5, 2.5);
		var geomCaja2 = new THREE.BoxGeometry(1, 10, 5);
		geomCaja2.translate(0.5, 10, 2.5);
		var geomCaja3 = new THREE.BoxGeometry(10, 1, 5);
		geomCaja3.translate(10, 0.5, 2.5);

		//cilindros
		var geomCilindro1 = new THREE.CylinderGeometry(4, 4, 10, 32);
		geomCilindro1.rotateX(Math.PI/2);
		geomCilindro1.translate(5, 5, 0);
		var geomCilindro2 = new THREE.CylinderGeometry(1, 0.1, 1.5, 32);
		geomCilindro2.translate(12.5, 0.5, 2.5);
		var geomCilindro3 = new THREE.CylinderGeometry(1, 0.1, 1.5, 32);
		geomCilindro3.rotateZ(-Math.PI/2);
		geomCilindro3.translate(0.5, 12.5, 2.5);
		var geomCilindro4 = new THREE.CylinderGeometry(0.5, 0.5, 2, 32);
		geomCilindro4.translate(12.5, 0, 2.5);
		var geomCilindro5 = new THREE.CylinderGeometry(0.5, 0.5, 2, 32);
		geomCilindro5.rotateZ(-Math.PI/2);
		geomCilindro5.translate(0, 12.5, 2.5);

		var caja1 = new THREE.Mesh( geomCaja1, new THREE.MeshNormalMaterial() );
		var caja2 = new THREE.Mesh( geomCaja2, new THREE.MeshNormalMaterial() );
		var caja3 = new THREE.Mesh( geomCaja3, new THREE.MeshNormalMaterial() );

		//merge
		geomCaja.merge(caja3.geometry, caja1.matrix);
		geomCaja.merge(caja2.geometry, caja2.matrix);
		geomCaja.merge(caja1.geometry, caja1.matrix);
		//BSP
		var base = new ThreeBSP(geomCaja);
		var cilindro1bsp = new ThreeBSP(geomCilindro1);
		var cilindro2bsp = new ThreeBSP(geomCilindro2);
		var cilindro3bsp = new ThreeBSP(geomCilindro3);
		var cilindro4bsp = new ThreeBSP(geomCilindro4);
		var cilindro5bsp = new ThreeBSP(geomCilindro5);

		var piezaParcial1 = base.subtract(cilindro1bsp);
		var piezaParcial2 = piezaParcial1.subtract(cilindro2bsp);
		var piezaParcial3 = piezaParcial2.subtract(cilindro3bsp);
		var piezaParcial4 = piezaParcial3.subtract(cilindro4bsp);
		var piezaParcial5 = piezaParcial4.subtract(cilindro5bsp);

		var piezaFinal = piezaParcial5.toMesh(new THREE.MeshNormalMaterial());
		this.nodoPieza = new THREE.Object3D();
		this.nodoPieza.position.x = 30;
		this.nodoPieza.add(piezaFinal);
		this.add(this.nodoPieza);
	}

	construirTuerca(){
		var geomCilindroTuercaExt = new THREE.CylinderGeometry(10, 10, 6, 6);
		var geomCilindroTuercaInt = new THREE.CylinderGeometry(6, 6, 10, 32);
		var geomEsfera = new THREE.SphereGeometry( 10.2, 32, 32 );

		var vectorToros = [];
		var geomToroTuerca = new THREE.TorusGeometry( 6, 0.25, 16, 100 );
		geomToroTuerca.rotateX(Math.PI/2);
		geomToroTuerca.translate(0, -2.75, 0);
		//espiral
		var group = new THREE.Group();
		for (var i = 0; i < 12; i++){
			var e =  new THREE.Mesh(geomToroTuerca, new THREE.MeshNormalMaterial());
			e.position.y += 0.5*i;
			group.add(e); 
		}
		this.add(group);
		var cilindroTuerca1bsp = new ThreeBSP(geomCilindroTuercaExt);
		var cilindroTuerca2bsp = new ThreeBSP(geomCilindroTuercaInt);
		var esferaTuerca1bsp = new ThreeBSP(geomEsfera);

		var tuercaParcial = cilindroTuerca1bsp.subtract(cilindroTuerca2bsp);
		var tuercaParcial2 = tuercaParcial.intersect(esferaTuerca1bsp);

		var tuercaFinal = tuercaParcial2.toMesh(new THREE.MeshNormalMaterial());

		//this.add(tuercaFinal);
		this.nodoTuerca = new THREE.Object3D();
		this.nodoTuerca.position.y = 3;
		this.nodoTuerca.add(tuercaFinal);
		this.nodoTuerca.add(group);
		this.add(this.nodoTuerca);
	}

	createGUI (gui,titleGui) {
		//Controles
		this.guiControls = new function () {	      
			this.animacion = false;
		} 
		var folder = gui.addFolder (titleGui);
			// Estas lineas son las que añaden los componentes de la interfaz
			// Las tres cifras indican un valor mínimo, un máximo y el incremento
			// El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
			folder.add(this.guiControls, 'animacion').name('Animacion').listen();
	}
	  
	update () {
		// Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
		// Primero, el escalado
		// Segundo, la rotación en Z
		// Después, la rotación en Y
		// Luego, la rotación en X
		// Y por último la traslación

		//console.log(this.guiControls.animacion);
		if(this.guiControls.animacion){	
		//Rombo Movimiento	
		this.nodoPieza.rotation.x += 0.01;
		this.nodoPieza.rotation.y += 0.01;
		this.nodoPieza.rotation.z += 0.01;
		this.nodoTaza.rotation.x += 0.01;
		this.nodoTaza.rotation.y += 0.01;
		this.nodoTaza.rotation.z += 0.01;
		this.nodoTuerca.rotation.x += 0.01;
		this.nodoTuerca.rotation.y += 0.01;
		this.nodoTuerca.rotation.z += 0.01;	
		}  
	}
}
