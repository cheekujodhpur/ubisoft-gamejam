function makeSideBars(scene) {
	var geometry = new THREE.BoxGeometry( 10, height/2., 1 );
	var material = new THREE.MeshBasicMaterial( { color: 0x223300 } );
	var cube = new THREE.Mesh( geometry, material );
	scene.add( cube );
	cube.position.z = 50;
	cube.position.x = width / 4.;
	cube.position.y = height / -4.;

	var geometry2 = new THREE.BoxGeometry(10, height/2., 1);
	var material2 = new THREE.MeshBasicMaterial( { color: 0x223300 } );
	var cube2 = new THREE.Mesh( geometry2, material2 );
	scene.add( cube2 );
	cube2.position.z = 50;
	cube2.position.x = width / -4.;
	cube2.position.y = height / -4.;

	return [cube, cube2];
}

function genCharacter(scene) {
	var geometry = new THREE.BoxGeometry( 10, 10, 1 );
	var material = new THREE.MeshBasicMaterial( { color: 0xff11aa } );
	var cube = new THREE.Mesh( geometry, material );
	scene.add( cube );
	cube.position.z = 50;
	cube.position.x = 0;
	cube.position.y = 0;

	return cube;
}

function genFloor(scene) {
	var geometry = new THREE.BoxGeometry( width, 10, 50 );
	var material = new THREE.MeshBasicMaterial( { color: 0xff11aa , transparent: true, opacity:0.0} );
	var cube = new THREE.Mesh( geometry, material );
	scene.add( cube );
	cube.position.z = 50;
	cube.position.x = 0;
	cube.position.y = height / -2.;

	return cube;
}

function genWater(scene){
	var geometry = new THREE.BoxGeometry( width, height, 1 );
	var material = new THREE.MeshBasicMaterial( { color: 0x0e113a , transparent: true, opacity:0.7} );
	var cube = new THREE.Mesh( geometry, material );
	scene.add( cube );
	cube.position.z = 51;
	cube.position.x = 0;
	cube.position.y = 3*height / -4.;

	return cube;	
}

function inWater(character, water){
	var firstBB = new THREE.Box3().setFromObject(water);
	var	secondBB = new THREE.Box3().setFromObject(character);

	var collision = firstBB.intersectsBox(secondBB);

	return collision;
}

function genDarknessFilter(scene, torch) {

	var filter = new THREE.Shape();
	filter.moveTo( 2*width / -1, 2*height / -1  );
	filter.lineTo( 2*width / -1, 2*height / 1 );
	filter.lineTo( 2*width / 1, 2*height / 1 );
	filter.lineTo( 2*width / 1, 2*height / -1 );
	filter.lineTo( 2*width / -1, 2*height / -1 );

	if(!torch){
		

	    var visionHole = new THREE.Path();
	    var radius = 200;
	    visionHole.moveTo(radius, 0);
	    var step = 2*Math.PI / 100;
	    for(var i = 0;i<2*Math.PI;i+=step){
	        visionHole.lineTo(radius*Math.cos(i), radius*Math.sin(i));
	    }

	    /*var lightPatch = new THREE.Shape();
	    lightPatch.moveTo(radius, 0);
	    var step = 2*Math.PI / 100;
	    for(var i = step;i<=2*Math.PI;i+=step){
	        lightPatch.lineTo(radius*Math.cos(i), radius*Math.sin(i));
	    }*/

	    filter.holes.push( visionHole );

	    var extrusionSettings = {
	    amount: 20,
	    bevelEnabled: true,
	    bevelThickness: 0.5,
	    bevelSize: 0.5,
	    bevelSegments: 8,
	    material: 0,
	    extrudeMaterial: 1
		};

		var geometry = new THREE.ExtrudeGeometry( filter, extrusionSettings );
		var material = new THREE.MeshBasicMaterial( { color: 0x000000 , transparent: true, opacity:0.995} );
		var filterMesh = new THREE.Mesh( geometry, material );

		scene.add( filterMesh );
		filterMesh.position.z = 49;

		return filterMesh;
	}
	else {

	    var visionHole = new THREE.Path();
	    var a = 30.;
	    var b = 500.;
	    visionHole.moveTo(0, a/2.);
	    visionHole.lineTo(0, -a/2.);
	    visionHole.lineTo(width, -b/2.);
	    visionHole.lineTo(width, b/2.);
	    visionHole.lineTo(0, a/2.);
	 
	    filter.holes.push( visionHole );

	    var extrusionSettings = {
	    amount: 20,
	    bevelEnabled: true,
	    bevelThickness: 0.5,
	    bevelSize: 0.5,
	    bevelSegments: 8,
	    material: 0,
	    extrudeMaterial: 1
		};

		var geometry = new THREE.ExtrudeGeometry( filter, extrusionSettings );
		var material = new THREE.MeshBasicMaterial( { color: 0x000000 , transparent: true, opacity:0.995} );
		var filterMesh = new THREE.Mesh( geometry, material );

		scene.add( filterMesh );
		filterMesh.position.z = 49;

		return filterMesh;
	}
}

function move(character, collidableMeshList, step, direction) {
	for(var i = 0;i<collidableMeshList.length;i++){
		var firstBB = new THREE.Box3().setFromObject(collidableMeshList[i]);
		var	secondBB = new THREE.Box3().setFromObject(character);

		var collision = firstBB.intersectsBox(secondBB);
		// console.log(firstBB);

		var xsign = (firstBB.max.x - secondBB.max.x)*(firstBB.min.x - secondBB.min.x) < 0 ? -1 : 1;
		var ysign = (firstBB.max.y - secondBB.max.y)*(firstBB.min.y - secondBB.min.y) < 0 ? -1 : 1;

		if((firstBB.getCenter().x - secondBB.getCenter().x)>0 && ysign < 0 && collision && direction==0) {
			return;
		}
		if((firstBB.getCenter().y - secondBB.getCenter().y)>0 && xsign < 0 && collision && direction==1) {
			return;
		}
		if((firstBB.getCenter().x - secondBB.getCenter().x)<0 && ysign < 0 && collision && direction==2) {
			return;
		}
		if((firstBB.getCenter().y - secondBB.getCenter().y)<0 && xsign < 0 && collision && direction==3) {
			return;
		}
	}		
	if(direction == 0)
		character.position.x += step;
	else if(direction == 1)
		character.position.y += step;
	else if(direction == 2)
		character.position.x -= step;
	else if(direction == 3)
		character.position.y -= step;
}