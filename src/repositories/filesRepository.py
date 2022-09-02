#!/usr/bin/env python
# -*- coding: utf-8 -*-

from Cheese.cheeseRepository import CheeseRepository

#@repository files;
#@dbscheme (id, path, time, tags);
#@dbmodel File;
class FilesRepository(CheeseRepository):
	
	#@query "select * from files order by id :order;";
	#@return array;
	@staticmethod
	def findAllOrderBy(order):
		return CheeseRepository.query(order=order)

	#@query "select * from files where :tagsFilter order by id :order;";
	#@return array;
	@staticmethod
	def findByTags(tagsFilter, order="DESC"):
		return CheeseRepository.query(tagsFilter=tagsFilter, order=order)


