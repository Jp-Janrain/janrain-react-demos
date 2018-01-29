import React, { Component } from 'react';
import { LinearProgress } from 'material-ui'

import { FamilyCard } from './FamilyCard'
import { keepIdentityGroupsTokenActive } from '../IdentityGroupsAPI';
import GridList from 'material-ui/GridList';
import { currentUserUUID } from '../../Auth/AuthService';
import { getUsersFamilies } from './FamiliesAPI';
import GridListTile from 'material-ui/GridList/GridListTile';
import { ErrorMessageWithRedirect } from '../../Layout/ErrorMessageWithRedirect';

const style = {
    gridList: {maxWidth: '1100px', width: '100%' }
}

export class FamiliesContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: false,
            isLoading: true,
            families: [],
        }
    }

    handleRename = (familyObj) => {
        const families = this.state.families
        const foundIndex = families.findIndex(x => x.family.uuid === familyObj.uuid)
        families[foundIndex].family = familyObj
        this.setState({ families: families })
    }

    componentDidMount() {
        getUsersFamilies(currentUserUUID(),
            (data) => this.setState({ isLoading: false, families: data }),
            (errorMessage) => {
                this.props.postMessage(errorMessage)
                this.setState({ isLoading: false })
            }
        )
    }

    render() {
        if (this.state.isLoading) {
            return (<LinearProgress />)

        } else {
            const cards = []
            cards.push(this.state.families.map((familyObject) => {
                return (
                    <FamilyCard
                        key={familyObject.family.uuid}
                        family={familyObject.family}
                        relations={familyObject.relations}
                        handleRename={this.handleRename}
                        postMessage={this.props.postMessage}
                    />
                )
            }, this))
            return (
                <GridList padding={10} cellHeight='auto' cols={1} style={style.gridList}>
                    <GridListTile>
                        {cards}
                    </GridListTile>
                </GridList>
            )
        }

    }
}