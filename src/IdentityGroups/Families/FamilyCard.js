import React, { Component } from 'react';
import Card from 'material-ui/Card';
import { keepIdentityGroupsTokenActive } from '../IdentityGroupsAPI';
import { FamilyContent } from './FamilyContent';
import { getFamilyInfo, getFamilyMembers, updateFamilyInfo } from './FamiliesAPI';
import CardHeader from 'material-ui/Card/CardHeader';
import CardContent from 'material-ui/Card/CardContent';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import CardActions from 'material-ui/Card/CardActions';
import Collapse from 'material-ui/transitions/Collapse';
import { FamilyRenameDialog } from './FamilyRenameDialog';
import { FamilyCardMenu } from './FamilyCardMenu';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';


export class FamilyCard extends Component {
  constructor() {
    super()
    this.state = {
      isLoadingMembers: true,
      familyMembers: {},
      isLoadingInfo: true,
      familyInfo: {},
      expandend: false,
      renameDialogOpen: false,
    }
  }

  componentWillMount() {
    keepIdentityGroupsTokenActive()
  }

  handleOpenRenameDialog = () => {
    this.setState({ renameDialogOpen: true })
  }
  handleCloseRenameDialog = () => {
    this.setState({ renameDialogOpen: false })
  }
  handleUpdateFamilyInfoSuccess = (data) => {
    this.props.handleFamilyRename(data)
    this.props.handleUpdateInfo(data)
    this.setState({ renameDialogOpen: false })
  }
  handleUpdateFamilyInfoError = (errorMessage) => {
    console.log("ERROR LOADING FAMILY DETAILS: " + errorMessage)
  }
  handleRenameSubmit = () => {
    const familyName = document.getElementById('family_name_update').value
    const description = document.getElementById('family_description_update').value

    updateFamilyInfo(
      this.state.familyInfo.uuid,
      { familyName: familyName, description: description },
      this.handleUpdateFamilyInfoSuccess, this.handleUpdateFamilyInfoError
    )
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
          action={<FamilyCardMenu handleOpenRenameDialog={this.handleOpenRenameDialog} />}
          title={family.familyName}
          subheader={family.description} />
        <CardActions disableActionSpacing onClick={this.handleExpandClick} >
          <List>
            <ListItem button>
              <IconButton
                onClick={this.handleExpandClick}
                aria-expanded={this.state.expanded}
                aria-label="Show more"
                style={this.state.expanded ? { transform: 'rotate(180deg)' } : null}
              >
                <ExpandMoreIcon />
              </IconButton>
            </ListItem>
          </List>
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
        <FamilyRenameDialog
          isOpen={this.state.renameDialogOpen}
          familyInfo={this.state.familyInfo}
          handleCloseRenameDialog={this.handleCloseRenameDialog}
          handleRenameSubmit={this.handleRenameSubmit} />

      </Card>
    )
  }
}

