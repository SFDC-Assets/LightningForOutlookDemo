echo "*** Pushing metadata to scratch org ..."
sfdx force:source:push

echo "*** Deploying metadata to target org ..."
sfdx force:source:deploy --targetusername uscis-outlook-lwc --sourcepath force-app

echo "*** Deleting Data ..."
sfdx force:apex:execute -f scripts/apex/deleteData.apex -u uscis-outlook-lwc

echo "*** Re-Importing Data ..."
sfdx shane:data:tree:import -p data/export-demo-service_item__c-plan.json -d data/ -u uscis-outlook-lwc
sfdx shane:data:tree:import -p data/export-demo-PCQS_Service_Item__c-plan.json -d data/ -u uscis-outlook-lwc

echo "*** Setting up Remote Site Settings ..."
sfdx force:apex:execute -f scripts/apex/createRemoteSiteSettings.apex -u uscis-outlook-lwc