// // file: ~/server/api/auth/[...].ts
// import { NuxtAuthHandler } from '#auth';
// import GoogleProvider from 'next-auth/providers/google';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import { SiweMessage } from 'siwe';
// import { SupabaseAdapter } from '@auth/supabase-adapter';
// import { Adapter } from 'next-auth/adapters';

// // import { utils } from 'ethers';

// export default NuxtAuthHandler({
//   secret: 'secret-key',
//   // process.env.AUTH_SECRET || useRuntimeConfig().authSecret ||

//   session: {
//     strategy: 'jwt',
//   },

//   pages: {
//     signIn: '/',
//   },

//   // debug: true,

//   adapter: SupabaseAdapter({
//     url: process.env.SUPABASE_URL ?? '',
//     secret: process.env.SUPABASE_SERVICE_KEY ?? '',
//   }) as Adapter,
//   // debug: true,

//   providers: [
//     // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
//     GoogleProvider.default({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_SECRET,
//     }),

//     // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
//     CredentialsProvider.default({
//       id: 'standart-credentials',
//       // The name to display on the sign in form (e.g. 'Sign in with...')
//       name: 'Credentials',
//       // The credentials is used to generate a suitable form on the sign in page.
//       // You can specify whatever fields you are expecting to be submitted.
//       // e.g. domain, username, password, 2FA token, etc.
//       // You can pass any HTML attribute to the <input> tag through the object.
//       credentials: {
//         email: {
//           label: 'email',
//           type: 'email',
//           placeholder: '(hint: jsmith)',
//         },
//         password: {
//           label: 'Password',
//           type: 'password',
//           placeholder: '(hint: hunter2)',
//         },
//       },
//       authorize(credentials: any, req: any) {
//         console.log(credentials);
//         // const res = await fetch("/your/endpoint", {
//         //   method: 'POST',
//         //   body: JSON.stringify(credentials),
//         //   headers: { "Content-Type": "application/json" }
//         // })
//         // const user = await res.json()
//         // if (res.ok && user) {
//         //   return user
//         // }

//         // You need to provide your own logic here that takes the credentials
//         // submitted and returns either a object representing a user or value
//         // that is false/null if the credentials are invalid.
//         // NOTE: THE BELOW LOGIC IS NOT SAFE OR PROPER FOR AUTHENTICATION!
//         const user = {
//           email: 'test@test.test',
//           password: 'testtest',
//         };
//         // console.log('gggg', req);
//         // console.log('gggg2', credentials);
//         // const user = {};

//         return user;
//         // if (
//         //   credentials?.username === user.username &&
//         //   credentials?.password === user.password
//         // ) {
//         //   // Any object returned will be saved in `user` property of the JWT
//         //   return user;
//         // } else {
//         //   // eslint-disable-next-line no-console
//         //   console.error(
//         //     'Warning: Malicious login attempt registered, bad credentials provided'
//         //   );
//         //   // If you return null then an error will be displayed advising the user to check their details.
//         //   return null;
//         //   // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
//         // }
//       },
//     }),

//     // @ts-expect-error
//     CredentialsProvider.default({
//       name: 'Credentials',
//       id: 'web3',
//       credentials: {
//         address: {
//           label: 'Address',
//           type: 'text',
//           placeholder: '0x0',
//         },
//       },
//       async authorize(credentials: any) {
//         try {
//           const siwe = new SiweMessage(
//             JSON.parse(credentials?.message || '{}')
//           );

//           const result = await siwe.verify({
//             signature: credentials?.signature || '',
//             // @ts-expect-error
//             domain: new URL(process.env.AUTH_ORIGIN).host,
//           });

//           if (result.success) {
//             return {
//               id: siwe.address,
//             };
//           }

//           return null;
//         } catch (error) {
//           console.log('error', error);
//           return null;
//         }
//         // if (Boolean(utils.getAddress(credentials?.address!))) {
//         //   return null;
//         // }
//         // return {
//         //   id: credentials?.address,
//         // };
//       },
//     }),
//   ],
//   callbacks: {
//     async signIn(data) {
//       console.log('data', data);
//       // { user, account, profile, email, credentials }
//       return true;
//     },
//     async redirect({ url, baseUrl }) {
//       // console.log('redirect', url, baseUrl);
//       return baseUrl;
//     },
//     async session({ session, token, ...data }: { session: any; token: any }) {
//       console.log('session', session);
//       console.log('token', token);
//       console.log('data', data);
//       // if (token?.sub) {
//       //   session.user.address = token.sub;
//       // }
//       return session;
//     },
//     async jwt(jwt) {
//       console.log('jwt', jwt);
//       return jwt.token;
//     },
//   },
// });
