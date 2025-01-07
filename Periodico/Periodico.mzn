var int: x1;
var int: x2;
var int: x3;
var int: x4;
var int: x5;
var bool: b1;
var bool: b2;
var bool: b3;
var bool: b4;
var bool: b5;
var int: c;

constraint x1 >= 5;
constraint x2 >= 4;
constraint x3 >= 2;
constraint x4 >= 2;
constraint x5 >= 1;
constraint x1 <= 9;
constraint x2 <= 7;
constraint x3 <= 5;
constraint x4 <= 4;
constraint x5 <= 3;

constraint x1 * b1 + x2 * b2 + x3 *b3 + x4 * b4 + x5 * b5 <= 10;
constraint c = 1500 * x1*b1 + 2000 *x2*b2 + 1000 *x3*b3 + 1500*x4*b4 + 750 * x5*b5;

solve maximize c;

output ["Internacional =", show(x1 * b1), "\nNacional= ", show(x2 * b2), "\nNoticias locales = ", show(x3 * b3), "\nDeportes = ", show(x4 * b4), "\nCultura = ", show(x5 * b5)];
