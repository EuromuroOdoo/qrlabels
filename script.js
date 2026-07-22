const p = new URLSearchParams(window.location.search);

const barcode = p.get("barcode") || "200000000001";
const name = p.get("name") || "Urban Stone";
const code = p.get("code") || "ERM001";
const qty = p.get("qty") || "30 pcs";

document.getElementById("name").textContent = name;
document.getElementById("code").textContent = code;
document.getElementById("barcode").textContent = barcode;
document.getElementById("qty").textContent = qty;

new QRCode(document.getElementById("qr"),{
    text:barcode,
    width:220,
    height:220,
    correctLevel:QRCode.CorrectLevel.H
});

window.onload=()=>{

    setTimeout(()=>{

        window.print();

    },500);

};
