@RestResource(urlMapping='/pcqsAPI/*')
global with sharing class PcqsServiceAPI {
    @HttpGet
    global static List<PCQS_Service_Item__c> getServiceItems() {
        RestRequest request = RestContext.request;
        
        String firstName    = request.params.get('firstName');
        String lastName     = request.params.get('lastName');
        String birthDateStr = request.params.get('birthDate');
        Date   birthDate    = Date.valueOf(birthDateStr);

        List<PCQS_Service_Item__c> pcqsList = new List<PCQS_Service_Item__c>([
            SELECT
                First_Name__c,
                Last_Name__c,
                A_Number__c,
                Birthdate__c,
                Country_of_Origin__c,
                Plaintiff_Gender__c,
                Plaintiff_Port_of_Entry__c
            FROM PCQS_Service_Item__c
            WHERE
                First_Name__c   = :firstName
            AND Last_Name__c    = :lastName
            AND Birthdate__c    = :birthDate
            LIMIT 20
        ]);

        return pcqsList;
    }
}
