function asyncGeneratorStep(e, n, t, r, o, i, a) {
	try {
		var u = e[i](a),
			c = u.value
	} catch (e) {
		return void t(e)
	}
	u.done ? n(c) : Promise.resolve(c).then(r, o)
}

function _asyncToGenerator(e) {
	return function () {
		var n = this,
			t = arguments
		return new Promise(function (r, o) {
			var i = e.apply(n, t)

			function a(e) {
				asyncGeneratorStep(i, r, o, a, u, 'next', e)
			}

			function u(e) {
				asyncGeneratorStep(i, r, o, a, u, 'throw', e)
			}
			a(void 0)
		})
	}
}
var __generator =
	(this && this.__generator) ||
	function (e, n) {
		var t,
			r,
			o,
			i,
			a = {
				label: 0,
				sent: function () {
					if (1 & o[0]) throw o[1]
					return o[1]
				},
				trys: [],
				ops: [],
			}
		return (
			(i = {
				next: u(0),
				throw: u(1),
				return: u(2),
			}),
			'function' == typeof Symbol &&
				(i[Symbol.iterator] = function () {
					return this
				}),
			i
		)

		function u(i) {
			return function (u) {
				return (function (i) {
					if (t) throw new TypeError('Generator is already executing.')
					for (; a; )
						try {
							if (
								((t = 1),
								r &&
									(o =
										2 & i[0]
											? r.return
											: i[0]
											? r.throw || ((o = r.return) && o.call(r), 0)
											: r.next) &&
									!(o = o.call(r, i[1])).done)
							)
								return o
							switch (((r = 0), o && (i = [2 & i[0], o.value]), i[0])) {
								case 0:
								case 1:
									o = i
									break
								case 4:
									return (
										a.label++,
										{
											value: i[1],
											done: !1,
										}
									)
								case 5:
									a.label++, (r = i[1]), (i = [0])
									continue
								case 7:
									;(i = a.ops.pop()), a.trys.pop()
									continue
								default:
									if (
										!((o = a.trys),
										(o = o.length > 0 && o[o.length - 1]) ||
											(6 !== i[0] && 2 !== i[0]))
									) {
										a = 0
										continue
									}
									if (3 === i[0] && (!o || (i[1] > o[0] && i[1] < o[3]))) {
										a.label = i[1]
										break
									}
									if (6 === i[0] && a.label < o[1]) {
										;(a.label = o[1]), (o = i)
										break
									}
									if (o && a.label < o[2]) {
										;(a.label = o[2]), a.ops.push(i)
										break
									}
									o[2] && a.ops.pop(), a.trys.pop()
									continue
							}
							i = n.call(e, a)
						} catch (e) {
							;(i = [6, e]), (r = 0)
						} finally {
							t = o = 0
						}
					if (5 & i[0]) throw i[1]
					return {
						value: i[0] ? i[1] : void 0,
						done: !0,
					}
				})([i, u])
			}
		}
	}
!(function () {
	function e() {
		return (
			(e = _asyncToGenerator(function () {
				var e,
					n,
					t = arguments
				return __generator(this, function (r) {
					return (
						(e = t.length > 0 && void 0 !== t[0] ? t[0] : '#__next > div'),
						(n = t.length > 1 && void 0 !== t[1] ? t[1] : 500),
						[
							2,
							new Promise(function (t) {
								var r = function () {
									var o = document.querySelector(e)
									;(null == o ? void 0 : o.getBoundingClientRect().height)
										? t()
										: setTimeout(r, n)
								}
								r()
							}),
						]
					)
				})
			})),
			e.apply(this, arguments)
		)
	}
	;(function () {
		return e.apply(this, arguments)
	})().then(function () {
		var e = document.querySelector('[slide-toogle]'),
			n = document.querySelector('.slide-down'),
			t = document.querySelector('.slide-down__close')
		e.addEventListener('click', function () {
			n.classList.add('anima')
		}),
			t.addEventListener('click', function () {
				n.classList.remove('anima')
			})
	})
})()
