// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Diagnostic {

    struct Patient  {
        string name;
        string bloodtype;
        uint weight;
        uint height;
        uint age;
        string Birth_date; 
        string Gender; 
        address patient_add;
    }
    struct PatientContact {
        string email;
        string phone;
        string Name_Emergency;
        string Phone_Emergency;
        string Relationship;
    }
    struct Analyse {
        uint id; //auto incriment
        string name;
        address patient;
        address doctor;
        string resultat;
        uint price;
        bool paid;
    }

    struct Record { // auto incriment
        uint id;
        //address p;
        uint[] test_id;
        Prescription prescription;
        string status;
        uint diagnostic_time;
        address doctor;
    }

    struct Prescription {
        address p;
        uint id_rec;
        address doctor;
        address pharmacie;
        uint[] medecines_id;
        uint price;
        bool isPaid;
        bool isDelivered;
        address deliveryAddress;
    }

    struct Medecine {
        uint id; //auto incriment 
        string name; 
        string dosage;
        uint duration;
        string instructions;
    }
    
    mapping(address => Patient) public patient_information;
    mapping(address => PatientContact) public patient_contact;
    mapping(address => Prescription[]) public pharmacie_prescriptions;
    mapping(address => Analyse[]) public patient_analyses;
    mapping(address => Record[]) public patient_records;
    mapping(address =>mapping(uint => Medecine[])) public patient_medecines;
    mapping(address => bool) public patients;
    mapping(address => bool) public doctors;
    mapping(address => bool) public pharmacy;
    mapping(address => bool) public laboratories;
    mapping(address => Analyse[]) public laboratory_analyses;
    address public manager;

    constructor() {
        manager = msg.sender;
    }

    modifier onlyManager() {
        require(manager == msg.sender, "The sender is not eligible to run this function");
        _;
    }

    

    function assigningdoctor(address user) public onlyManager {
        doctors[user] = true;
    }

    function assigninglaboratory(address user) public onlyManager {
        laboratories[user] = true;
    }

    function assigningpharmacy(address user) public onlyManager {
        pharmacy[user] = true;
    }
    
    function addNewPatientInfo(Patient memory p ) public  {
        patients[p.patient_add] = true;
        patient_information[p.patient_add]=p;
    }
    function addPatientContact(address _patient_add, string memory _email, string memory _phone, string memory _Name_Emergency,string memory _Phone_Emergency,string memory _Relationship) public  {
        PatientContact memory pc;
        pc.email=_email;
        pc.phone=_phone;
        pc.Name_Emergency=_Name_Emergency;
        pc.Phone_Emergency=_Phone_Emergency;
        pc.Relationship=_Relationship;
        patient_contact[_patient_add]=pc;
    }

    function addPatientRecord (address _patient_add, address doc  ) public {
         patient_records[_patient_add].push(Record({
        id: patient_records[_patient_add].length,
        
        test_id: new uint[](0),
        prescription:Prescription({
        p: _patient_add,
        id_rec:patient_records[_patient_add].length,    
        doctor:doc,
        pharmacie: address(0),
        medecines_id:new uint[](0),
        price :0,
        isPaid:false,
        isDelivered:false,
        deliveryAddress: address(0)

        }) ,
        status: "",
        diagnostic_time: block.timestamp,
        doctor: doc
        }));
        
    }
    function ask_for_analyse( string memory analyse_name,uint id_record, address p, address lab, address doc) public {
         
         Analyse memory a = Analyse({
             id: patient_analyses[p].length,
             name: analyse_name,
             patient: p,
             doctor: doc,
             resultat: "",
             price: 0,
             paid: false
         });
        require(laboratories[lab],"invalid laboratory"); 
        laboratory_analyses[lab].push(a);
        /*uint[] memory test_id_new = new uint[](patient_records[p][id_record].test_id.length + 1);
        for (uint i = 0; i < patient_records[p][id_record].test_id.length; i++) {
              test_id_new[i] = patient_records[p][id_record].test_id[i];
                  }*/
        //test_id_new[test_id_new.length - 1] = id_record; //patientanalyses[p].length
        patient_records[p][id_record].test_id.push(patient_analyses[p].length); //= test_id_new;
    }
   
    function Add_Analyse_result(address p, uint id_analyse, string memory result, uint price, address lab) public {
       Analyse[] memory analyses_recived =  laboratory_analyses[lab];
       for(uint i = 0; i<analyses_recived.length; i++){
           if(analyses_recived[i].patient==p && analyses_recived[i].id ==id_analyse )
           {
               analyses_recived[i].resultat=result;
               analyses_recived[i].price=price;
               laboratory_analyses[lab][i]=analyses_recived[i];
               break;
           }
       }
    }
    
   /* function View_analyse_doctor (address p, uint id) public view onlydoctor returns(Analyse memory) {
        Analyse memory a;
        Analyse[] memory analyses_done = patient_analyses[p];
        for(uint i = 0; i<analyses_done.length; i++){
           if(  analyses_done[i].id ==id )
           {
               return analyses_done[i];
           }
        }
        return a;
    }
    function view_analyse_patient ( uint id) public view onlypatient returns(Analyse memory) {
        Analyse memory a;
        Analyse[] memory analyses_done = patient_analyses[msg.sender];
       for(uint i = 0; i<analyses_done.length; i++){
           if(  analyses_done[i].id ==id )
           {
               return analyses_done[i];
           }
        }
        return a;
    }*/

    function pay_analyse (uint id,address payable lab, address patient ) public  payable{
        require(laboratories[address(lab)],"invalid laboratory"); 
        Analyse memory a ;
        uint index;
        Analyse[] memory analyses_done = laboratory_analyses[lab];
        for(uint i = 0; i<analyses_done.length; i++){
           if(  analyses_done[i].patient ==patient && analyses_done[i].id ==id )
           {
               a= analyses_done[i];
               index=i;
           }
        }
         require(!a.paid,"Analyse already paid");
         require(address(this).balance >= a.price);
         require(msg.value >= a.price);
         lab.transfer(a.price);
         a.paid=true;
         laboratory_analyses[lab][index]=a;
    }
    function send_analyse_to_patinet (uint id_analyse, address patient, address lab) public {
        Analyse[] memory analyses_recived =  laboratory_analyses[lab];
        for(uint i = 0; i<analyses_recived.length; i++){
           if(analyses_recived[i].patient==patient && analyses_recived[i].id ==id_analyse && analyses_recived[i].paid)
           {   patient_analyses[patient].push(analyses_recived[i]);
               break;
           }
       }
    }

    //Pharmacie Patient Doctor
    function add_medecine(uint id_rec ,address patient, string memory name, string memory dosage, uint duration, string memory inst  )public {
        patient_records[patient][id_rec].prescription.medecines_id.push(patient_medecines[patient][id_rec].length);
        patient_medecines[patient][id_rec].push(Medecine(patient_medecines[patient][id_rec].length,name,dosage,duration,inst));
    }
    function approve_pharmacy(address pharmacie,uint id_rec, address patient) public {
        patient_records[patient][id_rec].prescription.pharmacie=pharmacie;
        pharmacie_prescriptions[pharmacie].push(patient_records[patient][id_rec].prescription);
        
    }
    /*function read_medecine(address patient,uint id_rec)public view onlypharmacy returns(Medecine[] memory){
        return patient_medecines[patient][id_rec];
    }*/
    function add_prescription_price(uint id,address patient,uint price, address pharmacie) public  { //id record
        require(patient_records[patient][id].prescription.pharmacie==pharmacie,"You're not allowed to see prescription");
              patient_records[patient][id].prescription.price=price;
              for(uint i=0; i<pharmacie_prescriptions[pharmacie].length; i++){
            if(pharmacie_prescriptions[pharmacie][i].id_rec==id && pharmacie_prescriptions[pharmacie][i].p==patient){
                pharmacie_prescriptions[pharmacie][i].price=price;
                
                break;
            }
        }
        }
    
    function pay_prescription (uint id,address payable phar, address p ) public  payable {
        require(patient_records[p][id].prescription.pharmacie==phar,"invalid pharmacy"); 
        require(!patient_records[p][id].prescription.isPaid,"Prescription already paid");
        require(address(this).balance >= patient_records[p][id].prescription.price);
        require(msg.value >= patient_records[p][id].prescription.price);
        phar.transfer(patient_records[p][id].prescription.price);
        patient_records[p][id].prescription.isPaid=true;
        for(uint i=0; i<pharmacie_prescriptions[phar].length; i++){
            if(pharmacie_prescriptions[phar][i].id_rec==patient_records[p][id].prescription.id_rec && pharmacie_prescriptions[phar][i].p==p){
                pharmacie_prescriptions[phar][i].isPaid=true;
                break;
            }
        }
    }
    function setDeliveryAddress(uint id_rec, address patient, address deliveryAddress, address pharmacie) public  {
    patient_records[patient][id_rec].prescription.deliveryAddress= deliveryAddress;
    for(uint i=0; i<pharmacie_prescriptions[pharmacie].length; i++){
            if(pharmacie_prescriptions[pharmacie][i].id_rec==patient_records[patient][id_rec].prescription.id_rec && pharmacie_prescriptions[pharmacie][i].p==patient){
                pharmacie_prescriptions[pharmacie][i].deliveryAddress= deliveryAddress;
                break;
            }
        }
    }
    function deliverMedicines(uint id_rec,address patient,address pharmacie) public  {
    patient_records[patient][id_rec].prescription.isDelivered =true;
    for(uint i=0; i<pharmacie_prescriptions[pharmacie].length; i++){
            if(pharmacie_prescriptions[pharmacie][i].id_rec==patient_records[patient][id_rec].prescription.id_rec && pharmacie_prescriptions[pharmacie][i].p==patient){
                pharmacie_prescriptions[pharmacie][i].isDelivered =true;
                break;
            }
        }
}
}