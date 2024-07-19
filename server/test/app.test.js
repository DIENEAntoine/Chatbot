const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

describe('Chatbot', () => {
    // Test pour vérifier la réponse de l'API sur une demande d'information de joueur
    it('should return player information', (done) => {
        chai.request('http://localhost:3000')
            .post('/chat')
            .send({ playerName: 'Messi' }) 
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('info');
                done();
            });
        });
    });