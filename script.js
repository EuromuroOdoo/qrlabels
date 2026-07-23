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

// Собираем промисы завершения рендера QR
const qrPromises = [];

for (let i = 0; i < pallets; i++) {

    const current = Math.min(
        pallet,
        qty - i * pallet
    );

    const div = document.createElement("div");
    div.className = "label";

    const qrContainer = document.createElement("div");
    div.appendChild(qrContainer);

    const qrCode = new QRCodeStyling({
        width: 220,
        height: 220,
        type: "canvas",
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

    // append() возвращает Promise
    qrPromises.push(qrCode.append(qrContainer));

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

    // Barcode
if (barcode) {

    const canvas = document.createElement("canvas");
    canvas.className = "barcode";
    div.appendChild(canvas);

    try {

        bwipjs.toCanvas(canvas, {
            bcid: "code128",
            text: barcode,
            scale: 3,
            height: 12,
            includetext: true,
            textxalign: "center"
        });

    } catch (e) {
        console.error(e);
    }

}

    const m = document.createElement("div");
    m.className = "mo";
    m.innerText = mo;
    div.appendChild(m);

    labels.appendChild(div);
}

// Ждем, пока ВСЕ QR будут готовы
Promise.all(qrPromises).then(() => {

    document.querySelectorAll(".barcode").forEach(svg => {

        JsBarcode(svg, svg.dataset.barcode, {
            format: "CODE128",
            width: 2,
            height: 42,
            displayValue: true,
            fontSize: 15,
            margin: 0
        });

    });

    setTimeout(() => {
        window.print();
    }, 200);

});
