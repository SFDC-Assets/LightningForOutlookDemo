//Author- sunil Kumar
//Twitter handle-@sunil02kumar
//purpose- create remote site setting so that we can call rest api created in same org
public class LFORemoteSiteSettingHelper{
    public static boolean createRemoteSiteSettings(){
          boolean isSucessfull=false;
          Map<string,string> RemoteSiteMap = new Map<string,string>();
          //specify the remote site name and url in RemoteSiteMap
          RemoteSiteMap.put('LFO_LIGHTNING_SELF',URL.getSalesforceBaseUrl().toExternalForm());

          Network myNetwork = [SELECT Id FROM Network WHERE Name ='My Community'];
          String communityLoginUrl = Network.getLoginUrl(myNetwork.Id);
          String communityUrl = communityLoginUrl.replace('/s/login', '');
          communityUrl = communityUrl.replace('/login', '');
          
          RemoteSiteMap.put('LFO_MY_COMMUNITY',communityUrl);

          List<LFOMetadataService.Metadata> allMetadataList = new List<LFOMetadataService.Metadata>();


          for(string ss: RemoteSiteMap.keyset()){
              LFOMetadataService.RemoteSiteSetting remoteSiteDetails = new LFOMetadataService.RemoteSiteSetting();
              remoteSiteDetails.fullName = ss;
              remoteSiteDetails.description = ss+'-created through apex';
              remoteSiteDetails.disableProtocolSecurity  = false;
              remoteSiteDetails.isActive  = true;
              remoteSiteDetails.url=RemoteSiteMap.get(ss);
              allMetadataList.add(remoteSiteDetails);
          }        
          if(allMetadataList.size()>0){
              system.debug('****RemoteSiteSettings allMetadataList:'+allMetadataList);
              LFOMetadataService.MetadataPort service = createService();
              List<LFOMetadataService.UpsertResult> results = service.upsertMetadata(allMetadataList);
              for(LFOMetadataService.UpsertResult result: results){
                      if(result.success){
                          system.debug('added remote site setting success='+result);
                          isSucessfull=true;
                      }else{
                          system.debug('****error while adding remote site settings:'+result.errors[0].message);
                      }
  
              }
  
          }
          return isSucessfull;
      }  
    
      private static LFOMetadataService.MetadataPort createService(){ 
          LFOMetadataService.MetadataPort service = new LFOMetadataService.MetadataPort();
          service.SessionHeader = new LFOMetadataService.SessionHeader_element();
          service.SessionHeader.sessionId = UserInfo.getSessionId();
          return service;     
      }
  }