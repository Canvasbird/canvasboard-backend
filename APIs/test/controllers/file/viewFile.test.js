const {viewFile} = require('../../../controllers/file/viewFile');
const { Files } = require("../../../models/db");
const res = {
    json: function(d) {},
    status: function(s) {this.statusCode = s; return this;}
};

describe("viewFile", () => {
    beforeAll(done => {
        done()
    });

    it("should respond with a 500 status code for an empty request body", async () => {

        await viewFile({}, res);
        expect(res.statusCode).toBe(500)
    });

    it("should return a 200 response code for proper request", async () => {
        const mock = jest.spyOn(Files, 'findById');  // spy on Message.findOne()
        mock.mockImplementation(() => Promise.resolve({
            file_name: 'random',
            file_tag:'2',
            created_on:'',
            last_accessed_on:'',
            last_modified_on:'',
            data:{}
        }));  // replace the implementation
        let req = {
            params: {
                "file_id":"1"
            }
        }
        await viewFile(req, res);
        expect(res.statusCode).toBe(200);
        mock.mockRestore();  // restore Message.findOne()
    });

    it("should respond with a 500 status code for an empty file_id body", async () => {

        let req = {
            params: {
                "file_id":""
            }
        }
        await viewFile(req, res);
        expect(res.statusCode).toBe(500)
    });

    it("should respond with a 500 status for a file_id but no mock", async () => {
        let req = {
            params: {
                "file_id":"1"
            }
        }
        await viewFile(req, res);
        expect(res.statusCode).toBe(500)
    });

});

afterAll(done => {
done();
});
