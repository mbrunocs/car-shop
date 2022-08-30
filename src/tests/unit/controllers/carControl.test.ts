// template para criação dos testes de cobertura da camada de controller


import * as sinon from 'sinon';
import chai from 'chai';
import { 
  deleteCar,
  getCar,
  registerCar,
  showCars,
  updateCar } from '../../../controllers/carsCtrl';
const { expect } = chai;

describe('Sua descrição', () => {

  before(async () => {
    sinon
      .stub()
      .resolves();
  });

  after(()=>{
    sinon.restore();
  })

  it('', async () => {});

});