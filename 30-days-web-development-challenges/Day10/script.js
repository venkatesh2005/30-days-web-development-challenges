document.addEventListener("DOMContentLoaded", () => {
    const qrForm = document.getElementById("qrForm");
    const saveBtn = document.getElementById("saveBtn");
    const qrCodeDiv = document.getElementById("qrCode");
    const loadingDiv = document.getElementById("loading");
    const placeholderDiv = document.getElementById("placeholder");
  
    qrForm.addEventListener("submit", function(e) {
      e.preventDefault();
  
      const url = document.getElementById("url").value;
      const size = document.getElementById("size").value;
  
      if (url === "") {
        alert("Please enter a URL");
        return;
      }
  
      loadingDiv.style.display = "flex";
      qrCodeDiv.style.display = "none";
      placeholderDiv.style.display = "none";
  
      setTimeout(() => {
        loadingDiv.style.display = "none";
        qrCodeDiv.style.display = "block";
  
        qrCodeDiv.innerHTML = "";
        new QRCode(qrCodeDiv, {
          text: url,
          width: parseInt(size),
          height: parseInt(size),
        });
  
        const qrImage = qrCodeDiv.querySelector("img");
        qrImage.addEventListener("load", () => {
          saveBtn.href = qrImage.src;
          saveBtn.style.display = "block";
        });
      }, 1000);
    });
  });
  