import PointDefinedWave from "./wave_classes.js";
class AudioConverter{
    constructor(inputWave){
        this.inputWave = inputWave
    }

    getEnd(size = 512){
        let len = this.inputWave.pointArr.length
        if(len > 512){
            this.inputWave.pointArr.splice(0, len - 512)
        }
    }
}