import { LightningElement, api } from 'lwc';

export default class OutlookServiceItemTile extends LightningElement {
    @api serviceItem;

    get serviceItemUrl(){
      return `/lightning/r/service_item__c/${this.serviceItem.Id}/view`;
    } 

    get tileTitle(){
      return `Case #${this.serviceItem.Case_Number__c}`;
    }

    buttonClick(event) {
        this.progressValue = event.target.value;
        // Creates the event with the data.
        const selectedEvent = new CustomEvent("serviceitembuttonclick", {
          detail: this.serviceItem
        });
    
        // Dispatches the event.
        this.dispatchEvent(selectedEvent);
    }
}