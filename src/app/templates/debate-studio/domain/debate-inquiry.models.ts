/** Compatibility exports for debate.inquiry-portfolio@1.0. */
export {
  type InquiryTarget as DebateInquiryTarget,
  type InquiryLesson as DebateInquiryLesson,
  type InquiryConfig as DebateInquiryConfig,
  type InquiryState as DebateInquiryState,
  type InquiryAttempt,
  type InquiryReview,
  emptyInquiryState,
  latestInquiryAttempt,
  inquiryGateReady,
  inquiryTargetReady,
  validateInquiry as validateDebateInquiry,
} from '../../../shared/inquiry/inquiry.models';
