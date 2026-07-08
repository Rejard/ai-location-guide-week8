# ERR_002 — Kakao Map OPEN_MAP_AND_LOCAL Service Disabled

## Summary
Kakao Map API returns `NotAuthorizedError: App disabled OPEN_MAP_AND_LOCAL service` when a developer already has another app with KakaoMap enabled.

## Symptoms
- Map div is blank
- Browser console shows: `NotAuthorizedError`
- API response: `"App disabled OPEN_MAP_AND_LOCAL service."`
- KakaoMap toggle in Kakao Developers console stays OFF and cannot be turned ON

## Root Cause
Kakao policy (since 2024-12-01): If a developer already has one app with KakaoMap enabled, additional apps require business verification via "추가 기능 신청" before KakaoMap can be activated.

## Solution
1. **Option A**: Use the JavaScript key from the existing app that already has KakaoMap ON, and register the new deployment domain in that app's SDK domain settings.
2. **Option B**: Submit business verification in Kakao Developers → App → 추가 기능 신청 → 카카오맵.

## Prevention
- Before creating a new Kakao app for KakaoMap, check if an existing app already has KakaoMap enabled.
- Reuse existing app keys and add new domains instead of creating separate apps.

## Related
- ERR_003_kakao_sdk_domain_mismatch.md
- kakao-map-config.diag.js
