import { Type } from 'class-transformer';
import LabelResponse from './label.response';
import Label from '../entity/labels.entity';

export default class LabelsResponse {
  @Type(() => LabelResponse)
  public labels: LabelResponse[];

  constructor(labels: Label[]) {
    this.labels = labels.map(label => new LabelResponse(label));
  }
}
