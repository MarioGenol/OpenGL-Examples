class MyBox extends THREE.Object3D {
	constructor(gui,titleGui) {
		super();	
 
		// Se crea la parte de la interfaz que corresponde a la caja
		// Se crea primero porque otros métodos usan las variables que se definen para la interfaz
		this.createGUI(gui,titleGui);

		//ROMBO
		this.shape = new THREE.Shape();
		this.shape.moveTo(2, 2);
		this.shape.moveTo(6, 2);
		this.shape.lineTo(10, 7);
		this.shape.lineTo(6, 12);
		this.shape.lineTo(2, 7);
		this.shape.lineTo(6, 2);
		
		var opciones = {amount: 2 , steps: 1, depth:20, curveSegments: 2, bevelThickness: 1, bevelSize: 1, bevelSegments: 50};
		var romboGeom = new THREE.ExtrudeGeometry (this.shape, opciones);
		var romboMat = new THREE.MeshPhongMaterial({color: 0xff0000});
		this.rombo = new THREE.Mesh(romboGeom, romboMat);
			
		//movimiento
		romboGeom.translate(-6, -7, -1);
		this.cdRombo = new THREE.Object3D();
		this.cdRombo.position.y = 10;
		this.cdRombo.position.x = -10;
		this.cdRombo.add(this.rombo);
		this.eRombo = new THREE.Object3D();
		this.eRombo.add(this.cdRombo);

		this.add(this.eRombo);
			
		//CORAZÓN
		var shape2 = new THREE.Shape();
		shape2.moveTo(7, -4);
		shape2.bezierCurveTo(9, 0, 12, -2, 12, -5);
		shape2.bezierCurveTo(12, -7, 10, -10, 7, -12);
		shape2.bezierCurveTo(4, -10, 2, -7, 2, -5);
		shape2.bezierCurveTo(2, -2, 5, 0, 7, -4);

		var opciones2 = { amount: 2, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
		var geomCorazon = new THREE.ExtrudeGeometry(shape2, opciones2);

		this.corazon = new THREE.Mesh(geomCorazon, new THREE.MeshPhongMaterial({color: 0xff0000}));
		//this.add(this.corazon);

		geomCorazon.translate(-6.9, 7.2, -1);
		this.cdCorazon = new THREE.Object3D();
		this.cdCorazon.position.x = 10;
		this.cdCorazon.position.y = -10;
		this.cdCorazon.add(this.corazon);
		this.eCorazon = new THREE.Object3D();
		this.eCorazon.add(this.cdCorazon);

		this.add(this.eCorazon);


		//PICA

		var geomPica = new THREE.Geometry();

		//geomCuerpo
		var geomCuerpo = new THREE.Geometry();
		geomCuerpo.copy(geomCorazon);
		geomCuerpo.rotateX(3.14159);
		geomCuerpo.translate(-8, 11, 0);
		geomCuerpo.scale(0.8, 0.8, 1);
		//geomBase
		var points = [];
		points.push (new THREE.Vector3 (0.00001, 0, 2));
		points.push (new THREE.Vector3 (1.2, 0, 3));
		points.push (new THREE.Vector3 (0.00001, 3, 2));
		var geomBase = new THREE.LatheGeometry (points);
		geomBase.translate(-6.4, 2.3, 0);

		//meshCuerpo
		this.cuerpo = new THREE.Mesh(geomCuerpo, new THREE.MeshPhongMaterial({color: 0x3374FF}));
		//meshBase
		this.base = new THREE.Mesh (geomBase, new THREE.MeshPhongMaterial({color: 0x3374FF}));

		//con merge unimos las dos geometrías
		geomPica.merge(this.cuerpo.geometry, this.cuerpo.matrix);
		geomPica.merge(this.base.geometry, this.base.matrix);
		//centramos	
		geomPica.translate(6.5, -7.3, 0);

		this.pica = new THREE.Mesh (geomPica, new THREE.MeshPhongMaterial({color: 0x3374FF}));
		
		//movimiento
		this.cdPica = new THREE.Object3D();
		this.cdPica.position.x = 10;
		this.cdPica.position.y = 10;
		this.cdPica.add(this.pica);
		this.ePica = new THREE.Object3D();
		this.ePica.add(this.cdPica);
		//console.log(this.e.children[0]);

		this.add(this.ePica);


		//TRÉBOL
		
		//cuerpo
		var shape3 = new THREE.Shape();
		shape3.moveTo(-12, -12);
		shape3.bezierCurveTo(-17, -18.5, -22, -9, -14, -8.5);
		shape3.bezierCurveTo(-18, -1, -6, -1, -10, -8.5);
		shape3.bezierCurveTo(-2, -9, -7, -18.5, -12, -12);

		var geomCuerpoTrebol = new THREE.ExtrudeGeometry(shape3, opciones2);
		this.cuerpoTrebol = new THREE.Mesh(geomCuerpoTrebol, new THREE.MeshPhongMaterial({color: 0x3374FF0}));
		//base coge puntos de base pica
		var geomBaseTrebol = new THREE.LatheGeometry (points);
		geomBaseTrebol.translate(-11.9, -16, 1);
		this.baseTrebol = new THREE.Mesh (geomBaseTrebol, new THREE.MeshPhongMaterial({color: 0x3374FF}));
		
		var geomTrebol = new THREE.Geometry();
		geomTrebol.merge(this.cuerpoTrebol.geometry, this.cuerpoTrebol.matrix);
		geomTrebol.merge(this.baseTrebol.geometry, this.baseTrebol.matrix);
		//centramos	
		geomTrebol.translate(12, 10.3, -1);
		this.trebol = new THREE.Mesh (geomTrebol, new THREE.MeshPhongMaterial({color: 0x3374FF}));
		
		this.cdTrebol = new THREE.Object3D();
		this.cdTrebol.position.x = -10;
		this.cdTrebol.position.y = -10;
		this.cdTrebol.add(this.trebol);
		this.eTrebol = new THREE.Object3D();
		this.eTrebol.add(this.cdTrebol);

		this.add(this.eTrebol);

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		//Columna Corazón
		var shapeColumna1 = new THREE.Shape();
		shapeColumna1.moveTo(7, -4);
		shapeColumna1.bezierCurveTo(9, 0, 12, -2, 12, -5);
		shapeColumna1.bezierCurveTo(12, -7, 10, -10, 7, -12);
		shapeColumna1.bezierCurveTo(4, -10, 2, -7, 2, -5);
		shapeColumna1.bezierCurveTo(2, -2, 5, 0, 7, -4);

		var path = new THREE.CatmullRomCurve3( [
		new THREE.Vector3(7, -4, 0),
		new THREE.Vector3(11, -4, 8),
		new THREE.Vector3(11, 0, 16),
		new THREE.Vector3(7, 0, 24),
		new THREE.Vector3(11, -4, 32),
		new THREE.Vector3(7, -4, 40)
		] )

		var options = {steps:50, curveSegments:8, extrudePath:path};
		var geomColumna1 = new THREE.ExtrudeGeometry(shapeColumna1, options);
		//centramos
		geomColumna1.rotateX(1.6);
		geomColumna1.translate(-4, 20, 9);
		geomColumna1.scale(0.6, 1, 0.6);

		this.columna1 = new THREE.Mesh (geomColumna1,  new THREE.MeshPhongMaterial({color: 0x4CFF33}));
		//this.add(this.columna1);
		this.nodoColumna1_1 = new THREE.Object3D();
		this.nodoColumna1_1.position.x = 30;
		this.nodoColumna1_1.add(this.columna1);
		this.add(this.nodoColumna1_1);
		

		//Columna Trébol
		var shapeColumna2 = new THREE.Shape();
		shapeColumna2.moveTo(-12, -12);
		shapeColumna2.bezierCurveTo(-17, -18.5, -22, -9, -14, -8.5);
		shapeColumna2.bezierCurveTo(-18, -1, -6, -1, -10, -8.5);
		shapeColumna2.bezierCurveTo(-2, -9, -7, -18.5, -12, -12);

		var path2 = new THREE.CatmullRomCurve3( [
		new THREE.Vector3(-12, -12, 0),
		new THREE.Vector3(-12, -9, 8),
		new THREE.Vector3(-9, -9, 16),
		new THREE.Vector3(-12, -9, 24),
		new THREE.Vector3(-12, -12, 32),
		new THREE.Vector3(-12, -12, 40),
		] )

		var options2 = {steps:50, curveSegments:8, extrudePath:path2};
		var geomColumna2 = new THREE.ExtrudeGeometry(shapeColumna2, options2);
		//centramos
		geomColumna2.rotateX(1.6);
		geomColumna2.translate(0, 18, 0);
		geomColumna2.scale(0.6, 1, 0.6);

		this.columna2 = new THREE.Mesh (geomColumna2,  new THREE.MeshPhongMaterial({color: 0x4CFF33}));
		this.nodoColumna2_1 = new THREE.Object3D();
		this.nodoColumna2_1.position.x = -30;
		this.nodoColumna2_1.add(this.columna2);
		this.add(this.nodoColumna2_1);
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
		this.eRombo.rotation.z += 0.02;
		this.cdRombo.rotation.z -= 0.02;	
		this.rombo.rotation.y += 0.02;
		
		//Corazón Movimiento
		this.eCorazon.rotation.z += 0.02;
		this.cdCorazon.rotation.z -= 0.02;
		this.corazon.rotation.y += 0.02;
		//Pica Movimiento
		this.ePica.rotation.z += 0.02;
		this.cdPica.rotation.z -= 0.02;
		this.pica.rotation.y += 0.02;
		//Trebol Movimiento
		this.eTrebol.rotation.z += 0.02;
		this.cdTrebol.rotation.z -= 0.02;
		this.trebol.rotation.y += 0.02;
		//Columna Corazón
		this.nodoColumna1_1.rotation.x -= 0.02;
		this.columna1.rotation.y += 0.02;
		//Columna Corazón
		this.nodoColumna2_1.rotation.x -= 0.02;
		this.columna2.rotation.y += 0.02;		
		}  
	}
}
