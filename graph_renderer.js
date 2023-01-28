//import wave_renderer from "./wave_renderer.js";
class GraphRenderer{

    /**
     * Initializes a Graph Renderer object
     * @param    {document}  document       HTML document on which to render the graph
     * @param    {string}    canvasID       HTML canvas on which to render the graph
    */
    constructor(document, canvasID){
        this.ctx = document.getElementById(canvasID).getContext("2d");
    }

    /**
        * draws a line between two points on the object's linked canvas
        * @param    {Array}   xyzA       Point in 3d space to start at: [x,y,z]; domains [0,600], [-120,120], and [-80,80] for default axes
        * @param    {Array}   xyzB       Point in 3d space to end at
        * @param    {float}   rotation   How far the time axis is rotated 'out of the screen' in radians. Default is 0.5
        * @param    {color}   color      What color to draw the line
    */
    drawLine(xyzA, xyzB, rotation, color){
        let x,y;
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        [x,y] = this.threeDimsCoordsToTwo(xyzA, rotation);
        this.ctx.moveTo(x,y);
        [x,y] = this.threeDimsCoordsToTwo(xyzB, rotation);
        this.ctx.lineTo(x,y);
        this.ctx.stroke();
    }

    /**
        * rotates a given point and returns its new coordinates
        * @param    {Array}   x     initial x coordinate
        * @param    {float}   y     initial y coordinate
        * @param    {float}   z     initial z coordinate
        * @param    {float}   a     angle of rotation about z axis
        * @param    {float}   b     angle of rotation about y axis
        * @param    {float}   c     angle of rotation about x axis (will be 0 for our purposes)
    */
    rotatexyz(x,y,z,a,b,c){ //a, b, c being rotations about z, y, and x axes
        let newX = Math.cos(a)*Math.cos(b)*x + (Math.cos(a)*Math.sin(b)*Math.sin(c)-Math.sin(a)*Math.cos(c))*y
            +(Math.cos(a)*Math.sin(b)*Math.cos(c)+Math.sin(a)*Math.sin(c))*z;
        let newY = Math.sin(a)*Math.cos(b)*x + (Math.sin(a)*Math.sin(b)*Math.sin(c)+Math.cos(a)*Math.cos(c))*y
            +(Math.sin(a)*Math.sin(b)*Math.cos(c)-Math.cos(a)*Math.sin(c))*z;
        let newZ = -Math.sin(b)*x + Math.cos(b)*Math.sin(c)*y + Math.cos(b)*Math.cos(c)*z;
        return [newX, newY, newZ];
    }

    /**
        * draws a line between two points on the object's linked canvas
        * @param    {float}   timeScale      Scales the x-axis in length
        * @param    {float}   maxAmplitude   Height of the y-axis
        * @param    {float}   rotation       How far the time axis is rotated 'out of the screen' in radians. Default is 0.5
    */
    renderAxes(timeScale = 3, maxAmplitude = 120, rotation = 0.5){

        //x-axis
        this.drawLine([0,0,0], [200 * timeScale,0,0], rotation, 'blue')
        //y-axis
        this.drawLine([0,-maxAmplitude,0], [0,maxAmplitude,0], rotation, 'green')
        //z-axis
        this.drawLine([0,0,-120], [0,0, 120], rotation, 'red')

    }

    //for scale testing purposes
    renderCube(size){
        let rotation = 0.5
        this.drawLine([0,size,size], [size,size,size], rotation, 'blue')
        this.drawLine([size,0,size], [0,0,size], rotation, 'blue')
        this.drawLine([size,size,0], [0,size,0], rotation, 'blue')
        this.drawLine([size,0,size], [size,size,size], rotation, 'green')
        this.drawLine([0,size,size], [0,0,size], rotation, 'green')
        this.drawLine([size,size,0], [size,0,0], rotation, 'green')
        this.drawLine([size,size,0], [size,size,size], rotation, 'red')
        this.drawLine([size,0,size], [size,0,0], rotation, 'red')
        this.drawLine([0,size,size], [0,size,0], rotation, 'red')
    }

    renderWaves(waveArr, zCoordsArr){

    }
    

}
