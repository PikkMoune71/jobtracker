import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { createI18nMiddleware } from "next-international/middleware";
import { NextRequest } from "next/server";

// Match les routes publiques
const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/"]);

// Middleware Clerk
export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

// Créer un middleware I18n
const I18nMiddleware = createI18nMiddleware({
  locales: ["en", "fr"],
  defaultLocale: "en",
});

export function middleware(request: NextRequest) {
  // Exclure les API de la gestion des locales
  if (request.nextUrl.pathname.startsWith("/api")) {
    return; // Ne pas appliquer I18nMiddleware pour les API
  }

  return I18nMiddleware(request); // Appliquer I18nMiddleware pour toutes les autres routes
}

// Configurer le matcher
export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)",
  ],
};
