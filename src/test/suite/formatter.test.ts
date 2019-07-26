import { assert } from "chai";
import { formatSnippet } from "../../utils/formatter";
import { NamingGenerator } from "../../utils/namingGenerator";

describe("Formatter function test", () => {
    const snippetTest = ["this is a formatted string test {-componentName-}"]
    const naming = new NamingGenerator("/test.tsx")
    it("Returns a formatted array of strings from an array of strings", () => {
        assert.isArray(formatSnippet(snippetTest, naming))
    })

    it("Format function returns an string with the {-componentName-} var replaced", () => {
        assert.isTrue(formatSnippet(snippetTest, naming).indexOf("{-componentName-}") === -1)
    })
    
    
}) 