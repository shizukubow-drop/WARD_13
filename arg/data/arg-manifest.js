window.WARD13_ARG_MANIFEST = {
  schemaVersion: 1,
  id: "ward13-odaiba-archive",
  institution: {
    id: "shiokai-daiba-memorial",
    fictional: true,
    region: "東京臨海副都心・台場地区"
  },
  storageKey: "ward13_arg_state_v1",
  completeKey: "ward13_arg_complete",
  views: [
    { id: "portal", file: "index.html", public: true, navigation: true },
    { id: "outpatient", file: "outpatient.html", public: true, navigation: true },
    { id: "departments", file: "departments.html", public: true, navigation: true },
    { id: "doctors", file: "doctors.html", public: true, navigation: true },
    { id: "floor", file: "floor.html", public: true, navigation: true },
    { id: "access", file: "access.html", public: true, navigation: true },
    { id: "archive", file: "archive.html", public: false },
    { id: "records", file: "records.html", public: false },
    { id: "staff", file: "staff.html", public: false },
    { id: "terminal", file: "terminal.html", public: false },
    { id: "evidence", file: "evidence.html", public: false },
    { id: "lost", file: "old/ward-13-observation/index.html", public: false }
  ],
  clues: [
    { id: "floor_13_omitted", source: "portal", required: true, dependencies: [] },
    { id: "date_0713", source: "portal", required: true, dependencies: [] },
    { id: "archive_13_exists", source: "archive", required: true, dependencies: ["floor_13_omitted"] },
    { id: "maintenance_crt_w13", source: "archive", required: true, dependencies: [] },
    { id: "cicada_channel", source: "archive", required: false, dependencies: ["maintenance_crt_w13"] },
    { id: "record_case_00", source: "records", required: true, dependencies: ["archive_13_exists"] },
    { id: "alias_utsugi", source: "records", required: true, dependencies: ["record_case_00"] },
    { id: "staff_override", source: "staff", required: true, dependencies: ["date_0713"] },
    { id: "terminal_patient_zero", source: "terminal", required: true, dependencies: ["staff_override", "alias_utsugi"] },
    { id: "terminal_not_discharged", source: "terminal", required: true, dependencies: ["terminal_patient_zero"] },
    { id: "seagull_marker", source: "lost", required: false, dependencies: [] },
    { id: "final_open_door", source: "evidence", required: true, dependencies: ["terminal_not_discharged"] }
  ],
  gates: {
    records: {
      answers: ["13", "0013", "WARD13", "WARD_13"],
      grants: ["record_case_00", "alias_utsugi"],
      hintAfter: [1, 3]
    },
    staff: {
      answers: ["0713", "20130713", "13-0713"],
      grants: ["staff_override"],
      hintAfter: [1, 3]
    },
    terminal: {
      answers: ["MASHIRO", "UTSUGI MASHIRO", "UTSUGIMASHIRO"],
      grants: ["terminal_patient_zero"],
      hintAfter: [1, 3]
    }
  },
  terminalCommands: {
    HELP: { response: "terminal.help" },
    STATUS: { response: "terminal.status", clue: "terminal_not_discharged" },
    WHOAMI: { response: "terminal.whoami", clue: "terminal_patient_zero" },
    SEAGULL: { response: "terminal.seagull", clue: "seagull_marker" },
    OPEN: { response: "terminal.open" }
  },
  requiredForFinal: [
    "floor_13_omitted",
    "date_0713",
    "archive_13_exists",
    "maintenance_crt_w13",
    "record_case_00",
    "alias_utsugi",
    "staff_override",
    "terminal_patient_zero",
    "terminal_not_discharged"
  ],
  timeline: [
    { id: "annex_open", date: "2001-04-01", sources: ["portal"] },
    { id: "case_zero", date: "2013-07-13", sources: ["records", "archive"] },
    { id: "ward_closed", date: "2013-09-13", sources: ["archive", "staff"] },
    { id: "system_migrated", date: "2016-01-04", sources: ["archive"] },
    { id: "signal_returned", date: "2026-07-13", sources: ["terminal"] }
  ]
};
