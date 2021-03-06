 var path = require('path')
var fs = require('fs')

var filter = require('stream-filter')
var split = require('split')
var thru = require('thru')
var gematria = require('gematria')
require('shelljs/global')


var prefix = path.join(__dirname,'../Tanach_Raw')
var resultDir = path.join(__dirname,'../Processed_Text')


PEREK_PASUK_REGEX = /\d*.*\u05C3\d*/

function isolatePerekandPasuk(string){

  string = string
            .replace('\u05C3','')
            .replace(/[\[\]]/g,'')
            .replace(/\*/g, '')
            .replace(/[A-z]*/g,'')


  var match = string.match(/\d+/g)
  var perek = match[1]
  var pasuk = match[0]
  string = string.replace(/\d+/g, '')
  console.log(string)

  var res = {
              perek: perek,
              pasuk:pasuk,
              string: string
            }

  return res
}



function printPasukim(location){
  allPasukim(location, console.log)
}

function allPasukim(location, cb){
  var folder = path.join(location,'/*')
  var folders = ls(folder)

  return new Promise(function(f,r){

      var next = function(list){
        if (list.length ===0) {
          f()
          return
        }
        var file = list.shift()

        fs.createReadStream(file)
          .pipe(split())
          .on('data', function(data){
            if (data=='')return
            var passed = {
              data:isolatePerekandPasuk(data),
              book: path.basename(file).split('.')[0]
            }

            cb(passed)

          })
          .on('error',r)
          .on('close', function(){
            next(list)
          })

      }

      next(folders)
  })


}

function filterPasukim(rawFolder, processedFolder){

  var folder = path.join(location,'/*')
  var folders = ls(folder)

  return new Promise(function(f,r){

      var next = function(list){
        if (list.length ===0) {
          f()
          return
        }
        var file = list.shift()


        var newFileName = path.basename(file).split('.')[0] + '.txt'
        var newFile = path.join(processedFolder,newFileName)
        var writeStream = fs.createWriteStream(newFile)


        fs.createReadStream(file)
          .pipe(split())
          .pipe(filter(function(line){return line[2]!=='x'}))
          .on('data', console.log)
          .pipe(thru(function(item,cb){
              cb(null,item+'\n')
          }))
          .pipe(writeStream)
          .on('close', function(){
            next(list)
          })
    }

      next(folders)
  })
}


function generateTanachDatabase(){
  // var Datastore = require('nedb')
  //   , db = new Datastore({ filename: './tanach.db', autoload: true });

    var data = []

    return new Promise(function(f,r){
      allPasukim(resultDir, function(pasuk){
        if(pasuk.data.string === undefined) return

        data.push({
          book:pasuk.book,
          perek: pasuk.data.perek,
          pasuk: pasuk.data.pasuk,
          string: pasuk.data.string
        })

      }).then(function(){
        f(data)
      })
  })
}


function generateGematriaToWordsDatabase(){
  var Datastore = require('nedb')
    , words = new Datastore({ filename: './words.db', autoload: true });
  var tanach = new Datastore({ filename: './tanach.db', autoload: true })

  tanach.find({}, function (err, docs) {
    docs.forEach(function(pasuk){
      if(pasuk.string === undefined) return
      var sentence = pasuk.string.split(' ')

      sentence.forEach(function(word){
        words.insert({
          word:word || "undefined",
          gematria: gematria(word).toMisparHaPanim(),
          location: {
            book: pasuk.book,
            perek: pasuk.perek,
            pasuk: pasuk.pasuk
          }
        })
      })
    })
  });
}

generateTanachDatabase().then(function(value){
  fs.writeFileSync("../data/tanach.json", JSON.stringify(value))
})
// generateGematriaToWordsDatabase()
