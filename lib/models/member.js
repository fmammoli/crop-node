'use strict'

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    User = require('User');

/**
 * Member Schema
 */

var MemberSchema = Schema({
  name: String,
  cpf: {
    type: String,
    unique: true
  },
  rg: {
    type: String,
    unique: true
  },
  dap: {
    type: String,
    unique: true
  },
  address:{
    city: String,
    cep: String,
    address: String,
    state: String,
    number: String
  },
  contacts:{
    phone: String,
    cel: String
  },
  bank:{
    name: String,
    agency: String,
    cc: String
  },
  formalGroup: {
    type: ObjectId,
    ref: User
  }
});

/**
 * Validations
 */

// Validate empty email
MemberSchema
  .path('email')
  .validate(function(email) {
    return email.length;
  }, 'Email cannot be blank');

// Validate email is not taken
MemberSchema
  .path('email')
  .validate(function(value, respond) {
    var self = this;
    this.constructor.findOne({email: value}, function(err, member) {
      if(err) throw err;
      if(member) {
        if(self.id === member.id) return respond(true);
        return respond(false);
      }
      respond(true);
    });
  }, 'The specified email address is already in use.');


// Validate CPF is not taken
MemberSchema
  .path('cpf')
  .validate(function(value, respond) {
    console.log('checking cpf');
    console.log(value);
    var self = this;
    this.constructor.findOne({'cpf': value}, function(err, member){
      if(err) throw err;
      if(member){
        if(self.id === member.id) return respond(true);
        return respond(false);
      }
      respond(true);
    });
  }, 'Esse CPF ja esta cadastrado.');

// Validate dap is not taken
MemberSchema
  .path('dap')
  .validate(function(value, respond) {
    console.log('checking dap');
    console.log(value);
    var self = this;
    this.constructor.findOne({'dap': value}, function(err, member){
      if(err) throw err;
      if(member){
        if(self.id === member.id) return respond(true);
        return respond(false);
      }
      respond(true);
    });
  }, 'Essa DAP ja esta cadastrado.');

var validatePresenceOf = function(value) {
  return value && value.length;
};

module.exports = mongoose.model('Member', MemberSchema);