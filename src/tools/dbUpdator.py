
import os

from Cheese.resourceManager import ResMan

from src.repositories.filesRepository import FilesRepository

class DbUpdator:

    @staticmethod
    def update():
        files = FilesRepository.findAll()

        for file in files:
            if (not os.path.exists(ResMan.web("files", file.path))):
                FilesRepository.delete(file)

