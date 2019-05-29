Vec3 = function( x, y, z )
{
    this.x = x;
    this.y = y;
    this.z = z;
}

function inner_product( A,B ){
    var inner = A.x*B.x+A.y*B.y+A.z*B.z;
    return inner;
}

function absolute_vec( v ){
    abs_vec = v.x**2+v.y**2+v.z**2;
    return abs_vec;
}

function calc_vec( v1 , v2 ){
    var v = new Vec3( v2.x-v1.x , v2.y-v1.y , v2.z-v1.z );
    return v;
}

function AreaOfTriangle(A,B,C){
    //var S =parseInt(A.x)+parseInt(B.x)+parseInt(C.x);
    var vec_AB = calc_vec(A,B);
    var vec_AC = calc_vec(A,C);
    var abs_AB = absolute_vec( vec_AB );
    var abs_AC = absolute_vec( vec_AC );
    var inner_AB_AC = inner_product( vec_AB , vec_AC );
    var S = (1/2)*((abs_AB*abs_AC-(inner_AB_AC)**2)**(1/2));
    document.write(Object.values(A)+"<br>");
    document.write(Object.values(B)+"<br>");
    document.write(Object.values(C)+"<br>");
    document.write(S);
}

function var_input(){
    var x0 = document.js.x0.value;
    var y0 = document.js.y0.value;
    var z0 = document.js.z0.value;
    var x1 = document.js.x1.value;
    var y1 = document.js.y1.value;
    var z1 = document.js.z1.value;
    var x2 = document.js.x2.value;
    var y2 = document.js.y2.value;
    var z2 = document.js.z2.value;
    var v0 = new Vec3( x0, y0, z0 );
    var v1 = new Vec3( x1, y1, z1 );
    var v2 = new Vec3( x2, y2, z2 );
    AreaOfTriangle(v0,v1,v2);	      
}








