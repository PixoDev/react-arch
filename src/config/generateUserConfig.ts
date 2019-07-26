import { DirUtils } from "../utils/dirUtils";
import { resolve } from "path";
import { readFileSync } from "fs";
import { configSnippet } from './configSnippet';
export const generateUserConfig = () => {
    const dirUtils = new DirUtils();

    const rootDir = dirUtils.getRootDir();
    dirUtils.emptyFile(resolve(rootDir, 'r-arch.config.json'));
    dirUtils.writeFile(resolve(rootDir, 'r-arch.config.json'), configSnippet)
}