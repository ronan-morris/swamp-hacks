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
        * draws a line between two points on the object's linked canvas
        * @param    {Array}   xyz                   Point in 3d space to project to 2d
        * @param    {float}   perspectiveRotation   How far the time axis is rotated 'out of the screen' in radians. Default is 0.5
        * @param    {float}   canvasHeight          Height of canvas (to center graph vertically)
        * @param    {float}   xOffset               2d x position of (0,0,0)
        * @param    {float}   zScale                Factor by which to scale z distances
    */
    threeDimsCoordsToTwo(xyz, perspectiveRotation = 0.5, canvasHeight = 400, xOffset = 100, zScale = 1.5){
        let [x, y, z] = xyz;
        zScale *= perspectiveRotation
        let x_2d = x  - Math.sin(perspectiveRotation) * z * zScale + xOffset;
        let y_2d = -y + Math.cos(perspectiveRotation) * z * zScale + canvasHeight / 2;
        return [x_2d,y_2d];
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
