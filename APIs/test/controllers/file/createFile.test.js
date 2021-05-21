const {createFile} = require('../../../controllers/file/createFile');
const { Folders, Files } = require("../../../models/db");
const res = {
    json: function(d) {},
    status: function(s) {this.statusCode = s; return this;}
};
describe("createFile", () => {
    beforeAll(done => {
        done()
    });

    it("should respond with a 500 status code for an empty request body", async () => {

        await createFile({}, res);
        expect(res.statusCode).toBe(500)
    });
    it("should respond with a 500 status code for an empty body in request", async () => {

        let req = {
            body: {
            }
        }
        await createFile(req, res);
        expect(res.statusCode).toBe(500)
    });
    it("should respond with a 500 status code for an empty file_name in body", async () => {

        let req = {
            body: {
                "file_name":""
            }
        }
        await createFile(req, res);
        expect(res.statusCode).toBe(500)
    });

});

afterAll(done => {
    done()
});
