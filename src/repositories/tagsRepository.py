
from Cheese.cheeseRepository import CheeseRepository

#@repository tags;
#@dbscheme (id, name);
#@dbmodel Tag;
class TagsRepository(CheeseRepository):
	
	#@query "select case when exists
	#       (select * from tags t where t.name = :tag)
	#       then cast(1 as bit)
	#       else cast(0 as bit) end;";
	#@return bool;
	@staticmethod
	def exists(tag):
		return CheeseRepository.query(tag=tag)

	#@query "select * from tags order by name ASC;";
	#@return array;
	@staticmethod
	def findAllOrdered():
		return CheeseRepository.query()


