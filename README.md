# Lightning for Outlook Demonstration

![Outlook Screenshot](/readme-assets/outlook-screenshot.png)


## Overview

This Repository is a "partially" self-contained demo repository that demonstrates the following:

- Ability for a Custom Lightning Web Component (LWC) to be embedded into Microsoft Outlook leveraging Lightning For Outlook (LFO)
- Ability for a Custom Lightning Web Component (LWC) embedded into Microsoft Outlook to associate Emails with Salesforce Records
- Ability for a Custom Lightning Web Component (LWC) embedded into Microsoft Outlook to pull information from an Email in Read Mode
- Ability for a Custom Lightning Web Component (LWC) embedded into Microsoft Outlook to pull data from an external data source via an API

*Note: This demo currently has an immigration/legal flavor to it. I intend to generalize this in the future.*

## About Lightning for Outlook (LFO)

Lightning for Outlook is the ability for you to embed Salesforce capabilities into Microsoft Outlook (Including Office 365!). Read more [HERE](https://help.salesforce.com/articleView?id=app_for_outlook_setup_parent.htm&type=5).

## What does this include

- Lightning Web Component that can be embedded into an Outlook Flexipage.
- Custom Objects for Internal and External Searching.
- Lightning App that allows you to demonstrate/test capability without Office 365 (aka, if it works here, it should work in Outlook), as well as provides access to the custom objects.
- Apex based Rest API
- Salesforce Community. This is only used to enable a guest user profile to enable API access.
- Remote Site Settings (Assuming you are installing via GPBU-Deployer)
- Data (Assuming you are installing via GPBU-Deployer)

## Prior to Installation

Due to the fact that this includes a community, there are some setup steps prior to installing the package.

### Ensure Sites are Enabled

Setup -> Sites -> Ensure you have a domain name.

### Enable ExperienceBundle Metadata API

Setup -> Communities Settings -> Enable ExperienceBundle Metadata API (Must be checked!)

## Installation

[CLICK HERE TO INSTALL](https://gpbu-deployer.herokuapp.com/byoo?template=https://github.com/SFDC-Assets/LightningForOutlookDemo)

*Note: this is currently only available as Source Installable via the GPBU Deployer.

## Post Installation Setup Tasks

### Add a Remote Site (If not deployed with GPBU-Deployer)

Because we are doing a Rest API Call, we need to enable access to the endpoint via the creation of a Remote Site Setting. This is done automatically if you leverage the GPBU-Deployer, but should something not work, you must create one manually.

1. Get your salesforce site domain name from Setup -> Sites (Example: sandbox-energy-saas-93462-dev-ed-175b99744ef.cs97.force.com)
2. Add a new Remote Site (Setup -> Remote Site Settings -> New) that allows access to your site.

### Setup Outlook Integration in Salesforce

1. From Setup, go to "Outlook Integration and Sync", enable "Let users access Salesforce records from Outlook".
2. Click on the down arrow and enable "Customize Content with AppBuilder".
3. Click Create new "Pane"
4. Add the "Outlook" custom component to the page. Recommendation is to add a new "Tab" and set it to only be visible in "Read Mode".
5. Save -> Activate -> Set this page as the default Email Application Pane -> Activate

### Link your account with Office 365

1. Ensure your User Account is using your Office 365 Email Address.

### If Demonstrating from Outlook Client, Download and Install Lightning from Outlook

[Download Directly from the Microsoft App Store](https://appsource.microsoft.com/en-us/product/office/WA104379334?src=office&corrid=2b27145a-9184-4554-af0a-cdd34d42aa05&omexanonuid=4064f102-888d-4f8a-97c9-5e42ea0fb99c&referralurl=)

## Running this Demo

![Embedded Application](/readme-assets/embedded-app.png)

First and foremost, If you don't feel like doing all the Office 365 Setup (Or potentially you can't because of Licensing), I have inclueded an embedded "LFO Demo" App that has the outlook look and feel and demonstrate's the same functionality of the Lightning Web Component in the safety of the Lightning Platform.

### Demo Prep

The Lightning Web component grabs data directly from open emails, so it is more impactful if it brings back records. The trick is to update a few Service_Item__c records to have an email address (Attorney_Email__c) you can readily send emails from. You can do this by opening up the LFO_Demo App and clicking on the Service Item tab.

## Demo Workflow

The demo consists of 3 major scenarios. Each is outlined below.

### Automatic Search

| Number | Talk Track | Actions |
|--------|------------|---------|
| 1      | Blah       | Blah    |
| 2      | Blah       | Blah    |
| 3      | Blah       | Blah    |

### Manual Search

| Number | Talk Track | Actions |
|--------|------------|---------|
| 1      | Blah       | Blah    |
| 2      | Blah       | Blah    |
| 3      | Blah       | Blah    |

```text
First Name: Jarred
Last Name: Peplay
Date of Birth: 02/08/1955
```

### Search Results and Creating new Service Items

| Number | Talk Track | Actions |
|--------|------------|---------|
| 1      | Blah       | Blah    |
| 2      | Blah       | Blah    |
| 3      | Blah       | Blah    |

### Standard Components and Attachments

| Number | Talk Track | Actions |
|--------|------------|---------|
| 1      | Blah       | Blah    |
| 2      | Blah       | Blah    |
| 3      | Blah       | Blah    |

### Generic Email Example

```text
Subject: Jarred Peplay

Message Body:

Hi,
I am the legal aid for Cochran, Cochran, and Cochran associates. Can you please provide updates on our client Jarred Peplay. Here is the information I have:

- Name: Jarred Peplay
- A Number: 857925175
- Date of Birth: 02/08/1955
- Birth Country: Madagascar

Thanks,
{Your Name}
Legal Aid
Cochran, Cochran, and Cochran associates
(222) 222-2222
```
