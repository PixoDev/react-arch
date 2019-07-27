import { existsSync, mkdirSync, writeFileSync, createWriteStream } from 'fs';
import { resolve, normalize } from 'path';
import { VsMessage } from './vsMessageException';
import { NamingGenerator } from './namingGenerator';
import { UserConfig } from '../models/userConfig.interface';
import { getUserConfig } from './userConfig';
import * as vscode from 'vscode';

export class DirUtils {
    private dir: string;
    private userConfig: UserConfig;
    constructor(dir?: string) {
        this.dir = dir;
        this.userConfig = getUserConfig();
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
        console.log(dirFolder);
        this.generateDirRecursive(dirFolder);
    }


    generateFile(content: string[]): boolean {
        const dir = this.dir;
        console.log(dir);
        this.generateDir();
        if (!existsSync(dir)) {
            this.writeFile(dir, content);
        } else {
            throw new VsMessage("This file already exists", true);
        }

        return true
    }

    emptyFile(dir:string) {
        if(existsSync(dir)) {
            writeFileSync(dir, "", "utf8");
        }
    }

    getRootDir() {
        return vscode.workspace.workspaceFolders[0].uri.fsPath;
    }


    writeFile(dir:string,content: string[]) {

        var stream = createWriteStream(dir, { flags: 'a' });
        content.forEach(function (item: string) {
            stream.write(item + "\n");
        });
        stream.end();
    }

    generateTestFile(content: string[], naming: NamingGenerator): boolean {
        let dir = resolve(this.dir, "../", naming.testFilename);
        if(this.userConfig.settings.independentTestFilesDirectory && !this.userConfig.settings.testsMirrorComponentsDirectory) {
            dir = resolve(this.getRootDir(), "test", naming.testFilename);
            this.generateDirRecursive(resolve(this.getRootDir(), "test"));
        }
        if (existsSync(dir)) {
            new VsMessage("This file already exists", true);
            return false
        } else {
            this.writeFile(dir, content);
        }
        

        return true
    }
}