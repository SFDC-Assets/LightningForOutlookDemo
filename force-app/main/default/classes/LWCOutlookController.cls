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

    

    Network myNetwork = [SELECT Id FROM Network WHERE Name ='My Community'];
    String communityLoginUrl = Network.getLoginUrl(myNetwork.Id);
    String communityUrl = communityLoginUrl.replace('/s/login', '');
    communityUrl = communityUrl.replace('/login', '');
    System.debug('Community URL is: ' + communityUrl);
    
    String baseRequestURL = communityUrl + '/services/apexrest/pcqsAPI';
    System.debug('Base Request URL URL is: ' + communityUrl);
    String queryFilters = '';
        
    if((null != firstName && firstName != '') || (null != lastName && lastName != '') || (null != birthDate)){
      queryFilters = queryFilters + '?';
    }

    if(null != firstName && firstName != ''){
      queryFilters = queryFilters + '&firstName=' + firstName;
    }

    if(null != lastName && lastName != ''){
      queryFilters = queryFilters + '&lastName=' + lastName;
    }

    if(null != birthDate){
      Datetime output = Datetime.newInstance(birthDate, Time.newInstance(0,0,0,0));
      queryFilters = queryFilters + '&birthDate=' + output.format('yyyy-MM-dd');
    }

      String url = baseRequestURL + queryFilters;
      system.debug('Search URL is ' + url);
      
      HttpRequest request = new HttpRequest();
      //request.setHeader('Authorization', 'Bearer ' + UserInfo.getSessionId());
          
      request.setTimeout(20000);
      request.setHeader('Content-Type', 'application/json');

      request.setEndpoint(url); 
      request.setMethod('GET');   
        
      try{

          Http http = new Http();
          HttpResponse response = http.send(request);

          if (response.getStatusCode() == 200) {
              // Deserialize the JSON string into collections of primitive data types.
              String responseData = response.getBody();
              system.debug('Data: '+ responseData);
              system.debug('doRestRequestJSON was a Success!');
              return responseData;
          }else{
              system.debug('Request failed. Status Code: ' + response.getStatusCode());
              return null;
          }

      }catch(Exception e){
          system.debug('Error Running HTTP Request: ' + e);
          throw e;
      }  

  }

  @AuraEnabled
  public static Id createEmailMessage(String serviceItemId, String fromEmailAddress, String fromName, String subject, String messageBody){

    EmailMessage emailMessage = new EmailMessage();

    User thisUser = [SELECT Id, Email, FIrstName, LastName FROM User where Id = :UserInfo.getUserId()];

    String[] toIds = new String[]{thisUser.Id}; 

    emailMessage.RelatedToId = serviceItemId;
    emailMessage.FromAddress = fromEmailAddress;
    emailMessage.FromName = fromName;
    emailMessage.Incoming = True;
    emailMessage.MessageDate = Datetime.now();
    emailMessage.LastOpenedDate = Datetime.now();
    emailMessage.MessageDate = Datetime.now();
    emailMessage.Subject = subject;
    emailMessage.HtmlBody = messageBody;
    emailMessage.toIds  = toIDs;
    emailMessage.Status = '2';
    emailMessage.ToAddress = thisUser.Email;
    insert emailMessage;

    EmailMessageRelation emailMessageRelationToAddress = new EmailMessageRelation();
    emailMessageRelationToAddress.emailMessageId = emailMessage.id;
    emailMessageRelationToAddress.relationId = thisUser.Id; // user id of the sender
    emailMessageRelationToAddress.RelationAddress = thisUser.Email;
    emailMessageRelationToAddress.relationType = 'ToAddress';
    insert emailMessageRelationToAddress;

    EmailMessageRelation emailMessageRelationFromAddress = new EmailMessageRelation();
    emailMessageRelationFromAddress.emailMessageId = emailMessage.id;
    emailMessageRelationFromAddress.RelationAddress = fromEmailAddress;
    emailMessageRelationFromAddress.relationType = 'FromAddress';
    insert emailMessageRelationFromAddress;

    return emailMessage.Id;

  }


  @AuraEnabled
  public static Id createServiceItem(String aNumber, Date birthDate, String countryOfOrigin, String firstName, String lastName, String gender, String portOfEntry){

    service_item__c serviceItem = new service_item__c();

    serviceItem.Plaintiff_A_Number__c = aNumber;
    serviceItem.Plaintiff_Birthdate__c = birthDate;
    serviceItem.Plantiff_Country_Of_Origin__c = countryOfOrigin;
    serviceItem.Plaintiff_First_Name__c = firstName;
    serviceItem.Plaintiff_Last_Name__c = lastName;
    serviceItem.Plaintiff_Gender__c = gender;
    serviceItem.Plaintiff_Port_of_Entry__c = portOfEntry;
    
    insert serviceItem;

    return serviceItem.Id;
  }


}
