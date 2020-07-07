import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Mensaje,
  Buzon,
} from '../models';
import {MensajeRepository} from '../repositories';

export class MensajeBuzonController {
  constructor(
    @repository(MensajeRepository)
    public mensajeRepository: MensajeRepository,
  ) { }

  @get('/mensajes/{id}/buzon', {
    responses: {
      '200': {
        description: 'Buzon belonging to Mensaje',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Buzon)},
          },
        },
      },
    },
  })
  async getBuzon(
    @param.path.string('id') id: typeof Mensaje.prototype.id,
  ): Promise<Buzon> {
    return this.mensajeRepository.buzon(id);
  }
}
