function main()
{   
    var isosurface_type = 0
    var volume = new KVS.LobsterData();
    var screen = new KVS.THREEScreen();

    screen.init( volume, {
        width: window.innerWidth*0.7,
        height: window.innerHeight,
        targetDom: document.getElementById('display'),
        enableAutoResize: false
    });

    var bounds = Bounds( volume );
    screen.scene.add( bounds );

    var slider = document.querySelector("[type=range]");
    var buttonvalue1 = document.getElementById("btn1");
    var buttonvalue2 = document.getElementById("btn2");

    var isovalue = 40;
    //document.write(isovalue);
    var surfaces = Isosurfaces( volume, isovalue ,isosurface_type);
    screen.scene.add( surfaces );
    //document.write(screen);
    document.addEventListener( 'mousemove', function() {
        screen.light.position.copy( screen.camera.position );
    });

    window.addEventListener( 'resize', function() {
        screen.resize( [ window.innerWidth*0.7, window.innerHeight ] );
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
        surfaces = Isosurfaces( volume, isovalue ,isosurface_type);
        screen.scene.add( surfaces );
        //document.write(screen);
    });

    buttonvalue1.addEventListener( 'click',function(){
        screen.scene.remove( surfaces );
        isosurface_type = 0;
        screen.scene.length = 0;
        isovalue = slider.value;
        surfaces = Isosurfaces( volume, isovalue ,isosurface_type);
        screen.scene.add( surfaces );
        //document.write(screen);
    });

    buttonvalue2.addEventListener( 'click',function(){
        screen.scene.remove( surfaces );
        isosurface_type = 1;
        screen.scene.length = 0;
        isovalue = slider.value;
        surfaces = Isosurfaces( volume, isovalue ,isosurface_type);
        screen.scene.add( surfaces );
        //document.write(screen);
    });

    screen.loop();
}
