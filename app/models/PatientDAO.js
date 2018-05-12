function PatientDAO(connection){
    this._connection = connection();
}

PatientDAO.prototype.listPatient = function(callback){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("patients", function(err, collection){
            collection.find({}, function(err, patients){
                patients.toArray(callback);
            });
            mongoclient.close();
        });
    });
}

PatientDAO.prototype.insertPatient = function(dataPatient){
    var objPatient = {
        nome: dataPatient.nome,
        peso : dataPatient.peso,
        altura : dataPatient.altura,
        gordura : dataPatient.gordura,
        idTimeStamp: dataPatient.idTimeStamp,
        endereco : [{
            cep : dataPatient.cep,
            lat: dataPatient.latitude,
            long: dataPatient.longitude
        }]
    }
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("patients", function(err, collection){
            collection.insert(objPatient);

            mongoclient.close();
        });
    });
}

PatientDAO.prototype.deletePatient = function(idPatient){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("patients", function(err, collection){
            collection.remove({'idTimeStamp': idPatient});

            mongoclient.close();
        });
    });
}

PatientDAO.prototype.editPatient = function(idPatient, callback){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("patients", function(err, collection){

            collection.find({'idTimeStamp': idPatient}, function(err, patients){
                patients.toArray(callback);
            });
            mongoclient.close();
        });
    });
}

PatientDAO.prototype.updatePatient = function(dataPatient, callback){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("patients", function(err, collection){
            var objPatient = {
                nome: dataPatient.nome,
                peso : dataPatient.peso,
                altura : dataPatient.altura,
                gordura : dataPatient.gordura,
                idTimeStamp: dataPatient.idTimeStamp,
                endereco : [{
                    cep : dataPatient.cep,
                    lat: dataPatient.latitude,
                    long: dataPatient.longitude
                }]
            };
            console.log(objPatient);
            collection.update({'idTimeStamp': dataPatient.idTimeStamp},{$set: objPatient});

            mongoclient.close();
        });
    });
}

module.exports = function(){
    return PatientDAO;
}
