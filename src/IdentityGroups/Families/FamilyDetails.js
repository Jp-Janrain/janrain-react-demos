import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import { FamilyAddresses } from './FamilyAddress';
import { FamilyMembers } from './FamilyMembers';


export const FamilyDetails = (props) => (
    <div>
        <Tabs >
            <Tab
                icon={<FontIcon className="material-icons">people</FontIcon>}
                label="Members">
                <FamilyMembers
                    isLoading={props.isLoadingMembers}
                    familyMembers={props.familyMembers}
                    isHeadOf={props.isHeadOf}
                    familyUUID={props.familyDetails.uuid} />
            </Tab>
            <Tab
                icon={<FontIcon className="material-icons">phone</FontIcon>}
                label="Contact Info" >
                <FamilyAddresses
                    isLoading={props.isLoadingDetails}
                    familyDetails={props.familyDetails}
                    isHeadOf={props.isHeadOf}
                    isMemberOf={props.isMemberOf} />
            </Tab>
            <Tab
                icon={<FontIcon className="material-icons">devices_other</FontIcon>}
                label="Devices" >
            </Tab>
        </Tabs>
    </div >
)



