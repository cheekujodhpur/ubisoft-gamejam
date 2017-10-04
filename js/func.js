function genBackground(scene, level) {
	if(level==1) {
		var geometry = new THREE.BoxGeometry( width, height, 1 );

		var loader = new THREE.TextureLoader();
		loader.setCrossOrigin("Anonymous");

		var materials = [
	       new THREE.MeshBasicMaterial({
	           map: loader.load('images/character_idleL.png'),
	           transparent:true
	       }),
	       new THREE.MeshBasicMaterial({
	           map: loader.load('images/character_idleL.png'),
	           transparent:true
	       }),
	       new THREE.MeshBasicMaterial({
	           map: loader.load('images/character_idleL.png'),
	           transparent:true
	       }),
	       new THREE.MeshBasicMaterial({
	           map: loader.load('images/character_idleL.png'),
	           transparent:true
	       }),
	       new THREE.MeshBasicMaterial({
	           map: loader.load('images/character_idleL.png'),
	           transparent:true
	       }),
	       new THREE.MeshBasicMaterial({
	           map: loader.load('images/lvl1_bkg.png'),
	           transparent:true
	       })
	    ];
		//var material = new THREE.MeshBasicMaterial( { color: 0xff11aa } );
		var cube = new THREE.Mesh( geometry, materials );
		scene.add( cube );
		cube.position.z = 50;
		cube.position.x = 0;
		cube.position.y = 0;

		var cube = new THREE.Mesh( geometry, materials );
		scene.add( cube );
		cube.position.z = 51;
	}
}

function genPlatforms(scene, level) {
	var geometry, material;

	platforms = [];
	if(level==1){
		geometry = new THREE.BoxGeometry( width/4.,20., 1 );
		material = new THREE.MeshBasicMaterial( { color: 0x000000, transparent:true, opacity:0.2 } );
		var plat1 = new THREE.Mesh(geometry, material);
		scene.add(plat1);
		plat1.position.z = 45;
		plat1.position.x = width/4.;
		plat1.position.y = 0;
		platforms.push(plat1);
	}
	return platforms;
}

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
	var geometry = new THREE.BoxGeometry( 50, 130, 1 );
	var loader = new THREE.TextureLoader();
	loader.setCrossOrigin("Anonymous");
	var materials = [
       new THREE.MeshBasicMaterial({
           map: loader.load('images/character_idleL.png'),
           transparent:true
       }),
       new THREE.MeshBasicMaterial({
           map: loader.load('images/character_idleL.png'),
           transparent:true
       }),
       new THREE.MeshBasicMaterial({
           map: loader.load('images/character_idleL.png'),
           transparent:true
       }),
       new THREE.MeshBasicMaterial({
           map: loader.load('images/character_idleL.png'),
           transparent:true
       }),
       new THREE.MeshBasicMaterial({
           map: loader.load('images/character_idleL.png'),
           transparent:true
       }),
       new THREE.MeshBasicMaterial({
           map: loader.load('images/character_walkL.png'),
           transparent:true
       })
    ];
	//var material = new THREE.MeshBasicMaterial( { color: 0xff11aa } );
	var cube = new THREE.Mesh( geometry, materials );
	scene.add( cube );
	cube.position.z = 45;
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

	if (secondBB.max.y > firstBB.max.y) return 0;

	return collision;
}

function onSurface(character, water){
	var firstBB = new THREE.Box3().setFromObject(water);
	var	secondBB = new THREE.Box3().setFromObject(character);

	var collision = firstBB.intersectsBox(secondBB);

	if (collision && secondBB.max.y > firstBB.max.y) return 1;
	else return 0;
}

function onPlatform(character, platforms){

	for(var i = 0;i<platforms.length;i++){
		var firstBB = new THREE.Box3().setFromObject(platforms[i]);
		var	secondBB = new THREE.Box3().setFromObject(character);

		var collision = firstBB.intersectsBox(secondBB);
		// console.log(firstBB);

		var xsign = (firstBB.max.x - secondBB.max.x)*(firstBB.min.x - secondBB.min.x) < 0 ? -1 : 1;
		var ysign = (firstBB.max.y - secondBB.max.y)*(firstBB.min.y - secondBB.min.y) < 0 ? -1 : 1;

		if(collision) return collision;
	}	

	return 0;
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
	    var radius = 50;
	    visionHole.moveTo(radius, 0);
	    var step = 2*Math.PI / 100;
	    for(var i = 0;i<=2*Math.PI;i+=step){
	        visionHole.lineTo(radius*Math.cos(i), radius*Math.sin(i));
	    }

	    var lightPatch = new THREE.Shape();
	    lightPatch.moveTo(radius, 0);
	    var step = 2*Math.PI / 100;
	    for(var i = step;i<=2*Math.PI;i+=step){
	        lightPatch.lineTo(radius*Math.cos(i), radius*Math.sin(i));
	    }

	}
	else {

	    var visionHole = new THREE.Path();
	    var a = 10.;
	    var b = 500.;
	    visionHole.moveTo(0, a/2.);
	    visionHole.lineTo(0, -a/2.);
	    visionHole.lineTo(width, -b/2.);
	    visionHole.lineTo(width, b/2.);
	    visionHole.lineTo(0, a/2.);

	    var lightPatch = new THREE.Shape();
	    lightPatch.moveTo(0, a/2.);
	    lightPatch.lineTo(0, -a/2.);
	    lightPatch.lineTo(width, -b/2.);
	    lightPatch.lineTo(width, b/2.);
	    lightPatch.lineTo(0, a/2.);

	    
	}

		filter.holes.push( visionHole );

	    var extrusionSettings = {
	    amount: 1,
	    bevelEnabled: false,
	    material: 0,
	    extrudeMaterial: 1
		};

		var geometry = new THREE.ExtrudeGeometry( filter, extrusionSettings );
		var material = new THREE.MeshBasicMaterial( { color: 0x000000 , transparent: true, opacity:0.0} );
		var filterMesh = new THREE.Mesh( geometry, material );

		geometry = new THREE.ShapeGeometry(lightPatch);
		var lightMaterial = new THREE.MeshBasicMaterial ({color:0xFFA824, transparent:true, opacity:0.3});
		lightMaterial.side = THREE.DoubleSide;
		//material = new THREE.MeshBasicMaterial ({color:0xffff00, transparent:true, opacity:0.5});
		var lightMesh = new THREE.Mesh(geometry, lightMaterial);

		filterMesh.name = "darkness_filter";
		lightMesh.name = "light_on_filter";
		try{scene.remove(scene.getObjectByName("darkness_filter"));	}
		catch(e){}
		try{scene.remove(scene.getObjectByName("light_on_filter"));	}
		catch(e){}
		scene.add( filterMesh );
		scene.add( lightMesh );
		filterMesh.position.z = 49;
		lightMesh.position.z = 49;

		return [filterMesh, lightMesh];
}

function move(character, collidableMeshList, step, direction, flag = 0) {
	if(!flag){
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
	}
	if(direction%2)
		character.position.y += step;
	else
		character.position.x += step;
	
}

function jump(character){
	characterVelo = 5;

}

function timeIsNow(){
	var currTime = new Date().getTime();
	if(currTime - lastTime > 500){
		lastTime = currTime;
		return 1;
	}
	return 0;
}