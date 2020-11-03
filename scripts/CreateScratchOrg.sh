echo "*** Creating scratch org ..."
sfdx force:org:create -f config/project-scratch-def.json --setdefaultusername --setalias USCISOutlookLWCScratch -d 30

echo "*** Opening scratch org ..."
#sfdx force:org:open

echo "*** Pushing metadata to scratch org ..."
sfdx force:source:push

echo "*** Assigning permission set to your user ..."
sfdx force:user:permset:assign --permsetname LFO_Demo

echo "*** Generating password for your user ..."
sfdx force:user:password:generate --targetusername USCISOutlookLWCScratch

echo "*** Creating data"
#sfdx force:data:tree:import -f ./data/export-demo-service_item__c.json -u USCISOutlookLWCScratch --plan

echo "*** Creating User"
sfdx force:user:create --setalias outlook-user --definitionfile data/user-def.json
sfdx force:user:password:generate --targetusername outlook-user

echo "*** Setting up debug mode..."
sfdx force:apex:execute -f scripts/apex/DebugMode.apex

echo "*** Opening Org"
sfdx force:org:open