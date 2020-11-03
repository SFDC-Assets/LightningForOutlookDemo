public with sharing class LWCOutlookController {

    @AuraEnabled
    public static List<Service_Item__c> ServiceItemLookup(string emailAddress){ 
       return [SELECT Attorney_Company__c, 
                      Attorney_Email__c, 
                      Attorney_Name__c, 
                      Plaintiff_A_Number__c, 
                      Plaintiff_Birthdate__c, 
                      Plantiff_Country_Of_Origin__c, 
                      Plaintiff_First_Name__c, 
                      Plaintiff_Gender__c, 
                      Plaintiff_Last_Name__c, 
                      Plaintiff_Port_of_Entry__c, 
                      Case_Number__c 
                 FROM Service_Item__c 
                WHERE Attorney_Email__c = :emailAddress];
    }

}
