
import os

from Cheese.cheeseRepository import CheeseRepository as cr
from Cheese.resourceManager import ResMan

from src.repositories.filesRepository import FilesRepository
from src.repositories.tagsRepository import TagsRepository

class DbUpdator:

    @staticmethod
    def update():
        files = FilesRepository.findAll()

        cr.disableAutocommit()
        for file in files:
            if (not os.path.exists(ResMan.web("files", file.path))):
                FilesRepository.delete(file)

        DbUpdator.updateTags()

    @staticmethod
    def updateTags():
        tags = TagsRepository.findAll()

        cr.disableAutocommit()
        for tag in tags:
            files = FilesRepository.findByTags(f"tags LIKE '%{tag.name}%'", "ASC")
            if (files == []):
                TagsRepository.delete(tag)

        cr.commit()
        cr.enableAutocommit()