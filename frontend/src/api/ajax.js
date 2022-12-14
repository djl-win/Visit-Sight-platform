import axios from 'axios';
import {toast} from 'react-toastify';


export default function ajax(url, data = {}, type = 'GET') {
    return new Promise((resolve, reject) => {
        let promise; //use let, since const need give a initial value
        // 1.excuse ajax 
        if (type === 'GET') {
            promise = axios.get(url, {
                params: data
            })
        } else if(type === 'POST'){
            promise = axios.post(url, data)
        } else if(type === 'PUT'){
            promise = axios.put(url, data)
        } else if(type === 'DELETE'){
            promise = axios.delete(url, data)
        } 
        // 2.if success can resolve
        promise.then(value => {
            resolve(value.data)
            // 3.if false then display the error message other then call the reject(reason)
        }).catch(error => {
            toast.error('something wrong: '+ error.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        })
    })
};
