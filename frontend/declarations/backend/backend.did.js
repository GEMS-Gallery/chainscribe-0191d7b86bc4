export const idlFactory = ({ IDL }) => {
  const Team = IDL.Text;
  const Game = IDL.Record({
    'date' : IDL.Text,
    'time' : IDL.Text,
    'week' : IDL.Nat,
    'isHome' : IDL.Bool,
    'opponent' : Team,
  });
  return IDL.Service({
    'generateSchedule' : IDL.Func([Team], [IDL.Vec(Game)], []),
    'getTeams' : IDL.Func([], [IDL.Vec(Team)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
