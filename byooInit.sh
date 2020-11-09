sfdx force:org:create -s -f config/project-scratch-def.json

sfdx force:source:push

#Assign PermissionSet
sfdx force:user:permset:assign -n LFO_Demo

#Delete Existing Data
sfdx force:apex:execute -f scripts/apex/deleteData.apex

#Import Data
sfdx shane:data:tree:import -p data/export-demo-service_item__c-plan.json -d data/
sfdx shane:data:tree:import -p data/export-demo-PCQS_Service_Item__c-plan.json -d data/

sfdx force:org:open