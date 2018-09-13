export default {
    urlProccess(url){
        if(typeof url === 'string')
            return url.replace('https://','https://images.weserv.nl/?url=');
        return '';
    }
}