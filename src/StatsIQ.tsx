import React, { useState, useEffect, useCallback, useRef } from "react";
import { Analytics } from "@vercel/analytics/react";

// ─── EASY (45 puzzles) ────────────────────────────────────────────────────────
const EASY = [
  { player:"Michael Jordan", sport:"🏀 NBA", answer:"JORDAN", era:"classic", stats:{PTS:"45",REB:"9",AST:"6",STL:"3",BLK:"1"}, ctx:"1992 NBA Finals Game 1 vs Portland Trail Blazers", clues:["Shot 6-for-6 from three in the first half","Won 6 NBA championships total","Grew up in Wilmington North Carolina and was cut from his high school varsity team as a sophomore","Wore number 23"] },
  { player:"Kobe Bryant", sport:"🏀 NBA", answer:"KOBE", era:"modern", stats:{PTS:"81",REB:"6",AST:"2",STL:"3",BLK:"1"}, ctx:"Jan 22, 2006 — vs Toronto Raptors", clues:["2nd highest single-game score in NBA history","Scored 55 in the second half alone","Played entire career with the LA Lakers","Nickname: Black Mamba"] },
  { player:"Wilt Chamberlain", sport:"🏀 NBA", answer:"WILT", era:"legends", stats:{PTS:"100",REB:"25",AST:"2",OPPONENT:"Knicks"}, ctx:"March 2, 1962 — vs New York Knicks", clues:["All-time NBA single-game scoring record","Record stood over 60 years","Scored 100 points in a single NBA game — a record that will almost certainly never be broken","Averaged 50.4 PPG that entire season"] },
  { player:"LeBron James", sport:"🏀 NBA", answer:"LEBRON", era:"modern", stats:{PTS:"27.2",REB:"7.4",AST:"8.3",STL:"1.6"}, ctx:"2012-13 NBA Season — Miami Heat MVP", clues:["Averaged 26.1 points, 7.3 rebounds, and 7.3 assists this season","Grew up in Akron Ohio and was on the cover of Sports Illustrated at age 17 before ever playing an NBA game","Won NBA championships with three different franchises — Miami Cleveland and Los Angeles","Known as The King"] },
  { player:"Stephen Curry", sport:"🏀 NBA", answer:"CURRY", era:"modern", stats:{PTS:"30.1",REB:"5.4",AST:"6.7","3PM":"5.1"}, ctx:"2015-16 NBA Season — Unanimous MVP", clues:["Grew up in Charlotte North Carolina as the son of a professional NBA player","Revolutionized basketball by making the three-pointer the dominant offensive weapon in the sport","His father Dell Curry also played in the NBA for 16 seasons","All-time leader in three-pointers made"] },
  { player:"Shaquille O'Neal", sport:"🏀 NBA", answer:"SHAQ", era:"modern", stats:{PTS:"38.7",REB:"16.7",AST:"2.3",TEAM:"Lakers"}, ctx:"2000 NBA Finals MVP — vs Indiana Pacers", clues:["Averaged 38 points per game in that Finals series","Was so dominant that the NBA changed its rules multiple times specifically because of him","Was 7ft 1in and 325 pounds — the most physically dominant center in NBA history","Nickname: Diesel"] },
  { player:"Magic Johnson", sport:"🏀 NBA", answer:"MAGIC", era:"classic", stats:{PTS:"26.2",REB:"7",AST:"12.2",STL:"2.3"}, ctx:"1987 NBA Finals MVP — Los Angeles Lakers", clues:["His team defeated the Indiana Pacers in 6 games","His team defeated the Boston Celtics","Was picked 1st overall in 1979 — the same draft that Isiah Thomas and Larry Bird were taken","Wore number 32 for the Showtime Lakers"] },
  { player:"Larry Bird", sport:"🏀 NBA", answer:"BIRD", era:"classic", stats:{PTS:"29",REB:"11.5",AST:"6.1",TEAM:"Celtics"}, ctx:"1984 NBA Finals MVP — Boston Celtics", clues:["His team came back from 3-2 down to win the series","His team defeated the Los Angeles Lakers","Grew up in French Lick Indiana and was nearly impossible to guard due to his court vision and shooting","Nicknamed The Hick from French Lick"] },
  { player:"Tom Brady", sport:"🏈 NFL", answer:"BRADY", era:"modern", stats:{YDS:"505",TD:"3",INT:"0",COMP:"43"}, ctx:"Super Bowl LII vs Philadelphia Eagles 2018", clues:["His team lost despite these numbers","His 8th Super Bowl appearance","Has more Super Bowl victories than any other player in NFL history","Won 7 Super Bowls total"] },
  { player:"Patrick Mahomes", sport:"🏈 NFL", answer:"MAHOMES", era:"modern", stats:{YDS:"360",TD:"3",INT:"0",COMP:"21"}, ctx:"Super Bowl LVII MVP vs Philadelphia Eagles", clues:["Had a famous 74-yard touchdown run in this game","Became the highest-paid player in NFL history when he signed his contract extension in 2020","His father Patrick Mahomes Sr. pitched in Major League Baseball for 11 seasons","Won his second Super Bowl"] },
  { player:"Jerry Rice", sport:"🏈 NFL", answer:"RICE", era:"classic", stats:{REC:"11",YDS:"215",TD:"3",YPR:"19.5"}, ctx:"Super Bowl XXIII — Named MVP", clues:["Ran a 4.71 40-yard dash at the combine — considered slow — but became the greatest receiver ever","Grew up in New Eagle Pennsylvania and was the backup to Joe Montana for years","Holds NFL records for career receptions, yards, and TDs","Holds NFL record for career TDs"] },
  { player:"Peyton Manning", sport:"🏈 NFL", answer:"MANNING", era:"modern", stats:{YDS:"5477",TD:"55",INT:"10",RTG:"115.1"}, ctx:"2013 NFL Season — Single season TD record", clues:["Retired with the most passing yards in NFL history at the time","Had a famous connection on 4th and 26 with Freddie Mitchell that saved the Eagles season in 2004","Was known for his pre-snap theatrics and audible calls that confused opposing defenses","Brother Eli also played QB in NFL"] },
  { player:"Walter Payton", sport:"🏈 NFL", answer:"PAYTON", era:"classic", stats:{CAR:"339",YDS:"1852",TD:"14",YPC:"5.5"}, ctx:"1977 NFL Season — Chicago Bears", clues:["Holds the NFL record for most career rushing yards — surpassing Jim Brown's mark in 1984","Was nicknamed Sweetness for his graceful running style despite being one of the toughest runners ever","Holds the record for most rushing yards in a single game by a running back in NFL history","Nicknamed Sweetness"] },
  { player:"Joe Montana", sport:"🏈 NFL", answer:"MONTANA", era:"classic", stats:{YDS:"357",TD:"2",INT:"0",RTG:"115.2"}, ctx:"Super Bowl XIX MVP — San Francisco 49ers vs Dolphins", clues:["Was known for his ice-cold composure — never lost a Super Bowl in four appearances","Never threw an INT in 4 Super Bowls","Was known for the West Coast offense which he helped pioneer","Nicknamed Joe Cool for his composure"] },
  { player:"Babe Ruth", sport:"⚾ MLB", answer:"RUTH", era:"legends", stats:{HR:"60",AVG:".356",RBI:"164",OBP:".486"}, ctx:"1927 MLB Season — New York Yankees", clues:["Began his career as a pitcher for the Boston Red Sox before being converted to outfield","Adopted an 8-year-old child named Dorothy as a young adult — a little-known personal fact","Was known for calling his shot in the 1932 World Series — pointing to center field before hitting a homer","Nickname: Sultan of Swat"] },
  { player:"Barry Bonds", sport:"⚾ MLB", answer:"BONDS", era:"modern", stats:{HR:"73",AVG:".328",RBI:"137",OBP:".515"}, ctx:"2001 MLB Season — San Francisco Giants", clues:["Won 7 MVP awards — the most of any player in baseball history","Was intentionally walked 232 times in one season — teams preferred to put him on base than let him hit","His godfather was Willie Mays — one of the greatest outfielders who ever played","His godfather was Willie Mays"] },
  { player:"Derek Jeter", sport:"⚾ MLB", answer:"JETER", era:"modern", stats:{AVG:".309",HR:"9",RBI:"75",H:"184"}, ctx:"2000 World Series MVP Season — Yankees", clues:["Also won 4 Gold Gloves at his position","Nicknamed The Captain","Played entire career for Yankees","Made The Flip Play in 2001"] },
  { player:"Hank Aaron", sport:"⚾ MLB", answer:"AARON", era:"legends", stats:{HR:"40",AVG:".328",RBI:"130",SLG:".600"}, ctx:"1963 MLB Season — Milwaukee Braves", clues:["Was one of the most feared hitters in the NL for over a decade with the Atlanta Braves","All-time HR record holder for decades","The Braves won 14 consecutive division titles — one of the most sustained runs in sport","Received death threats as he approached Babe Ruth's home run record in 1974"] },
  { player:"Ken Griffey Jr.", sport:"⚾ MLB", answer:"GRIFFEY", era:"classic", stats:{HR:"56",AVG:".303",RBI:"147",SLG:".628"}, ctx:"1997 MLB Season — Seattle Mariners", clues:["Won AL MVP this season","Hit 56 home runs","The Mariners won a record 116 games in 2001 but have never appeared in a World Series","Wore number 24, famous for his backward cap"] },
  { player:"Lionel Messi", sport:"⚽ Soccer", answer:"MESSI", era:"modern", stats:{G:"91",AST:"13",APP:"69",MIN:"5765"}, ctx:"2012 Calendar Year — FC Barcelona World Record", clues:["Record for most goals in a calendar year","Won the Ballon d'Or that year","Barcelona is owned by its members — a cooperative with over 150000 supporter-owners","From Argentina"] },
  { player:"Cristiano Ronaldo", sport:"⚽ Soccer", answer:"RONALDO", era:"modern", stats:{G:"50",AST:"15",APP:"55",MIN:"4743"}, ctx:"2011-12 La Liga Season — Real Madrid", clues:["Scored 50 La Liga goals in one season","Won La Liga that season","Real Madrid have won the most UEFA Champions League titles of any club in history","From Portugal"] },
  { player:"Pele", sport:"⚽ Soccer", answer:"PELE", era:"classic", stats:{G:"4",AST:"4",APP:"6",MIN:"540"}, ctx:"1970 FIFA World Cup — Brazil", clues:["Won his third World Cup with Brazil","Scored 4 goals and 4 assists in the tournament","Brazilian forward who played from the 1950s-70s","His real name is Edson Arantes do Nascimento"] },
  { player:"Roger Federer", sport:"🎾 ATP", answer:"FEDERER", era:"modern", stats:{W:"81",L:"4",TITLES:"8",GRAND_SLAMS:"3"}, ctx:"2005 ATP Season", clues:["Was stabbed on court by a deranged fan of Steffi Graf in 1993 — an attack that derailed what could have been an all-time great career","Won Wimbledon this year","His rivalry with Rafael Nadal is considered the greatest in tennis history","Ended year ranked World No. 1"] },
  { player:"Serena Williams", sport:"🎾 WTA", answer:"SERENA", era:"modern", stats:{W:"78",L:"4",TITLES:"11",GRAND_SLAMS:"3"}, ctx:"2013 WTA Season — World No. 1", clues:["Won 3 Grand Slams including Wimbledon","Finished ranked World No. 1","From the United States","Sister Venus also plays professionally"] },
  { player:"Rafael Nadal", sport:"🎾 ATP", answer:"NADAL", era:"modern", stats:{W:"82",L:"3",TITLES:"8",GRAND_SLAMS:"1"}, ctx:"2010 ATP Season — Completed the Career Golden Slam", clues:["Won the French Open this year","Also won Wimbledon, US Open, and Australian Open","Has won the French Open more times than any player has won any Grand Slam","Has a stadium named after him in New York where the US Open is played"] },
  { player:"Tiger Woods", sport:"⛳ Golf", answer:"TIGER", era:"modern", stats:{WINS:"9",MAJORS:"3",AVG:"68.56",CUTS:"20/20"}, ctx:"2000 PGA Tour — Won 3 of 4 majors, made every cut", clues:["Won 3 of 4 majors this year","Made every single cut","Won US Open by 15 strokes","His last name is a large cat"] },
  { player:"Jack Nicklaus", sport:"⛳ Golf", answer:"NICKLAUS", era:"classic", stats:{W:"17",MAJORS:"2",AVG:"70.2",EARN:"$286K"}, ctx:"1972 PGA Tour Season — Two majors", clues:["Won The Masters and US Open this year","Known as The Golden Bear","Holds the record for most major championships (18)","Was the first player to complete the Career Grand Slam twice"] },
  { player:"Sidney Crosby", sport:"🏒 NHL", answer:"CROSBY", era:"modern", stats:{G:"36",AST:"72",PTS:"108",PIM:"34"}, ctx:"2017 Stanley Cup Finals MVP — Pittsburgh Penguins", clues:["Won second consecutive Stanley Cup MVP","The Penguins won back-to-back Cups in 2016 and 2017 behind Crosby and Malkin","From Cole Harbour, Nova Scotia, Canada","Nicknamed Sid the Kid"] },
  { player:"Mia Hamm", sport:"⚽ Soccer", answer:"HAMM", era:"classic", stats:{G:"9",AST:"4",APP:"6",MIN:"540"}, ctx:"1999 FIFA Women's World Cup — USA Champions", clues:["Won the Women's World Cup with USA","USA beat China in the famous penalty shootout final","Two-time FIFA World Cup champion and two-time Olympic gold medalist","Her penalty kick in the final was saved but USA still won"] },
  { player:"Steffi Graf", sport:"🎾 WTA", answer:"GRAF", era:"classic", stats:{W:"96",L:"2",GRAND_SLAMS:"4",TITLES:"11"}, ctx:"1988 WTA Season — Golden Slam", clues:["Won all 4 Grand Slams AND Olympic gold in one year","Only player to ever achieve a Golden Slam","From West Germany","Married to Andre Agassi"] },
  { player:"Pete Sampras", sport:"🎾 ATP", answer:"SAMPRAS", era:"classic", stats:{W:"82",L:"9",GRAND_SLAMS:"2",TITLES:"6"}, ctx:"1994 ATP Season — World No. 1", clues:["Won 2 Grand Slams this year including Wimbledon","Ended year ranked World No. 1","Won 14 Grand Slams total in his career","American player nicknamed Pistol Pete"] },
  { player:"Alex Ovechkin", sport:"🏒 NHL", answer:"OVECHKIN", era:"modern", stats:{G:"65",AST:"47",PTS:"112",PIM:"50"}, ctx:"2007-08 NHL Season — Hart Trophy MVP", clues:["Scored 65 goals — one of the highest totals in NHL history","Scored 65 goals — one of the highest totals ever","From Moscow Russia — was the first Russian player to be drafted first overall","From Moscow, Russia"] },
  // Basketball - Modern
  { player:"Nikola Jokic", sport:"🏀 NBA", answer:"JOKIC", era:"modern", stats:{PTS:"26.4",REB:"11.0",AST:"9.0",MVP:"3x"}, ctx:"2021-22 NBA Season — Denver Nuggets MVP", clues:["Won his second consecutive MVP award","Playing at altitude in Denver gives the Nuggets a natural home court advantage","Serbian center nicknamed The Joker","Drafted 41st overall in 2014"] },
  { player:"Joel Embiid", sport:"🏀 NBA", answer:"EMBIID", era:"modern", stats:{PTS:"33.1",REB:"10.2",AST:"4.2",BLK:"1.7"}, ctx:"2022-23 NBA Season — Philadelphia 76ers MVP", clues:["Won his first MVP award this season","Led the NBA in scoring","The 76ers embraced The Process — one of the most deliberate rebuilds in sports history","From Cameroon, nicknamed The Process"] },
  { player:"Luka Doncic", sport:"🏀 NBA", answer:"LUKA", era:"modern", stats:{PTS:"33.9",REB:"9.2",AST:"9.8","3PM":"4.3"}, ctx:"2023-24 NBA Season — Dallas Mavericks", clues:["Led the NBA in scoring this season","Was the centerpiece of a franchise owned by eccentric tech billionaire Mark Cuban","From Ljubljana, Slovenia","Was the EuroLeague MVP at age 19"] },
  // Basketball - Classic
  { player:"Scottie Pippen", sport:"🏀 NBA", answer:"PIPPEN", era:"classic", stats:{PTS:"22.0",REB:"8.7",AST:"5.9",STL:"2.9"}, ctx:"1994 NBA Playoffs — Chicago Bulls (Jordan retired)", clues:["Led the Bulls without Michael Jordan","Finished 5th in MVP voting this year","Won 6 championships with Jordan","Often called the most underrated player ever"] },
  { player:"Dennis Rodman", sport:"🏀 NBA", answer:"RODMAN", era:"classic", stats:{REB:"18.7",PTS:"5.8",STL:"0.8",BLK:"0.5"}, ctx:"1991-92 NBA Season — Detroit Pistons rebounding title", clues:["Led the NBA in rebounding for the 2nd consecutive year","The Bad Boys Pistons were notorious for their physical and intimidating style of play","Won 7 consecutive rebounding titles","Known as The Worm"] },
  { player:"Patrick Ewing", sport:"🏀 NBA", answer:"EWING", era:"classic", stats:{PTS:"28.6",REB:"11.2",BLK:"3.0",AST:"2.4"}, ctx:"1989-90 NBA Season — New York Knicks", clues:["Led the Knicks to the best record in the East","Finished 3rd in MVP voting","The Knicks play at Madison Square Garden — often called the most famous arena in the world","Jamaican-born center from Georgetown"] },
  { player:"Heath Miller", sport:"🏈 NFL", answer:"HEATH MILLER", era:"modern", stats:{REC:"592",YDS:"6569",RINGS:"2",TEAM:"Steelers"}, ctx:"Career Totals — Reliable tight end and two-time Super Bowl champion with Pittsburgh", clues:["Was one of the most reliable and underrated tight ends of his era with Pittsburgh","Won two Super Bowl rings with the Steelers in Super Bowls XL and XLIII","Was never a star statistically but considered one of the best blocking tight ends in football","From Richlands Virginia — played at Virginia before being drafted in the first round in 2005"] },
  { player:"Josh Allen", sport:"🏈 NFL", answer:"ALLEN", era:"modern", stats:{YDS:"4407",TD:"37",INT:"10",RUSH:"763"}, ctx:"2020 NFL Season — Buffalo Bills", clues:["Led Buffalo Bills to their best season in decades","Finished 2nd in MVP voting","Known for his cannon arm and rushing ability","From Firebaugh, California"] },
  { player:"Lamar Jackson", sport:"🏈 NFL", answer:"LAMAR", era:"modern", stats:{YDS:"3127",TD:"36",INT:"6",RUSH:"1206"}, ctx:"2019 NFL Season — Baltimore Ravens MVP", clues:["Won unanimous MVP award this season","Won the NFL MVP award unanimously in 2019 — the first unanimous MVP since Cam Newton","The Ravens were founded in 1996 and named after Edgar Allan Poe's famous poem","First player to throw 36 TDs and rush for 1000 yards"] },
  { player:"Travis Kelce", sport:"🏈 NFL", answer:"KELCE", era:"modern", stats:{REC:"1338",YDS:"12030",TD:"92",SB:"4"}, ctx:"Career through 2024 — All-time NFL leader in receiving yards by a tight end", clues:["Has 11 consecutive 1000-yard receiving seasons — an NFL record for a tight end","Won 4 Super Bowls with the Kansas City Chiefs","Has 11 consecutive 1,000-yard receiving seasons — the most ever by any player","Was named to 9 Pro Bowls in his career"] },
  { player:"Bijan Robinson", sport:"🏈 NFL", answer:"BIJAN", era:"modern", stats:{YDS:"1070",TD:"7",REC:"67",ROUND:"1"}, ctx:"2024 NFL Season — Atlanta Falcons breakout", clues:["Was the first running back drafted in the top 8 picks in over a decade","Ran for over 1000 yards in his first NFL season","From Tucson Arizona — won the Doak Walker Award as the nation's best running back at Texas","Was a Heisman Trophy finalist at the University of Texas"] },
  { player:"Calvin Johnson", sport:"🏈 NFL", answer:"MEGATRON", era:"modern", stats:{REC:"122",YDS:"1964",TD:"5",YPR:"16.1"}, ctx:"2012 NFL Season — Detroit Lions receiving record", clues:["Set the single-season receiving yards record (1964)","The Lions have never appeared in a Super Bowl — the longest such drought in the NFL","Nicknamed Megatron for his size and athleticism","6ft 5in wide receiver who was nearly unstoppable"] },
  // Football - Classic
  { player:"Brett Favre", sport:"🏈 NFL", answer:"FAVRE", era:"classic", stats:{YDS:"4413",TD:"38",INT:"13",RTG:"99.5"}, ctx:"1996 NFL Season — Green Bay Packers MVP", clues:["Won his second consecutive MVP award","Led Green Bay Packers to a Super Bowl win","Known for his gunslinger style","Started 297 consecutive games — an NFL record"] },
  { player:"Steve Young", sport:"🏈 NFL", answer:"YOUNG", era:"classic", stats:{YDS:"325",TD:"6",INT:"0",RTG:"134.8"}, ctx:"Super Bowl XXIX MVP — San Francisco 49ers", clues:["Set the Super Bowl record for TD passes (6) in one game","Won Super Bowl MVP with San Francisco 49ers","Had been in Joe Montana's shadow for years","Great-great-great-grandson of Brigham Young"] },
  // Baseball - Modern
  { player:"Jose Altuve", sport:"⚾ MLB", answer:"ALTUVE", era:"modern", stats:{AVG:".309",HR:"174",SB:"165",GRAND_SLAMS:"7"}, ctx:"Career highlights — Houston Astros franchise cornerstone", clues:["Has been an All-Star 7 times in his career","Is one of the shortest players in MLB history at 5ft 6in","Led the Astros to multiple World Series titles","Hit over .300 for 7 consecutive seasons"] },
  { player:"Yordan Alvarez", sport:"⚾ MLB", answer:"ALVAREZ", era:"modern", stats:{HR:"37",AVG:".306",RBI:"97",OPS:"1.019"}, ctx:"2022 ALCS MVP — Houston Astros", clues:["Won the ALCS MVP leading to the World Series","The Astros rebuilt from one of the worst teams in history to become a dynasty","From Las Tunas, Cuba","One of the most feared hitters in baseball"] },
  { player:"Albert Pujols", sport:"⚾ MLB", answer:"PUJOLS", era:"modern", stats:{HR:"700",AVG:".288",RBI:"2218",GRAND_SLAMS:"3"}, ctx:"Career totals — One of 4 players in MLB history with 700+ home runs", clues:["From the Dominican Republic — began playing baseball with a milk carton glove and rolled-up socks","Won 3 NL MVP awards in his career","Hit over .300 in each of his first 10 seasons","Won 2 World Series championships in his career"] },
  { player:"Mike Trout", sport:"⚾ MLB", answer:"TROUT", era:"modern", stats:{HR:"370",AVG:".301",OBP:".414",MVP:"3"}, ctx:"Career through 2024 — Los Angeles Angels", clues:["Has won 3 AL MVP awards despite never making the playoffs","Signed the largest contract in MLB history ($426.5M) in 2019","Led the AL in WAR more times than any other player this century","Hit 45 home runs and stole 30 bases in the same season at age 21"] },
  { player:"Shohei Ohtani", sport:"⚾ MLB", answer:"OHTANI", era:"modern", stats:{HR:"171",ERA:"2.91",SB:"50",MVP:"2"}, ctx:"Career through 2024 — The two-way phenomenon", clues:["Has won 2 AL MVP awards as both a pitcher AND hitter","Hit 50 home runs and stole 50 bases in the same season in 2023","First player since Babe Ruth to be an elite starter AND elite hitter in the same season","Won AL MVP in 2021 with 46 HRs and a 3.18 ERA — the first unanimous two-way MVP"] },
  { player:"Ronald Acuna Jr.", sport:"⚾ MLB", answer:"ACUNA", era:"modern", stats:{HR:"41",SB:"73",AVG:".337",AGE:"25"}, ctx:"2023 NL MVP Season — Historic 40-70 club", clues:["First player in MLB history to hit 40 HRs and steal 70 bases in one season","Won the NL MVP award unanimously","Became the first player in MLB history to record a 40 HR and 60 SB season","Was named to 5 All-Star teams before age 26"] },
  { player:"Mookie Betts", sport:"⚾ MLB", answer:"MOOKIE", era:"modern", stats:{HR:"220",AVG:".296",SB:"140",GG:"6"}, ctx:"Career highlights — Five-tool superstar", clues:["Won 6 Gold Gloves as one of the best defensive outfielders ever","Won both the AL MVP and a World Series in the same year (2018)","Has hit over 200 home runs and stolen over 100 bases in his career","One of fewer than 10 players in MLB history to hit 20 HR and steal 20 bases in 5 different seasons"] },
  { player:"Freddie Freeman", sport:"⚾ MLB", answer:"FREEMAN", era:"modern", stats:{AVG:".302",HR:"252",RBI:"1114",WS:"2"}, ctx:"Career highlights — Two-franchise cornerstone", clues:["Won World Series championships with both Atlanta and Los Angeles","Won the NL MVP award in 2020","Hit over .300 with 30+ HRs in 6 different seasons","Was a 6-time All-Star and won a Gold Glove at first base"] },
  { player:"Juan Soto", sport:"⚾ MLB", answer:"SOTO", era:"modern", stats:{AVG:".314",HR:"34",RBI:"109",OBP:".465"}, ctx:"2021 MLB Season — Washington Nationals", clues:["Was traded from Washington to the New York Yankees before the 2023 season for a blockbuster package","From Santo Domingo Dominican Republic — signed his first MLB contract at age 17","From Santo Domingo, Dominican Republic","Reached base at a .465 clip in 2020 — the highest OBP by anyone under 22 in baseball history"] },
  { player:"Ichiro Suzuki", sport:"⚾ MLB", answer:"ICHIRO", era:"modern", stats:{H:"262",AVG:".372",SB:"36",RBI:"69"}, ctx:"2004 MLB Season — Seattle Mariners, all-time hits record", clues:["Routinely beat out infield grounders that most players would not run out","Won both MVP and Gold Glove awards this year","The Mariners won a record 116 games in 2001 but have never appeared in a World Series","From Toyoyama, Japan — first Japanese position player in MLB"] },
  // Baseball - Classic
  { player:"Roger Clemens", sport:"⚾ MLB", answer:"CLEMENS", era:"classic", stats:{ERA:"1.93",W:"21",SO:"291",WHIP:"0.970"}, ctx:"1997 AL Cy Young Season — Toronto Blue Jays", clues:["Signed with Toronto as a free agent before this season","Struck out 291 batters","Was nicknamed Rocket and had one of the fastest fastballs in baseball history","Known as one of the most intimidating pitchers ever"] },
  { player:"Frank Thomas", sport:"⚾ MLB", answer:"THOMAS", era:"classic", stats:{HR:"41",AVG:".323",RBI:"128",OBP:".426"}, ctx:"1994 AL MVP Season — Chicago White Sox", clues:["Won his second consecutive AL MVP","The White Sox were at the center of the 1919 Black Sox scandal — the greatest fix in baseball history","Nicknamed The Big Hurt","6ft 5in first baseman with elite plate discipline"] },
  { player:"Jeff Bagwell", sport:"⚾ MLB", answer:"BAGWELL", era:"classic", stats:{HR:"39",AVG:".368",RBI:"116",OPS:"1.201"}, ctx:"1994 NL MVP Season — Houston Astros", clues:["Won the NL MVP in the strike-shortened season","Had an OPS over 1.200","The Astros rebuilt from one of the worst teams in history to become a dynasty","Known for his unusual wide batting stance"] },
  { player:"Tony Gwynn", sport:"⚾ MLB", answer:"GWYNN", era:"classic", stats:{AVG:".394",HR:"12",H:"165",SO:"19"}, ctx:"1994 MLB Season — San Diego Padres", clues:["Had 3141 career hits — the most by any left-handed hitter in NL history","Struck out only 19 times all season","The Padres have reached the World Series twice but have never won it","His T206 baseball card is the most valuable in history"] },
  { player:"Nolan Ryan", sport:"⚾ MLB", answer:"RYAN", era:"classic", stats:{ERA:"3.20",SO:"301",W:"16",NH:"1"}, ctx:"1990 MLB Season — Texas Rangers", clues:["Threw his 6th career no-hitter at age 43","Still threw over 95 mph at 43 years old","The Rangers reached consecutive World Series in 2010 and 2011 but lost both times","All-time strikeout leader with 5714 Ks"] },
  // Soccer - Modern
  { player:"Kylian Mbappe", sport:"⚽ Soccer", answer:"MBAPPE", era:"modern", stats:{G:"8",AST:"3",APP:"6",MIN:"480"}, ctx:"2018 FIFA World Cup — France", clues:["Became only the second teenager ever to score in a World Cup Final (after Pele in 1958)","Won the World Cup at just 19 years old","Scored 8 goals in his first 2 World Cups combined","Moved to Real Madrid in 2024 after breaking the all-time PSG scoring record"] },
  { player:"Luis Suarez", sport:"⚽ Soccer", answer:"SUAREZ", era:"modern", stats:{G:"31",AST:"16",APP:"33",MIN:"2818"}, ctx:"2013-14 Premier League Season — Liverpool", clues:["Won the PFA Players Player of the Year","Finished 2nd in Ballon d'Or voting","Liverpool have won 6 European Cups — more than any other English club","Uruguayan striker known for his controversy and brilliance"] },
  { player:"Harry Kane", sport:"⚽ Soccer", answer:"KANE", era:"modern", stats:{G:"30",AST:"3",APP:"37",MIN:"3102"}, ctx:"2017-18 Premier League Season — Tottenham Hotspur", clues:["Won the Premier League Golden Boot with 30 goals","Spurs won back-to-back league titles in 1961 becoming the first club in the 20th century to win the Double","All-time England international top scorer","Now plays for Bayern Munich"] },
  // Soccer - Classic
  { player:"Michel Platini", sport:"⚽ Soccer", answer:"PLATINI", era:"classic", stats:{G:"9",AST:"4",APP:"5",MIN:"450"}, ctx:"UEFA Euro 1984 — France", clues:["Scored 9 goals in 5 games — tournament record","Won the tournament with France","Won 3 consecutive Ballon d'Or awards","French midfielder who later became UEFA president"] },
  { player:"Marco van Basten", sport:"⚽ Soccer", answer:"VAN BASTEN", era:"classic", stats:{G:"5",AST:"2",APP:"5",MIN:"423"}, ctx:"UEFA Euro 1988 — Netherlands", clues:["Scored a volley from outside the box in the Euro 1988 final","Won the tournament with Netherlands","Won 3 Ballon d'Or awards","His career ended early due to ankle injuries"] },
  { player:"Johan Cruyff", sport:"⚽ Soccer", answer:"CRUYFF", era:"classic", stats:{G:"14",AST:"8",APP:"14",MIN:"1186"}, ctx:"1973-74 Season — Ajax and Netherlands", clues:["Won the Ballon d'Or for the third time this year","Led Netherlands to the World Cup Final","Won three consecutive European Cups with Ajax and was the architect of Total Football","Dutch Total Football pioneer"] },
  // Tennis - Modern
  { player:"Jannik Sinner", sport:"🎾 ATP", answer:"SINNER", era:"modern", stats:{W:"73",L:"6",TITLES:"7",GRAND_SLAMS:"1"}, ctx:"2024 ATP Season — Australian Open champion", clues:["Won his first Grand Slam at the Australian Open","Ended the year ranked World No. 1","From San Candido, Italy","First Italian man to win a Grand Slam"] },
  { player:"Carlos Alcaraz", sport:"🎾 ATP", answer:"ALCARAZ", era:"modern", stats:{W:"57",L:"11",TITLES:"6",GRAND_SLAMS:"2"}, ctx:"2023 ATP Season — Wimbledon and US Open", clues:["Won Wimbledon and US Open this year","Became World No. 1 at age 19","From El Palmar, Spain","Trained under Juan Carlos Ferrero"] },
  { player:"Daniil Medvedev", sport:"🎾 ATP", answer:"MEDVEDEV", era:"modern", stats:{W:"65",L:"17",TITLES:"5",GRAND_SLAMS:"1"}, ctx:"2021 US Open — First Grand Slam title", clues:["Won his first Grand Slam at the US Open","Reached World No. 1 ranking","From Moscow, Russia","Defeated Djokovic in the final"] },
  { player:"Andy Murray", sport:"🎾 ATP", answer:"MURRAY", era:"modern", stats:{W:"81",L:"15",TITLES:"8",GS:"0"}, ctx:"2015 ATP Season — World No. 1", clues:["Won Wimbledon and US Open in his career","Reached World No. 1 this year","From Dunblane, Scotland","First British man to win Wimbledon since 1936"] },
  { player:"Ashleigh Barty", sport:"🎾 WTA", answer:"BARTY", era:"modern", stats:{W:"83",L:"11",TITLES:"12",GRAND_SLAMS:"3"}, ctx:"2021 WTA Season — Wimbledon champion", clues:["Won Wimbledon this year while ranked World No. 1","Won 3 Grand Slams in total","Retired at age 25 at the peak of her powers","From Ipswich, Queensland, Australia"] },
  { player:"Iga Swiatek", sport:"🎾 WTA", answer:"SWIATEK", era:"modern", stats:{W:"74",L:"8",TITLES:"8",GRAND_SLAMS:"2"}, ctx:"2022 WTA Season — World No. 1 dominant year", clues:["Won 2 Grand Slams this year including the French Open","Was one of the most accomplished players of their generation","From Warsaw, Poland","Known as the Queen of Clay"] },
  { player:"Naomi Osaka", sport:"🎾 WTA", answer:"OSAKA", era:"modern", stats:{W:"55",L:"12",TITLES:"4",GRAND_SLAMS:"1"}, ctx:"2020 US Open — Second Grand Slam title", clues:["Won the US Open wearing masks honoring Black victims","Ranked World No. 1 after this win","Japanese-American player","Won 4 Grand Slams before age 24"] },
  // Tennis - Classic
  { player:"Boris Becker", sport:"🎾 ATP", answer:"BECKER", era:"classic", stats:{W:"82",L:"9",TITLES:"10",GRAND_SLAMS:"1"}, ctx:"1986 ATP Season — Three Grand Slam finals", clues:["Won Wimbledon for the second consecutive year","Won Wimbledon as the youngest champion in the Open Era at age 17","German player nicknamed Boom Boom","Was the youngest Wimbledon champion at 17"] },
  { player:"Jim Courier", sport:"🎾 ATP", answer:"COURIER", era:"classic", stats:{W:"73",L:"15",TITLES:"6",GRAND_SLAMS:"2"}, ctx:"1992 ATP Season — Two Grand Slams", clues:["Won the Australian and French Open this year","Ranked World No. 1","American player known for his aggressive baseline game","Beat Andre Agassi in the French Open final"] },
  { player:"Rory McIlroy", sport:"⛳ Golf", answer:"MCILROY", era:"modern", stats:{WINS:"5",MAJORS:"2",AVG:"68.83",EARN:"$8.3M"}, ctx:"2014 PGA Tour Season — Two majors", clues:["Won The Open Championship and PGA Championship this year","Won the FedEx Cup this year","From Holywood, County Down, Northern Ireland","Won 4 majors before age 26"] },
  { player:"Greg Norman", sport:"⛳ Golf", answer:"NORMAN", era:"classic", stats:{WINS:"3",MAJORS:"1",AVG:"69.10",YEAR:"1993"}, ctx:"1993 PGA Tour Season — British Open", clues:["Won The Open Championship this year by 2 shots","Was one of the most accomplished players of their generation","From Mount Isa, Queensland, Australia","Nicknamed The Great White Shark"] },
  { player:"Seve Ballesteros", sport:"⛳ Golf", answer:"SEVE", era:"classic", stats:{WINS:"4",MAJORS:"1",AVG:"70.20",YEAR:"1984"}, ctx:"1984 PGA Tour — British Open at St Andrews", clues:["Won The Open Championship at the home of golf","Won 5 major championships in his career","From Pedrena, Spain","Pioneered European golf as a global force"] },
  { player:"Lee Trevino", sport:"⛳ Golf", answer:"TREVINO", era:"classic", stats:{WINS:"4",MAJORS:"2",EARN:"$3.2M",YEAR:"1971"}, ctx:"1971 PGA Tour Season — Three Opens in three weeks", clues:["Won the US Open, Canadian Open, and British Open in the same month","Won 6 major championships in total","From Dallas, Texas","Nicknamed Super Mex"] },
  // Hockey - Modern
  { player:"Connor McDavid", sport:"🏒 NHL", answer:"MCDAVID", era:"modern", stats:{G:"44",AST:"79",PTS:"123",PIM:"44"}, ctx:"2021-22 NHL Season — Edmonton Oilers MVP", clues:["Won five consecutive Stanley Cups with the Montreal Canadiens and was known for his flowing blond hair and his goal-scoring instincts","Led the NHL in scoring","Was part of an Oilers dynasty that won four Stanley Cups in five years in the 1980s","Considered the best player in the world"] },
  { player:"Nathan MacKinnon", sport:"🏒 NHL", answer:"MACKINNON", era:"modern", stats:{G:"42",AST:"67",PTS:"109",PIM:"44"}, ctx:"2022-23 NHL Season — Colorado Avalanche MVP", clues:["Won the Hart Trophy as league MVP","The Avalanche relocated from Quebec City and won the Cup in their very first season in Colorado","From Cole Harbour, Nova Scotia — same hometown as Crosby","Won the Stanley Cup in 2022"] },
  { player:"Erik Karlsson", sport:"🏒 NHL", answer:"KARLSSON", era:"modern", stats:{G:"25",AST:"75",PTS:"100","PM":"-1"}, ctx:"2022-23 NHL Season — San Jose Sharks", clues:["Became the first defenseman to score 100 points since Brian Leetch","The Sharks were perennial playoff contenders for two decades but never won the Stanley Cup","Swedish defenseman nicknamed EK65","Won 2 Norris Trophies as best defenseman"] },
  { player:"Nikita Kucherov", sport:"🏒 NHL", answer:"KUCHEROV", era:"modern", stats:{G:"41",AST:"87",PTS:"128",PIM:"30"}, ctx:"2018-19 NHL Season — Tampa Bay Lightning MVP", clues:["Won the Hart Trophy and Art Ross Trophy","Set a Lightning franchise points record","The Lightning won back-to-back Cups in 2020 and 2021 with one of the sport's best rosters","Russian winger from Maykop"] },
  { player:"Jonathan Toews", sport:"🏒 NHL", answer:"TOEWS", era:"modern", stats:{G:"28",AST:"31",PTS:"59",PIM:"29"}, ctx:"2010 Stanley Cup Finals MVP — Chicago Blackhawks", clues:["Won the Conn Smythe as playoff MVP","The Blackhawks won 3 Cups in 6 years forming the most recent NHL dynasty","Won 3 Stanley Cups as captain","From Winnipeg, Manitoba — nicknamed Captain Serious"] },
  // Hockey - Classic
  { player:"Paul Coffey", sport:"🏒 NHL", answer:"COFFEY", era:"classic", stats:{G:"48",AST:"90",PTS:"138","PM":"+12"}, ctx:"1985-86 NHL Season — Edmonton Oilers", clues:["Set the record for goals by a defenseman (48)","The Oilers dynasty had Gretzky Messier Coffey and Fuhr — arguably the greatest team ever","Won 4 Stanley Cups in his career","Scored 48 goals in a season — the record for a defenseman"] },
  { player:"Ray Bourque", sport:"🏒 NHL", answer:"BOURQUE", era:"classic", stats:{G:"21",AST:"73",PTS:"94","PM":"+19"}, ctx:"1993-94 NHL Season — Boston Bruins", clues:["Won his 5th Norris Trophy as best defenseman","The Bruins have the second most Stanley Cup championships in NHL history","Finally won the Stanley Cup in his last season","Won 5 Norris Trophies total"] },
  { player:"Teemu Selanne", sport:"🏒 NHL", answer:"SELANNE", era:"classic", stats:{G:"76",AST:"56",PTS:"132",PIM:"45"}, ctx:"1992-93 NHL Season — Winnipeg Jets Rookie record", clues:["Set the rookie scoring record with 76 goals","Shattered the previous rookie record by 23 goals","The Jets brought NHL hockey back to Winnipeg in 2011 after the original Jets moved to Phoenix","Finnish Winger nicknamed The Finnish Flash"] },
  { player:"Jaylen Brown", sport:"🏀 NBA", answer:"JAYLEN", era:"modern", stats:{PTS:"26.6",REB:"6.9",AST:"3.5",FG:"49.5"}, ctx:"2023-24 NBA Season — Boston Celtics Finals MVP", clues:["His team defeated the Milwaukee Bucks in 6 games","Led Boston to the championship over the Dallas Mavericks","From Marietta, Georgia — played at Cal Berkeley","3rd overall pick in the 2016 NBA Draft"] },
  { player:"Chris Paul", sport:"🏀 NBA", answer:"CP3", era:"modern", stats:{PTS:"18.6",AST:"10.8",STL:"2.1",REB:"4.5"}, ctx:"2014-15 NBA Season — Los Angeles Clippers", clues:["Led the Clippers to a 56-win season","Won Clutch Player of the Year this season","Nicknamed CP3","All-time leader in steals in NBA history"] },
  { player:"Kevin Garnett", sport:"🏀 NBA", answer:"GARNETT", era:"modern", stats:{PTS:"22.4",REB:"13.9",AST:"5.0",BLK:"2.2"}, ctx:"2003-04 NBA Season — Minnesota Timberwolves MVP", clues:["Won the NBA MVP award this season","Led Minnesota to 58 wins — their best ever","Transformed a struggling franchise into a powerhouse through sheer will and defensive intensity","Nicknamed The Big Ticket"] },
  { player:"Dirk Nowitzki", sport:"🏀 NBA", answer:"DIRK", era:"modern", stats:{PTS:"27.7",REB:"8.6",AST:"2.8",FG:"50.2"}, ctx:"2006-07 NBA Season — Dallas Mavericks MVP", clues:["Won his only NBA MVP award this season","Was the centerpiece of a franchise owned by eccentric tech billionaire Mark Cuban","First European player to win NBA MVP","Had a famous one-legged fadeaway jumper"] },
  { player:"Allen Iverson", sport:"🏀 NBA", answer:"AI", era:"modern", stats:{PTS:"31.4",REB:"4.5",AST:"5.1",STL:"2.4"}, ctx:"2001 NBA Season — Philadelphia 76ers scoring MVP", clues:["Won the scoring title and MVP award","Led the Philadelphia 76ers to the Finals","Known as The Answer","Was 6 feet tall — one of the smallest MVPs ever"] },
  { player:"Carmelo Anthony", sport:"🏀 NBA", answer:"MELO", era:"modern", stats:{PTS:"28.7",REB:"8.8",AST:"3.3",FG:"47.0"}, ctx:"2012-13 NBA Season — New York Knicks scoring title", clues:["Is the only player in NBA history to score 50 or more points in a game for multiple franchises","From Baltimore Maryland — won a gold medal with Team USA at three different Olympics","Nicknamed Melo","Won Olympic gold with USA three times"] },
  { player:"Blake Griffin", sport:"🏀 NBA", answer:"GRIFFIN", era:"modern", stats:{PTS:"22.6",REB:"8.9",AST:"3.9",FG:"52.4"}, ctx:"2011-12 NBA Season — LA Clippers All-Star", clues:["Won the 2011 Slam Dunk Contest jumping over a car","From Oklahoma City Oklahoma — won Rookie of the Year and was a six-time All-Star","From Oklahoma City, Oklahoma","Won Rookie of the Year in 2011"] },
  { player:"Kyrie Irving", sport:"🏀 NBA", answer:"KYRIE", era:"modern", stats:{PTS:"25.2",REB:"3.2",AST:"5.8",FG:"47.0"}, ctx:"2016 NBA Finals — Cleveland Cavaliers", clues:["Hit the go-ahead three-pointer with 53 seconds left in Game 7","Won the championship with Cleveland Cavaliers","From Melbourne, Australia","Was the #1 overall pick in 2011"] },
  { player:"Russell Westbrook", sport:"🏀 NBA", answer:"WESTBROOK", era:"modern", stats:{PTS:"31.6",REB:"10.7",AST:"10.4",STL:"1.6"}, ctx:"2016-17 NBA Season — Oklahoma City Thunder MVP", clues:["Averaged a triple-double for the entire season","Won the NBA MVP award","Was the first player in NBA history to average a triple-double for an entire season","Broke Oscar Robertson's single-season triple-double record"] },
  { player:"John Stockton", sport:"🏀 NBA", answer:"STOCKTON", era:"classic", stats:{PTS:"13.1",AST:"14.5",STL:"3.2",REB:"2.8"}, ctx:"1987-88 NBA Season — Utah Jazz assists record", clues:["Set the single-season assists record this year","Was also the league leader in steals","The Jazz kept their New Orleans jazz-themed name even after relocating to Utah","All-time NBA leader in assists and steals"] },
  { player:"Karl Malone", sport:"🏀 NBA", answer:"MALONE", era:"classic", stats:{PTS:"27.7",REB:"10.5",AST:"4.5",FG:"54.6"}, ctx:"1996-97 NBA Season — Utah Jazz MVP", clues:["Won the NBA MVP award this season","The Jazz kept their New Orleans jazz-themed name even after relocating to Utah","Nicknamed The Mailman","Second all-time NBA scoring leader"] },
  { player:"David Robinson", sport:"🏀 NBA", answer:"ROBINSON", era:"classic", stats:{PTS:"29.8",REB:"10.7",BLK:"4.5",STL:"1.7"}, ctx:"1993-94 NBA Season — San Antonio Spurs MVP", clues:["Won the NBA MVP award and scoring title","The Spurs won 5 championships under Gregg Popovich — the greatest coaching run in NBA history","Nicknamed The Admiral — served in the US Navy","Later paired with Tim Duncan for back-to-back championships"] },
  { player:"Moses Malone", sport:"🏀 NBA", answer:"MOSES", era:"classic", stats:{PTS:"24.5",REB:"17.0",AST:"1.8",FG:"50.1"}, ctx:"1982-83 NBA Season — Philadelphia 76ers MVP", clues:["Predicted Fo Fo Fo in the playoffs — nearly delivered","Famously predicted Fo Fo Fo in the playoffs","The 76ers embraced The Process — one of the most deliberate rebuilds in sports history","3x NBA MVP in his career"] },
  { player:"Bill Russell", sport:"🏀 NBA", answer:"RUSSELL", era:"legends", stats:{REB:"22.9",PTS:"14.1",BLK:"8.0",TITLES:"5"}, ctx:"1961-62 NBA Season — Boston Celtics dynasty peak", clues:["Won 5 consecutive NBA championships as captain","Led the NBA in rebounds this season","The Celtics have the most NBA championships in history with 17 total","Was player-coach for his last 3 championships"] },
  { player:"Oscar Robertson", sport:"🏀 NBA", answer:"OSCAR", era:"legends", stats:{PTS:"30.8",AST:"11.4",REB:"12.5",FG:"47.8"}, ctx:"1961-62 NBA Season — Cincinnati Royals triple-double season", clues:["Averaged a triple-double for the entire season","From Charlotte Tennessee — averaged a triple-double for an entire season in 1961-62","Nicknamed The Big O","His triple-double record per game was not matched for 55 years"] },
  { player:"Jerry West", sport:"🏀 NBA", answer:"WEST", era:"legends", stats:{PTS:"31.3",AST:"7.2",REB:"4.4",FG:"47.6"}, ctx:"1969-70 NBA Season — Los Angeles Lakers Finals MVP", clues:["Was voted Finals MVP despite being on the losing team — the only time that has ever happened","His team lost to the New York Knicks in 7 games","The Lakers have won more NBA championships than almost any other team","His silhouette is the NBA logo"] },
  { player:"Walt Frazier", sport:"🏀 NBA", answer:"FRAZIER", era:"legends", stats:{PTS:"21.7",AST:"6.9",REB:"6.2",STL:"1.9"}, ctx:"1969-70 NBA Finals — New York Knicks", clues:["Had 36 points and 19 assists in Game 7 of the Finals","The Knicks play at Madison Square Garden — often called the most famous arena in the world","Nicknamed Clyde after the movie Bonnie and Clyde","Was one of the best defensive guards of his era"] },
  { player:"John Havlicek", sport:"🏀 NBA", answer:"HAVLICEK", era:"classic", stats:{PTS:"26.8",REB:"7.1",AST:"5.9",FG:"47.0"}, ctx:"1973-74 NBA Season — Boston Celtics Finals MVP", clues:["Ran faster than any guard in the league despite being a forward — nicknamed Hondo","Won 8 NBA championships in his career","Nicknamed Hondo","Was famous for his tireless running and hustle"] },
  { player:"J.J. Watt", sport:"🏈 NFL", answer:"WATT", era:"modern", stats:{SCK:"20.5",FF:"8",TD:"5",DPOY:"3"}, ctx:"2012 NFL Season — Houston Texans Defensive Player of Year", clues:["Won Defensive Player of the Year for the first of 3 times","Won the NFL Defensive Player of the Year award three times — 2012 2014 and 2015","From Waukesha Wisconsin — won three NFL Defensive Player of the Year awards","Won DPOY 3 times in 4 seasons"] },
  { player:"Dan Marino", sport:"🏈 NFL", answer:"MARINO", era:"classic", stats:{YDS:"5084",TD:"48",INT:"17",RTG:"108.9"}, ctx:"1984 NFL Season — Miami Dolphins MVP", clues:["Set the single-season passing TD record (48) that stood 20 years","Won the NFL MVP award","From Pittsburgh Pennsylvania — set numerous passing records that stood for over a decade","Had one of the fastest releases ever seen"] },
  { player:"Eric Dickerson", sport:"🏈 NFL", answer:"DICKERSON", era:"classic", stats:{CAR:"379",YDS:"2105",TD:"14",YPC:"5.6"}, ctx:"1984 NFL Season — Los Angeles Rams rushing record", clues:["Wore a distinctive single-bar facemask and ran with an unusually upright style","From Sealy Texas — set the single-season rushing record of 2105 yards in 1984","Known for his high knee action and goggles","The record still stands today"] },
  { player:"Tony Dorsett", sport:"🏈 NFL", answer:"DORSETT", era:"classic", stats:{CAR:"177",YDS:"1325",TD:"8",YPC:"7.5"}, ctx:"1977 NFL Season — Dallas Cowboys Rookie of Year", clues:["Still holds the all-time NFL record for yards per carry in a career","Later won the Super Bowl this same season","From Aliquippa Pennsylvania — won both the Heisman Trophy and a Super Bowl in consecutive years","Also ran the longest TD run in NFL history (99 yards) in 1983"] },
  { player:"Herschel Walker", sport:"🏈 NFL", answer:"WALKER", era:"classic", stats:{CAR:"238",YDS:"1514",REC:"53",TD:"10"}, ctx:"1985 NFL Season — Dallas Cowboys All-Pro", clues:["Won the Heisman Trophy at Georgia","From Wrightsville Georgia — won the Heisman Trophy at Georgia before being traded for five players","Was the centerpiece of the most lopsided trade in NFL history","Also competed in bobsled in the 1992 Olympics"] },
  { player:"Jim Kelly", sport:"🏈 NFL", answer:"KELLY", era:"classic", stats:{YDS:"3844",TD:"33",INT:"17",RTG:"97.6"}, ctx:"1991 NFL Season — Buffalo Bills AFC MVP", clues:["Led the Bills to their 2nd consecutive Super Bowl appearance","The Bills reached four consecutive Super Bowls and lost all four — the only team to do so","Ran the famous No-Huddle offense","Reached 4 consecutive Super Bowls — all losses"] },
  { player:"Bruce Smith", sport:"🏈 NFL", answer:"BRUCE SMITH", era:"classic", stats:{SCK:"19",FF:"4",DPOY:"2",YEAR:"1990"}, ctx:"1990 NFL Season — Buffalo Bills Defensive Player of Year", clues:["Won Defensive Player of the Year this season","Had 19 sacks","The Bills reached four consecutive Super Bowls and lost all four — the only team to do so","All-time NFL sacks leader with 200"] },
  { player:"Johnny Unitas", sport:"🏈 NFL", answer:"UNITAS", era:"legends", stats:{YDS:"2899",TD:"32",INT:"14",STREAK:"47"}, ctx:"1959 NFL Season — Baltimore Colts All-Pro", clues:["Set the record for consecutive games with a TD pass (47)","From Pittsburgh Pennsylvania — was cut by the Steelers before becoming the greatest QB of his era","Won 3 NFL championships","Nicknamed The Golden Arm"] },
  { player:"Jim Brown", sport:"🏈 NFL", answer:"JIM BROWN", era:"legends", stats:{CAR:"291",YDS:"1863",TD:"17",YPC:"6.4"}, ctx:"1963 NFL Season — Cleveland Browns MVP", clues:["Won the NFL MVP award for the 3rd time","Retired at the peak of his career at age 29 to pursue a film career and civil rights work","From St Simons Island Georgia — averaged 5.2 yards per carry and never missed a game in 9 seasons","Retired at his peak at age 29 — widely considered the greatest RB ever"] },
  { player:"Bart Starr", sport:"🏈 NFL", answer:"STARR", era:"legends", stats:{YDS:"250",TD:"2",INT:"1",RTG:"96.2"}, ctx:"Super Bowl I MVP — Green Bay Packers", clues:["Won the very first Super Bowl MVP award","The Packers are the only community-owned franchise in major American professional sports","Won 5 NFL championships under Vince Lombardi","Was known for his cool leadership in the Ice Bowl"] },
  { player:"Joe Namath", sport:"🏈 NFL", answer:"NAMATH", era:"legends", stats:{YDS:"4007",TD:"26",INT:"28",COMP:"52.5"}, ctx:"1967 NFL Season — New York Jets first 4000-yard passer", clues:["Became the first QB to pass for 4000 yards in a season","Played for a franchise that won Super Bowl III as massive underdogs with a famous guarantee","Guaranteed victory in Super Bowl III and delivered","Nicknamed Broadway Joe"] },
  { player:"Gale Sayers", sport:"🏈 NFL", answer:"SAYERS", era:"legends", stats:{TD:"22",RUSH:"867",REC:"507",RET:"1718"}, ctx:"1965 NFL Season — Chicago Bears Rookie of Year", clues:["Scored 22 touchdowns as a rookie — an NFL record at the time","From Wichita Kansas — scored 22 touchdowns as a rookie — the most in NFL history at the time","Won Rookie of the Year","Had his career cut short by injuries after being one of the most elusive runners ever"] },
  { player:"Night Train Lane", sport:"🏈 NFL", answer:"NIGHT TRAIN", era:"legends", stats:{INT:"14",YEAR:"1952",TD:"2",AWARD:"AllPro"}, ctx:"1952 NFL Season — Los Angeles Rams interception record", clues:["Set the all-time NFL single-season interception record with 14","From Austin Texas — set the NFL record with 14 interceptions as a rookie in 1952","The record still stands today","Got his nickname from a popular song"] },
  { player:"Bob Waterfield", sport:"🏈 NFL", answer:"WATERFIELD", era:"legends", stats:{YDS:"185",TD:"1",INT:"0",COMP:"55.0"}, ctx:"1945 NFL Championship — Cleveland Rams", clues:["Was also married to actress Jane Russell at the height of his fame","Won NFL MVP his first season","From Elmira New York — married actress Jane Russell and quarterbacked the Rams to two championships","Was also married to actress Jane Russell"] },
  { player:"Emlen Tunnell", sport:"🏈 NFL", answer:"TUNNELL", era:"legends", stats:{INT:"79",YDS:"1282",YEAR:"1952",AWARD:"AllPro"}, ctx:"Career — New York Giants defensive back legend", clues:["Was the first African American player in Giants history","Retired with the most career interceptions ever at the time","From Bryn Mawr Pennsylvania — was the first Black player inducted into the Pro Football Hall of Fame","Was elected to the Hall of Fame in 1967"] },
  { player:"Leo Nomellini", sport:"🏈 NFL", answer:"NOMELLINI", era:"legends", stats:{YEAR:"1953",AWARD:"AllPro",SEASONS:"14",POS:"DT"}, ctx:"Career — San Francisco 49ers iron man", clues:["Never missed a game in 14 NFL seasons","Was an All-Pro on both offense and defense","Was known for the West Coast offense which he helped pioneer","Also won 2 NCAA wrestling championships"] },
  { player:"Lou Groza", sport:"🏈 NFL", answer:"GROZA", era:"legends", stats:{FGM:"264",PTS:"1608",XP:"810",YEAR:"1964"}, ctx:"Career — Cleveland Browns kicker and tackle", clues:["Was both an offensive tackle and kicker in his career","Was nicknamed The Toe and kicked barefoot for part of his career","Was inducted into the Pro Football Hall of Fame after his career","Nicknamed The Toe for his kicking ability"] },
  { player:"Roosevelt Brown", sport:"🏈 NFL", answer:"ROOSEVELT BROWN", era:"legends", stats:{YEAR:"1956",AWARD:"AllPro",SEASONS:"13",DRAFT:"321"}, ctx:"Career — New York Giants Hall of Fame tackle", clues:["Was selected All-Pro 9 times in his career","Was drafted in the 27th round — one of the greatest steals ever","Was inducted into the Pro Football Hall of Fame after his career","Was elected to the Hall of Fame in 1975"] },
  { player:"Forrest Gregg", sport:"🏈 NFL", answer:"GREGG", era:"legends", stats:{YEAR:"1966",AWARD:"AllPro",TITLES:"6",POS:"OT"}, ctx:"Career — Green Bay Packers championship offensive tackle", clues:["Vince Lombardi called him the finest player he ever coached","Won 6 NFL championships with the Green Bay Packers","Was considered by Vince Lombardi to be the finest player he ever coached","Was elected to the Hall of Fame in 1977"] },
  { player:"Jim Ringo", sport:"🏈 NFL", answer:"RINGO", era:"legends", stats:{YEAR:"1963",AWARD:"AllPro",PROBOW:"10",POS:"C"}, ctx:"Career — Green Bay Packers center", clues:["Was selected to 10 Pro Bowls in his career","Won 4 NFL championships with Green Bay Packers","Played center and was a master of the position","Was the anchor of the offensive line during the Lombardi dynasty"] },
  { player:"Frank Gifford", sport:"🏈 NFL", answer:"GIFFORD", era:"legends", stats:{PTS:"484",REC:"367",TD:"78",YEAR:"1956"}, ctx:"1956 NFL Season — New York Giants MVP", clues:["Was a three-way threat — ran passed and caught the ball from the halfback position","Scored 78 touchdowns during this season","Was a versatile back who played multiple positions","Later became famous as a Monday Night Football broadcaster"] },
  { player:"Crazy Legs Hirsch", sport:"🏈 NFL", answer:"CRAZYLEGS", era:"legends", stats:{REC:"66",YDS:"1495",TD:"17",YEAR:"1951"}, ctx:"1951 NFL Season — Los Angeles Rams receiving record", clues:["Had a record-setting receiving season with 17 TDs","Was famous for his unusual running style that gave him his nickname","Scored 17 touchdowns during this season","Had a movie made about him called Crazylegs in 1953"] },
  { player:"Lance Alworth", sport:"🏈 NFL", answer:"ALWORTH", era:"legends", stats:{REC:"73",YDS:"1602",TD:"13",YEAR:"1965"}, ctx:"1965 AFL Season — San Diego Chargers All-Pro", clues:["Was the best wide receiver in the AFL during the 1960s","Nicknamed Bambi for his graceful movement","Scored 13 touchdowns during this season","Was the first AFL player inducted into the Pro Football Hall of Fame"] },
  { player:"Willie Mays", sport:"⚾ MLB", answer:"MAYS", era:"legends", stats:{HR:"52",AVG:".317",RBI:"112",SB:"24"}, ctx:"1965 MLB Season — San Francisco Giants All-Star", clues:["Hit 52 home runs this season at age 34","Won the NL MVP award this season","The Giants moved from New York to San Francisco in 1958 alongside the Dodgers","Made The Catch in the 1954 World Series"] },
  { player:"Mickey Mantle", sport:"⚾ MLB", answer:"MANTLE", era:"legends", stats:{HR:"52",AVG:".365",RBI:"130",OPS:"1.169"}, ctx:"1956 MLB Season — New York Yankees Triple Crown MVP", clues:["Won the Triple Crown in 1956 — one of only two players to win it in the live ball era","Won the AL MVP award 3 times","The Yankees have won 27 World Series championships — by far the most of any team","Wore number 7 and was known for switch-hitting power"] },
  { player:"Frank Robinson", sport:"⚾ MLB", answer:"FRANK ROBINSON", era:"legends", stats:{HR:"49",AVG:".316",RBI:"122",OPS:"1.047"}, ctx:"1966 MLB Season — Baltimore Orioles Triple Crown MVP", clues:["Had been traded from Cincinnati to the Orioles before the season","Is the only player in MLB history to win MVP in both leagues","Was the first player to win the MVP award in both leagues","Was the first Black manager in MLB history"] },
  { player:"Carl Yastrzemski", sport:"⚾ MLB", answer:"YAZ", era:"legends", stats:{HR:"44",AVG:".326",RBI:"121",OPS:"1.040"}, ctx:"1967 MLB Season — Boston Red Sox Triple Crown MVP", clues:["Boston went from 9th place to the World Series in one year","Won the AL MVP award","The Red Sox ended an 86-year championship drought known as the Curse of the Bambino","Nicknamed Yaz — wore number 8"] },
  { player:"Tom Seaver", sport:"⚾ MLB", answer:"SEAVER", era:"legends", stats:{ERA:"2.21",W:"25",SO:"283",CG:"18"}, ctx:"1969 MLB Season — New York Mets Cy Young", clues:["Led the Mets from 9th place to World Series champions","Led New York to a World Series title this year","The Miracle Mets won the 1969 World Series despite having 100-1 odds at the start of the year","Nicknamed Tom Terrific"] },
  { player:"Steve Carlton", sport:"⚾ MLB", answer:"CARLTON", era:"classic", stats:{ERA:"1.97",W:"27",SO:"310",WHIP:"0.940"}, ctx:"1972 MLB Season — Philadelphia Phillies Cy Young", clues:["Won 27 games for a team that won only 59 — remarkable","Also famous for refusing to speak to media for years","The Phillies won the World Series in 2008 ending a 28-year championship drought","Nicknamed Lefty — refused to speak to media for years"] },
  { player:"Mike Schmidt", sport:"⚾ MLB", answer:"SCHMIDT", era:"classic", stats:{HR:"48",AVG:".286",RBI:"121",OPS:".996"}, ctx:"1980 MLB Season — Philadelphia Phillies MVP", clues:["Won the NL MVP and World Series MVP this season","Won 3 NL MVP awards in his career","The Phillies won the World Series in 2008 ending a 28-year championship drought","Won 10 Gold Gloves at third base"] },
  { player:"Reggie Jackson", sport:"⚾ MLB", answer:"JACKSON", era:"classic", stats:{HR:"3",RBI:"5",H:"3",AB:"5"}, ctx:"1977 World Series Game 6 — New York Yankees", clues:["Hit 3 home runs in a single World Series game","Won the World Series MVP award","The Yankees have won 27 World Series championships — by far the most of any team","Nicknamed Mr. October for his postseason performances"] },
  { player:"Pete Rose", sport:"⚾ MLB", answer:"ROSE", era:"classic", stats:{H:"230",AVG:".331",R:"130",YEAR:"1973"}, ctx:"1973 MLB Season — Cincinnati Reds NL MVP", clues:["Won the NL MVP award for the only time in his career","Had more career hits than any other player in baseball history","The Big Red Machine Reds of the 1970s were one of baseball's greatest dynasties","All-time MLB hits leader with 4256"] },
  { player:"Johnny Bench", sport:"⚾ MLB", answer:"BENCH", era:"classic", stats:{HR:"45",RBI:"148",AVG:".293",OPS:".909"}, ctx:"1970 MLB Season — Cincinnati Reds MVP", clues:["Won the NL MVP award at age 22","Won 2 NL MVP awards in his career","The Big Red Machine Reds of the 1970s were one of baseball's greatest dynasties","Revolutionized the catcher position with one-handed catching"] },
  { player:"Joe Morgan", sport:"⚾ MLB", answer:"MORGAN", era:"classic", stats:{HR:"17",AVG:".327",OBP:".466",SB:"67"}, ctx:"1975 MLB Season — Cincinnati Reds MVP", clues:["Won back-to-back NL MVP awards in 1975 and 1976","The Big Red Machine Reds of the 1970s were one of baseball's greatest dynasties","Played second base with a distinctive arm-flapping batting style","Was a dominant player despite being only 5ft 7in"] },
  { player:"Rod Carew", sport:"⚾ MLB", answer:"CAREW", era:"classic", stats:{AVG:".388",H:"239",R:"128",TITLES:"7"}, ctx:"1977 MLB Season — Minnesota Twins MVP", clues:["Was born in Panama and became the first Latin American player to win a batting title","Has the highest career batting average in NL history","The Twins won back-to-back World Series in 1987 and 1991 in the indoor Metrodome","From Panama — was considered the finest pure hitter of his era"] },
  { player:"Catfish Hunter", sport:"⚾ MLB", answer:"CATFISH", era:"classic", stats:{W:"25",ERA:"2.49",CG:"23",YEAR:"1974"}, ctx:"1974 MLB Season — Oakland Athletics Cy Young", clues:["Won 5 consecutive World Series rings","From Hertford North Carolina — signed baseball's first major free agent contract","Was the first player declared a free agent — his case changed baseball forever","Was one of the first big free agents in baseball history"] },
  { player:"Rickey Henderson", sport:"⚾ MLB", answer:"HENDERSON", era:"classic", stats:{SB:"130",AVG:".319",OBP:".408",R:"119"}, ctx:"1982 MLB Season — Oakland Athletics stolen base record", clues:["Was known for getting intentionally walked just to have him on base was considered a liability","The Moneyball A's used statistical analysis to compete with teams that outspent them massively","All-time stolen base leader with 1406","Referred to himself in the third person — was famous for his personality"] },
  { player:"Lou Gehrig", sport:"⚾ MLB", answer:"GEHRIG", era:"legends", stats:{HR:"49",AVG:".363",RBI:"165",OPS:"1.228"}, ctx:"1936 MLB Season — New York Yankees MVP", clues:["Won the AL MVP award this season","Played in 2130 consecutive games — record for decades","The Yankees have won 27 World Series championships — by far the most of any team","Played 2130 consecutive games — a record that stood for 56 years"] },
  { player:"Ted Williams", sport:"⚾ MLB", answer:"WILLIAMS", era:"legends", stats:{AVG:".406",HR:"37",OBP:".553",YEAR:"1941"}, ctx:"1941 MLB Season — Boston Red Sox — last .400 hitter", clues:["Was the last player to hit .400 in a season","Refused to sit out the last day to protect his average","The Red Sox ended an 86-year championship drought known as the Curse of the Bambino","Nicknamed The Splendid Splinter"] },
  { player:"Joe DiMaggio", sport:"⚾ MLB", answer:"DIMAGGIO", era:"legends", stats:{STREAK:"56",AVG:".357",HR:"30",RBI:"125"}, ctx:"1941 MLB Season — New York Yankees streak season", clues:["Hit safely in 56 consecutive games — still the all-time record","The Yankees have won 27 World Series championships — by far the most of any team","Married Marilyn Monroe","Nicknamed The Yankee Clipper"] },
  { player:"Stan Musial", sport:"⚾ MLB", answer:"MUSIAL", era:"legends", stats:{HR:"35",AVG:".357",RBI:"109",H:"197"}, ctx:"1948 MLB Season — St. Louis Cardinals MVP", clues:["Won the NL MVP award and came close to hitting .400","Won 3 NL MVP awards in his career","The Cardinals have won 11 World Series championships — second most all-time","Spent his entire 22-year career with the St. Louis Cardinals — never playing for another team"] },
  { player:"Ty Cobb", sport:"⚾ MLB", answer:"COBB", era:"legends", stats:{AVG:".420",H:"248",R:"147",SB:"96"}, ctx:"1911 MLB Season — Detroit Tigers MVP", clues:["Was involved in one of the most notorious brawls in baseball history with Babe Ruth's team","Won the Chalmers Award (precursor to MVP)","The Tigers have one of baseball's most storied franchises featuring Ty Cobb Hank Greenberg and Al Kaline","All-time batting average leader at .367"] },
  { player:"Walter Johnson", sport:"⚾ MLB", answer:"JOHNSON", era:"legends", stats:{ERA:"1.14",W:"36",SO:"303",SHO:"11"}, ctx:"1913 MLB Season — Washington Senators MVP", clues:["Struck out 3509 batters in his career — the most in AL history at retirement","Won the Chalmers Award for MVP","Was elected to the Hall of Fame in the first year of voting in 1936","Was considered the fastest pitcher of his era"] },
  { player:"Honus Wagner", sport:"⚾ MLB", answer:"WAGNER", era:"legends", stats:{AVG:".339",H:"201",RBI:"100",SB:"61"}, ctx:"1908 MLB Season — Pittsburgh Pirates batting title", clues:["Won 8 batting titles in his career","Played during the Pirates dynasty years alongside Roberto Clemente and Willie Stargell","Nicknamed The Flying Dutchman","His T206 baseball card is the most valuable in history"] },
  { player:"Cy Young", sport:"⚾ MLB", answer:"CY YOUNG", era:"legends", stats:{W:"33",ERA:"1.26",SHO:"10",CG:"40"}, ctx:"1901 MLB Season — Boston Americans dominant year", clues:["The award given annually to the best pitcher in each league is named after him","Has the most career wins in MLB history (511)","Won more games than any pitcher in baseball history — 511 career victories","Won over 30 games 5 times in his career"] },
  { player:"Rogers Hornsby", sport:"⚾ MLB", answer:"HORNSBY", era:"legends", stats:{AVG:".424",HR:"25",RBI:"94",OPS:"1.245"}, ctx:"1924 MLB Season — St. Louis Cardinals batting title", clues:["Also managed the St. Louis Cardinals to multiple World Series titles","Won 7 batting titles in his career","The Cardinals have won 11 World Series championships — second most all-time","Has the highest career batting average in NL history (.358)"] },
  { player:"Jimmie Foxx", sport:"⚾ MLB", answer:"FOXX", era:"legends", stats:{HR:"58",AVG:".364",RBI:"169",OPS:"1.284"}, ctx:"1932 MLB Season — Philadelphia Athletics MVP", clues:["Hit 58 home runs and won the Triple Crown this season","Won 3 AL MVP awards in his career","Finished runner-up to Babe Ruth in home runs multiple times despite hitting over 50 himself","Nicknamed Double X and The Beast"] },
  { player:"Josh Gibson", sport:"⚾ MLB", answer:"JOSH GIBSON", era:"legends", stats:{HR:"84",AVG:".440",RBI:"165",YEAR:"1936"}, ctx:"1936 Negro Leagues Season — Homestead Grays", clues:["Is credited with hitting 84 home runs in one season in the Negro Leagues","Had a career batting average estimated at .372","Hit an estimated 800+ home runs across his career in the Negro Leagues","Was inducted into the Hall of Fame in 1972 as one of the greatest players never to play in MLB"] },
  { player:"Satchel Paige", sport:"⚾ MLB", answer:"PAIGE", era:"legends", stats:{ERA:"2.50",W:"20",SO:"250",AGE:"42"}, ctx:"1948 MLB Season — Cleveland Indians — oldest rookie", clues:["Was 42 years old when he joined the Indians — oldest MLB rookie ever","Won 20 games in his first MLB season despite his age","Had dominated the Negro Leagues for decades","Was finally inducted to the Hall of Fame in 1971"] },
  { player:"Cool Papa Bell", sport:"⚾ MLB", answer:"COOL PAPA", era:"legends", stats:{AVG:".400",SB:"175",YEAR:"1933",LEAGUE:"Negro"}, ctx:"Negro Leagues Career — Pittsburgh Crawfords fastest player", clues:["Was said to be so fast he could turn off the light and be in bed before the room got dark","Was said to be so fast he could turn off the light and be in bed before the room got dark","Played most of his career for the St. Louis Stars and Homestead Grays","Was inducted into the Hall of Fame in 1974"] },
  { player:"Dizzy Dean", sport:"⚾ MLB", answer:"DEAN", era:"legends", stats:{W:"30",ERA:"2.66",SO:"195",YEAR:"1934"}, ctx:"1934 MLB Season — St. Louis Cardinals Gashouse Gang", clues:["Won 30 games this season — last NL pitcher to do so","Won the NL MVP award","Was so dominant in 1934 he won 30 games — the last NL pitcher to accomplish that","Predicted he would win 30 games — and delivered"] },
  { player:"Luke Appling", sport:"⚾ MLB", answer:"APPLING", era:"legends", stats:{AVG:".388",H:"204",R:"93",YEAR:"1936"}, ctx:"1936 MLB Season — Chicago White Sox batting title", clues:["Played his entire career for one team despite better offers","Played his entire career for the White Sox","Nicknamed Old Aches and Pains for constantly complaining about injuries","Was elected to the Hall of Fame in 1964"] },
  { player:"Mel Ott", sport:"⚾ MLB", answer:"OTT", era:"legends", stats:{HR:"42",AVG:".304",RBI:"123",YEAR:"1936"}, ctx:"1936 MLB Season — New York Giants All-Pro", clues:["Hit 42 home runs this season at age 27","Was the first NL player to hit 500 career home runs","Hit 511 career home runs — all with the New York Giants","Had an unusual high leg kick in his batting stance"] },
  { player:"Bob Feller", sport:"⚾ MLB", answer:"FELLER", era:"legends", stats:{W:"26",SO:"348",ERA:"2.18",NH:"2"}, ctx:"1946 MLB Season — Cleveland Indians comeback year", clues:["Won 26 games and struck out 348 in his comeback after WWII","Served 4 years in the Navy during WWII at his prime","Threw 12 one-hitters in his career — more than any other pitcher in MLB history","Nicknamed Rapid Robert for his blazing fastball"] },
  { player:"Paul Waner", sport:"⚾ MLB", answer:"WANER", era:"legends", stats:{AVG:".380",H:"237",RBI:"131",YEAR:"1927"}, ctx:"1927 MLB Season — Pittsburgh Pirates MVP", clues:["Won the NL MVP award this season","Was nicknamed Big Poison while his brother Lloyd was nicknamed Little Poison","Played during the Pirates dynasty years alongside Roberto Clemente and Willie Stargell","Nicknamed Big Poison — his brother Lloyd was Little Poison"] },
  { player:"Diego Maradona", sport:"⚽ Soccer", answer:"MARADONA", era:"classic", stats:{G:"5",AST:"5",APP:"7",MIN:"630"}, ctx:"1986 FIFA World Cup — Argentina", clues:["Also won the Golden Ball as best player of the tournament","Won the Golden Ball as best player","Scored both the Hand of God and Goal of the Century vs England","Considered alongside Pele as the greatest ever"] },
  { player:"Ruud Gullit", sport:"⚽ Soccer", answer:"GULLIT", era:"classic", stats:{G:"3",AST:"5",APP:"7",MIN:"596"}, ctx:"UEFA Euro 1988 — Netherlands", clues:["Won the European Championship with Netherlands","Was the captain of the Dutch team","Won the Ballon d'Or in 1987","AC Milan have won the European Cup 7 times — second only to Real Madrid all-time"] },
  { player:"Alessandro Del Piero", sport:"⚽ Soccer", answer:"DEL PIERO", era:"classic", stats:{G:"290",APP:"705",UCL:"1",SCUD:"6"}, ctx:"Career totals — Juventus legend", clues:["Scored 290 goals for Juventus — their all-time record","Won 6 Serie A titles with Juventus","Won the 2006 World Cup with Italy","Known as Pinturicchio for his elegant playing style"] },
  { player:"Rivaldo", sport:"⚽ Soccer", answer:"RIVALDO", era:"modern", stats:{G:"8",AST:"3",APP:"7",MIN:"630"}, ctx:"2002 FIFA World Cup — Brazil", clues:["Was the key player for Barcelona in the late 1990s","Won the Ballon d'Or in 1999","AC Milan have won the European Cup 7 times — second only to Real Madrid all-time","Brazilian forward known for his bicycle kicks and free kicks"] },
  { player:"Bobby Charlton", sport:"⚽ Soccer", answer:"BOBBY CHARLTON", era:"legends", stats:{G:"49",APP:"106",WC:"1",EURO:"0"}, ctx:"Career — England and Manchester United legend", clues:["Won the 1966 World Cup with England","Survived the 1958 Munich air disaster","United are the most widely supported football club in England","Was knighted for his services to football"] },
  { player:"Bobby Moore", sport:"⚽ Soccer", answer:"MOORE", era:"legends", stats:{G:"2",APP:"108",WC:"1",YEAR:"1966"}, ctx:"1966 FIFA World Cup — England World Champions", clues:["Lifted the Jules Rimet Trophy at Wembley Stadium","Lifted the Jules Rimet Trophy at Wembley","Was one of the most accomplished players of their generation","Considered the greatest English defender ever"] },
  { player:"Geoff Hurst", sport:"⚽ Soccer", answer:"HURST", era:"legends", stats:{G:"3",AST:"0",APP:"1",MIN:"90"}, ctx:"1966 FIFA World Cup Final — England vs West Germany", clues:["Scored a hat trick in the World Cup Final — the only player to do so","Also scored the hat trick in the Final","Was one of the most accomplished players of their generation","His second goal — did it cross the line — remains controversial"] },
  { player:"Garrincha", sport:"⚽ Soccer", answer:"GARRINCHA", era:"legends", stats:{G:"5",APP:"6",MIN:"540",YEAR:"1962"}, ctx:"1962 FIFA World Cup — Brazil", clues:["Was born with a spinal defect and crooked legs that doctors said would prevent him playing sport","Won the Golden Boot with 5 goals in 6 games","Scored 5 goals during this tournament or season","Was born with a spinal defect and crooked legs yet became one of the most gifted dribblers ever"] },
  { player:"Giuseppe Meazza", sport:"⚽ Soccer", answer:"MEAZZA", era:"legends", stats:{G:"33",APP:"53",WC:"2",YEAR:"1938"}, ctx:"Was one of the most accomplished players of their generation", clues:["Was the greatest Italian player of the pre-war era","Scored 33 goals in just 53 international appearances for Italy","Inter are the only Italian club to have never been relegated from Serie A","Scored in the final of both the 1934 and 1938 World Cups — the only player to do so"] },
  { player:"Tom Finney", sport:"⚽ Soccer", answer:"FINNEY", era:"legends", stats:{G:"30",APP:"76",YEAR:"1954",COUNTRY:"England"}, ctx:"Career — England and Preston North End legend", clues:["Was never booked in his entire career","Was considered by Stanley Matthews as the greatest player he ever played alongside","Played his entire club career for Preston North End — despite huge offers to leave","Was a plumber who kept his trade throughout his playing career"] },
  { player:"Alfredo Di Stefano", sport:"⚽ Soccer", answer:"DI STEFANO", era:"legends", stats:{G:"308",APP:"510",UCL:"5",YEAR:"1964"}, ctx:"Career — Real Madrid legend", clues:["Won 5 consecutive European Cups with Real Madrid","Scored in 5 consecutive European Cup Finals","Real Madrid have won the most UEFA Champions League titles of any club in history","Argentine-born who also represented Spain and Colombia internationally"] },
  { player:"Ferenc Puskas", sport:"⚽ Soccer", answer:"PUSKAS", era:"legends", stats:{G:"84",APP:"85",WC:"0",YEAR:"1960"}, ctx:"Career — Real Madrid and Hungary legend", clues:["Scored 84 goals in 85 appearances for Hungary","Won 3 European Cups with Real Madrid","Was the leading scorer in the 1960 European Cup Final with 4 goals","Nicknamed The Galloping Major"] },
  { player:"Didi", sport:"⚽ Soccer", answer:"DIDI", era:"legends", stats:{G:"3",APP:"5",WC:"2",YEAR:"1958"}, ctx:"1958 FIFA World Cup — Brazil", clues:["Was nicknamed O Maestro and was the creative force behind the great Brazilian sides of the late 1950s","Was one of the most accomplished players of their generation","Real Madrid have won the most UEFA Champions League titles of any club in history","Was known for his folha seca (dry leaf) free kicks"] },
  { player:"Uwe Seeler", sport:"⚽ Soccer", answer:"SEELER", era:"legends", stats:{G:"43",APP:"72",YEAR:"1966",WC:"3rd"}, ctx:"Career — West Germany and Hamburg legend", clues:["Scored 43 goals in 72 appearances for West Germany","Played in 4 World Cups for West Germany","Played his entire club career for Hamburg","Is one of only 4 players to score in 4 different World Cups"] },
  { player:"John Charles", sport:"⚽ Soccer", answer:"JOHN CHARLES", era:"legends", stats:{G:"28",APP:"97",YEAR:"1958",NATION:"Wales"}, ctx:"Career — Wales and Juventus legend", clues:["Was equally brilliant as center forward or center back","Juventus won 9 consecutive Serie A titles from 2012 to 2020 in one of Europe's greatest runs","Was nicknamed Il Gigante Buono — The Gentle Giant — and was considered the best header of the ball in Europe","Was never booked in his career despite his physical size"] },
  { player:"Djalma Santos", sport:"⚽ Soccer", answer:"DJALMA SANTOS", era:"legends", stats:{G:"3",APP:"98",WC:"2",YEAR:"1962"}, ctx:"Career — Brazil two-time World Cup champion", clues:["Was considered the best right back in the world in the late 1950s","Was considered one of the greatest right backs in football history by his contemporaries","Scored 3 goals during this tournament or season","Won the World Cup in his last international tournament"] },
  { player:"Bjorn Borg", sport:"🎾 ATP", answer:"BJORN BORG", era:"classic", stats:{W:"89",L:"3",GRAND_SLAMS:"5",TITLES:"11"}, ctx:"1979 ATP Season — 4th consecutive Wimbledon title", clues:["Won Wimbledon for the 4th consecutive year","Won 11 Grand Slams in total","Swedish player who retired at just 26","Famous rivalry with John McEnroe"] },
  { player:"John McEnroe", sport:"🎾 ATP", answer:"MCENROE", era:"classic", stats:{W:"82",L:"3",GRAND_SLAMS:"3",TITLES:"10"}, ctx:"1984 ATP Season — Most dominant year", clues:["Won 82 of 85 matches this year — one of the best seasons ever","Won Wimbledon and US Open this year","American player famous for his on-court outbursts","His rivalry with Borg is one of sport's greatest"] },
  { player:"Andre Agassi", sport:"🎾 ATP", answer:"AGASSI", era:"classic", stats:{W:"74",L:"14",GRAND_SLAMS:"2",WEEKS_NO1:"101"}, ctx:"1994 ATP Season — Two Grand Slams and World No. 1", clues:["Won Wimbledon and US Open this year","Reached World No. 1 for the first time","American player known for his baseline power","Won all 4 Grand Slams in his career"] },
  { player:"Conchita Martinez", sport:"🎾 ATP", answer:"MARTINEZ", era:"classic", stats:{W:"1",YEAR:"1994",SURFACE:"Grass",COUNTRY:"Spain"}, ctx:"1994 Wimbledon — Spanish clay courter wins on grass", clues:["Won Wimbledon as a clay court specialist","Beat Martina Navratilova in the final","Spanish player who was better known on clay","This was her only Grand Slam singles title"] },
  { player:"Rod Laver", sport:"🎾 ATP", answer:"LAVER", era:"legends", stats:{GRAND_SLAMS:"11",CAL_GRAND_SLAM:"Won twice",YEAR:"1969",COUNTRY:"Australia"}, ctx:"1969 ATP Season — Second career Grand Slam", clues:["Turned professional in 1963 after dominating amateur tennis","Won 11 Grand Slam singles titles","Won all four Grand Slams twice — as an amateur in 1962 and as a professional in 1969","Considered the greatest tennis player of his era"] },
  { player:"Ken Rosewall", sport:"🎾 ATP", answer:"ROSEWALL", era:"classic", stats:{GRAND_SLAMS:"8",FINAL:"4",YEAR:"1974",AGE:"39"}, ctx:"1974 Wimbledon Final — 39-year-old finalist", clues:["Reached the Wimbledon Final at age 39 — lost to Connors","Won 8 Grand Slam singles titles spanning 19 years","Australian player nicknamed Muscles","Won his last Grand Slam title at age 37"] },
  { player:"Arthur Ashe", sport:"🎾 ATP", answer:"ASHE", era:"classic", stats:{GRAND_SLAMS:"3",WIMBLEDON:"1x winner",YEAR:"1975",COUNTRY:"USA"}, ctx:"1975 Wimbledon — Historic win over Connors", clues:["Won Wimbledon by upsetting the heavily favored Jimmy Connors","Was the first Black man to win Wimbledon","Won 3 Grand Slam titles in his career","Became an activist and spokesperson for AIDS awareness"] },
  { player:"Margaret Court", sport:"🎾 WTA", answer:"COURT", era:"classic", stats:{GRAND_SLAMS:"24",SLAM:"3",YEAR:"1970",COUNTRY:"Australia"}, ctx:"1970 WTA Season — Calendar Grand Slam", clues:["Won all 4 Grand Slams in one year — the Grand Slam","Won 24 Grand Slam singles titles — the most ever","Won 24 Grand Slam singles titles — the most in the Open Era for decades","Retired with 24 Grand Slam singles titles — the most in history"] },
  { player:"Billie Jean King", sport:"🎾 WTA", answer:"BILLIE JEAN KING", era:"legends", stats:{GRAND_SLAMS:"12",WIMBLEDON:"6x winner",YEAR:"1967",BATTLE:"1"}, ctx:"Career — Women's tennis pioneer", clues:["Won 12 Grand Slam singles titles including 6 Wimbledons","Won the Battle of the Sexes match vs Bobby Riggs in 1973","Was a champion for equal prize money in tennis","Founded the Women's Tennis Association"] },
  { player:"Ilie Nastase", sport:"🎾 ATP", answer:"NASTASE", era:"classic", stats:{W:"104",L:"7",GRAND_SLAMS:"2",WEEKS_NO1:"101"}, ctx:"1973 ATP Season — World No. 1 dominant year", clues:["Was the first official World No. 1 in tennis","Won 2 Grand Slams in his career","Romanian player known as Nasty for his on-court behavior","Won 109 singles titles in his career"] },
  { player:"Evonne Goolagong", sport:"🎾 WTA", answer:"GOOLAGONG", era:"classic", stats:{GRAND_SLAMS:"7",WIMBLEDON:"2x winner",YEAR:"1971",COUNTRY:"Australia"}, ctx:"1971 Wimbledon — First win at 19 years old", clues:["Won Wimbledon at age 19 in her first major final","Won 7 Grand Slam singles titles","Was the first Aboriginal Australian to win a Grand Slam singles title","Won Wimbledon a second time in 1980 as a mother"] },
  { player:"Fred Perry", sport:"🎾 ATP", answer:"FRED PERRY", era:"legends", stats:{GRAND_SLAMS:"8",WIMBLEDON:"3x winner",YEAR:"1936",NATION:"Great Britain"}, ctx:"1936 Wimbledon — Last British man to win", clues:["After retiring from tennis became a successful clothing entrepreneur — his brand is still iconic","Won 8 Grand Slam titles including 3 consecutive Wimbledons","Was the World No. 1 for 4 years","Later founded a clothing brand that became a global fashion icon"] },
  { player:"Maureen Connolly", sport:"🎾 ATP", answer:"CONNOLLY", era:"legends", stats:{GRAND_SLAMS:"9",SLAM:"1",YEAR:"1953",COUNTRY:"USA"}, ctx:"1953 WTA Season — First women's Grand Slam", clues:["Was the first woman to win the Grand Slam (all 4 majors in one year)","Won 9 Grand Slam singles titles by age 19","Nicknamed Little Mo","Her career was cut short by a horse riding accident at age 19"] },
  { player:"Helen Wills Moody", sport:"🎾 ATP", answer:"WILLS MOODY", era:"legends", stats:{GS:"19",WIMB:"8",YEAR:"1935",COUNTRY:"USA"}, ctx:"Career — 1920s-30s American tennis queen", clues:["Won 19 Grand Slam singles titles","Won Wimbledon 8 times","Never lost a set in Wimbledon singles matches for 9 years","Won 8 Wimbledon titles and 7 US Open titles — never losing a set at Wimbledon across a 6-year stretch"] },
  { player:"Suzanne Lenglen", sport:"🎾 ATP", answer:"LENGLEN", era:"legends", stats:{GRAND_SLAMS:"12",WIMBLEDON:"6x winner",YEAR:"1922",NATION:"France"}, ctx:"1920s WTA Season — First female tennis superstar", clues:["Won 12 Grand Slam singles titles","Won Wimbledon 6 consecutive times","Won the French Championships six consecutive years without losing a single set","French player who revolutionized women's tennis fashion and style"] },
  { player:"Henri Cochet", sport:"🎾 ATP", answer:"COCHET", era:"legends", stats:{GRAND_SLAMS:"8",YEAR:"1928",NATION:"France",MUSK:"1"}, ctx:"1928 ATP Season — French Musketeers era", clues:["Won 8 Grand Slam titles including the French Open 4 times","Was part of the Four Musketeers of French tennis","Was famous for dramatic comebacks from two sets down","Nicknamed The Magician of the Court"] },
  { player:"Doris Hart", sport:"🎾 WTA", answer:"DORIS HART", era:"legends", stats:{GS:"35",SINGLES:"6",YEAR:"1951",COUNTRY:"USA"}, ctx:"Career — Post-war American all-court champion", clues:["Won 35 Grand Slam titles combining singles, doubles, and mixed","Won the Grand Slam in doubles and mixed doubles","Overcame severe leg problems as a child that doctors thought would prevent her from walking","One of the most versatile players of the amateur era"] },
  { player:"Phil Mickelson", sport:"⛳ Golf", answer:"PHIL MICKELSON", era:"modern", stats:{WINS:"4",MAJORS:"1",AVG:"69.1",EARN:"$4.7M"}, ctx:"2004 PGA Tour Season — First Masters title", clues:["Won his first Masters title after years of near misses","Had been called the best player without a major","Left-handed golfer nicknamed Lefty","Won by one shot at Augusta"] },
  { player:"Scottie Scheffler", sport:"⛳ Golf", answer:"SCHEFFLER", era:"modern", stats:{WINS:"4",MAJORS:"1",AVG:"68.85",EARN:"$14.1M"}, ctx:"2022 PGA Tour Season — Masters and World No. 1", clues:["Won The Masters and 3 other events this year","Became World No. 1 for the first time","From Dallas, Texas","Became the dominant player of his era"] },
  { player:"Ernie Els", sport:"⛳ Golf", answer:"ERNIE ELS", era:"classic", stats:{WINS:"4",MAJORS:"2",AVG:"69.8",EARN:"$6.8M"}, ctx:"1997 PGA Tour Season — Two US Open titles", clues:["Won 2 US Opens and 2 British Opens in his career","Nicknamed The Big Easy for his smooth swing","From Johannesburg, South Africa","Won the US Open in 1994 and 1997"] },
  { player:"Collin Morikawa", sport:"⛳ Golf", answer:"COLLIN MORIKAWA", era:"modern", stats:{WINS:"2",MAJORS:"2",AVG:"69.47",EARN:"$4.8M"}, ctx:"2021 PGA Tour Season — The Open Championship", clues:["Won The Open Championship on his first appearance","Won 2 majors in his first 9 major starts","From Los Angeles, California","Korean-American player nicknamed The Machine for his iron play"] },
  { player:"Xander Schauffele", sport:"⛳ Golf", answer:"SCHAUFFELE", era:"modern", stats:{WINS:"2",MAJORS:"2",EARN:"$9.7M",YEAR:"2024"}, ctx:"2024 PGA Tour Season — Two major wins", clues:["Won the PGA Championship and The Open Championship this year","Had been the best player without a major for years","From San Diego, California","His father was an Olympic decathlete"] },
  { player:"Rickie Fowler", sport:"⛳ Golf", answer:"FOWLER", era:"modern", stats:{WINS:"5",MAJORS:"0",AVG:"70.12",EARN:"$6.7M"}, ctx:"2015 PGA Tour Season — Players Championship win", clues:["Won the Players Championship — sometimes called the 5th major","Known for wearing orange — his college color","From Murrieta, California","Was one of the most accomplished players of their generation"] },
  { player:"Patrick Cantlay", sport:"⛳ Golf", answer:"PATRICK CANTLAY", era:"modern", stats:{WINS:"4",MAJORS:"0",EARN:"$8.7M",YEAR:"2021"}, ctx:"2021 PGA Tour Season — FedEx Cup champion", clues:["Won the FedEx Cup in a dramatic playoff","Ranked among the top 5 players in the world","From Long Beach, California","Known for his calm demeanor nicknamed Patty Ice"] },
  { player:"Ben Hogan", sport:"⛳ Golf", answer:"BEN HOGAN", era:"legends", stats:{WINS:"5",MAJORS:"3",AVG:"69.3",YEAR:"1953"}, ctx:"1953 PGA Tour Season — Won three majors in one year", clues:["Won 3 majors in one year","Could not attempt the Grand Slam due to scheduling conflicts","Had survived a near-fatal car accident years earlier","Considered one of the greatest ball-strikers ever"] },
  { player:"Sam Snead", sport:"⛳ Golf", answer:"SAM SNEAD", era:"legends", stats:{WINS:"18",MAJORS:"3",EARN:"$620K",YEAR:"1950"}, ctx:"Career — Most PGA Tour wins ever", clues:["Won 82 PGA Tour events — the most ever","Won 7 major championships in his career","From Hot Springs, Virginia","Was known for his smooth, effortless swing"] },
  { player:"Byron Nelson", sport:"⛳ Golf", answer:"BYRON NELSON", era:"legends", stats:{WINS:"18",STREAK:"11",AVG:"68.33",YEAR:"1945"}, ctx:"1945 PGA Tour Season — Greatest season in golf history", clues:["Won 18 tournaments in one season — all-time record","Won 11 consecutive tournaments — all-time record","Played mostly during World War II era","His record may never be broken"] },
  { player:"Arnold Palmer", sport:"⛳ Golf", answer:"ARNOLD PALMER", era:"legends", stats:{WINS:"7",MAJORS:"3",EARN:"$1.8M",YEAR:"1962"}, ctx:"Career — Arnie's Army built golf's popularity", clues:["Won 7 major championships in his career","Was the first golfer to earn over 1 million dollars in career prize money","From Latrobe, Pennsylvania","With Jack Nicklaus and Gary Player formed golf's Big Three"] },
  { player:"Gary Player", sport:"⛳ Golf", answer:"GARY PLAYER", era:"legends", stats:{WINS:"9",MAJORS:"3",SLAM:"1",YEAR:"1965"}, ctx:"Career — First non-American to win Masters", clues:["Won all 4 majors in his career (Grand Slam)","Won 9 major championships total","From Johannesburg, South Africa","Won 9 major championships across three different decades of competition"] },
  { player:"Gene Sarazen", sport:"⛳ Golf", answer:"GENE SARAZEN", era:"legends", stats:{MAJORS:"7",SLAM:"1",SHOT:"1",YEAR:"1935"}, ctx:"Career — First Grand Slam champion", clues:["Won all 4 majors in his career — the first to do so","Invented the sand wedge","Made the shot heard round the world — a double eagle at the 1935 Masters","Won 7 major championships in his career"] },
  { player:"Walter Hagen", sport:"⛳ Golf", answer:"WALTER HAGEN", era:"legends", stats:{MAJORS:"11",PGA:"5",BRIT:"4",YEAR:"1928"}, ctx:"Career — 1920s dominant era", clues:["Won 11 major championships in his career","Won 5 consecutive PGA Championships (1924-27)","Was the first golfer to earn $1 million","Was famous for his showmanship and stylish appearance"] },
  { player:"Bobby Jones", sport:"⛳ Golf", answer:"BOBBY JONES", era:"legends", stats:{MAJORS:"13",SLAM:"1",YEAR:"1930",AMATEUR:"5"}, ctx:"1930 Season — The Impregnable Quadrilateral", clues:["Retired from competitive golf at age 28 to practice law — never turning professional","Was an amateur who never turned professional","Won 13 major championships (5 US Amateurs + 4 US Opens + 4 Opens)","Founded Augusta National Golf Club and The Masters"] },
  { player:"Alexander Ovechkin", sport:"🏒 NHL", answer:"OVI", era:"modern", stats:{G:"65",AST:"47",PTS:"112",PIM:"50"}, ctx:"2007-08 NHL Season — Hart Trophy MVP", clues:["This season took place during the 2007 NHL campaign","Scored 65 goals — one of the highest totals ever","Was born in Moscow Russia and is widely considered the greatest goal scorer in NHL history","From Moscow, Russia"] },
  { player:"Henrik Lundqvist", sport:"🏒 NHL", answer:"LUNDQVIST", era:"modern", stats:{GAA:"1.97","SV%":".936",W:"43",TEAM:"Rangers"}, ctx:"2011-12 NHL Season — New York Rangers Vezina winner", clues:["His career save percentage was .920 over his career","The Rangers ended a 54-year championship drought when they won the Cup in 1994","Swedish goaltender nicknamed The King","Led the Rangers to the Stanley Cup Final in 2014"] },
  { player:"Martin Brodeur", sport:"🏒 NHL", answer:"BRODEUR", era:"modern", stats:{GAA:"2.02","SV%":".917",W:"38",TEAM:"Devils"}, ctx:"2006-07 NHL Season — New Jersey Devils Vezina winner", clues:["Holds the all-time records for wins, shutouts, and games played by a goalie","The Devils won 3 Stanley Cups with one of the most defensively dominant teams ever","All-time NHL leader in wins, shutouts, and games played","Won 3 Stanley Cups with the Devils"] },
  { player:"Evgeni Malkin", sport:"🏒 NHL", answer:"MALKIN", era:"modern", stats:{G:"11",AST:"24",PTS:"36",GP:"24"}, ctx:"2009 Stanley Cup Finals MVP — Pittsburgh Penguins", clues:["Was the goaltender for the Detroit Red Wings dynasty that won four Stanley Cups in six years in the 1990s","The Penguins won back-to-back Cups in 2016 and 2017 behind Crosby and Malkin","From Magnitogorsk, Russia","Won 3 Stanley Cups with the Penguins"] },
  { player:"Victor Hedman", sport:"🏒 NHL", answer:"HEDMAN", era:"modern", stats:{G:"3",AST:"7",PTS:"10",YEAR:"2021"}, ctx:"2021 Stanley Cup Finals MVP — Tampa Bay Lightning", clues:["Won the Conn Smythe Trophy as playoff MVP","The Lightning won back-to-back Cups in 2020 and 2021 with one of the sport's best rosters","Swedish defenseman won 2 consecutive Stanley Cups","From Ornskoldsvik, Sweden"] },
  { player:"Carey Price", sport:"🏒 NHL", answer:"PRICE", era:"modern", stats:{GAA:"1.96","SV%":".933",W:"44",TEAM:"Canadiens"}, ctx:"2014-15 NHL Season — Montreal Canadiens MVP", clues:["Won the Hart, Vezina, and Ted Lindsay Award this season","The Canadiens have won the Stanley Cup 24 times — by far the most of any franchise","From Anahim Lake, British Columbia — of First Nations descent","Considered one of the best goaltenders of his era"] },
  { player:"Jarome Iginla", sport:"🏒 NHL", answer:"IGINLA", era:"modern", stats:{G:"52",AST:"44",PTS:"96",PIM:"62"}, ctx:"2001-02 NHL Season — Calgary Flames Art Ross Trophy", clues:["Led the Flames to a 52-win season","The Flames relocated from Atlanta in 1980 and won the Stanley Cup in 1989","Won 2 Olympic gold medals with Canada","One of the greatest Flames players ever"] },
  { player:"Joe Thornton", sport:"🏒 NHL", answer:"THORNTON", era:"modern", stats:{G:"29",AST:"96",PTS:"125",PIM:"61"}, ctx:"2005-06 NHL Season — San Jose Sharks MVP", clues:["Won the Hart Trophy and Art Ross Trophy after being traded mid-season","Set the San Jose Sharks franchise records","Nicknamed Jumbo Joe for his size","From St. Thomas, Ontario"] },
  { player:"Dany Heatley", sport:"🏒 NHL", answer:"HEATLEY", era:"modern", stats:{G:"50",AST:"53",PTS:"103",PIM:"74"}, ctx:"2005-06 NHL Season — Ottawa Senators All-Star", clues:["Scored 50 goals and 103 points this season","The current Senators franchise was revived in 1992 — the original Ottawa team folded in 1934","Won Olympic gold with Canada in 2002 and 2010","From Freiburg, Germany — raised in Calgary"] },
  { player:"Patrick Roy", sport:"🏒 NHL", answer:"PATRICK ROY", era:"classic", stats:{GAA:"1.70","SV%":".934",W:"16",PLAYOFF:""}, ctx:"1993 Stanley Cup Finals MVP — Montreal Canadiens", clues:["Won Conn Smythe Trophy as playoff MVP","Montreal Canadiens won the Stanley Cup","Won 4 Stanley Cups and 3 Conn Smythe Trophies","His last name is pronounced Wah not Roy"] },
  { player:"Bryan Trottier", sport:"🏒 NHL", answer:"TROTTIER", era:"classic", stats:{G:"47",AST:"77",PTS:"134",PIM:"68"}, ctx:"1978-79 NHL Season — New York Islanders MVP", clues:["Won the Hart Trophy as league MVP","The Islanders won 4 consecutive Stanley Cups from 1980 to 1983 — a dynasty often overlooked","Won 4 consecutive Stanley Cups with the Islanders","Was inducted into the Hall of Fame in 1997"] },
  { player:"Al MacInnis", sport:"🏒 NHL", answer:"MACINNIS", era:"classic", stats:{G:"28",AST:"75",PTS:"103",PIM:"93"}, ctx:"1993-94 NHL Season — Calgary Flames", clues:["Was known for having one of the hardest shots in NHL history","The Blues won their first Cup in 2019 after 52 years of trying — while Gloria played in the arena","Won the Conn Smythe Trophy in 1989","From Inverness, Nova Scotia"] },
  { player:"Steve Yzerman", sport:"🏒 NHL", answer:"CAPTAIN YZERMAN", era:"classic", stats:{G:"51",AST:"57",PTS:"108",PIM:"54"}, ctx:"1989-90 NHL Season — Detroit Red Wings captain", clues:["Led the Red Wings with 51 goals and 108 points","Was named captain at age 21 — the youngest in Wings history","Won 3 Stanley Cups as captain in the late 1990s","Led the team through a major rebuilding period"] },
  { player:"Bobby Orr", sport:"🏒 NHL", answer:"BOBBY ORR", era:"classic", stats:{G:"46",AST:"102",PTS:"148",PM:"+124"}, ctx:"1970-71 NHL Season — Boston Bruins", clues:["Defenseman who led the entire league in scoring","The Bruins have the second most Stanley Cup championships in NHL history","Revolutionized the defenseman position","Won 8 consecutive Norris Trophies as best defenseman"] },
  { player:"Gordie Howe", sport:"🏒 NHL", answer:"MR HOCKEY", era:"legends", stats:{G:"49",AST:"46",PTS:"95",PIM:"72"}, ctx:"1952-53 NHL Season — Detroit Red Wings", clues:["Known as Mr. Hockey","The Red Wings won 4 Cups in 11 years forming the last great NHL dynasty","Played in 5 different decades","Played professional hockey in five different decades — from the 1940s through the 1970s"] },
  { player:"Bobby Hull", sport:"🏒 NHL", answer:"BOBBY HULL", era:"legends", stats:{G:"54",AST:"43",PTS:"97",PIM:"70"}, ctx:"1965-66 NHL Season — Chicago Blackhawks", clues:["Scored 54 goals — the first player to score 50 twice","The Blackhawks won 3 Cups in 6 years forming the most recent NHL dynasty","Known as The Golden Jet for his speed and blonde hair","Was the first player to score 50 goals in a season twice"] },
  { player:"Jean Beliveau", sport:"🏒 NHL", answer:"JEAN BELIVEAU", era:"legends", stats:{G:"37",AST:"69",PTS:"106",PIM:"38"}, ctx:"1964-65 NHL Season — Montreal Canadiens MVP", clues:["Won the Hart Trophy as league MVP","Won 10 Stanley Cups as a player","The Canadiens have won the Stanley Cup 24 times — by far the most of any franchise","Was offered the position of Governor General of Canada — he declined"] },
  { player:"Maurice Richard", sport:"🏒 NHL", answer:"THE ROCKET", era:"legends", stats:{G:"50",AST:"25",PTS:"75",PIM:"75"}, ctx:"1944-45 NHL Season — Montreal Canadiens", clues:["First player to score 50 goals in 50 games — a record for 36 years","The Canadiens have won the Stanley Cup 24 times — by far the most of any franchise","Nicknamed The Rocket","His suspension in 1955 triggered a full-scale riot in Montreal — a defining moment in Quebec history"] },
  { player:"Terry Sawchuk", sport:"🏒 NHL", answer:"SAWCHUK", era:"legends", stats:{GAA:"1.90",SO:"12",W:"44",YEAR:"1952"}, ctx:"1951-52 NHL Season — Detroit Red Wings Vezina winner", clues:["Posted a goals-against average of 1.90 — among the best of their time","All-time NHL leader in shutouts (103)","The Red Wings won 4 Cups in 11 years forming the last great NHL dynasty","Won 4 Stanley Cups in his career"] },
  { player:"Jacques Plante", sport:"🏒 NHL", answer:"PLANTE", era:"legends", stats:{GAA:"2.11",SO:"82",VEZINA:"7",MASK:"1"}, ctx:"Career — Inventor of the goalie mask", clues:["Was the first goaltender to regularly wear a mask after being cut by a shot in 1959","Won 7 Vezina Trophies as best goaltender","Won 6 Stanley Cups with Montreal Canadiens","Revolutionized goaltending by being the first to roam from the crease"] },
  { player:"Tim Horton", sport:"🏒 NHL", answer:"TIM HORTON", era:"legends", stats:{G:"18",AST:"38",PTS:"56",YEAR:"1964"}, ctx:"Career — Toronto Maple Leafs defenseman", clues:["Was considered one of the strongest players in NHL history","Was so strong he once reportedly bent the steering wheel of a car with his bare hands","Died in a car accident in 1974 while still playing","One of Canada's most popular fast food chains was founded in his honour after his death"] },
  { player:"Bernie Geoffrion", sport:"🏒 NHL", answer:"BOOM BOOM", era:"legends", stats:{G:"50",AST:"45",PTS:"95",YEAR:"1961"}, ctx:"1960-61 NHL Season — Montreal Canadiens", clues:["Was the second player to score 50 goals in a season","Nicknamed Boom Boom for the sound of his slapshot","Won 6 Stanley Cups with Montreal Canadiens","Is credited with popularizing the slapshot"] },
  { player:"Syl Apps", sport:"🏒 NHL", answer:"SYL APPS", era:"legends", stats:{G:"29",AST:"30",PTS:"59",YEAR:"1942"}, ctx:"Career — Toronto Maple Leafs captain", clues:["Won 3 Stanley Cups and was known as one of the cleanest players ever","Won 3 Stanley Cups with Toronto","Was also a pole vaulter who competed in the 1936 Olympics","Won the Lady Byng Trophy for clean play multiple times"] },
  { player:"Clint Benedikt", sport:"🏒 NHL", answer:"BENEDICT", era:"legends", stats:{GAA:"1.50",SO:"15",YEAR:"1926",TEAM:"Maroons"}, ctx:"1925-26 NHL Season — Montreal Maroons Vezina winner", clues:["Won the Stanley Cup with Montreal Maroons this year","Was the first goaltender to wear a mask in an NHL game (1930)","Won 4 Stanley Cups in his career","Was known for flopping to the ice — causing rule changes"] },
  { player:"Duke Keats", sport:"🏒 NHL", answer:"DUKE KEATS", era:"legends", stats:{G:"31",AST:"22",PTS:"53",YEAR:"1922"}, ctx:"1921-22 WCHL Season — Edmonton Eskimos", clues:["Was the best player in the Western Canada Hockey League","Was called the best hockey player of the 1920s by many experts","Was known for his great stickhandling and scoring ability","This season took place during the 1921 NHL campaign"] },
  { player:"Hooley Smith", sport:"🏒 NHL", answer:"HOOLEY SMITH", era:"legends", stats:{G:"200",YEAR:"1934",TEAM:"Maroons",CUP:"1"}, ctx:"Career — Rough and rugged Montreal Maroons champion", clues:["Played in an era where players went both ways for the full 60 minutes without substitution","Was known as one of the toughest players of his era","Was considered one of the most complete two-way players in the early NHL era","Was inducted into the Hockey Hall of Fame in 1972"] },
  { player:"Zion Williamson", sport:"🏀 NBA", answer:"ZION", era:"modern", stats:{PICK:"1",YEAR:"2019",TEAM:"New Orleans Pelicans",SCHOOL:"Duke"}, ctx:"2019 NBA Draft — #1 Overall Pick", clues:["Had a famous Nike shoe blowout in college that went viral","Played one season at Duke University","Weighed 285 pounds but moved like a guard","Was selected first overall by the New Orleans Pelicans in the 2019 NBA Draft"] },
  { player:"Andrew Wiggins", sport:"🏀 NBA", answer:"WIGGINS DRAFT", era:"modern", stats:{PICK:"1",YEAR:"2014",TEAM:"Cleveland Cavaliers",SCHOOL:"Kansas"}, ctx:"2014 NBA Draft — #1 Overall Pick", clues:["Was traded on draft night for Kevin Love","Won an NBA championship with the Golden State Warriors in 2022","Played one season at Kansas University","From Thornhill, Ontario, Canada"] },
  { player:"Anthony Davis", sport:"🏀 NBA", answer:"AD DRAFT", era:"modern", stats:{PICK:"1",YEAR:"2012",TEAM:"New Orleans Hornets",SCHOOL:"Kentucky"}, ctx:"2012 NBA Draft — #1 Overall Pick", clues:["Won the NCAA championship at Kentucky before being drafted","Played one season at Kentucky and won the national championship","Was 19 years old when drafted","Known for his unibrow which became an iconic feature"] },
  { player:"Karl-Anthony Towns", sport:"🏀 NBA", answer:"KAT DRAFT", era:"modern", stats:{PICK:"1",YEAR:"2015",TEAM:"Timberwolves",SCHOOL:"Kentucky"}, ctx:"2015 NBA Draft — #1 Overall Pick", clues:["Was considered the most skilled big man prospect in years","Played one season at Kentucky","From Piscataway, New Jersey — of Dominican descent","Is from the Dominican Republic — one of the few Dominican-born NBA stars"] },
  { player:"Ben Simmons", sport:"🏀 NBA", answer:"SIMMONS DRAFT", era:"modern", stats:{PICK:"1",YEAR:"2016",TEAM:"Philadelphia 76ers",SCHOOL:"LSU"}, ctx:"2016 NBA Draft — #1 Overall Pick", clues:["Did not play his rookie year due to a foot injury","Played one season at LSU but did not play his rookie year due to injury","From Melbourne, Australia","Was known for refusing to shoot three-pointers"] },
  { player:"Markelle Fultz", sport:"🏀 NBA", answer:"FULTZ", era:"modern", stats:{PICK:"1",YEAR:"2017",TEAM:"Philadelphia 76ers",SCHOOL:"Washington"}, ctx:"2017 NBA Draft — #1 Overall Pick", clues:["Had a mysterious shooting problem in his first season that baffled everyone","Was the first #1 pick by Philadelphia since Allen Iverson in 1996","Played one season at the University of Washington","Boston gave up the pick that became him in exchange for Isaiah Thomas"] },
  { player:"Deandre Ayton", sport:"🏀 NBA", answer:"AYTON", era:"modern", stats:{PICK:"1",YEAR:"2018",TEAM:"Phoenix Suns",SCHOOL:"Arizona"}, ctx:"2018 NBA Draft — #1 Overall Pick", clues:["Was selected one pick before Luka Doncic","Played one season at the University of Arizona","From Nassau, Bahamas","Many consider the 2018 draft class one of the most talent-rich in recent memory"] },
  { player:"Victor Wembanyama", sport:"🏀 NBA", answer:"WEMBY", era:"modern", stats:{PICK:"1",YEAR:"2023",TEAM:"San Antonio Spurs",HEIGHT:"7ft4"}, ctx:"2023 NBA Draft — #1 Overall Pick", clues:["Had to serve 2 years in the US Navy before joining the team","Was 7 feet 4 inches tall with an enormous wingspan","From Le Chesnay, France","Was called a generational talent unlike anything seen before"] },
  { player:"Cade Cunningham", sport:"🏀 NBA", answer:"CUNNINGHAM DRAFT", era:"modern", stats:{PICK:"1",YEAR:"2021",TEAM:"Detroit Pistons",SCHOOL:"Oklahoma State"}, ctx:"2021 NBA Draft — #1 Overall Pick", clues:["Plays in one of the smallest markets in the NBA","Played one season at Oklahoma State","From Montverde, Florida","Was considered the face of the rebuilding Detroit franchise"] },
  { player:"Peyton Manning", sport:"🏈 NFL", answer:"PEYTON DRAFT", era:"classic", stats:{PICK:"1",YEAR:"1998",TEAM:"Indianapolis Colts",SCHOOL:"Tennessee"}, ctx:"1998 NFL Draft — #1 Overall Pick", clues:["Won the Outland Trophy and Lombardi Award in college","Ryan Leaf was the #2 pick — one of the biggest draft busts ever","Played at the University of Tennessee","The Colts chose him over Ryan Leaf in one of the most debated picks ever"] },
  { player:"Andrew Luck", sport:"🏈 NFL", answer:"LUCK DRAFT", era:"modern", stats:{PICK:"1",YEAR:"2012",TEAM:"Indianapolis Colts",SCHOOL:"Stanford"}, ctx:"2012 NFL Draft — #1 Overall Pick", clues:["Won the Outland Trophy and Lombardi Award as the best lineman in the country","Was considered the safest QB prospect since Peyton Manning","Played at Stanford University","Retired suddenly at age 29 due to injuries — shocking the football world"] },
  { player:"Cam Newton", sport:"🏈 NFL", answer:"CAM DRAFT", era:"modern", stats:{PICK:"1",YEAR:"2011",TEAM:"Carolina Panthers",SCHOOL:"Auburn"}, ctx:"2011 NFL Draft — #1 Overall Pick", clues:["Won the Heisman Trophy at Auburn the year before","From College Park Georgia — was drafted by the Colorado Rockies out of high school","Won the Super Bowl MVP in the 2015 season","Was 6ft 5in and 245 pounds — a new prototype for the QB position"] },
  { player:"Jameis Winston", sport:"🏈 NFL", answer:"WINSTON DRAFT", era:"modern", stats:{PICK:"1",YEAR:"2015",TEAM:"Tampa Bay Buccaneers",SCHOOL:"Florida State"}, ctx:"2015 NFL Draft — #1 Overall Pick", clues:["His career was plagued by inconsistency despite the hype","Won the Heisman Trophy at Florida State","Was a two-sport athlete — also played baseball","Tampa Bay chose him over Marcus Mariota who went #2"] },
  { player:"Sam Bradford", sport:"🏈 NFL", answer:"BRADFORD DRAFT", era:"modern", stats:{PICK:"1",YEAR:"2010",TEAM:"St. Louis Rams",SCHOOL:"Oklahoma"}, ctx:"2010 NFL Draft — #1 Overall Pick", clues:["Signed the richest rookie contract in history at the time","Won the Heisman Trophy at Oklahoma","Suffered multiple serious knee injuries that derailed what looked like a promising career","Had a career plagued by torn ACLs in both knees"] },
  { player:"Baker Mayfield", sport:"🏈 NFL", answer:"MAYFIELD DRAFT", era:"modern", stats:{PICK:"1",YEAR:"2018",TEAM:"Cleveland Browns",SCHOOL:"Oklahoma"}, ctx:"2018 NFL Draft — #1 Overall Pick", clues:["Was known for planting a flag at Ohio State's field after a win","Won the Heisman Trophy at Oklahoma","Was a walk-on at Oklahoma before earning a scholarship","Was known for his brash confidence and flag-planting at Ohio State"] },
  { player:"Kyler Murray", sport:"🏈 NFL", answer:"KYLER DRAFT", era:"modern", stats:{PICK:"1",YEAR:"2019",TEAM:"Arizona Cardinals",SCHOOL:"Oklahoma"}, ctx:"2019 NFL Draft — #1 Overall Pick", clues:["Was only 5ft 10in — the shortest #1 pick in NFL Draft history","Had also been drafted by the Oakland A's in baseball","Won the Heisman Trophy at Oklahoma","Also played minor league baseball for the Oakland A's before choosing the NFL"] },
  { player:"Trevor Lawrence", sport:"🏈 NFL", answer:"TREVOR DRAFT", era:"modern", stats:{PICK:"1",YEAR:"2021",TEAM:"Jacksonville Jaguars",SCHOOL:"Clemson"}, ctx:"2021 NFL Draft — #1 Overall Pick", clues:["Had been called generational since high school","Was considered the most sure-fire QB prospect since Luck","Led Clemson to a national championship","Was referred to as a generational quarterback talent coming out of high school"] },
  { player:"John Elway", sport:"🏈 NFL", answer:"ELWAY DRAFT", era:"classic", stats:{PICK:"1",YEAR:"1983",TEAM:"Baltimore Colts",TRADE:"Denver"}, ctx:"1983 NFL Draft — #1 Overall Pick refused to play for Colts", clues:["Was famously traded to Denver after refusing to play for the team that drafted him","Threatened to play baseball for the New York Yankees instead","Was traded to the Denver Broncos","The 1983 QB class also included Marino, Kelly, Marino, and Eason"] },
  { player:"Bo Jackson", sport:"🏈 NFL", answer:"BO JACKSON", era:"classic", stats:{PICK:"1",YEAR:"1986",TEAM:"Tampa Bay Buccaneers",REFUSE:"Yes"}, ctx:"1986 NFL Draft — #1 Overall Pick who refused to play", clues:["Was selected #1 by Tampa Bay Buccaneers but refused to play for them","Was declared ineligible for the next draft class","Chose baseball — played for the Kansas City Royals","Was eventually drafted by the Raiders in 1987 and became a legend playing both sports"] },
  { player:"Troy Aikman", sport:"🏈 NFL", answer:"AIKMAN DRAFT", era:"classic", stats:{PICK:"1",YEAR:"1989",TEAM:"Dallas Cowboys",SCHOOL:"UCLA"}, ctx:"1989 NFL Draft — #1 Overall Pick", clues:["Won 3 Super Bowls with Dallas after being picked from a 1-15 team","Played at UCLA after transferring from Oklahoma","Won 3 Super Bowls with the Dallas Cowboys","Was selected by a Cowboys team that went 1-15 the year before"] },
  { player:"Russell Maryland", sport:"🏈 NFL", answer:"MARYLAND DRAFT", era:"classic", stats:{PICK:"1",YEAR:"1991",TEAM:"Dallas Cowboys",SCHOOL:"Miami"}, ctx:"1991 NFL Draft — #1 Overall Pick", clues:["Was considered surprising as a DT going #1 overall","Played defensive tackle at the University of Miami","Won 3 Super Bowls with Dallas","Was considered surprising as a DT going #1"] },
  { player:"Marcus Mariota", sport:"🏈 NFL", answer:"MARIOTA HEISMAN", era:"modern", stats:{YDS:"4454",TD:"42",INT:"2",RTG:"186.0"}, ctx:"2014 Heisman Trophy — University of Oregon", clues:["Threw 42 touchdowns against just 2 interceptions","Had a 42:2 TD to INT ratio","From Honolulu, Hawaii","Went #2 overall in the 2015 NFL Draft"] },
  { player:"Robert Griffin III", sport:"🏈 NFL", answer:"RG3 HEISMAN", era:"modern", stats:{YDS:"4293",TD:"37",INT:"6",RTG:"189.5"}, ctx:"2011 Heisman Trophy — Baylor University", clues:["Was the first Heisman winner in Baylor history","Had a 37:6 TD to INT ratio","Made the Redskins pay a record 3 first-round picks to move up to #2","From Copperas Cove, Texas"] },
  { player:"Barry Sanders", sport:"🏈 NFL", answer:"SANDERS HEISMAN", era:"classic", stats:{CAR:"344",YDS:"2628",TD:"39",AVG:"7.6"}, ctx:"1988 Heisman Trophy — Oklahoma State", clues:["Rushed for 2628 yards — one of the greatest individual college seasons ever","Rushed for 2628 yards in a single season","Played at Oklahoma State","Some consider it the greatest individual college football season ever"] },
  { player:"Cal Ripken Jr.", sport:"⚾ MLB", answer:"RIPKEN STREAK", era:"classic", stats:{STREAK:"2131",DATE:"Sept 6 1995",PREV:"2130",TEAM:"Baltimore"}, ctx:"Sept 6 1995 — Breaking Lou Gehrig's consecutive games record", clues:["Played every single game through knee injuries back problems and near-exhaustion","The Orioles were a model franchise through the 1960s and 70s under manager Earl Weaver","The crowd gave him a 22-minute standing ovation","His streak eventually reached 2632 games"] },
  { player:"Roger Maris", sport:"⚾ MLB", answer:"MARIS HR", era:"legends", stats:{HR:"61",AVG:".269",RBI:"142",YEAR:"1961"}, ctx:"1961 MLB Season — Breaking Babe Ruth's home run record", clues:["Won the AL MVP despite being resented by some fans who felt he was tarnishing a legend","The Yankees have won 27 World Series championships — by far the most of any team","His record stood for 37 years until 1998","Was not celebrated at the time — many wanted Ruth's record to stand"] },
  { player:"Hank Aaron", sport:"⚾ MLB", answer:"AARON 715", era:"classic", stats:{HR:"715",DATE:"April 8 1974",TEAM:"Atlanta",PITCH:"Al Downing"}, ctx:"April 8 1974 — Breaking Babe Ruth's all-time home run record", clues:["Received death threats and needed a bodyguard during his record-breaking chase","Was also an outstanding throwing arm — considered the best ever in right field","Had received death threats leading up to the record","Was still active in baseball as a coach when Barry Bonds eventually surpassed his record"] },
  { player:"Michael Phelps", sport:"🏊 Olympics", answer:"PHELPS", era:"modern", stats:{GOLD:"8",EVENTS:"8",WORLD:"7",YEAR:"2008"}, ctx:"2008 Beijing Olympics — Greatest Olympic performance ever", clues:["Won 8 gold medals in a single Olympics — an all-time record","Set 7 world records during the Games","Swam in Beijing, China","His 8 golds broke Mark Spitz's 36-year-old record of 7"] },
  { player:"Usain Bolt", sport:"🏃 Olympics", answer:"BOLT", era:"modern", stats:{TIME:"9.58",EVENT:"100m",YEAR:"2009",WIND:"+0.9"}, ctx:"2009 World Championships — 100m world record", clues:["Set the world record for the 100m sprint at 9.58 seconds","Won at the World Championships in Berlin","From Trelawny Parish, Jamaica","Also holds the 200m world record at 19.19 seconds"] },
  { player:"Jesse Owens", sport:"🏃 Olympics", answer:"OWENS", era:"legends", stats:{GOLD:"4",EVENTS:"4",YEAR:"1936",CITY:"Berlin"}, ctx:"1936 Berlin Olympics — Four gold medals", clues:["Won 4 gold medals at the Berlin Olympics under Hitler's watch","Won the 100m, 200m, long jump, and 4x100m relay","From Oakville, Alabama","His performance was a direct rebuke to Nazi racial ideology"] },
  { player:"Simone Biles", sport:"🤸 Olympics", answer:"BILES", era:"modern", stats:{GOLD:"4",MEDALS:"4",YEAR:"2016",COUNTRY:"USA"}, ctx:"2016 Rio Olympics — Four gold medals in gymnastics", clues:["Won 4 gold medals at the 2016 Rio Olympics","Is widely considered the greatest gymnast ever","From Spring, Texas","Has skills named after her in the gymnastics code of points"] },
  { player:"Carl Lewis", sport:"🏃 Olympics", answer:"CARL LEWIS", era:"classic", stats:{GOLD:"4",EVENTS:"4",YEAR:"1984",CITY:"Los Angeles"}, ctx:"1984 Los Angeles Olympics — Four gold medals", clues:["Was also an All-American long jumper who set a world record that stood for over a decade","Won the 100m, 200m, long jump, and 4x100m relay","From Birmingham, Alabama","Was compared to Jesse Owens for his historic performance"] },
  { player:"Nate Archibald", sport:"🏀 NBA", answer:"NATE ARCHIBALD", era:"classic", stats:{PTS:"34.0",AST:"11.4",YEAR:"1973",FEAT:"Led NBA in pts and assists same year"}, ctx:"1972-73 NBA Season — Only player to lead NBA in scoring AND assists", clues:["Overcame a difficult childhood in the South Bronx to become an NBA star","Averaged 34.0 points per game during this season","Nicknamed Tiny because he was only 6 feet tall","Later won an NBA championship with the Boston Celtics"] },
  { player:"David Tyree", sport:"🏈 NFL", answer:"TYREE HELMET", era:"modern", stats:{REC:"1",YDS:"32",HELMET_CATCH:"vs Giants",GAME:"SB XLII"}, ctx:"Super Bowl XLII — The Helmet Catch", clues:["Was one of the most accomplished players of their generation","Accumulated 32 yards during this historic season","The catch set up the winning touchdown to upset the undefeated Patriots","Only had 4 career NFL receptions — this was his most famous"] },
  { player:"Lance Armstrong", sport:"🚴 Olympics", answer:"ARMSTRONG TDF", era:"classic", stats:{WINS:"7",YEARS:"1999-2005",CANCER:"1996",STRIPPED:"Yes"}, ctx:"1999-2005 Tour de France — Seven consecutive wins (later stripped)", clues:["Won the Tour de France 7 consecutive times","Had survived testicular cancer that spread to his brain and lungs in 1996","Was later stripped of all 7 titles for doping","His story was considered one of sport's greatest comebacks before the scandal"] },
  { player:"Kirk Gibson", sport:"⚾ MLB", answer:"GIBSON HR", era:"classic", stats:{PH:"1",HR:"1",COUNT:"3-2",OUT:"2"}, ctx:"1988 World Series Game 1 — Pinch hit walk-off home run", clues:["Was so physically damaged entering that World Series game he could barely walk to the plate","Could barely walk to the plate","Pumped his fist around the bases in one of sports most iconic moments","The Dodgers moved from Brooklyn to Los Angeles in 1958 breaking New York hearts"] },
  { player:"Elgin Baylor", sport:"🏀 NBA", answer:"ELGIN BAYLOR", era:"legends", stats:{PTS:"27.4",REB:"13.5",AST:"4.3",ALLSTAR:"11"}, ctx:"Career Totals — Los Angeles Lakers legend who never won a title", clues:["Was an 11x All-Star who never won an NBA championship","The Lakers have won more NBA championships than almost any other team","Was known for his graceful mid-air moves years before anyone had a name for them","Retired 9 games before his team finally won the title"] },
  { player:"Ryan Howard", sport:"⚾ MLB", answer:"RYAN HOWARD", era:"modern", stats:{HR:"58",RBI:"149",AVG:".313",SO:"181"}, ctx:"Best Season — 2006 Philadelphia Phillies NL MVP", clues:["Won the NL MVP leading the NL in home runs with 58","Was a massive left-handed power hitter","Won the World Series with the Phillies in 2008","From St. Louis Missouri"] },
  { player:"Prince Fielder", sport:"⚾ MLB", answer:"PRINCE FIELDER", era:"modern", stats:{HR:"50",RBI:"119",AVG:".288",OBP:".395"}, ctx:"2007 MLB Season — Milwaukee Brewers 50 HR season at age 23", clues:["Hit 50 home runs for the Milwaukee Brewers at age 23","His father was also an MLB slugger who hit 51 home runs in a season for the Detroit Tigers","Was a vegetarian despite his powerful build","Had one of the most feared left-handed swings of his era"] },
  { player:"Carlos Beltran", sport:"⚾ MLB", answer:"CARLOS BELTRAN", era:"modern", stats:{HR:"38",RBI:"116",AVG:".275",SB:"42"}, ctx:"2004 MLB Season — Kansas City Royals 5-tool All-Star", clues:["Was a 5-tool player who hit for power average and speed","Switch hitter from Manati Puerto Rico","Was one of the best postseason performers in baseball history","Later became a manager for the New York Mets"] },
  { player:"Gianluigi Buffon", sport:"⚽ Soccer", answer:"GIANLUIGI BUFFON", era:"modern", stats:{CS:"22",APP:"38",SERIE_A:"8",WC:"2006"}, ctx:"Career Totals — Juventus and Italy greatest goalkeeper", clues:["Won the World Cup with Italy in 2006","Was the best goalkeeper in the world for over a decade","From Carrara Italy","Won 8 Serie A titles with Juventus"] },
  { player:"Thierry Henry", sport:"⚽ Soccer", answer:"THIERRY HENRY", era:"modern", stats:{G:"30",APP:"37",YEAR:"2004",INV:"Arsenal Invincibles"}, ctx:"Best Season — 2003-04 Arsenal Invincibles unbeaten season", clues:["Was converted from a winger to a striker by Arsene Wenger at Arsenal","Won PFA Players Player of the Year twice consecutively","French striker considered arguably the best in Premier League history","From Les Ulis France"] },
  { player:"Raul Gonzalez", sport:"⚽ Soccer", answer:"RAUL GONZALEZ", era:"classic", stats:{G:"323",APP:"741",UCL:"3",GOALS:"228 for Real Madrid"}, ctx:"Career Totals — Real Madrid greatest legend", clues:["Was Real Madrid all-time top scorer for many years","Won 3 Champions Leagues with Real Madrid","From Madrid Spain","Wore the famous number 7 shirt before Cristiano Ronaldo took it"] },
  { player:"Ryan Giggs", sport:"⚽ Soccer", answer:"RYAN GIGGS", era:"classic", stats:{G:"168",AST:"271",APP:"963",TITLES:"13"}, ctx:"Career Totals — Manchester United most decorated player ever", clues:["Won 13 Premier League titles with Manchester United","Scored one of the greatest individual FA Cup goals ever vs Arsenal in 1999","From Cardiff Wales","Was the only player to play in every single Premier League season for many years"] },
  { player:"Roy Keane", sport:"⚽ Soccer", answer:"ROY KEANE", era:"classic", stats:{G:"33",APP:"480",TREBLE:"1999",NATION:"Ireland"}, ctx:"Career Totals — Manchester United captain who won the Treble", clues:["His autobiography is considered the most brutally honest book ever written by a footballer","Was sent off in the Champions League semi-final so missed the Final","From Cork Ireland","Is considered one of the greatest and most combative midfielders ever"] },
  { player:"Stan Wawrinka", sport:"🎾 ATP", answer:"STAN WAWRINKA", era:"modern", stats:{GRAND_SLAMS:"3",TITLES:"16",BEST_RANK:"3",YEAR:"2015"}, ctx:"Career Totals — Swiss champion with 3 different Grand Slams", clues:["Won 3 Grand Slam titles — Australian French and US Opens","Had a career peak ranking of World No. 3","From Lausanne Switzerland","Was often overshadowed by Federer but carved his own great legacy"] },
  { player:"Marin Cilic", sport:"🎾 ATP", answer:"MARIN CILIC", era:"modern", stats:{W:"1",GRAND_SLAMS:"1",YEAR:"2014",SETS_LOST:"1"}, ctx:"2014 US Open — Dominant Croatian champion", clues:["Won the US Open dropping only one set throughout the entire tournament","From Medjugorje Bosnia and Croatia","Was coached by Goran Ivanisevic at the time of his win","Is the only Croatian man to win a Grand Slam singles title"] },
  { player:"Corey Kluber", sport:"⚾ MLB", answer:"KLUBER", era:"modern", stats:{ERA:"2.25",W:"20",SO:"265",WHIP:"0.875"}, ctx:"2017 AL Cy Young Season — Cleveland Indians", clues:["Struck out over 200 batters for the 5th time","Struck out 265 batters","Posted an ERA of 2.25 — among the best of the season","Nicknamed Klubot for his emotionless demeanor"] },

  { player:"Felix Hernandez", sport:"⚾ MLB", answer:"FELIX", era:"modern", stats:{ERA:"2.27",W:"13",SO:"232",WHIP:"1.056"}, ctx:"2010 AL Cy Young Season — Seattle Mariners", clues:["His 1.83 ERA was despite playing for a poor offensive team","Led the AL in ERA and innings pitched","The Mariners won a record 116 games in 2001 but have never appeared in a World Series","Threw a perfect game on the final day of the 2012 season"] },

  { player:"David Ortiz", sport:"⚾ MLB", answer:"ORTIZ", era:"modern", stats:{HR:"54",AVG:".315",RBI:"137",OPS:".978"}, ctx:"2006 MLB Season — Boston Red Sox", clues:["Hit 54 home runs this season","The Red Sox ended an 86-year championship drought known as the Curse of the Bambino","Nicknamed Big Papi","From Santo Domingo, Dominican Republic"] },

  { player:"Greg Oden", sport:"🏀 NBA", answer:"GREG ODEN", era:"modern", stats:{PICK:"1",YEAR:"2007",TEAM:"Trail Blazers",SCHOOL:"Ohio State"}, ctx:"2007 NBA Draft — #1 Overall Pick over Kevin Durant", clues:["Was selected #1 overall over Kevin Durant who went #2","The Blazers are the only major professional sports team in the state of Oregon","Had his career devastated by multiple knee surgeries","Played only 82 games in his first 4 NBA seasons"] },

  // EASY Bball Legends (need 5)
  { player:"Bob Cousy", sport:"🏀 NBA", answer:"BOB COUSY", era:"legends", stats:{AST:"7.5",RINGS:"6",MVP:"1957",TEAM:"Celtics"}, ctx:"Career Totals — The Houdini of the Hardwood won 6 rings", clues:["Nicknamed The Houdini of the Hardwood for his dribbling wizardry","Won 6 NBA championships with the Boston Celtics","Averaged 7.5 assists per game when that was considered extraordinary","Was the best point guard of his era by a wide margin"] },
  { player:"Kareem Abdul-Jabbar", sport:"🏀 NBA", answer:"KAREEM", era:"legends", stats:{PTS:"38.4",MVP:"1971",RINGS:"1",TEAM:"Bucks"}, ctx:"1970-71 NBA Season — Won MVP with Milwaukee Bucks", clues:["Won the NBA MVP in his second season","Led the Milwaukee Bucks to the NBA championship","Was one of the most dominant big men ever before moving to LA","His sky hook is considered the most unblockable shot in basketball history"] },
  { player:"Johan Cruyff", sport:"⚽ Soccer", answer:"JOHAN CRUYFF", era:"legends", stats:{BALLON:"3",NATION:"Netherlands",MOVE:"Cruyff Turn",CLUB:"Ajax/Barcelona"}, ctx:"Career Totals — Invented the Cruyff Turn and won three Ballons d Or", clues:["Was denied the 1974 World Cup winner's medal despite leading the Netherlands to the final","Won 3 Ballon d Or awards","Led the Netherlands to the 1974 World Cup Final playing Total Football","Later transformed Barcelona as a manager"] },
  { player:"Maria Sharapova", sport:"🎾 WTA", answer:"MARIA SHARAPOVA", era:"modern", stats:{GRAND_SLAMS:"5",CAREER_SLAM:"Yes",SUSPENSION:"Meldonium",NATION:"Russia"}, ctx:"Career Totals — Completed the Career Grand Slam and was the highest-paid female athlete for a decade", clues:["Was one of the most accomplished players of their generation","Was the highest-paid female athlete in the world for over a decade","Was suspended for 15 months after testing positive for meldonium","From Nyagan Russia — moved to Florida at age 7 to train"] },

  // EASY Tennis Legends (need 6)
  { player:"Chris Evert", sport:"🎾 WTA", answer:"CHRIS EVERT", era:"legends", stats:{WIN_PCT:".900",FRENCH_OPEN:"7",GRAND_SLAMS:"18",RIVAL:"Navratilova"}, ctx:"Career Totals — .900 career win percentage and 18 Grand Slams", clues:["Had a career win percentage of .900 — the highest of any professional player","Won 18 Grand Slam titles including 7 French Opens","Her rivalry with Martina Navratilova defined women's tennis for a decade","From Fort Lauderdale Florida"] },
  { player:"Martina Navratilova", sport:"🎾 WTA", answer:"NAVRATILOVA", era:"legends", stats:{WIMBLEDON:"9",GRAND_SLAMS:"18",DEFECTED:"1975",RIVAL:"Evert"}, ctx:"Career Totals — Nine Wimbledon titles and revolutionary fitness", clues:["Won Wimbledon 9 times — the most of any player in the Open Era","Defected from Czechoslovakia to the United States at age 18","Revolutionized fitness and training in women's tennis","Her rivalry with Chris Evert produced 80 matches over 16 years"] },
  { player:"Dominique Wilkins", sport:"🏀 NBA", answer:"DOMINIQUE WILKINS", era:"classic", stats:{PTS:"26.7",DUNK:"Human Highlight",ALLSTAR:"9x",TEAM:"Hawks"}, ctx:"Career Totals — The Human Highlight Film for the Atlanta Hawks", clues:["Nicknamed The Human Highlight Film for his spectacular dunking","Averaged 26.7 points per game for his career","Had legendary dunk contest battles with Michael Jordan","From Paris France but grew up in Washington State"] },
  { player:"Charles Barkley", sport:"🏀 NBA", answer:"CHARLES BARKLEY", era:"classic", stats:{PTS:"22.1",REB:"11.7",MVP:"1993",RINGS:"0"}, ctx:"Was one of the most accomplished players of their generation", clues:["Won the NBA MVP in 1993 with the Phoenix Suns","Averaged 11.7 rebounds despite being considered undersized for a power forward","Never won an NBA championship — lost in the Finals to Chicago in 1993","From Leeds Alabama — became one of the most outspoken TV analysts after retirement"] },

  // MEDIUM Baseball Classic (need 1)
  { player:"Wade Boggs", sport:"⚾ MLB", answer:"WADE BOGGS", era:"classic", stats:{AVG:".328",HITS:"3010",RING:"1996",HORSE:"Rode police horse"}, ctx:"Career Totals — Hit .328 for his career and celebrated a World Series title his own way", clues:["Hit .328 career batting average — one of the best ever","Got his 3000th hit as a home run then rode a police horse around Yankee Stadium","Won the World Series with the New York Yankees in 1996","Was famous for eating chicken before every game"] },

  // MEDIUM Baseball Legends (need 2)

  // MEDIUM Soccer Modern (need 1)
  { player:"Didier Drogba", sport:"⚽ Soccer", answer:"DIDIER DROGBA", era:"modern", stats:{UCL:"2012",G:"164",PEACE:"Cote d Ivoire",CLUB:"Chelsea"}, ctx:"Career Totals — Champions League hero who helped broker a peace deal", clues:["Scored the equalizing goal in the 2012 Champions League Final and won on penalties","His plea on national TV is credited with helping end the Ivory Coast civil war","Scored 164 goals for Chelsea — their all-time record","From Abidjan Ivory Coast"] },

  // MEDIUM Soccer Classic (need 5)
  { player:"Romario", sport:"⚽ Soccer", answer:"ROMARIO", era:"classic", stats:{G:"1000+",WC:"1994",BRAZIL:"Legends",BALLON:"1994"}, ctx:"Career Totals — Won the 1994 World Cup and claimed 1000 career goals", clues:["Won the 1994 World Cup with Brazil and was the tournament's best player","Claimed to have scored over 1000 career goals — though the count is disputed","Won the Ballon d Or in 1994","From Rio de Janeiro Brazil — was known for his clinical finishing from close range"] },
  { player:"Carlos Valderrama", sport:"⚽ Soccer", answer:"CARLOS VALDERRAMA", era:"classic", stats:{AFRO:"Iconic",CAPS:"111",NATION:"Colombia",MLS:"Tampa Bay"}, ctx:"Career Totals — Colombia's all-time leading scorer and most recognizable player", clues:["Had the most recognizable hair in football history — a giant blond afro","Was Colombia's greatest player and captained them to three World Cups","Won MLS Best XI multiple times with Tampa Bay Mutiny","From Santa Marta Colombia — nicknamed El Pibe"] },

  // MEDIUM Soccer Legends (need 12)
  { player:"Giacinto Facchetti", sport:"⚽ Soccer", answer:"GIACINTO FACCHETTI", era:"legends", stats:{EURO:"1968",WC:"1970 Final",CLUB:"Inter Milan",GOALS:"59 defender"}, ctx:"Career Totals — Invented the attacking full-back role at Inter Milan", clues:["Invented the modern attacking full-back role — changed how defenders played","Won the European Championship with Italy in 1968","Scored 59 goals as a defender — an extraordinary record","Inter are the only Italian club to have never been relegated from Serie A"] },
  { player:"Sandro Mazzola", sport:"⚽ Soccer", answer:"SANDRO MAZZOLA", era:"legends", stats:{EURO:"1968",UCL:"2",WC:"1970",FATHER:"Valentino"}, ctx:"Career Totals — Won two European Cups following in his legendary father's footsteps", clues:["Won 2 European Cups with Inter Milan","Won the European Championship with Italy in 1968","Was the son of one of Italy's greatest ever players who died in the Superga air disaster when Sandro was just six","From Milan Italy"] },
  { player:"Florian Albert", sport:"⚽ Soccer", answer:"FLORIAN ALBERT", era:"legends", stats:{BALLON:"1967",NATION:"Hungary",GOALS:"31",NICK:"Emperor"}, ctx:"Career Totals", clues:["Won the Ballon d Or in 1967 — the only Hungarian to win it after the Golden Team era","Nicknamed The Emperor for his regal style","Scored 31 goals in 75 appearances for Hungary","Played his entire career for Ferencvaros in Budapest"] },
  { player:"Carlos Alberto", sport:"⚽ Soccer", answer:"CARLOS ALBERTO", era:"legends", stats:{WC:"1970 goal",CAPTAIN:"Brazil",GOAL:"Greatest ever",TEAM:"Santos"}, ctx:"1970 World Cup Final — Brazil's captain lifts the trophy", clues:["Scored the final goal in the 1970 World Cup Final — considered the greatest team goal in history","Was the captain of the legendary 1970 Brazil World Cup team","The goal came after a move involving virtually every outfield player","This performance came at the 1970 tournament or season"] },

  // MEDIUM Golf Modern (need 2)
  { player:"Hunter Mahan", sport:"⛳ Golf", answer:"HUNTER MAHAN", era:"modern", stats:{RYDER:"Key wins",WINS:"6",WITHDREW:"For daughter's birth",NATION:"USA"}, ctx:"Career Totals — Walked away from a tournament win to be present for his daughter's birth", clues:["Famously withdrew from the Canadian Open while leading to be with his wife for the birth of their daughter","Won 6 PGA Tour events in his career","Was a key contributor to multiple US Ryder Cup victories","From Plano Texas"] },

  // MEDIUM Golf Legends (need 12)
  { player:"Novak Djokovic", sport:"🎾 ATP", answer:"NOVAK DJOKOVIC", era:"modern", stats:{GRAND_SLAMS:"24+",WEEKS_NO1:"400+",AUSTRALIA:"10x",NATION:"Serbia"}, ctx:"Career Totals — Most Grand Slams ever and most weeks at World No. 1", clues:["Has won more Grand Slam titles than any player in history","Has spent more weeks at World No. 1 than any player in tennis history","Won the Australian Open a record 10 times","From Belgrade Serbia — endured difficult childhood during the Yugoslav Wars"] },

  { player:"Kevin Durant", sport:"🏀 NBA", answer:"DURANT", era:"modern", stats:{PTS:"34.3",REB:"8",AST:"5",TEAM:"Thunder"}, ctx:"2012 NBA Finals MVP — Oklahoma City Thunder", clues:["His team lost to Miami Heat in the 2012 Finals","Was playing for Oklahoma City","Later joined Golden State Warriors","Nickname: Slim Reaper"] },

  { player:"Aaron Judge", sport:"⚾ MLB", answer:"JUDGE", era:"modern", stats:{HR:"62",AVG:".311",RBI:"131",OPS:"1.111"}, ctx:"2022 MLB Season — New York Yankees AL MVP", clues:["Set the AL single-season home run record (62)","Won the unanimous AL MVP award","The Yankees have won 27 World Series championships — by far the most of any team","From Linden, California — 6ft 7in outfielder"] },

  { player:"Bryce Harper", sport:"⚾ MLB", answer:"HARPER", era:"modern", stats:{HR:"42",AVG:".330",RBI:"100",OPS:"1.044"}, ctx:"2021 NL MVP Season — Philadelphia Phillies", clues:["Won the NL MVP with the Phillies","Hit a walk-off home run in the NLCS in 2023","The Phillies won the World Series in 2008 ending a 28-year championship drought","From Las Vegas, Nevada — was on the cover of Sports Illustrated at 16"] },

  { player:"Auston Matthews", sport:"🏒 NHL", answer:"MATTHEWS", era:"modern", stats:{G:"60",AST:"46",PTS:"106",PIM:"24"}, ctx:"2021-22 NHL Season — Toronto Maple Leafs MVP", clues:["Won the Hart Trophy as league MVP","Led the NHL in goals with 60","Was the first American-born player drafted first overall since Brian Berard in 1995","From Scottsdale, Arizona — grew up in Mexico before moving to Arizona"] },
  { player:"Randy Johnson", sport:"⚾ MLB", answer:"RANDY", era:"modern", stats:{ERA:"1.04",SO:"19",W:"3",IP:"17.1"}, ctx:"2001 World Series MVP — Arizona Diamondbacks", clues:["Won the series in a 7-game classic vs the New York Yankees dynasty","Struck out 372 batters this season","Known as The Big Unit","Left-handed pitcher standing 6ft 10in"] },
  { player:"Pedro Martinez", sport:"⚾ MLB", answer:"PEDRO", era:"classic", stats:{ERA:"2.07",SO:"313",W:"23",WHIP:"0.923"}, ctx:"1999 MLB Season — Boston Red Sox", clues:["Posted a 0.737 WHIP — the lowest in MLB history for a qualified starter","Won the Cy Young Award this year","The Red Sox ended an 86-year championship drought known as the Curse of the Bambino","From the Dominican Republic"] },
  { player:"Pedro Martinez", sport:"⚾ MLB", answer:"PEDRO MARTINEZ", era:"modern", stats:{ERA:"2.93",W:"219",CY:"3",ERA_PLUS:"154"}, ctx:"Career Totals — Highest ERA+ of any 200-win pitcher", clues:["Had an ERA+ of 154 — highest ever for a 200-win pitcher","Won 3 Cy Young Awards","From Manoguayabo Dominican Republic","Had arguably the greatest 3-year stretch in pitching history 1997-2000"] },
  { player:"Mike Piazza", sport:"⚾ MLB", answer:"PIAZZA", era:"classic", stats:{HR:"40",AVG:".362",RBI:"124",OPS:"1.070"}, ctx:"1997 MLB Season — Los Angeles Dodgers", clues:["Holds the career home run record for catchers (427)","The Dodgers moved from Brooklyn to Los Angeles in 1958 breaking New York hearts","Later hit an emotional HR after 9/11 with the Mets","Was a 62nd round draft pick"] },
  { player:"Greg Maddux", sport:"⚾ MLB", answer:"MADDUX", era:"classic", stats:{ERA:"1.56",W:"19",SO:"156",WHIP:"0.896"}, ctx:"1994 MLB Season — Atlanta Braves", clues:["Had an ERA of 1.56 this season","Won the NL Cy Young award this year","The Braves won 14 consecutive division titles — one of the most sustained runs in sport","Won 4 consecutive Cy Young awards"] },
  { player:"Greg Maddux", sport:"⚾ MLB", answer:"GREG MADDUX", era:"modern", stats:{ERA:"3.16",W:"355",SO:"3371",CY:"4"}, ctx:"Career Totals — 4 consecutive Cy Young Awards", clues:["Once threw a complete game so efficient it lasted under 80 minutes","Won 355 career games","From Las Vegas Nevada — nicknamed The Professor","Posted an ERA of 3.16 — among the best of the season"] },
  { player:"Alex Rodriguez", sport:"⚾ MLB", answer:"AROD", era:"modern", stats:{HR:"52",AVG:".300",RBI:"135",OPS:"1.018"}, ctx:"2001 MLB Season — Texas Rangers", clues:["Signed the richest contract in sports history ($252M) before this season","Hit 52 home runs this year","The Rangers reached consecutive World Series in 2010 and 2011 but lost both times","Nicknamed A-Rod"] },
  { player:"Manny Ramirez", sport:"⚾ MLB", answer:"MANNY", era:"modern", stats:{HR:"45",AVG:".349",RBI:"144",OPS:"1.154"}, ctx:"2002 MLB Season — Boston Red Sox", clues:["Batted .349 with 45 home runs","Finished 2nd in MVP voting","The Red Sox ended an 86-year championship drought known as the Curse of the Bambino","Hit .312 with 555 career home runs and was one of the most feared right-handed hitters of his era"] },
  { player:"Sammy Sosa", sport:"⚾ MLB", answer:"SOSA", era:"classic", stats:{HR:"66",AVG:".308",RBI:"158",SLG:".647"}, ctx:"1998 MLB Season — Chicago Cubs HR chase", clues:["Hit 66 home runs in the famous McGwire-Sosa HR chase","Finished 2nd to McGwire but won NL MVP","The Cubs ended a 108-year World Series drought in 2016 in one of sports greatest moments","Born in San Pedro de Macoris, Dominican Republic"] },
  { player:"George Brett", sport:"⚾ MLB", answer:"BRETT", era:"classic", stats:{HR:"24",AVG:".390",RBI:"118",OPS:"1.128"}, ctx:"1980 MLB Season — Kansas City Royals MVP", clues:["Batted .390 — closest to .400 since Ted Williams","Won the AL MVP award","The Royals won the 2015 World Series on the back of elite contact hitting and defense","The Pine Tar Incident in 1983 became one of baseball's famous controversies"] },
  { player:"Bob Gibson", sport:"⚾ MLB", answer:"GIBSON", era:"legends", stats:{ERA:"1.12",SO:"268",W:"22",CG:"28"}, ctx:"1968 MLB Season — St. Louis Cardinals", clues:["Posted a 1.12 ERA — the lowest single-season ERA since 1914","His dominance led to the mound being lowered in 1969","The Cardinals have won 11 World Series championships — second most all-time","9x Gold Glove winner and 2x Cy Young winner"] },
  { player:"Sandy Koufax", sport:"⚾ MLB", answer:"KOUFAX", era:"legends", stats:{ERA:"1.73",SO:"382",W:"27",CG:"27"}, ctx:"1966 MLB Season — Los Angeles Dodgers", clues:["Retired at age 30 due to arthritis at his peak","Won 3 Cy Young Awards in 4 years","The Dodgers moved from Brooklyn to Los Angeles in 1958 breaking New York hearts","Famously refused to pitch on Yom Kippur in the 1965 World Series"] },
  { player:"Sandy Koufax", sport:"⚾ MLB", answer:"SANDY KOUFAX", era:"classic", stats:{ERA:"2.76",W:"165",NO_H:"4",CY:"3"}, ctx:"Career Totals — 4 no-hitters and 3 Cy Youngs before age 31", clues:["Threw 4 no-hitters including a perfect game","Won 3 Cy Young Awards in 4 years","The Dodgers moved from Brooklyn to Los Angeles in 1958 breaking New York hearts","Retired at 30 due to severe arthritis — many say he was the best ever"] },
  { player:"Tom Seaver", sport:"⚾ MLB", answer:"TOM SEAVER", era:"classic", stats:{W:"311",ERA:"2.86",SO:"3640",CY:"3"}, ctx:"Career Totals — Tom Terrific with 3 Cy Youngs", clues:["Won 311 games with a 2.86 career ERA","Won 3 Cy Young Awards","Led the 1969 Miracle Mets to the World Series","Nicknamed Tom Terrific"] },
  { player:"Justin Verlander", sport:"⚾ MLB", answer:"JUSTIN VERLANDER", era:"modern", stats:{ERA:"2.64",SO:"290",W:"21",MVP:"2011"}, ctx:"2011 MLB Season — Won MVP and Cy Young in same year", clues:["Won both the AL MVP and Cy Young Award — only the fifth pitcher to do so","Had 250+ strikeouts and under a 2.50 ERA this season","The Tigers have one of baseball's most storied franchises featuring Ty Cobb Hank Greenberg and Al Kaline","From Manakin-Sabot Virginia"] },
  { player:"David Price", sport:"⚾ MLB", answer:"DAVID PRICE", era:"modern", stats:{ERA:"3.26",CY:"2012",W:"20",DRAFT:"1st"}, ctx:"Career Totals — Number 1 overall pick who won the Cy Young", clues:["Was the 1st overall pick in the 2007 MLB Draft by the Tampa Bay Rays","Won the AL Cy Young Award in 2012","Won a World Series with the Boston Red Sox in 2018","From Murfreesboro Tennessee"] },
  { player:"Emmitt Smith", sport:"🏈 NFL", answer:"EMMITT", era:"classic", stats:{CAR:"373",YDS:"1773",TD:"25",YPC:"4.7"}, ctx:"1995 NFL Season — Dallas Cowboys", clues:["Won the NFL rushing title this season","Won 3 Super Bowls with Dallas Cowboys","All-time NFL rushing yards leader","His number 22 is retired by the Cowboys"] },
  { player:"Drew Brees", sport:"🏈 NFL", answer:"BREES", era:"modern", stats:{YDS:"5476",TD:"46",INT:"14",COMP:"71.2%"}, ctx:"2011 NFL Season — New Orleans Saints", clues:["Set the NFL passing yards record in a season","Led the NFL in completion percentage","The Saints were so bad in their early years fans wore paper bags on their heads and called them the Aints","From Austin, Texas — overcame a shoulder injury to reach this peak"] },
  { player:"Steve Nash", sport:"🏀 NBA", answer:"NASH", era:"modern", stats:{PTS:"18.8",AST:"11.5",REB:"3.3",TEAM:"Suns"}, ctx:"2005-06 NBA Season — Phoenix Suns MVP", clues:["Won his second consecutive MVP award","The Suns invented the Seven Seconds or Less fast-break offense under coach Mike D'Antoni","From Victoria, British Columbia, Canada","Shot over 50% from the field as a point guard"] },
  { player:"Vince Carter", sport:"🏀 NBA", answer:"CARTER", era:"modern", stats:{PTS:"18.3",REB:"5.3",AST:"4.3",YEAR:"2000"}, ctx:"2000 NBA Slam Dunk Contest — Toronto Raptors", clues:["Considered the greatest dunk contest performance ever","The Raptors are the only NBA team based outside the United States","Nicknamed Half Man Half Amazing","Had one of the longest NBA careers at 22 seasons"] },
  { player:"Tracy McGrady", sport:"🏀 NBA", answer:"TMAC", era:"modern", stats:{PTS:"33.0",REB:"6.5",AST:"5.5",STL:"1.6"}, ctx:"2002-03 NBA Season — Orlando Magic scoring title", clues:["Had 13 points in 35 seconds vs San Antonio — one of the great comebacks","Averaged 33.0 points per game during this season","Scored 13 points in 35 seconds to beat San Antonio in 2004","Nickname T-Mac"] },
  { player:"Jaromir Jagr", sport:"🏒 NHL", answer:"JAGR", era:"classic", stats:{G:"62",AST:"87",PTS:"149",PIM:"96"}, ctx:"1995-96 NHL Season — Pittsburgh Penguins", clues:["Scored 149 points this season","The Penguins won back-to-back Cups in 2016 and 2017 behind Crosby and Malkin","Czech player with a famous mullet","Won 2 Stanley Cups with Pittsburgh"] },
  { player:"Ray Lewis", sport:"🏈 NFL", answer:"RAY LEWIS", era:"modern", stats:{DPOY:"2",SB_MVP:"2001",TACKLES:"2000+",RINGS:"2"}, ctx:"Career Totals — Two Defensive Player of Year awards and two Super Bowl rings", clues:["Won 2 Defensive Player of Year awards and 2 Super Bowls — 35 years apart","Was the Super Bowl XXXV MVP in 2001 with the Baltimore Ravens","Was involved in a controversial altercation after Super Bowl XXXIV that followed him throughout his career","From Bartow Florida — his pre-game dance became one of the most iconic rituals in football"] },
  { player:"Adrian Peterson", sport:"🏈 NFL", answer:"ADRIAN PETERSON", era:"modern", stats:{YARDS:"2097 season",MVP:"2012",RUSH_YARDS:"14000+",COMEBACK:"ACL"}, ctx:"Career Totals — One of the most gifted runners in NFL history", clues:["Rushed for 2,097 yards in 2012 — coming back from a torn ACL the previous year","Was named the NFL MVP for the 2012 season","Has over 14,000 career rushing yards — one of the all-time leaders","From Palestine Texas — nicknamed All Day"] },
  { player:"Larry Fitzgerald", sport:"🏈 NFL", answer:"LARRY FITZGERALD", era:"modern", stats:{YARDS:"17492",RECEPTIONS:"1432",SB:"Run 2009",RINGS:"0"}, ctx:"Career Totals — Most receptions by a wide receiver and heroic Super Bowl run", clues:["Had the most receptions of any wide receiver in NFL history","Had a legendary Super Bowl XLIII run with 2 touchdowns before losing to the Steelers in the final seconds","Played his entire career with the Arizona Cardinals — one of the most loyal stars in NFL history","Turned down bigger contracts elsewhere to stay in Arizona — leaving significant money on the table"] },

  { player:"Bubba Watson", sport:"⛳ Golf", answer:"BUBBA", era:"modern", stats:{SCORE:"-10",HOLE:"10",SHOT:"Hook",PLAYOFF:"W"}, ctx:"2012 Masters — Augusta National playoff win", clues:["Won the Masters with a famous hook shot from the pine straw","Is a left-handed golfer who never had a formal lesson","Won 2 Masters titles in his career","From Bagdad, Florida — known for his massive driving distance"] },

  { player:"Jordan Spieth", sport:"⛳ Golf", answer:"JORDAN SPIETH", era:"modern", stats:{WINS:"5",MAJORS:"2",AVG:"68.91",EARN:"$12.0M"}, ctx:"2015 PGA Tour Season — Masters and US Open", clues:["Won The Masters and US Open in the same year","Led every major at some point this year","From Dallas Texas","Won 3 major championships before age 24"] },

  { player:"Brooks Koepka", sport:"⛳ Golf", answer:"BROOKS KOEPKA", era:"modern", stats:{WINS:"2",MAJORS:"2",YEAR:"2018",OPEN:"US"}, ctx:"2018 US Open — Back-to-back US Open champion", clues:["Won the US Open for the second consecutive year","Won 4 major championships in his career","From West Palm Beach Florida","Joined LIV Golf in 2022"] },

  { player:"Jon Rahm", sport:"⛳ Golf", answer:"JON RAHM", era:"modern", stats:{SCORE:"-6",MARGIN:"1",YEAR:"2021",OPEN:"US"}, ctx:"2021 US Open — Jon Rahm wins first major", clues:["Won his first major at the US Open","Had tested positive for COVID two weeks before and had to withdraw while leading","From Barrika Spain","Later moved to LIV Golf in 2024"] },

  { player:"Tom Watson", sport:"⛳ Golf", answer:"TOM WATSON", era:"classic", stats:{OPEN:"5x",MASTERS:"2x",WINS:"39",RIVAL:"Duel in the Sun vs Nicklaus"}, ctx:"Career Totals — Won 5 Open Championships and had the greatest rivalry with Nicklaus", clues:["Won the Open Championship five times including the famous Duel in the Sun against Jack Nicklaus in 1977","Won two Masters titles and 39 PGA Tour events","Nearly won a sixth Open Championship at age 59 in 2009 before losing in a playoff","From Kansas City Missouri — known for his links-style game and was the dominant player of the late 1970s and early 1980s"] },
  { player:"Nick Faldo", sport:"⛳ Golf", answer:"NICK FALDO", era:"classic", stats:{MAJORS:"6",MASTERS:"3x",OPEN:"3x",NATION:"England"}, ctx:"Career Totals — Won 6 majors and was the best player in the world in the late 1980s", clues:["Won 6 major championships including 3 Masters and 3 Open Championships","Was ranked World No. 1 for 97 weeks and was the dominant player of the late 1980s and early 1990s","Was known for his meticulous preparation and rebuilt his swing from scratch in the mid-1980s","From Welwyn Garden City England — became one of the greatest European players ever"] },
  { player:"Curtis Strange", sport:"⛳ Golf", answer:"CURTIS STRANGE", era:"classic", stats:{US_OPEN:"2x",WINS:"17",CONSECUTIVE:"Back to back US Opens",ERA:"1988-89"}, ctx:"Career Totals — Won back-to-back US Opens in 1988 and 1989", clues:["Won back-to-back US Open championships in 1988 and 1989 — the first player to do so since Curtis Strange himself","Won 17 PGA Tour events and was the dominant American player of the late 1980s","Was the first PGA Tour player to earn over one million dollars in a single season","From Norfolk Virginia — played at Wake Forest before turning professional in 1976"] },
  { player:"Payne Stewart", sport:"⛳ Golf", answer:"PAYNE STEWART", era:"classic", stats:{MAJORS:"3",US_OPEN:"2x",PGA:"1x",TRAGEDY:"Died in plane crash 1999"}, ctx:"Career Totals — Won 3 majors and died tragically in a plane crash at the height of his fame", clues:["Won three major championships including two US Opens and a PGA Championship","Died tragically in a plane crash in 1999 just months after winning his final US Open","Was famous for wearing plus-fours knickers and tam-o-shanter caps on the course","From Springfield Missouri — was one of the most popular and recognisable players of his era"] },
];

// ─── MEDIUM (45 puzzles) ──────────────────────────────────────────────────────
const MEDIUM = [
  { player:"Kawhi Leonard", sport:"🏀 NBA", answer:"KAWHI", era:"modern", stats:{PTS:"26.6",REB:"9.3",AST:"3.3",STL:"1.8"}, ctx:"2019 NBA Finals MVP — Toronto Raptors", clues:["His team defeated the Golden State Warriors — who lost Klay Thompson and KD to injury","Ended Golden State Warriors dynasty","Known for his huge hands and quiet personality","Made The Shot vs Philadelphia in 2019"] },
  { player:"Dwyane Wade", sport:"🏀 NBA", answer:"WADE", era:"modern", stats:{PTS:"34.7",REB:"7.8",AST:"3.8",STL:"2.7"}, ctx:"2006 NBA Finals MVP — Miami Heat", clues:["Was just 24 years old when he dominated the 2006 NBA Finals — averaging 34.7 points on 60% shooting","Averaged 34.7 PPG in the series","His team came back from 2-0 down","Nickname: Flash"] },
  { player:"Giannis Antetokounmpo", sport:"🏀 NBA", answer:"GIANNIS", era:"modern", stats:{PTS:"35.2",REB:"13.2",AST:"5",BLK:"1.8"}, ctx:"2021 NBA Finals MVP — Milwaukee Bucks", clues:["Was the first player from Greece drafted in the NBA lottery and built his physique to become nearly unstoppable at the rim","Averaged 35.2 PPG in the series","From Greece","Nickname: The Greek Freak"] },
  { player:"Hakeem Olajuwon", sport:"🏀 NBA", answer:"HAKEEM", era:"classic", stats:{PTS:"26.9",REB:"11.9",AST:"3.6",BLK:"3.7"}, ctx:"1994 NBA Finals MVP — Houston Rockets", clues:["Averaged 35 points and 9 rebounds per game in the 1994 Playoffs","The Rockets built around a revolutionary offensive philosophy that maximized three-pointers","Born in Lagos, Nigeria","Famous for his Dream Shake move"] },
  { player:"Torry Holt", sport:"🏈 NFL", answer:"TORRY HOLT", era:"modern", stats:{REC:"920",YDS:"12519",RINGS:"1",TEAM:"Rams"}, ctx:"Career Totals — Greatest Show on Turf receiver who was quietly better than his reputation", clues:["Was the primary deep threat in the Greatest Show on Turf alongside Isaac Bruce for the St. Louis Rams","Won a Super Bowl ring with the Rams in Super Bowl XXXIV","Made seven Pro Bowls across his career and led the NFL in receiving yards twice","From Gibsonville North Carolina — played at NC State before being drafted 6th overall in 1999"] },
  { player:"Lawrence Taylor", sport:"🏈 NFL", answer:"TAYLOR", era:"classic", stats:{SCK:"20.5",FF:"4",INT:"2",TD:"2"}, ctx:"1986 NFL Season — New York Giants MVP", clues:["Was inducted into the Pro Football Hall of Fame in his first year of eligibility","Wore number 56 for the Giants his entire career","Bill Parcells said he was the greatest player he ever coached","His combination of speed and power at linebacker changed defensive football permanently"] },
  { player:"Edgerrin James", sport:"🏈 NFL", answer:"EDGERRIN JAMES", era:"modern", stats:{RUSH:"12246",TD:"80",MVP:"2x",TEAM:"Colts"}, ctx:"Career Totals — Won two rushing titles and was the Colts engine before Manning got rolling", clues:["Won back-to-back NFL rushing titles in his first two seasons with Indianapolis","Was the NFL Offensive Player of the Year twice and a key piece of the Peyton Manning era Colts","Finished his career with over 12000 rushing yards — 4th most in NFL history at the time of retirement","From Immokalee Florida — played at Miami before being drafted 4th overall by Indianapolis in 1999"] },
  { player:"Mariano Rivera", sport:"⚾ MLB", answer:"RIVERA", era:"modern", stats:{ERA:"1.38",SV:"53",WHIP:"0.768",SO:"77"}, ctx:"2004 MLB Season — New York Yankees", clues:["Was cut by the New York Yankees as a starter before being converted to a reliever — one of the best decisions in baseball history","Led MLB in saves","The Yankees have won 27 World Series championships — by far the most of any team","Only player unanimously elected to the Hall of Fame"] },
  { player:"Zinedine Zidane", sport:"⚽ Soccer", answer:"ZIDANE", era:"classic", stats:{G:"5",AST:"3",APP:"7",MIN:"630"}, ctx:"1998 FIFA World Cup Final — France vs Brazil", clues:["Was known for his bald head his elegance and his headbutt of Marco Materazzi in his final career game","France won their first World Cup","The opponent was Brazil","He later managed Real Madrid to 3 UCL titles"] },
  { player:"Ronaldinho", sport:"⚽ Soccer", answer:"RONALDINHO", era:"modern", stats:{G:"22",AST:"14",APP:"36",MIN:"2880"}, ctx:"2004-05 La Liga Season — FC Barcelona Ballon d'Or", clues:["Was described by Pele as the greatest player in the world — high praise from someone who rarely gave it","Nutmegged defenders for fun — known for his elastic dribbling","Barcelona is owned by its members — a cooperative with over 150000 supporter-owners","Brazilian playmaker known for his dribbling and smile"] },
  { player:"Xavi Hernandez", sport:"⚽ Soccer", answer:"XAVI", era:"modern", stats:{G:"3",AST:"12",PASS:"90%",APP:"16"}, ctx:"2010 FIFA World Cup — Spain World Champions", clues:["Was the heartbeat of the Spain team that won the 2010 World Cup Euro 2008 and Euro 2012 — the most successful international run ever","He was named player of the tournament","Scored 3 goals during this tournament or season","Barcelona midfielder who was a master of possession"] },
  { player:"Monica Seles", sport:"🎾 WTA", answer:"SELES", era:"classic", stats:{W:"87",L:"3",GRAND_SLAMS:"3",TITLES:"9"}, ctx:"1991 WTA Season — Dominant year", clues:["Won 3 Grand Slams this year","Was World No. 1 at just 17 years old","Born in Yugoslavia, later became American","Was stabbed on court in 1993 in a shocking attack"] },
  { player:"Annika Sorenstam", sport:"⛳ Golf", answer:"ANNIKA", era:"modern", stats:{WINS:"11",MAJORS:"2",AVG:"68.70",EARN:"$2.8M"}, ctx:"2001 LPGA Season — Won 11 tournaments, first woman to shoot 59", clues:["Was the first woman to compete in a PGA Tour event in over 50 years when she played in the 2003 Bank of America Colonial","Shot a 59 — the first woman to do so in LPGA history","From Sweden","Won more LPGA majors (10) than any other player in history"] },
  { player:"CJ McCollum", sport:"🏀 NBA", answer:"CJ MCCOLLUM", era:"modern", stats:{PTS:"20.4",TEAM:"Blazers/Pelicans",PARTNER:"Lillard backcourt",MIP:"2016"}, ctx:"Career Totals — Formed a dynamic backcourt with Damian Lillard in Portland", clues:["Formed one of the best shooting backcourts in the NBA alongside Damian Lillard in Portland","Won the NBA Most Improved Player Award in 2015-16 after a breakout season","Averaged over 20 points per game across his best seasons in Portland","From Canton Ohio — played at Lehigh University before being drafted 10th overall in 2013"] },
  { player:"Paul George", sport:"🏀 NBA", answer:"GEORGE", era:"modern", stats:{PTS:"20.7",REB:"5.9",AST:"3.9",DPOY:"1"}, ctx:"Career highlights — Perennial All-Star", clues:["Missed nearly an entire season due to a serious leg injury but returned stronger than ever","Came back the following season better than ever — finished top 3 in MVP voting","Won Defensive Player of the Year in 2019","Has averaged over 20 PPG in 10 different NBA seasons"] },
  { player:"Jimmy Butler", sport:"🏀 NBA", answer:"BUTLER", era:"modern", stats:{PTS:"26.2",REB:"9.8",AST:"8.8",STL:"2.1"}, ctx:"2020 NBA Finals — Miami Heat", clues:["Signed a minimum contract with Miami after being traded multiple times and transformed himself into one of the best two-way players in the NBA","Averaged 26.2 PPG in the Finals","Played in South Beach for a franchise that attracted the biggest superstar names","Was homeless as a teenager and bounced between families"] },
  { player:"Mike Conley", sport:"🏀 NBA", answer:"MIKE CONLEY", era:"modern", stats:{AST:"6.5",PTS:"15.4",TEAM:"Grizzlies/Jazz",ALLSTAR:"1x"}, ctx:"Career Totals — Loyally served Memphis for over a decade without making an All-Star team", clues:["Spent 11 seasons as the starting point guard for the Memphis Grizzlies without ever making an All-Star team","Was often called the best player never to make an All-Star team before finally being selected in 2021","Won a gold medal with Team USA at the 2021 Tokyo Olympics","From Columbus Ohio — played at Ohio State before being drafted 4th overall by Memphis in 2007"] },
  { player:"Tony Parker", sport:"🏀 NBA", answer:"TONY PARKER", era:"modern", stats:{FINALS_MVP:"2007",RINGS:"4",PTS:"15.5",TEAM:"Spurs"}, ctx:"Career Totals — French point guard who won four rings and a Finals MVP with San Antonio", clues:["Won four NBA championships with the San Antonio Spurs as Tim Duncan backcourt partner","Won the NBA Finals MVP award in 2007 — a rare honor for a point guard","Was known for his pull-up floater and ability to finish in traffic","From Bruges Belgium — was discovered playing in France and drafted 28th overall by San Antonio in 2001"] },
  { player:"Owen Daniels", sport:"🏈 NFL", answer:"OWEN DANIELS", era:"modern", stats:{REC:"469",YDS:"5510",TD:"51",TEAM:"Texans/Broncos"}, ctx:"Career Totals — Reliable tight end who won a Super Bowl late in his career", clues:["Was one of the most reliable tight ends of his era for the Houston Texans across 8 seasons","Won Super Bowl 50 with the Denver Broncos as Peyton Manning backup weapon","Made two Pro Bowl trips during his tenure in Houston","From Naperville Illinois — played at Wisconsin before being drafted in the 4th round in 2006"] },
  { player:"Fred Taylor", sport:"🏈 NFL", answer:"FRED TAYLOR", era:"modern", stats:{RUSH:"11695",TD:"66",TEAM:"Jaguars",NICK:"Fragile Fred"}, ctx:"Career Totals — Elite runner whose injuries prevented him from reaching all-time status", clues:["Gained over 11000 career rushing yards despite missing significant time to injuries","Was considered one of the most talented pure runners of his era when healthy","Spent his entire career with the Jacksonville Jaguars despite interest from other teams","From Belle Glade Florida — played at Florida before being drafted 9th overall by Jacksonville in 1998"] },
  { player:"Von Miller", sport:"🏈 NFL", answer:"VON", era:"modern", stats:{SCK:"2.5",FF:"2",TFL:"5",QB_HIT:"6"}, ctx:"Super Bowl 50 MVP — Denver Broncos vs Carolina Panthers", clues:["Was traded from Buffalo to Denver in a blockbuster deal and immediately won a Super Bowl — validating the trade entirely","Playing in Mile High altitude in Denver gives the home team a real physiological edge","Won 2 Super Bowls in his career","His 2.5 sacks forced 2 fumbles in this game"] },
  { player:"Khalil Mack", sport:"🏈 NFL", answer:"MACK", era:"modern", stats:{SCK:"18.5",FF:"5",INT:"1",TD:"4"}, ctx:"2015 NFL Season — Oakland Raiders Defensive MVP", clues:["Was traded on his rookie contract for a package that included a first-round pick — a trade that shocked the NFL","Had 18.5 sacks this season","The Raiders won 3 Super Bowls with an outlaw rebellious team culture","Was traded to Chicago Bears in a blockbuster deal"] },
  // Baseball - Modern
  { player:"Jacob deGrom", sport:"⚾ MLB", answer:"DEGROM", era:"modern", stats:{ERA:"1.70",W:"10",SO:"255",WHIP:"0.912"}, ctx:"2018 NL Cy Young — New York Mets", clues:["His team scored the fewest runs per game of any Cy Young winner","Had the lowest ERA among starters","The Miracle Mets won the 1969 World Series despite having 100-1 odds at the start of the year","Was nicknamed Thor for his appearance and power"] },
  { player:"Max Scherzer", sport:"⚾ MLB", answer:"SCHERZER", era:"modern", stats:{ERA:"2.90",W:"21",SO:"300",WHIP:"0.970"}, ctx:"2018 NL Cy Young Season — Washington Nationals", clues:["Struck out 20 batters in a single game twice in his career — the only pitcher ever to accomplish that feat","Struck out 300 batters this season","Posted an ERA of 2.90 — among the best of the season","Has two different colored eyes — heterochromia"] },
  { player:"Pete Alonso", sport:"⚾ MLB", answer:"ALONSO", era:"modern", stats:{HR:"53",AVG:".260",RBI:"120",OPS:".941"}, ctx:"2019 MLB Rookie of Year — New York Mets", clues:["Was nicknamed the Polar Bear and became the face of the New York Mets in just his first year in the league","Won NL Rookie of the Year","The Miracle Mets won the 1969 World Series despite having 100-1 odds at the start of the year","From Tampa, Florida — nicknamed Polar Bear"] },
  { player:"Vladimir Guerrero Jr.", sport:"⚾ MLB", answer:"VLADDY", era:"modern", stats:{HR:"48",AVG:".311",RBI:"111",OPS:"1.002"}, ctx:"2021 ML Season — Toronto Blue Jays", clues:["His father was a Hall of Fame outfielder — and many scouts believe the son is even more talented than the father was","Finished 2nd in MVP voting","Hit a home run in the 2021 All-Star Game Home Run Derby from a distance of 468 feet","His father was a Hall of Fame outfielder for the Montreal Expos and Anaheim Angels"] },
  // Baseball - Classic
  // Soccer - Modern
  { player:"Neymar Jr.", sport:"⚽ Soccer", answer:"NEYMAR", era:"modern", stats:{G:"8",AST:"5",APP:"7",MIN:"594"}, ctx:"2022 FIFA World Cup — Brazil", clues:["Equalled Pele's Brazil goal scoring record during this tournament","Injured in the group stage but returned","From Mogi das Cruzes, Brazil","PSG were a mid-table French club before Qatari investment in 2011 transformed them into a superclub"] },
  { player:"Karim Benzema", sport:"⚽ Soccer", answer:"BENZEMA", era:"modern", stats:{G:"15",AST:"3",APP:"12",MIN:"1009"}, ctx:"2021-22 UEFA Champions League — Real Madrid", clues:["Grew up in Lyon France and came through the Real Madrid academy before becoming one of the most clinical strikers in Champions League history","Won the European Cup in 1968 with Manchester United — the first English club to do so — just 10 years after the Munich air disaster","Was accused of tax evasion in Spain and briefly considered leaving the country","French striker who came back from exile to lead France to nothing but then won Ballon d'Or"] },
  { player:"Antoine Griezmann", sport:"⚽ Soccer", answer:"GRIEZMANN", era:"modern", stats:{G:"4",AST:"2",APP:"7",MIN:"630"}, ctx:"2018 FIFA World Cup Final — France", clues:["Left Atletico Madrid for Barcelona in 2019 in a move that divided Spanish football opinion sharply","His team defeated Argentina in the final","Was one of the most accomplished players of their generation","From Macon, France — nickname Grizou"] },
  { player:"Virgil van Dijk", sport:"⚽ Soccer", answer:"VAN DIJK", era:"modern", stats:{G:"4",AST:"1",APP:"38",MIN:"3377"}, ctx:"2018-19 Premier League Season — Liverpool", clues:["Was signed by Liverpool for £75 million from Southampton — a then-world record fee for a defender","Liverpool have won 6 European Cups — more than any other English club","Won the Champions League and Premier League","Dutch central defender considered the best in the world"] },
  // Soccer - Classic
  { player:"Ronaldo Nazario", sport:"⚽ Soccer", answer:"R9", era:"classic", stats:{G:"15",AST:"4",APP:"16",MIN:"1238"}, ctx:"1996-97 Season — Barcelona La Liga", clues:["Was known as Il Fenomeno and is widely considered the greatest pure striker in football history at his peak","Scored 47 goals in all competitions this season","Barcelona is owned by its members — a cooperative with over 150000 supporter-owners","Brazilian striker known as The Phenomenon"] },
  { player:"Brendan Shanahan", sport:"🏒 NHL", answer:"SHANAHAN", era:"classic", stats:{G:"52",AST:"34",PTS:"86",PIM:"131"}, ctx:"1993-94 NHL Season — St. Louis Blues", clues:["Was part of the Detroit Red Wings production line alongside Steve Yzerman and Sergei Fedorov","The Blues won their first Cup in 2019 after 52 years of trying — while Gloria played in the arena","Won 3 Stanley Cups with Detroit Red Wings","Later became NHL's VP of Player Safety"] },
  { player:"Brett Hull", sport:"🏒 NHL", answer:"HULL", era:"classic", stats:{G:"86",AST:"45",PTS:"131",PIM:"24"}, ctx:"1990-91 NHL Season — St. Louis Blues", clues:["Was born in Belleville Ontario — the son of a Hall of Fame winger who scored 610 goals","The Blues won their first Cup in 2019 after 52 years of trying — while Gloria played in the arena","His father was a Hall of Fame winger who scored 610 NHL goals","Scored 741 career goals — the most ever by a player whose father also played in the NHL"] },
  { player:"Denis Savard", sport:"🏒 NHL", answer:"SAVARD", era:"classic", stats:{G:"44",AST:"87",PTS:"131",PIM:"82"}, ctx:"1987-88 NHL Season — Chicago Blackhawks", clues:["Was traded from Chicago to Montreal in a deal that gave the Canadiens three Hall of Famers in return","The Blackhawks won 3 Cups in 6 years forming the most recent NHL dynasty","From Pointe-Gatineau, Quebec","Famous for his spin-o-rama move"] },
  { player:"Nick Foles", sport:"🏈 NFL", answer:"FOLES", era:"modern", stats:{YDS:"373",TD:"3",INT:"0",RTG:"106.0"}, ctx:"Super Bowl LII MVP — Philadelphia Eagles", clues:["Started the Super Bowl after the starter tore his ACL — then won the game and the MVP against the Patriots","His team beat Tom Brady and the Patriots","Caught a TD pass himself in this game","Was nearly retired before this season"] },
  { player:"Kurt Warner", sport:"🏈 NFL", answer:"WARNER", era:"classic", stats:{YDS:"414",TD:"2",INT:"0",RTG:"100.0"}, ctx:"Super Bowl XXXIV MVP — St. Louis Rams", clues:["Was stocking grocery shelves on minimum wage just years before his Super Bowl win","Won the Super Bowl MVP award twice with two different teams in the same stadium","Scored 2 touchdowns during this season","Won 2 Super Bowl MVPs in his career"] },
  { player:"Don Larsen", sport:"⚾ MLB", answer:"LARSEN", era:"legends", stats:{IP:"9",H:"0",BB:"0",SO:"7"}, ctx:"1956 World Series Game 5 — New York Yankees", clues:["Was a journeyman pitcher with a losing record who somehow delivered the greatest pitching performance in postseason history","The Yankees have won 27 World Series championships — by far the most of any team","Opponent was the Brooklyn Dodgers","This remains one of baseball's most iconic moments"] },
  { player:"Denny McLain", sport:"⚾ MLB", answer:"MCLAIN", era:"legends", stats:{W:"31",ERA:"1.96",SO:"280",CG:"28"}, ctx:"1968 MLB Season — Detroit Tigers", clues:["Also won the Cy Young Award in back to back seasons and was a two-time World Series champion with Detroit","Won both the Cy Young and MVP awards","The Tigers have one of baseball's most storied franchises featuring Ty Cobb Hank Greenberg and Al Kaline","His record of 31 wins may never be broken"] },
  { player:"Fernando Valenzuela", sport:"⚾ MLB", answer:"FERNANDO", era:"classic", stats:{ERA:"2.48",W:"13",SO:"180",CG:"11"}, ctx:"1981 MLB Season — Los Angeles Dodgers Rookie", clues:["Was born in Mexico and became a cultural phenomenon in Los Angeles — inspiring the term Fernandomania","Won both the Cy Young and Rookie of the Year awards in the same season — 1981","The Dodgers moved from Brooklyn to Los Angeles in 1958 breaking New York hearts","Mexican pitcher who became a cultural icon in LA"] },
  { player:"Gerd Muller", sport:"⚽ Soccer", answer:"MULLER", era:"classic", stats:{G:"14",APP:"10",MIN:"780",YEAR:"1970"}, ctx:"1970 FIFA World Cup — West Germany", clues:["Scored 68 international goals for West Germany — a record that stood for decades","Scored 14 goals during this tournament or season","Nicknamed Der Bomber","Bayern Munich and West Germany striker of the 1970s"] },
  { player:"George Best", sport:"⚽ Soccer", answer:"BEST", era:"legends", stats:{G:"28",APP:"41",MIN:"3690",YEAR:"1968"}, ctx:"1967-68 Football League Season — Manchester United", clues:["Won the Ballon d'Or this year","Was knighted by Queen Elizabeth II in 1994 for his services to football","Won the Ballon d'Or in 1968 — the first British player to do so","Known as the 5th Beatle for his pop star status"] },
  { player:"James Harden", sport:"🏀 NBA", answer:"JAMES HARDEN", era:"modern", stats:{PTS:"36.1",AST:"7.5",REB:"6.6",FT:"87.9"}, ctx:"2018-19 NBA Season — Houston Rockets scoring title", clues:["Averaged 36.1 points per game in the 2018-19 season — the third highest single-season average in NBA history","The Rockets built around a revolutionary offensive philosophy that maximized three-pointers","Known for his step-back three pointer","Nicknamed The Beard"] },
  { player:"Luka Modric", sport:"⚽ Soccer", answer:"LUKA MODRIC", era:"modern", stats:{G:"2",AST:"5",APP:"7",MIN:"609"}, ctx:"2018 FIFA World Cup — Croatia", clues:["Led Croatia to the 2018 World Cup Final — the smallest country ever to reach a World Cup final","Led Croatia to the World Cup Final for the first time","Real Madrid have won the most UEFA Champions League titles of any club in history","From Croatia, won the Ballon d'Or in 2018"] },
  { player:"Ron Artest", sport:"🏀 NBA", answer:"ARTEST", era:"modern", stats:{PTS:"16.5",REB:"5.2",STL:"2.0",BLK:"0.8"}, ctx:"2010 NBA Finals Game 7 — Los Angeles Lakers", clues:["Was suspended for 86 games following the Malice at the Palace brawl — one of the longest suspensions in NBA history","The Lakers have won more NBA championships than almost any other team","Later changed his name to Metta World Peace","Thanked his psychiatrist in his championship speech"] },
  { player:"Klay Thompson", sport:"🏀 NBA", answer:"KLAY THOMPSON", era:"modern", stats:{THREE_PT:"Splash Brother",RINGS:"4",RECORD:"37 pts one quarter",TEAM:"Warriors"}, ctx:"Career Totals — One half of the Splash Brothers and four-time champion with Golden State", clues:["Was known as one of the Splash Brothers alongside Stephen Curry in Golden State","Scored 37 points in a single quarter against the Sacramento Kings — an NBA record","Won four NBA championships with the Golden State Warriors","From Los Angeles California — played at Washington State before being drafted 11th overall in 2011"] },
  { player:"Eli Manning", sport:"🏈 NFL", answer:"ELI", era:"modern", stats:{YDS:"255",TD:"2",INT:"0",RTG:"98.2"}, ctx:"Super Bowl XLVI MVP — New York Giants vs New England Patriots", clues:["Was known for his ability to make big plays in the biggest moments — particularly against Bill Belichick defenses","Upset the Patriots again as heavy underdogs","His older brother also won multiple Super Bowls and was considered one of the greatest QBs ever","Played his entire career for the New York Giants"] },
  { player:"Lev Yashin", sport:"⚽ Soccer", answer:"YASHIN", era:"legends", stats:{CS:"270",GAMES:"812",SAVES:"150+",YEAR:"1963"}, ctx:"1963 Ballon d'Or — Soviet Union", clues:["Was the only goalkeeper ever to win the Ballon d'Or — awarded in 1963","Saved over 150 penalties in his career","Dynamo Moscow were the most famous club in the Soviet Union during the communist era","Wore all black and was nicknamed The Black Spider"] },
  { player:"Muhsin Muhammad", sport:"🏈 NFL", answer:"MUHSIN MUHAMMAD", era:"modern", stats:{REC:"860",YDS:"11438",TD:"62",TEAM:"Panthers"}, ctx:"Career Totals — Dependable receiver who was consistently good but rarely celebrated", clues:["Had over 860 receptions and 11000 yards in his career but was never considered elite","Had his best season in 2004 with 93 catches for 1405 yards and 16 touchdowns","Was a key part of the Carolina Panthers run to Super Bowl XXXVIII","From Lansing Michigan — played at Michigan State before being drafted in the second round"] },
  { player:"Marshawn Lynch", sport:"🏈 NFL", answer:"BEAST MODE", era:"modern", stats:{CAR:"29",YDS:"157",TD:"2",YAC:"7.1"}, ctx:"2014 NFC Championship — Seattle Seahawks vs San Francisco 49ers", clues:["Was so reluctant to talk to the media that he nicknamed himself Beast Mode to avoid personal questions","The 12th Man tradition at Seattle made their stadium one of the loudest in sports","Nicknamed Beast Mode","From Oakland, California — loved Skittles on the sideline"] },
  { player:"LaDainian Tomlinson", sport:"🏈 NFL", answer:"LT", era:"modern", stats:{CAR:"348",YDS:"1815",TD:"31",YPC:"5.2"}, ctx:"2006 NFL Season — San Diego Chargers MVP", clues:["Also threw 29 touchdowns and rushed for nearly 400 yards — the most complete offensive season by any player in NFL history","Was just 5ft 11in — one of the smallest MVPs in history","Scored 31 touchdowns during this season","Nicknamed LT — considered one of the greatest RBs ever"] },
  { player:"Deion Sanders", sport:"🏈 NFL", answer:"PRIMETIME", era:"classic", stats:{INT:"8",TD:"6",RET:"1421",YEAR:"1994"}, ctx:"1994 NFL Season — San Francisco 49ers", clues:["From Fort Myers Florida — is the only player to appear in both a Super Bowl and a World Series","Returned kicks and played both CB and WR","Is the only athlete to play in both a Super Bowl and a World Series","Also played professional baseball"] },
  { player:"Reggie White", sport:"🏈 NFL", answer:"WHITE", era:"classic", stats:{SCK:"21",FF:"2",INT:"2",YEAR:"1987"}, ctx:"1987 NFL Season — Philadelphia Eagles Defensive MVP", clues:["Was nicknamed the Minister of Defense and famously signed with Green Bay as a free agent — shocking the NFL","From Chattanooga Tennessee — was nicknamed the Minister of Defense and had 198 career sacks","Nicknamed The Minister of Defense","Considered one of the greatest defensive players ever"] },
  { player:"Dick Butkus", sport:"🏈 NFL", answer:"BUTKUS", era:"legends", stats:{SCK:"8",INT:"2",FF:"3",TD:"1"}, ctx:"1969 NFL Season — Chicago Bears All-Pro", clues:["Was so feared that opposing offenses reportedly designed entire game plans just to avoid running toward his side","Scored 1 touchdowns during this season","Considered the most feared linebacker in NFL history","His name became synonymous with violent football"] },
  { player:"Zack Greinke", sport:"⚾ MLB", answer:"GREINKE", era:"modern", stats:{ERA:"1.66",W:"19",SO:"200",WHIP:"0.844"}, ctx:"2009 AL Cy Young Season — Kansas City Royals", clues:["Was traded to the Dodgers after winning the Cy Young in Kansas City — one of the most memorable trades in baseball history","Turned his career around after dealing with social anxiety disorder","Had his famous pine tar incident in 1983 when a home run was called back — then reinstated","Had the lowest ERA by a qualified starter since 1968"] },
  { player:"Jose Fernandez", sport:"⚾ MLB", answer:"FERNANDEZ", era:"modern", stats:{ERA:"2.86",W:"16",SO:"253",WHIP:"0.979"}, ctx:"2016 MLB Season — Miami Marlins (final season)", clues:["Was one of the most electric young pitchers in baseball when he died in a boating accident at age 24","Led the NL in strikeouts","The Marlins won two World Series despite being one of baseball's smallest market teams","Defected from Cuba at age 15 on his 4th attempt"] },
  { player:"Roy Halladay", sport:"⚾ MLB", answer:"HALLADAY", era:"modern", stats:{ERA:"2.35",W:"21",SO:"219",WHIP:"1.041"}, ctx:"2010 NL Cy Young — Philadelphia Phillies", clues:["Was nicknamed Doc and was considered the best pitcher in baseball for the better part of a decade with Toronto and Philadelphia","His no-hitter in the NLDS was the first in playoff history","The Phillies won the World Series in 2008 ending a 28-year championship drought","Also threw a perfect game during the regular season this year"] },
  { player:"Dave Winfield", sport:"⚾ MLB", answer:"WINFIELD", era:"classic", stats:{HR:"27",AVG:".340",RBI:"106",H:"184"}, ctx:"1992 MLB Season — Toronto Blue Jays World Series MVP", clues:["Had the go-ahead RBI in Game 6 of the World Series at age 40","Was named in the Baseball Hall of Fame on the first ballot after a long dispute with George Steinbrenner","Drafted by 4 different professional sports leagues","From St. Paul, Minnesota"] },
  { player:"Gary Carter", sport:"⚾ MLB", answer:"GARY", era:"classic", stats:{HR:"32",AVG:".281",RBI:"106",GG:"3"}, ctx:"1985 MLB Season — Montreal Expos, final great year", clues:["Was traded from the Expos to the Mets after the 1984 season — his last year with Montreal","Batted .281 during this standout season","His 1986 World Series performance with the Mets was iconic","Nicknamed The Kid"] },
  { player:"Dwight Gooden", sport:"⚾ MLB", answer:"DOC", era:"classic", stats:{ERA:"1.53",W:"24",SO:"268",WHIP:"0.965"}, ctx:"1985 MLB Season — New York Mets", clues:["Won the Cy Young and Rookie of the Year in consecutive years","Had a 1.53 ERA at age 20","The Miracle Mets won the 1969 World Series despite having 100-1 odds at the start of the year","Nicknamed Doc — his career derailed by substance abuse"] },
  { player:"Toni Kroos", sport:"⚽ Soccer", answer:"KROOS", era:"modern", stats:{G:"4",AST:"8",APP:"12",MIN:"1037"}, ctx:"2014 FIFA World Cup — Germany", clues:["Was considered the best deep-lying playmaker of his generation — capable of unlocking any defense with a single pass","Scored a stunning free kick vs Sweden in his career","Real Madrid have won the most UEFA Champions League titles of any club in history","German midfielder considered the best passer in the world"] },
  { player:"Andrea Pirlo", sport:"⚽ Soccer", answer:"PIRLO", era:"modern", stats:{G:"2",AST:"8",APP:"7",MIN:"630"}, ctx:"2006 FIFA World Cup — Italy", clues:["Retired from playing to immediately become one of the most successful managers in Serie A history","Won the Golden Ball at Euro 2012","Juventus won 9 consecutive Serie A titles from 2012 to 2020 in one of Europe's greatest runs","Italian regista midfielder nicknamed The Architect"] },
  { player:"Gareth Bale", sport:"⚽ Soccer", answer:"BALE", era:"modern", stats:{G:"2",AST:"1",APP:"9",MIN:"613"}, ctx:"2018 UEFA Champions League Final — Real Madrid vs Liverpool", clues:["Left Real Madrid on bad terms after years of tension — famously saying goodbye with a bicycle kick goal in the Champions League final","Came off the bench to score twice","Real Madrid have won the most UEFA Champions League titles of any club in history","Welsh winger who won 4 Champions Leagues with Madrid"] },
  { player:"Gustavo Kuerten", sport:"🎾 ATP", answer:"GUGA", era:"modern", stats:{W:"61",L:"16",TITLES:"5",GRAND_SLAMS:"1"}, ctx:"2000 ATP Season — French Open champion and World No. 1", clues:["Was one of the most accomplished players of their generation","Drew a heart in the clay after winning at Roland Garros","From Florianopolis, Brazil — nicknamed Guga","Won 3 French Open titles in total"] },
  { player:"Lleyton Hewitt", sport:"🎾 ATP", answer:"HEWITT", era:"modern", stats:{W:"80",L:"13",TITLES:"8",GRAND_SLAMS:"1"}, ctx:"2001 ATP Season — World No. 1", clues:["Won two Grand Slam titles and was known for his never-say-die attitude on court — particularly famous for his Davis Cup performances","Won the US Open this year","Australian player known for his fighting spirit","Famous for his Come On celebrations"] },
  { player:"Guy Lafleur", sport:"🏒 NHL", answer:"LAFLEUR", era:"classic", stats:{G:"60",AST:"72",PTS:"132",PIM:"26"}, ctx:"1977-78 NHL Season — Montreal Canadiens", clues:["Won the Hart Trophy as league MVP","Won his 4th consecutive Stanley Cup this year","The Canadiens have won the Stanley Cup 24 times — by far the most of any franchise","Nicknamed The Flower — one of the most exciting players ever"] },
  { player:"Caitlin Clark", sport:"🏀 NBA", answer:"CLARK", era:"modern", stats:{PTS:"19.2",AST:"8.4",REB:"5.7","3PM":"3.1"}, ctx:"2024 WNBA Season — Indiana Fever Rookie of Year", clues:["Was the first overall pick in the 2024 WNBA Draft and immediately became the most watched player in league history","Set the NCAA all-time scoring record before entering the WNBA","Averaged 19.2 points per game during this season","From West Des Moines, Iowa — sparked a WNBA viewership revolution"] },
  { player:"Jalen Hurts", sport:"🏈 NFL", answer:"HURTS", era:"modern", stats:{YDS:"3701",TD:"35",INT:"6",RUSH:"760"}, ctx:"2022 NFL Season — Philadelphia Eagles MVP runner-up", clues:["Was considered undraftable by some scouts coming out of Oklahoma because of his slight frame — he proved every one of them wrong","Finished 2nd in MVP voting","Scored 35 touchdowns during this season","From Channelview, Texas — transferred from Alabama to Oklahoma"] },
  { player:"Justin Jefferson", sport:"🏈 NFL", answer:"JEFFERSON", era:"modern", stats:{REC:"128",YDS:"1809",TD:"9",YPR:"14.1"}, ctx:"2022 NFL Season — Minnesota Vikings receiving record", clues:["Caught 88 passes for 1400 yards in his very first NFL season — the best rookie receiving season in NFL history at the time","Won Offensive Player of the Year","The Vikings reached the Super Bowl 4 times but came away without a win each time","From St. Rose, Louisiana — joined LSU after Odell Beckham left"] },
  { player:"Angelique Kerber", sport:"🎾 WTA", answer:"KERBER", era:"modern", stats:{W:"68",L:"22",GRAND_SLAMS:"3",WEEKS_NO1:"101"}, ctx:"Was one of the most accomplished players of their generation", clues:["Won the Australian Open, Wimbledon, and US Open in the same year","Became World No. 1 for the first time in her career","German left-handed player","Beat Serena Williams in the 2016 Australian Open final as a huge underdog"] },
  { player:"Caroline Wozniacki", sport:"🎾 WTA", answer:"WOZNIACKI", era:"modern", stats:{W:"74",L:"17",TITLES:"9",WEEKS_NO1:"101"}, ctx:"2010 WTA Season — World No. 1", clues:["Won the Australian Open in 2018 — three years after being diagnosed with a serious autoimmune disease","Won 9 titles this season including the US Open Series","Danish player who was known for her consistency","Later won her only Grand Slam at the 2018 Australian Open"] },
  { player:"Jennifer Capriati", sport:"🎾 ATP", answer:"CAPRIATI", era:"modern", stats:{W:"62",L:"16",GRAND_SLAMS:"3",WEEKS_NO1:"101"}, ctx:"2001 WTA Season — World No. 1 comeback", clues:["Was a teenage prodigy who won the French Open at 14 before personal struggles derailed her career for several years","Won the Australian Open and French Open this year","Had struggled with personal problems before this comeback","Was a child prodigy who turned pro at age 13"] },
  { player:"Retief Goosen", sport:"⛳ Golf", answer:"GOOSEN", era:"modern", stats:{WINS:"2",MAJORS:"2",EARN:"$4.9M",YEAR:"2004"}, ctx:"2004 US Open — Two-time US Open champion", clues:["Won two US Opens and was considered one of the most complete ball strikers of his era","From Pietersburg, South Africa","Was struck by lightning as a teenager which affected him for years","Won the US Open in 2001 and 2004"] },
  { player:"Michael Campbell", sport:"⛳ Golf", answer:"CAMPBELL", era:"modern", stats:{WINS:"1",MAJORS:"1",YEAR:"2005",COUNTRY:"New Zealand"}, ctx:"2005 US Open — Pinehurst No. 2", clues:["Was from New Zealand and remains the only New Zealander to win a major golf championship","Beat Tiger Woods down the stretch","From Hawera, New Zealand — of Maori descent","This was the only major of his career"] },
  { player:"Zach Johnson", sport:"⛳ Golf", answer:"ZACH", era:"modern", stats:{SCORE:"-15",PLAYOFF:"W",HOLES:"4",OPP:"Spieth"}, ctx:"2015 British Open — Iowa native wins at St Andrews", clues:["Was a deeply religious Christian who refused to play on Sundays during his PGA Tour career","Also won the Masters in 2007","From Cedar Rapids, Iowa","Beat Louis Oosthuizen and Marc Leishman in a 4-hole playoff"] },
  { player:"Angel Cabrera", sport:"⛳ Golf", answer:"CABRERA", era:"modern", stats:{SCORE:"-12",PLAYOFF:"W",HOLES:"1",OPP:"Kenny Perry"}, ctx:"2009 Masters — Won in a playoff at Augusta", clues:["Was the first Argentine player to win The Masters — and the first South American to win any major","Also won the US Open in 2007","From Cordoba, Argentina — first Argentine to win a major","Beat Kenny Perry and Chad Campbell in the playoff"] },
  { player:"Willis Reed", sport:"🏀 NBA", answer:"REED", era:"classic", stats:{PTS:"21.1",REB:"13.9",BLK:"1.9",FG:"52.1"}, ctx:"1970 NBA Finals MVP — New York Knicks", clues:["Knicks defeated the Los Angeles Lakers — Jerry West and Wilt Chamberlain","Famous for limping onto court injured in Game 7","Played center for the Knicks","Inspired his team to win Game 7 of the Finals"] },
  { player:"Mats Wilander", sport:"🎾 ATP", answer:"WILANDER", era:"classic", stats:{W:"79",L:"7",TITLES:"7",GRAND_SLAMS:"3"}, ctx:"1988 ATP Season — Three Grand Slams", clues:["Was ranked World No. 1 for 210 weeks and won three Slam titles in 1988 alone — the year he won the most","Swedish player who won 7 Grand Slams total","Won Australian, French, and US Open this year","Reached World No. 1 this year"] },
  { player:"Tim Tebow", sport:"🏈 NFL", answer:"TEBOW", era:"modern", stats:{YDS:"316",TD:"3",INT:"1",RTG:"125.6"}, ctx:"2012 NFL Wild Card — Denver Broncos vs Pittsburgh Steelers", clues:["Was released by the Broncos after one season and signed with Jacksonville — then promptly made them believers in overtime","Playing in Mile High altitude in Denver gives the home team a real physiological edge","Famous for his religious celebrations on the field","Won the Heisman Trophy at Florida"] },
  { player:"Jeremy Lin", sport:"🏀 NBA", answer:"LIN", era:"modern", stats:{PTS:"22.5",AST:"8.7",REB:"3.6",STREAK:"7W"}, ctx:"February 2012 — New York Knicks Linsanity run", clues:["Was one of the most accomplished players of their generation","Was sleeping on his brother's couch before his breakout","Harvard graduate who went undrafted","The phenomenon was called Linsanity"] },
  { player:"Muggsy Bogues", sport:"🏀 NBA", answer:"BOGUES", era:"classic", stats:{PTS:"10.8",AST:"9.7",STL:"2.0",HT:"5ft3"}, ctx:"1994-95 NBA Season — Charlotte Hornets", clues:["Was the shortest player in NBA history at 5 feet 3 inches — yet played 14 seasons in the league","Michael Jordan became the principal owner of the Charlotte franchise he battled against for years","Shortest player in NBA history at 5ft 3in","From Baltimore, Maryland"] },
  { player:"Manute Bol", sport:"🏀 NBA", answer:"BOL", era:"classic", stats:{BLK:"5.0",PTS:"2.7",REB:"4.2",HT:"7ft7"}, ctx:"1985-86 NBA Season — Washington Bullets", clues:["Was the tallest player in NBA history at 7 feet 7 inches and played for several teams across a 10-year career","Averaged 2.7 points per game during this season","Tallest player in NBA history at 7ft 7in","From the Dinka tribe in Sudan"] },
  { player:"Xabi Alonso", sport:"⚽ Soccer", answer:"XABI", era:"modern", stats:{G:"2",AST:"4",APP:"38",MIN:"3285"}, ctx:"2013-14 La Liga Season — Real Madrid", clues:["Is considered one of the greatest passing midfielders of his generation alongside his former Liverpool and Spain teammate","Real Madrid have won the most UEFA Champions League titles of any club in history","Spanish midfielder known for his passing range","Now manages Bayer Leverkusen to the Bundesliga title"] },
  { player:"Bernhard Langer", sport:"⛳ Golf", answer:"LANGER", era:"classic", stats:{WINS:"4",MAJORS:"1",RYDER:"19.5",YEAR:"1993"}, ctx:"1993 Masters — Augusta National", clues:["Has won the Masters twice and finished second three times — the most runner-up finishes by a European in that tournament","Has never won a tournament outside of the Masters where he has 2 wins","From Anhausen, West Germany — now leads LIV Seniors Tour","Had the yips and reinvented his putting style multiple times"] },
  { player:"A'ja Wilson", sport:"🏀 NBA", answer:"AJA", era:"modern", stats:{PTS:"26.8",REB:"11.9",BLK:"2.3",STL:"1.6"}, ctx:"2022 WNBA Season — Las Vegas Aces MVP", clues:["Was the first overall pick and dominated the league so thoroughly that comparisons to LeBron James were made by serious analysts","Led Las Vegas Aces to the WNBA Championship","Averaged 26.8 points per game during this season","From Hopkins, South Carolina"] },
  { player:"Jason Kidd", sport:"🏀 NBA", answer:"KIDD", era:"modern", stats:{AST:"9.9",REB:"6.4",STL:"1.9",PTS:"11.9"}, ctx:"2011 NBA Finals — Dallas Mavericks", clues:["Was the first player in NBA history to record a triple-double as a teenager — and did it while playing point guard","Was one of the most accomplished players of their generation","Led the NBA in assists multiple times","Was known as one of the best defensive point guards ever"] },
  { player:"Tony Perez", sport:"⚾ MLB", answer:"PEREZ", era:"classic", stats:{HR:"4",AVG:".269",RBI:"10",APP:"7"}, ctx:"1975 World Series — Cincinnati Reds Big Red Machine", clues:["Was a key part of the Cincinnati Reds Big Red Machine","Hit a crucial home run in Game 7 of the 1975 World Series","First baseman who played alongside Rose, Morgan, and Bench","From Camaguey, Cuba"] },
  { player:"Tommy John", sport:"⚾ MLB", answer:"TOMMY JOHN", era:"classic", stats:{W:"288",ERA:"3.34",CG:"162",SEASONS:"26"}, ctx:"Career totals — Pitched in 4 decades for 6 teams", clues:["Pitched 26 seasons in the MLB spanning 4 decades","Had a revolutionary elbow surgery in 1974 that now bears his name","Returned to win 164 games after the surgery","Posted an ERA of 3.34 — among the best of the season"] },
  { player:"Gary Lineker", sport:"⚽ Soccer", answer:"LINEKER", era:"classic", stats:{G:"6",APP:"5",MIN:"450",YEAR:"1986"}, ctx:"1986 FIFA World Cup — England Golden Boot", clues:["Remarkably was never booked in his entire professional career","England's all-time leading scorer at a World Cup","Everton are one of England's founding clubs and have spent more seasons in the top flight than almost any team","After retiring became one of England's most popular sports broadcasters"] },
  { player:"Trent Dilfer", sport:"🏈 NFL", answer:"DILFER", era:"modern", stats:{YDS:"153",TD:"1",INT:"0",RTG:"112.8"}, ctx:"Super Bowl XXXV MVP team — Baltimore Ravens", clues:["Won a Super Bowl as a game-manager QB with the dominant Ravens defense","Was one of the most accomplished players of their generation","One of the most criticized Super Bowl winning QBs ever","The Ravens defense that year allowed only 165 points all season"] },
  { player:"Marc-Andre Fleury", sport:"🏒 NHL", answer:"FLEURY", era:"modern", stats:{GAA:"2.52","SV%":".914",W:"16",TEAM:"Penguins"}, ctx:"2009 Stanley Cup Playoffs — Pittsburgh Penguins", clues:["Won the Stanley Cup with the Pittsburgh Penguins","Was named playoff MVP in the second round","Was the #1 overall pick in the 2003 NHL Draft","Won 3 Stanley Cups in his career"] },
  { player:"Henrik Zetterberg", sport:"🏒 NHL", answer:"ZETTERBERG", era:"modern", stats:{G:"13",AST:"14",PTS:"27",GP:"22"}, ctx:"2008 Stanley Cup Playoffs MVP — Detroit Red Wings", clues:["Won the Conn Smythe Trophy as playoff MVP","Led Detroit Red Wings to the Stanley Cup","Swedish winger who was a 7th round draft pick","Was one of the most accomplished players of their generation"] },
  { player:"Jonathan Quick", sport:"🏒 NHL", answer:"QUICK", era:"modern", stats:{GAA:"1.41","SV%":".946",W:"16",TEAM:"Kings"}, ctx:"2012 Stanley Cup Playoffs MVP — Los Angeles Kings", clues:["Won the Conn Smythe Trophy with one of the greatest playoff performances ever","Led the LA Kings to their first Stanley Cup","Was dominant in Game 6 of the Finals vs the Devils","From Milford, Connecticut"] },
  { player:"Landon Donovan", sport:"⚽ Soccer", answer:"DONOVAN", era:"modern", stats:{G:"5",AST:"3",APP:"5",MIN:"450"}, ctx:"2010 FIFA World Cup — USA", clues:["Scored the famous injury-time winner vs Algeria","Sent USA through to the round of 16","Greatest American soccer player of his generation","Scored in the 91st minute to spark wild celebrations"] },
  { player:"Connor Bedard", sport:"🏒 NHL", answer:"BEDARD", era:"modern", stats:{G:"22",AST:"37",PTS:"61",YEAR:"2024"}, ctx:"2023-24 NHL Season — Chicago Blackhawks Rookie of Year", clues:["Was a highly touted defenseman from Toronto who had his career derailed when he was struck in the eye by a puck","Was the #1 overall pick in the 2023 NHL Draft","The Blackhawks won 3 Cups in 6 years forming the most recent NHL dynasty","From North Vancouver, British Columbia"] },
  { player:"Dimitar Berbatov", sport:"⚽ Soccer", answer:"BERBATOV", era:"modern", stats:{G:"20",AST:"7",APP:"32",MIN:"2318"}, ctx:"2010-11 Premier League Season — Manchester United golden boot", clues:["Was voted Player of the Season by his peers","United are the most widely supported football club in England","Scored 5 goals in a single Premier League game","Bulgarian striker known for his elegant style"] },
  { player:"David Duval", sport:"⛳ Golf", answer:"DUVAL", era:"classic", stats:{WINS:"4",AVG:"68.93",EARN:"$2.6M",YEAR:"1999"}, ctx:"1999 PGA Tour Season — Briefly World No. 1", clues:["Shot a 59 to win the Bob Hope Classic — only 4th player to do so","Reached World No. 1 in the world","From Jacksonville, Florida","His career declined rapidly after reaching the top"] },
  { player:"Yevgeny Kafelnikov", sport:"🎾 ATP", answer:"KAFELNIKOV", era:"classic", stats:{W:"76",L:"24",GRAND_SLAMS:"2",TITLES:"9"}, ctx:"1999 ATP Season — Australian Open champion and World No. 1", clues:["Won 2 Grand Slams and reached World No. 1","Won the Australian Open this year","Russian player who won the French Open in 1996","Was the first Russian man to win a Grand Slam title"] },
  { player:"Jake Delhomme", sport:"🏈 NFL", answer:"DELHOMME", era:"modern", stats:{YDS:"323",TD:"3",INT:"1",RTG:"100.1"}, ctx:"2003 NFC Championship — Carolina Panthers", clues:["Led the Carolina Panthers to Super Bowl XXXVIII","Was an undrafted free agent who became a starter","Scored 3 touchdowns during this season","His team lost to the Patriots in one of the highest scoring Super Bowls ever"] },
  { player:"Ryan Kesler", sport:"🏒 NHL", answer:"KESLER", era:"modern", stats:{G:"41",AST:"32",PTS:"73",YEAR:"2011"}, ctx:"2010-11 NHL Season — Vancouver Canucks", clues:["Won the Selke Trophy as best defensive forward","Had a career-high 41 goals this season","Was one of the most accomplished players of their generation","Was known as one of the best two-way forwards in the NHL"] },
  { player:"Just Fontaine", sport:"⚽ Soccer", answer:"FONTAINE", era:"legends", stats:{G:"13",APP:"6",MIN:"540",YEAR:"1958"}, ctx:"1958 FIFA World Cup — France", clues:["Scored 13 goals in a single World Cup — all-time record","Scored 13 goals during this tournament or season","The record has never been broken in over 60 years","French striker who played in the 1950s"] },
  { player:"Nate Thurmond", sport:"🏀 NBA", answer:"NATE THURMOND", era:"legends", stats:{PTS:"19.0",REB:"19.0",BLK:"4.0",FG:"44.0"}, ctx:"1967-68 NBA Season — San Francisco Warriors All-Star", clues:["Averaged over 19 points and 19 rebounds per game","From Akron Ohio — recorded the first official quadruple-double in NBA history","Was considered the toughest defensive center of the 1960s","Recorded the first official quadruple-double in NBA history in 1974"] },
  { player:"Jerry Lucas", sport:"🏀 NBA", answer:"JERRY LUCAS", era:"legends", stats:{PTS:"21.5",REB:"21.1",AST:"4.3",FG:"49.9"}, ctx:"1964-65 NBA Season — Cincinnati Royals Rookie of Year", clues:["Had a photographic memory and later became a world-famous memory expert and author","Averaged over 20 points and 20 rebounds as a rookie","Was a memory expert who later memorized the Manhattan phone book","Won a championship with the New York Knicks later in his career"] },
  { player:"Connie Hawkins", sport:"🏀 NBA", answer:"CONNIE HAWKINS", era:"legends", stats:{PTS:"24.6",REB:"10.4",AST:"4.8",FG:"48.9"}, ctx:"1967-68 ABA Season — Pittsburgh Pipers MVP", clues:["Won the ABA MVP in its very first season","Was banned from the NBA for years despite being innocent","Was finally admitted to the NBA in 1969","Was one of the most gifted ballhandlers of his generation"] },
  { player:"Rick Barry", sport:"🏀 NBA", answer:"RICK BARRY", era:"legends", stats:{PTS:"35.6",REB:"6.1",AST:"4.7",FT:"89.0"}, ctx:"1966-67 NBA Season — San Francisco Warriors scoring title", clues:["Led the NBA in scoring with 35.6 PPG","Averaged 35.6 points per game during this season","Famous for his underhand free throw shooting style","Won ABA and NBA championships in his career"] },
  { player:"Billy Cunningham", sport:"🏀 NBA", answer:"BILLY CUNNINGHAM", era:"classic", stats:{PTS:"24.8",REB:"13.0",AST:"4.3",FG:"45.5"}, ctx:"1971-72 ABA Season — Carolina Cougars MVP", clues:["Won the ABA MVP this season","Later coached the Philadelphia 76ers to the 1983 championship","Nicknamed The Kangaroo Kid for his leaping ability","The 76ers embraced The Process — one of the most deliberate rebuilds in sports history"] },
  { player:"Dave Cowens", sport:"🏀 NBA", answer:"DAVE COWENS", era:"classic", stats:{PTS:"20.5",REB:"16.2",AST:"4.4",FG:"45.9"}, ctx:"1972-73 NBA Season — Boston Celtics MVP", clues:["Won the NBA MVP award this season","Led the Celtics to the championship the following year","The Celtics have the most NBA championships in history with 17 total","Was a center who played with the intensity of a small forward"] },
  { player:"Bob Boozer", sport:"🏀 NBA", answer:"BOB BOOZER", era:"legends", stats:{PTS:"21.8",REB:"11.6",FG:"46.7",YEAR:"1964"}, ctx:"1963-64 NBA Season — New York Knicks All-Star", clues:["Was a 6x All-Star during his career","Averaged 21.8 points per game during this season","Won an Olympic gold medal with the US team in 1960","From Omaha, Nebraska"] },
  { player:"Tom Heinsohn", sport:"🏀 NBA", answer:"TOM HEINSOHN", era:"legends", stats:{PTS:"18.8",REB:"10.0",FG:"40.8",TITLES:"6"}, ctx:"1956-57 NBA Season — Boston Celtics Rookie of Year", clues:["Won Rookie of the Year in his first season","Won 6 NBA championships as a player with the Celtics","Later coached the Celtics to 2 more championships","Was elected to the Hall of Fame as both a player and coach"] },
  { player:"Lenny Wilkens", sport:"🏀 NBA", answer:"LENNY WILKENS", era:"legends", stats:{PTS:"22.4",AST:"8.1",REB:"5.6",STL:"2.1"}, ctx:"1967-68 NBA Season — St. Louis Hawks All-Star", clues:["Was a player-coach during his playing career","Was one of the most accomplished players of their generation","Later became one of the winningest coaches in NBA history","Was an All-Star as both a player and a coach — unique achievement"] },
  { player:"Earl Monroe", sport:"🏀 NBA", answer:"EARL MONROE", era:"legends", stats:{PTS:"23.8",AST:"5.5",REB:"4.0",FG:"46.2"}, ctx:"1967-68 NBA Season — Baltimore Bullets Rookie of Year", clues:["Won Rookie of the Year with Baltimore Bullets","Was one of the most accomplished players of their generation","Was traded to the New York Knicks where he helped win an NBA championship","Later won a championship with the New York Knicks"] },
  { player:"Bob Pettit", sport:"🏀 NBA", answer:"BOB PETTIT", era:"legends", stats:{PTS:"29.2",REB:"20.3",AST:"3.1",FG:"42.2"}, ctx:"1961-62 NBA Season — St. Louis Hawks All-Star", clues:["Was the first player in NBA history to score 20000 career points","From Baton Rouge Louisiana — was the first player in NBA history to score 20000 career points","Won the NBA MVP award twice","Was the first true power forward in NBA history"] },
  { player:"Elvin Hayes", sport:"🏀 NBA", answer:"ELVIN HAYES", era:"classic", stats:{PTS:"28.4",REB:"17.1",BLK:"3.7",FG:"42.5"}, ctx:"1970-71 NBA Season — San Diego Rockets scoring leader", clues:["Led the NBA in rebounds this season","From Rayville Louisiana — was selected second overall in the 1968 draft behind Wes Unseld","Nicknamed The Big E","Won the NBA championship with Washington Bullets in 1978"] },
  { player:"Dave Bing", sport:"🏀 NBA", answer:"DAVE BING", era:"legends", stats:{PTS:"27.1",AST:"7.1",REB:"4.5",FG:"46.9"}, ctx:"1967-68 NBA Season — Detroit Pistons scoring title", clues:["Won the NBA scoring title as a sophomore","The Bad Boys Pistons were notorious for their physical and intimidating style of play","Was a 7x All-Star","Later became the mayor of Detroit"] },
  { player:"Spencer Haywood", sport:"🏀 NBA", answer:"HAYWOOD", era:"legends", stats:{PTS:"29.6",REB:"19.5",BLK:"2.8",FG:"50.9"}, ctx:"1969-70 ABA Season — Denver Rockets MVP and Rookie", clues:["Won both the ABA MVP and Rookie of the Year","Changed NBA eligibility rules by suing to enter the league early","Was one of the most dominant big men of the early 1970s","Averaged 29.6 points per game during this season"] },

  { player:"Geoff Petrie", sport:"🏀 NBA", answer:"GEOFF PETRIE", era:"classic", stats:{PTS:"24.8",AST:"4.8",REB:"2.8",YEAR:"1971"}, ctx:"1970-71 NBA Season — Portland Trail Blazers co-Rookie of Year", clues:["Co-won Rookie of the Year with Dave Cowens","Was a Princeton graduate who became one of the top executives in the NBA after retiring","Was a prolific scorer in the early 1970s","Was known as Machine Gun for his rapid-fire shooting"] },
  { player:"Roger Staubach", sport:"🏈 NFL", answer:"ROGER STAUBACH", era:"classic", stats:{YDS:"2620",TD:"18",INT:"9",RTG:"93.5"}, ctx:"1977 NFL Season — Dallas Cowboys passing title", clues:["Won the NFL passing title this season","Scored 18 touchdowns during this season","Served in the US Navy before his NFL career","Won the Heisman Trophy at Navy before serving as a Navy officer for five years before his NFL career"] },
  { player:"Terry Bradshaw", sport:"🏈 NFL", answer:"TERRY BRADSHAW", era:"classic", stats:{YDS:"318",TD:"4",INT:"1",RTG:"112.4"}, ctx:"Super Bowl XIII MVP — Pittsburgh Steelers vs Dallas Cowboys", clues:["Won his second consecutive Super Bowl MVP","From Shreveport Louisiana — won four Super Bowls and was twice named Super Bowl MVP","Won 4 Super Bowls in his career","Later became a famous television analyst"] },
  { player:"Fran Tarkenton", sport:"🏈 NFL", answer:"FRAN TARKENTON", era:"classic", stats:{YDS:"3468",TD:"25",INT:"21",RTG:"82.7"}, ctx:"1975 NFL Season — Minnesota Vikings", clues:["Scored 25 touchdowns during this season","Was the all-time leader in passing yards when he retired","Reached 3 Super Bowls with the Vikings but lost all of them","Was one of the first scrambling quarterbacks"] },
  { player:"Bob Griese", sport:"🏈 NFL", answer:"BOB GRIESE", era:"classic", stats:{YDS:"1422",TD:"17",INT:"8",RTG:"93.9"}, ctx:"1972 NFL Season — Miami Dolphins perfect season", clues:["Was one of the most cerebral and precise quarterbacks of his era","Had a broken leg and was replaced by Earl Morrall for much of the year","Scored 17 touchdowns during this season","Finished 17-0 including the Super Bowl"] },
  { player:"Ken Stabler", sport:"🏈 NFL", answer:"KEN STABLER", era:"classic", stats:{YDS:"2737",TD:"27",INT:"17",RTG:"103.7"}, ctx:"1976 NFL Season — Oakland Raiders MVP", clues:["Won the NFL MVP award this season","Led Oakland Raiders to a Super Bowl win","Nicknamed The Snake","Was a left-handed quarterback"] },
  { player:"Chuck Foreman", sport:"🏈 NFL", answer:"CHUCK FOREMAN", era:"classic", stats:{REC:"73",YDS:"691",RUSH:"860",TD:"22"}, ctx:"1975 NFL Season — Minnesota Vikings All-Pro", clues:["Led the NFL in touchdowns with 22","The Vikings reached the Super Bowl 4 times but came away without a win each time","Was one of the first great receiving running backs","Was a 5x Pro Bowl selection"] },
  { player:"Ahmad Rashad", sport:"🏈 NFL", answer:"AHMAD RASHAD", era:"classic", stats:{REC:"80",YDS:"1095",TD:"9",YEAR:"1979"}, ctx:"1979 NFL Season — Minnesota Vikings All-Pro", clues:["Made a miracle catch to get Minnesota to the playoffs","The Vikings reached the Super Bowl 4 times but came away without a win each time","Was a 4x Pro Bowl wide receiver","Was previously known by a different name earlier in his career"] },
  { player:"Jack Lambert", sport:"🏈 NFL", answer:"JACK LAMBERT", era:"classic", stats:{INT:"6",FF:"3",SACK:"5",YEAR:"1976"}, ctx:"1976 NFL Season — Pittsburgh Steelers Defensive MVP", clues:["Won the Defensive Player of the Year award","Was the heart of the Steel Curtain defense","This performance came during the 1976 NFL season","Was known for his toothless grin and ferocious play"] },
  { player:"Mean Joe Greene", sport:"🏈 NFL", answer:"MEAN JOE GREENE", era:"classic", stats:{SACK:"11",FF:"4",DPOY:"2",YEAR:"1974"}, ctx:"1974 NFL Season — Pittsburgh Steelers Defensive Player of Year", clues:["Won Defensive Player of the Year for the second time","Was the anchor of the famous Steel Curtain defense","This performance came during the 1974 NFL season","Famous for a Coca-Cola commercial throwing his jersey to a boy"] },
  { player:"Franco Harris", sport:"🏈 NFL", answer:"FRANCO HARRIS", era:"classic", stats:{CAR:"262",YDS:"1246",TD:"10",YPC:"4.8"}, ctx:"1975 NFL Season — Pittsburgh Steelers All-Pro", clues:["Was the key runner for the dominant Steelers dynasty","Made the famous Immaculate Reception in 1972","Scored 10 touchdowns during this season","Won 4 Super Bowls with the Steelers"] },
  { player:"Mel Blount", sport:"🏈 NFL", answer:"MEL BLOUNT", era:"classic", stats:{INT:"11",PD:"20",DPOY:"1",YEAR:"1975"}, ctx:"1975 NFL Season — Pittsburgh Steelers Defensive Player of Year", clues:["Won the Defensive Player of the Year award","His physical style of play led to new contact rules for cornerbacks","Recorded 11 interceptions — one of the best totals of the era","Won 4 Super Bowls with the Steelers"] },
  { player:"Harold Carmichael", sport:"🏈 NFL", answer:"HAROLD CARMICHAEL", era:"classic", stats:{REC:"67",YDS:"1116",TD:"11",STREAK:"127"}, ctx:"1979 NFL Season — Philadelphia Eagles All-Pro", clues:["Caught a pass in 127 consecutive games — an NFL record at the time","Was 6ft 8in — one of the tallest wide receivers in NFL history","Scored 11 touchdowns during this season","Was a 4x Pro Bowl selection"] },
  { player:"Charlie Joiner", sport:"🏈 NFL", answer:"CHARLIE JOINER", era:"classic", stats:{REC:"71",YDS:"1132",TD:"7",YEAR:"1980"}, ctx:"1980 NFL Season — San Diego Chargers Air Coryell offense", clues:["Was part of the legendary Air Coryell passing attack","Was the all-time reception leader when he retired","Scored 7 touchdowns during this season","Was known for his precise route running"] },
  { player:"John Riggins", sport:"🏈 NFL", answer:"JOHN RIGGINS", era:"classic", stats:{CAR:"375",YDS:"1347",TD:"24",YEAR:"1983"}, ctx:"1983 NFL Season — Washington Redskins rushing record", clues:["Set the NFL single-season rushing TD record with 24","Scored 24 touchdowns during this season","Won the Super Bowl XVII MVP the year before","Nicknamed The Diesel"] },
  { player:"Otto Graham", sport:"🏈 NFL", answer:"OTTO GRAHAM", era:"legends", stats:{YDS:"2816",TD:"25",INT:"12",RTG:"98.4"}, ctx:"1953 NFL Season — Cleveland Browns champion", clues:["Appeared in 10 consecutive championship games and won 7","Led Cleveland Browns to another championship","Was the face of the most dominant dynasty in early professional football","From Waukegan, Illinois"] },
  { player:"Elroy Hirsch", sport:"🏈 NFL", answer:"ELROY HIRSCH", era:"legends", stats:{REC:"66",YDS:"1495",TD:"17",YPR:"22.7"}, ctx:"1951 NFL Season — Los Angeles Rams record season", clues:["Set records that stood for decades this season","Caught 17 touchdown passes","From Wausau Wisconsin — was nicknamed Crazylegs for his unusual running style as a receiver","Nicknamed Crazylegs for his unusual running style"] },
  { player:"Bobby Layne", sport:"🏈 NFL", answer:"BOBBY LAYNE", era:"legends", stats:{YDS:"2403",TD:"16",INT:"21",COMP:"48.9"}, ctx:"1953 NFL Championship — Detroit Lions consecutive titles", clues:["Led Detroit Lions to back-to-back NFL championships","The Lions have never appeared in a Super Bowl — the longest such drought in the NFL","Was known for his leadership and colorful lifestyle","Was traded to Pittsburgh and reportedly cursed the Lions for 50 years"] },
  { player:"Red Grange", sport:"🏈 NFL", answer:"RED GRANGE", era:"legends", stats:{TD:"7",RUSH:"363",REC:"32",YEAR:"1927"}, ctx:"Career — The Galloping Ghost who legitimized the NFL", clues:["Was the first superstar of the NFL and made it nationally relevant","Nicknamed The Galloping Ghost for his elusiveness","Scored 7 touchdowns during this season","His signing drew enormous crowds and legitimized pro football"] },
  { player:"Bronko Nagurski", sport:"🏈 NFL", answer:"BRONKO NAGURSKI", era:"legends", stats:{RUSH:"533",TD:"7",YPC:"4.4",YEAR:"1934"}, ctx:"1934 NFL Season — Chicago Bears fullback", clues:["Was considered the most feared runner in early NFL history","Scored 7 touchdowns during this season","Came out of retirement at age 35 and helped win a championship","Also a professional wrestler who was world heavyweight champion"] },
  { player:"Don Hutson", sport:"🏈 NFL", answer:"DON HUTSON", era:"legends", stats:{REC:"74",YDS:"1211",TD:"17",YPR:"16.4"}, ctx:"1942 NFL Season — Green Bay Packers MVP", clues:["Won the MVP award in consecutive years (1941-42)","Set records that stood for decades","The Packers are the only community-owned franchise in major American professional sports","Is credited with inventing the modern wide receiver position"] },
  { player:"Sammy Baugh", sport:"🏈 NFL", answer:"SAMMY BAUGH", era:"legends", stats:{YDS:"1754",TD:"16",INT:"11",COMP:"56.2"}, ctx:"1945 NFL Season — Washington Redskins three-way leader", clues:["Led the NFL in passing, punting, AND interceptions in the same season","From Temple Texas — was a two-way star who also led the NFL in interceptions as a defensive back","Led the NFL in passing yards six times and was one of the first true pocket passers","Is considered the greatest quarterback of the pre-modern era"] },
  { player:"Steve Van Buren", sport:"🏈 NFL", answer:"STEVE VAN BUREN", era:"legends", stats:{CAR:"217",YDS:"1146",TD:"14",YPC:"5.3"}, ctx:"1945 NFL Season — Philadelphia Eagles rushing title", clues:["Led the NFL in rushing yards and touchdowns","Scored 14 touchdowns during this season","Led the Eagles to back-to-back NFL championships in 1948-49","The Eagles wore sneakers on icy field in the 1948 Championship"] },
  { player:"Dante Lavelli", sport:"🏈 NFL", answer:"DANTE LAVELLI", era:"legends", stats:{REC:"47",YDS:"843",TD:"9",YPR:"17.9"}, ctx:"1946 AAFC Season — Cleveland Browns first champion", clues:["Won the AAFC championship in the league's very first season","Scored 9 touchdowns during this season","Nicknamed Gluefingers for his catching ability","Won 3 AAFC and 3 NFL championships"] },
  { player:"Bill Dudley", sport:"🏈 NFL", answer:"BILL DUDLEY", era:"legends", stats:{YDS:"604",INT:"10",RETURN:"385",TD:"6"}, ctx:"1946 NFL MVP Season — Pittsburgh Steelers", clues:["Won the NFL MVP award as the most versatile player","Led the NFL in rushing, interceptions, AND return yards","Scored 6 touchdowns during this season","Won the NFL MVP in 1946 and led the league in rushing scoring and interceptions in the same season"] },
  { player:"Ken Strong", sport:"🏈 NFL", answer:"KEN STRONG", era:"legends", stats:{PTS:"64",RUSH:"219",KICK:"9FG",YEAR:"1934"}, ctx:"1934 NFL Championship — New York Giants sneakers game", clues:["Scored 17 points in the famous Sneakers Game championship","Giants players changed into basketball shoes at halftime for traction","This performance came during the 1934 NFL season","Was both a runner and a kicker"] },
  { player:"Spec Sanders", sport:"🏈 NFL", answer:"SPEC SANDERS", era:"legends", stats:{YDS:"1432",TD:"19",REC:"24",AVG:"8.6"}, ctx:"1947 AAFC Season — New York Yankees rushing leader", clues:["Led the AAFC in rushing AND scoring this season","The Yankees have won 27 World Series championships — by far the most of any team","Was a dual threat runner and receiver","Had one of the most dominant individual seasons in AAFC history"] },
  { player:"Norm Van Brocklin", sport:"🏈 NFL", answer:"NORM VAN BROCKLIN", era:"legends", stats:{YDS:"554",TD:"5",COMP:"27",DATE:"Sept 28 1951"}, ctx:"Sept 28 1951 — Single game NFL passing yards record", clues:["Set the all-time single-game passing yards record (554)","Scored 5 touchdowns during this season","Nicknamed The Dutchman","Won NFL championships as both a player and head coach"] },
  { player:"Tom Fears", sport:"🏈 NFL", answer:"TOM FEARS", era:"legends", stats:{REC:"77",YDS:"1013",TD:"9",YPR:"13.2"}, ctx:"1949 NFL Season — Los Angeles Rams receiving record", clues:["Set the NFL single-season receptions record with 77","Won the NFL championship with the Rams in 1951","Scored 9 touchdowns during this season","Was one of the first great wide receivers of the modern era"] },
  { player:"George McAfee", sport:"🏈 NFL", answer:"GEORGE MCAFEE", era:"legends", stats:{AVG:"8.0",TD:"5",INT:"7",YEAR:"1941"}, ctx:"1941 NFL Season — Chicago Bears All-Pro", clues:["Was the most dangerous return man of his era","Scored 5 touchdowns during this season","Won 2 NFL championships with Chicago","Was considered the most dangerous open-field runner in the NFL during the early 1940s"] },
  { player:"Dub Jones", sport:"🏈 NFL", answer:"DUB JONES", era:"legends", stats:{TD:"6",DATE:"Nov 25 1951",RUSH:"4",REC:"2"}, ctx:"Nov 25 1951 — Six touchdowns in one game vs Pittsburgh", clues:["Scored 6 touchdowns in a single game vs the Pittsburgh Steelers","Scored 6 touchdowns during this season","Tied Ernie Nevers NFL record for TDs in a game","His son also became an NFL quarterback — one of football's few father-son QB duos"] },
  { player:"Mac Speedie", sport:"🏈 NFL", answer:"MAC SPEEDIE", era:"legends", stats:{REC:"62",YDS:"1028",TD:"8",YPR:"16.6"}, ctx:"1947 AAFC Season — Cleveland Browns champion", clues:["Led the AAFC in receiving this season","Played alongside Dante Lavelli for the Cleveland Browns","Was considered one of the best receivers of the late 1940s","Later left to play in the Canadian Football League"] },
  { player:"Frankie Albert", sport:"🏈 NFL", answer:"FRANKIE ALBERT", era:"legends", stats:{YDS:"1847",TD:"29",INT:"10",COMP:"53.7"}, ctx:"1948 AAFC Season — San Francisco 49ers pioneer", clues:["Was the first great quarterback in San Francisco 49ers history","Led the 49ers in the AAFC for years","Was a left-handed quarterback — extremely rare in professional football","From Glendale, California"] },
  { player:"Sergio Garcia", sport:"⛳ Golf", answer:"SERGIO GARCIA", era:"modern", stats:{SCORE:"-9",PLAYOFF:"W",YEAR:"2017",HOLES:"1"}, ctx:"2017 Masters — First major after years of near misses", clues:["Won his first major at The Masters at age 37","Had been considered the best player without a major","From Borriol Spain","Beat Justin Rose in a playoff at Augusta"] },
  { player:"Henrik Stenson", sport:"⛳ Golf", answer:"HENRIK STENSON", era:"modern", stats:{SCORE:"-20",OPEN:"2016 Champion",MARGIN:"3",YEAR:"2016"}, ctx:"2016 British Open — Epic duel with Mickelson", clues:["Won The Open Championship in an epic duel with Phil Mickelson","Shot 63 in the final round to win","From Gothenburg Sweden","Was nicknamed The Iceman for his calm demeanor"] },
  { player:"Fred Couples", sport:"⛳ Golf", answer:"FRED COUPLES", era:"classic", stats:{WINS:"4",MAJORS:"1",AVG:"69.38",YEAR:"1992"}, ctx:"1992 Masters — Fred Couples wins first major", clues:["Won The Masters for his only major championship","His ball famously stayed on the bank on 12 and he made birdie","From Seattle Washington","Known as Boom Boom for his long driving"] },
  { player:"Hale Irwin", sport:"⛳ Golf", answer:"HALE IRWIN", era:"classic", stats:{WINS:"3",MAJORS:"1",AGE:"45",YEAR:"1990"}, ctx:"1990 US Open — Won at age 45", clues:["Won the US Open at age 45 — the oldest major winner at the time","Won 3 US Opens in his career","From Joplin Missouri","Was also a scholarship football player at the University of Colorado"] },
  { player:"Ian Woosnam", sport:"⛳ Golf", answer:"IAN WOOSNAM", era:"classic", stats:{WINS:"1",MAJORS:"1",WEEKS_NO1:"101",YEAR:"1991"}, ctx:"1991 Masters — Welsh champion reaches World No. 1", clues:["Won The Masters and became World No. 1","Only 5ft 4in — one of the shortest players to reach World No. 1","From Oswestry England of Welsh descent","Was known for his incredible distance given his small stature"] },
  { player:"Mark O'Meara", sport:"⛳ Golf", answer:"MARK OMEARA", era:"classic", stats:{WINS:"2",MAJORS:"2",AVG:"70.47",YEAR:"1998"}, ctx:"1998 PGA Tour Season — Masters and British Open at age 41", clues:["Won The Masters and The Open Championship in the same year at age 41","Was a close friend of Tiger Woods for many years","From Goldsboro North Carolina","Won both his majors in his late 30s and early 40s"] },
  { player:"Cy Denneny", sport:"🏒 NHL", answer:"CY DENNENY", era:"legends", stats:{G:"318",YEAR:"1929",TEAM:"Senators",STANLEY_CUPS:"4"}, ctx:"Career — Ottawa Senators early NHL scoring leader", clues:["Was the NHL all-time leading scorer when he retired","Was part of the Ottawa Senators dynasty of the early 1920s that won four Stanley Cups in six years","Was one of the top goal scorers of the early NHL era","Played in the NHL's first season in 1917-18"] },
  { player:"Frank Mahovlich", sport:"🏒 NHL", answer:"FRANK MAHOVLICH", era:"legends", stats:{G:"48",AST:"32",PTS:"80",PIM:"131"}, ctx:"1960-61 NHL Season — Toronto Maple Leafs record", clues:["Scored 48 goals this season — a Maple Leafs record at the time","Won 6 Stanley Cups in his career — 4 with Toronto and 2 with Montreal","Nicknamed The Big M","Won 6 Stanley Cups in his career"] },
  { player:"Doug Bentley", sport:"🏒 NHL", answer:"DOUG BENTLEY", era:"legends", stats:{G:"33",AST:"40",PTS:"73",YEAR:"1943"}, ctx:"1942-43 NHL Season — Chicago Blackhawks scoring title", clues:["Won the NHL scoring title this season","The Blackhawks won 3 Cups in 6 years forming the most recent NHL dynasty","Was part of one of hockey's greatest sibling trios","Was one of the most accomplished players of their generation"] },
  { player:"Max Bentley", sport:"🏒 NHL", answer:"MAX BENTLEY", era:"legends", stats:{G:"29",AST:"43",PTS:"72",YEAR:"1946"}, ctx:"1945-46 NHL Season — Chicago Blackhawks MVP", clues:["Won the Hart Trophy as league MVP this season","Nicknamed The Dipsy-Doodle Dandy from Delisle for his stickhandling","Was traded in the most shocking deal of his era for 5 players","Won Stanley Cups with the Toronto Maple Leafs"] },
  { player:"Roger Clemens", sport:"⚾ MLB", answer:"ROGER CLEMENS", era:"modern", stats:{W:"354",SO:"4672",ERA:"3.12",CY:"7"}, ctx:"Career Totals — 7 Cy Young Awards the most ever", clues:["Won 7 Cy Young Awards — the most by any pitcher in history","Struck out 4672 batters","From Dayton Ohio","Was called The Rocket for his fastball"] },
  { player:"Orel Hershiser", sport:"⚾ MLB", answer:"OREL HERSHISER", era:"classic", stats:{STREAK:"59",ERA:"2.26",W:"23",YEAR:"1988"}, ctx:"Best Season — Set an all-time MLB scoreless innings record", clues:["Nicknamed Bulldog by manager Tommy Lasorda","The Dodgers moved from Brooklyn to Los Angeles in 1958 breaking New York hearts","Won the NL Cy Young and World Series MVP that year","Was nominated for a Grammy Award after singing on The Tonight Show following his record season"] },
  { player:"Curt Schilling", sport:"⚾ MLB", answer:"CURT SCHILLING", era:"modern", stats:{W:"216",SO:"3116",SOCK:"Bloody",YEAR:"2004"}, ctx:"Career Totals — The Bloody Sock World Series hero", clues:["Pitched through a sutured torn tendon in the famous Bloody Sock game","Won 216 career games","Was voted into the Hall of Fame after years of controversy","From Anchorage Alaska"] },
  { player:"Tom Glavine", sport:"⚾ MLB", answer:"TOM GLAVINE", era:"modern", stats:{W:"305",ERA:"3.54",CY:"2",YEAR:"1998"}, ctx:"Career Totals — Won 305 games as the finesse left-hander", clues:["Won 305 career games with 2 Cy Young Awards","The Braves won 14 consecutive division titles — one of the most sustained runs in sport","From Concord Massachusetts","Was also a highly recruited hockey player growing up"] },
  { player:"Juan Marichal", sport:"⚾ MLB", answer:"JUAN MARICHAL", era:"classic", stats:{W:"243",ERA:"2.89",CG:"244",KICK:"High leg"}, ctx:"Career Totals — Dominican Dandy with the famous high leg kick", clues:["Won 243 games with a 2.89 ERA","Known for his distinctive high leg kick delivery","The Giants moved from New York to San Francisco in 1958 alongside the Dodgers","From Laguna Verde Dominican Republic — nickname The Dominican Dandy"] },
  { player:"Whitey Ford", sport:"⚾ MLB", answer:"WHITEY FORD", era:"classic", stats:{PCT:".690",W:"236",ERA:"2.75",WS:"Record"}, ctx:"Career Totals — The Chairman of the Board for the Yankees dynasty", clues:["Had a .690 winning percentage — highest for any 200-win pitcher","Won 236 games for the New York Yankees","Holds the World Series record for consecutive scoreless innings","Nicknamed The Chairman of the Board"] },
  { player:"Fergie Jenkins", sport:"⚾ MLB", answer:"FERGIE JENKINS", era:"classic", stats:{W:"284",SO:"3192",BB:"997",CANADA:"First HoF"}, ctx:"Career Totals — First Canadian in the Baseball Hall of Fame", clues:["Was the first Canadian player inducted into the Baseball Hall of Fame","Won 284 games with remarkable control — only 997 walks in 4500+ innings","Won the NL Cy Young in 1971","From Chatham Ontario Canada"] },
  { player:"Gaylord Perry", sport:"⚾ MLB", answer:"GAYLORD PERRY", era:"classic", stats:{W:"314",CY:"2",BOTH:"AL and NL",SPITTER:"Suspected"}, ctx:"Career Totals — Won Cy Young in both leagues", clues:["Won the Cy Young Award in both the AL and NL — first pitcher to do so","Always suspected of throwing a spitball but rarely caught","Won 314 career games","Wrote a book called Me and the Spitter"] },
  { player:"Jim Palmer", sport:"⚾ MLB", answer:"JIM PALMER", era:"classic", stats:{W:"268",ERA:"2.86",CY:"3",SLAM:"None given up"}, ctx:"Career Totals — Never gave up a grand slam in his career", clues:["Never allowed a grand slam in his entire career","Won 3 Cy Young Awards with the Baltimore Orioles","Won 268 games","Was also a famous Jockey underwear model"] },
  { player:"Christy Mathewson", sport:"⚾ MLB", answer:"CHRISTY MATHEWSON", era:"legends", stats:{W:"373",ERA:"2.13",SO:"2507",PITCH:"Fadeaway"}, ctx:"Career Totals — Gentleman pitcher of the Giants", clues:["Won 373 games with a 2.13 ERA","Invented the fadeaway pitch now called a screwball","Posted an ERA of 2.13 — among the best of the season","Was considered a gentleman and role model in an era of rough players"] },
  { player:"Lefty Grove", sport:"⚾ MLB", answer:"LEFTY GROVE", era:"legends", stats:{W:"300",ERA:"3.06",PCT:".680",MVP:"1931"}, ctx:"Career Totals — .680 winning percentage and MVP", clues:["Won 300 games with a .680 winning percentage — one of the best ever","Won the MVP award in 1931 going 31-4","The Red Sox ended an 86-year championship drought known as the Curse of the Bambino","Considered one of the best left-handed pitchers in baseball history"] },
  { player:"Nap Lajoie", sport:"⚾ MLB", answer:"NAP LAJOIE", era:"legends", stats:{AVG:".338",H:"3242",RBI:"1599",NAMED:"Team"}, ctx:"Career Totals — The team was named after him", clues:["Had a career batting average of .338","The Cleveland team was renamed the Naps after him","Won the batting title 4 times","Was considered the best second baseman of the dead ball era"] },
  { player:"Tris Speaker", sport:"⚾ MLB", answer:"TRIS SPEAKER", era:"legends", stats:{AVG:".345",DOUBLES:"792",H:"3514",CF:"Greatest"}, ctx:"Career Totals — Most doubles ever and greatest defensive CF", clues:["Has the most doubles in baseball history with 792","Had 3514 career hits — fourth most all-time","Was considered the greatest defensive center fielder who ever lived","Batted .345 during this standout season"] },
  { player:"Hack Wilson", sport:"⚾ MLB", answer:"HACK WILSON", era:"legends", stats:{HR:"56",RBI:"191",AVG:".307",YEAR:"1930"}, ctx:"Best Season — 56 HR and 191 RBI in 1930", clues:["Holds the all-time MLB record for RBI in a season with 191","Hit 56 home runs — still the NL record","The Cubs ended a 108-year World Series drought in 2016 in one of sports greatest moments","Was only 5ft 6in and 195 pounds"] },
  { player:"Harry Heilmann", sport:"⚾ MLB", answer:"HARRY HEILMANN", era:"legends", stats:{AVG:".342",TITLES:"4",ODD:"Odd years only",YEAR:"1927"}, ctx:"Career Totals — Won batting title only in odd years", clues:["Won 4 batting titles — all in odd years 1921 1923 1925 1927","Had a career batting average of .342","The Tigers have one of baseball's most storied franchises featuring Ty Cobb Hank Greenberg and Al Kaline","Coached by Cobb who played for the same team"] },
  { player:"Pie Traynor", sport:"⚾ MLB", answer:"PIE TRAYNOR", era:"legends", stats:{AVG:".320",RBI:"1273",TEAM:"Pittsburgh",BEST:"3B of era"}, ctx:"Career Totals — Greatest third baseman of the pre-war era", clues:["Was consistently voted the greatest third baseman of his era","Played his entire career for the Pittsburgh Pirates","Batted .320 career average","Was named Harold Joseph but called Pie since childhood"] },
  { player:"Fernando Torres", sport:"⚽ Soccer", answer:"FERNANDO TORRES", era:"modern", stats:{G:"33",APP:"38",YEAR:"2008",COUNTRY:"Spain"}, ctx:"Best Season — 33 Premier League goals in first Liverpool season", clues:["Scored 33 goals in his debut Premier League season","Liverpool have won 6 European Cups — more than any other English club","From Fuenlabrada Spain","Won the World Cup and European Championship with Spain"] },
  { player:"Wayne Rooney", sport:"⚽ Soccer", answer:"WAYNE ROONEY", era:"modern", stats:{G:"253",APP:"559",RECORD:"Man United",COUNTRY:"England"}, ctx:"Career Totals — Manchester United and England all-time top scorer", clues:["Became Manchester United all-time record scorer with 253 goals","Was also England all-time top scorer","From Croxteth Liverpool","Was considered the most complete English player of his generation"] },
  { player:"Zlatan Ibrahimovic", sport:"⚽ Soccer", answer:"ZLATAN IBRAHIMOVIC", era:"modern", stats:{G:"570+",LEAGUES:"7",COUNTRY:"Sweden",STYLE:"Acrobatic"}, ctx:"Career Totals — Won league titles in 7 different countries", clues:["Won league titles in the Netherlands Italy Spain France England and Sweden","Scored over 570 career goals","From Malmo Sweden","Was known for outrageous goals and extraordinary self-confidence"] },
  { player:"Patrick Kluivert", sport:"⚽ Soccer", answer:"PATRICK KLUIVERT", era:"classic", stats:{G:"40",UCL:"18yo",YEAR:"1995",COUNTRY:"Netherlands"}, ctx:"Was one of the most accomplished players of their generation", clues:["Scored the winning goal in the 1995 Champions League Final aged just 18","Barcelona is owned by its members — a cooperative with over 150000 supporter-owners","From Amsterdam Netherlands","Was considered one of the most talented strikers of the late 1990s"] },
  { player:"Gabriel Batistuta", sport:"⚽ Soccer", answer:"GABRIEL BATISTUTA", era:"classic", stats:{G:"54",COUNTRY:"Argentina",CLUB:"Fiorentina",NICK:"Batigol"}, ctx:"Career Totals — Argentina all-time top scorer", clues:["Was Argentina all-time top scorer with 54 goals","Was one of the most accomplished players of their generation","Nicknamed Batigol","From Reconquista Argentina"] },
  { player:"Gheorghe Hagi", sport:"⚽ Soccer", answer:"GHEORGHE HAGI", era:"classic", stats:{G:"35",COUNTRY:"Romania",NICK:"Maradona of the Carpathians",YEAR:"1994"}, ctx:"Career Totals — The Maradona of the Carpathians", clues:["Led Romania to the 1994 World Cup quarterfinals","Nicknamed The Maradona of the Carpathians","Real Madrid have won the most UEFA Champions League titles of any club in history","From Sacele Romania"] },
  { player:"Jari Litmanen", sport:"⚽ Soccer", answer:"JARI LITMANEN", era:"classic", stats:{G:"32",UCL:"1995",COUNTRY:"Finland",KING:"Ajax"}, ctx:"Career Totals — The King of Ajax from Finland", clues:["Was the creative genius behind the 1995 Ajax Champions League winners","Nicknamed The King at Ajax","From Hollola Finland — the greatest Finnish player ever","Liverpool have won 6 European Cups — more than any other English club"] },
  { player:"Sandor Kocsis", sport:"⚽ Soccer", answer:"SANDOR KOCSIS", era:"legends", stats:{G:"11",APP:"6",YEAR:"1954",HEAD:"Golden"}, ctx:"1954 World Cup — Hungary's lethal header specialist", clues:["Scored 11 goals in 6 games at the 1954 World Cup","Nicknamed The Golden Head for his aerial ability","Hungary was considered the best team in the world but lost the final","Scored 75 goals in 68 games for Hungary"] },
  { player:"Stanley Matthews", sport:"⚽ Soccer", answer:"STANLEY MATTHEWS", era:"legends", stats:{CAREER:"33 years",BALLON:"1956",FA_CUP:"1953",WIZARD:"Dribbling"}, ctx:"Career Totals — Played top-flight football until age 50", clues:["Played in the First Division until age 50 — a record that will never be broken","Won the first ever Ballon d Or in 1956","Was the first winner of the Ballon d'Or in 1956 and played top-flight football until age 50","Nicknamed The Wizard of the Dribble"] },
  { player:"Tostao", sport:"⚽ Soccer", answer:"TOSTAO", era:"classic", stats:{G:"8",APP:"54",YEAR:"1970",EYE:"Surgery pre-WC"}, ctx:"1970 World Cup — Won despite needing pre-tournament eye surgery", clues:["Won the World Cup with the legendary 1970 Brazil team","Nearly missed the tournament after needing emergency eye surgery","Played alongside Pele Rivelino and Jairzinho","Retired at age 26 on medical advice"] },
  { player:"Raymond Kopa", sport:"⚽ Soccer", answer:"RAYMOND KOPA", era:"legends", stats:{BALLON:"1958",UCL:"3",NATION:"France",FIRST:"French Ballon"}, ctx:"Career Totals — First French Ballon d Or winner", clues:["Won the Ballon d Or in 1958 — the first French player to do so","Won 3 consecutive European Cups with Real Madrid","From Noeux-les-Mines France of Polish descent","Was part of the Real Madrid dynasty alongside Di Stefano"] },
  { player:"Pete Sampras", sport:"🎾 ATP", answer:"PETE SAMPRAS", era:"modern", stats:{GRAND_SLAMS:"14",WIMBLEDON:"7x winner",WEEKS_NO1:"101",WEEKS:"286"}, ctx:"Career Totals — 14 Grand Slams and 286 weeks at World No. 1", clues:["Won 14 Grand Slam titles in his career","Spent 286 weeks at World No. 1 — a record at the time","Won Wimbledon 7 times and the US Open 5 times","Won 14 Grand Slam singles titles and was ranked World No. 1 for 286 weeks"] },
  { player:"Andre Agassi", sport:"🎾 ATP", answer:"ANDRE AGASSI", era:"modern", stats:{GRAND_SLAMS:"8",CAREER_SLAM:"All 4 majors",WEEKS_NO1:"101",YEAR:"1999"}, ctx:"Career Totals — Won all 4 Grand Slams completing Career Grand Slam", clues:["Won all 4 Grand Slam titles to complete the Career Grand Slam","Was once ranked No. 141 before coming back to win more majors","From Las Vegas Nevada","Was married to Brooke Shields and later Steffi Graf"] },
  { player:"Stefan Edberg", sport:"🎾 ATP", answer:"STEFAN EDBERG", era:"modern", stats:{GRAND_SLAMS:"6",WEEKS_NO1:"101",SPORTSMANSHIP:"Award named",YEAR:"1990"}, ctx:"Career Totals — Serve-volley champion with sportsmanship award named after him", clues:["Won 6 Grand Slam titles","Was a classic serve and volley player","Won six Grand Slam titles and was considered one of the greatest serve-and-volleyers ever","From Vastervik Sweden"] },
  { player:"Boris Becker", sport:"🎾 ATP", answer:"BORIS BECKER", era:"modern", stats:{GRAND_SLAMS:"6",WIMBLEDON:"3x winner",AGE:"17",YEAR:"1985"}, ctx:"Career Totals — Won Wimbledon at 17 then 5 more Slams", clues:["Won Wimbledon at age 17 — the youngest winner ever","Won 6 Grand Slam titles in his career","From Leimen West Germany","Was known for his big serve and diving volleys"] },
  { player:"Martina Hingis", sport:"🎾 WTA", answer:"MARTINA HINGIS", era:"modern", stats:{GRAND_SLAMS:"5",WEEKS_NO1:"101",AGE:"16",YEAR:"1997"}, ctx:"Career Totals — Youngest World No. 1 in history at age 16", clues:["Won 5 Grand Slam singles titles","Was the youngest player to reach World No. 1 at age 16","From Kosice Czechoslovakia but representing Switzerland","Became the youngest player to be ranked World No. 1 in tennis history at age 16"] },
  { player:"Lindsay Davenport", sport:"🎾 WTA", answer:"LINDSAY DAVENPORT", era:"modern", stats:{GRAND_SLAMS:"3",WEEKS_NO1:"101",WIMBLEDON:"1x winner",YEAR:"1998"}, ctx:"Career Totals — World No. 1 American champion with 3 Slams", clues:["Won 3 Grand Slam titles and reached World No. 1","Won the US Open Australian Open and Wimbledon","From Palos Verdes California","Was known for her powerful groundstrokes"] },
  { player:"Kim Clijsters", sport:"🎾 WTA", answer:"KIM CLIJSTERS", era:"modern", stats:{GRAND_SLAMS:"4",US:"3",COMEBACK:"3 slams as mom",YEAR:"2009"}, ctx:"Career Totals — Won 3 Slams after coming out of retirement", clues:["Won 4 Grand Slam titles in her career","Was one of the most accomplished players of their generation","Won 3 US Opens and 1 Australian Open","From Bilzen Belgium"] },
  { player:"Justine Henin", sport:"🎾 WTA", answer:"JUSTINE HENIN", era:"modern", stats:{GRAND_SLAMS:"7",FRENCH_OPEN:"4x winner",BACKHAND:"One-handed",YEAR:"2007"}, ctx:"Career Totals — 7 Slams with famous one-handed backhand", clues:["Won 7 Grand Slam titles in her career","Won the French Open 4 times without losing a set","Was known for her one-handed backhand — rare in womens tennis","From Liege Belgium"] },
  { player:"Amelie Mauresmo", sport:"🎾 WTA", answer:"AMELIE MAURESMO", era:"modern", stats:{GRAND_SLAMS:"2",WEEKS_NO1:"101",AUS_OPEN:"1x winner",YEAR:"2006"}, ctx:"Career Totals — French champion who won Australian Open and Wimbledon", clues:["Won the Australian Open and Wimbledon in 2006","Reached World No. 1 in 2004","From Saint-Germain-en-Laye France","Was known for her powerful serve and all-court game"] },
  { player:"Jimmy Connors", sport:"🎾 ATP", answer:"JIMMY CONNORS", era:"classic", stats:{GRAND_SLAMS:"8",WEEKS_NO1:"101",FIGHTER:"Greatest",YEAR:"1974"}, ctx:"Career Totals — 8 Slams with the biggest fighting spirit", clues:["Won 8 Grand Slam titles including 5 US Opens","Spent 268 weeks at World No. 1","From East St. Louis Illinois","Was known for his relentless fighting spirit and two-handed backhand"] },
  { player:"Guillermo Vilas", sport:"🎾 ATP", answer:"GUILLERMO VILAS", era:"classic", stats:{GRAND_SLAMS:"4",STREAK:"62 clay wins",POET:"Yes",YEAR:"1977"}, ctx:"Career Totals — 4 Slams and 62 consecutive clay court wins", clues:["Won 4 Grand Slam titles including 2 French Opens","Won 62 consecutive matches on clay in 1977","Was also a romantic poet who published books of poetry","From Mar del Plata Argentina"] },
  { player:"Ken Rosewall", sport:"🎾 ATP", answer:"KEN ROSEWALL", era:"legends", stats:{GRAND_SLAMS:"8",SPAN:"19 years",NICK:"Muscles",YEAR:"1972"}, ctx:"Career Totals — Won Grand Slams across three different decades", clues:["Won his first Grand Slam in 1953 and his last in 1972 — 19 years apart","Won 8 Grand Slam titles across three different decades","From Sydney Australia","Nicknamed Muscles despite his 5ft 7in slight frame"] },
  { player:"Roy Emerson", sport:"🎾 ATP", answer:"ROY EMERSON", era:"legends", stats:{GRAND_SLAMS:"12",AUS_OPEN:"6x winner",FITNESS:"Greatest",YEAR:"1965"}, ctx:"Career Totals — 12 Slams the most before Sampras", clues:["Won 12 Grand Slam titles — the most in history before Sampras","Won the Australian Open 6 times","From Blackbutt Queensland Australia","Was known for his extraordinary physical fitness"] },
  { player:"John Newcombe", sport:"🎾 ATP", answer:"JOHN NEWCOMBE", era:"legends", stats:{GRAND_SLAMS:"7",WIMBLEDON:"3x winner",MUSTACHE:"Famous",YEAR:"1971"}, ctx:"Career Totals — 7 Slams with the most famous mustache in tennis", clues:["Won 7 Grand Slam singles titles including 3 Wimbledons","Won 4 Davis Cups with Australia","From Sydney Australia","Was famous for his distinctive handlebar mustache"] },
  { player:"Althea Gibson", sport:"🎾 WTA", answer:"ALTHEA GIBSON", era:"legends", stats:{GRAND_SLAMS:"5",WIMBLEDON:"2x winner",FIRST:"Black player Slam",YEAR:"1957"}, ctx:"Career Totals — First Black player to win a Grand Slam", clues:["Was the first Black player to win a Grand Slam title","Won 5 Grand Slam singles titles including 2 Wimbledons","From Clarendon County South Carolina","Paved the way for Arthur Ashe and generations of Black tennis players"] },
  { player:"Louise Brough", sport:"🎾 WTA", answer:"LOUISE BROUGH", era:"legends", stats:{GRAND_SLAMS:"6",WIMBLEDON:"4x winner",STREAK:"4 consecutive",YEAR:"1950"}, ctx:"Career Totals — 4 consecutive Wimbledon titles", clues:["Won 4 consecutive Wimbledon titles from 1948 to 1951","Won 6 Grand Slam singles titles total","From Oklahoma City Oklahoma","Won 13 Grand Slam doubles titles with partner Margaret du Pont"] },
  { player:"Pauline Betz", sport:"🎾 WTA", answer:"PAULINE BETZ", era:"legends", stats:{GRAND_SLAMS:"4",US:"4",YEAR:"1946",BAN:"For talking to pros"}, ctx:"Career Totals — 4 US Championships then banned for talking to pros", clues:["Won 4 Grand Slam titles including 4 US Championships","Was banned from amateur tennis for merely talking to a professional promoter","From Dayton Ohio","Had her career cut short by the ban despite being the worlds best player"] },
  { player:"Frank Sedgman", sport:"🎾 ATP", answer:"FRANK SEDGMAN", era:"legends", stats:{GRAND_SLAMS:"5",WIMBLEDON:"1x winner",DAVIS:"3",YEAR:"1952"}, ctx:"Career Totals — First Australian to dominate world tennis", clues:["Won 5 Grand Slam titles and 3 Davis Cups with Australia","Was the first Australian to dominate world tennis internationally","From Mount Albert Victoria Australia","Turned professional in 1953 ending his amateur run"] },
  { player:"Lew Hoad", sport:"🎾 ATP", answer:"LEW HOAD", era:"legends", stats:{GRAND_SLAMS:"4",WIMBLEDON:"2x winner",IDOL:"Laver",YEAR:"1956"}, ctx:"Career Totals — 4 Slams and Rod Laver idol", clues:["Won 4 Grand Slam titles including 2 Wimbledons","Rod Laver idolized him and modeled his game after him","From Glebe New South Wales Australia","Had his career hampered by serious back problems"] },
  { player:"Tony Trabert", sport:"🎾 ATP", answer:"TONY TRABERT", era:"legends", stats:{GRAND_SLAMS:"5",YEAR:"1955",THREE:"French US Wimbledon",CINCY:"From"}, ctx:"Best Season — Won 3 Grand Slams in 1955", clues:["Won 3 Grand Slam titles in 1955 — French Open Wimbledon and US Championships","Won 5 Grand Slam titles in total","From Cincinnati Ohio","Was considered the finest American player of the mid-1950s"] },
  { player:"Jack Kramer", sport:"🎾 ATP", answer:"JACK KRAMER", era:"legends", stats:{GRAND_SLAMS:"3",WIMBLEDON:"1x winner",PRO:"Dominated",YEAR:"1947"}, ctx:"Career Totals — Won Wimbledon then dominated professional tennis", clues:["Won 3 Grand Slam titles and Wimbledon in 1947","Dominated professional tennis for years after turning pro","From Las Vegas Nevada","Later became the most powerful administrator in tennis history"] },
  { player:"Ham Richardson", sport:"🎾 ATP", answer:"HAM RICHARDSON", era:"legends", stats:{GRAND_SLAMS:"2",RHODES:"Scholar",YEAR:"1956",COUNTRY:"USA"}, ctx:"Career Totals — Rhodes Scholar and Grand Slam champion", clues:["Won 2 Grand Slam titles — French and Australian Championships","Was also a Rhodes Scholar who studied at Oxford","From Baton Rouge Louisiana","Was considered one of the most intellectually accomplished players in tennis history"] },
  { player:"Cary Middlecoff", sport:"⛳ Golf", answer:"CARY MIDDLECOFF", era:"legends", stats:{MAJORS:"3",WINS:"40",DENTIST:"Former",SLOW:"Famous"}, ctx:"Career Totals — Dentist turned 3-time major champion", clues:["Won 3 major championships — 2 US Opens and 1 Masters","Gave up dentistry to pursue golf","From Hall Tennessee","Was notorious for his incredibly slow pace of play"] },
  { player:"Jimmy Demaret", sport:"⛳ Golf", answer:"JIMMY DEMARET", era:"legends", stats:{MASTERS:"3",WINS:"31",STYLE:"Colorful clothes",YEAR:"1950"}, ctx:"Career Totals — Three Masters wins with the most colorful wardrobe", clues:["Won The Masters 3 times — the first player to win it three times","Was known for his flamboyant colorful clothing on the course","From Houston Texas","Was also a television personality and entertainer"] },
  { player:"Art Wall Jr", sport:"⛳ Golf", answer:"ART WALL JR", era:"legends", stats:{ACE:"41",MASTERS:"1",POY:"1959",NICK:"Mr Hole in One"}, ctx:"1959 Masters — Champion nicknamed Mr Hole in One", clues:["Won The Masters and was PGA Player of the Year in 1959","Made 41 holes-in-one in his career","From Honesdale Pennsylvania","Was nicknamed Mr Hole in One for his extraordinary iron accuracy"] },
  { player:"Lloyd Mangrum", sport:"⛳ Golf", answer:"LLOYD MANGRUM", era:"legends", stats:{MAJORS:"1",US_OPEN:"1946",WINS:"36",WAR:"Purple Heart"}, ctx:"Career Totals — Purple Heart winner who became a major champion", clues:["Won the 1946 US Open in a playoff","Was wounded twice in World War II earning the Purple Heart","From Trenton Texas","Won 36 PGA Tour events in his career"] },
  { player:"Bob Rosburg", sport:"⛳ Golf", answer:"BOB ROSBURG", era:"legends", stats:{MAJORS:"1",PGA:"1959",BROADCAST:"ABC Sports",YEAR:"1959"}, ctx:"1959 PGA Championship — Champion turned famous broadcaster", clues:["Won the 1959 PGA Championship","Later became a beloved golf announcer for ABC Sports","From San Francisco California","Was a Stanford University graduate"] },
  { player:"Dominik Hasek", sport:"🏒 NHL", answer:"DOMINIK HASEK", era:"modern", stats:{GAA:"2.20","SV%":".922",VEZINA:"6",TEAM:"Sabres/Detroit"}, ctx:"Career Totals — 6 Vezina Trophies as The Dominator", clues:["Won 6 Vezina Trophies as the best goaltender","Had a career save percentage of .922","Nicknamed The Dominator for his unorthodox but effective style","From Pardubice Czechoslovakia"] },
  { player:"Nicklas Lidstrom", sport:"🏒 NHL", answer:"NICKLAS LIDSTROM", era:"modern", stats:{NORRIS:"7",STANLEY_CUPS:"4",CALDER:"1",YEAR:"1991"}, ctx:"Career Totals — 7 Norris Trophies and 4 Stanley Cups", clues:["Won 7 Norris Trophies as best defenseman — the most ever","Won 4 Stanley Cups with the Detroit Red Wings","From Vasteras Sweden","Was considered the greatest European-born player in NHL history"] },
  { player:"Sergei Fedorov", sport:"🏒 NHL", answer:"SERGEI FEDOROV", era:"modern", stats:{PTS:"1179",STANLEY_CUPS:"3",HART:"1994",TWO_WAY:"Best"}, ctx:"Career Totals — Hart Trophy winner and the best two-way player ever", clues:["Won the Hart Trophy as league MVP in 1994","Won 3 Stanley Cups with the Detroit Red Wings","Was one of the most complete two-way players in NHL history","From Pskov Russia"] },
  { player:"Brendan Shanahan", sport:"🏒 NHL", answer:"BRENDAN SHANAHAN", era:"modern", stats:{G:"656",STANLEY_CUPS:"3",TOUGH:"And scorer",YEAR:"2002"}, ctx:"Career Totals — 656 goals while also fighting regularly", clues:["Scored 656 goals — 11th most in NHL history","Won 3 Stanley Cups with the Detroit Red Wings","Was unusual in combining prolific goal scoring with physical play","From Mimico Ontario"] },
  { player:"Scott Stevens", sport:"🏒 NHL", answer:"SCOTT STEVENS", era:"modern", stats:{STANLEY_CUPS:"3",CF:"Conn Smythe 2000",HITS:"Most feared",YEAR:"2000"}, ctx:"Career Totals — 3 Cups and the most feared open-ice hitter ever", clues:["Won 3 Stanley Cups with the New Jersey Devils","Won the Conn Smythe Trophy as playoff MVP in 2000","Was the most feared open-ice hitter in NHL history","From Kitchener Ontario"] },
  { player:"Mats Sundin", sport:"🏒 NHL", answer:"MATS SUNDIN", era:"modern", stats:{G:"564",FIRST:"Euro 1st overall",TORONTO:"Captain",GOLD:"Olympic x2"}, ctx:"Career Totals — First European drafted 1st overall with 564 goals", clues:["Won 2 Olympic gold medals with Sweden and was one of the most skilled centers ever","Scored 564 career goals as captain of the Toronto Maple Leafs","Won 2 Olympic gold medals with Sweden","From Bromma Sweden"] },

  { player:"Roberto Luongo", sport:"🏒 NHL", answer:"ROBERTO LUONGO", era:"modern", stats:{W:"489",SO:"77",GAA:"2.52",GOLD:"2010 Olympic"}, ctx:"Career Totals — 489 wins and Olympic gold on home ice", clues:["Won 489 games — third most in NHL history","Won Olympic gold with Canada in 2010 in Vancouver on home ice","Was one of the most accomplished players of their generation","From Montreal Quebec"] },
  { player:"Nicklas Backstrom", sport:"🏒 NHL", answer:"NICKLAS BACKSTROM", era:"modern", stats:{PTS:"1025+",CUP:"2018",PARTNER:"Ovechkin",SWEDEN:"Vasteras"}, ctx:"Career Totals — Set up Ovechkin for a decade then won the Cup", clues:["Was the primary center alongside Alexander Ovechkin","Won the Stanley Cup with the Washington Capitals in 2018","Accumulated over 1000 career points","From Vasteras Sweden"] },
  { player:"Jeremy Roenick", sport:"🏒 NHL", answer:"JEREMY ROENICK", era:"modern", stats:{G:"513",FIRST:"American 500 goals",OUTSPOKEN:"Yes",COUNTRY:"USA"}, ctx:"Career Totals — One of first Americans to score 500 NHL goals", clues:["Was known for his outspoken media personality and willingness to criticize the NHL","Scored 513 career goals","From Boston Massachusetts","Was known for his outspoken personality and willingness to speak his mind"] },
  { player:"Pierre Turgeon", sport:"🏒 NHL", answer:"PIERRE TURGEON", era:"modern", stats:{PTS:"1327",PICK:"1 overall 1987",G:"515",QUIET:"Overlooked"}, ctx:"Career Totals — First overall pick who quietly put up 1327 career points", clues:["Scored 1327 career points","Was the 1st overall pick in the 1987 NHL Draft by the Buffalo Sabres","Had 58 goals in one season for the New York Islanders","Is often overlooked despite his consistently elite production"] },
  { player:"Keith Tkachuk", sport:"🏒 NHL", answer:"KEITH TKACHUK", era:"modern", stats:{G:"538",FIRST:"American 50 goals",TEAM:"Coyotes",YEAR:"1996"}, ctx:"Career Totals — First American to score 50 goals in a season", clues:["Was the first American-born player to score 50 goals in a season","Scored 538 career goals","From Melrose Massachusetts","The Blues won their first Cup in 2019 after 52 years of trying — while Gloria played in the arena"] },
  { player:"Wayne Gretzky", sport:"🏒 NHL", answer:"WAYNE GRETZKY", era:"classic", stats:{ASSISTS:"1963",RECORDS:"61",CUPS:"4",TEAM:"Edmonton Oilers"}, ctx:"Career Totals — More career assists than any other player has total points", clues:["Holds 61 different NHL records — many considered unbreakable","Holds 61 different NHL records","Won 4 Stanley Cups with the Edmonton Oilers","From Brantford Ontario — nicknamed The Great One"] },
  { player:"Mario Lemieux", sport:"🏒 NHL", answer:"MARIO LEMIEUX", era:"classic", stats:{PPG:"1.88",PTS:"1723",OVERCAME:"Hodgkins lymphoma",STANLEY_CUPS:"2"}, ctx:"Career Totals — Second highest points-per-game average ever", clues:["Has the second highest career points-per-game average at 1.88","Won 2 Stanley Cups with the Pittsburgh Penguins","Overcame Hodgkin lymphoma and continued playing","From Montreal Quebec — nicknamed Le Magnifique"] },
  { player:"Mark Messier", sport:"🏒 NHL", answer:"MARK MESSIER", era:"classic", stats:{PTS:"1887",STANLEY_CUPS:"6",GUARANTEE:"1994 guarantee + hat trick",LEADER:"Greatest"}, ctx:"Career Totals — 6 Cups and the 1994 Guarantee game", clues:["Won 6 Stanley Cups — 5 with Edmonton and 1 with the New York Rangers","Guaranteed a Rangers win in the 1994 playoffs then delivered with a hat trick","From St. Albert Alberta","Is considered the greatest leader in NHL history"] },
  { player:"Jari Kurri", sport:"🏒 NHL", answer:"JARI KURRI", era:"classic", stats:{G:"601",STANLEY_CUPS:"5",GRETZKY:"Right wing partner",FINLAND:"First HoF"}, ctx:"Career Totals — 5 Cups as Gretzkys perfect right wing", clues:["Scored 601 career goals alongside Wayne Gretzky","Won 5 Stanley Cups with the Edmonton Oilers","Was the first Finn inducted into the Hockey Hall of Fame","From Helsinki Finland"] },
  { player:"Luc Robitaille", sport:"🏒 NHL", answer:"LUC ROBITAILLE", era:"classic", stats:{G:"668",LEFT_WING:"Most goals LW",STANLEY_CUPS:"1",MONTREAL:"Born"}, ctx:"Career Totals — Most goals ever by a left winger", clues:["Scored 668 goals — the most ever by a left winger in NHL history","Won the Stanley Cup with the Detroit Red Wings in 2002","From Montreal Quebec","Was inducted into the Hockey Hall of Fame after their playing career"] },
  { player:"Peter Stastny", sport:"🏒 NHL", answer:"PETER STASTNY", era:"classic", stats:{PTS:"1239",DEFECT:"1980",DECADE:"2nd most 1980s",BROTHERS:"2 also NHL"}, ctx:"Career Totals — Defected from Czechoslovakia to become one of the 1980s top scorers", clues:["Defected from Czechoslovakia in 1980 to play in the NHL","Had the second most points in the 1980s behind only Gretzky","Scored 1239 career points","Two of his brothers also played in the NHL — all three defecting from Czechoslovakia together"] },
  { player:"Mike Gartner", sport:"🏒 NHL", answer:"MIKE GARTNER", era:"classic", stats:{G:"708",STREAK:"15 seasons 30+ goals",SPEED:"Fastest skater",CUPS:"0 despite 708 goals"}, ctx:"Career Totals — 708 goals and 15 consecutive 30-goal seasons", clues:["Scored 30 or more goals in 15 consecutive seasons","Had 708 career goals — the fifth most in NHL history","Was considered the fastest skater of his era","Never won the Stanley Cup despite his longevity"] },
  { player:"Glenn Anderson", sport:"🏒 NHL", answer:"GLENN ANDERSON", era:"classic", stats:{G:"498",STANLEY_CUPS:"6",KNOWN:"Unpredictable style",EDMONTON:"Dynasty"}, ctx:"Career Totals — 6 Cups with the Edmonton Oilers dynasty", clues:["Won 6 Stanley Cups — 5 with Edmonton and 1 with Toronto","Scored 498 career goals","Was known for his unpredictable exciting style","From Vancouver British Columbia"] },
  { player:"Clayton Kershaw", sport:"⚾ MLB", answer:"CLAYTON KERSHAW", era:"modern", stats:{ERA:"2.48",CY:"3",MVP:"2014",W:"19"}, ctx:"Career Totals — Three Cy Youngs and an MVP for the Dodgers", clues:["Won the NL MVP Award as a pitcher — extremely rare","Won 3 Cy Young Awards all with the Los Angeles Dodgers","Had a career ERA under 2.50 — the lowest of any active pitcher","From Dallas Texas — played college baseball at Texas A&M"] },



  { player:"Jake Arrieta", sport:"⚾ MLB", answer:"JAKE ARRIETA", era:"modern", stats:{ERA:"1.77",W:"22",CY:"2015",NHIT:"2"}, ctx:"2015 MLB Season — Won Cy Young with dominant second half", clues:["Had a 1.77 ERA in the second half of the season after struggling early in his career","Won the NL Cy Young Award with the Chicago Cubs","Threw a no-hitter in the postseason that year","From Farmington Missouri — was cut by the Baltimore Orioles before finding his form"] },

  { player:"Dallas Keuchel", sport:"⚾ MLB", answer:"DALLAS KEUCHEL", era:"modern", stats:{ERA:"2.48",GG:"5",CY:"2015",W:"20"}, ctx:"2015 MLB Season — AL Cy Young and five Gold Gloves", clues:["Won five consecutive Gold Gloves as a pitcher — an extraordinary fielding accomplishment","Won the AL Cy Young Award with the Houston Astros","Was known for his full beard which became iconic","From Tulsa Oklahoma"] },

  // MEDIUM Bball Classic (need 5 more — already added 5 above, but check)
  { player:"Clyde Drexler", sport:"🏀 NBA", answer:"CLYDE DREXLER", era:"classic", stats:{PTS:"20.4",RINGS:"1",GLIDE:"Nickname",TEAM:"Blazers/Rockets"}, ctx:"Career Totals — The Glide won a ring with Hakeem and Dream Team gold", clues:["Nicknamed The Glide for his smooth athletic style of play","Won an NBA championship with the Houston Rockets alongside Hakeem Olajuwon in 1995","Won Olympic gold with the Dream Team in 1992","From New Orleans Louisiana — went to college at the University of Houston"] },
  { player:"Len Bias", sport:"🏀 NBA", answer:"LEN BIAS", era:"classic", stats:{PICK:"2",YEAR:"1986",SCHOOL:"Maryland",TRAGEDY:"OD night of draft"}, ctx:"1986 NBA Draft — Died of cocaine OD the night after being drafted #2", clues:["Died of a cocaine overdose the night after being drafted 2nd overall by the Celtics in 1986","Was considered by many scouts to be the best prospect since Michael Jordan","His death contributed to the crack cocaine epidemic legislation and the anti-drug movement","From Landover Maryland — Bill Walton called him the best player he had ever seen"] },


  // MEDIUM Soccer Classic (need 5)
  { player:"Franco Baresi", sport:"⚽ Soccer", answer:"FRANCO BARESI", era:"classic", stats:{UCL:"3",SERIE_A:"6",SWEEPER:"Invented modern",TEAM:"AC Milan"}, ctx:"Career Totals — The sweeper who defined modern defending at AC Milan", clues:["Is considered one of the greatest defenders in the history of the game","Played his entire career for AC Milan and had his number 6 retired by the club","Won 3 European Cups and 6 Serie A titles","From Travagliato Brescia Italy — came to AC Milan's youth team at age 14"] },
  { player:"Roberto Baggio", sport:"⚽ Soccer", answer:"ROBERTO BAGGIO", era:"classic", stats:{BALLON:"1993",GOALS:"205",WC:"1994 penalty miss",NICK:"Divine Ponytail"}, ctx:"1994 World Cup Final — Won the Ballon d'Or in 1993 but is remembered for the penalty miss", clues:["Won the Ballon d Or in 1993","Missed the decisive penalty in the 1994 World Cup Final against Brazil","Was nicknamed The Divine Ponytail for his distinctive hairstyle","Scored 205 Serie A goals — one of the greatest forwards in Italian history"] },
  { player:"Jurgen Klinsmann", sport:"⚽ Soccer", answer:"JURGEN KLINSMANN", era:"classic", stats:{G:"47",WC:"1990",DIVE:"Mocking celebration",NATION:"Germany"}, ctx:"Career Totals — Won the World Cup with Germany and was a prolific international scorer", clues:["Won the 1990 World Cup with West Germany","Was accused of diving so often he invented a self-mocking dive celebration when he scored","Scored 47 goals in 108 international appearances for Germany","From Göppingen Germany — later became a successful manager of Germany and the USA"] },
  { player:"Don Budge", sport:"🎾 ATP", answer:"DON BUDGE", era:"legends", stats:{GRAND_SLAM:"First Calendar",DAVIS_CUP:"Hero",BACKHAND:"Greatest",NATION:"USA"}, ctx:"Career Totals — First player to win the Calendar Grand Slam in 1938", clues:["Was the first player in history to win all four Grand Slam titles in one year","Was so dominant that he virtually won the Davis Cup single-handedly for years","Had one of the most powerful backhands ever seen — described as a howitzer","From Oakland California — is credited with saving American tennis in the late 1930s"] },
  { player:"Keegan Bradley", sport:"⛳ Golf", answer:"KEEGAN BRADLEY", era:"modern", stats:{MAJORS:"1",PGA:"2011",ROUTINE:"Longest in golf",RYDER:"USA"}, ctx:"Career Totals — Won the PGA Championship in his debut major", clues:["Won the PGA Championship in 2011 in his very first major championship appearance","Has arguably the longest and most elaborate pre-shot routine on the PGA Tour","Was a consistent US Ryder Cup contributor","His aunt won six LPGA major championships — making golf very much a family tradition"] },
  { player:"Stewart Cink", sport:"⛳ Golf", answer:"STEWART CINK", era:"modern", stats:{BRITISH_OPEN:"2009",WATSON:"Beat 59-year-old",WINS:"7",NATION:"USA"}, ctx:"Career Totals — Captured The Open Championship at Turnberry in 2009", clues:["Won The Open Championship in 2009 by beating 59-year-old Tom Watson in a playoff","Watson was one hole away from the most amazing major victory in history before Cink caught him","Won 7 PGA Tour events in his career","From Huntsville Alabama"] },

  // MEDIUM Golf Legends already added 12 above
  // MEDIUM Hockey Modern (need 1)
  { player:"Steve Mason", sport:"🏒 NHL", answer:"STEVE MASON", era:"modern", stats:{ROY:"2009",WINS:"208",TEAM:"Columbus/Philly",NATION:"Canada"}, ctx:"Career Totals — Won the Calder Trophy as a rookie with Columbus", clues:["Won the Calder Trophy as the NHL's best rookie in 2009 with Columbus","Had one of the most promising starts in NHL goaltending history","The Broad Street Bullies Flyers were the most physically intimidating team in hockey history","From Oakville Ontario Canada"] },

  // MEDIUM Soccer Legends (need 12)
  { player:"Tom Morris Jr", sport:"⛳ Golf", answer:"TOM MORRIS JR", era:"legends", stats:{BRITISH_OPEN:"4 consecutive",AGE:"17",YOUNGEST:"Still youngest",DIED:"25"}, ctx:"Career Totals", clues:["Won 4 consecutive British Opens starting at age 17 — still the youngest ever major champion","Won the 1868 British Open at 17 — a record that has stood for over 150 years","Died at age 25 under tragic circumstances — depriving golf of its greatest talent","From St Andrews Scotland — son of Old Tom Morris who also won 4 Opens"] },
  { player:"Denny Shute", sport:"⛳ Golf", answer:"DENNY SHUTE", era:"legends", stats:{PGA:"2 consecutive",BRITISH_OPEN:"1933",RYDER:"Multiple",NATION:"USA"}, ctx:"Career Totals — Won back-to-back PGA Championships and the British Open", clues:["Won back-to-back PGA Championships in 1936 and 1937","Won the British Open at St Andrews in 1933","Was a prominent member of multiple US Ryder Cup teams","From Cleveland Ohio — was one of the most consistent players of the 1930s"] },
  { player:"Craig Wood", sport:"⛳ Golf", answer:"CRAIG WOOD", era:"legends", stats:{MASTERS:"1941",US_OPEN:"1941",PLAYOFF_LOSSES:"Multiple heartbreaks",NATION:"USA"}, ctx:"Career Totals — Won the Masters and US Open in the same year after years of playoff losses", clues:["Won both The Masters and the US Open in 1941","Had suffered multiple heartbreaking playoff losses before finally breaking through","Was one of the most accomplished players of their generation","From Lake Placid New York"] },
  { player:"Olin Dutra", sport:"⛳ Golf", answer:"OLIN DUTRA", era:"legends", stats:{US_OPEN:"1934",PGA:"1932",ILLNESS:"Sick during Open",NATION:"USA"}, ctx:"Career Totals", clues:["Won the 1934 US Open while suffering from amoebic dysentery — losing 12 pounds during the week","Won the PGA Championship in 1932","His win is considered one of the most gutsy performances in major championship history","From Monterey California — brother of Mortie Dutra also a tour player"] },

  // MEDIUM Hockey Legends (need 4)
  { player:"Sweeney Schriner", sport:"🏒 NHL", answer:"SWEENEY SCHRINER", era:"legends", stats:{SCORING:"2 titles",CUPS:"2",TEAM:"Rangers/Leafs",NATION:"Canada"}, ctx:"Career Totals — Won two scoring titles and two Stanley Cups with different teams", clues:["Won the NHL scoring title in consecutive years 1936 and 1937","Won 2 Stanley Cups — one with New York and one with Toronto","Was one of the fastest skaters of his era","Born in Saratov Russia but raised in Calgary Alberta Canada"] },
  { player:"Bryan Hextall", sport:"🏒 NHL", answer:"BRYAN HEXTALL", era:"legends", stats:{SCORING:"Title 1942",OT:"1940 Cup winner",TEAM:"Rangers",DYNASTY:"Grandson also NHL"}, ctx:"Career Totals — Won the scoring title and scored the overtime Cup winner for the Rangers", clues:["Won the NHL scoring title in 1942","Scored the overtime goal that won the Stanley Cup for the New York Rangers in 1940","Was the patriarch of a three-generation NHL family — son Bryan Jr and grandson Ron also played","From Grenfell Saskatchewan Canada"] },



  { player:"Kevin De Bruyne", sport:"⚽ Soccer", answer:"KEVIN DE BRUYNE", era:"modern", stats:{AST:"337",PL_RECORD:"21 assists",UCL:"2023",NATION:"Belgium"}, ctx:"Career Totals — Premier League record assists and Champions League winner", clues:["Set the Premier League record for assists in a single season with 21 in 2019-20","Won the Champions League with Manchester City in 2023","Has been voted into the PFA Team of the Year six times","From Ghent Belgium"] },

  { player:"Erling Haaland", sport:"⚽ Soccer", answer:"ERLING HAALAND", era:"modern", stats:{G:"52",PL_RECORD:"36 goals season",UCL:"2023",NATION:"Norway"}, ctx:"Career Totals — Broke Premier League season goals record in first season", clues:["Scored 36 Premier League goals in his debut season — shattering the previous record","Won the Champions League with Manchester City in his first season in England","Scored in 10 consecutive Champions League games — a new record","From Leeds England but representing Norway"] },




  { player:"Andrew Bynum", sport:"🏀 NBA", answer:"ANDREW BYNUM", era:"modern", stats:{PICK:"10",RINGS:"2",ALLSTAR:"1x",TEAM:"Lakers"}, ctx:"Career Totals — Highly talented center whose career was derailed by knee injuries", clues:["Was the youngest player in NBA history at the time when he debuted for the Lakers at 17 years old","Won two NBA championships with the Los Angeles Lakers in 2009 and 2010","Was considered a future Hall of Famer before chronic knee injuries derailed his career","From Plainsboro New Jersey — was drafted directly out of high school by Los Angeles in 2005"] },







  { player:"Nikolaj Ehlers", sport:"🏒 NHL", answer:"NIKOLAJ EHLERS", era:"modern", stats:{G:"30+",SPEED:"Top 5",TEAM:"Winnipeg",NATION:"Denmark"}, ctx:"Career Totals — Denmark's greatest NHL player for Winnipeg", clues:["Is the most successful Danish player in NHL history","Has scored 30 or more goals multiple times for the Winnipeg Jets","Is considered one of the fastest skaters in the entire NHL","From Aalborg Denmark — his father Heinz was also a professional hockey player"] },  { player:"Carlos Gomez", sport:"⚾ MLB", answer:"CARLOS GOMEZ", era:"modern", stats:{GG:"3",PACE:"Fastest",HR:"24",TEAM:"Milwaukee"}, ctx:"Career Totals — Three Gold Gloves and electrifying speed for the Brewers", clues:["Won 3 consecutive Gold Gloves in center field with the Milwaukee Brewers","Was considered one of the fastest and most athletic outfielders of his era","Had one of the most electric combinations of speed and power in the game","From Manoguayabo Dominican Republic — was originally a Mets prospect"] },
  { player:"Chase Utley", sport:"⚾ MLB", answer:"CHASE UTLEY", era:"modern", stats:{HR:"32",RBI:"102",AVG:".332",SB:"15"}, ctx:"Best Season — 2006 Philadelphia Phillies All-Star second baseman", clues:["Was considered one of the best second basemen of his era","The Phillies won the World Series in 2008 ending a 28-year championship drought","Won the World Series with the Phillies in 2008","Was known for his hard-nosed play"] },
  { player:"Jose Reyes", sport:"⚾ MLB", answer:"JOSE REYES", era:"modern", stats:{AVG:".337",SB:"39",HITS:"181",TRIPLES:"16"}, ctx:"Best Season — 2011 New York Mets batting title", clues:["Won the NL batting title this season","Led the NL in triples with 16","Was one of the most exciting leadoff hitters of his era","From Villa Gonzalez Dominican Republic"] },
  { player:"Matt Holliday", sport:"⚾ MLB", answer:"MATT HOLLIDAY", era:"modern", stats:{HR:"36",RBI:"137",AVG:".340",OPS:"1.014"}, ctx:"Best Season — 2007 Colorado Rockies NL RBI leader", clues:["Led the NL in RBI and had a .340 average","Coors Field altitude causes the ball to travel significantly farther than any other ballpark","Was a powerful left fielder from Stillwater Oklahoma","Was traded to Oakland then St. Louis in subsequent years"] },
  { player:"David Wright", sport:"⚾ MLB", answer:"DAVID WRIGHT", era:"modern", stats:{HR:"30",RBI:"107",AVG:".325",SB:"20"}, ctx:"2007 MLB Season — New York Mets franchise cornerstone", clues:["Was the third baseman of the Mets through some of their darkest years of losing","An excellent all-around third baseman","From Norfolk Virginia","Had his career shortened by spinal stenosis"] },
  { player:"John Smoltz", sport:"⚾ MLB", answer:"JOHN SMOLTZ", era:"classic", stats:{W:"24",ERA:"2.94",SO:"276",WHIP:"1.096"}, ctx:"1996 MLB Season — Atlanta Braves Cy Young", clues:["Won the NL Cy Young with the Atlanta Braves","Was part of the legendary Maddux-Glavine-Smoltz rotation","Had arm problems and converted to closer then back to starter","Won the World Series with Atlanta in 1995"] },
  { player:"Ron Guidry", sport:"⚾ MLB", answer:"LOUISIANA LIGHTNING", era:"classic", stats:{W:"25",ERA:"1.74",SO:"248",WHIP:"0.946"}, ctx:"1978 MLB Season — New York Yankees dominant year", clues:["Had one of the greatest pitching seasons in Yankees history","Won the AL Cy Young with 25 wins and a 1.74 ERA","The Yankees have won 27 World Series championships — by far the most of any team","Nicknamed Louisiana Lightning"] },
  { player:"Chris Sale", sport:"⚾ MLB", answer:"CHRIS SALE", era:"modern", stats:{ERA:"2.90",SO:"11.17",W:"17",K9:"Top in MLB career"}, ctx:"Career Totals — Highest strikeout rate per 9 innings ever", clues:["Had one of the highest career strikeout rates per 9 innings in MLB history","Was nicknamed The Conductor for his unusual sidearm delivery","Was traded from the White Sox to the Red Sox for 4 top prospects","From Lakeland Florida"] },
  { player:"Cole Hamels", sport:"⚾ MLB", answer:"COLE HAMELS", era:"modern", stats:{ERA:"3.43",WS_MVP:"2008",W:"20",SO:"3000"}, ctx:"Career Totals — World Series MVP who struck out 3000 batters", clues:["Won the World Series MVP with the Philadelphia Phillies in 2008","Struck out 3,000 batters in his career","Was traded for a package of 5 prospects when he went to Texas","From San Diego California"] },
  { player:"Johan Santana", sport:"⚾ MLB", answer:"JOHAN SANTANA", era:"modern", stats:{ERA:"3.20",CY:"2",SO:"1,988",NHIT:"Only Mets"}, ctx:"Career Totals — Two Cy Youngs and the only no-hitter in Mets history", clues:["Threw the only no-hitter in New York Mets history in 2012","Won 2 Cy Young Awards with the Minnesota Twins","Had one of the best changeups in baseball history","From Tovar Venezuela"] },

  { player:"Bartolo Colon", sport:"⚾ MLB", answer:"BARTOLO COLON", era:"modern", stats:{CY:"2005",W:"247",AGE:"Pitched at 44",MEME:"Famous home run"}, ctx:"Career Totals — Won the Cy Young and pitched until age 44 becoming a beloved meme", clues:["Won the AL Cy Young Award in 2005 with the Los Angeles Angels","Hit his first career home run at age 42 to become an internet meme","Pitched in the major leagues until age 44 — one of the longest careers ever","From Alta Mira Dominican Republic — was famous for his unusual physique and masterful control"] },

  // Fill Medium Baseball Classic (need 1)
  { player:"Jim Bunning", sport:"⚾ MLB", answer:"JIM BUNNING", era:"classic", stats:{PG:"1964",SO:"2855",W:"224",HOF:"Yes"}, ctx:"Career Totals — Threw a perfect game and later became a US Senator", clues:["Threw a perfect game on Father's Day 1964 — the first in the NL in 84 years","Won 224 career games and struck out 2855 batters","Was inducted into the Baseball Hall of Fame in 1996","From Southgate Kentucky — later served as a US Senator representing Kentucky"] },

  // Fill Medium Baseball Legends (need 2)
  { player:"Rube Marquard", sport:"⚾ MLB", answer:"RUBE MARQUARD", era:"legends", stats:{W:"19",STREAK:"19 consecutive wins",ERA:"2.50",TEAM:"Giants"}, ctx:"Career Totals — Set the record for consecutive wins in a single season", clues:["Won 19 consecutive games in 1912 — a Major League record that still stands","Won 3 World Series titles with the New York Giants under John McGraw","Had a career ERA of 2.50 across 18 seasons in the big leagues","From Cleveland Ohio — was nicknamed Rube after Rube Waddell"] },
  { player:"Chief Bender", sport:"⚾ MLB", answer:"CHIEF BENDER", era:"legends", stats:{ERA:"2.46",W:"212",WS:"3",TEAM:"Athletics"}, ctx:"Career Totals — Three World Series titles as ace of the Philadelphia Athletics dynasty", clues:["Won 3 World Series with Connie Mack's Philadelphia Athletics dynasty","Had a career ERA of 2.46 and was one of the first pitchers to throw a slider","Was inducted into the Baseball Hall of Fame in 1953","From Crow Wing County Minnesota — was of Chippewa heritage and one of the first Native American stars in baseball"] },

  // Medium Football Modern (need 2)
  { player:"Matthew Stafford", sport:"🏈 NFL", answer:"MATTHEW STAFFORD", era:"modern", stats:{YDS:"49995",W:"SB 2022",PICK:"1st 2009",TEAM:"Lions/Rams"}, ctx:"Career Totals — Finally won a Super Bowl after leaving Detroit", clues:["Was the first overall pick in the 2009 NFL Draft by the Detroit Lions","Won Super Bowl LVI with the Los Angeles Rams after being traded from Detroit","Threw for nearly 50000 career yards","From Highland Park Texas — played college football at Georgia"] },
  { player:"Carson Wentz", sport:"🏈 NFL", answer:"CARSON WENTZ", era:"modern", stats:{MVP:"2017 frontrunner",PICK:"2nd 2016",INJURY:"ACL 2017",TEAM:"Eagles/Colts"}, ctx:"Career Totals — Was leading MVP race before injury derailed his career", clues:["Was leading the NFL MVP race in 2017 before tearing his ACL in December","Was drafted 2nd overall in 2016 by the Philadelphia Eagles","His backup Nick Foles won the Super Bowl and MVP after his injury","From Bismarck North Dakota — played at North Dakota State"] },

  // Medium Baseball Classic (need 3 more)
  { player:"Jim Kaat", sport:"⚾ MLB", answer:"JIM KAAT", era:"classic", stats:{GG:"16",W:"283",SEASONS:"25",ERA:"3.45"}, ctx:"Career Totals — Won 16 Gold Gloves and pitched for 25 seasons", clues:["Won 16 consecutive Gold Gloves as a pitcher — the most ever for a pitcher","Pitched for 25 seasons in the major leagues spanning from 1959 to 1983","Won 283 career games and was known as one of the best fielding pitchers ever","From Zeeland Michigan — later became a beloved baseball broadcaster"] },
  { player:"Sparky Lyle", sport:"⚾ MLB", answer:"SPARKY LYLE", era:"classic", stats:{CY:"1977",SV:"238",ERA:"2.88",TEAM:"Yankees"}, ctx:"Career Totals — Won the Cy Young as first AL reliever ever", clues:["Was the first American League reliever to win the Cy Young Award in 1977","Saved 238 games with a career ERA of 2.88","Was a key part of the New York Yankees World Series teams in 1977 and 1978","From Reynoldsville Pennsylvania — was known for sitting on birthday cakes in the clubhouse"] },

  // Medium Baseball Legends (need 3 more)
  { player:"Dazzy Vance", sport:"⚾ MLB", answer:"DAZZY VANCE", era:"legends", stats:{K_TITLE:"7 consecutive",ERA:"3.24",CY:"1924 NL MVP",TEAM:"Dodgers"}, ctx:"Career Totals — Led the NL in strikeouts seven straight years", clues:["Led the National League in strikeouts for 7 consecutive years — a record","Won the NL MVP Award in 1924 with the Brooklyn Dodgers","Had a career ERA of 3.24 across 16 big league seasons","From Orient Iowa — didn't reach the majors as a regular until age 31"] },
  { player:"Gabby Hartnett", sport:"⚾ MLB", answer:"GABBY HARTNETT", era:"legends", stats:{AVG:".297",MVP:"1935",HOMER:"Homer in Gloamin",TEAM:"Cubs"}, ctx:"Career Totals — Hit the Homer in the Gloamin to win the pennant", clues:["Hit the famous Homer in the Gloamin in near-darkness to win the 1938 pennant for the Cubs","Won the NL MVP Award in 1935 as the best catcher of his era","Batted .297 career average — exceptional for a catcher of his era","From Woonsocket Rhode Island — was considered the greatest catcher in baseball history at the time"] },
  { player:"Arky Vaughan", sport:"⚾ MLB", answer:"ARKY VAUGHAN", era:"legends", stats:{AVG:".318",SS:"All-time great",BATTING_TITLE:"1935",TEAM:"Pirates"}, ctx:"Career Totals — Greatest shortstop of the 1930s with a .318 career average", clues:["Batted .385 in 1935 — the highest average by a shortstop in the 20th century","Had a career batting average of .318 — one of the highest ever for a shortstop","Was inducted into the Hall of Fame in 1985 — considered criminally overlooked","From Clifty Arkansas — drowned in a fishing accident in 1952 at age 40"] },

  // Medium Tennis Modern (need 1)
  { player:"Geoff Ogilvy", sport:"⛳ Golf", answer:"GEOFF OGILVY", era:"modern", stats:{US_OPEN:"2006",WGC:"3",NATION:"Australia",WINS:"7"}, ctx:"Career Totals — Won the US Open and three World Golf Championships", clues:["Won the US Open in 2006 at Winged Foot in a dramatic final round","Won three World Golf Championship events — among the most prestigious non-majors","Won 7 PGA Tour events in his career","From Melbourne Australia — was known for his thoughtful approach to the game"] },
  { player:"Graeme McDowell", sport:"⛳ Golf", answer:"GRAEME MCDOWELL", era:"modern", stats:{US_OPEN:"2010",RYDER:"Hero",NATION:"N Ireland",WINS:"5"}, ctx:"Career Totals — Won the US Open and was a Ryder Cup hero for Europe", clues:["Won the US Open in 2010 — the first European to win it since Tony Jacklin in 1970","Was a crucial contributor to European Ryder Cup victories including the Miracle at Medinah","Won 5 PGA Tour events in his career","From Portrush Northern Ireland — played his home Open Championship at Royal Portrush in 2019"] },

  // Medium Hockey Modern (need 1)
  { player:"Ryan Suter", sport:"🏒 NHL", answer:"RYAN SUTER", era:"modern", stats:{TOI:"Leader",PARTNER:"Shea Weber",CONTRACT:"13 years",NATION:"USA"}, ctx:"Career Totals — One of the most durable defensemen of his era", clues:["Consistently led the NHL in time on ice — playing over 30 minutes per game at his peak","Signed a 13-year contract with the Minnesota Wild in 2012","Played alongside Shea Weber on the Nashville Predators before going to Minnesota","From Madison Wisconsin — son of former NHL defenseman Bob Suter"] },

  // Hard Baseball Classic (need 1)
  { player:"Milt Pappas", sport:"⚾ MLB", answer:"MILT PAPPAS", era:"classic", stats:{W:"209",ERA:"3.40",NO_HITTER:"1972",NEAR_PERFECT:"One batter away"}, ctx:"Career Totals — Came within one strike of a perfect game in 1972", clues:["Threw a no-hitter in 1972 but missed a perfect game when the umpire called ball four on a 3-0 count with two outs in the 9th","Won 209 career games across four different teams","Was traded for Frank Robinson — one of the most lopsided trades in MLB history","From Detroit Michigan — played his best years with the Baltimore Orioles"] },  { player:"Reggie Wayne", sport:"🏈 NFL", answer:"REGGIE WAYNE", era:"modern", stats:{YARDS:"14345",RINGS:"1",RECEPTIONS:"1070",PARTNER:"Manning"}, ctx:"Career Totals — Peyton Manning's reliable receiver for a decade in Indianapolis", clues:["Was Peyton Manning's primary target for most of his time with the Indianapolis Colts","Had 1,070 career receptions and 14,345 yards — all with the Colts","Won Super Bowl XLI with Indianapolis in 2006","From New Orleans Louisiana — was consistently productive without being flashy"] },
  { player:"Vinny Testaverde", sport:"🏈 NFL", answer:"TESTAVERDE DRAFT", era:"classic", stats:{PICK:"1",YEAR:"1987",TEAM:"Tampa Bay Buccaneers",SCHOOL:"Miami"}, ctx:"1987 NFL Draft — #1 Overall Pick", clues:["Later became a reliable journeyman who played 21 NFL seasons","Won the Heisman Trophy at Miami","Had a very long career spanning 21 seasons","Was considered can't-miss but had an inconsistent career"] },
  { player:"Cam Talbot", sport:"🏒 NHL", answer:"CAM TALBOT", era:"modern", stats:{WINS:"266",GAA:"2.77",BACKUP:"NY Rangers",STARTER:"Edmonton"}, ctx:"Career Totals — Backup turned starter who carried Edmonton for years", clues:["Was Henrik Lundqvist's backup in New York before becoming a starter in Edmonton","Carried the Edmonton Oilers during their early playoff runs","Won 266 career NHL games","From Caledonia Ontario Canada"] },
  { player:"Mitch Richmond", sport:"🏀 NBA", answer:"MITCH RICHMOND", era:"classic", stats:{PTS:"21.8",ALLSTAR:"6x",HALL:"2014",TEAM:"Kings"}, ctx:"Career Totals — Hall of Famer who excelled on losing teams", clues:["Was inducted into the Hall of Fame in 2014 after a career mostly on non-playoff teams","Was a 6-time All-Star and averaged 21.8 points per game for his career","The Kings moved from Cincinnati to Kansas City to Sacramento and haven't won a title since 1951","From Fort Lauderdale Florida — nicknamed Rock"] },

  { player:"Billy Casper", sport:"⛳ Golf", answer:"BILLY CASPER", era:"legends", stats:{MAJORS:"3",WINS:"51",YEAR:"1966",CHAMP:"1"}, ctx:"Career — One of golf's most underrated champions", clues:["Won 51 PGA Tour events including 3 majors","Won the US Open in 1959 and 1966","Came back from 7 shots behind Palmer to win the 1966 US Open","Was considered golf's most underrated Hall of Famer"] },

  { player:"Tony Lema", sport:"⛳ Golf", answer:"TONY LEMA", era:"legends", stats:{WINS:"12",MAJORS:"1",YEAR:"1964",BRITISH:"1"}, ctx:"1964 British Open — St Andrews first-timer win", clues:["Won the British Open at St Andrews in his first appearance","Won The Open Championship in 1964 then tragically died in a plane crash just one year later","Won 12 PGA Tour events before dying in a plane crash in 1966","From Oakland, California"] },

  { player:"Jackie Burke Jr.", sport:"⛳ Golf", answer:"JACKIE BURKE", era:"legends", stats:{MAJORS:"2",YEAR:"1956",MASTERS:"1",PGA:"1"}, ctx:"1956 Season — Masters and PGA Championship", clues:["Won both The Masters and PGA Championship in the same year","From Fort Worth, Texas","Won 16 PGA Tour events in his career","Was a Ryder Cup captain in 1957"] },

];


const HARD = [
  // Hard Basketball Modern (need 2)
  { player:"Bismack Biyombo", sport:"🏀 NBA", answer:"BISMACK BIYOMBO", era:"modern", stats:{BLK:"2.1",TEAMS:"7",CONTRACT:"72M",NATION:"Congo"}, ctx:"Career Totals — Journeyman shot-blocker who got a massive overpay", clues:["Signed a $72 million contract in 2016 despite averaging under 6 points per game — one of the most overpaid contracts ever","Led the NBA in blocks in multiple seasons","Played for 7 different NBA franchises in his career","From Lubumbashi Democratic Republic of Congo — came to the US as a teenager"] },
  { player:"Joakim Noah", sport:"🏀 NBA", answer:"JOAKIM NOAH", era:"modern", stats:{DPOY:"2014",AST:"5.4",REB:"11.3",TEAM:"Bulls/Knicks"}, ctx:"Career Totals — Won Defensive Player of Year with one of the ugliest shots in basketball", clues:["Was the son of a French soccer player and grew up in New York City — an unusual background for an NBA star","Was famous for having one of the most unorthodox and ugly shooting forms in NBA history","Was the emotional leader of the Tom Thibodeau era Chicago Bulls defensive teams","From New York City — son of French tennis star Yannick Noah"] },
  // Hard Football Modern (need 1)
  { player:"Kordell Stewart", sport:"🏈 NFL", answer:"KORDELL STEWART", era:"modern", stats:{RUSH:"2969",PASS:"14746",NICK:"Slash",TEAM:"Steelers"}, ctx:"Career Totals — The original dual-threat quarterback nicknamed Slash", clues:["Was nicknamed Slash because he played quarterback receiver and running back in the same offense","Was one of the first true dual-threat quarterbacks in the modern NFL","Led the Pittsburgh Steelers to the AFC Championship Game in 1997","From Marrero Louisiana — played at Colorado where he threw a Hail Mary that is still famous"] },
  { player:"Neil O'Donnell", sport:"🏈 NFL", answer:"NEIL ODONNELL", era:"modern", stats:{RTG:"85.6",INT:"2",SB:"Loss",TEAM:"Steelers"}, ctx:"Super Bowl XXX — Threw two costly interceptions in the loss to Dallas", clues:["Threw 2 interceptions directly to Larry Brown in Super Bowl XXX — costing Pittsburgh the championship","Had a career passer rating of 85.6 — a solid but unspectacular career","Was one of the most efficient low-interception quarterbacks of his era","From Huntington New York — played college football at Maryland"] },
  { player:"Brad Johnson", sport:"🏈 NFL", answer:"BRAD JOHNSON", era:"modern", stats:{RTG:"92.9",SB:"Won 2003",YDS:"29054",TEAM:"Buccaneers"}, ctx:"Super Bowl XXXVII Champion — Led the Buccaneers to their only title", clues:["Led the Tampa Bay Buccaneers to their first Super Bowl championship in Super Bowl XXXVII","Had a career passer rating of 92.9 — better than his reputation suggests","Was known as a game manager who rarely turned the ball over","From Marietta Georgia — played at Florida State before a long NFL career"] },

  // Hard Basketball Classic (need 3)
  { player:"Zelmo Beaty", sport:"🏀 NBA", answer:"ZELMO BEATY", era:"classic", stats:{PTS:"16.3",REB:"10.9",ALLSTAR:"2x",TEAM:"Hawks/Jazz"}, ctx:"Career Totals — Underrated center of the 1960s who jumped to the ABA", clues:["Averaged 16.3 points and 10.9 rebounds per game across the NBA and ABA","Was a two-time NBA All-Star with the St. Louis Hawks","Jumped to the ABA's Utah Stars in 1970 where he had his best seasons","From Harvey Louisiana — played college basketball at Prairie View A&M"] },
  { player:"Len Chappell", sport:"🏀 NBA", answer:"LEN CHAPPELL", era:"classic", stats:{PTS:"12.0",REB:"8.2",TEAMS:"8",DRAFT:"Lottery 1962"}, ctx:"Career Totals — 1962 first round pick who became a journeyman", clues:["Played for 8 different NBA teams during his career — one of the most well-traveled players of his era","Averaged 12 points and 8 rebounds per game in his best seasons","Was selected in the first round of the 1962 NBA Draft by the Syracuse Nationals","From Portage Pennsylvania — played college basketball at Wake Forest"] },
  { player:"Jim McMillian", sport:"🏀 NBA", answer:"JIM MCMILLIAN", era:"classic", stats:{PTS:"17.7",RINGS:"1",TEAM:"Lakers/Clippers",STREAK:"33 game"}, ctx:"Career Totals — Key piece of the 69-13 Lakers that won 33 straight", clues:["Was a key contributor on the 1971-72 Los Angeles Lakers that won a record 33 consecutive games","Averaged 17.7 points per game during his peak seasons","Later played for the Buffalo Braves and Los Angeles Clippers","From Jacksonville Florida — played college basketball at Columbia University"] },
  { player:"Jim Plunkett", sport:"🏈 NFL", answer:"PLUNKETT", era:"classic", stats:{YDS:"261",TD:"3",INT:"0",RTG:"111.2"}, ctx:"Super Bowl XV MVP — Oakland Raiders", clues:["Was a Heisman Trophy winner who overcame multiple career setbacks to win the Super Bowl","Was a backup QB who got his chance late in career","Won 2 Super Bowls as a late-career starter","First Mexican-American starting Super Bowl QB"] },
  { player:"Billy Kilmer", sport:"🏈 NFL", answer:"KILMER", era:"classic", stats:{YDS:"104",TD:"1",INT:"1",RTG:"66.7"}, ctx:"1972 NFC Championship — Washington Redskins", clues:["Had a reputation for being a gritty tough leader who got the most out of limited physical tools","Beat the Dallas Cowboys in the NFC Championship","Backup who became a starter mid-career","Scored 1 touchdowns during this season"] },
  { player:"Virginia Ruzici", sport:"🎾 WTA", answer:"RUZICI", era:"classic", stats:{GRAND_SLAMS:"1",YEAR:"1978",SURFACE:"Clay",COUNTRY:"Romania"}, ctx:"1978 French Open — Women's Singles Champion", clues:["Was the only Romanian woman to ever win a Grand Slam singles title","From Romania","Defeated Mima Jausovec in the final","One of the lesser-known French Open champions"] },
  // Basketball - Modern
  // Football - Modern
  // Baseball - Modern
  // Baseball - Classic
  // Soccer - Modern
  // Soccer - Legends/Classic
  { player:"Gunnar Nordahl", sport:"⚽ Soccer", answer:"NORDAHL", era:"legends", stats:{G:"35",APP:"26",MIN:"2340",YEAR:"1950"}, ctx:"1949-50 Serie A Season — AC Milan", clues:["Scored 221 goals in Serie A — a record that stood for 60 years before being broken by Silvio Piola","One of the Gre-No-Li trio of Swedish players at Milan","AC Milan have won the European Cup 7 times — second only to Real Madrid all-time","Swedish center forward considered one of the greatest scorers ever"] },
  { player:"Helmut Rahn", sport:"⚽ Soccer", answer:"RAHN", era:"legends", stats:{G:"1",AST:"0",APP:"1",MIN:"84"}, ctx:"1954 FIFA World Cup Final — West Germany vs Hungary", clues:["Was one of the most accomplished players of their generation","West Germany beat the heavily favored Hungary","His goal was called the Miracle of Bern","West German winger who was nearly left out of the squad"] },
  // Tennis - Modern Hard
  // Golf - Hard
  // Hockey - Hard
  { player:"Mike Vernon", sport:"🏒 NHL", answer:"VERNON", era:"classic", stats:{GAA:"1.76","SV%":".927",W:"16",TEAM:"Red Wings"}, ctx:"1997 Stanley Cup Finals MVP — Detroit Red Wings", clues:["Won the Conn Smythe Trophy as playoff MVP","Detroit Red Wings won the Cup ending a 42-year drought","The Red Wings won 4 Cups in 11 years forming the last great NHL dynasty","From Calgary, Alberta — won 2 Stanley Cups in his career"] },
  { player:"Peter Bondra", sport:"🏒 NHL", answer:"BONDRA", era:"classic", stats:{G:"52",AST:"28",PTS:"80",PIM:"40"}, ctx:"1997-98 NHL Season — Washington Capitals", clues:["Was considered one of the most dangerous pure goal scorers of the 1990s despite playing for mid-tier Washington Capitals teams","This season took place during the 1997 NHL campaign","Slovak player from Lutsk, Ukraine","One of the fastest skaters of his era"] },
  // More Modern Hard across sports
  // ── NEW HARD MODERN ──────────────────────────────────────────────────────────
  { player:"Rich Hill", sport:"⚾ MLB", answer:"HILL", era:"modern", stats:{ERA:"2.12",W:"12",SO:"174",WHIP:"0.994"}, ctx:"2016 MLB Season — Los Angeles Dodgers comeback", clues:["Was out of baseball and pitching in an independent league in 2015","Came back to become one of the best pitchers in the NL","The Dodgers moved from Brooklyn to Los Angeles in 1958 breaking New York hearts","Left-handed pitcher known for his curveball at age 36"] },
  { player:"Jason Varitek", sport:"⚾ MLB", answer:"VARITEK", era:"modern", stats:{WS:"2x",GG:"1",ALLSTAR:"4x",ROLE:"Captain"}, ctx:"Career Totals — Red Sox captain and two-time World Series champion", clues:["Was the captain of the Boston Red Sox and a key figure in their 2004 and 2007 World Series titles","Made four All-Star teams as one of the best defensive catchers of his era","Famously got into a benches-clearing brawl by shoving his mitt into Alex Rodriguez face in 2004","From Rochester Minnesota — played at Georgia Tech before being drafted 1st overall in 1994"] },
  { player:"Morten Andersen", sport:"🏈 NFL", answer:"ANDERSEN", era:"classic", stats:{PTS:"2544",FGM:"565",XP:"849",SEASONS:"25"}, ctx:"Career — All-time NFL scoring leader for 17 years", clues:["Was the NFL's all-time scoring leader for many years","Danish-born placekicker who played 25 seasons","Was inducted into the Pro Football Hall of Fame after his career","Nicknamed The Great Dane"] },
  { player:"Harold Baines", sport:"⚾ MLB", answer:"BAINES", era:"classic", stats:{HR:"384",AVG:".289",RBI:"1628",YEAR:"2019"}, ctx:"Career — Controversial Hall of Fame inductee", clues:["Played 22 seasons as a designated hitter and outfielder — beloved by teammates for his professionalism and durability","Spent most of his career with the Chicago White Sox","Was a designated hitter for the majority of his career","His Hall of Fame election was criticized as it lowered the standards"] },
  { player:"Herb Score", sport:"⚾ MLB", answer:"SCORE", era:"legends", stats:{ERA:"2.85",W:"36",SO:"508",YEAR:"1956"}, ctx:"1955-56 MLB Seasons — Cleveland Indians", clues:["Was considered the next great pitcher before a career-ending injury","Struck out 245 batters as a rookie in 1955","Was hit in the face by a line drive in 1957 that derailed his career","Left-handed pitcher for the Cleveland Indians"] },
  { player:"Allie Reynolds", sport:"⚾ MLB", answer:"REYNOLDS", era:"legends", stats:{W:"182",ERA:"3.30",NH:"2",CG:"137"}, ctx:"Career — New York Yankees ace pitcher", clues:["Was nicknamed The Chief and was a key part of the Yankees dynasty that won multiple World Series in the early 1950s","Won 6 World Series championships with the Yankees","Was part-Creek Native American","Nicknamed Superchief"] },
  { player:"Charley Trippi", sport:"🏈 NFL", answer:"TRIPPI", era:"legends", stats:{RUSH:"206",REC:"2",TD:"2",YDS:"240"}, ctx:"1947 NFL Championship — Chicago Cardinals", clues:["Was nicknamed the Georgia Peach — not to be confused with the baseball legend — and was one of the most versatile backs of his era","Was an All-American at Georgia","Could run, pass, and return kicks at an elite level","Part of the Dream Backfield that won the 1947 championship"] },
  { player:"Marion Motley", sport:"🏈 NFL", answer:"MOTLEY", era:"legends", stats:{YDS:"828",AVG:"5.7",TD:"8",YEAR:"1950"}, ctx:"1950 NFL Season — Cleveland Browns", clues:["Was one of only four Black players who integrated the NFL in 1946 alongside Kenny Washington Woody Strode and Bill Willis","Led the NFL in rushing yards in 1950","Scored 8 touchdowns during this season","Paved the way for integration in professional football"] },
  { player:"Ace Parker", sport:"🏈 NFL", answer:"PARKER", era:"legends", stats:{PASS:"865",RUSH:"321",INT:"6",YEAR:"1940"}, ctx:"1940 NFL MVP Season — Brooklyn Dodgers", clues:["Was a triple threat who passed rushed and returned punts for the Brooklyn Dodgers — yes there was an NFL team called the Brooklyn Dodgers","This performance came during the 1940 NFL season","Was also a professional baseball player for the Philadelphia Athletics","One of the few players to play in both the NFL and MLB"] },
  { player:"Bill Tilden", sport:"🎾 ATP", answer:"TILDEN", era:"legends", stats:{W:"138",L:"5",TITLES:"9",YEAR:"1925"}, ctx:"1925 ATP Season — Dominant American era", clues:["Dominated tennis so completely in the 1920s that he won 7 consecutive US Championships — a record that will never be broken","Dominated tennis through the 1920s","First American player to win Wimbledon","Was ranked World No. 1 for 6 consecutive years"] },
  { player:"Rene Lacoste", sport:"🎾 ATP", answer:"LACOSTE", era:"legends", stats:{GRAND_SLAMS:"7",DAVIS:"5",YEAR:"1927",NATION:"France"}, ctx:"1927 — French tennis dominant era", clues:["Was nicknamed The Crocodile — a name that inspired a famous clothing brand he founded after his playing days","Was part of the famous Four Musketeers of French tennis","Founded the famous Lacoste clothing brand after retiring","Nicknamed The Crocodile — which inspired his clothing logo"] },
  { player:"Pancho Segura", sport:"🎾 ATP", answer:"SEGURA", era:"legends", stats:{PRO:"1",YEAR:"1952",NATION:"Ecuador",TITLES:"3"}, ctx:"1950s Professional Tennis — Dominant pro circuit player", clues:["Was born in Ecuador and was one of the most creative players of his era despite never winning a Grand Slam as an amateur","Was from Guayaquil, Ecuador — one of the first Latino tennis stars","Had an unusual two-handed forehand before it was common","Later coached Jimmy Connors to multiple Grand Slam titles"] },
  { player:"Kel Nagle", sport:"⛳ Golf", answer:"NAGLE", era:"legends", stats:{WINS:"1",MAJORS:"1",YEAR:"1960",COUNTRY:"Australia"}, ctx:"1960 British Open — St Andrews centenary", clues:["Won the 1960 British Open at St Andrews in the centenary celebration","Beat Arnold Palmer by one shot","Australian golfer who won the Open at age 39","Was considered a major upset over the heavily favored Palmer"] },
  { player:"Roberto De Vicenzo", sport:"⛳ Golf", answer:"DE VICENZO", era:"legends", stats:{WINS:"1",MAJORS:"1",YEAR:"1967",MISTAKE:"1"}, ctx:"1967 British Open — Hoylake, England", clues:["Famously lost the 1968 Masters after signing an incorrect scorecard — disqualifying himself from a possible victory","Famous for signing an incorrect scorecard at the 1968 Masters — costing him a playoff","From Buenos Aires, Argentina","Won over 200 tournaments worldwide in his career"] },
  { player:"Julius Boros", sport:"⛳ Golf", answer:"BOROS", era:"legends", stats:{MAJORS:"3",AGE:"48",WINS:"18",YEAR:"1968"}, ctx:"1968 PGA Championship — An unlikely champion at Pecan Valley", clues:["Won the 1968 PGA Championship at age 48 — oldest major winner ever","Won 3 major championships in his career","From Fairfield, Connecticut","Was known for his relaxed, unhurried swing"] },
  { player:"Wally Berger", sport:"⚾ MLB", answer:"BERGER", era:"legends", stats:{HR:"38",AVG:".310",RBI:"119",YEAR:"1930"}, ctx:"1930 MLB Season — Boston Braves rookie", clues:["Had a career cut short by a beaning in 1934 that caused vision problems — otherwise may have been one of the all-time greats","The record stood for decades","Batted .310 during this standout season","Was one of the best power hitters of the 1930s despite playing for weak teams"] },
  { player:"Dick Groat", sport:"⚾ MLB", answer:"GROAT", era:"legends", stats:{AVG:".325",HR:"2",RBI:"50",YEAR:"1960"}, ctx:"1960 NL MVP Season — Pittsburgh Pirates", clues:["Hit .325 for his career and was one of the most complete shortstops of his era — valued for contact and defense over power","Led the Pirates to the 1960 World Series championship","Was also a two-time All-American basketball player at Duke","Beat out Willie Mays for the MVP award"] },
  { player:"Norm Cash", sport:"⚾ MLB", answer:"CASH", era:"legends", stats:{HR:"41",AVG:".361",RBI:"132",YEAR:"1961"}, ctx:"1961 MLB Season — Detroit Tigers", clues:["Hit .361 in 1961 — widely believed to be aided by amphetamines — but was otherwise a solid first baseman for Detroit","Never came close to this season again in his career","The Tigers have one of baseball's most storied franchises featuring Ty Cobb Hank Greenberg and Al Kaline","Later admitted he used a corked bat during his .361 season"] },
  { player:"Jim Wynn", sport:"⚾ MLB", answer:"WYNN", era:"classic", stats:{G:"4",HR:"1",AVG:".250",RBI:"2"}, ctx:"1974 NL Championship Series — Los Angeles Dodgers", clues:["Played most of his career for the Astros and was nicknamed the Toy Cannon for his short stature and powerful swing","Was nicknamed The Toy Cannon for his small stature and power","The Dodgers moved from Brooklyn to Los Angeles in 1958 breaking New York hearts","Was one of the first power hitters to prioritize walks and OBP"] },
  { player:"Chet Lemon", sport:"⚾ MLB", answer:"CHET LEMON", era:"classic", stats:{HR:"24",AVG:".318",RBI:"86",YEAR:"1979"}, ctx:"1979 MLB Season — Chicago White Sox", clues:["Was a center fielder who led the AL in putouts three times and was considered one of the best defensive outfielders of his era","Was one of the best defensive center fielders of the 1980s","The White Sox were at the center of the 1919 Black Sox scandal — the greatest fix in baseball history","Won a World Series with the Tigers in 1984"] },
  { player:"Vada Pinson", sport:"⚾ MLB", answer:"PINSON", era:"legends", stats:{H:"204",AVG:".343",HR:"20",YEAR:"1959"}, ctx:"1959 MLB Season — Cincinnati Reds", clues:["Hit over .300 in his first five seasons and was considered a future Hall of Famer before his career plateaued in his late 20s","Was a perennial All-Star who never won an MVP","The Big Red Machine Reds of the 1970s were one of baseball's greatest dynasties","Was considered one of the most underrated players of his era"] },
  { player:"Billy Pierce", sport:"⚾ MLB", answer:"PIERCE", era:"legends", stats:{W:"211",ERA:"3.27",SO:"1999",CG:"193"}, ctx:"Career — Chicago White Sox ace 1950s", clues:["Was a 7x All-Star who finished with a 211-169 record and 3.27 ERA","Finished with 211 wins but is not in the Hall of Fame","Was a 7-time All-Star","Is considered one of the most underrated pitchers of the postwar era"] },
  { player:"Hal Greer", sport:"🏀 NBA", answer:"GREER", era:"legends", stats:{PTS:"22.1",REB:"5.3",AST:"4.7",YEAR:"1968"}, ctx:"1967-68 NBA Season — Philadelphia 76ers", clues:["Won an NBA championship with a 76ers team widely considered one of the best ever assembled in league history","Played all 15 seasons for the same franchise","Was known for shooting his free throws as jump shots","From Huntington, West Virginia — 10x NBA All-Star"] },
  { player:"Bailey Howell", sport:"🏀 NBA", answer:"HOWELL", era:"legends", stats:{PTS:"19.8",REB:"9.9",FG:"49.8",YEAR:"1966"}, ctx:"1965-66 NBA Season — Baltimore Bullets", clues:["Was a 6-time All-Star who played in both the NBA and ABA — never quite getting the recognition his numbers deserved","Celtic were the first British club to win the European Cup in 1967 — known as the Lisbon Lions","Was a 6x NBA All-Star","From Middleton, Tennessee — Mississippi State standout"] },
  { player:"Clyde Lee", sport:"🏀 NBA", answer:"CLYDE LEE", era:"legends", stats:{REB:"14.0",PTS:"10.2",BLK:"2.1",YEAR:"1970"}, ctx:"1969-70 NBA Season — San Francisco Warriors", clues:["Played 11 seasons in the NBA and ABA and was one of the tallest centers of his era at 6 feet 10 inches","Averaged 10.2 points per game during this season","Was a 7-footer before 7-footers were common","Played college ball at Vanderbilt University"] },

  // ── HARD TENNIS (modern) ─────────────────────────────────────────────────────
  { player:"Fernando Gonzalez", sport:"🎾 ATP", answer:"GONZALEZ", era:"modern", stats:{W:"44",L:"9",TITLES:"4",GS:"0"}, ctx:"2007 ATP Season — Career best year", clues:["Won 4 titles and reached the Australian Open final this year","Reached a career high ranking of World No. 5","From Santiago, Chile — known for his huge forehand","Won Olympic silver at the 2004 Athens Olympics"] },
  { player:"Tommy Haas", sport:"🎾 ATP", answer:"HAAS", era:"modern", stats:{W:"51",L:"19",TITLES:"3",BEST_RANK:"2"}, ctx:"2002 ATP Season — Reached World No. 2", clues:["Was one of the most accomplished players of their generation","German player who overcame serious shoulder surgery twice","Reached the Australian Open final in 2002","Came back to win titles at age 35"] },
  { player:"Fabrice Santoro", sport:"🎾 ATP", answer:"SANTORO", era:"modern", stats:{W:"43",L:"22",TITLES:"2",RANK:"17"}, ctx:"2001 ATP Season — Career best year", clues:["Was known for his unusual double-handed forehand and backhand","French player nicknamed The Magician for his shot-making","Played professional tennis for 24 years","Won the French Open doubles title multiple times"] },
  { player:"Marcelo Rios", sport:"🎾 ATP", answer:"RIOS", era:"classic", stats:{W:"75",L:"19",WEEKS_NO1:"101",GS:"0"}, ctx:"1998 ATP Season", clues:["Was one of the most accomplished players of their generation","From Santiago, Chile — first South American to reach No. 1","Won the Masters in 1998 and reached the Australian Open final","Was known for his exceptional talent but difficult personality"] },
  { player:"Alex Corretja", sport:"🎾 ATP", answer:"CORRETJA", era:"classic", stats:{W:"67",L:"27",TITLES:"3",BEST_RANK:"2"}, ctx:"1998 ATP Season — Reached World No. 2", clues:["Reached a career high of World No. 2 in 1998","Spanish clay court specialist who won 3 titles this year","Won the ATP Finals in 1998","Was best known for a famous 1996 US Open match vs Sampras where both players vomited on court"] },

  // ── HARD TENNIS (classic) ────────────────────────────────────────────────────
  { player:"Vitas Gerulaitis", sport:"🎾 ATP", answer:"GERULAITIS", era:"classic", stats:{W:"57",L:"23",TITLES:"4",GS:"0"}, ctx:"1977 ATP Season — Career best year", clues:["Reached the Australian Open final and Wimbledon semifinal this year","American player known as Broadway Vitas for his flamboyant lifestyle","Famous for saying nobody beats Vitas Gerulaitis 17 times in a row — then losing to him","Died tragically in 1994 from accidental carbon monoxide poisoning"] },
  { player:"Tony Roche", sport:"🎾 ATP", answer:"ROCHE", era:"legends", stats:{GRAND_SLAMS:"1",YEAR:"1966",COUNTRY:"Australia",DAVIS:"4"}, ctx:"1966 French Open — Australian left-hander", clues:["Won the 1966 French Open in his best singles result","Was better known as a doubles player — won 13 Grand Slam doubles titles","Australian left-hander who was John Newcombe's doubles partner","Later became a renowned coach working with multiple top players"] },

  // ── HARD SOCCER (classic) ────────────────────────────────────────────────────


  // ── HARD FOOTBALL (classic) ──────────────────────────────────────────────────
  { player:"Harvey Martin", sport:"🏈 NFL", answer:"MARTIN", era:"classic", stats:{SCK:"23",FF:"3",YEAR:"1977",AWARD:"DPOY"}, ctx:"1977 NFL Season — Dallas Cowboys Defensive Player of Year", clues:["Won the NFL Defensive Player of the Year award in 1977","This performance came during the 1977 NFL season","Was co-MVP of Super Bowl XII with Randy White","Nicknamed Too Mean"] },

  // ── HARD FOOTBALL (legends) ──────────────────────────────────────────────────

  // ── HARD HOCKEY (modern) ─────────────────────────────────────────────────────

  // ── HARD HOCKEY (legends) ────────────────────────────────────────────────────
  { player:"Bill Mosienko", sport:"🏒 NHL", answer:"MOSIENKO", era:"legends", stats:{G:"3",TIME:"21sec",PER:"3rd",OPP:"Rangers"}, ctx:"March 23, 1952 — Chicago Blackhawks vs New York Rangers", clues:["Scored 3 goals in 21 seconds — the fastest hat trick in NHL history","The Blackhawks won 3 Cups in 6 years forming the most recent NHL dynasty","The record has stood for over 70 years","Ukrainian-Canadian winger from Winnipeg, Manitoba"] },
  { player:"Nels Stewart", sport:"🏒 NHL", answer:"NELS", era:"legends", stats:{G:"324",PTS:"515",YEAR:"1940",TEAMS:"3"}, ctx:"Career — The Silent Joe of the Montreal Maroons dynasty", clues:["Was the first player in NHL history to score 300 career goals","The Bruins have the second most Stanley Cup championships in NHL history","Won the Hart Trophy twice as league MVP","Nicknamed Old Poison for his deadly shooting"] },
  { player:"Charlie Conacher", sport:"🏒 NHL", answer:"CONACHER", era:"legends", stats:{G:"52",PTS:"73",YEAR:"1932",TEAM:"Toronto"}, ctx:"1931-32 NHL Season — Toronto Maple Leafs", clues:["Led the NHL in goals 5 times in his career","Was part of the famous Kid Line with Harvey Jackson and Joe Primeau","Was known for being the most complete player of his era — equally dominant in all three zones","Was one of the hardest shooters of his era"] },

  { player:"Gilbert Arenas", sport:"🏀 NBA", answer:"AGENT ZERO", era:"modern", stats:{PTS:"29.3",AST:"6.1",REB:"4.4",STL:"1.7"}, ctx:"2005-06 NBA Season — Washington Wizards scoring leader", clues:["Led the Washington Wizards in scoring at 29.3 PPG","Averaged 29.3 points per game during this season","Nicknamed Agent Zero because no team drafted him initially","Had a notorious locker room incident that ended his career"] },
  { player:"Stephon Marbury", sport:"🏀 NBA", answer:"STEPH MARBURY", era:"modern", stats:{PTS:"22.3",AST:"8.1",REB:"3.3",STL:"1.7"}, ctx:"2003-04 NBA Season — Phoenix Suns point guard", clues:["Was one of the most talented but troubled point guards of his era","The Suns invented the Seven Seconds or Less fast-break offense under coach Mike D'Antoni","From Coney Island Brooklyn","Left the NBA to become a legend in the Chinese Basketball Association"] },
  { player:"Jamal Mashburn", sport:"🏀 NBA", answer:"MASHBURN", era:"modern", stats:{PTS:"24.9",REB:"6.4",AST:"4.0",FG:"45.2"}, ctx:"2000-01 NBA Season — Miami Heat All-Star", clues:["Was one of the most versatile forwards of his era","Played in South Beach for a franchise that attracted the biggest superstar names","From New York City","Had his career ended prematurely by knee injuries"] },
  { player:"Mike Bibby", sport:"🏀 NBA", answer:"MIKE BIBBY", era:"modern", stats:{PTS:"18.4",AST:"7.3",REB:"3.7","3PM":"2.1"}, ctx:"2001-02 NBA Season — Sacramento Kings", clues:["Was a key player on the Sacramento Kings that nearly won the championship","His Kings had a famous controversial playoff series vs the Lakers in 2002","Son of former NBA player Henry Bibby","Led the Kings in assists this season"] },
  { player:"Peja Stojakovic", sport:"🏀 NBA", answer:"PEJA", era:"modern", stats:{PTS:"24.2",REB:"5.1","3PM":"3.1",FG:"48.4"}, ctx:"2003-04 NBA Season — Sacramento Kings scoring title", clues:["Won the NBA scoring title this season","The Kings moved from Cincinnati to Kansas City to Sacramento and haven't won a title since 1951","Serbian shooter who was one of the best in his era","Won the NBA championship with the Dallas Mavericks in 2011"] },
  { player:"Baron Davis", sport:"🏀 NBA", answer:"BD", era:"modern", stats:{PTS:"22.7",AST:"8.1",REB:"4.8",STL:"2.3"}, ctx:"2006-07 NBA Season — Golden State Warriors playoff run", clues:["Led the We Believe Warriors to upset the 1-seed Dallas Mavericks in the first round","Had a famous dunk over Andrei Kirilenko that became one of the most iconic playoff moments of the decade","Was a two-time All-Star known for his explosive athleticism and court vision","From Inglewood California"] },
  { player:"Larry Hughes", sport:"🏀 NBA", answer:"LARRY HUGHES", era:"modern", stats:{PTS:"22.0",STL:"2.9",REB:"5.2",AST:"4.1"}, ctx:"2004-05 NBA Season — Washington Wizards", clues:["Led the NBA in steals with 2.9 per game","Averaged 22.0 points per game during this season","Was selected by the 76ers as the 8th overall pick in 1998","Later joined LeBron James in Cleveland"] },
  { player:"Ben Gordon", sport:"🏀 NBA", answer:"BEN GORDON", era:"modern", stats:{PTS:"21.4",AST:"3.3",REB:"2.7","3PM":"2.8"}, ctx:"2007-08 NBA Season — Chicago Bulls sixth man", clues:["Won the NBA Sixth Man of the Year award in 2005","Was the cornerstone of the dynasty that won 6 championships in the 1990s","From London England — one of the first British NBA stars","Was the 3rd overall pick in the 2004 NBA Draft"] },
  { player:"Monta Ellis", sport:"🏀 NBA", answer:"MONTA ELLIS", era:"modern", stats:{PTS:"24.1",AST:"5.9",REB:"3.4",STL:"1.8"}, ctx:"2011-12 NBA Season — Milwaukee Bucks", clues:["Was one of the most prolific undersized scorers of his era","The Bucks drafted both Kareem Abdul-Jabbar and Oscar Robertson in their early years","From Jackson Mississippi","Famously had a moped accident that revealed he had hidden an injury from his team"] },
  { player:"Al Harrington", sport:"🏀 NBA", answer:"AL HARRINGTON", era:"modern", stats:{PTS:"20.6",REB:"7.0",AST:"2.3",FG:"46.8"}, ctx:"2008-09 NBA Season — New York Knicks", clues:["Averaged over 20 points per game for the Knicks this season","Averaged 20.6 points per game during this season","Was drafted directly out of high school in 1998","Was known for his versatility as a big forward who could shoot threes"] },
  { player:"Corey Maggette", sport:"🏀 NBA", answer:"MAGGETTE", era:"modern", stats:{PTS:"22.2",REB:"5.0",AST:"3.0",FT:"8.4"}, ctx:"2007-08 NBA Season — Los Angeles Clippers", clues:["Was one of the best free throw drawers in the NBA","Averaged 22.2 points per game during this season","Won a national championship at Duke in 1999","Led the NBA in free throw attempts multiple times"] },
  { player:"Andrei Kirilenko", sport:"🏀 NBA", answer:"AK47", era:"modern", stats:{PTS:"16.5",REB:"8.1",AST:"3.4",BLK:"2.4"}, ctx:"2003-04 NBA Season — Utah Jazz All-Star", clues:["Was one of the most versatile defensive players of his era","The Jazz kept their New Orleans jazz-themed name even after relocating to Utah","Nicknamed AK47 for his jersey number and last name initial","From Izhevsk Russia"] },
  { player:"Shareef Abdur-Rahim", sport:"🏀 NBA", answer:"SHAREEF", era:"modern", stats:{PTS:"21.4",REB:"8.0",AST:"2.7",FG:"47.9"}, ctx:"2001-02 NBA Season — Atlanta Hawks", clues:["Was one of the best players never to make the playoffs in his career","Averaged 21.4 points per game during this season","Was the 3rd overall pick in the 1996 NBA Draft","From Marietta Georgia"] },
  { player:"World B. Free", sport:"🏀 NBA", answer:"WORLD FREE", era:"classic", stats:{PTS:"30.2",AST:"6.0",REB:"3.3",FG:"48.5"}, ctx:"1979-80 NBA Season — San Diego Clippers scoring title", clues:["Led the NBA in scoring with 30.2 PPG","Changed his name legally to World B. Free","Averaged 30.2 points per game during this season","Was known for his hang time and acrobatic shots"] },
  { player:"Bob McAdoo", sport:"🏀 NBA", answer:"BOB MCADOO", era:"classic", stats:{PTS:"34.5",REB:"14.1",BLK:"3.3",FG:"51.2"}, ctx:"1974-75 NBA Season — Buffalo Braves MVP", clues:["Won the NBA MVP and scoring title this season","Led the NBA in scoring for 3 consecutive years","Averaged 34.5 points per game during this season","Won 2 championships later with the LA Lakers"] },
  { player:"George McGinnis", sport:"🏀 NBA", answer:"MCGINNIS", era:"classic", stats:{PTS:"23.0",REB:"14.3",AST:"3.8",STL:"2.1"}, ctx:"1975-76 NBA Season — Philadelphia 76ers", clues:["Was the ABA MVP the year before joining the NBA","The 76ers embraced The Process — one of the most deliberate rebuilds in sports history","Was one of the most powerful forwards of the 1970s","Played alongside Dr. J in the ABA and NBA"] },
  { player:"Len Elmore", sport:"🏀 NBA", answer:"LEN ELMORE", era:"classic", stats:{REB:"9.8",PTS:"9.7",BLK:"2.1",YEAR:"1977"}, ctx:"1976-77 NBA Season — Indiana Pacers center", clues:["Was a defensive specialist center for the Indiana Pacers","Averaged 9.7 points per game during this season","Later became a television broadcaster and lawyer","From New York City"] },
  { player:"Mouhamed Sene", sport:"🏀 NBA", answer:"MOUHAMED SENE", era:"modern", stats:{PICK:"10",YEAR:"2006",BLOCKS:"1.8",TEAM:"SuperSonics"}, ctx:"Career Totals — High lottery pick who barely made it in the NBA", clues:["Signed with the Seattle SuperSonics as the 10th overall pick in 2006 despite being very raw","Was one of the last notable picks before the SuperSonics franchise moved to Oklahoma City","Averaged under 3 points per game for his career despite being a top-10 selection","From Dakar Senegal — came to the NBA directly from Africa as a teenager with enormous upside"] },





  { player:"Neil O'Donnell", sport:"🏈 NFL", answer:"NEIL O DONNELL", era:"classic", stats:{YDS:"2970",TD:"17",INT:"7",RTG:"87.7"}, ctx:"1994 NFL Season — Pittsburgh Steelers", clues:["Led Pittsburgh Steelers to the Super Bowl this season","Threw 2 interceptions directly to Larry Brown in Super Bowl XXX","Scored 17 touchdowns during this season","Was considered a very reliable but unspectacular quarterback"] },
  { player:"Dave Krieg", sport:"🏈 NFL", answer:"DAVE KRIEG", era:"classic", stats:{YDS:"3309",TD:"23",INT:"12",RTG:"94.6"}, ctx:"1994 NFL Season — Arizona Cardinals", clues:["Was an undrafted free agent who had a long successful career","Scored 23 touchdowns during this season","Started his career with the Seattle Seahawks","Holds the record for the most fumbles in NFL history"] },
  { player:"Earl Morrall", sport:"🏈 NFL", answer:"EARL MORRALL", era:"legends", stats:{YDS:"2909",TD:"26",INT:"17",RTG:"93.2"}, ctx:"1968 NFL Season — Baltimore Colts MVP replacement", clues:["Won the NFL MVP award filling in for injured Johnny Unitas","Scored 26 touchdowns during this season","Led the Colts to a Super Bowl berth only to lose to Joe Namath","Later filled in for Bob Griese on the undefeated 1972 Dolphins"] },
  { player:"Len Dawson", sport:"🏈 NFL", answer:"LEN DAWSON", era:"classic", stats:{YDS:"200",TD:"1",INT:"1",RTG:"98.2"}, ctx:"Super Bowl IV MVP — Kansas City Chiefs vs Minnesota Vikings", clues:["Won the Super Bowl MVP with the Kansas City Chiefs","Scored 1 touchdowns during this season","Was released by multiple teams before finding success","Was the first quarterback to pass for over 2000 yards in the AFL"] },
  { player:"Daryle Lamonica", sport:"🏈 NFL", answer:"LAMONICA", era:"legends", stats:{YDS:"3228",TD:"30",INT:"20",RTG:"80.0"}, ctx:"1967 AFL Season — Oakland Raiders MVP", clues:["Won the AFL MVP this season","Nicknamed The Mad Bomber for his deep passing attack","The Raiders won 3 Super Bowls with an outlaw rebellious team culture","Led Oakland to Super Bowl II but lost to the Green Bay Packers"] },
  { player:"Roman Gabriel", sport:"🏈 NFL", answer:"ROMAN GABRIEL", era:"legends", stats:{YDS:"2779",TD:"24",INT:"7",RTG:"91.0"}, ctx:"1969 NFL Season — Los Angeles Rams MVP", clues:["Won the NFL MVP award this season","Scored 24 touchdowns during this season","Was the first Filipino-American starting quarterback in NFL history","Later won the Comeback Player of the Year with Philadelphia"] },
  { player:"Bob Lee", sport:"🏈 NFL", answer:"BOB LEE QB", era:"classic", stats:{YDS:"1440",TD:"12",INT:"10",RTG:"68.4"}, ctx:"1975 NFL Season — Minnesota Vikings backup QB", clues:["Was the emergency starter for the Vikings when Tarkenton was injured","The Vikings reached the Super Bowl 4 times but came away without a win each time","Was one of the most traveled backup quarterbacks in NFL history","Scored 12 touchdowns during this season"] },
  { player:"Rick Sutcliffe", sport:"⚾ MLB", answer:"RICK SUTCLIFFE", era:"classic", stats:{W:"16",ERA:"2.69",SO:"155",WHIP:"1.070"}, ctx:"1984 MLB Season — Chicago Cubs Cy Young", clues:["Won the NL Cy Young award going 16-1 with the Cubs after a mid-season trade","Had gone 4-5 with Cleveland before the trade","The Cubs ended a 108-year World Series drought in 2016 in one of sports greatest moments","Led the Cubs to the NLCS for the first time in 39 years"] },
  { player:"Bret Saberhagen", sport:"⚾ MLB", answer:"SABERHAGEN", era:"classic", stats:{W:"20",ERA:"2.87",SO:"158",WHIP:"1.065"}, ctx:"1985 MLB Season — Kansas City Royals Cy Young", clues:["Won the AL Cy Young with the Kansas City Royals","Also won the World Series MVP that year","Was only 21 years old","Had a career of alternating dominant and mediocre seasons"] },
  { player:"Frank Viola", sport:"⚾ MLB", answer:"SWEET MUSIC", era:"classic", stats:{W:"24",ERA:"2.64",SO:"193",WHIP:"1.020"}, ctx:"1988 MLB Season — Minnesota Twins Cy Young", clues:["Won the AL Cy Young with the Minnesota Twins","Won 24 games this season","Nicknamed Sweet Music for his last name","Had won the World Series MVP the previous year"] },
  { player:"Bob Welch", sport:"⚾ MLB", answer:"BOB WELCH", era:"classic", stats:{W:"27",ERA:"2.95",SO:"127",WHIP:"1.157"}, ctx:"1990 MLB Season — Oakland Athletics Cy Young", clues:["Won 27 games — the most in the majors since 1974","Won the AL Cy Young with the Oakland Athletics","Was open about his recovery from alcoholism","Won 3 World Series rings with the Dodgers and Athletics"] },
  { player:"Kevin Brown", sport:"⚾ MLB", answer:"KEVIN BROWN", era:"classic", stats:{W:"18",ERA:"2.28",SO:"205",WHIP:"1.036"}, ctx:"1996 MLB Season — Florida Marlins All-Star", clues:["Was one of the most unhittable pitchers of the 1990s","The Marlins won two World Series titles in just 11 seasons as a franchise","Was known for his heavy sinking fastball","Later signed the first $100M contract for a pitcher"] },
  { player:"David Cone", sport:"⚾ MLB", answer:"DAVID CONE", era:"classic", stats:{W:"20",ERA:"2.94",SO:"222",WHIP:"1.116"}, ctx:"1994 MLB Season — Kansas City Royals All-Star", clues:["Won 20 games with the Kansas City Royals before the players strike","Later threw a perfect game with the Yankees in 1999","Posted an ERA of 2.94 — among the best of the season","Was a 5x All-Star"] },
  { player:"Jim Abbott", sport:"⚾ MLB", answer:"JIM ABBOTT", era:"classic", stats:{W:"18",ERA:"2.77",SO:"95",WHIP:"1.162"}, ctx:"1991 MLB Season — California Angels All-Star", clues:["Won 18 games with the California Angels","Was born with one hand — a true inspiration story","Later threw a no-hitter with the New York Yankees in 1993","Won a gold medal at the 1988 Olympics as an amateur"] },
  { player:"Jim Lonborg", sport:"⚾ MLB", answer:"JIM LONBORG", era:"legends", stats:{W:"22",ERA:"3.16",SO:"246",WHIP:"1.189"}, ctx:"1967 MLB Season — Boston Red Sox Cy Young", clues:["Won the AL Cy Young in the Impossible Dream season","Led the Red Sox to the World Series","Was injured in a skiing accident and was never the same pitcher again","Was known as Gentleman Jim"] },
  { player:"Vida Blue", sport:"⚾ MLB", answer:"VIDA BLUE", era:"classic", stats:{W:"24",ERA:"1.82",SO:"301",WHIP:"0.954"}, ctx:"1971 MLB Season — Oakland Athletics MVP and Cy Young", clues:["Won both the MVP and Cy Young in the same year","The Moneyball A's used statistical analysis to compete with teams that outspent them massively","Was only 21 years old when he won both awards","Had his salary dispute with Charlie Finley become national news"] },
  { player:"Danny Darwin", sport:"⚾ MLB", answer:"DANNY DARWIN", era:"classic", stats:{ERA:"2.21",W:"12",SO:"130",YEAR:"1990"}, ctx:"1990 MLB Season — Houston Astros ERA leader", clues:["Led the NL in ERA with 2.21","The Astros rebuilt from one of the worst teams in history to become a dynasty","Won the ERA title despite only winning 12 games","Had a long career spanning multiple teams and decades"] },
  { player:"Early Wynn", sport:"⚾ MLB", answer:"EARLY WYNN", era:"legends", stats:{W:"22",ERA:"2.72",SO:"179",WHIP:"1.159"}, ctx:"1959 MLB Season — Chicago White Sox Cy Young", clues:["Won the AL Cy Young with the Chicago White Sox","Was 39 years old when he won the award","Was known as the meanest pitcher in baseball","Won 300 games in his career after a very slow start"] },
  { player:"Lew Burdette", sport:"⚾ MLB", answer:"LEW BURDETTE", era:"legends", stats:{W:"17",ERA:"2.70",SO:"113",WHIP:"1.078"}, ctx:"1957 World Series MVP — Milwaukee Braves", clues:["Won 3 games in the 1957 World Series including 2 shutouts","Was suspected of throwing a spitball his entire career","Posted an ERA of 2.70 — among the best of the season","Was involved in a trade that brought him to Milwaukee from the Yankees"] },
  { player:"Rube Waddell", sport:"⚾ MLB", answer:"RUBE WADDELL", era:"legends", stats:{W:"27",ERA:"1.62",SO:"349",WHIP:"0.978"}, ctx:"1904 MLB Season — Philadelphia Athletics strikeout king", clues:["Led the major leagues in strikeouts for 6 consecutive seasons","Was one of the most eccentric players in baseball history","Posted an ERA of 1.62 — among the best of the season","Would leave games to chase fire trucks and would be distracted by shiny objects"] },
  { player:"Ed Walsh", sport:"⚾ MLB", answer:"ED WALSH", era:"legends", stats:{W:"40",ERA:"1.27",IP:"464",CG:"42"}, ctx:"1908 MLB Season — Chicago White Sox — most innings ever", clues:["Won 40 games and threw 464 innings — still the most ever","The White Sox were at the center of the 1919 Black Sox scandal — the greatest fix in baseball history","His career ERA of 1.82 is the lowest in baseball history","Threw a spitball that was devastating in the dead ball era"] },
  { player:"Mordecai Brown", sport:"⚾ MLB", answer:"THREE FINGER BROWN", era:"legends", stats:{W:"29",ERA:"1.04",CG:"27",WHIP:"0.861"}, ctx:"1906 MLB Season — Chicago Cubs dominant year", clues:["Had a 1.04 ERA — one of the lowest single-season totals ever","The Cubs ended a 108-year World Series drought in 2016 in one of sports greatest moments","Lost part of two fingers in a farm accident as a child","Nicknamed Three Finger Brown — the injury made his curve nastier"] },
  { player:"Pete Alexander", sport:"⚾ MLB", answer:"GROVER ALEXANDER", era:"legends", stats:{W:"33",ERA:"1.55",SO:"241",SHO:"16"}, ctx:"1916 MLB Season — Philadelphia Phillies dominant year", clues:["Won 33 games and threw 16 shutouts — both still records","The Phillies won the World Series in 2008 ending a 28-year championship drought","Suffered from epilepsy and alcoholism throughout his career","Was a hero of the 1926 World Series at age 39"] },
  { player:"Addie Joss", sport:"⚾ MLB", answer:"ADDIE JOSS", era:"legends", stats:{ERA:"1.16",W:"27",SHO:"9",WHIP:"0.867"}, ctx:"1908 MLB Season — Cleveland Naps — career best year", clues:["Has the second-lowest career ERA in baseball history","Posted an ERA of 1.16 — among the best of the season","Died of tubercular meningitis at age 31 at the peak of his career","Was inducted into the Hall of Fame despite falling short of the games requirement"] },
  { player:"Smoky Joe Wood", sport:"⚾ MLB", answer:"SMOKY JOE WOOD", era:"legends", stats:{W:"34",ERA:"1.91",SO:"258",WHIP:"1.036"}, ctx:"1912 MLB Season — Boston Red Sox dominant season", clues:["Won 34 games with the Boston Red Sox","Had one of the greatest single seasons in baseball history","Injured his arm and later converted to an outfielder","Was considered as fast as Walter Johnson in his prime"] },
  { player:"Eppa Rixey", sport:"⚾ MLB", answer:"EPPA RIXEY", era:"legends", stats:{W:"25",ERA:"2.78",SO:"134",WHIP:"1.168"}, ctx:"1922 MLB Season — Cincinnati Reds All-Star", clues:["Won 25 games for the Cincinnati Reds","Was the all-time leader in victories for a left-hander when he retired","Posted an ERA of 2.78 — among the best of the season","Was 6ft 5in — a giant for his era"] },
  { player:"Wes Ferrell", sport:"⚾ MLB", answer:"WES FERRELL", era:"legends", stats:{W:"25",ERA:"3.52",HR:"7",YEAR:"1935"}, ctx:"1935 MLB Season — Boston Red Sox pitcher and hitter", clues:["Won 25 games AND hit 7 home runs — the most ever for a pitcher in a season","Was one of the best hitting pitchers in baseball history","The Red Sox ended an 86-year championship drought known as the Curse of the Bambino","His brother Rick was also a major league catcher in the same era"] },
  { player:"Burleigh Grimes", sport:"⚾ MLB", answer:"BURLEIGH GRIMES", era:"legends", stats:{W:"25",ERA:"2.99",SO:"136",YEAR:"1921"}, ctx:"1921 MLB Season — Pittsburgh Pirates All-Star", clues:["Was the last legal spitball pitcher in MLB history","Won 25 games for the Pittsburgh Pirates","Had a long career spanning from 1916 to 1934","Was known as Old Stubblebeard for his unshaven face when pitching"] },
  { player:"Clark Griffith", sport:"⚾ MLB", answer:"THE OLD FOX", era:"legends", stats:{W:"24",ERA:"2.79",SO:"93",YEAR:"1898"}, ctx:"1898 MLB Season — Chicago Colts pitcher and manager", clues:["Won 24 games as a pitcher and was also the team manager","Nicknamed The Old Fox for his crafty pitching","Became one of the most powerful owners in baseball history","Owned the Washington Senators for decades"] },
  { player:"Jesse Haines", sport:"⚾ MLB", answer:"JESSE HAINES", era:"legends", stats:{W:"24",ERA:"3.25",SO:"101",YEAR:"1927"}, ctx:"1927 MLB Season — St. Louis Cardinals All-Star", clues:["Won 24 games for the St. Louis Cardinals","Was one of the few players elected by the Veterans Committee to the Hall of Fame","Posted an ERA of 3.25 — among the best of the season","Had a blister on his finger end a World Series game in 1926 — bringing in Alexander"] },
  { player:"Preben Elkjaer", sport:"⚽ Soccer", answer:"PREBEN ELKJAER", era:"modern", stats:{G:"38",APP:"69",YEAR:"1986",COUNTRY:"Denmark"}, ctx:"Career — Denmark and Verona striker legend", clues:["Led Denmark to their first major tournament in 1984","Won the Serie A title with Hellas Verona in 1985 — one of the biggest shocks ever","Was the most famous Danish player before Peter Schmeichel","Nicknamed Crazy Horse for his energetic style"] },
  { player:"Dragan Stojkovic", sport:"⚽ Soccer", answer:"PIKSI", era:"modern", stats:{G:"29",APP:"84",YEAR:"1990",COUNTRY:"Yugoslavia"}, ctx:"Career — Yugoslavia and Red Star Belgrade legend", clues:["Won the European Cup with Red Star Belgrade in 1991","Scored 29 goals during this tournament or season","Nicknamed Piksi","Was considered the best Yugoslav player since the late 1980s"] },
  { player:"Tomas Skuhravy", sport:"⚽ Soccer", answer:"SKUHRAVY", era:"classic", stats:{G:"5",APP:"5",MIN:"450",YEAR:"1990"}, ctx:"1990 FIFA World Cup — Czechoslovakia", clues:["Scored 5 goals to finish as joint top scorer at the 1990 World Cup","Scored 5 goals during this tournament or season","Later played for Genoa in Serie A","Was a powerful aerial striker"] },
  { player:"Zvonimir Boban", sport:"⚽ Soccer", answer:"ZVONIMIR BOBAN", era:"modern", stats:{G:"12",APP:"51",YEAR:"1998",COUNTRY:"Croatia"}, ctx:"Career — Croatia and AC Milan midfield general", clues:["Was the captain of Croatia at the 1998 World Cup","AC Milan have won the European Cup 7 times — second only to Real Madrid all-time","Was suspended for kicking a policeman at a Zagreb derby in 1990","Croatian midfielder considered a legend by his country"] },
  { player:"Predrag Mijatovic", sport:"⚽ Soccer", answer:"MIJATOVIC", era:"classic", stats:{G:"1",APP:"1",YEAR:"1998",MATCH:"UCL Final"}, ctx:"1998 UEFA Champions League Final — Real Madrid vs Juventus", clues:["Was one of the most accomplished players of their generation","Real Madrid have won the most UEFA Champions League titles of any club in history","Montenegrin striker who was a key player at Real Madrid","His goal broke the deadlock and gave Real Madrid the trophy"] },
  { player:"Mario Kempes", sport:"⚽ Soccer", answer:"MARIO KEMPES", era:"classic", stats:{G:"6",APP:"7",MIN:"630",YEAR:"1978"}, ctx:"1978 FIFA World Cup Final — Argentina hosts", clues:["Scored 6 goals to win the Golden Boot at the 1978 World Cup","Scored twice in the World Cup Final","Scored 6 goals during this tournament or season","Played his club football in Spain for Valencia"] },
  { player:"Teofilo Cubillas", sport:"⚽ Soccer", answer:"CUBILLAS", era:"classic", stats:{G:"10",APP:"13",YEAR:"1978",COUNTRY:"Peru"}, ctx:"Career — Peru and Alianza Lima legend", clues:["Scored 10 World Cup goals — still a record for a South American player","Was voted the best South American player of the 1970s","Scored 10 goals during this tournament or season","Was known for his curling free kicks and clever play"] },
  { player:"Antonin Panenka", sport:"⚽ Soccer", answer:"PANENKA", era:"classic", stats:{G:"1",PEN:"1",YEAR:"1976",MATCH:"Euro Final"}, ctx:"1976 European Championship Final — Czechoslovakia vs West Germany", clues:["Scored the most famous penalty in football history in the final","Chipped the ball down the middle while the goalkeeper dived","Czechoslovakia won the European Championship","His penalty style is now called a Panenka in his honor"] },
  { player:"Zbigniew Boniek", sport:"⚽ Soccer", answer:"ZIBI BONIEK", era:"classic", stats:{G:"4",APP:"7",MIN:"630",YEAR:"1982"}, ctx:"1982 FIFA World Cup — Poland third place", clues:["Scored a hat trick against Belgium in the 1982 World Cup","Juventus won 9 consecutive Serie A titles from 2012 to 2020 in one of Europe's greatest runs","Nicknamed Beautiful Zbig","Was voted the best Polish footballer of the 20th century"] },
  { player:"Grzegorz Lato", sport:"⚽ Soccer", answer:"GRZEGORZ LATO", era:"classic", stats:{G:"7",APP:"7",MIN:"630",YEAR:"1974"}, ctx:"1974 FIFA World Cup — Poland third place Golden Boot", clues:["Won the Golden Boot at the 1974 World Cup with 7 goals","Led Poland to a surprising third place finish","Scored 7 goals during this tournament or season","Was part of one of the best Polish teams in history"] },
  { player:"Ivo Viktor", sport:"⚽ Soccer", answer:"IVO VIKTOR", era:"classic", stats:{CS:"4",APP:"7",MIN:"630",YEAR:"1976"}, ctx:"1976 European Championship — Czechoslovakia winners", clues:["Was the goalkeeper for Czechoslovakia when they won the European Championship","Faced Panenka's famous penalty in the final — dived the wrong way","This performance came at the 1976 tournament or season","Was considered one of the best goalkeepers in European football in the 1970s"] },
  { player:"Josef Bican", sport:"⚽ Soccer", answer:"JOSEF BICAN", era:"legends", stats:{G:"805",CAREER:"1931-1956",COUNTRY:"Austria / Czech",RECORD:"Yes"}, ctx:"Career — May be the greatest scorer in football history", clues:["Is credited with scoring over 800 goals in official matches","May have scored more career goals than any player in history","Played professionally in Austria and Czechoslovakia from 1931 to 1956","Competed across multiple European leagues during a career that spanned 25 years"] },
  { player:"Ernst Willimowski", sport:"⚽ Soccer", answer:"ERNST WILLIMOWSKI", era:"legends", stats:{G:"4",APP:"1",YEAR:"1938",MATCH:"WC vs Brazil"}, ctx:"1938 FIFA World Cup — Poland vs Brazil 6-5", clues:["Scored 4 goals in a World Cup match but still lost 6-5","Scored 4 goals during this tournament or season","Later played for Germany during WWII under complicated circumstances","His 4-goal game remains one of the most remarkable in World Cup history"] },
  { player:"Nandor Hidegkuti", sport:"⚽ Soccer", answer:"NANDOR HIDEGKUTI", era:"legends", stats:{G:"3",APP:"1",YEAR:"1953",MATCH:"Wembley"}, ctx:"Nov 25 1953 — Hungary 6-3 England at Wembley", clues:["Scored a hat trick in the famous 6-3 Hungary win at Wembley","England had never lost at home to non-British opposition before this","Was the deep-lying center forward who confused England","Scored 3 goals during this tournament or season"] },
  { player:"Sindelar", sport:"⚽ Soccer", answer:"MATTHIAS SINDELAR", era:"legends", stats:{G:"27",APP:"43",YEAR:"1934",NATION:"Austria"}, ctx:"Career — Austria Wunderteam legend", clues:["Led the Austrian Wunderteam that was considered the best in the world in the early 1930s","Scored 27 goals during this tournament or season","Nicknamed Der Papierene (The Paper Man) for his slender frame","Died under mysterious circumstances in 1939 after refusing to play for Nazi Germany"] },
  { player:"Gyula Zsengeller", sport:"⚽ Soccer", answer:"GYULA ZSENGELLER", era:"legends", stats:{G:"7",APP:"5",YEAR:"1938",COUNTRY:"Hungary"}, ctx:"1938 FIFA World Cup — Hungary runner-up", clues:["Scored 7 goals at the 1938 World Cup — joint top scorer","Hungary reached the World Cup Final","Scored 7 goals during this tournament or season","Was one of Hungary's greatest goalscorers before the Golden Team era"] },
  { player:"Oldrich Nejedly", sport:"⚽ Soccer", answer:"OLDRICH NEJEDLY", era:"legends", stats:{G:"5",APP:"5",YEAR:"1934",COUNTRY:"Czech/Slovak"}, ctx:"1934 FIFA World Cup — Czechoslovakia runner-up", clues:["Won the Golden Boot at the 1934 World Cup with 5 goals","Czechoslovakia reached the World Cup Final","Was the best Czech player of the prewar era","Scored 5 goals during this tournament or season"] },
  { player:"Thomas Johansson", sport:"🎾 ATP", answer:"THOMAS JOHANSSON", era:"modern", stats:{W:"1",GRAND_SLAMS:"1",YEAR:"2002",RANK:"20"}, ctx:"2002 Australian Open — Surprise champion at World No. 20", clues:["Won the Australian Open as a major underdog at World No. 20","Swedish player who was never a consistent top-10 player","Beat Marat Safin in the final","This was his only Grand Slam title"] },
  { player:"Gaston Gaudio", sport:"🎾 ATP", answer:"GASTON GAUDIO", era:"modern", stats:{W:"1",GRAND_SLAMS:"1",YEAR:"2004",COUNTRY:"Argentina"}, ctx:"2004 French Open — Won from match point down", clues:["Won the French Open from match point down in the final","Beat Guillermo Coria who was the heavy favorite","Argentine clay court player","This was his only Grand Slam title"] },
  { player:"Hana Mandlikova", sport:"🎾 WTA", answer:"HANA MANDLIKOVA", era:"classic", stats:{GRAND_SLAMS:"4",WIMBLEDON:"1x winner",YEAR:"1985",COUNTRY:"Czech/Slovak"}, ctx:"1985 US Open — Czech champion wins in New York", clues:["Won the US Open this year for her 4th Grand Slam title","Won 4 Grand Slam singles titles in her career","From Czechoslovakia","Was known for her flamboyant style and all-court game"] },
  { player:"Pam Shriver", sport:"🎾 WTA", answer:"PAM SHRIVER", era:"classic", stats:{SINGLES_GS:"0 (doubles only)",DOUBLES_GS:"21",DOUBLES_WITH:"Navratilova",BEST_RANK:"3"}, ctx:"Career — Greatest doubles player without a singles major", clues:["Won 21 Grand Slam doubles titles alongside Martina Navratilova","Never won a singles Grand Slam despite being a top-5 player","American player who reached the US Open final at age 16","Was one of the most successful doubles players ever"] },
  { player:"Kathy Jordan", sport:"🎾 WTA", answer:"KATHY JORDAN", era:"classic", stats:{RANK:"6",WIMB:"QF",YEAR:"1983",STYLE:"S&V"}, ctx:"Career — American serve and volley specialist", clues:["Was one of the best serve and volley players in women's tennis","Reached World No. 6 in singles despite her attacking style","Was much more famous as a doubles player","From Bryn Mawr Pennsylvania"] },
  { player:"Pancho Segura", sport:"🎾 ATP", answer:"PANCHO SEGURA", era:"classic", stats:{TITLES:"Pro",BEST_RANK:"2",YEAR:"1952",NATION:"Ecuador"}, ctx:"Career — Professional tennis legend from Ecuador", clues:["Was considered the second-best player in the world behind Gonzales for years","Was from Ecuador — one of the first Latin American tennis stars","Used an unusual two-handed forehand that was highly effective","Later coached Jimmy Connors to great success"] },
  { player:"Mervyn Rose", sport:"🎾 ATP", answer:"MERVYN ROSE", era:"legends", stats:{GRAND_SLAMS:"1",YEAR:"1954",COUNTRY:"Australia",AUS_OPEN:"1x winner"}, ctx:"1954 Australian Championships — Davis Cup stalwart", clues:["Won the Australian Championships in 1954","Was a key member of the dominant Australian Davis Cup teams","Was much better known as a doubles player","Later became a successful tennis coach"] },
  { player:"Malcolm Anderson", sport:"🎾 ATP", answer:"MALCOLM ANDERSON", era:"legends", stats:{GRAND_SLAMS:"1",YEAR:"1957",COUNTRY:"Australia",OPEN:"US"}, ctx:"1957 US Championships — Surprise American champion", clues:["Won the US Championships as a qualifier in 1957","Beat Ashley Cooper in the final in a major upset","Australian player who was unseeded","His victory remains one of the biggest upsets in major tennis history"] },
  { player:"Paul Azinger", sport:"⛳ Golf", answer:"PAUL AZINGER", era:"classic", stats:{WINS:"1",MAJORS:"1",AVG:"70.51",YEAR:"1993"}, ctx:"1993 PGA Championship — Inverness Club win", clues:["Was a Ryder Cup stalwart for the United States and won the PGA Championship in 1987 in what many consider an upset","Was later diagnosed with lymphoma but came back to compete","From Holyoke Massachusetts","Later became a successful US Ryder Cup captain in 2008"] },
  { player:"Hal Sutton", sport:"⛳ Golf", answer:"HAL SUTTON", era:"classic", stats:{SCORE:"-10",MARGIN:"1",AGE:"25",FIELD:"Nicklaus"}, ctx:"1983 PGA Championship — Young champion beats Nicklaus", clues:["Was from Little Rock Arkansas and was considered one of the best young players on Tour before his career levelled off","Was named PGA Tour Player of the Year in 1983","From Shreveport Louisiana","His famous Ryder Cup pairing decision as captain in 2004 backfired badly"] },
  { player:"Robert Gamez", sport:"⛳ Golf", answer:"ROBERT GAMEZ", era:"classic", stats:{EID:"1",HOLE:"18",YEAR:"1990",WIN:"Nestle Invitational"}, ctx:"1990 Nestle Invitational — Eagle on 18 to beat Norman", clues:["Holed a 7-iron from 176 yards on the 18th to beat Greg Norman by 1","Was a rookie at the time","From Las Vegas Nevada","Won 2 PGA Tour events in his career"] },
  { player:"Billy Burke", sport:"⛳ Golf", answer:"BILLY BURKE", era:"legends", stats:{MAJORS:"1",WINS:"7",YEAR:"1931",ROUNDS:"144"}, ctx:"1931 US Open — Longest playoff in major history", clues:["His US Open win required three separate 36-hole playoffs over multiple days — the longest playoff in major championship history","The playoff lasted two full days of 36-hole rounds","From Naugatuck Connecticut","Was the first US Open champion born outside the United States"] },
  { player:"Johnny McDermott", sport:"⛳ Golf", answer:"JOHNNY MCDERMOTT", era:"legends", stats:{MAJORS:"2",US_OPEN:"2",YEAR:"1911",FIRST:"1"}, ctx:"1911 US Open — First American-born champion", clues:["Won the US Open twice before his 22nd birthday — making him one of the youngest multiple major winners in golf history","Won back-to-back US Opens in 1911 and 1912","Was only 19 when he won his first US Open","Had a mental breakdown and was institutionalized for most of his adult life"] },
  { player:"Walter Travis", sport:"⛳ Golf", answer:"WALTER TRAVIS", era:"legends", stats:{AMATEUR:"4",BRITISH:"1",YEAR:"1904",PUTTER:"Yes"}, ctx:"1904 British Amateur — First overseas winner", clues:["Was an American who won the British Amateur in 1904 despite being a complete unknown — shocking the golfing establishment","Won 4 major amateur titles in his career","Didn't take up golf until age 35 yet became one of the best","His controversial Schenectady putter was banned by the R&A after he won with it"] },
  { player:"Freddie McLeod", sport:"⛳ Golf", answer:"FREDDIE MCLEOD", era:"legends", stats:{MAJORS:"1",US_OPEN:"1",YEAR:"1908",WEIGHT:"108"}, ctx:"1908 US Open — Lightest champion", clues:["Was the shortest player to ever win the US Open at just 5 feet 4 inches and weighed only 108 pounds","Was said to weigh only 108 pounds — the lightest US Open champion ever","Was born in North Berwick Scotland","Later became the club professional at Columbia Country Club for decades"] },
  { player:"Alex Ross", sport:"⛳ Golf", answer:"ALEX ROSS", era:"legends", stats:{MAJORS:"1",US_OPEN:"1",YEAR:"1907",BROTHER:"Donald"}, ctx:"1907 US Open — Champion and designer's brother", clues:["Was a Scottish-born club professional in Brae Burn Massachusetts who won the US Open at age 25","Was the brother of famous golf course designer Donald Ross","Was born in Dornoch Scotland","Was one of the most accomplished players of their generation"] },
  { player:"Fred Herd", sport:"⛳ Golf", answer:"FRED HERD", era:"legends", stats:{MAJORS:"1",US_OPEN:"1",YEAR:"1898",COUNTRY:"Scotland"}, ctx:"1898 US Open — Early American champion", clues:["Was a Scottish immigrant who played out of the Myopia Hunt Club in Massachusetts when he won his only major","Was born in St Andrews Scotland","Later became a club professional at Washington Park in Chicago","Was part of the Scottish-born wave of professionals who dominated early American golf"] },
  { player:"Roman Hamrlik", sport:"🏒 NHL", answer:"ROMAN HAMRLIK", era:"modern", stats:{G:"16",AST:"49",PTS:"65",YEAR:"2002"}, ctx:"2001-02 NHL Season — New York Islanders", clues:["Was a defenseman from the Czech Republic who was picked first overall but never became the franchise player Tampa Bay hoped for","The Islanders won 4 consecutive Stanley Cups from 1980 to 1983 — a dynasty often overlooked","Czech defenseman who had a long productive career","Was the first Czech player selected 1st overall in NHL history"] },
  { player:"Alexandre Daigle", sport:"🏒 NHL", answer:"ALEXANDRE DAIGLE", era:"classic", stats:{G:"12",AST:"24",PTS:"36",YEAR:"1994"}, ctx:"1993-94 NHL Season — Ottawa Senators first overall pick", clues:["Was hyped as the next Mario Lemieux before he was drafted — and famously said the contract he signed was more than Lindros","The current Senators franchise was revived in 1992 — the original Ottawa team folded in 1934","Was one of the biggest busts in NHL draft history given the hype","Famously said he was happy to be drafted 1st overall because no one remembers 2nd"] },
  { player:"Bryan Berard", sport:"🏒 NHL", answer:"BRYAN BERARD", era:"classic", stats:{G:"20",AST:"50",PTS:"70",YEAR:"1997"}, ctx:"1996-97 NHL Season — New York Islanders Calder Trophy", clues:["Won the Calder Trophy as NHL Rookie of the Year","Was the 1st overall pick in the 1995 NHL Draft","Had his career derailed by an eye injury from a stick","Came back to play professionally despite losing most of the vision in one eye"] },
  { player:"Dainius Zubrus", sport:"🏒 NHL", answer:"DAINIUS ZUBRUS", era:"modern", stats:{G:"16",AST:"28",PTS:"44",YEAR:"2004"}, ctx:"2003-04 NHL Season — Washington Capitals", clues:["Was one of the first Lithuanian-born players to have a significant NHL career — spanning over 20 seasons","This season took place during the 2003 NHL campaign","Was selected 15th overall in the 1996 NHL Draft","Was one of the first Lithuanian players to have a significant NHL career"] },
  { player:"Sergei Gonchar", sport:"🏒 NHL", answer:"SERGEI GONCHAR", era:"modern", stats:{G:"18",AST:"47",PTS:"65",YEAR:"2004"}, ctx:"2003-04 NHL Season — Washington Capitals", clues:["Was one of the most productive offensive defensemen of his era","This season took place during the 2003 NHL campaign","Russian defenseman who later won the Stanley Cup with Pittsburgh","Was the 14th overall pick in the 1992 NHL Draft"] },
  { player:"Owen Nolan", sport:"🏒 NHL", answer:"OWEN NOLAN", era:"classic", stats:{G:"44",AST:"40",PTS:"84",YEAR:"1999"}, ctx:"1998-99 NHL Season — San Jose Sharks captain", clues:["Was born in Belfast Northern Ireland and played for the Sharks Quebec Nordiques and several other teams across 18 NHL seasons","Was the 1st overall pick in the 1990 NHL Draft by Quebec","From Belfast Northern Ireland — one of the few Irish-born NHLers","Was famous for pointing to where he would shoot in an All-Star Game then doing it"] },
  { player:"Reg Noble", sport:"🏒 NHL", answer:"REG NOBLE", era:"legends", stats:{G:"20",AST:"10",PTS:"30",YEAR:"1918"}, ctx:"1917-18 NHL Season — Toronto Arenas first champion", clues:["Played for six different NHL teams across a career that spanned the 1910s and 1920s","Played in the first NHL game ever","Was part of the original NHL when only 4 teams existed","Was a rough and tumble player known for fighting"] },
  { player:"King Clancy", sport:"🏒 NHL", answer:"KING CLANCY", era:"classic", stats:{G:"9",AST:"15",PTS:"24",YEAR:"1927"}, ctx:"Career — Ottawa Senators defenseman traded for a King", clues:["Was traded from Ottawa Senators to Toronto for $35000 and two players — a record at the time","Was one of the most beloved defensemen of his era","Won 3 Stanley Cups","Later became a beloved ambassador for the Toronto Maple Leafs"] },
  { player:"Jack Adams", sport:"🏒 NHL", answer:"JACK ADAMS", era:"classic", stats:{G:"83",AST:"37",PTS:"120",YEAR:"1922"}, ctx:"Career — Player who became hockey's greatest executive", clues:["Built the Detroit Red Wings dynasty as general manager while also being honoured with an NHL award named after him","Built the Detroit Red Wings dynasty as general manager","The Jack Adams Award for best coach is named after him","Was inducted into the Hockey Hall of Fame after their playing career"] },
  { player:"Joe Malone", sport:"🏒 NHL", answer:"JOE MALONE", era:"legends", stats:{G:"44",APP:"20",YEAR:"1918",AVG:"2.2"}, ctx:"1917-18 NHL Season — Quebec Bulldogs goals record", clues:["Scored 44 goals in 20 games — 2.2 per game — a record that still stands","Played in the very first NHL season","His goals-per-game record is considered unbreakable","Was called Phantom Joe for his ability to appear out of nowhere"] },
  { player:"George Boucher", sport:"🏒 NHL", answer:"GEORGE BOUCHER", era:"legends", stats:{G:"13",AST:"15",PTS:"28",YEAR:"1923"}, ctx:"Career — Ottawa Senators dynasty defenseman", clues:["Won 4 Stanley Cups with the Ottawa Senators","Was considered one of the best defensemen of the 1920s","Was part of the great Ottawa Senators dynasty","Was one of 4 brothers who all played professional hockey"] },
  { player:"Sprague Cleghorn", sport:"🏒 NHL", answer:"SPRAGUE CLEGHORN", era:"legends", stats:{G:"17",AST:"4",PTS:"21",YEAR:"1922"}, ctx:"Career — Most feared player of the 1920s", clues:["Was once suspended for the season for a vicious stick attack — yet somehow remained one of the most celebrated players of the 1920s","Won the Stanley Cup with the Montreal Canadiens","Was suspended multiple times for violent play","Was both a gifted scorer and a notorious enforcer"] },
  { player:"Frank Nighbor", sport:"🏒 NHL", answer:"FRANK NIGHBOR", era:"legends", stats:{G:"19",AST:"9",PTS:"28",YEAR:"1924"}, ctx:"Career — Ottawa Senators gentleman champion", clues:["Was a centre known as the Pembroke Peach and was one of the most skilled players of the early NHL era","Also won the first Lady Byng Trophy for sportsmanship","Won 5 Stanley Cups in his career","Nicknamed The Pembroke Peach"] },
  { player:"Roy Worters", sport:"🏒 NHL", answer:"ROY WORTERS", era:"legends", stats:{GAA:"1.61",SO:"13",YEAR:"1929",HT:"5'3\""}, ctx:"1928-29 NHL Season — Pittsburgh Pirates MVP", clues:["Was nicknamed Prince of Wales and was one of the smallest goaltenders in NHL history at 5 feet 6 inches","Was only 5ft 3in — one of the smallest players in NHL history","Played during the Pirates dynasty years alongside Roberto Clemente and Willie Stargell","Nicknamed Shrimp for his small stature"] },
  { player:"Kwame Brown", sport:"🏀 NBA", answer:"KWAME BROWN", era:"modern", stats:{PICK:"1",YEAR:"2001",TEAM:"Washington Wizards",SCHOOL:"Glynn Academy HS"}, ctx:"2001 NBA Draft — #1 Overall Pick — biggest bust ever?", clues:["Was the first high school player ever selected 1st overall in the NBA Draft","This performance took place during the 2001 NBA season","Was selected by Michael Jordan who was then team president","Is widely considered the biggest bust at #1 in NBA history"] },
  { player:"Michael Olowokandi", sport:"🏀 NBA", answer:"KANDI MAN", era:"classic", stats:{PICK:"1",YEAR:"1998",TEAM:"Los Angeles Clippers",SCHOOL:"Pacific"}, ctx:"1998 NBA Draft — #1 Overall Pick", clues:["Was considered a generational center prospect before the NBA Draft — yet averaged under 9 points per game in his career","Played at the University of Pacific — an obscure pick","Was considered a massive bust given his talent level","Was selected over Vince Carter Paul Pierce and Dirk Nowitzki"] },
  { player:"LaRue Martin", sport:"🏀 NBA", answer:"LARUE MARTIN", era:"classic", stats:{PICK:"1",YEAR:"1972",TEAM:"Trail Blazers",SCHOOL:"Loyola"}, ctx:"1972 NBA Draft — #1 Overall Pick over Bob McAdoo", clues:["Was selected #1 overall over Bob McAdoo Julius Erving and Paul Westphal","Is considered the worst #1 pick in NBA Draft history","The Blazers are the only major professional sports team in the state of Oregon","Only played 4 seasons and never averaged more than 5 points per game"] },
  { player:"Joe Barry Carroll", sport:"🏀 NBA", answer:"JOE BARRY CARROLL", era:"classic", stats:{PICK:"1",YEAR:"1980",TEAM:"Warriors",SCHOOL:"Purdue"}, ctx:"1980 NBA Draft — #1 Overall Pick traded for Robert Parish and McHale", clues:["Was traded on draft night for Robert Parish and Kevin McHale who helped win multiple titles","Was selected #1 overall by Golden State Warriors","Played at Purdue University","The trade is considered the worst in NBA history for Golden State"] },
  { player:"Ralph Sampson", sport:"🏀 NBA", answer:"RALPH SAMPSON", era:"classic", stats:{PICK:"1",YEAR:"1983",ROY:"Winner",TEAM:"Rockets"}, ctx:"Career Totals — Dominant college player whose NBA career was cut short by injuries", clues:["Was the first overall pick in the 1983 NBA Draft after winning three college Player of the Year awards","Teamed with Hakeem Olajuwon to form the Twin Towers in Houston","His NBA career was derailed by chronic knee injuries after just a few productive seasons","From Harrisonburg Virginia — won four straight ACC Player of the Year awards at Virginia"] },
  { player:"Ki-Jana Carter", sport:"🏈 NFL", answer:"KI JANA CARTER", era:"classic", stats:{PICK:"1",YEAR:"1995",TEAM:"Cincinnati Bengals",SCHOOL:"Penn State"}, ctx:"1995 NFL Draft — #1 Overall Pick career ended by injury", clues:["Tore his ACL in just his second NFL game and never fully recovered — one of the most heartbreaking injury stories in draft history","Tore his ACL in his first preseason game and was never the same","Played at Penn State where he was one of the best backs ever","Is considered one of the most tragic career trajectories for a top pick"] },
  { player:"Tim Couch", sport:"🏈 NFL", answer:"TIM COUCH", era:"classic", stats:{PICK:"1",YEAR:"1999",TEAM:"Cleveland Browns",SCHOOL:"Kentucky"}, ctx:"1999 NFL Draft — #1 Overall Pick first Cleveland Browns pick", clues:["Was the first player drafted by the new Cleveland Browns expansion team","Played at the University of Kentucky","Was considered a sure-thing prospect who never found consistent success","The Browns went 2-14 in his rookie season"] },
  { player:"Steve Emtman", sport:"🏈 NFL", answer:"STEVE EMTMAN", era:"classic", stats:{PICK:"1",YEAR:"1992",TEAM:"Indianapolis Colts",SCHOOL:"Washington"}, ctx:"1992 NFL Draft — #1 Overall Pick career ended by injuries", clues:["Was a dominant defensive tackle at Washington before injuries made him one of the most disappointing first overall picks ever","Won the Outland Trophy and Lombardi Award in college at Washington","Had his career essentially ended by knee injuries within 2 seasons","Is considered one of the biggest injury-related busts for a #1 pick"] },
  { player:"Ken Sims", sport:"🏈 NFL", answer:"KEN SIMS", era:"classic", stats:{PICK:"1",YEAR:"1982",TEAM:"New England Patriots",SCHOOL:"Texas"}, ctx:"1982 NFL Draft — #1 Overall Pick bust", clues:["Was considered a lock to anchor the Patriots defensive line for a decade — but injuries limited him to just 37 NFL games","Played defensive tackle at the University of Texas","Was considered a total bust having virtually no impact","The Patriots lost out on other great players with this pick"] },
  { player:"Brian Bosworth", sport:"🏈 NFL", answer:"THE BOZ", era:"classic", stats:{PICK:"1",YEAR:"1987",TEAM:"Seattle Seahawks",SCHOOL:"Oklahoma"}, ctx:"1987 NFL Supplemental Draft — The Boz phenomenon", clues:["Was selected in the supplemental draft by the Seattle Seahawks","Was the most hyped linebacker prospect in college football history","Nicknamed The Boz for his unusual haircut and brash personality","Was destroyed on a famous run by Bo Jackson which defined his NFL career"] },
  { player:"Aundray Bruce", sport:"🏈 NFL", answer:"AUNDRAY BRUCE", era:"classic", stats:{PICK:"1",YEAR:"1988",TEAM:"Atlanta Falcons",SCHOOL:"Auburn"}, ctx:"1988 NFL Draft — #1 Overall Pick linebacker", clues:["Was a linebacker from Auburn who became the first overall pick despite questions about his position at the next level","Played linebacker at Auburn University","Is considered one of the biggest busts at #1 in NFL history","The Falcons passed over multiple future Hall of Famers with this pick"] },
  { player:"Arnie Herber", sport:"🏈 NFL", answer:"ARNIE HERBER", era:"legends", stats:{YDS:"1239",TD:"14",INT:"8",YEAR:"1936"}, ctx:"1936 NFL Season — Green Bay Packers first great passer", clues:["Was the first player to throw more than 1000 yards passing in a single NFL season back in the 1930s","Won 4 NFL championships with the Green Bay Packers","From Green Bay Wisconsin","Was known for his unusually long fingers that helped him grip the ball"] },
  { player:"Pete Henry", sport:"🏈 NFL", answer:"FATS HENRY", era:"legends", stats:{KICK:"29",RUSH:"54",YEAR:"1923",POS:"OT/K"}, ctx:"Career — Canton Bulldogs dynasty tackle and kicker", clues:["Was nicknamed Fats and was considered the greatest tackle of the early NFL era — one of the first truly dominant linemen","Was considered the best lineman of his era","Nicknamed Fats Henry","Was also a punter who could kick over 90 yards"] },
  { player:"Cal Hubbard", sport:"🏈 NFL", answer:"CAL HUBBARD", era:"legends", stats:{POS:"OT/LB",YEAR:"1931",TEAMS:"2",BASEBALL:"1"}, ctx:"Career — Only Hall of Famer in both football and baseball", clues:["Is the only person inducted into both the Pro Football and Baseball Hall of Fames","Won 3 NFL championships in his career","Later became a famous and respected baseball umpire","Was 6ft 5in and 250 pounds — massive for his era"] },
  { player:"Mel Hein", sport:"🏈 NFL", answer:"MEL HEIN", era:"legends", stats:{POS:"C/LB",MVP:"1",YEAR:"1938",TEAM:"Giants"}, ctx:"1938 NFL MVP Season — New York Giants center", clues:["Won the NFL MVP award — one of the few linemen ever to do so","Played center and linebacker for the New York Giants","Was named All-Pro 8 consecutive times","Played 15 seasons without missing a single game"] },
  { player:"Tank Younger", sport:"🏈 NFL", answer:"TANK YOUNGER", era:"legends", stats:{RUSH:"696",REC:"45",TD:"7",YEAR:"1954"}, ctx:"Career — First HBCU player in NFL history", clues:["Was the first player from a historically Black college to play in the NFL","Scored 7 touchdowns during this season","Was from Grambling State University","Helped open the door for HBCU players in professional football"] },
  { player:"Bulldog Turner", sport:"🏈 NFL", answer:"BULLDOG TURNER", era:"legends", stats:{POS:"C/LB",INT:"8",YEAR:"1942",TEAM:"Bears"}, ctx:"Career — Chicago Bears two-way center champion", clues:["Was considered the best center of his era","Also played linebacker and led the NFL in interceptions","Won 4 NFL championships with the Chicago Bears","Nicknamed Bulldog for his tenacious style"] },
  { player:"Dan Fortmann", sport:"🏈 NFL", answer:"DAN FORTMANN", era:"legends", stats:{POS:"G",AGE:"19",YEAR:"1936",TITLES:"3"}, ctx:"Career — Youngest starter in NFL history becoming a doctor", clues:["Was a guard who started for the Chicago Bears at 19 years old while also attending medical school — graduating as a doctor","Was the prototype for the modern defensive tackle and played both ways — offense and defense — for most of his career","Was named All-Pro 6 consecutive times","Later became a physician and team doctor"] },
  { player:"Ed Sprinkle", sport:"🏈 NFL", answer:"ED SPRINKLE", era:"legends", stats:{POS:"DE",YEAR:"1950",TEAM:"Bears",NICKNAME:"The Claw"}, ctx:"Career — Chicago Bears most feared defensive end", clues:["Was called the meanest man in football by the Saturday Evening Post","Nicknamed The Claw for his pass rushing technique","Was inducted into the Pro Football Hall of Fame after his career","Was one of the first dominant pass rushing defensive ends in NFL history"] },
  { player:"Bill Hewitt", sport:"🏈 NFL", answer:"BILL HEWITT", era:"legends", stats:{REC:"31",TD:"8",YEAR:"1936",HELMET:"No"}, ctx:"Career — Last player to play without a helmet", clues:["Was the last player in NFL history to regularly play without a helmet","Won 2 NFL championships with the Bears and Eagles","Was inducted into the Hall of Fame in 1971","Was known as The Offside Kid for his quick jump at the snap"] },
  { player:"Turk Edwards", sport:"🏈 NFL", answer:"TURK EDWARDS", era:"legends", stats:{POS:"OT",YEAR:"1936",TEAM:"Redskins",ALLPRO:"4"}, ctx:"Career — Washington Redskins offensive tackle All-Pro", clues:["Was a tackle for the Boston Redskins and Washington Redskins known for his ability to neutralize any pass rusher of his era","Was inducted into the Pro Football Hall of Fame after his career","Had his career ended when his knee gave way during a coin toss","Was inducted into the Hall of Fame in 1969"] },
  { player:"Link Lyman", sport:"🏈 NFL", answer:"LINK LYMAN", era:"legends", stats:{POS:"DT",YEAR:"1925",TEAM:"Bears",TITLES:"3"}, ctx:"Career — Chicago Bears dynasty tackle pioneer", clues:["Was considered by George Halas to be the most complete tackle he ever coached during the Bears dynasty of the 1940s","Was one of the first players to use defensive line shifts and stunts","Was inducted into the Pro Football Hall of Fame after his career","Was inducted into the Hall of Fame in 1964"] },
  { player:"George Connor", sport:"🏈 NFL", answer:"GEORGE CONNOR", era:"legends", stats:{POS:"OT/LB",ALLPRO:"4",YEAR:"1951",TEAM:"Bears"}, ctx:"Career — Chicago Bears two-way Pro Bowl star", clues:["Was selected All-Pro on both offense and defense in different seasons","Played offensive tackle and linebacker for the Chicago Bears","Won the Outland Trophy at Notre Dame in 1947","Was inducted into the Hall of Fame in 1975"] },
  { player:"Jack Chesbro Happy Jack", sport:"⚾ MLB", answer:"HAPPY JACK CHESBRO", era:"legends", stats:{W:"41",ERA:"1.82",CG:"48",IP:"454"}, ctx:"1904 MLB Season — New York Highlanders most wins ever", clues:["Won 41 games — the most in the modern era of baseball","Posted an ERA of 1.82 — among the best of the season","Nicknamed Happy Jack for his cheerful disposition","Lost the pennant on a wild pitch on the final day of the season"] },
  // HARD Baseball Modern
  { player:"Hyun-Jin Ryu", sport:"⚾ MLB", answer:"HYUN-JIN RYU", era:"modern", stats:{ERA:"2.32",LEAD:"2019 NL",W:"14",NATION:"South Korea"}, ctx:"2019 MLB Season — Led NL in ERA without winning Cy Young", clues:["Led the National League in ERA in 2019 but finished second in Cy Young voting","Was the first Korean pitcher signed directly from the KBO to a major MLB club","The Dodgers moved from Brooklyn to Los Angeles in 1958 breaking New York hearts","From Incheon South Korea"] },
  { player:"Patrick Corbin", sport:"⚾ MLB", answer:"PATRICK CORBIN", era:"modern", stats:{SO:"238",W:"14",ERA:"3.25",WS:"2019"}, ctx:"2019 World Series — Key pitcher for the Nationals championship", clues:["Was the key bullpen weapon for the Washington Nationals 2019 World Series win","Appeared in three World Series games in relief including a save in Game 7","Signed a 6-year 140 million dollar contract before the season","From Binghamton New York"] },
  { player:"Noah Syndergaard", sport:"⚾ MLB", answer:"NOAH SYNDERGAARD", era:"modern", stats:{ERA:"3.24",SO:"9.9",NICK:"Thor",FB:"98mph"}, ctx:"Career Totals — The Mets ace nicknamed Thor", clues:["Was nicknamed Thor for his blond hair and 98mph fastball","Threw a fastball behind Mets nemesis Chase Utley in the 2015 NLCS causing a controversy","Was acquired from the Blue Jays in the R.A. Dickey trade","From Mansfield Texas"] },
  { player:"Carlos Martinez", sport:"⚾ MLB", answer:"CARLOS MARTINEZ", era:"modern", stats:{ERA:"3.17",SO:"8.2",W:"16",NATION:"Dominican"}, ctx:"2015-17 MLB Seasons — Cardinals ace from the Dominican Republic", clues:["Was one of the best starters in the National League for three consecutive seasons","Was known for throwing up to 100mph while also having outstanding control","Converted to a closer later in his career","From Monte Cristi Dominican Republic"] },
  { player:"Masahiro Tanaka", sport:"⚾ MLB", answer:"MASAHIRO TANAKA", era:"modern", stats:{ERA:"3.74",W:"78",SPLIT:"Elite",NATION:"Japan"}, ctx:"Career Totals — Japanese ace who starred for the Yankees", clues:["Had one of the best splitters in MLB history — nearly unhittable when located correctly","Was signed by the New York Yankees for 155 million dollars from Rakuten in Japan","Went 78-46 in the regular season with the Yankees","From Kakuda Miyagi Japan"] },
  // HARD Soccer Modern
  { player:"Alisson Becker", sport:"⚽ Soccer", answer:"ALISSON BECKER", era:"modern", stats:{UCL:"2019",PL:"2020",SAVE:"93%",NATION:"Brazil"}, ctx:"Was one of the most accomplished players of their generation", clues:["Scored a last-minute header against West Brom that kept Liverpool's top-four hopes alive","Left Liverpool for Bayern Munich and then Al-Nassr — following a path that surprised many who expected him to stay in the Premier League","Was named the best goalkeeper in the world on multiple occasions","From Novo Hamburgo Rio Grande do Sul Brazil"] },
  { player:"N'Golo Kante", sport:"⚽ Soccer", answer:"NGOLO KANTE", era:"modern", stats:{PL:"2",UCL:"2021",WC:"2018",TEAM:"Chelsea"}, ctx:"Career Totals — Won two Premier Leagues and a World Cup as the most tireless midfielder", clues:["Won two Premier League titles in consecutive years with different clubs — Leicester and Chelsea","Won the Champions League with Chelsea in 2021","Was one of the most accomplished players of their generation","From Paris France of Malian descent"] },
  { player:"Viktor Hovland", sport:"⛳ Golf", answer:"VIKTOR HOVLAND", era:"modern", stats:{FEDEX:"2023",MAJORS:"0",WINS:"6",NATION:"Norway"}, ctx:"Career Totals — First Norwegian to win the FedEx Cup", clues:["Grew up in Hovland Norway where golf courses are only open a few months a year due to the climate","Was the first Norwegian player to make a cut in a major championship","Won the Hero World Challenge and multiple European Tour events","From Oslo Norway — played college golf at Oklahoma State"] },
  { player:"Matt Fitzpatrick", sport:"⛳ Golf", answer:"MATT FITZPATRICK", era:"modern", stats:{US_OPEN:"2022",AMATEUR:"US 2013",WINS:"7",NATION:"England"}, ctx:"Career Totals — English golfer who made history at Brookline in 2022", clues:["Won the US Open in 2022 at The Country Club — the same course where he won the US Amateur in 2013","Was the first player to win both the US Amateur and US Open at the same venue","From Sheffield England — made his Masters debut at age 19","Has one of the most technically precise swings on tour"] },
  { player:"Cam Smith", sport:"⛳ Golf", answer:"CAM SMITH", era:"modern", stats:{OPEN:"2022",LIV:"Joined",WINS:"10",NATION:"Australia"}, ctx:"Career Totals — Won The Open Championship then joined LIV Golf", clues:["Won The Open Championship at St Andrews in 2022 with a stunning 64 in the final round","Joined the Saudi-backed LIV Golf league shortly after his Open win in a controversial move","Has the most famous mullet haircut in professional golf","From Brisbane Queensland Australia"] },
  { player:"Tony Finau", sport:"⛳ Golf", answer:"TONY FINAU", era:"modern", stats:{WINS:"7",RYDER:"Multiple",YEAR:"2022",NATION:"USA"}, ctx:"Career Totals — Finally broke through with multiple wins after years of near-misses", clues:["Won 3 PGA Tour events in 2022 after going years between his first and second wins","Is of Tongan and Samoan descent — one of the most diverse ethnic backgrounds on tour","Dislocated his ankle celebrating a hole-in-one at the Masters Par 3 contest in 2018","From Salt Lake City Utah"] },
  { player:"Shane Lowry", sport:"⛳ Golf", answer:"SHANE LOWRY", era:"modern", stats:{OPEN:"2019",WINS:"6",NATION:"Ireland",PORTRUSH:"Yes"}, ctx:"Career Totals — Won The Open Championship at home in Ireland", clues:["Grew up in Clara County Offaly Ireland and was an amateur champion before turning professional in 2009","Led by 4 shots entering the final round and held on in difficult conditions","Was the Amateur champion of Ireland before turning professional","From Portarlington County Offaly Ireland"] },
  { player:"Francesco Molinari", sport:"⛳ Golf", answer:"FRANCESCO MOLINARI", era:"modern", stats:{OPEN:"2018",RYDER:"Perfect",WINS:"8",NATION:"Italy"}, ctx:"Career Totals — Won The Open Championship and had a perfect Ryder Cup", clues:["Won The Open Championship at Carnoustie in 2018 for Italy's first major in decades","Went 5-0-0 at the 2018 Ryder Cup — the only European to go undefeated across all five matches","Is the older brother of Edoardo Molinari also a PGA Tour winner","From Turin Italy"] },
  { player:"Harris English", sport:"⛳ Golf", answer:"HARRIS ENGLISH", era:"modern", stats:{WINS:"5",TOUR_CHAMP:"2021",YEAR:"2021",NATION:"USA"}, ctx:"Career Totals — Won the Tour Championship and Olympic bronze", clues:["Was born in Valdosta Georgia and was a two-sport athlete in college before focusing exclusively on golf","Beat Kramer Hickok in a 8-hole playoff at the Travelers Championship — one of the longest in history","Is one of the longest hitters on tour","From Valdosta Georgia"] },
  { player:"Webb Simpson", sport:"⛳ Golf", answer:"WEBB SIMPSON", era:"modern", stats:{US_OPEN:"2012",POTY:"2018",WINS:"8",NATION:"USA"}, ctx:"Career Totals — Won US Open and Players Championship", clues:["Was a consistent presence in the top 30 in the world for nearly a decade without ever quite breaking through to elite status","Won the Players Championship in 2018 — considered by many the fifth major","Is known as one of the most devout Christian players on tour","From Raleigh North Carolina"] },
  { player:"Kevin Kisner", sport:"⛳ Golf", answer:"KEVIN KISNER", era:"modern", stats:{WINS:"5",MATCH:"WGC Match Play 2019",RYDER:"2021",NATION:"USA"}, ctx:"Career Totals — WGC Match Play champion and Ryder Cup stalwart", clues:["Was known as one of the best match play competitors on the PGA Tour despite rarely contending in stroke play majors","Was known as one of the best match play competitors of his generation","Is one of the shortest hitters on tour but compensates with exceptional short game","From Aiken South Carolina"] },
  { player:"Max Homa", sport:"⛳ Golf", answer:"MAX HOMA", era:"modern", stats:{WINS:"6",RYDER:"2023",TWITTER:"Roasts",NATION:"USA"}, ctx:"Career Totals — Six wins and beloved for his social media golf roasts", clues:["Won 6 PGA Tour events and became one of the most popular players due to his social media personality","Was named to the US Ryder Cup team in 2023","Is famous for his golf swing critique videos on Twitter that roast amateur golfers","From Valencia California"] },
  { player:"Tom Hoge", sport:"⛳ Golf", answer:"TOM HOGE", era:"modern", stats:{WINS:"1",AT_T:"2022",CAREER:"Up and down",NATION:"USA"}, ctx:"2022 AT&T Pebble Beach — Surprise winner in famous event", clues:["Won the AT&T Pebble Beach Pro-Am in 2022 for his first PGA Tour victory","Spent years on the Korn Ferry Tour before finally breaking through on the PGA Tour","Is from Fargo North Dakota — one of very few PGA Tour players from that state","Studied business at TCU before turning professional"] },
  { player:"Patrick Kane", sport:"🏒 NHL", answer:"PATRICK KANE", era:"modern", stats:{CUPS:"3",MVP:"Hart 2016",POINTS:"1000+",PICK:"1 overall 2007"}, ctx:"Career Totals — Three Cups and Hart Trophy for the Blackhawks", clues:["Was traded from the Chicago Blackhawks to the New York Rangers in 2023 in a blockbuster deal that shocked the hockey world","Was the 1st overall pick in the 2007 NHL Draft","Was the first American-born player to win the Hart Trophy in over 50 years","From Buffalo New York"] },
  { player:"Pekka Rinne", sport:"🏒 NHL", answer:"PEKKA RINNE", era:"modern", stats:{VEZINA:"1",WINS:"369",SHUTOUTS:"60",NATION:"Finland"}, ctx:"Career Totals — The face of the Nashville Predators for 15 years", clues:["Was a towering goaltender from Finland who played his entire career with the Nashville Predators","Was the face of the Nashville Predators franchise for 15 seasons","Had 369 career wins with the Predators — all with one franchise","From Kempele Finland"] },
  { player:"Tuukka Rask", sport:"🏒 NHL", answer:"TUUKKA RASK", era:"modern", stats:{VEZINA:"1",WINS:"306",CUP:"2011",NATION:"Finland"}, ctx:"Career Totals — Won the Cup and Vezina with the Boston Bruins", clues:["Won the Stanley Cup with the Boston Bruins in 2011 as the backup","Won the Vezina Trophy in 2014 as the NHL's best goaltender","Retired mid-career but came out of retirement to help Boston in the playoffs","From Savonlinna Finland"] },
  { player:"Ben Bishop", sport:"🏒 NHL", answer:"BEN BISHOP", era:"modern", stats:{VEZINA:"Finalist",WINS:"201",HEIGHT:"6ft7",NATION:"USA"}, ctx:"Career Totals — Tallest goalie in NHL history at 6ft 7in", clues:["At 6ft 7in was the tallest goaltender in NHL history","Was a Vezina Trophy finalist multiple times with Tampa Bay and Dallas","Led the Tampa Bay Lightning to the Stanley Cup Final in 2015","From Denver Colorado"] },
  { player:"John Gibson", sport:"🏒 NHL", answer:"JOHN GIBSON", era:"modern", stats:{VEZINA:"Finalist",SV_PCT:".918",WINS:"200+",NATION:"USA"}, ctx:"Career Totals — Anaheim's franchise goalie carrying a struggling team", clues:["Was often the best player on the Anaheim Ducks despite the team struggling around him","Had a career save percentage of .918 — among the best of his generation","Was a Vezina Trophy finalist multiple times despite rarely having team success","From Pittsburgh Pennsylvania"] },
  { player:"Jake Allen", sport:"🏒 NHL", answer:"JAKE ALLEN", era:"modern", stats:{WINS:"250+",BACKUP:"Cup winner",NATION:"Canada",TEAM:"Blues/Canadiens"}, ctx:"Career Totals — Backup who won the Cup then led Montreal to the Final", clues:["Won the Stanley Cup as the backup goalie with the St. Louis Blues in 2019","Led the Montreal Canadiens to the Stanley Cup Final in 2021 filling in for injured Carey Price","Played over a decade in the NHL largely as an underappreciated starter","From Fredericton New Brunswick Canada"] },
  { player:"Andrei Vasilevskiy", sport:"🏒 NHL", answer:"ANDREI VASILEVSKIY", era:"modern", stats:{CUPS:"2",CONN_SMYTHE:"2021",VEZINA:"1",NATION:"Russia"}, ctx:"Career Totals — Two Cups and Conn Smythe for Tampa Bay", clues:["Won 2 Stanley Cups with the Tampa Bay Lightning in consecutive years 2020 and 2021","Won the Conn Smythe Trophy as playoff MVP in 2021","Won the Vezina Trophy in 2019 as the NHL's best goaltender","From Tyumen Russia — son of former NHL goalie Andrei Vasilevskiy Sr"] },
  { player:"Ilya Bryzgalov", sport:"🏒 NHL", answer:"ILYA BRYZGALOV", era:"modern", stats:{WINS:"250+",CONTRACT:"9yr 51M",FAMOUS:"Universe quote",NATION:"Russia"}, ctx:"Career Totals — One of the most colorful personalities in NHL history", clues:["Signed a 9-year 51 million dollar contract with Philadelphia that became one of hockey's worst deals","Was the subject of a famous documentary where he talked about the universe being huuuge","Won a Stanley Cup with Anaheim in 2007 as the backup","From Togliatti Russia"] },
  { player:"Kiki Vandeweghe", sport:"🏀 NBA", answer:"KIKI VANDEWEGHE", era:"classic", stats:{PTS:"26.9",FG:"51.6%",ALLSTAR:"2x",TEAM:"Nuggets/Blazers"}, ctx:"Career Totals — Underrated pure scorer who put up elite numbers in the 80s", clues:["Averaged 26.9 points per game over his best years with Denver and Portland","Shot over 51 percent from the field while being a high-volume scorer — extremely rare","Made just two All-Star teams despite consistently scoring over 20 points per game","From Heemstede Netherlands — son of a former NBA player and nephew of Mel Counts"] },
  { player:"Max Zaslofsky", sport:"🏀 NBA", answer:"MAX ZASLOFSKY", era:"legends", stats:{PTS:"14.8",ALLSTAR:"4x",SCORING:"Led BAA 1948",TEAM:"Stags"}, ctx:"Career Totals — One of the original stars of professional basketball before the NBA existed", clues:["Won the BAA scoring title in 1948 in the league that preceded the NBA","Was one of the most recognizable players in the early years of professional basketball","Made four All-Star teams across his career in the BAA and NBA","From Brooklyn New York — starred at St. Johns before turning professional"] },

  // HARD Football Modern (need 11 more)
  { player:"Antoine Bethea", sport:"🏈 NFL", answer:"ANTOINE BETHEA", era:"modern", stats:{INT:"25",TACKLES:"1000+",PRO_BOWL:"4x",TEAM:"Colts"}, ctx:"Career Totals — Made four Pro Bowls across 14 seasons as one of the NFLs most durable safeties", clues:["Played 14 seasons in the NFL as one of the most consistent safeties of his generation","Made four Pro Bowls as a starter for the Indianapolis Colts defensive backfield","Finished with 25 career interceptions and over 1000 career tackles","From Seaford Delaware — played at Howard University before being drafted in the 6th round"] },
  { player:"Chuck Bednarik", sport:"🏈 NFL", answer:"CHUCK BEDNARIK", era:"legends", stats:{POS:"Last two-way player",RINGS:"2",ALLPRO:"8x",TEAM:"Eagles"}, ctx:"Career Totals — The last true two-way starter in NFL history", clues:["Was the last NFL player to regularly start on both offense and defense","Made eight First-Team All-Pro teams as both a center and linebacker","Won two NFL championships with the Philadelphia Eagles in 1948 and 1960","From Bethlehem Pennsylvania — was a WWII bomber pilot before playing at Penn and with the Eagles"] },

  // HARD Soccer Classic (need 7 more)

  { player:"Zico", sport:"⚽ Soccer", answer:"ZICO", era:"classic", stats:{G:"52",NATION:"Brazil",FREE_KICK:"Master",BALLON:"Runner up"}, ctx:"Career Totals — Called the White Pele and the creative force of 1970s and 80s Brazilian football", clues:["Was nicknamed The White Pele for his extraordinary skill and goal-scoring ability","Led Brazil's most entertaining World Cup teams in 1982 and 1986 — neither won the trophy","Scored 52 goals in 71 appearances for Brazil — a remarkable ratio","From Rio de Janeiro Brazil — later became a successful coach in Japan"] },
  { player:"Borje Salming", sport:"🏒 NHL", answer:"BORJE SALMING", era:"classic", stats:{GAMES:"1148",NATION:"Sweden",FIRST:"European pioneer",TOUGH:"Played through horrific slash"}, ctx:"Career Totals — Pioneer Swedish defenceman who proved Europeans could play in the NHL", clues:["Was the pioneer who proved that European players could survive and thrive in the physical NHL","Played 1,148 games for the Toronto Maple Leafs — mostly as a first-pairing defenseman","Continued to play after a skate blade slashed his face requiring 300 stitches","From Kiruna Sweden — opened the door for the wave of Scandinavian players that followed"] },
  { player:"Marcel Dionne", sport:"🏒 NHL", answer:"MARCEL DIONNE", era:"classic", stats:{GOALS:"731",ART_ROSS:"1",CUPS:"0",CENTERS:"Third all time"}, ctx:"Career Totals — Third most goals ever but never won a Stanley Cup", clues:["Despite his incredible numbers never won the Stanley Cup — playing most of his career for the Los Angeles Kings in the pre-Gretzky era","Was stuck on mediocre Los Angeles Kings teams for most of his career and never won the Stanley Cup","Won the Art Ross Trophy as the NHL scoring leader in 1980","From Drummondville Quebec — was traded from the Detroit Red Wings in a controversial deal"] },
  { player:"Stan Mikita", sport:"🏒 NHL", answer:"STAN MIKITA", era:"classic", stats:{CUPS:"2",HART:"2",ROSS:"4",TROPHY:"Lady Byng + Art Ross same year"}, ctx:"Career Totals — Blackhawks legend who reinvented himself mid-career", clues:["Won the Hart Trophy in consecutive years 1967 and 1968 after deliberately changing from a dirty player to a clean one","Won the Art Ross Trophy as leading scorer 4 times","Won 2 Stanley Cups with the Chicago Blackhawks","From Sokolce Slovakia — was adopted by Canadian relatives and moved to Canada as a child"] },
  { player:"Henri Richard", sport:"🏒 NHL", answer:"HENRI RICHARD", era:"classic", stats:{CUPS:"11",NICK:"Pocket Rocket",BROTHER:"Maurice Richard",CANADIENS:"Life"}, ctx:"Career Totals", clues:["Won 11 Stanley Cups — the most of any player in the history of the NHL","Nicknamed The Pocket Rocket as the smaller brother of Maurice The Rocket Richard","Played his entire career with the Montreal Canadiens","From Montreal Quebec — was often overshadowed by his famous brother but won more championships than anyone"] },
  { player:"Mike Bossy", sport:"🏒 NHL", answer:"MIKE BOSSY", era:"classic", stats:{GOALS:"573",STREAK:"9 seasons 50+ goals",CUPS:"4",RATIO:"0.76 per game"}, ctx:"Career Totals — Only player to score 50+ goals in each of his first 9 seasons", clues:["Scored 50 or more goals in each of his first 9 NHL seasons — an all-time record","Had the second-highest goals-per-game ratio in NHL history at 0.76","Won 4 Stanley Cups with the New York Islanders dynasty","From Montreal Quebec — was passed over in the draft until the 15th round due to concerns about his defensive play"] },
  { player:"Yvan Cournoyer", sport:"🏒 NHL", answer:"YVAN COURNOYER", era:"classic", stats:{CUPS:"10",CONN_SMYTHE:"1973",NICK:"Roadrunner",SPEED:"Fastest of era"}, ctx:"Career Totals — Won 10 Stanley Cups and was the fastest skater of his era", clues:["Won 10 Stanley Cups with the Montreal Canadiens — second most all-time","Won the Conn Smythe Trophy as playoff MVP in 1973","Nicknamed The Roadrunner for his extraordinary skating speed","Was one of the most accomplished players of their generation"] },

  { player:"Bill Durnan", sport:"🏒 NHL", answer:"BILL DURNAN", era:"legends", stats:{VEZINA:"6",GAA:"2.36",AMBIDEXTROUS:"Both hands",CUPS:"2"}, ctx:"Career Totals", clues:["Won the Vezina Trophy in 6 of his 7 NHL seasons — an astonishing ratio","Was completely ambidextrous and could catch the puck with either hand — unprecedented","Won 2 Stanley Cups with the Montreal Canadiens","From Toronto Ontario — retired at 34 citing the intense pressure of playing goal"] },

  { player:"Eddie Shore", sport:"🏒 NHL", answer:"EDDIE SHORE", era:"legends", stats:{HART:"4",CUPS:"2",DIRTY:"Controversial",LEGEND:"Boston icon"}, ctx:"Career Totals — Won four Hart Trophies as the most dominant defenseman of his era", clues:["Won 4 Hart Trophies — the most by a defenseman in NHL history","Was the most dominant player of his era but also one of the most controversial for his violent play","Once caused a serious injury to Ace Bailey that nearly ended another player's life","From Fort Qu'Appelle Saskatchewan — drove through a blizzard solo to not miss a game in one famous story"] },
  { player:"George Hainsworth", sport:"🏒 NHL", answer:"GEORGE HAINSWORTH", era:"legends", stats:{SHUTOUTS:"94",GAA:"1.91",VEZINA:"3",ERA:"1920s-30s"}, ctx:"Career Totals — 94 shutouts including 22 in a single season", clues:["Played for the Montreal Canadiens in the late 1920s when the team was establishing its dynasty","Posted 22 shutouts in a single season — still the all-time record","Won 3 Vezina Trophies with the Montreal Canadiens","From Gravenhurst Ontario — played in an era before the forward pass was allowed which boosted scoring"] },
  { player:"Frank Brimsek", sport:"🏒 NHL", answer:"FRANK BRIMSEK", era:"legends", stats:{NICK:"Mr Zero",SHUTOUTS:"40",CUPS:"2",ROY:"First Calder"}, ctx:"Career Totals — Mr Zero won Calder and Vezina in his first NHL season", clues:["Won both the Calder Trophy as Rookie of the Year and the Vezina Trophy in his first season — unprecedented","Nicknamed Mr Zero for his extraordinary shutout ability","Won 2 Stanley Cups with the Boston Bruins in 1939 and 1941","From Eveleth Minnesota — one of the very few American-born stars of his era"] },
  { player:"Randall Cunningham", sport:"🏈 NFL", answer:"RANDALL CUNNINGHAM", era:"classic", stats:{RUSH:"4928",PASS:"29979",NICK:"Ultimate Weapon",TEAM:"Eagles/Vikings"}, ctx:"Career Totals — The original dual-threat QB who changed what the position could be", clues:["Was nicknamed the Ultimate Weapon because he was dangerous both throwing and running","Rushed for nearly 5000 yards as a quarterback — remarkable for any era","Had a late career renaissance with the 1998 Vikings who scored a then-record 556 points","From Santa Barbara California — played at UNLV before being drafted by Philadelphia in 1985"] },

  // HARD Soccer Modern (need 2 more)

  // HARD Tennis Modern (need 10 more)
  { player:"Juan Martin del Potro", sport:"🎾 ATP", answer:"DEL POTRO", era:"modern", stats:{US_OPEN:"2009",BEAT:"Federer and Nadal",WRIST:"4 surgeries",NATION:"Argentina"}, ctx:"Career Totals — Beat both Federer and Nadal in a single Grand Slam to win", clues:["Was from Tandil Argentina and had his career repeatedly derailed by wrist injuries that required multiple surgeries","Had 4 serious wrist surgeries that robbed him of what could have been a legendary career","Was 6ft 6in with a forehand widely considered the hardest single shot in tennis","From Tandil Argentina — was beloved for his gracious sportsmanship"] },
  { player:"Devan Dubnyk", sport:"🏒 NHL", answer:"DEVAN DUBNYK", era:"modern", stats:{WINS:"263",COMEBACK:"Career saving",MINNESOTA:"Star",NATION:"Canada"}, ctx:"Career Totals — Revived his career in Minnesota after nearly washing out of the league", clues:["Had a remarkable career turnaround after being released by the Arizona Coyotes and traded mid-season to Minnesota","Went on a historic save percentage run that saved both his career and the Wild's season","Won 263 career games mostly with the Minnesota Wild","From Regina Saskatchewan — was one of the larger goaltenders in the league at 6ft 6in"] },

  { player:"Ryan Miller Hockey", sport:"🏒 NHL", answer:"RYAN MILLER", era:"modern", stats:{OLYMPIC:"Silver 2010",VEZINA:"Finalist",WINS:"391",NATION:"USA"}, ctx:"Career Totals — Led USA to Olympic silver and was the best American goalie of his era", clues:["Led the United States to the Olympic silver medal at the 2010 Vancouver Games","Was the best American-born goaltender of his generation","Won 391 career NHL games","From East Lansing Michigan — played college hockey at Michigan State"] },
  { player:"Hasheem Thabeet", sport:"🏀 NBA", answer:"HASHEEM THABEET", era:"modern", stats:{PICK:"2",YEAR:"2009",PTS:"2.6",TEAM:"Grizzlies"}, ctx:"Career Totals — Second overall pick who became one of the biggest draft busts ever", clues:["Was taken second overall in the 2009 NBA Draft ahead of players like James Harden and Steph Curry","Averaged just 2.6 points per game for his NBA career","Was considered the biggest draft bust of his era despite elite shot-blocking potential","From Dar es Salaam Tanzania — played college ball at UConn where he was considered dominant"] },

  // HARD Baseball Modern (need 5)
  { player:"Freddie Garcia", sport:"⚾ MLB", answer:"FREDDIE GARCIA", era:"modern", stats:{ERA:"3.97",W:"156",WS:"2005",TEAM:"Multiple"}, ctx:"Career Totals — Key starter on multiple playoff teams across his career", clues:["Was a key starter in multiple playoff runs with Seattle Chicago and New York","Won a World Series with the Chicago White Sox in 2005","Pitched for 14 seasons in the major leagues for multiple teams","From Caracas Venezuela — was originally signed as an amateur free agent"] },
  { player:"Livan Hernandez", sport:"⚾ MLB", answer:"LIVAN HERNANDEZ", era:"modern", stats:{WS_MVP:"1997",NLCS_MVP:"1997",W:"178",DEFECTED:"Cuba"}, ctx:"Career Totals — Defected from Cuba and won two MVP awards in the 1997 postseason", clues:["Defected from Cuba in 1995 before becoming a star in Major League Baseball","Won both the NLCS and World Series MVP in 1997 with the Florida Marlins","Won 178 career games over 17 big league seasons","From Villa Clara Cuba — his half-brother Orlando Hernandez also defected and played in the majors"] },
  { player:"Ekpe Udoh", sport:"🏀 NBA", answer:"EKPE UDOH", era:"modern", stats:{PICK:"6",YEAR:"2010",BLOCKS:"2.0",TEAM:"Warriors"}, ctx:"Career Totals — Lottery pick who never justified his draft slot in the NBA", clues:["Was taken 6th overall by Golden State in 2010 and immediately considered a reach","Led the NBA in block percentage in his rookie season","Was traded to Milwaukee in the deal that brought Monta Ellis to Golden State","From Houston Texas — played at Michigan and Baylor before being selected in the lottery"] },
  { player:"Nic Claxton", sport:"🏀 NBA", answer:"NIC CLAXTON", era:"modern", stats:{BLK:"2.5",FG_PCT:".726",TEAM:"Brooklyn",DPOY:"Candidate"}, ctx:"2022-23 NBA Season — Brooklyn Nets defensive anchor", clues:["Shot .726 from the field — one of the highest single-season marks ever recorded","Averaged 2.5 blocks per game and was a Defensive Player of Year candidate","Was the defensive anchor for the Brooklyn Nets","From Columbia South Carolina — played college ball at Georgia"] },

  // HARD Baseball Modern (need 5)
  { player:"Chris Archer", sport:"⚾ MLB", answer:"CHRIS ARCHER", era:"modern", stats:{K:"1216",ERA:"3.83",TEAM:"Tampa Bay",SLIDER:"Elite"}, ctx:"Career Totals — Tampa Bay ace with an elite slider", clues:["Struck out 1216 batters with one of the best sliders in baseball","Was the ace of the Tampa Bay Rays during their budget-constrained contention window","Was traded to Pittsburgh in one of Tampa Bay's many cost-cutting deals","From Clayton North Carolina — was drafted in the fifth round"] },
  { player:"Nathan Eovaldi", sport:"⚾ MLB", answer:"NATHAN EOVALDI", era:"modern", stats:{VELO:"100 mph",WS:"2018",ERA:"3.81",SURGERIES:"Two Tommy John"}, ctx:"Career Totals — Overcame two Tommy John surgeries to become a World Series hero", clues:["Overcame two Tommy John surgeries to become one of baseball's hardest throwers","Pitched heroically in the 2018 World Series for Boston — threw 97 pitches in relief","Consistently touched 100 mph — rare for a starter","From Alvin Texas — attended the same high school as Nolan Ryan"] },
  { player:"Joe Kelly", sport:"⚾ MLB", answer:"JOE KELLY", era:"modern", stats:{VELO:"98 mph",WS:"2013",FACE:"Famous grimace",RINGS:"2"}, ctx:"Career Totals — Fireballing reliever and World Series champion with the Red Sox", clues:["Was known league-wide for his expressive facial expressions on the mound","Won World Series rings with both the Boston Red Sox in 2013 and the Los Angeles Dodgers","Consistently threw 98 mph making him one of the harder-throwing relievers of his era","From Anaheim California — was a starter in college before converting to relief"] },
  { player:"Drew Smyly", sport:"⚾ MLB", answer:"DREW SMYLY", era:"modern", stats:{ERA:"3.42",CURVEBALL:"Sharp",INJURIES:"Multiple",TEAMS:"7"}, ctx:"Career Totals — Crafty lefty who played for seven teams", clues:["Played for seven different MLB teams across a career interrupted by multiple injuries","Was considered one of the better command lefties of his generation when healthy","Had a sharp curveball that was among the better breaking balls in the league","From Van Buren Arkansas — was drafted in the second round by Detroit"] },
  { player:"Taijuan Walker", sport:"⚾ MLB", answer:"TAIJUAN WALKER", era:"modern", stats:{ERA:"3.49",SPLITTER:"Best pitch",TEAMS:"Multiple",ALLSTAR:"2021"}, ctx:"Career Totals — Journeyman starter who made the All-Star team in 2021", clues:["Made his first All-Star team in 2021 with the New York Mets after years of journeyman travel","Had one of the best split-finger fastballs of any pitcher in baseball","Played for multiple teams including Seattle Arizona Toronto and New York","From Yucaipa California — was a top prospect before injuries slowed his development"] },

  // HARD Soccer Modern (need 8)
  { player:"Romelu Lukaku", sport:"⚽ Soccer", answer:"ROMELU LUKAKU", era:"modern", stats:{G:"68",EURO:"2020",TRANSFER:"115M",NATION:"Belgium"}, ctx:"Career Totals — Belgium's all-time top scorer", clues:["Is Belgium's all-time leading scorer with over 68 international goals","Was signed by Chelsea for a world-record fee for a Belgian player of 115 million pounds","Scored prolifically for Manchester United Inter Milan and Chelsea","From Antwerp Belgium — grew up in poverty and is known for his charitable work"] },
  { player:"Memphis Depay", sport:"⚽ Soccer", answer:"MEMPHIS DEPAY", era:"modern", stats:{G:"44",NATION:"Netherlands",TATTOOS:"Famous",CLUBS:"Lyon/Barca"}, ctx:"Career Totals — Netherlands' modern attacking star", clues:["Became Netherlands' all-time leading scorer with over 44 international goals","Was known as much for his elaborate tattoos and lifestyle as his football","Revived his career spectacularly at Lyon after flopping at Manchester United","From Moordrecht Netherlands — his father was Ghanaian"] },
  { player:"Sadio Mane", sport:"⚽ Soccer", answer:"SADIO MANE", era:"modern", stats:{UCL:"2019",AFCON:"2021",PL:"Elite",NATION:"Senegal"}, ctx:"Career Totals — African footballer of the year and Champions League winner", clues:["Won the Champions League with Liverpool in 2019","Won the Africa Cup of Nations with Senegal in 2021 and was named African Footballer of the Year","Was one of the most feared forwards in Europe during his time at Liverpool","From Bambali Senegal — one of the greatest players Africa has produced"] },
  { player:"Heung-min Son", sport:"⚽ Soccer", answer:"HEUNG-MIN SON", era:"modern", stats:{G:"17",GOLDEN_BOOT:"Shared 2022",NATION:"South Korea",CLUB:"Spurs"}, ctx:"Career Totals — South Korea's greatest ever player", clues:["Shared the Premier League Golden Boot in 2022 with Mohamed Salah","Is considered the greatest South Korean footballer in history","Has played his entire Premier League career with Tottenham Hotspur","From Chuncheon South Korea — his father is a former professional footballer"] },
  { player:"Bernardo Silva", sport:"⚽ Soccer", answer:"BERNARDO SILVA", era:"modern", stats:{PL_TITLES:"5",NATION:"Portugal",CLUB:"Man City",STYLE:"Technical"}, ctx:"Career Totals — One of the Premier League's most technical midfielders", clues:["Won 5 Premier League titles with Manchester City under Pep Guardiola","Is considered one of the most technically gifted midfielders in the Premier League era","Plays for Portugal alongside Cristiano Ronaldo and Bruno Fernandes","From Lisbon Portugal — came through the Benfica academy before moving to Monaco"] },
  { player:"Phil Foden", sport:"⚽ Soccer", answer:"PHIL FODEN", era:"modern", stats:{PL_TITLES:"5",NATION:"England",CLUB:"Man City",YOUTH:"Best ever"}, ctx:"Career Totals — Man City's local boy who won everything", clues:["Won 5 Premier League titles with Manchester City having come through their academy","Was described by Pep Guardiola as the most talented player he has ever seen","Was born less than a mile from the Etihad Stadium — a true local hero","From Stockport England — was named England's Young Player of the Year multiple times"] },
  { player:"Lautaro Martinez", sport:"⚽ Soccer", answer:"LAUTARO MARTINEZ", era:"modern", stats:{WC:"2022",SERIE_A:"2021",NATION:"Argentina",CLUB:"Inter Milan"}, ctx:"Career Totals — Won the World Cup alongside Messi", clues:["Is Inter Milan's all-time leading scorer and became the penalty specialist for Argentina's World Cup winning team","Won Serie A with Inter Milan in 2021 — their first title in 11 years","Is one of the most clinical strikers in European football","From Bahia Blanca Argentina — was discovered playing in local Buenos Aires football"] },
  { player:"Vinicius Junior", sport:"⚽ Soccer", answer:"VINICIUS JUNIOR", era:"modern", stats:{UCL:"2022",GOALS:"15",NATION:"Brazil",CLUB:"Real Madrid"}, ctx:"2021-22 Champions League — Scored the winner in the final", clues:["Was one of the most accomplished players of their generation","Was signed by Real Madrid for 45 million euros as a 16-year-old Brazilian prodigy","Became one of the most exciting attackers in world football","From São Gonçalo Brazil — faced racist abuse from opposition fans during his career"] },

  // HARD Tennis Modern (need 3)
  { player:"Hideki Matsuyama", sport:"⛳ Golf", answer:"HIDEKI MATSUYAMA", era:"modern", stats:{MASTERS:"2021",NATION:"Japan",FIRST:"Asian man",WINS:"8"}, ctx:"2021 Masters — Augusta National hosts a historic champion", clues:["Won the 2021 Masters — the first Japanese man to win a major championship","Won 8 PGA Tour events making him one of the most successful Asian players ever","Was a decorated amateur before turning professional in Japan","From Matsuyama Japan — his caddie bowed to Augusta National after his victory in a famous moment"] },

  // MEDIUM Hockey Modern (need 1)
  { player:"Anze Kopitar", sport:"🏒 NHL", answer:"ANZE KOPITAR", era:"modern", stats:{CUPS:"2",SELKE:"2x",TEAM:"LA Kings",NATION:"Slovenia"}, ctx:"Career Totals — Two Cups and two Selke Trophies for LA", clues:["Won 2 Stanley Cups with the Los Angeles Kings in 2012 and 2014","Won 2 Selke Trophies as the NHL's best defensive forward","Is the greatest Slovenian player in NHL history","From Hrušica Slovenia — the Kings drafted him 11th overall in 2005"] },  { player:"Marco Scutaro", sport:"⚾ MLB", answer:"MARCO SCUTARO", era:"modern", stats:{NLCS:"MVP 2012",HITS:"14 in NLCS",WS:"2012",TEAM:"Giants"}, ctx:"2012 NLCS — Journeyman infielder became an unlikely postseason legend", clues:["Won the 2012 NLCS MVP with 14 hits in the series for San Francisco","Won the World Series with the San Francisco Giants in 2012","Was a journeyman infielder who played for 6 different MLB teams before finding postseason glory","From Caracas Venezuela — was already 36 years old during his famous postseason run"] },
  { player:"Freddie Sanchez", sport:"⚾ MLB", answer:"FREDDIE SANCHEZ", era:"modern", stats:{BA_TITLE:"2006",AVG:".344",TEAM:"Pirates/Giants",WS:"2010"}, ctx:"2006 NL Batting Title — Surprise champion for Pittsburgh Pirates", clues:["Was one of the best contact hitters of the mid-2000s who spent most of his career on losing teams","Was a surprise batting champion as a player on a losing team","Won a World Series with the San Francisco Giants in 2010","From Hollywood California — was traded multiple times before finding success"] },
  { player:"Travis Hafner", sport:"⚾ MLB", answer:"TRAVIS HAFNER", era:"modern", stats:{OPS:"1.097",SLAMS:"6 in season",TEAM:"Cleveland",NICK:"Pronk"}, ctx:"2006 MLB Season — Had one of the greatest offensive seasons for Cleveland", clues:["Was nicknamed Pronk and was one of the most feared designated hitters in the American League during the mid-2000s","Set an American League record with 6 grand slams in a single season","Nicknamed Pronk because he had qualities of both a project and a hunk","This season took place during the 2006 MLB campaign"] },
  { player:"Kevin Youkilis", sport:"⚾ MLB", answer:"KEVIN YOUKILIS", era:"modern", stats:{OBP:".382",RINGS:"2",GOLD:"1",NICK:"Greek God of Walks"}, ctx:"Career Totals — Won two rings and was nicknamed the Greek God of Walks", clues:["Was nicknamed The Greek God of Walks by Michael Lewis in Moneyball","Won 2 World Series rings with the Boston Red Sox","Had a career on-base percentage of .382 — among the best of his era","From Cincinnati Ohio — was a key part of the Red Sox dynasty"] },
  { player:"Shin-Soo Choo", sport:"⚾ MLB", answer:"SHIN-SOO CHOO", era:"modern", stats:{OBP:".377",LEADOFF:"Expert",NATION:"South Korea",WALKS:"1300+"}, ctx:"Career Totals — South Korean leadoff specialist with an elite on-base percentage", clues:["Had a career on-base percentage of .377 — among the best leadoff hitters of his era","Was one of the first great South Korean position players in MLB history","Drew over 1300 career walks","From Busan South Korea — broke ground for Korean positional players in the major leagues"] },
  { player:"Brandon Webb", sport:"⚾ MLB", answer:"BRANDON WEBB", era:"modern", stats:{CY:"2006",ERA:"3.27",SINKER:"Best ever",INJURY:"Ended career"}, ctx:"Career Totals — Won the Cy Young with the best sinker in baseball before injury", clues:["Won the NL Cy Young Award in 2006 with the Arizona Diamondbacks","Was considered to have the best sinker of his generation","Had his career ended prematurely by a shoulder injury at age 29","From Ashland Kentucky"] },
  { player:"Dave Stieb", sport:"⚾ MLB", answer:"DAVE STIEB", era:"classic", stats:{ERA:"3.44",NO_HIT:"5 near-misses",W:"176",TEAM:"Blue Jays"}, ctx:"Career Totals — Had 5 near no-hitters before finally throwing one", clues:["Had 5 near-misses before finally throwing his no-hitter in 1990","Won 176 games for the Toronto Blue Jays — their franchise record at the time","Was the ace of Canada's first great baseball team","From Santa Ana California"] },
  { player:"Edd Roush", sport:"⚾ MLB", answer:"EDD ROUSH", era:"legends", stats:{AVG:".323",BATTING:"2 titles",TEAM:"Reds",ERA:"1910s-20s"}, ctx:"Career Totals — Two batting titles for the Cincinnati Reds", clues:["Was considered one of the best outfielders of the deadball era — a consistent .320 hitter across 18 seasons","Batted .323 for his career — one of the best contact hitters of his era","Was one of the best defensive center fielders of the early 20th century","From Oakland City Indiana — held out for higher salary multiple times"] },
  { player:"Sam Rice", sport:"⚾ MLB", answer:"SAM RICE", era:"legends", stats:{HITS:"2987",AVG:".322",HITS:"2987 career hits",TEAM:"Senators"}, ctx:"Career Totals — Washington Senators outfielder of the 1920s and 30s", clues:["Played 20 seasons for the Washington Senators and was known as one of the best right fielders of his era","Batted .322 career average for the Washington Senators","Was involved in a famous controversy over a catch in the 1925 World Series","Left a sealed letter about the controversial catch to be opened after his death"] },

// Hard Basketball Classic additions (need 6 more)
  { player:"Norm Van Lier", sport:"🏀 NBA", answer:"NORM VAN LIER", era:"classic", stats:{AST:"6.9",STL:"2.1",ALLSTAR:"3x",TEAM:"Bulls"}, ctx:"Career Totals — Tenacious defender and engine of the Chicago Bulls in the 1970s", clues:["Was the heart of the Chicago Bulls defensive teams of the 1970s alongside Jerry Sloan","Made three All-Star teams as a defensive specialist and playmaker","Led the NBA in assists per game in 1971-72 with the Cincinnati Royals","From East Liverpool Ohio — played at St. Francis before being drafted in 1969"] },
  { player:"Bob Dandridge", sport:"🏀 NBA", answer:"BOB DANDRIDGE", era:"classic", stats:{RINGS:"2",ALLSTAR:"4x",PTS:"18.5",TEAM:"Bucks/Bullets"}, ctx:"Career Totals — Won rings with two different franchises as an underrated two-way forward", clues:["Won NBA championships with both the Milwaukee Bucks in 1971 and the Washington Bullets in 1978","Made four All-Star teams as a reliable scorer and defender","Played alongside both Kareem Abdul-Jabbar and Elvin Hayes during his championship runs","From Richmond Virginia — played at Norfolk State before being drafted by Milwaukee"] },
  { player:"Truck Robinson", sport:"🏀 NBA", answer:"TRUCK ROBINSON", era:"classic", stats:{REB:"15.7",PTS:"22.7",ALLSTAR:"2x",TEAM:"Suns/Knicks"}, ctx:"1977-78 Season — Led the NBA in rebounding with 15.7 per game", clues:["Was traded from Phoenix to New York in a deal that shocked the NBA — and immediately rewarded the Knicks with the rebounding title","Averaged 22.7 points per game in the same season — elite two-way production","Made two All-Star teams during his career with New Orleans and Phoenix","From Jacksonville Florida — played at Tennessee State before being drafted in 1974"] },
  { player:"Mychal Thompson", sport:"🏀 NBA", answer:"MYCHAL THOMPSON", era:"classic", stats:{PICK:"1",YEAR:"1978",RINGS:"2",TEAM:"Blazers/Lakers"}, ctx:"Career Totals — First overall pick who became a quiet but important piece of Showtime", clues:["Was the first overall pick in the 1978 NBA Draft by the Portland Trail Blazers","Won two NBA championships as a reserve with the Showtime Los Angeles Lakers","Is the father of Golden State Warriors star Klay Thompson","From Nassau Bahamas — played at Minnesota before becoming the top pick"] },
  { player:"Terry Cummings", sport:"🏀 NBA", answer:"TERRY CUMMINGS", era:"classic", stats:{PTS:"22.0",ROY:"1983",ALLSTAR:"2x",TEAM:"Clippers/Bucks"}, ctx:"Career Totals — Won Rookie of the Year before injuries derailed a promising career", clues:["Won the NBA Rookie of the Year award in 1983 with the San Diego Clippers","Made two All-Star teams as a powerful scoring forward in the mid-1980s","Was considered one of the best young power forwards in basketball early in his career","From Chicago Illinois — played at DePaul before being drafted 2nd overall in 1982"] },
  { player:"Mike Mitchell", sport:"🏀 NBA", answer:"MIKE MITCHELL", era:"classic", stats:{PTS:"20.8",CAREER:"12 seasons",ALLSTAR:"1x",TEAM:"Cavaliers/Spurs"}, ctx:"Career Totals — Quietly put up 20 points a night for over a decade without recognition", clues:["Averaged over 20 points per game for his career across 12 NBA seasons","Was one of the more underappreciated scorers of the 1980s","Spent his best years with the San Antonio Spurs as a reliable second option","From Atlanta Georgia — played at Auburn before being drafted by Cleveland in 1978"] },
  // Hard Basketball Legends additions (need 12 more)
  { player:"Ken Sears", sport:"🏀 NBA", answer:"KEN SEARS", era:"legends", stats:{PTS:"16.4",FG:"49%",ALLSTAR:"5x",TEAM:"Knicks"}, ctx:"Career Totals — One of the most efficient scorers of the late 1950s", clues:["Made five All-Star teams as the New York Knicks primary big man in the late 1950s","Shot nearly 49 percent from the field before efficient shooting was tracked closely","Was considered one of the most fundamentally sound centers of his era","From Watsonville California — played at Santa Clara before joining the Knicks in 1955"] },
  { player:"Arnie Risen", sport:"🏀 NBA", answer:"ARNIE RISEN", era:"legends", stats:{RINGS:"1",ALLSTAR:"4x",PTS:"12.7",TEAM:"Royals/Celtics"}, ctx:"Career Totals — Won a championship with the Celtics dynasty late in his career", clues:["Made four All-Star teams during his career with the Rochester Royals","Won an NBA championship late in his career as a backup with the Boston Celtics","Was one of the first truly mobile big men in professional basketball history","From Williamstown Kentucky — played at Ohio State before joining the NBL and later NBA"] },
  { player:"Jack Twyman", sport:"🏀 NBA", answer:"JACK TWYMAN", era:"legends", stats:{PTS:"19.2",ALLSTAR:"6x",TEAM:"Royals",GUARDIAN:"Maurice Stokes"}, ctx:"Career Totals — Star player who became legal guardian of stricken teammate Maurice Stokes", clues:["Became the legal guardian of teammate Maurice Stokes after he was paralyzed by a brain injury","Made six All-Star teams as a prolific scorer with the Cincinnati Royals","Averaged over 19 points per game for his career as one of the top forwards of his era","From Pittsburgh Pennsylvania — played at Cincinnati before being drafted by the Royals"] },
  { player:"Wayne Embry", sport:"🏀 NBA", answer:"WAYNE EMBRY", era:"legends", stats:{REB:"9.9",RINGS:"1",ALLSTAR:"5x",TEAM:"Royals/Celtics"}, ctx:"Career Totals — Played 11 NBA seasons before becoming the first Black GM in pro sports", clues:["Made five All-Star teams as a physical interior presence with Cincinnati","Won an NBA championship with the Boston Celtics in 1968","Later became the first African American general manager in major professional sports history","From Springfield Ohio — played at Miami of Ohio before being drafted by Cincinnati"] },
  { player:"Connie Dierking", sport:"🏀 NBA", answer:"CONNIE DIERKING", era:"legends", stats:{PTS:"12.2",REB:"8.1",CAREER:"10 seasons",TEAM:"Royals/76ers"}, ctx:"Career Totals — Solid journeyman big man of the early NBA era", clues:["Played 10 seasons in the NBA as a reliable backup center and power forward","Spent time with Cincinnati Royals Philadelphia 76ers and other teams across his career","Was known as a tough physical presence in the paint in the early NBA","From Cincinnati Ohio — played at Cincinnati before being drafted in the 1950s"] },
  { player:"Woody Sauldsberry", sport:"🏀 NBA", answer:"WOODY SAULDSBERRY", era:"legends", stats:{ROY:"1958",PTS:"12.8",ALLSTAR:"1x",TEAM:"Warriors"}, ctx:"1957-58 Season — Won Rookie of the Year but faded quickly after a promising start", clues:["Won the NBA Rookie of the Year award in 1958 with the Philadelphia Warriors","Made one All-Star team early in his career but never reached his full potential","Was considered a promising big man early in his career but faded after his first few seasons","From Winona Texas — played at Texas Southern before joining the Warriors"] },
  { player:"Gene Shue", sport:"🏀 NBA", answer:"GENE SHUE", era:"legends", stats:{PTS:"14.4",ALLSTAR:"5x",COACH:"Also coached",TEAM:"Pistons"}, ctx:"Career Totals — Five-time All-Star who became one of the NBAs most prominent coaches", clues:["Made five consecutive All-Star teams from 1958 to 1962 as one of the better guards of his era","Later became a respected NBA head coach with multiple franchises after his playing career","Was known as a smooth offensive guard during his playing days with Detroit","From Baltimore Maryland — played at Maryland before being drafted by the Knicks in 1954"] },
  { player:"Tom Gola", sport:"🏀 NBA", answer:"TOM GOLA", era:"legends", stats:{RINGS:"1",ALLSTAR:"5x",PTS:"11.3",TEAM:"Warriors/Knicks"}, ctx:"Career Totals — Won championships in both college and the NBA as a complete two-way player", clues:["Won an NCAA championship at La Salle and later an NBA title with the Warriors","Made five All-Star teams as a versatile guard-forward who excelled on defense","Was considered one of the first true combo players in professional basketball","From Philadelphia Pennsylvania — was an All-American at La Salle before being drafted locally"] },


  // Hard Football Modern additions (need 14 more)
  { player:"Erik Kramer", sport:"🏈 NFL", answer:"ERIK KRAMER", era:"classic", stats:{YDS:"4,355",TD:"29",YEAR:"1995",TEAM:"Bears/Lions"}, ctx:"1995 Season — Set Bears passing records in one of the most unexpected big years by a QB", clues:["Threw for 4355 yards and 29 touchdowns with the Chicago Bears in 1995 — franchise records at the time","Was never considered a top quarterback but had one elite season that came out of nowhere","Later dealt with serious personal tragedies after his NFL career ended","From Encino California — played at North Carolina State before going undrafted"] },
  { player:"Hugh Millen", sport:"🏈 NFL", answer:"HUGH MILLEN", era:"classic", stats:{RTG:"74.0",TEAM:"Patriots/Falcons",ROLE:"Journeyman starter",YDS:"3073"}, ctx:"Career Totals — Journeyman QB who started for both the Falcons and Patriots in the early 1990s", clues:["Was a backup quarterback who bounced between several teams and was best known for his calm demeanor in difficult circumstances","Was considered a competent but unspectacular starter who could hold a team together","Never developed into a franchise quarterback despite multiple opportunities","From Des Moines Iowa — played at Washington before being drafted by Los Angeles Rams in 1986"] },
  { player:"Stan Humphries", sport:"🏈 NFL", answer:"STAN HUMPHRIES", era:"classic", stats:{SB:"Loss XXIX",YDS:"12585",TEAM:"Chargers",RTG:"78.4"}, ctx:"1994 Season — Led San Diego to the Super Bowl in a surprising run", clues:["Led the San Diego Chargers to Super Bowl XXIX in the 1994 season in a major upset of the Pittsburgh Steelers","Lost the Super Bowl to the San Francisco 49ers and Steve Young in a blowout","Had his career shortened by a series of concussions and head injuries","From Shreveport Louisiana — played at Northeast Louisiana before being drafted by Washington in 1988"] },
  { player:"Scott Mitchell", sport:"🏈 NFL", answer:"SCOTT MITCHELL", era:"classic", stats:{YDS:"12607",TD:"76",TEAM:"Lions",RTG:"77.4"}, ctx:"Career Totals — Flashed potential early before fading with the Detroit Lions", clues:["Had one strong season with the Detroit Lions throwing for 4338 yards and 32 touchdowns in 1995","Was known as much for his struggles as his successes with Detroit","Was brought in as the Lions long-term franchise quarterback but never fulfilled that promise","From St. George Utah — played at Utah before being drafted by the Miami Dolphins in 1990"] },
  // Hard Football Legends additions (need 2 more)
  { player:"Y.A. Tittle", sport:"🏈 NFL", answer:"YA TITTLE", era:"legends", stats:{TD:"212",ALLPRO:"4x",MVP:"2x",TEAM:"Giants/49ers"}, ctx:"Career Totals — One of the premier quarterbacks of the late 1950s and early 1960s", clues:["Won two NFL MVP awards as the New York Giants quarterback in the early 1960s","Famously photographed kneeling in the end zone bloodied and helmetless in 1964 — one of most iconic sports images","Led the Giants to three consecutive NFL Championship Games from 1961 to 1963","From Marshall Texas — played at LSU before being drafted by the Cleveland Browns in 1948"] },
  { player:"Tobin Rote", sport:"🏈 NFL", answer:"TOBIN ROTE", era:"legends", stats:{RUSH:"3128",TD:"148",CFL:"Also played",TEAM:"Packers/Lions"}, ctx:"Career Totals — Led Detroit to an NFL title and later played in the CFL", clues:["Led the Detroit Lions to the 1957 NFL Championship after filling in for the injured Bobby Layne","Was one of the most effective running quarterbacks of his era with over 3000 career rushing yards","Also played in the CFL and AFL during the league wars of the 1960s","From San Antonio Texas — played at Rice before being drafted by Green Bay in 1950"] },
{ player:"George Yardley", sport:"🏀 NBA", answer:"GEORGE YARDLEY", era:"legends", stats:{PTS:"27.8",FIRST:"First 2000-pt scorer",ALLSTAR:"6x",TEAM:"Pistons"}, ctx:"1957-58 Season — First player in NBA history to score 2000 points in a season", clues:["Played for the Fort Wayne Pistons and later Detroit — predating the era of nationally televised games that would have made him famous","Made six All-Star teams and was considered the best scorer of his era","Was nicknamed Bird for his thin frame and long wingspan","From Hollywood California — played at Stanford before being drafted by Fort Wayne in 1950"] },
  { player:"Slater Martin", sport:"🏀 NBA", answer:"SLATER MARTIN", era:"legends", stats:{RINGS:"5",ALLSTAR:"7x",HEIGHT:"5-10",TEAM:"Lakers/Hawks"}, ctx:"Career Totals — Won five championships across two dynasties as an elite defensive guard", clues:["Won five NBA championships — four with the Minneapolis Lakers and one with the St. Louis Hawks","Made seven All-Star teams despite standing just 5-foot-10","Was the defensive stopper and floor general for some of the greatest teams of the 1950s","From Houston Texas — played at Texas before being drafted by Minneapolis in 1949"] },
  { player:"Larry Costello", sport:"🏀 NBA", answer:"LARRY COSTELLO", era:"legends", stats:{ALLSTAR:"6x",RINGS:"0",RINGS:"Won title as player and coach",TEAM:"Nationals/76ers"}, ctx:"Career Totals — Won a title as a player then won another as a coach with the Bucks", clues:["Made six All-Star teams as one of the premier guards of the late 1950s and early 1960s","Later coached the Milwaukee Bucks to their only NBA championship in 1971 with Kareem","Was known as a tough defensive-minded player who sacrificed stats for the team","From Minoa New York — played at Niagara before being drafted by Philadelphia"] },
  { player:"Andy Phillip", sport:"🏀 NBA", answer:"ANDY PHILLIP", era:"legends", stats:{ALLSTAR:"5x",AST:"6.3",TEAM:"Stags/Celtics",RINGS:"1"}, ctx:"Career Totals — Led the league in assists and was one of the early NBAs best playmakers", clues:["Led the BAA and NBA in assists multiple times as one of the premier passers of the early era","Made five All-Star teams across his career with multiple franchises","Won an NBA championship late in his career with the Boston Celtics in 1956","From Granite City Illinois — was an All-American at Illinois before turning professional"] },
{ player:"Fat Lever", sport:"🏀 NBA", answer:"FAT LEVER", era:"classic", stats:{AST:"7.5",REB:"7.5",ALLSTAR:"2x",TEAM:"Nuggets"}, ctx:"Career Totals — One of the first point-forwards and a triple-double machine in Denver", clues:["Was one of the few guards in NBA history to average 7+ assists AND 7+ rebounds per game","Had his career ended prematurely by a serious knee injury in 1990","Made two All-Star teams with the Denver Nuggets in the mid-1980s","Born Lafayette Lever in Pine Bluff Arkansas — nickname Fat came from childhood"] },
  { player:"Harry Gallatin", sport:"🏀 NBA", answer:"HARRY GALLATIN", era:"legends", stats:{REB:"13.1",ALLSTAR:"7x",IRON:"Never missed a game",TEAM:"Knicks/Hawks"}, ctx:"Career Totals — Never missed a game in his entire NBA career — 746 consecutive games", clues:["Was known as the Ironman of the early NBA for never missing a regular season game over his career","Made seven All-Star teams as a reliable rebounder and scorer with New York","Was the primary interior presence for the Knicks in the early 1950s","From Roxana Illinois — played at Missouri State before being drafted by the Knicks in 1948"] },
  { player:"Vern Mikkelsen", sport:"🏀 NBA", answer:"VERN MIKKELSEN", era:"legends", stats:{RINGS:"4",ALLSTAR:"6x",FOULS:"First to foul out of 6 games in season",TEAM:"Lakers"}, ctx:"Career Totals — Won four NBA championships as part of the Minneapolis Lakers dynasty", clues:["Was one of the first true power forwards in NBA history — using his strength and positioning rather than athleticism","Made six All-Star teams as one of the toughest interior players of his era","Was the first player in NBA history to foul out of six games in a single season","From Askov Minnesota — played at Hamline before being drafted by Minneapolis in 1949"] },
  
  { player:"Sweetwater Clifton", sport:"🏀 NBA", answer:"SWEETWATER CLIFTON", era:"legends", stats:{PIONEER:"One of first Black NBA players",TEAM:"Knicks/Pistons",PTS:"10.0",ALLSTAR:"1x"}, ctx:"Career Totals — Harlem Globetrotter who became one of the first Black players in the NBA", clues:["Was one of the first three African American players to play in the NBA in 1950","Played for the Harlem Globetrotters before signing with the New York Knicks","Was known for his enormous hands that allowed him to palm and control the ball effortlessly","From Little Rock Arkansas — played at Xavier University before joining the Globetrotters"] },
{ player:"Clyde Lovellette", sport:"🏀 NBA", answer:"CLYDE LOVELLETTE", era:"legends", stats:{RINGS:"3",ALLSTAR:"3x",PTS:"17.0",TEAM:"Lakers/Celtics"}, ctx:"Career Totals — Rare player who won rings with both the Lakers and Celtics dynasties", clues:["Is one of only a handful of players to win NBA championships with both the Minneapolis Lakers and Boston Celtics","Made three All-Star teams as a reliable scoring big man in the 1950s","Won an NCAA title at Kansas before also winning Olympic gold and then NBA titles","From Terre Haute Indiana — played at Kansas under Phog Allen before being drafted by Minneapolis"] },
  { player:"Larry Foust", sport:"🏀 NBA", answer:"LARRY FOUST", era:"legends", stats:{ALLSTAR:"8x",PTS:"13.7",REB:"9.8",TEAM:"Pistons/Hawks"}, ctx:"Career Totals — Eight-time All-Star and one of the premier big men of the early 1950s", clues:["Made eight All-Star teams as one of the premier centers of the early NBA era","Spent his best years with the Fort Wayne Pistons before the franchise relocated to Detroit","Was considered one of the more physical and skilled big men of his generation","From Painesville Ohio — played at La Salle before being drafted by Fort Wayne in 1950"] },
  { player:"Busher Jackson", sport:"🏒 NHL", answer:"BUSHER JACKSON", era:"legends", stats:{SCORING:"Led NHL 1932",ALLSTAR:"4x",TEAM:"Maple Leafs",LINE:"Kid Line"}, ctx:"Career Totals — Star winger on the famous Kid Line for the Toronto Maple Leafs", clues:["Was the star left winger on the famous Kid Line alongside Charlie Conacher and Joe Primeau","Led the NHL in scoring in the 1931-32 season","Made four First Team All-Star selections during his career","From Toronto Ontario — spent his peak years with the Maple Leafs in the 1930s"] },
  { player:"Georges Vezina", sport:"🏒 NHL", answer:"GEORGES VEZINA", era:"legends", stats:{TROPHY:"Named after him",CUPS:"2",TEAM:"Canadiens",ERA:"1910s-20s"}, ctx:"Career Totals — The Chicoutimi Cucumber — the NHL goaltending trophy bears his name", clues:["Played for the Montreal Canadiens from 1910 to 1925 — never allowing more than 3.9 goals per game in any season","Was nicknamed the Chicoutimi Cucumber for his cool demeanor under pressure","Never missed a game in his entire NHL career until his final season","From Chicoutimi Quebec — played his entire career with the Montreal Canadiens"] },

  { player:"Dino Zoff", sport:"⚽ Soccer", answer:"DINO ZOFF", era:"classic", stats:{CAPS:"112",WC:"1982",CLUB:"Juventus",AGE:"40 in WC final"}, ctx:"1982 FIFA World Cup — Italy goalkeeper who won the title at age 40", clues:["Went 1142 consecutive minutes without conceding an international goal — a world record that still stands","Kept a clean sheet for 1142 consecutive international minutes — a world record","Made 112 appearances for Italy over 16 years","From Mariano del Friuli Italy — spent most of his club career at Juventus"] },
  { player:"Bill Cook", sport:"🏒 NHL", answer:"BILL COOK", era:"legends", stats:{CUPS:"2",SCORING:"Led NHL 1927",ALLSTAR:"3x",TEAM:"Rangers"}, ctx:"Career Totals — First captain of the New York Rangers and two-time Stanley Cup champion", clues:["Was the first ever captain of the New York Rangers when the team was founded in 1926","Led the NHL in scoring in 1926-27 and won two Stanley Cup championships","Made three First Team All-Star selections during his career","From Brantford Ontario — was considered the best right winger in hockey during the late 1920s"] },

  { player:"Enes Kanter Freedom", sport:"🏀 NBA", answer:"ENES KANTER FREEDOM", era:"modern", stats:{REB:"8.4",ACTIVST:"Known for activism",TEAM:"Celtics/Blazers",BANNED:"Turkey banned him"}, ctx:"Career Totals — Journeyman center who became one of sports most vocal political activists", clues:["Legally changed his name to Enes Kanter Freedom in 2021 as a statement about his beliefs","Was banned from entering Turkey and had his passport revoked due to his political statements","Was a vocal critic of China and the NBA's relationship with the country","From Bursa Turkey — played at Kentucky before being drafted 3rd overall by Utah in 2011"] },
  { player:"Aaron Harang", sport:"⚾ MLB", answer:"AARON HARANG", era:"modern", stats:{SO:"1988",W:"161",ERA:"4.24",TEAM:"Reds"}, ctx:"Career Totals — Dependable workhorse who anchored the Cincinnati Reds rotation for years", clues:["Was the ace of the Cincinnati Reds rotation from roughly 2004 to 2009","Struck out 218 batters in 2006 — one of the higher totals in the NL that season","Spent most of his career as a durable innings-eater who never quite made an All-Star team","From Sacramento California — played at San Diego State before being drafted by Houston in 1999"] },

  { player:"Trent Green", sport:"🏈 NFL", answer:"TRENT GREEN", era:"modern", stats:{YDS:"4591",TD:"34",TEAM:"Rams/Chiefs",ERA:"2000s"}, ctx:"Career Totals — Quietly excellent QB who never got his due", clues:["Threw for over 4500 yards in 2003 with the Kansas City Chiefs","Was the starting quarterback for the Greatest Show on Turf Rams before Kurt Warner took over after an injury","Was a consistent Pro Bowl-caliber quarterback for nearly a decade without ever getting top-tier recognition","From Cedar Rapids Iowa — played at Indiana before going undrafted in 1993"] },
  { player:"Jake Plummer", sport:"🏈 NFL", answer:"JAKE PLUMMER", era:"modern", stats:{YDS:"29253",TD:"161",NICK:"Jake the Snake",TEAM:"Cardinals/Broncos"}, ctx:"Career Totals — Took Denver to the AFC Championship then walked away at his peak", clues:["Led the Denver Broncos to the AFC Championship Game in 2005 before losing to Pittsburgh","Abruptly retired at age 32 despite being offered a starting contract","Was nicknamed Jake the Snake for his scrambling ability","From Boise Idaho — played at Arizona State and was known for his gunslinging attitude"] },
  { player:"Kerry Collins", sport:"🏈 NFL", answer:"KERRY COLLINS", era:"modern", stats:{YDS:"40922",TD:"204",TEAMS:"6 teams",SB:"XXXV starter"}, ctx:"Career Totals — Journeyman who started a Super Bowl and threw for 40000 career yards", clues:["Started Super Bowl XXXV with the New York Giants losing to the Baltimore Ravens","Threw for over 40000 career passing yards across 17 NFL seasons","Overcame well-publicised personal struggles including alcohol issues to have a long career","From West Lawn Pennsylvania — played at Penn State where he won the 1994 Rose Bowl"] },
  { player:"Daunte Culpepper", sport:"🏈 NFL", answer:"DAUNTE CULPEPPER", era:"modern", stats:{YDS:"4717 in 2004",TD:"39",TEAM:"Vikings",RUSH:"Dual threat"}, ctx:"2004 NFL Season — Threw 39 touchdowns in one of the most overlooked great QB seasons", clues:["Was a dual-threat quarterback from the University of Central Florida who went undrafted before being selected in the first round","Was considered the best quarterback in the NFL heading into the 2005 season before a devastating knee injury","Was the primary beneficiary of Randy Moss on the field — the two formed one of the most explosive QB-WR combos ever","From Ocala Florida — went undrafted before being selected by Minnesota in the first round of 1999"] },
  { player:"Steve McNair", sport:"🏈 NFL", answer:"STEVE MCNAIR", era:"modern", stats:{MVP:"2003 co-MVP",SB:"XXXIV one yard short",TEAM:"Titans",NICK:"Air McNair"}, ctx:"Career Totals — Co-MVP and one yard short of a Super Bowl ring", clues:["Led Tennessee to Super Bowl XXXIV where Kevin Dyson was tackled one yard short on the final play","Was the quarterback for the Tennessee Titans in their Super Bowl XXXIV loss — Kevin Dyson was tackled one yard short on the final play","Was tragically killed in 2009 at age 36 — one of the most shocking deaths in NFL history","From Mount Olive Mississippi — played at Alcorn State a historically Black college before being drafted third overall in 1995"] },
  { player:"Kyle Boller", sport:"🏈 NFL", answer:"KYLE BOLLER", era:"modern", stats:{TEAM:"Ravens",DRAFT:"19th overall 2003",BUST:"Classic reach",CAREER:"Backup"}, ctx:"Career Totals — A cautionary tale of draft hype — one of the biggest QB busts of the 2000s", clues:["Was selected 19th overall by the Baltimore Ravens in the 2003 NFL Draft as a highly touted prospect","Never lived up to his draft position and became a cautionary tale about quarterback evaluation","Was best known for a pre-draft demonstration where he threw a football through the uprights from his knees","From Tracy California — played at Cal Berkeley where his raw arm talent masked significant mechanical issues"] },
  { player:"Tony Banks", sport:"🏈 NFL", answer:"TONY BANKS", era:"modern", stats:{TEAM:"Rams/Ravens/Others",SB:"XXXIV backup",ERA:"Late 1990s"}, ctx:"Career Totals — A decade-long NFL journeyman who started for multiple teams", clues:["Started for the St. Louis Rams in 1998 before being replaced mid-season in a collapse","Was the backup to Trent Dilfer when the Baltimore Ravens won Super Bowl XXXV","Bounced between multiple teams as a starter and backup across a 10-year career","From San Diego California — played at Michigan State before being drafted second round by the Rams in 1996"] },
  { player:"Cade McNown", sport:"🏈 NFL", answer:"CADE MCNOWN", era:"modern", stats:{DRAFT:"12th overall 1999",TEAM:"Bears",BUST:"One of worst ever",CAREER:"2 seasons"}, ctx:"Career Totals — Top-12 pick who became one of the most notorious QB busts in NFL history", clues:["Was selected 12th overall by the Chicago Bears in 1999 after a Heisman-contending career at UCLA","Was so disliked by teammates and coaches that the Bears released him after just two seasons","Was notorious for parking in handicapped spaces and his poor attitude in the locker room","From Danville California — had every physical tool but none of the intangible qualities needed at NFL quarterback"] },
  { player:"Akili Smith", sport:"🏈 NFL", answer:"AKILI SMITH", era:"modern", stats:{DRAFT:"3rd overall 1999",TEAM:"Bengals",BUST:"Catastrophic",TD:"5 career"}, ctx:"Career Totals — Third overall pick — threw just 5 career touchdowns in the NFL", clues:["Was selected third overall by the Cincinnati Bengals in 1999 with enormous expectations","Threw just 5 career touchdown passes and 13 interceptions in his entire NFL career","Was considered a catastrophic bust — one of the worst high picks in NFL history","From San Diego California — had just one impressive college season at Oregon before being overdrafted based on potential"] },
  { player:"Rex Grossman", sport:"🏈 NFL", answer:"REX GROSSMAN", era:"modern", stats:{SB:"XLI starter",TEAM:"Bears",NICK:"Sex Cannon",ERA:"2006"}, ctx:"Super Bowl XLI — Started the Super Bowl and was the most unpredictable QB of his generation", clues:["Started Super Bowl XLI with the Chicago Bears losing to the Indianapolis Colts","Was so wildly inconsistent that he became famous for both spectacular plays and catastrophic turnovers in the same game","Was sarcastically nicknamed the Sex Cannon by internet football fans for his gunslinging style","From Bloomington Indiana — played at Florida and was considered a top prospect before never quite finding consistency in the NFL"] },
  { player:"George Foster", sport:"⚾ MLB", answer:"GEORGE FOSTER", era:"classic", stats:{HR:"52 in 1977",RBI:"149",MVP:"1977",TEAM:"Reds"}, ctx:"1977 MLB Season — Hit 52 home runs and won the NL MVP with the Big Red Machine", clues:["Hit 52 home runs in 1977 — the first player to reach 50 since Willie Mays in 1965","Won the National League MVP award in 1977 with the Cincinnati Reds","Was a key part of the Big Red Machine alongside Johnny Bench and Pete Rose","From Tuscaloosa Alabama — was acquired from San Francisco in a trade that the Reds got the better of"] },
  { player:"Arjen Robben", sport:"⚽ Soccer", answer:"ARJEN ROBBEN", era:"modern", stats:{WC:"2010 finalist",UCL:"2013",TEAM:"Bayern/Chelsea",NATION:"Netherlands"}, ctx:"Career Totals — Dutch winger whose signature cut inside onto his left foot was unstoppable", clues:["Grew up in Bedum Netherlands — a tiny village — and became one of the most recognizable players in world football","Won the Champions League with Bayern Munich in 2013 scoring the winning goal in the final against Dortmund","Reached the World Cup final with the Netherlands in 2010 losing to Spain","From Bedum Netherlands — had successful spells at Chelsea PSV Real Madrid and Bayern Munich"] },
  { player:"Kazimierz Deyna", sport:"⚽ Soccer", answer:"KAZIMIERZ DEYNA", era:"legends", stats:{GOALS:"41 for Poland",WC:"1974 3rd",TEAM:"Legia Warsaw",NATION:"Poland"}, ctx:"Career Totals — Poland creative force at the 1974 World Cup", clues:["Was considered one of the best players in the world in the early 1970s yet spent his entire career at Legia Warsaw behind the Iron Curtain","Was considered one of the best players in the world in the early 1970s","Played most of his career at Legia Warsaw before moving to Manchester City late in his career","From Torun Poland — tragically died in a car accident in San Diego in 1989 aged just 41"] },
  { player:"Dragan Dzajic", sport:"⚽ Soccer", answer:"DRAGAN DZAJIC", era:"legends", stats:{GOALS:"23 for Yugoslavia",EURO:"1968 finalist",TEAM:"Red Star Belgrade",NATION:"Yugoslavia"}, ctx:"Career Totals — Named the best player at Euro 1968 and Yugoslavia's greatest ever footballer", clues:["Was voted the best player at the 1968 European Championship as Yugoslavia reached the final","Was nicknamed the Magic Dragan and is considered Yugoslavia greatest ever player","Spent almost his entire career at Red Star Belgrade becoming a club icon","From Umka Yugoslavia — was known for his dribbling ability and left foot technique that was ahead of his era"] },
{ player:"Gunnar Gren", sport:"⚽ Soccer", answer:"GUNNAR GREN", era:"legends", stats:{TEAM:"AC Milan",NATION:"Sweden",WC:"1958 runner-up",TRIO:"Gre-No-Li at Milan"}, ctx:"Career Totals — Part of the legendary Gre-No-Li trio at AC Milan", clues:["Helped Sweden reach the 1958 World Cup Final on home soil — one of only two times the host nation has reached the final","Helped Sweden reach the 1958 World Cup final on home soil where they lost to Brazil","Was considered one of the most technically gifted Swedish players ever","From Gothenburg Sweden — played at IFK Goteborg before becoming a star in Serie A"] },
  { player:"Ademir de Menezes", sport:"⚽ Soccer", answer:"ADEMIR DE MENEZES", era:"legends", stats:{WC:"1950 top scorer",GOALS:"9 in 1950",TEAM:"Vasco da Gama",NATION:"Brazil"}, ctx:"1950 World Cup — Won the Golden Boot with 9 goals at the Maracanazo tournament", clues:["Played for Vasco da Gama his entire career and was the most feared striker in South America in the late 1940s","Was the star of the great Brazilian team that lost the 1950 World Cup to Uruguay in the Maracanazo","Was nicknamed Queixada and was one of the most feared strikers of his era in South America","From Minas Gerais Brazil — spent most of his career at Vasco da Gama in Rio de Janeiro"] },
  { player:"Valentino Mazzola", sport:"⚽ Soccer", answer:"VALENTINO MAZZOLA", era:"legends", stats:{TEAM:"Grande Torino",NATION:"Italy",TRAGEDY:"Superga air disaster",ERA:"1940s"}, ctx:"Career Totals — Captain of Grande Torino who died in the Superga air disaster", clues:["Was the captain and greatest player of Grande Torino — considered one of the best club teams in football history","Was considered the best player in Italy and one of the best in the world in the late 1940s","Died in the Superga air disaster in 1949 when the entire Torino squad was killed in a plane crash","From Cassano dAdda Italy — was the father of Sandro Mazzola who also became a great Italian footballer"] },
  { player:"Fritz Walter", sport:"⚽ Soccer", answer:"FRITZ WALTER", era:"legends", stats:{WC:"1954 winner",TEAM:"Kaiserslautern",NATION:"West Germany",MIRACLE:"Berne"}, ctx:"1954 World Cup — Captained West Germany to the Miracle of Berne", clues:["Spent his entire career at FC Kaiserslautern — the stadium there was named after him in 1985","Was considered the greatest German footballer before Franz Beckenbauer","Spent his entire career at 1 FC Kaiserslautern refusing to leave despite enormous offers","From Kaiserslautern Germany — the stadium of his hometown club was named after him in 1985"] },
  { player:"Marcos Baghdatis", sport:"🎾 ATP", answer:"MARCOS BAGHDATIS", era:"modern", stats:{AUS_OPEN:"2006 finalist",RANK:"World No 8",NATION:"Cyprus",ERA:"2006"}, ctx:"Career Totals — Cypriot underdog who reached the Australian Open final", clues:["Was from Cyprus — the smallest country ever to produce a Grand Slam finalist at the time","Was ranked World No. 8 as his career peak and was a fan favourite for his passionate playing style","Was the first and only player from Cyprus to reach a Grand Slam final","From Limassol Cyprus — was known for his entertaining style and emotional on-court celebrations"] },
  { player:"Robby Ginepri", sport:"🎾 ATP", answer:"ROBBY GINEPRI", era:"modern", stats:{US_OPEN:"2005 SF",RANK:"World No 15",NATION:"USA",ERA:"2005"}, ctx:"Career Totals — Reached the 2005 US Open semifinal as a surprise run", clues:["Was an American player who briefly cracked the top 15 in the world before fading from the top tier","Was ranked World No. 15 as his career peak","Was one of several promising American players who emerged briefly without sustaining top-level results","From Atlanta Georgia — played at the University of Georgia before turning professional"] },
  { player:"Jurgen Melzer", sport:"🎾 ATP", answer:"JURGEN MELZER", era:"modern", stats:{FRENCH:"2010 SF",RANK:"World No 8",NATION:"Austria",ERA:"2010"}, ctx:"Career Totals — Austrian left-hander who reached the French Open semis and won multiple doubles Slams", clues:["Reached the French Open semifinal in 2010 as his best Grand Slam singles result","Was ranked World No. 8 as his career peak","Won multiple Grand Slam doubles titles with Philipp Petzschner","From Vienna Austria — was one of the best Austrian players since Thomas Muster"] },
  { player:"Guillermo Coria", sport:"🎾 ATP", answer:"GUILLERMO CORIA", era:"modern", stats:{FRENCH:"2004 finalist",RANK:"World No 3",NATION:"Argentina",NICK:"El Mago"}, ctx:"Career Totals — Argentine clay court magician who led two sets in the French Open final before collapsing", clues:["Reached the 2004 French Open final where he led Gaston Gaudio two sets to love before collapsing","Was ranked World No. 3 and was nicknamed El Mago — The Magician for his clay court artistry","Served a seven-month ban for a doping violation early in his career","From Rufino Argentina — was part of the golden generation of Argentine clay court players"] },
  { player:"Paradorn Srichaphan", sport:"🎾 ATP", answer:"PARADORN SRICHAPHAN", era:"modern", stats:{RANK:"World No 9",NATION:"Thailand",ERA:"2003",WIMBLEDON:"Beat Agassi"}, ctx:"Career Totals — The highest-ranked Asian player in tennis history who upset Agassi at Wimbledon", clues:["Beat Andre Agassi at Wimbledon in 2002 in one of the biggest upsets of that era","Beat Andre Agassi at Wimbledon in 2002 in one of the biggest upsets of that era","Was a national hero in Thailand and helped grow tennis enormously across Asia","From Khon Kaen Thailand — was supported by the Thai royal family in his tennis development"] },
  { player:"Radek Stepanek", sport:"🎾 ATP", answer:"RADEK STEPANEK", era:"modern", stats:{RANK:"World No 8",NATION:"Czech Republic",DAVIS_CUP:"Multiple winner",ERA:"2000s"}, ctx:"Career Totals — Czech net-rusher and Davis Cup hero", clues:["Was ranked World No. 8 and was known for his old-school serve-and-volley game","Was a key member of multiple Czech Republic Davis Cup winning teams","Was famous for his unusual dancing celebration after winning points","From Karvina Czech Republic — turned professional in 1996 and played in the top 10 for over a decade"] },
  { player:"Ivan Ljubicic", sport:"🎾 ATP", answer:"IVAN LJUBICIC", era:"modern", stats:{RANK:"World No 3",NATION:"Croatia",MASTERS:"Indian Wells 2010",DAVIS_CUP:"Captain"}, ctx:"Career Totals — Croatia top player and 2010 Indian Wells champion", clues:["Was ranked World No. 3 and won the prestigious Indian Wells Masters in 2010","Led Croatia to their first Davis Cup title in 2005","Was known for his big serve and powerful forehand","From Banja Luka Yugoslavia — later became Roger Federer coach helping him win several late-career titles"] },
  { player:"Jaroslav Drobny", sport:"🎾 ATP", answer:"JAROSLAV DROBNY", era:"legends", stats:{WIMBLEDON:"1954",FRENCH:"2x",NATIONS:"Played for 3 countries",SLAMS:"3"}, ctx:"Career Totals — Won three Slams while navigating Cold War politics across multiple nationalities", clues:["Won three Grand Slam titles including Wimbledon in 1954 after losing the final three times","Represented Czechoslovakia then Egypt then Great Britain due to Cold War political complications","Was known for his left-handed game and tremendous fighting spirit","From Prague Czechoslovakia — defected to the West in 1949 and eventually settled in England"] },
  { player:"Budge Patty", sport:"🎾 ATP", answer:"BUDGE PATTY", era:"legends", stats:{WIMBLEDON:"1950",FRENCH:"1950",STYLE:"Elegant expatriate",NATION:"USA"}, ctx:"Career Totals — Won both Wimbledon and the French Open in the same year in 1950", clues:["Was an American expatriate who lived most of his adult life in Paris and was known for his elegant precise style","Was known for his elegant and precise serve-and-volley style","Was an American who spent most of his adult life living in France","From Los Angeles California — became a beloved expatriate figure in Paris"] },
  { player:"Vic Seixas", sport:"🎾 ATP", answer:"VIC SEIXAS", era:"legends", stats:{WIMBLEDON:"1953",DAVIS_CUP:"US stalwart",LONGEVITY:"Still playing in his 80s",SLAMS:"1"}, ctx:"Career Totals — Wimbledon champion and Davis Cup hero who competed into his eighties", clues:["Won Wimbledon in 1953 as part of the American golden era in tennis","Was a Davis Cup stalwart for the United States across more than a decade","Was still competing in senior tennis events well into his eighties","From Philadelphia Pennsylvania — attended University of North Carolina"] },
  { player:"Fred Stolle", sport:"🎾 ATP", answer:"FRED STOLLE", era:"legends", stats:{SLAMS:"3",US_OPEN:"1966",FRENCH:"1965",WIMBLEDON:"Finalist 3x"}, ctx:"Career Totals — Won three Slam singles titles after losing three consecutive Wimbledon finals", clues:["Lost three consecutive Wimbledon finals before finally winning the US Open in 1966","Lost three consecutive Wimbledon finals in 1963 1964 and 1965 before winning the US Open","Won numerous Grand Slam doubles titles alongside Roy Emerson","From Hornsby New South Wales Australia — was one of the best serve-and-volleyers of the golden Australian era"] },
  { player:"Mal Anderson", sport:"🎾 ATP", answer:"MAL ANDERSON", era:"legends", stats:{SLAMS:"2",US_OPEN:"1957",AUS_OPEN:"1957",NATION:"Australia"}, ctx:"Career Totals — Won two Grand Slams in 1957 then turned professional just as he peaked", clues:["Won both the US Championships and the Australian Open in 1957","Turned professional after his amateur success which immediately barred him from Grand Slam competition","Was part of the extraordinary Australian golden generation under Harry Hopman","From Theodore Queensland Australia — is one of many great Australians whose amateur career was cut short by the professional divide"] },
  { player:"Mark Calcavecchia", sport:"⛳ Golf", answer:"MARK CALCAVECCHIA", era:"classic", stats:{OPEN:"1989",WINS:"13",ERA:"1980s-90s",STYLE:"Aggressive"}, ctx:"Career Totals — Won the 1989 Open Championship in a dramatic playoff", clues:["Was from Laurel Nebraska and was known for his aggressive attacking style that made him a fan favourite","Won 13 PGA Tour events and was known for his aggressive and entertaining style","Was a fan favourite on the PGA Tour for decades","From Laurel Nebraska — turned professional in 1981"] },
  { player:"Wayne Grady", sport:"⛳ Golf", answer:"WAYNE GRADY", era:"classic", stats:{PGA:"1990",WINS:"3",NATION:"Australia",ERA:"1990"}, ctx:"Career Totals — Won the 1990 PGA Championship as a surprise champion", clues:["Was from Brisbane Australia and was one of several Australians who had success on the PGA Tour in the late 1980s","Won three PGA Tour events in his career","Was one of several Australian players who had success on the PGA Tour in the late 1980s","From Brisbane Queensland Australia — turned professional in 1978"] },
  { player:"Steve Elkington", sport:"⛳ Golf", answer:"STEVE ELKINGTON", era:"classic", stats:{PGA:"1995",WINS:"10",SWING:"Called most perfect in golf",NATION:"Australia"}, ctx:"Career Totals — Won the 1995 PGA Championship with the most beautiful swing in golf", clues:["Won the 1995 PGA Championship at Riviera with a 15-foot birdie putt on the final hole","Was frequently cited by instructors as having the most technically perfect swing in professional golf","Won 10 PGA Tour events but was limited by illness and injuries","From Inverell New South Wales Australia — moved to the United States to pursue professional golf"] },
  { player:"Lee Janzen", sport:"⛳ Golf", answer:"LEE JANZEN", era:"classic", stats:{US_OPEN:"2x",WINS:"1993 and 1998",TEAM:"Ryder Cup",ERA:"1990s"}, ctx:"Career Totals — Won two US Opens in the 1990s", clues:["Won the US Open in 1993 and again in 1998 at The Olympic Club","His 1998 US Open win came as Payne Stewart collapsed on the final hole","Won 8 PGA Tour events during his career","From Austin Texas — turned professional in 1986 after playing at Florida Southern"] },
  { player:"Tom Kite", sport:"⛳ Golf", answer:"TOM KITE", era:"classic", stats:{US_OPEN:"1992",EARNINGS:"All-time PGA money leader for years",RYDER_CUP:"7x member",WINS:"19"}, ctx:"Career Totals — Won the 1992 US Open and was the PGA Tour all-time money leader for years", clues:["Won the 1992 US Open at Pebble Beach in difficult windy conditions","Was the all-time PGA Tour money earnings leader for several years despite relatively few major wins","Won 19 PGA Tour events and was a Ryder Cup member seven times","From Austin Texas — was coached alongside Ben Crenshaw by the legendary Harvey Penick"] },
  { player:"Chip Beck", sport:"⛳ Golf", answer:"CHIP BECK", era:"classic", stats:{SCORE:"59 in 1991",RYDER_CUP:"Member",WINS:"4",SCORE:"59 in 1991"}, ctx:"Career Totals — Shot 59 in competition and was involved in the Masters most controversial moment", clues:["Shot 59 on the PGA Tour in 1991 — only the second player ever to achieve the feat at the time","Was controversially criticised for laying up on the par-5 15th at the 1993 Masters while trailing by two","Was a member of several US Ryder Cup teams","From Fayetteville Georgia — turned professional in 1978"] },
  { player:"Davis Love III", sport:"⛳ Golf", answer:"DAVIS LOVE III", era:"classic", stats:{PGA:"1997",WINS:"21",RYDER_CUP:"Captain",FATHER:"Tribute win"}, ctx:"Career Totals — Won the 1997 PGA Championship in an emotional tribute to his late father", clues:["His father was a renowned golf instructor whose death in a plane crash deeply shaped his career and personality","His father Davis Love II was a renowned teaching professional","Won 21 PGA Tour events across his long career","From Charlotte North Carolina — served as US Ryder Cup captain in 2012 and again in 2016"] },
  { player:"Dale Hawerchuk", sport:"🏒 NHL", answer:"DALE HAWERCHUK", era:"classic", stats:{PTS:"1409",CALDER:"1982",TEAM:"Jets/Blues",ALLSTAR:"4x"}, ctx:"Career Totals — Won the Calder Trophy and scored 1409 career points", clues:["Won the Calder Trophy as the NHL rookie of the year in 1982 with the Winnipeg Jets","Scored 1409 career points making him one of the most prolific scorers of his era","Was widely considered one of the top three or four centers in the league during his prime despite being overshadowed by Gretzky","From Toronto Ontario — was the first overall pick in the 1981 NHL Draft by Winnipeg"] },
  { player:"Frank Stranahan", sport:"⛳ Golf", answer:"STRANAHAN", era:"legends", stats:{AMATEUR:"2",YEAR:"1950",BRIT:"2",COUNTRY:"USA"}, ctx:"Career — Amateur champion of the 1940s-50s", clues:["Was an American amateur who dominated amateur golf in the 1940s and 1950s despite never winning a professional major","Was one of the best amateur golfers of the postwar era","Was famous for his physical fitness — unusual for golfers at the time","From Toledo, Ohio — heir to the Champion Spark Plug fortune"] },

  { player:"Art Wall Jr.", sport:"⛳ Golf", answer:"ART WALL", era:"legends", stats:{MAJORS:"1",HIO:"45",YEAR:"1959",MASTERS:"1"}, ctx:"1959 Masters — Ace maker wins", clues:["Won The Masters this year after making 4 holes-in-one during the season","Made a record 45 career holes-in-one","From Honesdale, Pennsylvania","Was named PGA Player of the Year in 1959"] },

  { player:"Gay Brewer", sport:"⛳ Golf", answer:"GAY BREWER", era:"legends", stats:{MAJORS:"1",WINS:"10",YEAR:"1967",MASTERS:"1"}, ctx:"1967 Masters — Augusta comeback champion", clues:["Was the only Masters champion who had to return the next year and lose a sudden death playoff for the right to wear the green jacket again","Had famously missed a short putt the year before that cost him the title","From Midway, Kentucky","Won 10 PGA Tour events in his career"] },

  { player:"Francis Ouimet", sport:"⛳ Golf", answer:"FRANCIS OUIMET", era:"legends", stats:{US_OPEN:"1913",AGE:"20 amateur",FROM:"Across street",IMPACT:"Changed golf in USA"}, ctx:"1913 US Open — Amateur shocked the golfing world at age 20", clues:["Won the 1913 US Open as a 20-year-old amateur over the best British professionals","Had grown up literally across the street from The Country Club where he won","His victory sparked an explosion in golf's popularity across America","His story was made into the film The Greatest Game Ever Played"] },

  { player:"Tom Morris Sr", sport:"⛳ Golf", answer:"TOM MORRIS SR", era:"legends", stats:{BRITISH_OPEN:"4",GREENKEEPER:"St Andrews",SON:"Tom Morris Jr",OLD:"Nickname"}, ctx:"Career Totals — Won four British Opens and shaped the game of golf itself", clues:["Won 4 British Opens and helped design and maintain the Old Course at St Andrews","His son also won four consecutive Open Championships — making them the only father-son champions in major history","Was the greenkeeper and designer at St Andrews for nearly 40 years — shaping the course that still exists today","Is considered one of the founding fathers of modern golf"] },

  { player:"Macdonald Smith", sport:"⛳ Golf", answer:"MACDONALD SMITH", era:"legends", stats:{WINS:"24",MAJORS:"0",BAD_LUCK:"Famous",ERA:"1920s-30s"}, ctx:"Career Totals — One of golf's most talented players without a major", clues:["Was considered one of the most elegant ball strikers of the 1930s but finished runner-up in all four majors without winning one","Is considered one of the most talented players never to win a major","Suffered a famous collapse at the 1925 British Open leading by 5 with one round to go","From Carnoustie Scotland — his brothers Alec and Willie also became touring professionals"] },

  { player:"John McDermott", sport:"⛳ Golf", answer:"JOHN MCDERMOTT", era:"legends", stats:{US_OPEN:"2",AMERICAN:"First to win",AGE:"19",MENTAL:"Breakdown"}, ctx:"Career Totals — First American-born player to win the US Open", clues:["Won two consecutive US Opens in 1911 and 1912 before dying at just 27 years old","Won the US Open in 1911 and 1912 — the youngest US Open champion at 19","Had a mental breakdown in his early 20s that ended his competitive career","From Philadelphia Pennsylvania"] },

  // MEDIUM Hockey Modern (need 1)

  // MEDIUM Hockey Legends (need 4)

];






type Era = "modern" | "classic" | "legends";
type Puzzle = { player: string; sport: string; answer: string; era: Era; stats: Record<string, string>; ctx: string; clues: string[] };
type Difficulty = "easy" | "medium" | "hard";

const levenshtein = (a: string, b: string): number => {
  const m = a.length, n2 = b.length;
  const dp: number[][] = Array.from({length: m+1}, (_, i) => Array.from({length: n2+1}, (_, j) => i === 0 ? j : j === 0 ? i : 0));
  for (let i = 1; i <= m; i++) for (let j = 1; j <= n2; j++)
    dp[i][j] = a[i-1] === b[j-1] ? dp[i-1][j-1] : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
  return dp[m][n2];
};

const NICKNAME_ALIASES: Record<string, string[]> = {
  "WEMBY":["WEMBANYAMA"], "SHAQ":["ONEAL","SHAQUILLE"], "LEBRON":["JAMES"],
  "KOBE":["BRYANT"], "MAGIC":["JOHNSON"], "BIRD":["LARRY"], "DRJ":["ERVING","JULIUS"],
  "GREEKFREAK":["ANTETOKOUNMPO","GIANNIS"], "THEJOKER":["JOKIC","NIKOLA"],
  "SID":["CROSBY","SIDNEY"], "OVI":["OVECHKIN","ALEXANDER"],
  "THEGREAONE":["GRETZKY","WAYNE"], "THEGREATONE":["GRETZKY","WAYNE"], "MRHOCKEY":["HOWE","GORDIE"],
  "THEROCKET":["RICHARD","MAURICE"], "PISTOLPETE":["MARAVICH"],
  "SWEETNESS":["PAYTON","WALTER"], "PRIMETIME":["SANDERS","DEION"],
  "LT":["TAYLOR","LAWRENCE"], "MINISTER":["WHITE","REGGIE"],
  "THEANSWER":["IVERSON","ALLEN"], "AI":["IVERSON"],
  "TIGER":["WOODS"], "THEGOLDENBEAR":["NICKLAUS","JACK"],
  "ARNIE":["PALMER","ARNOLD"], "SEVE":["BALLESTEROS"],
  "PELE":["NASCIMENTO","EDSON"], "KING":["HENRY","DERRICK"],
  "THEFLASH":["WADE","DWYANE"], "FLASH":["WADE"],
  "CP3":["PAUL","CHRIS"], "TMAC":["MCGRADY","TRACY"],
  "MELO":["ANTHONY","CARMELO"], "GRONK":["GRONKOWSKI","ROB"],
  "OBJ":["BECKHAM","ODELL"], "MEGATRON":["JOHNSON","CALVIN"],
  "BROADWAYJOE":["NAMATH","JOE"], "SLINGINSAMMY":["BAUGH"],
  "THEGALLOPINGGHOST":["GRANGE","RED"], "CRAZYLEGS":["HIRSCH","ELROY"],
  "BULLETBILL":["DUDLEY"], "THEBIGO":["ROBERTSON","OSCAR"],
  "TINY":["ARCHIBALD","NATE"], "CLYDE":["FRAZIER","WALT"],
  "SWEETLOU":["HUDSON","LOU"], "THEADMIRAL":["ROBINSON","DAVID"],
  "THEMAILMAN":["MALONE","KARL"], "PISTOL":["MARAVICH","PETE"],
  "YAZ":["YASTRZEMSKI","CARL"], "THESPLENDIDSPLINTER":["WILLIAMS","TED"],
  "THEYANKEE CLIPPER":["DIMAGGIO","JOE"], "JOLTINJOE":["DIMAGGIO"],
  "THEBIGHURT":["THOMAS","FRANK"], "MROCTOBER":["JACKSON","REGGIE"],
  "SATCHEL":["PAIGE"], "DIZZY":["DEAN"], "RAPIDROBERT":["FELLER","BOB"],
  "TOMTERRIFIC":["SEAVER","TOM"], "LEFTY":["CARLTON","GROVE"],
  "BLACKMAMBA":["BRYANT","KOBE"], "THEICEMAN":["GERVIN","GEORGE"], "ICEMAN":["GERVIN"],
  "DERBOMBER":["MULLER","GERD"], "DERKAISR":["BECKENBAUER","FRANZ"],
  "DERKAISER":["BECKENBAUER","FRANZ"], "THEBLACKPANTHER":["EUSEBIO"],
  "BOOMBOOM":["BECKER","BORIS"], "GUGA":["KUERTEN"],
  "SIDTHEKID":["CROSBY"], "SUPERMAR10":["LEMIEUX"], "SUPERMARIO":["LEMIEUX"],
  "THEGOLDENJET":["HULL","BOBBY"], "MRGOALIE":["HALL","GLENN"],
  "THEWORM":["RODMAN","DENNIS"], "THEGLOVE":["PAYTON","GARY"],
};

const DIFF_CONFIG: Record<Difficulty, { label: string; guesses: number; color: string; bg: string; border: string; clueStyle: string; desc: string }> = {
  easy:   { label: "EASY",   guesses: 3, color: "#22c55e", bg: "rgba(34,197,94,0.12)",  border: "rgba(34,197,94,0.5)",  clueStyle: "Generous clues", desc: "GOATs & household names" },
  medium: { label: "MEDIUM", guesses: 3, color: "#f59e0b", bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.5)", clueStyle: "Vague clues",    desc: "All-Stars & champions" },
  hard:   { label: "HARD",   guesses: 3, color: "#ef4444", bg: "rgba(239,68,68,0.12)",  border: "rgba(239,68,68,0.5)",  clueStyle: "Cryptic clues",  desc: "Deep cuts & specialists" },
};

const POOLS: Record<Difficulty, Puzzle[]> = { easy: EASY, medium: MEDIUM, hard: HARD };
const SPORTS = ["🏀","🏈","⚾","⚽","🎾","⛳","🏒"];
const SPORT_LABELS: Record<string, string> = { "🏀":"Basketball","🏈":"Football","⚾":"Baseball","⚽":"Soccer","🎾":"Tennis (ATP/WTA)","⛳":"Golf","🏒":"Hockey" };

// ── Supabase ─────────────────────────────────────────────────────────────────
const SB_URL = "https://cfzdmfwoihphwzyllwxx.supabase.co";
const SB_KEY = "sb_publishable_LwlTUxLRHtY4aR3afAhJJw_iWdg6kw8";

const sbFetch = async (path: string, opts: RequestInit = {}) => {
  const res = await fetch(`${SB_URL}/rest/v1/${path}`, {
    ...opts,
    headers: {
      "Content-Type": "application/json",
      "apikey": SB_KEY,
      "Authorization": `Bearer ${SB_KEY}`,
      "Prefer": "return=minimal",
      ...(opts.headers || {}),
    },
  });
  if (!res.ok) return null;
  const text = await res.text();
  return text ? JSON.parse(text) : null;
};

// Upsert a play to Supabase
const sbLogPlay = async (username: string, date: string, difficulty: string, sport: string, era: string, score: number, guesses: number, won: boolean) => {
  try {
    await sbFetch("plays", {
      method: "POST",
      headers: { "Prefer": "resolution=ignore-duplicates" },
      body: JSON.stringify({ username: username || "anonymous", date, difficulty, sport, era, score, guesses, won }),
    });
  } catch {}
};

// Upsert player total score
const sbUpsertPlayer = async (username: string, totalScore: number, bestStreak: number, recoveryCode?: string) => {
  try {
    const body: Record<string,unknown> = { username: username || "anonymous", total_score: totalScore, best_streak: bestStreak, updated_at: new Date().toISOString() };
    if (recoveryCode) body.recovery_code = recoveryCode;
    await sbFetch("players?on_conflict=username", {
      method: "POST",
      headers: { "Prefer": "resolution=merge-duplicates,return=minimal" },
      body: JSON.stringify(body),
    });
  } catch {}
};

// Generate a memorable 8-char recovery code like STAT-4829
const generateRecoveryCode = (): string => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no confusable chars
  let code = "STAT-";
  for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
};

// Fetch player data by recovery code
const sbRecoverAccount = async (code: string): Promise<{username:string, total_score:number, best_streak:number} | null> => {
  try {
    const data = await sbFetch(`players?recovery_code=eq.${code.toUpperCase().trim()}&select=username,total_score,best_streak&limit=1`);
    if (data && data.length > 0) return data[0];
    return null;
  } catch { return null; }
};

// When a player sets their username for the first time, backfill their anonymous plays
const sbBackfillUsername = async (newUsername: string, tempCode?: string) => {
  try {
    const localDates: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i) || "";
      if (k.startsWith("statsiq_day_")) {
        const parts = k.split("_");
        if (parts.length >= 5) {
          const dateStr = `${parts[2]}-${parts[3].padStart(2,"0")}-${parts[4].padStart(2,"0")}`;
          if (!localDates.includes(dateStr)) localDates.push(dateStr);
        }
      }
    }
    if (localDates.length === 0) return;
    // Update rows saved under recovery code (temp ID)
    if (tempCode) {
      await sbFetch(`plays?username=eq.${encodeURIComponent(tempCode)}&date=in.(${localDates.join(",")})`, {
        method: "PATCH",
        headers: { "Prefer": "return=minimal" },
        body: JSON.stringify({ username: newUsername }),
      });
      await sbFetch(`players?username=eq.${encodeURIComponent(tempCode)}`, {
        method: "PATCH",
        headers: { "Prefer": "return=minimal" },
        body: JSON.stringify({ username: newUsername }),
      });
    }
    // Also update any legacy anonymous rows
    await sbFetch(`plays?username=eq.anonymous&date=in.(${localDates.join(",")})`, {
      method: "PATCH",
      headers: { "Prefer": "return=minimal" },
      body: JSON.stringify({ username: newUsername }),
    });
  } catch {}
};

// Save email to Supabase
const sbSaveEmail = async (email: string, username: string) => {
  try {
    await sbFetch("emails?on_conflict=email", {
      method: "POST",
      headers: { "Prefer": "resolution=ignore-duplicates,return=minimal" },
      body: JSON.stringify({ email, username: username || "" }),
    });
  } catch {}
};

// Fetch today's rarity stats
const sbSaveWeeklySummary = async (summary: {
  username: string;
  week_start: string;
  puzzles_played: number;
  win_rate: number;
  weekly_score: number;
  best_puzzle: string;
  best_puzzle_diff: string;
  best_puzzle_clues: number;
  easy_win_rate: number;
  medium_win_rate: number;
  hard_win_rate: number;
}) => {
  try {
    await sbFetch("weekly_summaries?on_conflict=username,week_start", {
      method: "POST",
      headers: { "Prefer": "resolution=merge-duplicates,return=minimal" },
      body: JSON.stringify(summary),
    });
  } catch {}
};

const sbGetWeeklySummaries = async (username: string): Promise<Array<Record<string,unknown>>> => {
  try {
    const data = await sbFetch(`weekly_summaries?username=eq.${encodeURIComponent(username)}&order=week_start.desc&limit=12`);
    return data || [];
  } catch { return []; }
};

const sbGetRarity = async (): Promise<Record<string, {win_pct: number, total_plays: number, avg_guesses: number}>> => {
  try {
    const data = await sbFetch("today_rarity?select=*");
    if (!data) return {};
    const result: Record<string, {win_pct: number, total_plays: number, avg_guesses: number}> = {};
    for (const row of data) result[row.difficulty] = row;
    return result;
  } catch { return {}; }
};

// Fetch leaderboard
const sbGetLeaderboard = async (type: "today" | "alltime"): Promise<Array<{username:string, score:number, streak?:number, is_pro?:boolean}>> => {
  try {
    const view = type === "today" ? "today_leaderboard?select=username,day_score" : "alltime_leaderboard?select=username,total_score,best_streak";
    const data = await sbFetch(view);
    if (!data) return [];
    // Get pro status for all users
    const usernames = data.map((r: Record<string,unknown>) => r.username as string);
    let proUsers: Set<string> = new Set();
    try {
      const proData = await sbFetch(`players?username=in.(${usernames.map((u: string) => `"${u}"`).join(",")})&select=username,is_pro`);
      if (proData) proData.forEach((r: Record<string,unknown>) => { if (r.is_pro) proUsers.add(r.username as string); });
    } catch {}
    return data
      .map((r: Record<string,unknown>) => ({
        username: r.username as string,
        score: (r.day_score ?? r.total_score) as number,
        streak: r.best_streak != null ? Number(r.best_streak) : undefined,
        is_pro: proUsers.has(r.username as string),
      }))
      .filter((r: {score:number}) => r.score > 0);
  } catch { return []; }
};

// Fetch a player's all-time rank (returns null if not in top 25 or not found)
const sbGetPlayerRank = async (username: string): Promise<number|null> => {
  try {
    const data = await sbFetch("alltime_leaderboard?select=username&limit=25");
    if (!data) return null;
    const idx = data.findIndex((r: {username:string}) => r.username === username);
    return idx >= 0 ? idx + 1 : null;
  } catch { return null; }
};

const SCORE_BADGES = [
  { min: 2500000, emoji: "🐐", label: "GOAT" },
  { min: 1000000, emoji: "💎", label: "Diamond" },
  { min: 500000,  emoji: "🏆", label: "Platinum" },
  { min: 200000,  emoji: "🥇", label: "Gold" },
  { min: 75000,   emoji: "🥈", label: "Silver" },
  { min: 25000,   emoji: "🥉", label: "Bronze" },
  { min: 5000,    emoji: "🎯", label: "Hooked" },
];


const getScoreBadge = (score: number) =>
  SCORE_BADGES.find(b => score >= b.min) ?? null;



// ── NO-REPEAT PUZZLE SELECTION ────────────────────────────────────────────────
// Tracks which puzzles have been shown per difficulty+filter combo.
// Cycles through all puzzles before repeating any.

function getTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}_${d.getMonth()+1}_${d.getDate()}`;
}

function getSeenKey(diff: Difficulty, filterKey: string) {
  return `statsiq_seen_${diff}_${filterKey}`;
}

function getDailyKey(diff: Difficulty, filterKey: string) {
  return `statsiq_daily_${diff}_${filterKey}_${getTodayKey()}`;
}

function pickTodaysPuzzle(pool: Puzzle[], diff: Difficulty, filterKey: string, usedPlayers: Set<string> = new Set()): Puzzle {
  const dailyKey = getDailyKey(diff, filterKey);
  const seenKey = getSeenKey(diff, filterKey);

  try {
    // If we already picked today's puzzle, return the same one
    const cached = localStorage.getItem(dailyKey);
    if (cached !== null) {
      const idx = parseInt(cached);
      if (idx >= 0 && idx < pool.length) return pool[idx];
    }

    // Load seen indexes
    const seenRaw = localStorage.getItem(seenKey);
    let seen: number[] = seenRaw ? JSON.parse(seenRaw) : [];

    // If we've seen everything, reset
    if (seen.length >= pool.length) seen = [];

    // Pick a random unseen puzzle, also excluding players used in other difficulties today
    const d = new Date();
    const entropy = d.getFullYear() * 10000 + (d.getMonth()+1) * 100 + d.getDate();
    const seenSet = new Set(seen);
    let unseen = pool.map((_,i) => i).filter(i => !seenSet.has(i) && !usedPlayers.has(pool[i].player));

    // If deduplication leaves nothing, fall back to just unseen (rare edge case)
    if (unseen.length === 0) unseen = pool.map((_,i) => i).filter(i => !seenSet.has(i));
    if (unseen.length === 0) { seen = []; unseen = pool.map((_,i) => i); }

    const pick = unseen[entropy % unseen.length];

    seen.push(pick);
    localStorage.setItem(seenKey, JSON.stringify(seen));
    localStorage.setItem(dailyKey, String(pick));

    return pool[pick];
  } catch {
    const d = new Date();
    const h = d.getFullYear() * 10000 + (d.getMonth()+1) * 100 + d.getDate();
    return pool[Math.abs(h) % pool.length];
  }
}

const ERA_CONFIG: Record<Era, { label: string; range: string; icon: string; examples: string; color: string; activeBg: string; activeBorder: string }> = {
  modern:  { label: "Modern",  range: "2000s – now",   icon: "📱", examples: "LeBron, Brady, Messi, Curry…",      color: "#22c55e", activeBg: "rgba(34,197,94,0.1)",   activeBorder: "rgba(34,197,94,0.45)" },
  classic: { label: "Classic", range: "1970s – 1990s", icon: "📺", examples: "Jordan, Montana, Gretzky, Graf…",  color: "#f59e0b", activeBg: "rgba(245,158,11,0.1)", activeBorder: "rgba(245,158,11,0.45)" },
  legends: { label: "Legends", range: "pre-1970s",     icon: "📰", examples: "Ruth, Ali, Owens, Chamberlain…",   color: "#a78bfa", activeBg: "rgba(167,139,250,0.1)", activeBorder: "rgba(167,139,250,0.45)" },
};

function FilterModal({ selectedSports, selectedEras, onToggleSport, onToggleEra, onClose, totalCount }: {
  selectedSports: Set<string>; selectedEras: Set<Era>;
  onToggleSport: (e: string) => void; onToggleEra: (e: Era) => void;
  onClose: () => void; totalCount: number;
}) {
  return (
    <div style={{ position:"fixed", inset:0, zIndex:200, display:"flex", alignItems:"center", justifyContent:"center" }} onClick={onClose}>
      <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.75)", backdropFilter:"blur(4px)" }} />
      <div style={{ position:"relative", background:"#0f1629", border:"1px solid rgba(255,255,255,0.12)", borderRadius:16, padding:"22px 20px", width:310, maxHeight:"88vh", overflowY:"auto" }} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
          <div>
            <h3 style={{ margin:0, color:"#fff", fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.3rem", letterSpacing:"0.1em" }}>FILTER PUZZLES</h3>
            <p style={{ margin:"2px 0 0", color:"#4b5563", fontSize:"0.62rem", letterSpacing:"0.15em" }}>
              {selectedSports.size === 0 && selectedEras.size === 0 ? "ALL PUZZLES" : "CUSTOM FILTER"}
            </p>
          </div>
          <button onClick={onClose} style={{ background:"none", border:"none", color:"#6b7280", cursor:"pointer", fontSize:"1.3rem" }}>✕</button>
        </div>

        {/* Era section */}
        <p style={{ margin:"0 0 8px", color:"#6b7280", fontSize:"0.6rem", letterSpacing:"0.18em", textTransform:"uppercase" }}>Era</p>
        <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:18 }}>
          {(["modern","classic","legends"] as Era[]).map(era => {
            const ec = ERA_CONFIG[era];
            const on = selectedEras.size === 0 || selectedEras.has(era);
            const checked = selectedEras.has(era);
            return (
              <button key={era} onClick={() => onToggleEra(era)} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 14px", borderRadius:10, border:`1px solid ${checked ? ec.activeBorder : "rgba(255,255,255,0.08)"}`, background:checked ? ec.activeBg : "rgba(255,255,255,0.02)", cursor:"pointer", fontFamily:"'Barlow Condensed',sans-serif", transition:"all 0.15s", textAlign:"left" }}>
                <span style={{ fontSize:"1.2rem", flexShrink:0 }}>{ec.icon}</span>
                <div style={{ flex:1 }}>
                  <p style={{ margin:0, color:checked ? ec.color : "#9ca3af", fontWeight:checked?700:400, fontSize:"0.88rem" }}>
                    {ec.label} <span style={{ fontSize:"0.72rem", opacity:0.65 }}>{ec.range}</span>
                  </p>
                  <p style={{ margin:"1px 0 0", color:checked ? `${ec.color}88` : "#374151", fontSize:"0.68rem" }}>{ec.examples}</p>
                </div>
                <span style={{ width:17, height:17, borderRadius:4, border:`2px solid ${checked ? ec.color : "rgba(255,255,255,0.2)"}`, background:checked ? ec.color : "transparent", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:"0.6rem", fontWeight:900, flexShrink:0 }}>{checked ? "✓" : ""}</span>
              </button>
            );
          })}
        </div>

        {/* Sport section */}
        <p style={{ margin:"0 0 8px", color:"#6b7280", fontSize:"0.6rem", letterSpacing:"0.18em", textTransform:"uppercase" }}>Sport</p>
        <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:16 }}>
          {SPORTS.map(e => {
            const on = selectedSports.has(e);
            return (
              <button key={e} onClick={() => onToggleSport(e)} style={{ padding:"5px 11px", borderRadius:20, fontSize:"0.75rem", background:on?"rgba(34,197,94,0.15)":"rgba(255,255,255,0.04)", border:`1px solid ${on?"rgba(34,197,94,0.5)":"rgba(255,255,255,0.1)"}`, color:on?"#86efac":"#6b7280", cursor:"pointer", fontFamily:"'Barlow Condensed',sans-serif", transition:"all 0.15s" }}>
                {e} {SPORT_LABELS[e]}
              </button>
            );
          })}
        </div>

        {/* Score multiplier info */}
        <div style={{ background:"rgba(255,215,0,0.06)", border:"1px solid rgba(255,215,0,0.15)", borderRadius:8, padding:"8px 12px", marginBottom:14 }}>
          <p style={{ margin:"0 0 4px", color:"#ffd700", fontSize:"0.6rem", letterSpacing:"0.15em", fontFamily:"'Bebas Neue',sans-serif" }}>SCORE MULTIPLIERS</p>
          <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
            <p style={{ margin:0, color:"#9ca3af", fontSize:"0.68rem" }}>All eras selected → <span style={{ color:"#ffd700" }}>×2 bonus</span></p>
            <p style={{ margin:0, color:"#9ca3af", fontSize:"0.68rem" }}>2 eras selected → <span style={{ color:"#ffd700" }}>×1.5 bonus</span></p>
            <p style={{ margin:0, color:"#9ca3af", fontSize:"0.68rem" }}>1 era selected → <span style={{ color:"#ffd700" }}>×1 (no bonus)</span></p>
            <p style={{ margin:0, color:"#6b7280", fontSize:"0.62rem", marginTop:2 }}>Fewer sports = lower score multiplier</p>
          </div>
        </div>

        {/* Puzzle count */}
        <div style={{ background:"rgba(255,255,255,0.04)", borderRadius:8, padding:"8px 12px", marginBottom:14, display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:"1rem" }}>🎯</span>
          <p style={{ margin:0, color:"#6b7280", fontSize:"0.72rem", lineHeight:1.4 }}>
            Showing <span style={{ color:"#fff", fontWeight:700 }}>{totalCount} puzzles</span> across all difficulties
          </p>
        </div>

        <div style={{ display:"flex", gap:8 }}>
          <button onClick={() => { [...selectedEras].forEach(e => onToggleEra(e)); [...selectedSports].forEach(e => onToggleSport(e)); }} style={{ flex:1, padding:"9px 0", borderRadius:8, border:"1px solid rgba(255,255,255,0.1)", background:"rgba(255,255,255,0.04)", color:"#9ca3af", cursor:"pointer", fontSize:"0.78rem", fontFamily:"'Barlow Condensed',sans-serif" }}>RESET</button>
          <button onClick={onClose} style={{ flex:2, padding:"9px 0", borderRadius:8, border:"none", background:"rgba(34,197,94,0.85)", color:"#fff", cursor:"pointer", fontSize:"0.78rem", fontWeight:900, fontFamily:"'Barlow Condensed',sans-serif" }}>PLAY</button>
        </div>
      </div>
    </div>
  );
}

// ── SCORE HISTORY MODAL ───────────────────────────────────────────────────────
type DayEntry = { score: number; guesses: number; won: boolean; player: string; diff: Difficulty; date: string };

function loadHistory(): Record<string, DayEntry> {
  const result: Record<string, DayEntry> = {};
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i) || "";
      if (k.startsWith("statsiq_day_")) {
        const raw = localStorage.getItem(k);
        if (raw) result[k] = JSON.parse(raw);
      }
    }
  } catch {}
  return result;
}

function ScoreHistoryModal({ totalScore, onClose, onReset, initialTab = "stats" }: { totalScore: number; onClose: () => void; onReset: () => void; initialTab?: "stats" | "calendar" }) {
  const history = loadHistory();
  const [confirmReset, setConfirmReset] = useState(false);
  const [tab, setTab] = useState<"stats"|"calendar">(initialTab);
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  // Stats
  const allEntries = Object.values(history);
  const wins = allEntries.filter(e => e.won);
  const totalGames = allEntries.length;
  const winRate = totalGames > 0 ? Math.round((wins.length / totalGames) * 100) : 0;
  const bestScore = wins.length > 0 ? Math.max(...wins.map(e => e.score)) : 0;
  const avgScore = wins.length > 0 ? Math.round(wins.reduce((s, e) => s + e.score, 0) / wins.length) : 0;

  // Streak calculation
  let currentStreak = 0, bestStreak = 0, streak = 0;
  const sortedDates = [...new Set(allEntries.map(e => e.date.slice(0, 10)))].sort();
  for (let i = 0; i < sortedDates.length; i++) {
    const d = new Date(sortedDates[i]);
    const prev = i > 0 ? new Date(sortedDates[i - 1]) : null;
    const isConsecutive = prev && (d.getTime() - prev.getTime()) === 86400000;
    const dayWon = allEntries.some(e => e.date.slice(0, 10) === sortedDates[i] && e.won);
    if (dayWon) { streak = isConsecutive ? streak + 1 : 1; bestStreak = Math.max(bestStreak, streak); }
    else streak = 0;
  }
  const todayStr = today.toISOString().slice(0, 10);
  const todayWon = allEntries.some(e => e.date.slice(0, 10) === todayStr && e.won);
  if (todayWon) currentStreak = streak;

  // Calendar
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = today.toLocaleString("en-US", { month: "long" });
  const DAYS = ["Su","Mo","Tu","We","Th","Fr","Sa"];
  const DIFF_COLORS: Record<string, string> = { easy: "#22c55e", medium: "#eab308", hard: "#ef4444" };

  const getDayEntries = (day: number) => {
    const dateStr = `${year}_${month+1}_${day}`;
    return Object.entries(history).filter(([k]) => k.includes(`statsiq_day_${dateStr}_`)).map(([,v]) => v);
  };

  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const selectedEntries = selectedDay ? getDayEntries(selectedDay) : [];

  return (
    <div style={{ position:"fixed", inset:0, zIndex:200, display:"flex", alignItems:"center", justifyContent:"center" }} onClick={onClose}>
      <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.8)", backdropFilter:"blur(4px)" }} />
      <div style={{ position:"relative", background:"#0f1629", border:"1px solid rgba(255,255,255,0.12)", borderRadius:16, padding:"22px 20px", width:320, maxHeight:"90vh", overflowY:"auto" }} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
          <div>
            <h3 style={{ margin:0, color:"#ffd700", fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.3rem", letterSpacing:"0.1em" }}>SCORE HISTORY</h3>
            <p style={{ margin:"2px 0 0", color:"#4b5563", fontSize:"0.6rem", letterSpacing:"0.15em" }}>ALL TIME</p>
          </div>
          <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:2 }}>
            {(() => { const b = getScoreBadge(totalScore); return b ? (
              <div style={{ display:"flex", alignItems:"center", gap:4, background:"rgba(255,215,0,0.1)", border:"1px solid rgba(255,215,0,0.25)", borderRadius:6, padding:"2px 8px" }}>
                <span style={{ fontSize:"0.9rem" }}>{b.emoji}</span>
                <span style={{ color:"#ffd700", fontFamily:"'Bebas Neue',sans-serif", fontSize:"0.65rem", letterSpacing:"0.1em" }}>{b.label.toUpperCase()}</span>
              </div>
            ) : null; })()}
            <button onClick={onClose} style={{ background:"none", border:"none", color:"#6b7280", cursor:"pointer", fontSize:"1.3rem" }}>✕</button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display:"flex", gap:6, marginBottom:16, background:"rgba(255,255,255,0.04)", borderRadius:10, padding:4 }}>
          {(["stats","calendar"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ flex:1, padding:"7px 0", borderRadius:8, border:"none", cursor:"pointer", fontFamily:"'Bebas Neue',sans-serif", fontSize:"0.9rem", letterSpacing:"0.12em", transition:"all 0.15s", background: tab===t ? (t==="stats" ? "rgba(255,215,0,0.15)" : "rgba(251,146,60,0.15)") : "transparent", color: tab===t ? (t==="stats" ? "#ffd700" : "#fb923c") : "#4b5563", fontWeight:900 }}>
              {t === "stats" ? "📊 STATS" : "📅 CALENDAR"}
            </button>
          ))}
        </div>

        {tab === "stats" && (<>
        {/* Total + Streaks */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:14 }}>
          {[
            { label:"TOTAL SCORE", val:totalScore.toLocaleString(), color:"#ffd700" },
            { label:"WIN RATE", val:`${winRate}%`, color:"#22c55e" },
            { label:"BEST SCORE", val:bestScore.toLocaleString(), color:"#f59e0b" },
            { label:"AVG SCORE", val:avgScore.toLocaleString(), color:"#60a5fa" },
            { label:"CURRENT STREAK", val:`${currentStreak} 🔥`, color:"#fb923c" },
            { label:"BEST STREAK", val:`${bestStreak} days`, color:"#a78bfa" },
          ].map(({ label, val, color }) => (
            <div key={label} style={{ background:"rgba(255,255,255,0.04)", borderRadius:8, padding:"8px 10px", border:"1px solid rgba(255,255,255,0.07)" }}>
              <p style={{ margin:0, color:"#4b5563", fontSize:"0.55rem", letterSpacing:"0.12em" }}>{label}</p>
              <p style={{ margin:0, color, fontSize:"1rem", fontWeight:900, fontFamily:"'Bebas Neue',sans-serif" }}>{val}</p>
            </div>
          ))}
        </div>

        {/* Badges */}
        {(() => {
          const badges: {icon:string,label:string,earned:boolean}[] = [
            { icon:"🏆", label:"First Win", earned: wins.length >= 1 },
            { icon:"🔥", label:"3-Day Streak", earned: bestStreak >= 3 },
            { icon:"⚡", label:"7-Day Streak", earned: bestStreak >= 7 },
            { icon:"🌟", label:"30-Day Streak", earned: bestStreak >= 30 },
            { icon:"🎯", label:"First Hard Win", earned: wins.some(e => e.diff === "hard") },
            { icon:"💎", label:"Perfect Day", earned: (() => { try { return localStorage.getItem("statsiq_had_perfect") === "1"; } catch { return false; } })() },
            { icon:"🦅", label:"Guess 1 Win", earned: wins.some(e => e.guesses === 1) },
            { icon:"📊", label:"10 Wins", earned: wins.length >= 10 },
            { icon:"🏅", label:"50 Wins", earned: wins.length >= 50 },
          ];
          const earned = badges.filter(b => b.earned);
          if (earned.length === 0) return null;
          return (
            <div style={{ marginBottom:14 }}>
              <p style={{ margin:"0 0 8px", color:"#6b7280", fontSize:"0.62rem", letterSpacing:"0.15em", fontFamily:"'Bebas Neue',sans-serif" }}>BADGES EARNED</p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                {badges.map(b => (
                  <div key={b.label} style={{ display:"flex", alignItems:"center", gap:5, padding:"4px 10px", borderRadius:20, background: b.earned ? "rgba(255,215,0,0.08)" : "rgba(255,255,255,0.02)", border:`1px solid ${b.earned ? "rgba(255,215,0,0.3)" : "rgba(255,255,255,0.06)"}`, opacity: b.earned ? 1 : 0.35 }}>
                    <span style={{ fontSize:"0.85rem", filter: b.earned ? "none" : "grayscale(1)" }}>{b.icon}</span>
                    <span style={{ color: b.earned ? "#d1d5db" : "#4b5563", fontSize:"0.65rem", fontWeight:700 }}>{b.label}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        {/* Yesterday's answer */}
        {(() => {
          const yesterday = new Date(Date.now()-86400000);
          const yStr = yesterday.toISOString().slice(0,10);
          const yParts = yStr.split("-");
          const yKeys = Object.keys(localStorage).filter(k => k.startsWith(`statsiq_day_${yParts[0]}_${parseInt(yParts[1])}_${parseInt(yParts[2])}_`));
          if (yKeys.length === 0) return null;
          const yEntries = yKeys.map(k => { try { return JSON.parse(localStorage.getItem(k)||"{}"); } catch { return null; } }).filter(Boolean);
          if (yEntries.length === 0) return null;
          return (
            <div style={{ background:"rgba(255,255,255,0.03)", borderRadius:10, padding:"10px 14px", marginBottom:14, border:"1px solid rgba(255,255,255,0.07)" }}>
              <p style={{ margin:"0 0 8px", color:"#6b7280", fontSize:"0.62rem", letterSpacing:"0.15em", fontFamily:"'Bebas Neue',sans-serif" }}>YESTERDAY'S ANSWERS</p>
              {yEntries.map((e: any, i: number) => (
                <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"5px 0", borderBottom: i < yEntries.length-1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                    <span style={{ fontSize:"0.6rem", fontWeight:700, padding:"2px 6px", borderRadius:4, background: e.diff==="easy"?"rgba(34,197,94,0.2)":e.diff==="medium"?"rgba(234,179,8,0.2)":"rgba(239,68,68,0.2)", color: e.diff==="easy"?"#22c55e":e.diff==="medium"?"#eab308":"#ef4444", fontFamily:"'Bebas Neue',sans-serif" }}>{e.diff?.toUpperCase()}</span>
                    <span style={{ color:"#d1d5db", fontSize:"0.78rem" }}>{e.player || "—"}</span>
                  </div>
                  <span style={{ fontSize:"0.85rem" }}>{e.won ? "✅" : "❌"}</span>
                </div>
              ))}
            </div>
          );
        })()}

        </>)}

        {tab === "calendar" && (<>
        {/* Calendar */}
        <div style={{ marginBottom:14 }}>
          <p style={{ margin:"0 0 10px", color:"#fff", fontFamily:"'Bebas Neue',sans-serif", fontSize:"1rem", letterSpacing:"0.1em", textAlign:"center" }}>{monthName} {year}</p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:3, marginBottom:4 }}>
            {DAYS.map(d => <div key={d} style={{ textAlign:"center", color:"#4b5563", fontSize:"0.6rem", fontWeight:700 }}>{d}</div>)}
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:3 }}>
            {Array(firstDay).fill(null).map((_, i) => <div key={`e${i}`} />)}
            {Array(daysInMonth).fill(null).map((_, i) => {
              const day = i + 1;
              const entries = getDayEntries(day);
              const hasPlay = entries.length > 0;
              const isToday = day === today.getDate();
              const isSelected = selectedDay === day;

              // One dot per difficulty played, colored by result
              const diffOrder: Array<"easy"|"medium"|"hard"> = ["easy","medium","hard"];
              const dots = diffOrder.map(d => {
                const e = entries.find(en => en.diff === d);
                if (!e) return null;
                return { diff: d, won: e.won };
              }).filter(Boolean);

              return (
                <div key={day} onClick={() => hasPlay && setSelectedDay(isSelected ? null : day)}
                  style={{ aspectRatio:"1", borderRadius:6, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background: isSelected ? "rgba(255,215,0,0.15)" : isToday ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)", border:`1px solid ${isSelected ? "rgba(255,215,0,0.5)" : isToday ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.05)"}`, cursor:hasPlay?"pointer":"default", position:"relative" }}>
                  <span style={{ fontSize:"0.68rem", color: isToday ? "#fff" : hasPlay ? "#d1d5db" : "#4b5563", fontWeight:isToday?700:400 }}>{day}</span>
                  {dots.length > 0 && (
                    <div style={{ display:"flex", gap:2, marginTop:2 }}>
                      {dots.map((dot: any) => (
                        <div key={dot.diff} style={{ width:4, height:4, borderRadius:"50%", background: dot.won ? DIFF_COLORS[dot.diff] : "rgba(239,68,68,0.4)", opacity: dot.won ? 1 : 0.6 }} />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Day detail */}
        {selectedDay && selectedEntries.length > 0 && (
          <div style={{ background:"rgba(0,0,0,0.3)", borderRadius:10, padding:"12px 14px", marginBottom:12 }}>
            <p style={{ margin:"0 0 8px", color:"#ffd700", fontFamily:"'Bebas Neue',sans-serif", fontSize:"0.9rem", letterSpacing:"0.1em" }}>
              {new Date(year, month, selectedDay).toLocaleDateString("en-US",{month:"short",day:"numeric"})}
            </p>
            {selectedEntries.map((e, i) => (
              <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"6px 0", borderBottom: i < selectedEntries.length-1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                <div>
                  <span style={{ fontSize:"0.62rem", fontWeight:700, padding:"2px 7px", borderRadius:4, background:DIFF_COLORS[e.diff]+"33", color:DIFF_COLORS[e.diff], marginRight:6, fontFamily:"'Bebas Neue',sans-serif" }}>{e.diff.toUpperCase()}</span>
                  <span style={{ color: e.won ? "#d1d5db" : "#6b7280", fontSize:"0.78rem" }}>{e.player}</span>
                </div>
                <div style={{ textAlign:"right" }}>
                  <p style={{ margin:0, color: e.won ? "#ffd700" : "#ef4444", fontWeight:900, fontSize:"0.85rem", fontFamily:"'Bebas Neue',sans-serif" }}>{e.won ? `+${e.score.toLocaleString()}` : "0"}</p>
                  <p style={{ margin:0, color:"#4b5563", fontSize:"0.58rem" }}>{e.won ? `guess ${e.guesses}` : "failed"}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Legend */}
        <div style={{ display:"flex", gap:12, justifyContent:"center", marginBottom:16 }}>
          {[["#22c55e","Easy"],["#eab308","Medium"],["#ef4444","Hard"]].map(([c,l]) => (
            <div key={l} style={{ display:"flex", alignItems:"center", gap:4 }}>
              <div style={{ width:7, height:7, borderRadius:"50%", background:c }} />
              <span style={{ color:"#4b5563", fontSize:"0.6rem" }}>{l} win</span>
            </div>
          ))}
        </div>

        </>)}

        {/* Reset score */}
        {!confirmReset ? (
          <button onClick={() => setConfirmReset(true)} style={{ width:"100%", padding:"8px", borderRadius:8, border:"1px solid rgba(239,68,68,0.25)", background:"rgba(239,68,68,0.06)", color:"#6b7280", cursor:"pointer", fontSize:"0.72rem", fontFamily:"'Barlow Condensed',sans-serif", letterSpacing:"0.1em" }}>
            RESET SCORE & HISTORY
          </button>
        ) : (
          <div style={{ background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.3)", borderRadius:10, padding:"12px 14px" }}>
            <p style={{ margin:"0 0 6px", color:"#fca5a5", fontSize:"0.75rem", textAlign:"center" }}>This permanently deletes your score and all history.</p>
            <p style={{ margin:"0 0 8px", color:"#6b7280", fontSize:"0.68rem", textAlign:"center" }}>Type <strong style={{color:"#fca5a5"}}>RESET</strong> to confirm</p>
            <input
              placeholder="Type RESET"
              onChange={e => {
                if (e.target.value.toUpperCase() === "RESET") {
                  onReset();
                }
              }}
              style={{ width:"100%", padding:"8px 10px", borderRadius:8, border:"1px solid rgba(239,68,68,0.3)", background:"rgba(0,0,0,0.3)", color:"#fff", fontSize:"0.85rem", fontFamily:"'Barlow Condensed',sans-serif", marginBottom:8, boxSizing:"border-box" as const, textAlign:"center", letterSpacing:"0.2em" }}
            />
            <button onClick={() => setConfirmReset(false)} style={{ width:"100%", padding:"7px", borderRadius:8, border:"1px solid rgba(255,255,255,0.1)", background:"transparent", color:"#6b7280", cursor:"pointer", fontSize:"0.72rem", fontFamily:"'Barlow Condensed',sans-serif" }}>CANCEL</button>
          </div>
        )}

      </div>
    </div>
  );
}

export default function StatsIQ() {
  const [diff, setDiff] = useState<Difficulty>("easy");
  const [filter, setFilter] = useState<Set<string>>(() => {
    try { const s = localStorage.getItem("statsiq_filter"); return s ? new Set(JSON.parse(s)) : new Set<string>(); } catch { return new Set<string>(); }
  });
  const [eraFilter, setEraFilter] = useState<Set<Era>>(() => {
    try { const s = localStorage.getItem("statsiq_era_filter"); return s ? new Set(JSON.parse(s)) : new Set<Era>(); } catch { return new Set<Era>(); }
  });
  const [showFilter, setShowFilter] = useState(false);
  const [showHow, setShowHow] = useState<boolean>(false); // only opens manually via ? button
  const [showHistory, setShowHistory] = useState(false);
  const [historyTab, setHistoryTab] = useState<"stats"|"calendar">("stats");
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showWeeklyRecap, setShowWeeklyRecap] = useState(false);
  const [weeklyData, setWeeklyData] = useState<Record<string,unknown> | null>(null);
  const [pastSummaries, setPastSummaries] = useState<Array<Record<string,unknown>>>([]);
  const [showPastSummaries, setShowPastSummaries] = useState(false);
  const [showProModal, setShowProModal] = useState(false);
  const [showExtendedStats, setShowExtendedStats] = useState(false);
  const [lbData, setLbData] = useState<Array<{username:string,score:number,streak?:number}>>([]);
  const [lbType, setLbType] = useState<"today"|"alltime">("alltime");
  const [lbLoading, setLbLoading] = useState(false);
  const [globalRank, setGlobalRank] = useState<number|null>(null);
  const [rarity, setRarity] = useState<Record<string,{win_pct:number,total_plays:number,avg_guesses:number}>>({});
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [showPractice, setShowPractice] = useState(false);
  const [practiceIdx, setPracticeIdx] = useState(0);
  const [pGuesses, setPGuesses] = useState<{text:string,ok:boolean}[]>([]);
  const [pInput, setPInput] = useState("");
  const [pDone, setPDone] = useState(false);
  const [pWon, setPWon] = useState(false);
  const [pStreak, setPStreak] = useState(0);
  const [pBestStreak, setPBestStreak] = useState(0);
  const [pSessionWins, setPSessionWins] = useState(0);
  const [pSessionPlayed, setPSessionPlayed] = useState(0);

  // Free practice limit — 10 per day, resets at midnight
  const getPracticeCount = () => {
    try {
      const today = new Date();
      const key = `statsiq_practice_count_${today.getFullYear()}_${today.getMonth()+1}_${today.getDate()}`;
      return parseInt(localStorage.getItem(key) || "0");
    } catch { return 0; }
  };
  const incrementPracticeCount = () => {
    try {
      const today = new Date();
      const key = `statsiq_practice_count_${today.getFullYear()}_${today.getMonth()+1}_${today.getDate()}`;
      const current = parseInt(localStorage.getItem(key) || "0");
      localStorage.setItem(key, String(current + 1));
      return current + 1;
    } catch { return 0; }
  };
  const FREE_PRACTICE_LIMIT = 10;
  const [pSportFilter, setPSportFilter] = useState<Set<string>>(new Set<string>());
  const [pEraFilter, setPEraFilter] = useState<Set<Era>>(new Set<Era>());
  const [pDiffFilter, setPDiffFilter] = useState<Set<Difficulty>>(new Set<Difficulty>());
  const [showPFilter, setShowPFilter] = useState(false);
  const [sharePreview, setSharePreview] = useState<string | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportText, setReportText] = useState("");
  const [reportSent, setReportSent] = useState(false);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(() => { try { return localStorage.getItem("statsiq_email_submitted") === "1"; } catch { return false; } });
  const [recoveryCode, setRecoveryCode] = useState<string>(() => { try { return localStorage.getItem("statsiq_recovery_code") || ""; } catch { return ""; } });
  const [showRecoveryCode, setShowRecoveryCode] = useState(false);
  const [showRecoverModal, setShowRecoverModal] = useState(false);
  const [recoverInput, setRecoverInput] = useState("");
  const [recoverError, setRecoverError] = useState("");
  const [recoverLoading, setRecoverLoading] = useState(false);
  const [countdown, setCountdown] = useState("");
  const [onboardingStep, setOnboardingStep] = useState<number>(() => {
    try { return localStorage.getItem("statsiq_visited") ? -1 : 0; } catch { return 0; }
  });
  const [showSplash, setShowSplash] = useState<boolean>(() => {
    try { return !localStorage.getItem("statsiq_visited"); } catch { return true; }
  });
  const [username, setUsername] = useState<string>(() => {
    try { return localStorage.getItem("statsiq_username") || ""; } catch { return ""; }
  });
  const [usernameInput, setUsernameInput] = useState("");

  // Compute streak at top level so it's available everywhere
  const computeStreak = (): { current: number; best: number } => {
    try {
      const keys = Object.keys(localStorage).filter(k => k.startsWith("statsiq_day_"));
      const dayMap: Record<string, boolean> = {};
      keys.forEach(k => {
        try {
          const parts = k.split("_"); // statsiq_day_YYYY_M_D_diff
          if (parts.length < 6) return;
          const dateStr = `${parts[2]}-${parts[3].padStart(2,"0")}-${parts[4].padStart(2,"0")}`;
          const data = JSON.parse(localStorage.getItem(k) || "{}");
          if (data.won) dayMap[dateStr] = true;
        } catch {}
      });
      const days = Object.keys(dayMap).sort().reverse();
      let current = 0, best = 0, streak = 0;
      const today = new Date().toISOString().slice(0,10);
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0,10);
      if (!dayMap[today] && !dayMap[yesterday]) { best = days.reduce((b, _, i) => { /* calc best */ return b; }, 0); }
      // Simple streak calc
      const allDays = Object.keys(dayMap).sort().reverse();
      let prev = "";
      for (const d of allDays) {
        if (!prev) { streak = 1; }
        else {
          const diff = (new Date(prev).getTime() - new Date(d).getTime()) / 86400000;
          if (diff === 1) streak++;
          else { best = Math.max(best, streak); streak = 1; }
        }
        prev = d;
      }
      best = Math.max(best, streak);
      // Current streak only if includes today or yesterday
      if (dayMap[today] || dayMap[yesterday]) {
        let cs = 0, check = today;
        for (let i = 0; i < 365; i++) {
          if (dayMap[check]) { cs++; check = new Date(new Date(check).getTime() - 86400000).toISOString().slice(0,10); }
          else break;
        }
        if (!dayMap[today]) { check = yesterday; cs = 0; for (let i = 0; i < 365; i++) { if (dayMap[check]) { cs++; check = new Date(new Date(check).getTime() - 86400000).toISOString().slice(0,10); } else break; } }
        current = cs;
      }
      return { current, best };
    } catch { return { current: 0, best: 0 }; }
  };
  const [streakData] = useState(computeStreak);

  // ── WEEKLY RECAP ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!username) return;
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday
    if (dayOfWeek !== 1) return; // Show on Monday (recapping the previous week)

    const weekStartDate = new Date(now);
    weekStartDate.setDate(now.getDate() - 7); // Go back 7 days to start of last week
    const weekStart = weekStartDate.toISOString().slice(0, 10);

    // Check if already shown this week
    const shownKey = `statsiq_weekly_shown_${weekStart}`;
    if (localStorage.getItem(shownKey)) return;

    // Calculate stats from last 7 days
    try {
      const keys = Object.keys(localStorage).filter(k => k.startsWith("statsiq_day_"));
      let played = 0, won = 0, weekScore = 0;
      let easyPlayed = 0, easyWon = 0;
      let medPlayed = 0, medWon = 0;
      let hardPlayed = 0, hardWon = 0;
      let bestPuzzle = "", bestDiff = "", bestClues = 4, bestScore = 0;

      const diffRank: Record<string, number> = { easy: 0, medium: 1, hard: 2 };

      keys.forEach(k => {
        try {
          const parts = k.split("_"); // statsiq_day_YYYY_M_D_diff
          if (parts.length < 6) return;
          const dateStr = `${parts[2]}-${parts[3].padStart(2,"0")}-${parts[4].padStart(2,"0")}`;
          if (dateStr < weekStart || dateStr >= now.toISOString().slice(0,10)) return;
          const diff = parts[5] as string;
          const entry = JSON.parse(localStorage.getItem(k) || "{}");
          if (!entry || entry.score === undefined) return;

          played++;
          weekScore += entry.score || 0;
          if (entry.won) {
            won++;
            if (diff === "easy") { easyPlayed++; easyWon++; }
            if (diff === "medium") { medPlayed++; medWon++; }
            if (diff === "hard") { hardPlayed++; hardWon++; }

            // Best puzzle: highest diff, then fewest clues, then highest score
            const isHarder = (diffRank[diff] || 0) > (diffRank[bestDiff] || 0);
            const sameHarder = diff === bestDiff && (entry.guesses || 4) < bestClues;
            const sameSameMore = diff === bestDiff && entry.guesses === bestClues && (entry.score || 0) > bestScore;
            if (!bestPuzzle || isHarder || sameHarder || sameSameMore) {
              bestPuzzle = entry.player || "";
              bestDiff = diff;
              bestClues = entry.guesses || 4;
              bestScore = entry.score || 0;
            }
          } else {
            if (diff === "easy") easyPlayed++;
            if (diff === "medium") medPlayed++;
            if (diff === "hard") hardPlayed++;
          }
        } catch {}
      });

      if (played === 0) return; // Nothing to show

      const summary = {
        username,
        week_start: weekStart,
        puzzles_played: played,
        win_rate: played > 0 ? Math.round((won / played) * 100) : 0,
        weekly_score: weekScore,
        best_puzzle: bestPuzzle,
        best_puzzle_diff: bestDiff,
        best_puzzle_clues: bestClues,
        easy_win_rate: easyPlayed > 0 ? Math.round((easyWon / easyPlayed) * 100) : 0,
        medium_win_rate: medPlayed > 0 ? Math.round((medWon / medPlayed) * 100) : 0,
        hard_win_rate: hardPlayed > 0 ? Math.round((hardWon / hardPlayed) * 100) : 0,
        dots: keys.filter(k => {
          const parts = k.split("_");
          if (parts.length < 6) return false;
          const dateStr = `${parts[2]}-${parts[3].padStart(2,"0")}-${parts[4].padStart(2,"0")}`;
          return dateStr >= weekStart && dateStr < now.toISOString().slice(0,10);
        }).reduce((acc: Record<string, Record<string,unknown>>, k) => {
          const parts = k.split("_");
          const dateStr = `${parts[2]}-${parts[3].padStart(2,"0")}-${parts[4].padStart(2,"0")}`;
          const diff = parts[5];
          const entry = JSON.parse(localStorage.getItem(k) || "{}");
          if (!acc[dateStr]) acc[dateStr] = {};
          acc[dateStr][diff] = { won: entry.won, guesses: entry.guesses };
          return acc;
        }, {}),
      };

      setWeeklyData(summary);
      setShowWeeklyRecap(true);
      localStorage.setItem(shownKey, "1");

      // Save to Supabase
      sbSaveWeeklySummary(summary);

    } catch {}
  }, [username]);

  // Load past summaries when requested
  useEffect(() => {
    if (showPastSummaries && username) {
      sbGetWeeklySummaries(username).then(setPastSummaries);
    }
  }, [showPastSummaries, username]);

  // Streak shield — earned at 7-day streak, usable once to skip a missed day
  const [streakShield, setStreakShield] = useState<boolean>(() => {
    try { return localStorage.getItem("statsiq_streak_shield") === "1"; } catch { return false; }
  });
  const [shieldUsed, setShieldUsed] = useState<boolean>(() => {
    try { return localStorage.getItem("statsiq_shield_used") === "1"; } catch { return false; }
  });

  // Personal best per difficulty
  const getPersonalBest = (d: Difficulty): number => {
    try {
      let best = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || "";
        if (k.startsWith("statsiq_day_") && k.endsWith("_" + d)) {
          const entry = JSON.parse(localStorage.getItem(k) || "{}");
          if (entry.score > best) best = entry.score;
        }
      }
      return best;
    } catch { return 0; }
  };
  const getInitialDayState = () => {
    try {
      const today = new Date();
      const dateStr = `${today.getFullYear()}_${today.getMonth()+1}_${today.getDate()}`;
      // Check completed first
      const key = `statsiq_day_${dateStr}_easy`;
      const entry = localStorage.getItem(key);
      if (entry) {
        const data = JSON.parse(entry);
        return { done: true, won: data.won, guesses: Array(data.guesses).fill(null).map((_: null, i: number) =>
          i === data.guesses - 1 && data.won ? { text: data.player, ok: true } : { text: "• • •", ok: false }
        ), todayScore: data.score };
      }
      // Check mid-game progress
      const progressKey = `statsiq_progress_${dateStr}_easy`;
      const saved = localStorage.getItem(progressKey);
      if (saved) {
        const savedGuesses = JSON.parse(saved);
        return { done: false, won: false, guesses: savedGuesses as { text: string; ok: boolean }[], todayScore: null };
      }
    } catch {}
    return { done: false, won: false, guesses: [] as { text: string; ok: boolean }[], todayScore: null };
  };
  const initState = getInitialDayState();
  const [guesses, setGuesses] = useState<{ text: string; ok: boolean }[]>(initState.guesses);
  const [input, setInput] = useState("");
  const [done, setDone] = useState(initState.done);
  const [won, setWon] = useState(initState.won);
  const [msg, setMsg] = useState("");
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  // Track which difficulties have been completed today

  useEffect(() => {
    document.title = "StatsIQ — Daily Sports Trivia";
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (!link) { link = document.createElement("link") as HTMLLinkElement; link.rel = "icon"; document.head.appendChild(link); }
    link.href = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📊</text></svg>";

    // og meta tags for rich link previews
    const setMeta = (prop: string, val: string) => {
      let el = document.querySelector(`meta[property="${prop}"]`) as HTMLMetaElement;
      if (!el) { el = document.createElement("meta"); el.setAttribute("property", prop); document.head.appendChild(el); }
      el.setAttribute("content", val);
    };
    setMeta("og:title", "StatsIQ — Daily Sports Trivia");
    setMeta("og:description", "Guess the athlete from a real stat line. 3 daily puzzles — Easy, Medium, and Hard.");
    setMeta("og:url", "https://statsiq.io");
    setMeta("og:type", "website");
    setMeta("og:image", "https://statsiq.io/og-image.png");
    const twitterCard = document.createElement("meta");
    twitterCard.setAttribute("name", "twitter:card"); twitterCard.setAttribute("content", "summary_large_image");
    if (!document.querySelector('meta[name="twitter:card"]')) document.head.appendChild(twitterCard);
  }, []);

  const getTodayStr = () => new Date().toISOString().slice(0, 10);
  const getCompletedToday = (): Set<Difficulty> => {
    try {
      const raw = localStorage.getItem(`statsiq_completed_${getTodayStr()}`);
      return raw ? new Set(JSON.parse(raw)) : new Set();
    } catch { return new Set(); }
  };
  const [completedToday, setCompletedToday] = useState<Set<Difficulty>>(getCompletedToday);

  // Reset completedToday at midnight
  useEffect(() => {
    let lastDate = getTodayStr();
    const interval = setInterval(() => {
      const now = getTodayStr();
      if (now !== lastDate) { lastDate = now; setCompletedToday(new Set()); }
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Countdown to midnight
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const midnight = new Date(); midnight.setHours(24,0,0,0);
      const diff2 = midnight.getTime() - now.getTime();
      const h = Math.floor(diff2/3600000);
      const m = Math.floor((diff2%3600000)/60000);
      const s = Math.floor((diff2%60000)/1000);
      setCountdown(`${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`);
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  // Award streak shield at 7-day streak
  useEffect(() => {
    if (streakData.current >= 7 && !streakShield && !shieldUsed) {
      setStreakShield(true);
      try { localStorage.setItem("statsiq_streak_shield", "1"); } catch {}
    }
  }, [streakData.current, streakShield, shieldUsed]);

  // Auto-apply shield if player missed yesterday (streak would break)
  useEffect(() => {
    if (!streakShield) return;
    const today = new Date().toISOString().slice(0,10);
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0,10);
    const twoDaysAgo = new Date(Date.now() - 172800000).toISOString().slice(0,10);
    // Check if they played two days ago but not yesterday
    const playedTwoDaysAgo = (() => { try {
      const keys = Object.keys(localStorage).filter(k => k.startsWith("statsiq_day_"));
      return keys.some(k => { const p = k.split("_"); return `${p[2]}-${p[3].padStart(2,"0")}-${p[4].padStart(2,"0")}` === twoDaysAgo && JSON.parse(localStorage.getItem(k)||"{}").won; });
    } catch { return false; } })();
    const playedYesterday = (() => { try {
      const keys = Object.keys(localStorage).filter(k => k.startsWith("statsiq_day_"));
      return keys.some(k => { const p = k.split("_"); return `${p[2]}-${p[3].padStart(2,"0")}-${p[4].padStart(2,"0")}` === yesterday; });
    } catch { return false; } })();
    if (playedTwoDaysAgo && !playedYesterday) {
      // Use the shield — create a phantom entry for yesterday so streak continues
      try {
        localStorage.setItem(`statsiq_shield_${yesterday}`, "1");
        localStorage.setItem("statsiq_streak_shield", "0");
        localStorage.setItem("statsiq_shield_used", "1");
        setStreakShield(false);
        setShieldUsed(true);
        toast("🛡️ Streak Shield used — your streak is safe!", 3500);
      } catch {}
    }
  }, []);

  // Show weekly recap on Monday if they played last week
  useEffect(() => {
    const today = new Date();
    if (today.getDay() !== 1) return; // Only Monday
    const recapKey = `statsiq_recap_shown_${today.getFullYear()}_${today.getMonth()+1}_${today.getDate()}`;
    try {
      if (localStorage.getItem(recapKey)) return; // Already shown today
      // Check if they played any day last week
      const keys = Object.keys(localStorage).filter(k => k.startsWith("statsiq_day_"));
      const hasLastWeekData = keys.some(k => {
        try {
          const parts = k.split("_");
          const d = new Date(`${parts[2]}-${parts[3].padStart(2,"0")}-${parts[4].padStart(2,"0")}`);
          const daysAgo = (today.getTime() - d.getTime()) / 86400000;
          return daysAgo >= 1 && daysAgo <= 7;
        } catch { return false; }
      });
      if (hasLastWeekData) {
        setTimeout(() => { setShowWeeklyRecap(true); localStorage.setItem(recapKey, "1"); }, 2000);
      }
    } catch {}
  }, []);
  useEffect(() => {
    const allDone = (["easy","medium","hard"] as Difficulty[]).every(d => completedToday.has(d));
    if (!allDone || emailSubmitted) return;
    // Only show once ever — check a persistent flag
    try { if (localStorage.getItem("statsiq_email_prompt_shown")) return; } catch {}
    const t = setTimeout(() => {
      try { localStorage.setItem("statsiq_email_prompt_shown", "1"); } catch {}
      setShowEmailCapture(true);
    }, 12000);
    return () => clearTimeout(t);
  }, [completedToday.size, emailSubmitted]);

  // Fetch rarity stats when any puzzle is completed
  useEffect(() => {
    if (completedToday.size > 0) {
      sbGetRarity().then(data => { if (Object.keys(data).length > 0) setRarity(data); });
    }
  }, [completedToday.size]);

  // Fetch global rank on load and after each puzzle completion
  useEffect(() => {
    if (username) {
      sbGetPlayerRank(username).then(rank => setGlobalRank(rank));
    }
  }, [username, completedToday.size]);

  const markDiffCompleted = (d: Difficulty) => {
    const next = new Set(completedToday);
    next.add(d);
    setCompletedToday(next);
    try { localStorage.setItem(`statsiq_completed_${getTodayStr()}`, JSON.stringify([...next])); } catch {}
  };

  const cfg = DIFF_CONFIG[diff];

  const applyFilters = (pool: Puzzle[]) => {
    let result = pool;
    if (filter.size > 0) result = result.filter(p => filter.has(p.sport.split(" ")[0]));
    if (eraFilter.size > 0) result = result.filter(p => eraFilter.has(p.era));
    return result.length > 0 ? result : pool;
  };

  const pool = applyFilters(POOLS[diff]);
  const totalFiltered = (["easy","medium","hard"] as Difficulty[]).reduce((sum, d) => sum + applyFilters(POOLS[d]).length, 0);

  // Build a stable filter key so the seen list is scoped to the current filter combo
  const filterKey = [...filter].sort().join(",") + "|" + [...eraFilter].sort().join(",");
  // Get players already used today in other difficulties to avoid repeats
  const usedPlayersToday = new Set<string>();
  try {
    const today = new Date();
    const dateStr = `${today.getFullYear()}_${today.getMonth()+1}_${today.getDate()}`;
    for (const d of ["easy","medium","hard"] as Difficulty[]) {
      if (d === diff) continue;
      const dk = `statsiq_daily_${d}_${filterKey}_${dateStr}`;
      const otherPool = applyFilters(POOLS[d]);
      // Use the stored index if already played, otherwise pick what WOULD be picked
      const cached = localStorage.getItem(dk);
      let idx: number;
      if (cached !== null) {
        idx = parseInt(cached);
      } else {
        // Deterministically pick what that difficulty would select today
        const seed = dateStr + d + filterKey;
        let hash = 0;
        for (let i = 0; i < seed.length; i++) hash = ((hash << 5) - hash) + seed.charCodeAt(i);
        idx = Math.abs(hash) % otherPool.length;
      }
      if (idx >= 0 && idx < otherPool.length) usedPlayersToday.add(otherPool[idx].player);
    }
  } catch {}
  const puzzle = pickTodaysPuzzle(pool, diff, filterKey, usedPlayersToday);
  const { player, sport, answer, stats, ctx, clues } = puzzle;
  const wrongCount = guesses.filter(g => !g.ok).length;

  const toggleSport = (e: string) => setFilter(prev => { const n = new Set(prev); n.has(e) ? n.delete(e) : n.add(e); try { localStorage.setItem("statsiq_filter", JSON.stringify([...n])); } catch {} return n; });
  const toggleEra = (e: Era) => setEraFilter(prev => { const n = new Set(prev); n.has(e) ? n.delete(e) : n.add(e); try { localStorage.setItem("statsiq_era_filter", JSON.stringify([...n])); } catch {} return n; });

  const filterLabel = () => {
    const parts = [];
    if (eraFilter.size > 0) parts.push([...eraFilter].map(e => ERA_CONFIG[e].icon).join(""));
    if (filter.size > 0) parts.push([...filter].join(""));
    return parts.length > 0 ? parts.join(" ") : "ALL";
  };
  const hasFilter = filter.size > 0 || eraFilter.size > 0;

  // ── SCORING ──────────────────────────────────────────────────────────────────
  // Max possible: Hard(5x) + All eras(2x) + 1st guess(1000) = 10,000
  const GUESS_POINTS: Record<number, number> = { 1: 1000, 2: 750, 3: 500, 4: 300, 5: 150, 6: 50 };
  const DIFF_MULT: Record<Difficulty, number> = { easy: 1, medium: 2, hard: 5 };

  const calcScore = (guessNum: number): number => {
    const base = GUESS_POINTS[guessNum] || 0;
    const diffMult = DIFF_MULT[diff];
    const eraCount = eraFilter.size === 0 ? 3 : eraFilter.size;
    const eraMult = eraCount === 3 ? 2 : eraCount === 2 ? 1.5 : 1;
    const sportCount = filter.size === 0 ? SPORTS.length : filter.size;
    const sportMult = sportCount >= SPORTS.length ? 1 : sportCount >= 4 ? 0.85 : sportCount >= 2 ? 0.7 : 0.5;
    return Math.round(base * diffMult * eraMult * sportMult);
  };

  const [totalScore, setTotalScore] = useState<number>(() => {
    try { return parseInt(localStorage.getItem("statsiq_score") || "0"); } catch { return 0; }
  });
  const [todayScore, setTodayScore] = useState<number | null>(initState.todayScore);
  const [scoreBreakdown, setScoreBreakdown] = useState<{ base: number; diffMult: number; eraMult: number; sportMult: number; final: number } | null>(null);

  const awardScore = (guessNum: number) => {
    const base = GUESS_POINTS[guessNum] || 0;
    const diffMult = DIFF_MULT[diff];
    const eraCount = eraFilter.size === 0 ? 3 : eraFilter.size;
    const eraMult = eraCount === 3 ? 2 : eraCount === 2 ? 1.5 : 1;
    const sportCount = filter.size === 0 ? SPORTS.length : filter.size;
    const sportMult = sportCount >= SPORTS.length ? 1 : sportCount >= 4 ? 0.85 : sportCount >= 2 ? 0.7 : 0.5;
    const final = Math.round(base * diffMult * eraMult * sportMult);
    setScoreBreakdown({ base, diffMult, eraMult, sportMult, final });
    setTodayScore(final);
    const newTotal = totalScore + final;
    setTotalScore(newTotal);
    const today = new Date();
    const key = `statsiq_day_${today.getFullYear()}_${today.getMonth()+1}_${today.getDate()}_${diff}`;
    try {
      localStorage.setItem("statsiq_score", String(newTotal));
      localStorage.setItem(key, JSON.stringify({ score: final, guesses: guessNum, won: true, player, diff, date: today.toISOString() }));
      localStorage.removeItem(`statsiq_progress_${today.getFullYear()}_${today.getMonth()+1}_${today.getDate()}_${diff}`);
    } catch {}
    // Log to Supabase — use username if set, otherwise use recovery code as temp ID
    const dateStr = today.toISOString().slice(0,10);
    const tempId = username || recoveryCode;
    if (tempId) {
      sbLogPlay(tempId, dateStr, diff, sport, puzzle.era, final, guessNum, true);
      sbUpsertPlayer(tempId, newTotal, Math.max(streakData.current, streakData.best));
    }
    return final;
  };

  // Reset game state when difficulty or filters change
  const prevDiffRef = useRef(diff);
  const prevFilterRef = useRef(filterKey);
  useEffect(() => {
    const diffChanged = prevDiffRef.current !== diff;
    const filterChanged = prevFilterRef.current !== filterKey;
    prevDiffRef.current = diff;
    prevFilterRef.current = filterKey;

    if (!diffChanged && !filterChanged) return;

    // Check if already completed today
    const today = new Date();
    const key = `statsiq_day_${today.getFullYear()}_${today.getMonth()+1}_${today.getDate()}_${diff}`;
    const alreadyCompleted = (() => { try { return !!localStorage.getItem(key); } catch { return false; } })();

    if (alreadyCompleted) {
      try {
        const entry = localStorage.getItem(key);
        if (entry) {
          const data = JSON.parse(entry);
          setDone(true); setWon(data.won);
          setGuesses(Array(data.guesses).fill(null).map((_, i) =>
            i === data.guesses - 1 && data.won ? { text: data.player, ok: true } : { text: "• • •", ok: false }
          ));
          setTodayScore(data.score);
          setScoreBreakdown(null);
          setInput(""); setMsg("");
          setVisible(true);
          return;
        }
      } catch {}
      setDone(true); setWon(false);
      setGuesses([{ text: "• • •", ok: false }]);
      setVisible(true);
      return;
    }

    setGuesses([]); setInput(""); setDone(false); setWon(false); setMsg("");
    setTodayScore(null); setScoreBreakdown(null);

    // Restore mid-game progress if any
    const today2 = new Date();
    const progressKey = `statsiq_progress_${today2.getFullYear()}_${today2.getMonth()+1}_${today2.getDate()}_${diff}`;
    try {
      const saved = localStorage.getItem(progressKey);
      if (saved) {
        const savedGuesses = JSON.parse(saved);
        setGuesses(savedGuesses);
        setVisible(true);
        return;
      }
    } catch {}

    setVisible(false); setTimeout(() => setVisible(true), 300);
  }, [diff, filterKey]);
  useEffect(() => { setTimeout(() => setVisible(true), 300); }, []);

  // On mount, ensure done state is correct for the initial diff
  useEffect(() => {
    const today = new Date();
    const key = `statsiq_day_${today.getFullYear()}_${today.getMonth()+1}_${today.getDate()}_${diff}`;
    try {
      const entry = localStorage.getItem(key);
      if (entry) {
        const data = JSON.parse(entry);
        setDone(true); setWon(data.won);
        setGuesses(Array(data.guesses).fill(null).map((_: null, i: number) =>
          i === data.guesses - 1 && data.won ? { text: data.player, ok: true } : { text: "• • •", ok: false }
        ));
        setTodayScore(data.score);
        setVisible(true);
      }
    } catch {}
  }, []);

  // Filters lock for the entire day once any guess is made on any difficulty
  const anyDiffStarted = (): boolean => {
    if (completedToday.size > 0) return true;
    if (guesses.length > 0) return true;
    const today = new Date();
    const dateStr = `${today.getFullYear()}_${today.getMonth()+1}_${today.getDate()}`;
    try {
      for (const d of ["easy","medium","hard"] as Difficulty[]) {
        if (localStorage.getItem(`statsiq_day_${dateStr}_${d}`)) return true;
      }
    } catch {}
    return false;
  };

  const hasStarted = anyDiffStarted();

  const handleToggleSport = (sport: string) => {
    if (hasStarted) {
      toast("Filters can only be changed before your first guess of the day", 2500);
      return;
    }
    toggleSport(sport);
  };
  const handleToggleEra = (era: Era) => {
    if (hasStarted) {
      toast("Filters can only be changed before your first guess of the day", 2500);
      return;
    }
    toggleEra(era);
  };

  const toast = (m: string, ms = 1800) => { setMsg(m); setTimeout(() => setMsg(""), ms); };

  const submit = useCallback(() => {
    const g = input.trim();
    if (!g) return;
    const n = (s: string) => s.toUpperCase().replace(/[^A-Z]/g, "");
    const ng = n(g);
    const cleanAnswer = answer.replace(/_\d+$/, ""); // strip internal dedup suffix e.g. PELE_2 -> PELE
    const parts = player.split(" ");
    // Match against: answer key, first name, last name, full name, nickname aliases
    const validAnswers = [cleanAnswer, parts[0], parts[parts.length - 1], player.replace(/\s/g, "")];
    // Check nickname aliases
    const aliasMatch = NICKNAME_ALIASES[ng] && NICKNAME_ALIASES[ng].some(alias => validAnswers.some(v => n(v).includes(alias) || alias.includes(n(v))));
    // Exact match or alias match
    const exactMatch = validAnswers.some(v => v.length >= 2 && ng === n(v));
    // Fuzzy match: within 2 chars BUT only if guess is at least 4 chars (avoid false positives on short names)
    const fuzzyMatch = !exactMatch && ng.length >= 4 && validAnswers.some(v => {
      const nv = n(v);
      return nv.length >= 4 && levenshtein(ng, nv) <= 2;
    });
    const isWin = exactMatch || aliasMatch || fuzzyMatch;
    const next = [...guesses, { text: g, ok: isWin }];
    setGuesses(next); setInput("");
    if (isWin) {
      awardScore(next.length);
      markDiffCompleted(diff);
      setTimeout(() => { setDone(true); setWon(true); }, 200);
      toast(["Legendary!", "Baller!", "Nice call!", "You know your stats!"][Math.min(next.length - 1, 3)], 2500);
    } else if (next.length >= cfg.guesses) {
      const today = new Date();
      const key = `statsiq_day_${today.getFullYear()}_${today.getMonth()+1}_${today.getDate()}_${diff}`;
      try { 
        localStorage.setItem(key, JSON.stringify({ score: 0, guesses: next.length, won: false, player, diff, date: today.toISOString() }));
        localStorage.removeItem(`statsiq_progress_${today.getFullYear()}_${today.getMonth()+1}_${today.getDate()}_${diff}`);
      } catch {}
      // Log loss to Supabase — use username if set, otherwise recovery code as temp ID
      const tempId2 = username || recoveryCode;
      if (tempId2) sbLogPlay(tempId2, today.toISOString().slice(0,10), diff, sport, puzzle.era, 0, next.length, false);
      markDiffCompleted(diff);
      setTimeout(() => { setDone(true); setWon(false); }, 200);
      toast(`It was ${player}!`, 3500);
    } else {
      // Save mid-game progress so switching tabs doesn't lose guesses
      const today = new Date();
      const progressKey = `statsiq_progress_${today.getFullYear()}_${today.getMonth()+1}_${today.getDate()}_${diff}`;
      try { localStorage.setItem(progressKey, JSON.stringify(next)); } catch {}
      toast(wrongCount < clues.length ? "New clue unlocked! 👀" : "Wrong — keep guessing!");
    }
  }, [input, guesses, answer, player, clues.length, wrongCount, cfg.guesses, awardScore]);


  // Helper: draw rounded rect path (defined before generateShareCard uses it)
  const roundRect = (c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => {
    c.beginPath();
    c.moveTo(x + r, y);
    c.lineTo(x + w - r, y);
    c.quadraticCurveTo(x + w, y, x + w, y + r);
    c.lineTo(x + w, y + h - r);
    c.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    c.lineTo(x + r, y + h);
    c.quadraticCurveTo(x, y + h, x, y + h - r);
    c.lineTo(x, y + r);
    c.quadraticCurveTo(x, y, x + r, y);
    c.closePath();
  };

  const generateShareCard = async (): Promise<string> => {
    const W = 1080, H = 800;
    const canvas = document.createElement("canvas");
    canvas.width = W; canvas.height = H;
    const ctx2 = canvas.getContext("2d")!;

    // ── Background gradient ──────────────────────────────────────────
    const bg = ctx2.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, "#0a0f1a");
    bg.addColorStop(1, "#060a12");
    ctx2.fillStyle = bg;
    ctx2.fillRect(0, 0, W, H);

    // Subtle dot pattern
    ctx2.fillStyle = "rgba(255,255,255,0.018)";
    for (let x = 40; x < W; x += 48) for (let y = 40; y < H; y += 48) {
      ctx2.beginPath(); ctx2.arc(x, y, 1, 0, Math.PI*2); ctx2.fill();
    }

    // Gold accent bar top
    const goldGrad = ctx2.createLinearGradient(0, 0, W, 0);
    goldGrad.addColorStop(0, "#ffd700");
    goldGrad.addColorStop(0.5, "#ffe566");
    goldGrad.addColorStop(1, "#ffd700");
    ctx2.fillStyle = goldGrad;
    ctx2.fillRect(0, 0, W, 6);

    // ── Header ───────────────────────────────────────────────────────
    // Logo
    ctx2.font = "900 64px 'Arial Black', Arial, sans-serif";
    ctx2.fillStyle = "#ffd700";
    ctx2.letterSpacing = "8px";
    ctx2.fillText("STATSIQ", 64, 88);

    // Tagline
    ctx2.font = "400 18px Arial, sans-serif";
    ctx2.fillStyle = "#374151";
    ctx2.letterSpacing = "5px";
    ctx2.fillText("DAILY SPORTS TRIVIA", 66, 116);

    // Date (right aligned)
    const dateObj = new Date();
    const dateStr3 = dateObj.getFullYear() + "_" + (dateObj.getMonth()+1) + "_" + dateObj.getDate();
    const dateLabel = dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }).toUpperCase();
    ctx2.font = "600 20px Arial, sans-serif";
    ctx2.fillStyle = "#6b7280";
    ctx2.letterSpacing = "2px";
    ctx2.textAlign = "right";
    ctx2.fillText(dateLabel, W - 64, 88);
    ctx2.textAlign = "left";

    // ── Username + Badge + Streak row ────────────────────────────────
    const badge2 = getScoreBadge(totalScore);
    if (username) {
      // Badge pill
      const pillY = 138;
      const badgeText = badge2 ? badge2.emoji + " " + badge2.label.toUpperCase() : "";
      if (badgeText) {
        ctx2.font = "700 17px Arial, sans-serif";
        ctx2.letterSpacing = "1px";
        const pillW = ctx2.measureText(badgeText).width + 28;
        roundRect(ctx2, 64, pillY, pillW, 30, 15);
        ctx2.fillStyle = "rgba(255,215,0,0.12)";
        ctx2.fill();
        ctx2.strokeStyle = "rgba(255,215,0,0.35)";
        ctx2.lineWidth = 1;
        ctx2.stroke();
        ctx2.fillStyle = "#ffd700";
        ctx2.fillText(badgeText, 64 + 14, pillY + 21);
      }

      // Username
      const unX = badgeText ? 64 + ctx2.measureText(badgeText).width + 28 + 18 : 64;
      ctx2.font = "700 26px Arial, sans-serif";
      ctx2.fillStyle = "#e5e7eb";
      ctx2.letterSpacing = "0px";
      ctx2.fillText(username, unX, pillY + 22);

      // Total score (right side)
      ctx2.font = "700 22px Arial, sans-serif";
      ctx2.fillStyle = "#ffd700";
      ctx2.textAlign = "right";
      ctx2.letterSpacing = "0px";
      ctx2.fillText(totalScore.toLocaleString() + " pts total", W - 64, pillY + 22);
      ctx2.textAlign = "left";
    }

    // ── Streak bar ───────────────────────────────────────────────────
    if (streakData.current > 0) {
      const streakY = username ? 188 : 145;
      // Streak pill background
      const streakText = "🔥 " + streakData.current + " DAY STREAK";
      ctx2.font = "900 20px 'Arial Black', Arial, sans-serif";
      ctx2.letterSpacing = "2px";
      const spW = ctx2.measureText(streakText).width + 36;
      roundRect(ctx2, 64, streakY, spW, 34, 17);
      ctx2.fillStyle = "rgba(251,146,60,0.15)";
      ctx2.fill();
      ctx2.strokeStyle = "rgba(251,146,60,0.4)";
      ctx2.lineWidth = 1.5;
      ctx2.stroke();
      ctx2.fillStyle = "#fb923c";
      ctx2.fillText(streakText, 64 + 18, streakY + 23);
      ctx2.letterSpacing = "0px";
    }

    // Divider
    const dividerY = streakData.current > 0 ? (username ? 240 : 196) : (username ? 190 : 148);
    ctx2.strokeStyle = "rgba(255,255,255,0.07)";
    ctx2.lineWidth = 1;
    ctx2.beginPath(); ctx2.moveTo(64, dividerY); ctx2.lineTo(W - 64, dividerY); ctx2.stroke();

    // ── Difficulty rows ──────────────────────────────────────────────
    const diffs3 = [
      { key: "easy"   as const, label: "EASY",   color: "#22c55e", glow: "rgba(34,197,94,0.15)",  guesses: 3 },
      { key: "medium" as const, label: "MEDIUM", color: "#eab308", glow: "rgba(234,179,8,0.15)",  guesses: 3 },
      { key: "hard"   as const, label: "HARD",   color: "#ef4444", glow: "rgba(239,68,68,0.15)",  guesses: 3 },
    ];

    let dayTotal3 = 0;
    const rowH = 158, rowStart = dividerY + 18, rowGap = 170;

    diffs3.forEach((d, ri) => {
      const rowY = rowStart + ri * rowGap;
      let entry: {score:number,guesses:number,won:boolean,player:string} | null = null;
      try { const raw = localStorage.getItem("statsiq_day_" + dateStr3 + "_" + d.key); if (raw) entry = JSON.parse(raw); } catch {}

      const played = !!entry;

      // Card background with glow for played
      if (played) {
        ctx2.shadowColor = d.color;
        ctx2.shadowBlur = 18;
      }
      roundRect(ctx2, 48, rowY, W - 96, rowH, 16);
      ctx2.fillStyle = played ? d.glow : "rgba(255,255,255,0.01)";
      ctx2.fill();
      ctx2.shadowBlur = 0;

      // Card border
      ctx2.strokeStyle = played ? d.color + "55" : "rgba(255,255,255,0.05)";
      ctx2.lineWidth = played ? 1.5 : 1;
      roundRect(ctx2, 48, rowY, W - 96, rowH, 16);
      ctx2.stroke();

      // Left accent stripe
      if (played) {
        roundRect(ctx2, 48, rowY, 5, rowH, 3);
        ctx2.fillStyle = d.color;
        ctx2.fill();
      }

      // Diff label pill
      ctx2.font = "900 15px 'Arial Black', Arial, sans-serif";
      ctx2.letterSpacing = "3px";
      const labelW = ctx2.measureText(d.label).width + 20;
      roundRect(ctx2, 74, rowY + 22, labelW, 26, 6);
      ctx2.fillStyle = played ? d.color + "22" : "rgba(255,255,255,0.04)";
      ctx2.fill();
      ctx2.fillStyle = played ? d.color : "#374151";
      ctx2.fillText(d.label, 74 + 10, rowY + 40);

      if (played && entry) {
        // Player name — truncate if too long
        let playerName = entry.player.toUpperCase();
        ctx2.font = "700 30px Arial, sans-serif";
        ctx2.letterSpacing = "0.5px";
        while (ctx2.measureText(playerName).width > 580 && playerName.length > 4) {
          playerName = playerName.slice(0, -1);
        }
        if (playerName !== entry.player.toUpperCase()) playerName += "…";
        ctx2.fillStyle = entry.won ? "#ffffff" : "#6b7280";
        ctx2.fillText(playerName, 74, rowY + 88);

        // Outcome text
        ctx2.font = "400 16px Arial, sans-serif";
        ctx2.letterSpacing = "1px";
        ctx2.fillStyle = entry.won ? d.color + "cc" : "#4b5563";
        const outcomeText = entry.won ? "SOLVED IN " + entry.guesses + (entry.guesses === 1 ? " GUESS" : " GUESSES") : "NOT SOLVED";
        ctx2.fillText(outcomeText, 74, rowY + 112);

        // Guess squares
        const sqSize = 32, sqGap = 8;
        for (let g = 0; g < d.guesses; g++) {
          const sqX = 74 + g * (sqSize + sqGap);
          const sqY3 = rowY + 126;
          let col = "rgba(255,255,255,0.05)";
          if (g < entry.guesses - 1) col = "rgba(239,68,68,0.55)";
          else if (g === entry.guesses - 1) col = entry.won ? d.color + "cc" : "rgba(239,68,68,0.55)";
          ctx2.fillStyle = col;
          roundRect(ctx2, sqX, sqY3, sqSize, sqSize, 6);
          ctx2.fill();
          // Add checkmark / x in square
          ctx2.font = "700 16px Arial, sans-serif";
          ctx2.letterSpacing = "0px";
          ctx2.textAlign = "center";
          if (g < entry.guesses - 1) { ctx2.fillStyle = "rgba(255,255,255,0.5)"; ctx2.fillText("✕", sqX + sqSize/2, sqY3 + sqSize/2 + 6); }
          else if (g === entry.guesses - 1) { ctx2.fillStyle = "#fff"; ctx2.fillText(entry.won ? "✓" : "✕", sqX + sqSize/2, sqY3 + sqSize/2 + 6); }
          ctx2.textAlign = "left";
        }

        // Score — big, right side
        if (entry.score > 0) {
          ctx2.font = "900 44px 'Arial Black', Arial, sans-serif";
          ctx2.fillStyle = entry.won ? d.color : "#374151";
          ctx2.letterSpacing = "0px";
          ctx2.textAlign = "right";
          ctx2.fillText("+" + entry.score.toLocaleString(), W - 74, rowY + 94);
          ctx2.font = "500 16px Arial, sans-serif";
          ctx2.fillStyle = entry.won ? d.color + "99" : "#374151";
          ctx2.letterSpacing = "2px";
          ctx2.fillText("POINTS", W - 74, rowY + 116);
          ctx2.textAlign = "left";
          dayTotal3 += entry.score;
        }
      } else {
        // Not played
        ctx2.font = "500 22px Arial, sans-serif";
        ctx2.fillStyle = "#1f2937";
        ctx2.letterSpacing = "3px";
        ctx2.fillText("NOT PLAYED YET", 74, rowY + 94);
      }
    });

    // ── Footer ───────────────────────────────────────────────────────
    const footY = H - 32;

    // Today total (left)
    if (dayTotal3 > 0) {
      ctx2.font = "700 20px Arial, sans-serif";
      ctx2.fillStyle = "#9ca3af";
      ctx2.letterSpacing = "1px";
      ctx2.fillText("TODAY  ", 64, footY);
      const todayLabelW = ctx2.measureText("TODAY  ").width;
      ctx2.font = "900 20px 'Arial Black', Arial, sans-serif";
      ctx2.fillStyle = "#ffd700";
      ctx2.letterSpacing = "0px";
      ctx2.fillText("+" + dayTotal3.toLocaleString() + " pts", 64 + todayLabelW, footY);
    }

    // URL (right)
    ctx2.font = "700 20px Arial, sans-serif";
    ctx2.fillStyle = "#ffd700";
    ctx2.letterSpacing = "3px";
    ctx2.textAlign = "right";
    ctx2.fillText("STATSIQ.IO", W - 64, footY);
    ctx2.textAlign = "left";

    ctx2.letterSpacing = "0px";
    return canvas.toDataURL("image/png");
  };

  // Helper: draw rounded rect path

  const buildDayShareText = () => {
    const date = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const today = new Date();
    const dateStr = `${today.getFullYear()}_${today.getMonth()+1}_${today.getDate()}`;
    const badge = getScoreBadge(totalScore);
    const badgeStr = badge ? ` ${badge.emoji}` : "";
    const userLine = username ? `${username}${badgeStr}` : `statsiq.io`;
    const streakLine = streakData.current > 1 ? `🔥 ${streakData.current} day streak\n` : "";

    const diffs: Difficulty[] = ["easy", "medium", "hard"];
    // Easy=green, Medium=yellow, Hard=red
    const diffEmoji: Record<Difficulty, string> = { easy: "🟢", medium: "🟡", hard: "🔴" };
    let dayTotal = 0;
    const lines: string[] = [];

    for (const d of diffs) {
      try {
        const entry = localStorage.getItem(`statsiq_day_${dateStr}_${d}`);
        if (entry) {
          const data = JSON.parse(entry);
          const dc = DIFF_CONFIG[d];
          const grid = Array(dc.guesses).fill(null).map((_,i) => {
            if (i < data.guesses - 1) return "🟥";
            if (i === data.guesses - 1) return data.won ? "🟩" : "🟥";
            return "⬛";
          }).join("");
          const pts = data.score > 0 ? `  +${data.score.toLocaleString()}` : "";
          lines.push(`${diffEmoji[d]} ${grid}${pts}`);
          dayTotal += data.score || 0;
        } else {
          lines.push(`${diffEmoji[d]} ⬛⬛⬛`);
        }
      } catch {
        lines.push(`${diffEmoji[d]} ⬛⬛⬛`);
      }
    }

    const totalLine = dayTotal > 0 ? `\n🏆 ${dayTotal.toLocaleString()} pts today` : "";
    return `📊 StatsIQ  ${date}\n${userLine}\n${streakLine}\n${lines.join("\n")}${totalLine}\n\nstatsiq.io`;
  };

  const share = async () => {
    try {
      const dataUrl = await generateShareCard();
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], "statsiq.png", { type: "image/png" });
      const shareText = buildDayShareText();

      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "StatsIQ — Daily Sports Trivia",
          text: shareText,
          files: [file],
        });
        return;
      }

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "statsiq-result.png";
      link.click();

      await navigator.clipboard?.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const shareText = buildDayShareText();
      navigator.clipboard?.writeText(shareText)
        .then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
    }
  };


  const handleEmailSubmit = () => {
    if (!emailInput.includes("@")) return;
    try {
      localStorage.setItem("statsiq_email", emailInput);
      localStorage.setItem("statsiq_email_submitted", "1");
    } catch {}
    setEmailSubmitted(true);
    sbSaveEmail(emailInput, username);
    toast("You're in! 🎉 See you tomorrow.", 3000);
  };

  // Score display helpers
  const fmtMult = (m: number) => m === 1 ? "×1" : m === 1.5 ? "×1.5" : m === 2 ? "×2" : m === 5 ? "×5" : `×${m}`;
  const multLabel = (m: number, type: string) => {
    if (type === "diff") return m === 5 ? "Hard" : m === 2 ? "Medium" : "Easy";
    if (type === "era") return m === 2 ? "All eras" : m === 1.5 ? "2 eras" : "1 era";
    if (type === "sport") return m === 1 ? "All sports" : m >= 0.95 ? "Most sports" : m >= 0.85 ? "Many sports" : m >= 0.75 ? "Some sports" : "Few sports";
    return "";
  };

  return (
    <div style={{ minHeight:"100vh", background:"#080c14", display:"flex", flexDirection:"column", alignItems:"center", fontFamily:"'Barlow Condensed', sans-serif", paddingBottom:40 }}>
      <div style={{ position:"fixed", top:0, left:"50%", transform:"translateX(-50%)", width:600, height:300, background:`radial-gradient(ellipse, ${cfg.bg} 0%, transparent 70%)`, pointerEvents:"none", transition:"background 0.4s" }} />

      {showFilter && <FilterModal selectedSports={filter} selectedEras={eraFilter} onToggleSport={handleToggleSport} onToggleEra={handleToggleEra} onClose={() => setShowFilter(false)} totalCount={totalFiltered} />}
      {showHistory && <ScoreHistoryModal totalScore={totalScore} initialTab={historyTab} onClose={() => setShowHistory(false)} onReset={() => {
        // Delete from Supabase so they disappear from leaderboard
        if (username) {
          sbFetch(`players?username=eq.${encodeURIComponent(username)}`, { method: "DELETE" }).catch(() => {});
          sbFetch(`plays?username=eq.${encodeURIComponent(username)}`, { method: "DELETE" }).catch(() => {});
        } else {
          sbFetch(`players?username=eq.anonymous`, { method: "DELETE" }).catch(() => {});
        }
        // Clear all statsiq localStorage keys
        try {
          const keys = [];
          for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i);
            if (k && k.startsWith("statsiq_")) keys.push(k);
          }
          keys.forEach(k => localStorage.removeItem(k));
        } catch {}
        // Reset all in-memory state so UI reflects fresh start immediately
        setTotalScore(0);
        setCompletedToday(new Set());
        setDone(false);
        setWon(false);
        setGuesses([]);
        setInput("");
        setTodayScore(null);
        setScoreBreakdown(null);
        setMsg("");
        setUsername("");
        setGlobalRank(null);
        setRecoveryCode("");
        setShowHistory(false);
      }} />}

      {/* SPLASH SCREEN */}
      {showSplash && (
        <div style={{ position:"fixed", inset:0, zIndex:300, display:"flex", alignItems:"center", justifyContent:"center", background:"#080c14", overflowY:"auto" }}>
          <div style={{ position:"absolute", top:"-20%", left:"50%", transform:"translateX(-50%)", width:600, height:400, background:"radial-gradient(ellipse, rgba(255,200,0,0.12) 0%, transparent 70%)", pointerEvents:"none" }} />

          {/* STEP 0 — WELCOME */}
          {onboardingStep === 0 && (
            <div style={{ textAlign:"center", padding:"0 32px", maxWidth:360 }}>
              <div style={{ fontSize:"3.5rem", marginBottom:16 }}>📊</div>
              <h1 style={{ margin:"0 0 6px", fontFamily:"'Bebas Neue',sans-serif", fontSize:"3rem", color:"#ffd700", letterSpacing:"0.2em", lineHeight:1 }}>STATSIQ</h1>
              <p style={{ margin:"0 0 8px", color:"#6b7280", fontSize:"0.7rem", letterSpacing:"0.3em" }}>DAILY SPORTS TRIVIA</p>
              <p style={{ margin:"0 0 32px", color:"#9ca3af", fontSize:"0.9rem", lineHeight:1.6 }}>
                3 puzzles a day — Easy, Medium, and Hard.<br/>Guess the athlete from a real stat line in 3 tries.
              </p>
              <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:28 }}>
                {[["📊","Guess the athlete from a real stat line"],["🎯","3 daily puzzles — Easy, Medium, and Hard"],["🔍","Filter by sport and era to personalize your game"],["⭐","Score points and build a daily streak"]].map(([icon,text],i) => (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:12, background:"rgba(255,255,255,0.04)", borderRadius:10, padding:"10px 14px", border:"1px solid rgba(255,255,255,0.07)" }}>
                    <span style={{ fontSize:"1.2rem", flexShrink:0 }}>{icon}</span>
                    <span style={{ color:"#d1d5db", fontSize:"0.82rem", textAlign:"left" }}>{text}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => setOnboardingStep(1)} style={{ width:"100%", padding:"14px", borderRadius:12, border:"none", background:"linear-gradient(135deg, #ffd700, #f59e0b)", color:"#0a0c10", fontWeight:900, fontSize:"1.1rem", cursor:"pointer", fontFamily:"'Bebas Neue',sans-serif", letterSpacing:"0.15em", boxShadow:"0 4px 30px rgba(255,200,0,0.4)" }}>
                GET STARTED →
              </button>
              <button onClick={() => { setShowSplash(false); setOnboardingStep(-1); try { localStorage.setItem("statsiq_visited","1"); } catch {} setShowRecoverModal(true); }} style={{ marginTop:12, background:"none", border:"none", color:"#374151", cursor:"pointer", fontSize:"0.7rem", fontFamily:"'Barlow Condensed',sans-serif", letterSpacing:"0.1em", textDecoration:"underline" }}>
                Already have an account? Recover it →
              </button>
            </div>
          )}

          {/* STEP 1 — PICK SPORTS */}
          {onboardingStep === 1 && (
            <div style={{ textAlign:"center", padding:"0 28px", maxWidth:380, width:"100%" }}>
              <p style={{ margin:"0 0 4px", color:"#6b7280", fontSize:"0.65rem", letterSpacing:"0.3em" }}>STEP 1 OF 2</p>
              <h2 style={{ margin:"0 0 6px", fontFamily:"'Bebas Neue',sans-serif", fontSize:"2rem", color:"#fff", letterSpacing:"0.1em" }}>What sports do you know?</h2>
              <p style={{ margin:"0 0 24px", color:"#6b7280", fontSize:"0.82rem" }}>Pick the ones you want to see. Leave all unselected to get every sport.</p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:24 }}>
                {SPORTS.map(s => {
                  const label = SPORT_LABELS[s];
                  const active = filter.has(s);
                  return (
                    <button key={s} onClick={() => {
                      const next = new Set(filter);
                      if (next.has(s)) next.delete(s); else next.add(s);
                      setFilter(next);
                      try { localStorage.setItem("statsiq_filter", JSON.stringify([...next])); } catch {}
                    }} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6, padding:"16px 10px", borderRadius:12, border:`2px solid ${active ? "#ffd700" : "rgba(255,255,255,0.08)"}`, background:active ? "rgba(255,215,0,0.12)" : "rgba(255,255,255,0.03)", cursor:"pointer", transition:"all 0.15s" }}>
                      <span style={{ fontSize:"1.8rem" }}>{s}</span>
                      <span style={{ color: active ? "#ffd700" : "#9ca3af", fontSize:"0.72rem", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, letterSpacing:"0.1em" }}>{label.toUpperCase()}</span>
                      {active && <span style={{ fontSize:"0.6rem", color:"#ffd700" }}>✓ SELECTED</span>}
                    </button>
                  );
                })}
              </div>
              <p style={{ margin:"0 0 16px", color:"#4b5563", fontSize:"0.72rem" }}>
                {filter.size === 0 ? "All sports selected — showing everything" : `${filter.size} sport${filter.size > 1 ? "s" : ""} selected`}
              </p>
              <button onClick={() => setOnboardingStep(2)} style={{ width:"100%", padding:"14px", borderRadius:12, border:"none", background:"linear-gradient(135deg, #ffd700, #f59e0b)", color:"#0a0c10", fontWeight:900, fontSize:"1.1rem", cursor:"pointer", fontFamily:"'Bebas Neue',sans-serif", letterSpacing:"0.15em", boxShadow:"0 4px 30px rgba(255,200,0,0.3)" }}>
                NEXT →
              </button>
            </div>
          )}

          {/* STEP 2 — PICK ERA */}
          {onboardingStep === 2 && (
            <div style={{ textAlign:"center", padding:"0 28px", maxWidth:380, width:"100%" }}>
              <p style={{ margin:"0 0 4px", color:"#6b7280", fontSize:"0.65rem", letterSpacing:"0.3em" }}>STEP 2 OF 2</p>
              <h2 style={{ margin:"0 0 6px", fontFamily:"'Bebas Neue',sans-serif", fontSize:"2rem", color:"#fff", letterSpacing:"0.1em" }}>Which era is your era?</h2>
              <p style={{ margin:"0 0 24px", color:"#6b7280", fontSize:"0.82rem" }}>Pick the eras you want to see. Leave all unselected for the full range.</p>
              <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:24 }}>
                {(["modern","classic","legends"] as Era[]).map(era => {
                  const cfg2 = ERA_CONFIG[era];
                  const active = eraFilter.has(era);
                  return (
                    <button key={era} onClick={() => {
                      const next = new Set(eraFilter);
                      if (next.has(era)) next.delete(era); else next.add(era);
                      setEraFilter(next);
                      try { localStorage.setItem("statsiq_era_filter", JSON.stringify([...next])); } catch {}
                    }} style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 16px", borderRadius:12, border:`2px solid ${active ? cfg2.activeBorder : "rgba(255,255,255,0.08)"}`, background:active ? cfg2.activeBg : "rgba(255,255,255,0.03)", cursor:"pointer", textAlign:"left", transition:"all 0.15s" }}>
                      <span style={{ fontSize:"1.6rem", flexShrink:0 }}>{cfg2.icon}</span>
                      <div style={{ flex:1 }}>
                        <div style={{ color: active ? "#fff" : "#9ca3af", fontFamily:"'Bebas Neue',sans-serif", fontSize:"1rem", letterSpacing:"0.1em" }}>{cfg2.label} {active && "✓"}</div>
                        <div style={{ color:"#4b5563", fontSize:"0.72rem", marginTop:2 }}>{cfg2.range} · {cfg2.examples}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
              <p style={{ margin:"0 0 16px", color:"#4b5563", fontSize:"0.72rem" }}>
                {eraFilter.size === 0 ? "All eras selected — showing everything" : `${eraFilter.size} era${eraFilter.size > 1 ? "s" : ""} selected`}
              </p>
              <button onClick={() => {
                setShowSplash(false);
                setOnboardingStep(-1);
                try { localStorage.setItem("statsiq_visited", "1"); } catch {}
                if (!username) { setUsernameInput(""); setShowUsernameModal(true); }
              }} style={{ width:"100%", padding:"14px", borderRadius:12, border:"none", background:"linear-gradient(135deg, #ffd700, #f59e0b)", color:"#0a0c10", fontWeight:900, fontSize:"1.1rem", cursor:"pointer", fontFamily:"'Bebas Neue',sans-serif", letterSpacing:"0.15em", boxShadow:"0 4px 30px rgba(255,200,0,0.3)" }}>
                LET'S PLAY →
              </button>
              <button onClick={() => setOnboardingStep(1)} style={{ marginTop:10, width:"100%", padding:"10px", borderRadius:12, border:"1px solid rgba(255,255,255,0.08)", background:"transparent", color:"#6b7280", cursor:"pointer", fontSize:"0.78rem", fontFamily:"'Barlow Condensed',sans-serif", letterSpacing:"0.1em" }}>
                ← BACK
              </button>
            </div>
          )}

        </div>
      )}



      {/* USERNAME MODAL */}
      {showUsernameModal && (
        <div style={{ position:"fixed", inset:0, zIndex:200, display:"flex", alignItems:"center", justifyContent:"center" }} onClick={() => setShowUsernameModal(false)}>
          <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.8)", backdropFilter:"blur(4px)" }} />
          <div style={{ position:"relative", background:"#0f1629", border:"1px solid rgba(255,255,255,0.12)", borderRadius:16, padding:"24px 22px", width:300 }} onClick={e => e.stopPropagation()}>
            <h3 style={{ margin:"0 0 6px", color:"#fff", fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.3rem", letterSpacing:"0.1em" }}>SET USERNAME</h3>
            <p style={{ margin:"0 0 16px", color:"#4b5563", fontSize:"0.7rem" }}>Your username appears on the global leaderboard</p>
            <input
              value={usernameInput}
              onChange={e => setUsernameInput(e.target.value.slice(0, 20))}
              onKeyDown={e => { if (e.key === "Enter" && usernameInput.trim().length >= 2) { const u = usernameInput.trim(); const prev = username; setUsername(u); try { localStorage.setItem("statsiq_username", u); } catch {} setShowUsernameModal(false); if (!prev) { let code = recoveryCode; if (!code) { code = generateRecoveryCode(); setRecoveryCode(code); try { localStorage.setItem("statsiq_recovery_code", code); } catch {} } sbBackfillUsername(u, code); sbUpsertPlayer(u, totalScore, streakData.current, code); setShowRecoveryCode(true); } else { sbUpsertPlayer(u, totalScore, streakData.current, recoveryCode || undefined); } } }}
              placeholder="Enter username..."
              maxLength={20}
              autoFocus
              style={{ width:"100%", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,200,0,0.3)", borderRadius:10, padding:"12px 14px", color:"#fff", fontSize:"16px", fontFamily:"'Barlow Condensed',sans-serif", outline:"none", marginBottom:10, boxSizing:"border-box" as const }}
            />
            <p style={{ margin:"0 0 14px", color:"#374151", fontSize:"0.65rem", textAlign:"right" }}>{usernameInput.length}/20</p>
            <div style={{ display:"flex", gap:8 }}>
              <button onClick={() => setShowUsernameModal(false)} style={{ flex:1, padding:"10px", borderRadius:8, border:"1px solid rgba(255,255,255,0.1)", background:"transparent", color:"#9ca3af", cursor:"pointer", fontFamily:"'Barlow Condensed',sans-serif" }}>Cancel</button>
              <button
                disabled={usernameInput.trim().length < 2}
                onClick={() => { const u = usernameInput.trim(); const prev = username; setUsername(u); try { localStorage.setItem("statsiq_username", u); } catch {} setShowUsernameModal(false); if (!prev) { let code = recoveryCode; if (!code) { code = generateRecoveryCode(); setRecoveryCode(code); try { localStorage.setItem("statsiq_recovery_code", code); } catch {} } sbBackfillUsername(u, code); sbUpsertPlayer(u, totalScore, streakData.current, code); setShowRecoveryCode(true); } else { sbUpsertPlayer(u, totalScore, streakData.current, recoveryCode || undefined); } }}
                style={{ flex:2, padding:"10px", borderRadius:8, border:"none", background: usernameInput.trim().length >= 2 ? "rgba(255,200,0,0.9)" : "rgba(100,100,100,0.3)", color: usernameInput.trim().length >= 2 ? "#0a0c10" : "#555", cursor: usernameInput.trim().length >= 2 ? "pointer" : "not-allowed", fontWeight:900, fontFamily:"'Bebas Neue',sans-serif", letterSpacing:"0.1em" }}>
                SAVE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RECOVERY CODE DISPLAY — shown once after first username set */}
      {showRecoveryCode && recoveryCode && (
        <div style={{ position:"fixed", inset:0, zIndex:500, display:"flex", alignItems:"center", justifyContent:"center" }} onClick={() => setShowRecoveryCode(false)}>
          <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.85)", backdropFilter:"blur(4px)" }} />
          <div style={{ position:"relative", background:"#0f1629", border:"1px solid rgba(255,215,0,0.3)", borderRadius:16, padding:"28px 24px", width:"min(320px,90vw)", textAlign:"center" }} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize:"2rem", marginBottom:10 }}>🔑</div>
            <h3 style={{ margin:"0 0 6px", color:"#ffd700", fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.4rem", letterSpacing:"0.1em" }}>YOUR RECOVERY CODE</h3>
            <p style={{ margin:"0 0 18px", color:"#6b7280", fontSize:"0.72rem", lineHeight:1.5 }}>Save this somewhere. If you ever lose your progress, enter this code to restore your score and streak.</p>

            <div style={{ background:"rgba(255,215,0,0.08)", border:"2px solid rgba(255,215,0,0.4)", borderRadius:12, padding:"16px", marginBottom:18 }}>
              <p style={{ margin:0, color:"#ffd700", fontFamily:"'Bebas Neue',sans-serif", fontSize:"2rem", letterSpacing:"0.3em" }}>{recoveryCode}</p>
            </div>

            <button onClick={() => { navigator.clipboard?.writeText(recoveryCode); toast("Code copied! 📋", 2000); }} style={{ width:"100%", padding:"11px", borderRadius:8, border:"none", background:"rgba(255,200,0,0.9)", color:"#0a0c10", fontWeight:900, fontFamily:"'Bebas Neue',sans-serif", letterSpacing:"0.1em", cursor:"pointer", fontSize:"0.9rem", marginBottom:8 }}>
              📋 COPY CODE
            </button>
            <button onClick={() => setShowRecoveryCode(false)} style={{ width:"100%", padding:"10px", borderRadius:8, border:"1px solid rgba(255,255,255,0.1)", background:"transparent", color:"#6b7280", cursor:"pointer", fontFamily:"'Barlow Condensed',sans-serif", fontSize:"0.82rem" }}>
              I've saved it — close
            </button>
          </div>
        </div>
      )}

      {/* RECOVER ACCOUNT MODAL */}
      {showRecoverModal && (
        <div style={{ position:"fixed", inset:0, zIndex:500, display:"flex", alignItems:"center", justifyContent:"center" }} onClick={() => { setShowRecoverModal(false); setRecoverError(""); }}>
          <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.85)", backdropFilter:"blur(4px)" }} />
          <div style={{ position:"relative", background:"#0f1629", border:"1px solid rgba(255,255,255,0.12)", borderRadius:16, padding:"28px 24px", width:"min(320px,90vw)", textAlign:"center" }} onClick={e => e.stopPropagation()}>
            <button onClick={() => { setShowRecoverModal(false); setRecoverError(""); }} style={{ position:"absolute", top:14, right:14, background:"none", border:"none", color:"#4b5563", cursor:"pointer", fontSize:"1.2rem" }}>✕</button>
            <div style={{ fontSize:"2rem", marginBottom:10 }}>🔑</div>
            <h3 style={{ margin:"0 0 6px", color:"#fff", fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.3rem", letterSpacing:"0.1em" }}>RECOVER YOUR ACCOUNT</h3>
            <p style={{ margin:"0 0 18px", color:"#6b7280", fontSize:"0.72rem" }}>Enter your recovery code to restore your score and streak</p>

            <input
              value={recoverInput}
              onChange={e => { setRecoverInput(e.target.value.toUpperCase()); setRecoverError(""); }}
              placeholder="STAT-XXXX"
              maxLength={9}
              style={{ width:"100%", padding:"13px", borderRadius:10, border:`1px solid ${recoverError ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.15)"}`, background:"rgba(255,255,255,0.05)", color:"#ffd700", fontSize:"1.2rem", fontFamily:"'Bebas Neue',sans-serif", letterSpacing:"0.3em", textAlign:"center", marginBottom:8, boxSizing:"border-box" as const, outline:"none" }}
              autoFocus
            />
            {recoverError && <p style={{ margin:"0 0 8px", color:"#ef4444", fontSize:"0.7rem" }}>{recoverError}</p>}

            <button
              disabled={recoverLoading || recoverInput.length < 8}
              onClick={async () => {
                setRecoverLoading(true);
                const data = await sbRecoverAccount(recoverInput);
                setRecoverLoading(false);
                if (!data) {
                  setRecoverError("Code not found. Check for typos and try again.");
                  return;
                }
                // Restore score, username, streak to localStorage and state
                try {
                  localStorage.setItem("statsiq_score", String(data.total_score));
                  localStorage.setItem("statsiq_username", data.username);
                  localStorage.setItem("statsiq_recovery_code", recoverInput);
                } catch {}
                setTotalScore(data.total_score);
                setUsername(data.username);
                setRecoveryCode(recoverInput);
                setShowRecoverModal(false);
                setRecoverInput("");
                toast(`Welcome back ${data.username}! Score restored 🎉`, 3500);
              }}
              style={{ width:"100%", padding:"12px", borderRadius:10, border:"none", background: recoverInput.length >= 8 ? "linear-gradient(135deg,#ffd700,#f59e0b)" : "rgba(100,100,100,0.3)", color: recoverInput.length >= 8 ? "#0a0c10" : "#555", fontWeight:900, fontFamily:"'Bebas Neue',sans-serif", letterSpacing:"0.1em", cursor: recoverInput.length >= 8 ? "pointer" : "not-allowed", fontSize:"0.9rem" }}>
              {recoverLoading ? "LOOKING UP..." : "RESTORE MY ACCOUNT"}
            </button>
          </div>
        </div>
      )}

      {/* LEADERBOARD MODAL */}
      {showLeaderboard && (
        <div style={{ position:"fixed", inset:0, zIndex:200, display:"flex", alignItems:"center", justifyContent:"center" }} onClick={() => setShowLeaderboard(false)}>
          <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.8)", backdropFilter:"blur(4px)" }} />
          <div style={{ position:"relative", background:"#0f1629", border:"1px solid rgba(255,255,255,0.12)", borderRadius:16, padding:"24px 20px", width:320, maxHeight:"88vh", overflowY:"auto" }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowLeaderboard(false)} style={{ position:"absolute", top:14, right:14, background:"none", border:"none", color:"#6b7280", cursor:"pointer", fontSize:"1.3rem" }}>✕</button>

            <div style={{ fontSize:"2rem", marginBottom:8 }}>🏆</div>
            <h3 style={{ margin:"0 0 16px", color:"#ffd700", fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.5rem", letterSpacing:"0.15em" }}>LEADERBOARD</h3>

            {/* Tabs */}
            <div style={{ display:"flex", gap:6, marginBottom:14 }}>
              {(["alltime","today"] as const).map(t => (
                <button key={t} onClick={() => {
                  setLbType(t);
                  setLbLoading(true);
                  sbGetLeaderboard(t).then(d => { setLbData(d); setLbLoading(false); });
                }} style={{ flex:1, padding:"7px", borderRadius:8, border:`1px solid ${lbType===t?"rgba(255,215,0,0.5)":"rgba(255,255,255,0.08)"}`, background:lbType===t?"rgba(255,215,0,0.1)":"transparent", color:lbType===t?"#ffd700":"#4b5563", cursor:"pointer", fontSize:"0.72rem", fontFamily:"'Bebas Neue',sans-serif", letterSpacing:"0.1em" }}>
                  {t === "alltime" ? "ALL TIME" : "TODAY"}
                </button>
              ))}
            </div>

            {/* Leaderboard list */}
            <div style={{ background:"rgba(255,255,255,0.03)", borderRadius:10, overflow:"hidden", marginBottom:14, border:"1px solid rgba(255,255,255,0.07)", minHeight:180 }}>
              {lbLoading ? (
                <div style={{ padding:"40px 0", textAlign:"center", color:"#374151", fontSize:"0.75rem" }}>Loading...</div>
              ) : lbData.length === 0 ? (
                <div style={{ padding:"30px 16px", textAlign:"center" }}>
                  <p style={{ margin:"0 0 6px", color:"#374151", fontSize:"0.75rem" }}>No scores yet today.</p>
                  <p style={{ margin:0, color:"#2d3748", fontSize:"0.68rem" }}>Be the first on the board!</p>
                </div>
              ) : (
                lbData.slice(0, lbType === "today" ? 10 : 25).map((row, i) => {
                  const isYou = row.username === (username || "anonymous");
                  return (
                    <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 14px", borderBottom: i < lbData.length-1 ? "1px solid rgba(255,255,255,0.05)" : "none", background: isYou ? "rgba(255,200,0,0.06)" : "transparent" }}>
                      <span style={{ color: i===0?"#ffd700":i===1?"#9ca3af":i===2?"#cd7f32":"#374151", fontFamily:"'Bebas Neue',sans-serif", fontSize:"0.88rem", width:22, flexShrink:0 }}>#{i+1}</span>
                      <span style={{ flex:1, color:isYou?"#ffd700":"#d1d5db", fontSize:"0.82rem", fontWeight:isYou?700:400, textAlign:"left", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                        {row.username}{isYou ? " (you)" : ""}{row.is_pro && <span style={{ marginLeft:4, fontSize:"0.65rem" }}>⭐</span>}
                      </span>
                      {lbType === "alltime" && row.streak != null && Number(row.streak) > 0 && <span style={{ fontSize:"0.65rem", color:"#fb923c" }}>{row.streak}🔥</span>}
                      <span style={{ color:isYou?"#ffd700":"#6b7280", fontFamily:"'Bebas Neue',sans-serif", fontSize:"0.85rem", flexShrink:0 }}>{row.score > 0 ? row.score.toLocaleString() : "—"}</span>
                    </div>
                  );
                })
              )}
            </div>

            {/* Your stats — only show if they have a username or have actually played */}
            {(username || totalScore > 0) && (
            <div style={{ background:"rgba(255,200,0,0.06)", border:"1px solid rgba(255,200,0,0.15)", borderRadius:10, padding:"12px 14px", marginBottom:14 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  {getScoreBadge(totalScore) && <span style={{ fontSize:"1.2rem" }}>{getScoreBadge(totalScore)!.emoji}</span>}
                  <div>
                    <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                      <p style={{ margin:0, color:username?"#fff":"#6b7280", fontFamily:"'Bebas Neue',sans-serif", fontSize:"1rem" }}>{username || "Set a username to appear here"}</p>
                      {globalRank && username && <span style={{ background:"rgba(255,215,0,0.15)", border:"1px solid rgba(255,215,0,0.3)", borderRadius:4, padding:"1px 6px", color:"#ffd700", fontSize:"0.62rem", fontFamily:"'Bebas Neue',sans-serif", letterSpacing:"0.08em" }}>#{globalRank} ALL TIME</span>}
                    </div>
                    <p style={{ margin:0, color:"#4b5563", fontSize:"0.6rem" }}>{streakData.current > 0 ? `${streakData.current} day streak 🔥` : "No active streak"}</p>
                  </div>
                </div>
                <p style={{ margin:0, color:"#ffd700", fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.3rem" }}>{totalScore.toLocaleString()}</p>
              </div>
            </div>
            )}

            {!username && (
              <button onClick={() => { setShowLeaderboard(false); setUsernameInput(""); setShowUsernameModal(true); }} style={{ width:"100%", padding:"10px", borderRadius:8, border:"none", background:"rgba(255,200,0,0.9)", color:"#0a0c10", fontWeight:900, fontFamily:"'Bebas Neue',sans-serif", letterSpacing:"0.1em", cursor:"pointer", fontSize:"0.88rem" }}>
                SET USERNAME TO APPEAR ON BOARD →
              </button>
            )}
          </div>
        </div>
      )}

      {/* WEEKLY RECAP MODAL */}
      {showWeeklyRecap && (() => {
        const today = new Date();
        const diffs: Difficulty[] = ["easy","medium","hard"];
        let totalPts = 0, wins = 0, played = 0, bestScore = 0, bestDay = "";
        const dayMap: Record<string, {pts:number, wins:number}> = {};
        try {
          Object.keys(localStorage).filter(k => k.startsWith("statsiq_day_")).forEach(k => {
            const parts = k.split("_");
            const d = new Date(`${parts[2]}-${parts[3].padStart(2,"0")}-${parts[4].padStart(2,"0")}`);
            const daysAgo = (today.getTime() - d.getTime()) / 86400000;
            if (daysAgo < 1 || daysAgo > 7) return;
            const entry = JSON.parse(localStorage.getItem(k)||"{}");
            played++;
            if (entry.won) wins++;
            if (entry.score) {
              totalPts += entry.score;
              const ds = d.toISOString().slice(0,10);
              if (!dayMap[ds]) dayMap[ds] = {pts:0,wins:0};
              dayMap[ds].pts += entry.score;
              dayMap[ds].wins += entry.won ? 1 : 0;
              if (dayMap[ds].pts > bestScore) { bestScore = dayMap[ds].pts; bestDay = ds; }
            }
          });
        } catch {}
        const daysPlayed = Object.keys(dayMap).length;
        const winPct = played > 0 ? Math.round((wins/played)*100) : 0;
        const bestDayStr = bestDay ? new Date(bestDay).toLocaleDateString("en-US",{weekday:"long",month:"short",day:"numeric"}) : "";
        return (
          <div style={{ position:"fixed", inset:0, zIndex:300, display:"flex", alignItems:"center", justifyContent:"center" }} onClick={() => setShowWeeklyRecap(false)}>
            <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.85)", backdropFilter:"blur(4px)" }} />
            <div style={{ position:"relative", background:"#0f1629", border:"1px solid rgba(255,215,0,0.2)", borderRadius:16, padding:"26px 22px", width:310, textAlign:"center" }} onClick={e => e.stopPropagation()}>
              <button onClick={() => setShowWeeklyRecap(false)} style={{ position:"absolute", top:14, right:14, background:"none", border:"none", color:"#4b5563", cursor:"pointer", fontSize:"1.2rem" }}>✕</button>

              <div style={{ fontSize:"2rem", marginBottom:8 }}>📊</div>
              <h3 style={{ margin:"0 0 2px", color:"#ffd700", fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.5rem", letterSpacing:"0.12em" }}>WEEKLY RECAP</h3>
              <p style={{ margin:"0 0 20px", color:"#4b5563", fontSize:"0.65rem", letterSpacing:"0.2em" }}>LAST 7 DAYS</p>

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:16 }}>
                {[
                  { label:"DAYS PLAYED", val:daysPlayed.toString(), color:"#ffd700" },
                  { label:"WIN RATE", val:`${winPct}%`, color:"#22c55e" },
                  { label:"POINTS EARNED", val:totalPts.toLocaleString(), color:"#60a5fa" },
                  { label:"PUZZLES WON", val:`${wins}/${played}`, color:"#a78bfa" },
                ].map(({label,val,color}) => (
                  <div key={label} style={{ background:"rgba(255,255,255,0.04)", borderRadius:10, padding:"12px 8px" }}>
                    <p style={{ margin:0, color, fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.3rem" }}>{val}</p>
                    <p style={{ margin:"2px 0 0", color:"#4b5563", fontSize:"0.56rem", letterSpacing:"0.12em" }}>{label}</p>
                  </div>
                ))}
              </div>

              {bestDayStr && bestScore > 0 && (
                <div style={{ background:"rgba(255,215,0,0.06)", border:"1px solid rgba(255,215,0,0.15)", borderRadius:10, padding:"10px 14px", marginBottom:16, textAlign:"left" }}>
                  <p style={{ margin:"0 0 2px", color:"#6b7280", fontSize:"0.58rem", letterSpacing:"0.15em", fontFamily:"'Bebas Neue',sans-serif" }}>BEST DAY</p>
                  <p style={{ margin:0, color:"#ffd700", fontSize:"0.85rem", fontWeight:700 }}>{bestDayStr}</p>
                  <p style={{ margin:"2px 0 0", color:"#9ca3af", fontSize:"0.72rem" }}>{bestScore.toLocaleString()} points earned</p>
                </div>
              )}

              {streakData.current > 0 && (
                <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(251,146,60,0.1)", border:"1px solid rgba(251,146,60,0.25)", borderRadius:8, padding:"6px 14px", marginBottom:16 }}>
                  <span>🔥</span>
                  <span style={{ color:"#fb923c", fontFamily:"'Bebas Neue',sans-serif", fontSize:"0.9rem" }}>{streakData.current} DAY STREAK — KEEP IT GOING!</span>
                </div>
              )}

              <button onClick={() => setShowWeeklyRecap(false)} style={{ width:"100%", padding:"11px", borderRadius:8, border:"none", background:"rgba(255,200,0,0.9)", color:"#0a0c10", fontWeight:900, fontFamily:"'Bebas Neue',sans-serif", letterSpacing:"0.1em", cursor:"pointer", fontSize:"0.9rem" }}>
                LET'S PLAY →
              </button>
            </div>
          </div>
        );
      })()}

      {showHow && (
        <div style={{ position:"fixed", inset:0, zIndex:200, display:"flex", alignItems:"center", justifyContent:"center" }} onClick={() => setShowHow(false)}>
          <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.75)", backdropFilter:"blur(4px)" }} />
          <div style={{ position:"relative", background:"#0f1629", border:"1px solid rgba(255,255,255,0.12)", borderRadius:16, padding:"24px 22px", width:310, maxHeight:"88vh", overflowY:"auto" }} onClick={e => e.stopPropagation()}>
            <h3 style={{ margin:"0 0 16px", color:"#ffd700", fontFamily:"'Bebas Neue', sans-serif", fontSize:"1.4rem", letterSpacing:"0.1em" }}>HOW TO PLAY</h3>

            {/* Gameplay */}
            {[["📊","You see a real stat line from a legendary performance"],["🤔","Guess the athlete — first name, last name, or full name"],["💡","Each wrong guess reveals a new clue"],["🏆","3 guesses per difficulty — use them wisely"],["📅","New stat line every day per difficulty"],["🎮","Practice mode available anytime for unlimited extra puzzles"]].map(([icon,text],i) => (
              <div key={i} style={{ display:"flex", gap:10, marginBottom:10 }}>
                <span style={{ fontSize:"1.1rem", flexShrink:0 }}>{icon}</span>
                <span style={{ color:"#9ca3af", fontSize:"0.82rem", lineHeight:1.4 }}>{text}</span>
              </div>
            ))}

            {/* Scoring section */}
            <div style={{ borderTop:"1px solid rgba(255,255,255,0.08)", marginTop:12, paddingTop:14 }}>
              <p style={{ margin:"0 0 10px", color:"#ffd700", fontFamily:"'Bebas Neue', sans-serif", fontSize:"1rem", letterSpacing:"0.1em" }}>SCORING</p>

              {/* Guess points */}
              <p style={{ margin:"0 0 6px", color:"#6b7280", fontSize:"0.62rem", letterSpacing:"0.15em" }}>BASE POINTS (by guess number)</p>
              <div style={{ display:"flex", gap:5, marginBottom:12 }}>
                {[[1,1000],[2,750],[3,500]].map(([g,p]) => (
                  <div key={g} style={{ flex:1, textAlign:"center", background:"rgba(255,255,255,0.04)", borderRadius:7, padding:"5px 2px", border:"1px solid rgba(255,255,255,0.07)" }}>
                    <p style={{ margin:0, color:"#fff", fontWeight:700, fontSize:"0.7rem", fontFamily:"'Bebas Neue',sans-serif" }}>{p}</p>
                    <p style={{ margin:0, color:"#4b5563", fontSize:"0.58rem" }}>G{g}</p>
                  </div>
                ))}
              </div>

              {/* Multipliers */}
              <p style={{ margin:"0 0 6px", color:"#6b7280", fontSize:"0.62rem", letterSpacing:"0.15em" }}>MULTIPLIERS</p>
              <div style={{ display:"flex", flexDirection:"column", gap:5, marginBottom:12 }}>
                {[
                  { label:"Difficulty", items:[{t:"Easy",v:"×1",c:"#22c55e"},{t:"Medium",v:"×2",c:"#f59e0b"},{t:"Hard",v:"×5",c:"#ef4444"}] },
                  { label:"Era selected", items:[{t:"1 era",v:"×1",c:"#9ca3af"},{t:"2 eras",v:"×1.5",c:"#a78bfa"},{t:"All 3",v:"×2",c:"#c084fc"}] },
                  { label:"Sports selected", items:[{t:"Few",v:"×0.6",c:"#9ca3af"},{t:"Some",v:"×0.85",c:"#60a5fa"},{t:"All",v:"×1",c:"#34d399"}] },
                ].map(({ label, items }) => (
                  <div key={label}>
                    <p style={{ margin:"0 0 4px", color:"#6b7280", fontSize:"0.62rem" }}>{label}</p>
                    <div style={{ display:"flex", gap:5 }}>
                      {items.map(({ t, v, c }) => (
                        <div key={t} style={{ flex:1, display:"flex", justifyContent:"space-between", alignItems:"center", background:"rgba(255,255,255,0.03)", borderRadius:6, padding:"4px 8px", border:"1px solid rgba(255,255,255,0.06)" }}>
                          <span style={{ color:"#9ca3af", fontSize:"0.65rem" }}>{t}</span>
                          <span style={{ color:c, fontWeight:700, fontSize:"0.72rem", fontFamily:"'Bebas Neue',sans-serif" }}>{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Max score callout */}
              <div style={{ background:"rgba(255,215,0,0.07)", border:"1px solid rgba(255,215,0,0.25)", borderRadius:8, padding:"8px 12px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div>
                  <p style={{ margin:0, color:"#ffd700", fontSize:"0.72rem", fontWeight:700 }}>Max possible score</p>
                  <p style={{ margin:0, color:"#6b7280", fontSize:"0.62rem" }}>Hard · All eras · All sports · Guess 1</p>
                </div>
                <span style={{ color:"#ffd700", fontWeight:900, fontSize:"1.3rem", fontFamily:"'Bebas Neue',sans-serif" }}>10,000</span>
              </div>
            </div>

            <button onClick={() => { try { localStorage.setItem("statsiq_visited","1"); } catch {} setShowHow(false); }} style={{ marginTop:14, width:"100%", padding:"10px", borderRadius:8, border:"none", background:"rgba(255,200,0,0.9)", color:"#0a0c10", fontWeight:900, fontSize:"0.9rem", cursor:"pointer", fontFamily:"'Bebas Neue', sans-serif", letterSpacing:"0.1em" }}>LET'S PLAY</button>
          </div>
        </div>
      )}


      {/* HEADER */}
      {/* Mobile game content — hidden on desktop, always rendered */}
      <header style={{ display:"block", position:"relative", zIndex:10, width:"100%", maxWidth:500, padding:"14px 18px 0" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:"1px solid rgba(255,255,255,0.07)", paddingBottom:10 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ fontSize:"1.5rem" }}>📊</span>
            <div>
              <h1 style={{ margin:0, fontFamily:"'Bebas Neue', sans-serif", fontSize:"1.8rem", color:"#ffd700", letterSpacing:"0.15em", lineHeight:1 }}>STATSIQ</h1>
              <p style={{ margin:0, fontSize:"0.55rem", color:"#4b5563", letterSpacing:"0.3em" }}>DAILY SPORTS TRIVIA</p>
            </div>
          </div>
          <div style={{ display:"flex", gap:7, alignItems:"center" }}>
            <button onClick={() => { setUsernameInput(username); setShowUsernameModal(true); }} style={{ textAlign:"center", background:"none", border:"none", cursor:"pointer", padding:0, minWidth:60, maxWidth:110 }}>
              <p style={{ margin:0, fontSize:"0.52rem", color:"#4b5563", letterSpacing:"0.15em" }}>PLAYER</p>
              <p style={{ margin:0, fontSize:"0.78rem", fontWeight:900, color: username ? "#fff" : "#4b5563", fontFamily:"'Bebas Neue',sans-serif", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                {getScoreBadge(totalScore) && <span style={{ marginRight:3 }}>{getScoreBadge(totalScore)!.emoji}</span>}
                {username || "SET NAME"}
                {globalRank && <span style={{ marginLeft:4, color:"#ffd700", fontSize:"0.65rem", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700 }}>#{globalRank}</span>}
              </p>
            </button>
            <button onClick={() => { setHistoryTab("stats"); setShowHistory(true); }} style={{ textAlign:"center", background:"none", border:"none", cursor:"pointer", padding:0, minWidth:48 }}>
              <p style={{ margin:0, fontSize:"0.52rem", color:"#4b5563", letterSpacing:"0.15em" }}>SCORE</p>
              <p style={{ margin:0, fontSize:"0.9rem", fontWeight:900, color:"#ffd700", fontFamily:"'Bebas Neue',sans-serif" }}>{totalScore.toLocaleString()}</p>
            </button>
            {streakData.current > 0 && (
              <button onClick={() => { setHistoryTab("calendar"); setShowHistory(true); }} style={{ textAlign:"center", background:"none", border:"none", cursor:"pointer", padding:0, minWidth:44 }}>
                <p style={{ margin:0, fontSize:"0.52rem", color:"#4b5563", letterSpacing:"0.15em" }}>STREAK</p>
                <p style={{ margin:0, fontSize:"0.9rem", fontWeight:900, color:"#fb923c", fontFamily:"'Bebas Neue',sans-serif" }}>{streakData.current}🔥</p>
              </button>
            )}
            <button onClick={() => { setShowLeaderboard(true); setLbLoading(true); sbGetLeaderboard("alltime").then(d => { setLbData(d); setLbLoading(false); }); }} style={{ width:30, height:30, borderRadius:8, border:"1px solid rgba(255,200,0,0.25)", background:"rgba(255,200,0,0.05)", color:"rgba(255,215,0,0.6)", cursor:"pointer", fontSize:"0.85rem", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>🏅</button>
          </div>
        </div>
        <div style={{ display:"flex", gap:8, marginTop:8, alignItems:"center", justifyContent:"center" }}>
          <button onClick={() => { if (hasStarted) { toast("Filters lock once you start guessing", 2000); return; } setShowFilter(true); }} style={{ display:"flex", alignItems:"center", gap:5, padding:"5px 12px", borderRadius:8, border:`1px solid ${hasStarted ? "rgba(255,255,255,0.06)" : hasFilter ? "rgba(34,197,94,0.5)" : "rgba(255,255,255,0.12)"}`, background:hasStarted ? "rgba(255,255,255,0.02)" : hasFilter ? "rgba(34,197,94,0.1)" : "rgba(255,255,255,0.04)", color:hasStarted ? "#374151" : hasFilter ? "#86efac" : "#9ca3af", cursor: hasStarted ? "not-allowed" : "pointer", fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.1em", fontFamily:"'Barlow Condensed', sans-serif" }}>
            ⚙️ {hasStarted ? "LOCKED" : filterLabel()}
          </button>
          <button onClick={() => setShowHow(true)} style={{ width:30, height:30, borderRadius:"50%", border:"1px solid rgba(255,200,0,0.2)", background:"rgba(255,200,0,0.05)", color:"rgba(255,215,0,0.6)", cursor:"pointer", fontSize:"0.82rem", fontWeight:900, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>?</button>
          <button onClick={() => {
            if (getPracticeCount() >= FREE_PRACTICE_LIMIT) { setShowProModal(true); return; }
            incrementPracticeCount();
            const idx = Math.floor(Math.random()*500); setPracticeIdx(idx); setPGuesses([]); setPInput(""); setPDone(false); setPWon(false); setPStreak(0); setPBestStreak(0); setPSessionWins(0); setPSessionPlayed(0); setShowPractice(true);
          }} style={{ display:"flex", alignItems:"center", gap:4, padding:"5px 10px", borderRadius:8, border:"1px solid rgba(167,139,250,0.3)", background:"rgba(167,139,250,0.07)", color:"#a78bfa", cursor:"pointer", fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.08em", fontFamily:"'Barlow Condensed', sans-serif" }}>
            🎮 PRACTICE {getPracticeCount() > 0 && getPracticeCount() < FREE_PRACTICE_LIMIT ? `(${FREE_PRACTICE_LIMIT - getPracticeCount()} left)` : getPracticeCount() >= FREE_PRACTICE_LIMIT ? "(PRO)" : ""}
          </button>
          <button onClick={() => setShowProModal(true)} style={{ display:"flex", alignItems:"center", gap:3, padding:"5px 8px", height:30, borderRadius:8, border:"1px solid rgba(167,139,250,0.3)", background:"rgba(167,139,250,0.07)", color:"#a78bfa", cursor:"pointer", fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.08em", fontFamily:"'Barlow Condensed', sans-serif", flexShrink:0 }}>⭐ PRO</button>
          {completedToday.size > 0 && (
            <button onClick={async () => {
              try {
                await navigator.clipboard?.writeText(buildDayShareText());
                toast("Copied! 📋", 2000);
              } catch { toast("Open a puzzle to share", 1500); }
            }} style={{ display:"flex", alignItems:"center", gap:4, padding:"5px 10px", borderRadius:8, border:"1px solid rgba(255,200,0,0.35)", background:"rgba(255,200,0,0.08)", color:"#ffd700", cursor:"pointer", fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.08em", fontFamily:"'Barlow Condensed', sans-serif" }}>
              📤 SHARE
            </button>
          )}
        </div>
        <div style={{ display:"flex", gap:8, marginTop:12, marginBottom:4 }}>
          {(["easy","medium","hard"] as Difficulty[]).map(d => {
            const c = DIFF_CONFIG[d]; const active = diff === d;
            const isCompleted = completedToday.has(d);
            return (
              <button key={d} onClick={() => setDiff(d)} style={{ flex:1, padding:"8px 0", borderRadius:10, border:`2px solid ${active ? c.color : isCompleted ? c.color+"55" : "rgba(255,255,255,0.08)"}`, background:active ? c.bg : isCompleted ? c.bg : "rgba(255,255,255,0.02)", cursor:"pointer", fontFamily:"'Bebas Neue', sans-serif", transition:"all 0.2s" }}>
                <div style={{ color:active ? c.color : isCompleted ? c.color+"cc" : "#4b5563", fontWeight:900, fontSize:"0.9rem", letterSpacing:"0.1em" }}>{isCompleted ? "✓ " : ""}{c.label}</div>
                <div style={{ color:active ? c.color : isCompleted ? c.color+"88" : "#374151", fontSize:"0.55rem", letterSpacing:"0.08em", marginTop:1, opacity:0.8 }}>{isCompleted ? "DONE" : `${c.guesses} GUESSES`}</div>
              </button>
            );
          })}
        </div>
        <p style={{ margin:"4px 0 8px", fontSize:"0.65rem", color:"#4b5563", letterSpacing:"0.1em", textAlign:"center" }}>{cfg.desc} · {cfg.clueStyle}</p>
      </header>

      {/* GAME CONTENT — always visible, responsive width */}
      <div style={{ position:"relative", zIndex:10, width:"100%", maxWidth:500, padding:"0 16px", display:"flex", flexDirection:"column", gap:12, marginTop:6 }}>

        <div style={{ background:"rgba(255,200,0,0.04)", border:`1px solid ${cfg.border}`, borderRadius:10, padding:"10px 14px", transition:"border-color 0.3s" }}>
          <p style={{ margin:"0 0 2px", fontSize:"0.6rem", color:"rgba(255,215,0,0.4)", letterSpacing:"0.2em", fontFamily:"'Bebas Neue', sans-serif" }}>PERFORMANCE</p>
          <p style={{ margin:0, fontSize:"0.82rem", color:"#d1d5db", lineHeight:1.3 }}>{ctx}</p>
          <span style={{ fontSize:"0.68rem", color:"#6b7280", marginTop:2, display:"block" }}>{sport}</span>
        </div>

        <div style={{ display:"flex", gap:6 }}>
          {Object.entries(stats).map(([key,val],i) => {
            const valStr = String(val);
            const isLong = valStr.length > 8;
            const isVeryLong = valStr.length > 14;
            return (
              <div key={key} style={{ flex:1, minWidth:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background:"rgba(255,255,255,0.06)", border:`1px solid ${cfg.border}`, borderRadius:10, padding:"10px 4px", opacity:visible?1:0, transform:visible?"translateY(0)":"translateY(8px)", transition:`all 0.4s ease ${i*0.08}s`, overflow:"hidden" }}>
                <span style={{ fontSize:isVeryLong?"0.72rem":isLong?"0.95rem":"1.5rem", fontWeight:900, color:cfg.color, fontFamily:"'Bebas Neue', sans-serif", textAlign:"center", lineHeight:1.2, wordBreak:"break-word", width:"100%", display:"block" }}>{valStr}</span>
                <span style={{ fontSize:"0.52rem", fontWeight:700, letterSpacing:"0.12em", color:`${cfg.color}99`, marginTop:3, fontFamily:"'Barlow Condensed', sans-serif", textAlign:"center", width:"100%", display:"block", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{key.replace(/_/g," ")}</span>
              </div>
            );
          })}
        </div>

        {wrongCount > 0 && (
          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            <p style={{ margin:"0 0 2px", fontSize:"0.58rem", color:"#6b7280", letterSpacing:"0.2em", fontFamily:"'Bebas Neue', sans-serif" }}>CLUES UNLOCKED</p>
            {clues.slice(0,wrongCount).map((clue,i) => (
              <div key={i} style={{ display:"flex", gap:10, padding:"8px 12px", borderRadius:8, background:cfg.bg, border:`1px solid ${cfg.border}` }}>
                <span style={{ color:cfg.color, fontWeight:900, fontSize:"0.75rem", fontFamily:"'Bebas Neue', sans-serif", flexShrink:0 }}>CLUE {i+1}</span>
                <span style={{ color:"#d1d5db", fontSize:"0.8rem", lineHeight:1.4 }}>{clue}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
          <div style={{ display:"flex", justifyContent:"space-between" }}>
            <p style={{ margin:0, fontSize:"0.58rem", color:"#6b7280", letterSpacing:"0.2em", fontFamily:"'Bebas Neue', sans-serif" }}>YOUR GUESSES</p>
            <p style={{ margin:0, fontSize:"0.6rem", color:"#4b5563" }}>{guesses.length}/{cfg.guesses}</p>
          </div>
          {Array(cfg.guesses).fill(null).map((_,i) => {
            const g = guesses[i]; const isActive = !done && i === guesses.length;
            const text = isActive ? input : (g?.text || ""); const submitted = !isActive && !!g;
            return (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 14px", borderRadius:10, minHeight:44, transition:"all 0.2s", background:submitted?(g.ok?"rgba(34,197,94,0.15)":"rgba(239,68,68,0.1)"):"rgba(255,255,255,0.03)", border:submitted?(g.ok?"1px solid rgba(34,197,94,0.4)":"1px solid rgba(239,68,68,0.25)"):"1px solid rgba(255,255,255,0.07)" }}>
                {submitted ? (<>
                  <span style={{ fontSize:"1rem", flexShrink:0 }}>{g.ok?"✅":"❌"}</span>
                  <span style={{ color:g.ok?"#86efac":"#fca5a5", fontWeight:700, fontSize:"0.95rem", fontFamily:"'Barlow Condensed', sans-serif", flex:1 }}>{text}</span>
                  {!g.ok && <span style={{ color:"rgba(255,255,255,0.18)", fontSize:"0.65rem" }}>NOT THIS PLAYER</span>}
                </>) : isActive ? (
                  <span style={{ color:"#fff", fontSize:"0.95rem", fontFamily:"'Barlow Condensed', sans-serif", fontWeight:700 }}>{text}</span>
                ) : (
                  <span style={{ color:"rgba(255,255,255,0.08)", fontSize:"0.65rem" }}>—</span>
                )}
              </div>
            );
          })}
        </div>

        {!done && (
          <div style={{ display:"flex", gap:8 }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && input.trim().length >= 3 && submit()}
              onFocus={e => { setTimeout(() => e.target.scrollIntoView({ behavior:"smooth", block:"center" }), 300); }}
              placeholder="Type athlete name here..."
              autoFocus
              style={{ flex:1, background:"rgba(255,255,255,0.07)", border:`2px solid ${cfg.border}`, borderRadius:10, padding:"12px 16px", color:"#fff", fontSize:"1rem", fontFamily:"'Barlow Condensed', sans-serif", outline:"none", boxShadow:`0 0 12px ${cfg.color}44`, transition:"border-color 0.3s" }} />
            <button
              onClick={() => submit()}
              disabled={input.trim().length < 3}
              style={{ padding:"12px 20px", borderRadius:10, border:"none", background: input.trim().length >= 3 ? `linear-gradient(135deg, ${cfg.color}, ${cfg.color}bb)` : "rgba(255,255,255,0.1)", color: input.trim().length >= 3 ? "#0a0c10" : "#4b5563", fontWeight:900, fontSize:"0.9rem", cursor: input.trim().length >= 3 ? "pointer" : "not-allowed", fontFamily:"'Bebas Neue', sans-serif", letterSpacing:"0.1em", transition:"all 0.2s" }}>
              GUESS
            </button>
          </div>
        )}

        {done && (
          <div style={{ background:won?"rgba(34,197,94,0.08)":"rgba(239,68,68,0.07)", border:`1px solid ${won?"rgba(34,197,94,0.35)":"rgba(239,68,68,0.3)"}`, borderRadius:14, padding:"18px", textAlign:"center" }}>

            {/* Milestone celebration */}
            {won && streakData.current > 0 && streakData.current % 7 === 0 && (
              <div style={{ background:"linear-gradient(135deg,rgba(251,146,60,0.2),rgba(255,215,0,0.1))", border:"1px solid rgba(251,146,60,0.4)", borderRadius:10, padding:"10px 14px", marginBottom:12, animation:"pulse 1s ease-in-out" }}>
                <p style={{ margin:0, fontSize:"1.4rem" }}>🔥</p>
                <p style={{ margin:"2px 0 0", color:"#fb923c", fontFamily:"'Bebas Neue',sans-serif", fontSize:"1rem", letterSpacing:"0.1em" }}>{streakData.current} DAY STREAK!</p>
              </div>
            )}

            {/* Badge milestone — show when you just crossed a threshold */}
            {won && (() => {
              const badge = getScoreBadge(totalScore);
              const prevBadge = getScoreBadge(totalScore - (todayScore ?? 0));
              if (badge && badge !== prevBadge) return (
                <div style={{ background:"linear-gradient(135deg,rgba(255,215,0,0.2),rgba(255,215,0,0.05))", border:"1px solid rgba(255,215,0,0.5)", borderRadius:10, padding:"10px 14px", marginBottom:12, animation:"pulse 1s ease-in-out" }}>
                  <p style={{ margin:0, fontSize:"1.8rem" }}>{badge.emoji}</p>
                  <p style={{ margin:"2px 0 0", color:"#ffd700", fontFamily:"'Bebas Neue',sans-serif", fontSize:"1rem", letterSpacing:"0.1em" }}>NEW BADGE: {badge.label.toUpperCase()}!</p>
                  <p style={{ margin:"2px 0 0", color:"#9ca3af", fontSize:"0.7rem" }}>{totalScore.toLocaleString()} total points</p>
                </div>
              );
              return null;
            })()}

            {/* First perfect day */}
            {(() => {
              const todayStr = new Date().toISOString().slice(0,10);
              const allDone = (["easy","medium","hard"] as const).every(d => completedToday.has(d));
              const prevPerfect = (() => { try { return localStorage.getItem("statsiq_had_perfect") === "1"; } catch { return false; } })();
              if (allDone && !prevPerfect) {
                try { localStorage.setItem("statsiq_had_perfect","1"); } catch {}
                return (
                  <div style={{ background:"linear-gradient(135deg,rgba(255,215,0,0.15),rgba(34,197,94,0.1))", border:"1px solid rgba(255,215,0,0.4)", borderRadius:10, padding:"10px 14px", marginBottom:12 }}>
                    <p style={{ margin:0, fontSize:"1.4rem" }}>🏆</p>
                    <p style={{ margin:"2px 0 0", color:"#ffd700", fontFamily:"'Bebas Neue',sans-serif", fontSize:"1rem", letterSpacing:"0.1em" }}>FIRST PERFECT DAY!</p>
                    <p style={{ margin:"2px 0 0", color:"#9ca3af", fontSize:"0.72rem" }}>All 3 difficulties completed</p>
                  </div>
                );
              }
              return null;
            })()}

            <p style={{ margin:"0 0 2px", fontSize:"1.6rem" }}>{won?"🏆":"😔"}</p>
            <p style={{ margin:"0 0 2px", fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.4rem", color:won?"#22c55e":"#ef4444", letterSpacing:"0.1em" }}>{won?"CORRECT!":"GAME OVER"}</p>
            <p style={{ margin:"0 0 10px", color:"#d1d5db", fontSize:"0.85rem" }}>The answer was <span style={{ color:"#ffd700", fontWeight:900 }}>{(() => { try { const today = new Date(); const key = `statsiq_day_${today.getFullYear()}_${today.getMonth()+1}_${today.getDate()}_${diff}`; const stored = localStorage.getItem(key); if (stored) { const data = JSON.parse(stored); if (data.player) return data.player; } } catch {} return player; })()}</span></p>

            {/* Streak display on win */}
            {won && streakData.current > 1 && (
              <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(251,146,60,0.12)", border:"1px solid rgba(251,146,60,0.3)", borderRadius:8, padding:"5px 12px", marginBottom:12 }}>
                <span style={{ fontSize:"1rem" }}>🔥</span>
                <span style={{ color:"#fb923c", fontFamily:"'Bebas Neue',sans-serif", fontSize:"0.9rem", letterSpacing:"0.1em" }}>{streakData.current} DAY STREAK</span>
                {streakShield && <span style={{ fontSize:"0.75rem" }}>🛡️</span>}
              </div>
            )}

            {/* Global rank badge on win screen */}
            {won && globalRank && (
              <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(255,215,0,0.08)", border:"1px solid rgba(255,215,0,0.3)", borderRadius:8, padding:"5px 12px", marginBottom:12, marginLeft: streakData.current > 1 ? 6 : 0 }}>
                <span style={{ fontSize:"0.9rem" }}>{globalRank <= 3 ? ["🥇","🥈","🥉"][globalRank-1] : "🏅"}</span>
                <span style={{ color:"#ffd700", fontFamily:"'Bebas Neue',sans-serif", fontSize:"0.9rem", letterSpacing:"0.1em" }}>#{globalRank} ALL TIME</span>
              </div>
            )}

            {/* Streak shield earned notification */}
            {won && streakData.current === 7 && streakShield && (
              <div style={{ background:"rgba(99,102,241,0.1)", border:"1px solid rgba(99,102,241,0.35)", borderRadius:8, padding:"7px 12px", marginBottom:12 }}>
                <p style={{ margin:0, color:"#a5b4fc", fontFamily:"'Bebas Neue',sans-serif", fontSize:"0.82rem", letterSpacing:"0.08em" }}>🛡️ STREAK SHIELD EARNED — one free miss protected</p>
              </div>
            )}

            {/* Personal best notification */}
            {won && todayScore != null && (() => {
              const prev = getPersonalBest(diff);
              if (todayScore > prev && prev > 0) return (
                <div style={{ background:"rgba(34,197,94,0.08)", border:"1px solid rgba(34,197,94,0.3)", borderRadius:8, padding:"7px 12px", marginBottom:12 }}>
                  <p style={{ margin:0, color:"#86efac", fontFamily:"'Bebas Neue',sans-serif", fontSize:"0.82rem", letterSpacing:"0.08em" }}>⭐ NEW PERSONAL BEST ON {diff.toUpperCase()}!</p>
                </div>
              );
              return null;
            })()}

            {/* Score breakdown */}
            {won && scoreBreakdown && (
              <div style={{ background:"rgba(0,0,0,0.3)", borderRadius:10, padding:"12px 14px", marginBottom:12, textAlign:"left" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                  <span style={{ color:"#6b7280", fontSize:"0.65rem", letterSpacing:"0.15em", fontFamily:"'Bebas Neue',sans-serif" }}>SCORE BREAKDOWN</span>
                  <span style={{ color:"#ffd700", fontWeight:900, fontSize:"1.3rem", fontFamily:"'Bebas Neue',sans-serif" }}>{scoreBreakdown.final.toLocaleString()} pts</span>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
                  {[
                    { label:`Guess ${guesses.length} of ${cfg.guesses}`, val:scoreBreakdown.base, suffix:"base pts", color:"#fff" },
                    { label:multLabel(scoreBreakdown.diffMult,"diff"), val:fmtMult(scoreBreakdown.diffMult), suffix:"difficulty", color:cfg.color },
                    { label:multLabel(scoreBreakdown.eraMult,"era"), val:fmtMult(scoreBreakdown.eraMult), suffix:"era bonus", color:"#a78bfa" },
                    { label:multLabel(scoreBreakdown.sportMult,"sport"), val:fmtMult(scoreBreakdown.sportMult), suffix:"sport bonus", color:"#60a5fa" },
                  ].map(({ label, val, suffix, color }, i) => (
                    <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"4px 0", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
                      <span style={{ color:"#9ca3af", fontSize:"0.72rem" }}>{label}</span>
                      <span style={{ color, fontSize:"0.78rem", fontWeight:700, fontFamily:"'Bebas Neue',sans-serif" }}>{val} <span style={{ color:"#4b5563", fontSize:"0.62rem", fontWeight:400 }}>{suffix}</span></span>
                    </div>
                  ))}
                </div>
                {/* Total with badge */}
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:8, paddingTop:8, borderTop:"1px solid rgba(255,255,255,0.08)" }}>
                  <span style={{ color:"#6b7280", fontSize:"0.65rem", letterSpacing:"0.1em" }}>
                    {getScoreBadge(totalScore) && <span style={{ marginRight:4 }}>{getScoreBadge(totalScore)!.emoji}</span>}
                    ALL-TIME TOTAL
                  </span>
                  <span style={{ color:"#ffd700", fontWeight:900, fontSize:"0.9rem", fontFamily:"'Bebas Neue',sans-serif" }}>{totalScore.toLocaleString()} pts</span>
                </div>
              </div>
            )}

            {/* Total score + streak */}
            <div style={{ display:"flex", gap:8, marginBottom:12 }}>
              <div style={{ flex:1, display:"flex", justifyContent:"space-between", alignItems:"center", background:"rgba(255,215,0,0.06)", borderRadius:8, padding:"8px 14px", border:"1px solid rgba(255,215,0,0.2)" }}>
                <span style={{ color:"#6b7280", fontSize:"0.65rem", letterSpacing:"0.12em", fontFamily:"'Bebas Neue',sans-serif" }}>TOTAL</span>
                <span style={{ color:"#ffd700", fontWeight:900, fontSize:"1.1rem", fontFamily:"'Bebas Neue',sans-serif" }}>{totalScore.toLocaleString()}</span>
              </div>
              {streakData.current > 0 && (
                <div style={{ flex:1, display:"flex", justifyContent:"space-between", alignItems:"center", background:"rgba(251,146,60,0.06)", borderRadius:8, padding:"8px 14px", border:"1px solid rgba(251,146,60,0.2)" }}>
                  <span style={{ color:"#6b7280", fontSize:"0.65rem", letterSpacing:"0.12em", fontFamily:"'Bebas Neue',sans-serif" }}>STREAK</span>
                  <span style={{ color:"#fb923c", fontWeight:900, fontSize:"1.1rem", fontFamily:"'Bebas Neue',sans-serif" }}>{streakData.current}🔥</span>
                </div>
              )}
            </div>

            <p style={{ margin:"0 0 10px", color:"#6b7280", fontSize:"0.68rem" }}>{sport} · {ctx}</p>

            {/* Countdown to next puzzles */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginBottom:14, background:"rgba(255,255,255,0.03)", borderRadius:10, padding:"10px 16px", border:"1px solid rgba(255,255,255,0.07)" }}>
              <span style={{ color:"#4b5563", fontSize:"0.65rem", letterSpacing:"0.15em", fontFamily:"'Bebas Neue',sans-serif" }}>NEXT PUZZLE IN</span>
              <span style={{ color:"#ffd700", fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.1rem", letterSpacing:"0.2em", minWidth:80, textAlign:"center" }}>{countdown}</span>
            </div>

            <div style={{ display:"flex", gap:8, justifyContent:"center" }}>
              <button onClick={async () => {
                const img = await generateShareCard();
                setSharePreview(img);
              }} style={{ padding:"10px 20px", borderRadius:8, border:"none", background:"rgba(255,200,0,0.9)", color:"#0a0c10", fontWeight:900, fontSize:"0.85rem", cursor:"pointer", fontFamily:"'Bebas Neue',sans-serif", letterSpacing:"0.1em" }}>
                📤 SHARE RESULT
              </button>
              {diff !== "hard" && (
              <button onClick={() => setDiff(diff==="easy"?"medium":"hard")} style={{ padding:"10px 20px", borderRadius:8, border:`1px solid ${cfg.border}`, background:cfg.bg, color:cfg.color, fontWeight:900, fontSize:"0.85rem", cursor:"pointer", fontFamily:"'Bebas Neue',sans-serif", letterSpacing:"0.1em" }}>
                TRY {diff === "easy" ? "MEDIUM" : "HARD"} →
              </button>
              )}
            </div>
            {completedToday.size === 3 && (
              <div style={{ marginTop:10, textAlign:"center" }}>
                <button onClick={() => setShowProModal(true)} style={{ padding:"9px 18px", borderRadius:8, border:"1px solid rgba(167,139,250,0.4)", background:"rgba(167,139,250,0.1)", color:"#a78bfa", fontWeight:900, fontSize:"0.82rem", cursor:"pointer", fontFamily:"'Bebas Neue',sans-serif", letterSpacing:"0.1em" }}>
                  🎮 KEEP PLAYING — UPGRADE TO PRO
                </button>
              </div>
            )}
            {/* Rarity from Supabase */}
            {rarity[diff] && rarity[diff].total_plays >= 5 && (
              <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:8, padding:"8px 14px", marginBottom:10, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span style={{ color:"#4b5563", fontSize:"0.65rem", letterSpacing:"0.1em", fontFamily:"'Bebas Neue',sans-serif" }}>PLAYERS WHO GOT THIS</span>
                <span style={{ color: rarity[diff].win_pct >= 70 ? "#22c55e" : rarity[diff].win_pct >= 40 ? "#f59e0b" : "#ef4444", fontFamily:"'Bebas Neue',sans-serif", fontSize:"1rem" }}>{rarity[diff].win_pct}%</span>
              </div>
            )}
            <div style={{ marginTop:10 }}>
              <button onClick={() => { setShowReportModal(true); setReportText(""); setReportSent(false); }} style={{ background:"none", border:"none", color:"#4b5563", cursor:"pointer", fontSize:"0.62rem", letterSpacing:"0.1em", fontFamily:"'Barlow Condensed',sans-serif", textDecoration:"underline", padding:0 }}>
                🚩 report a fact error
              </button>
            </div>

            <p style={{ margin:"6px 0 0", color:"#374151", fontSize:"0.62rem", letterSpacing:"0.15em" }}>NEW STAT LINE EVERY DAY AT MIDNIGHT</p>
            <a href="https://twitter.com/StatsIQTriviq" target="_blank" rel="noopener noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:4, marginTop:8, color:"#4b5563", fontSize:"0.62rem", textDecoration:"none", letterSpacing:"0.08em", fontFamily:"'Barlow Condensed',sans-serif" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              @StatsIQTriviq
            </a>

            {/* Rank defend nudge */}
            {globalRank && completedToday.size === 3 && (
              <p style={{ margin:"6px 0 0", color:"#ffd700", fontSize:"0.62rem", letterSpacing:"0.1em", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700 }}>
                You're #{globalRank} all time — come back tomorrow to defend it 🏆
              </p>
            )}

            {/* Username nudge for anonymous players after first win */}
            {!username && won && (
              <button onClick={() => { setUsernameInput(""); setShowUsernameModal(true); }} style={{ marginTop:8, background:"none", border:"1px solid rgba(255,200,0,0.25)", borderRadius:6, padding:"5px 12px", color:"#ffd700", cursor:"pointer", fontSize:"0.65rem", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, letterSpacing:"0.1em" }}>
                📛 SET A USERNAME TO APPEAR ON THE LEADERBOARD
              </button>
            )}
          </div>
        )}
      </div>


      {msg && <div style={{ position:"fixed", top:70, left:"50%", transform:"translateX(-50%)", zIndex:100, background:"#fff", color:"#111", padding:"9px 22px", borderRadius:8, fontWeight:700, fontSize:"0.88rem", boxShadow:"0 8px 32px rgba(0,0,0,0.4)", whiteSpace:"nowrap", fontFamily:"'Barlow Condensed', sans-serif" }}>{msg}</div>}

      {/* PRACTICE MODE MODAL */}
      {showPractice && (() => {
        const allPools = [...EASY, ...MEDIUM, ...HARD];
        const todayMs = new Date().setHours(0,0,0,0);

        // Exclude today's 3 daily puzzles from practice pool
        const todayAnswers = new Set(
          (["easy","medium","hard"] as Difficulty[]).map(d => {
            const pool = POOLS[d]; const dk = new Date().toISOString().slice(0,10).replace(/-/g,"");
            let h = 0; for (let i=0;i<dk.length;i++) h=(h*31+dk.charCodeAt(i))>>>0;
            return pool[h % pool.length]?.answer;
          }).filter(Boolean)
        );

        // Practice has its own independent filters (not the daily lock)
        const pracPool = allPools.filter(p => {
          if (todayAnswers.has(p.answer)) return false;
          if (pSportFilter.size > 0 && !pSportFilter.has(p.sport.split(" ")[0])) return false;
          if (pEraFilter.size > 0 && !pEraFilter.has(p.era as Era)) return false;
          return true;
        });

        const pool2 = pracPool.length > 0 ? pracPool : allPools;
        const seed = (todayMs + practiceIdx * 7919) % pool2.length;
        const pp = pool2[seed];
        const pParts = pp.player.split(" ");
        const pValid = [pp.answer, pParts[0], pParts[pParts.length-1], pp.player.replace(/\s/g,"")];
        const pNg = (s:string) => s.toUpperCase().replace(/[^A-Z]/g,"");
        const pSubmit = () => {
          const g = pInput.trim(); if (!g || pDone) return;
          const ng = pNg(g);
          const exact = pValid.some(v => v.length >= 2 && ng === pNg(v));
          const fuzzy = !exact && ng.length >= 4 && pValid.some(v => { const nv = pNg(v); return nv.length >= 4 && levenshtein(ng,nv) <= 2; });
          const win = exact || fuzzy;
          const next = [...pGuesses, {text:g, ok:win}];
          setPGuesses(next); setPInput("");
          if (win) {
            setPDone(true); setPWon(true);
            setPSessionPlayed(p => p + 1);
            setPSessionWins(w => w + 1);
            setPStreak(s => {
              const newStreak = s + 1;
              setPBestStreak(b => Math.max(b, newStreak));
              return newStreak;
            });
          } else if (next.length >= 3) {
            setPDone(true); setPWon(false);
            setPSessionPlayed(p => p + 1);
            setPStreak(0);
          }
        };
        return (
          <div style={{ position:"fixed", inset:0, zIndex:200, display:"flex", alignItems:"center", justifyContent:"center" }} onClick={() => setShowPractice(false)}>
            <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.85)", backdropFilter:"blur(6px)" }} />
            <div style={{ position:"relative", background:"#0f1629", border:"1px solid rgba(255,255,255,0.12)", borderRadius:16, padding:"20px", width:"min(420px,94vw)", maxHeight:"85vh", overflowY:"auto" }} onClick={e => e.stopPropagation()}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                <div>
                  <h3 style={{ margin:0, color:"#a78bfa", fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.2rem", letterSpacing:"0.1em" }}>🎮 PRACTICE MODE</h3>
                  <p style={{ margin:0, color:"#4b5563", fontSize:"0.65rem" }}>Unscored · filters are free · today's puzzles excluded</p>
                </div>
                <div style={{ display:"flex", gap:6, alignItems:"center" }}>
                  <button onClick={() => setShowPFilter(f => !f)} style={{ padding:"4px 10px", borderRadius:7, border:`1px solid ${(pSportFilter.size>0||pEraFilter.size>0)?"rgba(167,139,250,0.5)":"rgba(255,255,255,0.1)"}`, background:(pSportFilter.size>0||pEraFilter.size>0)?"rgba(167,139,250,0.15)":"transparent", color:(pSportFilter.size>0||pEraFilter.size>0)?"#a78bfa":"#6b7280", cursor:"pointer", fontSize:"0.62rem", fontWeight:700, fontFamily:"'Barlow Condensed',sans-serif", letterSpacing:"0.1em" }}>
                    ⚙️ {showPFilter?"HIDE":"FILTERS"}
                  </button>
                  <button onClick={() => setShowPractice(false)} style={{ background:"none", border:"none", color:"#6b7280", cursor:"pointer", fontSize:"1.2rem" }}>✕</button>
                </div>
              </div>

              {/* Session stats bar */}
              {pSessionPlayed > 0 && (
                <div style={{ display:"flex", gap:6, marginBottom:12 }}>
                  {[
                    { val: pStreak > 0 ? `${pStreak}🔥` : "0", key:"STREAK" },
                    { val: String(pBestStreak), key:"BEST" },
                    { val: `${Math.round((pSessionWins/pSessionPlayed)*100)}%`, key:"WIN RATE" },
                    { val: `${pSessionWins}/${pSessionPlayed}`, key:"SESSION" },
                  ].map(({val,key}) => (
                    <div key={key} style={{ flex:1, background:"rgba(167,139,250,0.06)", border:"1px solid rgba(167,139,250,0.12)", borderRadius:8, padding:"6px 4px", textAlign:"center" }}>
                      <span style={{ display:"block", fontFamily:"'Bebas Neue',sans-serif", fontSize:"0.9rem", color:"#a78bfa" }}>{val}</span>
                      <span style={{ display:"block", fontFamily:"'Barlow Condensed',sans-serif", fontSize:"0.48rem", color:"rgba(167,139,250,0.4)", letterSpacing:"0.15em", marginTop:1 }}>{key}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Independent practice filters */}
              {showPFilter && (
                <div style={{ background:"rgba(167,139,250,0.05)", border:"1px solid rgba(167,139,250,0.12)", borderRadius:10, padding:"12px", marginBottom:14 }}>
                  <p style={{ margin:"0 0 6px", color:"#6b7280", fontSize:"0.58rem", letterSpacing:"0.15em", fontFamily:"'Bebas Neue',sans-serif" }}>SPORTS (free to change anytime)</p>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:10 }}>
                    {SPORTS.map(s => (
                      <button key={s} onClick={() => { const n=new Set(pSportFilter); n.has(s)?n.delete(s):n.add(s); setPSportFilter(n); setPGuesses([]); setPInput(""); setPDone(false); setPWon(false); setPracticeIdx(i=>i+1); }} style={{ padding:"4px 9px", borderRadius:6, border:`1px solid ${pSportFilter.has(s)?"rgba(167,139,250,0.6)":"rgba(255,255,255,0.08)"}`, background:pSportFilter.has(s)?"rgba(167,139,250,0.2)":"transparent", color:pSportFilter.has(s)?"#c4b5fd":"#6b7280", cursor:"pointer", fontSize:"1rem" }}>
                        {s}
                      </button>
                    ))}
                  </div>
                  <p style={{ margin:"0 0 6px", color:"#6b7280", fontSize:"0.58rem", letterSpacing:"0.15em", fontFamily:"'Bebas Neue',sans-serif" }}>ERA</p>
                  <div style={{ display:"flex", gap:5 }}>
                    {(["modern","classic","legends"] as Era[]).map(era => (
                      <button key={era} onClick={() => { const n=new Set(pEraFilter); n.has(era)?n.delete(era):n.add(era); setPEraFilter(n); setPGuesses([]); setPInput(""); setPDone(false); setPWon(false); setPracticeIdx(i=>i+1); }} style={{ flex:1, padding:"5px 6px", borderRadius:6, border:`1px solid ${pEraFilter.has(era)?ERA_CONFIG[era].activeBorder:"rgba(255,255,255,0.08)"}`, background:pEraFilter.has(era)?ERA_CONFIG[era].activeBg:"transparent", color:pEraFilter.has(era)?"#fff":"#6b7280", cursor:"pointer", fontSize:"0.62rem", fontFamily:"'Bebas Neue',sans-serif" }}>
                        {ERA_CONFIG[era].icon} {era.toUpperCase()}
                      </button>
                    ))}
                  </div>
                  <p style={{ margin:"6px 0 0", color:"#374151", fontSize:"0.6rem", textAlign:"center" }}>{pool2.length} puzzles available with current filters</p>
                </div>
              )}
              <div style={{ background:"rgba(167,139,250,0.06)", border:"1px solid rgba(167,139,250,0.2)", borderRadius:10, padding:"10px 14px", marginBottom:10 }}>
                <p style={{ margin:"0 0 2px", fontSize:"0.55rem", color:"rgba(167,139,250,0.5)", letterSpacing:"0.2em", fontFamily:"'Bebas Neue',sans-serif" }}>PERFORMANCE · {pp.sport} · {pp.era}</p>
                <p style={{ margin:0, fontSize:"0.82rem", color:"#d1d5db" }}>{pp.ctx}</p>
              </div>
              <div style={{ display:"flex", gap:5, marginBottom:12 }}>
                {Object.entries(pp.stats).map(([k,v]) => {
                  const vStr = String(v);
                  const isLong = vStr.length > 8;
                  const isVeryLong = vStr.length > 14;
                  return (
                    <div key={k} style={{ flex:1, minWidth:0, display:"flex", flexDirection:"column", alignItems:"center", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(167,139,250,0.2)", borderRadius:8, padding:"8px 4px", overflow:"hidden" }}>
                      <span style={{ fontSize:isVeryLong?"0.65rem":isLong?"0.85rem":"1.2rem", fontWeight:900, color:"#a78bfa", fontFamily:"'Bebas Neue',sans-serif", textAlign:"center", lineHeight:1.2, wordBreak:"break-word", width:"100%", display:"block" }}>{vStr}</span>
                      <span style={{ fontSize:"0.52rem", color:"rgba(167,139,250,0.6)", letterSpacing:"0.12em", textAlign:"center", width:"100%", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", display:"block" }}>{k.replace(/_/g," ")}</span>
                    </div>
                  );
                })}
              </div>
              {pGuesses.map((g,i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:8, padding:"6px 10px", borderRadius:7, background: g.ok?"rgba(34,197,94,0.1)":"rgba(239,68,68,0.08)", border:`1px solid ${g.ok?"rgba(34,197,94,0.3)":"rgba(239,68,68,0.2)"}`, marginBottom:6 }}>
                  <span style={{ fontSize:"0.9rem" }}>{g.ok?"✅":"❌"}</span>
                  <span style={{ color: g.ok?"#22c55e":"#ef4444", fontWeight:700, fontSize:"0.85rem" }}>{g.text}</span>
                </div>
              ))}
              {pDone ? (
                <div style={{ textAlign:"center", padding:"10px 0" }}>
                  <p style={{ margin:"0 0 4px", fontSize:"1.4rem" }}>{pWon?"🎯":"😅"}</p>
                  <p style={{ margin:"0 0 10px", color: pWon?"#22c55e":"#ef4444", fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.1rem" }}>{pWon?"CORRECT!":"ANSWER: "+pp.player}</p>
                  {!pWon && <p style={{ margin:"0 0 12px", color:"#9ca3af", fontSize:"0.82rem" }}>{pp.player}</p>}

                  {/* Session stats */}
                  <div style={{ display:"flex", gap:8, marginBottom:14 }}>
                    {[
                      { val: pStreak > 0 ? `${pStreak}🔥` : "0", key:"STREAK" },
                      { val: String(pBestStreak), key:"BEST" },
                      { val: `${pSessionPlayed > 0 ? Math.round((pSessionWins/pSessionPlayed)*100) : 0}%`, key:"WIN RATE" },
                      { val: `${pSessionWins}/${pSessionPlayed}`, key:"SESSION" },
                    ].map(({val,key}) => (
                      <div key={key} style={{ flex:1, background:"rgba(167,139,250,0.06)", border:"1px solid rgba(167,139,250,0.15)", borderRadius:8, padding:"8px 4px", textAlign:"center" }}>
                        <span style={{ display:"block", fontFamily:"'Bebas Neue',sans-serif", fontSize:"1rem", color:"#a78bfa" }}>{val}</span>
                        <span style={{ display:"block", fontFamily:"'Barlow Condensed',sans-serif", fontSize:"0.5rem", color:"rgba(167,139,250,0.4)", letterSpacing:"0.15em", marginTop:2 }}>{key}</span>
                      </div>
                    ))}
                  </div>

                  <button onClick={() => {
                    const newCount = incrementPracticeCount();
                    if (newCount > FREE_PRACTICE_LIMIT) { setShowPractice(false); setShowProModal(true); return; }
                    setPGuesses([]); setPInput(""); setPDone(false); setPWon(false); setPracticeIdx(i => i+1);
                  }} style={{ padding:"10px 24px", borderRadius:8, border:"none", background:"rgba(167,139,250,0.8)", color:"#fff", fontWeight:900, cursor:"pointer", fontFamily:"'Bebas Neue',sans-serif", letterSpacing:"0.1em" }}>
                    {getPracticeCount() >= FREE_PRACTICE_LIMIT - 1 ? "LAST FREE PUZZLE →" : `NEXT PUZZLE (${FREE_PRACTICE_LIMIT - getPracticeCount()} left) →`}
                  </button>
                </div>
              ) : (
                <div style={{ display:"flex", gap:8 }}>
                  <input value={pInput} onChange={e => setPInput(e.target.value)} onKeyDown={e => e.key==="Enter" && pInput.trim().length >= 3 && pSubmit()} placeholder="Type athlete name..." style={{ flex:1, padding:"10px 12px", borderRadius:8, border:"1px solid rgba(167,139,250,0.3)", background:"rgba(255,255,255,0.05)", color:"#fff", fontSize:"0.9rem", fontFamily:"'Barlow Condensed',sans-serif" }} autoFocus />
                  <button onClick={pSubmit} disabled={pInput.trim().length < 3} style={{ padding:"10px 16px", borderRadius:8, border:"none", background: pInput.trim().length >= 3 ? "rgba(167,139,250,0.8)" : "rgba(100,100,100,0.3)", color: pInput.trim().length >= 3 ? "#fff" : "#555", fontWeight:900, cursor: pInput.trim().length >= 3 ? "pointer" : "not-allowed", fontFamily:"'Bebas Neue',sans-serif" }}>GUESS</button>
                </div>
              )}
              <p style={{ margin:"12px 0 0", color:"#374151", fontSize:"0.62rem", textAlign:"center" }}>Practice puzzles are drawn from the full puzzle bank · scores don't count</p>
            </div>
          </div>
        );
      })()}

      {/* BADGES DISPLAY in score history - handled within ScoreHistoryModal */}

      {/* SHARE CARD PREVIEW MODAL */}
      {sharePreview && (
        <div style={{ position:"fixed", inset:0, zIndex:400, display:"flex", alignItems:"center", justifyContent:"center" }} onClick={() => setSharePreview(null)}>
          <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.92)", backdropFilter:"blur(8px)" }} />
          <div style={{ position:"relative", width:"min(420px,92vw)", display:"flex", flexDirection:"column", alignItems:"center", gap:14 }} onClick={e => e.stopPropagation()}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", width:"100%" }}>
              <p style={{ margin:0, color:"#ffd700", fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.1rem", letterSpacing:"0.1em" }}>YOUR RESULT CARD</p>
              <button onClick={() => setSharePreview(null)} style={{ background:"none", border:"none", color:"#6b7280", cursor:"pointer", fontSize:"1.3rem" }}>✕</button>
            </div>
            <img src={sharePreview} alt="Share card" style={{ width:"100%", borderRadius:12, border:"1px solid rgba(255,255,255,0.1)", boxShadow:"0 20px 60px rgba(0,0,0,0.8)" }} />
            <div style={{ display:"flex", gap:10, width:"100%" }}>
              {/* Native share (mobile) */}
              {typeof navigator !== "undefined" && navigator.share && (
                <button onClick={() => { share(); setSharePreview(null); }} style={{ flex:1, padding:"13px", borderRadius:10, border:"none", background:"linear-gradient(135deg,#ffd700,#f59e0b)", color:"#0a0c10", fontWeight:900, fontSize:"0.9rem", cursor:"pointer", fontFamily:"'Bebas Neue',sans-serif", letterSpacing:"0.1em" }}>
                  📤 SHARE
                </button>
              )}
              {/* Download */}
              <button onClick={() => {
                const a = document.createElement("a");
                a.href = sharePreview;
                a.download = "statsiq-result.png";
                a.click();
                setSharePreview(null);
              }} style={{ flex:1, padding:"13px", borderRadius:10, border:"1px solid rgba(255,215,0,0.3)", background:"rgba(255,215,0,0.07)", color:"#ffd700", fontWeight:900, fontSize:"0.9rem", cursor:"pointer", fontFamily:"'Bebas Neue',sans-serif", letterSpacing:"0.1em" }}>
                ⬇ SAVE IMAGE
              </button>
              {/* Copy text fallback */}
              <button onClick={() => {
                navigator.clipboard?.writeText(buildDayShareText())
                  .then(() => { setCopied(true); setTimeout(()=>setCopied(false),2000); setSharePreview(null); });
              }} style={{ flex:1, padding:"13px", borderRadius:10, border:"1px solid rgba(255,255,255,0.1)", background:"rgba(255,255,255,0.04)", color: copied ? "#22c55e" : "#9ca3af", fontWeight:900, fontSize:"0.9rem", cursor:"pointer", fontFamily:"'Bebas Neue',sans-serif", letterSpacing:"0.1em" }}>
                {copied ? "✓ COPIED" : "📋 COPY TEXT"}
              </button>
            </div>
            <p style={{ margin:0, color:"#374151", fontSize:"0.65rem", textAlign:"center" }}>Save the image and post it — tag someone who'd know this stat line</p>
          </div>
        </div>
      )}

      {/* WEEKLY RECAP MODAL */}
      {showWeeklyRecap && weeklyData && (() => {
        const wd = weeklyData as Record<string,unknown>;
        const weekStart = wd.week_start as string;
        const weekEnd = new Date(new Date(weekStart).getTime() + 6 * 86400000).toISOString().slice(0,10);
        const fmt = (d: string) => { const [,m,day] = d.split("-"); return `${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][parseInt(m)-1]} ${parseInt(day)}`; };
        const dots = (wd.dots || {}) as Record<string, Record<string,unknown>>;
        const days = Array.from({length:7}, (_,i) => { const d = new Date(weekStart); d.setDate(d.getDate()+i); return d.toISOString().slice(0,10); });
        const badge = getScoreBadge(totalScore);
        const diffColor: Record<string,string> = { easy:"#22c55e", medium:"#f59e0b", hard:"#ef4444" };
        return (
          <div style={{ position:"fixed", inset:0, zIndex:600, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(0,0,0,0.9)", backdropFilter:"blur(8px)" }}>
            <div style={{ position:"relative", width:"min(420px,95vw)", background:"#0a0c14", border:"1px solid rgba(255,215,0,0.15)", borderRadius:20, overflow:"hidden", boxShadow:"0 0 80px rgba(255,215,0,0.08), 0 40px 80px rgba(0,0,0,0.6)" }}>

              {/* Header */}
              <div style={{ background:"linear-gradient(135deg, #1a1400, #0f0c00, #1a1400)", borderBottom:"1px solid rgba(255,215,0,0.2)", padding:"22px 24px 18px", position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", top:-40, right:-40, width:120, height:120, background:"radial-gradient(circle, rgba(255,215,0,0.12) 0%, transparent 70%)", pointerEvents:"none" }} />
                <p style={{ margin:"0 0 4px", fontFamily:"'Barlow Condensed',sans-serif", fontSize:"0.62rem", letterSpacing:"0.25em", color:"rgba(255,215,0,0.5)", textTransform:"uppercase" }}>Weekly Recap · {fmt(weekStart)} – {fmt(weekEnd)}</p>
                <div style={{ display:"flex", alignItems:"baseline", gap:10 }}>
                  <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"2rem", color:"#ffd700", letterSpacing:"0.05em", lineHeight:1 }}>StatsIQ</span>
                  <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"1rem", color:"rgba(255,255,255,0.4)", letterSpacing:"0.08em" }}>WEEK IN REVIEW</span>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:8 }}>
                  <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:"0.85rem", fontWeight:700, color:"#fff", letterSpacing:"0.05em" }}>{username}</span>
                  {badge && <span style={{ background:"rgba(255,215,0,0.12)", border:"1px solid rgba(255,215,0,0.25)", borderRadius:4, padding:"1px 7px", fontFamily:"'Bebas Neue',sans-serif", fontSize:"0.65rem", color:"#ffd700", letterSpacing:"0.1em" }}>{badge.emoji} {badge.label.toUpperCase()}</span>}
                  {globalRank && <span style={{ background:"rgba(255,215,0,0.1)", border:"1px solid rgba(255,215,0,0.2)", borderRadius:6, padding:"2px 8px", fontFamily:"'Bebas Neue',sans-serif", fontSize:"0.7rem", color:"#ffd700" }}>#{globalRank} ALL TIME</span>}
                  {streakData.current > 0 && <span style={{ fontSize:"0.8rem" }}>{streakData.current}🔥</span>}
                </div>
              </div>

              {/* Big stats */}
              <div style={{ padding:"18px 24px 12px" }}>
                <div style={{ display:"flex", gap:10 }}>
                  {[
                    { val: String(wd.puzzles_played), key:"PLAYED", color:"#ffd700" },
                    { val: `${wd.win_rate}%`, key:"WIN RATE", color:"#22c55e" },
                    { val: (wd.weekly_score as number).toLocaleString(), key:"SCORE", color:"#fb923c" },
                  ].map(({val,key,color}) => (
                    <div key={key} style={{ flex:1, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:10, padding:"12px 8px", textAlign:"center" }}>
                      <span style={{ display:"block", fontFamily:"'Bebas Neue',sans-serif", fontSize: String(val).length > 5 ? "1.1rem" : "1.6rem", color, lineHeight:1 }}>{val}</span>
                      <span style={{ display:"block", fontFamily:"'Barlow Condensed',sans-serif", fontSize:"0.52rem", letterSpacing:"0.18em", color:"rgba(255,255,255,0.3)", marginTop:4 }}>{key}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Daily dots */}
              <div style={{ padding:"0 24px 12px" }}>
                <p style={{ margin:"0 0 6px", fontFamily:"'Barlow Condensed',sans-serif", fontSize:"0.55rem", letterSpacing:"0.18em", color:"rgba(255,255,255,0.2)", textTransform:"uppercase" }}>Daily Results · E M H</p>
                <div style={{ display:"flex", gap:4 }}>
                  {days.map(day => {
                    const dayData = dots[day] || {};
                    return (
                      <div key={day} style={{ display:"flex", flexDirection:"column", gap:3, flex:1, alignItems:"center" }}>
                        {(["easy","medium","hard"] as const).map(d => {
                          const entry = (dayData[d] || {}) as {won?: boolean; guesses?: number};
                          const hasEntry = dayData[d] !== undefined;
                          let bg = "rgba(255,255,255,0.08)";
                          if (hasEntry) {
                            if (!entry.won) bg = "#ef4444";
                            else if (entry.guesses === 1) bg = "#ffd700";
                            else if (entry.guesses === 2) bg = "#22c55e";
                            else bg = "#f59e0b";
                          }
                          return <div key={d} style={{ width:"100%", height:8, borderRadius:2, background:bg }} />;
                        })}
                        <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:"0.45rem", color:"rgba(255,255,255,0.2)", marginTop:2 }}>{["M","T","W","T","F","S","S"][new Date(day).getDay()]}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Difficulty bars */}
              <div style={{ padding:"0 24px 14px" }}>
                {(["easy","medium","hard"] as const).map(d => {
                  const pct = wd[`${d}_win_rate`] as number;
                  return (
                    <div key={d} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:7 }}>
                      <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"0.72rem", letterSpacing:"0.1em", color:diffColor[d], width:55, flexShrink:0 }}>{d.toUpperCase()}</span>
                      <div style={{ flex:1, height:6, background:"rgba(255,255,255,0.06)", borderRadius:3, overflow:"hidden" }}>
                        <div style={{ height:"100%", borderRadius:3, background:diffColor[d], width:`${pct}%`, opacity:0.8 }} />
                      </div>
                      <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"0.72rem", color:"rgba(255,255,255,0.35)", width:32, textAlign:"right" }}>{pct}%</span>
                    </div>
                  );
                })}
              </div>

              {/* Best puzzle */}
              {wd.best_puzzle && (
                <div style={{ margin:"0 24px 18px", background:"linear-gradient(135deg, rgba(255,215,0,0.06), rgba(255,215,0,0.02))", border:"1px solid rgba(255,215,0,0.12)", borderRadius:10, padding:"12px 14px" }}>
                  <p style={{ margin:"0 0 3px", fontFamily:"'Bebas Neue',sans-serif", fontSize:"0.6rem", letterSpacing:"0.2em", color:"rgba(255,215,0,0.4)" }}>🏆 BEST PUZZLE THIS WEEK</p>
                  <p style={{ margin:0, fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.1rem", color:"#ffd700", letterSpacing:"0.05em" }}>{String(wd.best_puzzle).toUpperCase()}</p>
                  <p style={{ margin:"2px 0 0", fontFamily:"'Barlow Condensed',sans-serif", fontSize:"0.72rem", color:"rgba(255,255,255,0.4)" }}>{String(wd.best_puzzle_diff).toUpperCase()} · Got it in {wd.best_puzzle_clues} clue{wd.best_puzzle_clues === 1 ? "" : "s"}</p>
                </div>
              )}

              {/* Footer */}
              <div style={{ borderTop:"1px solid rgba(255,255,255,0.05)", padding:"14px 24px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <button onClick={() => setShowPastSummaries(true)} style={{ background:"none", border:"none", color:"rgba(255,255,255,0.25)", fontFamily:"'Barlow Condensed',sans-serif", fontSize:"0.6rem", letterSpacing:"0.12em", cursor:"pointer", textDecoration:"underline", padding:0 }}>VIEW PAST WEEKS</button>
                <div style={{ display:"flex", gap:8 }}>
                  <button onClick={() => {
                    const text = `📊 StatsIQ Week in Review\n${fmt(weekStart)}–${fmt(weekEnd)}\n\n${username} · ${wd.puzzles_played} puzzles · ${wd.win_rate}% win rate\nScore: ${(wd.weekly_score as number).toLocaleString()}\n\nstatsiq.io`;
                    navigator.clipboard?.writeText(text).then(() => toast("Copied to clipboard! 📋", 2000));
                  }} style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"0.8rem", letterSpacing:"0.1em", background:"#ffd700", color:"#0a0c14", border:"none", borderRadius:8, padding:"8px 16px", cursor:"pointer" }}>📤 SHARE</button>
                  <button onClick={() => setShowWeeklyRecap(false)} style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"0.8rem", letterSpacing:"0.1em", background:"rgba(255,255,255,0.08)", color:"rgba(255,255,255,0.6)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, padding:"8px 16px", cursor:"pointer" }}>PLAY TODAY →</button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* PAST SUMMARIES MODAL */}
      {showPastSummaries && (
        <div style={{ position:"fixed", inset:0, zIndex:700, display:"flex", alignItems:"center", justifyContent:"center" }} onClick={() => setShowPastSummaries(false)}>
          <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.8)", backdropFilter:"blur(4px)" }} />
          <div style={{ position:"relative", width:"min(420px,95vw)", maxHeight:"80vh", background:"#0a0c14", border:"1px solid rgba(255,255,255,0.1)", borderRadius:16, overflow:"hidden", display:"flex", flexDirection:"column" }} onClick={e => e.stopPropagation()}>
            <div style={{ padding:"18px 20px 14px", borderBottom:"1px solid rgba(255,255,255,0.07)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <p style={{ margin:0, fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.1rem", color:"#fff", letterSpacing:"0.08em" }}>PAST WEEKLY RECAPS</p>
              <button onClick={() => setShowPastSummaries(false)} style={{ background:"none", border:"none", color:"#4b5563", cursor:"pointer", fontSize:"1.2rem" }}>✕</button>
            </div>
            <div style={{ overflowY:"auto", flex:1, padding:"12px 20px" }}>
              {pastSummaries.length === 0 ? (
                <p style={{ color:"#4b5563", fontFamily:"'Barlow Condensed',sans-serif", fontSize:"0.85rem", textAlign:"center", padding:"20px 0" }}>No past summaries yet</p>
              ) : pastSummaries.map((s, i) => {
                const ws = s.week_start as string;
                const we = new Date(new Date(ws).getTime() + 6 * 86400000).toISOString().slice(0,10);
                const fmt2 = (d: string) => { const [,m,day] = d.split("-"); return `${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][parseInt(m)-1]} ${parseInt(day)}`; };
                return (
                  <div key={i} style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:10, padding:"12px 14px", marginBottom:10 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
                      <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:"0.75rem", color:"rgba(255,255,255,0.5)", letterSpacing:"0.1em" }}>{fmt2(ws)} – {fmt2(we)}</span>
                      <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"0.9rem", color:"#ffd700" }}>{(s.weekly_score as number).toLocaleString()} pts</span>
                    </div>
                    <div style={{ display:"flex", gap:16 }}>
                      <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:"0.72rem", color:"rgba(255,255,255,0.4)" }}>{s.puzzles_played as number} played</span>
                      <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:"0.72rem", color:"#22c55e" }}>{s.win_rate as number}% wins</span>
                      {s.best_puzzle && <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:"0.72rem", color:"rgba(255,215,0,0.6)" }}>🏆 {String(s.best_puzzle)}</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* EXTENDED STATS MODAL */}
      {showExtendedStats && (() => {
        // Calculate stats from localStorage
        const entries: {diff:string, sport:string, era:string, won:boolean, guesses:number}[] = [];
        try {
          for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i) || "";
            if (!k.startsWith("statsiq_day_")) continue;
            const parts = k.split("_");
            if (parts.length < 6) continue;
            const diff = parts[5];
            const entry = JSON.parse(localStorage.getItem(k) || "{}");
            if (!entry || entry.score === undefined) continue;
            entries.push({ diff, sport: entry.sport || "", era: entry.era || "", won: !!entry.won, guesses: entry.guesses || 3 });
          }
        } catch {}

        const sports = ["🏀 NBA","🏈 NFL","⚾ MLB","⚽ Soccer","🎾 Tennis","⛳ Golf","🏒 NHL"];
        const sportEmojis: Record<string,string> = { "🏀 NBA":"🏀","🏈 NFL":"🏈","⚾ MLB":"⚾","⚽ Soccer":"⚽","🎾 Tennis":"🎾","⛳ Golf":"⛳","🏒 NHL":"🏒" };
        const diffs = ["easy","medium","hard"];
        const diffColors: Record<string,string> = { easy:"#22c55e", medium:"#f59e0b", hard:"#ef4444" };
        const eras = ["modern","classic","legends"];

        const calcWinRate = (filter: (e: typeof entries[0]) => boolean) => {
          const filtered = entries.filter(filter);
          if (filtered.length === 0) return null;
          return { wins: filtered.filter(e => e.won).length, total: filtered.length, pct: Math.round((filtered.filter(e => e.won).length / filtered.length) * 100) };
        };

        return (
          <div style={{ position:"fixed", inset:0, zIndex:500, display:"flex", alignItems:"center", justifyContent:"center" }} onClick={() => setShowExtendedStats(false)}>
            <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.8)", backdropFilter:"blur(4px)" }} />
            <div style={{ position:"relative", width:"min(440px,95vw)", maxHeight:"88vh", background:"#0a0c14", border:"1px solid rgba(255,255,255,0.08)", borderRadius:18, overflow:"hidden", display:"flex", flexDirection:"column", boxShadow:"0 40px 80px rgba(0,0,0,0.8)" }} onClick={e => e.stopPropagation()}>

              {/* Header */}
              <div style={{ padding:"18px 20px 14px", borderBottom:"1px solid rgba(255,255,255,0.07)", display:"flex", justifyContent:"space-between", alignItems:"center", flexShrink:0 }}>
                <div>
                  <p style={{ margin:"0 0 2px", fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.2rem", color:"#fff", letterSpacing:"0.08em" }}>📊 EXTENDED STATS</p>
                  <p style={{ margin:0, fontFamily:"'Barlow Condensed',sans-serif", fontSize:"0.65rem", color:"#4b5563" }}>Based on your all-time play history</p>
                </div>
                <button onClick={() => setShowExtendedStats(false)} style={{ background:"none", border:"none", color:"#4b5563", cursor:"pointer", fontSize:"1.2rem" }}>✕</button>
              </div>

              <div style={{ overflowY:"auto", flex:1, padding:"16px 20px" }}>

                {/* By Difficulty */}
                <p style={{ margin:"0 0 8px", fontFamily:"'Bebas Neue',sans-serif", fontSize:"0.7rem", letterSpacing:"0.2em", color:"rgba(255,255,255,0.2)" }}>WIN RATE BY DIFFICULTY</p>
                <div style={{ marginBottom:18 }}>
                  {diffs.map(d => {
                    const stat = calcWinRate(e => e.diff === d);
                    if (!stat) return null;
                    return (
                      <div key={d} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
                        <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"0.75rem", color:diffColors[d], width:55, flexShrink:0 }}>{d.toUpperCase()}</span>
                        <div style={{ flex:1, height:8, background:"rgba(255,255,255,0.05)", borderRadius:4, overflow:"hidden" }}>
                          <div style={{ height:"100%", borderRadius:4, background:diffColors[d], width:`${stat.pct}%`, opacity:0.8 }} />
                        </div>
                        <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"0.75rem", color:"rgba(255,255,255,0.4)", width:55, textAlign:"right" }}>{stat.wins}/{stat.total} · {stat.pct}%</span>
                      </div>
                    );
                  })}
                </div>

                {/* By Sport */}
                <p style={{ margin:"0 0 8px", fontFamily:"'Bebas Neue',sans-serif", fontSize:"0.7rem", letterSpacing:"0.2em", color:"rgba(255,255,255,0.2)" }}>WIN RATE BY SPORT</p>
                <div style={{ marginBottom:18 }}>
                  {sports.map(s => {
                    const emoji = sportEmojis[s];
                    const stat = calcWinRate(e => e.sport.includes(emoji));
                    if (!stat) return null;
                    return (
                      <div key={s} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
                        <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:"0.75rem", color:"rgba(255,255,255,0.6)", width:65, flexShrink:0 }}>{s}</span>
                        <div style={{ flex:1, height:8, background:"rgba(255,255,255,0.05)", borderRadius:4, overflow:"hidden" }}>
                          <div style={{ height:"100%", borderRadius:4, background:"#ffd700", width:`${stat.pct}%`, opacity:0.7 }} />
                        </div>
                        <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"0.75rem", color:"rgba(255,255,255,0.4)", width:55, textAlign:"right" }}>{stat.wins}/{stat.total} · {stat.pct}%</span>
                      </div>
                    );
                  })}
                </div>

                {/* By Era */}
                <p style={{ margin:"0 0 8px", fontFamily:"'Bebas Neue',sans-serif", fontSize:"0.7rem", letterSpacing:"0.2em", color:"rgba(255,255,255,0.2)" }}>WIN RATE BY ERA</p>
                <div style={{ marginBottom:8 }}>
                  {eras.map(era => {
                    const stat = calcWinRate(e => e.era === era);
                    if (!stat) return null;
                    return (
                      <div key={era} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
                        <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"0.75rem", color:"rgba(255,255,255,0.6)", width:65, flexShrink:0, textTransform:"uppercase" }}>{era}</span>
                        <div style={{ flex:1, height:8, background:"rgba(255,255,255,0.05)", borderRadius:4, overflow:"hidden" }}>
                          <div style={{ height:"100%", borderRadius:4, background:"#a78bfa", width:`${stat.pct}%`, opacity:0.8 }} />
                        </div>
                        <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"0.75rem", color:"rgba(255,255,255,0.4)", width:55, textAlign:"right" }}>{stat.wins}/{stat.total} · {stat.pct}%</span>
                      </div>
                    );
                  })}
                </div>

              </div>
            </div>
          </div>
        );
      })()}

      {/* PRO UPGRADE MODAL */}
      {showProModal && (
        <div style={{ position:"fixed", inset:0, zIndex:500, display:"flex", alignItems:"center", justifyContent:"center" }} onClick={() => setShowProModal(false)}>
          <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.8)", backdropFilter:"blur(4px)" }} />
          <div style={{ position:"relative", background:"#0a0c14", border:"1px solid rgba(167,139,250,0.2)", borderRadius:20, padding:"28px 24px", width:"min(400px,92vw)", boxShadow:"0 40px 80px rgba(0,0,0,0.8)" }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowProModal(false)} style={{ position:"absolute", top:14, right:14, background:"none", border:"none", color:"#4b5563", cursor:"pointer", fontSize:"1.2rem" }}>✕</button>

            {/* Header */}
            <div style={{ textAlign:"center", marginBottom:22 }}>
              <p style={{ margin:"0 0 6px", fontSize:"2rem" }}>🏆</p>
              <p style={{ margin:"0 0 4px", fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.6rem", color:"#a78bfa", letterSpacing:"0.08em" }}>StatsIQ Pro</p>
              <p style={{ margin:0, fontFamily:"'Barlow Condensed',sans-serif", fontSize:"0.8rem", color:"#4b5563", letterSpacing:"0.1em" }}>UNLOCK THE FULL EXPERIENCE</p>
            </div>

            {/* Features */}
            <div style={{ marginBottom:22 }}>
              {[
                { icon:"🎮", title:"Unlimited Practice Mode", desc:"Free users get 10 per day — Pro unlocks unlimited" },
                { icon:"📊", title:"Extended Personal Stats", desc:"Win rate by sport, era, and difficulty" },
                { icon:"📅", title:"Weekly Recap History", desc:"Every week saved from the day you subscribe" },
                { icon:"⭐", title:"Pro Badge", desc:"Stand out on the global leaderboard" },
              ].map(({icon, title, desc}) => (
                <div key={title} style={{ display:"flex", alignItems:"flex-start", gap:12, marginBottom:14 }}>
                  <span style={{ fontSize:"1.2rem", flexShrink:0, marginTop:1 }}>{icon}</span>
                  <div>
                    <p style={{ margin:"0 0 1px", fontFamily:"'Barlow Condensed',sans-serif", fontSize:"0.85rem", fontWeight:700, color:"#fff", letterSpacing:"0.03em" }}>{title}</p>
                    <p style={{ margin:0, fontFamily:"'Barlow Condensed',sans-serif", fontSize:"0.72rem", color:"#4b5563" }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Price */}
            <div style={{ background:"rgba(167,139,250,0.06)", border:"1px solid rgba(167,139,250,0.15)", borderRadius:12, padding:"14px 16px", marginBottom:16, textAlign:"center" }}>
              <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"2rem", color:"#a78bfa", letterSpacing:"0.05em" }}>$4.99</span>
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:"0.8rem", color:"#4b5563", marginLeft:4 }}>/month</span>
              <p style={{ margin:"4px 0 0", fontFamily:"'Barlow Condensed',sans-serif", fontSize:"0.65rem", color:"#374151", letterSpacing:"0.1em" }}>CANCEL ANYTIME</p>
            </div>

            {/* CTA */}
            <a href="https://buy.stripe.com/5kQ3cv55g7Q01La8kH1Fe00" target="_blank" rel="noopener noreferrer" style={{ display:"block", textAlign:"center", background:"linear-gradient(135deg, #7c3aed, #a78bfa)", color:"#fff", fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.1rem", letterSpacing:"0.1em", padding:"14px", borderRadius:10, textDecoration:"none", marginBottom:10 }}>
              UPGRADE TO PRO →
            </a>
            <p style={{ margin:0, textAlign:"center", fontFamily:"'Barlow Condensed',sans-serif", fontSize:"0.62rem", color:"#374151", letterSpacing:"0.08em" }}>Secured by Stripe · Apple Pay & Google Pay accepted</p>
          </div>
        </div>
      )}

      {/* REPORT ERROR MODAL */}
      {showReportModal && (
        <div style={{ position:"fixed", inset:0, zIndex:500, display:"flex", alignItems:"center", justifyContent:"center" }} onClick={() => setShowReportModal(false)}>
          <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.7)", backdropFilter:"blur(4px)" }} />
          <div style={{ position:"relative", background:"#0f1629", border:"1px solid rgba(255,255,255,0.1)", borderRadius:16, padding:"22px", width:"min(420px,90vw)", boxShadow:"0 20px 60px rgba(0,0,0,0.8)" }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowReportModal(false)} style={{ position:"absolute", top:14, right:14, background:"none", border:"none", color:"#4b5563", cursor:"pointer", fontSize:"1.2rem" }}>✕</button>
            {reportSent ? (
              <div style={{ textAlign:"center", padding:"20px 0" }}>
                <p style={{ fontSize:"2rem", margin:"0 0 8px" }}>✅</p>
                <p style={{ margin:0, color:"#22c55e", fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.1rem", letterSpacing:"0.1em" }}>THANKS FOR THE REPORT</p>
                <p style={{ margin:"6px 0 0", color:"#6b7280", fontSize:"0.75rem" }}>Your email app should open — just hit send</p>
              </div>
            ) : (
              <>
                <div style={{ marginBottom:14 }}>
                  <p style={{ margin:"0 0 2px", color:"#fff", fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.1rem", letterSpacing:"0.08em" }}>🚩 REPORT A FACT ERROR</p>
                  <p style={{ margin:0, color:"#6b7280", fontSize:"0.72rem" }}>Player: <span style={{ color:"#ffd700" }}>{player}</span> · {diff.toUpperCase()}</p>
                </div>
                <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:8, padding:"10px 12px", marginBottom:12 }}>
                  <p style={{ margin:"0 0 6px", color:"#4b5563", fontSize:"0.6rem", letterSpacing:"0.12em", fontFamily:"'Bebas Neue',sans-serif" }}>CLUES SHOWN</p>
                  {clues.map((clue, i) => (
                    <p key={i} style={{ margin:"0 0 4px", color:"#9ca3af", fontSize:"0.72rem", lineHeight:1.4 }}>
                      <span style={{ color:"#374151" }}>{i+1}.</span> {clue}
                    </p>
                  ))}
                </div>
                <textarea
                  id="statsiq-report-input"
                  value={reportText}
                  onChange={e => setReportText(e.target.value)}
                  placeholder="What's wrong? e.g. 'He was on the Mets in 1985, not the Expos'"
                  rows={3}
                  style={{ width:"100%", boxSizing:"border-box", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, padding:"10px 12px", color:"#fff", fontSize:"0.78rem", resize:"vertical", fontFamily:"'Barlow Condensed',sans-serif", outline:"none", lineHeight:1.5 }}
                />
                <button
                  onClick={() => {
                    const txt = (document.getElementById("statsiq-report-input") as HTMLTextAreaElement)?.value || reportText;
                    if (!txt.trim()) return;
                    fetch("https://formspree.io/f/xlgzkjoz", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        player,
                        difficulty: diff,
                        sport,
                        issue: txt.trim(),
                        clues: clues.join(" | "),
                        ctx,
                      }),
                    }).catch(() => {});
                    setReportSent(true);
                    setTimeout(() => { setShowReportModal(false); setReportSent(false); setReportText(""); }, 2200);
                  }}
                  style={{ marginTop:10, width:"100%", padding:"11px", borderRadius:8, border:"none", background:"rgba(239,68,68,0.85)", color:"#fff", fontWeight:900, fontFamily:"'Bebas Neue',sans-serif", letterSpacing:"0.1em", cursor:"pointer", fontSize:"0.9rem" }}
                >
                  SEND REPORT
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* EMAIL CAPTURE MODAL */}
      {showEmailCapture && !emailSubmitted && (
        <div style={{ position:"fixed", inset:0, zIndex:400, display:"flex", alignItems:"flex-end", justifyContent:"center" }} onClick={() => setShowEmailCapture(false)}>
          <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.5)", backdropFilter:"blur(3px)" }} />
          <div style={{ position:"relative", background:"#0f1629", borderTop:"1px solid rgba(255,255,255,0.08)", borderLeft:"1px solid rgba(255,255,255,0.06)", borderRight:"1px solid rgba(255,255,255,0.06)", borderRadius:"16px 16px 0 0", padding:"22px 22px 36px", width:"min(500px,100vw)", boxShadow:"0 -20px 60px rgba(0,0,0,0.6)" }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowEmailCapture(false)} style={{ position:"absolute", top:14, right:14, background:"none", border:"none", color:"#4b5563", cursor:"pointer", fontSize:"1.2rem" }}>✕</button>

            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
              <span style={{ fontSize:"1.5rem" }}>🔔</span>
              <div>
                <h3 style={{ margin:0, color:"#fff", fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.2rem", letterSpacing:"0.08em" }}>NEVER MISS A DAY</h3>
                <p style={{ margin:0, color:"#6b7280", fontSize:"0.7rem" }}>Get a daily reminder when your new puzzles drop</p>
              </div>
            </div>

            <div style={{ display:"flex", gap:8, marginBottom:10 }}>
              <input
                value={emailInput}
                onChange={e => setEmailInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && emailInput.includes("@") && handleEmailSubmit()}
                placeholder="your@email.com"
                type="email"
                style={{ flex:1, padding:"11px 14px", borderRadius:10, border:`1px solid ${emailInput.includes("@") ? "rgba(255,215,0,0.4)" : "rgba(255,255,255,0.1)"}`, background:"rgba(255,255,255,0.05)", color:"#fff", fontSize:"0.95rem", fontFamily:"'Barlow Condensed',sans-serif" }}
              />
              <button
                onClick={handleEmailSubmit}
                disabled={!emailInput.includes("@")}
                style={{ padding:"11px 18px", borderRadius:10, border:"none", background: emailInput.includes("@") ? "linear-gradient(135deg,#ffd700,#f59e0b)" : "rgba(100,100,100,0.3)", color: emailInput.includes("@") ? "#0a0c10" : "#555", fontWeight:900, fontSize:"0.85rem", cursor: emailInput.includes("@") ? "pointer" : "not-allowed", fontFamily:"'Bebas Neue',sans-serif", letterSpacing:"0.1em", whiteSpace:"nowrap" }}>
                REMIND ME
              </button>
            </div>
            <p style={{ margin:0, color:"#374151", fontSize:"0.6rem", textAlign:"center" }}>No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      )}

      {/* EMAIL SUBMITTED CONFIRMATION */}
      {emailSubmitted && showEmailCapture && (
        <div style={{ position:"fixed", inset:0, zIndex:400, display:"flex", alignItems:"center", justifyContent:"center" }} onClick={() => setShowEmailCapture(false)}>
          <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.8)" }} />
          <div style={{ position:"relative", background:"#0f1629", border:"1px solid rgba(34,197,94,0.3)", borderRadius:16, padding:"32px 28px", width:"min(340px,90vw)", textAlign:"center" }}>
            <p style={{ margin:"0 0 8px", fontSize:"2.5rem" }}>🎉</p>
            <h3 style={{ margin:"0 0 8px", color:"#22c55e", fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.4rem", letterSpacing:"0.1em" }}>YOU'RE IN!</h3>
            <p style={{ margin:"0 0 20px", color:"#9ca3af", fontSize:"0.82rem", lineHeight:1.5 }}>Your daily reminder arrives at 10 AM. See you then.</p>
            <button onClick={() => setShowEmailCapture(false)} style={{ padding:"12px 28px", borderRadius:10, border:"none", background:"rgba(34,197,94,0.2)", color:"#22c55e", fontWeight:900, cursor:"pointer", fontFamily:"'Bebas Neue',sans-serif", letterSpacing:"0.1em" }}>
              LET'S GO →
            </button>
          </div>
        </div>
      )}

      {msg && <div style={{ position:"fixed", top:70, left:"50%", transform:"translateX(-50%)", zIndex:500, background:"#fff", color:"#111", padding:"9px 22px", borderRadius:8, fontWeight:700, fontSize:"0.88rem", boxShadow:"0 8px 32px rgba(0,0,0,0.4)", whiteSpace:"nowrap", fontFamily:"'Barlow Condensed', sans-serif" }}>{msg}</div>}


      {/* ABOUT FOOTER */}
      <div style={{ width:"100%", maxWidth:500, padding:"24px 18px 8px", marginTop:16, borderTop:"1px solid rgba(255,255,255,0.05)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div>
          <p style={{ margin:0, color:"#374151", fontSize:"0.62rem", letterSpacing:"0.15em", fontFamily:"'Bebas Neue',sans-serif" }}>BUILT BY BP</p>
          <p style={{ margin:0, color:"#1f2937", fontSize:"0.58rem", marginTop:2 }}>statsiq.io · daily sports trivia</p>
        </div>
        <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap", justifyContent:"flex-end" }}>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" style={{ display:"none" }}>𝕏</a>
          <button onClick={() => setShowEmailCapture(true)} style={{ background:"none", border:"1px solid rgba(255,255,255,0.06)", borderRadius:6, padding:"4px 10px", color:"#374151", cursor:"pointer", fontSize:"0.62rem", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, letterSpacing:"0.1em" }}>📬 GET REMINDERS</button>
          {recoveryCode
            ? <button onClick={() => setShowRecoveryCode(true)} style={{ background:"none", border:"1px solid rgba(255,255,255,0.06)", borderRadius:6, padding:"4px 10px", color:"#374151", cursor:"pointer", fontSize:"0.62rem", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, letterSpacing:"0.1em" }}>🔑 MY CODE</button>
            : <button onClick={() => setShowRecoverModal(true)} style={{ background:"none", border:"1px solid rgba(255,255,255,0.06)", borderRadius:6, padding:"4px 10px", color:"#374151", cursor:"pointer", fontSize:"0.62rem", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, letterSpacing:"0.1em" }}>🔑 RECOVER</button>
          }
        </div>
      </div>

      <Analytics />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;700;900&display=swap');
        * { box-sizing:border-box; } body { margin:0; background:#080c14; }
        input::placeholder { color:rgba(255,255,255,0.2); } input:focus { outline:none; }
        input[type="text"], input:not([type]) { font-size:16px !important; }
        html { scroll-behavior:smooth; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.7} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
}
