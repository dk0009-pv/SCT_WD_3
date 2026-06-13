// src/data/questions.js
export const QUESTIONS = [
  { id:1,  type:'single', difficulty:'easy',   points:10, q:'What is the chemical symbol for Gold?',                           opts:['Au','Ag','Gd','Go'],                              ans:0,    explain:'Au comes from the Latin "Aurum", meaning gold.' },
  { id:2,  type:'single', difficulty:'easy',   points:10, q:'Who painted the Mona Lisa?',                                      opts:['Michelangelo','Raphael','Leonardo da Vinci','Caravaggio'], ans:2, explain:'Leonardo da Vinci painted it between c.1503–1519.' },
  { id:3,  type:'single', difficulty:'medium', points:15, q:'What is the result of 12 × 13?',                                  opts:['144','152','156','148'],                          ans:2,    explain:'12 × 13 = 156.' },
  { id:4,  type:'single', difficulty:'medium', points:15, q:'What is the largest ocean on Earth?',                             opts:['Atlantic','Indian','Arctic','Pacific'],           ans:3,    explain:'The Pacific covers over 30% of Earth\'s surface.' },
  { id:5,  type:'single', difficulty:'hard',   points:20, q:'How many bones are in the adult human body?',                    opts:['186','206','216','226'],                          ans:1,    explain:'Adults have 206 bones. Babies are born with ~270.' },
  { id:6,  type:'single', difficulty:'hard',   points:20, q:'Which planet has the most moons in our Solar System?',           opts:['Jupiter','Saturn','Uranus','Neptune'],            ans:1,    explain:'Saturn has 146 confirmed moons (as of 2023).' },
  { id:7,  type:'multi',  difficulty:'medium', points:15, q:'Which of the following are planets in our Solar System?',        opts:['Neptune','Pluto','Saturn','Ceres'],               ans:[0,2], hint:'Select all that apply', explain:'Neptune and Saturn are planets. Pluto and Ceres are dwarf planets.' },
  { id:8,  type:'multi',  difficulty:'hard',   points:20, q:'Which of these programming languages are statically typed?',     opts:['Python','TypeScript','Go','Ruby'],                ans:[1,2], hint:'Select all that apply', explain:'TypeScript and Go are statically typed. Python and Ruby are dynamic.' },
  { id:9,  type:'fill',   difficulty:'easy',   points:10, q:'What is the capital city of Japan?',                             ans:'tokyo',    explain:'Tokyo has been Japan\'s capital since 1869.' },
  { id:10, type:'fill',   difficulty:'easy',   points:10, q:'What year did World War II end?',                                ans:'1945',     explain:'WWII ended in 1945 — VE Day (May 8) and VJ Day (Sept 2).' },
]
