// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
import "./Diagnostic.sol";
contract ConsultationOnline {
    
    struct Consultation {
        uint id;
        address patient;
        address medecin;
        string infosSante;
        uint256 cout;
        bool paye;
        bool complete;
        //string[] messages;
    }
    struct AppointmentRequest {
        uint id;
        address client;
        address medecin;
        string date;
        string ville;
        uint accepted;
    }
     struct Doctor{
        string name;
        string specialite;
        address doct_add;
    }
    Doctor[] public doctor_information;
    Diagnostic.Patient[] public patient_information;
    Diagnostic public diagnostic;
    mapping(address => AppointmentRequest[]) public Doctor_appointmentRequests;
    mapping(address => AppointmentRequest[]) public Patient_appointmentRequests;
    mapping(address => Consultation[]) public Patient_consultations;
    //Consultation[] public consultations;
    constructor(address _adresseContratExterne) {
        diagnostic = Diagnostic(_adresseContratExterne);
    }
    modifier onlypatient() {
        require(diagnostic.patients(msg.sender), "The sender is not eligible to run this function");
        _;
    }

    modifier onlydoctor() {
        require(diagnostic.doctors(msg.sender), "The sender is not eligible to run this function");
        _;
    }

    modifier onlylaboratory() {
        require(diagnostic.laboratories(msg.sender), "The sender is not eligible to run this function");
        _;
    }

    modifier onlypharmacy() {
        require(diagnostic.pharmacy(msg.sender), "The sender is not eligible to run this function");
        _;
    }
    event NouvelleConsultation(address indexed patient, address indexed medecin, uint256 cout);
    event PaiementEffectue(uint256 indexed index, address indexed patient);
    event ConsultationComplete(uint256 indexed index);
    event NouveauMessage(uint256 indexed index, address indexed utilisateur, string message);
    function addDoctorInfo(string memory namedoc, string memory specialite) public onlydoctor{
        Doctor memory d;
        d.name=namedoc;
        d.specialite=specialite;
        d.doct_add=msg.sender;
        doctor_information.push(d);
    }
    function getdoct_add(string memory namedoc, string memory specialite) public view returns (address){
        for (uint256 i = 0; i< doctor_information.length; i++) {
            address doct_add = doctor_information[i].doct_add;
            Doctor memory doctor = doctor_information[i];
            if (keccak256(bytes(doctor.name)) == keccak256(bytes(namedoc)) && keccak256(bytes(doctor.specialite)) == keccak256(bytes(specialite))) {
                return doct_add;
            }
        }
        revert("Doctor not found.");
    }
    function getpatient_add(string memory namep, string memory dob) public view returns (address){
        for (uint256 i = 0; i< patient_information.length; i++) {
            address p_add = patient_information[i].patient_add;
            Diagnostic.Patient memory patient = patient_information[i];
            if (keccak256(bytes(patient.name)) == keccak256(bytes(namep)) && keccak256(bytes(patient.Birth_date)) == keccak256(bytes(dob))) {
                return p_add;
            }
        }
        revert("Doctor not found.");
    }
    
    function nouvelleConsultation(address _patient, string memory _infosSante, uint256 _cout) public onlydoctor  {
        require(msg.sender != _patient, "Le medecin et le patient ne peuvent pas etre la meme personne");
        require(_cout > 0, "Le cout de la consultation doit etre superieur a zero");
        //consultations.push(Consultation( _patient,msg.sender, _infosSante, _cout, false, false, new string[](0)));
        Patient_consultations[_patient].push(Consultation(Patient_consultations[_patient].length ,_patient,msg.sender, _infosSante, _cout, false, false/*, new string[](0)*/));
        emit NouvelleConsultation( _patient,msg.sender, _cout);
    }
    
    function effectuerPaiement(uint256 _indexCon, uint256 _indexRend) public payable onlypatient {
        require(_indexCon < Patient_consultations[msg.sender].length, "Index de consultation invalide");
        Consultation storage consultation = Patient_consultations[msg.sender][_indexCon];
        AppointmentRequest storage appointmentRequest = Patient_appointmentRequests[msg.sender][_indexRend];
        require(msg.sender == consultation.patient, "Seul le patient peut effectuer le paiement");
        require(msg.value == consultation.cout, "Le paiement doit correspondre au cout de la consultation");
        consultation.paye = true;
        appointmentRequest.accepted =3;
        emit PaiementEffectue(_indexCon, msg.sender);
    }
    
    /*function envoyerMessage(uint256 _index, string memory _message, address patient) public {
        require(_index < Patient_consultations[patient].length, "Index de consultation invalide");
        Consultation storage consultation = Patient_consultations[patient][_index];
        require(msg.sender == consultation.patient || msg.sender == consultation.medecin, "Vous n'etes pas autorise a envoyer des messages pour cette consultation");
        consultation.messages.push(msg.sender == consultation.patient ? string(abi.encodePacked("Patient : ", _message)) : string(abi.encodePacked("Medecin : ", _message)));
        emit NouveauMessage(_index, msg.sender, _message);
    }*/
    
    function marquerConsultationComplete(uint256 _index, address patient) public onlydoctor {
        require(_index < Patient_consultations[patient].length, "Index de consultation invalide");
        Consultation storage consultation = Patient_consultations[patient][_index];
        require(msg.sender == consultation.medecin, "Seul le medecin peut marquer la consultation comme complete");
        require(consultation.paye == true, "La consultation doit etre payee avant d'etre marquee comme complete");
        consultation.complete = true;
        emit ConsultationComplete(_index);
    }
    
    /*function getMessages(uint256 _index, address patient) public view returns (string memory) {
        require(_index <Patient_consultations[patient].length, "Index de consultation invalide");
        Consultation storage consultation = Patient_consultations[patient][_index];
        require(msg.sender == consultation.patient || msg.sender == consultation.medecin, "Vous n'etes pas autorise a acceder aux messages pour cette consultation");
        string memory allMessages = "";
        for (uint256 i = 0; i < consultation.messages.length; i++) {
            allMessages = string(abi.encodePacked(allMessages, "\n", consultation.messages[i]));
        }
        return allMessages;
    }*/
   
    function prendreRendezVous(address _medecin, string memory _date, string memory _ville) public onlypatient {
        AppointmentRequest memory request = AppointmentRequest({
            id: Patient_appointmentRequests[msg.sender].length,
            date: _date,
            ville: _ville,
            accepted: 0,
            client: msg.sender,
            medecin :_medecin
        });
        Patient_appointmentRequests[msg.sender].push(request);
        Doctor_appointmentRequests[_medecin].push(request);
    }

    function accepterRendezVous(uint id, address patient) public onlydoctor{
        AppointmentRequest storage Doctor_request;
        AppointmentRequest storage Patient_request;
        for(uint i=0; i<Doctor_appointmentRequests[msg.sender].length; i++){
            if(Doctor_appointmentRequests[msg.sender][i].id==id){
                Doctor_request=Doctor_appointmentRequests[msg.sender][i];
                require(Doctor_request.accepted!=1, "The appointment has already been accepted.");
                Doctor_request.accepted = 1;
                break;
            }
        }
        for(uint i=0; i<Patient_appointmentRequests[patient].length; i++){
            if(Patient_appointmentRequests[patient][i].id==id){
                Patient_request=Patient_appointmentRequests[patient][i];
                require(Patient_request.accepted!=1, "The appointment has already been accepted.");
                Patient_request.accepted = 1;
                break;
            }
        }
        
        
    }

    function refuserRendezVous(uint id, address patient) public onlydoctor {
        AppointmentRequest storage Doctor_request;
        AppointmentRequest storage Patient_request;
        for(uint i=0; i<Doctor_appointmentRequests[msg.sender].length; i++){
            if(Doctor_appointmentRequests[msg.sender][i].id==id){
                Doctor_request=Doctor_appointmentRequests[msg.sender][i];
                require(Doctor_request.accepted!=2, "The appointment has already been rejected.");
                Doctor_request.accepted = 2;
                break;
            }
        }
        for(uint i=0; i<Patient_appointmentRequests[patient].length; i++){
            if(Patient_appointmentRequests[patient][i].id==id){
                Patient_request=Patient_appointmentRequests[patient][i];
                require(Patient_request.accepted!=2, "The appointment has already been rejected.");
                Patient_request.accepted = 2;
                break;
            }
        }
        

    }
    /********************************************************************************************************/

    function addNewPatientInfo(address _patient_add, string memory  _name, string memory  _bloodtype, uint _weight, uint _height, uint _age,
        string memory  _Birth_date, string memory  _Gender) public  {
            
            Diagnostic.Patient memory p;
            p.name = _name;
            p.bloodtype = _bloodtype;
            p.weight = _weight;
            p.height = _height;
            p.age = _age;
            p.Birth_date=_Birth_date;
            p.Gender= _Gender;
            p.patient_add=_patient_add;
            diagnostic.addNewPatientInfo(p);
            patient_information.push(p);
        }

    function addPatientContact(address _patient_add, string memory _email, string memory _phone, string memory _Name_Emergency,string memory _Phone_Emergency,string memory _Relationship) public  {
        diagnostic.addPatientContact(_patient_add, _email, _phone, _Name_Emergency,_Phone_Emergency,_Relationship);
    }
    
    function ask_for_analyse(string memory analyse_name,uint id_record, address p, address lab )public onlydoctor{
        diagnostic.ask_for_analyse(analyse_name,id_record,p,lab,msg.sender);
    }
    function addPatientRecord (address _patient_add ) public onlydoctor{
        diagnostic.addPatientRecord(_patient_add, msg.sender);
    }
    function Add_Analyse_result(address p, uint id_analyse, string memory result, uint price) public onlylaboratory {
        diagnostic.Add_Analyse_result(p,id_analyse,result,price,msg.sender);
    }
    function pay_analyse (uint id,address payable lab ) public payable onlypatient {
        diagnostic.pay_analyse{value: msg.value}(id,lab,msg.sender);
    }
    function send_analyse_to_patinet (uint id_analyse, address patient) public onlylaboratory{
        diagnostic.send_analyse_to_patinet(id_analyse, patient,msg.sender);
    }
    function add_medecine(uint id_rec ,address patient, string memory name, string memory dosage, uint duration, string memory inst  )public onlydoctor{
        diagnostic.add_medecine(id_rec , patient, name, dosage, duration, inst);
    }
    function approve_pharmacy(address pharmacie,uint id_rec) public onlypatient {
        diagnostic.approve_pharmacy(pharmacie, id_rec,msg.sender);
    }
    function add_prescription_price(uint id,address patient,uint price) public onlypharmacy  {
        diagnostic.add_prescription_price(id,patient,price,msg.sender);
    }
    function pay_prescription (uint id,address payable phar ) public payable onlypatient {
        diagnostic.pay_prescription{value: msg.value} (id, phar,msg.sender );
    }
    function setDeliveryAddress(uint id_rec, address patient, address deliveryAddress) public onlypharmacy {
        diagnostic.setDeliveryAddress(id_rec,patient, deliveryAddress,msg.sender);
    }
    function deliverMedicines(uint id_rec, address pharmacie) public onlypatient  {
        diagnostic.deliverMedicines(id_rec, msg.sender,pharmacie);
    }
}
