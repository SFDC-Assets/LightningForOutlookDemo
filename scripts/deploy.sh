sfdx force:source:push

#sfdx force:data:tree:export -q scripts/soql/service_item__c.soql -x export-demo -d data/ --plan 

sfdx force:source:deploy --targetusername uscis-outlook-lwc --sourcepath force-app

sfdx force:user:permset:assign --permsetname LFO_Demo -u admin@uscis-outlook-lwc.demo

#sfdx shane:data:tree:import -p data/export-demo-service_item__c-plan.json -d data/ -u uscis-outlook-lwc