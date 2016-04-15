import Mongoose from 'mongoose';
import mongoosastic from 'mongoosastic';
// import User from './user';

const projectSchema = new Mongoose.Schema({
  'createdBy': {
  	'type': Mongoose.Schema.Types.ObjectId,
    'ref': 'User'
    // 'es_schema': User, 
    // 'es_select': 'name',
    // 'es_indexed': true
  },

  'project_name': {
    'type': String,
    'unique': true,
    'required': true,
    'es_indexed':true
  },

  'short_description': {
    'type': String,
    'unique': true,
    'required': true,
    'es_indexed':true
  },

  'long_description': {
    'type': String,
    'unique': true,
    'required': true
  },

  'funding_goal': {
    'type': Number,
    'required': true,
    'es_indexed':true
  },

  'funding_end_date': {
    'type': Date,
    'default': new Date(+new Date() + 7*24*60*60*1000), //7 days later from now
    'es_indexed':true
  },

  'file_path': {
    'type': String,
    'es_indexed':true
  },

  'current_funding': {
    'type': Number,
    'default': 0,
    'es_indexed':true
  },

  // 'estimated_delivery': {
  //   'type': Date,
  //   'required': true
  // },

  location: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true,
    'es_indexed':true
  },

  backerUserIds: [{
    type: String
  }],

  comments: [{
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],

  rewards: [{
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Reward'
  }]

});

projectSchema.plugin(mongoosastic, {
  hosts: [
    'localhost:9200' // Port to use elasticsearch
  ]
  // populate: [
  //   {path: 'createdBy'}
  // ]
});

const Project = Mongoose.model('Project', projectSchema);
export default Project;
