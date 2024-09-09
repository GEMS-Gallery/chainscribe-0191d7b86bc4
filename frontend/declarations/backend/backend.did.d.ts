import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Game {
  'date' : string,
  'time' : string,
  'week' : bigint,
  'isHome' : boolean,
  'opponent' : Team,
}
export type Team = string;
export interface _SERVICE {
  'generateSchedule' : ActorMethod<[Team], Array<Game>>,
  'getTeams' : ActorMethod<[], Array<Team>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
