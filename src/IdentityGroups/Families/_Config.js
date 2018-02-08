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

// Config as defined by miaa:
// https://miaasolutions.atlassian.net/wiki/spaces/JAO/pages/279314433/As-Built+Janrain+OEM+Internal
export const AUTHORIZATIONS = {
    "IS_HEAD_OF": {
        related_users: {
            "IS_MEMBER_OF": ['id_card'],
            "IS_HEAD_OF": ['id_card']
        },
        invite_as: [],
        can_enroll: false,
        approve_enrollment_for: [],
        carnet: {
            create: ['id_card', 'familyProfile'],
            read: ['tech', 'id_card', 'familyProfile'],
            update: ['id_card', 'familyProfile'],
            'delete': false
        }
    },
    "IS_MEMBER_OF": {
        related_users: {
            "IS_MEMBER_OF": ['id_card']
        },
        invite_as: [],
        can_enroll: false,
        approve_enrollment_for: [],
        carnet: {
            create: [],
            read: ['tech', 'id_card'],
            update: [],
            'delete': false
        }
    }
}

export const CARDS = {
    "tech": [
        "uuid",
        "created",
        "lastUpdated"
    ],
    "id_card": [
        "familyName",
        "description"
    ],
    "familyProfile": [
        "familyName",
        "description",
        "familyAddress"
    ]
}

export const SCOPES = {
    "create": [
        "manage_family"
    ],
    "read": [
        "read_family"
    ],
    "edit": [
        "manage_family"
    ],
    "delete": [
        "manage_family"
    ],
    "invite": [
        "manage_family"
    ]
}