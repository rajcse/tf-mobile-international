if(!window.device) {
    window.device = {};
}

document.addEventListener('DOMContentLoaded', function(){
    console.log('READY!')
    window.initializeApp();
}, false);