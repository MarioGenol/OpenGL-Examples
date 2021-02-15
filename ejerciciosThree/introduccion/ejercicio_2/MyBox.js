 class MyBox extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    
    // Un Mesh se compone de geometría y material
    var boxGeom = new THREE.BoxGeometry (1,1,1);
    // Como material se crea uno a partir de un color
    var boxMat = new THREE.MeshNormalMaterial({color: 0xCF0000});
    boxMat.flatShading = true;
    boxMat.needsUpdate = true;
    // Ya podemos construir el Mesh
    this.box = new THREE.Mesh (boxGeom, boxMat);
    // Y añadirlo como hijo del Object3D (el this)
    this.add (this.box);

    // Las geometrías se crean centradas en el origen.
    // Como queremos que el sistema de referencia esté en la base,
    // subimos el Mesh de la caja la mitad de su altura
    this.box.position.y = 0.5;

	//circulo
	var circleGeom = new THREE.CircleGeometry (1, 16);
	var circleMat = new THREE.MeshNormalMaterial({color: 0xCF0000});
	this.circle = new THREE.Mesh (circleGeom, circleMat);
	this.add (this.circle);
	this.circle.position.z = 10;
	//cono
	var coneGeom = new THREE.ConeGeometry( 1, 5, 16 );
	var coneMat = new THREE.MeshNormalMaterial( {color: 0xffff00} );
	this.cone = new THREE.Mesh( coneGeom, coneMat );
	this.add (this.cone);
	this.cone.position.x = 10;
	//icosaedro
	var icosahedronGeom = new THREE.IcosahedronGeometry(2);
	var icosahedronMat = new THREE.MeshNormalMaterial({color: 0xffff00});
	this.icosahedron = new THREE.Mesh(icosahedronGeom, icosahedronMat);
	this.add (this.icosahedron);
	this.icosahedron.position.y = 10;
	//toro
	var torusGeom = new THREE.TorusGeometry(1,0.8,50,50);
	var torusMat = new THREE.MeshNormalMaterial({color: 0xffff00});
	this.torus = new THREE.Mesh(torusGeom, torusMat);
	this.add (this.torus);
	this.torus.position.set(10, 10, 0);
	//esfera
	var sphereGeom = new THREE.SphereGeometry(2, 32, 32);
	var sphereMat = new THREE.MeshNormalMaterial({color: 0xffff00});
	this.sphere = new THREE.Mesh(sphereGeom, sphereMat);
	this.add(this.sphere);
	this.sphere.position.set(0, 10, 10);
    
  }
  
  createGUI (gui,titleGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function () {
      this.sizeX = 1.0;
      this.sizeY = 1.0;
      this.sizeZ = 1.0;
      
      this.rotX = 0.0;
      this.rotY = 0.0;
      this.rotZ = 0.0;
      
      this.posX = 0.0;
      this.posY = 0.0;
      this.posZ = 0.0;
      
      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      this.reset = function () {
        this.sizeX = 1.0;
        this.sizeY = 1.0;
        this.sizeZ = 1.0;
        
        this.rotX = 0.0;
        this.rotY = 0.0;
        this.rotZ = 0.0;
        
        this.posX = 0.0;
        this.posY = 0.0;
        this.posZ = 0.0;
      }
    } 
    
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'sizeX', 0.1, 5.0, 0.1).name ('Tamaño X : ').listen();
    folder.add (this.guiControls, 'sizeY', 0.1, 5.0, 0.1).name ('Tamaño Y : ').listen();
    folder.add (this.guiControls, 'sizeZ', 0.1, 5.0, 0.1).name ('Tamaño Z : ').listen();
    
    folder.add (this.guiControls, 'rotX', 0.0, Math.PI/2, 0.1).name ('Rotación X : ').listen();
    folder.add (this.guiControls, 'rotY', 0.0, Math.PI/2, 0.1).name ('Rotación Y : ').listen();
    folder.add (this.guiControls, 'rotZ', 0.0, Math.PI/2, 0.1).name ('Rotación Z : ').listen();
    
    folder.add (this.guiControls, 'posX', -20.0, 20.0, 0.1).name ('Posición X : ').listen();
    folder.add (this.guiControls, 'posY', 0.0, 10.0, 0.1).name ('Posición Y : ').listen();
    folder.add (this.guiControls, 'posZ', -20.0, 20.0, 0.1).name ('Posición Z : ').listen();
    
    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
  }
  
  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación

    this.position.set (this.guiControls.posX,this.guiControls.posY,this.guiControls.posZ);
    this.rotation.set (this.guiControls.rotX,this.guiControls.rotY,this.guiControls.rotZ);
    this.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);	

    this.box.rotation.x += 0.01;
    this.box.rotation.y += 0.01;
    this.box.rotation.z += 0.01;

    this.circle.rotation.x += 0.01;
    this.circle.rotation.y += 0.01;
    this.circle.rotation.z += 0.01;

    this.cone.rotation.x += 0.01;
    this.cone.rotation.y += 0.01;
    this.cone.rotation.z += 0.01;

    this.icosahedron.rotation.x += 0.01;
    this.icosahedron.rotation.y += 0.01;
    this.icosahedron.rotation.z += 0.01;

    this.torus.rotation.x += 0.01;
    this.torus.rotation.y += 0.01;
    this.torus.rotation.z += 0.01;

    this.sphere.rotation.x += 0.01;
    this.sphere.rotation.y += 0.01;
    this.sphere.rotation.z += 0.01;
  }
}
