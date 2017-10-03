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


function move(character, collidableMeshList, step, direction) {
	for(var i = 0;i<collidableMeshList.length;i++){
		var firstBB = new THREE.Box3().setFromObject(collidableMeshList[i]);
		var	secondBB = new THREE.Box3().setFromObject(character);

		var collision = firstBB.intersectsBox(secondBB);

		if((firstBB.getCenter().x - secondBB.getCenter().x)>0 && collision && direction==0) {
			return;
		}
		if((firstBB.getCenter().y - secondBB.getCenter().y)>0 && collision && direction==1) {
			return;
		}
		if((firstBB.getCenter().x - secondBB.getCenter().x)<0 && collision && direction==2) {
			return;
		}
		if((firstBB.getCenter().y - secondBB.getCenter().y)<0 && collision && direction==3) {
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