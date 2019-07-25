import { existsSync, mkdirSync, writeFileSync } from 'fs';
import * as vscode from 'vscode';
import { resolve, normalize } from 'path';
import { VsMessage } from './vsMessageException';
import { NamingGenerator } from '../component-types/namingGenerator';
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

    generateDirRecursive(dir: string) {
        var path = normalize(dir).replace(/\\/g, '/').split('/');
        for (var i = 1; i <= path.length; i++) {
            var segment = path.slice(0, i).join('/');
            try {
                existsSync(segment) ?  null : mkdirSync(segment) ;
            } catch(e) {
                console.log("ERROR", e);
            }
            
        }
    }
    generateDir() {   
        const dirFolder = resolve(this.dir, "../");
        this.generateDirRecursive(dirFolder);
    }


    generateFile(content: string): boolean {
        const dir = this.dir;
        if (!this.isRootFile()) {
            
        }
        this.generateDir();
        if(!existsSync(dir)) {
            writeFileSync(dir, content, { encoding: 'utf8' });
        }else {
            throw new VsMessage("This file already exists", true);
        }
        
        return true
    }

    generateTestFile(content: string, naming: NamingGenerator): boolean {
        const dir = resolve(this.dir, "../") + "/" + naming.name + ".spec." + naming.extension;
        console.log("DIRT", dir);

        if(!existsSync(dir)) {
            writeFileSync(dir, content, { encoding: 'utf8' });
        }else {
            throw new VsMessage("This file already exists", true);
        }
        
        return true
    }
}