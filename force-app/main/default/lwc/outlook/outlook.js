import {LightningElement,api,track,wire} from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import ServiceItemLookupByEmail from "@salesforce/apex/LWCOutlookController.ServiceItemLookupByEmail";
import ServiceItemSearch from "@salesforce/apex/LWCOutlookController.ServiceItemSearch";
import Id from '@salesforce/user/Id';

import SERVICE_ITEM_OBJECT from '@salesforce/schema/Service_Item__c';
import EMAIL_MESSAGE_OBJECT from '@salesforce/schema/EmailMessage';
import TASK_OBJECT from '@salesforce/schema/Task';

import USER_USERNAME_FIELD from '@salesforce/schema/User.Username';


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

    userId = Id;
    activeSections = ['A', 'B', 'C'];

    handleSectionToggle(event) {
        const openSections = event.detail.openSections;
    }

    @wire(getRecord, { recordId: '$userId', fields: [USER_USERNAME_FIELD]})
    user

    get userUsername() {
        return getFieldValue(this.user.data, USER_USERNAME_FIELD);
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
            console.log(`Outlook.ServiceItemSearch ERROR: ${JSON.stringify(error)}`);
        });

        let endPoint = 'https://d3gngjazxr3e0y.cloudfront.net/USCIS%20PCQS%20Service.json';

        fetch(endPoint, {method:"GET", mode:"no-cors"})
        .then((response) => {
            if (!response.ok) {
                this.error = response;
                console.log(`Outlook.fetch ERROR: ${JSON.stringify(response)}`);
            }

            return response.json();
        })
        .then((jsonResponse) => {
            console.log("Outlook.fetch SUCCESS");
            console.log(`Found ${jsonResponse.length} items`);
            if (jsonResponse.length > 0){
                this.hasPCQSResults = true;  
            }
            this.PCQSSearchCompleted = true;
        })
        .catch((error) => {
            this.error = error;
            console.log(`Outlook.fetch ERROR: ${JSON.stringify(error)}`);
        });
    }


    createAccount() {
        const fields = {};
        fields[NAME_FIELD.fieldApiName] = this.name;
        const recordInput = { apiName: ACCOUNT_OBJECT.objectApiName, fields };
        createRecord(recordInput)
            .then(account => {
                this.accountId = account.id;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Account created',
                        variant: 'success',
                    }),
                );
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    }),
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