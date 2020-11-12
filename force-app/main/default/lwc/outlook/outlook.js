import {LightningElement,api,track,wire} from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import ServiceItemLookupByEmail from "@salesforce/apex/LWCOutlookController.ServiceItemLookupByEmail";
import ServiceItemSearch from "@salesforce/apex/LWCOutlookController.ServiceItemSearch";
import PCQSServiceItemSearch from "@salesforce/apex/LWCOutlookController.PCQSServiceItemSearch";
import GetSessionId from "@salesforce/apex/LWCOutlookController.getSessionId";
import createEmailMessage from "@salesforce/apex/LWCOutlookController.createEmailMessage";
import createServiceItem from "@salesforce/apex/LWCOutlookController.createServiceItem";

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
    @api dates;

    @track sessionId;
    @track serviceItems;
    @track hasServiceItems = false;

    @track performedSearch = false; 
    
    @track createdNewEmailMessage = false;
    @track newEmailMessageId;
    @track newEmailMessageUrl;

    @track createdNewServiceItem = false;
    @track newServiceItemId;
    @track newServiceItemUrl;

    @track searchFirstName
    @track searchLastName  
    @track searchBirthDate

    @track salesforceSearchCompleted = false;
    @track searchSalesforceResults;
    @track hasSalesforceResults = false;

    @track PCQSSearchCompleted = false;
    @track searchPCQSResults;
    @track hasPCQSResults = false;



    userId = Id;
    activeSections = ['A', 'B'];

    handleSectionToggle(event) {
        const openSections = event.detail.openSections;
    }

    @wire(getRecord, { recordId: '$userId', fields: [USER_USERNAME_FIELD]})
    user

    get userUsername() {
        return getFieldValue(this.user.data, USER_USERNAME_FIELD);
    }

    @wire(GetSessionId)
    wiredGetSessionId({ error, data }) {
        if (data) {
            console.log(`Outlook.wiredGetSessionId SUCCESS`);
            console.log(`Found ${data} sessionId`);
            this.error = undefined;
            this.sessionId = data;
        } else if (error) {
            this.error = error;
            console.log(`Outlook.wiredGetSessionId ERROR: ${JSON.stringify(error)}`);
            this.sessionId = undefined;
        }
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
        this.searchBirthDate = event.target.value;
    }

    // Handles click on the 'Show/hide content' button
    handleSearch() {
        this.performedSearch = true;
        this.activeSections = ['D'];
        this.salesforceSearchCompleted = false;
        this.hasSalesforceResults = false;
        this.PCQSSearchCompleted = false;
        this.hasPCQSResults = false;

        ServiceItemSearch({
            firstName: this.searchFirstName,
            lastName: this.searchLastName,
            birthDate: this.searchBirthDate
        })
        .then((data) => {
            console.log("Outlook.ServiceItemSearch SUCCESS");
            console.log(`Found ${data} serviceItems`);
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
            this.salesforceSearchCompleted = true;
        });

        PCQSServiceItemSearch({
            firstName: this.searchFirstName,
            lastName: this.searchLastName,
            birthDate: this.searchBirthDate
        })
        .then((data) => {
            console.log("Outlook.PCQSServiceItemSearch SUCCESS");
            console.log(`PCQS service API Results ${data}`);
            let resultData = JSON.parse(data);
            console.log(`After JSON.parse: ${resultData}`);
            console.log(`After JSON.parse Length: ${resultData.length}`);
            
            if (resultData.length > 0){
                this.hasPCQSResults = true;
                this.searchPCQSResults = resultData;
            }else{
                this.searchPCQSResults = null;
            }

            this.PCQSSearchCompleted = true;
        })
        .catch((error) => {
            this.error = error;
            console.log(`Outlook.PCQSServiceItemSearch ERROR: ${JSON.stringify(error)}`);
            this.PCQSSearchCompleted = true;
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



    handleServiceItemButtonClick(event) {
        console.log(`handleServiceItemButtonClick: ${JSON.stringify(event.detail)}`);
        this.createEmailMessageFunction(event.detail.Id);
    }    


    createEmailMessageFunction(serviceItemId) {
        createEmailMessage({
            serviceItemId: serviceItemId,
            fromEmailAddress: this.people.from.email,
            fromName: this.people.from.name,
            subject: this.subject,
            messageBody: this.messageBody
        })
        .then((data) => {
            console.log("Outlook.createEmailMessage SUCCESS");
            this.newEmailMessageId = data;
            this.newEmailMessageUrl = `/lightning/r/EmailMessage/${data}/view`;
            this.createdNewEmailMessage = true;
            this.activeSections = [];
        })
        .catch((error) => {
            this.error = error;
            console.log(`Outlook.createEmailMessage ERROR: ${JSON.stringify(error)}`);
        });

    }   



    handlePCQSButtonClick(event) {
        console.log(`handlePCQSButtonClick: ${JSON.stringify(event.detail)}`);

        createServiceItem({
            aNumber: event.detail.A_Number__c,
            birthDate: event.detail.Birthdate__c,
            countryOfOrigin: event.detail.Country_of_Origin__c,
            firstName: event.detail.First_Name__c,
            lastName: event.detail.Last_Name__c,
            gender: event.detail.Plaintiff_Gender__c,
            portOfEntry: event.detail.Plaintiff_Port_of_Entry__c
        })
        .then((data) => {
            console.log("Outlook.createServiceItem SUCCESS");
            this.newServiceItemId = data;
            this.newServiceItemUrl = `/lightning/r/service_item__c/${data}/view`;
            this.createdNewServiceItem = true;

            this.createEmailMessageFunction(data);
            
        })
        .catch((error) => {
            this.error = error;
            console.log(`Outlook.createServiceItem ERROR: ${JSON.stringify(error)}`);
        });
    }    


}