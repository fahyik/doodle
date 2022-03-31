import passport from "passport";
import { Strategy as SpotifyStrategy } from "passport-spotify";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

import add from "date-fns/add";

function buildAppPassport({
  spotifyClientId,
  spotifyClientSecret,
  jwtSecret,
  callbackUrl,
  userStore,
}: {
  spotifyClientId: string;
  spotifyClientSecret: string;
  jwtSecret: string;
  callbackUrl: string;
  userStore: Map<string, object>;
}) {
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (obj: object, done) {
    done(null, obj);
  });

  passport.use(
    new SpotifyStrategy(
      {
        clientID: spotifyClientId,
        clientSecret: spotifyClientSecret,
        callbackURL: callbackUrl,
      },
      async function (accessToken, refreshToken, expires_in, profile, done) {
        const user = {
          id: profile.id,
          name: profile.displayName,
          profileUrl: profile.profileUrl,
          accessToken,
          refreshToken,
          expiresIn: add(new Date(), {
            seconds: expires_in - 30,
          }),
        };
        userStore.set(profile.id, user);

        return done(null, user);
      }
    )
  );

  passport.use(
    new JwtStrategy(
      {
        secretOrKey: jwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      async (token, done) => {
        try {
          return done(null, token.user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  return passport;
}

export { buildAppPassport };
