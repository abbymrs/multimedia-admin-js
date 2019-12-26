// axios http inteceptors
axios.interceptors.request.use(function (config) {
    window.activeCalls += 1;
    return config;
}, function (error) {
    // Do something with request error
    window.activeCalls += 1;
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    window.activeCalls -= 1;
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    window.activeCalls -= 1;
    return Promise.reject(error);
});