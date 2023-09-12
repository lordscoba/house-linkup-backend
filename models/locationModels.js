const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stateSchema = new mongoose.Schema({
  region: String,
  states: [
    {
      _id: String,
      state: String,
      local_government: [
        {
          _id: String,
          local_government_name: String,
          towns: [
            {
              _id: String,
              town_name: String,
            },
          ],
        },
      ],
    },
  ],
});

// Create a model for the schema
const State = mongoose.model('State', stateSchema);
module.exports = State;

// const mongoose = require('mongoose');

// const dynamicFieldSchema = new mongoose.Schema(
//   {
//     // Allow any field name with any value
//     dynamicFields: {
//       type: Map,
//       of: mongoose.Schema.Types.Mixed,
//     },
//   },
//   { timestamps: true }
// );

// const DynamicFieldModel = mongoose.model('DynamicField', dynamicFieldSchema);

// module.exports = DynamicFieldModel;
