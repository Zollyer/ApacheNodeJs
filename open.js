let express = require('express');
let fs = require('fs');
let shell = require('shelljs');
let app = express();

//Motror
(async ()=>{
    app.get('*', function (req, res) {
      var Directory = req.params[0].toString()
      fs.readFile('./htdocs'+Directory,(err, stats) => {
          if(err != null){
            res.send('Error 500 - No se encuentra el archivo')
          }else{
            var Extencion =  Directory.split('.')
            Extencion = Extencion[Extencion.length-1];
            var docString = stats.toString();
            //Compilar lenguaje de programacion
            var response_complie = compile(Extencion,docString.toString()+'',Directory);
            res.send(response_complie)
          }
      })
    });
})();

//lenguajes web Soportados
function compile(Extencion,documento,docname){
  switch (Extencion) {
    case 'php':
        var dir = __dirname.toString().replace(/\\/g,'/')
        var exec_doc_dir = dir+'/htdocs'+docname
        var php_Path = 'C:/xampp/php/php'
        var code = shell.exec(php_Path+' -f '+exec_doc_dir)
        console.log(code.stdout)
        return code.stdout;
      break;
    default:
        return documento;
      break;
  }
}

app.listen(80)// Mismo que apache
