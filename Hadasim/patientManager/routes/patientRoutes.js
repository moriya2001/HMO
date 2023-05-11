const express = require('express');
const multer = require('multer');

const router = express.Router();
const patientController = require('../controllers/patientController');

const upload = multer();

router.post('/', upload.single('picture'), patientController.createPatient);
router.get('/', patientController.getPatients);
router.get('/non-vaccinated', patientController.getNonVaccinatedPatients);
router.get('/sick-from-last-month', patientController.getSickFromLastMonth);
router.get('/:id', patientController.getPatientById);
router.put('/:id', patientController.updatePatient);
router.delete('/:id', patientController.deletePatient);

module.exports = router;
