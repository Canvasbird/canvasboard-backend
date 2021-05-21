const {removeFile} = require('../../../controllers/file/removeFile');
const { Files, Folders } = require("../../../models/db");
const res = {
    json: function(d) {},
    status: function(s) {this.statusCode = s; return this;}
};

describe("removeFile", () => {
    beforeAll(done => {
        done()
    });

    it("should respond with a 500 status code for an empty request body", async () => {

        await removeFile({}, res);
        expect(res.statusCode).toBe(500)
    });

    it("should respond with a 500 status code for an empty query in request", async () => {

        let req = {
            query: {}
        }
        await removeFile(req, res);
        expect(res.statusCode).toBe(500)
    });

    it("should respond with a 500 status code for an empty folder_id in request", async () => {

        let req = {
            query: {
                "folder_id":""
            }
        }
        await removeFile(req, res);
        expect(res.statusCode).toBe(500)
    });

    it("should respond with a 500 status code for an empty folder_id in request but no mock", async () => {

        let req = {
            query: {
                "folder_id":"2"
            }
        }
        await removeFile(req, res);
        expect(res.statusCode).toBe(500)
    });

    it("should return a 200 response code for file does not exist in folder", async () => {
        const mockFolder = jest.spyOn(Folders, 'findById');  // spy on Message.findOne()
        mockFolder.mockReturnValue(Promise.resolve( new Folders({
            folder_name: 'random',
            folder_title:'Very random title',
            file_tag:'2',
            created_on:'',
            last_accessed_on:'',
            last_modified_on:'',
            is_nested_folder:false,
            folder_color:'blue',
            is_pinned:false
            })));
        const mockFile = jest.spyOn(Files, 'findByIdAndDelete');  // spy on Message.findOne()
        mockFile.mockImplementation(() => Promise.resolve({
            file_name: 'random',
            file_tag:'2',
            created_on:'',
            last_accessed_on:'',
            last_modified_on:'',
            data:{}
        }));

        let req = {
            query: {
                "folder_id":"2",
                "file_id":"1"
            }
        }
        await removeFile(req, res);
        expect(res.statusCode).toBe(200);
        mockFolder.mockRestore();  // restore Message.findOne()
        mockFile.mockRestore();
    });

    it("should return a 200 response code for file does exist in folder", async () => {
        const mockFolder = jest.spyOn(Folders, 'findById');  // spy on Message.findOne()
        mockFolder.mockReturnValue(Promise.resolve( new Folders({
            folder_name: 'random',
            folder_title:'Very random title',
            file_tag:'2',
            created_on:'',
            last_accessed_on:'',
            last_modified_on:'',
            is_nested_folder:false,
            folder_color:'blue',
            is_pinned:false,
            files: [{'file_id': '1'}]
        })));

        const mockFile = jest.spyOn(Files, 'findByIdAndDelete');  // spy on Message.findOne()
        mockFile.mockImplementation(() => Promise.resolve({
            file_name: 'random',
            file_tag:'2',
            created_on:'',
            last_accessed_on:'',
            last_modified_on:'',
            data:{}
        }));
        const mockFileReference = jest.fn();
        mockFileReference.mockReturnValue(Promise.resolve( new String("File Removed!")));
        let req = {
            query: {
                "folder_id":"2",
                "file_id":"1"
            }
        }
        await removeFile(req, res);
        expect(res.statusCode).toBe(200);
        mockFolder.mockRestore();  // restore Message.findOne()
        mockFile.mockRestore();
    });
});




afterAll(done => {
    done()
});
