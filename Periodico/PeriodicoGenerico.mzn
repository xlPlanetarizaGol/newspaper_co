int: n;
array [1..n] of int: minP;
array [1..n] of int: maxP;
array [1..n] of int: readers;

int: P;

array [1..n] of var 0..P: x;
array [1..n] of var 0..1: b;


var int: utilidad;
constraint forall(j in 1..n)(x[j] >= minP[j]);
constraint forall(j in 1..n)(x[j] <= maxP[j]);
constraint sum(j in 1..n)(x[j] * b[j]) <= P;

constraint utilidad = sum(j in 1..n)(x[j]*b[j] * readers[j]);
solve maximize utilidad;