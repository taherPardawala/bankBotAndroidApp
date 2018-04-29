import axios from 'axios';
import store from '@/vuex';
// const baseUri = window.location.protocol+"//"+window.location.host; //production url
const baseUri = 'https://bankbot.tk'; //android url
// const baseUri = 'http://localhost:5000';

export default {
    baseUri : baseUri,
    login: (userdata) => {
        // NOTE => userdata :{id:<user_id>,password:<user_password>}
        return axios.post(baseUri + '/auth/v0.1/user/login', { user: userdata })
            .then(function (response) {
                console.log(response);
                return response.data;
            })
            .catch(function (error) {
                console.error(error);
                return error;
            });
    },
    signupUser: (userdata) => {
        return axios.post(baseUri + '/auth/v0.1/createUser', { user: userdata })
            .then(function (response) {
                console.log(response);
                return response.data;
            })
            .catch(function (error) {
                console.error(error);
            });
    },
    getBankNames: () => {
        return axios.get(baseUri + '/user/v0.1/bankNames', {
            headers: {
                auth: store.getters.auth
            }
        }).then(function (response) {
            console.log(response.data);
            return response.data;
        }).catch(function (error) {
            console.error(error)
        })
    },
    createSavingsAccount: (data, imageData) => {

        let formData = new FormData();
        formData.append('file', imageData.adharImage);
        let formData1 = new FormData();
        formData1.append('file', imageData.panImage);

        return axios.post(baseUri + '/fileop/v0.1/adhar', formData, {
            headers: {
                'Cache-Control': 'no-cache',
                'Content-Type': 'application/x-www-form-urlencoded',
                'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
            }
        })
            .then(function (response) {
                if (response.data.ok) {
                    data.adharImageFileName = response.data.fileName;

                    return axios.post(baseUri + '/fileop/v0.1/pan', formData1, {
                        headers: {
                            'Cache-Control': 'no-cache',
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
                        }
                    })
                        .then(function (response) {
                            if (response.data.ok) {
                                data.panImageFileName = response.data.fileName;
                                
                                return axios.post(baseUri + '/user/v0.1/createSavingsAccount', { data: data }, {
                                    headers: {
                                        auth: store.getters.auth
                                    }
                                })
                                    .then(function (response) {
                                        console.log(response);
                                        return response.data;
                                    })
                                    .catch(function (error) {
                                        console.error(error);
                                    });
                            } else {
                                return { ok: false }
                            }
                        })
                        .catch(function (error) {
                            console.error(error);
                        });
                } else {
                    return { ok: false }
                }
            })
            .catch(function (error) {
                console.error(error);
            });
    },
    getSavingsApplications: () => {
        return axios.get(baseUri + '/bank/v0.1/savingsApplications', {
            headers: {
                auth: store.getters.auth
            }
        }).then(function (response) {
            console.log(response.data);
            return response.data;
        }).catch(function (error) {
            console.error(error)
        })
    },
    getAppointments: () => {
        return axios.get(baseUri + '/bank/v0.1/appointments', {
            headers: {
                auth: store.getters.auth
            }
        }).then(function (response) {
            console.log(response.data);
            return response.data;
        }).catch(function (error) {
            console.error(error)
        })
    },
    getCareers: () => {
        return axios.get(baseUri + '/bank/v0.1/careers', {
            headers: {
                auth: store.getters.auth
            }
        }).then(function (response) {
            console.log(response.data);
            return response.data;
        }).catch(function (error) {
            console.error(error)
        })
    },
    updateSavingsAccountStatus: (refNo,update) => {
        return axios.post(baseUri + '/bank/v0.1/savingsApplications', { refNo:refNo,update: update }, {
            headers: {
                auth: store.getters.auth
            }
        })
            .then(function (response) {
                console.log(response);
                return response.data;
            })
            .catch(function (error) {
                console.error(error);
            });
    },
    createCareer: (data) => {
        return axios.post(baseUri + '/bank/v0.1/careers', { data:data }, {
            headers: {
                auth: store.getters.auth
            }
        })
            .then(function (response) {
                console.log(response);
                return response.data;
            })
            .catch(function (error) {
                console.error(error);
            });
    },
    deleteAppointment: (appointmentId) => {
        return axios.delete(baseUri + '/bank/v0.1/appointments', {
            headers: {
                appointmentId: appointmentId,
                auth: store.getters.auth
            }
        })
            .then(function (response) {
                console.log(response);
                return response.data;
            })
            .catch(function (error) {
                console.error(error);
            });
    },
    deleteCareer: (careerId) => {
        return axios.delete(baseUri + '/bank/v0.1/careers', {
            headers: {
                auth: store.getters.auth,
                'careerId':careerId
            }
        })
            .then(function (response) {
                console.log(response);
                return response.data;
            })
            .catch(function (error) {
                console.error(error);
            });
    },
    getAllCareers: () => {
        return axios.get(baseUri + '/career/v0.1/allCareers').then(function (response) {
            console.log(response.data);
            return response.data;
        }).catch(function (error) {
            console.error(error)
        })
    },
    updateProfile: (update) => {
        return axios.post(baseUri + '/user/v0.1/updateProfile', { update: update }, {
            headers: {
                auth: store.getters.auth
            }
        })
            .then(function (response) {
                console.log(response);
                return response.data;
            })
            .catch(function (error) {
                console.error(error);
            });
    },
    getRefStatus: (refno) => {
        return axios.get(baseUri + '/status/v0.1/getRefStatus',{
            headers:{
                refno:refno
            }
        }).then(function (response) {
            console.log(response.data);
            return response.data;
        }).catch(function (error) {
            console.error(error)
        })
    },
    getUserName: (userType) => {
        return axios.get(baseUri + '/getName/v0.1/userName',{
            headers:{
                accounttype:userType,
                auth: store.getters.auth
            }
        }).then(function (response) {
            console.log(response.data);
            return response.data;
        }).catch(function (error) {
            console.error(error)
        })
    },
    sendMessage: (message,respString) => {
        return axios.post("https://bot.bankbot.tk" + '/facebook/sendmessage', { 
            message: message,
            respString:respString
         })
            .then(function (response) {
                console.log(response);
                return response.data;
            })
            .catch(function (error) {
                console.error(error);
            });
    },
}
