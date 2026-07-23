const p = new URLSearchParams(window.location.search);

const code = p.get("code");
const name = decodeURIComponent(p.get("name"));
const url = p.get("qr");
const qty = parseFloat(p.get("qty"));
const pallet = parseFloat(p.get("pallet"));
const mo = decodeURIComponent(p.get("mo"));

const labels = document.getElementById("labels");

const pallets = Math.ceil(qty / pallet);

for (let i = 0; i < pallets; i++) {

    const current = Math.min(
        pallet,
        qty - i * pallet
    );

    const div = document.createElement("div");
    div.className = "label";

    const qr = document.createElement("div");
    div.appendChild(qr);

    const qrCode = new QRCodeStyling({
        width: 220,
        height: 220,
        type: "svg",
        data: url,
        image: "logo.png",
        dotsOptions: {
            type: "rounded"
        },
        cornersSquareOptions: {
            type: "extra-rounded"
        },
        cornersDotOptions: {
            type: "dot"
        },
        imageOptions: {
            margin: 6,
            imageSize: 0.28
        },
        qrOptions: {
            errorCorrectionLevel: "H"
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

    const m = document.createElement("div");
    m.className = "mo";
    m.innerText = mo;
    div.appendChild(m);

    labels.appendChild(div);
}

window.onload = () => {
    setTimeout(() => window.print(), 700);
};
