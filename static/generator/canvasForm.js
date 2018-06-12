function U(b, c) {
	b.transform(c[0][0], c[1][0], c[0][1], c[1][1], c[0][2], c[1][2])
}

function Q(b, c) {
	b.setTransform(c[0][0], c[1][0], c[0][1], c[1][1], c[0][2], c[1][2])
}

function P(b, c) {
	return [
		[b, 0, 0],
		[0, c, 0]
	]
}

function E(b, c) {
	return [
		[1, 0, b],
		[0, 1, c]
	]
}

function aa(b) {
	return [
		[Math.cos(b), Math.sin(b), 0],
		[-Math.sin(b), Math.cos(b), 0]
	]
}

function N(b, c) {
	return [
		[b[0][0] * c[0][0] + b[0][1] * c[1][0], b[0][0] * c[0][1] + b[0][1] * c[1][1], b[0][0] * c[0][2] + b[0][1] * c[1][2] + b[0][2]],
		[b[1][0] * c[0][0] + b[1][1] * c[1][0], b[1][0] * c[0][1] + b[1][1] * c[1][1], b[1][0] * c[0][2] + b[1][1] * c[1][2] + b[1][2]]
	]
}

function X(b) {
	var c = b[0][0] * b[1][1] - b[0][1] * b[1][0];
	return [
		[b[1][1] / c, -b[0][1] / c, (b[0][1] * b[1][2] - b[0][2] * b[1][1]) / c],
		[-b[1][0] / c, b[0][0] / c, (b[0][2] * b[1][0] - b[0][0] * b[1][2]) / c]
	]
}

function Ta(b) {
	return {
		sx: Math.sqrt(b[0][0] * b[0][0] + b[1][0] * b[1][0]),
		sy: Math.sqrt(b[0][1] * b[0][1] + b[1][1] * b[1][1]),
		angle: 180 * Math.atan2(b[1][0], b[0][0]) / Math.PI,
		tx: b[0][2],
		ty: b[1][2]
	}
}

function Ua(b, c) {
	return {
		x: c[0][0] * b.x + c[0][1] * b.y + c[0][2],
		y: c[1][0] * b.x + c[1][1] * b.y + c[1][2]
	}
}

function Y(b, c) {
	var e = Ua({
			x: b.x,
			y: b.y
		}, c),
		f = Ua({
			x: b.x + b.width,
			y: b.y + b.height
		}, c),
		h = Ua({
			x: b.x,
			y: b.y + b.height
		}, c),
		k = Ua({
			x: b.x + b.width,
			y: b.y
		}, c),
		g = Math.min(e.x, f.x, h.x, k.x),
		l = Math.min(e.y, f.y, h.y, k.y),
		m = Math.max(e.x, f.x, h.x, k.x),
		e = Math.max(e.y, f.y, h.y, k.y);
	return {
		x: g,
		y: l,
		width: m - g,
		height: e - l
	}
}

function V(b, c) {
	b.beginPath();
	for (var e = 0; e < c.length; e++) "M" == c[e] ? b.moveTo(c[++e], c[++e]) : "Q" == c[e] ? b.quadraticCurveTo(c[++e], c[++e], c[++e], c[++e]) : "C" == c[e] ? b.bezierCurveTo(c[++e], c[++e], c[++e], c[++e], c[++e], c[++e]) : "L" == c[e] && b.lineTo(c[++e], c[++e]);
	b.fill()
}

function Va(b, c, e, f, h, k, g, l) {
	for (var m = [], n = [
			[],
			[]
		], q = [], p, t, r, s, w = 0; 2 > w; ++w) 0 == w ? (t = 6 * b - 12 * e + 6 * h, p = -3 * b + 9 * e - 9 * h + 3 * g, r = 3 * e - 3 * b) : (t = 6 * c - 12 * f + 6 * k, p = -3 * c + 9 * f - 9 * k + 3 * l, r = 3 * f - 3 * c), 1E-12 > Math.abs(p) ? 1E-12 > Math.abs(t) || (p = -r / t, 0 < p && 1 > p && m.push(p)) : (s = t * t - 4 * r * p, r = Math.sqrt(s), 0 > s || (s = (-t + r) / (2 * p), 0 < s && 1 > s && m.push(s), p = (-t - r) / (2 * p), 0 < p && 1 > p && m.push(p)));
	for (r = t = m.length; t--;) p = m[t], s = 1 - p, w = s * s * s * b + 3 * s * s * p * e + 3 * s * p * p * h + p * p * p * g, n[0][t] = w, p = s * s * s * c + 3 * s * s * p * f + 3 * s * p * p * k + p * p * p * l, n[1][t] = p, q[t] = {
		Pa: w,
		Qa: p
	};
	m[r] = 0;
	m[r + 1] = 1;
	q[r] = {
		Pa: b,
		Qa: c
	};
	q[r + 1] = {
		Pa: g,
		Qa: l
	};
	n[0][r] = b;
	n[1][r] = c;
	n[0][r + 1] = g;
	n[1][r + 1] = l;
	m.length = n[0].length = n[1].length = q.length = r + 2;
	return {
		left: Math.min.apply(null, n[0]),
		top: Math.min.apply(null, n[1]),
		right: Math.max.apply(null, n[0]),
		bottom: Math.max.apply(null, n[1]),
		Pb: q,
		Sb: m
	}
}

function la(b) {
	var c = new Buffer(b.byteLength);
	b = new Uint8Array(b);
	for (var e = 0; e < c.length; ++e) c[e] = b[e];
	return c
}

(function() {
	function b(b, c, h) {
		if (this.next = h) h.Ya = this;
		if (this.Ya = c) c.next = this;
		this.data = b
	}

	function c() {
		if (!(this instanceof c)) return new c;
		this.L = this.n = null;
		this.length = 0
	}
	c.prototype = {
		push: function(c) {
			this.L = new b(c, this.L, null);
			this.n || (this.n = this.L);
			this.length++
		},
		unshift: function(c) {
			this.n = new b(c, null, this.n);
			this.L || (this.L = this.n);
			this.length++
		},
		shift: function() {
			if (0 !== this.length) {
				var b = this.n;
				if (this.n = b.next) b.next = this.n.Ya = null;
				this.length--;
				1 === this.length ? this.L = this.n : 0 === this.length &&
					(this.n = this.L = null);
				return b.data
			}
		},
		slice: function(b, c) {
			b || (b = 0);
			c || (c = this.length);
			0 > c && (c = this.length + c);
			0 > b && (b = this.length + b);
			if (c === b) return [];
			if (c < b) throw Error("invalid offset: " + b + "," + c + " (length=" + this.length + ")");
			for (var h = c - b, k = Array(h), g = 0, l = this.n; 0 < b-- && l;) l = l.next;
			for (; g < h && l;) k[g++] = l.data, l = l.next;
			return k
		},
		forEach: function(b, c) {
			for (var h = this.n, k = 0, g = this.length; k < g && h;) b.call(c || this, h.data, k, this), h = h.next, k++
		},
		map: function(b, f) {
			var h = new c;
			this.forEach(function(c, g, l) {
				h.push(b.call(f ||
					l, c, g, l))
			});
			return h
		}
	};
	"undefined" !== typeof exports ? module.Nb = c : "function" === typeof define && define.Lb ? define("FastList", function() {
		return c
	}) : function() {
		return this
	}().FastList = c
})();

function oa(b) {
	for (var c = "", e = 0; e < b.commands.length; ++e) {
		var f = b.commands[e];
		"moveTo" == f.command ? c += "M " + f.args[0] + " " + -f.args[1] + " " : "lineTo" == f.command ? c += "L " + f.args[0] + " " + -f.args[1] + " " : "bezierCurveTo" == f.command ? c += "C " + f.args[0] + " " + -f.args[1] + " " + f.args[2] + " " + -f.args[3] + " " + f.args[4] + " " + -f.args[5] + " " : "quadraticCurveTo" == f.command ? c += "Q " + f.args[0] + " " + -f.args[1] + " " + f.args[2] + " " + -f.args[3] + " " : "closePath" == f.command ? c += "Z " : console.log("Uknown path command")
	}
	return c
}

function Xa(b) {
	for (var c, e, f, h = 0; h < b.commands.length; ++h) {
		var k = b.commands[h],
			g;
		if ("moveTo" == k.command) g = c, e = k.args[0], f = -k.args[1];
		else if ("lineTo" == k.command) g = {
			$: Math.min(k.args[0], e),
			a: Math.max(k.args[0], e),
			aa: Math.min(-k.args[1], f),
			c: Math.max(-k.args[1], f)
		}, e = k.args[0], f = -k.args[1];
		else if ("bezierCurveTo" == k.command) e = Va(e, f, k.args[2], -k.args[3], k.args[4], -k.args[5], k.args[0], -k.args[1]), g = {
			$: e.left,
			a: e.right,
			aa: e.top,
			c: e.bottom
		}, e = k.args[0], f = -k.args[1];
		else if ("quadraticCurveTo" == k.command) {
			g =
				e + 2 / 3 * (k.args[2] - e);
			var l = f + 2 / 3 * (-k.args[3] - f);
			e = Va(e, f, g, l, g + 1 / 3 * (k.args[0] - e), l + 1 / 3 * (-k.args[1] - f), k.args[0], -k.args[1]);
			g = {
				$: e.left,
				a: e.right,
				aa: e.top,
				c: e.bottom
			};
			e = k.args[0];
			f = -k.args[1]
		}
		c = c ? {
			$: Math.min(c.$, g.$),
			a: Math.max(c.a, g.a),
			aa: Math.min(c.aa, g.aa),
			c: Math.max(c.c, g.c)
		} : g
	}
	c || (c = {
		$: 0,
		a: 0,
		aa: 0,
		c: 0
	});
	return c
}

//根据标签的weight排序
function Ya(b, c) {
	return b.weight == c.weight ? b.Fa > c.Fa ? 1 : -1 : b.weight < c.weight ? 1 : -1
}

function pa(b) {
	b = b.glyphForCodePoint(120);
	if (0 != b.id) return b = b.bbox, b.maxY - b.minY
}

//画文字
function V(b, c) {
	b.beginPath();
	for (var e, f, h = 0; h < c.length; h++) "M" == c[h] ? b.moveTo(e = parseFloat(c[++h]), f = parseFloat(c[++h])) : "q" == c[h] ? b.quadraticCurveTo(e + parseFloat(c[++h]), e + parseFloat(c[++h]), e += parseFloat(c[++h]), f = e + parseFloat(c[++h])) : "Q" == c[h] ? b.quadraticCurveTo(parseFloat(c[++h]), parseFloat(c[++h]), e = parseFloat(c[++h]), f = parseFloat(c[++h])) : "c" == c[h] ? b.bezierCurveTo(e + parseFloat(c[++h]), f + parseFloat(c[++h]), e + parseFloat(c[++h]), f + parseFloat(c[++h]), e += parseFloat(c[++h]), f += parseFloat(c[++h])) :
		"C" == c[h] ? b.bezierCurveTo(c[++h], c[++h], c[++h], c[++h], e = parseFloat(c[++h]), f = parseFloat(c[++h])) : "l" == c[h] ? b.lineTo(e += parseFloat(c[++h]), f += parseFloat(c[++h])) : "h" == c[h] ? b.lineTo(e += parseFloat(c[++h]), f) : "H" == c[h] ? b.lineTo(e = parseFloat(c[++h]), f) : "v" == c[h] ? b.lineTo(e, f += parseFloat(c[++h])) : "V" == c[h] ? b.lineTo(e, f = parseFloat(c[++h])) : "L" == c[h] ? b.lineTo(e = parseFloat(c[++h]), f = parseFloat(c[++h])) : "Z" != c[h] && "z" != c[h] || b.closePath();
	b.closePath();
	b.fill()
}

function Za(b, c, e, f) {
	for (var h = 0, k = 0, g = 0, l = 0, m = Math.floor(b.x); m < b.x + b.width; m++)
		for (var n = Math.floor(b.y); n < b.y + b.height; n++) {
			var q = n * e * 4 + 4 * m;
			127 < c[q + 3] && (h += c[q + 0], k += c[q + 1], g += c[q + 2], l++)
		}
	return 0 < l ? $a(h / l) + $a(k / l) + $a(g / l) : f
}

function $a(b) {
	b = Math.round(b).toString(16);
	return (1 == b.length ? "0" : "") + b
}

function ka(b, c) {
	if (null == b || b == [] || null == c) return {
		f: {
			width: 0,
			height: 0
		},
		oa: []
	};
	for (var e, f = [], h = 0, k = 0, g = 0; g < b.length; g++)
		for (var l = b[g], m = 0; m < l.glyphs.length; ++m) {
			var n = l.glyphs[m],
				q = !1,
				p;
			try {
				p = n.bbox
			} catch (t) {
				q = !0
			}
			if (!q) {
				n.xMin = p.minX | 0;
				n.xMax = p.maxX | 0;
				n.yMin = p.minY | 0;
				n.yMax = p.maxY | 0;
				var q = h + l.positions[m].xOffset,
					r = k + l.positions[m].yOffset;
				f.push({
					glyphObj: n,
					glyph: c + "." + n.id,
					x: q,
					y: -r,
					path: n.path
				});
				e = null == e ? {
					x: n.xMin + q,
					y: n.yMin + r,
					xMax: n.xMax + q,
					yMax: n.yMax + r
				} : {
					x: Math.min(e.x, n.xMin + q),
					y: Math.min(e.y,
						n.yMin + r),
					xMax: Math.max(e.xMax, n.xMax + q),
					yMax: Math.max(e.yMax, n.yMax + r)
				};
				h += l.positions[m].xAdvance;
				k += l.positions[m].yAdvance
			}
		}
	e ? (e.width = e.xMax - e.x, e.height = e.yMax - e.y, e.ratio = e.width / e.height, h = e.y, e.y = -e.yMax, e.yMax = -h) : e = {
		width: 0,
		height: 0
	};
	return {
		bbox: e,
		glyphs: f
	}
}

//获取图片有效像素的区域
function ab(b, c, e) {
	for (var f = 0, f = void 0 === f ? 127 : f, h, k = 0; k < c; ++k)
		for (var g = 0; g < e; ++g) b[g * c * 4 + 4 * k + 3] > f && (h = h ? {
			x: Math.min(h.x, k),
			y: Math.min(h.y, g),
			a: Math.max(h.a, k),
			c: Math.max(h.c, g)
		} : {
			x: k,
			y: g,
			a: k + 1,
			c: g + 1
		});
	h.width = h.a - h.x;
	h.height = h.c - h.y;
	return h
}

function bb(b, c, e, f, h, k, g, l) {
	for (var m = {
			width: 0,
			height: 1,
			ha: 0,
			Mb: 99999999999,
			Ob: 0
		}, n = [], q = k; q <= g; ++q) n[q] = 0;
	var p = new FastList;
	for (h -= 1; h >= f; --h) {
		for (q = k; q < g; ++q) {
			var t = q * e * 4 + 4 * h + 3;
			127 < b[t] && 0 == c[t] ? n[q]++ : n[q] = 0
		}
		for (var r = 0, q = k; q <= g; ++q)
			if (n[q] > r && (p.unshift([q, r]), r = n[q]), n[q] < r) {
				do {
					var t = p.shift(),
						r = {
							x: h,
							y: t[0],
							width: r,
							height: q - t[0]
						},
						s = r.width / r.height / l,
						s = 1 < s ? 1 / s : s;
					r.ha = r.width * r.height * s;
					1 < r.width && 1 < r.height && r.ha > m.ha && (m = r);
					r = t[1]
				} while (n[q] < r);
				r = n[q];
				0 != r && p.unshift([t[0], t[1]])
			}
	}
	return m
}

function Z(b) {
	b = b || {};
	this.ta = b.shapeSquareThreshold || 0.95;	
	this.ka = b.autoTagsAmountMin || 200;		//标签最小数目
	this.ib = b.autoTagsAmountMax || 800;
	this.debug = b.debug || !1;
	this.A = b.statusUpdateCallback;
	this.v = b.errorCallback;
	this.na = b.completionCallback;
	this.fonts = b.fonts;
	this.I = b.cloudData;
	this.w = b.generatedCloud;
	this.U = null;
	this.da = this.ca = !1;
	this.La = 10;		//每轮画标签数目
	this.Da = this.J = 0;
	this.q = {};
	this.m = !1;
	this.ia = -1;
	this.ra = !1;
	this.W = this.Ta = this.za = 0;
	this.ma = [];
	this.O = {};
	this.D = [];
	this.fb = {};
	this.k = [];
	this.u = document.createElement("canvas");
	this.ua = this.u.getContext("2d");
	this.Y = this.R = this.i = 0;	//标签总数目
	this.fa = [];
	this.Oa = !0;
	this.Sa = /:[^:]*:/g
}
Z.prototype.qb = function() {
	var b = this,
		c = this.I,
		e;
	this.debug && (this.nb = (new Date).getTime());
	this.A && this.A("Loading fonts...", 0);
	c.shape.src ? (this.ca = !1, this.U = new Image, this.U.onload = function() {
		b.ca = !0;
		b.da && b.ca && cb(b)
	}, this.U.onerror = function() {
		b.v && b.v("The shape image cannot be loaded!")
	}, this.U.src = c.shape.src) : this.ca = !0;
	var f = 0;
	for (e = 0; e < c.fonts.length; ++e) this.q[c.fonts[e]] = {
		name: c.fonts[e],
		data: null,
		id: f++
	};
	var h = !1;
	for (e = 0; e < c.tags.length; ++e) {
		var k = c.tags[e],g = k.font;
		g && (this.q[g] = {
			name: g,
			data: null,
			id: f++
		});
		var l = [{
			text: k.text,
			font: g
		}];
		k.Z = l;
		k.ja = k.text.replace(this.Sa, "");
	}
	for (g in this.q) this.q.hasOwnProperty(g) &&
		function(c) {
			for (var e = null, f = 0; f < b.fonts.length; ++f)
				if (c == b.fonts[f].name) {
					e = b.fonts[f];
					break
				}
			if (null == e) b.v && b.v("Can't find font in the list: " + c);
			else if (e.data) db(b, e.data, c);
			else {
				var h = new XMLHttpRequest;
				h.onreadystatechange = function() {
					if (4 == h.readyState)
						if (200 == h.status) {
							try {
								e.data = fontkit.create(la(h.response)), e.data.xheight = pa(e.data)
							} catch (f) {
								b.v && b.v("Font can't be processed: " + f.message);
								return
							}
							db(b, e.data, c)
						} else b.v && b.v("Font could not be loaded: " + h.statusText)
				};
				h.open("get", b.fonts[f].file, !0);
				h.responseType = "arraybuffer";
				h.send()
			}
		}(g)
};

//保存字体对象
function db(b, c, e) {
	b.q[e].data = c;
	b.da = !0;
	for (e in b.q)
		if (b.q.hasOwnProperty(e) && !b.q[e].data) {
			b.da = !1;
			break
		}
	b.da && b.da && b.ca && cb(b)
}

function eb(b, c) {
	b.ma.push(c);
	b.i++;
	var e = b.W,
		f = N(b.l, c.matrix);
	Y(c.bbox, f);
	Q(b.T, f);
	f = Ta(f);
	b.T.fillRect(c.bbox.x - b.j / 200 / f.sx, c.bbox.y - b.j / 200 / f.sy, c.bbox.width + 2 * b.j / 200 / f.sx, c.bbox.height + 2 * b.j / 200 / f.sy);
	for (var f = b.R, h = b.T.getImageData(Math.floor(0), Math.floor(0), Math.ceil(b.F.width), Math.ceil(b.F.height)), k = 0, g = h.data, l = h.width, m = 0 + h.width, h = 0 + h.height, n = 0; n < m; ++n)
		for (var q = 0; q < h; ++q) 0 < g[q * l * 4 + 4 * n + 3] && k++;
	b.W = f - k;
	b.Ab = b.Ab * (1 - b.Bb) + b.Bb * (b.W - e) / b.R
}

//开始处理文字
function cb(b) {
	b.A && b.A("Preparing...", 0);
	var c, e, f, h = b.I;
	b.Ra = b.I.styleOptions.backgroundColor || "FFFFFF";
	b.d = document.createElement("canvas");
	var k = b.d.getContext("2d");
	if (h.angles && 0 < h.angles.length) b.ga = h.angles.slice(0);
	else
		for (b.ga = [], c = 0; 10 > c; c++) b.ga.push(Math.floor(180 * Math.random() - 90 + 1));
	var g = b.ga.slice(0);
	for (c = 0; c < h.tags.length; ++c) f = h.tags[c].angle, "number" == typeof f && -1 == g.indexOf(f) && g.push(f); 
	- 1 == h.tagsAmount ? (b.S = !0, b.t = h.tags.length, b.s = [{
		scale: 1,
		va: 1
	}], b.B = 300, b.j = 300) : (b.S = !1,
		b.t = 0 < h.tagsAmount ? h.tagsAmount : h.tags.length, 667 > b.t ? (b.s = [{
			scale: 1,
			va: 1
		}], b.B = 300, b.j = 300) : 1333 > b.t ? (b.s = [{
			scale: 1,
			va: 1
		}], b.B = 400, b.j = 400) : (b.s = [{
			scale: 1,
			va: 1
		}], b.B = 500, b.j = 500));
	f = 1;
	var l, m;
	b.X = !1;
	b.l = [
		[1, 0, 0],
		[0, 1, 0]
	];
	//把图片等比例缩放到canvas上
	img = b.U, f = Math.min(b.j / img.width, b.j / img.height), b.d.width = img.width * f, b.d.height = img.height * f, b.l = P(f, f), Q(k, P(f, f)), k.drawImage(img, 0, 0);
	b.ka = b.X ? 100 : b.ka;	//最小标签重复数
	b.ta = b.X ? 0.8 : b.ta;	
	for (c = 0; c < g.length && 0 == g[c]; ++c);
	t = c < g.length;
	q = k.getImageData(0, 0, b.d.width, b.d.height);
	b.Q = q.data;
	c = b.bb = q.width;
	l = q.height;
	p = null;
	//找到图片的可见区域
	for (m = 0; m < c; ++m)
		for (n = 0; n < l; ++n)  127 < b.Q[n * c * 4 + 4 * m + 3] && (b.R++, p = p ? 
		{
			x: Math.min(p.x, m),
			y: Math.min(p.y, n),
			a: Math.max(p.a, m),
			c: Math.max(p.c, n)
		} : {
			x: m,
			y: n,
			a: m + 1,
			c: n + 1
		});
	if (p) {
		//等比例缩放后画两个canvas
		p.width = p.a - p.x;
		p.height = p.c - p.y;
		b.h = Y(p, X(b.l));
		b.h.a = b.h.x + b.h.width;
		b.h.c = b.h.y + b.h.height;
		q = k.getImageData(p.x, p.y, p.width, p.height);
		t ? (c = Math.round(Math.sqrt(p.width * p.width + p.height * p.height)), t = N(E(c / 2 - p.width / 2, c / 2 - p.height / 2), b.l), b.l = N(E(-p.x - (p.width - c) / 2, -p.y - (p.height - c) / 2), b.l), b.d.width = b.d.height = c) : (t = N(E(0, 0), b.l), b.l = N(E(-p.x, -p.y), b.l), b.d.width = p.width, b.d.height = p.height);
		k.putImageData(q, b.d.width / 2 - p.width / 2, b.d.height / 2 - p.height / 2);
		q = k.getImageData(0, 0, b.d.width, b.d.height);
		b.Q = q.data;
		b.bb = c = q.width;
		l = q.height;
		l = b.d.width / 2;
		m = b.d.height / 2;
		b.C = document.createElement("canvas");
		b.C.width = b.d.width;
		b.C.height = b.d.height;
		b.K = b.C.getContext("2d");
		b.debug && (document.getElementsByTagName("body")[0].appendChild(b.C), b.C.style.border = "1px solid green", b.C.className = "debug-canvas", b.u.width = b.d.width, b.u.height = b.d.height, document.getElementsByTagName("body")[0].appendChild(b.u), b.u.style.border = "1px solid red", b.u.className = "debug-canvas");
		b.Za = [];
		c = 0;
		//等比缩放后画出原图的可见区域
		for (var r; c < b.s.length; c++)
			for (f = b.s[c].scale, r = {}, b.Za.push(r), e = 0; e < g.length; e++) {
				var n = g[e],
					s = E(-l, -m),
					s = N(aa(n * Math.PI / 180), s),
					s = N(E(l, m), s),
					s = N(s, P(1 / f, 1 / f)),
					w = X(s),
					C = b.u,
					u = b.ua;
				C.width = b.d.width * f;
				C.height = b.d.height * f;
				Q(u, w);
				u.drawImage(b.d, 0, 0);
				var x = u.getImageData(0, 0, C.width, C.height);
				h.shape.edges && (ca(x, h.shape.edges), u.putImageData(x, 0, 0));
				u = u.getImageData(0, 0, C.width, C.height);
				C = ab(u.data, C.width, C.height);
				r[n] = {
					pa: s,
					Ib: w,
					P: u,
					Gb: C
				}
			}
		b.debug && (h.shape.edges && (ca(q, h.shape.edges), k.putImageData(q, 0, 0)), document.getElementsByTagName("body")[0].appendChild(b.d), b.d.style.border = "1px solid black", b.d.className = "debug-canvas");
		//处理文字相对大小
		for (c = 0; c < h.tags.length; c++) h.tags[c].Fa = c;
		h.tags.sort(Ya);
		for (c =0; c < h.tags.length; c++) delete h.tags[c].Fa;
		var I, v;
		for (c = b.Ca = 0; c < h.tags.length; c++) k = h.tags[c], k.text && (g = !1 !== k.repeat, b.k.push({
			id: k.id,
			text: k.text.substr(0, 255),
			weight: k.weight || 1,
			url: k.url ? k.url.substr(0, 255) : void 0,
			angle: k.angle,
			color: k.color,
			font: k.font,
			repeat: g,
			Z: k.Z,
			ja: k.ja
		}), g && b.Ca++, b.Y += parseInt(k.weight) || 1);
		0 == b.Ca && (b.S = !1, b.t = Math.min(h.tags.length, b.t));
		I = b.k[0].weight;				//I: weight 最大的值，v: weight 最小的值 ,b.Ca: 重复的标签数，b.Y：weight的和
		v = b.k[b.k.length - 1].weight;
		if (!(I == v || 1 > h.relativeSize || 0 >= v))
			for (v = Math.log(h.relativeSize) / Math.log(I / v), c = b.Y = 0; c < Math.min(b.k.length, b.t); c++) b.k[c].weight = Math.pow(b.k[c].weight / I, v), b.Y += b.k[c].weight;
		I = b.k[0].weight;
		b.F = document.createElement("canvas");
		b.F.width = b.d.width;
		b.F.height = b.d.height;
		b.T = b.F.getContext("2d");
		b.T.drawImage(b.d, 0, 0);
		b.T.globalCompositeOperation = "destination-out";
		b.T.fillStyle = "black";
		b.debug && (document.getElementsByTagName("body")[0].appendChild(b.F), b.F.style.border = "1px solid black", b.F.className = "debug-canvas");
		b.A && b.A("Visualizing... 0%", 0);
		if (b.w) {
			//第一次不会运行，之后会运行
			I = [
				[1, 0, 0],
				[0, 1, 0]
			];
			if (void 0 == b.w.meta || 2.62 >= b.w.meta.version) c = b.w.viewBox, v = Ta(b.l).sx, img && 0.2 < Math.abs(p.width * p.height / (c.width * c.height * v * v) - 1) && (f = Math.min(img.width / c.width, img.height / c.height), I = N(P(f, f), E(-c.x + (img.width / f - c.width) / 2, -c.y + (img.height / f - c.height) / 2)));
			else if (2.8 > b.w.meta.version) I = N(X(b.l), t);
			else if (v = h.shape.mods, k = b.w.meta.version, v)
				for (c = 0; c < v.length; c++) g = v[c], k < g.version && (I = N(g.matrix, I));
			v = {};
			for (k = 0; k < b.w.tags.length; k++)
				if (g = b.w.tags[k], g = {
						fixed: g.fixed,
						parentId: g.parentId,
						textId: g.textId,
						fill: g.fill,
						shapeColor: g.shapeColor,
						matrix: g.matrix,
						fc: g.fc,
						repeat: g.repeat,
						url: g.url
					}, g.fixed && void 0 !== g.parentId) {
					f = JSON.parse(JSON.stringify(b.w.texts[g.textId]));
					g.bbox = f.bbox;
					g.glyphs = f.glyphs;
					g.xheight = f.xheight;
					c = v[g.textId];
					void 0 == c && (b.D.push(f), c = b.D.length - 1, v[g.textId] = c);
					g.textId = c;
					g.matrix = N(I, g.matrix);
					f = N(b.l, g.matrix);
					for (p = 0; p < g.glyphs.length; p++) {
						c = g.glyphs[p].glyph;
						if ("m" == c.substr(c.length - 1) && void 0 == b.O[c]) t =
							c;
						else {
							t = c;
							do t += "m"; while (void 0 !== b.O[t])
						}
						g.glyphs[p].newGlyphId = t;
						b.O[t] = b.w.outlines[c]
					}
					Q(b.K, f);
					for (p = 0; p < g.glyphs.length; ++p) {
						t = g.glyphs[p];
						l = b.O[t.newGlyphId];
						l = l.split(" ");
						U(b.K, E(t.x, t.y));
						if (1 == h.placementMode) {
							m = [];
							for (c = 0; c < l.length; c++) "M" == l[c] || "L" == l[c] ? m.push({
								type: l[c],
								x: l[++c],
								y: l[++c]
							}) : "Q" == l[c] ? m.push({
								type: "Q",
								x1: l[++c],
								y1: l[++c],
								x: l[++c],
								y: l[++c]
							}) : "C" == l[c] && m.push({
								type: "Q",
								x1: l[++c],
								y1: l[++c],
								x2: l[++c],
								y2: l[++c],
								x: l[++c],
								y: l[++c]
							});
							c = Xa(m);
							b.K.fillRect(c.xMin, c.yMin, c.xMax -
								c.xMin, c.yMax - c.yMin)
						} else V(b.K, l);
						U(b.K, E(-t.x, -t.y))
					}
					for (c = 0; c < b.k.length; c++)
						if (b.k[c].id == g.parentId) {
							g.color = b.k[c].color;
							break
						}
					c = Y(g.bbox, f);
					g.shapeColor = Za(c, b.Q, b.bb, b.Ra);
					h.shape.useShapeColors && !g.fc ? g.fill = "#" + g.shapeColor : g.fc || (g.fill = "#" + h.colors[Math.floor(Math.random() * h.colors.length)]);
					c = Y(g.bbox, g.matrix);
					b.h = b.h ? {
						x: Math.min(b.h.x, c.x),
						y: Math.min(b.h.y, c.y),
						a: Math.max(b.h.a, c.x + c.width),
						c: Math.max(b.h.c, c.y + c.height)
					} : {
						x: c.x,
						y: c.y,
						a: c.x + c.width,
						c: c.y + c.height
					};
					g.Hb = k;
					b.fa.push(g)
				}
			for (c =0; c < b.D.length; c++)
				for (f = b.D[c], e = 0; e < f.glyphs.length; ++e) t = f.glyphs[e], t.glyph = t.newGlyphId
		}
		setTimeout(function() {
			b.Ea(b.La)
		}, 0)
	} else b.m = !0, b.v && b.v("Shape is empty!")
}
//处理文字
Z.prototype.Ea = function(b) {
	var c = this;
	b = b || GENERATOR.La;
	//I: CLOUD_DATA，q: fonts
	/**
	 * 所有标签已经画完 && 大于最小标签数 && (大于最大标签数 || 大于定义的覆盖率)
	 */
	for (var e = this.I, f = this.q, h = 0; h < b && !this.m; h++) {
		if (this.i >= e.tags.length && this.i >= (this.X ? 100 : this.ka) && (this.W / this.R > (this.X ? 0.8 : this.ta) || this.i >= this.ib) && (this.Ka || (this.Ka = !0, this.cb = this.i), this.S)) {
			this.m = !0;
			break
		}
		if (!this.S && this.i >= this.t - this.za) {
			this.m = !0;
			break
		}
		this.ia++;
		if (this.ia == e.tags.length)
			if (this.Ca == this.Ta) {
				this.ya = this.m = !0;
				break
			} else this.ra = !0;
		var k = this.k[this.ia % this.k.length];
		if (!this.ra || k.repeat) {
			/*if ("[object Array]" === Object.prototype.toString.call(this.fa)) {
				for (var g = 0, l, m = !1; g < this.fa.length; g++)
					if (l = this.fa[g], void 0 !== l && k.id == l.parentId && this.ia >= l.Hb) {
						this.fa.splice(g, 1);
						l.weight = k.weight;
						eb(this, l);
						m = !0;
						break
					}
				if (m) continue
			}*/
			var g = {
				parentId: k.id,
				text: k.text,
				weight: k.weight,
				url: k.url,
				angle: k.angle,
				color: k.color,
				font: k.font,
				Z: k.Z,
				ja: k.ja
			};
			g.ea = 0 == e.relativeSize || this.ra;
			"number" != typeof g.angle && (g.angle = this.ga[Math.floor(Math.random() * this.ga.length)]);
			"string" != typeof g.color && "number" != typeof g.color ? g.color = e.colors[Math.floor(Math.random() * e.colors.length)] : g.fc = 1;
			l = null;
			//获取字体数据
			if (void 0 === g.font) {
				g.font = e.fonts[0];
				l = f[g.font].data;
			} else l = f[g.font].data;
			//p = l.unitsPerEm && 1024 >= l.unitsPerEm ? 1E3 : 2048;
			// n = f[g.font].id + "-" + g.text;
			p = 1E3;
			n = "0-" + g.text;
			m = this.fb[n];
			if (void 0 !== m) g.textId = m, m = this.D[m];
			else {
				for (var r = [], m = 0; m < g.Z.length; m++) {
					var s =g.Z[m];
					r.push(l.layout(s.text))
				}
				m = ka(r, f[g.font].id);
				m.text = g.text;
				m.xheight = l.xheight;
				if (!m.bbox || 0 == m.bbox.width || 0 == m.bbox.height) {
					if (!this.ra && (this.za++, k.repeat && this.Ta++, this.za == this.k.length)) {
						this.m = !0;
						break
					}
					continue
				}
				this.D.push(m);
				g.textId = this.D.length - 1;
				this.fb[n] = g.textId
			}
			g.bbox = m.bbox;
			g.glyphs = m.glyphs;
			g.xheight = m.xheight;
			m = this.Za[this.J][g.angle];
			k = m.P.data;
			l = m.P.width;
			p = m.P.height;
			this.u.width = m.P.width;
			this.u.height = m.P.height;
			Q(this.ua, m.Ib);
			this.ua.drawImage(this.C, 0, 0);
			var n = this.ua.getImageData(0, 0, this.u.width, this.u.height).data,
				w = m.P.width,
				C = m.P.height,
				u = m.Gb;
			if (u.width > this.B || u.height > this.B) r = Math.round(u.width * (1.1 - 1) / 2), s = Math.round(u.height * (1.1 - 1) / 2), u = {
					x: u.x - r,
					y: u.y - s,
					a: u.a + r,
					c: u.c + s,
					width: u.width + 2 * r,
					height: u.height + 2 * r
				}, u = {
					x: u.x + Math.round(Math.max(u.width - this.B, 0) * Math.random()),
					y: u.y + Math.round(Math.max(u.height - this.B, 0) * Math.random()),
					width: Math.min(u.width, this.B),
					height: Math.min(u.height, this.B)
				},
				u.a = u.x + u.width, u.c = u.y + u.height, u = {
					x: Math.max(u.x, 0),
					y: Math.max(u.y, 0),
					a: Math.min(u.a, w),
					c: Math.min(u.c, C)
				}, u.width = u.a - u.x, u.height = u.c - u.y;
			n = bb(k, n, w, u.x, u.a, u.y, u.c, g.bbox.ratio);
			n.qa = n.width * n.height / (l * p);
			this.s[this.J].va > n.qa && this.J < this.s.length - 1 && (this.J++, this.debug && console.log("Size increased to " + Math.round(this.s[this.J].scale * this.j) + ". Tags placed: " + this.i + ". Placed squre: " + this.W / this.R));
			if (0 < n.width && 0 < n.height) {
				this.s[this.J].ea && (g.ea = !0);
				p = 0.15 * Math.min(n.width, n.height);
				n = {
					x: n.x + p / 2,
					y: n.y + p / 2,
					width: n.width - p,
					height: n.height - p,
					qa: n.qa
				};
				g.bbox.G = g.bbox.x + g.bbox.width / 2;
				g.bbox.H = g.bbox.y + g.bbox.height / 2;
				g.bbox.ha = g.bbox.width * g.bbox.height;
				n.G = n.x + n.width / 2;
				n.H = n.y + n.height / 2;
				p = Math.min(n.width / g.bbox.width, n.height / g.bbox.height);
				p /= this.s[this.J].scale;
				0 == this.i ? g.ea || (p = Math.min(Math.sqrt(g.weight / this.Y * (this.R / g.bbox.ha)), p)) : (r = g.ea ? this.ma[0] : this.ma[this.i - 1], s = N(this.l, r.matrix), w = Math.sqrt(s[0][0] * s[0][0] + s[0][1] * s[0][1]), r.xheight ? s = r.xheight * w : (s = r.bbox,
					s = s.height * w * 1), w = g.xheight ? g.xheight : g.bbox.height, r = void 0 == r.weight ? 0.9 : g.ea ? 0.9 : Math.sqrt(g.weight / r.weight), w * p > s * r && (p = s * r / w));
				p *= this.s[this.J].scale;
				0 < this.i && (r = (Math.random() - 0.5) * (n.width - g.bbox.width * p), s = (Math.random() - 0.5) * (n.height - g.bbox.height * p), n.G += r, n.H += s);
				p = N(P(p, p), E(n.G / p - g.bbox.G, n.H / p - g.bbox.H));
				r = N(m.pa, p);
				n = n.qa / (n.width / n.height);
				//画文字
				for (m = 0; m < g.glyphs.length; ++m) {
					s = g.glyphs[m], w = this.O[s.glyph], void 0 == w && (w = oa(s.path), this.O[s.glyph] = w), Q(this.K, N(r, E(s.x, s.y))), 
					2.5E-4 > n || 1 == e.placementMode ? this.K.fillRect(s.glyphObj.xMin, -s.glyphObj.yMin, s.glyphObj.xMax - s.glyphObj.xMin, s.glyphObj.yMin - s.glyphObj.yMax) : V(this.K, w.split(" "));	
				}
				s = Y(g.bbox, p);
				g.shapeColor = Za(s, k, l, this.Ra);
				e.shape.useShapeColors && !g.fc && (g.color = g.shapeColor);
				g.fill = "#" + g.color;
				g.matrix = N(X(this.l), r);
				eb(this, g);	//画矩形方块
				s = Y(g.bbox, g.matrix);
				this.h = this.h ? {
					x: Math.min(this.h.x, s.x),
					y: Math.min(this.h.y, s.y),
					a: Math.max(this.h.a, s.x + s.width),
					c: Math.max(this.h.c, s.y + s.height)
				} : {
					x: s.x,
					y: s.y,
					a: s.x + s.width,
					c: s.y + s.height
				};
				this.Da = 0
			} else if (this.Da++, 10 < this.Da) {
				this.ya = this.m = !0;
				break
			} else this.ia--
		}
	}
	this.debug || (this.m ? b = 100 : this.S ? (b = Math.min(Math.round(100 * this.W / (this.ta * this.R)), 100), b = Math.min(b, Math.round(100 * this.i / Math.max(this.t, this.ka)))) : b = Math.round(100 * this.i / this.t), this.A && this.A("Visualizing... " + b + "%", b));
	this.m ? setTimeout(function() {
		c.debug && (console.log("Generation time: " + ((new Date).getTime() - c.nb)), console.log("Tags placed: " + c.i));
		c.Oa = !1;
		c.na && c.na(c.Ua()); //执行完成的回调函数
	}, 0) : setTimeout(function() {
			c.Ea(c.La)
		},
		0)
};
Z.prototype.Ua = function(b) {
	var c = {},
		e = this.h || {
			x: 0,
			y: 0,
			a: this.C.width,
			c: this.C.height
		};
	e.width = e.a - e.x;
	e.height = e.c - e.y;
	c.viewBox = {
		x: e.x,
		y: e.y,
		width: e.width,
		height: e.height
	};
	c.styleOptions = JSON.parse(JSON.stringify(this.I.styleOptions));
	c.outlines = JSON.parse(JSON.stringify(this.O));
	c.texts = [];
	for (var e = 0, f, h; e < this.D.length; e++) {
		f = this.D[e];
		h = {};
		h.bbox = {
			x: f.bbox.x,
			y: f.bbox.y,
			width: f.bbox.width,
			height: f.bbox.height
		};
		h.text = f.text;
		h.xheight = f.xheight;
		h.glyphs = [];
		for (var k = 0, g; k < f.glyphs.length; ++k) g = f.glyphs[k],
			h.glyphs.push({
				x: g.x,
				y: g.y,
				glyph: g.glyph
			});
		c.texts.push(h)
	}
	c.tags = [];
	for (e = 0; e < Math.min(this.i, b || this.i); e++) f = this.ma[e], c.tags.push({
		fixed: f.fixed,
		parentId: f.parentId,
		textId: f.textId,
		fill: f.fill,
		shapeColor: f.shapeColor,
		matrix: JSON.parse(JSON.stringify(f.matrix)),
		fc: f.fc,
		repeat: f.repeat,
		url: f.url,
		hidden: f.hidden
	});
	c.meta = {
		version: TAGUL_GENERATOR_VERSION,
		browser: navigator.userAgent
	};
	this.X || (c.shapeImage = "data" == this.I.shape.src.substr(0, 4) ? this.I.shape.src : this.I.shape.name, c.shapeImageCached = this.U);
	return c
};
Z.prototype.m = function() {
	this.m = !0
};
window.Generator = Z;
Z.prototype.generate = Z.prototype.qb;
//Z.prototype.getGeneratedCloud = Z.prototype.Ua;
//Z.prototype.placeTags = Z.prototype.Ea;
Z.prototype.prop = function(b, c) {
	if ("tagsAmountPlaceToFitReached" == b) return void 0 === c ? this.Ka : this.Ka = c;
	if ("tagsAmountPlaceToFitAmount" == b) return void 0 === c ? this.cb : this.cb = c;
	if ("tagsPlaced" == b) return void 0 === c ? this.i : this.i = c;
	if ("cannotAddMoreTags" == b) return void 0 === c ? this.ya : this.ya = c;
	if ("stopGenerating" == b) return void 0 === c ? this.m : this.m = c;
	if ("addTagsMode" == b) return void 0 === c ? this.gb : this.gb = c;
	if ("completionCallback" == b) return void 0 === c ? this.na : this.na = c;
	if ("statusUpdateCallback" == b) return void 0 ===c ? this.A : this.A = c;
	if ("tagsAmountPlaceToFit" == b) return void 0 === c ? this.S : this.S = c;
	if ("tagsAmountToPlace" == b) return void 0 === c ? this.t : this.t = c;
	if ("visualizeInProgress" == b) return void 0 === c ? this.Oa : this.Oa = c;
	console.log("Generator unknow property: " + b)
};

//画最终的图片
function fb(b, c, e, f, h) {
	function k(b) {
		return !isNaN(parseFloat(b)) && isFinite(b)
	}

	function g() {
		var b = y.offsetWidth,
			c = y.offsetHeight;
		F = 36E4 < b * c ? 1 : 1.5;
		y.width = F * b + 1;
		y.height = F * c + 1
	}

	function l(b) {
		b = parseInt(b.replace("#", ""), 16);
		return {
			Ga: b >> 16 & 255,
			Ba: b >> 8 & 255,
			wa: b & 255
		}
	}

	function m(b, c) {
		b = b.substring(1, b.length);
		b = l(b);
		return "rgba(" + b.Ga + "," + b.Ba + "," + b.wa + "," + c.toFixed(4) + ")"
	}

	function n(b) {
		b = b.toString(16);
		return 1 == b.length ? "0" + b : b
	}

	function q(b, c, e) {
		c1 = l(b.substring(1, b.length));
		c2 = l(c.substring(1, c.length));
		return "#" + n(Math.round(c1.Ga * (1 - e) + c2.Ga * e)) + n(Math.round(c1.Ba * (1 - e) + c2.Ba * e)) + n(Math.round(c1.wa * (1 - e) + c2.wa * e))
	}

	function p() {
		return Date.now ? Date.now() : (new Date).getTime()
	}

	function t(b, c) {
		b.setTransform(c[0][0], c[1][0], c[0][1], c[1][1], c[0][2], c[1][2])
	}

	function r(b, c) {
		return [
			[b[0][0] * c[0][0] + b[0][1] * c[1][0], b[0][0] * c[0][1] + b[0][1] * c[1][1], b[0][0] * c[0][2] + b[0][1] * c[1][2] + b[0][2]],
			[b[1][0] * c[0][0] + b[1][1] * c[1][0], b[1][0] * c[0][1] + b[1][1] * c[1][1], b[1][0] * c[0][2] + b[1][1] * c[1][2] + b[1][2]]
		]
	}

	function s(b,c) {
		return {
			x: c[0][0] * b.x + c[0][1] * b.y + c[0][2],
			y: c[1][0] * b.x + c[1][1] * b.y + c[1][2]
		}
	}

	function w(b, c) {
		var e = s({
				x: b.x,
				y: b.y
			}, c),
			f = s({
				x: b.x + b.width,
				y: b.y + b.height
			}, c),
			h = s({
				x: b.x,
				y: b.y + b.height
			}, c),
			k = s({
				x: b.x + b.width,
				y: b.y
			}, c),
			g = Math.min(e.x, f.x, h.x, k.x),
			l = Math.min(e.y, f.y, h.y, k.y),
			m = Math.max(e.x, f.x, h.x, k.x),
			e = Math.max(e.y, f.y, h.y, k.y);
		return {
			x: g,
			y: l,
			width: m - g,
			height: e - l
		}
	}

	function C(b, c) {
		var e = [
				[1, 0, -b.f.G],
				[0, 1, -b.f.H]
			],
			f = Math.pow(b.Db / b.Ha, c),
			h = Math.pow(b.Eb / b.Ia, c),
			k = (b.Cb - b.$a) * c,
			e = r([
				[Math.cos(k), Math.sin(k),
					0
				],
				[-Math.sin(k), Math.cos(k), 0]
			], e),
			e = r([
				[f, 0, 0],
				[0, h, 0]
			], e);
		return r([
			[1, 0, b.f.G],
			[0, 1, b.f.H]
		], e)
	}

	function u(b, c) {
		for (var e = 0, f = 0, h = 0; h < c.oa.length; h++) {
			var k = c.oa[h],
				e = [
					[1, 0, k.x - e],
					[0, 1, k.y - f]
				];
			b.transform(e[0][0], e[1][0], e[0][1], e[1][1], e[0][2], e[1][2]);
			e = b;
			f = k.path;
			e.beginPath();
			for (var g = void 0, l = void 0, m = 0; m < f.length; m++) "M" == f[m] ? e.moveTo(g = parseFloat(f[++m]), l = parseFloat(f[++m])) : "q" == f[m] ? e.quadraticCurveTo(g + parseFloat(f[++m]), g + parseFloat(f[++m]), g += parseFloat(f[++m]), l = g + parseFloat(f[++m])) :
				"Q" == f[m] ? e.quadraticCurveTo(parseFloat(f[++m]), parseFloat(f[++m]), g = parseFloat(f[++m]), l = parseFloat(f[++m])) : "c" == f[m] ? e.bezierCurveTo(g + parseFloat(f[++m]), l + parseFloat(f[++m]), g + parseFloat(f[++m]), l + parseFloat(f[++m]), g += parseFloat(f[++m]), l += parseFloat(f[++m])) : "C" == f[m] ? e.bezierCurveTo(f[++m], f[++m], f[++m], f[++m], g = parseFloat(f[++m]), l = parseFloat(f[++m])) : "l" == f[m] ? e.lineTo(g += parseFloat(f[++m]), l += parseFloat(f[++m])) : "h" == f[m] ? e.lineTo(g += parseFloat(f[++m]), l) : "H" == f[m] ? e.lineTo(g = parseFloat(f[++m]),
					l) : "v" == f[m] ? e.lineTo(g, l += parseFloat(f[++m])) : "V" == f[m] ? e.lineTo(g, l = parseFloat(f[++m])) : "L" == f[m] ? e.lineTo(g = parseFloat(f[++m]), l = parseFloat(f[++m])) : "Z" != f[m] && "z" != f[m] || e.closePath();
			e.closePath();
			e.fill();
			e = k.x;
			f = k.y
		}
	}

	function x() {
		var c, f, g;
		for (g in b.outlines) O[g] = b.outlines[g].split(" ");
		void 0 != G.backgroundColor && (z.fillStyle = m(G.backgroundColor, G.jb), z.fillRect(0, 0, y.width, y.height));
		if (null == v || null == v.x || null == v.y || null == v.width || null == v.height) {
			v = null;
			for (var k = 0, l; k < b.tags.length; k++) l =
				b.tags[k], g = void 0 !== l.textId ? b.texts[l.textId].bbox : l.bbox, g = w(g, l.matrix), v = v ? {
					x: Math.min(v.x, g.x),
					y: Math.min(v.y, g.y),
					a: Math.max(v.a, g.x + g.width),
					c: Math.max(v.c, g.y + g.height)
				} : {
					x: g.x,
					y: g.y,
					a: g.x + g.width,
					c: g.y + g.height
				};
			v.width = v.a - v.x;
			v.height = v.c - v.y
		}
		var k = Math.min(0.95 * y.width / v.width, 0.95 * y.height / v.height),
			n = r([
				[k, 0, 0],
				[0, k, 0]
			], [
				[1, 0, -v.x + (y.width / k - v.width) / 2],
				[0, 1, -v.y + (y.height / k - v.height) / 2]
			]);
		h && (t(z, n), z.globalAlpha = G.Fb, z.drawImage(h, 0, 0), z.globalAlpha = 1);
		for (k = 0; k < b.tags.length; k++)
			if (f =
				b.tags[k], !f.hidden && null != f.matrix[0][0]) {
				var p;
				void 0 !== f.textId ? (l = b.texts[f.textId], c = l.bbox, g = 0.33 * Math.min(c.width, c.height) / 2, g = {
					x: c.x - g,
					y: c.y - g,
					width: c.width + 2 * g,
					height: c.height + 2 * g
				}, c = l.glyphs, p = l.text) : (g = f.bbox, c = f.glyphs, p = f.text);
				l = {};
				K.push(l);
				l.text = p;
				l.f = {
					x: g.x,
					y: g.y,
					width: g.width,
					height: g.height
				};
				l.fill = f.fill;
				l.pa = f.matrix;
				l.url = f.url;
				l.oa = [];
				for (f = 0; f < c.length; ++f) g = c[f], g = {
					x: g.x,
					y: g.y,
					rb: g.glyph
				}, l.oa.push(g), g.path = O[g.rb];
				z.fillStyle = l.fill;
				l.V = r(n, l.pa);
				t(z, l.V);
				u(z, l);
				l.f.a =
					l.f.x + l.f.width;
				l.f.c = l.f.y + l.f.height;
				l.f.G = l.f.x + l.f.width / 2;
				l.f.H = l.f.y + l.f.height / 2;
				c = l.V;
				f = c[0][0] * c[1][1] - c[0][1] * c[1][0];
				l.ub = [
					[c[1][1] / f, -c[0][1] / f, (c[0][1] * c[1][2] - c[0][2] * c[1][1]) / f],
					[-c[1][0] / f, c[0][0] / f, (c[0][2] * c[1][0] - c[0][0] * c[1][2]) / f]
				];
				l.N = 0;
				g = l.pa;
				c = Math.sqrt(g[0][0] * g[0][0] + g[1][0] * g[1][0]);
				f = Math.sqrt(g[0][1] * g[0][1] + g[1][1] * g[1][1]);
				g = 180 * Math.atan2(g[1][0], g[0][0]) / Math.PI;
				l.Ha = c;
				l.Ia = f;
				l.Db = G.zoom ? Math.max(1.1 * l.Ha, 0.15 * Math.sqrt(v.width * v.height / (l.f.width * l.f.height))) : l.Ha;
				l.Eb = G.zoom ? Math.max(1.1 * l.Ia, 0.15 * Math.sqrt(v.width * v.height / (l.f.width * l.f.height))) : l.Ia;
				l.$a = -g * Math.PI / 180;
				l.Cb = G.rotate ? 0 : l.$a;
				l.Ma = 0;
				l.Na = 0;
				l.p = w(l.f, r(l.V, C(l, 1)));
				0 > l.p.x && (l.Ma = -l.p.x);
				l.p.x + l.p.width > y.width && (l.Ma = -(l.p.x + l.p.width) + y.width);
				0 > l.p.y && (l.Na = -l.p.y);
				l.p.y + l.p.height > y.height && (l.Na = -(l.p.y + l.p.height) + y.height);
				l.sb = q(G.backgroundColor, l.fill, 0.2)
			}
		G.xa && (G.la = m(G.xa, 1), G.la = G.la.substring(0, G.la.length - 7));
		try {
			T = z.getImageData(0, 0, y.width, y.height)
		} catch (s) {
			e = !1
		}
	}

	function I() {
		if (L &&
			0 < L.length) {
			for (var b = L.slice(), c = 0; c < M.length; c++) - 1 == b.indexOf(M[c]) && b.push(M[c]);
			D && z.putImageData(T, 0, 0, Math.max(D.x - 2, 0), Math.max(D.y - 2, 0), Math.min(D.width + 4, y.width), Math.min(D.height + 4, y.height));
			D = void 0;
			for (c = 0; c < b.length; c++) {
				var e = b[c];
				z.fillStyle = e.sb;
				t(z, e.V);
				u(z, e)
			}
			for (var f = p(), c = 0; c < b.length; c++) {
				var e = b[c],
					g = (f - e.N) / (1E3 * G.ba),
					g = 1 < g ? 1 : g;
				if (0.5 < g && e != J && e.M == B) {
					var h = M.indexOf(e); - 1 != h && (M.splice(h, 1), -1 == L.indexOf(e) && L.push(e), -1 == b.indexOf(e) && b.push(e));
					e.M = R;
					g = 1 - g;
					e.N = f - 1E3 *
						g * G.ba
				}
				e.M == R && (g = 1 - g);
				0 < g ? (h = r(e.V, C(e, g)), h = r([
					[1, 0, g * e.Ma],
					[0, 1, g * e.Na]
				], h)) : h = e.V;
				t(z, h);
				D ? (h = w(e.f, h), D = {
					x: Math.min(D.x, h.x),
					y: Math.min(D.y, h.y),
					a: Math.max(D.a, h.x + h.width),
					c: Math.max(D.c, h.y + h.height)
				}, D.width = D.a - D.x, D.height = D.c - D.y) : (D = w(e.f, h), D.a = D.x + D.width, D.c = D.y + D.height);
				if (G.xa) {
					z.fillStyle = G.la + (g * G.kb).toFixed(4) + ")";
					var h = z,
						k = e.f.x,
						l = e.f.y,
						m = e.f.width,
						n = e.f.height;
					radius = 0.1 * Math.min(m, n);
					h.beginPath();
					h.moveTo(k + radius, l);
					h.lineTo(k + m - radius, l);
					h.quadraticCurveTo(k + m, l, k + m, l +
						radius);
					h.lineTo(k + m, l + n - radius);
					h.quadraticCurveTo(k + m, l + n, k + m - radius, l + n);
					h.lineTo(k + radius, l + n);
					h.quadraticCurveTo(k, l + n, k, l + n - radius);
					h.lineTo(k, l + radius);
					h.quadraticCurveTo(k, l, k + radius, l);
					h.closePath();
					h.fill()
				}
				z.fillStyle = G.eb ? q(e.fill, G.eb, g) : e.fill;
				u(z, e);
				f > e.N + 1E3 * G.ba && (b.splice(c, 1), c < L.length && L.splice(c, 1), c--, e.M == B && -1 == M.indexOf(e) && M.push(e))
			}
		}
		ma && ma.request(I)
	}
	var v = {
			x: b.viewBox.x,
			y: b.viewBox.y,
			width: b.viewBox.width,
			height: b.viewBox.height
		},
		K = [],
		O = {},
		H = {};
	e = "boolean" == typeof e ?
		e : !0;
	var F, D, T, J = null,
		L = [],
		M = [],
		B = 0,
		R = 1;
	H.cleanUp = function() {
		z = c = null;
		y.onmousemove = null;
		y.onmouseout = null;
		O = K = v = G = ma = M = L = J = T = D = y = window.onresize = null
	};
	var y = c.getElementsByTagName("canvas")[0];
	window.onresize = function() {
		g();
		x()
	};
	g();
	var z = y.getContext("2d");
	z.clearRect(0, 0, y.width, y.height);
	y.onmousemove = function(b) {
		var e, g = 0;
		e = 0;
		g = y.getBoundingClientRect();
		e = g.top + (window.pageYOffset || document.documentElement.scrollTop);
		g = g.left + (window.pageXOffset || document.documentElement.scrollLeft);
		g += gb + hb;
		e += ib + jb;
		b = {
			x: (b.pageX - g) * F,
			y: (b.pageY - e) * F
		};
		for (e = K.length - 1; 0 <= e; e--) {
			var h = K[e],
				g = s(b, h.ub),
				h = h.f;
			if (!(g.x < h.x || g.x > h.a || g.y < h.y || g.y > h.c)) break
		}
		b = 0 <= e ? K[e] : null;
		null != b ? y.style.cursor = "pointer" : (y.style.cursor = "auto", c.removeAttribute("href"));
		if (b != J) {
			for (e = 0; e < M.length; e++) - 1 == L.indexOf(M[e]) && L.push(M[e]);
			M = []
		}
		b != J && null != b && (!b.url && b.text && window.DISPLAY_CLOUD_REDEFINE_URL_PATTERN ? (c.href = window.DISPLAY_CLOUD_REDEFINE_URL_PATTERN + encodeURI(b.text), c.target = "_blank") : b.url && (window.TAGUL_DO_NOT_PROTECT_URL ||
			-1 == b.url.toLowerCase().indexOf("javascript:")) ? (c.href = b.url, c.target = G.zb || f ? "_blank" : "_self") : (c.target = "_self", c.href = "javascript:void(0);"), null != b && b.M != B && (b.M = B, e = p(), b.N = e - Math.max(1E3 * G.ba - (e - b.N), 0), -1 == L.indexOf(b) && L.push(b)));
		J = b
	};
	y.onmouseout = function() {
		for (var b = 0; b < L.length; b++) {
			var c = L[b];
			if (c.M == B) {
				c.M = R;
				var e = p();
				c.N = e - Math.max(1E3 * G.ba - (e - c.N), 0);
				J = null
			}
		}
	};
	var ma = ma || new window.AnimationFrame(60);
	void 0 === b.styleOptions && (b.styleOptions = {});
	var G = {
			backgroundColor: b.styleOptions.backgroundColor ?
				"#" + b.styleOptions.backgroundColor : "#FFFFFF",
			jb: k(b.styleOptions.backgroundColorAlpha) ? b.styleOptions.backgroundColorAlpha : 1,
			ba: k(b.styleOptions.animationSpeed) ? b.styleOptions.animationSpeed : 0.3,
			eb: b.styleOptions.textColor ? "#" + b.styleOptions.textColor : void 0,
			Rb: k(b.styleOptions.textAlpha) ? b.styleOptions.textAlpha : 1,
			xa: b.styleOptions.boxColor ? "#" + b.styleOptions.boxColor : void 0,
			kb: k(b.styleOptions.boxAlpha) ? b.styleOptions.boxAlpha : 0.8,
			zoom: !0 == b.styleOptions.zoom,
			rotate: !0 == b.styleOptions.rotate,
			zb: !0 ==
				b.styleOptions.openLinksInNewWindow,
			Fb: k(b.styleOptions.shapeImageAlpha) ? b.styleOptions.shapeImageAlpha : 0
		},
		gb = parseInt(document.defaultView.getComputedStyle(y, void 0).paddingLeft, 10) || 0,
		ib = parseInt(document.defaultView.getComputedStyle(y, void 0).paddingTop, 10) || 0,
		hb = parseInt(document.defaultView.getComputedStyle(y, void 0).borderLeftWidth, 10) || 0,
		jb = parseInt(document.defaultView.getComputedStyle(y, void 0).borderTopWidth, 10) || 0;
	x();
	e && I();
	return H
}
window.TagulDisplayCloud = function(b, c, e, f, h) {
	if (!c)
		if (b) {
			var k = document.createElement("canvas");
			if (k.getContext && k.getContext("2d")) {
				for (k = 0; document.getElementById(c = "tagul_embed_cloud_" + k);) k++;
				document.writeln('<a id="' + c + '" style="width: 100%; height: 100%">');
				document.writeln('<canvas style="width: 100%; height: 100%"></canvas>');
				document.writeln("</a>");
				var k = document.getElementsByTagName("head")[0],
					g = document.createElement("style"),
					l = document.createTextNode("#" + c + " {outline: 0; border: 0; background: none; margin: 0; padding: 0;}\n#" +
						c + ":hover {border: 0;}\n");
				g.type = "text/css";
				g.styleSheet ? g.styleSheet.cssText = l.nodeValue : g.appendChild(l);
				k.appendChild(g)
			} else {
				return
			}
		} else {
			return
		}
	var m;
	if (b.shapeImageCached) return fb(b, document.getElementById(c),e, f, b.shapeImageCached);
	if (b.shapeImage) {
		var n = new Image;
		n.onload = function() {
			m = fb(b, document.getElementById(c), e, f, n);
			void 0 !== window.TAGUL_GENERATOR_VERSION && (window.DISPLAYED_CLOUD = m);
			h && h(m)
		};
		n.onerror = function() {
			m = fb(b, document.getElementById(c), e, f, void 0);
			void 0 !== window.TAGUL_GENERATOR_VERSION && (window.DISPLAYED_CLOUD = m);
			h && h(m)
		};
		n.src = "data:image/png;base64," == b.shapeImage.substr(0, 22) ? b.shapeImage : SHAPES_IMAGES_DIR + b.shapeImage + ".png";
		b.shapeImageCached = n
	} else return m = fb(b, document.getElementById(c),e, f, void 0), h && h(m), m
};
window.Generator = Z;
window.round = function(b, c) {
	return Number(Math.round(b * Math.pow(10, c)) / Math.pow(10, c))
};

(function(e, c, f) {
	function a(b, e) {
		b = b ? b : "";
		e = e || {};
		if ("object" == typeof b && b.hasOwnProperty("_tc_id")) return b;
		var p = d(b),
			m = p.r,
			k = p.g,
			n = p.b,
			r = p.a,
			w = q(100 * r) / 100,
			t = e.format || p.format;
		1 > m && (m = q(m));
		1 > k && (k = q(k));
		1 > n && (n = q(n));
		return {
			ok: p.ok,
			format: t,
			_tc_id: s++,
			alpha: r,
			getAlpha: function() {
				return r
			},
			setAlpha: function(a) {
				r =
					u(a);
				w = q(100 * r) / 100
			},
			toHsv: function() {
				var a = f(m, k, n);
				return {
					h: 360 * a.h,
					s: a.s,
					v: a.v,
					a: r
				}
			},
			toHsvString: function() {
				var a = f(m, k, n),
					d = q(360 * a.h),
					g = q(100 * a.s),
					a = q(100 * a.v);
				return 1 == r ? "hsv(" + d + ", " + g + "%, " + a + "%)" : "hsva(" + d + ", " + g + "%, " + a + "%, " + w + ")"
			},
			toHsl: function() {
				var a = g(m, k, n);
				return {
					h: 360 * a.h,
					s: a.s,
					l: a.l,
					a: r
				}
			},
			toHslString: function() {
				var a = g(m, k, n),
					d = q(360 * a.h),
					b = q(100 * a.s),
					a = q(100 * a.l);
				return 1 == r ? "hsl(" + d + ", " + b + "%, " + a + "%)" : "hsla(" + d + ", " + b + "%, " + a + "%, " + w + ")"
			},
			toHex: function(a) {
				return l(m, k, n, a)
			},
			toHexString: function(a) {
				return "#" + this.toHex(a)
			},
			toHex8: function() {
				return c(m, k, n, r)
			},
			toHex8String: function() {
				return "#" + this.toHex8()
			},
			toRgb: function() {
				return {
					r: q(m),
					g: q(k),
					b: q(n),
					a: r
				}
			},
			toRgbString: function() {
				return 1 == r ? "rgb(" + q(m) + ", " + q(k) + ", " + q(n) + ")" : "rgba(" + q(m) + ", " + q(k) + ", " + q(n) + ", " + w + ")"
			},
			toPercentageRgb: function() {
				return {
					r: q(100 * h(m, 255)) + "%",
					g: q(100 * h(k, 255)) + "%",
					b: q(100 * h(n, 255)) + "%",
					a: r
				}
			},
			toPercentageRgbString: function() {
				return 1 == r ? "rgb(" + q(100 * h(m, 255)) + "%, " + q(100 * h(k, 255)) + "%, " +
					q(100 * h(n, 255)) + "%)" : "rgba(" + q(100 * h(m, 255)) + "%, " + q(100 * h(k, 255)) + "%, " + q(100 * h(n, 255)) + "%, " + w + ")"
			},
			toName: function() {
				return 0 === r ? "transparent" : L[l(m, k, n, !0)] || !1
			},
			toFilter: function(d) {
				var g = "#" + c(m, k, n, r),
					b = g,
					f = e && e.gradientType ? "GradientType = 1, " : "";
				d && (b = a(d).toHex8String());
				return "progid:DXImageTransform.Microsoft.gradient(" + f + "startColorstr=" + g + ",endColorstr=" + b + ")"
			},
			toString: function(a) {
				var d = !!a;
				a = a || this.format;
				var g = !1,
					d = !d && 1 > r && 0 < r && ("hex" === a || "hex6" === a || "hex3" === a || "name" === a);
				"rgb" === a && (g = this.toRgbString());
				"prgb" === a && (g = this.toPercentageRgbString());
				if ("hex" === a || "hex6" === a) g = this.toHexString();
				"hex3" === a && (g = this.toHexString(!0));
				"hex8" === a && (g = this.toHex8String());
				"name" === a && (g = this.toName());
				"hsl" === a && (g = this.toHslString());
				"hsv" === a && (g = this.toHsvString());
				return d ? this.toRgbString() : g || this.toHexString()
			}
		}
	}

	function d(a) {
		var g = {
				r: 0,
				g: 0,
				b: 0
			},
			f = 1,
			l = !1,
			c = !1;
		if ("string" == typeof a) a: {
			a = a.replace(k, "").replace(n, "").toLowerCase();
			var e = !1;
			if (R[a]) a = R[a],
			e = !0;
			else if ("transparent" ==
				a) {
				a = {
					r: 0,
					g: 0,
					b: 0,
					a: 0,
					format: "name"
				};
				break a
			}
			var p;a = (p = O.rgb.exec(a)) ? {
				r: p[1],
				g: p[2],
				b: p[3]
			} : (p = O.rgba.exec(a)) ? {
					r: p[1],
					g: p[2],
					b: p[3],
					a: p[4]
				} : (p = O.hsl.exec(a)) ? {
					h: p[1],
					s: p[2],
					l: p[3]
				} : (p = O.hsla.exec(a)) ? {
					h: p[1],
					s: p[2],
					l: p[3],
					a: p[4]
				} : (p = O.hsv.exec(a)) ? {
					h: p[1],
					s: p[2],
					v: p[3]
				} : (p = O.hex8.exec(a)) ? {
					a: parseInt(p[1], 16) / 255,
					r: parseInt(p[2], 16),
					g: parseInt(p[3], 16),
					b: parseInt(p[4], 16),
					format: e ? "name" : "hex8"
				} : (p = O.hex6.exec(a)) ? {
					r: parseInt(p[1], 16),
					g: parseInt(p[2], 16),
					b: parseInt(p[3], 16),
					format: e ? "name" : "hex"
				} :
				(p = O.hex3.exec(a)) ? {
					r: parseInt(p[1] + "" + p[1], 16),
					g: parseInt(p[2] + "" + p[2], 16),
					b: parseInt(p[3] + "" + p[3], 16),
					format: e ? "name" : "hex"
				} : !1
		}
		if ("object" == typeof a) {
			if (a.hasOwnProperty("r") && a.hasOwnProperty("g") && a.hasOwnProperty("b")) g = a.g, l = a.b, g = {
				r: 255 * h(a.r, 255),
				g: 255 * h(g, 255),
				b: 255 * h(l, 255)
			}, l = !0, c = "%" === String(a.r).substr(-1) ? "prgb" : "rgb";
			else if (a.hasOwnProperty("h") && a.hasOwnProperty("s") && a.hasOwnProperty("v")) {
				a.s = m(a.s);
				a.v = m(a.v);
				var c = a.h,
					e = a.s,
					g = a.v,
					c = 6 * h(c, 360),
					e = h(e, 100),
					g = h(g, 100),
					l = r.floor(c),
					s = c - l,
					c = g * (1 - e);
				p = g * (1 - s * e);
				e = g * (1 - (1 - s) * e);
				l %= 6;
				g = {
					r: 255 * [g, p, c, c, e, g][l],
					g: 255 * [e, g, g, p, c, c][l],
					b: 255 * [c, c, e, g, g, p][l]
				};
				l = !0;
				c = "hsv"
			} else a.hasOwnProperty("h") && a.hasOwnProperty("s") && a.hasOwnProperty("l") && (a.s = m(a.s), a.l = m(a.l), g = b(a.h, a.s, a.l), l = !0, c = "hsl");
			a.hasOwnProperty("a") && (f = a.a)
		}
		f = u(f);
		return {
			ok: l,
			format: a.format || c,
			r: w(255, t(g.r, 0)),
			g: w(255, t(g.g, 0)),
			b: w(255, t(g.b, 0)),
			a: f
		}
	}

	function g(a, d, b) {
		a = h(a, 255);
		d = h(d, 255);
		b = h(b, 255);
		var f = t(a, d, b),
			l = w(a, d, b),
			c, e = (f + l) / 2;
		if (f == l) c = l = 0;
		else {
			var u =
				f - l,
				l = 0.5 < e ? u / (2 - f - l) : u / (f + l);
			switch (f) {
				case a:
					c = (d - b) / u + (d < b ? 6 : 0);
					break;
				case d:
					c = (b - a) / u + 2;
					break;
				case b:
					c = (a - d) / u + 4
			}
			c /= 6
		}
		return {
			h: c,
			s: l,
			l: e
		}
	}

	function b(a, d, g) {
		function f(a, d, g) {
			0 > g && (g += 1);
			1 < g && (g -= 1);
			return g < 1 / 6 ? a + 6 * (d - a) * g : 0.5 > g ? d : g < 2 / 3 ? a + (d - a) * (2 / 3 - g) * 6 : a
		}
		a = h(a, 360);
		d = h(d, 100);
		g = h(g, 100);
		if (0 === d) g = d = a = g;
		else {
			var l = 0.5 > g ? g * (1 + d) : g + d - g * d,
				c = 2 * g - l;
			g = f(c, l, a + 1 / 3);
			d = f(c, l, a);
			a = f(c, l, a - 1 / 3)
		}
		return {
			r: 255 * g,
			g: 255 * d,
			b: 255 * a
		}
	}

	function f(a, d, g) {
		a = h(a, 255);
		d = h(d, 255);
		g = h(g, 255);
		var b = t(a, d, g),
			l = w(a, d, g),
			c, e = b - l;
		if (b == l) c = 0;
		else {
			switch (b) {
				case a:
					c = (d - g) / e + (d < g ? 6 : 0);
					break;
				case d:
					c = (g - a) / e + 2;
					break;
				case g:
					c = (a - d) / e + 4
			}
			c /= 6
		}
		return {
			h: c,
			s: 0 === b ? 0 : e / b,
			v: b
		}
	}

	function l(a, d, g, b) {
		a = [p(q(a).toString(16)), p(q(d).toString(16)), p(q(g).toString(16))];
		return b && a[0].charAt(0) == a[0].charAt(1) && a[1].charAt(0) == a[1].charAt(1) && a[2].charAt(0) == a[2].charAt(1) ? a[0].charAt(0) + a[1].charAt(0) + a[2].charAt(0) : a.join("")
	}

	function c(a, d, g, b) {
		return [p(Math.round(255 * parseFloat(b)).toString(16)), p(q(a).toString(16)), p(q(d).toString(16)),
			p(q(g).toString(16))
		].join("")
	}

	function u(a) {
		a = parseFloat(a);
		if (isNaN(a) || 0 > a || 1 < a) a = 1;
		return a
	}

	function h(a, d) {
		var g = a;
		"string" == typeof g && -1 != g.indexOf(".") && 1 === parseFloat(g) && (a = "100%");
		g = "string" === typeof a && -1 != a.indexOf("%");
		a = w(d, t(0, parseFloat(a)));
		g && (a = parseInt(a * d, 10) / 100);
		return 1E-6 > r.abs(a - d) ? 1 : a % d / parseFloat(d)
	}

	function p(a) {
		return 1 == a.length ? "0" + a : "" + a
	}

	function m(a) {
		1 >= a && (a = 100 * a + "%");
		return a
	}
	var k = /^[\s,#]+/,
		n = /\s+$/,
		s = 0,
		r = Math,
		q = r.round,
		w = r.min,
		t = r.max,
		N = r.random;
	a.fromRatio =
		function(d, g) {
			if ("object" == typeof d) {
				var b = {},
					f;
				for (f in d) d.hasOwnProperty(f) && (b[f] = "a" === f ? d[f] : m(d[f]));
				d = b
			}
			return a(d, g)
		};
	a.equals = function(d, g) {
		return d && g ? a(d).toRgbString() == a(g).toRgbString() : !1
	};
	a.random = function() {
		return a.fromRatio({
			r: N(),
			g: N(),
			b: N()
		})
	};
	a.desaturate = function(d, g) {
		g = 0 === g ? 0 : g || 10;
		var b = a(d).toHsl();
		b.s -= g / 100;
		b.s = w(1, t(0, b.s));
		return a(b)
	};
	a.saturate = function(d, g) {
		g = 0 === g ? 0 : g || 10;
		var b = a(d).toHsl();
		b.s += g / 100;
		b.s = w(1, t(0, b.s));
		return a(b)
	};
	a.greyscale = function(d) {
		return a.desaturate(d,
			100)
	};
	a.lighten = function(d, g) {
		g = 0 === g ? 0 : g || 10;
		var b = a(d).toHsl();
		b.l += g / 100;
		b.l = w(1, t(0, b.l));
		return a(b)
	};
	a.darken = function(d, g) {
		g = 0 === g ? 0 : g || 10;
		var b = a(d).toHsl();
		b.l -= g / 100;
		b.l = w(1, t(0, b.l));
		return a(b)
	};
	a.complement = function(d) {
		d = a(d).toHsl();
		d.h = (d.h + 180) % 360;
		return a(d)
	};
	a.triad = function(d) {
		var g = a(d).toHsl(),
			b = g.h;
		return [a(d), a({
			h: (b + 120) % 360,
			s: g.s,
			l: g.l
		}), a({
			h: (b + 240) % 360,
			s: g.s,
			l: g.l
		})]
	};
	a.tetrad = function(d) {
		var g = a(d).toHsl(),
			b = g.h;
		return [a(d), a({
			h: (b + 90) % 360,
			s: g.s,
			l: g.l
		}), a({
			h: (b + 180) % 360,
			s: g.s,
			l: g.l
		}), a({
			h: (b + 270) % 360,
			s: g.s,
			l: g.l
		})]
	};
	a.splitcomplement = function(d) {
		var g = a(d).toHsl(),
			b = g.h;
		return [a(d), a({
			h: (b + 72) % 360,
			s: g.s,
			l: g.l
		}), a({
			h: (b + 216) % 360,
			s: g.s,
			l: g.l
		})]
	};
	a.analogous = function(d, g, b) {
		g = g || 6;
		b = b || 30;
		var f = a(d).toHsl();
		b = 360 / b;
		d = [a(d)];
		for (f.h = (f.h - (b * g >> 1) + 720) % 360; --g;) f.h = (f.h + b) % 360, d.push(a(f));
		return d
	};
	a.monochromatic = function(d, g) {
		g = g || 6;
		for (var b = a(d).toHsv(), f = b.h, l = b.s, b = b.v, c = [], e = 1 / g; g--;) c.push(a({
			h: f,
			s: l,
			v: b
		})), b = (b + e) % 1;
		return c
	};
	a.readability = function(d, g) {
		var b =
			a(d).toRgb(),
			f = a(g).toRgb(),
			l = (299 * b.r + 587 * b.g + 114 * b.b) / 1E3,
			c = (299 * f.r + 587 * f.g + 114 * f.b) / 1E3,
			b = Math.max(b.r, f.r) - Math.min(b.r, f.r) + Math.max(b.g, f.g) - Math.min(b.g, f.g) + Math.max(b.b, f.b) - Math.min(b.b, f.b);
		return {
			brightness: Math.abs(l - c),
			color: b
		}
	};
	a.readable = function(d, g) {
		var b = a.readability(d, g);
		return 125 < b.brightness && 500 < b.color
	};
	a.mostReadable = function(d, g) {
		for (var b = null, f = 0, l = !1, c = 0; c < g.length; c++) {
			var e = a.readability(d, g[c]),
				u = 125 < e.brightness && 500 < e.color,
				e = e.brightness / 125 * 3 + e.color / 500;
			if (u &&
				!l || u && l && e > f || !u && !l && e > f) l = u, f = e, b = a(g[c])
		}
		return b
	};
	var R = a.names = {
			aliceblue: "f0f8ff",
			antiquewhite: "faebd7",
			aqua: "0ff",
			aquamarine: "7fffd4",
			azure: "f0ffff",
			beige: "f5f5dc",
			bisque: "ffe4c4",
			black: "000",
			blanchedalmond: "ffebcd",
			blue: "00f",
			blueviolet: "8a2be2",
			brown: "a52a2a",
			burlywood: "deb887",
			burntsienna: "ea7e5d",
			cadetblue: "5f9ea0",
			chartreuse: "7fff00",
			chocolate: "d2691e",
			coral: "ff7f50",
			cornflowerblue: "6495ed",
			cornsilk: "fff8dc",
			crimson: "dc143c",
			cyan: "0ff",
			darkblue: "00008b",
			darkcyan: "008b8b",
			darkgoldenrod: "b8860b",
			darkgray: "a9a9a9",
			darkgreen: "006400",
			darkgrey: "a9a9a9",
			darkkhaki: "bdb76b",
			darkmagenta: "8b008b",
			darkolivegreen: "556b2f",
			darkorange: "ff8c00",
			darkorchid: "9932cc",
			darkred: "8b0000",
			darksalmon: "e9967a",
			darkseagreen: "8fbc8f",
			darkslateblue: "483d8b",
			darkslategray: "2f4f4f",
			darkslategrey: "2f4f4f",
			darkturquoise: "00ced1",
			darkviolet: "9400d3",
			deeppink: "ff1493",
			deepskyblue: "00bfff",
			dimgray: "696969",
			dimgrey: "696969",
			dodgerblue: "1e90ff",
			firebrick: "b22222",
			floralwhite: "fffaf0",
			forestgreen: "228b22",
			fuchsia: "f0f",
			gainsboro: "dcdcdc",
			ghostwhite: "f8f8ff",
			gold: "ffd700",
			goldenrod: "daa520",
			gray: "808080",
			green: "008000",
			greenyellow: "adff2f",
			grey: "808080",
			honeydew: "f0fff0",
			hotpink: "ff69b4",
			indianred: "cd5c5c",
			indigo: "4b0082",
			ivory: "fffff0",
			khaki: "f0e68c",
			lavender: "e6e6fa",
			lavenderblush: "fff0f5",
			lawngreen: "7cfc00",
			lemonchiffon: "fffacd",
			lightblue: "add8e6",
			lightcoral: "f08080",
			lightcyan: "e0ffff",
			lightgoldenrodyellow: "fafad2",
			lightgray: "d3d3d3",
			lightgreen: "90ee90",
			lightgrey: "d3d3d3",
			lightpink: "ffb6c1",
			lightsalmon: "ffa07a",
			lightseagreen: "20b2aa",
			lightskyblue: "87cefa",
			lightslategray: "789",
			lightslategrey: "789",
			lightsteelblue: "b0c4de",
			lightyellow: "ffffe0",
			lime: "0f0",
			limegreen: "32cd32",
			linen: "faf0e6",
			magenta: "f0f",
			maroon: "800000",
			mediumaquamarine: "66cdaa",
			mediumblue: "0000cd",
			mediumorchid: "ba55d3",
			mediumpurple: "9370db",
			mediumseagreen: "3cb371",
			mediumslateblue: "7b68ee",
			mediumspringgreen: "00fa9a",
			mediumturquoise: "48d1cc",
			mediumvioletred: "c71585",
			midnightblue: "191970",
			mintcream: "f5fffa",
			mistyrose: "ffe4e1",
			moccasin: "ffe4b5",
			navajowhite: "ffdead",
			navy: "000080",
			oldlace: "fdf5e6",
			olive: "808000",
			olivedrab: "6b8e23",
			orange: "ffa500",
			orangered: "ff4500",
			orchid: "da70d6",
			palegoldenrod: "eee8aa",
			palegreen: "98fb98",
			paleturquoise: "afeeee",
			palevioletred: "db7093",
			papayawhip: "ffefd5",
			peachpuff: "ffdab9",
			peru: "cd853f",
			pink: "ffc0cb",
			plum: "dda0dd",
			powderblue: "b0e0e6",
			purple: "800080",
			red: "f00",
			rosybrown: "bc8f8f",
			royalblue: "4169e1",
			saddlebrown: "8b4513",
			salmon: "fa8072",
			sandybrown: "f4a460",
			seagreen: "2e8b57",
			seashell: "fff5ee",
			sienna: "a0522d",
			silver: "c0c0c0",
			skyblue: "87ceeb",
			slateblue: "6a5acd",
			slategray: "708090",
			slategrey: "708090",
			snow: "fffafa",
			springgreen: "00ff7f",
			steelblue: "4682b4",
			tan: "d2b48c",
			teal: "008080",
			thistle: "d8bfd8",
			tomato: "ff6347",
			turquoise: "40e0d0",
			violet: "ee82ee",
			wheat: "f5deb3",
			white: "fff",
			whitesmoke: "f5f5f5",
			yellow: "ff0",
			yellowgreen: "9acd32"
		},
		L = a.hexNames = function(a) {
			var d = {},
				g;
			for (g in a) a.hasOwnProperty(g) && (d[a[g]] = g);
			return d
		}(R),
		O = {
			rgb: RegExp("rgb[\\s|\\(]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))\\s*\\)?"),
			rgba: RegExp("rgba[\\s|\\(]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))\\s*\\)?"),
			hsl: RegExp("hsl[\\s|\\(]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))\\s*\\)?"),
			hsla: RegExp("hsla[\\s|\\(]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))\\s*\\)?"),
			hsv: RegExp("hsv[\\s|\\(]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))\\s*\\)?"),
			hex3: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
			hex6: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
			hex8: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
		};
	e.tinycolor = a
})(window, jQuery);

var TAGUL_GENERATOR_VERSION = 3.28,
	TAGS_MAX_AMOUNT = 999,
	DISPLAYED_CLOUD,
	CLOUD_RENDER_MODE="animation", GENERATED_CLOUD, CUSTOM_SHAPE_CANVAS_SIZE = 1E3,
	SHAPES_IMAGES_DIR = "/static/generator/images/shapes/",
	DEFAULT_SHAPE_IMAGE_ALPHA = 0.05,
	GENERATOR, GENERATORS = [],
	FONTS = [
	{
		id: "STKAITI",
		name: "STKAITI",
		file: "/static/generator/fonts/STKAITI.ttf"
	},
	{
		id: "FZLTCXHJW",
		name: "FZLTCXHJW",
		file: "/static/generator/fonts/FZLTCXHJW.ttf"
	},
	{
		id: "FZYTK",
		name: "FZYTK",
		file: "/static/generator/fonts/FZYTK.ttf"
	}
	],
	SHAPES = [
	{
		name: "man",
		category: "All",
		ratio: 2,
		src: SHAPES_IMAGES_DIR+"man.png",
		origSrc: SHAPES_IMAGES_DIR+"man.png",
		useShapeColors: !0,
		classicShape: !0
	},
	{
		name: "woman",
		category: "All",
		ratio: 2,
		src: SHAPES_IMAGES_DIR+"woman.png",
		origSrc: SHAPES_IMAGES_DIR+"woman.png",
		useShapeColors: !0,
		classicShape: !0
	}],
	LAYOUTS = [{
		id: "horizontal",
		angles: [0]
	}, {
		id: "vertical",
		angles: [90]
	}, {
		id: "mixed",
		angles: [0, 90]
	}, {
		id: "arrow",
		angles: [0, 90, 45, -45]
	}, {
		id: "crossing",
		angles: [45, -45]
	}, {
		id: "dancing",
		angles: [10, -10]
	}, {
		id: "positive_slope",
		angles: [10, 10]
	}, {
		id: "negative_slope",
		angles: [-10, -10]
	}, {
		id: "random",
		angles: []
	}],
	EMOJIONE = {
		":100:": "\ud83d\udcaf",
		":regional_indicator_a:": "\ud83c\udde6"
	};
var CLOUD_DATA = {
	"cloudId": 0,
	"userId": "anonymous",
	"name": "Word Art",
	"uniqueId": "000000000000",
	"visibility": 0,
	"url": "",
	"linkPattern": "",
	"relativeSize": -1,
	"tagsAmount": -1,
	"fonts": [FONTS[2].name],
	"tags": []
};
String.prototype.format || (String.prototype.format = function() {
	var e = arguments;
	return this.replace(/{(\d+)}/g, function(c, f) {
		return "undefined" != typeof e[f] ? e[f] : c
	})
});

function readColors() {
	var e = [];
	for(var i=0; i<10; i++){
		var color = tinycolor.random().toHexString();
		e.push(color.replace("#",""));
	}
	return e;
}

function readStyleOptions() {
	var e = {
		"backgroundColor": "ffffff",
		"backgroundColorAlpha": 1,
		"animationSpeed": "0.2",
		"zoom": true,
		"rotate": true,
		"openLinksInNewWindow": false,
		"shapeImageAlpha": 0.05,
		"textColor": "ffffff",
		"textAlpha": 1,
		"boxColor": "000000",
		"boxAlpha": 0.7
	};
	return e
}

function visualize() {
	var shape = Math.round(Math.random());
	var tags = Mock.mock({
		"list|30": [
			{
				"text": "@cword(5,7)",
				"weight": "@integer(1,10)"
			}
		]
	});
	CLOUD_DATA.tags = tags.list;
	GENERATOR && GENERATOR.prop("visualizeInProgress") || (CLOUD_DATA = readCloudData(shape), 
		GENERATORS.push(GENERATOR), 
		GENERATOR = new Generator({
			statusUpdateCallback: statusUpdateCallback,
			errorCallback: errorCallback,
			completionCallback: completionCallback,
			fonts: FONTS,
			cloudData: JSON.parse(JSON.stringify(CLOUD_DATA)),
			generatedCloud: GENERATED_CLOUD
		}), GENERATOR.generate())
}

function statusUpdateCallback(e, c) {

}

function errorCallback(e) {
	console.error(e);
}

function readCloudData(shapeIndex) {
	var c = SHAPES[shapeIndex];
	CLOUD_DATA.shape = {
		name: "custom" == c.name.substr(0, 6) ? "custom" : c.name,
		angle: c.angle,
		ratio: c.ratio,
		negative: c.negative,
		src: c.src,
		useShapeColors: !1,
		whiteToAlpha: c.whiteToAlpha,
		edges: c.edges,
		mods: c.mods,
		hash: c.hash
	};
	CLOUD_DATA.colors = readColors();
	CLOUD_DATA.angles = LAYOUTS[0].angles;
	CLOUD_DATA.styleOptions = readStyleOptions();
	for (e = 0; e < CLOUD_DATA.tags.length; e++) "" == CLOUD_DATA.tags[e].text && (CLOUD_DATA.tags.splice(e, 1), e--);
	CLOUD_DATA.tags.splice(TAGS_MAX_AMOUNT, CLOUD_DATA.tags.length - TAGS_MAX_AMOUNT);
	return CLOUD_DATA
}

function cloudCleanUp(e) {
	for (var c in e)
		if (e.hasOwnProperty(c)) switch (c) {
			case "empty":
				break;
			case "viewBox":
				var f = e.viewBox,
					b;
				for (b in f) f.hasOwnProperty(b) && (-1 == ["x", "y", "width", "height"].indexOf(b) ? delete f[b] : f[b] = round(f[b], 4));
				break;
			case "styleOptions":
				var f = e.styleOptions,
					a;
				for (a in f) f.hasOwnProperty(a) && -1 == "animationSpeed backgroundColor backgroundColorAlpha boxAlpha boxColor openLinksInNewWindow rotate textAlpha textColor zoom shapeImageAlpha".split(" ").indexOf(a) && delete f[a];
				break;
			case "outlines":
				break;
			case "texts":
				for (var g = 0; g < e.texts.length; g++) {
					var f = e.texts[g],
						d;
					for (d in f)
						if (f.hasOwnProperty(d)) switch (d) {
							case "bbox":
								var l = f.bbox,
									u;
								for (u in l) l.hasOwnProperty(u) && (-1 == ["x", "y", "width", "height"].indexOf(u) ? delete l[u] : l[u] = round(l[u], 4));
								break;
							case "xheight":
								break;
							case "text":
								break;
							case "glyphs":
								for (l = 0; l < f.glyphs.length; l++) {
									var p = f.glyphs[l],
										h;
									for (h in p) p.hasOwnProperty(h) && -1 == ["x", "y", "glyph"].indexOf(h) && delete p[h]
								}
								break;
							default:
								delete f[d]
						}
				}
				break;
			case "tags":
				for (g = 0; g < e.tags.length; g++) {
					var f =
						e.tags[g],
						m;
					for (m in f)
						if (f.hasOwnProperty(m)) switch (m) {
							case "fixed":
								break;
							case "parentId":
								break;
							case "textId":
								break;
							case "fill":
								break;
							case "shapeColor":
								break;
							case "matrix":
								f.matrix[0][0] = round(f.matrix[0][0], 8);
								f.matrix[0][1] = round(f.matrix[0][1], 8);
								f.matrix[0][2] = round(f.matrix[0][2], 8);
								f.matrix[1][0] = round(f.matrix[1][0], 8);
								f.matrix[1][1] = round(f.matrix[1][1], 8);
								f.matrix[1][2] = round(f.matrix[1][2], 8);
								break;
							case "fc":
								break;
							case "repeat":
								break;
							case "url":
								break;
							case "hidden":
								break;
							default:
								delete f[m]
						}
				}
				break;
			case "meta":
				break;
			case "shapeImage":
				break;
			case "shapeImageCached":
				break;
			default:
				delete e[c]
		}
		c = e.outlines;
	for (var k in c)
		if ("m" == k[k.length - 1])
			for (p in c)
				if (p != k && c[p] == c[k]) {
					delete c[k];
					for (b = 0; b < e.texts.length; b++)
						for (f = e.texts[b], a = 0; a < f.glyphs.length; a++) d = f.glyphs[a], d.glyph == k && (d.glyph = p);
					break
				}
	return e
}

function displayCloud(e, c, f, b) {
	c = c || "tagulCloud";
	GENERATED_CLOUD = e;
	DISPLAYED_CLOUD && (DISPLAYED_CLOUD.cleanUp(), DISPLAYED_CLOUD = null);
	"animation" == CLOUD_RENDER_MODE ?  DISPLAYED_CLOUD = new TagulDisplayCloud(e, c, !0, !0, b) : "";
}

function completionCallback(e) {
	(0 < e.tags.length ? (GENERATORS = [], displayCloud(cloudCleanUp(e), null, !0)) : alert("The visualized word art is empty.Please try to change shape or font."));
}

String.prototype.format || (String.prototype.format = function() {
	var e = arguments;
	return this.replace(/{(\d+)}/g, function(c, f) {
		return "undefined" != typeof e[f] ? e[f] : c
	})
});

(function(e) {
	function c(a) {
		if (!(this instanceof c)) return new c(a);
		a || (a = {});
		"number" == typeof a && (a = {
			frameRate: a
		});
		null != a.useNative || (a.useNative = !0);
		this.options = a;
		this.frameRate = a.frameRate || c.FRAME_RATE;
		this._frameLength = 1E3 / this.frameRate;
		this._isCustomFrameRate = this.frameRate !== c.FRAME_RATE;
		this._timeoutId = null;
		this._callbacks = {};
		this._tickCounter = this._lastTickTime = 0
	}
	var f = Date.now,
		b = e.setTimeout,
		a, g, d = !1;
	(function() {
		var b, c = ["ms", "moz", "webkit", "o"];
		a = e.requestAnimationFrame;
		g = e.cancelAnimationFrame;
		for (b = 0; b < c.length && !a; b++) a = a || e[c[b] + "RequestAnimationFrame"], g = g || e[c[b] + "CancelAnimationFrame"] || e[c[b] + "CancelRequestAnimationFrame"];
		a && a(function() {
			d = !0
		})
	})();
	c.FRAME_RATE = 60;
	c.shim = function(a) {
		var d = new c(a);
		e.requestAnimationFrame = function(a) {
			return d.request(a)
		};
		e.cancelAnimationFrame = function(a) {
			return d.cancel(a)
		};
		return d
	};
	c.prototype.request = function(c) {
		var g = this,
			e;
		++this._tickCounter;
		if (d && g.options.useNative && !this._isCustomFrameRate) return a(c);
		if (!c) throw new TypeError("Not enough arguments");
		null == this._timeoutId && (e = this._frameLength + this._lastTickTime - (f ? f() : (new Date).getTime()), 0 > e && (e = 0), this._timeoutId = b(function() {
			var b;
			g._lastTickTime = f ? f() : (new Date).getTime();
			g._timeoutId = null;
			++g._tickCounter;
			for (b in g._callbacks)
				if (g._callbacks[b]) {
					if (d && g.options.useNative) a(g._callbacks[b]);
					else g._callbacks[b](g._lastTickTime);
					delete g._callbacks[b]
				}
		}, e));
		this._callbacks[this._tickCounter] = c;
		return this._tickCounter
	};
	c.prototype.cancel = function(a) {
		d && this.options.useNative && g(a);
		delete this._callbacks[a]
	};
	"object" == typeof exports && "object" == typeof module ? module.exports = c : "function" == typeof define && define.amd ? define(function() {
		return c
	}) : e.AnimationFrame = c
})(window);

//加载字体文件
function loadFonts(font){
	var h = new XMLHttpRequest;
	h.onreadystatechange = function() {
		if (4 == h.readyState)
			if (200 == h.status) {
				var data = null;
				try {
					data = fontkit.create(la(h.response)), data.xheight = pa(data);
				} catch (f) {
					console.error("Font can't be processed: " + f.message);
					return
				}
				font.data = data;
			} else console.error("Font could not be loaded: " + h.statusText);
	};
	h.open("get", font.file, !0);
	h.responseType = "arraybuffer";
	h.send();
}

$(document).ready(function() {
	$("#visualize_btn").on("click touchstart", visualize);
	$("#zoom_btn").on("click touchstart", function(e){
		e.stopPropagation();
		e.preventDefault();
		if (!0 !== e.handled){
			"animation" == CLOUD_RENDER_MODE ? ($("#editModeZoomedCanvasContainer").append("<canvas></canvas>"),
				displayCloud(GENERATED_CLOUD, "editModeZoomedCanvasContainer")) : ($(this).dialog("option", "title", "Edit mode"), $("#tagulEditCloud").removeClass("tagulCloud"), $("#editModeZoomedCanvasContainer").append($("#tagulEditCloud")), EDITED_CLOUD.setDimensions(520, 520));
			e.handled = !0;
		} 
		else return !1
	});
	loadFonts(FONTS[2]);
});