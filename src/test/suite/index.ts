"use strict";

import * as fs from "fs";
import * as glob from "glob";
import * as paths from "path";

const istanbul = require("istanbul");
const Mocha = require("mocha");
const remapIstanbul = require("remap-istanbul");

const tty = require("tty");
if (!tty.getWindowSize) {
    tty.getWindowSize = (): number[] => {
        return [80, 75];
    };
}

let mocha = new Mocha({
    ui: "tdd",
    colors: true,
});

function configure(mochaOpts): void {
    mocha = new Mocha(mochaOpts);
}
exports.configure = configure;

function _mkDirIfExists(dir: string): void {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
}

function _readCoverOptions(testsRoot: string): ITestRunnerOptions {
    let coverConfigPath = paths.join(testsRoot, "..", "..", "coverconfig.json");
    let coverConfig: ITestRunnerOptions = undefined;
    if (fs.existsSync(coverConfigPath)) {
        let configContent = fs.readFileSync(coverConfigPath, "utf-8");
        coverConfig = JSON.parse(configContent);
    }
    return coverConfig;
}

function run(testsRoot, clb): any {
    require("source-map-support").install();

    let coverOptions: ITestRunnerOptions = _readCoverOptions(testsRoot);
    if (coverOptions && coverOptions.enabled) {
        let coverageRunner = new CoverageRunner(coverOptions, testsRoot, clb);
        coverageRunner.setupCoverage();
    }

    glob("**/**.test.js", { cwd: testsRoot }, (error, files): any => {
        if (error) {
            return clb(error);
        }
        try {
            // Fill into Mocha
            files.forEach((f): Mocha => {
                return mocha.addFile(paths.join(testsRoot, f));
            });
            // Run the tests
            let failureCount = 0;

            mocha.run()
                .on("fail", (): void => {
                failureCount++;
            })
            .on("end", (): void => {
                clb(undefined, failureCount);
            });
        } catch (error) {
            return clb(error);
        }
    });
}
exports.run = run;

interface ITestRunnerOptions {
    enabled?: boolean;
    relativeCoverageDir: string;
    relativeSourcePath: string;
    ignorePatterns: string[];
    includePid?: boolean;
    reports?: string[];
    verbose?: boolean;
}

class CoverageRunner {

    private coverageVar: string = "$$cov_" + new Date().getTime() + "$$";
    private transformer: any = undefined;
    private matchFn: any = undefined;
    private instrumenter: any = undefined;

    constructor(private options: ITestRunnerOptions, private testsRoot: string, private endRunCallback: any) {
        if (!options.relativeSourcePath) {
            return endRunCallback("Error - relativeSourcePath must be defined for code coverage to work");
        }

    }

    public setupCoverage(): void {
        let self = this;
        self.instrumenter = new istanbul.Instrumenter({ coverageVariable: self.coverageVar });
        let sourceRoot = paths.join(self.testsRoot, self.options.relativeSourcePath);

	    let srcFiles = glob.sync("**/**.js", {
            cwd: sourceRoot,
            ignore: self.options.ignorePatterns,
        });

        let decache = require("decache");
        let fileMap = {};
        srcFiles.forEach( (file) => {
            let fullPath = paths.join(sourceRoot, file);
            fileMap[fullPath] = true;


            decache(fullPath);
        });

        self.matchFn = (file): boolean => { return fileMap[file]; };
        self.matchFn.files = Object.keys(fileMap);

 
        self.transformer = self.instrumenter.instrumentSync.bind(self.instrumenter);
        let hookOpts = { verbose: false, extensions: [".js"]};
        istanbul.hook.hookRequire(self.matchFn, self.transformer, hookOpts);

        global[self.coverageVar] = {};

   
        process.on("exit", () => {
            self.reportCoverage();
        });
    }

    public reportCoverage(): void {
        let self = this;
        istanbul.hook.unhookRequire();
        let cov: any;
        if (typeof global[self.coverageVar] === "undefined" || Object.keys(global[self.coverageVar]).length === 0) {
            console.error("No coverage information was collected, exit without writing coverage information");
            return;
        } else {
            cov = global[self.coverageVar];
        }

        self.matchFn.files.forEach( (file) => {
            if (!cov[file]) {
                self.transformer(fs.readFileSync(file, "utf-8"), file);
                Object.keys(self.instrumenter.coverState.s).forEach( (key) => {
                    self.instrumenter.coverState.s[key] = 0;
                });

                cov[file] = self.instrumenter.coverState;
            }
        });

        let reportingDir = paths.join(self.testsRoot, self.options.relativeCoverageDir);
        let includePid = self.options.includePid;
        let pidExt = includePid ? ("-" + process.pid) : "";
        let coverageFile = paths.resolve(reportingDir, "coverage" + pidExt + ".json");

        _mkDirIfExists(reportingDir);

        fs.writeFileSync(coverageFile, JSON.stringify(cov), "utf8");

        let remappedCollector = remapIstanbul.remap(cov, {warn: warning => {
            if (self.options.verbose) {
                console.warn(warning);
            }
        }});

        let reporter = new istanbul.Reporter(undefined, reportingDir);
        let reportTypes = (self.options.reports instanceof Array) ? self.options.reports : ["lcov"];
        reporter.addAll(reportTypes);
        reporter.write(remappedCollector, true, () => {
            console.log(`reports written to ${reportingDir}`);
        });
    }
}
