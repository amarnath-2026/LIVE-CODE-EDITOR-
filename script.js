const htmlCode = document.getElementById("htmlCode");
const cssCode = document.getElementById("cssCode");
const jsCode = document.getElementById("jsCode");
const preview = document.getElementById("preview");
const downloadBtn = document.getElementById("downloadBtn");

function updatePreview() {
  const html = htmlCode.value;
  const css = `<style>${cssCode.value}</style>`;
  const js = `<script>${jsCode.value}<\/script>`;

  preview.srcdoc = html + css + js;
}

// Listen to typing
[htmlCode, cssCode, jsCode].forEach(el => {
  el.addEventListener("input", updatePreview);
});

// Initialize with sample
htmlCode.value = "<h1>Hello World!</h1>\n<p>This is a test paragraph.</p>";
cssCode.value = "body { font-family: Arial; background: #fafafa; text-align: center; }\nh1 { color: red; }";
jsCode.value = "console.log('JavaScript is working!');";
updatePreview();

// Download project as ZIP
downloadBtn.addEventListener("click", () => {
  const zip = new JSZip();
  zip.file("index.html", htmlCode.value);
  zip.file("style.css", cssCode.value);
  zip.file("script.js", jsCode.value);

  zip.generateAsync({ type: "blob" }).then(content => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(content);
    a.download = "project.zip";
    a.click();
  });
});

// Load JSZip
const script = document.createElement("script");
script.src = "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.7.1/jszip.min.js";
document.body.appendChild(script);
