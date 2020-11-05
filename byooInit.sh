sfdx force:org:create -s -f config/project-scratch-def.json
sfdx force:source:push
sfdx force:user:permset:assign --permsetname LFO_Demo
sfdx force:data:tree:import --plan ./data/export-demo-service_item__c-plan.json
sfdx force:org:open