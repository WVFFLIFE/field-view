function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }

    if (b[orderBy] > a[orderBy]) {
        return 1;
    }

    return 0;
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function capitalizeFirstLetter(str) {
    const result = str
        .split(' ')
        .filter(word => typeof word[0] === 'string')
        .map(word => {
            word = word.charAt(0).toUpperCase() + word.substr(1);
            return word;
        })
        .join(' ');

    return result;
}

function _objectWithoutProperties(obj, keys) {
    let target = {};
    for (let i in obj) {
        if (keys.indexOf(i) >= 0) continue;

        if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;

        target[i] = obj[i];
    }

    return target;
}

function bytesToSize(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

function setToLocalStorage(key, rowsPerPage) {
    localStorage.setItem(key, JSON.stringify(rowsPerPage));
}

function getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || null;
}

export {
    getSorting,
    stableSort,
    capitalizeFirstLetter,
    _objectWithoutProperties,
    bytesToSize,
    setToLocalStorage,
    getFromLocalStorage
}