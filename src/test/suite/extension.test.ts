import { assert } from "chai";
import * as vscode from "vscode";
import { ExtensionId } from "../../constants";

describe("basic extension tests", () => {
  it("extension is registered", () => {
    
    const extension = vscode.extensions.getExtension(ExtensionId);
    assert.isDefined(extension);
  });

});