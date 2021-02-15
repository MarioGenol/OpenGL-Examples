 class MyBox extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

	// Puntos
	this.points = [];
	// Se añaden puntos al array
	//base
	this.points.push (new THREE.Vector3 (3, 0, 0));
	this.points.push (new THREE.Vector3 (3, 0.5, 0));
	this.points.push (new THREE.Vector3 (1, 2.5, 0));
	//torre
	this.points.push (new THREE.Vector3 (1, 7, 0));
	this.points.push (new THREE.Vector3 (1.5, 7, 0));
	this.points.push (new THREE.Vector3 (1.5, 7.5, 0));
	this.points.push (new THREE.Vector3 (1.3, 7.8, 0));
	this.points.push (new THREE.Vector3 (1.1, 8, 0));
	this.points.push (new THREE.Vector3 (0, 8.2, 0));
	// Para crear la figura por revolución
	this.material = new THREE.MeshNormalMaterial({color: 0xCF0000});
	this.latheObject = new THREE.Mesh (new THREE.LatheGeometry (this.points), this.material);
	// Para crear una línea visible, como en el vídeo
	var lineGeometry = new THREE.Geometry();
	lineGeometry.vertices = this.points;
	this.line = new THREE.Line (lineGeometry, this.material);
	this.line.position.x = -10;
	this.line.position.z = 10;
	this.add(this.latheObject);
	this.add(this.line);
	this.angle = 0.3;
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

      this.angle = 0.1;

      
      
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

	this.angle = 0.1;
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
    
    folder.add (this.guiControls, 'angle', 0.1, 6.28, 0.1).name ('Ángulo : ').listen();
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
    this.latheObject.geometry = new THREE.LatheGeometry (this.points, 64, 0, this.guiControls.angle);
  }
}
