import decode from 'jwt-decode';
import React, { Component } from 'react';
import { LinearProgress } from 'material-ui'

import { FamilyCard } from './FamilyCard'
import { ErrorDialog } from '../../Layout/ErrorDialog'
import { IG_ENDPOINT } from '../../Config';
import { keepIdentityGroupsTokenActive } from '../IdentityGroupsAPI';
import { GridList } from 'material-ui/GridList';


export class FamiliesContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: false,
            isLoading: true,
            families: null,
        }
    }

    componentWillMount() {
        keepIdentityGroupsTokenActive()
    }

    componentDidMount() {
        const accessToken = localStorage.getItem('identitygroups_access_token')
        const uuid = decode(accessToken).sub

        fetch(IG_ENDPOINT + '/users/' + uuid + '/family', {
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
                    isLoading: false,
                    families: data,
                })
            })
            .catch(error => {
                error.text().then(errorMessage => {
                    this.setState({
                        isLoading: false,
                        error: true,
                        errorMessage: errorMessage,
                    })
                })
            })
    }

    render() {
        if (this.state.isLoading) {
            return (
                <LinearProgress />
            )
        } else if (this.state.error) {
            return (
                <ErrorDialog
                    title='Error'
                    text={this.state.errorMessage} />
            )
        } else {
            const cards = []
            cards.push(this.state.families.map(function (familyObject) {
                return (
                    <FamilyCard
                        key={familyObject.family.uuid}
                        family={familyObject.family}
                        relations={familyObject.relations}
                    />
                )
            }))
            return (
                <GridList padding={10} cellHeight='auto' cols={1} style={{ maxWidth: '1100px' }}>
                    {cards}
                </GridList>
            )
        }

    }
}