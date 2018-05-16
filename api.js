"use strict"

const AWS = require('aws-sdk')

let dynamodb = null

const enrollDB = {}

const table = 'ENROLL';

const Enroll = {
  TableName : "ENROLL",
  KeySchema: [       
    { AttributeName: "uid", KeyType: "HASH" },
    { AttributeName: "courseId", KeyType: "RANGE" }
  ],
  AttributeDefinitions: [       
    { AttributeName: "uid", AttributeType: "S" },
    { AttributeName: "courseId", AttributeType: "S" }
  ],
  GlobalSecondaryIndexes: [{
    IndexName: "ENROLL_BY_COURSE",
    KeySchema: [
      { AttributeName: "courseId", KeyType: "HASH"},     
    ],
    Projection: {
        ProjectionType: "ALL"
    },
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    }
  }],
  ProvisionedThroughput: {       
      ReadCapacityUnits: 1, 
      WriteCapacityUnits: 1
  }
}

const db = {
  _ready: false,

  createTable(done) {
    if (!this._ready) {
      console.error("DynamoDB is not ready yet")
      return this;
    }

    dynamodb.createTable(Enroll, function(err, data) {
      if (err) {
        done && done(err);
      } else {
        done && done();
      }
    });

    return this;
  },

  dropTable(done) {
    if (!this._ready) {
      console.error("DynamoDB is not ready yet")
      return this;
    }
    dynamodb.deleteTable({ TableName: table }, done)
  },

  getEnrollDetail({uid, courseId}, done) {
    if (!uid) {
      done && done({error: 'must specify uid'}, null)
      return
    }

    if (!courseId) {
      done && done({error: 'must specify courseId'}, null)
      return
    }
    
    const params = { 
      TableName: table, 
      Key:{
        "uid": uid,
        "courseId": courseId
      }
    }

    docClient.get(params, function(err, data) {
      if (err) {
          done && done({ error:`Unable to read item: ${JSON.stringify(err, null, 2)}`}, null);
      } else {
          done && done(null, data);
      }
    });

  },

  getEnrollList({uid}, done) {
    // to be implemented
  },

  createEnroll({uid, courseId, detail}, done) {
    // to be implemented
  },

  removeEnroll({uid, courseId}, done) {

  },

}
