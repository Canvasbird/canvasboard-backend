const {editFileData} = require('../controllers/file/editFile');
const res = {
    json: function(d) {
    },
    status: function(s) {this.statusCode = s; return this;}
};
beforeAll(done => {
    done()
});
describe('Sample Test', () => {
    it('should test that true === true', () => {
        expect(true).toBe(true)
    })
});
afterAll(done => {
    done()
});
