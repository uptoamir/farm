const allPages = {
  fixtures: "FixturesP",
  "football/fixture": "FootballFixtureP",
  "football/team": "FootballTeamP",
  live: "LiveP",
  discovery: "DiscoveryP",
  challenges: "ChallengesP",
  "challenge/": "ChallengeP",
  favorite: "FavoriteP",
  "league/": "LeagueP",
};

type PagesType = keyof typeof allPages;

export const pathToValidName = (path: string) => {
  let result = "other";
  Object.keys(allPages).map((item) => {
    if (path.includes(item)) return (result = allPages[item as PagesType]);
  });
  return result;
};
