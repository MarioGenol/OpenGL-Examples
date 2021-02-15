class MyBox extends THREE.Object3D {
	constructor(gui,titleGui) {
		super();	
 
		// Se crea la parte de la interfaz que corresponde a la caja
		// Se crea primero porque otros métodos usan las variables que se definen para la interfaz
		this.createGUI(gui,titleGui);
		//var objLoader = new THREE.OBJLoader();
    	var mtlLoader = new THREE.MTLLoader();

    	var that = this;

    	var url = "../../models/porsche911/911.mtl";
    	mtlLoader.load( url, function( materials ) {
    	    materials.preload();
        	var objLoader = new THREE.OBJLoader();
        	objLoader.setMaterials( materials );
        	objLoader.load( '../../models/porsche911/Porsche_911_GT2.obj', function ( object ) {
        	    object.position.y = 0.6;
        	    that.add( object );
        	} );
    	});
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
		if (this.guiControls.animacion){
			this.rotation.y += 0.01;
		}
	}
}
