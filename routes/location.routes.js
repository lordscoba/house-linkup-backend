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
  getAllCountry,
  fetchRegionById,
  findLocalGovById,
  findTownsById,
} = require('../controllers/locationManagement.controllers');

const Locationrouter = require('express').Router();

Locationrouter.post('/create-new-region', createNewRegion);
Locationrouter.post('/add-state/:documentId', updateState);
Locationrouter.post('/add-local-gov/:documentId', addLocalGovernment);
Locationrouter.post('/add-town/:documentId', addTowns);
// del state
Locationrouter.delete('/delete-region/:documentId', deleteRegion);
Locationrouter.delete('/delete-state', delState);
Locationrouter.delete('/delete-local-gov', deleteLocalGov);
Locationrouter.delete('/delete-town/:documentId', deleteTown);
Locationrouter.get('/all-regions', getAllCountry);
Locationrouter.get('/all-regions/:countryId', fetchRegionById);
Locationrouter.get('/all-local-gov/:id', findLocalGovById);
Locationrouter.get('/all-towns/:id', findTownsById);

module.exports = Locationrouter;
