List<Service_Item__c> serviceItems = [SELECT Id FROM Service_Item__c];
delete serviceItems;
List<PCQS_Service_Item__c> PQCSserviceItems = [SELECT Id FROM PCQS_Service_Item__c];
delete PQCSserviceItems;