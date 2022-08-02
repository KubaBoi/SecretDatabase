
import os

from Cheese.cheeseRepository import CheeseRepository as cr
from Cheese.resourceManager import ResMan

from src.repositories.filesRepository import FilesRepository

class DbUpdator:

    @staticmethod
    def update():
        files = FilesRepository.findAll()

        cr.disableAutocommit()
        for file in files:
            if (not os.path.exists(ResMan.web("files", file.path))):
                FilesRepository.delete(file)
        cr.commit()
        cr.enableAutocommit()
