const Patient = require('../models/Patient');
const datesService = require('./datesService');

exports.createPatient = (firstName, lastName, identityCard, picture) => {
  const patient = new Patient({ firstName, lastName, identityCard });

  if (picture) {
    patient.picture.data = picture.buffer;
    patient.picture.contentType = picture.mimetype;
  }

  // await patient.save();
  return Patient.create(patient);
};

exports.getPatients = () => {
  return Patient.find();
};

exports.getNonVaccinatedPatients = () => {
  return Patient.find({
    $or: [
      {
        'coronaVirusDetails.receivedVaccines': {
          $size: 0,
        },
      },
      {
        'coronaVirusDetails.receivedVaccines': {
          $exists: false,
        },
      }
    ]

  }).select({
    firstName: 1,
    lastName: 1,
  });
};

exports.getLastMonthSicks = () => {
  const lastMonth = datesService.subtractFromDate(new Date(), 30, 'day');
  return Patient.find({
    $or: [
      {
        $and: [
          {
            'coronaVirusDetails.positiveResultDate': {
              $gt: lastMonth,
            }
          },
          {
            'coronaVirusDetails.positiveResultDate': {
              $lt: new Date(),
            }
          },
        ]

      },
      {
        $and: [
          {
            'coronaVirusDetails.recoveryDate': {
              $gt: lastMonth,
            }
          },
          {
            'coronaVirusDetails.recoveryDate': {
              $lt: new Date(),
            }
          },
        ]
      }
    ]
  }).select({
    firstName: 1,
    lastName: 1,
    'coronaVirusDetails.positiveResultDate': 1,
    'coronaVirusDetails.recoveryDate': 1,
  });
};

exports.getPatientById = (id) => {
  return Patient.findById(id);
};

exports.updatePatient = (id, patient) => {
  return Patient.findByIdAndUpdate(id, patient, { new: true });
};

exports.deletePatient = (id) => {
  return Patient.findByIdAndDelete(id);
};
