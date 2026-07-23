const p = new URLSearchParams(window.location.search);

const code = p.get("code") || "";
const name = decodeURIComponent(p.get("name") || "");
const url = p.get("qr") || "";
const qty = parseFloat(p.get("qty") || 0);
const pallet = parseFloat(p.get("pallet") || 1);
const mo = decodeURIComponent(p.get("mo") || "");
const barcode = p.get("barcode") || "";

const labels = document.getElementById("labels");

const pallets = Math.ceil(qty / pallet);

for (let i = 0; i < pallets; i++) {

    const current = Math.min(
        pallet,
        qty - i * pallet
    );

    const div = document.createElement("div");
    div.className = "label";

    // QR
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
            imageSize: 0.28,
            crossOrigin: "anonymous"
        },

        qrOptions: {
            errorCorrectionLevel: "H"
        }
    });

    qrCode.append(qr);

    // Product code
    const c = document.createElement("div");
    c.className = "code";
    c.innerText = code;
    div.appendChild(c);

    // Product name
    const n = document.createElement("div");
    n.className = "name";
    n.innerText = name;
    div.appendChild(n);

    // Quantity
    const q = document.createElement("div");
    q.className = "qty";
    q.innerText = current + " units";
    div.appendChild(q);

    // Barcode
    if (barcode) {

        const svg = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
        );

        svg.classList.add("barcode");

        div.appendChild(svg);

        JsBarcode(svg, barcode, {
            format: "CODE128",
            width: 2,
            height: 42,
            displayValue: true,
            fontSize: 15,
            margin: 0
        });

    }

    // Manufacturing Order
    const m = document.createElement("div");
    m.className = "mo";
    m.innerText = mo;
    div.appendChild(m);

    labels.appendChild(div);
}

window.onload = () => {
    setTimeout(() => {
        window.print();
    }, 700);
};
