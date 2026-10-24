/**
 * Pixel-exact editorial crops of observed sales-demo captures (1280 × 800).
 * These are image regions, not recreated product controls or new dialogue.
 * All rectangles use source-image pixels. See outcome-capture-provenance.md.
 */
export type CaptureCrop = Readonly<{
  file: string
  x: number
  y: number
  width: number
  height: number
}>

export const CAPTURE_SIZE = { width: 1280, height: 800 } as const

const crop = (file: string, x: number, y: number, width: number, height: number): CaptureCrop => ({ file, x, y, width, height })

export const OUTCOME_CROPS = {
  shared: {
    brand: crop('revenue-03', 50, 19, 198, 48),
    chatHeader: crop('revenue-03', 845, 86, 435, 96),
    composer: crop('revenue-03', 845, 641, 435, 77),
    demoDisclosure: crop('revenue-03', 107, 742, 179, 37),
  },
  revenue: {
    // Stable app-workspace rectangle for whole-pane transitions.
    home: crop('revenue-01', 0, 86, 845, 632),
    recommendations: crop('revenue-03', 0, 86, 845, 632),
    details: crop('revenue-05', 0, 86, 845, 632),
    review: crop('revenue-07', 0, 86, 845, 632),
    // The real guest/Companion exchanges, without earlier welcome chatter.
    request: crop('revenue-03', 885, 393, 378, 52),
    recommendation: crop('revenue-03', 864, 456, 379, 163),
    chooseSuite: crop('revenue-05', 1018, 463, 245, 51),
    suiteReply: crop('revenue-05', 864, 526, 379, 96),
    datesRequest: crop('revenue-07', 896, 485, 367, 52),
    datesReply: crop('revenue-07', 864, 548, 379, 74),
    // Detail views: crop rather than redesign or imply a different action.
    recommendedSuite: crop('revenue-03', 51, 263, 362, 455),
    suiteImage: crop('revenue-05', 51, 263, 394, 295),
    rates: crop('revenue-05', 466, 263, 328, 455),
    reviewRoom: crop('revenue-07', 22, 179, 801, 109),
    populatedDates: crop('revenue-07', 39, 415, 767, 133),
    reviewDetails: crop('revenue-07', 22, 303, 801, 369),
  },
  service: {
    formWorkspace: crop('service-12', 0, 86, 845, 632),
    receivedWorkspace: crop('service-13', 0, 86, 845, 632),
    inProgressWorkspace: crop('service-14', 0, 86, 845, 632),
    resolvedWorkspace: crop('service-15', 0, 86, 845, 632),
    // Last clean exchange; earlier hot-reload conversation is not presented.
    request: crop('service-12', 940, 456, 322, 51),
    checkRequest: crop('service-12', 864, 518, 379, 73),
    recordedReply: crop('service-13', 864, 525, 379, 96),
    populatedForm: crop('service-12', 290, 188, 533, 497),
    fields: crop('service-12', 318, 215, 477, 304),
    submitButton: crop('service-12', 319, 581, 475, 44),
    // Same card region across three observed statuses.
    receivedCard: crop('service-13', 319, 397, 232, 210),
    inProgressCard: crop('service-14', 319, 397, 232, 210),
    resolvedCard: crop('service-15', 319, 397, 232, 210),
    inProgressDetail: crop('service-16', 319, 282, 475, 285),
    resolvedDetail: crop('service-17', 319, 282, 475, 285),
  },
  team: {
    // The first staff screenshot is 143 px above the later scroll position.
    // Content-aligned crops prevent an unrelated page jump on acknowledgement.
    newTask: crop('team-11', 270, 326, 307, 149),
    acknowledgedTask: crop('team-12', 270, 183, 307, 149),
    inProgressTask: crop('team-13', 270, 183, 307, 149),
    resolvedTask: crop('team-14', 270, 183, 307, 149),
    requestHeader: crop('team-11', 600, 171, 641, 100),
    ownership: crop('team-13', 621, 277, 313, 167),
    newActions: crop('team-11', 621, 610, 313, 174),
    acknowledgedActions: crop('team-12', 621, 467, 313, 174),
    inProgressActions: crop('team-13', 621, 467, 313, 174),
    resolvedActions: crop('team-14', 621, 467, 313, 174),
    newAudit: crop('team-11', 990, 316, 232, 117),
    acknowledgedAudit: crop('team-12', 990, 173, 232, 181),
    inProgressAudit: crop('team-13', 990, 173, 232, 241),
    resolvedAudit: crop('team-14', 990, 173, 232, 321),
    serviceRecordNote: crop('team-14', 990, 513, 232, 143),
  },
  memory: {
    // New local sales-build captures: a completed previous visit, not My stay.
    home: crop('memory-11', 0, 86, 845, 632),
    request: crop('memory-12', 884, 309, 378, 73),
    reply: crop('memory-12', 864, 393, 379, 163),
    previousVisit: crop('memory-12', 22, 103, 801, 542),
    sameSuiteRequest: crop('memory-13', 969, 463, 293, 51),
    sameSuiteReply: crop('memory-13', 864, 526, 379, 96),
    previousSuite: crop('memory-13', 51, 197, 743, 521),
  },
} as const
