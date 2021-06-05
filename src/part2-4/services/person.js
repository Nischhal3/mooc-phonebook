import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = personObj => {
    return axios.post(baseUrl, personObj)
}

const update = (id, personObj) => {
    return axios.put(`${baseUrl}/${id}`, personObj)
}

const deletePerson = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

const services = {
    getAll,
    create,
    update,
    deletePerson
}

export default services;