class SinusodialWave{

    /**
    * describes a strictly sinusodial wave
    * @param    {float}   amplitude     Amplitude of the sinusodial wave
    * @param    {float}   frequency     Frequency of the sinusodial wave
    * @param    {bool}    isSin         True if sin wave, false if cos. Default is True
    */
    constructor(amplitude, frequency, isSin = true){
        this.amplitude = amplitude;
        this.frequency = frequency;
        this.isSin = isSin;
    }
}

class PointDefinedWave{
    /**
    * defines a wave by a set of points. 
    * Used for non-sinusoidial waves such as the original audio
    * @param    {float}   sampleRate    Frequency of different sample points in point array in a second
    * @param    {array}   pointArr      Contains points lying on the wave, with sampleRate number of them in a second
    */
    constructor(sampleRate, pointArr){
        this.sampleRate = sampleRate;
        this.pointArr = pointArr;
    }
}