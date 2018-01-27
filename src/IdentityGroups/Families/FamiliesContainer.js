import React, { Component } from 'react';
import { LinearProgress } from 'material-ui'

import { FamilyCard } from './FamilyCard'
import { ErrorDialog } from '../../Layout/ErrorDialog'
import { keepIdentityGroupsTokenActive } from '../IdentityGroupsAPI';
import { GridList } from 'material-ui/GridList';
import { currentUserUUID } from '../../Auth/AuthService';
import { getUsersFamilies } from './FamiliesAPI';


export class FamiliesContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: false,
            isLoading: true,
            families: [],
        }
    }

    componentWillMount() {
        keepIdentityGroupsTokenActive()
    }

    handleLoadFamiliesSuccess = (data) => {
        this.setState({
            isLoading: false,
            families: data,
        })
    }

    handleLoadFamiliesError = (errorMessage) => {
        this.setState({
            isLoading: false,
            error: true,
            errorMessage: errorMessage,
        })
    }

    handleFamilyRename = (familyObj) => {
        const families = this.state.families
        const foundIndex = families.findIndex(x => x.family.uuid === familyObj.uuid)
        families[foundIndex].family = familyObj
        this.setState({families: families})
    }

    componentDidMount() {
        getUsersFamilies(currentUserUUID(), this.handleLoadFamiliesSuccess, this.handleLoadFamiliesError)
    }

    render() {
        if (this.state.isLoading) {
            return (<LinearProgress />)

        } else if (this.state.error) {
            return (
                <ErrorDialog
                    title='Error'
                    text={this.state.errorMessage} />
            )

        } else {
            const cards = []
            cards.push(this.state.families.map( (familyObject) => {
                return (
                    <FamilyCard
                        key={familyObject.family.uuid}
                        family={familyObject.family}
                        relations={familyObject.relations}
                        handleFamilyRename={this.handleFamilyRename}
                    />
                )
            }, this))
            return (
                <GridList padding={10} cellHeight='auto' cols={1} style={{ maxWidth: '1100px' }}>
                    {cards}
                </GridList>
            )
        }

    }
}