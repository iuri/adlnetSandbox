(function(){
		function cone(childID, childSource, childName)
		{
			
			this.radius = 1;
			this.height = 1;
			
			this.outputType = "Primitive";
        	this.inputType = null;
			this.rsegs = 10;
			this.hsegs = 1;
			
			
			
			this.inherits = ['vwf/model/threejs/prim.js'];
			//the node constructor
			this.settingProperty = function(propertyName,propertyValue)
			{
				if(propertyName == 'height' || propertyName == 'radius'||
				propertyName == 'hsegs'||propertyName == 'rsegs')
				{
					this[propertyName] = propertyValue;
					this.dirtyStack(true);
				}
			}
			this.initializingNode = function()
			{
				this.dirtyStack(true);
			}
			this.gettingProperty = function(propertyName)
			{
				if(propertyName == 'height' || propertyName == 'radius'||
				propertyName == 'hsegs'||propertyName == 'rsegs' || propertyName =='EditorData')
				return this[propertyName];
			}
			this.BuildMesh = function(mat)
			{
				var mesh=  new THREE.Mesh(new THREE.CylinderGeometry(0, this.radius, this.height,this.rsegs,this.hsegs), mat);
				mesh.rotation.x = Math.PI/2;

				for (var face in mesh.geometry.faces) {
                    if (mesh.geometry.faces[face].normal.y <= -0.1)
                        mesh.geometry.faces[face].materialIndex = 1;
                    if (mesh.geometry.faces[face].normal.y >= 0.1)
                        mesh.geometry.faces[face].materialIndex = 2;
                }
                
				return mesh;
			}
			
			//must be defined by the object
			this.getRoot = function()
			{
				return this.rootnode;
			}
			this.rootnode = new THREE.Object3D();
			//this.Build();
		}
		//default factory code
        return function(childID, childSource, childName) {
			//name of the node constructor
            return new cone(childID, childSource, childName);
        }
})();

//@ sourceURL=threejs.subdriver.cone