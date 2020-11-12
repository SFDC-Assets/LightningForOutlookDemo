import { LightningElement, api } from 'lwc';

export default class OutlookPcqsServiceItemTile extends LightningElement {
    @api pcqsServiceItem;

    

    buttonClick(event) {
        this.progressValue = event.target.value;
        // Creates the event with the data.
        const selectedEvent = new CustomEvent("pcqsbuttonclick", {
          detail: this.pcqsServiceItem
        });
    
        // Dispatches the event.
        this.dispatchEvent(selectedEvent);
    }
    
}