const {lastAccessedModifiedFile} = require('../../../controllers/file/lastAccessFile');
const { Files} = require("../../../models/db");
const res = {
    json: function(d) {},
    status: function(s) {this.statusCode = s; return this;}
};
describe("lastAccessedModifiedFile", () => {
    beforeAll(done => {
        done()
    });

    it("should respond with a 200 status code when isModified is true ", async () => {

        const mock = jest.spyOn(Files, 'findByIdAndUpdate');  // spy on Message.findOne()
        mock.mockImplementation(() => Promise.resolve(null));
        let req = {
            body: {
                "is_modified":"true",
                "file_id":""
            }
        }
        await lastAccessedModifiedFile(req, res);
        expect(res.statusCode).toBe(200)
    });
    it("should respond with a 200 status code when isModified is false ", async () => {

        const mock = jest.spyOn(Files, 'findByIdAndUpdate');  // spy on Message.findOne()
        mock.mockImplementation(() => Promise.resolve(null));
        let req = {
            body: {
                "is_modified":"false",
                "file_id":""
            }
        }
        await lastAccessedModifiedFile(req, res);
        expect(res.statusCode).toBe(200)
    });

});

afterAll(done => {
    done()
});
