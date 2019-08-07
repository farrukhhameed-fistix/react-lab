import { InquiryStatusState, inItInquiryStatusState } from "../cms/InquiryStatus";
import { HeroesState, inItHeroesState } from "../cms/heroes";


export interface ApplicationState {
  InquiryStatus: InquiryStatusState;
  HeroesState: HeroesState;
}

export function initApplicationState(): ApplicationState {
  return {
    InquiryStatus: inItInquiryStatusState,
    HeroesState: inItHeroesState
  };
}
