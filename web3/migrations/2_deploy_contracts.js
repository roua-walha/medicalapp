const ConsultationOnline = artifacts.require("ConsultationOnline");
const Diagnostic = artifacts.require("Diagnostic");

module.exports = function(deployer) {
  deployer.deploy(Diagnostic).then(function() {
    return deployer.deploy(ConsultationOnline, Diagnostic.address);
  });
};