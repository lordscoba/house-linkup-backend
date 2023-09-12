const {
  updateState,
  getAllState,
  createNewRegion,
  addLocalGovernment,
  addTowns,
  delState,
  deleteLocalGov,
  deleteTown,
  deleteRegion,
} = require('../controllers/locationManagement.controllers');

const Locationrouter = require('express').Router();

Locationrouter.post('/create-new-region', createNewRegion);
Locationrouter.post('/add-state/:documentId', updateState);
Locationrouter.post('/add-local-gov/:documentId', addLocalGovernment);
Locationrouter.post('/add-town/:documentId', addTowns);
// del state
Locationrouter.delete('/delete-region/:documentId', deleteRegion);
Locationrouter.delete('/delete-state/:documentId', delState);
Locationrouter.delete('/delete-local-gov/:documentId', deleteLocalGov);
Locationrouter.delete('/delete-town/:documentId', deleteTown);
Locationrouter.get('/all-regions', getAllState);

module.exports = Locationrouter;
