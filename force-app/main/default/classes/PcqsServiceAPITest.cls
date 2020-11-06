@IsTest
public class PcqsServiceAPITest {
    @TestSetup
    static void makeData(){
        PCQS_Service_Item__c pcqsTest = new PCQS_Service_Item__c(
            First_Name__c = 'Janessa',
            Last_Name__c = 'MacKegg',
            A_Number__c = '280500221',
            Birthdate__c = date.valueOf('1982-03-15'),
            Country_of_Origin__c = 'Syria',
            Plaintiff_Gender__c = 'Female',
            Plaintiff_Port_of_Entry__c = 'Calexico East - Class A, California - 2507'
        );

        insert pcqsTest;
    }

    @IsTest
    static void testGetServiceItems() {
        PCQS_Service_Item__c pcqsItem = [ SELECT First_Name__c, Last_Name__c, Birthdate__c FROM PCQS_Service_Item__c LIMIT 1];

        RestRequest  request    = new RestRequest();
        RestResponse response   = new RestResponse();

        request.requestURI = Url.getOrgDomainUrl().toExternalForm() + '/services/apexrest/pcqsAPI';
        request.httpMethod = 'GET';
        request.params.put('firstName', 'Janessa');
        request.params.put('lastName', 'MacKegg');
        request.params.put('birthDate', '1982-03-15');

        RestContext.request = request;
        RestContext.response = response;

        List<PCQS_Service_Item__c> resultsList = PcqsServiceAPI.getServiceItems();
        system.assert(resultsList.isEmpty() == false);
        system.assert(resultsList[0].First_Name__c == 'Janessa');
    }
}
