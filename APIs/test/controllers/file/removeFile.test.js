const {removeFile} = require('../../../controllers/file/removeFile');

test("should respond with a 500 status code for an empty request body", async () => {
    const res = {
        json: function(d) {},
        status: function(s) {this.statusCode = s; return this;}
    }
    await removeFile({}, res);
    expect(res.statusCode).toBe(500)
})
