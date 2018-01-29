import React, { Component } from 'react';
import Tabs, { Tab } from 'material-ui/Tabs';
import Icon from 'material-ui/Icon';
import { FamilyInfo } from './FamilyInfo';
import { FamilyMembers } from './FamilyMembers';
import Typography from 'material-ui/Typography/Typography';

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

export class FamilyContent extends Component {
    constructor() {
        super()
        this.state = {
            tabPosition: 1
        }
    }

    handleTabSelect = (event, value) => {
        this.setState({ tabPosition: value })
    }

    render() {
        const tabPosition = this.state.tabPosition
        return (
            <div >
                <Tabs
                    value={tabPosition}
                    onChange={this.handleTabSelect}
                    indicatorColor="primary"
                    textColor="primary"
                    fullWidth
                    centered >
                    <Tab icon={<Icon className="material-icons">people</Icon>} label="Members" />
                    <Tab icon={<Icon className="material-icons">phone</Icon>} label="Contact Info" />
                    <Tab icon={<Icon className="material-icons">devices_other</Icon>} label="Devices" />
                </Tabs>

                {tabPosition === 0 &&
                    <FamilyMembers
                        isLoading={this.props.members.isLoading}
                        familyMembers={this.props.members.data}
                        isHeadOf={this.props.isHeadOf}
                        familyUUID={this.props.info.data.uuid} />}

                {tabPosition === 1 &&
                    <FamilyInfo
                        isLoading={this.props.info.isLoading}
                        familyInfo={this.props.info.data}
                        isHeadOf={this.props.isHeadOf}
                        isMemberOf={this.props.isMemberOf}
                        handleUpdateInfo={this.props.handleUpdateInfo}
                        handleFamilyRename={this.props.handleFamilyRename}
                        postMessage={this.props.postMessage} />}
                {tabPosition === 2 && <TabContainer>Item three</TabContainer>}
            </div >
        )
    }
}









// </Tab>
// </Tab>