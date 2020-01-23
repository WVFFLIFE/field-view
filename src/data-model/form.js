import {
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
    ProjectStatusTypes
} from './case';

export const formProps = {
    optionSets: {
        party: {
            derivedtypes: [...DerivedTypes],
        },
        organization: {
            derivedtypes: [...DerivedTypes],
            numberofemployees: [...NumberOfEmployeesTypes],
        },
        person: {
            derivedtypes: [...DerivedTypes],
            gender: [...GenderTypes],
            maritalstatus: [...MaritalStatusTypes],
        },
        contact: {
            type: [...ConnectionTypes],
            usage: [...UsageTypes],
        },
        invoice: {
            currency: [...CurrencyTypes],
            status: [...StatusTypes]
        },
        project: {
            status: [...ProjectStatusTypes]
        }
        // currency: [...CurrencyTypes],
        // gender: [...GenderTypes],
        // maritalstatus: [...MaritalStatusTypes],
        // numberofemployees: [...NumberOfEmployeesTypes],
        // derivedtypes: [...DerivedTypes],
        // relationshiptype: [...RelationshiptypeTypes],
        // ownership: [...OwnershipTypes],
        // status: [...StatusTypes]
    }
}

export const formModel = [
    {
        groupName: 'Sales Invoice',
        fieldsGroup: [
            {
                fields: [
                    {
                        name: 'invoiceid',
                        validations: [],
                        label: 'Invoice ID',
                        type: 'lookUp',
                        editable: true
                    }
                ]
            }
        ]
    },
    {
        groupName: 'Party',
        fieldsGroup: [
            {
                fields: [
                    {
                        name: 'name',
                        validations: [],
                        label: 'Name',
                        type: 'text',
                        editable: true
                    },
                    {
                        name: 'derivedtypes',
                        validations: [],
                        label: 'Derived Types',
                        type: 'optionSet',
                        multiple: true,
                        editable: true
                    },
                    {
                        name: 'description',
                        validations: [],
                        label: 'Description',
                        type: 'text',
                        editable: true
                    },
                    {
                        name: 'mainlocation',
                        validations: [],
                        label: 'Main Location',
                        type: 'lookUp',
                        editable: true
                    }
                ]
            }
        ]
    },
    {
        groupName: 'Contact',
        fieldsGroup: [
            {
                fields: [
                    {
                        name: 'name',
                        validations: [],
                        placeholder: '',
                        label: 'Name',
                        type: 'text',
                        editable: true
                    },
                    {
                        name: 'country',
                        validations: [],
                        placeholder: '',
                        label: 'Country',
                        type: 'text',
                        editable: true
                    },
                    {
                        name: 'city',
                        validations: [],
                        placeholder: '',
                        label: 'City',
                        type: 'text',
                        editable: true
                    },
                    {
                        name: 'region',
                        validations: [],
                        placeholder: '',
                        label: 'Region',
                        type: 'text',
                        editable: true
                    },
                    {
                        name: 'type',
                        validations: [],
                        placeholder: '',
                        label: 'Type',
                        type: 'optionSet',
                        multiple: false,
                        editable: true
                    },
                    {
                        name: 'usage',
                        validations: [],
                        placeholder: '',
                        label: 'Usage',
                        type: 'optionSet',
                        multiple: true,
                        editable: true
                    },
                    {
                        name: 'zipcode',
                        validations: [],
                        placeholder: '',
                        label: 'Zipcode',
                        type: 'text',
                        editable: true
                    },
                    {
                        name: 'streetline1',
                        validations: [],
                        placeholder: '',
                        label: 'Street Line 1',
                        type: 'text',
                        editable: true
                    },
                    {
                        name: 'streetline2',
                        validations: [],
                        placeholder: '',
                        label: 'Street Line 2',
                        type: 'text',
                        editable: true
                    },
                    {
                        name: 'streetline3',
                        validations: [],
                        placeholder: '',
                        label: 'Street Line 3',
                        type: 'text',
                        editable: true
                    },
                    {
                        name: 'lattitude',
                        validations: [],
                        placeholder: '',
                        label: 'Lattitude',
                        type: 'text',
                        editable: true
                    },
                    {
                        name: 'longitude',
                        validations: [],
                        placeholder: '',
                        label: 'Longitude',
                        type: 'text',
                        editable: true
                    },
                    {
                        name: 'partyid',
                        validations: [],
                        placeholder: '',
                        label: 'Party',
                        type: 'lookUp',
                        editable: true
                    },
                    {
                        name: 'description',
                        validations: [],
                        placeholder: '',
                        label: 'Description',
                        type: 'text',
                        editable: true
                    }
                ]
            }
        ]
    },
    {
        groupName: 'Organization',
        fieldsGroup: [
            {
                fields: [
                    {
                        name: 'industry',
                        validations: [],
                        label: 'Industry',
                        type: 'text',
                        editable: true
                    },
                    {
                        name: 'numberofemployees',
                        validations: [],
                        label: 'Number of Employees',
                        type: 'optionSet',
                        multiple: false,
                        editable: true
                    },
                    {
                        name: 'siccode',
                        validations: [],
                        label: 'Sic Code',
                        type: 'text',
                        editable: true
                    },
                    {
                        name: 'partyid',
                        validations: [],
                        label: 'Party',
                        type: 'lookUp',
                        editable: true
                    }
                ]
            }
        ]
    },
    {
        groupName: 'Party',
        fieldsGroup: [
            {
                fields: [
                    {
                        name: 'name',
                        validations: [],
                        label: 'Name',
                        type: 'text',
                        editable: true
                    },
                    {
                        name: 'derivedtypes',
                        validations: [],
                        label: 'Derived Types',
                        type: 'optionSet',
                        multiple: false,
                        editable: true
                    },
                    {
                        name: 'description',
                        validations: [],
                        label: 'Description',
                        type: 'text',
                        editable: true
                    }
                ]
            }
        ]
    },
    {
        groupName: 'Legal Entity',
        fieldsGroup: [
            {
                fields: [
                    {
                        name: 'legalname',
                        validations: [],
                        label: 'Legal Name',
                        type: 'text',
                        editable: true
                    },
                    {
                        name: 'annualrevenue',
                        validations: [],
                        label: 'Annual Revenue',
                        type: 'text',
                        editable: true
                    },
                    {
                        name: 'tickersymbol',
                        validations: [],
                        label: 'Ticker Symbol',
                        type: 'text',
                        editable: true
                    },
                    {
                        name: 'relationshiptype',
                        validations: [],
                        label: 'Relationship Type',
                        type: 'optionSet',
                        multiple: true,
                        editable: true
                    },
                    {
                        name: 'ownership',
                        validations: [],
                        label: 'Ownership',
                        type: 'optionSet',
                        multiple: false,
                        editable: true
                    },
                    {
                        name: 'vatnumber',
                        validations: [],
                        label: 'Vat Number',
                        type: 'text',
                        editable: true
                    },
                    {
                        name: 'registrationnumber',
                        validations: [],
                        label: 'Registration Number',
                        type: 'text',
                        editable: true
                    },
                    {
                        name: 'partyid',
                        validations: [],
                        label: 'Party',
                        type: 'lookUp',
                        editable: true
                    },
                    {
                        name: 'invoiceaddressid',
                        validations: [],
                        label: 'Invoice Address',
                        type: 'text',
                        editable: false
                    },
                    {
                       name: 'organizationid',
                       validations: [],
                       label: 'Organization',
                       type: 'text',
                       editable: false
                    }
                ]
            }
        ]
    },
    {
        groupName: 'Person',
        fieldsGroup: [
            {
                fields: [
                    {
                        name: 'firstname',
                        validations: [],
                        label: 'First Name',
                        type: 'text',
                        editable: true
                    },
                    {
                        name: 'lastname',
                        validations: [],
                        label: 'Last Name',
                        type: 'text',
                        editable: true
                    },
                    {
                        name: 'gender',
                        validations: [],
                        label: 'Gender',
                        type: 'optionSet',
                        multiple: false,
                        editable: true
                    },
                    {
                        name: 'jobtitle',
                        validations: [],
                        label: 'Job Title',
                        type: 'text',
                        editable: true
                    },
                    {
                        name: 'maritalstatus',
                        validations: [],
                        label: 'Marital Status',
                        type: 'optionSet',
                        multiple: false,
                        editable: true
                    },
                    {
                        name: 'birthday',
                        validations: [],
                        label: 'Birthday',
                        type: 'date',
                        editable: true
                    },
                    {
                        name: 'middlename',
                        validations: [],
                        label: 'Middlename',
                        type: 'text',
                        editable: true
                    },
                    {
                        name: 'salutation',
                        validations: [],
                        label: 'Salutation',
                        type: 'text',
                        editable: true
                    },
                    {
                        name: 'spouse',
                        validations: [],
                        label: 'Spouse',
                        type: 'text',
                        editable: true
                    },
                    {
                        name: 'partyid',
                        validations: [],
                        label: 'Party',
                        type: 'lookUp',
                        editable: true
                    }
                ]
            }
        ]
    },
    {
        groupName: 'Invoice',
        fieldsGroup: [
            {
                fields: [
                    {
                        name: 'totalamount',
                        validations: [],
                        label: 'Total Amount',
                        type: 'text' ,
                        editable: false
                    },
                    {
                        name: 'currency',
                        validations: [],
                        label: 'Currency',
                        type: 'optionSet',
                        multiple: false,
                        editable: true
                    },
                    {
                        name: 'number',
                        validations: [],
                        label: 'Number',
                        type: 'text',
                        editable: true
                    },
                    {
                        name: 'invoicedate',
                        validations: [],
                        label: 'Invoice Date',
                        type: 'date',
                        editable: true
                    },
                    {
                        name: 'duedate',
                        validations: [],
                        label: 'Due Date',
                        type: 'date',
                        editable: true
                    },
                    {
                        name: 'paymentlink',
                        validations: [],
                        label: 'Payment Link',
                        type: 'text',
                        editable: true
                    },
                    {
                        name: 'additionalnote',
                        validations: [],
                        label: 'Additional Note',
                        type: 'multiline',
                        editable: true,
                    },
                    {
                        name: 'status',
                        validations: [],
                        label: 'Status',
                        type: 'optionSet',
                        editable: true
                    },
                    {
                        name: 'sellerid',
                        validations: [],
                        label: 'Seller',
                        type: 'lookUp',
                        editable: true,
                    },
                    {
                        name: 'buyerid',
                        validations: [],
                        label: 'Buyer',
                        type: 'lookUp',
                        editable: true
                    },
                    {
                        name: 'ownerid',
                        validations: [],
                        label: 'Owner',
                        type: 'lookUp',
                        editable: true
                    }
                ]
            }
        ]
    },
    {
        groupName: 'Invoice Line',
        fieldsGroup: [
            {
                fields: [
                    {
                        name: 'productid',
                        validations: [],
                        label: 'Product',
                        type: 'lookUp',
                        editable: true
                    },
                    {
                        name: 'price',
                        validations: [],
                        label: 'Price',
                        type: 'number',
                        editable: true
                    },
                    {
                        name: 'quantity',
                        validations: [],
                        label: 'Quantity',
                        type: 'number',
                        editable: true
                    },
                    {
                        name: 'totalamountvatincluding',
                        validations: [],
                        label: 'Total Amount',
                        type: 'text',
                        editable: false
                    },
                    {
                        name: 'vatamount',
                        validations: [],
                        label: 'Vat Amount',
                        type: 'text',
                        editable: true,
                    },
                    {
                        name: 'totalamountvatexcluding',
                        validations: [],
                        label: 'Total amount vat excluding',
                        type: 'text',
                        editable: true
                    },
                    {
                        name: 'invoiceid',
                        validations: [],
                        label: 'Invoice',
                        type: 'lookUp',
                        editable: true
                    },
                ]
            }
        ]
    },
    {
        groupName: 'Bank',
        fieldsGroup: [
            {
                fields: [
                    {
                        name: 'BIC',
                        validations: [],
                        label: 'BIC',
                        type: 'text',
                        editable: true
                    },
                    {
                        name: 'partyid',
                        validations: [],
                        label: 'Party',
                        type: 'lookUp',
                        editable: true
                    }
                ] 
            }
        ]
    },
    {
        groupName: 'Bank Account',
        fieldsGroup: [
            {
                fields: [
                    {
                        name: 'IBAN',
                        validations: [],
                        label: 'IBAN',
                        type: 'text',
                        editable: true
                    },
                    {
                        name: 'BIC',
                        validations: [],
                        label: 'BIC',
                        type: 'text',
                        editable: true
                    },
                    {
                        name: 'bankid',
                        validations: [],
                        label: 'Bank',
                        type: 'lookUp',
                        editable: true
                    },
                    {
                        name: 'partyid',
                        validations: [],
                        label: 'Party',
                        type: 'lookUp',
                        editable: true
                    }
                ]
            }
        ]
    },
    {
        groupName: 'Payment Provider',
        fieldsGroup: [
            {
                fields: [
                    {
                        name: 'partyid',
                        validations: [],
                        label: 'Party',
                        type: 'lookUp',
                        editable: true
                    }
                ]
            }
        ]
    },
    {
        groupName: 'System User',
        fieldsGroup: [
            {
                fields: [
                    {
                        name: 'login',
                        validations: [],
                        label: 'Login',
                        type: 'text',
                        editable: true
                    },
                    {
                        name: 'password',
                        validations: [],
                        label: 'Password',
                        type: 'text',
                        editable: true
                    },
                    {
                        name: 'partyid',
                        validations: [],
                        label: 'Party',
                        type: 'text',
                        editable: false
                    }
                ]
            }
        ]
    },
    {
        groupName: 'Product',
        fieldsGroup: [
            {
                fields: [
                    {
                        name: 'name',
                        validations: [],
                        label: 'Name',
                        type: 'text',
                        editable: true
                    },
                    {
                        name: 'description',
                        validations: [],
                        label: 'Description',
                        type: 'text',
                        editable: true
                    }
                ]
            }
        ]
    },
    {
        groupName: 'Comment',
        fieldsGroup: [
            {
                fields: [
                    {
                        name: 'partyid',
                        validations: [],
                        label: 'Party',
                        type: 'lookUp',
                        editable: true
                    },
                    {
                        name: 'date',
                        validations: [],
                        label: 'Date',
                        type: 'date',
                        editable: true
                    },
                    {
                        name: 'text',
                        validations: [],
                        label: 'Comment',
                        type: 'comment',
                        editable: true
                    },
                ]
            }
        ]
    },
    {
        groupName: 'Social Platform',
        fieldsGroup: [
            {
                fields: [
                    {
                        name: 'name',
                        validations: [],
                        label: 'Name',
                        type: 'text',
                        editable: true
                    },
                    {
                        name: 'link',
                        validations: [],
                        label: 'Link',
                        type: 'text',
                        editable: true
                    }
                ]
            }
        ]
    },
    {
        groupName: 'Project',
        fieldsGroup: [
            {
                fields: [
                    {
                        name: 'name',
                        validations: [],
                        label: 'Name',
                        type: 'text',
                        editable: true
                    },
                    {
                        name: 'customerid',
                        validations: [],
                        label: 'Customer',
                        type: 'lookUp',
                        editable: true
                    },
                    {
                        name: 'managerid',
                        validations: [],
                        label: 'Manager',
                        type: 'lookUp',
                        editable: true
                    },
                    {
                        name: 'startdate',
                        validations: [],
                        label: 'Start Date',
                        type: 'date',
                        editable: true
                    },
                    {
                        name: 'status',
                        validations: [],
                        label: 'Status',
                        type: 'optionSet',
                        editable: true
                    }
                ]
            }
        ]
    }
]