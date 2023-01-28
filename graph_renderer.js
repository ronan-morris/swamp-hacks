class GraphRenderer{

    /**
     * Initializes a Graph Renderer object
    */
    constructor(document, canvasID){
        this.ctx = document.getElementById(canvasID).getContext
    }

    /**
        * describes a strictly sinusodial wave
        * @param    {float}   timeScaleFactor       Scales the time axis such that the distance between tick marks is timeScaleFactor
        * @param    {float}   maxAmplitude          Scales vertical axis such that the highest value is maxAmplitude
        * @param    {float}   rotation              How far the time axis is rotated 'out of the screen' in radians. Default is 0.5
    */
    renderAxes(timeScaleFactor, maxAmplitude, rotation){

    }

    threeDimsCoordsToTwo(x,y,z, zScale = 0.25, perspectiveRotation = 0.5){
        x_2d = x + Math.cos(perspectiveRotation) * z * zScale;
        y_2d = y + Math.sin(perspectiveRotation) * z * zScale;
        return x_2d,y_2d;
    }

}