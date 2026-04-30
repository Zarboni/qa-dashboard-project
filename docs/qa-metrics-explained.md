# QA Metrics Explained

This document explains the key quality metrics displayed on the QA dashboard and why each one matters.

---

## 1. Total Tests

**What it is:** The count of every test case that was executed (or scheduled to run) in the test suite.

**Why it matters:** It gives context to all other numbers. A 90% pass rate means something very different across 10 tests versus 1,000 tests.

---

## 2. Passed Tests

**What it is:** Tests that completed successfully — the application behaved exactly as expected.

**Why it matters:** Passed tests give the team confidence that existing functionality is working. A high pass count on regression tests confirms that new changes haven't broken known-good behaviour.

---

## 3. Failed Tests

**What it is:** Tests where the application's actual behaviour did not match the expected result.

**Why it matters:** Each failure is a potential bug. Failed tests need to be investigated: the test might be exposing a real defect, or the test itself might be out of date.

**What to do:** Triage failures by severity. A failed payment test is higher priority than a failed cosmetic UI test.

---

## 4. Skipped Tests

**What it is:** Tests that were deliberately not run. Common reasons:
- The feature under test is not yet implemented
- A known environment issue blocks the test from running
- The test was explicitly excluded for the current run (e.g. flaky test quarantined)

**Why it matters:** Skipped tests are a signal. A high skip count can mean coverage gaps. Track skipped tests to ensure they are re-enabled as soon as possible.

---

## 5. Pass Rate

**Formula:** `(Passed ÷ Total) × 100`

**Example:** 74 passed out of 87 total → `(74 ÷ 87) × 100 = 85%`

**What it means:**

| Pass Rate | Health Signal |
|-----------|---------------|
| 95–100%   | Excellent — ship with confidence |
| 85–94%    | Good — investigate failures before release |
| 70–84%    | Warning — several issues need attention |
| Below 70% | Critical — release is at risk |

**Why it matters:** Pass rate is the single most visible quality signal for stakeholders and release managers. It should be tracked over time, not just point-in-time — a steadily declining pass rate is a warning sign even if it hasn't crossed a threshold yet.

---

## 6. Test Suite Status

Each suite is assigned one of three statuses:

| Status    | Meaning |
|-----------|---------|
| `passed`  | All tests in the suite passed — no failures, no skips |
| `partial` | At least one failure or skip in the suite |
| `failed`  | All tests in the suite failed |

---

## Why Track Metrics Per Suite?

Suite-level metrics help QA teams and developers pinpoint *where* problems are — not just *that* problems exist. A failing suite tells the team which feature area to investigate first, rather than hunting through hundreds of individual test results.

---

*This document is part of the QA Dashboard portfolio project.*
