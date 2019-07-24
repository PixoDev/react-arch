import { ComponentGenerator } from './generateComponent';
export class FunctionalComponentGenerator  extends ComponentGenerator{

    constructor(inputPath: string) {
        super(inputPath, "function")
    }
    
}