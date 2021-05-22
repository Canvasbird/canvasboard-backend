const {createChildFolder} = require('../../../controllers/folder/addChildFolder');
const { Folders } = require("../../../models/db");
const res = {
    json: function(d) {},
    status: function(s) {this.statusCode = s; return this;}
};
describe("createChildFolder", () => {
    beforeAll(done => {
        done()
    });

    it("should respond with a 500 status code for an empty request body", async () => {

        await createChildFolder({}, res);
        expect(res.statusCode).toBe(500)
    });
    it("should respond with a 500 status code for an empty body in request", async () => {

        let req = {
            body: {
            }
        }
        await createChildFolder(req, res);
        expect(res.statusCode).toBe(500)
    });
    it("should respond with a 500 status code for an empty folder_name in body", async () => {

        let req = {
            body: {
                "folder_name":""
            }
        }
        await createChildFolder(req, res);
        expect(res.statusCode).toBe(500)
    });

});

afterAll(done => {
    done()
});
