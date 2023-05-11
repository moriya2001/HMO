const patientService = require('../services/patientService');


exports.createPatient = async (req, res) => {
  const { firstName, lastName, identityCard ,address ,dateOfBirth ,telephone ,mobilePhone ,coronaVirusDetails} = req.body;
  const picture = req.file;

  try {
    const patient = await patientService.createPatient(firstName, lastName, identityCard, picture, address, dateOfBirth, telephone, mobilePhone, coronaVirusDetails);
    res.status(201).json(patient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getPatients = async (req, res) => {
  try {
    const patients = await patientService.getPatients();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getNonVaccinatedPatients = async (req, res) => {
  try {
    const patients = await patientService.getNonVaccinatedPatients();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSickFromLastMonth = async (req, res) => {
  try {
    const patients = await patientService.getLastMonthSicks();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPatientById = async (req, res) => {
  const id = req.params.id;
  try {
    const patient = await patientService.getPatientById(id);
    if (!patient) {
      return res.status(404).send();
    }
    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePatient = async (req, res) => {
  const id = req.params.id;
  try {
    const patient = await patientService.updatePatient(id, req.body);
    if (!patient) {
      return res.status(404).send();
    }
    res.json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletePatient = async (req, res) => {
  const id = req.params.id;
  try {
    const patient = await patientService.deletePatient(id);
    if (!patient) {
      return res.status(404).send();
    }
    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
