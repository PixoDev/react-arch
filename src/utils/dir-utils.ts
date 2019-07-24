import { existsSync, mkdirSync, writeFileSync } from 'fs';
import * as vscode from 'vscode';
import { resolve, normalize } from 'path';
export class DirUtils {
    private dir: string
    constructor(dir: string) {
        this.dir = dir;
    }


    isRootFile() {
        let dirs = this.dir.split("/");
        if (dirs.length === 1) return true

        return false
    }

    sanitizeInput(): boolean {
        const dir = this.dir;
        let dirSplitted = dir.split("/");
        let lastItem = dirSplitted.slice(dirSplitted.length - 1)[0];
        console.log(dir, lastItem);
        /*  if(lastItem.indexOf(".tsx") !== -1 || lastItem.indexOf(".jsx") !== -1) {
             vscode.window.showInformationMessage("Directory name not valid");
             return false
         }  */
        return true
    }

    generateDirRecursive(dir: string) {
        var path = normalize(dir).replace(/\\/g, '/').split('/');
        for (var i = 1; i <= path.length; i++) {
            var segment = path.slice(0, i).join('/');
            !existsSync(segment) ? mkdirSync(segment) : null ;
        }
    }
    generateDir() {
        
        const dirFolder = resolve(this.dir, "../");
        console.log("DIR",this.dir, dirFolder);
        this.generateDirRecursive(dirFolder);
    }


    generateFile(content: string): boolean {
        const dir = this.dir;
        if (!this.isRootFile()) {
            
        }
        this.generateDir();
        writeFileSync(dir, content, { encoding: 'utf8' });
        return true
    }
}