import { assert } from "chai";
import { NamingGenerator } from "../../src/utils/namingGenerator";
import { before } from 'mocha';

suite("Naming generator component test", () => {
    let namingGenerator: NamingGenerator;
    before(() => {
        namingGenerator = new NamingGenerator("/test.tsx");
    });
    test("Naming generator generates a name", () => {
       
        assert.isTrue(typeof namingGenerator.name === "string" && namingGenerator.name.charAt(0) !== "/");
    });

    test("Naming generator generates a extension", () => {
       
        assert.isTrue(namingGenerator.extension === ("tsx" || "jsx"));
    });

    test("Component name starts with capitak letter", () => {
       
        assert.isTrue(namingGenerator.componentName.charAt(0) === namingGenerator.name.charAt(0).toUpperCase());
    });

    test("Naming generator generates default spec extension", () => {
       
        assert.isTrue(namingGenerator.testExtension === "spec");
    });

    test("No extension provided return false", () => {
       
    //assert.isFalse(new NamingGenerator("/test").generateExtension("/test"))
    });
});