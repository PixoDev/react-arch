import { existsSync, mkdirSync, writeFileSync, createWriteStream } from 'fs';
import { resolve, normalize } from 'path';
import { VsMessage } from './vsMessageException';
import { NamingGenerator } from './namingGenerator';

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
                existsSync(segment) ? null : mkdirSync(segment);
            } catch (e) {
                console.log("ERROR", e);
            }
        }
    }

    generateDir() {
        const dirFolder = resolve(this.dir, "../");
        this.generateDirRecursive(dirFolder);
    }


    generateFile(content: string[]): boolean {
        const dir = this.dir;
        console.log(dir);
        if (!this.isRootFile()) {

        }
        this.generateDir();
        if (!existsSync(dir)) {
            this.writeFile(dir, content);
        } else {
            throw new VsMessage("This file already exists", true);
        }

        return true
    }


    writeFile(dir:string,content: string[]) {

        var stream = createWriteStream(dir, { flags: 'a' });
        content.forEach(function (item: string) {
            stream.write(item + "\n");
        });
        stream.end();
    }

    generateTestFile(content: string[], naming: NamingGenerator): boolean {
        const dir = resolve(this.dir, "../", naming.testFilename);
        if (existsSync(dir)) {
            throw new VsMessage("This file already exists", true);
        } 
        this.writeFile(dir, content);

        return true
    }
}