import{vec3, vec4} from 'gl-matrix'
import Drawable from '../rendering/gl/Drawable'
import {gl} from '../globals'
import Turtle from '../Turtle'

var OBJ = require('webgl-obj-loader');

var meshPath = '../src/obj_files/cow.obj';
var testPath1 = '../src/obj_files/cow.obj';
        //////////////////
function readTextFile(filePath : string) : string
{
    var allText;
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", filePath, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                allText = rawFile.responseText;
                return allText;
            }
        }
    }
    rawFile.send(null);
    return allText;
}
        //////////////////

        
class myObj extends Drawable
// class myObj
{
    indices : Uint32Array;
    positions: Float32Array;
    normals: Float32Array;
    
    
    constructor(){
        super();
    }

    getData(meshPath: string, ind: Array<number>, nor: Array<number>, pos: Array<number>)
    {
            var myData = readTextFile(meshPath);
            var mesh = new OBJ.Mesh(myData);

            // var ind = new Array<number>();
            // var nor = new Array<number>();
            // var pos = new Array<number>();
            
            for(let i = 0; i < mesh.indices.length; i++)
            {
                ind.push(mesh.indices[i]);
            }

            for(let i = 0; i < mesh.vertices.length; i+=3)
            {
                pos.push(mesh.vertices[i]);
                pos.push(mesh.vertices[i+1]);
                pos.push(mesh.vertices[i+2]);
                pos.push(1);
            }

            if(mesh.vertexNormals.length)
            {
                for(let i = 0; i < mesh.vertexNormals.length; i+=3)
                {
                    nor.push(mesh.vertexNormals[i]);
                    nor.push(mesh.vertexNormals[i+1]);
                    nor.push(mesh.vertexNormals[i+2]);
                    nor.push(1);
                }
            }
    }

    create()
    {
        
            var myData = readTextFile(meshPath);
            var mesh = new OBJ.Mesh(myData);

            var ind = new Array<number>();
            var nor = new Array<number>();
            var pos = new Array<number>();

            this.getData(meshPath, ind, nor, pos);


            this.positions = new Float32Array(pos);
            this.indices = new Uint32Array(ind);
            this.normals = new Float32Array(nor);


            this.generateIdx();
            this.generatePos();
            this.generateNor();

            this.count  = this.indices.length;

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufIdx);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);

            gl.bindBuffer(gl.ARRAY_BUFFER, this.bufPos);
            gl.bufferData(gl.ARRAY_BUFFER, this.positions, gl.STATIC_DRAW);

            if(mesh.vertexNormals.length)
            {
                gl.bindBuffer(gl.ARRAY_BUFFER, this.bufNor);
                gl.bufferData(gl.ARRAY_BUFFER, this.normals, gl.STATIC_DRAW);
            }
            
            console.log('Read from OBJ File.');
        
        
    }
}

export default myObj;