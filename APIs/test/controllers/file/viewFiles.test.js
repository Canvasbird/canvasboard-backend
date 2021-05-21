const {viewFiles} = require('../../../controllers/file/viewFiles');
const { Files, Folders } = require("../../../models/db");
const res = {
    json: function(d) {},
    status: function(s) {this.statusCode = s; return this;}
};

describe("viewFiles", () => {
    beforeAll(done => {
        done()
    });

    it("should respond with a 500 status code for an empty request body", async () => {

        await viewFiles({}, res);
        expect(res.statusCode).toBe(500)
    });
    it("should respond with a 500 status code for an empty return object values", async () => {
        const mockFile = jest.spyOn(Files, 'findById');  // spy on Message.findOne()
        mockFile.mockImplementation(() => Promise.resolve({}));
        const mockFolder = jest.spyOn(Folders, 'findById');  // spy on Message.findOne()
        mockFolder.mockImplementation(() => Promise.resolve({}));

        let req = {
            params: {
                "file_id":""
            }
        }
        await viewFiles(req, res);
        expect(res.statusCode).toBe(500)
    });
    it("should respond with a 500 status code for an empty return array values", async () => {
        const mockFile = jest.spyOn(Files, 'findById');  // spy on Message.findOne()
        mockFile.mockImplementation(() => Promise.resolve([]));
        const mockFolder = jest.spyOn(Folders, 'findById');  // spy on Message.findOne()
        mockFolder.mockImplementation(() => Promise.resolve([]));

        let req = {
            params: {
                "file_id":""
            }
        }
        await viewFiles(req, res);
        expect(res.statusCode).toBe(500)
    });
    it("should respond with a 500 status code for a null return value", async () => {
        const mockFile = jest.spyOn(Files, 'findById');  // spy on Message.findOne()
        mockFile.mockImplementation(() => Promise.resolve(null));
        const mockFolder = jest.spyOn(Folders, 'findById');  // spy on Message.findOne()
        mockFolder.mockImplementation(() => Promise.resolve(null));

        let req = {
            params: {
                "file_id":""
            }
        }
        await viewFiles(req, res);
        expect(res.statusCode).toBe(500)
    });
});

afterAll(done => {
    done();
});
