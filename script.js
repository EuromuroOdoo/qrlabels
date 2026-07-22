const params = new URLSearchParams(window.location.search);

const labels = document.getElementById("labels");

params.forEach((value, key)=>{

    if(!key.startsWith("i"))
        return;

    const parts=value.split("||");

    const code=parts[0];
    const url=parts[1];
    const qty=parseFloat(parts[2]);
    const pallet=parseFloat(parts[3]);

    if(!pallet)
        return;

    const pallets=Math.ceil(qty/pallet);

    for(let i=0;i<pallets;i++){

        const current=Math.min(pallet,qty-(i*pallet));

        const div=document.createElement("div");

        div.className="label";

        const qr=document.createElement("div");

        div.appendChild(qr);

        new QRCode(qr,{
            text:url,
            width:220,
            height:220
        });

        const c=document.createElement("div");
        c.className="code";
        c.innerText=code;

        div.appendChild(c);

        const q=document.createElement("div");
        q.className="qty";
        q.innerText="Pallet "+(i+1)+"/"+pallets+"   "+current+" pcs";

        div.appendChild(q);

        labels.appendChild(div);

    }

});

window.onload=()=>{

setTimeout(()=>{

window.print();

},700);

}
