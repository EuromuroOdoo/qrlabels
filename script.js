const params = new URLSearchParams(window.location.search);

const labels = document.getElementById("labels");

params.forEach((value, key)=>{

    if(!key.startsWith("i"))
        return;

    const parts=value.split("||");

    const code = parts[0];
const name = decodeURIComponent(parts[1]);
const url = parts[2];
const qty = parseFloat(parts[3]);
const pallet = parseFloat(parts[4]);

    if(!pallet)
        return;

    const pallets=Math.ceil(qty/pallet);

    for(let i=0;i<pallets;i++){

        const current=Math.min(pallet,qty-(i*pallet));

        const div=document.createElement("div");

        div.className="label";

        const qr=document.createElement("div");

        div.appendChild(qr);

        const qrCode = new QRCodeStyling({
    width:220,
    height:220,
    type:"svg",

    data:url,

    image:"logo.png",

    dotsOptions:{
        type:"rounded"
    },

    cornersSquareOptions:{
        type:"extra-rounded"
    },

    cornersDotOptions:{
        type:"dot"
    },

    imageOptions:{
        crossOrigin:"anonymous",
        margin:6,
        imageSize:0.28
    },

    qrOptions:{
        errorCorrectionLevel:"H"
    }
});

qrCode.append(qr);

    const c = document.createElement("div");
c.className = "code";
c.innerText = code;
div.appendChild(c);

const n = document.createElement("div");
n.className = "name";
n.innerText = name;
div.appendChild(n);

const q = document.createElement("div");
q.className = "qty";
q.innerText = current + " units";
div.appendChild(q);

        labels.appendChild(div);

    }

});

window.onload=()=>{

setTimeout(()=>{

window.print();

},700);

}
