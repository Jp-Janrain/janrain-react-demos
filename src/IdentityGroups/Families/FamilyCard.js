import React, { Component } from 'react';
import Card from 'material-ui/Card';
import { keepIdentityGroupsTokenActive } from '../IdentityGroupsAPI';
import { FamilyContent } from './FamilyContent';
import { getFamilyInfo, getFamilyMembers } from './FamiliesAPI';
import CardHeader from 'material-ui/Card/CardHeader';
import CardContent from 'material-ui/Card/CardContent';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import CardActions from 'material-ui/Card/CardActions';
import Collapse from 'material-ui/transitions/Collapse';


export class FamilyCard extends Component {
  constructor() {
    super()
    this.state = {
      isLoadingMembers: true,
      familyMembers: {},
      isLoadingInfo: true,
      familyInfo: {},
      expandend: false,
    }
  }

  componentWillMount() {
    keepIdentityGroupsTokenActive()
  }

  handleLoadInfoSuccess = (data) => {
    this.setState({
      isLoadingInfo: false,
      familyInfo: data
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

  handleUpdateInfo = (response) => {
    this.setState({ familyInfo: response })
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

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  componentDidMount() {
    const familyUUID = this.props.family.uuid
    getFamilyInfo(familyUUID, this.handleLoadInfoSuccess, this.handleLoadInfoError)
    getFamilyMembers(familyUUID, this.handleLoadMembersSuccess, this.handleLoadMembersError)
  }

  render() {
    const family = this.props.family

    return (
      <Card>
        <CardHeader
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={family.familyName}
          subheader={family.description} />
        <CardActions style={{ display: 'flex' }} onClick={this.handleExpandClick} >
          <IconButton
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
            style={this.state.expanded ? { transform: 'rotate(180deg)' } : null}
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent >
            <FamilyContent key={family.uuid}
            familyInfo={this.state.familyInfo}
            familyMembers={this.state.familyMembers}
            isLoadingInfo={this.state.isLoadingInfo}
            isLoadingMembers={this.state.isLoadingMembers}
            isHeadOf={o => o.relationTypeCode === "IS_HEAD_OF"}
            isMemberOf={o => o.relationTypeCode === "IS_MEMBER_OF"}
            handleUpdateInfo={this.handleUpdateInfo}
            handleFamilyRename={this.props.handleFamilyRename} />
          </CardContent>
        </Collapse>

      </Card>
    )
  }
}

