var db = require("../models/db");
var config = require("../config/config");
var html2json = require('html2json').html2json;
var json2html = require('html2json').json2html;


function getUserBoards(req, res) {

    try {

        db.Users.findOne({
            _id: db.mongoose.Types.ObjectId(req.token.user_id)
        }, (err, user) => {

            if (err) {
                console.error(err);
                res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            if (user) {

                db.Boards.find({
                    user_id: db.mongoose.Types.ObjectId(req.token.user_id)
                }, (err, boards) => {

                    if (err) {
                        console.error(err);
                        res.status(500).json({
                            success: false,
                            message: err.message
                        });
                    }

                    for(board in boards) {
                        boards[board].board_html = json2html(boards[board].board_data);
                    }
                    
                    return res.status(200).json({
                        success: true,
                        boards: boards
                    });

                });
            }
            else {
                return res.status(500).json({
                    success: false,
                    message: "User not found"
                });
            }

        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }

}

function getUserBoardData(req, res) {

    try {

        if(!req.query.board_id) {
            throw new Error("board_id");
        }

        db.Users.findOne({
            _id: db.mongoose.Types.ObjectId(req.token.user_id),
        }, (err, user) => {

            if (err) {
                console.error(err);
                res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            if (user) {

                db.Boards.findOne({
                    user_id: db.mongoose.Types.ObjectId(req.token.user_id),
                    _id: db.mongoose.Types.ObjectId(req.query.board_id),
                }, (err, board) => {

                    if (err) {
                        console.error(err);
                        res.status(500).json({
                            success: false,
                            message: err.message
                        });
                    }

                    if(board) {

                        board = board.toObject();

                        console.log(board);

                        board.board_html = json2html(board.board_data);

                        console.log('========================');

                        console.log(board);

                        return res.status(200).json({
                            success: true,
                            board: board
                        });
                    }
                    else{
                        return res.status(500).json({
                            success: false,
                            message: "Board not found"
                        });
                    }

                });
            }
            else {
                return res.status(500).json({
                    success: false,
                    message: "User not found"
                });
            }

        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }

}


function saveUserBoardData(req, res) {

    try {

        if(!req.body.board_name){
            throw new Error("board_name is required.")
        }

        if(!req.body.board_data){
            throw new Error("board_data is required.")
        }

        req.body.board_data = html2json(req.body.board_data);

        var new_board = db.Boards({
            user_id: req.token.user_id,
            board_name: req.body.board_name,
            board_desc: req.body.board_desc,
            board_data: req.body.board_data,
            board_img: req.body.board_img,
            created_at: Date.now(),
            updated_at: Date.now(),
        })

        new_board.save((err, data) => {

            if (err) {
                console.error(err);
                res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            if(data) {
                res.status(200).json({
                    success: true,
                    board_id: data._id,
                    message: "Board Saved Successfully"
                });
            }
            else{
                res.status(500).json({
                    success: false,
                    message: "Something went wrong, try again later."
                });
            }

        });
        
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }

}

// data = `<div class="container">
//   <div class="row justify-content-center">
//     <div class="buttons">
//       <button class="btn btn-outline-primary" routerLink="/board"><strong>Launch Board</strong></button>
//       <button class="btn btn-outline-danger" routerLink="/file-explorer"><strong>File Explorer</strong></button>
//     </div>
//   </div>
// </div>`

// html = json2html(json);

module.exports = {
    getUserBoards,
    saveUserBoardData,
    getUserBoardData
}