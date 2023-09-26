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
  changeState,
  changeLga,
  changeTown,
} = require('../controllers/locationManagement.controllers');

const Locationrouter = require('express').Router();

Locationrouter.post('/create-new-region', createNewRegion);
Locationrouter.post('/add-state/:documentId', updateState);
Locationrouter.post('/add-local-gov/:documentId', addLocalGovernment);
Locationrouter.post('/add-town', addTowns);
// del state
Locationrouter.delete('/delete-region', deleteRegion);
Locationrouter.delete('/delete-state', delState);
Locationrouter.delete('/delete-local-gov', deleteLocalGov);
Locationrouter.delete('/delete-town', deleteTown);
Locationrouter.get('/all-regions', getAllCountry);
Locationrouter.get('/all-regions/:countryId', fetchRegionById);
Locationrouter.get('/all-local-gov/:id', findLocalGovById);
Locationrouter.get('/all-towns/:id', findTownsById);
// update
Locationrouter.put('/update-state', changeState);
Locationrouter.put('/update-local-gov', changeLga);
Locationrouter.put('/update-town', changeTown);

module.exports = Locationrouter;
