import { assert, expect, should} from 'chai';
import { ComponentGenerator } from '../src/component/generateComponent';
import { resolve } from 'path';
const expectChai = expect;
it("Should generate a ComponentGenerator class", () => {
    const component = new ComponentGenerator(resolve(__dirname), "function"),

    expectChai(component).to.be
})