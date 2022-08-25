const form = document.getElementById("generate-form");
const qr = document.getElementById("qrcode");

const showLoader = () => {
  document.getElementById("loader").style.display = "block";
};

const hideLoader = () => {
  document.getElementById("loader").style.display = "none";
};
hideLoader();

const clearPreviousQRCode = () => {
  // clearing the previos qr code generated before generating a new one
  qr.innerHTML = "";
  //removing previous download btn if it exists
  const saveLink = document.getElementById("save-link");
  if (saveLink) {
    saveLink.remove();
  }
};

const onGenerateQr = (e) => {
  e.preventDefault();
  clearPreviousQRCode();
  const btn = document.getElementById("submit-btn");
  btn.setAttribute("disabled", true);
  //get the parameters to create qr code from inputs
  const userUrl = document.getElementById("url").value;
  const userSize = document.getElementById("size").value;

  if (url === "") {
    alert("please enter a URL!");
  } else {
    showLoader();
    setTimeout(() => {
      hideLoader();
      createQRCode(userUrl, userSize);
      setTimeout(() => {
        const saveUrl = qr.querySelector("img").src;
        createSaveBtn(saveUrl);
        const btn = document.getElementById("submit-btn");
        btn.removeAttribute("disabled");
      }, 50);
    }, 1500);
  }

  //using the QR js library, create a new qr code obj
  const createQRCode = (url, size) => {
    const qrcode = new QRCode("qrcode", {
      text: userUrl,
      width: userSize,
      height: userSize,
      // colorDark: "#E879F9",
      // colorLight: "#312E81",
      //   correctLevel: QRCode.CorrectLevel.H,
    });
  };

  // create download button
  const createSaveBtn = (saveUrl) => {
    const link = document.createElement("a");
    link.id = "save-link";
    link.classList =
      "bg-fuchisia-400 hover: bg-indigo-900 text-white font-bold py-2 rounded w-1/3 m-auto my-5 mb-10";
    link.href = saveUrl;
    link.download = "qrCode";
    link.innerHTML = "Save Image";
    document.getElementById("generated").appendChild(link);
  };
};

form.addEventListener("submit", onGenerateQr);
