const p = { textContent: "Someday when I'm old," };
const text = p.textContent;
let out = "";
for(const char of text) {
  out += char;
}
console.log(out === text);
