public with sharing class LWCOutlookController {

    @AuraEnabled(cacheable=true)
    public static List<Service_Item__c> ServiceItemLookupByEmail(String emailAddress){ 
      System.debug('Running LWCOutlookController.ServiceItemLookupByEmail');      
      System.debug('Input email address=' + emailAddress);
      
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
      System.debug('Running LWCOutlookController.ServiceItemSearch');
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


    @AuraEnabled(cacheable=true)
    public static String getSessionId(String firstName, String lastName, Date birthDate){ 
      System.debug('Running LWCOutlookController.getSessionId');
      return UserInfo.getSessionID();
    }



    @AuraEnabled(cacheable=true)
    public static String PCQSServiceItemSearch(String firstName, String lastName, Date birthDate){ 
      System.debug('Running LWCOutlookController.PCQSServiceItemSearch');
      String url = URL.getOrgDomainUrl().toExternalForm() + '/services/apexrest/pcqs';
      system.debug('URL is ' + url);
      
      HttpRequest request = new HttpRequest();
      request.setHeader('Authorization', 'Bearer ' + UserInfo.getSessionId());
          
      request.setTimeout(20000);
      request.setHeader('Content-Type', 'application/json');

      request.setEndpoint(url); 
      request.setMethod('GET');   
        
      try{

          Http http = new Http();
          HttpResponse response = http.send(request);

          if (response.getStatusCode() == 200) {
              // Deserialize the JSON string into collections of primitive data types.
              system.debug('Data: '+ response.getBody());
              system.debug('doRestRequestJSON was a Success!');
              return response.getBody();
          }else{
              system.debug('Request failed. Status Code: ' + response.getStatusCode());
              return null;
          }

      }catch(Exception e){
          system.debug('Error Running HTTP Request: ' + e);
          throw e;
      }  

  }

}
