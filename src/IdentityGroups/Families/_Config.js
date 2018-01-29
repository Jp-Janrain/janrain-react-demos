// Add support to list relationship types, and available actions

export const RELATIONSHIP_TYPES = {
    IS_HEAD_OF: 'Admin',
    IS_MEMBER_OF: 'Member',
}

export const FAMILY_INFO_FORM_ATTRIBUTES = [
    {
        attributePath: 'familyAddress.phone',
        label: 'Phone Number',
        customValidation: null
    },
    {
        attributePath: 'familyAddress.email',
        label: 'Family Email',
        customValidation: null
    },
    {
        attributePath: 'familyAddress.address1',
        label: 'Address 1',
        customValidation: null
    },
    {
        attributePath: 'familyAddress.address2',
        label: 'Address 2',
        customValidation: null
    },
    {
        attributePath: 'familyAddress.city',
        label: 'City',
        customValidation: null
    },
    {
        attributePath: 'familyAddress.region',
        label: 'State',
        customValidation: null
    },
    {
        attributePath: 'familyAddress.country',
        label: 'Country',
        customValidation: null
    },
    {
        attributePath: 'familyAddress.zip',
        label: 'Postal Code',
        customValidation: null
    },
]
