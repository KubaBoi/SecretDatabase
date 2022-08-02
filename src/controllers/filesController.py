
import os
import cgi
import datetime

from Cheese.cheeseController import CheeseController as cc
from Cheese.resourceManager import ResMan

from src.repositories.filesRepository import FilesRepository

#@controller /file;
class FilesController(cc):

    #@get /getAll;
    @staticmethod
    def getAll(server, path, auth):
        files = FilesRepository.findAll()

        retArray = cc.modulesToJsonArray(files)

        return cc.createResponse({"FILES": retArray})

    #@post /upload;
    @staticmethod
    def upload(server, path, auth):
        FilesController.deal_post_data(server)

        return cc.createResponse("<script>window.location='/'</script>")

    # METHODS

    @staticmethod
    def deal_post_data(server):
        ctype, pdict = cgi.parse_header(server.headers['Content-Type'])
        pdict['boundary'] = bytes(pdict['boundary'], "utf-8")
        pdict['CONTENT-LENGTH'] = int(server.headers['Content-Length'])
        if ctype == 'multipart/form-data':
            form = cgi.FieldStorage( fp=server.rfile, headers=server.headers, environ={'REQUEST_METHOD':'POST', 'CONTENT_TYPE':server.headers['Content-Type'], })
            try:
                if isinstance(form["file"], list):
                    for record in form["file"]:
                        open(ResMan.web("files", record.filename), "wb").write(record.file.read())
                        FilesController.saveNewFile(record.filename)
                else:
                    open(ResMan.web("files", form["file"].filename), "wb").write(form["file"].file.read())
                    FilesController.saveNewFile(form["file"].filename)
            except IOError:
                    return (False, "Can't create file to write, do you have permission to write?")
        return (True, "Files uploaded")

    @staticmethod
    def saveNewFile(pth):
        filesModel = FilesRepository.model()
        filesModel.setAttrs(
            path = pth,
            time = datetime.datetime.now()
        )
        FilesRepository.save(filesModel)