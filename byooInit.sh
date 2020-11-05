sfdx force:org:create -s -f config/project-scratch-def.json
sfdx force:source:push
sfdx force:user:permset:assign --permsetname LFO_Demo
sfdx shane:data:tree:import -p data/export-demo-service_item__c-plan.json -d data/
sfdx force:org:open