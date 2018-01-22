import React, { Component } from 'react';
import { Card, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import { IG_ENDPOINT } from '../../Config';
import { keepIdentityGroupsTokenActive } from '../IdentityGroupsAPI';
import { FamilyDetails } from './FamilyDetails';
import CardTitle from 'material-ui/Card/CardTitle';

export class FamilyCard extends Component {
  constructor() {
    super()
    this.state = {
      isLoadingMembers: true,
      familyMembers: {},
      isLoadingDetails: true,
      familyDetails: {},
    }
  }

  componentWillMount() {
    keepIdentityGroupsTokenActive()
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('identitygroups_access_token')

    fetch(IG_ENDPOINT + '/family/' + this.props.family.uuid, {
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
      }
    })
      .then(res => {
        if (!res.ok) { throw res }
        return res.json()
      })
      .then(data => {
        this.setState({
          isLoadingDetails: false,
          familyDetails: data,
        })
      })
      .catch(error => {
        error.text().then(errorMessage => {
          this.setState({
            isLoadingDetails: false,
            error: true,
            errorMessage: errorMessage,
          })
          console.log("ERROR LOADING FAMILY DETAILS: " + errorMessage)
        })
      })

    fetch(IG_ENDPOINT + '/family/' + this.props.family.uuid + '/users', {
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
      }
    })
      .then(res => {
        if (!res.ok) { throw res }
        return res.json()
      })
      .then(data => {
        this.setState({
          isLoadingMembers: false,
          familyMembers: data,
        })
      })
      .catch(error => {
        error.text().then(errorMessage => {
          this.setState({
            isLoadingMembers: false,
            error: true,
            errorMessage: errorMessage,
          })
          console.log("ERROR LOADING FAMILY MEMBERS: " + errorMessage)
        })
      })
  }

  render() {
    const family = this.props.family
    const relations = this.props.relations

    // Determine actions users can take on the family
    const actions = []
    if (relations.find(o => o.relationTypeCode === "IS_HEAD_OF")) {
      actions.push(<FlatButton label="Invite Members" />)
    }
    if (!this.state.editingEnabled) {
      actions.push(
        <FlatButton label="Edit" onClick={this.handleEditAction} />, )
    } else {
      actions.push(
        <FlatButton label='Save' primary={true} onClick={this.handleSaveAction} />,
        <FlatButton label='Cancel' secondary={true} onClick={this.handleCancelAction} />)
    }

    return (
      <Card>
        <CardTitle
          showExpandableButton={true}
          initiallyExpanded={false}
          actAsExpander={true}
          title={family.familyName}
          subtitle={family.description} />
        <CardText expandable={true}>
          <FamilyDetails key={family.uuid}
            familyDetails={this.state.familyDetails}
            familyMembers={this.state.familyMembers}
            isLoadingDetails={this.state.isLoadingDetails}
            isLoadingMembers={this.state.isLoadingMembers}
            isHeadOf={o => o.relationTypeCode === "IS_HEAD_OF"}
            isMemberOf={o => o.relationTypeCode === "IS_MEMBER_OF"} />
        </CardText>

      </Card>
    )
  }
}

