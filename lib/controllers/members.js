'use strict'

var mongoose = require('mongoose'),
    Member = mongoose.model('Member'),
    passport = require('passport');

/**
 * Create member
 */

exports.create = function(req, res){

  var newMember = new Member(req.body);
  if(req.user){
    newMember.formalGroup = req.user._id;
    newMember.save(function(err, member){
      if(err){
        console.log(err);
        return res.json(400, err);
      }else{
        return res.json(200, member);
      }
    });
  }else{
    return res.json(401,'Not Allowed');
  }
};

/**
 * Index all members
 */

exports.all = function(req, res){
  if(req.user){
    Member.find({'formalGroup':req.user.id}, function(err, members){
      if(err){
        console.log(err);
        return res.json(400,err);
      }else{
        return res.json(200,members);
      }
    });
  }else{
    return res.json(401,'Not Allowed');
  }
};

/**
 *  Remove a member
 * */
exports.remove = function(req, res){
  if(req.user){

  }else{
    return res.json(401,'Not Allowed');
  }
}
