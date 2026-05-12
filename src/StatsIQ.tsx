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
  { player:"Magic Johnson", sport:"🏀 NBA", answer:"MAGIC", era:"classic", stats:{PTS:"26.2",REB:"7",AST:"12.2",STL:"2.3"}, ctx:"1987 NBA Finals MVP — Los Angeles Lakers", clues:["His team defeated the Indiana Pacers in 6 games","His team defeated the Boston Celtics","Nicknamed Magic for his passing ability","Wore number 32 for the Showtime Lakers"] },
  { player:"Larry Bird", sport:"🏀 NBA", answer:"BIRD", era:"classic", stats:{PTS:"29",REB:"11.5",AST:"6.1",TEAM:"Celtics"}, ctx:"1984 NBA Finals MVP — Boston Celtics", clues:["His team came back from 3-2 down to win the series","His team defeated the Los Angeles Lakers","Grew up in French Lick Indiana and was nearly impossible to guard due to his court vision and shooting","Nicknamed The Hick from French Lick"] },
  { player:"Tom Brady", sport:"🏈 NFL", answer:"BRADY", era:"modern", stats:{YDS:"505",TD:"3",INT:"0",COMP:"43"}, ctx:"Super Bowl LII vs Philadelphia Eagles 2018", clues:["His team lost despite these numbers","His 8th Super Bowl appearance","Has more Super Bowl victories than any other player in NFL history","Won 7 Super Bowls total"] },
  { player:"Patrick Mahomes", sport:"🏈 NFL", answer:"MAHOMES", era:"modern", stats:{YDS:"360",TD:"3",INT:"0",COMP:"21"}, ctx:"Super Bowl LVII MVP vs Philadelphia Eagles", clues:["Had a famous 74-yard touchdown run in this game","Became the highest-paid player in NFL history when he signed his contract extension in 2020","His father Patrick Mahomes Sr. pitched in Major League Baseball for 11 seasons","Won his second Super Bowl"] },
  { player:"Jerry Rice", sport:"🏈 NFL", answer:"RICE", era:"classic", stats:{REC:"11",YDS:"215",TD:"3",YPR:"19.5"}, ctx:"Super Bowl XXIII — Named MVP", clues:["Ran a 4.71 40-yard dash at the combine — considered slow — but became the greatest receiver ever","Grew up in New Eagle Pennsylvania and was the backup to Joe Montana for years","Holds NFL records for career receptions, yards, and TDs","Holds NFL record for career TDs"] },
  { player:"Peyton Manning", sport:"🏈 NFL", answer:"MANNING", era:"modern", stats:{YDS:"5477",TD:"55",INT:"10",RTG:"115.1"}, ctx:"2013 NFL Season — Single season TD record", clues:["Retired with the most passing yards in NFL history at the time","Had a famous connection on 4th and 26 with Freddie Mitchell that saved the Eagles season in 2004","Was known for his pre-snap theatrics and audible calls that confused opposing defenses","Brother Eli also played QB in NFL"] },
  { player:"Walter Payton", sport:"🏈 NFL", answer:"PAYTON", era:"classic", stats:{CAR:"339",YDS:"1852",TD:"14",YPC:"5.5"}, ctx:"1977 NFL Season — Chicago Bears", clues:["Rushed for 1852 yards — NFL record at the time","Was nicknamed Sweetness for his graceful running style despite being one of the toughest runners ever","Holds the record for most rushing yards in a single game by a running back in NFL history","Nicknamed Sweetness"] },
  { player:"Joe Montana", sport:"🏈 NFL", answer:"MONTANA", era:"classic", stats:{YDS:"357",TD:"2",INT:"0",RTG:"115.2"}, ctx:"Super Bowl XIX MVP — San Francisco 49ers vs Dolphins", clues:["Was known for his ice-cold composure — never lost a Super Bowl in four appearances","Never threw an INT in 4 Super Bowls","Was known for the West Coast offense which he helped pioneer","Nicknamed Joe Cool for his composure"] },
  { player:"Babe Ruth", sport:"⚾ MLB", answer:"RUTH", era:"legends", stats:{HR:"60",AVG:".356",RBI:"164",OBP:".486"}, ctx:"1927 MLB Season — New York Yankees", clues:["Began his career as a pitcher for the Boston Red Sox before being converted to outfield","Adopted an 8-year-old child named Dorothy as a young adult — a little-known personal fact","Was known for calling his shot in the 1932 World Series — pointing to center field before hitting a homer","Nickname: Sultan of Swat"] },
  { player:"Barry Bonds", sport:"⚾ MLB", answer:"BONDS", era:"modern", stats:{HR:"73",AVG:".328",RBI:"137",OBP:".515"}, ctx:"2001 MLB Season — San Francisco Giants", clues:["Won 7 MVP awards — the most of any player in baseball history","Was intentionally walked 232 times in one season — teams preferred to put him on base than let him hit","His godfather was Willie Mays — one of the greatest outfielders who ever played","His godfather was Willie Mays"] },
  { player:"Derek Jeter", sport:"⚾ MLB", answer:"JETER", era:"modern", stats:{AVG:".309",HR:"9",RBI:"75",H:"184"}, ctx:"2000 World Series MVP Season — Yankees", clues:["Also won 4 Gold Gloves at his position","Nicknamed The Captain","Played entire career for Yankees","Made The Flip Play in 2001"] },
  { player:"Hank Aaron", sport:"⚾ MLB", answer:"AARON", era:"legends", stats:{HR:"40",AVG:".328",RBI:"130",SLG:".600"}, ctx:"1963 MLB Season — Milwaukee Braves", clues:["Hit 40 HRs and batted .328 this season","All-time HR record holder for decades","The Braves won 14 consecutive division titles — one of the most sustained runs in sport","Nicknamed Hammerin Hank"] },
  { player:"Ken Griffey Jr.", sport:"⚾ MLB", answer:"GRIFFEY", era:"classic", stats:{HR:"56",AVG:".303",RBI:"147",SLG:".628"}, ctx:"1997 MLB Season — Seattle Mariners", clues:["Won AL MVP this season","Hit 56 home runs","The Mariners won a record 116 games in 2001 but have never appeared in a World Series","Wore number 24, famous for his backward cap"] },
  { player:"Lionel Messi", sport:"⚽ Soccer", answer:"MESSI", era:"modern", stats:{G:"91",AST:"13",APP:"69",MIN:"5765"}, ctx:"2012 Calendar Year — FC Barcelona World Record", clues:["Record for most goals in a calendar year","Won the Ballon d'Or that year","Barcelona is owned by its members — a cooperative with over 150000 supporter-owners","From Argentina"] },
  { player:"Cristiano Ronaldo", sport:"⚽ Soccer", answer:"RONALDO", era:"modern", stats:{G:"50",AST:"15",APP:"55",MIN:"4743"}, ctx:"2011-12 La Liga Season — Real Madrid", clues:["Scored 50 La Liga goals in one season","Won La Liga that season","Real Madrid have won the most UEFA Champions League titles of any club in history","From Portugal"] },
  { player:"Pele", sport:"⚽ Soccer", answer:"PELE", era:"classic", stats:{G:"4",AST:"4",APP:"6",MIN:"540"}, ctx:"1970 FIFA World Cup — Brazil", clues:["Won his third World Cup with Brazil","Scored 4 goals and 4 assists in the tournament","Brazilian forward who played from the 1950s-70s","His real name is Edson Arantes do Nascimento"] },
  { player:"Roger Federer", sport:"🎾 ATP", answer:"FEDERER", era:"modern", stats:{W:"81",L:"4",TITLES:"8",GRAND_SLAMS:"3"}, ctx:"2005 ATP Season", clues:["Won 3 Grand Slams this year","Won Wimbledon this year","His rivalry with Rafael Nadal is considered the greatest in tennis history","Ended year ranked World No. 1"] },
  { player:"Serena Williams", sport:"🎾 WTA", answer:"SERENA", era:"modern", stats:{W:"78",L:"4",TITLES:"11",GRAND_SLAMS:"3"}, ctx:"2013 WTA Season — World No. 1", clues:["Won 3 Grand Slams including Wimbledon","Finished ranked World No. 1","From the United States","Sister Venus also plays professionally"] },
  { player:"Rafael Nadal", sport:"🎾 ATP", answer:"NADAL", era:"modern", stats:{W:"82",L:"3",TITLES:"8",GRAND_SLAMS:"1"}, ctx:"2010 ATP Season — Completed the Career Golden Slam", clues:["Won the French Open this year","Also won Wimbledon, US Open, and Australian Open","Has won the French Open more times than any player has won any Grand Slam","Has a stadium named after him in New York where the US Open is played"] },
  { player:"Tiger Woods", sport:"⛳ Golf", answer:"TIGER", era:"modern", stats:{WINS:"9",MAJORS:"3",AVG:"68.56",CUTS:"20/20"}, ctx:"2000 PGA Tour — Won 3 of 4 majors, made every cut", clues:["Won 3 of 4 majors this year","Made every single cut","Won US Open by 15 strokes","His last name is a large cat"] },
  { player:"Jack Nicklaus", sport:"⛳ Golf", answer:"NICKLAUS", era:"classic", stats:{W:"17",MAJORS:"2",AVG:"70.2",EARN:"$286K"}, ctx:"1972 PGA Tour Season — Two majors", clues:["Won The Masters and US Open this year","Known as The Golden Bear","Holds the record for most major championships (18)","Holds the record for most major championships (18)"] },
  { player:"Wayne Gretzky", sport:"🏒 NHL", answer:"GRETZKY", era:"classic", stats:{G:"92",AST:"120",PTS:"212",PIM:"26"}, ctx:"1981-82 NHL Season — Edmonton Oilers", clues:["All-time single-season goals record","212 points is the all-time record","The Oilers dynasty had Gretzky Messier Coffey and Fuhr — arguably the greatest team ever","Holds or shares 61 NHL records"] },
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
  { player:"Isiah Thomas", sport:"🏀 NBA", answer:"ISIAH", era:"classic", stats:{PTS:"33.0",REB:"8.0",AST:"8.0",STL:"1.8"}, ctx:"1988 NBA Finals MVP — Detroit Pistons", clues:["Scored 25 points in one quarter on a badly sprained ankle","Scored 25 points in one quarter on a bad ankle","The Bad Boys Pistons were notorious for their physical and intimidating style of play","Nicknamed Zeke, led the Bad Boys"] },
  { player:"Dominique Wilkins", sport:"🏀 NBA", answer:"DOMINIQUE", era:"classic", stats:{PTS:"30.3",REB:"6.8",AST:"2.7",STL:"1.3"}, ctx:"1985-86 NBA Season — Atlanta Hawks", clues:["Led the NBA in scoring with 30.3 PPG","From Paris France — grew up in Washington State before playing at the University of Georgia","Nicknamed The Human Highlight Film","Famous for his spectacular dunks"] },
  // Football - Modern
  { player:"Aaron Rodgers", sport:"🏈 NFL", answer:"RODGERS", era:"modern", stats:{YDS:"4643",TD:"48",INT:"6",RTG:"122.5"}, ctx:"2011 NFL Season — Green Bay Packers MVP", clues:["Set the NFL record for passer rating this season","Won his first MVP award","The Packers are the only community-owned franchise in major American professional sports","Won Super Bowl XLV this same year"] },
  { player:"Josh Allen", sport:"🏈 NFL", answer:"ALLEN", era:"modern", stats:{YDS:"4407",TD:"37",INT:"10",RUSH:"763"}, ctx:"2020 NFL Season — Buffalo Bills", clues:["Led Buffalo Bills to their best season in decades","Finished 2nd in MVP voting","Known for his cannon arm and rushing ability","From Firebaugh, California"] },
  { player:"Lamar Jackson", sport:"🏈 NFL", answer:"LAMAR", era:"modern", stats:{YDS:"3127",TD:"36",INT:"6",RUSH:"1206"}, ctx:"2019 NFL Season — Baltimore Ravens MVP", clues:["Won unanimous MVP award this season","Rushed for 1206 yards as a QB","The Ravens were founded in 1996 and named after Edgar Allan Poe's famous poem","First player to throw 36 TDs and rush for 1000 yards"] },
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
  { player:"Clayton Kershaw", sport:"⚾ MLB", answer:"KERSHAW", era:"modern", stats:{ERA:"1.77",W:"21",SO:"232",WHIP:"0.857"}, ctx:"2014 NL MVP and Cy Young — Los Angeles Dodgers", clues:["The last pitcher to win the MVP award outright","Had a 1.77 ERA this season","The Dodgers moved from Brooklyn to Los Angeles in 1958 breaking New York hearts","From Dallas, Texas, nicknamed The Claw"] },
  { player:"Shohei Ohtani", sport:"⚾ MLB", answer:"OHTANI", era:"modern", stats:{HR:"171",ERA:"2.91",SB:"50",MVP:"2"}, ctx:"Career through 2024 — The two-way phenomenon", clues:["Has won 2 AL MVP awards as both a pitcher AND hitter","Hit 50 home runs and stole 50 bases in the same season in 2023","First player since Babe Ruth to be an elite starter AND elite hitter in the same season","Won AL MVP in 2021 with 46 HRs and a 3.18 ERA — the first unanimous two-way MVP"] },
  { player:"Ronald Acuna Jr.", sport:"⚾ MLB", answer:"ACUNA", era:"modern", stats:{HR:"41",SB:"73",AVG:".337",AGE:"25"}, ctx:"2023 NL MVP Season — Historic 40-70 club", clues:["First player in MLB history to hit 40 HRs and steal 70 bases in one season","Won the NL MVP award unanimously","Became the first player in MLB history to record a 40 HR and 60 SB season","Was named to 5 All-Star teams before age 26"] },
  { player:"Mookie Betts", sport:"⚾ MLB", answer:"MOOKIE", era:"modern", stats:{HR:"220",AVG:".296",SB:"140",GG:"6"}, ctx:"Career highlights — Five-tool superstar", clues:["Won 6 Gold Gloves as one of the best defensive outfielders ever","Won both the AL MVP and a World Series in the same year (2018)","Has hit over 200 home runs and stolen over 100 bases in his career","One of fewer than 10 players in MLB history to hit 20 HR and steal 20 bases in 5 different seasons"] },
  { player:"Freddie Freeman", sport:"⚾ MLB", answer:"FREEMAN", era:"modern", stats:{AVG:".302",HR:"252",RBI:"1114",WS:"2"}, ctx:"Career highlights — Two-franchise cornerstone", clues:["Won World Series championships with both Atlanta and Los Angeles","Won the NL MVP award in 2020","Hit over .300 with 30+ HRs in 6 different seasons","Was a 6-time All-Star and won a Gold Glove at first base"] },
  { player:"Juan Soto", sport:"⚾ MLB", answer:"SOTO", era:"modern", stats:{AVG:".314",HR:"34",RBI:"109",OBP:".465"}, ctx:"2021 MLB Season — Washington Nationals", clues:["Led the NL in OBP with .465","From Santo Domingo Dominican Republic — signed his first MLB contract at age 17","From Santo Domingo, Dominican Republic","Known for the Soto Shuffle at the plate"] },
  { player:"Ichiro Suzuki", sport:"⚾ MLB", answer:"ICHIRO", era:"modern", stats:{H:"262",AVG:".372",SB:"36",RBI:"69"}, ctx:"2004 MLB Season — Seattle Mariners, all-time hits record", clues:["Routinely beat out infield grounders that most players would not run out","Won both MVP and Gold Glove awards this year","The Mariners won a record 116 games in 2001 but have never appeared in a World Series","From Toyoyama, Japan — first Japanese position player in MLB"] },
  // Baseball - Classic
  { player:"Roger Clemens", sport:"⚾ MLB", answer:"CLEMENS", era:"classic", stats:{ERA:"1.93",W:"21",SO:"291",WHIP:"0.970"}, ctx:"1997 AL Cy Young Season — Toronto Blue Jays", clues:["Signed with Toronto as a free agent before this season","Struck out 291 batters","Was nicknamed Rocket and had one of the fastest fastballs in baseball history","Known as one of the most intimidating pitchers ever"] },
  { player:"Frank Thomas", sport:"⚾ MLB", answer:"THOMAS", era:"classic", stats:{HR:"41",AVG:".323",RBI:"128",OBP:".426"}, ctx:"1994 AL MVP Season — Chicago White Sox", clues:["Won his second consecutive AL MVP","The White Sox were at the center of the 1919 Black Sox scandal — the greatest fix in baseball history","Nicknamed The Big Hurt","6ft 5in first baseman with elite plate discipline"] },
  { player:"Jeff Bagwell", sport:"⚾ MLB", answer:"BAGWELL", era:"classic", stats:{HR:"39",AVG:".368",RBI:"116",OPS:"1.201"}, ctx:"1994 NL MVP Season — Houston Astros", clues:["Won the NL MVP in the strike-shortened season","Had an OPS over 1.200","The Astros rebuilt from one of the worst teams in history to become a dynasty","Known for his unusual wide batting stance"] },
  { player:"Tony Gwynn", sport:"⚾ MLB", answer:"GWYNN", era:"classic", stats:{AVG:".394",HR:"12",H:"165",SO:"19"}, ctx:"1994 MLB Season — San Diego Padres", clues:["Hit .394 — closest to .400 since Ted Williams","Struck out only 19 times all season","The Padres have reached the World Series twice but have never won it","His T206 baseball card is the most valuable in history"] },
  { player:"Nolan Ryan", sport:"⚾ MLB", answer:"RYAN", era:"classic", stats:{ERA:"3.20",SO:"301",W:"16",NH:"1"}, ctx:"1990 MLB Season — Texas Rangers", clues:["Threw his 6th career no-hitter at age 43","Still threw over 95 mph at 43 years old","The Rangers reached consecutive World Series in 2010 and 2011 but lost both times","All-time strikeout leader with 5714 Ks"] },
  // Soccer - Modern
  { player:"Kylian Mbappe", sport:"⚽ Soccer", answer:"MBAPPE", era:"modern", stats:{G:"8",AST:"3",APP:"6",MIN:"480"}, ctx:"2018 FIFA World Cup — France", clues:["Became only the second teenager ever to score in a World Cup Final (after Pele in 1958)","Won the World Cup at just 19 years old","Scored 8 goals in his first 2 World Cups combined","Moved to Real Madrid in 2024 after breaking the all-time PSG scoring record"] },
  { player:"Erling Haaland", sport:"⚽ Soccer", answer:"HAALAND", era:"modern", stats:{G:"36",AST:"8",APP:"35",MIN:"2769"}, ctx:"2022-23 Premier League — Record-breaking season", clues:["Set the Premier League single-season goals record at 36 goals","Scored over 1 goal per game in his career — the best ratio in top-flight history","Won the Treble with Manchester City (Premier League, FA Cup, Champions League)","Scored 5 goals in a single Champions League game — twice"] },
  { player:"Robert Lewandowski", sport:"⚽ Soccer", answer:"LEWANDOWSKI", era:"modern", stats:{G:"41",AST:"7",APP:"29",MIN:"2458"}, ctx:"2020-21 Bundesliga Season — Bayern Munich", clues:["Broke Gerd Muller's 49-year-old Bundesliga scoring record","Scored 41 Bundesliga goals in one season","Bayern Munich have won the Bundesliga more times than any other German club","Polish striker, won the UEFA Best Player award"] },
  { player:"Kevin De Bruyne", sport:"⚽ Soccer", answer:"DE BRUYNE", era:"modern", stats:{G:"6",AST:"20",APP:"36",MIN:"2843"}, ctx:"2019-20 Premier League Season — Manchester City", clues:["Set the Premier League assist record (20) in one season","Won PFA Players Player of the Year","From Ghent Belgium — is considered the greatest Belgian footballer of all time","Belgian midfielder widely seen as the best in the world"] },
  { player:"Luis Suarez", sport:"⚽ Soccer", answer:"SUAREZ", era:"modern", stats:{G:"31",AST:"16",APP:"33",MIN:"2818"}, ctx:"2013-14 Premier League Season — Liverpool", clues:["Won the PFA Players Player of the Year","Finished 2nd in Ballon d'Or voting","Liverpool have won 6 European Cups — more than any other English club","Uruguayan striker known for his controversy and brilliance"] },
  { player:"Mohamed Salah", sport:"⚽ Soccer", answer:"SALAH", era:"modern", stats:{G:"32",AST:"12",APP:"36",MIN:"3013"}, ctx:"2017-18 Premier League Season — Liverpool", clues:["Set the Premier League scoring record (32 in 38 games)","Won the PFA Players Player of the Year","Liverpool have won 6 European Cups — more than any other English club","Egyptian forward nicknamed The Egyptian King"] },
  { player:"Harry Kane", sport:"⚽ Soccer", answer:"KANE", era:"modern", stats:{G:"30",AST:"3",APP:"37",MIN:"3102"}, ctx:"2017-18 Premier League Season — Tottenham Hotspur", clues:["Won the Premier League Golden Boot with 30 goals","Spurs won back-to-back league titles in 1961 becoming the first club in the 20th century to win the Double","All-time England international top scorer","Now plays for Bayern Munich"] },
  // Soccer - Classic
  { player:"Michel Platini", sport:"⚽ Soccer", answer:"PLATINI", era:"classic", stats:{G:"9",AST:"4",APP:"5",MIN:"450"}, ctx:"UEFA Euro 1984 — France", clues:["Scored 9 goals in 5 games — tournament record","Won the tournament with France","Won 3 consecutive Ballon d'Or awards","French midfielder who later became UEFA president"] },
  { player:"Marco van Basten", sport:"⚽ Soccer", answer:"VAN BASTEN", era:"classic", stats:{G:"5",AST:"2",APP:"5",MIN:"423"}, ctx:"UEFA Euro 1988 — Netherlands", clues:["Scored a volley from outside the box in the Euro 1988 final","Won the tournament with Netherlands","Won 3 Ballon d'Or awards","His career ended early due to ankle injuries"] },
  { player:"Johan Cruyff", sport:"⚽ Soccer", answer:"CRUYFF", era:"classic", stats:{G:"14",AST:"8",APP:"14",MIN:"1186"}, ctx:"1973-74 Season — Ajax and Netherlands", clues:["Won the Ballon d'Or for the third time this year","Led Netherlands to the World Cup Final","Invented the Cruyff Turn","Dutch Total Football pioneer"] },
  // Tennis - Modern
  { player:"Jannik Sinner", sport:"🎾 ATP", answer:"SINNER", era:"modern", stats:{W:"73",L:"6",TITLES:"7",GRAND_SLAMS:"1"}, ctx:"2024 ATP Season — Australian Open champion", clues:["Won his first Grand Slam at the Australian Open","Ended the year ranked World No. 1","From San Candido, Italy","First Italian man to win a Grand Slam"] },
  { player:"Carlos Alcaraz", sport:"🎾 ATP", answer:"ALCARAZ", era:"modern", stats:{W:"57",L:"11",TITLES:"6",GRAND_SLAMS:"2"}, ctx:"2023 ATP Season — Wimbledon and US Open", clues:["Won Wimbledon and US Open this year","Became World No. 1 at age 19","From El Palmar, Spain","Trained under Juan Carlos Ferrero"] },
  { player:"Daniil Medvedev", sport:"🎾 ATP", answer:"MEDVEDEV", era:"modern", stats:{W:"65",L:"17",TITLES:"5",GRAND_SLAMS:"1"}, ctx:"2021 US Open — First Grand Slam title", clues:["Won his first Grand Slam at the US Open","Reached World No. 1 ranking","From Moscow, Russia","Defeated Djokovic in the final"] },
  { player:"Andy Murray", sport:"🎾 ATP", answer:"MURRAY", era:"modern", stats:{W:"81",L:"15",TITLES:"8",GS:"0"}, ctx:"2015 ATP Season — World No. 1", clues:["Won Wimbledon and US Open in his career","Reached World No. 1 this year","From Dunblane, Scotland","First British man to win Wimbledon since 1936"] },
  { player:"Ashleigh Barty", sport:"🎾 WTA", answer:"BARTY", era:"modern", stats:{W:"83",L:"11",TITLES:"12",GRAND_SLAMS:"3"}, ctx:"2021 WTA Season — Wimbledon champion", clues:["Won Wimbledon this year while ranked World No. 1","Won 3 Grand Slams in total","Retired at age 25 at the peak of her powers","From Ipswich, Queensland, Australia"] },
  { player:"Iga Swiatek", sport:"🎾 WTA", answer:"SWIATEK", era:"modern", stats:{W:"74",L:"8",TITLES:"8",GRAND_SLAMS:"2"}, ctx:"2022 WTA Season — World No. 1 dominant year", clues:["Won 2 Grand Slams this year including the French Open","Had a 37-match winning streak","From Warsaw, Poland","Known as the Queen of Clay"] },
  { player:"Naomi Osaka", sport:"🎾 WTA", answer:"OSAKA", era:"modern", stats:{W:"55",L:"12",TITLES:"4",GRAND_SLAMS:"1"}, ctx:"2020 US Open — Second Grand Slam title", clues:["Won the US Open wearing masks honoring Black victims","Ranked World No. 1 after this win","Japanese-American player","Won 4 Grand Slams before age 24"] },
  // Tennis - Classic
  { player:"Boris Becker", sport:"🎾 ATP", answer:"BECKER", era:"classic", stats:{W:"82",L:"9",TITLES:"10",GRAND_SLAMS:"1"}, ctx:"1986 ATP Season — Three Grand Slam finals", clues:["Won Wimbledon for the second consecutive year","Won Wimbledon as the youngest champion in the Open Era at age 17","German player nicknamed Boom Boom","Was the youngest Wimbledon champion at 17"] },
  { player:"Jim Courier", sport:"🎾 ATP", answer:"COURIER", era:"classic", stats:{W:"73",L:"15",TITLES:"6",GRAND_SLAMS:"2"}, ctx:"1992 ATP Season — Two Grand Slams", clues:["Won the Australian and French Open this year","Ranked World No. 1","American player known for his aggressive baseline game","Beat Andre Agassi in the French Open final"] },
  { player:"Arantxa Sanchez Vicario", sport:"🎾 WTA", answer:"ARANTXA", era:"classic", stats:{W:"79",L:"13",TITLES:"9",GRAND_SLAMS:"1"}, ctx:"1994 WTA Season — US Open and French Open", clues:["Won 2 Grand Slams in one year","Spanish player nicknamed The Barcelona Bumblebee","Won 4 Grand Slams in total","Beat Steffi Graf in the French Open final"] },
  // Golf - Modern
  { player:"Rory McIlroy", sport:"⛳ Golf", answer:"MCILROY", era:"modern", stats:{WINS:"5",MAJORS:"2",AVG:"68.83",EARN:"$8.3M"}, ctx:"2014 PGA Tour Season — Two majors", clues:["Won The Open Championship and PGA Championship this year","Won the FedEx Cup this year","From Holywood, County Down, Northern Ireland","Won 4 majors before age 26"] },
  { player:"Dustin Johnson", sport:"⛳ Golf", answer:"DUSTIN", era:"modern", stats:{WINS:"5",MAJORS:"1",AVG:"69.40",EARN:"$9.4M"}, ctx:"2020 PGA Tour Season — Masters champion", clues:["Won The Masters by 5 shots — setting the record score","Set the 72-hole scoring record at Augusta (-20)","From Columbia, South Carolina","Won 2 major championships in his career"] },
  { player:"Brooks Koepka", sport:"⛳ Golf", answer:"KOEPKA", era:"modern", stats:{WINS:"2",MAJORS:"2",AVG:"70.01",EARN:"$4.9M"}, ctx:"2018 PGA Tour Season — US Open back-to-back", clues:["Won the US Open for the second consecutive year","Won 4 major championships in his career","From West Palm Beach, Florida","Joined LIV Golf in 2022"] },
  { player:"Jordan Spieth", sport:"⛳ Golf", answer:"SPIETH", era:"modern", stats:{WINS:"5",MAJORS:"2",AVG:"68.91",EARN:"$12.0M"}, ctx:"2015 PGA Tour Season — Masters and US Open", clues:["Won The Masters and US Open in the same year","Led every major this year at some point","From Dallas, Texas","Won 3 major championships before age 24"] },
  // Golf - Classic
  { player:"Nick Faldo", sport:"⛳ Golf", answer:"FALDO", era:"classic", stats:{WINS:"4",MAJORS:"2",AVG:"69.90",YEAR:"1990"}, ctx:"1990 PGA Tour Season — Masters and British Open", clues:["Won The Masters and The Open Championship this year","Won 6 major championships in total","From Welwyn Garden City, England","Rebuilt his swing from scratch with coach David Leadbetter"] },
  { player:"Greg Norman", sport:"⛳ Golf", answer:"NORMAN", era:"classic", stats:{WINS:"3",MAJORS:"1",AVG:"69.10",YEAR:"1993"}, ctx:"1993 PGA Tour Season — British Open", clues:["Won The Open Championship this year by 2 shots","Known for nearly winning many majors he should have won","From Mount Isa, Queensland, Australia","Nicknamed The Great White Shark"] },
  { player:"Seve Ballesteros", sport:"⛳ Golf", answer:"SEVE", era:"classic", stats:{WINS:"4",MAJORS:"1",AVG:"70.20",YEAR:"1984"}, ctx:"1984 PGA Tour — British Open at St Andrews", clues:["Won The Open Championship at the home of golf","Won 5 major championships in his career","From Pedrena, Spain","Pioneered European golf as a global force"] },
  { player:"Lee Trevino", sport:"⛳ Golf", answer:"TREVINO", era:"classic", stats:{WINS:"4",MAJORS:"2",EARN:"$3.2M",YEAR:"1971"}, ctx:"1971 PGA Tour Season — Three Opens in three weeks", clues:["Won the US Open, Canadian Open, and British Open in the same month","Won 6 major championships in total","From Dallas, Texas","Nicknamed Super Mex"] },
  // Hockey - Modern
  { player:"Connor McDavid", sport:"🏒 NHL", answer:"MCDAVID", era:"modern", stats:{G:"44",AST:"79",PTS:"123",PIM:"44"}, ctx:"2021-22 NHL Season — Edmonton Oilers MVP", clues:["Won the Hart Trophy as league MVP","Led the NHL in scoring","The Oilers dynasty had Gretzky Messier Coffey and Fuhr — arguably the greatest team ever","Considered the best player in the world"] },
  { player:"Nathan MacKinnon", sport:"🏒 NHL", answer:"MACKINNON", era:"modern", stats:{G:"42",AST:"67",PTS:"109",PIM:"44"}, ctx:"2022-23 NHL Season — Colorado Avalanche MVP", clues:["Won the Hart Trophy as league MVP","The Avalanche relocated from Quebec City and won the Cup in their very first season in Colorado","From Cole Harbour, Nova Scotia — same hometown as Crosby","Won the Stanley Cup in 2022"] },
  { player:"Erik Karlsson", sport:"🏒 NHL", answer:"KARLSSON", era:"modern", stats:{G:"25",AST:"75",PTS:"100","PM":"-1"}, ctx:"2022-23 NHL Season — San Jose Sharks", clues:["Became the first defenseman to score 100 points since Brian Leetch","The Sharks were perennial playoff contenders for two decades but never won the Stanley Cup","Swedish defenseman nicknamed EK65","Won 2 Norris Trophies as best defenseman"] },
  { player:"Nikita Kucherov", sport:"🏒 NHL", answer:"KUCHEROV", era:"modern", stats:{G:"41",AST:"87",PTS:"128",PIM:"30"}, ctx:"2018-19 NHL Season — Tampa Bay Lightning MVP", clues:["Won the Hart Trophy and Art Ross Trophy","Set a Lightning franchise points record","The Lightning won back-to-back Cups in 2020 and 2021 with one of the sport's best rosters","Russian winger from Maykop"] },
  { player:"Jonathan Toews", sport:"🏒 NHL", answer:"TOEWS", era:"modern", stats:{G:"28",AST:"31",PTS:"59",PIM:"29"}, ctx:"2010 Stanley Cup Finals MVP — Chicago Blackhawks", clues:["Won the Conn Smythe as playoff MVP","The Blackhawks won 3 Cups in 6 years forming the most recent NHL dynasty","Won 3 Stanley Cups as captain","From Winnipeg, Manitoba — nicknamed Captain Serious"] },
  // Hockey - Classic
  { player:"Mark Messier", sport:"🏒 NHL", answer:"MESSIER", era:"classic", stats:{G:"37",AST:"72",PTS:"107",PIM:"76"}, ctx:"1991-92 NHL Season — New York Rangers", clues:["Won the Hart Trophy as league MVP","The Rangers ended a 54-year championship drought when they won the Cup in 1994","Won 6 Stanley Cups in his career","Guaranteed a Rangers win in 1994 playoffs and delivered"] },
  { player:"Paul Coffey", sport:"🏒 NHL", answer:"COFFEY", era:"classic", stats:{G:"48",AST:"90",PTS:"138","PM":"+12"}, ctx:"1985-86 NHL Season — Edmonton Oilers", clues:["Set the record for goals by a defenseman (48)","The Oilers dynasty had Gretzky Messier Coffey and Fuhr — arguably the greatest team ever","Won 4 Stanley Cups in his career","Scored 48 goals in a season — the record for a defenseman"] },
  { player:"Ray Bourque", sport:"🏒 NHL", answer:"BOURQUE", era:"classic", stats:{G:"21",AST:"73",PTS:"94","PM":"+19"}, ctx:"1993-94 NHL Season — Boston Bruins", clues:["Won his 5th Norris Trophy as best defenseman","The Bruins have the second most Stanley Cup championships in NHL history","Finally won the Stanley Cup in his last season","Won 5 Norris Trophies total"] },
  { player:"Teemu Selanne", sport:"🏒 NHL", answer:"SELANNE", era:"classic", stats:{G:"76",AST:"56",PTS:"132",PIM:"45"}, ctx:"1992-93 NHL Season — Winnipeg Jets Rookie record", clues:["Set the rookie scoring record with 76 goals","Shattered the previous rookie record by 23 goals","The Jets brought NHL hockey back to Winnipeg in 2011 after the original Jets moved to Phoenix","Finnish Winger nicknamed The Finnish Flash"] },
  { player:"Jaylen Brown", sport:"🏀 NBA", answer:"JAYLEN", era:"modern", stats:{PTS:"26.6",REB:"6.9",AST:"3.5",FG:"49.5"}, ctx:"2023-24 NBA Season — Boston Celtics Finals MVP", clues:["His team defeated the Milwaukee Bucks in 6 games","Led Boston to the championship over the Dallas Mavericks","From Marietta, Georgia — played at Cal Berkeley","3rd overall pick in the 2016 NBA Draft"] },
  { player:"Chris Paul", sport:"🏀 NBA", answer:"CP3", era:"modern", stats:{PTS:"18.6",AST:"10.8",STL:"2.1",REB:"4.5"}, ctx:"2014-15 NBA Season — Los Angeles Clippers", clues:["Led the Clippers to a 56-win season","Won Clutch Player of the Year this season","Nicknamed CP3","All-time leader in steals in NBA history"] },
  { player:"Kevin Garnett", sport:"🏀 NBA", answer:"GARNETT", era:"modern", stats:{PTS:"22.4",REB:"13.9",AST:"5.0",BLK:"2.2"}, ctx:"2003-04 NBA Season — Minnesota Timberwolves MVP", clues:["Won the NBA MVP award this season","Led Minnesota to 58 wins — their best ever","Kevin Garnett transformed Minnesota from a lottery team into a powerhouse in just a few seasons","Nicknamed The Big Ticket"] },
  { player:"Dirk Nowitzki", sport:"🏀 NBA", answer:"DIRK", era:"modern", stats:{PTS:"27.7",REB:"8.6",AST:"2.8",FG:"50.2"}, ctx:"2006-07 NBA Season — Dallas Mavericks MVP", clues:["Won his only NBA MVP award this season","Was the centerpiece of a franchise owned by eccentric tech billionaire Mark Cuban","First European player to win NBA MVP","Had a famous one-legged fadeaway jumper"] },
  { player:"Allen Iverson", sport:"🏀 NBA", answer:"AI", era:"modern", stats:{PTS:"31.4",REB:"4.5",AST:"5.1",STL:"2.4"}, ctx:"2001 NBA Season — Philadelphia 76ers scoring MVP", clues:["Won the scoring title and MVP award","Led the Philadelphia 76ers to the Finals","Known as The Answer","Was 6 feet tall — one of the smallest MVPs ever"] },
  { player:"Dwyane Wade", sport:"🏀 NBA", answer:"FLASH", era:"modern", stats:{PTS:"30.2",REB:"5.0",AST:"7.5",STL:"2.1"}, ctx:"2009-10 NBA Season — Miami Heat", clues:["Led the NBA in scoring this season","Played in South Beach for a franchise that attracted the biggest superstar names","Nicknamed Flash","Won 3 NBA championships in his career"] },
  { player:"Carmelo Anthony", sport:"🏀 NBA", answer:"MELO", era:"modern", stats:{PTS:"28.7",REB:"8.8",AST:"3.3",FG:"47.0"}, ctx:"2012-13 NBA Season — New York Knicks scoring title", clues:["Scored 28.7 PPG and shot 47% from the field","From Baltimore Maryland — won a gold medal with Team USA at three different Olympics","Nicknamed Melo","Won Olympic gold with USA three times"] },
  { player:"Blake Griffin", sport:"🏀 NBA", answer:"GRIFFIN", era:"modern", stats:{PTS:"22.6",REB:"8.9",AST:"3.9",FG:"52.4"}, ctx:"2011-12 NBA Season — LA Clippers All-Star", clues:["Won the 2011 Slam Dunk Contest jumping over a car","From Oklahoma City Oklahoma — won Rookie of the Year and was a six-time All-Star","From Oklahoma City, Oklahoma","Won Rookie of the Year in 2011"] },
  { player:"Kyrie Irving", sport:"🏀 NBA", answer:"KYRIE", era:"modern", stats:{PTS:"25.2",REB:"3.2",AST:"5.8",FG:"47.0"}, ctx:"2016 NBA Finals — Cleveland Cavaliers", clues:["Hit the go-ahead three-pointer with 53 seconds left in Game 7","Won the championship with Cleveland Cavaliers","From Melbourne, Australia","Was the #1 overall pick in 2011"] },
  { player:"Russell Westbrook", sport:"🏀 NBA", answer:"WESTBROOK", era:"modern", stats:{PTS:"31.6",REB:"10.7",AST:"10.4",STL:"1.6"}, ctx:"2016-17 NBA Season — Oklahoma City Thunder MVP", clues:["Averaged a triple-double for the entire season","Won the NBA MVP award","Was the first player in NBA history to average a triple-double for an entire season","Broke Oscar Robertson's single-season triple-double record"] },
  { player:"Clyde Drexler", sport:"🏀 NBA", answer:"DREXLER", era:"classic", stats:{PTS:"25.0",REB:"6.9",AST:"6.0",STL:"2.5"}, ctx:"1991-92 NBA Season — Portland Trail Blazers", clues:["Led Portland to the NBA Finals this year","Was known as Clyde the Glide","Was nicknamed The Glide for his smooth athletic style of play","Finished 2nd in MVP voting to Michael Jordan"] },
  { player:"John Stockton", sport:"🏀 NBA", answer:"STOCKTON", era:"classic", stats:{PTS:"13.1",AST:"14.5",STL:"3.2",REB:"2.8"}, ctx:"1987-88 NBA Season — Utah Jazz assists record", clues:["Set the single-season assists record this year","Was also the league leader in steals","The Jazz kept their New Orleans jazz-themed name even after relocating to Utah","All-time NBA leader in assists and steals"] },
  { player:"Karl Malone", sport:"🏀 NBA", answer:"MALONE", era:"classic", stats:{PTS:"27.7",REB:"10.5",AST:"4.5",FG:"54.6"}, ctx:"1996-97 NBA Season — Utah Jazz MVP", clues:["Won the NBA MVP award this season","The Jazz kept their New Orleans jazz-themed name even after relocating to Utah","Nicknamed The Mailman","Second all-time NBA scoring leader"] },
  { player:"David Robinson", sport:"🏀 NBA", answer:"ROBINSON", era:"classic", stats:{PTS:"29.8",REB:"10.7",BLK:"4.5",STL:"1.7"}, ctx:"1993-94 NBA Season — San Antonio Spurs MVP", clues:["Won the NBA MVP award and scoring title","The Spurs won 5 championships under Gregg Popovich — the greatest coaching run in NBA history","Nicknamed The Admiral — served in the US Navy","Later paired with Tim Duncan for back-to-back championships"] },
  { player:"Moses Malone", sport:"🏀 NBA", answer:"MOSES", era:"classic", stats:{PTS:"24.5",REB:"17.0",AST:"1.8",FG:"50.1"}, ctx:"1982-83 NBA Season — Philadelphia 76ers MVP", clues:["Predicted Fo Fo Fo in the playoffs — nearly delivered","Famously predicted Fo Fo Fo in the playoffs","The 76ers embraced The Process — one of the most deliberate rebuilds in sports history","3x NBA MVP in his career"] },
  { player:"Kevin McHale", sport:"🏀 NBA", answer:"MCHALE", era:"classic", stats:{PTS:"26.1",REB:"9.5",BLK:"1.9",FG:"60.4"}, ctx:"1986-87 NBA Season — Boston Celtics", clues:["Shot over 60% from the field this season","The Celtics have the most NBA championships in history with 17 total","Had one of the most skilled low-post games ever","Won 3 NBA championships with the Celtics"] },
  { player:"Bill Russell", sport:"🏀 NBA", answer:"RUSSELL", era:"legends", stats:{REB:"22.9",PTS:"14.1",BLK:"8.0",TITLES:"5"}, ctx:"1961-62 NBA Season — Boston Celtics dynasty peak", clues:["Won 5 consecutive NBA championships as captain","Led the NBA in rebounds this season","The Celtics have the most NBA championships in history with 17 total","Was player-coach for his last 3 championships"] },
  { player:"Oscar Robertson", sport:"🏀 NBA", answer:"OSCAR", era:"legends", stats:{PTS:"30.8",AST:"11.4",REB:"12.5",FG:"47.8"}, ctx:"1961-62 NBA Season — Cincinnati Royals triple-double season", clues:["Averaged a triple-double for the entire season","From Charlotte Tennessee — averaged a triple-double for an entire season in 1961-62","Nicknamed The Big O","His triple-double record per game was not matched for 55 years"] },
  { player:"Jerry West", sport:"🏀 NBA", answer:"WEST", era:"legends", stats:{PTS:"31.3",AST:"7.2",REB:"4.4",FG:"47.6"}, ctx:"1969-70 NBA Season — Los Angeles Lakers Finals MVP", clues:["Scored 31.3 PPG in the Finals on the losing side","His team lost to the New York Knicks in 7 games","The Lakers have won more NBA championships than almost any other team","His silhouette is the NBA logo"] },
  { player:"Bob Pettit", sport:"🏀 NBA", answer:"PETTIT", era:"legends", stats:{PTS:"29.2",REB:"20.3",AST:"3.1",FG:"42.2"}, ctx:"1961-62 NBA Season — St. Louis Hawks All-Star", clues:["Was the first player in NBA history to score 20,000 career points","From Baton Rouge Louisiana — was the first player in NBA history to score 20000 career points","Won the NBA MVP award twice","Was the first true power forward in NBA history"] },
  { player:"Lenny Wilkens", sport:"🏀 NBA", answer:"WILKENS", era:"legends", stats:{PTS:"22.4",AST:"8.1",REB:"5.6",STL:"2.1"}, ctx:"1967-68 NBA Season — St. Louis Hawks All-Star", clues:["Was a player-coach during his playing career","From Brooklyn New York — later became one of the winningest coaches in NBA history","Later became one of the winningest coaches in NBA history","Was an All-Star as both a player and a coach"] },
  { player:"Dave Cowens", sport:"🏀 NBA", answer:"COWENS", era:"classic", stats:{PTS:"20.5",REB:"16.2",AST:"4.4",FG:"45.9"}, ctx:"1972-73 NBA Season — Boston Celtics MVP", clues:["Won the NBA MVP award this season","Led the Celtics to the championship the following year","The Celtics have the most NBA championships in history with 17 total","Was a center who played with the intensity of a small forward"] },
  { player:"Walt Frazier", sport:"🏀 NBA", answer:"FRAZIER", era:"legends", stats:{PTS:"21.7",AST:"6.9",REB:"6.2",STL:"1.9"}, ctx:"1969-70 NBA Finals — New York Knicks", clues:["Had 36 points and 19 assists in Game 7 of the Finals","The Knicks play at Madison Square Garden — often called the most famous arena in the world","Nicknamed Clyde after the movie Bonnie and Clyde","Was one of the best defensive guards of his era"] },
  { player:"John Havlicek", sport:"🏀 NBA", answer:"HAVLICEK", era:"classic", stats:{PTS:"26.8",REB:"7.1",AST:"5.9",FG:"47.0"}, ctx:"1973-74 NBA Season — Boston Celtics Finals MVP", clues:["Ran faster than any guard in the league despite being a forward — nicknamed Hondo","Won 8 NBA championships in his career","Nicknamed Hondo","Was famous for his tireless running and hustle"] },
  { player:"Earl Monroe", sport:"🏀 NBA", answer:"EARL", era:"legends", stats:{PTS:"23.8",AST:"5.5",REB:"4.0",FG:"46.2"}, ctx:"1967-68 NBA Season — Baltimore Bullets Rookie of Year", clues:["Was nicknamed Earl the Pearl for his spectacular moves around the basket","Famous for his spinning moves in the lane","Nicknamed Earl the Pearl and Black Jesus","Later won a championship with the New York Knicks"] },
  { player:"Elvin Hayes", sport:"🏀 NBA", answer:"HAYES", era:"classic", stats:{PTS:"28.4",REB:"17.1",BLK:"3.7",FG:"42.5"}, ctx:"1970-71 NBA Season — San Diego Rockets scoring leader", clues:["Led the NBA in rebounds this season","From Rayville Louisiana — was selected second overall in the 1968 draft behind Wes Unseld","Nicknamed The Big E","Won the NBA championship with Washington in 1978"] },
  { player:"Connie Hawkins", sport:"🏀 NBA", answer:"HAWKINS", era:"legends", stats:{PTS:"24.6",REB:"10.4",AST:"4.8",FG:"48.9"}, ctx:"1967-68 ABA Season — Pittsburgh Pipers MVP", clues:["Won the ABA MVP in its very first season","Was banned from the NBA for years despite being innocent","Finally admitted to the NBA in 1969","Was one of the most gifted ballhandlers of his generation"] },
  { player:"Nate Thurmond", sport:"🏀 NBA", answer:"THURMOND", era:"legends", stats:{PTS:"22.0",REB:"22.0",BLK:"4.0",FG:"42.1"}, ctx:"1967-68 NBA Season — San Francisco Warriors All-Star", clues:["Averaged over 22 points and 22 rebounds per game","From Akron Ohio — recorded the first official quadruple-double in NBA history","Was considered the toughest defensive center of the 1960s","Had the first official quadruple-double in NBA history in 1974"] },
  { player:"Jerry Lucas", sport:"🏀 NBA", answer:"LUCAS", era:"legends", stats:{PTS:"21.5",REB:"21.1",AST:"4.3",FG:"49.9"}, ctx:"1964-65 NBA Season — Cincinnati Royals Rookie of Year", clues:["Was so good at rebounding he once grabbed 40 boards in a single NBA game","Averaged over 20 points and 20 rebounds as a rookie","Was a memory expert who memorized the entire Manhattan phone book","Later won a championship with the New York Knicks"] },
  { player:"Billy Cunningham", sport:"🏀 NBA", answer:"CUNNINGHAM", era:"classic", stats:{PTS:"24.8",REB:"13.0",AST:"4.3",FG:"45.5"}, ctx:"1971-72 ABA Season — Carolina Cougars", clues:["Won the ABA MVP this season","Later coached the Philadelphia 76ers to the 1983 championship","Nicknamed The Kangaroo Kid for his leaping ability","The 76ers embraced The Process — one of the most deliberate rebuilds in sports history"] },
  { player:"Sam Jones", sport:"🏀 NBA", answer:"SAM JONES", era:"legends", stats:{PTS:"22.1",REB:"4.5",AST:"4.9",FG:"47.0"}, ctx:"1964-65 NBA Season — Boston Celtics fifth championship", clues:["Had a career shooting percentage among the highest ever for an NBA guard","Was known as the banker — for his bank shot off the glass","The Celtics have the most NBA championships in history with 17 total","Was inducted into the Hall of Fame in 1983"] },
  { player:"Tom Heinsohn", sport:"🏀 NBA", answer:"HEINSOHN", era:"legends", stats:{PTS:"18.8",REB:"10.0",FG:"40.8",TITLES:"6"}, ctx:"1956-57 NBA Season — Boston Celtics Rookie of Year", clues:["Won Rookie of the Year in his first season","Won 6 NBA championships as a player with the Celtics","Later coached the Celtics to 2 more championships","Was elected to the Hall of Fame as both a player and coach"] },
  { player:"Tom Brady", sport:"🏈 NFL", answer:"TOM BRADY", era:"modern", stats:{YDS:"4577",TD:"50",INT:"8",RTG:"111.0"}, ctx:"2010 NFL Season — New England Patriots MVP", clues:["Won the NFL MVP award this season","Led the Patriots to a 14-2 record","Was drafted in the 6th round — the 199th pick — one of the greatest draft steals ever","Won his 3rd Super Bowl the following year"] },
  { player:"Von Miller", sport:"🏈 NFL", answer:"VON MILLER", era:"modern", stats:{SCK:"18.0",FF:"6",YEAR:"2012",AWARD:"DPOY"}, ctx:"2012 NFL Season — Denver Broncos Defensive Player of Year", clues:["Won the Defensive Player of the Year award","Had 18 sacks this season","Playing in Mile High altitude in Denver gives the home team a real physiological edge","Earlier won Super Bowl 50 MVP"] },
  { player:"J.J. Watt", sport:"🏈 NFL", answer:"WATT", era:"modern", stats:{SCK:"20.5",FF:"8",TD:"5",DPOY:"3"}, ctx:"2012 NFL Season — Houston Texans Defensive Player of Year", clues:["Won Defensive Player of the Year for the first of 3 times","Had 20.5 sacks and scored 5 TDs on defense","From Waukesha Wisconsin — won three NFL Defensive Player of the Year awards","Won DPOY 3 times in 4 seasons"] },
  { player:"Walter Payton", sport:"🏈 NFL", answer:"SWEETNESS", era:"classic", stats:{CAR:"339",YDS:"1852",TD:"14",YPC:"5.5"}, ctx:"1977 NFL Season — Chicago Bears MVP", clues:["Rushed for 1852 yards — NFL record at the time","Won NFL MVP this season","From Columbia Mississippi — rushed for over 16000 career yards and was nicknamed Sweetness","Nicknamed Sweetness"] },
  { player:"Dan Marino", sport:"🏈 NFL", answer:"MARINO", era:"classic", stats:{YDS:"5084",TD:"48",INT:"17",RTG:"108.9"}, ctx:"1984 NFL Season — Miami Dolphins MVP", clues:["Set the single-season passing TD record (48) that stood 20 years","Won the NFL MVP award","From Pittsburgh Pennsylvania — set numerous passing records that stood for over a decade","Had one of the fastest releases ever seen"] },
  { player:"Lawrence Taylor", sport:"🏈 NFL", answer:"LT CLASSIC", era:"classic", stats:{SCK:"20.5",FF:"4",INT:"2",DPOY:"3"}, ctx:"1986 NFL Season — New York Giants MVP", clues:["One of only two defensive players ever to win the NFL MVP award","Had 20.5 sacks this season — one of the most dominant individual seasons ever","From Williamsburg Virginia","Was so feared that opposing teams had to invent new blocking schemes just to account for him"] },
  { player:"Reggie White", sport:"🏈 NFL", answer:"MINISTER", era:"classic", stats:{SCK:"21",FF:"2",INT:"2",DPOY:"2"}, ctx:"1987 NFL Season — Philadelphia Eagles", clues:["Won Defensive Player of the Year this season","Had 21 sacks","From Chattanooga Tennessee — was nicknamed the Minister of Defense and had 198 career sacks","Nicknamed The Minister of Defense"] },
  { player:"Eric Dickerson", sport:"🏈 NFL", answer:"DICKERSON", era:"classic", stats:{CAR:"379",YDS:"2105",TD:"14",YPC:"5.6"}, ctx:"1984 NFL Season — Los Angeles Rams rushing record", clues:["Set the all-time NFL single-season rushing record (2105 yards)","From Sealy Texas — set the single-season rushing record of 2105 yards in 1984","Known for his high knee action and goggles","The record still stands today"] },
  { player:"Tony Dorsett", sport:"🏈 NFL", answer:"DORSETT", era:"classic", stats:{CAR:"177",YDS:"1325",TD:"8",YPC:"7.5"}, ctx:"1977 NFL Season — Dallas Cowboys Rookie of Year", clues:["Still holds the all-time NFL record for yards per carry in a career","Later won the Super Bowl this same season","From Aliquippa Pennsylvania — won both the Heisman Trophy and a Super Bowl in consecutive years","Also ran the longest TD run in NFL history (99 yards) in 1983"] },
  { player:"Herschel Walker", sport:"🏈 NFL", answer:"WALKER", era:"classic", stats:{CAR:"238",YDS:"1514",REC:"53",TD:"10"}, ctx:"1985 NFL Season — Dallas Cowboys All-Pro", clues:["Won the Heisman Trophy at Georgia","From Wrightsville Georgia — won the Heisman Trophy at Georgia before being traded for five players","Was the centerpiece of the most lopsided trade in NFL history","Also competed in bobsled in the 1992 Olympics"] },
  { player:"Terry Bradshaw", sport:"🏈 NFL", answer:"BRADSHAW", era:"classic", stats:{YDS:"318",TD:"4",INT:"1",RTG:"112.4"}, ctx:"Super Bowl XIII MVP — Pittsburgh Steelers vs Dallas Cowboys", clues:["Won his second consecutive Super Bowl MVP","From Shreveport Louisiana — won four Super Bowls and was twice named Super Bowl MVP","Won 4 Super Bowls in his career","Later became a famous TV analyst"] },
  { player:"Jim Kelly", sport:"🏈 NFL", answer:"KELLY", era:"classic", stats:{YDS:"3844",TD:"33",INT:"17",RTG:"97.6"}, ctx:"1991 NFL Season — Buffalo Bills AFC MVP", clues:["Led the Bills to their 2nd consecutive Super Bowl appearance","The Bills reached four consecutive Super Bowls and lost all four — the only team to do so","Ran the famous No-Huddle offense","Reached 4 consecutive Super Bowls — all losses"] },
  { player:"Deion Sanders", sport:"🏈 NFL", answer:"PRIME TIME", era:"classic", stats:{INT:"8",TD:"6",RET:"1421",YEAR:"1994"}, ctx:"1994 NFL Season — San Francisco 49ers", clues:["From Fort Myers Florida — is the only player to appear in both a Super Bowl and a World Series","Returned kicks and played both CB and WR","Nicknamed Prime Time and Neon Deion","Also played professional baseball"] },
  { player:"Bruce Smith", sport:"🏈 NFL", answer:"BRUCE SMITH", era:"classic", stats:{SCK:"19",FF:"4",DPOY:"2",YEAR:"1990"}, ctx:"1990 NFL Season — Buffalo Bills Defensive Player of Year", clues:["Won Defensive Player of the Year this season","Had 19 sacks","The Bills reached four consecutive Super Bowls and lost all four — the only team to do so","All-time NFL sacks leader with 200"] },
  { player:"Johnny Unitas", sport:"🏈 NFL", answer:"UNITAS", era:"legends", stats:{YDS:"2899",TD:"32",INT:"14",STREAK:"47"}, ctx:"1959 NFL Season — Baltimore Colts All-Pro", clues:["Set the record for consecutive games with a TD pass (47)","From Pittsburgh Pennsylvania — was cut by the Steelers before becoming the greatest QB of his era","Won 3 NFL championships","Nicknamed The Golden Arm"] },
  { player:"Jim Brown", sport:"🏈 NFL", answer:"JIM BROWN", era:"legends", stats:{CAR:"291",YDS:"1863",TD:"17",YPC:"6.4"}, ctx:"1963 NFL Season — Cleveland Browns MVP", clues:["Won the NFL MVP award for the 3rd time","Rushed for 1863 yards — led the league","From St Simons Island Georgia — averaged 5.2 yards per carry and never missed a game in 9 seasons","Retired at his peak at age 29 — widely considered the greatest RB ever"] },
  { player:"Bart Starr", sport:"🏈 NFL", answer:"STARR", era:"legends", stats:{YDS:"250",TD:"2",INT:"1",RTG:"96.2"}, ctx:"Super Bowl I MVP — Green Bay Packers", clues:["Won the very first Super Bowl MVP award","The Packers are the only community-owned franchise in major American professional sports","Won 5 NFL championships under Vince Lombardi","Was known for his cool leadership in the Ice Bowl"] },
  { player:"Joe Namath", sport:"🏈 NFL", answer:"NAMATH", era:"legends", stats:{YDS:"4007",TD:"26",INT:"28",COMP:"52.5"}, ctx:"1967 NFL Season — New York Jets first 4000-yard passer", clues:["Became the first QB to pass for 4000 yards in a season","The Jets won Super Bowl III as massive underdogs after Joe Namath guaranteed the victory","Guaranteed victory in Super Bowl III and delivered","Nicknamed Broadway Joe"] },
  { player:"Gale Sayers", sport:"🏈 NFL", answer:"SAYERS", era:"legends", stats:{TD:"22",RUSH:"867",REC:"507",RET:"1718"}, ctx:"1965 NFL Season — Chicago Bears Rookie of Year", clues:["Scored 22 touchdowns as a rookie — an NFL record at the time","From Wichita Kansas — scored 22 touchdowns as a rookie — the most in NFL history at the time","Won Rookie of the Year","Had his career cut short by injuries after being one of the most elusive runners ever"] },
  { player:"Don Hutson", sport:"🏈 NFL", answer:"HUTSON", era:"legends", stats:{REC:"74",YDS:"1211",TD:"17",YEAR:"1942"}, ctx:"1942 NFL Season — Green Bay Packers All-Pro", clues:["Won the MVP award in 1941 and 1942","Set records that stood for decades","The Packers are the only community-owned franchise in major American professional sports","Is credited with inventing the modern wide receiver position"] },
  { player:"Sammy Baugh", sport:"🏈 NFL", answer:"BAUGH", era:"legends", stats:{YDS:"1693",TD:"11",INT:"4",PASSER:"1945"}, ctx:"1945 NFL Season — Washington Redskins MVP", clues:["Led the NFL in passing, punting, and interceptions this season","From Temple Texas — was a two-way star who also led the NFL in interceptions as a defensive back","Is considered the greatest quarterback of the pre-modern era","Nicknamed Slingin Sammy"] },
  { player:"Chuck Bednarik", sport:"🏈 NFL", answer:"BEDNARIK", era:"legends", stats:{POS:"C/LB",MIN:"60",PLAYS:"90%",TITLE:"1"}, ctx:"1960 NFL Championship — Philadelphia Eagles", clues:["Was the last true 60-minute player in NFL history","Played center on offense and linebacker on defense","Was the last true 60-minute player — played both center and linebacker","Made the famous tackle that ended Frank Gifford's season"] },
  { player:"Night Train Lane", sport:"🏈 NFL", answer:"NIGHT TRAIN", era:"legends", stats:{INT:"14",YEAR:"1952",TD:"2",AWARD:"AllPro"}, ctx:"1952 NFL Season — Los Angeles Rams interception record", clues:["Set the all-time NFL single-season interception record with 14","From Austin Texas — set the NFL record with 14 interceptions as a rookie in 1952","The record still stands today","Got his nickname from a popular song"] },
  { player:"Elroy Hirsch", sport:"🏈 NFL", answer:"HIRSCH", era:"legends", stats:{REC:"66",YDS:"1495",TD:"17",YEAR:"1951"}, ctx:"1951 NFL Season — Los Angeles Rams MVP", clues:["Had one of the greatest receiving seasons ever in 1951","Caught 17 touchdown passes","From Wausau Wisconsin — was nicknamed Crazylegs for his unusual running style as a receiver","Nicknamed Crazylegs for his unusual running style"] },
  { player:"Bob Waterfield", sport:"🏈 NFL", answer:"WATERFIELD", era:"legends", stats:{YDS:"185",TD:"1",INT:"0",COMP:"55.0"}, ctx:"1945 NFL Championship — Cleveland Rams", clues:["Was also married to actress Jane Russell at the height of his fame","Won NFL MVP his first season","From Elmira New York — married actress Jane Russell and quarterbacked the Rams to two championships","Was also married to actress Jane Russell"] },
  { player:"Otto Graham", sport:"🏈 NFL", answer:"GRAHAM", era:"legends", stats:{TITLES:"7",APPS:"10",TD:"174",YEAR:"1955"}, ctx:"Career — Cleveland Browns dynasty quarterback", clues:["Appeared in 10 consecutive championship games and won 7","From Waukegan Illinois — led Cleveland to 10 consecutive championship game appearances","Played in both the AAFC and NFL","Led the Browns to the championship in his very last game"] },
  { player:"Emlen Tunnell", sport:"🏈 NFL", answer:"TUNNELL", era:"legends", stats:{INT:"79",YDS:"1282",YEAR:"1952",AWARD:"AllPro"}, ctx:"Career — New York Giants defensive back legend", clues:["Was the first African American player in Giants history","Retired with the most career interceptions ever at the time","From Bryn Mawr Pennsylvania — was the first Black player inducted into the Pro Football Hall of Fame","Was elected to the Hall of Fame in 1967"] },
  { player:"Leo Nomellini", sport:"🏈 NFL", answer:"NOMELLINI", era:"legends", stats:{YEAR:"1953",AWARD:"AllPro",SEASONS:"14",POS:"DT"}, ctx:"Career — San Francisco 49ers iron man", clues:["Never missed a game in 14 NFL seasons","Was an All-Pro on both offense and defense","Was known for the West Coast offense which he helped pioneer","Also won 2 NCAA wrestling championships"] },
  { player:"Lou Groza", sport:"🏈 NFL", answer:"GROZA", era:"legends", stats:{FGM:"264",PTS:"1608",XP:"810",YEAR:"1964"}, ctx:"Career — Cleveland Browns kicker and tackle", clues:["Was both an offensive tackle and kicker in his career","Scored 1608 career points — a record at his retirement","Was inducted into the Pro Football Hall of Fame after his career","Nicknamed The Toe for his kicking ability"] },
  { player:"Roosevelt Brown", sport:"🏈 NFL", answer:"ROOSEVELT BROWN", era:"legends", stats:{YEAR:"1956",AWARD:"AllPro",SEASONS:"13",DRAFT:"321"}, ctx:"Career — New York Giants Hall of Fame tackle", clues:["Was selected All-Pro 9 times in his career","Was drafted in the 27th round — one of the greatest steals ever","Was inducted into the Pro Football Hall of Fame after his career","Was elected to the Hall of Fame in 1975"] },
  { player:"Forrest Gregg", sport:"🏈 NFL", answer:"GREGG", era:"legends", stats:{YEAR:"1966",AWARD:"AllPro",TITLES:"6",POS:"OT"}, ctx:"Career — Green Bay Packers championship offensive tackle", clues:["Vince Lombardi called him the finest player he ever coached","Won 6 NFL championships with the Green Bay Packers","Was considered by Vince Lombardi to be the finest player he ever coached","Was elected to the Hall of Fame in 1977"] },
  { player:"Jim Ringo", sport:"🏈 NFL", answer:"RINGO", era:"legends", stats:{YEAR:"1963",AWARD:"AllPro",PROBOW:"10",POS:"C"}, ctx:"Career — Green Bay Packers center", clues:["Was selected to 10 Pro Bowls in his career","Won 4 NFL championships with Green Bay Packers","Played center and was a master of the position","Was the anchor of the offensive line during the Lombardi dynasty"] },
  { player:"Frank Gifford", sport:"🏈 NFL", answer:"GIFFORD", era:"legends", stats:{PTS:"484",REC:"367",TD:"78",YEAR:"1956"}, ctx:"1956 NFL Season — New York Giants MVP", clues:["Won the NFL MVP award in 1956","Scored 78 touchdowns during this season","Was a versatile back who played multiple positions","Later became famous as a Monday Night Football broadcaster"] },
  { player:"Tom Fears", sport:"🏈 NFL", answer:"FEARS", era:"legends", stats:{REC:"84",YDS:"1116",TD:"7",YEAR:"1950"}, ctx:"1950 NFL Season — Los Angeles Rams receiving record", clues:["Set the NFL single-season receptions record with 84 catches","Scored 7 touchdowns during this season","Was the first great wide receiver of the modern era","His 84 catches stood as the record for 16 years"] },
  { player:"Crazy Legs Hirsch", sport:"🏈 NFL", answer:"CRAZYLEGS", era:"legends", stats:{REC:"66",YDS:"1495",TD:"17",YEAR:"1951"}, ctx:"1951 NFL Season — Los Angeles Rams receiving record", clues:["Had a record-setting receiving season with 17 TDs","Was famous for his unusual running style that gave him his nickname","Scored 17 touchdowns during this season","Had a movie made about him called Crazylegs in 1953"] },
  { player:"Lance Alworth", sport:"🏈 NFL", answer:"ALWORTH", era:"legends", stats:{REC:"73",YDS:"1602",TD:"13",YEAR:"1965"}, ctx:"1965 AFL Season — San Diego Chargers All-Pro", clues:["Was the best wide receiver in the AFL during the 1960s","Nicknamed Bambi for his graceful movement","Scored 13 touchdowns during this season","Was the first AFL player inducted into the Pro Football Hall of Fame"] },
  { player:"Willie Mays", sport:"⚾ MLB", answer:"MAYS", era:"legends", stats:{HR:"52",AVG:".317",RBI:"112",SB:"24"}, ctx:"1965 MLB Season — San Francisco Giants All-Star", clues:["Hit 52 home runs this season at age 34","Won the NL MVP award this season","The Giants moved from New York to San Francisco in 1958 alongside the Dodgers","Made The Catch in the 1954 World Series"] },
  { player:"Mickey Mantle", sport:"⚾ MLB", answer:"MANTLE", era:"legends", stats:{HR:"52",AVG:".365",RBI:"130",OPS:"1.169"}, ctx:"1956 MLB Season — New York Yankees Triple Crown MVP", clues:["Batted .365 with 52 home runs and 130 RBI","Won the AL MVP award 3 times","The Yankees have won 27 World Series championships — by far the most of any team","Wore number 7 and was known for switch-hitting power"] },
  { player:"Frank Robinson", sport:"⚾ MLB", answer:"FRANK ROBINSON", era:"legends", stats:{HR:"49",AVG:".316",RBI:"122",OPS:"1.047"}, ctx:"1966 MLB Season — Baltimore Orioles Triple Crown MVP", clues:["Had been traded from Cincinnati to the Orioles before the season","Is the only player in MLB history to win MVP in both leagues","Batted .316 during this standout season","Was the first Black manager in MLB history"] },
  { player:"Carl Yastrzemski", sport:"⚾ MLB", answer:"YAZ", era:"legends", stats:{HR:"44",AVG:".326",RBI:"121",OPS:"1.040"}, ctx:"1967 MLB Season — Boston Red Sox Triple Crown MVP", clues:["Boston went from 9th place to the World Series in one year","Won the AL MVP award","The Red Sox ended an 86-year championship drought known as the Curse of the Bambino","Nicknamed Yaz — wore number 8"] },
  { player:"Tom Seaver", sport:"⚾ MLB", answer:"SEAVER", era:"legends", stats:{ERA:"2.21",W:"25",SO:"283",CG:"18"}, ctx:"1969 MLB Season — New York Mets Cy Young", clues:["Led the Mets from 9th place to World Series champions","Led New York to a World Series title this year","The Miracle Mets won the 1969 World Series despite having 100-1 odds at the start of the year","Nicknamed Tom Terrific"] },
  { player:"Steve Carlton", sport:"⚾ MLB", answer:"CARLTON", era:"classic", stats:{ERA:"1.97",W:"27",SO:"310",WHIP:"0.940"}, ctx:"1972 MLB Season — Philadelphia Phillies Cy Young", clues:["Won 27 games for a team that won only 59 — remarkable","Also famous for refusing to speak to media for years","The Phillies won the World Series in 2008 ending a 28-year championship drought","Nicknamed Lefty — refused to speak to media for years"] },
  { player:"Mike Schmidt", sport:"⚾ MLB", answer:"SCHMIDT", era:"classic", stats:{HR:"48",AVG:".286",RBI:"121",OPS:".996"}, ctx:"1980 MLB Season — Philadelphia Phillies MVP", clues:["Won the NL MVP and World Series MVP this season","Won 3 NL MVP awards in his career","The Phillies won the World Series in 2008 ending a 28-year championship drought","Won 10 Gold Gloves at third base"] },
  { player:"Reggie Jackson", sport:"⚾ MLB", answer:"JACKSON", era:"classic", stats:{HR:"3",RBI:"5",H:"3",AB:"5"}, ctx:"1977 World Series Game 6 — New York Yankees", clues:["Hit 3 home runs in a single World Series game","Won the World Series MVP award","The Yankees have won 27 World Series championships — by far the most of any team","Nicknamed Mr. October for his postseason performances"] },
  { player:"Pete Rose", sport:"⚾ MLB", answer:"ROSE", era:"classic", stats:{H:"230",AVG:".331",R:"130",YEAR:"1973"}, ctx:"1973 MLB Season — Cincinnati Reds NL MVP", clues:["Won the NL MVP award for the only time in his career","Hit .331 with 230 hits this season","The Big Red Machine Reds of the 1970s were one of baseball's greatest dynasties","All-time MLB hits leader with 4256"] },
  { player:"Johnny Bench", sport:"⚾ MLB", answer:"BENCH", era:"classic", stats:{HR:"45",RBI:"148",AVG:".293",OPS:".909"}, ctx:"1970 MLB Season — Cincinnati Reds MVP", clues:["Won the NL MVP award at age 22","Won 2 NL MVP awards in his career","The Big Red Machine Reds of the 1970s were one of baseball's greatest dynasties","Revolutionized the catcher position with one-handed catching"] },
  { player:"Joe Morgan", sport:"⚾ MLB", answer:"MORGAN", era:"classic", stats:{HR:"17",AVG:".327",OBP:".466",SB:"67"}, ctx:"1975 MLB Season — Cincinnati Reds MVP", clues:["Won back-to-back NL MVP awards in 1975 and 1976","The Big Red Machine Reds of the 1970s were one of baseball's greatest dynasties","Played second base with a distinctive arm-flapping batting style","Was a dominant player despite being only 5ft 7in"] },
  { player:"Rod Carew", sport:"⚾ MLB", answer:"CAREW", era:"classic", stats:{AVG:".388",H:"239",R:"128",TITLES:"7"}, ctx:"1977 MLB Season — Minnesota Twins MVP", clues:["Won the AL MVP and batting title with a .388 average","Has the highest career batting average in NL history","The Twins won back-to-back World Series in 1987 and 1991 in the indoor Metrodome","From Panama — was considered the finest pure hitter of his era"] },
  { player:"Nolan Ryan", sport:"⚾ MLB", answer:"NOLAN RYAN", era:"classic", stats:{SO:"383",ERA:"2.87",NH:"2",W:"22"}, ctx:"1973 MLB Season — California Angels strikeout record", clues:["Set the single-season strikeout record with 383","Also threw 2 no-hitters this season","Posted an ERA of 2.87 — among the best of the season","All-time strikeout leader with 5714 career Ks"] },
  { player:"Catfish Hunter", sport:"⚾ MLB", answer:"CATFISH", era:"classic", stats:{W:"25",ERA:"2.49",CG:"23",YEAR:"1974"}, ctx:"1974 MLB Season — Oakland Athletics Cy Young", clues:["Won 5 consecutive World Series rings","Won 5 consecutive World Series rings","Posted an ERA of 2.49 — among the best of the season","Was one of the first big free agents in baseball history"] },
  { player:"Jim Palmer", sport:"⚾ MLB", answer:"PALMER", era:"classic", stats:{W:"23",ERA:"2.09",CG:"23",YEAR:"1975"}, ctx:"1975 MLB Season — Baltimore Orioles Cy Young", clues:["Never gave up a grand slam in his entire career","Never allowed a grand slam in his entire career","Was a three-time Gold Glove winner at shortstop despite being 6ft 4in tall","Later became famous as an Jockey underwear model"] },
  { player:"Rickey Henderson", sport:"⚾ MLB", answer:"HENDERSON", era:"classic", stats:{SB:"130",AVG:".319",OBP:".408",R:"119"}, ctx:"1982 MLB Season — Oakland Athletics stolen base record", clues:["Was known for getting intentionally walked just to have him on base was considered a liability","The Moneyball A's used statistical analysis to compete with teams that outspent them massively","All-time stolen base leader with 1406","Referred to himself in the third person — was famous for his personality"] },
  { player:"Lou Gehrig", sport:"⚾ MLB", answer:"GEHRIG", era:"legends", stats:{HR:"49",AVG:".363",RBI:"165",OPS:"1.228"}, ctx:"1936 MLB Season — New York Yankees MVP", clues:["Won the AL MVP award this season","Played in 2130 consecutive games — record for decades","The Yankees have won 27 World Series championships — by far the most of any team","Died from the disease now called Lou Gehrig's Disease (ALS)"] },
  { player:"Ted Williams", sport:"⚾ MLB", answer:"WILLIAMS", era:"legends", stats:{AVG:".406",HR:"37",OBP:".553",YEAR:"1941"}, ctx:"1941 MLB Season — Boston Red Sox — last .400 hitter", clues:["Was the last player to hit .400 in a season","Refused to sit out the last day to protect his average","The Red Sox ended an 86-year championship drought known as the Curse of the Bambino","Nicknamed The Splendid Splinter"] },
  { player:"Joe DiMaggio", sport:"⚾ MLB", answer:"DIMAGGIO", era:"legends", stats:{STREAK:"56",AVG:".357",HR:"30",RBI:"125"}, ctx:"1941 MLB Season — New York Yankees streak season", clues:["Hit safely in 56 consecutive games — still the all-time record","The Yankees have won 27 World Series championships — by far the most of any team","Married Marilyn Monroe","Nicknamed The Yankee Clipper"] },
  { player:"Stan Musial", sport:"⚾ MLB", answer:"MUSIAL", era:"legends", stats:{HR:"35",AVG:".357",RBI:"109",H:"197"}, ctx:"1948 MLB Season — St. Louis Cardinals MVP", clues:["Won the NL MVP award and came close to hitting .400","Won 3 NL MVP awards in his career","The Cardinals have won 11 World Series championships — second most all-time","Nicknamed Stan the Man"] },
  { player:"Ty Cobb", sport:"⚾ MLB", answer:"COBB", era:"legends", stats:{AVG:".420",H:"248",R:"147",SB:"96"}, ctx:"1911 MLB Season — Detroit Tigers MVP", clues:["Hit .420 — the 4th highest season average ever","Won the Chalmers Award (precursor to MVP)","The Tigers have one of baseball's most storied franchises featuring Ty Cobb Hank Greenberg and Al Kaline","All-time batting average leader at .367"] },
  { player:"Walter Johnson", sport:"⚾ MLB", answer:"JOHNSON", era:"legends", stats:{ERA:"1.14",W:"36",SO:"303",SHO:"11"}, ctx:"1913 MLB Season — Washington Senators MVP", clues:["Won 36 games with a 1.14 ERA this season","Won the Chalmers Award for MVP","Posted an ERA of 1.14 — among the best of the season","Was considered the fastest pitcher of his era"] },
  { player:"Honus Wagner", sport:"⚾ MLB", answer:"WAGNER", era:"legends", stats:{AVG:".339",H:"201",RBI:"100",SB:"61"}, ctx:"1908 MLB Season — Pittsburgh Pirates batting title", clues:["Won 8 batting titles in his career","Played during the Pirates dynasty years alongside Roberto Clemente and Willie Stargell","Nicknamed The Flying Dutchman","His T206 baseball card is the most valuable in history"] },
  { player:"Cy Young", sport:"⚾ MLB", answer:"CY YOUNG", era:"legends", stats:{W:"33",ERA:"1.26",SHO:"10",CG:"40"}, ctx:"1901 MLB Season — Boston Americans dominant year", clues:["Won 33 games with a 1.26 ERA this season","Has the most career wins in MLB history (511)","The Cy Young Award is named after him","Won over 30 games 5 times in his career"] },
  { player:"Rogers Hornsby", sport:"⚾ MLB", answer:"HORNSBY", era:"legends", stats:{AVG:".424",HR:"25",RBI:"94",OPS:"1.245"}, ctx:"1924 MLB Season — St. Louis Cardinals batting title", clues:["Hit .424 — the all-time NL single-season batting record","Won 7 batting titles in his career","The Cardinals have won 11 World Series championships — second most all-time","Has the highest career batting average in NL history (.358)"] },
  { player:"Christy Mathewson", sport:"⚾ MLB", answer:"MATHEWSON", era:"legends", stats:{W:"3",ERA:"0.00",IP:"27",SO:"18"}, ctx:"1905 World Series — New York Giants three shutouts", clues:["Threw 3 shutouts in a single World Series","Won 30+ games 4 times in his career","Posted an ERA of 0.00 — among the best of the season","Was one of the first five players elected to the Hall of Fame"] },
  { player:"Jimmie Foxx", sport:"⚾ MLB", answer:"FOXX", era:"legends", stats:{HR:"58",AVG:".364",RBI:"169",OPS:"1.284"}, ctx:"1932 MLB Season — Philadelphia Athletics MVP", clues:["Hit 58 home runs and won the Triple Crown this season","Won 3 AL MVP awards in his career","Batted .364 during this standout season","Nicknamed Double X and The Beast"] },
  { player:"Josh Gibson", sport:"⚾ MLB", answer:"JOSH GIBSON", era:"legends", stats:{HR:"84",AVG:".440",RBI:"165",YEAR:"1936"}, ctx:"1936 Negro Leagues Season — Homestead Grays", clues:["Is credited with hitting 84 home runs in one season in the Negro Leagues","Had a career batting average estimated at .372","Batted .440 during this standout season","Was inducted into the Hall of Fame in 1972 as one of the greatest players never to play in MLB"] },
  { player:"Satchel Paige", sport:"⚾ MLB", answer:"PAIGE", era:"legends", stats:{ERA:"2.50",W:"20",SO:"250",AGE:"42"}, ctx:"1948 MLB Season — Cleveland Indians — oldest rookie", clues:["Was 42 years old when he joined the Indians — oldest MLB rookie ever","Won 20 games in his first MLB season despite his age","Had dominated the Negro Leagues for decades","Was finally inducted to the Hall of Fame in 1971"] },
  { player:"Cool Papa Bell", sport:"⚾ MLB", answer:"COOL PAPA", era:"legends", stats:{AVG:".400",SB:"175",YEAR:"1933",LEAGUE:"Negro"}, ctx:"Negro Leagues Career — Pittsburgh Crawfords fastest player", clues:["Was said to be so fast he could turn off the light and be in bed before the room got dark","Was said to be so fast he could turn off the light and be in bed before the room got dark","Is credited with batting averages over .400 in multiple seasons","Was inducted into the Hall of Fame in 1974"] },
  { player:"Lefty Grove", sport:"⚾ MLB", answer:"GROVE", era:"legends", stats:{W:"31",ERA:"2.06",SO:"175",YEAR:"1931"}, ctx:"1931 MLB Season — Philadelphia Athletics MVP", clues:["Won 31 games and was named MVP this season","Won 9 ERA titles in his career","Posted an ERA of 2.06 — among the best of the season","Was considered the most dominant left-handed pitcher of his era"] },
  { player:"Dizzy Dean", sport:"⚾ MLB", answer:"DEAN", era:"legends", stats:{W:"30",ERA:"2.66",SO:"195",YEAR:"1934"}, ctx:"1934 MLB Season — St. Louis Cardinals Gashouse Gang", clues:["Won 30 games this season — last NL pitcher to do so","Won the NL MVP award","Was so dominant in 1934 he won 30 games — the last NL pitcher to accomplish that","Predicted he would win 30 games — and delivered"] },
  { player:"Luke Appling", sport:"⚾ MLB", answer:"APPLING", era:"legends", stats:{AVG:".388",H:"204",R:"93",YEAR:"1936"}, ctx:"1936 MLB Season — Chicago White Sox batting title", clues:["Played his entire career for one team despite better offers","Played his entire career for the White Sox","Nicknamed Old Aches and Pains for constantly complaining about injuries","Was elected to the Hall of Fame in 1964"] },
  { player:"Mel Ott", sport:"⚾ MLB", answer:"OTT", era:"legends", stats:{HR:"42",AVG:".304",RBI:"123",YEAR:"1936"}, ctx:"1936 MLB Season — New York Giants All-Pro", clues:["Hit 42 home runs this season at age 27","Was the first NL player to hit 500 career home runs","Batted .304 during this standout season","Had an unusual high leg kick in his batting stance"] },
  { player:"Bob Feller", sport:"⚾ MLB", answer:"FELLER", era:"legends", stats:{W:"26",SO:"348",ERA:"2.18",NH:"2"}, ctx:"1946 MLB Season — Cleveland Indians comeback year", clues:["Won 26 games and struck out 348 in his comeback after WWII","Served 4 years in the Navy during WWII at his prime","Posted an ERA of 2.18 — among the best of the season","Nicknamed Rapid Robert for his blazing fastball"] },
  { player:"Paul Waner", sport:"⚾ MLB", answer:"WANER", era:"legends", stats:{AVG:".380",H:"237",RBI:"131",YEAR:"1927"}, ctx:"1927 MLB Season — Pittsburgh Pirates MVP", clues:["Won the NL MVP award this season","Hit .380 with 237 hits","Played during the Pirates dynasty years alongside Roberto Clemente and Willie Stargell","Nicknamed Big Poison — his brother Lloyd was Little Poison"] },
  { player:"Hack Wilson", sport:"⚾ MLB", answer:"WILSON", era:"legends", stats:{HR:"56",RBI:"191",AVG:".356",YEAR:"1930"}, ctx:"1930 MLB Season — Chicago Cubs HR and RBI record", clues:["Set the NL home run record (56) and the all-time RBI record (191) in one season","The RBI record still stands today","The Cubs ended a 108-year World Series drought in 2016 in one of sports greatest moments","Was only 5ft 6in tall but had enormous arms and power"] },
  { player:"Diego Maradona", sport:"⚽ Soccer", answer:"MARADONA", era:"classic", stats:{G:"5",AST:"5",APP:"7",MIN:"630"}, ctx:"1986 FIFA World Cup — Argentina", clues:["Also won the Golden Ball as best player of the tournament","Won the Golden Ball as best player","Scored both the Hand of God and Goal of the Century vs England","Considered alongside Pele as the greatest ever"] },
  { player:"Ronaldo Nazario", sport:"⚽ Soccer", answer:"RONALDO NAZARIO", era:"classic", stats:{G:"15",AST:"4",APP:"16",MIN:"1238"}, ctx:"1996-97 Season — Barcelona La Liga", clues:["Won FIFA World Player of the Year at age 20","Scored 47 goals in all competitions","Barcelona is owned by its members — a cooperative with over 150000 supporter-owners","Brazilian striker known as The Phenomenon"] },
  { player:"Ruud Gullit", sport:"⚽ Soccer", answer:"GULLIT", era:"classic", stats:{G:"3",AST:"5",APP:"7",MIN:"596"}, ctx:"UEFA Euro 1988 — Netherlands", clues:["Won the European Championship with Netherlands","Was the captain of the Dutch team","Won the Ballon d'Or in 1987","AC Milan have won the European Cup 7 times — second only to Real Madrid all-time"] },
  { player:"Franco Baresi", sport:"⚽ Soccer", answer:"BARESI", era:"classic", stats:{APP:"532",UCL:"3",SCUD:"6",YEAR:"1994"}, ctx:"Career — AC Milan sweeper legend", clues:["Was the sweeper for AC Milan during their dominant era","Won 3 European Cups and 6 Serie A titles","Retired with his number 6 retired by AC Milan","Was considered the best defender in the world in the 1980s and 90s"] },
  { player:"Alessandro Del Piero", sport:"⚽ Soccer", answer:"DEL PIERO", era:"classic", stats:{G:"290",APP:"705",UCL:"1",SCUD:"6"}, ctx:"Career totals — Juventus legend", clues:["Scored 290 goals for Juventus — their all-time record","Won 6 Serie A titles with Juventus","Won the 2006 World Cup with Italy","Known as Pinturicchio for his elegant playing style"] },
  { player:"Rivaldo", sport:"⚽ Soccer", answer:"RIVALDO", era:"modern", stats:{G:"8",AST:"3",APP:"7",MIN:"630"}, ctx:"2002 FIFA World Cup — Brazil", clues:["Was the key player for Barcelona in the late 1990s","Won the Ballon d'Or in 1999","AC Milan have won the European Cup 7 times — second only to Real Madrid all-time","Brazilian forward known for his bicycle kicks and free kicks"] },
  { player:"Bobby Charlton", sport:"⚽ Soccer", answer:"BOBBY CHARLTON", era:"legends", stats:{G:"49",APP:"106",WC:"1",EURO:"0"}, ctx:"Career — England and Manchester United legend", clues:["Won the 1966 World Cup with England","Survived the 1958 Munich air disaster","United are the most widely supported football club in England","Was knighted for his services to football"] },
  { player:"Bobby Moore", sport:"⚽ Soccer", answer:"MOORE", era:"legends", stats:{G:"2",APP:"108",WC:"1",YEAR:"1966"}, ctx:"1966 FIFA World Cup — England World Champions", clues:["Lifted the Jules Rimet Trophy at Wembley Stadium","Lifted the Jules Rimet Trophy at Wembley","West Ham produced Bobby Moore Geoff Hurst and Martin Peters — the core of England's 1966 World Cup winning team","Considered the greatest English defender ever"] },
  { player:"Gerd Muller", sport:"⚽ Soccer", answer:"GERD MULLER", era:"classic", stats:{G:"14",APP:"10",MIN:"780",YEAR:"1970"}, ctx:"1970 FIFA World Cup — West Germany", clues:["Won the Golden Boot with 14 goals in 10 games","Scored 14 goals during this tournament or season","Nicknamed Der Bomber","Bayern Munich and West Germany striker of the 1970s"] },
  { player:"Lev Yashin", sport:"⚽ Soccer", answer:"LEV YASHIN", era:"legends", stats:{CS:"270",SAVES:"150+",YEAR:"1966",NATION:"Soviet Union"}, ctx:"Career — Soviet Union goalkeeper legend", clues:["Only goalkeeper to ever win the Ballon d'Or (1963)","Saved an estimated 150 penalties in his career","Is estimated to have saved 150 penalties — a figure that staggers modern goalkeepers","Known as The Black Spider for his all-black attire"] },
  { player:"Geoff Hurst", sport:"⚽ Soccer", answer:"HURST", era:"legends", stats:{G:"3",AST:"0",APP:"1",MIN:"90"}, ctx:"1966 FIFA World Cup Final — England vs West Germany", clues:["Scored a hat trick in the World Cup Final — the only player to do so","Also scored the hat trick in the Final","West Ham produced Bobby Moore Geoff Hurst and Martin Peters — the core of England's 1966 World Cup winning team","His second goal — did it cross the line — remains controversial"] },
  { player:"Garrincha", sport:"⚽ Soccer", answer:"GARRINCHA", era:"legends", stats:{G:"5",APP:"6",MIN:"540",YEAR:"1962"}, ctx:"1962 FIFA World Cup — Brazil", clues:["Won the Golden Boot at the 1962 World Cup","Won the Golden Boot with 5 goals in 6 games","Scored 5 goals during this tournament or season","Nicknamed Mane Garrincha — considered the greatest dribbler ever"] },
  { player:"Fritz Walter", sport:"⚽ Soccer", answer:"FRITZ WALTER", era:"legends", stats:{G:"0",AST:"1",APP:"1",MIN:"90"}, ctx:"1954 FIFA World Cup Final — West Germany", clues:["Captained West Germany to the 1954 World Cup — the Miracle of Bern","Was the leader of the surprise winning team","Scored 0 goals during this tournament or season","Rainy conditions at the final — now called Fritz Walter Weather — favored Germany"] },
  { player:"Giuseppe Meazza", sport:"⚽ Soccer", answer:"MEAZZA", era:"legends", stats:{G:"33",APP:"53",WC:"2",YEAR:"1938"}, ctx:"Career — Italy World Cup winning captain", clues:["Was the greatest Italian player of the pre-war era","Was the captain of Italy in 1938","Inter are the only Italian club to have never been relegated from Serie A","Was the greatest Italian player of the pre-war era"] },
  { player:"Tom Finney", sport:"⚽ Soccer", answer:"FINNEY", era:"legends", stats:{G:"30",APP:"76",YEAR:"1954",COUNTRY:"England"}, ctx:"Career — England and Preston North End legend", clues:["Was never booked in his entire career","Scored 30 goals in 76 England appearances","Played his entire club career for Preston North End — despite huge offers to leave","Was a plumber who kept his trade throughout his playing career"] },
  { player:"Alfredo Di Stefano", sport:"⚽ Soccer", answer:"DI STEFANO", era:"legends", stats:{G:"308",APP:"510",UCL:"5",YEAR:"1964"}, ctx:"Career — Real Madrid legend", clues:["Won 5 consecutive European Cups with Real Madrid","Scored in 5 consecutive European Cup Finals","Real Madrid have won the most UEFA Champions League titles of any club in history","Argentine-born who also represented Spain and Colombia internationally"] },
  { player:"Ferenc Puskas", sport:"⚽ Soccer", answer:"PUSKAS", era:"legends", stats:{G:"84",APP:"85",WC:"0",YEAR:"1960"}, ctx:"Career — Real Madrid and Hungary legend", clues:["Scored 84 goals in 85 appearances for Hungary","Won 3 European Cups with Real Madrid","Was the leading scorer in the 1960 European Cup Final with 4 goals","Nicknamed The Galloping Major"] },
  { player:"Raymond Kopa", sport:"⚽ Soccer", answer:"KOPA", era:"legends", stats:{BALLON:"1",WC:"3rd",YEAR:"1958",NATION:"France"}, ctx:"1958 FIFA World Cup — France", clues:["Won the Ballon d'Or in 1958","Was part of the Real Madrid dynasty alongside Di Stefano and Puskas","Real Madrid have won the most UEFA Champions League titles of any club in history","Was the first French player to win the Ballon d'Or"] },
  { player:"Didi", sport:"⚽ Soccer", answer:"DIDI", era:"legends", stats:{G:"3",APP:"5",WC:"2",YEAR:"1958"}, ctx:"1958 FIFA World Cup — Brazil", clues:["Was the best player at the 1958 World Cup","Played with the teenage Pele in Brazil's winning team","Real Madrid have won the most UEFA Champions League titles of any club in history","Was known for his folha seca (dry leaf) free kicks"] },
  { player:"Sandor Kocsis", sport:"⚽ Soccer", answer:"KOCSIS", era:"legends", stats:{G:"11",APP:"5",YEAR:"1954",WC:"Silver"}, ctx:"1954 FIFA World Cup — Hungary", clues:["Scored 11 goals at the 1954 World Cup — won the Golden Boot","Hungary reached the final as heavy favorites","Scored 11 goals during this tournament or season","Nicknamed Golden Head for his heading ability"] },
  { player:"Uwe Seeler", sport:"⚽ Soccer", answer:"SEELER", era:"legends", stats:{G:"43",APP:"72",YEAR:"1966",WC:"3rd"}, ctx:"Career — West Germany and Hamburg legend", clues:["Scored 43 goals in 72 appearances for West Germany","Played in 4 World Cups for West Germany","Played his entire club career for Hamburg","Is one of only 4 players to score in 4 different World Cups"] },
  { player:"Rivaldo", sport:"⚽ Soccer", answer:"RIVALDO CLASSIC", era:"legends", stats:{G:"35",APP:"74",WC:"1",BALLON:"1"}, ctx:"Career — Brazil and Barcelona legend", clues:["Won the Ballon d'Or in 1999","Won the World Cup with Brazil in 2002","Was the key player for Barcelona in the late 1990s","From Recife, Brazil"] },
  { player:"John Charles", sport:"⚽ Soccer", answer:"JOHN CHARLES", era:"legends", stats:{G:"28",APP:"97",YEAR:"1958",NATION:"Wales"}, ctx:"Career — Wales and Juventus legend", clues:["Was equally brilliant as center forward or center back","Juventus won 9 consecutive Serie A titles from 2012 to 2020 in one of Europe's greatest runs","Scored 28 goals in 97 appearances for Wales","Was never booked in his career despite his physical size"] },
  { player:"Djalma Santos", sport:"⚽ Soccer", answer:"DJALMA SANTOS", era:"legends", stats:{G:"3",APP:"98",WC:"2",YEAR:"1962"}, ctx:"Career — Brazil two-time World Cup champion", clues:["Was considered the best right back in the world in the late 1950s","Was considered the best right back in the world in the late 1950s","Scored 3 goals during this tournament or season","Won the World Cup in his last international tournament"] },
  { player:"Bjorn Borg", sport:"🎾 ATP", answer:"BJORN BORG", era:"classic", stats:{W:"89",L:"3",GRAND_SLAMS:"5",TITLES:"11"}, ctx:"1979 ATP Season — 4th consecutive Wimbledon title", clues:["Won Wimbledon for the 4th consecutive year","Won 11 Grand Slams in total","Swedish player who retired at just 26","Famous rivalry with John McEnroe"] },
  { player:"John McEnroe", sport:"🎾 ATP", answer:"MCENROE", era:"classic", stats:{W:"82",L:"3",GRAND_SLAMS:"3",TITLES:"10"}, ctx:"1984 ATP Season — Most dominant year", clues:["Won 82 of 85 matches this year — one of the best seasons ever","Won Wimbledon and US Open this year","American player famous for his on-court outbursts","His rivalry with Borg is one of sport's greatest"] },
  { player:"Stefan Edberg", sport:"🎾 ATP", answer:"EDBERG", era:"classic", stats:{W:"75",L:"17",GRAND_SLAMS:"2",TITLES:"9"}, ctx:"1990 ATP Season — World No. 1 and Wimbledon champion", clues:["Won Wimbledon and US Open this year","Reached World No. 1 for the second time","Swedish player known for his serve and volley style","Won 6 Grand Slams in total"] },
  { player:"Steffi Graf", sport:"🎾 WTA", answer:"STEFFI GRAF", era:"classic", stats:{W:"96",L:"2",GRAND_SLAMS:"4",TITLES:"11"}, ctx:"1988 WTA Season — Golden Slam", clues:["Won all 4 Grand Slams AND Olympic gold in one year","Only player ever to achieve the Golden Slam","From West Germany","Married to Andre Agassi"] },
  { player:"Andre Agassi", sport:"🎾 ATP", answer:"AGASSI", era:"classic", stats:{W:"74",L:"14",GRAND_SLAMS:"2",WORLD_NO1:"Yes"}, ctx:"1994 ATP Season — Two Grand Slams and World No. 1", clues:["Won Wimbledon and US Open this year","Reached World No. 1 for the first time","American player known for his baseline power","Won all 4 Grand Slams in his career"] },
  { player:"Conchita Martinez", sport:"🎾 ATP", answer:"MARTINEZ", era:"classic", stats:{W:"1",YEAR:"1994",SURFACE:"Grass",COUNTRY:"Spain"}, ctx:"1994 Wimbledon — Spanish clay courter wins on grass", clues:["Won Wimbledon as a clay court specialist","Beat Martina Navratilova in the final","Spanish player who was better known on clay","This was her only Grand Slam singles title"] },
  { player:"Rod Laver", sport:"🎾 ATP", answer:"LAVER", era:"legends", stats:{GRAND_SLAMS:"11",CAL_GRAND_SLAM:"Won twice",YEAR:"1969",COUNTRY:"Australia"}, ctx:"1969 ATP Season — Second career Grand Slam", clues:["Turned professional in 1963 after dominating amateur tennis","Won 11 Grand Slam singles titles","Australian player who dominated amateur and professional tennis","Considered the greatest tennis player of his era"] },
  { player:"Ken Rosewall", sport:"🎾 ATP", answer:"ROSEWALL", era:"classic", stats:{GRAND_SLAMS:"8",FINAL:"4",YEAR:"1974",AGE:"39"}, ctx:"1974 Wimbledon Final — 39-year-old finalist", clues:["Reached the Wimbledon Final at age 39 — lost to Connors","Won 8 Grand Slam singles titles spanning 19 years","Australian player nicknamed Muscles","Won his last Grand Slam title at age 37"] },
  { player:"Arthur Ashe", sport:"🎾 ATP", answer:"ASHE", era:"classic", stats:{GRAND_SLAMS:"3",WIMBLEDON:"1x winner",YEAR:"1975",COUNTRY:"USA"}, ctx:"1975 Wimbledon — Historic win over Connors", clues:["Won Wimbledon by upsetting the heavily favored Jimmy Connors","Was the first Black man to win Wimbledon","Won 3 Grand Slam titles in his career","Became an activist and spokesperson for AIDS awareness"] },
  { player:"Margaret Court", sport:"🎾 WTA", answer:"COURT", era:"classic", stats:{GRAND_SLAMS:"24",SLAM:"3",YEAR:"1970",COUNTRY:"Australia"}, ctx:"1970 WTA Season — Calendar Grand Slam", clues:["Won all 4 Grand Slams in one year — the Grand Slam","Won 24 Grand Slam singles titles — the most ever","Australian player who dominated women's tennis in the 1960s and 70s","Retired with 24 Grand Slam singles titles — the most in history"] },
  { player:"Billie Jean King", sport:"🎾 WTA", answer:"BILLIE JEAN KING", era:"legends", stats:{GRAND_SLAMS:"12",WIMBLEDON:"6x winner",YEAR:"1967",BATTLE:"1"}, ctx:"Career — Women's tennis pioneer", clues:["Won 12 Grand Slam singles titles including 6 Wimbledons","Won the Battle of the Sexes match vs Bobby Riggs in 1973","Was a champion for equal prize money in tennis","Founded the Women's Tennis Association"] },
  { player:"Ilie Nastase", sport:"🎾 ATP", answer:"NASTASE", era:"classic", stats:{W:"104",L:"7",GRAND_SLAMS:"2",WORLD_NO1:"Yes"}, ctx:"1973 ATP Season — World No. 1 dominant year", clues:["Was the first official World No. 1 in tennis","Won 2 Grand Slams in his career","Romanian player known as Nasty for his on-court behavior","Won 109 singles titles in his career"] },
  { player:"Evonne Goolagong", sport:"🎾 WTA", answer:"GOOLAGONG", era:"classic", stats:{GRAND_SLAMS:"7",WIMBLEDON:"2x winner",YEAR:"1971",COUNTRY:"Australia"}, ctx:"1971 Wimbledon — First win at 19 years old", clues:["Won Wimbledon at age 19 in her first major final","Won 7 Grand Slam singles titles","Australian Aboriginal player who broke barriers","Won Wimbledon a second time in 1980 as a mother"] },
  { player:"Pancho Gonzales", sport:"🎾 ATP", answer:"GONZALES", era:"legends", stats:{PRO:"8",YEAR:"1954",COUNTRY:"USA",WORLD_NO1:"Yes"}, ctx:"1950s Professional Tennis — Dominant decade", clues:["Dominated professional tennis for nearly a decade","Won the US Championships as an amateur in 1948 and 1949","American player of Mexican descent who overcame poverty","Was considered one of the greatest players of all time"] },
  { player:"Lew Hoad", sport:"🎾 ATP", answer:"HOAD", era:"legends", stats:{GRAND_SLAMS:"4",WIMBLEDON:"2x winner",YEAR:"1956",COUNTRY:"Australia"}, ctx:"1956 ATP Season — Two Grand Slams at age 21", clues:["Won Wimbledon and Australian Open at just 21","Had a career hampered by back injuries","Australian player who was Rod Laver's idol","Won 4 Grand Slams in his short career"] },
  { player:"Fred Perry", sport:"🎾 ATP", answer:"FRED PERRY", era:"legends", stats:{GRAND_SLAMS:"8",WIMBLEDON:"3x winner",YEAR:"1936",NATION:"Great Britain"}, ctx:"1936 Wimbledon — Last British man to win", clues:["After tennis became a clothing entrepreneur — Perry shirts are iconic","Won 8 Grand Slam titles including 3 consecutive Wimbledons","Was the World No. 1 for 4 years","Later founded the Fred Perry clothing brand"] },
  { player:"Tony Trabert", sport:"🎾 ATP", answer:"TRABERT", era:"legends", stats:{GRAND_SLAMS:"5",YEAR:"1955",COUNTRY:"USA",SLAM:"1"}, ctx:"1955 ATP Season — Three Grand Slams", clues:["Won 3 Grand Slams in one year (1955)","Won 5 Grand Slam singles titles in total","American player from Cincinnati","Was considered the best American player of the mid-1950s"] },
  { player:"Jack Kramer", sport:"🎾 ATP", answer:"KRAMER", era:"legends", stats:{GRAND_SLAMS:"3",WIMBLEDON:"1x winner",YEAR:"1947",COUNTRY:"USA"}, ctx:"1947 Wimbledon — Post-war American champion", clues:["Won Wimbledon and US Championships in 1947","Dominated professional tennis after turning pro","Later became a powerful force in organizing professional tennis","From Las Vegas, Nevada"] },
  { player:"Don Budge", sport:"🎾 ATP", answer:"BUDGE", era:"legends", stats:{GRAND_SLAMS:"6",SLAM:"1",YEAR:"1938",COUNTRY:"USA"}, ctx:"1938 ATP Season — First ever Grand Slam", clues:["Was the first player ever to win the Grand Slam (all 4 majors in one year)","Won 6 Grand Slam titles in total","American player from Oakland, California","Was the top-ranked player in the world from 1937 to 1938"] },
  { player:"Maureen Connolly", sport:"🎾 ATP", answer:"CONNOLLY", era:"legends", stats:{GRAND_SLAMS:"9",SLAM:"1",YEAR:"1953",COUNTRY:"USA"}, ctx:"1953 WTA Season — First women's Grand Slam", clues:["Was the first woman to win the Grand Slam (all 4 majors in one year)","Won 9 Grand Slam singles titles by age 19","Nicknamed Little Mo","Her career was cut short by a horse riding accident at age 19"] },
  { player:"Helen Wills Moody", sport:"🎾 ATP", answer:"WILLS MOODY", era:"legends", stats:{GS:"19",WIMB:"8",YEAR:"1935",COUNTRY:"USA"}, ctx:"Career — 1920s-30s American tennis queen", clues:["Won 19 Grand Slam singles titles","Won Wimbledon 8 times","Never lost a set in Wimbledon singles matches for 9 years","Nicknamed Queen Helen and Little Poker Face"] },
  { player:"Suzanne Lenglen", sport:"🎾 ATP", answer:"LENGLEN", era:"legends", stats:{GRAND_SLAMS:"12",WIMBLEDON:"6x winner",YEAR:"1922",NATION:"France"}, ctx:"1920s WTA Season — First female tennis superstar", clues:["Won 12 Grand Slam singles titles","Won Wimbledon 6 consecutive times","Won the French Championships six consecutive years without losing a single set","French player who revolutionized women's tennis fashion and style"] },
  { player:"Henri Cochet", sport:"🎾 ATP", answer:"COCHET", era:"legends", stats:{GRAND_SLAMS:"8",YEAR:"1928",NATION:"France",MUSK:"1"}, ctx:"1928 ATP Season — French Musketeers era", clues:["Won 8 Grand Slam titles including the French Open 4 times","Was part of the Four Musketeers of French tennis","Was famous for dramatic comebacks from two sets down","Nicknamed The Magician of the Court"] },
  { player:"Louise Brough", sport:"🎾 WTA", answer:"BROUGH", era:"legends", stats:{GS:"13",WIMBLEDON:"4x winner",YEAR:"1950",COUNTRY:"USA"}, ctx:"Career — Post-war American women's champion", clues:["Won 13 Grand Slam titles including 4 consecutive Wimbledons (1948-50)","Won all 4 Grand Slams in her career","American player from Beverly Hills","Won 35 Grand Slam titles in singles, doubles, and mixed combined"] },
  { player:"Doris Hart", sport:"🎾 WTA", answer:"DORIS HART", era:"legends", stats:{GS:"35",SINGLES:"6",YEAR:"1951",COUNTRY:"USA"}, ctx:"Career — Post-war American all-court champion", clues:["Won 35 Grand Slam titles combining singles, doubles, and mixed","Won the Grand Slam in doubles and mixed doubles","Overcame severe leg problems as a child that doctors thought would prevent her from walking","One of the most versatile players of the amateur era"] },
  { player:"Tiger Woods", sport:"⛳ Golf", answer:"TIGER WOODS", era:"modern", stats:{WINS:"9",MAJORS:"3",AVG:"68.56",CUTS:"20"}, ctx:"2000 PGA Tour — Won 3 of 4 majors and all 4 cuts", clues:["Won 3 of 4 majors this year","Made every single cut","Won US Open by 15 strokes","His last name is a large animal"] },
  { player:"Phil Mickelson", sport:"⛳ Golf", answer:"PHIL MICKELSON", era:"modern", stats:{WINS:"4",MAJORS:"1",AVG:"69.1",EARN:"$4.7M"}, ctx:"2004 PGA Tour Season — First Masters title", clues:["Won his first Masters title after years of near misses","Had been called the best player without a major","Left-handed golfer nicknamed Lefty","Won by one shot at Augusta"] },
  { player:"Dustin Johnson", sport:"⛳ Golf", answer:"DUSTIN JOHNSON", era:"modern", stats:{WINS:"5",MAJORS:"1",AVG:"69.40",EARN:"$9.4M"}, ctx:"2020 PGA Tour Season — Masters record", clues:["Won The Masters by 5 shots setting the scoring record","Set the 72-hole scoring record at Augusta (-20)","From Columbia, South Carolina","Won 2 major championships in his career"] },
  { player:"Jon Rahm", sport:"⛳ Golf", answer:"RAHM", era:"modern", stats:{WINS:"3",MAJORS:"1",AVG:"69.30",EARN:"$7.7M"}, ctx:"2021 US Open — Spanish champion wins first major", clues:["Won his first major at the US Open","Had tested positive for COVID two weeks earlier and had to withdraw from an event while leading","From Barrika, Spain","Moved to LIV Golf in 2024"] },
  { player:"Scottie Scheffler", sport:"⛳ Golf", answer:"SCHEFFLER", era:"modern", stats:{WINS:"4",MAJORS:"1",AVG:"68.85",EARN:"$14.1M"}, ctx:"2022 PGA Tour Season — Masters and World No. 1", clues:["Won The Masters and 3 other events this year","Became World No. 1 for the first time","From Dallas, Texas","Became the dominant player of his era"] },
  { player:"Vijay Singh", sport:"⛳ Golf", answer:"VIJAY SINGH", era:"modern", stats:{WINS:"9",MAJORS:"1",AVG:"69.0",EARN:"$10.9M"}, ctx:"2004 PGA Tour Season — World No. 1", clues:["Won 9 tournaments and became World No. 1","Dethroned Tiger Woods at the top of the rankings","From Lautoka, Fiji — first Fijian to reach World No. 1","Known for his intense practice work ethic"] },
  { player:"Ernie Els", sport:"⛳ Golf", answer:"ERNIE ELS", era:"classic", stats:{WINS:"4",MAJORS:"2",AVG:"69.8",EARN:"$6.8M"}, ctx:"1997 PGA Tour Season — Two US Open titles", clues:["Won 2 US Opens and 2 British Opens in his career","Nicknamed The Big Easy for his smooth swing","From Johannesburg, South Africa","Won the US Open in 1994 and 1997"] },
  { player:"Sergio Garcia", sport:"⛳ Golf", answer:"GARCIA", era:"modern", stats:{WINS:"1",MAJORS:"1",AVG:"70.52",EARN:"$2.2M"}, ctx:"2017 Masters — First major for Garcia", clues:["Won his first major at The Masters at age 37","Had been considered the best player without a major","From Borriol, Spain","Beat Justin Rose in a playoff at Augusta"] },
  { player:"Adam Scott", sport:"⛳ Golf", answer:"ADAM SCOTT", era:"modern", stats:{WINS:"1",MAJORS:"1",AVG:"70.05",EARN:"$4.6M"}, ctx:"2013 Masters — First Australian Masters winner", clues:["Became the first Australian to win The Masters","Won in a playoff over Angel Cabrera","From Adelaide, South Australia","Was coached by Butch Harmon and worked with caddie Steve Williams"] },
  { player:"Henrik Stenson", sport:"⛳ Golf", answer:"STENSON", era:"modern", stats:{WINS:"1",MAJORS:"1",AVG:"69.72",EARN:"$3.1M"}, ctx:"2016 British Open — Duel in the Sun II", clues:["Shot 63 in the final round — the lowest ever recorded in a major championship final round","Shot 63 in the final round to win","From Gothenburg, Sweden","Was nicknamed The Iceman for his calm demeanor under pressure"] },
  { player:"Collin Morikawa", sport:"⛳ Golf", answer:"COLLIN MORIKAWA", era:"modern", stats:{WINS:"2",MAJORS:"2",AVG:"69.47",EARN:"$4.8M"}, ctx:"2021 PGA Tour Season — The Open Championship", clues:["Won The Open Championship on his first appearance","Won 2 majors in his first 9 major starts","From Los Angeles, California","Korean-American player nicknamed The Machine for his iron play"] },
  { player:"Xander Schauffele", sport:"⛳ Golf", answer:"SCHAUFFELE", era:"modern", stats:{WINS:"2",MAJORS:"2",EARN:"$9.7M",YEAR:"2024"}, ctx:"2024 PGA Tour Season — Two major wins", clues:["Won the PGA Championship and The Open Championship this year","Had been the best player without a major for years","From San Diego, California","His father was an Olympic decathlete"] },
  { player:"Rickie Fowler", sport:"⛳ Golf", answer:"FOWLER", era:"modern", stats:{WINS:"5",MAJORS:"0",AVG:"70.12",EARN:"$6.7M"}, ctx:"2015 PGA Tour Season — Players Championship win", clues:["Won the Players Championship — sometimes called the 5th major","Known for wearing orange — his college color","From Murrieta, California","Has been in the top 10 at all 4 majors in the same year without winning one"] },
  { player:"Patrick Cantlay", sport:"⛳ Golf", answer:"PATRICK CANTLAY", era:"modern", stats:{WINS:"4",MAJORS:"0",EARN:"$8.7M",YEAR:"2021"}, ctx:"2021 PGA Tour Season — FedEx Cup champion", clues:["Won the FedEx Cup in a dramatic playoff","Ranked among the top 5 players in the world","From Long Beach, California","Known for his calm demeanor nicknamed Patty Ice"] },
  { player:"Matt Fitzpatrick", sport:"⛳ Golf", answer:"FITZPATRICK", era:"modern", stats:{WINS:"1",MAJORS:"1",EARN:"$2.8M",YEAR:"2022"}, ctx:"2022 US Open — Brookline comeback win", clues:["Won the US Open at The Country Club in Brookline","Had won the US Amateur at the same course 10 years earlier","From Sheffield, England","Beat Will Zalatoris and Scottie Scheffler"] },
  { player:"Sam Burns", sport:"⛳ Golf", answer:"SAM BURNS", era:"modern", stats:{WINS:"3",MAJORS:"0",EARN:"$6.8M",YEAR:"2022"}, ctx:"2022 PGA Tour Season — Three wins", clues:["Won 3 PGA Tour events in the same season","Known for his iron play and ball-striking","From Shreveport, Louisiana","Won multiple Zurich Classic titles with partner Webb Simpson"] },
  { player:"Tom Watson", sport:"⛳ Golf", answer:"TOM WATSON", era:"classic", stats:{WINS:"6",MAJORS:"2",EARN:"$1.2M",YEAR:"1982"}, ctx:"1982 PGA Tour Season — US Open chip-in at Pebble Beach", clues:["Beat Jack Nicklaus and Hubert Green in one of the most dramatic final rounds ever played","Won The Open Championship the same year","Won 8 majors in total","From Kansas City, Missouri"] },
  { player:"Nick Faldo", sport:"⛳ Golf", answer:"NICK FALDO", era:"classic", stats:{WINS:"4",MAJORS:"2",AVG:"69.90",YEAR:"1990"}, ctx:"1990 PGA Tour Season — Masters and British Open", clues:["Won The Masters and The Open Championship this year","Won 6 major championships in total","From Welwyn Garden City, England","Rebuilt his swing from scratch with coach David Leadbetter"] },
  { player:"Greg Norman", sport:"⛳ Golf", answer:"GREG NORMAN", era:"classic", stats:{WINS:"3",MAJORS:"1",AVG:"69.10",YEAR:"1993"}, ctx:"1993 PGA Tour Season — British Open", clues:["Won The Open Championship this year by 2 shots","Reached World No. 1 for 331 weeks","From Mount Isa, Queensland, Australia","Nicknamed The Great White Shark"] },
  { player:"Seve Ballesteros", sport:"⛳ Golf", answer:"SEVE BALLESTEROS", era:"classic", stats:{WINS:"4",MAJORS:"1",AVG:"70.20",YEAR:"1984"}, ctx:"1984 British Open at St Andrews", clues:["Won The Open Championship at the home of golf","Won 5 major championships in his career","From Pedrena, Spain","Pioneered European golf as a global force"] },
  { player:"Lee Trevino", sport:"⛳ Golf", answer:"LEE TREVINO", era:"classic", stats:{WINS:"4",MAJORS:"2",EARN:"$3.2M",YEAR:"1971"}, ctx:"1971 PGA Tour — Three Opens in three weeks", clues:["Won the US Open, Canadian Open, and British Open in the same month","Won 6 major championships in total","From Dallas, Texas","Nicknamed Super Mex"] },
  { player:"Payne Stewart", sport:"⛳ Golf", answer:"PAYNE STEWART", era:"classic", stats:{WINS:"3",MAJORS:"1",PUTT:"1.741",YEAR:"1999"}, ctx:"1999 US Open — Pinehurst No. 2", clues:["Sank the winning putt on the 18th to win the US Open","Was killed in a plane crash 4 months after this win","From Springfield, Missouri","Known for wearing knickerbockers and tam o'shanter caps"] },
  { player:"Curtis Strange", sport:"⛳ Golf", answer:"CURTIS STRANGE", era:"classic", stats:{WINS:"3",MAJORS:"2",EARN:"$1.1M",YEAR:"1989"}, ctx:"1989 PGA Tour Season — US Open back-to-back", clues:["Won the US Open for the second consecutive year","First player to earn over $1M in a season","From Norfolk, Virginia","Back-to-back US Open wins are extremely rare"] },
  { player:"Bernhard Langer", sport:"⛳ Golf", answer:"BERNHARD LANGER", era:"classic", stats:{WINS:"4",MAJORS:"2",RYDER:"19.5",YEAR:"1993"}, ctx:"1993 Masters — Augusta National second win", clues:["Won his second Masters title this year","Won 2 Masters Championships","From Anhausen, West Germany","Had the yips and reinvented his putting style"] },
  { player:"Fred Couples", sport:"⛳ Golf", answer:"COUPLES", era:"classic", stats:{WINS:"4",MAJORS:"1",AVG:"69.38",YEAR:"1992"}, ctx:"1992 Masters — American champion wins first major", clues:["Won The Masters for his only major championship","His ball famously stayed on the bank on 12 and he made birdie","From Seattle, Washington","Known as Boom Boom for his long driving"] },
  { player:"Sandy Lyle", sport:"⛳ Golf", answer:"SANDY LYLE", era:"classic", stats:{WINS:"2",MAJORS:"2",EARN:"$1.6M",YEAR:"1988"}, ctx:"1988 Masters — First British winner at Augusta", clues:["Became the first British player to win The Masters","His famous bunker shot on 18 is one of golf's most iconic moments","From Shrewsbury, England (of Scottish descent)","Also won The Open Championship in 1985"] },
  { player:"Ian Woosnam", sport:"⛳ Golf", answer:"WOOSNAM", era:"classic", stats:{WINS:"1",MAJORS:"1",WORLD_NO1:"Yes",YEAR:"1991"}, ctx:"1991 Masters — Welsh champion reaches No. 1", clues:["Won The Masters and became World No. 1","Only 5ft 4in — one of the shortest players ever to reach World No. 1","From Oswestry, England (of Welsh descent)","Was known for his incredible distance given his small stature"] },
  { player:"Mark O'Meara", sport:"⛳ Golf", answer:"OMEARA", era:"classic", stats:{WINS:"2",MAJORS:"2",AVG:"70.47",YEAR:"1998"}, ctx:"1998 PGA Tour Season — Masters and British Open at 41", clues:["Won The Masters and The Open Championship in the same year at age 41","Had been a close friend of Tiger Woods for years","From Goldsboro, North Carolina","Won both his majors in his late 30s and early 40s"] },
  { player:"Davis Love III", sport:"⛳ Golf", answer:"DAVIS LOVE", era:"classic", stats:{SCORE:"-11",MARGIN:"5",R1:"66",R4:"71"}, ctx:"1997 PGA Championship — Kiawah Island win", clues:["His late father Davis Love Jr was a renowned golf instructor who died in a plane crash","Dedicated the win to his father who died in a plane crash","From Charlotte, North Carolina","Later became a prominent Ryder Cup captain"] },
  { player:"Paul Azinger", sport:"⛳ Golf", answer:"AZINGER", era:"classic", stats:{SCORE:"-12",PLAYOFF:"W",OPP:"Greg Norman",HOLES:"2"}, ctx:"1993 PGA Championship — Inverness Club win", clues:["Won the PGA Championship in a playoff","Was later diagnosed with lymphoma but returned to win again","From Holyoke, Massachusetts","Later became a successful Ryder Cup captain in 2008"] },
  { player:"Bob Tway", sport:"⛳ Golf", answer:"TWAY", era:"classic", stats:{SCORE:"-12",BUNKER:"1",HOLE:"18",LEAD:"Norman"}, ctx:"1986 PGA Championship — Inverness Club", clues:["Holed out from a bunker on the 72nd hole to win the PGA Championship","Came from behind to beat Greg Norman","From Oklahoma City, Oklahoma","Ironically Greg Norman lost multiple majors in similar late-charge fashion"] },
  { player:"Hale Irwin", sport:"⛳ Golf", answer:"IRWIN", era:"classic", stats:{WINS:"3",MAJORS:"1",AGE:"45",YEAR:"1990"}, ctx:"1990 US Open — Medinah Country Club at age 45", clues:["Had a scholarship to Colorado where he was an All-Big Eight defensive back in football","Won 3 US Opens in his career","From Joplin, Missouri","Was also a scholarship football player at the University of Colorado"] },
  { player:"Tom Kite", sport:"⛳ Golf", answer:"KITE", era:"classic", stats:{WINS:"1",MAJORS:"1",AVG:"70.21",YEAR:"1992"}, ctx:"1992 US Open — Pebble Beach in tough conditions", clues:["Is remembered for making a 60-foot chip-in on the 72nd hole to win","Was the all-time money leader at one point in his career","From Austin, Texas — played college golf with Ben Crenshaw","Wore glasses while playing"] },
  { player:"Larry Mize", sport:"⛳ Golf", answer:"MIZE", era:"classic", stats:{CHIP:"45yds",HOLE:"11",PLAYOFF:"W",OPP:"Norman"}, ctx:"1987 Masters playoff — Famous chip-in against Norman", clues:["Chipped in from 45 yards on the 11th hole in a sudden death playoff","Beat Greg Norman with the miraculous chip","From Augusta, Georgia — a hometown hero","This was his only major championship"] },
  { player:"Hal Sutton", sport:"⛳ Golf", answer:"SUTTON", era:"classic", stats:{SCORE:"-10",MARGIN:"1",AGE:"25",FIELD:"Nicklaus"}, ctx:"1983 PGA Championship — First major win", clues:["Won the PGA Championship as a 25-year-old","His famous call to Tiger Woods at Ryder Cup became controversial","From Shreveport, Louisiana","Won 14 PGA Tour events in his career"] },
  { player:"Ben Hogan", sport:"⛳ Golf", answer:"BEN HOGAN", era:"legends", stats:{WINS:"5",MAJORS:"3",AVG:"69.3",YEAR:"1953"}, ctx:"1953 PGA Tour Season — Won three majors in one year", clues:["Won 3 majors in one year","Could not attempt the Grand Slam due to scheduling conflicts","Had survived a near-fatal car accident years earlier","Considered one of the greatest ball-strikers ever"] },
  { player:"Sam Snead", sport:"⛳ Golf", answer:"SAM SNEAD", era:"legends", stats:{WINS:"18",MAJORS:"3",EARN:"$620K",YEAR:"1950"}, ctx:"Career — Most PGA Tour wins ever", clues:["Won 82 PGA Tour events — the most ever","Won 7 major championships in his career","From Hot Springs, Virginia","Was known for his smooth, effortless swing"] },
  { player:"Byron Nelson", sport:"⛳ Golf", answer:"BYRON NELSON", era:"legends", stats:{WINS:"18",STREAK:"11",AVG:"68.33",YEAR:"1945"}, ctx:"1945 PGA Tour Season — Greatest season in golf history", clues:["Won 18 tournaments in one season — all-time record","Won 11 consecutive tournaments — all-time record","Played mostly during World War II era","His record may never be broken"] },
  { player:"Arnold Palmer", sport:"⛳ Golf", answer:"ARNOLD PALMER", era:"legends", stats:{WINS:"7",MAJORS:"3",EARN:"$1.8M",YEAR:"1962"}, ctx:"Career — Arnie's Army built golf's popularity", clues:["Won 7 major championships in his career","Was the first golfer to earn over 1 million dollars in career prize money","From Latrobe, Pennsylvania","With Jack Nicklaus and Gary Player formed golf's Big Three"] },
  { player:"Gary Player", sport:"⛳ Golf", answer:"GARY PLAYER", era:"legends", stats:{WINS:"9",MAJORS:"3",SLAM:"1",YEAR:"1965"}, ctx:"Career — First non-American to win Masters", clues:["Won all 4 majors in his career (Grand Slam)","Won 9 major championships total","From Johannesburg, South Africa","Won 9 major championships across three different decades of competition"] },
  { player:"Gene Sarazen", sport:"⛳ Golf", answer:"GENE SARAZEN", era:"legends", stats:{MAJORS:"7",SLAM:"1",SHOT:"1",YEAR:"1935"}, ctx:"Career — First Grand Slam champion", clues:["Won all 4 majors in his career — the first to do so","Invented the sand wedge","Made the shot heard round the world — a double eagle at the 1935 Masters","Won 7 major championships in his career"] },
  { player:"Walter Hagen", sport:"⛳ Golf", answer:"WALTER HAGEN", era:"legends", stats:{MAJORS:"11",PGA:"5",BRIT:"4",YEAR:"1928"}, ctx:"Career — 1920s dominant era", clues:["Won 11 major championships in his career","Won 5 consecutive PGA Championships (1924-27)","Was the first golfer to earn $1 million","Was famous for his showmanship and stylish appearance"] },
  { player:"Bobby Jones", sport:"⛳ Golf", answer:"BOBBY JONES", era:"legends", stats:{MAJORS:"13",SLAM:"1",YEAR:"1930",AMATEUR:"5"}, ctx:"1930 Season — The Impregnable Quadrilateral", clues:["Won the Grand Slam (all 4 majors) in 1930","Was an amateur who never turned professional","Won 13 major championships (5 US Amateurs + 4 US Opens + 4 Opens)","Founded Augusta National Golf Club and The Masters"] },
  { player:"Tommy Armour", sport:"⛳ Golf", answer:"TOMMY ARMOUR", era:"legends", stats:{MAJORS:"3",WIMB:"0",YEAR:"1927",COUNTRY:"Scotland"}, ctx:"Career — The Silver Scot dominates 1920s-30s", clues:["Won 3 majors (US Open, British Open, PGA Championship)","Was known as The Silver Scot for his white hair","Served in World War I and was wounded","Later became one of the most famous golf teachers ever"] },
  { player:"Jim Barnes", sport:"⛳ Golf", answer:"JIM BARNES", era:"legends", stats:{MAJORS:"4",YEAR:"1921",COUNTRY:"England",PGA:"2"}, ctx:"Career — First PGA Championship winner", clues:["Won the first PGA Championship in 1916","Also won the US Open and British Open in his career","From Lelant, Cornwall, England","Was known as Long Jim for his tall, gangly build"] },
  { player:"Lawson Little", sport:"⛳ Golf", answer:"LAWSON LITTLE", era:"legends", stats:{AMATEUR:"4",YEAR:"1935",OPEN:"1",COUNTRY:"USA"}, ctx:"Career — Double Amateur Grand Slam winner", clues:["Won both the US Amateur and British Amateur in consecutive years (1934-35)","Won 4 major amateur titles in 2 years","Later won the US Open as a professional in 1940","From Newport, Rhode Island"] },
  { player:"Frank Stranahan", sport:"⛳ Golf", answer:"STRANAHAN", era:"legends", stats:{AMATEUR:"2",YEAR:"1950",BRIT:"2",COUNTRY:"USA"}, ctx:"Career — Amateur champion of the 1940s-50s", clues:["Won 2 British Amateur titles","Was one of the best amateur golfers of the postwar era","Was famous for his physical fitness — unusual for golfers at the time","From Toledo, Ohio — heir to the Champion Spark Plug fortune"] },
  { player:"Billy Casper", sport:"⛳ Golf", answer:"BILLY CASPER", era:"legends", stats:{MAJORS:"3",WINS:"51",YEAR:"1966",CHAMP:"1"}, ctx:"Career — One of golf's most underrated champions", clues:["Won 51 PGA Tour events including 3 majors","Won the US Open in 1959 and 1966","Came back from 7 shots behind Palmer to win the 1966 US Open","Was considered golf's most underrated Hall of Famer"] },
  { player:"Tony Lema", sport:"⛳ Golf", answer:"TONY LEMA", era:"legends", stats:{WINS:"12",MAJORS:"1",YEAR:"1964",BRITISH:"1"}, ctx:"1964 British Open — St Andrews first-timer win", clues:["Won the British Open at St Andrews in his first appearance","Nicknamed Champagne Tony for celebrating wins with champagne","Won 12 PGA Tour events before dying in a plane crash in 1966","From Oakland, California"] },
  { player:"Julius Boros", sport:"⛳ Golf", answer:"JULIUS BOROS", era:"legends", stats:{SCORE:"-1",AGE:"48",RECORD:"Oldest",MARGIN:"1"}, ctx:"1968 PGA Championship — An unlikely champion at Pecan Valley", clues:["Won the 1968 PGA Championship at age 48 — oldest major winner ever","Won 3 major championships in his career","From Fairfield, Connecticut","Was known for his relaxed, unhurried swing"] },
  { player:"Cary Middlecoff", sport:"⛳ Golf", answer:"MIDDLECOFF", era:"legends", stats:{MAJORS:"3",WINS:"40",YEAR:"1955",DDS:"1"}, ctx:"1955 Masters — Dominant win", clues:["Won The Masters by 7 shots — a record at the time","Won 3 major championships in his career","Was a practicing dentist before turning pro","From Halls, Tennessee"] },
  { player:"Lloyd Mangrum", sport:"⛳ Golf", answer:"MANGRUM", era:"legends", stats:{MAJORS:"1",WINS:"36",YEAR:"1946",WAR:"1"}, ctx:"1946 US Open — Returning war hero wins", clues:["Won the 1946 US Open just months after returning from WWII","Won the Purple Heart for wounds suffered in combat","From Trenton, Texas","Was known as the gambler of the golf circuit"] },
  { player:"Ralph Guldahl", sport:"⛳ Golf", answer:"GULDAHL", era:"legends", stats:{MAJORS:"3",WINS:"16",YEAR:"1938",STREAK:"2"}, ctx:"1938 Season — Back-to-back US Opens", clues:["Won the US Open in 1937 and 1938","Also won The Masters in 1939","Had a career slump and came back — then mysteriously lost his game permanently","From Dallas, Texas"] },
  { player:"Horton Smith", sport:"⛳ Golf", answer:"HORTON SMITH", era:"legends", stats:{MAJORS:"2",MASTERS:"2",YEAR:"1936",FIRST:"1"}, ctx:"Career — First Masters champion", clues:["Won the first Masters Tournament in 1934","Also won The Masters in 1936","From Springfield, Missouri","Was the youngest player to win the PGA money title in 1929"] },
  { player:"Jackie Burke Jr.", sport:"⛳ Golf", answer:"JACKIE BURKE", era:"legends", stats:{MAJORS:"2",YEAR:"1956",MASTERS:"1",PGA:"1"}, ctx:"1956 Season — Masters and PGA Championship", clues:["Won both The Masters and PGA Championship in the same year","From Fort Worth, Texas","Won 16 PGA Tour events in his career","Was a Ryder Cup captain in 1957"] },
  { player:"Doug Ford", sport:"⛳ Golf", answer:"DOUG FORD", era:"legends", stats:{SCORE:"-3",BUNKER:"H18",PLAYOFF:"No",LEAD:"3"}, ctx:"1957 Masters — Famous bunker shot to win", clues:["Holed out from the bunker on 18 to win The Masters","Also won the PGA Championship in 1955","From New Haven, Connecticut","His hole-out at Augusta remains one of The Masters most dramatic moments"] },
  { player:"Art Wall Jr.", sport:"⛳ Golf", answer:"ART WALL", era:"legends", stats:{MAJORS:"1",HIO:"45",YEAR:"1959",MASTERS:"1"}, ctx:"1959 Masters — Ace maker wins", clues:["Won The Masters this year after making 4 holes-in-one during the season","Made a record 45 career holes-in-one","From Honesdale, Pennsylvania","Was named PGA Player of the Year in 1959"] },
  { player:"Bob Rosburg", sport:"⛳ Golf", answer:"ROSBURG", era:"legends", stats:{SCORE:"-2",MARGIN:"1",R4:"66",OPP:"Wall"}, ctx:"1959 PGA Championship — Minneapolis Golf Club", clues:["Won the 1959 PGA Championship","Had 4 PGA Tour wins in his career","Later became a famous television broadcaster for golf","From San Francisco, California"] },
  { player:"Gay Brewer", sport:"⛳ Golf", answer:"GAY BREWER", era:"legends", stats:{MAJORS:"1",WINS:"10",YEAR:"1967",MASTERS:"1"}, ctx:"1967 Masters — Augusta comeback champion", clues:["Won The Masters in 1967","Had famously missed a short putt the year before that cost him the title","From Midway, Kentucky","Won 10 PGA Tour events in his career"] },
  { player:"Sidney Crosby", sport:"🏒 NHL", answer:"SID THE KID", era:"modern", stats:{G:"36",AST:"72",PTS:"108",PIM:"34"}, ctx:"2017 Stanley Cup Finals MVP — Pittsburgh Penguins", clues:["Won second consecutive Stanley Cup MVP","The Penguins won back-to-back Cups in 2016 and 2017 behind Crosby and Malkin","From Cole Harbour, Nova Scotia","Nicknamed Sid the Kid"] },
  { player:"Alexander Ovechkin", sport:"🏒 NHL", answer:"OVI", era:"modern", stats:{G:"65",AST:"47",PTS:"112",PIM:"50"}, ctx:"2007-08 NHL Season — Hart Trophy MVP", clues:["This season took place during the 2007 NHL campaign","Scored 65 goals — one of the highest totals ever","Was born in Moscow Russia and is widely considered the greatest goal scorer in NHL history","From Moscow, Russia"] },
  { player:"Henrik Lundqvist", sport:"🏒 NHL", answer:"LUNDQVIST", era:"modern", stats:{GAA:"1.97","SV%":".936",W:"43",TEAM:"Rangers"}, ctx:"2011-12 NHL Season — New York Rangers Vezina winner", clues:["His career save percentage was .920 over his career","The Rangers ended a 54-year championship drought when they won the Cup in 1994","Swedish goaltender nicknamed The King","Led the Rangers to the Stanley Cup Final in 2014"] },
  { player:"Martin Brodeur", sport:"🏒 NHL", answer:"BRODEUR", era:"modern", stats:{GAA:"2.02","SV%":".917",W:"38",TEAM:"Devils"}, ctx:"2006-07 NHL Season — New Jersey Devils Vezina winner", clues:["Holds the all-time records for wins, shutouts, and games played by a goalie","The Devils won 3 Stanley Cups with one of the most defensively dominant teams ever","All-time NHL leader in wins, shutouts, and games played","Won 3 Stanley Cups with the Devils"] },
  { player:"Evgeni Malkin", sport:"🏒 NHL", answer:"MALKIN", era:"modern", stats:{G:"11",AST:"24",PTS:"36",GP:"24"}, ctx:"2009 Stanley Cup Finals MVP — Pittsburgh Penguins", clues:["Won the Conn Smythe Trophy as playoff MVP","The Penguins won back-to-back Cups in 2016 and 2017 behind Crosby and Malkin","From Magnitogorsk, Russia","Won 3 Stanley Cups with the Penguins"] },
  { player:"Erik Karlsson", sport:"🏒 NHL", answer:"ERIK KARLSSON", era:"modern", stats:{G:"25",AST:"75",PTS:"100",PIM:"-1"}, ctx:"2022-23 NHL Season — San Jose Sharks", clues:["Became the first defenseman to score 100 points since Brian Leetch","The Sharks were perennial playoff contenders for two decades but never won the Stanley Cup","Swedish defenseman nickname EK65","Won 2 Norris Trophies as best defenseman"] },
  { player:"Victor Hedman", sport:"🏒 NHL", answer:"HEDMAN", era:"modern", stats:{G:"3",AST:"7",PTS:"10",YEAR:"2021"}, ctx:"2021 Stanley Cup Finals MVP — Tampa Bay Lightning", clues:["Won the Conn Smythe Trophy as playoff MVP","The Lightning won back-to-back Cups in 2020 and 2021 with one of the sport's best rosters","Swedish defenseman won 2 consecutive Stanley Cups","From Ornskoldsvik, Sweden"] },
  { player:"Carey Price", sport:"🏒 NHL", answer:"PRICE", era:"modern", stats:{GAA:"1.96","SV%":".933",W:"44",TEAM:"Canadiens"}, ctx:"2014-15 NHL Season — Montreal Canadiens MVP", clues:["Won the Hart, Vezina, and Ted Lindsay Award this season","The Canadiens have won the Stanley Cup 24 times — by far the most of any franchise","From Anahim Lake, British Columbia — of First Nations descent","Considered one of the best goaltenders of his era"] },
  { player:"Jarome Iginla", sport:"🏒 NHL", answer:"IGINLA", era:"modern", stats:{G:"52",AST:"44",PTS:"96",PIM:"62"}, ctx:"2001-02 NHL Season — Calgary Flames Art Ross Trophy", clues:["Led the Flames to a 52-win season","The Flames relocated from Atlanta in 1980 and won the Stanley Cup in 1989","Won 2 Olympic gold medals with Canada","One of the greatest Flames players ever"] },
  { player:"Joe Thornton", sport:"🏒 NHL", answer:"THORNTON", era:"modern", stats:{G:"29",AST:"96",PTS:"125",PIM:"61"}, ctx:"2005-06 NHL Season — San Jose Sharks MVP", clues:["Won the Hart Trophy and Art Ross Trophy after being traded mid-season","Set the San Jose Sharks franchise records","Nicknamed Jumbo Joe for his size","From St. Thomas, Ontario"] },
  { player:"Mats Sundin", sport:"🏒 NHL", answer:"SUNDIN", era:"modern", stats:{G:"41",AST:"47",PTS:"88",PIM:"68"}, ctx:"2001-02 NHL Season — Toronto Maple Leafs captain", clues:["Was the first European player ever selected 1st overall in the NHL Draft","From Bromma, Sweden","Was the first European player selected first overall in the NHL Draft (1989)","Won 2 Olympic gold medals with Sweden"] },
  { player:"Dany Heatley", sport:"🏒 NHL", answer:"HEATLEY", era:"modern", stats:{G:"50",AST:"53",PTS:"103",PIM:"74"}, ctx:"2005-06 NHL Season — Ottawa Senators All-Star", clues:["Scored 50 goals and 103 points this season","The current Senators franchise was revived in 1992 — the original Ottawa team folded in 1934","Won Olympic gold with Canada in 2002 and 2010","From Freiburg, Germany — raised in Calgary"] },
  { player:"Wayne Gretzky", sport:"🏒 NHL", answer:"THE GREAT ONE", era:"classic", stats:{G:"92",AST:"120",PTS:"212",PIM:"26"}, ctx:"1981-82 NHL Season — Edmonton Oilers record season", clues:["All-time single-season goals record (92)","212 points is the all-time record","The Oilers dynasty had Gretzky Messier Coffey and Fuhr — arguably the greatest team ever","Known as The Great One"] },
  { player:"Mario Lemieux", sport:"🏒 NHL", answer:"SUPER MARIO", era:"classic", stats:{G:"69",AST:"114",PTS:"183",PIM:"54"}, ctx:"1988-89 NHL Season — Pittsburgh Penguins", clues:["Scored 183 points this season","The Penguins won back-to-back Cups in 2016 and 2017 behind Crosby and Malkin","Nicknamed Super Mario","Battled cancer mid-career but returned"] },
  { player:"Brett Hull", sport:"🏒 NHL", answer:"BRETT HULL", era:"classic", stats:{G:"86",AST:"45",PTS:"131",PIM:"24"}, ctx:"1990-91 NHL Season — St. Louis Blues", clues:["Scored 86 goals — 3rd most in NHL history","The Blues won their first Cup in 2019 after 52 years of trying — while Gloria played in the arena","Son of Bobby Hull — also a Hall of Famer","Nicknamed The Golden Brett"] },
  { player:"Paul Coffey", sport:"🏒 NHL", answer:"PAUL COFFEY", era:"classic", stats:{G:"48",AST:"90",PTS:"138",PM:"+12"}, ctx:"1985-86 NHL Season — Edmonton Oilers defenseman record", clues:["Set the record for goals by a defenseman (48)","The Oilers dynasty had Gretzky Messier Coffey and Fuhr — arguably the greatest team ever","Won 4 Stanley Cups in his career","Considered the greatest offensive defenseman after Bobby Orr"] },
  { player:"Ray Bourque", sport:"🏒 NHL", answer:"RAY BOURQUE", era:"classic", stats:{G:"21",AST:"73",PTS:"94",PM:"+19"}, ctx:"1993-94 NHL Season — Boston Bruins", clues:["Won his 5th Norris Trophy as best defenseman","The Bruins have the second most Stanley Cup championships in NHL history","Finally won the Stanley Cup in his last season","Won 5 Norris Trophies total"] },
  { player:"Patrick Roy", sport:"🏒 NHL", answer:"PATRICK ROY", era:"classic", stats:{GAA:"1.70","SV%":".934",W:"16",PLAYOFF:""}, ctx:"1993 Stanley Cup Finals MVP — Montreal Canadiens", clues:["Won Conn Smythe Trophy as playoff MVP","Montreal Canadiens won the Stanley Cup","Won 4 Stanley Cups and 3 Conn Smythe Trophies","His last name is pronounced Wah not Roy"] },
  { player:"Teemu Selanne", sport:"🏒 NHL", answer:"TEEMU SELANNE", era:"classic", stats:{G:"76",AST:"56",PTS:"132",PIM:"45"}, ctx:"1992-93 NHL Season — Winnipeg Jets rookie record", clues:["Set the rookie scoring record with 76 goals","Shattered the previous rookie record by 23 goals","The Jets brought NHL hockey back to Winnipeg in 2011 after the original Jets moved to Phoenix","Finnish Winger nicknamed The Finnish Flash"] },
  { player:"Guy Lafleur", sport:"🏒 NHL", answer:"GUY LAFLEUR", era:"classic", stats:{G:"60",AST:"72",PTS:"132",PIM:"26"}, ctx:"1977-78 NHL Season — Montreal Canadiens MVP", clues:["Won the Hart Trophy as league MVP","Won his 4th consecutive Stanley Cup this year","The Canadiens have won the Stanley Cup 24 times — by far the most of any franchise","Nicknamed The Flower"] },
  { player:"Peter Bondra", sport:"🏒 NHL", answer:"PETER BONDRA", era:"classic", stats:{G:"52",AST:"28",PTS:"80",PIM:"40"}, ctx:"1997-98 NHL Season — Washington Capitals", clues:["Led the NHL in goals with 52","This season took place during the 1997 NHL campaign","Slovak player from Lutsk, Ukraine","One of the fastest skaters of his era"] },
  { player:"Denis Savard", sport:"🏒 NHL", answer:"DENIS SAVARD", era:"classic", stats:{G:"44",AST:"87",PTS:"131",PIM:"82"}, ctx:"1987-88 NHL Season — Chicago Blackhawks", clues:["Scored 131 points this season","The Blackhawks won 3 Cups in 6 years forming the most recent NHL dynasty","From Pointe-Gatineau, Quebec","Famous for his spin-o-rama move"] },
  { player:"Luc Robitaille", sport:"🏒 NHL", answer:"ROBITAILLE", era:"classic", stats:{G:"63",AST:"62",PTS:"125",PIM:"80"}, ctx:"1992-93 NHL Season — Los Angeles Kings", clues:["Scored 63 goals this season — a record for left wings","The Kings won back-to-back Stanley Cups in 2012 and 2014 built around their shutdown defensive system","Nicknamed Lucky Luc","All-time leading scorer among left wings"] },
  { player:"Bryan Trottier", sport:"🏒 NHL", answer:"TROTTIER", era:"classic", stats:{G:"47",AST:"77",PTS:"134",PIM:"68"}, ctx:"1978-79 NHL Season — New York Islanders MVP", clues:["Won the Hart Trophy as league MVP","The Islanders won 4 consecutive Stanley Cups from 1980 to 1983 — a dynasty often overlooked","Won 4 consecutive Stanley Cups with the Islanders","Was inducted into the Hall of Fame in 1997"] },
  { player:"Al MacInnis", sport:"🏒 NHL", answer:"MACINNIS", era:"classic", stats:{G:"28",AST:"75",PTS:"103",PIM:"93"}, ctx:"1993-94 NHL Season — Calgary Flames", clues:["Was known for having one of the hardest shots in NHL history","The Blues won their first Cup in 2019 after 52 years of trying — while Gloria played in the arena","Won the Conn Smythe Trophy in 1989","From Inverness, Nova Scotia"] },
  { player:"Dale Hawerchuk", sport:"🏒 NHL", answer:"HAWERCHUK", era:"classic", stats:{G:"53",AST:"77",PTS:"130",PIM:"44"}, ctx:"1984-85 NHL Season — Winnipeg Jets", clues:["Scored 130 points this season at age 21","The Jets brought NHL hockey back to Winnipeg in 2011 after the original Jets moved to Phoenix","Won the Calder Trophy as rookie of the year in 1982","Was the 1st overall pick in the 1981 NHL Draft"] },
  { player:"Steve Yzerman", sport:"🏒 NHL", answer:"CAPTAIN YZERMAN", era:"classic", stats:{G:"51",AST:"57",PTS:"108",PIM:"54"}, ctx:"1989-90 NHL Season — Detroit Red Wings captain", clues:["Led the Red Wings with 51 goals and 108 points","Was named captain at age 21 — the youngest in Wings history","Won 3 Stanley Cups as captain in the late 1990s","Led the team through a major rebuilding period"] },
  { player:"Bobby Orr", sport:"🏒 NHL", answer:"BOBBY ORR", era:"classic", stats:{G:"46",AST:"102",PTS:"148",PM:"+124"}, ctx:"1970-71 NHL Season — Boston Bruins", clues:["Defenseman who led the entire league in scoring","The Bruins have the second most Stanley Cup championships in NHL history","Revolutionized the defenseman position","Won 8 consecutive Norris Trophies as best defenseman"] },
  { player:"Gordie Howe", sport:"🏒 NHL", answer:"MR HOCKEY", era:"legends", stats:{G:"49",AST:"46",PTS:"95",PIM:"72"}, ctx:"1952-53 NHL Season — Detroit Red Wings", clues:["Known as Mr. Hockey","The Red Wings won 4 Cups in 11 years forming the last great NHL dynasty","Played in 5 different decades","A Gordie Howe Hat Trick is a goal, assist, and fight"] },
  { player:"Phil Esposito", sport:"🏒 NHL", answer:"PHIL ESPOSITO", era:"classic", stats:{G:"76",AST:"76",PTS:"152",PIM:"71"}, ctx:"1970-71 NHL Season — Boston Bruins", clues:["Scored 76 goals — shattering the previous record","The Bruins have the second most Stanley Cup championships in NHL history","His record stood until Gretzky broke it","Italian-Canadian player who transformed the center position"] },
  { player:"Bobby Hull", sport:"🏒 NHL", answer:"BOBBY HULL", era:"legends", stats:{G:"54",AST:"43",PTS:"97",PIM:"70"}, ctx:"1965-66 NHL Season — Chicago Blackhawks", clues:["Scored 54 goals — the first player to score 50 twice","The Blackhawks won 3 Cups in 6 years forming the most recent NHL dynasty","Known as The Golden Jet for his speed and blonde hair","Was the first player to score 50 goals in a season twice"] },
  { player:"Jean Beliveau", sport:"🏒 NHL", answer:"JEAN BELIVEAU", era:"legends", stats:{G:"37",AST:"69",PTS:"106",PIM:"38"}, ctx:"1964-65 NHL Season — Montreal Canadiens MVP", clues:["Won the Hart Trophy as league MVP","Won 10 Stanley Cups as a player","The Canadiens have won the Stanley Cup 24 times — by far the most of any franchise","Was offered the position of Governor General of Canada — he declined"] },
  { player:"Maurice Richard", sport:"🏒 NHL", answer:"THE ROCKET", era:"legends", stats:{G:"50",AST:"25",PTS:"75",PIM:"75"}, ctx:"1944-45 NHL Season — Montreal Canadiens", clues:["First player to score 50 goals in 50 games — a record for 36 years","The Canadiens have won the Stanley Cup 24 times — by far the most of any franchise","Nicknamed The Rocket","The Richard Riot in 1955 showed his extraordinary popularity in Montreal"] },
  { player:"Terry Sawchuk", sport:"🏒 NHL", answer:"SAWCHUK", era:"legends", stats:{GAA:"1.90",SO:"12",W:"44",YEAR:"1952"}, ctx:"1951-52 NHL Season — Detroit Red Wings Vezina winner", clues:["Posted a goals-against average of 1.90 — among the best of their time","All-time NHL leader in shutouts (103)","The Red Wings won 4 Cups in 11 years forming the last great NHL dynasty","Won 4 Stanley Cups in his career"] },
  { player:"Glenn Hall", sport:"🏒 NHL", answer:"GLENN HALL", era:"legends", stats:{GAA:"2.10","SV%":".918",SO:"7",TEAM:"Blackhawks"}, ctx:"Career — Played 502 consecutive complete games", clues:["Never wore a mask throughout his entire career despite facing 100mph slap shots","Won 3 Vezina Trophies as best goaltender","Nicknamed Mr. Goalie","Was so nervous before games he would vomit every single pre-game"] },
  { player:"Jacques Plante", sport:"🏒 NHL", answer:"PLANTE", era:"legends", stats:{GAA:"2.11",SO:"82",VEZINA:"7",MASK:"1"}, ctx:"Career — Inventor of the goalie mask", clues:["Was the first goaltender to regularly wear a mask after being cut by a shot in 1959","Won 7 Vezina Trophies as best goaltender","Won 6 Stanley Cups with Montreal Canadiens","Revolutionized goaltending by being the first to roam from the crease"] },
  { player:"Stan Mikita", sport:"🏒 NHL", answer:"STAN MIKITA", era:"legends", stats:{G:"35",AST:"62",PTS:"97",PIM:"58"}, ctx:"1967-68 NHL Season — Chicago Blackhawks MVP", clues:["Won the Hart Trophy as league MVP","Won 4 awards this season — Hart, Art Ross, Lady Byng, and Conn Smythe as team MVP","The Blackhawks won 3 Cups in 6 years forming the most recent NHL dynasty","Born in Sokolce, Slovakia — raised in St. Catharines, Ontario"] },
  { player:"Frank Mahovlich", sport:"🏒 NHL", answer:"MAHOVLICH", era:"legends", stats:{G:"48",AST:"32",PTS:"80",PIM:"131"}, ctx:"1960-61 NHL Season — Toronto Maple Leafs", clues:["Was so coveted that a team once tried to buy him mid-season for 1 million dollars","Was nicknamed The Big M and was one of the most physically gifted players of his era","Nicknamed The Big M","Won 6 Stanley Cups in his career"] },
  { player:"Milt Schmidt", sport:"🏒 NHL", answer:"MILT SCHMIDT", era:"legends", stats:{G:"27",AST:"35",PTS:"62",YEAR:"1952"}, ctx:"Career — Boston Bruins center and team leader", clues:["Was the captain of the Boston Bruins for many years","Won 2 Stanley Cups with the Bruins","Was part of the famous Kraut Line","Later coached the Bruins and managed the team"] },
  { player:"Tim Horton", sport:"🏒 NHL", answer:"TIM HORTON", era:"legends", stats:{G:"18",AST:"38",PTS:"56",YEAR:"1964"}, ctx:"Career — Toronto Maple Leafs defenseman", clues:["Was considered one of the strongest players in NHL history","Was so strong he once reportedly bent the steering wheel of a car with his bare hands","Died in a car accident in 1974 while still playing","The Tim Hortons coffee chain is named after him"] },
  { player:"Red Kelly", sport:"🏒 NHL", answer:"RED KELLY", era:"legends", stats:{G:"20",AST:"50",PTS:"70",YEAR:"1960"}, ctx:"Career — Two-position champion", clues:["Won 4 Stanley Cups with Detroit and 4 more with Toronto — 8 total","Won the Norris Trophy as best defenseman in 1954","Later transitioned to play center — rare for a defenseman","Also served as a Member of Parliament while playing hockey"] },
  { player:"Bernie Geoffrion", sport:"🏒 NHL", answer:"BOOM BOOM", era:"legends", stats:{G:"50",AST:"45",PTS:"95",YEAR:"1961"}, ctx:"1960-61 NHL Season — Montreal Canadiens", clues:["Was the second player to score 50 goals in a season","Nicknamed Boom Boom for the sound of his slapshot","Won 6 Stanley Cups with Montreal Canadiens","Is credited with popularizing the slapshot"] },
  { player:"Toe Blake", sport:"🏒 NHL", answer:"TOE BLAKE", era:"legends", stats:{G:"26",AST:"43",PTS:"69",YEAR:"1945"}, ctx:"1944-45 NHL Season — Montreal Canadiens Hart MVP", clues:["Won the Hart Trophy as league MVP","Won the NHL scoring title this year","Won 3 Stanley Cups as a player","Won 8 Stanley Cups as coach of the Montreal Canadiens"] },
  { player:"Elmer Lach", sport:"🏒 NHL", answer:"ELMER LACH", era:"legends", stats:{G:"26",AST:"54",PTS:"80",YEAR:"1945"}, ctx:"1944-45 NHL Season — Montreal Canadiens — Punch Line", clues:["Won the Hart Trophy as MVP in 1945 — one of the few centers to win it over a scorer","Won the Hart Trophy as league MVP this season","Won 3 Stanley Cups with Montreal","Was known as a superb passer who set up Richard"] },
  { player:"Syl Apps", sport:"🏒 NHL", answer:"SYL APPS", era:"legends", stats:{G:"29",AST:"30",PTS:"59",YEAR:"1942"}, ctx:"Career — Toronto Maple Leafs captain", clues:["Won 3 Stanley Cups and was known as one of the cleanest players ever","Won 3 Stanley Cups with Toronto","Was also a pole vaulter who competed in the 1936 Olympics","Won the Lady Byng Trophy for clean play multiple times"] },
  { player:"Clint Benedikt", sport:"🏒 NHL", answer:"BENEDICT", era:"legends", stats:{GAA:"1.50",SO:"15",YEAR:"1926",TEAM:"Maroons"}, ctx:"1925-26 NHL Season — Montreal Maroons Vezina winner", clues:["Won the Stanley Cup with Montreal Maroons this year","Was the first goaltender to wear a mask in an NHL game (1930)","Won 4 Stanley Cups in his career","Was known for flopping to the ice — causing rule changes"] },
  { player:"Cy Denneny", sport:"🏒 NHL", answer:"DENNENY", era:"legends", stats:{G:"318",YEAR:"1929",TEAM:"Senators",STANLEY_CUPS:"4"}, ctx:"Career — Ottawa Senators early NHL legend", clues:["Was the NHL's all-time leading scorer when he retired","The current Senators franchise was revived in 1992 — the original Ottawa team folded in 1934","Was one of the top goal scorers of the early NHL era","Played in the NHL's first season in 1917-18"] },
  { player:"Duke Keats", sport:"🏒 NHL", answer:"DUKE KEATS", era:"legends", stats:{G:"31",AST:"22",PTS:"53",YEAR:"1922"}, ctx:"1921-22 WCHL Season — Edmonton Eskimos", clues:["Was the best player in the Western Canada Hockey League","Was called the best hockey player of the 1920s by many experts","Was known for his great stickhandling and scoring ability","This season took place during the 1921 NHL campaign"] },
  { player:"Charlie Conacher", sport:"🏒 NHL", answer:"CHARLIE CONACHER", era:"legends", stats:{G:"52",PTS:"73",YEAR:"1932",TEAM:"Toronto"}, ctx:"1931-32 NHL Season — Toronto Maple Leafs", clues:["Led the NHL in goals 5 times in his career","Was part of the famous Kid Line with Harvey Jackson and Joe Primeau","Was known as The Big Bomber for his thunderous slap shot","Was one of the hardest shooters of his era"] },
  { player:"Dit Clapper", sport:"🏒 NHL", answer:"DIT CLAPPER", era:"legends", stats:{G:"228",YEAR:"1947",TEAM:"Bruins",STANLEY_CUPS:"3"}, ctx:"Career — Boston Bruins 20-year legend", clues:["Was the first player in NHL history to be named an All-Star at two different positions","Was considered the toughest defenseman in hockey and was nearly impossible to get past","Was the first player to play 20 NHL seasons with one team","Played both forward and defense during his career"] },
  { player:"Hooley Smith", sport:"🏒 NHL", answer:"HOOLEY SMITH", era:"legends", stats:{G:"200",YEAR:"1934",TEAM:"Maroons",CUP:"1"}, ctx:"Career — Rough and rugged Montreal Maroons champion", clues:["Played in an era where players went both ways for the full 60 minutes without substitution","Was known as one of the toughest players of his era","Was considered one of the most complete two-way players in the early NHL era","Was inducted into the Hockey Hall of Fame in 1972"] },
  { player:"LeBron James", sport:"🏀 NBA", answer:"LEBRON DRAFT", era:"modern", stats:{PICK:"1",YEAR:"2003",TEAM:"Cleveland Cavaliers",AGE:"18"}, ctx:"2003 NBA Draft — #1 Overall Pick", clues:["Was the most hyped draft prospect since Magic Johnson","Cleveland Cavaliers selected him first overall","Went straight from high school to the NBA","Was on the cover of Sports Illustrated at age 17"] },
  { player:"Zion Williamson", sport:"🏀 NBA", answer:"ZION", era:"modern", stats:{PICK:"1",YEAR:"2019",TEAM:"New Orleans Pelicans",SCHOOL:"Duke"}, ctx:"2019 NBA Draft — #1 Overall Pick", clues:["Had a famous Nike shoe blowout in college that went viral","Played one season at Duke University","Weighed 285 pounds but moved like a guard","Had a famous Nike shoe blowout in college that went viral"] },
  { player:"Andrew Wiggins", sport:"🏀 NBA", answer:"WIGGINS DRAFT", era:"modern", stats:{PICK:"1",YEAR:"2014",TEAM:"Cleveland Cavaliers",SCHOOL:"Kansas"}, ctx:"2014 NBA Draft — #1 Overall Pick", clues:["Was traded on draft night for Kevin Love","Was traded on draft night for Kevin Love","Played one season at Kansas University","From Thornhill, Ontario, Canada"] },
  { player:"Anthony Davis", sport:"🏀 NBA", answer:"AD DRAFT", era:"modern", stats:{PICK:"1",YEAR:"2012",TEAM:"New Orleans Hornets",SCHOOL:"Kentucky"}, ctx:"2012 NBA Draft — #1 Overall Pick", clues:["Won the NCAA championship at Kentucky before being drafted","Played one season at Kentucky and won the national championship","Was 19 years old when drafted","Known for his unibrow which became an iconic feature"] },
  { player:"Karl-Anthony Towns", sport:"🏀 NBA", answer:"KAT DRAFT", era:"modern", stats:{PICK:"1",YEAR:"2015",TEAM:"Minnesota Timberwolves",SCHOOL:"Kentucky"}, ctx:"2015 NBA Draft — #1 Overall Pick", clues:["Was considered the most skilled big man prospect in years","Played one season at Kentucky","From Piscataway, New Jersey — of Dominican descent","Was considered the most skilled big man prospect in years"] },
  { player:"Ben Simmons", sport:"🏀 NBA", answer:"SIMMONS DRAFT", era:"modern", stats:{PICK:"1",YEAR:"2016",TEAM:"Philadelphia 76ers",SCHOOL:"LSU"}, ctx:"2016 NBA Draft — #1 Overall Pick", clues:["Did not play his rookie year due to a foot injury","Played one season at LSU but did not play his rookie year due to injury","From Melbourne, Australia","Was known for refusing to shoot three-pointers"] },
  { player:"Markelle Fultz", sport:"🏀 NBA", answer:"FULTZ", era:"modern", stats:{PICK:"1",YEAR:"2017",TEAM:"Philadelphia 76ers",SCHOOL:"Washington"}, ctx:"2017 NBA Draft — #1 Overall Pick", clues:["Had a mysterious shooting problem in his first season that baffled everyone","Was the first #1 pick by Philadelphia since Allen Iverson in 1996","Played one season at the University of Washington","Boston gave up the pick that became him in exchange for Isaiah Thomas"] },
  { player:"Deandre Ayton", sport:"🏀 NBA", answer:"AYTON", era:"modern", stats:{PICK:"1",YEAR:"2018",TEAM:"Phoenix Suns",SCHOOL:"Arizona"}, ctx:"2018 NBA Draft — #1 Overall Pick", clues:["Was selected one pick before Luka Doncic","Played one season at the University of Arizona","From Nassau, Bahamas","Many consider the 2018 draft class one of the most talent-rich in recent memory"] },
  { player:"Victor Wembanyama", sport:"🏀 NBA", answer:"WEMBY", era:"modern", stats:{PICK:"1",YEAR:"2023",TEAM:"San Antonio Spurs",HEIGHT:"7ft4"}, ctx:"2023 NBA Draft — #1 Overall Pick", clues:["Had to serve 2 years in the US Navy before joining the team","Was 7 feet 4 inches tall with an enormous wingspan","From Le Chesnay, France","Was called a generational talent unlike anything seen before"] },
  { player:"Cade Cunningham", sport:"🏀 NBA", answer:"CUNNINGHAM DRAFT", era:"modern", stats:{PICK:"1",YEAR:"2021",TEAM:"Detroit Pistons",SCHOOL:"Oklahoma State"}, ctx:"2021 NBA Draft — #1 Overall Pick", clues:["Plays in one of the smallest markets in the NBA","Played one season at Oklahoma State","From Montverde, Florida","Was considered the face of the rebuilding Detroit franchise"] },
  { player:"Patrick Ewing", sport:"🏀 NBA", answer:"EWING DRAFT", era:"classic", stats:{PICK:"1",YEAR:"1985",TEAM:"New York Knicks",SCHOOL:"Georgetown"}, ctx:"1985 NBA Draft — First Lottery Pick Ever", clues:["Was the very first #1 pick selected by the new lottery system","New York Knicks won the first-ever draft lottery","Played 4 seasons at Georgetown under John Thompson","From Kingston, Jamaica — came to the US at age 13"] },
  { player:"Magic Johnson", sport:"🏀 NBA", answer:"MAGIC DRAFT", era:"classic", stats:{PICK:"1",YEAR:"1979",TEAM:"Los Angeles Lakers",SCHOOL:"Michigan State"}, ctx:"1979 NBA Draft — #1 Overall Pick", clues:["Had just won the NCAA championship at Michigan State","Led the Spartans past Larry Bird and Indiana State in the title game","Was 19 years old when drafted","Immediately joined Kareem Abdul-Jabbar on the Lakers"] },
  { player:"David Robinson", sport:"🏀 NBA", answer:"ROBINSON DRAFT", era:"classic", stats:{PICK:"1",YEAR:"1987",TEAM:"San Antonio Spurs",SCHOOL:"Navy"}, ctx:"1987 NBA Draft — #1 Overall Pick", clues:["San Antonio waited patiently two years while he fulfilled his Navy duty","Had to serve 2 years in the Navy before joining the Spurs","Played at the US Naval Academy","San Antonio waited patiently 2 years for him to complete his service"] },
  { player:"Hakeem Olajuwon", sport:"🏀 NBA", answer:"HAKEEM DRAFT", era:"classic", stats:{PICK:"1",YEAR:"1984",TEAM:"Houston Rockets",SCHOOL:"Houston"}, ctx:"1984 NBA Draft — #1 Overall Pick ahead of Jordan", clues:["Was picked BEFORE Michael Jordan — two picks before him","Was picked BEFORE Michael Jordan who went #3","Played at the University of Houston with Clyde Drexler","From Lagos, Nigeria — did not start playing basketball until age 17"] },
  { player:"Peyton Manning", sport:"🏈 NFL", answer:"PEYTON DRAFT", era:"classic", stats:{PICK:"1",YEAR:"1998",TEAM:"Indianapolis Colts",SCHOOL:"Tennessee"}, ctx:"1998 NFL Draft — #1 Overall Pick", clues:["Won the Outland Trophy and Lombardi Award in college","Ryan Leaf was the #2 pick — one of the biggest draft busts ever","Played at the University of Tennessee","The Colts chose him over Ryan Leaf in one of the most debated picks ever"] },
  { player:"Eli Manning", sport:"🏈 NFL", answer:"ELI DRAFT", era:"modern", stats:{PICK:"1",YEAR:"2004",TEAM:"San Diego Chargers",TRADE:"Giants"}, ctx:"2004 NFL Draft — #1 Overall Pick traded on draft night", clues:["Threatened to play baseball for the New York Yankees instead","Was immediately traded to the New York Giants for Philip Rivers","Played at Ole Miss like his father Archie Manning","The trade is one of the most famous in draft history"] },
  { player:"Andrew Luck", sport:"🏈 NFL", answer:"LUCK DRAFT", era:"modern", stats:{PICK:"1",YEAR:"2012",TEAM:"Indianapolis Colts",SCHOOL:"Stanford"}, ctx:"2012 NFL Draft — #1 Overall Pick", clues:["Won the Outland Trophy and Lombardi Award as the best lineman in the country","Was considered the safest QB prospect since Peyton Manning","Played at Stanford University","Retired suddenly at age 29 due to injuries — shocking the football world"] },
  { player:"Cam Newton", sport:"🏈 NFL", answer:"CAM DRAFT", era:"modern", stats:{PICK:"1",YEAR:"2011",TEAM:"Carolina Panthers",SCHOOL:"Auburn"}, ctx:"2011 NFL Draft — #1 Overall Pick", clues:["Won the Heisman Trophy at Auburn the year before","Won the Heisman Trophy at Auburn the year before","Won the Super Bowl MVP in the 2015 season","Was 6ft 5in and 245 pounds — a new prototype for the QB position"] },
  { player:"Jameis Winston", sport:"🏈 NFL", answer:"WINSTON DRAFT", era:"modern", stats:{PICK:"1",YEAR:"2015",TEAM:"Tampa Bay Buccaneers",SCHOOL:"Florida State"}, ctx:"2015 NFL Draft — #1 Overall Pick", clues:["His career was plagued by inconsistency despite the hype","Won the Heisman Trophy at Florida State","Was a two-sport athlete — also played baseball","Tampa Bay chose him over Marcus Mariota who went #2"] },
  { player:"Carson Wentz", sport:"🏈 NFL", answer:"WENTZ DRAFT", era:"modern", stats:{PICK:"2",YEAR:"2016",TEAM:"Philadelphia Eagles",SCHOOL:"North Dakota State"}, ctx:"2016 NFL Draft — #2 Overall Pick", clues:["Was selected #2 overall by the Philadelphia Eagles","Played at North Dakota State — a small FCS school","Played at North Dakota State — one of only a handful of FCS QBs ever drafted #2","Led the Eagles to an 11-2 record before getting injured — Nick Foles won the Super Bowl"] },
  { player:"Sam Bradford", sport:"🏈 NFL", answer:"BRADFORD DRAFT", era:"modern", stats:{PICK:"1",YEAR:"2010",TEAM:"St. Louis Rams",SCHOOL:"Oklahoma"}, ctx:"2010 NFL Draft — #1 Overall Pick", clues:["Signed the richest rookie contract in history at the time","Won the Heisman Trophy at Oklahoma","Signed the richest rookie contract in history at the time","Had a career plagued by torn ACLs in both knees"] },
  { player:"Baker Mayfield", sport:"🏈 NFL", answer:"MAYFIELD DRAFT", era:"modern", stats:{PICK:"1",YEAR:"2018",TEAM:"Cleveland Browns",SCHOOL:"Oklahoma"}, ctx:"2018 NFL Draft — #1 Overall Pick", clues:["Was known for planting a flag at Ohio State's field after a win","Won the Heisman Trophy at Oklahoma","Was a walk-on at Oklahoma before earning a scholarship","Was known for his brash confidence and flag-planting at Ohio State"] },
  { player:"Kyler Murray", sport:"🏈 NFL", answer:"KYLER DRAFT", era:"modern", stats:{PICK:"1",YEAR:"2019",TEAM:"Arizona Cardinals",SCHOOL:"Oklahoma"}, ctx:"2019 NFL Draft — #1 Overall Pick", clues:["Was only 5ft 10in — the shortest #1 pick in NFL Draft history","Had also been drafted by the Oakland A's in baseball","Won the Heisman Trophy at Oklahoma","Was only 5ft 10in — the shortest #1 pick in NFL Draft history"] },
  { player:"Trevor Lawrence", sport:"🏈 NFL", answer:"TREVOR DRAFT", era:"modern", stats:{PICK:"1",YEAR:"2021",TEAM:"Jacksonville Jaguars",SCHOOL:"Clemson"}, ctx:"2021 NFL Draft — #1 Overall Pick", clues:["Had been called generational since high school","Was considered the most sure-fire QB prospect since Luck","Led Clemson to a national championship","Was referred to as a generational quarterback talent coming out of high school"] },
  { player:"John Elway", sport:"🏈 NFL", answer:"ELWAY DRAFT", era:"classic", stats:{PICK:"1",YEAR:"1983",TEAM:"Baltimore Colts",TRADE:"Denver"}, ctx:"1983 NFL Draft — #1 Overall Pick refused to play for Colts", clues:["The trade sent Elway to Denver in exchange for multiple picks","Threatened to play baseball for the New York Yankees instead","Was traded to the Denver Broncos","The 1983 QB class also included Marino, Kelly, Marino, and Eason"] },
  { player:"Lawrence Taylor", sport:"🏈 NFL", answer:"LT DRAFT", era:"classic", stats:{PICK:"2",YEAR:"1981",TEAM:"New York Giants",SCHOOL:"North Carolina"}, ctx:"1981 NFL Draft — #2 Overall Pick", clues:["Had off-field substance abuse issues that he later wrote about openly in his autobiography","Was considered by many coaches the most unblockable player ever at his position","Played alongside fellow Hall of Famers Harry Carson and Carl Banks","Forced opposing offenses to permanently change how they blocked and protected their quarterbacks"] },
  { player:"Bo Jackson", sport:"🏈 NFL", answer:"BO JACKSON", era:"classic", stats:{PICK:"1",YEAR:"1986",TEAM:"Tampa Bay Buccaneers",REFUSE:"Yes"}, ctx:"1986 NFL Draft — #1 Overall Pick who refused to play", clues:["Was selected #1 by Tampa Bay Buccaneers but refused to play for them","Was declared ineligible for the next draft class","Chose baseball — played for the Kansas City Royals","Was eventually drafted by the Raiders in 1987 and became a legend playing both sports"] },
  { player:"Troy Aikman", sport:"🏈 NFL", answer:"AIKMAN DRAFT", era:"classic", stats:{PICK:"1",YEAR:"1989",TEAM:"Dallas Cowboys",SCHOOL:"UCLA"}, ctx:"1989 NFL Draft — #1 Overall Pick", clues:["Won 3 Super Bowls with Dallas after being picked from a 1-15 team","Played at UCLA after transferring from Oklahoma","Won 3 Super Bowls with the Dallas Cowboys","Was selected by a Cowboys team that went 1-15 the year before"] },
  { player:"Vinny Testaverde", sport:"🏈 NFL", answer:"TESTAVERDE DRAFT", era:"classic", stats:{PICK:"1",YEAR:"1987",TEAM:"Tampa Bay Buccaneers",SCHOOL:"Miami"}, ctx:"1987 NFL Draft — #1 Overall Pick", clues:["Later became a reliable journeyman who played 21 NFL seasons","Won the Heisman Trophy at Miami","Had a very long career spanning 21 seasons","Was considered can't-miss but had an inconsistent career"] },
  { player:"Steve Emtman", sport:"🏈 NFL", answer:"EMTMAN", era:"classic", stats:{PICK:"1",YEAR:"1992",TEAM:"Indianapolis Colts",SCHOOL:"Washington"}, ctx:"1992 NFL Draft — #1 Overall Pick bust", clues:["Injuries destroyed his career — is widely considered the biggest bust at #1 ever","Played at the University of Washington","Had his career devastated by injuries — is considered one of the biggest busts ever","Won the Outland Trophy and Lombardi Award in college"] },
  { player:"Russell Maryland", sport:"🏈 NFL", answer:"MARYLAND DRAFT", era:"classic", stats:{PICK:"1",YEAR:"1991",TEAM:"Dallas Cowboys",SCHOOL:"Miami"}, ctx:"1991 NFL Draft — #1 Overall Pick", clues:["Was considered surprising as a DT going #1 overall","Played defensive tackle at the University of Miami","Won 3 Super Bowls with Dallas","Was considered surprising as a DT going #1"] },
  { player:"Marcus Mariota", sport:"🏈 NFL", answer:"MARIOTA HEISMAN", era:"modern", stats:{YDS:"4454",TD:"42",INT:"2",RTG:"186.0"}, ctx:"2014 Heisman Trophy — University of Oregon", clues:["Threw 42 touchdowns against just 2 interceptions","Had a 42:2 TD to INT ratio","From Honolulu, Hawaii","Went #2 overall in the 2015 NFL Draft"] },
  { player:"Robert Griffin III", sport:"🏈 NFL", answer:"RG3 HEISMAN", era:"modern", stats:{YDS:"4293",TD:"37",INT:"6",RTG:"189.5"}, ctx:"2011 Heisman Trophy — Baylor University", clues:["Was the first Heisman winner in Baylor history","Had a 37:6 TD to INT ratio","Made the Redskins pay a record 3 first-round picks to move up to #2","From Copperas Cove, Texas"] },
  { player:"Lamar Jackson", sport:"🏈 NFL", answer:"LAMAR HEISMAN", era:"modern", stats:{YDS:"3543",TD:"30",RUSH:"1571",RTG:"157.1"}, ctx:"2016 Heisman Trophy — University of Louisville", clues:["His rushing yards as a QB were greater than many running backs","Rushed for 1571 yards as a quarterback","Was considered by some teams as a wide receiver in the NFL Draft","Became the unanimous NFL MVP 3 years later"] },
  { player:"Tim Tebow", sport:"🏈 NFL", answer:"TEBOW HEISMAN", era:"modern", stats:{YDS:"3286",TD:"32",INT:"6",RUSH:"895"}, ctx:"2007 Heisman Trophy — University of Florida", clues:["Led Florida to two national championships","Was known for his faith and unique throwing style","Led Florida to two national championships","Known for his faith and unique throwing style"] },
  { player:"Barry Sanders", sport:"🏈 NFL", answer:"SANDERS HEISMAN", era:"classic", stats:{CAR:"344",YDS:"2628",TD:"39",AVG:"7.6"}, ctx:"1988 Heisman Trophy — Oklahoma State", clues:["Rushed for 2628 yards — one of the greatest individual college seasons ever","Rushed for 2628 yards in a single season","Played at Oklahoma State","Some consider it the greatest individual college football season ever"] },
  { player:"Bo Jackson", sport:"🏈 NFL", answer:"BO HEISMAN", era:"classic", stats:{CAR:"278",YDS:"1786",TD:"17",AVG:"6.4"}, ctx:"1985 Heisman Trophy — Auburn University", clues:["Already known as a two-sport star in college","Was already known as a two-sport star","Tampa Bay selected him #1 overall the following year — he refused to play","From Bessemer, Alabama"] },
  { player:"Cal Ripken Jr.", sport:"⚾ MLB", answer:"RIPKEN STREAK", era:"classic", stats:{STREAK:"2131",DATE:"Sept 6 1995",PREV:"2130",TEAM:"Baltimore"}, ctx:"Sept 6 1995 — Breaking Lou Gehrig's consecutive games record", clues:["Played every single game through knee injuries back problems and near-exhaustion","The Orioles were a model franchise through the 1960s and 70s under manager Earl Weaver","The crowd gave him a 22-minute standing ovation","His streak eventually reached 2632 games"] },
  { player:"Roger Maris", sport:"⚾ MLB", answer:"MARIS HR", era:"legends", stats:{HR:"61",AVG:".269",RBI:"142",YEAR:"1961"}, ctx:"1961 MLB Season — Breaking Babe Ruth's home run record", clues:["Won the AL MVP despite being resented by some fans who felt he was tarnishing a legend","The Yankees have won 27 World Series championships — by far the most of any team","His record stood for 37 years until 1998","Was not celebrated at the time — many wanted Ruth's record to stand"] },
  { player:"Hank Aaron", sport:"⚾ MLB", answer:"AARON 715", era:"classic", stats:{HR:"715",DATE:"April 8 1974",TEAM:"Atlanta",PITCH:"Al Downing"}, ctx:"April 8 1974 — Breaking Babe Ruth's all-time home run record", clues:["Received death threats and needed a bodyguard during his record-breaking chase","Was also an outstanding throwing arm — considered the best ever in right field","Had received death threats leading up to the record","Was still active in baseball as a coach when Barry Bonds eventually surpassed his record"] },
  { player:"Wayne Gretzky", sport:"🏒 NHL", answer:"GRETZKY GORDIE", era:"classic", stats:{GOAL:"802",DATE:"March 23 1994",PREV:"801",TEAM:"Los Angeles"}, ctx:"March 23 1994 — Breaking Gordie Howe's all-time goals record", clues:["His trade from Edmonton to Los Angeles was compared to selling the Eiffel Tower in Canada","Wore number 99 — a number that was eventually retired league-wide by the NHL","Had already broken virtually every other NHL record","Eventually retired with 894 career goals — 93 more than Howe"] },
  { player:"Rickey Henderson", sport:"⚾ MLB", answer:"RICKEY STOLEN", era:"classic", stats:{SB:"939",DATE:"May 1 1991",PREV:"938",TEAM:"Oakland"}, ctx:"May 1 1991 — Breaking Lou Brock's all-time stolen base record", clues:["Was known for his massive batting helmet worn over a distinctive afro hairstyle","The Moneyball A's used statistical analysis to compete with teams that outspent them massively","Famously held the base above his head and said he was the greatest of all time","Eventually retired with 1406 stolen bases"] },
  { player:"Wilt Chamberlain", sport:"🏀 NBA", answer:"WILT 100", era:"legends", stats:{PTS:"100",FG:"36",FT:"28",DATE:"March 2 1962"}, ctx:"March 2 1962 — 100-point game vs New York Knicks", clues:["Scored 100 points in a single NBA game — an untouchable record","Playing for the Philadelphia Warriors","No TV cameras recorded the game — only one photo exists","Made 28 of 32 free throws — extraordinary for him"] },
  { player:"Michael Phelps", sport:"🏊 Olympics", answer:"PHELPS", era:"modern", stats:{GOLD:"8",EVENTS:"8",WORLD:"7",YEAR:"2008"}, ctx:"2008 Beijing Olympics — Greatest Olympic performance ever", clues:["Won 8 gold medals in a single Olympics — an all-time record","Set 7 world records during the Games","Swam in Beijing, China","His 8 golds broke Mark Spitz's 36-year-old record of 7"] },
  { player:"Usain Bolt", sport:"🏃 Olympics", answer:"BOLT", era:"modern", stats:{TIME:"9.58",EVENT:"100m",YEAR:"2009",WIND:"+0.9"}, ctx:"2009 World Championships — 100m world record", clues:["Set the world record for the 100m sprint at 9.58 seconds","Won at the World Championships in Berlin","From Trelawny Parish, Jamaica","Also holds the 200m world record at 19.19 seconds"] },
  { player:"Jesse Owens", sport:"🏃 Olympics", answer:"OWENS", era:"legends", stats:{GOLD:"4",EVENTS:"4",YEAR:"1936",CITY:"Berlin"}, ctx:"1936 Berlin Olympics — Four gold medals", clues:["Won 4 gold medals at the Berlin Olympics under Hitler's watch","Won the 100m, 200m, long jump, and 4x100m relay","From Oakville, Alabama","His performance was a direct rebuke to Nazi racial ideology"] },
  { player:"Simone Biles", sport:"🤸 Olympics", answer:"BILES", era:"modern", stats:{GOLD:"4",MEDALS:"4",YEAR:"2016",COUNTRY:"USA"}, ctx:"2016 Rio Olympics — Four gold medals in gymnastics", clues:["Won 4 gold medals at the 2016 Rio Olympics","Is widely considered the greatest gymnast ever","From Spring, Texas","Has skills named after her in the gymnastics code of points"] },
  { player:"Carl Lewis", sport:"🏃 Olympics", answer:"CARL LEWIS", era:"classic", stats:{GOLD:"4",EVENTS:"4",YEAR:"1984",CITY:"Los Angeles"}, ctx:"1984 Los Angeles Olympics — Four gold medals", clues:["Was also an All-American long jumper who set a world record that stood for over a decade","Won the 100m, 200m, long jump, and 4x100m relay","From Birmingham, Alabama","Was compared to Jesse Owens for his historic performance"] },
  { player:"Kobe Bryant", sport:"🏀 NBA", answer:"KOBE 81", era:"modern", stats:{PTS:"81",FG:"28",FT:"18",MIN:"42"}, ctx:"Jan 22 2006 — 81-point game vs Toronto Raptors", clues:["Scored 81 points — 2nd highest single-game total in NBA history","Playing for the LA Lakers vs Toronto Raptors","Scored 55 points in the second half alone","Only Wilt Chamberlain's 100-point game ranks higher"] },
  { player:"Nate Archibald", sport:"🏀 NBA", answer:"NATE ARCHIBALD", era:"classic", stats:{PTS:"34.0",AST:"11.4",YEAR:"1973",FEAT:"Only player to lead in both"}, ctx:"1972-73 NBA Season — Only player to lead NBA in scoring AND assists", clues:["Overcame a difficult childhood in the South Bronx to become an NBA star","Averaged 34.0 points per game during this season","Nicknamed Tiny because he was only 6 feet tall","Later won an NBA championship with the Boston Celtics"] },
  { player:"Patrick Mahomes", sport:"🏈 NFL", answer:"MAHOMES SB55", era:"modern", stats:{YDS:"270",TD:"3",INT:"2",COMP:"50.0"}, ctx:"Super Bowl LV — Tampa Bay Buccaneers vs Kansas City Chiefs", clues:["His team lost this Super Bowl despite being heavy favorites","Was sacked 3 times and pressured all game","Lost to the Tampa Bay Buccaneers and Tom Brady","Brady's 7th Super Bowl ring — Mahomes' first loss in the big game"] },
  { player:"Joe Montana", sport:"🏈 NFL", answer:"MONTANA DRIVE", era:"classic", stats:{YDS:"92",PLAYS:"11",TIME:"3:10",TD:"1"}, ctx:"Super Bowl XXIII — The Drive to win the championship", clues:["Led a 92-yard drive in the final 3 minutes to win the Super Bowl","The final play was a pass to John Taylor with 34 seconds left","Was known for the West Coast offense which he helped pioneer","Famously noticed John Candy in the stands to calm his team before the drive"] },
  { player:"David Tyree", sport:"🏈 NFL", answer:"TYREE HELMET", era:"modern", stats:{REC:"1",YDS:"32",HELMET_CATCH:"vs Giants",GAME:"SB XLII"}, ctx:"Super Bowl XLII — The Helmet Catch", clues:["Made the most improbable catch in Super Bowl history — pinning the ball against his helmet","Accumulated 32 yards during this historic season","The catch set up the winning touchdown to upset the undefeated Patriots","Only had 4 career NFL receptions — this was his most famous"] },
  { player:"Byron Nelson", sport:"⛳ Golf", answer:"NELSON STREAK", era:"legends", stats:{STREAK:"11",WINS:"18",YEAR:"1945",EVENTS:"30"}, ctx:"1945 PGA Tour — 11 consecutive tournament wins", clues:["Won 11 consecutive PGA Tour events — an all-time record","Won 18 tournaments total this year — also an all-time record","The streak has lasted over 75 years","Played during WWII era when some top players were serving"] },
  { player:"Joe DiMaggio", sport:"⚾ MLB", answer:"DIMAGGIO STREAK", era:"legends", stats:{STREAK:"56",HITS:"91",AVG:".408",YEAR:"1941"}, ctx:"1941 MLB Season — 56-game hitting streak", clues:["Hit safely in 56 consecutive games — the all-time MLB record","The Yankees have won 27 World Series championships — by far the most of any team","The streak lasted from May 15 to July 17, 1941","He hit .408 with 91 hits during the streak"] },
  { player:"Gale Sayers", sport:"🏈 NFL", answer:"SAYERS 6TD", era:"legends", stats:{TD:"6",YDS:"336",DATE:"Dec 12 1965",OPP:"San Francisco"}, ctx:"Dec 12 1965 — 6 touchdowns in one game", clues:["Scored 6 touchdowns in a single NFL game","From Wichita Kansas — scored 22 touchdowns as a rookie — the most in NFL history at the time","Tied the single-game TD record","His performance came on a muddy field vs the San Francisco 49ers"] },
  { player:"Wilt Chamberlain", sport:"🏀 NBA", answer:"WILT STREAK", era:"legends", stats:{STREAK:"47",FG_CONSEC:"35",YEAR:"1967",TEAM:"Philadelphia"}, ctx:"1966-67 NBA Season — 47 consecutive field goals made", clues:["Was supposedly paid $1 million per game to play for the Harlem Globetrotters","The 76ers embraced The Process — one of the most deliberate rebuilds in sports history","His team went 68-13 that year — then an NBA record","The FG record has never been broken"] },
  { player:"Ben Hogan", sport:"⛳ Golf", answer:"HOGAN COMEBACK", era:"legends", stats:{WINS:"5",MAJORS:"3",YEAR:"1953",ACCIDENT:"1949"}, ctx:"1953 PGA Tour — Comeback from near-fatal car accident", clues:["Won 5 tournaments including 3 majors just 4 years after a nearly fatal car accident","Was told he might never walk again after a bus hit his car in 1949","Won the US Open, Masters, and British Open in one year","The British Open win completed his career Grand Slam"] },
  { player:"Tiger Woods", sport:"⛳ Golf", answer:"TIGER MASTERS 2019", era:"modern", stats:{SCORE:"-13",MAJORS:"15",YEAR:"2019",LAST:"2008"}, ctx:"2019 Masters — Comeback major win after 11 years", clues:["Won his 15th major after an 11-year major drought","Had multiple back surgeries and personal scandals in between","Won The Masters at Augusta","The comeback was called one of the greatest in sports history"] },
  { player:"Lance Armstrong", sport:"🚴 Olympics", answer:"ARMSTRONG TDF", era:"classic", stats:{WINS:"7",YEARS:"1999-2005",CANCER:"1996",STRIPPED:"Yes"}, ctx:"1999-2005 Tour de France — Seven consecutive wins (later stripped)", clues:["Won the Tour de France 7 consecutive times","Had survived testicular cancer that spread to his brain and lungs in 1996","Was later stripped of all 7 titles for doping","His story was considered one of sport's greatest comebacks before the scandal"] },
  { player:"Roger Federer", sport:"🎾 ATP", answer:"FEDERER EPIC", era:"modern", stats:{SET1:"4-6",SET2:"6-4",SET3:"6-7",SET4_5:"7-6 / 9-7"}, ctx:"2008 Wimbledon Final — vs Rafael Nadal", clues:["Lost to Rafael Nadal in what is called the greatest tennis match ever played","The 5th set was 9-7 as darkness nearly stopped play","Federer had won Wimbledon the 5 previous years","Sports Illustrated called it the greatest match in the history of any sport"] },
  { player:"Larry Bird", sport:"🏀 NBA", answer:"BIRD 3PT CONTEST", era:"classic", stats:{MADE:"9",CONTEST:"1986",TROPHY:"1st",SAID:"Which one of you is finishing second?"}, ctx:"1986 NBA Three-Point Contest — All-Star Weekend", clues:["Won the first NBA Three-Point Contest","Walked into the locker room before the event and asked 'which one of you is finishing second?'","The Celtics have the most NBA championships in history with 17 total","Won the Three-Point Contest 3 consecutive times (1986-1988)"] },
  { player:"Michael Jordan", sport:"🏀 NBA", answer:"JORDAN FLU", era:"classic", stats:{PTS:"38",FG:"13",REB:"7",AST:"5"}, ctx:"1997 NBA Finals Game 5 — The Flu Game", clues:["Scored 38 points while visibly ill and dehydrated","Was the cornerstone of the dynasty that won 6 championships in the 1990s","Was so sick teammates had to hold him up after the game","Hit the go-ahead three-pointer late in the 4th quarter to seal the win"] },
  { player:"Kirk Gibson", sport:"⚾ MLB", answer:"GIBSON HR", era:"classic", stats:{PH:"1",HR:"1",COUNT:"3-2",OUT:"2"}, ctx:"1988 World Series Game 1 — Pinch hit walk-off home run", clues:["Was so physically damaged entering that World Series game he could barely walk to the plate","Could barely walk to the plate","Pumped his fist around the bases in one of sports most iconic moments","The Dodgers moved from Brooklyn to Los Angeles in 1958 breaking New York hearts"] },
  { player:"Willis Reed", sport:"🏀 NBA", answer:"REED GAME7", era:"classic", stats:{PTS:"4",REB:"3",MIN:"27",GAME:"G7"}, ctx:"1970 NBA Finals Game 7 — Limping onto the court", clues:["Limped onto the court with a torn thigh muscle to play in Game 7","His mere presence inspired the Knicks to win the championship","Only scored 4 points but his presence changed the game","The moment is considered one of the most emotional in NBA history"] },
  { player:"Peyton Manning", sport:"🏈 NFL", answer:"MANNING RECORD TDS", era:"modern", stats:{TD:"55",YDS:"5477",INT:"10",YEAR:"2013"}, ctx:"2013 NFL Season — Broke Tom Brady's single season TD record", clues:["Spent the entirety of his career with the Indianapolis Colts and Denver Broncos","The record stood for 11 years until Mahomes tied it","Playing in Mile High altitude in Denver gives the home team a real physiological edge","Won the NFL MVP award for the 5th time"] },
  { player:"Stephen Curry", sport:"🏀 NBA", answer:"CURRY 3S", era:"modern", stats:{"3PM":"402","3PA":"887","3PCT":"45.4",YEAR:"2015"}, ctx:"2015-16 NBA Season — Unanimous MVP and 3-point record", clues:["Made 402 three-pointers — shattering his own record of 286","Won the unanimous MVP award — first in NBA history","This performance took place during the 2015 NBA season","His team went 73-9 — the best record in NBA history at the time"] },
  { player:"LeBron James", sport:"🏀 NBA", answer:"LEBRON SCORING", era:"modern", stats:{PTS:"38390",DATE:"Feb 7 2023",PREV:"38387",AGE:"38"}, ctx:"Feb 7 2023 — Breaking Kareem Abdul-Jabbar's all-time scoring record", clues:["Became the first player in NBA history to score 40,000 career points","Was 38 years old when he set the record","The Lakers have won more NBA championships than almost any other team","Kareem was present courtside when the record was broken"] },
  { player:"Isiah Thomas", sport:"🏀 NBA", answer:"ISIAH THOMAS", era:"classic", stats:{PTS:"19.2",AST:"9.3",REB:"3.6",TITLES:"2"}, ctx:"1989-90 NBA Season — Detroit Pistons back-to-back champion", clues:["Was known as a dirty player by opponents but as the ultimate competitor by teammates","Led the Bad Boys Pistons as point guard","Was a 2x NBA champion and Finals MVP","From Chicago Illinois — grew up in extreme poverty"] },
  { player:"Elgin Baylor", sport:"🏀 NBA", answer:"ELGIN BAYLOR", era:"legends", stats:{PTS:"27.4",REB:"13.5",AST:"4.3",ALLSTAR:"11"}, ctx:"Career Totals — Los Angeles Lakers legend who never won a title", clues:["Was an 11x All-Star who never won an NBA championship","The Lakers have won more NBA championships than almost any other team","Was known for his graceful mid-air moves years before anyone had a name for them","Retired 9 games before his team finally won the title"] },
  { player:"Albert Pujols", sport:"⚾ MLB", answer:"ALBERT PUJOLS", era:"modern", stats:{HR:"49",RBI:"137",AVG:".359",OPS:"1.106"}, ctx:"Best Season — 2006 St. Louis Cardinals NL MVP", clues:["Won the NL MVP this year with the Cardinals","Hit 49 home runs with a .359 batting average","Was considered the best hitter in baseball at the time","From Santo Domingo Dominican Republic"] },
  { player:"Ryan Howard", sport:"⚾ MLB", answer:"RYAN HOWARD", era:"modern", stats:{HR:"58",RBI:"149",AVG:".313",SO:"181"}, ctx:"Best Season — 2006 Philadelphia Phillies NL MVP", clues:["Won the NL MVP leading the NL in home runs with 58","Was a massive left-handed power hitter","Won the World Series with the Phillies in 2008","From St. Louis Missouri"] },
  { player:"Prince Fielder", sport:"⚾ MLB", answer:"PRINCE FIELDER", era:"modern", stats:{HR:"50",RBI:"119",AVG:".288",OBP:".395"}, ctx:"2007 MLB Season — Milwaukee Brewers 50 HR season at age 23", clues:["Hit 50 home runs for the Milwaukee Brewers at age 23","Son of former MLB slugger Cecil Fielder","Was a vegetarian despite his powerful build","Had one of the most feared left-handed swings of his era"] },
  { player:"Carlos Beltran", sport:"⚾ MLB", answer:"CARLOS BELTRAN", era:"modern", stats:{HR:"38",RBI:"116",AVG:".275",SB:"42"}, ctx:"2004 MLB Season — Kansas City Royals 5-tool All-Star", clues:["Was a 5-tool player who hit for power average and speed","Switch hitter from Manati Puerto Rico","Was one of the best postseason performers in baseball history","Later became a manager for the New York Mets"] },
  { player:"Chase Utley", sport:"⚾ MLB", answer:"CHASE UTLEY", era:"modern", stats:{HR:"32",RBI:"102",AVG:".332",SB:"15"}, ctx:"Best Season — 2006 Philadelphia Phillies All-Star second baseman", clues:["Was considered one of the best second basemen of his era","The Phillies won the World Series in 2008 ending a 28-year championship drought","Won the World Series with the Phillies in 2008","Was known for his hard-nosed play"] },
  { player:"Jose Reyes", sport:"⚾ MLB", answer:"JOSE REYES", era:"modern", stats:{AVG:".337",SB:"39",HITS:"181",TRIPLES:"16"}, ctx:"Best Season — 2011 New York Mets batting title", clues:["Won the NL batting title this season","Led the NL in triples with 16","Was one of the most exciting leadoff hitters of his era","From Villa Gonzalez Dominican Republic"] },
  { player:"Matt Holliday", sport:"⚾ MLB", answer:"MATT HOLLIDAY", era:"modern", stats:{HR:"36",RBI:"137",AVG:".340",OPS:"1.014"}, ctx:"Best Season — 2007 Colorado Rockies NL RBI leader", clues:["Led the NL in RBI and had a .340 average","Coors Field altitude causes the ball to travel significantly farther than any other ballpark","Was a powerful left fielder from Stillwater Oklahoma","Was traded to Oakland then St. Louis in subsequent years"] },
  { player:"David Wright", sport:"⚾ MLB", answer:"DAVID WRIGHT", era:"modern", stats:{HR:"30",RBI:"107",AVG:".325",SB:"20"}, ctx:"2007 MLB Season — New York Mets franchise cornerstone", clues:["Was the third baseman of the Mets through some of their darkest years of losing","An excellent all-around third baseman","From Norfolk Virginia","Had his career shortened by spinal stenosis"] },
  { player:"Karim Benzema", sport:"⚽ Soccer", answer:"KARIM BENZEMA", era:"modern", stats:{G:"44",AST:"15",APP:"46",BALLON:"2022"}, ctx:"Best Season — 2021-22 Real Madrid Ballon d Or champion", clues:["Won the Ballon d Or in 2022","Won the Champions League with Real Madrid this season","From Lyon France","Was banned from the French national team for years before returning"] },
  { player:"Gianluigi Buffon", sport:"⚽ Soccer", answer:"GIANLUIGI BUFFON", era:"modern", stats:{CS:"22",APP:"38",SERIE_A:"8",WC:"2006"}, ctx:"Career Totals — Juventus and Italy greatest goalkeeper", clues:["Won the World Cup with Italy in 2006","Was the best goalkeeper in the world for over a decade","From Carrara Italy","Won 8 Serie A titles with Juventus"] },
  { player:"Andres Iniesta", sport:"⚽ Soccer", answer:"INIESTA", era:"modern", stats:{G:"9",AST:"14",APP:"36",GOAL:"WC Final winner"}, ctx:"Best Season — 2009-10 World Cup winner and Champions League", clues:["Scored the winning goal in the World Cup Final for Spain","Barcelona is owned by its members — a cooperative with over 150000 supporter-owners","From Fuentealbilla Spain","Was named Player of the Tournament at the 2010 World Cup"] },
  { player:"Luka Modric", sport:"⚽ Soccer", answer:"MODRIC", era:"modern", stats:{G:"10",AST:"11",APP:"36",BALLON:"2018"}, ctx:"Best Season — 2017-18 ended Messi-Ronaldo era", clues:["Won the Ballon d Or in 2018 ending the Messi-Ronaldo decade","Led Croatia to the World Cup Final","From Zadar Croatia","Won 5 Champions Leagues with Real Madrid"] },
  { player:"Robert Lewandowski", sport:"⚽ Soccer", answer:"ROBERT LEWANDOWSKI", era:"modern", stats:{G:"41",AST:"9",APP:"37",RECORD:"broke Muller"}, ctx:"Best Season — 2020-21 Bundesliga broke 49-year record", clues:["Broke Gerd Mullers 49-year Bundesliga goal record with 41","Won the Bundesliga Golden Boot this season","From Warsaw Poland","Won the Champions League with Bayern Munich in 2020"] },
  { player:"Gareth Bale", sport:"⚽ Soccer", answer:"GARETH BALE", era:"modern", stats:{G:"16",AST:"11",APP:"36",FEE:"100M"}, ctx:"2012-13 La Liga Season — Worlds then most expensive player", clues:["Was the most expensive player in history when Real Madrid bought him","Real Madrid have won the most UEFA Champions League titles of any club in history","From Cardiff Wales","Won 4 Champions Leagues with Real Madrid"] },
  { player:"Mohamed Salah", sport:"⚽ Soccer", answer:"MOHAMED SALAH", era:"modern", stats:{G:"32",AST:"12",APP:"38",RECORD:"PL record at time"}, ctx:"Best Season — 2017-18 Premier League record Golden Boot", clues:["Scored a hat trick in a single half against Arsenal — one of the fastest ever in the Premier League","Liverpool have won 6 European Cups — more than any other English club","From Nagrig Egypt","Won the Champions League with Liverpool in 2019"] },
  { player:"Kevin De Bruyne", sport:"⚽ Soccer", answer:"DE BRUYNE_2", era:"modern", stats:{G:"6",AST:"21",APP:"35",RECORD:"tied PL assists"}, ctx:"Best Season — 2019-20 tied Premier League assists record", clues:["Has won more Man of the Match awards in a single Premier League season than any other player","From Ghent Belgium — is considered the greatest Belgian footballer of all time","From Drongen Belgium","Was considered the best midfielder in the Premier League for years"] },
  { player:"Antoine Griezmann", sport:"⚽ Soccer", answer:"ANTOINE GRIEZMANN", era:"modern", stats:{G:"4",AST:"2",APP:"7",WC:"winner"}, ctx:"2018 FIFA World Cup — France champion", clues:["Won the World Cup with France","Won the Golden Boot at Euro 2016","From Macon France","Barcelona is owned by its members — a cooperative with over 150000 supporter-owners"] },
  { player:"Thierry Henry", sport:"⚽ Soccer", answer:"THIERRY HENRY", era:"modern", stats:{G:"30",APP:"37",YEAR:"2004",INV:"Arsenal Invincibles"}, ctx:"Best Season — 2003-04 Arsenal Invincibles unbeaten season", clues:["Was converted from a winger to a striker by Arsene Wenger at Arsenal","Won PFA Players Player of the Year twice consecutively","French striker considered arguably the best in Premier League history","From Les Ulis France"] },
  { player:"Marco van Basten", sport:"⚽ Soccer", answer:"MARCO VAN BASTEN", era:"classic", stats:{BALLON:"3",G:"19",APP:"26",EURO:"1988"}, ctx:"Career Totals — Netherlands and AC Milan dominant striker", clues:["Won 3 Ballon d Or awards in his career","Won Euro 88 with Netherlands scoring a stunning volley in the final","AC Milan have won the European Cup 7 times — second only to Real Madrid all-time","Had his career ended prematurely by severe ankle injuries"] },
  { player:"Dennis Bergkamp", sport:"⚽ Soccer", answer:"DENNIS BERGKAMP", era:"classic", stats:{G:"87",AST:"94",APP:"315",FLYING:"no"}, ctx:"Career Totals — Arsenal and Netherlands attacking legend", clues:["Was known as The Non-Flying Dutchman because he refused to fly","Arsenal went an entire league season unbeaten in 2003-04 — becoming The Invincibles","Won the Dutch league title at Ajax and the FA Cup with Arsenal","From Amsterdam Netherlands"] },
  { player:"Paolo Maldini", sport:"⚽ Soccer", answer:"PAOLO MALDINI", era:"classic", stats:{APP:"902",G:"7",STANLEY_CUPS:"5",SERIE_A:"7"}, ctx:"Career Totals — AC Milan greatest defender ever", clues:["Is considered the greatest defender in football history by many","Played his entire career for AC Milan — 902 appearances","Never won a World Cup despite reaching the final in 1994","From Milan Italy — son of former AC Milan captain Cesare Maldini"] },
  { player:"Raul Gonzalez", sport:"⚽ Soccer", answer:"RAUL GONZALEZ", era:"classic", stats:{G:"323",APP:"741",UCL:"3",NO7:"before Ronaldo"}, ctx:"Career Totals — Real Madrid greatest legend", clues:["Was Real Madrid all-time top scorer for many years","Won 3 Champions Leagues with Real Madrid","From Madrid Spain","Wore the famous number 7 shirt before Cristiano Ronaldo took it"] },
  { player:"Gabriel Batistuta", sport:"⚽ Soccer", answer:"BATISTUTA", era:"classic", stats:{G:"54",APP:"78",COUNTRY:"Argentina",NICK:"Batigol"}, ctx:"Career Totals — Argentina all-time top scorer", clues:["Was nicknamed Batigol and had a stunning left foot that could hit shots from anywhere","Fiorentina are one of Italy's most beloved clubs despite never winning the European Cup","From Reconquista Argentina","Nicknamed Batigol for his prolific goal-scoring"] },
  { player:"Zinedine Zidane", sport:"⚽ Soccer", answer:"ZINEDINE ZIDANE", era:"classic", stats:{BALLON:"3",WC:"1",EURO:"1",HEADBUTT:"2006"}, ctx:"Career Totals — France greatest player", clues:["Won 3 Ballon d Or awards in his career","Won the World Cup and European Championship with France","From Marseille France of Algerian descent","Famous for his headbutt on Materazzi in the 2006 World Cup Final"] },
  { player:"Alessandro Del Piero", sport:"⚽ Soccer", answer:"ALESSANDRO DEL PIERO", era:"classic", stats:{G:"290",APP:"705",UCL:"1",WC:"1"}, ctx:"Career Totals — Juventus all-time top scorer", clues:["Won the Champions League with Juventus in 1996","Won the World Cup with Italy in 2006","Played almost his entire career for Juventus","From Conegliano Italy"] },
  { player:"Ryan Giggs", sport:"⚽ Soccer", answer:"RYAN GIGGS", era:"classic", stats:{G:"168",AST:"271",APP:"963",TITLES:"13"}, ctx:"Career Totals — Manchester United most decorated player ever", clues:["Won 13 Premier League titles with Manchester United","Scored one of the greatest individual FA Cup goals ever vs Arsenal in 1999","From Cardiff Wales","Was the only player to play in every single Premier League season for many years"] },
  { player:"Roy Keane", sport:"⚽ Soccer", answer:"ROY KEANE", era:"classic", stats:{G:"33",APP:"480",TREBLE:"1999",NATION:"Ireland"}, ctx:"Career Totals — Manchester United captain who won the Treble", clues:["His autobiography is considered the most brutally honest book ever written by a footballer","Was sent off in the Champions League semi-final so missed the Final","From Cork Ireland","Is considered one of the greatest and most combative midfielders ever"] },
  { player:"Bobby Moore", sport:"⚽ Soccer", answer:"BOBBY MOORE", era:"legends", stats:{APP:"108",WC:"1",YEAR:"1966",CAPS:"108"}, ctx:"Career Totals — England World Cup winning captain", clues:["Captained England to their only World Cup victory in 1966","Was named the best player of the 1966 World Cup","West Ham produced Bobby Moore Geoff Hurst and Martin Peters — the core of England's 1966 World Cup winning team","Was known for his supreme composure and reading of the game"] },
  { player:"Stan Wawrinka", sport:"🎾 ATP", answer:"STAN WAWRINKA", era:"modern", stats:{GRAND_SLAMS:"3",TITLES:"16",BEST_RANK:"3",YEAR:"2015"}, ctx:"Career Totals — Swiss champion with 3 different Grand Slams", clues:["Won 3 Grand Slam titles — Australian French and US Opens","Had a career peak ranking of World No. 3","From Lausanne Switzerland","Was often overshadowed by Federer but carved his own great legacy"] },
  { player:"Juan Martin del Potro", sport:"🎾 ATP", answer:"JUAN MARTIN DEL POTRO", era:"modern", stats:{W:"1",GRAND_SLAMS:"1",YEAR:"2009",BEAT:"Federer AND Nadal"}, ctx:"Best Season — 2009 US Open beat both Federer and Nadal", clues:["Was 6ft 6in and had the most powerful serve of any player in the tournament that year","From Tandil Argentina","Had his career repeatedly hampered by wrist injuries","Won Olympic silver for Argentina in 2016"] },
  { player:"Marin Cilic", sport:"🎾 ATP", answer:"MARIN CILIC", era:"modern", stats:{W:"1",GRAND_SLAMS:"1",YEAR:"2014",SETS_LOST:"1"}, ctx:"2014 US Open — Dominant Croatian champion", clues:["Won the US Open dropping only one set throughout the entire tournament","From Medjugorje Bosnia and Croatia","Was coached by Goran Ivanisevic at the time of his win","Is the only Croatian man to win a Grand Slam singles title"] },
  { player:"Andy Roddick", sport:"🎾 ATP", answer:"ANDY RODDICK", era:"modern", stats:{W:"1",GRAND_SLAMS:"1",WORLD_NO1:"Yes",SERVE:"155mph"}, ctx:"Best Season — 2003 US Open champion and World No. 1", clues:["Won the US Open and reached World No. 1 this year","Had the fastest serve in history at the time at 155 mph","From Omaha Nebraska","Was the last American man to win a Grand Slam singles title for many years"] },
  { player:"Lleyton Hewitt", sport:"🎾 ATP", answer:"LLEYTON HEWITT", era:"modern", stats:{GRAND_SLAMS:"2",WORLD_NO1:"Yes",WEEKS:"80",COMEON:"celebration"}, ctx:"Career Totals — Australian World No. 1 fighter", clues:["Spent 80 weeks at World No. 1","Won the US Open in 2001 and Wimbledon in 2002","From Adelaide South Australia","Was known for his intense competitiveness and Come On celebration"] },
  { player:"Gustavo Kuerten", sport:"🎾 ATP", answer:"GUSTAVO KUERTEN", era:"modern", stats:{GRAND_SLAMS:"3",WORLD_NO1:"Yes",CLAY:"Roland Garros x3",YEAR:"2000"}, ctx:"Career Totals — Brazilian Roland Garros king", clues:["Won Roland Garros 3 times in his career","Reached World No. 1 in 2000","From Florianopolis Brazil","Nicknamed Guga and was beloved by French crowds who adored him"] },
  { player:"Thomas Muster", sport:"🎾 ATP", answer:"THOMAS MUSTER", era:"classic", stats:{W:"1",GRAND_SLAMS:"1",CLAY:"45 titles",COMEBACK:"Yes"}, ctx:"Best Season — 1995 French Open champion comeback story", clues:["Won the French Open and became World No. 1 in 1995","Won 45 clay court titles in his entire career","From Leibnitz Austria","Came back from a shattered knee hit by a drunk driver to win a Grand Slam"] },
  { player:"Yevgeny Kafelnikov", sport:"🎾 ATP", answer:"YEVGENY KAFELNIKOV", era:"modern", stats:{GRAND_SLAMS:"2",WORLD_NO1:"Yes",YEAR:"1999",FIRST:"Russian No 1"}, ctx:"Career Totals — First Russian World No. 1", clues:["Won 2 Grand Slam titles and reached World No. 1","Won the French Open in 1996 and Australian Open in 1999","From Sochi Russia","Was the first Russian man to win a Grand Slam singles title"] },
  { player:"Michael Chang", sport:"🎾 ATP", answer:"MICHAEL CHANG", era:"classic", stats:{W:"1",GRAND_SLAMS:"1",AGE:"17",CRAMP:"vs Lendl"}, ctx:"Best Season — 1989 French Open youngest ever champion", clues:["Famously served underhand during a match to conserve energy while suffering from severe cramps","American player of Chinese descent","Beat Lendl in a famous match while cramping and used an underarm serve","Was a deeply religious player who thanked God after his wins"] },
  { player:"Carlos Moya", sport:"🎾 ATP", answer:"CARLOS MOYA", era:"classic", stats:{W:"1",GRAND_SLAMS:"1",WORLD_NO1:"Yes",YEAR:"1998"}, ctx:"1998 French Open — First Spanish World No. 1", clues:["Helped spark a golden era for Spanish tennis that produced Nadal and Ferrer","From Palma de Mallorca Spain","Was a huge star in Spain who helped inspire a generation","Later became Rafael Nadals personal coach"] },
  { player:"Jim Courier", sport:"🎾 ATP", answer:"JIM COURIER", era:"classic", stats:{GRAND_SLAMS:"4",WORLD_NO1:"Yes",WEEKS:"58",YEAR:"1992"}, ctx:"Career Totals — American World No. 1 with 4 Grand Slams", clues:["Won 4 Grand Slam titles spending 58 weeks at World No. 1","Won the French Open and Australian Open twice each","From Sanford Florida","Was known for his powerful baseline game and extraordinary fitness"] },
  { player:"Monica Seles", sport:"🎾 WTA", answer:"MONICA SELES", era:"classic", stats:{GRAND_SLAMS:"9",WORLD_NO1:"Yes",YEAR:"1991",STABBED:"1993"}, ctx:"Career Totals — Yugoslav-American dominant champion", clues:["Won 9 Grand Slam titles before age 20","Was ranked World No. 1 when she was stabbed by a spectator in 1993","From Novi Sad Yugoslavia later representing USA","Was known for her double-handed groundstrokes and grunting"] },
  { player:"Pat Cash", sport:"🎾 ATP", answer:"PAT CASH", era:"classic", stats:{W:"1",GRAND_SLAMS:"1",YEAR:"1987",CLIMB:"stands"}, ctx:"1987 Wimbledon — Australian champion climbs into the stands", clues:["Won Wimbledon for his only Grand Slam title","Famously climbed into the stands to celebrate with his family and coach","From Melbourne Australia","Was known for his all-court aggressive game and headband"] },
  { player:"Michael Stich", sport:"🎾 ATP", answer:"MICHAEL STICH", era:"classic", stats:{W:"1",GRAND_SLAMS:"1",YEAR:"1991",OPPONENT:"Becker"}, ctx:"1991 Wimbledon — German champion beats compatriot Becker", clues:["Won Wimbledon beating fellow German Boris Becker in the final","Was always overshadowed by Becker in Germany despite his Grand Slam","From Elmshorn West Germany","Won Olympic gold in doubles that same year"] },
  { player:"Goran Ivanisevic", sport:"🎾 ATP", answer:"GORAN IVANISEVIC", era:"modern", stats:{W:"1",GRAND_SLAMS:"1",YEAR:"2001",RANK:"125"}, ctx:"2001 Wimbledon — Wildcard winner from World No. 125", clues:["Won Wimbledon as a wildcard ranked No. 125 in the world","Was the first and only wildcard entry to win Wimbledon","From Split Croatia","Had a famous alternate personality Goran who played aggressively"] },
  { player:"Arantxa Sanchez Vicario", sport:"🎾 WTA", answer:"ARANTXA SANCHEZ VICARIO", era:"classic", stats:{GRAND_SLAMS:"4",WORLD_NO1:"Yes",FRENCH:"3",NICK:"Bumblebee"}, ctx:"Career Totals — Spanish champion nicknamed the Bumblebee", clues:["Won 4 Grand Slam singles titles","Was ranked World No. 1 on two occasions","From Barcelona Spain","Was nicknamed The Barcelona Bumblebee for her tireless retrieving"] },
  { player:"Steffi Graf", sport:"🎾 WTA", answer:"STEFFI GRAF_2", era:"classic", stats:{GRAND_SLAMS:"22",WEEKS:"377",YEAR:"1988",SLAM:"Golden Grand Slam"}, ctx:"Career Totals — German greatest champion with 22 Grand Slams", clues:["Won 22 Grand Slam singles titles — second most in the Open Era","Won the Golden Grand Slam in 1988 — all 4 slams plus Olympic gold","From Mannheim West Germany","Spent 377 weeks at World No. 1 — the most in history"] },
  { player:"Martina Navratilova", sport:"🎾 WTA", answer:"MARTINA NAVRATILOVA", era:"classic", stats:{GRAND_SLAMS:"18",WIMBLEDON:"9x winner",WORLD_NO1:"Yes",TITLES:"167"}, ctx:"Career Totals — Czech-American serve and volley legend", clues:["Won 18 Grand Slam singles titles and 167 career titles total","Won Wimbledon 9 times — the most in the Open Era","From Prague Czechoslovakia who later represented USA","Was known for her serve and volley game and legendary fitness"] },
  { player:"Billie Jean King", sport:"🎾 WTA", answer:"BILLIE JEAN KING_2", era:"legends", stats:{GRAND_SLAMS:"39 (all)",WIMBLEDON:"6x winner",YEAR:"1973",BATTLE:"Beat Riggs"}, ctx:"Career Totals — American champion and pioneer", clues:["Won 39 Grand Slam titles including singles doubles and mixed","Beat Bobby Riggs in the famous Battle of the Sexes match in 1973","Was a leading advocate for equal prize money in tennis","From Long Beach California"] },
  { player:"Arthur Ashe", sport:"🎾 ATP", answer:"ARTHUR ASHE", era:"classic", stats:{GRAND_SLAMS:"3",WIMBLEDON:"1x winner",YEAR:"1975",FIRST:"Black Wimbledon winner"}, ctx:"1975 Wimbledon — Historic American champion", clues:["Became the first Black man to win Wimbledon in 1975","Won 3 Grand Slam singles titles in his career","Was a civil rights activist and social justice pioneer","Died from AIDS-related complications in 1993"] },
  { player:"Jonathan Quick", sport:"🏒 NHL", answer:"JONATHAN QUICK", era:"modern", stats:{GAA:"1.41","SV%":".946",W:"16",TEAM:"Kings"}, ctx:"Best Season — 2012 Stanley Cup Playoffs MVP performance", clues:["Won the Conn Smythe Trophy as playoff MVP with a 1.41 GAA","Led the LA Kings to their first Stanley Cup championship","From Milford Connecticut","Was one of the best big-game goalies of his generation"] },
  { player:"Henrik Lundqvist", sport:"🏒 NHL", answer:"HENRIK LUNDQVIST", era:"modern", stats:{GAA:"2.18","SV%":".921",W:"30",TEAM:"Rangers"}, ctx:"Best Season — 2011-12 New York Rangers Vezina winner", clues:["Won the Vezina Trophy as the best goaltender in the NHL","The Rangers ended a 54-year championship drought when they won the Cup in 1994","From Are Sweden — nicknamed The King","Won Olympic gold with Sweden in 2006"] },
  { player:"Corey Kluber", sport:"⚾ MLB", answer:"KLUBER", era:"modern", stats:{ERA:"2.25",W:"20",SO:"265",WHIP:"0.875"}, ctx:"2017 AL Cy Young Season — Cleveland Indians", clues:["Struck out over 200 batters for the 5th time","Struck out 265 batters","Posted an ERA of 2.25 — among the best of the season","Nicknamed Klubot for his emotionless demeanor"] },

  { player:"Felix Hernandez", sport:"⚾ MLB", answer:"FELIX", era:"modern", stats:{ERA:"2.27",W:"13",SO:"232",WHIP:"1.056"}, ctx:"2010 AL Cy Young Season — Seattle Mariners", clues:["His 1.83 ERA was despite playing for a poor offensive team","Led the AL in ERA and innings pitched","The Mariners won a record 116 games in 2001 but have never appeared in a World Series","From Valencia, Venezuela — nicknamed King Felix"] },

  { player:"David Ortiz", sport:"⚾ MLB", answer:"ORTIZ", era:"modern", stats:{HR:"54",AVG:".315",RBI:"137",OPS:".978"}, ctx:"2006 MLB Season — Boston Red Sox", clues:["Hit 54 home runs this season","The Red Sox ended an 86-year championship drought known as the Curse of the Bambino","Nicknamed Big Papi","From Santo Domingo, Dominican Republic"] },

  { player:"Greg Oden", sport:"🏀 NBA", answer:"GREG ODEN", era:"modern", stats:{PICK:"1",YEAR:"2007",TEAM:"Portland Trail Blazers",SCHOOL:"Ohio State"}, ctx:"2007 NBA Draft — #1 Overall Pick over Kevin Durant", clues:["Was selected #1 overall over Kevin Durant who went #2","The Blazers are the only major professional sports team in the state of Oregon","Had his career devastated by multiple knee surgeries","Played only 82 games in his first 4 NBA seasons"] },

  // EASY Bball Legends (need 5)
  { player:"Elgin Baylor", sport:"🏀 NBA", answer:"ELGIN BAYLOR_2", era:"legends", stats:{PTS:"27.4",REB:"13.5",SEASON:"1961-62",TEAM:"Lakers"}, ctx:"Career Totals — Led the Lakers for over a decade", clues:["Averaged 27.4 points and 13.5 rebounds for his career","Was one of the first above-the-rim players in NBA history","The Lakers have won more NBA championships than almost any other team","Never won an NBA championship despite being one of the greats"] },
  { player:"Bob Cousy", sport:"🏀 NBA", answer:"BOB COUSY", era:"legends", stats:{AST:"7.5",RINGS:"6",MVP:"1957",TEAM:"Celtics"}, ctx:"Career Totals — The Houdini of the Hardwood won 6 rings", clues:["Nicknamed The Houdini of the Hardwood for his dribbling wizardry","Won 6 NBA championships with the Boston Celtics","Averaged 7.5 assists per game when that was considered extraordinary","Was the best point guard of his era by a wide margin"] },
  { player:"Jerry West", sport:"🏀 NBA", answer:"JERRY WEST", era:"legends", stats:{PTS:"27.0",AST:"6.7",RINGS:"1",LOGO:"NBA"}, ctx:"Career Totals — The Logo who scored 27 points per game", clues:["His silhouette is the official NBA logo","Averaged 27 points per game for his career","The Lakers have won more NBA championships than almost any other team","Nicknamed Mr Clutch for his game-winning shots"] },
  { player:"Kareem Abdul-Jabbar", sport:"🏀 NBA", answer:"KAREEM", era:"legends", stats:{PTS:"38.4",MVP:"1971",RINGS:"1",TEAM:"Bucks"}, ctx:"1970-71 NBA Season — Won MVP with Milwaukee Bucks", clues:["Won the NBA MVP in his second season","Led the Milwaukee Bucks to the NBA championship","Was one of the most dominant big men ever before moving to LA","His sky hook is considered the most unblockable shot in basketball history"] },
  { player:"Willis Reed", sport:"🏀 NBA", answer:"WILLIS REED", era:"legends", stats:{MVP:"1970",RINGS:"2",LIMP:"Famous",TEAM:"Knicks"}, ctx:"Career Totals — Inspired the Knicks to two championships", clues:["Famous for limping onto the court injured in Game 7 of the 1970 Finals","Won 2 NBA championships with the New York Knicks","Won the MVP Finals MVP and All-Star MVP in the same year","From Bernice Louisiana"] },

  // EASY Soccer Modern (need 1)
  { player:"Zlatan Ibrahimovic", sport:"⚽ Soccer", answer:"ZLATAN", era:"modern", stats:{G:"570+",LEAGUES:"10 different",HEIGHT:"6ft5",NICK:"Zlatan"}, ctx:"Career Totals — Scored in 10 different leagues across Europe", clues:["Scored goals in 10 different European leagues — a record","Was 6ft 5in and played until age 41 at AC Milan","Refers to himself in the third person in interviews","Won league titles in Netherlands France Italy Spain England and Sweden"] },

  // EASY Soccer Classic (need 1)
  { player:"Marco van Basten", sport:"⚽ Soccer", answer:"VAN BASTEN_2", era:"classic", stats:{BALLON:"3",EURO:"1988",CLUB:"AC Milan",NATION:"Netherlands"}, ctx:"Career Totals — Three Ballons d Or before injuries ended his career", clues:["Won 3 Ballon d Or awards before a career-ending ankle injury at 28","Scored arguably the greatest goal in European Championship history — a volley in the 1988 final","Won 3 Serie A titles with AC Milan","From Utrecht Netherlands"] },

  // EASY Soccer Legends (need 3)
  { player:"Eusebio", sport:"⚽ Soccer", answer:"EUSEBIO", era:"legends", stats:{G:"473",BALLON:"1965",NATION:"Mozambique-Portugal",CLUB:"Benfica"}, ctx:"Career Totals — 1965 Ballon d Or winner for Benfica", clues:["Won the Ballon d Or in 1965 and scored 473 goals for Benfica","Led Portugal to third place at the 1966 World Cup","Was nicknamed The Black Panther for his explosive speed","From Lourenco Marques Mozambique"] },
  { player:"Johan Cruyff", sport:"⚽ Soccer", answer:"JOHAN CRUYFF", era:"legends", stats:{BALLON:"3",NATION:"Netherlands",MOVE:"Cruyff Turn",CLUB:"Ajax/Barcelona"}, ctx:"Career Totals — Invented the Cruyff Turn and won three Ballons d Or", clues:["Invented the Cruyff Turn — a move still used by players worldwide","Won 3 Ballon d Or awards","Led the Netherlands to the 1974 World Cup Final playing Total Football","Later transformed Barcelona as a manager"] },
  { player:"Bobby Charlton", sport:"⚽ Soccer", answer:"BOBBY CHARLTON_2", era:"legends", stats:{WC:"1966",UCL:"1968",GOALS:"249",NATION:"England"}, ctx:"Career Totals — England's most decorated outfield player", clues:["Won the World Cup with England in 1966 and the European Cup with Manchester United in 1968","Survived the Munich Air Disaster of 1958 that killed several teammates","Was knighted by Queen Elizabeth II","Was England all-time top scorer for 45 years"] },

  // EASY Tennis Modern (need 2)
  { player:"Venus Williams", sport:"🎾 WTA", answer:"VENUS WILLIAMS", era:"modern", stats:{GRAND_SLAMS:"7",WIMBLEDON:"5",OLYMPIC:"Gold 2000",SIBLING:"Serena"}, ctx:"Career Totals — Five Wimbledon titles and equal pay pioneer", clues:["Won Wimbledon 5 times and was a driving force for equal prize money at Grand Slams","Won Olympic gold in singles at the 2000 Sydney Games","Her younger sister Serena became the most decorated player in tennis history","From Compton California"] },
  { player:"Maria Sharapova", sport:"🎾 WTA", answer:"MARIA SHARAPOVA", era:"modern", stats:{GRAND_SLAMS:"5",CAREER_SLAM:"Yes",SUSPENSION:"Meldonium",NATION:"Russia"}, ctx:"Career Totals — Completed the Career Grand Slam and became the highest-paid athlete", clues:["Completed the Career Grand Slam — winning all four different majors","Was the highest-paid female athlete in the world for over a decade","Was suspended for 15 months after testing positive for meldonium","From Nyagan Russia — moved to Florida at age 7 to train"] },

  // EASY Tennis Legends (need 6)
  { player:"Billie Jean King", sport:"🎾 WTA", answer:"BILLIE JEAN KING2", era:"legends", stats:{GRAND_SLAMS:"39",BATTLE:"Bobby Riggs",WIMBLEDON:"6",EQUAL_PAY:"Pioneer"}, ctx:"Career Totals — Defeated Bobby Riggs in Battle of the Sexes", clues:["Defeated Bobby Riggs in the famous Battle of the Sexes match in 1973","Won 39 Grand Slam titles across singles doubles and mixed","Was the driving force behind equal prize money at Grand Slam events","Wimbledon's main show court is named after her"] },
  { player:"Chris Evert", sport:"🎾 WTA", answer:"CHRIS EVERT", era:"legends", stats:{WIN_PCT:".900",FRENCH_OPEN:"7",GRAND_SLAMS:"18",RIVAL:"Navratilova"}, ctx:"Career Totals — .900 career win percentage and 18 Grand Slams", clues:["Had a career win percentage of .900 — the highest of any professional player","Won 18 Grand Slam titles including 7 French Opens","Her rivalry with Martina Navratilova defined women's tennis for a decade","From Fort Lauderdale Florida"] },
  { player:"Martina Navratilova", sport:"🎾 WTA", answer:"NAVRATILOVA", era:"legends", stats:{WIMBLEDON:"9",GRAND_SLAMS:"18",DEFECTED:"1975",RIVAL:"Evert"}, ctx:"Career Totals — Nine Wimbledon titles and revolutionary fitness", clues:["Won Wimbledon 9 times — the most of any player in the Open Era","Defected from Czechoslovakia to the United States at age 18","Revolutionized fitness and training in women's tennis","Her rivalry with Chris Evert produced 80 matches over 16 years"] },
  { player:"Rod Laver", sport:"🎾 ATP", answer:"ROD LAVER", era:"legends", stats:{CALENDAR_SLAM:"2x",GRAND_SLAMS:"11",ROCKET:"Nickname",NATION:"Australia"}, ctx:"Career Totals — Only player to win the Calendar Grand Slam twice", clues:["Won the Calendar Grand Slam twice — 1962 and 1969","Won 11 Grand Slam titles in the Open Era alone","Nicknamed The Rocket for his speed around the court","From Rockhampton Queensland Australia"] },
  { player:"Margaret Court", sport:"🎾 WTA", answer:"MARGARET COURT", era:"legends", stats:{GRAND_SLAMS:"24",CALENDAR_SLAM:"1970",AUS_OPEN:"11",RECORD:"Most ever"}, ctx:"Career Totals — 24 Grand Slams — the most in tennis history", clues:["Won 24 Grand Slam singles titles — the most of any player in history","Won the Calendar Grand Slam in 1970","Won the Australian Open 11 times","From Albury New South Wales Australia"] },
  { player:"Pancho Gonzales", sport:"🎾 ATP", answer:"PANCHO GONZALES", era:"legends", stats:{PRO:"Dominated",SERVE:"Fastest era",NATION:"USA",HERITAGE:"Mexican-American"}, ctx:"Career Totals — Dominated professional tennis for nearly a decade", clues:["Dominated professional tennis for nearly a decade after turning pro","Had the fastest and most feared serve of his era","From Los Angeles California of Mexican descent","Was largely denied Grand Slam play because he turned professional"] },

  // MEDIUM Bball Classic (need 5)
  { player:"Dominique Wilkins", sport:"🏀 NBA", answer:"DOMINIQUE WILKINS", era:"classic", stats:{PTS:"26.7",DUNK:"Human Highlight",ALLSTAR:"9x",TEAM:"Hawks"}, ctx:"Career Totals — The Human Highlight Film for the Atlanta Hawks", clues:["Nicknamed The Human Highlight Film for his spectacular dunking","Averaged 26.7 points per game for his career","Had legendary dunk contest battles with Michael Jordan","From Paris France but grew up in Washington State"] },
  { player:"Patrick Ewing", sport:"🏀 NBA", answer:"PATRICK EWING", era:"classic", stats:{PTS:"24.0",REB:"11.2",BLK:"2.4",RINGS:"0"}, ctx:"Career Totals — The Knicks franchise center who never won a ring", clues:["Was the franchise center of the New York Knicks for 15 seasons","Averaged 24 points and 11 rebounds without ever winning a championship","Won 2 NCAA championships with Georgetown under John Thompson","From Kingston Jamaica"] },
  { player:"Karl Malone", sport:"🏀 NBA", answer:"KARL MALONE", era:"classic", stats:{PTS:"25.0",MVP:"2x",RINGS:"0",TEAM:"Jazz"}, ctx:"Career Totals — Two-time MVP who finished as the second leading scorer", clues:["Finished his career as the second-highest scorer in NBA history at the time","Won 2 MVP awards with the Utah Jazz alongside John Stockton","Never won an NBA championship despite reaching the Finals twice","Nicknamed The Mailman because he always delivered"] },
  { player:"John Stockton", sport:"🏀 NBA", answer:"JOHN STOCKTON", era:"classic", stats:{AST:"15806",STL:"3265",RECORDS:"Both all-time",TEAM:"Jazz"}, ctx:"Career Totals — All-time leader in both assists and steals", clues:["Holds the all-time NBA records for both assists and steals","The Jazz kept their New Orleans jazz-themed name even after relocating to Utah","Played alongside Karl Malone in one of the greatest duos in NBA history","From Spokane Washington — was considered undersized coming out of Gonzaga"] },
  { player:"Charles Barkley", sport:"🏀 NBA", answer:"CHARLES BARKLEY", era:"classic", stats:{PTS:"22.1",REB:"11.7",MVP:"1993",RINGS:"0"}, ctx:"Career Totals — Won the MVP in 1993 without ever winning a championship", clues:["Won the NBA MVP in 1993 with the Phoenix Suns","Averaged 11.7 rebounds despite being considered undersized for a power forward","Never won an NBA championship — lost in the Finals to Chicago in 1993","From Leeds Alabama — became one of the most outspoken TV analysts after retirement"] },

  // MEDIUM Baseball Classic (need 1)
  { player:"Wade Boggs", sport:"⚾ MLB", answer:"WADE BOGGS", era:"classic", stats:{AVG:".328",HITS:"3010",RING:"1996",HORSE:"Rode police horse"}, ctx:"Career Totals — .328 career average and rode a police horse after winning the World Series", clues:["Hit .328 career batting average — one of the best ever","Got his 3000th hit as a home run then rode a police horse around Yankee Stadium","Won the World Series with the New York Yankees in 1996","Was famous for eating chicken before every game"] },

  // MEDIUM Baseball Legends (need 2)
  { player:"Freddie Sanchez", sport:"⚾ MLB", answer:"FREDDIE SANCHEZ", era:"modern", stats:{BA_TITLE:"2006",AVG:".344",TEAM:"Pirates/Giants",WS:"2010"}, ctx:"2006 NL Batting Title — Surprise champion for Pittsburgh Pirates", clues:["Won the NL batting title in 2006 with a .344 average for the Pittsburgh Pirates","Was a surprise batting champion as a player on a losing team","Won a World Series with the San Francisco Giants in 2010","From Hollywood California — was traded multiple times before finding success"] },
  { player:"Travis Hafner", sport:"⚾ MLB", answer:"TRAVIS HAFNER", era:"modern", stats:{OPS:"1.097",SLAMS:"6 in season",TEAM:"Cleveland",NICK:"Pronk"}, ctx:"2006 MLB Season — Had one of the greatest offensive seasons for Cleveland", clues:["Had an OPS of 1.097 — one of the best offensive seasons of the decade","Set an American League record with 6 grand slams in a single season","Nicknamed Pronk because he had qualities of both a project and a hunk","This season took place during the 2006 MLB campaign"] },

  // MEDIUM Soccer Modern (need 1)
  { player:"Didier Drogba", sport:"⚽ Soccer", answer:"DIDIER DROGBA", era:"modern", stats:{UCL:"2012",G:"164",PEACE:"Cote d Ivoire",CLUB:"Chelsea"}, ctx:"Career Totals — Champions League hero who helped broker a peace deal", clues:["Scored the equalizing goal in the 2012 Champions League Final and won on penalties","His plea on national TV is credited with helping end the Ivory Coast civil war","Scored 164 goals for Chelsea — their all-time record","From Abidjan Ivory Coast"] },

  // MEDIUM Soccer Classic (need 5)
  { player:"Hristo Stoichkov", sport:"⚽ Soccer", answer:"HRISTO STOICHKOV", era:"classic", stats:{BALLON:"1994",WC:"1994 bronze",GOALS:"37",NATION:"Bulgaria"}, ctx:"Career Totals — 1994 Ballon d Or and led Bulgaria to World Cup semi-finals", clues:["Won the Ballon d Or in 1994 and was the best player at that year's World Cup","Led Bulgaria to a shocking semi-final at the 1994 World Cup","Was known for his fiery temperament and powerful left foot","From Plovdiv Bulgaria — played for Barcelona under Johan Cruyff"] },
  { player:"Romario", sport:"⚽ Soccer", answer:"ROMARIO", era:"classic", stats:{G:"1000+",WC:"1994",BRAZIL:"Legends",BALLON:"1994"}, ctx:"Career Totals — Won the 1994 World Cup and claimed 1000 career goals", clues:["Won the 1994 World Cup with Brazil and was the tournament's best player","Claimed to have scored over 1000 career goals — though the count is disputed","Won the Ballon d Or in 1994","From Rio de Janeiro Brazil — was known for his clinical finishing from close range"] },
  { player:"Davor Suker", sport:"⚽ Soccer", answer:"DAVOR SUKER", era:"classic", stats:{WC:"1998 Golden Boot",GOALS:"6",NATION:"Croatia",TEAM:"Real Madrid"}, ctx:"1998 World Cup — Won the Golden Boot as Croatia finished third", clues:["Won the Golden Boot at the 1998 World Cup with 6 goals","Led Croatia to third place at their debut World Cup","Real Madrid have won the most UEFA Champions League titles of any club in history","From Osijek Croatia"] },
  { player:"Bebeto", sport:"⚽ Soccer", answer:"BEBETO", era:"classic", stats:{WC:"1994",CELEBRATION:"Baby cradle",G:"39",NATION:"Brazil"}, ctx:"Career Totals — Brazil's prolific striker of the 1990s", clues:["Invented the baby cradle goal celebration after scoring at the 1994 World Cup","Won the World Cup with Brazil in 1994 alongside Romario","Scored 39 goals in 75 international appearances","From Salvador Bahia Brazil — his partnership with Romario was devastating"] },
  { player:"Carlos Valderrama", sport:"⚽ Soccer", answer:"CARLOS VALDERRAMA", era:"classic", stats:{AFRO:"Iconic",CAPS:"111",NATION:"Colombia",MLS:"Tampa Bay"}, ctx:"Career Totals — Colombia's greatest player with the most recognizable hair in football", clues:["Had the most recognizable hair in football history — a giant blond afro","Was Colombia's greatest player and captained them to three World Cups","Won MLS Best XI multiple times with Tampa Bay Mutiny","From Santa Marta Colombia — nicknamed El Pibe"] },

  // MEDIUM Soccer Legends (need 12)
  { player:"Ferenc Puskas", sport:"⚽ Soccer", answer:"FERENC PUSKAS", era:"legends", stats:{G:"84",RATIO:"Hungary",WC:"1954",CLUB:"Real Madrid"}, ctx:"Career Totals — Scored 84 goals in 85 games for Hungary", clues:["Scored 84 goals in 85 international appearances for Hungary","Defected from Hungary after the 1956 revolution and later played for Spain","Was the main forward in Hungary's legendary Golden Team of the early 1950s","The UEFA Goal of the Year award is named the Puskas Award in his honor"] },
  { player:"Alfredo di Stefano", sport:"⚽ Soccer", answer:"ALFREDO DI STEFANO", era:"legends", stats:{UCL:"5",BALLON:"2",ARGENTINA_SPAIN:"Both",CLUB:"Real Madrid"}, ctx:"Career Totals — Five European Cups as the most complete player of his era", clues:["Won 5 consecutive European Cups with Real Madrid","Won 2 Ballon d Or awards and was considered the most complete player ever","Was born in Argentina but later represented Spain","Was kidnapped by Venezuelan guerrillas in 1963 during a club tour"] },
  { player:"Just Fontaine", sport:"⚽ Soccer", answer:"JUST FONTAINE", era:"legends", stats:{G:"13",WC:"1958",GAMES:"6",RECORD:"Unbreakable"}, ctx:"1958 World Cup — France's greatest ever tournament performance", clues:["Scored 13 goals in 6 World Cup games in 1958 — the all-time unbreakable record","France finished third at the 1958 World Cup","Only appeared in one World Cup in his entire career","From Marrakech Morocco — represented France after moving there"] },
  { player:"Lev Yashin", sport:"⚽ Soccer", answer:"LEV YASHIN_2", era:"legends", stats:{SAVES:"150 penalties",BALLON:"1963",NATION:"Soviet Union",NICK:"Black Spider"}, ctx:"Career Totals — The only goalkeeper ever to win the Ballon d Or", clues:["Is the only goalkeeper in history to win the Ballon d Or","Was estimated to have saved 150 penalties in his career","Nicknamed The Black Spider for his all-black kit and athletic saves","Played his entire career for Dynamo Moscow"] },
  { player:"Garrincha", sport:"⚽ Soccer", answer:"GARRINCHA_2", era:"legends", stats:{WC:"2",DRIBBLES:"Unplayable",DISABILITY:"Born with crooked legs",NATION:"Brazil"}, ctx:"Career Totals — Won two World Cups with Brazil despite being born with deformed legs", clues:["Was born with both legs bent inward yet became one of the greatest dribblers ever","Won 2 World Cups with Brazil in 1958 and 1962","In 1962 was arguably the best player in the world for the entire tournament","From Pau Grande Rio de Janeiro Brazil — nicknamed Mane Garrincha"] },
  { player:"Bobby Moore", sport:"⚽ Soccer", answer:"BOBBY MOORE_2", era:"legends", stats:{WC:"1966",CAPS:"108",TEAM:"West Ham",ARRESTED:"Bogota"}, ctx:"Career Totals — Led England to their only World Cup triumph", clues:["Captained England to their only World Cup victory in 1966","Was falsely accused of stealing a bracelet before the 1970 World Cup in Colombia","Played 108 times for England and captained West Ham United","From Barking Essex England — considered the greatest defender England ever produced"] },
  { player:"Uwe Seeler", sport:"⚽ Soccer", answer:"UWE SEELER", era:"legends", stats:{G:"43",WC:"4 tournaments",LOYALTY:"Hamburg",NATION:"Germany"}, ctx:"Career Totals — Played in four World Cups and never left his hometown club", clues:["Played in 4 consecutive World Cups for West Germany","Never left his hometown club Hamburg SV — turned down Real Madrid","Scored 43 international goals for West Germany","From Hamburg Germany — his loyalty to one club made him a national hero"] },
  { player:"Dino Zoff", sport:"⚽ Soccer", answer:"DINO ZOFF", era:"legends", stats:{WC:"1982",AGE:"40",CAPS:"112",TEAM:"Juventus"}, ctx:"Career Totals — Italy's legendary goalkeeper from the 1970s to 1980s", clues:["Won the 1982 World Cup as Italy's captain at age 40 — oldest World Cup winner ever","Kept a world record 1142 minutes without conceding a goal in international football","Won 6 Serie A titles and the European Cup with Juventus","From Mariano del Friuli Italy — played until age 41"] },
  { player:"Giacinto Facchetti", sport:"⚽ Soccer", answer:"GIACINTO FACCHETTI", era:"legends", stats:{EURO:"1968",WC:"1970 Final",CLUB:"Inter Milan",GOALS:"59 defender"}, ctx:"Career Totals — Invented the attacking full-back role at Inter Milan", clues:["Invented the modern attacking full-back role — changed how defenders played","Won the European Championship with Italy in 1968","Scored 59 goals as a defender — an extraordinary record","Inter are the only Italian club to have never been relegated from Serie A"] },
  { player:"Sandro Mazzola", sport:"⚽ Soccer", answer:"SANDRO MAZZOLA", era:"legends", stats:{EURO:"1968",UCL:"2",WC:"1970",FATHER:"Valentino"}, ctx:"Career Totals — Won two European Cups following in his legendary father's footsteps", clues:["Won 2 European Cups with Inter Milan","Won the European Championship with Italy in 1968","His father Valentino Mazzola was also an Italian football legend who died in the Superga disaster","From Milan Italy"] },
  { player:"Florian Albert", sport:"⚽ Soccer", answer:"FLORIAN ALBERT", era:"legends", stats:{BALLON:"1967",NATION:"Hungary",GOALS:"31",NICK:"Emperor"}, ctx:"Career Totals", clues:["Won the Ballon d Or in 1967 — the only Hungarian to win it after the Golden Team era","Nicknamed The Emperor for his regal style","Scored 31 goals in 75 appearances for Hungary","Played his entire career for Ferencvaros in Budapest"] },
  { player:"Carlos Alberto", sport:"⚽ Soccer", answer:"CARLOS ALBERTO", era:"legends", stats:{WC:"1970 goal",CAPTAIN:"Brazil",GOAL:"Greatest ever",TEAM:"Santos"}, ctx:"1970 World Cup Final — Brazil's captain lifts the trophy", clues:["Scored the final goal in the 1970 World Cup Final — considered the greatest team goal in history","Was the captain of the legendary 1970 Brazil World Cup team","The goal came after a move involving virtually every outfield player","This performance came at the 1970 tournament or season"] },

  // MEDIUM Golf Modern (need 2)
  { player:"Bubba Watson", sport:"⛳ Golf", answer:"BUBBA WATSON", era:"modern", stats:{MASTERS:"2",SHOT:"40 yards right to left",SELF_TAUGHT:"Never had lesson",HOVERCRAFT:"Owns one"}, ctx:"Career Totals — Won two Masters titles as a self-taught golfer", clues:["Won the Masters in 2012 and 2014 — both with miraculous final hole shots","Is entirely self-taught and never had a single golf lesson","Hit a 40-yard right-to-left hook out of pine straw to win his first Masters in a playoff","Owns a custom hovercraft painted like the Dukes of Hazzard General Lee car"] },
  { player:"Hunter Mahan", sport:"⛳ Golf", answer:"HUNTER MAHAN", era:"modern", stats:{RYDER:"Key wins",WINS:"6",WITHDREW:"For daughter's birth",NATION:"USA"}, ctx:"Career Totals — Famously withdrew from a tournament to be with his wife for childbirth", clues:["Famously withdrew from the Canadian Open while leading to be with his wife for the birth of their daughter","Won 6 PGA Tour events in his career","Was a key contributor to multiple US Ryder Cup victories","From Plano Texas"] },

  // MEDIUM Golf Legends (need 12)
  { player:"Harry Vardon", sport:"⛳ Golf", answer:"HARRY VARDON", era:"legends", stats:{BRITISH_OPEN:"6",GRIP:"His name",US_OPEN:"1900",NATION:"Jersey"}, ctx:"Career Totals — Six British Opens and the grip used by every golfer", clues:["Won the British Open 6 times — still the all-time record","The overlapping grip used by virtually all golfers is called the Vardon Grip","Won the US Open in 1900 during a promotional North American tour","From Grouville Jersey Channel Islands"] },
  { player:"Walter Hagen", sport:"⛳ Golf", answer:"WALTER HAGEN_2", era:"legends", stats:{MAJORS:"11",PGA:"5",SHOWMAN:"Famous",FIRST_MILLION:"Golf"}, ctx:"Career Totals — 11 majors and golf's first millionaire showman", clues:["Won 11 major championships including 5 PGA Championships — the most ever","Was the first professional golfer to earn a million dollars","Was famous for his extravagant lifestyle arriving at tournaments in limousines","Refused to enter clubhouses that banned professional golfers"] },
  { player:"Gene Sarazen", sport:"⛳ Golf", answer:"GENE SARAZEN_2", era:"legends", stats:{GRAND_SLAM:"All 4",WEDGE:"Invented",DOUBLE_EAGLE:"1935",NATION:"USA"}, ctx:"Career Totals — First to win all four majors and invented the sand wedge", clues:["Was the first player to win all four major championships in a career","Invented the modern sand wedge","Made the famous double eagle at Augusta in 1935 called the shot heard round the world","From Harrison New York"] },
  { player:"Byron Nelson", sport:"⛳ Golf", answer:"BYRON NELSON_2", era:"legends", stats:{WINS:"18",STREAK:"11 consecutive",YEAR:"1945",RETIRED:"34"}, ctx:"Best Season — 18 wins and 11 consecutive before retiring at 34", clues:["Won 18 tournaments in 1945 including 11 in a row","Retired at age 34 at the peak of his powers to become a Texas rancher","Had a scoring average of 68.33 for the entire 1945 season","From Fort Worth Texas"] },
  { player:"Sam Snead", sport:"⛳ Golf", answer:"SAM SNEAD_2", era:"legends", stats:{WINS:"82",MAJORS:"7",US_OPEN:"Never",AGE:"Won at 52"}, ctx:"Career Totals — 82 wins the most ever but never won the US Open", clues:["Won 82 PGA Tour events — still the all-time record","Won 7 major championships but famously never won the US Open","Won a PGA Tour event at age 52 — winning 32 years after his first win","From Hot Springs Virginia — had one of the most naturally beautiful swings ever"] },
  { player:"Ben Hogan", sport:"⛳ Golf", answer:"BEN HOGAN_2", era:"legends", stats:{MAJORS:"9",CRASH:"Survived 1949",YEAR:"1953 triple",SECRET:"Famous"}, ctx:"Career Totals — Nine majors after surviving a near-fatal bus crash", clues:["Survived a near-fatal head-on collision with a Greyhound bus in 1949","Won three major championships in the same year of 1953","Was famous for The Secret — a mysterious wrist move he claimed was undetectable","From Dublin Texas"] },
  { player:"Bobby Jones", sport:"⛳ Golf", answer:"BOBBY JONES_2", era:"legends", stats:{GRAND_SLAM:"1930",MAJORS:"13",AMATEUR:"Always",AUGUSTA:"Founded"}, ctx:"Career Totals — Won the Grand Slam in 1930 then retired at 28", clues:["Won all four major championships in 1930 — the only person to achieve the Grand Slam","Never turned professional despite being the best player in the world","Co-founded Augusta National Golf Club and created The Masters","Retired at age 28"] },
  { player:"Francis Ouimet", sport:"⛳ Golf", answer:"FRANCIS OUIMET", era:"legends", stats:{US_OPEN:"1913",AGE:"20 amateur",FROM:"Across street",IMPACT:"Changed golf in USA"}, ctx:"1913 US Open — Amateur shocked the golfing world at age 20", clues:["Won the 1913 US Open as a 20-year-old amateur over the best British professionals","Had grown up literally across the street from The Country Club where he won","His victory sparked an explosion in golf's popularity across America","His story was made into the film The Greatest Game Ever Played"] },
  { player:"Tom Morris Sr", sport:"⛳ Golf", answer:"TOM MORRIS SR", era:"legends", stats:{BRITISH_OPEN:"4",GREENKEEPER:"St Andrews",SON:"Tom Morris Jr",OLD:"Nickname"}, ctx:"Career Totals — Won four British Opens and shaped the game of golf itself", clues:["Won 4 British Opens and helped design and maintain the Old Course at St Andrews","His son Tom Morris Jr also won 4 consecutive British Opens","Nicknamed Old Tom Morris to distinguish him from his son Young Tom","Is considered one of the founding fathers of modern golf"] },
  { player:"Willie Anderson", sport:"⛳ Golf", answer:"WILLIE ANDERSON", era:"legends", stats:{US_OPEN:"4",CONSECUTIVE:"3 in a row",ERA:"1900s",NATION:"Scotland"}, ctx:"Career Totals — Won four US Opens including three consecutive", clues:["Won 4 US Open titles including three consecutive from 1903 to 1905","Shares the record for most US Open wins with Bobby Jones Ben Hogan and Jack Nicklaus","Was born in Scotland and emigrated to the United States","Died at age 31 under mysterious circumstances"] },
  { player:"Macdonald Smith", sport:"⛳ Golf", answer:"MACDONALD SMITH", era:"legends", stats:{WINS:"24",MAJORS:"0",BAD_LUCK:"Famous",ERA:"1920s-30s"}, ctx:"Career Totals — One of golf's most talented players without a major", clues:["Won 24 PGA Tour events but never won a major championship","Is considered one of the most talented players never to win a major","Suffered a famous collapse at the 1925 British Open leading by 5 with one round to go","From Carnoustie Scotland — his brothers Alec and Willie also became touring professionals"] },
  { player:"John McDermott", sport:"⛳ Golf", answer:"JOHN MCDERMOTT", era:"legends", stats:{US_OPEN:"2",AMERICAN:"First to win",AGE:"19",MENTAL:"Breakdown"}, ctx:"Career Totals — First American-born player to win the US Open", clues:["Was the first American-born player to win the US Open","Won the US Open in 1911 and 1912 — the youngest US Open champion at 19","Had a mental breakdown in his early 20s that ended his competitive career","From Philadelphia Pennsylvania"] },

  // MEDIUM Hockey Modern (need 1)
  { player:"Cam Talbot", sport:"🏒 NHL", answer:"CAM TALBOT", era:"modern", stats:{WINS:"266",GAA:"2.77",BACKUP:"NY Rangers",STARTER:"Edmonton"}, ctx:"Career Totals — Backup turned starter who carried Edmonton for years", clues:["Was Henrik Lundqvist's backup in New York before becoming a starter in Edmonton","Carried the Edmonton Oilers during their early playoff runs","Won 266 career NHL games","From Caledonia Ontario Canada"] },

  // MEDIUM Hockey Legends (need 4)
  { player:"Newsy Lalonde", sport:"🏒 NHL", answer:"NEWSY LALONDE", era:"legends", stats:{GOALS:"124",LACROSSE:"Also pro",SCORING:"Multiple titles",NICK:"Newsy"}, ctx:"Career Totals — Professional in both hockey and lacrosse simultaneously", clues:["Was one of the last players to compete professionally in both hockey and lacrosse","Led the NHL in scoring multiple times","Was nicknamed Newsy because he worked at a newsprint factory","From Cornwall Ontario — played for the Montreal Canadiens"] },
  { player:"Aurele Joliat", sport:"🏒 NHL", answer:"AURELE JOLIAT", era:"legends", stats:{CUPS:"3",SEASONS:"16",WEIGHT:"136 lbs",NICK:"Mighty Atom"}, ctx:"Career Totals — The Mighty Atom won three Cups despite weighing 136 pounds", clues:["Nicknamed The Mighty Atom because he weighed only 136 pounds yet dominated opponents","Won 3 Stanley Cups with the Montreal Canadiens","Played 16 seasons in the NHL — all with Montreal","Was considered one of the fastest and most elusive players of his era"] },
  { player:"Bill Cook", sport:"🏒 NHL", answer:"BILL COOK", era:"legends", stats:{CUPS:"2",SCORING:"Title",RANGERS:"First star",TEAM:"NY Rangers"}, ctx:"Career Totals — Won two Cups and a scoring title as the Rangers first great star", clues:["Was the first great star of the New York Rangers franchise","Won 2 Stanley Cups with the Rangers","Won the NHL scoring title in 1927","Played alongside his brother Bun Cook and Frank Boucher in the famous Rangers line"] },
  { player:"Howie Morenz", sport:"🏒 NHL", answer:"HOWIE MORENZ", era:"legends", stats:{HART:"3",GOALS:"270",GREATEST:"His era",ERA:"1920s-30s"}, ctx:"Career Totals — Three Hart Trophies and the greatest player of his era", clues:["Won 3 Hart Trophies as league MVP — the most dominant player of his era","Was considered the greatest hockey player in the world through the late 1920s and early 1930s","Died tragically from complications of a broken leg at age 34","His funeral was held at centre ice of the Montreal Forum"] },

  // HARD Baseball Modern (need 5) — Freddie Sanchez moved to Medium, need different players
  { player:"Carlos Gomez", sport:"⚾ MLB", answer:"CARLOS GOMEZ", era:"modern", stats:{GG:"3",PACE:"Fastest",HR:"24",TEAM:"Milwaukee"}, ctx:"Career Totals — Three Gold Gloves and electrifying speed for the Brewers", clues:["Won 3 consecutive Gold Gloves in center field with the Milwaukee Brewers","Was considered one of the fastest and most athletic outfielders of his era","Had one of the most electric combinations of speed and power in the game","From Manoguayabo Dominican Republic — was originally a Mets prospect"] },
  { player:"Kevin Youkilis", sport:"⚾ MLB", answer:"KEVIN YOUKILIS", era:"modern", stats:{OBP:".382",RINGS:"2",GOLD:"1",NICK:"Greek God of Walks"}, ctx:"Career Totals — Won two rings and was nicknamed the Greek God of Walks", clues:["Was nicknamed The Greek God of Walks by Michael Lewis in Moneyball","Won 2 World Series rings with the Boston Red Sox","Had a career on-base percentage of .382 — among the best of his era","From Cincinnati Ohio — was a key part of the Red Sox dynasty"] },
  { player:"Marco Scutaro", sport:"⚾ MLB", answer:"MARCO SCUTARO", era:"modern", stats:{NLCS:"MVP 2012",HITS:"14 in NLCS",WS:"2012",TEAM:"Giants"}, ctx:"2012 NLCS — Journeyman infielder became an unlikely postseason legend", clues:["Won the 2012 NLCS MVP with 14 hits in the series for San Francisco","Won the World Series with the San Francisco Giants in 2012","Was a journeyman infielder who played for 6 different MLB teams before finding postseason glory","From Caracas Venezuela — was already 36 years old during his famous postseason run"] },
  { player:"Shin-Soo Choo", sport:"⚾ MLB", answer:"SHIN-SOO CHOO", era:"modern", stats:{OBP:".377",LEADOFF:"Expert",NATION:"South Korea",WALKS:"1300+"}, ctx:"Career Totals — South Korean leadoff man known for getting on base constantly", clues:["Had a career on-base percentage of .377 — among the best leadoff hitters of his era","Was one of the first great South Korean position players in MLB history","Drew over 1300 career walks","From Busan South Korea — broke ground for Korean positional players in the major leagues"] },
  { player:"Brandon Webb", sport:"⚾ MLB", answer:"BRANDON WEBB", era:"modern", stats:{CY:"2006",ERA:"3.27",SINKER:"Best ever",INJURY:"Ended career"}, ctx:"Career Totals — Won the Cy Young with the best sinker in baseball before injury", clues:["Won the NL Cy Young Award in 2006 with the Arizona Diamondbacks","Was considered to have the best sinker of his generation","Had his career ended prematurely by a shoulder injury at age 29","From Ashland Kentucky"] },

  // HARD Basketball Modern (need 1)
  { player:"Paul George", sport:"🏀 NBA", answer:"PAUL GEORGE", era:"modern", stats:{PPG:"21.7",ALLSTAR:"9x",DPOY:"2x",TEAMS:"IND/OKC/LAC"}, ctx:"Career Totals — Two Defensive Player of Year awards for a perennial All-Star", clues:["Won 2 Defensive Player of the Year awards","Was a 9-time All-Star with Indiana Oklahoma City and the Clippers","Missed nearly an entire season due to a serious leg injury but returned as one of the league's best","From Palmdale California — nicknamed PG-13"] },
];

// ─── MEDIUM (45 puzzles) ──────────────────────────────────────────────────────
const MEDIUM = [
  { player:"Kevin Durant", sport:"🏀 NBA", answer:"DURANT", era:"modern", stats:{PTS:"34.3",REB:"8",AST:"5",TEAM:"Thunder"}, ctx:"2012 NBA Finals MVP — Oklahoma City Thunder", clues:["His team lost to Miami Heat in the 2012 Finals","Was playing for Oklahoma City","Later joined Golden State Warriors","Nickname: Slim Reaper"] },
  { player:"Kawhi Leonard", sport:"🏀 NBA", answer:"KAWHI", era:"modern", stats:{PTS:"26.6",REB:"9.3",AST:"3.3",STL:"1.8"}, ctx:"2019 NBA Finals MVP — Toronto Raptors", clues:["His team defeated the Golden State Warriors — who lost Klay Thompson and KD to injury","Ended Golden State Warriors dynasty","Known for his huge hands and quiet personality","Made The Shot vs Philadelphia in 2019"] },
  { player:"Dirk Nowitzki", sport:"🏀 NBA", answer:"NOWITZKI", era:"modern", stats:{PTS:"26",REB:"9.7",AST:"2.5",TEAM:"Mavericks"}, ctx:"2011 NBA Finals MVP — Dallas Mavericks", clues:["His team defeated the Miami Heat — Dwyane Wade, LeBron James, and Chris Bosh","Defeated LeBron James in this series","From Wurzburg, Germany — the first European to win the award","German-born, played 21 years in Dallas"] },
  { player:"Dwyane Wade", sport:"🏀 NBA", answer:"WADE", era:"modern", stats:{PTS:"34.7",REB:"7.8",AST:"3.8",STL:"2.7"}, ctx:"2006 NBA Finals MVP — Miami Heat", clues:["Averaged 34.7 points per game in the Finals at age 24","Averaged 34.7 PPG in the series","His team came back from 2-0 down","Nickname: Flash"] },
  { player:"Giannis Antetokounmpo", sport:"🏀 NBA", answer:"GIANNIS", era:"modern", stats:{PTS:"35.2",REB:"13.2",AST:"5",BLK:"1.8"}, ctx:"2021 NBA Finals MVP — Milwaukee Bucks", clues:["Shot 62% from the field in the Finals","Averaged 35.2 PPG in the series","From Greece","Nickname: The Greek Freak"] },
  { player:"Hakeem Olajuwon", sport:"🏀 NBA", answer:"HAKEEM", era:"classic", stats:{PTS:"26.9",REB:"11.9",AST:"3.6",BLK:"3.7"}, ctx:"1994 NBA Finals MVP — Houston Rockets", clues:["Averaged 35 points and 9 rebounds per game in the 1994 Playoffs","The Rockets built around a revolutionary offensive philosophy that maximized three-pointers","Born in Lagos, Nigeria","Famous for his Dream Shake move"] },
  { player:"Allen Iverson", sport:"🏀 NBA", answer:"IVERSON", era:"modern", stats:{PTS:"31.1",AST:"4.6",STL:"2.5",REB:"3.8"}, ctx:"2001 NBA Season — MVP and scoring champion", clues:["Led the league in both scoring and assists simultaneously","Led the Philadelphia 76ers to the Finals","Known for his crossover dribble","Nicknamed The Answer"] },
  { player:"Charles Barkley", sport:"🏀 NBA", answer:"BARKLEY", era:"classic", stats:{PTS:"25.6",REB:"12.2",AST:"5.1",MVP:"1993"}, ctx:"1993 NBA Season — Phoenix Suns MVP", clues:["Won the NBA MVP award this season","The Suns invented the Seven Seconds or Less fast-break offense under coach Mike D'Antoni","Nicknamed The Round Mound of Rebound","Said he was not a role model in a famous Nike ad"] },
  { player:"Emmitt Smith", sport:"🏈 NFL", answer:"EMMITT", era:"classic", stats:{CAR:"373",YDS:"1773",TD:"25",YPC:"4.7"}, ctx:"1995 NFL Season — Dallas Cowboys", clues:["Won the NFL rushing title this season","Won 3 Super Bowls with Dallas Cowboys","All-time NFL rushing yards leader","His number 22 is retired by the Cowboys"] },
  { player:"Randy Moss", sport:"🏈 NFL", answer:"MOSS", era:"modern", stats:{REC:"23",YDS:"1493",TD:"23",YPR:"15.0"}, ctx:"2007 NFL Season — New England Patriots", clues:["Set the single-season TD reception record","His team went 16-0 that regular season","Was drafted in the 6th round — the 199th pick — one of the greatest draft steals ever","Set the single-season receiving touchdown record (23)"] },
  { player:"Lawrence Taylor", sport:"🏈 NFL", answer:"TAYLOR", era:"classic", stats:{SCK:"20.5",FF:"4",INT:"2",TD:"2"}, ctx:"1986 NFL Season — New York Giants MVP", clues:["Was inducted into the Pro Football Hall of Fame in his first year of eligibility","Wore number 56 for the Giants his entire career","Bill Parcells said he was the greatest player he ever coached","His combination of speed and power at linebacker changed defensive football permanently"] },
  { player:"Barry Sanders", sport:"🏈 NFL", answer:"SANDERS", era:"classic", stats:{CAR:"335",YDS:"2053",TD:"11",YPC:"6.1"}, ctx:"1997 NFL Season — Detroit Lions", clues:["Rushed for 2053 yards this season","Won the NFL MVP award","The Lions have never appeared in a Super Bowl — the longest such drought in the NFL","Retired suddenly at his peak in 1999"] },
  { player:"Marshall Faulk", sport:"🏈 NFL", answer:"FAULK", era:"modern", stats:{REC:"87",YDS:"1048",RUSH:"1381",TD:"26"}, ctx:"2000 NFL Season — St. Louis Rams MVP", clues:["Won NFL MVP with The Greatest Show on Turf","Had both 1000 rushing and 1000 receiving yards","Scored 26 touchdowns during this season","Won Super Bowl with the Rams"] },
  { player:"Randy Johnson", sport:"⚾ MLB", answer:"RANDY", era:"modern", stats:{ERA:"1.04",SO:"19",W:"3",IP:"17.1"}, ctx:"2001 World Series MVP — Arizona Diamondbacks", clues:["Won the series in a 7-game classic vs the New York Yankees dynasty","Struck out 372 batters this season","Known as The Big Unit","Left-handed pitcher standing 6ft 10in"] },
  { player:"Pedro Martinez", sport:"⚾ MLB", answer:"PEDRO", era:"classic", stats:{ERA:"2.07",SO:"313",W:"23",WHIP:"0.923"}, ctx:"1999 MLB Season — Boston Red Sox", clues:["Posted a 0.737 WHIP — the lowest in MLB history for a qualified starter","Won the Cy Young Award this year","The Red Sox ended an 86-year championship drought known as the Curse of the Bambino","From the Dominican Republic"] },
  { player:"Mike Piazza", sport:"⚾ MLB", answer:"PIAZZA", era:"classic", stats:{HR:"40",AVG:".362",RBI:"124",OPS:"1.070"}, ctx:"1997 MLB Season — Los Angeles Dodgers", clues:["Holds the career home run record for catchers (427)","The Dodgers moved from Brooklyn to Los Angeles in 1958 breaking New York hearts","Later hit an emotional HR after 9/11 with the Mets","Was a 62nd round draft pick"] },
  { player:"Greg Maddux", sport:"⚾ MLB", answer:"MADDUX", era:"classic", stats:{ERA:"1.56",W:"19",SO:"156",WHIP:"0.896"}, ctx:"1994 MLB Season — Atlanta Braves", clues:["Had an ERA of 1.56 this season","Won the NL Cy Young award this year","The Braves won 14 consecutive division titles — one of the most sustained runs in sport","Won 4 consecutive Cy Young awards"] },
  { player:"Mariano Rivera", sport:"⚾ MLB", answer:"RIVERA", era:"modern", stats:{ERA:"1.38",SV:"53",WHIP:"0.768",SO:"77"}, ctx:"2004 MLB Season — New York Yankees", clues:["Had an ERA of 1.38 as a closer","Led MLB in saves","The Yankees have won 27 World Series championships — by far the most of any team","Only player unanimously elected to the Hall of Fame"] },
  { player:"Thierry Henry", sport:"⚽ Soccer", answer:"HENRY", era:"modern", stats:{G:"30",AST:"9",APP:"37",MIN:"3105"}, ctx:"2003-04 Premier League — Arsenal Invincibles", clues:["His team went unbeaten the entire league season","Arsenal were nicknamed The Invincibles","Won PFA Players Player of the Year","Set the Premier League single-season scoring record at the time"] },
  { player:"Zinedine Zidane", sport:"⚽ Soccer", answer:"ZIDANE", era:"classic", stats:{G:"5",AST:"3",APP:"7",MIN:"630"}, ctx:"1998 FIFA World Cup Final — France vs Brazil", clues:["Scored twice in the World Cup Final","France won their first World Cup","The opponent was Brazil","He later managed Real Madrid to 3 UCL titles"] },
  { player:"Ronaldinho", sport:"⚽ Soccer", answer:"RONALDINHO", era:"modern", stats:{G:"22",AST:"14",APP:"36",MIN:"2880"}, ctx:"2004-05 La Liga Season — FC Barcelona Ballon d'Or", clues:["Scored one of the greatest solo goals ever vs Real Madrid","Nutmegged defenders for fun — known for his elastic dribbling","Barcelona is owned by its members — a cooperative with over 150000 supporter-owners","Brazilian playmaker known for his dribbling and smile"] },
  { player:"Xavi Hernandez", sport:"⚽ Soccer", answer:"XAVI", era:"modern", stats:{G:"3",AST:"12",PASS:"90%",APP:"16"}, ctx:"2010 FIFA World Cup — Spain World Champions", clues:["Spain won their first World Cup","He was named player of the tournament","Scored 3 goals during this tournament or season","Barcelona midfielder who was a master of possession"] },
  { player:"Andres Iniesta", sport:"⚽ Soccer", answer:"INIESTA_2", era:"modern", stats:{G:"1",AST:"2",APP:"7",MIN:"611"}, ctx:"2010 FIFA World Cup Final — Spain vs Netherlands", clues:["Scored the winning goal in the World Cup Final","Won the Golden Ball award","Barcelona is owned by its members — a cooperative with over 150000 supporter-owners","His goal in extra time gave Spain their first World Cup"] },
  { player:"Novak Djokovic", sport:"🎾 ATP", answer:"DJOKOVIC", era:"modern", stats:{W:"70",L:"6",TITLES:"10",GRAND_SLAMS:"3"}, ctx:"2015 ATP Season — Most dominant year", clues:["Won 3 Grand Slams this year","Won 6 Masters 1000 titles this year","From Serbia","Won the ATP World Tour Finals"] },
  { player:"Monica Seles", sport:"🎾 WTA", answer:"SELES", era:"classic", stats:{W:"87",L:"3",GRAND_SLAMS:"3",TITLES:"9"}, ctx:"1991 WTA Season — Dominant year", clues:["Won 3 Grand Slams this year","Was World No. 1 at just 17 years old","Born in Yugoslavia, later became American","Was stabbed on court in 1993 in a shocking attack"] },
  { player:"Phil Mickelson", sport:"⛳ Golf", answer:"PHIL", era:"modern", stats:{WINS:"4",MAJORS:"1",AVG:"69.1",EARN:"$4.7M"}, ctx:"2004 PGA Tour Season — First Masters title", clues:["Won his first Masters title this year","Had been called the best player without a major","Left-handed golfer nicknamed Lefty","Won by one shot at Augusta"] },
  { player:"Annika Sorenstam", sport:"⛳ Golf", answer:"ANNIKA", era:"modern", stats:{WINS:"11",MAJORS:"2",AVG:"68.70",EARN:"$2.8M"}, ctx:"2001 LPGA Season — Won 11 tournaments, first woman to shoot 59", clues:["Won 11 LPGA tournaments this season","Shot a 59 — the first woman to do so in LPGA history","From Sweden","Won more LPGA majors (10) than any other player in history"] },
  { player:"Mario Lemieux", sport:"🏒 NHL", answer:"LEMIEUX", era:"classic", stats:{G:"69",AST:"114",PTS:"183",PIM:"54"}, ctx:"1988-89 NHL Season — Pittsburgh Penguins", clues:["Scored 183 points in this season","The Penguins won back-to-back Cups in 2016 and 2017 behind Crosby and Malkin","Nicknamed Super Mario","Battled cancer mid-career but returned"] },
  { player:"Patrick Roy", sport:"🏒 NHL", answer:"ROY", era:"classic", stats:{GAA:"1.70","SV%":".934",W:"16",SO:"3"}, ctx:"1993 Stanley Cup Finals MVP — Montreal Canadiens", clues:["Won Conn Smythe Trophy as playoff MVP","Montreal Canadiens won the Stanley Cup","Won 4 Stanley Cups and 3 Conn Smythe Trophies as playoff MVP","His last name is pronounced Wah not Roy"] },
  { player:"Jaromir Jagr", sport:"🏒 NHL", answer:"JAGR", era:"classic", stats:{G:"62",AST:"87",PTS:"149",PIM:"96"}, ctx:"1995-96 NHL Season — Pittsburgh Penguins", clues:["Scored 149 points this season","The Penguins won back-to-back Cups in 2016 and 2017 behind Crosby and Malkin","Czech player with a famous mullet","Won 2 Stanley Cups with Pittsburgh"] },
  { player:"Steve Yzerman", sport:"🏒 NHL", answer:"YZERMAN", era:"classic", stats:{G:"65",AST:"90",PTS:"155",PIM:"58"}, ctx:"1988-89 NHL Season — Detroit Red Wings", clues:["Scored 155 points in this season","The Red Wings won 4 Cups in 11 years forming the last great NHL dynasty","Won 3 Stanley Cups as captain","Nicknamed Stevie Y"] },
  // Basketball - Modern
  { player:"Damian Lillard", sport:"🏀 NBA", answer:"LILLARD", era:"modern", stats:{PTS:"37.5",AST:"9.9","3PT":"13",BUZZ:"1"}, ctx:"2019 NBA Playoffs — Series-winner vs Oklahoma City", clues:["Hit a 37-foot buzzer-beater to eliminate OKC — pointing to his watch afterward","Averaged 37.5 PPG and 9.9 APG in that playoff series","Scored 60+ points in a game to force overtime and eliminate a team himself","Has averaged over 25 PPG for 8 consecutive seasons"] },
  { player:"Paul George", sport:"🏀 NBA", answer:"GEORGE", era:"modern", stats:{PTS:"20.7",REB:"5.9",AST:"3.9",DPOY:"1"}, ctx:"Career highlights — Perennial All-Star", clues:["Missed nearly an entire season due to a serious leg injury but returned stronger than ever","Came back the following season better than ever — finished top 3 in MVP voting","Won Defensive Player of the Year in 2019","Has averaged over 20 PPG in 10 different NBA seasons"] },
  { player:"Jimmy Butler", sport:"🏀 NBA", answer:"BUTLER", era:"modern", stats:{PTS:"26.2",REB:"9.8",AST:"8.8",STL:"2.1"}, ctx:"2020 NBA Finals — Miami Heat", clues:["Led the Heat to the NBA Finals as an underdog","Averaged 26.2 PPG in the Finals","Played in South Beach for a franchise that attracted the biggest superstar names","Was homeless as a teenager and bounced between families"] },
  { player:"Devin Booker", sport:"🏀 NBA", answer:"BOOKER", era:"modern", stats:{PTS:"70",FG:"21",FT:"24",MIN:"44"}, ctx:"March 24, 2017 — Phoenix Suns vs Boston Celtics", clues:["Scored 70 points — the 5th highest single game score ever","Was only 20 years old at the time","The Suns invented the Seven Seconds or Less fast-break offense under coach Mike D'Antoni","Son of former NBA player Melvin Booker"] },
  { player:"Trae Young", sport:"🏀 NBA", answer:"TRAE", era:"modern", stats:{PTS:"28.8",AST:"9.4",REB:"3.9","3PM":"3.3"}, ctx:"2021 NBA Playoffs — Atlanta Hawks Eastern Conference Finals", clues:["Led Atlanta Hawks to the Eastern Conference Finals as an underdog","Silenced New York Knicks crowd with his performances","Averaged 28.8 points per game during this season","From Norman, Oklahoma — was traded on draft night for Luka Doncic"] },
  { player:"Ja Morant", sport:"🏀 NBA", answer:"MORANT", era:"modern", stats:{PTS:"27.4",AST:"8.1",REB:"5.9",STL:"1.1"}, ctx:"2021-22 NBA Season — Memphis Grizzlies Most Improved", clues:["Won the Most Improved Player award","Led Memphis Grizzlies to 2nd seed in the West","From Dalzell, South Carolina","Known for his explosive athleticism and highlight dunks"] },
  { player:"Jayson Tatum", sport:"🏀 NBA", answer:"TATUM", era:"modern", stats:{PTS:"26.9",REB:"8.0",AST:"4.6","3PM":"3.0"}, ctx:"2022 NBA Eastern Conference Finals — Boston Celtics", clues:["Led Celtics to the NBA Finals this year","Won the Eastern Conference Finals MVP","The Celtics have the most NBA championships in history with 17 total","From St. Louis, Missouri — mentored by Kobe Bryant"] },
  // Basketball - Classic
  { player:"Reggie Miller", sport:"🏀 NBA", answer:"MILLER", era:"classic", stats:{PTS:"23.1",REB:"2.9",AST:"2.9","3PM":"3.5"}, ctx:"1994 NBA Playoffs — Indiana Pacers vs New York Knicks", clues:["Scored 25 points in 18 seconds to beat the Knicks","Had a famous feud with Spike Lee courtside","The Pacers were named after the pace cars at the famous Indianapolis 500 race","Brother of WNBA legend Cheryl Miller"] },
  { player:"Tim Duncan", sport:"🏀 NBA", answer:"DUNCAN", era:"modern", stats:{PTS:"25.5",REB:"12.9",BLK:"2.4",AST:"3.7"}, ctx:"2002-03 NBA Season — San Antonio Spurs MVP", clues:["His team went 60-22 this season","Won 3 of his 5 championships this decade","The Spurs won 5 championships under Gregg Popovich — the greatest coaching run in NBA history","Nicknamed The Big Fundamental"] },
  { player:"Chris Paul", sport:"🏀 NBA", answer:"PAUL", era:"modern", stats:{PTS:"22.8",AST:"11.6",STL:"2.7",REB:"4.8"}, ctx:"2007-08 NBA Season — New Orleans Hornets", clues:["Led the NBA in assists and steals this season","Finished 3rd in MVP voting","The Hornets temporarily relocated to Oklahoma City after Hurricane Katrina devastated New Orleans","Nicknamed CP3 — considered one of the greatest point guards ever"] },
  // Football - Modern
  { player:"Rob Gronkowski", sport:"🏈 NFL", answer:"GRONK", era:"modern", stats:{REC:"621",YDS:"9286",TD:"92",SB:"4"}, ctx:"Career — New England Patriots and Tampa Bay Buccaneers", clues:["Retired twice and came back both times to win more Super Bowls","Won 4 Super Bowls with the most receiving TDs ever by a tight end","Caught 90+ touchdowns in his career — the most ever by a tight end","Had 5 seasons with 10+ receiving touchdowns — more than any TE in history"] },
  { player:"Odell Beckham Jr.", sport:"🏈 NFL", answer:"OBJ", era:"modern", stats:{YDS:"1305",TD:"12",CATCH:"1-hand",YEAR:"2014"}, ctx:"November 23, 2014 — New York Giants vs Dallas Cowboys", clues:["Made a one-handed catch while falling backwards — voted play of the decade","Was reaching back behind his body while being held by the cornerback","Had been in the NFL for less than 2 months at the time of the catch","Set the NFL record for fastest player to reach 200 career receptions"] },
  { player:"Adrian Peterson", sport:"🏈 NFL", answer:"PETERSON", era:"modern", stats:{CAR:"348",YDS:"2097",TD:"12",YPC:"6.0"}, ctx:"2012 NFL Season — Minnesota Vikings MVP", clues:["Rushed for 2097 yards — second most in NFL history","Won the NFL MVP award","The Vikings reached the Super Bowl 4 times but came away without a win each time","Came back from a torn ACL in just 9 months to have this season"] },
  { player:"Von Miller", sport:"🏈 NFL", answer:"VON", era:"modern", stats:{SCK:"2.5",FF:"2",TFL:"5",QB_HIT:"6"}, ctx:"Super Bowl 50 MVP — Denver Broncos vs Carolina Panthers", clues:["Won Super Bowl MVP with 2.5 sacks","Playing in Mile High altitude in Denver gives the home team a real physiological edge","Won 2 Super Bowls in his career","His 2.5 sacks forced 2 fumbles in this game"] },
  { player:"Khalil Mack", sport:"🏈 NFL", answer:"MACK", era:"modern", stats:{SCK:"18.5",FF:"5",INT:"1",TD:"4"}, ctx:"2015 NFL Season — Oakland Raiders Defensive MVP", clues:["Won the NFL Defensive Player of the Year award","Had 18.5 sacks this season","The Raiders won 3 Super Bowls with an outlaw rebellious team culture","Was traded to Chicago Bears in a blockbuster deal"] },
  // Baseball - Modern
  { player:"Jacob deGrom", sport:"⚾ MLB", answer:"DEGROM", era:"modern", stats:{ERA:"1.70",W:"10",SO:"255",WHIP:"0.912"}, ctx:"2018 NL Cy Young — New York Mets", clues:["His team scored the fewest runs per game of any Cy Young winner","Had the lowest ERA among starters","The Miracle Mets won the 1969 World Series despite having 100-1 odds at the start of the year","Was nicknamed Thor for his appearance and power"] },
  { player:"Bryce Harper", sport:"⚾ MLB", answer:"HARPER", era:"modern", stats:{HR:"42",AVG:".330",RBI:"100",OPS:"1.044"}, ctx:"2021 NL MVP Season — Philadelphia Phillies", clues:["Won the NL MVP with the Phillies","Hit a walk-off home run in the NLCS in 2023","The Phillies won the World Series in 2008 ending a 28-year championship drought","From Las Vegas, Nevada — was on the cover of Sports Illustrated at 16"] },
  { player:"Max Scherzer", sport:"⚾ MLB", answer:"SCHERZER", era:"modern", stats:{ERA:"2.90",W:"21",SO:"300",WHIP:"0.970"}, ctx:"2018 NL Cy Young Season — Washington Nationals", clues:["He threw a no-hitter and a perfect game in the same season","Struck out 300 batters this season","Posted an ERA of 2.90 — among the best of the season","Has two different colored eyes — heterochromia"] },
  { player:"Pete Alonso", sport:"⚾ MLB", answer:"ALONSO", era:"modern", stats:{HR:"53",AVG:".260",RBI:"120",OPS:".941"}, ctx:"2019 MLB Rookie of Year — New York Mets", clues:["Set the rookie home run record (53) in his first season","Won NL Rookie of the Year","The Miracle Mets won the 1969 World Series despite having 100-1 odds at the start of the year","From Tampa, Florida — nicknamed Polar Bear"] },
  { player:"Vladimir Guerrero Jr.", sport:"⚾ MLB", answer:"VLADDY", era:"modern", stats:{HR:"48",AVG:".311",RBI:"111",OPS:"1.002"}, ctx:"2021 ML Season — Toronto Blue Jays", clues:["Led the AL in home runs and batting this season","Finished 2nd in MVP voting","Hit a home run in the 2021 All-Star Game Home Run Derby from a distance of 468 feet","Son of Hall of Famer Vladimir Guerrero Sr."] },
  // Baseball - Classic
  { player:"Alex Rodriguez", sport:"⚾ MLB", answer:"AROD", era:"modern", stats:{HR:"52",AVG:".300",RBI:"135",OPS:"1.018"}, ctx:"2001 MLB Season — Texas Rangers", clues:["Signed the richest contract in sports history ($252M) before this season","Hit 52 home runs this year","The Rangers reached consecutive World Series in 2010 and 2011 but lost both times","Nicknamed A-Rod"] },
  { player:"Manny Ramirez", sport:"⚾ MLB", answer:"MANNY", era:"modern", stats:{HR:"45",AVG:".349",RBI:"144",OPS:"1.154"}, ctx:"2002 MLB Season — Boston Red Sox", clues:["Batted .349 with 45 home runs","Finished 2nd in MVP voting","The Red Sox ended an 86-year championship drought known as the Curse of the Bambino","Known for Manny Being Manny antics"] },
  { player:"Sammy Sosa", sport:"⚾ MLB", answer:"SOSA", era:"classic", stats:{HR:"66",AVG:".308",RBI:"158",SLG:".647"}, ctx:"1998 MLB Season — Chicago Cubs HR chase", clues:["Hit 66 home runs in the famous McGwire-Sosa HR chase","Finished 2nd to McGwire but won NL MVP","The Cubs ended a 108-year World Series drought in 2016 in one of sports greatest moments","Born in San Pedro de Macoris, Dominican Republic"] },
  // Soccer - Modern
  { player:"Neymar Jr.", sport:"⚽ Soccer", answer:"NEYMAR", era:"modern", stats:{G:"8",AST:"5",APP:"7",MIN:"594"}, ctx:"2022 FIFA World Cup — Brazil", clues:["Equalled Pele's Brazil goal scoring record during this tournament","Injured in the group stage but returned","From Mogi das Cruzes, Brazil","PSG were a mid-table French club before Qatari investment in 2011 transformed them into a superclub"] },
  { player:"Karim Benzema", sport:"⚽ Soccer", answer:"BENZEMA", era:"modern", stats:{G:"15",AST:"3",APP:"12",MIN:"1009"}, ctx:"2021-22 UEFA Champions League — Real Madrid", clues:["Won the Champions League with Real Madrid","Won the Ballon d'Or this year","Was accused of tax evasion in Spain and briefly considered leaving the country","French striker who came back from exile to lead France to nothing but then won Ballon d'Or"] },
  { player:"Antoine Griezmann", sport:"⚽ Soccer", answer:"GRIEZMANN", era:"modern", stats:{G:"4",AST:"2",APP:"7",MIN:"630"}, ctx:"2018 FIFA World Cup Final — France", clues:["Scored and won the Golden Boot at this World Cup","His team defeated Argentina in the final","Atletico broke the Real Madrid and Barcelona duopoly by winning La Liga in 2014","From Macon, France — nickname Grizou"] },
  { player:"Virgil van Dijk", sport:"⚽ Soccer", answer:"VAN DIJK", era:"modern", stats:{G:"4",AST:"1",APP:"38",MIN:"3377"}, ctx:"2018-19 Premier League Season — Liverpool", clues:["Finished 2nd in Ballon d'Or voting — rare for a defender","Liverpool have won 6 European Cups — more than any other English club","Won the Champions League and Premier League","Dutch central defender considered the best in the world"] },
  // Soccer - Classic
  { player:"Ronaldo Nazario", sport:"⚽ Soccer", answer:"R9", era:"classic", stats:{G:"15",AST:"4",APP:"16",MIN:"1238"}, ctx:"1996-97 Season — Barcelona La Liga", clues:["Won FIFA World Player of the Year at age 20","Scored 47 goals in all competitions this season","Barcelona is owned by its members — a cooperative with over 150000 supporter-owners","Brazilian striker known as The Phenomenon"] },
  { player:"Roberto Baggio", sport:"⚽ Soccer", answer:"BAGGIO", era:"classic", stats:{G:"5",AST:"1",APP:"7",MIN:"585"}, ctx:"1994 FIFA World Cup — Italy", clues:["Led Italy to the World Cup Final almost single-handedly","Scored 5 goals in the tournament","Missed the decisive penalty in the final shootout vs Brazil","Italian forward with a famous ponytail, nicknamed The Divine Ponytail"] },
  { player:"Dennis Bergkamp", sport:"⚽ Soccer", answer:"BERGKAMP", era:"classic", stats:{G:"12",AST:"8",APP:"28",MIN:"2239"}, ctx:"1997-98 Season — Arsenal", clues:["Won Arsenal's Double (Premier League and FA Cup)","His goal vs Argentina in the 1998 World Cup was voted goal of the tournament","Arsenal went an entire league season unbeaten in 2003-04 — becoming The Invincibles","Dutch forward nicknamed The Non-Flying Dutchman due to fear of flying"] },
  // Tennis - Classic
  { player:"Bjorn Borg", sport:"🎾 ATP", answer:"BORG", era:"classic", stats:{W:"89",L:"3",TITLES:"11",GRAND_SLAMS:"2"}, ctx:"1979 ATP Season — Wimbledon and French Open again", clues:["Won Wimbledon for the 4th consecutive year","Won 11 Grand Slams in total","Swedish player who retired at just 26","Famous rivalry with John McEnroe"] },
  { player:"Jimmy Connors", sport:"🎾 ATP", answer:"CONNORS", era:"classic", stats:{W:"99",L:"4",TITLES:"15",GRAND_SLAMS:"2"}, ctx:"1974 ATP Season — Three Grand Slams", clues:["Won 3 Grand Slams this year (US Open, Wimbledon, Australian)","Ranked World No. 1 for 5 consecutive years","American player known for his fighting spirit","Won 109 career singles titles — second all time"] },
  { player:"Chris Evert", sport:"🎾 WTA", answer:"EVERT", era:"classic", stats:{W:"86",L:"4",TITLES:"13",GRAND_SLAMS:"4"}, ctx:"1974 WTA Season — Three Grand Slams", clues:["Won 3 Grand Slams this year","Won 18 Grand Slams in total","American player with a career win rate of 90%","Had a famous rivalry with Martina Navratilova"] },
  { player:"Martina Navratilova", sport:"🎾 WTA", answer:"NAVRATILOVA_2", era:"classic", stats:{W:"86",L:"1",GRAND_SLAMS:"3",TITLES:"6"}, ctx:"1983 WTA Season — Most dominant year", clues:["Won 3 Grand Slams and lost only 1 match all year","Won 18 Grand Slams in total","Czech-American player who defected from Czechoslovakia","Won a record 9 Wimbledon singles titles"] },
  // Golf - Classic
  { player:"Tom Watson", sport:"⛳ Golf", answer:"WATSON", era:"classic", stats:{WINS:"6",MAJORS:"2",EARN:"$1.2M",YEAR:"1982"}, ctx:"1982 PGA Tour Season — US Open and British Open", clues:["Won the US Open at Pebble Beach with a famous chip-in on 17","Won The Open Championship the same year","Won 8 majors in total","From Kansas City, Missouri"] },
  { player:"Curtis Strange", sport:"⛳ Golf", answer:"STRANGE", era:"classic", stats:{WINS:"3",MAJORS:"1",EARN:"$1.1M",YEAR:"1989"}, ctx:"1989 PGA Tour Season — US Open back-to-back", clues:["Won the US Open for the second consecutive year","First player to earn over $1M in a season","From Norfolk, Virginia","Back-to-back US Open wins are extremely rare"] },
  // Hockey - Classic
  { player:"Brendan Shanahan", sport:"🏒 NHL", answer:"SHANAHAN", era:"classic", stats:{G:"52",AST:"34",PTS:"86",PIM:"131"}, ctx:"1993-94 NHL Season — St. Louis Blues", clues:["Scored 52 goals this season","The Blues won their first Cup in 2019 after 52 years of trying — while Gloria played in the arena","Won 3 Stanley Cups with Detroit Red Wings","Later became NHL's VP of Player Safety"] },
  { player:"Brett Hull", sport:"🏒 NHL", answer:"HULL", era:"classic", stats:{G:"86",AST:"45",PTS:"131",PIM:"24"}, ctx:"1990-91 NHL Season — St. Louis Blues", clues:["Scored 86 goals — 3rd most in NHL history","The Blues won their first Cup in 2019 after 52 years of trying — while Gloria played in the arena","Son of Bobby Hull — also a Hall of Famer","Nicknamed The Golden Brett"] },
  { player:"Mike Bossy", sport:"🏒 NHL", answer:"BOSSY", era:"classic", stats:{G:"68",AST:"51",PTS:"119",PIM:"6"}, ctx:"1980-81 NHL Season — New York Islanders", clues:["Scored 68 goals in this season","Won 4 consecutive Stanley Cups with the Islanders","The Islanders won 4 consecutive Stanley Cups from 1980 to 1983 — a dynasty often overlooked","Scored 50 goals in 50 games — only 2nd player to do so"] },
  { player:"Denis Savard", sport:"🏒 NHL", answer:"SAVARD", era:"classic", stats:{G:"44",AST:"87",PTS:"131",PIM:"82"}, ctx:"1987-88 NHL Season — Chicago Blackhawks", clues:["Scored 131 points this season","The Blackhawks won 3 Cups in 6 years forming the most recent NHL dynasty","From Pointe-Gatineau, Quebec","Famous for his spin-o-rama move"] },
  { player:"Nick Foles", sport:"🏈 NFL", answer:"FOLES", era:"modern", stats:{YDS:"373",TD:"3",INT:"0",RTG:"106.0"}, ctx:"Super Bowl LII MVP — Philadelphia Eagles", clues:["Won Super Bowl MVP as a backup QB","His team beat Tom Brady and the Patriots","Caught a TD pass himself in this game","Was nearly retired before this season"] },
  { player:"Kurt Warner", sport:"🏈 NFL", answer:"WARNER", era:"classic", stats:{YDS:"414",TD:"2",INT:"0",RTG:"100.0"}, ctx:"Super Bowl XXXIV MVP — St. Louis Rams", clues:["Was stocking grocery shelves on minimum wage just years before his Super Bowl win","Was stocking grocery shelves before his NFL career","Scored 2 touchdowns during this season","Won 2 Super Bowl MVPs in his career"] },
  { player:"Roger Staubach", sport:"🏈 NFL", answer:"STAUBACH", era:"classic", stats:{YDS:"228",TD:"2",INT:"0",RTG:"119.5"}, ctx:"Super Bowl XII MVP — Dallas Cowboys", clues:["Won his second Super Bowl MVP","Scored 2 touchdowns during this season","Served in the US Navy before his NFL career","Nicknamed Roger the Dodger for his scrambling ability"] },
  { player:"Orel Hershiser", sport:"⚾ MLB", answer:"HERSHISER", era:"classic", stats:{ERA:"0.00",IP:"59",SO:"34",W:"5"}, ctx:"1988 World Series MVP — Los Angeles Dodgers", clues:["Had a 1.00 ERA through his four World Series starts","Had set the consecutive scoreless innings record","His team upset the heavily favored Oakland A's","Nicknamed Bulldog by Tommy Lasorda"] },
  { player:"Bob Gibson", sport:"⚾ MLB", answer:"GIBSON", era:"legends", stats:{ERA:"1.12",SO:"268",W:"22",CG:"28"}, ctx:"1968 MLB Season — St. Louis Cardinals", clues:["Posted a 1.12 ERA — the lowest single-season ERA since 1914","His dominance led to the mound being lowered in 1969","The Cardinals have won 11 World Series championships — second most all-time","9x Gold Glove winner and 2x Cy Young winner"] },
  { player:"Don Larsen", sport:"⚾ MLB", answer:"LARSEN", era:"legends", stats:{IP:"9",H:"0",BB:"0",SO:"7"}, ctx:"1956 World Series Game 5 — New York Yankees", clues:["Threw the only perfect game in World Series history","The Yankees have won 27 World Series championships — by far the most of any team","Opponent was the Brooklyn Dodgers","This remains one of baseball's most iconic moments"] },
  { player:"Denny McLain", sport:"⚾ MLB", answer:"MCLAIN", era:"legends", stats:{W:"31",ERA:"1.96",SO:"280",CG:"28"}, ctx:"1968 MLB Season — Detroit Tigers", clues:["Last pitcher to win 30 games in a season","Won both the Cy Young and MVP awards","The Tigers have one of baseball's most storied franchises featuring Ty Cobb Hank Greenberg and Al Kaline","His record of 31 wins may never be broken"] },
  { player:"Sandy Koufax", sport:"⚾ MLB", answer:"KOUFAX", era:"legends", stats:{ERA:"1.73",SO:"382",W:"27",CG:"27"}, ctx:"1966 MLB Season — Los Angeles Dodgers", clues:["Retired at age 30 due to arthritis at his peak","Won 3 Cy Young Awards in 4 years","The Dodgers moved from Brooklyn to Los Angeles in 1958 breaking New York hearts","Famously refused to pitch on Yom Kippur in the 1965 World Series"] },
  { player:"Fernando Valenzuela", sport:"⚾ MLB", answer:"FERNANDO", era:"classic", stats:{ERA:"2.48",W:"13",SO:"180",CG:"11"}, ctx:"1981 MLB Season — Los Angeles Dodgers Rookie", clues:["Won both Cy Young AND Rookie of the Year in same season","Started the season 8-0 which sparked Fernandomania","The Dodgers moved from Brooklyn to Los Angeles in 1958 breaking New York hearts","Mexican pitcher who became a cultural icon in LA"] },
  { player:"Gerd Muller", sport:"⚽ Soccer", answer:"MULLER", era:"classic", stats:{G:"14",APP:"10",MIN:"780",YEAR:"1970"}, ctx:"1970 FIFA World Cup — West Germany", clues:["Won the Golden Boot with 14 goals in 10 games","Scored 14 goals during this tournament or season","Nicknamed Der Bomber","Bayern Munich and West Germany striker of the 1970s"] },
  { player:"George Best", sport:"⚽ Soccer", answer:"BEST", era:"legends", stats:{G:"28",APP:"41",MIN:"3690",YEAR:"1968"}, ctx:"1967-68 Football League Season — Manchester United", clues:["Won the Ballon d'Or this year","Was knighted by Queen Elizabeth II in 1994 for his services to football","Won the Ballon d'Or in 1968 — the first British player to do so","Known as the 5th Beatle for his pop star status"] },
  { player:"Bobby Orr", sport:"🏒 NHL", answer:"ORR", era:"classic", stats:{G:"46",AST:"102",PTS:"148",PM:"+124"}, ctx:"1970-71 NHL Season — Boston Bruins", clues:["Defenseman who led the entire league in scoring","The Bruins have the second most Stanley Cup championships in NHL history","Revolutionized the defenseman position","Won 8 consecutive Norris Trophies as best defenseman"] },
  { player:"Gordie Howe", sport:"🏒 NHL", answer:"HOWE", era:"legends", stats:{G:"49",AST:"46",PTS:"95",PIM:"72"}, ctx:"1952-53 NHL Season — Detroit Red Wings", clues:["Known as Mr. Hockey","The Red Wings won 4 Cups in 11 years forming the last great NHL dynasty","Played in 5 different decades","A Gordie Howe Hat Trick is a goal, assist, and fight"] },
  { player:"Phil Esposito", sport:"🏒 NHL", answer:"ESPOSITO", era:"classic", stats:{G:"76",AST:"76",PTS:"152",PIM:"71"}, ctx:"1970-71 NHL Season — Boston Bruins", clues:["Scored 76 goals — shattering the previous record","The Bruins have the second most Stanley Cup championships in NHL history","His record stood until Gretzky broke it","Italian-Canadian player who transformed the center position"] },
  { player:"Kareem Abdul-Jabbar", sport:"🏀 NBA", answer:"KAREEM_2", era:"classic", stats:{PTS:"26.2",REB:"13.5",AST:"5",BLK:"3.4"}, ctx:"1971 NBA Finals MVP — Milwaukee Bucks", clues:["Averaged 26.6 points in his first NBA season","Led Milwaukee to their first championship","All-time NBA scoring leader","His signature move was the unstoppable skyhook"] },
  { player:"Jamesen", sport:"🏀 NBA", answer:"HARDEN", era:"modern", stats:{PTS:"36.1",AST:"7.5",REB:"6.6",FT:"87.9"}, ctx:"2018-19 NBA Season — Houston Rockets scoring title", clues:["Led Houston Rockets to a 53-win season","The Rockets built around a revolutionary offensive philosophy that maximized three-pointers","Known for his step-back three pointer","Nicknamed The Beard"] },
  { player:"Luca Modric", sport:"⚽ Soccer", answer:"MODRIC_2", era:"modern", stats:{G:"2",AST:"5",APP:"7",MIN:"609"}, ctx:"2018 FIFA World Cup — Croatia", clues:["Won the Golden Ball as best player of the tournament","Led Croatia to the World Cup Final for the first time","Real Madrid have won the most UEFA Champions League titles of any club in history","From Croatia, won the Ballon d'Or in 2018"] },
  { player:"Ron Artest", sport:"🏀 NBA", answer:"ARTEST", era:"modern", stats:{PTS:"16.5",REB:"5.2",STL:"2.0",BLK:"0.8"}, ctx:"2010 NBA Finals Game 7 — Los Angeles Lakers", clues:["Hit the go-ahead three with 1 minute left in Game 7","The Lakers have won more NBA championships than almost any other team","Later changed his name to Metta World Peace","Thanked his psychiatrist in his championship speech"] },
  { player:"Malcolm Butler", sport:"🏈 NFL", answer:"MALCOLM", era:"modern", stats:{INT:"1",YDS:"0",PLAYS:"1",QTR:"4th"}, ctx:"Super Bowl XLIX — New England Patriots vs Seattle Seahawks", clues:["Made the goal-line interception that won the Super Bowl","Was an undrafted free agent","Was drafted in the 6th round — the 199th pick — one of the greatest draft steals ever","Intercepted Russell Wilson with 26 seconds left"] },
  { player:"Draymond Green", sport:"🏀 NBA", answer:"DRAYMOND", era:"modern", stats:{PTS:"8.2",REB:"8.9",AST:"7.4",STL:"1.9"}, ctx:"2017 NBA Finals — Golden State Warriors", clues:["Won Finals despite averaging under 10 PPG","Was so focused on defense that he once had a game with 0 points but 12 assists and 10 rebounds","Known for his defense and playmaking","Was a 2nd round draft pick who became an All-Star"] },
  { player:"Eli Manning", sport:"🏈 NFL", answer:"ELI", era:"modern", stats:{YDS:"255",TD:"2",INT:"0",RTG:"98.2"}, ctx:"Super Bowl XLVI MVP — New York Giants vs New England Patriots", clues:["Won his second Super Bowl MVP against the Patriots","Upset the Patriots again as heavy underdogs","Younger brother of Peyton Manning","Played his entire career for the New York Giants"] },
  { player:"Vince Carter", sport:"🏀 NBA", answer:"CARTER", era:"modern", stats:{PTS:"18.3",REB:"5.3",AST:"4.3",YEAR:"2000"}, ctx:"2000 NBA Slam Dunk Contest — Toronto Raptors", clues:["Considered the greatest dunk contest performance ever","The Raptors are the only NBA team based outside the United States","Nicknamed Half Man Half Amazing","Had one of the longest NBA careers at 22 seasons"] },
  { player:"Paolo Maldini", sport:"⚽ Soccer", answer:"MALDINI", era:"classic", stats:{APP:"647",TITLES:"7",UCL:"5",YEARS:"25"}, ctx:"Career — AC Milan, 1985-2009", clues:["Played 647 games for AC Milan over 25 years","Won 5 UEFA Champions League titles","Considered the greatest defender of all time by many","His father Cesare also played and managed AC Milan"] },
  { player:"Lev Yashin", sport:"⚽ Soccer", answer:"YASHIN", era:"legends", stats:{CS:"270",GAMES:"812",SAVES:"150+",YEAR:"1963"}, ctx:"1963 Ballon d'Or — Soviet Union", clues:["Wore all black kit — earned the nickname The Black Spider","Saved over 150 penalties in his career","Dynamo Moscow were the most famous club in the Soviet Union during the communist era","Wore all black and was nicknamed The Black Spider"] },
  { player:"Franz Beckenbauer", sport:"⚽ Soccer", answer:"BECKENBAUER", era:"classic", stats:{G:"14",APP:"50",TITLES:"3",UCL:"3"}, ctx:"1974 FIFA World Cup — West Germany", clues:["Played the role of sweeper — a position he helped popularize","Only person to win the World Cup as both captain and manager","Invented the modern sweeper position","Nicknamed Der Kaiser (The Emperor)"] },
  { player:"Steve Nash", sport:"🏀 NBA", answer:"NASH", era:"modern", stats:{PTS:"18.8",AST:"11.5",REB:"3.3",TEAM:"Suns"}, ctx:"2005-06 NBA Season — Phoenix Suns MVP", clues:["Won his second consecutive MVP award","The Suns invented the Seven Seconds or Less fast-break offense under coach Mike D'Antoni","From Victoria, British Columbia, Canada","Shot over 50% from the field as a point guard"] },
  { player:"Tracy McGrady", sport:"🏀 NBA", answer:"TMAC", era:"modern", stats:{PTS:"33.0",REB:"6.5",AST:"5.5",STL:"1.6"}, ctx:"2002-03 NBA Season — Orlando Magic scoring title", clues:["Had 13 points in 35 seconds vs San Antonio — one of the great comebacks","Averaged 33.0 points per game during this season","Scored 13 points in 35 seconds to beat San Antonio in 2004","Nickname T-Mac"] },
  { player:"Bob Cousy", sport:"🏀 NBA", answer:"COUSY", era:"legends", stats:{PTS:"21.7",AST:"7.7",REB:"5.3",YEAR:"1957"}, ctx:"1956-57 NBA Season — Boston Celtics MVP", clues:["Led the league in assists for the 8th time","Led the NBA in assists for 8 consecutive years","The Celtics have the most NBA championships in history with 17 total","Nicknamed The Houdini of the Hardwood"] },
  { player:"Peyton Manning", sport:"🏈 NFL", answer:"PEYTON", era:"modern", stats:{YDS:"247",TD:"2",INT:"2",RTG:"81.8"}, ctx:"2006 Super Bowl XLI MVP — Indianapolis Colts", clues:["Won the Super Bowl MVP with the Colts","Defeated the Chicago Bears in the rain","The Colts infamously moved from Baltimore to Indianapolis in 1984 in the middle of the night","Overcame being down 14-0 to win the game"] },
  { player:"Drew Brees", sport:"🏈 NFL", answer:"BREES", era:"modern", stats:{YDS:"5476",TD:"46",INT:"14",COMP:"71.2%"}, ctx:"2011 NFL Season — New Orleans Saints", clues:["Set the NFL passing yards record in a season","Led the NFL in completion percentage","The Saints were so bad in their early years fans wore paper bags on their heads and called them the Aints","From Austin, Texas — overcame a shoulder injury to reach this peak"] },
  { player:"Terrell Owens", sport:"🏈 NFL", answer:"TO", era:"modern", stats:{REC:"9",YDS:"122",TD:"1",TGT:"13"}, ctx:"Super Bowl XXXIX — Philadelphia Eagles vs New England Patriots", clues:["Played in this Super Bowl 6 weeks after a broken fibula and torn ligament","Caught 9 passes despite being barely able to walk","Scored 1 touchdowns during this season","Nicknamed TO — had one of sport's most controversial personalities"] },
  { player:"Marshawn Lynch", sport:"🏈 NFL", answer:"BEAST MODE", era:"modern", stats:{CAR:"29",YDS:"157",TD:"2",YAC:"7.1"}, ctx:"2014 NFC Championship — Seattle Seahawks vs San Francisco 49ers", clues:["Ran for 2 TDs including through the entire 49ers defense","The 12th Man tradition at Seattle made their stadium one of the loudest in sports","Nicknamed Beast Mode","From Oakland, California — loved Skittles on the sideline"] },
  { player:"LaDainian Tomlinson", sport:"🏈 NFL", answer:"LT", era:"modern", stats:{CAR:"348",YDS:"1815",TD:"31",YPC:"5.2"}, ctx:"2006 NFL Season — San Diego Chargers MVP", clues:["Set the single-season TD record (31) this season","Was just 5ft 11in — one of the smallest MVPs in history","Scored 31 touchdowns during this season","Nicknamed LT — considered one of the greatest RBs ever"] },
  { player:"Deion Sanders", sport:"🏈 NFL", answer:"PRIMETIME", era:"classic", stats:{INT:"8",TD:"6",RET:"1421",YEAR:"1994"}, ctx:"1994 NFL Season — San Francisco 49ers", clues:["From Fort Myers Florida — is the only player to appear in both a Super Bowl and a World Series","Returned kicks and played both CB and WR","Nicknamed Prime Time and Neon Deion","Also played professional baseball"] },
  { player:"Reggie White", sport:"🏈 NFL", answer:"WHITE", era:"classic", stats:{SCK:"21",FF:"2",INT:"2",YEAR:"1987"}, ctx:"1987 NFL Season — Philadelphia Eagles Defensive MVP", clues:["Won Defensive Player of the Year with 21 sacks","From Chattanooga Tennessee — was nicknamed the Minister of Defense and had 198 career sacks","Nicknamed The Minister of Defense","Considered one of the greatest defensive players ever"] },
  { player:"Dick Butkus", sport:"🏈 NFL", answer:"BUTKUS", era:"legends", stats:{SCK:"8",INT:"2",FF:"3",TD:"1"}, ctx:"1969 NFL Season — Chicago Bears All-Pro", clues:["Named to the All-Pro team for the 4th consecutive year","Scored 1 touchdowns during this season","Considered the most feared linebacker in NFL history","His name became synonymous with violent football"] },
  { player:"Zack Greinke", sport:"⚾ MLB", answer:"GREINKE", era:"modern", stats:{ERA:"1.66",W:"19",SO:"200",WHIP:"0.844"}, ctx:"2009 AL Cy Young Season — Kansas City Royals", clues:["Had the lowest ERA of any pitcher in 25 years","Turned his career around after dealing with social anxiety disorder","Had his famous pine tar incident in 1983 when a home run was called back — then reinstated","Had the lowest ERA by a qualified starter since 1968"] },
  { player:"Jose Fernandez", sport:"⚾ MLB", answer:"FERNANDEZ", era:"modern", stats:{ERA:"2.86",W:"16",SO:"253",WHIP:"0.979"}, ctx:"2016 MLB Season — Miami Marlins (final season)", clues:["This was tragically his final season before his death","Led the NL in strikeouts","The Marlins won two World Series despite being one of baseball's smallest market teams","Defected from Cuba at age 15 on his 4th attempt"] },
  { player:"Roy Halladay", sport:"⚾ MLB", answer:"HALLADAY", era:"modern", stats:{ERA:"2.35",W:"21",SO:"219",WHIP:"1.041"}, ctx:"2010 NL Cy Young — Philadelphia Phillies", clues:["Threw a no-hitter in the playoffs — only the 2nd ever","His no-hitter in the NLDS was the first in playoff history","The Phillies won the World Series in 2008 ending a 28-year championship drought","Also threw a perfect game during the regular season this year"] },
  { player:"Dave Winfield", sport:"⚾ MLB", answer:"WINFIELD", era:"classic", stats:{HR:"27",AVG:".340",RBI:"106",H:"184"}, ctx:"1992 MLB Season — Toronto Blue Jays World Series MVP", clues:["Had the go-ahead RBI in Game 6 of the World Series at age 40","Was named in the Baseball Hall of Fame on the first ballot after a long dispute with George Steinbrenner","Drafted by 4 different professional sports leagues","From St. Paul, Minnesota"] },
  { player:"Gary Carter", sport:"⚾ MLB", answer:"GARY", era:"classic", stats:{HR:"32",AVG:".281",RBI:"106",GG:"3"}, ctx:"1985 MLB Season — Montreal Expos, final great year", clues:["Won 3 Gold Gloves in his career","Batted .281 during this standout season","His 1986 World Series performance with the Mets was iconic","Nicknamed The Kid"] },
  { player:"Dwight Gooden", sport:"⚾ MLB", answer:"DOC", era:"classic", stats:{ERA:"1.53",W:"24",SO:"268",WHIP:"0.965"}, ctx:"1985 MLB Season — New York Mets", clues:["Won the Cy Young and Rookie of the Year in consecutive years","Had a 1.53 ERA at age 20","The Miracle Mets won the 1969 World Series despite having 100-1 odds at the start of the year","Nicknamed Doc — his career derailed by substance abuse"] },
  { player:"George Brett", sport:"⚾ MLB", answer:"BRETT", era:"classic", stats:{HR:"24",AVG:".390",RBI:"118",OPS:"1.128"}, ctx:"1980 MLB Season — Kansas City Royals MVP", clues:["Batted .390 — closest to .400 since Ted Williams","Won the AL MVP award","The Royals won the 2015 World Series on the back of elite contact hitting and defense","The Pine Tar Incident in 1983 became one of baseball's famous controversies"] },
  { player:"Toni Kroos", sport:"⚽ Soccer", answer:"KROOS", era:"modern", stats:{G:"4",AST:"8",APP:"12",MIN:"1037"}, ctx:"2014 FIFA World Cup — Germany", clues:["Scored 2 goals in the semifinal against Brazil in a 7-1 win","Scored a stunning free kick vs Sweden in his career","Real Madrid have won the most UEFA Champions League titles of any club in history","German midfielder considered the best passer in the world"] },
  { player:"Andrea Pirlo", sport:"⚽ Soccer", answer:"PIRLO", era:"modern", stats:{G:"2",AST:"8",APP:"7",MIN:"630"}, ctx:"2006 FIFA World Cup — Italy", clues:["Was considered one of the best passers of his generation","Won the Golden Ball at Euro 2012","Juventus won 9 consecutive Serie A titles from 2012 to 2020 in one of Europe's greatest runs","Italian regista midfielder nicknamed The Architect"] },
  { player:"Didier Drogba", sport:"⚽ Soccer", answer:"DROGBA", era:"modern", stats:{G:"12",AST:"3",APP:"9",MIN:"769"}, ctx:"2011-12 UEFA Champions League — Chelsea", clues:["Scored the equalizer in the 88th minute of the Champions League Final","Scored the winning penalty in the shootout","Chelsea were a mid-table London club before major investment transformed them","From Abidjan, Ivory Coast — scored in 4 separate FA Cup Finals"] },
  { player:"Gareth Bale", sport:"⚽ Soccer", answer:"BALE", era:"modern", stats:{G:"2",AST:"1",APP:"9",MIN:"613"}, ctx:"2018 UEFA Champions League Final — Real Madrid vs Liverpool", clues:["Scored a stunning bicycle kick to seal the Champions League","Came off the bench to score twice","Real Madrid have won the most UEFA Champions League titles of any club in history","Welsh winger who won 4 Champions Leagues with Madrid"] },
  { player:"Eusebio", sport:"⚽ Soccer", answer:"EUSEBIO_2", era:"legends", stats:{G:"9",AST:"1",APP:"6",MIN:"540"}, ctx:"1966 FIFA World Cup — Portugal", clues:["Led Portugal to 3rd place — their best World Cup finish","Led Portugal to 3rd place — their best ever World Cup finish","Benfica have won more Portuguese league titles than any other club and reached multiple European finals","Mozambican-born Portuguese forward nicknamed The Black Panther"] },
  { player:"Gustavo Kuerten", sport:"🎾 ATP", answer:"GUGA", era:"modern", stats:{W:"61",L:"16",TITLES:"5",GRAND_SLAMS:"1"}, ctx:"2000 ATP Season — French Open champion and World No. 1", clues:["After winning drew a heart shape in the clay at Roland Garros — which became iconic","Drew a heart in the clay after winning at Roland Garros","From Florianopolis, Brazil — nicknamed Guga","Won 3 French Open titles in total"] },
  { player:"Lleyton Hewitt", sport:"🎾 ATP", answer:"HEWITT", era:"modern", stats:{W:"80",L:"13",TITLES:"8",GRAND_SLAMS:"1"}, ctx:"2001 ATP Season — World No. 1", clues:["Became the youngest World No. 1 in history at 20","Won the US Open this year","Australian player known for his fighting spirit","Famous for his Come On celebrations"] },
  { player:"Guy Lafleur", sport:"🏒 NHL", answer:"LAFLEUR", era:"classic", stats:{G:"60",AST:"72",PTS:"132",PIM:"26"}, ctx:"1977-78 NHL Season — Montreal Canadiens", clues:["Won the Hart Trophy as league MVP","Won his 4th consecutive Stanley Cup this year","The Canadiens have won the Stanley Cup 24 times — by far the most of any franchise","Nicknamed The Flower — one of the most exciting players ever"] },
  { player:"Caitlin Clark", sport:"🏀 NBA", answer:"CLARK", era:"modern", stats:{PTS:"19.2",AST:"8.4",REB:"5.7","3PM":"3.1"}, ctx:"2024 WNBA Season — Indiana Fever Rookie of Year", clues:["Won WNBA Rookie of the Year award","Set the NCAA all-time scoring record before entering the WNBA","Averaged 19.2 points per game during this season","From West Des Moines, Iowa — sparked a WNBA viewership revolution"] },
  { player:"Aaron Judge", sport:"⚾ MLB", answer:"JUDGE", era:"modern", stats:{HR:"62",AVG:".311",RBI:"131",OPS:"1.111"}, ctx:"2022 MLB Season — New York Yankees AL MVP", clues:["Set the AL single-season home run record (62)","Won the unanimous AL MVP award","The Yankees have won 27 World Series championships — by far the most of any team","From Linden, California — 6ft 7in outfielder"] },
  { player:"Jalen Hurts", sport:"🏈 NFL", answer:"HURTS", era:"modern", stats:{YDS:"3701",TD:"35",INT:"6",RUSH:"760"}, ctx:"2022 NFL Season — Philadelphia Eagles MVP runner-up", clues:["Led Eagles to Super Bowl LVII appearance","Finished 2nd in MVP voting","Scored 35 touchdowns during this season","From Channelview, Texas — transferred from Alabama to Oklahoma"] },
  { player:"Justin Jefferson", sport:"🏈 NFL", answer:"JEFFERSON", era:"modern", stats:{REC:"128",YDS:"1809",TD:"9",YPR:"14.1"}, ctx:"2022 NFL Season — Minnesota Vikings receiving record", clues:["Set the single-season receiving yards record (1809)","Won Offensive Player of the Year","The Vikings reached the Super Bowl 4 times but came away without a win each time","From St. Rose, Louisiana — joined LSU after Odell Beckham left"] },
  { player:"Auston Matthews", sport:"🏒 NHL", answer:"MATTHEWS", era:"modern", stats:{G:"60",AST:"46",PTS:"106",PIM:"24"}, ctx:"2021-22 NHL Season — Toronto Maple Leafs MVP", clues:["Won the Hart Trophy as league MVP","Led the NHL in goals with 60","Was the first American-born player drafted first overall since Brian Berard in 1995","From Scottsdale, Arizona — grew up in Mexico before moving to Arizona"] },
  { player:"Angelique Kerber", sport:"🎾 WTA", answer:"KERBER", era:"modern", stats:{W:"68",L:"22",GRAND_SLAMS:"3",WORLD_NO1:"Yes"}, ctx:"2016 WTA Season — World No. 1 after winning 3 Slams", clues:["Won the Australian Open, Wimbledon, and US Open in the same year","Became World No. 1 for the first time in her career","German left-handed player","Beat Serena Williams in the 2016 Australian Open final as a huge underdog"] },
  { player:"Caroline Wozniacki", sport:"🎾 WTA", answer:"WOZNIACKI", era:"modern", stats:{W:"74",L:"17",TITLES:"9",WORLD_NO1:"Yes"}, ctx:"2010 WTA Season — World No. 1", clues:["Reached World No. 1 for the first time in her career","Won 9 titles this season including the US Open Series","Danish player who was known for her consistency","Later won her only Grand Slam at the 2018 Australian Open"] },
  { player:"Jennifer Capriati", sport:"🎾 ATP", answer:"CAPRIATI", era:"modern", stats:{W:"62",L:"16",GRAND_SLAMS:"3",WORLD_NO1:"Yes"}, ctx:"2001 WTA Season — World No. 1 comeback", clues:["Made one of the greatest comebacks in tennis history","Won the Australian Open and French Open this year","Had struggled with personal problems before this comeback","Was a child prodigy who turned pro at age 13"] },
  { player:"Thomas Johansson", sport:"🎾 ATP", answer:"JOHANSSON", era:"modern", stats:{W:"1",YEAR:"2002",SURFACE:"Hard",COUNTRY:"Sweden"}, ctx:"2002 Australian Open — Surprise Grand Slam champion", clues:["Won the Australian Open as a major underdog at World No. 20","Swedish player who was never a top 10 player before or after","Beat Marat Safin in the final","This was his only Grand Slam title"] },
  { player:"Gaston Gaudio", sport:"🎾 ATP", answer:"GAUDIO", era:"modern", stats:{W:"1",YEAR:"2004",SURFACE:"Clay",COUNTRY:"Argentina"}, ctx:"2004 French Open — Surprise champion from Argentina", clues:["Beat Guillermo Coria who was the heavy favorite and had been dominating clay all year","Beat Guillermo Coria who was the heavy favorite","Argentine clay court player ranked outside the top 10","This was his only Grand Slam title"] },

  { player:"Ernie Els", sport:"⛳ Golf", answer:"ELS", era:"classic", stats:{WINS:"4",MAJORS:"2",EARN:"$6.8M",YEAR:"1997"}, ctx:"1997 PGA Tour Season — The Big Easy", clues:["Won 2 US Opens and 2 British Opens in his career","Nicknamed The Big Easy for his smooth swing","From Johannesburg, South Africa","Won the US Open in 1994 and 1997"] },
  { player:"Retief Goosen", sport:"⛳ Golf", answer:"GOOSEN", era:"modern", stats:{WINS:"2",MAJORS:"2",EARN:"$4.9M",YEAR:"2004"}, ctx:"2004 US Open — Two-time US Open champion", clues:["Won his second US Open title this year","From Pietersburg, South Africa","Was struck by lightning as a teenager which affected him for years","Won the US Open in 2001 and 2004"] },
  { player:"Michael Campbell", sport:"⛳ Golf", answer:"CAMPBELL", era:"modern", stats:{WINS:"1",MAJORS:"1",YEAR:"2005",COUNTRY:"New Zealand"}, ctx:"2005 US Open — Pinehurst No. 2", clues:["Won the US Open as a major underdog","Beat Tiger Woods down the stretch","From Hawera, New Zealand — of Maori descent","This was the only major of his career"] },
  { player:"Zach Johnson", sport:"⛳ Golf", answer:"ZACH", era:"modern", stats:{SCORE:"-15",PLAYOFF:"W",HOLES:"4",OPP:"Spieth"}, ctx:"2015 British Open — Iowa native wins at St Andrews", clues:["Won The Open Championship in a playoff at St Andrews","Also won the Masters in 2007","From Cedar Rapids, Iowa","Beat Louis Oosthuizen and Marc Leishman in a 4-hole playoff"] },
  { player:"Angel Cabrera", sport:"⛳ Golf", answer:"CABRERA", era:"modern", stats:{SCORE:"-12",PLAYOFF:"W",HOLES:"1",OPP:"Kenny Perry"}, ctx:"2009 Masters — Won in a playoff at Augusta", clues:["Won the Masters in a sudden death playoff","Also won the US Open in 2007","From Cordoba, Argentina — first Argentine to win a major","Beat Kenny Perry and Chad Campbell in the playoff"] },
  { player:"Elgin Baylor", sport:"🏀 NBA", answer:"BAYLOR", era:"legends", stats:{PTS:"61",REB:"22",AST:"3",TEAM:"Lakers"}, ctx:"Nov 15, 1960 — LA Lakers vs New York Knicks", clues:["Scored 61 points — a record at the time","Averaged 61 points per game during this season","Never won an NBA championship in 11 Finals appearances","One of the most graceful scorers of his era"] },
  { player:"Pete Maravich", sport:"🏀 NBA", answer:"PISTOL", era:"classic", stats:{PTS:"68",REB:"6",AST:"4",TEAM:"LSU"}, ctx:"Feb 25, 1977 — vs New York Knicks", clues:["Scored 68 points without a 3-point line","Averaged 68 points per game during this season","NCAA all-time scoring leader at 44.2 PPG","Nicknamed Pistol Pete for his flashy style"] },
  { player:"Willis Reed", sport:"🏀 NBA", answer:"REED", era:"classic", stats:{PTS:"21.1",REB:"13.9",BLK:"1.9",FG:"52.1"}, ctx:"1970 NBA Finals MVP — New York Knicks", clues:["Knicks defeated the Los Angeles Lakers — Jerry West and Wilt Chamberlain","Famous for limping onto court injured in Game 7","Played center for the Knicks","Inspired his team to win Game 7 of the Finals"] },
  { player:"Rick Barry", sport:"🏀 NBA", answer:"BARRY", era:"legends", stats:{PTS:"36.3",REB:"6.1",AST:"4.7",FT:"89%"}, ctx:"1966-67 NBA Season — San Francisco Warriors", clues:["Led the NBA in scoring with 36.3 PPG","Averaged 36.3 points per game during this season","Famous for his underhand free throw style","Never missed a Finals appearance in his career"] },
  { player:"Ivan Lendl", sport:"🎾 ATP", answer:"LENDL", era:"classic", stats:{W:"106",L:"9",TITLES:"11",GRAND_SLAMS:"3"}, ctx:"1986 ATP Season — Czech-American dominance", clues:["Won 3 Grand Slams this year","Czech-American player who dominated the 1980s","Won 8 Grand Slams in total","Famous for his intense and methodical training regime"] },
  { player:"Mats Wilander", sport:"🎾 ATP", answer:"WILANDER", era:"classic", stats:{W:"79",L:"7",TITLES:"7",GRAND_SLAMS:"3"}, ctx:"1988 ATP Season — Three Grand Slams", clues:["Won 3 Grand Slams in a single year","Swedish player who won 7 Grand Slams total","Won Australian, French, and US Open this year","Reached World No. 1 this year"] },
  { player:"Ben Hogan", sport:"⛳ Golf", answer:"HOGAN", era:"legends", stats:{WINS:"5",MAJORS:"3",AVG:"69.3",YEAR:"1953"}, ctx:"1953 PGA Tour Season — The Hogan Slam", clues:["Won 3 majors in one year","Could not attempt the Grand Slam due to scheduling conflicts","Had survived a near-fatal car accident years earlier","Considered one of the greatest ball-strikers ever"] },
  { player:"Byron Nelson", sport:"⛳ Golf", answer:"NELSON", era:"legends", stats:{WINS:"18",STREAK:"11",AVG:"68.33",YEAR:"1945"}, ctx:"1945 PGA Tour Season — Greatest season in golf history", clues:["Won 18 tournaments in one season — all-time record","Won 11 consecutive tournaments — all-time record","Played mostly during World War II era","His record may never be broken"] },
  { player:"Ken Dryden", sport:"🏒 NHL", answer:"DRYDEN", era:"classic", stats:{GAA:"3.00","SV%":".920",W:"12",TEAM:"Canadiens"}, ctx:"1971 Stanley Cup Playoffs MVP — Montreal Canadiens", clues:["Won Conn Smythe Trophy as playoff MVP as a rookie","Had only played 6 regular season games before the playoffs","The Canadiens have won the Stanley Cup 24 times — by far the most of any franchise","Later became a politician and author"] },
  { player:"George Mikan", sport:"🏀 NBA", answer:"MIKAN", era:"legends", stats:{PTS:"22.3",REB:"13.4",TITLES:"4",YEAR:"1952"}, ctx:"1951-52 NBA Season — Minneapolis Lakers", clues:["Led Minneapolis Lakers to 5 NBA titles","Considered the first true dominant big man in basketball","The NBA widened the lane twice because of him","Wore thick glasses while playing"] },
  { player:"Earl Monroe", sport:"🏀 NBA", answer:"MONROE", era:"legends", stats:{PTS:"23.8",AST:"5.5",REB:"4.0",YEAR:"1968"}, ctx:"1967-68 NBA Season — Baltimore Bullets Rookie of Year", clues:["Was nicknamed The Pearl and Black Jesus for his extraordinary improvisational style","Famous for his spinning moves in the lane","Nicknamed Earl the Pearl and Black Jesus","Later won a championship with the New York Knicks"] },
  { player:"Tim Tebow", sport:"🏈 NFL", answer:"TEBOW", era:"modern", stats:{YDS:"316",TD:"3",INT:"1",RTG:"125.6"}, ctx:"2012 NFL Wild Card — Denver Broncos vs Pittsburgh Steelers", clues:["Threw an 80-yard TD on the first play of overtime","Playing in Mile High altitude in Denver gives the home team a real physiological edge","Famous for his religious celebrations on the field","Won the Heisman Trophy at Florida"] },
  { player:"Jeremy Lin", sport:"🏀 NBA", answer:"LIN", era:"modern", stats:{PTS:"22.5",AST:"8.7",REB:"3.6",STREAK:"7W"}, ctx:"February 2012 — New York Knicks Linsanity run", clues:["Led the Knicks on a 7-game winning streak as an unknown","Was sleeping on his brother's couch before his breakout","Harvard graduate who went undrafted","The phenomenon was called Linsanity"] },
  { player:"Muggsy Bogues", sport:"🏀 NBA", answer:"BOGUES", era:"classic", stats:{PTS:"10.8",AST:"9.7",STL:"2.0",HT:"5ft3"}, ctx:"1994-95 NBA Season — Charlotte Hornets", clues:["Led the team in assists and steals","Michael Jordan became the principal owner of the Charlotte franchise he battled against for years","Shortest player in NBA history at 5ft 3in","From Baltimore, Maryland"] },
  { player:"Manute Bol", sport:"🏀 NBA", answer:"BOL", era:"classic", stats:{BLK:"5.0",PTS:"2.7",REB:"4.2",HT:"7ft7"}, ctx:"1985-86 NBA Season — Washington Bullets", clues:["Led the NBA in blocks per game with 5.0","Averaged 2.7 points per game during this season","Tallest player in NBA history at 7ft 7in","From the Dinka tribe in Sudan"] },
  { player:"Xabi Alonso", sport:"⚽ Soccer", answer:"XABI", era:"modern", stats:{G:"2",AST:"4",APP:"38",MIN:"3285"}, ctx:"2013-14 La Liga Season — Real Madrid", clues:["Won La Liga and the Champions League this year","Real Madrid have won the most UEFA Champions League titles of any club in history","Spanish midfielder known for his passing range","Now manages Bayer Leverkusen to the Bundesliga title"] },
  { player:"Payne Stewart", sport:"⛳ Golf", answer:"STEWART", era:"classic", stats:{WINS:"3",MAJORS:"1",PUTT:"1.741",YEAR:"1999"}, ctx:"1999 US Open — Pinehurst No. 2", clues:["Sank the winning putt on the 18th to win the US Open","Was killed in a plane crash 4 months after this win","From Springfield, Missouri","Known for wearing knickerbockers and tam o'shanter caps"] },
  { player:"Bernhard Langer", sport:"⛳ Golf", answer:"LANGER", era:"classic", stats:{WINS:"4",MAJORS:"1",RYDER:"19.5",YEAR:"1993"}, ctx:"1993 Masters — Augusta National", clues:["Won his second Masters title","Has never won a tournament outside of the Masters where he has 2 wins","From Anhausen, West Germany — now leads LIV Seniors Tour","Had the yips and reinvented his putting style multiple times"] },
  { player:"A'ja Wilson", sport:"🏀 NBA", answer:"AJA", era:"modern", stats:{PTS:"26.8",REB:"11.9",BLK:"2.3",STL:"1.6"}, ctx:"2022 WNBA Season — Las Vegas Aces MVP", clues:["Won the WNBA MVP award for the second time","Led Las Vegas Aces to the WNBA Championship","Averaged 26.8 points per game during this season","From Hopkins, South Carolina"] },
  { player:"Jason Kidd", sport:"🏀 NBA", answer:"KIDD", era:"modern", stats:{AST:"9.9",REB:"6.4",STL:"1.9",PTS:"11.9"}, ctx:"2011 NBA Finals — Dallas Mavericks", clues:["Won his only NBA championship at age 38 with Dallas","Was 13 seasons into his career before winning a title","Led the NBA in assists multiple times","Was known as one of the best defensive point guards ever"] },
  { player:"Tony Perez", sport:"⚾ MLB", answer:"PEREZ", era:"classic", stats:{HR:"4",AVG:".269",RBI:"10",APP:"7"}, ctx:"1975 World Series — Cincinnati Reds Big Red Machine", clues:["Was a key part of the Cincinnati Reds Big Red Machine","Hit a crucial home run in Game 7 of the 1975 World Series","First baseman who played alongside Rose, Morgan, and Bench","From Camaguey, Cuba"] },
  { player:"Tommy John", sport:"⚾ MLB", answer:"TOMMY JOHN", era:"classic", stats:{W:"288",ERA:"3.34",CG:"162",SEASONS:"26"}, ctx:"Career totals — Pitched in 4 decades for 6 teams", clues:["Pitched 26 seasons in the MLB spanning 4 decades","Had a revolutionary elbow surgery in 1974 that now bears his name","Returned to win 164 games after the surgery","Posted an ERA of 3.34 — among the best of the season"] },
  { player:"John Newcombe", sport:"🎾 ATP", answer:"NEWCOMBE", era:"classic", stats:{GRAND_SLAMS:"7",WIMBLEDON:"3",YEAR:"1971",COUNTRY:"Australia"}, ctx:"1971 Wimbledon — Three-time champion", clues:["Won Wimbledon 3 times including this year","Won 7 Grand Slam singles titles total","Australian player with a famous mustache","Won the US Open twice and Australian Open twice"] },
  { player:"Karl-Heinz Rummenigge", sport:"⚽ Soccer", answer:"RUMMENIGGE", era:"classic", stats:{G:"2",AST:"2",APP:"7",MIN:"612"}, ctx:"1982 FIFA World Cup — West Germany", clues:["Won 2 consecutive Ballon d Or awards in 1980 and 1981","Won 2 consecutive Ballon d'Or awards (1980 and 1981)","Bayern Munich have won the Bundesliga more times than any other German club","West Germany lost the 1982 Final to Italy in extra time"] },
  { player:"Gary Lineker", sport:"⚽ Soccer", answer:"LINEKER", era:"classic", stats:{G:"6",APP:"5",MIN:"450",YEAR:"1986"}, ctx:"1986 FIFA World Cup — England Golden Boot", clues:["Remarkably was never booked in his entire professional career","England's all-time leading scorer at a World Cup","Everton are one of England's founding clubs and have spent more seasons in the top flight than almost any team","Remarkably was never booked in his entire professional career"] },
  { player:"Hristo Stoichkov", sport:"⚽ Soccer", answer:"STOICHKOV", era:"classic", stats:{G:"6",APP:"7",MIN:"630",YEAR:"1994"}, ctx:"1994 FIFA World Cup — Bulgaria", clues:["Won the Golden Boot at the 1994 World Cup with 6 goals","Led Bulgaria to a shocking semifinal appearance","Won the Ballon d'Or in 1994","Scored 6 goals during this tournament or season"] },
  { player:"Trent Dilfer", sport:"🏈 NFL", answer:"DILFER", era:"modern", stats:{YDS:"153",TD:"1",INT:"0",RTG:"112.8"}, ctx:"Super Bowl XXXV MVP team — Baltimore Ravens", clues:["Won a Super Bowl as a game-manager QB with the dominant Ravens defense","Was released by Baltimore after winning the Super Bowl","One of the most criticized Super Bowl winning QBs ever","The Ravens defense that year allowed only 165 points all season"] },
  { player:"Marc-Andre Fleury", sport:"🏒 NHL", answer:"FLEURY", era:"modern", stats:{GAA:"2.52","SV%":".914",W:"16",TEAM:"Penguins"}, ctx:"2009 Stanley Cup Playoffs — Pittsburgh Penguins", clues:["Won the Stanley Cup with the Pittsburgh Penguins","Was named playoff MVP in the second round","Was the #1 overall pick in the 2003 NHL Draft","Won 3 Stanley Cups in his career"] },
  { player:"Henrik Zetterberg", sport:"🏒 NHL", answer:"ZETTERBERG", era:"modern", stats:{G:"13",AST:"14",PTS:"27",GP:"22"}, ctx:"2008 Stanley Cup Playoffs MVP — Detroit Red Wings", clues:["Won the Conn Smythe Trophy as playoff MVP","Led Detroit Red Wings to the Stanley Cup","Swedish winger who was a 7th round draft pick","Scored the Stanley Cup winning goal in 2008"] },
  { player:"Jonathan Quick", sport:"🏒 NHL", answer:"QUICK", era:"modern", stats:{GAA:"1.41","SV%":".946",W:"16",TEAM:"Kings"}, ctx:"2012 Stanley Cup Playoffs MVP — Los Angeles Kings", clues:["Won the Conn Smythe Trophy with one of the greatest playoff performances ever","Led the LA Kings to their first Stanley Cup","Was dominant in Game 6 of the Finals vs the Devils","From Milford, Connecticut"] },
  { player:"Landon Donovan", sport:"⚽ Soccer", answer:"DONOVAN", era:"modern", stats:{G:"5",AST:"3",APP:"5",MIN:"450"}, ctx:"2010 FIFA World Cup — USA", clues:["Scored the famous injury-time winner vs Algeria","Sent USA through to the round of 16","Greatest American soccer player of his generation","Scored in the 91st minute to spark wild celebrations"] },
  { player:"Connor Bedard", sport:"🏒 NHL", answer:"BEDARD", era:"modern", stats:{G:"22",AST:"37",PTS:"61",YEAR:"2024"}, ctx:"2023-24 NHL Season — Chicago Blackhawks Rookie of Year", clues:["Won the Calder Trophy as NHL Rookie of the Year","Was the #1 overall pick in the 2023 NHL Draft","The Blackhawks won 3 Cups in 6 years forming the most recent NHL dynasty","From North Vancouver, British Columbia"] },
  { player:"Bubba Watson", sport:"⛳ Golf", answer:"BUBBA", era:"modern", stats:{SCORE:"-10",HOLE:"10",SHOT:"Hook",PLAYOFF:"W"}, ctx:"2012 Masters — Augusta National playoff win", clues:["Won the Masters with a famous hook shot from the pine straw","Is a left-handed golfer who never had a formal lesson","Won 2 Masters titles in his career","From Bagdad, Florida — known for his massive driving distance"] },
  { player:"Dimitar Berbatov", sport:"⚽ Soccer", answer:"BERBATOV", era:"modern", stats:{G:"20",AST:"7",APP:"32",MIN:"2318"}, ctx:"2010-11 Premier League Season — Manchester United golden boot", clues:["Was voted Player of the Season by his peers","United are the most widely supported football club in England","Scored 5 goals in a single Premier League game","Bulgarian striker known for his elegant style"] },
  { player:"David Duval", sport:"⛳ Golf", answer:"DUVAL", era:"classic", stats:{WINS:"4",AVG:"68.93",EARN:"$2.6M",YEAR:"1999"}, ctx:"1999 PGA Tour Season — Briefly World No. 1", clues:["Shot a 59 to win the Bob Hope Classic — only 4th player to do so","Reached World No. 1 in the world","From Jacksonville, Florida","His career declined rapidly after reaching the top"] },
  { player:"Yevgeny Kafelnikov", sport:"🎾 ATP", answer:"KAFELNIKOV", era:"classic", stats:{W:"76",L:"24",GRAND_SLAMS:"2",TITLES:"9"}, ctx:"1999 ATP Season — Australian Open champion and World No. 1", clues:["Won 2 Grand Slams and reached World No. 1","Won the Australian Open this year","Russian player who won the French Open in 1996","Was the first Russian man to win a Grand Slam title"] },
  { player:"Jake Delhomme", sport:"🏈 NFL", answer:"DELHOMME", era:"modern", stats:{YDS:"323",TD:"3",INT:"1",RTG:"100.1"}, ctx:"2003 NFC Championship — Carolina Panthers", clues:["Led the Carolina Panthers to Super Bowl XXXVIII","Was an undrafted free agent who became a starter","Scored 3 touchdowns during this season","His team lost to the Patriots in one of the highest scoring Super Bowls ever"] },
  { player:"Ryan Kesler", sport:"🏒 NHL", answer:"KESLER", era:"modern", stats:{G:"41",AST:"32",PTS:"73",YEAR:"2011"}, ctx:"2010-11 NHL Season — Vancouver Canucks", clues:["Won the Selke Trophy as best defensive forward","Had a career-high 41 goals this season","The Canucks came agonizingly close to winning the Cup in both 1982 and 1994 before falling short","Was known as one of the best two-way forwards in the NHL"] },
  { player:"Just Fontaine", sport:"⚽ Soccer", answer:"FONTAINE", era:"legends", stats:{G:"13",APP:"6",MIN:"540",YEAR:"1958"}, ctx:"1958 FIFA World Cup — France", clues:["Scored 13 goals in a single World Cup — all-time record","Scored 13 goals during this tournament or season","The record has never been broken in over 60 years","French striker who played in the 1950s"] },
  { player:"Nate Thurmond", sport:"🏀 NBA", answer:"NATE THURMOND", era:"legends", stats:{PTS:"19.0",REB:"19.0",BLK:"4.0",FG:"44.0"}, ctx:"1967-68 NBA Season — San Francisco Warriors All-Star", clues:["Averaged over 19 points and 19 rebounds per game","From Akron Ohio — recorded the first official quadruple-double in NBA history","Was considered the toughest defensive center of the 1960s","Recorded the first official quadruple-double in NBA history in 1974"] },
  { player:"Willis Reed", sport:"🏀 NBA", answer:"WILLIS REED 2", era:"legends", stats:{PTS:"21.7",REB:"13.9",BLK:"1.8",FG:"52.1"}, ctx:"1969-70 NBA Season — New York Knicks MVP", clues:["Won the regular season MVP All-Star MVP and Finals MVP in same year","Played center for the New York Knicks","His heroic Game 7 appearance is one of sports greatest moments","Was the backbone of the championship Knicks teams"] },
  { player:"Elgin Baylor", sport:"🏀 NBA", answer:"ELGIN BAYLOR 2", era:"legends", stats:{PTS:"38.3",REB:"18.6",AST:"4.6",FG:"44.5"}, ctx:"1961-62 NBA Season — Los Angeles Lakers", clues:["Averaged 38.3 PPG — 3rd highest season average ever","The Lakers have won more NBA championships than almost any other team","Never won an NBA championship despite 11 Finals appearances","One of the most graceful scorers of his era"] },
  { player:"Jerry Lucas", sport:"🏀 NBA", answer:"JERRY LUCAS", era:"legends", stats:{PTS:"21.5",REB:"21.1",AST:"4.3",FG:"49.9"}, ctx:"1964-65 NBA Season — Cincinnati Royals Rookie of Year", clues:["Had a photographic memory and later became a world-famous memory expert and author","Averaged over 20 points and 20 rebounds as a rookie","Was a memory expert who later memorized the Manhattan phone book","Won a championship with the New York Knicks later in his career"] },
  { player:"Connie Hawkins", sport:"🏀 NBA", answer:"CONNIE HAWKINS", era:"legends", stats:{PTS:"24.6",REB:"10.4",AST:"4.8",FG:"48.9"}, ctx:"1967-68 ABA Season — Pittsburgh Pipers MVP", clues:["Won the ABA MVP in its very first season","Was banned from the NBA for years despite being innocent","Was finally admitted to the NBA in 1969","Was one of the most gifted ballhandlers of his generation"] },
  { player:"Rick Barry", sport:"🏀 NBA", answer:"RICK BARRY", era:"legends", stats:{PTS:"35.6",REB:"6.1",AST:"4.7",FT:"89.0"}, ctx:"1966-67 NBA Season — San Francisco Warriors scoring title", clues:["Led the NBA in scoring with 35.6 PPG","Averaged 35.6 points per game during this season","Famous for his underhand free throw shooting style","Won ABA and NBA championships in his career"] },
  { player:"Billy Cunningham", sport:"🏀 NBA", answer:"BILLY CUNNINGHAM", era:"classic", stats:{PTS:"24.8",REB:"13.0",AST:"4.3",FG:"45.5"}, ctx:"1971-72 ABA Season — Carolina Cougars MVP", clues:["Won the ABA MVP this season","Later coached the Philadelphia 76ers to the 1983 championship","Nicknamed The Kangaroo Kid for his leaping ability","The 76ers embraced The Process — one of the most deliberate rebuilds in sports history"] },
  { player:"Dave Cowens", sport:"🏀 NBA", answer:"DAVE COWENS", era:"classic", stats:{PTS:"20.5",REB:"16.2",AST:"4.4",FG:"45.9"}, ctx:"1972-73 NBA Season — Boston Celtics MVP", clues:["Won the NBA MVP award this season","Led the Celtics to the championship the following year","The Celtics have the most NBA championships in history with 17 total","Was a center who played with the intensity of a small forward"] },
  { player:"Sam Jones", sport:"🏀 NBA", answer:"SAM JONES_2", era:"legends", stats:{PTS:"22.1",REB:"4.5",AST:"4.9",FG:"47.0"}, ctx:"1964-65 NBA Season — Boston Celtics fifth championship", clues:["Won 10 NBA championships with the Boston Celtics","Was known as the banker for his bank shot off the glass","The Celtics have the most NBA championships in history with 17 total","Was inducted into the Hall of Fame in 1983"] },
  { player:"Hal Greer", sport:"🏀 NBA", answer:"HAL GREER", era:"legends", stats:{PTS:"22.1",REB:"5.3",AST:"4.7",YEAR:"1968"}, ctx:"1967-68 NBA Season — Philadelphia 76ers starter", clues:["Was the leading scorer on the 76ers team that went 68-13","Played all 15 seasons for the same franchise","Was known for shooting his free throws as jump shots","Was a 10x NBA All-Star"] },
  { player:"Bob Boozer", sport:"🏀 NBA", answer:"BOB BOOZER", era:"legends", stats:{PTS:"21.8",REB:"11.6",FG:"46.7",YEAR:"1964"}, ctx:"1963-64 NBA Season — New York Knicks All-Star", clues:["Was a 6x All-Star during his career","Averaged 21.8 points per game during this season","Won an Olympic gold medal with the US team in 1960","From Omaha, Nebraska"] },
  { player:"Tom Heinsohn", sport:"🏀 NBA", answer:"TOM HEINSOHN", era:"legends", stats:{PTS:"18.8",REB:"10.0",FG:"40.8",TITLES:"6"}, ctx:"1956-57 NBA Season — Boston Celtics Rookie of Year", clues:["Won Rookie of the Year in his first season","Won 6 NBA championships as a player with the Celtics","Later coached the Celtics to 2 more championships","Was elected to the Hall of Fame as both a player and coach"] },
  { player:"Lenny Wilkens", sport:"🏀 NBA", answer:"LENNY WILKENS", era:"legends", stats:{PTS:"22.4",AST:"8.1",REB:"5.6",STL:"2.1"}, ctx:"1967-68 NBA Season — St. Louis Hawks All-Star", clues:["Was a player-coach during his playing career","From Brooklyn New York — later became one of the winningest coaches in NBA history","Later became one of the winningest coaches in NBA history","Was an All-Star as both a player and a coach — unique achievement"] },
  { player:"John Havlicek", sport:"🏀 NBA", answer:"JOHN HAVLICEK", era:"classic", stats:{PTS:"26.8",REB:"7.1",AST:"5.9",FG:"47.0"}, ctx:"1973-74 NBA Season — Boston Celtics Finals MVP", clues:["Was the last cut from the Cleveland Browns as a wide receiver before turning to basketball","Won 8 NBA championships in his career","Nicknamed Hondo","Was famous for his tireless running and hustle"] },
  { player:"Earl Monroe", sport:"🏀 NBA", answer:"EARL MONROE", era:"legends", stats:{PTS:"23.8",AST:"5.5",REB:"4.0",FG:"46.2"}, ctx:"1967-68 NBA Season — Baltimore Bullets Rookie of Year", clues:["Won Rookie of the Year with Baltimore Bullets","Famous for his spinning moves in the lane","Nicknamed Earl the Pearl and Black Jesus","Later won a championship with the New York Knicks"] },
  { player:"Bob Cousy", sport:"🏀 NBA", answer:"BOB COUSY 2", era:"legends", stats:{PTS:"21.7",AST:"7.7",REB:"5.3",TITLES:"6"}, ctx:"1956-57 NBA Season — Boston Celtics MVP", clues:["Won the MVP award and led Celtics to the championship","Led the NBA in assists for 8 consecutive years","The Celtics have the most NBA championships in history with 17 total","Nicknamed The Houdini of the Hardwood"] },
  { player:"Oscar Robertson", sport:"🏀 NBA", answer:"OSCAR ROBERTSON", era:"legends", stats:{PTS:"30.8",AST:"11.4",REB:"12.5",FG:"47.8"}, ctx:"1961-62 NBA Season — Cincinnati Royals triple-double season", clues:["Averaged a triple-double for the entire season","From Charlotte Tennessee — averaged a triple-double for an entire season in 1961-62","Nicknamed The Big O","His triple-double record per season was not matched for 55 years"] },
  { player:"Jerry West", sport:"🏀 NBA", answer:"JERRY WEST 2", era:"legends", stats:{PTS:"31.3",AST:"7.2",REB:"4.4",FG:"47.6"}, ctx:"1969-70 NBA Season — Los Angeles Lakers Finals MVP", clues:["Won Finals MVP despite his team losing the series","The only Finals MVP from a losing team ever","The Lakers have won more NBA championships than almost any other team","His silhouette is the NBA logo"] },
  { player:"Wilt Chamberlain", sport:"🏀 NBA", answer:"WILT_2", era:"legends", stats:{PTS:"50.4",REB:"25.7",AST:"2.4",FG:"50.6"}, ctx:"1961-62 NBA Season — Philadelphia Warriors all-time season", clues:["Averaged 50.4 PPG — the all-time NBA record","Scored 100 points in a single game this season","Averaged 50.4 points per game during this season","Also averaged 25.7 rebounds per game — both all-time records"] },
  { player:"Bill Russell", sport:"🏀 NBA", answer:"BILL RUSSELL", era:"legends", stats:{REB:"22.9",PTS:"14.1",BLK:"8.0",TITLES:"5"}, ctx:"1961-62 NBA Season — Boston Celtics dynasty peak", clues:["Won 5 consecutive NBA championships as captain","Led the NBA in rebounds this season","The Celtics have the most NBA championships in history with 17 total","Was player-coach for his last 3 championships"] },
  { player:"Bob Pettit", sport:"🏀 NBA", answer:"BOB PETTIT", era:"legends", stats:{PTS:"29.2",REB:"20.3",AST:"3.1",FG:"42.2"}, ctx:"1961-62 NBA Season — St. Louis Hawks All-Star", clues:["Was the first player in NBA history to score 20000 career points","From Baton Rouge Louisiana — was the first player in NBA history to score 20000 career points","Won the NBA MVP award twice","Was the first true power forward in NBA history"] },
  { player:"George Mikan", sport:"🏀 NBA", answer:"GEORGE MIKAN", era:"legends", stats:{PTS:"22.3",REB:"13.4",FG:"40.4",TITLES:"4"}, ctx:"1951-52 NBA Season — Minneapolis Lakers dynasty", clues:["Led Minneapolis Lakers to 4 NBA titles in 5 years","Considered the first true dominant big man in basketball","The NBA widened the lane twice because of him","Wore thick glasses while playing"] },
  { player:"Elvin Hayes", sport:"🏀 NBA", answer:"ELVIN HAYES", era:"classic", stats:{PTS:"28.4",REB:"17.1",BLK:"3.7",FG:"42.5"}, ctx:"1970-71 NBA Season — San Diego Rockets scoring leader", clues:["Led the NBA in rebounds this season","From Rayville Louisiana — was selected second overall in the 1968 draft behind Wes Unseld","Nicknamed The Big E","Won the NBA championship with Washington Bullets in 1978"] },
  { player:"Kareem Abdul-Jabbar", sport:"🏀 NBA", answer:"KAREEM 2", era:"classic", stats:{PTS:"31.7",REB:"16.0",BLK:"4.1",FG:"57.7"}, ctx:"1971-72 NBA Season — Milwaukee Bucks MVP", clues:["Won the second of his 6 MVP awards this season","The Bucks drafted both Kareem Abdul-Jabbar and Oscar Robertson in their early years","Developed the unstoppable skyhook shot","All-time NBA scoring leader with 38387 points"] },
  { player:"Dave Bing", sport:"🏀 NBA", answer:"DAVE BING", era:"legends", stats:{PTS:"27.1",AST:"7.1",REB:"4.5",FG:"46.9"}, ctx:"1967-68 NBA Season — Detroit Pistons scoring title", clues:["Won the NBA scoring title as a sophomore","The Bad Boys Pistons were notorious for their physical and intimidating style of play","Was a 7x All-Star","Later became the mayor of Detroit"] },
  { player:"Spencer Haywood", sport:"🏀 NBA", answer:"HAYWOOD", era:"legends", stats:{PTS:"29.6",REB:"19.5",BLK:"2.8",FG:"50.9"}, ctx:"1969-70 ABA Season — Denver Rockets MVP and Rookie", clues:["Won both the ABA MVP and Rookie of the Year","Changed NBA eligibility rules by suing to enter the league early","Was one of the most dominant big men of the early 1970s","Averaged 29.6 points per game during this season"] },
  { player:"Walter Davis", sport:"🏀 NBA", answer:"WALTER DAVIS", era:"classic", stats:{PTS:"24.8",AST:"4.3",REB:"3.5",FG:"54.3"}, ctx:"1978-79 NBA Season — Phoenix Suns All-Star", clues:["Won Rookie of the Year in 1978","The Suns invented the Seven Seconds or Less fast-break offense under coach Mike D'Antoni","Won an Olympic gold medal with the US in 1976","Nicknamed Sweet D for his smooth scoring"] },
  { player:"Truck Robinson", sport:"🏀 NBA", answer:"TRUCK ROBINSON", era:"classic", stats:{PTS:"22.7",REB:"15.7",FG:"53.3",YEAR:"1978"}, ctx:"1977-78 NBA Season — New Orleans Jazz rebounding title", clues:["Led the NBA in rebounding this season","Averaged 22.7 points per game during this season","Nicknamed Truck for his physical style of play","Was a 2x All-Star"] },
  { player:"Geoff Petrie", sport:"🏀 NBA", answer:"GEOFF PETRIE", era:"classic", stats:{PTS:"24.8",AST:"4.8",REB:"2.8",YEAR:"1971"}, ctx:"1970-71 NBA Season — Portland Trail Blazers co-Rookie of Year", clues:["Co-won Rookie of the Year with Dave Cowens","Was a Princeton graduate who became one of the top executives in the NBA after retiring","Was a prolific scorer in the early 1970s","Was known as Machine Gun for his rapid-fire shooting"] },
  { player:"Roger Staubach", sport:"🏈 NFL", answer:"ROGER STAUBACH", era:"classic", stats:{YDS:"2620",TD:"18",INT:"9",RTG:"93.5"}, ctx:"1977 NFL Season — Dallas Cowboys passing title", clues:["Won the NFL passing title this season","Scored 18 touchdowns during this season","Served in the US Navy before his NFL career","Nicknamed Roger the Dodger for his scrambling ability"] },
  { player:"Terry Bradshaw", sport:"🏈 NFL", answer:"TERRY BRADSHAW", era:"classic", stats:{YDS:"318",TD:"4",INT:"1",RTG:"112.4"}, ctx:"Super Bowl XIII MVP — Pittsburgh Steelers vs Dallas Cowboys", clues:["Won his second consecutive Super Bowl MVP","From Shreveport Louisiana — won four Super Bowls and was twice named Super Bowl MVP","Won 4 Super Bowls in his career","Later became a famous television analyst"] },
  { player:"Fran Tarkenton", sport:"🏈 NFL", answer:"FRAN TARKENTON", era:"classic", stats:{YDS:"3468",TD:"25",INT:"21",RTG:"82.7"}, ctx:"1975 NFL Season — Minnesota Vikings", clues:["Scored 25 touchdowns during this season","Was the all-time leader in passing yards when he retired","Reached 3 Super Bowls with the Vikings but lost all of them","Was one of the first scrambling quarterbacks"] },
  { player:"Bob Griese", sport:"🏈 NFL", answer:"BOB GRIESE", era:"classic", stats:{YDS:"1422",TD:"17",INT:"8",RTG:"93.9"}, ctx:"1972 NFL Season — Miami Dolphins perfect season", clues:["Was one of the most cerebral and precise quarterbacks of his era","Had a broken leg and was replaced by Earl Morrall for much of the year","Scored 17 touchdowns during this season","Finished 17-0 including the Super Bowl"] },
  { player:"Ken Stabler", sport:"🏈 NFL", answer:"KEN STABLER", era:"classic", stats:{YDS:"2737",TD:"27",INT:"17",RTG:"103.7"}, ctx:"1976 NFL Season — Oakland Raiders MVP", clues:["Won the NFL MVP award this season","Led Oakland Raiders to a Super Bowl win","Nicknamed The Snake","Was a left-handed quarterback"] },
  { player:"Jim Plunkett", sport:"🏈 NFL", answer:"JIM PLUNKETT", era:"classic", stats:{YDS:"261",TD:"2",INT:"0",RTG:"107.2"}, ctx:"Super Bowl XV MVP — Oakland Raiders vs Philadelphia Eagles", clues:["Won the Super Bowl MVP with the Oakland Raiders","Was a castoff who had been given up on by two previous teams","Won the Heisman Trophy at Stanford","Won 2 Super Bowls with the Raiders"] },
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
  { player:"Sammy Baugh", sport:"🏈 NFL", answer:"SAMMY BAUGH", era:"legends", stats:{YDS:"1754",TD:"16",INT:"11",COMP:"56.2"}, ctx:"1945 NFL Season — Washington Redskins three-way leader", clues:["Led the NFL in passing, punting, AND interceptions in the same season","From Temple Texas — was a two-way star who also led the NFL in interceptions as a defensive back","Nicknamed Slingin Sammy","Is considered the greatest quarterback of the pre-modern era"] },
  { player:"Charley Trippi", sport:"🏈 NFL", answer:"CHARLEY TRIPPI", era:"legends", stats:{RUSH:"206",REC:"76",PASS:"130",TD:"8"}, ctx:"1947 NFL Championship — Chicago Cardinals winners", clues:["Led the Chicago Cardinals to their only NFL title","Was an All-American at Georgia","Could run, pass, catch, and return kicks at an elite level","Part of the Dream Backfield that won the 1947 championship"] },
  { player:"Steve Van Buren", sport:"🏈 NFL", answer:"STEVE VAN BUREN", era:"legends", stats:{CAR:"217",YDS:"1146",TD:"14",YPC:"5.3"}, ctx:"1945 NFL Season — Philadelphia Eagles rushing title", clues:["Led the NFL in rushing yards and touchdowns","Scored 14 touchdowns during this season","Led the Eagles to back-to-back NFL championships in 1948-49","The Eagles wore sneakers on icy field in the 1948 Championship"] },
  { player:"Marion Motley", sport:"🏈 NFL", answer:"MARION MOTLEY", era:"legends", stats:{CAR:"140",YDS:"810",AVG:"5.8",TD:"8"}, ctx:"1948 AAFC Season — Cleveland Browns champion", clues:["Won the AAFC championship with Cleveland Browns","Led the AAFC in rushing yards","Was one of the first Black players in professional football","Was a trailblazer for racial integration in pro football"] },
  { player:"Dante Lavelli", sport:"🏈 NFL", answer:"DANTE LAVELLI", era:"legends", stats:{REC:"47",YDS:"843",TD:"9",YPR:"17.9"}, ctx:"1946 AAFC Season — Cleveland Browns first champion", clues:["Won the AAFC championship in the league's very first season","Scored 9 touchdowns during this season","Nicknamed Gluefingers for his catching ability","Won 3 AAFC and 3 NFL championships"] },
  { player:"Bill Dudley", sport:"🏈 NFL", answer:"BILL DUDLEY", era:"legends", stats:{YDS:"604",INT:"10",RETURN:"385",TD:"6"}, ctx:"1946 NFL MVP Season — Pittsburgh Steelers", clues:["Won the NFL MVP award as the most versatile player","Led the NFL in rushing, interceptions, AND return yards","Scored 6 touchdowns during this season","Nicknamed Bullet Bill"] },
  { player:"Ken Strong", sport:"🏈 NFL", answer:"KEN STRONG", era:"legends", stats:{PTS:"64",RUSH:"219",KICK:"9FG",YEAR:"1934"}, ctx:"1934 NFL Championship — New York Giants sneakers game", clues:["Scored 17 points in the famous Sneakers Game championship","Giants players changed into basketball shoes at halftime for traction","This performance came during the 1934 NFL season","Was both a runner and a kicker"] },
  { player:"Spec Sanders", sport:"🏈 NFL", answer:"SPEC SANDERS", era:"legends", stats:{YDS:"1432",TD:"19",REC:"24",AVG:"8.6"}, ctx:"1947 AAFC Season — New York Yankees rushing leader", clues:["Led the AAFC in rushing AND scoring this season","The Yankees have won 27 World Series championships — by far the most of any team","Was a dual threat runner and receiver","Had one of the most dominant individual seasons in AAFC history"] },
  { player:"Norm Van Brocklin", sport:"🏈 NFL", answer:"NORM VAN BROCKLIN", era:"legends", stats:{YDS:"554",TD:"5",COMP:"27",DATE:"Sept 28 1951"}, ctx:"Sept 28 1951 — Single game NFL passing yards record", clues:["Set the all-time single-game passing yards record (554)","Scored 5 touchdowns during this season","Nicknamed The Dutchman","Won NFL championships as both a player and head coach"] },
  { player:"Tom Fears", sport:"🏈 NFL", answer:"TOM FEARS", era:"legends", stats:{REC:"77",YDS:"1013",TD:"9",YPR:"13.2"}, ctx:"1949 NFL Season — Los Angeles Rams receiving record", clues:["Set the NFL single-season receptions record with 77","Won the NFL championship with the Rams in 1951","Scored 9 touchdowns during this season","Was one of the first great wide receivers of the modern era"] },
  { player:"George McAfee", sport:"🏈 NFL", answer:"GEORGE MCAFEE", era:"legends", stats:{AVG:"8.0",TD:"5",INT:"7",YEAR:"1941"}, ctx:"1941 NFL Season — Chicago Bears All-Pro", clues:["Was the most dangerous return man of his era","Scored 5 touchdowns during this season","Won 2 NFL championships with Chicago","Was nicknamed One Play McAfee for his big-play ability"] },
  { player:"Dub Jones", sport:"🏈 NFL", answer:"DUB JONES", era:"legends", stats:{TD:"6",DATE:"Nov 25 1951",RUSH:"4",REC:"2"}, ctx:"Nov 25 1951 — Six touchdowns in one game vs Pittsburgh", clues:["Scored 6 touchdowns in a single game vs the Pittsburgh Steelers","Scored 6 touchdowns during this season","Tied Ernie Nevers NFL record for TDs in a game","His son Bert Jones also played quarterback in the NFL"] },
  { player:"Mac Speedie", sport:"🏈 NFL", answer:"MAC SPEEDIE", era:"legends", stats:{REC:"62",YDS:"1028",TD:"8",YPR:"16.6"}, ctx:"1947 AAFC Season — Cleveland Browns champion", clues:["Led the AAFC in receiving this season","Played alongside Dante Lavelli for the Cleveland Browns","Was considered one of the best receivers of the late 1940s","Later left to play in the Canadian Football League"] },
  { player:"Frankie Albert", sport:"🏈 NFL", answer:"FRANKIE ALBERT", era:"legends", stats:{YDS:"1847",TD:"29",INT:"10",COMP:"53.7"}, ctx:"1948 AAFC Season — San Francisco 49ers pioneer", clues:["Was the first great quarterback in San Francisco 49ers history","Led the 49ers in the AAFC for years","Was a left-handed quarterback — extremely rare in professional football","From Glendale, California"] },
  { player:"Tiger Woods", sport:"⛳ Golf", answer:"TIGER WOODS_2", era:"modern", stats:{WINS:"9",MAJORS:"3",AVG:"68.56",CUTS:"20"}, ctx:"2000 PGA Tour Season — Won 3 of 4 majors", clues:["Won 3 of 4 majors this year","Made every single cut on tour","Won the US Open by 15 strokes","The last name is a large wild animal"] },
  { player:"Phil Mickelson", sport:"⛳ Golf", answer:"PHIL MICKELSON_2", era:"modern", stats:{WINS:"4",MAJORS:"1",AVG:"69.1",EARN:"$4.7M"}, ctx:"2004 PGA Tour Season — First Masters title", clues:["Won his first Masters title after years of near misses","Had been called the best player without a major","Left-handed golfer nicknamed Lefty","Won by one shot at Augusta"] },
  { player:"Rory McIlroy", sport:"⛳ Golf", answer:"MCILROY_2", era:"modern", stats:{WINS:"5",MAJORS:"2",AVG:"68.83",EARN:"$8.3M"}, ctx:"2014 PGA Tour Season — Two majors and FedEx Cup", clues:["Won The Open Championship and PGA Championship this year","Won the FedEx Cup","From Holywood County Down Northern Ireland","Won 4 majors before age 26"] },
  { player:"Jordan Spieth", sport:"⛳ Golf", answer:"JORDAN SPIETH", era:"modern", stats:{WINS:"5",MAJORS:"2",AVG:"68.91",EARN:"$12.0M"}, ctx:"2015 PGA Tour Season — Masters and US Open", clues:["Won The Masters and US Open in the same year","Led every major at some point this year","From Dallas Texas","Won 3 major championships before age 24"] },
  { player:"Dustin Johnson", sport:"⛳ Golf", answer:"DUSTIN JOHNSON_2", era:"modern", stats:{SCORE:"-20",MARGIN:"5",R4:"68",YEAR:"2020"}, ctx:"2020 Masters — Record-setting win", clues:["Won The Masters by 5 shots setting the all-time scoring record","Set the 72-hole scoring record at Augusta at -20","From Columbia South Carolina","Won 2 major championships in his career"] },
  { player:"Brooks Koepka", sport:"⛳ Golf", answer:"BROOKS KOEPKA", era:"modern", stats:{WINS:"2",MAJORS:"2",YEAR:"2018",OPEN:"US"}, ctx:"2018 US Open — Back-to-back US Open champion", clues:["Won the US Open for the second consecutive year","Won 4 major championships in his career","From West Palm Beach Florida","Joined LIV Golf in 2022"] },
  { player:"Vijay Singh", sport:"⛳ Golf", answer:"VIJAY SINGH_2", era:"modern", stats:{WINS:"9",MAJORS:"1",AVG:"69.0",EARN:"$10.9M"}, ctx:"2004 PGA Tour Season — Dethroned Tiger Woods at No. 1", clues:["Won 9 tournaments and became World No. 1","Dethroned Tiger Woods at the top of the rankings","From Lautoka Fiji — first Fijian to reach World No. 1","Known for his intense practice work ethic"] },
  { player:"Ernie Els", sport:"⛳ Golf", answer:"ERNIE ELS_2", era:"classic", stats:{WINS:"4",MAJORS:"2",AVG:"69.8",EARN:"$6.8M"}, ctx:"1997 PGA Tour Season — Two US Open champion", clues:["Won 2 US Opens and 2 British Opens in his career","Nicknamed The Big Easy for his smooth swing","From Johannesburg South Africa","Won the US Open in 1994 and 1997"] },
  { player:"Sergio Garcia", sport:"⛳ Golf", answer:"SERGIO GARCIA", era:"modern", stats:{SCORE:"-9",PLAYOFF:"W",YEAR:"2017",HOLES:"1"}, ctx:"2017 Masters — First major after years of near misses", clues:["Won his first major at The Masters at age 37","Had been considered the best player without a major","From Borriol Spain","Beat Justin Rose in a playoff at Augusta"] },
  { player:"Adam Scott", sport:"⛳ Golf", answer:"ADAM SCOTT_2", era:"modern", stats:{SCORE:"-9",PLAYOFF:"W",YEAR:"2013",COUNTRY:"Australia"}, ctx:"2013 Masters — First Australian Masters winner", clues:["Became the first Australian to win The Masters","Won in a playoff over Angel Cabrera","From Adelaide South Australia","Was coached by Butch Harmon and worked with caddie Steve Williams"] },
  { player:"Henrik Stenson", sport:"⛳ Golf", answer:"HENRIK STENSON", era:"modern", stats:{SCORE:"-20",R4:"63",MARGIN:"3",YEAR:"2016"}, ctx:"2016 British Open — Epic duel with Mickelson", clues:["Won The Open Championship in an epic duel with Phil Mickelson","Shot 63 in the final round to win","From Gothenburg Sweden","Was nicknamed The Iceman for his calm demeanor"] },
  { player:"Justin Thomas", sport:"⛳ Golf", answer:"JUSTIN THOMAS", era:"modern", stats:{WINS:"5",MAJORS:"1",AVG:"69.18",EARN:"$9.9M"}, ctx:"2017 PGA Tour Season — PGA Championship and FedEx Cup", clues:["Won the PGA Championship and FedEx Cup this year","From Louisville Kentucky","Best friend with Jordan Spieth on tour","Won his second major at the 2022 PGA Championship"] },
  { player:"Jon Rahm", sport:"⛳ Golf", answer:"JON RAHM", era:"modern", stats:{SCORE:"-6",MARGIN:"1",YEAR:"2021",OPEN:"US"}, ctx:"2021 US Open — Jon Rahm wins first major", clues:["Won his first major at the US Open","Had tested positive for COVID two weeks before and had to withdraw while leading","From Barrika Spain","Later moved to LIV Golf in 2024"] },
  { player:"Lee Trevino", sport:"⛳ Golf", answer:"LEE TREVINO_2", era:"classic", stats:{WINS:"4",MAJORS:"2",EARN:"$3.2M",YEAR:"1971"}, ctx:"1971 PGA Tour — Three Opens in three weeks", clues:["Won the US Open Canadian Open and British Open in the same month","Won 6 major championships total","From Dallas Texas","Nicknamed Super Mex"] },
  { player:"Nick Faldo", sport:"⛳ Golf", answer:"NICK FALDO_2", era:"classic", stats:{WINS:"4",MAJORS:"2",AVG:"69.90",YEAR:"1990"}, ctx:"1990 PGA Tour Season — Masters and British Open", clues:["Won The Masters and The Open Championship this year","Won 6 major championships total","From Welwyn Garden City England","Rebuilt his swing from scratch with coach David Leadbetter"] },
  { player:"Seve Ballesteros", sport:"⛳ Golf", answer:"SEVE_2", era:"classic", stats:{WINS:"4",MAJORS:"1",AVG:"70.20",YEAR:"1984"}, ctx:"1984 British Open at St Andrews", clues:["Won The Open Championship at the home of golf","Won 5 major championships in his career","From Pedrena Spain","Pioneered European golf as a global force and inspired the Ryder Cup revival"] },
  { player:"Jack Nicklaus", sport:"⛳ Golf", answer:"JACK NICKLAUS", era:"classic", stats:{WINS:"7",MAJORS:"3",AVG:"70.2",YEAR:"1972"}, ctx:"1972 PGA Tour Season — Two majors", clues:["Won The Masters and US Open in the same year","Known as The Golden Bear","Holds the record for most major championships (18)","From Columbus Ohio"] },
  { player:"Tom Watson", sport:"⛳ Golf", answer:"TOM WATSON_2", era:"classic", stats:{WINS:"6",MAJORS:"2",EARN:"$1.2M",YEAR:"1982"}, ctx:"1982 PGA Tour Season — US Open and British Open double", clues:["Won the US Open with a famous chip-in on 17 at Pebble Beach","Won The Open Championship the same year","Won 8 majors total","From Kansas City Missouri"] },
  { player:"Greg Norman", sport:"⛳ Golf", answer:"GREG NORMAN_2", era:"classic", stats:{WINS:"3",MAJORS:"1",AVG:"69.10",YEAR:"1993"}, ctx:"1993 PGA Tour Season — British Open", clues:["Won The Open Championship this year by 2 shots","Reached World No. 1 for 331 weeks","From Mount Isa Queensland Australia","Nicknamed The Great White Shark"] },
  { player:"Curtis Strange", sport:"⛳ Golf", answer:"CURTIS STRANGE_2", era:"classic", stats:{WINS:"3",MAJORS:"2",EARN:"$1.1M",YEAR:"1989"}, ctx:"1989 PGA Tour Season — US Open back-to-back", clues:["Won the US Open for the second consecutive year","First player to earn over $1 million in a season","From Norfolk Virginia","Back-to-back US Open wins are extremely rare in golf"] },
  { player:"Sandy Lyle", sport:"⛳ Golf", answer:"SANDY LYLE_2", era:"classic", stats:{WINS:"2",MAJORS:"2",EARN:"$1.6M",YEAR:"1988"}, ctx:"1988 Masters — First British winner at Augusta", clues:["Became the first British player to win The Masters","His famous bunker shot on 18 is one of golf's most iconic moments","From Shrewsbury England of Scottish descent","Also won The Open Championship in 1985"] },
  { player:"Larry Mize", sport:"⛳ Golf", answer:"LARRY MIZE", era:"classic", stats:{CHIP:"45yds",HOLE:"11",PLAYOFF:"W",OPP:"Norman"}, ctx:"1987 Masters playoff — Famous chip-in vs Greg Norman", clues:["Chipped in from 45 yards on the 11th hole to beat Greg Norman","From Augusta Georgia — a hometown hero","Won in a sudden death playoff","This was his only major championship"] },
  { player:"Fred Couples", sport:"⛳ Golf", answer:"FRED COUPLES", era:"classic", stats:{WINS:"4",MAJORS:"1",AVG:"69.38",YEAR:"1992"}, ctx:"1992 Masters — Fred Couples wins first major", clues:["Won The Masters for his only major championship","His ball famously stayed on the bank on 12 and he made birdie","From Seattle Washington","Known as Boom Boom for his long driving"] },
  { player:"Bernhard Langer", sport:"⛳ Golf", answer:"BERNHARD LANGER_2", era:"classic", stats:{WINS:"4",MAJORS:"2",RYDER:"19.5",YEAR:"1993"}, ctx:"1993 Masters — Augusta National second win", clues:["Won his second Masters title this year","Won 2 Masters Championships","From Anhausen West Germany","Had the yips and reinvented his putting stroke"] },
  { player:"Hale Irwin", sport:"⛳ Golf", answer:"HALE IRWIN", era:"classic", stats:{WINS:"3",MAJORS:"1",AGE:"45",YEAR:"1990"}, ctx:"1990 US Open — Won at age 45", clues:["Won the US Open at age 45 — the oldest major winner at the time","Won 3 US Opens in his career","From Joplin Missouri","Was also a scholarship football player at the University of Colorado"] },
  { player:"Davis Love III", sport:"⛳ Golf", answer:"DAVIS LOVE_2", era:"classic", stats:{SCORE:"-11",MARGIN:"5",R4:"71",YEAR:"1997"}, ctx:"1997 PGA Championship — Kiawah Island", clues:["Won the PGA Championship at Kiawah Island","Dedicated the win to his father who died in a plane crash","From Charlotte North Carolina","Later became a prominent Ryder Cup captain"] },
  { player:"Ian Woosnam", sport:"⛳ Golf", answer:"IAN WOOSNAM", era:"classic", stats:{WINS:"1",MAJORS:"1",WORLD_NO1:"Yes",YEAR:"1991"}, ctx:"1991 Masters — Welsh champion reaches World No. 1", clues:["Won The Masters and became World No. 1","Only 5ft 4in — one of the shortest players to reach World No. 1","From Oswestry England of Welsh descent","Was known for his incredible distance given his small stature"] },
  { player:"Mark O'Meara", sport:"⛳ Golf", answer:"MARK OMEARA", era:"classic", stats:{WINS:"2",MAJORS:"2",AVG:"70.47",YEAR:"1998"}, ctx:"1998 PGA Tour Season — Masters and British Open at age 41", clues:["Won The Masters and The Open Championship in the same year at age 41","Was a close friend of Tiger Woods for many years","From Goldsboro North Carolina","Won both his majors in his late 30s and early 40s"] },
  { player:"Bob Tway", sport:"⛳ Golf", answer:"BOB TWAY", era:"classic", stats:{SCORE:"-12",BUNKER:"1",HOLE:"18",OPP:"Norman"}, ctx:"1986 PGA Championship — Bunker shot to beat Norman", clues:["Holed out from a bunker on the 72nd hole to win the PGA Championship","Came from behind to beat Greg Norman","From Oklahoma City Oklahoma","Greg Norman suffered multiple late-charge collapses in his career"] },
  { player:"Payne Stewart", sport:"⛳ Golf", answer:"PAYNE STEWART_2", era:"classic", stats:{PUTT:"1",HOLE:"18",YEAR:"1999",OPEN:"US"}, ctx:"1999 US Open — Pinehurst No. 2", clues:["Sank the winning putt on the 18th to win the US Open","Was killed in a plane crash 4 months after this win","From Springfield Missouri","Known for wearing knickerbockers and tam o'shanter caps"] },
  { player:"Bobby Orr", sport:"🏒 NHL", answer:"BOBBY ORR_2", era:"classic", stats:{G:"46",AST:"102",PTS:"148",PM:"+124"}, ctx:"1970-71 NHL Season — Boston Bruins scoring leader", clues:["Defenseman who led the entire league in scoring","The Bruins have the second most Stanley Cup championships in NHL history","Revolutionized the defenseman position","Won 8 consecutive Norris Trophies"] },
  { player:"Gordie Howe", sport:"🏒 NHL", answer:"GORDIE HOWE", era:"legends", stats:{G:"49",AST:"46",PTS:"95",PIM:"72"}, ctx:"1952-53 NHL Season — Detroit Red Wings", clues:["Known as Mr. Hockey","The Red Wings won 4 Cups in 11 years forming the last great NHL dynasty","Played in 5 different decades of professional hockey","A Gordie Howe Hat Trick is a goal, assist, and fight in one game"] },
  { player:"Jean Beliveau", sport:"🏒 NHL", answer:"JEAN BELIVEAU_2", era:"legends", stats:{G:"37",AST:"69",PTS:"106",PIM:"38"}, ctx:"1964-65 NHL Season — Montreal Canadiens Hart Trophy MVP", clues:["Won the Hart Trophy as league MVP","Won 10 Stanley Cups as a player","The Canadiens have won the Stanley Cup 24 times — by far the most of any franchise","Was offered the position of Governor General of Canada and declined"] },
  { player:"Maurice Richard", sport:"🏒 NHL", answer:"ROCKET RICHARD", era:"legends", stats:{G:"50",AST:"25",PTS:"75",PIM:"75"}, ctx:"1944-45 NHL Season — First to score 50 goals in 50 games", clues:["First player to score 50 goals in 50 games — a record for 36 years","The Canadiens have won the Stanley Cup 24 times — by far the most of any franchise","Nicknamed The Rocket","The Richard Riot in 1955 showed his extraordinary popularity in Montreal"] },
  { player:"Bobby Hull", sport:"🏒 NHL", answer:"BOBBY HULL_2", era:"legends", stats:{G:"54",AST:"43",PTS:"97",PIM:"70"}, ctx:"1965-66 NHL Season — Chicago Blackhawks goals record", clues:["Scored 54 goals — first player to score 50 twice","The Blackhawks won 3 Cups in 6 years forming the most recent NHL dynasty","Known as The Golden Jet for his speed and blonde hair","Was the first player to score 50 goals in a season twice"] },
  { player:"Phil Esposito", sport:"🏒 NHL", answer:"PHIL ESPOSITO_2", era:"classic", stats:{G:"76",AST:"76",PTS:"152",PIM:"71"}, ctx:"1970-71 NHL Season — Boston Bruins goals record", clues:["Scored 76 goals — shattering the previous record","The Bruins have the second most Stanley Cup championships in NHL history","His record stood until Gretzky broke it","Italian-Canadian player who transformed the center position"] },
  { player:"Terry Sawchuk", sport:"🏒 NHL", answer:"TERRY SAWCHUK", era:"legends", stats:{GAA:"1.90",SO:"12",W:"44",YEAR:"1952"}, ctx:"1951-52 NHL Season — Detroit Red Wings Vezina winner", clues:["Won the Vezina Trophy with a 1.90 GAA and 12 shutouts","All-time NHL leader in shutouts with 103","The Red Wings won 4 Cups in 11 years forming the last great NHL dynasty","Won 4 Stanley Cups in his career"] },
  { player:"Glenn Hall", sport:"🏒 NHL", answer:"GLENN HALL_2", era:"legends", stats:{GAA:"2.10","SV%":".918",SO:"7",STREAK:"502"}, ctx:"Career — Played 502 consecutive complete games", clues:["Was so nervous before games that he would vomit in the locker room — every single game","Won 3 Vezina Trophies as best goaltender","Nicknamed Mr. Goalie","Was so nervous before games he would vomit every pre-game"] },
  { player:"Jacques Plante", sport:"🏒 NHL", answer:"JACQUES PLANTE", era:"legends", stats:{GAA:"2.11",SO:"82",VEZINA:"7",MASK:"1"}, ctx:"Career — Inventor of the goalie mask", clues:["First goaltender to regularly wear a mask after being cut by a shot in 1959","Won 7 Vezina Trophies as best goaltender","Won 6 Stanley Cups with Montreal Canadiens","First goaltender to roam from the crease regularly"] },
  { player:"Elmer Lach", sport:"🏒 NHL", answer:"ELMER LACH_2", era:"legends", stats:{G:"26",AST:"54",PTS:"80",YEAR:"1945"}, ctx:"1944-45 NHL Season — Punch Line center", clues:["Was the center of the famous Punch Line with Rocket Richard and Toe Blake","Won the Hart Trophy as league MVP this season","Won 3 Stanley Cups with Montreal","Was known as a superb passer who set up Richard"] },
  { player:"Nels Stewart", sport:"🏒 NHL", answer:"NELS STEWART", era:"legends", stats:{G:"324",PTS:"515",YEAR:"1940",TEAMS:"3"}, ctx:"Career — First NHL player to score 300 goals", clues:["Was nicknamed Old Poison because his shot was virtually impossible to read for goalies","The Bruins have the second most Stanley Cup championships in NHL history","Won the Hart Trophy twice as league MVP","Nicknamed Old Poison for his deadly shooting"] },
  { player:"Cy Denneny", sport:"🏒 NHL", answer:"CY DENNENY", era:"legends", stats:{G:"318",YEAR:"1929",TEAM:"Senators",STANLEY_CUPS:"4"}, ctx:"Career — Ottawa Senators early NHL scoring leader", clues:["Was the NHL all-time leading scorer when he retired","Won 4 Stanley Cups with the Ottawa Senators","Was one of the top goal scorers of the early NHL era","Played in the NHL's first season in 1917-18"] },
  { player:"Toe Blake", sport:"🏒 NHL", answer:"TOE BLAKE_2", era:"legends", stats:{G:"26",AST:"43",PTS:"69",YEAR:"1945"}, ctx:"1944-45 NHL Season — Montreal Canadiens Hart Trophy MVP", clues:["Won the Hart Trophy as league MVP","Won the NHL scoring title this year","Won 3 Stanley Cups as a player","Won 8 Stanley Cups as coach of the Montreal Canadiens"] },
  { player:"Milt Schmidt", sport:"🏒 NHL", answer:"MILT SCHMIDT_2", era:"legends", stats:{G:"27",AST:"35",PTS:"62",YEAR:"1952"}, ctx:"Career — Boston Bruins center and team leader", clues:["Was the captain of the Boston Bruins for many years","Won 2 Stanley Cups with the Bruins","Was part of the famous Kraut Line","Later coached the Bruins and managed the team"] },
  { player:"Frank Mahovlich", sport:"🏒 NHL", answer:"FRANK MAHOVLICH", era:"legends", stats:{G:"48",AST:"32",PTS:"80",PIM:"131"}, ctx:"1960-61 NHL Season — Toronto Maple Leafs record", clues:["Scored 48 goals this season — a Maple Leafs record at the time","Won 6 Stanley Cups in his career — 4 with Toronto and 2 with Montreal","Nicknamed The Big M","Won 6 Stanley Cups in his career"] },
  { player:"Red Kelly", sport:"🏒 NHL", answer:"RED KELLY_2", era:"legends", stats:{G:"20",AST:"50",PTS:"70",YEAR:"1960"}, ctx:"Career — Two-position champion and politician", clues:["Won 4 Stanley Cups with Detroit and 4 more with Toronto — 8 total","Won the Norris Trophy as best defenseman in 1954","Later transitioned to play center — rare for a defenseman","Also served as a Member of Parliament while playing hockey"] },
  { player:"Doug Bentley", sport:"🏒 NHL", answer:"DOUG BENTLEY", era:"legends", stats:{G:"33",AST:"40",PTS:"73",YEAR:"1943"}, ctx:"1942-43 NHL Season — Chicago Blackhawks scoring title", clues:["Won the NHL scoring title this season","The Blackhawks won 3 Cups in 6 years forming the most recent NHL dynasty","Was part of one of hockey's greatest sibling trios","Was an All-Star despite never winning a Stanley Cup"] },
  { player:"Max Bentley", sport:"🏒 NHL", answer:"MAX BENTLEY", era:"legends", stats:{G:"29",AST:"43",PTS:"72",YEAR:"1946"}, ctx:"1945-46 NHL Season — Chicago Blackhawks MVP", clues:["Won the Hart Trophy as league MVP this season","Nicknamed The Dipsy-Doodle Dandy from Delisle for his stickhandling","Was traded in the most shocking deal of his era for 5 players","Won Stanley Cups with the Toronto Maple Leafs"] },
  { player:"Greg Maddux", sport:"⚾ MLB", answer:"GREG MADDUX", era:"modern", stats:{ERA:"3.16",W:"355",SO:"3371",CY:"4"}, ctx:"Career Totals — 4 consecutive Cy Young Awards", clues:["Once threw a complete game so efficient it lasted under 80 minutes","Won 355 career games","From Las Vegas Nevada — nicknamed The Professor","Posted an ERA of 3.16 — among the best of the season"] },
  { player:"Pedro Martinez", sport:"⚾ MLB", answer:"PEDRO MARTINEZ", era:"modern", stats:{ERA:"2.93",W:"219",CY:"3",ERA_PLUS:"154"}, ctx:"Career Totals — Highest ERA+ of any 200-win pitcher", clues:["Had an ERA+ of 154 — highest ever for a 200-win pitcher","Won 3 Cy Young Awards","From Manoguayabo Dominican Republic","Had arguably the greatest 3-year stretch in pitching history 1997-2000"] },
  { player:"Roger Clemens", sport:"⚾ MLB", answer:"ROGER CLEMENS", era:"modern", stats:{W:"354",SO:"4672",ERA:"3.12",CY:"7"}, ctx:"Career Totals — 7 Cy Young Awards the most ever", clues:["Won 7 Cy Young Awards — the most by any pitcher in history","Struck out 4672 batters","From Dayton Ohio","Was called The Rocket for his fastball"] },
  { player:"Orel Hershiser", sport:"⚾ MLB", answer:"OREL HERSHISER", era:"classic", stats:{STREAK:"59",ERA:"2.26",W:"23",YEAR:"1988"}, ctx:"Best Season — Set an all-time MLB scoreless innings record", clues:["Nicknamed Bulldog by manager Tommy Lasorda","The Dodgers moved from Brooklyn to Los Angeles in 1958 breaking New York hearts","Won the NL Cy Young and World Series MVP that year","Was nominated for a Grammy Award after singing on The Tonight Show following his record season"] },
  { player:"Curt Schilling", sport:"⚾ MLB", answer:"CURT SCHILLING", era:"modern", stats:{W:"216",SO:"3116",SOCK:"Bloody",YEAR:"2004"}, ctx:"Career Totals — The Bloody Sock World Series hero", clues:["Pitched through a sutured torn tendon in the famous Bloody Sock game","Won 216 career games","Was voted into the Hall of Fame after years of controversy","From Anchorage Alaska"] },
  { player:"Tom Glavine", sport:"⚾ MLB", answer:"TOM GLAVINE", era:"modern", stats:{W:"305",ERA:"3.54",CY:"2",YEAR:"1998"}, ctx:"Career Totals — Won 305 games as the finesse left-hander", clues:["Won 305 career games with 2 Cy Young Awards","The Braves won 14 consecutive division titles — one of the most sustained runs in sport","From Concord Massachusetts","Was also a highly recruited hockey player growing up"] },
  { player:"Sandy Koufax", sport:"⚾ MLB", answer:"SANDY KOUFAX", era:"classic", stats:{ERA:"2.76",W:"165",NO_H:"4",CY:"3"}, ctx:"Career Totals — 4 no-hitters and 3 Cy Youngs before age 31", clues:["Threw 4 no-hitters including a perfect game","Won 3 Cy Young Awards in 4 years","The Dodgers moved from Brooklyn to Los Angeles in 1958 breaking New York hearts","Retired at 30 due to severe arthritis — many say he was the best ever"] },
  { player:"Bob Gibson", sport:"⚾ MLB", answer:"BOB GIBSON", era:"legends", stats:{ERA:"1.12",W:"22",SO:"268",YEAR:"1968"}, ctx:"Best Season — 1.12 ERA in 1968 changed baseball rules", clues:["Had a 1.12 ERA so dominant that MLB lowered the pitching mound the next year","Won both the Cy Young and MVP","The Cardinals have won 11 World Series championships — second most all-time","Was one of the most intimidating pitchers of his era"] },
  { player:"Tom Seaver", sport:"⚾ MLB", answer:"TOM SEAVER", era:"classic", stats:{W:"311",ERA:"2.86",SO:"3640",CY:"3"}, ctx:"Career Totals — Tom Terrific with 3 Cy Youngs", clues:["Won 311 games with a 2.86 career ERA","Won 3 Cy Young Awards","Led the 1969 Miracle Mets to the World Series","Nicknamed Tom Terrific"] },
  { player:"Juan Marichal", sport:"⚾ MLB", answer:"JUAN MARICHAL", era:"classic", stats:{W:"243",ERA:"2.89",CG:"244",KICK:"High leg"}, ctx:"Career Totals — Dominican Dandy with the famous high leg kick", clues:["Won 243 games with a 2.89 ERA","Known for his distinctive high leg kick delivery","The Giants moved from New York to San Francisco in 1958 alongside the Dodgers","From Laguna Verde Dominican Republic — nickname The Dominican Dandy"] },
  { player:"Whitey Ford", sport:"⚾ MLB", answer:"WHITEY FORD", era:"classic", stats:{PCT:".690",W:"236",ERA:"2.75",WS:"Record"}, ctx:"Career Totals — The Chairman of the Board for the Yankees dynasty", clues:["Had a .690 winning percentage — highest for any 200-win pitcher","Won 236 games for the New York Yankees","Holds the World Series record for consecutive scoreless innings","Nicknamed The Chairman of the Board"] },
  { player:"Fergie Jenkins", sport:"⚾ MLB", answer:"FERGIE JENKINS", era:"classic", stats:{W:"284",SO:"3192",BB:"997",CANADA:"First HoF"}, ctx:"Career Totals — First Canadian in the Baseball Hall of Fame", clues:["Was the first Canadian player inducted into the Baseball Hall of Fame","Won 284 games with remarkable control — only 997 walks in 4500+ innings","Won the NL Cy Young in 1971","From Chatham Ontario Canada"] },
  { player:"Gaylord Perry", sport:"⚾ MLB", answer:"GAYLORD PERRY", era:"classic", stats:{W:"314",CY:"2",BOTH:"AL and NL",SPITTER:"Suspected"}, ctx:"Career Totals — Won Cy Young in both leagues", clues:["Won the Cy Young Award in both the AL and NL — first pitcher to do so","Always suspected of throwing a spitball but rarely caught","Won 314 career games","Wrote a book called Me and the Spitter"] },
  { player:"Jim Palmer", sport:"⚾ MLB", answer:"JIM PALMER", era:"classic", stats:{W:"268",ERA:"2.86",CY:"3",SLAM:"None given up"}, ctx:"Career Totals — Never gave up a grand slam in his career", clues:["Never allowed a grand slam in his entire career","Won 3 Cy Young Awards with the Baltimore Orioles","Won 268 games","Was also a famous Jockey underwear model"] },
  { player:"Walter Johnson", sport:"⚾ MLB", answer:"WALTER JOHNSON", era:"legends", stats:{W:"417",ERA:"2.17",SO:"3508",SHO:"110"}, ctx:"Career Totals — The Big Train of Washington", clues:["Won 417 games — second most all-time","Pitched his entire career for the Washington Senators","Nicknamed The Big Train for his blazing fastball","Had 110 career shutouts — the most in baseball history"] },
  { player:"Christy Mathewson", sport:"⚾ MLB", answer:"CHRISTY MATHEWSON", era:"legends", stats:{W:"373",ERA:"2.13",SO:"2507",PITCH:"Fadeaway"}, ctx:"Career Totals — Gentleman pitcher of the Giants", clues:["Won 373 games with a 2.13 ERA","Invented the fadeaway pitch now called a screwball","Posted an ERA of 2.13 — among the best of the season","Was considered a gentleman and role model in an era of rough players"] },
  { player:"Ty Cobb", sport:"⚾ MLB", answer:"TY COBB", era:"legends", stats:{AVG:".366",H:"4189",SB:"897",TITLES:"12"}, ctx:"Career Totals — Highest batting average in history", clues:["Was one of the most combative and feared players in baseball history","Had 4189 career hits — second most all-time","Won 12 batting titles","From Narrows Georgia — was one of baseballs most feared players"] },
  { player:"Babe Ruth", sport:"⚾ MLB", answer:"BABE RUTH", era:"legends", stats:{SLG:".690",RBI:"2213",ERA:"2.28",TEAMS:"Yankees/Red Sox"}, ctx:"Career Totals — The Sultan of Swat", clues:["Had a career ERA of 2.28 as a pitcher before converting to outfield","Had a career slugging percentage of .690 — the all-time record","Also had a career ERA of 2.28 as a pitcher before converting to outfield","From Baltimore Maryland"] },
  { player:"Rogers Hornsby", sport:"⚾ MLB", answer:"ROGERS HORNSBY", era:"legends", stats:{AVG:".358",HR:"301",RBI:"1584",TITLES:"7"}, ctx:"Career Totals — Greatest right-handed hitter in history", clues:["Had a career batting average of .358 — second highest in history","Won 7 batting titles including 5 consecutive","Won the Triple Crown twice","Refused to read or go to movies to protect his eyesight"] },
  { player:"Lou Gehrig", sport:"⚾ MLB", answer:"LOU GEHRIG", era:"legends", stats:{HR:"493",RBI:"1995",AVG:".340",CAREER:"Yankees 1st baseman"}, ctx:"Career Totals — The Iron Horse", clues:["The Yankees have won 27 World Series championships — by far the most of any team","Had 1995 career RBI — second most all-time","The Yankees have won 27 World Series championships — by far the most of any team","His farewell speech after being diagnosed with ALS is the most moving in sports history"] },
  { player:"Shoeless Joe Jackson", sport:"⚾ MLB", answer:"SHOELESS JOE JACKSON", era:"legends", stats:{AVG:".356",H:"1772",TRIPLES:"168",BAN:"Lifetime"}, ctx:"Career Totals — Third highest average ever with a lifetime ban", clues:["Had the third highest career batting average in history at .356","Was banned from baseball for life after the 1919 Black Sox scandal","From Brandon Mills South Carolina","Was considered the purest natural hitter of the dead ball era"] },
  { player:"Honus Wagner", sport:"⚾ MLB", answer:"HONUS WAGNER", era:"legends", stats:{AVG:".328",H:"3420",SB:"723",CARD:"Most valuable"}, ctx:"Career Totals — The Flying Dutchman shortstop", clues:["His 1909 baseball card sold for over 6 million — the most valuable ever","Won 8 batting titles in his career","Played during the Pirates dynasty years alongside Roberto Clemente and Willie Stargell","Nicknamed The Flying Dutchman — considered the greatest shortstop ever"] },
  { player:"Lefty Grove", sport:"⚾ MLB", answer:"LEFTY GROVE", era:"legends", stats:{W:"300",ERA:"3.06",PCT:".680",MVP:"1931"}, ctx:"Career Totals — .680 winning percentage and MVP", clues:["Won 300 games with a .680 winning percentage — one of the best ever","Won the MVP award in 1931 going 31-4","The Red Sox ended an 86-year championship drought known as the Curse of the Bambino","Considered one of the best left-handed pitchers in baseball history"] },
  { player:"Nap Lajoie", sport:"⚾ MLB", answer:"NAP LAJOIE", era:"legends", stats:{AVG:".338",H:"3242",RBI:"1599",NAMED:"Team"}, ctx:"Career Totals — The team was named after him", clues:["Had a career batting average of .338","The Cleveland team was renamed the Naps after him","Won the batting title 4 times","Was considered the best second baseman of the dead ball era"] },
  { player:"Tris Speaker", sport:"⚾ MLB", answer:"TRIS SPEAKER", era:"legends", stats:{AVG:".345",DOUBLES:"792",H:"3514",CF:"Greatest"}, ctx:"Career Totals — Most doubles ever and greatest defensive CF", clues:["Has the most doubles in baseball history with 792","Had 3514 career hits — fourth most all-time","Was considered the greatest defensive center fielder who ever lived","Batted .345 during this standout season"] },
  { player:"Hack Wilson", sport:"⚾ MLB", answer:"HACK WILSON", era:"legends", stats:{HR:"56",RBI:"191",AVG:".307",YEAR:"1930"}, ctx:"Best Season — 56 HR and 191 RBI in 1930", clues:["Holds the all-time MLB record for RBI in a season with 191","Hit 56 home runs — still the NL record","The Cubs ended a 108-year World Series drought in 2016 in one of sports greatest moments","Was only 5ft 6in and 195 pounds"] },
  { player:"Harry Heilmann", sport:"⚾ MLB", answer:"HARRY HEILMANN", era:"legends", stats:{AVG:".342",TITLES:"4",ODD:"Odd years only",YEAR:"1927"}, ctx:"Career Totals — Won batting title only in odd years", clues:["Won 4 batting titles — all in odd years 1921 1923 1925 1927","Had a career batting average of .342","The Tigers have one of baseball's most storied franchises featuring Ty Cobb Hank Greenberg and Al Kaline","Coached by Cobb who played for the same team"] },
  { player:"Pie Traynor", sport:"⚾ MLB", answer:"PIE TRAYNOR", era:"legends", stats:{AVG:".320",RBI:"1273",TEAM:"Pittsburgh",BEST:"3B of era"}, ctx:"Career Totals — Greatest third baseman of the pre-war era", clues:["Was consistently voted the greatest third baseman of his era","Played his entire career for the Pittsburgh Pirates","Batted .320 career average","Was named Harold Joseph but called Pie since childhood"] },
  { player:"Fernando Torres", sport:"⚽ Soccer", answer:"FERNANDO TORRES", era:"modern", stats:{G:"33",APP:"38",YEAR:"2008",COUNTRY:"Spain"}, ctx:"Best Season — 33 Premier League goals in first Liverpool season", clues:["Scored 33 goals in his debut Premier League season","Liverpool have won 6 European Cups — more than any other English club","From Fuenlabrada Spain","Won the World Cup and European Championship with Spain"] },
  { player:"Wayne Rooney", sport:"⚽ Soccer", answer:"WAYNE ROONEY", era:"modern", stats:{G:"253",APP:"559",RECORD:"Man United",COUNTRY:"England"}, ctx:"Career Totals — Manchester United and England all-time top scorer", clues:["Became Manchester United all-time record scorer with 253 goals","Was also England all-time top scorer","From Croxteth Liverpool","Was considered the most complete English player of his generation"] },
  { player:"Zlatan Ibrahimovic", sport:"⚽ Soccer", answer:"ZLATAN IBRAHIMOVIC", era:"modern", stats:{G:"570+",LEAGUES:"7",COUNTRY:"Sweden",STYLE:"Acrobatic"}, ctx:"Career Totals — Won league titles in 7 different countries", clues:["Won league titles in the Netherlands Italy Spain France England and Sweden","Scored over 570 career goals","From Malmo Sweden","Was known for outrageous goals and extraordinary self-confidence"] },
  { player:"Didier Drogba", sport:"⚽ Soccer", answer:"DIDIER DROGBA_2", era:"modern", stats:{G:"164",UCL:"2012",NATION:"Peace",APP:"381"}, ctx:"Career Totals — Chelsea legend who helped stop a civil war", clues:["Is credited with helping temporarily stop a civil war in the Ivory Coast","Scored the equalizer in the 2012 Champions League Final","Scored 164 goals for Chelsea","Won 4 Premier League titles with Chelsea"] },
  { player:"Patrick Kluivert", sport:"⚽ Soccer", answer:"PATRICK KLUIVERT", era:"classic", stats:{G:"40",UCL:"18yo",YEAR:"1995",COUNTRY:"Netherlands"}, ctx:"Career Totals — Scored winning Champions League goal at age 18", clues:["Scored the winning goal in the 1995 Champions League Final aged just 18","Barcelona is owned by its members — a cooperative with over 150000 supporter-owners","From Amsterdam Netherlands","Was considered one of the most talented strikers of the late 1990s"] },
  { player:"Gabriel Batistuta", sport:"⚽ Soccer", answer:"GABRIEL BATISTUTA", era:"classic", stats:{G:"54",COUNTRY:"Argentina",CLUB:"Fiorentina",NICK:"Batigol"}, ctx:"Career Totals — Argentina all-time top scorer", clues:["Was Argentina all-time top scorer with 54 goals","Fiorentina are one of Italy's most beloved clubs despite never winning the European Cup","Nicknamed Batigol","From Reconquista Argentina"] },
  { player:"Hristo Stoichkov", sport:"⚽ Soccer", answer:"HRISTO STOICHKOV_2", era:"classic", stats:{BALLON:"1",YEAR:"1994",BARCA:"4 La Liga",COUNTRY:"Bulgaria"}, ctx:"Career Totals — Ballon d Or winner and 1994 World Cup Golden Boot", clues:["Won the Ballon d Or in 1994","Led Bulgaria to a shocking World Cup semifinal","Won 4 consecutive La Liga titles with Barcelona under Johan Cruyff","From Plovdiv Bulgaria"] },
  { player:"Gheorghe Hagi", sport:"⚽ Soccer", answer:"GHEORGHE HAGI", era:"classic", stats:{G:"35",COUNTRY:"Romania",NICK:"Maradona of Carpathians",YEAR:"1994"}, ctx:"Career Totals — The Maradona of the Carpathians", clues:["Led Romania to the 1994 World Cup quarterfinals","Nicknamed The Maradona of the Carpathians","Real Madrid have won the most UEFA Champions League titles of any club in history","From Sacele Romania"] },
  { player:"Jari Litmanen", sport:"⚽ Soccer", answer:"JARI LITMANEN", era:"classic", stats:{G:"32",UCL:"1995",COUNTRY:"Finland",KING:"Ajax"}, ctx:"Career Totals — The King of Ajax from Finland", clues:["Was the creative genius behind the 1995 Ajax Champions League winners","Nicknamed The King at Ajax","From Hollola Finland — the greatest Finnish player ever","Liverpool have won 6 European Cups — more than any other English club"] },
  { player:"Johan Cruyff", sport:"⚽ Soccer", answer:"JOHAN CRUYFF_2", era:"legends", stats:{BALLON:"3",TURN:"Named after him",TOTAL:"Football",YEAR:"1974"}, ctx:"Career Totals — 3 Ballons d Or and creator of Total Football", clues:["Won 3 Ballon d Or awards","Developed Total Football as a tactical system with Ajax and the Netherlands","The Cruyff Turn is named after him from the 1974 World Cup","Never won the World Cup despite being the best player in 1974"] },
  { player:"Sandor Kocsis", sport:"⚽ Soccer", answer:"SANDOR KOCSIS", era:"legends", stats:{G:"11",APP:"6",YEAR:"1954",HEAD:"Golden"}, ctx:"1954 World Cup — Hungary's lethal header specialist", clues:["Scored 11 goals in 6 games at the 1954 World Cup","Nicknamed The Golden Head for his aerial ability","Hungary was considered the best team in the world but lost the final","Scored 75 goals in 68 games for Hungary"] },
  { player:"Stanley Matthews", sport:"⚽ Soccer", answer:"STANLEY MATTHEWS", era:"legends", stats:{CAREER:"33 years",BALLON:"1956",FA_CUP:"1953",WIZARD:"Dribbling"}, ctx:"Career Totals — Played top-flight football until age 50", clues:["Played in the First Division until age 50 — a record that will never be broken","Won the first ever Ballon d Or in 1956","The 1953 FA Cup Final is called The Matthews Final in his honor","Nicknamed The Wizard of the Dribble"] },
  { player:"Tostao", sport:"⚽ Soccer", answer:"TOSTAO", era:"classic", stats:{G:"8",APP:"54",YEAR:"1970",EYE:"Surgery pre-WC"}, ctx:"1970 World Cup — Won despite needing pre-tournament eye surgery", clues:["Won the World Cup with the legendary 1970 Brazil team","Nearly missed the tournament after needing emergency eye surgery","Played alongside Pele Rivelino and Jairzinho","Retired at age 26 on medical advice"] },
  { player:"Raymond Kopa", sport:"⚽ Soccer", answer:"RAYMOND KOPA", era:"legends", stats:{BALLON:"1958",UCL:"3",NATION:"France",FIRST:"French Ballon"}, ctx:"Career Totals — First French Ballon d Or winner", clues:["Won the Ballon d Or in 1958 — the first French player to do so","Won 3 consecutive European Cups with Real Madrid","From Noeux-les-Mines France of Polish descent","Was part of the Real Madrid dynasty alongside Di Stefano"] },
  { player:"Helmut Rahn", sport:"⚽ Soccer", answer:"HELMUT RAHN", era:"legends", stats:{G:"21",WC_FINAL:"Winner",YEAR:"1954",NICK:"Der Boss"}, ctx:"1954 World Cup Final — Scored the winner in the Miracle of Bern", clues:["Scored the winning goal in the 1954 World Cup Final for West Germany","West Germany beat heavily favored Hungary in the Miracle of Bern","Scored 21 goals during this tournament or season","Nicknamed Der Boss"] },
  { player:"Pete Sampras", sport:"🎾 ATP", answer:"PETE SAMPRAS", era:"modern", stats:{GRAND_SLAMS:"14",WIMBLEDON:"7x winner",WORLD_NO1:"Yes",WEEKS:"286"}, ctx:"Career Totals — 14 Grand Slams and 286 weeks at World No. 1", clues:["Won 14 Grand Slam titles in his career","Spent 286 weeks at World No. 1 — a record at the time","Won Wimbledon 7 times and the US Open 5 times","From Washington DC — nickname Pistol Pete"] },
  { player:"Andre Agassi", sport:"🎾 ATP", answer:"ANDRE AGASSI", era:"modern", stats:{GRAND_SLAMS:"8",CAREER_SLAM:"All 4 majors",WORLD_NO1:"Yes",YEAR:"1999"}, ctx:"Career Totals — Won all 4 Grand Slams completing Career Grand Slam", clues:["Won all 4 Grand Slam titles to complete the Career Grand Slam","Was once ranked No. 141 before coming back to win more majors","From Las Vegas Nevada","Was married to Brooke Shields and later Steffi Graf"] },
  { player:"Stefan Edberg", sport:"🎾 ATP", answer:"STEFAN EDBERG", era:"modern", stats:{GRAND_SLAMS:"6",WORLD_NO1:"Yes",SPORTSMANSHIP:"Award named",YEAR:"1990"}, ctx:"Career Totals — Serve-volley champion with sportsmanship award named after him", clues:["Won 6 Grand Slam titles","Was a classic serve and volley player","The Stefan Edberg Sportsmanship Award is named after him","From Vastervik Sweden"] },
  { player:"Boris Becker", sport:"🎾 ATP", answer:"BORIS BECKER", era:"modern", stats:{GRAND_SLAMS:"6",WIMBLEDON:"3x winner",AGE:"17",YEAR:"1985"}, ctx:"Career Totals — Won Wimbledon at 17 then 5 more Slams", clues:["Won Wimbledon at age 17 — the youngest winner ever","Won 6 Grand Slam titles in his career","From Leimen West Germany","Was known for his big serve and diving volleys"] },
  { player:"Martina Hingis", sport:"🎾 WTA", answer:"MARTINA HINGIS", era:"modern", stats:{GRAND_SLAMS:"5",WORLD_NO1:"Yes",AGE:"16",YEAR:"1997"}, ctx:"Career Totals — Youngest World No. 1 in history at age 16", clues:["Won 5 Grand Slam singles titles","Was the youngest player to reach World No. 1 at age 16","From Kosice Czechoslovakia but representing Switzerland","Was named after Martina Navratilova by her tennis-playing mother"] },
  { player:"Lindsay Davenport", sport:"🎾 WTA", answer:"LINDSAY DAVENPORT", era:"modern", stats:{GRAND_SLAMS:"3",WORLD_NO1:"Yes",WIMBLEDON:"1x winner",YEAR:"1998"}, ctx:"Career Totals — World No. 1 American champion with 3 Slams", clues:["Won 3 Grand Slam titles and reached World No. 1","Won the US Open Australian Open and Wimbledon","From Palos Verdes California","Was known for her powerful groundstrokes"] },
  { player:"Venus Williams", sport:"🎾 WTA", answer:"VENUS WILLIAMS_2", era:"modern", stats:{GRAND_SLAMS:"7",WIMBLEDON:"5x winner",PIONEER:"Yes",YEAR:"2001"}, ctx:"Career Totals — 7 Grand Slams and trailblazer", clues:["Won 7 Grand Slam singles titles","Won Wimbledon 5 times","From Compton California","Was a trailblazer for Black players in tennis alongside her sister Serena"] },
  { player:"Kim Clijsters", sport:"🎾 WTA", answer:"KIM CLIJSTERS", era:"modern", stats:{GRAND_SLAMS:"4",US:"3",COMEBACK:"3 slams as mom",YEAR:"2009"}, ctx:"Career Totals — Won 3 Slams after coming out of retirement", clues:["Won 4 Grand Slam titles in her career","Made a remarkable comeback winning 3 slams after retiring","Won 3 US Opens and 1 Australian Open","From Bilzen Belgium"] },
  { player:"Justine Henin", sport:"🎾 WTA", answer:"JUSTINE HENIN", era:"modern", stats:{GRAND_SLAMS:"7",FRENCH_OPEN:"4x winner",BACKHAND:"One-handed",YEAR:"2007"}, ctx:"Career Totals — 7 Slams with famous one-handed backhand", clues:["Won 7 Grand Slam titles in her career","Won the French Open 4 times without losing a set","Was known for her one-handed backhand — rare in womens tennis","From Liege Belgium"] },
  { player:"Amelie Mauresmo", sport:"🎾 WTA", answer:"AMELIE MAURESMO", era:"modern", stats:{GRAND_SLAMS:"2",WORLD_NO1:"Yes",AUS_OPEN:"1x winner",YEAR:"2006"}, ctx:"Career Totals — French champion who won Australian Open and Wimbledon", clues:["Won the Australian Open and Wimbledon in 2006","Reached World No. 1 in 2004","From Saint-Germain-en-Laye France","Was known for her powerful serve and all-court game"] },
  { player:"Marat Safin", sport:"🎾 ATP", answer:"MARAT SAFIN", era:"modern", stats:{GRAND_SLAMS:"2",WORLD_NO1:"Yes",TALENT:"Extraordinary",YEAR:"2000"}, ctx:"Career Totals — Won 2 Slams while smashing many rackets", clues:["Won the US Open in 2000 by destroying Pete Sampras in the final","Won 2 Grand Slam titles in his career","Was notorious for smashing rackets but had extraordinary talent","From Moscow Russia"] },
  { player:"Yevgeny Kafelnikov", sport:"🎾 ATP", answer:"YEVGENY KAFELNIKOV 2", era:"modern", stats:{GRAND_SLAMS:"2",WORLD_NO1:"Yes",FIRST:"Russian Slam",YEAR:"1996"}, ctx:"Career Totals — First Russian man to win a Grand Slam", clues:["Was the first Russian man to win a Grand Slam singles title","Won 2 Grand Slam titles — French Open in 1996 and Australian Open in 1999","Reached World No. 1","From Sochi Russia"] },
  { player:"Ivan Lendl", sport:"🎾 ATP", answer:"IVAN LENDL", era:"classic", stats:{GRAND_SLAMS:"8",WORLD_NO1:"Yes",WEEKS:"270",WIMB:"0"}, ctx:"Career Totals — 8 Slams but never won Wimbledon", clues:["Won 8 Grand Slam titles but famously never won Wimbledon","Spent 270 weeks at World No. 1","Won the French Open three times and US Open three times","From Ostrava Czechoslovakia"] },
  { player:"John McEnroe", sport:"🎾 ATP", answer:"JOHN MCENROE", era:"classic", stats:{GRAND_SLAMS:"7",WORLD_NO1:"Yes",OUTBURSTS:"Famous",YEAR:"1984"}, ctx:"Career Totals — 7 Slams and the most famous outbursts in tennis", clues:["Won 7 Grand Slam titles","Had one of the greatest serve and volley games ever","From Wiesbaden West Germany but representing USA","Was notorious for on-court outbursts but had brilliant hands"] },
  { player:"Jimmy Connors", sport:"🎾 ATP", answer:"JIMMY CONNORS", era:"classic", stats:{GRAND_SLAMS:"8",WORLD_NO1:"Yes",FIGHTER:"Greatest",YEAR:"1974"}, ctx:"Career Totals — 8 Slams with the biggest fighting spirit", clues:["Won 8 Grand Slam titles including 5 US Opens","Spent 268 weeks at World No. 1","From East St. Louis Illinois","Was known for his relentless fighting spirit and two-handed backhand"] },
  { player:"Guillermo Vilas", sport:"🎾 ATP", answer:"GUILLERMO VILAS", era:"classic", stats:{GRAND_SLAMS:"4",STREAK:"62 clay wins",POET:"Yes",YEAR:"1977"}, ctx:"Career Totals — 4 Slams and 62 consecutive clay court wins", clues:["Won 4 Grand Slam titles including 2 French Opens","Won 62 consecutive matches on clay in 1977","Was also a romantic poet who published books of poetry","From Mar del Plata Argentina"] },
  { player:"Chris Evert", sport:"🎾 WTA", answer:"CHRIS EVERT_2", era:"classic", stats:{GRAND_SLAMS:"18",FRENCH_OPEN:"7x winner",RIVALRY:"Navratilova",YEAR:"1975"}, ctx:"Career Totals — 18 Slams with 7 French Opens", clues:["Won 18 Grand Slam titles in her career","Won the French Open 7 times","Had a famous rivalry with Martina Navratilova","From Fort Lauderdale Florida"] },
  { player:"Martina Navratilova", sport:"🎾 WTA", answer:"MARTINA NAVRATILOVA_2", era:"classic", stats:{GRAND_SLAMS:"18",WIMBLEDON:"9x winner",WORLD_NO1:"Yes",COUNTRY:"Czech → USA"}, ctx:"Career Totals — 9 Wimbledons and 18 Slams", clues:["Won 18 Grand Slam singles titles","Won Wimbledon 9 times — the most in the Open Era","From Prague Czechoslovakia who later represented the USA","Was known for her extraordinary fitness and serve-volley game"] },
  { player:"Arantxa Sanchez Vicario", sport:"🎾 WTA", answer:"ARANTXA SANCHEZ VICARIO_2", era:"classic", stats:{GRAND_SLAMS:"4",FRENCH:"3",NICK:"Barcelona Bumblebee",YEAR:"1994"}, ctx:"Career Totals — 4 Slams and the Barcelona Bumblebee", clues:["Won 4 Grand Slam titles including 3 French Opens","Nicknamed The Barcelona Bumblebee for her tireless retrieving","From Barcelona Spain","Was ranked World No. 1 on two occasions"] },
  { player:"Monica Seles", sport:"🎾 WTA", answer:"MONICA SELES_2", era:"classic", stats:{GRAND_SLAMS:"9",STABBING:"1993",WORLD_NO1:"Yes",YEAR:"1991"}, ctx:"Career Totals — 9 Slams before being stabbed by a spectator", clues:["Won 9 Grand Slam titles before being stabbed by a spectator in 1993","Was ranked World No. 1 when the stabbing occurred","From Novi Sad Yugoslavia later representing the USA","Was known for her double-handed groundstrokes and famous grunting"] },
  { player:"Pat Cash", sport:"🎾 ATP", answer:"PAT CASH_2", era:"classic", stats:{WIMBLEDON:"1x winner",GRAND_SLAMS:"1",CLIMB:"Into stands",YEAR:"1987"}, ctx:"1987 Wimbledon — Won then famously climbed into the stands", clues:["Won Wimbledon for his only Grand Slam title","Famously climbed into the stands to celebrate with his family immediately after winning","From Melbourne Australia","Was known for his all-court aggressive game and headband"] },
  { player:"Goran Ivanisevic", sport:"🎾 ATP", answer:"GORAN IVANISEVIC_2", era:"modern", stats:{WIMBLEDON:"1x winner",WILDCARD:"2001",RANK:"125",YEAR:"2001"}, ctx:"2001 Wimbledon — Won as a wildcard ranked No. 125", clues:["The entire nation of Croatia celebrated in the streets when he won","Was the first and only wildcard entry to win Wimbledon","From Split Croatia","Had a famous alter ego Goran who played more aggressively"] },
  { player:"Michael Stich", sport:"🎾 ATP", answer:"MICHAEL STICH_2", era:"classic", stats:{WIMBLEDON:"1x winner",GRAND_SLAMS:"1",BEAT:"Becker",YEAR:"1991"}, ctx:"1991 Wimbledon — Beat compatriot Becker in the final", clues:["Won Wimbledon beating compatriot Boris Becker in the final","Was always overshadowed by Becker in Germany despite winning a Grand Slam","From Elmshorn West Germany","Won Olympic gold in doubles that same year"] },
  { player:"Rod Laver", sport:"🎾 ATP", answer:"ROD LAVER_2", era:"legends", stats:{GRAND_SLAMS:"11",CAL_GRAND_SLAM:"Won twice",ROCKET:"Nickname",YEAR:"1969"}, ctx:"Career Totals — Only player to win Calendar Grand Slam twice", clues:["Completed the Calendar Grand Slam twice — amateur 1962 and Open Era 1969","Won 11 Grand Slam titles in the Open Era alone","From Rockhampton Queensland Australia","Nicknamed The Rocket — the ATP Finals arena bears his name"] },
  { player:"Ken Rosewall", sport:"🎾 ATP", answer:"KEN ROSEWALL", era:"legends", stats:{GRAND_SLAMS:"8",SPAN:"19 years",NICK:"Muscles",YEAR:"1972"}, ctx:"Career Totals — Won Grand Slams across three different decades", clues:["Won his first Grand Slam in 1953 and his last in 1972 — 19 years apart","Won 8 Grand Slam titles across three different decades","From Sydney Australia","Nicknamed Muscles despite his 5ft 7in slight frame"] },
  { player:"Roy Emerson", sport:"🎾 ATP", answer:"ROY EMERSON", era:"legends", stats:{GRAND_SLAMS:"12",AUS_OPEN:"6x winner",FITNESS:"Greatest",YEAR:"1965"}, ctx:"Career Totals — 12 Slams the most before Sampras", clues:["Won 12 Grand Slam titles — the most in history before Sampras","Won the Australian Open 6 times","From Blackbutt Queensland Australia","Was known for his extraordinary physical fitness"] },
  { player:"John Newcombe", sport:"🎾 ATP", answer:"JOHN NEWCOMBE", era:"legends", stats:{GRAND_SLAMS:"7",WIMBLEDON:"3x winner",MUSTACHE:"Famous",YEAR:"1971"}, ctx:"Career Totals — 7 Slams with the most famous mustache in tennis", clues:["Won 7 Grand Slam singles titles including 3 Wimbledons","Won 4 Davis Cups with Australia","From Sydney Australia","Was famous for his distinctive handlebar mustache"] },
  { player:"Margaret Court", sport:"🎾 WTA", answer:"MARGARET COURT_2", era:"legends", stats:{AUS_OPEN:"11x winner",COUNTRY:"Australia",ERA:"1960s-70s",CAREER:"50+ Slam titles total"}, ctx:"Career Totals — 24 Grand Slams — most in tennis history", clues:["Won 24 Grand Slam singles titles — the most in history","Won the Calendar Grand Slam in 1970","Won the Australian Open 11 times","From Albury New South Wales Australia"] },
  { player:"Althea Gibson", sport:"🎾 WTA", answer:"ALTHEA GIBSON", era:"legends", stats:{GRAND_SLAMS:"5",WIMBLEDON:"2x winner",FIRST:"Black player Slam",YEAR:"1957"}, ctx:"Career Totals — First Black player to win a Grand Slam", clues:["Was the first Black player to win a Grand Slam title","Won 5 Grand Slam singles titles including 2 Wimbledons","From Clarendon County South Carolina","Paved the way for Arthur Ashe and generations of Black tennis players"] },
  { player:"Pancho Gonzales", sport:"🎾 ATP", answer:"PANCHO GONZALES 2", era:"legends", stats:{GRAND_SLAMS:"2",PRO:"8 titles",SERVE:"Fastest era",YEAR:"1954"}, ctx:"Career Totals — Dominated professional tennis for a decade", clues:["Dominated professional tennis for a decade after winning 2 US Championships","Won 8 US Professional titles as a pro","From Los Angeles California of Mexican descent","Had the most feared serve of his era"] },
  { player:"Louise Brough", sport:"🎾 WTA", answer:"LOUISE BROUGH", era:"legends", stats:{GRAND_SLAMS:"6",WIMBLEDON:"4x winner",STREAK:"4 consecutive",YEAR:"1950"}, ctx:"Career Totals — 4 consecutive Wimbledon titles", clues:["Won 4 consecutive Wimbledon titles from 1948 to 1951","Won 6 Grand Slam singles titles total","From Oklahoma City Oklahoma","Won 13 Grand Slam doubles titles with partner Margaret du Pont"] },
  { player:"Pauline Betz", sport:"🎾 WTA", answer:"PAULINE BETZ", era:"legends", stats:{GRAND_SLAMS:"4",US:"4",YEAR:"1946",BAN:"For talking to pros"}, ctx:"Career Totals — 4 US Championships then banned for talking to pros", clues:["Won 4 Grand Slam titles including 4 US Championships","Was banned from amateur tennis for merely talking to a professional promoter","From Dayton Ohio","Had her career cut short by the ban despite being the worlds best player"] },
  { player:"Frank Sedgman", sport:"🎾 ATP", answer:"FRANK SEDGMAN", era:"legends", stats:{GRAND_SLAMS:"5",WIMBLEDON:"1x winner",DAVIS:"3",YEAR:"1952"}, ctx:"Career Totals — First Australian to dominate world tennis", clues:["Won 5 Grand Slam titles and 3 Davis Cups with Australia","Was the first Australian to dominate world tennis internationally","From Mount Albert Victoria Australia","Turned professional in 1953 ending his amateur run"] },
  { player:"Lew Hoad", sport:"🎾 ATP", answer:"LEW HOAD", era:"legends", stats:{GRAND_SLAMS:"4",WIMBLEDON:"2x winner",IDOL:"Laver",YEAR:"1956"}, ctx:"Career Totals — 4 Slams and Rod Laver idol", clues:["Won 4 Grand Slam titles including 2 Wimbledons","Rod Laver idolized him and modeled his game after him","From Glebe New South Wales Australia","Had his career hampered by serious back problems"] },
  { player:"Tony Trabert", sport:"🎾 ATP", answer:"TONY TRABERT", era:"legends", stats:{GRAND_SLAMS:"5",YEAR:"1955",THREE:"French US Wimbledon",CINCY:"From"}, ctx:"Best Season — Won 3 Grand Slams in 1955", clues:["Won 3 Grand Slam titles in 1955 — French Open Wimbledon and US Championships","Won 5 Grand Slam titles in total","From Cincinnati Ohio","Was considered the finest American player of the mid-1950s"] },
  { player:"Jack Kramer", sport:"🎾 ATP", answer:"JACK KRAMER", era:"legends", stats:{GRAND_SLAMS:"3",WIMBLEDON:"1x winner",PRO:"Dominated",YEAR:"1947"}, ctx:"Career Totals — Won Wimbledon then dominated professional tennis", clues:["Won 3 Grand Slam titles and Wimbledon in 1947","Dominated professional tennis for years after turning pro","From Las Vegas Nevada","Later became the most powerful administrator in tennis history"] },
  { player:"Virginia Ruzici", sport:"🎾 WTA", answer:"VIRGINIA RUZICI", era:"classic", stats:{GRAND_SLAMS:"1",FRENCH_OPEN:"Won 1978",FIRST:"Romania",AGENT:"Later"}, ctx:"1978 French Open — First Romanian Grand Slam champion", clues:["Was the first Romanian woman to win a Grand Slam","Won the French Open in 1978","From Caransebes Romania","Later became a successful tennis agent"] },
  { player:"Ham Richardson", sport:"🎾 ATP", answer:"HAM RICHARDSON", era:"legends", stats:{GRAND_SLAMS:"2",RHODES:"Scholar",YEAR:"1956",COUNTRY:"USA"}, ctx:"Career Totals — Rhodes Scholar and Grand Slam champion", clues:["Won 2 Grand Slam titles — French and Australian Championships","Was also a Rhodes Scholar who studied at Oxford","From Baton Rouge Louisiana","Was considered one of the most intellectually accomplished players in tennis history"] },
  { player:"Ashley Cooper", sport:"🎾 ATP", answer:"ASHLEY COOPER", era:"legends", stats:{GRAND_SLAMS:"4",WIMBLEDON:"1x winner",WORLD_NO1:"Yes",YEAR:"1958"}, ctx:"Career Totals — 4 Slams and World No. 1 in the late 1950s", clues:["Won 4 Grand Slam titles in his career","Won both Wimbledon and the US Championships in 1958","Was World No. 1 for two consecutive years","From Melbourne Victoria Australia"] },
  { player:"Neale Fraser", sport:"🎾 ATP", answer:"NEALE FRASER", era:"legends", stats:{GRAND_SLAMS:"3",WIMBLEDON:"1x winner",DAVIS:"Captain",YEAR:"1960"}, ctx:"Career Totals — 3 Slams and legendary Davis Cup captain", clues:["Won 3 Grand Slam singles titles including Wimbledon and 2 US Championships","Later became a long-serving Australian Davis Cup captain","From Melbourne Victoria Australia","Was celebrated even more as a doubles player"] },
  { player:"Budge Patty", sport:"🎾 ATP", answer:"BUDGE PATTY", era:"legends", stats:{GRAND_SLAMS:"2",WIMBLEDON:"1x winner",PARIS:"1",YEAR:"1950"}, ctx:"Career Totals — Won Wimbledon and Roland Garros in same year", clues:["Won Wimbledon and the French Championships in the same year 1950","American player who lived most of his adult life in Paris","From Lovington Arkansas but based in Europe","Was known for his elegant stylish tennis"] },
  { player:"Harry Vardon", sport:"⛳ Golf", answer:"HARRY VARDON_2", era:"legends", stats:{OPEN:"6",RECORD:"Most British Opens",GRIP:"His name",YEAR:"1900"}, ctx:"Career Totals — 6 British Opens and the grip that bears his name", clues:["Won the British Open 6 times — still the all-time record","Won the US Open in 1900 during a North American tour","From Grouville Jersey Channel Islands","The overlapping golf grip is called the Vardon Grip"] },
  { player:"Cary Middlecoff", sport:"⛳ Golf", answer:"CARY MIDDLECOFF", era:"legends", stats:{MAJORS:"3",WINS:"40",DENTIST:"Former",SLOW:"Famous"}, ctx:"Career Totals — Dentist turned 3-time major champion", clues:["Won 3 major championships — 2 US Opens and 1 Masters","Gave up dentistry to pursue golf","From Hall Tennessee","Was notorious for his incredibly slow pace of play"] },
  { player:"Jimmy Demaret", sport:"⛳ Golf", answer:"JIMMY DEMARET", era:"legends", stats:{MASTERS:"3",WINS:"31",STYLE:"Colorful clothes",YEAR:"1950"}, ctx:"Career Totals — Three Masters wins with the most colorful wardrobe", clues:["Won The Masters 3 times — the first player to win it three times","Was known for his flamboyant colorful clothing on the course","From Houston Texas","Was also a television personality and entertainer"] },
  { player:"Art Wall Jr", sport:"⛳ Golf", answer:"ART WALL JR", era:"legends", stats:{ACE:"41",MASTERS:"1",POY:"1959",NICK:"Mr Hole in One"}, ctx:"1959 Masters — Champion nicknamed Mr Hole in One", clues:["Won The Masters and was PGA Player of the Year in 1959","Made 41 holes-in-one in his career","From Honesdale Pennsylvania","Was nicknamed Mr Hole in One for his extraordinary iron accuracy"] },
  { player:"Lloyd Mangrum", sport:"⛳ Golf", answer:"LLOYD MANGRUM", era:"legends", stats:{MAJORS:"1",US_OPEN:"1946",WINS:"36",WAR:"Purple Heart"}, ctx:"Career Totals — Purple Heart winner who became a major champion", clues:["Won the 1946 US Open in a playoff","Was wounded twice in World War II earning the Purple Heart","From Trenton Texas","Won 36 PGA Tour events in his career"] },
  { player:"Ralph Guldahl", sport:"⛳ Golf", answer:"RALPH GULDAHL", era:"legends", stats:{MAJORS:"3",US_OPEN:"2",STREAK:"Back-to-back",FAMOUS:"Lost game after book"}, ctx:"Career Totals — Won 3 majors then mysteriously lost his game", clues:["Won the US Open in consecutive years 1937 and 1938 then The Masters in 1939","Mysteriously lost his entire game shortly after writing a golf instruction book","The theory is the book made him too conscious of his natural swing","From Dallas Texas"] },
  { player:"Bob Rosburg", sport:"⛳ Golf", answer:"BOB ROSBURG", era:"legends", stats:{MAJORS:"1",PGA:"1959",BROADCAST:"ABC Sports",YEAR:"1959"}, ctx:"1959 PGA Championship — Champion turned famous broadcaster", clues:["Won the 1959 PGA Championship","Later became a beloved golf announcer for ABC Sports","From San Francisco California","Was a Stanford University graduate"] },
  { player:"Martin Brodeur", sport:"🏒 NHL", answer:"MARTIN BRODEUR", era:"modern", stats:{W:"691",SO:"125",GAA:"2.24",STANLEY_CUPS:"3"}, ctx:"Career Totals — Most wins and shutouts in NHL history", clues:["Won 691 games — the most in NHL history","Had 125 career shutouts — the most in NHL history","Won 3 Stanley Cups with the New Jersey Devils","From Saint-Laurent Quebec"] },
  { player:"Dominik Hasek", sport:"🏒 NHL", answer:"DOMINIK HASEK", era:"modern", stats:{GAA:"2.20","SV%":".922",VEZINA:"6",TEAM:"Sabres/Detroit"}, ctx:"Career Totals — 6 Vezina Trophies as The Dominator", clues:["Won 6 Vezina Trophies as the best goaltender","Had a career save percentage of .922","Nicknamed The Dominator for his unorthodox but effective style","From Pardubice Czechoslovakia"] },
  { player:"Nicklas Lidstrom", sport:"🏒 NHL", answer:"NICKLAS LIDSTROM", era:"modern", stats:{NORRIS:"7",STANLEY_CUPS:"4",CALDER:"1",YEAR:"1991"}, ctx:"Career Totals — 7 Norris Trophies and 4 Stanley Cups", clues:["Won 7 Norris Trophies as best defenseman — the most ever","Won 4 Stanley Cups with the Detroit Red Wings","From Vasteras Sweden","Was considered the greatest European-born player in NHL history"] },
  { player:"Sergei Fedorov", sport:"🏒 NHL", answer:"SERGEI FEDOROV", era:"modern", stats:{PTS:"1179",STANLEY_CUPS:"3",HART:"1994",TWO_WAY:"Best"}, ctx:"Career Totals — Hart Trophy winner and the best two-way player ever", clues:["Won the Hart Trophy as league MVP in 1994","Won 3 Stanley Cups with the Detroit Red Wings","Was one of the most complete two-way players in NHL history","From Pskov Russia"] },
  { player:"Brendan Shanahan", sport:"🏒 NHL", answer:"BRENDAN SHANAHAN", era:"modern", stats:{G:"656",STANLEY_CUPS:"3",TOUGH:"And scorer",YEAR:"2002"}, ctx:"Career Totals — 656 goals while also fighting regularly", clues:["Scored 656 goals — 11th most in NHL history","Won 3 Stanley Cups with the Detroit Red Wings","Was unusual in combining prolific goal scoring with physical play","From Mimico Ontario"] },
  { player:"Scott Stevens", sport:"🏒 NHL", answer:"SCOTT STEVENS", era:"modern", stats:{STANLEY_CUPS:"3",CF:"Conn Smythe 2000",HITS:"Most feared",YEAR:"2000"}, ctx:"Career Totals — 3 Cups and the most feared open-ice hitter ever", clues:["Won 3 Stanley Cups with the New Jersey Devils","Won the Conn Smythe Trophy as playoff MVP in 2000","Was the most feared open-ice hitter in NHL history","From Kitchener Ontario"] },
  { player:"Mats Sundin", sport:"🏒 NHL", answer:"MATS SUNDIN", era:"modern", stats:{G:"564",FIRST:"Euro 1st overall",TORONTO:"Captain",GOLD:"Olympic x2"}, ctx:"Career Totals — First European drafted 1st overall with 564 goals", clues:["Won 2 Olympic gold medals with Sweden and was one of the most skilled centers ever","Scored 564 career goals as captain of the Toronto Maple Leafs","Won 2 Olympic gold medals with Sweden","From Bromma Sweden"] },
  { player:"Mike Modano", sport:"🏒 NHL", answer:"MIKE MODANO", era:"modern", stats:{G:"561",AMERICAN:"Most goals US born",DALLAS:"Stars",CUP:"1999"}, ctx:"Career Totals — Most goals ever by an American-born NHL player", clues:["Scored 561 goals — the most ever by an American-born player","Won the Stanley Cup with the Dallas Stars in 1999","From Livonia Michigan","Played his entire career with the Minnesota and Dallas Stars"] },
  { player:"Marc-Andre Fleury", sport:"🏒 NHL", answer:"MARC-ANDRE FLEURY", era:"modern", stats:{W:"551",STANLEY_CUPS:"3",FIRST:"2003 overall",YEAR:"2003"}, ctx:"Career Totals — 1st overall pick who won 551 games and 3 Cups", clues:["Was the 1st overall pick in the 2003 NHL Draft","Won 3 Stanley Cups with the Pittsburgh Penguins","Won 551 career games — fourth most in NHL history","From Sorel-Tracy Quebec"] },
  { player:"Roberto Luongo", sport:"🏒 NHL", answer:"ROBERTO LUONGO", era:"modern", stats:{W:"489",SO:"77",GAA:"2.52",GOLD:"2010 Olympic"}, ctx:"Career Totals — 489 wins and Olympic gold on home ice", clues:["Won 489 games — third most in NHL history","Won Olympic gold with Canada in 2010 in Vancouver on home ice","The Canucks came agonizingly close to winning the Cup in both 1982 and 1994 before falling short","From Montreal Quebec"] },
  { player:"Nicklas Backstrom", sport:"🏒 NHL", answer:"NICKLAS BACKSTROM", era:"modern", stats:{PTS:"1025+",CUP:"2018",PARTNER:"Ovechkin",SWEDEN:"Vasteras"}, ctx:"Career Totals — Set up Ovechkin for a decade then won the Cup", clues:["Was the primary center alongside Alexander Ovechkin","Won the Stanley Cup with the Washington Capitals in 2018","Accumulated over 1000 career points","From Vasteras Sweden"] },
  { player:"Jeremy Roenick", sport:"🏒 NHL", answer:"JEREMY ROENICK", era:"modern", stats:{G:"513",FIRST:"American 500 goals",OUTSPOKEN:"Yes",COUNTRY:"USA"}, ctx:"Career Totals — One of first Americans to score 500 NHL goals", clues:["Was known for his outspoken media personality and willingness to criticize the NHL","Scored 513 career goals","From Boston Massachusetts","Was known for his outspoken personality and willingness to speak his mind"] },
  { player:"Pierre Turgeon", sport:"🏒 NHL", answer:"PIERRE TURGEON", era:"modern", stats:{PTS:"1327",PICK:"1 overall 1987",G:"515",QUIET:"Overlooked"}, ctx:"Career Totals — 1st overall pick with 1327 career points often overlooked", clues:["Scored 1327 career points","Was the 1st overall pick in the 1987 NHL Draft by the Buffalo Sabres","Had 58 goals in one season for the New York Islanders","Is often overlooked despite his consistently elite production"] },
  { player:"Keith Tkachuk", sport:"🏒 NHL", answer:"KEITH TKACHUK", era:"modern", stats:{G:"538",FIRST:"American 50 goals",TEAM:"Coyotes",YEAR:"1996"}, ctx:"Career Totals — First American to score 50 goals in a season", clues:["Was the first American-born player to score 50 goals in a season","Scored 538 career goals","From Melrose Massachusetts","The Blues won their first Cup in 2019 after 52 years of trying — while Gloria played in the arena"] },
  { player:"Wayne Gretzky", sport:"🏒 NHL", answer:"WAYNE GRETZKY", era:"classic", stats:{ASSISTS:"1963",RECORDS:"61",CUPS:"4",TEAM:"Edmonton Oilers"}, ctx:"Career Totals — More career assists than any other player has total points", clues:["Holds 61 different NHL records — many considered unbreakable","Holds 61 different NHL records","Won 4 Stanley Cups with the Edmonton Oilers","From Brantford Ontario — nicknamed The Great One"] },
  { player:"Mario Lemieux", sport:"🏒 NHL", answer:"MARIO LEMIEUX", era:"classic", stats:{PPG:"1.88",PTS:"1723",OVERCAME:"Hodgkins lymphoma",STANLEY_CUPS:"2"}, ctx:"Career Totals — Second highest points-per-game average ever", clues:["Has the second highest career points-per-game average at 1.88","Won 2 Stanley Cups with the Pittsburgh Penguins","Overcame Hodgkin lymphoma and continued playing","From Montreal Quebec — nicknamed Le Magnifique"] },
  { player:"Mike Bossy", sport:"🏒 NHL", answer:"MIKE BOSSY", era:"classic", stats:{G:"573",STREAK:"9 seasons 50+ goals",STANLEY_CUPS:"4",RATIO:"Second ever"}, ctx:"Career Totals — Scored 50+ goals in all 9 of his NHL seasons", clues:["Scored 50 or more goals in each of his first 9 seasons — an NHL record","Won 4 Stanley Cups with the New York Islanders dynasty","Had the second highest goals-per-game ratio in NHL history","From Montreal Quebec"] },
  { player:"Mark Messier", sport:"🏒 NHL", answer:"MARK MESSIER", era:"classic", stats:{PTS:"1887",STANLEY_CUPS:"6",FAMOUS:"1994 guarantee + hat trick",LEADER:"Greatest"}, ctx:"Career Totals — 6 Cups and the 1994 Guarantee game", clues:["Won 6 Stanley Cups — 5 with Edmonton and 1 with the New York Rangers","Guaranteed a Rangers win in the 1994 playoffs then delivered with a hat trick","From St. Albert Alberta","Is considered the greatest leader in NHL history"] },
  { player:"Jari Kurri", sport:"🏒 NHL", answer:"JARI KURRI", era:"classic", stats:{G:"601",STANLEY_CUPS:"5",GRETZKY:"Right wing partner",FINLAND:"First HoF"}, ctx:"Career Totals — 5 Cups as Gretzkys perfect right wing", clues:["Scored 601 career goals alongside Wayne Gretzky","Won 5 Stanley Cups with the Edmonton Oilers","Was the first Finn inducted into the Hockey Hall of Fame","From Helsinki Finland"] },
  { player:"Luc Robitaille", sport:"🏒 NHL", answer:"LUC ROBITAILLE", era:"classic", stats:{G:"668",LEFT_WING:"Most goals LW",STANLEY_CUPS:"1",MONTREAL:"Born"}, ctx:"Career Totals — Most goals ever by a left winger", clues:["Scored 668 goals — the most ever by a left winger in NHL history","Won the Stanley Cup with the Detroit Red Wings in 2002","From Montreal Quebec","Was inducted into the Hockey Hall of Fame after their playing career"] },
  { player:"Dale Hawerchuk", sport:"🏒 NHL", answer:"DALE HAWERCHUK", era:"classic", stats:{PTS:"1409",ROY:"1982",JETS:"Franchise player",DIED:"2020"}, ctx:"Career Totals — 1409 points and beloved Winnipeg Jets franchise player", clues:["Scored 1409 career points","Won the Calder Trophy as Rookie of the Year in 1982","Was the franchise player for the Winnipeg Jets for many years","Died from cancer in 2020 — greatly mourned across Canada"] },
  { player:"Peter Stastny", sport:"🏒 NHL", answer:"PETER STASTNY", era:"classic", stats:{PTS:"1239",DEFECT:"1980",DECADE:"2nd most 1980s",BROTHERS:"2 also NHL"}, ctx:"Career Totals — Defected from Czechoslovakia and had 2nd most 1980s points", clues:["Defected from Czechoslovakia in 1980 to play in the NHL","Had the second most points in the 1980s behind only Gretzky","Scored 1239 career points","Two of his brothers Anton and Marian Stastny also played in the NHL"] },
  { player:"Mike Gartner", sport:"🏒 NHL", answer:"MIKE GARTNER", era:"classic", stats:{G:"708",STREAK:"15 seasons 30+ goals",SPEED:"Fastest skater",NOTABLE:"Never won Stanley Cup"}, ctx:"Career Totals — 708 goals and 15 consecutive 30-goal seasons", clues:["Scored 30 or more goals in 15 consecutive seasons","Had 708 career goals — the fifth most in NHL history","Was considered the fastest skater of his era","Never won the Stanley Cup despite his longevity"] },
  { player:"Glenn Anderson", sport:"🏒 NHL", answer:"GLENN ANDERSON", era:"classic", stats:{G:"498",STANLEY_CUPS:"6",KNOWN:"Unpredictable style",EDMONTON:"Dynasty"}, ctx:"Career Totals — 6 Cups with the Edmonton Oilers dynasty", clues:["Won 6 Stanley Cups — 5 with Edmonton and 1 with Toronto","Scored 498 career goals","Was known for his unpredictable exciting style","From Vancouver British Columbia"] },
  { player:"Daunte Culpepper", sport:"🏈 NFL", answer:"DAUNTE CULPEPPER", era:"modern", stats:{YDS:"4717",TD:"39",INT:"11",RTG:"110.9"}, ctx:"Best Season — One of the best statistical QB seasons ever in 2004", clues:["Had one of the best statistical seasons ever by a quarterback","The Vikings reached the Super Bowl 4 times but came away without a win each time","Was a massive mobile quarterback at 6ft 4in and 260 pounds","Had his career effectively ended by a devastating knee injury in 2005"] },
  { player:"Clayton Kershaw", sport:"⚾ MLB", answer:"CLAYTON KERSHAW", era:"modern", stats:{ERA:"2.48",CY:"3",MVP:"2014",W:"19"}, ctx:"Career Totals — Three Cy Youngs and an MVP for the Dodgers", clues:["Won the NL MVP Award as a pitcher — extremely rare","Won 3 Cy Young Awards all with the Los Angeles Dodgers","Had a career ERA under 2.50 — the lowest of any active pitcher","From Dallas Texas — played college baseball at Texas A&M"] },

  { player:"Madison Bumgarner", sport:"⚾ MLB", answer:"MADISON BUMGARNER", era:"modern", stats:{ERA:"2.11",IP:"52.2",WS_MVP:"2014",GS:"5"}, ctx:"2014 World Series — Greatest pitching performance in Fall Classic history", clues:["Had the greatest World Series pitching performance in history — 52.2 innings at a 2.11 ERA","Pitched 5 innings of shutout relief in Game 7 on two days rest to save the Series","Was the World Series MVP in 2014 with the San Francisco Giants","From Hudson North Carolina — also competes in rodeo under a pseudonym"] },

  { player:"Roy Halladay", sport:"⚾ MLB", answer:"ROY HALLADAY", era:"modern", stats:{ERA:"3.38",CY:"2",NHIT:"NLCS",PERFECT:"1"}, ctx:"Career Totals — Threw a perfect game and a playoff no-hitter", clues:["Threw a perfect game and a no-hitter in the NLCS — the only pitcher to throw a postseason no-hitter","Won 2 Cy Young Awards in both leagues","Was nicknamed Doc for his relentless work ethic and preparation","Died in a private plane crash in 2017 at age 40"] },

  { player:"Jake Arrieta", sport:"⚾ MLB", answer:"JAKE ARRIETA", era:"modern", stats:{ERA:"1.77",W:"22",CY:"2015",NHIT:"2"}, ctx:"2015 MLB Season — Won Cy Young with dominant second half", clues:["Had a 1.77 ERA in the second half of the season after struggling early in his career","Won the NL Cy Young Award with the Chicago Cubs","Threw a no-hitter in the postseason that year","From Farmington Missouri — was cut by the Baltimore Orioles before finding his form"] },

  { player:"Dallas Keuchel", sport:"⚾ MLB", answer:"DALLAS KEUCHEL", era:"modern", stats:{ERA:"2.48",GG:"5",CY:"2015",W:"20"}, ctx:"2015 MLB Season — AL Cy Young and five Gold Gloves", clues:["Won five consecutive Gold Gloves as a pitcher — an extraordinary fielding accomplishment","Won the AL Cy Young Award with the Houston Astros","Was known for his full beard which became iconic","From Tulsa Oklahoma"] },

  // MEDIUM Bball Classic (need 5 more — already added 5 above, but check)
  { player:"Clyde Drexler", sport:"🏀 NBA", answer:"CLYDE DREXLER", era:"classic", stats:{PTS:"20.4",RINGS:"1",GLIDE:"Nickname",TEAM:"Blazers/Rockets"}, ctx:"Career Totals — The Glide won a ring with Hakeem and Dream Team gold", clues:["Nicknamed The Glide for his smooth athletic style of play","Won an NBA championship with the Houston Rockets alongside Hakeem Olajuwon in 1995","Won Olympic gold with the Dream Team in 1992","From New Orleans Louisiana — went to college at the University of Houston"] },
  { player:"Isiah Thomas", sport:"🏀 NBA", answer:"ISIAH THOMAS_2", era:"classic", stats:{PTS:"19.2",AST:"9.3",RINGS:"2",FINALS_MVP:"1990"}, ctx:"Career Totals — Led the Bad Boys Pistons to back-to-back championships", clues:["Won back-to-back NBA championships with the Detroit Pistons Bad Boys in 1989 and 1990","Won Finals MVP in 1990 scoring 33 points in Game 6 despite an ankle injury","Was controversially excluded from the 1992 Dream Team by Jordan and others","From Chicago Illinois — played all 13 seasons with the Pistons"] },
  { player:"Kevin McHale", sport:"🏀 NBA", answer:"KEVIN MCHALE", era:"classic", stats:{RINGS:"3",FG_PCT:".554",MOVES:"Best post ever",TEAM:"Celtics"}, ctx:"Career Totals — The best post moves in NBA history for the Celtics dynasty", clues:["Is considered to have had the best post moves and footwork of any power forward ever","Won 3 NBA championships with the Boston Celtics","His hall-of-fame low-post repertoire is still studied by big men today","From Hibbing Minnesota — the same small town that produced Bob Dylan"] },
  { player:"Len Bias", sport:"🏀 NBA", answer:"LEN BIAS", era:"classic", stats:{PICK:"2",YEAR:"1986",SCHOOL:"Maryland",TRAGEDY:"OD night of draft"}, ctx:"1986 NBA Draft — Died of cocaine OD the night after being drafted #2", clues:["Died of a cocaine overdose the night after being drafted 2nd overall by the Celtics in 1986","Was considered by many scouts to be the best prospect since Michael Jordan","His death contributed to the crack cocaine epidemic legislation and the anti-drug movement","From Landover Maryland — Bill Walton called him the best player he had ever seen"] },
  { player:"Adrian Dantley", sport:"🏀 NBA", answer:"ADRIAN DANTLEY", era:"classic", stats:{PTS:"24.3",SCORING:"2 titles",HALL:"2008",TEAM:"Jazz/Pistons"}, ctx:"Career Totals — Two scoring titles for an underrated Hall of Famer", clues:["Won 2 NBA scoring titles and averaged 24.3 points per game for his career","Was inducted into the Hall of Fame in 2008","Is consistently cited as one of the most underrated players in NBA history","From Washington DC — won an Olympic gold medal in 1976"] },

  // MEDIUM Baseball Classic (need 1)
  { player:"Dave Stieb", sport:"⚾ MLB", answer:"DAVE STIEB", era:"classic", stats:{ERA:"3.44",NO_HIT:"5 near-misses",W:"176",TEAM:"Blue Jays"}, ctx:"Career Totals — Had 5 near no-hitters before finally throwing one", clues:["Had 5 near-misses before finally throwing his no-hitter in 1990","Won 176 games for the Toronto Blue Jays — their franchise record at the time","Was the ace of Canada's first great baseball team","From Santa Ana California"] },

  // MEDIUM Baseball Legends (need 2)
  { player:"Edd Roush", sport:"⚾ MLB", answer:"EDD ROUSH", era:"legends", stats:{AVG:".323",BATTING:"2 titles",TEAM:"Reds",ERA:"1910s-20s"}, ctx:"Career Totals — Two batting titles for the Cincinnati Reds", clues:["Won 2 batting titles with the Cincinnati Reds","Batted .323 for his career — one of the best contact hitters of his era","Was one of the best defensive center fielders of the early 20th century","From Oakland City Indiana — held out for higher salary multiple times"] },
  { player:"Sam Rice", sport:"⚾ MLB", answer:"SAM RICE", era:"legends", stats:{HITS:"2987",AVG:".322",CLOSE:"Just missed 3000",TEAM:"Senators"}, ctx:"Career Totals — Fell just 13 hits short of 3000 for Washington", clues:["Fell just 13 hits short of 3000 career hits","Batted .322 career average for the Washington Senators","Was involved in a famous controversy over a catch in the 1925 World Series","Left a sealed letter about the controversial catch to be opened after his death"] },

  // MEDIUM Soccer Modern (need 1)
  { player:"Xabi Alonso", sport:"⚽ Soccer", answer:"XABI ALONSO", era:"modern", stats:{UCL:"2",WC:"2010",LA_LIGA:"1",NATION:"Spain"}, ctx:"Career Totals — Won everything with Spain and two Champions Leagues", clues:["Won the Champions League with both Liverpool and Real Madrid","Won the World Cup and two European Championships with Spain's golden generation","Was considered one of the best passers and readers of the game of his era","From Tolosa Basque Country Spain — son of former Spanish international Periko Alonso"] },

  // MEDIUM Soccer Classic (need 5)
  { player:"Paolo Maldini", sport:"⚽ Soccer", answer:"PAOLO MALDINI_2", era:"classic", stats:{UCL:"5",SERIE_A:"7",CAPS:"126",TEAM:"AC Milan"}, ctx:"Career Totals — Won 5 Champions Leagues and never needed to leave AC Milan", clues:["Won 5 Champions Leagues and 7 Serie A titles all with AC Milan","Played his entire 24-year career for one club — AC Milan","Is considered the greatest left back or central defender in football history by many","From Milan Italy — his father Cesare Maldini also played for and managed Milan"] },
  { player:"Franco Baresi", sport:"⚽ Soccer", answer:"FRANCO BARESI", era:"classic", stats:{UCL:"3",SERIE_A:"6",SWEEPER:"Invented modern",TEAM:"AC Milan"}, ctx:"Career Totals — The sweeper who defined modern defending at AC Milan", clues:["Is considered one of the greatest defenders in the history of the game","Played his entire career for AC Milan and had his number 6 retired by the club","Won 3 European Cups and 6 Serie A titles","From Travagliato Brescia Italy — came to AC Milan's youth team at age 14"] },
  { player:"Roberto Baggio", sport:"⚽ Soccer", answer:"ROBERTO BAGGIO", era:"classic", stats:{BALLON:"1993",GOALS:"205",WC:"1994 penalty miss",NICK:"Divine Ponytail"}, ctx:"Career Totals — 1993 Ballon d Or whose penalty miss ended Italy's World Cup dream", clues:["Won the Ballon d Or in 1993","Missed the decisive penalty in the 1994 World Cup Final against Brazil","Was nicknamed The Divine Ponytail for his distinctive hairstyle","Scored 205 Serie A goals — one of the greatest forwards in Italian history"] },
  { player:"Jurgen Klinsmann", sport:"⚽ Soccer", answer:"JURGEN KLINSMANN", era:"classic", stats:{G:"47",WC:"1990",DIVE:"Mocking celebration",NATION:"Germany"}, ctx:"Career Totals — Won the World Cup with Germany and became famous for his diving", clues:["Won the 1990 World Cup with West Germany","Was accused of diving so often he invented a self-mocking dive celebration when he scored","Scored 47 goals in 108 international appearances for Germany","From Göppingen Germany — later became a successful manager of Germany and the USA"] },
  { player:"Dennis Bergkamp", sport:"⚽ Soccer", answer:"DENNIS BERGKAMP_2", era:"classic", stats:{GOALS:"120",FEAR:"Flying phobia",ARSENAL:"Legend",NATION:"Netherlands"}, ctx:"Career Totals — Arsenal legend with a flying phobia who changed English football", clues:["Had a severe fear of flying and had to travel to away games by train or car","Scored one of the greatest goals in World Cup history against Argentina in 1998","Was transformed from a struggling Inter Milan player to an Arsenal legend by Arsene Wenger","From Amsterdam Netherlands — named after Denis Law"] },

  // MEDIUM Soccer Legends (already added 12 above — verify they're there)
  // MEDIUM Tennis Classic (need 1)
  { player:"Stefan Edberg", sport:"🎾 ATP", answer:"STEFAN EDBERG_2", era:"classic", stats:{GRAND_SLAMS:"6",SPORTSMANSHIP:"Award named after him",SERVE_VOLLEY:"Master",NATION:"Sweden"}, ctx:"Career Totals — Six Grand Slams and the ATP Sportsmanship Award bears his name", clues:["Won 6 Grand Slam titles and was one of the last great serve-and-volley players","The ATP Sportsmanship Award is named the Stefan Edberg Sportsmanship Award in his honor","Had an epic rivalry with Boris Becker that produced some of the best matches of the era","From Västervik Sweden — later coached Roger Federer"] },

  // MEDIUM Tennis Legends (need 4)
  { player:"Don Budge", sport:"🎾 ATP", answer:"DON BUDGE", era:"legends", stats:{GRAND_SLAM:"First Calendar",DAVIS_CUP:"Hero",BACKHAND:"Greatest",NATION:"USA"}, ctx:"Career Totals — First player to win the Calendar Grand Slam in 1938", clues:["Was the first player in history to win all four Grand Slam titles in one year","Was so dominant that he virtually won the Davis Cup single-handedly for years","Had one of the most powerful backhands ever seen — described as a howitzer","From Oakland California — is credited with saving American tennis in the late 1930s"] },
  { player:"Jack Kramer", sport:"🎾 ATP", answer:"JACK KRAMER2", era:"legends", stats:{GRAND_SLAMS:"3",PRO:"Dominated",ADMINISTRATOR:"Powerful",NATION:"USA"}, ctx:"Career Totals — Won Wimbledon then dominated professional tennis for years", clues:["Dominated professional tennis for years after turning pro in 1947","Won 3 Grand Slam titles including Wimbledon in 1947","Later became the most powerful administrator in professional tennis","From Las Vegas Nevada — helped create the ATP and shape the Open Era"] },
  { player:"Tony Trabert", sport:"🎾 ATP", answer:"TONY TRABERT2", era:"legends", stats:{GRAND_SLAMS:"5",YEAR:"1955 won three",DAVIS_CUP:"Hero",NATION:"USA"}, ctx:"Best Season — Won three Grand Slams in 1955", clues:["Won three Grand Slam titles in the same year — the French Wimbledon and US Championships","Won 5 Grand Slam titles in total","Was a key figure in US Davis Cup victories in the early 1950s","From Cincinnati Ohio — was considered the finest American player of the mid-1950s"] },
  { player:"Lew Hoad", sport:"🎾 ATP", answer:"LEW HOAD2", era:"legends", stats:{GRAND_SLAMS:"4",WIMBLEDON:"2",BACK:"Ended career",IDOL:"Rod Laver's hero"}, ctx:"Career Totals — Four Grand Slams before his back ended his career early", clues:["Was Rod Laver's idol and the player Laver modeled his game after","Won 4 Grand Slam titles including 2 Wimbledon titles before a serious back injury","Was considered the most gifted tennis player of his generation by contemporaries","From Glebe New South Wales Australia"] },

  // MEDIUM Golf Modern (need 2)
  { player:"Keegan Bradley", sport:"⛳ Golf", answer:"KEEGAN BRADLEY", era:"modern", stats:{MAJORS:"1",PGA:"2011",ROUTINE:"Longest in golf",RYDER:"USA"}, ctx:"Career Totals — Won the PGA Championship in his debut major", clues:["Won the PGA Championship in 2011 in his very first major championship appearance","Has arguably the longest and most elaborate pre-shot routine on the PGA Tour","Was a consistent US Ryder Cup contributor","From Woodstock Vermont — nephew of LPGA legend Pat Bradley"] },
  { player:"Stewart Cink", sport:"⛳ Golf", answer:"STEWART CINK", era:"modern", stats:{BRITISH_OPEN:"2009",WATSON:"Beat 59-year-old",WINS:"7",NATION:"USA"}, ctx:"Career Totals — Won The Open Championship by beating a 59-year-old Tom Watson", clues:["Won The Open Championship in 2009 by beating 59-year-old Tom Watson in a playoff","Watson was one hole away from the most amazing major victory in history before Cink caught him","Won 7 PGA Tour events in his career","From Huntsville Alabama"] },

  // MEDIUM Golf Legends already added 12 above
  // MEDIUM Hockey Modern (need 1)
  { player:"Steve Mason", sport:"🏒 NHL", answer:"STEVE MASON", era:"modern", stats:{ROY:"2009",WINS:"208",TEAM:"Columbus/Philly",NATION:"Canada"}, ctx:"Career Totals — Won the Calder Trophy as a rookie with Columbus", clues:["Won the Calder Trophy as the NHL's best rookie in 2009 with Columbus","Had one of the most promising starts in NHL goaltending history","The Broad Street Bullies Flyers were the most physically intimidating team in hockey history","From Oakville Ontario Canada"] },

  // MEDIUM Soccer Legends (need 12)
  { player:"Pele", sport:"⚽ Soccer", answer:"PELE_2", era:"legends", stats:{WC:"3",G:"1279",BRAZIL:"All-time",CLUB:"Santos"}, ctx:"Career Totals — Won three World Cups and scored over 1000 career goals", clues:["Won 3 World Cup titles with Brazil — 1958 1962 and 1970","Is credited with scoring over 1000 career goals though the exact count is debated","Played almost his entire club career for Santos in Brazil","Was so beloved that a civil war in Nigeria briefly stopped so both sides could watch him play"] },
  { player:"Diego Maradona", sport:"⚽ Soccer", answer:"MARADONA_2", era:"legends", stats:{WC:"1986",HAND:"God's",BALLON:"1986",CLUB:"Napoli"}, ctx:"Career Totals — Won the 1986 World Cup with the Hand of God and Goal of the Century", clues:["Scored both the Hand of God and the Goal of the Century in the same match against England in 1986","Won the World Cup with Argentina in 1986","Transformed Napoli from a mid-table club into Italian champions","From Villa Fiorito Buenos Aires Argentina — grew up in extreme poverty"] },
  { player:"Gerd Muller", sport:"⚽ Soccer", answer:"GERD MULLER_2", era:"legends", stats:{G:"68 in 62",BUNDESLIGA:"40 goals record",WC:"1974",NICK:"Bomber"}, ctx:"Career Totals — The Bomber scored 68 goals in 62 international games", clues:["Scored 68 goals in just 62 international appearances — an extraordinary ratio","Held the Bundesliga single-season goals record of 40 for 49 years until Lewandowski broke it","Won the 1974 World Cup with West Germany","Nicknamed Der Bomber for his powerful and clinical finishing"] },
  { player:"Johan Cruyff", sport:"⚽ Soccer", answer:"CRUYFF_2", era:"legends", stats:{BALLON:"3",TOTAL_FOOTBALL:"Invented",TURN:"Named after him",NATION:"Netherlands"}, ctx:"Career Totals — Three Ballons d Or and the inventor of Total Football", clues:["Won 3 Ballon d Or awards in 1971 1973 and 1974","Is credited with co-developing Total Football — a revolutionary positional system","Invented the Cruyff Turn which is still used by players worldwide today","Led the Netherlands to the 1974 World Cup Final playing the most influential football ever seen"] },
  { player:"Franz Beckenbauer", sport:"⚽ Soccer", answer:"FRANZ BECKENBAUER", era:"legends", stats:{WC:"Won as player and manager",BALLON:"2",SWEEPER:"Libero invented",NICK:"Kaiser Franz"}, ctx:"Career Totals — Won the World Cup as both player and manager", clues:["Won the World Cup as a player in 1974 and as a manager in 1990 — one of only 3 people ever","Won 2 Ballon d Or awards and invented the attacking libero sweeper role","Nicknamed Kaiser Franz for his commanding presence on the pitch","From Munich Germany — won 4 Bundesliga titles and 3 European Cups with Bayern Munich"] },
  { player:"Bobby Charlton", sport:"⚽ Soccer", answer:"BOBBY CHARLTON 2", era:"legends", stats:{WC:"1966",UCL:"1968",GOALS:"249",NATION:"England"}, ctx:"Career Totals — Won the World Cup and European Cup representing England and United", clues:["Won the World Cup with England in 1966 and the European Cup with Manchester United in 1968","Survived the Munich Air Disaster of 1958 which killed several of his teammates","Was knighted by Queen Elizabeth II for his services to football","Was England all-time top scorer for 45 years"] },
  { player:"Gordon Banks", sport:"⚽ Soccer", answer:"GORDON BANKS", era:"legends", stats:{WC:"1966",SAVE:"Greatest ever",CAPS:"73",TEAM:"Leicester/Stoke"}, ctx:"Career Totals", clues:["Made what Pele himself called the greatest save he had ever seen — against him at the 1970 World Cup","Won the World Cup with England in 1966","Won 73 caps for England and conceded only 57 goals","From Sheffield England — lost the sight in one eye in a car accident which ended his career"] },
  { player:"Dino Zoff2", sport:"⚽ Soccer", answer:"DINO ZOFF2", era:"legends", stats:{WC:"1982 aged 40",CAPS:"112",SHUTOUT:"1142 minutes",TEAM:"Juventus"}, ctx:"Career Totals", clues:["Won the 1982 World Cup as Italy's captain at age 40 — oldest ever World Cup winner","Kept a world record 1142 consecutive international minutes without conceding","Won 6 Serie A titles and the European Cup with Juventus","From Mariano del Friuli Italy — played his entire club career in Italy"] },
  { player:"Eusebio2", sport:"⚽ Soccer", answer:"EUSEBIO2", era:"legends", stats:{G:"473",BALLON:"1965",WC:"1966 golden boot",NATION:"Mozambique/Portugal"}, ctx:"Career Totals — 1965 Ballon d Or and 9 World Cup goals", clues:["Won the Ballon d Or in 1965","Scored 9 goals at the 1966 World Cup leading Portugal to third place","Scored 473 goals for Benfica — his only professional club","Was nicknamed The Black Panther for his explosive speed and power"] },
  { player:"Lev Yashin2", sport:"⚽ Soccer", answer:"LEV YASHIN2", era:"legends", stats:{BALLON:"1963 only GK ever",SAVES:"150 penalties",NATION:"Soviet Union",CLUB:"Dynamo Moscow"}, ctx:"Career Totals — The only goalkeeper ever to win the Ballon d Or", clues:["Is the only goalkeeper in history to win the Ballon d Or award","Was estimated to have saved around 150 penalties in his career","Played his entire career for Dynamo Moscow — winning 5 Soviet league titles","Was known for his all-black kit and nicknamed The Black Spider"] },
  { player:"Bobby Moore2", sport:"⚽ Soccer", answer:"BOBBY MOORE2", era:"legends", stats:{WC:"1966 captain",CAPS:"108",TEAM:"West Ham",ARRESTED:"Bogota bracelet"}, ctx:"Career Totals — Captained England to their only World Cup", clues:["Captained England to their only World Cup victory in 1966","Was falsely accused of stealing a bracelet before the 1970 World Cup in Colombia","Played 108 times for England and was captain for most of those appearances","Is considered the greatest defender England ever produced"] },
  { player:"Garrincha2", sport:"⚽ Soccer", answer:"GARRINCHA2", era:"legends", stats:{WC:"2",DRIBBLE:"Unplayable",LEGS:"Born deformed",NATION:"Brazil"}, ctx:"Career Totals — Won two World Cups despite being born with deformed legs", clues:["Was born with both legs bent inward yet became one of the greatest dribblers ever","Won 2 World Cups with Brazil in 1958 and 1962","At the 1962 World Cup when Pele was injured he was arguably the best player in the world","From Pau Grande Rio de Janeiro Brazil — his story is one of sport's most remarkable"] },

  // MEDIUM Golf Legends (need 12)
  { player:"Tom Morris Jr", sport:"⛳ Golf", answer:"TOM MORRIS JR", era:"legends", stats:{BRITISH_OPEN:"4 consecutive",AGE:"17",YOUNGEST:"Still youngest",DIED:"25"}, ctx:"Career Totals", clues:["Won 4 consecutive British Opens starting at age 17 — still the youngest ever major champion","Won the 1868 British Open at 17 — a record that has stood for over 150 years","Died at age 25 under tragic circumstances — depriving golf of its greatest talent","From St Andrews Scotland — son of Old Tom Morris who also won 4 Opens"] },
  { player:"Jock Hutchison", sport:"⛳ Golf", answer:"JOCK HUTCHISON", era:"legends", stats:{BRITISH_OPEN:"1921",PGA:"1920",GROOVES:"Controversy",NATION:"USA via Scotland"}, ctx:"Career Totals — Won the PGA Championship and British Open in consecutive years", clues:["Won the PGA Championship in 1920 and the British Open in 1921","His Open win was controversial because of deeply grooved clubs that gave him unfair spin","Was born in St Andrews Scotland but emigrated to the United States","Later became one of the most beloved honorary starters at The Masters"] },
  { player:"Jim Barnes", sport:"⛳ Golf", answer:"JIM BARNES_2", era:"legends", stats:{PGA:"2",US_OPEN:"1921",BRITISH_OPEN:"1925",NATION:"England/USA"}, ctx:"Career Totals — Won four major championships across two decades", clues:["Won 4 major championships — 2 PGA Championships the US Open and the British Open","Was one of the dominant professionals of the 1910s and 1920s","Nicknamed Long Jim for his unusually tall frame and long swing","From Lelant Cornwall England — emigrated to the United States as a young man"] },
  { player:"Denny Shute", sport:"⛳ Golf", answer:"DENNY SHUTE", era:"legends", stats:{PGA:"2 consecutive",BRITISH_OPEN:"1933",RYDER:"Multiple",NATION:"USA"}, ctx:"Career Totals — Won back-to-back PGA Championships and the British Open", clues:["Won back-to-back PGA Championships in 1936 and 1937","Won the British Open at St Andrews in 1933","Was a prominent member of multiple US Ryder Cup teams","From Cleveland Ohio — was one of the most consistent players of the 1930s"] },
  { player:"Ralph Guldahl", sport:"⛳ Golf", answer:"RALPH GULDAHL_2", era:"legends", stats:{US_OPEN:"2 consecutive",MASTERS:"1939",DISAPPEAR:"Inexplicably lost form",NATION:"USA"}, ctx:"Career Totals — Won consecutive US Opens and the Masters then mysteriously lost his game", clues:["Won consecutive US Opens in 1937 and 1938 then won The Masters in 1939","Then mysteriously completely lost his game and never contended again","His unexplained decline is one of golf's greatest mysteries","From Dallas Texas — wrote a golf instruction book and some believe the process of writing it ruined his instincts"] },
  { player:"Lawson Little", sport:"⛳ Golf", answer:"LAWSON LITTLE_2", era:"legends", stats:{AMATEUR:"Won US and British both years",YEARS:"1934-35",PRO:"US Open 1940",NATION:"USA"}, ctx:"Career Totals — Won four consecutive major amateur titles before turning pro", clues:["Won the US Amateur and British Amateur in both 1934 and 1935 — four consecutive amateur majors","Won the US Open as a professional in 1940","His amateur dominance was so complete they called it Little Slam","From Newport Rhode Island — was considered the most talented amateur of his generation"] },
  { player:"Chick Evans", sport:"⛳ Golf", answer:"CHICK EVANS", era:"legends", stats:{DOUBLE:"US Open and Amateur 1916",SCHOLARSHIP:"Evans Scholars",AMATEUR:"Stayed all career",NATION:"USA"}, ctx:"Career Totals — Won the US Open and US Amateur in the same year as an amateur", clues:["Won both the US Open and US Amateur in 1916 as an amateur — the first to achieve this","Used his caddie tips to fund college tuition and established the Evans Scholars Foundation","Remained an amateur throughout his career — turning down all professional offers","From Indianapolis Indiana — the Evans Scholars Foundation has sent thousands to college"] },
  { player:"Horton Smith", sport:"⛳ Golf", answer:"HORTON SMITH_2", era:"legends", stats:{MASTERS:"First ever winner 1934",SECOND:"1936",PUTTER:"Greatest era",NATION:"USA"}, ctx:"Career Totals — Won the inaugural Masters Tournament in 1934", clues:["Won the inaugural Masters Tournament in 1934 — the first ever Masters champion","Won The Masters again in 1936","Was considered one of the greatest putters of his era","From Springfield Missouri — won 32 PGA Tour events in his career"] },
  { player:"Craig Wood", sport:"⛳ Golf", answer:"CRAIG WOOD", era:"legends", stats:{MASTERS:"1941",US_OPEN:"1941",PLAYOFF_LOSSES:"Multiple heartbreaks",NATION:"USA"}, ctx:"Career Totals — Won the Masters and US Open in the same year after years of playoff losses", clues:["Won both The Masters and the US Open in 1941","Had suffered multiple heartbreaking playoff losses before finally breaking through","Lost playoffs at the Masters British Open and PGA Championship in consecutive years before winning","From Lake Placid New York"] },
  { player:"Lloyd Mangrum", sport:"⛳ Golf", answer:"LLOYD MANGRUM_2", era:"legends", stats:{US_OPEN:"1946",PURPLE_HEART:"WWII veteran",WINS:"36",RYDER:"Multiple"}, ctx:"Career Totals — Won the US Open after serving in the Battle of the Bulge", clues:["Won the US Open in 1946 after serving in the Battle of the Bulge and receiving two Purple Hearts","Won 36 PGA Tour events in his career","Was one of the most respected figures in American golf for his wartime service","From Trenton Texas — had a poker-faced demeanor that intimidated opponents"] },
  { player:"Henry Picard", sport:"⛳ Golf", answer:"HENRY PICARD", era:"legends", stats:{MASTERS:"1938",PGA:"1939",MENTOR:"Taught Hogan and Snead",WINS:"26"}, ctx:"Career Totals — Won two majors and mentored both Ben Hogan and Sam Snead", clues:["Won The Masters in 1938 and the PGA Championship in 1939","Was instrumental in teaching and mentoring both Ben Hogan and Sam Snead early in their careers","Won 26 PGA Tour events in his career","From Plymouth Massachusetts — was known as The Chocolate Soldier for his even temperament"] },
  { player:"Olin Dutra", sport:"⛳ Golf", answer:"OLIN DUTRA", era:"legends", stats:{US_OPEN:"1934",PGA:"1932",ILLNESS:"Sick during Open",NATION:"USA"}, ctx:"Career Totals", clues:["Won the 1934 US Open while suffering from amoebic dysentery — losing 12 pounds during the week","Won the PGA Championship in 1932","His win is considered one of the most gutsy performances in major championship history","From Monterey California — brother of Mortie Dutra also a tour player"] },

  // MEDIUM Hockey Legends (need 4)
  { player:"Dit Clapper", sport:"🏒 NHL", answer:"DIT CLAPPER_2", era:"legends", stats:{SEASONS:"20",CUPS:"3",POSITIONS:"Forward and defense",BRUINS:"Legend"}, ctx:"Career Totals — First player in NHL history to play 20 seasons", clues:["Was the first player in NHL history to play 20 seasons in the league","Won 3 Stanley Cups with the Boston Bruins","Was so versatile he was an All-Star at both forward and defenseman in different seasons","From Newmarket Ontario — had his number 5 retired by the Bruins"] },
  { player:"Sweeney Schriner", sport:"🏒 NHL", answer:"SWEENEY SCHRINER", era:"legends", stats:{SCORING:"2 titles",CUPS:"2",TEAM:"Rangers/Leafs",NATION:"Canada"}, ctx:"Career Totals — Won two scoring titles and two Stanley Cups with different teams", clues:["Won the NHL scoring title in consecutive years 1936 and 1937","Won 2 Stanley Cups — one with New York and one with Toronto","Was one of the fastest skaters of his era","Born in Saratov Russia but raised in Calgary Alberta Canada"] },
  { player:"Bryan Hextall", sport:"🏒 NHL", answer:"BRYAN HEXTALL", era:"legends", stats:{SCORING:"Title 1942",OT:"1940 Cup winner",TEAM:"Rangers",DYNASTY:"Grandson also NHL"}, ctx:"Career Totals — Won the scoring title and scored the overtime Cup winner for the Rangers", clues:["Won the NHL scoring title in 1942","Scored the overtime goal that won the Stanley Cup for the New York Rangers in 1940","Was the patriarch of a three-generation NHL family — son Bryan Jr and grandson Ron also played","From Grenfell Saskatchewan Canada"] },
  { player:"Charlie Gardiner", sport:"🏒 NHL", answer:"CHARLIE GARDINER", era:"legends", stats:{VEZINA:"2",CUPS:"1934",GAA:"2.02",DIED:"1934 shortly after winning"}, ctx:"Career Totals — Won the Vezina twice and led Chicago to the Cup then died weeks later", clues:["Won 2 Vezina Trophies as the NHL's best goaltender","Captained the Chicago Blackhawks to the Stanley Cup in 1934","Died of a brain hemorrhage just weeks after winning the Cup at age 29","From Edinburgh Scotland — emigrated to Winnipeg as a child"] },
];


const HARD = [
  { player:"Jim Plunkett", sport:"🏈 NFL", answer:"PLUNKETT", era:"classic", stats:{YDS:"261",TD:"3",INT:"0",RTG:"111.2"}, ctx:"Super Bowl XV MVP — Oakland Raiders", clues:["Was a Heisman Trophy winner who overcame multiple career setbacks to win the Super Bowl","Was a backup QB who got his chance late in career","Won 2 Super Bowls as a late-career starter","First Mexican-American starting Super Bowl QB"] },
  { player:"Billy Kilmer", sport:"🏈 NFL", answer:"KILMER", era:"classic", stats:{YDS:"104",TD:"1",INT:"1",RTG:"66.7"}, ctx:"1972 NFC Championship — Washington Redskins", clues:["Led Washington to Super Bowl VII appearance","Beat the Dallas Cowboys in the NFC Championship","Backup who became a starter mid-career","Scored 1 touchdowns during this season"] },
  { player:"Virginia Ruzici", sport:"🎾 WTA", answer:"RUZICI", era:"classic", stats:{GRAND_SLAMS:"1",YEAR:"1978",SURFACE:"Clay",COUNTRY:"Romania"}, ctx:"1978 French Open — Women's Singles Champion", clues:["Won the French Open in 1978","From Romania","Defeated Mima Jausovec in the final","One of the lesser-known French Open champions"] },
  // Basketball - Modern
  // Football - Modern
  // Baseball - Modern
  // Baseball - Classic
  // Soccer - Modern
  // Soccer - Legends/Classic
  { player:"Gunnar Nordahl", sport:"⚽ Soccer", answer:"NORDAHL", era:"legends", stats:{G:"35",APP:"26",MIN:"2340",YEAR:"1950"}, ctx:"1949-50 Serie A Season — AC Milan", clues:["Led Serie A in scoring with 35 goals","One of the Gre-No-Li trio of Swedish players at Milan","AC Milan have won the European Cup 7 times — second only to Real Madrid all-time","Swedish center forward considered one of the greatest scorers ever"] },
  { player:"Helmut Rahn", sport:"⚽ Soccer", answer:"RAHN", era:"legends", stats:{G:"1",AST:"0",APP:"1",MIN:"84"}, ctx:"1954 FIFA World Cup Final — West Germany vs Hungary", clues:["Scored the winning goal in the World Cup Final with 6 minutes left","West Germany beat the heavily favored Hungary","His goal was called the Miracle of Bern","West German winger who was nearly left out of the squad"] },
  // Tennis - Modern Hard
  // Golf - Hard
  // Hockey - Hard
  { player:"Mike Vernon", sport:"🏒 NHL", answer:"VERNON", era:"classic", stats:{GAA:"1.76","SV%":".927",W:"16",TEAM:"Red Wings"}, ctx:"1997 Stanley Cup Finals MVP — Detroit Red Wings", clues:["Won the Conn Smythe Trophy as playoff MVP","Detroit Red Wings won the Cup ending a 42-year drought","The Red Wings won 4 Cups in 11 years forming the last great NHL dynasty","From Calgary, Alberta — won 2 Stanley Cups in his career"] },
  { player:"Peter Bondra", sport:"🏒 NHL", answer:"BONDRA", era:"classic", stats:{G:"52",AST:"28",PTS:"80",PIM:"40"}, ctx:"1997-98 NHL Season — Washington Capitals", clues:["Led the NHL in goals with 52","This season took place during the 1997 NHL campaign","Slovak player from Lutsk, Ukraine","One of the fastest skaters of his era"] },
  // More Modern Hard across sports
  // ── NEW HARD MODERN ──────────────────────────────────────────────────────────
  { player:"Rich Hill", sport:"⚾ MLB", answer:"HILL", era:"modern", stats:{ERA:"2.12",W:"12",SO:"174",WHIP:"0.994"}, ctx:"2016 MLB Season — Los Angeles Dodgers comeback", clues:["Was out of baseball and pitching in an independent league in 2015","Came back to become one of the best pitchers in the NL","The Dodgers moved from Brooklyn to Los Angeles in 1958 breaking New York hearts","Left-handed pitcher known for his curveball at age 36"] },
  { player:"Enes Kanter Freedom", sport:"🏀 NBA", answer:"KANTER", era:"modern", stats:{REB:"11.0",PTS:"14.4",FG:"58.4",YEAR:"2020"}, ctx:"2019-20 NBA Season — Boston Celtics", clues:["Led the NBA in offensive rebounds this season","The Celtics have the most NBA championships in history with 17 total","Later changed his name to Enes Kanter Freedom","Turkish-American center known for his outspoken political views"] },
  { player:"Gabe Kapler", sport:"⚾ MLB", answer:"KAPLER", era:"modern", stats:{G:"7",AVG:".300",RBI:"2",ROLE:"PH/PR"}, ctx:"2002 World Series — Anaheim Angels", clues:["Later became a Major League manager for the San Francisco Giants","Later became a manager in MLB","Known for his extreme fitness regiment","Played outfield for multiple teams over his career"] },
  { player:"Karim Abdul-Jabbar", sport:"⚽ Soccer", answer:"KARIM SOCCER", era:"classic", stats:{G:"24",APP:"56",MIN:"4320",YEAR:"1998"}, ctx:"1997-98 MLS Season — LA Galaxy", clues:["Led MLS in scoring this season","Scored 24 goals during this tournament or season","Changed his name — not to be confused with the NBA player","Was the face of early MLS soccer in Los Angeles"] },
  { player:"Morten Andersen", sport:"🏈 NFL", answer:"ANDERSEN", era:"classic", stats:{PTS:"2544",FGM:"565",XP:"849",SEASONS:"25"}, ctx:"Career — All-time NFL scoring leader for 17 years", clues:["Was the NFL's all-time scoring leader for many years","Danish-born placekicker who played 25 seasons","Was inducted into the Pro Football Hall of Fame after his career","Nicknamed The Great Dane"] },
  { player:"Harold Baines", sport:"⚾ MLB", answer:"BAINES", era:"classic", stats:{HR:"384",AVG:".289",RBI:"1628",YEAR:"2019"}, ctx:"Career — Controversial Hall of Fame inductee", clues:["Was controversially elected to the Hall of Fame","Spent most of his career with the Chicago White Sox","Was a designated hitter for the majority of his career","His Hall of Fame election was criticized as it lowered the standards"] },
  { player:"Bob Lemon", sport:"⚾ MLB", answer:"LEMON", era:"legends", stats:{W:"207",ERA:"3.23",SO:"1277",CG:"188"}, ctx:"Career — Cleveland Indians pitching ace", clues:["Originally an infielder who converted to pitcher","Won 207 games as a converted position player","Posted an ERA of 3.23 — among the best of the season","Later managed the Yankees to a World Series title in 1978"] },
  { player:"Herb Score", sport:"⚾ MLB", answer:"SCORE", era:"legends", stats:{ERA:"2.85",W:"36",SO:"508",YEAR:"1956"}, ctx:"1955-56 MLB Seasons — Cleveland Indians", clues:["Was considered the next great pitcher before a career-ending injury","Struck out 245 batters as a rookie in 1955","Was hit in the face by a line drive in 1957 that derailed his career","Left-handed pitcher for the Cleveland Indians"] },
  { player:"Allie Reynolds", sport:"⚾ MLB", answer:"REYNOLDS", era:"legends", stats:{W:"182",ERA:"3.30",NH:"2",CG:"137"}, ctx:"Career — New York Yankees ace pitcher", clues:["Threw 2 no-hitters in the same season (1951)","Won 6 World Series championships with the Yankees","Was part-Creek Native American","Nicknamed Superchief"] },
  { player:"Charley Trippi", sport:"🏈 NFL", answer:"TRIPPI", era:"legends", stats:{RUSH:"206",REC:"2",TD:"2",YDS:"240"}, ctx:"1947 NFL Championship — Chicago Cardinals", clues:["Led the Chicago Cardinals to their only NFL title","Was an All-American at Georgia","Could run, pass, and return kicks at an elite level","Part of the Dream Backfield that won the 1947 championship"] },
  { player:"Marion Motley", sport:"🏈 NFL", answer:"MOTLEY", era:"legends", stats:{YDS:"828",AVG:"5.7",TD:"8",YEAR:"1950"}, ctx:"1950 NFL Season — Cleveland Browns", clues:["Was one of the first Black players in professional football","Led the NFL in rushing yards in 1950","Scored 8 touchdowns during this season","Paved the way for integration in professional football"] },
  { player:"Ace Parker", sport:"🏈 NFL", answer:"PARKER", era:"legends", stats:{PASS:"865",RUSH:"321",INT:"6",YEAR:"1940"}, ctx:"1940 NFL MVP Season — Brooklyn Dodgers", clues:["Won the NFL MVP award in 1940","This performance came during the 1940 NFL season","Was also a professional baseball player for the Philadelphia Athletics","One of the few players to play in both the NFL and MLB"] },
  { player:"Bill Tilden", sport:"🎾 ATP", answer:"TILDEN", era:"legends", stats:{W:"138",L:"5",TITLES:"9",YEAR:"1925"}, ctx:"1925 ATP Season — Dominant American era", clues:["Won 10 Grand Slam titles in his career","Dominated tennis through the 1920s","First American player to win Wimbledon","Was ranked World No. 1 for 6 consecutive years"] },
  { player:"Rene Lacoste", sport:"🎾 ATP", answer:"LACOSTE", era:"legends", stats:{GRAND_SLAMS:"7",DAVIS:"5",YEAR:"1927",NATION:"France"}, ctx:"1927 — French tennis dominant era", clues:["Won 7 Grand Slam titles in the 1920s","Was part of the famous Four Musketeers of French tennis","Founded the famous Lacoste clothing brand after retiring","Nicknamed The Crocodile — which inspired his clothing logo"] },
  { player:"Pancho Segura", sport:"🎾 ATP", answer:"SEGURA", era:"legends", stats:{PRO:"1",YEAR:"1952",NATION:"Ecuador",TITLES:"3"}, ctx:"1950s Professional Tennis — Dominant pro circuit player", clues:["Won the US Pro Championship 3 consecutive times","Was from Guayaquil, Ecuador — one of the first Latino tennis stars","Had an unusual two-handed forehand before it was common","Later coached Jimmy Connors to multiple Grand Slam titles"] },
  { player:"Kel Nagle", sport:"⛳ Golf", answer:"NAGLE", era:"legends", stats:{WINS:"1",MAJORS:"1",YEAR:"1960",COUNTRY:"Australia"}, ctx:"1960 British Open — St Andrews centenary", clues:["Won the 1960 British Open at St Andrews in the centenary celebration","Beat Arnold Palmer by one shot","Australian golfer who won the Open at age 39","Was considered a major upset over the heavily favored Palmer"] },
  { player:"Roberto De Vicenzo", sport:"⛳ Golf", answer:"DE VICENZO", era:"legends", stats:{WINS:"1",MAJORS:"1",YEAR:"1967",MISTAKE:"1"}, ctx:"1967 British Open — Hoylake, England", clues:["Won the 1967 British Open at age 44","Famous for signing an incorrect scorecard at the 1968 Masters — costing him a playoff","From Buenos Aires, Argentina","Won over 200 tournaments worldwide in his career"] },
  { player:"Julius Boros", sport:"⛳ Golf", answer:"BOROS", era:"legends", stats:{MAJORS:"3",AGE:"48",WINS:"18",YEAR:"1968"}, ctx:"1968 PGA Championship — An unlikely champion at Pecan Valley", clues:["Won the 1968 PGA Championship at age 48 — oldest major winner ever","Won 3 major championships in his career","From Fairfield, Connecticut","Was known for his relaxed, unhurried swing"] },
  { player:"Khoury Randolph", sport:"🏈 NFL", answer:"RANDOLPH", era:"modern", stats:{INT:"6",PBU:"12",YDS:"65",YEAR:"2006"}, ctx:"2006 NFL Season — Chicago Bears defense", clues:["Was part of the Bears defense that reached Super Bowl XLI","Played cornerback for the Chicago Bears","Was an undrafted free agent who earned a starting role","The Bears defense that year was one of the best in the NFL"] },
  { player:"Virgil Trucks", sport:"⚾ MLB", answer:"TRUCKS", era:"legends", stats:{NH:"2",W:"5",ERA:"3.97",YEAR:"1952"}, ctx:"1952 MLB Season — Detroit Tigers", clues:["Threw 2 no-hitters in the same season despite finishing 5-19","The Tigers have one of baseball's most storied franchises featuring Ty Cobb Hank Greenberg and Al Kaline","One of only 4 pitchers ever to throw 2 no-hitters in a season","The 2 no-hitters came in a losing season — one of baseball's strangest feats"] },
  { player:"Bobo Holloman", sport:"⚾ MLB", answer:"HOLLOMAN", era:"legends", stats:{NH:"1",W:"3",ERA:"5.23",YEAR:"1953"}, ctx:"1953 MLB Season — St. Louis Browns debut", clues:["Threw a no-hitter in his very first MLB start","Posted an ERA of 5.23 — among the best of the season","Was released later that same season after struggling","His no-hitter in his debut is one of the most unlikely in baseball history"] },
  { player:"Harvey Haddix", sport:"⚾ MLB", answer:"HADDIX", era:"legends", stats:{IP:"12",H:"0",BB:"0",SO:"8"}, ctx:"May 26, 1959 — Pittsburgh Pirates vs Milwaukee Braves", clues:["Pitched 12 perfect innings — the greatest pitching performance ever","Lost the perfect game AND the no-hitter in the 13th inning","Played during the Pirates dynasty years alongside Roberto Clemente and Willie Stargell","His game is still considered the greatest pitching performance in MLB history despite the loss"] },
  { player:"Pete Vukovich", sport:"⚾ MLB", answer:"VUKOVICH", era:"classic", stats:{W:"18",ERA:"3.34",CG:"10",YEAR:"1982"}, ctx:"1982 AL Cy Young — Milwaukee Brewers", clues:["His team reached the World Series this year","Led the Brewers to the World Series this year","Was known as an intimidating presence on the mound","Later famously appeared as the villain pitcher in Major League"] },
  { player:"LaMarr Hoyt", sport:"⚾ MLB", answer:"HOYT", era:"classic", stats:{W:"24",ERA:"3.66",CG:"12",YEAR:"1983"}, ctx:"1983 AL Cy Young — Chicago White Sox", clues:["Led the White Sox to the AL West title","Led the White Sox to the AL West title","The White Sox were at the center of the 1919 Black Sox scandal — the greatest fix in baseball history","Later famously appeared as the villain pitcher in Major League"] },
  { player:"Mike Flanagan", sport:"⚾ MLB", answer:"FLANAGAN", era:"classic", stats:{W:"23",ERA:"3.08",CG:"16",YEAR:"1979"}, ctx:"1979 AL Cy Young — Baltimore Orioles", clues:["Led Baltimore to the World Series this same year","Led Baltimore to the World Series this year","Left-handed pitcher from Manchester, New Hampshire","Was part of the great Orioles pitching staffs of the late 1970s"] },
  { player:"Hal Newhouser", sport:"⚾ MLB", answer:"NEWHOUSER", era:"legends", stats:{W:"25",ERA:"1.81",SO:"212",YEAR:"1945"}, ctx:"1945 MLB MVP Season — Detroit Tigers", clues:["Won back-to-back MVP awards in 1944 and 1945","Had a 1.81 ERA in 1945","The Tigers have one of baseball's most storied franchises featuring Ty Cobb Hank Greenberg and Al Kaline","His dominance during WWII was questioned since many stars were serving"] },
  { player:"Wally Berger", sport:"⚾ MLB", answer:"BERGER", era:"legends", stats:{HR:"38",AVG:".310",RBI:"119",YEAR:"1930"}, ctx:"1930 MLB Season — Boston Braves rookie", clues:["Set the NL rookie home run record with 38 HRs in 1930","The record stood for decades","Batted .310 during this standout season","Was one of the best power hitters of the 1930s despite playing for weak teams"] },
  { player:"Dick Groat", sport:"⚾ MLB", answer:"GROAT", era:"legends", stats:{AVG:".325",HR:"2",RBI:"50",YEAR:"1960"}, ctx:"1960 NL MVP Season — Pittsburgh Pirates", clues:["Won the NL MVP as a shortstop who barely hit any home runs","Led the Pirates to the 1960 World Series championship","Was also a two-time All-American basketball player at Duke","Beat out Willie Mays for the MVP award"] },
  { player:"Norm Cash", sport:"⚾ MLB", answer:"CASH", era:"legends", stats:{HR:"41",AVG:".361",RBI:"132",YEAR:"1961"}, ctx:"1961 MLB Season — Detroit Tigers", clues:["Hit .361 with 41 HRs but never won an MVP award","Never came close to this season again in his career","The Tigers have one of baseball's most storied franchises featuring Ty Cobb Hank Greenberg and Al Kaline","Later admitted he used a corked bat during his .361 season"] },
  { player:"Jim Wynn", sport:"⚾ MLB", answer:"WYNN", era:"classic", stats:{G:"4",HR:"1",AVG:".250",RBI:"2"}, ctx:"1974 NL Championship Series — Los Angeles Dodgers", clues:["Led the Dodgers to the World Series this year","Was nicknamed The Toy Cannon for his small stature and power","The Dodgers moved from Brooklyn to Los Angeles in 1958 breaking New York hearts","Was one of the first power hitters to prioritize walks and OBP"] },
  { player:"Chet Lemon", sport:"⚾ MLB", answer:"CHET LEMON", era:"classic", stats:{HR:"24",AVG:".318",RBI:"86",YEAR:"1979"}, ctx:"1979 MLB Season — Chicago White Sox", clues:["Hit .318 with 24 HRs for the White Sox in 1979","Was one of the best defensive center fielders of the 1980s","The White Sox were at the center of the 1919 Black Sox scandal — the greatest fix in baseball history","Won a World Series with the Tigers in 1984"] },
  { player:"Rick Reuschel", sport:"⚾ MLB", answer:"REUSCHEL", era:"classic", stats:{ERA:"2.79",W:"17",SO:"196",YEAR:"1977"}, ctx:"1977 MLB Season — Chicago Cubs", clues:["Was one of the most underrated pitchers of the 1970s and 80s","Known as Big Daddy for his large frame","The Cubs ended a 108-year World Series drought in 2016 in one of sports greatest moments","Finished 3rd in Cy Young voting multiple times without ever winning"] },
  { player:"Vada Pinson", sport:"⚾ MLB", answer:"PINSON", era:"legends", stats:{H:"204",AVG:".343",HR:"20",YEAR:"1959"}, ctx:"1959 MLB Season — Cincinnati Reds", clues:["Hit .343 with 204 hits as a 20-year-old in 1959","Was a perennial All-Star who never won an MVP","The Big Red Machine Reds of the 1970s were one of baseball's greatest dynasties","Was considered one of the most underrated players of his era"] },
  { player:"Billy Pierce", sport:"⚾ MLB", answer:"PIERCE", era:"legends", stats:{W:"211",ERA:"3.27",SO:"1999",CG:"193"}, ctx:"Career — Chicago White Sox ace 1950s", clues:["Was a 7x All-Star who finished with a 211-169 record and 3.27 ERA","Finished with 211 wins but is not in the Hall of Fame","Was a 7-time All-Star","Is considered one of the most underrated pitchers of the postwar era"] },
  { player:"Hal Greer", sport:"🏀 NBA", answer:"GREER", era:"legends", stats:{PTS:"22.1",REB:"5.3",AST:"4.7",YEAR:"1968"}, ctx:"1967-68 NBA Season — Philadelphia 76ers", clues:["Was the leading scorer on the 76ers team that went 68-13","Played all 15 seasons for the same franchise","Was known for shooting his free throws as jump shots","From Huntington, West Virginia — 10x NBA All-Star"] },
  { player:"Bailey Howell", sport:"🏀 NBA", answer:"HOWELL", era:"legends", stats:{PTS:"19.8",REB:"9.9",FG:"49.8",YEAR:"1966"}, ctx:"1965-66 NBA Season — Baltimore Bullets", clues:["Averaged nearly 20 points and 10 rebounds for Baltimore","Celtic were the first British club to win the European Cup in 1967 — known as the Lisbon Lions","Was a 6x NBA All-Star","From Middleton, Tennessee — Mississippi State standout"] },
  { player:"Clyde Lee", sport:"🏀 NBA", answer:"CLYDE LEE", era:"legends", stats:{REB:"14.0",PTS:"10.2",BLK:"2.1",YEAR:"1970"}, ctx:"1969-70 NBA Season — San Francisco Warriors", clues:["Was one of the best rebounders in the NBA in the late 1960s","Averaged 10.2 points per game during this season","Was a 7-footer before 7-footers were common","Played college ball at Vanderbilt University"] },

  // ── HARD TENNIS (modern) ─────────────────────────────────────────────────────
  { player:"Fernando Gonzalez", sport:"🎾 ATP", answer:"GONZALEZ", era:"modern", stats:{W:"44",L:"9",TITLES:"4",GS:"0"}, ctx:"2007 ATP Season — Career best year", clues:["Won 4 titles and reached the Australian Open final this year","Reached a career high ranking of World No. 5","From Santiago, Chile — known for his huge forehand","Won Olympic silver at the 2004 Athens Olympics"] },
  { player:"Nikolay Davydenko", sport:"🎾 ATP", answer:"DAVYDENKO", era:"modern", stats:{W:"73",L:"23",TITLES:"6",BEST_RANK:"3"}, ctx:"2006 ATP Season — Reached World No. 3", clues:["Reached a career high of World No. 3 this season","Won the ATP World Tour Finals in 2006","Russian player known for his precise baseline game","Never won a Grand Slam despite reaching the top 3"] },
  { player:"Tommy Haas", sport:"🎾 ATP", answer:"HAAS", era:"modern", stats:{W:"51",L:"19",TITLES:"3",BEST_RANK:"2"}, ctx:"2002 ATP Season — Reached World No. 2", clues:["Reached World No. 2 after winning the German Open and Hamburg Open","German player who overcame serious shoulder surgery twice","Reached the Australian Open final in 2002","Came back to win titles at age 35"] },
  { player:"Fabrice Santoro", sport:"🎾 ATP", answer:"SANTORO", era:"modern", stats:{W:"43",L:"22",TITLES:"2",RANK:"17"}, ctx:"2001 ATP Season — Career best year", clues:["Was known for his unusual double-handed forehand and backhand","French player nicknamed The Magician for his shot-making","Played professional tennis for 24 years","Won the French Open doubles title multiple times"] },
  { player:"Marcelo Rios", sport:"🎾 ATP", answer:"RIOS", era:"classic", stats:{W:"75",L:"19",WORLD_NO1:"Yes",GS:"0"}, ctx:"1998 ATP Season", clues:["Became World No. 1 without ever winning a Grand Slam — still the only player to do so","From Santiago, Chile — first South American to reach No. 1","Won the Masters in 1998 and reached the Australian Open final","Was known for his exceptional talent but difficult personality"] },
  { player:"Alex Corretja", sport:"🎾 ATP", answer:"CORRETJA", era:"classic", stats:{W:"67",L:"27",TITLES:"3",BEST_RANK:"2"}, ctx:"1998 ATP Season — Reached World No. 2", clues:["Reached a career high of World No. 2 in 1998","Spanish clay court specialist who won 3 titles this year","Won the ATP Finals in 1998","Was best known for a famous 1996 US Open match vs Sampras where both players vomited on court"] },

  // ── HARD TENNIS (classic) ────────────────────────────────────────────────────
  { player:"Vitas Gerulaitis", sport:"🎾 ATP", answer:"GERULAITIS", era:"classic", stats:{W:"57",L:"23",TITLES:"4",GS:"0"}, ctx:"1977 ATP Season — Career best year", clues:["Reached the Australian Open final and Wimbledon semifinal this year","American player known as Broadway Vitas for his flamboyant lifestyle","Famous for saying nobody beats Vitas Gerulaitis 17 times in a row — then losing to him","Died tragically in 1994 from accidental carbon monoxide poisoning"] },
  { player:"Jose-Luis Clerc", sport:"🎾 ATP", answer:"CLERC", era:"classic", stats:{W:"72",L:"22",TITLES:"9",BEST_RANK:"4"}, ctx:"1981 ATP Season — Career best year", clues:["Won 9 titles this season and reached a career high of World No. 4","Argentine clay court specialist of the early 1980s","Reached the French Open semifinals multiple times","Was part of a golden era of Argentine tennis alongside Vilas"] },
  { player:"Harold Solomon", sport:"🎾 ATP", answer:"SOLOMON", era:"classic", stats:{W:"54",L:"28",TITLES:"3",RANK:"5"}, ctx:"1980 ATP Season — Ranked World No. 5", clues:["Reached a career high of World No. 5 in 1980","American clay court specialist known for his consistency","Reached the French Open final in 1976","Was nicknamed The Crab for his defensive style"] },

  // ── HARD TENNIS (legends) ────────────────────────────────────────────────────
  { player:"Tony Roche", sport:"🎾 ATP", answer:"ROCHE", era:"legends", stats:{GRAND_SLAMS:"1",YEAR:"1966",COUNTRY:"Australia",DAVIS:"4"}, ctx:"1966 French Open — Australian left-hander", clues:["Won the 1966 French Open in his best singles result","Was better known as a doubles player — won 13 Grand Slam doubles titles","Australian left-hander who was John Newcombe's doubles partner","Later became a renowned coach working with multiple top players"] },

  // ── HARD SOCCER (classic) ────────────────────────────────────────────────────
  { player:"Preben Elkjaer", sport:"⚽ Soccer", answer:"ELKJAER", era:"classic", stats:{G:"10",APP:"38",BALLON:"3rd",YEAR:"1985"}, ctx:"1985-86 Season — Denmark golden generation", clues:["Finished 3rd in the 1985 Ballon d'Or voting","Was the star of Denmark's great 1986 World Cup team","Scored 10 goals during this tournament or season","Danish striker known for his powerful running style"] },

  // ── HARD FOOTBALL (modern) ───────────────────────────────────────────────────
  { player:"Brad Johnson", sport:"🏈 NFL", answer:"BRAD JOHNSON", era:"modern", stats:{YDS:"215",TD:"2",INT:"1",RTG:"101.8"}, ctx:"Super Bowl XXXVII MVP team — Tampa Bay Buccaneers", clues:["Won the Super Bowl with the Tampa Bay Buccaneers in 2003","His team won 48-21 — the most lopsided Super Bowl ever at that time","Was considered a game manager who relied on the defense","Scored 2 touchdowns during this season"] },

  // ── HARD FOOTBALL (classic) ──────────────────────────────────────────────────
  { player:"Harvey Martin", sport:"🏈 NFL", answer:"MARTIN", era:"classic", stats:{SCK:"23",FF:"3",YEAR:"1977",AWARD:"DPOY"}, ctx:"1977 NFL Season — Dallas Cowboys Defensive Player of Year", clues:["Won the NFL Defensive Player of the Year award in 1977","This performance came during the 1977 NFL season","Was co-MVP of Super Bowl XII with Randy White","Nicknamed Too Mean"] },

  // ── HARD FOOTBALL (legends) ──────────────────────────────────────────────────

  // ── HARD HOCKEY (modern) ─────────────────────────────────────────────────────

  // ── HARD HOCKEY (legends) ────────────────────────────────────────────────────
  { player:"Bill Mosienko", sport:"🏒 NHL", answer:"MOSIENKO", era:"legends", stats:{G:"3",TIME:"21sec",PER:"3rd",OPP:"Rangers"}, ctx:"March 23, 1952 — Chicago Blackhawks vs New York Rangers", clues:["Scored 3 goals in 21 seconds — the fastest hat trick in NHL history","The Blackhawks won 3 Cups in 6 years forming the most recent NHL dynasty","The record has stood for over 70 years","Ukrainian-Canadian winger from Winnipeg, Manitoba"] },
  { player:"Nels Stewart", sport:"🏒 NHL", answer:"NELS", era:"legends", stats:{G:"324",PTS:"515",YEAR:"1940",TEAMS:"3"}, ctx:"Career — First NHL player to score 300 goals", clues:["Was the first player in NHL history to score 300 career goals","The Bruins have the second most Stanley Cup championships in NHL history","Won the Hart Trophy twice as league MVP","Nicknamed Old Poison for his deadly shooting"] },
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
  { player:"Phil Smith", sport:"🏀 NBA", answer:"PHIL SMITH", era:"classic", stats:{PTS:"20.0",AST:"5.4",REB:"3.5",YEAR:"1976"}, ctx:"1975-76 NBA Season — Golden State Warriors", clues:["Was a key player on the Golden State Warriors championship team","Played his entire career for the Golden State Warriors","From Compton California","Was known for his clutch shooting and defensive ability"] },
  { player:"Luol Deng", sport:"🏀 NBA", answer:"LUOL DENG", era:"modern", stats:{PTS:"18.5",REB:"7.0",AST:"3.0",STL:"1.5"}, ctx:"2006-07 NBA Season — Chicago Bulls All-Star", clues:["Was the heart of the Chicago Bulls team that upset the Heat in the 2007 playoffs","Was the cornerstone of the dynasty that won 6 championships in the 1990s","Born in Sudan — one of the Lost Boys refugee story","Was the 7th overall pick in the 2004 NBA Draft"] },
  { player:"John Drew", sport:"🏀 NBA", answer:"JOHN DREW", era:"classic", stats:{PTS:"24.2",REB:"10.4",FG:"47.8",YEAR:"1978"}, ctx:"1977-78 NBA Season — Atlanta Hawks All-Star", clues:["Was a 5x All-Star for the Atlanta Hawks","Averaged 24.2 points per game during this season","Struggled with substance abuse that ended his career prematurely","Was one of the best power forwards of the late 1970s"] },
  { player:"George Yardley", sport:"🏀 NBA", answer:"GEORGE YARDLEY", era:"legends", stats:{PTS:"27.8",REB:"10.7",FG:"42.0",YEAR:"1958"}, ctx:"1957-58 NBA Season — Detroit Pistons first 2000-point scorer", clues:["Was the first player in NBA history to score 2000 points in a season","The Bad Boys Pistons were notorious for their physical and intimidating style of play","Nicknamed The Bird for his thin frame and leaping ability","Was a 6x All-Star"] },
  { player:"Andy Phillip", sport:"🏀 NBA", answer:"ANDY PHILLIP NBA", era:"legends", stats:{PTS:"12.1",AST:"8.3",REB:"5.0",TITLES:"1"}, ctx:"1951-52 NBA Season — Philadelphia Warriors assists leader", clues:["Led the NBA in assists this season","Was the first player to lead the NBA in assists multiple times","Won a championship with the Boston Celtics in 1957","From Granite City Illinois"] },
  { player:"Slater Martin", sport:"🏀 NBA", answer:"SLATER MARTIN", era:"legends", stats:{PTS:"11.4",AST:"4.2",REB:"3.0",TITLES:"4"}, ctx:"Career — Minneapolis Lakers dynasty point guard", clues:["Won 4 NBA championships with the Minneapolis Lakers","Was considered the best defensive guard of his era","Averaged 11.4 points per game during this season","Was a 7x All-Star"] },
  { player:"Bobby Wanzer", sport:"🏀 NBA", answer:"BOBBY WANZER", era:"legends", stats:{PTS:"15.8",FT:"90.4",AST:"3.5",TITLES:"1"}, ctx:"1951-52 NBA Season — Rochester Royals champion", clues:["Won the NBA championship with the Rochester Royals","Shot 90.4% from the free throw line — a record at the time","Averaged 15.8 points per game during this season","Was a 5x All-Star"] },
  { player:"Harry Gallatin", sport:"🏀 NBA", answer:"HARRY GALLATIN", era:"legends", stats:{PTS:"15.0",REB:"15.3",FT:"79.6",STREAK:"682"}, ctx:"Career — New York Knicks iron man", clues:["Played 682 consecutive games — a record at the time","The Knicks play at Madison Square Garden — often called the most famous arena in the world","Was nicknamed The Horse for his durability","Was a 7x All-Star"] },
  { player:"Trent Dilfer", sport:"🏈 NFL", answer:"TRENT DILFER", era:"modern", stats:{YDS:"153",TD:"1",INT:"0",RTG:"112.8"}, ctx:"Super Bowl XXXV MVP team — Baltimore Ravens", clues:["Won the Super Bowl with the Baltimore Ravens","Was considered the weakest link on a dominant defense-led team","Had been cut by Tampa Bay before winning the championship","Scored 1 touchdowns during this season"] },
  { player:"Brad Johnson", sport:"🏈 NFL", answer:"BRAD JOHNSON_2", era:"modern", stats:{YDS:"215",TD:"2",INT:"1",RTG:"101.8"}, ctx:"Super Bowl XXXVII MVP team — Tampa Bay Buccaneers", clues:["Won the Super Bowl with the Tampa Bay Buccaneers","Scored 2 touchdowns during this season","Had previously played for the Minnesota Vikings and Washington","Was a backup who became the starter at the right time"] },
  { player:"Jake Delhomme", sport:"🏈 NFL", answer:"JAKE DELHOMME", era:"modern", stats:{YDS:"323",TD:"3",INT:"1",RTG:"100.1"}, ctx:"2003 NFC Championship — Carolina Panthers", clues:["Led the Carolina Panthers to the Super Bowl","Scored 3 touchdowns during this season","From Breaux Bridge Louisiana","Was an undrafted free agent who became a starter"] },
  { player:"Elvis Grbac", sport:"🏈 NFL", answer:"ELVIS GRBAC", era:"modern", stats:{YDS:"4169",TD:"28",INT:"14",RTG:"89.9"}, ctx:"2000 NFL Season — Kansas City Chiefs", clues:["Was infamously called a disgrace by a teammate's wife after an injury","Scored 28 touchdowns during this season","Was a backup for Steve Young in San Francisco","Was infamously called a disgrace by the wife of an injured teammate"] },
  { player:"Charlie Batch", sport:"🏈 NFL", answer:"CHARLIE BATCH", era:"classic", stats:{YDS:"1957",TD:"11",INT:"6",RTG:"82.5"}, ctx:"1999 NFL Season — Detroit Lions starting QB", clues:["Was the starting quarterback for the Detroit Lions","From Homestead Pennsylvania","Later became a backup for Ben Roethlisberger in Pittsburgh","Won 2 Super Bowl rings as a backup with Pittsburgh"] },
  { player:"Quincy Carter", sport:"🏈 NFL", answer:"QUINCY CARTER", era:"modern", stats:{YDS:"3302",TD:"16",INT:"11",RTG:"82.1"}, ctx:"2003 NFL Season — Dallas Cowboys", clues:["Was the starting quarterback for the Dallas Cowboys","Scored 16 touchdowns during this season","Was a second round pick in the 2001 NFL Draft","Was released before the 2004 season despite having a decent year"] },
  { player:"A.J. Feeley", sport:"🏈 NFL", answer:"AJ FEELEY", era:"modern", stats:{YDS:"1011",TD:"6",INT:"2",RTG:"89.4"}, ctx:"2002 NFL Season — Philadelphia Eagles emergency starter", clues:["Went 4-1 as an emergency starter for the Eagles","Scored 6 touchdowns during this season","Was a 5th round draft pick out of Oregon","Later married Heather Mitts the soccer player"] },
  { player:"Kordell Stewart", sport:"🏈 NFL", answer:"SLASH", era:"modern", stats:{YDS:"3020",TD:"26",INT:"17",RUSH:"419"}, ctx:"2001 NFL Season — Pittsburgh Steelers AFC Champion", clues:["Led Pittsburgh Steelers to the AFC Championship Game","Nicknamed Slash for his ability to play multiple positions","Scored 26 touchdowns during this season","Was one of the first true dual-threat quarterbacks of the modern era"] },
  { player:"Neil O'Donnell", sport:"🏈 NFL", answer:"NEIL O DONNELL", era:"classic", stats:{YDS:"2970",TD:"17",INT:"7",RTG:"87.7"}, ctx:"1994 NFL Season — Pittsburgh Steelers", clues:["Led Pittsburgh Steelers to the Super Bowl this season","Threw 2 interceptions directly to Larry Brown in Super Bowl XXX","Scored 17 touchdowns during this season","Was considered a very reliable but unspectacular quarterback"] },
  { player:"Dave Krieg", sport:"🏈 NFL", answer:"DAVE KRIEG", era:"classic", stats:{YDS:"3309",TD:"23",INT:"12",RTG:"94.6"}, ctx:"1994 NFL Season — Arizona Cardinals", clues:["Was an undrafted free agent who had a long successful career","Scored 23 touchdowns during this season","Started his career with the Seattle Seahawks","Holds the record for the most fumbles in NFL history"] },
  { player:"Harvey Martin", sport:"🏈 NFL", answer:"HARVEY MARTIN", era:"classic", stats:{SACK:"23",FF:"5",DPOY:"1",YEAR:"1977"}, ctx:"1977 NFL Season — Dallas Cowboys Defensive Player of Year", clues:["Won the Defensive Player of the Year award","Also won the Super Bowl XII MVP as a defensive player","This performance came during the 1977 NFL season","Nicknamed The Judge — was extremely dominant in the late 1970s"] },
  { player:"Billy Kilmer", sport:"🏈 NFL", answer:"BILLY KILMER", era:"classic", stats:{YDS:"2440",TD:"19",INT:"11",RTG:"87.5"}, ctx:"1972 NFL Season — Washington Redskins Super Bowl run", clues:["Led the Washington Redskins to the Super Bowl","Scored 19 touchdowns during this season","Was known for his wobbly passes that somehow always found receivers","Competed with Sonny Jurgensen for the starting job"] },
  { player:"Earl Morrall", sport:"🏈 NFL", answer:"EARL MORRALL", era:"legends", stats:{YDS:"2909",TD:"26",INT:"17",RTG:"93.2"}, ctx:"1968 NFL Season — Baltimore Colts MVP replacement", clues:["Won the NFL MVP award filling in for injured Johnny Unitas","Scored 26 touchdowns during this season","Led the Colts to a Super Bowl berth only to lose to Joe Namath","Later filled in for Bob Griese on the undefeated 1972 Dolphins"] },
  { player:"Len Dawson", sport:"🏈 NFL", answer:"LEN DAWSON", era:"classic", stats:{YDS:"200",TD:"1",INT:"1",RTG:"98.2"}, ctx:"Super Bowl IV MVP — Kansas City Chiefs vs Minnesota Vikings", clues:["Won the Super Bowl MVP with the Kansas City Chiefs","Scored 1 touchdowns during this season","Was released by multiple teams before finding success","Was the first quarterback to pass for over 2000 yards in the AFL"] },
  { player:"Daryle Lamonica", sport:"🏈 NFL", answer:"LAMONICA", era:"legends", stats:{YDS:"3228",TD:"30",INT:"20",RTG:"80.0"}, ctx:"1967 AFL Season — Oakland Raiders MVP", clues:["Won the AFL MVP this season","Nicknamed The Mad Bomber for his deep passing attack","The Raiders won 3 Super Bowls with an outlaw rebellious team culture","Led Oakland to Super Bowl II but lost to the Green Bay Packers"] },
  { player:"Roman Gabriel", sport:"🏈 NFL", answer:"ROMAN GABRIEL", era:"legends", stats:{YDS:"2779",TD:"24",INT:"7",RTG:"91.0"}, ctx:"1969 NFL Season — Los Angeles Rams MVP", clues:["Won the NFL MVP award this season","Scored 24 touchdowns during this season","Was the first Filipino-American starting quarterback in NFL history","Later won the Comeback Player of the Year with Philadelphia"] },
  { player:"Bob Lee", sport:"🏈 NFL", answer:"BOB LEE QB", era:"classic", stats:{YDS:"1440",TD:"12",INT:"10",RTG:"68.4"}, ctx:"1975 NFL Season — Minnesota Vikings backup QB", clues:["Was the emergency starter for the Vikings when Tarkenton was injured","The Vikings reached the Super Bowl 4 times but came away without a win each time","Was one of the most traveled backup quarterbacks in NFL history","Scored 12 touchdowns during this season"] },
  { player:"LaMarr Hoyt", sport:"⚾ MLB", answer:"LAMARR HOYT", era:"classic", stats:{W:"24",ERA:"3.66",SO:"148",WHIP:"1.113"}, ctx:"1983 MLB Season — Chicago White Sox Cy Young", clues:["Won the AL Cy Young award with the Chicago White Sox","Won 24 games this season","Had his career derailed by substance abuse problems","Was a large man with no obvious physical advantages but great command"] },
  { player:"Pete Vukovich", sport:"⚾ MLB", answer:"PETE VUKOVICH", era:"classic", stats:{W:"18",ERA:"3.34",SO:"105",WHIP:"1.201"}, ctx:"1982 MLB Season — Milwaukee Brewers Cy Young", clues:["Won the AL Cy Young with the Milwaukee Brewers","Was known for his intimidating presence and eccentricity","Played the villain in the movie Major League","Had his career cut short by injury"] },
  { player:"Rick Sutcliffe", sport:"⚾ MLB", answer:"RICK SUTCLIFFE", era:"classic", stats:{W:"16",ERA:"2.69",SO:"155",WHIP:"1.070"}, ctx:"1984 MLB Season — Chicago Cubs Cy Young", clues:["Won the NL Cy Young award going 16-1 with the Cubs after a mid-season trade","Had gone 4-5 with Cleveland before the trade","The Cubs ended a 108-year World Series drought in 2016 in one of sports greatest moments","Led the Cubs to the NLCS for the first time in 39 years"] },
  { player:"Bret Saberhagen", sport:"⚾ MLB", answer:"SABERHAGEN", era:"classic", stats:{W:"20",ERA:"2.87",SO:"158",WHIP:"1.065"}, ctx:"1985 MLB Season — Kansas City Royals Cy Young", clues:["Won the AL Cy Young with the Kansas City Royals","Also won the World Series MVP that year","Was only 21 years old","Had a career of alternating dominant and mediocre seasons"] },
  { player:"Frank Viola", sport:"⚾ MLB", answer:"SWEET MUSIC", era:"classic", stats:{W:"24",ERA:"2.64",SO:"193",WHIP:"1.020"}, ctx:"1988 MLB Season — Minnesota Twins Cy Young", clues:["Won the AL Cy Young with the Minnesota Twins","Won 24 games this season","Nicknamed Sweet Music for his last name","Had won the World Series MVP the previous year"] },
  { player:"Bob Welch", sport:"⚾ MLB", answer:"BOB WELCH", era:"classic", stats:{W:"27",ERA:"2.95",SO:"127",WHIP:"1.157"}, ctx:"1990 MLB Season — Oakland Athletics Cy Young", clues:["Won 27 games — the most in the majors since 1974","Won the AL Cy Young with the Oakland Athletics","Was open about his recovery from alcoholism","Won 3 World Series rings with the Dodgers and Athletics"] },
  { player:"Dwight Gooden", sport:"⚾ MLB", answer:"DOC GOODEN", era:"classic", stats:{W:"24",ERA:"1.53",SO:"268",WHIP:"0.965"}, ctx:"1985 MLB Season — New York Mets dominant year", clues:["Had one of the greatest pitching seasons ever at age 20","Won the NL Cy Young with the New York Mets","Nicknamed Doc","Had his career devastated by substance abuse despite enormous talent"] },
  { player:"Orel Hershiser", sport:"⚾ MLB", answer:"BULLDOG", era:"classic", stats:{W:"23",ERA:"2.26",SO:"178",STREAK:"59"}, ctx:"1988 MLB Season — Los Angeles Dodgers Cy Young", clues:["Set the all-time record for consecutive scoreless innings (59)","Won the NL Cy Young and World Series MVP","The Dodgers moved from Brooklyn to Los Angeles in 1958 breaking New York hearts","Nicknamed Bulldog by manager Tommy Lasorda"] },
  { player:"John Smoltz", sport:"⚾ MLB", answer:"JOHN SMOLTZ", era:"classic", stats:{W:"24",ERA:"2.94",SO:"276",WHIP:"1.096"}, ctx:"1996 MLB Season — Atlanta Braves Cy Young", clues:["Won the NL Cy Young with the Atlanta Braves","Was part of the legendary Maddux-Glavine-Smoltz rotation","Had arm problems and converted to closer then back to starter","Won the World Series with Atlanta in 1995"] },
  { player:"Kevin Brown", sport:"⚾ MLB", answer:"KEVIN BROWN", era:"classic", stats:{W:"18",ERA:"2.28",SO:"205",WHIP:"1.036"}, ctx:"1996 MLB Season — Florida Marlins All-Star", clues:["Was one of the most unhittable pitchers of the 1990s","The Marlins won two World Series titles in just 11 seasons as a franchise","Was known for his heavy sinking fastball","Later signed the first $100M contract for a pitcher"] },
  { player:"David Cone", sport:"⚾ MLB", answer:"DAVID CONE", era:"classic", stats:{W:"20",ERA:"2.94",SO:"222",WHIP:"1.116"}, ctx:"1994 MLB Season — Kansas City Royals All-Star", clues:["Won 20 games with the Kansas City Royals before the players strike","Later threw a perfect game with the Yankees in 1999","Posted an ERA of 2.94 — among the best of the season","Was a 5x All-Star"] },
  { player:"Jim Abbott", sport:"⚾ MLB", answer:"JIM ABBOTT", era:"classic", stats:{W:"18",ERA:"2.77",SO:"95",WHIP:"1.162"}, ctx:"1991 MLB Season — California Angels All-Star", clues:["Won 18 games with the California Angels","Was born with one hand — a true inspiration story","Later threw a no-hitter with the New York Yankees in 1993","Won a gold medal at the 1988 Olympics as an amateur"] },
  { player:"Jim Lonborg", sport:"⚾ MLB", answer:"JIM LONBORG", era:"legends", stats:{W:"22",ERA:"3.16",SO:"246",WHIP:"1.189"}, ctx:"1967 MLB Season — Boston Red Sox Cy Young", clues:["Won the AL Cy Young in the Impossible Dream season","Led the Red Sox to the World Series","Was injured in a skiing accident and was never the same pitcher again","Was known as Gentleman Jim"] },
  { player:"Denny McLain", sport:"⚾ MLB", answer:"DENNY MCLAIN", era:"legends", stats:{W:"31",ERA:"1.96",SO:"280",CG:"28"}, ctx:"1968 MLB Season — Detroit Tigers MVP and Cy Young", clues:["Was the last pitcher to win 30 games in a season","Won both the MVP and Cy Young in the same year","The Tigers have one of baseball's most storied franchises featuring Ty Cobb Hank Greenberg and Al Kaline","Later had multiple legal problems after his playing career"] },
  { player:"Vida Blue", sport:"⚾ MLB", answer:"VIDA BLUE", era:"classic", stats:{W:"24",ERA:"1.82",SO:"301",WHIP:"0.954"}, ctx:"1971 MLB Season — Oakland Athletics MVP and Cy Young", clues:["Won both the MVP and Cy Young in the same year","The Moneyball A's used statistical analysis to compete with teams that outspent them massively","Was only 21 years old when he won both awards","Had his salary dispute with Charlie Finley become national news"] },
  { player:"Mike Flanagan", sport:"⚾ MLB", answer:"MIKE FLANAGAN", era:"classic", stats:{W:"23",ERA:"3.08",SO:"190",WHIP:"1.223"}, ctx:"1979 MLB Season — Baltimore Orioles Cy Young", clues:["Won the AL Cy Young with the Baltimore Orioles","Won 23 games this season","Was a key part of the great Orioles rotations of the late 1970s","Later became the team's general manager"] },
  { player:"Ron Guidry", sport:"⚾ MLB", answer:"LOUISIANA LIGHTNING", era:"classic", stats:{W:"25",ERA:"1.74",SO:"248",WHIP:"0.946"}, ctx:"1978 MLB Season — New York Yankees dominant year", clues:["Had one of the greatest pitching seasons in Yankees history","Won the AL Cy Young with 25 wins and a 1.74 ERA","The Yankees have won 27 World Series championships — by far the most of any team","Nicknamed Louisiana Lightning"] },
  { player:"Danny Darwin", sport:"⚾ MLB", answer:"DANNY DARWIN", era:"classic", stats:{ERA:"2.21",W:"12",SO:"130",YEAR:"1990"}, ctx:"1990 MLB Season — Houston Astros ERA leader", clues:["Led the NL in ERA with 2.21","The Astros rebuilt from one of the worst teams in history to become a dynasty","Won the ERA title despite only winning 12 games","Had a long career spanning multiple teams and decades"] },
  { player:"Hal Newhouser", sport:"⚾ MLB", answer:"PRINCE HAL", era:"legends", stats:{W:"29",ERA:"1.81",SO:"212",WHIP:"0.990"}, ctx:"1944 MLB Season — Detroit Tigers wartime MVP", clues:["Won 2 consecutive MVP awards during World War II","Won 29 games with a 1.81 ERA","The Tigers have one of baseball's most storied franchises featuring Ty Cobb Hank Greenberg and Al Kaline","Nicknamed Prince Hal — his reputation was later questioned because of war-depleted competition"] },
  { player:"Bob Lemon", sport:"⚾ MLB", answer:"BOB LEMON", era:"legends", stats:{W:"23",ERA:"2.82",CG:"20",WHIP:"1.190"}, ctx:"1952 MLB Season — Cleveland Indians All-Star", clues:["Won 23 games for the Cleveland Indians","Was converted from a position player to a pitcher","Was a key part of the great Cleveland Indians teams of the 1950s","Later managed the New York Yankees to a World Series title"] },
  { player:"Early Wynn", sport:"⚾ MLB", answer:"EARLY WYNN", era:"legends", stats:{W:"22",ERA:"2.72",SO:"179",WHIP:"1.159"}, ctx:"1959 MLB Season — Chicago White Sox Cy Young", clues:["Won the AL Cy Young with the Chicago White Sox","Was 39 years old when he won the award","Was known as the meanest pitcher in baseball","Won 300 games in his career after a very slow start"] },
  { player:"Lew Burdette", sport:"⚾ MLB", answer:"LEW BURDETTE", era:"legends", stats:{W:"17",ERA:"2.70",SO:"113",WHIP:"1.078"}, ctx:"1957 World Series MVP — Milwaukee Braves", clues:["Won 3 games in the 1957 World Series including 2 shutouts","Was suspected of throwing a spitball his entire career","Posted an ERA of 2.70 — among the best of the season","Was involved in a trade that brought him to Milwaukee from the Yankees"] },
  { player:"Harvey Haddix", sport:"⚾ MLB", answer:"HARVEY HADDIX", era:"legends", stats:{IP:"12",H:"0",BB:"1",YEAR:"1959"}, ctx:"May 26 1959 — Perfect game for 12 innings then lost", clues:["Threw 12 perfect innings — then lost in the 13th","His perfect game through 12 was undone by an error and a hit","Played during the Pirates dynasty years alongside Roberto Clemente and Willie Stargell","His game is considered the greatest pitching performance that ended in a loss"] },
  { player:"Bobo Holloman", sport:"⚾ MLB", answer:"BOBO HOLLOMAN", era:"legends", stats:{NH:"1",W:"3",ERA:"5.23",YEAR:"1953"}, ctx:"May 6 1953 — Only pitcher to throw no-hitter in first career start", clues:["Threw a no-hitter in his very first career start","Was the only pitcher ever to accomplish this feat","Posted an ERA of 5.23 — among the best of the season","Was out of the major leagues within 3 months after the no-hitter"] },
  { player:"Virgil Trucks", sport:"⚾ MLB", answer:"VIRGIL TRUCKS", era:"legends", stats:{W:"5",NH:"2",ERA:"3.97",YEAR:"1952"}, ctx:"1952 MLB Season — Detroit Tigers two no-hitters", clues:["Threw 2 no-hitters in the same season despite only winning 5 games","The Tigers have one of baseball's most storied franchises featuring Ty Cobb Hank Greenberg and Al Kaline","His 2 no-hitters in a losing season is one of baseballs strangest records","Also struck out Babe Ruth in an exhibition game"] },
  { player:"Rube Waddell", sport:"⚾ MLB", answer:"RUBE WADDELL", era:"legends", stats:{W:"27",ERA:"1.62",SO:"349",WHIP:"0.978"}, ctx:"1904 MLB Season — Philadelphia Athletics strikeout king", clues:["Led the major leagues in strikeouts for 6 consecutive seasons","Was one of the most eccentric players in baseball history","Posted an ERA of 1.62 — among the best of the season","Would leave games to chase fire trucks and would be distracted by shiny objects"] },
  { player:"Ed Walsh", sport:"⚾ MLB", answer:"ED WALSH", era:"legends", stats:{W:"40",ERA:"1.27",IP:"464",CG:"42"}, ctx:"1908 MLB Season — Chicago White Sox — most innings ever", clues:["Won 40 games and threw 464 innings — still the most ever","The White Sox were at the center of the 1919 Black Sox scandal — the greatest fix in baseball history","His career ERA of 1.82 is the lowest in baseball history","Threw a spitball that was devastating in the dead ball era"] },
  { player:"Mordecai Brown", sport:"⚾ MLB", answer:"THREE FINGER BROWN", era:"legends", stats:{W:"29",ERA:"1.04",CG:"27",WHIP:"0.861"}, ctx:"1906 MLB Season — Chicago Cubs dominant year", clues:["Had a 1.04 ERA — one of the lowest single-season totals ever","The Cubs ended a 108-year World Series drought in 2016 in one of sports greatest moments","Lost part of two fingers in a farm accident as a child","Nicknamed Three Finger Brown — the injury made his curve nastier"] },
  { player:"Pete Alexander", sport:"⚾ MLB", answer:"GROVER ALEXANDER", era:"legends", stats:{W:"33",ERA:"1.55",SO:"241",SHO:"16"}, ctx:"1916 MLB Season — Philadelphia Phillies dominant year", clues:["Won 33 games and threw 16 shutouts — both still records","The Phillies won the World Series in 2008 ending a 28-year championship drought","Suffered from epilepsy and alcoholism throughout his career","Was a hero of the 1926 World Series at age 39"] },
  { player:"Addie Joss", sport:"⚾ MLB", answer:"ADDIE JOSS", era:"legends", stats:{ERA:"1.16",W:"27",SHO:"9",WHIP:"0.867"}, ctx:"1908 MLB Season — Cleveland Naps — career best year", clues:["Has the second-lowest career ERA in baseball history","Posted an ERA of 1.16 — among the best of the season","Died of tubercular meningitis at age 31 at the peak of his career","Was inducted into the Hall of Fame despite falling short of the games requirement"] },
  { player:"Smoky Joe Wood", sport:"⚾ MLB", answer:"SMOKY JOE WOOD", era:"legends", stats:{W:"34",ERA:"1.91",SO:"258",WHIP:"1.036"}, ctx:"1912 MLB Season — Boston Red Sox dominant season", clues:["Won 34 games with the Boston Red Sox","Had one of the greatest single seasons in baseball history","Injured his arm and later converted to an outfielder","Was considered as fast as Walter Johnson in his prime"] },
  { player:"Eppa Rixey", sport:"⚾ MLB", answer:"EPPA RIXEY", era:"legends", stats:{W:"25",ERA:"2.78",SO:"134",WHIP:"1.168"}, ctx:"1922 MLB Season — Cincinnati Reds All-Star", clues:["Won 25 games for the Cincinnati Reds","Was the all-time leader in victories for a left-hander when he retired","Posted an ERA of 2.78 — among the best of the season","Was 6ft 5in — a giant for his era"] },
  { player:"Wes Ferrell", sport:"⚾ MLB", answer:"WES FERRELL", era:"legends", stats:{W:"25",ERA:"3.52",HR:"7",YEAR:"1935"}, ctx:"1935 MLB Season — Boston Red Sox pitcher and hitter", clues:["Won 25 games AND hit 7 home runs — the most ever for a pitcher in a season","Was one of the best hitting pitchers in baseball history","The Red Sox ended an 86-year championship drought known as the Curse of the Bambino","His brother Rick was also a major league catcher in the same era"] },
  { player:"Burleigh Grimes", sport:"⚾ MLB", answer:"BURLEIGH GRIMES", era:"legends", stats:{W:"25",ERA:"2.99",SO:"136",YEAR:"1921"}, ctx:"1921 MLB Season — Pittsburgh Pirates All-Star", clues:["Was the last legal spitball pitcher in MLB history","Won 25 games for the Pittsburgh Pirates","Had a long career spanning from 1916 to 1934","Was known as Old Stubblebeard for his unshaven face when pitching"] },
  { player:"Jack Chesbro", sport:"⚾ MLB", answer:"HAPPY JACK", era:"legends", stats:{W:"41",ERA:"1.82",CG:"48",IP:"454"}, ctx:"1904 MLB Season — New York Highlanders most wins ever", clues:["Won 41 games — the most in the modern era","Posted an ERA of 1.82 — among the best of the season","Nicknamed Happy Jack for his cheerful disposition","Lost the pennant on a wild pitch on the final day of the season"] },
  { player:"Clark Griffith", sport:"⚾ MLB", answer:"THE OLD FOX", era:"legends", stats:{W:"24",ERA:"2.79",SO:"93",YEAR:"1898"}, ctx:"1898 MLB Season — Chicago Colts pitcher and manager", clues:["Won 24 games as a pitcher and was also the team manager","Nicknamed The Old Fox for his crafty pitching","Became one of the most powerful owners in baseball history","Owned the Washington Senators for decades"] },
  { player:"Jesse Haines", sport:"⚾ MLB", answer:"JESSE HAINES", era:"legends", stats:{W:"24",ERA:"3.25",SO:"101",YEAR:"1927"}, ctx:"1927 MLB Season — St. Louis Cardinals All-Star", clues:["Won 24 games for the St. Louis Cardinals","Was one of the few players elected by the Veterans Committee to the Hall of Fame","Posted an ERA of 3.25 — among the best of the season","Had a blister on his finger end a World Series game in 1926 — bringing in Alexander"] },
  { player:"Preben Elkjaer", sport:"⚽ Soccer", answer:"PREBEN ELKJAER", era:"modern", stats:{G:"38",APP:"69",YEAR:"1986",COUNTRY:"Denmark"}, ctx:"Career — Denmark and Verona striker legend", clues:["Led Denmark to their first major tournament in 1984","Won the Serie A title with Hellas Verona in 1985 — one of the biggest shocks ever","Was the most famous Danish player before Peter Schmeichel","Nicknamed Crazy Horse for his energetic style"] },
  { player:"Dragan Stojkovic", sport:"⚽ Soccer", answer:"PIKSI", era:"modern", stats:{G:"29",APP:"84",YEAR:"1990",COUNTRY:"Yugoslavia"}, ctx:"Career — Yugoslavia and Red Star Belgrade legend", clues:["Won the European Cup with Red Star Belgrade in 1991","Scored 29 goals during this tournament or season","Nicknamed Piksi","Was considered the best Yugoslav player since the late 1980s"] },
  { player:"Davor Suker", sport:"⚽ Soccer", answer:"DAVOR SUKER_2", era:"classic", stats:{G:"6",APP:"7",MIN:"558",YEAR:"1998"}, ctx:"1998 FIFA World Cup — Croatia third place", clues:["Won the Golden Boot at the 1998 World Cup with 6 goals","Led Croatia to their best ever finish of third place","Real Madrid have won the most UEFA Champions League titles of any club in history","Croatian striker from Osijek"] },
  { player:"Hristo Stoichkov", sport:"⚽ Soccer", answer:"STOICHKOV_2", era:"classic", stats:{G:"6",APP:"7",MIN:"630",YEAR:"1994"}, ctx:"1994 FIFA World Cup — Bulgaria semifinal run", clues:["Won the Golden Boot at the 1994 World Cup","Led Bulgaria to a shocking semifinal appearance","Won the Ballon d'Or in 1994","Scored 6 goals during this tournament or season"] },
  { player:"Tomas Skuhravy", sport:"⚽ Soccer", answer:"SKUHRAVY", era:"classic", stats:{G:"5",APP:"5",MIN:"450",YEAR:"1990"}, ctx:"1990 FIFA World Cup — Czechoslovakia", clues:["Scored 5 goals to finish as joint top scorer at the 1990 World Cup","Scored 5 goals during this tournament or season","Later played for Genoa in Serie A","Was a powerful aerial striker"] },
  { player:"Bebeto", sport:"⚽ Soccer", answer:"BEBETO 2", era:"classic", stats:{G:"3",APP:"7",MIN:"630",YEAR:"1994"}, ctx:"1994 FIFA World Cup — Brazil champion", clues:["Scored 3 goals in the 1994 World Cup winning team","Was the perfect foil for Romario's creativity","Scored 3 goals during this tournament or season","Famous for his baby-rocking goal celebration after his son was born during the tournament"] },
  { player:"Zvonimir Boban", sport:"⚽ Soccer", answer:"ZVONIMIR BOBAN", era:"modern", stats:{G:"12",APP:"51",YEAR:"1998",COUNTRY:"Croatia"}, ctx:"Career — Croatia and AC Milan midfield general", clues:["Was the captain of Croatia at the 1998 World Cup","AC Milan have won the European Cup 7 times — second only to Real Madrid all-time","Was suspended for kicking a policeman at a Zagreb derby in 1990","Croatian midfielder considered a legend by his country"] },
  { player:"Predrag Mijatovic", sport:"⚽ Soccer", answer:"MIJATOVIC", era:"classic", stats:{G:"1",APP:"1",YEAR:"1998",MATCH:"UCL Final"}, ctx:"1998 UEFA Champions League Final — Real Madrid vs Juventus", clues:["Scored the winning goal in the Champions League Final","Real Madrid have won the most UEFA Champions League titles of any club in history","Montenegrin striker who was a key player at Real Madrid","His goal broke the deadlock and gave Real Madrid the trophy"] },
  { player:"Mario Kempes", sport:"⚽ Soccer", answer:"MARIO KEMPES", era:"classic", stats:{G:"6",APP:"7",MIN:"630",YEAR:"1978"}, ctx:"1978 FIFA World Cup Final — Argentina hosts", clues:["Scored 6 goals to win the Golden Boot at the 1978 World Cup","Scored twice in the World Cup Final","Scored 6 goals during this tournament or season","Played his club football in Spain for Valencia"] },
  { player:"Teofilo Cubillas", sport:"⚽ Soccer", answer:"CUBILLAS", era:"classic", stats:{G:"10",APP:"13",YEAR:"1978",COUNTRY:"Peru"}, ctx:"Career — Peru and Alianza Lima legend", clues:["Scored 10 World Cup goals — still a record for a South American player","Was voted the best South American player of the 1970s","Scored 10 goals during this tournament or season","Was known for his curling free kicks and clever play"] },
  { player:"Antonin Panenka", sport:"⚽ Soccer", answer:"PANENKA", era:"classic", stats:{G:"1",PEN:"1",YEAR:"1976",MATCH:"Euro Final"}, ctx:"1976 European Championship Final — Czechoslovakia vs West Germany", clues:["Scored the most famous penalty in football history in the final","Chipped the ball down the middle while the goalkeeper dived","Czechoslovakia won the European Championship","His penalty style is now called a Panenka in his honor"] },
  { player:"Zbigniew Boniek", sport:"⚽ Soccer", answer:"ZIBI BONIEK", era:"classic", stats:{G:"4",APP:"7",MIN:"630",YEAR:"1982"}, ctx:"1982 FIFA World Cup — Poland third place", clues:["Scored a hat trick against Belgium in the 1982 World Cup","Juventus won 9 consecutive Serie A titles from 2012 to 2020 in one of Europe's greatest runs","Nicknamed Beautiful Zbig","Juventus won 9 consecutive Serie A titles from 2012 to 2020 in one of Europe's greatest runs"] },
  { player:"Karl-Heinz Rummenigge", sport:"⚽ Soccer", answer:"RUMMENIGGE CLASSIC", era:"classic", stats:{G:"5",APP:"7",MIN:"614",YEAR:"1982"}, ctx:"1982 FIFA World Cup — West Germany finalist", clues:["Led West Germany to the World Cup Final","Won 2 consecutive Ballon d'Or awards (1980 and 1981)","Bayern Munich have won the Bundesliga more times than any other German club","West Germany lost the 1982 Final to Italy in extra time"] },
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
  { player:"Marat Safin", sport:"🎾 ATP", answer:"MARAT SAFIN_2", era:"modern", stats:{W:"85",L:"11",GRAND_SLAMS:"2",WORLD_NO1:"Yes"}, ctx:"2000 US Open — Demolished Sampras to win first Slam", clues:["Destroyed Pete Sampras 6-4 6-3 6-3 in the US Open Final","Won 2 Grand Slams in his career","From Moscow Russia","Was known for his explosive talent and racket-smashing antics"] },
  { player:"Thomas Muster", sport:"🎾 ATP", answer:"THOMAS MUSTER 2", era:"classic", stats:{W:"88",L:"12",GRAND_SLAMS:"1",TITLES:"12"}, ctx:"1995 ATP Season — French Open and World No. 1", clues:["Won the French Open and 12 titles this year","Won 45 clay court titles in his career","Austrian player nicknamed The Man of Clay","Came back from a shattered knee to win a Grand Slam"] },
  { player:"Michael Chang", sport:"🎾 ATP", answer:"MICHAEL CHANG_2", era:"classic", stats:{W:"1",GRAND_SLAMS:"1",YEAR:"1989",AGE:"17"}, ctx:"1989 French Open — Youngest Grand Slam men's winner", clues:["Famously served underhand during the match against Lendl to conserve energy with cramps","Won by defeating Lendl in a famous match where he cramped badly","American player of Chinese descent","Was the youngest player to win the French Open"] },
  { player:"Carlos Moya", sport:"🎾 ATP", answer:"CARLOS MOYA_2", era:"classic", stats:{W:"1",GRAND_SLAMS:"1",WORLD_NO1:"Yes",YEAR:"1998"}, ctx:"1998 French Open — Spanish champion reaches World No. 1", clues:["Was nicknamed The Mosquito for his relentless defensive clay court style","Spanish clay court player","Was a huge star in Spain and helped inspire a generation of Spanish players","Later coached Rafael Nadal"] },
  { player:"Lleyton Hewitt", sport:"🎾 ATP", answer:"LLEYTON HEWITT 2", era:"modern", stats:{W:"80",L:"14",GRAND_SLAMS:"2",WORLD_NO1:"Yes"}, ctx:"2001 ATP Season — Youngest World No. 1 at the time", clues:["Became the youngest World No. 1 at the time at age 20","Won the US Open this year","From Adelaide South Australia","Known for his fighting spirit and Come On celebration"] },
  { player:"Juan Carlos Ferrero", sport:"🎾 ATP", answer:"MOSQUITO", era:"modern", stats:{W:"3",GRAND_SLAMS:"1",WORLD_NO1:"Yes",YEAR:"2003"}, ctx:"2003 French Open — Reached World No. 1", clues:["Won the French Open and reached World No. 1","Nicknamed Mosquito for his darting movement on court","Spanish clay court player","Later coached Carlos Alcaraz to multiple Grand Slam titles"] },
  { player:"Gustavo Kuerten", sport:"🎾 ATP", answer:"GUGA_2", era:"modern", stats:{W:"3",GRAND_SLAMS:"3",YEAR:"2000",WORLD_NO1:"Yes"}, ctx:"2000 ATP Season — World No. 1 and Roland Garros triple", clues:["Won Roland Garros for the 3rd time and reached World No. 1","Brazilian player nicknamed Guga","Won all 3 of his Grand Slams at Roland Garros","Was known for his warm personality and fan following in France"] },
  { player:"Nikolay Davydenko", sport:"🎾 ATP", answer:"NIKOLAY DAVYDENKO", era:"modern", stats:{W:"5",TITLES:"21",BEST_RANK:"3",YEAR:"2006"}, ctx:"2006 ATP Season — World No. 3 dominant year", clues:["Won 5 titles and reached World No. 3 this season","Was one of the best players never to win a Grand Slam","From Severodonetsk Ukraine","Won the ATP World Tour Finals in 2009"] },
  { player:"Harold Solomon", sport:"🎾 ATP", answer:"HAROLD SOLOMON", era:"classic", stats:{W:"22",RANK:"5",TITLES:"22",YEAR:"1980"}, ctx:"1980 ATP Season — Top 5 clay court specialist", clues:["Reached World No. 5 and was one of the best clay court players","Was one of the best American players of the late 1970s","Known for his heavy topspin and defensive clay court game","Never won a Grand Slam despite his consistency"] },
  { player:"Jose-Luis Clerc", sport:"🎾 ATP", answer:"JOSE LUIS CLERC", era:"classic", stats:{W:"4",BEST_RANK:"4",TITLES:"25",YEAR:"1981"}, ctx:"1981 ATP Season — World No. 4 Argentine clay king", clues:["Reached World No. 4 and was one of the best clay court players","Argentine player who was a great rival of Guillermo Vilas","Won 25 career singles titles","Never won a Grand Slam despite being a world-class player"] },
  { player:"Hana Mandlikova", sport:"🎾 WTA", answer:"HANA MANDLIKOVA", era:"classic", stats:{GRAND_SLAMS:"4",WIMBLEDON:"1x winner",YEAR:"1985",COUNTRY:"Czech/Slovak"}, ctx:"1985 US Open — Czech champion wins in New York", clues:["Won the US Open this year for her 4th Grand Slam title","Won 4 Grand Slam singles titles in her career","From Czechoslovakia","Was known for her flamboyant style and all-court game"] },
  { player:"Pam Shriver", sport:"🎾 WTA", answer:"PAM SHRIVER", era:"classic", stats:{SINGLES_GS:"0 (doubles only)",DOUBLES_GS:"21",DOUBLES_WITH:"Navratilova",BEST_RANK:"3"}, ctx:"Career — Greatest doubles player without a singles major", clues:["Won 21 Grand Slam doubles titles alongside Martina Navratilova","Never won a singles Grand Slam despite being a top-5 player","American player who reached the US Open final at age 16","Was one of the most successful doubles players ever"] },
  { player:"John Newcombe", sport:"🎾 ATP", answer:"JOHN NEWCOMBE_2", era:"classic", stats:{GRAND_SLAMS:"7",WIMBLEDON:"3x winner",YEAR:"1971",COUNTRY:"Australia"}, ctx:"1971 Wimbledon — Three-time champion", clues:["Won Wimbledon 3 times including this year","Won 7 Grand Slam singles titles total","Australian player with a famous handlebar mustache","Won the US Open twice and Australian Open twice"] },
  { player:"Vitas Gerulaitis", sport:"🎾 ATP", answer:"VITAS GERULAITIS", era:"classic", stats:{GRAND_SLAMS:"1",TITLES:"27",BEST_RANK:"3",YEAR:"1977"}, ctx:"1977 Australian Open — Reached World No. 3", clues:["Won his only Grand Slam at the 1977 Australian Open","Reached World No. 3 at his peak","Was famous for his flamboyant lifestyle and the quote about nobody beating him twice","Died tragically from carbon monoxide poisoning in 1994"] },
  { player:"Kathy Jordan", sport:"🎾 WTA", answer:"KATHY JORDAN", era:"classic", stats:{RANK:"6",WIMB:"QF",YEAR:"1983",STYLE:"S&V"}, ctx:"Career — American serve and volley specialist", clues:["Was one of the best serve and volley players in women's tennis","Reached World No. 6 in singles despite her attacking style","Was much more famous as a doubles player","From Bryn Mawr Pennsylvania"] },
  { player:"Ivan Lendl Draft", sport:"🎾 ATP", answer:"IVAN LENDL_2", era:"classic", stats:{W:"106",L:"9",GRAND_SLAMS:"3",TITLES:"11"}, ctx:"1986 ATP Season — Czech-American domination", clues:["Won 3 Grand Slams this year","Czech-American player who dominated the 1980s","Won 8 Grand Slams total in his career","Was famous for his intense training regime and fitness focus"] },
  { player:"Pancho Segura", sport:"🎾 ATP", answer:"PANCHO SEGURA", era:"classic", stats:{TITLES:"Pro",BEST_RANK:"2",YEAR:"1952",NATION:"Ecuador"}, ctx:"Career — Professional tennis legend from Ecuador", clues:["Was considered the second-best player in the world behind Gonzales for years","Was from Ecuador — one of the first Latin American tennis stars","Used an unusual two-handed forehand that was highly effective","Later coached Jimmy Connors to great success"] },
  { player:"Frank Sedgman", sport:"🎾 ATP", answer:"FRANK SEDGMAN_2", era:"legends", stats:{GRAND_SLAMS:"5",YEAR:"1952",COUNTRY:"Australia",DAVIS:"3"}, ctx:"1952 Season — Australian amateur champion", clues:["Won the Grand Slam in doubles (all 4 in one year) in 1951","Won 5 Grand Slam singles titles","Was the first Australian to dominate world tennis","Won 3 Davis Cup titles with Australia"] },
  { player:"Jack Kramer", sport:"🎾 ATP", answer:"JACK KRAMER 2", era:"legends", stats:{GRAND_SLAMS:"3",WIMBLEDON:"1x winner",YEAR:"1947",COUNTRY:"USA"}, ctx:"1947 Wimbledon — Post-war American champion", clues:["Won Wimbledon and US Championships in 1947","Dominated professional tennis after turning pro","Later became a powerful force in organizing professional tennis","From Las Vegas Nevada"] },
  { player:"Tony Trabert", sport:"🎾 ATP", answer:"TONY TRABERT 2", era:"legends", stats:{GRAND_SLAMS:"5",YEAR:"1955",COUNTRY:"USA",SLAM:"1"}, ctx:"1955 ATP Season — Three Grand Slams in one year", clues:["Won 3 Grand Slams in one year (1955)","Won 5 Grand Slam singles titles total","American player from Cincinnati","Was considered the best American player of the mid-1950s"] },
  { player:"Lew Hoad", sport:"🎾 ATP", answer:"LEW HOAD 2", era:"legends", stats:{GRAND_SLAMS:"4",WIMBLEDON:"2x winner",YEAR:"1956",COUNTRY:"Australia"}, ctx:"1956 ATP Season — Two Grand Slams at age 21", clues:["Won Wimbledon and Australian Open at just 21","Had a career hampered by back injuries","Australian player who was Rod Laver's idol","Won 4 Grand Slams in his short but brilliant career"] },
  { player:"Mervyn Rose", sport:"🎾 ATP", answer:"MERVYN ROSE", era:"legends", stats:{GRAND_SLAMS:"1",YEAR:"1954",COUNTRY:"Australia",AUS_OPEN:"1x winner"}, ctx:"1954 Australian Championships — Davis Cup stalwart", clues:["Won the Australian Championships in 1954","Was a key member of the dominant Australian Davis Cup teams","Was much better known as a doubles player","Later became a successful tennis coach"] },
  { player:"Ashley Cooper", sport:"🎾 ATP", answer:"ASHLEY COOPER_2", era:"legends", stats:{GRAND_SLAMS:"4",YEAR:"1958",COUNTRY:"Australia",WORLD_NO1:"Yes"}, ctx:"1958 ATP Season — Australian dominant year", clues:["Won the US Open and Wimbledon in the same year","Won 4 Grand Slam singles titles","Was the World No. 1 player for two years","Australian player who dominated amateur tennis in the late 1950s"] },
  { player:"Neale Fraser", sport:"🎾 ATP", answer:"NEALE FRASER_2", era:"legends", stats:{GRAND_SLAMS:"3",WIMBLEDON:"1x winner",YEAR:"1960",COUNTRY:"Australia"}, ctx:"1960 ATP Season — World No. 1 Australian", clues:["Won Wimbledon and US Championships back to back (1959-60)","Won 3 Grand Slam singles titles","Australian player who was World No. 1","Was much more celebrated as a doubles player with many Grand Slam titles"] },
  { player:"Malcolm Anderson", sport:"🎾 ATP", answer:"MALCOLM ANDERSON", era:"legends", stats:{GRAND_SLAMS:"1",YEAR:"1957",COUNTRY:"Australia",OPEN:"US"}, ctx:"1957 US Championships — Surprise American champion", clues:["Won the US Championships as a qualifier in 1957","Beat Ashley Cooper in the final in a major upset","Australian player who was unseeded","His victory remains one of the biggest upsets in major tennis history"] },
  { player:"Paul Azinger", sport:"⛳ Golf", answer:"PAUL AZINGER", era:"classic", stats:{WINS:"1",MAJORS:"1",AVG:"70.51",YEAR:"1993"}, ctx:"1993 PGA Championship — Inverness Club win", clues:["Won the PGA Championship in a playoff over Greg Norman","Was later diagnosed with lymphoma but came back to compete","From Holyoke Massachusetts","Later became a successful US Ryder Cup captain in 2008"] },
  { player:"Bob Tway", sport:"⛳ Golf", answer:"BOB TWAY 2", era:"classic", stats:{SCORE:"-12",BUNKER:"1",HOLE:"18",OPP:"Norman"}, ctx:"1986 PGA Championship — Bunker holed to beat Norman", clues:["Holed out from a bunker on the 72nd hole to win the PGA Championship","Came from behind to beat Greg Norman who was the overwhelming favorite","From Oklahoma City Oklahoma","Was a two-time PGA Tour winner"] },
  { player:"Hal Sutton", sport:"⛳ Golf", answer:"HAL SUTTON", era:"classic", stats:{SCORE:"-10",MARGIN:"1",AGE:"25",FIELD:"Nicklaus"}, ctx:"1983 PGA Championship — Young champion beats Nicklaus", clues:["Won the PGA Championship at age 25 beating Nicklaus","Was named PGA Tour Player of the Year in 1983","From Shreveport Louisiana","His famous Ryder Cup pairing decision as captain in 2004 backfired badly"] },
  { player:"Larry Mize", sport:"⛳ Golf", answer:"LARRY MIZE 2", era:"classic", stats:{CHIP:"45yds",HOLE:"11",PLAYOFF:"W",OPP:"Norman"}, ctx:"1987 Masters playoff — Chip-in for the ages", clues:["Chipped in from 45 yards on the 11th hole to beat Greg Norman","Was from Augusta Georgia — a true hometown hero story","Won in a sudden death playoff","The chip shattered Norman who had another major heartbreak"] },
  { player:"Sandy Lyle", sport:"⛳ Golf", answer:"SANDY LYLE 2", era:"classic", stats:{BUNKER:"1",HOLE:"18",YEAR:"1988",WIN:"Masters"}, ctx:"1988 Masters — The bunker shot on 18 that won it all", clues:["Holed a bunker shot on 18 to win The Masters","Was the first British player to win The Masters","From Shrewsbury England of Scottish descent","Also won The Open Championship in 1985"] },
  { player:"Robert Gamez", sport:"⛳ Golf", answer:"ROBERT GAMEZ", era:"classic", stats:{EID:"1",HOLE:"18",YEAR:"1990",WIN:"Nestle Invitational"}, ctx:"1990 Nestle Invitational — Eagle on 18 to beat Norman", clues:["Holed a 7-iron from 176 yards on the 18th to beat Greg Norman by 1","Was a rookie at the time","From Las Vegas Nevada","Won 2 PGA Tour events in his career"] },
  { player:"Doug Ford", sport:"⛳ Golf", answer:"DOUG FORD_2", era:"legends", stats:{SCORE:"-3",BUNKER:"H18",PLAYOFF:"No",LEAD:"3"}, ctx:"1957 Masters — Bunker shot to win Augusta", clues:["Holed out from the bunker on 18 to win The Masters","Also won the PGA Championship in 1955","From New Haven Connecticut","His hole-out at Augusta remains one of The Masters most dramatic moments"] },
  { player:"Tommy Armour", sport:"⛳ Golf", answer:"TOMMY ARMOUR_2", era:"legends", stats:{MAJORS:"3",WIMB:"0",YEAR:"1927",COUNTRY:"Scotland"}, ctx:"Career — The Silver Scot dominates 1920s-30s", clues:["Won 3 majors (US Open, British Open, PGA Championship)","Was known as The Silver Scot for his white hair","Served in World War I and was wounded losing sight in one eye","Later became one of the most famous golf teachers ever"] },
  { player:"Gene Sarazen", sport:"⛳ Golf", answer:"GENE SARAZEN 2", era:"classic", stats:{MAJORS:"7",SLAM:"1",SHOT:"1",YEAR:"1935"}, ctx:"Career — First Grand Slam champion in golf", clues:["Won all 4 majors in his career — the first to do so","Invented the sand wedge which revolutionized the game","Made the shot heard round the world — a double eagle at the 1935 Masters","Won 7 major championships in his career"] },
  { player:"Henry Picard", sport:"⛳ Golf", answer:"HENRY PICARD_2", era:"legends", stats:{MAJORS:"2",WINS:"26",YEAR:"1939",PGA:"1"}, ctx:"1939 PGA Championship — Charleston's finest", clues:["Won the PGA Championship in 1939","Was the teacher of Sam Snead and Arnold Palmer's father","Won 26 PGA Tour events in his career","Nicknamed The Hershey Hurricane"] },
  { player:"Chick Evans", sport:"⛳ Golf", answer:"CHICK EVANS_2", era:"legends", stats:{AMATEUR:"2",US_OPEN:"1",YEAR:"1916",SWEEP:"1"}, ctx:"1916 Season — Amateur and US Open champion", clues:["Won both the US Amateur and US Open in the same year in 1916","Was an amateur who never turned professional","From Indianapolis Indiana","Set up the Evans Scholars Foundation which has given thousands of scholarships"] },
  { player:"Francis Ouimet", sport:"⛳ Golf", answer:"FRANCIS OUIMET_2", era:"legends", stats:{AMATEUR:"2",US_OPEN:"1",YEAR:"1913",AGE:"20"}, ctx:"1913 US Open — Amateur beats the British pros", clues:["Won the US Open as a 20-year-old amateur against the best British professionals","Is credited with popularizing golf in America","Had grown up across the street from The Country Club where he won","His story was told in the film The Greatest Game Ever Played"] },
  { player:"Lawson Little", sport:"⛳ Golf", answer:"LAWSON LITTLE 2", era:"classic", stats:{AMATEUR:"4",YEAR:"1935",OPEN:"1",COUNTRY:"USA"}, ctx:"Career — Double Amateur Grand Slam winner", clues:["Won both the US Amateur and British Amateur in consecutive years (1934-35)","Won 4 major amateur titles in just 2 years","Later won the US Open as a professional in 1940","From Newport Rhode Island"] },
  { player:"Ralph Guldahl", sport:"⛳ Golf", answer:"RALPH GULDAHL 2", era:"legends", stats:{MAJORS:"3",WINS:"16",YEAR:"1938",STREAK:"2"}, ctx:"1938 Season — Back-to-back US Opens", clues:["Won the US Open in 1937 and 1938 consecutively","Also won The Masters in 1939","Mysteriously lost his game completely after writing a golf instruction book","From Dallas Texas"] },
  { player:"Billy Burke", sport:"⛳ Golf", answer:"BILLY BURKE", era:"legends", stats:{MAJORS:"1",WINS:"7",YEAR:"1931",ROUNDS:"144"}, ctx:"1931 US Open — Longest playoff in major history", clues:["Won the US Open after a 144-hole playoff — the longest ever","The playoff lasted two full days of 36-hole rounds","From Naugatuck Connecticut","Was the first US Open champion born outside the United States"] },
  { player:"Willie Anderson", sport:"⛳ Golf", answer:"WILLIE ANDERSON_2", era:"legends", stats:{MAJORS:"4",US_OPEN:"4",YEAR:"1905",STREAK:"3"}, ctx:"Career — Four US Open champion", clues:["Won 4 US Opens — still tied for the record","Won 3 consecutive US Opens from 1903 to 1905","From North Berwick Scotland","Died at age 31 from arteriosclerosis — his early death cut short a great career"] },
  { player:"Johnny McDermott", sport:"⛳ Golf", answer:"JOHNNY MCDERMOTT", era:"legends", stats:{MAJORS:"2",US_OPEN:"2",YEAR:"1911",FIRST:"1"}, ctx:"1911 US Open — First American-born champion", clues:["Was the first American-born player to win the US Open","Won back-to-back US Opens in 1911 and 1912","Was only 19 when he won his first US Open","Had a mental breakdown and was institutionalized for most of his adult life"] },
  { player:"Walter Travis", sport:"⛳ Golf", answer:"WALTER TRAVIS", era:"legends", stats:{AMATEUR:"4",BRITISH:"1",YEAR:"1904",PUTTER:"Yes"}, ctx:"1904 British Amateur — First overseas winner", clues:["Was the first overseas player to win the British Amateur","Won 4 major amateur titles in his career","Didn't take up golf until age 35 yet became one of the best","His controversial Schenectady putter was banned by the R&A after he won with it"] },
  { player:"Jock Hutchison", sport:"⛳ Golf", answer:"JOCK HUTCHISON_2", era:"legends", stats:{MAJORS:"2",BRIT:"1",PGA:"1",YEAR:"1921"}, ctx:"1921 British Open — First American to win at St Andrews", clues:["Was the first American to win The Open Championship at St Andrews","Won the PGA Championship in 1920","Was born in St Andrews Scotland but competed for America","Was controversially alleged to have used ribbed clubs to create more spin"] },
  { player:"Freddie McLeod", sport:"⛳ Golf", answer:"FREDDIE MCLEOD", era:"legends", stats:{MAJORS:"1",US_OPEN:"1",YEAR:"1908",WEIGHT:"108"}, ctx:"1908 US Open — Lightest champion", clues:["Won the 1908 US Open","Was said to weigh only 108 pounds — the lightest US Open champion ever","Was born in North Berwick Scotland","Later became the club professional at Columbia Country Club for decades"] },
  { player:"Alex Ross", sport:"⛳ Golf", answer:"ALEX ROSS", era:"legends", stats:{MAJORS:"1",US_OPEN:"1",YEAR:"1907",BROTHER:"Donald"}, ctx:"1907 US Open — Champion and designer's brother", clues:["Won the 1907 US Open","Was the brother of famous golf course designer Donald Ross","Was born in Dornoch Scotland","Was a club professional for most of his life after winning the title"] },
  { player:"Fred Herd", sport:"⛳ Golf", answer:"FRED HERD", era:"legends", stats:{MAJORS:"1",US_OPEN:"1",YEAR:"1898",COUNTRY:"Scotland"}, ctx:"1898 US Open — Early American champion", clues:["Won the 1898 US Open","Was born in St Andrews Scotland","Later became a club professional at Washington Park in Chicago","Was part of the Scottish-born wave of professionals who dominated early American golf"] },
  { player:"Roman Hamrlik", sport:"🏒 NHL", answer:"ROMAN HAMRLIK", era:"modern", stats:{G:"16",AST:"49",PTS:"65",YEAR:"2002"}, ctx:"2001-02 NHL Season — New York Islanders", clues:["Was the 1st overall pick in the 1992 NHL Draft","The Islanders won 4 consecutive Stanley Cups from 1980 to 1983 — a dynasty often overlooked","Czech defenseman who had a long productive career","Was the first Czech player selected 1st overall in NHL history"] },
  { player:"Alexandre Daigle", sport:"🏒 NHL", answer:"ALEXANDRE DAIGLE", era:"classic", stats:{G:"12",AST:"24",PTS:"36",YEAR:"1994"}, ctx:"1993-94 NHL Season — Ottawa Senators first overall pick", clues:["Was the 1st overall pick in the 1993 NHL Draft","The current Senators franchise was revived in 1992 — the original Ottawa team folded in 1934","Was one of the biggest busts in NHL draft history given the hype","Famously said he was happy to be drafted 1st overall because no one remembers 2nd"] },
  { player:"Bryan Berard", sport:"🏒 NHL", answer:"BRYAN BERARD", era:"classic", stats:{G:"20",AST:"50",PTS:"70",YEAR:"1997"}, ctx:"1996-97 NHL Season — New York Islanders Calder Trophy", clues:["Won the Calder Trophy as NHL Rookie of the Year","Was the 1st overall pick in the 1995 NHL Draft","Had his career derailed by an eye injury from a stick","Came back to play professionally despite losing most of the vision in one eye"] },
  { player:"Dainius Zubrus", sport:"🏒 NHL", answer:"DAINIUS ZUBRUS", era:"modern", stats:{G:"16",AST:"28",PTS:"44",YEAR:"2004"}, ctx:"2003-04 NHL Season — Washington Capitals", clues:["Was a Lithuanian-born forward who had a long NHL career","This season took place during the 2003 NHL campaign","Was selected 15th overall in the 1996 NHL Draft","Was one of the first Lithuanian players to have a significant NHL career"] },
  { player:"Sergei Gonchar", sport:"🏒 NHL", answer:"SERGEI GONCHAR", era:"modern", stats:{G:"18",AST:"47",PTS:"65",YEAR:"2004"}, ctx:"2003-04 NHL Season — Washington Capitals", clues:["Was one of the most productive offensive defensemen of his era","This season took place during the 2003 NHL campaign","Russian defenseman who later won the Stanley Cup with Pittsburgh","Was the 14th overall pick in the 1992 NHL Draft"] },
  { player:"Pierre Turgeon", sport:"🏒 NHL", answer:"PIERRE TURGEON_2", era:"classic", stats:{G:"58",AST:"74",PTS:"132",PIM:"26"}, ctx:"1992-93 NHL Season — New York Islanders elite season", clues:["Scored 132 points this season","The Islanders won 4 consecutive Stanley Cups from 1980 to 1983 — a dynasty often overlooked","From Rouyn-Noranda Quebec","Was the 1st overall pick in the 1987 NHL Draft"] },
  { player:"Owen Nolan", sport:"🏒 NHL", answer:"OWEN NOLAN", era:"classic", stats:{G:"44",AST:"40",PTS:"84",YEAR:"1999"}, ctx:"1998-99 NHL Season — San Jose Sharks captain", clues:["Was the captain and face of the San Jose Sharks","Was the 1st overall pick in the 1990 NHL Draft by Quebec","From Belfast Northern Ireland — one of the few Irish-born NHLers","Was famous for pointing to where he would shoot in an All-Star Game then doing it"] },
  { player:"Mats Sundin", sport:"🏒 NHL", answer:"MATS SUNDIN_2", era:"modern", stats:{G:"41",AST:"47",PTS:"88",PIM:"68"}, ctx:"2001-02 NHL Season — Toronto Maple Leafs captain", clues:["Was the captain and face of the Toronto Maple Leafs for many years","From Bromma Sweden","Was the first European player selected 1st overall in the NHL Draft (1989)","Won 2 Olympic gold medals with Sweden"] },
  { player:"Reg Noble", sport:"🏒 NHL", answer:"REG NOBLE", era:"legends", stats:{G:"20",AST:"10",PTS:"30",YEAR:"1918"}, ctx:"1917-18 NHL Season — Toronto Arenas first champion", clues:["Won the Stanley Cup with the Toronto Arenas in the very first NHL season","Played in the first NHL game ever","Was part of the original NHL when only 4 teams existed","Was a rough and tumble player known for fighting"] },
  { player:"Cy Denneny", sport:"🏒 NHL", answer:"CY DENNENY 2", era:"classic", stats:{G:"318",YEAR:"1929",TEAM:"Senators",STANLEY_CUPS:"4"}, ctx:"Career — Ottawa Senators early NHL scoring king", clues:["Was the NHL all-time leading scorer when he retired","Won 4 Stanley Cups with the Ottawa Senators","Was one of the top goal scorers of the early NHL era","Played in the NHL first season in 1917-18"] },
  { player:"Howie Morenz", sport:"🏒 NHL", answer:"HOWIE MORENZ_2", era:"legends", stats:{G:"40",AST:"28",PTS:"68",YEAR:"1930"}, ctx:"1929-30 NHL Season — Montreal Canadiens MVP", clues:["Won the Hart Trophy as league MVP","Was considered the greatest hockey player of his era","The Canadiens have won the Stanley Cup 24 times — by far the most of any franchise","Died tragically at age 34 from complications after a leg fracture on the ice"] },
  { player:"Aurele Joliat", sport:"🏒 NHL", answer:"AURELE JOLIAT_2", era:"legends", stats:{G:"29",AST:"11",PTS:"40",YEAR:"1925"}, ctx:"1924-25 NHL Season — Montreal Canadiens champion", clues:["Won the Stanley Cup with the Montreal Canadiens","Was a small but fierce winger who played alongside Howie Morenz","Won 3 Stanley Cups with Montreal","Nicknamed The Mighty Atom for his size but toughness"] },
  { player:"King Clancy", sport:"🏒 NHL", answer:"KING CLANCY", era:"classic", stats:{G:"9",AST:"15",PTS:"24",YEAR:"1927"}, ctx:"Career — Ottawa Senators defenseman traded for a King", clues:["Was traded from Ottawa Senators to Toronto for $35000 and two players — a record at the time","Was one of the most beloved defensemen of his era","Won 3 Stanley Cups","Later became a beloved ambassador for the Toronto Maple Leafs"] },
  { player:"Jack Adams", sport:"🏒 NHL", answer:"JACK ADAMS", era:"classic", stats:{G:"83",AST:"37",PTS:"120",YEAR:"1922"}, ctx:"Career — Player who became hockey's greatest executive", clues:["Was a decent player who became a legendary executive","Built the Detroit Red Wings dynasty as general manager","The Jack Adams Award for best coach is named after him","Was inducted into the Hockey Hall of Fame after their playing career"] },
  { player:"Dit Clapper NHL", sport:"🏒 NHL", answer:"DIT CLAPPER 2", era:"classic", stats:{G:"228",YEAR:"1947",TEAM:"Bruins",STANLEY_CUPS:"3"}, ctx:"Career — Boston Bruins 20-year iron man", clues:["Played 20 seasons for the Boston Bruins — a record at the time","Won 3 Stanley Cups with the Bruins","Was the first player to play 20 NHL seasons with one team","Played both forward and defense during his long career"] },
  { player:"Joe Malone", sport:"🏒 NHL", answer:"JOE MALONE", era:"legends", stats:{G:"44",APP:"20",YEAR:"1918",AVG:"2.2"}, ctx:"1917-18 NHL Season — Quebec Bulldogs goals record", clues:["Scored 44 goals in 20 games — 2.2 per game — a record that still stands","Played in the very first NHL season","His goals-per-game record is considered unbreakable","Was called Phantom Joe for his ability to appear out of nowhere"] },
  { player:"Newsy Lalonde", sport:"🏒 NHL", answer:"NEWSY LALONDE_2", era:"legends", stats:{G:"22",AST:"9",PTS:"31",YEAR:"1920"}, ctx:"1919-20 NHL Season — Montreal Canadiens scoring leader", clues:["Was the NHL scoring leader multiple times","His jersey number 9 was retired by both the Detroit Red Wings and Hartford Whalers","Was also a professional lacrosse player","Was one of the most feared players of the early hockey era"] },
  { player:"George Boucher", sport:"🏒 NHL", answer:"GEORGE BOUCHER", era:"legends", stats:{G:"13",AST:"15",PTS:"28",YEAR:"1923"}, ctx:"Career — Ottawa Senators dynasty defenseman", clues:["Won 4 Stanley Cups with the Ottawa Senators","Was considered one of the best defensemen of the 1920s","Was part of the great Ottawa Senators dynasty","Was one of 4 brothers who all played professional hockey"] },
  { player:"Sprague Cleghorn", sport:"🏒 NHL", answer:"SPRAGUE CLEGHORN", era:"legends", stats:{G:"17",AST:"4",PTS:"21",YEAR:"1922"}, ctx:"Career — Most feared player of the 1920s", clues:["Was considered the dirtiest and most feared player of his era","Won the Stanley Cup with the Montreal Canadiens","Was suspended multiple times for violent play","Was both a gifted scorer and a notorious enforcer"] },
  { player:"Frank Nighbor", sport:"🏒 NHL", answer:"FRANK NIGHBOR", era:"legends", stats:{G:"19",AST:"9",PTS:"28",YEAR:"1924"}, ctx:"Career — Ottawa Senators gentleman champion", clues:["Won the very first Hart Trophy as league MVP in 1924","Also won the first Lady Byng Trophy for sportsmanship","Won 5 Stanley Cups in his career","Nicknamed The Pembroke Peach"] },
  { player:"Roy Worters", sport:"🏒 NHL", answer:"ROY WORTERS", era:"legends", stats:{GAA:"1.61",SO:"13",YEAR:"1929",HT:"5'3\""}, ctx:"1928-29 NHL Season — Pittsburgh Pirates MVP", clues:["Won the Hart Trophy as league MVP as a goaltender","Was only 5ft 3in — one of the smallest players in NHL history","Played during the Pirates dynasty years alongside Roberto Clemente and Willie Stargell","Nicknamed Shrimp for his small stature"] },
  { player:"Kwame Brown", sport:"🏀 NBA", answer:"KWAME BROWN", era:"modern", stats:{PICK:"1",YEAR:"2001",TEAM:"Washington Wizards",SCHOOL:"Glynn Academy HS"}, ctx:"2001 NBA Draft — #1 Overall Pick — biggest bust ever?", clues:["Was the first high school player ever selected 1st overall in the NBA Draft","This performance took place during the 2001 NBA season","Was selected by Michael Jordan who was then team president","Is widely considered the biggest bust at #1 in NBA history"] },
  { player:"Michael Olowokandi", sport:"🏀 NBA", answer:"KANDI MAN", era:"classic", stats:{PICK:"1",YEAR:"1998",TEAM:"Los Angeles Clippers",SCHOOL:"Pacific"}, ctx:"1998 NBA Draft — #1 Overall Pick", clues:["Was selected #1 overall by the Los Angeles Clippers","Played at the University of Pacific — an obscure pick","Was considered a massive bust given his talent level","Was selected over Vince Carter Paul Pierce and Dirk Nowitzki"] },
  { player:"LaRue Martin", sport:"🏀 NBA", answer:"LARUE MARTIN", era:"classic", stats:{PICK:"1",YEAR:"1972",TEAM:"Portland Trail Blazers",SCHOOL:"Loyola"}, ctx:"1972 NBA Draft — #1 Overall Pick over Bob McAdoo", clues:["Was selected #1 overall over Bob McAdoo Julius Erving and Paul Westphal","Is considered the worst #1 pick in NBA Draft history","The Blazers are the only major professional sports team in the state of Oregon","Only played 4 seasons and never averaged more than 5 points per game"] },
  { player:"Joe Barry Carroll", sport:"🏀 NBA", answer:"JOE BARRY CARROLL", era:"classic", stats:{PICK:"1",YEAR:"1980",TEAM:"Golden State Warriors",SCHOOL:"Purdue"}, ctx:"1980 NBA Draft — #1 Overall Pick traded for Robert Parish and McHale", clues:["Was traded on draft night for Robert Parish and Kevin McHale who helped win multiple titles","Was selected #1 overall by Golden State Warriors","Played at Purdue University","The trade is considered the worst in NBA history for Golden State"] },
  { player:"Pervis Ellison", sport:"🏀 NBA", answer:"NEVER NERVOUS PERVIS", era:"classic", stats:{PICK:"1",YEAR:"1989",TEAM:"Sacramento Kings",SCHOOL:"Louisville"}, ctx:"1989 NBA Draft — #1 Overall Pick", clues:["Was selected #1 overall by the Sacramento Kings","Won an NCAA championship at Louisville in 1986","Was nicknamed Never Nervous Pervis but injuries made him nervous","Was traded to Washington where he won the Most Improved Player award in 1992"] },
  { player:"Danny Manning", sport:"🏀 NBA", answer:"DANNY MANNING", era:"classic", stats:{PICK:"1",YEAR:"1988",TEAM:"Los Angeles Clippers",SCHOOL:"Kansas"}, ctx:"1988 NBA Draft — #1 Overall Pick", clues:["Was selected #1 overall by the Los Angeles Clippers","Won the NCAA championship at Kansas this same year — as a senior","Had his career limited by multiple knee injuries","Was a skilled and versatile big man"] },
  { player:"Ki-Jana Carter", sport:"🏈 NFL", answer:"KI JANA CARTER", era:"classic", stats:{PICK:"1",YEAR:"1995",TEAM:"Cincinnati Bengals",SCHOOL:"Penn State"}, ctx:"1995 NFL Draft — #1 Overall Pick career ended by injury", clues:["Was selected #1 overall by the Cincinnati Bengals","Tore his ACL in his first preseason game and was never the same","Played at Penn State where he was one of the best backs ever","Is considered one of the most tragic career trajectories for a top pick"] },
  { player:"David Carr", sport:"🏈 NFL", answer:"DAVID CARR", era:"modern", stats:{PICK:"1",YEAR:"2002",TEAM:"Houston Texans",SCHOOL:"Fresno State"}, ctx:"2002 NFL Draft — #1 Overall Pick first expansion team", clues:["Was the first player ever drafted by the Houston Texans — an expansion team","Was sacked an NFL record 76 times as a rookie","Played at Fresno State","His brother Derek Carr also played quarterback in the NFL"] },
  { player:"Tim Couch", sport:"🏈 NFL", answer:"TIM COUCH", era:"classic", stats:{PICK:"1",YEAR:"1999",TEAM:"Cleveland Browns",SCHOOL:"Kentucky"}, ctx:"1999 NFL Draft — #1 Overall Pick first Cleveland Browns pick", clues:["Was the first player drafted by the new Cleveland Browns expansion team","Played at the University of Kentucky","Was considered a sure-thing prospect who never found consistent success","The Browns went 2-14 in his rookie season"] },
  { player:"Steve Emtman", sport:"🏈 NFL", answer:"STEVE EMTMAN", era:"classic", stats:{PICK:"1",YEAR:"1992",TEAM:"Indianapolis Colts",SCHOOL:"Washington"}, ctx:"1992 NFL Draft — #1 Overall Pick career ended by injuries", clues:["Was selected #1 overall by the Indianapolis Colts","Won the Outland Trophy and Lombardi Award in college at Washington","Had his career essentially ended by knee injuries within 2 seasons","Is considered one of the biggest injury-related busts for a #1 pick"] },
  { player:"Ken Sims", sport:"🏈 NFL", answer:"KEN SIMS", era:"classic", stats:{PICK:"1",YEAR:"1982",TEAM:"New England Patriots",SCHOOL:"Texas"}, ctx:"1982 NFL Draft — #1 Overall Pick bust", clues:["Was selected #1 overall by the New England Patriots","Played defensive tackle at the University of Texas","Was considered a total bust having virtually no impact","The Patriots lost out on other great players with this pick"] },
  { player:"Brian Bosworth", sport:"🏈 NFL", answer:"THE BOZ", era:"classic", stats:{PICK:"1",YEAR:"1987",TEAM:"Seattle Seahawks",SCHOOL:"Oklahoma"}, ctx:"1987 NFL Supplemental Draft — The Boz phenomenon", clues:["Was selected in the supplemental draft by the Seattle Seahawks","Was the most hyped linebacker prospect in college football history","Nicknamed The Boz for his unusual haircut and brash personality","Was destroyed on a famous run by Bo Jackson which defined his NFL career"] },
  { player:"Aundray Bruce", sport:"🏈 NFL", answer:"AUNDRAY BRUCE", era:"classic", stats:{PICK:"1",YEAR:"1988",TEAM:"Atlanta Falcons",SCHOOL:"Auburn"}, ctx:"1988 NFL Draft — #1 Overall Pick linebacker", clues:["Was selected #1 overall by the Atlanta Falcons","Played linebacker at Auburn University","Is considered one of the biggest busts at #1 in NFL history","The Falcons passed over multiple future Hall of Famers with this pick"] },
  { player:"Arnie Herber", sport:"🏈 NFL", answer:"ARNIE HERBER", era:"legends", stats:{YDS:"1239",TD:"14",INT:"8",YEAR:"1936"}, ctx:"1936 NFL Season — Green Bay Packers first great passer", clues:["Was the first great forward passer in NFL history","Won 4 NFL championships with the Green Bay Packers","From Green Bay Wisconsin","Was known for his unusually long fingers that helped him grip the ball"] },
  { player:"Pete Henry", sport:"🏈 NFL", answer:"FATS HENRY", era:"legends", stats:{KICK:"29",RUSH:"54",YEAR:"1923",POS:"OT/K"}, ctx:"Career — Canton Bulldogs dynasty tackle and kicker", clues:["Won 2 NFL championships with the Canton Bulldogs","Was considered the best lineman of his era","Nicknamed Fats Henry","Was also a punter who could kick over 90 yards"] },
  { player:"Cal Hubbard", sport:"🏈 NFL", answer:"CAL HUBBARD", era:"legends", stats:{POS:"OT/LB",YEAR:"1931",TEAMS:"2",BASEBALL:"1"}, ctx:"Career — Only Hall of Famer in both football and baseball", clues:["Is the only person inducted into both the Pro Football and Baseball Hall of Fames","Won 3 NFL championships in his career","Later became a famous and respected baseball umpire","Was 6ft 5in and 250 pounds — massive for his era"] },
  { player:"Mel Hein", sport:"🏈 NFL", answer:"MEL HEIN", era:"legends", stats:{POS:"C/LB",MVP:"1",YEAR:"1938",TEAM:"Giants"}, ctx:"1938 NFL MVP Season — New York Giants center", clues:["Won the NFL MVP award — one of the few linemen ever to do so","Played center and linebacker for the New York Giants","Was named All-Pro 8 consecutive times","Played 15 seasons without missing a single game"] },
  { player:"Tank Younger", sport:"🏈 NFL", answer:"TANK YOUNGER", era:"legends", stats:{RUSH:"696",REC:"45",TD:"7",YEAR:"1954"}, ctx:"Career — First HBCU player in NFL history", clues:["Was the first player from a historically Black college to play in the NFL","Scored 7 touchdowns during this season","Was from Grambling State University","Helped open the door for HBCU players in professional football"] },
  { player:"Bulldog Turner", sport:"🏈 NFL", answer:"BULLDOG TURNER", era:"legends", stats:{POS:"C/LB",INT:"8",YEAR:"1942",TEAM:"Bears"}, ctx:"Career — Chicago Bears two-way center champion", clues:["Was considered the best center of his era","Also played linebacker and led the NFL in interceptions","Won 4 NFL championships with the Chicago Bears","Nicknamed Bulldog for his tenacious style"] },
  { player:"Dan Fortmann", sport:"🏈 NFL", answer:"DAN FORTMANN", era:"legends", stats:{POS:"G",AGE:"19",YEAR:"1936",TITLES:"3"}, ctx:"Career — Youngest starter in NFL history becoming a doctor", clues:["Was one of the youngest starters in NFL history at age 19","Won 3 NFL championships with the Chicago Bears","Was named All-Pro 6 consecutive times","Later became a physician and team doctor"] },
  { player:"Ed Sprinkle", sport:"🏈 NFL", answer:"ED SPRINKLE", era:"legends", stats:{POS:"DE",YEAR:"1950",TEAM:"Bears",NICKNAME:"The Claw"}, ctx:"Career — Chicago Bears most feared defensive end", clues:["Was called the meanest man in football by the Saturday Evening Post","Nicknamed The Claw for his pass rushing technique","Was inducted into the Pro Football Hall of Fame after his career","Was one of the first dominant pass rushing defensive ends in NFL history"] },
  { player:"Bill Hewitt NFL", sport:"🏈 NFL", answer:"BILL HEWITT NO HELMET", era:"legends", stats:{REC:"31",TD:"8",YEAR:"1936",HELMET:"No"}, ctx:"Career — Last player to play without a helmet", clues:["Was the last player in NFL history to regularly play without a helmet","Won 2 NFL championships with the Bears and Eagles","Was inducted into the Hall of Fame in 1971","Was known as The Offside Kid for his quick jump at the snap"] },
  { player:"Turk Edwards", sport:"🏈 NFL", answer:"TURK EDWARDS", era:"legends", stats:{POS:"OT",YEAR:"1936",TEAM:"Redskins",ALLPRO:"4"}, ctx:"Career — Washington Redskins offensive tackle All-Pro", clues:["Was selected All-Pro 4 times in his career","Was inducted into the Pro Football Hall of Fame after his career","Had his career ended when his knee gave way during a coin toss","Was inducted into the Hall of Fame in 1969"] },
  { player:"Link Lyman", sport:"🏈 NFL", answer:"LINK LYMAN", era:"legends", stats:{POS:"DT",YEAR:"1925",TEAM:"Bears",TITLES:"3"}, ctx:"Career — Chicago Bears dynasty tackle pioneer", clues:["Won 3 NFL championships with the Chicago Bears","Was one of the first players to use defensive line shifts and stunts","Was inducted into the Pro Football Hall of Fame after his career","Was inducted into the Hall of Fame in 1964"] },
  { player:"George Connor", sport:"🏈 NFL", answer:"GEORGE CONNOR", era:"legends", stats:{POS:"OT/LB",ALLPRO:"4",YEAR:"1951",TEAM:"Bears"}, ctx:"Career — Chicago Bears two-way Pro Bowl star", clues:["Was selected All-Pro on both offense and defense in different seasons","Played offensive tackle and linebacker for the Chicago Bears","Won the Outland Trophy at Notre Dame in 1947","Was inducted into the Hall of Fame in 1975"] },
  { player:"Jack Chesbro Happy Jack", sport:"⚾ MLB", answer:"HAPPY JACK CHESBRO", era:"legends", stats:{W:"41",ERA:"1.82",CG:"48",IP:"454"}, ctx:"1904 MLB Season — New York Highlanders most wins ever", clues:["Won 41 games — the most in the modern era of baseball","Posted an ERA of 1.82 — among the best of the season","Nicknamed Happy Jack for his cheerful disposition","Lost the pennant on a wild pitch on the final day of the season"] },
  // HARD Baseball Modern
  { player:"Felix Hernandez", sport:"⚾ MLB", answer:"FELIX HERNANDEZ", era:"modern", stats:{ERA:"2.27",W:"13",IP:"232",CY:"2010"}, ctx:"2010 MLB Season — Won Cy Young with losing record", clues:["Won the Cy Young Award despite having a losing win-loss record of 13-12","Had the lowest ERA in the American League this season","Pitched for the Seattle Mariners his entire career","From Valencia Venezuela — nicknamed King Felix"] },
  { player:"Justin Verlander", sport:"⚾ MLB", answer:"JUSTIN VERLANDER", era:"modern", stats:{ERA:"2.64",SO:"290",W:"21",MVP:"2011"}, ctx:"2011 MLB Season — Won MVP and Cy Young in same year", clues:["Won both the AL MVP and Cy Young Award — only the fifth pitcher to do so","Had 250+ strikeouts and under a 2.50 ERA this season","The Tigers have one of baseball's most storied franchises featuring Ty Cobb Hank Greenberg and Al Kaline","From Manakin-Sabot Virginia"] },
  { player:"Max Scherzer", sport:"⚾ MLB", answer:"MAX SCHERZER", era:"modern", stats:{ERA:"2.53",SO:"300",W:"20",CY:"3"}, ctx:"Career Totals — Three Cy Young Awards in both leagues", clues:["Won the Cy Young Award in both the AL and NL — one of only four pitchers ever","Struck out 300 batters in a season","Had two no-hitters within 5 days in 2015","From St. Louis Missouri — known for his mismatched eye colors"] },
  { player:"Chris Sale", sport:"⚾ MLB", answer:"CHRIS SALE", era:"modern", stats:{ERA:"2.90",SO:"11.17",W:"17",K9:"Highest"}, ctx:"Career Totals — Highest strikeout rate per 9 innings ever", clues:["Had one of the highest career strikeout rates per 9 innings in MLB history","Was nicknamed The Conductor for his unusual sidearm delivery","Was traded from the White Sox to the Red Sox for 4 top prospects","From Lakeland Florida"] },
  { player:"David Price", sport:"⚾ MLB", answer:"DAVID PRICE", era:"modern", stats:{ERA:"3.26",CY:"2012",W:"20",DRAFT:"1st"}, ctx:"Career Totals — Number 1 overall pick who won the Cy Young", clues:["Was the 1st overall pick in the 2007 MLB Draft by the Tampa Bay Rays","Won the AL Cy Young Award in 2012","Won a World Series with the Boston Red Sox in 2018","From Murfreesboro Tennessee"] },
  { player:"Cole Hamels", sport:"⚾ MLB", answer:"COLE HAMELS", era:"modern", stats:{ERA:"3.43",WS_MVP:"2008",W:"20",SO:"3000"}, ctx:"Career Totals — World Series MVP who struck out 3000 batters", clues:["Won the World Series MVP with the Philadelphia Phillies in 2008","Struck out 3,000 batters in his career","Was traded for a package of 5 prospects when he went to Texas","From San Diego California"] },
  { player:"Johan Santana", sport:"⚾ MLB", answer:"JOHAN SANTANA", era:"modern", stats:{ERA:"3.20",CY:"2",SO:"1,988",NHIT:"Only Mets"}, ctx:"Career Totals — Two Cy Youngs and the only no-hitter in Mets history", clues:["Threw the only no-hitter in New York Mets history in 2012","Won 2 Cy Young Awards with the Minnesota Twins","Had one of the best changeups in baseball history","From Tovar Venezuela"] },
  { player:"Zack Greinke", sport:"⚾ MLB", answer:"ZACK GREINKE", era:"modern", stats:{ERA:"1.66",CY:"2009",W:"17",YEAR:"2015"}, ctx:"2015 MLB Season — Had the lowest ERA in the NL since 1968", clues:["Posted a 1.66 ERA in 2015 — the lowest in the NL since Bob Gibson in 1968","Won the AL Cy Young Award with Kansas City in 2009","Has played for 7 different MLB teams in his career","Overcame social anxiety disorder that nearly ended his career"] },
  { player:"Jon Lester", sport:"⚾ MLB", answer:"JON LESTER", era:"modern", stats:{ERA:"3.64",WS:"3",CANCER:"Survived",W:"200"}, ctx:"Career Totals — Won three World Series after surviving cancer", clues:["Survived non-Hodgkin lymphoma in 2006 and returned to pitch at the highest level","Won 3 World Series championships — 2 with Boston and 1 with Chicago","Was the winning pitcher in Game 5 of the 2007 World Series in his first Series","From Tacoma Washington"] },
  { player:"Hyun-Jin Ryu", sport:"⚾ MLB", answer:"HYUN-JIN RYU", era:"modern", stats:{ERA:"2.32",LEAD:"2019 NL",W:"14",NATION:"South Korea"}, ctx:"2019 MLB Season — Led NL in ERA without winning Cy Young", clues:["Led the National League in ERA in 2019 but finished second in Cy Young voting","Was the first Korean pitcher signed directly from the KBO to a major MLB club","The Dodgers moved from Brooklyn to Los Angeles in 1958 breaking New York hearts","From Incheon South Korea"] },
  { player:"Patrick Corbin", sport:"⚾ MLB", answer:"PATRICK CORBIN", era:"modern", stats:{SO:"238",W:"14",ERA:"3.25",WS:"2019"}, ctx:"2019 World Series — Key pitcher for the Nationals championship", clues:["Was the key bullpen weapon for the Washington Nationals 2019 World Series win","Appeared in three World Series games in relief including a save in Game 7","Signed a 6-year 140 million dollar contract before the season","From Binghamton New York"] },
  { player:"Noah Syndergaard", sport:"⚾ MLB", answer:"NOAH SYNDERGAARD", era:"modern", stats:{ERA:"3.24",SO:"9.9",NICK:"Thor",FB:"98mph"}, ctx:"Career Totals — The Mets ace nicknamed Thor", clues:["Was nicknamed Thor for his blond hair and 98mph fastball","Threw a fastball behind Mets nemesis Chase Utley in the 2015 NLCS causing a controversy","Was acquired from the Blue Jays in the R.A. Dickey trade","From Mansfield Texas"] },
  { player:"Carlos Martinez", sport:"⚾ MLB", answer:"CARLOS MARTINEZ", era:"modern", stats:{ERA:"3.17",SO:"8.2",W:"16",NATION:"Dominican"}, ctx:"2015-17 MLB Seasons — Cardinals ace from the Dominican Republic", clues:["Was one of the best starters in the National League for three consecutive seasons","Was known for throwing up to 100mph while also having outstanding control","Converted to a closer later in his career","From Monte Cristi Dominican Republic"] },
  { player:"Masahiro Tanaka", sport:"⚾ MLB", answer:"MASAHIRO TANAKA", era:"modern", stats:{ERA:"3.74",W:"78",SPLIT:"Elite",NATION:"Japan"}, ctx:"Career Totals — Japanese ace who starred for the Yankees", clues:["Had one of the best splitters in MLB history — nearly unhittable when located correctly","Was signed by the New York Yankees for 155 million dollars from Rakuten in Japan","Went 78-46 in the regular season with the Yankees","From Kakuda Miyagi Japan"] },
  // HARD Soccer Modern
  { player:"Andres Iniesta", sport:"⚽ Soccer", answer:"ANDRES INIESTA", era:"modern", stats:{WC:"2010 final goal",UCL:"4",LA_LIGA:"9",NATION:"Spain"}, ctx:"2010 World Cup Final — Scored the only goal", clues:["Scored the winning goal in the 2010 World Cup Final for Spain in extra time","Won 4 Champions League titles and 9 La Liga titles with Barcelona","Was named the best player at Euro 2012","From Fuentealbilla in the Albacete province of Spain"] },
  { player:"Xavi Hernandez", sport:"⚽ Soccer", answer:"XAVI HERNANDEZ", era:"modern", stats:{LA_LIGA:"8",UCL:"4",PASS_ACC:"91%",NATION:"Spain"}, ctx:"Career Totals — The passing maestro at the heart of Barcelona and Spain", clues:["Had a passing accuracy of over 91% across his entire career — the highest ever recorded","Won 4 Champions Leagues and 8 La Liga titles with Barcelona","Was the heartbeat of both Barcelona and the Spanish national team during their golden era","From Terrassa Catalonia Spain"] },
  { player:"Neymar", sport:"⚽ Soccer", answer:"NEYMAR_2", era:"modern", stats:{G:"77",NATION:"Brazil",UCL:"2015",TRANSFER:"222M record"}, ctx:"Career Totals — World record transfer and Brazil all-time scorer", clues:["Was sold to PSG for a world record 222 million euros in 2017","Won the Champions League with Barcelona in 2015","Became Brazil all-time leading scorer surpassing Pele","From Mogi das Cruzes Sao Paulo Brazil"] },
  { player:"Luis Suarez", sport:"⚽ Soccer", answer:"LUIS SUAREZ", era:"modern", stats:{G:"198",BITE:"3 incidents",UCL:"2015",GOLDEN_BOOT:"PL 2014"}, ctx:"Career Totals — Premier League Golden Boot winner and notorious biter", clues:["Won the Premier League Golden Boot with 31 goals in 2013-14","Was banned three separate times for biting opponents during matches","Won the Champions League with Barcelona in 2015","From Salto Uruguay"] },
  { player:"Robert Lewandowski", sport:"⚽ Soccer", answer:"LEWANDOWSKI_2", era:"modern", stats:{G:"344",BUNDESLIGA:"9",CL:"2020",RECORD:"41 goals"}, ctx:"Career Totals — Broke a 49-year Bundesliga record with 41 goals", clues:["Scored 41 Bundesliga goals in a single season — breaking a 49-year record set by Gerd Muller","Won the Champions League with Bayern Munich in 2020","Won 9 consecutive Bundesliga titles with Borussia Dortmund and Bayern Munich","From Leszno Poland"] },
  { player:"Kevin De Bruyne", sport:"⚽ Soccer", answer:"KEVIN DE BRUYNE", era:"modern", stats:{AST:"337",PL_RECORD:"21 assists",UCL:"2023",NATION:"Belgium"}, ctx:"Career Totals — Premier League record assists and Champions League winner", clues:["Set the Premier League record for assists in a single season with 21 in 2019-20","Won the Champions League with Manchester City in 2023","Has been voted into the PFA Team of the Year six times","From Ghent Belgium"] },
  { player:"Mohamed Salah", sport:"⚽ Soccer", answer:"SALAH_2", era:"modern", stats:{G:"214",PL_RECORD:"32 goals",UCL:"2019",NATION:"Egypt"}, ctx:"Career Totals — Premier League record goals and Champions League winner", clues:["Set the Premier League record with 32 goals in a single season in 2017-18","Won the Champions League with Liverpool in 2019","Is Egypt all-time leading scorer","From Nagrig El Gharbia Egypt"] },
  { player:"Erling Haaland", sport:"⚽ Soccer", answer:"ERLING HAALAND", era:"modern", stats:{G:"52",PL_RECORD:"36 goals season",UCL:"2023",NATION:"Norway"}, ctx:"Career Totals — Broke Premier League season goals record in first season", clues:["Scored 36 Premier League goals in his debut season — shattering the previous record","Won the Champions League with Manchester City in his first season in England","Scored in 10 consecutive Champions League games — a new record","From Leeds England but representing Norway"] },
  { player:"Kylian Mbappe", sport:"⚽ Soccer", answer:"KYLIAN MBAPPE", era:"modern", stats:{G:"256",WC:"2018",LIGUE1:"6",NATION:"France"}, ctx:"Career Totals — World Cup winner at 19 and PSG all-time scorer", clues:["Won the World Cup with France in 2018 at age 19 — only the second teenager to score in a final","Became PSG all-time leading scorer surpassing Edinson Cavani","Won 6 Ligue 1 titles with PSG","From Bondy Seine-Saint-Denis France"] },
  { player:"Sergio Ramos", sport:"⚽ Soccer", answer:"SERGIO RAMOS", era:"modern", stats:{UCL:"4",WC:"2010",EURO:"2",GOALS:"101 defender"}, ctx:"Career Totals — Four Champions Leagues and 100+ goals as a defender", clues:["Scored over 100 goals in his career — extraordinarily prolific for a central defender","Won 4 Champions League titles with Real Madrid","Won the World Cup and two European Championships with Spain","From Camas Seville Spain — joined Real Madrid at age 19"] },
  { player:"Luka Modric", sport:"⚽ Soccer", answer:"LUKA MODRIC", era:"modern", stats:{BALLON:"2018",UCL:"5",WC:"2018 final",NATION:"Croatia"}, ctx:"Career Totals — Won the Ballon d Or and led Croatia to World Cup final", clues:["Won the Ballon d Or in 2018 — ending the Messi-Ronaldo duopoly that had lasted a decade","Led Croatia to the World Cup Final in 2018","Won 5 Champions League titles with Real Madrid","From Zadar Croatia — survived the Croatian War of Independence as a child"] },
  { player:"Virgil van Dijk", sport:"⚽ Soccer", answer:"VIRGIL VAN DIJK", era:"modern", stats:{UCL:"2019",PL:"2020",POTY:"Runner up",NATION:"Netherlands"}, ctx:"Career Totals — Transformed Liverpool's defense and finished 2nd in Ballon d Or", clues:["Finished second in the Ballon d Or in 2019 — the highest ever finish by a defender","Was the world's most expensive defender when Liverpool paid 75 million pounds for him","Won the Champions League and Premier League with Liverpool","From Breda Netherlands"] },
  { player:"Alisson Becker", sport:"⚽ Soccer", answer:"ALISSON BECKER", era:"modern", stats:{UCL:"2019",PL:"2020",SAVE:"93%",NATION:"Brazil"}, ctx:"Career Totals — Champions League winning goalkeeper who scored a crucial header", clues:["Scored a last-minute header against West Brom that kept Liverpool's top-four hopes alive","Won the Champions League with Liverpool in 2019","Was named the best goalkeeper in the world on multiple occasions","From Novo Hamburgo Rio Grande do Sul Brazil"] },
  { player:"N'Golo Kante", sport:"⚽ Soccer", answer:"NGOLO KANTE", era:"modern", stats:{PL:"2",UCL:"2021",WC:"2018",TEAM:"Chelsea"}, ctx:"Career Totals — Won two Premier Leagues and a World Cup as the most tireless midfielder", clues:["Won two Premier League titles in consecutive years with different clubs — Leicester and Chelsea","Won the Champions League with Chelsea in 2021","Was key to France winning the World Cup in 2018","From Paris France of Malian descent"] },
  { player:"Toni Kroos", sport:"⚽ Soccer", answer:"TONI KROOS", era:"modern", stats:{UCL:"5",WC:"2014",PASS_ACC:"93%",LA_LIGA:"4"}, ctx:"Career Totals — Five Champions League titles and World Cup winner", clues:["Won 5 Champions League titles — 1 with Bayern Munich and 4 with Real Madrid","Won the World Cup with Germany in 2014","Had a passing accuracy of 93% across his career — among the highest ever","From Greifswald Germany"] },
  { player:"Manuel Neuer", sport:"⚽ Soccer", answer:"MANUEL NEUER", era:"modern", stats:{SWEEPER:"Invented",UCL:"2013",WC:"2014",GK_POTY:"Multiple"}, ctx:"Career Totals — Revolutionized goalkeeping as the sweeper-keeper", clues:["Is credited with inventing and popularizing the sweeper-keeper role in modern football","Won the Champions League with Bayern Munich in 2013","Won the World Cup with Germany in 2014","From Gelsenkirchen Germany — was a Schalke youth player before joining Bayern"] },
  // HARD Golf Modern
  { player:"Dustin Johnson", sport:"⛳ Golf", answer:"DUSTIN JOHNSON 2", era:"modern", stats:{MAJORS:"2",RANK:"1",WINS:"24",YEAR:"2016"}, ctx:"Career Totals — Two majors and world No. 1 for 135 weeks", clues:["Spent 135 weeks at World No. 1 — the most of any American-born player since Tiger","Won the US Open in 2016 and the Masters in 2020","Was suspended from the PGA Tour for six months early in his career","From Columbia South Carolina"] },
  { player:"Justin Thomas", sport:"⛳ Golf", answer:"JUSTIN THOMAS 2", era:"modern", stats:{MAJORS:"2",WINS:"15",POTY:"2017",YEAR:"2017"}, ctx:"Career Totals — PGA Championship twice and Player of the Year", clues:["Won the PGA Championship twice — 2017 and 2022","Was named PGA Tour Player of the Year in 2017 after winning his first major","Is one of the closest friends of Rory McIlroy and Jordan Spieth on tour","From Louisville Kentucky — son of PGA professional Mike Thomas"] },
  { player:"Xander Schauffele", sport:"⛳ Golf", answer:"XANDER SCHAUFFELE", era:"modern", stats:{MAJORS:"2",OLYMPIC:"Gold 2020",WINS:"8",YEAR:"2024"}, ctx:"Career Totals — Won two majors and Olympic gold after years of near-misses", clues:["Won the PGA Championship and The Open Championship in 2024 after years of finishing second","Won Olympic gold at the Tokyo Games in 2021","Had finished in the top 10 of majors more than a dozen times before winning one","From San Diego California — his father was an Olympic decathlete"] },
  { player:"Scottie Scheffler", sport:"⛳ Golf", answer:"SCOTTIE SCHEFFLER", era:"modern", stats:{MAJORS:"3",RANK:"1",WINS:"12",POTY:"Multiple"}, ctx:"Career Totals — Multiple Masters wins and world No. 1 dominant run", clues:["Won multiple Masters titles and was ranked World No. 1 for over 100 consecutive weeks","Won PGA Tour Player of the Year multiple times","Was arrested on his way to The PGA Championship and still finished second that day","From Ridgewood New Jersey but based in Dallas Texas"] },
  { player:"Jon Rahm", sport:"⛳ Golf", answer:"JON RAHM 2", era:"modern", stats:{MAJORS:"2",RANK:"1",WINS:"9",NATION:"Spain"}, ctx:"Career Totals — Spanish champion with two majors and world No. 1", clues:["Became the first Spaniard to reach World No. 1 since Seve Ballesteros","Won the US Open in 2021 and the Masters in 2023","Was born with a club foot which required surgery as a child","From Barrika Basque Country Spain"] },
  { player:"Collin Morikawa", sport:"⛳ Golf", answer:"COLLIN MORIKAWA_2", era:"modern", stats:{MAJORS:"2",WINS:"7",YEAR:"2020",IRON:"Best ever"}, ctx:"Career Totals — Won two majors in his first two years on tour", clues:["Won the PGA Championship and The Open Championship in his first two full years on tour","Is considered the best iron player of his generation","Won The Open Championship at Royal St George's in 2021 on his first appearance","From Los Angeles California of Japanese and Chinese descent"] },
  { player:"Patrick Cantlay", sport:"⛳ Golf", answer:"PATRICK CANTLAY_2", era:"modern", stats:{POTY:"2021",WINS:"8",FEDEX:"2021",YEAR:"2021"}, ctx:"Career Totals — FedEx Cup champion and Player of the Year", clues:["Won the FedEx Cup and was named PGA Tour Player of the Year in 2021","Won the BMW Championship in a sudden death playoff after the lowest recorded round","Was away from golf for two years after his close friend and caddie Chris Roth died","From Long Beach California"] },
  { player:"Viktor Hovland", sport:"⛳ Golf", answer:"VIKTOR HOVLAND", era:"modern", stats:{FEDEX:"2023",MAJORS:"0",WINS:"6",NATION:"Norway"}, ctx:"Career Totals — First Norwegian to win the FedEx Cup", clues:["Won the FedEx Cup in 2023 — the first Norwegian to win it","Was the first Norwegian player to make a cut in a major championship","Won the Hero World Challenge and multiple European Tour events","From Oslo Norway — played college golf at Oklahoma State"] },
  { player:"Matt Fitzpatrick", sport:"⛳ Golf", answer:"MATT FITZPATRICK", era:"modern", stats:{US_OPEN:"2022",AMATEUR:"US 2013",WINS:"7",NATION:"England"}, ctx:"Career Totals — Won US Open at same course as his US Amateur title", clues:["Won the US Open in 2022 at The Country Club — the same course where he won the US Amateur in 2013","Was the first player to win both the US Amateur and US Open at the same venue","From Sheffield England — made his Masters debut at age 19","Has one of the most technically precise swings on tour"] },
  { player:"Cam Smith", sport:"⛳ Golf", answer:"CAM SMITH", era:"modern", stats:{OPEN:"2022",LIV:"Joined",WINS:"10",NATION:"Australia"}, ctx:"Career Totals — Won The Open Championship then joined LIV Golf", clues:["Won The Open Championship at St Andrews in 2022 with a stunning 64 in the final round","Joined the Saudi-backed LIV Golf league shortly after his Open win in a controversial move","Has the most famous mullet haircut in professional golf","From Brisbane Queensland Australia"] },
  { player:"Tony Finau", sport:"⛳ Golf", answer:"TONY FINAU", era:"modern", stats:{WINS:"7",RYDER:"Multiple",YEAR:"2022",NATION:"USA"}, ctx:"Career Totals — Finally broke through with multiple wins after years of near-misses", clues:["Won 3 PGA Tour events in 2022 after going years between his first and second wins","Is of Tongan and Samoan descent — one of the most diverse ethnic backgrounds on tour","Dislocated his ankle celebrating a hole-in-one at the Masters Par 3 contest in 2018","From Salt Lake City Utah"] },
  { player:"Sam Burns", sport:"⛳ Golf", answer:"SAM BURNS_2", era:"modern", stats:{WINS:"6",RYDER:"2023",YEAR:"2022",NATION:"USA"}, ctx:"Career Totals — Won three consecutive Wells Fargo Championships", clues:["Won the same PGA Tour event — the Wells Fargo Championship — three years in a row","Was named to the US Ryder Cup team in 2023","Is married to Caroline Campbell whose father is Chad Campbell a PGA Tour winner","From Shreveport Louisiana"] },
  { player:"Shane Lowry", sport:"⛳ Golf", answer:"SHANE LOWRY", era:"modern", stats:{OPEN:"2019",WINS:"6",NATION:"Ireland",PORTRUSH:"Yes"}, ctx:"Career Totals — Won The Open Championship at home in Ireland", clues:["Won The Open Championship at Royal Portrush in 2019 — the first Irish venue in 68 years","Led by 4 shots entering the final round and held on in difficult conditions","Was the Amateur champion of Ireland before turning professional","From Portarlington County Offaly Ireland"] },
  { player:"Brooks Koepka", sport:"⛳ Golf", answer:"BROOKS KOEPKA 2", era:"modern", stats:{MAJORS:"5",US_OPEN:"2 consec",PGA:"2 consec",LIV:"Joined"}, ctx:"Career Totals — Won four majors in consecutive pairs", clues:["Won the US Open in consecutive years 2017 and 2018 then the PGA Championship in consecutive years 2018 and 2019","Won 5 major championships in total","Was known for raising his game specifically in majors while often underperforming in regular events","From West Palm Beach Florida"] },
  { player:"Francesco Molinari", sport:"⛳ Golf", answer:"FRANCESCO MOLINARI", era:"modern", stats:{OPEN:"2018",RYDER:"Perfect",WINS:"8",NATION:"Italy"}, ctx:"Career Totals — Won The Open Championship and had a perfect Ryder Cup", clues:["Won The Open Championship at Carnoustie in 2018 for Italy's first major in decades","Went 5-0-0 at the 2018 Ryder Cup — the only European to go undefeated across all five matches","Is the older brother of Edoardo Molinari also a PGA Tour winner","From Turin Italy"] },
  { player:"Billy Horschel", sport:"⛳ Golf", answer:"BILLY HORSCHEL", era:"modern", stats:{FEDEX:"2014",WGC:"2",WINS:"9",NATION:"USA"}, ctx:"Career Totals — Won the FedEx Cup wearing octopus pants", clues:["Won the FedEx Cup in 2014 famously wearing octopus-patterned trousers in the final event","Has won multiple WGC events — tournaments that include only the world's best players","Is known as the most passionate golfer on tour — often showing intense emotional reactions","From Grant Florida"] },
  { player:"Harris English", sport:"⛳ Golf", answer:"HARRIS ENGLISH", era:"modern", stats:{WINS:"5",TOUR_CHAMP:"2021",YEAR:"2021",NATION:"USA"}, ctx:"Career Totals — Won the Tour Championship and Olympic bronze", clues:["Won the Tour Championship and the Olympic bronze medal in Tokyo in the same year","Beat Kramer Hickok in a 8-hole playoff at the Travelers Championship — one of the longest in history","Is one of the longest hitters on tour","From Valdosta Georgia"] },
  { player:"Webb Simpson", sport:"⛳ Golf", answer:"WEBB SIMPSON", era:"modern", stats:{US_OPEN:"2012",POTY:"2018",WINS:"8",NATION:"USA"}, ctx:"Career Totals — Won US Open and Players Championship", clues:["Won the US Open in 2012 at the Olympic Club","Won the Players Championship in 2018 — considered by many the fifth major","Is known as one of the most devout Christian players on tour","From Raleigh North Carolina"] },
  { player:"Kevin Kisner", sport:"⛳ Golf", answer:"KEVIN KISNER", era:"modern", stats:{WINS:"5",MATCH:"WGC Match Play 2019",RYDER:"2021",NATION:"USA"}, ctx:"Career Totals — WGC Match Play champion and Ryder Cup stalwart", clues:["Won the WGC Dell Technologies Match Play in 2019","Was known as one of the best match play competitors of his generation","Is one of the shortest hitters on tour but compensates with exceptional short game","From Aiken South Carolina"] },
  { player:"Max Homa", sport:"⛳ Golf", answer:"MAX HOMA", era:"modern", stats:{WINS:"6",RYDER:"2023",TWITTER:"Roasts",NATION:"USA"}, ctx:"Career Totals — Six wins and beloved for his social media golf roasts", clues:["Won 6 PGA Tour events and became one of the most popular players due to his social media personality","Was named to the US Ryder Cup team in 2023","Is famous for his golf swing critique videos on Twitter that roast amateur golfers","From Valencia California"] },
  { player:"Tom Hoge", sport:"⛳ Golf", answer:"TOM HOGE", era:"modern", stats:{WINS:"1",AT_T:"2022",CAREER:"Up and down",NATION:"USA"}, ctx:"2022 AT&T Pebble Beach — Surprise winner in famous event", clues:["Won the AT&T Pebble Beach Pro-Am in 2022 for his first PGA Tour victory","Spent years on the Korn Ferry Tour before finally breaking through on the PGA Tour","Is from Fargo North Dakota — one of very few PGA Tour players from that state","Studied business at TCU before turning professional"] },
  { player:"Adam Scott", sport:"⛳ Golf", answer:"ADAM SCOTT 2", era:"modern", stats:{MASTERS:"2013",WINS:"14",FIRST:"Australian Masters",NATION:"Australia"}, ctx:"Career Totals — First Australian to win The Masters", clues:["Was the first Australian to win The Masters in 2013","Had led The Open Championship in 2012 by 4 with 4 to play but made 4 bogeys to lose","Was coached by Butch Harmon and had one of the most admired swings on tour","From Adelaide South Australia"] },
  // HARD Hockey Modern
  { player:"Sidney Crosby", sport:"🏒 NHL", answer:"SIDNEY CROSBY", era:"modern", stats:{CUPS:"3",POINTS:"1000+",MVP:"Hart 2x",NATION:"Canada"}, ctx:"Career Totals — Three Cups and two Hart Trophies for Pittsburgh", clues:["Won 3 Stanley Cups and 2 Hart Trophies with the Pittsburgh Penguins","Was the 1st overall pick in the 2005 NHL Draft — the most anticipated draft in years","Missed significant time with concussion issues but came back to dominate again","From Cole Harbour Nova Scotia — nicknamed Sid the Kid"] },
  { player:"Alexander Ovechkin", sport:"🏒 NHL", answer:"ALEXANDER OVECHKIN", era:"modern", stats:{CUPS:"1",GOALS:"800+",HART:"3",RECORD:"All-time goals"}, ctx:"Career Totals — Broke Gretzky's all-time goals record", clues:["Broke Wayne Gretzky's all-time goals record — the most unbreakable record in hockey","Won 3 Hart Trophies and the Rocket Richard Trophy for top scorer 9 times","Won his only Stanley Cup with the Washington Capitals in 2018","From Moscow Russia — nicknamed The Great Eight"] },
  { player:"Evgeni Malkin", sport:"🏒 NHL", answer:"EVGENI MALKIN", era:"modern", stats:{CUPS:"3",POINTS:"1000+",MVP:"Conn Smythe 2009",HART:"1"}, ctx:"Career Totals — Three Cups alongside Crosby in Pittsburgh", clues:["Won 3 Stanley Cups with the Pittsburgh Penguins alongside Sidney Crosby","Won the Conn Smythe Trophy as playoff MVP in 2009","Won the Hart Trophy and Art Ross Trophy as the league's best scorer in 2012","From Magnitogorsk Russia"] },
  { player:"Jonathan Toews", sport:"🏒 NHL", answer:"JONATHAN TOEWS", era:"modern", stats:{CUPS:"3",CONN_SMYTHE:"2010",SELKE:"3",CAPTAIN:"Youngest"}, ctx:"Career Totals — Three Cups and Captain Serious for Chicago", clues:["Won 3 Stanley Cups as captain of the Chicago Blackhawks dynasty","Was one of the youngest captains in NHL history when named at age 20","Won the Conn Smythe Trophy in 2010 and 3 Selke Trophies as the best defensive forward","From Winnipeg Manitoba — nicknamed Captain Serious"] },
  { player:"Patrick Kane", sport:"🏒 NHL", answer:"PATRICK KANE", era:"modern", stats:{CUPS:"3",MVP:"Hart 2016",POINTS:"1000+",PICK:"1 overall 2007"}, ctx:"Career Totals — Three Cups and Hart Trophy for the Blackhawks", clues:["Won 3 Stanley Cups and the Hart Trophy as league MVP in 2016 with the Chicago Blackhawks","Was the 1st overall pick in the 2007 NHL Draft","Was the first American-born player to win the Hart Trophy in over 50 years","From Buffalo New York"] },
  { player:"Henrik Lundqvist", sport:"🏒 NHL", answer:"HENRIK LUNDQVIST 2", era:"modern", stats:{VEZINA:"1",WINS:"459",SHUTOUTS:"64",NATION:"Sweden"}, ctx:"Career Totals — The King of New York Rangers for 15 seasons", clues:["Was nicknamed The King and was the face of the New York Rangers for 15 seasons","Won the Vezina Trophy as best goaltender in 2012","Had 459 wins — sixth most in NHL history","From Are Sweden — won Olympic gold with Sweden in 2006"] },
  { player:"Pekka Rinne", sport:"🏒 NHL", answer:"PEKKA RINNE", era:"modern", stats:{VEZINA:"1",WINS:"369",SHUTOUTS:"60",NATION:"Finland"}, ctx:"Career Totals — The face of the Nashville Predators for 15 years", clues:["Won the Vezina Trophy in 2018 as the NHL's best goaltender","Was the face of the Nashville Predators franchise for 15 seasons","Had 369 career wins with the Predators — all with one franchise","From Kempele Finland"] },
  { player:"Carey Price", sport:"🏒 NHL", answer:"CAREY PRICE", era:"modern", stats:{VEZINA:"1",HART:"1",OLYMPIC:"Gold",NATION:"Canada"}, ctx:"Career Totals — Won Hart and Vezina while leading Canada to Olympic gold", clues:["Won the Hart Trophy MVP and Vezina Trophy in the same season — 2014-15","Led Canada to Olympic gold at the 2014 Sochi Games","Was considered the best goalie in the world for several years","Grew up in Anahim Lake British Columbia — a remote community accessible mainly by air"] },
  { player:"Tuukka Rask", sport:"🏒 NHL", answer:"TUUKKA RASK", era:"modern", stats:{VEZINA:"1",WINS:"306",CUP:"2011",NATION:"Finland"}, ctx:"Career Totals — Won the Cup and Vezina with the Boston Bruins", clues:["Won the Stanley Cup with the Boston Bruins in 2011 as the backup","Won the Vezina Trophy in 2014 as the NHL's best goaltender","Retired mid-career but came out of retirement to help Boston in the playoffs","From Savonlinna Finland"] },
  { player:"Ben Bishop", sport:"🏒 NHL", answer:"BEN BISHOP", era:"modern", stats:{VEZINA:"Finalist",WINS:"201",HEIGHT:"6ft7",NATION:"USA"}, ctx:"Career Totals — Tallest goalie in NHL history at 6ft 7in", clues:["At 6ft 7in was the tallest goaltender in NHL history","Was a Vezina Trophy finalist multiple times with Tampa Bay and Dallas","Led the Tampa Bay Lightning to the Stanley Cup Final in 2015","From Denver Colorado"] },
  { player:"John Gibson", sport:"🏒 NHL", answer:"JOHN GIBSON", era:"modern", stats:{VEZINA:"Finalist",SV_PCT:".918",WINS:"200+",NATION:"USA"}, ctx:"Career Totals — Anaheim's franchise goalie carrying a struggling team", clues:["Was often the best player on the Anaheim Ducks despite the team struggling around him","Had a career save percentage of .918 — among the best of his generation","Was a Vezina Trophy finalist multiple times despite rarely having team success","From Pittsburgh Pennsylvania"] },
  { player:"Jake Allen", sport:"🏒 NHL", answer:"JAKE ALLEN", era:"modern", stats:{WINS:"250+",BACKUP:"Cup winner",NATION:"Canada",TEAM:"St Louis then Montreal"}, ctx:"Career Totals — Backup who won the Cup then led Montreal to the Final", clues:["Won the Stanley Cup as the backup goalie with the St. Louis Blues in 2019","Led the Montreal Canadiens to the Stanley Cup Final in 2021 filling in for injured Carey Price","Played over a decade in the NHL largely as an underappreciated starter","From Fredericton New Brunswick Canada"] },
  { player:"Andrei Vasilevskiy", sport:"🏒 NHL", answer:"ANDREI VASILEVSKIY", era:"modern", stats:{CUPS:"2",CONN_SMYTHE:"2021",VEZINA:"1",NATION:"Russia"}, ctx:"Career Totals — Two Cups and Conn Smythe for Tampa Bay", clues:["Won 2 Stanley Cups with the Tampa Bay Lightning in consecutive years 2020 and 2021","Won the Conn Smythe Trophy as playoff MVP in 2021","Won the Vezina Trophy in 2019 as the NHL's best goaltender","From Tyumen Russia — son of former NHL goalie Andrei Vasilevskiy Sr"] },
  { player:"Ilya Bryzgalov", sport:"🏒 NHL", answer:"ILYA BRYZGALOV", era:"modern", stats:{WINS:"250+",CONTRACT:"9yr 51M",FAMOUS:"Universe quote",NATION:"Russia"}, ctx:"Career Totals — One of the most colorful personalities in NHL history", clues:["Signed a 9-year 51 million dollar contract with Philadelphia that became one of hockey's worst deals","Was the subject of a famous documentary where he talked about the universe being huuuge","Won a Stanley Cup with Anaheim in 2007 as the backup","From Togliatti Russia"] },
  { player:"Marc-Andre Fleury2", sport:"🏒 NHL", answer:"FLEURY_2", era:"modern", stats:{CUPS:"3",SAVES:"Game 7 2009",W:"550+",SMILE:"Famous"}, ctx:"Career Totals — Three Cups and the most famous glove save in Game 7 history", clues:["Made a legendary glove save in the final seconds of Game 7 of the 2009 Stanley Cup Finals","Won 3 Stanley Cups with the Pittsburgh Penguins","Was known for his infectious smile and fan-friendly personality","From Sorel-Tracy Quebec — won a gold medal with Canada at the 2010 Olympics"] },

  // HARD Basketball Modern (need 4 more to reach 21)
  { player:"Kawhi Leonard", sport:"🏀 NBA", answer:"KAWHI LEONARD", era:"modern", stats:{FINALS_MVP:"2",DPOY:"2",CLUTCH:"Corner 3",QUIET:"Famously"}, ctx:"Career Totals — Two Finals MVPs with two different teams", clues:["Won Finals MVP with both the San Antonio Spurs and Toronto Raptors — different franchises","Was known for his robotic-like demeanor and the infamous corner three in the 2019 playoffs","Nicknamed The Klaw for his enormous hands","From Riverside California — is considered one of the best two-way players ever"] },
  { player:"Giannis Antetokounmpo", sport:"🏀 NBA", answer:"GIANNIS_2", era:"modern", stats:{FINALS_MVP:"2021",DPOY:"1",MVP:"2x",BLOCK:"Iconic"}, ctx:"Career Totals — Two MVPs and Finals MVP for Milwaukee", clues:["Won back-to-back NBA MVPs and a Finals MVP all with the Milwaukee Bucks","Made the iconic block in the 2021 Finals that sealed the Bucks championship","From Athens Greece of Nigerian descent — came to the NBA as a virtually unknown teenager","Nicknamed The Greek Freak for his rare combination of size speed and skill"] },
  { player:"Joel Embiid", sport:"🏀 NBA", answer:"JOEL EMBIID", era:"modern", stats:{MVP:"2023",SCORING:"33.1",NATION:"Cameroon",PROCESS:"The"}, ctx:"Career Totals — Cameroon-born MVP who led the Process era in Philadelphia", clues:["Won the NBA MVP award in 2022-23 with the Philadelphia 76ers","Led the NBA in scoring with 33.1 points per game that season","From Yaounde Cameroon — did not start playing basketball until age 16","Was the face of Philadelphia's rebuilding process known simply as The Process"] },
  { player:"Anthony Davis", sport:"🏀 NBA", answer:"ANTHONY DAVIS", era:"modern", stats:{FINALS_MVP:"2020",BLOCKS:"2.4",PICK:"1 overall",BROW:"Unibrow"}, ctx:"Career Totals — Championship with the Lakers and the most famous unibrow in sports", clues:["Won the NBA championship with the Los Angeles Lakers in 2020 in the Disney bubble","Was known for his distinctive unibrow which he trademarked","Was the 1st overall pick in the 2012 NBA Draft","From Chicago Illinois — averaged 3.1 blocks per game in his best defensive seasons"] },

  // HARD Basketball Classic (need 10 more to reach 21)
  { player:"Dominique Wilkins", sport:"🏀 NBA", answer:"DOMINIQUE WILKINS 2", era:"classic", stats:{PTS:"26.7",DUNK:"Human Highlight",ALLSTAR:"9x",RIVAL:"MJ"}, ctx:"Career Totals — The Human Highlight Film who rivaled Jordan", clues:["Nicknamed The Human Highlight Film for his spectacular dunking ability","Averaged 26.7 points per game for his career","Had epic dunk contest battles with Michael Jordan in the 1980s","From Paris France but grew up in Washington State"] },
  { player:"Patrick Ewing", sport:"🏀 NBA", answer:"PATRICK EWING 2", era:"classic", stats:{PTS:"24.0",REB:"11.2",BLK:"2.4",RINGS:"0"}, ctx:"Career Totals — The face of the Knicks who never won a ring", clues:["Was the franchise center of the New York Knicks for 15 seasons","Averaged 24 points and 11 rebounds but never won an NBA championship","Won two NCAA championships with Georgetown under John Thompson","From Kingston Jamaica — was the 1st overall pick in 1985"] },
  { player:"James Worthy", sport:"🏀 NBA", answer:"JAMES WORTHY", era:"classic", stats:{FINALS_MVP:"1988",RINGS:"3",NICK:"Big Game James",PICK:"1 overall"}, ctx:"Career Totals — Big Game James won Finals MVP in 1988 for the Showtime Lakers", clues:["Won the Finals MVP in 1988 with the Los Angeles Lakers Showtime dynasty","Nicknamed Big Game James for his playoff performance","Was the 1st overall pick in the 1982 NBA Draft","From Gastonia North Carolina — played at UNC under Dean Smith"] },
  { player:"Kevin McHale", sport:"🏀 NBA", answer:"KEVIN MCHALE 2", era:"classic", stats:{RINGS:"3",FG_PCT:".554",MOVES:"Best post",TEAM:"Celtics"}, ctx:"Career Totals — The best post moves in NBA history for the Celtics dynasty", clues:["Is considered by many to have had the best post moves and footwork of any power forward","Won 3 NBA championships with the Boston Celtics","His Hall of Fame lowpost repertoire is still studied by big men today","From Hibbing Minnesota — the same small town that produced Bob Dylan"] },
  { player:"Robert Parish", sport:"🏀 NBA", answer:"ROBERT PARISH", era:"classic", stats:{RINGS:"4",GAMES:"1611",SEASONS:"21",NICK:"Chief"}, ctx:"Career Totals — Played 21 NBA seasons and won 4 championships", clues:["Played 21 seasons in the NBA — one of the longest careers in league history","Won 4 NBA championships — 3 with Boston and 1 with Chicago","Nicknamed The Chief after the character in One Flew Over the Cuckoo's Nest","From Shreveport Louisiana"] },
  { player:"Dan Issel", sport:"🏀 NBA", answer:"DAN ISSEL", era:"classic", stats:{PTS:"27.2",ABA:"MVP",COMBINED:"27000+",NICK:"Horse"}, ctx:"Career Totals — ABA and NBA star with 27000 combined points", clues:["Scored over 27,000 combined points in the ABA and NBA","Won the ABA MVP award with the Kentucky Colonels","Nicknamed The Horse for his relentless work ethic and durability","From Batavia Illinois — one of the most underrated scorers in professional basketball history"] },
  { player:"Alex English", sport:"🏀 NBA", answer:"ALEX ENGLISH", era:"classic", stats:{PTS:"25.9",ALLSTAR:"8x",SCORING:"Leader 1980s",TEAM:"Nuggets"}, ctx:"Career Totals — Led the NBA in scoring in the 1980s for Denver", clues:["Scored more points than any other player in the entire decade of the 1980s","Averaged 25.9 points per game for his career with the Denver Nuggets","Was an 8-time All-Star who is often overlooked in historical discussions","From Columbia South Carolina — also published poetry during his career"] },
  { player:"World B. Free Classic", sport:"🏀 NBA", answer:"WORLD B FREE", era:"classic", stats:{PTS:"30.2",LEGAL:"Changed name",HANG_TIME:"Legendary",TEAM:"Clippers"}, ctx:"Best Season — Led NBA in scoring at 30.2 PPG for San Diego Clippers", clues:["Led the NBA in scoring with 30.2 points per game this season","Legally changed his first name to World B — his birth name was Lloyd","Was known for extraordinary hang time and acrobatic finishing moves","Was drafted by the Philadelphia 76ers in 1975 before finding his scoring form in San Diego"] },
  { player:"Mitch Richmond", sport:"🏀 NBA", answer:"MITCH RICHMOND", era:"classic", stats:{PTS:"21.8",ALLSTAR:"6x",HALL:"2014",TEAM:"Kings"}, ctx:"Career Totals — Hall of Famer who excelled on losing teams", clues:["Was inducted into the Hall of Fame in 2014 after a career mostly on non-playoff teams","Was a 6-time All-Star and averaged 21.8 points per game for his career","The Kings moved from Cincinnati to Kansas City to Sacramento and haven't won a title since 1951","From Fort Lauderdale Florida — nicknamed Rock"] },
  { player:"Reggie Miller", sport:"🏀 NBA", answer:"REGGIE MILLER", era:"classic", stats:{THREE_PT:"2560",RIVAL:"Spike Lee",CLUTCH:"8 pts 9 seconds",TEAM:"Pacers"}, ctx:"Career Totals — The clutch shooter who tormented the Knicks for a decade", clues:["Scored 8 points in 9 seconds against the New York Knicks in 1995 in one of the greatest clutch moments ever","Had a long-running feud with filmmaker Spike Lee who sat courtside at Knicks games","Scored 2,560 career three-pointers — was one of the all-time greats from distance","From Riverside California — his sister Cheryl Miller was also a basketball legend"] },

  // HARD Basketball Legends (need 13 more to reach 21)
  { player:"Elgin Baylor Legends", sport:"🏀 NBA", answer:"ELGIN BAYLOR 3", era:"legends", stats:{PTS:"27.4",REB:"13.5",SEASON:"71 pts game",RINGS:"0"}, ctx:"Career Totals — 27.4 PPG and revolutionized above-the-rim basketball", clues:["Was the first player to truly play above the rim — invented modern wing basketball","Averaged 27.4 points and 13.5 rebounds per game for his career","Scored 71 points in a single game in 1960 — a record at the time","Never won an NBA championship despite being one of the game's greatest players"] },
  { player:"Pete Maravich Legends", sport:"🏀 NBA", answer:"PETE MARAVICH", era:"legends", stats:{PPG:"44.2",COLLEGE:"NCAA record",NICK:"Pistol Pete",RINGS:"0"}, ctx:"Career Totals", clues:["Set the NCAA all-time scoring record of 44.2 PPG — without a shot clock or three-point line","Nicknamed Pistol Pete for his quick-draw shooting style","Predicted his own death at a young age and died of an undetected heart defect at 40","Was the son of legendary coach Press Maravich who designed offense to showcase his son"] },
  { player:"Oscar Robertson Legends", sport:"🏀 NBA", answer:"OSCAR ROBERTSON 2", era:"legends", stats:{TRIPLE_DBL:"181",AVG:"30-10-11",TITLE:"1971",SEASON:"First triple-double avg"}, ctx:"Career Totals — Averaged a triple-double for an entire season in 1961-62", clues:["Averaged a triple-double for an entire season — 30.8 points 12.5 rebounds 11.4 assists — in 1961-62","Recorded 181 career triple-doubles — the most ever at his time","Won the NBA championship with the Milwaukee Bucks in 1971 alongside Kareem Abdul-Jabbar","From Charlotte Tennessee — nicknamed The Big O"] },
  { player:"Bill Russell Legends", sport:"🏀 NBA", answer:"BILL RUSSELL 2", era:"legends", stats:{RINGS:"11",MVP:"5",BLOCKS:"Pioneered",COACH:"Player-coach"}, ctx:"Career Totals — 11 championships including 2 as player-coach", clues:["Won 11 NBA championships in 13 seasons — the most dominant winning streak in professional sports","Became the first Black head coach in major American professional sports when he was named player-coach","Won 5 MVP awards and was the defensive anchor of the Boston Celtics dynasty","From Monroe Louisiana — transformed how the game of basketball was played defensively"] },
  { player:"Wes Unseld Legends", sport:"🏀 NBA", answer:"WES UNSELD", era:"legends", stats:{MVP:"1969",FINALS_MVP:"1978",RINGS:"1",REBOUNDS:"Only 2nd pick MVP"}, ctx:"Career Totals — Won Rookie of Year and MVP in same season in 1969", clues:["Was only the second player in NBA history to win both Rookie of the Year and MVP in the same season","Won the Finals MVP with the Washington Bullets in 1978","Was renowned for his devastating screens and outlet passes rather than scoring","From Louisville Kentucky — played for the Bullets his entire career"] },
  { player:"Willis Reed Legends", sport:"🏀 NBA", answer:"WILLIS REED 3", era:"legends", stats:{FINALS_MVP:"2",MVP:"1970",LIMP:"Iconic",RINGS:"2"}, ctx:"Career Totals — The iconic limping entrance in the 1970 Finals", clues:["Famously limped onto the court for Game 7 of the 1970 NBA Finals on an injured leg inspiring a Knicks victory","Won 2 Finals MVPs and the regular season MVP in 1970","Was the first player in NBA history to win MVP Finals MVP and All-Star MVP in the same year","From Bernice Louisiana — played for the New York Knicks his entire career"] },
  { player:"Dave Cowens Legends", sport:"🏀 NBA", answer:"DAVE COWENS_2", era:"legends", stats:{MVP:"1973",RINGS:"2",ENERGY:"Maniacal",HEIGHT:"6ft9"}, ctx:"Career Totals — Won MVP and two rings as a undersized maniacal center", clues:["Won the NBA MVP in 1973 at just 6ft 9in — extremely undersized for a center","Won 2 NBA championships with the Boston Celtics","Was known for his maniacal energy and willingness to dive on loose balls","From Newport Kentucky — briefly left the NBA to drive a cab due to burnout"] },
  { player:"Jerry Lucas Legends", sport:"🏀 NBA", answer:"JERRY LUCAS_2", era:"legends", stats:{REB:"15.6",ROY:"1964",FG_PCT:".499",MEMORY:"Photographic"}, ctx:"Career Totals — Hall of Famer with photographic memory who memorized phone books", clues:["Had a photographic memory and later wrote bestselling books on memory improvement","Averaged 15.6 rebounds per game for his career — elite even for his era","Won Rookie of the Year with the Cincinnati Royals in 1964","Was so intellectually curious that his teammate Bill Bradley called him the most unusual athlete he ever knew"] },
  { player:"Hal Greer Legends", sport:"🏀 NBA", answer:"HAL GREER 2", era:"legends", stats:{PTS:"19.2",ALLSTAR:"10x",RINGS:"1",FT_STYLE:"Free throw"}, ctx:"Career Totals — 10-time All-Star known for jump-shooting free throws", clues:["Was the only NBA player in history to regularly shoot his free throws as jump shots rather than set shots","Was a 10-time All-Star and won a championship with the Philadelphia 76ers in 1967","Played all 15 seasons with the same franchise — the Syracuse Nationals who became the 76ers","From Huntington West Virginia — was the first Black scholarship athlete at Marshall University"] },
  { player:"Bob Pettit Legends", sport:"🏀 NBA", answer:"BOB PETTIT_2", era:"legends", stats:{PTS:"26.4",MVP:"2x",FIRST:"20000 pts",REB:"16.2"}, ctx:"Career Totals — First player to score 20000 NBA points and two-time MVP", clues:["Was the first player in NBA history to score 20,000 career points","Won the NBA MVP award twice in 1956 and 1959","Averaged 26.4 points and 16.2 rebounds per game for his career","From Baton Rouge Louisiana — was cut from his high school team as a freshman"] },
  { player:"Nate Thurmond Legends", sport:"🏀 NBA", answer:"NATE THURMOND_2", era:"legends", stats:{REB:"15.0",BLK:"Pioneer",ALLSTAR:"7x",QUAD:"First"}, ctx:"Career Totals — Recorded the first quadruple-double in NBA history", clues:["Recorded the first official quadruple-double in NBA history in 1974","Averaged 15 rebounds per game for his career despite playing in an era with Wilt Chamberlain","Was a 7-time All-Star with the San Francisco and Golden State Warriors","From Akron Ohio — was considered the best defensive center of his era by many players"] },
  { player:"Billy Cunningham Legends", sport:"🏀 NBA", answer:"BILLY CUNNINGHAM_2", era:"legends", stats:{RINGS:"1",ABA:"MVP",COACH:"76ers",NICK:"Kangaroo Kid"}, ctx:"Career Totals — Won ring as player and ABA MVP then coached the 76ers to a title", clues:["Won the ABA MVP award with the Carolina Cougars after jumping leagues","Coached the Philadelphia 76ers to the 1983 NBA championship","Nicknamed The Kangaroo Kid for his extraordinary leaping ability","From Brooklyn New York — played college ball at North Carolina under Dean Smith"] },
  { player:"Paul Arizin Legends", sport:"🏀 NBA", answer:"PAUL ARIZIN", era:"legends", stats:{PTS:"22.8",SCORING:"2 titles",MARINES:"Missed 2 seasons",JUMP_SHOT:"Pioneer"}, ctx:"Career Totals — Pioneered the jump shot and won two scoring titles despite military service", clues:["Was one of the pioneers of the modern jump shot — transformed offensive basketball","Won 2 NBA scoring titles despite missing 2 full seasons serving in the US Marines","Was never recruited out of high school and walked onto the Villanova team","From Philadelphia Pennsylvania — played his entire NBA career with the Warriors"] },

  // HARD Football Modern (need 11 more)
  { player:"Aaron Rodgers", sport:"🏈 NFL", answer:"AARON RODGERS", era:"modern", stats:{MVP:"4",SB_MVP:"2011",TD_INT:"Ratio best",PICK:"24th"}, ctx:"Career Totals — Four MVPs and the best TD/INT ratio in NFL history", clues:["Won 4 NFL MVP awards — the most of any player in the last two decades","Has the best touchdown-to-interception ratio in NFL history","Was a shocking fall to the 24th pick in the 2005 NFL Draft after being projected top 5","From Chico California — sat behind Brett Favre for three years before starting"] },
  { player:"Marshawn Lynch", sport:"🏈 NFL", answer:"MARSHAWN LYNCH", era:"modern", stats:{YARDS:"9112",SB_RINGS:"1",BEAST_MODE:"Run",MEDIA:"Refused"}, ctx:"Career Totals — Beast Mode runner who refused to talk to the media", clues:["Made the famous Beast Mode run in the 2011 playoffs where he broke 9 tackles","Was fined repeatedly for refusing to speak to the media during Super Bowl week","Won a Super Bowl with the Seattle Seahawks in Super Bowl XLVIII","From Oakland California — was notorious for eating Skittles on the sideline"] },
  { player:"Calvin Johnson", sport:"🏈 NFL", answer:"CALVIN JOHNSON", era:"modern", stats:{YARDS:"11619",SEASON:"1964",NICK:"Megatron",PICK:"2nd overall"}, ctx:"Career Totals — Megatron set the single-season receiving yards record", clues:["Set the single-season receiving yards record with 1,964 yards in 2012","Nicknamed Megatron for his superhuman combination of size speed and leaping ability","Was 6ft 5in with a 42-inch vertical leap — arguably the most physically gifted receiver ever","From Tyrone Georgia — retired early at age 30 citing the physical toll of the game"] },
  { player:"Adrian Peterson", sport:"🏈 NFL", answer:"ADRIAN PETERSON", era:"modern", stats:{YARDS:"2097 season",MVP:"2012",RUSH_YARDS:"14000+",COMEBACK:"ACL"}, ctx:"Career Totals — Rushed for 2097 yards coming back from a torn ACL", clues:["Rushed for 2,097 yards in 2012 — coming back from a torn ACL the previous year","Was named the NFL MVP for the 2012 season","Has over 14,000 career rushing yards — one of the all-time leaders","From Palestine Texas — nicknamed All Day"] },
  { player:"Ed Reed", sport:"🏈 NFL", answer:"ED REED", era:"modern", stats:{INT:"64",RETURN_YARDS:"1590",DPOY:"2004",RINGS:"1"}, ctx:"Career Totals — The greatest ball-hawking safety in NFL history", clues:["Is considered the greatest ball-hawking safety in NFL history","Had 64 career interceptions and returned them for 1,590 yards — an NFL record","Won Defensive Player of the Year in 2004 with the Baltimore Ravens","From St. Rose Louisiana — won a Super Bowl with the Ravens in Super Bowl XLVII"] },
  { player:"Reggie Wayne", sport:"🏈 NFL", answer:"REGGIE WAYNE", era:"modern", stats:{YARDS:"14345",RINGS:"1",RECEPTIONS:"1070",PARTNER:"Manning"}, ctx:"Career Totals — Peyton Manning's reliable receiver for a decade in Indianapolis", clues:["Was Peyton Manning's primary target for most of his time with the Indianapolis Colts","Had 1,070 career receptions and 14,345 yards — all with the Colts","Won Super Bowl XLI with Indianapolis in 2006","From New Orleans Louisiana — was consistently productive without being flashy"] },
  { player:"Ray Lewis", sport:"🏈 NFL", answer:"RAY LEWIS", era:"modern", stats:{DPOY:"2",SB_MVP:"2001",TACKLES:"2000+",RINGS:"2"}, ctx:"Career Totals — Two Defensive Player of Year awards and two Super Bowl rings", clues:["Won 2 Defensive Player of Year awards and 2 Super Bowls — 35 years apart","Was the Super Bowl XXXV MVP in 2001 with the Baltimore Ravens","Was involved in a controversial altercation after Super Bowl XXXIV that followed him throughout his career","From Bartow Florida — his pre-game dance became one of the most iconic rituals in football"] },
  { player:"Terrell Owens", sport:"🏈 NFL", answer:"TERRELL OWENS", era:"modern", stats:{YARDS:"15934",TD:"153",DRAMA:"Constant",RINGS:"0"}, ctx:"Career Totals — 15934 yards and 153 TDs but constant drama and no ring", clues:["Had 15,934 career receiving yards — second most in NFL history at retirement","Was one of the most polarizing figures in NFL history due to off-field controversies","Scored a touchdown and then celebrated on the Dallas Cowboys star at midfield in 2000","From Alexander City Alabama — nicknamed T.O."] },
  { player:"Larry Fitzgerald", sport:"🏈 NFL", answer:"LARRY FITZGERALD", era:"modern", stats:{YARDS:"17492",RECEPTIONS:"1432",SB:"Run 2009",RINGS:"0"}, ctx:"Career Totals — Most receptions by a wide receiver and heroic Super Bowl run", clues:["Had the most receptions of any wide receiver in NFL history","Had a legendary Super Bowl XLIII run with 2 touchdowns before losing to the Steelers in the final seconds","Played his entire career with the Arizona Cardinals — one of the most loyal stars in NFL history","From Minneapolis Minnesota — his father Larry Fitzgerald Sr. is a sportswriter"] },
  { player:"Steve Smith Sr", sport:"🏈 NFL", answer:"STEVE SMITH SR", era:"modern", stats:{YARDS:"14731",RINGS:"0",GRIT:"Relentless",HEIGHT:"5ft9"}, ctx:"Career Totals — 5ft 9in receiver who dominated with grit over 16 seasons", clues:["At 5ft 9in was considered too small to be a great receiver yet had 14,731 career yards","Was known for his fiery competitive personality — once broke a teammate's nose in practice","Played 16 seasons and was remarkably durable for a player his size","From Los Angeles California — went undrafted multiple times before making a roster"] },
  { player:"Troy Polamalu", sport:"🏈 NFL", answer:"TROY POLAMALU", era:"modern", stats:{DPOY:"2010",RINGS:"2",HAIR:"Insured for 1M",INT:"32"}, ctx:"Career Totals — Two rings and the most famous hair in NFL history", clues:["Had his hair insured for 1 million dollars by Head and Shoulders in a famous ad campaign","Won 2 Super Bowls with the Pittsburgh Steelers and the 2010 Defensive Player of the Year","Was known for his instinctive unpredictable playing style that confused quarterbacks","From Garden Grove California of Samoan descent"] },

  // HARD Football Legends (need 3 more)
  { player:"Jim Brown Legends", sport:"🏈 NFL", answer:"JIM BROWN_2", era:"legends", stats:{AVG:"5.2",RUSH_TITLE:"8",NEVER_MISSED:"Never",RETIRED:"29"}, ctx:"Career Totals — Never missed a game and retired at the peak of his powers at 29", clues:["Never missed a single NFL game in his entire 9-year career","Retired at age 29 at the absolute peak of his powers to pursue an acting career","Won 8 rushing titles and averaged 5.2 yards per carry for his entire career","From St. Simons Island Georgia — was also an All-American lacrosse player at Syracuse"] },
  { player:"Gale Sayers Legends", sport:"🏈 NFL", answer:"GALE SAYERS", era:"legends", stats:{AVG:"5.0",ROOKIE:"6 TDs one game",CAREER:"Short",FRIENDSHIP:"Brian Piccolo"}, ctx:"Career Totals — The most gifted runner ever cut down by injury", clues:["Scored 6 touchdowns in a single game as a rookie — the most in one game ever","Was considered by many to have had the most natural running ability ever seen","His friendship with teammate Brian Piccolo who died of cancer was made into the film Brian's Song","From Wichita Kansas — had his career cut short by devastating knee injuries"] },
  { player:"Dick Butkus Legends", sport:"🏈 NFL", answer:"DICK BUTKUS", era:"legends", stats:{DPOY:"2",FUMBLES:"Recovered 22",FEAR:"Maximum",TEAM:"Chicago Bears"}, ctx:"Career Totals — The most feared linebacker in NFL history", clues:["Is considered by many the most physically intimidating player in NFL history","Recovered 22 fumbles in his career — an NFL record that stood for decades","Won 2 Defensive Player of the Year awards with the Chicago Bears","From Chicago Illinois — was so feared that opposing players would deliberately avoid running near him"] },

  // HARD Soccer Classic (need 7 more)
  { player:"Michel Platini Classic", sport:"⚽ Soccer", answer:"MICHEL PLATINI CLASSIC", era:"classic", stats:{BALLON:"3",EURO:"1984",GOALS:"9 in tournament",ADMIN:"FIFA controversial"}, ctx:"Career Totals — Three Ballons d Or and 9 goals at Euro 1984", clues:["Won 3 consecutive Ballon d Or awards from 1983 to 1985","Scored 9 goals at Euro 1984 — the most ever in a single European Championship tournament","Later became FIFA Vice President but was banned from football due to an ethics violation","From Joeuf in the Meurthe-et-Moselle region of France"] },
  { player:"Karl-Heinz Rummenigge Classic", sport:"⚽ Soccer", answer:"RUMMENIGGE CLASSIC_2", era:"classic", stats:{BALLON:"2",CONSECUTIVE:"1980-81",GERMANY:"WC Final 1982",CLUB:"Bayern Munich"}, ctx:"Career Totals — Won Ballon d Or twice and led Germany to World Cup Final", clues:["Won 2 consecutive Ballon d Or awards in 1980 and 1981","Led West Germany to the World Cup Final in 1982 despite being injured","Played his entire club career with Bayern Munich winning multiple Bundesliga titles","From Lippe Germany — later became the long-serving CEO of Bayern Munich"] },
  { player:"Zico Classic", sport:"⚽ Soccer", answer:"ZICO CLASSIC", era:"classic", stats:{G:"52",NATION:"Brazil",FREE_KICK:"Master",BALLON:"Runner up"}, ctx:"Career Totals — The White Pele who led Brazil through the 1970s and 80s", clues:["Was nicknamed The White Pele for his extraordinary skill and goal-scoring ability","Led Brazil's most entertaining World Cup teams in 1982 and 1986 — neither won the trophy","Scored 52 goals in 71 appearances for Brazil — a remarkable ratio","From Rio de Janeiro Brazil — later became a successful coach in Japan"] },
  { player:"Marco van Basten Classic2", sport:"⚽ Soccer", answer:"VAN BASTEN CLASSIC", era:"classic", stats:{BALLON:"3",EURO:"1988 volley",ANKLE:"Career ending at 28",TEAM:"AC Milan"}, ctx:"Career Totals — Three Ballons d Or before his ankle ended his career at 28", clues:["Won 3 Ballon d Or awards and had his career destroyed by a chronic ankle injury at just 28","Scored what many consider the greatest goal in European Championship history — a stunning volley in the 1988 final","Won 3 Serie A titles and 2 European Cups with AC Milan","From Utrecht Netherlands — coached the Dutch national team after retirement"] },
  { player:"Ruud Gullit Classic", sport:"⚽ Soccer", answer:"RUUD GULLIT CLASSIC", era:"classic", stats:{BALLON:"1987",EURO:"1988",MILAN:"Dynasty",DREADLOCKS:"Famous"}, ctx:"Career Totals — Ballon d Or winner and heart of the Dutch golden generation", clues:["Won the Ballon d Or in 1987 and the European Championship with the Netherlands in 1988","Was the creative force alongside Van Basten and Rijkaard in the great AC Milan side","Was the first Black player to win the Ballon d Or","Dedicated his 1987 Ballon d Or to Nelson Mandela who was still imprisoned at the time"] },
  { player:"Frank Rijkaard Classic", sport:"⚽ Soccer", answer:"FRANK RIJKAARD CLASSIC", era:"classic", stats:{UCL:"2",EURO:"1988",MILAN:"Dynasty",SPIT:"Famous incident"}, ctx:"Career Totals — Won two European Cups and the European Championship", clues:["Won 2 European Cups with AC Milan alongside Van Basten and Gullit","Won the European Championship with the Netherlands in 1988","Was involved in a famous spitting incident with Rudi Voller at the 1990 World Cup","From Amsterdam Netherlands — later successfully managed Barcelona to 2 La Liga titles"] },
  { player:"George Best Classic", sport:"⚽ Soccer", answer:"GEORGE BEST CLASSIC", era:"classic", stats:{BALLON:"1968",GOALS:"137",BOOTS:"Beatles of football",TEAM:"Manchester United"}, ctx:"Career Totals — 1968 Ballon d Or and the fifth Beatle at Old Trafford", clues:["Won the Ballon d Or in 1968 and was nicknamed the Fifth Beatle for his celebrity status","Scored 137 goals in 361 appearances for Manchester United","Famously said he spent most of his money on birds booze and fast cars — the rest he wasted","From Belfast Northern Ireland — struggled with alcoholism which cut short his peak years"] },

  // HARD Soccer Legends (need 13 more)
  { player:"Eusebio Legends", sport:"⚽ Soccer", answer:"EUSEBIO 2", era:"legends", stats:{G:"9",WC:"1966 bronze",BALLON:"1965",NATION:"Mozambique-Portugal"}, ctx:"Career Totals", clues:["Won the Ballon d Or in 1965 and the Golden Boot at the 1966 World Cup with 9 goals","Led Portugal to third place at the 1966 World Cup — still their best ever finish","From Lourenco Marques Mozambique — represented Portugal in an era when colonial ties allowed this","Was nicknamed The Black Panther and is considered the greatest Portuguese player before Ronaldo"] },
  { player:"Ferenc Puskas Legends", sport:"⚽ Soccer", answer:"PUSKAS_2", era:"legends", stats:{G:"84",RATIO:"Hungary 83 in 84",WC:"1954 Final",DEFECTED:"1956"}, ctx:"Career Totals — Scored 84 goals in 85 games for Hungary before defecting", clues:["Scored 84 goals in 85 international appearances — one of the highest ratios ever","Defected from Hungary after the 1956 revolution and later played for Spain","Was the main forward in the legendary Hungarian team that lost the 1954 World Cup Final as heavy favorites","The UEFA Goal of the Year award is named the Puskas Award in his honor"] },
  { player:"Alfredo di Stefano Legends", sport:"⚽ Soccer", answer:"DI STEFANO_2", era:"legends", stats:{UCL:"5",BALLON:"2",SPAIN:"Chose over Argentina",KIDNAPPED:"1963"}, ctx:"Career Totals — Five European Cups and the most complete player of his era", clues:["Won 5 consecutive European Cups with Real Madrid — the most dominant run in the competition's history","Won 2 Ballon d Or awards and was considered the most complete player of his era","Was kidnapped by Venezuelan guerrillas in 1963 during a club tour — released unharmed","Born in Buenos Aires Argentina but later represented Spain in internationals"] },
  { player:"Just Fontaine Legends", sport:"⚽ Soccer", answer:"JUST FONTAINE 2", era:"legends", stats:{G:"13",WC:"1958",GAMES:"6",RECORD:"Unbreakable"}, ctx:"1958 World Cup", clues:["Scored 13 goals in 6 World Cup games in 1958 — the all-time record and considered unbreakable","France finished third at the 1958 World Cup","Only appeared in one World Cup in his entire career — injuries limited him","From Marrakech Morocco — represented France after moving there as a child"] },
  { player:"George Weah Legends", sport:"⚽ Soccer", answer:"GEORGE WEAH", era:"legends", stats:{BALLON:"1995",LIBERIA:"President",FIRST:"African Ballon",SELF_MADE:"Yes"}, ctx:"Career Totals — First African Ballon d Or winner who became President of Liberia", clues:["Won the Ballon d Or in 1995 — the first African player to win it","Became the President of Liberia after his football career ended","Was entirely self-taught as there were no youth academies in Liberia when he grew up","Chelsea were a mid-table London club before major investment transformed them"] },
  { player:"Roger Milla Legends", sport:"⚽ Soccer", answer:"ROGER MILLA", era:"legends", stats:{AGE:"42",WC:"1994",DANCE:"Corner flag",NATION:"Cameroon"}, ctx:"Career Totals — Scored at the World Cup at age 42 and invented the corner flag dance", clues:["Scored at the 1994 World Cup at age 42 — the oldest player ever to score in a World Cup","Invented the iconic corner flag celebration dance at the 1990 World Cup","Led Cameroon to the World Cup quarterfinals in 1990 — a giant-killing run that shocked the world","From Yaounde Cameroon — came out of retirement at the request of the Cameroonian president"] },
  { player:"Carlos Alberto Legends", sport:"⚽ Soccer", answer:"CARLOS ALBERTO 2", era:"legends", stats:{G:"1",WC:"1970 final goal",CAPTAIN:"Brazil",GREATEST_GOAL:"Yes"}, ctx:"1970 World Cup Final", clues:["Scored the fourth goal in the 1970 World Cup Final — considered possibly the greatest team goal ever","Was the captain of the legendary 1970 Brazil team","The goal came after a move involving virtually every outfield player","From Rio de Janeiro Brazil — played for Santos alongside Pele"] },
  { player:"Didi Legends", sport:"⚽ Soccer", answer:"DIDI SOCCER", era:"legends", stats:{WC:"2",FREE_KICK:"Banana shot",BRAZIL:"1950s brain",PICK:"Key man"}, ctx:"Career Totals — Won two World Cups as the brain of Brazil in the 1950s", clues:["Won 2 World Cups with Brazil in 1958 and 1962 as the playmaker and brain of the team","Was credited with inventing the swerving banana free kick","Was nicknamed The Black Arrow and O Principe Eterno — The Eternal Prince","From Rio de Janeiro Brazil — his partnership with Garrincha and Pele was devastating"] },
  { player:"Rene Higuita Legends", sport:"⚽ Soccer", answer:"RENE HIGUITA", era:"legends", stats:{SAVE:"Scorpion kick",NATION:"Colombia",DRIBBLES:"Outside box",JAIL:"Brief"}, ctx:"Career Totals — The Scorpion Kick goalkeeper who dribbled out of his own box", clues:["Made the famous Scorpion Kick save against England at Wembley in 1995 — caught the ball with his heels","Regularly dribbled the ball out of his own penalty area — a goalkeeper playing like an outfield player","Was briefly jailed in Colombia in a case involving Pablo Escobar","From Medellin Colombia — was one of the most unconventional goalkeepers ever"] },
  { player:"Socrates Legends", sport:"⚽ Soccer", answer:"SOCRATES SOCCER", era:"legends", stats:{G:"25",DOCTOR:"Medical degree",DEMOCRACY:"Captain ran it",CORINTHIANS:"Socialism"}, ctx:"Career Totals — Doctor and philosopher who led a socialist football cooperative", clues:["Was a qualified medical doctor who continued to practice medicine during his football career","Led the Corinthians Democracy — a socialist cooperative where all club decisions were voted on equally by players and staff","Smoked cigarettes and drank heavily throughout his career while still being world-class","From Santos Sao Paulo Brazil — named after the ancient Greek philosopher"] },
  { player:"Ladislao Kubala Legends", sport:"⚽ Soccer", answer:"LADISLAO KUBALA", era:"legends", stats:{NATION:"3 countries",BARCELONA:"Legend",ESCAPE:"Iron Curtain",STATUES:"Two"}, ctx:"Career Totals — Represented three different countries and escaped the Iron Curtain", clues:["Represented Hungary Czechoslovakia and Spain in international football — three different nations","Escaped from behind the Iron Curtain to play in Spain for Barcelona","Was so important to Barcelona that they built a statue of him outside the Nou Camp","Was the player who convinced Joan Gamper's Barcelona to sign other foreign players — transforming the club"] },
  { player:"Florian Albert Legends", sport:"⚽ Soccer", answer:"FLORIAN ALBERT 2", era:"legends", stats:{BALLON:"1967",NATION:"Hungary",GOALS:"31",NICK:"Emperor"}, ctx:"Career Totals", clues:["Won the Ballon d Or in 1967 — the only Hungarian player to win it after the Golden Team era ended","Nicknamed The Emperor for his regal style and composure","Scored 31 goals in 75 appearances for Hungary","From Hercegszanto Hungary — played his entire club career for Ferencvaros"] },
  { player:"Amancio Amaro Legends", sport:"⚽ Soccer", answer:"AMANCIO AMARO", era:"legends", stats:{UCL:"2",LA_LIGA:"8",SPAIN:"42 goals",REAL_MADRID:"Legend"}, ctx:"Career Totals — Won two European Cups as part of the second Real Madrid dynasty", clues:["Won 2 European Cups and 8 La Liga titles with Real Madrid in the late 1960s and early 1970s","Scored 42 goals in 42 appearances for the Spanish national team","Was considered the best Spanish player of his generation","From La Coruna Galicia Spain — partnered with Pirri and Gento in midfield"] },

  // HARD Hockey Classic (need 11 more)
  { player:"Gordie Howe Classic", sport:"🏒 NHL", answer:"GORDIE HOWE CLASSIC", era:"classic", stats:{GOALS:"801",SEASONS:"32",AGE:"52",NICK:"Mr Hockey"}, ctx:"Career Totals — Mr Hockey played professional hockey until age 52", clues:["Played professional hockey until age 52 — across five different decades","Scored 801 career goals — was the all-time leader until Wayne Gretzky","Was nicknamed Mr Hockey and had the most complete game in NHL history","From Floral Saskatchewan — was so dangerous with elbows and fists that Gordie Howe Hat Tricks were named after him"] },
  { player:"Bobby Hull Classic", sport:"🏒 NHL", answer:"BOBBY HULL CLASSIC", era:"classic", stats:{GOALS:"610",SLAPSHOT:"118mph",ABA:"Jumped to",NICK:"Golden Jet"}, ctx:"Career Totals — The Golden Jet who jumped to the WHA for 2.75 million dollars", clues:["Became the first hockey player to sign for over 2 million dollars when he jumped to the WHA Winnipeg Jets","Had the fastest slapshot in hockey at approximately 118mph — revolutionary for his era","Nicknamed The Golden Jet for his blond hair and skating speed","Won 2 Stanley Cups with the Chicago Blackhawks — son Brett Hull also became a Hall of Famer"] },
  { player:"Bobby Orr Classic", sport:"🏒 NHL", answer:"BOBBY ORR CLASSIC", era:"classic", stats:{NORRIS:"8",CUPS:"2",ASSISTS:"102 in one season",KNEES:"Ended career early"}, ctx:"Career Totals — Revolutionized defense and won 8 straight Norris Trophies", clues:["Won 8 consecutive Norris Trophies as the league's best defenseman","Set a record with 102 assists in a single season — as a defenseman","Had his career cut short by severe knee injuries that required multiple surgeries","From Parry Sound Ontario — signed a record contract at age 18 that changed player negotiations forever"] },
  { player:"Phil Esposito Classic", sport:"🏒 NHL", answer:"PHIL ESPOSITO CLASSIC", era:"classic", stats:{GOALS:"76",RECORD:"1970-71",CUPS:"2",SUMMIT:"1972"}, ctx:"Career Totals — Scored 76 goals in a season and starred in the 1972 Summit Series", clues:["Scored 76 goals in 1970-71 — a record that stood for a decade until Gretzky","Delivered a famous emotional speech to Canada during the 1972 Summit Series after boos from the crowd","Won 2 Stanley Cups with the Boston Bruins","From Sault Ste Marie Ontario — his brother Tony Esposito also became a Hall of Fame goaltender"] },
  { player:"Borje Salming Classic", sport:"🏒 NHL", answer:"BORJE SALMING CLASSIC", era:"classic", stats:{GAMES:"1148",NATION:"Sweden",FIRST:"European pioneer",TOUGH:"Took slash healed played"}, ctx:"Career Totals — Pioneer Swedish defenceman who proved Europeans could play in the NHL", clues:["Was the pioneer who proved that European players could survive and thrive in the physical NHL","Played 1,148 games for the Toronto Maple Leafs — mostly as a first-pairing defenseman","Continued to play after a skate blade slashed his face requiring 300 stitches","From Kiruna Sweden — opened the door for the wave of Scandinavian players that followed"] },
  { player:"Marcel Dionne Classic", sport:"🏒 NHL", answer:"MARCEL DIONNE CLASSIC", era:"classic", stats:{GOALS:"731",ART_ROSS:"1",CUPS:"0",CENTERS:"Third all time"}, ctx:"Career Totals — Third most goals ever but never won a Stanley Cup", clues:["Scored 731 career goals — third most in NHL history","Was stuck on mediocre Los Angeles Kings teams for most of his career and never won the Stanley Cup","Won the Art Ross Trophy as the NHL scoring leader in 1980","From Drummondville Quebec — was traded from the Detroit Red Wings in a controversial deal"] },
  { player:"Stan Mikita Classic", sport:"🏒 NHL", answer:"STAN MIKITA CLASSIC", era:"classic", stats:{CUPS:"2",HART:"2",ROSS:"4",EVOLUTION:"From goon to gentleman"}, ctx:"Career Totals — Won Hart Trophy in consecutive years after changing his style", clues:["Won the Hart Trophy in consecutive years 1967 and 1968 after deliberately changing from a dirty player to a clean one","Won the Art Ross Trophy as leading scorer 4 times","Won 2 Stanley Cups with the Chicago Blackhawks","From Sokolce Slovakia — was adopted by Canadian relatives and moved to Canada as a child"] },
  { player:"Henri Richard Classic", sport:"🏒 NHL", answer:"HENRI RICHARD CLASSIC", era:"classic", stats:{CUPS:"11",NICK:"Pocket Rocket",BROTHER:"Maurice Richard",CANADIENS:"Life"}, ctx:"Career Totals", clues:["Won 11 Stanley Cups — the most of any player in the history of the NHL","Nicknamed The Pocket Rocket as the smaller brother of Maurice The Rocket Richard","Played his entire career with the Montreal Canadiens","From Montreal Quebec — was often overshadowed by his famous brother but won more championships than anyone"] },
  { player:"Mike Bossy Classic", sport:"🏒 NHL", answer:"MIKE BOSSY CLASSIC", era:"classic", stats:{GOALS:"573",STREAK:"9 seasons 50+ goals",CUPS:"4",RATIO:"0.76 per game"}, ctx:"Career Totals — Only player to score 50+ goals in each of his first 9 seasons", clues:["Scored 50 or more goals in each of his first 9 NHL seasons — an all-time record","Had the second-highest goals-per-game ratio in NHL history at 0.76","Won 4 Stanley Cups with the New York Islanders dynasty","From Montreal Quebec — was passed over in the draft until the 15th round due to concerns about his defensive play"] },
  { player:"Yvan Cournoyer Classic", sport:"🏒 NHL", answer:"YVAN COURNOYER CLASSIC", era:"classic", stats:{CUPS:"10",CONN_SMYTHE:"1973",NICK:"Roadrunner",SPEED:"Fastest of era"}, ctx:"Career Totals — Won 10 Stanley Cups and was the fastest skater of his era", clues:["Won 10 Stanley Cups with the Montreal Canadiens — second most all-time","Won the Conn Smythe Trophy as playoff MVP in 1973","Nicknamed The Roadrunner for his extraordinary skating speed","From Drummondville Quebec — scored the winning goal in Game 8 of the 1972 Summit Series"] },
  { player:"Ken Dryden Classic", sport:"🏒 NHL", answer:"KEN DRYDEN CLASSIC", era:"classic", stats:{CUPS:"6",VEZINA:"5",RETIRE:"Age 31",LAWYER:"Cornell"}, ctx:"Career Totals — Six Cups and five Vezinas before retiring at 31 to practice law", clues:["Won 6 Stanley Cups and 5 Vezina Trophies in just 8 NHL seasons","Retired at age 31 to practice law — leaving the game at the height of his powers","Was a Cornell University graduate who passed the bar exam during his hockey career","From Hamilton Ontario — won the Conn Smythe Trophy as a rookie before winning the Calder as a second-year player"] },

  // HARD Hockey Legends (need 9 more)
  { player:"Howie Morenz Legends", sport:"🏒 NHL", answer:"HOWIE MORENZ 2", era:"legends", stats:{HART:"3",GOALS:"270",GREATEST:"His era",ERA:"1920s-30s"}, ctx:"Career Totals — Three Hart Trophies and the greatest player of his era", clues:["Won 3 Hart Trophies and was considered the greatest player in hockey in the 1920s and early 1930s","Played with such intensity that Conn Smythe said he was the greatest player who ever lived","Died tragically from complications of a broken leg suffered during a game in 1937 at age 34","From Mitchell Ontario — his funeral was held at centre ice of the Montreal Forum"] },
  { player:"Bill Durnan Legends", sport:"🏒 NHL", answer:"BILL DURNAN", era:"legends", stats:{VEZINA:"6",GAA:"2.36",AMBIDEXTROUS:"Both hands",CUPS:"2"}, ctx:"Career Totals", clues:["Won the Vezina Trophy in 6 of his 7 NHL seasons — an astonishing ratio","Was completely ambidextrous and could catch the puck with either hand — unprecedented","Won 2 Stanley Cups with the Montreal Canadiens","From Toronto Ontario — retired at 34 citing the intense pressure of playing goal"] },
  { player:"Newsy Lalonde Legends", sport:"🏒 NHL", answer:"NEWSY LALONDE 2", era:"legends", stats:{GOALS:"124",LACROSSE:"Also pro",SCORING:"Multiple titles",NICK:"Newsy"}, ctx:"Career Totals — Was a professional in both hockey and lacrosse simultaneously", clues:["Was one of the last players to compete professionally in both hockey and lacrosse at the same time","Led the NHL in scoring multiple times","Was nicknamed Newsy because he worked at a newsprint factory as a young man","From Cornwall Ontario — played for multiple teams including the Montreal Canadiens"] },
  { player:"Sprague Cleghorn Legends", sport:"🏒 NHL", answer:"SPRAGUE CLEGHORN_2", era:"legends", stats:{CUPS:"3",BRUTAL:"Most feared",ERA:"1910s-1920s",SUSPENDED:"Multiple times"}, ctx:"Career Totals — The most feared and brutal player of the early NHL", clues:["Was considered the most brutal and feared player in the early years of professional hockey","Was suspended multiple times for deliberate violent acts on opponents","Won 3 Stanley Cups despite his reputation for dirty play","From Montreal Quebec — his brother Odie Cleghorn also played in the early NHL"] },
  { player:"Eddie Shore Legends", sport:"🏒 NHL", answer:"EDDIE SHORE", era:"legends", stats:{HART:"4",CUPS:"2",DIRTY:"Controversial",LEGEND:"Boston icon"}, ctx:"Career Totals — Won four Hart Trophies as the most dominant defenseman of his era", clues:["Won 4 Hart Trophies — the most by a defenseman in NHL history","Was the most dominant player of his era but also one of the most controversial for his violent play","Once caused a serious injury to Ace Bailey that nearly ended another player's life","From Fort Qu'Appelle Saskatchewan — drove through a blizzard solo to not miss a game in one famous story"] },
  { player:"Dit Clapper Legends", sport:"🏒 NHL", answer:"DIT CLAPPER 3", era:"legends", stats:{SEASONS:"20",CUPS:"3",POSITION:"Forward and defense",FIRST:"20-year career"}, ctx:"Career Totals — First NHL player to play 20 seasons all with the Bruins", clues:["Was the first player in NHL history to play 20 seasons in the league","Was so versatile he was an All-Star at both forward and defenseman in different seasons","Won 3 Stanley Cups with the Boston Bruins","From Newmarket Ontario — had his number 5 retired by the Bruins"] },
  { player:"George Hainsworth Legends", sport:"🏒 NHL", answer:"GEORGE HAINSWORTH", era:"legends", stats:{SHUTOUTS:"94",GAA:"1.91",VEZINA:"3",ERA:"1920s-30s"}, ctx:"Career Totals — 94 shutouts including 22 in a single season", clues:["Had 94 career shutouts — the third most in NHL history","Posted 22 shutouts in a single season — still the all-time record","Won 3 Vezina Trophies with the Montreal Canadiens","From Gravenhurst Ontario — played in an era before the forward pass was allowed which boosted scoring"] },
  { player:"Frank Brimsek Legends", sport:"🏒 NHL", answer:"FRANK BRIMSEK", era:"legends", stats:{NICK:"Mr Zero",SHUTOUTS:"40",CUPS:"2",ROY:"First Calder"}, ctx:"Career Totals — Mr Zero won Calder and Vezina in his first NHL season", clues:["Won both the Calder Trophy as Rookie of the Year and the Vezina Trophy in his first season — unprecedented","Nicknamed Mr Zero for his extraordinary shutout ability","Won 2 Stanley Cups with the Boston Bruins in 1939 and 1941","From Eveleth Minnesota — one of the very few American-born stars of his era"] },
  { player:"Busher Jackson Legends", sport:"🏒 NHL", answer:"BUSHER JACKSON", era:"legends", stats:{SCORING:"Title 1932",KID_LINE:"With Primeau and Conacher",CUPS:"1",PERSONAL:"Troubled"}, ctx:"Career Totals — Led the NHL in scoring as part of the famous Kid Line", clues:["Won the NHL scoring title in 1932 as part of the famous Kid Line with Charlie Conacher and Joe Primeau","The Kid Line was considered the greatest line in hockey through the early 1930s","Won the Stanley Cup with the Toronto Maple Leafs in 1932","Had his Hall of Fame induction delayed due to personal troubles with alcohol"] },

  // HARD Football Classic (need 4 more)
  { player:"John Elway Classic", sport:"🏈 NFL", answer:"JOHN ELWAY CLASSIC", era:"classic", stats:{SB:"2 late career",COMEBACKS:"47 4th quarter",PICK:"1st overall",MVP:"Super Bowl XXXIII"}, ctx:"Career Totals — Won back-to-back Super Bowls at the end of his career", clues:["Won back-to-back Super Bowls in his final two seasons — a storybook ending","Led 47 fourth-quarter comeback victories in his career — the most in NFL history at the time","Was the 1st overall pick in the 1983 NFL Draft — chosen by Baltimore but refused to play there","From Port Angeles Washington — also played minor league baseball for the New York Yankees system"] },
  { player:"Dan Marino Classic", sport:"🏈 NFL", answer:"DAN MARINO CLASSIC", era:"classic", stats:{YARDS:"61361",TD:"420",MVP:"1984",RINGS:"0"}, ctx:"Career Totals — Never won a Super Bowl despite the greatest arm in NFL history", clues:["Set virtually every NFL passing record of his era and never won a Super Bowl","Was the NFL MVP in 1984 and threw 48 touchdowns — a record that stood for 20 years","Was known for the quickest release in NFL history — able to throw the ball before the blitz arrived","From Pittsburgh Pennsylvania — played his entire career with the Miami Dolphins"] },
  { player:"Bruce Smith Classic", sport:"🏈 NFL", answer:"BRUCE SMITH CLASSIC", era:"classic", stats:{SACKS:"200",DPOY:"2",SB:"4 losses",DRAFT:"1st overall"}, ctx:"Career Totals — 200 career sacks and four Super Bowl appearances all losses", clues:["Recorded 200 career sacks — still the all-time NFL record","Went to four consecutive Super Bowls with the Buffalo Bills — all four losses","Won 2 Defensive Player of the Year awards","From Norfolk Virginia — was the 1st overall pick in the 1985 NFL Draft"] },
  { player:"Warren Moon Classic", sport:"🏈 NFL", answer:"WARREN MOON CLASSIC", era:"classic", stats:{YARDS:"70553 CFL+NFL",CFL:"Grey Cup 5",UNDRAFTED:"CFL route",BARRIER:"QB"}, ctx:"Career Totals — Had to go to the CFL first because no team would draft a Black QB", clues:["Was not drafted by any NFL team in 1978 because teams doubted a Black man could play quarterback","Went to the CFL where he won 5 consecutive Grey Cups before the NFL finally welcomed him","Accumulated over 70,000 combined passing yards in the CFL and NFL","From Los Angeles California — was a pioneer for Black quarterbacks in professional football"] },

  // HARD Soccer Modern (need 2 more)
  { player:"Cristiano Ronaldo", sport:"⚽ Soccer", answer:"CRISTIANO RONALDO", era:"modern", stats:{G:"900+",BALLON:"5",CL:"5",NATION:"Portugal"}, ctx:"Career Totals — Over 900 career goals and five Ballon d Or awards", clues:["Scored over 900 official career goals — the most in football history","Won 5 Ballon d Or awards and 5 Champions League titles","Was born on the island of Madeira and named after US President Ronald Reagan","Is the most followed person on Instagram in the world with over 600 million followers"] },
  { player:"Lionel Messi", sport:"⚽ Soccer", answer:"LIONEL MESSI", era:"modern", stats:{G:"800+",BALLON:"8",WC:"2022",NATION:"Argentina"}, ctx:"Career Totals — Eight Ballons d Or and the 2022 World Cup", clues:["Won 8 Ballon d Or awards — the most in history","Won the 2022 World Cup with Argentina — completing the only major title he was missing","Was diagnosed with a growth hormone deficiency at age 11 — FC Barcelona paid for his treatment","From Rosario Argentina — scored his famous Hand of God goal... wait that was Maradona — Messi scored the Goal of the Century style goal vs Getafe in 2007"] },

  // HARD Tennis Modern (need 10 more)
  { player:"Novak Djokovic", sport:"🎾 ATP", answer:"NOVAK DJOKOVIC", era:"modern", stats:{GRAND_SLAMS:"24+",WEEKS_NO1:"400+",AUSTRALIA:"10x",NATION:"Serbia"}, ctx:"Career Totals — Most Grand Slams ever and most weeks at World No. 1", clues:["Has won more Grand Slam titles than any player in history","Has spent more weeks at World No. 1 than any player in tennis history","Won the Australian Open a record 10 times","From Belgrade Serbia — endured difficult childhood during the Yugoslav Wars"] },
  { player:"Rafael Nadal", sport:"🎾 ATP", answer:"RAFAEL NADAL", era:"modern", stats:{FRENCH_OPEN:"14x winner",GRAND_SLAMS:"22",CLAY:"Unbeatable",NATION:"Spain"}, ctx:"Career Totals — 14 French Opens and 22 Grand Slams", clues:["Won the French Open 14 times — by far the most dominant performance at any single Grand Slam ever","Won 22 Grand Slam titles in total","Is considered the greatest clay court player in the history of the sport","From Manacor Mallorca Spain — trained under his uncle Toni Nadal throughout his career"] },
  { player:"Roger Federer", sport:"🎾 ATP", answer:"ROGER FEDERER", era:"modern", stats:{WIMBLEDON:"8x winner",GRAND_SLAMS:"20",WEEKS_NO1:"310",NATION:"Switzerland"}, ctx:"Career Totals — Eight Wimbledon titles and 20 Grand Slams", clues:["Won Wimbledon 8 times — the most of any player in the Open Era","Won 20 Grand Slam titles and spent 310 weeks at World No. 1","Is widely considered to have the most technically beautiful game in tennis history","From Basel Switzerland — his rivalry with Nadal is called the greatest in sports history"] },
  { player:"Andy Murray", sport:"🎾 ATP", answer:"ANDY MURRAY", era:"modern", stats:{GRAND_SLAMS:"3",WIMBLEDON:"2",OLYMPIC:"Gold 2x",COMEBACK:"Hip surgery"}, ctx:"Career Totals — Three Slams and two Olympic golds before and after hip surgery", clues:["Won 2 Olympic gold medals — the only player in history to win Olympic singles gold twice","Won 3 Grand Slam titles including 2 Wimbledon titles","Returned to the top level after a total hip replacement — one of sport's great comebacks","From Dunblane Scotland — witnessed the Dunblane massacre at his primary school as a child"] },
  { player:"Lleyton Hewitt", sport:"🎾 ATP", answer:"LLEYTON HEWITT2", era:"modern", stats:{GRAND_SLAMS:"2",WEEKS_NO1:"80",DAVIS_CUP:"Legend",NATION:"Australia"}, ctx:"Career Totals — World No. 1 and two Slams with extraordinary Davis Cup record", clues:["Spent 80 weeks at World No. 1 and won 2 Grand Slam titles","Was the youngest man ever to reach World No. 1 at the time","Was almost as famous for his Come On celebrations as his tennis","From Adelaide Australia — captained Australia to multiple Davis Cup finals after his playing career"] },
  { player:"Juan Martin del Potro", sport:"🎾 ATP", answer:"DEL POTRO", era:"modern", stats:{US_OPEN:"2009",BEAT:"Federer and Nadal",WRIST:"4 surgeries",NATION:"Argentina"}, ctx:"Career Totals — Beat both Federer and Nadal in a single Grand Slam to win", clues:["Beat both Roger Federer and Rafael Nadal in the same Grand Slam to win the 2009 US Open","Had 4 serious wrist surgeries that robbed him of what could have been a legendary career","Was 6ft 6in with a forehand widely considered the hardest single shot in tennis","From Tandil Argentina — was beloved for his gracious sportsmanship"] },
  { player:"Stan Wawrinka", sport:"🎾 ATP", answer:"STAN WAWRINKA_2", era:"modern", stats:{GRAND_SLAMS:"3",BACKHAND:"Best ever",BEAT:"Top players",NATION:"Switzerland"}, ctx:"Career Totals — Three Grand Slams with the best single-handed backhand ever", clues:["Won 3 Grand Slam titles — all three different majors — the French US and Australian Opens","Is considered to have the best single-handed backhand ever seen in the sport","Won all 3 of his majors by beating the world No. 1 player in the final","From Saint-Barthélemy near Lausanne Switzerland"] },
  { player:"Dominic Thiem", sport:"🎾 ATP", answer:"DOMINIC THIEM", era:"modern", stats:{US_OPEN:"2020",COMEBACK:"2 sets down",CLAY:"Specialist",NATION:"Austria"}, ctx:"Career Totals — Came back from 2 sets down to win the 2020 US Open", clues:["Won the 2020 US Open coming from 2 sets to love down in the final — only the fifth man ever","Is one of the few players who regularly challenged Nadal on clay","Won the first Grand Slam of his career in the bubble during COVID","From Wiener Neustadt Austria — his father Wolfgang is his coach"] },
  { player:"Daniil Medvedev", sport:"🎾 ATP", answer:"DANIIL MEDVEDEV", era:"modern", stats:{US_OPEN:"2021",RANK:"No 1",BEAT:"Djokovic Slam",NATION:"Russia"}, ctx:"Career Totals — US Open champion who stopped Djokovic's calendar Slam", clues:["Stopped Novak Djokovic from winning the Calendar Grand Slam at the 2021 US Open Final","Won the US Open that year for his only Grand Slam title","Spent time at World No. 1","From Moscow Russia — is known for his analytical and systematic approach to the game"] },
  { player:"Carlos Alcaraz", sport:"🎾 ATP", answer:"CARLOS ALCARAZ", era:"modern", stats:{WIMBLEDON:"2",US_OPEN:"1",YOUNGEST_NO1:"Yes",NATION:"Spain"}, ctx:"Career Totals — Became World No. 1 at 19 with Wimbledon and US Open titles", clues:["Became the youngest player in history to reach World No. 1 at age 19","Won Wimbledon twice and the US Open before his 21st birthday","Was trained from a young age by Juan Carlos Ferrero — himself a former World No. 1","From El Palmar Murcia Spain"] },

  // HARD Tennis Classic (need 3 more)
  { player:"Ivan Lendl", sport:"🎾 ATP", answer:"IVAN LENDL2", era:"classic", stats:{GRAND_SLAMS:"8",WEEKS_NO1:"270",WIMBLEDON:"0",NATION:"Czech"}, ctx:"Career Totals — 270 weeks at No. 1 and 8 Slams but never won Wimbledon", clues:["Won 8 Grand Slam titles but famously never won Wimbledon despite reaching the final twice","Spent 270 weeks at World No. 1 — one of the most dominant players ever","Was known for his robotic consistency and brutal preparation routines","From Ostrava Czechoslovakia — later coached Andy Murray to break British tennis drought"] },
  { player:"Bjorn Borg", sport:"🎾 ATP", answer:"BJORN BORG_2", era:"classic", stats:{WIMBLEDON:"5 consecutive",FRENCH_OPEN:"6",GRAND_SLAMS:"11",RETIRED:"26"}, ctx:"Career Totals — Five consecutive Wimbledons and six French Opens then retired at 26", clues:["Won 5 consecutive Wimbledon titles and 6 French Opens — an extraordinary combined dominance","Won 11 Grand Slam titles before retiring at just 26 at the peak of his powers","Was so dominant that his rivals McEnroe and Connors were only able to beat him in the US Open","From Sodertalje Sweden — his rivalry with John McEnroe produced some of the greatest matches ever"] },
  { player:"John McEnroe", sport:"🎾 ATP", answer:"JOHN MCENROE_2", era:"classic", stats:{GRAND_SLAMS:"7",WIMBLEDON:"3",OUTBURSTS:"You cannot be serious",NATION:"USA"}, ctx:"Career Totals — Seven Slams with the most famous outburst in tennis history", clues:["Is responsible for the most famous quote in tennis history — You cannot be serious at Wimbledon","Won 7 Grand Slam titles and is considered to have had the best serve-and-volley game ever","Was notorious for arguing with chair umpires but his tennis was equally brilliant","From Wiesbaden West Germany but represented the United States — grew up in Queens New York"] },

  // HARD Tennis Legends (need 9 more)
  { player:"Pancho Gonzales", sport:"🎾 ATP", answer:"PANCHO GONZALES 3", era:"legends", stats:{PRO:"Dominated 8 years",SERVE:"Fastest era",GRAND_SLAMS:"2",NATION:"USA"}, ctx:"Career Totals — Dominated professional tennis for a decade after being denied amateur play", clues:["Dominated professional tennis for nearly a decade after turning pro — was essentially unbeatable","Won only 2 Grand Slam titles but was denied more by the professional/amateur divide","Had the fastest and most feared serve of his era","From Los Angeles California of Mexican descent — overcame poverty and racial barriers to reach the top"] },
  { player:"Ken Rosewall Legends", sport:"🎾 ATP", answer:"KEN ROSEWALL_2", era:"legends", stats:{GRAND_SLAMS:"8",SPAN:"1953-1972",NICK:"Muscles",AGE:"39 finalist"}, ctx:"Career Totals — Won Grand Slams in three different decades spanning 19 years", clues:["Won his first Grand Slam in 1953 and his last in 1972 — 19 years apart across three decades","Reached the Wimbledon final at age 39 — one of the most extraordinary feats in the sport","Was nicknamed Muscles despite weighing only 150 pounds","From Sydney Australia — was considered technically perfect"] },
  { player:"Rod Laver Legends", sport:"🎾 ATP", answer:"ROD LAVER 2", era:"legends", stats:{CALENDAR_SLAM:"2",GRAND_SLAMS:"11",OPEN_ERA:"Dominant",ROCKET:"Nickname"}, ctx:"Career Totals", clues:["Is the only player in history to win the Calendar Grand Slam twice — 1962 and 1969","Won 11 Grand Slam titles in the Open Era alone","Was banned from Wimbledon for years because he had turned professional","From Rockhampton Queensland Australia — the ATP Finals arena Rod Laver Arena bears his name"] },
  { player:"Roy Emerson Legends", sport:"🎾 ATP", answer:"ROY EMERSON_2", era:"legends", stats:{GRAND_SLAMS:"12",AUS_OPEN:"6x",FITNESS:"Best ever",NATION:"Australia"}, ctx:"Career Totals — 12 Grand Slams and extraordinary fitness", clues:["Won 12 Grand Slam titles — the most in history before Pete Sampras","Was so physically fit that opponents said it was exhausting just watching him train","Won the Australian Open 6 times","From Blackbutt Queensland Australia — held the Grand Slam singles record for over 30 years"] },
  { player:"Margaret Court Legends", sport:"🎾 WTA", answer:"MARGARET COURT 2", era:"legends", stats:{GRAND_SLAMS:"24",CALENDAR_SLAM:"1970",AUS_OPEN:"11x",TOTAL:"Most ever"}, ctx:"Career Totals — 24 Grand Slams — the most in tennis history", clues:["Won 24 Grand Slam singles titles — the most in history by any player male or female","Won the Calendar Grand Slam in 1970 — all four major titles in one calendar year","Won the Australian Open 11 times","From Albury New South Wales Australia — born Margaret Smith"] },
  { player:"Billie Jean King Legends", sport:"🎾 WTA", answer:"BILLIE JEAN KING 2", era:"legends", stats:{GRAND_SLAMS:"39",BATTLE:"Bobby Riggs",WIMBLEDON:"6",EQUAL_PAY:"Pioneer"}, ctx:"Career Totals — 39 Grand Slams and the Battle of the Sexes", clues:["Won 39 Grand Slam titles across singles doubles and mixed combined","Defeated Bobby Riggs 6-4 6-3 6-3 in the famous Battle of the Sexes match in 1973","Was the driving force behind equal prize money at Grand Slam events","From Long Beach California — Wimbledon's main show court is named after her"] },
  { player:"Althea Gibson Legends", sport:"🎾 WTA", answer:"ALTHEA GIBSON_2", era:"legends", stats:{GRAND_SLAMS:"5",FIRST:"Black Grand Slam winner",WIMBLEDON:"2",BARRIER:"Historic"}, ctx:"Career Totals — First Black player to win a Grand Slam title", clues:["Was the first Black player to win a Grand Slam singles title in 1956","Won 5 Grand Slam titles and was ranked World No. 1","Overcame enormous racial barriers in a segregated era of American tennis","From Clarendon County South Carolina — her success opened the door for Arthur Ashe and generations of Black players"] },
  { player:"Chris Evert Legends", sport:"🎾 WTA", answer:"CHRIS EVERT 2", era:"classic", stats:{GRAND_SLAMS:"18",FRENCH_OPEN:"7",WIN_PCT:".900",RIVAL:"Navratilova"}, ctx:"Career Totals — 18 Grand Slams and a .900 career win percentage", clues:["Had a career win percentage of .900 — the highest of any professional tennis player in history","Won 18 Grand Slam titles including a record 7 French Opens","Her rivalry with Martina Navratilova is considered the greatest in women's tennis history","From Fort Lauderdale Florida — popularized the two-handed backhand in women's tennis"] },
  { player:"Martina Navratilova Legends", sport:"🎾 WTA", answer:"MARTINA NAVRATILOVA 2", era:"classic", stats:{WIMBLEDON:"9",GRAND_SLAMS:"18",FITNESS:"Revolutionary",DEFECTED:"1975"}, ctx:"Career Totals — Nine Wimbledon titles and revolutionary fitness standards", clues:["Won Wimbledon 9 times — the most of any player in the Open Era","Won 18 Grand Slam singles titles and revolutionized fitness and training in women's tennis","Defected from Czechoslovakia to the United States at age 18","From Prague Czechoslovakia — her rivalry with Chris Evert is the greatest in women's tennis history"] },

  // HARD Golf Classic (need 13 more)
  { player:"Jack Nicklaus Classic", sport:"⛳ Golf", answer:"JACK NICKLAUS CLASSIC", era:"classic", stats:{MAJORS:"18",RUNNER_UP:"19",MASTERS:"6",BEAR:"Golden Bear"}, ctx:"Career Totals — 18 majors the most ever and 19 runner-up finishes", clues:["Won 18 major championships — the most in history","Had 19 major runner-up finishes — meaning he was in contention at 37 different majors","Won The Masters 6 times — still the record","From Columbus Ohio — nicknamed The Golden Bear"] },
  { player:"Arnold Palmer Classic", sport:"⛳ Golf", answer:"ARNOLD PALMER CLASSIC", era:"classic", stats:{MAJORS:"7",ARMY:"Arnie's Army",FIRST_MILLION:"TV golf",POPULAR:"Made golf"}, ctx:"Career Totals — The man who made golf a television sport", clues:["Is credited with making golf a mass television sport in America through his charisma","Won 7 major championships and had a massive following called Arnie's Army","Was the first golfer to earn 1 million dollars in career prize money","From Latrobe Pennsylvania — his hometown airport is named in his honor"] },
  { player:"Lee Trevino Classic", sport:"⛳ Golf", answer:"LEE TREVINO CLASSIC", era:"classic", stats:{MAJORS:"6",LIGHTNING:"Struck by",SELF_TAUGHT:"No coach",BACK:"Surgery"}, ctx:"Career Totals — Six majors after being struck by lightning", clues:["Won 6 major championships and continued to play after being struck by lightning on a golf course","Was entirely self-taught — never had a formal golf lesson","Won the British Open in consecutive years 1971 and 1972","From Dallas Texas of Mexican descent — grew up in extreme poverty and learned golf on a municipal course"] },
  { player:"Tom Watson Classic", sport:"⛳ Golf", answer:"TOM WATSON CLASSIC", era:"classic", stats:{BRITISH_OPEN:"5",MAJORS:"8",DUEL:"Nicklaus Turnberry",NEAR_WINNER:"2009 aged 59"}, ctx:"Career Totals — Eight majors including five British Opens", clues:["Won 5 British Open titles and 8 majors total","His 1977 duel with Nicklaus at Turnberry is called the greatest major ever played","Nearly won the 2009 British Open at age 59 before losing in a playoff","From Kansas City Missouri — had a famous rivalry with Jack Nicklaus"] },
  { player:"Gary Player Classic", sport:"⛳ Golf", answer:"GARY PLAYER CLASSIC", era:"classic", stats:{GRAND_SLAM:"Career",MAJORS:"9",FITNESS:"Pioneered",TRAVEL:"Most ever"}, ctx:"Career Totals — Completed the Career Grand Slam and pioneered fitness", clues:["Completed the Career Grand Slam — winning all four major championships","Was the first non-American to win The Masters in 1961","Was decades ahead of his time in fitness and diet — regularly wore black to maximize heat absorption","From Johannesburg South Africa — is estimated to have traveled more air miles than any golfer ever"] },
  { player:"Billy Casper Classic", sport:"⛳ Golf", answer:"BILLY CASPER CLASSIC", era:"classic", stats:{MAJORS:"3",WINS:"51",PUTTER:"Best era",FAITH:"Mormon"}, ctx:"Career Totals — 51 wins and three majors often overlooked in history", clues:["Won 51 PGA Tour events — fifth most in history — yet is consistently overlooked in golf discussions","Won 3 major championships including 2 US Opens","Was known as one of the greatest putters in golf history","From San Diego California — was a deeply religious Mormon throughout his career"] },
  { player:"Raymond Floyd Classic", sport:"⛳ Golf", answer:"RAYMOND FLOYD CLASSIC", era:"classic", stats:{MAJORS:"4",SPAN:"1969-1986",INTENSITY:"Famous",STARE:"Feared"}, ctx:"Career Totals — Won four majors across 18 years on tour", clues:["Won 4 major championships spanning an extraordinary 18-year period from 1969 to 1986","Was known for an intense intimidating stare that opponents found unnerving","Won The Masters in 1976 by a record 8 strokes","From Fort Bragg North Carolina — was known as one of the most feared match play competitors ever"] },
  { player:"Johnny Miller Classic", sport:"⛳ Golf", answer:"JOHNNY MILLER CLASSIC", era:"classic", stats:{US_OPEN:"1973",ROUND:"63",MAJORS:"2",BROADCASTER:"Best ever"}, ctx:"Career Totals — Shot 63 to win the US Open and became golf's greatest broadcaster", clues:["Shot a 63 in the final round at Oakmont to win the 1973 US Open — one of the greatest rounds ever","Won 2 major championships in the 1970s","Later became widely considered the best golf commentator in television history","From San Francisco California — his candid brutally honest commentary made him both famous and controversial"] },
  { player:"Seve Ballesteros Classic", sport:"⛳ Golf", answer:"SEVE BALLESTEROS CLASSIC", era:"classic", stats:{MAJORS:"5",RYDER:"Legend",CAR_PARK:"1979 Open",SPAIN:"Icon"}, ctx:"Career Totals — Five majors and the greatest Ryder Cup player of all time", clues:["Won 5 major championships and is considered the greatest Ryder Cup player in history","Won the 1979 British Open famously escaping from a car park on the 16th hole","Was the inspiration for an entire generation of Spanish and European golfers","From Pedrena Spain — died of brain cancer in 2011 at age 54"] },
  { player:"Nick Faldo Classic", sport:"⛳ Golf", answer:"NICK FALDO CLASSIC", era:"classic", stats:{MAJORS:"6",REBUILT:"Swing",RYDER:"Most points",NATION:"England"}, ctx:"Career Totals — Six majors after completely rebuilding his swing", clues:["Won 6 major championships after making the brave decision to completely rebuild his golf swing","Is the all-time leading points scorer in Ryder Cup history","Tore apart a solid game to rebuild with David Leadbetter and came back better than ever","From Welwyn Garden City England — was the world's best player in the late 1980s and early 1990s"] },
  { player:"Greg Norman Classic", sport:"⛳ Golf", answer:"GREG NORMAN CLASSIC", era:"classic", stats:{MAJORS:"2",WEEKS_NO1:"331",COLLAPSES:"Famous",SHARK:"Nickname"}, ctx:"Career Totals — 331 weeks at No. 1 despite famous major collapses", clues:["Spent 331 weeks at World No. 1 despite winning only 2 major championships","Is famous for several heartbreaking collapses in majors — most notably blowing a 6-shot lead at the 1996 Masters","Was nicknamed The Great White Shark","From Mount Isa Queensland Australia — was one of the most marketable golfers in history"] },
  { player:"Curtis Strange Classic", sport:"⛳ Golf", answer:"CURTIS STRANGE CLASSIC", era:"classic", stats:{US_OPEN:"2 consecutive",FIRST_MILLION:"Prize money",WINS:"17",NATION:"USA"}, ctx:"Career Totals — First player to win consecutive US Opens in the modern era", clues:["Won consecutive US Opens in 1988 and 1989 — the first to do so in the modern era","Was the first golfer to earn 1 million dollars in a single season","Won 17 PGA Tour events in his career","From Norfolk Virginia — was known for his gritty and aggressive playing style"] },
  { player:"Payne Stewart Classic", sport:"⛳ Golf", answer:"PAYNE STEWART CLASSIC", era:"classic", stats:{MAJORS:"3",KNICKERS:"Famous",DEATH:"Plane 1999",PUTT:"Final US Open"}, ctx:"Career Totals — Three majors and the most famous last putt in US Open history", clues:["Holed a 15-foot par putt on the 18th hole at Pinehurst in 1999 in the most dramatic US Open finish ever","Won 3 major championships and was known for wearing plus-fours knickers","Died in a plane crash in October 1999 just months after his last US Open win","From Springfield Missouri — his statue stands at Pinehurst commemorating his famous putt"] },

  // Final gap fills
  // Tennis Legends (2 more)
  { player:"Lew Hoad Legends", sport:"🎾 ATP", answer:"LEW HOAD 3", era:"legends", stats:{GRAND_SLAMS:"4",WIMBLEDON:"2",BACK:"Ended career",IDOL:"Inspired Laver"}, ctx:"Career Totals — Four Grand Slams before back problems ended his career", clues:["Was Rod Laver's idol and the player Laver modeled his game after","Won 4 Grand Slam titles including 2 Wimbledon titles before a serious back injury curtailed his career","Was considered the most gifted tennis player of his generation by contemporaries","From Glebe New South Wales Australia — turned professional in 1957 ending his amateur run"] },
  { player:"Tony Trabert Legends", sport:"🎾 ATP", answer:"TONY TRABERT 3", era:"legends", stats:{GRAND_SLAMS:"5",YEAR:"1955 three slams",DAVIS_CUP:"Legend",NATION:"USA"}, ctx:"Best Season — Won three Grand Slams in 1955", clues:["Won three Grand Slam titles in the same year — the French Open Wimbledon and US Championships","Won 5 Grand Slam titles in total","Was a key figure in US Davis Cup victories in the early 1950s","From Cincinnati Ohio — was considered the finest American player of the mid-1950s"] },

  // Golf Legends (4 more)
  { player:"Harry Vardon Legends", sport:"⛳ Golf", answer:"HARRY VARDON 2", era:"legends", stats:{BRITISH_OPEN:"6",GRIP:"His name",US_OPEN:"1900",NATION:"Jersey"}, ctx:"Career Totals — Six British Opens and the grip that bears his name", clues:["Won the British Open 6 times — still the all-time record","The overlapping golf grip used by virtually all golfers is called the Vardon Grip","Won the US Open in 1900 during a promotional North American tour","From Grouville Jersey Channel Islands — suffered from tuberculosis throughout much of his career"] },
  { player:"Gene Sarazen Legends", sport:"⛳ Golf", answer:"GENE SARAZEN 3", era:"legends", stats:{GRAND_SLAM:"All 4 majors",WEDGE:"Invented sand wedge",DOUBLE_EAGLE:"1935",NATIONS:"Won at 3 venues"}, ctx:"Career Totals — First to win all four majors and invented the sand wedge", clues:["Was the first player in history to win all four major championships in a career","Invented the modern sand wedge which transformed how golfers played bunker shots","Made the famous double eagle at Augusta in 1935 called the shot heard round the world","From Harrison New York — continued playing in The Masters as a ceremonial starter into his 70s"] },
  { player:"Byron Nelson Legends", sport:"⛳ Golf", answer:"BYRON NELSON 2", era:"legends", stats:{WINS:"18",STREAK:"11 consecutive",YEAR:"1945",RETIRED:"34"}, ctx:"Best Season — 18 wins and 11 consecutive in 1945 then retired at 34", clues:["Won 18 tournaments in 1945 including 11 in a row — arguably the greatest season in golf history","Retired at age 34 to become a Texas rancher — walking away at the peak of his powers","Had a scoring average of 68.33 for the entire 1945 season","From Fort Worth Texas — the Byron Nelson Championship in Dallas was named in his honor"] },
  { player:"Francis Ouimet Legends", sport:"⛳ Golf", answer:"FRANCIS OUIMET 2", era:"legends", stats:{US_OPEN:"1913",AGE:"20 amateur",FROM:"Across street",IMPACT:"Popularized golf USA"}, ctx:"1913 US Open — 20-year-old amateur shocked the golf world", clues:["Won the 1913 US Open at age 20 as an amateur against the two best British professionals in the world","Had literally grown up across the street from The Country Club where the tournament was held","His victory is credited with sparking an explosion in golf's popularity across America","His story was made into the film The Greatest Game Ever Played"] },

  // Hockey Modern (2 more)
  { player:"Roberto Luongo", sport:"🏒 NHL", answer:"ROBERTO LUONGO_2", era:"modern", stats:{WINS:"489",SHUTOUTS:"77",OLYMPIC:"Gold 2010",NATION:"Canada"}, ctx:"Career Totals — 489 wins and Olympic gold on home ice", clues:["Won 489 games — third most in NHL history","Won Olympic gold with Canada at the 2010 Vancouver Winter Games on home ice","The Canucks came agonizingly close to winning the Cup in both 1982 and 1994 before falling short","From Montreal Quebec — was one of the most technically gifted goaltenders of his era"] },
  { player:"Devan Dubnyk", sport:"🏒 NHL", answer:"DEVAN DUBNYK", era:"modern", stats:{WINS:"263",COMEBACK:"Career saving",MINNESOTA:"Star",NATION:"Canada"}, ctx:"Career Totals — Career saving season with Minnesota after being released", clues:["Had a remarkable career turnaround after being released by the Arizona Coyotes and traded mid-season to Minnesota","Went on a historic save percentage run that saved both his career and the Wild's season","Won 263 career games mostly with the Minnesota Wild","From Regina Saskatchewan — was one of the larger goaltenders in the league at 6ft 6in"] },

  { player:"Don Budge Legends", sport:"🎾 ATP", answer:"DON BUDGE 2", era:"legends", stats:{GRAND_SLAM:"First Calendar",DAVIS_CUP:"Hero",PRO:"Dominated",NATION:"USA"}, ctx:"Career Totals — First player to win the Calendar Grand Slam in 1938", clues:["Was the first player in history to win all four Grand Slam titles in a single year","Was so dominant in the Davis Cup that he won the critical match virtually single-handedly for years","Had one of the most powerful backhands anyone had ever seen — described as a howitzer","From Oakland California — is credited with saving American tennis in the late 1930s"] },
  { player:"Jack Kramer Legends", sport:"🎾 ATP", answer:"JACK KRAMER 3", era:"legends", stats:{PRO:"Dominated",GRAND_SLAMS:"3",ADMINISTRATOR:"Most powerful",NATION:"USA"}, ctx:"Career Totals — Won Wimbledon then dominated professional tennis for years", clues:["Dominated professional tennis for years after turning pro in 1947","Won 3 Grand Slam titles including Wimbledon in 1947","Later became the most powerful administrator in professional tennis — shaping the Open Era","From Las Vegas Nevada — is credited with helping create the ATP and the professional circuit"] },
  { player:"Bobby Jones Legends", sport:"⛳ Golf", answer:"BOBBY JONES 2", era:"legends", stats:{GRAND_SLAM:"1930",MAJORS:"13",AMATEUR:"Always",AUGUSTA:"Founded"}, ctx:"Career Totals — Won the Grand Slam in 1930 then retired at 28 as an amateur", clues:["Won all four major championships in 1930 — the only person to achieve the Grand Slam","Never turned professional despite being the best player in the world","Co-founded Augusta National Golf Club and created The Masters tournament","Retired at age 28 — considered the greatest golfer of his era"] },
  { player:"Walter Hagen Legends", sport:"⛳ Golf", answer:"WALTER HAGEN 2", era:"legends", stats:{MAJORS:"11",PGA:"5",SHOWMAN:"Famous",MILLION:"First pro millionaire"}, ctx:"Career Totals — 11 majors and the first golf millionaire", clues:["Won 11 major championships including 5 PGA Championships — the most ever","Was the first professional golfer to earn a million dollars from the sport","Was famous for his extravagant lifestyle and showmanship — arrived at tournaments in limousines","From Rochester New York — refused to use the clubhouse at clubs that didn't allow professionals to enter"] },
  { player:"Sam Snead Legends", sport:"⛳ Golf", answer:"SAM SNEAD 2", era:"legends", stats:{WINS:"82",MAJORS:"7",US_OPEN:"Never won",AGE:"Won at 52"}, ctx:"Career Totals — 82 wins the most ever but famously never won the US Open", clues:["Won 82 PGA Tour events — still the all-time record that will likely never be broken","Won the last of his 82 victories at age 52 — winning on the same tour 32 years after his first win","Won 7 major championships but never the US Open — his greatest frustration","From Hot Springs Virginia — had one of the most naturally beautiful golf swings ever seen"] },
  { player:"Ben Hogan Legends", sport:"⛳ Golf", answer:"BEN HOGAN 2", era:"legends", stats:{MAJORS:"9",CRASH:"Survived 1949",YEAR:"1953",SECRET:"Famous"}, ctx:"Career Totals — Won 9 majors including a 3-major year after surviving a near fatal crash", clues:["Survived a near-fatal head-on collision with a Greyhound bus in 1949 and came back to win","Won the Masters US Open and British Open all in the same year of 1953","Was famous for The Secret — a mysterious wrist move he claimed eliminated his hook forever","From Dublin Texas — is considered one of the three greatest golfers who ever lived"] },
  { player:"Ryan Miller Hockey", sport:"🏒 NHL", answer:"RYAN MILLER", era:"modern", stats:{OLYMPIC:"Silver 2010",VEZINA:"Finalist",WINS:"391",NATION:"USA"}, ctx:"Career Totals — Led USA to Olympic silver and was the best American goalie of his era", clues:["Led the United States to the Olympic silver medal at the 2010 Vancouver Games","Was the best American-born goaltender of his generation","Won 391 career NHL games","From East Lansing Michigan — played college hockey at Michigan State"] },
  { player:"Corey Crawford Hockey", sport:"🏒 NHL", answer:"COREY CRAWFORD", era:"modern", stats:{CUPS:"2",GAA:"2.42",CONCUSSION:"Missed year",TEAM:"Chicago"}, ctx:"Career Totals — Two Cups with Chicago and overcame a serious concussion", clues:["Won 2 Stanley Cups with the Chicago Blackhawks in 2013 and 2015","Missed nearly an entire season due to a serious concussion suffered in 2017","Was one of the most underappreciated goaltenders of his era","From Montreal Quebec — was undrafted and had to work his way up through the minors"] },

  // HARD Basketball Modern (need 1)
  { player:"Rudy Gobert", sport:"🏀 NBA", answer:"RUDY GOBERT", era:"modern", stats:{DPOY:"4",BLOCKS:"2.1",COVID:"Patient zero NBA",NATION:"France"}, ctx:"Career Totals — Four Defensive Player of Year awards and the player who shut down the NBA", clues:["Won 4 Defensive Player of the Year awards — the most ever","Was responsible for the NBA shutting down in 2020 after testing positive for COVID-19 before a game","Was named the NBA's best defender of his generation","From Saint-Quentin France — played professionally in France before being drafted"] },

  // HARD Baseball Modern (need 5)
  { player:"Freddie Garcia", sport:"⚾ MLB", answer:"FREDDIE GARCIA", era:"modern", stats:{ERA:"3.97",W:"156",WS:"2005",TEAM:"Multiple"}, ctx:"Career Totals — Key starter on multiple playoff teams across his career", clues:["Was a key starter in multiple playoff runs with Seattle Chicago and New York","Won a World Series with the Chicago White Sox in 2005","Pitched for 14 seasons in the major leagues for multiple teams","From Caracas Venezuela — was originally signed as an amateur free agent"] },
  { player:"Livan Hernandez", sport:"⚾ MLB", answer:"LIVAN HERNANDEZ", era:"modern", stats:{WS_MVP:"1997",NLCS_MVP:"1997",W:"178",DEFECTED:"Cuba"}, ctx:"Career Totals — Defected from Cuba and won two MVP awards in the 1997 postseason", clues:["Defected from Cuba in 1995 before becoming a star in Major League Baseball","Won both the NLCS and World Series MVP in 1997 with the Florida Marlins","Won 178 career games over 17 big league seasons","From Villa Clara Cuba — his half-brother Orlando Hernandez also defected and played in the majors"] },
  { player:"Bartolo Colon", sport:"⚾ MLB", answer:"BARTOLO COLON", era:"modern", stats:{CY:"2005",W:"247",AGE:"Pitched at 44",MEME:"Famous home run"}, ctx:"Career Totals — Won the Cy Young and pitched until age 44 becoming a beloved meme", clues:["Won the AL Cy Young Award in 2005 with the Los Angeles Angels","Hit his first career home run at age 42 to become an internet meme","Pitched in the major leagues until age 44 — one of the longest careers ever","From Alta Mira Dominican Republic — was famous for his unusual physique and masterful control"] },
  { player:"Kevin Brown", sport:"⚾ MLB", answer:"KEVIN BROWN_2", era:"modern", stats:{ERA:"3.28",W:"211",CONTRACT:"First 100M",SINKER:"Nasty"}, ctx:"Career Totals", clues:["Signed the first 100 million dollar contract in baseball history with the Dodgers in 1998","Had one of the most devastating sinkers in baseball with late downward movement","Won 211 career games with a 3.28 ERA","From Milledgeville Georgia — was known for punching a wall and breaking his own hand in anger"] },
  { player:"Curt Schilling", sport:"⚾ MLB", answer:"CURT SCHILLING_2", era:"modern", stats:{ERA:"3.46",W:"216",SOCK:"Famous",WS:"3"}, ctx:"Career Totals — Won three World Series including the famous bloody sock game", clues:["Pitched through a sutured tendon injury with blood soaking his sock in the 2004 ALCS","Won 3 World Series championships — with Arizona in 2001 and Boston in 2004 and 2007","Had a career strikeout-to-walk ratio among the best in baseball history","From Anchorage Alaska — was controversially not elected to the Hall of Fame despite stellar numbers"] },
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
const sbUpsertPlayer = async (username: string, totalScore: number, bestStreak: number) => {
  try {
    await sbFetch("players?on_conflict=username", {
      method: "POST",
      headers: { "Prefer": "resolution=merge-duplicates,return=minimal" },
      body: JSON.stringify({ username: username || "anonymous", total_score: totalScore, best_streak: bestStreak, updated_at: new Date().toISOString() }),
    });
  } catch {}
};

// When a player sets their username for the first time, backfill their anonymous plays
const sbBackfillUsername = async (newUsername: string) => {
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
    await sbFetch(`plays?username=eq.anonymous&date=in.(${localDates.join(",")})`, {
      method: "PATCH",
      headers: { "Prefer": "return=minimal" },
      body: JSON.stringify({ username: newUsername }),
    });
    await sbFetch(`players?username=eq.anonymous`, {
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
const sbGetLeaderboard = async (type: "today" | "alltime"): Promise<Array<{username:string, score:number, streak?:number}>> => {
  try {
    const view = type === "today" ? "today_leaderboard?select=username,day_score" : "alltime_leaderboard?select=username,total_score,best_streak";
    const data = await sbFetch(view);
    if (!data) return [];
    return data.map((r: Record<string,unknown>) => ({
      username: r.username as string,
      score: (r.day_score ?? r.total_score) as number,
      streak: r.best_streak as number | undefined,
    }));
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

function ScoreHistoryModal({ totalScore, onClose, onReset }: { totalScore: number; onClose: () => void; onReset: () => void }) {
  const history = loadHistory();
  const [confirmReset, setConfirmReset] = useState(false);
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
  const DIFF_COLORS: Record<string, string> = { easy: "#22c55e", medium: "#f59e0b", hard: "#ef4444" };

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
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
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
                    <span style={{ fontSize:"0.6rem", fontWeight:700, padding:"2px 6px", borderRadius:4, background: e.diff==="easy"?"rgba(34,197,94,0.2)":e.diff==="medium"?"rgba(59,130,246,0.2)":"rgba(168,85,247,0.2)", color: e.diff==="easy"?"#22c55e":e.diff==="medium"?"#3b82f6":"#a855f7", fontFamily:"'Bebas Neue',sans-serif" }}>{e.diff?.toUpperCase()}</span>
                    <span style={{ color:"#d1d5db", fontSize:"0.78rem" }}>{e.player || "—"}</span>
                  </div>
                  <span style={{ fontSize:"0.85rem" }}>{e.won ? "✅" : "❌"}</span>
                </div>
              ))}
            </div>
          );
        })()}

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
              const hasWin = entries.some(e => e.won);
              const hasPlay = entries.length > 0;
              const isToday = day === today.getDate();
              const isSelected = selectedDay === day;
              const bestDiff = entries.filter(e => e.won).sort((a,b) => b.score - a.score)[0]?.diff;
              const dotColor = bestDiff ? DIFF_COLORS[bestDiff] : hasPlay ? "#ef4444" : "transparent";

              return (
                <div key={day} onClick={() => hasPlay && setSelectedDay(isSelected ? null : day)}
                  style={{ aspectRatio:"1", borderRadius:6, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background: isSelected ? "rgba(255,215,0,0.15)" : isToday ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)", border:`1px solid ${isSelected ? "rgba(255,215,0,0.5)" : isToday ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.05)"}`, cursor:hasPlay?"pointer":"default", position:"relative" }}>
                  <span style={{ fontSize:"0.68rem", color: isToday ? "#fff" : hasPlay ? "#d1d5db" : "#4b5563", fontWeight:isToday?700:400 }}>{day}</span>
                  {hasPlay && <div style={{ width:5, height:5, borderRadius:"50%", background:dotColor, marginTop:1 }} />}
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
          {[["#22c55e","Easy win"],["#f59e0b","Medium win"],["#ef4444","Hard win / loss"]].map(([c,l]) => (
            <div key={l} style={{ display:"flex", alignItems:"center", gap:4 }}>
              <div style={{ width:7, height:7, borderRadius:"50%", background:c }} />
              <span style={{ color:"#4b5563", fontSize:"0.6rem" }}>{l}</span>
            </div>
          ))}
        </div>

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
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showWeeklyRecap, setShowWeeklyRecap] = useState(false);
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
  const [pSportFilter, setPSportFilter] = useState<Set<string>>(new Set<string>());
  const [pEraFilter, setPEraFilter] = useState<Set<Era>>(new Set<Era>());
  const [showPFilter, setShowPFilter] = useState(false);
  const [sharePreview, setSharePreview] = useState<string | null>(null);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(() => { try { return localStorage.getItem("statsiq_email_submitted") === "1"; } catch { return false; } });
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
  }, []); // eslint-disable-line

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
      const cached = localStorage.getItem(dk);
      if (cached !== null) {
        const idx = parseInt(cached);
        const otherPool = applyFilters(POOLS[d]);
        if (idx >= 0 && idx < otherPool.length) usedPlayersToday.add(otherPool[idx].player);
      }
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
    // Log to Supabase
    const dateStr = today.toISOString().slice(0,10);
    sbLogPlay(username, dateStr, diff, sport, puzzle.era, final, guessNum, true);
    sbUpsertPlayer(username, newTotal, streakData.current);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      // Log loss to Supabase
      sbLogPlay(username, today.toISOString().slice(0,10), diff, sport, puzzle.era, 0, next.length, false);
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
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 720;
    const ctx2 = canvas.getContext("2d")!;

    // Background
    ctx2.fillStyle = "#080c14";
    ctx2.fillRect(0, 0, 1080, 720);

    // Subtle grid
    ctx2.strokeStyle = "rgba(255,255,255,0.03)";
    ctx2.lineWidth = 1;
    for (let x = 0; x < 1080; x += 60) { ctx2.beginPath(); ctx2.moveTo(x,0); ctx2.lineTo(x,720); ctx2.stroke(); }
    for (let y = 0; y < 720; y += 60) { ctx2.beginPath(); ctx2.moveTo(0,y); ctx2.lineTo(1080,y); ctx2.stroke(); }

    // Gold top border
    ctx2.fillStyle = "#ffd700";
    ctx2.fillRect(0, 0, 1080, 5);

    // Header — STATSIQ
    ctx2.font = "900 56px 'Arial Black', Arial, sans-serif";
    ctx2.fillStyle = "#ffd700";
    ctx2.letterSpacing = "6px";
    ctx2.fillText("STATSIQ", 72, 80);
    ctx2.font = "400 22px Arial, sans-serif";
    ctx2.fillStyle = "#4b5563";
    ctx2.letterSpacing = "4px";
    const date2 = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    ctx2.fillText(date2.toUpperCase(), 72, 116);

    // Badge + username
    const badge2 = getScoreBadge(totalScore);
    const userDisplay = username ? (badge2 ? badge2.emoji + " " + username : username) : "";
    if (userDisplay) {
      ctx2.font = "700 26px Arial, sans-serif";
      ctx2.fillStyle = "#9ca3af";
      ctx2.letterSpacing = "1px";
      ctx2.textAlign = "right";
      ctx2.fillText(userDisplay, 1008, 80);
      ctx2.font = "400 20px Arial, sans-serif";
      ctx2.fillStyle = "#4b5563";
      ctx2.fillText(totalScore.toLocaleString() + " pts", 1008, 110);
      ctx2.textAlign = "left";
    }

    // Divider
    ctx2.strokeStyle = "rgba(255,255,255,0.08)";
    ctx2.lineWidth = 1;
    ctx2.beginPath(); ctx2.moveTo(72, 138); ctx2.lineTo(1008, 138); ctx2.stroke();

    // Draw each difficulty row
    const today3 = new Date();
    const dateStr3 = today3.getFullYear() + "_" + (today3.getMonth()+1) + "_" + today3.getDate();
    const diffs3: Array<{key: "easy"|"medium"|"hard", label: string, color: string, guesses: number}> = [
      { key: "easy",   label: "EASY",   color: "#22c55e", guesses: 3 },
      { key: "medium", label: "MEDIUM", color: "#3b82f6", guesses: 3 },
      { key: "hard",   label: "HARD",   color: "#a855f7", guesses: 3 },
    ];

    let dayTotal3 = 0;
    diffs3.forEach((d, idx) => {
      const rowY = 168 + idx * 168;
      let entry: {score:number,guesses:number,won:boolean,player:string,diff:string} | null = null;
      try {
        const raw = localStorage.getItem("statsiq_day_" + dateStr3 + "_" + d.key);
        if (raw) entry = JSON.parse(raw);
      } catch {}

      // Row background
      ctx2.fillStyle = entry ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.01)";
      roundRect(ctx2, 56, rowY, 968, 148, 14);
      ctx2.fill();
      ctx2.strokeStyle = entry ? d.color + "33" : "rgba(255,255,255,0.06)";
      ctx2.lineWidth = 1.5;
      roundRect(ctx2, 56, rowY, 968, 148, 14);
      ctx2.stroke();

      // Diff label
      ctx2.font = "900 28px 'Arial Black', Arial, sans-serif";
      ctx2.fillStyle = entry ? d.color : "#374151";
      ctx2.letterSpacing = "3px";
      ctx2.fillText(d.label, 90, rowY + 46);

      if (entry) {
        // Player name
        ctx2.font = "700 32px Arial, sans-serif";
        ctx2.fillStyle = entry.won ? "#fff" : "#9ca3af";
        ctx2.letterSpacing = "0px";
        ctx2.fillText(entry.player.toUpperCase(), 90, rowY + 90);

        // Guess grid
        const sqSize = 38;
        const sqGap = 10;
        for (let g = 0; g < d.guesses; g++) {
          const sqX = 90 + g * (sqSize + sqGap);
          const sqY3 = rowY + 106;
          let col = "rgba(255,255,255,0.06)";
          if (g < entry.guesses - 1) col = "rgba(239,68,68,0.6)";
          else if (g === entry.guesses - 1) col = entry.won ? "rgba(34,197,94,0.8)" : "rgba(239,68,68,0.6)";
          ctx2.fillStyle = col;
          roundRect(ctx2, sqX, sqY3, sqSize, sqSize, 6);
          ctx2.fill();
        }

        // Score
        const scoreStr3 = entry.score > 0 ? "+" + entry.score.toLocaleString() + " pts" : entry.won ? "" : "✗";
        ctx2.font = "900 36px 'Arial Black', Arial, sans-serif";
        ctx2.fillStyle = entry.won ? d.color : "#4b5563";
        ctx2.textAlign = "right";
        ctx2.letterSpacing = "1px";
        ctx2.fillText(scoreStr3, 1000, rowY + 98);
        ctx2.textAlign = "left";
        dayTotal3 += entry.score || 0;
      } else {
        // Not played
        ctx2.font = "400 26px Arial, sans-serif";
        ctx2.fillStyle = "#374151";
        ctx2.letterSpacing = "2px";
        ctx2.fillText("NOT PLAYED", 90, rowY + 90);
      }
    });

    // Day total
    if (dayTotal3 > 0) {
      ctx2.font = "700 28px Arial, sans-serif";
      ctx2.fillStyle = "#ffd700";
      ctx2.textAlign = "right";
      ctx2.letterSpacing = "1px";
      ctx2.fillText("TODAY: " + dayTotal3.toLocaleString() + " pts", 1008, 686);
      ctx2.textAlign = "left";
    }

    // Footer
    ctx2.font = "700 22px Arial, sans-serif";
    ctx2.fillStyle = "#ffd700";
    ctx2.letterSpacing = "3px";
    ctx2.fillText("STATSIQ.IO", 72, 686);

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
    const streakStr = streakData.current > 1 ? ` 🔥${streakData.current}` : "";
    const userStr = username ? `${username}${badgeStr}${streakStr}` : `StatsIQ${streakStr}`;

    const diffs: Difficulty[] = ["easy", "medium", "hard"];
    const diffLabels: Record<Difficulty, string> = { easy: "Easy  ", medium: "Medium", hard: "Hard  " };
    let dayTotal = 0;
    let allDone = true;
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
            return "⬜";
          }).join("");
          const pts = data.score > 0 ? `+${data.score.toLocaleString()}` : data.won ? "" : "✗";
          lines.push(`${diffLabels[d]}  ${grid}  ${pts}`);
          dayTotal += data.score || 0;
        } else {
          lines.push(`${diffLabels[d]}  ⬜⬜⬜  —`);
          allDone = false;
        }
      } catch {
        lines.push(`${diffLabels[d]}  ⬜⬜⬜  —`);
        allDone = false;
      }
    }

    const totalLine = dayTotal > 0 ? `\nToday: ${dayTotal.toLocaleString()} pts` : "";
    return `📊 StatsIQ — ${date}\n${userStr}\n\n${lines.join("\n")}${totalLine}\nstatsiq.io`;
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
      {showHistory && <ScoreHistoryModal totalScore={totalScore} onClose={() => setShowHistory(false)} onReset={() => {
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
            <p style={{ margin:"0 0 16px", color:"#4b5563", fontSize:"0.7rem" }}>This will show on the leaderboard when it launches</p>
            <input
              value={usernameInput}
              onChange={e => setUsernameInput(e.target.value.slice(0, 20))}
              onKeyDown={e => { if (e.key === "Enter" && usernameInput.trim().length >= 2) { const u = usernameInput.trim(); const prev = username; setUsername(u); try { localStorage.setItem("statsiq_username", u); } catch {} setShowUsernameModal(false); if (!prev) sbBackfillUsername(u); else sbUpsertPlayer(u, totalScore, streakData.current); } }}
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
                onClick={() => { const u = usernameInput.trim(); const prev = username; setUsername(u); try { localStorage.setItem("statsiq_username", u); } catch {} setShowUsernameModal(false); if (!prev) sbBackfillUsername(u); else sbUpsertPlayer(u, totalScore, streakData.current); }}
                style={{ flex:2, padding:"10px", borderRadius:8, border:"none", background: usernameInput.trim().length >= 2 ? "rgba(255,200,0,0.9)" : "rgba(100,100,100,0.3)", color: usernameInput.trim().length >= 2 ? "#0a0c10" : "#555", cursor: usernameInput.trim().length >= 2 ? "pointer" : "not-allowed", fontWeight:900, fontFamily:"'Bebas Neue',sans-serif", letterSpacing:"0.1em" }}>
                SAVE
              </button>
            </div>
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
                lbData.slice(0,10).map((row, i) => {
                  const isYou = row.username === (username || "anonymous");
                  return (
                    <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 14px", borderBottom: i < lbData.length-1 ? "1px solid rgba(255,255,255,0.05)" : "none", background: isYou ? "rgba(255,200,0,0.06)" : "transparent" }}>
                      <span style={{ color: i===0?"#ffd700":i===1?"#9ca3af":i===2?"#cd7f32":"#374151", fontFamily:"'Bebas Neue',sans-serif", fontSize:"0.88rem", width:22, flexShrink:0 }}>#{i+1}</span>
                      <span style={{ flex:1, color:isYou?"#ffd700":"#d1d5db", fontSize:"0.82rem", fontWeight:isYou?700:400, textAlign:"left", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                        {row.username}{isYou ? " (you)" : ""}
                      </span>
                      {lbType === "alltime" && row.streak && row.streak > 2 && <span style={{ fontSize:"0.65rem", color:"#fb923c" }}>{row.streak}🔥</span>}
                      <span style={{ color:isYou?"#ffd700":"#6b7280", fontFamily:"'Bebas Neue',sans-serif", fontSize:"0.85rem", flexShrink:0 }}>{row.score.toLocaleString()}</span>
                    </div>
                  );
                })
              )}
            </div>

            {/* Your stats */}
            <div style={{ background:"rgba(255,200,0,0.06)", border:"1px solid rgba(255,200,0,0.15)", borderRadius:10, padding:"12px 14px", marginBottom:14 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  {getScoreBadge(totalScore) && <span style={{ fontSize:"1.2rem" }}>{getScoreBadge(totalScore)!.emoji}</span>}
                  <div>
                    <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                      <p style={{ margin:0, color:"#fff", fontFamily:"'Bebas Neue',sans-serif", fontSize:"1rem" }}>{username || "Anonymous"}</p>
                      {globalRank && <span style={{ background:"rgba(255,215,0,0.15)", border:"1px solid rgba(255,215,0,0.3)", borderRadius:4, padding:"1px 6px", color:"#ffd700", fontSize:"0.62rem", fontFamily:"'Bebas Neue',sans-serif", letterSpacing:"0.08em" }}>#{globalRank} ALL TIME</span>}
                    </div>
                    <p style={{ margin:0, color:"#4b5563", fontSize:"0.6rem" }}>{streakData.current > 0 ? `${streakData.current} day streak 🔥` : "No active streak"}</p>
                  </div>
                </div>
                <p style={{ margin:0, color:"#ffd700", fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.3rem" }}>{totalScore.toLocaleString()}</p>
              </div>
            </div>

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
            <button onClick={() => setShowHistory(true)} style={{ textAlign:"center", background:"none", border:"none", cursor:"pointer", padding:0, minWidth:48 }}>
              <p style={{ margin:0, fontSize:"0.52rem", color:"#4b5563", letterSpacing:"0.15em" }}>SCORE</p>
              <p style={{ margin:0, fontSize:"0.9rem", fontWeight:900, color:"#ffd700", fontFamily:"'Bebas Neue',sans-serif" }}>{totalScore.toLocaleString()}</p>
            </button>
            {streakData.current > 0 && (
              <button onClick={() => setShowHistory(true)} style={{ textAlign:"center", background:"none", border:"none", cursor:"pointer", padding:0, minWidth:44 }}>
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
          <button onClick={() => { const idx = Math.floor(Math.random()*500); setPracticeIdx(idx); setPGuesses([]); setPInput(""); setPDone(false); setPWon(false); setShowPractice(true); }} style={{ display:"flex", alignItems:"center", gap:4, padding:"5px 10px", borderRadius:8, border:"1px solid rgba(167,139,250,0.3)", background:"rgba(167,139,250,0.07)", color:"#a78bfa", cursor:"pointer", fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.08em", fontFamily:"'Barlow Condensed', sans-serif" }}>
            🎮 PRACTICE
          </button>
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
          {Object.entries(stats).map(([key,val],i) => (
            <div key={key} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background:"rgba(255,255,255,0.06)", border:`1px solid ${cfg.border}`, borderRadius:10, padding:"10px 6px", opacity:visible?1:0, transform:visible?"translateY(0)":"translateY(8px)", transition:`all 0.4s ease ${i*0.08}s` }}>
              <span style={{ fontSize:"1.5rem", fontWeight:900, color:cfg.color, fontFamily:"'Bebas Neue', sans-serif" }}>{val}</span>
              <span style={{ fontSize:"0.58rem", fontWeight:700, letterSpacing:"0.18em", color:`${cfg.color}99`, marginTop:3, fontFamily:"'Barlow Condensed', sans-serif" }}>{key.replace(/_/g," ")}</span>
            </div>
          ))}
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
            <p style={{ margin:"0 0 10px", color:"#d1d5db", fontSize:"0.85rem" }}>The answer was <span style={{ color:"#ffd700", fontWeight:900 }}>{player}</span></p>

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
                <button onClick={() => { const idx = Math.floor(Math.random()*500); setPracticeIdx(idx); setPGuesses([]); setPInput(""); setPDone(false); setPWon(false); setShowPractice(true); }} style={{ padding:"9px 18px", borderRadius:8, border:"1px solid rgba(167,139,250,0.4)", background:"rgba(167,139,250,0.1)", color:"#a78bfa", fontWeight:900, fontSize:"0.82rem", cursor:"pointer", fontFamily:"'Bebas Neue',sans-serif", letterSpacing:"0.1em" }}>
                  🎮 KEEP PLAYING — PRACTICE MODE
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
            <p style={{ margin:"10px 0 0", color:"#374151", fontSize:"0.62rem", letterSpacing:"0.15em" }}>NEW STAT LINE EVERY DAY AT MIDNIGHT</p>

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
          if (win) { setPDone(true); setPWon(true); }
          else if (next.length >= 3) { setPDone(true); setPWon(false); }
        };
        return (
          <div style={{ position:"fixed", inset:0, zIndex:200, display:"flex", alignItems:"center", justifyContent:"center" }} onClick={() => setShowPractice(false)}>
            <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.85)", backdropFilter:"blur(6px)" }} />
            <div style={{ position:"relative", background:"#0f1629", border:"1px solid rgba(255,255,255,0.12)", borderRadius:16, padding:"20px", width:"min(420px,94vw)", maxHeight:"85vh", overflowY:"auto" }} onClick={e => e.stopPropagation()}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
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
                {Object.entries(pp.stats).map(([k,v]) => (
                  <div key={k} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(167,139,250,0.2)", borderRadius:8, padding:"8px 4px" }}>
                    <span style={{ fontSize:"1.2rem", fontWeight:900, color:"#a78bfa", fontFamily:"'Bebas Neue',sans-serif" }}>{v}</span>
                    <span style={{ fontSize:"0.55rem", color:"rgba(167,139,250,0.6)", letterSpacing:"0.15em" }}>{k.replace(/_/g," ")}</span>
                  </div>
                ))}
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
                  <button onClick={() => { setPGuesses([]); setPInput(""); setPDone(false); setPWon(false); setPracticeIdx(i => i+1); }} style={{ padding:"10px 24px", borderRadius:8, border:"none", background:"rgba(167,139,250,0.8)", color:"#fff", fontWeight:900, cursor:"pointer", fontFamily:"'Bebas Neue',sans-serif", letterSpacing:"0.1em" }}>
                    NEXT PUZZLE →
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
        <div style={{ display:"flex", gap:10, alignItems:"center" }}>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" style={{ color:"#374151", fontSize:"0.7rem", textDecoration:"none", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, letterSpacing:"0.1em" }}>𝕏</a>
          <button onClick={() => setShowEmailCapture(true)} style={{ background:"none", border:"1px solid rgba(255,255,255,0.06)", borderRadius:6, padding:"4px 10px", color:"#374151", cursor:"pointer", fontSize:"0.62rem", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, letterSpacing:"0.1em" }}>📬 GET REMINDERS</button>
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
