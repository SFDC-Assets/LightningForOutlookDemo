@RestResource(urlMapping='/pcqsAPI/*')
global with sharing class PcqsServiceAPI {
    @HttpGet
    global static List<PCQS_Service_Item__c> getServiceItems() {
        System.debug('Running PcqsServiceAPI.getServiceItems');
        RestRequest request = RestContext.request;
        String firstName = '';
        String lastName = '';
        String birthDateStr = '';
        String query = 'SELECT First_Name__c, Last_Name__c, A_Number__c, Birthdate__c, Country_of_Origin__c, Plaintiff_Gender__c, Plaintiff_Port_of_Entry__c FROM PCQS_Service_Item__c';
        Date birthDate = Date.today();

        if(request.params.containsKey('firstName') || request.params.containsKey('lastName') || request.params.containsKey('birthDate')){
            query = query + ' WHERE ';
        }

        if(request.params.containsKey('firstName')){
            query = query + ' First_Name__c = \'' + request.params.get('firstName') + '\'';
        }

        if(request.params.containsKey('firstName') && request.params.containsKey('lastName')){
            query = query + ' AND ';
        }

        if(request.params.containsKey('lastName')){
            query = query + ' First_Name__c = \'' + request.params.get('firstName') + '\'';
        }

        if((request.params.containsKey('firstName') || request.params.containsKey('lastName')) && request.params.containsKey('lastName')){
            query = query + ' AND ';
        }

        if(request.params.containsKey('birthDate')){
            birthDateStr = request.params.get('birthDate');
            birthDate = Date.valueOf(birthDateStr);
            query = query + ' Birthdate__c = ' + birthDateStr;
        }

        query = query + ' LIMIT 20';

        System.debug('Running the following Query: ' + query);

        List<PCQS_Service_Item__c> pcqsList = Database.query(query);

        return pcqsList;
    }
}
