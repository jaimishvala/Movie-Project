const apiURL = "http://localhost:3000/";

const sendRequest = (path, config = {}) => {

    try {
        return fetch(apiURL + path, config)
            .then((Response) => {
                if (!Response.ok) {
                    throw new Error("Something Went Wrong.")
                }
                return Response.json();
            })
            .catch((error) => { return error });
    } catch (error) {
        return error;
    }
}

const postRequest = (path, data) => {
    return sendRequest(
        path,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }
    )
}

const putRequest = (path, data) => {
    return sendRequest(
        path,
        {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }
    )
}

const deleteRequest = (path) => {
    return sendRequest(path, {
        method: 'DELETE'
    })
}

const getRequest = (path) => {
    return sendRequest(path);
}