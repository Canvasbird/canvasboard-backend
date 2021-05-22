const {viewChildFolders} = require('../../../controllers/folder/viewChildFolders');
const { Folders } = require("../../../models/db");
const res = {
    json: function(d) {},
    status: function(s) {this.statusCode = s; return this;}
};
describe("viewChildFolders", () => {
    beforeAll(done => {
        done()
    });

    it("should respond with a 500 status code for an empty request body", async () => {

        await viewChildFolders({}, res);
        expect(res.statusCode).toBe(500)
    });
});

afterAll(done => {
    done()
});
