import {
    LightningElement,
    api,
    track
} from 'lwc';
import ServiceItemLookup from "@salesforce/apex/LWCOutlookController.ServiceItemLookup";


const columns = [
    { label: 'Case Number', fieldName: 'Case_Number__c', button: {label: 'test', name: 'test'} },
    { label: 'P Name', fieldName: 'Plaintiff_First_Name__c'},
    { label: 'P Birth Date', fieldName: 'Plaintiff_Birthdate__c', type: 'date' },
    { label: 'Attorney', fieldName: 'Attorney_Name__c'},
    {   actions: [
        { label: 'Link', checked: false, name:'all' },
    ]}
];


export default class Outlook extends LightningElement {
    @api messageBody;
    @api subject;
    @api people;
    @track serviceItems = [];
    @track hasServiceItems = false;
    @track performingSearch = false;
    @track salesforceSearchCompleted = false;
    @track PCQSSearchCompleted = false;
    columns = columns;

    activeSections = ['A', 'B', 'C'];

    handleSectionToggle(event) {
        const openSections = event.detail.openSections;
    }



    renderedCallback() {
        console.log(`Incoming subject: ${undefined !== this.subject ? this.subject : ''}`);
        console.log(`Incoming people: ${undefined !== this.people ? this.people : ''}`);
        console.log(`Incoming messageBody: ${undefined !== this.messageBody ? JSON.stringify(this.messageBody) : ''}`);
        this.doServiceItemLookup();
    }

    doServiceItemLookup() {
        ServiceItemLookup({
                emailAddress: this.people.from.email
            })
            .then((data) => {
                console.log("Outlook.doServiceItemLookup SUCCESS");
                console.log(`Found ${data.length} serviceItems`);
                this.serviceItems = data;
                this.error = undefined;
                if (data.length > 0){
                    this.hasServiceItems = true;
                }
            })
            .catch((error) => {
                this.error = error;
                console.log(
                    `Outlook.doServiceItemLookup ERROR: ${JSON.stringify(
                error
              )}`
                );
            });
    }




// Handles click on the 'Show/hide content' button
handleSearch() {
    this.performingSearch = true;
    this.activeSections = ['C', 'D'];
}




    /*
     
        SAMPLE SERVICE ITEM RECORD

        {
        "Attorney_Company__c": "Cogilith LLC",
        "Attorney_Email__c": "rduxfield92@instagram.com",
        "Attorney_Name__c": "Reynard Duxfield",
        "Plaintiff_A_Number__c": "618864225",
        "Plaintiff_Birthdate__c": "1964-10-25",
        "Plantiff_Country_Of_Origin__c": "Indonesia",
        "Plaintiff_First_Name__c": "Reynard",
        "Plaintiff_Gender__c": "Male",
        "Plaintiff_Last_Name__c": "Duxfield",
        "Plaintiff_Port_of_Entry__c": "Tucson, Arizona - 2609",
        "Case_Number__c": "2216953611"
    },


    */


    get emailMessageBody() {
        return JSON.stringify(this.messageBody);
    }


}