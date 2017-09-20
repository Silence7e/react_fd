import callApi from './callApi';

const url = '/api/home';

export async function getInitText({id}){
    return {response:{text: id}};
}

export async function getText({times}) {
    return {response:{text: times * 2}};
    //return await callApi(`${url}/config?id=${id}`);
}
export default {
    getText,
}