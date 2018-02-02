import React, { Component } from 'react';

import Card from 'material-ui/Card';
import { FamilyCardContent } from './FamilyCardContent';
import { getFamilyInfo, getFamilyMembers, updateFamilyInfo } from './FamiliesAPI';
import CardHeader from 'material-ui/Card/CardHeader';
import CardContent from 'material-ui/Card/CardContent';
import IconButton from 'material-ui/IconButton/IconButton';
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
      info: {
        isLoading: false,
        data: {},
      },
      members: {
        isLoading: false,
        data: {},
      },
      expandend: false,
      renameDialogOpen: false,
    }
  }

  handleOpenRenameDialog = () => {
    this.setState({ renameDialogOpen: true })
  }

  handleCloseRenameDialog = () => {
    this.setState({ renameDialogOpen: false })
  }

  handleRenameSubmit = () => {
    const familyName = document.getElementById('family_name_update').value
    const description = document.getElementById('family_description_update').value

    updateFamilyInfo(
      this.state.info.data.uuid,
      { familyName: familyName, description: description },
      (data) => {
        this.props.handleRename(data)
        this.setState({ renameDialogOpen: false })},
      (errorMessage) => this.props.postMessage('ERROR UPDATING: ' + errorMessage)
    )
  }

  handleUpdateInfo = (response) => {
    const info = this.state.info
    info.data = response
    this.setState({ info })
  }

  handleLoadSuccess = (data, type) => {
    this.setState({
      [type]: {
        isLoading: false,
        data: data
      }
    })
  }

  handleLoadError = (errorMessage, type) => {
    this.setState({
      [type]: {isLoading: false}
    })
    this.props.postMessage("ERROR LOADING FAMILY INFO: " + errorMessage)
  }

  expandCard = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  componentDidMount() {
    const familyUUID = this.props.family.uuid
    getFamilyInfo(familyUUID,
      (data) => this.handleLoadSuccess(data, 'info'),
      (errorMessage) => this.handleLoadError(errorMessage, 'info'))
    getFamilyMembers(familyUUID,
      (data) => this.handleLoadSuccess(data, 'members'),
      (errorMessage) => this.handleLoadError(errorMessage, 'members'))
  }

  render() {
    const family = this.props.family

    return (
      <div>
        <Card>
          <CardHeader
            action={<FamilyCardMenu handleOpenRenameDialog={this.handleOpenRenameDialog} />}
            title={family.familyName}
            subheader={family.description} />
          <CardActions disableActionSpacing onClick={this.expandCard} >
            <List>
              <ListItem button>
                <IconButton
                  onClick={this.expandCard}
                  aria-expanded={this.state.expanded}
                  aria-label="Show more"
                  style={this.state.expanded ? { transform: 'rotate(180deg)' } : null} >
                  <ExpandMoreIcon />
                </IconButton>
              </ListItem>
            </List>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent >
              <FamilyCardContent key={family.uuid}
                info={this.state.info}
                members={this.state.members}
                isHeadOf={o => o.relationTypeCode === "IS_HEAD_OF"}
                isMemberOf={o => o.relationTypeCode === "IS_MEMBER_OF"}
                handleUpdateInfo={this.handleUpdateInfo}
                postMessage={this.props.postMessage} />
            </CardContent>
          </Collapse>
          <FamilyRenameDialog
            isOpen={this.state.renameDialogOpen}
            familyInfo={this.state.info.data}
            handleCloseRenameDialog={this.handleCloseRenameDialog}
            handleRenameSubmit={this.handleRenameSubmit} />

        </Card>
      </div>
    )
  }
}

