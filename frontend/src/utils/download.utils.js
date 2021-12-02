// var data = [
//   ["name1", "city1", "some other info"],
//   ["name2", "city2", "more info"],
// ];

// // Building the CSV from the Data two-dimensional array
// // Each column is separated by ";" and new line "\n" for next row
// var csvContent = "";
// data.forEach(function (infoArray, index) {
//   dataString = infoArray.join(";");
//   csvContent += index < data.length ? dataString + "\n" : dataString;
// });

// The download function takes a CSV string, the filename and mimeType as parameters
// Scroll/look down at the bottom of this snippet to see how download is called
var download = function (data, fileName, mimeType) {
  let content = "";
  data.forEach(function (infoArray, index) {
    let dataString = infoArray.join(";");
    content += index < data.length ? dataString + "\n" : dataString;
  });
  var a = document.createElement("a");
  mimeType = mimeType || "application/octet-stream";

  if (navigator.msSaveBlob) {
    // IE10
    navigator.msSaveBlob(
      new Blob([content], {
        type: mimeType,
      }),
      fileName
    );
  } else if (URL && "download" in a) {
    //html5 A[download]
    a.href = URL.createObjectURL(
      new Blob([content], {
        type: mimeType,
      })
    );
    a.setAttribute("download", fileName);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } else {
    window.location.href =
      "data:application/octet-stream," + encodeURIComponent(content); // only this mime type is supported
  }
};
export { download };
// download(csvContent, "dowload.csv", "text/csv;encoding:utf-8");
