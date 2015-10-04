 var path = require('path')
var fs = require('fs')

var filter = require('stream-filter')
var split = require('split')
var thru = require('thru')
require('shelljs/global')


var prefix = path.join(__dirname,'Tanach_Raw')
var resultDir = path.join(__dirname,'Processed_Text')


PEREK_PASUK_REGEX = /\d*.*\u05C3\d*/

function isolatePerekandPasuk(string){

  function extractNum(s){
    var split = s.split('')
    var filtered = split.filter(function(c){
      return parseInt(c)
    })

    var res = parseInt(filtered.join(''))

    return res
  }

  if(string.match(/^ *$/) !== null ) return {}

  var match = string.match(PEREK_PASUK_REGEX)[0].split('\u05C3')
  var perek = extractNum(match[1])
  var pasuk = extractNum(match[0])


  var res = { perek: perek,
              pasuk:pasuk,
              string: string
                        .replace(/\d/g,'')
                        .replace('\u05C3','')
                        .replace('[','')
                        .replace(']','')
                        .replace(/[A-z]*/,'')
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
  var Datastore = require('nedb')
    , db = new Datastore({ filename: './tanach.db', autoload: true });

    allPasukim(resultDir, function(pasuk){

      var doc = {

        book:pasuk.book,
        perek: pasuk.data.perek,
        pasuk: pasuk.data.pasuk,
        string: pasuk.data.string

      }

      db.insert(doc)
    })
}


generateTanachDatabase
