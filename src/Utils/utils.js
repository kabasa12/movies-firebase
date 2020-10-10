import axios from 'axios';
import firebaseDb from '../firebase';

const getAllFirebase = async (coll) => {
    let data = [];
    // let resp = await firebaseDb.firestore().collection(coll).get();
    // data = resp.docs.map(doc => ({
    //     id:doc.id,
    //     ...doc.data()
    // }))
    firebaseDb.child(coll).on('value', snapshot =>
        {   
            if(snapshot.val() != null)
            {   
               return data = snapshot.val()
            }
            else
            {
              return  data = []
                
            }
        })
}
const getAll = async(url,type) => {
    let resp = await axios.get(url);
    let data = [];
    if(type === "members") {
        resp.data.map(d => {
            data.push({//id:d.id,
                       name:d.name,
                       email:d.email,
                       city:d.address.city})
        });
    } else if(type === "movies") {
        resp.data.map(d => {
            let dt = new Date(d.premiered).getFullYear()
            data.push({//id:d.id,
                       name:d.name,
                       image:d.image.medium,
                       premiered:dt,
                       genres:[...d.genres]})
        });
    }
    return data;
}

const getById = async (url,id) => {
    let resp = await axios.get(url + `/${id}`);
    return resp.data;
}

const getMemberById = async (url,id) => {
    let resp = await axios.get(url + `/${id}`);
    return {id:resp.data.id,
            name:resp.data.name,
            email:resp.data.email,
            city:resp.data.address.city};
}

export default {getAllFirebase,getAll,getById,getMemberById}