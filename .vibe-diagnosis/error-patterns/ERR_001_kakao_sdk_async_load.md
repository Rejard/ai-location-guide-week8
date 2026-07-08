# ERR_001 — Kakao Map SDK Async Loading Failure

## Summary
Kakao Map SDK loaded without `autoload=false`, causing map initialization to fail due to timing issues.

## Symptoms
- Map div is empty (no map rendered)
- Console error: `kakao.maps is not defined` or `kakao.maps.LatLng is not a constructor`
- No visible error on the page, just a blank map area

## Root Cause
The default SDK loading (`autoload=true`) starts asynchronously. If the map init script runs before the SDK fully loads, `kakao.maps` is undefined.

## Solution
1. Add `&autoload=false` to the SDK script URL
2. Wrap all map initialization code inside `kakao.maps.load(function() { ... })`

```html
<script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=KEY&autoload=false"></script>
<script>
  kakao.maps.load(function() {
    var map = new kakao.maps.Map(container, options);
  });
</script>
```

## Prevention
Always use `autoload=false` with Kakao Maps SDK. Add `kakao-map-config.diag.js` to catch this pattern.

## Related
- kakao-map-config.diag.js
