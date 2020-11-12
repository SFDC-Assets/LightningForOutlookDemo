sfdx force:source:push

sfdx force:source:deploy --targetusername uscis-outlook-lwc --sourcepath force-app

sfdx force:apex:execute -f scripts/apex/deleteData.apex -u uscis-outlook-lwc

sfdx shane:data:tree:import -p data/export-demo-service_item__c-plan.json -d data/ -u uscis-outlook-lwc
sfdx shane:data:tree:import -p data/export-demo-PCQS_Service_Item__c-plan.json -d data/ -u uscis-outlook-lwc
