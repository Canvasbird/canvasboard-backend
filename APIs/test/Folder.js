const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require("../app")
const {Users} = require("../models/db")

chai.use(chaiHttp)

describe('Server Test', () => {

    const loginToken = "<loginTokenGoesHere>"
    const targetFolder = "<SomeFolderId>"
    const targetUser = "<SomeUserId>"

    it("Creates a new folder", (done) =>{
        let folder = {
            folder_name:"Folder From Test", 
            folder_title:"Folder Title From Test",
            user_id:targetUser
        }
        chai.request(app)
            .post("/api/v1/user/create-folder")
            .set("X-AUTH-TOKEN", loginToken)
            .send(folder)
            .end((err, res)=>{
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql("Folder Created!");
                  res.body.should.have.property('success').eql(true);
            })
        done()
    })

    it("Update folder naming attributes", (done) =>{
        let folder = {
            folder_id:targetFolder,
            folder_name:"Folder From Test", 
            folder_title:"Folder Title From Test",
            folder_tag: "New Tag"
        }
        chai.request(app)
            .post("/api/v1/user/rename-folder")
            .set("X-AUTH-TOKEN", loginToken)
            .send(folder)
            .end((err, res)=>{
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql("Folder Renamed!");
                  res.body.should.have.property('success').eql(true);
            })
        done()
    })

    it("Fetch User Folders", (done)=>{
        chai.request(app)
            .get("/api/v1/user/view-folders/"+targetUser)
            .set("X-AUTH-TOKEN", loginToken)
            .end((err, res)=>{
                console.log(res.body)
            })
        done()
    })
})
