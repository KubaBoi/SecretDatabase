
from Cheese.cheeseRepository import CheeseRepository

#@repository tags;
#@dbscheme (id, name);
#@dbmodel Tag;
class TagsRepository(CheeseRepository):

	#@query "select * from tags order by name ASC;";
	#@return array;
	@staticmethod
	def findAllOrdered():
		return CheeseRepository.query()


