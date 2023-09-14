const expressAsyncHandler = require('express-async-handler');
const State = require('../models/locationModels');
const { ObjectId } = require('mongodb');
const createNewRegion = expressAsyncHandler(async (req, res) => {
  try {
    // Create a new data document

    const { state, region } = req?.body;
    const newObjectId = new ObjectId();
    const value = {
      region,
      states: {
        _id: newObjectId.toString(),
        state,
      },
    };

    const newData = new State(value);
    await newData.save();
    res.status(201).json(newData);
  } catch (error) {
    res.status(500).json(error?.message);
  }
});

// UPDATE / ADD STATE
const updateState = expressAsyncHandler(async (req, res) => {
  try {
    const documentId = req.params.documentId;
    const document = await State.findById(documentId);
    const newObjectId = new ObjectId();
    const { state } = req?.body;
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }
    const check = document?.states?.find((x) => x?.state === state);
    if (check) {
      return res.status(404).json({ message: 'State Already Exist' });
    }
    const value = {
      _id: newObjectId.toString(),
      state,
    };

    // Add the new item to the array
    document.states.push(value);
    await document.save();
    return res.status(200).json(value);
  } catch (error) {
    res.status(500).json(error?.message);
  }
});

// UPDATE LOCAL GOVERNMENT

const addLocalGovernment = expressAsyncHandler(async (req, res) => {
  try {
    const documentId = req.params.documentId;
    const { stateId, local_government_name } = req?.body;
    const document = await State.findById({ _id: documentId });
    if (!document) {
      return res.status(404).json({ message: 'Not Found' });
    }
    const findState = document?.states?.find((x) => x._id === stateId);

    // GENERATE SPECIFIC ID
    const newObjectId = new ObjectId();
    // CREATE NEW OBJECT TO ADD
    const value = {
      _id: newObjectId.toString(),
      local_government_name,
    };

    // CHECK IF THE NEW FIELD EXIST
    const check = findState?.local_government?.find(
      (x) => x.local_government_name === local_government_name
    );
    if (check) {
      return res.status(400).json({
        message: `${local_government_name} Local Government already exist`,
      });
    }

    findState?.local_government?.push(value);

    await document.save();
    return res.status(200).json(document);
  } catch (error) {
    res.status(500).json(error?.message);
  }
});

// UPDATE TOWNS
const addTowns = expressAsyncHandler(async (req, res) => {
  try {
    const documentId = req.params.documentId;
    const { local_govId, stateId, town_name } = req?.body;
    // FIND THE REGION
    const document = await State.findById({ _id: documentId });
    if (!document) {
      return res.status(404).json({ message: 'Not Found' });
    }

    // GET THE STATE INDEX

    const stateIndex = document?.states.findIndex(
      (item) => item.id === stateId
    );
    // GET THE STATE NAME
    const stateName = document?.states[stateIndex]?.state;

    if (stateIndex === -1) {
      return res.status(404).json({ message: 'State not found' });
    }

    // FIND THE LOCAL GOV
    const findLocalGov = document?.states[stateIndex]?.local_government?.find(
      (x) => x._id === local_govId
    );

    // GENERATE SPECIFIC ID
    const newObjectId = new ObjectId();
    // CREATE NEW OBJECT TO ADD
    const value = {
      _id: newObjectId.toString(),
      town_name,
    };

    // CHECK IF THE NEW FIELD EXIST
    const check = findLocalGov?.towns?.find((x) => x?.town_name === town_name);
    if (check) {
      return res.status(400).json({
        message: `${town_name} Town already exist`,
      });
    }

    findLocalGov?.towns?.push(value);

    await document.save();
    return res.status(200).json({
      message: `${value?.town_name} Town has been created successfully in ${findLocalGov?.local_government_name} LGA ${stateName} State`,
    });
  } catch (error) {
    res.status(500).json(error?.message);
  }
});

// DELETE STATES

// DELETE REGION
const deleteRegion = expressAsyncHandler(async (req, res) => {
  try {
    const documentId = req.params.documentId;
    const document = await State.findById({ _id: documentId });
    if (!document) {
      return res.status(404).json({ message: 'Not Found' });
    }

    document.deleteOne();
    res
      .status(200)
      .json({ message: `${document?.region} is Deleted successfully` });
  } catch (error) {
    res.status(500).json(error?.message);
  }
});

// DELETE STATE

const delState = expressAsyncHandler(async (req, res) => {
  try {
    const { documentId, stateId } = req?.query;

    // FIND THE REGION OR COUNTRY
    const document = await State.findById({ _id: documentId });
    if (!document) {
      return res.status(404).json({ message: 'Not Found' });
    }

    const documentIndex = document?.states.findIndex(
      (item) => item.id === stateId
    );

    if (documentIndex === -1) {
      return res.status(404).json({ message: 'State not found' });
    }

    // EXTRACT THE STATE NAME TO BE DELETED
    // THIS IS USED TO SEND RESPONSE TO FRONTEND, SPECIFYING THE PARTICULAR STATE DELETED
    const nameOfStateToDelete = document?.states[documentIndex]?.state;

    // Remove the sub-array at the specified index using splice
    document?.states?.splice(documentIndex, 1);
    document.save();

    res.status(200).json({
      message: `${nameOfStateToDelete} state has been deleted`,
    });
  } catch (error) {
    res.status(500).json(error?.message);
  }
});

// DELETE LOCAL GOVERNMENT

const deleteLocalGov = expressAsyncHandler(async (req, res) => {
  try {
    const documentId = req.params.documentId;
    const { local_govId } = req?.body;
    // FIND THE REGION OR COUNTRY
    let document = await State.findById({ _id: documentId });
    if (!document) {
      return res.status(404).json({ message: 'Not Found' });
    }

    // GET THE INDEX OF THE LOCAL GOV TO DEL
    const localGovIndex = document?.states[0]?.local_government?.findIndex(
      (item) => item.id === local_govId
    );

    if (localGovIndex === -1) {
      return res.status(404).json({ message: 'Local Government not found' });
    }

    // EXTRACT THE LOCAL GOV NAME TO BE DELETED
    // THIS IS USED TO SEND RESPONSE TO FRONTEND, SPECIFYING THE PARTICULAR STATE DELETED
    const LGAName =
      document?.states[0]?.local_government[localGovIndex]
        ?.local_government_name;

    // Remove the sub-array at the specified index using splice
    document?.states[0]?.local_government?.splice(localGovIndex, 1);
    document.save();
    res.status(200).json({
      message: `${LGAName} state has been deleted`,
    });
  } catch (error) {
    res.status(500).json(error?.message);
  }
});

//*** */ DELETE TOWNS
// ********

const deleteTown = expressAsyncHandler(async (req, res) => {
  try {
    const documentId = req.params.documentId;
    const { townId, stateId, local_govId } = req?.body;
    // FIND THE REGION OR COUNTRY
    let document = await State.findById({ _id: documentId });
    if (!document) {
      return res.status(404).json({ message: 'Not Found' });
    }

    // GET THE STATE INDEX

    const stateIndex = document?.states.findIndex(
      (item) => item.id === stateId
    );
    // GET THE STATE NAME
    const stateName = document?.states[stateIndex]?.state;

    if (stateIndex === -1) {
      return res.status(404).json({ message: 'State not found' });
    }

    // GET THE INDEX OF THE LOCAL INDEX
    const localGovIndex = document?.states[
      stateIndex
    ]?.local_government?.findIndex((item) => item.id === local_govId);

    if (localGovIndex === -1) {
      return res.status(404).json({ message: 'Local Government not found' });
    }
    // GET THE LGA NAME
    const localGovName =
      document?.states[stateIndex]?.local_government[localGovIndex]
        ?.local_government_name;

    // GET THE INDEX OF THE TOWN INDEX
    const townIndex = document?.states[stateIndex]?.local_government[
      localGovIndex
    ]?.towns?.findIndex((item) => item.id === townId);

    // GET THE TOWN NAME

    const townName =
      document?.states[stateIndex]?.local_government[localGovIndex]?.towns[
        townIndex
      ]?.town_name;

    // REMOVE THE TOWN FROM TOWN ARRAY

    document?.states[stateIndex]?.local_government[
      localGovIndex
    ]?.towns?.splice(townIndex, 1);

    // SAVE YOUR DOCUMENT
    document?.save();

    res.status(200).json({
      message: `${townName} has been deleted Successfully from ${localGovName} LGA ${stateName} State`,
    });
  } catch (error) {
    res.status(500).json(error?.message);
  }
});

// GET ALL REGIONS
const getAllState = expressAsyncHandler(async (req, res) => {
  try {
    const states = await State.find({});

    if (!states) {
      return res.status(404).json({ message: 'No state Found' });
    }

    res.status(200).json(states);
  } catch (error) {
    res.status(500).json(error?.message);
  }
});

module.exports = {
  createNewRegion,
  updateState,
  getAllState,
  addLocalGovernment,
  addTowns,
  //
  deleteRegion,
  delState,
  deleteLocalGov,
  deleteTown,
};
