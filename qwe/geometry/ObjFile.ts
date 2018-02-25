import{vec3, vec4} from 'gl-matrix'
import Drawable from '../rendering/gl/Drawable';
import {gl} from '../globals'


//var ObjMtlLoader = require("../src/objLoader");
//var ObjMtlLoader = require("obj-mtl-loader");

//var err;
var myResult;



class myObj extends Drawable{


indices: Uint32Array;
positions: Float32Array;
normals: Float32Array;


constructor()
{
    super();

}

create(){

    //var myLoader = new ObjMtlLoader();
    // myLoader.load("../obj_files/dodecahedron.obj", function(err: any, myResult : any) {
    // if(err){ 
    //  throw err;
    // }
    // var vertices = myResult.vertices;
    // var faces = myResult.faces;
    // var normals = myResult.normals;

    // });


    //this.indices = new Uint32Array{[faces.indices]};
     




}

};
export default myObj;
