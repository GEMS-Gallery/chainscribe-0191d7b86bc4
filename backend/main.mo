import Bool "mo:base/Bool";
import Char "mo:base/Char";
import Nat "mo:base/Nat";

import Array "mo:base/Array";
import Time "mo:base/Time";
import Text "mo:base/Text";
import Random "mo:base/Random";
import Int "mo:base/Int";
import Nat8 "mo:base/Nat8";
import Iter "mo:base/Iter";
import Blob "mo:base/Blob";

actor {
  type Team = Text;
  type Game = {
    week: Nat;
    date: Text;
    time: Text;
    opponent: Team;
    isHome: Bool;
  };

  let teams : [Team] = [
    "Arizona Cardinals", "Atlanta Falcons", "Baltimore Ravens", "Buffalo Bills",
    "Carolina Panthers", "Chicago Bears", "Cincinnati Bengals", "Cleveland Browns",
    "Dallas Cowboys", "Denver Broncos", "Detroit Lions", "Green Bay Packers",
    "Houston Texans", "Indianapolis Colts", "Jacksonville Jaguars", "Kansas City Chiefs",
    "Las Vegas Raiders", "Los Angeles Chargers", "Los Angeles Rams", "Miami Dolphins",
    "Minnesota Vikings", "New England Patriots", "New Orleans Saints", "New York Giants",
    "New York Jets", "Philadelphia Eagles", "Pittsburgh Steelers", "San Francisco 49ers",
    "Seattle Seahawks", "Tampa Bay Buccaneers", "Tennessee Titans", "Washington Commanders"
  ];

  public query func getTeams() : async [Team] {
    teams
  };

  public func generateSchedule(team: Team) : async [Game] {
    var schedule : [Game] = [];
    let startDate = Time.now() + 86400_000_000_000 * 365; // Roughly one year from now

    for (week in Iter.range(1, 18)) {
      let currentDate = startDate + 86400_000_000_000 * 7 * (week - 1);
      if (week == 10) {
        schedule := Array.append(schedule, [{
          week = week;
          date = Int.toText(currentDate);
          time = "";
          opponent = "BYE";
          isHome = false;
        }]);
      } else {
        let randomBytes = await Random.blob();
        let randomBytesArray = Blob.toArray(randomBytes);
        let randomIndex = Nat8.toNat(randomBytesArray[0]) % (teams.size() - 1);
        let opponent = if (teams[randomIndex] == team) {
          teams[(randomIndex + 1) % teams.size()]
        } else {
          teams[randomIndex]
        };
        let isHome = (Nat8.toNat(randomBytesArray[1]) % 2) == 0;
        let time = if (isHome) "13:00" else "16:25";

        schedule := Array.append(schedule, [{
          week = week;
          date = Int.toText(currentDate);
          time = time;
          opponent = opponent;
          isHome = isHome;
        }]);
      };
    };

    schedule
  };
}
