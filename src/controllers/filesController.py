
import os
import cgi
import datetime

from Cheese.cheeseController import CheeseController as cc
from Cheese.cheeseRepository import CheeseRepository as cr
from Cheese.resourceManager import ResMan
from Cheese.httpClientErrors import *

from src.repositories.filesRepository import FilesRepository

from src.controllers.tagsController import TagsController

from src.tools.dbUpdator import DbUpdator

#@controller /file;
class FilesController(cc):

    #@get /getAll;
    @staticmethod
    def getAll(server, path, auth):
        args = cc.getArgs(path)
        
        order = "DESC"
        if (cc.validateJson(["order"], args)): order = args["order"]

        files = FilesRepository.findAllOrderBy(order)

        retArray = cc.modulesToJsonArray(files)

        return cc.createResponse({"FILES": retArray})

    #@get /getByTags;
    @staticmethod
    def getByTags(server, path, auth):
        args = cc.getArgs(path)
        cc.checkJson(["tags", "operator"], args)

        if (args["tags"] == ""):
            return FilesController.getAll(server, path, auth)

        order = "DESC"
        if (cc.validateJson(["order"], args)): order = args["order"]

        tags = args["tags"].split(",")
        operator = args["operator"]

        tagsFilter = ""
        for i, tag in enumerate(tags):
            tagsFilter += f"(tags LIKE '% {tag} %' or tags LIKE '{tag} %' or tags LIKE '% {tag}' or tags = '{tag}')"
            if (i < len(tags)-1):
                tagsFilter += f" {operator} "

        files = FilesRepository.findByTags(tagsFilter, order)

        retArray = cc.modulesToJsonArray(files)

        return cc.createResponse({"FILES": retArray})

    #@get /getByNoneTags;
    @staticmethod
    def getByNoneTags(server, path, auth):
        args = cc.getArgs(path)

        order = "DESC"
        if (cc.validateJson(["order"], args)): order = args["order"]

        files = FilesRepository.findByTags("tags = ''", order)

        retArray = cc.modulesToJsonArray(files)

        return cc.createResponse({"FILES": retArray})


    #@post /upload;
    @staticmethod
    def upload(server, path, auth):
        FilesController.deal_post_data(server)

        return cc.createResponse("<script>window.location='/'</script>")

    #@post /update;
    @staticmethod
    def update(server, path, auth):
        args = cc.readArgs(server)
        cc.checkJson(["FILE_NAME", "TAGS"], args)

        fileModel = FilesRepository.findOneBy("path", args["FILE_NAME"])
        if (fileModel == None):
            raise NotFound("Image was not found")

        fileModel.tags = args["TAGS"]
        FilesRepository.update(fileModel)

        TagsController.updateTags(args["TAGS"])
        DbUpdator.updateTags()

        return cc.createResponse({"STATUS": "OK"})

    #@post /remove;
    @staticmethod
    def remove(server, path, auth):
        args = cc.readArgs(server)
        cc.checkJson(["FILES"], args)

        cr.disableAutocommit()
        for file in args["FILES"]:
            fileModel = FilesRepository.findOneBy("path", file)
            FilesRepository.delete(fileModel)

            if (os.path.exists(ResMan.web("files", file))):
                os.remove(ResMan.web("files", file))

        cr.commit()
        cr.enableAutocommit()

        DbUpdator.updateTags()

        return cc.createResponse({"STATUS": "OK"})

    # METHODS

    @staticmethod
    def deal_post_data(server):
        ctype, pdict = cgi.parse_header(server.headers['Content-Type'])
        pdict['boundary'] = bytes(pdict['boundary'], "utf-8")
        pdict['CONTENT-LENGTH'] = int(server.headers['Content-Length'])
        if ctype == 'multipart/form-data':
            form = cgi.FieldStorage( fp=server.rfile, headers=server.headers, environ={'REQUEST_METHOD':'POST', 'CONTENT_TYPE':server.headers['Content-Type'], })
            try:
                cr.disableAutocommit()
                index = 0
                if isinstance(form["file"], list):
                    for record in form["file"]:
                        open(ResMan.web("files", record.filename), "wb").write(record.file.read())
                        FilesController.saveNewFile(record.filename, index)
                        index += 1
                else:
                    open(ResMan.web("files", form["file"].filename), "wb").write(form["file"].file.read())
                    FilesController.saveNewFile(form["file"].filename, index)
                cr.commit()
                cr.enableAutocommit()
            except IOError:
                cr.enableAutocommit()
                return (False, "Can't create file to write, do you have permission to write?")
        return (True, "Files uploaded")

    @staticmethod
    def saveNewFile(pth, index):
        filesModel = FilesRepository.model(index)
        filesModel.setAttrs(
            path=pth,
            time=datetime.datetime.now(),
            tags=""
        )
        FilesRepository.save(filesModel)