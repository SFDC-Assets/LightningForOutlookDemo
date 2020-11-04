public with sharing class LWCOutlookController {

    @AuraEnabled(cacheable=true)
    public static List<Service_Item__c> ServiceItemLookupByEmail(String emailAddress){ 
      System.debug(emailAddress);
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


    @AuraEnabled(cacheable=true)
    public static List<Service_Item__c> ServiceItemSearch(String firstName, String lastName, Date birthDate){ 
      System.debug('Input firstName: ' + firstName + ', lastName: ' + lastName + ', birthDate: ' + birthDate);
      return [SELECT Attorney_Company__c, 
                      Attorney_Email__c, 
                      Attorney_Name__c, 
                      Plaintiff_A_Number__c, 
                      Plaintiff_Birthdate__c, 
                      Plantiff_Country_Of_Origin__c, 
                      Plaintiff_First_Name__c, 
                      Plaintiff_Last_Name__c, 
                      Plaintiff_Gender__c, 
                      Plaintiff_Port_of_Entry__c, 
                      Case_Number__c 
                 FROM Service_Item__c 
                WHERE Plaintiff_Birthdate__c = :birthDate
                  AND Plaintiff_First_Name__c = :firstName
                  AND Plaintiff_Last_Name__c = :lastName
                LIMIT 5];
    }

}
