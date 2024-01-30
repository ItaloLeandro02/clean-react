import { SurveyResultModel, SurveyResultAnswerModel } from '@/domain/models'

export interface SaveSurveyResult {
  save: (params: SaveSurveyResult.Params) => Promise<SaveSurveyResult.Model>
}

export namespace SaveSurveyResult {
  export type Params = {
    answer: SurveyResultAnswerModel
  }

  export type Model = SurveyResultModel
}
