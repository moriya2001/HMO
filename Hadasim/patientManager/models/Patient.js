const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    identityCard: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    telephone: {
        type: String,
        required: true
    },
    mobilePhone: {
        type: String,
        required: true
    },
    picture: {
        data: Buffer,
        contentType: String
    },
    coronaVirusDetails: {
        receivedVaccines: [
            new mongoose.Schema({
                manufacturer: {
                    type: String
                },
                date: {
                    type: Date
                },
            })
        ],
      
        positiveResultDate: {
            type: String,
        },
        recoveryDate: {
            type: String
        }
    }
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
