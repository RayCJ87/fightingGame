var qrcode = new QRCode("test", {
    text: "http://172.46.3.229:8080/player",
    width: 128,
    height: 128,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
});

$("#text").on("keyup", function () {
    qrcode.makeCode($(this).val());
}).keyup().focus();