import axios from 'axios';

const getData = async (url) => {
    return await axios({
        method: "GET",
        url: url,
    });
}

const patchData = async (url, data) => {
    return await axios({
        method: "PATCH",
        url: url,
        data: data,
        headers: {
            "content-type": "application/json"
        }
    })
}

export {
    getData,
    patchData
}