import React, { useState, useEffect, useCallback } from "react";
import { Analytics } from "@vercel/analytics/react";

// ─── EASY (45 puzzles) ────────────────────────────────────────────────────────
const EASY = [
  { player:"Michael Jordan", sport:"🏀 NBA", answer:"JORDAN", era:"classic", stats:{PTS:"45",REB:"9",AST:"6",STL:"3",BLK:"1"}, ctx:"1992 NBA Finals Game 1 vs Portland Trail Blazers", clues:["Shot 6-for-6 from three in the first half","Won 6 NBA championships total","Played for the Chicago Bulls","Wore number 23"] },
  { player:"Kobe Bryant", sport:"🏀 NBA", answer:"KOBE", era:"modern", stats:{PTS:"81",REB:"6",AST:"2",STL:"3",BLK:"1"}, ctx:"Jan 22, 2006 — vs Toronto Raptors", clues:["2nd highest single-game score in NBA history","Scored 55 in the second half alone","Played entire career with the LA Lakers","Nickname: Black Mamba"] },
  { player:"Wilt Chamberlain", sport:"🏀 NBA", answer:"WILT", era:"legends", stats:{PTS:"100",REB:"25",AST:"2"}, ctx:"March 2, 1962 — vs New York Knicks", clues:["All-time NBA single-game scoring record","Record stood over 60 years","Played for the Philadelphia Warriors","Averaged 50.4 PPG that entire season"] },
  { player:"LeBron James", sport:"🏀 NBA", answer:"LEBRON", era:"modern", stats:{PTS:"27.2",REB:"7.4",AST:"8.3",STL:"1.6"}, ctx:"2012-13 NBA Season — Miami Heat MVP", clues:["Won MVP this season","Was playing for Miami Heat","Has 4 NBA championships total","Known as The King"] },
  { player:"Stephen Curry", sport:"🏀 NBA", answer:"CURRY", era:"modern", stats:{PTS:"30.1",REB:"5.4",AST:"6.7","3PM":"5.1"}, ctx:"2015-16 NBA Season — Unanimous MVP", clues:["First unanimous MVP in NBA history","Team won a record 73 games","Plays for Golden State Warriors","All-time leader in three-pointers made"] },
  { player:"Shaquille O'Neal", sport:"🏀 NBA", answer:"SHAQ", era:"modern", stats:{PTS:"38.7",REB:"16.7",AST:"2.3","FG%":"61"}, ctx:"2000 NBA Finals MVP — vs Indiana Pacers", clues:["Won NBA Finals MVP","Shot over 60% from the field","Played for the Los Angeles Lakers","Nickname: Diesel"] },
  { player:"Magic Johnson", sport:"🏀 NBA", answer:"MAGIC", era:"classic", stats:{PTS:"26.2",REB:"7",AST:"12.2",STL:"2.3"}, ctx:"1987 NBA Finals MVP — Los Angeles Lakers", clues:["Won Finals MVP with the LA Lakers","His team defeated the Boston Celtics","Nicknamed Magic for his passing ability","Wore number 32 for the Showtime Lakers"] },
  { player:"Larry Bird", sport:"🏀 NBA", answer:"BIRD", era:"classic", stats:{PTS:"29",REB:"11.5",AST:"6.1","FG%":"52.7"}, ctx:"1984 NBA Finals MVP — Boston Celtics", clues:["Won Finals MVP with Boston Celtics","His team defeated the Los Angeles Lakers","3x NBA MVP in a row","Nicknamed The Hick from French Lick"] },
  { player:"Tom Brady", sport:"🏈 NFL", answer:"BRADY", era:"modern", stats:{YDS:"505",TD:"3",INT:"0",COMP:"43"}, ctx:"Super Bowl LII vs Philadelphia Eagles 2018", clues:["His team lost despite these numbers","His 8th Super Bowl appearance","Played for New England Patriots","Won 7 Super Bowls total"] },
  { player:"Patrick Mahomes", sport:"🏈 NFL", answer:"MAHOMES", era:"modern", stats:{YDS:"360",TD:"3",INT:"0",COMP:"21"}, ctx:"Super Bowl LVII MVP vs Philadelphia Eagles", clues:["Won Super Bowl MVP","Played through an ankle injury","Plays for Kansas City Chiefs","Won his second Super Bowl"] },
  { player:"Jerry Rice", sport:"🏈 NFL", answer:"RICE", era:"classic", stats:{REC:"11",YDS:"215",TD:"3",YPR:"19.5"}, ctx:"Super Bowl XXIII — Named MVP", clues:["Won Super Bowl MVP as WR","Played for San Francisco 49ers","Holds NFL records for career receptions, yards, and TDs","Holds NFL record for career TDs"] },
  { player:"Peyton Manning", sport:"🏈 NFL", answer:"MANNING", era:"modern", stats:{YDS:"5477",TD:"55",INT:"10",RTG:"115.1"}, ctx:"2013 NFL Season — Single season TD record", clues:["Set the single-season TD record (55)","Won MVP this season","Played for the Denver Broncos","Brother Eli also played QB in NFL"] },
  { player:"Walter Payton", sport:"🏈 NFL", answer:"PAYTON", era:"classic", stats:{CAR:"339",YDS:"1852",TD:"14",YPC:"5.5"}, ctx:"1977 NFL Season — Chicago Bears", clues:["Rushed for 1852 yards — NFL record at the time","Won NFL MVP this season","Played for Chicago Bears","Nicknamed Sweetness"] },
  { player:"Joe Montana", sport:"🏈 NFL", answer:"MONTANA", era:"classic", stats:{YDS:"357",TD:"2",INT:"0",RTG:"115.2"}, ctx:"Super Bowl XIX MVP — San Francisco 49ers vs Dolphins", clues:["Won his third Super Bowl MVP","Never threw an INT in 4 Super Bowls","Played for San Francisco 49ers","Nicknamed Joe Cool for his composure"] },
  { player:"Babe Ruth", sport:"⚾ MLB", answer:"RUTH", era:"legends", stats:{HR:"60",AVG:".356",RBI:"164",OBP:".486"}, ctx:"1927 MLB Season — New York Yankees", clues:["Set the single-season HR record","Team nicknamed Murderers Row","Played for New York Yankees","Nickname: Sultan of Swat"] },
  { player:"Barry Bonds", sport:"⚾ MLB", answer:"BONDS", era:"modern", stats:{HR:"73",AVG:".328",RBI:"137",OBP:".515"}, ctx:"2001 MLB Season — San Francisco Giants", clues:["All-time single-season HR record","Won 7 MVP awards in career","Played for San Francisco Giants","His godfather was Willie Mays"] },
  { player:"Derek Jeter", sport:"⚾ MLB", answer:"JETER", era:"modern", stats:{AVG:".309",HR:"9",RBI:"75",H:"184"}, ctx:"2000 World Series MVP Season — Yankees", clues:["Won World Series MVP this year","Nicknamed The Captain","Played entire career for Yankees","Made The Flip Play in 2001"] },
  { player:"Hank Aaron", sport:"⚾ MLB", answer:"AARON", era:"legends", stats:{HR:"40",AVG:".328",RBI:"130",SLG:".600"}, ctx:"1963 MLB Season — Milwaukee Braves", clues:["Hit 40 HRs and batted .328 this season","All-time HR record holder for decades","Played for the Milwaukee/Atlanta Braves","Nicknamed Hammerin Hank"] },
  { player:"Ken Griffey Jr.", sport:"⚾ MLB", answer:"GRIFFEY", era:"classic", stats:{HR:"56",AVG:".303",RBI:"147",SLG:".628"}, ctx:"1997 MLB Season — Seattle Mariners", clues:["Won AL MVP this season","Hit 56 home runs","Played for Seattle Mariners","Wore number 24, famous for his backward cap"] },
  { player:"Lionel Messi", sport:"⚽ Soccer", answer:"MESSI", era:"modern", stats:{G:"91",AST:"13",APP:"69",MIN:"5765"}, ctx:"2012 Calendar Year — FC Barcelona World Record", clues:["Record for most goals in a calendar year","Won the Ballon d'Or that year","Played for FC Barcelona","From Argentina"] },
  { player:"Cristiano Ronaldo", sport:"⚽ Soccer", answer:"RONALDO", era:"modern", stats:{G:"50",AST:"15",APP:"55",MIN:"4743"}, ctx:"2011-12 La Liga Season — Real Madrid", clues:["Scored 50 La Liga goals in one season","Won La Liga that season","Played for Real Madrid","From Portugal"] },
  { player:"Pele", sport:"⚽ Soccer", answer:"PELE", era:"legends", stats:{G:"4",AST:"4",APP:"6",MIN:"540"}, ctx:"1970 FIFA World Cup — Brazil", clues:["Won his third World Cup with Brazil","Scored 4 goals and 4 assists in the tournament","Brazilian forward who played from the 1950s-70s","His real name is Edson Arantes do Nascimento"] },
  { player:"Roger Federer", sport:"🎾 Tennis", answer:"FEDERER", era:"modern", stats:{W:"81",L:"4",TITLES:"8",GS:"3"}, ctx:"2005 ATP Season", clues:["Won 3 Grand Slams this year","Won Wimbledon this year","From Switzerland","Ended year ranked World No. 1"] },
  { player:"Serena Williams", sport:"🎾 Tennis", answer:"SERENA", era:"modern", stats:{W:"78",L:"4",TITLES:"11",GS:"3"}, ctx:"2013 WTA Season — World No. 1", clues:["Won 3 Grand Slams including Wimbledon","Finished ranked World No. 1","From the United States","Sister Venus also plays professionally"] },
  { player:"Rafael Nadal", sport:"🎾 Tennis", answer:"NADAL", era:"modern", stats:{W:"82",L:"3",TITLES:"8",GS:"1"}, ctx:"2010 ATP Season — Completed the Career Golden Slam", clues:["Won the French Open this year","Also won Wimbledon, US Open, and Australian Open","From Spain, known as King of Clay","Completed Career Golden Slam"] },
  { player:"Tiger Woods", sport:"⛳ Golf", answer:"TIGER", era:"modern", stats:{WINS:"9",MAJORS:"3",AVG:"68.56",CUTS:"20/20"}, ctx:"2000 PGA Tour — Won 3 of 4 majors, made every cut", clues:["Won 3 of 4 majors this year","Made every single cut","Won US Open by 15 strokes","His last name is a large cat"] },
  { player:"Jack Nicklaus", sport:"⛳ Golf", answer:"NICKLAUS", era:"classic", stats:{W:"17",MAJORS:"2",AVG:"70.2",EARN:"$286K"}, ctx:"1972 PGA Tour Season — Two majors", clues:["Won The Masters and US Open this year","Known as The Golden Bear","Holds the record for most major championships (18)","Holds the record for most major championships (18)"] },
  { player:"Wayne Gretzky", sport:"🏒 NHL", answer:"GRETZKY", era:"classic", stats:{G:"92",AST:"120",PTS:"212",PIM:"26"}, ctx:"1981-82 NHL Season — Edmonton Oilers", clues:["All-time single-season goals record","212 points is the all-time record","Played for Edmonton Oilers","Holds or shares 61 NHL records"] },
  { player:"Sidney Crosby", sport:"🏒 NHL", answer:"CROSBY", era:"modern", stats:{G:"36",AST:"72",PTS:"108",PIM:"34"}, ctx:"2017 Stanley Cup Finals MVP — Pittsburgh Penguins", clues:["Won second consecutive Stanley Cup MVP","Played for Pittsburgh Penguins","From Cole Harbour, Nova Scotia, Canada","Nicknamed Sid the Kid"] },
  { player:"Mia Hamm", sport:"⚽ Soccer", answer:"HAMM", era:"classic", stats:{G:"9",AST:"4",APP:"6",MIN:"540"}, ctx:"1999 FIFA Women's World Cup — USA Champions", clues:["Won the Women's World Cup with USA","USA beat China in the famous penalty shootout final","Two-time FIFA World Cup champion and two-time Olympic gold medalist","Her penalty kick in the final was saved but USA still won"] },
  { player:"Steffi Graf", sport:"🎾 Tennis", answer:"GRAF", era:"classic", stats:{W:"96",L:"2",GS:"4",TITLES:"11"}, ctx:"1988 WTA Season — Golden Slam", clues:["Won all 4 Grand Slams AND Olympic gold in one year","Only player to ever achieve a Golden Slam","From West Germany","Married to Andre Agassi"] },
  { player:"Pete Sampras", sport:"🎾 Tennis", answer:"SAMPRAS", era:"classic", stats:{W:"82",L:"9",GS:"2",TITLES:"8"}, ctx:"1994 ATP Season — World No. 1", clues:["Won 2 Grand Slams this year including Wimbledon","Ended year ranked World No. 1","Won 14 Grand Slams total in his career","American player nicknamed Pistol Pete"] },
  { player:"Alex Ovechkin", sport:"🏒 NHL", answer:"OVECHKIN", era:"modern", stats:{G:"65",AST:"47",PTS:"112",PIM:"50"}, ctx:"2007-08 NHL Season — Hart Trophy MVP", clues:["Won the Hart Trophy MVP award this season","Scored 65 goals — one of the highest totals ever","Plays for Washington Capitals","From Moscow, Russia"] },
  // Basketball - Modern
  { player:"Nikola Jokic", sport:"🏀 NBA", answer:"JOKIC", era:"modern", stats:{PTS:"26.4",REB:"11.0",AST:"9.0","FG%":"58.3"}, ctx:"2021-22 NBA Season — Denver Nuggets MVP", clues:["Won his second consecutive MVP award","Plays for the Denver Nuggets","Serbian center nicknamed The Joker","Drafted 41st overall in 2014"] },
  { player:"Joel Embiid", sport:"🏀 NBA", answer:"EMBIID", era:"modern", stats:{PTS:"33.1",REB:"10.2",AST:"4.2",BLK:"1.7"}, ctx:"2022-23 NBA Season — Philadelphia 76ers MVP", clues:["Won his first MVP award this season","Led the NBA in scoring","Plays for Philadelphia 76ers","From Cameroon, nicknamed The Process"] },
  { player:"Luka Doncic", sport:"🏀 NBA", answer:"LUKA", era:"modern", stats:{PTS:"33.9",REB:"9.2",AST:"9.8","3PM":"4.3"}, ctx:"2023-24 NBA Season — Dallas Mavericks", clues:["Led the NBA in scoring this season","Plays for the Dallas Mavericks","From Ljubljana, Slovenia","Was the EuroLeague MVP at age 19"] },
  // Basketball - Classic
  { player:"Scottie Pippen", sport:"🏀 NBA", answer:"PIPPEN", era:"classic", stats:{PTS:"22.0",REB:"8.7",AST:"5.9",STL:"2.9"}, ctx:"1994 NBA Playoffs — Chicago Bulls (Jordan retired)", clues:["Led the Bulls without Michael Jordan","Finished 5th in MVP voting this year","Won 6 championships with Jordan","Often called the most underrated player ever"] },
  { player:"Dennis Rodman", sport:"🏀 NBA", answer:"RODMAN", era:"classic", stats:{REB:"18.7",PTS:"5.8",STL:"0.8",BLK:"0.5"}, ctx:"1991-92 NBA Season — Detroit Pistons rebounding title", clues:["Led the NBA in rebounding for the 2nd consecutive year","Played for the Detroit Pistons","Won 7 consecutive rebounding titles","Known as The Worm"] },
  { player:"Patrick Ewing", sport:"🏀 NBA", answer:"EWING", era:"classic", stats:{PTS:"28.6",REB:"11.2",BLK:"3.0",AST:"2.4"}, ctx:"1989-90 NBA Season — New York Knicks", clues:["Led the Knicks to the best record in the East","Finished 3rd in MVP voting","Played for the New York Knicks","Jamaican-born center from Georgetown"] },
  { player:"Isiah Thomas", sport:"🏀 NBA", answer:"ISIAH", era:"classic", stats:{PTS:"33.0",REB:"8.0",AST:"8.0",STL:"1.8"}, ctx:"1988 NBA Finals MVP — Detroit Pistons", clues:["Won Finals MVP despite a severe ankle injury","Scored 25 points in one quarter on a bad ankle","Played for the Detroit Pistons","Nicknamed Zeke, led the Bad Boys"] },
  { player:"Dominique Wilkins", sport:"🏀 NBA", answer:"DOMINIQUE", era:"classic", stats:{PTS:"30.3",REB:"6.8",AST:"2.7",STL:"1.3"}, ctx:"1985-86 NBA Season — Atlanta Hawks", clues:["Led the NBA in scoring with 30.3 PPG","Played for the Atlanta Hawks","Nicknamed The Human Highlight Film","Famous for his spectacular dunks"] },
  // Football - Modern
  { player:"Aaron Rodgers", sport:"🏈 NFL", answer:"RODGERS", era:"modern", stats:{YDS:"4643",TD:"48",INT:"6",RTG:"122.5"}, ctx:"2011 NFL Season — Green Bay Packers MVP", clues:["Set the NFL record for passer rating this season","Won his first MVP award","Played for the Green Bay Packers","Won Super Bowl XLV this same year"] },
  { player:"Josh Allen", sport:"🏈 NFL", answer:"ALLEN", era:"modern", stats:{YDS:"4407",TD:"37",INT:"10",RUSH:"763"}, ctx:"2020 NFL Season — Buffalo Bills", clues:["Led Buffalo Bills to their best season in decades","Finished 2nd in MVP voting","Known for his cannon arm and rushing ability","From Firebaugh, California"] },
  { player:"Lamar Jackson", sport:"🏈 NFL", answer:"LAMAR", era:"modern", stats:{YDS:"3127",TD:"36",INT:"6",RUSH:"1206"}, ctx:"2019 NFL Season — Baltimore Ravens MVP", clues:["Won unanimous MVP award this season","Rushed for 1206 yards as a QB","Played for Baltimore Ravens","First player to throw 36 TDs and rush for 1000 yards"] },
  { player:"Travis Kelce", sport:"🏈 NFL", answer:"KELCE", era:"modern", stats:{REC:"1338",YDS:"12030",TD:"92",SB:"4"}, ctx:"Career through 2024 — All-time NFL leader in receiving yards by a tight end", clues:["Has 11 consecutive 1000-yard receiving seasons — an NFL record for a tight end","Won 4 Super Bowls with the Kansas City Chiefs","Holds the all-time NFL record for receiving yards by a tight end","Was named to 9 Pro Bowls in his career"] },
  { player:"Bijan Robinson", sport:"🏈 NFL", answer:"BIJAN", era:"modern", stats:{YDS:"1070",TD:"7",REC:"67",ROUND:"1"}, ctx:"2024 NFL Season — Atlanta Falcons breakout", clues:["Was the first running back drafted in the top 8 picks in over a decade","Ran for over 1000 yards in his first NFL season","Plays for the Atlanta Falcons","Was a Heisman Trophy finalist at the University of Texas"] },
  { player:"Calvin Johnson", sport:"🏈 NFL", answer:"MEGATRON", era:"modern", stats:{REC:"122",YDS:"1964",TD:"5",YPR:"16.1"}, ctx:"2012 NFL Season — Detroit Lions receiving record", clues:["Set the single-season receiving yards record (1964)","Played for the Detroit Lions","Nicknamed Megatron for his size and athleticism","6ft 5in wide receiver who was nearly unstoppable"] },
  // Football - Classic
  { player:"Brett Favre", sport:"🏈 NFL", answer:"FAVRE", era:"classic", stats:{YDS:"4413",TD:"38",INT:"13",RTG:"99.5"}, ctx:"1996 NFL Season — Green Bay Packers MVP", clues:["Won his second consecutive MVP award","Led Green Bay Packers to a Super Bowl win","Known for his gunslinger style","Started 297 consecutive games — an NFL record"] },
  { player:"Steve Young", sport:"🏈 NFL", answer:"YOUNG", era:"classic", stats:{YDS:"325",TD:"6",INT:"0",RTG:"134.8"}, ctx:"Super Bowl XXIX MVP — San Francisco 49ers", clues:["Set the Super Bowl record for TD passes (6) in one game","Won Super Bowl MVP with San Francisco 49ers","Had been in Joe Montana's shadow for years","Great-great-great-grandson of Brigham Young"] },
  // Baseball - Modern
  { player:"Jose Altuve", sport:"⚾ MLB", answer:"ALTUVE", era:"modern", stats:{AVG:".309",HR:"174",SB:"165",GS:"7"}, ctx:"Career highlights — Houston Astros franchise cornerstone", clues:["Has been an All-Star 7 times in his career","Is one of the shortest players in MLB history at 5ft 6in","Led the Astros to multiple World Series titles","Hit over .300 for 7 consecutive seasons"] },
  { player:"Yordan Alvarez", sport:"⚾ MLB", answer:"ALVAREZ", era:"modern", stats:{HR:"37",AVG:".306",RBI:"97",OPS:"1.019"}, ctx:"2022 ALCS MVP — Houston Astros", clues:["Won the ALCS MVP leading to the World Series","Plays for Houston Astros","From Las Tunas, Cuba","One of the most feared hitters in baseball"] },
  { player:"Albert Pujols", sport:"⚾ MLB", answer:"PUJOLS", era:"modern", stats:{HR:"700",AVG:".288",RBI:"2218",GS:"3"}, ctx:"Career totals — One of 4 players in MLB history with 700+ home runs", clues:["One of only 4 players in MLB history to hit 700 home runs","Won 3 NL MVP awards in his career","Hit over .300 in each of his first 10 seasons","Won 2 World Series championships in his career"] },
  { player:"Mike Trout", sport:"⚾ MLB", answer:"TROUT", era:"modern", stats:{HR:"370",AVG:".301",OBP:".414",MVP:"3"}, ctx:"Career through 2024 — Los Angeles Angels", clues:["Has won 3 AL MVP awards despite never making the playoffs","Signed the largest contract in MLB history ($426.5M) in 2019","Led the AL in WAR more times than any other player this century","Hit 45 home runs and stole 30 bases in the same season at age 21"] },
  { player:"Clayton Kershaw", sport:"⚾ MLB", answer:"KERSHAW", era:"modern", stats:{ERA:"1.77",W:"21",SO:"232",WHIP:"0.857"}, ctx:"2014 NL MVP and Cy Young — Los Angeles Dodgers", clues:["Won both the NL MVP and Cy Young award — rare for a pitcher","Had a 1.77 ERA this season","Plays for the Los Angeles Dodgers","From Dallas, Texas, nicknamed The Claw"] },
  { player:"Shohei Ohtani", sport:"⚾ MLB", answer:"OHTANI", era:"modern", stats:{HR:"171",ERA:"2.91",SB:"50",MVP:"2"}, ctx:"Career through 2024 — The two-way phenomenon", clues:["Has won 2 AL MVP awards as both a pitcher AND hitter","Hit 50 home runs and stole 50 bases in the same season in 2023","First player since Babe Ruth to be an elite starter AND elite hitter in the same season","Won AL MVP in 2021 with 46 HRs and a 3.18 ERA — the first unanimous two-way MVP"] },
  { player:"Ronald Acuna Jr.", sport:"⚾ MLB", answer:"ACUNA", era:"modern", stats:{HR:"41",SB:"73",AVG:".337",AGE:"25"}, ctx:"2023 NL MVP Season — Historic 40-70 club", clues:["First player in MLB history to hit 40 HRs and steal 70 bases in one season","Won the NL MVP award unanimously","Became the first player in MLB history to record a 40 HR and 60 SB season","Was named to 5 All-Star teams before age 26"] },
  { player:"Mookie Betts", sport:"⚾ MLB", answer:"MOOKIE", era:"modern", stats:{HR:"220",AVG:".296",SB:"140",GG:"6"}, ctx:"Career highlights — Five-tool superstar", clues:["Won 6 Gold Gloves as one of the best defensive outfielders ever","Won both the AL MVP and a World Series in the same year (2018)","Has hit over 200 home runs and stolen over 100 bases in his career","One of fewer than 10 players in MLB history to hit 20 HR and steal 20 bases in 5 different seasons"] },
  { player:"Freddie Freeman", sport:"⚾ MLB", answer:"FREEMAN", era:"modern", stats:{AVG:".302",HR:"252",RBI:"1114",WS:"2"}, ctx:"Career highlights — Two-franchise cornerstone", clues:["Won World Series championships with both Atlanta and Los Angeles","Won the NL MVP award in 2020","Hit over .300 with 30+ HRs in 6 different seasons","Was a 6-time All-Star and won a Gold Glove at first base"] },
  { player:"Juan Soto", sport:"⚾ MLB", answer:"SOTO", era:"modern", stats:{AVG:".314",HR:"34",RBI:"109",OBP:".465"}, ctx:"2021 MLB Season — Washington Nationals", clues:["Led the NL in OBP with .465","Played for Washington Nationals","From Santo Domingo, Dominican Republic","Known for the Soto Shuffle at the plate"] },
  { player:"Ichiro Suzuki", sport:"⚾ MLB", answer:"ICHIRO", era:"modern", stats:{H:"262",AVG:".372",SB:"36",RBI:"69"}, ctx:"2004 MLB Season — Seattle Mariners, all-time hits record", clues:["Set the all-time single-season hits record (262)","Won both MVP and Gold Glove awards this year","Played for Seattle Mariners","From Toyoyama, Japan — first Japanese position player in MLB"] },
  // Baseball - Classic
  { player:"Roger Clemens", sport:"⚾ MLB", answer:"CLEMENS", era:"classic", stats:{ERA:"1.93",W:"21",SO:"291",WHIP:"0.970"}, ctx:"1997 AL Cy Young Season — Toronto Blue Jays", clues:["Won his 5th Cy Young Award this season","Struck out 291 batters","Played for the Toronto Blue Jays","Won 7 Cy Young Awards in total"] },
  { player:"Frank Thomas", sport:"⚾ MLB", answer:"THOMAS", era:"classic", stats:{HR:"41",AVG:".323",RBI:"128",OBP:".426"}, ctx:"1994 AL MVP Season — Chicago White Sox", clues:["Won his second consecutive AL MVP","Played for Chicago White Sox","Nicknamed The Big Hurt","6ft 5in first baseman with elite plate discipline"] },
  { player:"Jeff Bagwell", sport:"⚾ MLB", answer:"BAGWELL", era:"classic", stats:{HR:"39",AVG:".368",RBI:"116",OPS:"1.201"}, ctx:"1994 NL MVP Season — Houston Astros", clues:["Won the NL MVP in the strike-shortened season","Had an OPS over 1.200","Played for the Houston Astros","Known for his unusual wide batting stance"] },
  { player:"Tony Gwynn", sport:"⚾ MLB", answer:"GWYNN", era:"classic", stats:{AVG:".394",HR:"12",H:"165",SO:"19"}, ctx:"1994 MLB Season — San Diego Padres", clues:["Hit .394 — closest to .400 since Ted Williams","Struck out only 19 times all season","Played for the San Diego Padres","Won 8 batting titles in his career"] },
  { player:"Nolan Ryan", sport:"⚾ MLB", answer:"RYAN", era:"classic", stats:{ERA:"3.20",SO:"301",W:"16",NH:"1"}, ctx:"1990 MLB Season — Texas Rangers", clues:["Threw his 6th career no-hitter at age 43","Still threw over 95 mph at 43 years old","Played for the Texas Rangers","All-time strikeout leader with 5714 Ks"] },
  // Soccer - Modern
  { player:"Kylian Mbappe", sport:"⚽ Soccer", answer:"MBAPPE", era:"modern", stats:{G:"8",AGE:"19",WC:"1",GOALS:"260"}, ctx:"2018 FIFA World Cup — France", clues:["Became only the second teenager ever to score in a World Cup Final (after Pele in 1958)","Won the World Cup at just 19 years old","Scored 8 goals in his first 2 World Cups combined","Moved to Real Madrid in 2024 after breaking the all-time PSG scoring record"] },
  { player:"Erling Haaland", sport:"⚽ Soccer", answer:"HAALAND", era:"modern", stats:{G:"36",GpG:"1.03",TREB:"1",AGE:"22"}, ctx:"2022-23 Premier League — Record-breaking season", clues:["Set the Premier League single-season goals record at 36 goals","Scored over 1 goal per game in his career — the best ratio in top-flight history","Won the Treble with Manchester City (Premier League, FA Cup, Champions League)","Scored 5 goals in a single Champions League game — twice"] },
  { player:"Robert Lewandowski", sport:"⚽ Soccer", answer:"LEWANDOWSKI", era:"modern", stats:{G:"41",AST:"7",APP:"29",MIN:"2458"}, ctx:"2020-21 Bundesliga Season — Bayern Munich", clues:["Broke Gerd Muller's 49-year-old Bundesliga scoring record","Scored 41 Bundesliga goals in one season","Plays for Bayern Munich","Polish striker, won the UEFA Best Player award"] },
  { player:"Kevin De Bruyne", sport:"⚽ Soccer", answer:"DE BRUYNE", era:"modern", stats:{G:"6",AST:"20",APP:"36",MIN:"2843"}, ctx:"2019-20 Premier League Season — Manchester City", clues:["Set the Premier League assist record (20) in one season","Won PFA Players Player of the Year","Plays for Manchester City","Belgian midfielder widely seen as the best in the world"] },
  { player:"Luis Suarez", sport:"⚽ Soccer", answer:"SUAREZ", era:"modern", stats:{G:"31",AST:"16",APP:"33",MIN:"2818"}, ctx:"2013-14 Premier League Season — Liverpool", clues:["Won the PFA Players Player of the Year","Finished 2nd in Ballon d'Or voting","Played for Liverpool","Uruguayan striker known for his controversy and brilliance"] },
  { player:"Mohamed Salah", sport:"⚽ Soccer", answer:"SALAH", era:"modern", stats:{G:"32",AST:"12",APP:"36",MIN:"3013"}, ctx:"2017-18 Premier League Season — Liverpool", clues:["Set the Premier League scoring record (32 in 38 games)","Won the PFA Players Player of the Year","Plays for Liverpool","Egyptian forward nicknamed The Egyptian King"] },
  { player:"Harry Kane", sport:"⚽ Soccer", answer:"KANE", era:"modern", stats:{G:"30",AST:"3",APP:"37",MIN:"3102"}, ctx:"2017-18 Premier League Season — Tottenham Hotspur", clues:["Won the Premier League Golden Boot with 30 goals","Played for Tottenham Hotspur","All-time England international top scorer","Now plays for Bayern Munich"] },
  // Soccer - Classic
  { player:"Michel Platini", sport:"⚽ Soccer", answer:"PLATINI", era:"classic", stats:{G:"9",AST:"4",APP:"5",MIN:"450"}, ctx:"UEFA Euro 1984 — France", clues:["Scored 9 goals in 5 games — tournament record","Won the tournament with France","Won 3 consecutive Ballon d'Or awards","French midfielder who later became UEFA president"] },
  { player:"Marco van Basten", sport:"⚽ Soccer", answer:"VAN BASTEN", era:"classic", stats:{G:"5",AST:"2",APP:"5",MIN:"423"}, ctx:"UEFA Euro 1988 — Netherlands", clues:["Scored a volley from outside the box in the Euro 1988 final","Won the tournament with Netherlands","Won 3 Ballon d'Or awards","His career ended early due to ankle injuries"] },
  { player:"Johan Cruyff", sport:"⚽ Soccer", answer:"CRUYFF", era:"classic", stats:{G:"14",AST:"8",APP:"14",MIN:"1186"}, ctx:"1973-74 Season — Ajax and Netherlands", clues:["Won the Ballon d'Or for the third time this year","Led Netherlands to the World Cup Final","Invented the Cruyff Turn","Dutch Total Football pioneer"] },
  // Tennis - Modern
  { player:"Jannik Sinner", sport:"🎾 Tennis", answer:"SINNER", era:"modern", stats:{W:"73",L:"6",TITLES:"7",GS:"1"}, ctx:"2024 ATP Season — Australian Open champion", clues:["Won his first Grand Slam at the Australian Open","Ended the year ranked World No. 1","From San Candido, Italy","First Italian man to win a Grand Slam"] },
  { player:"Carlos Alcaraz", sport:"🎾 Tennis", answer:"ALCARAZ", era:"modern", stats:{W:"57",L:"11",TITLES:"6",GS:"2"}, ctx:"2023 ATP Season — Wimbledon and US Open", clues:["Won Wimbledon and US Open this year","Became World No. 1 at age 19","From El Palmar, Spain","Trained under Juan Carlos Ferrero"] },
  { player:"Daniil Medvedev", sport:"🎾 Tennis", answer:"MEDVEDEV", era:"modern", stats:{W:"65",L:"17",TITLES:"5",GS:"1"}, ctx:"2021 US Open — First Grand Slam title", clues:["Won his first Grand Slam at the US Open","Reached World No. 1 ranking","From Moscow, Russia","Defeated Djokovic in the final"] },
  { player:"Andy Murray", sport:"🎾 Tennis", answer:"MURRAY", era:"modern", stats:{W:"78",L:"14",TITLES:"9",GS:"2"}, ctx:"2015 ATP Season — World No. 1", clues:["Won Wimbledon and US Open in his career","Reached World No. 1 this year","From Dunblane, Scotland","First British man to win Wimbledon since 1936"] },
  { player:"Ashleigh Barty", sport:"🎾 Tennis", answer:"BARTY", era:"modern", stats:{W:"83",L:"11",TITLES:"12",GS:"3"}, ctx:"2021 WTA Season — Wimbledon champion", clues:["Won Wimbledon this year while ranked World No. 1","Won 3 Grand Slams in total","Retired at age 25 at the peak of her powers","From Ipswich, Queensland, Australia"] },
  { player:"Iga Swiatek", sport:"🎾 Tennis", answer:"SWIATEK", era:"modern", stats:{W:"74",L:"8",TITLES:"8",GS:"2"}, ctx:"2022 WTA Season — World No. 1 dominant year", clues:["Won 2 Grand Slams this year including the French Open","Had a 37-match winning streak","From Warsaw, Poland","Known as the Queen of Clay"] },
  { player:"Naomi Osaka", sport:"🎾 Tennis", answer:"OSAKA", era:"modern", stats:{W:"55",L:"12",TITLES:"4",GS:"1"}, ctx:"2020 US Open — Second Grand Slam title", clues:["Won the US Open wearing masks honoring Black victims","Ranked World No. 1 after this win","Japanese-American player","Won 4 Grand Slams before age 24"] },
  // Tennis - Classic
  { player:"Boris Becker", sport:"🎾 Tennis", answer:"BECKER", era:"classic", stats:{W:"82",L:"9",TITLES:"10",GS:"1"}, ctx:"1986 ATP Season — Three Grand Slam finals", clues:["Won Wimbledon for the second consecutive year","Reached 3 Grand Slam finals this year","German player nicknamed Boom Boom","Was the youngest Wimbledon champion at 17"] },
  { player:"Jim Courier", sport:"🎾 Tennis", answer:"COURIER", era:"classic", stats:{W:"73",L:"15",TITLES:"6",GS:"2"}, ctx:"1992 ATP Season — Two Grand Slams", clues:["Won the Australian and French Open this year","Ranked World No. 1","American player known for his aggressive baseline game","Beat Andre Agassi in the French Open final"] },
  { player:"Arantxa Sanchez Vicario", sport:"🎾 Tennis", answer:"ARANTXA", era:"classic", stats:{W:"79",L:"13",TITLES:"9",GS:"1"}, ctx:"1994 WTA Season — US Open and French Open", clues:["Won 2 Grand Slams in one year","Spanish player nicknamed The Barcelona Bumblebee","Won 4 Grand Slams in total","Beat Steffi Graf in the French Open final"] },
  // Golf - Modern
  { player:"Rory McIlroy", sport:"⛳ Golf", answer:"MCILROY", era:"modern", stats:{WINS:"5",MAJORS:"2",AVG:"68.83",EARN:"$8.3M"}, ctx:"2014 PGA Tour Season — Two majors", clues:["Won The Open Championship and PGA Championship this year","Won the FedEx Cup this year","From Holywood, County Down, Northern Ireland","Won 4 majors before age 26"] },
  { player:"Dustin Johnson", sport:"⛳ Golf", answer:"DUSTIN", era:"modern", stats:{WINS:"8",MAJORS:"1",AVG:"69.40",EARN:"$9.4M"}, ctx:"2020 PGA Tour Season — Masters champion", clues:["Won The Masters by 5 shots — setting the record score","Set the 72-hole scoring record at Augusta (-20)","From Columbia, South Carolina","Won 2 major championships in his career"] },
  { player:"Brooks Koepka", sport:"⛳ Golf", answer:"KOEPKA", era:"modern", stats:{WINS:"2",MAJORS:"2",AVG:"70.01",EARN:"$4.9M"}, ctx:"2018 PGA Tour Season — US Open back-to-back", clues:["Won the US Open for the second consecutive year","Won 4 major championships in his career","From West Palm Beach, Florida","Joined LIV Golf in 2022"] },
  { player:"Jordan Spieth", sport:"⛳ Golf", answer:"SPIETH", era:"modern", stats:{WINS:"5",MAJORS:"2",AVG:"68.91",EARN:"$12.0M"}, ctx:"2015 PGA Tour Season — Masters and US Open", clues:["Won The Masters and US Open in the same year","Led every major this year at some point","From Dallas, Texas","Won 3 major championships before age 24"] },
  // Golf - Classic
  { player:"Nick Faldo", sport:"⛳ Golf", answer:"FALDO", era:"classic", stats:{WINS:"4",MAJORS:"2",AVG:"69.90",YEAR:"1990"}, ctx:"1990 PGA Tour Season — Masters and British Open", clues:["Won The Masters and The Open Championship this year","Won 6 major championships in total","From Welwyn Garden City, England","Rebuilt his swing from scratch with coach David Leadbetter"] },
  { player:"Greg Norman", sport:"⛳ Golf", answer:"NORMAN", era:"classic", stats:{WINS:"3",MAJORS:"1",AVG:"69.10",YEAR:"1993"}, ctx:"1993 PGA Tour Season — British Open", clues:["Won The Open Championship this year by 2 shots","Known for nearly winning many majors he should have won","From Mount Isa, Queensland, Australia","Nicknamed The Great White Shark"] },
  { player:"Seve Ballesteros", sport:"⛳ Golf", answer:"SEVE", era:"classic", stats:{WINS:"4",MAJORS:"1",AVG:"70.20",YEAR:"1984"}, ctx:"1984 PGA Tour — British Open at St Andrews", clues:["Won The Open Championship at the home of golf","Won 5 major championships in his career","From Pedrena, Spain","Pioneered European golf as a global force"] },
  { player:"Lee Trevino", sport:"⛳ Golf", answer:"TREVINO", era:"classic", stats:{WINS:"4",MAJORS:"2",EARN:"$3.2M",YEAR:"1971"}, ctx:"1971 PGA Tour Season — Three Opens in three weeks", clues:["Won the US Open, Canadian Open, and British Open in the same month","Won 6 major championships in total","From Dallas, Texas","Nicknamed Super Mex"] },
  // Hockey - Modern
  { player:"Connor McDavid", sport:"🏒 NHL", answer:"MCDAVID", era:"modern", stats:{G:"44",AST:"79",PTS:"123",PIM:"44"}, ctx:"2021-22 NHL Season — Edmonton Oilers MVP", clues:["Won the Hart Trophy as league MVP","Led the NHL in scoring","Plays for Edmonton Oilers","Considered the best player in the world"] },
  { player:"Nathan MacKinnon", sport:"🏒 NHL", answer:"MACKINNON", era:"modern", stats:{G:"42",AST:"67",PTS:"109",PIM:"44"}, ctx:"2022-23 NHL Season — Colorado Avalanche MVP", clues:["Won the Hart Trophy as league MVP","Plays for Colorado Avalanche","From Cole Harbour, Nova Scotia — same hometown as Crosby","Won the Stanley Cup in 2022"] },
  { player:"Erik Karlsson", sport:"🏒 NHL", answer:"KARLSSON", era:"modern", stats:{G:"25",AST:"75",PTS:"100","PM":"-1"}, ctx:"2022-23 NHL Season — San Jose Sharks", clues:["Became the first defenseman to score 100 points since Brian Leetch","Played for San Jose Sharks","Swedish defenseman nicknamed EK65","Won 2 Norris Trophies as best defenseman"] },
  { player:"Nikita Kucherov", sport:"🏒 NHL", answer:"KUCHEROV", era:"modern", stats:{G:"41",AST:"87",PTS:"128",PIM:"30"}, ctx:"2018-19 NHL Season — Tampa Bay Lightning MVP", clues:["Won the Hart Trophy and Art Ross Trophy","Set a Lightning franchise points record","Plays for Tampa Bay Lightning","Russian winger from Maykop"] },
  { player:"Jonathan Toews", sport:"🏒 NHL", answer:"TOEWS", era:"modern", stats:{G:"28",AST:"31",PTS:"59",PIM:"29"}, ctx:"2010 Stanley Cup Finals MVP — Chicago Blackhawks", clues:["Won the Conn Smythe as playoff MVP","Played for Chicago Blackhawks","Won 3 Stanley Cups as captain","From Winnipeg, Manitoba — nicknamed Captain Serious"] },
  // Hockey - Classic
  { player:"Mark Messier", sport:"🏒 NHL", answer:"MESSIER", era:"classic", stats:{G:"37",AST:"72",PTS:"107",PIM:"76"}, ctx:"1991-92 NHL Season — New York Rangers", clues:["Won the Hart Trophy as league MVP","Played for New York Rangers","Won 6 Stanley Cups in his career","Guaranteed a Rangers win in 1994 playoffs and delivered"] },
  { player:"Paul Coffey", sport:"🏒 NHL", answer:"COFFEY", era:"classic", stats:{G:"48",AST:"90",PTS:"138","PM":"+12"}, ctx:"1985-86 NHL Season — Edmonton Oilers", clues:["Set the record for goals by a defenseman (48)","Played for Edmonton Oilers alongside Gretzky","Won 4 Stanley Cups in his career","Scored 48 goals in a season — the record for a defenseman"] },
  { player:"Ray Bourque", sport:"🏒 NHL", answer:"BOURQUE", era:"classic", stats:{G:"21",AST:"73",PTS:"94","PM":"+19"}, ctx:"1993-94 NHL Season — Boston Bruins", clues:["Won his 5th Norris Trophy as best defenseman","Played for Boston Bruins his entire career before Colorado","Finally won the Stanley Cup in his last season","Won 5 Norris Trophies total"] },
  { player:"Teemu Selanne", sport:"🏒 NHL", answer:"SELANNE", era:"classic", stats:{G:"76",AST:"56",PTS:"132",PIM:"45"}, ctx:"1992-93 NHL Season — Winnipeg Jets Rookie record", clues:["Set the rookie scoring record with 76 goals","Shattered the previous rookie record by 23 goals","Played for the Winnipeg Jets","Finnish Winger nicknamed The Finnish Flash"] },
];

// ─── MEDIUM (45 puzzles) ──────────────────────────────────────────────────────
const MEDIUM = [
  { player:"Kevin Durant", sport:"🏀 NBA", answer:"DURANT", era:"modern", stats:{PTS:"34.3",REB:"8",AST:"5","FG%":"53.7"}, ctx:"2012 NBA Finals MVP — Oklahoma City Thunder", clues:["Won his first Finals MVP this year","Was playing for Oklahoma City","Later joined Golden State Warriors","Nickname: Slim Reaper"] },
  { player:"Kawhi Leonard", sport:"🏀 NBA", answer:"KAWHI", era:"modern", stats:{PTS:"26.6",REB:"9.3",AST:"3.3",STL:"1.8"}, ctx:"2019 NBA Finals MVP — Toronto Raptors", clues:["Won Finals MVP with Toronto Raptors","Ended Golden State Warriors dynasty","Known for his huge hands and quiet personality","Made The Shot vs Philadelphia in 2019"] },
  { player:"Dirk Nowitzki", sport:"🏀 NBA", answer:"NOWITZKI", era:"modern", stats:{PTS:"26",REB:"9.7",AST:"2.5","FG%":"47.9"}, ctx:"2011 NBA Finals MVP — Dallas Mavericks", clues:["Won Finals MVP with Dallas","Defeated LeBron James in this series","First European NBA Finals MVP","German-born, played 21 years in Dallas"] },
  { player:"Dwyane Wade", sport:"🏀 NBA", answer:"WADE", era:"modern", stats:{PTS:"34.7",REB:"7.8",AST:"3.8",STL:"2.7"}, ctx:"2006 NBA Finals MVP — Miami Heat", clues:["Won Finals MVP with Miami Heat","Averaged 34.7 PPG in the series","His team came back from 2-0 down","Nickname: Flash"] },
  { player:"Giannis Antetokounmpo", sport:"🏀 NBA", answer:"GIANNIS", era:"modern", stats:{PTS:"35.2",REB:"13.2",AST:"5",BLK:"1.8"}, ctx:"2021 NBA Finals MVP — Milwaukee Bucks", clues:["Won Finals MVP with Milwaukee Bucks","Averaged 35.2 PPG in the series","From Greece","Nickname: The Greek Freak"] },
  { player:"Hakeem Olajuwon", sport:"🏀 NBA", answer:"HAKEEM", era:"classic", stats:{PTS:"26.9",REB:"11.9",AST:"3.6",BLK:"3.7"}, ctx:"1994 NBA Finals MVP — Houston Rockets", clues:["Won Finals MVP without Michael Jordan who had retired","Played for the Houston Rockets","Born in Lagos, Nigeria","Famous for his Dream Shake move"] },
  { player:"Allen Iverson", sport:"🏀 NBA", answer:"IVERSON", era:"modern", stats:{PTS:"31.1",AST:"4.6",STL:"2.5",REB:"3.8"}, ctx:"2001 NBA Season — MVP and scoring champion", clues:["Won the MVP award this season","Led the Philadelphia 76ers to the Finals","Known for his crossover dribble","Nicknamed The Answer"] },
  { player:"Charles Barkley", sport:"🏀 NBA", answer:"BARKLEY", era:"classic", stats:{PTS:"25.6",REB:"12.2",AST:"5.1","FG%":"52"}, ctx:"1993 NBA Season — Phoenix Suns MVP", clues:["Won the NBA MVP award this season","Played for Phoenix Suns","Nicknamed The Round Mound of Rebound","Said he was not a role model in a famous Nike ad"] },
  { player:"Emmitt Smith", sport:"🏈 NFL", answer:"EMMITT", era:"classic", stats:{CAR:"373",YDS:"1773",TD:"25",YPC:"4.7"}, ctx:"1995 NFL Season — Dallas Cowboys", clues:["Won the NFL rushing title this season","Won 3 Super Bowls with Dallas Cowboys","All-time NFL rushing yards leader","His number 22 is retired by the Cowboys"] },
  { player:"Randy Moss", sport:"🏈 NFL", answer:"MOSS", era:"modern", stats:{REC:"23",YDS:"1493",TD:"23",YPR:"15.0"}, ctx:"2007 NFL Season — New England Patriots", clues:["Set the single-season TD reception record","His team went 16-0 that regular season","Played for New England Patriots","Set the single-season receiving touchdown record (23)"] },
  { player:"Lawrence Taylor", sport:"🏈 NFL", answer:"TAYLOR", era:"classic", stats:{SCK:"20.5",FF:"4",INT:"2",TD:"2"}, ctx:"1986 NFL Season — New York Giants MVP", clues:["Won NFL MVP as a defensive player (very rare)","Played for New York Giants","Changed how the linebacker position was played","Wore number 56"] },
  { player:"Barry Sanders", sport:"🏈 NFL", answer:"SANDERS", era:"classic", stats:{CAR:"335",YDS:"2053",TD:"11",YPC:"6.1"}, ctx:"1997 NFL Season — Detroit Lions", clues:["Rushed for 2053 yards this season","Won the NFL MVP award","Played for Detroit Lions","Retired suddenly at his peak in 1999"] },
  { player:"Marshall Faulk", sport:"🏈 NFL", answer:"FAULK", era:"modern", stats:{REC:"87",YDS:"1048",RUSH:"1381",TD:"26"}, ctx:"2000 NFL Season — St. Louis Rams MVP", clues:["Won NFL MVP with The Greatest Show on Turf","Had both 1000 rushing and 1000 receiving yards","Played for St. Louis Rams","Won Super Bowl with the Rams"] },
  { player:"Randy Johnson", sport:"⚾ MLB", answer:"RANDY", era:"modern", stats:{ERA:"2.48",SO:"372",W:"24",WHIP:"0.90"}, ctx:"2001 World Series MVP — Arizona Diamondbacks", clues:["Won World Series MVP with Arizona","Struck out 372 batters this season","Known as The Big Unit","Left-handed pitcher standing 6ft 10in"] },
  { player:"Pedro Martinez", sport:"⚾ MLB", answer:"PEDRO", era:"modern", stats:{ERA:"2.07",SO:"313",W:"23",WHIP:"0.923"}, ctx:"1999 MLB Season — Boston Red Sox", clues:["Posted a 0.737 WHIP — the lowest in MLB history for a qualified starter","Won the Cy Young Award this year","Played for Boston Red Sox","From the Dominican Republic"] },
  { player:"Mike Piazza", sport:"⚾ MLB", answer:"PIAZZA", era:"classic", stats:{HR:"40",AVG:".362",RBI:"124",OPS:"1.070"}, ctx:"1997 MLB Season — Los Angeles Dodgers", clues:["Holds the career home run record for catchers (427)","Played for the Los Angeles Dodgers","Later hit an emotional HR after 9/11 with the Mets","Was a 62nd round draft pick"] },
  { player:"Greg Maddux", sport:"⚾ MLB", answer:"MADDUX", era:"classic", stats:{ERA:"1.56",W:"19",SO:"156",WHIP:"0.896"}, ctx:"1994 MLB Season — Atlanta Braves", clues:["Had an ERA of 1.56 this season","Won the NL Cy Young award this year","Played for Atlanta Braves","Won 4 consecutive Cy Young awards"] },
  { player:"Mariano Rivera", sport:"⚾ MLB", answer:"RIVERA", era:"modern", stats:{ERA:"1.38",SV:"53",WHIP:"0.768",SO:"77"}, ctx:"2004 MLB Season — New York Yankees", clues:["Had an ERA of 1.38 as a closer","Led MLB in saves","Played for New York Yankees","Only player unanimously elected to the Hall of Fame"] },
  { player:"Thierry Henry", sport:"⚽ Soccer", answer:"HENRY", era:"modern", stats:{G:"30",AST:"9",APP:"37",MIN:"3105"}, ctx:"2003-04 Premier League — Arsenal Invincibles", clues:["His team went unbeaten the entire league season","Arsenal were nicknamed The Invincibles","Won PFA Players Player of the Year","Set the Premier League single-season scoring record at the time"] },
  { player:"Zinedine Zidane", sport:"⚽ Soccer", answer:"ZIDANE", era:"classic", stats:{G:"5",AST:"3",APP:"7",MIN:"630"}, ctx:"1998 FIFA World Cup Final — France vs Brazil", clues:["Scored twice in the World Cup Final","France won their first World Cup","The opponent was Brazil","He later managed Real Madrid to 3 UCL titles"] },
  { player:"Ronaldinho", sport:"⚽ Soccer", answer:"RONALDINHO", era:"modern", stats:{G:"22",AST:"14",APP:"36",MIN:"2880"}, ctx:"2004-05 La Liga Season — FC Barcelona Ballon d'Or", clues:["Won the Ballon d'Or this season","Won the Ballon d'Or in 2005 while at Barcelona","Played for FC Barcelona","Brazilian playmaker known for his dribbling and smile"] },
  { player:"Xavi Hernandez", sport:"⚽ Soccer", answer:"XAVI", era:"modern", stats:{G:"3",AST:"12",PASS:"90%",APP:"16"}, ctx:"2010 FIFA World Cup — Spain World Champions", clues:["Spain won their first World Cup","He was named player of the tournament","Played for the Spanish national team","Barcelona midfielder who was a master of possession"] },
  { player:"Andres Iniesta", sport:"⚽ Soccer", answer:"INIESTA", era:"modern", stats:{G:"1",AST:"2",APP:"7",MIN:"611"}, ctx:"2010 FIFA World Cup Final — Spain vs Netherlands", clues:["Scored the winning goal in the World Cup Final","Won the Golden Ball award","Played for Spain and FC Barcelona","His goal in extra time gave Spain their first World Cup"] },
  { player:"Novak Djokovic", sport:"🎾 Tennis", answer:"DJOKOVIC", era:"modern", stats:{W:"70",L:"6",TITLES:"10",GS:"3"}, ctx:"2015 ATP Season — Most dominant year", clues:["Won 3 Grand Slams this year","Won 6 Masters 1000 titles this year","From Serbia","Won the ATP World Tour Finals"] },
  { player:"Monica Seles", sport:"🎾 Tennis", answer:"SELES", era:"classic", stats:{W:"87",L:"3",GS:"3",TITLES:"9"}, ctx:"1991 WTA Season — Dominant year", clues:["Won 3 Grand Slams this year","Was World No. 1 at just 17 years old","Born in Yugoslavia, later became American","Was stabbed on court in 1993 in a shocking attack"] },
  { player:"Phil Mickelson", sport:"⛳ Golf", answer:"PHIL", era:"modern", stats:{WINS:"4",MAJORS:"1",AVG:"69.1",EARN:"$4.7M"}, ctx:"2004 PGA Tour Season — First Masters title", clues:["Won his first Masters title this year","Had been called the best player without a major","Left-handed golfer nicknamed Lefty","Won by one shot at Augusta"] },
  { player:"Annika Sorenstam", sport:"⛳ Golf", answer:"ANNIKA", era:"modern", stats:{WINS:"11",MAJORS:"2",AVG:"68.70",EARN:"$2.8M"}, ctx:"2001 LPGA Season — Won 11 tournaments, first woman to shoot 59", clues:["Won 11 LPGA tournaments this season","Shot a 59 — the first woman to do so in LPGA history","From Sweden","Won more LPGA majors (10) than any other player in history"] },
  { player:"Mario Lemieux", sport:"🏒 NHL", answer:"LEMIEUX", era:"classic", stats:{G:"69",AST:"114",PTS:"183",PIM:"54"}, ctx:"1988-89 NHL Season — Pittsburgh Penguins", clues:["Scored 183 points in this season","Played for Pittsburgh Penguins","Nicknamed Super Mario","Battled cancer mid-career but returned"] },
  { player:"Patrick Roy", sport:"🏒 NHL", answer:"ROY", era:"classic", stats:{GAA:"1.70","SV%":".934",W:"16",SO:"3"}, ctx:"1993 Stanley Cup Finals MVP — Montreal Canadiens", clues:["Won Conn Smythe Trophy as playoff MVP","Montreal Canadiens won the Stanley Cup","Won 4 Stanley Cups and 3 Conn Smythe Trophies as playoff MVP","His last name is pronounced Wah not Roy"] },
  { player:"Jaromir Jagr", sport:"🏒 NHL", answer:"JAGR", era:"classic", stats:{G:"62",AST:"87",PTS:"149",PIM:"96"}, ctx:"1995-96 NHL Season — Pittsburgh Penguins", clues:["Scored 149 points this season","Played for Pittsburgh Penguins alongside Lemieux","Czech player with a famous mullet","Won 2 Stanley Cups with Pittsburgh"] },
  { player:"Steve Yzerman", sport:"🏒 NHL", answer:"YZERMAN", era:"classic", stats:{G:"65",AST:"90",PTS:"155",PIM:"58"}, ctx:"1988-89 NHL Season — Detroit Red Wings", clues:["Scored 155 points in this season","Played for Detroit Red Wings his entire career","Won 3 Stanley Cups as captain","Nicknamed Stevie Y"] },
  // Basketball - Modern
  { player:"Damian Lillard", sport:"🏀 NBA", answer:"LILLARD", era:"modern", stats:{PTS:"37.5",AST:"9.9","3PT":"13",BUZZ:"1"}, ctx:"2019 NBA Playoffs — Series-winner vs Oklahoma City", clues:["Hit a 37-foot buzzer-beater to eliminate OKC — pointing to his watch afterward","Averaged 37.5 PPG and 9.9 APG in that playoff series","Scored 60+ points in a game to force overtime and eliminate a team himself","Has averaged over 25 PPG for 8 consecutive seasons"] },
  { player:"Paul George", sport:"🏀 NBA", answer:"GEORGE", era:"modern", stats:{PTS:"20.7",REB:"5.9",AST:"3.9",DPOY:"1"}, ctx:"Career highlights — Perennial All-Star", clues:["Broke his leg in a gruesome compound fracture during a 2014 USA Basketball scrimmage","Came back the following season better than ever — finished top 3 in MVP voting","Won Defensive Player of the Year in 2019","Has averaged over 20 PPG in 10 different NBA seasons"] },
  { player:"Jimmy Butler", sport:"🏀 NBA", answer:"BUTLER", era:"modern", stats:{PTS:"26.2",REB:"9.8",AST:"8.8",STL:"2.1"}, ctx:"2020 NBA Finals — Miami Heat", clues:["Led the Heat to the NBA Finals as an underdog","Averaged 26.2 PPG in the Finals","Plays for Miami Heat","Was homeless as a teenager and bounced between families"] },
  { player:"Devin Booker", sport:"🏀 NBA", answer:"BOOKER", era:"modern", stats:{PTS:"70",REB:"3",AST:"6",YEAR:"2017"}, ctx:"March 24, 2017 — Phoenix Suns vs Boston Celtics", clues:["Scored 70 points — the 5th highest single game score ever","Was only 20 years old at the time","Plays for Phoenix Suns","Son of former NBA player Melvin Booker"] },
  { player:"Trae Young", sport:"🏀 NBA", answer:"TRAE", era:"modern", stats:{PTS:"28.8",AST:"9.4",REB:"3.9","3PM":"3.3"}, ctx:"2021 NBA Playoffs — Atlanta Hawks Eastern Conference Finals", clues:["Led Atlanta Hawks to the Eastern Conference Finals as an underdog","Silenced New York Knicks crowd with his performances","Plays for Atlanta Hawks","From Norman, Oklahoma — was traded on draft night for Luka Doncic"] },
  { player:"Ja Morant", sport:"🏀 NBA", answer:"MORANT", era:"modern", stats:{PTS:"27.4",AST:"8.1",REB:"5.9",STL:"1.1"}, ctx:"2021-22 NBA Season — Memphis Grizzlies Most Improved", clues:["Won the Most Improved Player award","Led Memphis Grizzlies to 2nd seed in the West","From Dalzell, South Carolina","Known for his explosive athleticism and highlight dunks"] },
  { player:"Jayson Tatum", sport:"🏀 NBA", answer:"TATUM", era:"modern", stats:{PTS:"26.9",REB:"8.0",AST:"4.6","3PM":"3.0"}, ctx:"2022 NBA Eastern Conference Finals — Boston Celtics", clues:["Led Celtics to the NBA Finals this year","Won the Eastern Conference Finals MVP","Plays for Boston Celtics","From St. Louis, Missouri — mentored by Kobe Bryant"] },
  // Basketball - Classic
  { player:"Reggie Miller", sport:"🏀 NBA", answer:"MILLER", era:"classic", stats:{PTS:"23.1",REB:"2.9",AST:"2.9","3PM":"3.5"}, ctx:"1994 NBA Playoffs — Indiana Pacers vs New York Knicks", clues:["Scored 25 points in 18 seconds to beat the Knicks","Had a famous feud with Spike Lee courtside","Played for Indiana Pacers his entire career","Brother of WNBA legend Cheryl Miller"] },
  { player:"Tim Duncan", sport:"🏀 NBA", answer:"DUNCAN", era:"classic", stats:{PTS:"25.5",REB:"12.9",BLK:"2.4",AST:"3.7"}, ctx:"2002-03 NBA Season — San Antonio Spurs MVP", clues:["Won the MVP award for the second consecutive year","Won 3 of his 5 championships this decade","Played for San Antonio Spurs his entire career","Nicknamed The Big Fundamental"] },
  { player:"Chris Paul", sport:"🏀 NBA", answer:"PAUL", era:"modern", stats:{PTS:"22.8",AST:"11.6",STL:"2.7",REB:"4.8"}, ctx:"2007-08 NBA Season — New Orleans Hornets", clues:["Led the NBA in assists and steals this season","Finished 3rd in MVP voting","Played for New Orleans Hornets","Nicknamed CP3 — considered one of the greatest point guards ever"] },
  // Football - Modern
  { player:"Rob Gronkowski", sport:"🏈 NFL", answer:"GRONK", era:"modern", stats:{REC:"621",YDS:"9286",TD:"92",SB:"4"}, ctx:"Career — New England Patriots and Tampa Bay Buccaneers", clues:["Retired twice and came back both times to win more Super Bowls","Won 4 Super Bowls with the most receiving TDs ever by a tight end","Caught 90+ touchdowns in his career — the most ever by a tight end","Had 5 seasons with 10+ receiving touchdowns — more than any TE in history"] },
  { player:"Odell Beckham Jr.", sport:"🏈 NFL", answer:"OBJ", era:"modern", stats:{YDS:"1305",TD:"12",CATCH:"1-hand",YEAR:"2014"}, ctx:"November 23, 2014 — New York Giants vs Dallas Cowboys", clues:["Made a one-handed catch while falling backwards — voted play of the decade","Was reaching back behind his body while being held by the cornerback","Had been in the NFL for less than 2 months at the time of the catch","Set the NFL record for fastest player to reach 200 career receptions"] },
  { player:"Adrian Peterson", sport:"🏈 NFL", answer:"PETERSON", era:"modern", stats:{CAR:"348",YDS:"2097",TD:"12",YPC:"6.0"}, ctx:"2012 NFL Season — Minnesota Vikings MVP", clues:["Rushed for 2097 yards — second most in NFL history","Won the NFL MVP award","Played for Minnesota Vikings","Came back from a torn ACL in just 9 months to have this season"] },
  { player:"Von Miller", sport:"🏈 NFL", answer:"VON", era:"modern", stats:{SCK:"2.5",FF:"2",INT:"0",YEAR:"2016"}, ctx:"Super Bowl 50 MVP — Denver Broncos vs Carolina Panthers", clues:["Won Super Bowl MVP with 2.5 sacks","Played for Denver Broncos","Won 2 Super Bowls in his career","His 2.5 sacks forced 2 fumbles in this game"] },
  { player:"Khalil Mack", sport:"🏈 NFL", answer:"MACK", era:"modern", stats:{SCK:"18.5",FF:"5",INT:"1",TD:"4"}, ctx:"2015 NFL Season — Oakland Raiders Defensive MVP", clues:["Won the NFL Defensive Player of the Year award","Had 18.5 sacks this season","Played for Oakland Raiders","Was traded to Chicago Bears in a blockbuster deal"] },
  // Baseball - Modern
  { player:"Jacob deGrom", sport:"⚾ MLB", answer:"DEGROM", era:"modern", stats:{ERA:"1.70",W:"10",SO:"255",WHIP:"0.912"}, ctx:"2018 NL Cy Young — New York Mets", clues:["Won the NL Cy Young despite only 10 wins","Had the lowest ERA among starters","Played for New York Mets","Won 2 consecutive Cy Young awards"] },
  { player:"Bryce Harper", sport:"⚾ MLB", answer:"HARPER", era:"modern", stats:{HR:"42",AVG:".330",RBI:"100",OPS:"1.044"}, ctx:"2021 NL MVP Season — Philadelphia Phillies", clues:["Won the NL MVP with the Phillies","Hit a walk-off home run in the NLCS in 2023","Plays for Philadelphia Phillies","From Las Vegas, Nevada — was on the cover of Sports Illustrated at 16"] },
  { player:"Max Scherzer", sport:"⚾ MLB", answer:"SCHERZER", era:"modern", stats:{ERA:"2.90",W:"21",SO:"300",WHIP:"0.970"}, ctx:"2018 NL Cy Young Season — Washington Nationals", clues:["Won his third Cy Young Award","Struck out 300 batters this season","Played for Washington Nationals","Has two different colored eyes — heterochromia"] },
  { player:"Pete Alonso", sport:"⚾ MLB", answer:"ALONSO", era:"modern", stats:{HR:"53",AVG:".260",RBI:"120",OPS:".941"}, ctx:"2019 MLB Rookie of Year — New York Mets", clues:["Set the rookie home run record (53) in his first season","Won NL Rookie of the Year","Plays for New York Mets","From Tampa, Florida — nicknamed Polar Bear"] },
  { player:"Vladimir Guerrero Jr.", sport:"⚾ MLB", answer:"VLADDY", era:"modern", stats:{HR:"48",AVG:".311",RBI:"111",OPS:"1.002"}, ctx:"2021 ML Season — Toronto Blue Jays", clues:["Led the AL in home runs and batting this season","Finished 2nd in MVP voting","Plays for Toronto Blue Jays","Son of Hall of Famer Vladimir Guerrero Sr."] },
  // Baseball - Classic
  { player:"Alex Rodriguez", sport:"⚾ MLB", answer:"AROD", era:"classic", stats:{HR:"52",AVG:".300",RBI:"135",OPS:"1.018"}, ctx:"2001 MLB Season — Texas Rangers", clues:["Signed the richest contract in sports history ($252M) before this season","Hit 52 home runs this year","Played for Texas Rangers","Nicknamed A-Rod"] },
  { player:"Manny Ramirez", sport:"⚾ MLB", answer:"MANNY", era:"classic", stats:{HR:"45",AVG:".349",RBI:"144",OPS:"1.154"}, ctx:"2002 MLB Season — Boston Red Sox", clues:["Batted .349 with 45 home runs","Finished 2nd in MVP voting","Played for Boston Red Sox","Known for Manny Being Manny antics"] },
  { player:"Sammy Sosa", sport:"⚾ MLB", answer:"SOSA", era:"classic", stats:{HR:"66",AVG:".308",RBI:"158",SLG:".647"}, ctx:"1998 MLB Season — Chicago Cubs HR chase", clues:["Hit 66 home runs in the famous McGwire-Sosa HR chase","Finished 2nd to McGwire but won NL MVP","Played for Chicago Cubs","Born in San Pedro de Macoris, Dominican Republic"] },
  // Soccer - Modern
  { player:"Neymar Jr.", sport:"⚽ Soccer", answer:"NEYMAR", era:"modern", stats:{G:"8",AST:"5",APP:"7",MIN:"594"}, ctx:"2022 FIFA World Cup — Brazil", clues:["Equalled Pele's Brazil goal scoring record during this tournament","Injured in the group stage but returned","From Mogi das Cruzes, Brazil","Plays for Paris Saint-Germain"] },
  { player:"Karim Benzema", sport:"⚽ Soccer", answer:"BENZEMA", era:"modern", stats:{G:"15",AST:"3",APP:"12",MIN:"1009"}, ctx:"2021-22 UEFA Champions League — Real Madrid", clues:["Won the Champions League with Real Madrid","Won the Ballon d'Or this year","Plays for Real Madrid","French striker who came back from exile to lead France to nothing but then won Ballon d'Or"] },
  { player:"Antoine Griezmann", sport:"⚽ Soccer", answer:"GRIEZMANN", era:"modern", stats:{G:"4",AST:"2",APP:"7",MIN:"630"}, ctx:"2018 FIFA World Cup Final — France", clues:["Scored and won the Golden Boot at this World Cup","Won the World Cup with France","Plays for Atletico Madrid","From Macon, France — nickname Grizou"] },
  { player:"Virgil van Dijk", sport:"⚽ Soccer", answer:"VAN DIJK", era:"modern", stats:{G:"4",AST:"1",APP:"38",MIN:"3377"}, ctx:"2018-19 Premier League Season — Liverpool", clues:["Finished 2nd in Ballon d'Or voting — rare for a defender","Played for Liverpool","Won the Champions League and Premier League","Dutch central defender considered the best in the world"] },
  // Soccer - Classic
  { player:"Ronaldo Nazario", sport:"⚽ Soccer", answer:"R9", era:"classic", stats:{G:"15",AST:"4",APP:"16",MIN:"1238"}, ctx:"1996-97 Season — Barcelona La Liga", clues:["Won FIFA World Player of the Year at age 20","Scored 47 goals in all competitions this season","Played for Barcelona","Brazilian striker known as The Phenomenon"] },
  { player:"Roberto Baggio", sport:"⚽ Soccer", answer:"BAGGIO", era:"classic", stats:{G:"5",AST:"1",APP:"7",MIN:"585"}, ctx:"1994 FIFA World Cup — Italy", clues:["Led Italy to the World Cup Final almost single-handedly","Scored 5 goals in the tournament","Missed the decisive penalty in the final shootout vs Brazil","Italian forward with a famous ponytail, nicknamed The Divine Ponytail"] },
  { player:"Dennis Bergkamp", sport:"⚽ Soccer", answer:"BERGKAMP", era:"classic", stats:{G:"12",AST:"8",APP:"28",MIN:"2239"}, ctx:"1997-98 Season — Arsenal", clues:["Won Arsenal's Double (Premier League and FA Cup)","His goal vs Argentina in the 1998 World Cup was voted goal of the tournament","Played for Arsenal","Dutch forward nicknamed The Non-Flying Dutchman due to fear of flying"] },
  // Tennis - Classic
  { player:"Bjorn Borg", sport:"🎾 Tennis", answer:"BORG", era:"classic", stats:{W:"89",L:"3",TITLES:"11",GS:"2"}, ctx:"1979 ATP Season — Wimbledon and French Open again", clues:["Won Wimbledon for the 4th consecutive year","Won 11 Grand Slams in total","Swedish player who retired at just 26","Famous rivalry with John McEnroe"] },
  { player:"Jimmy Connors", sport:"🎾 Tennis", answer:"CONNORS", era:"classic", stats:{W:"99",L:"4",TITLES:"15",GS:"2"}, ctx:"1974 ATP Season — Three Grand Slams", clues:["Won 3 Grand Slams this year (US Open, Wimbledon, Australian)","Ranked World No. 1 for 5 consecutive years","American player known for his fighting spirit","Won 109 career singles titles — second all time"] },
  { player:"Chris Evert", sport:"🎾 Tennis", answer:"EVERT", era:"classic", stats:{W:"86",L:"4",TITLES:"13",GS:"4"}, ctx:"1974 WTA Season — Three Grand Slams", clues:["Won 3 Grand Slams this year","Won 18 Grand Slams in total","American player with a career win rate of 90%","Had a famous rivalry with Martina Navratilova"] },
  { player:"Martina Navratilova", sport:"🎾 Tennis", answer:"NAVRATILOVA", era:"classic", stats:{W:"86",L:"1",TITLES:"16",GS:"3"}, ctx:"1983 WTA Season — Most dominant year", clues:["Won 3 Grand Slams and lost only 1 match all year","Won 18 Grand Slams in total","Czech-American player who defected from Czechoslovakia","Won a record 9 Wimbledon singles titles"] },
  // Golf - Classic
  { player:"Tom Watson", sport:"⛳ Golf", answer:"WATSON", era:"classic", stats:{WINS:"6",MAJORS:"2",EARN:"$1.2M",YEAR:"1982"}, ctx:"1982 PGA Tour Season — US Open and British Open", clues:["Won the US Open at Pebble Beach with a famous chip-in on 17","Won The Open Championship the same year","Won 8 majors in total","From Kansas City, Missouri"] },
  { player:"Curtis Strange", sport:"⛳ Golf", answer:"STRANGE", era:"classic", stats:{WINS:"3",MAJORS:"1",EARN:"$1.1M",YEAR:"1989"}, ctx:"1989 PGA Tour Season — US Open back-to-back", clues:["Won the US Open for the second consecutive year","First player to earn over $1M in a season","From Norfolk, Virginia","Back-to-back US Open wins are extremely rare"] },
  // Hockey - Classic
  { player:"Brendan Shanahan", sport:"🏒 NHL", answer:"SHANAHAN", era:"classic", stats:{G:"52",AST:"34",PTS:"86",PIM:"131"}, ctx:"1993-94 NHL Season — St. Louis Blues", clues:["Scored 52 goals this season","Played for St. Louis Blues","Won 3 Stanley Cups with Detroit Red Wings","Later became NHL's VP of Player Safety"] },
  { player:"Brett Hull", sport:"🏒 NHL", answer:"HULL", era:"classic", stats:{G:"86",AST:"45",PTS:"131",PIM:"24"}, ctx:"1990-91 NHL Season — St. Louis Blues", clues:["Scored 86 goals — 3rd most in NHL history","Played for St. Louis Blues","Son of Bobby Hull — also a Hall of Famer","Nicknamed The Golden Brett"] },
  { player:"Mike Bossy", sport:"🏒 NHL", answer:"BOSSY", era:"classic", stats:{G:"68",AST:"51",PTS:"119",PIM:"6"}, ctx:"1980-81 NHL Season — New York Islanders", clues:["Scored 68 goals in this season","Won 4 consecutive Stanley Cups with the Islanders","Played for New York Islanders","Scored 50 goals in 50 games — only 2nd player to do so"] },
  { player:"Denis Savard", sport:"🏒 NHL", answer:"SAVARD", era:"classic", stats:{G:"44",AST:"87",PTS:"131",PIM:"82"}, ctx:"1987-88 NHL Season — Chicago Blackhawks", clues:["Scored 131 points this season","Played for Chicago Blackhawks","From Pointe-Gatineau, Quebec","Famous for his spin-o-rama move"] },
];

  { player:"Nick Foles", sport:"🏈 NFL", answer:"FOLES", era:"modern", stats:{YDS:"373",TD:"3",INT:"0",RTG:"106.0"}, ctx:"Super Bowl LII MVP — Philadelphia Eagles", clues:["Won Super Bowl MVP as a backup QB","His team beat Tom Brady and the Patriots","Caught a TD pass himself in this game","Was nearly retired before this season"] },
  { player:"Kurt Warner", sport:"🏈 NFL", answer:"WARNER", era:"classic", stats:{YDS:"414",TD:"2",INT:"0",RTG:"100.0"}, ctx:"Super Bowl XXXIV MVP — St. Louis Rams", clues:["Won Super Bowl MVP with St. Louis Rams","Was stocking grocery shelves before his NFL career","Played for The Greatest Show on Turf offense","Won 2 Super Bowl MVPs in his career"] },
  { player:"Roger Staubach", sport:"🏈 NFL", answer:"STAUBACH", era:"classic", stats:{YDS:"228",TD:"2",INT:"0",RTG:"119.5"}, ctx:"Super Bowl XII MVP — Dallas Cowboys", clues:["Won his second Super Bowl MVP","Played for Dallas Cowboys","Served in the US Navy before his NFL career","Nicknamed Roger the Dodger for his scrambling ability"] },
  { player:"Orel Hershiser", sport:"⚾ MLB", answer:"HERSHISER", era:"classic", stats:{ERA:"0.00",IP:"59",SO:"34",W:"5"}, ctx:"1988 World Series MVP — Los Angeles Dodgers", clues:["Won World Series MVP with LA Dodgers","Had set the consecutive scoreless innings record","His team upset the heavily favored Oakland A's","Nicknamed Bulldog by Tommy Lasorda"] },
  { player:"Bob Gibson", sport:"⚾ MLB", answer:"GIBSON", era:"legends", stats:{ERA:"1.12",SO:"268",W:"22",CG:"28"}, ctx:"1968 MLB Season — St. Louis Cardinals", clues:["Posted a 1.12 ERA — the lowest single-season ERA since 1914","His dominance led to the mound being lowered in 1969","Played for St. Louis Cardinals","9x Gold Glove winner and 2x Cy Young winner"] },
  { player:"Don Larsen", sport:"⚾ MLB", answer:"LARSEN", era:"legends", stats:{IP:"9",H:"0",BB:"0",SO:"7"}, ctx:"1956 World Series Game 5 — New York Yankees", clues:["Threw the only perfect game in World Series history","Played for New York Yankees","Opponent was the Brooklyn Dodgers","This remains one of baseball's most iconic moments"] },
  { player:"Denny McLain", sport:"⚾ MLB", answer:"MCLAIN", era:"legends", stats:{W:"31",ERA:"1.96",SO:"280",CG:"28"}, ctx:"1968 MLB Season — Detroit Tigers", clues:["Last pitcher to win 30 games in a season","Won both the Cy Young and MVP awards","Played for Detroit Tigers","His record of 31 wins may never be broken"] },
  { player:"Sandy Koufax", sport:"⚾ MLB", answer:"KOUFAX", era:"legends", stats:{ERA:"1.73",SO:"382",W:"27",CG:"27"}, ctx:"1966 MLB Season — Los Angeles Dodgers", clues:["Retired at age 30 due to arthritis at his peak","Won 3 Cy Young Awards in 4 years","Played for Los Angeles Dodgers","Famously refused to pitch on Yom Kippur in the 1965 World Series"] },
  { player:"Fernando Valenzuela", sport:"⚾ MLB", answer:"FERNANDO", era:"classic", stats:{ERA:"2.48",W:"13",SO:"180",CG:"11"}, ctx:"1981 MLB Season — Los Angeles Dodgers Rookie", clues:["Won both Cy Young AND Rookie of the Year in same season","Started the season 8-0 which sparked Fernandomania","Played for Los Angeles Dodgers","Mexican pitcher who became a cultural icon in LA"] },
  { player:"Gerd Muller", sport:"⚽ Soccer", answer:"MULLER", era:"legends", stats:{G:"14",APP:"10",MIN:"780",YEAR:"1970"}, ctx:"1970 FIFA World Cup — West Germany", clues:["Won the Golden Boot with 14 goals in 10 games","Played for West Germany","Nicknamed Der Bomber","Bayern Munich and West Germany striker of the 1970s"] },
  { player:"George Best", sport:"⚽ Soccer", answer:"BEST", era:"legends", stats:{G:"28",APP:"41",MIN:"3690",YEAR:"1968"}, ctx:"1967-68 Football League Season — Manchester United", clues:["Won the Ballon d'Or this year","Played for Manchester United","Won the Ballon d'Or in 1968 — the first British player to do so","Known as the 5th Beatle for his pop star status"] },
  { player:"Bobby Orr", sport:"🏒 NHL", answer:"ORR", era:"legends", stats:{G:"46",AST:"102",PTS:"148",PM:"+124"}, ctx:"1970-71 NHL Season — Boston Bruins", clues:["Defenseman who led the entire league in scoring","Played for Boston Bruins","Revolutionized the defenseman position","Won 8 consecutive Norris Trophies as best defenseman"] },
  { player:"Gordie Howe", sport:"🏒 NHL", answer:"HOWE", era:"legends", stats:{G:"49",AST:"46",PTS:"95",PIM:"72"}, ctx:"1952-53 NHL Season — Detroit Red Wings", clues:["Known as Mr. Hockey","Played for Detroit Red Wings","Played in 5 different decades","A Gordie Howe Hat Trick is a goal, assist, and fight"] },
  { player:"Phil Esposito", sport:"🏒 NHL", answer:"ESPOSITO", era:"legends", stats:{G:"76",AST:"76",PTS:"152",PIM:"71"}, ctx:"1970-71 NHL Season — Boston Bruins", clues:["Scored 76 goals — shattering the previous record","Played for Boston Bruins alongside Bobby Orr","His record stood until Gretzky broke it","Italian-Canadian player who transformed the center position"] },
  { player:"Kareem Abdul-Jabbar", sport:"🏀 NBA", answer:"KAREEM", era:"legends", stats:{PTS:"26.2",REB:"13.5",AST:"5",BLK:"3.4"}, ctx:"1971 NBA Finals MVP — Milwaukee Bucks", clues:["Won his first Finals MVP with Milwaukee","Led Milwaukee to their first championship","All-time NBA scoring leader","His signature move was the unstoppable skyhook"] },
  { player:"James Harden", sport:"🏀 NBA", answer:"HARDEN", era:"modern", stats:{PTS:"36.1",AST:"7.5",REB:"6.6",FT:"87.9"}, ctx:"2018-19 NBA Season — Houston Rockets scoring title", clues:["Won the scoring title with 36.1 PPG","Played for the Houston Rockets this season","Known for his step-back three pointer","Nicknamed The Beard"] },
  { player:"Luca Modric", sport:"⚽ Soccer", answer:"MODRIC", era:"modern", stats:{G:"2",AST:"5",APP:"7",MIN:"609"}, ctx:"2018 FIFA World Cup — Croatia", clues:["Won the Golden Ball as best player of the tournament","Led Croatia to the World Cup Final for the first time","Plays for Real Madrid","From Croatia, won the Ballon d'Or in 2018"] },
  { player:"Ron Artest", sport:"🏀 NBA", answer:"ARTEST", era:"modern", stats:{PTS:"16.5",REB:"5.2",STL:"2.0",BLK:"0.8"}, ctx:"2010 NBA Finals Game 7 — Los Angeles Lakers", clues:["Hit the go-ahead three with 1 minute left in Game 7","Played for the Los Angeles Lakers","Later changed his name to Metta World Peace","Thanked his psychiatrist in his championship speech"] },
  { player:"Malcolm Butler", sport:"🏈 NFL", answer:"MALCOLM", era:"modern", stats:{INT:"1",YDS:"0",TD:"0",YEAR:"2015"}, ctx:"Super Bowl XLIX — New England Patriots vs Seattle Seahawks", clues:["Made the goal-line interception that won the Super Bowl","Was an undrafted free agent","Played for the New England Patriots","Intercepted Russell Wilson with 26 seconds left"] },
  { player:"Draymond Green", sport:"🏀 NBA", answer:"DRAYMOND", era:"modern", stats:{PTS:"8.2",REB:"8.9",AST:"7.4",STL:"1.9"}, ctx:"2017 NBA Finals — Golden State Warriors", clues:["Won Finals despite averaging under 10 PPG","Played for Golden State Warriors","Known for his defense and playmaking","Was a 2nd round draft pick who became an All-Star"] },
  { player:"Eli Manning", sport:"🏈 NFL", answer:"ELI", era:"modern", stats:{YDS:"255",TD:"2",INT:"0",RTG:"98.2"}, ctx:"Super Bowl XLVI MVP — New York Giants vs New England Patriots", clues:["Won his second Super Bowl MVP against the Patriots","Upset the Patriots again as heavy underdogs","Younger brother of Peyton Manning","Played his entire career for the New York Giants"] },
  { player:"Vince Carter", sport:"🏀 NBA", answer:"CARTER", era:"modern", stats:{PTS:"18.3",REB:"5.3",AST:"4.3",YEAR:"2000"}, ctx:"2000 NBA Slam Dunk Contest — Toronto Raptors", clues:["Considered the greatest dunk contest performance ever","Played for Toronto Raptors","Nicknamed Half Man Half Amazing","Had one of the longest NBA careers at 22 seasons"] },
  { player:"Paolo Maldini", sport:"⚽ Soccer", answer:"MALDINI", era:"classic", stats:{APP:"647",TITLES:"7",UCL:"5",YEARS:"25"}, ctx:"Career — AC Milan, 1985-2009", clues:["Played 647 games for AC Milan over 25 years","Won 5 UEFA Champions League titles","Considered the greatest defender of all time by many","His father Cesare also played and managed AC Milan"] },
  { player:"Lev Yashin", sport:"⚽ Soccer", answer:"YASHIN", era:"legends", stats:{CS:"270",GAMES:"812",SAVES:"150+",YEAR:"1963"}, ctx:"1963 Ballon d'Or — Soviet Union", clues:["Won the Ballon d'Or — the only goalkeeper ever to do so","Saved over 150 penalties in his career","Played for Soviet Union and Dynamo Moscow","Wore all black and was nicknamed The Black Spider"] },
  { player:"Franz Beckenbauer", sport:"⚽ Soccer", answer:"BECKENBAUER", era:"legends", stats:{G:"14",APP:"50",TITLES:"3",UCL:"3"}, ctx:"1974 FIFA World Cup — West Germany", clues:["Won the World Cup as captain of West Germany","Later won the World Cup as a manager too","Invented the modern sweeper position","Nicknamed Der Kaiser (The Emperor)"] },
  { player:"Steve Nash", sport:"🏀 NBA", answer:"NASH", era:"modern", stats:{PTS:"18.8",AST:"11.5",REB:"3.3","FG%":"50.2"}, ctx:"2005-06 NBA Season — Phoenix Suns MVP", clues:["Won his second consecutive MVP award","Played for Phoenix Suns","From Victoria, British Columbia, Canada","Shot over 50% from the field as a point guard"] },
  { player:"Tracy McGrady", sport:"🏀 NBA", answer:"TMAC", era:"modern", stats:{PTS:"33.0",REB:"6.5",AST:"5.5",STL:"1.6"}, ctx:"2002-03 NBA Season — Orlando Magic scoring title", clues:["Won the scoring title with 33.0 PPG","Played for Orlando Magic","Scored 13 points in 35 seconds to beat San Antonio in 2004","Nickname T-Mac"] },
  { player:"Bob Cousy", sport:"🏀 NBA", answer:"COUSY", era:"legends", stats:{PTS:"21.7",AST:"7.7",REB:"5.3",YEAR:"1957"}, ctx:"1956-57 NBA Season — Boston Celtics MVP", clues:["Won the MVP award and led Celtics to the championship","Led the NBA in assists for 8 consecutive years","Played for Boston Celtics","Nicknamed The Houdini of the Hardwood"] },
  { player:"Peyton Manning", sport:"🏈 NFL", answer:"PEYTON", era:"modern", stats:{YDS:"247",TD:"2",INT:"2",RTG:"81.8"}, ctx:"2006 Super Bowl XLI MVP — Indianapolis Colts", clues:["Won the Super Bowl MVP with the Colts","Defeated the Chicago Bears in the rain","Played for Indianapolis Colts","Overcame being down 14-0 to win the game"] },
  { player:"Drew Brees", sport:"🏈 NFL", answer:"BREES", era:"modern", stats:{YDS:"5476",TD:"46",INT:"14",COMP:"71.2%"}, ctx:"2011 NFL Season — New Orleans Saints", clues:["Set the NFL passing yards record in a season","Led the NFL in completion percentage","Played for New Orleans Saints","From Austin, Texas — overcame a shoulder injury to reach this peak"] },
  { player:"Terrell Owens", sport:"🏈 NFL", answer:"TO", era:"modern", stats:{REC:"13",YDS:"122",TD:"0",YEAR:"2005"}, ctx:"Super Bowl XXXIX — Philadelphia Eagles vs New England Patriots", clues:["Played in this Super Bowl 6 weeks after a broken fibula and torn ligament","Caught 9 passes despite being barely able to walk","Played for Philadelphia Eagles","Nicknamed TO — had one of sport's most controversial personalities"] },
  { player:"Marshawn Lynch", sport:"🏈 NFL", answer:"BEAST MODE", era:"modern", stats:{CAR:"29",YDS:"157",TD:"2",YAC:"7.1"}, ctx:"2014 NFC Championship — Seattle Seahawks vs San Francisco 49ers", clues:["Ran for 2 TDs including through the entire 49ers defense","Played for Seattle Seahawks","Nicknamed Beast Mode","From Oakland, California — loved Skittles on the sideline"] },
  { player:"LaDainian Tomlinson", sport:"🏈 NFL", answer:"LT", era:"modern", stats:{CAR:"348",YDS:"1815",TD:"31",YPC:"5.2"}, ctx:"2006 NFL Season — San Diego Chargers MVP", clues:["Set the single-season TD record (31) this season","Won the MVP award","Played for San Diego Chargers","Nicknamed LT — considered one of the greatest RBs ever"] },
  { player:"Deion Sanders", sport:"🏈 NFL", answer:"PRIMETIME", era:"classic", stats:{INT:"8",TD:"6",RET:"1421",YEAR:"1994"}, ctx:"1994 NFL Season — San Francisco 49ers", clues:["Played for the 49ers and won a Super Bowl this year","Returned kicks and played both CB and WR","Nicknamed Prime Time and Neon Deion","Also played professional baseball"] },
  { player:"Reggie White", sport:"🏈 NFL", answer:"WHITE", era:"classic", stats:{SCK:"21",FF:"2",INT:"2",YEAR:"1987"}, ctx:"1987 NFL Season — Philadelphia Eagles Defensive MVP", clues:["Won Defensive Player of the Year with 21 sacks","Played for Philadelphia Eagles","Nicknamed The Minister of Defense","Considered one of the greatest defensive players ever"] },
  { player:"Dick Butkus", sport:"🏈 NFL", answer:"BUTKUS", era:"legends", stats:{SCK:"8",INT:"2",FF:"3",TD:"1"}, ctx:"1969 NFL Season — Chicago Bears All-Pro", clues:["Named to the All-Pro team for the 4th consecutive year","Played for Chicago Bears his entire career","Considered the most feared linebacker in NFL history","His name became synonymous with violent football"] },
  { player:"Zack Greinke", sport:"⚾ MLB", answer:"GREINKE", era:"modern", stats:{ERA:"1.66",W:"19",SO:"200",WHIP:"0.844"}, ctx:"2009 AL Cy Young Season — Kansas City Royals", clues:["Won the AL Cy Young with a 1.66 ERA","Turned his career around after dealing with social anxiety disorder","Played for Kansas City Royals","Had the lowest ERA by a qualified starter since 1968"] },
  { player:"Felix Hernandez", sport:"⚾ MLB", answer:"FELIX", era:"modern", stats:{ERA:"2.27",W:"13",SO:"232",WHIP:"1.056"}, ctx:"2010 AL Cy Young Season — Seattle Mariners", clues:["Won the AL Cy Young despite only 13 wins","Led the AL in ERA and innings pitched","Played for Seattle Mariners","From Valencia, Venezuela — nicknamed King Felix"] },
  { player:"Corey Kluber", sport:"⚾ MLB", answer:"KLUBER", era:"modern", stats:{ERA:"2.25",W:"20",SO:"265",WHIP:"0.875"}, ctx:"2017 AL Cy Young Season — Cleveland Indians", clues:["Won his second Cy Young Award this season","Struck out 265 batters","Played for Cleveland Indians","Nicknamed Klubot for his emotionless demeanor"] },
  { player:"Jose Fernandez", sport:"⚾ MLB", answer:"FERNANDEZ", era:"modern", stats:{ERA:"2.86",W:"16",SO:"253",WHIP:"0.979"}, ctx:"2016 MLB Season — Miami Marlins (final season)", clues:["This was tragically his final season before his death","Led the NL in strikeouts","Played for Miami Marlins","Defected from Cuba at age 15 on his 4th attempt"] },
  { player:"David Ortiz", sport:"⚾ MLB", answer:"ORTIZ", era:"modern", stats:{HR:"54",AVG:".315",RBI:"137",OPS:".978"}, ctx:"2006 MLB Season — Boston Red Sox", clues:["Hit 54 home runs this season","Played for Boston Red Sox","Nicknamed Big Papi","From Santo Domingo, Dominican Republic"] },
  { player:"Roy Halladay", sport:"⚾ MLB", answer:"HALLADAY", era:"modern", stats:{ERA:"2.35",W:"21",SO:"219",WHIP:"1.041"}, ctx:"2010 NL Cy Young — Philadelphia Phillies", clues:["Threw a no-hitter in the playoffs — only the 2nd ever","Won the NL Cy Young award","Played for Philadelphia Phillies","Also threw a perfect game during the regular season this year"] },
  { player:"Dave Winfield", sport:"⚾ MLB", answer:"WINFIELD", era:"classic", stats:{HR:"27",AVG:".340",RBI:"106",H:"184"}, ctx:"1992 MLB Season — Toronto Blue Jays World Series MVP", clues:["Had the go-ahead RBI in Game 6 of the World Series at age 40","Won his only World Series with Toronto Blue Jays","Drafted by 4 different professional sports leagues","From St. Paul, Minnesota"] },
  { player:"Gary Carter", sport:"⚾ MLB", answer:"GARY", era:"classic", stats:{HR:"32",AVG:".281",RBI:"106",GG:"3"}, ctx:"1985 MLB Season — Montreal Expos, final great year", clues:["Won 3 Gold Gloves in his career","Played for Montreal Expos","His 1986 World Series performance with the Mets was iconic","Nicknamed The Kid"] },
  { player:"Dwight Gooden", sport:"⚾ MLB", answer:"DOC", era:"classic", stats:{ERA:"1.53",W:"24",SO:"268",WHIP:"0.965"}, ctx:"1985 MLB Season — New York Mets", clues:["Won the Cy Young and Rookie of the Year in consecutive years","Had a 1.53 ERA at age 20","Played for New York Mets","Nicknamed Doc — his career derailed by substance abuse"] },
  { player:"George Brett", sport:"⚾ MLB", answer:"BRETT", era:"classic", stats:{HR:"24",AVG:".390",RBI:"118",OPS:"1.128"}, ctx:"1980 MLB Season — Kansas City Royals MVP", clues:["Batted .390 — closest to .400 since Ted Williams","Won the AL MVP award","Played for Kansas City Royals","The Pine Tar Incident in 1983 became one of baseball's famous controversies"] },
  { player:"Toni Kroos", sport:"⚽ Soccer", answer:"KROOS", era:"modern", stats:{G:"4",AST:"8",APP:"12",MIN:"1037"}, ctx:"2014 FIFA World Cup — Germany", clues:["Won the World Cup with Germany","Scored a stunning free kick vs Sweden in his career","Plays for Real Madrid","German midfielder considered the best passer in the world"] },
  { player:"Andrea Pirlo", sport:"⚽ Soccer", answer:"PIRLO", era:"modern", stats:{G:"2",AST:"8",APP:"7",MIN:"630"}, ctx:"2006 FIFA World Cup — Italy", clues:["Won the World Cup with Italy","Won the Golden Ball at Euro 2012","Played for Juventus and AC Milan","Italian regista midfielder nicknamed The Architect"] },
  { player:"Didier Drogba", sport:"⚽ Soccer", answer:"DROGBA", era:"modern", stats:{G:"12",AST:"3",APP:"9",MIN:"769"}, ctx:"2011-12 UEFA Champions League — Chelsea", clues:["Scored the equalizer in the 88th minute of the Champions League Final","Scored the winning penalty in the shootout","Played for Chelsea","From Abidjan, Ivory Coast — scored in 4 separate FA Cup Finals"] },
  { player:"Gareth Bale", sport:"⚽ Soccer", answer:"BALE", era:"modern", stats:{G:"2",AST:"1",APP:"9",MIN:"613"}, ctx:"2018 UEFA Champions League Final — Real Madrid vs Liverpool", clues:["Scored a stunning bicycle kick to seal the Champions League","Came off the bench to score twice","Played for Real Madrid","Welsh winger who won 4 Champions Leagues with Madrid"] },
  { player:"Eusebio", sport:"⚽ Soccer", answer:"EUSEBIO", era:"legends", stats:{G:"9",AST:"1",APP:"6",MIN:"540"}, ctx:"1966 FIFA World Cup — Portugal", clues:["Won the Golden Boot with 9 goals","Led Portugal to 3rd place — their best ever World Cup finish","Played for Benfica in Portugal","Mozambican-born Portuguese forward nicknamed The Black Panther"] },
  { player:"Gustavo Kuerten", sport:"🎾 Tennis", answer:"GUGA", era:"modern", stats:{W:"61",L:"16",TITLES:"5",GS:"1"}, ctx:"2000 ATP Season — French Open champion and World No. 1", clues:["Won the French Open and ended year ranked World No. 1","Drew a heart in the clay after winning at Roland Garros","From Florianopolis, Brazil — nicknamed Guga","Won 3 French Open titles in total"] },
  { player:"Lleyton Hewitt", sport:"🎾 Tennis", answer:"HEWITT", era:"modern", stats:{W:"80",L:"13",TITLES:"8",GS:"1"}, ctx:"2001 ATP Season — World No. 1", clues:["Became the youngest World No. 1 in history at 20","Won the US Open this year","Australian player known for his fighting spirit","Famous for his Come On celebrations"] },
  { player:"Guy Lafleur", sport:"🏒 NHL", answer:"LAFLEUR", era:"classic", stats:{G:"60",AST:"72",PTS:"132",PIM:"26"}, ctx:"1977-78 NHL Season — Montreal Canadiens", clues:["Won the Hart Trophy as league MVP","Won his 4th consecutive Stanley Cup this year","Played for Montreal Canadiens","Nicknamed The Flower — one of the most exciting players ever"] },
  { player:"Caitlin Clark", sport:"🏀 NBA", answer:"CLARK", era:"modern", stats:{PTS:"19.2",AST:"8.4",REB:"5.7","3PM":"3.1"}, ctx:"2024 WNBA Season — Indiana Fever Rookie of Year", clues:["Won WNBA Rookie of the Year award","Set the NCAA all-time scoring record before entering the WNBA","Plays for Indiana Fever","From West Des Moines, Iowa — sparked a WNBA viewership revolution"] },
  { player:"Aaron Judge", sport:"⚾ MLB", answer:"JUDGE", era:"modern", stats:{HR:"62",AVG:".311",RBI:"131",OPS:"1.111"}, ctx:"2022 MLB Season — New York Yankees AL MVP", clues:["Set the AL single-season home run record (62)","Won the unanimous AL MVP award","Plays for New York Yankees","From Linden, California — 6ft 7in outfielder"] },
  { player:"Jalen Hurts", sport:"🏈 NFL", answer:"HURTS", era:"modern", stats:{YDS:"3701",TD:"35",INT:"6",RUSH:"760"}, ctx:"2022 NFL Season — Philadelphia Eagles MVP runner-up", clues:["Led Eagles to Super Bowl LVII appearance","Finished 2nd in MVP voting","Plays for Philadelphia Eagles","From Channelview, Texas — transferred from Alabama to Oklahoma"] },
  { player:"Justin Jefferson", sport:"🏈 NFL", answer:"JEFFERSON", era:"modern", stats:{REC:"128",YDS:"1809",TD:"9",YPR:"14.1"}, ctx:"2022 NFL Season — Minnesota Vikings receiving record", clues:["Set the single-season receiving yards record (1809)","Won Offensive Player of the Year","Plays for Minnesota Vikings","From St. Rose, Louisiana — joined LSU after Odell Beckham left"] },
  { player:"Auston Matthews", sport:"🏒 NHL", answer:"MATTHEWS", era:"modern", stats:{G:"60",AST:"46",PTS:"106",PIM:"24"}, ctx:"2021-22 NHL Season — Toronto Maple Leafs MVP", clues:["Won the Hart Trophy as league MVP","Led the NHL in goals with 60","Plays for Toronto Maple Leafs","From Scottsdale, Arizona — grew up in Mexico before moving to Arizona"] },
// ─── HARD (45 puzzles) ────────────────────────────────────────────────────────
const HARD = [
  { player:"Elgin Baylor", sport:"🏀 NBA", answer:"BAYLOR", era:"legends", stats:{PTS:"61",REB:"22",AST:"3"}, ctx:"Nov 15, 1960 — LA Lakers vs New York Knicks", clues:["Scored 61 points — a record at the time","Played for the LA Lakers","Never won an NBA championship in 11 Finals appearances","One of the most graceful scorers of his era"] },
  { player:"Pete Maravich", sport:"🏀 NBA", answer:"PISTOL", era:"classic", stats:{PTS:"68",REB:"6",AST:"4"}, ctx:"Feb 25, 1977 — vs New York Knicks", clues:["Scored 68 points without a 3-point line","Played for New Orleans Jazz","NCAA all-time scoring leader at 44.2 PPG","Nicknamed Pistol Pete for his flashy style"] },
  { player:"Willis Reed", sport:"🏀 NBA", answer:"REED", era:"legends", stats:{PTS:"37",REB:"19",AST:"3",YEAR:"1970"}, ctx:"1970 NBA Finals MVP — New York Knicks", clues:["Won Finals MVP with New York Knicks","Famous for limping onto court injured in Game 7","Played center for the Knicks","Inspired his team to win Game 7 of the Finals"] },
  { player:"Rick Barry", sport:"🏀 NBA", answer:"BARRY", era:"legends", stats:{PTS:"36.3",REB:"6.1",AST:"4.7",FT:"89%"}, ctx:"1966-67 NBA Season — San Francisco Warriors", clues:["Led the NBA in scoring with 36.3 PPG","Played for the San Francisco Warriors","Famous for his underhand free throw style","Never missed a Finals appearance in his career"] },
  { player:"Jim Plunkett", sport:"🏈 NFL", answer:"PLUNKETT", era:"classic", stats:{YDS:"261",TD:"3",INT:"0",RTG:"111.2"}, ctx:"Super Bowl XV MVP — Oakland Raiders", clues:["Won Super Bowl MVP with Oakland Raiders","Was a backup QB who got his chance late in career","Won 2 Super Bowls as a late-career starter","First Mexican-American starting Super Bowl QB"] },
  { player:"Billy Kilmer", sport:"🏈 NFL", answer:"KILMER", era:"classic", stats:{YDS:"104",TD:"1",INT:"1",RTG:"66.7"}, ctx:"1972 NFC Championship — Washington Redskins", clues:["Led Washington to Super Bowl VII appearance","Beat the Dallas Cowboys in the NFC Championship","Backup who became a starter mid-career","Played for the Washington Redskins in the early 1970s"] },
  { player:"Just Fontaine", sport:"⚽ Soccer", answer:"FONTAINE", era:"legends", stats:{G:"13",APP:"6",MIN:"540",YEAR:"1958"}, ctx:"1958 FIFA World Cup — France", clues:["Scored 13 goals in a single World Cup — all-time record","Played for France","The record has never been broken in over 60 years","French striker who played in the 1950s"] },
  { player:"Ivan Lendl", sport:"🎾 Tennis", answer:"LENDL", era:"classic", stats:{W:"106",L:"9",TITLES:"11",GS:"3"}, ctx:"1986 ATP Season — Czech-American dominance", clues:["Won 3 Grand Slams this year","Czech-American player who dominated the 1980s","Won 8 Grand Slams in total","Famous for his intense and methodical training regime"] },
  { player:"Mats Wilander", sport:"🎾 Tennis", answer:"WILANDER", era:"classic", stats:{W:"79",L:"7",TITLES:"7",GS:"3"}, ctx:"1988 ATP Season — Three Grand Slams", clues:["Won 3 Grand Slams in a single year","Swedish player who won 7 Grand Slams total","Won Australian, French, and US Open this year","Reached World No. 1 this year"] },
  { player:"Guillermo Vilas", sport:"🎾 Tennis", answer:"VILAS", era:"classic", stats:{W:"46",L:"3",TITLES:"16",STREAK:"46"}, ctx:"1977 ATP Season — Most dominant clay season", clues:["Won 46 consecutive matches this season","Won 16 titles this season","From Argentina, known as El Toro","Dominated clay courts in the late 1970s"] },
  { player:"Virginia Ruzici", sport:"🎾 Tennis", answer:"RUZICI", era:"classic", stats:{GS:"1",YEAR:"1978",SURFACE:"Clay",NATION:"Romania"}, ctx:"1978 French Open — Women's Singles Champion", clues:["Won the French Open in 1978","From Romania","Defeated Mima Jausovec in the final","One of the lesser-known French Open champions"] },
  { player:"Ben Hogan", sport:"⛳ Golf", answer:"HOGAN", era:"legends", stats:{WINS:"5",MAJORS:"3",AVG:"69.3",YEAR:"1953"}, ctx:"1953 PGA Tour Season — The Hogan Slam", clues:["Won 3 majors in one year","Could not attempt the Grand Slam due to scheduling conflicts","Had survived a near-fatal car accident years earlier","Considered one of the greatest ball-strikers ever"] },
  { player:"Byron Nelson", sport:"⛳ Golf", answer:"NELSON", era:"legends", stats:{WINS:"18",STREAK:"11",AVG:"68.33",YEAR:"1945"}, ctx:"1945 PGA Tour Season — Greatest season in golf history", clues:["Won 18 tournaments in one season — all-time record","Won 11 consecutive tournaments — all-time record","Played mostly during World War II era","His record may never be broken"] },
  { player:"Ken Dryden", sport:"🏒 NHL", answer:"DRYDEN", era:"legends", stats:{GAA:"2.24","SV%":".921",W:"33",SO:"6"}, ctx:"1971 Stanley Cup Playoffs MVP — Montreal Canadiens", clues:["Won Conn Smythe Trophy as playoff MVP as a rookie","Had only played 6 regular season games before the playoffs","Played for Montreal Canadiens","Later became a politician and author"] },
  { player:"Artis Gilmore", sport:"🏀 NBA", answer:"GILMORE", era:"classic", stats:{PTS:"23.8",REB:"15.5",BLK:"3.2","FG%":"63.5"}, ctx:"1974-75 ABA Season — Kentucky Colonels", clues:["Led the ABA in rebounding and blocks","Played for Kentucky Colonels in the ABA","Had one of the highest FG% in pro basketball history","7-foot center nicknamed The A-Train"] },
  { player:"George Mikan", sport:"🏀 NBA", answer:"MIKAN", era:"legends", stats:{PTS:"22.3",REB:"13.4",TITLES:"4",YEAR:"1952"}, ctx:"1951-52 NBA Season — Minneapolis Lakers", clues:["Led Minneapolis Lakers to 5 NBA titles","Considered the first true dominant big man in basketball","The NBA widened the lane twice because of him","Wore thick glasses while playing"] },
  { player:"Earl Monroe", sport:"🏀 NBA", answer:"MONROE", era:"legends", stats:{PTS:"23.8",AST:"5.5",REB:"4.0",YEAR:"1968"}, ctx:"1967-68 NBA Season — Baltimore Bullets Rookie of Year", clues:["Won Rookie of the Year with Baltimore Bullets","Famous for his spinning moves in the lane","Nicknamed Earl the Pearl and Black Jesus","Later won a championship with the New York Knicks"] },
  { player:"David Tyree", sport:"🏈 NFL", answer:"TYREE", era:"modern", stats:{REC:"1",YDS:"32",TD:"0",YEAR:"2008"}, ctx:"Super Bowl XLII — New York Giants vs New England Patriots", clues:["Made the Helmet Catch to set up the winning TD","His team upset the undefeated 18-0 Patriots","Played for the New York Giants","Had only 4 catches all season before this game"] },
  { player:"Tim Tebow", sport:"🏈 NFL", answer:"TEBOW", era:"modern", stats:{YDS:"316",TD:"3",INT:"1",RTG:"125.6"}, ctx:"2012 NFL Wild Card — Denver Broncos vs Pittsburgh Steelers", clues:["Threw an 80-yard TD on the first play of overtime","Played for Denver Broncos","Famous for his religious celebrations on the field","Won the Heisman Trophy at Florida"] },
  { player:"Jeremy Lin", sport:"🏀 NBA", answer:"LIN", era:"modern", stats:{PTS:"22.5",AST:"8.7",REB:"3.6",W:"7"}, ctx:"February 2012 — New York Knicks Linsanity run", clues:["Led the Knicks on a 7-game winning streak as an unknown","Was sleeping on his brother's couch before his breakout","Harvard graduate who went undrafted","The phenomenon was called Linsanity"] },
  { player:"Landon Donovan", sport:"⚽ Soccer", answer:"DONOVAN", era:"modern", stats:{G:"5",AST:"3",APP:"5",MIN:"450"}, ctx:"2010 FIFA World Cup — USA", clues:["Scored the famous injury-time winner vs Algeria","Sent USA through to the round of 16","Greatest American soccer player of his generation","Scored in the 91st minute to spark wild celebrations"] },
  // Basketball - Modern
  { player:"Muggsy Bogues", sport:"🏀 NBA", answer:"BOGUES", era:"modern", stats:{PTS:"10.8",AST:"9.7",STL:"2.0",HT:"5'3\""}, ctx:"1994-95 NBA Season — Charlotte Hornets", clues:["Led the team in assists and steals","Played for Charlotte Hornets","Shortest player in NBA history at 5ft 3in","From Baltimore, Maryland"] },
  { player:"Manute Bol", sport:"🏀 NBA", answer:"BOL", era:"classic", stats:{BLK:"5.0",PTS:"2.7",REB:"4.2",HT:"7'7\""}, ctx:"1985-86 NBA Season — Washington Bullets", clues:["Led the NBA in blocks per game with 5.0","Played for Washington Bullets","Tallest player in NBA history at 7ft 7in","From the Dinka tribe in Sudan"] },
  { player:"Spencer Haywood", sport:"🏀 NBA", answer:"HAYWOOD", era:"classic", stats:{PTS:"26.0",REB:"13.6",BLK:"2.0",YEAR:"1973"}, ctx:"1972-73 NBA Season — Seattle SuperSonics", clues:["Led the NBA in rebounding this season","Had already won Olympic gold in 1968 as a teenager","Played for Seattle SuperSonics","His legal case opened the NBA to underclassmen"] },
  { player:"Dolph Schayes", sport:"🏀 NBA", answer:"SCHAYES", era:"legends", stats:{PTS:"24.9",REB:"15.0",FT:"89%",YEAR:"1958"}, ctx:"1957-58 NBA Season — Syracuse Nationals", clues:["Led the NBA in free throw percentage","One of the first great NBA big men","Played for the Syracuse Nationals","His son Danny Schayes also played in the NBA"] },
  // Football - Modern
  // Baseball - Modern
  // Baseball - Classic
  // Soccer - Modern
  { player:"Xabi Alonso", sport:"⚽ Soccer", answer:"XABI", era:"modern", stats:{G:"2",AST:"4",APP:"38",MIN:"3285"}, ctx:"2013-14 La Liga Season — Real Madrid", clues:["Won La Liga and the Champions League this year","Played for Real Madrid","Spanish midfielder known for his passing range","Now manages Bayer Leverkusen to the Bundesliga title"] },
  { player:"Dimitar Berbatov", sport:"⚽ Soccer", answer:"BERBATOV", era:"modern", stats:{G:"20",AST:"7",APP:"32",MIN:"2318"}, ctx:"2010-11 Premier League Season — Manchester United golden boot", clues:["Won the Premier League Golden Boot with 20 goals","Played for Manchester United","Scored 5 goals in a single Premier League game","Bulgarian striker known for his elegant style"] },
  // Soccer - Legends/Classic
  { player:"Gunnar Nordahl", sport:"⚽ Soccer", answer:"NORDAHL", era:"legends", stats:{G:"35",APP:"26",MIN:"2340",YEAR:"1950"}, ctx:"1949-50 Serie A Season — AC Milan", clues:["Led Serie A in scoring with 35 goals","One of the Gre-No-Li trio of Swedish players at Milan","Played for AC Milan","Swedish center forward considered one of the greatest scorers ever"] },
  { player:"Helmut Rahn", sport:"⚽ Soccer", answer:"RAHN", era:"legends", stats:{G:"4",APP:"6",MIN:"540",YEAR:"1954"}, ctx:"1954 FIFA World Cup Final — West Germany vs Hungary", clues:["Scored the winning goal in the World Cup Final with 6 minutes left","West Germany beat the heavily favored Hungary","His goal was called the Miracle of Bern","West German winger who was nearly left out of the squad"] },
  // Tennis - Modern Hard
  { player:"Thomas Muster", sport:"🎾 Tennis", answer:"MUSTER", era:"classic", stats:{W:"88",L:"12",TITLES:"12",GS:"1"}, ctx:"1995 ATP Season — French Open and World No. 1", clues:["Won the French Open and 12 titles this year","Won 45 clay court titles in his career","Austrian player nicknamed The Man of Clay","Came back from a shattered knee to win a Grand Slam"] },
  { player:"Gabriela Sabatini", sport:"🎾 Tennis", answer:"SABATINI", era:"classic", stats:{W:"72",L:"13",TITLES:"9",GS:"1"}, ctx:"1990 WTA Season — US Open champion", clues:["Won the US Open title","Defeated Steffi Graf in the final","Argentinian player who was one of the most popular of her era","Retired at just 26 at her peak"] },
  // Golf - Hard
  { player:"Payne Stewart", sport:"⛳ Golf", answer:"STEWART", era:"classic", stats:{WINS:"3",MAJORS:"1",PUTT:"1.741",YEAR:"1999"}, ctx:"1999 US Open — Pinehurst No. 2", clues:["Sank the winning putt on the 18th to win the US Open","Was killed in a plane crash 4 months after this win","From Springfield, Missouri","Known for wearing knickerbockers and tam o'shanter caps"] },
  { player:"David Duval", sport:"⛳ Golf", answer:"DUVAL", era:"modern", stats:{WINS:"4",AVG:"68.93",EARN:"$2.6M",YEAR:"1999"}, ctx:"1999 PGA Tour Season — Briefly World No. 1", clues:["Shot a 59 to win the Bob Hope Classic — only 4th player to do so","Reached World No. 1 in the world","From Jacksonville, Florida","His career declined rapidly after reaching the top"] },
  { player:"Bernhard Langer", sport:"⛳ Golf", answer:"LANGER", era:"classic", stats:{WINS:"4",MAJORS:"1",RYDER:"19.5",YEAR:"1993"}, ctx:"1993 Masters — Augusta National", clues:["Won his second Masters title","Has never won a tournament outside of the Masters where he has 2 wins","From Anhausen, West Germany — now leads LIV Seniors Tour","Had the yips and reinvented his putting style multiple times"] },
  // Hockey - Hard
  { player:"Mike Gartner", sport:"🏒 NHL", answer:"GARTNER", era:"classic", stats:{G:"708",CONS:"17",YRS:"19",SZN:"30+"}, ctx:"Career — Washington Capitals, most consistent scorer ever", clues:["Scored 30+ goals in 17 of 19 seasons","Never won a Stanley Cup despite a brilliant career","Played for Washington Capitals, Minnesota, Rangers, Toronto, Phoenix","Considered the most consistent goal scorer never to win a Cup"] },
  { player:"Lanny McDonald", sport:"🏒 NHL", answer:"MCDONALD", era:"classic", stats:{G:"66",AST:"67",PTS:"133",PIM:"37"}, ctx:"1982-83 NHL Season — Calgary Flames", clues:["Scored 66 goals in this season","Famous for his enormous mustache","Played for Calgary Flames","Scored the Stanley Cup winning goal in 1989 — his final career game"] },
  { player:"Mike Vernon", sport:"🏒 NHL", answer:"VERNON", era:"classic", stats:{GAA:"1.76","SV%":".927",W:"16",SO:"2"}, ctx:"1997 Stanley Cup Finals MVP — Detroit Red Wings", clues:["Won the Conn Smythe Trophy as playoff MVP","Detroit Red Wings won the Cup ending a 42-year drought","Played for Detroit Red Wings","From Calgary, Alberta — won 2 Stanley Cups in his career"] },
  { player:"Cam Neely", sport:"🏒 NHL", answer:"NEELY", era:"classic", stats:{G:"50",AST:"27",PTS:"77",PIM:"107"}, ctx:"1993-94 NHL Season — Boston Bruins", clues:["Scored 50 goals in only 49 games","Career was shortened by knee injuries","Played for Boston Bruins","Power forward who combined scoring and toughness"] },
  { player:"Peter Bondra", sport:"🏒 NHL", answer:"BONDRA", era:"classic", stats:{G:"52",AST:"28",PTS:"80",PIM:"40"}, ctx:"1997-98 NHL Season — Washington Capitals", clues:["Led the NHL in goals with 52","Played for Washington Capitals","Slovak player from Lutsk, Ukraine","One of the fastest skaters of his era"] },
  // More Modern Hard across sports
  { player:"A'ja Wilson", sport:"🏀 NBA", answer:"AJA", era:"modern", stats:{PTS:"26.8",REB:"11.9",BLK:"2.3",STL:"1.6"}, ctx:"2022 WNBA Season — Las Vegas Aces MVP", clues:["Won the WNBA MVP award for the second time","Led Las Vegas Aces to the WNBA Championship","Plays for Las Vegas Aces","From Hopkins, South Carolina"] },
  { player:"Wander Franco", sport:"⚾ MLB", answer:"FRANCO", era:"modern", stats:{AVG:".315",HR:"17",RBI:"68",OPS:".867"}, ctx:"2022 MLB Season — Tampa Bay Rays", clues:["One of the most hyped prospects in baseball history","Switch-hitting shortstop","Plays for Tampa Bay Rays","From Bani, Dominican Republic — signed at age 16 for $3.8M"] },
  { player:"Patrick Cantlay", sport:"⛳ Golf", answer:"CANTLAY", era:"modern", stats:{WINS:"4",MAJORS:"0",EARN:"$8.7M",YEAR:"2021"}, ctx:"2021 PGA Tour Season — FedEx Cup champion", clues:["Won the FedEx Cup in a dramatic playoff","Ranked among the top 5 players in the world","From Long Beach, California","Known for his calm demeanor nicknamed Patty Ice"] },
  { player:"Collin Morikawa", sport:"⛳ Golf", answer:"MORIKAWA", era:"modern", stats:{WINS:"2",MAJORS:"2",AVG:"69.47",YEAR:"2021"}, ctx:"2021 PGA Tour Season — Two majors at young age", clues:["Won The Open Championship this year","Became only 2nd player to win 2 majors in first 9 starts","From Los Angeles, California","Korean-American player nicknamed The Machine"] },
  { player:"Sam Burns", sport:"⛳ Golf", answer:"BURNS", era:"modern", stats:{WINS:"3",MAJORS:"0",EARN:"$6.8M",YEAR:"2022"}, ctx:"2022 PGA Tour Season — Three wins", clues:["Won 3 PGA Tour events in the same season","Known for his iron play and ball-striking","From Shreveport, Louisiana","Has won multiple Zurich Classic titles with partner Webb Simpson"] },
  { player:"Connor Bedard", sport:"🏒 NHL", answer:"BEDARD", era:"modern", stats:{G:"22",AST:"37",PTS:"61",YEAR:"2024"}, ctx:"2023-24 NHL Season — Chicago Blackhawks Rookie of Year", clues:["Won the Calder Trophy as NHL Rookie of the Year","Was the #1 overall pick in the 2023 NHL Draft","Plays for Chicago Blackhawks","From North Vancouver, British Columbia"] },
  // ── NEW HARD MODERN ──────────────────────────────────────────────────────────
  { player:"Bubba Watson", sport:"⛳ Golf", answer:"BUBBA", era:"modern", stats:{WINS:"2",MAJORS:"2",DRIVES:"350+",YEAR:"2012"}, ctx:"2012 Masters — Augusta National playoff win", clues:["Won the Masters with a famous hook shot from the pine straw","Is a left-handed golfer who never had a formal lesson","Won 2 Masters titles in his career","From Bagdad, Florida — known for his massive driving distance"] },
  { player:"Rich Hill", sport:"⚾ MLB", answer:"HILL", era:"modern", stats:{ERA:"2.12",W:"12",SO:"174",WHIP:"0.994"}, ctx:"2016 MLB Season — Los Angeles Dodgers comeback", clues:["Was out of baseball and pitching in an independent league in 2015","Came back to become one of the best pitchers in the NL","Played for Los Angeles Dodgers","Left-handed pitcher known for his curveball at age 36"] },
  { player:"Enes Kanter Freedom", sport:"🏀 NBA", answer:"KANTER", era:"modern", stats:{REB:"11.0",PTS:"14.4",FG:"58.4",YEAR:"2020"}, ctx:"2019-20 NBA Season — Boston Celtics", clues:["Led the NBA in offensive rebounds this season","Played for Boston Celtics","Later changed his name to Enes Kanter Freedom","Turkish-American center known for his outspoken political views"] },
  { player:"Jozy Altidore", sport:"⚽ Soccer", answer:"ALTIDORE", era:"modern", stats:{G:"42",APP:"115",MIN:"8423",YEAR:"2022"}, ctx:"Career — US Men's National Team all-time scorer", clues:["Was the 2nd all-time leading scorer for the USMNT","Played in the Netherlands, England, and MLS","From Boca Raton, Florida","Had a famous injury in the 2014 World Cup after one touch"] },
  { player:"Gabe Kapler", sport:"⚾ MLB", answer:"KAPLER", era:"modern", stats:{AVG:".268",HR:"13",RBI:"49",YEAR:"2002"}, ctx:"2002 World Series — Anaheim Angels", clues:["Was part of the Angels team that won the 2002 World Series","Later became a manager in MLB","Known for his extreme fitness regiment","Played outfield for multiple teams over his career"] },
  { player:"Karim Abdul-Jabbar", sport:"⚽ Soccer", answer:"KARIM SOCCER", era:"modern", stats:{G:"24",APP:"56",MIN:"4320",YEAR:"1998"}, ctx:"1997-98 MLS Season — LA Galaxy", clues:["Led MLS in scoring this season","Played for LA Galaxy in MLS","Changed his name — not to be confused with the NBA player","Was the face of early MLS soccer in Los Angeles"] },
  { player:"Jason Kidd", sport:"🏀 NBA", answer:"KIDD", era:"modern", stats:{AST:"9.9",REB:"6.4",STL:"1.9",PTS:"11.9"}, ctx:"2011 NBA Finals — Dallas Mavericks", clues:["Won his only NBA championship at age 38 with Dallas","Was 13 seasons into his career before winning a title","Led the NBA in assists multiple times","Was known as one of the best defensive point guards ever"] },
  { player:"Morten Andersen", sport:"🏈 NFL", answer:"ANDERSEN", era:"classic", stats:{PTS:"2544",FGM:"565",XP:"849",SEASONS:"25"}, ctx:"Career — All-time NFL scoring leader for 17 years", clues:["Was the NFL's all-time scoring leader for many years","Danish-born placekicker who played 25 seasons","Played for the Saints, Falcons, Giants, Chiefs, and Vikings","Nicknamed The Great Dane"] },
  { player:"Harold Baines", sport:"⚾ MLB", answer:"BAINES", era:"classic", stats:{HR:"384",AVG:".289",RBI:"1628",YEAR:"2019"}, ctx:"Career — Controversial Hall of Fame inductee", clues:["Was controversially elected to the Hall of Fame","Spent most of his career with the Chicago White Sox","Was a designated hitter for the majority of his career","His Hall of Fame election was criticized as it lowered the standards"] },
  { player:"Tony Perez", sport:"⚾ MLB", answer:"PEREZ", era:"classic", stats:{HR:"379",AVG:".279",RBI:"1652",YEAR:"1975"}, ctx:"1975 World Series — Cincinnati Reds Big Red Machine", clues:["Was a key part of the Cincinnati Reds Big Red Machine","Hit a crucial home run in Game 7 of the 1975 World Series","First baseman who played alongside Rose, Morgan, and Bench","From Camaguey, Cuba"] },
  { player:"Bob Lemon", sport:"⚾ MLB", answer:"LEMON", era:"legends", stats:{W:"207",ERA:"3.23",SO:"1277",CG:"188"}, ctx:"Career — Cleveland Indians pitching ace", clues:["Originally an infielder who converted to pitcher","Won 207 games as a converted position player","Played for Cleveland Indians his entire career","Later managed the Yankees to a World Series title in 1978"] },
  { player:"Herb Score", sport:"⚾ MLB", answer:"SCORE", era:"legends", stats:{ERA:"2.85",W:"36",SO:"508",YEAR:"1956"}, ctx:"1955-56 MLB Seasons — Cleveland Indians", clues:["Was considered the next great pitcher before a career-ending injury","Struck out 245 batters as a rookie in 1955","Was hit in the face by a line drive in 1957 that derailed his career","Left-handed pitcher for the Cleveland Indians"] },
  { player:"Allie Reynolds", sport:"⚾ MLB", answer:"REYNOLDS", era:"legends", stats:{W:"182",ERA:"3.30",NH:"2",CG:"137"}, ctx:"Career — New York Yankees ace pitcher", clues:["Threw 2 no-hitters in the same season (1951)","Won 6 World Series championships with the Yankees","Was part-Creek Native American","Nicknamed Superchief"] },
  { player:"Charley Trippi", sport:"🏈 NFL", answer:"TRIPPI", era:"legends", stats:{RUSH:"687",REC:"240",PASS:"1000+",YEAR:"1947"}, ctx:"1947 NFL Championship — Chicago Cardinals", clues:["Led the Chicago Cardinals to their only NFL title","Was an All-American at Georgia","Could run, pass, and return kicks at an elite level","Part of the Dream Backfield that won the 1947 championship"] },
  { player:"Marion Motley", sport:"🏈 NFL", answer:"MOTLEY", era:"legends", stats:{YDS:"828",AVG:"5.7",TD:"8",YEAR:"1950"}, ctx:"1950 NFL Season — Cleveland Browns", clues:["Was one of the first Black players in professional football","Led the NFL in rushing yards in 1950","Played for the Cleveland Browns under Paul Brown","Paved the way for integration in professional football"] },
  { player:"Ace Parker", sport:"🏈 NFL", answer:"PARKER", era:"legends", stats:{PASS:"865",RUSH:"321",INT:"6",YEAR:"1940"}, ctx:"1940 NFL MVP Season — Brooklyn Dodgers", clues:["Won the NFL MVP award in 1940","Played for the Brooklyn Dodgers football team","Was also a professional baseball player for the Philadelphia Athletics","One of the few players to play in both the NFL and MLB"] },
  { player:"Bill Tilden", sport:"🎾 Tennis", answer:"TILDEN", era:"legends", stats:{W:"138",L:"5",GS:"10",YEAR:"1925"}, ctx:"1925 ATP Season — Dominant American era", clues:["Won 10 Grand Slam titles in his career","Dominated tennis through the 1920s","First American player to win Wimbledon","Was ranked World No. 1 for 6 consecutive years"] },
  { player:"Rene Lacoste", sport:"🎾 Tennis", answer:"LACOSTE", era:"legends", stats:{GS:"7",DAVIS:"5",YEAR:"1927",NATION:"France"}, ctx:"1927 — French tennis dominant era", clues:["Won 7 Grand Slam titles in the 1920s","Was part of the famous Four Musketeers of French tennis","Founded the famous Lacoste clothing brand after retiring","Nicknamed The Crocodile — which inspired his clothing logo"] },
  { player:"Pancho Segura", sport:"🎾 Tennis", answer:"SEGURA", era:"legends", stats:{PRO:"1",YEAR:"1952",NATION:"Ecuador",TITLES:"3"}, ctx:"1950s Professional Tennis — Dominant pro circuit player", clues:["Won the US Pro Championship 3 consecutive times","Was from Guayaquil, Ecuador — one of the first Latino tennis stars","Had an unusual two-handed forehand before it was common","Later coached Jimmy Connors to multiple Grand Slam titles"] },
  { player:"Kel Nagle", sport:"⛳ Golf", answer:"NAGLE", era:"legends", stats:{WINS:"1",MAJORS:"1",YEAR:"1960",NATION:"Australia"}, ctx:"1960 British Open — St Andrews centenary", clues:["Won the 1960 British Open at St Andrews in the centenary celebration","Beat Arnold Palmer by one shot","Australian golfer who won the Open at age 39","Was considered a major upset over the heavily favored Palmer"] },
  { player:"Roberto De Vicenzo", sport:"⛳ Golf", answer:"DE VICENZO", era:"legends", stats:{WINS:"1",MAJORS:"1",YEAR:"1967",MISTAKE:"1"}, ctx:"1967 British Open — Hoylake, England", clues:["Won the 1967 British Open at age 44","Famous for signing an incorrect scorecard at the 1968 Masters — costing him a playoff","From Buenos Aires, Argentina","Won over 200 tournaments worldwide in his career"] },
  { player:"Julius Boros", sport:"⛳ Golf", answer:"BOROS", era:"legends", stats:{MAJORS:"3",AGE:"48",WINS:"18",YEAR:"1968"}, ctx:"1968 PGA Championship — oldest major winner", clues:["Won the 1968 PGA Championship at age 48 — oldest major winner ever","Won 3 major championships in his career","From Fairfield, Connecticut","Was known for his relaxed, unhurried swing"] },
  { player:"Khoury Randolph", sport:"🏈 NFL", answer:"RANDOLPH", era:"modern", stats:{INT:"6",PBU:"12",YDS:"65",YEAR:"2006"}, ctx:"2006 NFL Season — Chicago Bears defense", clues:["Was part of the Bears defense that reached Super Bowl XLI","Played cornerback for the Chicago Bears","Was an undrafted free agent who earned a starting role","The Bears defense that year was one of the best in the NFL"] },
  { player:"Virgil Trucks", sport:"⚾ MLB", answer:"TRUCKS", era:"legends", stats:{NH:"2",W:"5",ERA:"3.97",YEAR:"1952"}, ctx:"1952 MLB Season — Detroit Tigers", clues:["Threw 2 no-hitters in the same season despite finishing 5-19","Played for the Detroit Tigers","One of only 4 pitchers ever to throw 2 no-hitters in a season","The 2 no-hitters came in a losing season — one of baseball's strangest feats"] },
  { player:"Bobo Holloman", sport:"⚾ MLB", answer:"HOLLOMAN", era:"legends", stats:{NH:"1",W:"3",ERA:"5.23",YEAR:"1953"}, ctx:"1953 MLB Season — St. Louis Browns debut", clues:["Threw a no-hitter in his very first MLB start","Played for the St. Louis Browns","Was released later that same season after struggling","His no-hitter in his debut is one of the most unlikely in baseball history"] },
  { player:"Harvey Haddix", sport:"⚾ MLB", answer:"HADDIX", era:"legends", stats:{IP:"12",H:"0",BB:"0",SO:"8"}, ctx:"May 26, 1959 — Pittsburgh Pirates vs Milwaukee Braves", clues:["Pitched 12 perfect innings — the greatest pitching performance ever","Lost the perfect game AND the no-hitter in the 13th inning","Played for the Pittsburgh Pirates","His game is still considered the greatest pitching performance in MLB history despite the loss"] },
  { player:"Pete Vukovich", sport:"⚾ MLB", answer:"VUKOVICH", era:"classic", stats:{W:"18",ERA:"3.34",CG:"10",YEAR:"1982"}, ctx:"1982 AL Cy Young — Milwaukee Brewers", clues:["Won the AL Cy Young Award with the Milwaukee Brewers","Led the Brewers to the World Series this year","Was known as an intimidating presence on the mound","Later famously appeared as the villain pitcher in Major League"] },
  { player:"LaMarr Hoyt", sport:"⚾ MLB", answer:"HOYT", era:"classic", stats:{W:"24",ERA:"3.66",CG:"12",YEAR:"1983"}, ctx:"1983 AL Cy Young — Chicago White Sox", clues:["Won the AL Cy Young with 24 wins","Led the White Sox to the AL West title","Played for the Chicago White Sox","Won AL Cy Young despite not being considered an elite pitcher"] },
  { player:"Mike Flanagan", sport:"⚾ MLB", answer:"FLANAGAN", era:"classic", stats:{W:"23",ERA:"3.08",CG:"16",YEAR:"1979"}, ctx:"1979 AL Cy Young — Baltimore Orioles", clues:["Won the AL Cy Young with the Baltimore Orioles","Led Baltimore to the World Series this year","Left-handed pitcher from Manchester, New Hampshire","Was part of the great Orioles pitching staffs of the late 1970s"] },
  { player:"Hal Newhouser", sport:"⚾ MLB", answer:"NEWHOUSER", era:"legends", stats:{W:"25",ERA:"1.81",SO:"212",YEAR:"1945"}, ctx:"1945 MLB MVP Season — Detroit Tigers", clues:["Won back-to-back MVP awards in 1944 and 1945","Had a 1.81 ERA in 1945","Played for Detroit Tigers his entire career","His dominance during WWII was questioned since many stars were serving"] },
  { player:"Wally Berger", sport:"⚾ MLB", answer:"BERGER", era:"legends", stats:{HR:"38",AVG:".310",RBI:"119",YEAR:"1930"}, ctx:"1930 MLB Season — Boston Braves rookie", clues:["Set the NL rookie home run record with 38 HRs in 1930","The record stood for decades","Played for the Boston Braves","Was one of the best power hitters of the 1930s despite playing for weak teams"] },
  { player:"Dick Groat", sport:"⚾ MLB", answer:"GROAT", era:"legends", stats:{AVG:".325",HR:"2",RBI:"50",YEAR:"1960"}, ctx:"1960 NL MVP Season — Pittsburgh Pirates", clues:["Won the NL MVP as a shortstop who barely hit any home runs","Led the Pirates to the 1960 World Series championship","Was also a two-time All-American basketball player at Duke","Beat out Willie Mays for the MVP award"] },
  { player:"Norm Cash", sport:"⚾ MLB", answer:"CASH", era:"legends", stats:{HR:"41",AVG:".361",RBI:"132",YEAR:"1961"}, ctx:"1961 MLB Season — Detroit Tigers", clues:["Hit .361 with 41 HRs but never won an MVP award","Never came close to this season again in his career","Played for Detroit Tigers his entire career","Later admitted he used a corked bat during his .361 season"] },
  { player:"Jim Wynn", sport:"⚾ MLB", answer:"WYNN", era:"classic", stats:{HR:"32",AVG:".271",OBP:".396",YEAR:"1974"}, ctx:"1974 NL Championship Series — Los Angeles Dodgers", clues:["Led the Dodgers to the World Series this year","Was nicknamed The Toy Cannon for his small stature and power","Played for Houston Astros and Los Angeles Dodgers","Was one of the first power hitters to prioritize walks and OBP"] },
  { player:"Chet Lemon", sport:"⚾ MLB", answer:"CHET LEMON", era:"classic", stats:{HR:"24",AVG:".318",RBI:"86",YEAR:"1979"}, ctx:"1979 MLB Season — Chicago White Sox", clues:["Hit .318 with 24 HRs for the White Sox in 1979","Was one of the best defensive center fielders of the 1980s","Played for Chicago White Sox and Detroit Tigers","Won a World Series with the Tigers in 1984"] },
  { player:"Rick Reuschel", sport:"⚾ MLB", answer:"REUSCHEL", era:"classic", stats:{ERA:"2.79",W:"17",SO:"196",YEAR:"1977"}, ctx:"1977 MLB Season — Chicago Cubs", clues:["Was one of the most underrated pitchers of the 1970s and 80s","Known as Big Daddy for his large frame","Played for the Chicago Cubs and later the Giants","Finished 3rd in Cy Young voting multiple times without ever winning"] },
  { player:"Vada Pinson", sport:"⚾ MLB", answer:"PINSON", era:"legends", stats:{H:"204",AVG:".343",HR:"20",YEAR:"1959"}, ctx:"1959 MLB Season — Cincinnati Reds", clues:["Hit .343 with 204 hits as a 20-year-old in 1959","Was a perennial All-Star who never won an MVP","Played for Cincinnati Reds alongside Frank Robinson","Was considered one of the most underrated players of his era"] },
  { player:"Tommy John", sport:"⚾ MLB", answer:"TOMMY JOHN", era:"classic", stats:{W:"288",ERA:"3.34",CG:"162",SEASONS:"26"}, ctx:"Career — The surgery that bears his name", clues:["Pitched 26 seasons in the MLB spanning 4 decades","Had a revolutionary elbow surgery in 1974 that now bears his name","Returned to win 164 games after the surgery","Played for 6 different teams including the Yankees and Dodgers"] },
  { player:"Billy Pierce", sport:"⚾ MLB", answer:"PIERCE", era:"legends", stats:{W:"211",ERA:"3.27",SO:"1999",CG:"193"}, ctx:"Career — Chicago White Sox ace 1950s", clues:["Was the ace of the Chicago White Sox in the 1950s","Finished with 211 wins but is not in the Hall of Fame","Was a 7-time All-Star","Is considered one of the most underrated pitchers of the postwar era"] },
  { player:"Hal Greer", sport:"🏀 NBA", answer:"GREER", era:"legends", stats:{PTS:"22.1",REB:"5.3",AST:"4.7",YEAR:"1968"}, ctx:"1967-68 NBA Season — Philadelphia 76ers", clues:["Was the leading scorer on the 76ers team that went 68-13","Played all 15 seasons for the same franchise","Was known for shooting his free throws as jump shots","From Huntington, West Virginia — 10x NBA All-Star"] },
  { player:"Bailey Howell", sport:"🏀 NBA", answer:"HOWELL", era:"legends", stats:{PTS:"19.8",REB:"9.9",FG:"49.8",YEAR:"1966"}, ctx:"1965-66 NBA Season — Baltimore Bullets", clues:["Averaged nearly 20 points and 10 rebounds for Baltimore","Played for 6 teams in his career including the championship Celtics","Was a 6x NBA All-Star","From Middleton, Tennessee — Mississippi State standout"] },
  { player:"Clyde Lee", sport:"🏀 NBA", answer:"CLYDE LEE", era:"legends", stats:{REB:"14.0",PTS:"10.2",BLK:"2.1",YEAR:"1970"}, ctx:"1969-70 NBA Season — San Francisco Warriors", clues:["Was one of the best rebounders in the NBA in the late 1960s","Played for the San Francisco Warriors and Atlanta Hawks","Was a 7-footer before 7-footers were common","Played college ball at Vanderbilt University"] },
];



type Era = "modern" | "classic" | "legends";
type Puzzle = { player: string; sport: string; answer: string; era: Era; stats: Record<string, string>; ctx: string; clues: string[] };
type Difficulty = "easy" | "medium" | "hard";

const DIFF_CONFIG: Record<Difficulty, { label: string; guesses: number; color: string; bg: string; border: string; clueStyle: string; desc: string }> = {
  easy:   { label: "EASY",   guesses: 3, color: "#22c55e", bg: "rgba(34,197,94,0.12)",  border: "rgba(34,197,94,0.5)",  clueStyle: "Generous clues", desc: "GOATs & household names" },
  medium: { label: "MEDIUM", guesses: 3, color: "#f59e0b", bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.5)", clueStyle: "Vague clues",    desc: "All-Stars & champions" },
  hard:   { label: "HARD",   guesses: 3, color: "#ef4444", bg: "rgba(239,68,68,0.12)",  border: "rgba(239,68,68,0.5)",  clueStyle: "Cryptic clues",  desc: "Deep cuts & specialists" },
};

const POOLS: Record<Difficulty, Puzzle[]> = { easy: EASY, medium: MEDIUM, hard: HARD };
const SPORTS = ["🏀","🏈","⚾","⚽","🎾","⛳","🏒"];
const SPORT_LABELS: Record<string, string> = { "🏀":"Basketball","🏈":"Football","⚾":"Baseball","⚽":"Soccer","🎾":"Tennis","⛳":"Golf","🏒":"Hockey" };



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

function pickTodaysPuzzle(pool: Puzzle[], diff: Difficulty, filterKey: string): Puzzle {
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
    if (seen.length >= pool.length) {
      seen = [];
    }

    // Pick a random unseen puzzle using today's date as entropy
    const d = new Date();
    const entropy = d.getFullYear() * 10000 + (d.getMonth()+1) * 100 + d.getDate();
    const seenSet = new Set(seen);
    const unseen = pool.map((_,i) => i).filter(i => !seenSet.has(i));

    // Deterministic pick from unseen (same result all day for same user)
    const pick = unseen[entropy % unseen.length];

    // Save: mark as seen, store today's pick
    seen.push(pick);
    localStorage.setItem(seenKey, JSON.stringify(seen));
    localStorage.setItem(dailyKey, String(pick));

    return pool[pick];
  } catch {
    // Fallback if localStorage unavailable
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
          <button onClick={onClose} style={{ background:"none", border:"none", color:"#6b7280", cursor:"pointer", fontSize:"1.3rem" }}>✕</button>
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
            <p style={{ margin:"0 0 10px", color:"#fca5a5", fontSize:"0.78rem", textAlign:"center" }}>This will permanently delete your score and all history. Are you sure?</p>
            <div style={{ display:"flex", gap:8 }}>
              <button onClick={() => setConfirmReset(false)} style={{ flex:1, padding:"8px", borderRadius:8, border:"1px solid rgba(255,255,255,0.1)", background:"transparent", color:"#9ca3af", cursor:"pointer", fontSize:"0.78rem", fontFamily:"'Barlow Condensed',sans-serif" }}>CANCEL</button>
              <button onClick={onReset} style={{ flex:1, padding:"8px", borderRadius:8, border:"none", background:"rgba(239,68,68,0.8)", color:"#fff", cursor:"pointer", fontSize:"0.78rem", fontWeight:900, fontFamily:"'Bebas Neue',sans-serif", letterSpacing:"0.1em" }}>YES, RESET</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default function StatsIQ() {
  const [diff, setDiff] = useState<Difficulty>("easy");
  const [filter, setFilter] = useState(new Set<string>());
  const [eraFilter, setEraFilter] = useState(new Set<Era>());
  const [showFilter, setShowFilter] = useState(false);
  const [showHow, setShowHow] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [showSplash, setShowSplash] = useState<boolean>(() => {
    try { return !localStorage.getItem("statsiq_visited"); } catch { return true; }
  });
  const [username, setUsername] = useState<string>(() => {
    try { return localStorage.getItem("statsiq_username") || ""; } catch { return ""; }
  });
  const [usernameInput, setUsernameInput] = useState("");
  const [guesses, setGuesses] = useState<{ text: string; ok: boolean }[]>([]);
  const [input, setInput] = useState("");
  const [done, setDone] = useState(false);
  const [won, setWon] = useState(false);
  const [msg, setMsg] = useState("");
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  // Track which difficulties have been completed today

  useEffect(() => {
    document.title = "StatsIQ — Daily Sports Trivia";
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (!link) { link = document.createElement("link") as HTMLLinkElement; link.rel = "icon"; document.head.appendChild(link); }
    link.href = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📊</text></svg>";
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
      if (now !== lastDate) {
        lastDate = now;
        setCompletedToday(new Set());
      }
    }, 60000); // check every minute
    return () => clearInterval(interval);
  }, []);

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
  const puzzle = pickTodaysPuzzle(pool, diff, filterKey);
  const { player, sport, answer, stats, ctx, clues } = puzzle;
  const wrongCount = guesses.filter(g => !g.ok).length;

  const toggleSport = (e: string) => setFilter(prev => { const n = new Set(prev); n.has(e) ? n.delete(e) : n.add(e); return n; });
  const toggleEra = (e: Era) => setEraFilter(prev => { const n = new Set(prev); n.has(e) ? n.delete(e) : n.add(e); return n; });

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
    // Era multiplier: all 3 eras = 2x, 2 eras = 1.5x, 1 era = 1x, none selected (all) = 2x
    const eraCount = eraFilter.size === 0 ? 3 : eraFilter.size;
    const eraMult = eraCount === 3 ? 2 : eraCount === 2 ? 1.5 : 1;
    // Sport multiplier: all/none selected = 1x, partial = scales down slightly
    const sportCount = filter.size === 0 ? SPORTS.length : filter.size;
    const sportMult = sportCount >= SPORTS.length ? 1 : sportCount >= 8 ? 0.95 : sportCount >= 5 ? 0.85 : sportCount >= 3 ? 0.75 : 0.6;
    return Math.round(base * diffMult * eraMult * sportMult);
  };

  const [totalScore, setTotalScore] = useState<number>(() => {
    try { return parseInt(localStorage.getItem("statsiq_score") || "0"); } catch { return 0; }
  });
  const [todayScore, setTodayScore] = useState<number | null>(null);
  const [scoreBreakdown, setScoreBreakdown] = useState<{ base: number; diffMult: number; eraMult: number; sportMult: number; final: number } | null>(null);

  const awardScore = (guessNum: number) => {
    const base = GUESS_POINTS[guessNum] || 0;
    const diffMult = DIFF_MULT[diff];
    const eraCount = eraFilter.size === 0 ? 3 : eraFilter.size;
    const eraMult = eraCount === 3 ? 2 : eraCount === 2 ? 1.5 : 1;
    const sportCount = filter.size === 0 ? SPORTS.length : filter.size;
    const sportMult = sportCount >= SPORTS.length ? 1 : sportCount >= 8 ? 0.95 : sportCount >= 5 ? 0.85 : sportCount >= 3 ? 0.75 : 0.6;
    const final = Math.round(base * diffMult * eraMult * sportMult);
    setScoreBreakdown({ base, diffMult, eraMult, sportMult, final });
    setTodayScore(final);
    const newTotal = totalScore + final;
    setTotalScore(newTotal);
    // Save daily entry
    const today = new Date();
    const key = `statsiq_day_${today.getFullYear()}_${today.getMonth()+1}_${today.getDate()}_${diff}`;
    try {
      localStorage.setItem("statsiq_score", String(newTotal));
      localStorage.setItem(key, JSON.stringify({ score: final, guesses: guessNum, won: true, player, diff, date: today.toISOString() }));
    } catch {}
    return final;
  };

  const reset = useCallback(() => {
    // If this difficulty was already completed today, restore its result
    if (completedToday.has(diff)) {
      const today = new Date();
      const key = `statsiq_day_${today.getFullYear()}_${today.getMonth()+1}_${today.getDate()}_${diff}`;
      try {
        const entry = localStorage.getItem(key);
        if (entry) {
          const data = JSON.parse(entry);
          setDone(true);
          setWon(data.won);
          setGuesses(Array(data.guesses).fill(null).map((_, i) =>
            i === data.guesses - 1 && data.won
              ? { text: data.player, ok: true }
              : { text: "• • •", ok: false }
          ));
          setTodayScore(data.score);
          setVisible(false); setTimeout(() => setVisible(true), 300);
          return;
        }
      } catch {}
      // Even if no stored entry found, still lock it
      setDone(true); setWon(false);
      setGuesses([{ text: "• • •", ok: false }]);
      setVisible(false); setTimeout(() => setVisible(true), 300);
      return;
    }
    setGuesses([]); setInput(""); setDone(false); setWon(false); setMsg("");
    setTodayScore(null); setScoreBreakdown(null);
    setVisible(false); setTimeout(() => setVisible(true), 300);
  }, [diff, completedToday, puzzle]);
  useEffect(() => { setTimeout(() => setVisible(true), 300); }, []);
  useEffect(() => { reset(); }, [diff, filter, eraFilter]);

  const toast = (m: string, ms = 1800) => { setMsg(m); setTimeout(() => setMsg(""), ms); };

  const submit = useCallback(() => {
    const g = input.trim();
    if (!g) return;
    const n = (s: string) => s.toUpperCase().replace(/[^A-Z]/g, "");
    const parts = player.split(" ");
    // Match against: the answer key, first name, last name, or full name concatenated
    // Use the current puzzle's player/answer only — no cross-contamination
    const validAnswers = [answer, parts[0], parts[parts.length - 1], player.replace(/\s/g, "")];
    const isWin = validAnswers.some(v => v.length >= 2 && n(g) === n(v));
    const next = [...guesses, { text: g, ok: isWin }];
    setGuesses(next); setInput("");
    if (isWin) {
      awardScore(next.length);
      markDiffCompleted(diff);
      setTimeout(() => { setDone(true); setWon(true); }, 200);
      toast(["Legendary!", "Baller!", "Nice call!", "You know your stats!"][Math.min(next.length - 1, 3)], 2500);
    } else if (next.length >= cfg.guesses) {
      // Save failed attempt
      const today = new Date();
      const key = `statsiq_day_${today.getFullYear()}_${today.getMonth()+1}_${today.getDate()}_${diff}`;
      try { localStorage.setItem(key, JSON.stringify({ score: 0, guesses: next.length, won: false, player, diff, date: today.toISOString() })); } catch {}
      markDiffCompleted(diff);
      setTimeout(() => { setDone(true); setWon(false); }, 200);
      toast(`It was ${player}!`, 3500);
    } else {
      toast(wrongCount < clues.length ? "New clue unlocked! 👀" : "Wrong — keep guessing!");
    }
  }, [input, guesses, answer, player, clues.length, wrongCount, cfg.guesses, awardScore]);

  const share = () => {
    const date = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const rows = guesses.map(g => g.ok ? "🟩" : "🟥").join("");
    const scoreStr = todayScore ? ` · ${todayScore.toLocaleString()} pts` : "";
    const userStr = username ? `${username} | ` : "";
    const statPreview = Object.entries(stats).slice(0, 3).map(([k, v]) => `${k}: ${v}`).join(" / ");
    navigator.clipboard?.writeText(`📊 STATSIQ [${cfg.label}] — ${date}\n${userStr}${won ? guesses.length : "X"}/${cfg.guesses}${scoreStr}\n${rows}\n\n${sport} · ${statPreview}\nPlay at statsiq.io`)
      .then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  const nextDiff = diff === "easy" ? "MEDIUM" : "HARD";

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

      {showFilter && <FilterModal selectedSports={filter} selectedEras={eraFilter} onToggleSport={toggleSport} onToggleEra={toggleEra} onClose={() => setShowFilter(false)} totalCount={totalFiltered} />}
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
        setTotalScore(0);
        setShowHistory(false);
      }} />}

      {/* SPLASH SCREEN */}
      {showSplash && (
        <div style={{ position:"fixed", inset:0, zIndex:300, display:"flex", alignItems:"center", justifyContent:"center", background:"#080c14" }}>
          <div style={{ position:"absolute", top:"-20%", left:"50%", transform:"translateX(-50%)", width:600, height:400, background:"radial-gradient(ellipse, rgba(255,200,0,0.12) 0%, transparent 70%)", pointerEvents:"none" }} />
          <div style={{ textAlign:"center", padding:"0 32px", maxWidth:360 }}>
            <div style={{ fontSize:"3.5rem", marginBottom:16 }}>📊</div>
            <h1 style={{ margin:"0 0 6px", fontFamily:"'Bebas Neue',sans-serif", fontSize:"3rem", color:"#ffd700", letterSpacing:"0.2em", lineHeight:1 }}>STATSIQ</h1>
            <p style={{ margin:"0 0 8px", color:"#6b7280", fontSize:"0.7rem", letterSpacing:"0.3em" }}>DAILY SPORTS TRIVIA</p>
            <p style={{ margin:"0 0 32px", color:"#9ca3af", fontSize:"0.9rem", lineHeight:1.6 }}>
              3 puzzles a day — Easy, Medium, and Hard.<br/>Guess the athlete from a real stat line in 3 tries.
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:28 }}>
              {[["📊","Guess the athlete from a real stat line — 3 guesses to get it right"],["🎯","3 daily puzzles — one Easy, one Medium, one Hard"],["🔍","Filter by sport or era to tailor the challenge to you"],["⭐","Score points, build streaks, climb the leaderboard"]].map(([icon,text],i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:12, background:"rgba(255,255,255,0.04)", borderRadius:10, padding:"10px 14px", border:"1px solid rgba(255,255,255,0.07)" }}>
                  <span style={{ fontSize:"1.2rem", flexShrink:0 }}>{icon}</span>
                  <span style={{ color:"#d1d5db", fontSize:"0.82rem", textAlign:"left" }}>{text}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                setShowSplash(false);
                try { localStorage.setItem("statsiq_visited", "1"); } catch {}
                if (!username) { setUsernameInput(""); setShowUsernameModal(true); }
              }}
              style={{ width:"100%", padding:"14px", borderRadius:12, border:"none", background:"linear-gradient(135deg, #ffd700, #f59e0b)", color:"#0a0c10", fontWeight:900, fontSize:"1.1rem", cursor:"pointer", fontFamily:"'Bebas Neue',sans-serif", letterSpacing:"0.15em", boxShadow:"0 4px 30px rgba(255,200,0,0.4)" }}>
              LET'S PLAY →
            </button>
          </div>
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
              onKeyDown={e => { if (e.key === "Enter" && usernameInput.trim().length >= 2) { const u = usernameInput.trim(); setUsername(u); try { localStorage.setItem("statsiq_username", u); } catch {} setShowUsernameModal(false); } }}
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
                onClick={() => { const u = usernameInput.trim(); setUsername(u); try { localStorage.setItem("statsiq_username", u); } catch {} setShowUsernameModal(false); }}
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
          <div style={{ position:"relative", background:"#0f1629", border:"1px solid rgba(255,255,255,0.12)", borderRadius:16, padding:"28px 24px", width:320, textAlign:"center" }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowLeaderboard(false)} style={{ position:"absolute", top:14, right:14, background:"none", border:"none", color:"#6b7280", cursor:"pointer", fontSize:"1.3rem" }}>✕</button>
            <div style={{ fontSize:"2.5rem", marginBottom:12 }}>🏆</div>
            <h3 style={{ margin:"0 0 8px", color:"#ffd700", fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.6rem", letterSpacing:"0.15em" }}>LEADERBOARD</h3>
            <p style={{ margin:"0 0 20px", color:"#6b7280", fontSize:"0.78rem", lineHeight:1.5 }}>Global rankings are coming soon.<br/>Set your username now so you're ready.</p>

            {/* Fake preview leaderboard */}
            <div style={{ background:"rgba(255,255,255,0.03)", borderRadius:10, overflow:"hidden", marginBottom:16, border:"1px solid rgba(255,255,255,0.07)" }}>
              {[
                { rank:1, name:"SportsBrain99", score:"47,250", diff:"🔴" },
                { rank:2, name:"GridironGuru", score:"41,800", diff:"🔴" },
                { rank:3, name:"CourtVision", score:"38,400", diff:"🟡" },
                { rank:4, name:username || "YOU", score:totalScore.toLocaleString(), diff:"🟢", isYou:true },
                { rank:5, name:"StatKing", score:"29,100", diff:"🟡" },
              ].map((row, i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 14px", borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.05)" : "none", background: row.isYou ? "rgba(255,200,0,0.06)" : "transparent" }}>
                  <span style={{ color: i === 0 ? "#ffd700" : i === 1 ? "#9ca3af" : i === 2 ? "#cd7f32" : "#4b5563", fontFamily:"'Bebas Neue',sans-serif", fontSize:"0.9rem", width:20, flexShrink:0 }}>#{row.rank}</span>
                  <span style={{ flex:1, color: row.isYou ? "#ffd700" : "#d1d5db", fontSize:"0.82rem", fontWeight: row.isYou ? 700 : 400, textAlign:"left" }}>{row.name}</span>
                  <span style={{ fontSize:"0.7rem" }}>{row.diff}</span>
                  <span style={{ color: row.isYou ? "#ffd700" : "#9ca3af", fontFamily:"'Bebas Neue',sans-serif", fontSize:"0.85rem" }}>{row.score}</span>
                </div>
              ))}
            </div>

            <div style={{ background:"rgba(255,200,0,0.07)", border:"1px solid rgba(255,200,0,0.2)", borderRadius:8, padding:"10px 14px", marginBottom:16 }}>
              <p style={{ margin:0, color:"#fcd34d", fontSize:"0.72rem", lineHeight:1.4 }}>
                🚀 <strong>Coming soon</strong> — global leaderboard with daily, weekly, and all-time rankings. Keep stacking your score!
              </p>
            </div>

            {!username && (
              <button onClick={() => { setShowLeaderboard(false); setUsernameInput(""); setShowUsernameModal(true); }} style={{ width:"100%", padding:"11px", borderRadius:8, border:"none", background:"rgba(255,200,0,0.9)", color:"#0a0c10", fontWeight:900, fontFamily:"'Bebas Neue',sans-serif", letterSpacing:"0.1em", cursor:"pointer", fontSize:"0.9rem" }}>
                SET YOUR USERNAME NOW →
              </button>
            )}
          </div>
        </div>
      )}

      {showHow && (
        <div style={{ position:"fixed", inset:0, zIndex:200, display:"flex", alignItems:"center", justifyContent:"center" }} onClick={() => setShowHow(false)}>
          <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.75)", backdropFilter:"blur(4px)" }} />
          <div style={{ position:"relative", background:"#0f1629", border:"1px solid rgba(255,255,255,0.12)", borderRadius:16, padding:"24px 22px", width:310, maxHeight:"88vh", overflowY:"auto" }} onClick={e => e.stopPropagation()}>
            <h3 style={{ margin:"0 0 16px", color:"#ffd700", fontFamily:"'Bebas Neue', sans-serif", fontSize:"1.4rem", letterSpacing:"0.1em" }}>HOW TO PLAY</h3>

            {/* Gameplay */}
            {[["📊","You see a real stat line from a legendary performance"],["🤔","Guess the athlete — first name, last name, or full name"],["💡","Each wrong guess reveals a new clue"],["🏆","3 guesses per difficulty — use them wisely"],["📅","New stat line every day per difficulty"]].map(([icon,text],i) => (
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

            <button onClick={() => setShowHow(false)} style={{ marginTop:14, width:"100%", padding:"10px", borderRadius:8, border:"none", background:"rgba(255,200,0,0.9)", color:"#0a0c10", fontWeight:900, fontSize:"0.9rem", cursor:"pointer", fontFamily:"'Bebas Neue', sans-serif", letterSpacing:"0.1em" }}>LET'S PLAY</button>
          </div>
        </div>
      )}

      <header style={{ position:"relative", zIndex:10, width:"100%", maxWidth:500, padding:"14px 18px 0" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:"1px solid rgba(255,255,255,0.07)", paddingBottom:10 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ fontSize:"1.5rem" }}>📊</span>
            <div>
              <h1 style={{ margin:0, fontFamily:"'Bebas Neue', sans-serif", fontSize:"1.8rem", color:"#ffd700", letterSpacing:"0.15em", lineHeight:1 }}>STATSIQ</h1>
              <p style={{ margin:0, fontSize:"0.55rem", color:"#4b5563", letterSpacing:"0.3em" }}>DAILY SPORTS TRIVIA</p>
            </div>
          </div>
          {/* Right side: Player + Score + Leaderboard */}
          <div style={{ display:"flex", gap:7, alignItems:"center" }}>
            <button onClick={() => { setUsernameInput(username); setShowUsernameModal(true); }} style={{ textAlign:"center", background:"none", border:"none", cursor:"pointer", padding:0, minWidth:60, maxWidth:90 }}>
              <p style={{ margin:0, fontSize:"0.52rem", color:"#4b5563", letterSpacing:"0.15em" }}>PLAYER</p>
              <p style={{ margin:0, fontSize:"0.78rem", fontWeight:900, color: username ? "#fff" : "#4b5563", fontFamily:"'Bebas Neue',sans-serif", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{username || "SET NAME"}</p>
            </button>
            <button onClick={() => setShowHistory(true)} style={{ textAlign:"center", background:"none", border:"none", cursor:"pointer", padding:0, minWidth:48 }}>
              <p style={{ margin:0, fontSize:"0.52rem", color:"#4b5563", letterSpacing:"0.15em" }}>SCORE</p>
              <p style={{ margin:0, fontSize:"0.9rem", fontWeight:900, color:"#ffd700", fontFamily:"'Bebas Neue',sans-serif" }}>{totalScore.toLocaleString()}</p>
            </button>
            <button onClick={() => setShowLeaderboard(true)} style={{ width:30, height:30, borderRadius:8, border:"1px solid rgba(255,200,0,0.25)", background:"rgba(255,200,0,0.05)", color:"rgba(255,215,0,0.6)", cursor:"pointer", fontSize:"0.85rem", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }} title="Leaderboard">🏅</button>
          </div>
        </div>
        {/* Second row: filter + help — full width, centered on mobile */}
        <div style={{ display:"flex", gap:8, marginTop:8, alignItems:"center", justifyContent:"center" }}>
          <button onClick={() => setShowFilter(true)} style={{ display:"flex", alignItems:"center", gap:5, padding:"5px 12px", borderRadius:8, border:`1px solid ${hasFilter ? "rgba(34,197,94,0.5)" : "rgba(255,255,255,0.12)"}`, background:hasFilter ? "rgba(34,197,94,0.1)" : "rgba(255,255,255,0.04)", color:hasFilter ? "#86efac" : "#9ca3af", cursor:"pointer", fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.1em", fontFamily:"'Barlow Condensed', sans-serif" }}>
            ⚙️ {filterLabel()}
          </button>
          <button onClick={() => setShowHow(true)} style={{ width:30, height:30, borderRadius:"50%", border:"1px solid rgba(255,200,0,0.2)", background:"rgba(255,200,0,0.05)", color:"rgba(255,215,0,0.6)", cursor:"pointer", fontSize:"0.82rem", fontWeight:900, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>?</button>
        </div>
        <div style={{ display:"flex", gap:8, marginTop:12, marginBottom:4 }}>
          {(["easy","medium","hard"] as Difficulty[]).map(d => {
            const c = DIFF_CONFIG[d]; const active = diff === d;
            const isCompleted = completedToday.has(d);
            return (
              <button key={d} onClick={() => setDiff(d)} style={{ flex:1, padding:"8px 0", borderRadius:10, border:`2px solid ${active ? c.color : isCompleted ? c.color+"66" : "rgba(255,255,255,0.08)"}`, background:active ? c.bg : isCompleted ? c.bg+"88" : "rgba(255,255,255,0.02)", cursor:"pointer", fontFamily:"'Bebas Neue', sans-serif", transition:"all 0.2s", position:"relative" }}>
                <div style={{ color:active ? c.color : isCompleted ? c.color+"aa" : "#4b5563", fontWeight:900, fontSize:"0.9rem", letterSpacing:"0.1em" }}>
                  {isCompleted ? "✓ " : ""}{c.label}
                </div>
                <div style={{ color:active ? c.color : isCompleted ? c.color+"88" : "#374151", fontSize:"0.55rem", letterSpacing:"0.08em", marginTop:1, opacity:0.8 }}>
                  {isCompleted ? "DONE" : `${c.guesses} GUESSES`}
                </div>
              </button>
            );
          })}
        </div>
        <p style={{ margin:"4px 0 8px", fontSize:"0.65rem", color:"#4b5563", letterSpacing:"0.1em", textAlign:"center" }}>{cfg.desc} · {cfg.clueStyle}</p>
      </header>

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
              <span style={{ fontSize:"0.58rem", fontWeight:700, letterSpacing:"0.18em", color:`${cfg.color}99`, marginTop:3, fontFamily:"'Barlow Condensed', sans-serif" }}>{key}</span>
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
            <p style={{ margin:"0 0 2px", fontSize:"1.6rem" }}>{won?"🏆":"😔"}</p>
            <p style={{ margin:"0 0 2px", fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.4rem", color:won?"#22c55e":"#ef4444", letterSpacing:"0.1em" }}>{won?"CORRECT!":"GAME OVER"}</p>
            <p style={{ margin:"0 0 10px", color:"#d1d5db", fontSize:"0.85rem" }}>The answer was <span style={{ color:"#ffd700", fontWeight:900 }}>{player}</span></p>

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
              </div>
            )}

            {/* Total score */}
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", background:"rgba(255,215,0,0.06)", borderRadius:8, padding:"8px 14px", marginBottom:12, border:"1px solid rgba(255,215,0,0.2)" }}>
              <span style={{ color:"#6b7280", fontSize:"0.7rem", letterSpacing:"0.12em", fontFamily:"'Bebas Neue',sans-serif" }}>TOTAL SCORE</span>
              <div style={{ display:"flex", alignItems:"baseline", gap:6 }}>
                <span style={{ color:"#ffd700", fontWeight:900, fontSize:"1.2rem", fontFamily:"'Bebas Neue',sans-serif" }}>{totalScore.toLocaleString()}</span>
                <span style={{ color:"#4b5563", fontSize:"0.62rem" }}>all time</span>
              </div>
            </div>

            <p style={{ margin:"0 0 10px", color:"#6b7280", fontSize:"0.68rem" }}>{sport} · {ctx}</p>
            <div style={{ display:"flex", gap:8, justifyContent:"center" }}>
              <button onClick={share} style={{ padding:"10px 20px", borderRadius:8, border:"none", background:copied?"rgba(34,197,94,0.3)":"rgba(255,200,0,0.9)", color:copied?"#fff":"#0a0c10", fontWeight:900, fontSize:"0.85rem", cursor:"pointer", fontFamily:"'Bebas Neue',sans-serif", letterSpacing:"0.1em" }}>
                {copied?"✓ COPIED!":"📤 SHARE"}
              </button>
              {diff !== "hard" && (
              <button onClick={() => setDiff(diff==="easy"?"medium":"hard")} style={{ padding:"10px 20px", borderRadius:8, border:`1px solid ${cfg.border}`, background:cfg.bg, color:cfg.color, fontWeight:900, fontSize:"0.85rem", cursor:"pointer", fontFamily:"'Bebas Neue',sans-serif", letterSpacing:"0.1em" }}>
                TRY {nextDiff} →
              </button>
              )}
            </div>
            <p style={{ margin:"10px 0 0", color:"#374151", fontSize:"0.62rem", letterSpacing:"0.15em" }}>NEW STAT LINE EVERY DAY</p>
          </div>
        )}
      </div>

      {msg && <div style={{ position:"fixed", top:70, left:"50%", transform:"translateX(-50%)", zIndex:100, background:"#fff", color:"#111", padding:"9px 22px", borderRadius:8, fontWeight:700, fontSize:"0.88rem", boxShadow:"0 8px 32px rgba(0,0,0,0.4)", whiteSpace:"nowrap", fontFamily:"'Barlow Condensed', sans-serif" }}>{msg}</div>}
      <Analytics />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;700;900&display=swap');
        * { box-sizing:border-box; } body { margin:0; background:#080c14; }
        input::placeholder { color:rgba(255,255,255,0.2); } input:focus { outline:none; }
        input[type="text"], input:not([type]) { font-size:16px !important; }
        html { scroll-behavior:smooth; }
      `}</style>
    </div>
  );
}
