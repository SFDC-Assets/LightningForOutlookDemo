import {LightningElement,api,track,wire} from 'lwc';
import ServiceItemLookupByEmail from "@salesforce/apex/LWCOutlookController.ServiceItemLookupByEmail";
import ServiceItemSearch from "@salesforce/apex/LWCOutlookController.ServiceItemSearch";

export default class Outlook extends LightningElement {
    @api messageBody;
    @api subject;
    @api people;
    @api flexipageRegionWidth;
    
    @track serviceItems;
    @track hasServiceItems = false;
    @track performedSearch = false; 

    @track searchFirstName = 'Jarred';
    @track searchLastName = 'Peplay';    
    @track searchBirthDate = new Date('1955-02-08');  

    @track salesforceSearchCompleted = false;
    @track searchSalesforceResults;
    @track hasSalesforceResults = false;


    @track PCQSSearchCompleted = false;
    @track searchPCQSResults = [];
    @track hasPCQSResults = false;    

    activeSections = ['A', 'B', 'C'];

    handleSectionToggle(event) {
        const openSections = event.detail.openSections;
    }

    @wire(ServiceItemLookupByEmail, {emailAddress: '$people.from.email'})
    wiredServiceItemLookupByEmail({ error, data }) {
        if (data) {
            console.log(`Outlook.ServiceItemLookupByEmail SUCCESS`);
            console.log(`Found ${data.length} serviceItems`);
            this.error = undefined;
            if (data.length > 0){
                this.hasServiceItems = true;
                this.serviceItems = data;
            }
        } else if (error) {
            this.error = error;
            console.log(`Outlook.ServiceItemLookupByEmail ERROR: ${JSON.stringify(error)}`);
            this.serviceItems = undefined;
        }
    }

    

    renderedCallback() {
        console.log(`Incoming subject: ${undefined !== this.subject ? this.subject : ''}`);
        console.log(`Incoming people: ${undefined !== this.people ? this.people : ''}`);
        console.log(`Incoming messageBody: ${undefined !== this.messageBody ? JSON.stringify(this.messageBody) : ''}`);
    }

 
    searchFirstNameChange(event) {
        this.searchFirstName= event.target.value;
    }

    searchLastNameChange(event) {
        this.searchLastName= event.target.value;
    }

    searchBirthDateChange(event) {
        this.searchBirthDate= event.target.value;
    }
   
    // Handles click on the 'Show/hide content' button
    handleSearch() {
        this.performedSearch = true;
        this.activeSections = ['D'];

        ServiceItemSearch({
            firstName: this.searchFirstName,
            lastName: this.searchLastName,
            birthDate: this.searchBirthDate
        })
        .then((data) => {
            console.log("Outlook.ServiceItemSearch SUCCESS");
            console.log(`Found ${data.length} serviceItems`);
            this.searchSalesforceResults = data;
            this.error = undefined;
            if (data.length > 0){
                this.hasSalesforceResults = true;
            }
            this.salesforceSearchCompleted = true;
        })
        .catch((error) => {
            this.error = error;
            console.log(
                `Outlook.ServiceItemSearch ERROR: ${JSON.stringify(
            error
          )}`
            );
        });
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