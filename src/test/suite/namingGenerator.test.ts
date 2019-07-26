import { assert } from "chai";
import { NamingGenerator } from "../../utils/namingGenerator";

describe("Naming generator component test", () => {
    let namingGenerator: NamingGenerator;
    beforeEach(() => {
        namingGenerator = new NamingGenerator("/test.tsx")
    })
    it("Naming generator generates a name", () => {
       
        assert.isTrue(typeof namingGenerator.name === "string" && namingGenerator.name.charAt(0) !== "/");
    })

    it("Naming generator generates a extension", () => {
       
        assert.isTrue(namingGenerator.extension === ("tsx" || "jsx"));
    })

    it("Component name starts with capital letter", () => {
       
        assert.isTrue(namingGenerator.componentName.charAt(0) == namingGenerator.name.charAt(0).toUpperCase());
    })

    it("Naming generator generates default spec extension", () => {
       
        assert.isTrue(namingGenerator.testExtension === "spec");
    })

    it("No extension provided return false", () => {
       
        assert.isFalse(new NamingGenerator("/test").generateExtension("/test"))
    })
}) 