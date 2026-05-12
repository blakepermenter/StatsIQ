import React, { useState, useEffect, useCallback } from "react";
import { Analytics } from "@vercel/analytics/react";

// ─── EASY (45 puzzles) ────────────────────────────────────────────────────────
const EASY = [
  { player:"Michael Jordan", sport:"🏀 NBA", answer:"JORDAN", era:"classic", stats:{PTS:"45",REB:"9",AST:"6",STL:"3",BLK:"1"}, ctx:"1992 NBA Finals Game 1 vs Portland Trail Blazers", clues:["Shot 6-for-6 from three in the first half","Won 6 NBA championships total","Played for the Chicago Bulls","Wore number 23"] },
  { player:"Kobe Bryant", sport:"🏀 NBA", answer:"KOBE", era:"modern", stats:{PTS:"81",REB:"6",AST:"2",STL:"3",BLK:"1"}, ctx:"Jan 22, 2006 — vs Toronto Raptors", clues:["2nd highest single-game score in NBA history","Scored 55 in the second half alone","Played entire career with the LA Lakers","Nickname: Black Mamba"] },
  { player:"Wilt Chamberlain", sport:"🏀 NBA", answer:"WILT", era:"legends", stats:{PTS:"100",REB:"25",AST:"2"}, ctx:"March 2, 1962 — vs New York Knicks", clues:["All-time NBA single-game scoring record","Record stood over 60 years","Played for the Philadelphia Warriors","Averaged 50.4 PPG that entire season"] },
  { player:"LeBron James", sport:"🏀 NBA", answer:"LEBRON", era:"modern", stats:{PTS:"27.2",REB:"7.4",AST:"8.3",STL:"1.6"}, ctx:"2012-13 NBA Season — Miami Heat MVP", clues:["Averaged 26.1 points, 7.3 rebounds, and 7.3 assists this season","Was playing for Miami Heat","Has 4 NBA championships total","Known as The King"] },
  { player:"Stephen Curry", sport:"🏀 NBA", answer:"CURRY", era:"modern", stats:{PTS:"30.1",REB:"5.4",AST:"6.7","3PM":"5.1"}, ctx:"2015-16 NBA Season — Unanimous MVP", clues:["First unanimous MVP in NBA history","Team won a record 73 games","Plays for Golden State Warriors","All-time leader in three-pointers made"] },
  { player:"Shaquille O'Neal", sport:"🏀 NBA", answer:"SHAQ", era:"modern", stats:{PTS:"38.7",REB:"16.7",AST:"2.3","FG%":"61"}, ctx:"2000 NBA Finals MVP — vs Indiana Pacers", clues:["Averaged 38 points per game in that Finals series","Shot over 60% from the field","Played for the Los Angeles Lakers","Nickname: Diesel"] },
  { player:"Magic Johnson", sport:"🏀 NBA", answer:"MAGIC", era:"classic", stats:{PTS:"26.2",REB:"7",AST:"12.2",STL:"2.3"}, ctx:"1987 NBA Finals MVP — Los Angeles Lakers", clues:["His team defeated the Indiana Pacers in 6 games","His team defeated the Boston Celtics","Nicknamed Magic for his passing ability","Wore number 32 for the Showtime Lakers"] },
  { player:"Larry Bird", sport:"🏀 NBA", answer:"BIRD", era:"classic", stats:{PTS:"29",REB:"11.5",AST:"6.1","FG%":"52.7"}, ctx:"1984 NBA Finals MVP — Boston Celtics", clues:["His team came back from 3-2 down to win the series","His team defeated the Los Angeles Lakers","3x NBA MVP in a row","Nicknamed The Hick from French Lick"] },
  { player:"Tom Brady", sport:"🏈 NFL", answer:"BRADY", era:"modern", stats:{YDS:"505",TD:"3",INT:"0",COMP:"43"}, ctx:"Super Bowl LII vs Philadelphia Eagles 2018", clues:["His team lost despite these numbers","His 8th Super Bowl appearance","Played for New England Patriots","Won 7 Super Bowls total"] },
  { player:"Patrick Mahomes", sport:"🏈 NFL", answer:"MAHOMES", era:"modern", stats:{YDS:"360",TD:"3",INT:"0",COMP:"21"}, ctx:"Super Bowl LVII MVP vs Philadelphia Eagles", clues:["Had a famous 74-yard touchdown run in this game","Played through an ankle injury","Plays for Kansas City Chiefs","Won his second Super Bowl"] },
  { player:"Jerry Rice", sport:"🏈 NFL", answer:"RICE", era:"classic", stats:{REC:"11",YDS:"215",TD:"3",YPR:"19.5"}, ctx:"Super Bowl XXIII — Named MVP", clues:["Won Super Bowl MVP as WR","Played for San Francisco 49ers","Holds NFL records for career receptions, yards, and TDs","Holds NFL record for career TDs"] },
  { player:"Peyton Manning", sport:"🏈 NFL", answer:"MANNING", era:"modern", stats:{YDS:"5477",TD:"55",INT:"10",RTG:"115.1"}, ctx:"2013 NFL Season — Single season TD record", clues:["Set the single-season TD record (55)","Won MVP this season","Played for the Denver Broncos","Brother Eli also played QB in NFL"] },
  { player:"Walter Payton", sport:"🏈 NFL", answer:"PAYTON", era:"classic", stats:{CAR:"339",YDS:"1852",TD:"14",YPC:"5.5"}, ctx:"1977 NFL Season — Chicago Bears", clues:["Rushed for 1852 yards — NFL record at the time","Won NFL MVP this season","Played for Chicago Bears","Nicknamed Sweetness"] },
  { player:"Joe Montana", sport:"🏈 NFL", answer:"MONTANA", era:"classic", stats:{YDS:"357",TD:"2",INT:"0",RTG:"115.2"}, ctx:"Super Bowl XIX MVP — San Francisco 49ers vs Dolphins", clues:["Won his third Super Bowl MVP","Never threw an INT in 4 Super Bowls","Played for San Francisco 49ers","Nicknamed Joe Cool for his composure"] },
  { player:"Babe Ruth", sport:"⚾ MLB", answer:"RUTH", era:"legends", stats:{HR:"60",AVG:".356",RBI:"164",OBP:".486"}, ctx:"1927 MLB Season — New York Yankees", clues:["Set the single-season HR record","Team nicknamed Murderers Row","Played for New York Yankees","Nickname: Sultan of Swat"] },
  { player:"Barry Bonds", sport:"⚾ MLB", answer:"BONDS", era:"modern", stats:{HR:"73",AVG:".328",RBI:"137",OBP:".515"}, ctx:"2001 MLB Season — San Francisco Giants", clues:["All-time single-season HR record","Won 7 MVP awards in career","Played for San Francisco Giants","His godfather was Willie Mays"] },
  { player:"Derek Jeter", sport:"⚾ MLB", answer:"JETER", era:"modern", stats:{AVG:".309",HR:"9",RBI:"75",H:"184"}, ctx:"2000 World Series MVP Season — Yankees", clues:["Also won 4 Gold Gloves at his position","Nicknamed The Captain","Played entire career for Yankees","Made The Flip Play in 2001"] },
  { player:"Hank Aaron", sport:"⚾ MLB", answer:"AARON", era:"legends", stats:{HR:"40",AVG:".328",RBI:"130",SLG:".600"}, ctx:"1963 MLB Season — Milwaukee Braves", clues:["Hit 40 HRs and batted .328 this season","All-time HR record holder for decades","Played for the Milwaukee/Atlanta Braves","Nicknamed Hammerin Hank"] },
  { player:"Ken Griffey Jr.", sport:"⚾ MLB", answer:"GRIFFEY", era:"classic", stats:{HR:"56",AVG:".303",RBI:"147",SLG:".628"}, ctx:"1997 MLB Season — Seattle Mariners", clues:["Won AL MVP this season","Hit 56 home runs","Played for Seattle Mariners","Wore number 24, famous for his backward cap"] },
  { player:"Lionel Messi", sport:"⚽ Soccer", answer:"MESSI", era:"modern", stats:{G:"91",AST:"13",APP:"69",MIN:"5765"}, ctx:"2012 Calendar Year — FC Barcelona World Record", clues:["Record for most goals in a calendar year","Won the Ballon d'Or that year","Played for FC Barcelona","From Argentina"] },
  { player:"Cristiano Ronaldo", sport:"⚽ Soccer", answer:"RONALDO", era:"modern", stats:{G:"50",AST:"15",APP:"55",MIN:"4743"}, ctx:"2011-12 La Liga Season — Real Madrid", clues:["Scored 50 La Liga goals in one season","Won La Liga that season","Played for Real Madrid","From Portugal"] },
  { player:"Pele", sport:"⚽ Soccer", answer:"PELE", era:"classic", stats:{G:"4",AST:"4",APP:"6",MIN:"540"}, ctx:"1970 FIFA World Cup — Brazil", clues:["Won his third World Cup with Brazil","Scored 4 goals and 4 assists in the tournament","Brazilian forward who played from the 1950s-70s","His real name is Edson Arantes do Nascimento"] },
  { player:"Roger Federer", sport:"🎾 Tennis", answer:"FEDERER", era:"modern", stats:{W:"81",L:"4",TITLES:"8",GS:"3"}, ctx:"2005 ATP Season", clues:["Won 3 Grand Slams this year","Won Wimbledon this year","From Switzerland","Ended year ranked World No. 1"] },
  { player:"Serena Williams", sport:"🎾 Tennis", answer:"SERENA", era:"modern", stats:{W:"78",L:"4",TITLES:"11",GS:"3"}, ctx:"2013 WTA Season — World No. 1", clues:["Won 3 Grand Slams including Wimbledon","Finished ranked World No. 1","From the United States","Sister Venus also plays professionally"] },
  { player:"Rafael Nadal", sport:"🎾 Tennis", answer:"NADAL", era:"modern", stats:{W:"82",L:"3",TITLES:"8",GS:"1"}, ctx:"2010 ATP Season — Completed the Career Golden Slam", clues:["Won the French Open this year","Also won Wimbledon, US Open, and Australian Open","From Spain, known as King of Clay","Completed Career Golden Slam"] },
  { player:"Tiger Woods", sport:"⛳ Golf", answer:"TIGER", era:"modern", stats:{WINS:"9",MAJORS:"3",AVG:"68.56",CUTS:"20/20"}, ctx:"2000 PGA Tour — Won 3 of 4 majors, made every cut", clues:["Won 3 of 4 majors this year","Made every single cut","Won US Open by 15 strokes","His last name is a large cat"] },
  { player:"Jack Nicklaus", sport:"⛳ Golf", answer:"NICKLAUS", era:"classic", stats:{W:"17",MAJORS:"2",AVG:"70.2",EARN:"$286K"}, ctx:"1972 PGA Tour Season — Two majors", clues:["Won The Masters and US Open this year","Known as The Golden Bear","Holds the record for most major championships (18)","Holds the record for most major championships (18)"] },
  { player:"Wayne Gretzky", sport:"🏒 NHL", answer:"GRETZKY", era:"classic", stats:{G:"92",AST:"120",PTS:"212",PIM:"26"}, ctx:"1981-82 NHL Season — Edmonton Oilers", clues:["All-time single-season goals record","212 points is the all-time record","Played for Edmonton Oilers","Holds or shares 61 NHL records"] },
  { player:"Sidney Crosby", sport:"🏒 NHL", answer:"CROSBY", era:"modern", stats:{G:"36",AST:"72",PTS:"108",PIM:"34"}, ctx:"2017 Stanley Cup Finals MVP — Pittsburgh Penguins", clues:["Won second consecutive Stanley Cup MVP","Played for Pittsburgh Penguins","From Cole Harbour, Nova Scotia, Canada","Nicknamed Sid the Kid"] },
  { player:"Mia Hamm", sport:"⚽ Soccer", answer:"HAMM", era:"classic", stats:{G:"9",AST:"4",APP:"6",MIN:"540"}, ctx:"1999 FIFA Women's World Cup — USA Champions", clues:["Won the Women's World Cup with USA","USA beat China in the famous penalty shootout final","Two-time FIFA World Cup champion and two-time Olympic gold medalist","Her penalty kick in the final was saved but USA still won"] },
  { player:"Steffi Graf", sport:"🎾 Tennis", answer:"GRAF", era:"classic", stats:{W:"96",L:"2",GS:"4",TITLES:"11"}, ctx:"1988 WTA Season — Golden Slam", clues:["Won all 4 Grand Slams AND Olympic gold in one year","Only player to ever achieve a Golden Slam","From West Germany","Married to Andre Agassi"] },
  { player:"Pete Sampras", sport:"🎾 Tennis", answer:"SAMPRAS", era:"classic", stats:{W:"82",L:"9",GS:"2",TITLES:"6"}, ctx:"1994 ATP Season — World No. 1", clues:["Won 2 Grand Slams this year including Wimbledon","Ended year ranked World No. 1","Won 14 Grand Slams total in his career","American player nicknamed Pistol Pete"] },
  { player:"Alex Ovechkin", sport:"🏒 NHL", answer:"OVECHKIN", era:"modern", stats:{G:"65",AST:"47",PTS:"112",PIM:"50"}, ctx:"2007-08 NHL Season — Hart Trophy MVP", clues:["Scored 65 goals — one of the highest totals in NHL history","Scored 65 goals — one of the highest totals ever","Plays for Washington Capitals","From Moscow, Russia"] },
  // Basketball - Modern
  { player:"Nikola Jokic", sport:"🏀 NBA", answer:"JOKIC", era:"modern", stats:{PTS:"26.4",REB:"11.0",AST:"9.0","FG%":"58.3"}, ctx:"2021-22 NBA Season — Denver Nuggets MVP", clues:["Won his second consecutive MVP award","Plays for the Denver Nuggets","Serbian center nicknamed The Joker","Drafted 41st overall in 2014"] },
  { player:"Joel Embiid", sport:"🏀 NBA", answer:"EMBIID", era:"modern", stats:{PTS:"33.1",REB:"10.2",AST:"4.2",BLK:"1.7"}, ctx:"2022-23 NBA Season — Philadelphia 76ers MVP", clues:["Won his first MVP award this season","Led the NBA in scoring","Plays for Philadelphia 76ers","From Cameroon, nicknamed The Process"] },
  { player:"Luka Doncic", sport:"🏀 NBA", answer:"LUKA", era:"modern", stats:{PTS:"33.9",REB:"9.2",AST:"9.8","3PM":"4.3"}, ctx:"2023-24 NBA Season — Dallas Mavericks", clues:["Led the NBA in scoring this season","Plays for the Dallas Mavericks","From Ljubljana, Slovenia","Was the EuroLeague MVP at age 19"] },
  // Basketball - Classic
  { player:"Scottie Pippen", sport:"🏀 NBA", answer:"PIPPEN", era:"classic", stats:{PTS:"22.0",REB:"8.7",AST:"5.9",STL:"2.9"}, ctx:"1994 NBA Playoffs — Chicago Bulls (Jordan retired)", clues:["Led the Bulls without Michael Jordan","Finished 5th in MVP voting this year","Won 6 championships with Jordan","Often called the most underrated player ever"] },
  { player:"Dennis Rodman", sport:"🏀 NBA", answer:"RODMAN", era:"classic", stats:{REB:"18.7",PTS:"5.8",STL:"0.8",BLK:"0.5"}, ctx:"1991-92 NBA Season — Detroit Pistons rebounding title", clues:["Led the NBA in rebounding for the 2nd consecutive year","Played for the Detroit Pistons","Won 7 consecutive rebounding titles","Known as The Worm"] },
  { player:"Patrick Ewing", sport:"🏀 NBA", answer:"EWING", era:"classic", stats:{PTS:"28.6",REB:"11.2",BLK:"3.0",AST:"2.4"}, ctx:"1989-90 NBA Season — New York Knicks", clues:["Led the Knicks to the best record in the East","Finished 3rd in MVP voting","Played for the New York Knicks","Jamaican-born center from Georgetown"] },
  { player:"Isiah Thomas", sport:"🏀 NBA", answer:"ISIAH", era:"classic", stats:{PTS:"33.0",REB:"8.0",AST:"8.0",STL:"1.8"}, ctx:"1988 NBA Finals MVP — Detroit Pistons", clues:["Scored 25 points in one quarter on a badly sprained ankle","Scored 25 points in one quarter on a bad ankle","Played for the Detroit Pistons","Nicknamed Zeke, led the Bad Boys"] },
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
  { player:"Clayton Kershaw", sport:"⚾ MLB", answer:"KERSHAW", era:"modern", stats:{ERA:"1.77",W:"21",SO:"232",WHIP:"0.857"}, ctx:"2014 NL MVP and Cy Young — Los Angeles Dodgers", clues:["The last pitcher to win the MVP award outright","Had a 1.77 ERA this season","Plays for the Los Angeles Dodgers","From Dallas, Texas, nicknamed The Claw"] },
  { player:"Shohei Ohtani", sport:"⚾ MLB", answer:"OHTANI", era:"modern", stats:{HR:"171",ERA:"2.91",SB:"50",MVP:"2"}, ctx:"Career through 2024 — The two-way phenomenon", clues:["Has won 2 AL MVP awards as both a pitcher AND hitter","Hit 50 home runs and stole 50 bases in the same season in 2023","First player since Babe Ruth to be an elite starter AND elite hitter in the same season","Won AL MVP in 2021 with 46 HRs and a 3.18 ERA — the first unanimous two-way MVP"] },
  { player:"Ronald Acuna Jr.", sport:"⚾ MLB", answer:"ACUNA", era:"modern", stats:{HR:"41",SB:"73",AVG:".337",AGE:"25"}, ctx:"2023 NL MVP Season — Historic 40-70 club", clues:["First player in MLB history to hit 40 HRs and steal 70 bases in one season","Won the NL MVP award unanimously","Became the first player in MLB history to record a 40 HR and 60 SB season","Was named to 5 All-Star teams before age 26"] },
  { player:"Mookie Betts", sport:"⚾ MLB", answer:"MOOKIE", era:"modern", stats:{HR:"220",AVG:".296",SB:"140",GG:"6"}, ctx:"Career highlights — Five-tool superstar", clues:["Won 6 Gold Gloves as one of the best defensive outfielders ever","Won both the AL MVP and a World Series in the same year (2018)","Has hit over 200 home runs and stolen over 100 bases in his career","One of fewer than 10 players in MLB history to hit 20 HR and steal 20 bases in 5 different seasons"] },
  { player:"Freddie Freeman", sport:"⚾ MLB", answer:"FREEMAN", era:"modern", stats:{AVG:".302",HR:"252",RBI:"1114",WS:"2"}, ctx:"Career highlights — Two-franchise cornerstone", clues:["Won World Series championships with both Atlanta and Los Angeles","Won the NL MVP award in 2020","Hit over .300 with 30+ HRs in 6 different seasons","Was a 6-time All-Star and won a Gold Glove at first base"] },
  { player:"Juan Soto", sport:"⚾ MLB", answer:"SOTO", era:"modern", stats:{AVG:".314",HR:"34",RBI:"109",OBP:".465"}, ctx:"2021 MLB Season — Washington Nationals", clues:["Led the NL in OBP with .465","Played for Washington Nationals","From Santo Domingo, Dominican Republic","Known for the Soto Shuffle at the plate"] },
  { player:"Ichiro Suzuki", sport:"⚾ MLB", answer:"ICHIRO", era:"modern", stats:{H:"262",AVG:".372",SB:"36",RBI:"69"}, ctx:"2004 MLB Season — Seattle Mariners, all-time hits record", clues:["Set the all-time single-season hits record (262)","Won both MVP and Gold Glove awards this year","Played for Seattle Mariners","From Toyoyama, Japan — first Japanese position player in MLB"] },
  // Baseball - Classic
  { player:"Roger Clemens", sport:"⚾ MLB", answer:"CLEMENS", era:"classic", stats:{ERA:"1.93",W:"21",SO:"291",WHIP:"0.970"}, ctx:"1997 AL Cy Young Season — Toronto Blue Jays", clues:["Signed with Toronto as a free agent before this season","Struck out 291 batters","Played for the Toronto Blue Jays","Known as one of the most intimidating pitchers ever"] },
  { player:"Frank Thomas", sport:"⚾ MLB", answer:"THOMAS", era:"classic", stats:{HR:"41",AVG:".323",RBI:"128",OBP:".426"}, ctx:"1994 AL MVP Season — Chicago White Sox", clues:["Won his second consecutive AL MVP","Played for Chicago White Sox","Nicknamed The Big Hurt","6ft 5in first baseman with elite plate discipline"] },
  { player:"Jeff Bagwell", sport:"⚾ MLB", answer:"BAGWELL", era:"classic", stats:{HR:"39",AVG:".368",RBI:"116",OPS:"1.201"}, ctx:"1994 NL MVP Season — Houston Astros", clues:["Won the NL MVP in the strike-shortened season","Had an OPS over 1.200","Played for the Houston Astros","Known for his unusual wide batting stance"] },
  { player:"Tony Gwynn", sport:"⚾ MLB", answer:"GWYNN", era:"classic", stats:{AVG:".394",HR:"12",H:"165",SO:"19"}, ctx:"1994 MLB Season — San Diego Padres", clues:["Hit .394 — closest to .400 since Ted Williams","Struck out only 19 times all season","Played for the San Diego Padres","His T206 baseball card is the most valuable in history"] },
  { player:"Nolan Ryan", sport:"⚾ MLB", answer:"RYAN", era:"classic", stats:{ERA:"3.20",SO:"301",W:"16",NH:"1"}, ctx:"1990 MLB Season — Texas Rangers", clues:["Threw his 6th career no-hitter at age 43","Still threw over 95 mph at 43 years old","Played for the Texas Rangers","All-time strikeout leader with 5714 Ks"] },
  // Soccer - Modern
  { player:"Kylian Mbappe", sport:"⚽ Soccer", answer:"MBAPPE", era:"modern", stats:{G:"8",AST:"3",APP:"6",MIN:"480"}, ctx:"2018 FIFA World Cup — France", clues:["Became only the second teenager ever to score in a World Cup Final (after Pele in 1958)","Won the World Cup at just 19 years old","Scored 8 goals in his first 2 World Cups combined","Moved to Real Madrid in 2024 after breaking the all-time PSG scoring record"] },
  { player:"Erling Haaland", sport:"⚽ Soccer", answer:"HAALAND", era:"modern", stats:{G:"36",AST:"8",APP:"35",MIN:"2769"}, ctx:"2022-23 Premier League — Record-breaking season", clues:["Set the Premier League single-season goals record at 36 goals","Scored over 1 goal per game in his career — the best ratio in top-flight history","Won the Treble with Manchester City (Premier League, FA Cup, Champions League)","Scored 5 goals in a single Champions League game — twice"] },
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
  { player:"Andy Murray", sport:"🎾 Tennis", answer:"MURRAY", era:"modern", stats:{W:"81",L:"15",TITLES:"8",GS:"0"}, ctx:"2015 ATP Season — World No. 1", clues:["Won Wimbledon and US Open in his career","Reached World No. 1 this year","From Dunblane, Scotland","First British man to win Wimbledon since 1936"] },
  { player:"Ashleigh Barty", sport:"🎾 Tennis", answer:"BARTY", era:"modern", stats:{W:"83",L:"11",TITLES:"12",GS:"3"}, ctx:"2021 WTA Season — Wimbledon champion", clues:["Won Wimbledon this year while ranked World No. 1","Won 3 Grand Slams in total","Retired at age 25 at the peak of her powers","From Ipswich, Queensland, Australia"] },
  { player:"Iga Swiatek", sport:"🎾 Tennis", answer:"SWIATEK", era:"modern", stats:{W:"74",L:"8",TITLES:"8",GS:"2"}, ctx:"2022 WTA Season — World No. 1 dominant year", clues:["Won 2 Grand Slams this year including the French Open","Had a 37-match winning streak","From Warsaw, Poland","Known as the Queen of Clay"] },
  { player:"Naomi Osaka", sport:"🎾 Tennis", answer:"OSAKA", era:"modern", stats:{W:"55",L:"12",TITLES:"4",GS:"1"}, ctx:"2020 US Open — Second Grand Slam title", clues:["Won the US Open wearing masks honoring Black victims","Ranked World No. 1 after this win","Japanese-American player","Won 4 Grand Slams before age 24"] },
  // Tennis - Classic
  { player:"Boris Becker", sport:"🎾 Tennis", answer:"BECKER", era:"classic", stats:{W:"82",L:"9",TITLES:"10",GS:"1"}, ctx:"1986 ATP Season — Three Grand Slam finals", clues:["Won Wimbledon for the second consecutive year","Reached 3 Grand Slam finals this year","German player nicknamed Boom Boom","Was the youngest Wimbledon champion at 17"] },
  { player:"Jim Courier", sport:"🎾 Tennis", answer:"COURIER", era:"classic", stats:{W:"73",L:"15",TITLES:"6",GS:"2"}, ctx:"1992 ATP Season — Two Grand Slams", clues:["Won the Australian and French Open this year","Ranked World No. 1","American player known for his aggressive baseline game","Beat Andre Agassi in the French Open final"] },
  { player:"Arantxa Sanchez Vicario", sport:"🎾 Tennis", answer:"ARANTXA", era:"classic", stats:{W:"79",L:"13",TITLES:"9",GS:"1"}, ctx:"1994 WTA Season — US Open and French Open", clues:["Won 2 Grand Slams in one year","Spanish player nicknamed The Barcelona Bumblebee","Won 4 Grand Slams in total","Beat Steffi Graf in the French Open final"] },
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
  { player:"Jaylen Brown", sport:"🏀 NBA", answer:"JAYLEN", era:"modern", stats:{PTS:"26.6",REB:"6.9",AST:"3.5",FG:"49.5"}, ctx:"2023-24 NBA Season — Boston Celtics Finals MVP", clues:["His team defeated the Milwaukee Bucks in 6 games","Led Boston to the championship over the Dallas Mavericks","From Marietta, Georgia — played at Cal Berkeley","3rd overall pick in the 2016 NBA Draft"] },
  { player:"Chris Paul", sport:"🏀 NBA", answer:"CP3", era:"modern", stats:{PTS:"18.6",AST:"10.8",STL:"2.1",REB:"4.5"}, ctx:"2014-15 NBA Season — Los Angeles Clippers", clues:["Led the Clippers to a 56-win season","Won Clutch Player of the Year this season","Nicknamed CP3","All-time leader in steals in NBA history"] },
  { player:"Kevin Garnett", sport:"🏀 NBA", answer:"GARNETT", era:"modern", stats:{PTS:"22.4",REB:"13.9",AST:"5.0",BLK:"2.2"}, ctx:"2003-04 NBA Season — Minnesota Timberwolves MVP", clues:["Won the NBA MVP award this season","Led Minnesota to 58 wins — their best ever","Played for Minnesota Timberwolves","Nicknamed The Big Ticket"] },
  { player:"Dirk Nowitzki", sport:"🏀 NBA", answer:"DIRK", era:"modern", stats:{PTS:"27.7",REB:"8.6",AST:"2.8",FG:"50.2"}, ctx:"2006-07 NBA Season — Dallas Mavericks MVP", clues:["Won his only NBA MVP award this season","Played for Dallas Mavericks","First European player to win NBA MVP","Had a famous one-legged fadeaway jumper"] },
  { player:"Allen Iverson", sport:"🏀 NBA", answer:"AI", era:"modern", stats:{PTS:"31.4",REB:"4.5",AST:"5.1",STL:"2.4"}, ctx:"2001 NBA Season — Philadelphia 76ers scoring MVP", clues:["Won the scoring title and MVP award","Led the Philadelphia 76ers to the Finals","Known as The Answer","Was 6 feet tall — one of the smallest MVPs ever"] },
  { player:"Dwyane Wade", sport:"🏀 NBA", answer:"FLASH", era:"modern", stats:{PTS:"30.2",REB:"5.0",AST:"7.5",STL:"2.1"}, ctx:"2009-10 NBA Season — Miami Heat", clues:["Led the NBA in scoring this season","Played for Miami Heat","Nicknamed Flash","Won 3 NBA championships in his career"] },
  { player:"Carmelo Anthony", sport:"🏀 NBA", answer:"MELO", era:"modern", stats:{PTS:"28.7",REB:"8.8",AST:"3.3",FG:"47.0"}, ctx:"2012-13 NBA Season — New York Knicks scoring title", clues:["Scored 28.7 PPG and shot 47% from the field","Played for Denver, New York, Oklahoma City, and Portland","Nicknamed Melo","Won Olympic gold with USA three times"] },
  { player:"Blake Griffin", sport:"🏀 NBA", answer:"GRIFFIN", era:"modern", stats:{PTS:"22.6",REB:"8.9",AST:"3.9",FG:"52.4"}, ctx:"2011-12 NBA Season — LA Clippers All-Star", clues:["Won the 2011 Slam Dunk Contest jumping over a car","Played for the LA Clippers","From Oklahoma City, Oklahoma","Won Rookie of the Year in 2011"] },
  { player:"Kyrie Irving", sport:"🏀 NBA", answer:"KYRIE", era:"modern", stats:{PTS:"25.2",REB:"3.2",AST:"5.8",FG:"47.0"}, ctx:"2016 NBA Finals — Cleveland Cavaliers", clues:["Hit the go-ahead three-pointer with 53 seconds left in Game 7","Won the championship with Cleveland Cavaliers","From Melbourne, Australia","Was the #1 overall pick in 2011"] },
  { player:"Russell Westbrook", sport:"🏀 NBA", answer:"WESTBROOK", era:"modern", stats:{PTS:"31.6",REB:"10.7",AST:"10.4",STL:"1.6"}, ctx:"2016-17 NBA Season — Oklahoma City Thunder MVP", clues:["Averaged a triple-double for the entire season","Won the NBA MVP award","Played for Oklahoma City Thunder","Broke Oscar Robertson's single-season triple-double record"] },
  { player:"Clyde Drexler", sport:"🏀 NBA", answer:"DREXLER", era:"classic", stats:{PTS:"25.0",REB:"6.9",AST:"6.0",STL:"2.5"}, ctx:"1991-92 NBA Season — Portland Trail Blazers", clues:["Led Portland to the NBA Finals this year","Was known as Clyde the Glide","Played for Portland Trail Blazers","Finished 2nd in MVP voting to Michael Jordan"] },
  { player:"John Stockton", sport:"🏀 NBA", answer:"STOCKTON", era:"classic", stats:{PTS:"13.1",AST:"14.5",STL:"3.2",REB:"2.8"}, ctx:"1987-88 NBA Season — Utah Jazz assists record", clues:["Set the single-season assists record this year","Was also the league leader in steals","Played for Utah Jazz his entire career","All-time NBA leader in assists and steals"] },
  { player:"Karl Malone", sport:"🏀 NBA", answer:"MALONE", era:"classic", stats:{PTS:"27.7",REB:"10.5",AST:"4.5",FG:"54.6"}, ctx:"1996-97 NBA Season — Utah Jazz MVP", clues:["Won the NBA MVP award this season","Played for Utah Jazz alongside John Stockton","Nicknamed The Mailman","Second all-time NBA scoring leader"] },
  { player:"David Robinson", sport:"🏀 NBA", answer:"ROBINSON", era:"classic", stats:{PTS:"29.8",REB:"10.7",BLK:"4.5",STL:"1.7"}, ctx:"1993-94 NBA Season — San Antonio Spurs MVP", clues:["Won the NBA MVP award and scoring title","Played for San Antonio Spurs","Nicknamed The Admiral — served in the US Navy","Later paired with Tim Duncan for back-to-back championships"] },
  { player:"Moses Malone", sport:"🏀 NBA", answer:"MOSES", era:"classic", stats:{PTS:"24.5",REB:"17.0",AST:"1.8",FG:"50.1"}, ctx:"1982-83 NBA Season — Philadelphia 76ers MVP", clues:["Predicted Fo Fo Fo in the playoffs — nearly delivered","Famously predicted Fo Fo Fo in the playoffs","Played for the Philadelphia 76ers","3x NBA MVP in his career"] },
  { player:"Kevin McHale", sport:"🏀 NBA", answer:"MCHALE", era:"classic", stats:{PTS:"26.1",REB:"9.5",BLK:"1.9",FG:"60.4"}, ctx:"1986-87 NBA Season — Boston Celtics", clues:["Shot over 60% from the field this season","Played for Boston Celtics","Had one of the most skilled low-post games ever","Won 3 NBA championships with the Celtics"] },
  { player:"Bill Russell", sport:"🏀 NBA", answer:"RUSSELL", era:"legends", stats:{REB:"22.9",PTS:"14.1",BLK:"8.0",TITLES:"5"}, ctx:"1961-62 NBA Season — Boston Celtics dynasty peak", clues:["Won 5 consecutive NBA championships as captain","Led the NBA in rebounds this season","Played for Boston Celtics his entire career","Was player-coach for his last 3 championships"] },
  { player:"Oscar Robertson", sport:"🏀 NBA", answer:"OSCAR", era:"legends", stats:{PTS:"30.8",AST:"11.4",REB:"12.5",FG:"47.8"}, ctx:"1961-62 NBA Season — Cincinnati Royals triple-double season", clues:["Averaged a triple-double for the entire season","Played for the Cincinnati Royals","Nicknamed The Big O","His triple-double record per game was not matched for 55 years"] },
  { player:"Jerry West", sport:"🏀 NBA", answer:"WEST", era:"legends", stats:{PTS:"31.3",AST:"7.2",REB:"4.4",FG:"47.6"}, ctx:"1969-70 NBA Season — Los Angeles Lakers Finals MVP", clues:["Scored 31.3 PPG in the Finals on the losing side","His team lost to the New York Knicks in 7 games","Played for the Los Angeles Lakers","His silhouette is the NBA logo"] },
  { player:"Bob Pettit", sport:"🏀 NBA", answer:"PETTIT", era:"legends", stats:{PTS:"29.2",REB:"20.3",AST:"3.1",FG:"42.2"}, ctx:"1961-62 NBA Season — St. Louis Hawks All-Star", clues:["Was the first player in NBA history to score 20,000 career points","Played for the St. Louis Hawks","Won the NBA MVP award twice","Was the first true power forward in NBA history"] },
  { player:"Lenny Wilkens", sport:"🏀 NBA", answer:"WILKENS", era:"legends", stats:{PTS:"22.4",AST:"8.1",REB:"5.6",STL:"2.1"}, ctx:"1967-68 NBA Season — St. Louis Hawks All-Star", clues:["Was a player-coach during his playing career","Played for the St. Louis Hawks","Later became one of the winningest coaches in NBA history","Was an All-Star as both a player and a coach"] },
  { player:"Dave Cowens", sport:"🏀 NBA", answer:"COWENS", era:"classic", stats:{PTS:"20.5",REB:"16.2",AST:"4.4",FG:"45.9"}, ctx:"1972-73 NBA Season — Boston Celtics MVP", clues:["Won the NBA MVP award this season","Led the Celtics to the championship the following year","Played for Boston Celtics","Was a center who played with the intensity of a small forward"] },
  { player:"Walt Frazier", sport:"🏀 NBA", answer:"FRAZIER", era:"legends", stats:{PTS:"21.7",AST:"6.9",REB:"6.2",STL:"1.9"}, ctx:"1969-70 NBA Finals — New York Knicks", clues:["Had 36 points and 19 assists in Game 7 of the Finals","Played for the New York Knicks","Nicknamed Clyde after the movie Bonnie and Clyde","Was one of the best defensive guards of his era"] },
  { player:"John Havlicek", sport:"🏀 NBA", answer:"HAVLICEK", era:"classic", stats:{PTS:"26.8",REB:"7.1",AST:"5.9",FG:"47.0"}, ctx:"1973-74 NBA Season — Boston Celtics Finals MVP", clues:["Won the NBA Finals MVP with the Boston Celtics","Won 8 NBA championships in his career","Nicknamed Hondo","Was famous for his tireless running and hustle"] },
  { player:"Earl Monroe", sport:"🏀 NBA", answer:"EARL", era:"legends", stats:{PTS:"23.8",AST:"5.5",REB:"4.0",FG:"46.2"}, ctx:"1967-68 NBA Season — Baltimore Bullets Rookie of Year", clues:["Won Rookie of the Year with Baltimore Bullets","Famous for his spinning moves in the lane","Nicknamed Earl the Pearl and Black Jesus","Later won a championship with the New York Knicks"] },
  { player:"Elvin Hayes", sport:"🏀 NBA", answer:"HAYES", era:"classic", stats:{PTS:"28.4",REB:"17.1",BLK:"3.7",FG:"42.5"}, ctx:"1970-71 NBA Season — San Diego Rockets scoring leader", clues:["Led the NBA in rebounds this season","Played for the San Diego/Houston Rockets and Washington Bullets","Nicknamed The Big E","Won the NBA championship with Washington in 1978"] },
  { player:"Connie Hawkins", sport:"🏀 NBA", answer:"HAWKINS", era:"legends", stats:{PTS:"24.6",REB:"10.4",AST:"4.8",FG:"48.9"}, ctx:"1967-68 ABA Season — Pittsburgh Pipers MVP", clues:["Won the ABA MVP in its very first season","Was banned from the NBA for years despite being innocent","Finally admitted to the NBA in 1969","Was one of the most gifted ballhandlers of his generation"] },
  { player:"Nate Thurmond", sport:"🏀 NBA", answer:"THURMOND", era:"legends", stats:{PTS:"22.0",REB:"22.0",BLK:"4.0",FG:"42.1"}, ctx:"1967-68 NBA Season — San Francisco Warriors All-Star", clues:["Averaged over 22 points and 22 rebounds per game","Played for the San Francisco Warriors","Was considered the toughest defensive center of the 1960s","Had the first official quadruple-double in NBA history in 1974"] },
  { player:"Jerry Lucas", sport:"🏀 NBA", answer:"LUCAS", era:"legends", stats:{PTS:"21.5",REB:"21.1",AST:"4.3",FG:"49.9"}, ctx:"1964-65 NBA Season — Cincinnati Royals Rookie of Year", clues:["Won Rookie of the Year with Cincinnati Royals","Averaged over 20 points and 20 rebounds as a rookie","Was a memory expert who memorized the entire Manhattan phone book","Later won a championship with the New York Knicks"] },
  { player:"Billy Cunningham", sport:"🏀 NBA", answer:"CUNNINGHAM", era:"classic", stats:{PTS:"24.8",REB:"13.0",AST:"4.3",FG:"45.5"}, ctx:"1971-72 ABA Season — Carolina Cougars", clues:["Won the ABA MVP this season","Later coached the Philadelphia 76ers to the 1983 championship","Nicknamed The Kangaroo Kid for his leaping ability","Played for Philadelphia 76ers and Carolina Cougars"] },
  { player:"Sam Jones", sport:"🏀 NBA", answer:"SAM JONES", era:"legends", stats:{PTS:"22.1",REB:"4.5",AST:"4.9",FG:"47.0"}, ctx:"1964-65 NBA Season — Boston Celtics fifth championship", clues:["Won 10 NBA championships with the Boston Celtics","Was known as the banker — for his bank shot off the glass","Played for Boston Celtics alongside Bill Russell","Was inducted into the Hall of Fame in 1983"] },
  { player:"Tom Heinsohn", sport:"🏀 NBA", answer:"HEINSOHN", era:"legends", stats:{PTS:"18.8",REB:"10.0",FG:"40.8",TITLES:"6"}, ctx:"1956-57 NBA Season — Boston Celtics Rookie of Year", clues:["Won Rookie of the Year in his first season","Won 6 NBA championships as a player with the Celtics","Later coached the Celtics to 2 more championships","Was elected to the Hall of Fame as both a player and coach"] },
  { player:"Tom Brady", sport:"🏈 NFL", answer:"TOM BRADY", era:"modern", stats:{YDS:"4577",TD:"50",INT:"8",RTG:"111.0"}, ctx:"2010 NFL Season — New England Patriots MVP", clues:["Won the NFL MVP award this season","Led the Patriots to a 14-2 record","Played for New England Patriots","Won his 3rd Super Bowl the following year"] },
  { player:"Von Miller", sport:"🏈 NFL", answer:"VON MILLER", era:"modern", stats:{SCK:"18.0",FF:"6",YEAR:"2012",AWARD:"DPOY"}, ctx:"2012 NFL Season — Denver Broncos Defensive Player of Year", clues:["Won the Defensive Player of the Year award","Had 18 sacks this season","Played for Denver Broncos","Earlier won Super Bowl 50 MVP"] },
  { player:"J.J. Watt", sport:"🏈 NFL", answer:"WATT", era:"modern", stats:{SCK:"20.5",FF:"8",TD:"5",DPOY:"3"}, ctx:"2012 NFL Season — Houston Texans Defensive Player of Year", clues:["Won Defensive Player of the Year for the first of 3 times","Had 20.5 sacks and scored 5 TDs on defense","Played for Houston Texans","Won DPOY 3 times in 4 seasons"] },
  { player:"Walter Payton", sport:"🏈 NFL", answer:"SWEETNESS", era:"classic", stats:{CAR:"339",YDS:"1852",TD:"14",YPC:"5.5"}, ctx:"1977 NFL Season — Chicago Bears MVP", clues:["Rushed for 1852 yards — NFL record at the time","Won NFL MVP this season","Played for Chicago Bears","Nicknamed Sweetness"] },
  { player:"Dan Marino", sport:"🏈 NFL", answer:"MARINO", era:"classic", stats:{YDS:"5084",TD:"48",INT:"17",RTG:"108.9"}, ctx:"1984 NFL Season — Miami Dolphins MVP", clues:["Set the single-season passing TD record (48) that stood 20 years","Won the NFL MVP award","Played for Miami Dolphins","Had one of the fastest releases ever seen"] },
  { player:"Lawrence Taylor", sport:"🏈 NFL", answer:"LT CLASSIC", era:"classic", stats:{SCK:"20.5",FF:"4",INT:"2",DPOY:"3"}, ctx:"1986 NFL Season — New York Giants MVP", clues:["Won NFL MVP as a defensive player — very rare","Played for New York Giants","Won Defensive Player of the Year 3 times","Changed how the linebacker position was played"] },
  { player:"Reggie White", sport:"🏈 NFL", answer:"MINISTER", era:"classic", stats:{SCK:"21",FF:"2",INT:"2",DPOY:"2"}, ctx:"1987 NFL Season — Philadelphia Eagles", clues:["Won Defensive Player of the Year this season","Had 21 sacks","Played for Philadelphia Eagles","Nicknamed The Minister of Defense"] },
  { player:"Eric Dickerson", sport:"🏈 NFL", answer:"DICKERSON", era:"classic", stats:{CAR:"379",YDS:"2105",TD:"14",YPC:"5.6"}, ctx:"1984 NFL Season — Los Angeles Rams rushing record", clues:["Set the all-time NFL single-season rushing record (2105 yards)","Played for the Los Angeles Rams","Known for his high knee action and goggles","The record still stands today"] },
  { player:"Tony Dorsett", sport:"🏈 NFL", answer:"DORSETT", era:"classic", stats:{CAR:"177",YDS:"1325",TD:"8",YPC:"7.5"}, ctx:"1977 NFL Season — Dallas Cowboys Rookie of Year", clues:["Won Rookie of the Year with the Dallas Cowboys","Later won the Super Bowl this same season","Played for the Dallas Cowboys","Also ran the longest TD run in NFL history (99 yards) in 1983"] },
  { player:"Herschel Walker", sport:"🏈 NFL", answer:"WALKER", era:"classic", stats:{CAR:"238",YDS:"1514",REC:"53",TD:"10"}, ctx:"1985 NFL Season — Dallas Cowboys All-Pro", clues:["Won the Heisman Trophy at Georgia","Played for Dallas Cowboys","Was the centerpiece of the most lopsided trade in NFL history","Also competed in bobsled in the 1992 Olympics"] },
  { player:"Terry Bradshaw", sport:"🏈 NFL", answer:"BRADSHAW", era:"classic", stats:{YDS:"318",TD:"4",INT:"1",RTG:"112.4"}, ctx:"Super Bowl XIII MVP — Pittsburgh Steelers vs Dallas Cowboys", clues:["Won his second consecutive Super Bowl MVP","Played for Pittsburgh Steelers","Won 4 Super Bowls in his career","Later became a famous TV analyst"] },
  { player:"Jim Kelly", sport:"🏈 NFL", answer:"KELLY", era:"classic", stats:{YDS:"3844",TD:"33",INT:"17",RTG:"97.6"}, ctx:"1991 NFL Season — Buffalo Bills AFC MVP", clues:["Led the Bills to their 2nd consecutive Super Bowl appearance","Played for Buffalo Bills","Ran the famous No-Huddle offense","Reached 4 consecutive Super Bowls — all losses"] },
  { player:"Deion Sanders", sport:"🏈 NFL", answer:"PRIME TIME", era:"classic", stats:{INT:"8",TD:"6",RET:"1421",YEAR:"1994"}, ctx:"1994 NFL Season — San Francisco 49ers", clues:["Played for the 49ers and won a Super Bowl this year","Returned kicks and played both CB and WR","Nicknamed Prime Time and Neon Deion","Also played professional baseball"] },
  { player:"Bruce Smith", sport:"🏈 NFL", answer:"BRUCE SMITH", era:"classic", stats:{SCK:"19",FF:"4",DPOY:"2",YEAR:"1990"}, ctx:"1990 NFL Season — Buffalo Bills Defensive Player of Year", clues:["Won Defensive Player of the Year this season","Had 19 sacks","Played for Buffalo Bills alongside Jim Kelly","All-time NFL sacks leader with 200"] },
  { player:"Johnny Unitas", sport:"🏈 NFL", answer:"UNITAS", era:"legends", stats:{YDS:"2899",TD:"32",INT:"14",STREAK:"47"}, ctx:"1959 NFL Season — Baltimore Colts All-Pro", clues:["Set the record for consecutive games with a TD pass (47)","Played for the Baltimore Colts","Won 3 NFL championships","Nicknamed The Golden Arm"] },
  { player:"Jim Brown", sport:"🏈 NFL", answer:"JIM BROWN", era:"legends", stats:{CAR:"291",YDS:"1863",TD:"17",YPC:"6.4"}, ctx:"1963 NFL Season — Cleveland Browns MVP", clues:["Won the NFL MVP award for the 3rd time","Rushed for 1863 yards — led the league","Played for Cleveland Browns his entire career","Retired at his peak at age 29 — widely considered the greatest RB ever"] },
  { player:"Bart Starr", sport:"🏈 NFL", answer:"STARR", era:"legends", stats:{YDS:"250",TD:"2",INT:"1",RTG:"96.2"}, ctx:"Super Bowl I MVP — Green Bay Packers", clues:["Won the very first Super Bowl MVP award","Played for the Green Bay Packers","Won 5 NFL championships under Vince Lombardi","Was known for his cool leadership in the Ice Bowl"] },
  { player:"Joe Namath", sport:"🏈 NFL", answer:"NAMATH", era:"legends", stats:{YDS:"4007",TD:"26",INT:"28",COMP:"52.5"}, ctx:"1967 NFL Season — New York Jets first 4000-yard passer", clues:["Became the first QB to pass for 4000 yards in a season","Played for New York Jets","Guaranteed victory in Super Bowl III and delivered","Nicknamed Broadway Joe"] },
  { player:"Gale Sayers", sport:"🏈 NFL", answer:"SAYERS", era:"legends", stats:{TD:"22",RUSH:"867",REC:"507",RET:"1718"}, ctx:"1965 NFL Season — Chicago Bears Rookie of Year", clues:["Scored 22 touchdowns as a rookie — an NFL record at the time","Played for Chicago Bears","Won Rookie of the Year","Had his career cut short by injuries after being one of the most elusive runners ever"] },
  { player:"Don Hutson", sport:"🏈 NFL", answer:"HUTSON", era:"legends", stats:{REC:"74",YDS:"1211",TD:"17",YEAR:"1942"}, ctx:"1942 NFL Season — Green Bay Packers All-Pro", clues:["Won the MVP award in 1941 and 1942","Set records that stood for decades","Played for Green Bay Packers","Is credited with inventing the modern wide receiver position"] },
  { player:"Sammy Baugh", sport:"🏈 NFL", answer:"BAUGH", era:"legends", stats:{YDS:"1693",TD:"11",INT:"4",PASSER:"1945"}, ctx:"1945 NFL Season — Washington Redskins MVP", clues:["Led the NFL in passing, punting, and interceptions this season","Played for the Washington Redskins","Is considered the greatest quarterback of the pre-modern era","Nicknamed Slingin Sammy"] },
  { player:"Chuck Bednarik", sport:"🏈 NFL", answer:"BEDNARIK", era:"legends", stats:{POS:"C/LB",MIN:"60",PLAYS:"90%",TITLE:"1"}, ctx:"1960 NFL Championship — Philadelphia Eagles", clues:["Was the last true 60-minute player in NFL history","Played center on offense and linebacker on defense","Led Philadelphia Eagles to the 1960 NFL Championship","Made the famous tackle that ended Frank Gifford's season"] },
  { player:"Night Train Lane", sport:"🏈 NFL", answer:"NIGHT TRAIN", era:"legends", stats:{INT:"14",YEAR:"1952",TD:"2",AWARD:"AllPro"}, ctx:"1952 NFL Season — Los Angeles Rams interception record", clues:["Set the all-time NFL single-season interception record with 14","Played for the Los Angeles Rams","The record still stands today","Got his nickname from a popular song"] },
  { player:"Elroy Hirsch", sport:"🏈 NFL", answer:"HIRSCH", era:"legends", stats:{REC:"66",YDS:"1495",TD:"17",YEAR:"1951"}, ctx:"1951 NFL Season — Los Angeles Rams MVP", clues:["Had one of the greatest receiving seasons ever in 1951","Caught 17 touchdown passes","Played for the Los Angeles Rams","Nicknamed Crazylegs for his unusual running style"] },
  { player:"Bob Waterfield", sport:"🏈 NFL", answer:"WATERFIELD", era:"legends", stats:{YDS:"185",TD:"1",INT:"0",COMP:"55.0"}, ctx:"1945 NFL Championship — Cleveland Rams", clues:["Led the Cleveland Rams to the NFL Championship as a rookie","Won NFL MVP his first season","Played for the Los Angeles Rams","Was also married to actress Jane Russell"] },
  { player:"Otto Graham", sport:"🏈 NFL", answer:"GRAHAM", era:"legends", stats:{TITLES:"7",APPS:"10",TD:"174",YEAR:"1955"}, ctx:"Career — Cleveland Browns dynasty quarterback", clues:["Appeared in 10 consecutive championship games and won 7","Played for the Cleveland Browns","Played in both the AAFC and NFL","Led the Browns to the championship in his very last game"] },
  { player:"Emlen Tunnell", sport:"🏈 NFL", answer:"TUNNELL", era:"legends", stats:{INT:"79",YDS:"1282",YEAR:"1952",AWARD:"AllPro"}, ctx:"Career — New York Giants defensive back legend", clues:["Was the first African American player in Giants history","Retired with the most career interceptions ever at the time","Played for the New York Giants","Was elected to the Hall of Fame in 1967"] },
  { player:"Leo Nomellini", sport:"🏈 NFL", answer:"NOMELLINI", era:"legends", stats:{YEAR:"1953",AWARD:"AllPro",SEASONS:"14",POS:"DT"}, ctx:"Career — San Francisco 49ers iron man", clues:["Never missed a game in 14 NFL seasons","Was an All-Pro on both offense and defense","Played for San Francisco 49ers","Also won 2 NCAA wrestling championships"] },
  { player:"Lou Groza", sport:"🏈 NFL", answer:"GROZA", era:"legends", stats:{FGM:"264",PTS:"1608",XP:"810",YEAR:"1964"}, ctx:"Career — Cleveland Browns kicker and tackle", clues:["Was both an offensive tackle and kicker in his career","Scored 1608 career points — a record at his retirement","Played for the Cleveland Browns","Nicknamed The Toe for his kicking ability"] },
  { player:"Roosevelt Brown", sport:"🏈 NFL", answer:"ROOSEVELT BROWN", era:"legends", stats:{YEAR:"1956",AWARD:"AllPro",SEASONS:"13",DRAFT:"321"}, ctx:"Career — New York Giants Hall of Fame tackle", clues:["Was selected All-Pro 9 times in his career","Was drafted in the 27th round — one of the greatest steals ever","Played for the New York Giants","Was elected to the Hall of Fame in 1975"] },
  { player:"Forrest Gregg", sport:"🏈 NFL", answer:"GREGG", era:"legends", stats:{YEAR:"1966",AWARD:"AllPro",TITLES:"6",POS:"OT"}, ctx:"Career — Green Bay Packers championship offensive tackle", clues:["Vince Lombardi called him the finest player he ever coached","Won 6 NFL championships with the Green Bay Packers","Played offensive tackle for the Packers","Was elected to the Hall of Fame in 1977"] },
  { player:"Jim Ringo", sport:"🏈 NFL", answer:"RINGO", era:"legends", stats:{YEAR:"1963",AWARD:"AllPro",PROBOW:"10",POS:"C"}, ctx:"Career — Green Bay Packers center", clues:["Was selected to 10 Pro Bowls in his career","Won 4 NFL championships with Green Bay Packers","Played center and was a master of the position","Was the anchor of the offensive line during the Lombardi dynasty"] },
  { player:"Frank Gifford", sport:"🏈 NFL", answer:"GIFFORD", era:"legends", stats:{PTS:"484",REC:"367",TD:"78",YEAR:"1956"}, ctx:"1956 NFL Season — New York Giants MVP", clues:["Won the NFL MVP award in 1956","Played for the New York Giants","Was a versatile back who played multiple positions","Later became famous as a Monday Night Football broadcaster"] },
  { player:"Tom Fears", sport:"🏈 NFL", answer:"FEARS", era:"legends", stats:{REC:"84",YDS:"1116",TD:"7",YEAR:"1950"}, ctx:"1950 NFL Season — Los Angeles Rams receiving record", clues:["Set the NFL single-season receptions record with 84 catches","Played for the Los Angeles Rams","Was the first great wide receiver of the modern era","His 84 catches stood as the record for 16 years"] },
  { player:"Crazy Legs Hirsch", sport:"🏈 NFL", answer:"CRAZYLEGS", era:"legends", stats:{REC:"66",YDS:"1495",TD:"17",YEAR:"1951"}, ctx:"1951 NFL Season — Los Angeles Rams receiving record", clues:["Had a record-setting receiving season with 17 TDs","Was famous for his unusual running style that gave him his nickname","Played for the Los Angeles Rams","Had a movie made about him called Crazylegs in 1953"] },
  { player:"Lance Alworth", sport:"🏈 NFL", answer:"ALWORTH", era:"legends", stats:{REC:"73",YDS:"1602",TD:"13",YEAR:"1965"}, ctx:"1965 AFL Season — San Diego Chargers All-Pro", clues:["Was the best wide receiver in the AFL during the 1960s","Nicknamed Bambi for his graceful movement","Played for the San Diego Chargers","Was the first AFL player inducted into the Pro Football Hall of Fame"] },
  { player:"Willie Mays", sport:"⚾ MLB", answer:"MAYS", era:"legends", stats:{HR:"52",AVG:".317",RBI:"112",SB:"24"}, ctx:"1965 MLB Season — San Francisco Giants All-Star", clues:["Hit 52 home runs this season at age 34","Won the NL MVP award this season","Played for the San Francisco Giants","Made The Catch in the 1954 World Series"] },
  { player:"Mickey Mantle", sport:"⚾ MLB", answer:"MANTLE", era:"legends", stats:{HR:"52",AVG:".365",RBI:"130",OPS:"1.169"}, ctx:"1956 MLB Season — New York Yankees Triple Crown MVP", clues:["Batted .365 with 52 home runs and 130 RBI","Won the AL MVP award 3 times","Played for the New York Yankees","Wore number 7 and was known for switch-hitting power"] },
  { player:"Frank Robinson", sport:"⚾ MLB", answer:"FRANK ROBINSON", era:"legends", stats:{HR:"49",AVG:".316",RBI:"122",OPS:"1.047"}, ctx:"1966 MLB Season — Baltimore Orioles Triple Crown MVP", clues:["Had been traded from Cincinnati to the Orioles before the season","Is the only player in MLB history to win MVP in both leagues","Played for Cincinnati and Baltimore","Was the first Black manager in MLB history"] },
  { player:"Carl Yastrzemski", sport:"⚾ MLB", answer:"YAZ", era:"legends", stats:{HR:"44",AVG:".326",RBI:"121",OPS:"1.040"}, ctx:"1967 MLB Season — Boston Red Sox Triple Crown MVP", clues:["Boston went from 9th place to the World Series in one year","Won the AL MVP award","Played for Boston Red Sox his entire career","Nicknamed Yaz — wore number 8"] },
  { player:"Tom Seaver", sport:"⚾ MLB", answer:"SEAVER", era:"legends", stats:{ERA:"2.21",W:"25",SO:"283",CG:"18"}, ctx:"1969 MLB Season — New York Mets Cy Young", clues:["Led the Mets from 9th place to World Series champions","Led New York to a World Series title this year","Played for New York Mets","Nicknamed Tom Terrific"] },
  { player:"Steve Carlton", sport:"⚾ MLB", answer:"CARLTON", era:"classic", stats:{ERA:"1.97",W:"27",SO:"310",WHIP:"0.940"}, ctx:"1972 MLB Season — Philadelphia Phillies Cy Young", clues:["Won 27 games for a team that won only 59 — remarkable","Also famous for refusing to speak to media for years","Played for the Philadelphia Phillies","Nicknamed Lefty — refused to speak to media for years"] },
  { player:"Mike Schmidt", sport:"⚾ MLB", answer:"SCHMIDT", era:"classic", stats:{HR:"48",AVG:".286",RBI:"121",OPS:".996"}, ctx:"1980 MLB Season — Philadelphia Phillies MVP", clues:["Won the NL MVP and World Series MVP this season","Won 3 NL MVP awards in his career","Played for the Philadelphia Phillies","Won 10 Gold Gloves at third base"] },
  { player:"Reggie Jackson", sport:"⚾ MLB", answer:"JACKSON", era:"classic", stats:{HR:"3",RBI:"5",H:"3",AB:"5"}, ctx:"1977 World Series Game 6 — New York Yankees", clues:["Hit 3 home runs in a single World Series game","Won the World Series MVP award","Played for the New York Yankees","Nicknamed Mr. October for his postseason performances"] },
  { player:"Pete Rose", sport:"⚾ MLB", answer:"ROSE", era:"classic", stats:{H:"230",AVG:".331",R:"130",YEAR:"1973"}, ctx:"1973 MLB Season — Cincinnati Reds NL MVP", clues:["Won the NL MVP award for the only time in his career","Hit .331 with 230 hits this season","Played for the Cincinnati Reds","All-time MLB hits leader with 4256"] },
  { player:"Johnny Bench", sport:"⚾ MLB", answer:"BENCH", era:"classic", stats:{HR:"45",RBI:"148",AVG:".293",OPS:".909"}, ctx:"1970 MLB Season — Cincinnati Reds MVP", clues:["Won the NL MVP award at age 22","Won 2 NL MVP awards in his career","Played for the Cincinnati Reds","Revolutionized the catcher position with one-handed catching"] },
  { player:"Joe Morgan", sport:"⚾ MLB", answer:"MORGAN", era:"classic", stats:{HR:"17",AVG:".327",OBP:".466",SB:"67"}, ctx:"1975 MLB Season — Cincinnati Reds MVP", clues:["Won back-to-back NL MVP awards in 1975 and 1976","Played for the Cincinnati Reds Big Red Machine","Played second base with a distinctive arm-flapping batting style","Was a dominant player despite being only 5ft 7in"] },
  { player:"Rod Carew", sport:"⚾ MLB", answer:"CAREW", era:"classic", stats:{AVG:".388",H:"239",R:"128",TITLES:"7"}, ctx:"1977 MLB Season — Minnesota Twins MVP", clues:["Won the AL MVP and batting title with a .388 average","Has the highest career batting average in NL history","Played for the Minnesota Twins","From Panama — was considered the finest pure hitter of his era"] },
  { player:"Nolan Ryan", sport:"⚾ MLB", answer:"NOLAN RYAN", era:"classic", stats:{SO:"383",ERA:"2.87",NH:"2",W:"22"}, ctx:"1973 MLB Season — California Angels strikeout record", clues:["Set the single-season strikeout record with 383","Also threw 2 no-hitters this season","Played for the California Angels","All-time strikeout leader with 5714 career Ks"] },
  { player:"Catfish Hunter", sport:"⚾ MLB", answer:"CATFISH", era:"classic", stats:{W:"25",ERA:"2.49",CG:"23",YEAR:"1974"}, ctx:"1974 MLB Season — Oakland Athletics Cy Young", clues:["Won 5 consecutive World Series rings","Won 5 consecutive World Series rings","Played for the Oakland Athletics","Was one of the first big free agents in baseball history"] },
  { player:"Jim Palmer", sport:"⚾ MLB", answer:"PALMER", era:"classic", stats:{W:"23",ERA:"2.09",CG:"23",YEAR:"1975"}, ctx:"1975 MLB Season — Baltimore Orioles Cy Young", clues:["Never gave up a grand slam in his entire career","Never allowed a grand slam in his entire career","Played for the Baltimore Orioles","Later became famous as an Jockey underwear model"] },
  { player:"Rickey Henderson", sport:"⚾ MLB", answer:"HENDERSON", era:"classic", stats:{SB:"130",AVG:".319",OBP:".408",R:"119"}, ctx:"1982 MLB Season — Oakland Athletics stolen base record", clues:["Set the all-time single-season stolen base record (130)","Played for Oakland Athletics","All-time stolen base leader with 1406","Referred to himself in the third person — was famous for his personality"] },
  { player:"Lou Gehrig", sport:"⚾ MLB", answer:"GEHRIG", era:"legends", stats:{HR:"49",AVG:".363",RBI:"165",OPS:"1.228"}, ctx:"1936 MLB Season — New York Yankees MVP", clues:["Won the AL MVP award this season","Played in 2130 consecutive games — record for decades","Played for the New York Yankees","Died from the disease now called Lou Gehrig's Disease (ALS)"] },
  { player:"Ted Williams", sport:"⚾ MLB", answer:"WILLIAMS", era:"legends", stats:{AVG:".406",HR:"37",OBP:".553",YEAR:"1941"}, ctx:"1941 MLB Season — Boston Red Sox — last .400 hitter", clues:["Was the last player to hit .400 in a season","Refused to sit out the last day to protect his average","Played for Boston Red Sox","Nicknamed The Splendid Splinter"] },
  { player:"Joe DiMaggio", sport:"⚾ MLB", answer:"DIMAGGIO", era:"legends", stats:{STREAK:"56",AVG:".357",HR:"30",RBI:"125"}, ctx:"1941 MLB Season — New York Yankees streak season", clues:["Hit safely in 56 consecutive games — still the all-time record","Played for the New York Yankees","Married Marilyn Monroe","Nicknamed The Yankee Clipper"] },
  { player:"Stan Musial", sport:"⚾ MLB", answer:"MUSIAL", era:"legends", stats:{HR:"35",AVG:".357",RBI:"109",H:"197"}, ctx:"1948 MLB Season — St. Louis Cardinals MVP", clues:["Won the NL MVP award and came close to hitting .400","Won 3 NL MVP awards in his career","Played for the St. Louis Cardinals his entire career","Nicknamed Stan the Man"] },
  { player:"Ty Cobb", sport:"⚾ MLB", answer:"COBB", era:"legends", stats:{AVG:".420",H:"248",R:"147",SB:"96"}, ctx:"1911 MLB Season — Detroit Tigers MVP", clues:["Hit .420 — the 4th highest season average ever","Won the Chalmers Award (precursor to MVP)","Played for the Detroit Tigers","All-time batting average leader at .367"] },
  { player:"Walter Johnson", sport:"⚾ MLB", answer:"JOHNSON", era:"legends", stats:{ERA:"1.14",W:"36",SO:"303",SHO:"11"}, ctx:"1913 MLB Season — Washington Senators MVP", clues:["Won 36 games with a 1.14 ERA this season","Won the Chalmers Award for MVP","Played for the Washington Senators","Was considered the fastest pitcher of his era"] },
  { player:"Honus Wagner", sport:"⚾ MLB", answer:"WAGNER", era:"legends", stats:{AVG:".339",H:"201",RBI:"100",SB:"61"}, ctx:"1908 MLB Season — Pittsburgh Pirates batting title", clues:["Won 8 batting titles in his career","Played for the Pittsburgh Pirates","Nicknamed The Flying Dutchman","His T206 baseball card is the most valuable in history"] },
  { player:"Cy Young", sport:"⚾ MLB", answer:"CY YOUNG", era:"legends", stats:{W:"33",ERA:"1.26",SHO:"10",CG:"40"}, ctx:"1901 MLB Season — Boston Americans dominant year", clues:["Won 33 games with a 1.26 ERA this season","Has the most career wins in MLB history (511)","The Cy Young Award is named after him","Won over 30 games 5 times in his career"] },
  { player:"Rogers Hornsby", sport:"⚾ MLB", answer:"HORNSBY", era:"legends", stats:{AVG:".424",HR:"25",RBI:"94",OPS:"1.245"}, ctx:"1924 MLB Season — St. Louis Cardinals batting title", clues:["Hit .424 — the all-time NL single-season batting record","Won 7 batting titles in his career","Played for the St. Louis Cardinals","Has the highest career batting average in NL history (.358)"] },
  { player:"Christy Mathewson", sport:"⚾ MLB", answer:"MATHEWSON", era:"legends", stats:{W:"3",ERA:"0.00",IP:"27",SO:"18"}, ctx:"1905 World Series — New York Giants three shutouts", clues:["Threw 3 shutouts in a single World Series","Won 30+ games 4 times in his career","Played for the New York Giants","Was one of the first five players elected to the Hall of Fame"] },
  { player:"Jimmie Foxx", sport:"⚾ MLB", answer:"FOXX", era:"legends", stats:{HR:"58",AVG:".364",RBI:"169",OPS:"1.284"}, ctx:"1932 MLB Season — Philadelphia Athletics MVP", clues:["Hit 58 home runs and won the Triple Crown this season","Won 3 AL MVP awards in his career","Played for the Philadelphia Athletics","Nicknamed Double X and The Beast"] },
  { player:"Josh Gibson", sport:"⚾ MLB", answer:"JOSH GIBSON", era:"legends", stats:{HR:"84",AVG:".440",RBI:"165",YEAR:"1936"}, ctx:"1936 Negro Leagues Season — Homestead Grays", clues:["Is credited with hitting 84 home runs in one season in the Negro Leagues","Had a career batting average estimated at .372","Played for the Homestead Grays","Was inducted into the Hall of Fame in 1972 as one of the greatest players never to play in MLB"] },
  { player:"Satchel Paige", sport:"⚾ MLB", answer:"PAIGE", era:"legends", stats:{ERA:"2.50",W:"20",SO:"250",AGE:"42"}, ctx:"1948 MLB Season — Cleveland Indians — oldest rookie", clues:["Was 42 years old when he joined the Indians — oldest MLB rookie ever","Won 20 games in his first MLB season despite his age","Had dominated the Negro Leagues for decades","Was finally inducted to the Hall of Fame in 1971"] },
  { player:"Cool Papa Bell", sport:"⚾ MLB", answer:"COOL PAPA", era:"legends", stats:{AVG:".400",SB:"175",YEAR:"1933",LEAGUE:"Negro"}, ctx:"Negro Leagues Career — Pittsburgh Crawfords fastest player", clues:["Was said to be so fast he could turn off the light and be in bed before the room got dark","Played for Pittsburgh Crawfords in the Negro Leagues","Is credited with batting averages over .400 in multiple seasons","Was inducted into the Hall of Fame in 1974"] },
  { player:"Lefty Grove", sport:"⚾ MLB", answer:"GROVE", era:"legends", stats:{W:"31",ERA:"2.06",SO:"175",YEAR:"1931"}, ctx:"1931 MLB Season — Philadelphia Athletics MVP", clues:["Won 31 games and was named MVP this season","Won 9 ERA titles in his career","Played for the Philadelphia Athletics","Was considered the most dominant left-handed pitcher of his era"] },
  { player:"Dizzy Dean", sport:"⚾ MLB", answer:"DEAN", era:"legends", stats:{W:"30",ERA:"2.66",SO:"195",YEAR:"1934"}, ctx:"1934 MLB Season — St. Louis Cardinals Gashouse Gang", clues:["Won 30 games this season — last NL pitcher to do so","Won the NL MVP award","Played for the St. Louis Cardinals Gashouse Gang","Predicted he would win 30 games — and delivered"] },
  { player:"Luke Appling", sport:"⚾ MLB", answer:"APPLING", era:"legends", stats:{AVG:".388",H:"204",R:"93",YEAR:"1936"}, ctx:"1936 MLB Season — Chicago White Sox batting title", clues:["Played his entire career for one team despite better offers","Played his entire career for the White Sox","Nicknamed Old Aches and Pains for constantly complaining about injuries","Was elected to the Hall of Fame in 1964"] },
  { player:"Mel Ott", sport:"⚾ MLB", answer:"OTT", era:"legends", stats:{HR:"42",AVG:".304",RBI:"123",YEAR:"1936"}, ctx:"1936 MLB Season — New York Giants All-Pro", clues:["Hit 42 home runs this season at age 27","Was the first NL player to hit 500 career home runs","Played for the New York Giants his entire career","Had an unusual high leg kick in his batting stance"] },
  { player:"Bob Feller", sport:"⚾ MLB", answer:"FELLER", era:"legends", stats:{W:"26",SO:"348",ERA:"2.18",NH:"2"}, ctx:"1946 MLB Season — Cleveland Indians comeback year", clues:["Won 26 games and struck out 348 in his comeback after WWII","Served 4 years in the Navy during WWII at his prime","Played for the Cleveland Indians his entire career","Nicknamed Rapid Robert for his blazing fastball"] },
  { player:"Paul Waner", sport:"⚾ MLB", answer:"WANER", era:"legends", stats:{AVG:".380",H:"237",RBI:"131",YEAR:"1927"}, ctx:"1927 MLB Season — Pittsburgh Pirates MVP", clues:["Won the NL MVP award this season","Hit .380 with 237 hits","Played for the Pittsburgh Pirates","Nicknamed Big Poison — his brother Lloyd was Little Poison"] },
  { player:"Hack Wilson", sport:"⚾ MLB", answer:"WILSON", era:"legends", stats:{HR:"56",RBI:"191",AVG:".356",YEAR:"1930"}, ctx:"1930 MLB Season — Chicago Cubs HR and RBI record", clues:["Set the NL home run record (56) and the all-time RBI record (191) in one season","The RBI record still stands today","Played for the Chicago Cubs","Was only 5ft 6in tall but had enormous arms and power"] },
  { player:"Diego Maradona", sport:"⚽ Soccer", answer:"MARADONA", era:"classic", stats:{G:"5",AST:"5",APP:"7",MIN:"630"}, ctx:"1986 FIFA World Cup — Argentina", clues:["Also won the Golden Ball as best player of the tournament","Won the Golden Ball as best player","Scored both the Hand of God and Goal of the Century vs England","Considered alongside Pele as the greatest ever"] },
  { player:"Ronaldo Nazario", sport:"⚽ Soccer", answer:"RONALDO NAZARIO", era:"classic", stats:{G:"15",AST:"4",APP:"16",MIN:"1238"}, ctx:"1996-97 Season — Barcelona La Liga", clues:["Won FIFA World Player of the Year at age 20","Scored 47 goals in all competitions","Played for Barcelona","Brazilian striker known as The Phenomenon"] },
  { player:"Ruud Gullit", sport:"⚽ Soccer", answer:"GULLIT", era:"classic", stats:{G:"3",AST:"5",APP:"7",MIN:"596"}, ctx:"UEFA Euro 1988 — Netherlands", clues:["Won the European Championship with Netherlands","Was the captain of the Dutch team","Won the Ballon d'Or in 1987","Played for AC Milan alongside Van Basten"] },
  { player:"Franco Baresi", sport:"⚽ Soccer", answer:"BARESI", era:"classic", stats:{APP:"532",UCL:"3",SCUD:"6",YEAR:"1994"}, ctx:"Career — AC Milan sweeper legend", clues:["Was the sweeper for AC Milan during their dominant era","Won 3 European Cups and 6 Serie A titles","Retired with his number 6 retired by AC Milan","Was considered the best defender in the world in the 1980s and 90s"] },
  { player:"Alessandro Del Piero", sport:"⚽ Soccer", answer:"DEL PIERO", era:"classic", stats:{G:"290",APP:"705",UCL:"1",SCUD:"6"}, ctx:"Career totals — Juventus legend", clues:["Scored 290 goals for Juventus — their all-time record","Won 6 Serie A titles with Juventus","Won the 2006 World Cup with Italy","Known as Pinturicchio for his elegant playing style"] },
  { player:"Rivaldo", sport:"⚽ Soccer", answer:"RIVALDO", era:"modern", stats:{G:"8",AST:"3",APP:"7",MIN:"630"}, ctx:"2002 FIFA World Cup — Brazil", clues:["Was the key player for Barcelona in the late 1990s","Won the Ballon d'Or in 1999","Played for Barcelona and AC Milan","Brazilian forward known for his bicycle kicks and free kicks"] },
  { player:"Bobby Charlton", sport:"⚽ Soccer", answer:"BOBBY CHARLTON", era:"legends", stats:{G:"49",APP:"106",WC:"1",EURO:"0"}, ctx:"Career — England and Manchester United legend", clues:["Won the 1966 World Cup with England","Survived the 1958 Munich air disaster","Played for Manchester United his entire career","Was knighted for his services to football"] },
  { player:"Bobby Moore", sport:"⚽ Soccer", answer:"MOORE", era:"legends", stats:{G:"2",APP:"108",WC:"1",YEAR:"1966"}, ctx:"1966 FIFA World Cup — England World Champions", clues:["Lifted the Jules Rimet Trophy at Wembley Stadium","Lifted the Jules Rimet Trophy at Wembley","Played for West Ham United","Considered the greatest English defender ever"] },
  { player:"Gerd Muller", sport:"⚽ Soccer", answer:"GERD MULLER", era:"classic", stats:{G:"14",APP:"10",MIN:"780",YEAR:"1970"}, ctx:"1970 FIFA World Cup — West Germany", clues:["Won the Golden Boot with 14 goals in 10 games","Played for West Germany","Nicknamed Der Bomber","Bayern Munich and West Germany striker of the 1970s"] },
  { player:"Lev Yashin", sport:"⚽ Soccer", answer:"LEV YASHIN", era:"legends", stats:{CS:"270",SAVES:"150+",YEAR:"1966",NATION:"Soviet Union"}, ctx:"Career — Soviet Union goalkeeper legend", clues:["Only goalkeeper to ever win the Ballon d'Or (1963)","Saved an estimated 150 penalties in his career","Played for Soviet Union national team","Known as The Black Spider for his all-black attire"] },
  { player:"Geoff Hurst", sport:"⚽ Soccer", answer:"HURST", era:"legends", stats:{G:"3",AST:"0",APP:"1",MIN:"90"}, ctx:"1966 FIFA World Cup Final — England vs West Germany", clues:["Scored a hat trick in the World Cup Final — the only player to do so","Also scored the hat trick in the Final","Played for West Ham United","His second goal — did it cross the line — remains controversial"] },
  { player:"Garrincha", sport:"⚽ Soccer", answer:"GARRINCHA", era:"legends", stats:{G:"5",APP:"6",MIN:"540",YEAR:"1962"}, ctx:"1962 FIFA World Cup — Brazil", clues:["Won the Golden Boot at the 1962 World Cup","Won the Golden Boot with 5 goals in 6 games","Played for Botafogo in Brazil","Nicknamed Mane Garrincha — considered the greatest dribbler ever"] },
  { player:"Fritz Walter", sport:"⚽ Soccer", answer:"FRITZ WALTER", era:"legends", stats:{G:"0",AST:"1",APP:"1",MIN:"90"}, ctx:"1954 FIFA World Cup Final — West Germany", clues:["Captained West Germany to the 1954 World Cup — the Miracle of Bern","Was the leader of the surprise winning team","Played for Kaiserslautern his entire career","Rainy conditions at the final — now called Fritz Walter Weather — favored Germany"] },
  { player:"Giuseppe Meazza", sport:"⚽ Soccer", answer:"MEAZZA", era:"legends", stats:{G:"33",APP:"53",WC:"2",YEAR:"1938"}, ctx:"Career — Italy World Cup winning captain", clues:["Was the greatest Italian player of the pre-war era","Was the captain of Italy in 1938","Played for Inter Milan — the San Siro stadium is named after him","Was the greatest Italian player of the pre-war era"] },
  { player:"Tom Finney", sport:"⚽ Soccer", answer:"FINNEY", era:"legends", stats:{G:"30",APP:"76",YEAR:"1954",NATION:"England"}, ctx:"Career — England and Preston North End legend", clues:["Was never booked in his entire career","Scored 30 goals in 76 England appearances","Played his entire club career for Preston North End — despite huge offers to leave","Was a plumber who kept his trade throughout his playing career"] },
  { player:"Alfredo Di Stefano", sport:"⚽ Soccer", answer:"DI STEFANO", era:"legends", stats:{G:"308",APP:"510",UCL:"5",YEAR:"1964"}, ctx:"Career — Real Madrid legend", clues:["Won 5 consecutive European Cups with Real Madrid","Scored in 5 consecutive European Cup Finals","Played for Real Madrid in their golden era","Argentine-born who also represented Spain and Colombia internationally"] },
  { player:"Ferenc Puskas", sport:"⚽ Soccer", answer:"PUSKAS", era:"legends", stats:{G:"84",APP:"85",WC:"0",YEAR:"1960"}, ctx:"Career — Real Madrid and Hungary legend", clues:["Scored 84 goals in 85 appearances for Hungary","Won 3 European Cups with Real Madrid","Was the leading scorer in the 1960 European Cup Final with 4 goals","Nicknamed The Galloping Major"] },
  { player:"Raymond Kopa", sport:"⚽ Soccer", answer:"KOPA", era:"legends", stats:{BALLON:"1",WC:"3rd",YEAR:"1958",NATION:"France"}, ctx:"1958 FIFA World Cup — France", clues:["Won the Ballon d'Or in 1958","Led France to 3rd place at the 1958 World Cup","Played for Real Madrid alongside Di Stefano","Was the first French player to win the Ballon d'Or"] },
  { player:"Didi", sport:"⚽ Soccer", answer:"DIDI", era:"legends", stats:{G:"3",APP:"5",WC:"2",YEAR:"1958"}, ctx:"1958 FIFA World Cup — Brazil", clues:["Was the best player at the 1958 World Cup","Played with the teenage Pele in Brazil's winning team","Played for Botafogo and Real Madrid","Was known for his folha seca (dry leaf) free kicks"] },
  { player:"Sandor Kocsis", sport:"⚽ Soccer", answer:"KOCSIS", era:"legends", stats:{G:"11",APP:"5",YEAR:"1954",WC:"Silver"}, ctx:"1954 FIFA World Cup — Hungary", clues:["Scored 11 goals at the 1954 World Cup — won the Golden Boot","Hungary reached the final as heavy favorites","Played for the Golden Team of Hungary","Nicknamed Golden Head for his heading ability"] },
  { player:"Uwe Seeler", sport:"⚽ Soccer", answer:"SEELER", era:"legends", stats:{G:"43",APP:"72",YEAR:"1966",WC:"3rd"}, ctx:"Career — West Germany and Hamburg legend", clues:["Scored 43 goals in 72 appearances for West Germany","Played in 4 World Cups for West Germany","Played his entire club career for Hamburg","Is one of only 4 players to score in 4 different World Cups"] },
  { player:"Rivaldo", sport:"⚽ Soccer", answer:"RIVALDO CLASSIC", era:"legends", stats:{G:"35",APP:"74",WC:"1",BALLON:"1"}, ctx:"Career — Brazil and Barcelona legend", clues:["Won the Ballon d'Or in 1999","Won the World Cup with Brazil in 2002","Was the key player for Barcelona in the late 1990s","From Recife, Brazil"] },
  { player:"John Charles", sport:"⚽ Soccer", answer:"JOHN CHARLES", era:"legends", stats:{G:"28",APP:"97",YEAR:"1958",NATION:"Wales"}, ctx:"Career — Wales and Juventus legend", clues:["Was equally brilliant as center forward or center back","Played for Juventus in Italy — nicknamed Il Buon Gigante (The Gentle Giant)","Scored 28 goals in 97 appearances for Wales","Was never booked in his career despite his physical size"] },
  { player:"Djalma Santos", sport:"⚽ Soccer", answer:"DJALMA SANTOS", era:"legends", stats:{G:"3",APP:"98",WC:"2",YEAR:"1962"}, ctx:"Career — Brazil two-time World Cup champion", clues:["Was considered the best right back in the world in the late 1950s","Was considered the best right back in the world in the late 1950s","Played for Atletico Paranaense and Palmerias","Won the World Cup in his last international tournament"] },
  { player:"Bjorn Borg", sport:"🎾 Tennis", answer:"BJORN BORG", era:"classic", stats:{W:"89",L:"3",GS:"5",TITLES:"11"}, ctx:"1979 ATP Season — 4th consecutive Wimbledon title", clues:["Won Wimbledon for the 4th consecutive year","Won 11 Grand Slams in total","Swedish player who retired at just 26","Famous rivalry with John McEnroe"] },
  { player:"John McEnroe", sport:"🎾 Tennis", answer:"MCENROE", era:"classic", stats:{W:"82",L:"3",GS:"3",TITLES:"10"}, ctx:"1984 ATP Season — Most dominant year", clues:["Won 82 of 85 matches this year — one of the best seasons ever","Won Wimbledon and US Open this year","American player famous for his on-court outbursts","His rivalry with Borg is one of sport's greatest"] },
  { player:"Stefan Edberg", sport:"🎾 Tennis", answer:"EDBERG", era:"classic", stats:{W:"75",L:"17",GS:"2",TITLES:"9"}, ctx:"1990 ATP Season — World No. 1 and Wimbledon champion", clues:["Won Wimbledon and US Open this year","Reached World No. 1 for the second time","Swedish player known for his serve and volley style","Won 6 Grand Slams in total"] },
  { player:"Steffi Graf", sport:"🎾 Tennis", answer:"STEFFI GRAF", era:"classic", stats:{W:"96",L:"2",GS:"4",TITLES:"11"}, ctx:"1988 WTA Season — Golden Slam", clues:["Won all 4 Grand Slams AND Olympic gold in one year","Only player ever to achieve the Golden Slam","From West Germany","Married to Andre Agassi"] },
  { player:"Andre Agassi", sport:"🎾 Tennis", answer:"AGASSI", era:"classic", stats:{W:"74",L:"14",GS:"2",RANK:"1"}, ctx:"1994 ATP Season — Two Grand Slams and World No. 1", clues:["Won Wimbledon and US Open this year","Reached World No. 1 for the first time","American player known for his baseline power","Won all 4 Grand Slams in his career"] },
  { player:"Conchita Martinez", sport:"🎾 Tennis", answer:"MARTINEZ", era:"classic", stats:{W:"1",YEAR:"1994",SURFACE:"Grass",NATION:"Spain"}, ctx:"1994 Wimbledon — Spanish clay courter wins on grass", clues:["Won Wimbledon as a clay court specialist","Beat Martina Navratilova in the final","Spanish player who was better known on clay","This was her only Grand Slam singles title"] },
  { player:"Rod Laver", sport:"🎾 Tennis", answer:"LAVER", era:"legends", stats:{GS:"11",SLAM:"2",YEAR:"1969",NATION:"Australia"}, ctx:"1969 ATP Season — Second career Grand Slam", clues:["Turned professional in 1963 after dominating amateur tennis","Won 11 Grand Slam singles titles","Australian player who dominated amateur and professional tennis","Considered the greatest tennis player of his era"] },
  { player:"Ken Rosewall", sport:"🎾 Tennis", answer:"ROSEWALL", era:"classic", stats:{GS:"8",FINAL:"4",YEAR:"1974",AGE:"39"}, ctx:"1974 Wimbledon Final — 39-year-old finalist", clues:["Reached the Wimbledon Final at age 39 — lost to Connors","Won 8 Grand Slam singles titles spanning 19 years","Australian player nicknamed Muscles","Won his last Grand Slam title at age 37"] },
  { player:"Arthur Ashe", sport:"🎾 Tennis", answer:"ASHE", era:"classic", stats:{GS:"3",WIMB:"1",YEAR:"1975",NATION:"USA"}, ctx:"1975 Wimbledon — Historic win over Connors", clues:["Won Wimbledon by upsetting the heavily favored Jimmy Connors","Was the first Black man to win Wimbledon","Won 3 Grand Slam titles in his career","Became an activist and spokesperson for AIDS awareness"] },
  { player:"Margaret Court", sport:"🎾 Tennis", answer:"COURT", era:"classic", stats:{GS:"24",SLAM:"3",YEAR:"1970",NATION:"Australia"}, ctx:"1970 WTA Season — Calendar Grand Slam", clues:["Won all 4 Grand Slams in one year — the Grand Slam","Won 24 Grand Slam singles titles — the most ever","Australian player who dominated women's tennis in the 1960s and 70s","Retired with 24 Grand Slam singles titles — the most in history"] },
  { player:"Billie Jean King", sport:"🎾 Tennis", answer:"BILLIE JEAN KING", era:"legends", stats:{GS:"12",WIMB:"6",YEAR:"1967",BATTLE:"1"}, ctx:"Career — Women's tennis pioneer", clues:["Won 12 Grand Slam singles titles including 6 Wimbledons","Won the Battle of the Sexes match vs Bobby Riggs in 1973","Was a champion for equal prize money in tennis","Founded the Women's Tennis Association"] },
  { player:"Ilie Nastase", sport:"🎾 Tennis", answer:"NASTASE", era:"classic", stats:{W:"104",L:"7",GS:"2",RANK:"1"}, ctx:"1973 ATP Season — World No. 1 dominant year", clues:["Was the first official World No. 1 in tennis","Won 2 Grand Slams in his career","Romanian player known as Nasty for his on-court behavior","Won 109 singles titles in his career"] },
  { player:"Evonne Goolagong", sport:"🎾 Tennis", answer:"GOOLAGONG", era:"classic", stats:{GS:"7",WIMB:"2",YEAR:"1971",NATION:"Australia"}, ctx:"1971 Wimbledon — First win at 19 years old", clues:["Won Wimbledon at age 19 in her first major final","Won 7 Grand Slam singles titles","Australian Aboriginal player who broke barriers","Won Wimbledon a second time in 1980 as a mother"] },
  { player:"Pancho Gonzales", sport:"🎾 Tennis", answer:"GONZALES", era:"legends", stats:{PRO:"8",YEAR:"1954",NATION:"USA",RANK:"1"}, ctx:"1950s Professional Tennis — Dominant decade", clues:["Dominated professional tennis for nearly a decade","Won the US Championships as an amateur in 1948 and 1949","American player of Mexican descent who overcame poverty","Was considered one of the greatest players of all time"] },
  { player:"Lew Hoad", sport:"🎾 Tennis", answer:"HOAD", era:"legends", stats:{GS:"4",WIMB:"2",YEAR:"1956",NATION:"Australia"}, ctx:"1956 ATP Season — Two Grand Slams at age 21", clues:["Won Wimbledon and Australian Open at just 21","Had a career hampered by back injuries","Australian player who was Rod Laver's idol","Won 4 Grand Slams in his short career"] },
  { player:"Fred Perry", sport:"🎾 Tennis", answer:"FRED PERRY", era:"legends", stats:{GS:"8",WIMB:"3",YEAR:"1936",NATION:"Great Britain"}, ctx:"1936 Wimbledon — Last British man to win", clues:["Was the last British man to win Wimbledon (until Murray in 2013)","Won 8 Grand Slam titles including 3 consecutive Wimbledons","Was the World No. 1 for 4 years","Later founded the Fred Perry clothing brand"] },
  { player:"Tony Trabert", sport:"🎾 Tennis", answer:"TRABERT", era:"legends", stats:{GS:"5",YEAR:"1955",NATION:"USA",SLAM:"1"}, ctx:"1955 ATP Season — Three Grand Slams", clues:["Won 3 Grand Slams in one year (1955)","Won 5 Grand Slam singles titles in total","American player from Cincinnati","Was considered the best American player of the mid-1950s"] },
  { player:"Jack Kramer", sport:"🎾 Tennis", answer:"KRAMER", era:"legends", stats:{GS:"3",WIMB:"1",YEAR:"1947",NATION:"USA"}, ctx:"1947 Wimbledon — Post-war American champion", clues:["Won Wimbledon and US Championships in 1947","Dominated professional tennis after turning pro","Later became a powerful force in organizing professional tennis","From Las Vegas, Nevada"] },
  { player:"Don Budge", sport:"🎾 Tennis", answer:"BUDGE", era:"legends", stats:{GS:"6",SLAM:"1",YEAR:"1938",NATION:"USA"}, ctx:"1938 ATP Season — First ever Grand Slam", clues:["Was the first player ever to win the Grand Slam (all 4 majors in one year)","Won 6 Grand Slam titles in total","American player from Oakland, California","Was the top-ranked player in the world from 1937 to 1938"] },
  { player:"Maureen Connolly", sport:"🎾 Tennis", answer:"CONNOLLY", era:"legends", stats:{GS:"9",SLAM:"1",YEAR:"1953",NATION:"USA"}, ctx:"1953 WTA Season — First women's Grand Slam", clues:["Was the first woman to win the Grand Slam (all 4 majors in one year)","Won 9 Grand Slam singles titles by age 19","Nicknamed Little Mo","Her career was cut short by a horse riding accident at age 19"] },
  { player:"Helen Wills Moody", sport:"🎾 Tennis", answer:"WILLS MOODY", era:"legends", stats:{GS:"19",WIMB:"8",YEAR:"1935",NATION:"USA"}, ctx:"Career — 1920s-30s American tennis queen", clues:["Won 19 Grand Slam singles titles","Won Wimbledon 8 times","Never lost a set in Wimbledon singles matches for 9 years","Nicknamed Queen Helen and Little Poker Face"] },
  { player:"Suzanne Lenglen", sport:"🎾 Tennis", answer:"LENGLEN", era:"legends", stats:{GS:"12",WIMB:"6",YEAR:"1922",NATION:"France"}, ctx:"1920s WTA Season — First female tennis superstar", clues:["Won 12 Grand Slam singles titles","Won Wimbledon 6 consecutive times","Was the first female tennis superstar and celebrity athlete","French player who revolutionized women's tennis fashion and style"] },
  { player:"Henri Cochet", sport:"🎾 Tennis", answer:"COCHET", era:"legends", stats:{GS:"8",YEAR:"1928",NATION:"France",MUSK:"1"}, ctx:"1928 ATP Season — French Musketeers era", clues:["Won 8 Grand Slam titles including the French Open 4 times","Was part of the Four Musketeers of French tennis","Was famous for dramatic comebacks from two sets down","Nicknamed The Magician of the Court"] },
  { player:"Louise Brough", sport:"🎾 Tennis", answer:"BROUGH", era:"legends", stats:{GS:"13",WIMB:"4",YEAR:"1950",NATION:"USA"}, ctx:"Career — Post-war American women's champion", clues:["Won 13 Grand Slam titles including 4 consecutive Wimbledons (1948-50)","Won all 4 Grand Slams in her career","American player from Beverly Hills","Won 35 Grand Slam titles in singles, doubles, and mixed combined"] },
  { player:"Doris Hart", sport:"🎾 Tennis", answer:"DORIS HART", era:"legends", stats:{GS:"35",SINGLES:"6",YEAR:"1951",NATION:"USA"}, ctx:"Career — Post-war American all-court champion", clues:["Won 35 Grand Slam titles combining singles, doubles, and mixed","Won the Grand Slam in doubles and mixed doubles","Overcame severe leg problems as a child that doctors thought would prevent her from walking","One of the most versatile players of the amateur era"] },
  { player:"Tiger Woods", sport:"⛳ Golf", answer:"TIGER WOODS", era:"modern", stats:{WINS:"9",MAJORS:"3",AVG:"68.56",CUTS:"20"}, ctx:"2000 PGA Tour — Won 3 of 4 majors and all 4 cuts", clues:["Won 3 of 4 majors this year","Made every single cut","Won US Open by 15 strokes","His last name is a large animal"] },
  { player:"Phil Mickelson", sport:"⛳ Golf", answer:"PHIL MICKELSON", era:"modern", stats:{WINS:"4",MAJORS:"1",AVG:"69.1",EARN:"$4.7M"}, ctx:"2004 PGA Tour Season — First Masters title", clues:["Won his first Masters title after years of near misses","Had been called the best player without a major","Left-handed golfer nicknamed Lefty","Won by one shot at Augusta"] },
  { player:"Dustin Johnson", sport:"⛳ Golf", answer:"DUSTIN JOHNSON", era:"modern", stats:{WINS:"5",MAJORS:"1",AVG:"69.40",EARN:"$9.4M"}, ctx:"2020 PGA Tour Season — Masters record", clues:["Won The Masters by 5 shots setting the scoring record","Set the 72-hole scoring record at Augusta (-20)","From Columbia, South Carolina","Won 2 major championships in his career"] },
  { player:"Jon Rahm", sport:"⛳ Golf", answer:"RAHM", era:"modern", stats:{WINS:"3",MAJORS:"1",AVG:"69.30",EARN:"$7.7M"}, ctx:"2021 US Open — Jon Rahm wins first major", clues:["Won his first major at the US Open","Had tested positive for COVID two weeks earlier and had to withdraw from an event while leading","From Barrika, Spain","Moved to LIV Golf in 2024"] },
  { player:"Scottie Scheffler", sport:"⛳ Golf", answer:"SCHEFFLER", era:"modern", stats:{WINS:"4",MAJORS:"1",AVG:"68.85",EARN:"$14.1M"}, ctx:"2022 PGA Tour Season — Masters and World No. 1", clues:["Won The Masters and 3 other events this year","Became World No. 1 for the first time","From Dallas, Texas","Became the dominant player of his era"] },
  { player:"Vijay Singh", sport:"⛳ Golf", answer:"VIJAY SINGH", era:"modern", stats:{WINS:"9",MAJORS:"1",AVG:"69.0",EARN:"$10.9M"}, ctx:"2004 PGA Tour Season — World No. 1", clues:["Won 9 tournaments and became World No. 1","Dethroned Tiger Woods at the top of the rankings","From Lautoka, Fiji — first Fijian to reach World No. 1","Known for his intense practice work ethic"] },
  { player:"Ernie Els", sport:"⛳ Golf", answer:"ERNIE ELS", era:"classic", stats:{WINS:"4",MAJORS:"2",AVG:"69.8",EARN:"$6.8M"}, ctx:"1997 PGA Tour Season — Two US Open titles", clues:["Won 2 US Opens and 2 British Opens in his career","Nicknamed The Big Easy for his smooth swing","From Johannesburg, South Africa","Won the US Open in 1994 and 1997"] },
  { player:"Sergio Garcia", sport:"⛳ Golf", answer:"GARCIA", era:"modern", stats:{WINS:"1",MAJORS:"1",AVG:"70.52",EARN:"$2.2M"}, ctx:"2017 Masters — First major for Garcia", clues:["Won his first major at The Masters at age 37","Had been considered the best player without a major","From Borriol, Spain","Beat Justin Rose in a playoff at Augusta"] },
  { player:"Adam Scott", sport:"⛳ Golf", answer:"ADAM SCOTT", era:"modern", stats:{WINS:"1",MAJORS:"1",AVG:"70.05",EARN:"$4.6M"}, ctx:"2013 Masters — First Australian Masters winner", clues:["Became the first Australian to win The Masters","Won in a playoff over Angel Cabrera","From Adelaide, South Australia","Was coached by Butch Harmon and worked with caddie Steve Williams"] },
  { player:"Henrik Stenson", sport:"⛳ Golf", answer:"STENSON", era:"modern", stats:{WINS:"1",MAJORS:"1",AVG:"69.72",EARN:"$3.1M"}, ctx:"2016 British Open — Duel in the Sun II", clues:["Won The Open Championship in an epic duel with Phil Mickelson","Shot 63 in the final round to win","From Gothenburg, Sweden","Was nicknamed The Iceman for his calm demeanor under pressure"] },
  { player:"Collin Morikawa", sport:"⛳ Golf", answer:"COLLIN MORIKAWA", era:"modern", stats:{WINS:"2",MAJORS:"2",AVG:"69.47",EARN:"$4.8M"}, ctx:"2021 PGA Tour Season — The Open Championship", clues:["Won The Open Championship on his first appearance","Won 2 majors in his first 9 major starts","From Los Angeles, California","Korean-American player nicknamed The Machine for his iron play"] },
  { player:"Xander Schauffele", sport:"⛳ Golf", answer:"SCHAUFFELE", era:"modern", stats:{WINS:"2",MAJORS:"2",EARN:"$9.7M",YEAR:"2024"}, ctx:"2024 PGA Tour Season — Two major wins", clues:["Won the PGA Championship and The Open Championship this year","Had been the best player without a major for years","From San Diego, California","His father was an Olympic decathlete"] },
  { player:"Rickie Fowler", sport:"⛳ Golf", answer:"FOWLER", era:"modern", stats:{WINS:"5",MAJORS:"0",AVG:"70.12",EARN:"$6.7M"}, ctx:"2015 PGA Tour Season — Players Championship win", clues:["Won the Players Championship — sometimes called the 5th major","Known for wearing orange — his college color","From Murrieta, California","Has been in the top 10 at all 4 majors in the same year without winning one"] },
  { player:"Patrick Cantlay", sport:"⛳ Golf", answer:"PATRICK CANTLAY", era:"modern", stats:{WINS:"4",MAJORS:"0",EARN:"$8.7M",YEAR:"2021"}, ctx:"2021 PGA Tour Season — FedEx Cup champion", clues:["Won the FedEx Cup in a dramatic playoff","Ranked among the top 5 players in the world","From Long Beach, California","Known for his calm demeanor nicknamed Patty Ice"] },
  { player:"Matt Fitzpatrick", sport:"⛳ Golf", answer:"FITZPATRICK", era:"modern", stats:{WINS:"1",MAJORS:"1",EARN:"$2.8M",YEAR:"2022"}, ctx:"2022 US Open — Brookline comeback win", clues:["Won the US Open at The Country Club in Brookline","Had won the US Amateur at the same course 10 years earlier","From Sheffield, England","Beat Will Zalatoris and Scottie Scheffler"] },
  { player:"Sam Burns", sport:"⛳ Golf", answer:"SAM BURNS", era:"modern", stats:{WINS:"3",MAJORS:"0",EARN:"$6.8M",YEAR:"2022"}, ctx:"2022 PGA Tour Season — Three wins", clues:["Won 3 PGA Tour events in the same season","Known for his iron play and ball-striking","From Shreveport, Louisiana","Won multiple Zurich Classic titles with partner Webb Simpson"] },
  { player:"Tom Watson", sport:"⛳ Golf", answer:"TOM WATSON", era:"classic", stats:{WINS:"6",MAJORS:"2",EARN:"$1.2M",YEAR:"1982"}, ctx:"1982 PGA Tour Season — US Open chip-in at Pebble Beach", clues:["Won the US Open at Pebble Beach with a famous chip-in on 17","Won The Open Championship the same year","Won 8 majors in total","From Kansas City, Missouri"] },
  { player:"Nick Faldo", sport:"⛳ Golf", answer:"NICK FALDO", era:"classic", stats:{WINS:"4",MAJORS:"2",AVG:"69.90",YEAR:"1990"}, ctx:"1990 PGA Tour Season — Masters and British Open", clues:["Won The Masters and The Open Championship this year","Won 6 major championships in total","From Welwyn Garden City, England","Rebuilt his swing from scratch with coach David Leadbetter"] },
  { player:"Greg Norman", sport:"⛳ Golf", answer:"GREG NORMAN", era:"classic", stats:{WINS:"3",MAJORS:"1",AVG:"69.10",YEAR:"1993"}, ctx:"1993 PGA Tour Season — British Open", clues:["Won The Open Championship this year by 2 shots","Reached World No. 1 for 331 weeks","From Mount Isa, Queensland, Australia","Nicknamed The Great White Shark"] },
  { player:"Seve Ballesteros", sport:"⛳ Golf", answer:"SEVE BALLESTEROS", era:"classic", stats:{WINS:"4",MAJORS:"1",AVG:"70.20",YEAR:"1984"}, ctx:"1984 British Open at St Andrews", clues:["Won The Open Championship at the home of golf","Won 5 major championships in his career","From Pedrena, Spain","Pioneered European golf as a global force"] },
  { player:"Lee Trevino", sport:"⛳ Golf", answer:"LEE TREVINO", era:"classic", stats:{WINS:"4",MAJORS:"2",EARN:"$3.2M",YEAR:"1971"}, ctx:"1971 PGA Tour — Three Opens in three weeks", clues:["Won the US Open, Canadian Open, and British Open in the same month","Won 6 major championships in total","From Dallas, Texas","Nicknamed Super Mex"] },
  { player:"Payne Stewart", sport:"⛳ Golf", answer:"PAYNE STEWART", era:"classic", stats:{WINS:"3",MAJORS:"1",PUTT:"1.741",YEAR:"1999"}, ctx:"1999 US Open — Pinehurst No. 2", clues:["Sank the winning putt on the 18th to win the US Open","Was killed in a plane crash 4 months after this win","From Springfield, Missouri","Known for wearing knickerbockers and tam o'shanter caps"] },
  { player:"Curtis Strange", sport:"⛳ Golf", answer:"CURTIS STRANGE", era:"classic", stats:{WINS:"3",MAJORS:"2",EARN:"$1.1M",YEAR:"1989"}, ctx:"1989 PGA Tour Season — US Open back-to-back", clues:["Won the US Open for the second consecutive year","First player to earn over $1M in a season","From Norfolk, Virginia","Back-to-back US Open wins are extremely rare"] },
  { player:"Bernhard Langer", sport:"⛳ Golf", answer:"BERNHARD LANGER", era:"classic", stats:{WINS:"4",MAJORS:"2",RYDER:"19.5",YEAR:"1993"}, ctx:"1993 Masters — Augusta National second win", clues:["Won his second Masters title this year","Won 2 Masters Championships","From Anhausen, West Germany","Had the yips and reinvented his putting style"] },
  { player:"Fred Couples", sport:"⛳ Golf", answer:"COUPLES", era:"classic", stats:{WINS:"4",MAJORS:"1",AVG:"69.38",YEAR:"1992"}, ctx:"1992 Masters — Fred Couples wins first major", clues:["Won The Masters for his only major championship","His ball famously stayed on the bank on 12 and he made birdie","From Seattle, Washington","Known as Boom Boom for his long driving"] },
  { player:"Sandy Lyle", sport:"⛳ Golf", answer:"SANDY LYLE", era:"classic", stats:{WINS:"2",MAJORS:"2",EARN:"$1.6M",YEAR:"1988"}, ctx:"1988 Masters — First British winner at Augusta", clues:["Became the first British player to win The Masters","His famous bunker shot on 18 is one of golf's most iconic moments","From Shrewsbury, England (of Scottish descent)","Also won The Open Championship in 1985"] },
  { player:"Ian Woosnam", sport:"⛳ Golf", answer:"WOOSNAM", era:"classic", stats:{WINS:"1",MAJORS:"1",RANK:"1",YEAR:"1991"}, ctx:"1991 Masters — Welsh champion reaches No. 1", clues:["Won The Masters and became World No. 1","Only 5ft 4in — one of the shortest players ever to reach World No. 1","From Oswestry, England (of Welsh descent)","Was known for his incredible distance given his small stature"] },
  { player:"Mark O'Meara", sport:"⛳ Golf", answer:"OMEARA", era:"classic", stats:{WINS:"2",MAJORS:"2",AVG:"70.47",YEAR:"1998"}, ctx:"1998 PGA Tour Season — Masters and British Open at 41", clues:["Won The Masters and The Open Championship in the same year at age 41","Had been a close friend of Tiger Woods for years","From Goldsboro, North Carolina","Won both his majors in his late 30s and early 40s"] },
  { player:"Davis Love III", sport:"⛳ Golf", answer:"DAVIS LOVE", era:"classic", stats:{SCORE:"-11",MARGIN:"5",R1:"66",R4:"71"}, ctx:"1997 PGA Championship — Kiawah Island win", clues:["Won the PGA Championship at Kiawah Island","Dedicated the win to his father who died in a plane crash","From Charlotte, North Carolina","Later became a prominent Ryder Cup captain"] },
  { player:"Paul Azinger", sport:"⛳ Golf", answer:"AZINGER", era:"classic", stats:{SCORE:"-12",PLAYOFF:"W",OPP:"Greg Norman",HOLES:"2"}, ctx:"1993 PGA Championship — Inverness Club win", clues:["Won the PGA Championship in a playoff","Was later diagnosed with lymphoma but returned to win again","From Holyoke, Massachusetts","Later became a successful Ryder Cup captain in 2008"] },
  { player:"Bob Tway", sport:"⛳ Golf", answer:"TWAY", era:"classic", stats:{SCORE:"-12",BUNKER:"1",HOLE:"18",LEAD:"Norman"}, ctx:"1986 PGA Championship — Inverness Club", clues:["Holed out from a bunker on the 72nd hole to win the PGA Championship","Came from behind to beat Greg Norman","From Oklahoma City, Oklahoma","Ironically Greg Norman lost multiple majors in similar late-charge fashion"] },
  { player:"Hale Irwin", sport:"⛳ Golf", answer:"IRWIN", era:"classic", stats:{WINS:"3",MAJORS:"1",AGE:"45",YEAR:"1990"}, ctx:"1990 US Open — Medinah Country Club at age 45", clues:["Won the US Open at age 45 — the oldest major winner at the time","Won 3 US Opens in his career","From Joplin, Missouri","Was also a scholarship football player at the University of Colorado"] },
  { player:"Tom Kite", sport:"⛳ Golf", answer:"KITE", era:"classic", stats:{WINS:"1",MAJORS:"1",AVG:"70.21",YEAR:"1992"}, ctx:"1992 US Open — Pebble Beach in tough conditions", clues:["Won the US Open at Pebble Beach in extremely windy conditions","Was the all-time money leader at one point in his career","From Austin, Texas — played college golf with Ben Crenshaw","Wore glasses while playing"] },
  { player:"Larry Mize", sport:"⛳ Golf", answer:"MIZE", era:"classic", stats:{CHIP:"45yds",HOLE:"11",PLAYOFF:"W",OPP:"Norman"}, ctx:"1987 Masters playoff — Famous chip-in against Norman", clues:["Chipped in from 45 yards on the 11th hole in a sudden death playoff","Beat Greg Norman with the miraculous chip","From Augusta, Georgia — a hometown hero","This was his only major championship"] },
  { player:"Hal Sutton", sport:"⛳ Golf", answer:"SUTTON", era:"classic", stats:{SCORE:"-10",MARGIN:"1",AGE:"25",FIELD:"Nicklaus"}, ctx:"1983 PGA Championship — First major win", clues:["Won the PGA Championship as a 25-year-old","His famous call to Tiger Woods at Ryder Cup became controversial","From Shreveport, Louisiana","Won 14 PGA Tour events in his career"] },
  { player:"Ben Hogan", sport:"⛳ Golf", answer:"BEN HOGAN", era:"legends", stats:{WINS:"5",MAJORS:"3",AVG:"69.3",YEAR:"1953"}, ctx:"1953 PGA Tour Season — The Hogan Slam", clues:["Won 3 majors in one year","Could not attempt the Grand Slam due to scheduling conflicts","Had survived a near-fatal car accident years earlier","Considered one of the greatest ball-strikers ever"] },
  { player:"Sam Snead", sport:"⛳ Golf", answer:"SAM SNEAD", era:"legends", stats:{WINS:"18",MAJORS:"3",EARN:"$620K",YEAR:"1950"}, ctx:"Career — Most PGA Tour wins ever", clues:["Won 82 PGA Tour events — the most ever","Won 7 major championships in his career","From Hot Springs, Virginia","Was known for his smooth, effortless swing"] },
  { player:"Byron Nelson", sport:"⛳ Golf", answer:"BYRON NELSON", era:"legends", stats:{WINS:"18",STREAK:"11",AVG:"68.33",YEAR:"1945"}, ctx:"1945 PGA Tour Season — Greatest season in golf history", clues:["Won 18 tournaments in one season — all-time record","Won 11 consecutive tournaments — all-time record","Played mostly during World War II era","His record may never be broken"] },
  { player:"Arnold Palmer", sport:"⛳ Golf", answer:"ARNOLD PALMER", era:"legends", stats:{WINS:"7",MAJORS:"3",EARN:"$1.8M",YEAR:"1962"}, ctx:"Career — Arnie's Army built golf's popularity", clues:["Won 7 major championships in his career","Built a massive following called Arnie's Army","From Latrobe, Pennsylvania","With Jack Nicklaus and Gary Player formed golf's Big Three"] },
  { player:"Gary Player", sport:"⛳ Golf", answer:"GARY PLAYER", era:"legends", stats:{WINS:"9",MAJORS:"3",SLAM:"1",YEAR:"1965"}, ctx:"Career — First non-American to win Masters", clues:["Won all 4 majors in his career (Grand Slam)","Won 9 major championships total","From Johannesburg, South Africa","Was the first non-American to win The Masters in 1961"] },
  { player:"Gene Sarazen", sport:"⛳ Golf", answer:"GENE SARAZEN", era:"legends", stats:{MAJORS:"7",SLAM:"1",SHOT:"1",YEAR:"1935"}, ctx:"Career — First Grand Slam champion", clues:["Won all 4 majors in his career — the first to do so","Invented the sand wedge","Made the shot heard round the world — a double eagle at the 1935 Masters","Won 7 major championships in his career"] },
  { player:"Walter Hagen", sport:"⛳ Golf", answer:"WALTER HAGEN", era:"legends", stats:{MAJORS:"11",PGA:"5",BRIT:"4",YEAR:"1928"}, ctx:"Career — 1920s dominant era", clues:["Won 11 major championships in his career","Won 5 consecutive PGA Championships (1924-27)","Was the first golfer to earn $1 million","Was famous for his showmanship and stylish appearance"] },
  { player:"Bobby Jones", sport:"⛳ Golf", answer:"BOBBY JONES", era:"legends", stats:{MAJORS:"13",SLAM:"1",YEAR:"1930",AMATEUR:"5"}, ctx:"1930 Season — The Impregnable Quadrilateral", clues:["Won the Grand Slam (all 4 majors) in 1930","Was an amateur who never turned professional","Won 13 major championships (5 US Amateurs + 4 US Opens + 4 Opens)","Founded Augusta National Golf Club and The Masters"] },
  { player:"Tommy Armour", sport:"⛳ Golf", answer:"TOMMY ARMOUR", era:"legends", stats:{MAJORS:"3",WIMB:"0",YEAR:"1927",NATION:"Scotland"}, ctx:"Career — The Silver Scot dominates 1920s-30s", clues:["Won 3 majors (US Open, British Open, PGA Championship)","Was known as The Silver Scot for his white hair","Served in World War I and was wounded","Later became one of the most famous golf teachers ever"] },
  { player:"Jim Barnes", sport:"⛳ Golf", answer:"JIM BARNES", era:"legends", stats:{MAJORS:"4",YEAR:"1921",NATION:"England",PGA:"2"}, ctx:"Career — First PGA Championship winner", clues:["Won the first PGA Championship in 1916","Also won the US Open and British Open in his career","From Lelant, Cornwall, England","Was known as Long Jim for his tall, gangly build"] },
  { player:"Lawson Little", sport:"⛳ Golf", answer:"LAWSON LITTLE", era:"legends", stats:{AMATEUR:"4",YEAR:"1935",OPEN:"1",NATION:"USA"}, ctx:"Career — Double Amateur Grand Slam winner", clues:["Won both the US Amateur and British Amateur in consecutive years (1934-35)","Won 4 major amateur titles in 2 years","Later won the US Open as a professional in 1940","From Newport, Rhode Island"] },
  { player:"Frank Stranahan", sport:"⛳ Golf", answer:"STRANAHAN", era:"legends", stats:{AMATEUR:"2",YEAR:"1950",BRIT:"2",NATION:"USA"}, ctx:"Career — Amateur champion of the 1940s-50s", clues:["Won 2 British Amateur titles","Was one of the best amateur golfers of the postwar era","Was famous for his physical fitness — unusual for golfers at the time","From Toledo, Ohio — heir to the Champion Spark Plug fortune"] },
  { player:"Billy Casper", sport:"⛳ Golf", answer:"BILLY CASPER", era:"legends", stats:{MAJORS:"3",WINS:"51",YEAR:"1966",CHAMP:"1"}, ctx:"Career — One of golf's most underrated champions", clues:["Won 51 PGA Tour events including 3 majors","Won the US Open in 1959 and 1966","Came back from 7 shots behind Palmer to win the 1966 US Open","Was considered golf's most underrated Hall of Famer"] },
  { player:"Tony Lema", sport:"⛳ Golf", answer:"TONY LEMA", era:"legends", stats:{WINS:"12",MAJORS:"1",YEAR:"1964",BRITISH:"1"}, ctx:"1964 British Open — St Andrews first-timer win", clues:["Won the British Open at St Andrews in his first appearance","Nicknamed Champagne Tony for celebrating wins with champagne","Won 12 PGA Tour events before dying in a plane crash in 1966","From Oakland, California"] },
  { player:"Julius Boros", sport:"⛳ Golf", answer:"JULIUS BOROS", era:"legends", stats:{SCORE:"-1",AGE:"48",RECORD:"Oldest",MARGIN:"1"}, ctx:"1968 PGA Championship — oldest major winner", clues:["Won the 1968 PGA Championship at age 48 — oldest major winner ever","Won 3 major championships in his career","From Fairfield, Connecticut","Was known for his relaxed, unhurried swing"] },
  { player:"Cary Middlecoff", sport:"⛳ Golf", answer:"MIDDLECOFF", era:"legends", stats:{MAJORS:"3",WINS:"40",YEAR:"1955",DDS:"1"}, ctx:"1955 Masters — Dominant win", clues:["Won The Masters by 7 shots — a record at the time","Won 3 major championships in his career","Was a practicing dentist before turning pro","From Halls, Tennessee"] },
  { player:"Lloyd Mangrum", sport:"⛳ Golf", answer:"MANGRUM", era:"legends", stats:{MAJORS:"1",WINS:"36",YEAR:"1946",WAR:"1"}, ctx:"1946 US Open — Returning war hero wins", clues:["Won the 1946 US Open just months after returning from WWII","Won the Purple Heart for wounds suffered in combat","From Trenton, Texas","Was known as the gambler of the golf circuit"] },
  { player:"Ralph Guldahl", sport:"⛳ Golf", answer:"GULDAHL", era:"legends", stats:{MAJORS:"3",WINS:"16",YEAR:"1938",STREAK:"2"}, ctx:"1938 Season — Back-to-back US Opens", clues:["Won the US Open in 1937 and 1938","Also won The Masters in 1939","Had a career slump and came back — then mysteriously lost his game permanently","From Dallas, Texas"] },
  { player:"Horton Smith", sport:"⛳ Golf", answer:"HORTON SMITH", era:"legends", stats:{MAJORS:"2",MASTERS:"2",YEAR:"1936",FIRST:"1"}, ctx:"Career — First Masters champion", clues:["Won the first Masters Tournament in 1934","Also won The Masters in 1936","From Springfield, Missouri","Was the youngest player to win the PGA money title in 1929"] },
  { player:"Jackie Burke Jr.", sport:"⛳ Golf", answer:"JACKIE BURKE", era:"legends", stats:{MAJORS:"2",YEAR:"1956",MASTERS:"1",PGA:"1"}, ctx:"1956 Season — Masters and PGA Championship", clues:["Won both The Masters and PGA Championship in the same year","From Fort Worth, Texas","Won 16 PGA Tour events in his career","Was a Ryder Cup captain in 1957"] },
  { player:"Doug Ford", sport:"⛳ Golf", answer:"DOUG FORD", era:"legends", stats:{SCORE:"-3",BUNKER:"H18",PLAYOFF:"No",LEAD:"3"}, ctx:"1957 Masters — Famous bunker shot to win", clues:["Holed out from the bunker on 18 to win The Masters","Also won the PGA Championship in 1955","From New Haven, Connecticut","His hole-out at Augusta remains one of The Masters most dramatic moments"] },
  { player:"Art Wall Jr.", sport:"⛳ Golf", answer:"ART WALL", era:"legends", stats:{MAJORS:"1",HIO:"45",YEAR:"1959",MASTERS:"1"}, ctx:"1959 Masters — Ace maker wins", clues:["Won The Masters this year after making 4 holes-in-one during the season","Made a record 45 career holes-in-one","From Honesdale, Pennsylvania","Was named PGA Player of the Year in 1959"] },
  { player:"Bob Rosburg", sport:"⛳ Golf", answer:"ROSBURG", era:"legends", stats:{SCORE:"-2",MARGIN:"1",R4:"66",OPP:"Wall"}, ctx:"1959 PGA Championship — Minneapolis Golf Club", clues:["Won the 1959 PGA Championship","Had 4 PGA Tour wins in his career","Later became a famous television broadcaster for golf","From San Francisco, California"] },
  { player:"Gay Brewer", sport:"⛳ Golf", answer:"GAY BREWER", era:"legends", stats:{MAJORS:"1",WINS:"10",YEAR:"1967",MASTERS:"1"}, ctx:"1967 Masters — Augusta comeback champion", clues:["Won The Masters in 1967","Had famously missed a short putt the year before that cost him the title","From Midway, Kentucky","Won 10 PGA Tour events in his career"] },
  { player:"Sidney Crosby", sport:"🏒 NHL", answer:"SID THE KID", era:"modern", stats:{G:"36",AST:"72",PTS:"108",PIM:"34"}, ctx:"2017 Stanley Cup Finals MVP — Pittsburgh Penguins", clues:["Won second consecutive Stanley Cup MVP","Played for Pittsburgh Penguins","From Cole Harbour, Nova Scotia","Nicknamed Sid the Kid"] },
  { player:"Alexander Ovechkin", sport:"🏒 NHL", answer:"OVI", era:"modern", stats:{G:"65",AST:"47",PTS:"112",PIM:"50"}, ctx:"2007-08 NHL Season — Hart Trophy MVP", clues:["Played for the Washington Capitals his entire career","Scored 65 goals — one of the highest totals ever","Plays for Washington Capitals","From Moscow, Russia"] },
  { player:"Henrik Lundqvist", sport:"🏒 NHL", answer:"LUNDQVIST", era:"modern", stats:{GAA:"1.97","SV%":".936",W:"43",SO:"8"}, ctx:"2011-12 NHL Season — New York Rangers Vezina winner", clues:["His career save percentage was .920 over his career","Played for New York Rangers","Swedish goaltender nicknamed The King","Led the Rangers to the Stanley Cup Final in 2014"] },
  { player:"Martin Brodeur", sport:"🏒 NHL", answer:"BRODEUR", era:"modern", stats:{GAA:"2.02","SV%":".917",W:"38",SO:"9"}, ctx:"2006-07 NHL Season — New Jersey Devils Vezina winner", clues:["Holds the all-time records for wins, shutouts, and games played by a goalie","Played for New Jersey Devils","All-time NHL leader in wins, shutouts, and games played","Won 3 Stanley Cups with the Devils"] },
  { player:"Evgeni Malkin", sport:"🏒 NHL", answer:"MALKIN", era:"modern", stats:{G:"11",AST:"24",PTS:"36",GP:"24"}, ctx:"2009 Stanley Cup Finals MVP — Pittsburgh Penguins", clues:["Won the Conn Smythe Trophy as playoff MVP","Played for Pittsburgh Penguins alongside Crosby","From Magnitogorsk, Russia","Won 3 Stanley Cups with the Penguins"] },
  { player:"Erik Karlsson", sport:"🏒 NHL", answer:"ERIK KARLSSON", era:"modern", stats:{G:"25",AST:"75",PTS:"100",PIM:"-1"}, ctx:"2022-23 NHL Season — San Jose Sharks", clues:["Became the first defenseman to score 100 points since Brian Leetch","Played for San Jose Sharks","Swedish defenseman nickname EK65","Won 2 Norris Trophies as best defenseman"] },
  { player:"Victor Hedman", sport:"🏒 NHL", answer:"HEDMAN", era:"modern", stats:{G:"3",AST:"7",PTS:"10",YEAR:"2021"}, ctx:"2021 Stanley Cup Finals MVP — Tampa Bay Lightning", clues:["Won the Conn Smythe Trophy as playoff MVP","Played for Tampa Bay Lightning","Swedish defenseman won 2 consecutive Stanley Cups","From Ornskoldsvik, Sweden"] },
  { player:"Carey Price", sport:"🏒 NHL", answer:"PRICE", era:"modern", stats:{GAA:"1.96","SV%":".933",W:"44",SO:"9"}, ctx:"2014-15 NHL Season — Montreal Canadiens MVP", clues:["Won the Hart, Vezina, and Ted Lindsay Award this season","Played for Montreal Canadiens","From Anahim Lake, British Columbia — of First Nations descent","Considered one of the best goaltenders of his era"] },
  { player:"Jarome Iginla", sport:"🏒 NHL", answer:"IGINLA", era:"modern", stats:{G:"52",AST:"44",PTS:"96",PIM:"62"}, ctx:"2001-02 NHL Season — Calgary Flames Art Ross Trophy", clues:["Led the Flames to a 52-win season","Played for Calgary Flames his entire prime years","Won 2 Olympic gold medals with Canada","One of the greatest Flames players ever"] },
  { player:"Joe Thornton", sport:"🏒 NHL", answer:"THORNTON", era:"modern", stats:{G:"29",AST:"96",PTS:"125",PIM:"61"}, ctx:"2005-06 NHL Season — San Jose Sharks MVP", clues:["Won the Hart Trophy and Art Ross Trophy after being traded mid-season","Set the San Jose Sharks franchise records","Nicknamed Jumbo Joe for his size","From St. Thomas, Ontario"] },
  { player:"Mats Sundin", sport:"🏒 NHL", answer:"SUNDIN", era:"modern", stats:{G:"41",AST:"47",PTS:"88",PIM:"68"}, ctx:"2001-02 NHL Season — Toronto Maple Leafs captain", clues:["Was the captain and face of the Toronto Maple Leafs for many years","From Bromma, Sweden","Was the first European player selected first overall in the NHL Draft (1989)","Won 2 Olympic gold medals with Sweden"] },
  { player:"Dany Heatley", sport:"🏒 NHL", answer:"HEATLEY", era:"modern", stats:{G:"50",AST:"53",PTS:"103",PIM:"74"}, ctx:"2005-06 NHL Season — Ottawa Senators All-Star", clues:["Scored 50 goals and 103 points this season","Played for the Ottawa Senators","Won Olympic gold with Canada in 2002 and 2010","From Freiburg, Germany — raised in Calgary"] },
  { player:"Wayne Gretzky", sport:"🏒 NHL", answer:"THE GREAT ONE", era:"classic", stats:{G:"92",AST:"120",PTS:"212",PIM:"26"}, ctx:"1981-82 NHL Season — Edmonton Oilers record season", clues:["All-time single-season goals record (92)","212 points is the all-time record","Played for Edmonton Oilers","Known as The Great One"] },
  { player:"Mario Lemieux", sport:"🏒 NHL", answer:"SUPER MARIO", era:"classic", stats:{G:"69",AST:"114",PTS:"183",PIM:"54"}, ctx:"1988-89 NHL Season — Pittsburgh Penguins", clues:["Scored 183 points this season","Played for Pittsburgh Penguins","Nicknamed Super Mario","Battled cancer mid-career but returned"] },
  { player:"Brett Hull", sport:"🏒 NHL", answer:"BRETT HULL", era:"classic", stats:{G:"86",AST:"45",PTS:"131",PIM:"24"}, ctx:"1990-91 NHL Season — St. Louis Blues", clues:["Scored 86 goals — 3rd most in NHL history","Played for St. Louis Blues","Son of Bobby Hull — also a Hall of Famer","Nicknamed The Golden Brett"] },
  { player:"Paul Coffey", sport:"🏒 NHL", answer:"PAUL COFFEY", era:"classic", stats:{G:"48",AST:"90",PTS:"138",PM:"+12"}, ctx:"1985-86 NHL Season — Edmonton Oilers defenseman record", clues:["Set the record for goals by a defenseman (48)","Played for Edmonton Oilers alongside Gretzky","Won 4 Stanley Cups in his career","Considered the greatest offensive defenseman after Bobby Orr"] },
  { player:"Ray Bourque", sport:"🏒 NHL", answer:"RAY BOURQUE", era:"classic", stats:{G:"21",AST:"73",PTS:"94",PM:"+19"}, ctx:"1993-94 NHL Season — Boston Bruins", clues:["Won his 5th Norris Trophy as best defenseman","Played for Boston Bruins his entire career before Colorado","Finally won the Stanley Cup in his last season","Won 5 Norris Trophies total"] },
  { player:"Patrick Roy", sport:"🏒 NHL", answer:"PATRICK ROY", era:"classic", stats:{GAA:"1.70","SV%":".934",W:"16",SO:"3"}, ctx:"1993 Stanley Cup Finals MVP — Montreal Canadiens", clues:["Won Conn Smythe Trophy as playoff MVP","Montreal Canadiens won the Stanley Cup","Won 4 Stanley Cups and 3 Conn Smythe Trophies","His last name is pronounced Wah not Roy"] },
  { player:"Teemu Selanne", sport:"🏒 NHL", answer:"TEEMU SELANNE", era:"classic", stats:{G:"76",AST:"56",PTS:"132",PIM:"45"}, ctx:"1992-93 NHL Season — Winnipeg Jets rookie record", clues:["Set the rookie scoring record with 76 goals","Shattered the previous rookie record by 23 goals","Played for the Winnipeg Jets","Finnish Winger nicknamed The Finnish Flash"] },
  { player:"Guy Lafleur", sport:"🏒 NHL", answer:"GUY LAFLEUR", era:"classic", stats:{G:"60",AST:"72",PTS:"132",PIM:"26"}, ctx:"1977-78 NHL Season — Montreal Canadiens MVP", clues:["Won the Hart Trophy as league MVP","Won his 4th consecutive Stanley Cup this year","Played for Montreal Canadiens","Nicknamed The Flower"] },
  { player:"Peter Bondra", sport:"🏒 NHL", answer:"PETER BONDRA", era:"classic", stats:{G:"52",AST:"28",PTS:"80",PIM:"40"}, ctx:"1997-98 NHL Season — Washington Capitals", clues:["Led the NHL in goals with 52","Played for Washington Capitals","Slovak player from Lutsk, Ukraine","One of the fastest skaters of his era"] },
  { player:"Denis Savard", sport:"🏒 NHL", answer:"DENIS SAVARD", era:"classic", stats:{G:"44",AST:"87",PTS:"131",PIM:"82"}, ctx:"1987-88 NHL Season — Chicago Blackhawks", clues:["Scored 131 points this season","Played for Chicago Blackhawks","From Pointe-Gatineau, Quebec","Famous for his spin-o-rama move"] },
  { player:"Luc Robitaille", sport:"🏒 NHL", answer:"ROBITAILLE", era:"classic", stats:{G:"63",AST:"62",PTS:"125",PIM:"80"}, ctx:"1992-93 NHL Season — Los Angeles Kings", clues:["Scored 63 goals this season — a record for left wings","Played for Los Angeles Kings alongside Wayne Gretzky","Nicknamed Lucky Luc","All-time leading scorer among left wings"] },
  { player:"Bryan Trottier", sport:"🏒 NHL", answer:"TROTTIER", era:"classic", stats:{G:"47",AST:"77",PTS:"134",PIM:"68"}, ctx:"1978-79 NHL Season — New York Islanders MVP", clues:["Won the Hart Trophy as league MVP","Played for New York Islanders","Won 4 consecutive Stanley Cups with the Islanders","Was inducted into the Hall of Fame in 1997"] },
  { player:"Al MacInnis", sport:"🏒 NHL", answer:"MACINNIS", era:"classic", stats:{G:"28",AST:"75",PTS:"103",PIM:"93"}, ctx:"1993-94 NHL Season — Calgary Flames", clues:["Was known for having one of the hardest shots in NHL history","Played for Calgary Flames and St. Louis Blues","Won the Conn Smythe Trophy in 1989","From Inverness, Nova Scotia"] },
  { player:"Dale Hawerchuk", sport:"🏒 NHL", answer:"HAWERCHUK", era:"classic", stats:{G:"53",AST:"77",PTS:"130",PIM:"44"}, ctx:"1984-85 NHL Season — Winnipeg Jets", clues:["Scored 130 points this season at age 21","Played for the Winnipeg Jets","Won the Calder Trophy as rookie of the year in 1982","Was the 1st overall pick in the 1981 NHL Draft"] },
  { player:"Steve Yzerman", sport:"🏒 NHL", answer:"CAPTAIN YZERMAN", era:"classic", stats:{G:"51",AST:"57",PTS:"108",PIM:"54"}, ctx:"1989-90 NHL Season — Detroit Red Wings captain", clues:["Led the Red Wings with 51 goals and 108 points","Was named captain at age 21 — the youngest in Wings history","Won 3 Stanley Cups as captain in the late 1990s","Led the team through a major rebuilding period"] },
  { player:"Bobby Orr", sport:"🏒 NHL", answer:"BOBBY ORR", era:"classic", stats:{G:"46",AST:"102",PTS:"148",PM:"+124"}, ctx:"1970-71 NHL Season — Boston Bruins", clues:["Defenseman who led the entire league in scoring","Played for Boston Bruins","Revolutionized the defenseman position","Won 8 consecutive Norris Trophies as best defenseman"] },
  { player:"Gordie Howe", sport:"🏒 NHL", answer:"MR HOCKEY", era:"legends", stats:{G:"49",AST:"46",PTS:"95",PIM:"72"}, ctx:"1952-53 NHL Season — Detroit Red Wings", clues:["Known as Mr. Hockey","Played for Detroit Red Wings","Played in 5 different decades","A Gordie Howe Hat Trick is a goal, assist, and fight"] },
  { player:"Phil Esposito", sport:"🏒 NHL", answer:"PHIL ESPOSITO", era:"classic", stats:{G:"76",AST:"76",PTS:"152",PIM:"71"}, ctx:"1970-71 NHL Season — Boston Bruins", clues:["Scored 76 goals — shattering the previous record","Played for Boston Bruins alongside Bobby Orr","His record stood until Gretzky broke it","Italian-Canadian player who transformed the center position"] },
  { player:"Bobby Hull", sport:"🏒 NHL", answer:"BOBBY HULL", era:"legends", stats:{G:"54",AST:"43",PTS:"97",PIM:"70"}, ctx:"1965-66 NHL Season — Chicago Blackhawks", clues:["Scored 54 goals — the first player to score 50 twice","Played for Chicago Blackhawks","Known as The Golden Jet for his speed and blonde hair","Was the first player to score 50 goals in a season twice"] },
  { player:"Jean Beliveau", sport:"🏒 NHL", answer:"JEAN BELIVEAU", era:"legends", stats:{G:"37",AST:"69",PTS:"106",PIM:"38"}, ctx:"1964-65 NHL Season — Montreal Canadiens MVP", clues:["Won the Hart Trophy as league MVP","Won 10 Stanley Cups as a player","Played for Montreal Canadiens","Was offered the position of Governor General of Canada — he declined"] },
  { player:"Maurice Richard", sport:"🏒 NHL", answer:"THE ROCKET", era:"legends", stats:{G:"50",AST:"25",PTS:"75",PIM:"75"}, ctx:"1944-45 NHL Season — Montreal Canadiens", clues:["First player to score 50 goals in 50 games — a record for 36 years","Played for Montreal Canadiens","Nicknamed The Rocket","The Richard Riot in 1955 showed his extraordinary popularity in Montreal"] },
  { player:"Terry Sawchuk", sport:"🏒 NHL", answer:"SAWCHUK", era:"legends", stats:{GAA:"1.90",SO:"12",W:"44",YEAR:"1952"}, ctx:"1951-52 NHL Season — Detroit Red Wings Vezina winner", clues:["Played for 5 different NHL teams in his career","All-time NHL leader in shutouts (103)","Played for Detroit Red Wings among others","Won 4 Stanley Cups in his career"] },
  { player:"Glenn Hall", sport:"🏒 NHL", answer:"GLENN HALL", era:"legends", stats:{GAA:"2.10","SV%":".918",SO:"7",STREAK:"502"}, ctx:"Career — Played 502 consecutive complete games", clues:["Played 502 consecutive complete games — an iron man record that will never be broken","Won 3 Vezina Trophies as best goaltender","Nicknamed Mr. Goalie","Was so nervous before games he would vomit every single pre-game"] },
  { player:"Jacques Plante", sport:"🏒 NHL", answer:"PLANTE", era:"legends", stats:{GAA:"2.11",SO:"82",VEZINA:"7",MASK:"1"}, ctx:"Career — Inventor of the goalie mask", clues:["Was the first goaltender to regularly wear a mask after being cut by a shot in 1959","Won 7 Vezina Trophies as best goaltender","Won 6 Stanley Cups with Montreal Canadiens","Revolutionized goaltending by being the first to roam from the crease"] },
  { player:"Stan Mikita", sport:"🏒 NHL", answer:"STAN MIKITA", era:"legends", stats:{G:"35",AST:"62",PTS:"97",PIM:"58"}, ctx:"1967-68 NHL Season — Chicago Blackhawks MVP", clues:["Won the Hart Trophy as league MVP","Won 4 awards this season — Hart, Art Ross, Lady Byng, and Conn Smythe as team MVP","Played for Chicago Blackhawks","Born in Sokolce, Slovakia — raised in St. Catharines, Ontario"] },
  { player:"Frank Mahovlich", sport:"🏒 NHL", answer:"MAHOVLICH", era:"legends", stats:{G:"48",AST:"32",PTS:"80",PIM:"131"}, ctx:"1960-61 NHL Season — Toronto Maple Leafs", clues:["Scored 48 goals this season — a Maple Leafs record at the time","Played for Toronto Maple Leafs and Montreal Canadiens","Nicknamed The Big M","Won 6 Stanley Cups in his career"] },
  { player:"Milt Schmidt", sport:"🏒 NHL", answer:"MILT SCHMIDT", era:"legends", stats:{G:"27",AST:"35",PTS:"62",YEAR:"1952"}, ctx:"Career — Boston Bruins center and team leader", clues:["Was the captain of the Boston Bruins for many years","Won 2 Stanley Cups with the Bruins","Was part of the famous Kraut Line","Later coached the Bruins and managed the team"] },
  { player:"Tim Horton", sport:"🏒 NHL", answer:"TIM HORTON", era:"legends", stats:{G:"18",AST:"38",PTS:"56",YEAR:"1964"}, ctx:"Career — Toronto Maple Leafs defenseman", clues:["Was considered one of the strongest players in NHL history","Won 4 Stanley Cups with the Toronto Maple Leafs","Died in a car accident in 1974 while still playing","The Tim Hortons coffee chain is named after him"] },
  { player:"Red Kelly", sport:"🏒 NHL", answer:"RED KELLY", era:"legends", stats:{G:"20",AST:"50",PTS:"70",YEAR:"1960"}, ctx:"Career — Two-position champion", clues:["Won 4 Stanley Cups with Detroit and 4 more with Toronto — 8 total","Won the Norris Trophy as best defenseman in 1954","Later transitioned to play center — rare for a defenseman","Also served as a Member of Parliament while playing hockey"] },
  { player:"Bernie Geoffrion", sport:"🏒 NHL", answer:"BOOM BOOM", era:"legends", stats:{G:"50",AST:"45",PTS:"95",YEAR:"1961"}, ctx:"1960-61 NHL Season — Montreal Canadiens", clues:["Was the second player to score 50 goals in a season","Nicknamed Boom Boom for the sound of his slapshot","Won 6 Stanley Cups with Montreal Canadiens","Is credited with popularizing the slapshot"] },
  { player:"Toe Blake", sport:"🏒 NHL", answer:"TOE BLAKE", era:"legends", stats:{G:"26",AST:"43",PTS:"69",YEAR:"1945"}, ctx:"1944-45 NHL Season — Montreal Canadiens Hart MVP", clues:["Won the Hart Trophy as league MVP","Won the NHL scoring title this year","Won 3 Stanley Cups as a player","Won 8 Stanley Cups as coach of the Montreal Canadiens"] },
  { player:"Elmer Lach", sport:"🏒 NHL", answer:"ELMER LACH", era:"legends", stats:{G:"26",AST:"54",PTS:"80",YEAR:"1945"}, ctx:"1944-45 NHL Season — Montreal Canadiens — Punch Line", clues:["Was the center of the famous Punch Line with Rocket Richard and Toe Blake","Won the Hart Trophy as league MVP this season","Won 3 Stanley Cups with Montreal","Was known as a superb passer who set up Richard"] },
  { player:"Syl Apps", sport:"🏒 NHL", answer:"SYL APPS", era:"legends", stats:{G:"29",AST:"30",PTS:"59",YEAR:"1942"}, ctx:"Career — Toronto Maple Leafs captain", clues:["Was the captain of the Toronto Maple Leafs","Won 3 Stanley Cups with Toronto","Was also a pole vaulter who competed in the 1936 Olympics","Won the Lady Byng Trophy for clean play multiple times"] },
  { player:"Clint Benedikt", sport:"🏒 NHL", answer:"BENEDICT", era:"legends", stats:{GAA:"1.50",SO:"15",YEAR:"1926",TEAM:"Maroons"}, ctx:"1925-26 NHL Season — Montreal Maroons Vezina winner", clues:["Won the Stanley Cup with Montreal Maroons this year","Was the first goaltender to wear a mask in an NHL game (1930)","Won 4 Stanley Cups in his career","Was known for flopping to the ice — causing rule changes"] },
  { player:"Cy Denneny", sport:"🏒 NHL", answer:"DENNENY", era:"legends", stats:{G:"318",YEAR:"1929",TEAM:"Senators",CUPS:"4"}, ctx:"Career — Ottawa Senators early NHL legend", clues:["Was the NHL's all-time leading scorer when he retired","Won 4 Stanley Cups with the Ottawa Senators","Was one of the top goal scorers of the early NHL era","Played in the NHL's first season in 1917-18"] },
  { player:"Duke Keats", sport:"🏒 NHL", answer:"DUKE KEATS", era:"legends", stats:{G:"31",AST:"22",PTS:"53",YEAR:"1922"}, ctx:"1921-22 WCHL Season — Edmonton Eskimos", clues:["Was the best player in the Western Canada Hockey League","Was called the best hockey player of the 1920s by many experts","Was known for his great stickhandling and scoring ability","Played for multiple western hockey teams before briefly reaching the NHL"] },
  { player:"Charlie Conacher", sport:"🏒 NHL", answer:"CHARLIE CONACHER", era:"legends", stats:{G:"52",PTS:"73",YEAR:"1932",TEAM:"Toronto"}, ctx:"1931-32 NHL Season — Toronto Maple Leafs", clues:["Led the NHL in goals 5 times in his career","Was part of the famous Kid Line with Harvey Jackson and Joe Primeau","Played for the Toronto Maple Leafs","Was one of the hardest shooters of his era"] },
  { player:"Dit Clapper", sport:"🏒 NHL", answer:"DIT CLAPPER", era:"legends", stats:{G:"228",YEAR:"1947",TEAM:"Bruins",CUPS:"3"}, ctx:"Career — Boston Bruins 20-year legend", clues:["Played 20 seasons for the Boston Bruins — a record at the time","Won 3 Stanley Cups with the Bruins","Was the first player to play 20 NHL seasons with one team","Played both forward and defense during his career"] },
  { player:"Hooley Smith", sport:"🏒 NHL", answer:"HOOLEY SMITH", era:"legends", stats:{G:"200",YEAR:"1934",TEAM:"Maroons",CUP:"1"}, ctx:"Career — Rough and rugged Montreal Maroons champion", clues:["Won the Stanley Cup with the Montreal Maroons in 1926","Was known as one of the toughest players of his era","Played for Montreal Maroons and Ottawa Senators","Was inducted into the Hockey Hall of Fame in 1972"] },
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
  { player:"Lawrence Taylor", sport:"🏈 NFL", answer:"LT DRAFT", era:"classic", stats:{PICK:"2",YEAR:"1981",TEAM:"New York Giants",SCHOOL:"North Carolina"}, ctx:"1981 NFL Draft — #2 Overall Pick", clues:["Won NFL MVP in 1986 — one of only 2 defensive players ever to win the award","Played at the University of North Carolina","Changed the linebacker position forever","Won NFL MVP in 1986 — one of only 2 defensive players to do so"] },
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
  { player:"Cal Ripken Jr.", sport:"⚾ MLB", answer:"RIPKEN STREAK", era:"classic", stats:{STREAK:"2131",DATE:"Sept 6 1995",PREV:"2130",TEAM:"Baltimore"}, ctx:"Sept 6 1995 — Breaking Lou Gehrig's consecutive games record", clues:["Broke Lou Gehrig's 56-year-old consecutive games record","Played for the Baltimore Orioles","The crowd gave him a 22-minute standing ovation","His streak eventually reached 2632 games"] },
  { player:"Roger Maris", sport:"⚾ MLB", answer:"MARIS HR", era:"legends", stats:{HR:"61",AVG:".269",RBI:"142",YEAR:"1961"}, ctx:"1961 MLB Season — Breaking Babe Ruth's home run record", clues:["Broke Babe Ruth's 34-year-old home run record on the last day of the season","Played for the New York Yankees","His record stood for 37 years until 1998","Was not celebrated at the time — many wanted Ruth's record to stand"] },
  { player:"Hank Aaron", sport:"⚾ MLB", answer:"AARON 715", era:"classic", stats:{HR:"715",DATE:"April 8 1974",TEAM:"Atlanta",PITCH:"Al Downing"}, ctx:"April 8 1974 — Breaking Babe Ruth's all-time home run record", clues:["Hit home run #715 to break Babe Ruth's all-time record","Played for the Atlanta Braves","Had received death threats leading up to the record","Hit the record-breaking homer off Al Downing of the Dodgers"] },
  { player:"Wayne Gretzky", sport:"🏒 NHL", answer:"GRETZKY GORDIE", era:"classic", stats:{GOAL:"802",DATE:"March 23 1994",PREV:"801",TEAM:"Los Angeles"}, ctx:"March 23 1994 — Breaking Gordie Howe's all-time goals record", clues:["Broke Gordie Howe's all-time NHL goals record","Played for the Los Angeles Kings when he set the record","Had already broken virtually every other NHL record","Eventually retired with 894 career goals — 93 more than Howe"] },
  { player:"Rickey Henderson", sport:"⚾ MLB", answer:"RICKEY STOLEN", era:"classic", stats:{SB:"939",DATE:"May 1 1991",PREV:"938",TEAM:"Oakland"}, ctx:"May 1 1991 — Breaking Lou Brock's all-time stolen base record", clues:["Broke Lou Brock's all-time stolen base record","Played for the Oakland Athletics","Famously held the base above his head and said he was the greatest of all time","Eventually retired with 1406 stolen bases"] },
  { player:"Wilt Chamberlain", sport:"🏀 NBA", answer:"WILT 100", era:"legends", stats:{PTS:"100",FG:"36",FT:"28",DATE:"March 2 1962"}, ctx:"March 2 1962 — 100-point game vs New York Knicks", clues:["Scored 100 points in a single NBA game — an untouchable record","Playing for the Philadelphia Warriors","No TV cameras recorded the game — only one photo exists","Made 28 of 32 free throws — extraordinary for him"] },
  { player:"Michael Phelps", sport:"🏊 Olympics", answer:"PHELPS", era:"modern", stats:{GOLD:"8",EVENTS:"8",WORLD:"7",YEAR:"2008"}, ctx:"2008 Beijing Olympics — Greatest Olympic performance ever", clues:["Won 8 gold medals in a single Olympics — an all-time record","Set 7 world records during the Games","Swam in Beijing, China","His 8 golds broke Mark Spitz's 36-year-old record of 7"] },
  { player:"Usain Bolt", sport:"🏃 Olympics", answer:"BOLT", era:"modern", stats:{TIME:"9.58",EVENT:"100m",YEAR:"2009",WIND:"+0.9"}, ctx:"2009 World Championships — 100m world record", clues:["Set the world record for the 100m sprint at 9.58 seconds","Won at the World Championships in Berlin","From Trelawny Parish, Jamaica","Also holds the 200m world record at 19.19 seconds"] },
  { player:"Jesse Owens", sport:"🏃 Olympics", answer:"OWENS", era:"legends", stats:{GOLD:"4",EVENTS:"4",YEAR:"1936",CITY:"Berlin"}, ctx:"1936 Berlin Olympics — Four gold medals", clues:["Won 4 gold medals at the Berlin Olympics under Hitler's watch","Won the 100m, 200m, long jump, and 4x100m relay","From Oakville, Alabama","His performance was a direct rebuke to Nazi racial ideology"] },
  { player:"Simone Biles", sport:"🤸 Olympics", answer:"BILES", era:"modern", stats:{GOLD:"4",MEDALS:"4",YEAR:"2016",COUNTRY:"USA"}, ctx:"2016 Rio Olympics — Four gold medals in gymnastics", clues:["Won 4 gold medals at the 2016 Rio Olympics","Is widely considered the greatest gymnast ever","From Spring, Texas","Has skills named after her in the gymnastics code of points"] },
  { player:"Carl Lewis", sport:"🏃 Olympics", answer:"CARL LEWIS", era:"classic", stats:{GOLD:"4",EVENTS:"4",YEAR:"1984",CITY:"Los Angeles"}, ctx:"1984 Los Angeles Olympics — Four gold medals", clues:["Won 4 gold medals at the 1984 Los Angeles Olympics","Won the 100m, 200m, long jump, and 4x100m relay","From Birmingham, Alabama","Was compared to Jesse Owens for his historic performance"] },
  { player:"Kobe Bryant", sport:"🏀 NBA", answer:"KOBE 81", era:"modern", stats:{PTS:"81",FG:"28",FT:"18",MIN:"42"}, ctx:"Jan 22 2006 — 81-point game vs Toronto Raptors", clues:["Scored 81 points — 2nd highest single-game total in NBA history","Playing for the LA Lakers vs Toronto Raptors","Scored 55 points in the second half alone","Only Wilt Chamberlain's 100-point game ranks higher"] },
  { player:"Nate Archibald", sport:"🏀 NBA", answer:"NATE ARCHIBALD", era:"classic", stats:{PTS:"34.0",AST:"11.4",YEAR:"1973",FEAT:"Only player to lead in both"}, ctx:"1972-73 NBA Season — Only player to lead NBA in scoring AND assists", clues:["The only player in NBA history to lead the league in both scoring and assists in the same season","Played for the Kansas City-Omaha Kings","Nicknamed Tiny because he was only 6 feet tall","Later won an NBA championship with the Boston Celtics"] },
  { player:"Patrick Mahomes", sport:"🏈 NFL", answer:"MAHOMES SB55", era:"modern", stats:{YDS:"270",TD:"3",INT:"2",COMP:"50.0"}, ctx:"Super Bowl LV — Tampa Bay Buccaneers vs Kansas City Chiefs", clues:["His team lost this Super Bowl despite being heavy favorites","Was sacked 3 times and pressured all game","Lost to the Tampa Bay Buccaneers and Tom Brady","Brady's 7th Super Bowl ring — Mahomes' first loss in the big game"] },
  { player:"Joe Montana", sport:"🏈 NFL", answer:"MONTANA DRIVE", era:"classic", stats:{YDS:"92",PLAYS:"11",TIME:"3:10",TD:"1"}, ctx:"Super Bowl XXIII — The Drive to win the championship", clues:["Led a 92-yard drive in the final 3 minutes to win the Super Bowl","The final play was a pass to John Taylor with 34 seconds left","Played for the San Francisco 49ers","Famously noticed John Candy in the stands to calm his team before the drive"] },
  { player:"David Tyree", sport:"🏈 NFL", answer:"TYREE HELMET", era:"modern", stats:{REC:"1",YDS:"32",HELMET:"1",GAME:"SB XLII"}, ctx:"Super Bowl XLII — The Helmet Catch", clues:["Made the most improbable catch in Super Bowl history — pinning the ball against his helmet","Played for the New York Giants","The catch set up the winning touchdown to upset the undefeated Patriots","Only had 4 career NFL receptions — this was his most famous"] },
  { player:"Byron Nelson", sport:"⛳ Golf", answer:"NELSON STREAK", era:"legends", stats:{STREAK:"11",WINS:"18",YEAR:"1945",EVENTS:"30"}, ctx:"1945 PGA Tour — 11 consecutive tournament wins", clues:["Won 11 consecutive PGA Tour events — an all-time record","Won 18 tournaments total this year — also an all-time record","The streak has lasted over 75 years","Played during WWII era when some top players were serving"] },
  { player:"Joe DiMaggio", sport:"⚾ MLB", answer:"DIMAGGIO STREAK", era:"legends", stats:{STREAK:"56",HITS:"91",AVG:".408",YEAR:"1941"}, ctx:"1941 MLB Season — 56-game hitting streak", clues:["Hit safely in 56 consecutive games — the all-time MLB record","Played for the New York Yankees","The streak lasted from May 15 to July 17, 1941","He hit .408 with 91 hits during the streak"] },
  { player:"Gale Sayers", sport:"🏈 NFL", answer:"SAYERS 6TD", era:"legends", stats:{TD:"6",YDS:"336",DATE:"Dec 12 1965",OPP:"San Francisco"}, ctx:"Dec 12 1965 — 6 touchdowns in one game", clues:["Scored 6 touchdowns in a single NFL game","Played for the Chicago Bears","Tied the single-game TD record","His performance came on a muddy field vs the San Francisco 49ers"] },
  { player:"Wilt Chamberlain", sport:"🏀 NBA", answer:"WILT STREAK", era:"legends", stats:{STREAK:"47",FG_CONSEC:"35",YEAR:"1967",TEAM:"Philadelphia"}, ctx:"1966-67 NBA Season — 47 consecutive field goals made", clues:["Made 35 consecutive field goals in one stretch — an NBA record","Played for the Philadelphia 76ers","His team went 68-13 that year — then an NBA record","The FG record has never been broken"] },
  { player:"Ben Hogan", sport:"⛳ Golf", answer:"HOGAN COMEBACK", era:"legends", stats:{WINS:"5",MAJORS:"3",YEAR:"1953",ACCIDENT:"1949"}, ctx:"1953 PGA Tour — Comeback from near-fatal car accident", clues:["Won 5 tournaments including 3 majors just 4 years after a nearly fatal car accident","Was told he might never walk again after a bus hit his car in 1949","Won the US Open, Masters, and British Open in one year","The British Open win completed his career Grand Slam"] },
  { player:"Tiger Woods", sport:"⛳ Golf", answer:"TIGER MASTERS 2019", era:"modern", stats:{SCORE:"-13",MAJORS:"15",YEAR:"2019",LAST:"2008"}, ctx:"2019 Masters — Comeback major win after 11 years", clues:["Won his 15th major after an 11-year major drought","Had multiple back surgeries and personal scandals in between","Won The Masters at Augusta","The comeback was called one of the greatest in sports history"] },
  { player:"Lance Armstrong", sport:"🚴 Olympics", answer:"ARMSTRONG TDF", era:"classic", stats:{WINS:"7",YEARS:"1999-2005",CANCER:"1996",STRIPPED:"Yes"}, ctx:"1999-2005 Tour de France — Seven consecutive wins (later stripped)", clues:["Won the Tour de France 7 consecutive times","Had survived testicular cancer that spread to his brain and lungs in 1996","Was later stripped of all 7 titles for doping","His story was considered one of sport's greatest comebacks before the scandal"] },
  { player:"Roger Federer", sport:"🎾 Tennis", answer:"FEDERER EPIC", era:"modern", stats:{SET1:"4-6",SET2:"6-4",SET3:"6-7",SET4_5:"7-6 / 9-7"}, ctx:"2008 Wimbledon Final — vs Rafael Nadal", clues:["Lost to Rafael Nadal in what is called the greatest tennis match ever played","The 5th set was 9-7 as darkness nearly stopped play","Federer had won Wimbledon the 5 previous years","Sports Illustrated called it the greatest match in the history of any sport"] },
  { player:"Larry Bird", sport:"🏀 NBA", answer:"BIRD 3PT CONTEST", era:"classic", stats:{MADE:"9",CONTEST:"1986",TROPHY:"1st",SAID:"Which one of you is finishing second?"}, ctx:"1986 NBA Three-Point Contest — All-Star Weekend", clues:["Won the first NBA Three-Point Contest","Walked into the locker room before the event and asked 'which one of you is finishing second?'","Played for the Boston Celtics","Won the Three-Point Contest 3 consecutive times (1986-1988)"] },
  { player:"Michael Jordan", sport:"🏀 NBA", answer:"JORDAN FLU", era:"classic", stats:{PTS:"38",FG:"13",REB:"7",AST:"5"}, ctx:"1997 NBA Finals Game 5 — The Flu Game", clues:["Scored 38 points while visibly ill and dehydrated","Played for the Chicago Bulls vs Utah Jazz","Was so sick teammates had to hold him up after the game","Hit the go-ahead three-pointer late in the 4th quarter to seal the win"] },
  { player:"Kirk Gibson", sport:"⚾ MLB", answer:"GIBSON HR", era:"classic", stats:{PH:"1",HR:"1",COUNT:"3-2",OUT:"2"}, ctx:"1988 World Series Game 1 — Pinch hit walk-off home run", clues:["Hit a pinch-hit walk-off home run on two injured legs","Could barely walk to the plate","Pumped his fist around the bases in one of sports most iconic moments","Played for the Los Angeles Dodgers — never batted again in the Series"] },
  { player:"Willis Reed", sport:"🏀 NBA", answer:"REED GAME7", era:"classic", stats:{PTS:"4",REB:"3",MIN:"27",GAME:"G7"}, ctx:"1970 NBA Finals Game 7 — Limping onto the court", clues:["Limped onto the court with a torn thigh muscle to play in Game 7","His mere presence inspired the Knicks to win the championship","Only scored 4 points but his presence changed the game","The moment is considered one of the most emotional in NBA history"] },
  { player:"Peyton Manning", sport:"🏈 NFL", answer:"MANNING RECORD TDS", era:"modern", stats:{TD:"55",YDS:"5477",INT:"10",YEAR:"2013"}, ctx:"2013 NFL Season — Broke Tom Brady's single season TD record", clues:["Broke Tom Brady's single-season TD record of 50","The record stood for 11 years until Mahomes tied it","Played for the Denver Broncos","Won the NFL MVP award for the 5th time"] },
  { player:"Stephen Curry", sport:"🏀 NBA", answer:"CURRY 3S", era:"modern", stats:{"3PM":"402","3PA":"887","3PCT":"45.4",YEAR:"2015"}, ctx:"2015-16 NBA Season — Unanimous MVP and 3-point record", clues:["Made 402 three-pointers — shattering his own record of 286","Won the unanimous MVP award — first in NBA history","Played for the Golden State Warriors","His team went 73-9 — the best record in NBA history at the time"] },
  { player:"LeBron James", sport:"🏀 NBA", answer:"LEBRON SCORING", era:"modern", stats:{PTS:"38390",DATE:"Feb 7 2023",PREV:"38387",AGE:"38"}, ctx:"Feb 7 2023 — Breaking Kareem Abdul-Jabbar's all-time scoring record", clues:["Broke Kareem Abdul-Jabbar's 39-year-old all-time scoring record","Was 38 years old when he set the record","Played for the Los Angeles Lakers","Kareem was present courtside when the record was broken"] },
  { player:"Isiah Thomas", sport:"🏀 NBA", answer:"ISIAH THOMAS", era:"classic", stats:{PTS:"19.2",AST:"9.3",REB:"3.6",TITLES:"2"}, ctx:"1989-90 NBA Season — Detroit Pistons back-to-back champion", clues:["Won back-to-back championships with Detroit","Led the Bad Boys Pistons as point guard","Was a 2x NBA champion and Finals MVP","From Chicago Illinois — grew up in extreme poverty"] },
  { player:"Elgin Baylor", sport:"🏀 NBA", answer:"ELGIN BAYLOR", era:"legends", stats:{PTS:"27.4",REB:"13.5",AST:"4.3",ALLSTAR:"11"}, ctx:"Career Totals — Los Angeles Lakers legend who never won a title", clues:["Was an 11x All-Star who never won an NBA championship","Played for the Los Angeles Lakers his entire career","Was known for his graceful mid-air moves years before anyone had a name for them","Retired 9 games before his team finally won the title"] },
  { player:"Albert Pujols", sport:"⚾ MLB", answer:"ALBERT PUJOLS", era:"modern", stats:{HR:"49",RBI:"137",AVG:".359",OPS:"1.106"}, ctx:"Best Season — 2006 St. Louis Cardinals NL MVP", clues:["Won the NL MVP this year with the Cardinals","Hit 49 home runs with a .359 batting average","Was considered the best hitter in baseball at the time","From Santo Domingo Dominican Republic"] },
  { player:"Ryan Howard", sport:"⚾ MLB", answer:"RYAN HOWARD", era:"modern", stats:{HR:"58",RBI:"149",AVG:".313",SO:"181"}, ctx:"Best Season — 2006 Philadelphia Phillies NL MVP", clues:["Won the NL MVP leading the NL in home runs with 58","Was a massive left-handed power hitter","Won the World Series with the Phillies in 2008","From St. Louis Missouri"] },
  { player:"Prince Fielder", sport:"⚾ MLB", answer:"PRINCE FIELDER", era:"modern", stats:{HR:"50",RBI:"119",AVG:".288",OBP:".395"}, ctx:"2007 MLB Season — Milwaukee Brewers 50 HR season at age 23", clues:["Hit 50 home runs for the Milwaukee Brewers at age 23","Son of former MLB slugger Cecil Fielder","Was a vegetarian despite his powerful build","Had one of the most feared left-handed swings of his era"] },
  { player:"Carlos Beltran", sport:"⚾ MLB", answer:"CARLOS BELTRAN", era:"modern", stats:{HR:"38",RBI:"116",AVG:".275",SB:"42"}, ctx:"2004 MLB Season — Kansas City Royals 5-tool All-Star", clues:["Was a 5-tool player who hit for power average and speed","Switch hitter from Manati Puerto Rico","Was one of the best postseason performers in baseball history","Later became a manager for the New York Mets"] },
  { player:"Chase Utley", sport:"⚾ MLB", answer:"CHASE UTLEY", era:"modern", stats:{HR:"32",RBI:"102",AVG:".332",SB:"15"}, ctx:"Best Season — 2006 Philadelphia Phillies All-Star second baseman", clues:["Was considered one of the best second basemen of his era","Played for the Philadelphia Phillies","Won the World Series with the Phillies in 2008","Was known for his hard-nosed play"] },
  { player:"Jose Reyes", sport:"⚾ MLB", answer:"JOSE REYES", era:"modern", stats:{AVG:".337",SB:"39",HITS:"181",TRIPLES:"16"}, ctx:"Best Season — 2011 New York Mets batting title", clues:["Won the NL batting title this season","Led the NL in triples with 16","Was one of the most exciting leadoff hitters of his era","From Villa Gonzalez Dominican Republic"] },
  { player:"Matt Holliday", sport:"⚾ MLB", answer:"MATT HOLLIDAY", era:"modern", stats:{HR:"36",RBI:"137",AVG:".340",OPS:"1.014"}, ctx:"Best Season — 2007 Colorado Rockies NL RBI leader", clues:["Led the NL in RBI and had a .340 average","Played for the Colorado Rockies who went to the World Series","Was a powerful left fielder from Stillwater Oklahoma","Was traded to Oakland then St. Louis in subsequent years"] },
  { player:"David Wright", sport:"⚾ MLB", answer:"DAVID WRIGHT", era:"modern", stats:{HR:"30",RBI:"107",AVG:".325",SB:"20"}, ctx:"2007 MLB Season — New York Mets franchise cornerstone", clues:["Was the face of the New York Mets franchise for over a decade","An excellent all-around third baseman","From Norfolk Virginia","Had his career shortened by spinal stenosis"] },
  { player:"Karim Benzema", sport:"⚽ Soccer", answer:"KARIM BENZEMA", era:"modern", stats:{G:"44",AST:"15",APP:"46",BALLON:"2022"}, ctx:"Best Season — 2021-22 Real Madrid Ballon d Or champion", clues:["Won the Ballon d Or in 2022","Won the Champions League with Real Madrid this season","From Lyon France","Was banned from the French national team for years before returning"] },
  { player:"Gianluigi Buffon", sport:"⚽ Soccer", answer:"GIANLUIGI BUFFON", era:"modern", stats:{CS:"22",APP:"38",SERIE_A:"8",WC:"2006"}, ctx:"Career Totals — Juventus and Italy greatest goalkeeper", clues:["Won the World Cup with Italy in 2006","Was the best goalkeeper in the world for over a decade","From Carrara Italy","Won 8 Serie A titles with Juventus"] },
  { player:"Andres Iniesta", sport:"⚽ Soccer", answer:"ANDRES INIESTA", era:"modern", stats:{G:"9",AST:"14",APP:"36",GOAL:"WC Final winner"}, ctx:"Best Season — 2009-10 World Cup winner and Champions League", clues:["Scored the winning goal in the World Cup Final for Spain","Played for FC Barcelona his entire prime career","From Fuentealbilla Spain","Was named Player of the Tournament at the 2010 World Cup"] },
  { player:"Luka Modric", sport:"⚽ Soccer", answer:"LUKA MODRIC", era:"modern", stats:{G:"10",AST:"11",APP:"36",BALLON:"2018"}, ctx:"Best Season — 2017-18 ended Messi-Ronaldo era", clues:["Won the Ballon d Or in 2018 ending the Messi-Ronaldo decade","Led Croatia to the World Cup Final","From Zadar Croatia","Won 5 Champions Leagues with Real Madrid"] },
  { player:"Robert Lewandowski", sport:"⚽ Soccer", answer:"ROBERT LEWANDOWSKI", era:"modern", stats:{G:"41",AST:"9",APP:"37",RECORD:"broke Muller"}, ctx:"Best Season — 2020-21 Bundesliga broke 49-year record", clues:["Broke Gerd Mullers 49-year Bundesliga goal record with 41","Won the Bundesliga Golden Boot this season","From Warsaw Poland","Won the Champions League with Bayern Munich in 2020"] },
  { player:"Gareth Bale", sport:"⚽ Soccer", answer:"GARETH BALE", era:"modern", stats:{G:"16",AST:"11",APP:"36",FEE:"100M"}, ctx:"2012-13 La Liga Season — Worlds then most expensive player", clues:["Was the most expensive player in history when Real Madrid bought him","Played for Tottenham Hotspur before Real Madrid","From Cardiff Wales","Won 4 Champions Leagues with Real Madrid"] },
  { player:"Mohamed Salah", sport:"⚽ Soccer", answer:"MOHAMED SALAH", era:"modern", stats:{G:"32",AST:"12",APP:"38",RECORD:"PL record at time"}, ctx:"Best Season — 2017-18 Premier League record Golden Boot", clues:["Won the Premier League Golden Boot with a record 32 goals","Played for Liverpool","From Nagrig Egypt","Won the Champions League with Liverpool in 2019"] },
  { player:"Kevin De Bruyne", sport:"⚽ Soccer", answer:"KEVIN DE BRUYNE", era:"modern", stats:{G:"6",AST:"21",APP:"35",RECORD:"tied PL assists"}, ctx:"Best Season — 2019-20 tied Premier League assists record", clues:["Led the Premier League in assists with 21 tying the record","Played for Manchester City","From Drongen Belgium","Was considered the best midfielder in the Premier League for years"] },
  { player:"Antoine Griezmann", sport:"⚽ Soccer", answer:"ANTOINE GRIEZMANN", era:"modern", stats:{G:"4",AST:"2",APP:"7",WC:"winner"}, ctx:"2018 FIFA World Cup — France champion", clues:["Won the World Cup with France","Won the Golden Boot at Euro 2016","From Macon France","Played for Atletico Madrid and FC Barcelona"] },
  { player:"Thierry Henry", sport:"⚽ Soccer", answer:"THIERRY HENRY", era:"modern", stats:{G:"30",APP:"37",YEAR:"2004",INV:"Arsenal Invincibles"}, ctx:"Best Season — 2003-04 Arsenal Invincibles unbeaten season", clues:["His team went the entire league season unbeaten — The Invincibles","Won PFA Players Player of the Year twice consecutively","French striker considered arguably the best in Premier League history","From Les Ulis France"] },
  { player:"Marco van Basten", sport:"⚽ Soccer", answer:"MARCO VAN BASTEN", era:"classic", stats:{BALLON:"3",G:"19",APP:"26",EURO:"1988"}, ctx:"Career Totals — Netherlands and AC Milan dominant striker", clues:["Won 3 Ballon d Or awards in his career","Won Euro 88 with Netherlands scoring a stunning volley in the final","Played for AC Milan","Had his career ended prematurely by severe ankle injuries"] },
  { player:"Dennis Bergkamp", sport:"⚽ Soccer", answer:"DENNIS BERGKAMP", era:"classic", stats:{G:"87",AST:"94",APP:"315",FLYING:"no"}, ctx:"Career Totals — Arsenal and Netherlands attacking legend", clues:["Was known as The Non-Flying Dutchman because he refused to fly","Played for Arsenal under Arsene Wenger","Won the Dutch league title at Ajax and the FA Cup with Arsenal","From Amsterdam Netherlands"] },
  { player:"Paolo Maldini", sport:"⚽ Soccer", answer:"PAOLO MALDINI", era:"classic", stats:{APP:"902",G:"7",CUPS:"5",SERIE_A:"7"}, ctx:"Career Totals — AC Milan greatest defender ever", clues:["Is considered the greatest defender in football history by many","Played his entire career for AC Milan — 902 appearances","Never won a World Cup despite reaching the final in 1994","From Milan Italy — son of former AC Milan captain Cesare Maldini"] },
  { player:"Raul Gonzalez", sport:"⚽ Soccer", answer:"RAUL GONZALEZ", era:"classic", stats:{G:"323",APP:"741",UCL:"3",NO7:"before Ronaldo"}, ctx:"Career Totals — Real Madrid greatest legend", clues:["Was Real Madrid all-time top scorer for many years","Won 3 Champions Leagues with Real Madrid","From Madrid Spain","Wore the famous number 7 shirt before Cristiano Ronaldo took it"] },
  { player:"Gabriel Batistuta", sport:"⚽ Soccer", answer:"BATISTUTA", era:"classic", stats:{G:"54",APP:"78",NATION:"Argentina",NICK:"Batigol"}, ctx:"Career Totals — Argentina all-time top scorer", clues:["Is Argentina all-time top scorer with 54 goals","Played for Fiorentina for many years becoming a club legend","From Reconquista Argentina","Nicknamed Batigol for his prolific goal-scoring"] },
  { player:"Zinedine Zidane", sport:"⚽ Soccer", answer:"ZINEDINE ZIDANE", era:"classic", stats:{BALLON:"3",WC:"1",EURO:"1",HEADBUTT:"2006"}, ctx:"Career Totals — France greatest player", clues:["Won 3 Ballon d Or awards in his career","Won the World Cup and European Championship with France","From Marseille France of Algerian descent","Famous for his headbutt on Materazzi in the 2006 World Cup Final"] },
  { player:"Alessandro Del Piero", sport:"⚽ Soccer", answer:"ALESSANDRO DEL PIERO", era:"classic", stats:{G:"290",APP:"705",UCL:"1",WC:"1"}, ctx:"Career Totals — Juventus all-time top scorer", clues:["Won the Champions League with Juventus in 1996","Won the World Cup with Italy in 2006","Played almost his entire career for Juventus","From Conegliano Italy"] },
  { player:"Ryan Giggs", sport:"⚽ Soccer", answer:"RYAN GIGGS", era:"classic", stats:{G:"168",AST:"271",APP:"963",TITLES:"13"}, ctx:"Career Totals — Manchester United most decorated player ever", clues:["Won 13 Premier League titles with Manchester United","Scored one of the greatest individual FA Cup goals ever vs Arsenal in 1999","From Cardiff Wales","Was the only player to play in every single Premier League season for many years"] },
  { player:"Roy Keane", sport:"⚽ Soccer", answer:"ROY KEANE", era:"classic", stats:{G:"33",APP:"480",TREBLE:"1999",NATION:"Ireland"}, ctx:"Career Totals — Manchester United captain who won the Treble", clues:["Was the captain of Manchester United when they won the Treble in 1999","Was sent off in the Champions League semi-final so missed the Final","From Cork Ireland","Is considered one of the greatest and most combative midfielders ever"] },
  { player:"Bobby Moore", sport:"⚽ Soccer", answer:"BOBBY MOORE", era:"legends", stats:{APP:"108",WC:"1",YEAR:"1966",CAPS:"108"}, ctx:"Career Totals — England World Cup winning captain", clues:["Captained England to their only World Cup victory in 1966","Was named the best player of the 1966 World Cup","Played for West Ham United his entire career","Was known for his supreme composure and reading of the game"] },
  { player:"Stan Wawrinka", sport:"🎾 Tennis", answer:"STAN WAWRINKA", era:"modern", stats:{GS:"3",TITLES:"16",RANK:"3",YEAR:"2015"}, ctx:"Career Totals — Swiss champion with 3 different Grand Slams", clues:["Won 3 Grand Slam titles — Australian French and US Opens","Had a career peak ranking of World No. 3","From Lausanne Switzerland","Was often overshadowed by Federer but carved his own great legacy"] },
  { player:"Juan Martin del Potro", sport:"🎾 Tennis", answer:"JUAN MARTIN DEL POTRO", era:"modern", stats:{W:"1",GS:"1",YEAR:"2009",BEAT:"Federer AND Nadal"}, ctx:"Best Season — 2009 US Open beat both Federer and Nadal", clues:["Beat both Federer and Nadal on the way to winning the US Open","From Tandil Argentina","Had his career repeatedly hampered by wrist injuries","Won Olympic silver for Argentina in 2016"] },
  { player:"Marin Cilic", sport:"🎾 Tennis", answer:"MARIN CILIC", era:"modern", stats:{W:"1",GS:"1",YEAR:"2014",SETS_LOST:"1"}, ctx:"2014 US Open — Dominant Croatian champion", clues:["Won the US Open dropping only one set throughout the entire tournament","From Medjugorje Bosnia and Croatia","Was coached by Goran Ivanisevic at the time of his win","Is the only Croatian man to win a Grand Slam singles title"] },
  { player:"Andy Roddick", sport:"🎾 Tennis", answer:"ANDY RODDICK", era:"modern", stats:{W:"1",GS:"1",RANK:"1",SERVE:"155mph"}, ctx:"Best Season — 2003 US Open champion and World No. 1", clues:["Won the US Open and reached World No. 1 this year","Had the fastest serve in history at the time at 155 mph","From Omaha Nebraska","Was the last American man to win a Grand Slam singles title for many years"] },
  { player:"Lleyton Hewitt Easy", sport:"🎾 Tennis", answer:"LLEYTON HEWITT EASY", era:"modern", stats:{GS:"2",RANK:"1",WEEKS:"80",COMEON:"celebration"}, ctx:"Career Totals — Australian World No. 1 fighter", clues:["Spent 80 weeks at World No. 1","Won the US Open in 2001 and Wimbledon in 2002","From Adelaide South Australia","Was known for his intense competitiveness and Come On celebration"] },
  { player:"Gustavo Kuerten Easy", sport:"🎾 Tennis", answer:"GUSTAVO KUERTEN EASY", era:"modern", stats:{GS:"3",RANK:"1",CLAY:"Roland Garros x3",YEAR:"2000"}, ctx:"Career Totals — Brazilian Roland Garros king", clues:["Won Roland Garros 3 times in his career","Reached World No. 1 in 2000","From Florianopolis Brazil","Nicknamed Guga and was beloved by French crowds who adored him"] },
  { player:"Thomas Muster Easy", sport:"🎾 Tennis", answer:"THOMAS MUSTER EASY", era:"classic", stats:{W:"1",GS:"1",CLAY:"45 titles",COMEBACK:"car crash"}, ctx:"Best Season — 1995 French Open champion comeback story", clues:["Won the French Open and became World No. 1 in 1995","Won 45 clay court titles in his entire career","From Leibnitz Austria","Came back from a shattered knee hit by a drunk driver to win a Grand Slam"] },
  { player:"Yevgeny Kafelnikov Easy", sport:"🎾 Tennis", answer:"YEVGENY KAFELNIKOV EASY", era:"modern", stats:{GS:"2",RANK:"1",YEAR:"1999",FIRST:"Russian No 1"}, ctx:"Career Totals — First Russian World No. 1", clues:["Won 2 Grand Slam titles and reached World No. 1","Won the French Open in 1996 and Australian Open in 1999","From Sochi Russia","Was the first Russian man to win a Grand Slam singles title"] },
  { player:"Michael Chang Easy", sport:"🎾 Tennis", answer:"MICHAEL CHANG EASY", era:"classic", stats:{W:"1",GS:"1",AGE:"17",CRAMP:"vs Lendl"}, ctx:"Best Season — 1989 French Open youngest ever champion", clues:["Won the French Open at age 17 — youngest men s Grand Slam winner ever","American player of Chinese descent","Beat Lendl in a famous match while cramping and used an underarm serve","Was a deeply religious player who thanked God after his wins"] },
  { player:"Carlos Moya Easy", sport:"🎾 Tennis", answer:"CARLOS MOYA EASY", era:"classic", stats:{W:"1",GS:"1",RANK:"1",YEAR:"1998"}, ctx:"1998 French Open — First Spanish World No. 1", clues:["Won the French Open and became the first Spanish World No. 1","From Palma de Mallorca Spain","Was a huge star in Spain who helped inspire a generation","Later became Rafael Nadals personal coach"] },
  { player:"Jim Courier Easy", sport:"🎾 Tennis", answer:"JIM COURIER EASY", era:"classic", stats:{GS:"4",RANK:"1",WEEKS:"58",YEAR:"1992"}, ctx:"Career Totals — American World No. 1 with 4 Grand Slams", clues:["Won 4 Grand Slam titles spending 58 weeks at World No. 1","Won the French Open and Australian Open twice each","From Sanford Florida","Was known for his powerful baseline game and extraordinary fitness"] },
  { player:"Monica Seles Easy", sport:"🎾 Tennis", answer:"MONICA SELES EASY", era:"classic", stats:{GS:"9",RANK:"1",YEAR:"1991",STABBED:"1993"}, ctx:"Career Totals — Yugoslav-American dominant champion", clues:["Won 9 Grand Slam titles before age 20","Was ranked World No. 1 when she was stabbed by a spectator in 1993","From Novi Sad Yugoslavia later representing USA","Was known for her double-handed groundstrokes and grunting"] },
  { player:"Pat Cash Easy", sport:"🎾 Tennis", answer:"PAT CASH EASY", era:"classic", stats:{W:"1",GS:"1",YEAR:"1987",CLIMB:"stands"}, ctx:"1987 Wimbledon — Australian champion climbs into the stands", clues:["Won Wimbledon for his only Grand Slam title","Famously climbed into the stands to celebrate with his family and coach","From Melbourne Australia","Was known for his all-court aggressive game and headband"] },
  { player:"Michael Stich Easy", sport:"🎾 Tennis", answer:"MICHAEL STICH EASY", era:"classic", stats:{W:"1",GS:"1",YEAR:"1991",OPPONENT:"Becker"}, ctx:"1991 Wimbledon — German champion beats compatriot Becker", clues:["Won Wimbledon beating fellow German Boris Becker in the final","Was always overshadowed by Becker in Germany despite his Grand Slam","From Elmshorn West Germany","Won Olympic gold in doubles that same year"] },
  { player:"Goran Ivanisevic Easy", sport:"🎾 Tennis", answer:"GORAN IVANISEVIC EASY", era:"modern", stats:{W:"1",GS:"1",YEAR:"2001",RANK:"125"}, ctx:"2001 Wimbledon — Wildcard winner from World No. 125", clues:["Won Wimbledon as a wildcard ranked No. 125 in the world","Was the first and only wildcard entry to win Wimbledon","From Split Croatia","Had a famous alternate personality Goran who played aggressively"] },
  { player:"Arantxa Sanchez Vicario Easy", sport:"🎾 Tennis", answer:"ARANTXA SANCHEZ VICARIO EASY", era:"classic", stats:{GS:"4",RANK:"1",FRENCH:"3",NICK:"Bumblebee"}, ctx:"Career Totals — Spanish champion nicknamed the Bumblebee", clues:["Won 4 Grand Slam singles titles","Was ranked World No. 1 on two occasions","From Barcelona Spain","Was nicknamed The Barcelona Bumblebee for her tireless retrieving"] },
  { player:"Steffi Graf Easy", sport:"🎾 Tennis", answer:"STEFFI GRAF EASY", era:"classic", stats:{GS:"22",WEEKS:"377",YEAR:"1988",SLAM:"Golden Grand Slam"}, ctx:"Career Totals — German greatest champion with 22 Grand Slams", clues:["Won 22 Grand Slam singles titles — second most in the Open Era","Won the Golden Grand Slam in 1988 — all 4 slams plus Olympic gold","From Mannheim West Germany","Spent 377 weeks at World No. 1 — the most in history"] },
  { player:"Martina Navratilova Easy", sport:"🎾 Tennis", answer:"MARTINA NAVRATILOVA EASY", era:"classic", stats:{GS:"18",WIMB:"9",RANK:"1",TITLES:"167"}, ctx:"Career Totals — Czech-American serve and volley legend", clues:["Won 18 Grand Slam singles titles and 167 career titles total","Won Wimbledon 9 times — the most in the Open Era","From Prague Czechoslovakia who later represented USA","Was known for her serve and volley game and legendary fitness"] },
  { player:"Billie Jean King Easy", sport:"🎾 Tennis", answer:"BILLIE JEAN KING EASY", era:"legends", stats:{GS:"39",WIMB:"6",YEAR:"1973",BATTLE:"Beat Riggs"}, ctx:"Career Totals — American champion and pioneer", clues:["Won 39 Grand Slam titles including singles doubles and mixed","Beat Bobby Riggs in the famous Battle of the Sexes match in 1973","Was a leading advocate for equal prize money in tennis","From Long Beach California"] },
  { player:"Arthur Ashe Easy", sport:"🎾 Tennis", answer:"ARTHUR ASHE EASY", era:"classic", stats:{GS:"3",WIMB:"1",YEAR:"1975",FIRST:"Black Wimbledon winner"}, ctx:"1975 Wimbledon — Historic American champion", clues:["Became the first Black man to win Wimbledon in 1975","Won 3 Grand Slam singles titles in his career","Was a civil rights activist and social justice pioneer","Died from AIDS-related complications in 1993"] },
  { player:"Jonathan Quick Easy", sport:"🏒 NHL", answer:"JONATHAN QUICK EASY", era:"modern", stats:{GAA:"1.41","SV%":".946",W:"16",CONN_SMYTHE:"1"}, ctx:"Best Season — 2012 Stanley Cup Playoffs MVP performance", clues:["Won the Conn Smythe Trophy as playoff MVP with a 1.41 GAA","Led the LA Kings to their first Stanley Cup championship","From Milford Connecticut","Was one of the best big-game goalies of his generation"] },
  { player:"Henrik Lundqvist Easy", sport:"🏒 NHL", answer:"HENRIK LUNDQVIST EASY", era:"modern", stats:{GAA:"2.18","SV%":".921",W:"30",VEZINA:"1"}, ctx:"Best Season — 2011-12 New York Rangers Vezina winner", clues:["Won the Vezina Trophy as the best goaltender in the NHL","Played for the New York Rangers his entire career","From Are Sweden — nicknamed The King","Won Olympic gold with Sweden in 2006"] },
];

// ─── MEDIUM (45 puzzles) ──────────────────────────────────────────────────────
const MEDIUM = [
  { player:"Kevin Durant", sport:"🏀 NBA", answer:"DURANT", era:"modern", stats:{PTS:"34.3",REB:"8",AST:"5","FG%":"53.7"}, ctx:"2012 NBA Finals MVP — Oklahoma City Thunder", clues:["His team lost to Miami Heat in the 2012 Finals","Was playing for Oklahoma City","Later joined Golden State Warriors","Nickname: Slim Reaper"] },
  { player:"Kawhi Leonard", sport:"🏀 NBA", answer:"KAWHI", era:"modern", stats:{PTS:"26.6",REB:"9.3",AST:"3.3",STL:"1.8"}, ctx:"2019 NBA Finals MVP — Toronto Raptors", clues:["His team defeated the Golden State Warriors — who lost Klay Thompson and KD to injury","Ended Golden State Warriors dynasty","Known for his huge hands and quiet personality","Made The Shot vs Philadelphia in 2019"] },
  { player:"Dirk Nowitzki", sport:"🏀 NBA", answer:"NOWITZKI", era:"modern", stats:{PTS:"26",REB:"9.7",AST:"2.5","FG%":"47.9"}, ctx:"2011 NBA Finals MVP — Dallas Mavericks", clues:["His team defeated the Miami Heat — Dwyane Wade, LeBron James, and Chris Bosh","Defeated LeBron James in this series","From Wurzburg, Germany — the first European to win the award","German-born, played 21 years in Dallas"] },
  { player:"Dwyane Wade", sport:"🏀 NBA", answer:"WADE", era:"modern", stats:{PTS:"34.7",REB:"7.8",AST:"3.8",STL:"2.7"}, ctx:"2006 NBA Finals MVP — Miami Heat", clues:["Averaged 34.7 points per game in the Finals at age 24","Averaged 34.7 PPG in the series","His team came back from 2-0 down","Nickname: Flash"] },
  { player:"Giannis Antetokounmpo", sport:"🏀 NBA", answer:"GIANNIS", era:"modern", stats:{PTS:"35.2",REB:"13.2",AST:"5",BLK:"1.8"}, ctx:"2021 NBA Finals MVP — Milwaukee Bucks", clues:["Shot 62% from the field in the Finals","Averaged 35.2 PPG in the series","From Greece","Nickname: The Greek Freak"] },
  { player:"Hakeem Olajuwon", sport:"🏀 NBA", answer:"HAKEEM", era:"classic", stats:{PTS:"26.9",REB:"11.9",AST:"3.6",BLK:"3.7"}, ctx:"1994 NBA Finals MVP — Houston Rockets", clues:["Averaged 35 points and 9 rebounds per game in the 1994 Playoffs","Played for the Houston Rockets","Born in Lagos, Nigeria","Famous for his Dream Shake move"] },
  { player:"Allen Iverson", sport:"🏀 NBA", answer:"IVERSON", era:"modern", stats:{PTS:"31.1",AST:"4.6",STL:"2.5",REB:"3.8"}, ctx:"2001 NBA Season — MVP and scoring champion", clues:["Led the league in both scoring and assists simultaneously","Led the Philadelphia 76ers to the Finals","Known for his crossover dribble","Nicknamed The Answer"] },
  { player:"Charles Barkley", sport:"🏀 NBA", answer:"BARKLEY", era:"classic", stats:{PTS:"25.6",REB:"12.2",AST:"5.1","FG%":"52"}, ctx:"1993 NBA Season — Phoenix Suns MVP", clues:["Won the NBA MVP award this season","Played for Phoenix Suns","Nicknamed The Round Mound of Rebound","Said he was not a role model in a famous Nike ad"] },
  { player:"Emmitt Smith", sport:"🏈 NFL", answer:"EMMITT", era:"classic", stats:{CAR:"373",YDS:"1773",TD:"25",YPC:"4.7"}, ctx:"1995 NFL Season — Dallas Cowboys", clues:["Won the NFL rushing title this season","Won 3 Super Bowls with Dallas Cowboys","All-time NFL rushing yards leader","His number 22 is retired by the Cowboys"] },
  { player:"Randy Moss", sport:"🏈 NFL", answer:"MOSS", era:"modern", stats:{REC:"23",YDS:"1493",TD:"23",YPR:"15.0"}, ctx:"2007 NFL Season — New England Patriots", clues:["Set the single-season TD reception record","His team went 16-0 that regular season","Played for New England Patriots","Set the single-season receiving touchdown record (23)"] },
  { player:"Lawrence Taylor", sport:"🏈 NFL", answer:"TAYLOR", era:"classic", stats:{SCK:"20.5",FF:"4",INT:"2",TD:"2"}, ctx:"1986 NFL Season — New York Giants MVP", clues:["Won NFL MVP as a defensive player (very rare)","Played for New York Giants","Changed how the linebacker position was played","Wore number 56"] },
  { player:"Barry Sanders", sport:"🏈 NFL", answer:"SANDERS", era:"classic", stats:{CAR:"335",YDS:"2053",TD:"11",YPC:"6.1"}, ctx:"1997 NFL Season — Detroit Lions", clues:["Rushed for 2053 yards this season","Won the NFL MVP award","Played for Detroit Lions","Retired suddenly at his peak in 1999"] },
  { player:"Marshall Faulk", sport:"🏈 NFL", answer:"FAULK", era:"modern", stats:{REC:"87",YDS:"1048",RUSH:"1381",TD:"26"}, ctx:"2000 NFL Season — St. Louis Rams MVP", clues:["Won NFL MVP with The Greatest Show on Turf","Had both 1000 rushing and 1000 receiving yards","Played for St. Louis Rams","Won Super Bowl with the Rams"] },
  { player:"Randy Johnson", sport:"⚾ MLB", answer:"RANDY", era:"modern", stats:{ERA:"1.04",SO:"19",W:"3",IP:"17.1"}, ctx:"2001 World Series MVP — Arizona Diamondbacks", clues:["Won the series in a 7-game classic vs the New York Yankees dynasty","Struck out 372 batters this season","Known as The Big Unit","Left-handed pitcher standing 6ft 10in"] },
  { player:"Pedro Martinez", sport:"⚾ MLB", answer:"PEDRO", era:"classic", stats:{ERA:"2.07",SO:"313",W:"23",WHIP:"0.923"}, ctx:"1999 MLB Season — Boston Red Sox", clues:["Posted a 0.737 WHIP — the lowest in MLB history for a qualified starter","Won the Cy Young Award this year","Played for Boston Red Sox","From the Dominican Republic"] },
  { player:"Mike Piazza", sport:"⚾ MLB", answer:"PIAZZA", era:"classic", stats:{HR:"40",AVG:".362",RBI:"124",OPS:"1.070"}, ctx:"1997 MLB Season — Los Angeles Dodgers", clues:["Holds the career home run record for catchers (427)","Played for the Los Angeles Dodgers","Later hit an emotional HR after 9/11 with the Mets","Was a 62nd round draft pick"] },
  { player:"Greg Maddux", sport:"⚾ MLB", answer:"MADDUX", era:"classic", stats:{ERA:"1.56",W:"19",SO:"156",WHIP:"0.896"}, ctx:"1994 MLB Season — Atlanta Braves", clues:["Had an ERA of 1.56 this season","Won the NL Cy Young award this year","Played for Atlanta Braves","Won 4 consecutive Cy Young awards"] },
  { player:"Mariano Rivera", sport:"⚾ MLB", answer:"RIVERA", era:"modern", stats:{ERA:"1.38",SV:"53",WHIP:"0.768",SO:"77"}, ctx:"2004 MLB Season — New York Yankees", clues:["Had an ERA of 1.38 as a closer","Led MLB in saves","Played for New York Yankees","Only player unanimously elected to the Hall of Fame"] },
  { player:"Thierry Henry", sport:"⚽ Soccer", answer:"HENRY", era:"modern", stats:{G:"30",AST:"9",APP:"37",MIN:"3105"}, ctx:"2003-04 Premier League — Arsenal Invincibles", clues:["His team went unbeaten the entire league season","Arsenal were nicknamed The Invincibles","Won PFA Players Player of the Year","Set the Premier League single-season scoring record at the time"] },
  { player:"Zinedine Zidane", sport:"⚽ Soccer", answer:"ZIDANE", era:"classic", stats:{G:"5",AST:"3",APP:"7",MIN:"630"}, ctx:"1998 FIFA World Cup Final — France vs Brazil", clues:["Scored twice in the World Cup Final","France won their first World Cup","The opponent was Brazil","He later managed Real Madrid to 3 UCL titles"] },
  { player:"Ronaldinho", sport:"⚽ Soccer", answer:"RONALDINHO", era:"modern", stats:{G:"22",AST:"14",APP:"36",MIN:"2880"}, ctx:"2004-05 La Liga Season — FC Barcelona Ballon d'Or", clues:["Scored one of the greatest solo goals ever vs Real Madrid","Nutmegged defenders for fun — known for his elastic dribbling","Played for FC Barcelona","Brazilian playmaker known for his dribbling and smile"] },
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
  { player:"Devin Booker", sport:"🏀 NBA", answer:"BOOKER", era:"modern", stats:{PTS:"70",FG:"21",FT:"24",MIN:"44"}, ctx:"March 24, 2017 — Phoenix Suns vs Boston Celtics", clues:["Scored 70 points — the 5th highest single game score ever","Was only 20 years old at the time","Plays for Phoenix Suns","Son of former NBA player Melvin Booker"] },
  { player:"Trae Young", sport:"🏀 NBA", answer:"TRAE", era:"modern", stats:{PTS:"28.8",AST:"9.4",REB:"3.9","3PM":"3.3"}, ctx:"2021 NBA Playoffs — Atlanta Hawks Eastern Conference Finals", clues:["Led Atlanta Hawks to the Eastern Conference Finals as an underdog","Silenced New York Knicks crowd with his performances","Plays for Atlanta Hawks","From Norman, Oklahoma — was traded on draft night for Luka Doncic"] },
  { player:"Ja Morant", sport:"🏀 NBA", answer:"MORANT", era:"modern", stats:{PTS:"27.4",AST:"8.1",REB:"5.9",STL:"1.1"}, ctx:"2021-22 NBA Season — Memphis Grizzlies Most Improved", clues:["Won the Most Improved Player award","Led Memphis Grizzlies to 2nd seed in the West","From Dalzell, South Carolina","Known for his explosive athleticism and highlight dunks"] },
  { player:"Jayson Tatum", sport:"🏀 NBA", answer:"TATUM", era:"modern", stats:{PTS:"26.9",REB:"8.0",AST:"4.6","3PM":"3.0"}, ctx:"2022 NBA Eastern Conference Finals — Boston Celtics", clues:["Led Celtics to the NBA Finals this year","Won the Eastern Conference Finals MVP","Plays for Boston Celtics","From St. Louis, Missouri — mentored by Kobe Bryant"] },
  // Basketball - Classic
  { player:"Reggie Miller", sport:"🏀 NBA", answer:"MILLER", era:"classic", stats:{PTS:"23.1",REB:"2.9",AST:"2.9","3PM":"3.5"}, ctx:"1994 NBA Playoffs — Indiana Pacers vs New York Knicks", clues:["Scored 25 points in 18 seconds to beat the Knicks","Had a famous feud with Spike Lee courtside","Played for Indiana Pacers his entire career","Brother of WNBA legend Cheryl Miller"] },
  { player:"Tim Duncan", sport:"🏀 NBA", answer:"DUNCAN", era:"modern", stats:{PTS:"25.5",REB:"12.9",BLK:"2.4",AST:"3.7"}, ctx:"2002-03 NBA Season — San Antonio Spurs MVP", clues:["His team went 60-22 this season","Won 3 of his 5 championships this decade","Played for San Antonio Spurs his entire career","Nicknamed The Big Fundamental"] },
  { player:"Chris Paul", sport:"🏀 NBA", answer:"PAUL", era:"modern", stats:{PTS:"22.8",AST:"11.6",STL:"2.7",REB:"4.8"}, ctx:"2007-08 NBA Season — New Orleans Hornets", clues:["Led the NBA in assists and steals this season","Finished 3rd in MVP voting","Played for New Orleans Hornets","Nicknamed CP3 — considered one of the greatest point guards ever"] },
  // Football - Modern
  { player:"Rob Gronkowski", sport:"🏈 NFL", answer:"GRONK", era:"modern", stats:{REC:"621",YDS:"9286",TD:"92",SB:"4"}, ctx:"Career — New England Patriots and Tampa Bay Buccaneers", clues:["Retired twice and came back both times to win more Super Bowls","Won 4 Super Bowls with the most receiving TDs ever by a tight end","Caught 90+ touchdowns in his career — the most ever by a tight end","Had 5 seasons with 10+ receiving touchdowns — more than any TE in history"] },
  { player:"Odell Beckham Jr.", sport:"🏈 NFL", answer:"OBJ", era:"modern", stats:{YDS:"1305",TD:"12",CATCH:"1-hand",YEAR:"2014"}, ctx:"November 23, 2014 — New York Giants vs Dallas Cowboys", clues:["Made a one-handed catch while falling backwards — voted play of the decade","Was reaching back behind his body while being held by the cornerback","Had been in the NFL for less than 2 months at the time of the catch","Set the NFL record for fastest player to reach 200 career receptions"] },
  { player:"Adrian Peterson", sport:"🏈 NFL", answer:"PETERSON", era:"modern", stats:{CAR:"348",YDS:"2097",TD:"12",YPC:"6.0"}, ctx:"2012 NFL Season — Minnesota Vikings MVP", clues:["Rushed for 2097 yards — second most in NFL history","Won the NFL MVP award","Played for Minnesota Vikings","Came back from a torn ACL in just 9 months to have this season"] },
  { player:"Von Miller", sport:"🏈 NFL", answer:"VON", era:"modern", stats:{SCK:"2.5",FF:"2",TFL:"5",QB_HIT:"6"}, ctx:"Super Bowl 50 MVP — Denver Broncos vs Carolina Panthers", clues:["Won Super Bowl MVP with 2.5 sacks","Played for Denver Broncos","Won 2 Super Bowls in his career","His 2.5 sacks forced 2 fumbles in this game"] },
  { player:"Khalil Mack", sport:"🏈 NFL", answer:"MACK", era:"modern", stats:{SCK:"18.5",FF:"5",INT:"1",TD:"4"}, ctx:"2015 NFL Season — Oakland Raiders Defensive MVP", clues:["Won the NFL Defensive Player of the Year award","Had 18.5 sacks this season","Played for Oakland Raiders","Was traded to Chicago Bears in a blockbuster deal"] },
  // Baseball - Modern
  { player:"Jacob deGrom", sport:"⚾ MLB", answer:"DEGROM", era:"modern", stats:{ERA:"1.70",W:"10",SO:"255",WHIP:"0.912"}, ctx:"2018 NL Cy Young — New York Mets", clues:["His team scored the fewest runs per game of any Cy Young winner","Had the lowest ERA among starters","Played for New York Mets","Was nicknamed Thor for his appearance and power"] },
  { player:"Bryce Harper", sport:"⚾ MLB", answer:"HARPER", era:"modern", stats:{HR:"42",AVG:".330",RBI:"100",OPS:"1.044"}, ctx:"2021 NL MVP Season — Philadelphia Phillies", clues:["Won the NL MVP with the Phillies","Hit a walk-off home run in the NLCS in 2023","Plays for Philadelphia Phillies","From Las Vegas, Nevada — was on the cover of Sports Illustrated at 16"] },
  { player:"Max Scherzer", sport:"⚾ MLB", answer:"SCHERZER", era:"modern", stats:{ERA:"2.90",W:"21",SO:"300",WHIP:"0.970"}, ctx:"2018 NL Cy Young Season — Washington Nationals", clues:["He threw a no-hitter and a perfect game in the same season","Struck out 300 batters this season","Played for Washington Nationals","Has two different colored eyes — heterochromia"] },
  { player:"Pete Alonso", sport:"⚾ MLB", answer:"ALONSO", era:"modern", stats:{HR:"53",AVG:".260",RBI:"120",OPS:".941"}, ctx:"2019 MLB Rookie of Year — New York Mets", clues:["Set the rookie home run record (53) in his first season","Won NL Rookie of the Year","Plays for New York Mets","From Tampa, Florida — nicknamed Polar Bear"] },
  { player:"Vladimir Guerrero Jr.", sport:"⚾ MLB", answer:"VLADDY", era:"modern", stats:{HR:"48",AVG:".311",RBI:"111",OPS:"1.002"}, ctx:"2021 ML Season — Toronto Blue Jays", clues:["Led the AL in home runs and batting this season","Finished 2nd in MVP voting","Plays for Toronto Blue Jays","Son of Hall of Famer Vladimir Guerrero Sr."] },
  // Baseball - Classic
  { player:"Alex Rodriguez", sport:"⚾ MLB", answer:"AROD", era:"modern", stats:{HR:"52",AVG:".300",RBI:"135",OPS:"1.018"}, ctx:"2001 MLB Season — Texas Rangers", clues:["Signed the richest contract in sports history ($252M) before this season","Hit 52 home runs this year","Played for Texas Rangers","Nicknamed A-Rod"] },
  { player:"Manny Ramirez", sport:"⚾ MLB", answer:"MANNY", era:"modern", stats:{HR:"45",AVG:".349",RBI:"144",OPS:"1.154"}, ctx:"2002 MLB Season — Boston Red Sox", clues:["Batted .349 with 45 home runs","Finished 2nd in MVP voting","Played for Boston Red Sox","Known for Manny Being Manny antics"] },
  { player:"Sammy Sosa", sport:"⚾ MLB", answer:"SOSA", era:"classic", stats:{HR:"66",AVG:".308",RBI:"158",SLG:".647"}, ctx:"1998 MLB Season — Chicago Cubs HR chase", clues:["Hit 66 home runs in the famous McGwire-Sosa HR chase","Finished 2nd to McGwire but won NL MVP","Played for Chicago Cubs","Born in San Pedro de Macoris, Dominican Republic"] },
  // Soccer - Modern
  { player:"Neymar Jr.", sport:"⚽ Soccer", answer:"NEYMAR", era:"modern", stats:{G:"8",AST:"5",APP:"7",MIN:"594"}, ctx:"2022 FIFA World Cup — Brazil", clues:["Equalled Pele's Brazil goal scoring record during this tournament","Injured in the group stage but returned","From Mogi das Cruzes, Brazil","Plays for Paris Saint-Germain"] },
  { player:"Karim Benzema", sport:"⚽ Soccer", answer:"BENZEMA", era:"modern", stats:{G:"15",AST:"3",APP:"12",MIN:"1009"}, ctx:"2021-22 UEFA Champions League — Real Madrid", clues:["Won the Champions League with Real Madrid","Won the Ballon d'Or this year","Plays for Real Madrid","French striker who came back from exile to lead France to nothing but then won Ballon d'Or"] },
  { player:"Antoine Griezmann", sport:"⚽ Soccer", answer:"GRIEZMANN", era:"modern", stats:{G:"4",AST:"2",APP:"7",MIN:"630"}, ctx:"2018 FIFA World Cup Final — France", clues:["Scored and won the Golden Boot at this World Cup","His team defeated Argentina in the final","Plays for Atletico Madrid","From Macon, France — nickname Grizou"] },
  { player:"Virgil van Dijk", sport:"⚽ Soccer", answer:"VAN DIJK", era:"modern", stats:{G:"4",AST:"1",APP:"38",MIN:"3377"}, ctx:"2018-19 Premier League Season — Liverpool", clues:["Finished 2nd in Ballon d'Or voting — rare for a defender","Played for Liverpool","Won the Champions League and Premier League","Dutch central defender considered the best in the world"] },
  // Soccer - Classic
  { player:"Ronaldo Nazario", sport:"⚽ Soccer", answer:"R9", era:"classic", stats:{G:"15",AST:"4",APP:"16",MIN:"1238"}, ctx:"1996-97 Season — Barcelona La Liga", clues:["Won FIFA World Player of the Year at age 20","Scored 47 goals in all competitions this season","Played for Barcelona","Brazilian striker known as The Phenomenon"] },
  { player:"Roberto Baggio", sport:"⚽ Soccer", answer:"BAGGIO", era:"classic", stats:{G:"5",AST:"1",APP:"7",MIN:"585"}, ctx:"1994 FIFA World Cup — Italy", clues:["Led Italy to the World Cup Final almost single-handedly","Scored 5 goals in the tournament","Missed the decisive penalty in the final shootout vs Brazil","Italian forward with a famous ponytail, nicknamed The Divine Ponytail"] },
  { player:"Dennis Bergkamp", sport:"⚽ Soccer", answer:"BERGKAMP", era:"classic", stats:{G:"12",AST:"8",APP:"28",MIN:"2239"}, ctx:"1997-98 Season — Arsenal", clues:["Won Arsenal's Double (Premier League and FA Cup)","His goal vs Argentina in the 1998 World Cup was voted goal of the tournament","Played for Arsenal","Dutch forward nicknamed The Non-Flying Dutchman due to fear of flying"] },
  // Tennis - Classic
  { player:"Bjorn Borg", sport:"🎾 Tennis", answer:"BORG", era:"classic", stats:{W:"89",L:"3",TITLES:"11",GS:"2"}, ctx:"1979 ATP Season — Wimbledon and French Open again", clues:["Won Wimbledon for the 4th consecutive year","Won 11 Grand Slams in total","Swedish player who retired at just 26","Famous rivalry with John McEnroe"] },
  { player:"Jimmy Connors", sport:"🎾 Tennis", answer:"CONNORS", era:"classic", stats:{W:"99",L:"4",TITLES:"15",GS:"2"}, ctx:"1974 ATP Season — Three Grand Slams", clues:["Won 3 Grand Slams this year (US Open, Wimbledon, Australian)","Ranked World No. 1 for 5 consecutive years","American player known for his fighting spirit","Won 109 career singles titles — second all time"] },
  { player:"Chris Evert", sport:"🎾 Tennis", answer:"EVERT", era:"classic", stats:{W:"86",L:"4",TITLES:"13",GS:"4"}, ctx:"1974 WTA Season — Three Grand Slams", clues:["Won 3 Grand Slams this year","Won 18 Grand Slams in total","American player with a career win rate of 90%","Had a famous rivalry with Martina Navratilova"] },
  { player:"Martina Navratilova", sport:"🎾 Tennis", answer:"NAVRATILOVA", era:"classic", stats:{W:"86",L:"1",GS:"3",TITLES:"6"}, ctx:"1983 WTA Season — Most dominant year", clues:["Won 3 Grand Slams and lost only 1 match all year","Won 18 Grand Slams in total","Czech-American player who defected from Czechoslovakia","Won a record 9 Wimbledon singles titles"] },
  // Golf - Classic
  { player:"Tom Watson", sport:"⛳ Golf", answer:"WATSON", era:"classic", stats:{WINS:"6",MAJORS:"2",EARN:"$1.2M",YEAR:"1982"}, ctx:"1982 PGA Tour Season — US Open and British Open", clues:["Won the US Open at Pebble Beach with a famous chip-in on 17","Won The Open Championship the same year","Won 8 majors in total","From Kansas City, Missouri"] },
  { player:"Curtis Strange", sport:"⛳ Golf", answer:"STRANGE", era:"classic", stats:{WINS:"3",MAJORS:"1",EARN:"$1.1M",YEAR:"1989"}, ctx:"1989 PGA Tour Season — US Open back-to-back", clues:["Won the US Open for the second consecutive year","First player to earn over $1M in a season","From Norfolk, Virginia","Back-to-back US Open wins are extremely rare"] },
  // Hockey - Classic
  { player:"Brendan Shanahan", sport:"🏒 NHL", answer:"SHANAHAN", era:"classic", stats:{G:"52",AST:"34",PTS:"86",PIM:"131"}, ctx:"1993-94 NHL Season — St. Louis Blues", clues:["Scored 52 goals this season","Played for St. Louis Blues","Won 3 Stanley Cups with Detroit Red Wings","Later became NHL's VP of Player Safety"] },
  { player:"Brett Hull", sport:"🏒 NHL", answer:"HULL", era:"classic", stats:{G:"86",AST:"45",PTS:"131",PIM:"24"}, ctx:"1990-91 NHL Season — St. Louis Blues", clues:["Scored 86 goals — 3rd most in NHL history","Played for St. Louis Blues","Son of Bobby Hull — also a Hall of Famer","Nicknamed The Golden Brett"] },
  { player:"Mike Bossy", sport:"🏒 NHL", answer:"BOSSY", era:"classic", stats:{G:"68",AST:"51",PTS:"119",PIM:"6"}, ctx:"1980-81 NHL Season — New York Islanders", clues:["Scored 68 goals in this season","Won 4 consecutive Stanley Cups with the Islanders","Played for New York Islanders","Scored 50 goals in 50 games — only 2nd player to do so"] },
  { player:"Denis Savard", sport:"🏒 NHL", answer:"SAVARD", era:"classic", stats:{G:"44",AST:"87",PTS:"131",PIM:"82"}, ctx:"1987-88 NHL Season — Chicago Blackhawks", clues:["Scored 131 points this season","Played for Chicago Blackhawks","From Pointe-Gatineau, Quebec","Famous for his spin-o-rama move"] },
  { player:"Nick Foles", sport:"🏈 NFL", answer:"FOLES", era:"modern", stats:{YDS:"373",TD:"3",INT:"0",RTG:"106.0"}, ctx:"Super Bowl LII MVP — Philadelphia Eagles", clues:["Won Super Bowl MVP as a backup QB","His team beat Tom Brady and the Patriots","Caught a TD pass himself in this game","Was nearly retired before this season"] },
  { player:"Kurt Warner", sport:"🏈 NFL", answer:"WARNER", era:"classic", stats:{YDS:"414",TD:"2",INT:"0",RTG:"100.0"}, ctx:"Super Bowl XXXIV MVP — St. Louis Rams", clues:["Won Super Bowl MVP with St. Louis Rams","Was stocking grocery shelves before his NFL career","Played for The Greatest Show on Turf offense","Won 2 Super Bowl MVPs in his career"] },
  { player:"Roger Staubach", sport:"🏈 NFL", answer:"STAUBACH", era:"classic", stats:{YDS:"228",TD:"2",INT:"0",RTG:"119.5"}, ctx:"Super Bowl XII MVP — Dallas Cowboys", clues:["Won his second Super Bowl MVP","Played for Dallas Cowboys","Served in the US Navy before his NFL career","Nicknamed Roger the Dodger for his scrambling ability"] },
  { player:"Orel Hershiser", sport:"⚾ MLB", answer:"HERSHISER", era:"classic", stats:{ERA:"0.00",IP:"59",SO:"34",W:"5"}, ctx:"1988 World Series MVP — Los Angeles Dodgers", clues:["Had a 1.00 ERA through his four World Series starts","Had set the consecutive scoreless innings record","His team upset the heavily favored Oakland A's","Nicknamed Bulldog by Tommy Lasorda"] },
  { player:"Bob Gibson", sport:"⚾ MLB", answer:"GIBSON", era:"legends", stats:{ERA:"1.12",SO:"268",W:"22",CG:"28"}, ctx:"1968 MLB Season — St. Louis Cardinals", clues:["Posted a 1.12 ERA — the lowest single-season ERA since 1914","His dominance led to the mound being lowered in 1969","Played for St. Louis Cardinals","9x Gold Glove winner and 2x Cy Young winner"] },
  { player:"Don Larsen", sport:"⚾ MLB", answer:"LARSEN", era:"legends", stats:{IP:"9",H:"0",BB:"0",SO:"7"}, ctx:"1956 World Series Game 5 — New York Yankees", clues:["Threw the only perfect game in World Series history","Played for New York Yankees","Opponent was the Brooklyn Dodgers","This remains one of baseball's most iconic moments"] },
  { player:"Denny McLain", sport:"⚾ MLB", answer:"MCLAIN", era:"legends", stats:{W:"31",ERA:"1.96",SO:"280",CG:"28"}, ctx:"1968 MLB Season — Detroit Tigers", clues:["Last pitcher to win 30 games in a season","Won both the Cy Young and MVP awards","Played for Detroit Tigers","His record of 31 wins may never be broken"] },
  { player:"Sandy Koufax", sport:"⚾ MLB", answer:"KOUFAX", era:"legends", stats:{ERA:"1.73",SO:"382",W:"27",CG:"27"}, ctx:"1966 MLB Season — Los Angeles Dodgers", clues:["Retired at age 30 due to arthritis at his peak","Won 3 Cy Young Awards in 4 years","Played for Los Angeles Dodgers","Famously refused to pitch on Yom Kippur in the 1965 World Series"] },
  { player:"Fernando Valenzuela", sport:"⚾ MLB", answer:"FERNANDO", era:"classic", stats:{ERA:"2.48",W:"13",SO:"180",CG:"11"}, ctx:"1981 MLB Season — Los Angeles Dodgers Rookie", clues:["Won both Cy Young AND Rookie of the Year in same season","Started the season 8-0 which sparked Fernandomania","Played for Los Angeles Dodgers","Mexican pitcher who became a cultural icon in LA"] },
  { player:"Gerd Muller", sport:"⚽ Soccer", answer:"MULLER", era:"classic", stats:{G:"14",APP:"10",MIN:"780",YEAR:"1970"}, ctx:"1970 FIFA World Cup — West Germany", clues:["Won the Golden Boot with 14 goals in 10 games","Played for West Germany","Nicknamed Der Bomber","Bayern Munich and West Germany striker of the 1970s"] },
  { player:"George Best", sport:"⚽ Soccer", answer:"BEST", era:"legends", stats:{G:"28",APP:"41",MIN:"3690",YEAR:"1968"}, ctx:"1967-68 Football League Season — Manchester United", clues:["Won the Ballon d'Or this year","Played for Manchester United","Won the Ballon d'Or in 1968 — the first British player to do so","Known as the 5th Beatle for his pop star status"] },
  { player:"Bobby Orr", sport:"🏒 NHL", answer:"ORR", era:"classic", stats:{G:"46",AST:"102",PTS:"148",PM:"+124"}, ctx:"1970-71 NHL Season — Boston Bruins", clues:["Defenseman who led the entire league in scoring","Played for Boston Bruins","Revolutionized the defenseman position","Won 8 consecutive Norris Trophies as best defenseman"] },
  { player:"Gordie Howe", sport:"🏒 NHL", answer:"HOWE", era:"legends", stats:{G:"49",AST:"46",PTS:"95",PIM:"72"}, ctx:"1952-53 NHL Season — Detroit Red Wings", clues:["Known as Mr. Hockey","Played for Detroit Red Wings","Played in 5 different decades","A Gordie Howe Hat Trick is a goal, assist, and fight"] },
  { player:"Phil Esposito", sport:"🏒 NHL", answer:"ESPOSITO", era:"classic", stats:{G:"76",AST:"76",PTS:"152",PIM:"71"}, ctx:"1970-71 NHL Season — Boston Bruins", clues:["Scored 76 goals — shattering the previous record","Played for Boston Bruins alongside Bobby Orr","His record stood until Gretzky broke it","Italian-Canadian player who transformed the center position"] },
  { player:"Kareem Abdul-Jabbar", sport:"🏀 NBA", answer:"KAREEM", era:"classic", stats:{PTS:"26.2",REB:"13.5",AST:"5",BLK:"3.4"}, ctx:"1971 NBA Finals MVP — Milwaukee Bucks", clues:["Averaged 26.6 points in his first NBA season","Led Milwaukee to their first championship","All-time NBA scoring leader","His signature move was the unstoppable skyhook"] },
  { player:"James Harden", sport:"🏀 NBA", answer:"HARDEN", era:"modern", stats:{PTS:"36.1",AST:"7.5",REB:"6.6",FT:"87.9"}, ctx:"2018-19 NBA Season — Houston Rockets scoring title", clues:["Led Houston Rockets to a 53-win season","Played for the Houston Rockets this season","Known for his step-back three pointer","Nicknamed The Beard"] },
  { player:"Luca Modric", sport:"⚽ Soccer", answer:"MODRIC", era:"modern", stats:{G:"2",AST:"5",APP:"7",MIN:"609"}, ctx:"2018 FIFA World Cup — Croatia", clues:["Won the Golden Ball as best player of the tournament","Led Croatia to the World Cup Final for the first time","Plays for Real Madrid","From Croatia, won the Ballon d'Or in 2018"] },
  { player:"Ron Artest", sport:"🏀 NBA", answer:"ARTEST", era:"modern", stats:{PTS:"16.5",REB:"5.2",STL:"2.0",BLK:"0.8"}, ctx:"2010 NBA Finals Game 7 — Los Angeles Lakers", clues:["Hit the go-ahead three with 1 minute left in Game 7","Played for the Los Angeles Lakers","Later changed his name to Metta World Peace","Thanked his psychiatrist in his championship speech"] },
  { player:"Malcolm Butler", sport:"🏈 NFL", answer:"MALCOLM", era:"modern", stats:{INT:"1",YDS:"0",PLAYS:"1",QTR:"4th"}, ctx:"Super Bowl XLIX — New England Patriots vs Seattle Seahawks", clues:["Made the goal-line interception that won the Super Bowl","Was an undrafted free agent","Played for the New England Patriots","Intercepted Russell Wilson with 26 seconds left"] },
  { player:"Draymond Green", sport:"🏀 NBA", answer:"DRAYMOND", era:"modern", stats:{PTS:"8.2",REB:"8.9",AST:"7.4",STL:"1.9"}, ctx:"2017 NBA Finals — Golden State Warriors", clues:["Won Finals despite averaging under 10 PPG","Played for Golden State Warriors","Known for his defense and playmaking","Was a 2nd round draft pick who became an All-Star"] },
  { player:"Eli Manning", sport:"🏈 NFL", answer:"ELI", era:"modern", stats:{YDS:"255",TD:"2",INT:"0",RTG:"98.2"}, ctx:"Super Bowl XLVI MVP — New York Giants vs New England Patriots", clues:["Won his second Super Bowl MVP against the Patriots","Upset the Patriots again as heavy underdogs","Younger brother of Peyton Manning","Played his entire career for the New York Giants"] },
  { player:"Vince Carter", sport:"🏀 NBA", answer:"CARTER", era:"modern", stats:{PTS:"18.3",REB:"5.3",AST:"4.3",YEAR:"2000"}, ctx:"2000 NBA Slam Dunk Contest — Toronto Raptors", clues:["Considered the greatest dunk contest performance ever","Played for Toronto Raptors","Nicknamed Half Man Half Amazing","Had one of the longest NBA careers at 22 seasons"] },
  { player:"Paolo Maldini", sport:"⚽ Soccer", answer:"MALDINI", era:"classic", stats:{APP:"647",TITLES:"7",UCL:"5",YEARS:"25"}, ctx:"Career — AC Milan, 1985-2009", clues:["Played 647 games for AC Milan over 25 years","Won 5 UEFA Champions League titles","Considered the greatest defender of all time by many","His father Cesare also played and managed AC Milan"] },
  { player:"Lev Yashin", sport:"⚽ Soccer", answer:"YASHIN", era:"legends", stats:{CS:"270",GAMES:"812",SAVES:"150+",YEAR:"1963"}, ctx:"1963 Ballon d'Or — Soviet Union", clues:["Wore all black kit — earned the nickname The Black Spider","Saved over 150 penalties in his career","Played for Soviet Union and Dynamo Moscow","Wore all black and was nicknamed The Black Spider"] },
  { player:"Franz Beckenbauer", sport:"⚽ Soccer", answer:"BECKENBAUER", era:"classic", stats:{G:"14",APP:"50",TITLES:"3",UCL:"3"}, ctx:"1974 FIFA World Cup — West Germany", clues:["Played the role of sweeper — a position he helped popularize","Only person to win the World Cup as both captain and manager","Invented the modern sweeper position","Nicknamed Der Kaiser (The Emperor)"] },
  { player:"Steve Nash", sport:"🏀 NBA", answer:"NASH", era:"modern", stats:{PTS:"18.8",AST:"11.5",REB:"3.3","FG%":"50.2"}, ctx:"2005-06 NBA Season — Phoenix Suns MVP", clues:["Won his second consecutive MVP award","Played for Phoenix Suns","From Victoria, British Columbia, Canada","Shot over 50% from the field as a point guard"] },
  { player:"Tracy McGrady", sport:"🏀 NBA", answer:"TMAC", era:"modern", stats:{PTS:"33.0",REB:"6.5",AST:"5.5",STL:"1.6"}, ctx:"2002-03 NBA Season — Orlando Magic scoring title", clues:["Had 13 points in 35 seconds vs San Antonio — one of the great comebacks","Played for Orlando Magic","Scored 13 points in 35 seconds to beat San Antonio in 2004","Nickname T-Mac"] },
  { player:"Bob Cousy", sport:"🏀 NBA", answer:"COUSY", era:"legends", stats:{PTS:"21.7",AST:"7.7",REB:"5.3",YEAR:"1957"}, ctx:"1956-57 NBA Season — Boston Celtics MVP", clues:["Led the league in assists for the 8th time","Led the NBA in assists for 8 consecutive years","Played for Boston Celtics","Nicknamed The Houdini of the Hardwood"] },
  { player:"Peyton Manning", sport:"🏈 NFL", answer:"PEYTON", era:"modern", stats:{YDS:"247",TD:"2",INT:"2",RTG:"81.8"}, ctx:"2006 Super Bowl XLI MVP — Indianapolis Colts", clues:["Won the Super Bowl MVP with the Colts","Defeated the Chicago Bears in the rain","Played for Indianapolis Colts","Overcame being down 14-0 to win the game"] },
  { player:"Drew Brees", sport:"🏈 NFL", answer:"BREES", era:"modern", stats:{YDS:"5476",TD:"46",INT:"14",COMP:"71.2%"}, ctx:"2011 NFL Season — New Orleans Saints", clues:["Set the NFL passing yards record in a season","Led the NFL in completion percentage","Played for New Orleans Saints","From Austin, Texas — overcame a shoulder injury to reach this peak"] },
  { player:"Terrell Owens", sport:"🏈 NFL", answer:"TO", era:"modern", stats:{REC:"9",YDS:"122",TD:"1",TGT:"13"}, ctx:"Super Bowl XXXIX — Philadelphia Eagles vs New England Patriots", clues:["Played in this Super Bowl 6 weeks after a broken fibula and torn ligament","Caught 9 passes despite being barely able to walk","Played for Philadelphia Eagles","Nicknamed TO — had one of sport's most controversial personalities"] },
  { player:"Marshawn Lynch", sport:"🏈 NFL", answer:"BEAST MODE", era:"modern", stats:{CAR:"29",YDS:"157",TD:"2",YAC:"7.1"}, ctx:"2014 NFC Championship — Seattle Seahawks vs San Francisco 49ers", clues:["Ran for 2 TDs including through the entire 49ers defense","Played for Seattle Seahawks","Nicknamed Beast Mode","From Oakland, California — loved Skittles on the sideline"] },
  { player:"LaDainian Tomlinson", sport:"🏈 NFL", answer:"LT", era:"modern", stats:{CAR:"348",YDS:"1815",TD:"31",YPC:"5.2"}, ctx:"2006 NFL Season — San Diego Chargers MVP", clues:["Set the single-season TD record (31) this season","Was just 5ft 11in — one of the smallest MVPs in history","Played for San Diego Chargers","Nicknamed LT — considered one of the greatest RBs ever"] },
  { player:"Deion Sanders", sport:"🏈 NFL", answer:"PRIMETIME", era:"classic", stats:{INT:"8",TD:"6",RET:"1421",YEAR:"1994"}, ctx:"1994 NFL Season — San Francisco 49ers", clues:["Played for the 49ers and won a Super Bowl this year","Returned kicks and played both CB and WR","Nicknamed Prime Time and Neon Deion","Also played professional baseball"] },
  { player:"Reggie White", sport:"🏈 NFL", answer:"WHITE", era:"classic", stats:{SCK:"21",FF:"2",INT:"2",YEAR:"1987"}, ctx:"1987 NFL Season — Philadelphia Eagles Defensive MVP", clues:["Won Defensive Player of the Year with 21 sacks","Played for Philadelphia Eagles","Nicknamed The Minister of Defense","Considered one of the greatest defensive players ever"] },
  { player:"Dick Butkus", sport:"🏈 NFL", answer:"BUTKUS", era:"legends", stats:{SCK:"8",INT:"2",FF:"3",TD:"1"}, ctx:"1969 NFL Season — Chicago Bears All-Pro", clues:["Named to the All-Pro team for the 4th consecutive year","Played for Chicago Bears his entire career","Considered the most feared linebacker in NFL history","His name became synonymous with violent football"] },
  { player:"Zack Greinke", sport:"⚾ MLB", answer:"GREINKE", era:"modern", stats:{ERA:"1.66",W:"19",SO:"200",WHIP:"0.844"}, ctx:"2009 AL Cy Young Season — Kansas City Royals", clues:["Had the lowest ERA of any pitcher in 25 years","Turned his career around after dealing with social anxiety disorder","Played for Kansas City Royals","Had the lowest ERA by a qualified starter since 1968"] },
  { player:"Felix Hernandez", sport:"⚾ MLB", answer:"FELIX", era:"modern", stats:{ERA:"2.27",W:"13",SO:"232",WHIP:"1.056"}, ctx:"2010 AL Cy Young Season — Seattle Mariners", clues:["His 1.83 ERA was despite playing for a poor offensive team","Led the AL in ERA and innings pitched","Played for Seattle Mariners","From Valencia, Venezuela — nicknamed King Felix"] },
  { player:"Corey Kluber", sport:"⚾ MLB", answer:"KLUBER", era:"modern", stats:{ERA:"2.25",W:"20",SO:"265",WHIP:"0.875"}, ctx:"2017 AL Cy Young Season — Cleveland Indians", clues:["Struck out over 200 batters for the 5th time","Struck out 265 batters","Played for Cleveland Indians","Nicknamed Klubot for his emotionless demeanor"] },
  { player:"Jose Fernandez", sport:"⚾ MLB", answer:"FERNANDEZ", era:"modern", stats:{ERA:"2.86",W:"16",SO:"253",WHIP:"0.979"}, ctx:"2016 MLB Season — Miami Marlins (final season)", clues:["This was tragically his final season before his death","Led the NL in strikeouts","Played for Miami Marlins","Defected from Cuba at age 15 on his 4th attempt"] },
  { player:"David Ortiz", sport:"⚾ MLB", answer:"ORTIZ", era:"modern", stats:{HR:"54",AVG:".315",RBI:"137",OPS:".978"}, ctx:"2006 MLB Season — Boston Red Sox", clues:["Hit 54 home runs this season","Played for Boston Red Sox","Nicknamed Big Papi","From Santo Domingo, Dominican Republic"] },
  { player:"Roy Halladay", sport:"⚾ MLB", answer:"HALLADAY", era:"modern", stats:{ERA:"2.35",W:"21",SO:"219",WHIP:"1.041"}, ctx:"2010 NL Cy Young — Philadelphia Phillies", clues:["Threw a no-hitter in the playoffs — only the 2nd ever","His no-hitter in the NLDS was the first in playoff history","Played for Philadelphia Phillies","Also threw a perfect game during the regular season this year"] },
  { player:"Dave Winfield", sport:"⚾ MLB", answer:"WINFIELD", era:"classic", stats:{HR:"27",AVG:".340",RBI:"106",H:"184"}, ctx:"1992 MLB Season — Toronto Blue Jays World Series MVP", clues:["Had the go-ahead RBI in Game 6 of the World Series at age 40","Won his only World Series with Toronto Blue Jays","Drafted by 4 different professional sports leagues","From St. Paul, Minnesota"] },
  { player:"Gary Carter", sport:"⚾ MLB", answer:"GARY", era:"classic", stats:{HR:"32",AVG:".281",RBI:"106",GG:"3"}, ctx:"1985 MLB Season — Montreal Expos, final great year", clues:["Won 3 Gold Gloves in his career","Played for Montreal Expos","His 1986 World Series performance with the Mets was iconic","Nicknamed The Kid"] },
  { player:"Dwight Gooden", sport:"⚾ MLB", answer:"DOC", era:"classic", stats:{ERA:"1.53",W:"24",SO:"268",WHIP:"0.965"}, ctx:"1985 MLB Season — New York Mets", clues:["Won the Cy Young and Rookie of the Year in consecutive years","Had a 1.53 ERA at age 20","Played for New York Mets","Nicknamed Doc — his career derailed by substance abuse"] },
  { player:"George Brett", sport:"⚾ MLB", answer:"BRETT", era:"classic", stats:{HR:"24",AVG:".390",RBI:"118",OPS:"1.128"}, ctx:"1980 MLB Season — Kansas City Royals MVP", clues:["Batted .390 — closest to .400 since Ted Williams","Won the AL MVP award","Played for Kansas City Royals","The Pine Tar Incident in 1983 became one of baseball's famous controversies"] },
  { player:"Toni Kroos", sport:"⚽ Soccer", answer:"KROOS", era:"modern", stats:{G:"4",AST:"8",APP:"12",MIN:"1037"}, ctx:"2014 FIFA World Cup — Germany", clues:["Scored 2 goals in the semifinal against Brazil in a 7-1 win","Scored a stunning free kick vs Sweden in his career","Plays for Real Madrid","German midfielder considered the best passer in the world"] },
  { player:"Andrea Pirlo", sport:"⚽ Soccer", answer:"PIRLO", era:"modern", stats:{G:"2",AST:"8",APP:"7",MIN:"630"}, ctx:"2006 FIFA World Cup — Italy", clues:["Was considered one of the best passers of his generation","Won the Golden Ball at Euro 2012","Played for Juventus and AC Milan","Italian regista midfielder nicknamed The Architect"] },
  { player:"Didier Drogba", sport:"⚽ Soccer", answer:"DROGBA", era:"modern", stats:{G:"12",AST:"3",APP:"9",MIN:"769"}, ctx:"2011-12 UEFA Champions League — Chelsea", clues:["Scored the equalizer in the 88th minute of the Champions League Final","Scored the winning penalty in the shootout","Played for Chelsea","From Abidjan, Ivory Coast — scored in 4 separate FA Cup Finals"] },
  { player:"Gareth Bale", sport:"⚽ Soccer", answer:"BALE", era:"modern", stats:{G:"2",AST:"1",APP:"9",MIN:"613"}, ctx:"2018 UEFA Champions League Final — Real Madrid vs Liverpool", clues:["Scored a stunning bicycle kick to seal the Champions League","Came off the bench to score twice","Played for Real Madrid","Welsh winger who won 4 Champions Leagues with Madrid"] },
  { player:"Eusebio", sport:"⚽ Soccer", answer:"EUSEBIO", era:"legends", stats:{G:"9",AST:"1",APP:"6",MIN:"540"}, ctx:"1966 FIFA World Cup — Portugal", clues:["Led Portugal to 3rd place — their best World Cup finish","Led Portugal to 3rd place — their best ever World Cup finish","Played for Benfica in Portugal","Mozambican-born Portuguese forward nicknamed The Black Panther"] },
  { player:"Gustavo Kuerten", sport:"🎾 Tennis", answer:"GUGA", era:"modern", stats:{W:"61",L:"16",TITLES:"5",GS:"1"}, ctx:"2000 ATP Season — French Open champion and World No. 1", clues:["Won the French Open and ended year ranked World No. 1","Drew a heart in the clay after winning at Roland Garros","From Florianopolis, Brazil — nicknamed Guga","Won 3 French Open titles in total"] },
  { player:"Lleyton Hewitt", sport:"🎾 Tennis", answer:"HEWITT", era:"modern", stats:{W:"80",L:"13",TITLES:"8",GS:"1"}, ctx:"2001 ATP Season — World No. 1", clues:["Became the youngest World No. 1 in history at 20","Won the US Open this year","Australian player known for his fighting spirit","Famous for his Come On celebrations"] },
  { player:"Guy Lafleur", sport:"🏒 NHL", answer:"LAFLEUR", era:"classic", stats:{G:"60",AST:"72",PTS:"132",PIM:"26"}, ctx:"1977-78 NHL Season — Montreal Canadiens", clues:["Won the Hart Trophy as league MVP","Won his 4th consecutive Stanley Cup this year","Played for Montreal Canadiens","Nicknamed The Flower — one of the most exciting players ever"] },
  { player:"Caitlin Clark", sport:"🏀 NBA", answer:"CLARK", era:"modern", stats:{PTS:"19.2",AST:"8.4",REB:"5.7","3PM":"3.1"}, ctx:"2024 WNBA Season — Indiana Fever Rookie of Year", clues:["Won WNBA Rookie of the Year award","Set the NCAA all-time scoring record before entering the WNBA","Plays for Indiana Fever","From West Des Moines, Iowa — sparked a WNBA viewership revolution"] },
  { player:"Aaron Judge", sport:"⚾ MLB", answer:"JUDGE", era:"modern", stats:{HR:"62",AVG:".311",RBI:"131",OPS:"1.111"}, ctx:"2022 MLB Season — New York Yankees AL MVP", clues:["Set the AL single-season home run record (62)","Won the unanimous AL MVP award","Plays for New York Yankees","From Linden, California — 6ft 7in outfielder"] },
  { player:"Jalen Hurts", sport:"🏈 NFL", answer:"HURTS", era:"modern", stats:{YDS:"3701",TD:"35",INT:"6",RUSH:"760"}, ctx:"2022 NFL Season — Philadelphia Eagles MVP runner-up", clues:["Led Eagles to Super Bowl LVII appearance","Finished 2nd in MVP voting","Plays for Philadelphia Eagles","From Channelview, Texas — transferred from Alabama to Oklahoma"] },
  { player:"Justin Jefferson", sport:"🏈 NFL", answer:"JEFFERSON", era:"modern", stats:{REC:"128",YDS:"1809",TD:"9",YPR:"14.1"}, ctx:"2022 NFL Season — Minnesota Vikings receiving record", clues:["Set the single-season receiving yards record (1809)","Won Offensive Player of the Year","Plays for Minnesota Vikings","From St. Rose, Louisiana — joined LSU after Odell Beckham left"] },
  { player:"Auston Matthews", sport:"🏒 NHL", answer:"MATTHEWS", era:"modern", stats:{G:"60",AST:"46",PTS:"106",PIM:"24"}, ctx:"2021-22 NHL Season — Toronto Maple Leafs MVP", clues:["Won the Hart Trophy as league MVP","Led the NHL in goals with 60","Plays for Toronto Maple Leafs","From Scottsdale, Arizona — grew up in Mexico before moving to Arizona"] },
  { player:"Angelique Kerber", sport:"🎾 Tennis", answer:"KERBER", era:"modern", stats:{W:"68",L:"22",GS:"3",RANK:"1"}, ctx:"2016 WTA Season — World No. 1 after winning 3 Slams", clues:["Won the Australian Open, Wimbledon, and US Open in the same year","Became World No. 1 for the first time in her career","German left-handed player","Beat Serena Williams in the 2016 Australian Open final as a huge underdog"] },
  { player:"Caroline Wozniacki", sport:"🎾 Tennis", answer:"WOZNIACKI", era:"modern", stats:{W:"74",L:"17",TITLES:"9",RANK:"1"}, ctx:"2010 WTA Season — World No. 1", clues:["Reached World No. 1 for the first time in her career","Won 9 titles this season including the US Open Series","Danish player who was known for her consistency","Later won her only Grand Slam at the 2018 Australian Open"] },
  { player:"Jennifer Capriati", sport:"🎾 Tennis", answer:"CAPRIATI", era:"modern", stats:{W:"62",L:"16",GS:"3",RANK:"1"}, ctx:"2001 WTA Season — World No. 1 comeback", clues:["Made one of the greatest comebacks in tennis history","Won the Australian Open and French Open this year","Had struggled with personal problems before this comeback","Was a child prodigy who turned pro at age 13"] },
  { player:"Thomas Johansson", sport:"🎾 Tennis", answer:"JOHANSSON", era:"modern", stats:{W:"1",YEAR:"2002",SURFACE:"Hard",NATION:"Sweden"}, ctx:"2002 Australian Open — Surprise Grand Slam champion", clues:["Won the Australian Open as a major underdog at World No. 20","Swedish player who was never a top 10 player before or after","Beat Marat Safin in the final","This was his only Grand Slam title"] },
  { player:"Gaston Gaudio", sport:"🎾 Tennis", answer:"GAUDIO", era:"modern", stats:{W:"1",YEAR:"2004",SURFACE:"Clay",NATION:"Argentina"}, ctx:"2004 French Open — Surprise champion from Argentina", clues:["Won the French Open from match point down in the final","Beat Guillermo Coria who was the heavy favorite","Argentine clay court player ranked outside the top 10","This was his only Grand Slam title"] },

  { player:"Ernie Els", sport:"⛳ Golf", answer:"ELS", era:"classic", stats:{WINS:"4",MAJORS:"2",EARN:"$6.8M",YEAR:"1997"}, ctx:"1997 PGA Tour Season — The Big Easy", clues:["Won 2 US Opens and 2 British Opens in his career","Nicknamed The Big Easy for his smooth swing","From Johannesburg, South Africa","Won the US Open in 1994 and 1997"] },
  { player:"Retief Goosen", sport:"⛳ Golf", answer:"GOOSEN", era:"modern", stats:{WINS:"2",MAJORS:"2",EARN:"$4.9M",YEAR:"2004"}, ctx:"2004 US Open — Two-time US Open champion", clues:["Won his second US Open title this year","From Pietersburg, South Africa","Was struck by lightning as a teenager which affected him for years","Won the US Open in 2001 and 2004"] },
  { player:"Michael Campbell", sport:"⛳ Golf", answer:"CAMPBELL", era:"modern", stats:{WINS:"1",MAJORS:"1",YEAR:"2005",NATION:"New Zealand"}, ctx:"2005 US Open — Pinehurst No. 2", clues:["Won the US Open as a major underdog","Beat Tiger Woods down the stretch","From Hawera, New Zealand — of Maori descent","This was the only major of his career"] },
  { player:"Zach Johnson", sport:"⛳ Golf", answer:"ZACH", era:"modern", stats:{SCORE:"-15",PLAYOFF:"W",HOLES:"4",OPP:"Spieth"}, ctx:"2015 British Open — Zach Johnson wins in playoff", clues:["Won The Open Championship in a playoff at St Andrews","Also won the Masters in 2007","From Cedar Rapids, Iowa","Beat Louis Oosthuizen and Marc Leishman in a 4-hole playoff"] },
  { player:"Angel Cabrera", sport:"⛳ Golf", answer:"CABRERA", era:"modern", stats:{SCORE:"-12",PLAYOFF:"W",HOLES:"1",OPP:"Kenny Perry"}, ctx:"2009 Masters — Angel Cabrera wins playoff", clues:["Won the Masters in a sudden death playoff","Also won the US Open in 2007","From Cordoba, Argentina — first Argentine to win a major","Beat Kenny Perry and Chad Campbell in the playoff"] },
  { player:"Elgin Baylor", sport:"🏀 NBA", answer:"BAYLOR", era:"legends", stats:{PTS:"61",REB:"22",AST:"3"}, ctx:"Nov 15, 1960 — LA Lakers vs New York Knicks", clues:["Scored 61 points — a record at the time","Played for the LA Lakers","Never won an NBA championship in 11 Finals appearances","One of the most graceful scorers of his era"] },
  { player:"Pete Maravich", sport:"🏀 NBA", answer:"PISTOL", era:"classic", stats:{PTS:"68",REB:"6",AST:"4"}, ctx:"Feb 25, 1977 — vs New York Knicks", clues:["Scored 68 points without a 3-point line","Played for New Orleans Jazz","NCAA all-time scoring leader at 44.2 PPG","Nicknamed Pistol Pete for his flashy style"] },
  { player:"Willis Reed", sport:"🏀 NBA", answer:"REED", era:"classic", stats:{PTS:"21.1",REB:"13.9",BLK:"1.9",FG:"52.1"}, ctx:"1970 NBA Finals MVP — New York Knicks", clues:["Knicks defeated the Los Angeles Lakers — Jerry West and Wilt Chamberlain","Famous for limping onto court injured in Game 7","Played center for the Knicks","Inspired his team to win Game 7 of the Finals"] },
  { player:"Rick Barry", sport:"🏀 NBA", answer:"BARRY", era:"legends", stats:{PTS:"36.3",REB:"6.1",AST:"4.7",FT:"89%"}, ctx:"1966-67 NBA Season — San Francisco Warriors", clues:["Led the NBA in scoring with 36.3 PPG","Played for the San Francisco Warriors","Famous for his underhand free throw style","Never missed a Finals appearance in his career"] },
  { player:"Ivan Lendl", sport:"🎾 Tennis", answer:"LENDL", era:"classic", stats:{W:"106",L:"9",TITLES:"11",GS:"3"}, ctx:"1986 ATP Season — Czech-American dominance", clues:["Won 3 Grand Slams this year","Czech-American player who dominated the 1980s","Won 8 Grand Slams in total","Famous for his intense and methodical training regime"] },
  { player:"Mats Wilander", sport:"🎾 Tennis", answer:"WILANDER", era:"classic", stats:{W:"79",L:"7",TITLES:"7",GS:"3"}, ctx:"1988 ATP Season — Three Grand Slams", clues:["Won 3 Grand Slams in a single year","Swedish player who won 7 Grand Slams total","Won Australian, French, and US Open this year","Reached World No. 1 this year"] },
  { player:"Ben Hogan", sport:"⛳ Golf", answer:"HOGAN", era:"legends", stats:{WINS:"5",MAJORS:"3",AVG:"69.3",YEAR:"1953"}, ctx:"1953 PGA Tour Season — The Hogan Slam", clues:["Won 3 majors in one year","Could not attempt the Grand Slam due to scheduling conflicts","Had survived a near-fatal car accident years earlier","Considered one of the greatest ball-strikers ever"] },
  { player:"Byron Nelson", sport:"⛳ Golf", answer:"NELSON", era:"legends", stats:{WINS:"18",STREAK:"11",AVG:"68.33",YEAR:"1945"}, ctx:"1945 PGA Tour Season — Greatest season in golf history", clues:["Won 18 tournaments in one season — all-time record","Won 11 consecutive tournaments — all-time record","Played mostly during World War II era","His record may never be broken"] },
  { player:"Ken Dryden", sport:"🏒 NHL", answer:"DRYDEN", era:"classic", stats:{GAA:"3.00","SV%":".920",W:"12",SO:"0"}, ctx:"1971 Stanley Cup Playoffs MVP — Montreal Canadiens", clues:["Won Conn Smythe Trophy as playoff MVP as a rookie","Had only played 6 regular season games before the playoffs","Played for Montreal Canadiens","Later became a politician and author"] },
  { player:"George Mikan", sport:"🏀 NBA", answer:"MIKAN", era:"legends", stats:{PTS:"22.3",REB:"13.4",TITLES:"4",YEAR:"1952"}, ctx:"1951-52 NBA Season — Minneapolis Lakers", clues:["Led Minneapolis Lakers to 5 NBA titles","Considered the first true dominant big man in basketball","The NBA widened the lane twice because of him","Wore thick glasses while playing"] },
  { player:"Earl Monroe", sport:"🏀 NBA", answer:"MONROE", era:"legends", stats:{PTS:"23.8",AST:"5.5",REB:"4.0",YEAR:"1968"}, ctx:"1967-68 NBA Season — Baltimore Bullets Rookie of Year", clues:["Won Rookie of the Year with Baltimore Bullets","Famous for his spinning moves in the lane","Nicknamed Earl the Pearl and Black Jesus","Later won a championship with the New York Knicks"] },
  { player:"Tim Tebow", sport:"🏈 NFL", answer:"TEBOW", era:"modern", stats:{YDS:"316",TD:"3",INT:"1",RTG:"125.6"}, ctx:"2012 NFL Wild Card — Denver Broncos vs Pittsburgh Steelers", clues:["Threw an 80-yard TD on the first play of overtime","Played for Denver Broncos","Famous for his religious celebrations on the field","Won the Heisman Trophy at Florida"] },
  { player:"Jeremy Lin", sport:"🏀 NBA", answer:"LIN", era:"modern", stats:{PTS:"22.5",AST:"8.7",REB:"3.6",STREAK:"7W"}, ctx:"February 2012 — New York Knicks Linsanity run", clues:["Led the Knicks on a 7-game winning streak as an unknown","Was sleeping on his brother's couch before his breakout","Harvard graduate who went undrafted","The phenomenon was called Linsanity"] },
  { player:"Muggsy Bogues", sport:"🏀 NBA", answer:"BOGUES", era:"classic", stats:{PTS:"10.8",AST:"9.7",STL:"2.0",HT:"5ft3"}, ctx:"1994-95 NBA Season — Charlotte Hornets", clues:["Led the team in assists and steals","Played for Charlotte Hornets","Shortest player in NBA history at 5ft 3in","From Baltimore, Maryland"] },
  { player:"Manute Bol", sport:"🏀 NBA", answer:"BOL", era:"classic", stats:{BLK:"5.0",PTS:"2.7",REB:"4.2",HT:"7ft7"}, ctx:"1985-86 NBA Season — Washington Bullets", clues:["Led the NBA in blocks per game with 5.0","Played for Washington Bullets","Tallest player in NBA history at 7ft 7in","From the Dinka tribe in Sudan"] },
  { player:"Xabi Alonso", sport:"⚽ Soccer", answer:"XABI", era:"modern", stats:{G:"2",AST:"4",APP:"38",MIN:"3285"}, ctx:"2013-14 La Liga Season — Real Madrid", clues:["Won La Liga and the Champions League this year","Played for Real Madrid","Spanish midfielder known for his passing range","Now manages Bayer Leverkusen to the Bundesliga title"] },
  { player:"Payne Stewart", sport:"⛳ Golf", answer:"STEWART", era:"classic", stats:{WINS:"3",MAJORS:"1",PUTT:"1.741",YEAR:"1999"}, ctx:"1999 US Open — Pinehurst No. 2", clues:["Sank the winning putt on the 18th to win the US Open","Was killed in a plane crash 4 months after this win","From Springfield, Missouri","Known for wearing knickerbockers and tam o'shanter caps"] },
  { player:"Bernhard Langer", sport:"⛳ Golf", answer:"LANGER", era:"classic", stats:{WINS:"4",MAJORS:"1",RYDER:"19.5",YEAR:"1993"}, ctx:"1993 Masters — Augusta National", clues:["Won his second Masters title","Has never won a tournament outside of the Masters where he has 2 wins","From Anhausen, West Germany — now leads LIV Seniors Tour","Had the yips and reinvented his putting style multiple times"] },
  { player:"A'ja Wilson", sport:"🏀 NBA", answer:"AJA", era:"modern", stats:{PTS:"26.8",REB:"11.9",BLK:"2.3",STL:"1.6"}, ctx:"2022 WNBA Season — Las Vegas Aces MVP", clues:["Won the WNBA MVP award for the second time","Led Las Vegas Aces to the WNBA Championship","Plays for Las Vegas Aces","From Hopkins, South Carolina"] },
  { player:"Jason Kidd", sport:"🏀 NBA", answer:"KIDD", era:"modern", stats:{AST:"9.9",REB:"6.4",STL:"1.9",PTS:"11.9"}, ctx:"2011 NBA Finals — Dallas Mavericks", clues:["Won his only NBA championship at age 38 with Dallas","Was 13 seasons into his career before winning a title","Led the NBA in assists multiple times","Was known as one of the best defensive point guards ever"] },
  { player:"Tony Perez", sport:"⚾ MLB", answer:"PEREZ", era:"classic", stats:{HR:"4",AVG:".269",RBI:"10",APP:"7"}, ctx:"1975 World Series — Cincinnati Reds Big Red Machine", clues:["Was a key part of the Cincinnati Reds Big Red Machine","Hit a crucial home run in Game 7 of the 1975 World Series","First baseman who played alongside Rose, Morgan, and Bench","From Camaguey, Cuba"] },
  { player:"Tommy John", sport:"⚾ MLB", answer:"TOMMY JOHN", era:"classic", stats:{W:"288",ERA:"3.34",CG:"162",SEASONS:"26"}, ctx:"Career totals — Pitched in 4 decades for 6 teams", clues:["Pitched 26 seasons in the MLB spanning 4 decades","Had a revolutionary elbow surgery in 1974 that now bears his name","Returned to win 164 games after the surgery","Played for 6 different teams including the Yankees and Dodgers"] },
  { player:"John Newcombe", sport:"🎾 Tennis", answer:"NEWCOMBE", era:"classic", stats:{GS:"7",WIMBLEDON:"3",YEAR:"1971",NATION:"Australia"}, ctx:"1971 Wimbledon — Three-time champion", clues:["Won Wimbledon 3 times including this year","Won 7 Grand Slam singles titles total","Australian player with a famous mustache","Won the US Open twice and Australian Open twice"] },
  { player:"Karl-Heinz Rummenigge", sport:"⚽ Soccer", answer:"RUMMENIGGE", era:"classic", stats:{G:"2",AST:"2",APP:"7",MIN:"612"}, ctx:"1982 FIFA World Cup — West Germany", clues:["Led West Germany to the World Cup Final in 1982","Won 2 consecutive Ballon d'Or awards (1980 and 1981)","Played for Bayern Munich his entire career","West Germany lost the 1982 Final to Italy in extra time"] },
  { player:"Gary Lineker", sport:"⚽ Soccer", answer:"LINEKER", era:"classic", stats:{G:"6",APP:"5",MIN:"450",YEAR:"1986"}, ctx:"1986 FIFA World Cup — England Golden Boot", clues:["Remarkably was never booked in his entire professional career","England's all-time leading scorer at a World Cup","Played for Leicester, Everton, Barcelona, and Tottenham","Remarkably was never booked in his entire professional career"] },
  { player:"Hristo Stoichkov", sport:"⚽ Soccer", answer:"STOICHKOV", era:"classic", stats:{G:"6",APP:"7",MIN:"630",YEAR:"1994"}, ctx:"1994 FIFA World Cup — Bulgaria", clues:["Won the Golden Boot at the 1994 World Cup with 6 goals","Led Bulgaria to a shocking semifinal appearance","Won the Ballon d'Or in 1994","Played for Barcelona under Johan Cruyff"] },
  { player:"Trent Dilfer", sport:"🏈 NFL", answer:"DILFER", era:"modern", stats:{YDS:"153",TD:"1",INT:"0",RTG:"112.8"}, ctx:"Super Bowl XXXV MVP team — Baltimore Ravens", clues:["Won a Super Bowl as a game-manager QB with the dominant Ravens defense","Was released by Baltimore after winning the Super Bowl","One of the most criticized Super Bowl winning QBs ever","The Ravens defense that year allowed only 165 points all season"] },
  { player:"Marc-Andre Fleury", sport:"🏒 NHL", answer:"FLEURY", era:"modern", stats:{GAA:"2.52","SV%":".914",W:"16",SO:"1"}, ctx:"2009 Stanley Cup Playoffs — Pittsburgh Penguins", clues:["Won the Stanley Cup with the Pittsburgh Penguins","Was named playoff MVP in the second round","Was the #1 overall pick in the 2003 NHL Draft","Won 3 Stanley Cups in his career"] },
  { player:"Henrik Zetterberg", sport:"🏒 NHL", answer:"ZETTERBERG", era:"modern", stats:{G:"13",AST:"14",PTS:"27",GP:"22"}, ctx:"2008 Stanley Cup Playoffs MVP — Detroit Red Wings", clues:["Won the Conn Smythe Trophy as playoff MVP","Led Detroit Red Wings to the Stanley Cup","Swedish winger who was a 7th round draft pick","Scored the Stanley Cup winning goal in 2008"] },
  { player:"Jonathan Quick", sport:"🏒 NHL", answer:"QUICK", era:"modern", stats:{GAA:"1.41","SV%":".946",W:"16",SO:"3"}, ctx:"2012 Stanley Cup Playoffs MVP — Los Angeles Kings", clues:["Won the Conn Smythe Trophy with one of the greatest playoff performances ever","Led the LA Kings to their first Stanley Cup","Was dominant in Game 6 of the Finals vs the Devils","From Milford, Connecticut"] },
  { player:"Landon Donovan", sport:"⚽ Soccer", answer:"DONOVAN", era:"modern", stats:{G:"5",AST:"3",APP:"5",MIN:"450"}, ctx:"2010 FIFA World Cup — USA", clues:["Scored the famous injury-time winner vs Algeria","Sent USA through to the round of 16","Greatest American soccer player of his generation","Scored in the 91st minute to spark wild celebrations"] },
  { player:"Connor Bedard", sport:"🏒 NHL", answer:"BEDARD", era:"modern", stats:{G:"22",AST:"37",PTS:"61",YEAR:"2024"}, ctx:"2023-24 NHL Season — Chicago Blackhawks Rookie of Year", clues:["Won the Calder Trophy as NHL Rookie of the Year","Was the #1 overall pick in the 2023 NHL Draft","Plays for Chicago Blackhawks","From North Vancouver, British Columbia"] },
  { player:"Bubba Watson", sport:"⛳ Golf", answer:"BUBBA", era:"modern", stats:{SCORE:"-10",HOLE:"10",SHOT:"Hook",PLAYOFF:"W"}, ctx:"2012 Masters — Augusta National playoff win", clues:["Won the Masters with a famous hook shot from the pine straw","Is a left-handed golfer who never had a formal lesson","Won 2 Masters titles in his career","From Bagdad, Florida — known for his massive driving distance"] },
  { player:"Dimitar Berbatov", sport:"⚽ Soccer", answer:"BERBATOV", era:"modern", stats:{G:"20",AST:"7",APP:"32",MIN:"2318"}, ctx:"2010-11 Premier League Season — Manchester United golden boot", clues:["Was voted Player of the Season by his peers","Played for Manchester United","Scored 5 goals in a single Premier League game","Bulgarian striker known for his elegant style"] },
  { player:"David Duval", sport:"⛳ Golf", answer:"DUVAL", era:"classic", stats:{WINS:"4",AVG:"68.93",EARN:"$2.6M",YEAR:"1999"}, ctx:"1999 PGA Tour Season — Briefly World No. 1", clues:["Shot a 59 to win the Bob Hope Classic — only 4th player to do so","Reached World No. 1 in the world","From Jacksonville, Florida","His career declined rapidly after reaching the top"] },
  { player:"Yevgeny Kafelnikov", sport:"🎾 Tennis", answer:"KAFELNIKOV", era:"classic", stats:{W:"76",L:"24",GS:"2",TITLES:"9"}, ctx:"1999 ATP Season — Australian Open champion and World No. 1", clues:["Won 2 Grand Slams and reached World No. 1","Won the Australian Open this year","Russian player who won the French Open in 1996","Was the first Russian man to win a Grand Slam title"] },
  { player:"Jake Delhomme", sport:"🏈 NFL", answer:"DELHOMME", era:"modern", stats:{YDS:"323",TD:"3",INT:"1",RTG:"100.1"}, ctx:"2003 NFC Championship — Carolina Panthers", clues:["Led the Carolina Panthers to Super Bowl XXXVIII","Was an undrafted free agent who became a starter","Played for the Carolina Panthers","His team lost to the Patriots in one of the highest scoring Super Bowls ever"] },
  { player:"Ryan Kesler", sport:"🏒 NHL", answer:"KESLER", era:"modern", stats:{G:"41",AST:"32",PTS:"73",YEAR:"2011"}, ctx:"2010-11 NHL Season — Vancouver Canucks", clues:["Won the Selke Trophy as best defensive forward","Had a career-high 41 goals this season","Played for Vancouver Canucks","Was known as one of the best two-way forwards in the NHL"] },
  { player:"Just Fontaine", sport:"⚽ Soccer", answer:"FONTAINE", era:"legends", stats:{G:"13",APP:"6",MIN:"540",YEAR:"1958"}, ctx:"1958 FIFA World Cup — France", clues:["Scored 13 goals in a single World Cup — all-time record","Played for France","The record has never been broken in over 60 years","French striker who played in the 1950s"] },
  { player:"Nate Thurmond", sport:"🏀 NBA", answer:"NATE THURMOND", era:"legends", stats:{PTS:"19.0",REB:"19.0",BLK:"4.0",FG:"44.0"}, ctx:"1967-68 NBA Season — San Francisco Warriors All-Star", clues:["Averaged over 19 points and 19 rebounds per game","Played for the San Francisco Warriors","Was considered the toughest defensive center of the 1960s","Recorded the first official quadruple-double in NBA history in 1974"] },
  { player:"Willis Reed", sport:"🏀 NBA", answer:"WILLIS REED MEDIUM", era:"legends", stats:{PTS:"21.7",REB:"13.9",BLK:"1.8",FG:"52.1"}, ctx:"1969-70 NBA Season — New York Knicks MVP", clues:["Won the regular season MVP All-Star MVP and Finals MVP in same year","Played center for the New York Knicks","His heroic Game 7 appearance is one of sports greatest moments","Was the backbone of the championship Knicks teams"] },
  { player:"Elgin Baylor", sport:"🏀 NBA", answer:"ELGIN BAYLOR MEDIUM", era:"legends", stats:{PTS:"38.3",REB:"18.6",AST:"4.6",FG:"44.5"}, ctx:"1961-62 NBA Season — Los Angeles Lakers", clues:["Averaged 38.3 PPG — 3rd highest season average ever","Played for the Los Angeles Lakers","Never won an NBA championship despite 11 Finals appearances","One of the most graceful scorers of his era"] },
  { player:"Jerry Lucas", sport:"🏀 NBA", answer:"JERRY LUCAS", era:"legends", stats:{PTS:"21.5",REB:"21.1",AST:"4.3",FG:"49.9"}, ctx:"1964-65 NBA Season — Cincinnati Royals Rookie of Year", clues:["Won Rookie of the Year with Cincinnati Royals","Averaged over 20 points and 20 rebounds as a rookie","Was a memory expert who later memorized the Manhattan phone book","Won a championship with the New York Knicks later in his career"] },
  { player:"Connie Hawkins", sport:"🏀 NBA", answer:"CONNIE HAWKINS", era:"legends", stats:{PTS:"24.6",REB:"10.4",AST:"4.8",FG:"48.9"}, ctx:"1967-68 ABA Season — Pittsburgh Pipers MVP", clues:["Won the ABA MVP in its very first season","Was banned from the NBA for years despite being innocent","Was finally admitted to the NBA in 1969","Was one of the most gifted ballhandlers of his generation"] },
  { player:"Rick Barry", sport:"🏀 NBA", answer:"RICK BARRY MEDIUM", era:"legends", stats:{PTS:"35.6",REB:"6.1",AST:"4.7",FT:"89.0"}, ctx:"1966-67 NBA Season — San Francisco Warriors scoring title", clues:["Led the NBA in scoring with 35.6 PPG","Played for the San Francisco Warriors","Famous for his underhand free throw shooting style","Won ABA and NBA championships in his career"] },
  { player:"Billy Cunningham", sport:"🏀 NBA", answer:"BILLY CUNNINGHAM", era:"classic", stats:{PTS:"24.8",REB:"13.0",AST:"4.3",FG:"45.5"}, ctx:"1971-72 ABA Season — Carolina Cougars MVP", clues:["Won the ABA MVP this season","Later coached the Philadelphia 76ers to the 1983 championship","Nicknamed The Kangaroo Kid for his leaping ability","Played for Philadelphia 76ers and Carolina Cougars"] },
  { player:"Dave Cowens", sport:"🏀 NBA", answer:"DAVE COWENS", era:"classic", stats:{PTS:"20.5",REB:"16.2",AST:"4.4",FG:"45.9"}, ctx:"1972-73 NBA Season — Boston Celtics MVP", clues:["Won the NBA MVP award this season","Led the Celtics to the championship the following year","Played for Boston Celtics","Was a center who played with the intensity of a small forward"] },
  { player:"Sam Jones", sport:"🏀 NBA", answer:"SAM JONES MEDIUM", era:"legends", stats:{PTS:"22.1",REB:"4.5",AST:"4.9",FG:"47.0"}, ctx:"1964-65 NBA Season — Boston Celtics fifth championship", clues:["Won 10 NBA championships with the Boston Celtics","Was known as the banker for his bank shot off the glass","Played for Boston Celtics alongside Bill Russell","Was inducted into the Hall of Fame in 1983"] },
  { player:"Hal Greer", sport:"🏀 NBA", answer:"HAL GREER MEDIUM", era:"legends", stats:{PTS:"22.1",REB:"5.3",AST:"4.7",YEAR:"1968"}, ctx:"1967-68 NBA Season — Philadelphia 76ers starter", clues:["Was the leading scorer on the 76ers team that went 68-13","Played all 15 seasons for the same franchise","Was known for shooting his free throws as jump shots","Was a 10x NBA All-Star"] },
  { player:"Bob Boozer", sport:"🏀 NBA", answer:"BOB BOOZER", era:"legends", stats:{PTS:"21.8",REB:"11.6",FG:"46.7",YEAR:"1964"}, ctx:"1963-64 NBA Season — New York Knicks All-Star", clues:["Was a 6x All-Star during his career","Played for 6 different teams including the Knicks and Bulls","Won an Olympic gold medal with the US team in 1960","From Omaha, Nebraska"] },
  { player:"Tom Heinsohn", sport:"🏀 NBA", answer:"TOM HEINSOHN", era:"legends", stats:{PTS:"18.8",REB:"10.0",FG:"40.8",TITLES:"6"}, ctx:"1956-57 NBA Season — Boston Celtics Rookie of Year", clues:["Won Rookie of the Year in his first season","Won 6 NBA championships as a player with the Celtics","Later coached the Celtics to 2 more championships","Was elected to the Hall of Fame as both a player and coach"] },
  { player:"Lenny Wilkens", sport:"🏀 NBA", answer:"LENNY WILKENS", era:"legends", stats:{PTS:"22.4",AST:"8.1",REB:"5.6",STL:"2.1"}, ctx:"1967-68 NBA Season — St. Louis Hawks All-Star", clues:["Was a player-coach during his playing career","Played for the St. Louis Hawks","Later became one of the winningest coaches in NBA history","Was an All-Star as both a player and a coach — unique achievement"] },
  { player:"John Havlicek", sport:"🏀 NBA", answer:"JOHN HAVLICEK MEDIUM", era:"classic", stats:{PTS:"26.8",REB:"7.1",AST:"5.9",FG:"47.0"}, ctx:"1973-74 NBA Season — Boston Celtics Finals MVP", clues:["Won the NBA Finals MVP with the Boston Celtics","Won 8 NBA championships in his career","Nicknamed Hondo","Was famous for his tireless running and hustle"] },
  { player:"Earl Monroe", sport:"🏀 NBA", answer:"EARL MONROE MEDIUM", era:"legends", stats:{PTS:"23.8",AST:"5.5",REB:"4.0",FG:"46.2"}, ctx:"1967-68 NBA Season — Baltimore Bullets Rookie of Year", clues:["Won Rookie of the Year with Baltimore Bullets","Famous for his spinning moves in the lane","Nicknamed Earl the Pearl and Black Jesus","Later won a championship with the New York Knicks"] },
  { player:"Bob Cousy", sport:"🏀 NBA", answer:"BOB COUSY MEDIUM", era:"legends", stats:{PTS:"21.7",AST:"7.7",REB:"5.3",TITLES:"6"}, ctx:"1956-57 NBA Season — Boston Celtics MVP", clues:["Won the MVP award and led Celtics to the championship","Led the NBA in assists for 8 consecutive years","Played for Boston Celtics","Nicknamed The Houdini of the Hardwood"] },
  { player:"Oscar Robertson", sport:"🏀 NBA", answer:"OSCAR ROBERTSON MEDIUM", era:"legends", stats:{PTS:"30.8",AST:"11.4",REB:"12.5",FG:"47.8"}, ctx:"1961-62 NBA Season — Cincinnati Royals triple-double season", clues:["Averaged a triple-double for the entire season","Played for the Cincinnati Royals","Nicknamed The Big O","His triple-double record per season was not matched for 55 years"] },
  { player:"Jerry West", sport:"🏀 NBA", answer:"JERRY WEST MEDIUM", era:"legends", stats:{PTS:"31.3",AST:"7.2",REB:"4.4",FG:"47.6"}, ctx:"1969-70 NBA Season — Los Angeles Lakers Finals MVP", clues:["Won Finals MVP despite his team losing the series","The only Finals MVP from a losing team ever","Played for the Los Angeles Lakers","His silhouette is the NBA logo"] },
  { player:"Wilt Chamberlain", sport:"🏀 NBA", answer:"WILT MEDIUM", era:"legends", stats:{PTS:"50.4",REB:"25.7",AST:"2.4",FG:"50.6"}, ctx:"1961-62 NBA Season — Philadelphia Warriors all-time season", clues:["Averaged 50.4 PPG — the all-time NBA record","Scored 100 points in a single game this season","Played for the Philadelphia Warriors","Also averaged 25.7 rebounds per game — both all-time records"] },
  { player:"Bill Russell", sport:"🏀 NBA", answer:"BILL RUSSELL MEDIUM", era:"legends", stats:{REB:"22.9",PTS:"14.1",BLK:"8.0",TITLES:"5"}, ctx:"1961-62 NBA Season — Boston Celtics dynasty peak", clues:["Won 5 consecutive NBA championships as captain","Led the NBA in rebounds this season","Played for Boston Celtics his entire career","Was player-coach for his last 3 championships"] },
  { player:"Bob Pettit", sport:"🏀 NBA", answer:"BOB PETTIT", era:"legends", stats:{PTS:"29.2",REB:"20.3",AST:"3.1",FG:"42.2"}, ctx:"1961-62 NBA Season — St. Louis Hawks All-Star", clues:["Was the first player in NBA history to score 20000 career points","Played for the St. Louis Hawks","Won the NBA MVP award twice","Was the first true power forward in NBA history"] },
  { player:"George Mikan", sport:"🏀 NBA", answer:"GEORGE MIKAN MEDIUM", era:"legends", stats:{PTS:"22.3",REB:"13.4",FG:"40.4",TITLES:"4"}, ctx:"1951-52 NBA Season — Minneapolis Lakers dynasty", clues:["Led Minneapolis Lakers to 4 NBA titles in 5 years","Considered the first true dominant big man in basketball","The NBA widened the lane twice because of him","Wore thick glasses while playing"] },
  { player:"Elvin Hayes", sport:"🏀 NBA", answer:"ELVIN HAYES LEGENDS", era:"classic", stats:{PTS:"28.4",REB:"17.1",BLK:"3.7",FG:"42.5"}, ctx:"1970-71 NBA Season — San Diego Rockets scoring leader", clues:["Led the NBA in rebounds this season","Played for the San Diego Rockets","Nicknamed The Big E","Won the NBA championship with Washington Bullets in 1978"] },
  { player:"Kareem Abdul-Jabbar", sport:"🏀 NBA", answer:"KAREEM LEGENDS", era:"classic", stats:{PTS:"31.7",REB:"16.0",BLK:"4.1",FG:"57.7"}, ctx:"1971-72 NBA Season — Milwaukee Bucks MVP", clues:["Won the second of his 6 MVP awards this season","Played for Milwaukee Bucks at this time","Developed the unstoppable skyhook shot","All-time NBA scoring leader with 38387 points"] },
  { player:"Dave Bing", sport:"🏀 NBA", answer:"DAVE BING", era:"legends", stats:{PTS:"27.1",AST:"7.1",REB:"4.5",FG:"46.9"}, ctx:"1967-68 NBA Season — Detroit Pistons scoring title", clues:["Won the NBA scoring title as a sophomore","Played for the Detroit Pistons","Was a 7x All-Star","Later became the mayor of Detroit"] },
  { player:"Spencer Haywood", sport:"🏀 NBA", answer:"HAYWOOD LEGENDS", era:"legends", stats:{PTS:"29.6",REB:"19.5",BLK:"2.8",FG:"50.9"}, ctx:"1969-70 ABA Season — Denver Rockets MVP and Rookie", clues:["Won both the ABA MVP and Rookie of the Year","Changed NBA eligibility rules by suing to enter the league early","Was one of the most dominant big men of the early 1970s","Played for the Denver Rockets in the ABA"] },
  { player:"Walter Davis", sport:"🏀 NBA", answer:"WALTER DAVIS", era:"classic", stats:{PTS:"24.8",AST:"4.3",REB:"3.5",FG:"54.3"}, ctx:"1978-79 NBA Season — Phoenix Suns All-Star", clues:["Won Rookie of the Year in 1978","Played for Phoenix Suns his entire prime career","Won an Olympic gold medal with the US in 1976","Nicknamed Sweet D for his smooth scoring"] },
  { player:"Truck Robinson", sport:"🏀 NBA", answer:"TRUCK ROBINSON", era:"classic", stats:{PTS:"22.7",REB:"15.7",FG:"53.3",YEAR:"1978"}, ctx:"1977-78 NBA Season — New Orleans Jazz rebounding title", clues:["Led the NBA in rebounding this season","Played for the New Orleans Jazz","Nicknamed Truck for his physical style of play","Was a 2x All-Star"] },
  { player:"Geoff Petrie", sport:"🏀 NBA", answer:"GEOFF PETRIE", era:"classic", stats:{PTS:"24.8",AST:"4.8",REB:"2.8",YEAR:"1971"}, ctx:"1970-71 NBA Season — Portland Trail Blazers co-Rookie of Year", clues:["Co-won Rookie of the Year with Dave Cowens","Played for the Portland Trail Blazers","Was a prolific scorer in the early 1970s","Was known as Machine Gun for his rapid-fire shooting"] },
  { player:"Roger Staubach", sport:"🏈 NFL", answer:"ROGER STAUBACH MEDIUM", era:"classic", stats:{YDS:"2620",TD:"18",INT:"9",RTG:"93.5"}, ctx:"1977 NFL Season — Dallas Cowboys passing title", clues:["Won the NFL passing title this season","Played for Dallas Cowboys","Served in the US Navy before his NFL career","Nicknamed Roger the Dodger for his scrambling ability"] },
  { player:"Terry Bradshaw", sport:"🏈 NFL", answer:"TERRY BRADSHAW MEDIUM", era:"classic", stats:{YDS:"318",TD:"4",INT:"1",RTG:"112.4"}, ctx:"Super Bowl XIII MVP — Pittsburgh Steelers vs Dallas Cowboys", clues:["Won his second consecutive Super Bowl MVP","Played for Pittsburgh Steelers","Won 4 Super Bowls in his career","Later became a famous television analyst"] },
  { player:"Fran Tarkenton", sport:"🏈 NFL", answer:"FRAN TARKENTON", era:"classic", stats:{YDS:"3468",TD:"25",INT:"21",RTG:"82.7"}, ctx:"1975 NFL Season — Minnesota Vikings", clues:["Played for the Minnesota Vikings and New York Giants","Was the all-time leader in passing yards when he retired","Reached 3 Super Bowls with the Vikings but lost all of them","Was one of the first scrambling quarterbacks"] },
  { player:"Bob Griese", sport:"🏈 NFL", answer:"BOB GRIESE", era:"classic", stats:{YDS:"1422",TD:"17",INT:"8",RTG:"93.9"}, ctx:"1972 NFL Season — Miami Dolphins perfect season", clues:["Led the Miami Dolphins to the only perfect season in NFL history","Had a broken leg and was replaced by Earl Morrall for much of the year","Played for the Miami Dolphins","Finished 17-0 including the Super Bowl"] },
  { player:"Ken Stabler", sport:"🏈 NFL", answer:"KEN STABLER", era:"classic", stats:{YDS:"2737",TD:"27",INT:"17",RTG:"103.7"}, ctx:"1976 NFL Season — Oakland Raiders MVP", clues:["Won the NFL MVP award this season","Led Oakland Raiders to a Super Bowl win","Nicknamed The Snake","Was a left-handed quarterback"] },
  { player:"Jim Plunkett", sport:"🏈 NFL", answer:"JIM PLUNKETT", era:"classic", stats:{YDS:"261",TD:"2",INT:"0",RTG:"107.2"}, ctx:"Super Bowl XV MVP — Oakland Raiders vs Philadelphia Eagles", clues:["Won the Super Bowl MVP with the Oakland Raiders","Was a castoff who had been given up on by two previous teams","Won the Heisman Trophy at Stanford","Won 2 Super Bowls with the Raiders"] },
  { player:"Chuck Foreman", sport:"🏈 NFL", answer:"CHUCK FOREMAN", era:"classic", stats:{REC:"73",YDS:"691",RUSH:"860",TD:"22"}, ctx:"1975 NFL Season — Minnesota Vikings All-Pro", clues:["Led the NFL in touchdowns with 22","Played for the Minnesota Vikings","Was one of the first great receiving running backs","Was a 5x Pro Bowl selection"] },
  { player:"Ahmad Rashad", sport:"🏈 NFL", answer:"AHMAD RASHAD", era:"classic", stats:{REC:"80",YDS:"1095",TD:"9",YEAR:"1979"}, ctx:"1979 NFL Season — Minnesota Vikings All-Pro", clues:["Made a miracle catch to get Minnesota to the playoffs","Played for the Minnesota Vikings","Was a 4x Pro Bowl wide receiver","Was previously known by a different name earlier in his career"] },
  { player:"Jack Lambert", sport:"🏈 NFL", answer:"JACK LAMBERT", era:"classic", stats:{INT:"6",FF:"3",SACK:"5",YEAR:"1976"}, ctx:"1976 NFL Season — Pittsburgh Steelers Defensive MVP", clues:["Won the Defensive Player of the Year award","Was the heart of the Steel Curtain defense","Played for Pittsburgh Steelers","Was known for his toothless grin and ferocious play"] },
  { player:"Mean Joe Greene", sport:"🏈 NFL", answer:"MEAN JOE GREENE", era:"classic", stats:{SACK:"11",FF:"4",DPOY:"2",YEAR:"1974"}, ctx:"1974 NFL Season — Pittsburgh Steelers Defensive Player of Year", clues:["Won Defensive Player of the Year for the second time","Was the anchor of the famous Steel Curtain defense","Played for Pittsburgh Steelers","Famous for a Coca-Cola commercial throwing his jersey to a boy"] },
  { player:"Franco Harris", sport:"🏈 NFL", answer:"FRANCO HARRIS", era:"classic", stats:{CAR:"262",YDS:"1246",TD:"10",YPC:"4.8"}, ctx:"1975 NFL Season — Pittsburgh Steelers All-Pro", clues:["Was the key runner for the dominant Steelers dynasty","Made the famous Immaculate Reception in 1972","Played for Pittsburgh Steelers","Won 4 Super Bowls with the Steelers"] },
  { player:"Mel Blount", sport:"🏈 NFL", answer:"MEL BLOUNT", era:"classic", stats:{INT:"11",PD:"20",DPOY:"1",YEAR:"1975"}, ctx:"1975 NFL Season — Pittsburgh Steelers Defensive Player of Year", clues:["Won the Defensive Player of the Year award","His physical style of play led to new contact rules for cornerbacks","Played for Pittsburgh Steelers","Won 4 Super Bowls with the Steelers"] },
  { player:"Harold Carmichael", sport:"🏈 NFL", answer:"HAROLD CARMICHAEL", era:"classic", stats:{REC:"67",YDS:"1116",TD:"11",STREAK:"127"}, ctx:"1979 NFL Season — Philadelphia Eagles All-Pro", clues:["Caught a pass in 127 consecutive games — an NFL record at the time","Was 6ft 8in — one of the tallest wide receivers in NFL history","Played for the Philadelphia Eagles","Was a 4x Pro Bowl selection"] },
  { player:"Charlie Joiner", sport:"🏈 NFL", answer:"CHARLIE JOINER", era:"classic", stats:{REC:"71",YDS:"1132",TD:"7",YEAR:"1980"}, ctx:"1980 NFL Season — San Diego Chargers Air Coryell offense", clues:["Was part of the legendary Air Coryell passing attack","Was the all-time reception leader when he retired","Played for San Diego Chargers","Was known for his precise route running"] },
  { player:"John Riggins", sport:"🏈 NFL", answer:"JOHN RIGGINS", era:"classic", stats:{CAR:"375",YDS:"1347",TD:"24",YEAR:"1983"}, ctx:"1983 NFL Season — Washington Redskins rushing record", clues:["Set the NFL single-season rushing TD record with 24","Played for the Washington Redskins","Won the Super Bowl XVII MVP the year before","Nicknamed The Diesel"] },
  { player:"Otto Graham", sport:"🏈 NFL", answer:"OTTO GRAHAM MEDIUM", era:"legends", stats:{YDS:"2816",TD:"25",INT:"12",RTG:"98.4"}, ctx:"1953 NFL Season — Cleveland Browns champion", clues:["Appeared in 10 consecutive championship games and won 7","Led Cleveland Browns to another championship","Was the face of the most dominant dynasty in early professional football","From Waukegan, Illinois"] },
  { player:"Elroy Hirsch", sport:"🏈 NFL", answer:"ELROY HIRSCH MEDIUM", era:"legends", stats:{REC:"66",YDS:"1495",TD:"17",YPR:"22.7"}, ctx:"1951 NFL Season — Los Angeles Rams record season", clues:["Set records that stood for decades this season","Caught 17 touchdown passes","Played for the Los Angeles Rams","Nicknamed Crazylegs for his unusual running style"] },
  { player:"Bobby Layne", sport:"🏈 NFL", answer:"BOBBY LAYNE MEDIUM", era:"legends", stats:{YDS:"2403",TD:"16",INT:"21",COMP:"48.9"}, ctx:"1953 NFL Championship — Detroit Lions consecutive titles", clues:["Led Detroit Lions to back-to-back NFL championships","Played for the Detroit Lions","Was known for his leadership and colorful lifestyle","Was traded to Pittsburgh and reportedly cursed the Lions for 50 years"] },
  { player:"Red Grange", sport:"🏈 NFL", answer:"RED GRANGE MEDIUM", era:"legends", stats:{TD:"7",RUSH:"363",REC:"32",YEAR:"1927"}, ctx:"Career — The Galloping Ghost who legitimized the NFL", clues:["Was the first superstar of the NFL and made it nationally relevant","Nicknamed The Galloping Ghost for his elusiveness","Played for the Chicago Bears","His signing drew enormous crowds and legitimized pro football"] },
  { player:"Bronko Nagurski", sport:"🏈 NFL", answer:"BRONKO NAGURSKI MEDIUM", era:"legends", stats:{RUSH:"533",TD:"7",YPC:"4.4",YEAR:"1934"}, ctx:"1934 NFL Season — Chicago Bears fullback", clues:["Was considered the most feared runner in early NFL history","Played for the Chicago Bears","Came out of retirement at age 35 and helped win a championship","Also a professional wrestler who was world heavyweight champion"] },
  { player:"Don Hutson", sport:"🏈 NFL", answer:"DON HUTSON MEDIUM", era:"legends", stats:{REC:"74",YDS:"1211",TD:"17",YPR:"16.4"}, ctx:"1942 NFL Season — Green Bay Packers MVP", clues:["Won the MVP award in consecutive years (1941-42)","Set records that stood for decades","Played for the Green Bay Packers","Is credited with inventing the modern wide receiver position"] },
  { player:"Sammy Baugh", sport:"🏈 NFL", answer:"SAMMY BAUGH MEDIUM", era:"legends", stats:{YDS:"1754",TD:"16",INT:"11",COMP:"56.2"}, ctx:"1945 NFL Season — Washington Redskins three-way leader", clues:["Led the NFL in passing, punting, AND interceptions in the same season","Played for the Washington Redskins","Nicknamed Slingin Sammy","Is considered the greatest quarterback of the pre-modern era"] },
  { player:"Charley Trippi", sport:"🏈 NFL", answer:"CHARLEY TRIPPI MEDIUM", era:"legends", stats:{RUSH:"206",REC:"76",PASS:"130",TD:"8"}, ctx:"1947 NFL Championship — Chicago Cardinals winners", clues:["Led the Chicago Cardinals to their only NFL title","Was an All-American at Georgia","Could run, pass, catch, and return kicks at an elite level","Part of the Dream Backfield that won the 1947 championship"] },
  { player:"Steve Van Buren", sport:"🏈 NFL", answer:"STEVE VAN BUREN MEDIUM", era:"legends", stats:{CAR:"217",YDS:"1146",TD:"14",YPC:"5.3"}, ctx:"1945 NFL Season — Philadelphia Eagles rushing title", clues:["Led the NFL in rushing yards and touchdowns","Played for the Philadelphia Eagles","Led the Eagles to back-to-back NFL championships in 1948-49","The Eagles wore sneakers on icy field in the 1948 Championship"] },
  { player:"Marion Motley", sport:"🏈 NFL", answer:"MARION MOTLEY MEDIUM", era:"legends", stats:{CAR:"140",YDS:"810",AVG:"5.8",TD:"8"}, ctx:"1948 AAFC Season — Cleveland Browns champion", clues:["Won the AAFC championship with Cleveland Browns","Led the AAFC in rushing yards","Was one of the first Black players in professional football","Was a trailblazer for racial integration in pro football"] },
  { player:"Dante Lavelli", sport:"🏈 NFL", answer:"DANTE LAVELLI MEDIUM", era:"legends", stats:{REC:"47",YDS:"843",TD:"9",YPR:"17.9"}, ctx:"1946 AAFC Season — Cleveland Browns first champion", clues:["Won the AAFC championship in the league's very first season","Played for the Cleveland Browns","Nicknamed Gluefingers for his catching ability","Won 3 AAFC and 3 NFL championships"] },
  { player:"Bill Dudley", sport:"🏈 NFL", answer:"BILL DUDLEY MEDIUM", era:"legends", stats:{YDS:"604",INT:"10",RETURN:"385",TD:"6"}, ctx:"1946 NFL MVP Season — Pittsburgh Steelers", clues:["Won the NFL MVP award as the most versatile player","Led the NFL in rushing, interceptions, AND return yards","Played for the Pittsburgh Steelers","Nicknamed Bullet Bill"] },
  { player:"Ken Strong", sport:"🏈 NFL", answer:"KEN STRONG MEDIUM", era:"legends", stats:{PTS:"64",RUSH:"219",KICK:"9FG",YEAR:"1934"}, ctx:"1934 NFL Championship — New York Giants sneakers game", clues:["Scored 17 points in the famous Sneakers Game championship","Giants players changed into basketball shoes at halftime for traction","Played for the New York Giants","Was both a runner and a kicker"] },
  { player:"Spec Sanders", sport:"🏈 NFL", answer:"SPEC SANDERS MEDIUM", era:"legends", stats:{YDS:"1432",TD:"19",REC:"24",AVG:"8.6"}, ctx:"1947 AAFC Season — New York Yankees rushing leader", clues:["Led the AAFC in rushing AND scoring this season","Played for the New York Yankees football team","Was a dual threat runner and receiver","Had one of the most dominant individual seasons in AAFC history"] },
  { player:"Norm Van Brocklin", sport:"🏈 NFL", answer:"NORM VAN BROCKLIN MEDIUM", era:"legends", stats:{YDS:"554",TD:"5",COMP:"27",DATE:"Sept 28 1951"}, ctx:"Sept 28 1951 — Single game NFL passing yards record", clues:["Set the all-time single-game passing yards record (554)","Played for the Los Angeles Rams","Nicknamed The Dutchman","Won NFL championships as both a player and head coach"] },
  { player:"Tom Fears", sport:"🏈 NFL", answer:"TOM FEARS MEDIUM", era:"legends", stats:{REC:"77",YDS:"1013",TD:"9",YPR:"13.2"}, ctx:"1949 NFL Season — Los Angeles Rams receiving record", clues:["Set the NFL single-season receptions record with 77","Won the NFL championship with the Rams in 1951","Played for the Los Angeles Rams","Was one of the first great wide receivers of the modern era"] },
  { player:"George McAfee", sport:"🏈 NFL", answer:"GEORGE MCAFEE MEDIUM", era:"legends", stats:{AVG:"8.0",TD:"5",INT:"7",YEAR:"1941"}, ctx:"1941 NFL Season — Chicago Bears All-Pro", clues:["Was the most dangerous return man of his era","Played for the Chicago Bears","Won 2 NFL championships with Chicago","Was nicknamed One Play McAfee for his big-play ability"] },
  { player:"Dub Jones", sport:"🏈 NFL", answer:"DUB JONES MEDIUM", era:"legends", stats:{TD:"6",DATE:"Nov 25 1951",RUSH:"4",REC:"2"}, ctx:"Nov 25 1951 — Six touchdowns in one game vs Pittsburgh", clues:["Scored 6 touchdowns in a single game vs the Pittsburgh Steelers","Played for the Cleveland Browns","Tied Ernie Nevers NFL record for TDs in a game","His son Bert Jones also played quarterback in the NFL"] },
  { player:"Mac Speedie", sport:"🏈 NFL", answer:"MAC SPEEDIE MEDIUM", era:"legends", stats:{REC:"62",YDS:"1028",TD:"8",YPR:"16.6"}, ctx:"1947 AAFC Season — Cleveland Browns champion", clues:["Led the AAFC in receiving this season","Played alongside Dante Lavelli for the Cleveland Browns","Was considered one of the best receivers of the late 1940s","Later left to play in the Canadian Football League"] },
  { player:"Frankie Albert", sport:"🏈 NFL", answer:"FRANKIE ALBERT MEDIUM", era:"legends", stats:{YDS:"1847",TD:"29",INT:"10",COMP:"53.7"}, ctx:"1948 AAFC Season — San Francisco 49ers pioneer", clues:["Was the first great quarterback in San Francisco 49ers history","Led the 49ers in the AAFC for years","Was a left-handed quarterback — extremely rare in professional football","From Glendale, California"] },
  { player:"Tiger Woods", sport:"⛳ Golf", answer:"TIGER WOODS MEDIUM", era:"modern", stats:{WINS:"9",MAJORS:"3",AVG:"68.56",CUTS:"20"}, ctx:"2000 PGA Tour Season — Won 3 of 4 majors", clues:["Won 3 of 4 majors this year","Made every single cut on tour","Won the US Open by 15 strokes","The last name is a large wild animal"] },
  { player:"Phil Mickelson", sport:"⛳ Golf", answer:"PHIL MICKELSON MEDIUM", era:"modern", stats:{WINS:"4",MAJORS:"1",AVG:"69.1",EARN:"$4.7M"}, ctx:"2004 PGA Tour Season — First Masters title", clues:["Won his first Masters title after years of near misses","Had been called the best player without a major","Left-handed golfer nicknamed Lefty","Won by one shot at Augusta"] },
  { player:"Rory McIlroy", sport:"⛳ Golf", answer:"MCILROY MEDIUM", era:"modern", stats:{WINS:"5",MAJORS:"2",AVG:"68.83",EARN:"$8.3M"}, ctx:"2014 PGA Tour Season — Two majors and FedEx Cup", clues:["Won The Open Championship and PGA Championship this year","Won the FedEx Cup","From Holywood County Down Northern Ireland","Won 4 majors before age 26"] },
  { player:"Jordan Spieth", sport:"⛳ Golf", answer:"JORDAN SPIETH MEDIUM", era:"modern", stats:{WINS:"5",MAJORS:"2",AVG:"68.91",EARN:"$12.0M"}, ctx:"2015 PGA Tour Season — Masters and US Open", clues:["Won The Masters and US Open in the same year","Led every major at some point this year","From Dallas Texas","Won 3 major championships before age 24"] },
  { player:"Dustin Johnson", sport:"⛳ Golf", answer:"DUSTIN JOHNSON MEDIUM", era:"modern", stats:{SCORE:"-20",MARGIN:"5",R4:"68",YEAR:"2020"}, ctx:"2020 Masters — Record-setting win", clues:["Won The Masters by 5 shots setting the all-time scoring record","Set the 72-hole scoring record at Augusta at -20","From Columbia South Carolina","Won 2 major championships in his career"] },
  { player:"Brooks Koepka", sport:"⛳ Golf", answer:"BROOKS KOEPKA MEDIUM", era:"modern", stats:{WINS:"2",MAJORS:"2",YEAR:"2018",OPEN:"US"}, ctx:"2018 US Open — Back-to-back US Open champion", clues:["Won the US Open for the second consecutive year","Won 4 major championships in his career","From West Palm Beach Florida","Joined LIV Golf in 2022"] },
  { player:"Vijay Singh", sport:"⛳ Golf", answer:"VIJAY SINGH MEDIUM", era:"modern", stats:{WINS:"9",MAJORS:"1",AVG:"69.0",EARN:"$10.9M"}, ctx:"2004 PGA Tour Season — Dethroned Tiger Woods at No. 1", clues:["Won 9 tournaments and became World No. 1","Dethroned Tiger Woods at the top of the rankings","From Lautoka Fiji — first Fijian to reach World No. 1","Known for his intense practice work ethic"] },
  { player:"Ernie Els", sport:"⛳ Golf", answer:"ERNIE ELS MEDIUM", era:"classic", stats:{WINS:"4",MAJORS:"2",AVG:"69.8",EARN:"$6.8M"}, ctx:"1997 PGA Tour Season — Two US Open champion", clues:["Won 2 US Opens and 2 British Opens in his career","Nicknamed The Big Easy for his smooth swing","From Johannesburg South Africa","Won the US Open in 1994 and 1997"] },
  { player:"Sergio Garcia", sport:"⛳ Golf", answer:"SERGIO GARCIA MEDIUM", era:"modern", stats:{SCORE:"-9",PLAYOFF:"W",YEAR:"2017",HOLES:"1"}, ctx:"2017 Masters — First major after years of near misses", clues:["Won his first major at The Masters at age 37","Had been considered the best player without a major","From Borriol Spain","Beat Justin Rose in a playoff at Augusta"] },
  { player:"Adam Scott", sport:"⛳ Golf", answer:"ADAM SCOTT MEDIUM", era:"modern", stats:{SCORE:"-9",PLAYOFF:"W",YEAR:"2013",NATION:"Australia"}, ctx:"2013 Masters — First Australian Masters winner", clues:["Became the first Australian to win The Masters","Won in a playoff over Angel Cabrera","From Adelaide South Australia","Was coached by Butch Harmon and worked with caddie Steve Williams"] },
  { player:"Henrik Stenson", sport:"⛳ Golf", answer:"HENRIK STENSON MEDIUM", era:"modern", stats:{SCORE:"-20",R4:"63",MARGIN:"3",YEAR:"2016"}, ctx:"2016 British Open — Epic duel with Mickelson", clues:["Won The Open Championship in an epic duel with Phil Mickelson","Shot 63 in the final round to win","From Gothenburg Sweden","Was nicknamed The Iceman for his calm demeanor"] },
  { player:"Justin Thomas", sport:"⛳ Golf", answer:"JUSTIN THOMAS MEDIUM", era:"modern", stats:{WINS:"5",MAJORS:"1",AVG:"69.18",EARN:"$9.9M"}, ctx:"2017 PGA Tour Season — PGA Championship and FedEx Cup", clues:["Won the PGA Championship and FedEx Cup this year","From Louisville Kentucky","Best friend with Jordan Spieth on tour","Won his second major at the 2022 PGA Championship"] },
  { player:"Jon Rahm", sport:"⛳ Golf", answer:"JON RAHM MEDIUM", era:"modern", stats:{SCORE:"-6",MARGIN:"1",YEAR:"2021",OPEN:"US"}, ctx:"2021 US Open — Jon Rahm wins first major", clues:["Won his first major at the US Open","Had tested positive for COVID two weeks before and had to withdraw while leading","From Barrika Spain","Later moved to LIV Golf in 2024"] },
  { player:"Lee Trevino", sport:"⛳ Golf", answer:"LEE TREVINO MEDIUM", era:"classic", stats:{WINS:"4",MAJORS:"2",EARN:"$3.2M",YEAR:"1971"}, ctx:"1971 PGA Tour — Three Opens in three weeks", clues:["Won the US Open Canadian Open and British Open in the same month","Won 6 major championships total","From Dallas Texas","Nicknamed Super Mex"] },
  { player:"Nick Faldo", sport:"⛳ Golf", answer:"NICK FALDO MEDIUM", era:"classic", stats:{WINS:"4",MAJORS:"2",AVG:"69.90",YEAR:"1990"}, ctx:"1990 PGA Tour Season — Masters and British Open", clues:["Won The Masters and The Open Championship this year","Won 6 major championships total","From Welwyn Garden City England","Rebuilt his swing from scratch with coach David Leadbetter"] },
  { player:"Seve Ballesteros", sport:"⛳ Golf", answer:"SEVE MEDIUM", era:"classic", stats:{WINS:"4",MAJORS:"1",AVG:"70.20",YEAR:"1984"}, ctx:"1984 British Open at St Andrews", clues:["Won The Open Championship at the home of golf","Won 5 major championships in his career","From Pedrena Spain","Pioneered European golf as a global force and inspired the Ryder Cup revival"] },
  { player:"Jack Nicklaus", sport:"⛳ Golf", answer:"JACK NICKLAUS MEDIUM", era:"classic", stats:{WINS:"7",MAJORS:"3",AVG:"70.2",YEAR:"1972"}, ctx:"1972 PGA Tour Season — Two majors", clues:["Won The Masters and US Open in the same year","Known as The Golden Bear","Holds the record for most major championships (18)","From Columbus Ohio"] },
  { player:"Tom Watson", sport:"⛳ Golf", answer:"TOM WATSON MEDIUM", era:"classic", stats:{WINS:"6",MAJORS:"2",EARN:"$1.2M",YEAR:"1982"}, ctx:"1982 PGA Tour Season — US Open and British Open double", clues:["Won the US Open with a famous chip-in on 17 at Pebble Beach","Won The Open Championship the same year","Won 8 majors total","From Kansas City Missouri"] },
  { player:"Greg Norman", sport:"⛳ Golf", answer:"GREG NORMAN MEDIUM", era:"classic", stats:{WINS:"3",MAJORS:"1",AVG:"69.10",YEAR:"1993"}, ctx:"1993 PGA Tour Season — British Open", clues:["Won The Open Championship this year by 2 shots","Reached World No. 1 for 331 weeks","From Mount Isa Queensland Australia","Nicknamed The Great White Shark"] },
  { player:"Curtis Strange", sport:"⛳ Golf", answer:"CURTIS STRANGE MEDIUM", era:"classic", stats:{WINS:"3",MAJORS:"2",EARN:"$1.1M",YEAR:"1989"}, ctx:"1989 PGA Tour Season — US Open back-to-back", clues:["Won the US Open for the second consecutive year","First player to earn over $1 million in a season","From Norfolk Virginia","Back-to-back US Open wins are extremely rare in golf"] },
  { player:"Sandy Lyle", sport:"⛳ Golf", answer:"SANDY LYLE MEDIUM", era:"classic", stats:{WINS:"2",MAJORS:"2",EARN:"$1.6M",YEAR:"1988"}, ctx:"1988 Masters — First British winner at Augusta", clues:["Became the first British player to win The Masters","His famous bunker shot on 18 is one of golf's most iconic moments","From Shrewsbury England of Scottish descent","Also won The Open Championship in 1985"] },
  { player:"Larry Mize", sport:"⛳ Golf", answer:"LARRY MIZE MEDIUM", era:"classic", stats:{CHIP:"45yds",HOLE:"11",PLAYOFF:"W",OPP:"Norman"}, ctx:"1987 Masters playoff — Famous chip-in vs Greg Norman", clues:["Chipped in from 45 yards on the 11th hole to beat Greg Norman","From Augusta Georgia — a hometown hero","Won in a sudden death playoff","This was his only major championship"] },
  { player:"Fred Couples", sport:"⛳ Golf", answer:"FRED COUPLES MEDIUM", era:"classic", stats:{WINS:"4",MAJORS:"1",AVG:"69.38",YEAR:"1992"}, ctx:"1992 Masters — Fred Couples wins first major", clues:["Won The Masters for his only major championship","His ball famously stayed on the bank on 12 and he made birdie","From Seattle Washington","Known as Boom Boom for his long driving"] },
  { player:"Bernhard Langer", sport:"⛳ Golf", answer:"BERNHARD LANGER MEDIUM", era:"classic", stats:{WINS:"4",MAJORS:"2",RYDER:"19.5",YEAR:"1993"}, ctx:"1993 Masters — Augusta National second win", clues:["Won his second Masters title this year","Won 2 Masters Championships","From Anhausen West Germany","Had the yips and reinvented his putting stroke"] },
  { player:"Hale Irwin", sport:"⛳ Golf", answer:"HALE IRWIN MEDIUM", era:"classic", stats:{WINS:"3",MAJORS:"1",AGE:"45",YEAR:"1990"}, ctx:"1990 US Open — Won at age 45", clues:["Won the US Open at age 45 — the oldest major winner at the time","Won 3 US Opens in his career","From Joplin Missouri","Was also a scholarship football player at the University of Colorado"] },
  { player:"Davis Love III", sport:"⛳ Golf", answer:"DAVIS LOVE MEDIUM", era:"classic", stats:{SCORE:"-11",MARGIN:"5",R4:"71",YEAR:"1997"}, ctx:"1997 PGA Championship — Kiawah Island", clues:["Won the PGA Championship at Kiawah Island","Dedicated the win to his father who died in a plane crash","From Charlotte North Carolina","Later became a prominent Ryder Cup captain"] },
  { player:"Ian Woosnam", sport:"⛳ Golf", answer:"IAN WOOSNAM MEDIUM", era:"classic", stats:{WINS:"1",MAJORS:"1",RANK:"1",YEAR:"1991"}, ctx:"1991 Masters — Welsh champion reaches World No. 1", clues:["Won The Masters and became World No. 1","Only 5ft 4in — one of the shortest players to reach World No. 1","From Oswestry England of Welsh descent","Was known for his incredible distance given his small stature"] },
  { player:"Mark O'Meara", sport:"⛳ Golf", answer:"MARK OMEARA MEDIUM", era:"classic", stats:{WINS:"2",MAJORS:"2",AVG:"70.47",YEAR:"1998"}, ctx:"1998 PGA Tour Season — Masters and British Open at age 41", clues:["Won The Masters and The Open Championship in the same year at age 41","Was a close friend of Tiger Woods for many years","From Goldsboro North Carolina","Won both his majors in his late 30s and early 40s"] },
  { player:"Bob Tway", sport:"⛳ Golf", answer:"BOB TWAY MEDIUM", era:"classic", stats:{SCORE:"-12",BUNKER:"1",HOLE:"18",OPP:"Norman"}, ctx:"1986 PGA Championship — Bunker shot to beat Norman", clues:["Holed out from a bunker on the 72nd hole to win the PGA Championship","Came from behind to beat Greg Norman","From Oklahoma City Oklahoma","Greg Norman suffered multiple late-charge collapses in his career"] },
  { player:"Payne Stewart", sport:"⛳ Golf", answer:"PAYNE STEWART MEDIUM", era:"classic", stats:{PUTT:"1",HOLE:"18",YEAR:"1999",OPEN:"US"}, ctx:"1999 US Open — Pinehurst No. 2", clues:["Sank the winning putt on the 18th to win the US Open","Was killed in a plane crash 4 months after this win","From Springfield Missouri","Known for wearing knickerbockers and tam o'shanter caps"] },
  { player:"Bobby Orr", sport:"🏒 NHL", answer:"BOBBY ORR MEDIUM", era:"classic", stats:{G:"46",AST:"102",PTS:"148",PM:"+124"}, ctx:"1970-71 NHL Season — Boston Bruins scoring leader", clues:["Defenseman who led the entire league in scoring","Played for Boston Bruins","Revolutionized the defenseman position","Won 8 consecutive Norris Trophies"] },
  { player:"Gordie Howe", sport:"🏒 NHL", answer:"GORDIE HOWE MEDIUM", era:"legends", stats:{G:"49",AST:"46",PTS:"95",PIM:"72"}, ctx:"1952-53 NHL Season — Detroit Red Wings", clues:["Known as Mr. Hockey","Played for Detroit Red Wings","Played in 5 different decades of professional hockey","A Gordie Howe Hat Trick is a goal, assist, and fight in one game"] },
  { player:"Jean Beliveau", sport:"🏒 NHL", answer:"JEAN BELIVEAU MEDIUM", era:"legends", stats:{G:"37",AST:"69",PTS:"106",PIM:"38"}, ctx:"1964-65 NHL Season — Montreal Canadiens Hart Trophy MVP", clues:["Won the Hart Trophy as league MVP","Won 10 Stanley Cups as a player","Played for Montreal Canadiens","Was offered the position of Governor General of Canada and declined"] },
  { player:"Maurice Richard", sport:"🏒 NHL", answer:"ROCKET RICHARD MEDIUM", era:"legends", stats:{G:"50",AST:"25",PTS:"75",PIM:"75"}, ctx:"1944-45 NHL Season — First to score 50 goals in 50 games", clues:["First player to score 50 goals in 50 games — a record for 36 years","Played for Montreal Canadiens","Nicknamed The Rocket","The Richard Riot in 1955 showed his extraordinary popularity in Montreal"] },
  { player:"Bobby Hull", sport:"🏒 NHL", answer:"BOBBY HULL MEDIUM", era:"legends", stats:{G:"54",AST:"43",PTS:"97",PIM:"70"}, ctx:"1965-66 NHL Season — Chicago Blackhawks goals record", clues:["Scored 54 goals — first player to score 50 twice","Played for Chicago Blackhawks","Known as The Golden Jet for his speed and blonde hair","Was the first player to score 50 goals in a season twice"] },
  { player:"Phil Esposito", sport:"🏒 NHL", answer:"PHIL ESPOSITO MEDIUM", era:"classic", stats:{G:"76",AST:"76",PTS:"152",PIM:"71"}, ctx:"1970-71 NHL Season — Boston Bruins goals record", clues:["Scored 76 goals — shattering the previous record","Played for Boston Bruins alongside Bobby Orr","His record stood until Gretzky broke it","Italian-Canadian player who transformed the center position"] },
  { player:"Terry Sawchuk", sport:"🏒 NHL", answer:"TERRY SAWCHUK MEDIUM", era:"legends", stats:{GAA:"1.90",SO:"12",W:"44",YEAR:"1952"}, ctx:"1951-52 NHL Season — Detroit Red Wings Vezina winner", clues:["Won the Vezina Trophy with a 1.90 GAA and 12 shutouts","All-time NHL leader in shutouts with 103","Played for Detroit Red Wings among others","Won 4 Stanley Cups in his career"] },
  { player:"Glenn Hall", sport:"🏒 NHL", answer:"GLENN HALL MEDIUM", era:"legends", stats:{GAA:"2.10","SV%":".918",SO:"7",STREAK:"502"}, ctx:"Career — Played 502 consecutive complete games", clues:["Played 502 consecutive complete games — a record that will never be broken","Won 3 Vezina Trophies as best goaltender","Nicknamed Mr. Goalie","Was so nervous before games he would vomit every pre-game"] },
  { player:"Jacques Plante", sport:"🏒 NHL", answer:"JACQUES PLANTE MEDIUM", era:"legends", stats:{GAA:"2.11",SO:"82",VEZINA:"7",MASK:"1"}, ctx:"Career — Inventor of the goalie mask", clues:["First goaltender to regularly wear a mask after being cut by a shot in 1959","Won 7 Vezina Trophies as best goaltender","Won 6 Stanley Cups with Montreal Canadiens","First goaltender to roam from the crease regularly"] },
  { player:"Elmer Lach", sport:"🏒 NHL", answer:"ELMER LACH MEDIUM", era:"legends", stats:{G:"26",AST:"54",PTS:"80",YEAR:"1945"}, ctx:"1944-45 NHL Season — Punch Line center", clues:["Was the center of the famous Punch Line with Rocket Richard and Toe Blake","Won the Hart Trophy as league MVP this season","Won 3 Stanley Cups with Montreal","Was known as a superb passer who set up Richard"] },
  { player:"Nels Stewart", sport:"🏒 NHL", answer:"NELS STEWART MEDIUM", era:"legends", stats:{G:"324",PTS:"515",YEAR:"1940",TEAMS:"3"}, ctx:"Career — First NHL player to score 300 goals", clues:["Was the first player in NHL history to score 300 career goals","Played for the Montreal Maroons, Boston Bruins, and New York Americans","Won the Hart Trophy twice as league MVP","Nicknamed Old Poison for his deadly shooting"] },
  { player:"Cy Denneny", sport:"🏒 NHL", answer:"CY DENNENY MEDIUM", era:"legends", stats:{G:"318",YEAR:"1929",TEAM:"Senators",CUPS:"4"}, ctx:"Career — Ottawa Senators early NHL scoring leader", clues:["Was the NHL all-time leading scorer when he retired","Won 4 Stanley Cups with the Ottawa Senators","Was one of the top goal scorers of the early NHL era","Played in the NHL's first season in 1917-18"] },
  { player:"Toe Blake", sport:"🏒 NHL", answer:"TOE BLAKE MEDIUM", era:"legends", stats:{G:"26",AST:"43",PTS:"69",YEAR:"1945"}, ctx:"1944-45 NHL Season — Montreal Canadiens Hart Trophy MVP", clues:["Won the Hart Trophy as league MVP","Won the NHL scoring title this year","Won 3 Stanley Cups as a player","Won 8 Stanley Cups as coach of the Montreal Canadiens"] },
  { player:"Milt Schmidt", sport:"🏒 NHL", answer:"MILT SCHMIDT MEDIUM", era:"legends", stats:{G:"27",AST:"35",PTS:"62",YEAR:"1952"}, ctx:"Career — Boston Bruins center and team leader", clues:["Was the captain of the Boston Bruins for many years","Won 2 Stanley Cups with the Bruins","Was part of the famous Kraut Line","Later coached the Bruins and managed the team"] },
  { player:"Frank Mahovlich", sport:"🏒 NHL", answer:"FRANK MAHOVLICH MEDIUM", era:"legends", stats:{G:"48",AST:"32",PTS:"80",PIM:"131"}, ctx:"1960-61 NHL Season — Toronto Maple Leafs record", clues:["Scored 48 goals this season — a Maple Leafs record at the time","Played for Toronto Maple Leafs and Montreal Canadiens","Nicknamed The Big M","Won 6 Stanley Cups in his career"] },
  { player:"Red Kelly", sport:"🏒 NHL", answer:"RED KELLY MEDIUM", era:"legends", stats:{G:"20",AST:"50",PTS:"70",YEAR:"1960"}, ctx:"Career — Two-position champion and politician", clues:["Won 4 Stanley Cups with Detroit and 4 more with Toronto — 8 total","Won the Norris Trophy as best defenseman in 1954","Later transitioned to play center — rare for a defenseman","Also served as a Member of Parliament while playing hockey"] },
  { player:"Doug Bentley", sport:"🏒 NHL", answer:"DOUG BENTLEY", era:"legends", stats:{G:"33",AST:"40",PTS:"73",YEAR:"1943"}, ctx:"1942-43 NHL Season — Chicago Blackhawks scoring title", clues:["Won the NHL scoring title this season","Played for Chicago Blackhawks alongside his brothers Max and Reg","Was part of one of hockey's greatest sibling trios","Was an All-Star despite never winning a Stanley Cup"] },
  { player:"Max Bentley", sport:"🏒 NHL", answer:"MAX BENTLEY", era:"legends", stats:{G:"29",AST:"43",PTS:"72",YEAR:"1946"}, ctx:"1945-46 NHL Season — Chicago Blackhawks MVP", clues:["Won the Hart Trophy as league MVP this season","Nicknamed The Dipsy-Doodle Dandy from Delisle for his stickhandling","Was traded in the most shocking deal of his era for 5 players","Won Stanley Cups with the Toronto Maple Leafs"] },
  { player:"Greg Maddux", sport:"⚾ MLB", answer:"GREG MADDUX", era:"modern", stats:{ERA:"3.16",W:"355",SO:"3371",CY:"4"}, ctx:"Career Totals — 4 consecutive Cy Young Awards", clues:["Won 4 consecutive Cy Young Awards 1992-1995","Won 355 career games","From Las Vegas Nevada — nicknamed The Professor","Played for the Cubs Braves and Dodgers"] },
  { player:"Pedro Martinez", sport:"⚾ MLB", answer:"PEDRO MARTINEZ", era:"modern", stats:{ERA:"2.93",W:"219",CY:"3",ERA_PLUS:"154"}, ctx:"Career Totals — Highest ERA+ of any 200-win pitcher", clues:["Had an ERA+ of 154 — highest ever for a 200-win pitcher","Won 3 Cy Young Awards","From Manoguayabo Dominican Republic","Had arguably the greatest 3-year stretch in pitching history 1997-2000"] },
  { player:"Roger Clemens", sport:"⚾ MLB", answer:"ROGER CLEMENS", era:"modern", stats:{W:"354",SO:"4672",ERA:"3.12",CY:"7"}, ctx:"Career Totals — 7 Cy Young Awards the most ever", clues:["Won 7 Cy Young Awards — the most by any pitcher in history","Struck out 4672 batters","From Dayton Ohio","Was called The Rocket for his fastball"] },
  { player:"Orel Hershiser", sport:"⚾ MLB", answer:"OREL HERSHISER", era:"classic", stats:{STREAK:"59",ERA:"2.26",W:"23",YEAR:"1988"}, ctx:"Best Season — 59 consecutive scoreless innings in 1988", clues:["Set the all-time record for consecutive scoreless innings with 59","Won the NL Cy Young and World Series MVP that year","Played for the Los Angeles Dodgers","Nicknamed Bulldog by manager Tommy Lasorda"] },
  { player:"Curt Schilling", sport:"⚾ MLB", answer:"CURT SCHILLING", era:"modern", stats:{W:"216",SO:"3116",SOCK:"Bloody",YEAR:"2004"}, ctx:"Career Totals — The Bloody Sock World Series hero", clues:["Pitched through a sutured torn tendon in the famous Bloody Sock game","Won 216 career games","Was voted into the Hall of Fame after years of controversy","From Anchorage Alaska"] },
  { player:"Tom Glavine", sport:"⚾ MLB", answer:"TOM GLAVINE", era:"modern", stats:{W:"305",ERA:"3.54",CY:"2",YEAR:"1998"}, ctx:"Career Totals — Won 305 games as the finesse left-hander", clues:["Won 305 career games with 2 Cy Young Awards","Played for the Atlanta Braves alongside Maddux and Smoltz","From Concord Massachusetts","Was also a highly recruited hockey player growing up"] },
  { player:"Sandy Koufax", sport:"⚾ MLB", answer:"SANDY KOUFAX", era:"classic", stats:{ERA:"2.76",W:"165",NO_H:"4",CY:"3"}, ctx:"Career Totals — 4 no-hitters and 3 Cy Youngs before age 31", clues:["Threw 4 no-hitters including a perfect game","Won 3 Cy Young Awards in 4 years","Played for the Los Angeles Dodgers","Retired at 30 due to severe arthritis — many say he was the best ever"] },
  { player:"Bob Gibson", sport:"⚾ MLB", answer:"BOB GIBSON", era:"legends", stats:{ERA:"1.12",W:"22",SO:"268",YEAR:"1968"}, ctx:"Best Season — 1.12 ERA in 1968 changed baseball rules", clues:["Had a 1.12 ERA so dominant that MLB lowered the pitching mound the next year","Won both the Cy Young and MVP","Played for the St. Louis Cardinals","Was one of the most intimidating pitchers of his era"] },
  { player:"Tom Seaver", sport:"⚾ MLB", answer:"TOM SEAVER", era:"classic", stats:{W:"311",ERA:"2.86",SO:"3640",CY:"3"}, ctx:"Career Totals — Tom Terrific with 3 Cy Youngs", clues:["Won 311 games with a 2.86 career ERA","Won 3 Cy Young Awards","Led the 1969 Miracle Mets to the World Series","Nicknamed Tom Terrific"] },
  { player:"Juan Marichal", sport:"⚾ MLB", answer:"JUAN MARICHAL", era:"classic", stats:{W:"243",ERA:"2.89",CG:"244",KICK:"High leg"}, ctx:"Career Totals — Dominican Dandy with the famous high leg kick", clues:["Won 243 games with a 2.89 ERA","Known for his distinctive high leg kick delivery","Played for the San Francisco Giants","From Laguna Verde Dominican Republic — nickname The Dominican Dandy"] },
  { player:"Whitey Ford", sport:"⚾ MLB", answer:"WHITEY FORD", era:"classic", stats:{PCT:".690",W:"236",ERA:"2.75",WS:"Record"}, ctx:"Career Totals — Highest winning percentage of any 200-win pitcher", clues:["Had a .690 winning percentage — highest for any 200-win pitcher","Won 236 games for the New York Yankees","Holds the World Series record for consecutive scoreless innings","Nicknamed The Chairman of the Board"] },
  { player:"Fergie Jenkins", sport:"⚾ MLB", answer:"FERGIE JENKINS", era:"classic", stats:{W:"284",SO:"3192",BB:"997",CANADA:"First HoF"}, ctx:"Career Totals — First Canadian in the Baseball Hall of Fame", clues:["Was the first Canadian player inducted into the Baseball Hall of Fame","Won 284 games with remarkable control — only 997 walks in 4500+ innings","Won the NL Cy Young in 1971","From Chatham Ontario Canada"] },
  { player:"Gaylord Perry", sport:"⚾ MLB", answer:"GAYLORD PERRY", era:"classic", stats:{W:"314",CY:"2",BOTH:"AL and NL",SPITTER:"Suspected"}, ctx:"Career Totals — Won Cy Young in both leagues", clues:["Won the Cy Young Award in both the AL and NL — first pitcher to do so","Always suspected of throwing a spitball but rarely caught","Won 314 career games","Wrote a book called Me and the Spitter"] },
  { player:"Jim Palmer", sport:"⚾ MLB", answer:"JIM PALMER", era:"classic", stats:{W:"268",ERA:"2.86",CY:"3",SLAM:"None given up"}, ctx:"Career Totals — Never gave up a grand slam in his career", clues:["Never allowed a grand slam in his entire career","Won 3 Cy Young Awards with the Baltimore Orioles","Won 268 games","Was also a famous Jockey underwear model"] },
  { player:"Walter Johnson", sport:"⚾ MLB", answer:"WALTER JOHNSON", era:"legends", stats:{W:"417",ERA:"2.17",SO:"3508",SHO:"110"}, ctx:"Career Totals — The Big Train of Washington", clues:["Won 417 games — second most all-time","Pitched his entire career for the Washington Senators","Nicknamed The Big Train for his blazing fastball","Had 110 career shutouts — the most in baseball history"] },
  { player:"Christy Mathewson", sport:"⚾ MLB", answer:"CHRISTY MATHEWSON", era:"legends", stats:{W:"373",ERA:"2.13",SO:"2507",PITCH:"Fadeaway"}, ctx:"Career Totals — Gentleman pitcher of the Giants", clues:["Won 373 games with a 2.13 ERA","Invented the fadeaway pitch now called a screwball","Played for the New York Giants","Was considered a gentleman and role model in an era of rough players"] },
  { player:"Ty Cobb", sport:"⚾ MLB", answer:"TY COBB", era:"legends", stats:{AVG:".366",H:"4189",SB:"897",TITLES:"12"}, ctx:"Career Totals — Highest batting average in history", clues:["Holds the highest career batting average in history at .366","Had 4189 career hits — second most all-time","Won 12 batting titles","From Narrows Georgia — was one of baseballs most feared players"] },
  { player:"Babe Ruth", sport:"⚾ MLB", answer:"BABE RUTH", era:"legends", stats:{HR:"714",RBI:"2213",AVG:".342",SLG:".690"}, ctx:"Career Totals — The Sultan of Swat", clues:["Hit 714 home runs — held the record for 39 years","Had a career slugging percentage of .690 — the all-time record","Also had a career ERA of 2.28 as a pitcher before converting to outfield","From Baltimore Maryland"] },
  { player:"Rogers Hornsby", sport:"⚾ MLB", answer:"ROGERS HORNSBY", era:"legends", stats:{AVG:".358",HR:"301",RBI:"1584",TITLES:"7"}, ctx:"Career Totals — Greatest right-handed hitter in history", clues:["Had a career batting average of .358 — second highest in history","Won 7 batting titles including 5 consecutive","Won the Triple Crown twice","Refused to read or go to movies to protect his eyesight"] },
  { player:"Lou Gehrig", sport:"⚾ MLB", answer:"LOU GEHRIG", era:"legends", stats:{HR:"493",RBI:"1995",AVG:".340",STREAK:"2130"}, ctx:"Career Totals — The Iron Horse", clues:["Played 2130 consecutive games — a record for 56 years","Had 1995 career RBI — second most all-time","Played for the New York Yankees alongside Babe Ruth","His farewell speech after being diagnosed with ALS is the most moving in sports history"] },
  { player:"Shoeless Joe Jackson", sport:"⚾ MLB", answer:"SHOELESS JOE JACKSON", era:"legends", stats:{AVG:".356",H:"1772",TRIPLES:"168",BAN:"Lifetime"}, ctx:"Career Totals — Third highest average ever with a lifetime ban", clues:["Had the third highest career batting average in history at .356","Was banned from baseball for life after the 1919 Black Sox scandal","From Brandon Mills South Carolina","Was considered the purest natural hitter of the dead ball era"] },
  { player:"Honus Wagner", sport:"⚾ MLB", answer:"HONUS WAGNER", era:"legends", stats:{AVG:".328",H:"3420",SB:"723",CARD:"Most valuable"}, ctx:"Career Totals — The Flying Dutchman shortstop", clues:["His 1909 baseball card sold for over 6 million — the most valuable ever","Won 8 batting titles in his career","Played for the Pittsburgh Pirates his entire career","Nicknamed The Flying Dutchman — considered the greatest shortstop ever"] },
  { player:"Lefty Grove", sport:"⚾ MLB", answer:"LEFTY GROVE", era:"legends", stats:{W:"300",ERA:"3.06",PCT:".680",MVP:"1931"}, ctx:"Career Totals — .680 winning percentage and MVP", clues:["Won 300 games with a .680 winning percentage — one of the best ever","Won the MVP award in 1931 going 31-4","Played for the Philadelphia Athletics and Boston Red Sox","Considered one of the best left-handed pitchers in baseball history"] },
  { player:"Nap Lajoie", sport:"⚾ MLB", answer:"NAP LAJOIE", era:"legends", stats:{AVG:".338",H:"3242",RBI:"1599",NAMED:"Team"}, ctx:"Career Totals — The team was named after him", clues:["Had a career batting average of .338","The Cleveland team was renamed the Naps after him","Won the batting title 4 times","Was considered the best second baseman of the dead ball era"] },
  { player:"Tris Speaker", sport:"⚾ MLB", answer:"TRIS SPEAKER", era:"legends", stats:{AVG:".345",DOUBLES:"792",H:"3514",CF:"Greatest"}, ctx:"Career Totals — Most doubles ever and greatest defensive CF", clues:["Has the most doubles in baseball history with 792","Had 3514 career hits — fourth most all-time","Was considered the greatest defensive center fielder who ever lived","Played for the Red Sox and Cleveland Indians"] },
  { player:"Hack Wilson", sport:"⚾ MLB", answer:"HACK WILSON", era:"legends", stats:{HR:"56",RBI:"191",AVG:".307",YEAR:"1930"}, ctx:"Best Season — 56 HR and 191 RBI in 1930", clues:["Holds the all-time MLB record for RBI in a season with 191","Hit 56 home runs — still the NL record","Played for the Chicago Cubs","Was only 5ft 6in and 195 pounds"] },
  { player:"Harry Heilmann", sport:"⚾ MLB", answer:"HARRY HEILMANN", era:"legends", stats:{AVG:".342",TITLES:"4",ODD:"Odd years only",YEAR:"1927"}, ctx:"Career Totals — Won batting title only in odd years", clues:["Won 4 batting titles — all in odd years 1921 1923 1925 1927","Had a career batting average of .342","Played for the Detroit Tigers under Ty Cobb as manager","Coached by Cobb who played for the same team"] },
  { player:"Pie Traynor", sport:"⚾ MLB", answer:"PIE TRAYNOR", era:"legends", stats:{AVG:".320",RBI:"1273",TEAM:"Pittsburgh",BEST:"3B of era"}, ctx:"Career Totals — Greatest third baseman of the pre-war era", clues:["Was consistently voted the greatest third baseman of his era","Played his entire career for the Pittsburgh Pirates","Batted .320 career average","Was named Harold Joseph but called Pie since childhood"] },
  { player:"Fernando Torres", sport:"⚽ Soccer", answer:"FERNANDO TORRES", era:"modern", stats:{G:"33",APP:"38",YEAR:"2008",NATION:"Spain"}, ctx:"Best Season — 33 Premier League goals in first Liverpool season", clues:["Scored 33 goals in his debut Premier League season","Played for Liverpool having come from Atletico Madrid","From Fuenlabrada Spain","Won the World Cup and European Championship with Spain"] },
  { player:"Wayne Rooney", sport:"⚽ Soccer", answer:"WAYNE ROONEY", era:"modern", stats:{G:"253",APP:"559",RECORD:"Man United",NATION:"England"}, ctx:"Career Totals — Manchester United and England all-time top scorer", clues:["Became Manchester United all-time record scorer with 253 goals","Was also England all-time top scorer","From Croxteth Liverpool","Was considered the most complete English player of his generation"] },
  { player:"Zlatan Ibrahimovic", sport:"⚽ Soccer", answer:"ZLATAN IBRAHIMOVIC", era:"modern", stats:{G:"570+",LEAGUES:"7",NATION:"Sweden",STYLE:"Acrobatic"}, ctx:"Career Totals — Won league titles in 7 different countries", clues:["Won league titles in the Netherlands Italy Spain France England and Sweden","Scored over 570 career goals","From Malmo Sweden","Was known for outrageous goals and extraordinary self-confidence"] },
  { player:"Didier Drogba", sport:"⚽ Soccer", answer:"DIDIER DROGBA", era:"modern", stats:{G:"164",UCL:"2012",IVORY_COAST:"Peace",APP:"381"}, ctx:"Career Totals — Chelsea legend who helped stop a civil war", clues:["Is credited with helping temporarily stop a civil war in the Ivory Coast","Scored the equalizer in the 2012 Champions League Final","Scored 164 goals for Chelsea","Won 4 Premier League titles with Chelsea"] },
  { player:"Patrick Kluivert", sport:"⚽ Soccer", answer:"PATRICK KLUIVERT", era:"classic", stats:{G:"40",UCL:"18yo",YEAR:"1995",NATION:"Netherlands"}, ctx:"Career Totals — Scored winning Champions League goal at age 18", clues:["Scored the winning goal in the 1995 Champions League Final aged just 18","Played for Ajax and FC Barcelona","From Amsterdam Netherlands","Was considered one of the most talented strikers of the late 1990s"] },
  { player:"Gabriel Batistuta", sport:"⚽ Soccer", answer:"GABRIEL BATISTUTA", era:"classic", stats:{G:"54",NATION:"Argentina",CLUB:"Fiorentina",NICK:"Batigol"}, ctx:"Career Totals — Argentina all-time top scorer", clues:["Was Argentina all-time top scorer with 54 goals","Played for Fiorentina for years becoming a legend","Nicknamed Batigol","From Reconquista Argentina"] },
  { player:"Hristo Stoichkov", sport:"⚽ Soccer", answer:"HRISTO STOICHKOV", era:"classic", stats:{BALLON:"1",YEAR:"1994",BARCA:"4 La Liga",NATION:"Bulgaria"}, ctx:"Career Totals — Ballon d Or winner and 1994 World Cup Golden Boot", clues:["Won the Ballon d Or in 1994","Led Bulgaria to a shocking World Cup semifinal","Won 4 consecutive La Liga titles with Barcelona under Johan Cruyff","From Plovdiv Bulgaria"] },
  { player:"Gheorghe Hagi", sport:"⚽ Soccer", answer:"GHEORGHE HAGI", era:"classic", stats:{G:"35",NATION:"Romania",NICK:"Maradona of Carpathians",YEAR:"1994"}, ctx:"Career Totals — The Maradona of the Carpathians", clues:["Led Romania to the 1994 World Cup quarterfinals","Nicknamed The Maradona of the Carpathians","Played for Real Madrid Galatasaray and Barcelona","From Sacele Romania"] },
  { player:"Jari Litmanen", sport:"⚽ Soccer", answer:"JARI LITMANEN", era:"classic", stats:{G:"32",UCL:"1995",NATION:"Finland",KING:"Ajax"}, ctx:"Career Totals — The King of Ajax from Finland", clues:["Was the creative genius behind the 1995 Ajax Champions League winners","Nicknamed The King at Ajax","From Hollola Finland — the greatest Finnish player ever","Played for Ajax Barcelona and Liverpool"] },
  { player:"Johan Cruyff", sport:"⚽ Soccer", answer:"JOHAN CRUYFF", era:"legends", stats:{BALLON:"3",TURN:"Named after him",TOTAL:"Football",YEAR:"1974"}, ctx:"Career Totals — 3 Ballons d Or and creator of Total Football", clues:["Won 3 Ballon d Or awards","Developed Total Football as a tactical system with Ajax and the Netherlands","The Cruyff Turn is named after him from the 1974 World Cup","Never won the World Cup despite being the best player in 1974"] },
  { player:"Sandor Kocsis", sport:"⚽ Soccer", answer:"SANDOR KOCSIS", era:"legends", stats:{G:"11",APP:"6",YEAR:"1954",HEAD:"Golden"}, ctx:"1954 World Cup — 11 goals in 6 games as the Golden Head", clues:["Scored 11 goals in 6 games at the 1954 World Cup","Nicknamed The Golden Head for his aerial ability","Hungary was considered the best team in the world but lost the final","Scored 75 goals in 68 games for Hungary"] },
  { player:"Stanley Matthews", sport:"⚽ Soccer", answer:"STANLEY MATTHEWS", era:"legends", stats:{CAREER:"33 years",BALLON:"1956",FA_CUP:"1953",WIZARD:"Dribbling"}, ctx:"Career Totals — Played top-flight football until age 50", clues:["Played in the First Division until age 50 — a record that will never be broken","Won the first ever Ballon d Or in 1956","The 1953 FA Cup Final is called The Matthews Final in his honor","Nicknamed The Wizard of the Dribble"] },
  { player:"Tostao", sport:"⚽ Soccer", answer:"TOSTAO", era:"classic", stats:{G:"8",APP:"54",YEAR:"1970",EYE:"Surgery pre-WC"}, ctx:"1970 World Cup — Won despite needing pre-tournament eye surgery", clues:["Won the World Cup with the legendary 1970 Brazil team","Nearly missed the tournament after needing emergency eye surgery","Played alongside Pele Rivelino and Jairzinho","Retired at age 26 on medical advice"] },
  { player:"Raymond Kopa", sport:"⚽ Soccer", answer:"RAYMOND KOPA", era:"legends", stats:{BALLON:"1958",UCL:"3",NATION:"France",FIRST:"French Ballon"}, ctx:"Career Totals — First French Ballon d Or winner", clues:["Won the Ballon d Or in 1958 — the first French player to do so","Won 3 consecutive European Cups with Real Madrid","From Noeux-les-Mines France of Polish descent","Was part of the Real Madrid dynasty alongside Di Stefano"] },
  { player:"Helmut Rahn", sport:"⚽ Soccer", answer:"HELMUT RAHN", era:"legends", stats:{G:"21",WC_FINAL:"Winner",YEAR:"1954",NICK:"Der Boss"}, ctx:"1954 World Cup Final — Scored the winner in the Miracle of Bern", clues:["Scored the winning goal in the 1954 World Cup Final for West Germany","West Germany beat heavily favored Hungary in the Miracle of Bern","Played for Rot-Weiss Essen in Germany","Nicknamed Der Boss"] },
  { player:"Pete Sampras", sport:"🎾 Tennis", answer:"PETE SAMPRAS", era:"modern", stats:{GS:"14",WIMB:"7",RANK:"1",WEEKS:"286"}, ctx:"Career Totals — 14 Grand Slams and 286 weeks at World No. 1", clues:["Won 14 Grand Slam titles in his career","Spent 286 weeks at World No. 1 — a record at the time","Won Wimbledon 7 times and the US Open 5 times","From Washington DC — nickname Pistol Pete"] },
  { player:"Andre Agassi", sport:"🎾 Tennis", answer:"ANDRE AGASSI", era:"modern", stats:{GS:"8",SLAM:"Career",RANK:"1",YEAR:"1999"}, ctx:"Career Totals — Won all 4 Grand Slams completing Career Grand Slam", clues:["Won all 4 Grand Slam titles to complete the Career Grand Slam","Was once ranked No. 141 before coming back to win more majors","From Las Vegas Nevada","Was married to Brooke Shields and later Steffi Graf"] },
  { player:"Stefan Edberg", sport:"🎾 Tennis", answer:"STEFAN EDBERG", era:"modern", stats:{GS:"6",RANK:"1",SPORTSMANSHIP:"Award named",YEAR:"1990"}, ctx:"Career Totals — Serve-volley champion with sportsmanship award named after him", clues:["Won 6 Grand Slam titles","Was a classic serve and volley player","The Stefan Edberg Sportsmanship Award is named after him","From Vastervik Sweden"] },
  { player:"Boris Becker", sport:"🎾 Tennis", answer:"BORIS BECKER", era:"modern", stats:{GS:"6",WIMB:"3",AGE:"17",YEAR:"1985"}, ctx:"Career Totals — Won Wimbledon at 17 then 5 more Slams", clues:["Won Wimbledon at age 17 — the youngest winner ever","Won 6 Grand Slam titles in his career","From Leimen West Germany","Was known for his big serve and diving volleys"] },
  { player:"Martina Hingis", sport:"🎾 Tennis", answer:"MARTINA HINGIS", era:"modern", stats:{GS:"5",RANK:"1",AGE:"16",YEAR:"1997"}, ctx:"Career Totals — Youngest World No. 1 in history at age 16", clues:["Won 5 Grand Slam singles titles","Was the youngest player to reach World No. 1 at age 16","From Kosice Czechoslovakia but representing Switzerland","Was named after Martina Navratilova by her tennis-playing mother"] },
  { player:"Lindsay Davenport", sport:"🎾 Tennis", answer:"LINDSAY DAVENPORT", era:"modern", stats:{GS:"3",RANK:"1",WIMB:"1",YEAR:"1998"}, ctx:"Career Totals — World No. 1 American champion with 3 Slams", clues:["Won 3 Grand Slam titles and reached World No. 1","Won the US Open Australian Open and Wimbledon","From Palos Verdes California","Was known for her powerful groundstrokes"] },
  { player:"Venus Williams", sport:"🎾 Tennis", answer:"VENUS WILLIAMS", era:"modern", stats:{GS:"7",WIMB:"5",PIONEER:"Yes",YEAR:"2001"}, ctx:"Career Totals — 7 Grand Slams and trailblazer", clues:["Won 7 Grand Slam singles titles","Won Wimbledon 5 times","From Compton California","Was a trailblazer for Black players in tennis alongside her sister Serena"] },
  { player:"Kim Clijsters", sport:"🎾 Tennis", answer:"KIM CLIJSTERS", era:"modern", stats:{GS:"4",US:"3",COMEBACK:"3 slams as mom",YEAR:"2009"}, ctx:"Career Totals — Won 3 Slams after coming out of retirement", clues:["Won 4 Grand Slam titles in her career","Made a remarkable comeback winning 3 slams after retiring","Won 3 US Opens and 1 Australian Open","From Bilzen Belgium"] },
  { player:"Justine Henin", sport:"🎾 Tennis", answer:"JUSTINE HENIN", era:"modern", stats:{GS:"7",FRENCH:"4",BACKHAND:"One-handed",YEAR:"2007"}, ctx:"Career Totals — 7 Slams with famous one-handed backhand", clues:["Won 7 Grand Slam titles in her career","Won the French Open 4 times without losing a set","Was known for her one-handed backhand — rare in womens tennis","From Liege Belgium"] },
  { player:"Amelie Mauresmo", sport:"🎾 Tennis", answer:"AMELIE MAURESMO", era:"modern", stats:{GS:"2",RANK:"1",AO:"1",YEAR:"2006"}, ctx:"Career Totals — French champion who won Australian Open and Wimbledon", clues:["Won the Australian Open and Wimbledon in 2006","Reached World No. 1 in 2004","From Saint-Germain-en-Laye France","Was known for her powerful serve and all-court game"] },
  { player:"Marat Safin Medium", sport:"🎾 Tennis", answer:"MARAT SAFIN MEDIUM", era:"modern", stats:{GS:"2",RANK:"1",TALENT:"Extraordinary",YEAR:"2000"}, ctx:"Career Totals — Won 2 Slams while smashing many rackets", clues:["Won the US Open in 2000 by destroying Pete Sampras in the final","Won 2 Grand Slam titles in his career","Was notorious for smashing rackets but had extraordinary talent","From Moscow Russia"] },
  { player:"Yevgeny Kafelnikov Medium", sport:"🎾 Tennis", answer:"YEVGENY KAFELNIKOV MEDIUM", era:"modern", stats:{GS:"2",RANK:"1",FIRST:"Russian Slam",YEAR:"1996"}, ctx:"Career Totals — First Russian man to win a Grand Slam", clues:["Was the first Russian man to win a Grand Slam singles title","Won 2 Grand Slam titles — French Open in 1996 and Australian Open in 1999","Reached World No. 1","From Sochi Russia"] },
  { player:"Ivan Lendl", sport:"🎾 Tennis", answer:"IVAN LENDL", era:"classic", stats:{GS:"8",RANK:"1",WEEKS:"270",WIMB:"0"}, ctx:"Career Totals — 8 Slams but never won Wimbledon", clues:["Won 8 Grand Slam titles but famously never won Wimbledon","Spent 270 weeks at World No. 1","Won the French Open three times and US Open three times","From Ostrava Czechoslovakia"] },
  { player:"John McEnroe", sport:"🎾 Tennis", answer:"JOHN MCENROE", era:"classic", stats:{GS:"7",RANK:"1",OUTBURSTS:"Famous",YEAR:"1984"}, ctx:"Career Totals — 7 Slams and the most famous outbursts in tennis", clues:["Won 7 Grand Slam titles","Had one of the greatest serve and volley games ever","From Wiesbaden West Germany but representing USA","Was notorious for on-court outbursts but had brilliant hands"] },
  { player:"Jimmy Connors", sport:"🎾 Tennis", answer:"JIMMY CONNORS", era:"classic", stats:{GS:"8",RANK:"1",FIGHTER:"Greatest",YEAR:"1974"}, ctx:"Career Totals — 8 Slams with the biggest fighting spirit", clues:["Won 8 Grand Slam titles including 5 US Opens","Spent 268 weeks at World No. 1","From East St. Louis Illinois","Was known for his relentless fighting spirit and two-handed backhand"] },
  { player:"Guillermo Vilas", sport:"🎾 Tennis", answer:"GUILLERMO VILAS", era:"classic", stats:{GS:"4",STREAK:"62 clay wins",POET:"Yes",YEAR:"1977"}, ctx:"Career Totals — 4 Slams and 62 consecutive clay court wins", clues:["Won 4 Grand Slam titles including 2 French Opens","Won 62 consecutive matches on clay in 1977","Was also a romantic poet who published books of poetry","From Mar del Plata Argentina"] },
  { player:"Chris Evert", sport:"🎾 Tennis", answer:"CHRIS EVERT", era:"classic", stats:{GS:"18",FRENCH:"7",RIVALRY:"Navratilova",YEAR:"1975"}, ctx:"Career Totals — 18 Slams with 7 French Opens", clues:["Won 18 Grand Slam titles in her career","Won the French Open 7 times","Had a famous rivalry with Martina Navratilova","From Fort Lauderdale Florida"] },
  { player:"Martina Navratilova", sport:"🎾 Tennis", answer:"MARTINA NAVRATILOVA", era:"classic", stats:{GS:"18",WIMB:"9",RANK:"1",NATION:"Czech-USA"}, ctx:"Career Totals — 9 Wimbledons and 18 Slams", clues:["Won 18 Grand Slam singles titles","Won Wimbledon 9 times — the most in the Open Era","From Prague Czechoslovakia who later represented the USA","Was known for her extraordinary fitness and serve-volley game"] },
  { player:"Arantxa Sanchez Vicario", sport:"🎾 Tennis", answer:"ARANTXA SANCHEZ VICARIO", era:"classic", stats:{GS:"4",FRENCH:"3",NICK:"Barcelona Bumblebee",YEAR:"1994"}, ctx:"Career Totals — 4 Slams and the Barcelona Bumblebee", clues:["Won 4 Grand Slam titles including 3 French Opens","Nicknamed The Barcelona Bumblebee for her tireless retrieving","From Barcelona Spain","Was ranked World No. 1 on two occasions"] },
  { player:"Monica Seles", sport:"🎾 Tennis", answer:"MONICA SELES", era:"classic", stats:{GS:"9",STABBING:"1993",RANK:"1",YEAR:"1991"}, ctx:"Career Totals — 9 Slams before being stabbed by a spectator", clues:["Won 9 Grand Slam titles before being stabbed by a spectator in 1993","Was ranked World No. 1 when the stabbing occurred","From Novi Sad Yugoslavia later representing the USA","Was known for her double-handed groundstrokes and famous grunting"] },
  { player:"Pat Cash", sport:"🎾 Tennis", answer:"PAT CASH", era:"classic", stats:{WIMB:"1",GS:"1",CLIMB:"Into stands",YEAR:"1987"}, ctx:"1987 Wimbledon — Won then famously climbed into the stands", clues:["Won Wimbledon for his only Grand Slam title","Famously climbed into the stands to celebrate with his family immediately after winning","From Melbourne Australia","Was known for his all-court aggressive game and headband"] },
  { player:"Goran Ivanisevic", sport:"🎾 Tennis", answer:"GORAN IVANISEVIC", era:"modern", stats:{WIMB:"1",WILDCARD:"2001",RANK:"125",YEAR:"2001"}, ctx:"2001 Wimbledon — Won as a wildcard ranked No. 125", clues:["Won Wimbledon as a wildcard when ranked No. 125 in the world","Was the first and only wildcard entry to win Wimbledon","From Split Croatia","Had a famous alter ego Goran who played more aggressively"] },
  { player:"Michael Stich", sport:"🎾 Tennis", answer:"MICHAEL STICH", era:"classic", stats:{WIMB:"1",GS:"1",BEAT:"Becker",YEAR:"1991"}, ctx:"1991 Wimbledon — Beat compatriot Becker in the final", clues:["Won Wimbledon beating compatriot Boris Becker in the final","Was always overshadowed by Becker in Germany despite winning a Grand Slam","From Elmshorn West Germany","Won Olympic gold in doubles that same year"] },
  { player:"Rod Laver", sport:"🎾 Tennis", answer:"ROD LAVER", era:"legends", stats:{GS:"11",SLAM:"2",ROCKET:"Nickname",YEAR:"1969"}, ctx:"Career Totals — Only player to win Calendar Grand Slam twice", clues:["Completed the Calendar Grand Slam twice — amateur 1962 and Open Era 1969","Won 11 Grand Slam titles in the Open Era alone","From Rockhampton Queensland Australia","Nicknamed The Rocket — the ATP Finals arena bears his name"] },
  { player:"Ken Rosewall", sport:"🎾 Tennis", answer:"KEN ROSEWALL", era:"legends", stats:{GS:"8",SPAN:"19 years",NICK:"Muscles",YEAR:"1972"}, ctx:"Career Totals — Won Grand Slams across three different decades", clues:["Won his first Grand Slam in 1953 and his last in 1972 — 19 years apart","Won 8 Grand Slam titles across three different decades","From Sydney Australia","Nicknamed Muscles despite his 5ft 7in slight frame"] },
  { player:"Roy Emerson", sport:"🎾 Tennis", answer:"ROY EMERSON", era:"legends", stats:{GS:"12",AO:"6",FITNESS:"Greatest",YEAR:"1965"}, ctx:"Career Totals — 12 Slams the most before Sampras", clues:["Won 12 Grand Slam titles — the most in history before Sampras","Won the Australian Open 6 times","From Blackbutt Queensland Australia","Was known for his extraordinary physical fitness"] },
  { player:"John Newcombe", sport:"🎾 Tennis", answer:"JOHN NEWCOMBE", era:"legends", stats:{GS:"7",WIMB:"3",MUSTACHE:"Famous",YEAR:"1971"}, ctx:"Career Totals — 7 Slams with the most famous mustache in tennis", clues:["Won 7 Grand Slam singles titles including 3 Wimbledons","Won 4 Davis Cups with Australia","From Sydney Australia","Was famous for his distinctive handlebar mustache"] },
  { player:"Margaret Court", sport:"🎾 Tennis", answer:"MARGARET COURT", era:"legends", stats:{GS:"24",SLAM:"1970",AO:"11",RECORD:"Most ever"}, ctx:"Career Totals — 24 Grand Slams — most in tennis history", clues:["Won 24 Grand Slam singles titles — the most in history","Won the Calendar Grand Slam in 1970","Won the Australian Open 11 times","From Albury New South Wales Australia"] },
  { player:"Althea Gibson", sport:"🎾 Tennis", answer:"ALTHEA GIBSON", era:"legends", stats:{GS:"5",WIMB:"2",FIRST:"Black player Slam",YEAR:"1957"}, ctx:"Career Totals — First Black player to win a Grand Slam", clues:["Was the first Black player to win a Grand Slam title","Won 5 Grand Slam singles titles including 2 Wimbledons","From Clarendon County South Carolina","Paved the way for Arthur Ashe and generations of Black tennis players"] },
  { player:"Pancho Gonzales Medium", sport:"🎾 Tennis", answer:"PANCHO GONZALES MEDIUM", era:"legends", stats:{GS:"2",PRO:"8 titles",SERVE:"Fastest era",YEAR:"1954"}, ctx:"Career Totals — Dominated professional tennis for a decade", clues:["Dominated professional tennis for a decade after winning 2 US Championships","Won 8 US Professional titles as a pro","From Los Angeles California of Mexican descent","Had the most feared serve of his era"] },
  { player:"Louise Brough", sport:"🎾 Tennis", answer:"LOUISE BROUGH", era:"legends", stats:{GS:"6",WIMB:"4",STREAK:"4 consecutive",YEAR:"1950"}, ctx:"Career Totals — 4 consecutive Wimbledon titles", clues:["Won 4 consecutive Wimbledon titles from 1948 to 1951","Won 6 Grand Slam singles titles total","From Oklahoma City Oklahoma","Won 13 Grand Slam doubles titles with partner Margaret du Pont"] },
  { player:"Pauline Betz", sport:"🎾 Tennis", answer:"PAULINE BETZ", era:"legends", stats:{GS:"4",US:"4",YEAR:"1946",BAN:"For talking to pros"}, ctx:"Career Totals — 4 US Championships then banned for talking to pros", clues:["Won 4 Grand Slam titles including 4 US Championships","Was banned from amateur tennis for merely talking to a professional promoter","From Dayton Ohio","Had her career cut short by the ban despite being the worlds best player"] },
  { player:"Frank Sedgman", sport:"🎾 Tennis", answer:"FRANK SEDGMAN", era:"legends", stats:{GS:"5",WIMB:"1",DAVIS:"3",YEAR:"1952"}, ctx:"Career Totals — First Australian to dominate world tennis", clues:["Won 5 Grand Slam titles and 3 Davis Cups with Australia","Was the first Australian to dominate world tennis internationally","From Mount Albert Victoria Australia","Turned professional in 1953 ending his amateur run"] },
  { player:"Lew Hoad Medium", sport:"🎾 Tennis", answer:"LEW HOAD MEDIUM", era:"legends", stats:{GS:"4",WIMB:"2",IDOL:"Laver",YEAR:"1956"}, ctx:"Career Totals — 4 Slams and Rod Laver idol", clues:["Won 4 Grand Slam titles including 2 Wimbledons","Rod Laver idolized him and modeled his game after him","From Glebe New South Wales Australia","Had his career hampered by serious back problems"] },
  { player:"Tony Trabert Medium", sport:"🎾 Tennis", answer:"TONY TRABERT MEDIUM", era:"legends", stats:{GS:"5",YEAR:"1955",THREE:"French US Wimbledon",CINCY:"From"}, ctx:"Best Season — Won 3 Grand Slams in 1955", clues:["Won 3 Grand Slam titles in 1955 — French Open Wimbledon and US Championships","Won 5 Grand Slam titles in total","From Cincinnati Ohio","Was considered the finest American player of the mid-1950s"] },
  { player:"Jack Kramer Medium", sport:"🎾 Tennis", answer:"JACK KRAMER MEDIUM", era:"legends", stats:{GS:"3",WIMB:"1",PRO:"Dominated",YEAR:"1947"}, ctx:"Career Totals — Won Wimbledon then dominated professional tennis", clues:["Won 3 Grand Slam titles and Wimbledon in 1947","Dominated professional tennis for years after turning pro","From Las Vegas Nevada","Later became the most powerful administrator in tennis history"] },
  { player:"Virginia Ruzici", sport:"🎾 Tennis", answer:"VIRGINIA RUZICI", era:"classic", stats:{GS:"1",FRENCH:"1978",FIRST:"Romania",AGENT:"Later"}, ctx:"1978 French Open — First Romanian Grand Slam champion", clues:["Was the first Romanian woman to win a Grand Slam","Won the French Open in 1978","From Caransebes Romania","Later became a successful tennis agent"] },
  { player:"Ham Richardson Medium", sport:"🎾 Tennis", answer:"HAM RICHARDSON MEDIUM", era:"legends", stats:{GS:"2",RHODES:"Scholar",YEAR:"1956",NATION:"USA"}, ctx:"Career Totals — Rhodes Scholar and Grand Slam champion", clues:["Won 2 Grand Slam titles — French and Australian Championships","Was also a Rhodes Scholar who studied at Oxford","From Baton Rouge Louisiana","Was considered one of the most intellectually accomplished players in tennis history"] },
  { player:"Ashley Cooper Medium", sport:"🎾 Tennis", answer:"ASHLEY COOPER MEDIUM", era:"legends", stats:{GS:"4",WIMB:"1",RANK:"1",YEAR:"1958"}, ctx:"Career Totals — 4 Slams and World No. 1 in the late 1950s", clues:["Won 4 Grand Slam titles in his career","Won both Wimbledon and the US Championships in 1958","Was World No. 1 for two consecutive years","From Melbourne Victoria Australia"] },
  { player:"Neale Fraser Medium", sport:"🎾 Tennis", answer:"NEALE FRASER MEDIUM", era:"legends", stats:{GS:"3",WIMB:"1",DAVIS:"Captain",YEAR:"1960"}, ctx:"Career Totals — 3 Slams and legendary Davis Cup captain", clues:["Won 3 Grand Slam singles titles including Wimbledon and 2 US Championships","Later became a long-serving Australian Davis Cup captain","From Melbourne Victoria Australia","Was celebrated even more as a doubles player"] },
  { player:"Budge Patty", sport:"🎾 Tennis", answer:"BUDGE PATTY", era:"legends", stats:{GS:"2",WIMB:"1",PARIS:"1",YEAR:"1950"}, ctx:"Career Totals — Won Wimbledon and Roland Garros in same year", clues:["Won Wimbledon and the French Championships in the same year 1950","American player who lived most of his adult life in Paris","From Lovington Arkansas but based in Europe","Was known for his elegant stylish tennis"] },
  { player:"Harry Vardon", sport:"⛳ Golf", answer:"HARRY VARDON", era:"legends", stats:{OPEN:"6",RECORD:"Most British Opens",GRIP:"His name",YEAR:"1900"}, ctx:"Career Totals — 6 British Opens and the grip that bears his name", clues:["Won the British Open 6 times — still the all-time record","Won the US Open in 1900 during a North American tour","From Grouville Jersey Channel Islands","The overlapping golf grip is called the Vardon Grip"] },
  { player:"Cary Middlecoff", sport:"⛳ Golf", answer:"CARY MIDDLECOFF", era:"legends", stats:{MAJORS:"3",WINS:"40",DENTIST:"Former",SLOW:"Famous"}, ctx:"Career Totals — Dentist turned 3-time major champion", clues:["Won 3 major championships — 2 US Opens and 1 Masters","Gave up dentistry to pursue golf","From Hall Tennessee","Was notorious for his incredibly slow pace of play"] },
  { player:"Jimmy Demaret", sport:"⛳ Golf", answer:"JIMMY DEMARET", era:"legends", stats:{MASTERS:"3",WINS:"31",STYLE:"Colorful clothes",YEAR:"1950"}, ctx:"Career Totals — Three Masters wins with the most colorful wardrobe", clues:["Won The Masters 3 times — the first player to win it three times","Was known for his flamboyant colorful clothing on the course","From Houston Texas","Was also a television personality and entertainer"] },
  { player:"Art Wall Jr", sport:"⛳ Golf", answer:"ART WALL JR", era:"legends", stats:{ACE:"41",MASTERS:"1",POY:"1959",NICK:"Mr Hole in One"}, ctx:"1959 Masters — Champion nicknamed Mr Hole in One", clues:["Won The Masters and was PGA Player of the Year in 1959","Made 41 holes-in-one in his career","From Honesdale Pennsylvania","Was nicknamed Mr Hole in One for his extraordinary iron accuracy"] },
  { player:"Lloyd Mangrum", sport:"⛳ Golf", answer:"LLOYD MANGRUM", era:"legends", stats:{MAJORS:"1",US_OPEN:"1946",WINS:"36",WAR:"Purple Heart"}, ctx:"Career Totals — Purple Heart winner who became a major champion", clues:["Won the 1946 US Open in a playoff","Was wounded twice in World War II earning the Purple Heart","From Trenton Texas","Won 36 PGA Tour events in his career"] },
  { player:"Ralph Guldahl", sport:"⛳ Golf", answer:"RALPH GULDAHL", era:"legends", stats:{MAJORS:"3",US_OPEN:"2",STREAK:"Back-to-back",MYSTERY:"Lost his game"}, ctx:"Career Totals — Won 3 majors then mysteriously lost his game", clues:["Won the US Open in consecutive years 1937 and 1938 then The Masters in 1939","Mysteriously lost his entire game shortly after writing a golf instruction book","The theory is the book made him too conscious of his natural swing","From Dallas Texas"] },
  { player:"Bob Rosburg", sport:"⛳ Golf", answer:"BOB ROSBURG", era:"legends", stats:{MAJORS:"1",PGA:"1959",BROADCAST:"ABC Sports",YEAR:"1959"}, ctx:"1959 PGA Championship — Champion turned famous broadcaster", clues:["Won the 1959 PGA Championship","Later became a beloved golf announcer for ABC Sports","From San Francisco California","Was a Stanford University graduate"] },
  { player:"Martin Brodeur", sport:"🏒 NHL", answer:"MARTIN BRODEUR", era:"modern", stats:{W:"691",SO:"125",GAA:"2.24",CUPS:"3"}, ctx:"Career Totals — Most wins and shutouts in NHL history", clues:["Won 691 games — the most in NHL history","Had 125 career shutouts — the most in NHL history","Won 3 Stanley Cups with the New Jersey Devils","From Saint-Laurent Quebec"] },
  { player:"Dominik Hasek", sport:"🏒 NHL", answer:"DOMINIK HASEK", era:"modern", stats:{GAA:"2.20","SV%":".922",VEZINA:"6",NICK:"Dominator"}, ctx:"Career Totals — 6 Vezina Trophies as The Dominator", clues:["Won 6 Vezina Trophies as the best goaltender","Had a career save percentage of .922","Nicknamed The Dominator for his unorthodox but effective style","From Pardubice Czechoslovakia"] },
  { player:"Nicklas Lidstrom", sport:"🏒 NHL", answer:"NICKLAS LIDSTROM", era:"modern", stats:{NORRIS:"7",CUPS:"4",CALDER:"1",YEAR:"1991"}, ctx:"Career Totals — 7 Norris Trophies and 4 Stanley Cups", clues:["Won 7 Norris Trophies as best defenseman — the most ever","Won 4 Stanley Cups with the Detroit Red Wings","From Vasteras Sweden","Was considered the greatest European-born player in NHL history"] },
  { player:"Sergei Fedorov", sport:"🏒 NHL", answer:"SERGEI FEDOROV", era:"modern", stats:{PTS:"1179",CUPS:"3",HART:"1994",TWO_WAY:"Best"}, ctx:"Career Totals — Hart Trophy winner and the best two-way player ever", clues:["Won the Hart Trophy as league MVP in 1994","Won 3 Stanley Cups with the Detroit Red Wings","Was one of the most complete two-way players in NHL history","From Pskov Russia"] },
  { player:"Brendan Shanahan", sport:"🏒 NHL", answer:"BRENDAN SHANAHAN", era:"modern", stats:{G:"656",CUPS:"3",TOUGH:"And scorer",YEAR:"2002"}, ctx:"Career Totals — 656 goals while also fighting regularly", clues:["Scored 656 goals — 11th most in NHL history","Won 3 Stanley Cups with the Detroit Red Wings","Was unusual in combining prolific goal scoring with physical play","From Mimico Ontario"] },
  { player:"Scott Stevens", sport:"🏒 NHL", answer:"SCOTT STEVENS", era:"modern", stats:{CUPS:"3",CF:"Conn Smythe 2000",HITS:"Most feared",YEAR:"2000"}, ctx:"Career Totals — 3 Cups and the most feared open-ice hitter ever", clues:["Won 3 Stanley Cups with the New Jersey Devils","Won the Conn Smythe Trophy as playoff MVP in 2000","Was the most feared open-ice hitter in NHL history","From Kitchener Ontario"] },
  { player:"Mats Sundin", sport:"🏒 NHL", answer:"MATS SUNDIN", era:"modern", stats:{G:"564",FIRST:"Euro 1st overall",TORONTO:"Captain",GOLD:"Olympic x2"}, ctx:"Career Totals — First European drafted 1st overall with 564 goals", clues:["Was the first European player selected 1st overall in the NHL Draft in 1989","Scored 564 career goals as captain of the Toronto Maple Leafs","Won 2 Olympic gold medals with Sweden","From Bromma Sweden"] },
  { player:"Mike Modano", sport:"🏒 NHL", answer:"MIKE MODANO", era:"modern", stats:{G:"561",AMERICAN:"Most goals US born",DALLAS:"Stars",CUP:"1999"}, ctx:"Career Totals — Most goals ever by an American-born NHL player", clues:["Scored 561 goals — the most ever by an American-born player","Won the Stanley Cup with the Dallas Stars in 1999","From Livonia Michigan","Played his entire career with the Minnesota and Dallas Stars"] },
  { player:"Marc-Andre Fleury", sport:"🏒 NHL", answer:"MARC-ANDRE FLEURY", era:"modern", stats:{W:"551",CUPS:"3",FIRST:"2003 overall",YEAR:"2003"}, ctx:"Career Totals — 1st overall pick who won 551 games and 3 Cups", clues:["Was the 1st overall pick in the 2003 NHL Draft","Won 3 Stanley Cups with the Pittsburgh Penguins","Won 551 career games — fourth most in NHL history","From Sorel-Tracy Quebec"] },
  { player:"Roberto Luongo", sport:"🏒 NHL", answer:"ROBERTO LUONGO", era:"modern", stats:{W:"489",SO:"77",GAA:"2.52",GOLD:"2010 Olympic"}, ctx:"Career Totals — 489 wins and Olympic gold on home ice", clues:["Won 489 games — third most in NHL history","Won Olympic gold with Canada in 2010 in Vancouver on home ice","Played for Florida Panthers and Vancouver Canucks","From Montreal Quebec"] },
  { player:"Nicklas Backstrom", sport:"🏒 NHL", answer:"NICKLAS BACKSTROM", era:"modern", stats:{PTS:"1025+",CUP:"2018",PARTNER:"Ovechkin",SWEDEN:"Vasteras"}, ctx:"Career Totals — Set up Ovechkin for a decade then won the Cup", clues:["Was the primary center alongside Alexander Ovechkin","Won the Stanley Cup with the Washington Capitals in 2018","Accumulated over 1000 career points","From Vasteras Sweden"] },
  { player:"Jeremy Roenick", sport:"🏒 NHL", answer:"JEREMY ROENICK", era:"modern", stats:{G:"513",FIRST:"American 500 goals",OUTSPOKEN:"Yes",NATION:"USA"}, ctx:"Career Totals — One of first Americans to score 500 NHL goals", clues:["Was one of the first Americans to score 500 NHL goals","Scored 513 career goals","From Boston Massachusetts","Was known for his outspoken personality and willingness to speak his mind"] },
  { player:"Pierre Turgeon", sport:"🏒 NHL", answer:"PIERRE TURGEON", era:"modern", stats:{PTS:"1327",PICK:"1 overall 1987",G:"515",QUIET:"Overlooked"}, ctx:"Career Totals — 1st overall pick with 1327 career points often overlooked", clues:["Scored 1327 career points","Was the 1st overall pick in the 1987 NHL Draft by the Buffalo Sabres","Had 58 goals in one season for the New York Islanders","Is often overlooked despite his consistently elite production"] },
  { player:"Keith Tkachuk", sport:"🏒 NHL", answer:"KEITH TKACHUK", era:"modern", stats:{G:"538",FIRST:"American 50 goals",TEAM:"Coyotes",YEAR:"1996"}, ctx:"Career Totals — First American to score 50 goals in a season", clues:["Was the first American-born player to score 50 goals in a season","Scored 538 career goals","From Melrose Massachusetts","Played for the Winnipeg Jets Phoenix Coyotes and St. Louis Blues"] },
  { player:"Wayne Gretzky", sport:"🏒 NHL", answer:"WAYNE GRETZKY", era:"classic", stats:{PTS:"2857",ASSISTS:"1963",RECORDS:"61",NICK:"The Great One"}, ctx:"Career Totals — More career assists than any other player has total points", clues:["Has more career assists (1963) than any other player has total points","Holds 61 different NHL records","Won 4 Stanley Cups with the Edmonton Oilers","From Brantford Ontario — nicknamed The Great One"] },
  { player:"Mario Lemieux", sport:"🏒 NHL", answer:"MARIO LEMIEUX", era:"classic", stats:{PPG:"1.88",PTS:"1723",CANCER:"Overcame",CUPS:"2"}, ctx:"Career Totals — Second highest points-per-game average ever", clues:["Has the second highest career points-per-game average at 1.88","Won 2 Stanley Cups with the Pittsburgh Penguins","Overcame Hodgkin lymphoma and continued playing","From Montreal Quebec — nicknamed Le Magnifique"] },
  { player:"Mike Bossy", sport:"🏒 NHL", answer:"MIKE BOSSY", era:"classic", stats:{G:"573",STREAK:"9 seasons 50+ goals",CUPS:"4",RATIO:"Second ever"}, ctx:"Career Totals — Scored 50+ goals in all 9 of his NHL seasons", clues:["Scored 50 or more goals in each of his first 9 seasons — an NHL record","Won 4 Stanley Cups with the New York Islanders dynasty","Had the second highest goals-per-game ratio in NHL history","From Montreal Quebec"] },
  { player:"Mark Messier", sport:"🏒 NHL", answer:"MARK MESSIER", era:"classic", stats:{PTS:"1887",CUPS:"6",GUARANTEE:"1994",LEADER:"Greatest"}, ctx:"Career Totals — 6 Cups and the 1994 Guarantee game", clues:["Won 6 Stanley Cups — 5 with Edmonton and 1 with the New York Rangers","Guaranteed a Rangers win in the 1994 playoffs then delivered with a hat trick","From St. Albert Alberta","Is considered the greatest leader in NHL history"] },
  { player:"Jari Kurri", sport:"🏒 NHL", answer:"JARI KURRI", era:"classic", stats:{G:"601",CUPS:"5",GRETZKY:"Right wing partner",FINLAND:"First HoF"}, ctx:"Career Totals — 5 Cups as Gretzkys perfect right wing", clues:["Scored 601 career goals alongside Wayne Gretzky","Won 5 Stanley Cups with the Edmonton Oilers","Was the first Finn inducted into the Hockey Hall of Fame","From Helsinki Finland"] },
  { player:"Luc Robitaille", sport:"🏒 NHL", answer:"LUC ROBITAILLE", era:"classic", stats:{G:"668",LEFT_WING:"Most goals LW",CUPS:"1",MONTREAL:"Born"}, ctx:"Career Totals — Most goals ever by a left winger", clues:["Scored 668 goals — the most ever by a left winger in NHL history","Won the Stanley Cup with the Detroit Red Wings in 2002","From Montreal Quebec","Played for 9 different NHL teams in his career"] },
  { player:"Dale Hawerchuk", sport:"🏒 NHL", answer:"DALE HAWERCHUK", era:"classic", stats:{PTS:"1409",ROY:"1982",JETS:"Franchise player",DIED:"2020"}, ctx:"Career Totals — 1409 points and beloved Winnipeg Jets franchise player", clues:["Scored 1409 career points","Won the Calder Trophy as Rookie of the Year in 1982","Was the franchise player for the Winnipeg Jets for many years","Died from cancer in 2020 — greatly mourned across Canada"] },
  { player:"Peter Stastny", sport:"🏒 NHL", answer:"PETER STASTNY", era:"classic", stats:{PTS:"1239",DEFECT:"1980",DECADE:"2nd most 1980s",BROTHERS:"2 also NHL"}, ctx:"Career Totals — Defected from Czechoslovakia and had 2nd most 1980s points", clues:["Defected from Czechoslovakia in 1980 to play in the NHL","Had the second most points in the 1980s behind only Gretzky","Scored 1239 career points","Two of his brothers Anton and Marian Stastny also played in the NHL"] },
  { player:"Mike Gartner", sport:"🏒 NHL", answer:"MIKE GARTNER", era:"classic", stats:{G:"708",STREAK:"15 seasons 30+ goals",SPEED:"Fastest skater",NO_CUP:"Never won"}, ctx:"Career Totals — 708 goals and 15 consecutive 30-goal seasons", clues:["Scored 30 or more goals in 15 consecutive seasons","Had 708 career goals — the fifth most in NHL history","Was considered the fastest skater of his era","Never won the Stanley Cup despite his longevity"] },
  { player:"Glenn Anderson", sport:"🏒 NHL", answer:"GLENN ANDERSON", era:"classic", stats:{G:"498",CUPS:"6",STYLE:"Unpredictable",EDMONTON:"Dynasty"}, ctx:"Career Totals — 6 Cups with the Edmonton Oilers dynasty", clues:["Won 6 Stanley Cups — 5 with Edmonton and 1 with Toronto","Scored 498 career goals","Was known for his unpredictable exciting style","From Vancouver British Columbia"] },
  { player:"Daunte Culpepper", sport:"🏈 NFL", answer:"DAUNTE CULPEPPER", era:"modern", stats:{YDS:"4717",TD:"39",INT:"11",RTG:"110.9"}, ctx:"Best Season — One of the best statistical QB seasons ever in 2004", clues:["Had one of the best statistical seasons ever by a quarterback","Played for the Minnesota Vikings","Was a massive mobile quarterback at 6ft 4in and 260 pounds","Had his career effectively ended by a devastating knee injury in 2005"] },
];

const HARD = [
  { player:"Jim Plunkett", sport:"🏈 NFL", answer:"PLUNKETT", era:"classic", stats:{YDS:"261",TD:"3",INT:"0",RTG:"111.2"}, ctx:"Super Bowl XV MVP — Oakland Raiders", clues:["Won Super Bowl MVP with Oakland Raiders","Was a backup QB who got his chance late in career","Won 2 Super Bowls as a late-career starter","First Mexican-American starting Super Bowl QB"] },
  { player:"Billy Kilmer", sport:"🏈 NFL", answer:"KILMER", era:"classic", stats:{YDS:"104",TD:"1",INT:"1",RTG:"66.7"}, ctx:"1972 NFC Championship — Washington Redskins", clues:["Led Washington to Super Bowl VII appearance","Beat the Dallas Cowboys in the NFC Championship","Backup who became a starter mid-career","Played for the Washington Redskins in the early 1970s"] },
  { player:"Virginia Ruzici", sport:"🎾 Tennis", answer:"RUZICI", era:"classic", stats:{GS:"1",YEAR:"1978",SURFACE:"Clay",NATION:"Romania"}, ctx:"1978 French Open — Women's Singles Champion", clues:["Won the French Open in 1978","From Romania","Defeated Mima Jausovec in the final","One of the lesser-known French Open champions"] },
  // Basketball - Modern
  // Football - Modern
  // Baseball - Modern
  // Baseball - Classic
  // Soccer - Modern
  // Soccer - Legends/Classic
  { player:"Gunnar Nordahl", sport:"⚽ Soccer", answer:"NORDAHL", era:"legends", stats:{G:"35",APP:"26",MIN:"2340",YEAR:"1950"}, ctx:"1949-50 Serie A Season — AC Milan", clues:["Led Serie A in scoring with 35 goals","One of the Gre-No-Li trio of Swedish players at Milan","Played for AC Milan","Swedish center forward considered one of the greatest scorers ever"] },
  { player:"Helmut Rahn", sport:"⚽ Soccer", answer:"RAHN", era:"legends", stats:{G:"1",AST:"0",APP:"1",MIN:"84"}, ctx:"1954 FIFA World Cup Final — West Germany vs Hungary", clues:["Scored the winning goal in the World Cup Final with 6 minutes left","West Germany beat the heavily favored Hungary","His goal was called the Miracle of Bern","West German winger who was nearly left out of the squad"] },
  // Tennis - Modern Hard
  // Golf - Hard
  // Hockey - Hard
  { player:"Mike Vernon", sport:"🏒 NHL", answer:"VERNON", era:"classic", stats:{GAA:"1.76","SV%":".927",W:"16",SO:"2"}, ctx:"1997 Stanley Cup Finals MVP — Detroit Red Wings", clues:["Won the Conn Smythe Trophy as playoff MVP","Detroit Red Wings won the Cup ending a 42-year drought","Played for Detroit Red Wings","From Calgary, Alberta — won 2 Stanley Cups in his career"] },
  { player:"Peter Bondra", sport:"🏒 NHL", answer:"BONDRA", era:"classic", stats:{G:"52",AST:"28",PTS:"80",PIM:"40"}, ctx:"1997-98 NHL Season — Washington Capitals", clues:["Led the NHL in goals with 52","Played for Washington Capitals","Slovak player from Lutsk, Ukraine","One of the fastest skaters of his era"] },
  // More Modern Hard across sports
  // ── NEW HARD MODERN ──────────────────────────────────────────────────────────
  { player:"Rich Hill", sport:"⚾ MLB", answer:"HILL", era:"modern", stats:{ERA:"2.12",W:"12",SO:"174",WHIP:"0.994"}, ctx:"2016 MLB Season — Los Angeles Dodgers comeback", clues:["Was out of baseball and pitching in an independent league in 2015","Came back to become one of the best pitchers in the NL","Played for Los Angeles Dodgers","Left-handed pitcher known for his curveball at age 36"] },
  { player:"Enes Kanter Freedom", sport:"🏀 NBA", answer:"KANTER", era:"modern", stats:{REB:"11.0",PTS:"14.4",FG:"58.4",YEAR:"2020"}, ctx:"2019-20 NBA Season — Boston Celtics", clues:["Led the NBA in offensive rebounds this season","Played for Boston Celtics","Later changed his name to Enes Kanter Freedom","Turkish-American center known for his outspoken political views"] },
  { player:"Gabe Kapler", sport:"⚾ MLB", answer:"KAPLER", era:"modern", stats:{G:"7",AVG:".300",RBI:"2",ROLE:"PH/PR"}, ctx:"2002 World Series — Anaheim Angels", clues:["Was part of the Angels team that won the 2002 World Series","Later became a manager in MLB","Known for his extreme fitness regiment","Played outfield for multiple teams over his career"] },
  { player:"Karim Abdul-Jabbar", sport:"⚽ Soccer", answer:"KARIM SOCCER", era:"classic", stats:{G:"24",APP:"56",MIN:"4320",YEAR:"1998"}, ctx:"1997-98 MLS Season — LA Galaxy", clues:["Led MLS in scoring this season","Played for LA Galaxy in MLS","Changed his name — not to be confused with the NBA player","Was the face of early MLS soccer in Los Angeles"] },
  { player:"Morten Andersen", sport:"🏈 NFL", answer:"ANDERSEN", era:"classic", stats:{PTS:"2544",FGM:"565",XP:"849",SEASONS:"25"}, ctx:"Career — All-time NFL scoring leader for 17 years", clues:["Was the NFL's all-time scoring leader for many years","Danish-born placekicker who played 25 seasons","Played for the Saints, Falcons, Giants, Chiefs, and Vikings","Nicknamed The Great Dane"] },
  { player:"Harold Baines", sport:"⚾ MLB", answer:"BAINES", era:"classic", stats:{HR:"384",AVG:".289",RBI:"1628",YEAR:"2019"}, ctx:"Career — Controversial Hall of Fame inductee", clues:["Was controversially elected to the Hall of Fame","Spent most of his career with the Chicago White Sox","Was a designated hitter for the majority of his career","His Hall of Fame election was criticized as it lowered the standards"] },
  { player:"Bob Lemon", sport:"⚾ MLB", answer:"LEMON", era:"legends", stats:{W:"207",ERA:"3.23",SO:"1277",CG:"188"}, ctx:"Career — Cleveland Indians pitching ace", clues:["Originally an infielder who converted to pitcher","Won 207 games as a converted position player","Played for Cleveland Indians his entire career","Later managed the Yankees to a World Series title in 1978"] },
  { player:"Herb Score", sport:"⚾ MLB", answer:"SCORE", era:"legends", stats:{ERA:"2.85",W:"36",SO:"508",YEAR:"1956"}, ctx:"1955-56 MLB Seasons — Cleveland Indians", clues:["Was considered the next great pitcher before a career-ending injury","Struck out 245 batters as a rookie in 1955","Was hit in the face by a line drive in 1957 that derailed his career","Left-handed pitcher for the Cleveland Indians"] },
  { player:"Allie Reynolds", sport:"⚾ MLB", answer:"REYNOLDS", era:"legends", stats:{W:"182",ERA:"3.30",NH:"2",CG:"137"}, ctx:"Career — New York Yankees ace pitcher", clues:["Threw 2 no-hitters in the same season (1951)","Won 6 World Series championships with the Yankees","Was part-Creek Native American","Nicknamed Superchief"] },
  { player:"Charley Trippi", sport:"🏈 NFL", answer:"TRIPPI", era:"legends", stats:{RUSH:"206",REC:"2",TD:"2",YDS:"240"}, ctx:"1947 NFL Championship — Chicago Cardinals", clues:["Led the Chicago Cardinals to their only NFL title","Was an All-American at Georgia","Could run, pass, and return kicks at an elite level","Part of the Dream Backfield that won the 1947 championship"] },
  { player:"Marion Motley", sport:"🏈 NFL", answer:"MOTLEY", era:"legends", stats:{YDS:"828",AVG:"5.7",TD:"8",YEAR:"1950"}, ctx:"1950 NFL Season — Cleveland Browns", clues:["Was one of the first Black players in professional football","Led the NFL in rushing yards in 1950","Played for the Cleveland Browns under Paul Brown","Paved the way for integration in professional football"] },
  { player:"Ace Parker", sport:"🏈 NFL", answer:"PARKER", era:"legends", stats:{PASS:"865",RUSH:"321",INT:"6",YEAR:"1940"}, ctx:"1940 NFL MVP Season — Brooklyn Dodgers", clues:["Won the NFL MVP award in 1940","Played for the Brooklyn Dodgers football team","Was also a professional baseball player for the Philadelphia Athletics","One of the few players to play in both the NFL and MLB"] },
  { player:"Bill Tilden", sport:"🎾 Tennis", answer:"TILDEN", era:"legends", stats:{W:"138",L:"5",TITLES:"9",YEAR:"1925"}, ctx:"1925 ATP Season — Dominant American era", clues:["Won 10 Grand Slam titles in his career","Dominated tennis through the 1920s","First American player to win Wimbledon","Was ranked World No. 1 for 6 consecutive years"] },
  { player:"Rene Lacoste", sport:"🎾 Tennis", answer:"LACOSTE", era:"legends", stats:{GS:"7",DAVIS:"5",YEAR:"1927",NATION:"France"}, ctx:"1927 — French tennis dominant era", clues:["Won 7 Grand Slam titles in the 1920s","Was part of the famous Four Musketeers of French tennis","Founded the famous Lacoste clothing brand after retiring","Nicknamed The Crocodile — which inspired his clothing logo"] },
  { player:"Pancho Segura", sport:"🎾 Tennis", answer:"SEGURA", era:"legends", stats:{PRO:"1",YEAR:"1952",NATION:"Ecuador",TITLES:"3"}, ctx:"1950s Professional Tennis — Dominant pro circuit player", clues:["Won the US Pro Championship 3 consecutive times","Was from Guayaquil, Ecuador — one of the first Latino tennis stars","Had an unusual two-handed forehand before it was common","Later coached Jimmy Connors to multiple Grand Slam titles"] },
  { player:"Kel Nagle", sport:"⛳ Golf", answer:"NAGLE", era:"legends", stats:{WINS:"1",MAJORS:"1",YEAR:"1960",NATION:"Australia"}, ctx:"1960 British Open — St Andrews centenary", clues:["Won the 1960 British Open at St Andrews in the centenary celebration","Beat Arnold Palmer by one shot","Australian golfer who won the Open at age 39","Was considered a major upset over the heavily favored Palmer"] },
  { player:"Roberto De Vicenzo", sport:"⛳ Golf", answer:"DE VICENZO", era:"legends", stats:{WINS:"1",MAJORS:"1",YEAR:"1967",MISTAKE:"1"}, ctx:"1967 British Open — Hoylake, England", clues:["Won the 1967 British Open at age 44","Famous for signing an incorrect scorecard at the 1968 Masters — costing him a playoff","From Buenos Aires, Argentina","Won over 200 tournaments worldwide in his career"] },
  { player:"Julius Boros", sport:"⛳ Golf", answer:"BOROS", era:"legends", stats:{MAJORS:"3",AGE:"48",WINS:"18",YEAR:"1968"}, ctx:"1968 PGA Championship — oldest major winner", clues:["Won the 1968 PGA Championship at age 48 — oldest major winner ever","Won 3 major championships in his career","From Fairfield, Connecticut","Was known for his relaxed, unhurried swing"] },
  { player:"Khoury Randolph", sport:"🏈 NFL", answer:"RANDOLPH", era:"modern", stats:{INT:"6",PBU:"12",YDS:"65",YEAR:"2006"}, ctx:"2006 NFL Season — Chicago Bears defense", clues:["Was part of the Bears defense that reached Super Bowl XLI","Played cornerback for the Chicago Bears","Was an undrafted free agent who earned a starting role","The Bears defense that year was one of the best in the NFL"] },
  { player:"Virgil Trucks", sport:"⚾ MLB", answer:"TRUCKS", era:"legends", stats:{NH:"2",W:"5",ERA:"3.97",YEAR:"1952"}, ctx:"1952 MLB Season — Detroit Tigers", clues:["Threw 2 no-hitters in the same season despite finishing 5-19","Played for the Detroit Tigers","One of only 4 pitchers ever to throw 2 no-hitters in a season","The 2 no-hitters came in a losing season — one of baseball's strangest feats"] },
  { player:"Bobo Holloman", sport:"⚾ MLB", answer:"HOLLOMAN", era:"legends", stats:{NH:"1",W:"3",ERA:"5.23",YEAR:"1953"}, ctx:"1953 MLB Season — St. Louis Browns debut", clues:["Threw a no-hitter in his very first MLB start","Played for the St. Louis Browns","Was released later that same season after struggling","His no-hitter in his debut is one of the most unlikely in baseball history"] },
  { player:"Harvey Haddix", sport:"⚾ MLB", answer:"HADDIX", era:"legends", stats:{IP:"12",H:"0",BB:"0",SO:"8"}, ctx:"May 26, 1959 — Pittsburgh Pirates vs Milwaukee Braves", clues:["Pitched 12 perfect innings — the greatest pitching performance ever","Lost the perfect game AND the no-hitter in the 13th inning","Played for the Pittsburgh Pirates","His game is still considered the greatest pitching performance in MLB history despite the loss"] },
  { player:"Pete Vukovich", sport:"⚾ MLB", answer:"VUKOVICH", era:"classic", stats:{W:"18",ERA:"3.34",CG:"10",YEAR:"1982"}, ctx:"1982 AL Cy Young — Milwaukee Brewers", clues:["His team reached the World Series this year","Led the Brewers to the World Series this year","Was known as an intimidating presence on the mound","Later famously appeared as the villain pitcher in Major League"] },
  { player:"LaMarr Hoyt", sport:"⚾ MLB", answer:"HOYT", era:"classic", stats:{W:"24",ERA:"3.66",CG:"12",YEAR:"1983"}, ctx:"1983 AL Cy Young — Chicago White Sox", clues:["Led the White Sox to the AL West title","Led the White Sox to the AL West title","Played for the Chicago White Sox","Later famously appeared as the villain pitcher in Major League"] },
  { player:"Mike Flanagan", sport:"⚾ MLB", answer:"FLANAGAN", era:"classic", stats:{W:"23",ERA:"3.08",CG:"16",YEAR:"1979"}, ctx:"1979 AL Cy Young — Baltimore Orioles", clues:["Led Baltimore to the World Series this same year","Led Baltimore to the World Series this year","Left-handed pitcher from Manchester, New Hampshire","Was part of the great Orioles pitching staffs of the late 1970s"] },
  { player:"Hal Newhouser", sport:"⚾ MLB", answer:"NEWHOUSER", era:"legends", stats:{W:"25",ERA:"1.81",SO:"212",YEAR:"1945"}, ctx:"1945 MLB MVP Season — Detroit Tigers", clues:["Won back-to-back MVP awards in 1944 and 1945","Had a 1.81 ERA in 1945","Played for Detroit Tigers his entire career","His dominance during WWII was questioned since many stars were serving"] },
  { player:"Wally Berger", sport:"⚾ MLB", answer:"BERGER", era:"legends", stats:{HR:"38",AVG:".310",RBI:"119",YEAR:"1930"}, ctx:"1930 MLB Season — Boston Braves rookie", clues:["Set the NL rookie home run record with 38 HRs in 1930","The record stood for decades","Played for the Boston Braves","Was one of the best power hitters of the 1930s despite playing for weak teams"] },
  { player:"Dick Groat", sport:"⚾ MLB", answer:"GROAT", era:"legends", stats:{AVG:".325",HR:"2",RBI:"50",YEAR:"1960"}, ctx:"1960 NL MVP Season — Pittsburgh Pirates", clues:["Won the NL MVP as a shortstop who barely hit any home runs","Led the Pirates to the 1960 World Series championship","Was also a two-time All-American basketball player at Duke","Beat out Willie Mays for the MVP award"] },
  { player:"Norm Cash", sport:"⚾ MLB", answer:"CASH", era:"legends", stats:{HR:"41",AVG:".361",RBI:"132",YEAR:"1961"}, ctx:"1961 MLB Season — Detroit Tigers", clues:["Hit .361 with 41 HRs but never won an MVP award","Never came close to this season again in his career","Played for Detroit Tigers his entire career","Later admitted he used a corked bat during his .361 season"] },
  { player:"Jim Wynn", sport:"⚾ MLB", answer:"WYNN", era:"classic", stats:{G:"4",HR:"1",AVG:".250",RBI:"2"}, ctx:"1974 NL Championship Series — Los Angeles Dodgers", clues:["Led the Dodgers to the World Series this year","Was nicknamed The Toy Cannon for his small stature and power","Played for Houston Astros and Los Angeles Dodgers","Was one of the first power hitters to prioritize walks and OBP"] },
  { player:"Chet Lemon", sport:"⚾ MLB", answer:"CHET LEMON", era:"classic", stats:{HR:"24",AVG:".318",RBI:"86",YEAR:"1979"}, ctx:"1979 MLB Season — Chicago White Sox", clues:["Hit .318 with 24 HRs for the White Sox in 1979","Was one of the best defensive center fielders of the 1980s","Played for Chicago White Sox and Detroit Tigers","Won a World Series with the Tigers in 1984"] },
  { player:"Rick Reuschel", sport:"⚾ MLB", answer:"REUSCHEL", era:"classic", stats:{ERA:"2.79",W:"17",SO:"196",YEAR:"1977"}, ctx:"1977 MLB Season — Chicago Cubs", clues:["Was one of the most underrated pitchers of the 1970s and 80s","Known as Big Daddy for his large frame","Played for the Chicago Cubs and later the Giants","Finished 3rd in Cy Young voting multiple times without ever winning"] },
  { player:"Vada Pinson", sport:"⚾ MLB", answer:"PINSON", era:"legends", stats:{H:"204",AVG:".343",HR:"20",YEAR:"1959"}, ctx:"1959 MLB Season — Cincinnati Reds", clues:["Hit .343 with 204 hits as a 20-year-old in 1959","Was a perennial All-Star who never won an MVP","Played for Cincinnati Reds alongside Frank Robinson","Was considered one of the most underrated players of his era"] },
  { player:"Billy Pierce", sport:"⚾ MLB", answer:"PIERCE", era:"legends", stats:{W:"211",ERA:"3.27",SO:"1999",CG:"193"}, ctx:"Career — Chicago White Sox ace 1950s", clues:["Was the ace of the Chicago White Sox in the 1950s","Finished with 211 wins but is not in the Hall of Fame","Was a 7-time All-Star","Is considered one of the most underrated pitchers of the postwar era"] },
  { player:"Hal Greer", sport:"🏀 NBA", answer:"GREER", era:"legends", stats:{PTS:"22.1",REB:"5.3",AST:"4.7",YEAR:"1968"}, ctx:"1967-68 NBA Season — Philadelphia 76ers", clues:["Was the leading scorer on the 76ers team that went 68-13","Played all 15 seasons for the same franchise","Was known for shooting his free throws as jump shots","From Huntington, West Virginia — 10x NBA All-Star"] },
  { player:"Bailey Howell", sport:"🏀 NBA", answer:"HOWELL", era:"legends", stats:{PTS:"19.8",REB:"9.9",FG:"49.8",YEAR:"1966"}, ctx:"1965-66 NBA Season — Baltimore Bullets", clues:["Averaged nearly 20 points and 10 rebounds for Baltimore","Played for 6 teams in his career including the championship Celtics","Was a 6x NBA All-Star","From Middleton, Tennessee — Mississippi State standout"] },
  { player:"Clyde Lee", sport:"🏀 NBA", answer:"CLYDE LEE", era:"legends", stats:{REB:"14.0",PTS:"10.2",BLK:"2.1",YEAR:"1970"}, ctx:"1969-70 NBA Season — San Francisco Warriors", clues:["Was one of the best rebounders in the NBA in the late 1960s","Played for the San Francisco Warriors and Atlanta Hawks","Was a 7-footer before 7-footers were common","Played college ball at Vanderbilt University"] },

  // ── HARD TENNIS (modern) ─────────────────────────────────────────────────────
  { player:"Fernando Gonzalez", sport:"🎾 Tennis", answer:"GONZALEZ", era:"modern", stats:{W:"44",L:"9",TITLES:"4",GS:"0"}, ctx:"2007 ATP Season — Career best year", clues:["Won 4 titles and reached the Australian Open final this year","Reached a career high ranking of World No. 5","From Santiago, Chile — known for his huge forehand","Won Olympic silver at the 2004 Athens Olympics"] },
  { player:"Nikolay Davydenko", sport:"🎾 Tennis", answer:"DAVYDENKO", era:"modern", stats:{W:"73",L:"23",TITLES:"6",RANK:"3"}, ctx:"2006 ATP Season — Reached World No. 3", clues:["Reached a career high of World No. 3 this season","Won the ATP World Tour Finals in 2006","Russian player known for his precise baseline game","Never won a Grand Slam despite reaching the top 3"] },
  { player:"Tommy Haas", sport:"🎾 Tennis", answer:"HAAS", era:"modern", stats:{W:"51",L:"19",TITLES:"3",RANK:"2"}, ctx:"2002 ATP Season — Reached World No. 2", clues:["Reached World No. 2 after winning the German Open and Hamburg Open","German player who overcame serious shoulder surgery twice","Reached the Australian Open final in 2002","Came back to win titles at age 35"] },
  { player:"Fabrice Santoro", sport:"🎾 Tennis", answer:"SANTORO", era:"modern", stats:{W:"43",L:"22",TITLES:"2",RANK:"17"}, ctx:"2001 ATP Season — Career best year", clues:["Was known for his unusual double-handed forehand and backhand","French player nicknamed The Magician for his shot-making","Played professional tennis for 24 years","Won the French Open doubles title multiple times"] },
  { player:"Marcelo Rios", sport:"🎾 Tennis", answer:"RIOS", era:"classic", stats:{W:"75",L:"19",RANK:"1",GS:"0"}, ctx:"1998 ATP Season — Became World No. 1 without winning a Grand Slam", clues:["Became World No. 1 without ever winning a Grand Slam — still the only player to do so","From Santiago, Chile — first South American to reach No. 1","Won the Masters in 1998 and reached the Australian Open final","Was known for his exceptional talent but difficult personality"] },
  { player:"Alex Corretja", sport:"🎾 Tennis", answer:"CORRETJA", era:"classic", stats:{W:"67",L:"27",TITLES:"3",RANK:"2"}, ctx:"1998 ATP Season — Reached World No. 2", clues:["Reached a career high of World No. 2 in 1998","Spanish clay court specialist who won 3 titles this year","Won the ATP Finals in 1998","Was best known for a famous 1996 US Open match vs Sampras where both players vomited on court"] },

  // ── HARD TENNIS (classic) ────────────────────────────────────────────────────
  { player:"Vitas Gerulaitis", sport:"🎾 Tennis", answer:"GERULAITIS", era:"classic", stats:{W:"57",L:"23",TITLES:"4",GS:"0"}, ctx:"1977 ATP Season — Career best year", clues:["Reached the Australian Open final and Wimbledon semifinal this year","American player known as Broadway Vitas for his flamboyant lifestyle","Famous for saying nobody beats Vitas Gerulaitis 17 times in a row — then losing to him","Died tragically in 1994 from accidental carbon monoxide poisoning"] },
  { player:"Jose-Luis Clerc", sport:"🎾 Tennis", answer:"CLERC", era:"classic", stats:{W:"72",L:"22",TITLES:"9",RANK:"4"}, ctx:"1981 ATP Season — Career best year", clues:["Won 9 titles this season and reached a career high of World No. 4","Argentine clay court specialist of the early 1980s","Reached the French Open semifinals multiple times","Was part of a golden era of Argentine tennis alongside Vilas"] },
  { player:"Harold Solomon", sport:"🎾 Tennis", answer:"SOLOMON", era:"classic", stats:{W:"54",L:"28",TITLES:"3",RANK:"5"}, ctx:"1980 ATP Season — Ranked World No. 5", clues:["Reached a career high of World No. 5 in 1980","American clay court specialist known for his consistency","Reached the French Open final in 1976","Was nicknamed The Crab for his defensive style"] },

  // ── HARD TENNIS (legends) ────────────────────────────────────────────────────
  { player:"Tony Roche", sport:"🎾 Tennis", answer:"ROCHE", era:"legends", stats:{GS:"1",YEAR:"1966",NATION:"Australia",DAVIS:"4"}, ctx:"1966 French Open — Australian left-hander", clues:["Won the 1966 French Open in his best singles result","Was better known as a doubles player — won 13 Grand Slam doubles titles","Australian left-hander who was John Newcombe's doubles partner","Later became a renowned coach working with multiple top players"] },

  // ── HARD SOCCER (classic) ────────────────────────────────────────────────────
  { player:"Preben Elkjaer", sport:"⚽ Soccer", answer:"ELKJAER", era:"classic", stats:{G:"10",APP:"38",BALLON:"3rd",YEAR:"1985"}, ctx:"1985-86 Season — Denmark golden generation", clues:["Finished 3rd in the 1985 Ballon d'Or voting","Was the star of Denmark's great 1986 World Cup team","Played for Verona in Serie A","Danish striker known for his powerful running style"] },

  // ── HARD FOOTBALL (modern) ───────────────────────────────────────────────────
  { player:"Brad Johnson", sport:"🏈 NFL", answer:"BRAD JOHNSON", era:"modern", stats:{YDS:"215",TD:"2",INT:"1",RTG:"101.8"}, ctx:"Super Bowl XXXVII MVP team — Tampa Bay Buccaneers", clues:["Won the Super Bowl with the Tampa Bay Buccaneers in 2003","His team won 48-21 — the most lopsided Super Bowl ever at that time","Was considered a game manager who relied on the defense","Played for Minnesota, Washington, and Tampa Bay in his career"] },

  // ── HARD FOOTBALL (classic) ──────────────────────────────────────────────────
  { player:"Harvey Martin", sport:"🏈 NFL", answer:"MARTIN", era:"classic", stats:{SCK:"23",FF:"3",YEAR:"1977",AWARD:"DPOY"}, ctx:"1977 NFL Season — Dallas Cowboys Defensive Player of Year", clues:["Won the NFL Defensive Player of the Year award in 1977","Played for the Dallas Cowboys","Was co-MVP of Super Bowl XII with Randy White","Nicknamed Too Mean"] },

  // ── HARD FOOTBALL (legends) ──────────────────────────────────────────────────

  // ── HARD HOCKEY (modern) ─────────────────────────────────────────────────────

  // ── HARD HOCKEY (legends) ────────────────────────────────────────────────────
  { player:"Bill Mosienko", sport:"🏒 NHL", answer:"MOSIENKO", era:"legends", stats:{G:"3",TIME:"21sec",PER:"3rd",OPP:"Rangers"}, ctx:"March 23, 1952 — Chicago Blackhawks vs New York Rangers", clues:["Scored 3 goals in 21 seconds — the fastest hat trick in NHL history","Played for the Chicago Blackhawks","The record has stood for over 70 years","Ukrainian-Canadian winger from Winnipeg, Manitoba"] },
  { player:"Nels Stewart", sport:"🏒 NHL", answer:"NELS", era:"legends", stats:{G:"324",PTS:"515",YEAR:"1940",TEAMS:"3"}, ctx:"Career — First NHL player to score 300 goals", clues:["Was the first player in NHL history to score 300 career goals","Played for the Montreal Maroons, Boston Bruins, and New York Americans","Won the Hart Trophy twice as league MVP","Nicknamed Old Poison for his deadly shooting"] },
  { player:"Charlie Conacher", sport:"🏒 NHL", answer:"CONACHER", era:"legends", stats:{G:"52",PTS:"73",YEAR:"1932",TEAM:"Toronto"}, ctx:"1931-32 NHL Season — Toronto Maple Leafs", clues:["Led the NHL in goals 5 times in his career","Was part of the famous Kid Line with Harvey Jackson and Joe Primeau","Played for the Toronto Maple Leafs","Was one of the hardest shooters of his era"] },

  { player:"Gilbert Arenas", sport:"🏀 NBA", answer:"AGENT ZERO", era:"modern", stats:{PTS:"29.3",AST:"6.1",REB:"4.4",STL:"1.7"}, ctx:"2005-06 NBA Season — Washington Wizards scoring leader", clues:["Led the Washington Wizards in scoring at 29.3 PPG","Played for the Washington Wizards","Nicknamed Agent Zero because no team drafted him initially","Had a notorious locker room incident that ended his career"] },
  { player:"Stephon Marbury", sport:"🏀 NBA", answer:"STEPH MARBURY", era:"modern", stats:{PTS:"22.3",AST:"8.1",REB:"3.3",STL:"1.7"}, ctx:"2003-04 NBA Season — Phoenix Suns point guard", clues:["Was one of the most talented but troubled point guards of his era","Played for the Phoenix Suns this season","From Coney Island Brooklyn","Left the NBA to become a legend in the Chinese Basketball Association"] },
  { player:"Jamal Mashburn", sport:"🏀 NBA", answer:"MASHBURN", era:"modern", stats:{PTS:"24.9",REB:"6.4",AST:"4.0",FG:"45.2"}, ctx:"2000-01 NBA Season — Miami Heat All-Star", clues:["Was one of the most versatile forwards of his era","Played for the Miami Heat this season","From New York City","Had his career ended prematurely by knee injuries"] },
  { player:"Mike Bibby", sport:"🏀 NBA", answer:"MIKE BIBBY", era:"modern", stats:{PTS:"18.4",AST:"7.3",REB:"3.7","3PM":"2.1"}, ctx:"2001-02 NBA Season — Sacramento Kings", clues:["Was a key player on the Sacramento Kings that nearly won the championship","His Kings had a famous controversial playoff series vs the Lakers in 2002","Son of former NBA player Henry Bibby","Led the Kings in assists this season"] },
  { player:"Peja Stojakovic", sport:"🏀 NBA", answer:"PEJA", era:"modern", stats:{PTS:"24.2",REB:"5.1","3PM":"3.1",FG:"48.4"}, ctx:"2003-04 NBA Season — Sacramento Kings scoring title", clues:["Won the NBA scoring title this season","Played for the Sacramento Kings","Serbian shooter who was one of the best in his era","Won the NBA championship with the Dallas Mavericks in 2011"] },
  { player:"Baron Davis", sport:"🏀 NBA", answer:"BD", era:"modern", stats:{PTS:"22.7",AST:"8.1",REB:"4.8",STL:"2.3"}, ctx:"2006-07 NBA Season — Golden State Warriors playoff run", clues:["Led the We Believe Warriors to upset the 1-seed Dallas Mavericks","Played for the Golden State Warriors","Had a famous dunk over Andrei Kirilenko in the 2007 playoffs","From Inglewood California"] },
  { player:"Larry Hughes", sport:"🏀 NBA", answer:"LARRY HUGHES", era:"modern", stats:{PTS:"22.0",STL:"2.9",REB:"5.2",AST:"4.1"}, ctx:"2004-05 NBA Season — Washington Wizards", clues:["Led the NBA in steals with 2.9 per game","Played for the Washington Wizards","Was selected by the 76ers as the 8th overall pick in 1998","Later joined LeBron James in Cleveland"] },
  { player:"Ben Gordon", sport:"🏀 NBA", answer:"BEN GORDON", era:"modern", stats:{PTS:"21.4",AST:"3.3",REB:"2.7","3PM":"2.8"}, ctx:"2007-08 NBA Season — Chicago Bulls sixth man", clues:["Won the NBA Sixth Man of the Year award in 2005","Played for the Chicago Bulls","From London England — one of the first British NBA stars","Was the 3rd overall pick in the 2004 NBA Draft"] },
  { player:"Monta Ellis", sport:"🏀 NBA", answer:"MONTA ELLIS", era:"modern", stats:{PTS:"24.1",AST:"5.9",REB:"3.4",STL:"1.8"}, ctx:"2011-12 NBA Season — Milwaukee Bucks", clues:["Was one of the most prolific undersized scorers of his era","Played for the Milwaukee Bucks this season","From Jackson Mississippi","Famously had a moped accident that revealed he had hidden an injury from his team"] },
  { player:"Al Harrington", sport:"🏀 NBA", answer:"AL HARRINGTON", era:"modern", stats:{PTS:"20.6",REB:"7.0",AST:"2.3",FG:"46.8"}, ctx:"2008-09 NBA Season — New York Knicks", clues:["Averaged over 20 points per game for the Knicks this season","Played for 9 different teams in his career","Was drafted directly out of high school in 1998","Was known for his versatility as a big forward who could shoot threes"] },
  { player:"Corey Maggette", sport:"🏀 NBA", answer:"MAGGETTE", era:"modern", stats:{PTS:"22.2",REB:"5.0",AST:"3.0",FT:"8.4"}, ctx:"2007-08 NBA Season — Los Angeles Clippers", clues:["Was one of the best free throw drawers in the NBA","Played for the Los Angeles Clippers","Won a national championship at Duke in 1999","Led the NBA in free throw attempts multiple times"] },
  { player:"Andrei Kirilenko", sport:"🏀 NBA", answer:"AK47", era:"modern", stats:{PTS:"16.5",REB:"8.1",AST:"3.4",BLK:"2.4"}, ctx:"2003-04 NBA Season — Utah Jazz All-Star", clues:["Was one of the most versatile defensive players of his era","Played for the Utah Jazz","Nicknamed AK47 for his jersey number and last name initial","From Izhevsk Russia"] },
  { player:"Shareef Abdur-Rahim", sport:"🏀 NBA", answer:"SHAREEF", era:"modern", stats:{PTS:"21.4",REB:"8.0",AST:"2.7",FG:"47.9"}, ctx:"2001-02 NBA Season — Atlanta Hawks", clues:["Was one of the best players never to make the playoffs in his career","Played for the Atlanta Hawks","Was the 3rd overall pick in the 1996 NBA Draft","From Marietta Georgia"] },
  { player:"World B. Free", sport:"🏀 NBA", answer:"WORLD FREE", era:"classic", stats:{PTS:"30.2",AST:"6.0",REB:"3.3",FG:"48.5"}, ctx:"1979-80 NBA Season — San Diego Clippers scoring title", clues:["Led the NBA in scoring with 30.2 PPG","Changed his name legally to World B. Free","Played for the San Diego Clippers","Was known for his hang time and acrobatic shots"] },
  { player:"Bob McAdoo", sport:"🏀 NBA", answer:"BOB MCADOO", era:"classic", stats:{PTS:"34.5",REB:"14.1",BLK:"3.3",FG:"51.2"}, ctx:"1974-75 NBA Season — Buffalo Braves MVP", clues:["Won the NBA MVP and scoring title this season","Led the NBA in scoring for 3 consecutive years","Played for the Buffalo Braves","Won 2 championships later with the LA Lakers"] },
  { player:"George McGinnis", sport:"🏀 NBA", answer:"MCGINNIS", era:"classic", stats:{PTS:"23.0",REB:"14.3",AST:"3.8",STL:"2.1"}, ctx:"1975-76 NBA Season — Philadelphia 76ers", clues:["Was the ABA MVP the year before joining the NBA","Played for the Philadelphia 76ers","Was one of the most powerful forwards of the 1970s","Played alongside Dr. J in the ABA and NBA"] },
  { player:"Len Elmore", sport:"🏀 NBA", answer:"LEN ELMORE", era:"classic", stats:{REB:"9.8",PTS:"9.7",BLK:"2.1",YEAR:"1977"}, ctx:"1976-77 NBA Season — Indiana Pacers center", clues:["Was a defensive specialist center for the Indiana Pacers","Played for multiple ABA and NBA teams","Later became a television broadcaster and lawyer","From New York City"] },
  { player:"Phil Smith", sport:"🏀 NBA", answer:"PHIL SMITH", era:"classic", stats:{PTS:"20.0",AST:"5.4",REB:"3.5",YEAR:"1976"}, ctx:"1975-76 NBA Season — Golden State Warriors", clues:["Was a key player on the Golden State Warriors championship team","Played his entire career for the Golden State Warriors","From Compton California","Was known for his clutch shooting and defensive ability"] },
  { player:"Luol Deng", sport:"🏀 NBA", answer:"LUOL DENG", era:"modern", stats:{PTS:"18.5",REB:"7.0",AST:"3.0",STL:"1.5"}, ctx:"2006-07 NBA Season — Chicago Bulls All-Star", clues:["Was the heart of the Chicago Bulls team that upset the Heat in the 2007 playoffs","Played for the Chicago Bulls","Born in Sudan — one of the Lost Boys refugee story","Was the 7th overall pick in the 2004 NBA Draft"] },
  { player:"John Drew", sport:"🏀 NBA", answer:"JOHN DREW", era:"classic", stats:{PTS:"24.2",REB:"10.4",FG:"47.8",YEAR:"1978"}, ctx:"1977-78 NBA Season — Atlanta Hawks All-Star", clues:["Was a 5x All-Star for the Atlanta Hawks","Played for the Atlanta Hawks his entire career","Struggled with substance abuse that ended his career prematurely","Was one of the best power forwards of the late 1970s"] },
  { player:"George Yardley", sport:"🏀 NBA", answer:"GEORGE YARDLEY", era:"legends", stats:{PTS:"27.8",REB:"10.7",FG:"42.0",YEAR:"1958"}, ctx:"1957-58 NBA Season — Detroit Pistons first 2000-point scorer", clues:["Was the first player in NBA history to score 2000 points in a season","Played for the Detroit Pistons","Nicknamed The Bird for his thin frame and leaping ability","Was a 6x All-Star"] },
  { player:"Andy Phillip", sport:"🏀 NBA", answer:"ANDY PHILLIP NBA", era:"legends", stats:{PTS:"12.1",AST:"8.3",REB:"5.0",TITLES:"1"}, ctx:"1951-52 NBA Season — Philadelphia Warriors assists leader", clues:["Led the NBA in assists this season","Was the first player to lead the NBA in assists multiple times","Won a championship with the Boston Celtics in 1957","From Granite City Illinois"] },
  { player:"Slater Martin", sport:"🏀 NBA", answer:"SLATER MARTIN HARD", era:"legends", stats:{PTS:"11.4",AST:"4.2",REB:"3.0",TITLES:"4"}, ctx:"Career — Minneapolis Lakers dynasty point guard", clues:["Won 4 NBA championships with the Minneapolis Lakers","Was considered the best defensive guard of his era","Played for the Minneapolis Lakers","Was a 7x All-Star"] },
  { player:"Bobby Wanzer", sport:"🏀 NBA", answer:"BOBBY WANZER HARD", era:"legends", stats:{PTS:"15.8",FT:"90.4",AST:"3.5",TITLES:"1"}, ctx:"1951-52 NBA Season — Rochester Royals champion", clues:["Won the NBA championship with the Rochester Royals","Shot 90.4% from the free throw line — a record at the time","Played for the Rochester Royals","Was a 5x All-Star"] },
  { player:"Harry Gallatin", sport:"🏀 NBA", answer:"HARRY GALLATIN HARD", era:"legends", stats:{PTS:"15.0",REB:"15.3",FT:"79.6",STREAK:"682"}, ctx:"Career — New York Knicks iron man", clues:["Played 682 consecutive games — a record at the time","Played for the New York Knicks","Was nicknamed The Horse for his durability","Was a 7x All-Star"] },
  { player:"Trent Dilfer", sport:"🏈 NFL", answer:"TRENT DILFER HARD", era:"modern", stats:{YDS:"153",TD:"1",INT:"0",RTG:"112.8"}, ctx:"Super Bowl XXXV MVP team — Baltimore Ravens", clues:["Won the Super Bowl with the Baltimore Ravens","Was considered the weakest link on a dominant defense-led team","Had been cut by Tampa Bay before winning the championship","Played for 6 different teams in his career"] },
  { player:"Brad Johnson", sport:"🏈 NFL", answer:"BRAD JOHNSON HARD", era:"modern", stats:{YDS:"215",TD:"2",INT:"1",RTG:"101.8"}, ctx:"Super Bowl XXXVII MVP team — Tampa Bay Buccaneers", clues:["Won the Super Bowl with the Tampa Bay Buccaneers","Played for Tampa Bay Buccaneers","Had previously played for the Minnesota Vikings and Washington","Was a backup who became the starter at the right time"] },
  { player:"Jake Delhomme", sport:"🏈 NFL", answer:"JAKE DELHOMME HARD", era:"modern", stats:{YDS:"323",TD:"3",INT:"1",RTG:"100.1"}, ctx:"2003 NFC Championship — Carolina Panthers", clues:["Led the Carolina Panthers to the Super Bowl","Played for the Carolina Panthers","From Breaux Bridge Louisiana","Was an undrafted free agent who became a starter"] },
  { player:"Elvis Grbac", sport:"🏈 NFL", answer:"ELVIS GRBAC", era:"modern", stats:{YDS:"4169",TD:"28",INT:"14",RTG:"89.9"}, ctx:"2000 NFL Season — Kansas City Chiefs", clues:["Had his best NFL season with the Kansas City Chiefs","Played for the Kansas City Chiefs","Was a backup for Steve Young in San Francisco","Was infamously called a disgrace by the wife of an injured teammate"] },
  { player:"Charlie Batch", sport:"🏈 NFL", answer:"CHARLIE BATCH", era:"classic", stats:{YDS:"1957",TD:"11",INT:"6",RTG:"82.5"}, ctx:"1999 NFL Season — Detroit Lions starting QB", clues:["Was the starting quarterback for the Detroit Lions","From Homestead Pennsylvania","Later became a backup for Ben Roethlisberger in Pittsburgh","Won 2 Super Bowl rings as a backup with Pittsburgh"] },
  { player:"Quincy Carter", sport:"🏈 NFL", answer:"QUINCY CARTER", era:"modern", stats:{YDS:"3302",TD:"16",INT:"11",RTG:"82.1"}, ctx:"2003 NFL Season — Dallas Cowboys", clues:["Was the starting quarterback for the Dallas Cowboys","Played for the Dallas Cowboys","Was a second round pick in the 2001 NFL Draft","Was released before the 2004 season despite having a decent year"] },
  { player:"A.J. Feeley", sport:"🏈 NFL", answer:"AJ FEELEY", era:"modern", stats:{YDS:"1011",TD:"6",INT:"2",RTG:"89.4"}, ctx:"2002 NFL Season — Philadelphia Eagles emergency starter", clues:["Went 4-1 as an emergency starter for the Eagles","Played for the Philadelphia Eagles","Was a 5th round draft pick out of Oregon","Later married Heather Mitts the soccer player"] },
  { player:"Kordell Stewart", sport:"🏈 NFL", answer:"SLASH", era:"modern", stats:{YDS:"3020",TD:"26",INT:"17",RUSH:"419"}, ctx:"2001 NFL Season — Pittsburgh Steelers AFC Champion", clues:["Led Pittsburgh Steelers to the AFC Championship Game","Nicknamed Slash for his ability to play multiple positions","Played for the Pittsburgh Steelers","Was one of the first true dual-threat quarterbacks of the modern era"] },
  { player:"Neil O'Donnell", sport:"🏈 NFL", answer:"NEIL O DONNELL", era:"classic", stats:{YDS:"2970",TD:"17",INT:"7",RTG:"87.7"}, ctx:"1994 NFL Season — Pittsburgh Steelers", clues:["Led Pittsburgh Steelers to the Super Bowl this season","Threw 2 interceptions directly to Larry Brown in Super Bowl XXX","Played for the Pittsburgh Steelers","Was considered a very reliable but unspectacular quarterback"] },
  { player:"Dave Krieg", sport:"🏈 NFL", answer:"DAVE KRIEG", era:"classic", stats:{YDS:"3309",TD:"23",INT:"12",RTG:"94.6"}, ctx:"1994 NFL Season — Arizona Cardinals", clues:["Was an undrafted free agent who had a long successful career","Played for the Arizona Cardinals this season","Started his career with the Seattle Seahawks","Holds the record for the most fumbles in NFL history"] },
  { player:"Harvey Martin", sport:"🏈 NFL", answer:"HARVEY MARTIN", era:"classic", stats:{SACK:"23",FF:"5",DPOY:"1",YEAR:"1977"}, ctx:"1977 NFL Season — Dallas Cowboys Defensive Player of Year", clues:["Won the Defensive Player of the Year award","Also won the Super Bowl XII MVP as a defensive player","Played for the Dallas Cowboys","Nicknamed The Judge — was extremely dominant in the late 1970s"] },
  { player:"Billy Kilmer", sport:"🏈 NFL", answer:"BILLY KILMER", era:"classic", stats:{YDS:"2440",TD:"19",INT:"11",RTG:"87.5"}, ctx:"1972 NFL Season — Washington Redskins Super Bowl run", clues:["Led the Washington Redskins to the Super Bowl","Played for the Washington Redskins","Was known for his wobbly passes that somehow always found receivers","Competed with Sonny Jurgensen for the starting job"] },
  { player:"Earl Morrall", sport:"🏈 NFL", answer:"EARL MORRALL", era:"legends", stats:{YDS:"2909",TD:"26",INT:"17",RTG:"93.2"}, ctx:"1968 NFL Season — Baltimore Colts MVP replacement", clues:["Won the NFL MVP award filling in for injured Johnny Unitas","Played for the Baltimore Colts","Led the Colts to a Super Bowl berth only to lose to Joe Namath","Later filled in for Bob Griese on the undefeated 1972 Dolphins"] },
  { player:"Len Dawson", sport:"🏈 NFL", answer:"LEN DAWSON HARD", era:"classic", stats:{YDS:"200",TD:"1",INT:"1",RTG:"98.2"}, ctx:"Super Bowl IV MVP — Kansas City Chiefs vs Minnesota Vikings", clues:["Won the Super Bowl MVP with the Kansas City Chiefs","Played for the Kansas City Chiefs","Was released by multiple teams before finding success","Was the first quarterback to pass for over 2000 yards in the AFL"] },
  { player:"Daryle Lamonica", sport:"🏈 NFL", answer:"LAMONICA", era:"legends", stats:{YDS:"3228",TD:"30",INT:"20",RTG:"80.0"}, ctx:"1967 AFL Season — Oakland Raiders MVP", clues:["Won the AFL MVP this season","Nicknamed The Mad Bomber for his deep passing attack","Played for the Oakland Raiders","Led Oakland to Super Bowl II but lost to the Green Bay Packers"] },
  { player:"Roman Gabriel", sport:"🏈 NFL", answer:"ROMAN GABRIEL", era:"legends", stats:{YDS:"2779",TD:"24",INT:"7",RTG:"91.0"}, ctx:"1969 NFL Season — Los Angeles Rams MVP", clues:["Won the NFL MVP award this season","Played for the Los Angeles Rams","Was the first Filipino-American starting quarterback in NFL history","Later won the Comeback Player of the Year with Philadelphia"] },
  { player:"Bob Lee", sport:"🏈 NFL", answer:"BOB LEE QB", era:"classic", stats:{YDS:"1440",TD:"12",INT:"10",RTG:"68.4"}, ctx:"1975 NFL Season — Minnesota Vikings backup QB", clues:["Was the emergency starter for the Vikings when Tarkenton was injured","Played for the Minnesota Vikings","Was one of the most traveled backup quarterbacks in NFL history","Played for 5 different teams during his career"] },
  { player:"LaMarr Hoyt", sport:"⚾ MLB", answer:"LAMARR HOYT", era:"classic", stats:{W:"24",ERA:"3.66",SO:"148",WHIP:"1.113"}, ctx:"1983 MLB Season — Chicago White Sox Cy Young", clues:["Won the AL Cy Young award with the Chicago White Sox","Won 24 games this season","Had his career derailed by substance abuse problems","Was a large man with no obvious physical advantages but great command"] },
  { player:"Pete Vukovich", sport:"⚾ MLB", answer:"PETE VUKOVICH", era:"classic", stats:{W:"18",ERA:"3.34",SO:"105",WHIP:"1.201"}, ctx:"1982 MLB Season — Milwaukee Brewers Cy Young", clues:["Won the AL Cy Young with the Milwaukee Brewers","Was known for his intimidating presence and eccentricity","Played the villain in the movie Major League","Had his career cut short by injury"] },
  { player:"Rick Sutcliffe", sport:"⚾ MLB", answer:"RICK SUTCLIFFE", era:"classic", stats:{W:"16",ERA:"2.69",SO:"155",WHIP:"1.070"}, ctx:"1984 MLB Season — Chicago Cubs Cy Young", clues:["Won the NL Cy Young award going 16-1 with the Cubs after a mid-season trade","Had gone 4-5 with Cleveland before the trade","Played for the Chicago Cubs","Led the Cubs to the NLCS for the first time in 39 years"] },
  { player:"Bret Saberhagen", sport:"⚾ MLB", answer:"SABERHAGEN", era:"classic", stats:{W:"20",ERA:"2.87",SO:"158",WHIP:"1.065"}, ctx:"1985 MLB Season — Kansas City Royals Cy Young", clues:["Won the AL Cy Young with the Kansas City Royals","Also won the World Series MVP that year","Was only 21 years old","Had a career of alternating dominant and mediocre seasons"] },
  { player:"Frank Viola", sport:"⚾ MLB", answer:"SWEET MUSIC", era:"classic", stats:{W:"24",ERA:"2.64",SO:"193",WHIP:"1.020"}, ctx:"1988 MLB Season — Minnesota Twins Cy Young", clues:["Won the AL Cy Young with the Minnesota Twins","Won 24 games this season","Nicknamed Sweet Music for his last name","Had won the World Series MVP the previous year"] },
  { player:"Bob Welch", sport:"⚾ MLB", answer:"BOB WELCH", era:"classic", stats:{W:"27",ERA:"2.95",SO:"127",WHIP:"1.157"}, ctx:"1990 MLB Season — Oakland Athletics Cy Young", clues:["Won 27 games — the most in the majors since 1974","Won the AL Cy Young with the Oakland Athletics","Was open about his recovery from alcoholism","Won 3 World Series rings with the Dodgers and Athletics"] },
  { player:"Dwight Gooden", sport:"⚾ MLB", answer:"DOC GOODEN", era:"classic", stats:{W:"24",ERA:"1.53",SO:"268",WHIP:"0.965"}, ctx:"1985 MLB Season — New York Mets dominant year", clues:["Had one of the greatest pitching seasons ever at age 20","Won the NL Cy Young with the New York Mets","Nicknamed Doc","Had his career devastated by substance abuse despite enormous talent"] },
  { player:"Orel Hershiser", sport:"⚾ MLB", answer:"BULLDOG", era:"classic", stats:{W:"23",ERA:"2.26",SO:"178",STREAK:"59"}, ctx:"1988 MLB Season — Los Angeles Dodgers Cy Young", clues:["Set the all-time record for consecutive scoreless innings (59)","Won the NL Cy Young and World Series MVP","Played for the Los Angeles Dodgers","Nicknamed Bulldog by manager Tommy Lasorda"] },
  { player:"John Smoltz", sport:"⚾ MLB", answer:"JOHN SMOLTZ", era:"classic", stats:{W:"24",ERA:"2.94",SO:"276",WHIP:"1.096"}, ctx:"1996 MLB Season — Atlanta Braves Cy Young", clues:["Won the NL Cy Young with the Atlanta Braves","Was part of the legendary Maddux-Glavine-Smoltz rotation","Had arm problems and converted to closer then back to starter","Won the World Series with Atlanta in 1995"] },
  { player:"Kevin Brown", sport:"⚾ MLB", answer:"KEVIN BROWN", era:"classic", stats:{W:"18",ERA:"2.28",SO:"205",WHIP:"1.036"}, ctx:"1996 MLB Season — Florida Marlins All-Star", clues:["Was one of the most unhittable pitchers of the 1990s","Played for the Florida Marlins this season","Was known for his heavy sinking fastball","Later signed the first $100M contract for a pitcher"] },
  { player:"David Cone", sport:"⚾ MLB", answer:"DAVID CONE", era:"classic", stats:{W:"20",ERA:"2.94",SO:"222",WHIP:"1.116"}, ctx:"1994 MLB Season — Kansas City Royals All-Star", clues:["Won 20 games with the Kansas City Royals before the players strike","Later threw a perfect game with the Yankees in 1999","Played for multiple teams including Kansas City and New York","Was a 5x All-Star"] },
  { player:"Jim Abbott", sport:"⚾ MLB", answer:"JIM ABBOTT", era:"classic", stats:{W:"18",ERA:"2.77",SO:"95",WHIP:"1.162"}, ctx:"1991 MLB Season — California Angels All-Star", clues:["Won 18 games with the California Angels","Was born with one hand — a true inspiration story","Later threw a no-hitter with the New York Yankees in 1993","Won a gold medal at the 1988 Olympics as an amateur"] },
  { player:"Jim Lonborg", sport:"⚾ MLB", answer:"JIM LONBORG", era:"legends", stats:{W:"22",ERA:"3.16",SO:"246",WHIP:"1.189"}, ctx:"1967 MLB Season — Boston Red Sox Cy Young", clues:["Won the AL Cy Young in the Impossible Dream season","Led the Red Sox to the World Series","Was injured in a skiing accident and was never the same pitcher again","Was known as Gentleman Jim"] },
  { player:"Denny McLain", sport:"⚾ MLB", answer:"DENNY MCLAIN", era:"legends", stats:{W:"31",ERA:"1.96",SO:"280",CG:"28"}, ctx:"1968 MLB Season — Detroit Tigers MVP and Cy Young", clues:["Was the last pitcher to win 30 games in a season","Won both the MVP and Cy Young in the same year","Played for the Detroit Tigers","Later had multiple legal problems after his playing career"] },
  { player:"Vida Blue", sport:"⚾ MLB", answer:"VIDA BLUE", era:"classic", stats:{W:"24",ERA:"1.82",SO:"301",WHIP:"0.954"}, ctx:"1971 MLB Season — Oakland Athletics MVP and Cy Young", clues:["Won both the MVP and Cy Young in the same year","Played for the Oakland Athletics","Was only 21 years old when he won both awards","Had his salary dispute with Charlie Finley become national news"] },
  { player:"Mike Flanagan", sport:"⚾ MLB", answer:"MIKE FLANAGAN", era:"classic", stats:{W:"23",ERA:"3.08",SO:"190",WHIP:"1.223"}, ctx:"1979 MLB Season — Baltimore Orioles Cy Young", clues:["Won the AL Cy Young with the Baltimore Orioles","Won 23 games this season","Was a key part of the great Orioles rotations of the late 1970s","Later became the team's general manager"] },
  { player:"Ron Guidry", sport:"⚾ MLB", answer:"LOUISIANA LIGHTNING", era:"classic", stats:{W:"25",ERA:"1.74",SO:"248",WHIP:"0.946"}, ctx:"1978 MLB Season — New York Yankees dominant year", clues:["Had one of the greatest pitching seasons in Yankees history","Won the AL Cy Young with 25 wins and a 1.74 ERA","Played for the New York Yankees","Nicknamed Louisiana Lightning"] },
  { player:"Danny Darwin", sport:"⚾ MLB", answer:"DANNY DARWIN", era:"classic", stats:{ERA:"2.21",W:"12",SO:"130",YEAR:"1990"}, ctx:"1990 MLB Season — Houston Astros ERA leader", clues:["Led the NL in ERA with 2.21","Played for the Houston Astros","Won the ERA title despite only winning 12 games","Had a long career spanning multiple teams and decades"] },
  { player:"Hal Newhouser", sport:"⚾ MLB", answer:"PRINCE HAL", era:"legends", stats:{W:"29",ERA:"1.81",SO:"212",WHIP:"0.990"}, ctx:"1944 MLB Season — Detroit Tigers wartime MVP", clues:["Won 2 consecutive MVP awards during World War II","Won 29 games with a 1.81 ERA","Played for the Detroit Tigers","Nicknamed Prince Hal — his reputation was later questioned because of war-depleted competition"] },
  { player:"Bob Lemon", sport:"⚾ MLB", answer:"BOB LEMON HARD", era:"legends", stats:{W:"23",ERA:"2.82",CG:"20",WHIP:"1.190"}, ctx:"1952 MLB Season — Cleveland Indians All-Star", clues:["Won 23 games for the Cleveland Indians","Was converted from a position player to a pitcher","Was a key part of the great Cleveland Indians teams of the 1950s","Later managed the New York Yankees to a World Series title"] },
  { player:"Early Wynn", sport:"⚾ MLB", answer:"EARLY WYNN", era:"legends", stats:{W:"22",ERA:"2.72",SO:"179",WHIP:"1.159"}, ctx:"1959 MLB Season — Chicago White Sox Cy Young", clues:["Won the AL Cy Young with the Chicago White Sox","Was 39 years old when he won the award","Was known as the meanest pitcher in baseball","Won 300 games in his career after a very slow start"] },
  { player:"Lew Burdette", sport:"⚾ MLB", answer:"LEW BURDETTE", era:"legends", stats:{W:"17",ERA:"2.70",SO:"113",WHIP:"1.078"}, ctx:"1957 World Series MVP — Milwaukee Braves", clues:["Won 3 games in the 1957 World Series including 2 shutouts","Was suspected of throwing a spitball his entire career","Played for the Milwaukee Braves","Was involved in a trade that brought him to Milwaukee from the Yankees"] },
  { player:"Harvey Haddix", sport:"⚾ MLB", answer:"HARVEY HADDIX", era:"legends", stats:{IP:"12",H:"0",BB:"1",YEAR:"1959"}, ctx:"May 26 1959 — Perfect game for 12 innings then lost", clues:["Threw 12 perfect innings — then lost in the 13th","His perfect game through 12 was undone by an error and a hit","Played for the Pittsburgh Pirates","His game is considered the greatest pitching performance that ended in a loss"] },
  { player:"Bobo Holloman", sport:"⚾ MLB", answer:"BOBO HOLLOMAN", era:"legends", stats:{NH:"1",W:"3",ERA:"5.23",YEAR:"1953"}, ctx:"May 6 1953 — Only pitcher to throw no-hitter in first career start", clues:["Threw a no-hitter in his very first career start","Was the only pitcher ever to accomplish this feat","Played for the St. Louis Browns","Was out of the major leagues within 3 months after the no-hitter"] },
  { player:"Virgil Trucks", sport:"⚾ MLB", answer:"VIRGIL TRUCKS", era:"legends", stats:{W:"5",NH:"2",ERA:"3.97",YEAR:"1952"}, ctx:"1952 MLB Season — Detroit Tigers two no-hitters", clues:["Threw 2 no-hitters in the same season despite only winning 5 games","Played for the Detroit Tigers","His 2 no-hitters in a losing season is one of baseballs strangest records","Also struck out Babe Ruth in an exhibition game"] },
  { player:"Rube Waddell", sport:"⚾ MLB", answer:"RUBE WADDELL", era:"legends", stats:{W:"27",ERA:"1.62",SO:"349",WHIP:"0.978"}, ctx:"1904 MLB Season — Philadelphia Athletics strikeout king", clues:["Led the major leagues in strikeouts for 6 consecutive seasons","Was one of the most eccentric players in baseball history","Played for the Philadelphia Athletics","Would leave games to chase fire trucks and would be distracted by shiny objects"] },
  { player:"Ed Walsh", sport:"⚾ MLB", answer:"ED WALSH", era:"legends", stats:{W:"40",ERA:"1.27",IP:"464",CG:"42"}, ctx:"1908 MLB Season — Chicago White Sox — most innings ever", clues:["Won 40 games and threw 464 innings — still the most ever","Played for the Chicago White Sox","His career ERA of 1.82 is the lowest in baseball history","Threw a spitball that was devastating in the dead ball era"] },
  { player:"Mordecai Brown", sport:"⚾ MLB", answer:"THREE FINGER BROWN", era:"legends", stats:{W:"29",ERA:"1.04",CG:"27",WHIP:"0.861"}, ctx:"1906 MLB Season — Chicago Cubs dominant year", clues:["Had a 1.04 ERA — one of the lowest single-season totals ever","Played for the Chicago Cubs","Lost part of two fingers in a farm accident as a child","Nicknamed Three Finger Brown — the injury made his curve nastier"] },
  { player:"Pete Alexander", sport:"⚾ MLB", answer:"GROVER ALEXANDER", era:"legends", stats:{W:"33",ERA:"1.55",SO:"241",SHO:"16"}, ctx:"1916 MLB Season — Philadelphia Phillies dominant year", clues:["Won 33 games and threw 16 shutouts — both still records","Played for the Philadelphia Phillies","Suffered from epilepsy and alcoholism throughout his career","Was a hero of the 1926 World Series at age 39"] },
  { player:"Addie Joss", sport:"⚾ MLB", answer:"ADDIE JOSS", era:"legends", stats:{ERA:"1.16",W:"27",SHO:"9",WHIP:"0.867"}, ctx:"1908 MLB Season — Cleveland Naps — career best year", clues:["Has the second-lowest career ERA in baseball history","Played for the Cleveland Naps","Died of tubercular meningitis at age 31 at the peak of his career","Was inducted into the Hall of Fame despite falling short of the games requirement"] },
  { player:"Smoky Joe Wood", sport:"⚾ MLB", answer:"SMOKY JOE WOOD", era:"legends", stats:{W:"34",ERA:"1.91",SO:"258",WHIP:"1.036"}, ctx:"1912 MLB Season — Boston Red Sox dominant season", clues:["Won 34 games with the Boston Red Sox","Had one of the greatest single seasons in baseball history","Injured his arm and later converted to an outfielder","Was considered as fast as Walter Johnson in his prime"] },
  { player:"Eppa Rixey", sport:"⚾ MLB", answer:"EPPA RIXEY", era:"legends", stats:{W:"25",ERA:"2.78",SO:"134",WHIP:"1.168"}, ctx:"1922 MLB Season — Cincinnati Reds All-Star", clues:["Won 25 games for the Cincinnati Reds","Was the all-time leader in victories for a left-hander when he retired","Played for 21 seasons in the major leagues","Was 6ft 5in — a giant for his era"] },
  { player:"Wes Ferrell", sport:"⚾ MLB", answer:"WES FERRELL", era:"legends", stats:{W:"25",ERA:"3.52",HR:"7",YEAR:"1935"}, ctx:"1935 MLB Season — Boston Red Sox pitcher and hitter", clues:["Won 25 games AND hit 7 home runs — the most ever for a pitcher in a season","Was one of the best hitting pitchers in baseball history","Played for the Boston Red Sox","His brother Rick was also a major league catcher in the same era"] },
  { player:"Burleigh Grimes", sport:"⚾ MLB", answer:"BURLEIGH GRIMES", era:"legends", stats:{W:"25",ERA:"2.99",SO:"136",YEAR:"1921"}, ctx:"1921 MLB Season — Pittsburgh Pirates All-Star", clues:["Was the last legal spitball pitcher in MLB history","Won 25 games for the Pittsburgh Pirates","Had a long career spanning from 1916 to 1934","Was known as Old Stubblebeard for his unshaven face when pitching"] },
  { player:"Jack Chesbro", sport:"⚾ MLB", answer:"HAPPY JACK", era:"legends", stats:{W:"41",ERA:"1.82",CG:"48",IP:"454"}, ctx:"1904 MLB Season — New York Highlanders most wins ever", clues:["Won 41 games — the most in the modern era","Played for the New York Highlanders (later the Yankees)","Nicknamed Happy Jack for his cheerful disposition","Lost the pennant on a wild pitch on the final day of the season"] },
  { player:"Clark Griffith", sport:"⚾ MLB", answer:"THE OLD FOX", era:"legends", stats:{W:"24",ERA:"2.79",SO:"93",YEAR:"1898"}, ctx:"1898 MLB Season — Chicago Colts pitcher and manager", clues:["Won 24 games as a pitcher and was also the team manager","Nicknamed The Old Fox for his crafty pitching","Became one of the most powerful owners in baseball history","Owned the Washington Senators for decades"] },
  { player:"Jesse Haines", sport:"⚾ MLB", answer:"JESSE HAINES", era:"legends", stats:{W:"24",ERA:"3.25",SO:"101",YEAR:"1927"}, ctx:"1927 MLB Season — St. Louis Cardinals All-Star", clues:["Won 24 games for the St. Louis Cardinals","Was one of the few players elected by the Veterans Committee to the Hall of Fame","Played for the Cardinals alongside Grover Cleveland Alexander","Had a blister on his finger end a World Series game in 1926 — bringing in Alexander"] },
  { player:"Preben Elkjaer", sport:"⚽ Soccer", answer:"PREBEN ELKJAER", era:"modern", stats:{G:"38",APP:"69",YEAR:"1986",NATION:"Denmark"}, ctx:"Career — Denmark and Verona striker legend", clues:["Led Denmark to their first major tournament in 1984","Won the Serie A title with Hellas Verona in 1985 — one of the biggest shocks ever","Was the most famous Danish player before Peter Schmeichel","Nicknamed Crazy Horse for his energetic style"] },
  { player:"Dragan Stojkovic", sport:"⚽ Soccer", answer:"PIKSI", era:"modern", stats:{G:"29",APP:"84",YEAR:"1990",NATION:"Yugoslavia"}, ctx:"Career — Yugoslavia and Red Star Belgrade legend", clues:["Won the European Cup with Red Star Belgrade in 1991","Played for Yugoslavia and later Serbia","Nicknamed Piksi","Was considered the best Yugoslav player since the late 1980s"] },
  { player:"Davor Suker", sport:"⚽ Soccer", answer:"DAVOR SUKER", era:"classic", stats:{G:"6",APP:"7",MIN:"558",YEAR:"1998"}, ctx:"1998 FIFA World Cup — Croatia third place", clues:["Won the Golden Boot at the 1998 World Cup with 6 goals","Led Croatia to their best ever finish of third place","Played for Real Madrid and Arsenal","Croatian striker from Osijek"] },
  { player:"Hristo Stoichkov", sport:"⚽ Soccer", answer:"STOICHKOV HARD", era:"classic", stats:{G:"6",APP:"7",MIN:"630",YEAR:"1994"}, ctx:"1994 FIFA World Cup — Bulgaria semifinal run", clues:["Won the Golden Boot at the 1994 World Cup","Led Bulgaria to a shocking semifinal appearance","Won the Ballon d'Or in 1994","Played for Barcelona under Johan Cruyff"] },
  { player:"Tomas Skuhravy", sport:"⚽ Soccer", answer:"SKUHRAVY", era:"classic", stats:{G:"5",APP:"5",MIN:"450",YEAR:"1990"}, ctx:"1990 FIFA World Cup — Czechoslovakia", clues:["Scored 5 goals to finish as joint top scorer at the 1990 World Cup","Played for Czechoslovakia","Later played for Genoa in Serie A","Was a powerful aerial striker"] },
  { player:"Bebeto", sport:"⚽ Soccer", answer:"BEBETO HARD", era:"classic", stats:{G:"3",APP:"7",MIN:"630",YEAR:"1994"}, ctx:"1994 FIFA World Cup — Brazil champion", clues:["Scored 3 goals in the 1994 World Cup winning team","Was the perfect foil for Romario's creativity","Played for Deportivo La Coruna and Barcelona","Famous for his baby-rocking goal celebration after his son was born during the tournament"] },
  { player:"Zvonimir Boban", sport:"⚽ Soccer", answer:"ZVONIMIR BOBAN", era:"modern", stats:{G:"12",APP:"51",YEAR:"1998",NATION:"Croatia"}, ctx:"Career — Croatia and AC Milan midfield general", clues:["Was the captain of Croatia at the 1998 World Cup","Played for AC Milan and won multiple Serie A titles","Was suspended for kicking a policeman at a Zagreb derby in 1990","Croatian midfielder considered a legend by his country"] },
  { player:"Predrag Mijatovic", sport:"⚽ Soccer", answer:"MIJATOVIC", era:"classic", stats:{G:"1",APP:"1",YEAR:"1998",MATCH:"UCL Final"}, ctx:"1998 UEFA Champions League Final — Real Madrid vs Juventus", clues:["Scored the winning goal in the Champions League Final","Played for Real Madrid","Montenegrin striker who was a key player at Real Madrid","His goal broke the deadlock and gave Real Madrid the trophy"] },
  { player:"Mario Kempes", sport:"⚽ Soccer", answer:"MARIO KEMPES", era:"classic", stats:{G:"6",APP:"7",MIN:"630",YEAR:"1978"}, ctx:"1978 FIFA World Cup Final — Argentina hosts", clues:["Scored 6 goals to win the Golden Boot at the 1978 World Cup","Scored twice in the World Cup Final","Played for Argentina in their first World Cup victory","Played his club football in Spain for Valencia"] },
  { player:"Teofilo Cubillas", sport:"⚽ Soccer", answer:"CUBILLAS", era:"classic", stats:{G:"10",APP:"13",YEAR:"1978",NATION:"Peru"}, ctx:"Career — Peru and Alianza Lima legend", clues:["Scored 10 World Cup goals — still a record for a South American player","Was voted the best South American player of the 1970s","Played for Peru in the 1970 and 1978 World Cups","Was known for his curling free kicks and clever play"] },
  { player:"Antonin Panenka", sport:"⚽ Soccer", answer:"PANENKA", era:"classic", stats:{G:"1",PEN:"1",YEAR:"1976",MATCH:"Euro Final"}, ctx:"1976 European Championship Final — Czechoslovakia vs West Germany", clues:["Scored the most famous penalty in football history in the final","Chipped the ball down the middle while the goalkeeper dived","Czechoslovakia won the European Championship","His penalty style is now called a Panenka in his honor"] },
  { player:"Zbigniew Boniek", sport:"⚽ Soccer", answer:"ZIBI BONIEK", era:"classic", stats:{G:"4",APP:"7",MIN:"630",YEAR:"1982"}, ctx:"1982 FIFA World Cup — Poland third place", clues:["Scored a hat trick against Belgium in the 1982 World Cup","Led Poland to third place at the 1982 World Cup","Nicknamed Beautiful Zbig","Played for Juventus under Giovanni Trapattoni"] },
  { player:"Karl-Heinz Rummenigge", sport:"⚽ Soccer", answer:"RUMMENIGGE CLASSIC", era:"classic", stats:{G:"5",APP:"7",MIN:"614",YEAR:"1982"}, ctx:"1982 FIFA World Cup — West Germany finalist", clues:["Led West Germany to the World Cup Final","Won 2 consecutive Ballon d'Or awards (1980 and 1981)","Played for Bayern Munich his entire career","West Germany lost the 1982 Final to Italy in extra time"] },
  { player:"Grzegorz Lato", sport:"⚽ Soccer", answer:"GRZEGORZ LATO", era:"classic", stats:{G:"7",APP:"7",MIN:"630",YEAR:"1974"}, ctx:"1974 FIFA World Cup — Poland third place Golden Boot", clues:["Won the Golden Boot at the 1974 World Cup with 7 goals","Led Poland to a surprising third place finish","Played for Stal Mielec in Poland","Was part of one of the best Polish teams in history"] },
  { player:"Ivo Viktor", sport:"⚽ Soccer", answer:"IVO VIKTOR", era:"classic", stats:{CS:"4",APP:"7",MIN:"630",YEAR:"1976"}, ctx:"1976 European Championship — Czechoslovakia winners", clues:["Was the goalkeeper for Czechoslovakia when they won the European Championship","Faced Panenka's famous penalty in the final — dived the wrong way","Played for Dukla Prague","Was considered one of the best goalkeepers in European football in the 1970s"] },
  { player:"Josef Bican", sport:"⚽ Soccer", answer:"JOSEF BICAN", era:"legends", stats:{G:"805",CAREER:"1931-1956",NATION:"Austria-Czech",RECORD:"Yes"}, ctx:"Career — May be the greatest scorer in football history", clues:["Is credited with scoring over 800 goals in official matches","May have scored more career goals than any player in history","Played for Austria and later Czechoslovakia","Played for Slavia Prague and was dominant for 20 years"] },
  { player:"Ernst Willimowski", sport:"⚽ Soccer", answer:"ERNST WILLIMOWSKI", era:"legends", stats:{G:"4",APP:"1",YEAR:"1938",MATCH:"WC vs Brazil"}, ctx:"1938 FIFA World Cup — Poland vs Brazil 6-5", clues:["Scored 4 goals in a World Cup match but still lost 6-5","Played for Poland in the 1938 World Cup","Later played for Germany during WWII under complicated circumstances","His 4-goal game remains one of the most remarkable in World Cup history"] },
  { player:"Nandor Hidegkuti", sport:"⚽ Soccer", answer:"NANDOR HIDEGKUTI", era:"legends", stats:{G:"3",APP:"1",YEAR:"1953",MATCH:"Wembley"}, ctx:"Nov 25 1953 — Hungary 6-3 England at Wembley", clues:["Scored a hat trick in the famous 6-3 Hungary win at Wembley","England had never lost at home to non-British opposition before this","Was the deep-lying center forward who confused England","Played for MTK Budapest"] },
  { player:"Sindelar", sport:"⚽ Soccer", answer:"MATTHIAS SINDELAR", era:"legends", stats:{G:"27",APP:"43",YEAR:"1934",NATION:"Austria"}, ctx:"Career — Austria Wunderteam legend", clues:["Led the Austrian Wunderteam that was considered the best in the world in the early 1930s","Played for FK Austria Vienna","Nicknamed Der Papierene (The Paper Man) for his slender frame","Died under mysterious circumstances in 1939 after refusing to play for Nazi Germany"] },
  { player:"Gyula Zsengeller", sport:"⚽ Soccer", answer:"GYULA ZSENGELLER", era:"legends", stats:{G:"7",APP:"5",YEAR:"1938",NATION:"Hungary"}, ctx:"1938 FIFA World Cup — Hungary runner-up", clues:["Scored 7 goals at the 1938 World Cup — joint top scorer","Hungary reached the World Cup Final","Played for Ujpest in Hungary","Was one of Hungary's greatest goalscorers before the Golden Team era"] },
  { player:"Oldrich Nejedly", sport:"⚽ Soccer", answer:"OLDRICH NEJEDLY", era:"legends", stats:{G:"5",APP:"5",YEAR:"1934",NATION:"Czechoslovakia"}, ctx:"1934 FIFA World Cup — Czechoslovakia runner-up", clues:["Won the Golden Boot at the 1934 World Cup with 5 goals","Czechoslovakia reached the World Cup Final","Was the best Czech player of the prewar era","Played for Zizkovska Praha"] },
  { player:"Thomas Johansson", sport:"🎾 Tennis", answer:"THOMAS JOHANSSON", era:"modern", stats:{W:"1",GS:"1",YEAR:"2002",RANK:"20"}, ctx:"2002 Australian Open — Surprise champion at World No. 20", clues:["Won the Australian Open as a major underdog at World No. 20","Swedish player who was never a consistent top-10 player","Beat Marat Safin in the final","This was his only Grand Slam title"] },
  { player:"Gaston Gaudio", sport:"🎾 Tennis", answer:"GASTON GAUDIO", era:"modern", stats:{W:"1",GS:"1",YEAR:"2004",NATION:"Argentina"}, ctx:"2004 French Open — Won from match point down", clues:["Won the French Open from match point down in the final","Beat Guillermo Coria who was the heavy favorite","Argentine clay court player","This was his only Grand Slam title"] },
  { player:"Marat Safin", sport:"🎾 Tennis", answer:"MARAT SAFIN", era:"modern", stats:{W:"85",L:"11",GS:"2",RANK:"1"}, ctx:"2000 US Open — Demolished Sampras to win first Slam", clues:["Destroyed Pete Sampras 6-4 6-3 6-3 in the US Open Final","Won 2 Grand Slams in his career","From Moscow Russia","Was known for his explosive talent and racket-smashing antics"] },
  { player:"Thomas Muster", sport:"🎾 Tennis", answer:"THOMAS MUSTER HARD", era:"classic", stats:{W:"88",L:"12",GS:"1",TITLES:"12"}, ctx:"1995 ATP Season — French Open and World No. 1", clues:["Won the French Open and 12 titles this year","Won 45 clay court titles in his career","Austrian player nicknamed The Man of Clay","Came back from a shattered knee to win a Grand Slam"] },
  { player:"Michael Chang", sport:"🎾 Tennis", answer:"MICHAEL CHANG", era:"classic", stats:{W:"1",GS:"1",YEAR:"1989",AGE:"17"}, ctx:"1989 French Open — Youngest Grand Slam men's winner", clues:["Won the French Open at age 17 — the youngest men's Grand Slam winner ever","Won by defeating Lendl in a famous match where he cramped badly","American player of Chinese descent","Was the youngest player to win the French Open"] },
  { player:"Carlos Moya", sport:"🎾 Tennis", answer:"CARLOS MOYA", era:"classic", stats:{W:"1",GS:"1",RANK:"1",YEAR:"1998"}, ctx:"1998 French Open — Spanish champion reaches World No. 1", clues:["Won the French Open and reached World No. 1","Spanish clay court player","Was a huge star in Spain and helped inspire a generation of Spanish players","Later coached Rafael Nadal"] },
  { player:"Lleyton Hewitt", sport:"🎾 Tennis", answer:"LLEYTON HEWITT HARD", era:"modern", stats:{W:"80",L:"14",GS:"2",RANK:"1"}, ctx:"2001 ATP Season — Youngest World No. 1 at the time", clues:["Became the youngest World No. 1 at the time at age 20","Won the US Open this year","From Adelaide South Australia","Known for his fighting spirit and Come On celebration"] },
  { player:"Juan Carlos Ferrero", sport:"🎾 Tennis", answer:"MOSQUITO", era:"modern", stats:{W:"3",GS:"1",RANK:"1",YEAR:"2003"}, ctx:"2003 French Open — Reached World No. 1", clues:["Won the French Open and reached World No. 1","Nicknamed Mosquito for his darting movement on court","Spanish clay court player","Later coached Carlos Alcaraz to multiple Grand Slam titles"] },
  { player:"Gustavo Kuerten", sport:"🎾 Tennis", answer:"GUGA HARD", era:"modern", stats:{W:"3",GS:"3",YEAR:"2000",RANK:"1"}, ctx:"2000 ATP Season — World No. 1 and Roland Garros triple", clues:["Won Roland Garros for the 3rd time and reached World No. 1","Brazilian player nicknamed Guga","Won all 3 of his Grand Slams at Roland Garros","Was known for his warm personality and fan following in France"] },
  { player:"Nikolay Davydenko", sport:"🎾 Tennis", answer:"NIKOLAY DAVYDENKO", era:"modern", stats:{W:"5",TITLES:"21",RANK:"3",YEAR:"2006"}, ctx:"2006 ATP Season — World No. 3 dominant year", clues:["Won 5 titles and reached World No. 3 this season","Was one of the best players never to win a Grand Slam","From Severodonetsk Ukraine","Won the ATP World Tour Finals in 2009"] },
  { player:"Harold Solomon", sport:"🎾 Tennis", answer:"HAROLD SOLOMON", era:"classic", stats:{W:"22",RANK:"5",TITLES:"22",YEAR:"1980"}, ctx:"1980 ATP Season — Top 5 clay court specialist", clues:["Reached World No. 5 and was one of the best clay court players","Was one of the best American players of the late 1970s","Known for his heavy topspin and defensive clay court game","Never won a Grand Slam despite his consistency"] },
  { player:"Jose-Luis Clerc", sport:"🎾 Tennis", answer:"JOSE LUIS CLERC", era:"classic", stats:{W:"4",RANK:"4",TITLES:"25",YEAR:"1981"}, ctx:"1981 ATP Season — World No. 4 Argentine clay king", clues:["Reached World No. 4 and was one of the best clay court players","Argentine player who was a great rival of Guillermo Vilas","Won 25 career singles titles","Never won a Grand Slam despite being a world-class player"] },
  { player:"Hana Mandlikova", sport:"🎾 Tennis", answer:"HANA MANDLIKOVA", era:"classic", stats:{GS:"4",WIMB:"1",YEAR:"1985",NATION:"Czechoslovakia"}, ctx:"1985 US Open — Czech champion wins in New York", clues:["Won the US Open this year for her 4th Grand Slam title","Won 4 Grand Slam singles titles in her career","From Czechoslovakia","Was known for her flamboyant style and all-court game"] },
  { player:"Pam Shriver", sport:"🎾 Tennis", answer:"PAM SHRIVER", era:"classic", stats:{GS:"0",DOUBLES:"21",PARTNER:"Navratilova",RANK:"3"}, ctx:"Career — Greatest doubles player without a singles major", clues:["Won 21 Grand Slam doubles titles alongside Martina Navratilova","Never won a singles Grand Slam despite being a top-5 player","American player who reached the US Open final at age 16","Was one of the most successful doubles players ever"] },
  { player:"John Newcombe", sport:"🎾 Tennis", answer:"JOHN NEWCOMBE HARD", era:"classic", stats:{GS:"7",WIMB:"3",YEAR:"1971",NATION:"Australia"}, ctx:"1971 Wimbledon — Three-time champion", clues:["Won Wimbledon 3 times including this year","Won 7 Grand Slam singles titles total","Australian player with a famous handlebar mustache","Won the US Open twice and Australian Open twice"] },
  { player:"Vitas Gerulaitis", sport:"🎾 Tennis", answer:"VITAS GERULAITIS", era:"classic", stats:{GS:"1",TITLES:"27",RANK:"3",YEAR:"1977"}, ctx:"1977 Australian Open — Reached World No. 3", clues:["Won his only Grand Slam at the 1977 Australian Open","Reached World No. 3 at his peak","Was famous for his flamboyant lifestyle and the quote about nobody beating him twice","Died tragically from carbon monoxide poisoning in 1994"] },
  { player:"Kathy Jordan", sport:"🎾 Tennis", answer:"KATHY JORDAN", era:"classic", stats:{RANK:"6",WIMB:"QF",YEAR:"1983",STYLE:"S&V"}, ctx:"Career — American serve and volley specialist", clues:["Was one of the best serve and volley players in women's tennis","Reached World No. 6 in singles despite her attacking style","Was much more famous as a doubles player","From Bryn Mawr Pennsylvania"] },
  { player:"Ivan Lendl Draft", sport:"🎾 Tennis", answer:"IVAN LENDL HARD", era:"classic", stats:{W:"106",L:"9",GS:"3",TITLES:"11"}, ctx:"1986 ATP Season — Czech-American domination", clues:["Won 3 Grand Slams this year","Czech-American player who dominated the 1980s","Won 8 Grand Slams total in his career","Was famous for his intense training regime and fitness focus"] },
  { player:"Pancho Segura", sport:"🎾 Tennis", answer:"PANCHO SEGURA", era:"classic", stats:{TITLES:"Pro",RANK:"2",YEAR:"1952",NATION:"Ecuador"}, ctx:"Career — Professional tennis legend from Ecuador", clues:["Was considered the second-best player in the world behind Gonzales for years","Was from Ecuador — one of the first Latin American tennis stars","Used an unusual two-handed forehand that was highly effective","Later coached Jimmy Connors to great success"] },
  { player:"Frank Sedgman", sport:"🎾 Tennis", answer:"FRANK SEDGMAN HARD", era:"legends", stats:{GS:"5",YEAR:"1952",NATION:"Australia",DAVIS:"3"}, ctx:"1952 Season — Australian amateur champion", clues:["Won the Grand Slam in doubles (all 4 in one year) in 1951","Won 5 Grand Slam singles titles","Was the first Australian to dominate world tennis","Won 3 Davis Cup titles with Australia"] },
  { player:"Jack Kramer", sport:"🎾 Tennis", answer:"JACK KRAMER HARD", era:"legends", stats:{GS:"3",WIMB:"1",YEAR:"1947",NATION:"USA"}, ctx:"1947 Wimbledon — Post-war American champion", clues:["Won Wimbledon and US Championships in 1947","Dominated professional tennis after turning pro","Later became a powerful force in organizing professional tennis","From Las Vegas Nevada"] },
  { player:"Tony Trabert", sport:"🎾 Tennis", answer:"TONY TRABERT HARD", era:"legends", stats:{GS:"5",YEAR:"1955",NATION:"USA",SLAM:"1"}, ctx:"1955 ATP Season — Three Grand Slams in one year", clues:["Won 3 Grand Slams in one year (1955)","Won 5 Grand Slam singles titles total","American player from Cincinnati","Was considered the best American player of the mid-1950s"] },
  { player:"Lew Hoad", sport:"🎾 Tennis", answer:"LEW HOAD HARD", era:"legends", stats:{GS:"4",WIMB:"2",YEAR:"1956",NATION:"Australia"}, ctx:"1956 ATP Season — Two Grand Slams at age 21", clues:["Won Wimbledon and Australian Open at just 21","Had a career hampered by back injuries","Australian player who was Rod Laver's idol","Won 4 Grand Slams in his short but brilliant career"] },
  { player:"Mervyn Rose", sport:"🎾 Tennis", answer:"MERVYN ROSE", era:"legends", stats:{GS:"1",YEAR:"1954",NATION:"Australia",AO:"1"}, ctx:"1954 Australian Championships — Davis Cup stalwart", clues:["Won the Australian Championships in 1954","Was a key member of the dominant Australian Davis Cup teams","Was much better known as a doubles player","Later became a successful tennis coach"] },
  { player:"Ashley Cooper", sport:"🎾 Tennis", answer:"ASHLEY COOPER", era:"legends", stats:{GS:"4",YEAR:"1958",NATION:"Australia",RANK:"1"}, ctx:"1958 ATP Season — Australian dominant year", clues:["Won the US Open and Wimbledon in the same year","Won 4 Grand Slam singles titles","Was the World No. 1 player for two years","Australian player who dominated amateur tennis in the late 1950s"] },
  { player:"Neale Fraser", sport:"🎾 Tennis", answer:"NEALE FRASER", era:"legends", stats:{GS:"3",WIMB:"1",YEAR:"1960",NATION:"Australia"}, ctx:"1960 ATP Season — World No. 1 Australian", clues:["Won Wimbledon and US Championships back to back (1959-60)","Won 3 Grand Slam singles titles","Australian player who was World No. 1","Was much more celebrated as a doubles player with many Grand Slam titles"] },
  { player:"Malcolm Anderson", sport:"🎾 Tennis", answer:"MALCOLM ANDERSON", era:"legends", stats:{GS:"1",YEAR:"1957",NATION:"Australia",OPEN:"US"}, ctx:"1957 US Championships — Surprise American champion", clues:["Won the US Championships as a qualifier in 1957","Beat Ashley Cooper in the final in a major upset","Australian player who was unseeded","His victory remains one of the biggest upsets in major tennis history"] },
  { player:"Paul Azinger", sport:"⛳ Golf", answer:"PAUL AZINGER HARD", era:"classic", stats:{WINS:"1",MAJORS:"1",AVG:"70.51",YEAR:"1993"}, ctx:"1993 PGA Championship — Inverness Club win", clues:["Won the PGA Championship in a playoff over Greg Norman","Was later diagnosed with lymphoma but came back to compete","From Holyoke Massachusetts","Later became a successful US Ryder Cup captain in 2008"] },
  { player:"Bob Tway", sport:"⛳ Golf", answer:"BOB TWAY HARD", era:"classic", stats:{SCORE:"-12",BUNKER:"1",HOLE:"18",OPP:"Norman"}, ctx:"1986 PGA Championship — Bunker holed to beat Norman", clues:["Holed out from a bunker on the 72nd hole to win the PGA Championship","Came from behind to beat Greg Norman who was the overwhelming favorite","From Oklahoma City Oklahoma","Was a two-time PGA Tour winner"] },
  { player:"Hal Sutton", sport:"⛳ Golf", answer:"HAL SUTTON HARD", era:"classic", stats:{SCORE:"-10",MARGIN:"1",AGE:"25",FIELD:"Nicklaus"}, ctx:"1983 PGA Championship — Young champion beats Nicklaus", clues:["Won the PGA Championship at age 25 beating Nicklaus","Was named PGA Tour Player of the Year in 1983","From Shreveport Louisiana","His famous Ryder Cup pairing decision as captain in 2004 backfired badly"] },
  { player:"Larry Mize", sport:"⛳ Golf", answer:"LARRY MIZE HARD", era:"classic", stats:{CHIP:"45yds",HOLE:"11",PLAYOFF:"W",OPP:"Norman"}, ctx:"1987 Masters playoff — Chip-in for the ages", clues:["Chipped in from 45 yards on the 11th hole to beat Greg Norman","Was from Augusta Georgia — a true hometown hero story","Won in a sudden death playoff","The chip shattered Norman who had another major heartbreak"] },
  { player:"Sandy Lyle", sport:"⛳ Golf", answer:"SANDY LYLE HARD", era:"classic", stats:{BUNKER:"1",HOLE:"18",YEAR:"1988",WIN:"Masters"}, ctx:"1988 Masters — The bunker shot on 18 that won it all", clues:["Holed a bunker shot on 18 to win The Masters","Was the first British player to win The Masters","From Shrewsbury England of Scottish descent","Also won The Open Championship in 1985"] },
  { player:"Robert Gamez", sport:"⛳ Golf", answer:"ROBERT GAMEZ", era:"classic", stats:{EID:"1",HOLE:"18",YEAR:"1990",WIN:"Nestle Invitational"}, ctx:"1990 Nestle Invitational — Eagle on 18 to beat Norman", clues:["Holed a 7-iron from 176 yards on the 18th to beat Greg Norman by 1","Was a rookie at the time","From Las Vegas Nevada","Won 2 PGA Tour events in his career"] },
  { player:"Doug Ford", sport:"⛳ Golf", answer:"DOUG FORD HARD", era:"legends", stats:{SCORE:"-3",BUNKER:"H18",PLAYOFF:"No",LEAD:"3"}, ctx:"1957 Masters — Bunker shot to win Augusta", clues:["Holed out from the bunker on 18 to win The Masters","Also won the PGA Championship in 1955","From New Haven Connecticut","His hole-out at Augusta remains one of The Masters most dramatic moments"] },
  { player:"Tommy Armour", sport:"⛳ Golf", answer:"TOMMY ARMOUR HARD", era:"legends", stats:{MAJORS:"3",WIMB:"0",YEAR:"1927",NATION:"Scotland"}, ctx:"Career — The Silver Scot dominates 1920s-30s", clues:["Won 3 majors (US Open, British Open, PGA Championship)","Was known as The Silver Scot for his white hair","Served in World War I and was wounded losing sight in one eye","Later became one of the most famous golf teachers ever"] },
  { player:"Gene Sarazen", sport:"⛳ Golf", answer:"GENE SARAZEN HARD", era:"classic", stats:{MAJORS:"7",SLAM:"1",SHOT:"1",YEAR:"1935"}, ctx:"Career — First Grand Slam champion in golf", clues:["Won all 4 majors in his career — the first to do so","Invented the sand wedge which revolutionized the game","Made the shot heard round the world — a double eagle at the 1935 Masters","Won 7 major championships in his career"] },
  { player:"Henry Picard", sport:"⛳ Golf", answer:"HENRY PICARD", era:"legends", stats:{MAJORS:"2",WINS:"26",YEAR:"1939",PGA:"1"}, ctx:"1939 PGA Championship — Charleston's finest", clues:["Won the PGA Championship in 1939","Was the teacher of Sam Snead and Arnold Palmer's father","Won 26 PGA Tour events in his career","Nicknamed The Hershey Hurricane"] },
  { player:"Chick Evans", sport:"⛳ Golf", answer:"CHICK EVANS", era:"legends", stats:{AMATEUR:"2",US_OPEN:"1",YEAR:"1916",SWEEP:"1"}, ctx:"1916 Season — Amateur and US Open champion", clues:["Won both the US Amateur and US Open in the same year in 1916","Was an amateur who never turned professional","From Indianapolis Indiana","Set up the Evans Scholars Foundation which has given thousands of scholarships"] },
  { player:"Francis Ouimet", sport:"⛳ Golf", answer:"FRANCIS OUIMET", era:"legends", stats:{AMATEUR:"2",US_OPEN:"1",YEAR:"1913",AGE:"20"}, ctx:"1913 US Open — Amateur beats the British pros", clues:["Won the US Open as a 20-year-old amateur against the best British professionals","Is credited with popularizing golf in America","Had grown up across the street from The Country Club where he won","His story was told in the film The Greatest Game Ever Played"] },
  { player:"Lawson Little", sport:"⛳ Golf", answer:"LAWSON LITTLE HARD", era:"classic", stats:{AMATEUR:"4",YEAR:"1935",OPEN:"1",NATION:"USA"}, ctx:"Career — Double Amateur Grand Slam winner", clues:["Won both the US Amateur and British Amateur in consecutive years (1934-35)","Won 4 major amateur titles in just 2 years","Later won the US Open as a professional in 1940","From Newport Rhode Island"] },
  { player:"Ralph Guldahl", sport:"⛳ Golf", answer:"RALPH GULDAHL HARD", era:"legends", stats:{MAJORS:"3",WINS:"16",YEAR:"1938",STREAK:"2"}, ctx:"1938 Season — Back-to-back US Opens", clues:["Won the US Open in 1937 and 1938 consecutively","Also won The Masters in 1939","Mysteriously lost his game completely after writing a golf instruction book","From Dallas Texas"] },
  { player:"Billy Burke", sport:"⛳ Golf", answer:"BILLY BURKE", era:"legends", stats:{MAJORS:"1",WINS:"7",YEAR:"1931",ROUNDS:"144"}, ctx:"1931 US Open — Longest playoff in major history", clues:["Won the US Open after a 144-hole playoff — the longest ever","The playoff lasted two full days of 36-hole rounds","From Naugatuck Connecticut","Was the first US Open champion born outside the United States"] },
  { player:"Willie Anderson", sport:"⛳ Golf", answer:"WILLIE ANDERSON", era:"legends", stats:{MAJORS:"4",US_OPEN:"4",YEAR:"1905",STREAK:"3"}, ctx:"Career — Four US Open champion", clues:["Won 4 US Opens — still tied for the record","Won 3 consecutive US Opens from 1903 to 1905","From North Berwick Scotland","Died at age 31 from arteriosclerosis — his early death cut short a great career"] },
  { player:"Johnny McDermott", sport:"⛳ Golf", answer:"JOHNNY MCDERMOTT", era:"legends", stats:{MAJORS:"2",US_OPEN:"2",YEAR:"1911",FIRST:"1"}, ctx:"1911 US Open — First American-born champion", clues:["Was the first American-born player to win the US Open","Won back-to-back US Opens in 1911 and 1912","Was only 19 when he won his first US Open","Had a mental breakdown and was institutionalized for most of his adult life"] },
  { player:"Walter Travis", sport:"⛳ Golf", answer:"WALTER TRAVIS", era:"legends", stats:{AMATEUR:"4",BRITISH:"1",YEAR:"1904",PUTTER:"Yes"}, ctx:"1904 British Amateur — First overseas winner", clues:["Was the first overseas player to win the British Amateur","Won 4 major amateur titles in his career","Didn't take up golf until age 35 yet became one of the best","His controversial Schenectady putter was banned by the R&A after he won with it"] },
  { player:"Jock Hutchison", sport:"⛳ Golf", answer:"JOCK HUTCHISON", era:"legends", stats:{MAJORS:"2",BRIT:"1",PGA:"1",YEAR:"1921"}, ctx:"1921 British Open — First American to win at St Andrews", clues:["Was the first American to win The Open Championship at St Andrews","Won the PGA Championship in 1920","Was born in St Andrews Scotland but competed for America","Was controversially alleged to have used ribbed clubs to create more spin"] },
  { player:"Freddie McLeod", sport:"⛳ Golf", answer:"FREDDIE MCLEOD", era:"legends", stats:{MAJORS:"1",US_OPEN:"1",YEAR:"1908",WEIGHT:"108"}, ctx:"1908 US Open — Lightest champion", clues:["Won the 1908 US Open","Was said to weigh only 108 pounds — the lightest US Open champion ever","Was born in North Berwick Scotland","Later became the club professional at Columbia Country Club for decades"] },
  { player:"Alex Ross", sport:"⛳ Golf", answer:"ALEX ROSS", era:"legends", stats:{MAJORS:"1",US_OPEN:"1",YEAR:"1907",BROTHER:"Donald"}, ctx:"1907 US Open — Champion and designer's brother", clues:["Won the 1907 US Open","Was the brother of famous golf course designer Donald Ross","Was born in Dornoch Scotland","Was a club professional for most of his life after winning the title"] },
  { player:"Fred Herd", sport:"⛳ Golf", answer:"FRED HERD", era:"legends", stats:{MAJORS:"1",US_OPEN:"1",YEAR:"1898",NATION:"Scotland"}, ctx:"1898 US Open — Early American champion", clues:["Won the 1898 US Open","Was born in St Andrews Scotland","Later became a club professional at Washington Park in Chicago","Was part of the Scottish-born wave of professionals who dominated early American golf"] },
  { player:"Roman Hamrlik", sport:"🏒 NHL", answer:"ROMAN HAMRLIK", era:"modern", stats:{G:"16",AST:"49",PTS:"65",YEAR:"2002"}, ctx:"2001-02 NHL Season — New York Islanders", clues:["Was the 1st overall pick in the 1992 NHL Draft","Played for the New York Islanders this season","Czech defenseman who had a long productive career","Was the first Czech player selected 1st overall in NHL history"] },
  { player:"Alexandre Daigle", sport:"🏒 NHL", answer:"ALEXANDRE DAIGLE", era:"classic", stats:{G:"12",AST:"24",PTS:"36",YEAR:"1994"}, ctx:"1993-94 NHL Season — Ottawa Senators first overall pick", clues:["Was the 1st overall pick in the 1993 NHL Draft","Played for the Ottawa Senators","Was one of the biggest busts in NHL draft history given the hype","Famously said he was happy to be drafted 1st overall because no one remembers 2nd"] },
  { player:"Bryan Berard", sport:"🏒 NHL", answer:"BRYAN BERARD", era:"classic", stats:{G:"20",AST:"50",PTS:"70",YEAR:"1997"}, ctx:"1996-97 NHL Season — New York Islanders Calder Trophy", clues:["Won the Calder Trophy as NHL Rookie of the Year","Was the 1st overall pick in the 1995 NHL Draft","Had his career derailed by an eye injury from a stick","Came back to play professionally despite losing most of the vision in one eye"] },
  { player:"Dainius Zubrus", sport:"🏒 NHL", answer:"DAINIUS ZUBRUS", era:"modern", stats:{G:"16",AST:"28",PTS:"44",YEAR:"2004"}, ctx:"2003-04 NHL Season — Washington Capitals", clues:["Was a Lithuanian-born forward who had a long NHL career","Played for the Washington Capitals this season","Was selected 15th overall in the 1996 NHL Draft","Was one of the first Lithuanian players to have a significant NHL career"] },
  { player:"Sergei Gonchar", sport:"🏒 NHL", answer:"SERGEI GONCHAR", era:"modern", stats:{G:"18",AST:"47",PTS:"65",YEAR:"2004"}, ctx:"2003-04 NHL Season — Washington Capitals", clues:["Was one of the most productive offensive defensemen of his era","Played for the Washington Capitals this season","Russian defenseman who later won the Stanley Cup with Pittsburgh","Was the 14th overall pick in the 1992 NHL Draft"] },
  { player:"Pierre Turgeon", sport:"🏒 NHL", answer:"PIERRE TURGEON HARD", era:"classic", stats:{G:"58",AST:"74",PTS:"132",PIM:"26"}, ctx:"1992-93 NHL Season — New York Islanders elite season", clues:["Scored 132 points this season","Played for New York Islanders","From Rouyn-Noranda Quebec","Was the 1st overall pick in the 1987 NHL Draft"] },
  { player:"Owen Nolan", sport:"🏒 NHL", answer:"OWEN NOLAN", era:"classic", stats:{G:"44",AST:"40",PTS:"84",YEAR:"1999"}, ctx:"1998-99 NHL Season — San Jose Sharks captain", clues:["Was the captain and face of the San Jose Sharks","Was the 1st overall pick in the 1990 NHL Draft by Quebec","From Belfast Northern Ireland — one of the few Irish-born NHLers","Was famous for pointing to where he would shoot in an All-Star Game then doing it"] },
  { player:"Mats Sundin", sport:"🏒 NHL", answer:"MATS SUNDIN HARD", era:"modern", stats:{G:"41",AST:"47",PTS:"88",PIM:"68"}, ctx:"2001-02 NHL Season — Toronto Maple Leafs captain", clues:["Was the captain and face of the Toronto Maple Leafs for many years","From Bromma Sweden","Was the first European player selected 1st overall in the NHL Draft (1989)","Won 2 Olympic gold medals with Sweden"] },
  { player:"Reg Noble", sport:"🏒 NHL", answer:"REG NOBLE", era:"legends", stats:{G:"20",AST:"10",PTS:"30",YEAR:"1918"}, ctx:"1917-18 NHL Season — Toronto Arenas first champion", clues:["Won the Stanley Cup with the Toronto Arenas in the very first NHL season","Played in the first NHL game ever","Was part of the original NHL when only 4 teams existed","Was a rough and tumble player known for fighting"] },
  { player:"Cy Denneny", sport:"🏒 NHL", answer:"CY DENNENY HARD", era:"classic", stats:{G:"318",YEAR:"1929",TEAM:"Senators",CUPS:"4"}, ctx:"Career — Ottawa Senators early NHL scoring king", clues:["Was the NHL all-time leading scorer when he retired","Won 4 Stanley Cups with the Ottawa Senators","Was one of the top goal scorers of the early NHL era","Played in the NHL first season in 1917-18"] },
  { player:"Howie Morenz", sport:"🏒 NHL", answer:"HOWIE MORENZ", era:"legends", stats:{G:"40",AST:"28",PTS:"68",YEAR:"1930"}, ctx:"1929-30 NHL Season — Montreal Canadiens MVP", clues:["Won the Hart Trophy as league MVP","Was considered the greatest hockey player of his era","Played for Montreal Canadiens","Died tragically at age 34 from complications after a leg fracture on the ice"] },
  { player:"Aurele Joliat", sport:"🏒 NHL", answer:"AURELE JOLIAT", era:"legends", stats:{G:"29",AST:"11",PTS:"40",YEAR:"1925"}, ctx:"1924-25 NHL Season — Montreal Canadiens champion", clues:["Won the Stanley Cup with the Montreal Canadiens","Was a small but fierce winger who played alongside Howie Morenz","Won 3 Stanley Cups with Montreal","Nicknamed The Mighty Atom for his size but toughness"] },
  { player:"King Clancy", sport:"🏒 NHL", answer:"KING CLANCY", era:"classic", stats:{G:"9",AST:"15",PTS:"24",YEAR:"1927"}, ctx:"Career — Ottawa Senators defenseman traded for a King", clues:["Was traded from Ottawa Senators to Toronto for $35000 and two players — a record at the time","Was one of the most beloved defensemen of his era","Won 3 Stanley Cups","Later became a beloved ambassador for the Toronto Maple Leafs"] },
  { player:"Jack Adams", sport:"🏒 NHL", answer:"JACK ADAMS", era:"classic", stats:{G:"83",AST:"37",PTS:"120",YEAR:"1922"}, ctx:"Career — Player who became hockey's greatest executive", clues:["Was a decent player who became a legendary executive","Built the Detroit Red Wings dynasty as general manager","The Jack Adams Award for best coach is named after him","Played for Toronto and Ottawa in the early NHL"] },
  { player:"Dit Clapper NHL", sport:"🏒 NHL", answer:"DIT CLAPPER HARD", era:"classic", stats:{G:"228",YEAR:"1947",TEAM:"Bruins",CUPS:"3"}, ctx:"Career — Boston Bruins 20-year iron man", clues:["Played 20 seasons for the Boston Bruins — a record at the time","Won 3 Stanley Cups with the Bruins","Was the first player to play 20 NHL seasons with one team","Played both forward and defense during his long career"] },
  { player:"Joe Malone", sport:"🏒 NHL", answer:"JOE MALONE", era:"legends", stats:{G:"44",APP:"20",YEAR:"1918",AVG:"2.2"}, ctx:"1917-18 NHL Season — Quebec Bulldogs goals record", clues:["Scored 44 goals in 20 games — 2.2 per game — a record that still stands","Played in the very first NHL season","His goals-per-game record is considered unbreakable","Was called Phantom Joe for his ability to appear out of nowhere"] },
  { player:"Newsy Lalonde", sport:"🏒 NHL", answer:"NEWSY LALONDE", era:"legends", stats:{G:"22",AST:"9",PTS:"31",YEAR:"1920"}, ctx:"1919-20 NHL Season — Montreal Canadiens scoring leader", clues:["Was the NHL scoring leader multiple times","Played for the Montreal Canadiens","Was also a professional lacrosse player","Was one of the most feared players of the early hockey era"] },
  { player:"George Boucher", sport:"🏒 NHL", answer:"GEORGE BOUCHER", era:"legends", stats:{G:"13",AST:"15",PTS:"28",YEAR:"1923"}, ctx:"Career — Ottawa Senators dynasty defenseman", clues:["Won 4 Stanley Cups with the Ottawa Senators","Was considered one of the best defensemen of the 1920s","Was part of the great Ottawa Senators dynasty","Was one of 4 brothers who all played professional hockey"] },
  { player:"Sprague Cleghorn", sport:"🏒 NHL", answer:"SPRAGUE CLEGHORN", era:"legends", stats:{G:"17",AST:"4",PTS:"21",YEAR:"1922"}, ctx:"Career — Most feared player of the 1920s", clues:["Was considered the dirtiest and most feared player of his era","Won the Stanley Cup with the Montreal Canadiens","Was suspended multiple times for violent play","Was both a gifted scorer and a notorious enforcer"] },
  { player:"Frank Nighbor", sport:"🏒 NHL", answer:"FRANK NIGHBOR", era:"legends", stats:{G:"19",AST:"9",PTS:"28",YEAR:"1924"}, ctx:"Career — Ottawa Senators gentleman champion", clues:["Won the very first Hart Trophy as league MVP in 1924","Also won the first Lady Byng Trophy for sportsmanship","Won 5 Stanley Cups in his career","Nicknamed The Pembroke Peach"] },
  { player:"Roy Worters", sport:"🏒 NHL", answer:"ROY WORTERS", era:"legends", stats:{GAA:"1.61",SO:"13",YEAR:"1929",HT:"5'3\""}, ctx:"1928-29 NHL Season — Pittsburgh Pirates MVP", clues:["Won the Hart Trophy as league MVP as a goaltender","Was only 5ft 3in — one of the smallest players in NHL history","Played for the Pittsburgh Pirates","Nicknamed Shrimp for his small stature"] },
  { player:"Kwame Brown", sport:"🏀 NBA", answer:"KWAME BROWN", era:"modern", stats:{PICK:"1",YEAR:"2001",TEAM:"Washington Wizards",SCHOOL:"Glynn Academy HS"}, ctx:"2001 NBA Draft — #1 Overall Pick — biggest bust ever?", clues:["Was the first high school player ever selected 1st overall in the NBA Draft","Played for the Washington Wizards","Was selected by Michael Jordan who was then team president","Is widely considered the biggest bust at #1 in NBA history"] },
  { player:"Greg Oden", sport:"🏀 NBA", answer:"GREG ODEN", era:"modern", stats:{PICK:"1",YEAR:"2007",TEAM:"Portland Trail Blazers",SCHOOL:"Ohio State"}, ctx:"2007 NBA Draft — #1 Overall Pick over Kevin Durant", clues:["Was selected #1 overall over Kevin Durant who went #2","Played for the Portland Trail Blazers","Had his career devastated by multiple knee surgeries","Played only 82 games in his first 4 NBA seasons"] },
  { player:"Michael Olowokandi", sport:"🏀 NBA", answer:"KANDI MAN", era:"classic", stats:{PICK:"1",YEAR:"1998",TEAM:"Los Angeles Clippers",SCHOOL:"Pacific"}, ctx:"1998 NBA Draft — #1 Overall Pick", clues:["Was selected #1 overall by the Los Angeles Clippers","Played at the University of Pacific — an obscure pick","Was considered a massive bust given his talent level","Was selected over Vince Carter Paul Pierce and Dirk Nowitzki"] },
  { player:"LaRue Martin", sport:"🏀 NBA", answer:"LARUE MARTIN", era:"classic", stats:{PICK:"1",YEAR:"1972",TEAM:"Portland Trail Blazers",SCHOOL:"Loyola"}, ctx:"1972 NBA Draft — #1 Overall Pick over Bob McAdoo", clues:["Was selected #1 overall over Bob McAdoo Julius Erving and Paul Westphal","Is considered the worst #1 pick in NBA Draft history","Played for the Portland Trail Blazers","Only played 4 seasons and never averaged more than 5 points per game"] },
  { player:"Joe Barry Carroll", sport:"🏀 NBA", answer:"JOE BARRY CARROLL", era:"classic", stats:{PICK:"1",YEAR:"1980",TEAM:"Golden State Warriors",SCHOOL:"Purdue"}, ctx:"1980 NBA Draft — #1 Overall Pick traded for Robert Parish and McHale", clues:["Was traded on draft night for Robert Parish and Kevin McHale who helped win multiple titles","Was selected #1 overall by Golden State Warriors","Played at Purdue University","The trade is considered the worst in NBA history for Golden State"] },
  { player:"Pervis Ellison", sport:"🏀 NBA", answer:"NEVER NERVOUS PERVIS", era:"classic", stats:{PICK:"1",YEAR:"1989",TEAM:"Sacramento Kings",SCHOOL:"Louisville"}, ctx:"1989 NBA Draft — #1 Overall Pick", clues:["Was selected #1 overall by the Sacramento Kings","Won an NCAA championship at Louisville in 1986","Was nicknamed Never Nervous Pervis but injuries made him nervous","Was traded to Washington where he won the Most Improved Player award in 1992"] },
  { player:"Danny Manning", sport:"🏀 NBA", answer:"DANNY MANNING", era:"classic", stats:{PICK:"1",YEAR:"1988",TEAM:"Los Angeles Clippers",SCHOOL:"Kansas"}, ctx:"1988 NBA Draft — #1 Overall Pick", clues:["Was selected #1 overall by the Los Angeles Clippers","Won the NCAA championship at Kansas this same year — as a senior","Had his career limited by multiple knee injuries","Was a skilled and versatile big man"] },
  { player:"Ki-Jana Carter", sport:"🏈 NFL", answer:"KI JANA CARTER", era:"classic", stats:{PICK:"1",YEAR:"1995",TEAM:"Cincinnati Bengals",SCHOOL:"Penn State"}, ctx:"1995 NFL Draft — #1 Overall Pick career ended by injury", clues:["Was selected #1 overall by the Cincinnati Bengals","Tore his ACL in his first preseason game and was never the same","Played at Penn State where he was one of the best backs ever","Is considered one of the most tragic career trajectories for a top pick"] },
  { player:"David Carr", sport:"🏈 NFL", answer:"DAVID CARR", era:"modern", stats:{PICK:"1",YEAR:"2002",TEAM:"Houston Texans",SCHOOL:"Fresno State"}, ctx:"2002 NFL Draft — #1 Overall Pick first expansion team", clues:["Was the first player ever drafted by the Houston Texans — an expansion team","Was sacked an NFL record 76 times as a rookie","Played at Fresno State","His brother Derek Carr also played quarterback in the NFL"] },
  { player:"Tim Couch", sport:"🏈 NFL", answer:"TIM COUCH", era:"classic", stats:{PICK:"1",YEAR:"1999",TEAM:"Cleveland Browns",SCHOOL:"Kentucky"}, ctx:"1999 NFL Draft — #1 Overall Pick first Cleveland Browns pick", clues:["Was the first player drafted by the new Cleveland Browns expansion team","Played at the University of Kentucky","Was considered a sure-thing prospect who never found consistent success","The Browns went 2-14 in his rookie season"] },
  { player:"Steve Emtman", sport:"🏈 NFL", answer:"STEVE EMTMAN HARD", era:"classic", stats:{PICK:"1",YEAR:"1992",TEAM:"Indianapolis Colts",SCHOOL:"Washington"}, ctx:"1992 NFL Draft — #1 Overall Pick career ended by injuries", clues:["Was selected #1 overall by the Indianapolis Colts","Won the Outland Trophy and Lombardi Award in college at Washington","Had his career essentially ended by knee injuries within 2 seasons","Is considered one of the biggest injury-related busts for a #1 pick"] },
  { player:"Ken Sims", sport:"🏈 NFL", answer:"KEN SIMS", era:"classic", stats:{PICK:"1",YEAR:"1982",TEAM:"New England Patriots",SCHOOL:"Texas"}, ctx:"1982 NFL Draft — #1 Overall Pick bust", clues:["Was selected #1 overall by the New England Patriots","Played defensive tackle at the University of Texas","Was considered a total bust having virtually no impact","The Patriots lost out on other great players with this pick"] },
  { player:"Brian Bosworth", sport:"🏈 NFL", answer:"THE BOZ", era:"classic", stats:{PICK:"1",YEAR:"1987",TEAM:"Seattle Seahawks",SCHOOL:"Oklahoma"}, ctx:"1987 NFL Supplemental Draft — The Boz phenomenon", clues:["Was selected in the supplemental draft by the Seattle Seahawks","Was the most hyped linebacker prospect in college football history","Nicknamed The Boz for his unusual haircut and brash personality","Was destroyed on a famous run by Bo Jackson which defined his NFL career"] },
  { player:"Aundray Bruce", sport:"🏈 NFL", answer:"AUNDRAY BRUCE", era:"classic", stats:{PICK:"1",YEAR:"1988",TEAM:"Atlanta Falcons",SCHOOL:"Auburn"}, ctx:"1988 NFL Draft — #1 Overall Pick linebacker", clues:["Was selected #1 overall by the Atlanta Falcons","Played linebacker at Auburn University","Is considered one of the biggest busts at #1 in NFL history","The Falcons passed over multiple future Hall of Famers with this pick"] },
  { player:"Arnie Herber", sport:"🏈 NFL", answer:"ARNIE HERBER", era:"legends", stats:{YDS:"1239",TD:"14",INT:"8",YEAR:"1936"}, ctx:"1936 NFL Season — Green Bay Packers first great passer", clues:["Was the first great forward passer in NFL history","Won 4 NFL championships with the Green Bay Packers","From Green Bay Wisconsin","Was known for his unusually long fingers that helped him grip the ball"] },
  { player:"Pete Henry", sport:"🏈 NFL", answer:"FATS HENRY", era:"legends", stats:{KICK:"29",RUSH:"54",YEAR:"1923",POS:"OT/K"}, ctx:"Career — Canton Bulldogs dynasty tackle and kicker", clues:["Won 2 NFL championships with the Canton Bulldogs","Was considered the best lineman of his era","Nicknamed Fats Henry","Was also a punter who could kick over 90 yards"] },
  { player:"Cal Hubbard", sport:"🏈 NFL", answer:"CAL HUBBARD", era:"legends", stats:{POS:"OT/LB",YEAR:"1931",TEAMS:"2",BASEBALL:"1"}, ctx:"Career — Only Hall of Famer in both football and baseball", clues:["Is the only person inducted into both the Pro Football and Baseball Hall of Fames","Won 3 NFL championships in his career","Later became a famous and respected baseball umpire","Was 6ft 5in and 250 pounds — massive for his era"] },
  { player:"Mel Hein", sport:"🏈 NFL", answer:"MEL HEIN", era:"legends", stats:{POS:"C/LB",MVP:"1",YEAR:"1938",TEAM:"Giants"}, ctx:"1938 NFL MVP Season — New York Giants center", clues:["Won the NFL MVP award — one of the few linemen ever to do so","Played center and linebacker for the New York Giants","Was named All-Pro 8 consecutive times","Played 15 seasons without missing a single game"] },
  { player:"Tank Younger", sport:"🏈 NFL", answer:"TANK YOUNGER", era:"legends", stats:{RUSH:"696",REC:"45",TD:"7",YEAR:"1954"}, ctx:"Career — First HBCU player in NFL history", clues:["Was the first player from a historically Black college to play in the NFL","Played for the Los Angeles Rams","Was from Grambling State University","Helped open the door for HBCU players in professional football"] },
  { player:"Bulldog Turner", sport:"🏈 NFL", answer:"BULLDOG TURNER", era:"legends", stats:{POS:"C/LB",INT:"8",YEAR:"1942",TEAM:"Bears"}, ctx:"Career — Chicago Bears two-way center champion", clues:["Was considered the best center of his era","Also played linebacker and led the NFL in interceptions","Won 4 NFL championships with the Chicago Bears","Nicknamed Bulldog for his tenacious style"] },
  { player:"Dan Fortmann", sport:"🏈 NFL", answer:"DAN FORTMANN", era:"legends", stats:{POS:"G",AGE:"19",YEAR:"1936",TITLES:"3"}, ctx:"Career — Youngest starter in NFL history becoming a doctor", clues:["Was one of the youngest starters in NFL history at age 19","Won 3 NFL championships with the Chicago Bears","Was named All-Pro 6 consecutive times","Later became a physician and team doctor"] },
  { player:"Ed Sprinkle", sport:"🏈 NFL", answer:"ED SPRINKLE", era:"legends", stats:{POS:"DE",YEAR:"1950",TEAM:"Bears",NICK:"Claw"}, ctx:"Career — Chicago Bears most feared defensive end", clues:["Was called the meanest man in football by the Saturday Evening Post","Nicknamed The Claw for his pass rushing technique","Played for the Chicago Bears his entire career","Was one of the first dominant pass rushing defensive ends in NFL history"] },
  { player:"Bill Hewitt NFL", sport:"🏈 NFL", answer:"BILL HEWITT NO HELMET", era:"legends", stats:{REC:"31",TD:"8",YEAR:"1936",HELMET:"No"}, ctx:"Career — Last player to play without a helmet", clues:["Was the last player in NFL history to regularly play without a helmet","Won 2 NFL championships with the Bears and Eagles","Was inducted into the Hall of Fame in 1971","Was known as The Offside Kid for his quick jump at the snap"] },
  { player:"Turk Edwards", sport:"🏈 NFL", answer:"TURK EDWARDS", era:"legends", stats:{POS:"OT",YEAR:"1936",TEAM:"Redskins",ALLPRO:"4"}, ctx:"Career — Washington Redskins offensive tackle All-Pro", clues:["Was selected All-Pro 4 times in his career","Played for the Boston and Washington Redskins","Had his career ended when his knee gave way during a coin toss","Was inducted into the Hall of Fame in 1969"] },
  { player:"Link Lyman", sport:"🏈 NFL", answer:"LINK LYMAN", era:"legends", stats:{POS:"DT",YEAR:"1925",TEAM:"Bears",TITLES:"3"}, ctx:"Career — Chicago Bears dynasty tackle pioneer", clues:["Won 3 NFL championships with the Chicago Bears","Was one of the first players to use defensive line shifts and stunts","Played for the Chicago Bears under George Halas","Was inducted into the Hall of Fame in 1964"] },
  { player:"George Connor", sport:"🏈 NFL", answer:"GEORGE CONNOR", era:"legends", stats:{POS:"OT/LB",ALLPRO:"4",YEAR:"1951",TEAM:"Bears"}, ctx:"Career — Chicago Bears two-way Pro Bowl star", clues:["Was selected All-Pro on both offense and defense in different seasons","Played offensive tackle and linebacker for the Chicago Bears","Won the Outland Trophy at Notre Dame in 1947","Was inducted into the Hall of Fame in 1975"] },
  { player:"Jack Chesbro Happy Jack", sport:"⚾ MLB", answer:"HAPPY JACK CHESBRO", era:"legends", stats:{W:"41",ERA:"1.82",CG:"48",IP:"454"}, ctx:"1904 MLB Season — New York Highlanders most wins ever", clues:["Won 41 games — the most in the modern era of baseball","Played for the New York Highlanders later renamed the Yankees","Nicknamed Happy Jack for his cheerful disposition","Lost the pennant on a wild pitch on the final day of the season"] },
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
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 800);
  useEffect(() => {
    const handle = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);
  const isDesktop = windowWidth >= 960;
  const [diff, setDiff] = useState<Difficulty>("easy");
  const [filter, setFilter] = useState<Set<string>>(() => {
    try { const s = localStorage.getItem("statsiq_filter"); return s ? new Set(JSON.parse(s)) : new Set<string>(); } catch { return new Set<string>(); }
  });
  const [eraFilter, setEraFilter] = useState<Set<Era>>(() => {
    try { const s = localStorage.getItem("statsiq_era_filter"); return s ? new Set(JSON.parse(s)) : new Set<Era>(); } catch { return new Set<Era>(); }
  });
  const [showFilter, setShowFilter] = useState(false);
  const [showHow, setShowHow] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
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

  // Show email capture after first perfect day if not already submitted
  useEffect(() => {
    const allDone = (["easy","medium","hard"] as Difficulty[]).every(d => completedToday.has(d));
    if (allDone && !emailSubmitted) {
      const t = setTimeout(() => setShowEmailCapture(true), 2000);
      return () => clearTimeout(t);
    }
  }, [completedToday, emailSubmitted]);

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
    const parts = player.split(" ");
    // Match against: answer key, first name, last name, full name, nickname aliases
    const validAnswers = [answer, parts[0], parts[parts.length - 1], player.replace(/\s/g, "")];
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
    canvas.height = 1080;
    const ctx2 = canvas.getContext("2d")!;

    // Background
    ctx2.fillStyle = "#080c14";
    ctx2.fillRect(0, 0, 1080, 1080);

    // Subtle radial glow
    const grd = ctx2.createRadialGradient(540, 400, 0, 540, 400, 600);
    const glowColor = won
      ? diff === "hard" ? "rgba(168,85,247,0.18)" : diff === "medium" ? "rgba(59,130,246,0.18)" : "rgba(34,197,94,0.15)"
      : "rgba(239,68,68,0.12)";
    grd.addColorStop(0, glowColor);
    grd.addColorStop(1, "transparent");
    ctx2.fillStyle = grd;
    ctx2.fillRect(0, 0, 1080, 1080);

    // Grid lines (subtle)
    ctx2.strokeStyle = "rgba(255,255,255,0.03)";
    ctx2.lineWidth = 1;
    for (let x = 0; x < 1080; x += 60) { ctx2.beginPath(); ctx2.moveTo(x,0); ctx2.lineTo(x,1080); ctx2.stroke(); }
    for (let y = 0; y < 1080; y += 60) { ctx2.beginPath(); ctx2.moveTo(0,y); ctx2.lineTo(1080,y); ctx2.stroke(); }

    // Top border line
    const accentColor = won
      ? diff === "hard" ? "#a855f7" : diff === "medium" ? "#3b82f6" : "#22c55e"
      : "#ef4444";
    ctx2.fillStyle = accentColor;
    ctx2.fillRect(0, 0, 1080, 6);

    // STATSIQ logo
    ctx2.font = "900 52px 'Arial Black', Arial, sans-serif";
    ctx2.fillStyle = "#ffd700";
    ctx2.letterSpacing = "8px";
    ctx2.fillText("STATSIQ", 72, 100);

    // Tagline
    ctx2.font = "400 22px Arial, sans-serif";
    ctx2.fillStyle = "#4b5563";
    ctx2.letterSpacing = "4px";
    ctx2.fillText("DAILY SPORTS TRIVIA", 72, 132);

    // Date + difficulty pill
    const date = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    ctx2.font = "700 24px Arial, sans-serif";
    ctx2.fillStyle = "#6b7280";
    ctx2.letterSpacing = "2px";
    ctx2.fillText(date.toUpperCase(), 72, 174);

    // Difficulty badge
    const diffLabel = diff === "easy" ? "EASY" : diff === "medium" ? "MEDIUM" : "HARD";
    ctx2.font = "900 20px Arial, sans-serif";
    const diffW = ctx2.measureText(diffLabel).width + 32;
    ctx2.fillStyle = accentColor + "22";
    roundRect(ctx2, 900 - diffW, 148, diffW + 8, 36, 8);
    ctx2.fill();
    ctx2.strokeStyle = accentColor + "66";
    ctx2.lineWidth = 1.5;
    roundRect(ctx2, 900 - diffW, 148, diffW + 8, 36, 8);
    ctx2.stroke();
    ctx2.fillStyle = accentColor;
    ctx2.letterSpacing = "3px";
    ctx2.fillText(diffLabel, 912 - diffW, 172);

    // Divider
    ctx2.fillStyle = "rgba(255,255,255,0.07)";
    ctx2.fillRect(72, 196, 936, 1);

    // Sport + context
    ctx2.font = "400 28px Arial, sans-serif";
    ctx2.fillStyle = "#6b7280";
    ctx2.letterSpacing = "0px";
    ctx2.fillText(sport, 72, 248);

    ctx2.font = "700 32px Arial, sans-serif";
    ctx2.fillStyle = "#d1d5db";
    ctx2.letterSpacing = "0px";
    const ctxWords = ctx.split(" ");
    let line = "", lineY = 290;
    for (const word of ctxWords) {
      const test = line + (line ? " " : "") + word;
      if (ctx2.measureText(test).width > 936) { ctx2.fillText(line, 72, lineY); line = word; lineY += 42; }
      else line = test;
    }
    ctx2.fillText(line, 72, lineY);

    // Stat boxes
    const statEntries = Object.entries(stats).slice(0, 4);
    const boxW = Math.floor(936 / statEntries.length) - 12;
    statEntries.forEach(([key, val], i) => {
      const bx = 72 + i * (boxW + 12);
      const by = lineY + 40;
      // Box bg
      ctx2.fillStyle = "rgba(255,255,255,0.05)";
      roundRect(ctx2, bx, by, boxW, 130, 12);
      ctx2.fill();
      ctx2.strokeStyle = accentColor + "44";
      ctx2.lineWidth = 1.5;
      roundRect(ctx2, bx, by, boxW, 130, 12);
      ctx2.stroke();
      // Value
      ctx2.font = `900 ${val.length > 6 ? 40 : 52}px 'Arial Black', Arial, sans-serif`;
      ctx2.fillStyle = accentColor;
      ctx2.textAlign = "center";
      ctx2.fillText(val, bx + boxW/2, by + 76);
      // Key
      ctx2.font = "700 20px Arial, sans-serif";
      ctx2.fillStyle = accentColor + "99";
      ctx2.letterSpacing = "3px";
      ctx2.fillText(key, bx + boxW/2, by + 108);
      ctx2.textAlign = "left";
      ctx2.letterSpacing = "0px";
    });

    // Guess result boxes
    const statBottom = lineY + 40 + 130 + 32;
    const resultLabel = won ? `CORRECT IN ${guesses.length}/${cfg.guesses}` : `MISSED — ${player.toUpperCase()}`;
    ctx2.font = "900 30px Arial, sans-serif";
    ctx2.fillStyle = won ? "#22c55e" : "#ef4444";
    ctx2.letterSpacing = "2px";
    ctx2.fillText(resultLabel, 72, statBottom + 36);

    // Guess squares
    guesses.forEach((g, i) => {
      const sqX = 72 + i * 72;
      const sqY = statBottom + 54;
      ctx2.fillStyle = g.ok ? "rgba(34,197,94,0.25)" : "rgba(239,68,68,0.2)";
      roundRect(ctx2, sqX, sqY, 56, 56, 8);
      ctx2.fill();
      ctx2.strokeStyle = g.ok ? "#22c55e" : "#ef4444";
      ctx2.lineWidth = 2;
      roundRect(ctx2, sqX, sqY, 56, 56, 8);
      ctx2.stroke();
      ctx2.font = "900 28px Arial, sans-serif";
      ctx2.textAlign = "center";
      ctx2.fillStyle = g.ok ? "#22c55e" : "#ef4444";
      ctx2.fillText(g.ok ? "✓" : "✗", sqX + 28, sqY + 38);
      ctx2.textAlign = "left";
    });

    // Score + streak
    const scoreY = statBottom + 160;
    if (todayScore) {
      ctx2.font = "900 48px 'Arial Black', Arial, sans-serif";
      ctx2.fillStyle = "#ffd700";
      ctx2.fillText(`+${todayScore.toLocaleString()} pts`, 72, scoreY);
    }
    if (streakData.current > 1) {
      ctx2.font = "900 40px Arial, sans-serif";
      ctx2.fillStyle = "#fb923c";
      const scoreW = todayScore ? ctx2.measureText(`+${todayScore.toLocaleString()} pts`).width + 24 : 0;
      ctx2.fillText(`🔥 ${streakData.current}`, 72 + scoreW, scoreY);
    }

    // Username
    if (username) {
      ctx2.font = "700 26px Arial, sans-serif";
      ctx2.fillStyle = "#4b5563";
      ctx2.letterSpacing = "1px";
      ctx2.fillText(`@${username}`, 72, scoreY + 44);
    }

    // Bottom bar
    ctx2.fillStyle = "rgba(255,255,255,0.04)";
    ctx2.fillRect(0, 980, 1080, 100);
    ctx2.fillStyle = "rgba(255,255,255,0.08)";
    ctx2.fillRect(0, 980, 1080, 1);

    ctx2.font = "900 30px 'Arial Black', Arial, sans-serif";
    ctx2.fillStyle = "#ffd700";
    ctx2.letterSpacing = "4px";
    ctx2.fillText("STATSIQ.IO", 72, 1038);

    ctx2.font = "400 22px Arial, sans-serif";
    ctx2.fillStyle = "#4b5563";
    ctx2.letterSpacing = "2px";
    ctx2.textAlign = "right";
    ctx2.fillText("DAILY SPORTS TRIVIA", 1008, 1038);
    ctx2.textAlign = "left";

    return canvas.toDataURL("image/png");
  };

  // Helper: draw rounded rect path

  const share = async () => {
    try {
      const dataUrl = await generateShareCard();
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], "statsiq.png", { type: "image/png" });

      // Try native share with image (mobile)
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "StatsIQ — Daily Sports Trivia",
          text: `Can you beat my score? Play at statsiq.io`,
          files: [file],
        });
        return;
      }

      // Fallback: download the image + copy text
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "statsiq-result.png";
      link.click();

      // Also copy text to clipboard
      const date = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" });
      const rows = guesses.map(g => g.ok ? "🟩" : "🟥").join("");
      const scoreStr = todayScore ? ` · ${todayScore.toLocaleString()} pts` : "";
      const streakStr = streakData.current > 1 ? ` 🔥 ${streakData.current}` : "";
      const userStr = username ? `${username} | ` : "";
      await navigator.clipboard?.writeText(`📊 STATSIQ [${cfg.label}] — ${date}\n${userStr}${won ? guesses.length : "X"}/${cfg.guesses}${scoreStr}${streakStr}\n${rows}\nPlay at statsiq.io`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Final fallback: just copy text
      const date = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" });
      const rows = guesses.map(g => g.ok ? "🟩" : "🟥").join("");
      const scoreStr = todayScore ? ` · ${todayScore.toLocaleString()} pts` : "";
      const streakStr = streakData.current > 1 ? ` 🔥 ${streakData.current}` : "";
      const userStr = username ? `${username} | ` : "";
      navigator.clipboard?.writeText(`📊 STATSIQ [${cfg.label}] — ${date}\n${userStr}${won ? guesses.length : "X"}/${cfg.guesses}${scoreStr}${streakStr}\n${rows}\nPlay at statsiq.io`)
        .then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
    }
  };


  const handleEmailSubmit = () => {
    if (!emailInput.includes("@")) return;
    // Store email in localStorage and mark as submitted
    try {
      localStorage.setItem("statsiq_email", emailInput);
      localStorage.setItem("statsiq_email_submitted", "1");
    } catch {}
    setEmailSubmitted(true);
    // In production you'd POST to a backend/Mailchimp/ConvertKit endpoint here
    // For now we store locally and show confirmation
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
        setTotalScore(0);
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

      {/* Desktop: full-width top bar */}
      {isDesktop && (
        <div style={{ position:"relative", zIndex:10, width:"100%", background:"rgba(8,12,20,0.95)", borderBottom:"1px solid rgba(255,255,255,0.07)", padding:"12px 40px", display:"flex", alignItems:"center", justifyContent:"space-between", backdropFilter:"blur(10px)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <span style={{ fontSize:"1.6rem" }}>📊</span>
            <div>
              <h1 style={{ margin:0, fontFamily:"'Bebas Neue', sans-serif", fontSize:"2rem", color:"#ffd700", letterSpacing:"0.2em", lineHeight:1 }}>STATSIQ</h1>
              <p style={{ margin:0, fontSize:"0.55rem", color:"#4b5563", letterSpacing:"0.3em" }}>DAILY SPORTS TRIVIA</p>
            </div>
          </div>
          <div style={{ display:"flex", gap:10, alignItems:"center" }}>
            <button onClick={() => { if (hasStarted) { toast("Filters lock once you start guessing", 2000); return; } setShowFilter(true); }} style={{ display:"flex", alignItems:"center", gap:5, padding:"6px 14px", borderRadius:8, border:`1px solid ${hasStarted ? "rgba(255,255,255,0.06)" : hasFilter ? "rgba(34,197,94,0.5)" : "rgba(255,255,255,0.12)"}`, background:hasStarted ? "rgba(255,255,255,0.02)" : hasFilter ? "rgba(34,197,94,0.1)" : "rgba(255,255,255,0.04)", color:hasStarted ? "#374151" : hasFilter ? "#86efac" : "#9ca3af", cursor: hasStarted ? "not-allowed" : "pointer", fontSize:"0.72rem", fontWeight:700, letterSpacing:"0.1em", fontFamily:"'Barlow Condensed', sans-serif" }}>
              ⚙️ {hasStarted ? "LOCKED" : filterLabel()}
            </button>
            <button onClick={() => { const idx = Math.floor(Math.random()*500); setPracticeIdx(idx); setPGuesses([]); setPInput(""); setPDone(false); setPWon(false); setShowPractice(true); }} style={{ display:"flex", alignItems:"center", gap:5, padding:"6px 14px", borderRadius:8, border:"1px solid rgba(167,139,250,0.3)", background:"rgba(167,139,250,0.07)", color:"#a78bfa", cursor:"pointer", fontSize:"0.72rem", fontWeight:700, letterSpacing:"0.08em", fontFamily:"'Barlow Condensed', sans-serif" }}>
              🎮 PRACTICE
            </button>
            <button onClick={() => setShowHow(true)} style={{ width:32, height:32, borderRadius:"50%", border:"1px solid rgba(255,200,0,0.2)", background:"rgba(255,200,0,0.05)", color:"rgba(255,215,0,0.6)", cursor:"pointer", fontSize:"0.9rem", fontWeight:900, display:"flex", alignItems:"center", justifyContent:"center" }}>?</button>
            <div style={{ width:1, height:28, background:"rgba(255,255,255,0.08)" }} />
            <button onClick={() => { setUsernameInput(username); setShowUsernameModal(true); }} style={{ textAlign:"center", background:"none", border:"none", cursor:"pointer", padding:0 }}>
              <p style={{ margin:0, fontSize:"0.52rem", color:"#4b5563", letterSpacing:"0.15em" }}>PLAYER</p>
              <p style={{ margin:0, fontSize:"0.82rem", fontWeight:900, color: username ? "#fff" : "#4b5563", fontFamily:"'Bebas Neue',sans-serif" }}>{username || "SET NAME"}</p>
            </button>
            <button onClick={() => setShowHistory(true)} style={{ textAlign:"center", background:"none", border:"none", cursor:"pointer", padding:0, minWidth:52 }}>
              <p style={{ margin:0, fontSize:"0.52rem", color:"#4b5563", letterSpacing:"0.15em" }}>SCORE</p>
              <p style={{ margin:0, fontSize:"0.9rem", fontWeight:900, color:"#ffd700", fontFamily:"'Bebas Neue',sans-serif" }}>{totalScore.toLocaleString()}</p>
            </button>
            {streakData.current > 0 && (
              <button onClick={() => setShowHistory(true)} style={{ textAlign:"center", background:"none", border:"none", cursor:"pointer", padding:0, minWidth:44 }}>
                <p style={{ margin:0, fontSize:"0.52rem", color:"#4b5563", letterSpacing:"0.15em" }}>STREAK</p>
                <p style={{ margin:0, fontSize:"0.9rem", fontWeight:900, color:"#fb923c", fontFamily:"'Bebas Neue',sans-serif" }}>{streakData.current}🔥</p>
              </button>
            )}
            <button onClick={() => setShowLeaderboard(true)} style={{ width:32, height:32, borderRadius:8, border:"1px solid rgba(255,200,0,0.25)", background:"rgba(255,200,0,0.05)", color:"rgba(255,215,0,0.6)", cursor:"pointer", fontSize:"0.9rem", display:"flex", alignItems:"center", justifyContent:"center" }}>🏅</button>
          </div>
        </div>
      )}

      {/* Desktop 3-column layout */}
      {/* Desktop 3-column grid — hidden on mobile */}
      <div style={{ display: isDesktop ? "grid" : "none", gridTemplateColumns:"280px 1fr 280px", gap:0, width:"100%", maxWidth:1400, padding:"0 24px", marginTop:24, alignItems:"start" }}>

          {/* LEFT PANEL — Stats & Badges */}
          <div style={{ display:"flex", flexDirection:"column", gap:14, paddingRight:20, position:"sticky", top:24 }}>
            {/* Difficulty selector */}
            <div>
              <p style={{ margin:"0 0 8px", color:"#6b7280", fontSize:"0.6rem", letterSpacing:"0.2em", fontFamily:"'Bebas Neue',sans-serif" }}>TODAY'S PUZZLES</p>
              <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                {(["easy","medium","hard"] as Difficulty[]).map(d => {
                  const c = DIFF_CONFIG[d]; const active = diff === d;
                  const isCompleted = completedToday.has(d);
                  return (
                    <button key={d} onClick={() => setDiff(d)} style={{ padding:"10px 14px", borderRadius:10, border:`2px solid ${active ? c.color : isCompleted ? c.color+"66" : "rgba(255,255,255,0.08)"}`, background:active ? c.bg : isCompleted ? c.bg+"88" : "rgba(255,255,255,0.02)", cursor:"pointer", fontFamily:"'Bebas Neue', sans-serif", transition:"all 0.2s", textAlign:"left", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <span style={{ color:active ? c.color : isCompleted ? c.color+"aa" : "#4b5563", fontSize:"0.95rem", letterSpacing:"0.1em" }}>{isCompleted ? "✓ " : ""}{c.label}</span>
                      <span style={{ color:active ? c.color : isCompleted ? c.color+"88" : "#374151", fontSize:"0.6rem" }}>{isCompleted ? "DONE" : `${c.guesses} GUESSES`}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Score + streak */}
            <div style={{ background:"rgba(255,255,255,0.03)", borderRadius:12, padding:"14px", border:"1px solid rgba(255,255,255,0.07)" }}>
              <p style={{ margin:"0 0 10px", color:"#6b7280", fontSize:"0.6rem", letterSpacing:"0.2em", fontFamily:"'Bebas Neue',sans-serif" }}>YOUR STATS</p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                {[
                  { label:"SCORE", val:totalScore.toLocaleString(), color:"#ffd700" },
                  { label:"STREAK", val: streakData.current > 0 ? `${streakData.current}🔥` : "—", color:"#fb923c" },
                  { label:"BEST STREAK", val:`${streakData.best}d`, color:"#a78bfa" },
                  { label:"TODAY", val:`${completedToday.size}/3`, color:"#22c55e" },
                ].map(item => (
                  <div key={item.label} style={{ background:"rgba(255,255,255,0.03)", borderRadius:8, padding:"8px 10px" }}>
                    <p style={{ margin:0, color:"#4b5563", fontSize:"0.52rem", letterSpacing:"0.12em" }}>{item.label}</p>
                    <p style={{ margin:0, color:item.color, fontSize:"1rem", fontWeight:900, fontFamily:"'Bebas Neue',sans-serif" }}>{item.val}</p>
                  </div>
                ))}
              </div>
              <button onClick={() => setShowHistory(true)} style={{ marginTop:10, width:"100%", padding:"7px", borderRadius:8, border:"1px solid rgba(255,255,255,0.08)", background:"transparent", color:"#6b7280", cursor:"pointer", fontSize:"0.65rem", fontFamily:"'Barlow Condensed',sans-serif", letterSpacing:"0.1em" }}>
                VIEW FULL HISTORY →
              </button>
            </div>

            {/* Countdown */}
            {completedToday.size > 0 && (
              <div style={{ background:"rgba(255,255,255,0.03)", borderRadius:12, padding:"14px", border:"1px solid rgba(255,255,255,0.07)", textAlign:"center" }}>
                <p style={{ margin:"0 0 4px", color:"#4b5563", fontSize:"0.6rem", letterSpacing:"0.2em", fontFamily:"'Bebas Neue',sans-serif" }}>NEXT PUZZLE IN</p>
                <p style={{ margin:0, color:"#ffd700", fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.6rem", letterSpacing:"0.2em" }}>{countdown}</p>
              </div>
            )}

            {/* How to play */}
            <button onClick={() => setShowHow(true)} style={{ padding:"10px", borderRadius:10, border:"1px solid rgba(255,255,255,0.07)", background:"transparent", color:"#4b5563", cursor:"pointer", fontSize:"0.68rem", fontFamily:"'Barlow Condensed',sans-serif", letterSpacing:"0.1em" }}>
              📖 HOW TO PLAY
            </button>
          </div>

          {/* CENTER — Game (desktop placeholder - actual game rendered below) */}
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", width:"100%" }}>
          </div>
          {/* RIGHT PANEL */}
          <div style={{ display:"flex", flexDirection:"column", gap:14, paddingLeft:20, position:"sticky", top:24 }}>

            {/* Filter status */}
            <div style={{ background:"rgba(255,255,255,0.03)", borderRadius:12, padding:"14px", border:"1px solid rgba(255,255,255,0.07)" }}>
              <p style={{ margin:"0 0 10px", color:"#6b7280", fontSize:"0.6rem", letterSpacing:"0.2em", fontFamily:"'Bebas Neue',sans-serif" }}>CURRENT FILTERS</p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:8 }}>
                {filter.size === 0
                  ? <span style={{ color:"#4b5563", fontSize:"0.72rem" }}>All sports</span>
                  : [...filter].map(s => <span key={s} style={{ fontSize:"1rem" }}>{s}</span>)
                }
              </div>
              <div style={{ display:"flex", gap:5, marginBottom:10 }}>
                {eraFilter.size === 0
                  ? <span style={{ color:"#4b5563", fontSize:"0.72rem" }}>All eras</span>
                  : [...eraFilter].map(e => <span key={e} style={{ color:ERA_CONFIG[e as Era].activeBorder, fontSize:"0.7rem", padding:"2px 8px", borderRadius:4, background:ERA_CONFIG[e as Era].activeBg, border:`1px solid ${ERA_CONFIG[e as Era].activeBorder}` }}>{ERA_CONFIG[e as Era].label}</span>)
                }
              </div>
              <button onClick={() => { if (hasStarted) { toast("Filters lock once you start guessing", 2000); return; } setShowFilter(true); }} style={{ width:"100%", padding:"7px", borderRadius:8, border:`1px solid ${hasStarted ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.1)"}`, background:"transparent", color: hasStarted ? "#374151" : "#9ca3af", cursor: hasStarted ? "not-allowed" : "pointer", fontSize:"0.65rem", fontFamily:"'Barlow Condensed',sans-serif", letterSpacing:"0.1em" }}>
                {hasStarted ? "🔒 LOCKED FOR TODAY" : "⚙️ CHANGE FILTERS"}
              </button>
            </div>

            {/* Difficulty description */}
            <div style={{ background:cfg.bg, borderRadius:12, padding:"14px", border:`1px solid ${cfg.border}` }}>
              <p style={{ margin:"0 0 6px", color:cfg.color, fontSize:"0.6rem", letterSpacing:"0.2em", fontFamily:"'Bebas Neue',sans-serif" }}>{cfg.label} DIFFICULTY</p>
              <p style={{ margin:"0 0 8px", color:"#9ca3af", fontSize:"0.78rem", lineHeight:1.5 }}>{cfg.desc}</p>
              <p style={{ margin:0, color:"#4b5563", fontSize:"0.68rem" }}>{cfg.clueStyle} · {cfg.guesses} guesses</p>
            </div>

            {/* Score multipliers reminder */}
            <div style={{ background:"rgba(255,255,255,0.03)", borderRadius:12, padding:"14px", border:"1px solid rgba(255,255,255,0.07)" }}>
              <p style={{ margin:"0 0 10px", color:"#6b7280", fontSize:"0.6rem", letterSpacing:"0.2em", fontFamily:"'Bebas Neue',sans-serif" }}>SCORE MULTIPLIERS</p>
              {[
                { label:"Hard", val:"×5", color:"#ef4444" },
                { label:"Medium", val:"×2", color:"#f59e0b" },
                { label:"Easy", val:"×1", color:"#22c55e" },
                { label:"Guess 1", val:"1000pts", color:"#ffd700" },
                { label:"Guess 2", val:"750pts", color:"#ffd700" },
                { label:"Guess 3", val:"500pts", color:"#ffd700" },
              ].map(item => (
                <div key={item.label} style={{ display:"flex", justifyContent:"space-between", padding:"4px 0", borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
                  <span style={{ color:"#6b7280", fontSize:"0.72rem" }}>{item.label}</span>
                  <span style={{ color:item.color, fontWeight:700, fontSize:"0.72rem", fontFamily:"'Bebas Neue',sans-serif" }}>{item.val}</span>
                </div>
              ))}
            </div>

            {/* Email/reminders */}
            {!emailSubmitted && (
              <button onClick={() => setShowEmailCapture(true)} style={{ padding:"12px", borderRadius:10, border:"1px solid rgba(255,215,0,0.2)", background:"rgba(255,215,0,0.05)", color:"#ffd700", cursor:"pointer", fontSize:"0.72rem", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, letterSpacing:"0.1em" }}>
                📬 GET DAILY REMINDERS
              </button>
            )}

          </div>

        </div> {/* Close desktop grid */}

      {/* GAME CONTENT — always visible, responsive width */}
      <div style={{ position:"relative", zIndex:10, width:"100%", maxWidth: isDesktop ? 600 : 500, padding:"0 16px", display:"flex", flexDirection:"column", gap:12, marginTop:6 }}>
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

            {/* Milestone celebration */}
            {won && streakData.current > 0 && streakData.current % 7 === 0 && (
              <div style={{ background:"linear-gradient(135deg,rgba(251,146,60,0.2),rgba(255,215,0,0.1))", border:"1px solid rgba(251,146,60,0.4)", borderRadius:10, padding:"10px 14px", marginBottom:12, animation:"pulse 1s ease-in-out" }}>
                <p style={{ margin:0, fontSize:"1.4rem" }}>🔥</p>
                <p style={{ margin:"2px 0 0", color:"#fb923c", fontFamily:"'Bebas Neue',sans-serif", fontSize:"1rem", letterSpacing:"0.1em" }}>{streakData.current} DAY STREAK!</p>
              </div>
            )}

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
              </div>
            )}

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
                TRY {nextDiff} →
              </button>
              )}
            </div>
            <p style={{ margin:"10px 0 0", color:"#374151", fontSize:"0.62rem", letterSpacing:"0.15em" }}>NEW STAT LINE EVERY DAY AT MIDNIGHT</p>
          </div>
        )}
      </div>


      {/* Mobile game content — hidden on desktop, always rendered */}
      <header style={{ display: isDesktop ? "none" : "block", position:"relative", zIndex:10, width:"100%", maxWidth:500, padding:"14px 18px 0" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:"1px solid rgba(255,255,255,0.07)", paddingBottom:10 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ fontSize:"1.5rem" }}>📊</span>
            <div>
              <h1 style={{ margin:0, fontFamily:"'Bebas Neue', sans-serif", fontSize:"1.8rem", color:"#ffd700", letterSpacing:"0.15em", lineHeight:1 }}>STATSIQ</h1>
              <p style={{ margin:0, fontSize:"0.55rem", color:"#4b5563", letterSpacing:"0.3em" }}>DAILY SPORTS TRIVIA</p>
            </div>
          </div>
          <div style={{ display:"flex", gap:7, alignItems:"center" }}>
            <button onClick={() => { setUsernameInput(username); setShowUsernameModal(true); }} style={{ textAlign:"center", background:"none", border:"none", cursor:"pointer", padding:0, minWidth:60, maxWidth:90 }}>
              <p style={{ margin:0, fontSize:"0.52rem", color:"#4b5563", letterSpacing:"0.15em" }}>PLAYER</p>
              <p style={{ margin:0, fontSize:"0.78rem", fontWeight:900, color: username ? "#fff" : "#4b5563", fontFamily:"'Bebas Neue',sans-serif", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{username || "SET NAME"}</p>
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
            <button onClick={() => setShowLeaderboard(true)} style={{ width:30, height:30, borderRadius:8, border:"1px solid rgba(255,200,0,0.25)", background:"rgba(255,200,0,0.05)", color:"rgba(255,215,0,0.6)", cursor:"pointer", fontSize:"0.85rem", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>🏅</button>
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
        </div>
        <div style={{ display:"flex", gap:8, marginTop:12, marginBottom:4 }}>
          {(["easy","medium","hard"] as Difficulty[]).map(d => {
            const c = DIFF_CONFIG[d]; const active = diff === d;
            const isCompleted = completedToday.has(d);
            return (
              <button key={d} onClick={() => setDiff(d)} style={{ flex:1, padding:"8px 0", borderRadius:10, border:`2px solid ${active ? c.color : isCompleted ? c.color+"66" : "rgba(255,255,255,0.08)"}`, background:active ? c.bg : isCompleted ? c.bg+"88" : "rgba(255,255,255,0.02)", cursor:"pointer", fontFamily:"'Bebas Neue', sans-serif", transition:"all 0.2s" }}>
                <div style={{ color:active ? c.color : isCompleted ? c.color+"aa" : "#4b5563", fontWeight:900, fontSize:"0.9rem", letterSpacing:"0.1em" }}>{isCompleted ? "✓ " : ""}{c.label}</div>
                <div style={{ color:active ? c.color : isCompleted ? c.color+"88" : "#374151", fontSize:"0.55rem", letterSpacing:"0.08em", marginTop:1, opacity:0.8 }}>{isCompleted ? "DONE" : `${c.guesses} GUESSES`}</div>
              </button>
            );
          })}
        </div>
        <p style={{ margin:"4px 0 8px", fontSize:"0.65rem", color:"#4b5563", letterSpacing:"0.1em", textAlign:"center" }}>{cfg.desc} · {cfg.clueStyle}</p>
      </header>

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
                    <span style={{ fontSize:"0.55rem", color:"rgba(167,139,250,0.6)", letterSpacing:"0.15em" }}>{k}</span>
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
                const date = new Date().toLocaleDateString("en-US",{month:"short",day:"numeric"});
                const rows = guesses.map(g => g.ok?"🟩":"🟥").join("");
                const scoreStr = todayScore ? ` · ${todayScore.toLocaleString()} pts` : "";
                const streakStr = streakData.current > 1 ? ` 🔥 ${streakData.current}` : "";
                const userStr = username ? `${username} | ` : "";
                navigator.clipboard?.writeText(`📊 STATSIQ [${cfg.label}] — ${date}\n${userStr}${won?guesses.length:"X"}/${cfg.guesses}${scoreStr}${streakStr}\n${rows}\nPlay at statsiq.io`)
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
          <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.7)", backdropFilter:"blur(4px)" }} />
          <div style={{ position:"relative", background:"#0f1629", borderTop:"1px solid rgba(255,215,0,0.2)", borderLeft:"1px solid rgba(255,255,255,0.08)", borderRight:"1px solid rgba(255,255,255,0.08)", borderRadius:"20px 20px 0 0", padding:"28px 24px 40px", width:"min(500px,100vw)", boxShadow:"0 -20px 60px rgba(0,0,0,0.8)" }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowEmailCapture(false)} style={{ position:"absolute", top:16, right:16, background:"none", border:"none", color:"#4b5563", cursor:"pointer", fontSize:"1.3rem" }}>✕</button>

            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
              <span style={{ fontSize:"2rem" }}>📬</span>
              <div>
                <h3 style={{ margin:0, color:"#ffd700", fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.4rem", letterSpacing:"0.1em" }}>GET TOMORROW'S PUZZLE EARLY</h3>
                <p style={{ margin:0, color:"#6b7280", fontSize:"0.75rem" }}>Be the first to play — delivered to your inbox at 10 AM</p>
              </div>
            </div>

            <div style={{ background:"rgba(255,215,0,0.05)", border:"1px solid rgba(255,215,0,0.15)", borderRadius:10, padding:"12px 14px", marginBottom:16 }}>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {["🔔 Get notified before the day resets","📊 Get your daily reminder at 10 AM","🔥 Never miss a day and break your streak","🏆 Early access to weekly challenges"].map((t,i) => (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <span style={{ fontSize:"0.9rem" }}>{t.slice(0,2)}</span>
                    <span style={{ color:"#d1d5db", fontSize:"0.78rem" }}>{t.slice(3)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display:"flex", gap:8, marginBottom:10 }}>
              <input
                value={emailInput}
                onChange={e => setEmailInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && emailInput.includes("@") && handleEmailSubmit()}
                placeholder="your@email.com"
                type="email"
                style={{ flex:1, padding:"13px 14px", borderRadius:10, border:`1px solid ${emailInput.includes("@") ? "rgba(255,215,0,0.4)" : "rgba(255,255,255,0.1)"}`, background:"rgba(255,255,255,0.05)", color:"#fff", fontSize:"1rem", fontFamily:"'Barlow Condensed',sans-serif" }}
                autoFocus
              />
              <button
                onClick={handleEmailSubmit}
                disabled={!emailInput.includes("@")}
                style={{ padding:"13px 20px", borderRadius:10, border:"none", background: emailInput.includes("@") ? "linear-gradient(135deg,#ffd700,#f59e0b)" : "rgba(100,100,100,0.3)", color: emailInput.includes("@") ? "#0a0c10" : "#555", fontWeight:900, fontSize:"0.9rem", cursor: emailInput.includes("@") ? "pointer" : "not-allowed", fontFamily:"'Bebas Neue',sans-serif", letterSpacing:"0.1em", whiteSpace:"nowrap" }}>
                NOTIFY ME
              </button>
            </div>
            <p style={{ margin:0, color:"#374151", fontSize:"0.62rem", textAlign:"center" }}>No spam. Just your daily stat line. Unsubscribe anytime.</p>
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
      <div style={{ width:"100%", maxWidth: isDesktop ? 1400 : 500, padding: isDesktop ? "20px 40px" : "24px 18px 8px", marginTop:16, borderTop:"1px solid rgba(255,255,255,0.05)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
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
