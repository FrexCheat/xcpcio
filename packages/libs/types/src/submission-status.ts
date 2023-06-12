export enum SubmissionStatus {
  PENDING = "PENDING",
  WAITING = "WAITING",
  JUDGING = "JUDGING",
  FROZEN = "FROZEN",

  ACCEPTED = "ACCEPTED",
  CORRECT = "CORRECT",
  PARTIALLY_CORRECT = "PARTIALLY_CORRECT",

  REJECTED = "REJECTED",
  WRONG_ANSWER = "WRONG_ANSWER",

  COMPILE_ERROR = "COMPILE_ERROR",
  PRESENTATION_ERROR = "PRESENTATION_ERROR",

  RUNTIME_ERROR = "RUNTIME_ERROR",
  TIME_LIMIT_EXCEEDED = "TIME_LIMIT_EXCEEDED",
  MEMORY_LIMIT_EXCEEDED = "MEMORY_LIMIT_EXCEEDED",
  OUTPUT_LIMIT_EXCEEDED = "OUTPUT_LIMIT_EXCEEDED",
  IDLENESS_LIMIT_EXCEEDED = "IDLENESS_LIMIT_EXCEEDED",

  HACKED = "HACKED",

  JUDGEMENT_FAILED = "JUDGEMENT_FAILED",
  CONFIGURATION_ERROR = "CONFIGURATION_ERROR",
  SYSTEM_ERROR = "SYSTEM_ERROR",
  CANCELED = "CANCELED",
  SKIPPED = "SKIPPED",

  SECURITY_VIOLATED = "SECURITY_VIOLATED",
  DENIAL_OF_JUDGEMENT = "DENIAL_OF_JUDGEMENT",

  UNKNOWN = "UNKNOWN",
  UNDEFINED = "UNDEFINED",
}
