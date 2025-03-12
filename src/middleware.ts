import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { createI18nMiddleware } from "next-international/middleware";

// Définition des locales
const locales = ["en", "fr"];
const defaultLocale = "en";

// Middleware I18n
const I18nMiddleware = createI18nMiddleware({
  locales,
  defaultLocale,
});

// Match les routes publiques (ajout des versions localisées)
const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/",
  "/fr",
  "/en",
  "/fr/sign-in(.*)",
  "/en/sign-in(.*)",
]);

export default clerkMiddleware(async (auth, request) => {
  // Exclure les API
  if (request.nextUrl.pathname.startsWith("/api")) {
    return;
  }

  // Appliquer la gestion des langues
  const response = I18nMiddleware(request);

  // Vérifier si la route est protégée
  if (!isPublicRoute(request)) {
    await auth.protect();
  }

  return response;
});

// Configurer le matcher
export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)",
  ],
};
