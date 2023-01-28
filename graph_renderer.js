class GraphRenderer{

    /**
     * Initializes a Graph Renderer object
    */
    constructor(document, canvasID){
        this.ctx = document.getElementById(canvasID).getContext("2d")
    }

    /**
        * describes a strictly sinusodial wave
        * @param    {float}   timeScaleFactor       Scales the time axis such that the distance between tick marks is timeScaleFactor
        * @param    {float}   maxAmplitude          Scales vertical axis such that the highest value is maxAmplitude
        * @param    {float}   rotation              How far the time axis is rotated 'out of the screen' in radians. Default is 0.5
    */
    renderAxes(timeScaleFactor, maxAmplitude, rotation){
        this.ctx.beginPath();
        this.ctx.moveTo(threeDimsCoordsToTwo(0,0,0))
        this.ctx.lineTo(threeDimsCoordsToTwo(200,0,0))
        this.ctx.moveTo(threeDimsCoordsToTwo(0,-80,0))
        this.ctx.lineTo(threeDimsCoordsToTwo(0,80,0))
        this.ctx.moveTo(threeDimsCoordsToTwo(0,0,-80))
        this.ctx.lineTo(threeDimsCoordsToTwo(0,0,80))

    }

    threeDimsCoordsToTwo(x,y,z, xOffset = 50, zScale = 0.25, perspectiveRotation = 0.5){
        x_2d = x + Math.cos(perspectiveRotation) * z * zScale + xOffset;
        y_2d = y + Math.sin(perspectiveRotation) * z * zScale;
        return x_2d,y_2d;
    }

}