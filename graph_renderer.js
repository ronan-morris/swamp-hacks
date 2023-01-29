class GraphRenderer{
    /**
     * Initializes a Graph Renderer object
     * @param    {document}  document       HTML document on which to render the graph
     * @param    {string}    canvasID       HTML canvas on which to render the graph
    */
    constructor(document, canvasID){
        this.ctx = document.getElementById(canvasID).getContext("2d");
        this.XROTATION = 0.2;
        this.YROTATION = -0.2;
        this.ZROTATION = 0.6;
    }

    /**
        * draws a line between two points on the object's linked canvas
        * @param    {Array}   xyzA       Point in 3d space to start at: [x,y,z]; domains [0,600], [-120,120], and [-80,80] for default axes
        * @param    {Array}   xyzB       Point in 3d space to end at
        * @param    {color}   color      What color to draw the line
    */
    drawLine(xyzA, xyzB, color){
        let x,y,z;
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        [x,y,z] = this.rotatexyz(xyzA, this.XROTATION, this.YROTATION, this.ZROTATION);
        if(x < -150){
            x = 0;
        }
        if(z < -150){
            z = 0;
        }
        this.ctx.moveTo(x+150,z+150);
        [x,y,z] = this.rotatexyz(xyzB, this.XROTATION, this.YROTATION, this.ZROTATION);
        if(x < -150){
            x = 0;
        }
        if(z < -150){
            z = 0;
        }
        this.ctx.lineTo(x+150,z+150);
        this.ctx.stroke();
    }
    drawUnrotatedLine(xyzA, xyzB, color){
        let x,y,z;
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        [x,y,z] = xyzA;
        this.ctx.moveTo(x+150,z+150);
        [x,y,z] = xyzB;
        this.ctx.lineTo(x+150,z+150);
        this.ctx.stroke();
    }
    /**
        * rotates a given point and returns its new coordinates
        * @param    {Array}   xyz     initial xyz coordinates
        * @param    {float}   a     angle of rotation about x axis
        * @param    {float}   b     angle of rotation about y axis
        * @param    {float}   c     angle of rotation about z axis (will be 0 for our purposes)
    */
    rotatexyz(xyz,a,b,c){ //a, b, c being rotations about x, y, and z axes
        let x = xyz[0];
        let y = xyz[1];
        let z = xyz[2];
        let newX = Math.cos(b)*Math.cos(c)*x + (Math.sin(a)*Math.sin(b)*Math.cos(c)-Math.cos(a)*Math.sin(c))*y
            +(Math.cos(a)*Math.sin(b)*Math.cos(c)+Math.sin(a)*Math.sin(c))*z;
        let newY = Math.sin(c)*Math.cos(b)*x + (Math.sin(a)*Math.sin(b)*Math.sin(c)+Math.cos(a)*Math.cos(c))*y
            +(Math.cos(a)*Math.sin(b)*Math.sin(c)-Math.sin(a)*Math.cos(c))*z;
        let newZ = -Math.sin(b)*x + Math.cos(b)*Math.sin(a)*y + Math.cos(b)*Math.cos(a)*z;
        return [newX, newY, newZ];
    }

    /**
        * draws a line between two points on the object's linked canvas
        * @param    {float}   timeScale      Scales the x-axis in length
        * @param    {float}   maxAmplitude   Height of the y-axis
    */
    renderAxes(timeScale = 3, maxAmplitude = 120){

        //x-axis
        this.drawLine([-100,0,0], [200 * timeScale,0,0], 'blue')
        //y-axis
        this.drawUnrotatedLine([0,0,-maxAmplitude], [0,0,maxAmplitude], 'green')
        //z-axis
        this.drawLine([0,-500,0], [0,100, 0], 'red')

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
    /**
        * draws a line between two points on the object's linked canvas
        * @param    {Array[Array]}   graphArr     nx2 array of x-values and z-values, x-value listed first
        * @param    {Array[Array]}   sineWavesArr    mx2 array of amplitudes and frequencies, amplitude listed first, color listed last
        * @param    {Array}  yCoordsArr           m+1 length array of the backshifts of each of the waves
    */
    renderWaves(graphArr, sineWavesArr, yCoordsArr){
        this.ctx.beginPath();
        this.ctx.moveTo(150,150);
        for(let i = 0; i < graphArr.length; i++)
        {
            let x = waveArr[i][0];
            let y = yCoordsArr[0];
            let z = waveArr[i][1];
            let newCoords = this.rotatexyz([x,y,z], this.XROTATION, this.YROTATION, this.ZROTATION);
            this.ctx.lineTo(newCoords[0]+150, newCoords[2]+150);
        }
        this.ctx.strokeStyle = "black";
        this.ctx.stroke();
        for(let i = 0; i < sineWavesArr.length; i++)
        {
            this.renderSinWave(sineWavesArr[0], sineWavesArr[1], sinWavesArr[2], yCoordsArr[1+i])
        }
    }
    /**
        * draws a line between two points on the object's linked canvas
        * @param    {float}   amplitude     amplitude of wave
        * @param    {float}   frequency     frequency of wave
        * @param    {string}  color         color of wave
        * @param    {float}   backshift     how far wave is positioned on y-axis
    */
    renderSinWave(amplitude, frequency, color, backshift)
    {
        this.ctx.beginPath();
        this.ctx.moveTo(150,150);
        for(let i = 0; i < 600; i+= 0.1)
        {
            let x = i;
            let y = -1*backshift;
            let z = amplitude*Math.sin(i/5*frequency);
            let newCoords = this.rotatexyz([x,y,z], this.XROTATION, this.YROTATION, this.ZROTATION);
            this.ctx.lineTo(newCoords[0]+150, newCoords[2]+150);
        }
        this.ctx.strokeStyle = color
        this.ctx.stroke();
    }

    renderPulseCodeModulationWave(pcmObj, color = 'black', backshift = 0){
        this.ctx.beginPath();
        this.ctx.moveTo(150,150);
        let pointArr = pcmObj.pointDefinitions;
        this.zScaleFactor = Math.floor(120 / Math.max(...pointArr))
        console.log(this.zScaleFactor)
        for(let i in pointArr)
        {
            let x = i;
            let y = -1*backshift;
            let z = pointArr[i] * this.zScaleFactor ;
            let newCoords = this.rotatexyz([x,y,z], this.XROTATION, this.YROTATION, this.ZROTATION);
            this.ctx.lineTo(newCoords[0]+150, newCoords[2]+150);
        }
        this.ctx.strokeStyle = color
        this.ctx.stroke();
    }

}
