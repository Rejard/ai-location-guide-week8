# ERR_003 — Kakao SDK Domain Mismatch

## Summary
Kakao Map loads the SDK successfully but the map does not render because the deployment URL is not registered in the JavaScript SDK domain settings.

## Symptoms
- SDK script returns HTTP 200 but map is blank
- Console may show domain-related authorization error
- Works on localhost but not on deployed URL (or vice versa)

## Root Cause
The deployment domain (e.g., `https://my-app.onrender.com`) is not registered in Kakao Developers → 플랫폼 키 → JavaScript 키 → JavaScript SDK 도메인.

Note: "앱 대표 도메인" and "JavaScript SDK 도메인" are DIFFERENT settings. The SDK domain is the one that matters for map rendering.

## Solution
1. Go to Kakao Developers → Your App → 플랫폼 키 → JavaScript 키 → 수정
2. Under "JavaScript SDK 도메인", add the deployment URL
3. Register both local and deployed URLs:
   - `http://localhost:3066`
   - `https://your-app.onrender.com`

## Prevention
Always register all deployment URLs in SDK domain settings before testing.

## Related
- ERR_002_kakao_map_service_disabled.md
- kakao-map-config.diag.js
