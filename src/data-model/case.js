const ConnectionTypes = [
    {id: 0, value: 'phone'},
    {id: 1, value: 'address'},
    {id: 2, value: 'email'},
    {id: 3, value: 'website'},
    {id: 4, value: 'skype'},
    {id: 5, value: 'other'}
];

const UsageTypes = [
    {id: 0, value: 'primary'},
    {id: 1, value: 'marketing'},
    {id: 2, value: 'service'}
];

const CurrencyTypes = [
    {id: 0, value: 'EUR'},
    {id: 1, value: 'USD'},
    {id: 2, value: 'UAH'}
];

const GenderTypes = [
    {id: 0, value: 'man'},
    {id: 1, value: 'women'},
    {id: 2, value: 'other'}
];

const MaritalStatusTypes = [
    {id: 0, value: 'single'},
    {id: 1, value: 'married'},
    {id: 2, value: 'divorced'},
    {id: 3, value: 'widowed'}
];

const NumberOfEmployeesTypes = [
    {id: 0, value: '1-9'},
    {id: 1, value: '10-49'},
    {id: 2, value: '50-199'},
    {id: 3, value: '200-999'},
    {id: 4, value: '1000-9999'},
    {id: 5, value: '10000-99999'},
    {id: 6, value: '100000+'}
];

const DerivedTypes = [
    {id: 0, value: 'legalentity'},
    {id: 1, value: 'organization'},
    {id: 2, value: 'person'},
    {id: 3, value: 'systemuser'},
    {id: 4, value: 'bank'},
    {id: 5, value: 'paymentprovider'}
];

const RelationshiptypeTypes = [
    {id: 0, value: 'competitor'},
    {id: 1, value: 'consultant'},
    {id: 2, value: 'customer'},
    {id: 3, value: 'investor'},
    {id: 4, value: 'partner'},
    {id: 5, value: 'influencer'},
    {id: 6, value: 'press'},
    {id: 7, value: 'prospect'},
    {id: 8, value: 'reseller'},
    {id: 9, value: 'supplier'},
    {id: 10, value: 'vendor'},
    {id: 11, value: 'Other'}
];

const OwnershipTypes = [
    {id: 0, value: 'private'},
    {id: 1, value: 'public'},
    {id: 2, value: 'subsidary'},
    {id: 3, value: 'other'}
];

const StatusTypes = [
    {id: 0, value: 'created'},
    {id: 1, value: 'sent to customer'},
    {id: 2, value: 'due'},
    {id: 3, value: 'paid'}
];

const SocialProfileStatusTypes = [
    {id: 0, value: 'No request'},
    {id: 1, value: 'Request'},
    {id: 2, value: 'Connect'}
];

const ProjectStatusTypes = [
    {id: 0, value: 'Prospect'},
    {id: 1, value: 'Running'},
    {id: 2, value: 'Support'},
    {id: 3, value: 'Postponed'},
    {id: 4, value: 'Ended'}
]

export {
    ConnectionTypes,
    UsageTypes,
    CurrencyTypes,
    GenderTypes,
    MaritalStatusTypes,
    NumberOfEmployeesTypes,
    DerivedTypes,
    RelationshiptypeTypes,
    OwnershipTypes,
    StatusTypes,
    SocialProfileStatusTypes,
    ProjectStatusTypes
}