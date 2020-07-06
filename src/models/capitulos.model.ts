import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Manga} from './manga.model';

@model()
export class Capitulos extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  rutaManga: string;

  @belongsTo(() => Manga)
  mangaId: string;

  constructor(data?: Partial<Capitulos>) {
    super(data);
  }
}

export interface CapitulosRelations {
  // describe navigational properties here
}

export type CapitulosWithRelations = Capitulos & CapitulosRelations;
