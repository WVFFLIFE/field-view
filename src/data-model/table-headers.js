const bankAccountHeaders = [
    {id: 'partyid', label: 'Party'},
    {id: 'BIC', label: 'BIC'},
    {id: 'IBAN', label: 'IBAN'}
];

const salesInvoiceHeaders = [
    {id: 'number', label: 'Number'},
    {id: 'buyerid', label: 'Buyer'},
    {id: 'ownerid', label: 'Owner'},
    {id: 'duedate', label: 'Due Date'},
    {id: 'totalamount', label: 'Total Amount'},
    {id: 'currency', label: 'Currency'},
    {id: 'status', label: 'Status'}
];

const contactHeaders = [
    {id: 'name', label: 'Name'},
    {id: 'country', label: 'Country'},
    {id: 'region', label: 'Region'},
    {id: 'type', label: 'Type'},
    {id: 'usage', label: 'Usage'}
];

const partyHeaders = [
    {id: 'partyid', label: 'Party Id'},
    {id: 'name', label: 'Name'},
    {id: 'derivedtypes', label: 'Derived Types'},
];

const organizationsHeaders = [
    {id: 'partyid', label: 'Party'},
    {id: 'industry', label: 'Industry'},
    {id: 'numberofemployees', label: 'Number of Employees'},
    {id: 'siccode', label: 'SIC Code'}
];

const personsHeaders = [
    {id: 'firstname', label: 'First Name'},
    {id: 'lastname', label: 'Last Name'},
    {id: 'gender', label: 'Gender'},
    {id: 'jobtitle', label: 'Job Title'},
    {id: 'birthday', label: 'Birthday'},
];

const invoiceLinesHeaders = [
    {id: 'productid', label: 'Product'},
    {id: 'price', label: 'Price'},
    {id: 'quantity', label: 'Quantity'},
    {id: 'totalamountvatincluding', label: 'Total Amount'}
];

const productsHeaders = [
    {id: 'name', label: 'Name'},
    {id: 'description', label: 'Description'}
];

const socialPlatformHeaders = [
    {id: 'name', label: 'Name'},
    {id: 'link', label: 'Link'}
];

const projectHeaders = [
    {id: 'name', label: 'Name'},
    {id: 'customerid', label: 'Customer'},
    {id: 'managerid', label: 'Manager'},
    {id: 'startdate', label: 'Start Date'},
    {id: 'status', label: 'Status'}
];

const projectLogHeaders = [
    {id: 'year', label: 'Year'},
    {id: 'month', label: 'Month'},
    {id: 'projectid', label: 'Project'},
    {id: 'employeeid', label: 'Employee'},
    {id: 'totalamount', label: 'Total amount'},
    {id: 'currency', label: 'Currency'},
];

export {
    invoiceLinesHeaders,
    bankAccountHeaders,
    salesInvoiceHeaders,
    contactHeaders,
    partyHeaders,
    organizationsHeaders,
    personsHeaders,
    productsHeaders,
    socialPlatformHeaders,
    projectHeaders,
    projectLogHeaders
}