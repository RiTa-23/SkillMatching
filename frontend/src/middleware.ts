// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 保護されたルートと許可されたrole_idのマッピング
const protectedRoutes: Record<string, number[]> = {
  "/:path*": [1, 2, 3, 4],
};

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token"); // Cookieからトークンを取得

  // if (!token) {
  //   // トークンがない場合はログインページにリダイレクト
  //   return NextResponse.redirect(new URL("/signin", req.url));
  // }

  // try {
  //   // トークンをデコード (JWTのペイロード部分を解析)
  //   const payload = JSON.parse(atob(token.value.split(".")[1]));
  //   const userRole = payload.role_id; // トークンからrole_idを取得

  //   // 現在のリクエストパス
  //   const currentPath = req.nextUrl.pathname;

  //   // ルートが保護されているか確認
  //   let allowedRoles: number[] | undefined;
  //   for (const route in protectedRoutes) {
  //     const regex = new RegExp(`^${route.replace(/:\w+\*/g, ".*")}$`);
  //     if (regex.test(currentPath)) {
  //       allowedRoles = protectedRoutes[route];
  //       break;
  //     }
  //   }

  //   if (allowedRoles) {

  //     // ユーザーのrole_idが許可されていない場合は403ページにリダイレクト
  //     if (!allowedRoles.includes(userRole)) {
  //       return NextResponse.redirect(new URL("/403", req.url));
  //     }
  //   }

  //   // 許可されている場合はリクエストを続行
  //   return NextResponse.next();
  // } catch (error) {
  //   console.error("Error decoding token:", error);
  //   // エラー発生時はログインページにリダイレクト
  //   return NextResponse.redirect(new URL("/signin", req.url));
  // }
}

// ミドルウェアを適用するルートの設定
export const config = {
  matcher: ["/answerer/:path*", "/company/:path*"], // 適用対象のパス
};
