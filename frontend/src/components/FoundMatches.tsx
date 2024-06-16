import { useCommutyApi } from '../client/useCommutyApi.ts';
import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { CommuteProps, MatchRow } from './MatchRow.tsx';
import { FullDayName } from '../store/appReducer.ts';
import { TypographyH4 } from './TypographyH4.tsx';

export interface Route {
  day: FullDayName;
  from: string;
  to: string;
}

export interface CommutingInfo {
  routes: Route[];
}

interface UserInfo {
  name: string;
  description: string;
}

interface Match {
  commutingInfo: CommutingInfo;
  user: UserInfo;
}

export interface Matches {
  matches: Match[];
}

interface Props {
  className?: string;
}

export const FoundMatches = ({ className }: Props) => {
  const { findMatchedRoutes } = useCommutyApi();
  const [token, setToken] = useState<string | null>();
  const { getToken } = useAuth();
  const [matches, setMatches] = useState<Matches>();

  useEffect(() => {
    getToken({
      template: '60k',
    }).then((result) => setToken(result));
  }, []);

  useEffect(() => {
    if (token) {
      findMatchedRoutes(token!, (json) => {
        setMatches(json);
      });
    }
  }, [token]);

  const toCommuteProps = (route: Route): CommuteProps => {
    return {
      from: route.from.substring(0, 5),
      to: route.to.substring(0, 5),
      isTimeFitting: true,
    };
  };

  {
    if (matches && matches.matches.length === 0) {
      return (
        <div className="flex rounded-full fixed top-2/3 w-full">
          <TypographyH4 className="mx-auto" text={'No matches found :('} />
        </div>
      );
    }
  }

  return (
    <div className={`flex-col ${className} bg-white`}>
      {matches &&
        matches.matches.map((match) => (
          <MatchRow
            username={match.user.name}
            description={match.user.description}
            chosenWeekDays={match.commutingInfo.routes.map((e) => ({ chosenWeekDay: e.day, isChosen: true }))}
            commute={toCommuteProps(match.commutingInfo.routes[0])}
          />
        ))}
    </div>
  );
};
