import { ComponentGenerator } from './generateComponent';
export class ClassComponentGenerator  extends ComponentGenerator{

    constructor(inputPath: string) {
        super(inputPath, "class")
    }
    
}