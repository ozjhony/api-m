import {Entity, model, property} from '@loopback/repository';

@model()
export class Buzon extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;


  constructor(data?: Partial<Buzon>) {
    super(data);
  }
}

export interface BuzonRelations {
  // describe navigational properties here
}

export type BuzonWithRelations = Buzon & BuzonRelations;
