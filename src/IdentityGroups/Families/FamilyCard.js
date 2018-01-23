import React, { Component } from 'react';
import { Card, CardText } from 'material-ui/Card';

import { keepIdentityGroupsTokenActive } from '../IdentityGroupsAPI';
import { FamilyContent } from './FamilyContent';
import CardTitle from 'material-ui/Card/CardTitle';
import { getFamilyInfo, getFamilyMembers } from './FamiliesAPI';

export class FamilyCard extends Component {
  constructor() {
    super()
    this.state = {
      isLoadingMembers: true,
      familyMembers: {},
      isLoadingInfo: true,
      familyDetails: {},
    }
  }

  componentWillMount() {
    keepIdentityGroupsTokenActive()
  }

  handleLoadInfoSuccess = (data) => {
    this.setState({
      isLoadingInfo: false,
      familyDetails: data,
    })
  }

  handleLoadInfoError = (errorMessage) => {
    this.setState({
      isLoadingInfo: false,
      error: true,
      errorMessage: errorMessage,
    })
    console.log("ERROR LOADING FAMILY INFO: " + errorMessage)
  }

  handleLoadMembersSuccess = (data) => {
    this.setState({
      isLoadingMembers: false,
      familyMembers: data,
    })
  }

  handleLoadMembersError = (errorMessage) => {
    this.setState({
      isLoadingMembers: false,
      error: true,
      errorMessage: errorMessage,
    })
    console.log("ERROR LOADING FAMILY MEMBERS: " + errorMessage)
  }

  componentDidMount() {
    const familyUUID = this.props.family.uuid
    getFamilyInfo(familyUUID, this.handleLoadInfoSuccess, this.handleLoadInfoError)
    getFamilyMembers(familyUUID, this.handleLoadMembersSuccess, this.handleLoadMembersError)
  }

  render() {
    const family = this.props.family

    return (
      <Card>
        <CardTitle
          showExpandableButton={true}
          actAsExpander={true}
          title={family.familyName}
          subtitle={family.description} />
        <CardText expandable={true}>
          <FamilyContent key={family.uuid}
            familyDetails={this.state.familyDetails}
            familyMembers={this.state.familyMembers}
            isLoading={this.state.isLoadingInfo}
            isLoadingMembers={this.state.isLoadingMembers}
            isHeadOf={o => o.relationTypeCode === "IS_HEAD_OF"}
            isMemberOf={o => o.relationTypeCode === "IS_MEMBER_OF"} />
        </CardText>

      </Card>
    )
  }
}

