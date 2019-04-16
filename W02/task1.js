Vec3 = function( x, y, z )
{
    this.x = x;
    this.y = y;
    this.z = z;
}

Vec3.prototype.min = function()
{
    var array = [this.x,this.y,this.z]
    array.sort();
    return array[0];
}


Vec3.prototype.mid = function()
{
    var array = [this.x,this.y,this.z]
    array.sort();
    return array[1];
}

Vec3.prototype.max = function()
{
    var array = [this.x,this.y,this.z]
    array.sort();
    return array[2];
}




