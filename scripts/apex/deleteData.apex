List<Service_Items__c> serviceItems = [SELECT Id FROM Service_Items__c];
delete serviceItems;