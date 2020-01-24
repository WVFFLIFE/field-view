import {dataForCard} from '../data-model/data-converter';

const API_KEY = '5db1660b7db96665d0674ff8';
const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'x-apikey': API_KEY,
    'cache-control': 'no-cache'
};

const getOption = (method, data = null) => {
    return data ? {
        method,
        headers,
        body: JSON.stringify(data)
    } : {
        method,
        headers 
    }
}

function transformInvoiceLine(id, arr) {
    return arr.filter(item => {
        return item.invoiceid.length !== 0 ? item.invoiceid[0]._id === id : false;
    })
}

class CRMAPI {
    getData = async (url) => {
        const fullUrl = `https://fieldvision-9f35.restdb.io/rest/${url}`;
        const res = await fetch(fullUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-apikey': API_KEY,
                'cache-control': 'no-cache'
            }
        });

        if (!res.ok) {
            throw new Error(`Couldn't fetch ${fullUrl}, received ${res.status}`)
        }

        return await res.json();
    }

    getDataWithToken = async (url, token) => {
        const fullUrl = `https://fieldvision-9f35.restdb.io/rest/${url}`;
        const res = await fetch(fullUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'cache-control': 'no-cache'
            }
        });

        if (!res.ok) {
            throw new Error(`Couldn't fetch ${fullUrl}, received ${res.status}`)
        }

        return await res.json();
    }

    getMainData = async (arr) => {
        return Promise.all(arr.map(link => {
            return this.getData(link)
        }))
    }

    getDataById = async (url, id) => {
        const fullUrl = `https://fieldvision-9f35.restdb.io/rest/${url}/${id}`;
        const res = await fetch(fullUrl, getOption('GET'));

        if (!res.ok) {
            throw new Error(`Couldn't fetch ${fullUrl}, received ${res.status}`)
        }

        return await res.json();
    }

    getDataByIdWithToken = async (url, id, token) => {
        const fullUrl = `https://fieldvision-9f35.restdb.io/rest/${url}/${id}`;
        const res = await fetch(fullUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'cache-control': 'no-cache'
            },
        });

        if (!res.ok) {
            throw new Error(`Couldn't fetch ${fullUrl}, received ${res.status}`)
        }

        return await res.json();
    }

    updateFields = async (url, id, data) => {
        const fullUrl = `https://fieldvision-9f35.restdb.io/rest/${url}/${id}`;
        const res = await fetch(fullUrl, getOption('PATCH', data))

        if (!res.ok) {
            throw new Error(`Couldn't update ${fullUrl}, received ${res.status}`)
        }

        return res.ok;
    }

    updateFieldsWithToken = async (url, id, data, token) => {
        const fullUrl = `https://fieldvision-9f35.restdb.io/rest/${url}/${id}`;
        const res = await fetch(fullUrl, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'cache-control': 'no-cache'
            },
            body: JSON.stringify(data)
        })

        if (!res.ok) {
            throw new Error(`Couldn't update ${fullUrl}, received ${res.status}`)
        }

        return res.ok;
    }

    createNewParty = async (data) => {
        const fullUrl = `https://fieldvision-9f35.restdb.io/rest/party`;

        const res = await fetch(fullUrl, getOption('POST', data));

        if (!res.ok) {
            throw new Error(`Couldn't fetch ${fullUrl}, received ${res.status}`)
        }

        return await res.json();
    }

    createNewInvoice = async (data) => {
        const fullUrl = `https://fieldvision-9f35.restdb.io/rest/invoice`;

        const res = await fetch(fullUrl, getOption('POST', data));

        if (!res.ok) {
            throw new Error(`Couldn't fetch ${fullUrl}, received ${res.status}`)
        }

        return await res.json();
    }

    createNewInvoiceWithToken = async (data, token) => {
        const fullUrl = `https://fieldvision-9f35.restdb.io/rest/invoice`;

        const res = await fetch(fullUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'cache-control': 'no-cache'
            },
            body: JSON.stringify(data)
        })

        if (!res.ok) {
            throw new Error(`Couldn't fetch ${fullUrl}, received ${res.status}`)
        }

        return await res.json();
    }

    createMedia = async (data, token) => {
        const fullUrl = `https://fieldvision-9f35.restdb.io/media`;

        const res = await fetch(fullUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': '/',
                'Cache-Control': 'no-cache',
                'Host': 'fieldvision-9f35.restdb.io',
                'Accept-Encoding': "gzip, deflate",
                "Connection": "keep-alive",
                "cache-control": 'no-cache',
            },
            body: data
        })

        if (!res.ok) {
            throw new Error(`Couldn't fetch ${fullUrl}, received ${res.status}`)
        }

        return await res.json();
    }

    createNewEntity = async (url, data) => {
        const fullUrl = `https://fieldvision-9f35.restdb.io/rest/${url}`;

        const res = await fetch(fullUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-apikey': API_KEY,
                'cache-control': 'no-cache'
            },
            body: JSON.stringify(data)
        })

        if (!res.ok) {
            throw new Error(`Couldn't fetch ${fullUrl}, received ${res.status}`)
        }

        return await res.json();
    }

    createNewEntityWithToken = async (url, data, token) => {
        const fullUrl = `https://fieldvision-9f35.restdb.io/rest/${url}`;

        const res = await fetch(fullUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'cache-control': 'no-cache'
            },
            body: JSON.stringify(data)
        })

        if (!res.ok) {
            throw new Error(`Couldn't fetch ${fullUrl}, received ${res.status}`)
        }

        return await res.json();
    }

    deleteEntity = async (path, id) => {
        const fullUrl = `https://fieldvision-9f35.restdb.io/rest/${path}/${id}`;

        const res = await fetch(fullUrl, getOption('DELETE'));

        if (!res.ok) {
            throw new Error(`Couldn't fetch ${fullUrl}, received ${res.status}`)
        }

        return await res.json();
    }

    deleteEntityWithToken = async (path, id, token) => {
        const fullUrl = `https://fieldvision-9f35.restdb.io/rest/${path}/${id}`;

        const res = await fetch(fullUrl, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'cache-control': 'no-cache'
            }
        })

        if (!res.ok) {
            throw new Error(`Couldn't fetch ${fullUrl}, received ${res.status}`)
        }

        return await res.json();
    }

    createSalesInvoice = async (data) => {
        try {
            const invoice = await this.createNewInvoice(data.invoice);
            await this.createNewEntity('salesinvoice', {invoiceid: invoice._id});
            const invoiceline = await this.createNewEntity('invoiceline', data.invoiceline.map(item => {
                return {
                    ...item,
                    invoiceid: invoice._id
                }
            }))

            await this.updateFields('invoice', invoice._id, {
                totalamount: invoiceline.reduce((s, c) => {
                    return s + c.totalamountvatincluding
                }, 0)
            })

            return true;
        } catch (err) {
            throw new Error(err.message)
        }
    }

    fetchDataForSalesInvoiceTable = async (token) => {
        const salesInvoiceData = await this.getDataWithToken('salesinvoice', token);
        const partyData = await this.getData('party');
        const personData = await this.getData('person');
        
        return {
            salesInvoiceData,
            partyData,
            personData
        }
    }

    createNewFile = async (data, invoiceid, token) => {
        const mediaRes = await this.createMedia(data, token);
        const fileData = mediaRes.ids.map(id => {
            return {
                contentid: id,
                invoiceid
            }
        })
        const res = await this.createNewEntityWithToken('file', fileData, token);

        return res;
    }

    getMetaWithToken = async (id, token) => {
        const fullUrl = `https://fieldvision-9f35.restdb.io/media/${id}/meta`;
        const res = await fetch(fullUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'cache-control': 'no-cache'
            }
        });

        if (!res.ok) {
            throw new Error(`Couldn't fetch ${fullUrl}, received ${res.status}`)
        }

        return await res.json();
    }

    getFilesWithToken = async (invoiceid, token) => {
        const files = await this.getDataWithToken('file', token);
        const filesMeta = files.filter(item => item.invoiceid[0]._id === invoiceid);
        let result = [];

        for (const file of filesMeta) {
            let pendingResult = await this.getMetaWithToken(file.contentid, token);
            result = [...result, ...pendingResult];
        }

        return {
            filesContainer: files,
            files: result
        };
    }

    fetchDataForInvoiceDetails = async (id, token) => {
        const salesInvoiceDetailsData = await this.getDataByIdWithToken('salesinvoice', id, token);
        const invoiceLinesData = await this.getDataWithToken('invoiceline', token);
        const invoiceDetailsData = salesInvoiceDetailsData.invoiceid.length !== 0 ? await this.getDataByIdWithToken('invoice', salesInvoiceDetailsData.invoiceid[0]._id, token) : {};
        const invoiceFiles = await this.getFilesWithToken(invoiceDetailsData._id, token);

        return {
            invoiceDetailsData,
            invoiceLinesData: invoiceDetailsData ? transformInvoiceLine(invoiceDetailsData._id, invoiceLinesData) : [],
            invoiceFiles: invoiceFiles || []
        }
    }

    deleteFileWithToken = async (id, token) => {
        const fullUrl = `https://fieldvision-9f35.restdb.io/media/${id}`;

        const res = await fetch(fullUrl, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })

        if (!res.ok) {
            throw new Error(`Couldn't fetch ${fullUrl}, received ${res.status}`)
        }

        return res.ok;
    }

    deleteEntityFileWithToken = async (mediaid, fileid, token) => {
        try {
            await this.deleteFileWithToken(mediaid, token);
            await this.deleteEntityWithToken('file', fileid, token);

            return true;
        } catch (err) {
            console.error(err);
        }
    }

    createSalesInvoiceWithToken = async (data, token) => {
        try {
            const invoice = await this.createNewInvoiceWithToken(data.invoice, token);
            await this.createNewEntityWithToken('salesinvoice', {invoiceid: invoice._id}, token);
            const invoiceline = await this.createNewEntityWithToken('invoiceline', data.invoiceline.map(item => ({
                ...item,
                invoiceid: invoice._id
            })), token);
            const fileArray = data.invoiceFiles.getAll('file');
            if (fileArray.length > 0) {
                await this.createNewFile(data.invoiceFiles, invoice._id, token);
            }
            await this.updateFieldsWithToken('invoice', invoice._id, {
                totalamount: invoiceline.reduce((s, c) => {
                    return s + c.totalamountvatincluding
                }, 0)
            }, token)

            return true;
        } catch (err) {
            throw new Error(err.message)
        }
    }

    fetchDerivedTypesData = async (arr, id) => {
        const data = arr.map(async item => {
            let el = {};
            await this.getData(item)
                .then(data => {
                    const arr = data.filter(item => item.partyid.length !== 0 ? item.partyid[0]._id === id : false)
                    el = {
                        [item]: arr.length === 0 ? null : arr[0]
                    }
                })

            return el;
        });

        return Promise.all(data);
    }

    fetchDetails = async(path, id) => {
        const mainRes = await this.getDataById(path, id);
        let res = {
            [path]: dataForCard(path, mainRes)
        }
        if (['organization', 'person'].includes(path)) {
            const mainlocationid = mainRes.partyid.length !== 0 ? mainRes.partyid[0].mainlocation[0] : null;
            const partyid = mainRes.partyid[0]._id;
            const contact = await this.getDataById('contact', mainlocationid);

            res = {
                'party': {
                    ...dataForCard('party', mainRes.partyid[0]),
                    mainlocation: {
                        _id: contact._id || '',
                        name: contact.name || ''
                    }
                },
                ...res
            }
            
            const derivedtypes = mainRes.partyid[0].derivedtypes.filter(el => el !== path);
            for (const type of derivedtypes) {
                const resType = await this.getData(type);
                const filteredResType = resType.filter(obj => {
                    return obj.partyid.length !== 0 ? obj.partyid[0]._id === partyid : false
                })
                res = {
                    ...res,
                    [type]: filteredResType.length !== 0 ? dataForCard(type, filteredResType[0]) : {}
                }
            }
        }
        return res;
    }

    fetchComments = async (id) => {
        const comments = await this.getData('comment');
        const filteredComments = comments.filter(comment => comment.partyid[0]._id === id);
        
        return filteredComments;
    }

    fetchSocialProfiles = async (id) => {
        const socialProfiles = await this.getData('socialprofile');
        const filteredSocialProfile = socialProfiles.filter(socialProfile => socialProfile.partyid[0]._id === id);

        return filteredSocialProfile;
    }

    fetchProjectDataGrid = async (token) => {
        const projectData = await this.getDataWithToken('project', token);
        const partyData = await this.getData('party');
        const personData = await this.getData('person');

        return {
            projectData,
            partyData,
            personData
        }
    }
}

export default new CRMAPI();