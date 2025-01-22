_TABLE = dict()

def _generate_string(text):
	global _TABLE

	if text in _TABLE:
		return _TABLE[text]
	else:
		res = []
		for val in text:
			res.append(_TABLE.get(val, "'"+val+"'"))
		return "+".join(res)


def _generate_ascii_array(text):
	return [str(ord(i)) for i in text]


def _generate__table():
	global _TABLE

	_TABLE[0] = '+[]'
	_TABLE[1] = '+!![]'
	_TABLE[2] = '!![]+!![]'
	_TABLE[3] = '!![]+!![]+!![]'
	_TABLE[4] = '!![]+!![]+!![]+!![]'
	_TABLE[5] = '!![]+!![]+!![]+!![]+!![]'
	_TABLE[6] = '!![]+!![]+!![]+!![]+!![]+!![]'
	_TABLE[7] = '!![]+!![]+!![]+!![]+!![]+!![]+!![]'
	_TABLE[8] = '!![]+!![]+!![]+!![]+!![]+!![]+!![]+!![]'
	_TABLE[9] = '!![]+!![]+!![]+!![]+!![]+!![]+!![]+!![]+!![]'

	_TABLE['0'] = '('+_TABLE[0]+'+[])'
	_TABLE['1'] = '('+_TABLE[1]+'+[])'
	_TABLE['2'] = '('+_TABLE[2]+'+[])'
	_TABLE['3'] = '('+_TABLE[3]+'+[])'
	_TABLE['4'] = '('+_TABLE[4]+'+[])'
	_TABLE['5'] = '('+_TABLE[5]+'+[])'
	_TABLE['6'] = '('+_TABLE[6]+'+[])'
	_TABLE['7'] = '('+_TABLE[7]+'+[])'
	_TABLE['8'] = '('+_TABLE[8]+'+[])'
	_TABLE['9'] = '('+_TABLE[9]+'+[])'

	_TABLE[''] = '([]+[])'
	_TABLE['true'] = '(!![]+[])'
	_TABLE['false'] = '(![]+[])'
	_TABLE['NaN'] = '(+[![]]+[])'
	_TABLE['NaN'] = '(+{}+[])'
	_TABLE['undefined'] = '([][[]]+[])'
	_TABLE['[object Object]'] = '({}+[])'

	_TABLE['a'] = _TABLE['false']+'['+_TABLE[1]+']'
	_TABLE['b'] = _TABLE['[object Object]']+'['+_TABLE[2]+']'
	_TABLE['c'] = _TABLE['[object Object]']+'['+_TABLE[5]+']'
	_TABLE['d'] = _TABLE['undefined']+'['+_TABLE[2]+']'
	_TABLE['e'] = _TABLE['true']+'['+_TABLE[3]+']'
	_TABLE['Infinity'] = '(+('+_TABLE[1]+'+'+_TABLE['e']+'+('+_TABLE[1]+')+('+_TABLE[0]+')+('+_TABLE[0]+')+('+_TABLE[0]+'))+[])'
	_TABLE['f'] = _TABLE['false']+'['+_TABLE[0]+']'
	_TABLE['i'] = _TABLE['undefined']+'['+_TABLE[5]+']'
	_TABLE['j'] = _TABLE['[object Object]']+'['+_TABLE[3]+']'
	_TABLE['l'] = _TABLE['false']+'['+_TABLE[2]+']'
	_TABLE['n'] = _TABLE['undefined']+'['+_TABLE[1]+']'
	_TABLE['o'] = _TABLE['[object Object]']+'['+_TABLE[1]+']'
	_TABLE['r'] = _TABLE['true']+'['+_TABLE[1]+']'
	_TABLE['s'] = _TABLE['false']+'['+_TABLE[3]+']'
	_TABLE['t'] = _TABLE['true']+'['+_TABLE[0]+']'
	_TABLE['u'] = _TABLE['true']+'['+_TABLE[2]+']'
	_TABLE['y'] = _TABLE['Infinity']+'['+_TABLE[7]+']'

	_TABLE['I'] = _TABLE['Infinity']+'['+_TABLE[0]+']'
	_TABLE['N'] = _TABLE['NaN']+'['+_TABLE[0]+']'
	_TABLE['O'] = _TABLE['[object Object]']+'['+_TABLE[8]+']'

	_TABLE[','] = '[[],[]]+[]'
	_TABLE['['] = _TABLE['[object Object]']+'['+_TABLE[0]+']'
	_TABLE[']'] = _TABLE['[object Object]']+'['+_TABLE['1']+'+('+_TABLE[4]+')]'
	_TABLE[' '] = _TABLE['[object Object]']+'['+_TABLE[7]+']'
	_TABLE['"'] = _TABLE['']+'['+_generate_string('fontcolor')+']()['+_TABLE['1']+'+('+_TABLE[2]+')]'
	_TABLE['<'] = _TABLE['']+'['+_generate_string('sub')+']()['+_TABLE[0]+']'
	_TABLE['='] = _TABLE['']+'['+_generate_string('fontcolor')+']()['+_TABLE['1']+'+('+_TABLE[1]+')]'
	_TABLE['>'] = _TABLE['']+'['+_generate_string('sub')+']()['+_TABLE[4]+']'
	_TABLE['/'] = _TABLE['']+'['+_generate_string('sub')+']()['+_TABLE[6]+']'
	_TABLE['+'] = '(+('+_TABLE[1]+'+'+_TABLE['e']+'+['+_TABLE[1]+']+('+_TABLE[0]+')+('+_TABLE[0]+'))+[])['+_TABLE[2]+']'
	_TABLE['.'] = '(+('+_TABLE[1]+'+['+_TABLE[1]+']+'+_TABLE['e']+'+('+_TABLE[2]+')+('+_TABLE[0]+'))+[])['+_TABLE[1]+']'
	_TABLE[','] = '([]['+_generate_string('slice')+']['+_generate_string('call')+']'+_TABLE['[object Object]']+'+[])['+_TABLE[1]+']'

	_TABLE['[object Window]'] = '([]['+_generate_string('filter')+']['+_generate_string('constructor')+']('+_generate_string('return self')+')()+[])'
	_TABLE['W'] = _TABLE['[object Window]']+'['+_TABLE[8]+']'

	_TABLE['h'] = '([]['+_generate_string('filter')+']['+_generate_string('constructor')+']('+_generate_string('return location')+')()+[])['+_TABLE[0]+']'
	_TABLE['p'] = '([]['+_generate_string('filter')+']['+_generate_string('constructor')+']('+_generate_string('return location')+')()+[])['+_TABLE[3]+']'
	_TABLE['m'] = '[]['+_generate_string('filter')+']['+_generate_string('constructor')+']('+_generate_string('return typeof 0')+')()['+_TABLE[2]+']'

	_TABLE['C'] = '[]['+_generate_string('filter')+']['+_generate_string('constructor')+']('+_generate_string('return escape')+')()('+_TABLE['1']+'['+_generate_string("sub")+']())['+_TABLE[2]+']'

	_TABLE['('] = '([]['+_generate_string('filter')+']+[])['+_generate_string('trim')+']()['+_TABLE['1']+'+('+_TABLE[5]+')]'
	_TABLE[')'] = '([]['+_generate_string('filter')+']+[])['+_generate_string('trim')+']()['+_TABLE['1']+'+('+_TABLE[6]+')]'
	_TABLE['{'] = '([]['+_generate_string('filter')+']+[])['+_generate_string('trim')+']()['+_TABLE['1']+'+('+_TABLE[8]+')]'

	_TABLE['g'] = '[]['+_generate_string('filter')+']['+_generate_string('constructor')+']('+_generate_string('return typeof""')+')()['+_TABLE[5]+']'
	_TABLE['%'] = '[]['+_generate_string('filter')+']['+_generate_string('constructor')+']('+_generate_string('return escape')+')()({})['+_TABLE[0]+']'
	_TABLE['B'] = '[]['+_generate_string('filter')+']['+_generate_string('constructor')+']('+_generate_string('return escape')+')()({})['+_TABLE[2]+']'
	_TABLE['S'] = '[]['+_generate_string('filter')+']['+_generate_string('constructor')+']('+_generate_string('return unescape')+')()('+_TABLE['%']+'+'+_TABLE['5']+'+('+_TABLE[3]+'))'
	_TABLE['x'] = '[]['+_generate_string('filter')+']['+_generate_string('constructor')+']('+_generate_string('return unescape')+')()('+_TABLE['%']+'+'+_TABLE['7']+'+('+_TABLE[8]+'))'
	_TABLE['v'] = '[]['+_generate_string('filter')+']['+_generate_string('constructor')+']('+_generate_string('return unescape')+')()('+_TABLE['%']+'+'+_TABLE['7']+'+('+_TABLE[6]+'))'

	return


def obfuscate(code):
	global _TABLE
	if len(_TABLE) == 0:
		_generate__table()

	payload = ','.join(_generate_string(str(x)) for x in _generate_ascii_array(code))
	payload = '[]['+_generate_string('filter')+']['+_generate_string('constructor')+']('+_generate_string('return String')+')()['+_generate_string('fromCharCode')+']('+payload+')'
	payload = '[]['+_generate_string('filter')+']['+_generate_string('constructor')+']('+payload+')()'

	return payload
