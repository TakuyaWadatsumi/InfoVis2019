function main()
{
    var volume = new KVS.LobsterData();
    var screen = new KVS.THREEScreen();

    screen.init( volume, {
        width: window.innerWidth*0.8,
        height: window.innerHeight,
        enableAutoResize: false
    });

    var bounds = Bounds( volume );
    screen.scene.add( bounds );

    var slider = document.querySelector("[type=range]");

    var isovalue = 40;
    //document.write(isovalue);
    var surfaces = Isosurfaces( volume, isovalue );
    screen.scene.add( surfaces );
    //document.write(screen);
    document.addEventListener( 'mousemove', function() {
        screen.light.position.copy( screen.camera.position );
    });

    window.addEventListener( 'resize', function() {
        screen.resize( [ window.innerWidth*0.8, window.innerHeight ] );
    });

    slider.addEventListener( 'input',function(){
        //isovalue = slider.value;
        //surfaces[0].dispose();
        //surfaces[1].dispose();
        screen.scene.remove( surfaces );
        //delete surfaces;
        //surfaces.dispose();
        //document.write(surfaces);
        //texture.dispose();
        screen.scene.length = 0;
        isovalue = slider.value;
        surfaces = Isosurfaces( volume, isovalue );
        screen.scene.add( surfaces );
        //document.write(screen);
    });

    screen.loop();
}
