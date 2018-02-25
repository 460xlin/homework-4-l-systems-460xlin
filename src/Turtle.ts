import {vec3, vec4, mat4, vec2} from 'gl-matrix';

var initialDir = vec4.fromValues(0,1,0,1);
class TurtleState
{
    pos: vec3;
    dirAngle: vec3;

    constructor(inPos: vec3, inDir: vec3)
    {
        this.pos = new vec3(inPos);
        this.dirAngle = new vec3(inDir);
    }

    moveAlongVector(dis: vec3)
    {
        this.pos[0] = this.pos[0] + dis[0];
        this.pos[1] = this.pos[1] + dis[1];
        this.pos[2] = this.pos[2] + dis[2];
    }
};

class Turtle
{

    myStack: any;
    curState: TurtleState;
    //   mesh: any;
    renderGrammer: string;
    // A map thats maps a character to function pointers.
    renderDictionary: any;
    constructor(inMesh: any, inAngle: any, inGrammer: string){

        this.myStack = new Array<TurtleState>();  
        this.renderDictionary = new Map();
        this.initialRenderDictionary();
        
        this.curState = new TurtleState(vec3.fromValues(0,0,0), vec3.fromValues(0,0,0));
        if(inGrammer !== null)
        {
            this.renderGrammer = inGrammer;            
        }
    }

    clear()
    {
        this.curState = new TurtleState(vec3.fromValues(0,0,0), vec3.fromValues(0,0,0));
    }

    initialRenderDictionary(){
        // this.renderDictionary.set("A", function(){this.moveTurtle();});
        // this.renderDictionary.set("[", function(){this.saveState();});
        // this.renderDictionary.set("]", function(){this.popState();});
    }
    
    printState(){
        console.log(this.curState.pos);
        console.log(this.curState.dirAngle);
    }
    
    makeCylinder()
    {
        mat4.create()

       // this.curState.dir

    }
    makeLeaf()
    {

    }

    moveTurtle(dis: number)
    {
        var myMatrixX = mat4.create();
        var myMatrixY = mat4.create();
        var myMatrixZ = mat4.create();

        mat4.rotateX(myMatrixX, mat4.create(), this.curState.dirAngle[0]);
        mat4.rotateY(myMatrixY, mat4.create(), this.curState.dirAngle[1]);
        mat4.rotateZ(myMatrixZ, mat4.create(), this.curState.dirAngle[2]);

        var matrix1 = mat4.create();
        var myRotMatrix = mat4.create();
        
        mat4.multiply(matrix1, myMatrixY, myMatrixX);
        mat4.multiply(myRotMatrix, myMatrixZ, matrix1);
        
        var outVec4 = vec4.fromValues(0,0,0,0);
        vec4.transformMat4(outVec4, initialDir, myRotMatrix);

        var myDir = vec3.fromValues(outVec4[0], outVec4[1], outVec4[2]);
        
        vec3.normalize(myDir, myDir);
        var moveVec = vec3.fromValues(myDir[0] * dis, myDir[1] * dis, myDir[1] * dis);
        vec3.scaleAndAdd(this.curState.pos, this.curState.pos, moveVec, 1);
    }
    
    rotateTurtle(dir: vec3)
    {        
        vec3.scaleAndAdd(this.curState.dirAngle, this.curState.dirAngle, dir, 1);
    }

    saveState()
    {
        var oldState = new TurtleState(this.curState.pos, this.curState.dirAngle);
        this.myStack.push(oldState);
    }

    popState(){
        this.curState = this.myStack.pop();
    }

};

export default Turtle;