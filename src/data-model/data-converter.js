import moment from 'moment';

function dataForCard(str, obj) {
    if (!obj) {
        return {}
    }

    switch (str) {
        case 'socialplatform': {
            return {
                '_id': obj._id,
                'id': obj.id,
                'name': obj.name,
                'link': obj.link
            }
        }

        case 'comment': {
            return {
                '_id': obj._id,
                'id': obj.id,
                'partyid': !obj.partyid.length ? {_id: '', name: ''} : { _id: obj.partyid[0]._id, name: obj.partyid[0].name },
                'date': obj.date,
                'text': obj.text,
            }
        }
        case 'party':
            return {
                '_id': obj._id,
                'name': obj.name,
                'derivedtypes': obj.derivedtypes,
                'description': obj.description,
                'mainlocation': !obj.mainlocation.length ? {_id: '', name: ''} : { _id: obj.mainlocation[0]._id, name: obj.mainlocation[0].name },
            }
        case 'product':
            return {
                '_id': obj._id,
                'name': obj.name,
                'id': obj.id,
                'description': obj.description
            }
        case 'systemuser':
            return {
                '_id': obj._id,
                'login': obj.login,
                'password': obj.password
            }
        case 'legalentity':
            return {
                '_id': obj._id,
                'id': obj.id,
                'legalname': obj.legalname,
                'annualrevenue': obj.annualrevenue,
                'ownership': obj.ownership,
                'relationshiptype': obj.relationshiptype,
                'registrationnumber': obj.registrationnumber,
                'tickersymbol': obj.tickersymbol,
                'vatnumber': obj.vatnumber
            }
        case 'organization':
            return {
                '_id': obj._id,
                'id': obj.id,
                'industry': obj.industry,
                'numberofemployees': obj.numberofemployees,
                'siccode': obj.siccode,
                'partyid': !obj.partyid.length ? {_id: '', name: ''} : { _id: obj.partyid[0]._id, name: obj.partyid[0].name },
            }
        case 'paymentprovider':
            return {
                '_id': obj._id,
                'id': obj.id,
                'partyid': !obj.partyid.length ? {_id: '', name: ''} : { _id: obj.partyid[0]._id, name: obj.partyid[0].name },
            }
        case 'person':
            return {
                '_id': obj._id,
                'id': obj.id,
                'firstname': obj.firstname,
                'lastname': obj.lastname,
                'birthday': obj.birthday,
                'gender': obj.gender,
                'jobtitle': obj.jobtitle,
                'maritalstatus': obj.maritalstatus,
                'middlename': obj.middlename,
                'salutation': obj.salutation,
                'spouse': obj.spouse,
                'partyid': !obj.partyid.length ? {_id: '', name: ''} : { _id: obj.partyid[0]._id, name: obj.partyid[0].name },
            }
        case 'bank':
            return {
                '_id': obj._id,
                'id': obj.id,
                'BIC': obj.BIC,
                'partyid': !obj.partyid.length ? {_id: '', name: ''} : { _id: obj.partyid[0]._id, name: obj.partyid[0].name },
            }
        case 'contact':
            return {
                '_id': obj._id,
                'id': obj.id,
                'name': obj.name,
                'city': obj.city,
                'country': obj.country,
                'region': obj.region,
                'type': obj.type,
                'zipcode': obj.zipcode,
                'lattitude': obj.lattitude,
                'longitude': obj.longitude,
                'streetline1': obj.streetline1,
                'streetline2': obj.streetline2,
                'streetline3': obj.streetline3,
                'usage': obj.usage.filter(el => el !== ''),
                'partyid': !obj.partyid.length ? {_id: '', name: ''} : { _id: obj.partyid[0]._id, name: obj.partyid[0].name },
                'description': obj.description
            }
        case 'bankaccount':
            return {
                '_id': obj._id,
                'id': obj.id,
                'IBAN': obj.IBAN,
                'bankid': !obj.bankid.length ? '' : {_id: obj.bankid[0]._id, BIC: obj.bankid[0].BIC},
                'partyid': !obj.partyid.length ? {_id: '', name: ''} : { _id: obj.partyid[0]._id, name: obj.partyid[0].name },
            }
        case 'sales-invoice':
            return {
                '_id': obj._id,
                'id': obj.id,
                'totalamount': obj.totalamount,
                'currency': obj.currency,
                'number': obj.number,
                'invoicedate': obj.invoicedate,
                'duedate': obj.duedate,
                'paymentlink': obj.paymentlink,
                'additionalnote': [...obj.additionalnote],
                'status': obj.status ? obj.status : '',
                'sellerid': !obj.sellerid.length ? {_id: '', name: ''} : {_id: obj.sellerid[0]._id, name: obj.sellerid[0].name} ,
                'buyerid': !obj.buyerid.length ? {_id: '', name: ''} : {_id: obj.buyerid[0]._id, name: obj.buyerid[0].name},
            }

        case 'project':
            return {
                '_id': obj._id,
                'id': obj.id,
                'name': obj.name,
                'customerid': !obj.customerid.length ? {_id: '', name: ''} : {_id: obj.customerid[0]._id, name: obj.customerid[0].name},
                'managerid': !obj.managerid.length ? {_id: '', firstname: '', lastname: ''} : {_id: obj.managerid[0]._id, firstname: obj.managerid[0].firstname, lastname: obj.managerid[0].lastname},
                'startdate': moment(obj.startdate).format('YYYY.MM.DD'),
                'status': obj.status
            }

        case 'projectlog':
            return {
                '_id': obj._id,
                'id': obj.id,
                'year': obj.year,
                'month': obj.month,
                'projectid': obj.projectid.length ? {_id: obj.projectid[0]._id, name: obj.projectid[0].name} : {_id: '', name: ''},
                'employeeid': obj.employeeid.length ? {_id: obj.employeeid[0]._id, firstname: obj.employeeid[0].firstname, lastname: obj.employeeid[0].lastname} : {_id: '', firstname: '', lastname: ''},
                'totalamount': obj.totalamount,
                'currency': obj.currency,
            }

        default:
            return obj
    }
}

function createDataForCard(str, obj) {
    if (!obj) {
        return {
            [str]: {}
        }
    }

    switch (str) {
        case 'party':
            return {
                'party': {
                    '_id': obj._id,
                    'name': obj.name,
                    'derivedtypes': obj.derivedtypes,
                    'description': obj.description,
                    'mainlocation': !obj.mainlocation.length ? {_id: '', name: ''} : { _id: obj.mainlocation[0]._id, name: obj.mainlocation[0].name },
                }
            }

        case 'product' :
            return {
                'product': {
                    '_id': obj._id,
                    'name': obj.name,
                    'id': obj.id,
                    'description': obj.description
                },
            }
        case 'systemuser':
            return {
                'systemuser': {
                    '_id': obj._id,
                    'login': obj.login,
                    'password': obj.password
                }
            }
        case 'legalentity':
            return {
                'legalentity': {
                    '_id': obj._id,
                    'id': obj.id,
                    'legalname': obj.legalname,
                    'annualrevenue': obj.annualrevenue,
                    'ownership': obj.ownership,
                    'relationshiptype': obj.relationshiptype,
                    'registrationnumber': obj.registrationnumber,
                    'tickersymbol': obj.tickersymbol,
                    'vatnumber': obj.vatnumber
                }
            }
        case 'organization':
            return obj.partyid.length !== 0 ? {
                'party': {
                    '_id': obj.partyid[0]._id,
                    'name': obj.partyid[0].name,
                    'derivedtypes': obj.partyid[0].derivedtypes,
                    'description': obj.partyid[0].description,
                    'mainlocation': !obj.partyid[0].mainlocation.length ? {_id: '', name: ''} : { _id: obj.partyid[0].mainlocation[0]._id, name: obj.partyid[0].mainlocation[0].name }
                },
                'organization': {
                    '_id': obj._id,
                    'id': obj.id,
                    'industry': obj.industry,
                    'numberofemployees': obj.numberofemployees,
                    'siccode': obj.siccode,
                    'partyid': !obj.partyid.length ? {_id: '', name: ''} : { _id: obj.partyid[0]._id, name: obj.partyid[0].name },
                }
            } : {
                'organization': {
                    '_id': obj._id,
                    'id': obj.id,
                    'industry': obj.industry,
                    'numberofemployees': obj.numberofemployees,
                    'siccode': obj.siccode,
                    'partyid': !obj.partyid.length ? {_id: '', name: ''} : { _id: obj.partyid[0]._id, name: obj.partyid[0].name },
                }
            }
        case 'paymentprovider':
            return {
                'paymentprovider': {
                    '_id': obj._id,
                    'id': obj.id,
                    'partyid': !obj.partyid.length ? {_id: '', name: ''} : { _id: obj.partyid[0]._id, name: obj.partyid[0].name },
                }
            }
        case 'person':
            return obj.partyid.length !== 0 ? {
                'party': {
                    '_id': obj.partyid[0]._id,
                    'name': obj.partyid[0].name,
                    'derivedtypes': obj.partyid[0].derivedtypes,
                    'description': obj.partyid[0].description,
                    'mainlocation': !obj.partyid[0].mainlocation.length ? {_id: '', name: ''} : { _id: obj.partyid[0].mainlocation[0]._id, name: obj.partyid[0].mainlocation[0].name }
                },
                'person': {
                    '_id': obj._id,
                    'id': obj.id,
                    'firstname': obj.firstname,
                    'lastname': obj.lastname,
                    'birthday': obj.birthday,
                    'gender': obj.gender,
                    'jobtitle': obj.jobtitle,
                    'maritalstatus': obj.maritalstatus,
                    'middlename': obj.middlename,
                    'salutation': obj.salutation,
                    'spouse': obj.spouse,
                    'partyid': !obj.partyid.length ? {_id: '', name: ''} : { _id: obj.partyid[0]._id, name: obj.partyid[0].name },
                }
            } : {
                'person': {
                    '_id': obj._id,
                    'id': obj.id,
                    'firstname': obj.firstname,
                    'lastname': obj.lastname,
                    'birthday': obj.birthday,
                    'gender': obj.gender,
                    'jobtitle': obj.jobtitle,
                    'maritalstatus': obj.maritalstatus,
                    'middlename': obj.middlename,
                    'salutation': obj.salutation,
                    'spouse': obj.spouse,
                    'partyid': !obj.partyid.length ? {_id: '', name: ''} : { _id: obj.partyid[0]._id, name: obj.partyid[0].name },
                }
            }
        case 'bank':
            return {
                'bank': {
                    '_id': obj._id,
                    'id': obj.id,
                    'BIC': obj.BIC,
                    'partyid': !obj.partyid.length ? {_id: '', name: ''} : { _id: obj.partyid[0]._id, name: obj.partyid[0].name },
                }
            }
        case 'contact':
            return {
                'contact': {
                    '_id': obj._id,
                    'id': obj.id,
                    'name': obj.name,
                    'city': obj.city,
                    'country': obj.country,
                    'region': obj.region,
                    'type': obj.type,
                    'zipcode': obj.zipcode,
                    'lattitude': obj.lattitude,
                    'longitude': obj.longitude,
                    'streetline1': obj.streetline1,
                    'streetline2': obj.streetline2,
                    'streetline3': obj.streetline3,
                    'usage': obj.usage.filter(el => el !== ''),
                    'partyid': !obj.partyid.length ? {_id: '', name: ''} : { _id: obj.partyid[0]._id, name: obj.partyid[0].name },
                    'description': obj.description
                }
            }

        case 'bank-account':
            return {
                'bankaccount': {
                    '_id': obj._id,
                    'id': obj.id,
                    'IBAN': obj.IBAN,
                    'bankid': !obj.bankid.length ? '' : {_id: obj.bankid[0]._id, BIC: obj.bankid[0].BIC},
                    'partyid': !obj.partyid.length ? {_id: '', name: ''} : { _id: obj.partyid[0]._id, name: obj.partyid[0].name },
                }
            }

        case 'sales-invoice':
            return Object.keys(obj).length !== 0 ? {
                'invoice': {
                    '_id': obj._id,
                    'id': obj.id,
                    'number': obj.number,
                    'ownerid': (!obj.ownerid || !obj.ownerid.length) ? {_id: '', firstname: '', lastname: ''} : {_id: obj.ownerid[0]._id, firstname: obj.ownerid[0].firstname, lastname: obj.ownerid[0].lastname},
                    'sellerid': !obj.sellerid.length ? {_id: '', name: ''} : {_id: obj.sellerid[0]._id, name: obj.sellerid[0].name} ,
                    'buyerid': !obj.buyerid.length ? {_id: '', name: ''} : {_id: obj.buyerid[0]._id, name: obj.buyerid[0].name},
                    'invoicedate': obj.invoicedate,
                    'duedate': obj.duedate,
                    'totalamount': obj.totalamount,
                    'currency': obj.currency,
                    'additionalnote': [...obj.additionalnote],
                    'status': obj.status ? obj.status : '',
                    'paymentlink': obj.paymentlink,
                }
            } : {
                
            }

        case 'project':
            return {
                'project': {
                    '_id': obj._id,
                    'id': obj.id,
                    'customerid': !obj.customerid.length ? {_id: '', name: ''} : {_id: obj.customerid[0]._id, name: obj.customerid[0].name},
                    'managerid': !obj.managerid.length ? {_id: '', firstname: '', lastname: ''} : {_id: obj.managerid[0]._id, firstname: obj.managerid[0].firstname, lastname: obj.managerid[0].lastname},
                    'startdate': moment(obj.startdate).format('YYYY.MM.DD'),
                    'status': obj.status
                }
            }

        default:
            return obj;
    }
}

function createDataForGrid(str, data) {
    switch (str) {
        case 'party':
            return {
                '_id': data._id,
                'name': data.name,
                'partyid': data.partyid,
                'derivedtypes': data.derivedtypes.join(', '),
            }
        case 'socialplatform':
            return {
                '_id': data._id,
                'name': data.name,
                'link': data.link
            }
        case 'contact':
            return {
                '_id': data._id,
                'id': data.id,
                'name': data.name,
                'country': data.country,
                'region': data.region,
                'type': data.type,
                'usage': data.usage.join(', ')
            }

        case 'person':
            return {
                '_id': data._id,
                'id': data.id,
                'firstname': data.firstname,
                'lastname': data.lastname,
                'gender': data.gender,
                'jobtitle': data.jobtitle,
                'birthday': moment(data.birthday).format('YYYY.MM.DD'),
            }

        case 'bank-account':
            return {
                '_id': data._id,
                'id': data.id,
                'partyid': data.partyid.length !== 0 ? data.partyid[0].name : '',
                'IBAN': data.IBAN,
                'BIC': data.bankid.length !== 0 ? data.bankid[0].BIC : ''
            }

        case 'sales-invoice':
            return {
                '_id': data._id,
                'id': data.id,
                'number': data.invoiceid.length !== 0 ? data.invoiceid[0].number : '',
                'ownerid': (data.invoiceid.length && data.invoiceid[0].ownerid) ? data.invoiceid[0].ownerid[0] : '',
                'buyerid': data.invoiceid.length !== 0 ? data.invoiceid[0].buyerid[0] : '',
                'duedate': data.invoiceid.length !== 0 ? moment(data.invoiceid[0].duedate).format('YYYY.MM.DD') : '',
                'totalamount': data.invoiceid.length !== 0 ? data.invoiceid[0].totalamount : '',
                'currency': data.invoiceid.length !== 0 ? data.invoiceid[0].currency : '',
                'status': data.invoiceid.length !== 0 ? (data.invoiceid[0].status || '') : ''
            }
        case 'organization':
            return {
                '_id': data._id,
                'id': data.id,
                'partyid': data.partyid.length !== 0 ? data.partyid[0].name : '',
                'industry': data.industry,
                'numberofemployees': data.numberofemployees,
                'siccode': data.siccode
            }
        case 'invoiceline': {
            return {
                '_id': data._id,
                'id': data.id,
                'productid': data.productid.length !== 0 ? {_id: data.productid[0]._id, name: data.productid[0].name} : {_id: '', name: ''},
                'price': data.price,
                'quantity': data.quantity,
                'totalamountvatincluding': data.price * data.quantity,
            }
        }
        case 'comment': {
            return {
                '_id': data._id,
                'id': data.id,
                'partyid': data.partyid.length !== 0 ? data.partyid[0].name : '',
                'text': data.text,
                'date': moment(data.date).format('YYYY.MM.DD')
            }
        }

        case 'project': {
            return {
                '_id': data._id,
                'id': data.id,
                'name': data.name,
                'customerid': data.customerid.length ? data.customerid[0].name : '',
                'managerid': data.managerid.length ? `${data.managerid[0].firstname} ${data.managerid[0].lastname}` : '',
                'startdate': moment(data.startdate).format('YYYY.MM.DD'),
                'status': data.status
            }
        }

        case 'projectlog': {
            return {
                '_id': data._id,
                'id': data.id,
                'year': data.year,
                'month': data.month,
                'projectid': data.projectid.length ? data.projectid[0].name : '',
                'employeeid': data.employeeid.length ? `${data.employeeid[0].firstname} ${data.employeeid[0].lastname}` : '',
                'totalamount': data.totalamount,
                'currency': data.currency,
            }
        }

        default:
            return data;
    }
}

function getEmptyEntity(str) {
    switch (str) {
        case 'socialplatform': {
            return {
                name: '',
                link: ''
            }
        }
        case 'comment': {
            return {
                partyid: {_id: '', name: ''},
                date: new Date(),
                text: '',
            }
        }

        case 'party':
            return {
                name: '',
                derivedtypes: [],
                description: "",
                mainlocation: {_id: '', name: ''}
            }

        case 'product':
            return {
                name: '',
                description: ''
            }

        case 'organization':
            return {
                industry: '',
                numberofemployees: '',
                siccode: '',
            }

        case 'invoiceline': 
            return {
                productid: {_id: '', name: ''},
                price: 0,
                quantity: 0,
                vatamount: 0,
                totalamountvatincluding: 0,
                totalamountvatexcluding: 0,
            }

        case 'legalentity':
            return {
                legalname: '',
                annualrevenue: '',
                ownership: '',
                relationshiptype: [],
                registrationnumber: '',
                tickersymbol: '',
                vatnumber: '',
                partyid: {_id: '', name: ''}
            }

        case 'person':
            return {
                firstname: '',
                lastname: '',
                birthday: new Date(),
                gender: '',
                jobtitle: '',
                maritalstatus: '',
                middlename: '',
                salutation: '',
                spouse: '',
                partyid: {_id: '', name: ''}
            }

        case 'bank':
            return {
                BIC: ''
            }

        case 'paymentprovider':
            return {
                
            }

        case 'systemuser':
            return {
                login: '',
                password: ''
            }

        case 'contact':
            return {
                name: '',
                city: '',
                country: '',
                region: '',
                type: '',
                zipcode: '',
                lattitude: '',
                longitude: '',
                streetline1: '',
                streetline2: '',
                streetline3: '',
                usage: [],
                partyid: {_id: '', name: ''},
                description: ''
            }

        case 'bank-account':
            return {
                IBAN: '',
                partyid: {_id: '', name: ''},
                bankid: ''
            }
        case 'sales-invoice':
            return {
                number: '',
                ownerid: {_id: '', firstname: '', lastname: ''},
                sellerid: {_id: '', name: ''},
                buyerid: {_id: '', name: ''},
                invoicedate: new Date(),
                duedate: new Date(),
                totalamount: 0,
                currency: '',
                additionalnote: [],
                status: '',
                paymentlink: '',
            }

        case 'project':
            return {
                name: '',
                customerid: {_id: '', name: ''},
                managerid: {_id: '', firstname: '', lastname: ''},
                startdate: new Date(),
                status: ''
            }
        
        case 'projectlog':
            return {
                year: new Date().getFullYear(),
                month: '',
                projectid: {_id: '', name: ''},
                employeeid: {_id: '', firstname: '', lastname: ''},
                totalamount: 0,
                currency: '',
                price: 0,
                hoursworked: 0
            }

        default:
            return {}
    }
}

function getMainField(str) {
    switch (str) {
        case 'mainlocation':
            return 'contact';
        
        case 'partyid':
            return 'party';

        case 'productid':
            return 'product';

        case 'sellerid':
            return 'party';

        case 'buyerid':
            return 'party';

        case 'invoiceid':
            return 'invoice';

        case 'bankid':
            return 'bank';

        case 'socialplatformid':
            return 'socialplatform';

        case 'ownerid':
            return 'person';

        case 'customerid':
            return 'party';

        case 'managerid':
            return 'person';

        case 'projectid':
            return 'project';

        case 'employeeid':
            return 'person';

        default:
            return str;
    }
}

function setMainField(str) {
    switch (str) {
        case 'mainlocation':
            return 'name';

        case 'sellerid':
            return 'name';

        case 'buyerid':
            return 'name';

        case 'partyid':
            return 'name';

        case 'productid':
            return 'name';

        case 'invoiceid':
            return 'currency';

        case 'bankid':
            return 'BIC';
        
        case 'socialplatformid':
            return 'name';

        case 'ownerid':
            return 'name';

        case 'customerid':
            return 'name'

        case 'managerid':
            return 'name';

        case 'projectid':
            return 'name';

        case 'employeeid':
            return 'name';

        default:
            return str;
    }
}

function transformToCardTitle(str) {
    switch (str) {
        case 'systemuser' :
            return 'System User'
        case 'paymentprovider' :
            return 'Payment Provider'
        case 'legalentity' :
            return 'Legal Entity'
        case 'socialplatform':
            return 'Social Platform'
        case 'projectlog':
            return 'Project Log'
        default :
            return str;
    }
}

export {
    dataForCard,
    setMainField,
    getMainField,
    getEmptyEntity,
    createDataForCard,
    createDataForGrid,
    transformToCardTitle
}