sfdx force:source:push

sfdx force:data:tree:export -q scripts/soql/service_item__c.soql -x export-demo -d data/ --plan 

sfdx force:source:deploy --targetusername uscis-outlook-lwc --sourcepath force-app

sfdx force:apex:execute -f scripts/apex/deleteData.apex
sfdx shane:data:tree:import -p data/export-demo-service_item__c-plan.json -d data/
