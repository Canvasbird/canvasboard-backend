const {editFileData} = require('../controllers/file/editFile');
const res = {
    json: function(d) {
        console.log("\n : " + d);;
    },
    status: function(s) {this.statusCode = s; return this;}
};
describe('Sample Test', () => {
    it('should test that true === true', () => {
        expect(true).toBe(true)
    })
})
