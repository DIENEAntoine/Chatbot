const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index'); // Assurez-vous que le chemin vers votre fichier app est correct

chai.use(chaiHttp);
chai.should();

describe("POST /chat", () => {
    // Test pour vérifier que le serveur répond avec un statut 400 si le message est vide
    it("should return status 400 if message is empty", (done) => {
        chai.request(index)
            .post('/chat')
            .send({})
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    // Ajoutez d'autres tests selon vos besoins
});