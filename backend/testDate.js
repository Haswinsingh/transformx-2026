const d = new Date("2026-09-19T23:59:59+05:30");
console.log(d.getTime());
console.log(Date.now());
console.log(Date.now() > d.getTime());
