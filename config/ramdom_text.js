exports.ramdom = function(nilai) {
    var result ='';
    var karakter ='abcAABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstufwxyz0123456789BC123';
    var karakterpanjang = karakter.length;
    for (let i = 0; i < nilai; i++) {
        result += karakter.charAt(Math.floor(Math.random() * karakterpanjang ));
    }
    return result;  
}  