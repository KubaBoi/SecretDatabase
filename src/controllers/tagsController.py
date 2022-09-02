
from Cheese.cheeseController import CheeseController as cc
from Cheese.httpClientErrors import *

from src.repositories.tagsRepository import TagsRepository

#@controller /tags;
class TagsController(cc):

    #@get /getAll;
    @staticmethod
    def getAll(server, path, auth):
        tags = TagsRepository.findAllOrdered()

        retArray = cc.modulesToJsonArray(tags)

        return cc.createResponse({"TAGS": retArray})

    # METHODS

    @staticmethod
    def updateTags(newTagsString):
        newTags = newTagsString.strip().split(" ")

        for tag in newTags:
            if (not TagsRepository.exists(name=tag)):
                tagModel = TagsRepository.model()
                tagModel.setAttrs(
                    name=tag
                )
                TagsRepository.save(tagModel)