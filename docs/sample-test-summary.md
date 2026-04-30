# Sample Test Summary Report

**Project:** E-Commerce Web Application  
**Test Run Date:** 30 April 2025  
**Environment:** Staging  
**Tester:** Faiz  
**Tool:** Playwright (automated) + Manual exploratory testing

---

## Executive Summary

| Metric       | Value  |
|--------------|--------|
| Total Tests  | 87     |
| Passed       | 74     |
| Failed       | 8      |
| Skipped      | 5      |
| **Pass Rate**| **85%**|

The overall pass rate of **85%** is acceptable but below the release threshold of **90%**. Eight failures were recorded across four test suites. Two failures are confirmed bugs; the remaining six are under investigation.

**Recommendation:** Do not release to production until the confirmed bugs are resolved and the pass rate reaches ≥ 90%.

---

## Suite Results

| Suite                    | Total | Passed | Failed | Skipped | Pass Rate | Status  |
|--------------------------|-------|--------|--------|---------|-----------|---------|
| Login & Authentication   | 15    | 14     | 1      | 0       | 93%       | partial |
| User Registration        | 12    | 12     | 0      | 0       | 100%      | passed  |
| Product Search & Filters | 18    | 14     | 3      | 1       | 78%       | partial |
| Shopping Cart            | 16    | 13     | 2      | 1       | 81%       | partial |
| Checkout & Payments      | 14    | 12     | 1      | 1       | 86%       | partial |
| User Profile & Settings  | 12    | 9      | 1      | 2       | 75%       | partial |

---

## Failure Summary

### BUG-101 — Login: "Remember Me" token not persisting after browser restart
- **Suite:** Login & Authentication
- **Severity:** Medium
- **Steps:** Log in with "Remember Me" checked → Close browser → Reopen
- **Expected:** User remains logged in
- **Actual:** User is logged out
- **Status:** Confirmed bug, assigned to dev team

### BUG-102 — Search: Filters reset after navigating back from product page
- **Suite:** Product Search & Filters
- **Severity:** High
- **Steps:** Apply price filter → Open product → Press browser back
- **Expected:** Filters remain applied
- **Actual:** All filters are cleared
- **Status:** Confirmed bug, assigned to dev team

### BUG-103 — Search: Sorting by "Price: High to Low" returns incorrect order
- **Suite:** Product Search & Filters
- **Severity:** High
- **Steps:** On search results page, select "Price: High to Low" sort
- **Expected:** Products ordered from highest to lowest price
- **Actual:** Order is inconsistent, some cheaper items appear first
- **Status:** Under investigation

### BUG-104 — Search: Empty search returns 500 error instead of empty state
- **Suite:** Product Search & Filters
- **Severity:** Medium
- **Steps:** Submit search form with blank input
- **Expected:** "No results found" message
- **Actual:** HTTP 500 Internal Server Error
- **Status:** Under investigation

### BUG-105 — Cart: Quantity update does not recalculate total price
- **Suite:** Shopping Cart
- **Severity:** High
- **Steps:** Add item to cart → Change quantity to 3
- **Expected:** Price updates to reflect × 3
- **Actual:** Price remains at × 1
- **Status:** Under investigation

### BUG-106 — Cart: Remove item button unresponsive on mobile viewport (375px)
- **Suite:** Shopping Cart
- **Severity:** Medium
- **Steps:** View cart on mobile (375px) → Tap "Remove" on any item
- **Expected:** Item is removed
- **Actual:** Button does not respond to tap
- **Status:** Under investigation

### BUG-107 — Checkout: Promo code field accepts expired codes without error
- **Suite:** Checkout & Payments
- **Severity:** Medium
- **Steps:** Enter expired promo code "SAVE10" at checkout
- **Expected:** Error message "This code has expired"
- **Actual:** Code is accepted and no discount is applied, no error shown
- **Status:** Under investigation

### BUG-108 — Profile: Avatar upload fails silently for files > 2 MB
- **Suite:** User Profile & Settings
- **Severity:** Low
- **Steps:** Upload a 3 MB JPEG as profile avatar
- **Expected:** Error message "File size must be under 2 MB"
- **Actual:** Upload appears to succeed but avatar does not update
- **Status:** Under investigation

---

## Skipped Tests

| Test Case                                  | Reason                                  |
|--------------------------------------------|-----------------------------------------|
| TC-031: Product filter — voice search      | Feature not yet implemented in staging  |
| TC-047: Cart — gift wrapping option        | Feature disabled in staging environment |
| TC-061: Checkout — PayPal payment flow     | PayPal sandbox credentials not available|
| TC-072: Profile — two-factor auth (SMS)    | SMS gateway not configured in staging   |
| TC-082: Profile — social login (Google)    | OAuth redirect not configured in staging|

---

## Next Steps

1. Dev team to investigate and fix BUG-102 and BUG-103 (high severity) before next test run
2. Re-run all failed tests after fixes are deployed
3. Confirm skipped tests are re-enabled before the production release
4. Target pass rate ≥ 90% for release sign-off

---

*Generated by QA Dashboard — Portfolio Project by Faiz*
