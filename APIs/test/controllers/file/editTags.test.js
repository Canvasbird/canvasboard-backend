const {editFileTags} = require('../../../controllers/file/editTags');
const { Files} = require("../../../models/db");
const res = {
    json: function(d) {},
    status: function(s) {this.statusCode = s; return this;}
};
describe("editFileTags", () => {
    beforeAll(done => {
        done()
    });


    it("should respond with a 500 status code when isModified is true but return value is null", async () => {

        const mock = jest.spyOn(Files, 'findByIdAndUpdate');  // spy on Message.findOne()
        mock.mockImplementation(() => Promise.resolve(null));
        let req = {
            body: {
                "is_modified":"true"
            }
        }
        await editFileTags(req, res);
        expect(res.statusCode).toBe(500)
    });

    it("should respond with a 500 status code when isModified is false but return value is null", async () => {

        const mock = jest.spyOn(Files, 'findByIdAndUpdate');  // spy on Message.findOne()
        mock.mockImplementation(() => Promise.resolve(null));
        let req = {
            body: {
                "is_modified":"false"
            }
        }
        await editFileTags(req, res);
        expect(res.statusCode).toBe(500)
    });

    it("should respond with a 200 status code for an empty object returned by function", async () => {
        const mock = jest.spyOn(Files, 'findByIdAndUpdate');  // spy on Message.findOne()
        mock.mockImplementation(() => Promise.resolve({}));
        let req = {
            body: {
                "is_modified":"true"
            }
        }
        await editFileTags(req, res);
        expect(res.statusCode).toBe(200);
    });

    it("should respond with a 200 status code for an empty object returned by function", async () => {
        const mock = jest.spyOn(Files, 'findByIdAndUpdate');  // spy on Message.findOne()
        mock.mockImplementation(() => Promise.resolve({}));
        let req = {
            body: {
                "is_modified":"false"
            }
        }
        await editFileTags(req, res);
        expect(res.statusCode).toBe(200);
    });

    it("should respond with a 200 status code for an empty array returned by function", async () => {
        const mock = jest.spyOn(Files, 'findByIdAndUpdate');  // spy on Message.findOne()
        mock.mockImplementation(() => Promise.resolve([]));
        let req = {
            body: {
                "is_modified":"true"
            }
        }
        await editFileTags(req, res);
        expect(res.statusCode).toBe(200);
    });

    it("should respond with a 200 status code for an empty array returned by function", async () => {
        const mock = jest.spyOn(Files, 'findByIdAndUpdate');  // spy on Message.findOne()
        mock.mockImplementation(() => Promise.resolve([]));
        let req = {
            body: {
                "is_modified":"false"
            }
        }
        await editFileTags(req, res);
        expect(res.statusCode).toBe(200);
    });

});

afterAll(done => {
    done()
});
