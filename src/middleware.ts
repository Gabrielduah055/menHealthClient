import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/878f4f3b-cbb0-40d7-8e65-1ddb684cc19e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({runId:'pre-fix',hypothesisId:'H1',location:'src/middleware.ts',message:'Incoming request',data:{pathname:request.nextUrl.pathname,search:request.nextUrl.search},timestamp:Date.now()})}).catch(()=>{});
  // #endregion

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/|favicon.ico).*)"],
};
