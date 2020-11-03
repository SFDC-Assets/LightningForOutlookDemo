import { LightningElement, track} from 'lwc';
import IMG_OUTLOOK_CENTER_PANE_HEADER from '@salesforce/resourceUrl/outlook_center_pane_header';
import IMG_OUTLOOK_LEFT_PANE from '@salesforce/resourceUrl/outlook_left_pane';
import IMG_OUTLOOK_MESSAGE_BODY from '@salesforce/resourceUrl/outlook_message_body';
import IMG_OUTLOOK_HEADER from '@salesforce/resourceUrl/outlook_header';
import IMG_OUTLOOK_FOOTER from '@salesforce/resourceUrl/outlook_footer';
import IMG_OUTLOOK_FOOTER_CENTER from '@salesforce/resourceUrl/outlook_footer_center';
import IMG_OUTLOOK_RIGHT_PANE_HEADER from '@salesforce/resourceUrl/outlook_right_pane_header';

export default class OutlookAppWrapper extends LightningElement {
    @track people = {
                        'from':{
                            'name':'Reynard Duxfield',
                            'email':'rduxfield92@instagram.com'
                        }
                    };
    @track subject = '618864225';
    @track messageBody = 'Mr Attorney Sir. Can you please contact me about the Above Plaintiff?';


    renderedCallback() {
        this.inputValue = 5;
        console.log(`Outgoing subject: ${undefined !== this.subject ? this.subject : ''}`);
        console.log(`Outgoing people: ${undefined !== this.people ? this.people : ''}`);
        console.log(`Outgoing messageBody: ${undefined !== this.messageBody ? JSON.stringify(this.messageBody) : ''}`);
    }


    outlookCenterPaneHeaderUrl = IMG_OUTLOOK_CENTER_PANE_HEADER;
    outlookLeftPaneUrl = IMG_OUTLOOK_LEFT_PANE;
    outlookMessageBodyUrl = IMG_OUTLOOK_MESSAGE_BODY;
    outlookHeaderUrl = IMG_OUTLOOK_HEADER;       
    outlookFooterUrl = IMG_OUTLOOK_FOOTER;           
    outlookFooterCenterUrl = IMG_OUTLOOK_FOOTER_CENTER;     
    outlookRightPaneHeaderUrl = IMG_OUTLOOK_RIGHT_PANE_HEADER;   

/*
 
    SAMPLE RECORD

    {
    "attributes": {
        "type": "service_item__c",
        "referenceId": "service_item__cRef1"
    },
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

}