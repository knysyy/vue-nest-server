import { Type } from 'class-transformer';
import LabelResponse from './label.response';

export default class LabelsResponse {
  @Type(() => LabelResponse)
  public labels: LabelResponse[];

  constructor(labelResponses: LabelResponse[]) {
    this.labels = labelResponses;
  }
}
