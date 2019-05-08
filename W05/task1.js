function main()
{
    var vertices = [
        [-1, 1, 0], // v0
        [-1,-1, 0], // v1
        [ 1,-1, 0], // v2
        [ 1, 1, 0], // v3
        [-1, 1, 2], // v4
        [-1,-1, 2], // v5
        [ 1,-1, 2], // v6
        [ 1, 1, 2] // v7

    ];
    var faces = [
        [0,1,2], // f0: v0-v1-v2
        [0,2,3],
        [2,1,5],
        [2,5,6],
        [3,2,6],
        [3,6,7],
        [3,4,7],
        [3,0,4],
        [4,0,5],
        [0,1,5],
        [4,5,6],
        [4,6,7]

    ];
    var v = new Array(8);
    for( var i = 0; i < 8 ; i++ ){
        v[i] = new THREE.Vector3().fromArray( vertices[i] );
    }
    
    var id = new Array(12);
    for(var i=0;i<12;i++){
        id[i] = faces[i];
    }

    var f = new Array(12);
    for(var i=0;i<12;i++){
        f[i] = new THREE.Face3( id[i][0], id[i][1], id[i][2] );
    }

    var geometry = new THREE.Geometry();
    for(var i=0; i<8;i++){
        geometry.vertices.push( v[i] );
    }
    for(var i=0; i<12;i++){
        geometry.faces.push( f[i] );
    }

    var width = 500;
    var height = 500;
    var scene = new THREE.Scene();

    var fov = 45;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
    
    var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set( 0, 0, 5 );
    scene.add( camera );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );

    var material = new THREE.MeshBasicMaterial();
    material.vertexColors = THREE.FaceColors;
    for(var i=0; i<12;i++){
        geometry.faces[i].color=new THREE.Color(0,1,0);
    }

    //var wireframeGeometry = new THREE.EdgesGeometry(geometry);
    //var wireframeMaterial = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 });
    //var wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);

    geometry.computeFaceNormals();
    material.side = THREE.DoubleSide
    var cube = new THREE.Mesh( geometry, material );
    //cube.add(wireframe)
    //material.wireframe = true;
    scene.add( cube );

    loop();

    document.addEventListener( 'mousedown', mouse_down_event );
	function mouse_down_event( event )
	{
        var x_win = event.clientX;
        var y_win = event.clientY;
        var vx = renderer.domElement.offsetLeft;
        var vy = renderer.domElement.offsetTop;
        var vw = renderer.domElement.width;
        var vh = renderer.domElement.height;
        var x_NDC = 2 * ( x_win - vx ) / vw - 1;
        var y_NDC = -( 2 * ( y_win - vy ) / vh - 1 );
        var p_NDC = new THREE.Vector3( x_NDC, y_NDC, 1 );
        var p_wld = p_NDC.unproject( camera );
        var origin = camera.position;
        var direction = p_wld.sub(camera.position).normalize();
        var raycaster = new THREE.Raycaster( origin, direction );
        var intersects = raycaster.intersectObjects( [cube] );
        if ( intersects.length > 0 )
        {
            intersects[0].face.color.setRGB( 1, 0, 0 );
            intersects[0].object.geometry.colorsNeedUpdate = true;
        }
    }



    function loop()
    {
        requestAnimationFrame( loop );
        cube.rotation.x += 0.001;
        cube.rotation.y += 0.001;
        renderer.render( scene, camera );
    }
}
