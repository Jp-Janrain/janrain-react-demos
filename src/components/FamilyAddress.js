import React from 'react';
import {TextField} from 'material-ui'

export const FamilyAddresses = (props) => {
    const address = props.familyDetails.familyAddress
    return (
        <div>
            <TextField
                id="family_address_address1"
                floatingLabelText="Address 1"
                defaultValue={address.address1 ? address.address1 : null}
                disabled={!props.editingEnabled}
                fullWidth={true}
            /> <br />
            <TextField
                id="family_address_address2"
                floatingLabelText="Address 2"
                defaultValue={address.address2 ? address.address2 : null}
                disabled={!props.editingEnabled}
                fullWidth={true}
            /> <br />
            <TextField
                id="family_address_city"
                floatingLabelText="City"
                defaultValue={address.city ? address.city : null}
                disabled={!props.editingEnabled}
                fullWidth={true}
            /> <br />
            <TextField
                id="family_address_country"
                floatingLabelText="Country"
                defaultValue={address.country ? address.country : null}
                disabled={!props.editingEnabled}
                fullWidth={true}
            /> <br />
            <TextField
                id="family_address_zip"
                floatingLabelText="Zip"
                defaultValue={address.zip ? address.zip : null}
                disabled={!props.editingEnabled}
                fullWidth={true}
            /> <br />
            <TextField
                id="family_address_phone"
                floatingLabelText="Phone"
                defaultValue={address.phone ? address.phone : null}
                disabled={!props.editingEnabled}
                fullWidth={true}
            /> <br />
            <TextField
                fullWidth={true}
                id="family_address_email"
                floatingLabelText="Email"
                defaultValue={address.email ? address.email : null}
                disabled={!props.editingEnabled}
            /> <br />

        </div>
    )
}

