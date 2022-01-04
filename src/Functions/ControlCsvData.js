export const ReadCsvData = (file, callback) => {
  const reader = new FileReader();
  reader.readAsText(file, 'UTF-8');
  reader.onloadend = _ => {
    let result = [];
    let newLinebrk = _.target.result.split('\n');
    for (let i = 0; i < newLinebrk.length; i++) {
      result.push(newLinebrk[i].split(','));
    }
    if(callback) callback(result.slice(1,-1))
  }
}

export const SaveCsvData = (data) => {
  var array = typeof data !== 'object' ? JSON.parse(data) : data;
  var str = '';
  for (var i = 0; i < array.length; i++) {
    var line = '';
    for (var index in array[i]) {
      if (line !== '') line += ','
      line += array[i][index];
    }
    str += line + '\n';
  }
  var downloadLink = document.createElement("a");
  var blob = new Blob(["\ufeff"+str], {type: 'text/csv;charset=utf-8;'});
  var url = URL.createObjectURL(blob);
  downloadLink.href = url;
  downloadLink.download = "DataDump.csv";  //Name the file here
  downloadLink.click();
}