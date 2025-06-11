
function reverseString(str) {
	return str.split("").reverse().join("")
}

export default function formatPrice(data) {
	if (!data) {
		return ''
	}
	let num = parseFloat(data)
	let s = '$' + Math.round(num * 100) / 100
	let i = s.lastIndexOf('.')
	if (i > 0) {
		while (i > s.length - 3) {
			s += '0'
			i = s.lastIndexOf('.')
		}
	}
	else {
		s += '.00'
	}
	if (s.length > 10) {
		s = reverseString(s)
		s = s.substring(0, 6) + ',' + s.substring(6, 9) + ',' + s.substring(9)
		s = reverseString(s)
	}
	else if (s.length > 7) {
		s = reverseString(s)
		s = s.substring(0, 6) + ',' + s.substring(6)
		s = reverseString(s)
	}
	return s
}
